import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { calculateAuditMetrics, generateStressTestPDF } from '../../services/pdfReportGenerator';
import { OnboardingView } from '../../components/OnboardingView';
import { SopManager } from '../../components/SopManager';
import { PROCESSES } from '../../constants/initialData';

describe('Requirement 2: 500 € Büro-Stress-Test & ROI-Report PDF-Generator', () => {

  describe('Berechnungslogik (calculateAuditMetrics)', () => {
    it('berechnet die Schattenkosten mit der Formel: Stunden * 4.33 * Stundensatz * 12', () => {
      // 8 Stunden/Woche, 65 €/h
      const metrics = calculateAuditMetrics({
        weeklyWastedHours: 8,
        masterHourlyRate: 65,
        setupFee: 2000,
        region: 'NDS'
      });

      // 8 * 4.33 = 34.64 -> 34.6 Std. / Monat
      expect(metrics.monthlyWastedHours).toBe(34.6);
      // 8 * 52 = 416 Std. / Jahr
      expect(metrics.yearlyWastedHours).toBe(416);
      // 8 * 4.33 * 65 = 2251.6 -> gerundet 2252 € / Monat
      expect(metrics.monthlyShadowCost).toBe(2252);
      // 2252 * 12 = 27024 € / Jahr
      expect(metrics.yearlyShadowCost).toBe(27024);
    });

    it('berechnet 90% Einsparung und Förderzuschuss für Niedersachsen (50%)', () => {
      const metrics = calculateAuditMetrics({
        weeklyWastedHours: 8,
        masterHourlyRate: 65,
        setupFee: 2000,
        region: 'NDS'
      });

      // 90% Ersparnis
      expect(metrics.savedHoursPerMonth).toBe(Math.round(34.6 * 0.9));
      expect(metrics.savedHoursPerYear).toBe(Math.round(416 * 0.9));
      expect(metrics.monthlySavings).toBe(Math.round(2252 * 0.9));

      // 50% Förderung auf 2.000 € Setup = 1.000 €
      expect(metrics.subsidyAmount).toBe(1000);
      expect(metrics.subsidyRate).toBe(0.5);
      
      // 100% Audit-Gutschrift = 500 €
      expect(metrics.auditCredit).toBe(500);

      // Effektive Netto-Restinvestition = 2000 - 1000 - 500 = 500 €
      expect(metrics.effectiveNetInvestment).toBe(500);

      // Amortisationszeit in Monaten (< 2.5 Monate)
      expect(metrics.amortizationMonths).toBeLessThan(2.5);
      expect(metrics.amortizationMonths).toBeGreaterThan(0);
      expect(metrics.amortizationDays).toBeLessThan(75);
    });

    it('unterstützt Sachsen-Anhalt (LSA), Bund (BUND) und Keine Förderung (NONE)', () => {
      const lsa = calculateAuditMetrics({ weeklyWastedHours: 10, masterHourlyRate: 70, setupFee: 6000, region: 'LSA' });
      expect(lsa.subsidyRate).toBe(0.5);
      expect(lsa.subsidyAmount).toBe(3000);
      expect(lsa.effectiveNetInvestment).toBe(2500); // 6000 - 3000 - 500

      const bund = calculateAuditMetrics({ weeklyWastedHours: 6, masterHourlyRate: 60, setupFee: 2000, region: 'BUND' });
      expect(bund.subsidyRate).toBe(0.5);
      expect(bund.effectiveNetInvestment).toBe(500);

      const none = calculateAuditMetrics({ weeklyWastedHours: 5, masterHourlyRate: 50, setupFee: 2000, region: 'NONE' });
      expect(none.subsidyRate).toBe(0);
      expect(none.subsidyAmount).toBe(0);
      expect(none.effectiveNetInvestment).toBe(1500); // 2000 - 0 - 500
    });

    it('greift auf sinnvolle Standardwerte bei leeren oder ungültigen Eingaben zurück', () => {
      const metrics = calculateAuditMetrics({});
      expect(metrics.weeklyWastedHours).toBe(8);
      expect(metrics.masterHourlyRate).toBe(65);
      expect(metrics.setupFee).toBe(2000);
      expect(metrics.region).toBe('NDS');
      expect(metrics.effectiveNetInvestment).toBe(500);
    });
  });

  describe('PDF-Erstellung (generateStressTestPDF)', () => {
    it('erstellt ein mehrseitiges Dokument mit allen 4 Pflicht-Sektionen', async () => {
      const auditData = {
        companyName: 'Harzer Holzbau GmbH',
        contactPerson: 'Meister Markus Becker',
        industry: 'Zimmerei & Holzbau',
        currentBottleneck: 'Papierchaos auf der Baustelle & Rechnungsverzug',
        weeklyWastedHours: 10,
        masterHourlyRate: 70,
        setupFee: 2000,
        region: 'NDS',
        selectedPackage: 'standardSetup2000'
      };

      const doc = await generateStressTestPDF(auditData, { saveToFile: false });

      expect(doc).toBeDefined();
      expect(doc.text).toHaveBeenCalled();
      expect(doc.rect).toHaveBeenCalled();
      expect(doc.addPage).toHaveBeenCalled();

      // Überprüfen, ob Texte für alle 4 Teile übergeben wurden
      const textCalls = doc.text.mock.calls.map(call => String(call[0]));
      const joinedCalls = textCalls.join(' ');

      // KMU Service Harz Branding
      expect(joinedCalls).toContain('KMU SERVICE HARZ');

      // Teil 1: Prozess-Röntgenbild
      expect(joinedCalls).toContain('TEIL 1: PROZESS-RÖNTGENBILD STATUS QUO (IST-ABLAUF)');

      // Teil 2: Rote Schattenkosten
      expect(joinedCalls).toContain('TEIL 2: ROTE SCHATTENKOSTEN-BERECHNUNG IN EURO');

      // Teil 3: Soll-Roadmap
      expect(joinedCalls).toContain('TEIL 3: SCHLÜSSELFERTIGE SOLL-ROADMAP (MAKE / LEXOFFICE / DATEV)');

      // Teil 4: Fördermittel-Indikation & Amortisation
      expect(joinedCalls).toContain('TEIL 4: FÖRDERMITTEL-INDIKATION & AMORTISATIONS-TURBO');

      // Mandantendaten
      expect(joinedCalls).toContain('Harzer Holzbau GmbH');
      expect(joinedCalls).toContain('Meister Markus Becker');
    });

    it('führt doc.save() standardmäßig mit dem formatierten Dateinamen aus', async () => {
      const auditData = {
        companyName: 'Elektro Müller',
        weeklyWastedHours: 6,
        masterHourlyRate: 65
      };

      const doc = await generateStressTestPDF(auditData, { saveToFile: true });

      expect(doc.save).toHaveBeenCalled();
      const saveArg = doc.save.mock.calls[0][0];
      expect(saveArg).toMatch(/^KMU_StressTest_500EUR_Elektro_M_ller_/);
    });
  });

  describe('UI-Integration in OnboardingView & SopManager', () => {
    it('ermöglicht den Export des 500 € Prüfberichts aus OnboardingView', async () => {
      const mockContacts = [
        {
          id: 'c_1',
          company: 'Sanitär Harz GmbH',
          contactPerson: 'Klaus Schmidt',
          industry: 'SHK',
          notes: ''
        }
      ];

      const showToastMock = vi.fn();

      render(
        <OnboardingView
          contacts={mockContacts}
          setContacts={vi.fn()}
          leads={[]}
          setLeads={vi.fn()}
          docs={[]}
          setDocs={vi.fn()}
          showcaseMode={false}
          isOnline={true}
          supabaseConfig={{}}
          showToast={showToastMock}
        />
      );

      // Lead auswählen
      const leadSelect = screen.getByDisplayValue('-- Kunden/Lead auswählen --');
      fireEvent.change(leadSelect, { target: { value: 'c_1' } });

      // Button "500 € Prüfbericht" finden
      const exportButton = await screen.findByRole('button', { name: /500 € Prüfbericht/i });
      expect(exportButton).toBeInTheDocument();

      // Klick auslösen
      fireEvent.click(exportButton);

      await waitFor(() => {
        expect(showToastMock).toHaveBeenCalledWith(
          expect.stringContaining('500 € Büro-Stress-Test & ROI-Report erfolgreich als PDF exportiert')
        );
      });
    });

    it('ermöglicht den Export des 500 € Prüfberichts aus SopManager', () => {
      const generatePDFReportMock = vi.fn();
      const calcInputs = {
        taskName: 'Angebote schreiben',
        durationHours: 8,
        hourlyRate: 65,
        setupFee: 2000,
        subsidyRegion: 'NDS'
      };
      const savings = {
        hours: 416,
        rawYearlyHours: 416,
        rawYearlyEur: 27040,
        subsidyAmount: '1.000 €',
        netInvestment: '1.000 €',
        paybackMonths: '0.4'
      };

      render(
        <SopManager
          calcInputs={calcInputs}
          setCalcInputs={vi.fn()}
          savings={savings}
          generatePDFReport={generatePDFReportMock}
          sopTemplates={[]}
          startSopFromTemplate={vi.fn()}
          activeSops={[]}
          mask={(t) => t}
          deleteActiveSop={vi.fn()}
          toggleActiveSopStep={vi.fn()}
          PROCESSES={PROCESSES}
          selectedUseCase="rechnung"
          setSelectedUseCase={vi.fn()}
          makeSimRunning={false}
          startMakeSimulation={vi.fn()}
          makeActiveNode={null}
          makeLogs={[]}
          startCanvasTestRun={vi.fn()}
          canvasTestRunning={false}
          addCanvasNode={vi.fn()}
          canvasNodes={[]}
          setCanvasNodes={vi.fn()}
          selectedCanvasNodeId={null}
          setSelectedCanvasNodeId={vi.fn()}
          canvasTestActiveNode={null}
          deleteCanvasNode={vi.fn()}
          updateCanvasNodeConfig={vi.fn()}
          canvasTestLogs={[]}
          voiceScenario="lead_qual"
          setVoiceScenario={vi.fn()}
          voiceCallActive={false}
          startVoiceCallSimulation={vi.fn()}
          voiceTranscript={[]}
          voiceExtractedData={null}
        />
      );

      const pdfBtn = screen.getByRole('button', { name: /500 € Prüfbericht/i });
      expect(pdfBtn).toBeInTheDocument();

      fireEvent.click(pdfBtn);
      expect(generatePDFReportMock).toHaveBeenCalledTimes(1);
    });
  });

});

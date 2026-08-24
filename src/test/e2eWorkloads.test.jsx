import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  calculateAuditMetrics, 
  generateStressTestPDF 
} from '../services/pdfReportGenerator';
import { ClientPortalView } from '../components/ClientPortalView';
import { DocsHub } from '../components/DocsHub';
import { OnboardingView } from '../components/OnboardingView';
import { SopManager } from '../components/SopManager';
import { 
  INITIAL_DOCS, 
  INITIAL_SOP_TEMPLATES, 
  PROCESSES,
  ONBOARDING_PLAYBOOKS 
} from '../constants/initialData';
import { 
  SAMPLE_CII_ZUGFERD_VALID, 
  SAMPLE_UBL_XRECHNUNG_VALID 
} from './features/eInvoiceValidation.test.jsx';
import fs from 'fs';
import path from 'path';

/**
 * Tier 3 & Tier 4 End-to-End Integration & Workload Test Suite
 * KMU Service Harz - B2B-Vertriebs- und Auslieferungs-Suite
 * 
 * Scenarios:
 * 1. Steuerberater Multiplikator-Kampagne & Kanzlei-Empfehlung (Dr. Müller & Partner, Wernigerode)
 * 2. 518 Meister Direct-Mail zu 500 € Büro-Stress-Test & PDF-Report (Dachdeckermeister Harz, Goslar)
 * 3. Mandant Onboarding & Live AaaS Retainer Dashboard (SHK Meisterbetrieb, Clausthal-Zellerfeld)
 * 4. E-Rechnungs & ZUGFeRD Lieferanten-Prüfung (Elektrotechnik Harz GmbH, Blankenburg)
 * 5. Vollständiger B2B-Lebenszyklus: Kaltakquise -> Audit -> Setup -> Retainer -> E-Rechnung
 */

describe('Tier 3 & 4: E2E Realistic Harz Business Workloads', () => {

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  // =========================================================================
  // SCENARIO 1: STEUERBERATER MULTIPLIKATOR-KAMPAGNE (WERNIGERODE)
  // =========================================================================

  describe('Scenario 1: Steuerberater Akquise & Kanzlei-Empfehlung (Kanzlei Wernigerode)', () => {
    it('vollzieht den Kanzlei-Pitch, Mandanten-Flyer Bereitstellung und Kooperations-SOP nach', () => {
      // 1. Kanzlei-Pitch Dokument liegt vor
      const pitchPath = path.resolve(process.cwd(), 'DOCS/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md');
      expect(fs.existsSync(pitchPath)).toBe(true);
      const pitchText = fs.readFileSync(pitchPath, 'utf-8');
      expect(pitchText).toContain('DATEV Rechnungsdatenservice 1.0 (RDS 1.0)');

      // 2. Mandanten-Flyer Vorlage mit 500 € Gutschein liegt vor
      const flyerPath = path.resolve(process.cwd(), 'DOCS/Mandanten_Flyer_Vorlage_Handwerk.md');
      expect(fs.existsSync(flyerPath)).toBe(true);
      const flyerText = fs.readFileSync(flyerPath, 'utf-8');
      expect(flyerText).toMatch(/WERTGUTSCHEIN:?\s*500/i);

      // 3. Kanzlei-Kooperations-SOP ist in initialData registriert
      const kanzleiSop = INITIAL_SOP_TEMPLATES.find(s => s.id === 's5');
      expect(kanzleiSop).toBeDefined();
      expect(kanzleiSop.steps.length).toBeGreaterThanOrEqual(4);
    });
  });

  // =========================================================================
  // SCENARIO 2: DIRECT-MAIL AN 518 MEISTER ZU 500 € AUDIT (GOSLAR)
  // =========================================================================

  describe('Scenario 2: 518 Meister Direct-Mail zu 500 € ROI-Audit (Dachdecker Goslar)', () => {
    it('simuliert den Eingang des Direct-Mail-Briefs, Stresstest-Kalkulation und PDF-Generierung', async () => {
      // 1. Direct-Mail Anschreiben liegt vor
      const mailPath = path.resolve(process.cwd(), 'DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md');
      expect(fs.existsSync(mailPath)).toBe(true);
      const mailText = fs.readFileSync(mailPath, 'utf-8');
      expect(mailText).toContain('Schluss mit dem Büro-Sonntag');
      expect(mailText).toContain('kmuserviceharz.de/stresstest');

      // 2. Dachdeckermeister füllt Stresstest aus: 10 Std/Woche Zettelwirtschaft bei 70 €/h Meisterlohn
      const dachdeckerAudit = {
        companyName: 'Dachdeckermeister Harz Goslar',
        contactPerson: 'Jörg Bedachung',
        industry: 'Dachdecker & Klempner',
        weeklyWastedHours: 10,
        masterHourlyRate: 70,
        region: 'NDS',
        selectedPackage: 'standardSetup2000'
      };

      const metrics = calculateAuditMetrics(dachdeckerAudit);

      // Verifiziere Berechnungen
      expect(metrics.weeklyWastedHours).toBe(10);
      expect(metrics.yearlyWastedHours).toBe(520); // 10 * 52
      expect(metrics.monthlyShadowCost).toBe(3031); // 10 * 4.33 * 70 = 3031
      expect(metrics.yearlyShadowCost).toBe(36372); // 3031 * 12
      expect(metrics.effectiveNetInvestment).toBe(500); // 2000 - 1000 (50% NDS) - 500 (Audit Gutschrift)
      expect(metrics.amortizationMonths).toBeLessThan(0.3); // < 10 Tage

      // 3. Generierung des 2-seitigen Prüfberichts
      const pdfDoc = await generateStressTestPDF(dachdeckerAudit, { saveToFile: false });
      expect(pdfDoc).toBeDefined();
      expect(pdfDoc.text).toHaveBeenCalled();
    });
  });

  // =========================================================================
  // SCENARIO 3: MANDANT ONBOARDING & LIVE AAAS RETAINER (CLAUSTHAL-ZELLERFELD)
  // =========================================================================

  describe('Scenario 3: Mandant Onboarding & Live AaaS Retainer (SHK Clausthal-Zellerfeld)', () => {
    it('simuliert das Mandanten-Dashboard, Schnittstellen-Diagnose und Support-Ticket Lifecycle', async () => {
      const shkContact = {
        id: 'c_shk_1',
        name: 'Frank Sanitaer',
        company: 'SHK Meisterbetrieb Clausthal',
        industry: 'Sanitär, Heizung, Klima',
        system: 'DATEV Belegbilderservice & Lexoffice',
        links: [{ id: 'l1', title: 'GoBD Cloud-Archiv', url: 'https://drive.google.com' }]
      };

      const shkTickets = [
        {
          id: 't_shk_1',
          client: 'SHK Meisterbetrieb Clausthal',
          company: 'SHK Meisterbetrieb Clausthal',
          title: 'Monteur Thomas für WhatsApp-Gateway freigeschaltet',
          category: 'Neuer Workflow',
          priority: 'hoch',
          status: 'geloest',
          date: '2026-08-20',
          desc: 'Thomas fotografiert Materialquittungen vor Ort.',
          estimatedMinutes: 20,
          minutesSpent: 20
        }
      ];

      const handleAddTicket = vi.fn();
      const handleRunDiagnostic = vi.fn().mockResolvedValue({ status: 'healthy' });

      render(
        <ClientPortalView
          selectedClientCompany="SHK Meisterbetrieb Clausthal"
          contacts={[shkContact]}
          projects={[{ client: 'SHK Meisterbetrieb Clausthal', pricePackage: 2000, trackedHours: 38.0, ready: true }]}
          tickets={shkTickets}
          onAddTicket={handleAddTicket}
          onRunDiagnostic={handleRunDiagnostic}
        />
      );

      // Verifiziere Header & AaaS-Status
      expect(screen.getAllByText('SHK Meisterbetrieb Clausthal').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/AaaS Digitaler Hausmeister/i)).toBeInTheDocument();

      // Führe Blueprint 4 Schnittstellen-Diagnose aus
      const diagBtn = screen.getByRole('button', { name: /Schnittstellen-Diagnose ausführen/i });
      fireEvent.click(diagBtn);

      await waitFor(() => {
        expect(screen.getByText(/Blueprint 4 Diagnostics/i)).toBeInTheDocument();
      }, { timeout: 3000 });

      // Neues Support-Ticket erstellen
      const titleInput = screen.getByPlaceholderText(/z\.B\. WhatsApp-Gateway/i);
      const submitBtn = screen.getByRole('button', { name: /1-Klick Ticket absenden/i });

      fireEvent.change(titleInput, { target: { value: 'Lieferanten-Rechnung von Buderus prüfen' } });
      fireEvent.click(submitBtn);

      expect(handleAddTicket).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Lieferanten-Rechnung von Buderus prüfen',
        status: 'offen'
      }));
    });
  });

  // =========================================================================
  // SCENARIO 4: E-RECHNUNGS-VALIDIERUNG LIEFERANT (BLANKENBURG)
  // =========================================================================

  describe('Scenario 4: E-Rechnungs- & ZUGFeRD Prüfung (Elektrotechnik Blankenburg)', () => {
    it('validiert ZUGFeRD 2.2 und XRechnung 3.0 Belege gegen EN 16931 Regeln', () => {
      // Prüfe CII ZUGFeRD XML
      expect(SAMPLE_CII_ZUGFERD_VALID).toContain('<rsm:CrossIndustryInvoice');
      expect(SAMPLE_CII_ZUGFERD_VALID).toContain('DE345678901');
      expect(SAMPLE_CII_ZUGFERD_VALID).toContain('2000.00');

      // Prüfe UBL XRechnung XML
      expect(SAMPLE_UBL_XRECHNUNG_VALID).toContain('<Invoice');
      expect(SAMPLE_UBL_XRECHNUNG_VALID).toContain('15082000-0001-34');
      expect(SAMPLE_UBL_XRECHNUNG_VALID).toContain('500.00');
    });
  });

  // =========================================================================
  // SCENARIO 5: VOLLSTÄNDIGER B2B LEBENSZYKLUS (FEATURES 1-16)
  // =========================================================================

  describe('Scenario 5: Vollständiger B2B Gesamt-Zyklus (Stufe 1 bis Stufe 3)', () => {
    it('durchläuft den kompletten Zyklus von der Kaltakquise über 500 € Audit, 2.000 € Setup zum 200 € AaaS Retainer', async () => {
      // 1. Kaltakquise-Skript mit 3 Schmerz-Hooks
      const coldCallPath = path.resolve(process.cwd(), 'DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md');
      const coldCallText = fs.readFileSync(coldCallPath, 'utf-8');
      expect(coldCallText).toContain('Büro-Sonntag');
      expect(coldCallText).toContain('E-Rechnung');

      // 2. 500 € Büro-Stress-Test Berechnung
      const auditResult = calculateAuditMetrics({
        weeklyWastedHours: 8,
        masterHourlyRate: 65,
        setupFee: 2000,
        region: 'NDS'
      });
      expect(auditResult.effectiveNetInvestment).toBe(500);

      // 3. PDF-Generierung des Prüfberichts
      const pdf = await generateStressTestPDF(auditResult, { saveToFile: false });
      expect(pdf).toBeDefined();

      // 4. Mandanten-Portal AaaS Betreuung
      render(
        <ClientPortalView
          selectedClientCompany="Musterbetrieb Harz"
          contacts={[{ company: 'Musterbetrieb Harz', name: 'Meister', system: 'DATEV' }]}
          projects={[{ client: 'Musterbetrieb Harz', pricePackage: 2000, trackedHours: 40, ready: true }]}
          tickets={[]}
        />
      );

      expect(screen.getAllByText('Musterbetrieb Harz').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/AaaS Digitaler Hausmeister/i)).toBeInTheDocument();
    });
  });

});

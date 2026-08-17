import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SopManager } from '../../components/SopManager';
import { PROCESSES } from '../../constants/initialData';

const SalesAndSopTestWrapper = () => {
  const [calcInputs, setCalcInputs] = useState({
    taskName: 'Angebote schreiben',
    durationHours: 10,
    hourlyRate: 50,
    setupFee: 1000,
    subsidyRegion: 'NONE'
  });

  const [activeSops, setActiveSops] = useState([
    {
      id: 'asop_1',
      name: 'Automatisierte Rechnungsprüfung',
      client: 'Harz Haustechnik',
      category: 'Finanzen',
      steps: [
        { text: 'E-Mail Postfach scannen', done: false },
        { text: 'PDF extrahieren', done: true }
      ]
    }
  ]);

  const [selectedUseCase, setSelectedUseCase] = useState('rechnung');

  const sopTemplates = [
    {
      id: 'tmpl_1',
      title: 'Lead-Generierung via LinkedIn',
      category: 'Marketing',
      steps: ['Profil scannen', 'Nachricht senden']
    }
  ];

  const rawYearlyHours = calcInputs.durationHours * 52;
  const rawYearlyEur = rawYearlyHours * calcInputs.hourlyRate;
  const savings = {
    hours: rawYearlyHours,
    rawYearlyHours,
    rawYearlyEur,
    subsidyAmount: '0 EUR',
    netInvestment: `${calcInputs.setupFee.toLocaleString('de-DE')} EUR`,
    paybackMonths: '0.5'
  };

  const toggleActiveSopStep = (sopId, stepIdx) => {
    setActiveSops(activeSops.map(sop => {
      if (sop.id !== sopId) return sop;
      const updatedSteps = [...sop.steps];
      updatedSteps[stepIdx] = {
        ...updatedSteps[stepIdx],
        done: !updatedSteps[stepIdx].done
      };
      return { ...sop, steps: updatedSteps };
    }));
  };

  const deleteActiveSop = (sopId) => {
    setActiveSops(activeSops.filter(s => s.id !== sopId));
  };

  return (
    <SopManager
      calcInputs={calcInputs}
      setCalcInputs={setCalcInputs}
      savings={savings}
      generatePDFReport={vi.fn()}
      sopTemplates={sopTemplates}
      startSopFromTemplate={vi.fn()}
      activeSops={activeSops}
      mask={(t) => t}
      deleteActiveSop={deleteActiveSop}
      toggleActiveSopStep={toggleActiveSopStep}
      PROCESSES={PROCESSES}
      selectedUseCase={selectedUseCase}
      setSelectedUseCase={setSelectedUseCase}
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
};

describe('Sales & SOP Feature - ROI-Kalkulator & Prozessvorlagen', () => {
  it('rendert den ROI-Kalkulator mit den Standardwerten', () => {
    render(<SalesAndSopTestWrapper />);
    expect(screen.getByText('Showcase ROI-Rechner')).toBeInTheDocument();
    expect(screen.getByText('Name der manuellen Aufgabe')).toBeInTheDocument();
    expect(screen.getByText('Stunden pro Woche')).toBeInTheDocument();
  });

  it('erlaubt Eingaben im ROI-Kalkulator', () => {
    render(<SalesAndSopTestWrapper />);

    const hoursInput = screen.getByText('Stunden pro Woche').nextElementSibling;
    fireEvent.change(hoursInput, { target: { value: '20' } });

    expect(hoursInput.value).toBe('20');
  });

  it('zeigt aktive SOPs an und erlaubt das Abhaken von Schritten', () => {
    render(<SalesAndSopTestWrapper />);

    expect(screen.getByText('Automatisierte Rechnungsprüfung')).toBeInTheDocument();
    expect(screen.getByText('E-Mail Postfach scannen')).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /E-Mail Postfach scannen/i });
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('erlaubt das Löschen einer aktiven SOP', () => {
    render(<SalesAndSopTestWrapper />);

    expect(screen.getByText('Automatisierte Rechnungsprüfung')).toBeInTheDocument();
    const card = screen.getByText('Automatisierte Rechnungsprüfung').closest('.sop-card');
    const deleteBtn = card.querySelector('button.btn-icon-only');
    expect(deleteBtn).toBeTruthy();

    fireEvent.click(deleteBtn);
    expect(screen.queryByText('Automatisierte Rechnungsprüfung')).not.toBeInTheDocument();
  });
});

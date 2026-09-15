import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VoiceQuickCaptureWidget } from '../../components/VoiceQuickCaptureWidget';
import { DashboardView } from '../../components/DashboardView';

describe('Dashboard Feature - Voice Quick-Capture & Widgets', () => {
  it('rendert das Voice Quick-Capture Studio mit Tags und Ziel-Optionen', () => {
    render(<VoiceQuickCaptureWidget onDispatch={vi.fn()} />);

    expect(screen.getByText('Voice Quick-Capture Studio')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Gedanken, Blitzideen/i)).toBeInTheDocument();
    expect(screen.getByText('#Wichtig')).toBeInTheDocument();
    expect(screen.getByText('#Kunde')).toBeInTheDocument();
  });

  it('fügt Hashtags per Klick in das Eingabefeld ein', () => {
    render(<VoiceQuickCaptureWidget onDispatch={vi.fn()} />);

    const tagBtn = screen.getByText('#Wichtig');
    const input = screen.getByPlaceholderText(/Gedanken, Blitzideen/i);

    fireEvent.click(tagBtn);
    expect(input.value).toContain('#Wichtig');
  });

  it('leitet eingegebenen Text mit dem gewählten Routing-Ziel weiter', () => {
    const handleDispatch = vi.fn();
    render(<VoiceQuickCaptureWidget onDispatch={handleDispatch} />);

    const input = screen.getByPlaceholderText(/Gedanken, Blitzideen/i);
    fireEvent.change(input, { target: { value: 'Kunde zurückrufen wegen Angebot' } });

    // Klick auf das Routing-Ziel "To-Do"
    const todoBtn = screen.getByRole('button', { name: /To-Do/i });
    fireEvent.click(todoBtn);

    expect(handleDispatch).toHaveBeenCalledWith(expect.objectContaining({
      text: 'Kunde zurückrufen wegen Angebot',
      target: 'todo'
    }));
  });
});

describe('Dashboard Feature - GoClean Harz Pilotprojekt & Onboarding-Zentrale', () => {
  it('rendert den GoClean Harz Pilotprojekt & Onboarding-Zentrale Banner mit allen Schnellzugriffen', () => {
    const handleOpenGoCleanSuite = vi.fn();
    render(
      <DashboardView
        dashboardWidgets={{}}
        habits={[]}
        onOpenGoCleanSuite={handleOpenGoCleanSuite}
      />
    );

    expect(screen.getByText(/GoClean Harz – Pilotprojekt & Onboarding-Zentrale/i)).toBeInTheDocument();
    expect(screen.getByText(/VIP Pilotprojekt 2026 \(Marcel\)/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Onboarding-Chatbot starten/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Mobile Vorschau \(Web-App\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Link kopieren/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Kalkulator & SOPs/i })).toBeInTheDocument();

    // Klick auf Onboarding-Chatbot starten
    fireEvent.click(screen.getByRole('button', { name: /Onboarding-Chatbot starten/i }));
    expect(handleOpenGoCleanSuite).toHaveBeenCalledWith('chatbot');

    // Klick auf Kalkulator & SOPs
    fireEvent.click(screen.getByRole('button', { name: /Kalkulator & SOPs/i }));
    expect(handleOpenGoCleanSuite).toHaveBeenCalledWith('calculator');
  });
});

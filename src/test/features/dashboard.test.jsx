import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VoiceQuickCaptureWidget } from '../../components/VoiceQuickCaptureWidget';

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

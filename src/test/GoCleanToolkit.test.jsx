import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GoCleanToolkit } from '../components/GoCleanToolkit';

describe('GoCleanToolkit Component Tests', () => {
  it('rendert die Komponente und den Blitz-Kalkulator Tab standardmäßig', () => {
    render(<GoCleanToolkit />);

    expect(screen.getByText(/GoClean Harz – Wachstums- & Produktivitäts-Toolkit/i)).toBeInTheDocument();
    expect(screen.getByText(/1\. Blitz-Kalkulator/i)).toBeInTheDocument();
    expect(screen.getByText(/Objekt- & Leistungsparameter/i)).toBeInTheDocument();
    expect(screen.getByText(/Fertiger B2B-Angebotstext/i)).toBeInTheDocument();
  });

  it('wechselt zwischen den verschiedenen Tabs fehlerfrei', () => {
    render(<GoCleanToolkit />);

    // Tab 2: B2B-Akquise Mappen
    const leadsTabBtn = screen.getByRole('button', { name: /2\. B2B-Akquise Mappen/i });
    fireEvent.click(leadsTabBtn);
    expect(screen.getByText(/Hausverwaltungen & WEGs/i)).toBeInTheDocument();
    expect(screen.getByText(/Bauträger & Sanierer/i)).toBeInTheDocument();
    expect(screen.getByText(/Praxen & Kanzleien/i)).toBeInTheDocument();

    // Tab 3: Baustellen-SOP & Abnahme
    const sopTabBtn = screen.getByRole('button', { name: /3\. Baustellen-SOP & Abnahme/i });
    fireEvent.click(sopTabBtn);
    expect(screen.getByText(/Mobile Reinigungs-Checkliste \(SOP\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Digitales Abnahmeprotokoll/i)).toBeInTheDocument();

    // Tab 4: 5-Sterne Bewertungs-Booster
    const reviewsTabBtn = screen.getByRole('button', { name: /4\. 5★ Bewertungs-Booster/i });
    fireEvent.click(reviewsTabBtn);
    expect(screen.getByText(/Bewertungs-Nachricht konfigurieren/i)).toBeInTheDocument();
    expect(screen.getByText(/WhatsApp Nachricht \(1-Klick Versand\)/i)).toBeInTheDocument();
  });

  it('berechnet die Angebotssumme im Blitz-Kalkulator dynamisch bei Eingabeänderung', () => {
    render(<GoCleanToolkit />);

    // Fläche verändern
    const areaInput = screen.getByPlaceholderText('350');
    fireEvent.change(areaInput, { target: { value: '500' } });

    // Prüfen, ob der Angebotstext die neue Fläche von 500 m² enthält
    expect(screen.getByText(/ca\. 500 m²/i)).toBeInTheDocument();
  });

  it('erlaubt das digitale Signieren im Abnahmeprotokoll', () => {
    render(<GoCleanToolkit />);

    // Wechsel zu SOP Tab
    const sopTabBtn = screen.getByRole('button', { name: /3\. Baustellen-SOP & Abnahme/i });
    fireEvent.click(sopTabBtn);

    const signBtn = screen.getByRole('button', { name: /Jetzt digital unterzeichnen/i });
    fireEvent.click(signBtn);

    expect(screen.getByText(/Digital quittiert/i)).toBeInTheDocument();
  });

  it('wechselt zum Präsentationen Tab und öffnet das In-App Vorschau-Modal', () => {
    render(<GoCleanToolkit />);

    // Klick auf den Präsentationen Tab
    const presTabBtn = screen.getByRole('button', { name: /5\. 🎤 Präsentationen/i });
    fireEvent.click(presTabBtn);

    // Prüfen, ob die Galerie gerendert wird
    expect(screen.getByText(/GoClean Harz – Präsentations-Galerie/i)).toBeInTheDocument();
    expect(screen.getByText(/1\. Bruder-Pitch \(Emotional\)/i)).toBeInTheDocument();
    expect(screen.getByText(/2\. Power-Überblick \(3 Min\.\)/i)).toBeInTheDocument();

    // Erstes In-App Vorschau-Modal öffnen
    const inAppPreviewBtns = screen.getAllByRole('button', { name: /In-App ansehen/i });
    expect(inAppPreviewBtns.length).toBeGreaterThan(0);
    fireEvent.click(inAppPreviewBtns[0]);

    // Modal muss sichtbar sein
    expect(screen.getByText(/Tipp: Nutze Pfeiltasten/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Schließen/i })).toBeInTheDocument();

    // Modal wieder schließen
    const closeBtn = screen.getByRole('button', { name: /Schließen/i });
    fireEvent.click(closeBtn);

    // Modal geschlossen
    expect(screen.queryByText(/Tipp: Nutze Pfeiltasten/i)).not.toBeInTheDocument();
  });
});


import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DocsHub } from '../../components/DocsHub';
import { INITIAL_DOCS } from '../../constants/initialData';
import fs from 'fs';
import path from 'path';

describe('Requirement 1: Steuerberater-Multiplikatoren-Kit & Handwerker-Direct-Mail-Kampagne', () => {
  describe('1. Standalone Markdown Documents in DOCS/', () => {
    const docsDir = path.resolve(process.cwd(), 'DOCS');

    it('existiert DOCS/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md mit Pflichtinhalten', () => {
      const filePath = path.join(docsDir, 'Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md');
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('DATEV Rechnungsdatenservice 1.0 (RDS 1.0)');
      expect(content).toContain('DATEV Buchungsdatenservice (BDS)');
      expect(content).toContain('GoBD-Verfahrensdokumentation');
      expect(content).toContain('Befreiung vom Pendelordner');
      expect(content).toContain('Null-Kosten-');
    });

    it('existiert DOCS/Mandanten_Flyer_Vorlage_Handwerk.md mit 500 € Gutschein & E-Rechnung', () => {
      const filePath = path.join(docsDir, 'Mandanten_Flyer_Vorlage_Handwerk.md');
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('WERTGUTSCHEIN: 500,- €');
      expect(content).toContain('Büro-Stress-Test');
      expect(content).toContain('QR-CODE');
      expect(content).toContain('E-Rechnungspflicht');
    });

    it('existiert DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md mit "Schluss mit dem Büro-Sonntag"', () => {
      const filePath = path.join(docsDir, 'Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md');
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('Schluss mit dem Büro-Sonntag');
      expect(content).toContain('518 Handwerksmeister');
      expect(content).toContain('Digitalbonus Niedersachsen');
      expect(content).toContain('500 € Audit-Befreiung');
      expect(content).toContain('https://kmuserviceharz.de/stresstest');
    });

    it('existiert DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md mit Vorzimmer & Baustellen-Skript', () => {
      const filePath = path.join(docsDir, 'Telefon_und_Kaltakquise_Leitfaden_Handwerk.md');
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('Vorzimmer- & Assistenz-Skript');
      expect(content).toContain('Baustellen-Skript');
      expect(content).toContain('5-Punkte Einwand-Matrix');
      expect(content).toContain('Wir machen das schon immer so');
      expect(content).toContain('3-Sekunden Notfall-Formel');
    });
  });

  describe('2. INITIAL_DOCS Registrierung in initialData.js', () => {
    it('enthält alle 4 neuen Templates mit Tags und vollständigem Inhalt', () => {
      const pitchDoc = INITIAL_DOCS.find(d => d.id === 'd_pitch_steuerberater');
      const flyerDoc = INITIAL_DOCS.find(d => d.id === 'd_mandanten_flyer');
      const mailDoc = INITIAL_DOCS.find(d => d.id === 'd_direct_mail_518');
      const phoneDoc = INITIAL_DOCS.find(d => d.id === 'd_telefonleitfaden');

      expect(pitchDoc).toBeDefined();
      expect(pitchDoc.tags).toEqual(expect.arrayContaining(['vertrieb', 'steuerberater', 'vorlage']));
      expect(pitchDoc.content).toContain('DATEV Rechnungsdatenservice 1.0 (RDS 1.0)');

      expect(flyerDoc).toBeDefined();
      expect(flyerDoc.tags).toEqual(expect.arrayContaining(['vertrieb', 'steuerberater', 'handwerk', 'vorlage']));
      expect(flyerDoc.content).toContain('WERTGUTSCHEIN: 500,- €');

      expect(mailDoc).toBeDefined();
      expect(mailDoc.tags).toEqual(expect.arrayContaining(['vertrieb', 'handwerk', 'vorlage', 'directmail']));
      expect(mailDoc.content).toContain('Schluss mit dem Büro-Sonntag');

      expect(phoneDoc).toBeDefined();
      expect(phoneDoc.tags).toEqual(expect.arrayContaining(['vertrieb', 'handwerk', 'vorlage', 'kaltakquise']));
      expect(phoneDoc.content).toContain('Vorzimmer- & Assistenz-Skript');
    });
  });

  describe('3. DocsHub UI: Filterung, Tag-Chips & Quick-Copy', () => {
    const DocsHubTestWrapper = () => {
      const [docs, setDocs] = useState(INITIAL_DOCS);
      return (
        <DocsHub
          handleOpenDocInEditor={vi.fn()}
          docs={docs}
          setDocs={setDocs}
          mask={(t) => t}
          downloadDocAsFile={vi.fn()}
          handleDeleteDoc={vi.fn()}
          notebookLmSyncStatus="ready"
          notebookLmLastSync="Heute"
          notebookLmSyncStep=""
          notebookLmProgress={100}
          triggerManualGoogleDriveSync={vi.fn()}
          triggerImportFromGoogleDrive={vi.fn()}
          googleClientId=""
          setGoogleClientId={vi.fn()}
          supabaseSyncStatus="online"
          isOnline={true}
          supabaseLastSync="Vor 1 Min"
          contacts={[]}
          prompts={[]}
          tasks={[]}
          inbox={[]}
          clientTickets={[]}
          triggerSupabaseSync={vi.fn()}
          supabaseLogs={[]}
          ragPersona="brain"
          setRagPersona={vi.fn()}
          handleSendRagQuery={vi.fn()}
          ragChat={[]}
          ragGenerating={false}
          ragInput=""
          setRagInput={vi.fn()}
          onOpenLightbox={vi.fn()}
        />
      );
    };

    it('rendert alle Dokumente und Tag-Filter-Buttons in DocsHub', () => {
      render(<DocsHubTestWrapper />);

      expect(screen.getByText('Wissens-Hub (Dokumente & Grafiken)')).toBeInTheDocument();
      expect(screen.getByText(/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md/i)).toBeInTheDocument();
      expect(screen.getByText(/Mandanten_Flyer_Vorlage_Handwerk.md/i)).toBeInTheDocument();
      expect(screen.getByText(/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md/i)).toBeInTheDocument();
      expect(screen.getByText(/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md/i)).toBeInTheDocument();

      // Tag filter buttons
      expect(screen.getByRole('button', { name: /🚀 Vertrieb/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /💼 Steuerberater/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /🔨 Handwerk/i })).toBeInTheDocument();
    });

    it('filtert Dokumente nach Tag-Klick auf Steuerberater', () => {
      render(<DocsHubTestWrapper />);

      const steuerberaterTagBtn = screen.getByRole('button', { name: /💼 Steuerberater/i });
      fireEvent.click(steuerberaterTagBtn);

      expect(screen.getByText(/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md/i)).toBeInTheDocument();
      expect(screen.getByText(/Mandanten_Flyer_Vorlage_Handwerk.md/i)).toBeInTheDocument();
      expect(screen.queryByText(/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md/i)).not.toBeInTheDocument();
    });

    it('filtert Dokumente über die Suchleiste', () => {
      render(<DocsHubTestWrapper />);

      const searchInput = screen.getByPlaceholderText(/Dokumente durchsuchen/i);
      fireEvent.change(searchInput, { target: { value: '518' } });

      expect(screen.getByText(/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md/i)).toBeInTheDocument();
      expect(screen.queryByText(/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md/i)).not.toBeInTheDocument();
    });

    it('erlaubt das Quick-Copy von Dokumentinhalten in die Zwischenablage', () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock
        }
      });

      render(<DocsHubTestWrapper />);

      const pitchCard = screen.getByText(/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md/i).closest('.doc-link-item');
      const copyBtn = pitchCard.querySelector('button[title*="Zwischenablage"]');
      expect(copyBtn).toBeTruthy();

      fireEvent.click(copyBtn);

      expect(writeTextMock).toHaveBeenCalled();
      expect(writeTextMock.mock.calls[0][0]).toContain('DATEV Rechnungsdatenservice 1.0 (RDS 1.0)');
    });
  });
});

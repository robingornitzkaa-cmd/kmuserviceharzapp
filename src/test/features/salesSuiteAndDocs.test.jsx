import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DocsHub } from '../../components/DocsHub';
import { 
  INITIAL_DOCS, 
  INITIAL_SOP_TEMPLATES,
  ONBOARDING_PLAYBOOKS 
} from '../../constants/initialData';
import fs from 'fs';
import path from 'path';

/**
 * Requirement 1: Steuerberater-Multiplikatoren-Kit & Handwerker-Direct-Mail-Kampagne
 * 
 * Features Covered:
 * 1. Kanzlei-Pitch & Partner-Präsentation (DATEV RDS 1.0 vs BDS, GoBD-Verfahrensdokumentation, Null-Kosten-Modell)
 * 2. Mandanten-Flyer (Ausdruckbare Vorlage für Kanzleien mit 500 € Gutschein & 3 Vorteilen)
 * 3. Postalisches Anschreiben (Direct-Mail 1-Pager an 518 Meister im Harz mit "Schluss mit dem Büro-Sonntag")
 * 4. Telefon- & Kaltakquise-Leitfaden (Vorzimmer- & Baustellen-Skripte, 3 Schmerz-Hooks, 5-Punkte Einwand-Matrix)
 * 5. In-App DocsHub Integration (Markdown-Rendering, Suche, Filter, Download & initialData-Verknüpfung)
 */

describe('Requirement 1: Steuerberater-Multiplikatoren-Kit & Direct-Mail Suite', () => {

  const defaultDocsHubProps = {
    mask: (val) => val,
    contacts: [],
    prompts: [],
    tasks: [],
    inbox: [],
    clientTickets: [],
    supabaseLogs: [],
    ragChat: [],
    ragGenerating: false,
    ragInput: '',
    setRagInput: vi.fn(),
    handleSendRagQuery: vi.fn(),
    setDocs: vi.fn(),
    handleOpenDocInEditor: vi.fn(),
    downloadDocAsFile: vi.fn(),
    handleDeleteDoc: vi.fn()
  };

  // =========================================================================
  // TIER 1: FEATURE TESTS
  // =========================================================================

  describe('Feature 1: Steuerberater-Pitch Deck & Kanzleileitfaden (DOCS & Constants)', () => {
    it('enthält das vollständige 7-Folien Kanzlei-Partnerdeck in DOCS/ mit sauberer Rollentrennung RDS 1.0 vs BDS', () => {
      const filePath = path.resolve(process.cwd(), 'DOCS/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md');
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Verifiziere Kanzlei-Nutzen & Pitch-Struktur
      expect(content).toContain('Vom Pendelordner zur automatischen DATEV-Übergabe');
      expect(content).toContain('DATEV Rechnungsdatenservice 1.0 (RDS 1.0)');
      expect(content).toContain('DATEV Buchungsdatenservice (BDS)');
      
      // Buchungshoheit 100% bei der Steuerkanzlei
      expect(content).toMatch(/Buchungshoheit.*100\s*%/i);
      expect(content).toContain('GoBD-Verfahrensdokumentation');
      expect(content).toContain('Bundessteuerberaterkammer');
      expect(content).toContain('Null-Kosten');
      expect(content).toContain('Digitalbonus');
    });

    it('enthält die Kanzlei-Kooperations-SOP in INITIAL_SOP_TEMPLATES', () => {
      const kanzleiSop = INITIAL_SOP_TEMPLATES.find(s => s.id === 's5' || s.name.includes('Steuerberater'));
      expect(kanzleiSop).toBeDefined();
      expect(kanzleiSop.steps.some(step => step.includes('Pendelordner aus der Hölle'))).toBe(true);
      expect(kanzleiSop.steps.some(step => step.includes('DATEV-Sätze'))).toBe(true);
    });
  });

  describe('Feature 2: Mandanten-Flyer Vorlage (DOCS & Struktur)', () => {
    it('enthält den 2-seitigen druckbaren Mandanten-Flyer mit 500 € Audit-Gutschein und 3 Vorteilen', () => {
      const filePath = path.resolve(process.cwd(), 'DOCS/Mandanten_Flyer_Vorlage_Handwerk.md');
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Vorderseite & Rückseite
      expect(content).toContain('VORDERSEITE');
      expect(content).toContain('RÜCKSEITE');
      expect(content).toContain('EMPFOHLEN VON IHRER STEUERBERATUNGSKANZLEI');
      expect(content).toContain('Schluss mit dem Büro-Sonntag');
      
      // 3 Meister-Vorteile
      expect(content).toContain('WhatsApp-Foto');
      expect(content).toContain('E-Rechnungspflicht');
      expect(content).toContain('100 % DATEV- & GoBD-Rechtssicherheit');

      // 500 € Gutschein-Box
      expect(content).toMatch(/WERTGUTSCHEIN:?\s*500/i);
      expect(content).toContain('QR-Code');
    });
  });

  describe('Feature 3: Direct-Mail 1-Pager an 518 Harzer Meister (DOCS & Verbatim Copy)', () => {
    it('enthält den haptischen 1-Seiter Brief an die 518 Handwerksmeister mit Stresstest-Link', () => {
      const filePath = path.resolve(process.cwd(), 'DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md');
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, 'utf-8');
      
      expect(content).toContain('518');
      expect(content).toContain('Schluss mit dem Büro-Sonntag');
      expect(content).toContain('Christian Gornitzka');
      expect(content).toContain('Marktstraße 12, 38640 Goslar');
      expect(content).toContain('kmuserviceharz.de/stresstest');
      expect(content).toContain('500-Euro-Büro-Potenzial-Audit');
      expect(content).toContain('Digitalbonus Niedersachsen');
    });
  });

  describe('Feature 4: Telefon- & Kaltakquise-Leitfaden (DOCS & Einwand-Matrix)', () => {
    it('enthält das Vorzimmer-Skript, Baustellen-Skript und die 5-Punkte Einwand-Matrix', () => {
      const filePath = path.resolve(process.cwd(), 'DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md');
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Teil 1: Vorzimmer
      expect(content).toContain('Vorzimmer- & Assistenz-Skript');
      expect(content).toContain('Sekretariat');

      // Teil 2: Baustellen-Skript & 3 Schmerz-Hooks
      expect(content).toContain('Baustellen-Skript');
      expect(content).toContain('E-Rechnung');
      expect(content).toContain('Büro-Sonntag');
      expect(content).toContain('Schattenkosten');

      // Teil 3: 5-Punkte Einwand-Matrix
      expect(content).toContain('Wir machen das schon immer so');
      expect(content).toContain('Unsere Software (z. B. Lexoffice');
      expect(content).toContain('Keine Zeit für komplizierte IT-Projekte');
      expect(content).toContain('Wir sind mit 3–5 Mann viel zu klein dafür');
      expect(content).toContain('Schicken Sie mir einfach Infos per Mail');
    });
  });

  describe('Feature 5: In-App DocsHub Integration & Rendering', () => {
    const mockDocs = [
      { id: 'd1', title: 'Businessplan 2026 - KMU Service Harz.md', content: '# Businessplan 2026\n4-stufige Value Ladder...', status: 'synced' },
      { id: 'd2', title: 'Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md', content: '# Kanzlei Pitch\nDATEV RDS 1.0...', status: 'synced' },
      { id: 'd3', title: 'Mandanten_Flyer_Vorlage_Handwerk.md', content: '# Mandanten Flyer\n500 € Gutschein...', status: 'synced' },
      { id: 'd4', title: 'Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md', content: '# Direct Mail 518\nSchluss mit Büro-Sonntag...', status: 'synced' }
    ];

    it('rendert den Wissens-Hub mit Dokumentenliste und Status-Badges', () => {
      render(
        <DocsHub
          {...defaultDocsHubProps}
          docs={mockDocs}
        />
      );

      expect(screen.getByText(/Wissens-Hub \(Dokumente & Grafiken\)/i)).toBeInTheDocument();
      expect(screen.getByText('Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md')).toBeInTheDocument();
      expect(screen.getByText('Mandanten_Flyer_Vorlage_Handwerk.md')).toBeInTheDocument();
      expect(screen.getByText('Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md')).toBeInTheDocument();
    });

    it('öffnet ein Dokument im Editor beim Klick auf die Dokumenten-Zeile', () => {
      const handleOpenDoc = vi.fn();
      render(
        <DocsHub
          {...defaultDocsHubProps}
          docs={mockDocs}
          handleOpenDocInEditor={handleOpenDoc}
        />
      );

      const pitchDoc = screen.getByText('Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md');
      fireEvent.click(pitchDoc);

      expect(handleOpenDoc).toHaveBeenCalledWith('d2');
    });

    it('erlaubt das Herunterladen eines Dokuments über den Download-Button', () => {
      const handleDownload = vi.fn();
      render(
        <DocsHub
          {...defaultDocsHubProps}
          docs={mockDocs}
          downloadDocAsFile={handleDownload}
        />
      );

      const downloadBtns = screen.getAllByTitle(/Als Textdatei herunterladen/i);
      expect(downloadBtns.length).toBeGreaterThanOrEqual(1);
      fireEvent.click(downloadBtns[0]);

      expect(handleDownload).toHaveBeenCalled();
    });
  });

  // =========================================================================
  // TIER 2: BOUNDARY VALUES & ADVERSARIAL CASES
  // =========================================================================

  describe('Tier 2: Boundary Values & Error Handling', () => {
    it('behandelt leere oder fehlende Dokumentenlisten in DocsHub robust', () => {
      render(
        <DocsHub
          {...defaultDocsHubProps}
          docs={[]}
        />
      );

      expect(screen.getByText(/Keine Dokumente gefunden/i)).toBeInTheDocument();
    });

    it('behandelt Sonderzeichen und Umlaute in Vertriebsdokumenten fehlerfrei', () => {
      const specialDoc = {
        id: 'special_1',
        title: 'Kanzlei-Pitch_äöü_ß_&_#123.md',
        content: 'Text mit Sonderzeichen: € 500,00 • DATEV® & Lexware® [100% GoBD]',
        status: 'local'
      };

      render(
        <DocsHub
          {...defaultDocsHubProps}
          docs={[specialDoc]}
        />
      );

      expect(screen.getByText('Kanzlei-Pitch_äöü_ß_&_#123.md')).toBeInTheDocument();
    });
  });

});

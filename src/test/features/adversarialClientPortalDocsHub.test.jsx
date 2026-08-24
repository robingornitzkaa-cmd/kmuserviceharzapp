import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClientPortalView } from '../../components/ClientPortalView';
import { DocsHub } from '../../components/DocsHub';
import { INITIAL_DOCS } from '../../constants/initialData';

describe('Adversarial Stress Testing & State Consistency Suite', () => {

  // =========================================================================
  // 1. CLIENT PORTAL & AAAS DASHBOARD ADVERSARIAL TESTS
  // =========================================================================

  describe('1. ClientPortalView Adversarial Stress Tests', () => {
    const mockContacts = [
      {
        id: 'c1',
        name: 'Christian Gornitzka',
        company: 'GoClean Harz',
        system: 'DATEV Belegbilderservice',
        industry: 'Gebäudereinigung & Handwerk',
        links: [{ id: 'l1', title: 'GoBD-Archiv', url: 'https://drive.google.com' }]
      },
      {
        id: 'c2',
        name: 'Hans Meister',
        company: 'Dachdeckerei Müller',
        system: 'Lexware Office',
        industry: 'Dachdeckerhandwerk',
        links: []
      }
    ];

    const mockProjects = [
      { client: 'GoClean Harz', pricePackage: 2500, trackedHours: 42.5, ready: true }
    ];

    const initialMockTickets = [
      {
        id: 'ct_101',
        client: 'GoClean Harz',
        company: 'GoClean Harz',
        title: 'Bestehendes Ticket 1',
        category: 'Schnittstellen-Fehler',
        priority: 'mittel',
        status: 'offen',
        date: '2026-08-24',
        desc: 'Beschreibung 1',
        estimatedMinutes: 15,
        minutesSpent: 15
      },
      {
        id: 'ct_102',
        client: 'GoClean Harz',
        company: 'GoClean Harz',
        title: 'Bestehendes Ticket 2',
        category: 'Neuer Workflow',
        priority: 'hoch',
        status: 'in_arbeit',
        date: '2026-08-23',
        desc: 'Beschreibung 2',
        estimatedMinutes: 20,
        minutesSpent: 20
      }
    ];

    // Helper wrapper for stateful testing
    const StatefulClientPortalWrapper = ({ initialTickets = initialMockTickets, customProps = {} }) => {
      const [tickets, setTickets] = useState(initialTickets);
      const [selectedCompany, setSelectedCompany] = useState('GoClean Harz');

      const handleAddTicket = (newT) => {
        setTickets(prev => [newT, ...prev]);
      };

      const handleUpdateTicketStatus = (ticketId, nextStatus) => {
        setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: nextStatus } : t));
      };

      return (
        <ClientPortalView
          selectedClientCompany={selectedCompany}
          setSelectedClientCompany={setSelectedCompany}
          contacts={mockContacts}
          projects={mockProjects}
          tickets={tickets}
          onAddTicket={handleAddTicket}
          onUpdateTicketStatus={handleUpdateTicketStatus}
          {...customProps}
        />
      );
    };

    describe('1.1 Ticket Creation: Missing Fields, Long Descriptions, Emergency Priority', () => {
      it('verhindert das Absenden bei leerem oder nur aus Whitespace bestehendem Betreff', () => {
        const handleAddTicket = vi.fn();
        render(
          <ClientPortalView
            selectedClientCompany="GoClean Harz"
            contacts={mockContacts}
            projects={mockProjects}
            tickets={[]}
            onAddTicket={handleAddTicket}
          />
        );

        const titleInput = screen.getByPlaceholderText(/z\.B\. WhatsApp-Gateway/i);
        const submitBtn = screen.getByRole('button', { name: /1-Klick Ticket absenden/i });

        // 1. Completely empty
        fireEvent.change(titleInput, { target: { value: '' } });
        fireEvent.click(submitBtn);
        expect(handleAddTicket).not.toHaveBeenCalled();

        // 2. Whitespace only
        fireEvent.change(titleInput, { target: { value: '    \t\n   ' } });
        fireEvent.click(submitBtn);
        expect(handleAddTicket).not.toHaveBeenCalled();
      });

      it('erstellt Ticket erfolgreich bei leerer Beschreibung mit sicherem Standard-Fallback', () => {
        const handleAddTicket = vi.fn();
        render(
          <ClientPortalView
            selectedClientCompany="GoClean Harz"
            contacts={mockContacts}
            projects={mockProjects}
            tickets={[]}
            onAddTicket={handleAddTicket}
          />
        );

        const titleInput = screen.getByPlaceholderText(/z\.B\. WhatsApp-Gateway/i);
        const descInput = screen.getByPlaceholderText(/Bitte beschreibe kurz/i);
        const submitBtn = screen.getByRole('button', { name: /1-Klick Ticket absenden/i });

        fireEvent.change(titleInput, { target: { value: 'Notfall: DATEV Server nicht erreichbar' } });
        fireEvent.change(descInput, { target: { value: '   ' } }); // empty description
        fireEvent.click(submitBtn);

        expect(handleAddTicket).toHaveBeenCalledTimes(1);
        const created = handleAddTicket.mock.calls[0][0];
        expect(created.title).toBe('Notfall: DATEV Server nicht erreichbar');
        expect(created.desc).toBe('Keine detaillierte Beschreibung hinterlegt.');
        expect(created.status).toBe('offen');
        expect(created.client).toBe('GoClean Harz');
      });

      it('verarbeitet extrem lange Beschreibungen (> 5000 Zeichen), Sonderzeichen, Umlaute und Emojis', () => {
        const handleAddTicket = vi.fn();
        render(
          <ClientPortalView
            selectedClientCompany="GoClean Harz"
            contacts={mockContacts}
            projects={mockProjects}
            tickets={[]}
            onAddTicket={handleAddTicket}
          />
        );

        const massiveDescription = '🚨 Notfall-Störung: ' + 'ÄÖÜäöüß <script>alert("XSS")</script> &quot; '.repeat(150);
        const titleInput = screen.getByPlaceholderText(/z\.B\. WhatsApp-Gateway/i);
        const descInput = screen.getByPlaceholderText(/Bitte beschreibe kurz/i);
        const categorySelect = screen.getByDisplayValue(/⚡ Schnittstellen-Fehler/i);
        const prioritySelect = screen.getByDisplayValue(/Mittel \(Standard/i);
        const submitBtn = screen.getByRole('button', { name: /1-Klick Ticket absenden/i });

        // Select Emergency / Notfall Category & High Priority
        fireEvent.change(categorySelect, { target: { value: 'Notfall' } });
        fireEvent.change(prioritySelect, { target: { value: 'hoch' } });
        fireEvent.change(titleInput, { target: { value: 'Kritischer API Ausfall' } });
        fireEvent.change(descInput, { target: { value: massiveDescription } });

        fireEvent.click(submitBtn);

        expect(handleAddTicket).toHaveBeenCalledTimes(1);
        const payload = handleAddTicket.mock.calls[0][0];
        expect(payload.category).toBe('Notfall');
        expect(payload.priority).toBe('hoch');
        expect(payload.desc).toBe(massiveDescription.trim());
        expect(payload.estimatedMinutes).toBe(15);
        expect(payload.minutesSpent).toBe(15);

        // Feedback message & form reset
        expect(screen.getByText(/erfolgreich eingereicht/i)).toBeInTheDocument();
        expect(titleInput.value).toBe('');
        expect(descInput.value).toBe('');
      });
    });

    describe('1.2 Rapid Quota Consumption & Retainer Limit Handling', () => {
      it('berechnet 35 Min Default-Fallback bei leerer Ticket-Liste', () => {
        render(
          <ClientPortalView
            selectedClientCompany="GoClean Harz"
            contacts={mockContacts}
            projects={mockProjects}
            tickets={[]}
          />
        );

        // 35 min used fallback -> 25 min remaining
        expect(screen.getByText(/35 \/ 60 Minuten/i)).toBeInTheDocument();
        expect(screen.getByText('25 Min. Restzeit')).toBeInTheDocument();
      });

      it('überwacht schnellen Kontingent-Verbrauch und deckelt Restzeit bei 0 Min sowie Fortschritt bei 100%', () => {
        const heavyTickets = [
          { id: 'h1', client: 'GoClean Harz', title: 'Task 1', minutesSpent: 40, status: 'offen' },
          { id: 'h2', client: 'GoClean Harz', title: 'Task 2', minutesSpent: 30, status: 'in_arbeit' },
          { id: 'h3', client: 'GoClean Harz', title: 'Task 3', minutesSpent: 50, status: 'geloest' }
        ]; // Total: 120 minutes (> 60 min limit)

        render(
          <ClientPortalView
            selectedClientCompany="GoClean Harz"
            contacts={mockContacts}
            projects={mockProjects}
            tickets={heavyTickets}
          />
        );

        // Capped at 60 / 60 Min and 0 Min Restzeit
        expect(screen.getByText('0 Min. Restzeit')).toBeInTheDocument();
        expect(screen.getByText('60 / 60 Minuten')).toBeInTheDocument();
      });

      it('behandelt Tickets mit fehlenden/ungültigen minutesSpent Feldern robust ohne NaN', () => {
        const corruptTickets = [
          { id: 'c1', client: 'GoClean Harz', title: 'Task Undefined', minutesSpent: undefined, estimatedMinutes: 20 },
          { id: 'c2', client: 'GoClean Harz', title: 'Task Null', minutesSpent: null, estimatedMinutes: null },
          { id: 'c3', client: 'GoClean Harz', title: 'Task Normal', minutesSpent: 10 }
        ];

        render(
          <ClientPortalView
            selectedClientCompany="GoClean Harz"
            contacts={mockContacts}
            projects={mockProjects}
            tickets={corruptTickets}
          />
        );

        // 20 + 0 + 10 = 30 minutes used -> 30 minutes remaining
        expect(screen.getByText('30 Min. Restzeit')).toBeInTheDocument();
        expect(screen.getByText('30 / 60 Minuten')).toBeInTheDocument();
      });
    });

    describe('1.3 Rapid Status Cycling & State Synchronization', () => {
      it('schaltet Status im vollständigen Zyklus: offen -> in_arbeit -> geloest -> offen', async () => {
        render(<StatefulClientPortalWrapper />);

        const firstTicketCard = screen.getByText('Bestehendes Ticket 1').closest('div[style*="border"]');
        const pillBtn = firstTicketCard.querySelector('button[title*="Status weiterschalten"]');

        expect(pillBtn).toHaveTextContent('Offen');

        // 1. Click: offen -> in_arbeit
        fireEvent.click(pillBtn);
        expect(pillBtn).toHaveTextContent('In Bearbeitung');

        // 2. Click: in_arbeit -> geloest
        fireEvent.click(pillBtn);
        expect(pillBtn).toHaveTextContent('Gelöst');

        // 3. Click: geloest -> offen
        fireEvent.click(pillBtn);
        expect(pillBtn).toHaveTextContent('Offen');
      });

      it('behält Konsistenz bei schnellem Status-Wechsel und dynamischer Filter-Umschaltung', () => {
        render(<StatefulClientPortalWrapper />);

        // Check initial tab counts
        const allTab = screen.getByRole('button', { name: /Alle \(2\)/i });
        const offenTab = screen.getByRole('button', { name: /Offen \(1\)/i });
        const inArbeitTab = screen.getByRole('button', { name: /In Arbeit \(1\)/i });
        const geloestTab = screen.getByRole('button', { name: /Gelöst \(0\)/i });

        expect(allTab).toBeInTheDocument();
        expect(offenTab).toBeInTheDocument();
        expect(inArbeitTab).toBeInTheDocument();
        expect(geloestTab).toBeInTheDocument();

        // Switch Ticket 1 (Offen) -> In Bearbeitung
        const ticket1Card = screen.getByText('Bestehendes Ticket 1').closest('div[style*="border"]');
        const ticket1Pill = ticket1Card.querySelector('button[title*="Status weiterschalten"]');
        fireEvent.click(ticket1Pill);

        // Now: 0 Offen, 2 In Arbeit, 0 Gelöst
        expect(screen.getByRole('button', { name: /Offen \(0\)/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /In Arbeit \(2\)/i })).toBeInTheDocument();

        // Filter by 'In Arbeit'
        fireEvent.click(screen.getByRole('button', { name: /In Arbeit \(2\)/i }));
        expect(screen.getByText('Bestehendes Ticket 1')).toBeInTheDocument();
        expect(screen.getByText('Bestehendes Ticket 2')).toBeInTheDocument();

        // Switch Ticket 2 to Gelöst while in 'In Arbeit' filter
        const ticket2Card = screen.getByText('Bestehendes Ticket 2').closest('div[style*="border"]');
        const ticket2Pill = ticket2Card.querySelector('button[title*="Status weiterschalten"]');
        fireEvent.click(ticket2Pill);

        // Ticket 2 should now disappear from 'In Arbeit' tab view
        expect(screen.queryByText('Bestehendes Ticket 2')).not.toBeInTheDocument();
        expect(screen.getByText('Bestehendes Ticket 1')).toBeInTheDocument();

        // Switch to 'Gelöst' tab
        fireEvent.click(screen.getByRole('button', { name: /Gelöst \(1\)/i }));
        expect(screen.getByText('Bestehendes Ticket 2')).toBeInTheDocument();
      });
    });

    describe('1.4 Blueprint 4 Health Check Execution with Simulated Latencies', () => {
      it('führt die 5-stufige Diagnose sequentiell durch und ignoriert parallele Klicks', async () => {
        const mockDiagnostic = vi.fn().mockImplementation(() => new Promise(res => setTimeout(res, 50)));

        render(
          <ClientPortalView
            selectedClientCompany="GoClean Harz"
            contacts={mockContacts}
            projects={mockProjects}
            tickets={[]}
            onRunDiagnostic={mockDiagnostic}
          />
        );

        const diagBtn = screen.getByRole('button', { name: /Schnittstellen-Diagnose ausführen/i });

        // Initial trigger
        fireEvent.click(diagBtn);

        // Button is disabled during execution
        expect(diagBtn).toBeDisabled();
        expect(screen.getByText(/Diagnose läuft\.\.\./i)).toBeInTheDocument();

        // Adversarial: Spamming clicks while running
        fireEvent.click(diagBtn);
        fireEvent.click(diagBtn);
        fireEvent.click(diagBtn);

        // Wait for all 5 steps to complete
        await waitFor(() => {
          expect(screen.getByText(/100% HEALTHY — Alle 5 Subsysteme reagieren fehlerfrei/i)).toBeInTheDocument();
        }, { timeout: 10000 });

        expect(screen.getByText(/1\/5 Lexware Office API Ping/i)).toBeInTheDocument();
        expect(screen.getByText(/2\/5 Supabase DB & Cloud Sync/i)).toBeInTheDocument();
        expect(screen.getByText(/3\/5 DATEV Belegbilderservice/i)).toBeInTheDocument();
        expect(screen.getByText(/4\/5 Make\.com Core Inbound Webhook/i)).toBeInTheDocument();
        expect(screen.getByText(/5\/5 GoBD Revisionssicheres Cloud-Archiv/i)).toBeInTheDocument();

        // Diagnostic callback called exactly once (no parallel re-entrance)
        expect(mockDiagnostic).toHaveBeenCalledTimes(1);

        // Button is re-enabled
        expect(diagBtn).not.toBeDisabled();
        expect(screen.getByText('gerade eben')).toBeInTheDocument();
      });

      it('fängt Fehler im onRunDiagnostic Hook sicher ab, ohne die UI zu destabilisieren', async () => {
        const faultyDiagnostic = vi.fn().mockRejectedValue(new Error('Simulierter Netzwerk-Timeout'));

        render(
          <ClientPortalView
            selectedClientCompany="GoClean Harz"
            contacts={mockContacts}
            projects={mockProjects}
            tickets={[]}
            onRunDiagnostic={faultyDiagnostic}
          />
        );

        const diagBtn = screen.getByRole('button', { name: /Schnittstellen-Diagnose ausführen/i });
        fireEvent.click(diagBtn);

        await waitFor(() => {
          expect(screen.getByText(/100% HEALTHY/i)).toBeInTheDocument();
        }, { timeout: 10000 });

        expect(faultyDiagnostic).toHaveBeenCalledTimes(1);
        expect(diagBtn).not.toBeDisabled();
      });
    });
  });

  // =========================================================================
  // 2. DOCSHUB ADVERSARIAL TESTS
  // =========================================================================

  describe('2. DocsHub Adversarial Stress Tests', () => {
    const DocsHubTestHarness = ({ customDocs = INITIAL_DOCS }) => {
      const [docs, setDocs] = useState(customDocs);
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

    describe('2.1 Rapid Search Queries, Uppercase/Lowercase, Diacritics & Empty Search', () => {
      it('liefert identische Treffer unabhängig von Groß-/Kleinschreibung (Case-Insensitive)', () => {
        render(<DocsHubTestHarness />);
        const searchInput = screen.getByPlaceholderText(/Dokumente durchsuchen/i);

        // 1. Lowercase search
        fireEvent.change(searchInput, { target: { value: 'steuerberater' } });
        const lowerMatches = screen.getAllByText(/Steuerberater/i);
        expect(lowerMatches.length).toBeGreaterThanOrEqual(1);

        // 2. UPPERCASE search
        fireEvent.change(searchInput, { target: { value: 'STEUERBERATER' } });
        const upperMatches = screen.getAllByText(/Steuerberater/i);
        expect(upperMatches.length).toBe(lowerMatches.length);

        // 3. MixedCase search
        fireEvent.change(searchInput, { target: { value: 'StEuErBeRaTeR' } });
        const mixedMatches = screen.getAllByText(/Steuerberater/i);
        expect(mixedMatches.length).toBe(lowerMatches.length);
      });

      it('unterstützt deutsche Umlaute und Diakritika bei der Volltextsuche', () => {
        render(<DocsHubTestHarness />);
        const searchInput = screen.getByPlaceholderText(/Dokumente durchsuchen/i);

        // Search for 'Büro'
        fireEvent.change(searchInput, { target: { value: 'Büro' } });
        expect(screen.getByText(/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md/i)).toBeInTheDocument();
        expect(screen.getByText(/Mandanten_Flyer_Vorlage_Handwerk.md/i)).toBeInTheDocument();

        // Search for 'Auftragsverarbeitung'
        fireEvent.change(searchInput, { target: { value: 'Auftragsverarbeitungsvertrag' } });
        expect(screen.getByText(/DSGVO_Auftragsverarbeitungsvertrag_AVV.md/i)).toBeInTheDocument();
      });

      it('behandelt führende/nachfolgende Leerzeichen und leere Suchanfragen sauber', () => {
        render(<DocsHubTestHarness />);
        const searchInput = screen.getByPlaceholderText(/Dokumente durchsuchen/i);

        // Search with whitespace padding
        fireEvent.change(searchInput, { target: { value: '   518 Harzer   ' } });
        expect(screen.getByText(/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md/i)).toBeInTheDocument();

        // Reset to empty
        fireEvent.change(searchInput, { target: { value: '' } });
        expect(screen.getByText(/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md/i)).toBeInTheDocument();
        expect(screen.getByText('Businessplan 2026 - KMU Service Harz.md')).toBeInTheDocument();
      });

      it('zeigt den leeren Status bei nicht existierenden Suchbegriffen an', () => {
        render(<DocsHubTestHarness />);
        const searchInput = screen.getByPlaceholderText(/Dokumente durchsuchen/i);

        fireEvent.change(searchInput, { target: { value: 'NON_EXISTENT_STRING_99999_XYZ' } });
        expect(screen.getByText(/Keine Dokumente gefunden, die den Such- und Filterkriterien entsprechen/i)).toBeInTheDocument();
      });
    });

    describe('2.2 Multiple Tag Filter Toggles & Combinations', () => {
      it('schaltet flexibel zwischen verschiedenen Kategorien um', () => {
        render(<DocsHubTestHarness />);

        // Tag: Legal & GoBD
        const legalTagBtn = screen.getByRole('button', { name: /🔒 Legal & GoBD/i });
        fireEvent.click(legalTagBtn);

        expect(screen.getByText(/DSGVO_Auftragsverarbeitungsvertrag_AVV.md/i)).toBeInTheDocument();
        expect(screen.getByText(/GoBD_Verfahrensdokumentation_Ersetzendes_Scannen.md/i)).toBeInTheDocument();
        expect(screen.queryByText(/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md/i)).not.toBeInTheDocument();

        // Tag: Onboarding
        const onboardingTagBtn = screen.getByRole('button', { name: /📋 Onboarding/i });
        fireEvent.click(onboardingTagBtn);

        expect(screen.getByText(/Systemzugangs_und_Sicherheits_Checkliste.md/i)).toBeInTheDocument();
        expect(screen.getByText(/Abnahmeprotokoll_und_Mitarbeiter_Cheatsheet.md/i)).toBeInTheDocument();
        expect(screen.queryByText(/DSGVO_Auftragsverarbeitungsvertrag_AVV.md/i)).not.toBeInTheDocument();

        // Tag: Alle
        const allTagBtn = screen.getByRole('button', { name: /^Alle/i });
        fireEvent.click(allTagBtn);

        expect(screen.getByText(/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md/i)).toBeInTheDocument();
        expect(screen.getByText(/Systemzugangs_und_Sicherheits_Checkliste.md/i)).toBeInTheDocument();
      });

      it('kombiniert Tag-Filter und Volltextsuche korrekt (AND-Verknüpfung)', () => {
        render(<DocsHubTestHarness />);

        // Filter tag 'handwerk'
        const handwerkBtn = screen.getByRole('button', { name: /🔨 Handwerk/i });
        fireEvent.click(handwerkBtn);

        // Search for 'Kaltakquise'
        const searchInput = screen.getByPlaceholderText(/Dokumente durchsuchen/i);
        fireEvent.change(searchInput, { target: { value: 'Kaltakquise' } });

        // Only Telefonleitfaden should match
        expect(screen.getByText(/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md/i)).toBeInTheDocument();
        expect(screen.queryByText(/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Mandanten_Flyer_Vorlage_Handwerk.md/i)).not.toBeInTheDocument();
      });
    });

    describe('2.3 Copy-to-Clipboard Interactions & Robustness', () => {
      it('kopiert Inhalt über navigator.clipboard.writeText und zeigt visuelles Feedback', async () => {
        const writeTextMock = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, {
          clipboard: {
            writeText: writeTextMock
          }
        });

        render(<DocsHubTestHarness />);

        const pitchDoc = screen.getByText(/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md/i).closest('.doc-link-item');
        const copyBtn = pitchDoc.querySelector('button[title*="Zwischenablage"]');

        fireEvent.click(copyBtn);

        expect(writeTextMock).toHaveBeenCalledTimes(1);
        expect(writeTextMock.mock.calls[0][0]).toContain('Steuerberater-Kanzlei-Pitch-Deck');
        expect(writeTextMock.mock.calls[0][0]).toContain('DATEV Rechnungsdatenservice 1.0 (RDS 1.0)');

        // Check if button title changes to copy confirmation
        expect(pitchDoc.querySelector('button[title*="kopiert!"]')).toBeInTheDocument();
      });

      it('verhält sich robust und stürzt nicht ab, wenn navigator.clipboard nicht verfügbar ist', () => {
        // Mocking absence of clipboard
        const originalClipboard = navigator.clipboard;
        Object.defineProperty(navigator, 'clipboard', {
          value: undefined,
          configurable: true,
          writable: true
        });

        render(<DocsHubTestHarness />);

        const flyerDoc = screen.getByText(/Mandanten_Flyer_Vorlage_Handwerk.md/i).closest('.doc-link-item');
        const copyBtn = flyerDoc.querySelector('button[title*="Zwischenablage"]');

        // Should not throw
        expect(() => fireEvent.click(copyBtn)).not.toThrow();

        // Restore clipboard
        Object.defineProperty(navigator, 'clipboard', {
          value: originalClipboard,
          configurable: true,
          writable: true
        });
      });

      it('behandelt Dokumente ohne Content sicher ohne Fehler', () => {
        const writeTextMock = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, {
          clipboard: {
            writeText: writeTextMock
          }
        });

        const customDocs = [
          { id: 'empty_doc', title: 'Leeres Dokument.md', content: '', tags: ['vertrieb'], status: 'local' }
        ];

        render(<DocsHubTestHarness customDocs={customDocs} />);

        const emptyCard = screen.getByText('Leeres Dokument.md').closest('.doc-link-item');
        const copyBtn = emptyCard.querySelector('button[title*="Zwischenablage"]');

        fireEvent.click(copyBtn);
        // writeText should not be called on empty content
        expect(writeTextMock).not.toHaveBeenCalled();
      });
    });
  });

});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ClientPortalView } from '../../components/ClientPortalView';

/**
 * Requirement 3: Mandanten-Portal & AaaS-Wartungs-Dashboard
 * 
 * Features Covered:
 * 9. Dediziertes Mandanten-Dashboard UI (Client-Branding, Switcher, AaaS-Retainer Status)
 * 10. Live Interface & Workflow Monitoring (Make.com, Lexoffice, DATEV, GoBD, OCR mit Blueprint 4 Diagnose)
 * 11. Produktivitäts- & ROI-Metriken (Monatsbelege, gerettete Sonntage, Zeiteinsparung, Euro)
 * 12. 1-Klick Support-Ticket-System (200 € / Monat Retainer, 60-Minuten Kontingent, SLA < 24h, Status-Pills)
 */

describe('Requirement 3: Mandanten-Portal & AaaS Dashboard Suite', () => {
  const sampleContacts = [
    {
      id: 'c1',
      name: 'Christian Gornitzka',
      company: 'GoClean Harz',
      industry: 'Gebäudereinigung & Handwerk',
      system: 'DATEV Belegbilderservice',
      links: [
        { id: 'l1', title: 'Google Drive GoBD-Archiv', url: 'https://drive.google.com' }
      ]
    },
    {
      id: 'c2',
      name: 'Hans Meister',
      company: 'Elektro Harz GmbH',
      industry: 'Elektrohandwerk',
      system: 'Lexware Office',
      links: []
    }
  ];

  const sampleProjects = [
    { client: 'GoClean Harz', pricePackage: 2500, trackedHours: 42.5, ready: true }
  ];

  const sampleTickets = [
    {
      id: 'ct1',
      client: 'GoClean Harz',
      company: 'GoClean Harz',
      title: 'Neuen Mitarbeiter für WhatsApp freischalten',
      category: 'Neuer Workflow',
      priority: 'hoch',
      status: 'offen',
      date: '2026-08-24',
      desc: 'Mitarbeiter Peter soll Tankbelege senden können.',
      estimatedMinutes: 15,
      minutesSpent: 15
    },
    {
      id: 'ct2',
      client: 'GoClean Harz',
      company: 'GoClean Harz',
      title: 'DATEV-Export Abgleich',
      category: 'GoBD-Anfrage',
      priority: 'mittel',
      status: 'in_arbeit',
      date: '2026-08-20',
      desc: 'Prüfung der Schnittstellen-Übergabe für Juli.',
      estimatedMinutes: 20,
      minutesSpent: 20
    },
    {
      id: 'ct3',
      client: 'GoClean Harz',
      company: 'GoClean Harz',
      title: 'Konto-Zuordnung angepasst',
      category: 'Beleg-Zuordnung',
      priority: 'niedrig',
      status: 'geloest',
      date: '2026-08-15',
      desc: 'Shell Tankstellenbelege auf Konto 4530 gemappt.',
      estimatedMinutes: 10,
      minutesSpent: 10
    }
  ];

  // =========================================================================
  // TIER 1: FEATURE TESTS - DASHBOARD UI & SWITCHER
  // =========================================================================

  describe('Feature 9: Dediziertes Mandanten-Dashboard UI', () => {
    it('rendert den Mandanten-Header mit Firmenname, Ansprechpartner, System und AaaS-Retainer-Status', () => {
      render(
        <ClientPortalView
          selectedClientCompany="GoClean Harz"
          contacts={sampleContacts}
          projects={sampleProjects}
          tickets={sampleTickets}
          onClosePortal={vi.fn()}
        />
      );

      expect(screen.getByText('Mandanten-Portal & AaaS Cockpit')).toBeInTheDocument();
      expect(screen.getAllByText('GoClean Harz').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Christian Gornitzka')).toBeInTheDocument();
      expect(screen.getAllByText(/DATEV Belegbilderservice/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/AaaS Digitaler Hausmeister \(200 € \/ Monat Retainer\) — AKTIV/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Zurück zu Gründer OS/i })).toBeInTheDocument();
    });

    it('erlaubt das Umschalten des Mandanten über das Dropdown-Menü', () => {
      const handleSelectCompany = vi.fn();
      render(
        <ClientPortalView
          selectedClientCompany="GoClean Harz"
          setSelectedClientCompany={handleSelectCompany}
          contacts={sampleContacts}
          projects={sampleProjects}
          tickets={sampleTickets}
        />
      );

      const select = screen.getByTitle('Mandanten auswählen');
      fireEvent.change(select, { target: { value: 'Elektro Harz GmbH' } });

      expect(handleSelectCompany).toHaveBeenCalledWith('Elektro Harz GmbH');
    });

    it('unterstützt Showcase-Modus zur Maskierung sensibler Kundendaten', () => {
      const maskFn = (val, type) => type === 'company' ? 'Muster-Handwerk GmbH' : val;
      render(
        <ClientPortalView
          selectedClientCompany="GoClean Harz"
          contacts={sampleContacts}
          projects={sampleProjects}
          tickets={sampleTickets}
          mask={maskFn}
          showcaseMode={true}
        />
      );

      expect(screen.getAllByText('Muster-Handwerk GmbH').length).toBeGreaterThanOrEqual(1);
    });
  });

  // =========================================================================
  // TIER 1: FEATURE TESTS - LIVE MONITORING & HEALTH CHECK
  // =========================================================================

  describe('Feature 10: Live Interface Monitoring & Blueprint 4 Simulation', () => {
    it('zeigt alle 5 Kern-Schnittstellen im Live/Grün Status an', () => {
      render(
        <ClientPortalView
          selectedClientCompany="GoClean Harz"
          contacts={sampleContacts}
          projects={sampleProjects}
          tickets={sampleTickets}
        />
      );

      expect(screen.getByText('Live Schnittstellen- & Workflow-Monitoring')).toBeInTheDocument();
      expect(screen.getByText(/Make\.com Core/i)).toBeInTheDocument();
      expect(screen.getByText(/Lexoffice API/i)).toBeInTheDocument();
      expect(screen.getByText(/DATEV Datenservice/i)).toBeInTheDocument();
      expect(screen.getByText(/GoBD Cloud-Archiv/i)).toBeInTheDocument();
      expect(screen.getByText(/GPT-4o Vision OCR/i)).toBeInTheDocument();
    });

    it('führt die 1-Klick Schnittstellen-Diagnose (Blueprint 4) aus und aktualisiert die Logs', async () => {
      const handleRunDiagnostic = vi.fn().mockResolvedValue({ status: 'ok' });

      render(
        <ClientPortalView
          selectedClientCompany="GoClean Harz"
          contacts={sampleContacts}
          projects={sampleProjects}
          tickets={sampleTickets}
          onRunDiagnostic={handleRunDiagnostic}
        />
      );

      const diagBtn = screen.getByRole('button', { name: /Schnittstellen-Diagnose ausführen/i });
      fireEvent.click(diagBtn);

      await waitFor(() => {
        expect(screen.getByText(/Blueprint 4 Diagnostics Protokoll/i)).toBeInTheDocument();
      }, { timeout: 10000 });

      expect(await screen.findByText(/100% HEALTHY/i, {}, { timeout: 10000 })).toBeInTheDocument();
      expect(screen.getByText(/Lexware Office API Ping/i)).toBeInTheDocument();
      expect(screen.getAllByText(/DATEV Belegbilderservice/i).length).toBeGreaterThanOrEqual(1);
      expect(handleRunDiagnostic).toHaveBeenCalled();
    });
  });

  // =========================================================================
  // TIER 1: FEATURE TESTS - ROI & PRODUCTIVITY METRICS
  // =========================================================================

  describe('Feature 11: Produktivitäts- & ROI-Metriken (KPI Grid)', () => {
    it('zeigt Monatsbelege, gerettete Sonntage, Zeiteinsparung und kalkulatorische Ersparnis an', () => {
      render(
        <ClientPortalView
          selectedClientCompany="GoClean Harz"
          contacts={sampleContacts}
          projects={sampleProjects}
          tickets={sampleTickets}
          metrics={{
            monthlyReceipts: 210,
            savedSundays: 4,
            savedHours: 52,
            savedEuros: 4420
          }}
        />
      );

      expect(screen.getByText('Verarbeitete Monatsbelege')).toBeInTheDocument();
      expect(screen.getByText('210 Belege')).toBeInTheDocument();
      expect(screen.getByText('4 / 4 Sonntage')).toBeInTheDocument();
      expect(screen.getByText('~ 52 Std.')).toBeInTheDocument();
      expect(screen.getByText(/4\.420/)).toBeInTheDocument();
    });
  });

  // =========================================================================
  // TIER 1: FEATURE TESTS - SUPPORT TICKET SYSTEM & 200€ RETAINER
  // =========================================================================

  describe('Feature 12: 1-Klick Support-Ticket-System & Retainer-Kontingent', () => {
    it('überwacht das monatliche 60-Minuten Retainer-Kontingent für den Digitalen Hausmeister', () => {
      render(
        <ClientPortalView
          selectedClientCompany="GoClean Harz"
          contacts={sampleContacts}
          projects={sampleProjects}
          tickets={sampleTickets}
        />
      );

      // In sampleTickets: 15 + 20 + 10 = 45 Minuten verbraucht -> 15 Minuten Restzeit
      expect(screen.getByText(/Digitaler Hausmeister \(200 € \/ Mo\) — Kontingent/i)).toBeInTheDocument();
      expect(screen.getByText('15 Min. Restzeit')).toBeInTheDocument();
      expect(screen.getByText(/45 \/ 60 Minuten/i)).toBeInTheDocument();
      expect(screen.getByText(/SLA-Garantie/i)).toBeInTheDocument();
    });

    it('erlaubt das Erstellen eines Support-Tickets und löst Callback aus', () => {
      const handleAddTicket = vi.fn();

      render(
        <ClientPortalView
          selectedClientCompany="GoClean Harz"
          contacts={sampleContacts}
          projects={sampleProjects}
          tickets={sampleTickets}
          onAddTicket={handleAddTicket}
        />
      );

      const titleInput = screen.getByPlaceholderText(/z\.B\. WhatsApp-Gateway/i);
      const descInput = screen.getByPlaceholderText(/Bitte beschreibe kurz/i);
      const submitBtn = screen.getByRole('button', { name: /1-Klick Ticket absenden/i });

      fireEvent.change(titleInput, { target: { value: 'Neuer E-Mail-Lieferant für PDF-Rechnungen' } });
      fireEvent.change(descInput, { target: { value: 'Rechnungen von Wüstenrot sollen gescannt werden.' } });
      fireEvent.click(submitBtn);

      expect(handleAddTicket).toHaveBeenCalledWith(expect.objectContaining({
        client: 'GoClean Harz',
        title: 'Neuer E-Mail-Lieferant für PDF-Rechnungen',
        desc: 'Rechnungen von Wüstenrot sollen gescannt werden.',
        status: 'offen'
      }));

      expect(screen.getByText(/erfolgreich eingereicht/i)).toBeInTheDocument();
    });

    it('filtert Tickets nach Status (Alle, Offen, In Arbeit, Gelöst)', () => {
      render(
        <ClientPortalView
          selectedClientCompany="GoClean Harz"
          contacts={sampleContacts}
          projects={sampleProjects}
          tickets={sampleTickets}
        />
      );

      expect(screen.getByText('Neuen Mitarbeiter für WhatsApp freischalten')).toBeInTheDocument();
      expect(screen.getByText('DATEV-Export Abgleich')).toBeInTheDocument();
      expect(screen.getByText('Konto-Zuordnung angepasst')).toBeInTheDocument();

      // Klick auf "In Arbeit"
      const inProgressBtn = screen.getByRole('button', { name: /In Arbeit \(1\)/i });
      fireEvent.click(inProgressBtn);

      expect(screen.getByText('DATEV-Export Abgleich')).toBeInTheDocument();
      expect(screen.queryByText('Neuen Mitarbeiter für WhatsApp freischalten')).not.toBeInTheDocument();
      expect(screen.queryByText('Konto-Zuordnung angepasst')).not.toBeInTheDocument();
    });

    it('schaltet den Ticket-Status per Klick auf die Status-Pill zyklisch weiter', () => {
      const handleUpdateStatus = vi.fn();

      render(
        <ClientPortalView
          selectedClientCompany="GoClean Harz"
          contacts={sampleContacts}
          projects={sampleProjects}
          tickets={sampleTickets}
          onUpdateTicketStatus={handleUpdateStatus}
        />
      );

      // Klicke auf die Status-Pill des ersten Tickets (offen -> in_arbeit)
      const pills = screen.getAllByTitle(/Klick: Status weiterschalten/i);
      fireEvent.click(pills[0]);

      expect(handleUpdateStatus).toHaveBeenCalledWith('ct1', 'in_arbeit');
    });
  });

  // =========================================================================
  // TIER 2: BOUNDARY VALUES & EDGE CASES
  // =========================================================================

  describe('Tier 2: Boundary Values & Error Handling', () => {
    it('behandelt leere Ticket-Listen und unbekannte Mandanten robust', () => {
      render(
        <ClientPortalView
          selectedClientCompany="Unbekannter Mandant"
          contacts={[]}
          projects={[]}
          tickets={[]}
        />
      );

      expect(screen.getByText('Unbekannter Mandant')).toBeInTheDocument();
      expect(screen.getByText(/Support-Tickets \(0\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Keine Tickets für diesen Filter gefunden/i)).toBeInTheDocument();
    });

    it('begrenzt das Retainer-Kontingent bei Überschreitung der 60 Minuten auf 100% Balken und 0 Min Restzeit', () => {
      const heavyTickets = [
        { id: 'h1', client: 'GoClean Harz', title: 'Großer Umbau', minutesSpent: 90, status: 'in_arbeit' }
      ];

      render(
        <ClientPortalView
          selectedClientCompany="GoClean Harz"
          contacts={sampleContacts}
          projects={sampleProjects}
          tickets={heavyTickets}
        />
      );

      expect(screen.getByText('0 Min. Restzeit')).toBeInTheDocument();
      expect(screen.getByText('60 / 60 Minuten')).toBeInTheDocument();
    });
  });

});

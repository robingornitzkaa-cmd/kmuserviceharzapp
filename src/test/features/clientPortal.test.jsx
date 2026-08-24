import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClientPortalView } from '../../components/ClientPortalView';

describe('Requirement 3: Mandanten-Portal & AaaS-Wartungs-Dashboard', () => {
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
      name: 'Hans Müller',
      company: 'Dachdeckerei Müller',
      industry: 'Dachdeckerhandwerk',
      system: 'Lexware Office',
      links: []
    }
  ];

  const sampleProjects = [
    { client: 'GoClean Harz', pricePackage: 2500, trackedHours: 42.5, ready: true }
  ];

  const sampleSopTemplates = [
    {
      name: 'Belegübermittlung per WhatsApp',
      steps: ['Foto von Beleg machen', 'An WhatsApp-Nummer senden', 'Automatische Vorkontierung abwarten']
    }
  ];

  const sampleTickets = [
    {
      id: 'ct1',
      client: 'GoClean Harz',
      company: 'GoClean Harz',
      title: 'Neuen Mitarbeiter für WhatsApp-Gateway freischalten',
      category: 'Neuer Workflow',
      priority: 'hoch',
      status: 'offen',
      date: '2026-08-24',
      desc: 'Bitte Mitarbeiter Peter für die mobile Belegerfassung freigeben.',
      estimatedMinutes: 15,
      minutesSpent: 15
    },
    {
      id: 'ct2',
      client: 'GoClean Harz',
      company: 'GoClean Harz',
      title: 'Tankstellen-Belege automatisch kategorisieren',
      category: 'Beleg-Zuordnung',
      priority: 'mittel',
      status: 'in_arbeit',
      date: '2026-08-20',
      desc: 'Shell & Aral Belege sollen auf Konto 4530 gebucht werden.',
      estimatedMinutes: 20,
      minutesSpent: 20
    },
    {
      id: 'ct3',
      client: 'GoClean Harz',
      company: 'GoClean Harz',
      title: 'Monatlicher DATEV-Export Abgleich',
      category: 'GoBD-Anfrage',
      priority: 'niedrig',
      status: 'geloest',
      date: '2026-08-15',
      desc: 'Export Juli 2026 erfolgreich an Steuerberater übermittelt.',
      estimatedMinutes: 10,
      minutesSpent: 10
    }
  ];

  it('rendert das Mandantenportal mit Firmen-Header, Ansprechpartner und AaaS-Retainer-Status', () => {
    render(
      <ClientPortalView
        selectedClientCompany="GoClean Harz"
        contacts={sampleContacts}
        projects={sampleProjects}
        sopTemplates={sampleSopTemplates}
        tickets={sampleTickets}
        onClosePortal={vi.fn()}
      />
    );

    expect(screen.getByText('Mandanten-Portal & AaaS Cockpit')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /GoClean Harz/i })).toBeInTheDocument();
    expect(screen.getByText('Christian Gornitzka')).toBeInTheDocument();
    expect(screen.getAllByText(/DATEV Belegbilderservice/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/AaaS Digitaler Hausmeister \(200 € \/ Monat Retainer\) — AKTIV/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Zurück zu Gründer OS/i })).toBeInTheDocument();
  });

  it('zeigt das Live Interface Monitoring aller Kern-Schnittstellen an (Make, Lexoffice, DATEV, GoBD, KI-OCR)', () => {
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

  it('führt die 1-Klick Schnittstellen-Diagnose (Blueprint 4) aus und zeigt das Protokoll an', async () => {
    const handleRunDiagnostic = vi.fn().mockResolvedValue({ status: 'healthy' });

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

    // Wait for diagnostics completion
    await waitFor(() => {
      expect(screen.getByText(/Blueprint 4 Diagnostics Protokoll/i)).toBeInTheDocument();
      expect(screen.getByText(/100% HEALTHY/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText(/Lexware Office API Ping/i)).toBeInTheDocument();
    expect(screen.getAllByText(/DATEV Belegbilderservice/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Make\.com Core Inbound Webhook/i)).toBeInTheDocument();
    expect(handleRunDiagnostic).toHaveBeenCalled();
  });

  it('zeigt Produktivitäts- & ROI-Metriken (Monatsbelege, gerettete Sonntage, Zeiteinsparung, Euro)', () => {
    render(
      <ClientPortalView
        selectedClientCompany="GoClean Harz"
        contacts={sampleContacts}
        projects={sampleProjects}
        tickets={sampleTickets}
        metrics={{
          monthlyReceipts: 180,
          savedSundays: 4,
          savedHours: 45,
          savedEuros: 3825
        }}
      />
    );

    expect(screen.getByText('Verarbeitete Monatsbelege')).toBeInTheDocument();
    expect(screen.getByText('180 Belege')).toBeInTheDocument();
    expect(screen.getByText('4 / 4 Sonntage')).toBeInTheDocument();
    expect(screen.getByText('~ 45 Std.')).toBeInTheDocument();
    expect(screen.getByText(/3\.825/)).toBeInTheDocument();
  });

  it('überwacht das 200 € / Monat Retainer-Kontingent (60-Minuten Tracker & Restzeit)', () => {
    render(
      <ClientPortalView
        selectedClientCompany="GoClean Harz"
        contacts={sampleContacts}
        projects={sampleProjects}
        tickets={sampleTickets}
      />
    );

    expect(screen.getByText(/Digitaler Hausmeister \(200 € \/ Mo\) — Kontingent/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Minuten/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Monatlicher Inklusiv-Puffer:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/60 Min/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/SLA-Garantie/i)).toBeInTheDocument();
  });

  it('erlaubt das Einreichen eines Support-Tickets mit Kategorie, Priorität und Beschreibung', () => {
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

    // Inputs via label siblings
    const titleInput = screen.getByText('Betreff / Anliegen *').nextElementSibling;
    const categorySelect = screen.getByText('Kategorie *').nextElementSibling;
    const prioritySelect = screen.getByText('Priorität *').nextElementSibling;
    const descTextarea = screen.getByText('Beschreibung des Problems oder Wunsches').nextElementSibling;
    const submitBtn = screen.getByRole('button', { name: /1-Klick Ticket absenden/i });

    fireEvent.change(titleInput, { target: { value: 'Fehlerhafte Beleg-Zuordnung bei Tankrechnungen' } });
    fireEvent.change(categorySelect, { target: { value: 'Beleg-Zuordnung' } });
    fireEvent.change(prioritySelect, { target: { value: 'hoch' } });
    fireEvent.change(descTextarea, { target: { value: 'Tankbelege von TotalEnergies wurden nicht automatisch gebucht.' } });

    fireEvent.click(submitBtn);

    expect(handleAddTicket).toHaveBeenCalledWith(expect.objectContaining({
      client: 'GoClean Harz',
      title: 'Fehlerhafte Beleg-Zuordnung bei Tankrechnungen',
      category: 'Beleg-Zuordnung',
      priority: 'hoch',
      status: 'offen',
      desc: 'Tankbelege von TotalEnergies wurden nicht automatisch gebucht.'
    }));

    expect(screen.getByText(/erfolgreich eingereicht/i)).toBeInTheDocument();
  });

  it('filtert Tickets nach Status-Pills (Alle, Offen, In Arbeit, Gelöst)', () => {
    render(
      <ClientPortalView
        selectedClientCompany="GoClean Harz"
        contacts={sampleContacts}
        projects={sampleProjects}
        tickets={sampleTickets}
      />
    );

    expect(screen.getByText('Neuen Mitarbeiter für WhatsApp-Gateway freischalten')).toBeInTheDocument();
    expect(screen.getByText('Tankstellen-Belege automatisch kategorisieren')).toBeInTheDocument();
    expect(screen.getByText('Monatlicher DATEV-Export Abgleich')).toBeInTheDocument();

    // Filter "Offen"
    const openFilterBtn = screen.getByRole('button', { name: /Offen \(1\)/i });
    fireEvent.click(openFilterBtn);

    expect(screen.getByText('Neuen Mitarbeiter für WhatsApp-Gateway freischalten')).toBeInTheDocument();
    expect(screen.queryByText('Tankstellen-Belege automatisch kategorisieren')).not.toBeInTheDocument();
    expect(screen.queryByText('Monatlicher DATEV-Export Abgleich')).not.toBeInTheDocument();

    // Filter "Gelöst"
    const resolvedFilterBtn = screen.getByRole('button', { name: /Gelöst \(1\)/i });
    fireEvent.click(resolvedFilterBtn);

    expect(screen.queryByText('Neuen Mitarbeiter für WhatsApp-Gateway freischalten')).not.toBeInTheDocument();
    expect(screen.getByText('Monatlicher DATEV-Export Abgleich')).toBeInTheDocument();
  });

  it('erlaubt das Umschalten des Ticket-Status per Klick auf die Status-Pill', () => {
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

    const statusPills = screen.getAllByTitle(/Klick: Status weiterschalten/i);
    expect(statusPills.length).toBeGreaterThanOrEqual(1);
    fireEvent.click(statusPills[0]);

    expect(handleUpdateStatus).toHaveBeenCalledWith('ct1', 'in_arbeit');
  });

  it('rendert freigegebene SOPs und revisionssichere Projekt-Links', () => {
    render(
      <ClientPortalView
        selectedClientCompany="GoClean Harz"
        contacts={sampleContacts}
        projects={sampleProjects}
        sopTemplates={sampleSopTemplates}
        tickets={sampleTickets}
      />
    );

    expect(screen.getByText('Belegübermittlung per WhatsApp')).toBeInTheDocument();
    expect(screen.getByText(/Foto von Beleg machen/i)).toBeInTheDocument();
    expect(screen.getByText(/Google Drive GoBD-Archiv/i)).toBeInTheDocument();
  });
});

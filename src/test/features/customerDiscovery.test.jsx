import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomerDiscoveryView } from '../../components/CustomerDiscoveryView';
import { INITIAL_DISCOVERY_LEADS } from '../../constants/initialData';

const DiscoveryTestWrapper = ({ initialLeads = INITIAL_DISCOVERY_LEADS }) => {
  const [discoveryLeads, setDiscoveryLeads] = useState(initialLeads);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [docs, setDocs] = useState([]);
  const [contacts, setContacts] = useState([]);

  return (
    <CustomerDiscoveryView
      discoveryLeads={discoveryLeads}
      setDiscoveryLeads={setDiscoveryLeads}
      leads={[
        {
          id: 'l_test_1',
          company: 'Malerbetrieb Harzfarben',
          name: 'Stefan Maler',
          industry: 'Handwerk',
          city: 'Clausthal',
          phone: '05323 112233'
        }
      ]}
      contacts={contacts}
      setContacts={setContacts}
      calendarEvents={calendarEvents}
      setCalendarEvents={setCalendarEvents}
      docs={docs}
      setDocs={setDocs}
      showcaseMode={false}
      mask={(t) => t}
      isMobile={false}
      showToast={vi.fn()}
    />
  );
};

describe('CustomerDiscoveryView Feature - 15–20 Min Validierungs-Interviews & Kalender', () => {
  it('rendert das Validierungs-Radar, die Kontaktliste und Phase 1 mit personalisierter Anrede', () => {
    render(<DiscoveryTestWrapper />);

    expect(
      screen.getByText(/Customer-Discovery & Positionierungs-Validierung/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/SHK Meisterbetrieb Meier GmbH/i).length).toBeGreaterThan(0);
    // Personalisierte Anrede aus "Thomas Meier" -> "Meier"
    expect(screen.getByText('Meier')).toBeInTheDocument();
  });

  it('importiert Kontakte per Copy-Paste und übernimmt Kontakte aus dem Lead-Tracker', () => {
    render(<DiscoveryTestWrapper />);

    // 1. Copy-Paste Import öffnen
    fireEvent.click(screen.getByRole('button', { name: /Liste einfügen/i }));
    const pasteArea = screen.getByPlaceholderText(/Elektro Müller GmbH/i);
    fireEvent.change(pasteArea, {
      target: { value: 'GaLaBau Brockenblick; Uwe Grün; 05321 776655; Goslar; GaLaBau' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Jetzt importieren/i }));

    expect(screen.getAllByText(/GaLaBau Brockenblick/i).length).toBeGreaterThan(0);

    // 2. Aus bestehenden Leads übernehmen
    fireEvent.click(screen.getByRole('button', { name: /Kontakte aus Lead-Tracker/i }));
    expect(screen.getByText(/Malerbetrieb Harzfarben/i)).toBeInTheDocument();
  });

  it('steuert die Ausweichrouten in Phase 1 und speichert einen Interview-Termin im Kalender', () => {
    render(<DiscoveryTestWrapper />);

    // Klick auf Ausweichroute "Keine Zeit / Gerade schlecht" öffnet den Kalender-Planer
    fireEvent.click(screen.getByText(/Keine Zeit \/ Gerade schlecht/i));

    expect(
      screen.getByText(/Wann passt es für kurze 15 Minuten am besten/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/15–20 Min Interview-Termin in Kalender eintragen/i)
    ).toBeInTheDocument();

    // Schnellwahl Freitag 13:00 Uhr klicken und speichern
    fireEvent.click(screen.getByRole('button', { name: /Kommenden Freitag 13:00 Uhr/i }));
    fireEvent.click(
      screen.getByRole('button', { name: /Im Founder-OS-Kalender speichern/i })
    );

    // Status sollte auf "Termin vereinbart" wechseln und Uhrzeit 13:00 anzeigen
    expect(screen.getAllByText(/13:00/i).length).toBeGreaterThan(0);
  });

  it('schaltet durch die Diagnose-Weiche (Phase 3 Pfade A–E), zeigt den passenden Pitch (Phase 4) und legt Empfehlungen (Phase 6) an', () => {
    render(<DiscoveryTestWrapper />);

    // Zu Phase 3 wechseln
    fireEvent.click(screen.getByRole('button', { name: /Phase 3/i }));
    expect(screen.getByText(/Breite Radar-Frage/i)).toBeInTheDocument();

    // Ausweichroute "Rechnungen sind bei uns kein Problem!" testen
    fireEvent.click(
      screen.getByRole('button', { name: /Rechnungen sind bei uns kein Problem/i })
    );
    expect(
      screen.getByText(/Stark, dann gehört Ihr Betrieb da schon zu den wenigen Vorreitern/i)
    ).toBeInTheDocument();

    // Pfad B dazuwählen
    fireEvent.click(screen.getByRole('button', { name: /Pfad B: Kundenfront & Termine/i }));
    expect(
      screen.getByText(/Kommen Anfragen bei Ihnen noch klassisch per Telefon und Zettel rein/i)
    ).toBeInTheDocument();

    // Zu Phase 4 wechseln -> Empfohlener Pitch für Pfad B ist sichtbar
    fireEvent.click(screen.getByRole('button', { name: /Weiter zu Phase 4/i }));
    expect(
      screen.getByText(/wir richten für Ihre Website ein einfaches Buchungs- und Anfrage-System ein/i)
    ).toBeInTheDocument();

    // Zu Phase 6 wechseln -> Empfehlung als neuen Kontakt anlegen
    fireEvent.click(screen.getByRole('button', { name: /Phase 6/i }));
    fireEvent.click(screen.getByRole('button', { name: /Als neuen Kontakt anlegen/i }));
    expect(screen.getAllByText(/Elektro Klinke Goslar/i).length).toBeGreaterThan(0);
  });
});

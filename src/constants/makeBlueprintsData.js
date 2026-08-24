/**
 * KMU Service Harz - Master Make.com Blueprints & Scenario Configurations
 * Vollständig validierte Blueprints für die 4 Stufen der Value Ladder 2026.
 */

export const MAKE_BLUEPRINTS_DATA = [
  {
    id: 'bp1',
    tier: 'Stufe 2: Core Offer (2.000 €)',
    badge: 'Bestseller (100% Marge)',
    title: 'Lautlose Belegerfassung & DATEV-Export',
    description: 'WhatsApp & E-Mail Belegeingang -> KI-OCR (GPT-4o Vision) -> GoBD Cloud-Archiv -> Lexware Office Vorkontierung -> DATEV Belegbilderservice.',
    filename: 'blueprint_1_belegerfassung_lexoffice_datev.json',
    downloadUrl: '/make-blueprints/blueprint_1_belegerfassung_lexoffice_datev.json',
    webhookPath: '/webhook/v1/inbound-belege',
    triggerType: 'Instant Webhook (WhatsApp / Mail-Gateway)',
    modulesCount: 8,
    estimatedMonthlyOps: '150 - 450 Ops/Monat',
    nodes: [
      { id: 1, name: '1. Inbound Webhook', type: 'webhook', icon: 'Inbox', desc: 'Fängt Belege (PDF/JPG) aus WhatsApp & Mail ab.' },
      { id: 2, name: '2. MIME-Filter', type: 'filter', icon: 'Filter', desc: 'Validiert PDF, PNG und JPG Dateien.' },
      { id: 3, name: '3. GPT-4o Vision OCR', type: 'ai', icon: 'BrainCircuit', desc: 'Extrahiert Beträge, Kreditor, Datum, Steuersatz, IBAN.' },
      { id: 4, name: '4. JSON Validator', type: 'parser', icon: 'FileCode', desc: 'Strukturiert Beleg-JSON für Buchhaltung.' },
      { id: 5, name: '5. Google Drive GoBD', type: 'cloud', icon: 'HardDrive', desc: 'Revisionssichere Ablage mit Zeitstempel.' },
      { id: 6, name: '6. Lexware Office', type: 'erp', icon: 'ClipboardCopy', desc: 'Erstellt Vorkontierungs-Beleg (Purchase Invoice).' },
      { id: 7, name: '7. DATEV Belegbilderservice', type: 'tax', icon: 'Database', desc: 'Überträgt Belegbild & Metadaten an Steuerberater.' },
      { id: 8, name: '8. Response Gateway', type: 'response', icon: 'CheckCircle', desc: 'Sendet Bestätigung an WhatsApp-Absender zurück.' }
    ],
    samplePayload: {
      senderPhone: "+4917612345678",
      fileName: "rechnung_grosshandel_082026.pdf",
      mimeType: "application/pdf",
      fileUrl: "https://cloud.kmu-service-harz.de/temp/doc_982.pdf"
    },
    setupSteps: [
      "1. JSON Blueprint in Make.com importieren (Menü '...' -> Import Blueprint).",
      "2. OpenAI Connection anlegen (API-Key mit Zugriff auf GPT-4o).",
      "3. Lexware Office API-Schlüssel unter Einstellungen -> Erweiterungen generieren.",
      "4. Google Drive Zielordner '/KMU_Service_Harz/Belegarchiv/' auswählen.",
      "5. DATEV Belegbilderservice Authentifizierung mit Mandantennummer hinterlegen."
    ]
  },
  {
    id: 'bp2',
    tier: 'Stufe 2+: High-Ticket (ab 6.000 €)',
    badge: 'Förderfähig (50-80%)',
    title: '24/7 Handwerker-Anfrage-Funnel & Notfall-Qualifizierung',
    description: 'Nimmt Kundenanfragen rund um die Uhr per WhatsApp & Webformular entgegen, qualifiziert Gewerk und Dringlichkeit per KI, blockt Google Calendar Termine und legt Leads im CRM an.',
    filename: 'blueprint_2_handwerker_lead_qualifier_booking.json',
    downloadUrl: '/make-blueprints/blueprint_2_handwerker_lead_qualifier_booking.json',
    webhookPath: '/webhook/v1/lead-funnel',
    triggerType: 'Instant Webhook (WhatsApp / Web-Formular)',
    modulesCount: 6,
    estimatedMonthlyOps: '100 - 300 Ops/Monat',
    nodes: [
      { id: 1, name: '1. Anfrage Webhook', type: 'webhook', icon: 'Inbox', desc: 'Empfängt Kundenanfrage von Website / WhatsApp.' },
      { id: 2, name: '2. GPT-4o Intent-Engine', type: 'ai', icon: 'BrainCircuit', desc: 'Klassifiziert Gewerk, Dringlichkeit (1-5) & Notfall-Status.' },
      { id: 3, name: '3. Lead-Parser', type: 'parser', icon: 'FileCode', desc: 'Validiert Kontaktdaten, Adresse & Schadensbild.' },
      { id: 4, name: '4. Supabase CRM Sync', type: 'database', icon: 'Database', desc: 'Speichert Lead mit Dringlichkeitsstufe.' },
      { id: 5, name: '5. Google Calendar Slot', type: 'calendar', icon: 'Clock', desc: 'Blockt Termin für Vor-Ort-Besichtigung.' },
      { id: 6, name: '6. Auto-Reply WhatsApp', type: 'response', icon: 'Phone', desc: 'Sendet persönliche Bestätigung an Neukunden.' }
    ],
    samplePayload: {
      senderPhone: "+4915199887766",
      customerName: "Familie Weber",
      city: "38640 Goslar",
      messageText: "Hallo, bei uns im Keller tropft das Hauptrohr der Heizung! Bitte dringend um Rückruf."
    },
    setupSteps: [
      "1. Blueprint in Make.com laden.",
      "2. Supabase API-Key und URL aus .env eintragen.",
      "3. Google Calendar des Meisters verknüpfen (Termindauer standardmäßig 60 Min).",
      "4. Notfall-Alarmierung via SMS/WhatsApp an Notdienst-Nummer konfigurieren."
    ]
  },
  {
    id: 'bp3',
    tier: 'Stufe 2: Core Offer (2.000 €)',
    badge: 'Mobile First',
    title: 'Baustellen-Audio-Zeiterfassung & Foto-Ablage',
    description: 'Monteur spricht Arbeitszeiten als Sprachnachricht ein (Whisper Transkription) oder sendet Baustellenfotos. Automatische Zeiterfassungsbuchung und Fotoablage im Kundenordner.',
    filename: 'blueprint_3_baustellen_audio_zeiterfassung_fotos.json',
    downloadUrl: '/make-blueprints/blueprint_3_baustellen_audio_zeiterfassung_fotos.json',
    webhookPath: '/webhook/v1/baustelle-inbound',
    triggerType: 'Multi-Part Webhook (WhatsApp Audio / Image)',
    modulesCount: 10,
    estimatedMonthlyOps: '300 - 800 Ops/Monat',
    nodes: [
      { id: 1, name: '1. Multi-Inbound Webhook', type: 'webhook', icon: 'Inbox', desc: 'Empfängt Sprachnotizen oder Baustellenfotos.' },
      { id: 2, name: '2. Smart-Router', type: 'router', icon: 'Zap', desc: 'Leitet weiter nach Audio vs. Bilddatei.' },
      { id: 3, name: '3A. Whisper Transkription', type: 'ai', icon: 'Volume2', desc: 'Wandelt Sprache des Monteurs in Text um.' },
      { id: 4, name: '4A. GPT-4o Zeitanalyse', type: 'ai', icon: 'BrainCircuit', desc: 'Extrahiert Name, Projekt, Dauer und Tätigkeit.' },
      { id: 5, name: '5A. Zeiterfassung Buchung', type: 'erp', icon: 'ClipboardCopy', desc: 'Schreibt Stunden in Lexoffice / Personio.' },
      { id: 6, name: '6A. Quittung an Monteur', type: 'response', icon: 'CheckCircle', desc: 'WhatsApp Rückmeldung mit gebuchten Stunden.' },
      { id: 7, name: '3B. GPT-4o Vision Foto-Tag', type: 'ai', icon: 'BrainCircuit', desc: 'Erkennt Bauabschnitt (Vorher / Mangel / Fertig).' },
      { id: 8, name: '4B. Cloud-Ablage', type: 'cloud', icon: 'HardDrive', desc: 'Speichert Foto in Projektordner mit Datum.' }
    ],
    samplePayload: {
      senderPhone: "+4917011223344",
      workerName: "Max Meister",
      mimeType: "audio/ogg",
      fileBuffer: "<base64_audio_stream>"
    },
    setupSteps: [
      "1. Blueprint importieren.",
      "2. OpenAI Whisper Modul aktivieren.",
      "3. Google Drive / Nextcloud Kundenordner Struktur anlegen.",
      "4. Mitarbeiter-Telefonnummern zur Autorisierung in der Whitelist hinterlegen."
    ]
  },
  {
    id: 'bp4',
    tier: 'Stufe 3: Retainer (200 €/Monat)',
    badge: 'Recurring MRR',
    title: 'AaaS 24/7 Schnittstellen-Monitoring & Break-Fix',
    description: 'Überwacht alle 15 Minuten den Zustand von Lexware Office, DATEV Schnittstellen und Supabase DB. Alarmiert KMU Service Harz Support proaktiv bei API-Änderungen oder Downtimes.',
    filename: 'blueprint_4_aaas_system_monitoring_healthcheck.json',
    downloadUrl: '/make-blueprints/blueprint_4_aaas_system_monitoring_healthcheck.json',
    webhookPath: '/cron/15min-healthcheck',
    triggerType: 'Schedule Trigger (Alle 15 Minuten)',
    modulesCount: 7,
    estimatedMonthlyOps: '2.880 Ops/Monat',
    nodes: [
      { id: 1, name: '1. Cron Trigger', type: 'cron', icon: 'Clock', desc: 'Startet alle 15 Minuten den Health-Check.' },
      { id: 2, name: '2. Lexoffice API Ping', type: 'http', icon: 'Zap', desc: 'Prüft HTTP 200 & Token-Gültigkeit.' },
      { id: 3, name: '3. Supabase DB Ping', type: 'database', icon: 'Database', desc: 'Prüft Cloud-Datenbank Verbindung.' },
      { id: 4, name: '4. Status Aggregator', type: 'logic', icon: 'FileCode', desc: 'Ermittelt Gesamtstatus der Schnittstellen.' },
      { id: 5, name: '5. Router: OK vs Alarm', type: 'router', icon: 'Zap', desc: 'Filtert fehlerfreie Pings heraus.' },
      { id: 6, name: '6A. Telegram Notfall-Alert', type: 'alert', icon: 'AlertTriangle', desc: 'Alarmiert KMU Harz Support aufs Handy.' },
      { id: 7, name: '6B. Silent Success Log', type: 'log', icon: 'CheckCircle', desc: 'Lautloser Betrieb ohne Kundenstörung.' }
    ],
    samplePayload: {
      checkTime: "2026-08-24T20:45:00Z",
      status: "SYSTEM_HEALTHY",
      monitoredClient: "Dachdeckerei Müller"
    },
    setupSteps: [
      "1. Blueprint importieren.",
      "2. Telegram Bot Token und Support-Channel-ID eintragen.",
      "3. Intervall auf 15 Minuten setzen und aktivieren.",
      "4. Fertig: Du wirst automatisch geweckt, bevor der Kunde einen Ausfall bemerkt!"
    ]
  }
];

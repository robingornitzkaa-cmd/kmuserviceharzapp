import { MASTER_LOGBUCH_CONTENT } from '../assets/docs/masterLogbuch.js';

export { MASTER_LOGBUCH_CONTENT };

export const INITIAL_HABITS = [
  { id: 'h1', text: '3 Akquise-Mails gesendet?', completed: false },
  { id: 'h2', text: 'Sport gemacht (30 Min)?', completed: false },
  { id: 'h3', text: 'Tagesfokus-Aufgaben definiert?', completed: false }
];

export const INITIAL_FOCUS_TASKS = [
  { id: 'f1', text: 'Konzept Founder OS finalisieren', completed: true },
  { id: 'f2', text: 'Multiplikatoren-Liste (15 Steuerberater) erstellen', completed: false },
  { id: 'f3', text: 'Kennenlern-Workshop GoClean vorbereiten', completed: false }
];

export const INITIAL_INBOX = [
  { id: 'i1', text: 'Notiz: Fördermittel-Antrag für Digitalbonus Niedersachsen hat neue Richtlinien ab Juli. Unbedingt prüfen!', date: '2026-06-24' },
  { id: 'i2', text: 'Idee: Einen automatischen WhatsApp-Bot für Handwerker als Einstiegs-Produkt anbieten (z.B. für Terminbuchungen).', date: '2026-06-23' },
  { id: 'i3', text: 'Notiz: Steuerberater Klinke in Wernigerode kontaktieren. Eventuell Kooperation möglich.', date: '2026-06-22' }
];

export const INITIAL_TASKS = [
  { id: 't1', title: 'Make-Szenario für Beleg-Upload via Mail bauen', priority: 'high', column: 'todo', date: '2026-06-24' },
  { id: 't2', title: 'Rechnungsvorlage auf E-Rechnungs-XML-Standard (ZUGFeRD) anpassen', priority: 'medium', column: 'inprogress', date: '2026-06-22' },
  { id: 't3', title: 'Erste Case Study für GoClean Harz schreiben', priority: 'high', column: 'idea', date: '2026-06-21' },
  { id: 't4', title: 'Unternehmen als UG im Handelsregister eintragen', priority: 'high', column: 'done', date: '2026-06-15' }
];

export const INITIAL_CONTACTS = [
  { 
    id: 'c1', 
    name: 'Hans Müller', 
    company: 'Dachdeckerei Müller', 
    industry: 'Handwerk', 
    system: 'DATEV', 
    stage: 'gespräch', 
    lastContact: '2026-06-08',
    notes: 'Interesse an automatisierter Rechnungsverarbeitung. Leidet unter Zettelwirtschaft im Büro am Wochenende.',
    links: [
      { id: 'l1', title: 'Google Drive Projektordner', url: 'https://drive.google.com' }
    ],
    activityLog: [
      { id: 'al1', date: '2026-06-05 10:20', text: 'Lead im CRM erstellt' },
      { id: 'al2', date: '2026-06-08 14:15', text: 'Erstgespräch geführt. Notizen ergänzt.' }
    ]
  },
  { 
    id: 'c2', 
    name: 'Sabine Kraft', 
    company: 'Pflegedienst Harz', 
    industry: 'Gesundheit', 
    system: 'Lexoffice', 
    stage: 'angebot', 
    lastContact: '2026-06-20',
    notes: 'Angebot über WhatsApp-Schnittstelle zur Stundenzettel-Einreichung gesendet. Fördermittel Niedersachsen (Digitalbonus) eingeplant.',
    links: [
      { id: 'l2', title: 'Angebotsentwurf PDF', url: 'https://docs.google.com' }
    ],
    activityLog: [
      { id: 'al3', date: '2026-06-18 09:30', text: 'Lead im CRM erstellt' },
      { id: 'al4', date: '2026-06-20 11:00', text: 'Angebot gesendet (Festpreis 2.450 €)' }
    ]
  },
  { 
    id: 'c3', 
    name: 'Christian Gornitzka', 
    company: 'GoClean Harz', 
    industry: 'Dienstleistungen', 
    system: 'DATEV & Excel', 
    stage: 'umsetzung', 
    lastContact: '2026-06-24',
    notes: 'In Umsetzung. WhatsApp-Gateway läuft stabil. Bisher 48 Stunden erfasst.',
    links: [
      { id: 'l3', title: 'Make-Szenario', url: 'https://make.com' }
    ],
    activityLog: [
      { id: 'al5', date: '2026-06-22 08:00', text: 'Vertrag unterzeichnet' },
      { id: 'al6', date: '2026-06-24 16:30', text: 'Projekt gestartet & WhatsApp-Gateway eingerichtet' }
    ]
  }
];

export const INITIAL_LEADS = [
  {
    id: 'l_demo_1',
    company: 'Harzer Holzwerke GmbH',
    name: 'Christian Gornitzka',
    industry: 'Handwerk & Industrie',
    phone: '+49 176 1234567',
    email: 'c.gornitzka@harz-holz.de',
    notes: 'Potenzieller Kunde für automatisierte Lieferscheinerfassung und DATEV-Export. Großer Hebel bei digitaler Rechnungsverarbeitung.',
    status: 'nicht kontaktiert',
    urgency: 3,
    pain_point: 'Zettelwirtschaft bei Lieferscheinen',
    conversation_hook: 'Zeitersparnis von 20 Stunden im Monat',
    actual_objection: 'Keine internen IT-Ressourcen',
    next_step: 'Erstgespräch vor Ort vereinbaren'
  },
  {
    id: 'l_demo_2',
    company: 'Pflegedienst Harz GmbH',
    name: 'Sabine Kraft',
    industry: 'Gesundheit & Pflege',
    phone: '+49 172 9876543',
    email: 's.kraft@pflegedienst-harz.de',
    notes: 'Interesse an WhatsApp-gestützter Zeiterfassung für Pflegekräfte vor Ort.',
    status: 'kontaktiert',
    urgency: 2,
    pain_point: 'Stundenzettel werden verspätet eingereicht',
    conversation_hook: 'Automatische Lexoffice-Schnittstelle',
    actual_objection: 'Mitarbeiter sind nicht technikaffin',
    next_step: 'WhatsApp-Bot Testzugang freischalten'
  },
  {
    id: 'l_demo_3',
    company: 'Dachdecker Meisterbetrieb Müller',
    name: 'Markus Müller',
    industry: 'Handwerk',
    phone: '+49 151 5554433',
    email: 'info@mueller-dach-harz.de',
    notes: 'Familienbetrieb. Möchte Rechnungen direkt auf dem Dach per Tablet erstellen und an Lexoffice senden.',
    status: 'nicht kontaktiert',
    urgency: 4,
    pain_point: 'Wochenendarbeit für Rechnungsstellung im Büro',
    conversation_hook: 'E-Rechnungspflicht 2025/2026',
    actual_objection: 'Zu teure Setup-Kosten',
    next_step: 'ROI-Kalkulation per PDF zusenden'
  },
  {
    id: 'l_demo_4',
    company: 'Gärtnerei Blütentraum Harz',
    name: 'Renate Blume',
    industry: 'Handwerk & Dienstleistungen',
    phone: '+49 160 8887766',
    email: 'kontakt@bluetentraum-harz.de',
    notes: 'Viele kleine Privatkunden. Sucht automatisierte Mahnwesen-Lösung.',
    status: 'in verhandlung',
    urgency: 1,
    pain_point: 'Hohe Außenstände / späte Zahlungen',
    conversation_hook: 'Automatischer Lexoffice-Mahnlauf',
    actual_objection: 'Kunden könnten verärgert sein',
    next_step: 'Muster-Mahn-Formulierungen zeigen'
  },
  {
    id: 'l_demo_5',
    company: 'Hotel Bunte Tanne Schierke',
    name: 'Robert Schmidt',
    industry: 'Gastronomie & Hotellerie',
    phone: '+49 39455 1230',
    email: 'info@bunte-tanne.de',
    notes: 'Rezeptions-Automation. Check-In & Abrechnung über digitalen Meldeschein.',
    status: 'nicht kontaktiert',
    urgency: 3,
    pain_point: 'Manueller Aufwand beim Check-In zu Stoßzeiten',
    conversation_hook: 'SMS-Check-in-Link am Anreisetag',
    actual_objection: 'Kompatibilität mit PMS-System',
    next_step: 'Schnittstellen-Dokumentation anfordern'
  }
];

export const INITIAL_PROJECTS = [
  { id: 'p1', client: 'Dachdeckerei Müller', offerSigned: true, subsidyApplied: true, subsidyApproved: false, ready: false, pricePackage: 3500, trackedHours: 14.5, trackingStartTime: null },
  { id: 'p2', client: 'Pflegedienst Harz', offerSigned: false, subsidyApplied: false, subsidyApproved: false, ready: false, pricePackage: 2450, trackedHours: 6.2, trackingStartTime: null },
  { id: 'p3', client: 'GoClean Harz', offerSigned: true, subsidyApplied: true, subsidyApproved: true, ready: true, pricePackage: 4200, trackedHours: 48.0, trackingStartTime: null }
];

export const INITIAL_PROMPTS = [
  { id: 'pr1', title: 'Kaltakquise E-Mail (Handwerk)', category: 'Sales', text: 'Du bist ein erfahrener Copywriter. Schreibe eine kurze, pragmatische E-Mail an einen Handwerksmeister (Dachdecker/Elektro), der unter Zettelwirtschaft leidet. Keine Marketing-Floskeln, sondern Fokus auf den Kern: Wie er durch Automatisierung pro Woche 5 Stunden Bürozeit spart und das Bürosonntags-Problem löst. Nenne den Digitalbonus als Hebel.' },
  { id: 'pr2', title: 'DATEV Beleg-Extraktor (JSON)', category: 'Code', text: 'Analysiere den folgenden Beleg-Text und extrahiere die Daten in eine saubere JSON-Struktur mit folgenden Feldern: invoice_number, date, net_amount, tax_rate, gross_amount, vendor, iban. Wenn ein Feld nicht eindeutig ist, setze null.' },
  { id: 'pr3', title: 'Social-Media Hook-Generator', category: 'Marketing', text: 'Generiere 5 aufmerksamkeitsstarke Hooks für LinkedIn-Posts, die sich an Solo-Gründer und KMUs richten. Das Thema des Posts lautet: [THEMA]. Der Stil soll direkt, ehrlich und ohne Bullshit sein.' }
];

export const INITIAL_CONTENT = [
  { id: 'co1', title: 'Die E-Rechnungspflicht 2025: Was Handwerker jetzt tun müssen', date: '2026-06-28', status: 'draft' },
  { id: 'co2', title: 'Case Study: Wie GoClean Harz 12 Stunden Zettelwirtschaft im Monat eliminierte', date: '2026-07-02', status: 'idea' },
  { id: 'co3', title: 'Warum IT-Systemhäuser deine Prozessprobleme im Büro nicht lösen', date: '2026-06-25', status: 'ready' }
];

export const INITIAL_DOCS = [
  { id: 'master-logbuch', title: 'masterLogbuch.txt', content: MASTER_LOGBUCH_CONTENT, status: 'local', url: '#' },
  { id: 'd1', title: 'Businessplan - KMU Service Harz.txt', content: 'Dies ist der offizielle Businessplan für KMU Service Harz. Wir bieten maßgeschneiderte Digitalisierungslösungen für KMUs im Harz an. Zielgruppe: Gärtnereien, Dachdecker, Pflegedienste.', status: 'synced', url: '#' },
  { id: 'd2', title: 'Preispakete & ROI-Modelle 2026.txt', content: 'Übersicht der Tarife:\n- Basic CRM: 1.200€ Setup\n- Advanced Auto: 2.500€ Setup\nDer ROI-Hebel bei automatisierten Prozessen liegt im Schnitt bei 4.2x innerhalb des ersten Jahres.', status: 'synced', url: '#' },
  { id: 'd3', title: 'Kooperationsvertrag - Steuerberater.txt', content: 'Kooperationsvereinbarung zwischen KMU Service Harz und der Steuerberatungskanzlei Harz. Regelmäßige Datenübergabe via DATEV-Schnittstellen.', status: 'synced', url: '#' }
];

export const INITIAL_SOP_TEMPLATES = [
  { id: 's1', name: 'Neukunden-Onboarding (Festpreis-Projekt)', steps: [
    'Vertrag unterschreiben lassen & digital ablegen',
    'DSGVO-Auftragsverarbeitungsvertrag (AVV) abschließen',
    'Projektordner im Google Drive erstellen',
    'Zugänge für die Kundensysteme anfordern (Lexoffice/DATEV)',
    'Kick-off-Termin per Google Meet buchen'
  ]},
  { id: 's2', name: 'Steuerberater-Kooperations-Pitch', steps: [
    'Partner-Präsentation anpassen',
    'Vorteile für die Mandanten (Zeitersparnis) & Kanzlei (saubere DATEV-Daten) hervorheben',
    'Erstgespräch führen',
    'Informationsflyer für Kanzlei-Mandanten zusenden',
    'Kooperationsvereinbarung abschließen'
  ]}
];

export const PROCESSES = {
  rechnung: {
    title: "Eingangsrechnungen verarbeiten",
    desc: "Vom Beleg-Chaos zur vollautomatischen DATEV-Bereitstellung.",
    before: [
      { step: "Post oeffnen & scannen", detail: "Manuelles Sortieren der Postbelege oder Herunterladen aus E-Mails." },
      { step: "Daten abtippen", detail: "Rechnungsnummer, Datum und Betraege manuell erfassen." },
      { step: "Ordner ablegen", detail: "Beleg manuell in Ordnerstruktur (lokal oder Cloud) speichern." },
      { step: "DATEV-Uebertragung", detail: "Am Monatsende alle Belege haendisch an den Steuerberater uebermitteln." }
    ],
    after: [
      { step: "E-Mail-Eingang", detail: "Make-Webhook faengt jede E-Mail mit Rechnungs-Anhang automatisch ab." },
      { step: "KI-Extraktion", detail: "GPT-4 extrahiert alle Rechnungsdaten (IBAN, Netto, MwSt) vollautomatisch in Sekunden." },
      { step: "GoBD Cloud-Archiv", detail: "GoBD-konforme, unveraenderbare Speicherung im Google Drive." },
      { step: "DATEV Schnittstelle", detail: "Direkte, lautlose Uebertragung in das DATEV-Portal deines Steuerberaters." }
    ]
  },
  stundenzettel: {
    title: "Stundenzettel & Zeiterfassung",
    desc: "Mitarbeiterzeiten direkt von der Baustelle in die Buchhaltung.",
    before: [
      { step: "Handschriftliche Zettel", detail: "Mitarbeiter fuellen Zettel auf der Baustelle aus." },
      { step: "Sammeln & Suchen", detail: "Zettel verknumpeln im Auto oder gehen verloren." },
      { step: "Excel-Abtippen", detail: "Chef tippt am Sonntagabend alle Zettel haendisch ab." },
      { step: "Lohnbuchhaltung", detail: "Daten haendisch an Steuerberater senden." }
    ],
    after: [
      { step: "WhatsApp-Sprachnachricht", detail: "Mitarbeiter spricht Zeiten ein: 'Mueller, 8 Stunden auf Baustelle X'." },
      { step: "Whisper-Transkription", detail: "Sprachnachricht wird per KI in Text umgewandelt." },
      { step: "GPT-4 Strukturierung", detail: "KI analysiert Name, Projekt, Dauer und schreibt Daten strukturiert." },
      { step: "Lexoffice Eintrag", detail: "Eintrag erfolgt per Klick direkt im Buchhaltungssystem." }
    ]
  },
  anfragen: {
    title: "Kundenanfragen & Termine",
    desc: "24/7-Assistent fuer Neukunden-Qualifizierung und Terminbuchung.",
    before: [
      { step: "Telefon klingelt", detail: "Chef muss Arbeit unterbrechen oder verpasst den Anruf." },
      { step: "Zettelwirtschaft", detail: "Anfragedaten werden auf Notizzettel geschrieben." },
      { step: "Kalender-Chaos", detail: "Kalender abgleichen, um freien Termin zu finden." },
      { step: "Rueckruf-Versuche", detail: "Ewiges Hin und Her, bis der Termin steht." }
    ],
    after: [
      { step: "AI-Chatbot", detail: "Website- oder WhatsApp-Bot nimmt Anfrage rund um die Uhr entgegen." },
      { step: "Qualifizierung", detail: "Bot erfragt Gewerk, Ort und Budget und sortiert Spam aus." },
      { step: "Google Calendar Sync", detail: "Bot zeigt freie Zeiten und bucht direkt im Kalender." },
      { step: "SMS / WhatsApp Bestaetigung", detail: "Kunde und Chef erhalten automatische Bestaetigungen." }
    ]
  }
};

export const ONBOARDING_PLAYBOOKS = {
  master: {
    title: "📘 MASTER-PLAYBOOK: Onboarding KMU-Service Harz",
    phases: [
      {
        name: "Phase 1: Eisbrecher & Big Picture",
        description: "Vertrauen aufbauen, den wahren Schmerz finden und Vision verstehen.",
        questions: [
          {
            id: "m1",
            question: "1. \"Wenn ich mit einem Fingerschnipsen eine einzige Aufgabe in deinem Büro für immer verschwinden lassen könnte – welche wäre das?\"",
            why: "Bricht das Eis und zeigt sofort den größten emotionalen Schmerzpunkt.",
            followup: "\"Wie viel Zeit kostet dich das aktuell pro Woche? Machst du das abends oder am Wochenende?\"",
            warning: "\"Ich mache die Buchhaltung sonntags.\" -> Starker Hebel für Automatisierung.",
            quickwin: "Schmerzablösung durch automatisierten Rechnungs- oder Beleg-Empfang.",
            placeholder: "z.B. Sonntagsarbeit Buchhaltung, Belege sortieren, Angebote abtippen..."
          },
          {
            id: "m2",
            question: "2. \"Wo möchtest du mit deinem Betrieb in 3 Jahren stehen?\"",
            why: "Definiert das Ziel (Wachstum vs. Zeitersparnis).",
            followup: "\"Verhindert die aktuelle Büroarbeit dieses Wachstum?\"",
            warning: "Wachstumswunsch, aber gebremst durch Administration.",
            quickwin: "Skalierung durch automatisierte Lead-Erfassung oder standardisierte SOPs.",
            placeholder: "z.B. Umsatz verdoppeln, 2 neue Mitarbeiter, weniger Stress im Alltag..."
          }
        ]
      },
      {
        name: "Phase 2: Kundengewinnung & Kommunikation",
        description: "Den Weg des Kunden vom Erstkontakt bis zum fertigen Angebot nachverfolgen.",
        questions: [
          {
            id: "m3",
            question: "3. \"Wie genau kommen neue Anfragen bei dir rein und wie organisierst du sie?\"",
            why: "Deckt Kommunikations-Chaos und Medienbrüche auf.",
            followup: "\"Nutzt du WhatsApp geschäftlich auf deinem privaten Handy? Wie überführst du eine WhatsApp-Anfrage in ein Angebot?\"",
            warning: "\"Kunden schreiben per WhatsApp, ich schreibe es auf einen Zettel und tippe es abends in Word ab.\"",
            quickwin: "WhatsApp Business API / Automatisierte Lead-Erfassung ins CRM.",
            placeholder: "z.B. E-Mail, WhatsApp, Anrufe gemischt auf privatem Handy..."
          },
          {
            id: "m4",
            question: "4. \"Wie lange dauert es im Schnitt von der Anfrage bis der Kunde das Angebot hat?\"",
            why: "Lange Dauer bedeutet oft verlorene Aufträge. Prüft Effizienz.",
            followup: "\"Schreibst du Angebote in Word/Excel oder in einer Branchensoftware? Hast du Standardpakete?\"",
            warning: "Angebote in Word/Excel. Keine Textbausteine.",
            quickwin: "Dringender Bedarf an einer Handwerkersoftware (z.B. Lexoffice, Plancraft).",
            placeholder: "z.B. 3 bis 5 Tage, da Angebote abends händisch in Word geschrieben werden..."
          },
          {
            id: "m5",
            question: "5. \"Wie organisierst du deine Termine (Besichtigungen, Ausführung)?\"",
            why: "Termin-Ping-Pong am Telefon ist ein massiver, unsichtbarer Zeitfresser.",
            followup: "\"Nutzt du einen digitalen Kalender (Google/Apple)? Können Kunden online buchen?\"",
            warning: "Papierkalender im Auto oder im Büro an der Wand.",
            quickwin: "Einführung von Calendly/TidyCal Anbindungen.",
            placeholder: "z.B. Papierkalender im Auto, Terminvereinbarung nur telefonisch..."
          }
        ]
      },
      {
        name: "Phase 3: Auftragsabwicklung & Betrieb",
        description: "Verstehen, wie die eigentliche Arbeit dokumentiert und abgerechnet wird.",
        questions: [
          {
            id: "m6",
            question: "6. \"Wie erfassen du und deine Mitarbeiter Arbeitszeiten und Material?\"",
            why: "Größtes Leck für entgangenen Umsatz. Ungenaue Erfassung = unbezahlte Arbeit.",
            followup: "\"Gibt es Stundenzettel aus Papier? Werden die oft unleserlich oder zu spät abgegeben?\"",
            warning: "Papier-Stundenzettel, die am Monatsende händisch abgetippt werden.",
            quickwin: "Digitale Zeiterfassungs-App mit direkter Schnittstelle zur Lohnbuchhaltung.",
            placeholder: "z.B. Mitarbeiter geben wöchentlich Stundenzettel aus Papier ab..."
          },
          {
            id: "m7",
            question: "7. \"Wie dokumentierst du Baustellen / Objekte (Fotos, Checklisten)?\"",
            why: "Wichtig für Haftung, Reklamationen und spätere Abrechnung.",
            followup: "\"Wo landen die Fotos vom Handy? Musst du die abends manuell in Kundenordner auf dem PC sortieren?\"",
            warning: "\"Fotos bleiben in der privaten Handy-Galerie oder im WhatsApp-Chat.\"",
            quickwin: "Automatischer Foto-Upload via Make.com in Google Drive/OneDrive.",
            placeholder: "z.B. Fotos werden mit privatem Handy gemacht und bleiben in WhatsApp..."
          }
        ]
      },
      {
        name: "Phase 4: Back-Office, Finanzen & IT",
        description: "Die kritische Infrastruktur und Datenflüsse analysieren.",
        questions: [
          {
            id: "m8",
            question: "8. \"Wie schreibst du Rechnungen und wie kommen Eingangsbelege zum Steuerberater?\"",
            why: "Hier liegt das meiste Geld und die größte Fehlerquelle (GoBD, E-Rechnung).",
            followup: "\"Tippst du das Angebot nochmal ab, um eine Rechnung zu erstellen? Nutzt du DATEV Unternehmen online?\"",
            warning: "Schuhkarton für den Steuerberater. Jede Rechnung einzeln aus Mails herunterladen.",
            quickwin: "E-Mail-Parser, direkte DATEV/Lexoffice-Schnittstelle.",
            placeholder: "z.B. Schuhkarton für Belege, Rechnungen werden in Word geschrieben..."
          },
          {
            id: "m9",
            question: "9. \"Welche Software-Tools und Cloud-Dienste nutzt du aktuell?\"",
            why: "Bestandsaufnahme für mögliche Schnittstellen (APIs).",
            followup: "",
            warning: "Keine zentrale Cloud, Daten nur lokal gespeichert.",
            quickwin: "Zentrale Datenablage in Google Workspace / Microsoft 365.",
            placeholder: "z.B. Outlook, Excel, WhatsApp, eventuell ein kleines Branchenprogramm..."
          },
          {
            id: "m10",
            question: "10. \"Wie sicher bist du beim Thema DSGVO (z.B. bei WhatsApp) und Datensicherung?\"",
            why: "Zeigt rechtliche Risiken auf.",
            followup: "",
            warning: "Kundendaten auf privatem Handy ohne Auftragsverarbeitungsvertrag.",
            quickwin: "Sichere Cloud-Umgebungen und DSGVO-konforme Messenger.",
            placeholder: "z.B. Keine Backups, WhatsApp privat für Kundenkommunikation..."
          }
        ]
      }
    ]
  },
  pilot: {
    title: "🛠️ PILOT-PLAYBOOK: Das Bruder-Onboarding (GoClean Harz)",
    phases: [
      {
        name: "Phase 1: Der ehrliche Status Quo (Das \"Bruder-Gespräch\")",
        description: "Hier geht es darum, die Maske fallen zu lassen.",
        questions: [
          {
            id: "p1",
            question: "1. \"Jetzt mal ganz ehrlich, Bruder zu Bruder: Wie läuft der Laden wirklich?\"",
            why: "Finden ob er genug Gewinn macht, gestresst ist, Personal oder Aufträge fehlen.",
            followup: "\"Wenn du dir deinen Stundenlohn mal ausrechnest (inklusive der Abende am Schreibtisch) – lohnt sich das gerade?\"",
            warning: "",
            quickwin: "",
            placeholder: "z.B. Umsatz ok, aber Stress ist viel zu hoch, freie Wochenenden fehlen..."
          },
          {
            id: "p2",
            question: "2. \"Was ist aktuell dein größter Engpass: Willst du eigentlich wachsen (mehr Kunden) oder willst du einfach nur weniger Stress mit den aktuellen Kunden?\"",
            why: "Definiert die Strategie (Lead-Generierung/Sales vs. Automatisierung/Organisation).",
            followup: "",
            warning: "",
            quickwin: "",
            placeholder: "z.B. Möchte weniger Stress und geregelte Abläufe bei den bestehenden Kunden..."
          }
        ]
      },
      {
        name: "Phase 2: Die \"Zeig-mir-dein-Handy\"-Analyse (Der Deep Dive)",
        description: "Direkter, knallharter Einblick in die Praxis.",
        questions: [
          {
            id: "p3",
            question: "3. \"Hol mal bitte dein Handy raus. Zeig mir mal, wie eine typische Kundenanfrage bei dir auf WhatsApp aussieht und was du dann machst.\"",
            why: "Du siehst live den Medienbruch (Zettel schreiben, Vergessen zu antworten).",
            followup: "",
            warning: "",
            quickwin: "",
            placeholder: "z.B. Schreibt Kundendaten auf einen Zettel im Auto, vergisst manchmal Rückrufe..."
          },
          {
            id: "p4",
            question: "4. \"Wann hast du das letzte Mal Rechnungen geschrieben und wie lange saßt du da dran?\"",
            why: "Finde den \"Bürosonntag\" und wie er Belege an den Steuerberater übergibt.",
            followup: "",
            warning: "",
            quickwin: "",
            placeholder: "z.B. Rechnungen alle 2 Wochen sonntags für ca. 4 Stunden..."
          },
          {
            id: "p5",
            question: "5. \"Gibt es irgendwas in deinem Alltag, wo du dir denkst: 'Das ist so dumm, dass ich das jeden Tag dreimal von Hand tippen muss'?\"",
            why: "Identifiziert den offensichtlichsten manuellen Zeitfresser für ein schnelles Make.com-Projekt.",
            followup: "",
            warning: "",
            quickwin: "",
            placeholder: "z.B. Baustellenbilder vom Handy mühsam in Drive-Ordner verschieben..."
          }
        ]
      },
      {
        name: "Phase 3: Der \"Pilot-Deal\"",
        description: "Dein kostenloses Angebot gegen Testimonial pitch.",
        questions: [
          {
            id: "p6",
            question: "Pitch & Vereinbarung: Erkläre ihm den Deal: Kostenloses System in 4 Wochen, dafür ehrliches Nutzenfeedback und ein Video/Zitat Testimonial.",
            why: "Legt die Basis für deine allererste Case Study (\"Proof Asset\").",
            followup: "",
            warning: "",
            quickwin: "",
            placeholder: "Deal vereinbart? (Ja / Nein + Details)..."
          }
        ]
      },
      {
        name: "Phase 4: Abschluss & Direkter Start",
        description: "Fokus auf EIN Problem zum Start.",
        questions: [
          {
            id: "p7",
            question: "Entscheidung: Welche der 3 Optionen wollen wir als Erstes angehen? (Option A: Beleg-Upload / Option B: WhatsApp Lead-Tabelle / Option C: Baustellenfoto-Upload)",
            why: "Nicht 10 Dinge auf einmal ändern.",
            followup: "Welche Notizen gibt es für das gewählte erste Projekt auf Make.com?",
            warning: "",
            quickwin: "",
            placeholder: "Gewählte Option (z.B. Option C) und konkrete Make.com-Notizen..."
          }
        ]
      }
    ]
  }
};

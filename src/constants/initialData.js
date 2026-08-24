import { MASTER_LOGBUCH_CONTENT } from '../assets/docs/masterLogbuch.js';

export { MASTER_LOGBUCH_CONTENT };

export const INITIAL_HABITS = [
  { id: 'h1', text: '💪 Kraftsport (30 Min Intensive-Workout)', category: 'fitness', completed: false, days: [1, 3, 5], xp: 50, coins: 25 }, // Mo, Mi, Fr (1, 3, 5)
  { id: 'h2', text: '⚡ Make Academy Lerneinheit (30 Min Kurs & Praxis)', category: 'learning', completed: false, days: [1, 2, 3, 4, 5], xp: 40, coins: 20 }, // Mo-Fr
  { id: 'h3', text: '💧 Mindestens 2 Liter Wasser getrunken', category: 'life', completed: false, days: null, xp: 20, coins: 10 }, // Täglich
  { id: 'h4', text: '🎯 3 wichtigsten Tagesfokus-Aufgaben definiert & angepackt', category: 'business', completed: false, days: [1, 2, 3, 4, 5], xp: 35, coins: 15 },
  { id: 'h5', text: '📖 15 Min Buch / Fachliteratur gelesen', category: 'learning', completed: false, days: null, xp: 25, coins: 10 }
];

export const INITIAL_REWARDS = [
  { id: 'r1', title: '🎮 30 Min Zocken / Gaming-Pause', price: 100, category: 'gaming', description: 'Gönne dir eine halbe Stunde Entspannung beim Zocken – vollkommen ohne schlechtes Gewissen!' },
  { id: 'r2', title: '🍿 Filmabend oder 2 Serienfolgen', price: 250, category: 'leisure', description: 'Ein entspannter Abend mit deiner Lieblingsserie oder einem guten Film.' },
  { id: 'r3', title: '🍔 Lieblings-Cheat-Meal / Snack-Gutschein', price: 350, category: 'food', description: 'Genieße deine Lieblings-Mahlzeit als Belohnung für harte Arbeit.' },
  { id: 'r4', title: '📚 Neues Buch oder Fortbildungskurs kaufen', price: 800, category: 'growth', description: 'Investiere deine gesammelten Punkte in deine persönliche Weiterentwicklung.' },
  { id: 'r5', title: '🎧 Tech-Gadget / Wunscheinkauf', price: 2500, category: 'reward', description: 'Große Belohnung für kontinuierliche Spitzenleistungen über Wochen!' }
];

export const INITIAL_PENALTIES = [
  { id: 'p1', title: '💪 30 Liegestütze oder 50 Kniebeugen sofort machen', costCoins: 50, description: 'Direkte körperliche Disziplin-Aufgabe bei verpasstem Haupt-Habit.' },
  { id: 'p2', title: '🧹 10 Minuten Schreibtisch & Raum aufräumen', costCoins: 50, description: 'Bringe deine Umgebung in Ordnung, wenn die Disziplin nachlässt.' },
  { id: 'p3', title: '🐖 5 € in die Sparschwein-Kasse einzahlen', costCoins: 100, description: 'Finanzielle Konsequenz für nicht eingehaltene Tagesziele.' },
  { id: 'p4', title: '📱 1 Tag Social Media & YouTube Verbot', costCoins: 150, description: 'Fokus-Reset für den nächsten Tag.' }
];

export const INITIAL_LIFE_GOALS = [
  { id: 'lg1', title: 'Make Academy: Automatisierungs-Mastery Modul abschließen', category: 'learning', targetDate: '2026-09-30', progress: 40, status: 'active', rewardCoins: 500 },
  { id: 'lg2', title: 'Kraftsport: 3x pro Woche kontinuierlich für 3 Monate', category: 'fitness', targetDate: '2026-11-01', progress: 65, status: 'active', rewardCoins: 1000 },
  { id: 'lg3', title: '10 KM Dauerlauf unter 55 Minuten', category: 'fitness', targetDate: '2026-10-15', progress: 20, status: 'active', rewardCoins: 400 },
  { id: 'lg4', title: 'KMU Service Harz: 5 feste Monats-Kunden gewinnen', category: 'business', targetDate: '2026-12-31', progress: 50, status: 'active', rewardCoins: 2000 }
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
  { id: 'd1', title: 'Businessplan 2026 - KMU Service Harz.md', content: 'Offizieller Businessplan 2026: 4-stufige Value Ladder (500 € Audit, 2.000 € Standard-Setup, ab 6.000 € Meisterbetrieb, 200 €/Monat Retainer) mit 100% Dienstleistungsmarge.', status: 'synced', url: '#' },
  { id: 'd_contract2000', title: 'Vertrag_Standard_Setup_2000EUR.md', content: 'Dienstleistungsvertrag für das 2.000 € Standard-Setup (Lautlose Belegerfassung, DATEV Belegbilderservice, Lexoffice, GoBD & 14 Tage Einführungsbegleitung).', status: 'synced', url: '#' },
  { id: 'd_avv', title: 'DSGVO_Auftragsverarbeitungsvertrag_AVV.md', content: 'Muster-Auftragsverarbeitungsvertrag (AVV nach Art. 28 DSGVO) für Make.com, OpenAI, Lexoffice und Cloud-Speicher.', status: 'synced', url: '#' },
  { id: 'd_gobd', title: 'GoBD_Verfahrensdokumentation_Ersetzendes_Scannen.md', content: 'GoBD-Verfahrensdokumentation für ersetzendes Scannen nach dem Standard der Bundessteuerberaterkammer.', status: 'synced', url: '#' },
  { id: 'd_aaas_contract', title: 'AaaS_Wartungsvertrag_200EUR.md', content: 'Wartungs- und SLA-Vertrag für den Digitalen Hausmeister (200 € / Monat Retainer) mit 24/7 Monitoring und Scope-Creep-Schutz.', status: 'synced', url: '#' },
  { id: 'd_checklist', title: 'Systemzugangs_und_Sicherheits_Checkliste.md', content: 'Onboarding-Checkliste zur Erfassung aller Kunden-Zugänge (Lexoffice, DATEV Mandantennummer, Cloud-Speicher, WhatsApp Business).', status: 'synced', url: '#' },
  { id: 'd_abnahme', title: 'Abnahmeprotokoll_und_Mitarbeiter_Cheatsheet.md', content: 'Förmliches Abnahmeprotokoll und ausdruckbares Mitarbeiter-Cheat-Sheet für die mobile Belegerfassung.', status: 'synced', url: '#' }
];

export const INITIAL_SOP_TEMPLATES = [
  { id: 's1', name: 'Stufe 1: 500 € Büro-Potenzial-Audit & ROI-Report', steps: [
    '90-Minuten Vor-Ort-Termin oder Video-Audit durchführen',
    'Ist-Prozess Röntgenbild aufnehmen (Zettelwirtschaft bis Kanzlei)',
    'Schattenkosten berechnen (z.B. 16 Std. x 55 € = 880 €/Monat)',
    '4-teiligen Büro-Stress-Test & ROI-Report generieren und übergeben',
    'Angebot für 2.000 € Standard-Setup mit 100% Audit-Anrechnung vorlegen'
  ]},
  { id: 's2', name: 'Stufe 2: 2.000 € Standard-Setup (Lautlose Belegerfassung)', steps: [
    'Vertrag (2.000 € Festpreis) & DSGVO-AVV unterzeichnen lassen',
    'Systemzugänge über Sicherheits-Checkliste abfragen',
    'Make.com Blueprint 1 importieren & Lexoffice/DATEV anbinden',
    'GoBD-Verfahrensdokumentation für ersetzendes Scannen aushändigen',
    'Testläufe mit 3 realen Belegen durchführen & Abnahmeprotokoll signieren',
    '14 Tage Einführungsbegleitung für das Mitarbeiter-Team starten'
  ]},
  { id: 's3', name: 'Stufe 2+: ab 6.000 € Digitaler Meisterbetrieb (ERP & Förderung)', steps: [
    'Handwerker-ERP (Plancraft / pds / KWP) Schnittstellen analysieren',
    'Fördermittel-Check (Digital Innovation Sachsen-Anhalt 50% / INQA 80%)',
    'Förderantrag vor verbindlicher Beauftragung vorbereiten & einreichen',
    'Make.com Blueprint 2 (24/7 Notdienst & Lead-Funnel) implementieren',
    'Multi-User Rechte & Zeiterfassungsschulung für alle Gewerke ausrollen'
  ]},
  { id: 's4', name: 'Stufe 3: 200 €/Monat Digitaler Hausmeister (AaaS Retainer)', steps: [
    'AaaS-Wartungsvertrag mit Mindestlaufzeit 6 Monate abschließen',
    'Make.com Blueprint 4 (24/7 Health-Check Cron) aktivieren',
    'Telegram/Slack Notfall-Alerting für KMU Service Harz Support koppeln',
    '1 Stunde monatliches Kontingent für Minor Tweaks bereitstellen',
    'Monatlichen Statusbericht & Schnittstellen-Gesundheits-Check zusenden'
  ]},
  { id: 's5', name: 'Steuerberater-Kooperations-Pitch (Die Huckepack-Strategie)', steps: [
    'Kanzlei-Inhaber oder IT-Verantwortlichen kontaktieren',
    'Vorteil pitchen: „Wir befreien Sie vom Pendelordner aus der Hölle und liefern fertige DATEV-Sätze“',
    'Kooperationsflyer für Kanzlei-Mandanten bereitstellen',
    'Gemeinsamen Mandanten-Onboarding-Ablauf etablieren'
  ]}
];

export const PROCESSES = {
  rechnung: {
    title: "Stufe 2: Lautlose Belegerfassung",
    desc: "Vom Beleg-Chaos zur vollautomatischen Lexoffice- & DATEV-Bereitstellung.",
    before: [
      { step: "Post & Quittungen sammeln", detail: "Zerknitterte Tank- und Materialquittungen im Firmenwagen oder auf dem Schreibtisch." },
      { step: "Sonntags-Abtippen", detail: "Inhaber tippt Belege, Netto/MwSt und Rechnungsnummern stundenlang manuell in Excel/Word ab." },
      { step: "Schuhkarton-Ablage", detail: "Belege werden unvollständig gesammelt und am Monatsende zur Kanzlei gebracht." },
      { step: "Teure Kanzlei-Rückfragen", detail: "Steuerberater muss fehlende Belege aufwendig nachfordern." }
    ],
    after: [
      { step: "WhatsApp / Mail Foto", detail: "Monteur fotografiert Beleg direkt an der Kasse und sendet ihn in Sekunden an die Firmennummer." },
      { step: "GPT-4o Vision OCR", detail: "KI extrahiert Lieferant, Belegdatum, Netto, MwSt-Satz, Brutto und IBAN fehlerfrei." },
      { step: "Lexware Office Vorkontierung", detail: "Automatischer Buchungssatz und Zuordnung zur passenden Kostenkategorie." },
      { step: "DATEV Belegbilderservice", detail: "Revisionssichere, lautlose Bereitstellung im Portal des Steuerberaters." }
    ]
  },
  stundenzettel: {
    title: "Stufe 2: Baustellen-Zeiterfassung",
    desc: "Mitarbeiterzeiten & Fotos per Spracheingabe direkt in die Lohnbuchhaltung.",
    before: [
      { step: "Handschriftliche Zettel", detail: "Mitarbeiter füllen Stundenzettel unleserlich oder verspätet aus." },
      { step: "Verlorene Nachweise", detail: "Zettel gehen auf der Baustelle verloren; Zusatzarbeiten werden vergessen." },
      { step: "Manuelles Übertragen", detail: "Bürokraft muss am Monatsende hunderte Stundenzeilen mühsam abtippen." },
      { step: "Verzögerte Lohnabrechnung", detail: "Lohnabrechnung verzögert sich durch unvollständige Stundenangaben." }
    ],
    after: [
      { step: "WhatsApp Sprachnachricht", detail: "Monteur spricht ins Handy: 'Müller, 8 Stunden Baustelle Goslar, Sanitär-Rohbau'." },
      { step: "Whisper Transkription", detail: "OpenAI Whisper transkribiert Dialekte und Spracheingaben präzise in Text." },
      { step: "KI-Strukturierung", detail: "GPT-4 ordnet Mitarbeiter, Projekt, Stunden und Tätigkeitsbeschreibung strukturiert zu." },
      { step: "Direktbuchung & Bestätigung", detail: "Buchung in Zeiterfassung & automatische Quittierung an Monteur per WhatsApp." }
    ]
  },
  anfragen: {
    title: "Stufe 2+: 24/7 Notdienst-Funnel",
    desc: "Rund-um-die-Uhr Qualifizierung und Kalenderbuchung für lukrative Aufträge.",
    before: [
      { step: "Telefon schellt beim Kunden", detail: "Chef muss Arbeit auf der Baustelle unterbrechen oder verpasst Anrufe." },
      { step: "Zettelwirtschaft & Vergessen", detail: "Anfragedaten auf Schmierblättern notiert; Rückrufe verzögern sich um Tage." },
      { step: "Termin-Ping-Pong", detail: "Fünf Telefonate nötig, bis ein passender Besichtigungstermin gefunden wird." },
      { step: "Auftragsverlust", detail: "Kunde ruft in der Zwischenzeit den nächsten regionalen Mitbewerber an." }
    ],
    after: [
      { step: "24/7 KI-Assistent", detail: "WhatsApp- & Web-Bot nimmt Anfragen auch abends und am Wochenende entgegen." },
      { step: "Notfall-Qualifizierung", detail: "KI prüft Gewerk, Schadensbild, Ort und erkennt akute Notfälle (Wasserschaden)." },
      { step: "Google Calendar Sync", detail: "Kunde wählt freien Besichtigungsslot; Notfälle alarmieren Meister sofort per SMS." },
      { step: "CRM-Akte angelegt", detail: "Lead landet sofort mit allen Fotos und Daten in der zentralen Kundenakte." }
    ]
  },
  monitoring: {
    title: "Stufe 3: AaaS 24/7 Monitoring",
    desc: "Lautloser Betrieb und proaktive Wartung aller Schnittstellen durch den Digitalen Hausmeister.",
    before: [
      { step: "API-Änderung bei DATEV", detail: "Drittanbieter ändert Schnittstelle; Workflows brechen unbemerkt ab." },
      { step: "Belegstau im Hintergrund", detail: "Über Wochen laufen keine Belege mehr in die Buchhaltung; Chaos beim Quartalsabschluss." },
      { step: "Panik & Stillstand", detail: "Handwerker muss teuren IT-Techniker mit offenem Stundensatz rufen." },
      { step: "Hohe Reparaturkosten", detail: "Unerwartete Notfall-IT-Kosten von 1.000 €+ ohne Vorwarnung." }
    ],
    after: [
      { step: "15-Minuten Cron Ping", detail: "Make.com prüft alle API-Endpunkte und Token-Gültigkeiten im Hintergrund." },
      { step: "Proaktive Fehlererkennung", detail: "System erkennt Abweichungen und sendet sofortigen Alert an KMU Service Harz Support." },
      { step: "Lautlose Behebung", detail: "KMU Service Harz aktualisiert Schnittstelle, bevor der Kunde den Fehler bemerkt." },
      { step: "Garantierte Stabilität", detail: "Planbare 200 €/Monat Pauschale inkl. 1h monatlichem Anpassungskontingent." }
    ]
  }
};

export const ONBOARDING_PLAYBOOKS = {
  standardSetup2000: {
    title: "⭐ STUFE 2: 2.000 € Standard-Setup (Lautlose Belegerfassung)",
    badge: "Core Offer / Bestseller",
    phases: [
      {
        name: "Phase 1: Status Quo Belege & Kanzlei",
        description: "Den aktuellen Weg der Quittungen und die Zusammenarbeit mit dem Steuerberater erfassen.",
        questions: [
          {
            id: "s2_1",
            question: "1. \"Wie kommen Tankquittungen, Materialbelege und Eingangsrechnungen aktuell in deine Buchhaltung?\"",
            why: "Identifiziert den 'Bürosonntag' und den Hauptzeitfresser.",
            followup: "\"Wer sortiert die Belege: Du selbst, deine Partnerin oder eine Bürokraft? Wie viele Stunden kostet das wöchentlich?\"",
            warning: "\"Ich mache das sonntags mit Schuhkarton und Excel.\" -> Perfekter Hebel für 2.000 € Festpreis-Setup.",
            quickwin: "Schlüsselfertige Einrichtung des WhatsApp-Belegeingangs.",
            placeholder: "z.B. Mitarbeiter sammeln Quittungen im Firmenwagen, Chef sortiert sonntags 4-5 Stunden..."
          },
          {
            id: "s2_2",
            question: "2. \"Welche Buchhaltungs-Software und welche Kanzlei-Schnittstelle nutzt ihr aktuell?\"",
            why: "Klärt das technische Zielsystem (Lexoffice, SevDesk, DATEV Unternehmen online).",
            followup: "\"Hat dein Steuerberater schon nach DATEV Belegbilderservice oder digitaler Vorkontierung gefragt?\"",
            warning: "Rechnungen noch in Word geschrieben, kein zentrales System.",
            quickwin: "Lexoffice Einrichtung + DATEV Belegbilderservice Anbindung.",
            placeholder: "z.B. Lexware Office im Einsatz, Steuerberater nutzt DATEV Kanzlei-Rechnungswesen..."
          }
        ]
      },
      {
        name: "Phase 2: Mobile Erfassung & Team-Struktur",
        description: "Wie erfassen Monteure und Mitarbeiter Belege vor Ort?",
        questions: [
          {
            id: "s2_3",
            question: "3. \"Wie viele Mitarbeiter kaufen Material vor Ort ein oder reichen Belege ein?\"",
            why: "Bestimmt die Anzahl der WhatsApp-Gateway-Nutzer und den Schulungsaufwand.",
            followup: "\"Haben alle Mitarbeiter Firmenhandys oder nutzen sie WhatsApp privat?\"",
            warning: "Angst vor komplizierter Software bei älteren Monteuren.",
            quickwin: "Null Schulungsaufwand: Monteur sendet einfach nur ein Foto per WhatsApp.",
            placeholder: "z.B. 6 Monteure, kaufen täglich beim Großhändler ein..."
          },
          {
            id: "s2_4",
            question: "4. \"Wo werden digitale Rechnungen per E-Mail empfangen?\"",
            why: "Konfiguration der automatischen E-Mail-Weiterleitung zur Make.com Middleware.",
            followup: "\"Gibt es eine zentrale Mailadresse wie rechnung@firma.de?\"",
            warning: "Rechnungen landen verstreut in persönlichen Postfächern.",
            quickwin: "Automatischer Mail-Parser für PDF-Rechnungsanhänge.",
            placeholder: "z.B. rechnung@handwerk-harz.de auf Microsoft 365..."
          }
        ]
      },
      {
        name: "Phase 3: GoBD, Verträge & Setup-Start",
        description: "Rechtssicherheit, AVV und Vereinbarung der 14-Tage-Begleitung.",
        questions: [
          {
            id: "s2_5",
            question: "5. \"Besitzt du bereits eine GoBD-Verfahrensdokumentation für das ersetzende Scannen?\"",
            why: "Rechtssicherheit bei Betriebsprüfungen & Schutz des Vorsteuerabzugs.",
            followup: "\"Ist dir bekannt, dass Papierbelege nach unserem Setup rechtssicher vernichtet werden dürfen?\"",
            warning: "Keine Verfahrensdokumentation vorhanden -> Risiko bei Steuerprüfung.",
            quickwin: "Übergabe der fertigen Verfahrensdokumentation nach BStBK-Standard.",
            placeholder: "Bisher keine Verfahrensdokumentation vorhanden..."
          },
          {
            id: "s2_6",
            question: "6. \"Vereinbarung zum Standard-Setup: Start in 14-Tage-Begleitung?\"",
            why: "Abschluss des 2.000 € Festpreisvertrags mit 100% Amortisation in ~8 Wochen.",
            followup: "Anzahlung 50% vereinbart, Zugangs-Checkliste übergeben?",
            warning: "",
            quickwin: "Unterschrift Dienstleistungsvertrag & AVV.",
            placeholder: "Vertrag über 2.000 € netto unterzeichnet, Start am Montag..."
          }
        ]
      }
    ]
  },
  audit500: {
    title: "🔍 STUFE 1: 500 € Büro-Potenzial-Audit (Der Türöffner)",
    badge: "90-Min Vor-Ort-Analyse",
    phases: [
      {
        name: "Phase 1: Das Prozess-Röntgenbild (Status Quo)",
        description: "Schonungslose Aufnahme aller manuellen Medienbrüche im Handwerksbüro.",
        questions: [
          {
            id: "a1_1",
            question: "1. \"Welche einzige administrative Büroaufgabe raubt dir aktuell die meiste Lebenszeit?\"",
            why: "Emotionaler Schmerzpunkt (Rechnungen, Angebote, Zettel nachrennen).",
            followup: "\"Wie viele Stunden pro Woche verbringst du damit am Abend oder Wochenende?\"",
            warning: "Inhaber ist operativ überlastet und hat keine Zeit für Firmenentwicklung.",
            quickwin: "Identifikation des 1. Quick-Wins.",
            placeholder: "z.B. Samstagvormittag 4 Stunden Angebote schreiben und Rechnungen suchen..."
          },
          {
            id: "a1_2",
            question: "2. \"Welche Medienbrüche existieren zwischen Baustelle, Büro und Steuerberater?\"",
            why: "Zeigt Datenverluste auf (Papierzettel -> WhatsApp -> Word -> Drucken -> Kanzlei).",
            followup: "\"Wie oft gehen handschriftliche Notizen oder Belege verloren?\"",
            warning: "Mehrfaches manuelles Abtippen derselben Kundendaten.",
            quickwin: "Prozess-Röntgenbild im ROI-Report visualisieren.",
            placeholder: "z.B. Monteur schreibt Zettel -> Chef tippt in Excel -> Büro druckt aus..."
          }
        ]
      },
      {
        name: "Phase 2: Die Schattenkosten-Kalkulation",
        description: "Übersetzung der verlorenen Bürozeit in harte Euro-Beträge.",
        questions: [
          {
            id: "a1_3",
            question: "3. \"Wie hoch ist dein kalkulatorischer Meister-Stundensatz und wie viele Stunden verlierst du monatlich?\"",
            why: "Berechnet die jährlichen Schattenkosten (z.B. 16 Std. x 55 € = 880 €/M = 10.560 €/Jahr).",
            followup: "\"Was könntest du in dieser Zeit erwirtschaften, wenn du auf der Baustelle wärst?\"",
            warning: "Inhaber unterschätzt die Kosten unbezahlter Bürosonntage massiv.",
            quickwin: "ROI-Berechnung im Büro-Stress-Test Report schwarz auf weiß darlegen.",
            placeholder: "Stundensatz 55-65 €, ca. 20 Stunden Zeitverlust pro Monat..."
          }
        ]
      },
      {
        name: "Phase 3: Soll-Roadmap & 100% Anrechnungs-Pitch",
        description: "Übergabe des ROI-Reports und Wandlung in das 2.000 € Standard-Setup.",
        questions: [
          {
            id: "a1_4",
            question: "4. \"Präsentation des 4-teiligen ROI-Reports & Wandlung in Stufe 2:\"",
            why: "Wandelt 60-70% der Audit-Kunden durch 100% Gebührenanrechnung in Hauptaufträge.",
            followup: "\"Die 500 € Audit-Gebühr wird bei Beauftragung des Standard-Setups zu 100% angerechnet!\"",
            warning: "",
            quickwin: "Direkte Beauftragung des 2.000 € Setups.",
            placeholder: "Kunde begeistert vom ROI-Report; Standard-Setup direkt beauftragt..."
          }
        ]
      }
    ]
  },
  meisterbetrieb6000: {
    title: "🚀 STUFE 2+: ab 6.000 € Digitaler Meisterbetrieb (ERP & Förderung)",
    badge: "High-Ticket (50-80% Förderhebel)",
    phases: [
      {
        name: "Phase 1: ERP-Landschaft & Skalierungsengpässe",
        description: "Analyse bestehender Handwerker-Software (Plancraft, pds, KWP, WinWorker, HERO).",
        questions: [
          {
            id: "m6_1",
            question: "1. \"Welches Handwerker-ERP oder CRM-System nutzt ihr und wo brechen die Workflows ab?\"",
            why: "Prüft API-Schnittstellen und ERP-Automationspotenziale.",
            followup: "\"Können Angebote automatisch aus Aufmaßen generiert werden?\"",
            warning: "ERP vorhanden, aber Insellösung ohne Schnittstelle zur Buchhaltung.",
            quickwin: "End-to-End Pipeline von Anfrage bis Nachkalkulation.",
            placeholder: "z.B. Plancraft / pds im Einsatz, aber Angebote dauern 4 Tage..."
          }
        ]
      },
      {
        name: "Phase 2: Fördermittel-Check (Digital Innovation / INQA)",
        description: "Staatliche Zuschüsse von bis zu 50 % bis 80 % aktivieren.",
        questions: [
          {
            id: "m6_2",
            question: "2. \"Standort & Förderfähigkeit: Erfüllt der Betrieb die Kriterien für Landes- oder Bundesförderung?\"",
            why: "Sachsen-Anhalt DIGITAL INNOVATION (50%) oder INQA-Coaching (80%).",
            followup: "\"Ist das ELSTER-Unternehmenskonto vorhanden? Wichtig: Vorzeitigen Maßnahmenbeginn beachten!\"",
            warning: "Vertrag darf erst NACH offiziellem Förderantrag unterzeichnet werden.",
            quickwin: "Übernahme der technischen Förderkonzeption durch KMU Service Harz.",
            placeholder: "Betrieb im Ostharz (Sachsen-Anhalt), 12 Mitarbeiter, 50% Zuschuss möglich..."
          }
        ]
      }
    ]
  },
  retainer200: {
    title: "🛡️ STUFE 3: 200 €/Monat Digitaler Hausmeister (AaaS Retainer)",
    badge: "Wartung & Ausfallsicherheit",
    phases: [
      {
        name: "Phase 1: Schnittstellen-Monitoring & SLA",
        description: "Dauerhafte Absicherung aller aktiven Make.com Workflows und APIs.",
        questions: [
          {
            id: "r2_1",
            question: "1. \"Welche Schnittstellen und Webhooks müssen im 24/7-Monitoring überwacht werden?\"",
            why: "Einrichtung von Blueprint 4 (15-Minuten Cron Health-Check).",
            followup: "\"Wer soll im Notfall bei Kanzlei-Störungen benachrichtigt werden?\"",
            warning: "APIs von Cloud-Anbietern ändern sich regelmäßig -> ohne Wartung Ausfall vorprogrammiert.",
            quickwin: "Proaktives Alerting an KMU Service Harz Support-Kanal.",
            placeholder: "Lexoffice API, DATEV Belegbilderservice, Supabase DB, Drive..."
          },
          {
            id: "r2_2",
            question: "2. \"SLA-Grenzen & 1h Monatskontingent:\"",
            why: "Schutz vor Scope Creep: 1h für Minor Tweaks inklusive, Neuentwicklungen separat.",
            followup: "Wartungsvertrag für 200 € netto/Monat mit 6 Monaten Mindestlaufzeit signiert?",
            warning: "",
            quickwin: "Dauerhafter MRR für KMU Service Harz & Sorgenfreiheit für den Handwerker.",
            placeholder: "AaaS Vertrag über 200 €/Monat aktiv..."
          }
        ]
      }
    ]
  },
  master: {
    title: "📘 ALLGEMEINES MASTER-PLAYBOOK: KMU Service Harz",
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
      }
    ]
  },
  pilot: {
    title: "🛠️ PILOT-PLAYBOOK: Das VIP-Bruder-Onboarding (GoClean Harz)",
    phases: [
      {
        name: "Phase 1: Der ehrliche Status Quo (Das Bruder-Gespräch)",
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
          }
        ]
      }
    ]
  }
};


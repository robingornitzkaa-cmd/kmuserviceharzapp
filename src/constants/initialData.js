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
  { 
    id: 'master-logbuch', 
    title: 'masterLogbuch.txt', 
    content: MASTER_LOGBUCH_CONTENT, 
    status: 'local', 
    url: '#',
    tags: ['logbuch', 'intern']
  },
  { 
    id: 'd_pitch_steuerberater', 
    title: 'Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md', 
    tags: ['vertrieb', 'steuerberater', 'vorlage', 'kanzlei', 'datev'],
    category: 'vertrieb',
    status: 'synced', 
    url: '#',
    content: `# Steuerberater-Kanzlei-Pitch-Deck & Leitfaden: Befreiung vom Pendelordner

> **KMU Service Harz — Die externe IT-Werkbank für Steuerberater im Harz**
> *Partnerschaftsmodell zur automatisierten Belegübergabe (DATEV RDS 1.0), GoBD-Verfahrensdokumentation und Entlastung der Kanzlei-Finanzbuchhaltung.*

---

## 1. Executive Summary & Kanzlei-Nutzen

Steuerberatungskanzleien im Harz (Goslar, Wernigerode, Osterode, Halberstadt, Nordhausen) stehen vor einer doppelten Herausforderung: **Akuter Fachkräftemangel in der Finanzbuchhaltung** bei gleichzeitig hohem manuellem Nachbearbeitungsaufwand für Handwerker- und KMU-Mandanten.

Typische Symptome bei Handwerksbetrieben:
- Belege treffen unvollständig am 9. des Folgemonats per Schuhkarton, Pendelordner oder unleserlichem WhatsApp-Foto ein.
- Fehlende Vorsteuerbelege, unklare Barquittungen von Tankstellen und Baustoffhändlern.
- Hoher Zeitaufwand für Kanzlei-Mitarbeiter durch telefonisches Hinterhertelefonieren statt qualifizierter Beratung.

**Die Lösung durch KMU Service Harz:**
Wir agieren als **externe IT-Werkbank und digitaler Vor-Ort-Hausmeister**. Wir fahren direkt auf den Betriebshof des Handwerkers, binden Handwerker-Software und Vor-Systeme (Lexware Office / sevDesk / WhatsApp-Gateway) direkt an die Kanzlei-Schnittstellen an und liefern revisionssichere, vorkontierte Belegdaten.

---

## 2. Slide-by-Slide Kanzlei-Präsentationsdeck

### Slide 1: Titelblatt
- **Headline:** Vom Pendelordner zur automatischen DATEV-Übergabe
- **Subline:** Wie Ihre Steuerkanzlei 10+ Stunden monatlich pro Handwerker-Mandant gewinnt – ohne IT-Support leisten zu müssen.
- **Presenter:** KMU Service Harz (Christian Gornitzka, Goslar)

### Slide 2: Das Kanzlei-Dilemma in der Finanzbuchhaltung
- **Status Quo:** 68 % der Kanzlei-Arbeitszeit bei gewerblichen Mandanten entfällt auf manuelle Belegbeschaffung und Datenkorrektur.
- **Problem:** Steuerfachangestellte müssen IT-Support leisten (z. B. Scanner-Probleme, Format-Fehler bei E-Rechnungen), wofür keine Zeit und kein Honorar vorhanden ist.
- **Folge:** Frustrierte Mitarbeiter, Überstunden vor dem USt-Voranmeldetermin und verschenkte Kapazitäten für betriebswirtschaftliche Beratung.

### Slide 3: Die Lösung: Schlüsselfertiges Vor-Ort-Setup
- **Was KMU Service Harz übernimmt:**
  1. Einrichtung der mobilen Belegerfassung für Monteure (WhatsApp-Foto / E-Mail-Parser).
  2. OCR-basierte Extraktion aller Pflichtangaben nach § 14 UStG.
  3. Lautlose Schnittstellenkopplung zu Ihrer DATEV-Umgebung.
  4. Schulung der Handwerker-Mitarbeiter vor Ort (keine Kanzlei-Ressourcen nötig).
  5. GoBD-Verfahrensdokumentation für ersetzendes Scannen nach BStBK-Standard.

### Slide 4: Saubere Rollentrennung: DATEV RDS 1.0 vs. Buchungsdatenservice (BDS)
Ein zentrales Anliegen jeder Kanzlei ist die Wahrung der Buchungshoheit und die Vermeidung von fehlerhaften Buchungssätzen aus ungeprüften Kundensystemen.

| Kriterium | DATEV Rechnungsdatenservice 1.0 (RDS 1.0) | DATEV Buchungsdatenservice (BDS) |
|---|---|---|
| **Datenübertragung** | Revisionssichere Belegbilder + strukturierte XML-Metadaten (Rechnungsnummer, Datum, Netto, MwSt, Kreditor) nach *DATEV Belege online*. | Komplette Buchungssätze inklusive Sach- und Personenkonten direkt in *DATEV Kanzlei-Rechnungswesen*. |
| **Buchungshoheit** | **100 % bei der Steuerkanzlei** (Kanzlei behält volle Kontrolle über Kontierung, Steuerschlüssel und Abgrenzung). | Liegt beim Mandanten bzw. Vorsystem (Risiko von Falschkontierungen durch Laien). |
| **Einsatzempfehlung** | **Standard-Empfehlung für 95 % aller Handwerksbetriebe:** Maximale Zeitersparnis bei voller fachlicher Kanzleikontrolle. | Nur für qualifizierte Großbetriebe mit ausgebildeter interner Buchhaltung. |
| **Vorteil Kanzlei** | Belege sind am 1. des Monats digital verfügbar, lesbar, vollzählig und vorgeheftet. | Entlastung nur, wenn Mandant fehlerfrei vorkontiert. |

### Slide 5: Rechtssicherheit & GoBD-Verfahrensdokumentation
- Handwerker dürfen Papierbelege nach dem Scannen nur vernichten, wenn eine ordnungsgemäße Verfahrensdokumentation zum ersetzenden Scannen vorliegt.
- KMU Service Harz liefert für jeden Mandanten eine **maßgeschneiderte GoBD-Verfahrensdokumentation nach dem Muster der Bundessteuerberaterkammer (BStBK)** und des DWS-Instituts.
- Inklusive Mitarbeiter-Arbeitsanweisung, Scan-Protokoll und technischer Systemdokumentation für die nächste Betriebsprüfung.

### Slide 6: Das Null-Kosten- & Null-Risiko-Modell für Ihre Kanzlei
- **Für die Kanzlei:** 0,00 € Kosten, 0 Stunden Einrichtungsaufwand.
- **Abrechnung:** KMU Service Harz rechnet direkt und transparent mit dem Handwerksbetrieb ab (Festpreis 2.000 € Standard-Setup oder 500 € Potenzial-Audit).
- **Fördermittel-Hebel:** Wir nutzen staatliche Förderprogramme für den Mandanten (Digitalbonus Niedersachsen: bis zu 50 % Zuschuss; Digital Innovation Sachsen-Anhalt: bis zu 50 % Zuschuss; INQA-Coaching: bis zu 80 % Zuschuss).
- **Kanzlei-Bonus:** Ihre Fibu-Kosten pro Mandant sinken um bis zu 40 %, die Mandantenzufriedenheit steigt dramatisch.

### Slide 7: Der 3-Schritte Pilot-Prozess
1. **Schritt 1 (Auswahl):** Sie benennen 2 bis 3 Ihrer arbeitsintensivsten Handwerker-Mandanten („Sorgenkinder mit Schuhkarton“).
2. **Schritt 2 (Setup):** KMU Service Harz führt das 90-minütige Vor-Ort-Audit durch und richtet die Belegerfassung binnen 14 Tagen ein.
3. **Schritt 3 (Review):** Nach dem ersten Monatsabschluss bewerten Kanzlei und Mandant gemeinsam die Zeiteinsparung.

---

## 3. Leitfaden für Kanzleigespräche & Einwandbehandlung

### Gesprächs-Einstieg mit dem Kanzlei-Inhaber
> *„Guten Tag Herr Steuerberater [Name], wir unterstützen Handwerksbetriebe hier in der Region Goslar/Harz dabei, ihre Belege untermonatlich digital so aufzubereiten, dass sie pünktlich und ohne Rückfragen im DATEV Belege online Ihrer Kanzlei ankommen. Wie viele Ihrer Handwerks-Mandanten bringen Ihnen die Belege aktuell noch im Pendelordner oder unsortiert per Mail?“*

### Typische Kanzlei-Einwände und Antworten

#### 1. „Wir wollen nicht, dass Mandanten selbst buchen und Fehler machen.“
*Antwort:* „Genau deshalb setzen wir zu 100 % auf den **DATEV Rechnungsdatenservice 1.0 (RDS 1.0)** und nicht auf den Buchungsdatenservice. Der Mandant übermittelt lediglich das lesbare Belegbild mit extrahierten Metadaten (Lieferant, Rechnungsnummer, Betrag, Belegdatum). Die Kontierung und Verbuchung bleibt vollständig in der Hoheit Ihrer Kanzlei-Mitarbeiter.“

#### 2. „Unsere Kanzlei hat keine Zeit, neue Software mit Mandanten einzurichten.“
*Antwort:* „Sie müssen keine einzige Minute investieren. KMU Service Harz übernimmt das komplette Onboarding vor Ort beim Handwerker: Von der Handykamera der Monteure bis zur Schnittstellenfreigabe in DATEV. Sie erhalten lediglich fertige Belege in DATEV Unternehmen online.“

#### 3. „Wir empfehlen Mandanten bereits DATEV Unternehmen online, aber die Handwerker nutzen es nicht.“
*Antwort:* „Das kennen wir aus der Praxis: Handwerker scheitern oft an der Bedienung komplexer Web-Portale auf der Baustelle. Wir bauen die Brücke: Der Monteur fotografiert die Tankquittung einfach per WhatsApp, unsere Middleware prüft und bereitet den Beleg auf, und er landet automatisch in Ihrem DATEV Belege online.“

---

## 4. Kanzlei-Checkliste für den gemeinsamen Start

- [ ] Auswahl von 2 Pilot-Mandanten (Handwerksbetriebe mit 3–25 Mitarbeitern).
- [ ] Bereitstellung der Mandantennummer und DATEV-Beraternummer für die RDS 1.0 Freigabe.
- [ ] Aushändigung des ausdruckbaren Mandanten-Flyers oder Empfehlungsschreibens.
- [ ] Festlegung des Ziel-Starttermins (z. B. zum Beginn des nächsten Abrechnungsquartals).
- [ ] Gemeinsame 15-minütige Feedback-Runde nach dem ersten digitalen Monatsabschluss.

---
*Dokumenten-Referenz: KMU Service Harz — Version 2026.1 | Vertrauliche Kanzlei-Unterlage*`
  },
  { 
    id: 'd_mandanten_flyer', 
    title: 'Mandanten_Flyer_Vorlage_Handwerk.md', 
    tags: ['vertrieb', 'steuerberater', 'handwerk', 'vorlage', 'flyer'],
    category: 'vertrieb',
    status: 'synced', 
    url: '#',
    content: `# Mandanten-Flyer-Vorlage: Schluss mit Zettelwirtschaft im Handwerk

> **Ausdruckbare Informationsvorlage für Steuerberatungskanzleien zur Weitergabe an Handwerks-Mandanten**
> *Format: DIN A4 (Vorder- & Rückseite) oder digitaler PDF-Beileger zur monatlichen BWA*

---

# EMPFOHLEN VON IHRER STEUERBERATUNGSKANZLEI
### Schluss mit dem Büro-Sonntag & Beleg-Chaos auf der Baustelle!

**Wie Harzer Handwerksbetriebe ihre Belegablage komplett auf Autopilot stellen – ohne teure Software oder IT-Vorkenntnisse.**

---

### Kennen Sie diese typischen Zeitfresser im Handwerksalltag?

- **Sonntags am Schreibtisch:** Statt Zeit mit der Familie verbringen Sie das Wochenende mit dem Sortieren von Quittungen und dem Abtippen von Eingangsrechnungen.
- **Verlorene Baustellen-Belege:** Zerknitterte Tank- und Materialbelege liegen im Firmenwagen oder gehen zwischen Baustelle und Werkstatt verloren – und kosten bares Geld beim Vorsteuerabzug.
- **Druck bei der Monatsabgabe:** Am Monatsanfang herrscht Hektik, weil der Steuerberater fehlende Rechnungen nachfordert.

---

### Die Lösung: Ihre Belege fließen automatisch zu Ihrem Steuerberater

In enger Abstimmung mit Ihrer Steuerkanzlei richtet **KMU Service Harz** eine lautlose, digitale Belegerfassung für Ihren Betrieb ein:

1. **Kein Belege-Suchen mehr – Einfach WhatsApp-Foto:**  
   Ihre Monteure fotografieren Quittungen an der Tankstelle oder beim Baustoffhändler direkt mit dem Smartphone. Keine neue App, keine komplizierten Passwörter.
2. **Gesetzliche E-Rechnungspflicht (2025/2026) gelöst:**  
   Eingehende ZUGFeRD- und XRechnung-Formate werden automatisch im Hintergrund erkannt, geprüft und rechtssicher archiviert.
3. **100 % DATEV- & GoBD-Rechtssicherheit:**  
   Alle Belege landen pünktlich, lesbar und revisionssicher im DATEV-System Ihres Steuerberaters. Inklusive offizieller Verfahrensdokumentation für das Finanzamt.

---

### In 3 einfachen Schritten zu freien Wochenenden:

- **Schritt 1: 90-Minuten Potenzial-Audit vor Ort:**  
  Wir analysieren Ihre aktuellen Abläufe auf dem Betriebshof und ermitteln schwarz auf weiß Ihr monatliches Einsparpotenzial an Zeit und Kosten.
- **Schritt 2: Lautlose Einrichtung durch KMU Service Harz:**  
  Wir verbinden Ihre Systeme (z. B. Lexoffice / Handwerker-Software) mit dem DATEV-Portal Ihrer Kanzlei und weisen Ihre Mitarbeiter ein.
- **Schritt 3: Fertig!**  
  Nie wieder Belege suchen. Ihre Kanzlei erhält alle Unterlagen pünktlich zum Monatsanfang.

---

### Exklusiver Kanzlei-Empfehlungsgutschein

\`\`\`
+----------------------------------------------------------------------------------------------------+
|  🎁 WERTGUTSCHEIN: 500,- €                                                                        |
|                                                                                                    |
|  Kostenfreies 90-Minuten Büro-Potenzial-Audit & ROI-Check für Mandanten unserer Kanzlei.          |
|                                                                                                    |
|  Gutscheincode: KANZLEI-HARZ-500                                                                   |
|  Einlösbar bei: KMU Service Harz | Christian Gornitzka                                            |
|  Telefon: 05321 / 739 820 | Web: https://kmuserviceharz.de/stresstest                             |
+----------------------------------------------------------------------------------------------------+
\`\`\`

---

### Jetzt Büro-Stress-Test in 2 Minuten online starten (QR-Code):

👉 **https://kmuserviceharz.de/stresstest?ref=kanzlei**

**KMU Service Harz** | Christian Gornitzka  
Marktstraße 12, 38640 Goslar | Tel: 05321 / 739 820 | info@kmuserviceharz.de  
*In Kooperation mit Ihrer Steuerberatungskanzlei*`
  },
  { 
    id: 'd_direct_mail_518', 
    title: 'Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md', 
    tags: ['vertrieb', 'handwerk', 'vorlage', 'directmail', 'kampagne'],
    category: 'vertrieb',
    status: 'synced', 
    url: '#',
    content: `# Postalisches Anschreiben (Direct-Mail 1-Seiter): 518 Harzer Handwerksmeister

> **Kampagnen-Vorlage für den haptischen Postversand an 518 verifizierte Handwerksmeister in der Harz-Region**
> *Zielgruppe: Inhaber & Geschäftsführer von SHK-, Elektro-, Dachdecker-, Bau-, Holz- und Metallbaubetrieben (3–25 Mitarbeiter).*

---

KMU Service Harz | Christian Gornitzka | Marktstraße 12, 38640 Goslar

[Firma des Handwerksmeisters]  
z. Hd. der Geschäftsleitung / Herrn Meister [Nachname]  
[Straße & Hausnummer]  
[PLZ & Ort im Harz]  

**Goslar, den [Aktuelles Datum]**

### **Betreff: Schluss mit dem Büro-Sonntag: Warum 518 Handwerksmeister im Harz ihre Wochenenden nicht mehr am Schreibtisch verbringen müssen.**

Sehr geehrter Herr [Nachname],

Ihre Monteure leisten auf der Baustelle saubere Arbeit. Aber wenn am Freitagnachmittag eigentlich Feierabend sein sollte, beginnt für Sie als Chef die unbezahlte zweite Schicht: 

Zerknitterte Stundenzettel vom Armaturenbrett kratzen, fehlende Materialquittungen beim Großhändler nachfordern und am Sonntagvormittag Rechnungen und Belege für den Steuerberater abtippen.

**Damit ist jetzt Schluss.**

Wir haben uns als regionaler Automatisierungspartner im Harz auf genau eine Aufgabe spezialisiert: Wir befreien Handwerksbetriebe von zeitraubender Zettelwirtschaft und richten eine lautlose Beleg- und Zeiterfassung ein – direkt zwischen Baustelle, Handykamera und Steuerberater.

---

### **Ihre 3 handfesten Vorteile im Betriebsalltag:**

1. **Keine neue Software lernen:**  
   Ihre Mitarbeiter auf der Baustelle nutzen einfach WhatsApp oder die Handykamera. Quittung an der Kasse fotografieren – in 3 Sekunden fertig.
2. **100 % E-Rechnungs- und GoBD-Sicherheit:**  
   Alle Eingangs- und Ausgangsbelege fließen revisionssicher und automatisch vorkontiert in das System Ihres Steuerberaters (z. B. DATEV / Lexware Office).
3. **Bis zu 50 % staatlicher Zuschuss:**  
   Über Förderprogramme wie den *Digitalbonus Niedersachsen* oder *Digital Innovation Sachsen-Anhalt* übernimmt der Staat bis zur Hälfte der gesamten Umsetzungskosten.

---

### **Wir schenken Ihnen unser 500-Euro-Büro-Potenzial-Audit:**

Finden Sie in 2 Minuten heraus, wie viele Stunden und Euro Sie in Ihrem Betrieb monatlich einsparen können.

Scannen Sie den untenstehenden QR-Code mit der Smartphone-Kamera oder öffnen Sie:  
👉 **https://kmuserviceharz.de/stresstest?ref=meister518**

\`\`\`
+---------------------------------------------------------------------------------+
|    [ QR-CODE ZUM LIVE-BÜRO-STRESSTEST: https://kmuserviceharz.de/stresstest ]   |
|    Gutschein-Code für 500 € Audit-Befreiung: MEISTER-HARZ-2026                 |
+---------------------------------------------------------------------------------+
\`\`\`

Beantworten Sie 5 kurze Fragen zu Ihren aktuellen Büroabläufen. Sie erhalten sofort Ihr individuelles **Prozess-Röntgenbild** und eine exakte Amortisationsrechnung.

Mit handwerklichen Grüßen aus Goslar,

**Christian Gornitzka**  
Gründer & Automatisierungs-Partner für das Harzer Handwerk  
**KMU Service Harz** | Marktstraße 12, 38640 Goslar  
Telefon: 05321 / 739 820 | E-Mail: info@kmuserviceharz.de | Web: https://kmuserviceharz.de`
  },
  { 
    id: 'd_telefonleitfaden', 
    title: 'Telefon_und_Kaltakquise_Leitfaden_Handwerk.md', 
    tags: ['vertrieb', 'handwerk', 'vorlage', 'kaltakquise', 'leitfaden'],
    category: 'vertrieb',
    status: 'synced', 
    url: '#',
    content: `# Telefon- & Kaltakquise-Leitfaden: Handwerksbetriebe im Harz

> **Vertriebsleitfaden für KMU Service Harz zur Kalt- und Warmakquise von Handwerksmeistern**
> *Spezifisch ausgelegt auf die regionale Handwerksmentalität im Harz (Goslar, Osterode, Wernigerode, Blankenburg, Halberstadt, Nordhausen).*

---

## 1. Übersicht & Vertriebsstrategie

Handwerksmeister sind vielbeschäftigte Praktiker auf Baustellen oder im Kundendienst. Sie haben eine extrem niedrige Toleranz für klassisches „Marketing-Geschwätz“ oder theoretische IT-Präsentationen. 

**Erfolgsfaktoren im Handwerker-Vertrieb:**
- Augenhöhe, klarer Klartext, lokale Verankerung im Harz („Kollege aus Goslar“).
- Sofortige Ansprache des echten Schmerzes (Büro-Sonntage, verlorene Tankquittungen, E-Rechnungspflicht).
- Kein Verkauf von Software, sondern Angebot einer **schlüsselfertigen Entlastung (Digitaler Hausmeister)**.

---

## 2. Teil 1: Das Vorzimmer- & Assistenz-Skript (Sekretariat / Büro / Ehefrau)

**Ziel:** Kein Abwimmeln („Schicken Sie mal eine Broschüre“), sondern Weiterleitung zum Meister oder Vereinbarung eines festen 2-Minuten Telefontermins.

### Der sympathische Kanzlei- & E-Rechnungs-Opener
> *„Guten Tag Frau [Name / z.B. Meyer], mein Name ist [Ihr Name] von KMU Service Harz aus Goslar. Ich rufe ganz kurz an bezüglich der Belegübergabe an Ihre Steuerkanzlei und der neuen E-Rechnungspflicht. Ist Herr [Meister] gerade im Büro oder auf der Baustelle erreichbar?“*

### Einwandbehandlung im Vorzimmer

#### Einwand A: „Um was geht es denn genau?“
> **Antwort:** *„Wir unterstützen regionale Handwerksbetriebe dabei, die Stundenzettel und Quittungen von der Baustelle direkt per Handykamera oder WhatsApp ins Büro zu übertragen, damit die Wochenendarbeit bei der Buchhaltung wegfällt. Ich wollte Herrn [Meister] kurz unseren 2-Minuten Stresstest dazu vorstellen. Wann erreiche ich ihn am besten?“*

#### Einwand B: „Der Chef hat absolut keine Zeit, die Auftragslage ist voll.“
> **Antwort:** *„Das weiß ich genau – und genau deshalb rufe ich an. Weil der Chef nach 10 Stunden auf der Baustelle abends nicht noch 2 Stunden Rechnungen abtippen sollte. Wann hat er morgens vor dem Ausrücken 2 Minuten Zeit – eher um 07:15 Uhr oder abends ab 16:30 Uhr?“*

#### Einwand C: „Schicken Sie uns einfach etwas per E-Mail.“
> **Antwort:** *„Sehr gerne. Damit ich Herrn [Meister] keine 20-seitige Werbebroschüre schicke: Schreiben Sie Ihre Rechnungen schon digital mit Lexoffice/Handwerkerprogramm oder noch mit Word/Excel? [...] Perfekt, dann schicke ich den passenden 1-Seiter direkt an Ihre Hand an die [info@firma.de].“*

---

## 3. Teil 2: Das Baustellen-Skript (Direktkontakt Handwerksmeister)

**Ziel:** In 45 Sekunden Interesse wecken und das 500 € Büro-Potenzial-Audit vor Ort oder per 2-Minuten Stresstest vereinbaren.

### Der Direkteinstieg
> *„Moin Herr [Meister], [Ihr Name] von KMU Service Harz hier aus Goslar. Störe ich Sie gerade mitten auf der Baustelle oder haben Sie 45 Sekunden Zeit?“*

### Die 3 Schmerz-Hooks (Je nach Gesprächssituation wählen):

#### Hook 1: Regulatorisch (E-Rechnungspflicht 2025/2026)
> *„Herr [Meister], ab 2025/2026 müssen alle B2B-Rechnungen digital als XML (ZUGFeRD/XRechnung) empfangen und verarbeitet werden. Wir sorgen dafür, dass Ihr Betrieb das lautlos im Hintergrund erfüllt – ohne dass Sie für tausende Euro neue Software anschaffen oder Schulungen besuchen müssen.“*

#### Hook 2: Zeitlich (Der Büro-Sonntag & Zettelwirtschaft)
> *„Herr [Meister], ich rufe an, damit Sie am Sonntag nicht mehr am Schreibtisch sitzen und Materialzettel oder Tankquittungen sortieren müssen. Wir haben einen 2-Minuten Stresstest entwickelt, der Ihnen zeigt, wie Ihre Monteure Belege in 3 Sekunden per WhatsApp erfassen und Sie 4 Stunden pro Woche sparen.“*

#### Hook 3: Finanziell (Schattenkosten & 50 % Förderzuschuss)
> *„Wussten Sie, dass das Land Niedersachsen / Sachsen-Anhalt über den Digitalbonus bis zu 50 % der Kosten übernimmt, wenn Handwerksbetriebe ihre Belegablage automatisieren? Wir prüfen in 2 Minuten, wie viel Förderung für Ihren Betrieb bereitsteht.“*

---

## 4. Teil 3: Die 5-Punkte Einwand-Matrix (Validieren ➔ Pivot ➔ Next Step)

| Einwand des Meisters | 1. Validieren (Druck rausnehmen) | 2. Pivot (Strategische Umkehr) | 3. Next Step (Konkretes Mikro-Ziel) |
|---|---|---|---|
| **1. „Wir machen das schon immer so mit Ordnern.“** | *„Absolut verständlich. Ihr Betrieb läuft seit Jahren erfolgreich und die Auftragsbücher sind voll.“* | *„Das Problem ist nicht Ihre Arbeitsweise, sondern das Finanzamt und die Kanzlei: Reine Papierbelege und einfache PDFs genügen bei Betriebsprüfungen nicht mehr (GoBD).“* | *„Lassen Sie uns in 5 Minuten prüfen, ob Ihr Rechnungseingang finanzamtssicher ist. Passt Ihnen morgen früh 07:30 Uhr?“* |
| **2. „Unsere Software (z. B. Lexoffice / Handwerker-ERP) reicht.“** | *„Super, das ist ein erstklassiges System, das wir bei vielen Kunden anbinden.“* | *„Der teure Bruch entsteht immer zwischen Baustelle und Software: Wenn Monteure Quittungen im Transporter vergessen oder der Chef Zettel händisch abtippen muss.“* | *„Ich zeige Ihnen in 5 Minuten am Bildschirm, wie die Quittungen von der Baustelle direkt in Lexoffice landen.“* |
| **3. „Keine Zeit für komplizierte IT-Projekte.“** | *„Glaube ich Ihnen sofort. Niemand im Handwerk hat Zeit für stundenlange Software-Schulungen.“* | *„Deshalb machen wir kein IT-Projekt, sondern agieren als digitaler Hausmeister: Wir richten alles schlüsselfertig für Sie ein. Ihre Monteure drücken nur auf die Handykamera.“* | *„Wenn unser Stresstest Ihnen nicht schwarz auf weiß 3 Stunden Freizeit pro Woche bringt, hören Sie nie wieder von mir. Fairer Deal?“* |
| **4. „Wir sind mit 3–5 Mann viel zu klein dafür.“** | *„Das dachten unsere Kunden mit 3 Mitarbeitern anfangs auch.“* | *„Gerade bei kleinen Betrieben tut die Zettelwirtschaft am meisten weh, weil der Chef selbst am Sonntag am Schreibtisch sitzt, statt sich zu erholen.“* | *„Ich sende Ihnen eine 1-Seiter Kurzübersicht eines 3-Mann Betriebs aus Osterode zur Ansicht. Passt das?“* |
| **5. „Schicken Sie mir einfach Infos per Mail.“** | *„Sehr gerne, ich möchte Ihnen aber keine unpassende Standard-Broschüre schicken.“* | *„Wo drückt bei Ihnen aktuell der größte Schuh: Bei den Tank-/Materialquittungen der Monteure oder beim Druck des Steuerberaters?“* | *„Basierend auf Ihrer Antwort sende ich Ihnen den passenden Link zum Stresstest. Ist [info@firma.de] die beste Adresse?“* |

---

## 5. Teil 4: 3-Sekunden Notfall-Pivot (Hektik auf der Baustelle / Gerüst)

Wenn der Meister mitten im Baustellenlärm abnimmt (*„Ich stehe auf dem Gerüst / die Säge läuft, keine Zeit!“*):

> **3-Sekunden Notfall-Formel:**  
> *„Verstehe ich vollkommen, Herr Meister! Ich halte Sie keine Sekunde auf. Nur 1 Frage: Darf ich Ihnen den 2-Minuten Büro-Stresstest per Mail an [info@...] schicken? Ja oder Nein?“*  
> ➔ Bei **„Ja“**: *„Vielen Dank, Mail geht sofort raus. Viel Erfolg auf der Baustelle!“*`
  },
  { 
    id: 'd1', 
    title: 'Businessplan 2026 - KMU Service Harz.md', 
    content: 'Offizieller Businessplan 2026: 4-stufige Value Ladder (500 € Audit, 2.000 € Standard-Setup, ab 6.000 € Meisterbetrieb, 200 €/Monat Retainer) mit 100% Dienstleistungsmarge.', 
    status: 'synced', 
    url: '#',
    tags: ['businessplan', 'strategie']
  },
  { 
    id: 'd_contract2000', 
    title: 'Vertrag_Standard_Setup_2000EUR.md', 
    content: 'Dienstleistungsvertrag für das 2.000 € Standard-Setup (Lautlose Belegerfassung, DATEV Belegbilderservice, Lexoffice, GoBD & 14 Tage Einführungsbegleitung).', 
    status: 'synced', 
    url: '#',
    tags: ['vertrag', 'legal', 'vorlage']
  },
  { 
    id: 'd_avv', 
    title: 'DSGVO_Auftragsverarbeitungsvertrag_AVV.md', 
    content: 'Muster-Auftragsverarbeitungsvertrag (AVV nach Art. 28 DSGVO) für Make.com, OpenAI, Lexoffice und Cloud-Speicher.', 
    status: 'synced', 
    url: '#',
    tags: ['legal', 'dsgvo', 'vorlage']
  },
  { 
    id: 'd_gobd', 
    title: 'GoBD_Verfahrensdokumentation_Ersetzendes_Scannen.md', 
    content: 'GoBD-Verfahrensdokumentation für ersetzendes Scannen nach dem Standard der Bundessteuerberaterkammer.', 
    status: 'synced', 
    url: '#',
    tags: ['gobd', 'legal', 'vorlage', 'steuerberater']
  },
  { 
    id: 'd_aaas_contract', 
    title: 'AaaS_Wartungsvertrag_200EUR.md', 
    content: 'Wartungs- und SLA-Vertrag für den Digitalen Hausmeister (200 € / Monat Retainer) mit 24/7 Monitoring und Scope-Creep-Schutz.', 
    status: 'synced', 
    url: '#',
    tags: ['vertrag', 'legal', 'vorlage', 'aaas']
  },
  { 
    id: 'd_checklist', 
    title: 'Systemzugangs_und_Sicherheits_Checkliste.md', 
    content: 'Onboarding-Checkliste zur Erfassung aller Kunden-Zugänge (Lexoffice, DATEV Mandantennummer, Cloud-Speicher, WhatsApp Business).', 
    status: 'synced', 
    url: '#',
    tags: ['onboarding', 'checkliste', 'vorlage']
  },
  { 
    id: 'd_abnahme', 
    title: 'Abnahmeprotokoll_und_Mitarbeiter_Cheatsheet.md', 
    content: 'Förmliches Abnahmeprotokoll und ausdruckbares Mitarbeiter-Cheat-Sheet für die mobile Belegerfassung.', 
    status: 'synced', 
    url: '#',
    tags: ['onboarding', 'abnahme', 'vorlage']
  },
  {
    id: 'd_goclean_growth_kit',
    title: 'GoClean_Harz_Wachstums_und_Produktivitaets_Mappe.md',
    tags: ['vertrieb', 'goclean', 'reinigung', 'kalkulation', 'vorlage'],
    category: 'vertrieb',
    status: 'synced',
    url: '/goclean_wachstumsmappe.html',
    content: `# 🧼 GoClean Harz – Wachstums- & Produktivitäts-Mappe
> **Das Rundum-Power-Paket für Marcel Gornitzka | Erstellt von KMU Service Harz**

## 1. Übersicht der 4 Kernsäulen
1. **Blitz-Angebotsrechner**: Kalkulation von m², Stundenverrechnungssatz und Materialaufschlag in 30 Sekunden.
2. **B2B-Akquise-Maschine**: Vorgefertigte Akquise-Mappen für Hausverwaltungen, Bauträger & Praxen im Harzkreis.
3. **Mobile Qualitäts-SOP & Abnahme**: Smartphone-Checkliste für Mitarbeiter + digitales Kunden-Abnahmeprotokoll.
4. **5-Sterne Google-Bewertungs-Booster**: 1-Klick WhatsApp-Nachrichten für mehr Rezensionen & Stammkunden-Reaktivierung.

## 2. Kalkulations-Richtwerte (Gebäudereinigung Harz)
- **Büro / Unterhaltsreinigung:** 180–250 m²/h | Stundensatz: 36,00–42,00 €/h
- **Treppenhausreinigung:** 120–160 m²/h | Stundensatz: 38,00–44,00 €/h
- **Glasreinigung:** 80–120 m²/h | Stundensatz: 40,00–48,00 €/h
- **Baufein- & Endreinigung:** 40–70 m²/h | Stundensatz: 42,00–52,00 €/h
- **Winterdienst / Grünpflege:** 300–500 m²/h | Stundensatz: 45,00–65,00 €/h

## 3. Direkter Zugriff auf interaktive Tools
- 🎛️ **Präsentations-Center Hub:** \`/goclean_praesentationen_hub.html\`
- 🤝 **Bruder-Pitch (Emotional):** \`/pitch_bruder_emotional.html\`
- ⚡ **Power-Überblick (60s):** \`/pitch_kompakt_ueberblick.html\`
- 📱 **App Feature-Demo:** \`/demo_app_features.html\`
- 🧠 **KI- & Zukunfts-Vision:** \`/pitch_ki_zukunft.html\`
- 🚀 **Solo-Wachstumsplan:** \`/pitch_wachstum_solo.html\`
- 📊 **Business-Pitch:** \`/pitch_professionell.html\`
- 🖨️ **Druckbare VIP-Präsentationsmappe:** \`/goclean_wachstumsmappe.html\`
- ⚡ **In-App Live Toolkit:** Über den Sidebar-Reiter „🧼 GoClean Harz Suite“`
  },
  {
    id: 'd_manus_presentation_prompts',
    title: 'MANUS_PROMPTS_GOCLEAN_PRAESENTATIONEN.md',
    tags: ['manus', 'prompts', 'präsentation', 'goclean', 'pitch', 'ki', 'vorlage'],
    category: 'vertrieb',
    status: 'synced',
    url: '/goclean_praesentationen_hub.html',
    content: `# 🎤 GoClean Harz × Manus AI – Präsentations-Generator Master-Suite
> **Hochoptimierte XML-Prompts für Manus AI zur Erstellung aller 8 GoClean Harz Präsentationen**

Enthält schlüsselfertige Master-Prompts für:
1. **Bruder-Pitch (Emotional - 4 Folien)**
2. **Business-Pitch (Sachlich & ROI - 5 Folien)**
3. **App Feature-Walkthrough (Produkt-Demo - 7 Folien)**
4. **KI & Zukunfts-Vision (Social Media & Automation - 5 Folien)**
5. **Solo-Wachstumsplan (Einzelkämpfer-Offensive - 6 Folien)**
6. **Power-Überblick (Ultra-Kompakt / 60s Teaser - 3 Folien)**
7. **Master-Hub & Präsentations-Portal (Web-App)**

*Vollständige Prompts in \`DOCS/MANUS_PROMPTS_GOCLEAN_PRAESENTATIONEN.md\`.*`
  }
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


# 🎤 GoClean Harz × Manus AI – Präsentations-Generator Master-Suite
**Hochoptimierte Prompts für Manus AI zur automatisierten Erstellung interaktiver Web-Präsentationen**  
*Erstellt von KMU Service Harz für GoClean Harz (Inhaber: Marcel Gornitzka)*

---

## 🧭 Inhaltsverzeichnis & Prompt-Übersicht

1. [Anleitung: So erstellst du die Präsentationen mit Manus AI](#1-anleitung-so-erstellst-du-die-präsentationen-mit-manus-ai)
2. [Master-Prompt 1: Bruder-Pitch (Emotional – 4 Folien)](#master-prompt-1-bruder-pitch-emotional--4-folien)
3. [Master-Prompt 2: Business-Pitch (Sachlich & ROI – 5 Folien)](#master-prompt-2-business-pitch-sachlich--roi--5-folien)
4. [Master-Prompt 3: App Feature-Walkthrough (Produkt-Demo – 7 Folien)](#master-prompt-3-app-feature-walkthrough-produkt-demo--7-folien)
5. [Master-Prompt 4: KI & Zukunfts-Vision (Social Media & Automation – 5 Folien)](#master-prompt-4-ki--zukunfts-vision-social-media--automation--5-folien)
6. [Master-Prompt 5: Solo-Wachstumsplan (Einzelkämpfer-Offensive – 6 Folien)](#master-prompt-5-solo-wachstumsplan-einzelkämpfer-offensive--6-folien)
7. [Master-Prompt 6: Power-Überblick (Ultra-Kompakt / 60s Teaser – 3 Folien)](#master-prompt-6-power-überblick-ultra-kompakt--60s-teaser--3-folien)
8. [Master-Prompt 7: Master-Hub & Präsentations-Portal (Alle Decks in 1 App)](#master-prompt-7-master-hub--präsentations-portal-alle-decks-in-1-app)

---

## 1. Anleitung: So erstellst du die Präsentationen mit Manus AI

### 💡 Warum diese Prompts perfekt auf Manus AI abgestimmt sind:
Manus AI ist ein autonomer Agent, der vollwertigen Code, Web-Apps und UI-Designs generieren kann. Damit Manus nicht einfach eine statische Textseite baut, sondern ein **interaktives High-End Präsentationsdeck im Dark-Glassmorphism-Stil**, nutzen diese Prompts eine präzise **XML-Struktur**:
- `<ROLE>`: Weist Manus die Rolle eines Elite-Frontend-Entwicklers und UX-Designers zu.
- `<GOAL>`: Definiert das exakte Ergebnis (autonome, single-file HTML-Präsentation).
- `<CONTEXT>`: Legt die Zielperson (**Marcel**), die Firma (**GoClean Harz**) und die Partnerschaft (**KMU Service Harz**) fest.
- `<DESIGN_SYSTEM>`: Gibt Farbpalette, Schriften, Glasmorphism-Effekte, Card-Grids und CSS-Variablen vor.
- `<SLIDES>`: Enthält den exakten Inhalt, Folien-Struktur, Badges und Speaker-Tipps für jede einzelne Folie.
- `<INTERACTIONS>`: Tastaturnavigation (Pfeiltasten, F=Vollbild, P=Drucken), Touch-Swipe und `@media print` Layout.
- `<TECHNICAL_REQUIREMENTS>`: Stellt sicher, dass das Ergebnis ohne Node.js/Build-Tools direkt in jedem Browser läuft.

### 🚀 Ausführung in 4 Schritten:
1. Öffne **Manus AI** (`https://manus.im` oder deine Manus-Agenten-Oberfläche).
2. Starte eine **neue Session / Task**.
3. Kopiere den gewünschten Prompt (inklusive aller XML-Tags) aus den folgenden Codeblöcken.
4. Füge den Prompt in Manus ein und starte. Manus wird den HTML-Code schreiben, die Präsentation im integrierten Browser testen und dir die fertige HTML-Datei zum Download bereitstellen.

---

## Master-Prompt 1: Bruder-Pitch (Emotional – 4 Folien)

> **Zweck:** Ein persönlicher, emotionaler Pitch von Bruder zu Bruder. Keine Verkaufs-Floskeln, sondern Fokus auf Feierabend, Familie und Entlastung.

```xml
<ROLE>
Du bist ein erstklassiger UI/UX-Designer und Senior Web Frontend-Entwickler. Du erstellst hochmoderne, responsive, interaktive HTML5/CSS3/JS Web-Präsentationen mit atemberaubendem Dark Glassmorphism Design.
</ROLE>

<GOAL>
Erstelle eine vollständige, sofort lauffähige Single-File-HTML-Präsentation (index.html) mit 4 interaktiven Folien für einen emotionalen Pitch von Bruder zu Bruder.
</GOAL>

<CONTEXT>
- Präsentator: Christian Gornitzka (Gründer von KMU Service Harz)
- Empfänger / Partner: Marcel Gornitzka (Bruder & Inhaber von GoClean Harz, Gebäudereinigung im Harzkreis)
- Situation: Marcel arbeitet hart als Einzelkämpfer auf Baustellen und Objekten. Abends verliert er Stunden mit Angeboten, Zetteln und Rechnungen. Christian hat ihm maßgeschneiderte Softwarewerkzeuge gebaut, um ihm das Büro komplett abzunehmen.
- Tonalität: Warmherzig, persönlich, auf Augenhöhe („Du“-Ansprache), 100% kostenloser Brüder-Deal (VIP #1).
</CONTEXT>

<DESIGN_SYSTEM>
- Thema: Dark Glassmorphism
- Hintergrund: radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%), Body: #090d16
- Farben: Akzent Cyan (#38bdf8), Emerald (#34d399), Amber (#fbbf24), Text (#f8fafc), Muted (#94a3b8)
- Schriften: 'Plus Jakarta Sans' (Headings, 800er Gewicht), 'Inter' (Fließtext) via Google Fonts
- Folien-Karte: Glassmorphism mit backdrop-filter: blur(18px), border: 1px solid rgba(255,255,255,0.1), border-radius: 28px, Glow-Boxshadows
- Header auf jeder Folie: Brand-Tag („KMU Service Harz × GoClean Harz“) mit leuchtendem Dot + Folien-Zähler (z.B. „Folie 01 / 04“)
- Footer auf jeder Folie: Speaker-Tip-Box mit Zitat („💬 Für dich: ...“) + Footer-Branding
</DESIGN_SYSTEM>

<SLIDES>
### Folie 1: Von Bruder zu Bruder
- Headline-Kategorie: „Von Bruder zu Bruder“
- Headline: „Marcel, ich hab dir <span class='gradient-text'>was gebaut.</span>“
- 3 Kernpunkte (mit Icons in Card-List):
  • 🎁 Kein Verkaufsgespräch: „Du bist kein Kunde für mich – du bist mein Bruder. Was ich dir zeige, ist ein Geschenk.“
  • 💪 Ich kenne deinen Alltag: „Ich weiß, wie hart du als Einzelkämpfer bei GoClean Harz arbeitest – und wie viel Zeit das Büro-Chaos danach frisst.“
  • 🛠️ Mein Versprechen: „Ich habe Werkzeuge gebaut, die dir den Bürokram komplett abnehmen – lautlos im Hintergrund.“
- Speaker-Tipp: „Marcel, das hier ist kein Pitch. Das ist mein Geschenk an dich als Bruder.“

### Folie 2: Die ehrliche Wahrheit
- Headline-Kategorie: „Die ehrliche Wahrheit“
- Headline: „8 Stunden Power. Danach? <span class='amber-text'>Büro-Hölle.</span>“
- 4 Punkte:
  • 🌅 Morgens um 6 los: Objekte anfahren, putzen, Qualität abliefern – das kannst du wie kein Zweiter.
  • 🏠 Abends um 18 Uhr nach Hause: Eigentlich Feierabend, aber dann: Angebote schreiben, Rechnungen tippen, WhatsApp beantworten.
  • 📋 Zettel hier, Zettel da: Preise im Kopf kalkulieren, Kunden-Infos auf Zetteln verstreut, nichts ist an einem Ort.
  • 😤 Das Ergebnis: Du arbeitest 12 Stunden, aber bezahlt wirst du für 8. Die restlichen 4 sind unsichtbare Gratis-Arbeit.
- Speaker-Tipp: „Sei mal ehrlich – wie oft sitzt du abends noch am Küchentisch und tippst Rechnungen?“

### Folie 3: Die Lösung
- Headline-Kategorie: „Die Lösung“
- Headline: „Ab jetzt hast du einen <span class='emerald-text'>unsichtbaren Partner.</span>“
- 4 Punkte:
  • ⚡ Angebote in 3 Minuten: Fläche eingeben, Leistung wählen, fertig. Das System kalkuliert m², Stunden und Marge automatisch.
  • 📱 Kunden-Übersicht auf dem Handy: Alle Aufträge, Kontakte und Termine an einem zentralen Ort statt auf 20 Zetteln.
  • 📸 Foto-Checklisten: Vorher/Nachher-Fotos als digitaler Arbeitsnachweis – kein Kunde kann mehr sagen „Das war nicht sauber“.
  • 🤖 WhatsApp auf Autopilot: Terminbestätigungen, Bewertungs-Anfragen, Kunden-Updates laufen automatisch.
- Speaker-Tipp: „Du musst nichts an deiner Arbeit ändern – ich übernehme nur den ganzen Kram, der dich nervt.“

### Folie 4: Der Deal
- Headline-Kategorie: „Der Deal“
- Headline: „Null Risiko. Null Kosten. <span class='gradient-text'>Nur Entlastung.</span>“
- 3 Punkte:
  • 🤝 100% kostenlos für dich: Du bist mein Bruder und mein VIP #1. Du zahlst keinen Cent – null, niente.
  • ☕ Kein Aufwand für dich: Wir trinken einen Kaffee, du erzählst mir deinen Alltag, und ich baue dir alles passgenau ein.
  • 🚀 Dein Ergebnis: Echter Feierabend nach der Arbeit. Mehr Zeit für die Familie. Und trotzdem mehr Aufträge.
- Highlight Memory-Box (Amber-Rahmen): „💡 Erinnerst du dich? Als wir neulich die Scheine verlegt haben? Solche Fehler passieren nie wieder – weil alles digital und automatisch läuft.“
- Speaker-Tipp: „Marcel, wann trinken wir diese Woche einen Kaffee und ich zeig dir alles in Ruhe?“
</SLIDES>

<INTERACTIONS>
- Floating Control-Bar am unteren Bildschirmrand mit: Zurück-Button, Dot-Indikatoren, Weiter-Button und PDF-Druck-Button
- Tastaturnavigation: Pfeiltasten [◀ / ▶], [Leertaste], [PageDown / PageUp] zum Blättern
- Taste [F] schaltet sauberen Vollbildmodus ein/aus
- Taste [P] triggert `window.print()`
- Touch-Swipe Gestenunterstützung auf Smartphones (left/right swipe)
- `@media print` Stylesheet: Sauberes weißes Papierlayout, kein dunkler Hintergrund, Seitenumbruch `page-break-after: always` pro Folie.
</INTERACTIONS>

<TECHNICAL_REQUIREMENTS>
- Reines HTML5, CSS3 und Vanilla JavaScript in einer einzigen Standalone-Datei.
- Keine externen JavaScript-Bibliotheken oder NPM-Pakete. Google Fonts per `<link>` eingebunden.
- Absolut responsives Layout für Desktop, Tablet und Smartphone.
</TECHNICAL_REQUIREMENTS>
```

---

## Master-Prompt 2: Business-Pitch (Sachlich & ROI – 5 Folien)

> **Zweck:** Professioneller, zahlengetriebener B2B-Pitch mit Marktdaten, konkreter Stunden- und Umsatzerparnis sowie strukturiertem 3-Stufen-Fahrplan.

```xml
<ROLE>
Du bist ein Senior B2B-Stratege, Pitch-Deck-Experte und UI/UX Web-Entwickler. Du gestaltest hochgradig überzeugende, datengetriebene Business-Präsentationen im modernen Dark-Emerald-Glassmorphism-Stil.
</ROLE>

<GOAL>
Erstelle eine vollständige, interaktive HTML5/CSS3/JS-Präsentation (index.html) mit 5 Folien für einen professionellen ROI- & Strategie-Pitch für GoClean Harz.
</GOAL>

<CONTEXT>
- Unternehmen: GoClean Harz (Inhaber: Marcel Gornitzka)
- Partner: KMU Service Harz (Christian Gornitzka)
- Branche: Gebäudereinigung & Liegenschaftspflege im Harzkreis
- Kernbotschaft: 11 Stunden Zeiteinsparung pro Woche bei der Verwaltung ermöglichen 2–3 zusätzliche Kundenaufträge = +1.500 € bis +4.000 € monatlicher Mehrumsatz.
</CONTEXT>

<DESIGN_SYSTEM>
- Thema: Dark Emerald Business Glassmorphism
- Hintergrund: radial-gradient(circle at 50% 0%, #064e3b 0%, #022c22 40%, #090d16 100%), Body: #06110f
- Akzentfarben: Emerald (#34d399), Cyan (#38bdf8), Amber (#fbbf24)
- Typografie: 'Plus Jakarta Sans' (Headings), 'Inter' (Body) via Google Fonts
- Komponenten: 2-Spalten-Grids (.grid-2), 3-Spalten-Grids (.grid-3), Feature-Cards mit Badges, Kennzahlen-Tabellen, Quote-Boxen mit grünem Glow
</DESIGN_SYSTEM>

<SLIDES>
### Folie 1: Strategische Partnerschaft 2026
- Headline-Kategorie: „Strategische Partnerschaft 2026“
- Headline: „GoClean Harz.<br /><span class='gradient-emerald'>Digital. Effizient. Profitabel.</span>“
- 3 Feature-Cards (.grid-3):
  1. 📊 Badge „Effizienz“ | „Bis zu 4 Stunden/Woche sparen“ – Automatisierte Angebots- und Rechnungserstellung eliminiert Büroarbeit.
  2. 💰 Badge „Marge“ | „Exakte Kalkulation“ – Branchenspezifische m²-Leistungswerte sichern profitable Preise ohne Unterwert-Verkauf.
  3. 🏆 Badge „Wachstum“ | „B2B-Akquise auf Knopfdruck“ – Vorgefertigte Akquise-Mappen für Hausverwaltungen, Praxen und Bauträger im Harz.
- Quote-Box: „🤝 Partnerschafts-Versprechen: GoClean Harz erhält als VIP-Partner den vollständigen Service – kostenfrei, unbefristet und mit persönlichem Support.“
- Speaker-Tipp: „Marcel, ich möchte dir heute zeigen, wie wir GoClean Harz gemeinsam auf das nächste Level bringen.“

### Folie 2: Marktanalyse Gebäudereinigung
- Headline-Kategorie: „Marktanalyse Gebäudereinigung“
- Headline: „Warum 70% der Solo-Betriebe<br /><span class='gradient-amber'>an Verwaltung scheitern.</span>“
- 2-Spalten-Layout (.grid-2):
  - Links: Professionelle Tabelle mit Branchen-Durchschnittswerten:
    • Verwaltungsaufwand: 15 – 20 Std./Woche
    • Fehlerquote bei manueller Zettelwirtschaft: 12 – 18 %
    • Angebots-Reaktionszeit: 24 – 48 Stunden
    • Kundenabwanderung durch Verzögerungen: ~ 15 % p.a.
  - Rechts: Feature-Card „🔍 Kernproblem: Die unsichtbare Wachstumsbremse“ – Solo-Unternehmer investieren 25% ihrer Arbeitszeit in unbezahlte Verwaltung. Jede Stunde Büroarbeit ist eine Stunde weniger Umsatz am Objekt.
- Speaker-Tipp: „Diese Zahlen gelten für die gesamte Branche – aber wir können GoClean Harz davon befreien.“

### Folie 3: Unsere Lösung – Das GoClean Komplettpaket
- Headline-Kategorie: „Unsere Lösung“
- Headline: „Das GoClean Harz<br /><span class='gradient-cyan'>Komplettpaket.</span>“
- 6 Feature-Cards in 3x2 Matrix:
  1. ⚡ Blitz-Kalkulator: Angebote in <3 Minuten mit exakten m²/h Leistungswerten.
  2. 📋 Qualitätssicherung: Mobile Foto-Checklisten und digitale Abnahmeprotokolle.
  3. 💬 WhatsApp-Automation: Automatische Terminbestätigungen, Updates und Bewertungsbitten.
  4. 📊 Kunden-Dashboard: Zentrale Smartphone-Übersicht aller Aufträge, Kontakte und Termine.
  5. 🧾 Rechnungs-Automation: 1-Klick-Rechnungserstellung mit DATEV-kompatiblem Export.
  6. ⭐ Bewertungs-Booster: Systematischer Aufbau von Google 5-Sterne-Bewertungen.
- Speaker-Tipp: „Jedes einzelne dieser Module spart dir konkret messbare Zeit.“

### Folie 4: Wirtschaftlichkeit & ROI
- Headline-Kategorie: „Wirtschaftlichkeit“
- Headline: „Der messbare<br /><span class='gradient-emerald'>Mehrwert.</span>“
- 2 Feature-Cards im Vergleich:
  - Links (⏱️ Zeitersparnis): Angebotserstellung: 3–4h | Rechnungen: 2–3h | Kommunikation: 1–2h | Doku: 1–2h ➔ **GESAMT: Bis zu 11 Stunden/Woche gespart!**
  - Rechts (💰 Umsatzpotenzial): 11 Stunden mehr Zeit = 2–3 zusätzliche Aufträge/Woche | Ø Auftragswert: 180–350 € ➔ **Potenzial: +1.500 € bis +4.000 € Mehrumsatz/Monat!**
- Quote-Box: „📈 Fazit: Die eingesparte Verwaltungszeit ermöglicht signifikantes Umsatzwachstum bei gleichzeitig besserer Work-Life-Balance.“
- Speaker-Tipp: „Marcel, 11 Stunden pro Woche – das ist mehr als ein ganzer Arbeitstag für bezahlte Aufträge.“

### Folie 5: Implementierung & Fahrplan
- Headline-Kategorie: „Implementierung“
- Headline: „Der 3-Stufen<br /><span class='gradient-cyan'>Fahrplan.</span>“
- 3 Phasen-Cards (.grid-3):
  1. 1️⃣ Phase 1: Analyse (30 Min.) – Workflow-Mapping & Erfassung deiner aktuellen Abläufe.
  2. 2️⃣ Phase 2: Setup (1 Woche) – System-Konfiguration mit Marcels echten Stundensätzen und Leistungsarten.
  3. 3️⃣ Phase 3: Laufend – Kontinuierlicher VIP-Support und laufende Optimierung.
- Quote-Box: „🚀 Nächster Schritt: Ein gemeinsames Meeting – 30 Minuten, keine Vorbereitung nötig.“
- Speaker-Tipp: „Marcel, wann passt es dir diese Woche für 30 Minuten?“
</SLIDES>

<INTERACTIONS>
- Controls: Navigations-Buttons, 5 Dots, Vollbild (F), Print-PDF (P), Touch-Swipe
- Sauberes Print-Stylesheet für A4-Querformat-Export
</INTERACTIONS>
```

---

## Master-Prompt 3: App Feature-Walkthrough (Produkt-Demo – 7 Folien)

> **Zweck:** Detaillierte interaktive Produkt-Demo. Jedes der 7 App-Module wird einzeln mit konkreten Parametern, Tabellen und Screenshots/Icons präsentiert.

```xml
<ROLE>
Du bist ein Lead Software Product Manager und UI-Entwickler. Du baust eine interaktive Feature-Walkthrough-Präsentation für eine Gebäudereiniger-App im High-End Dark Glassmorphism Look.
</ROLE>

<GOAL>
Erstelle eine 7-Folien HTML5-Präsentation (index.html) mit wechselnden Farbakzenten pro Modul, die alle 7 Funktionen des GoClean Harz Toolkits vorstellt.
</GOAL>

<CONTEXT>
- Software: GoClean Harz Digital Suite (entwickelt von KMU Service Harz)
- Anwender: Marcel Gornitzka (GoClean Harz)
- 7 Module: 1. Blitz-Kalkulator | 2. Kunden-Dashboard | 3. Digitale SOP-Checklisten | 4. WhatsApp-Autopilot | 5. 1-Klick-Rechnungen & DATEV | 6. Google 5★ Booster | 7. KI Social Media
</CONTEXT>

<DESIGN_SYSTEM>
- Dark Glassmorphism mit themenspezifischen Farbcodierungen:
  • Modul 1 (Kalkulator): Smaragdgrün (#34d399)
  • Modul 2 (Dashboard): Bernstein-Gelb (#fbbf24)
  • Modul 3 (SOP & Abnahme): Lila/Violett (#a78bfa)
  • Modul 4 (WhatsApp): Rose/Rot (#fb7185)
  • Modul 5 (Rechnungen): Cyan/Blau (#38bdf8)
  • Module 6 & 7 (Marketing): Emerald (#34d399)
</DESIGN_SYSTEM>

<SLIDES>
### Folie 1: Übersicht aller 7 Module
- Headline: „Alles was du brauchst.<br /><span class='gradient-text'>In einer App.</span>“
- 3 Highlight-Cards: 7 Module in einer App | 100% maßgeschneidert für Reinigungsbetriebe | Skalierbar vom Einzelkämpfer zum Team.
- Speaker-Tipp: „Marcel, ich zeig dir jetzt jedes Feature einzeln – sag mir einfach, was dich am meisten interessiert.“

### Folie 2: Modul 1 – Der Blitz-Kalkulator
- Headline: „Der Blitz-<br /><span class='emerald-text'>Kalkulator.</span>“
- Links: Richtwerte-Tabelle (Unterhalt: 200 m²/h | Treppenhaus: 140 m²/h | Glas: 90 m²/h | Bau-Endreinigung: 55 m²/h | Winterdienst: 350 m²/h mit Stundensätzen 36–52 €).
- Rechts: 3-Schritte-Erklärung (1. Fläche eingeben ➔ 2. Automatische Berechnung von Stunden & Material ➔ 3. Fertiger B2B-Angebotstext).
- Speaker-Tipp: „Marcel, gib mal eine echte Fläche von einem aktuellen Auftrag ein!“

### Folie 3: Modul 2 – Das Kunden-Dashboard
- Headline: „Dein Kunden-<br /><span class='amber-text'>Dashboard.</span>“
- 2 Cards:
  • Überblick: Alle Angebote (offen/angenommen), aktive Aufträge, Kundenkontakte und Monatsumsatz live auf dem Handy.
  • Automatische Erinnerungen: Warnung bei überfälligen Rechnungen, Nachfass-Hinweise bei offenen Angeboten.
- Speaker-Tipp: „Marcel, stell dir vor: Kein einziger Zettel mehr. Alles auf dem Handy, immer griffbereit.“

### Folie 4: Modul 3 – Foto-Checklisten & Abnahmeprotokoll
- Headline: „Digitale Checklisten &<br /><span class='violet-text'>Foto-Protokolle.</span>“
- 2 Cards:
  • Baustellen-SOP: Vorher-Foto bei Ankunft, Prüfpunkte (Sanitär, Böden, Müll, Klinken), Nachher-Foto als Beweis.
  • Digitales Abnahmeprotokoll: Vor-Ort-Unterschrift auf dem Touchscreen schützt vor nachträglichen Reklamationen.
- Speaker-Tipp: „Das schützt dich vor jedem Kunden, der nachträglich behauptet, etwas wäre nicht sauber gewesen.“

### Folie 5: Modul 4 – WhatsApp auf Autopilot
- Headline: „WhatsApp<br /><span class='rose-text'>auf Autopilot.</span>“
- 2 Cards:
  • Vorlagen: Termin-Erinnerung am Vortag, Fertigstellungs-Update, Bewertungs-Bitte mit 1 Klick.
  • Smarte Steuerung: Du behältst volle Kontrolle, gibst den Text mit einem Fingertipp frei.
- Speaker-Tipp: „Du musst keinem Kunden mehr hinterhertexten – das macht die App für dich.“

### Folie 6: Modul 5 – Rechnungen & DATEV per Knopfdruck
- Headline: „Rechnungen per<br /><span class='cyan-text'>Knopfdruck.</span>“
- 2 Cards:
  • 1-Klick-Rechnung: Automatisch aus dem fertigen Auftrag generiert, PDF per WhatsApp/Mail an den Kunden.
  • DATEV-Export: Saubere Buchungsdaten für den Steuerberater – keine manuelle Zetteleingabe mehr.
- Speaker-Tipp: „Auftrag erledigt ➔ ein Klick ➔ Rechnung beim Kunden. Fertig.“

### Folie 7: Module 6 & 7 – Google 5-Sterne & Social Media
- Headline: „5-Sterne-Bewertungen &<br /><span class='emerald-text'>Social Media.</span>“
- 2 Cards:
  • Google-Booster: Automatische WhatsApp nach Auftragsende mit Direktlink ➔ Ziel: 50+ Bewertungen & Platz 1 bei Google.
  • KI Social Media: KI generiert aus deinen Vorher/Nachher-Fotos fertige Instagram- und Facebook-Posts inklusive Hashtags.
- Speaker-Tipp: „Marcel, mehr Google-Bewertungen = mehr Anfragen von alleine. Und Social Media läuft nebenbei.“
</SLIDES>

<INTERACTIONS>
- Controls für 7 Folien mit 7 Dot-Indikatoren, Tastatur-, Touch- und Print-Steuerung.
</INTERACTIONS>
```

---

## Master-Prompt 4: KI & Zukunfts-Vision (Social Media & Automation – 5 Folien)

> **Zweck:** Futuristischer, beeindruckender Pitch über KI-Unterstützung: KI-Texter für Instagram/Facebook, smarte Tourenplanung, 24/7 Chatbot-Assistent und Marktradar.

```xml
<ROLE>
Du bist ein KI-Stratege, Innovation Consultant und Creative Web Developer. Du erstellst futuristische, visuell spektakuläre Präsentationen im Dark-Violet/Cyberpunk-Glassmorphism-Look.
</ROLE>

<GOAL>
Erstelle eine 5-Folien HTML5-Präsentation (index.html), die zeigt, wie Künstliche Intelligenz GoClean Harz zum modernsten Reinigungsbetrieb im Harzkreis macht.
</GOAL>

<CONTEXT>
- Unternehmen: GoClean Harz (Inhaber: Marcel Gornitzka)
- Partner: KMU Service Harz
- Kernthemen: KI-Texter für Social Media & Angebote, smarte Routen- & Tourenplanung, 24/7 Chatbot-Assistent, KI-Marktradar zur Lead-Generierung.
</CONTEXT>

<DESIGN_SYSTEM>
- Thema: Cyber Violet Glassmorphism
- Hintergrund: radial-gradient(circle at 50% 0%, #312e81 0%, #1e1b4b 40%, #090d16 100%), Body: #0a0a1a
- Akzente: Leuchtendes Violett (#a78bfa), Cyan (#38bdf8), Rose (#fb7185), Emerald (#34d399)
- Glow-Effekte: box-shadow: 0 0 50px -10px rgba(167, 139, 250, 0.3)
</DESIGN_SYSTEM>

<SLIDES>
### Folie 1: Dein Betrieb. Powered by KI.
- Headline: „Dein Betrieb.<br /><span class='gradient-violet'>Powered by KI.</span>“
- 3 Cards (.grid-3): 🧠 KI-Texter für Social Media | 📊 Smarte Routen- & Auslastungsplanung | 🤖 24/7 Digitaler Assistent für Kundenanfragen.
- Quote-Box: „🚀 Das Ziel: Marcel, du machst erstklassige Reinigung vor Ort. Die KI erledigt den gesamten Marketing- und Planungsprozess.“
- Speaker-Tipp: „Marcel, das ist keine Science-Fiction – das funktioniert alles schon heute.“

### Folie 2: Der KI-Texter – Social Media auf Autopilot
- Headline: „Der KI-Texter:<br /><span class='gradient-cyan'>Texte auf Knopfdruck.</span>“
- 2 Cards:
  • Social Media: KI verwandelt deine Vorher/Nachher-Fotos in fertige Instagram- & Facebook-Posts mit Emojis, Hashtags und regionalem Bezug.
  • Business-Texte: Perfekt formulierte Anschreiben für Hausverwaltungen, Angebotsbegleittexte und Nachfass-Mails.
- Speaker-Tipp: „Marcel, du machst ein Foto vom fertigen Büro – die KI macht daraus einen Instagram-Post, der neue Kunden bringt.“

### Folie 3: Smarte Planung – KI denkt voraus
- Headline: „Smarte Planung:<br /><span class='gradient-emerald'>KI denkt voraus.</span>“
- 2 Cards:
  • Routenoptimierung: Optimale Reihenfolge der Objekte spart Spritkosten und Fahrzeit ➔ mehr Zeit am zahlenden Kunden.
  • Muster-Erkennung: KI erkennt saisonale Spitzen (Frühjahrsputz, Winterdienst) und schlägt optimale Preise vor.
- Speaker-Tipp: „Marcel, die KI plant deine Fahrwege so effizient, dass du jeden Tag 30 Minuten weniger im Auto sitzt.“

### Folie 4: Dein 24/7 Digitaler Assistent
- Headline: „Dein digitaler<br /><span class='gradient-rose'>Assistent.</span>“
- 2 Cards:
  • 24/7 Chatbot: Beantwortet Kundenanfragen zu Preisen und Leistungen auch abends und am Wochenende.
  • Automatische Terminbuchung: Kunden können freie Termine direkt anfragen; Marcel hat morgens fertige Anfragen im Dashboard.
- Quote-Box: „💡 Stell dir vor: Ein Kunde schreibt um 22 Uhr. Der Chatbot antwortet sofort und Marcel hat morgens um 6 Uhr einen fertigen Auftrag.“
- Speaker-Tipp: „Marcel, du schläfst – und dein digitaler Assistent sammelt Aufträge ein.“

### Folie 5: KI-Marktanalyse & Wachstums-Radar
- Headline: „KI-Marktanalyse &<br /><span class='gradient-violet'>Wachstums-Radar.</span>“
- 3 Cards (.grid-3):
  • 🎯 Zielkunden finden: Automatisches Auffinden neuer Praxen, Hausverwaltungen und Firmen im Harz.
  • 🔍 Wettbewerbs-Check: Analyse regionaler Mitbewerber zur Identifikation unbesetzter Preissegmente.
  • 💎 Dynamische Preisoptimierung: Vorschläge für marktgerechte Festpreise.
- Quote-Box: „🚀 Die Vision: GoClean Harz wird der technologisch führende Reinigungsbetrieb im gesamten Harzkreis.“
- Speaker-Tipp: „Marcel, mit diesen Tools bist du jedem Mitbewerber im Harz um Lichtjahre voraus.“
</SLIDES>

<INTERACTIONS>
- Controls, Fullscreen (F), PDF (P), Touch-Swipe
</INTERACTIONS>
```

---

## Master-Prompt 5: Solo-Wachstumsplan (Einzelkämpfer-Offensive – 6 Folien)

> **Zweck:** Speziell auf Marcels Situation als 1-Mann-Betrieb zugeschnitten. Zeigt, wie er ohne Mitarbeiter die Schlagkraft von 3 Personen erreicht, inklusive 90-Tage-Fahrplan.

```xml
<ROLE>
Du bist ein erfahrener Handwerks-Unternehmensberater und Web-Entwickler. Du erstellst eine taktische Wachstums-Präsentation für Einzelunternehmer im Dark Emerald Glassmorphism Stil.
</ROLE>

<GOAL>
Erstelle eine 6-Folien HTML5-Präsentation (index.html) mit dem Thema „Solo-Wachstum: Als Einzelkämpfer die Power von 3 Mitarbeitern entfesseln“.
</GOAL>

<CONTEXT>
- Zielperson: Marcel Gornitzka (GoClean Harz)
- Status: Einzelkämpfer (Solo-Selbstständiger) ohne Angestellte.
- Kernbotschaft: Durch Digitalisierung und Automatisierung schafft Marcel das Arbeitspensum von 3 Personen, behält 100% der Marge und baut ein skalierbares Fundament für die Zukunft auf.
</CONTEXT>

<DESIGN_SYSTEM>
- Dark Emerald / Forest Green Theme
- Hintergrund: radial-gradient(circle at 50% 0%, #064e3b 0%, #022c22 40%, #090d16 100%)
- Akzente: Emerald (#34d399), Amber (#fbbf24), Cyan (#38bdf8)
</DESIGN_SYSTEM>

<SLIDES>
### Folie 1: Einer. Aber mit der Power von dreien.
- Headline: „Einer. Aber mit der<br /><span class='gradient-emerald'>Power von dreien.</span>“
- 3 Punkte: Marcel ist Einzelkämpfer | Software fungiert als unsichtbares 2-Mann-Büroteam | Gleicher Output wie ein 3-Mann-Betrieb ohne Personalkosten.
- Speaker-Tipp: „Marcel, du musst nicht sofort Mitarbeiter einstellen, um mehr zu schaffen. Du musst nur smarter arbeiten.“

### Folie 2: Hebel #1 – Deine Superkraft: Automatisierung
- Headline: „Deine Superkraft:<br /><span class='gradient-cyan'>Automatisierung.</span>“
- 2 Vergleichs-Cards:
  • ❌ Was du NIE WIEDER machst: Angebote per Hand tippen, Rechnungen suchen, Kunden nachtelefonieren, Zettel sortieren.
  • ✅ Was du stattdessen machst: Erstklassige Arbeit vor Ort, Kundenbeziehungen pflegen, pünktlich Feierabend machen.
- Speaker-Tipp: „Marcel, statt 4 Stunden Büro am Abend – null Stunden. Alles läuft automatisch.“

### Folie 3: Hebel #2 – Mehr Aufträge ohne mehr Arbeit (B2B-Hebel)
- Headline: „Mehr Aufträge.<br /><span class='gradient-emerald'>Ohne mehr Arbeit.</span>“
- 3 Cards (.grid-3):
  • 🏢 Hausverwaltungen: 5–30 Liegenschaften mit festen Dauerverträgen.
  • 🏗️ Bauträger: Bau-Endreinigungen mit hohen Margen (42–52 €/h).
  • 🩺 Praxen & Kanzleien: Langfristige, krisensichere Stammkunden.
- Quote-Box: „💡 Eine einzige Hausverwaltung kann deinen Monatsumsatz verdoppeln – bei planbaren Intervallen.“
- Speaker-Tipp: „Marcel, ich bereite die Akquise komplett vor – du musst nur noch unterschreiben lassen.“

### Folie 4: Hebel #3 – Social Media & Google ohne Zeitaufwand
- Headline: „Social Media &<br /><span class='gradient-amber'>Google – ohne Aufwand.</span>“
- 2 Cards:
  • KI-Social-Media: Foto machen ➔ KI schreibt den Beitrag ➔ 3–4 Posts pro Woche für regionale Bekanntheit.
  • Google 5-Sterne-System: Automatische WhatsApp nach jedem Auftrag ➔ 50+ Top-Bewertungen in 6 Monaten.
- Speaker-Tipp: „Marcel, du machst ein Foto nach dem Putzen, und die Software erledigt dein Marketing.“

### Folie 5: Zukunfts-Option – Bereit für den ersten Mitarbeiter
- Headline: „Wachsen, wenn<br /><span class='gradient-cyan'>du es willst.</span>“
- 2 Cards:
  • Heute (Solo-Power): Alle Prozesse digital standardisiert; kein Wissen geht verloren.
  • Morgen (Team-Ready): Einarbeitung per Checkliste, Qualitätskontrolle per Foto, Einsatzplanung über die App.
- Quote-Box: „🎯 Kein Wachstumszwang: Du entscheidest, ob du solo bleibst oder wächst. Das Fundament steht.“
- Speaker-Tipp: „Marcel, du kannst delegieren, ohne jemals die Kontrolle über die Qualität zu verlieren.“

### Folie 6: Dein 90-Tage-Wachstumsplan
- Headline: „Dein 90-Tage<br /><span class='gradient-emerald'>Wachstumsplan.</span>“
- 3 Phasen (.grid-3):
  • Woche 1 (Setup): Kaffee-Treffen, Stundensätze & WhatsApp-Vorlagen konfigurieren.
  • Monat 1 (Akquise): 10 Hausverwaltungen kontaktieren, Google-Bewertungen sammeln.
  • Monat 2–3 (Vollgas): B2B-Verträge abschließen, alle Rechnungen automatisiert, DATEV-Export nutzen.
- Quote-Box: „🏆 Ergebnis: Mehr Umsatz, planbare Monatsverträge und echter Feierabend!“
- Speaker-Tipp: „Marcel, lass uns mit dem Kaffee-Meeting starten – alles andere ergibt sich Schritt für Schritt.“
</SLIDES>

<INTERACTIONS>
- Controls, Fullscreen, Print, Touch-Swipe
</INTERACTIONS>
```

---

## Master-Prompt 6: Power-Überblick (Ultra-Kompakt / 60s Teaser – 3 Folien)

> **Zweck:** Ein extrem schneller 60-Sekunden-Teaser mit maximaler Durchschlagskraft. Problem ➔ Lösung auf einen Blick ➔ Kaffee-Deal.

```xml
<ROLE>
Du bist ein Experte für High-Impact Pitch Decks und moderner Web-Entwickler.
</ROLE>

<GOAL>
Erstelle eine ultra-kompakte 3-Folien HTML5-Präsentation (index.html) als 60-Sekunden-Power-Teaser.
</GOAL>

<CONTEXT>
- Für: Marcel Gornitzka (GoClean Harz)
- Von: Christian Gornitzka (KMU Service Harz)
- Ziel: In 60 Sekunden das Problem benennen, die 6 Module zeigen und ein 15-Minuten-Kaffee-Treffen vereinbaren.
</CONTEXT>

<DESIGN_SYSTEM>
- Dark Slate Glassmorphism
- Farben: Cyan (#38bdf8), Amber (#fbbf24), Emerald (#34d399)
- Typografie: Große, ausdrucksstarke Headlines (clamp(2rem, 3.8vw, 3.2rem))
</DESIGN_SYSTEM>

<SLIDES>
### Folie 1: Der Status Quo
- Headline-Kategorie: „Der Status Quo“
- Headline: „8h Arbeiten. 3h Büro.<br /><span class='amber-text'>0h Feierabend?</span>“
- 3 Punkte:
  • ⌛ Das Dilemma: Tagsüber vollen Einsatz auf der Baustelle – abends warten noch Angebote, Zettel und Rechnungen.
  • 🛑 Verlorene Lebenszeit: Stunden, die für Familie und Feierabend fehlen – unbezahlte Mehrarbeit.
  • ⚡ Die Lösung: Du musst kein IT-Experte werden. Die Systeme nehmen dir das Büro komplett ab.
- Quote-Box: „💡 Marcel: Willst du abends weiter Zettel tippen – oder ab jetzt mit einem Klick Feierabend haben?“
- Speaker-Tipp: „Marcel, schau dir die nächsten 2 Folien an – genau 60 Sekunden.“

### Folie 2: Die 6 Power-Module auf einen Blick
- Headline-Kategorie: „Die 6 Power-Module“
- Headline: „Dein Büro auf<br /><span class='gradient-text'>Autopilot.</span>“
- 6 kompakte Feature-Cards (3x2 Grid):
  1. ⚡ Blitz-Kalkulator: Fläche eingeben ➔ Angebot in 3 Min. per WhatsApp versenden.
  2. 📱 Kunden & Termine: Alle Aufträge und Termine live auf dem Handy.
  3. 📸 Foto-Checklisten: Vorher/Nachher-Fotos stoppen jede Kunden-Reklamation.
  4. 🧾 Rechnungen & DATEV: Auftrag fertig ➔ Rechnung raus ➔ DATEV-Export.
  5. 💬 WhatsApp-Autopilot: Termin-Erinnerungen & Updates ohne Tipparbeit.
  6. ⭐ 5-Sterne-Booster: Automatische Google-Bewertungen für Top-Rankings.
- Speaker-Tipp: „Das läuft alles auf deinem Smartphone – einfach, schnell, ohne Schulung.“

### Folie 3: Unser Brüder-Deal
- Headline-Kategorie: „Unser Brüder-Deal“
- Headline: „Ein Kaffee. 15 Minuten.<br /><span class='emerald-text'>Dein neues Büro.</span>“
- 3 Punkte:
  • 🎁 100% kostenlos für dich: Du bist mein Bruder und VIP #1. Du bezahlst keinen Cent.
  • ☕ Null Vorbereitung: Wir trinken einen Kaffee, du zeigst mir deinen Alltag – ich richte dir alles ein.
  • 🚀 Sofortige Entlastung: Schon ab nächster Woche sparst du jeden Tag wertvolle Stunden im Büro.
- Quote-Box: „🤝 Brüder-Versprechen: Du machst erstklassige Arbeit beim Kunden – ich halte dir den Rücken frei. Wann trinken wir einen Kaffee?“
- Speaker-Tipp: „Marcel, sag mir einfach welchen Tag diese Woche du Zeit für einen Kaffee hast!“
</SLIDES>

<INTERACTIONS>
- Controls mit 3 Dots, Vollbild (F), Print-PDF (P), Swipe
</INTERACTIONS>
```

---

## Master-Prompt 7: Master-Hub & Präsentations-Portal (Alle Decks in 1 App)

> **Zweck:** Ein vollständiges Präsentations-Portal mit interaktiven Vorschaubildern, Kategorie-Filtern und eingebettetem Live-Modal für alle 8 Decks.

```xml
<ROLE>
Du bist ein Full-Stack UI/UX Web-Entwickler. Du erstellst ein zentrales Web-Portal / Präsentations-Center im Dark Glassmorphism Design.
</ROLE>

<GOAL>
Erstelle eine vollständige interaktive Dashboard-Webseite (goclean_praesentationen_hub.html), die alle 8 Präsentationen für GoClean Harz übersichtlich präsentiert, mit Direktlinks und Filteroptionen.
</GOAL>

<CONTEXT>
- Portal-Name: GoClean Harz × KMU Service Harz – Präsentations-Center
- Ziel: Übersicht aller Präsentations-Varianten für das Gespräch mit Marcel Gornitzka.
</CONTEXT>

<DESIGN_SYSTEM>
- Dark Glassmorphism Dashboard mit responsivem Grid
- Filter-Leiste für Kategorien: Alle | Pitches | Demos | Solo-Wachstum | KI & Zukunft
- Jede Karte enthält: Icon, Titel, Subtitle, Badge, Folienanzahl, Beschreibung und Hover-Effekt mit Pfeilanimation.
</DESIGN_SYSTEM>
```

---

## 💡 Profi-Tipps für die Arbeit mit Manus AI:

1. **Dateiname:** Wenn du Manus bittest, eine Datei zu erstellen, sage ihm am Ende des Prompts: `„Speichere die fertige Datei als [dateiname].html und teste sie im Browser.“`
2. **Design anpassen:** Falls du eine Farbnuance ändern möchtest, kannst du Manus einfach bitten: `„Ändere die Hauptakzentfarbe von Cyan (#38bdf8) auf Smaragdgrün (#34d399).“`
3. **Download:** Manus bietet dir nach Abschluss der Generierung direkt einen Download-Link für die fertige `.html`-Datei an, die du direkt im Browser öffnen kannst.

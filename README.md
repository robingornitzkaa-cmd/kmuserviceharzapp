# Life & Founder OS - Personal Goal, Habit & Business Control Center

Dieses Projekt ist eine maßgeschneiderte, hochgradig ästhetische Web- und Mobilanwendung (**Life & Founder OS**) für Robin. Sie dient als zentrales Betriebssystem zur Steuerung von Tageszielen, persönliche Gewohnheiten (Kraftsport, Make Academy, Lesen, Wasser), Gamifizierung mit Belohnungs-Shop & Disziplin-System sowie CRM, Projekten, Dokumenten, KI-Prompts und Automatisierungsworkflows.

Die Anwendung zeichnet sich durch ein futuristisches "Glassmorphic Dark Theme" aus, ist 100 % offline-fähig (localStorage-geschützt) und optimiert für Desktop- und Smartphone-Bedienung. Zudem ist sie als native Android-App mittels Capacitor verpackbar und bietet ein echtes Android-Homescreen-Widget.

---

## 🚀 Wichtigste Funktionen & Tab-Struktur

### 1. Dashboard & Life OS Gamification -- *NEU UPGRADED!*
- **🎙️ Voice Quick-Capture Studio:** 1-Tap Sprach- und Diktierstudio mit Web Audio API Synthesizer-Feedback, Live Wave-Puls, Tag-Pills (`#Wichtig`, `#Kunde`, `#Idee`...) und 1-Klick Multi-Routing direkt in *To-Do*, *Notiz*, *Tages-Fokus*, *CRM-Lead* oder *Termin*.
- **📦 1-Klick Data Hub & Backup Manager:** Vollständiges Export- und Import-Center für alle 7 OS-Datenmodule (CRM, Prompts, Notizen, Gamification, Tasks, Roadmap, Settings) mit Drag & Drop, Schema-Inspektor und automatischem Notfall-Snapshot vor jedem Restore.
- **🎮 Life OS Level, XP & Coins System:** Verdiene XP und Life-Coins durch das Abhaken täglicher Habits und Fokus-Ziele. Verfolge deinen Fortschritt mit visueller Level-Bar (Level Up alle 200 XP).
- **🎁 Belohnungs-Shop (Münzen einlösen):** Tausche verdiente Coins gegen selbstdefinierte Belohnungen ein (z. B. 30 Min Zocken, Filmabend, Cheat Meal, Tech-Gadgets) – ohne schlechtes Gewissen!
- **🛡️ Bestrafungs- & Disziplin-Manager:** 3 wählbare Anti-Faulheit-Modi bei verpassten Gewohnheiten (Münz-Abzug / XP-Schulden, Straf-Aufgaben, 3-Strikes System).
- **🛌 Smart Routine & Ruhetags-Erkennung:** Automatische Wochentag-Erkennung (z. B. Kraftsport an Mo/Mi/Fr). An regenerativen Tagen zeigt die App explizit einen **grünen Ruhetag-Hinweis**, um schlechtes Gewissen zu vermeiden.
- **⚡ Make Academy & Lern-Tracker:** Täglicher Schnell-Check für Make Academy Einheiten und Weiterbildung.
- **Personalisierbares Layout & Freie Verschiebung:** Blende Widgets ein/aus und **verschiebe sie frei per Positionsmarkierung (`#1`, `#2`...) und `⬆️` / `⬇️` Buttons im Editor**.
- **📌 Multi-Notizen System & Cloud-Sync (Handy ↔ PC):** Erstelle, benenne und verwalte beliebig viele Notizblätter mit individuellen Farben. Alle Notizen werden automatisch in Supabase Cloud gesichert.

### 1b. Gründungs-Roadmap & Command Center -- *NEU!*
- **🗺️ Interaktive Gründungs-Roadmap & Meilenstein-Matrix:** 4 strategische Gründungsphasen (1: Fundament/Recht/Banken, 2: Pilot-Kunden Harz, 3: Automation Stack, 4: B2B-Skalierung). Mit Ampelstatus (`⚪`, `🟡`, `🔴`, `🟢`), interaktiven Checklisten und XP-Belohnungen für das Life OS bei Meilenstein-Abschluss.

### 2. Inbox & Tasks (Posteingang)
- **WhatsApp-Gateway & Webhook-Simulation:** Teste den Empfang strukturierter WhatsApp-Nachrichten samt HTTP-Post-Weiterleitung.
- **Kanban-Board:** Drag-and-Drop Aufgaben-Board für den optimalen Arbeitsfluss.

### 3. CRM & Projekte (Kundenverwaltung)
- **Kunden-Akte (Drawer):** Drawer mit kundenbezogenen Notizen, verlinkten Dokumenten und lückenloser Aktivitätshistorie.
- **Projekt-Tracker & Time-Tracking:** Live-Stoppuhr zur Rentabilitätsberechnung (effektiver Stundensatz) mit Farbindikatoren (Rot/Gelb/Grün).

### 4. Kunden-Onboarding (Gesprächsleitfäden) -- *NEU!*
- **Wizard-Ansicht:** Schritt-für-Schritt Abarbeitung des KMU-Service Harz Master Playbooks (10 Phasen) oder des Pilot-Bruder-Onboardings (5 Phasen).
- **Unterstützende Infos:** Live-Einblendung von Fragestellungs-Hintergründen, Folgefragen und Warnsignalen direkt im Workflow.
- **Echtzeit-Synchronisation:** Nahtlose Speicherung der Notizen über die Supabase-REST-API direkt in den CRM-Lead-Einträgen.
- **Wissens-Hub-Export:** Generierung sauberer Markdown-Gesprächsprotokolle für den Wissens-Hub.

### 5. KI Prompts (Prompt-Zentrale) -- *UPGRADED!*
- **Prompt Vault & Baukasten:** Speichere, verwalte, filtere, pinne (`📌`) und exportiere/importiere Prompts. Mit Platzhalter-Variablen (`{{Variable}}`) und Sync-Badges (`☁️ Cloud` vs `📱 Lokal`).
- **🏢 KMU & Harz Spezial-Prompts:** 12+ vordefinierte Vorlagen für Sales, Recruiting, DSGVO, Google Beiträge und Handwerk mit 1-Klick-Übernahme (`➕ In meinen Tresor übernehmen`).
- **🔬 Deep Research Frameworks & Baukasten (Phase v27):** 5 spezialisierte Recherche-Frameworks (📊 Lead & SWOT, 🎯 Wettbewerber, 📈 Markt & Trends, 🛠️ Tool-Vergleich, 👥 Buyer Persona) und 25+ Prompt-Bausteine (Lead-Qualifizierung, Entscheider-Analyse, SWOT-Grid, Digitalisierungs-Check).
- **📱↔️💻 Prompt Vault & Bidirektionaler Cloud-Sync:** Automatische bidirektionale Synchronisation mit Supabase, Prompt-Bibliothek für KMU, Favoriten und Deep Research Master-Prompt Generierung. mit 1-Klick-Wiederherstellen (`🔄 Diese Version wiederherstellen`).
- **🔬 Deep Research Prompt Modus & Quick-Button:** 1-Klick-Aktionsbutton (`🔬 Deep Research Prompt`) sowie Optimierungsziel (`🔬 Deep Research`), um beliebige Themen in 5-stufige Tiefenrecherche-Prompts (für Gemini Deep Research, Perplexity Pro, OpenAI Deep Research, Claude) zu transformieren.
- **Supabase Auto-Cloud-Sync:** Neue Prompts werden beim Erstellen oder Löschen sofort geräteübergreifend (Handy ↔ PC) synchronisiert.
- **Vorher/Nachher KI-Diff & Modi:** Vergleiche Original und KI-Ergebnis nebeneinander in 5 Ziel-Modi (*🎯 Standard*, *✂️ Kurz*, *🌍 Englisch*, *🛡️ Datenschutz*, *🔬 Deep Research*).
- **Content-Planer:** Redaktionsplan für deine Social-Media-Kanäle.
- **RAG Knowledge Bot:** KI-Assistent mit umschaltbaren Personas (🧠 Firmengehirn, 🎯 Pitch-Coach, 🔒 DSGVO & Legal), der dein Google-Drive-Wissen mit präzisen Quellenangaben durchsucht.

### 6. Dokumente & Sync (Dateiverwaltung) -- *NEU!*
- **Wissens-Hub & Dokumenten-Editor (Mini-Word):** Erstelle, bearbeite und lösche Textdokumente direkt in der App. Bietet Dateidownloads als `.txt`.
- **Google Drive & NotebookLM Sync:** Synchronisiere deine lokalen Dokumente mit Google Drive zur Indizierung in Google NotebookLM (inklusive terminalähnlicher Fortschrittsanzeige).
- **Supabase Cloud Sync:** Überwache die Echtzeit-Datenübertragung mit der Cloud (CRM, Tasks, Tickets) inklusive Latenz- und Tabellenzeilen-Anzeige.

### 7. Sales & SOPs (Vertriebstools)
- **Showcase ROI-Rechner:** Berechne Einsparungen live beim Kunden und exportiere diese als professionelles PDF-Angebot.
- **No-Code Automation Canvas:** Visueller Workflow-Builder zur Demonstration automatisierter Prozesse.
- **Zettel-zu-Code Visualisierer:** Interaktiver Vergleich von manuellen Papier-Abläufen vs. modernen IT-Schnittstellen.
- **Kunden-Portal (White-Label):** Umschaltbarer Mandanten-Modus für deine Kunden (Projektstatus, ROI-Ersparnis, Support-Ticket-System).

### 8. KMU Webseiten-Preview & Relaunch (Positionierung & 3-Design-Welten) -- *NEU RELAUNCHED!*
- **Positionierung & Botschaft:** „Der Handwerker für digitale Infrastruktur“ – *„Schluss mit dem Büro-Sonntag. Lautlose digitale Workflows für Handwerk & Mittelstand im Harz.“*
- **Dreistufige Preistreppe (Productized Services):**
  - *Stufe 1: Büro-Potenzial-Audit (500 € Festpreis)* – 90 Min Analyse vor Ort/Video, schriftlicher ROI-Fahrplan.
  - *Stufe 2: Das Standard-Setup (2.000 € Festpreis, Bestseller)* – Automatisierter Belegeingang (Drive, Mail, WhatsApp ➔ Lexoffice), DATEV-Übergabe, 100% E-Rechnung (EN 16931 / ZUGFeRD) & GoBD, bis zu 50% Fördermittel-Hebel (Digitalbonus).
  - *Stufe 3: Digitaler Hausmeister (200 € / Monat)* – 24/7 Monitoring, Schnittstellen-Updates, 1h Kontingent.
- **Praxis-Showcase „GoClean Harz“:** Interaktiver Vorher/Nachher-Vergleich (Zettelchaos vs. 6h/Woche Feierabend-Gewinn) mit visuellem 3-Schritte-Workflow (Smartphone ➔ Lexoffice ➔ DATEV).
- **Interaktiver Handwerker-ROI-Rechner:** Ermittelt gerettete Büro-Sonntage pro Jahr, monatlich gewonnene Arbeitsstunden und den monetären Jahreswert.
- **🎨 3-Design-Theme-Switcher:** Umschalten in der Header-Leiste zwischen:
  1. 🌲 **Harz & Handwerk** (Waldgrün & Bernstein/Gold)
  2. ⚡ **Modernes Tech-Handwerk** (Schieferblau & Smaragd)
  3. 🛠️ **Industrie & Klarheit** (Anthrazit & Warm-Orange)
- **Hybrid-Seitenstruktur:** High-Converting One-Pager plus dedizierte Subpages für Preise & Angebote, Fallstudie, Rechner, Über uns, Impressum und Datenschutz.

### 9. 🎯 Coaching Live-Portal & Grafik-Anhänge (Zoom/Teams-Präsentation) -- *NEU!*
- **🖼️ Datei- & Grafik-Anhänge:** Lade Grafiken (Zielgruppen-Personas, Schulungsgrafiken, Screenshots, PDFs) direkt in Coaching-Terminen (Command Center), an Kanban-Aufgaben oder im Wissens-Hub (DocsHub) hoch.
- **🔍 Vollbild-Präsentationsmodus (Lightbox):** 1-Klick auf eine beliebige Grafik öffnet ein hochauflösendes Vollbild-Präsentationsfenster zum Herunterladen und Vorzeigen im Call.
- **🔒 PIN-geschütztes Coaching Live-Board (`CoachingLivePortal.jsx`):** Eine saubere Präsentationsunterseite (geschützt durch PIN `1234`), die im Zoom-Call geteilt werden kann. Zeigt den Coaching-Fortschritt, meilensteine, Aufgaben und Personas – bei 100%igem Schutz von privaten Notizen, Finanzen oder Kunden-Daten.

---

## 🛠️ Installation & Starten

### Voraussetzungen
- Node.js (v18 oder höher empfohlen)
- NPM

### Starten der lokalen Web-Entwicklungsumgebung
1. Navigiere in das Projektverzeichnis.
2. Installiere die Abhängigkeiten (falls noch nicht geschehen):
   ```bash
   npm install
   ```
3. Starte den Vite-Entwicklungsserver:
   ```bash
   npm run dev
   ```
4. Öffne im Browser: `http://localhost:5173`

---

## 📱 Mobile App (Android-Studio-Build)

Die Anwendung ist für den mobilen Einsatz als native Android-App vorbereitet.

1. **Vite-Build generieren:**
   ```bash
   npm run build
   ```
2. **Capacitor-Synchronisation:**
   ```bash
   npx cap sync android
   ```
3. **Android Studio öffnen:**
   ```bash
   npx cap open android
   ```
4. In Android Studio das Projekt starten oder als APK exportieren. Das native Homescreen-Widget (`MyWidgetProvider`) ist bereits im Android-Manifest registriert.

---

## 🧪 Test-Abteilung & Qualitätssicherung

Das Projekt verfügt über eine vollständige, modulare **Test-Abteilung** mit 8 eigenständigen Feature-Test-Suiten in `src/test/features/`. Dadurch können Tests für einzelne Features in unter 1 Sekunde ausgeführt werden, ohne die gesamte App laden zu müssen.

### ⚡ Schnelle Feature-Tests (Gezielte Ausführung)

| Feature / Bereich | NPM-Befehl | Was wird getestet? |
| :--- | :--- | :--- |
| **Mini-CRM & Pipeline** | `npm run test:crm` | Neuanlage von Leads, Phasenwechsel, Filter & Löschen |
| **Kanban & Aufgaben** | `npm run test:kanban` | Task-Erstellung, Spalten-Zuweisung, Inbox-Konvertierung |
| **Sales, SOPs & ROI** | `npm run test:sales` | ROI-Kalkulator-Formeln, Regionen-Förderung, SOP-Checklisten |
| **KI-Tresor (Prompt Vault)** | `npm run test:prompts` | Prompt-Erstellung, Platzhalter, Kategorien & Suche |
| **Command Center & Roadmap** | `npm run test:command` | Master-Logbuch Bearbeitung, Roadmap-Matrix, Meilensteine |
| **Coaching & Gamification** | `npm run test:coaching` | PIN-Gate Schutz, Belohnungs-Shop & Disziplin-Strafen |
| **Sync & Backup Manager** | `npm run test:sync` | 1-Klick Backup JSON-Schema, Notfall-Snapshots, Sync-Queue |
| **Dashboard & Voice Capture** | `npm run test:dashboard` | Voice-Diktat Routing, Hashtags & Fokus-Timer |

### 🚀 Gesamte Test-Läufe

- **Alle Feature-Tests zusammen (~3.9s):**
  ```bash
  npm run test:features
  ```
- **Interaktiver Entwickler-Watch-Modus (Hot-Reload bei Code-Änderung):**
  ```bash
  npm run test:watch
  ```
- **Gesamter Integrations-Test:**
  ```bash
  npm run test:all
  ```



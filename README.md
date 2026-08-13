# Life & Founder OS - Personal Goal, Habit & Business Control Center

Dieses Projekt ist eine maßgeschneiderte, hochgradig ästhetische Web- und Mobilanwendung (**Life & Founder OS**) für Robin. Sie dient als zentrales Betriebssystem zur Steuerung von Tageszielen, persönliche Gewohnheiten (Kraftsport, Make Academy, Lesen, Wasser), Gamifizierung mit Belohnungs-Shop & Disziplin-System sowie CRM, Projekten, Dokumenten, KI-Prompts und Automatisierungsworkflows.

Die Anwendung zeichnet sich durch ein futuristisches "Glassmorphic Dark Theme" aus, ist 100 % offline-fähig (localStorage-geschützt) und optimiert für Desktop- und Smartphone-Bedienung. Zudem ist sie als native Android-App mittels Capacitor verpackbar und bietet ein echtes Android-Homescreen-Widget.

---

## 🚀 Wichtigste Funktionen & Tab-Struktur

### 1. Dashboard & Life OS Gamification -- *NEU UPGRADED!*
- **🎮 Life OS Level, XP & Coins System:** Verdiene XP und Life-Coins durch das Abhaken täglicher Habits und Fokus-Ziele. Verfolge deinen Fortschritt mit visueller Level-Bar (Level Up alle 200 XP).
- **🎁 Belohnungs-Shop (Münzen einlösen):** Tausche verdiente Coins gegen selbstdefinierte Belohnungen ein (z. B. 30 Min Zocken, Filmabend, Cheat Meal, Tech-Gadgets) – ohne schlechtes Gewissen!
- **🛡️ Bestrafungs- & Disziplin-Manager:** 3 wählbare Anti-Faulheit-Modi bei verpassten Gewohnheiten:
  - *Modus A (Münz-Abzug / XP-Schulden):* Gesperrter Shop bei negativer Coins-Bilanz.
  - *Modus B (Straf-Aufgaben):* Körperliche / Disziplin-Challenges (30 Liegestütze, Raum aufräumen, Sparschwein).
  - *Modus C (Strike-System):* 3 verpasste Habits = 48h Belohnungs-Sperre.
- **🛌 Smart Routine & Ruhetags-Erkennung:** Automatische Wochentag-Erkennung (z. B. Kraftsport an Mo/Mi/Fr). An regenerativen Tagen zeigt die App explizit einen **grünen Ruhetag-Hinweis** (`🛌 Kraftsport: Ruhetag / Regenerieren! Kein Workout heute nötig`), um schlechtes Gewissen zu vermeiden.
- **⚡ Make Academy & Lern-Tracker:** Täglicher Schnell-Check für Make Academy Einheiten und Weiterbildung.
- **Personalisierbares Layout & Freie Verschiebung:** Blende Widgets (Finanzen, E-Rechnung, Habits, Google Kalender, Quick Capture) ein/aus und **verschiebe sie frei per Positionsmarkierung (`#1`, `#2`...) und `⬆️` / `⬇️` Buttons im Editor**.
- **📌 Multi-Notizen System & Cloud-Sync (Handy ↔ PC):** Erstelle, benenne und verwalte beliebig viele Notizblätter mit individuellen Farben (Gelb, Blau, Grün, Pink, Lila). Alle Notizen (`dashNotesList`) werden automatisch in Supabase Cloud gesichert und zwischen Geräten synchronisiert.
- **Wochen-Review & PDF-Bericht:** Archiv für erledigte Aufgaben mit jsPDF-Berichts-Export.
- **Gamifizierter Habit-Tracker:** Streak-Zähler mit CSS-Konfetti-Animation bei 100 % Abschluss.

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

### 8. KMU Webseiten-Preview (Live Multi-Page & Theme-Switcher) -- *NEU!*
- **Vollständige Multi-Page Navigation:** Inklusive *Startseite*, *Leistungen*, *ROI-Rechner*, *Über uns*, *Kontakt & Erstgespräch*, *Impressum* und *Datenschutz*.
- **🎨 Gründungscoach Präsentations-Modus:** 1-Klick Theme-Switcher in der Header-Leiste zwischen **☀️ Hellem Business-Design** (freundlich & klar für Handwerk/KMU) und **🌙 Dunklem Tech-Design** (modern & innovativ).
- **Entkoppelte Content-Verwaltung:** Texte in [`src/constants/websiteContent.js`](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/constants/websiteContent.js) anpassen, um die gesamte Webseite live zu aktualisieren.

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

## 🧪 Testanleitung (Wie teste ich die App?)

1. **Showcase-Modus:** Aktiviere in der Kopfleiste den Schalter "Showcase". Alle Kunden- und Firmendaten werden anonymisiert, um Robin die Präsentation beim Kunden zu ermöglichen.
2. **Reset-Funktion:** Nutze den roten "Reset"-Button im Header, um den `localStorage` zu löschen und Demodaten frisch einzuspielen.
3. **Tab-Splitting & Master-Logbuch testen:**
   - Klicke oben auf **KI Prompts** ➔ Nutze den RAG Bot, erstelle eigene Prompt-Bausteine oder verwalte Posts im Content-Planer.
   - Klicke oben auf **Dokumente & Sync** ➔ Auf der rechten Seite siehst du permanent dein **masterLogbuch.txt** mit all deinen echten Strategie-Variablen und To-Dos. Nimm hier eine Änderung vor – sie wird sofort im Browser gespeichert.
   - Erstelle links im Wissens-Hub ein neues Dokument. Klicke auf "Google Drive & NotebookLM aktualisieren" und beobachte das Terminal-Log, bis das Dokument von `☁️ Nur Lokal` auf `✅ Synchronisiert` wechselt.
4. **Automatisierte Tests ausführen:**
   - Führe `npm run test` im Terminal aus.
   - Vitest führt alle Integrationstests aus und verifiziert das fehlerfreie Zusammenspiel aller UI-Tabs und Berechnungen.


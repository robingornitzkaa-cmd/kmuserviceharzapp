# Founder OS - KMU Service Harz App

Dieses Projekt ist eine maßgeschneiderte, hochgradig ästhetische Web- und Mobilanwendung (Founder OS) für das Beratungsunternehmen von Robin (KMU Service Harz). Sie dient als zentrales Betriebssystem zur Steuerung von CRM, Projekten, Dokumenten, KI-Prompts und Automatisierungsworkflows.

Die Anwendung zeichnet sich durch ein futuristisches "Glassmorphic Dark Theme" aus, ist 100 % offline-fähig (localStorage-geschützt) und optimiert für Desktop- und Smartphone-Bedienung. Zudem ist sie als native Android-App mittels Capacitor verpackbar und bietet ein echtes Android-Homescreen-Widget.

---

## 🚀 Wichtigste Funktionen & Tab-Struktur

### 1. Dashboard (Zentrale)
- **Personalisierbares Layout:** Blende Widgets (Finanzen, E-Rechnung, Habits, Google Kalender, Quick Capture) ein/aus.
- **Offline-Notizen & Checkliste:** Lokaler Zettelkasten mit Markdown-Formatierungshilfe.
- **Wochen-Review & PDF-Bericht:** Archiv für erledigte Aufgaben mit jsPDF-Berichts-Export.
- **Gamifizierter Habit-Tracker:** Streak-Zähler mit CSS-Konfetti-Animation bei 100 % Abschluss.

### 2. Inbox & Tasks (Posteingang)
- **WhatsApp-Gateway & Webhook-Simulation:** Teste den Empfang strukturierter WhatsApp-Nachrichten samt HTTP-Post-Weiterleitung.
- **Kanban-Board:** Drag-and-Drop Aufgaben-Board für den optimalen Arbeitsfluss.

### 3. CRM & Projekte (Kundenverwaltung)
- **Kunden-Akte (Drawer):** Drawer mit kundenbezogenen Notizen, verlinkten Dokumenten und lückenloser Aktivitätshistorie.
- **Projekt-Tracker & Time-Tracking:** Live-Stoppuhr zur Rentabilitätsberechnung (effektiver Stundensatz) mit Farbindikatoren (Rot/Gelb/Grün).

### 4. KI Prompts (Prompt-Zentrale) -- *NEU!*
- **Prompt Vault & Baukasten:** Speichere Prompts und baue sie mit vordefinierten oder eigenen Bausteinen (Rollen, Ton, Format, Suffix) zusammen.
- **Ollama KI-Optimierer:** Verbessere Prompts live über eine lokale Ollama-Instanz (`localhost:11434`).
- **Content-Planer:** Redaktionsplan für deine Social-Media-Kanäle.
- **RAG Knowledge Bot:** KI-Assistent mit umschaltbaren Personas (🧠 Firmengehirn, 🎯 Pitch-Coach, 🔒 DSGVO & Legal), der dein Google-Drive-Wissen mit präzisen Quellenangaben durchsucht.

### 5. Dokumente & Sync (Dateiverwaltung) -- *NEU!*
- **Wissens-Hub & Dokumenten-Editor (Mini-Word):** Erstelle, bearbeite und lösche Textdokumente direkt in der App. Bietet Dateidownloads als `.txt`.
- **Google Drive & NotebookLM Sync:** Synchronisiere deine lokalen Dokumente mit Google Drive zur Indizierung in Google NotebookLM (inklusive terminalähnlicher Fortschrittsanzeige).
- **Supabase Cloud Sync:** Überwache die Echtzeit-Datenübertragung mit der Cloud (CRM, Tasks, Tickets) inklusive Latenz- und Tabellenzeilen-Anzeige.

### 6. Sales & SOPs (Vertriebstools)
- **Showcase ROI-Rechner:** Berechne Einsparungen live beim Kunden und exportiere diese als professionelles PDF-Angebot.
- **No-Code Automation Canvas:** Visueller Workflow-Builder zur Demonstration automatisierter Prozesse.
- **Zettel-zu-Code Visualisierer:** Interaktiver Vergleich von manuellen Papier-Abläufen vs. modernen IT-Schnittstellen.
- **Kunden-Portal (White-Label):** Umschaltbarer Mandanten-Modus für deine Kunden (Projektstatus, ROI-Ersparnis, Support-Ticket-System).

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


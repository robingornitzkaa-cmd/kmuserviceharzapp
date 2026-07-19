# TODO - Founder OS

## Wichtig
- [ ] **Qualitäts- & Sicherheitsroadmap (Fahrplan aus codebase_review_report.md):**
  - [ ] **Phase 1: Sofortmaßnahmen (Härtung & Secrets):**
    - [ ] Supabase-Secrets aus Quellcode in `.env` auslagern (Task 1.1)
    - [ ] Gemini API-Key-Übertragung auf HTTP-Headers `x-goog-api-key` umstellen (Task 1.2)
    - [ ] Row-Level Security (RLS) in Supabase aktivieren (Task 1.3)
    - [ ] `android:allowBackup="false"` in AndroidManifest festlegen (Task 1.4)
    - [ ] R8 Code-Minification in `build.gradle` aktivieren (Task 1.5)
    - [ ] Statische Daten (`MASTER_LOGBUCH_CONTENT`) aus `App.jsx` in MD-Datei auslagern (Task 1.6)
    - [ ] Eingabe-Validierung für Webhooks im WhatsApp-Simulator hinzufügen (Task 1.7)
    - [ ] npm audit durchführen und Pakete aktualisieren (Task 1.8)
    - [ ] Benutzerauthentifizierung (Login-Schranke) für Vercel-Zugang einrichten (Task 1.9)
  - [ ] **Phase 2: Strukturierung & Performance (Modularisierung):**
    - [ ] `App.jsx` in Unterkomponenten in `src/components/` aufteilen (Task 2.1)
    - [ ] Globales State-Management (z. B. Zustand) zur Vermeidung globaler Re-renders einführen (Task 2.2)
    - [ ] API-Service-Layer einführen (Task 2.3)
    - [ ] Unit-Tests in `App.test.jsx` modularisieren (Task 2.4)
    - [ ] CRM-Rendering-Performance optimieren (Task 2.5)
    - [ ] React Error Boundaries zur Absturzsicherung implementieren (Task 2.6)
    - [ ] Ollama API-Verbindung Mixed-Content-sicher machen (Task 2.7)
  - [ ] **Phase 3: Langzeithärtung (MFA, Verschlüsselung, Monitoring):**
    - [ ] Erweiterte Multi-Faktor-Authentifizierung (MFA) für Administrator-Schnittstellen (Task 3.1)
    - [ ] Verschlüsselte lokale Speicherlösung (Secure Storage / In-Memory PBKDF2) einrichten (Task 3.2)
    - [ ] Biometrischen App-Lock für Android hinzufügen (Task 3.3)
    - [ ] Content Security Policy (CSP) in `index.html` einbetten (Task 3.4)
    - [ ] API Gateway Proxy für API-Schlüssel etablieren (Task 3.6)
- [x] **Gemini API & Prompts Supabase Sync (Phase v17):** Integration von Google Gemini Cloud API Modellen (`gemini-3.1-flash-lite`, `gemini-3-flash`, etc.) mit Ratenbegrenzungs-Fallback-Kette. RAG Knowledge Bot ("Frag das Firmengehirn") mit echten Dokumenten (inkl. `masterLogbuch.txt`) als Gemini-Systemkontext verknüpft. Neue DB-Tabelle `prompts` auf Supabase angelegt und voll synchronisiert für PC- & Smartphone-Nutzung (bi-direktionaler Sync). Sichere UI-Key-Konfiguration über `localStorage`.
- [x] **Offline-Resilienz & Local-First (Phase v16):** Kontinuierliche Nutzbarkeit aller App-Funktionen ohne Internetverbindung. Fallback auf lokalen Speicher (localStorage), Deaktivierung von blockierenden fetch-Aufrufen bei Verbindungsverlust, dynamische Online-/Offline-Statustoken in UIs, Zusammenführung von Kaltakquise-Leads und CRM-Kunden im Onboarding und Hinzufügung eines statischen `INITIAL_LEADS`-Fallbacks für den Offline-Erststart.
- [x] **Kunden-Onboarding-Playbook Modul & Erweiterungen (Phase v15):** Volle Integration der Playbook-Fragen, Wizard-Oberfläche, Supabase-Sync über CRM-Notes-Kommentare, Docs-Export sowie Live-Potenzialrechner (Umsatz- & Stundenersparnis), Priorisierungs-Pills (Low/Medium/High), Sprache-zu-Text (Web Speech API) und automatischer PDF-Angebot-Generator.
- [x] **Glassmorphic Sidebar Navigation (Phase v15):** Umstellung der App-Navigation auf einklappbare Desktop-Seitenleiste und mobilen Drawer.
- [x] **Master-Logbuch:** Echtes Logbuch aus `📑 MASTER-LOGBUCH & COMMAND CENTER: KMU SERVICE HARZ` importiert und permanent in der "Dokumente & Sync"-Ansicht integriert.
- [x] **Phase v10 - Schritt 1:** Splitting von Tab 4 ("KI & Docs") in zwei eigenständige Menüpunkte ("KI Prompts" und "Dokumente & Sync") in Desktop- und Mobilansicht.
- [x] **Test-Ausbau:** Integrationstests auf 5 Testfälle ausgebaut (inkl. Logbuch, Showcase-Modus und Kanban-Board) und alle erfolgreich ausgeführt.
- [x] **Supabase Live-Anbindung:** Datenbanktabellen über die MCP-Integration angelegt, RLS deaktiviert und Standard-Verbindungsparameter in App.jsx hinterlegt.
- [x] **Lead- & Pain-Point-Tracker (Phase v13):** Kaltakquise-Excel-Leads in Supabase-Tabelle `leads` importiert, UI-Tracker-Tab mit Klick-to-Call und Feedback-Formular implementiert.
- [x] **Modulare & Einfache Dashboard-Bausteine & Mobile-Optimierung (Phase v14):** 5 neue einfache Widgets im Anpassungs-Menü integriert und die gesamte App mobil responsive optimiert (inkl. Zoom-Prävention, Spalten-Stapelmodus und CRM-Zurück-Button).
- [x] **Schritt 1:** Implementierung von **Feature 1a (Showcase-Modus / Datenschutz-Filter)** ➔ Erledigt.
- [x] **Schritt 2:** Implementierung von **Feature 1b (ROI-Rechner v2 mit PDF-Export)** ➔ Erledigt.
- [x] **Schritt 3:** Implementierung von **Feature 1c (Zettel-zu-Code Visualisierer)** ➔ Erledigt.
- [x] **Schritt 4:** Implementierung von **Feature 2a (WhatsApp-Gateway & Webhook-Simulation)** ➔ Erledigt.
- [x] **Schritt 5:** Implementierung von **Feature 2b (NotebookLM Live-Sync Status)** ➔ Erledigt.
- [x] **Schritt 6:** Implementierung von **Feature 3a (Time-Tracker für Projekte & Marge)** ➔ Erledigt.
- [x] **Schritt 7:** Implementierung von **Feature 3b (Gamifizierter Habit-Tracker & CSS-Konfetti)** ➔ Erledigt.
- [x] **Schritt 1:** Feature A1 (CRM-Detailansicht / Kunden-Akte) ➔ Erledigt.
    - [x] Detail-Drawer/Seitenleiste für Kontakte entwerfen
    - [x] Eingabefelder für kundenbezogene Notizen und Dokumenten-Links integrieren
    - [x] Kontakthistorie (Aktivitäts-Log) aufzeichnen
- [x] **Schritt 2:** Feature A2 (Einnahmen-Widget & Umsatz-Vorschau) ➔ Erledigt.
- [x] **Schritt 3:** Feature A3 (Wochen-Review & Archiv) ➔ Erledigt.
- [x] **Schritt 4:** Feature B1 (Interaktiver Make.com Simulator) ➔ Erledigt.
- [x] **Phase v4 - Schritt 1:** Feature 1 (Visueller No-Code Automation Canvas) ➔ Erledigt.
- [x] **Phase v4 - Schritt 2:** Feature 2 (Kunden-Portal & White-Label Client Center) ➔ Erledigt.
- [x] **Phase v4 - Schritt 3:** Feature 3 (KI-Telefonagent / Voice-AI Simulator) ➔ Erledigt.
- [x] **Phase v4 - Schritt 4:** Feature 4 ("Frag das Firmengehirn" – RAG Knowledge Bot) ➔ Erledigt.
- [x] **Phase v4 - Schritt 5:** Feature 5 (E-Rechnungs & Angebotssystem - ZUGFeRD/XRechnung) ➔ Erledigt.
- [x] **Phase v4 - Schritt 6:** Feature 6 (Supabase Backend-Integration & Cloud Sync) ➔ Erledigt.

- [x] **Phase v5 - Schritt 1:** Feature 1 (Prompt-Baukasten & Ollama KI-Optimierer) ➔ Erledigt.
- [x] **Phase v5 - Schritt 2:** Feature 2 (Personalisierbares Dashboard) ➔ Erledigt.
- [x] **Phase v5 - Schritt 3:** Feature 3 (NLP-Kalender & KI-Tagesplaner) ➔ Erledigt.
- [x] **Phase v5 - Schritt 4:** Feature 4 (Sprach-zu-Text via Web Speech API) ➔ Erledigt.
- [x] **Phase v5 - Schritt 5:** Feature 5 (Android WebView Wrapper & Push-Konzept) ➔ Erledigt.

- [x] **Phase v6 - Schritt 1:** Eigene Prompt-Bausteine verwalten ➔ Erledigt.
- [x] **Phase v6 - Schritt 2:** 100 % lokales Offline Notizen & Todos Widget ➔ Erledigt.
- [x] **Phase v6 - Schritt 3:** Google Kalender/Drive OAuth & Live-Sync Konzept ➔ Erledigt.

- [x] **Phase v7 - Schritt 1:** Integrierter Dokumenten-Editor (Mini-Word) ➔ Erledigt.
- [x] **Phase v7 - Schritt 2:** Manueller Google Drive Sync für geänderte Dateien ➔ Erledigt.

- [x] **Phase v8 - Schritt 1:** Live-Suche & Filter für Prompts ➔ Erledigt.
- [x] **Phase v8 - Schritt 2:** "Werksreset / Demodaten zurücksetzen" im Header ➔ Erledigt.
- [x] **Phase v8 - Schritt 3:** CRM-Schnellfilter nach Status-Pills ➔ Erledigt.
- [x] **Phase v8 - Schritt 4:** Markdown-Formatierungshilfe für Offline-Notizen ➔ Erledigt.

- [x] **Phase v9 - Schritt 1:** Native Android-Plattform via Capacitor initialisiert ➔ Erledigt.
- [x] **Phase v9 - Schritt 2:** WidgetBridge Custom Capacitor Plugin & Activity Registrierung ➔ Erledigt.
- [x] **Phase v9 - Schritt 3:** Natives Android-Homescreen-Widget (Java & Layout XML) implementiert ➔ Erledigt.

## Später
- [ ] Google Drive Live-Sync: Mock-Dateien-Liste durch echte Datei-Uploads ersetzen.
- [ ] Google Kalender Live-Sync: Statt Mock-Events echte Tagestermine laden.

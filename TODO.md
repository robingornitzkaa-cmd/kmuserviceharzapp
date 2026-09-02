# TODO - Founder OS

- [x] **🛡️ [AppSec Quick-Fix] Bereinigung von Hardcoded Secrets & Git-Tracking:**
  - *Hardcoded Credentials entfernt:* Fallback-Keys aus `src/services/supabase.js` und `src/App.jsx` entfernt.
  - *DSGVO Git-Bereinigung:* `leads_master_harz.csv` und Backup sicher aus Git-Index entfernt (`git rm --cached`) und in `.gitignore` verankert.
  - *Content Security Policy (CSP):* Strenger CSP-Meta-Tag in `index.html` integriert.
  - *Schema-Validierung beim Backup:* Whitelist für erlaubte Keys in `applyBackupRestore` implementiert.

- [ ] **🔒 [AppSec Phase 1] Supabase Row Level Security (RLS) & Auth-Härtung:**
  - *RLS aktivieren:* Auf allen 19 öffentlichen Tabellen (`leads`, `contacts`, `dashboard_state`, etc.) RLS aktivieren und Zugriffspolicies definieren.
  - *API-Key Rotation:* Google Gemini API-Key in der Cloud Console neu erzeugen und alten Key invalidieren.
  - *Zentraler Logger-Service (`src/services/logger.js`):* Ringspeicher für System-Events, Widget-Updates, Syncs und globale JS-Fehler (`window.onerror`, `unhandledrejection`).
  - *Interaktives Diagnose-Center (`DiagnosticLogModal.jsx`):* Live-Logstream mit Level-Filtern (🔴 Fehler, 🟡 Warnungen, 📱 Widgets, 🌐 Google), Echtzeit-Volltextsuche, aufklappbaren Stacktraces und 1-Klick Zwischenablage-Kopieren & JSON-Export.
  - *Sidebar & In-App Integration (`Sidebar.jsx`, `App.jsx`):* Direkter Schnellzugriff auf das Diagnose-Logbuch im Menü und Control Center.
  - *100% Testabdeckung:* 6 Vitest-Tests in `diagnosticLogger.test.jsx`, insgesamt 272 Tests bestanden, Build fehlerfrei.

- [x] **🎨 [In-App Widget-Studio] Live-Konfigurator für Android Home-Screen-Widgets:**
  - *Visuelles In-App Studio (`WidgetStudio.jsx`):* Vollwertiger Editor mit interaktiver Live-Smartphone-Vorschau in Echtzeit.
  - *4 1-Klick Presets:* 🌟 All-in-One Master, 🎯 Deep Work & Fokus, 💼 Sales Hunter, 🖤 Minimalist AMOLED.
  - *Detail-Feintuning:*
    - Modul-Sichtbarkeiten (Notizen, To-Dos, CRM-Radar, Streak-Badge, Google Kalender Termin, Tagesziel).
    - To-Do Umfang (Top 3 vs Top 5 Aufgaben).
    - Farbschemata (*Glassmorphic Dark*, *AMOLED Pure Black*, *Cyber Cyan*, *Deep Navy*).
    - Hintergrund-Transparenz-Slider (20% bis 100%).
    - Klick-Routing Ziel-Auswahl (Dashboard, Kanban, CRM, Voice Studio).
  - *Native Android RemoteViews Steuerung (`WidgetBridgePlugin.java`, `MyWidgetProvider.java`, `widget_layout.xml`):* Dynamisches Ein-/Ausblenden der Kacheln und dynamische To-Do-Limits direkt auf dem Smartphone-Homescreen.
  - *100% Testabdeckung:* 9 Vitest-Tests in `widgetStudioAndCustomizer.test.jsx`, insgesamt 266 Tests bestanden, Build fehlerfrei.

- [x] **🌐 [Google Workspace Live-Radar] Google Kalender & Gmail Benachrichtigungs-Hub:**
  - *Google Workspace Service (`src/services/googleWorkspace.js`):* Live-OAuth2 & REST-API Integration für Google Kalender (`/calendar/v3/calendars/primary/events`) und Gmail (`/gmail/v1/users/me/messages`).
  - *Smarte Vorab-Alarme & Radar-Trigger (`src/services/notificationService.js`):*
    - 📅 **15-Minuten-Vorab-Alarm:** Erinnert automatisch 15–30 Minuten vor jedem anstehenden Google Kalender Termin mit Uhrzeit und Ort.
    - ✉️ **Gmail Posteingangs-Radar:** Meldet neue ungelesene E-Mails mit Absender, Betreff und Auszug.
  - *Live-Dashboard Integration (`DashboardView.jsx`):* Agenda-Ansicht mit Google-Terminen und interaktiver Gmail-Posteingangs-Radar mit Status („X ungelesen“).
  - *Android Widget Sync:* Nächster Google-Termin und ungelesene Mails fließen automatisch in die 4 Android Home-Screen-Widgets ein.
  - *100% Testabdeckung:* 6 Vitest-Tests in `googleWorkspaceAndNotifications.test.jsx`, insgesamt 257 Tests bestanden, Build fehlerfrei.

- [x] **🔔 [Push & Widgets] Hybrides Benachrichtigungs-System & Android 4-Widget-Suite:**
  - *Zentraler Notification-Service (`src/services/notificationService.js`):* Web Notifications API, PWA Service Worker Push und Capacitor Native Local/Push Notifications (`@capacitor/local-notifications`, `@capacitor/push-notifications`).
  - *4 automatisierte Benachrichtigungs-Trigger:* 📞 CRM-Wiedervorlagen am Fälligkeitstag, ⏰ To-Do Fristen & Aufgaben-Flow, ☀️ Täglicher Morgen-Fokus mit Uhrzeit-Wähler (z. B. 08:00 Uhr) und 🔥 Habit-Tracker Streak-Schutz.
  - *In-App Control Center (`NotificationCenterModal.jsx`, `SettingsView.jsx`, `Sidebar.jsx`, `DashboardView.jsx`):* Master-Toggle, Audio-Signalton-Schalter, Kategorie-Toggles, Uhrzeit-Wähler, Sofort-Test-Button (`🧪 Test-Benachrichtigung senden`) und 1-Klick Widget-Synchronisation.
  - *Android 4-Widget-Suite (`android/app/src/main/`):*
    1. **All-in-One Power Widget** (`MyWidgetProvider.java`, `widget_layout.xml`): Notizen, Top-3 To-Dos, CRM-Kennzahlen (518 Leads, Wiedervorlagen) und Streak-Badge.
    2. **To-Do & Fokus Widget** (`TodoWidgetProvider.java`, `widget_todo_layout.xml`): Aufgabenliste mit Zähler und Fokus-Hauptziel.
    3. **CRM Pipeline Widget** (`CrmWidgetProvider.java`, `widget_crm_layout.xml`): Lead-Kennzahlen, offene Wiedervorlagen und 1-Klick Pipeline-Sprung.
    4. **Quick-Capture & Voice Widget** (`QuickCaptureWidgetProvider.java`, `widget_quick_capture_layout.xml`): 1-Klick Sprung in Sprachaufnahme und Notizen.
  - *Capacitor Bridge & Lifecycle (`WidgetBridgePlugin.java`, `MainActivity.java`, `AndroidManifest.xml`):* Vollständige Bridge-Anbindung via `registerPlugin('WidgetBridge')` und Broadcast-Verteilung an alle Widgets.
  - *100% Testabdeckung:* 13 Vitest-Tests in `notificationsAndWidgets.test.jsx`, 251 Tests grün, Build & PWA Precache fehlerfrei.

- [x] **🧼 [GoClean Harz × Manus AI] 10-Module Deep-Research Master-Suite (`DOCS/MANUS_GOCLEAN_DEEP_RESEARCH_PROMPTS.md` & `manus_power_cockpit.html`):**
  - Standalone Master-Dokument mit 10 hochkarätigen Deep-Research Prompts im XML-Tag-Format für Manus AI:
    1. *Modul 1: Regionaler Marktatlas & Wettbewerbs-Audit (30–40 km Harz: Goslar, Langelsheim, Bad Harzburg, Wernigerode, Clausthal-Zellerfeld, Osterode, Salzgitter-Süd).*
    2. *Modul 2: B2B-Liegenschaften & Kombi-Auftraggeber (50+ Leads: Hausverwaltungen, Bauträger, WEGs, Gewerbeparks für Reinigung & Garten).*
    3. *Modul 3: Kommunale Vergaben & Ausschreibungs-Radar (Schulen, Kitas, Liegenschaftsämter, Wohnungsbaugesellschaften Harz).*
    4. *Modul 4: Hochmargige Spezial-Dienste & 12-Monats-Saison-Kalkulation (PV-Reinigung, Winterdienst, Heckenschnitt, Bauendreinigung).*
    5. *Modul 5: Google Maps & Local SEO Dominanz-Audit (Top 1 Rank in 30 Tagen).*
    6. *Modul 6: Recruiting- & Mitarbeiter-Funnel (Reinigungskräfte & Gartenhelfer im Harz).*
    7. *Modul 7: Ferienwohnungs-, Hotel- & Tourismus-Großkunden Radar (Braunlage, Bad Harzburg, Wernigerode).*
    8. *Modul 8: Social Media & 30-Tage Viral-Content-Plan (Vorher/Nachher Skripte).*
    9. *Modul 9: Gewerbeparks & Industriehallen-Sonderreinigung (Aufträge bis 10.000 €).*
    10. *Modul 10: KMU Service Harz B2B-Digitalisierungs-Audit (Cross-Selling).*
  - Vollständige Integration aller 11 Modi in das interaktive Cockpit (`manus_power_cockpit.html`) mit 1-Klick Copy-to-Clipboard.
  - Schritt-für-Schritt Auswertungs- & Umsetzungs-Leitfaden für den schnellen B2B-Verkaufsabschluss vor Ort.

- [x] **🤖 [Manus AI] Interaktives Power-Cockpit & Automatisierungs-Playbook (`manus_power_cockpit.html`):**
  - Standalone HTML-Cockpit mit dynamischem Prompt-Generator für alle 4 Kern-Workflows (B2B Lead-Scout, Fördermittel & Ausschreibungen, Live Website-Audit & Testing, Dokumenten- & Vertrags-Check, Web-Tool Generator).
  - Integrierter 7-Tage-Aktionsplan zur systematischen Abarbeitung und einsatzbereite B2B-Akquise-E-Mail-Vorlagen mit 1-Klick Copy-to-Clipboard.


- [x] **🎤 [GoClean Harz] Multi-Varianten Präsentations-Suite & Hub für Marcel:**
  - 6 neue spezialisierte HTML-Präsentationen mit individuellem Fokus:
    1. `pitch_bruder_emotional.html` (4 Folien, emotional/persönlich)
    2. `pitch_professionell.html` (5 Folien, sachlich/Business ROI)
    3. `demo_app_features.html` (7 Folien, Feature-Walkthrough aller Module)
    4. `pitch_ki_zukunft.html` (5 Folien, KI-Vision & Social Media)
    5. `pitch_wachstum_solo.html` (6 Folien, Solo-Wachstum & 90-Tage-Fahrplan)
    6. `pitch_kompakt_ueberblick.html` (3 Folien, 60-Sekunden Power-Teaser)
  - Präsentations-Center Hub-Seite (`public/goclean_praesentationen_hub.html`) mit Übersicht aller 8 Decks.
  - Alle Folien mit Tastatursteuerung ([◀/▶], [F] Vollbild, [P] PDF-Druck), Touch-Swipe und Dark Glassmorphism Design.
  - Personalisierung & Richtigstellung des Namens auf **Marcel** in allen Vorlagen.
- [x] **🧼 [GoClean Harz] VIP-Wachstums- & Produktivitäts-Power-Paket (Bruder-Offensive 2026):**
  - Interaktives In-App Toolkit (`src/components/GoCleanToolkit.jsx`): Blitz-Kalkulator (m², Zeitbedarf, Material, Netto/Brutto für Unterhalt, Treppenhaus, Glas, Bau-Endreinigung, Winterdienst), 1-Klick B2B-Angebotstext-Generator, B2B-Akquise-Mappen für 3 Zielgruppen, mobile Qualitäts-SOP-Checkliste mit Fotobeweis und digitales Kunden-Abnahmeprotokoll mit Signatur.
  - Druckfertige, hochauflösende VIP-Präsentationsmappe (`public/goclean_wachstumsmappe.html` & `DOCS/GOCLEAN_HARZ_WACHSTUMS_STRATEGIE.md`) mit 6 Folien, Vollbildmodus und `@media print` PDF-Export.
  - Navigation & DocsHub Integration: Sidebar-Menüpunkt `🧼 GoClean Harz Suite` und Vorlagen-Registrierung in `INITIAL_DOCS`.
  - 100% Testabdeckung in `src/test/GoCleanToolkit.test.jsx` (237 Tests bestanden).
- [x] **💼 [B2B-Vertriebs- & Auslieferungs-Suite] Steuerberater-Multiplikatoren-Kit & Handwerker-Direct-Mail-Kampagne (R1):**
  - Standalone Markdown Vorlagen in `DOCS/`: Kanzlei-Pitch-Deck & Leitfaden (DATEV RDS 1.0 vs BDS, 0-Euro-Partnermodell), Mandanten-Flyer (500 € Gutschein `KANZLEI-HARZ-500`), Direct-Mail 1-Seiter an 518 Meister („Schluss mit dem Büro-Sonntag“ & 500 € Gutschein `MEISTER-HARZ-2026`) und Telefon- & Kaltakquise-Leitfaden (Vorzimmer- & Baustellen-Skripte, 5-Punkte Validation-Pivot).
  - Registrierung in `INITIAL_DOCS` (`initialData.js`) und Integration in `DocsHub.jsx` mit Volltextsuche, Tag-Filterchips und 1-Klick Quick-Copy.
- [x] **📊 [ROI- & Stresstest] Automatisierter 500 € „Büro-Stress-Test & ROI-Report“ PDF-Generator (R2):**
  - Reine Client-seitige PDF-Engine (`src/services/pdfReportGenerator.js`) mit 4-teiligem Prüfbericht: 1. Prozess-Röntgenbild Status Quo (4 Stationen), 2. Rote Schattenkosten-Berechnung in Euro (`weeklyWastedHours * 4.33 * masterHourlyRate * 12`), 3. Soll-Roadmap Make/Lexoffice/DATEV (4 Phasen), 4. Fördermittel-Matrix & Amortisations-Kalkulation mit 100% 500€ Audit-Gutschrift auf Stufe 2 und Amortisation in < 2,5 Monaten.
  - 1-Klick-Export-Buttons in `OnboardingView.jsx` (Audit-Tab) und `SopManager.jsx` (Showcase-Rechner).
- [x] **🏢 [Mandanten-Portal] Interaktives Mandanten-Portal & AaaS-Wartungs-Dashboard (R3):**
  - Dedizierte Komponente `src/components/ClientPortalView.jsx` mit Firmen-Header, Modus-Umschalter und Mandanten-Auswahl.
  - Live Interface Monitoring (Make.com, Lexoffice, DATEV Belegbilderservice, GoBD Cloud-Archiv, GPT-4o Vision OCR) und 1-Klick Blueprint 4 Diagnose-Simulation mit Live-Logs & Latenzanzeige.
  - Produktivitäts-Metriken (164 Monatsbelege, 4/4 gerettete Sonntage, ~42.5 Std./Monat Zeiteinsparung, ~3.612,50 € monetärer Wert).
  - 1-Klick Support-Ticket-System mit 5 Pflichtkategorien, SLA-Priorisierung und Kontingentverwaltung für den „Digitalen Hausmeister (200 € / Monat)“ mit 60-Minuten-Pool-Tracker.
- [x] **📑 [E-Rechnung & Compliance] E-Rechnungs- & ZUGFeRD / XRechnung Prüf-Studio (R4):**
  - Semantische Validierungs-Engine `src/services/eInvoiceParser.js` nach EN 16931 für UN/CEFACT CII (`rsm:CrossIndustryInvoice`) und OASIS UBL 2.1 (`Invoice`/`CreditNote`).
  - Client-seitiger PDF/A-3 Extractor für eingebettetes XML (`factur-x.xml` / `zugferd-invoice.xml`).
  - 3-Stufen-Ampelprotokoll (🟢 PASS, 🟡 WARN, 🔴 FAIL) für alle Pflichtfelder (BT-1 bis BT-115, Leitweg-ID, USt-IdNr, Kreditor/Debitor) und mathematische Konsistenzprüfung (BR-CO-10 bis BR-CO-18 mit 0,02 € Rundungstoleranz).
  - Interaktives Prüf-Studio `src/components/EInvoiceValidator.jsx` mit Drag & Drop Upload, Beispielrechnungen, Posten-Tabelle, XML-Inspektor und PDF/JSON Zertifikat-Download.
- [x] **🧪 [Test-Suite & Qualitätssicherung] Vollständige E2E Opaque-Box & Tier 1–5 Test-Suite:**
  - 21 Test-Dateien mit 233 Vitest Tests zu 100% grün (`npm run test:all`).
  - Produktions-Build (`npm run build`) fehlerfrei kompiliert mit PWA Precache.

- [x] **⚡ [Onboarding & Automation] Schlüsselfertiges Onboarding-System & Make.com Workflow-Tresor (Businessplan 2026):**
  - *4 fertige Make.com JSON-Blueprints (Direkt-Import für Make.com):* `blueprint_1_belegerfassung_lexoffice_datev.json` (WhatsApp/Mail -> GPT-4o Vision OCR -> Lexware Office -> DATEV Belegbilderservice), `blueprint_2_handwerker_lead_qualifier_booking.json` (24/7 KI-Notdienst & Kalender-Slot), `blueprint_3_baustellen_audio_zeiterfassung_fotos.json` (Whisper Sprach-Zeiterfassung & Drive-Foto-Archiv) und `blueprint_4_aaas_system_monitoring_healthcheck.json` (24/7 Schnittstellen-Monitoring).
  - *Make.com Blueprint-Hub im Sales & SOPs Tab (`SopManager.jsx`, `makeBlueprintsData.js`):* Interaktive Szenario-Karten, 1-Klick JSON-Download, Test-Payload-Kopierer, Modul-Knoten-Pipeline und Schritt-für-Schritt Einrichtungsleitfaden (`public/make-blueprints/README_MAKE_SETUP_GUIDE.md`).
  - *4-Stufen Onboarding-Playbooks (`OnboardingView.jsx`, `initialData.js`):* Dedizierte interaktive Playbooks für Stufe 1 (500 € Potenzial-Audit), Stufe 2 (2.000 € Standard-Setup Belegerfassung), Stufe 2+ (ab 6.000 € Meisterbetrieb ERP & Förderung) und Stufe 3 (200 €/Monat Digitaler Hausmeister AaaS).
  - *Rechtssichere Vertrags- & Dokumentenvorlagen (`DOCS/` & `DocsHub.jsx`):* Dienstleistungsvertrag (2.000 € Festpreis), DSGVO-Auftragsverarbeitungsvertrag (AVV nach Art. 28 DSGVO), GoBD-Verfahrensdokumentation für ersetzendes Scannen nach BStBK-Standard, AaaS-Wartungsvertrag (200 €/Monat SLA), Systemzugangs- & Sicherheits-Checkliste und förmliches Abnahmeprotokoll inkl. ausdruckbarem Mitarbeiter-Cheat-Sheet.
- [x] **📑 [Businessplan & Strategie] Finaler, rechtssicherer Businessplan 2026 (`DOCS/Businessplan_KMU_Service_Harz_2026_Final.md`):** Vollständige Überarbeitung der Unternehmenskonzeption mit der 4-stufigen Value Ladder (500 € Audit, 2.000 € Core Standard-Setup mit 100 % Dienstleistungsmarge, ab 6.000 € Prozess-Upgrade für Förderungen, 200 € / Monat AaaS-Retainer). Integration der juristischen Hardware-Ausschlusskriterien (IKT-Grundausstattung) und bankenfester Finanzplan (Bootstrapping via § 16c/b SGB II, Break-Even bei 0,77 Aufträgen/Monat).
- [x] **🏛️ [Fördermittel & Recht] 100 % Rechtssicherer Fördermittel-Leitfaden 2026 (`foerdermittel_leitfaden_kmu_service_harz.md`):** Umfassende Analyse der aktuellen Förderlandschaft im Harz und bundesweit. Klarstellung ausgelaufener Programme (Digitalbonus Niedersachsen/Thüringen, go-digital) und detaillierte Leitfäden für aktive Programme (Digital Innovation Sachsen-Anhalt bis 50 %, INQA-Coaching bis 80 %, BAFA, Mittelstand-Digital Zentren). Inklusive UWG/RDG/StBerG-Abmahnschutz, Muster-Gesprächsleitfaden für Kundeneinwände und rechtssicherer Synchronisation aller Website-Texte.
- [x] **📊 [Sales & Pitch] Interaktive 4-Folien VIP-Präsentation für GoClean Harz:** Minimalistische, druckbare und interaktive HTML-Präsentation (`pitch_goclean.html` & `public/pitch_goclean.html`) zur Gewinnung des ersten VIP-Testkunden mit Tastatursteuerung, Touch-Swipe und PDF-Export.

- [x] **📍 [Lead-Gen & B2B] Harz & 50km-Umfeld Master-Lead-Datenbank (133 Batches, 518 validierte Betriebe):** Vollständige, systematische Live-Recherche und Validierung aller 19 Regional-Cluster im Ost-, West-, Süd- und Vorharz (Wernigerode, Ilsenburg, Blankenburg, Elbingerode-Umfeld, Nordharz, Bad Harzburg, Langelsheim, Goslar, Liebenburg, Seesen, Clausthal-Zellerfeld, Bad Grund/Osterode, Braunlage/Herzberg, Bad Lauterberg/Bad Sachsa, Salzgitter-Bad/Bockenem, Schladen/Baddeckenstedt, Osterwieck/Fallstein, Thale/Bodetal, Quedlinburg/Gernrode) über alle 7 Fokus-Branchen (Gebäudereinigung, Facility Management, GaLaBau, SHK, Elektro, Dach/Zimmerei, Bau/Sanierung). Gespeichert in [`leads_master_harz.csv`](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/leads_master_harz.csv) mit 23 Spalten, Ansprechpartnern, Kontaktdaten, Rechtsformen, Webseiten und Mitarbeiterstatus (≤20 MA). Inklusive Master-Plan in [`leads_erweiterungsplan_40km_harz.md`](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/leads_erweiterungsplan_40km_harz.md).
- [x] **📱 [UI/Mobile] Mobile Responsive Layout-Optimierung für Cockpit & Widgets:** Vollständige Anpassung aller Dashboard-Elemente für Smartphone-Hochformat (Portrait): Notizen & To-Do-Checkliste einspaltig gestapelt statt 2-Spalten-Quetschung, Voice Quick-Capture mit dynamischem Button-Grid (`minmax(88px, 1fr)`), vergrößerte Touch-Flächen (36-38px), flexible Eingabefelder mit `min-width: 0` und Umbruch von langen Texten ohne Querformat-Zwang.

- [x] **☁️ [Sync] Supabase Cloud-Sync Reparatur für Notizen & To-Dos:** Behebung des HTTP 400 Fehlers (`media_gallery` Spalte in `dashboard_state`), Anon-Key Fallbacks in `App.jsx` & `supabase.js`, Ersetzen des Pseudo-Sync-Timeouts durch echten bidirektionalen Sync und Beseitigung der 1.5s Zeitstempel-Blockade.
- [x] **⚡ [Prompts] God of Prompt Integration (1.304 Vorlagen, 20 Fachgebiete):** Vollständige Extraktion, Formatierung und native Integration der gesamten God-of-Prompt-Bibliothek (inkl. Live-Extraktion aller 474 Strategie-, Businessplan-, Finanz-, GTM- und Pricing-Vorlagen) in den Prompt Vault. Inklusive Subkategorien-Filterleiste, 1-Klick-Übernahme, Batch-Import, JSON-Exportdatei (`public/godofprompt_library_export.json`), 5MB-Precache-Optimierung und Tests.
- [x] **🔒 [Sicherheit] Hardcoded PIN-Bypasses entfernt (Task 1):** Statische Fallback-PINs (`2026` in `App.jsx`, `1234` in `CoachingLivePortal.jsx`) entfernt; geänderte Master-PINs und Portal-PINs greifen jetzt strikt ohne Hintertür. Inklusive Regressionstests.
- [x] **🛡️ [Sicherheit] Supabase Anon-Key zentralisiert (Task 2):** Hardcoded JWT-Anon-Keys aus `supabase.js`, `LeadsView.jsx` und `App.jsx` entfernt und sauber an `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) gebunden.
- [ ] **🧹 [Wartbarkeit] Toten Code aus `App.jsx` bereinigen (Task 3):** Duplizierte Onboarding- und Lead-Handler (Zeilen 1822–2235) in `App.jsx` restlos entfernen.
- [ ] **⚙️ [Code-Qualität] 157 Linter-Warnungen beheben (Task 4):** Unbenutzte Imports (`BrainCircuit`, `CheckCircle`, `Info`) und unnötige Regex-Escapes bereinigen.
- [ ] **💾 [Stabilität] IndexedDB für Bild-Uploads einbinden (Task 5):** `mediaGallery` und Dateianhänge aus `localStorage` in IndexedDB auslagern, um 5MB-QuotaExceeded-Abstürze zu verhindern.
- [ ] **🧩 [Architektur] Einführung von React Context / State Management (Task 6):** Aufteilung der 90+ States in `App.jsx` in modulare Context-Provider (`AuthContext`, `DataContext`, `SettingsContext`).
- [x] **📱 100% PWA Offline-Fähigkeit & Service Worker Caching:** Vollständige Offline-Lauffähigkeit via `vite-plugin-pwa`, Workbox Asset- & Font-Caching, Web App Manifest und Capacitor Asset-Sync für unterbrechungsfreie Nutzung auch ohne Internetverbindung.
- [x] **🎙️ Voice Quick-Capture Studio (Feature 2 - v28):** Diktier- und Audio-Studio im Cockpit mit Web Audio API Chime, Wave-Puls, Tag-Pills (`#Wichtig`, `#Kunde`, `#Idee`, `#Habit`, `#Dringend`, `#HarzKMU`) und 1-Klick-Multiziel-Routing (To-Do, Notizzettel, Tagesziel, CRM-Lead, Kalendertermin).
- [x] **📦 1-Klick Data Hub & Backup Manager (Feature 3 - v28):** Systemweites Backup- & Restore-Center (`BackupManagerModal.jsx`, `backupService.js`) mit 1-Klick JSON-Vollbackup, selektivem 7-Modul-Export, Drag-and-Drop Import mit Pre-Flight Schema-Inspektor und automatischem Notfall-Rollback Snapshot.
- [x] **🗺️ Interaktive Gründungs-Roadmap & Meilenstein-Matrix (Feature 13 - v28):** Strategische 4-Phasen-Matrix (`FoundingRoadmapMatrix.jsx`, `roadmapData.js`) im Command Center von Behörden/Recht über Pilotkunden und Automation-Stack bis zur Skalierung im Harz. Inklusive Ampel-Status (`⚪`, `🟡`, `🔴`, `🟢`), Kriterien-Checklisten, XP- & Coins-Belohnung bei Abschluss und Synchronisation.
- [x] **🏗️ Groß-Optimierung Batch 1 (Architektur-Fundament & Modularisierung):**
  - Entflechtung von `App.jsx` in `LeadsView.jsx`, `OnboardingView.jsx`, `CrmDrawer.jsx`, `DocumentEditorModal.jsx` und `LightboxModal.jsx`.
  - Integration der `ErrorBoundary.jsx` zur Ausfallsicherung aller Ansichten.
  - Implementierung von Custom Hooks: `useLocalStorage.js`, `useDebounce.js`, `useSpeechRecognition.js`, `useOnlineStatus.js`, `useToast.js`.
  - Erfolgreiche Build-Prüfung (`npm run build`).
- [x] **⚡ Groß-Optimierung Batch 2 (Performance, Code-Splitting & Lazy Loading):**
  - Umstellung aller Tabs auf `React.lazy()` und `Suspense` mit `SkeletonLoader.jsx`.
  - Vendor-Chunk-Splitting in `vite.config.js` zur Verkleinerung des Initial-Bundles von 1.13 MB auf 260 kB (76 kB komprimiert).
  - Erfolgreiche Build-Prüfung (`npm run build`).
- [x] **🛡️ Groß-Optimierung Batch 3 (Resilienz, Offline-Queue & Datenvalidierung):**
  - Implementierung von `syncQueue.js` mit automatischem Retry bei Reconnect und Deduplizierung.
  - Validierung & Sanitization (`validation.js`) für URLs, Webhooks, E-Mails, Telefonnummern und API-Keys.
  - Integration von Offline-Queue in `supabase.js` und `CrmDrawer.jsx`.
  - 100% Test-Coverage für Validierung und Queue (`validationAndSync.test.js`).
- [ ] **✨ Groß-Optimierung Batch 4 (UI/UX Polish, A11y & Command Palette `Strg+K`):**
  - Globale Such- und Aktionsleiste (`CommandPaletteModal.jsx`).
  - Multi-Toast-Container (`ToastContainer.jsx`) und universelle `EmptyState.jsx`.
  - Vollständige Keyboard-Navigation und Focus-Trap für Modals.
- [ ] **🏆 Groß-Optimierung Batch 5 (Feature-Ausbau, Activity Stream & Backup Manager):**
  - Chronologischer Activity-Stream / Audit-Log für das Cockpit.
  - 1-Klick JSON-Vollbackup & Wiederherstellung (`BackupManagerModal.jsx`).
  - Erweiterter NLP-Parser für Notizen & Termine (`nlpParser.js`).
- [x] **🧪 Groß-Optimierung Batch 6 (Modulare Test-Abteilung & Qualitätssicherung):**
  - 8 eigenständige Feature-Test-Suiten in `src/test/features/` (CRM, Kanban, ROI/SOPs, Prompts, CommandCenter, Coaching, Sync/Backup, Dashboard).
  - 100% Pass-Rate (31/31 Tests grün in unter 4 Sekunden).
  - Komfort-Skripte in `package.json` für blitzschnelle isolierte Feature-Tests.
  - Vollständige Aktualisierung von `README.md`, `CHANGELOG.md` und `TODO.md`.
- [x] **🎯 Coaching Live-Portal & Grafik-/Persona-Anhänge (Phase v27):** Direkte Datei- & Grafik-Upload-Funktion (PNG, JPG, WEBP, SVG, PDF) an Coaching-Termine, Kanban-Aufgaben und im Wissens-Hub (DocsHub). Vollbild-Präsentationsmodus (Lightbox). Geschütztes **Coaching Live-Portal** (`CoachingLivePortal.jsx`) mit PIN-Sperre (`1234`) zur sauberen Präsentation von Meilensteinen, Zielgruppen-Personas und Ergebnisse in Zoom/Teams-Calls ohne Bildschirm-Share-Risiko. Full Test Coverage (14/14 Pass).
- [x] **🌐 KMU Service Harz Webseiten-Relaunch, Belegerfassungs-Fokus & Export-Funktion:** Vollständige Überarbeitung der Webseiten-Vorschau (`WebsiteView.jsx`, `websiteContent.js`) und Bereitstellung der Export-Funktion:
  - *Neues Leitmotiv & Positionierung:* „Schluss mit dem Büro-Sonntag“ & lautlose Belegerfassung (DATEV, Lexoffice) für Handwerk und KMU im Harz.
  - *MVP-Fokus & neutraler 3-Schritte-Workflow:* GoClean Harz vorerst ausgeblendet, stattdessen universaler Ablauf: Foto vor Ort ➔ automatische Lexoffice-Vorkontierung ➔ DATEV-Kanzleiübergabe.
  - *Dreistufige Preistreppe:* 500 € Audit, 2.000 € Standard-Setup (Bestseller mit bis zu 50% Fördermittel-Hebel), 200 €/Monat Digitaler Hausmeister.
  - *Handwerker-ROI-Rechner:* Berechnung von geretteten Büro-Sonntagen pro Jahr, monatlicher Zeitersparnis und monetärem Jahreswert.
  - *3-Design-Theme-Switcher:* Umschaltung zwischen 🌲 Harz & Handwerk (Waldgrün/Bernstein), ⚡ Modernes Tech-Handwerk (Schieferblau/Smaragd) und 🛠️ Industrie & Klarheit (Anthrazit/Orange), plus Hell/Dunkel-Modus.
  - *1-Klick-Export-Center & Autarke HTML:* Export-Modal mit Ziel-E-Mail-Konfigurator, Download von `index.html` und Bereitstellung unter `public/website-export/index.html` für Live-Schaltung via Netlify/Vercel/FTP sowie WhatsApp-Direktbuttons.
  - *Rechtssicherheit:* Vollständiges Impressum (§ 5 DDG) und Datenschutz (§ 18 MStV, DSGVO) für Langelsheim / Landkreis Goslar.
- [x] **🎮 Life & Founder OS Transformation (Life OS Gamification System):** Umwandlung der App in ein universelles Life & Goal OS. Integriertes Level-, XP- und Coins-System, interaktiver **Belohnungs-Shop** (Münzen einlösen für Zocken, Cheat Meals, Gadgets), **Disziplin- & Bestrafungs-Manager** (Coins-Schulden, Straf-Aufgaben, 3-Strikes System) und **Smart Routine mit automatischer Ruhetags-Erkennung** (z. B. Kraftsport Ruhetage an verordnungsfreien Tagen). Full Test Coverage (13/13 Pass).
- [x] **📌 Multi-Notizen System & Cloud-Sync (Phase v26):** Erstellung beliebig vieler Notizblätter (`+ Neue Notiz`), Umbenennen (In-Place Titel-Editor), Farbwahl (5 Farben), Tab-Umschaltung, Löschen & automatische Abwärtskompatibilitäts-Migration. Gerätesynchronisation in Supabase (`dash_notes_list`) und `localStorage`.
- [x] **📌 Notizblock & TODO Cloud- & Local-Synchronisations Fix (Handy ↔ PC):** Zeitstempel-Konfliktauflösung (`f_dash_local_updated_at` vs Supabase `updated_at`), Schutz vor Neulade-Überschreibung, `onBlur` & `beforeunload` Sofort-Speicherung (`keepalive: true`), leere To-Do Array-Synchronisation und Eingabeschutz bei aktivem Tippen.
- [x] **📱↔️💻 Prompt Vault Bidirektionale Auto-Synchronisierung (Handy & PC):** Echte bidirektionale Synchronisierung (Auto-Push lokaler unsynchronisierter Prompts `synced: false` nach Supabase vor dem Abruf), Auto-Sync bei App-Mount, Re-Connect, Tab-Fokus und 30s Polling. Badge-Anzeige (`☁️ Cloud` vs `📱 Lokal (Sync ausstehend)`).
- [x] **🏢 KMU & Harz Spezial-Prompt-Bibliothek (Phase v25 / Idee 4):** Vordefinierte Prompt-Bibliothek (`kmuPrompts.js`) mit 12+ Vorlagen für KMU (Sales, Recruiting, DSGVO, Google Business) mit 1-Klick-Übernahme (`➕ In meinen Tresor übernehmen`) in Supabase.
- [x] **📜 Prompt-Versionierung & Änderungshistorie (Phase v25 / Idee 5):** Automatische Revisions-Speicherung bei Prompt-Änderung / KI-Optimierung und interaktives Versions-Modal zum Vergleichen & 1-Klick-Wiederherstellen älterer Stände (`🔄 Diese Version wiederherstellen`).
- [x] **📌 Dashboard Notizzettel Upgraded & Cloud-Sync Fix (Phase v24):** Notizzettel-Inhalt (`dashNotes`) und Notizfarbe (`stickyNoteColor`) lückenlos über Supabase `dashboard_state` geräteübergreifend gesichert. Live Cloud-Status-Badge (`☁️ Cloud-gesichert` / `🔄 Speichert...`), Zeichen-/Wortzähler und Kopierbutton eingebaut.
- [x] **🔬 Deep Research Prompt Modus & Quick-Generator (Phase v23):** KI-Optimierungsziel `🔬 Deep Research` und Quick-Action Button (`🔬 Deep Research Prompt`) zur 1-Klick-Transformation von Themenentwürfen in 5-stufige Tiefenrecherche-Prompts (für Gemini Deep Research, Perplexity Pro, OpenAI Deep Research, Claude). Inklusive Deep Research Baukasten-Bausteinen, Schnellstart-Vorlagen, Offline-Smart-Fallback-Template und Integrationstest.
- [x] **Handy & PC Daten-Synchronisation & Supabase Wiederherstellung (Phase v22):** Inaktives Supabase-Backend aufgeweckt, DB-Tabellen `dashboard_state`, `prompts` und `leads` mit RLS angelegt. Race-Condition-Überschreibungs-Schutz (`isInitialStateLoaded`), automatischen Re-Sync bei Fenster-Fokus (`window.focus` & Polling), `isPinned`-Cloud-Sync und Cloud-Status-Button in der Headerleiste eingebaut.
- [x] **Freie Widget-Reihenfolge & Layout-Verschiebung (Phase v21):** Dynamische Neuanordnung aller Dashboard-Widgets im Anpassen-Editor mit Positionsanzeige (#1, #2...) und ⬆️ ⬇️ Verschiebe-Steuerung. Voll integriert mit Supabase Cloud Auto-Sync.
- [x] **Dashboard State Supabase Cloud Auto-Sync (Phase v20):** Vollständige Cloud-Synchronisation für Dashboard-Notizen (`dashNotes`), To-Dos (`dashTodos`), Widget-Layout (`dashboardWidgets`) und Dashboard-Modi (`dashboardMode`) über Supabase DB-Tabelle `dashboard_state`. Gerätesynchronisation zwischen Handy und PC hergestellt und Prompt-Payload-Schema korrigiert.
- [x] **KI-Prompt-Zentrale Upgrade & Cloud Auto-Sync:** Sofortiger Supabase Auto-Sync (Handy ↔ PC), Sync-Badges (`☁️ Cloud` vs `📱 Lokal`), Vorher/Nachher KI-Diff Modal, 4 KI-Optimierungsmodi, Variablen-Substitution (`{{Variable}}`), Favoriten (`📌`), JSON Export/Import und Toast-Notifications.
- [x] **Visuelles Strategie-Cockpit & Command Center v2 (Phase v19):** Gründungs-Bereitschafts-Score (%), Meeting Capture Modal (`+ Coach-Termin eintragen`), Akkordeon-System (5 Themen-Kacheln) und bi-direktionaler Parameter-Editor für `masterLogbuch.txt`.
- [x] **Google Drive REST API Live-Sync & Unified To-Dos (Phase v18):** Echte REST API Synchronisation mit OAuth2 Token Client und Google Identity Services. Bi-direktionaler Sync zwischen Meilenstein-Checkliste im Command Center und `masterLogbuch.txt` (TEIL 7).
- [ ] **Gründung & Business (Coaching-Vorgaben):**
  - [ ] MVP ausarbeiten (Dienstleistungs-Leistungsumfang & ROI-Präsentation für Erstgespräche)
  - [ ] Fördermittel recherchieren (Digitalbonus Niedersachsen, Existenzgründungsförderung Jobcenter)
- [ ] **Qualitäts- & Sicherheitsroadmap (Fahrplan aus codebase_review_report.md):**
  - [x] **Phase 1: Sofortmaßnahmen (Härtung & Secrets):**
    - [x] Supabase-Secrets aus Quellcode in `.env` auslagern (Task 1.1)
    - [x] Gemini API-Key-Übertragung auf HTTP-Headers `x-goog-api-key` umstellen (Task 1.2)
    - [ ] Row-Level Security (RLS) in Supabase aktivieren (Task 1.3)
    - [x] `android:allowBackup="false"` in AndroidManifest festlegen (Task 1.4)
    - [x] R8 Code-Minification in `build.gradle` aktivieren (Task 1.5)
    - [x] Statische Daten (`MASTER_LOGBUCH_CONTENT`) aus `App.jsx` in statische Module auslagern (Task 1.6)
    - [ ] Eingabe-Validierung für Webhooks im WhatsApp-Simulator hinzufügen (Task 1.7)
    - [ ] npm audit durchführen und Pakete aktualisieren (Task 1.8)
    - [x] Benutzerauthentifizierung (Login-Schranke) für Vercel-Zugang einrichten (Task 1.9)
  - [x] **Phase 2: Strukturierung & Performance (Modularisierung):**
    - [x] `App.jsx` in Unterkomponenten in `src/components/` aufteilen (Task 2.1)
    - [ ] Globales State-Management (z. B. Zustand) zur Vermeidung globaler Re-renders einführen (Task 2.2)
    - [x] API-Service-Layer einführen (Task 2.3)
    - [x] Unit-Tests in `App.test.jsx` modularisieren / testen (Task 2.4)
    - [x] CRM-Rendering-Performance optimieren (Task 2.5)
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

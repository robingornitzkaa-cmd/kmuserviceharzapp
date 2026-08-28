# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## [Unreleased]

### Added
- **🌐 Google Workspace Live-Radar (Google Kalender & Gmail Push-Alarme):**
  - **Live Google API Integration (`src/services/googleWorkspace.js`):** Vollständiger OAuth2 Token-Service und REST-Client für Google Calendar v3 und Gmail v1.
  - **Smarte Termin- & Posteingangs-Alarme (`src/services/notificationService.js`):**
    - 📅 **15-Minuten-Vorab-Alarm:** Prüft Google-Kalender-Termine und sendet 15–30 Minuten vor Beginn automatisch eine Push-Benachrichtigung mit Betreff, Uhrzeit und Ort.
    - ✉️ **Gmail Posteingangs-Radar:** Erkennt neu eingehende ungelesene E-Mails und benachrichtigt sofort mit Absender, Betreff und Kurzvorschau.
  - **Live-Dashboard & Agenda (`DashboardView.jsx`):**
    - Anzeige der echten Google-Termine in der Kalender-Kachel.
    - Neue Gmail-Posteingangs-Radar Kachel mit Live-Zähler („X ungelesen“) und Nachrichten-Auszügen.
    - 1-Klick Google-Verbindungs- und Synchronisations-Workflow mit detailliertem Protokoll.
  - **Android Widget-Anbindung:** Übermittlung des nächsten Termins (`nextMeeting`) und des ungelesenen Mail-Zählers (`unreadMailsCount`) an alle 4 Android Home-Screen-Widgets.
  - **Qualitätssicherung:** 6 neue Vitest-Tests in `googleWorkspaceAndNotifications.test.jsx`, 257 Tests bestanden, fehlerfreier Produktions-Build.

- **🔔 Hybrides Push-Benachrichtigungssystem & Android 4-Widget-Suite:**
  - **Notification Engine (`src/services/notificationService.js`):** Hybrides Benachrichtigungssystem mit Unterstützung für Browser Web Notifications API, PWA Service Worker Push und native Capacitor Android Local/Push Alarme (`@capacitor/local-notifications`, `@capacitor/push-notifications`).
  - **4 Automatisierte Benachrichtigungs-Trigger:**
    1. *📞 CRM-Wiedervorlagen & Follow-ups:* Tägliche Erinnerung bei anstehenden Kundengesprächen und Angeboten.
    2. *⏰ To-Do Fristen & Aufgaben-Flow:* Intelligente Erinnerung an offene Kern-Aufgaben.
    3. *☀️ Täglicher Morgen-Fokus:* Anpassbarer Start-Reminder (z. B. 08:00 Uhr) mit direktem Fokus-Ziel.
    4. *🔥 Habit & Streak-Schutz:* Nachmittags-/Abend-Erinnerung zur Aufrechterhaltung des täglichen Streaks.
  - **Zentrales Kontrollzentrum (`NotificationCenterModal.jsx`):**
    - Integriert in `SettingsView.jsx`, `DashboardView.jsx` und `Sidebar.jsx`.
    - Permission-Status-Banner mit 1-Klick Erlauben-Button.
    - Master-Toggle, Audio-Signalton-Schalter und individuelle Kategorie-Schalter.
    - Konfigurierbarer Morgen-Fokus Uhrzeit-Wähler (`<input type="time" />`).
    - Sofort-Test-Button (`🧪 Test-Benachrichtigung senden`).
    - 1-Klick Android-Widget Synchronisations-Button (`📱 Widgets manuell updaten`).
    - Ausklappbare Schritt-für-Schritt-Anleitung für die Platzierung auf dem Android-Startbildschirm.
  - **Android 4-Widget-Suite (`android/app/src/main/`):**
    1. *All-in-One Power Widget (`MyWidgetProvider.java`, `widget_layout.xml`):* Notiz-Vorschau, Top-3 To-Dos mit Checkboxen, CRM-Kennzahlen (518 Leads, Wiedervorlagen) und Streak-Badge.
    2. *To-Do & Fokus Widget (`TodoWidgetProvider.java`, `widget_todo_layout.xml`):* Schlankes Aufgaben-Widget mit Zähler und Tagesziel.
    3. *CRM Pipeline Widget (`CrmWidgetProvider.java`, `widget_crm_layout.xml`):* Live Lead-Radar mit KPI-Grid und Follow-up Status.
    4. *Quick-Capture & Voice Widget (`QuickCaptureWidgetProvider.java`, `widget_quick_capture_layout.xml`):* 1-Klick Schnellstart für Diktier- & Sprachaufnahme-Studio.
  - **Capacitor Plugin Bridge (`WidgetBridgePlugin.java`, `MainActivity.java`, `AndroidManifest.xml`):**
    - Saubere Bridge-Registrierung via `registerPlugin('WidgetBridge')`.
    - Vollständiger Datenabgleich für Notizen, To-Dos, Leads, Streak und Tagesziel.
    - Automatische Hintergrund-Aktualisierung bei jeder Zustandsänderung in der App.
  - **100% Testabdeckung & Qualitätssicherung:**
    - 13 Vitest-Tests in `notificationsAndWidgets.test.jsx`.
    - 251 Tests bestanden (`npm run test:all`).
    - Fehlerfreier Produktions-Build (`npm run build`) mit PWA Workbox Precache.

- **🧼 GoClean Harz × Manus AI – 10-Module Deep-Research Master-Suite (`DOCS/MANUS_GOCLEAN_DEEP_RESEARCH_PROMPTS.md` & `manus_power_cockpit.html`):**
  - **10 spezialisierte Master-Prompts im XML-Tag-Format für maximale KI-Ausbeute:**
    - *🗺️ Master-Prompt 1: Regionaler Marktatlas & Wettbewerbs-Audit (30–40 km Harz)* – Vollständige Analyse aller Reinigungs-, GaLa- und Hausmeisterbetriebe in Goslar, Langelsheim, Bad Harzburg, Wernigerode, Clausthal-Zellerfeld, Osterode & Salzgitter-Süd inkl. Stundensätzen, Google-Rezensionslücken und unbesetzten Marktlücken.
    - *🎯 Master-Prompt 2: B2B-Liegenschaften & Kombi-Auftraggeber (50+ Leads)* – Strukturierte Datenerfassung von Hausverwaltungen, WEG-Verwaltern, Bauträgern, Ärztehäusern und Gewerbeparks für das lukrative Kombipaket (Innenreinigung + Außenanlagenpflege).
    - *🏛️ Master-Prompt 3: Kommunale Vergaben & Ausschreibungs-Radar* – Vergabeplattformen, Wertgrenzen für freihändige Vergaben, Ansprechpartner in Liegenschaftsämtern und Bieterkartei-Eintragung.
    - *📊 Master-Prompt 4: Hochmargige Spezial-Dienste & 12-Monats-Kalkulation* – m²/h Leistungswerte, Netto-Stundensätze, Margen für Photovoltaik-, Baufein-, Winterdienst- und Heckenschnitt-Services sowie 12-Monate-Liquiditätsplan.
    - *📍 Master-Prompt 5: Google Maps & Local SEO Dominanz-Audit* – GBP-Keywords, Citations, Schema.org Markup und City-Landingpage-Texte für Rang 1 im Harzer Local 3-Pack.
    - *👥 Master-Prompt 6: Recruiting- & Mitarbeiter-Funnel* – Lohn-Benchmark, 3 conversion-starke Stellenanzeigen und 60-Sekunden WhatsApp-Bewerbungsprozess.
    - *🏨 Master-Prompt 7: Ferienwohnungs-, Hotel- & Tourismus-Radar* – 35+ Fewo-Agenturen & Chalet-Dörfer (Braunlage, Bad Harzburg, Schierke, Wernigerode) mit B2B-Wechselreinigungsangebot.
    - *🎬 Master-Prompt 8: Social Media & 30-Tage Viral-Content-Maschine* – 30 genaue Video-Skripte für Vorher/Nachher-Transformationen mit Hooks, Musik-Tipps und Hashtags.
    - *🏭 Master-Prompt 9: Gewerbeparks & Industriehallen-Sonderreinigung* – Großkunden-Dossier (Gewerbegebiet Baßgeige, Langelsheim, Wernigerode) für Hallenboden- und Fassadenreinigung bis 10.000 €.
    - *🤝 Master-Prompt 10: KMU Service Harz B2B-Digitalisierungs-Audit* – Cross-Selling-Audit für regionale Handwerksbetriebe zur Büro-Automatisierung und E-Rechnung.
  - **Multi-Mode UI-Erweiterung im Manus Power-Cockpit (`manus_power_cockpit.html`):** Schnelle Umschaltung zwischen allen 11 Prompts (Web-App Builder + 10 Deep Researches) mit 1-Klick Zwischenablagen-Kopie.
  - **Praxis-Leitfaden:** Schritt-für-Schritt Anleitung zur Transformation der generierten CSV-Leadlisten in Vor-Ort-Abschlüsse mit dem GoClean Blitz-Kalkulator.

- **🤖 Manus.ai Power-Cockpit & Playbook (`manus_power_cockpit.html`):**
  - **Dynamischer Prompt-Generator:** 6 spezialisierte Module (Lead-Scout, Fördermittel & Ausschreibungen, Live Website-Audit, Dokumenten- & Vertrags-Check, Web-Tool Generator sowie **GoClean 3-Portal Suite Master-Generator**) mit anpassbaren Feldern und 1-Klick Copy-to-Clipboard.
  - **7-Aktionsplan:** Strukturierte Schritt-für-Schritt Roadmap zur systematischen Nutzung von Manus.ai für lokale KMU.
  - **Akquise-Vorlagen:** Fertige E-Mail-Templates (Website-Audit Kaltakquise & Fördermittel-Guide Türöffner) zum direkten Versand an Leads.
### Added
- **🤖 Manus AI Präsentations-Generator Master-Suite (`DOCS/MANUS_PROMPTS_GOCLEAN_PRAESENTATIONEN.md`):**
  - **7 schlüsselfertige XML-Master-Prompts** für autonome KI-Generatoren wie Manus AI:
    - *Master-Prompt 1:* Emotionaler Bruder-Pitch (4 Folien)
    - *Master-Prompt 2:* Sachlicher Business- & ROI-Pitch (5 Folien)
    - *Master-Prompt 3:* App Feature-Walkthrough (7 Folien)
    - *Master-Prompt 4:* KI- & Zukunfts-Vision (5 Folien)
    - *Master-Prompt 5:* Solo-Wachstumsplan (6 Folien)
    - *Master-Prompt 6:* 60s Power-Überblick (3 Folien)
    - *Master-Prompt 7:* Master-Hub & Präsentations-Portal
  - Vollständige Integration in `DocsHub` (`INITIAL_DOCS`) mit 1-Klick Quick-Copy.
- **🎤 GoClean Harz – Multi-Varianten Präsentations-Suite & In-App Galerie für Marcel:**
  - **Neuer Tab 5 im Toolkit (`src/components/GoCleanToolkit.jsx`):** Dedizierte Präsentations-Galerie mit allen 8 Decks, Kategorie-Filtern (Pitches, Demos, Solo-Wachstum, KI & Zukunft) und Einzel-Buttons für jedes Deck.
  - **In-App Live-Präsentations-Modal:** Jede Präsentation kann mit 1 Klick direkt in der App in einem responsiven Vollbild-Iframe mit Deck-Wechsler, Tastatursteuerung und Druckfunktion getestet werden.
  - **Quick-Access Buttons:** Prominente Buttons im Dashboard-Banner (`🎤 8 Präsentationen (Hub) ➔`, `🤝 Bruder-Pitch`) sowie im Toolkit-Header (`🎤 Alle 8 Präsentationen`, `🎛️ Hub`, `⚡ 60s Teaser`).
  - **Präsentations-Hub (`public/goclean_praesentationen_hub.html`):** Zentrale Übersichtskarte aller 8 Präsentationen mit Filter-Badges, Folienanzahl und Direkt-Links.
  - **6 neue zielgerichtete Präsentations-Decks (Dark Glassmorphism, Keyboard-, Touch- & Print-Ready):**
    - *🤝 Variante 1: Bruder-Pitch (emotional) (`public/pitch_bruder_emotional.html` - 4 Folien):* Persönliche Du-Ansprache an Marcel („Marcel, ich hab dir was gebaut"), Fokus auf Feierabend, Entlastung und den Brüder-Deal.
    - *📊 Variante 2: Business-Pitch (professionell) (`public/pitch_professionell.html` - 5 Folien):* Sachlicher Ton, Branchenzahlen, ROI-Kalkulation (bis zu 11 Std./Woche gespart = +1.500–4.000 € Mehrumsatz) und 3-Stufen-Fahrplan.
    - *📱 Variante 3: App Feature-Walkthrough (`public/demo_app_features.html` - 7 Folien):* Alle 7 Module im Detail vorgestellt (Blitz-Kalkulator, Dashboard, Foto-Checklisten, WhatsApp-Autopilot, Rechnungen/DATEV, Bewertungen & Social Media) mit wechselnden Farbakzenten.
    - *🧠 Variante 4: KI & Zukunfts-Vision (`public/pitch_ki_zukunft.html` - 5 Folien):* KI-Texter für Instagram/Facebook, smarte Routen- & Auslastungsplanung, 24/7 digitaler Assistent und KI-Marktanalyse im Harzkreis.
    - *🚀 Variante 5: Solo-Wachstumsplan (`public/pitch_wachstum_solo.html` - 6 Folien):* Speziell für Marcel als Einzelkämpfer – mit Automatisierung die Power von 3 Mitarbeitern nutzen, B2B-Skalierung, 90-Tage-Fahrplan und Team-Vorbereitung.
    - *⚡ Variante 6: Power-Überblick (`public/pitch_kompakt_ueberblick.html` - 3 Folien):* Ultra-kompakter 60-Sekunden-Teaser („8h Arbeiten. 3h Büro. 0h Feierabend?"), 6 Module auf einen Blick und 15-Minuten-Kaffee-CTA.
  - **Korrektur & Personalisierung:** Vollständige Korrektur des Inhabernamens auf **Marcel Gornitzka** in allen Vorlagen, Akquisebriefen und WhatsApp-Vorlagen.
  - **Testabdeckung:** Neuer Testfall in `src/test/GoCleanToolkit.test.jsx` für Präsentations-Tab und In-App-Modal (5/5 Tests bestanden).
- **🧼 GoClean Harz VIP-Wachstums- & Produktivitäts-Suite (Bruder-Offensive 2026):**
  - **Interaktives In-App Toolkit (`src/components/GoCleanToolkit.jsx`):**
    - *⚡ Blitz-Angebotsrechner:* Live-Kalkulation nach Branchenrichtwerten (m²/h) für Büro/Unterhalt (200 m²/h), Treppenhäuser (140 m²/h), Glas (90 m²/h), Bau-Endreinigung (55 m²/h) und Grün/Winterdienst (350 m²/h) mit Material- & Anfahrtszuschlag.
    - *📝 Automatischer B2B-Angebotstext-Generator:* 1-Klick Erstellung formeller B2B-Angebote mit Preisen, Reinigungsintervallen, Qualitätsgarantien und Copy-to-Clipboard.
    - *🏢 B2B-Akquise-Mappen:* 3 vorgefertigte Anschreiben für Hausverwaltungen & WEGs (feste Dauerpflegeverträge), Bauträger (lukrative Bau-Endreinigungen) und Arztpraxen/Kanzleien (4-Farben-Hygienesystem).
    - *📱 Mobile Baustellen-SOP & Digitales Abnahmeprotokoll:* Smartphone-Checkliste mit Vorher-/Nachher-Beweisschutz gegen Reklamationen und digitaler Kundenunterschrift.
    - *⭐ 5-Sterne Google-Bewertungs-Booster:* Personalisierbare 1-Klick WhatsApp-Vorlage zur schnellen Kundengewinnung nach Auftragsabschluss.
  - **Druckfertige VIP-Präsentationsmappe (`public/goclean_wachstumsmappe.html` & `DOCS/GOCLEAN_HARZ_WACHSTUMS_STRATEGIE.md`):**
    - Interaktive 6-Folien-Präsentation im GoClean-Branding mit Tastatursteuerung, Vollbildmodus und sauber formatiertem `@media print` PDF-Export.
    - Vollständiges Strategiehandbuch mit Gesprächsleitfaden, Preis-Tabellen und psychologischen Hebeln für das Bruder-Treffen.
  - **DocsHub- & Navigations-Integration:**
    - Neuer Sidebar-Menüpunkt `🧼 GoClean Harz Suite` in Desktop- und Mobile-Navigation.
    - Registrierung von `GoClean_Harz_Wachstums_und_Produktivitaets_Mappe.md` in `INITIAL_DOCS`.
  - **Testabdeckung:** 4 neue Unit- und Integrationstests in `src/test/GoCleanToolkit.test.jsx` (237 Tests über 22 Testdateien zu 100% bestanden).
- **💼 B2B-Vertriebs- und Auslieferungs-Suite für KMU Service Harz (R1–R4):**
  - **R1: Steuerberater-Multiplikatoren-Kit & Handwerker-Direct-Mail-Kampagne:**
    - *Kanzlei-Pitch & Partnerdeck (`DOCS/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md`):* DATEV Rechnungsdatenservice 1.0 vs. Buchungsdatenservice, Pendelordner-Befreiung, GoBD-Verfahrensdokumentation und 0-Euro-Kanzlei-Partnermodell.
    - *Mandanten-Flyer (`DOCS/Mandanten_Flyer_Vorlage_Handwerk.md`):* Ausdruckbare Vorlage für Kanzleien zur Weitergabe an Handwerker mit 500 € Kanzlei-Empfehlungsgutschein (`KANZLEI-HARZ-500`) und QR-Code.
    - *Direct-Mail 1-Seiter (`DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md`):* Haptischer Brief an alle 518 regionalen Harzer Handwerksmeister mit dem Hook „Schluss mit dem Büro-Sonntag“, 50% Fördermittel-Indikation und 500 € Audit-Gutschein (`MEISTER-HARZ-2026`).
    - *Telefon- & Kaltakquise-Leitfaden (`DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md`):* Skripte für Vorzimmer/Assistenz und Meister auf der Baustelle sowie 5-Punkte-Validation-Pivot-Einwandbehandlungs-Matrix.
    - *In-App DocsHub Integration:* Registrierung aller 4 Vorlagen in `INITIAL_DOCS` mit Tag-Pills, Filterchips und 1-Klick-Kopierfunktion.
  - **R2: Automatisierter 500 € „Büro-Stress-Test & ROI-Report“ PDF-Generator (`src/services/pdfReportGenerator.js`):**
    - *4-teiliger Prüfbericht:* Teil 1 (Prozess-Röntgenbild Status Quo mit 4-Stationen-Ablauf Baustelle -> Pendelordner), Teil 2 (Rote Schattenkosten-Berechnung in Euro mit roter Badge `#dc2626`), Teil 3 (Soll-Roadmap Make/Lexoffice/DATEV), Teil 4 (Fördermittel-Matrix NDS/LSA/TH/BUND/NONE, 100% Anrechnungs-Garantie der 500 € Audit-Gebühr auf Stufe 2 und Amortisation in < 2,5 Monaten).
    - *jsPDF Vektor-Layout:* 2-seitiger, hochauflösender Vektor-PDF-Export mit Firmen-Branding, Diagrammen, Tabellen und Unterschriftenblock.
    - *UI-Export:* 1-Klick-Download-Buttons im Onboarding-Bereich (`OnboardingView.jsx`) und Showcase-ROI-Rechner (`SopManager.jsx`).
  - **R3: Mandanten-Portal & AaaS-Wartungs-Dashboard (`src/components/ClientPortalView.jsx`):**
    - *Dediziertes Mandanten-Dashboard:* Umschaltbare Kundenansicht mit Firmen-Header und Modus-Schalter.
    - *Live Schnittstellen-Monitoring:* Statuskarten für Make.com Core, Lexoffice API, DATEV Belegbilderservice, GoBD Cloud-Archiv und GPT-4o Vision OCR mit 1-Klick-Diagnose (Blueprint 4 Simulation).
    - *Produktivitäts- & ROI-Metriken:* Zähler für verarbeitete Monatsbelege, gerettete Büro-Sonntage und kumulierte Zeiteinsparung in Stunden & Euro.
    - *1-Klick Support-Ticket-System:* 5 Pflichtkategorien, Prioritäten mit SLA-Indikation und Kontingentverwaltung für den „Digitalen Hausmeister (200 € / Monat)“ mit 60-Minuten-Pool-Tracker.
  - **R4: E-Rechnungs- & ZUGFeRD / XRechnung Prüf-Studio (`src/services/eInvoiceParser.js`, `src/components/EInvoiceValidator.jsx`):**
    - *EN 16931 Validierungs-Engine:* Semantischer XML-Parser für UN/CEFACT CII (`rsm:CrossIndustryInvoice`) und OASIS UBL 2.1 (`Invoice`/`CreditNote`).
    - *PDF/A-3 Extractor:* Client-seitiges Auslesen von eingebettetem XML (`factur-x.xml` / `zugferd-invoice.xml`) aus ZUGFeRD-PDFs.
    - *Ampel-Prüfprotokoll:* Feldprüfung aller Pflichtangaben (BT-1 bis BT-115, Leitweg-ID, USt-IdNr, Kreditor/Debitor, strukturierte Positionen) und mathematische Konsistenzprüfung (BR-CO-10 bis BR-CO-18 mit 0,02 € Rundungstoleranz).
    - *Interaktives UI:* Drag & Drop Upload, Beispielrechnungen, Detail-Akkordeons, Positions-Tabelle und PDF/JSON Prüfbericht-Export.
  - **🧪 Umfassende Test-Suite & Qualitätssicherung:**
    - 21 Test-Suiten mit 233 Tests zu 100% bestanden (`npm run test:all`).
    - Tier 1–5 Testabdeckung inklusive Opaque-Box E2E Tests und Adversarial Hardening.

- **⚡ Schlüsselfertiges Onboarding-System & Make.com Workflow-Tresor (Businessplan 2026):**
  - **4 Make.com Blueprints (Direkt-Import für Make.com):**
    - `blueprint_1_belegerfassung_lexoffice_datev.json`: WhatsApp & E-Mail Belegeingang -> KI-OCR (GPT-4o Vision) -> GoBD Cloud-Archiv -> Lexware Office Vorkontierung -> DATEV Belegbilderservice (Stufe 2 Core Bestseller: 2.000 € Festpreis).
    - `blueprint_2_handwerker_lead_qualifier_booking.json`: 24/7 Notdienst- & Kundenanfragen-Assistent mit GPT-4o Intent-Analyse, Supabase CRM Lead-Erstellung und Google Calendar Terminbuchung (Stufe 2+: ab 6.000 €).
    - `blueprint_3_baustellen_audio_zeiterfassung_fotos.json`: WhatsApp-Audio Sprach-Zeiterfassung mit OpenAI Whisper & Lexoffice Buchung sowie automatischer Baustellenfoto-Upload in Drive-Projektordner.
    - `blueprint_4_aaas_system_monitoring_healthcheck.json`: 24/7 Schnittstellen-Monitoring für Lexoffice, DATEV und Supabase mit proaktivem Telegram/Slack-Alerting für den AaaS Retainer (200 € / Monat).
  - **Make.com Blueprint-Hub im Sales & SOPs Tab (`SopManager.jsx`, `makeBlueprintsData.js`):** Interaktive Szenario-Karten, 1-Klick JSON-Download, Test-Payload-Kopierer, Modul-Knoten-Pipeline und Schritt-für-Schritt Einrichtungsleitfaden (`public/make-blueprints/README_MAKE_SETUP_GUIDE.md`).
  - **4-Stufen Onboarding-Playbooks (`OnboardingView.jsx`, `initialData.js`):** Dedizierte interaktive Playbooks für Stufe 1 (500 € Potenzial-Audit), Stufe 2 (2.000 € Standard-Setup Belegerfassung), Stufe 2+ (ab 6.000 € Meisterbetrieb ERP & Förderung) und Stufe 3 (200 €/Monat Digitaler Hausmeister AaaS) mit dynamischer Zusammenfassung und PDF-Export.
  - **Rechtssichere Vertrags- & Dokumentenvorlagen (`DOCS/` & `DocsHub.jsx`):** Dienstleistungsvertrag (2.000 € Festpreis), DSGVO-Auftragsverarbeitungsvertrag (AVV nach Art. 28 DSGVO), GoBD-Verfahrensdokumentation für ersetzendes Scannen nach BStBK-Standard, AaaS-Wartungsvertrag (200 €/Monat SLA), Systemzugangs- & Sicherheits-Checkliste und förmliches Abnahmeprotokoll inkl. ausdruckbarem Mitarbeiter-Cheat-Sheet.

- **📑 Vollständiger, 100 % rechtssicherer Businessplan 2026 (`DOCS/Businessplan_KMU_Service_Harz_2026_Final.md`):**
  - **Neues 4-Stufen-Modell:** 500 € Audit (Vorkasse/Türöffner), 2.000 € Standard-Setup (Core Bestseller mit 100 % Dienstleistungsmarge, förderunabhängig & amortisiert in 8 Wochen), ab 6.000 € Digitaler Meisterbetrieb (Prozess- & ERP-Integration für Großprojekte mit Förderhebel) und 200 € / Monat Digitaler Hausmeister (MRR).
  - **Juristische Hardware-Klarstellung:** Ausschluss von Standard-iPads/Handys als IKT-Grundausstattung eingearbeitet; Fokus auf echte förderfähige Prozess-Software und Schnittstellen-Pipelines (Make/n8n/DATEV).
  - **Finanzplan & Rentabilität:** 100 % schuldenfreies Bootstrapping-Konzept via § 16c & § 16b SGB II mit GuV-Vorschau (Jahr 1: 41.400 € Erlös, Break-Even bei 0,77 Aufträgen/Monat).

- **🏛️ Fördermittel-Leitfaden 2026 & Website-Aktualisierung (`foerdermittel_leitfaden_kmu_service_harz.md`):**
  - **Umfassender Fördermittel-Leitfaden:** Detaillierte Ausarbeitung zu aktiven Förderprogrammen (Digital Innovation Sachsen-Anhalt bis 50 %, INQA-Coaching bis 80 %, BAFA-Beratungsförderung und Mittelstand-Digital Zentren) sowie Klarstellung ausgelaufener Programme (Digitalbonus Niedersachsen, Digitalbonus Thüringen, go-digital).
  - **Rechtssicherheits-Leitplanken:** Schutz vor UWG-Abmahnungen, Einhaltung der Nebenleistungsbefugnis nach § 5 RDG und Beachtung des Verbots des vorzeitigen Maßnahmenbeginns.
  - **Muster-Gesprächsleitfaden & Disclaimer:** Wort-für-Wort Einwandbehandlung für Kundengespräche und rechtssichere Textbausteine für Angebote.
  - **Website & Standalone-Export synchronisiert:** Alle Fördermittel-Texte in `websiteContent.js`, `WebsiteView.jsx` und `public/website-export/index.html` auf den 100 % rechtssicheren Stand 2026 gehoben.

- **🚀 KMU Service Harz Website Preview, MVP-Fokus (Belegerfassung) & 1-Klick-Export:**
  - **MVP-Positionierung Belegerfassung:** Schärfung der Website auf das Kernproblem *Büro-Sonntag* und lautlose Belegerfassung für Handwerker & KMU im Harz mit DATEV- und Lexoffice-Schnittstellen.
  - **3-Schritte-Workflow:** GoClean Harz Referenz vorerst ausgeblendet und durch den neutralen, allgemein gültigen 3-Stufen-Workflow (1. Foto vor Ort ➔ 2. Lautlose Erfassung & Lexoffice-Ablage ➔ 3. Revisionssichere DATEV-Kanzleiübergabe) ersetzt.
  - **Website-Export-Funktion (`WebsiteView.jsx`):** Neuer Button **„Website Exportieren“** in der Header-Aktionsleiste öffnet ein modales Export-Center mit Ziel-E-Mail-Konfigurator, 1-Klick-Download für `index.html` und Code-Kopierfunktion.
  - **Autarke Standalone-Website (`public/website-export/index.html`):** Vollständig autark lauffähige Single-Page-Website inklusive 3-Theme-Presets (Harz, Tech, Industrie), Dark/Light-Mode, interaktivem Büro-Sonntag-ROI-Rechner und DSGVO-konformem FormSubmit-Kontaktformular.
  - **WhatsApp-Direktkontakt:** Direkter WhatsApp-Button in allen Kontaktformularen für niedrigschwellige Kontaktaufnahme per Smartphone.

- **📊 Interaktive 4-Folien VIP-Pitch-Präsentation (`pitch_goclean.html` & `public/pitch_goclean.html`):**
  - Minimalistische, psychologisch optimierte Pitch-Präsentation für den ersten Testkunden *GoClean Harz*.
  - Enthält Tastatur-Navigation ([◀ / ▶], [Leertaste], [F] für Vollbild), Touch-Swipe-Support für Mobilgeräte und ein Druck-Stylesheet für perfekten 4-Seiten-PDF-Export.
  - Fokussiert auf Bürostress-Befreiung, 100% kostenlosen VIP-Support und 0% Vorbereitungsaufwand.

- **⚡ God of Prompt - Live-Extraktion aller 474 Strategie-, Businessplan- & Finanz-Vorlagen (`src/constants/godOfPromptLibrary.js`):**
  - **Umfassende Aktualisierung & Erweiterung auf 1.304 Gesamt-Vorlagen** mit 20 neu erschienenen Live-Prompts von `godofprompt.ai`:
    - *Business Plans:* **143 Vorlagen** (Geschäftspläne, Finanzmodellierung, Cashflow-Prognosen, Pitch Decks, SaaS-Ideen, KI-Integration).
    - *Go-to-Market (GTM):* **110 Vorlagen** (Product-Market Fit (PMF), Launch-Sequenzen, Erstkunden-Akquise, Partnerschaften, Pre-Launch Audits).
    - *SWOT & Frameworks:* **66 Vorlagen** (Dynamische SWOT-Matrizen, PESTEL, Porter's Five Forces, Problem-Solving Frameworks).
    - *Positioning & Messaging:* **62 Vorlagen** (Brand Voice, B2B-Sales-Skripte, Nischen-Positionierung, Value Proposition, Elevator Pitches).
    - *OKRs & Goals:* **28 Vorlagen** (Quartals-OKRs, KPI-Bäume, Team-Zielsysteme, Performance-Tracking).
    - *Pricing Strategy:* **28 Vorlagen** (Value-Based Pricing, Tiered-Pricing, Preiselastizität, Rabatt- & Bündelungsstrategien).
    - *Roadmaps:* **20 Vorlagen** (Outcome-driven Produkt-Roadmaps, Meilenstein-Planung, Feature-Priorisierung).
    - *Competitive Strategy:* **17 Vorlagen** (Burggraben-Analysen, Konkurrenz-Stresstests, Gegenstrategien).
  - **Nahtlose Integration:** 100% PWA- & Android-kompatibel (`godofprompt_library_export.json`), dynamische Subkategorie-Filter und 1-Klick-Übernahme in den Prompt-Tresor.

- **📍 Harz & Vorharz B2B Lead-Datenbank - 518 validierte KMU & Handwerksbetriebe (`leads_master_harz.csv`):**
  - **Lückenlose Erfassung aller 133 Batches & 19 Cluster im 40–50 km Radius um Langelsheim (Schritt-für-Schritt Live-Recherche):**
    - *Cluster 1 (Wernigerode & Ortsteile):* **67 validierte Leads** über alle 7 Gewerke.
    - *Cluster 2 (Ilsenburg inkl. Drübeck & Darlingerode):* **21 validierte Leads**.
    - *Cluster 3 (Blankenburg inkl. Derenburg, Cattenstedt, Heimburg, Wienrode):* **33 validierte Leads**.
    - *Cluster 4 (Elbingerode-Umfeld / Oberharz am Brocken):* **25 validierte Leads**.
    - *Cluster 5 (Gemeinde Nordharz / passende Ortsteile):* **18 validierte Leads**.
    - *Cluster 6 (Bad Harzburg & Ortsteile):* **29 validierte Leads**.
    - *Cluster 7 (Langelsheim & Ortsteile Astfeld, Lautenthal, Wolfshagen, Lutter):* **22 validierte Leads**.
    - *Cluster 8 (Goslar inkl. Oker, Baßgeige, Jürgenohl, Vienenburg):* **29 validierte Leads**.
    - *Cluster 9 (Liebenburg & Ortsteile Othfresen, Dörnten, Groß Döhren):* **17 validierte Leads**.
    - *Cluster 10 (Seesen & Ortsteile Bornhausen, Rhüden, Münchehof, Mechtshausen):* **21 validierte Leads**.
    - *Cluster 11 (Clausthal-Zellerfeld & Ortsteile Altenau, Wildemann):* **19 validierte Leads**.
    - *Cluster 12 (Bad Grund & Osterode am Harz):* **29 validierte Leads**.
    - *Cluster 13 (Braunlage, St. Andreasberg & Herzberg am Harz):* **27 validierte Leads**.
    - *Cluster 14 (Bad Lauterberg, Bad Sachsa & Walkenried):* **26 validierte Leads**.
    - *Cluster 15 (Salzgitter-Süd/Bad & Bockenem / Ambergau):* **27 validierte Leads**.
    - *Cluster 16 (Schladen-Werla, Hornburg & Baddeckenstedt / Holle):* **26 validierte Leads**.
    - *Cluster 17 (Osterwieck & Fallstein):* **25 validierte Leads**.
    - *Cluster 18 (Thale & Bodetal):* **27 validierte Leads**.
    - *Cluster 19 (Quedlinburg, Gernrode & Bad Suderode):* **30 validierte Leads**.
  - **7 Fokusbranchen:** Gebäudereinigung (`GR`), Hausmeister/Facility-Service (`FM`), GaLaBau (`GL`), Sanitär/Heizung/Klima (`SHK`), Elektro (`EL`), Dachdecker/Zimmerei (`DZ`), Bau/Sanierung (`BS`).
  - **Strikte Datenqualität:** 23 Spalten (Semikolon-separiert), Inhaber-/Geschäftsführer-Namen, verifizierte Telefonnummern, Websites, E-Mails, Rechtsformen, Adressen und Quellennachweise. Inklusive Dokumentationsplan [`leads_erweiterungsplan_40km_harz.md`](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/leads_erweiterungsplan_40km_harz.md).

### Fixed

- **📱 Mobile UI & Layout-Optimierung für Smartphone-Hochformat (Portrait Mode):**
  - **Multi-Notizen & Aufgaben-Grid (`DashboardView.jsx`, `index.css`):** Das starre 2-Spalten-Layout (`1.2fr 1fr`) wurde auf mobile Einspaltigkeit (`repeat(auto-fit, minmax(280px, 1fr))`) umgestellt. Notizen und To-Do-Checkliste stapeln sich auf Mobilgeräten sauber untereinander, sodass kein Querformat-Drehen mehr nötig ist.
  - **Voice Quick-Capture Studio (`VoiceQuickCaptureWidget.jsx`):** Flexibles Wrapping im Header, verbesserte Touch-Ziele für Sprachaufnahme (36x36px) und Tag-Pills sowie dynamisches Button-Grid (`minmax(88px, 1fr)`), damit alle 5 Routing-Ziele ohne horizontales Abschneiden bedienbar sind.
  - **Einfache Widgets (Notizen, To-Dos, Termine, Quick-Links):** Textumbruch (`word-break: break-word`), flexible Eingabefelder mit `min-width: 0`, standardisierte Mindesthöhen (36-38px) für Touch-Bedienung und ausgerichtete Lösch-Icons.
  - **Life OS Gamification HUD & Screenshot Cloud-Drop:** Responsives Wrapping für Level-HUD, Streak-Badge, Belohnungs-Shop und Screenshot-Upload-Button.
  - **E-Rechnungs- & Finanzcockpit:** Einspaltiges Stacking der Formularfelder und Aktions-Buttons auf Bildschirmen unter 900px.

- **☁️ Supabase Cloud-Sync Reparatur für Notizen & To-Dos (Handy ↔ PC):**
  - **Behebung des HTTP 400 Schema-Fehlers:** Die fehlende Spalte `media_gallery` in `public.dashboard_state` führte bei jedem Speichervorgang zu einem API-Abbruch. Spalte in Supabase nachgerüstet und Payload-Struktur standardisiert.
  - **Absicherung des Supabase Anon-Key Fallbacks (`supabase.js`, `App.jsx`):** Robuster Fallback verhindert 401-Fehler bei unvollständigen oder alten `localStorage`-Konfigurationen auf Mobilgeräten.
  - **Echter Sync statt Pseudo-Timer (`triggerSupabaseSync`):** 2.4s Mock-Timeout durch echte bidirektionale Push/Pull-Logik mit Live-Log und Statusanzeige ersetzt. Lokale Änderungen werden vor dem Remote-Abruf sofort zur Cloud übertragen.
  - **Entfernung des `keepalive`-Payload-Limits:** Browser-Quota-Fehler bei längeren Texten und Notizen in WebViews behoben.
  - **Capacitor & PWA Sync:** Aktualisierung der gebauten Android-Assets via `npx cap copy`.

### Added
- **⚡ God of Prompt - 1.284 vollständige B2B-, Strategie- & Operations-Prompts (`src/constants/godOfPromptLibrary.js`):**
  - **Lückenlose Gesamtextraktion (1.284 Vorlagen über 20 Fachgebiete):**
    - *SOPs & Processes*: **159 Vorlagen** (Standard Operating Procedures, Onboarding-Playbooks, Qualitätsmanagement, Übergabeprotokolle).
    - *Workflow Design*: **132 Vorlagen** (Make.com/Zapier Automatisierung, Prozess-Optimierung, API-Workflows).
    - *Business Plans*: **135 Vorlagen** (Geschäftspläne, Finanzprognosen, Investoren-Pitches).
    - *Market Research*: **114 Vorlagen** (Marktforschung, Preiselastizität, Branchenstudien).
    - *Go-to-Market*: **106 Vorlagen** (Markteintritt, $10k MRR Roadmaps, Distributionskanäle).
    - *Project Management*: **70 Vorlagen** (WSJF, Agile Sprints, Meilenstein-Tracking, Risiko-Matrizen).
    - *Brainstorming*: **73 Vorlagen** (Laterales Denken, Vibe Coding, Ideenfindung).
    - *SWOT & Frameworks*: **65 Vorlagen** (SWOT-Matrizen, Porter's Five Forces, Problem-Solving).
    - *Positioning & Messaging*: **61 Vorlagen** (Positionierung, Value Proposition, Buyer Personas).
    - *Trend Analysis*: **48 Vorlagen** (STEEP-Trend-Radar, Social Listening).
    - *Literature Review*: **44 Vorlagen** (Wissenschaftliche Synthese, Methodik-Reviews).
    - *Documentation*: **43 Vorlagen** (Code-to-Docs, API-Dokumentation, Styleguides).
    - *Competitive Analysis*: **42 Vorlagen** (Wettbewerbs-Matrizen, Gap-Analysen).
    - *Debugging*: **41 Vorlagen** (Systematische Fehlersuche, Security-Vulnerability-Scans).
    - *Deep Research*: **35 Vorlagen** (Multi-Source-Synthese, Executive Summaries).
    - *Pricing Strategy*: **28 Vorlagen** (Preismodelle, Value-Based Pricing).
    - *OKRs & Goals*: **27 Vorlagen** (KPI-Frameworks, Früh-/Spätindikatoren).
    - *Testing*: **25 Vorlagen** (Test-Pyramiden, Synthetische Testdatensätze).
    - *Roadmaps*: **20 Vorlagen** (Produkt- & Innovationsfahrpläne).
    - *Competitive Strategy*: **16 Vorlagen** (First-Principles-Analysen, 80/20 Pareto-Wachstum).
  - **Interaktiver 20-Fachgebiete-Filter & 1-Klick-Übernahme:**
    - Tab **`⚡ God of Prompt (1.284)`** mit dynamischer Subkategorien-Leiste.
    - 1-Klick-Übernahme (`➕ In meinen Tresor übernehmen`) speichert jeden Prompt sofort in deinen persönlichen Tresor (inkl. Cloud-Sync).
  - **Performance-Optimiertes Chunk-Splitting & 5MB PWA Offline Caching (`vite.config.js`):**
    - Isolierung der Bibliothek in `vendor-prompts-library.js` (App-Initial-Bundle bleibt bei 309 kB).
    - PWA Service-Worker-Precache-Limit auf 5 MB angepasst für vollständige Offline-Nutzung.
  - **JSON-Export & Batch-Import:**
    - `⚡ Alle (1284) importieren`: 1-Klick Batch-Import aller 1.284 Vorlagen in den persönlichen Tresor.
    - `📥 JSON`: Direkter Download der exportierten JSON-Bibliothek (`public/godofprompt_library_export.json`).
  - **100% Test-Abdeckung:** Integrationstests in `src/test/features/promptVault.test.jsx` (61/61 Tests grün).
  - **8 dedizierte Feature-Test-Suiten:**
    - `crm.test.jsx`: Mini-CRM & Sales-Pipeline, Lead-Neuanlage, Phasenwechsel & Löschen.
    - `kanban.test.jsx`: Aufgaben-Erstellung, Spalten-Zuweisung, Status & Inbox-Konvertierung.
    - `salesAndSop.test.jsx`: ROI-Kalkulator-Formeln, Fördermittel-Regionen & aktive SOP-Checklisten.
    - `promptVault.test.jsx`: Prompt-Vault Baukasten, Vorlagen-Erstellung, Platzhalter & Suche.
    - `commandCenter.test.jsx`: Master-Logbuch Bearbeitung, Roadmap-Matrix & Meilensteine.
    - `coaching.test.jsx`: PIN-Gate Schutz, Life OS Belohnungs-Shop & Disziplin-Strafen.
    - `syncAndBackup.test.jsx`: Data Hub JSON-Schema Backup, Notfall-Snapshots & Offline Sync-Queue.
    - `dashboard.test.jsx`: Voice Quick-Capture Studio, Tag-Pills & Multi-Target Routing.
  - **Komfortable NPM-Schnellstartbefehle:** `npm run test:crm`, `npm run test:kanban`, `npm run test:sales`, `npm run test:prompts`, `npm run test:command`, `npm run test:coaching`, `npm run test:sync`, `npm run test:dashboard`, `npm run test:features` (führt alle Feature-Tests in ~3.9s aus) und `npm run test:all`.
  - **Dokumentation in README.md:** Übersichtstabelle aller Testbefehle und Testkonzepte.

### Fixed
- **⚡ Bugfix Cockpit Quick-Links (ReferenceError):**
  - Behebung des `ReferenceError: handleAddDashboardLink is not defined` beim Aktivieren oder Nutzen des Quick-Link-Widgets im Gründer-Cockpit (`DashboardView.jsx`).
  - Vereinheitlichung der Handler- und Prop-Namen (`handleAddQuickLink` und `handleDeleteQuickLink`) sowie Absicherung gegen `undefined` mit Fallback-Werten.
- **🔒 Sicherheit: Entfernen von Hardcoded Fallback-PINs & Passworthärtung:**
  - In `App.jsx` wurde die statische Fallback-PIN `'2026'` bei der Verifizierung entfernt. Geänderte Master-PINs greifen nun strikt ohne Hintertür.
  - In `CoachingLivePortal.jsx` wurde der Fallback `'1234'` entfernt. Das Portal wird nun ausschließlich durch die konfigurierte `portalPin` freigeschaltet.
  - Hinzufügen von Regressions-Tests in `App.test.jsx` zur Absicherung benutzerdefinierter PINs.
- **🛡️ Sicherheit & Architektur: Zentralisierung der Supabase Backend-Konfiguration:**
  - Vollständige Bereinigung hartcodierter JWT-Anon-Keys aus `supabase.js`, `LeadsView.jsx` und `App.jsx`.
  - Saubere Injektion und Standardisierung über `import.meta.env.VITE_SUPABASE_URL` und `import.meta.env.VITE_SUPABASE_ANON_KEY` in `.env`.

### Added
- **📱 100% Offline-Fähigkeit & PWA-Integration (Progressive Web App):**
  - **Service Worker & Workbox Caching (`vite-plugin-pwa`, `vite.config.js`):** Vollständiges Offline-Caching aller Kern-Dateien (HTML, JS, CSS, Icons) und externer Google Fonts über Workbox Runtime-Caching.
  - **Web App Manifest (`manifest.webmanifest`):** Vollbild-Start, Theme-Color (`#0f172a`), App-Icons und Standalone-Modus für mobile Geräte (Android & iOS).
  - **Automatisches Service-Worker Lifecycle Management (`src/main.jsx`):** Sofortige Aktivierung und Hintergrund-Updates bei erneuter Internetverbindung.
  - **Capacitor Sync (`npx cap sync`):** Synchronisation der offline-optimierten Web-Assets in das native Android-Projekt.
- **🌐 KMU Service Harz Website-Relaunch & Neue Positionierung:**
  - **Neues Leitmotiv & Positionierung:** *„Der Handwerker für digitale Infrastruktur“* & *„Schluss mit dem Büro-Sonntag. Lautlose digitale Workflows für Handwerk & Mittelstand im Harz.“*
  - **Dreistufige Preistreppe (Productized Services):**
    - *Stufe 1: Büro-Potenzial-Audit (500 € Festpreis)* – 90 Min Analyse vor Ort oder per Video, schriftlicher ROI-Fahrplan mit den 3 größten Zeitfressern.
    - *Stufe 2: Das Standard-Setup (2.000 € Festpreis, Bestseller)* – Vollständige Integration (Drive/Mail/WhatsApp ➔ Lexoffice ➔ DATEV), 100% E-Rechnung (EN 16931 / ZUGFeRD) & GoBD, 14 Tage Begleitung, 35–50% Fördermittel-Zuschuss (Digitalbonus).
    - *Stufe 3: Digitaler Hausmeister (200 € / Monat)* – 24/7 Schnittstellen-Monitoring, sofortige Drittanbieter-Update-Korrekturen, 1h Kontingent.
  - **Showcase & Praxis-Fallstudie „GoClean Harz“:** Interaktiver Vorher/Nachher-Gegenüberstellungs-Schalter, Metriken-Kacheln (6+ Std. Ersparnis/Woche, 0 Zettelstapel, 100% GoBD/DATEV), Kundenzitat und visueller 3-Schritte-Belegablauf (Smartphone ➔ Lexoffice ➔ DATEV).
  - **Praxisnaher Handwerker-ROI-Rechner:** Schieberegler für Mitarbeiterzahl (1–20), wöchentliche Belege/Zettel (10–150) und Meister-/Bürostundensatz (35–95 €/h) mit Berechnung geretteter Büro-Sonntage pro Jahr, monatlich gewonnener Stunden und Euro-Ersparnis.
  - **„Ihre Werkzeuge bleiben“-Brücken-Grid:** Vorstellung der nahtlosen Integration von Lexoffice, DATEV, WhatsApp Business, Google Workspace und Make.com.
  - **🎨 3-Design-Theme-Switcher:** Live-Umschaltung in der Header-Leiste zwischen 🌲 *Harz & Handwerk* (Waldgrün/Bernstein), ⚡ *Modernes Tech-Handwerk* (Schieferblau/Smaragd) und 🛠️ *Industrie & Klarheit* (Anthrazit/Orange), plus Hell/Dunkel-Kontrast-Modus.
  - **Standort- & Rechtsangaben:** Vollständige DDG § 5 & MStV § 18 Konformität für KMU Service Harz UG (haftungsbeschränkt) i.G. / Robin Gornitzka mit Standort 38685 Langelsheim & Landkreis Goslar.

- **🎙️ Voice Quick-Capture Studio (Feature 2 - v28):**
  - **Diktier- und Audio-Studio im Cockpit (`VoiceQuickCaptureWidget.jsx`):** 1-Tap Sprachaufzeichnung mit animiertem Wave-Puls und synthetischem Doppelton-Feedback via Web Audio API (Start-, Stop- und Success-Chime).
  - **Multi-Ziel-Routing:** 1-Klick Einsortierung diktierter oder getippter Gedanken in `To-Do` (Aufgabenliste), `Notiz` (Notizblätter), `Tages-Fokus` (Hauptziel), `CRM / Lead` (Kundenkartei) oder `Termin` (Kalenderagenda).
  - **Interaktive Tag-Pills:** Schnelles Hinzufügen von Schlagworten (`#Wichtig`, `#Kunde`, `#Idee`, `#Habit`, `#Dringend`, `#HarzKMU`).
- **📦 1-Klick Data Hub & Backup Manager (Feature 3 - v28):**
  - **Voll- & Selektiv-Backup (`BackupManagerModal.jsx`, `backupService.js`):** 1-Klick JSON-Export aller 7 Kernmodule oder gezielte Auswahl einzelner Datenbereiche (CRM, Notizen, Prompts, Gamification, Tasks, Roadmap, Settings).
  - **Sicherer Restore mit Pre-Flight Inspektor:** Drag & Drop Import von `.json`-Backups mit Schema-Validierung, Entitäten-Zähler (Leads, Prompts, Level/XP) und Versionsprüfung.
  - **Automatischer Notfall-Rollback Snapshot:** Vor jedem Restore wird automatisch ein Snapshot des aktuellen Stands erstellt, der im Notfall mit 1 Klick wiederhergestellt werden kann.
  - **Header-Schnellzugriff:** Neuer Topbar-Button `📦 Data Hub`.
- **🗺️ Interaktive Gründungs-Roadmap & Meilenstein-Matrix (Feature 13 - v28):**
  - **4-Phasen-Modell für KMU Service Harz (`FoundingRoadmapMatrix.jsx`, `roadmapData.js`):**
    - *Phase 1:* Fundament, Behörden & Finanzen (Gewerbe, Einstiegsgeld, Tragfähigkeit, Notar, B2B-Konto)
    - *Phase 2:* Pilot-Kunden & Harz-Netzwerk (3 Pilot-Betriebe, Onboarding im Praxiseinsatz, Case Studies)
    - *Phase 3:* Digitaler Produkt- & Automations-Stack (Make.com, E-Rechnung, Mandantenportal)
    - *Phase 4:* Skalierung & KMU Service Harz Marktreife (Monats-Retainer, WiReGo-Kooperation, Neukunden-Funnel)
  - **Ampelsystem & Interaktivität:** Status-Pills (`⚪ Geplant`, `🟡 In Arbeit`, `🔴 Blockiert`, `🟢 Erledigt`), interaktive Kriterien-Checklisten und Fristen.
  - **Life OS Gamification Integration:** Direkte Gutschrift von XP (+150 XP) und Life-Coins (+50 Coins) beim Erreichen von Meilensteinen mit Konfetti-Animation.
- **🛡️ Resilienz, Offline-Queue & Datenvalidierung (Groß-Optimierung Batch 3):**
  - **Offline-First Synchronisations-Warteschlange (`syncQueue.js`):** Pufferung aller fehlgeschlagenen oder offline durchgeführten Supabase-Aktionen (Notizen, Leads, Prompts) im `localStorage` mit automatischem Reconnect-Flush und Deduplizierung.
  - **Automatische Queue-Abarbeitung:** Integration von `flushOfflineQueueWithSupabase` im Cloud-Sync-Zyklus und Event-Listener für Reconnects.
  - **Umfassende Validierungs- & Sanitization-Bibliothek (`validation.js`):** Sichere Validierung und Bereinigung von Web-URLs (automatisches Ergänzen von `https://`), Telefonnummern (Klick-to-Call), E-Mail-Adressen, Gemini API-Keys und XSS-Sanitization.
  - **Sanitization im CRM-Drawer (`CrmDrawer.jsx`):** Automatische Bereinigung und Validierung von Dokumenten- und Weblinks beim Erstellen.
- **⚡ Performance, Code-Splitting & Lazy Loading (Groß-Optimierung Batch 2):**
  - **Asynchrones Code-Splitting (`React.lazy` & `Suspense`):** Alle 10 schweren Unterseiten (`WebsiteView`, `SopManager`, `PromptVault`, `DocsHub`, `CommandCenter`, `CoachingLivePortal`, `KanbanBoard`, `CrmPipeline`, `LeadsView`, `OnboardingView`) werden nun bedarfsgesteuert erst beim Klick geladen.
  - **Reduzierung des Initial-Bundles um über 75%:** Initiales JavaScript-Paket schrumpfte von 1.13 MB auf nur noch 260 kB (76 kB komprimiert), was zu einem blitzschnellen Erststart auf Smartphones führt.
  - **Animierter Skeleton-Loader (`SkeletonLoader.jsx`):** Shimmer-Platzhalter bei dynamischem Nachladen von Unterseiten.
  - **Vendor-Chunk-Splitting in `vite.config.js`:** Saubere Aufteilung von Vendor-Abhängigkeiten in separate Cache-Chunks (`vendor-react`, `vendor-icons`, `vendor-pdf`).
- **🏗️ Architektur-Fundament & Modularisierung (Groß-Optimierung Batch 1):**
  - **Kaltakquise-Leads (`LeadsView.jsx`):** Vollständige Entflechtung der Kaltakquise- und Lead-Verwaltung aus `App.jsx` in eine eigenständige, saubere Komponente mit regionalem Filter und Cloud-Sync.
  - **Kunden-Onboarding (`OnboardingView.jsx`):** Kapselung des interaktiven Onboarding-Leitfadens mit Playbook-Wizard, Digitalisierungs-Potenzialrechner, Web Speech API Diktat und PDF-Generierung via `jspdf`.
  - **CRM Contact Drawer (`CrmDrawer.jsx`):** Auslagerung des Detail-Panels mit Notizen, Dokumentenlinks und Aktivitäts-Historie.
  - **Dokumenten-Editor (`DocumentEditorModal.jsx`):** Auslagerung des Texteditor-Modals (Mini-Word) mit Escape-Key Support.
  - **Präsentations-Lightbox (`LightboxModal.jsx`):** Kapselung des Vollbild-Grafikbetrachters.
  - **React Error Boundary (`ErrorBoundary.jsx`):** Ausfallsichere Schutz-Komponente für alle Routen gegen unerwartete Laufzeitfehler mit 1-Klick Wiederherstellung.
  - **Wiederverwendbare Custom Hooks:**
    - `useLocalStorage.js`: Typsicheres, fehlertolerantes Lesen und Schreiben im Browser-Storage.
    - `useDebounce.js`: Universelle Entprellung für Suche und Auto-Save.
    - `useSpeechRecognition.js`: Kapselung der Web Speech API für komfortables Diktieren.
    - `useOnlineStatus.js`: Echtzeit-Erkennung von Online- und Offline-Zuständen.
    - `useToast.js`: Flexibles Toast-Notification-System mit Auto-Dismiss.
- **🎯 Coaching Live-Portal & Grafik-/Persona-Anhänge (Phase v27):**
  - **🖼️ Datei- & Grafik-Anhänge (Direct Upload):** Support von Bilddateien (PNG, JPG, WEBP, SVG) und Dokumenten (PDF) direkt an Coaching-Termine im Command Center, an Kanban-Aufgaben und im Wissens-Hub (DocsHub).
  - **🔍 Vollbild-Präsentationsmodus (Lightbox):** 1-Klick auf beliebige Grafiken öffnet eine hochauflösende Präsentations-Lightbox mit Herunterladen-Option zum mobilen und Desktop-Vorzeigen.
  - **🔒 Geschütztes Coaching Live-Portal (`CoachingLivePortal.jsx`):** Dedizierte Präsentations-Ansicht für Zoom/Teams-Calls mit PIN-Schutz (`1234`). Zeigt Coaching-Fortschritt, meilensteine, erledigte To-Dos und Personas-Galerie – bei 100%igem Schutz von privaten Notizen, Finanzen, CRM-Kontakten oder Admin-Funktionen.
- **🌐 KMU Service Harz Webseiten-Konzeption & Multi-Page Live-Preview (Upgrade):**
  - **Startseiten Redesign:** Die 3 Leistungs-Teaser auf der Startseite nutzen jetzt das gleiche moderne B2B-Karten-Layout mit Säulen-Badges und kreisrunden Check-Bullets.
  - **⚡ Vorher-vs-Nachher Vergleichs-Toggle:** Interaktives Element auf der Startseite zur direkten Gegenüberstellung von manueller Zettelwirtschaft vs. moderner Automatisierung.
  - **🎯 Interaktiver 1-Minuten Schnell-Check (Quiz):** 3-Fragen Selbsttest für Webseiten-Besucher zur Ermittlung ihres digitalen Reifegrades (in %) mit automatischer Auswertung.
  - **📍 Harzer Praxis-Beispiele (Case Studies):** 3 regionale Erfolgsbeispiele (Tischlerei, Haustechnik, Sanitär) mit konkreten Kennzahlen zur Zeitersparnis.
  - **❓ FAQ Akkordeon:** Aufklappbare Fragen & Antworten zu Vorkenntnissen, Datenschutz, Kosten & Ablauf.

### Fixed
- **☁️ Supabase Cloud Prompt-Synchronisierung (Phase v28):**
  - **Schema-Korrektur in Supabase:** Hinzufügen der fehlenden Spalten `is_pinned` (boolean) und `history` (jsonb) in der Supabase `public.prompts` Tabelle, wodurch die REST-API Aufrufe von PostgREST zuvor abgelehnt wurden.
  - **Doppelte Ausfallsicherheit (Dual-Backup):** Prompts werden nun wie Notizen und Widgets zusätzlich verschlüsselt in der `dashboard_state` Cloud-Zeile gesichert.
  - **Synchone Zustandsspeicherung:** Synchrone Updates von State, LocalStorage und Supabase Cloud-Upsert beim Erstellen, Pinnen, Vorlagen-Übernehmen, Versionieren und Löschen.
- **Navigation & Scroll-to-Top:** Beim Klick auf *"Zum ROI-Rechner"*, *"Alle Details ansehen"* oder Unterseiten-Buttons wird nun automatisch flüssig an den Seitenanfang gewechselt, sodass der Seitenwechsel sofort sichtbar ist.
- **🎮 Transformation zu Life & Founder OS (Life OS Gamification System):**
  - **Level, XP & Coins System:** Jede erledigte Tages-Gewohnheit und jede Fokus-Aufgabe belohnt den Nutzer mit XP (z. B. +50 XP) und Life-Coins. Alle 200 XP wird ein automatisches Level-Up getriggert.
  - **🎁 Belohnungs-Shop (Münzen einlösen):** Interaktiver Modal-Shop zum Freischalten von selbstdefinierten Belohnungen (z. B. *30 Min Zocken*, *Filmabend*, *Lieblings-Cheat Meal*, *Tech-Gadget*). Enthält Fortschrittsbalken, Münzen-Prüfung, Konfetti und Freischalt-Zertifikat.
  - **🛡️ Disziplin- & Bestrafungs-Manager:** 3 konfigurierbare Anti-Faulheit-Modi bei nicht eingehaltenen Gewohnheiten:
    - *Modus A (Münz-Abzug / XP-Schulden):* Belohnungs-Shop wird bei negativer Coins-Bilanz gesperrt.
    - *Modus B (Straf-Aufgaben):* Disziplin-Challenges (z. B. 30 Liegestütze, 10 Min Aufräumen, Sparschwein).
    - *Modus C (Strike-System):* 3 verpasste Habits führen zu einer 48h Belohnungs-Sperre.
  - **🛌 Smart Routine & Ruhetags-Erkennung:** Wochentagsbezogene habits (z. B. Kraftsport an Mo/Mi/Fr, Make Academy an Mo-Fr). An regenerativen Tagen (Di/Do/Sa/So) zeigt die App explizit einen **grünen Ruhetag-Hinweis** (`🛌 Kraftsport: Ruhetag / Regenerieren! Kein Workout heute nötig`), um schlechtes Gewissen zu vermeiden.
  - **⚡ Make Academy & Lern-Tracker:** Integrierte Tages-Fortschrittsanzeige für Make Academy Lerneinheiten.
  - **Rebranding zu Life & Founder OS:** Erweitertes Dashboard-HUD und angepasste Sidebar-Navigation.
- **🔬 Deep Research Frameworks & Erweiterter Prompt-Baukasten (Phase v27):**
  - **5 Spezialisierte Deep Research Frameworks:** Auswahl im Prompt Vault zwischen 📊 Lead & SWOT, 🎯 Wettbewerber-Analyse, 📈 Marktforschung & Trends, 🛠️ Tool-Vergleich und 👥 Buyer Persona.
  - **Neuer KI-Optimierer:** Generiert per Ollama / Gemini API aus einfachen Themen einen hochspezialisierten Master-Prompt zugeschnitten auf das gewählte Recherche-Framework.
  - **Kategorie `🔬 Lead- & Research-Bausteine`:** 1-Klick-Module für *Entscheider & Kontakte*, *SWOT-Matrix*, *Digitalisierungsgrad*, *SEO & Web-Präsenz*, *Schmerzpunkt-Analyse* und *Bonität & Firmengröße*.
  - **Aufgestockter Baukasten:** Neue B2B-Rollen (*Lead Researcher*, *B2B Sales Strategist*), Tonalitäten (*Analytisch & Datenbasiert*, *CEO-Prägnant*) und Formate (*SWOT-Grid*, *Executive Summary*).
- **📌 Multi-Notizen System & Cloud-Sync (Handy ↔ PC):**
  - **Erstellung mehrerer Notizen:** Der Benutzer kann über `+ Neue Notiz` beliebig viele unabhängige Notizblätter erstellen.
  - **Eigene Titel & Farben:** Jede Notiz lässt sich individuell benennen (z. B. *"Anrufe"*, *"Ideen"*, *"Roadmap"*) und farblich anpassen (Gelb, Blau, Grün, Pink, Lila).
  - **Schneller Notiz-Wechsel:** Horizontale Notiz-Tab-Leiste zum 1-Klick-Umschalten zwischen aktiven Notizblättern.
  - **Automatische Migration & Abwärtskompatibilität:** Bisherige Einzelnotizen werden beim Start lückenlos als *"Notiz 1"* übernommen.
  - **Supabase Cloud-Sync (`dash_notes_list`):** Alle Notizen werden geräteübergreifend in Supabase und `localStorage` gesichert.

### Fixed
- **📌 Notizblock & TODO Cloud- & Local-Synchronisation Fix (Smartphone ↔ PC):**
  - **Kein Datenverlust beim Neuladen der Seite:** Behebung des Fehlers, dass neu eingegebene Notizen oder To-Dos beim Druck auf F5/Neuladen oder nach App-Wechsel gelöscht oder auf einen alten Stand zurückgesetzt wurden.
  - **Zeitstempel-basierte Konfliktauflösung:** Wenn lokale Notizen oder To-Dos neuer sind als der Cloud-Datenbankstand (`updated_at`), schützt die App die lokalen Daten und überträgt sie direkt in die Cloud, statt sie mit veralteten Serverdaten zu überschreiben.
  - **Sofortiges Speichern bei `onBlur` & App-Wechsel:** Beim Verlassen der Notizfelder (`onBlur`), beim Wechseln in andere Smartphone-Apps (`visibilitychange`) oder beim Schließen des Browser-Tabs (`beforeunload` mit `keepalive: true`) werden Änderungen sofort an Supabase geflusht.
  - **Echtzeit-Synchronisation für leere To-Do-Listen:** Korrektur des Array-Checks (`Array.isArray(state.dash_todos)`), sodass das vollständige Abhaken oder Löschen von Aufgaben auf allen Geräten korrekt gespiegelt wird.
- **📱↔️💻 Prompt Vault Bidirektionale Auto-Synchronisierung (Handy & PC):**
  - **Auto-Push für un-synchronisierte Prompts:** Behebung des Fehlers, dass auf dem Smartphone erstellte Prompts nicht auf dem PC erschienen. Alle noch nicht synchronisierten Prompts (`synced: false`) werden beim Cloud-Sync oder reconnect automatisch vor dem Abruf zu Supabase hochgeladen.
  - **Nahtlose Gerätessynchronisation:** Automatische Ausführung der bidirektionalen Synchronisierung beim App-Start, bei Re-Connect (`isOnline`), beim Wechseln in die App (`focus`) und im 30-Sekunden-Hintergrundintervall.
  - **Klare Status-Badges:** Transparenter visueller Indikator an Prompt-Karten (`☁️ Cloud` vs. `📱 Lokal (Sync ausstehend)`).
- **☁️ Handy & PC Daten-Synchronisation & Supabase Wiederherstellung:**
  - **Supabase-Backend aufgeweckt:** Reaktivierung des ruhenden Supabase-Projekts sowie Erstellung der Tabellen `dashboard_state`, `prompts` und `leads` mit RLS-Freigaben.
  - **Schutz vor Startseiten-Überschreibung:** Behebung einer Race-Condition beim App-Start, bei der leere lokale Notizen die Handy-Notizen in Supabase überschreiben konnten (`isInitialStateLoaded`).
  - **Server-Priorität bei Prompt-Merging:** Cloud-Prompts erhalten beim Synchronisieren automatisch Vorrang vor veralteten lokalen Browser-Prompts.
  - **Automatisches Re-Sync bei Fenster-Fokus:** Wechselt der Nutzer am PC auf den Browser-Tab, werden Notizen & Prompts sofort aus Supabase nachgeladen (`window.focus` & 30s Polling).
- **📌 Prompt Pinning Cloud-Sync:** Der Favoriten-Status (`isPinned`) von Prompts wird nun sofort in der Supabase-Datenbank aktualisiert und geräteübergreifend gespiegelt.

### Added
- **🏢 KMU & Harz Spezial-Prompt-Bibliothek (Idee 4):**
  - Vordefinierte Best-Practice Prompt-Bibliothek (`kmuPrompts.js`) mit 12+ praxiserprobten Vorlagen für regionale KMU (Angebots-Nachfassung, Einwandbehandlung "Zu teuer", Preiserhöhungen, Recruiting, DSGVO, Google Business Beiträge).
  - Neuer Tab / Filter `🏢 KMU Harz Vorlagen` im Prompt Vault mit 1-Klick-Übernahme (`➕ In meinen Tresor übernehmen`) in die eigene Supabase-Cloud-Bibliothek.
- **📜 Prompt-Versionierung & Änderungshistorie (Idee 5):**
  - Automatische Speicherung früherer Prompt-Stände bei Bearbeitung oder KI-Optimierung.
  - Neuer `📜 X Versionen` Button an Prompt-Karten und interaktives Versions-Modal zum Vergleichen und 1-Klick **Wiederherstellen** beliebiger älterer Stände.
- **📌 Dashboard Notizzettel Upgraded & Cloud-Sync Fix:**
  - **Supabase Cloud-Sync:** Notizzettel-Inhalt und Notizfarbe (`stickyNoteColor`) werden nun lückenlos in Supabase `dashboard_state` gesichert und geräteübergreifend gespiegelt.
  - **Live Cloud-Status Badge:** Visueller Indikator (`☁️ Cloud-gesichert` / `🔄 Speichert...`) direkt im Notizzettel-Header.
  - **Komfort-Funktionen:** Echtzeit Wort- & Zeichenzähler sowie 1-Klick Kopier-Button (`📋 Kopieren`).

- **🔄 Cloud Sync Status Indicator:** Live-Anzeige (`☁️ Synchronisiert` / `🔄 Syncing` / `⚠️ Sync-Fehler`) mit Klick-Aktion für manuelles Re-Sync in der App-Headerleiste.

### Added
- **🎨 Freie Widget-Reihenfolge & Verschiebung im Dashboard-Editor:**
  - **Dynamische Positionssteuerung:** Jedes der 12 Widgets besitzt im Layout-Editor nun eine Positions-Markierung (`#1`, `#2`...) und Pfeil-Tasten (`⬆️ Nach oben` / `⬇️ Nach unten`), um die Anordnung auf dem Dashboard beliebig zu verändern.
  - **Button Standard-Reihenfolge:** Ein-Klick Wiederherstellen der ursprünglichen Standardanordnung.
  - **Geräteübergreifer Auto-Sync:** Die individuelle Reihenfolge wird automatisch lokal und in Supabase gespeichert und auf Handy und PC synchron gehalten.
- **☁️ Supabase Cloud Auto-Sync für Dashboard State (Notizen, To-Dos & Layout):**
  - **Echtzeit-Synchronisation zwischen Geräten:** Dashboard-Notizen (`dashNotes`), Dashboard-To-Dos (`dashTodos`), Widget-Layout (`dashboardWidgets`) und Modus (`dashboardMode`) werden beim Start automatisch aus der Supabase-Tabelle `dashboard_state` geladen.
  - **Automatisches Speichern:** Jede Änderung am Handy oder PC wird im Hintergrund nach 1 Sekunde nahtlos in die Cloud-Datenbank übertragen.

### Fixed
- **📱 Mobilgeräte Prompts Supabase-Sync Payload:** Bereinigung des Payload-Schemas in `savePromptToSupabase`, sodass zusätzliche Frontend-Eigenschaften (`isPinned`, `synced`) nicht mehr zu Schema-Fehlern in Supabase führen und Prompts zuverlässig auf Mobilgeräten gespeichert werden.

### Added
- **⚡ KI-Prompt-Zentrale Upgrade & Supabase Auto-Sync:**
  - **Sofortige Cloud-Synchronisation:** Beim Erstellen oder Löschen von Prompts wird die Supabase-Datenbank direkt im Hintergrund aktualisiert.
  - **Sync-Status-Badges (`☁️ Cloud` vs `📱 Lokal`):** Transparente Anzeige an jeder Prompt-Karte, ob der Prompt bereits in Supabase vorliegt.
  - **Vorher / Nachher KI-Diff Modal:** Side-by-Side Nebeneinander-Vergleich von Original-Entwurf und KI-optimierter Fassung mit direkter Übernahmemöglichkeit.
  - **Gezielte KI-Optimierungs-Modi:** Auswahlleiste für 4 Optimierungs-Ziele (*🎯 Standard*, *✂️ Kurz & Präzise*, *🌍 Englisch*, *🛡️ Datenschutz*).
  - **Dynamische Variablen-Substitution (`{{Variable}}`):** Beim Kopieren von Prompts mit Platzhaltern öffnet sich automatisch ein Ausfüll-Modal zur Live-Generierung.
  - **Favoriten / Anpinnen (`📌`):** Prompts können angepinnt und automatisch nach oben sortiert werden.
  - **Prompts Import & Export:** Ein-Klick JSON-Export und JSON-Import für Prompt-Bibliotheken.
  - **Moderne Toast-Notifications:** Schwebendes Benachrichtigungs-System anstelle blockierender Browser-`alert()`s.
- **🔒 Master-PIN Sperrbildschirm (App-Sicherheit):**
  - **Sicherheits-Verriegelung:** Die gesamte App wird beim Aufrufen über Vercel durch einen modernen 4-stelligen Master-PIN Sperrbildschirm geschützt (Standard-PIN: `2026`).
  - **Manuelles Sperren:** Neuer Button `🔒 App sperren` in der App-Kopfzeile zum sofortigen Sperren der aktuellen Sitzung.
- **🔄 Bi-direktionaler Google Drive Import & Lokaler Datei-Upload:**
  - **Drive ➔ App Download:** Button `☁️ aus Google Drive in App laden` lädt automatisch alle Recherche-Dateien aus deinem Projektordner herunter und speichert sie in der App.
  - **Lokaler Ordner-Import:** Button `📁 Dateien importieren` erlaubt das gleichzeitige Auswählen mehrerer `.txt`/`.md`-Dateien von deinem Rechner.
- **🧠 Schnellfrage an das Firmengehirn & Folge-Task Generator:**
  - **Direkte RAG-Suche:** Neues KI-Widget im Command Center zum sofortigen Stellen von Fragen an deine Dokumente (z.B. Fördermittel-Status).
  - **Mehrstufige KI-Fallback-Kette:** Kombiniert Gemini API, lokales Ollama (Llama 3.2) und Volltextsuche.
  - **Cross-Document Folge-Tasks:** Ändert sich ein Parameter im Strategie-Cockpit, wird automatisch eine Folge-Aufgabe (z.B. `[Businessplan-Update]`) in deine Meilenstein-Checkliste eingetragen.
- **📊 Visuelles Strategie-Cockpit & Command Center v2:**
  - **Gründungs-Bereitschafts-Score:** Dynamische Prozentanzeige der Launch-Bereitschaft basierend auf fixierten vs. offenen Strategie-Variablen.
  - **Schnell-Erfassung für Coach-Meetings:** Dialog-Modal (`+ Coach-Termin eintragen`) zur strukturierten Eingabe von Beratungsergebnissen und automatischer Übernahme neuer Hausaufgaben.
  - **Klappbares Akkordeon-System:** Aufteilung des Command Centers in 5 aufgeräumte Kacheln (Meilensteine, Preispakete, Formeller Fahrplan, Gründungsprotokoll, Roh-Text-Editor).
  - **Dynamische Statuserkennung:** Automatische Badges (`🔴 Offen / Entwurf` vs. `🟢 Fixiert`) für Gründungsdatum, Notar, B2B-Konto und Jobcenter-Anträge.
- **📁 Echter Google Drive Live-Sync:**
  - **REST API Live-Synchronisation:** Integration des Google Identity Services (`gis`) und der Google Drive REST API.
  - **OAuth2 Token Client:** Sichere Autorisierung über Google Login-Popup (`drive.file`-Scope) direkt in der React App.
  - **Automatisierte Ablage:** Automatisches Erstellen des Projektordners `KMU Service Harz (Founder OS)` in Google Drive und Synchronisierung (Erstellen/Überschreiben) aller Dokumente.
- **🔄 Unified To-Dos (Bi-direktionaler Sync):**
  - **Logbuch-Checklisten-Sync:** Vollständige Koppelung der To-Do Checkliste im Command Center mit `TEIL 7` von `masterLogbuch.txt`.
  - **Zwei-Wege-Datenstrom:** Checkbox-Klicks aktualisieren in Echtzeit den Dokumenten-Text; das manuelle Ändern der Checkboxen (`[ ]` / `[x]`) im Editor oder das Hinzufügen/Löschen von Zeilen aktualisiert synchron die Checkliste.
- **⚡ Eigenständiger Command Center Tab (Gründung & Business):**
  - **Standalone Ansicht:** Neues `CommandCenter.jsx` Modul als eigenständiger Tab direkt unter dem Dashboard in der Seitenleiste (Desktop & Mobile) verlinkt.
  - **Zentraler Workspace:** Vereint die interaktive Meilenstein-Checkliste (inklusive der neuen Business-To-Dos) und die Direkt-Bearbeitung von `masterLogbuch.txt` an einem Ort.
  - **Datenschutz & Sync Info:** Erklärung des Local-First & Supabase Cloud Sync Modells zur Datensicherheit direkt im Banner sichtbar.
  - **Cleanup DocsHub:** Redundante To-Do-Listen und Logbuch-Felder aus `DocsHub.jsx` entfernt, sodass der Tab fokussiert bleibt auf Dokumente, NotebookLM und Cloud-Sync.
- **💼 Integration von Business- & Coaching-Aufgaben:**
  - **Coaching-Vorgaben & To-Dos:** MVP-Ausarbeitung und Fördermittelrecherche als standardmäßige, sichtbare Business-Meilensteine in `STATUS.md` und `DocsHub.jsx` (`INITIAL_STATUS_TODOS` / `CommandCenter.jsx`) hinzugefügt.
  - **Master-Logbuch Ergänzung:** Eintragung des Beratungstermins vom 28.07.2026 im chronologischen Gründungs-Logbuch von `masterLogbuch.js` (Hausaufgaben und nächste strategische Schritte zu MVP und Förderung).
- **🚀 Master Command Center & STATUS.md Dashboard:**
  - **STATUS.md:** Erstellung einer zentralen Projekt-Statusdatei im Root-Verzeichnis (`STATUS.md`).
  - **Interaktives To-Do Board:** Dynamische Aufgabenverwaltung in `DocsHub.jsx` mit Häkchen-Status, Hinzufügen/Löschen von Aufgaben und automatischer `STATUS.md` Aktualisierung.
  - **NotebookLM 1-Klick Export:** Neue Buttons für NotebookLM Clipboard Copy, Markdown-Export und Supabase RAG Knowledge Sync.
- **📱 Telefonnummern-Anzeige im Lead-Tracker:**
  - Transparente Anzeige aller Telefonnummern direkt in den Lead-Karten sowie im Anruf-Dashboard (`📞 Tel: 039452 ...` & `📞 Anrufen (...)`).

### Fixed
- **🌐 Supabase Leads Fetch & Fallback Fix:**
  - Hinzufügen von resilienten Key- & URL-Fallbacks in `src/services/supabase.js` für reibungsloses Nachladen aller 90 Kaltakquise-Leads.
  - Einbau eines direkten `🔄 90 Cloud-Leads laden` Buttons im Lead-Tracker Header.

### Added (Previous)
  - **🔐 Glassmorphic Password Wall:** WebCrypto SHA-256 Passwort-Schutzwall in `App.jsx` zum Schutz aller Kundendaten und internen Werkzeuge im Web-Deployment.
  - **🛡️ Secure API Key Header:** Umstellung der Gemini API-Kommunikation von Query-Parametern auf den sicheren HTTP-Header `x-goog-api-key`.
  - **🔑 Env Var Extraction:** Auslagerung von Supabase-URL und Anon-Key in `import.meta.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
  - **📱 Android Hardening:** Deaktivierung von automatischen Android-Backups (`allowBackup="false"`) und Aktivierung von R8 Minification & Code-Shrinking.
- **Phase 2 Modularisierung & Architektur-Refactoring:**
  - **🧩 8 Sub-Komponenten extrahiert:** `Sidebar`, `PromptVault`, `SopManager`, `DocsHub`, `SettingsView`, `KanbanBoard`, `CrmPipeline` und `DashboardView`.
  - **⚙️ Service Layer Layering:** Dedizierte Service-Module `gemini.js`, `supabase.js` und `widget.js`.
  - **📁 Statische Daten-Auslagerung:** `masterLogbuch.js` (813 Zeilen) und `initialData.js`.
  - **⚡ Performance & Code-Reduktion:** Monolithische `src/App.jsx` von ~8.434 Zeilen auf unter ~3.800 Zeilen reduziert bei 100% grünen Vitest Integration-Tests.
- **Qualitäts- und Sicherheits-Review:**
  - **🔒 Codebase Audit:** Umfassendes Codequalität- und Sicherheitsaudit der gesamten Anwendung basierend auf den OWASP Top 10.
  - **📋 Audit-Bericht erstellt:** Ablage des Berichts unter `codebase_review_report.md` mit detaillierter Schwachstellenanalyse, God-Component-Refactoring-Plänen und einem 3-Phasen-Entwickler-Fahrplan.
- **Gemini API & Prompts Supabase Sync (Phase v17):**
  - **🚀 Google Gemini API-Integration:** Native Unterstützung von Gemini-Modellen (`gemini-3.1-flash-lite`, `gemini-3-flash`, `gemini-2.5-flash-lite`, `gemini-2.5-flash`) über die offizielle Google AI Studio API.
  - **⛓️ Intelligente Fallback-Kette:** Bei Erreichen von Ratenbegrenzungen (Rate Limits) weicht die App automatisch auf nachfolgende Modelle aus, testet danach das lokale Ollama und nutzt bei totalem Ausfall den statischen Smart-Fallback.
  - **🧠 Gemini RAG Knowledge Bot:** Der RAG Knowledge Bot ("Frag das Firmengehirn") lädt nun alle echten Wissensdokumente (inkl. `masterLogbuch.txt`) als Systemkontext und liefert echte Antworten mit Quellenangaben.
  - **⚙️ KI-Einstellungen-Panel:** Ein neues Einstellungs-Menü im Prompt-Vault-Header erlaubt das Einsehen, Ändern und Zurücksetzen des Gemini API-Schlüssels, geschützt im `localStorage` des jeweiligen Geräts.
  - **🗃️ Supabase Prompts Synchronisation:** Neue DB-Tabelle `prompts` angelegt. Vollständige bi-direktionale Cloud-Synchronisation der Prompts beim App-Start sowie direkt bei Hinzufügen/Löschen von Einträgen, um Prompts geräteübergreifend (PC & Mobil) verfügbar zu machen.
  - **🟢 Erweitertes Cloud Sync UI:** Integration der Prompts-Tabelle in den Supabase Cloud Sync Manager (Anzeige von "5 Tabellen aktiv" und Zeilenanzahl).
- **Offline-Resilienz & Local-First Konzept (Phase v16):**
  - **🔌 Netzwerkstatus-Erkennung:** Dynamische Erkennung der Internetverbindung (`window.navigator.onLine`).
  - **💾 Local-First Fallback:** Alle Schreiboperationen (Prompts, Leads-Feedback, Onboarding-Protokolle, Notizen, etc.) speichern die Daten sofort im `localStorage`. fetch-Aufrufe an die Supabase Cloud werden offline automatisch übersprungen, um Timeouts und Hänger zu verhindern.
  - **🟢 Dynamische Status-Indikatoren:** Die Cloud-Synchronisations-Panels zeigen offline den Status `🔌 OFFLINE` (mit gelbem Warnhinweis) anstelle eines fälschlichen Online-Status. Im Onboarding-Tab wird der Text zu "Offline-Modus: LOKAL SPEICHERN" angepasst.
  - **👥 Onboarding für Bestandskunden:** Im Onboarding-Select können nun neben Kaltakquise-Leads auch CRM-Kontakte ausgewählt werden. Dadurch kann das Onboarding für GoClean Harz (den Bruder) offline durchgeführt werden.
  - **📊 Initial-Leads Offline-Fallback:** Ein statisches Array `INITIAL_LEADS` mit 5 Mustereinträgen lädt, wenn beim ersten Start keine Internetverbindung vorhanden ist, sodass das Lead-Tracking nicht leer bleibt.
  - **⚠️ Webhook-Warnmeldung:** Der WhatsApp-Simulator zeigt im Offline-Modus einen gelben Hinweis, dass HTTP-POST-Weiterleitungen an Make.com temporär deaktiviert sind.
- **Kunden-Onboarding-Playbook Modul (Phase v15):**
  - **📋 Master- & Pilot-Playbooks:** Direkt integrierte Gesprächsleitfäden und strukturierte Fragen aus dem KMU-Service Harz Onboarding Playbook (10 Fragen) sowie dem GoClean Harz Bruder-Onboarding (5 Fragen).
  - **🧙 Schritt-für-Schritt-Wizard:** Interaktiver Gesprächsassistent mit Phasen-Navigation, Fortschrittsbalken und Einblendung von "Ziel & Erkenntnisse", "Folgefragen" sowie "Warnsignalen" für jede Frage zur optimalen Gesprächsführung.
  - **📝 Notizen & Antworten:** Direkte Texterfassung zu jeder Onboarding-Frage.
  - **📊 Live-Digitalisierungsrechner:** Integrierte Regler zur Erfassung von manuellen Wochenstunden, Mitarbeiter-Stundensätzen und der angenommenen Automatisierungsquote. Berechnet live die zeitliche und finanzielle Ersparnis pro Monat.
  - **🔴 Priorisierungs-Indikatoren:** Zuweisung von Dringlichkeitsstufen (Hoch/Mittel/Niedrig) direkt bei der Beantwortung jeder Frage zur Kennzeichnung von Quickwins.
  - **🎙️ Sprache-zu-Text (Diktierfunktion):** Native Spracheingabe über die Web Speech API (Mikrofon-Button), die gesprochene Notizen automatisch im deutschen Textfeld erfasst.
  - **📄 PDF-Angebot-Generator:** Generiert vollautomatisch ein schönes, mehrseitiges PDF-Angebot im Corporate Design (KMU Service Harz) inklusive Kundendaten, Onboarding-Protokoll, live berechnetem Sparpotenzial und empfohlenen nächsten Schritten.
  - **🔄 Cross-Device Cloud-Synchronisation:** Die Antworten, Prioritäten und Berechnungen werden in Echtzeit als serialisierter HTML-Kommentarblock am Ende der CRM-Notizen gespeichert. Das sichert die geräteübergreifende Synchronisation via Supabase ab.
  - **📂 Wissens-Hub Export:** Exportiert das fertig ausgefüllte Onboarding-Protokoll als formatiertes Markdown-Dokument mit einem Klick direkt in den Wissens-Hub.
- **Glassmorphic Sidebar Navigation (Phase v15):**
  - **🖥️ Desktop-Ansicht:** Einklappbare linke Seitenleiste mit schwebenden Glass-Effekten, klaren Icons und Tooltips.
  - **📱 Mobil-Ansicht:** Platzsparender Hamburger-Button im oberen Header, der ein weiches Slide-in Drawer-Menü von links öffnet.
  - Die alten horizontalen Header-Tabs und die überladene mobile Bottom-Bar wurden komplett entfernt, um Platz für künftige App-Erweiterungen zu schaffen.
- **Modulare & Einfache Dashboard-Bausteine & Mobile-Optimierung (Phase v14):**
  - **📌 Einfacher Notizzettel (Haftnotiz):** Modularer Block mit 5 auswählbaren Hintergrundfarben (Gelb, Blau, Grün, Pink, Lila) zur schnellen Ideenerfassung.
  - **✍️ Einfache Aufgabenliste (To-Do):** Eine saubere Kachel zum Eintragen, Abhaken und Löschen von Todos.
  - **📅 Einfacher Terminkalender:** Direkte Eingabe von Uhrzeit und Beschreibung zur manuellen Terminplanung, 100 % offline-fähig.
  - **🎯 Tages-Hauptziel (Fokus):** Ein großes Textfeld ganz oben auf dem Dashboard für das wichtigste Ziel des Tages.
  - **🔗 Quick-Links (Link-Sammlung):** Lesezeichen-Widget zum Hinzufügen, Aufrufen und Löschen wichtiger Web-Ressourcen.
  - **Mobile Stapel-Automatik:** Alle zweispaltigen Grids (CRM, Leads, Wissens-Hub, Simulator) stapeln sich auf Mobilgeräten automatisch sauber in einer Spalte. Grid-Spans werden auf span 1 zurückgesetzt.
  - **Kaltakquise Mobile UX:** Dynamische Einblendung des Feedback-Formulars auf Mobilgeräten nur bei ausgewähltem Lead, inklusive „← Zurück zur Lead-Liste“ Button, um langes Scrollen zu verhindern.
  - **iOS Zoom-Prävention:** Erhöhung der Mindestschriftgröße von Eingabefeldern und Selects auf 16px auf Mobilgeräten, um den Safari Auto-Zoom zu verhindern.
  - **Optimiertes Padding:** Reduziertes Seiten-Padding auf Mobilgeräten für bessere Platzausnutzung.
- **Barrierefreie IDs:** Checkboxen und Labels im Anpassungs-Menü barrierefrei verknüpft.
- **7. Integrationstest:** Automatisierte Validierung des Aktivierungs- und Buchungsprozesses in der Testsuite.
- **Lead- & Pain-Point-Tracker (Phase v13):** Ein brandneuer Navigations-Reiter "Lead-Tracker" wurde in die Desktop- und Mobilansicht integriert. Das Tool dient der Verwaltung und Protokollierung deiner Kaltakquise-Telefonate.
  - **Suche & Filter:** Suche nach Firmennamen/Branchen und filtere nach Prioritäten (A/B/C) oder Status.
  - **Click-to-Call:** Direkte Anrufe über `tel:` Links mit einem Klick auf "Jetzt anrufen".
  - **Vorbereitungsbox:** Visualisiert die vorab vermuteten Einwände und Gesprächs-Aufhänger aus deiner Excel-Tabelle.
  - **Gesprächs-Feedback Formular:** Erfassung von `Pain Point (Primär)`, `Dringlichkeit (1-5 Sterne Rating)`, `Eingangshürde/Einwand`, `Gesprächs-Aufhänger`, `Nächster Schritt` und `Bemerkungen`.
  - **Live-Supabase REST-Sync:** Speichert die geänderten Daten sofort im lokalen Speicher sowie online über eine direkte API-Schnittstelle in der neuen Supabase-Tabelle `leads`.
- **Excel-Import-Skript:** Ein robustes Python-Importskript (`import_leads.py`) wurde erstellt. Es liest deine Excel-Liste der Target-Unternehmen (`Unbenannte Tabelle (5).xlsx`) ein, dedupliziert die Einträge nach stabiler ID (MD5-Hash) und befüllt vollautomatisch die Supabase-Datenbank.
- **6. Integrationstest:** Ergänzung eines automatisierten Tests für das Öffnen des Lead-Trackers, die Mock-Datenerfassung und die Speicherung des Feedbacks in der Vitest-Suite.
- **Master-Logbuch Import:** Einbettung des vollständigen 25KB großen Master-Logbuchs (`📑 MASTER-LOGBUCH & COMMAND CENTER: KMU SERVICE HARZ`) in die "Dokumente & Sync"-Ansicht. Es steht dem Gründer nun permanent zur Bearbeitung und automatischen Speicherung zur Verfügung.
- **Automatische Upgrade-Logik:** Entwicklung einer Migrationslogik im Dokumenten-State-Lader. Veraltete Platzhalter-Logbücher im lokalen Browserspeicher werden beim App-Start automatisch auf die neueste Fassung des echten Logbuchs aktualisiert, ohne Benutzerdaten zu überschreiben.

### Changed
- **Feature 1 v10 (Menü-Tab-Splitting für KI & Docs):** Aufteilung des früheren "KI & Docs"-Tabs (Tab 4) in zwei dedizierte Menüregister: "KI Prompts" (Prompt Vault, Content-Planer und RAG Knowledge Bot) und "Dokumente & Sync" (Wissens-Hub mit Text-Editor, Google Drive/NotebookLM Sync und Supabase Cloud Sync). Ermöglicht getrennte Bedienung und deutlich mehr Übersicht auf Desktop- und Mobilgeräten.

### Added
- **Feature 1 v11 (Automatisierte Tests & Vitest Integration):** Einrichtung von Vitest und React Testing Library mit jsdom. Beinhaltet Mocks für Capacitor, jsPDF und Web Speech APIs sowie Integrationstests für das Rendering des Dashboards, den ROI-Rechner, das Tab-Menü-Routing, den Showcase-Anonymisierungsmodus und das Kanban-Board. Die Testsuite wurde auf insgesamt 5 umfassende Integrationstests ausgebaut.
- **Feature 1 v9 (Android App & native Startbildschirm-Widget):** Vollwertige Integration der nativen Android-Plattform via Capacitor. Enthält ein elegantes, dunkles native Android-Homescreen-Widget ("Founder OS • Notizen") zur offline-fähigen Live-Anzeige deiner Notizen und Aufgaben, gekoppelt über ein custom Java-Plugin (WidgetBridge).
- **Feature 1 v8 (Prompt-Suche & Filter):** Live-Suchzeile und Kategorieregister im Prompt-Vault (Tab 4). Ermöglicht die Filterung nach Begriffen oder Kategorien (Sales, Marketing, Code, Strategie) inklusive Belegzählungen.
- **Feature 2 v8 (Werksreset im Header):** Rote "Reset"-Schaltfläche im App-Header, die alle persönlichen Daten im LocalStorage löscht und die App augenblicklich auf den Standard-Demozustand zurücksetzt.
- **Feature 3 v8 (CRM-Schnellfilter):** Filterleiste mit interaktiven Status-Schaltflächen über der Kundenliste im CRM-Tab (Tab 3). Zeigt Leads nach Vertriebsstufen und die jeweilige Anzahl an.
- **Feature 4 v8 (Markdown-Toolbar für Notizen):** Usability-Toolbar (Fett, Kursiv, Listenbullet) über dem Offline-Notizen-Widget auf dem Dashboard (Tab 1), um Textpassagen direkt mit Markdown-Syntax auszustatten.
- **Feature 1 v7 (Integrierter Dokumenten-Editor / Mini-Word):** Schreib- und Editor-Overlay zur Erstellung und Modifikation von Textdokumenten direkt in der App. Bietet Offline-Downloads als Textdatei und einfaches Löschen per Mülleimer-Symbol.
- **Feature 2 v7 (Manueller Google Drive Sync):** Implementierung einer Synchronisations-Schaltfläche ("Google Drive & NotebookLM aktualisieren") mit Live-Fortschrittsanimation im Terminal zur kontrollierten Übertragung bearbeiteter (⚠️) oder neuer (☁️) Dokumente an den NotebookLM-Speicherordner.
- **Feature 1 v6 (Eigene Prompt-Bausteine verwalten):** Bereitstellung einer Verwaltungsoberfläche ("➕ Eigene Bausteine verwalten") im KI-Baukasten (Tab 4). Ermöglicht die freie Definition eigener Rollen, Stile, Formate und Suffixe mit LocalStorage-Speicherung und Löschfunktion.
- **Feature 2 v6 (100% lokales Offline-Notizen-Widget):** Hinzufügen eines neuen Kombi-Widgets für das Dashboard (Tab 1) mit unbegrenztem Scratchpad-Textfeld und einer Aufgaben-Checkliste. Läuft absolut ohne Internet oder KI-Modelle vollständig offline.
- **Feature 3 v6 (Google Calendar/Drive OAuth & Live-Sync Konzept):** Erstellung eines technischen Live-Sync-Betriebskonzepts sowie Einbau einer interaktiven Google-OAuth-Verbindung samt synchronisiertem Protokoll-Log-Terminal im Kalender-Widget.
- **Feature 5 v5 (Android WebView Wrapper & Push-Konzept):** Bereitstellung einer `capacitor.config.json` zur Android-Kompilierung. Erstellung eines detaillierten Android-Integrationsleitfadens mit Anbindung an das Firebase Cloud Messaging (FCM) Push-Gateway, Codebeispielen für Push-Listener in React sowie Supabase-Deno-Edge-Functions für automatisierte Benachrichtigungen.
- **Feature 4 v5 (Sprach-zu-Text via Web Speech API):** Integration von Mikrofon-Diktierknöpfen im Quick Capture-Widget (Dashboard) sowie im CRM-Kunden-Notizenbereich. Ermöglicht offline-fähiges Diktieren von Notizen auf Deutsch mit visuellem Puls-Indikator.
- **Feature 3 v5 (NLP-Kalenderschnellerfassung & KI-Tagesplaner):** Integration eines Freitext-NLP-Eingabefeldes im Google Kalender-Widget (Tab 1), um Termine per natürlicher Sprache ("Morgen 14 Uhr Müller") zu erstellen. Ergänzung eines "⚡ KI-Tagesplan" Buttons im Tagesfokus-Widget zur automatischen Generierung von To-Dos basierend auf heutigen Kalenderereignissen und CRM-Leads.
- **Feature 2 v5 (Personalisierbares Dashboard):** Implementierung einer Layout-Steuerung am oberen Rand des Dashboards (Tab 1) mit einem "Layout anpassen" Einstellungs-Panel, über das Toggles für alle 6 Kern-Widgets (Finanz-Cockpit, E-Rechnungen, Quick Capture, Google Kalender, Habits, Wochen-Archiv) ein- und ausgeblendet werden können (inkl. LocalStorage-Persistierung).
- **Feature 1 v5 (Prompt-Baukasten & Ollama KI-Optimierer):** Erweiterung des Prompt-Vaults im KI-Tab (Tab 4) um ein modulares Klick-Bausteinsystem (Prefix-Rollen, Tonalität, Ausgabeformat, Suffix-Aktionen) zur schnellen Prompt-Synthese sowie direkte Integration eines API-Optimierers für eine lokale Ollama-Instanz (`localhost:11434` / llama3) mit automatischem Fallback bei Offline-Betrieb.
- **Feature 6 v4 (Supabase Backend-Integration & Cloud Sync):** Implementierung eines interaktiven Cloud Sync Managers im KI- & Docs-Tab (Tab 4) mit Verbindung-Statistik-Dashboard, Latenzanzeige, Datenzeilen-Monitoring für Tabellen (`contacts`, `tasks`, `inbox`, `client_tickets`) und animiertem Live-Terminal für Sync-Vorgänge.
- **Feature 5 v4 (E-Rechnungs & Angebotssystem - ZUGFeRD/XRechnung):** Integriertes E-Rechnungs-Modul im Finanz-Cockpit (Tab 1). Erlaubt die Konfiguration von B2B-Angeboten und EN 16931 konformen E-Rechnungen (ZUGFeRD 2.0 Hybrid-PDF & XRechnung XML). Bietet einen PDF-Generator mit DATEV-Siegel, einen XML-Syntax-Validator und direkte Buchung an Lexoffice/DATEV.
- **Feature 4 v4 ("Frag das Firmengehirn" – RAG Knowledge Bot):** Interaktiver RAG-Chat-Assistent im KI- & Docs-Tab (Tab 4). Durchsucht verknüpfte Google-Drive-Dokumente nach Unternehmenswissen, generiert präzise Antworten und blendet verifizierte Quellen-Zitate ein. Bietet umschaltbare KI-Personas (🧠 Firmengehirn, 🎯 Pitch-Coach, 🔒 DSGVO & Legal) sowie Schnellfragen-Buttons.
- **Feature 3 v4 (KI-Telefonagent / Voice-AI Simulator):** Interaktiver Sprach-Assistent-Simulator im Sales-Tab (Tab 5). Ermöglicht die Live-Simulation automatisiert verarbeiteter Telefonanrufe (Notdienst-Abfrage & Neukunden-Erstkontakt) mit pulsierenden Audio-Soundwave-Animationen, Live-Chat-Transkription, automatischer CRM-Extraktion und Benachrichtigung in der Gründer-Inbox.
- **Feature 2 v4 (Kunden-Portal & White-Label Client Center):** Eigenständiges Mandantenportal für Kunden (z.B. *GoClean Harz*). Über einen Header-Schalter ("Kunden-Portal: AKTIV") wechselt die App in eine maßgeschneiderte Kundenansicht mit White-Label Branding, Projekt-Status-Karten, erfasster Zeit- & Kostenersparnis, freigegebenen SOPs/Dokumenten und einem interaktiven Support-Ticket-System (Tickets wandern automatisch in die Inbox des Gründers).
- **Feature 1 v4 (Visueller No-Code Automation Canvas):** Interaktiver Custom-Workflow-Builder im Sales-Tab (Tab 5). Benutzer können Trigger, KI-Verarbeitungen, ERP-Systeme und Benachrichtigungen dynamisch auf einer Raster-Zeichenfläche hinzufügen, verketten, individuelle Parameter im Seitenpanel anpassen und eine animierte End-to-End Testausführung mit Terminal-Protokollierung starten.
- **Feature B1 (Interaktiver Make.com Szenario-Simulator):** Visualisierung eines Automatisierungspfades (WhatsApp ➔ Whisper ➔ GPT-4 ➔ Lexoffice) als Diagramm in Tab 5 ("Sales & SOPs"). Bietet eine Live-Ablaufsimulation ("Szenario ausführen") mit einem wandernden Lichtimpuls (CSS-Keyframes) und farbig aufleuchtenden Zustands-Modulen, gekoppelt an eine detaillierte, farblich hervorgehobene Log-Terminal-Konsole zur Echtzeit-Protokollierung.
- **Feature A3 (Wochen-Review & Archiv erledigter Aufgaben):** Einklappbares Archiv-Panel am Fuß des Dashboards (Tab 1), das abgehakte Fokus-Aufgaben und erledigte Habits der vergangenen 7 Tage speichert (mit automatischem Live-Sync bei Checkbox-Änderungen). Erlaubt das Eintragen täglicher Reflexionsnotizen und bietet einen professionellen jsPDF-Report-Export (Wochenbericht) zum Herunterladen.
- **Feature A2 (Einnahmen-Widget & Umsatz-Vorschau):** Einbindung eines "Finanz-Cockpit"-Cards am oberen Rand des Dashboards (Tab 1). Zeigt vier KPI-Karten: das aktive Projektvolumen (Umsatz der Projekte "In Umsetzung"), die Umsatz-Pipeline (Angebote gewichtet zu 50%), den daraus resultierenden erwarteten Gesamtumsatz sowie den durchschnittlichen effektiven Stundensatz aller aktiven Projekte (direkt verknüpft mit der Zeiterfassung).
- **Feature A1 (CRM-Detailansicht / Kunden-Akte):** Erstellung einer einklappbaren Seitenleiste (Drawer) im CRM-Tab. Klickt man auf einen Kunden, öffnet sich dieser Bereich mit individuellen Notizen, einer Liste verlinkter Dokumente (hinzufügen/löschen per Klick) sowie einer automatischen, chronologischen Kontakthistorie (Aktivitäts-Log) für Statusänderungen und Aktionen.
- **Feature 3b (Gamifizierter Habit-Tracker & CSS-Konfetti):** Einführung eines täglichen Habit-Streaks (Flammen-Symbol) im Dashboard Habit-Tracker. Sobald alle Habits zu 100 % abgeschlossen werden, erhöht sich die Streak um 1 und es spritzt eine flüssige CSS-Konfetti-Animation über den gesamten Bildschirm. Es wurden manuelle Kontroll-Knöpfe zum Justieren der Streak sowie ein manueller Test-Button für das Konfetti eingebaut.
- **Feature 3a (Time-Tracker für Projekte & Marge):** Einbindung eines Live-Zeiterfassungs-Moduls (Stopuhr-Timer) in Tab 3 (CRM & Projekte) für jedes Projekt. Ermöglicht die Festlegung eines Paketpreises und die Messung oder manuelle Korrektur der geleisteten Stunden. Berechnet live den effektiven Stundensatz und markiert farblich (rot, orange, grün), wie rentabel das jeweilige Projekt ist.
- **Feature 2b (NotebookLM Live-Sync Status):** Integration eines Synchronisations-Status-Panels in Tab 4 (KI & Docs). Visualisiert den Online-Zustand des digitalen Firmengehirns (NotebookLM), die Anzahl der Quell-Dokumente, das hochgeladene Datenvolumen und den Zeitpunkt des letzten Syncs. Bietet eine manuelle Synchronisation mit Live-Ladebalken und Status-Schritten sowie einen automatischen Sync-Trigger, sobald Dokumente über die Google Drive-Simulation hochgeladen werden.
- **Feature 2a (WhatsApp-Gateway & Webhook-Simulation):** Ein neues Simulations-Panel in Tab 2 (Inbox & Tasks). Robin kann dort eine Nachricht eingeben, die nach 3 Sekunden Verarbeitungszeit (Whisper Transkription ➔ GPT-4 Strukturierung) live in der Inbox auftaucht. Optional lässt sich eine echte Make-Webhook-URL eintragen, an die die App die Nachricht als echten HTTP-POST sendet.
- **Feature 1c (Zettel-zu-Code Visualisierer):** Ein neuer interaktiver Bereich in Tab 5. Klick-Karten ermöglichen es, typische KMU-Use-Cases (Eingangsrechnungen, Stundenzettel, Kundenanfragen) auszuwählen. Gegenüberstellung des alten, manuellen Weges (rot schattiert mit Warn-Icons) und des neuen, automatisierten Weges (cyan schattiert mit KI-/Schnittstellen-Icons) zur pragmatischen Veranschaulichung der Digitalisierung im Kundengespräch.
- **Feature 1b (ROI-Rechner v2 mit PDF-Export):** Umfassender Ausbau des Showcase-Rechners. Erfassung von Festpreisen und Bundesland-Fördermitteln (Digitalbonus 50 % o.ä.). Visuelle Balkendiagramme stellen den Zeitaufwand (Bisher vs. Automatisiert) gegenüber. Ein neuer PDF-Export-Button generiert mittels `jspdf` ein professionelles, druckfreundliches Angebot (ROI-Kalkulation) als PDF-Download.
- **Feature 1a (Showcase-Modus):** Ein globaler Toggle-Button in der Kopfzeile blendet bei Bedarf alle echten Kunden- und Firmendaten aus und ersetzt sie durch fiktive, aber realistische Demodaten. Das ermöglicht Robin die App datenschutzkonform live beim Kunden zu präsentieren.
- Git-Repository initialisiert und den initialen Commit `feat: initial commit founder os prototype` erstellt.
- Vite + React Projekt-Setup im aktuellen Verzeichnis initialisiert.
- Installation von `lucide-react` für Icons.
- Modernes, responsives Design-System in [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css) mit Glassmorphism-Effekten, dunklem Anthrazit-Thema, Plus Jakarta Sans Schriftart und nahtlosem Mobile-Layout.
- Vollständige Implementierung von [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx) mit allen Kern-Features des Gemini-Prompts:
  - **Dashboard:** Quick Capture, Google Kalender Mock, Habit-Tracker mit Auto-Reset bei Tageswechsel, Tagesfokus (max. 3 Aufgaben).
  - **Inbox & Tasks:** Notizen-Verwaltung, Umwandlung in Aufgaben, HTML5 Drag-and-Drop Kanban-Board.
  - **CRM & Projekte:** Kundenliste mit DATEV/System-Tags, Sales-Pipeline, Inaktivitäts-Warnung (>14 Tage), Fördermittel-Tracker.
  - **KI & Docs:** Prompt-Tresor mit Ein-Klick-Kopierfunktion, Content-Planer für Social Media, Google Drive Upload Simulation & Docs Deep-Links.
  - **Sales & SOPs:** Interaktiver ROI-Rechner (Echtzeit-Berechnung von Stunden und Euro pro Jahr), SOP-Vorlagen (Neukunden-Onboarding, Steuerberater-Pitch) und Generierung aktiver Kunden-Checklisten.
- Lokale Persistierung aller Daten im `localStorage` für sofortige, setup-freie Nutzung.

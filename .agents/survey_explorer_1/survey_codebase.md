# Codebase Survey — KMU Service Harz (Founder OS)

**Erstellt am:** 2026-08-24  
**Explorer:** `survey_explorer_1`  
**Projekt:** KMU Service Harz — Founder OS & B2B Vertriebs- und Auslieferungs-Suite  

---

## 1. Executive Summary

Die Codebase von **KMU Service Harz (Founder OS)** ist eine produktionsreife, hochmodulare Single Page Application (SPA) auf Basis von **React 19**, **Vite 8**, **Lucide React** und **jsPDF** mit PWA- und Android-Capacitor-Unterstützung.
Die Anwendung implementiert ein Local-First-Prinzip mit asynchroner Cloud-Synchronisation (Supabase REST + Google Drive API + Google Gemini AI) und besitzt eine vollständig entkoppelte Komponentenarchitektur mit 11 Navigationsbereichen, einem Mandanten-Portal-Modus, einem Showcase-Präsentationsmodus und einer 61-teiligen Test-Suite in Vitest.

---

## 2. Vollständige Verzeichnis- und Architektur-Übersicht

```
kmuserviceharzapp/
├── .agents/                               # Agenten-Metadaten & Planungsdokumente
│   ├── ORIGINAL_REQUEST.md                # Ursprüngliche Anforderung der B2B-Suite
│   └── survey_explorer_1/                 # Working Directory des Survey Explorers
├── android/                               # Capacitor Android Plattform & native Java Plugins
│   └── app/src/main/                      # AndroidManifest.xml (allowBackup=false, R8 aktiviert)
├── DOCS/                                  # 23 rechtssichere Vorlagen, Businessplan & Marktanalysen
│   ├── AaaS_Wartungsvertrag_Digitaler_Hausmeister_200EUR.md
│   ├── AGB-Textbausteine für IT-Dienstleister und No-Code-Automatisierungsagenturen.md
│   ├── Abnahmeprotokoll_und_Mitarbeiter_Cheatsheet.md
│   ├── B2B Automatisierungs Agentur Preistreppe.md
│   ├── B2B Vertriebsplan KMU Harz.md
│   ├── Businessplan_KMU_Service_Harz_2026_Final.md
│   ├── Buyer Persona KMU Dienstleister.md
│   ├── DSGVO_Auftragsverarbeitungsvertrag_AVV_KMU_Service_Harz.md
│   ├── Digitalisierungsförderung für Handwerksbetriebe (1–20 Mitarbeitende).md
│   ├── Einstiegsgeld und Sachmittelzuschuss nach SGB II.md
│   ├── GoBD_Verfahrensdokumentation_Ersetzendes_Scannen_Muster.md
│   ├── Jobcenter-Unterstützung für die Gründung von KMU Service Harz.md
│   ├── KMU-Service Harz Onboarding Playbook.md
│   ├── Systemzugangs_und_Sicherheits_Checkliste.md
│   ├── Vertrag_Standard_Setup_Lautlose_Belegerfassung_2000EUR.md
│   ├── Wettbewerbs- und Marktanalyse IT-Services, Webdesign und Prozessautomatisierung im Harz.md
│   └── businessplan_extracted.txt
├── public/                                # Statische Assets & JSON-Libraries
│   ├── favicon.svg & icons.svg            # PWA Icons
│   ├── godofprompt_library_export.json    # Prompts-Exportdatei (~2.9 MB)
│   ├── make-blueprints/                   # Exportierte Make.com Blueprints
│   ├── website-export/                    # Statischer Export der KMU-Webseite
│   └── pitch_goclean.html                 # Case-Study & Pitchdeck GoClean Harz
├── src/
│   ├── main.jsx                           # React DOM Entry & PWA Service Worker Registration
│   ├── App.jsx                            # Global State, Header, PIN-Gate & Router/Modals
│   ├── App.css & index.css                # Dark-Theme CSS & Tailwind-kompatible Utility Classes
│   ├── assets/
│   │   ├── docs/masterLogbuch.js          # Master-Strategie- & Firmenwissens-Export
│   │   └── hero.png                       # Hero Image Asset
│   ├── components/                        # UI Views & Modals (Lazy Loaded & Eager)
│   │   ├── Sidebar.jsx                    # Desktop Aside & Mobile Drawer Navigation (11 Tabs)
│   │   ├── DashboardView.jsx              # Tab 1: Haupt-Cockpit & Widgets
│   │   ├── CommandCenter.jsx              # Tab 1b: Roadmap Matrix, Master-Logbuch, RAG Chat
│   │   ├── KanbanBoard.jsx                # Tab 2: Aufgaben, Inbox, WhatsApp-Simulation
│   │   ├── CrmPipeline.jsx                # Tab 3: Mini-CRM & Sales-Pipeline, Zeiterfassung
│   │   ├── CrmDrawer.jsx                  # Slide-Out Detailansicht für Kontakte
│   │   ├── PromptVault.jsx                # Tab 4a: KI-Prompt-Tresor & Content-Planer
│   │   ├── DocsHub.jsx                    # Tab 4b: Wissens-Hub, Drive-Sync, Supabase Cloud
│   │   ├── SopManager.jsx                 # Tab 5: SOPs, Make-Simulator, ROI-Kalkulator & PDF
│   │   ├── LeadsView.jsx                  # Lead-Tracker (518 B2B Leads Harz & Kaltakquise)
│   │   ├── OnboardingView.jsx             # Onboarding-Wizard & 4-Stufen Playbook PDF
│   │   ├── WebsiteView.jsx                # Live-Preview der KMU Service Harz Webseite
│   │   ├── CoachingLivePortal.jsx         # PIN-gesichertes Präsentationsportal für Mentoren
│   │   ├── FoundingRoadmapMatrix.jsx      # Meilenstein-Matrix mit Gamification XP
│   │   ├── SettingsView.jsx               # Dashboard-Widget Customizer & Sortierung
│   │   ├── VoiceQuickCaptureWidget.jsx    # Sprachaufnahme & Multi-Target Routing
│   │   ├── MediaDropWidget.jsx            # Screenshot & Foto Dropzone
│   │   ├── LightboxModal.jsx              # Vollbild-Präsentationsmodal
│   │   ├── DocumentEditorModal.jsx        # Mini-Word Text-Editor Modal
│   │   ├── RewardShopModal.jsx            # Life OS Gamification Belohnungs-Shop
│   │   ├── PenaltyModal.jsx               # Life OS Disziplin- & Strafen-Modal
│   │   ├── BackupManagerModal.jsx         # 1-Klick Daten-Export/Import & JSON-Validierung
│   │   ├── ErrorBoundary.jsx              # Robuster React Error Boundary mit Fallback
│   │   └── common/
│   │       └── SkeletonLoader.jsx         # Skeleton Fallback für Suspense Lazy Loading
│   ├── constants/
│   │   ├── initialData.js                 # Seed-Daten für Habits, Tasks, Leads, SOPs, Docs
│   │   ├── kmuPrompts.js                  # Harz-spezifische Prompt-Vorlagen
│   │   ├── godOfPromptLibrary.js          # Kuratierte Prompt-Bibliothek
│   │   ├── makeBlueprintsData.js          # 4 Make.com Scenario Schemas
│   │   ├── roadmapData.js                 # 4-Phasen Gründungs-Meilensteine
│   │   └── websiteContent.js              # Kopien, Preise, FAQs für WebsiteView
│   ├── hooks/
│   │   ├── useDebounce.js                 # Input-Debouncing
│   │   ├── useLocalStorage.js             # LocalStorage State Hook
│   │   ├── useOnlineStatus.js             # Navigator Online/Offline Listener
│   │   ├── useSpeechRecognition.js        # Web Speech API Voice Capture Hook
│   │   └── useToast.js                    # Banner-Benachrichtigungen
│   ├── services/
│   │   ├── gemini.js                      # Gemini API Client mit Multi-Modell Fallback
│   │   ├── supabase.js                    # Supabase REST Client für Leads, Prompts & State
│   │   ├── syncQueue.js                   # Local-First Offline-Aktions-Queue
│   │   ├── googleDrive.js                 # Google Drive File & Folder Synchronisation
│   │   ├── backupService.js               # Backup Schema Validation & JSON Generator
│   │   └── widget.js                      # Android Widget Bridge
│   ├── utils/
│   │   └── validation.js                  # Sanitizer für XSS, URLs, E-Mails, Telefonnummern
│   └── test/
│       ├── setup.js                       # Vitest Mocks (Capacitor, jsPDF, Speech, Fetch)
│       ├── App.test.jsx                   # 20 Integrationstests
│       ├── validationAndSync.test.js      # 9 Utility- & Sync-Tests
│       └── features/                      # 32 Feature-Spezifische Unit- & Integrationstests
│           ├── coaching.test.jsx          # 5 Tests
│           ├── commandCenter.test.jsx     # 3 Tests
│           ├── crm.test.jsx               # 4 Tests
│           ├── dashboard.test.jsx         # 3 Tests
│           ├── kanban.test.jsx            # 4 Tests
│           ├── promptVault.test.jsx       # 5 Tests
│           ├── salesAndSop.test.jsx       # 4 Tests
│           └── syncAndBackup.test.jsx     # 4 Tests
├── capacitor.config.json                  # Capacitor App Konfiguration
├── package.json                           # NPM Dependencies & Test/Build Scripts
├── vite.config.js                         # Rollup Code-Splitting, PWA & Vitest Settings
└── vitest.config.js                       # Standalone Vitest Konfiguration
```

---

## 3. Dokumenten-Tresor (DocsHub) & Template-Inventar

### 3.1. DocsHub Implementierung (`src/components/DocsHub.jsx`)
- **Lokaler Wissens-Hub:** Erlaubt Datei-Imports (.txt, .md, .json, .csv, .png, .jpg, .svg, .pdf), Live-Erstellung über `DocumentEditorModal` (Mini-Word), Download als `.txt`/`.md` sowie Löschen.
- **Status-Badges:** Markiert Dokumente als `☁️ Nur Lokal`, `✅ Synchronisiert` oder `⚠️ Bearbeitet`.
- **Digitales Firmengehirn (NotebookLM Sync):** Visualisiert den Abgleich mit Google NotebookLM, bietet Progressbar und bidirektionalen Sync mit Google Drive.
- **Supabase Cloud Sync Manager:** Zeigt Online/Offline-Status, Anzahl ungesynchronisierter Leads/Prompts/Tasks und Terminal-Sync-Logs.
- **RAG Firmengehirn Chat:** Lokaler/Gemini-gestützter Assistent mit Persona-Auswahl und Zugriff auf das `masterLogbuch.txt`.

### 3.2. Initial im System verankerte Dokumente (`INITIAL_DOCS` in `initialData.js`)
1. `master-logbuch` -> `masterLogbuch.txt` (Vollständiges Geschäfts- und Positionierungs-Logbuch)
2. `d1` -> `Businessplan 2026 - KMU Service Harz.md`
3. `d_contract2000` -> `Vertrag_Standard_Setup_2000EUR.md`
4. `d_avv` -> `DSGVO_Auftragsverarbeitungsvertrag_AVV.md`
5. `d_gobd` -> `GoBD_Verfahrensdokumentation_Ersetzendes_Scannen.md`
6. `d_aaas_contract` -> `AaaS_Wartungsvertrag_200EUR.md`
7. `d_checklist` -> `Systemzugangs_und_Sicherheits_Checkliste.md`
8. `d_abnahme` -> `Abnahmeprotokoll_und_Mitarbeiter_Cheatsheet.md`

### 3.3. Ergänzungsbedarf für Original Request (R1: Steuerberater & Direct-Mail Suite)
In `DOCS/` und `initialData.js` fehlen aktuell noch die dedizierten Vorlagentexte für:
- Kanzlei-Pitch & Partner-Präsentation für Steuerberater
- Mandanten-Flyer zur Kanzlei-Auslage
- Postalischer 1-Seiter Direct-Mail Brief an Handwerksmeister
- Telefon- & Kaltakquise-Leitfaden mit Einwandbehandlung für Vorzimmer & Meister

---

## 4. Test-Setup & Verifikation

### 4.1. Konfiguration
- **Test-Runner:** `vitest` v4.1.10 mit `jsdom`
- **Setup-Datei:** `src/test/setup.js` mit sauberen Mocks für:
  - `@capacitor/core` (Capacitor Bridge & native Plugins)
  - `jspdf` (Headless Canvas/PDF-Methoden)
  - `window.SpeechRecognition` & `window.webkitSpeechRecognition`
  - `global.fetch` (Mocking von Supabase REST-Endpunkten)

### 4.2. Test-Suite Struktur (61 Tests in 10 Testdateien)
| Test-Datei | Test-Anzahl | Fokus / Abdeckung |
|---|---|---|
| `src/test/App.test.jsx` | 20 Tests | End-to-End Integration, Tab-Wechsel, Showcase-Maskierung, PIN-Gate, PDF-Trigger |
| `src/test/validationAndSync.test.js` | 9 Tests | URL/Mail/Phone/Key Sanitizer, SyncQueue Deduplication & Flush |
| `src/test/features/crm.test.jsx` | 4 Tests | Kontakterstellung, Pipeline-Phasenwechsel, Löschen |
| `src/test/features/kanban.test.jsx` | 4 Tests | Task-Erstellung, Inbox-Konvertierung, Drag & Drop State |
| `src/test/features/salesAndSop.test.jsx` | 4 Tests | ROI-Kalkulator Berechnungen, SOP-Schritt-Toggles |
| `src/test/features/promptVault.test.jsx` | 5 Tests | KI-Prompt-Erstellung, Suche, God of Prompt Adoption |
| `src/test/features/commandCenter.test.jsx` | 3 Tests | Accordion-Sektionen, Master-Logbuch Editor Sync |
| `src/test/features/coaching.test.jsx` | 5 Tests | PIN-Gate Authentifizierung, Reward-Shop, Penalty-Modal |
| `src/test/features/syncAndBackup.test.jsx` | 4 Tests | Full-Backup JSON Validierung, Offline Queue Execution |
| `src/test/features/dashboard.test.jsx` | 3 Tests | Voice Quick-Capture, Hashtag-Pills, Dispatch-Routing |
| **Gesamt** | **61 Tests** | **100% bestanden (`npm run test:features` & isolierte Suiten)** |

---

## 5. Build- & Dependency-Konfiguration

### 5.1. `package.json`
- **Dependencies:**
  - `@capacitor/core`, `@capacitor/cli`, `@capacitor/android` (`^8.4.1`)
  - `react`, `react-dom` (`^19.2.7`)
  - `lucide-react` (`^1.21.0`)
  - `jspdf` (`^4.2.1`)
- **DevDependencies:**
  - `vite` (`^8.1.0`), `@vitejs/plugin-react` (`^6.0.2`), `vite-plugin-pwa` (`^1.3.0`)
  - `vitest` (`^4.1.10`), `jsdom` (`^29.1.1`), `oxlint` (`^1.69.0`)
  - `@testing-library/react` (`^16.3.2`), `@testing-library/jest-dom` (`^6.9.1`)

### 5.2. Rollup Code-Splitting (`vite.config.js`)
Die Rollup Output-Chunks sind für optimale PWA-Ladezeiten optimiert:
- `vendor-prompts-library`: Trennt den großen Prompt-Datenkatalog (~2.78 MB) ab
- `vendor-pdf`: Isoliert `jspdf`, `html2canvas`, `dompurify` (~627 kB)
- `vendor-icons`: Isoliert `lucide-react` (~30 kB)
- `vendor-react`: Isoliert `react` & `react-dom` (~182 kB)
- Asynchron lazy-loaded Tab Views (`CommandCenter`, `KanbanBoard`, `CrmPipeline`, `LeadsView`, `OnboardingView`, `PromptVault`, `DocsHub`, `SopManager`, `WebsiteView`, `CoachingLivePortal`)

**Build-Verifikation:** `npm run build` kompiliert in unter 5 Sekunden fehlerfrei mit vollständigem PWA-Manifest und Precache-Generierung.

---

## 6. UI Navigation & Entry Points

### 6.1. Einstiegspunkte
- **Master-PIN Lock Screen:** Schützt die gesamte App vor unbefugtem Zugriff (Default-PIN `2026`, im Header anpassbar).
- **Header Bar:**
  - Statusanzeige (Online/Offline, SyncQueue Zähler)
  - Showcase-Modus Schalter (anonymisiert Daten bei Kundenpräsentationen)
  - Kunden-Portal Modus Schalter (wechselt in Mandantenansicht mit Firmenauswahl)
  - 1-Klick Data Hub & Backup Manager Modal Trigger

### 6.2. Hauptnavigation (11 Sidebar Tabs)
1. **`dashboard` (Dashboard):** Voice Quick-Capture Studio, Tagesfokus, Habit-Tracker mit Konfetti, E-Rechnungsgenerator, Quick-Notes, Mini-Kalender, anpassbare Widget-Anordnung.
2. **`status` (Command Center):** Interaktive Gründungs-Roadmap Matrix, Coaching-Termine, Meilenstein-Checkliste, `masterLogbuch.txt` Editor, RAG AI Firmengehirn.
3. **`tasks` (Inbox & Tasks):** Kanban-Board (Inbox, To Do, In Arbeit, Ideen, Erledigt), WhatsApp-Simulation.
4. **`crm` (CRM & Projekte):** Mini-CRM Pipeline (5 Phasen), Zeiterfassung für Kundenprojekte, Drawer für Kontaktdetails.
5. **`leads` (Lead-Tracker):** 518 B2B-Leads im Harz, Kaltakquise-Leitfäden, Einwandbehandlung, Dringlichkeitsfilter.
6. **`onboarding` (Onboarding):** 4-Stufen Onboarding-Wizard, Digitalisierungsrechner, Playbook PDF-Export.
7. **`prompts` (KI Prompts):** God of Prompt Vault, KMU-Harz Vorlagen, KI-Prompt-Optimizer (Gemini / Local), Social Media Content Planer.
8. **`hub` (Dokumente & Sync):** Wissens-Hub, Google Drive Anbindung, NotebookLM Status, Supabase Cloud Sync Manager.
9. **`sales` (Sales & SOPs):** Interaktiver ROI-Kalkulator & PDF-Report, Make.com Szenario-Simulator, Voice Call KI-Simulation.
10. **`website` (Webseiten-Preview):** Vollständige interaktive Vorschau der KMU Service Harz Webseite mit Theme-Switcher, ROI-Rechner und Kontakt-Leadformular.
11. **`coaching-portal` (Coaching Live-Portal):** PIN-gesichertes Präsentations-Dashboard für Mentoren und Bankberater.

---

## 7. Status der 4 Kernanforderungen aus ORIGINAL_REQUEST.md

1. **R1: Steuerberater-Multiplikatoren-Kit & Handwerker Direct-Mail:**
   - *Status:* Grundstrukturen in `DocsHub.jsx`, `initialData.js` und `DOCS/` vorhanden; Vorlagen für Kanzlei-Pitchdeck, Mandantenflyer, Handwerker-Brief und Kaltakquise-Leitfaden müssen als strukturierte Markdown- & UI-Templates implementiert werden.
2. **R2: Automatisierter 500 € „Büro-Stress-Test & ROI-Report“ PDF-Generator:**
   - *Status:* Bestehende PDF-Generatoren in `App.jsx` und `OnboardingView.jsx` vorhanden. Es wird ein 4-teiliger Report (1. Prozess-Röntgenbild, 2. Schattenkosten in Euro, 3. Soll-Roadmap, 4. Fördermittel-Indikation) benötigt.
3. **R3: Mandanten-Portal & AaaS-Wartungs-Dashboard:**
   - *Status:* Basis-Mandantenansicht vorhanden (`clientPortalMode` in `App.jsx`). Ausbau um Live-Schnittstellen-Status (Make/Lexoffice/DATEV Ampel), Zähler für gerettete Büro-Sonntage und 1-Klick Ticket-System erforderlich.
4. **R4: E-Rechnungs- & ZUGFeRD/XRechnung Prüf-Studio:**
   - *Status:* E-Rechnung-PDF-Generator existiert. Ein visueller XML/PDF-Validator mit EN 16931 Ampelprüfung für Pflichtfelder (Leistungsdatum, USt-IdNr, Leitweg-ID) muss integriert werden.

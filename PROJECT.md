# Project: KMU Service Harz - B2B-Vertriebs- und Auslieferungs-Suite

## Architecture
- **Framework**: React 19 SPA with Vite 8, Tailwind CSS, Lucide React, and jsPDF.
- **Data Flow & State**: Single-source client-side state in `App.jsx` + localStorage + Supabase sync.
- **Key Modules**:
  - `src/components/DocsHub.jsx` & `src/constants/initialData.js`: Knowledge & Templates Hub.
  - `src/services/pdfReportGenerator.js` & `src/components/OnboardingView.jsx`, `src/components/SopManager.jsx`: 500 € Stress-Test & ROI PDF Engine.
  - `src/components/ClientPortalView.jsx`: Dedicated Client Portal, Live Monitoring & Ticket System.
  - `src/services/eInvoiceParser.js` & `src/components/EInvoiceValidator.jsx`: EN 16931 CII/UBL & ZUGFeRD PDF/A-3 Validator.

## Feature Inventory
| # | Feature | Description | Milestone | Source | Status |
|---|---------|-------------|-----------|--------|--------|
| 1 | Kanzlei-Pitch & Partner-Präsentation | Kanzlei-Deck & Leitfaden für Steuerberater im Harz (DATEV RDS 1.0 vs BDS, Pendelordner-Befreiung) | M1 | ORIGINAL_REQUEST §R1 | DONE |
| 2 | Mandanten-Flyer | Ausdruckbare Vorlage für Kanzleien zur Weitergabe an Handwerker mit 500 € Audit-Gutschein | M1 | ORIGINAL_REQUEST §R1 | DONE |
| 3 | Direct-Mail 1-Seiter | Haptischer Brief an 518 Harzer Handwerksmeister („Schluss mit dem Büro-Sonntag“ & QR-Code) | M1 | ORIGINAL_REQUEST §R1 | DONE |
| 4 | Telefon- & Kaltakquise-Leitfaden | Einwandbehandlung Vorzimmer & Meister auf Baustelle mit 5-Punkte Validation-Pivot | M1 | ORIGINAL_REQUEST §R1 | DONE |
| 5 | In-App DocsHub Integration | Alle R1-Vorlagen als strukturierte Markdown-/UI-Vorlagen in `INITIAL_DOCS` & `DocsHub` verfügbar | M1 | ORIGINAL_REQUEST §R1 | DONE |
| 6 | 4-teiliger Prüfbericht Logik | Berechnung von Prozess-Röntgenbild, Schattenkosten in €, Soll-Roadmap, Fördermittelmatrix & Amortisation | M2 | ORIGINAL_REQUEST §R2 | DONE |
| 7 | Professioneller PDF-Generator | jsPDF-basierter Vektor-/Layout-Generator mit Firmenlogo, Diagrammen und Amortisationsrechnung | M2 | ORIGINAL_REQUEST §R2 | DONE |
| 8 | Onboarding- & Sales-Export | 1-Klick Download des 500 € Prüfberichts aus `OnboardingView` (Audit-Tab) und `SopManager` (Showcase) | M2 | ORIGINAL_REQUEST §R2 | DONE |
| 9 | Dediziertes Mandanten-Dashboard | Eigenständige `ClientPortalView.jsx` mit umschaltbarer Mandantenansicht | M3 | ORIGINAL_REQUEST §R3 | DONE |
| 10 | Live Interface Monitoring | Status-Anzeige (Make.com, Lexoffice, DATEV Live/Grün) mit 1-Klick Diagnose-Simulation (BP4) | M3 | ORIGINAL_REQUEST §R3 | DONE |
| 11 | Produktivitäts- & ROI-Metriken | Zähler für verarbeitete Monatsbelege, gerettete Büro-Sonntage und kumulierte Zeiteinsparung | M3 | ORIGINAL_REQUEST §R3 | DONE |
| 12 | 1-Klick Support-Ticket-System | Störungsmeldung & Kontingent-Verwaltung für Digitaler Hausmeister (200 € / Mo, 60 Min Kontingent) | M3 | ORIGINAL_REQUEST §R3 | DONE |
| 13 | EN 16931 E-Invoice Parser | Semantischer XML-Parser für CII (`rsm:CrossIndustryInvoice`) & UBL 2.1 (`Invoice`/`CreditNote`) | M4 | ORIGINAL_REQUEST §R4 | DONE |
| 14 | ZUGFeRD PDF/A-3 Extractor | Client-seitige Extraktion von `factur-x.xml` / `zugferd-invoice.xml` aus PDF-Dateien | M4 | ORIGINAL_REQUEST §R4 | DONE |
| 15 | Visuelle Ampel-Feldprüfung | Prüfprotokoll für Pflichtfelder (Leistungsdatum, USt-IdNr, Kreditor/Debitor, Positionen, Leitweg-ID) | M4 | ORIGINAL_REQUEST §R4 | DONE |
| 16 | E-Rechnungs Prüf-Studio UI | Interaktives Upload-, Drag&Drop- und Validierungs-Dashboard in der React-App | M4 | ORIGINAL_REQUEST §R4 | DONE |
| 17 | E2E Opaque-Box Test Suite | Tiers 1-4 Testabdeckung für alle Features (min. 11 × N Tests) | E2E_TEST | ORIGINAL_REQUEST §Verification | DONE |
| 18 | Adversarial Coverage Hardening | Tier 5 White-Box & Adversarial Testverifikation | M5 | ORIGINAL_REQUEST §Verification | DONE |
| 19 | Dokumentations-Aktualisierung | Aktualisierung von README.md, CHANGELOG.md und TODO.md | M5 | User Rules | DONE |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E_TEST | E2E Testing Track | Requirement-driven Opaque-Box Test Suite (Tiers 1-4) & `TEST_READY.md` | none | DONE |
| M1 | Steuerberater-Kit & Direct-Mail | Kanzlei-Pitch, Flyer, 518 Meister Direct-Mail, Telefonleitfaden in `DOCS/` und `DocsHub` | none | DONE |
| M2 | 500 € Stress-Test PDF Generator | 4-teiliger Report Engine in `pdfReportGenerator.js` mit Onboarding & SOP Export | none | DONE |
| M3 | Mandanten-Portal & AaaS Dashboard | `ClientPortalView.jsx`, Live Make/Lexoffice/DATEV Status, Metriken, 200€ Retainer Tickets | none | DONE |
| M4 | E-Rechnungs & ZUGFeRD Prüf-Studio | `eInvoiceParser.js`, XML/PDF Extractor, Ampel-Prüfprotokoll & Studio UI | none | DONE |
| M5 | E2E Verification & Adversarial Hardening | 100% Pass aller E2E Tests (T1-T4), Tier 5 Challenger Hardening, README/CHANGELOG/TODO | M1, M2, M3, M4, E2E_TEST | DONE |

## Interface Contracts
### `pdfReportGenerator.js` ↔ UI Components (`OnboardingView`, `SopManager`)
- `export const generateStressTestPDF = (auditData, options)`
- `export const calculateAuditMetrics = (inputData)`

### `eInvoiceParser.js` ↔ `EInvoiceValidator.jsx`
- `export const parseAndValidateEInvoice = async (fileOrContent)`
- Output shape contains `isValid`, `standard`, `syntax`, `totals`, `items`, `checks` (Ampel-Status PASS/WARN/FAIL).

### `ClientPortalView.jsx` ↔ `App.jsx`
- Props: `currentUser`, `clientData`, `systemStatus`, `metrics`, `clientTickets`, `onAddTicket`, `onUpdateTicketStatus`, `onRunDiagnostic`, `onClosePortal`.

## Code Layout
- `src/components/DocsHub.jsx`: DocsHub & Vorlagen-Viewer
- `src/constants/initialData.js`: `INITIAL_DOCS` Definitionen für alle Multiplikatoren- und Sales-Vorlagen
- `DOCS/`: Standalone Markdown Dokumente für Sales, Kanzlei-Pitch, Direct-Mail und Leitfäden
- `src/services/pdfReportGenerator.js`: Reiner jsPDF Client-Report Generator (4-teiliger Prüfbericht)
- `src/components/OnboardingView.jsx`: Audit & Onboarding UI mit PDF-Download
- `src/components/SopManager.jsx`: ROI-Showcase-Rechner mit PDF-Download
- `src/components/ClientPortalView.jsx`: Eigenständiges Mandanten-Portal & AaaS-Wartungs-Dashboard
- `src/services/eInvoiceParser.js`: EN 16931 CII & UBL XML- und PDF-Parser & Validierungs-Engine
- `src/components/EInvoiceValidator.jsx`: E-Rechnungs Prüf-Studio UI Komponente
- `src/test/`: Testdateien für Vitest (233 Tests across 21 files, 100% PASS)

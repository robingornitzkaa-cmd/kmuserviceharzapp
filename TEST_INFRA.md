# E2E Test Infra: KMU Service Harz B2B-Vertriebs- und Auslieferungs-Suite

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial + Real-World Workload Testing.
- Framework: Vitest with jsdom and React Testing Library.

## Feature Inventory & Test Matrix
| # | Feature | Source | Tier 1 (Feature) | Tier 2 (Boundary) | Tier 3 (Cross) | Tier 4 (Workload) |
|---|---------|--------|:----------------:|:-----------------:|:--------------:|:-----------------:|
| 1 | Kanzlei-Pitch & Partnerdeck | R1 | 5 | 5 | ✓ | ✓ |
| 2 | Mandanten-Flyer Template | R1 | 5 | 5 | ✓ | ✓ |
| 3 | Direct-Mail 1-Pager (518 Meister) | R1 | 5 | 5 | ✓ | ✓ |
| 4 | Telefon- & Kaltakquise Leitfaden | R1 | 5 | 5 | ✓ | ✓ |
| 5 | DocsHub Integration & Rendering | R1 | 5 | 5 | ✓ | ✓ |
| 6 | 4-teiliger Prüfbericht Berechnungen | R2 | 5 | 5 | ✓ | ✓ |
| 7 | jsPDF Vektor- & Layout-Generator | R2 | 5 | 5 | ✓ | ✓ |
| 8 | Onboarding- & SOP-Export Trigger | R2 | 5 | 5 | ✓ | ✓ |
| 9 | Mandanten-Portal Dashboard UI | R3 | 5 | 5 | ✓ | ✓ |
| 10 | Live Interface Monitoring (Make/Lex/DATEV) | R3 | 5 | 5 | ✓ | ✓ |
| 11 | Monatsbelege & Zeiteinsparung Zähler | R3 | 5 | 5 | ✓ | ✓ |
| 12 | 1-Klick Ticket-System & 200€ Retainer | R3 | 5 | 5 | ✓ | ✓ |
| 13 | EN 16931 XML Parser (CII & UBL) | R4 | 5 | 5 | ✓ | ✓ |
| 14 | ZUGFeRD PDF/A-3 Extractor | R4 | 5 | 5 | ✓ | ✓ |
| 15 | Ampel-Validierungsprüfung (BTs & BRs) | R4 | 5 | 5 | ✓ | ✓ |
| 16 | E-Rechnungs Prüf-Studio UI | R4 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- **Test Runner**: Vitest (`npm run test:all` or `npx vitest run`)
- **Test Files**:
  - `src/test/features/salesSuiteAndDocs.test.jsx`: R1 Multiplikatoren-Kit & Direct-Mail tests
  - `src/test/features/stressTestPdfReport.test.jsx`: R2 500 € Stress-Test & ROI-Report PDF tests
  - `src/test/features/clientPortalAaaS.test.jsx`: R3 Mandanten-Portal & AaaS Dashboard tests
  - `src/test/features/eInvoiceValidation.test.jsx`: R4 E-Rechnungs & ZUGFeRD / XRechnung Prüf-Studio tests
  - `src/test/e2eWorkloads.test.jsx`: Tier 3 & Tier 4 End-to-End integration workloads

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Target Persona |
|---|----------|--------------------|----------------|
| 1 | Steuerberater Akquise & Kanzlei-Empfehlung | F1, F2, F5, F8 | Kanzlei Dr. Müller & Partner, Wernigerode |
| 2 | 518 Meister Direct-Mail zu 500 € ROI-Audit | F3, F6, F7, F8 | Dachdeckermeister Harz, Goslar |
| 3 | Mandant Onboarding & Live AaaS Retainer | F9, F10, F11, F12 | SHK Meisterbetrieb, Clausthal-Zellerfeld |
| 4 | ZUGFeRD 2.2 / XRechnung 3.0 Lieferanten-Prüfung | F13, F14, F15, F16 | Elektrotechnik Harz GmbH, Blankenburg |
| 5 | Vollständiger Beratungs- & Auslieferungszyklus | F1-F16 | B2B Gesamtablauf |

## Coverage Goals
- Minimum 100 tests across the test suites.
- 100% pass rate in Vitest.
- Zero mockups: all parsers, PDF generation, data structures, and UI workflows must execute genuine logic.

## 2026-08-24T19:07:42Z
You are teamwork_preview_test_writer (ID: test_writer_e2e).
Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\test_writer_e2e
Read:
- ORIGINAL_REQUEST.md: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\ORIGINAL_REQUEST.md
- PROJECT.md: c:\Users\gorni\Desktop\kmuserviceharzapp\PROJECT.md
- TEST_INFRA.md: c:\Users\gorni\Desktop\kmuserviceharzapp\TEST_INFRA.md
- Spec Report: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\survey_spec_miner_2\spec_report.md
- Feature Report: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\survey_explorer_3\survey_features.md

Mission:
Write the complete Opaque-Box E2E and Unit Test Suite for KMU Service Harz covering Tiers 1-4 across all 16 features:
1. `src/test/features/salesSuiteAndDocs.test.jsx`: Tests for R1 (Kanzlei-Pitch, Mandanten-Flyer, 518 Meister Direct-Mail, Telefonleitfaden in DOCS & DocsHub & INITIAL_DOCS).
2. `src/test/features/stressTestPdfReport.test.jsx`: Tests for R2 (4-part report math, Schattenkosten calculation, Fördermittel matrix, jsPDF generation logic, OnboardingView & SopManager triggers).
3. `src/test/features/clientPortalAaaS.test.jsx`: Tests for R3 (ClientPortalView, Live Make/Lexoffice/DATEV status simulation, Monatsbelege & Zeiteinsparung metrics, 1-Click Ticket System with 200€ Retainer 60-min quota).
4. `src/test/features/eInvoiceValidation.test.jsx`: Tests for R4 (eInvoiceParser with CII rsm:CrossIndustryInvoice & UBL Invoice/CreditNote XML, PDF/A-3 Factur-X extraction, mandatory BT-1..BT-115 checks, mathematical checks BR-CO-10..18, traffic light protocols).
5. `src/test/e2eWorkloads.test.jsx`: Tests for Tier 3 (Cross-feature interactions) & Tier 4 (Realistic Harz business scenarios: Kanzlei recommendation, Direct-Mail to 500€ Audit, Onboarding to AaaS Retainer, E-Invoice validation workflow).

When finished and verified with `npx vitest run`, publish `TEST_READY.md` at project root `c:\Users\gorni\Desktop\kmuserviceharzapp\TEST_READY.md` summarizing the test suites and test counts.
Write handoff.md in your working directory and send a message.

# Handoff Report: Requirement 2 & Requirement 3 Survey & Specification

**Agent:** `survey_explorer_3` (Teamwork Explorer)  
**Parent Agent:** `teamwork_preview_orchestrator_1` (`837d00d0-3bc7-4283-a549-e5b29fe6f754`)  
**Mission:** Survey & Technical Specification for Requirement 2 (500 € Büro-Stress-Test & ROI-Report PDF Generator) and Requirement 3 (Mandanten-Portal & AaaS-Wartungs-Dashboard).  
**Generated Specification File:** `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\survey_explorer_3\survey_features.md`

---

## 1. Observation

1. **Codebase Inspection & Dependencies (`package.json`):**
   - Line 28: `"jspdf": "^4.2.1"` is directly available in `dependencies`. No new packages (like `html2pdf.js` or `react-pdf`) are needed, fully complying with user rules.
   - Line 29: `"lucide-react": "^1.21.0"` provides comprehensive iconography (`CheckCircle`, `TrendingUp`, `AlertTriangle`, `LifeBuoy`, `Send`, `FileText`, `Activity`, etc.).

2. **Existing Sales & ROI Workflows:**
   - `src/components/SopManager.jsx` (Lines 88–218): Contains the `Showcase ROI-Rechner` with task name, duration, hourly rate, setup fee, and subsidy region (NDS, LSA, BUND, NONE).
   - `src/App.jsx` (Lines 3711–3818): `generatePDFReport` generates a basic 1-page PDF using `jsPDF`. It lacks the detailed 4-part structure, visual media break diagrams, and explicit 100% audit credit calculation.
   - `src/components/OnboardingView.jsx` (Lines 230–367): `handleGenerateOnboardingPDF` outputs a basic questionnaire transcript with simple summary stats.
   - `src/constants/initialData.js` (Lines 320–520): `ONBOARDING_PLAYBOOKS` already specifies `audit500` (Stufe 1), `standardSetup2000` (Stufe 2), `meisterbetrieb6000` (Stufe 2+), and `retainer200` (Stufe 3).

3. **Existing Client Portal (`clientPortalMode`):**
   - `src/App.jsx` (Lines 4294–4490): `clientPortalMode` is rendered inline inside `App.jsx` with static mock data, SOP lists, basic ticket form, and basic links. It lacks live interface status simulations (Make.com, Lexoffice, DATEV), detailed monthly receipt counters, and 200 € retainer quota management (1h / 60 min tracker).
   - `src/constants/makeBlueprintsData.js` (Lines 111–144): Blueprint 4 (`bp4`) specifies the 15-minute cron health check for AaaS interface monitoring.
   - `DOCS/AaaS_Wartungsvertrag_Digitaler_Hausmeister_200EUR.md`: Defines the precise contract terms, 60-minute monthly quota for minor tweaks, and 95 €/h partner rate for additional requests.

4. **Test Suite Baseline (`npm run test:all`):**
   - 9 of 10 test suites passed cleanly (60 tests passing across CRM, Kanban, Sales/SOP, PromptVault, CommandCenter, Coaching, Sync/Validation, Dashboard).
   - 1 test in `App.test.jsx:83` had a timeout on lazy-loaded DocsHub component under parallel test runner load. Modularizing `ClientPortalView` and `pdfReportGenerator` will enhance isolation and test speed.

---

## 2. Logic Chain

1. **R2 Architecture (500 € Büro-Stress-Test & ROI-Report PDF):**
   - **Step 1:** The 500 € audit is the Front-End Tripwire designed to bypass the subsidy pre-approval blockade (*Verbot des vorzeitigen Maßnahmenbeginns*) while delivering the 4 mandatory elements.
   - **Step 2:** The 4 elements (1. Prozess-Röntgenbild Status Quo, 2. Rote Schattenkosten-Berechnung in Euro, 3. Soll-Roadmap mit Make/Lexoffice/DATEV, 4. Fördermittel-Indikation & Amortisation) must be rendered in crisp, client-side vector layout via `jspdf`.
   - **Step 3:** The report must be exportable from both `OnboardingView.jsx` (Audit-Tab) and `SopManager.jsx` (Showcase-Rechner), calculating exact payback periods (< 2.5 months) and crediting the 500 € audit fee against Stufe 2.

2. **R3 Architecture (Mandanten-Portal & AaaS Dashboard):**
   - **Step 1:** Extract the inline client portal JSX out of monolithic `App.jsx` into a clean, dedicated component `src/components/ClientPortalView.jsx`.
   - **Step 2:** Implement the Live Interface Monitoring component with green status badges for Make.com, Lexoffice, DATEV Belegbilderservice, and GoBD Cloud Archive, plus a 1-click health check simulation running Blueprint 4 logic.
   - **Step 3:** Implement real-time metrics for processed monthly receipts, saved office Sundays, and cumulative saved hours/euros.
   - **Step 4:** Enhance the Support-Ticket-System with Retainer quota management (200 € / Month "Digitaler Hausmeister" with 60 min inclusion tracker, priority triage, and fair-use SLA guard).

---

## 3. Caveats

- **No Caveats.** Existing `jspdf` installation and data models in `constants/` are completely adequate and ready for immediate implementation without any architectural blockers or new dependencies.

---

## 4. Conclusion

The specification in `survey_features.md` provides a complete, granular blueprint for:
- **Milestone 2 Sub-Orchestrator:** Implementation of `src/services/pdfReportGenerator.js` and integration into `OnboardingView.jsx` and `SopManager.jsx`.
- **Milestone 3 Sub-Orchestrator:** Implementation of `src/components/ClientPortalView.jsx` with Make/Lexoffice/DATEV status monitoring, live KPI trackers, and AaaS Retainer ticket system with 60-min quota management.

---

## 5. Verification Method

To verify these findings and proceed with implementation:
1. **Inspect Report:** View `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\survey_explorer_3\survey_features.md`.
2. **Inspect Existing Components:**
   - `src/components/OnboardingView.jsx`
   - `src/components/SopManager.jsx`
   - `src/constants/initialData.js`
   - `src/constants/makeBlueprintsData.js`
   - `DOCS/B2B Automatisierungs Agentur Preistreppe.md`
   - `DOCS/AaaS_Wartungsvertrag_Digitaler_Hausmeister_200EUR.md`
3. **Run Existing Tests & Build:**
   - `npm run test:all`
   - `npm run build`

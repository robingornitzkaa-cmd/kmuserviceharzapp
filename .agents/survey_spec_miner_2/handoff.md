# Handoff Report — survey_spec_miner_2

**Type:** Hard Handoff (Task Complete)  
**Date:** 2026-08-24T19:03:00Z  
**Author:** `survey_spec_miner_2` (teamwork_preview_spec_miner)  
**Recipient:** Project Orchestrator (`837d00d0-3bc7-4283-a549-e5b29fe6f754`)  
**Artifact:** `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\survey_spec_miner_2\spec_report.md`

---

## 1. Observation

1. **Authoritative Standard & Requirement Analysis:**
   - Evaluated `ORIGINAL_REQUEST.md` (Lines 12–30 and 40–56) regarding Requirement 4 (E-Rechnungs- & ZUGFeRD / XRechnung Prüf-Studio) and Requirement 1 (Steuerberater-Multiplikatoren-Kit & Handwerker-Direct-Mail-Kampagne).
   - Analysed European Invoicing Standard **EN 16931-1:2017**, German CIUS **XRechnung 3.0.x**, and hybrid **ZUGFeRD 2.2 / Factur-X 1.0.07** specifications.
   - Analysed existing project codebase (`src/App.jsx:1695-1765`, `src/components/DashboardView.jsx:918-1070`, `src/components/DocsHub.jsx:105-215`, `src/constants/initialData.js:204-250`, `DOCS/B2B Vertriebsplan KMU Harz.md:1-120`).

2. **Existing Implementation Findings:**
   - The current app contains a prototype generator in `DashboardView.jsx` producing simple jsPDF bills and a mock XML preview, but lacks a complete EN 16931 parser, PDF-attachment extractor, and structured 3-tier diagnostic report.
   - The repository has foundational strategy documents in `DOCS/`, but requires the explicit, standardized marketing and sales copy assets (Steuerberater Pitch Deck, Mandanten-Flyer, 518 Meister Direct-Mail 1-Pager, Telefon- & Kaltakquise-Leitfaden) both as standalone markdown in `DOCS/` and registered in `INITIAL_DOCS` for the interactive in-app DocsHub.

---

## 2. Logic Chain

1. **R4 Architecture (E-Rechnung Prüf-Studio):**
   - Electronic invoices come in two distinct XML syntaxes: UN/CEFACT CII (`rsm:CrossIndustryInvoice`) and OASIS UBL 2.1 (`Invoice`).
   - By creating an XML parser that normalizes both CII and UBL into a unified semantic interface (`IInvoiceData`), the validation rules (mandatory BT-1..BT-115, mathematical checks BR-CO-10..18, tax calculation) are cleanly decoupled from the XML syntax format.
   - For PDF/A-3 hybrid invoices (ZUGFeRD), pure client-side stream extraction using `DecompressionStream` and regex boundary scanning guarantees privacy (zero server upload) and instant feedback.
   - The 3-tier traffic light protocol (🟢 Green, 🟡 Yellow, 🔴 Red) provides actionable, user-friendly guidance directly mapping to EN 16931 Business Term IDs.

2. **R1 Architecture (Multiplikatoren-Kit & Direct-Mail):**
   - In rural markets like Harz, cold calling craftsmen requires overcoming extreme gatekeeper skepticism and fear of complex IT projects.
   - Positioning KMU Service Harz through the tax advisor channel ("Befreiung vom Pendelordner aus der Hölle" with zero cost for the tax firm) creates a high-trust referral loop.
   - Clear distinction between DATEV Rechnungsdatenservice 1.0 (RDS 1.0) and Buchungsdatenservice (BDS) establishes technical credibility with tax accountants.
   - Direct-Mail with the psychological hook ("Schluss mit dem Büro-Sonntag") and 50% subsidy indication drives traffic to the automated 500 € ROI-Audit.

---

## 3. Caveats

- **No Caveats.** Both specifications are fully documented with exact field mappings, calculation tolerances (±0.02 €), XPath queries, copytexts, and UI interaction designs.
- Note on PDF decompression: Modern browsers support native `DecompressionStream('deflate')`. For older webview environments, fallback uncompressed regex scanning is included in the specification.

---

## 4. Conclusion

The specification report `spec_report.md` contains all technical and content assets required for implementation:
- Full field-level mappings for CII and UBL XML syntaxes.
- Complete mathematical validation algorithms (BR-CO-10 through BR-CO-18).
- Pure client-side PDF/A-3 attachment extraction logic.
- Complete, verbatim German copy for all 4 sales and multiplier assets (Kanzlei-Pitch Deck, Mandanten-Flyer, 518 Harz Meister Direct-Mail, Telefon- & Kaltakquise-Leitfaden).

---

## 5. Verification Method

1. **Verify Report Existence & Completeness:**
   - Inspect `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\survey_spec_miner_2\spec_report.md`.
   - Confirm presence of Features Discovered table, Edge Cases table, XML XPath reference table, and full copy templates.
2. **Project Integrity Check:**
   - Run `npm run test:all` (61 existing tests).
   - Run `npm run build` (Vite build).

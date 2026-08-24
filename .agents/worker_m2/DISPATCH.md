## 2026-08-24T19:07:42Z

Mission:
Implement Requirement 2: Automatisierter 500 € „Büro-Stress-Test & ROI-Report“ PDF-Generator:
1. Create `src/services/pdfReportGenerator.js` using `jspdf` to generate the 4-part report:
   - Teil 1: Prozess-Röntgenbild Status Quo (Visual step-by-step breakdown: Baustelle -> Notizzettel -> Sonntags-Excel -> Word-Rechnung -> Pendelordner)
   - Teil 2: Rote Schattenkosten-Berechnung in Euro (Formula: Wasted weekly hours * 4.33 * Master hourly rate [65 €] * 12 months, highlighted in red badge)
   - Teil 3: Soll-Roadmap mit Make/Lexoffice/DATEV (4-Phasen Implementierungsplan mit Meilensteinen)
   - Teil 4: Fördermittel-Indikation & Amortisations-Kalkulation (Niedersachsen Digitalbonus 50%, Sachsen-Anhalt Digital Creativity, BUND go-digital, 100% Anrechnung der 500 € Audit-Gebühr auf Stufe 2, Amortisation in < 2.5 Monaten).
   - Crisp professional multi-page vector layout with KMU Service Harz branding, header/footer, badges, tables, and signature block.
2. Integrate `generateStressTestPDF` into `src/components/OnboardingView.jsx` (Audit-Tab button "500 € Prüfbericht PDF exportieren") and `src/components/SopManager.jsx` (Showcase ROI-Rechner "PDF-Report generieren").
3. Verify by running tests.

Write handoff.md in your working directory and send a message when complete.

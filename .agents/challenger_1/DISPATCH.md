## 2026-08-24T19:45:01Z

You are teamwork_preview_challenger (ID: challenger_1).
Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\challenger_1
Read:
- ORIGINAL_REQUEST.md: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\ORIGINAL_REQUEST.md
- PROJECT.md: c:\Users\gorni\Desktop\kmuserviceharzapp\PROJECT.md
- `src/services/eInvoiceParser.js`
- `src/services/pdfReportGenerator.js`

Mission:
Conduct adversarial stress testing and edge-case verification on the E-Invoice parser (`eInvoiceParser.js`) and PDF generator (`pdfReportGenerator.js`):
1. Test E-Invoice parser with:
   - Malformed/invalid XML, unclosed tags, empty strings, binary garbage
   - XML with missing mandatory BT fields (missing invoice number, missing date, missing buyer, missing seller VAT ID)
   - XML with math discrepancies > 0.02 € (tax rounding mismatch, line item sum discrepancy)
   - Corrupted or non-hybrid PDF files without embedded XML
   - Invoices with multiple line items, special characters (German umlauts ä/ö/ü/ß), and extreme monetary amounts
2. Test PDF generator with:
   - Zero hours, negative numbers, extreme hours (168 h/week), zero hourly rate
   - Empty company names, special characters, long text strings
   - Various subsidy regions (NDS, LSA, TH, BUND, NONE) and playbook combinations

Write a comprehensive adversarial stress test file and execute it with vitest.
Provide your verdict: APPROVE or REQUEST_CHANGES with gap analysis.
Write handoff.md in your working directory and send a message.

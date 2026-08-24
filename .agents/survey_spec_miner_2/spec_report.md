# Technical Specification & Spec Mining Report: Requirement 4 (E-Rechnungs Prüf-Studio) & Requirement 1 (Multiplikatoren-Kit & Direct-Mail)

**Agent ID:** `survey_spec_miner_2`  
**Date:** 2026-08-24  
**Scope:** Specification mining for R4 (E-Rechnungs- & ZUGFeRD / XRechnung Prüf-Studio) and R1 (Steuerberater-Multiplikatoren-Kit & Direct-Mail Suite)  
**Target Systems:** React 19 Frontend, Vite, Vitest, DocsHub, PDF/XML Validation Engine  

---

## 1. Executive Summary

This report establishes the complete technical and content specifications for implementing **Requirement 4 (E-Rechnungs- & ZUGFeRD / XRechnung Prüf-Studio)** and **Requirement 1 (Steuerberater-Multiplikatoren-Kit & Handwerker-Direct-Mail-Kampagne)** for KMU Service Harz.

1. **Requirement 4 Specification**: Establishes a zero-dependency, pure client-side XML/PDF validation engine compliant with **EN 16931**, **XRechnung 3.0.x**, and **ZUGFeRD 2.2 / Factur-X 1.0.07**. It defines exact XPath mappings for both **CII (Cross Industry Invoice)** and **UBL 2.1 (Universal Business Language)** syntaxes, mandatory Business Terms (BTs), mathematical balance checks (net + vat = gross), PDF/A-3 embedded stream extraction, and a 3-tier diagnostic traffic light protocol (🟢 Valid, 🟡 Warning, 🔴 Error).
2. **Requirement 1 Specification**: Provides ready-to-deploy, high-converting copy and structural blueprints for the Harz B2B sales campaign:
   - **Steuerberater Kanzlei-Pitch Deck & Leitfaden** (DATEV Rechnungsdatenservice 1.0 vs. Buchungsdatenservice, GoBD-Verfahrensdokumentation, zero-cost partner model).
   - **Mandanten-Flyer** (Printable referral collateral for tax advisors to give to craftsmen).
   - **Direct-Mail 1-Pager** (Addressed letter to 518 regional master craftsmen in Harz with the "Schluss mit dem Büro-Sonntag" psychological hook).
   - **Telefon- & Kaltakquise-Leitfaden** (Dedicated scripts for gatekeepers/assistants and masters on construction sites, including 3 pain hooks and 5-point validation-pivot-next-step objection handling).

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | R4: E-Rechnung | XML Syntax & Format Detector | Detects whether uploaded XML file is UN/CEFACT CII (`rsm:CrossIndustryInvoice`) or OASIS UBL 2.1 (`Invoice` / `CreditNote`). | Raw XML text or ArrayBuffer | Format Type (`CII` \| `UBL` \| `UNKNOWN`), Root Element, Profile ID | Returns `UNKNOWN` and raises syntax parsing error if XML is malformed or invalid root. | EN 16931-1:2017 & KoSIT XRechnung 3.0 |
| 2 | R4: E-Rechnung | Hybrid PDF / ZUGFeRD XML Extractor | Scans uploaded PDF/A-3 files for embedded XML attachments (`factur-x.xml`, `zugferd-invoice.xml`, `xrechnung.xml`) and extracts raw XML stream. | File Blob / ArrayBuffer of PDF | Extracted XML string & Embedded Attachment Metadata | Returns warning/error if PDF is not PDF/A-3 or contains no embedded XML invoice stream. | ISO 19005-3 / ZUGFeRD 2.2 Factur-X Spec |
| 3 | R4: E-Rechnung | EN 16931 Mandatory Field Parser | Extracts all required business terms: Invoice ID (BT-1), Issue Date (BT-2), Delivery Date (BT-72/73), Creditor/Debitor (BT-27/BT-44), VAT ID (BT-31), Line Items (BG-25), Tax Breakdown (BG-23), Totals (BG-22). | Parsed DOM / XML Tree | Structured JavaScript Invoice Object (`IInvoiceData`) | Flags missing mandatory fields with specific Business Term IDs (e.g. `BT-1`, `BT-31`). | EN 16931-1 Semantic Data Model |
| 4 | R4: E-Rechnung | Leitweg-ID / BuyerReference Validator | Validates German public sector / B2B routing identifier format (e.g., `15082000-0001-34` or custom buyer ref). | `BuyerReference` / `BT-10` string | Validation status: Valid Leitweg-ID, Valid B2B Ref, or Missing | Warning in B2B context; Error in B2G XRechnung context if checksum is invalid. | KoSIT Leitweg-ID Format Specification |
| 5 | R4: E-Rechnung | Mathematical Consistency Engine | Verifies sum of line net amounts equals line total amount (BR-CO-10), sum of tax amounts per category equals tax total (BR-CO-14), and net + tax = gross (BR-CO-15) within 0.02 € rounding tolerance. | Invoice Lines, Tax Subtotals, Monetary Totals | Mathematical Verification Result & Line/Total Diff in EUR | Flags rounding errors (> 0.02 €) or calculation discrepancies as Red Errors. | EN 16931 Calculation Rules BR-CO-10..18 |
| 6 | R4: E-Rechnung | 3-Tier Ampel Prüfprotokoll UI | Visual inspection dashboard displaying Green/Yellow/Red indicators per category (Header, Parties, Lines, Taxes, Totals, Compliance) with line-by-line problem location. | Validation Result Object | Interactive React Component with Accordion & Details Modal | Renders clear actionable correction tips for every detected defect. | ORIGINAL_REQUEST.md Requirement 4 |
| 7 | R4: E-Rechnung | Sample Invoice Showcase Loader | Built-in sample invoices (ZUGFeRD 2.2 CII Comfort, XRechnung 3.0 UBL Standard, Faulty Invoice with missing tax/totals) for instant demonstration without external file. | Trigger button selection | Loads pre-configured sample XML into validator | Gracefully resets parser state. | Quality & Demo Acceptance Criteria |
| 8 | R4: E-Rechnung | PDF/JSON Audit Report Exporter | Generates a downloadable compliance certificate / Prüfbericht summarizing validation status, timestamp, EN 16931 conformity, and findings. | Validated Invoice State | JSON / PDF Export | Generates formatted audit summary. | ORIGINAL_REQUEST.md Requirement 4 |
| 9 | R1: Sales Suite | Steuerberater Pitch Deck & Kanzleileitfaden | Complete multi-slide presentation & guide for tax advisors positioning KMU Service Harz as external IT workbench (DATEV RDS 1.0, Pendelordner-Befreiung, GoBD). | Target Kanzlei Profile | Markdown & Slide Deck in DocsHub / DOCS | N/A (Documentation & Sales Asset) | ORIGINAL_REQUEST.md Requirement 1 & DOCS/ |
| 10 | R1: Sales Suite | Mandanten-Flyer Vorlage | Printable 2-sided handout template for tax advisors to give to clients suffering from receipt chaos and weekend paperwork. | Print / PDF Template | Markdown / HTML Printable Asset in DocsHub | N/A | ORIGINAL_REQUEST.md Requirement 1 |
| 11 | R1: Sales Suite | Direct-Mail 1-Pager (518 Harz Meister) | High-converting direct mail copy addressing 518 regional craft masters with "Schluss mit dem Büro-Sonntag" and QR code link to 500 € audit. | Master Craftsman Address List | Direct-Mail Letter in DocsHub / DOCS | N/A | ORIGINAL_REQUEST.md Requirement 1 |
| 12 | R1: Sales Suite | Telefon- & Kaltakquise-Leitfaden | Complete phone acquisition script covering gatekeeper navigation, on-site master pitches (3 hooks), and 5-point validation-pivot objection handling. | Calling Context (Sekretariat vs Baustelle) | Structured Script & SOP in DocsHub / SopManager | N/A | ORIGINAL_REQUEST.md Requirement 1 & DOCS/ |

---

## 3. Edge Cases

| # | Feature | Input | Observed / Specified Behavior |
|---|---------|-------|-------------------------------|
| 1 | XML Format Detection | UTF-8 with Byte Order Mark (BOM: `\uFEFF`) | Parser must strip BOM before DOM parsing; otherwise `DOMParser.parseFromString` fails with XML declaration error. |
| 2 | XML Format Detection | XML with default namespace without prefix vs prefixed namespaces (`rsm:`, `ram:`, `ubl:`, `cac:`, `cbc:`) | Parser must use namespace-agnostic localName queries (`getElementsByTagNameNS` or fallback `[localName='...']`) to reliably match elements regardless of prefix aliases. |
| 3 | Date Parsing | Date formatted as ISO `2026-06-30`, UN/CEFACT format 102 `20260630`, or german `30.06.2026` | Normalizer parses `102` (YYYYMMDD) and ISO-8601 into a unified JavaScript Date / `YYYY-MM-DD` representation. Invalid format flags `BT-2` yellow warning. |
| 4 | PDF Extraction | Standard PDF without embedded files | Extractor detects lack of `/EmbeddedFiles` or `/AF` dictionary, alerts user with helpful message: "Standard PDF ohne eingebettete XML-Daten (kein ZUGFeRD/Factur-X Format). Bitte XML separat hochladen." |
| 5 | PDF Extraction | PDF/A-3 containing compressed Flate streams | Extractor searches for `factur-x.xml` or `<rsm:CrossIndustryInvoice` stream, decompresses stream via `DecompressionStream` (native browser API) or regex buffer decoder. |
| 6 | Rounding & Totals | Subcent rounding where sum of lines is 100.004 € vs invoice total 100.00 € | Validation allows a tolerance of `±0.02 €` for standard rounding differences according to EN 16931 BR-CO-15 / BR-CO-16 rules. Differences > 0.02 € flag a 🔴 Red Error. |
| 7 | Tax Breakdown | Multi-tax invoices (e.g. 19% Standard + 7% Reduced + 0% Reverse Charge §13b) | Validation groups line items by tax category and rate, compares each group sum to the corresponding `ApplicableTradeTax` / `TaxSubtotal` basis and tax amount. |
| 8 | Buyer Reference | Missing `BuyerReference` (BT-10) in private B2B invoice vs B2G public authority invoice | In B2B profile (ZUGFeRD Comfort/Basic): 🟡 Warning (recommended). In XRechnung B2G profile: 🔴 Error (mandatory Leitweg-ID). |
| 9 | Direct-Mail QR Code | Variable target URLs (App Stresstest vs Onboarding vs Landing Page) | Template includes explicit placeholder `https://kmuserviceharz.de/stresstest?ref=meister518` and high-contrast SVG QR code fallback. |
| 10 | Script Roleplay | Craftsman interrupts mid-call: "Ich bin auf dem Gerüst, keine Zeit!" | Phone script specifies immediate 3-second recovery pivot: "Verstehe ich, Herr Meister, ich halte Sie keine Sekunde auf. Nur 1 Frage: Darf ich Ihnen den 2-Minuten Stresstest per Mail an die info@ schicken? Ja oder Nein?" |

---

## 4. Deep Technical Specification: Requirement 4 (E-Rechnungs- & ZUGFeRD / XRechnung Prüf-Studio)

### 4.1 Normative Standards Architecture

The E-Invoicing Prüf-Studio must evaluate electronic invoices against the following hierarchy of standards:
1. **EN 16931-1:2017**: The core semantic data model for electronic invoices in the European Union.
2. **XRechnung (Version 3.0.x)**: The German CIUS (Core Invoice Usage Specification) maintained by KoSIT (Koordinierungsstelle für IT-Standards). Mandatory for B2G and standard for German B2B.
3. **ZUGFeRD 2.2 / Factur-X 1.0.07**: The Franco-German hybrid format standard combining PDF/A-3 visual presentation with embedded EN 16931 XML (Profiles: MINIMUM, BASIC WL, BASIC, EN 16931 / COMFORT, EXTENDED, XRECHNUNG).

```
+-----------------------------------------------------------------------------------+
|                            EU-NORM EN 16931-1:2017                                |
|             (Semantisches Datenmodell für elektronische Rechnungen)               |
+-----------------------------------------+-----------------------------------------+
                                          |
        +---------------------------------+---------------------------------+
        |                                                                   |
+-------v---------------------------------+                 +---------------v-------------------+
|   CII (UN/CEFACT Cross Industry Invoice)|                 |  UBL 2.1 (Universal Business Lang)|
|   - ZUGFeRD 2.x / Factur-X              |                 |  - XRechnung UBL Standard         |
|   - XRechnung CII                       |                 |  - Peppol BIS Billing 3.0         |
|   - Root: rsm:CrossIndustryInvoice      |                 |  - Root: Invoice / CreditNote     |
+-----------------------------------------+                 +-----------------------------------+
```

---

### 4.2 Syntax Profiles & Namespace Declarations

#### A. UN/CEFACT CII (Cross Industry Invoice)
- **Root Element:** `<rsm:CrossIndustryInvoice>`
- **Namespaces:**
  - `xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"`
  - `xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"`
  - `xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:100"`
  - `xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100"`

#### B. OASIS UBL 2.1 (Universal Business Language)
- **Root Element:** `<Invoice>` or `<CreditNote>`
- **Namespaces:**
  - `xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"`
  - `xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"`
  - `xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"`

---

### 4.3 Semantic Business Term Mapping Matrix (EN 16931 to CII & UBL)

The validator maps parsed XML nodes to a unified JavaScript interface:

```typescript
interface IInvoiceData {
  format: 'CII' | 'UBL';
  profile: string; // e.g. "urn:cen.eu:en16931:2017" or "urn:factur-x.eu:1p0:comfort"
  invoiceNumber: string; // BT-1
  issueDate: string; // BT-2 (YYYY-MM-DD)
  invoiceTypeCode: string; // BT-3 (380=Invoice, 381=Credit Note)
  currency: string; // BT-5 (e.g. EUR)
  buyerReference: string; // BT-10 (Leitweg-ID / PO Reference)
  deliveryDate?: string; // BT-72
  billingPeriodStart?: string; // BT-73
  billingPeriodEnd?: string; // BT-74
  seller: { // BG-4
    name: string; // BT-27
    street: string; // BT-35
    postalCode: string; // BT-38
    city: string; // BT-37
    countryCode: string; // BT-40
    vatId?: string; // BT-31 (e.g. DE123456789)
    taxNumber?: string; // BT-32
    email?: string; // BT-34
  };
  buyer: { // BG-7
    name: string; // BT-44
    street: string; // BT-50
    postalCode: string; // BT-53
    city: string; // BT-52
    countryCode: string; // BT-55
    vatId?: string; // BT-48
    endpointId?: string; // BT-49
  };
  payment: { // BG-16
    paymentMeansCode: string; // BT-81 (e.g. 58 = SEPA Credit Transfer, 30/31 = Wire)
    iban?: string; // BT-84
    bic?: string; // BT-86
    paymentTerms?: string; // BT-20
    dueDate?: string; // BT-9
  };
  lines: Array<{ // BG-25
    id: string; // BT-126
    name: string; // BT-153
    description?: string; // BT-154
    quantity: number; // BT-129
    unitCode: string; // BT-130 (e.g. C62, HUR, MTR, KGM, SET)
    unitPrice: number; // BT-146
    taxRate: number; // BT-152 (e.g. 19.00)
    taxCategory: string; // BT-151 (e.g. S, Z, E, AE)
    lineTotalNet: number; // BT-131
  }>;
  taxBreakdown: Array<{ // BG-23
    taxCategory: string; // BT-118
    taxRate: number; // BT-119
    basisAmount: number; // BT-116
    taxAmount: number; // BT-117
    exemptionReason?: string; // BT-120
  }>;
  monetaryTotals: { // BG-22
    lineTotalNet: number; // BT-106 (Sum of line net amounts)
    allowanceTotal?: number; // BT-107
    chargeTotal?: number; // BT-108
    taxBasisTotal: number; // BT-109 (Taxable Net Total)
    taxTotal: number; // BT-110 (Total VAT)
    grandTotal: number; // BT-112 (Gross Total)
    prepaidAmount?: number; // BT-113
    duePayableAmount: number; // BT-115 (Amount Due)
  };
}
```

#### Detailed XPath Reference Table

| EN 16931 BT/BG | Field Name | UN/CEFACT CII XPath | OASIS UBL 2.1 XPath | Mandatory? |
|---|---|---|---|---|
| **BT-1** | Rechnungsnummer | `rsm:ExchangedDocument/ram:ID` | `cbc:ID` | **Ja (Mandatory)** |
| **BT-2** | Rechnungsdatum | `rsm:ExchangedDocument/ram:IssueDateTime/udt:DateTimeString` | `cbc:IssueDate` | **Ja (Mandatory)** |
| **BT-3** | Rechnungstyp-Code | `rsm:ExchangedDocument/ram:TypeCode` | `cbc:InvoiceTypeCode` | **Ja (Mandatory)** |
| **BT-5** | Währung | `.../ram:ApplicableHeaderTradeSettlement/ram:InvoiceCurrencyCode` | `cbc:DocumentCurrencyCode` | **Ja (Mandatory)** |
| **BT-10** | Leitweg-ID / Referenz | `.../ram:ApplicableHeaderTradeAgreement/ram:BuyerReference` | `cbc:BuyerReference` | **B2G: Pflicht / B2B: Empfohlen** |
| **BT-72** | Leistungsdatum | `.../ram:ApplicableHeaderTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/...` | `cac:Delivery/cbc:ActualDeliveryDate` | **Ja (Leistungsdatum oder Zeitraum)** |
| **BT-73/74** | Leistungszeitraum | `.../ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime...` | `cac:InvoicePeriod/cbc:StartDate` & `cbc:EndDate` | Alternativ zu BT-72 |
| **BT-27** | Verkäufer Name | `.../ram:SellerTradeParty/ram:Name` | `cac:AccountingSupplierParty/cac:Party/cac:PartyName/cbc:Name` | **Ja (Mandatory)** |
| **BT-35** | Verkäufer Straße | `.../ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineOne` | `cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:StreetName` | **Ja (Mandatory)** |
| **BT-38** | Verkäufer PLZ | `.../ram:SellerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode` | `cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:PostalZone` | **Ja (Mandatory)** |
| **BT-37** | Verkäufer Ort | `.../ram:SellerTradeParty/ram:PostalTradeAddress/ram:CityName` | `cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:CityName` | **Ja (Mandatory)** |
| **BT-40** | Verkäufer Land | `.../ram:SellerTradeParty/ram:PostalTradeAddress/ram:CountryID` | `cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cac:Country/cbc:IdentificationCode` | **Ja (Mandatory)** |
| **BT-31** | Verkäufer USt-IdNr | `.../ram:SellerTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='VA']` | `cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID` | **Ja (USt-IdNr oder Steuernr.)** |
| **BT-44** | Käufer Name | `.../ram:BuyerTradeParty/ram:Name` | `cac:AccountingCustomerParty/cac:Party/cac:PartyName/cbc:Name` | **Ja (Mandatory)** |
| **BT-50** | Käufer Straße | `.../ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineOne` | `cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:StreetName` | **Ja (Mandatory)** |
| **BT-53** | Käufer PLZ | `.../ram:BuyerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode` | `cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:PostalZone` | **Ja (Mandatory)** |
| **BT-52** | Käufer Ort | `.../ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CityName` | `cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:CityName` | **Ja (Mandatory)** |
| **BT-55** | Käufer Land | `.../ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CountryID` | `cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cac:Country/cbc:IdentificationCode` | **Ja (Mandatory)** |
| **BG-25** | Positionen | `.../ram:IncludedSupplyChainTradeLineItem` | `cac:InvoiceLine` | **Mindestens 1 Position** |
| **BT-153** | Positionsbezeichnung | `.../ram:SpecifiedTradeProduct/ram:Name` | `cac:Item/cbc:Name` | **Ja** |
| **BT-129** | Positionsmenge | `.../ram:SpecifiedLineTradeDelivery/ram:BilledQuantity` | `cbc:InvoicedQuantity` | **Ja** |
| **BT-130** | Mengeneinheit | `.../ram:SpecifiedLineTradeDelivery/ram:BilledQuantity/@unitCode` | `cbc:InvoicedQuantity/@unitCode` | **Ja (UN/ECE Rec 20, z.B. C62, HUR)** |
| **BT-146** | Netto-Einzelpreis | `.../ram:NetPriceProductTradePrice/ram:ChargeAmount` | `cac:Price/cbc:PriceAmount` | **Ja** |
| **BT-152** | Steuersatz Pos. | `.../ram:ApplicableTradeTax/ram:RateApplicablePercent` | `cac:Item/cac:ClassifiedTaxCategory/cbc:Percent` | **Ja** |
| **BT-131** | Positions-Nettobetrag | `.../ram:SpecifiedTradeSettlementLineMonetarySummation/ram:LineTotalAmount` | `cbc:LineExtensionAmount` | **Ja** |
| **BG-23** | Steueraufschlüsselung | `.../ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax` | `cac:TaxTotal/cac:TaxSubtotal` | **Ja** |
| **BT-109** | Gesamt-Netto | `.../ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxBasisTotalAmount` | `cac:LegalMonetaryTotal/cbc:TaxExclusiveAmount` | **Ja** |
| **BT-110** | Gesamt-Steuer | `.../ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount` | `cac:TaxTotal/cbc:TaxAmount` | **Ja** |
| **BT-112** | Gesamt-Brutto | `.../ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:GrandTotalAmount` | `cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount` | **Ja** |
| **BT-115** | Fälliger Zahlbetrag | `.../ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:DuePayableAmount` | `cac:LegalMonetaryTotal/cbc:PayableAmount` | **Ja** |

---

### 4.4 Mathematical Validation Rules & Calculation Constraints

The validator executes automated business checks based on EN 16931-1 rule definitions:

```
[BR-CO-10] Sum of Line Net Amounts:
           Sum(Line[i].lineTotalNet) == monetaryTotals.lineTotalNet (±0.02 €)

[BR-CO-14] Sum of Tax Subtotals:
           Sum(taxBreakdown[k].taxAmount) == monetaryTotals.taxTotal (±0.02 €)

[BR-CO-15] Invoice Grand Total Balance:
           monetaryTotals.taxBasisTotal + monetaryTotals.taxTotal == monetaryTotals.grandTotal (±0.02 €)

[BR-CO-16] Amount Due:
           monetaryTotals.grandTotal - (prepaidAmount || 0) == monetaryTotals.duePayableAmount (±0.02 €)

[BR-LINE-1] Line Calculation:
           Line[i].quantity * Line[i].unitPrice == Line[i].lineTotalNet (±0.02 €)

[BR-TAX-1]  Tax Subtotal Calculation:
           taxBreakdown[k].basisAmount * (taxBreakdown[k].taxRate / 100) == taxBreakdown[k].taxAmount (±0.02 €)
```

---

### 4.5 PDF/A-3 Embedded XML Extraction Algorithm (Pure Client-Side JS)

For ZUGFeRD 2.x and Factur-X hybrid invoices, the PDF stream contains an embedded XML file. To enable 100% offline and privacy-preserving validation in the browser:

```javascript
/**
 * Extracts embedded XML (factur-x.xml or zugferd-invoice.xml) from a PDF ArrayBuffer
 */
export async function extractXmlFromPdfBuffer(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const textDecoder = new TextDecoder('iso-8859-1');
  const pdfString = textDecoder.decode(bytes);

  // Strategy 1: Direct uncompressed XML stream search
  const ciiMatch = pdfString.match(/<(?:\w+:)?CrossIndustryInvoice[\s\S]*?<\/(?:\w+:)?CrossIndustryInvoice>/i);
  if (ciiMatch) {
    return new TextDecoder('utf-8').decode(
      new Uint8Array(arrayBuffer.slice(pdfString.indexOf(ciiMatch[0]), pdfString.indexOf(ciiMatch[0]) + ciiMatch[0].length))
    );
  }

  const ublMatch = pdfString.match(/<(?:\w+:)?Invoice[\s\S]*?<\/(?:\w+:)?Invoice>/i);
  if (ublMatch) {
    return new TextDecoder('utf-8').decode(
      new Uint8Array(arrayBuffer.slice(pdfString.indexOf(ublMatch[0]), pdfString.indexOf(ublMatch[0]) + ublMatch[0].length))
    );
  }

  // Strategy 2: EmbeddedFile Flate stream extraction
  // Locate /Type /EmbeddedFile or /EF << /F ... >> streams
  const streamRegex = /<<[^>]*\/Type\s*\/EmbeddedFile[^>]*>>\s*stream[\r\n]+([\s\S]*?)[\r\n]+endstream/gi;
  let match;
  while ((match = streamRegex.exec(pdfString)) !== null) {
    const rawStream = match[1];
    const streamStart = pdfString.indexOf(rawStream, match.index);
    const compressedBytes = bytes.subarray(streamStart, streamStart + rawStream.length);
    
    // Attempt browser native DecompressionStream (deflate)
    try {
      const ds = new DecompressionStream('deflate');
      const writer = ds.writable.getWriter();
      writer.write(compressedBytes);
      writer.close();
      const decompressedBuffer = await new Response(ds.readable).arrayBuffer();
      const decompressedText = new TextDecoder('utf-8').decode(decompressedBuffer);
      if (decompressedText.includes('CrossIndustryInvoice') || decompressedText.includes('Invoice')) {
        return decompressedText;
      }
    } catch {
      // Continue to next stream if decompression fails
    }
  }

  throw new Error('Kein gültiger ZUGFeRD / Factur-X XML-Datenstrom in dieser PDF-Datei gefunden.');
}
```

---

### 4.6 Visual Validator UI & Traffic Light (Ampel) Protocol

The Prüf-Studio UI provides:
1. **Dropzone:** Drag & drop support for `.xml` and `.pdf` files.
2. **Preset Selector:** One-click load for sample invoices (Valid ZUGFeRD 2.2 CII, Valid XRechnung 3.0 UBL, and an invalid invoice with deliberate errors).
3. **Summary Badge:** Overall validation status:
   - 🟢 **Konform (Valid)**: EN 16931 compliant, all mandatory BTs present, balance check passed.
   - 🟡 **Warnung (Warning)**: Minor non-critical discrepancies (e.g. missing Leitweg-ID in B2B mode, missing contact telephone).
   - 🔴 **Nicht Konform (Error)**: Critical violations (missing tax ID, calculation error, missing mandatory party address).
4. **Interactive Inspection Tabs:**
   - 📑 **Prüfprotokoll (Diagnostic Log)**: Grouped by Header, Seller, Buyer, Line Items, Taxes & Sums.
   - 👁️ **Visueller Beleg (Visual Layout)**: Rendered invoice layout for human verification.
   - 💻 **XML-Code-Inspektor**: Formatted syntax view with search and copy functionality.

---

## 5. Deep Specification: Requirement 1 (Multiplikatoren-Kit & Direct-Mail)

### 5.1 Steuerberater-Pitch Deck & Kanzleileitfaden

**Document File Target:** `DOCS/Steuerberater_Kanzlei_Pitch_und_Leitfaden.md` & DocsHub  
**Theme:** „Befreiung vom Pendelordner aus der Hölle – Wie Ihre Kanzlei 10+ Stunden pro Handwerker-Mandant im Monat gewinnt“

#### Slide-by-Slide Presentation Structure
- **Slide 1: Titel:** „Vom Pendelordner zur automatischen DATEV-Übergabe: KMU Service Harz als externe IT-Werkbank für Ihre Kanzlei.“
- **Slide 2: Das Kanzlei-Dilemma:** Fachkräftemangel in der Fibu, Belege treffen am 9. des Monats per WhatsApp-Foto oder Schuhkarton ein, Kanzleien können nicht als IT-Support für 50 Handwerksbetriebe agieren.
- **Slide 3: Die Lösung (Schlüsselfertige Vorbereitung):** KMU Service Harz fährt zum Handwerker, richtet die Schnittstelle (Lexoffice/sevDesk ➔ DATEV) ein, schult die Monteure und liefert revisionssichere Daten.
- **Slide 4: DATEV RDS 1.0 vs. BDS (Die saubere Rollentrennung):**
  - *DATEV Rechnungsdatenservice 1.0 (RDS 1.0):* Belegbilder und Metadaten (Datum, Betrag, Partner, Rechnungsnummer) fließen in *DATEV Belege online*. Die fachliche Kontierung und Buchungslogik bleibt zu 100% in der Hoheit der Steuerkanzlei.
  - *DATEV Buchungsdatenservice (BDS):* Nur für qualifizierte Selbstbucher, um Fehler im Vorsystem nicht unkorrigiert in Kanzlei-Rechnungswesen zu übernehmen.
- **Slide 5: Revisionssicherheit & GoBD:** Bereitstellung einer individuellen Verfahrensdokumentation für ersetzendes Scannen nach dem Muster der Bundessteuerberaterkammer.
- **Slide 6: Das Null-Kosten-Modell für Kanzleien:** 0 € Honorarbelastung für die Kanzlei. Abrechnung erfolgt direkt mit dem Handwerksbetrieb unter Nutzung von 50% Fördermitteln (Digitalbonus Niedersachsen / Digital Innovation Sachsen-Anhalt).
- **Slide 7: Der gemeinsame Pilotkunden-Prozess:** Auswahl von 2–3 „Sorgenkind-Mandanten“ ➔ 14-Tage-Setup ➔ Kanzlei-Feedbackrunde.

---

### 5.2 Mandanten-Flyer Template

**Document File Target:** `DOCS/Mandanten_Flyer_Kanzlei_Vorlage.md` & DocsHub  
**Format:** A4 Faltblatt / 2-seitiger Info-Flyer (Ausdruckbar & Digital als PDF)

#### Copywriting Blueprint
- **Vorderseite (Headline & Hook):**
  - **Header:** „Empfohlen von Ihrer Steuerkanzlei: Schluss mit Zettelwirtschaft & Sonntagsarbeit.“
  - **Subheadline:** „Wie Harzer Handwerksbetriebe ihre Belegablage komplett auf Autopilot stellen – ohne teure Software oder IT-Vorkenntnisse.“
  - **3 Meister-Vorteile:**
    1. *Kein Belege-Suchen mehr:* Monteure fotografieren Tank- und Materialquittungen an der Kasse via WhatsApp – fertig.
    2. *Gesetzliche E-Rechnung 2025/2026 gelöst:* ZUGFeRD- und XRechnung-Empfang vollautomatisch im Hintergrund.
    3. *Direkte Kanzlei-Verbindung:* Belege landen automatisch, vorkontiert und GoBD-konform bei Ihrem Steuerberater.
- **Rückseite (Ablauf & Gutschein):**
  - **3 einfache Schritte:**
    - Schritt 1: 90-Minuten Potenzial-Audit vor Ort auf Ihrem Betriebshof.
    - Schritt 2: Lautlose Einrichtung der Schnittstellen durch KMU Service Harz.
    - Schritt 3: Entspannte Wochenenden und perfekte DATEV-Monatsabschlüsse.
  - **Gutschein-Box:** „Wertgutschein 500 € – Ihr kostenfreier Büro-Stress-Test & ROI-Check über Ihre Kanzlei.“
  - **QR-Code Call-to-Action:** „Jetzt QR-Code scannen und 5-Fragen Stresstest online starten.“

---

### 5.3 Postalisches Anschreiben (Direct-Mail 1-Pager an 518 Meister)

**Document File Target:** `DOCS/Direct_Mail_518_Harz_Meister_Anschreiben.md` & DocsHub  
**Empfängerkreis:** 518 regional verifizierte Meisterbetriebe im Harz (SHK, Elektro, Bau, Dachdecker, Metallbau, Holz)

#### Verbatim Direct-Mail Copytext
```markdown
KMU Service Harz | Christian Gornitzka | Marktstraße 12, 38640 Goslar
An die Geschäftsleitung
[Firma Handwerksmeister]
[Straße & Hausnummer]
[PLZ & Ort im Harz]

Goslar, den [Datum]

Betreff: Schluss mit dem Büro-Sonntag: Warum 518 Handwerksmeister im Harz 
         ihre Wochenenden nicht mehr am Schreibtisch verbringen müssen.

Sehr geehrter Herr [Nachname],

Ihre Monteure leisten auf der Baustelle saubere Arbeit. Aber wenn am Freitagnachmittag 
eigentlich Feierabend sein sollte, beginnt für Sie die unbezahlte zweite Schicht: 
Zerknitterte Stundenzettel vom Armaturenbrett kratzen, fehlende Materialquittungen 
beim Großhändler nachfordern und am Sonntagvormittag Rechnungen für den Steuerberater 
abtippen.

Damit ist jetzt Schluss.

Wir haben uns als regionaler Automatisierungspartner im Harz auf genau eine Aufgabe 
spezialisiert: Wir befreien Handwerksbetriebe von manueller Zettelwirtschaft und 
richten eine lautlose Beleg- und Zeiterfassung ein – direkt zwischen Baustelle, 
Handy und Steuerberater.

Ihre 3 handfesten Vorteile:
1. Keine neue Software lernen: Ihre Monteure nutzen einfach WhatsApp oder die Handykamera.
2. 100 % E-Rechnungs- und GoBD-Sicherheit: Alle Belege fließen revisionssicher zu DATEV.
3. Bis zu 50 % staatlicher Zuschuss: Über den Digitalbonus Niedersachsen / Sachsen-Anhalt.

Wir schenken Ihnen unser 500-Euro-Büro-Potenzial-Audit:
Scannen Sie den untenstehenden QR-Code mit Ihrem Smartphone oder gehen Sie auf:
👉 https://kmuserviceharz.de/stresstest

Beantworten Sie in 2 Minuten 5 kurze Fragen zu Ihrem Betriebsablauf. Sie erhalten 
sofort Ihr persönliches Prozess-Röntgenbild und sehen schwarz auf weiß, wie viele 
Stunden und Euro Sie monatlich einsparen können.

Mit besten Grüßen aus Goslar,

Christian Gornitzka
Gründer & Automatisierungs-Partner für das Harzer Handwerk
KMU Service Harz | Tel: 05321 / 739 820 | info@kmuserviceharz.de

[ QR-CODE PLATZHALTER ZUM LIVE-STRESSTEST ]
```

---

### 5.4 Telefon- & Kaltakquise-Leitfaden (Vorzimmer & Baustelle)

**Document File Target:** `DOCS/Telefon_und_Kaltakquise_Leitfaden_Harz.md` & DocsHub  

#### Teil 1: Das Vorzimmer- & Assistenz-Skript (Sekretariat / Ehefrau)
- **Ziel:** Kein Abwimmeln („Schicken Sie mal 'ne Mail“), sondern Weiterleitung zum Chef oder verbindliche Durchwahl/Rückrufzeit.
- **Opener:** „Guten Tag Frau [Name], mein Name ist [Name] von KMU Service Harz. Ich rufe ganz kurz an wegen der Belegübergabe an Ihren Steuerberater Herrn [Name / Kanzlei] und der neuen E-Rechnungspflicht. Ist Herr [Meister] gerade im Büro oder auf der Baustelle erreichbar?“
- **Einwand: „Um was geht es genau?“**
  - *Konter:* „Wir unterstützen regionale Handwerksbetriebe dabei, die Stundenzettel und Quittungen von der Baustelle direkt digital ins Büro zu übertragen, damit die Wochenendarbeit bei der Buchhaltung wegfällt. Ich wollte Herrn [Meister] kurz unseren 2-Minuten Stresstest dazu anbieten.“
- **Einwand: „Der Chef hat keine Zeit.“**
  - *Konter:* „Das weiß ich, genau deshalb rufe ich an. Wann hat er morgens vor dem Ausrücken 2 Minuten Zeit – eher um 07:15 Uhr oder abends ab 16:30 Uhr?“

#### Teil 2: Das Baustellen-Skript (Direktkontakt Handwerksmeister)
- **3 Schmerz-Hooks:**
  - *Hook 1 (Regulatorisch - E-Rechnung):* „Herr [Name], ab Januar gilt die E-Rechnungspflicht im B2B. Wir sorgen dafür, dass Ihr Betrieb das lautlos im Hintergrund erfüllt, ohne dass Sie teure neue Software kaufen müssen.“
  - *Hook 2 (Zeitlich - Büro-Sonntag):* „Ich rufe an, damit Sie am Sonntag nicht mehr am Schreibtisch sitzen und Stundenzettel abtippen müssen. Wir haben einen 2-Minuten Stresstest entwickelt, der Ihnen zeigt, wo Sie sofort 4 Stunden pro Woche sparen.“
  - *Hook 3 (Finanziell - Schattenkosten & Förderung):* „Wussten Sie, dass der Staat bis zu 50 % Zuschuss für die Digitalisierung Ihrer Belegablage zahlt? Wir prüfen in 2 Minuten, wie viel Förderung für Sie drin ist.“

#### Teil 3: Die 5-Punkte Einwand-Matrix (Validieren ➔ Pivot ➔ Next Step)

| Einwand des Meisters | 1. Validieren (Druck rausnehmen) | 2. Pivot (Strategische Umkehr) | 3. Next Step (Mikro-Ziel) |
|---|---|---|---|
| **„Wir machen das schon immer so.“** | „Absolut verständlich, Ihr Betrieb läuft seit Jahren erfolgreich damit.“ | „Das Problem ab 2025 ist nicht Ihr Betrieb, sondern das Finanzamt: Reine Papierbelege und einfache PDFs genügen bei Betriebsprüfungen nicht mehr.“ | „Lassen Sie uns in 5 Minuten prüfen, ob Ihr Rechnungseingang rechtssicher ist. Passt Ihnen morgen 07:30 Uhr?“ |
| **„Unsere Software (z.B. Lexoffice) reicht.“** | „Super, Lexoffice ist ein hervorragendes System, das wir selbst einsetzen.“ | „Der Bruch entsteht zwischen Baustelle und Lexoffice – wenn Zettel händisch abgetippt werden oder die DATEV-Übergabe hakt.“ | „Ich zeige Ihnen in 5 Minuten am Bildschirm, wie die Lücke lautlos geschlossen wird.“ |
| **„Keine Zeit für IT-Projekte.“** | „Glaube ich Ihnen sofort bei der Auftragslage im Harz.“ | „Deshalb machen wir kein IT-Projekt, sondern agieren als digitaler Hausmeister – wir bauen alles schlüsselfertig ein.“ | „Wenn unser Stresstest Ihnen nicht 2 Stunden pro Woche spart, hören Sie nie wieder von mir. Fairer Deal?“ |
| **„Wir sind zu klein dafür.“** | „Das dachten unsere Kunden mit 3 Mitarbeitern anfangs auch.“ | „Gerade bei kleinen Betrieben tut die Zettelwirtschaft am meisten weh, weil der Chef alles selbst am Sonntag abtippen muss.“ | „Ich sende Ihnen eine 1-Seiter Fallstudie eines 3-Mann Betriebs aus Osterode zur Ansicht.“ |
| **„Schicken Sie mir einfach Infos per Mail.“** | „Sehr gerne, ich möchte Ihnen aber keine unpassende Standard-Broschüre schicken.“ | „Wo brennt es bei Ihnen aktuell mehr: Bei den Stundenzetteln der Monteure oder beim Druck des Steuerberaters?“ | „Basierend darauf sende ich Ihnen das exakte Audit und melde mich kurz am Donnerstag. Ist die info@... aktuell?“ |

---

## 6. Verification and Integration Plan

To achieve 100% test coverage and compliance:
1. **Unit & Integration Tests for R4 Parser**:
   - Test suite `src/test/features/einvoiceValidator.test.jsx` verifying:
     - CII parser with full EN 16931 tags.
     - UBL parser with standard OASIS tags.
     - PDF embedded stream extraction.
     - Traffic light calculation (green for correct, red for missing BT-1 / math mismatch, yellow for missing optional BT-10).
2. **DocsHub & Document Integration for R1**:
   - Verify `DOCS/` contains the 4 complete markdown guides.
   - Verify `INITIAL_DOCS` in `src/constants/initialData.js` exposes the files in the app's Knowledge Hub.
3. **Build & Quality Gates**:
   - `npm run test:all` (all tests passing).
   - `npm run build` (clean Vite bundle & PWA precache).

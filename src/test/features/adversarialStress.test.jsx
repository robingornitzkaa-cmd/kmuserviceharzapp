import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  parseAndValidateEInvoice, 
  validateInvoiceData, 
  parseCII, 
  parseUBL, 
  extractXmlFromPdfBuffer,
  normalizeDate,
  exportValidationReportJSON,
  generateValidationReportPDF,
  SAMPLE_CII_INVOICE, 
  SAMPLE_UBL_INVOICE, 
  SAMPLE_INVALID_INVOICE 
} from '../../services/eInvoiceParser';
import { 
  calculateAuditMetrics, 
  generateStressTestPDF 
} from '../../services/pdfReportGenerator';

// =========================================================================
// MOCK jsPDF FOR JSDOM ENVIRONMENT
// =========================================================================
vi.mock('jspdf', () => {
  return {
    jsPDF: function () {
      let pageCount = 1;
      return {
        internal: {
          pageSize: {
            getWidth: () => 210,
            getHeight: () => 297
          },
          getNumberOfPages: () => pageCount
        },
        setFillColor: vi.fn(),
        rect: vi.fn(),
        roundedRect: vi.fn(),
        circle: vi.fn(),
        line: vi.fn(),
        setDrawColor: vi.fn(),
        setLineWidth: vi.fn(),
        setTextColor: vi.fn(),
        setFont: vi.fn(),
        setFontSize: vi.fn(),
        text: vi.fn(),
        splitTextToSize: vi.fn((txt) => {
          if (!txt) return [''];
          if (typeof txt === 'string' && txt.length > 50) {
            return [txt.substring(0, 50), txt.substring(50, 100), txt.substring(100)];
          }
          return [String(txt)];
        }),
        addPage: vi.fn(() => {
          pageCount++;
        }),
        save: vi.fn()
      };
    }
  };
});

describe('Tier 5 Adversarial Stress & Hardening Test Suite (Challenger 1)', () => {

  // =========================================================================
  // 1. E-INVOICE PARSER: MALFORMED & ADVERSARIAL XML / BINARY INPUTS
  // =========================================================================
  describe('1. E-Invoice Parser: Malformed, Empty & Binary Garbage Handling', () => {
    it('handles empty string without throwing unhandled exceptions', async () => {
      const result = await parseAndValidateEInvoice('');
      expect(result).toBeDefined();
      expect(result.isValid).toBe(false);
      expect(result.overallStatus).toBe('FAIL');
      expect(result.checks.some(c => c.status === 'FAIL')).toBe(true);
    });

    it('handles whitespace-only string gracefully', async () => {
      const result = await parseAndValidateEInvoice('   \n\t  \r\n   ');
      expect(result.isValid).toBe(false);
      expect(result.overallStatus).toBe('FAIL');
      expect(result.checks.some(c => c.status === 'FAIL')).toBe(true);
    });

    it('handles unclosed XML tags gracefully with XML-SYNTAX-ERROR check', async () => {
      const malformedXml = `<?xml version="1.0"?>
      <rsm:CrossIndustryInvoice xmlns:rsm="urn:un:uncefact:data:standard:CrossIndustryInvoice:100">
        <rsm:ExchangedDocument>
          <ram:ID>INV-999
        <!-- Unclosed tags -->`;
      const result = await parseAndValidateEInvoice(malformedXml);
      expect(result.isValid).toBe(false);
      expect(result.overallStatus).toBe('FAIL');
      const syntaxCheck = result.checks.find(c => c.code === 'XML-SYNTAX-ERROR');
      expect(syntaxCheck).toBeDefined();
      expect(syntaxCheck.status).toBe('FAIL');
    });

    it('handles plain non-XML text string gracefully', async () => {
      const plainText = 'Dies ist eine reine Text-Rechnung ohne jegliche XML-Struktur von Meister Schmidt.';
      const result = await parseAndValidateEInvoice(plainText);
      expect(result.isValid).toBe(false);
      expect(result.overallStatus).toBe('FAIL');
    });

    it('rejects valid XML that is not an EN 16931 invoice (UNKNOWN-ROOT-ELEMENT)', async () => {
      const nonInvoiceXml = `<?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
      </svg>`;
      const result = await parseAndValidateEInvoice(nonInvoiceXml);
      expect(result.isValid).toBe(false);
      expect(result.overallStatus).toBe('FAIL');
      const rootCheck = result.checks.find(c => c.code === 'UNKNOWN-ROOT-ELEMENT');
      expect(rootCheck).toBeDefined();
      expect(rootCheck.status).toBe('FAIL');
      expect(rootCheck.message).toContain('svg');
    });

    it('handles raw binary garbage Uint8Array without unhandled crash', async () => {
      const binaryGarbage = new Uint8Array([0x00, 0xFF, 0xFE, 0x80, 0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0]);
      const result = await parseAndValidateEInvoice(binaryGarbage);
      expect(result).toBeDefined();
      expect(result.isValid).toBe(false);
      expect(result.overallStatus).toBe('FAIL');
    });

    it('handles ArrayBuffer with corrupted content', async () => {
      const buffer = new ArrayBuffer(64);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < 64; i++) view[i] = (i * 37) % 256;

      const result = await parseAndValidateEInvoice(buffer);
      expect(result).toBeDefined();
      expect(result.isValid).toBe(false);
    });

    it('strips UTF-8 Byte Order Mark (BOM: \\uFEFF) from strings and buffers', async () => {
      const bomXml = '\uFEFF' + SAMPLE_CII_INVOICE;
      const result = await parseAndValidateEInvoice(bomXml);
      expect(result.isValid).toBe(true);
      expect(result.invoiceNumber).toBe('RE-2026-0842');
    });

    it('handles XML with CDATA sections and special HTML characters securely', async () => {
      const cdataXml = SAMPLE_CII_INVOICE.replace(
        '<ram:Name>Automatisierungs-Audit vor Ort (90 Min)</ram:Name>',
        '<ram:Name><![CDATA[Spezial-Sanierung & <Rohrreinigung> "Harz-Süd" & <script>alert(1)</script>]]></ram:Name>'
      );
      const result = await parseAndValidateEInvoice(cdataXml);
      expect(result.isValid).toBe(true);
      expect(result.items[0].name).toContain('Spezial-Sanierung & <Rohrreinigung>');
    });
  });

  // =========================================================================
  // 2. E-INVOICE PARSER: MANDATORY BT FIELD CHECKS (MISSING FIELDS)
  // =========================================================================
  describe('2. E-Invoice Parser: Missing Mandatory Business Terms (BTs)', () => {
    it('detects missing BT-1 (Rechnungsnummer) as FAIL', async () => {
      const xmlWithoutBt1 = SAMPLE_CII_INVOICE.replace('<ram:ID>RE-2026-0842</ram:ID>', '<ram:ID></ram:ID>');
      const result = await parseAndValidateEInvoice(xmlWithoutBt1);

      expect(result.isValid).toBe(false);
      const bt1 = result.checks.find(c => c.code === 'BT-1');
      expect(bt1).toBeDefined();
      expect(bt1.status).toBe('FAIL');
    });

    it('detects missing BT-2 (Rechnungsdatum) as FAIL', async () => {
      const xmlWithoutBt2 = SAMPLE_CII_INVOICE.replace(/<ram:IssueDateTime>[\s\S]*?<\/ram:IssueDateTime>/, '');
      const result = await parseAndValidateEInvoice(xmlWithoutBt2);

      expect(result.isValid).toBe(false);
      const bt2 = result.checks.find(c => c.code === 'BT-2');
      expect(bt2).toBeDefined();
      expect(bt2.status).toBe('FAIL');
    });

    it('detects missing BT-72 (Leistungsdatum / Zeitraum) as FAIL (§14 UStG Pflicht)', async () => {
      const xmlWithoutDelivery = SAMPLE_CII_INVOICE.replace(/<ram:ApplicableHeaderTradeDelivery>[\s\S]*?<\/ram:ApplicableHeaderTradeDelivery>/, '<ram:ApplicableHeaderTradeDelivery></ram:ApplicableHeaderTradeDelivery>');
      const result = await parseAndValidateEInvoice(xmlWithoutDelivery);

      expect(result.isValid).toBe(false);
      const bt72 = result.checks.find(c => c.code === 'BT-72');
      expect(bt72).toBeDefined();
      expect(bt72.status).toBe('FAIL');
    });

    it('detects missing BT-27 (Verkäufer Name) as FAIL', async () => {
      const xmlWithoutSellerName = SAMPLE_CII_INVOICE.replace('<ram:Name>KMU Service Harz</ram:Name>', '<ram:Name></ram:Name>');
      const result = await parseAndValidateEInvoice(xmlWithoutSellerName);

      expect(result.isValid).toBe(false);
      const bt27 = result.checks.find(c => c.code === 'BT-27');
      expect(bt27).toBeDefined();
      expect(bt27.status).toBe('FAIL');
    });

    it('detects missing BT-31 / BT-32 (Verkäufer USt-IdNr & Steuernummer) as FAIL', async () => {
      const xmlWithoutVat = SAMPLE_CII_INVOICE.replace(/<ram:SpecifiedTaxRegistration>[\s\S]*?<\/ram:SpecifiedTaxRegistration>/, '');
      const result = await parseAndValidateEInvoice(xmlWithoutVat);

      expect(result.isValid).toBe(false);
      const bt31 = result.checks.find(c => c.code === 'BT-31');
      expect(bt31).toBeDefined();
      expect(bt31.status).toBe('FAIL');
    });

    it('detects missing BT-44 (Käufer Name) as FAIL', async () => {
      const xmlWithoutBuyerName = SAMPLE_CII_INVOICE.replace('<ram:Name>Harzer Dachdecker Meisterbetrieb GmbH</ram:Name>', '<ram:Name></ram:Name>');
      const result = await parseAndValidateEInvoice(xmlWithoutBuyerName);

      expect(result.isValid).toBe(false);
      const bt44 = result.checks.find(c => c.code === 'BT-44');
      expect(bt44).toBeDefined();
      expect(bt44.status).toBe('FAIL');
    });

    it('detects empty line items (BG-25) as FAIL', async () => {
      const xmlWithoutItems = SAMPLE_CII_INVOICE.replace(/<ram:IncludedSupplyChainTradeLineItem>[\s\S]*?<\/ram:IncludedSupplyChainTradeLineItem>/g, '');
      const result = await parseAndValidateEInvoice(xmlWithoutItems);

      expect(result.isValid).toBe(false);
      const bg25 = result.checks.find(c => c.code === 'BG-25-COUNT');
      expect(bg25).toBeDefined();
      expect(bg25.status).toBe('FAIL');
    });

    it('requires Leitweg-ID (BT-10) for XRechnung but allows warning for standard B2B ZUGFeRD', async () => {
      // UBL XRechnung without BuyerReference -> FAIL
      const ublWithoutRef = SAMPLE_UBL_INVOICE.replace('<cbc:BuyerReference>04011000-98765-12</cbc:BuyerReference>', '');
      const ublResult = await parseAndValidateEInvoice(ublWithoutRef);
      const ublBt10 = ublResult.checks.find(c => c.code === 'BT-10');
      expect(ublBt10.status).toBe('FAIL');

      // ZUGFeRD Comfort without BuyerReference -> WARN
      const ciiComfort = SAMPLE_CII_INVOICE
        .replace('urn:xeinkauf.de:kosit:xrechnung_3.0', 'urn:factur-x.eu:1p0:comfort')
        .replace('<ram:BuyerReference>04011000-12345-34</ram:BuyerReference>', '');
      const ciiResult = await parseAndValidateEInvoice(ciiComfort);
      const ciiBt10 = ciiResult.checks.find(c => c.code === 'BT-10');
      expect(ciiBt10.status).toBe('WARN');
    });
  });

  // =========================================================================
  // 3. E-INVOICE PARSER: MATHEMATICAL DISCREPANCIES & ROUNDING TOLERANCE
  // =========================================================================
  describe('3. E-Invoice Parser: Mathematical Consistency & Rounding Rules', () => {
    it('accepts rounding difference <= 0.02 € as PASS (EN 16931 tolerance rule)', async () => {
      // Netto 700 + Steuer 133 = 833 -> GrandTotal 833.02 € (Differenz: +0.02 €)
      const xmlRoundingPass = SAMPLE_CII_INVOICE
        .replace('<ram:GrandTotalAmount>833.00</ram:GrandTotalAmount>', '<ram:GrandTotalAmount>833.02</ram:GrandTotalAmount>')
        .replace('<ram:DuePayableAmount>833.00</ram:DuePayableAmount>', '<ram:DuePayableAmount>833.02</ram:DuePayableAmount>');

      const result = await parseAndValidateEInvoice(xmlRoundingPass);
      const brCo15 = result.checks.find(c => c.code === 'BR-CO-15');
      expect(brCo15.status).toBe('PASS');
    });

    it('rejects math discrepancy > 0.02 € (e.g. 0.03 €) as FAIL (BR-CO-15)', async () => {
      const xmlRoundingFail = SAMPLE_CII_INVOICE
        .replace('<ram:GrandTotalAmount>833.00</ram:GrandTotalAmount>', '<ram:GrandTotalAmount>833.03</ram:GrandTotalAmount>')
        .replace('<ram:DuePayableAmount>833.00</ram:DuePayableAmount>', '<ram:DuePayableAmount>833.03</ram:DuePayableAmount>');

      const result = await parseAndValidateEInvoice(xmlRoundingFail);
      expect(result.isValid).toBe(false);
      const brCo15 = result.checks.find(c => c.code === 'BR-CO-15');
      expect(brCo15.status).toBe('FAIL');
      expect(brCo15.message).toContain('0.03');
    });

    it('detects line item sum discrepancy vs header net amount (BR-CO-10)', async () => {
      // Pos 1 = 500, Pos 2 = 200 (Sum 700). Header declared as 850.00
      const xmlLineMismatch = SAMPLE_CII_INVOICE.replace('<ram:LineTotalAmount>700.00</ram:LineTotalAmount>', '<ram:LineTotalAmount>850.00</ram:LineTotalAmount>');
      const result = await parseAndValidateEInvoice(xmlLineMismatch);

      expect(result.isValid).toBe(false);
      const brCo10 = result.checks.find(c => c.code === 'BR-CO-10');
      expect(brCo10).toBeDefined();
      expect(brCo10.status).toBe('FAIL');
    });

    it('detects line item quantity * unitPrice mismatch > 0.05 € (BR-LINE-1)', async () => {
      // 1 * 500 € declared as 600 € in line total
      const xmlBadItemMath = SAMPLE_CII_INVOICE.replace(
        '<ram:LineTotalAmount>500.00</ram:LineTotalAmount>',
        '<ram:LineTotalAmount>600.00</ram:LineTotalAmount>'
      );
      const result = await parseAndValidateEInvoice(xmlBadItemMath);
      const brLine = result.checks.find(c => c.code === 'BR-LINE-1');
      expect(brLine.status).toBe('FAIL');
      expect(brLine.message).toContain('Mengenberechnung');
    });

    it('warns when due payable amount differs from gross amount (e.g. Skonto / prepayment)', async () => {
      const xmlSkonto = SAMPLE_CII_INVOICE.replace('<ram:DuePayableAmount>833.00</ram:DuePayableAmount>', '<ram:DuePayableAmount>800.00</ram:DuePayableAmount>');
      const result = await parseAndValidateEInvoice(xmlSkonto);
      const dueCheck = result.checks.find(c => c.code === 'BR-CO-16');
      expect(dueCheck.status).toBe('WARN');
    });
  });

  // =========================================================================
  // 4. E-INVOICE PARSER: HYBRID PDF & PDF EXTRACTOR ROBUSTNESS
  // =========================================================================
  describe('4. E-Invoice Parser: Hybrid PDF/A-3 Extractor & Binary Edge Cases', () => {
    it('throws expected error when non-hybrid PDF (standard PDF) without XML stream is passed', async () => {
      const nonHybridPdf = '%PDF-1.4\n1 0 obj\n<< /Title (Geschäftsbericht KMU Harz) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF';
      await expect(extractXmlFromPdfBuffer(nonHybridPdf)).rejects.toThrow(/Kein gültiger ZUGFeRD/);
    });

    it('extracts embedded CII XML from simulated PDF/A-3 string', async () => {
      const hybridPdf = `%PDF-1.7\n/AF << /Type /Filespec /F (factur-x.xml) >>\nstream\n${SAMPLE_CII_INVOICE}\nendstream\n%%EOF`;
      const extracted = await extractXmlFromPdfBuffer(hybridPdf);
      expect(extracted).toContain('CrossIndustryInvoice');
      expect(extracted).toContain('RE-2026-0842');
    });

    it('extracts embedded UBL XML from simulated PDF/A-3 string', async () => {
      const hybridPdf = `%PDF-1.7\n/AF << /Type /Filespec /F (xrechnung.xml) >>\nstream\n${SAMPLE_UBL_INVOICE}\nendstream\n%%EOF`;
      const extracted = await extractXmlFromPdfBuffer(hybridPdf);
      expect(extracted).toContain('XR-2026-9901');
    });

    it('handles File/Blob input mimicking user upload', async () => {
      const blob = new Blob([SAMPLE_UBL_INVOICE], { type: 'text/xml' });
      const result = await parseAndValidateEInvoice(blob);
      expect(result.isValid).toBe(true);
      expect(result.syntax).toBe('UBL');
    });
  });

  // =========================================================================
  // 5. E-INVOICE PARSER: MULTI-ITEMS, GERMAN SPECIAL CHARACTERS & EXTREME NUMBERS
  // =========================================================================
  describe('5. E-Invoice Parser: Multi-Items, German Umlauts & Extreme Numbers', () => {
    it('correctly handles 10+ line items and calculates exact sum aggregations', async () => {
      let multiItemXml = SAMPLE_CII_INVOICE;
      
      // Build 10 line items (each 100 € + 19% VAT = 119 €)
      let lineItemsStr = '';
      for (let i = 1; i <= 10; i++) {
        lineItemsStr += `
        <ram:IncludedSupplyChainTradeLineItem>
          <ram:AssociatedDocumentLineDocument><ram:LineID>${i}</ram:LineID></ram:AssociatedDocumentLineDocument>
          <ram:SpecifiedTradeProduct><ram:Name>Position ${i}: Harzer Wartungs-Modul ${i}</ram:Name></ram:SpecifiedTradeProduct>
          <ram:SpecifiedLineTradeAgreement><ram:NetPriceProductTradePrice><ram:ChargeAmount>100.00</ram:ChargeAmount></ram:NetPriceProductTradePrice></ram:SpecifiedLineTradeAgreement>
          <ram:SpecifiedLineTradeDelivery><ram:BilledQuantity unitCode="C62">1.00</ram:BilledQuantity></ram:SpecifiedLineTradeDelivery>
          <ram:SpecifiedLineTradeSettlement>
            <ram:ApplicableTradeTax><ram:TypeCode>VAT</ram:TypeCode><ram:CategoryCode>S</ram:CategoryCode><ram:RateApplicablePercent>19.00</ram:RateApplicablePercent></ram:ApplicableTradeTax>
            <ram:SpecifiedTradeSettlementLineMonetarySummation><ram:LineTotalAmount>100.00</ram:LineTotalAmount></ram:SpecifiedTradeSettlementLineMonetarySummation>
          </ram:SpecifiedLineTradeSettlement>
        </ram:IncludedSupplyChainTradeLineItem>`;
      }

      // Replace line items and totals (1000 Netto, 190 Tax, 1190 Brutto)
      multiItemXml = multiItemXml.replace(/<ram:IncludedSupplyChainTradeLineItem>[\s\S]*?<\/ram:IncludedSupplyChainTradeLineItem>[\s\S]*?<ram:IncludedSupplyChainTradeLineItem>[\s\S]*?<\/ram:IncludedSupplyChainTradeLineItem>/, lineItemsStr);
      multiItemXml = multiItemXml.replace(/<ram:LineTotalAmount>700.00<\/ram:LineTotalAmount>/g, '<ram:LineTotalAmount>1000.00</ram:LineTotalAmount>');
      multiItemXml = multiItemXml.replace(/<ram:TaxBasisTotalAmount>700.00<\/ram:TaxBasisTotalAmount>/g, '<ram:TaxBasisTotalAmount>1000.00</ram:TaxBasisTotalAmount>');
      multiItemXml = multiItemXml.replace(/<ram:TaxTotalAmount currencyID="EUR">133.00<\/ram:TaxTotalAmount>/g, '<ram:TaxTotalAmount currencyID="EUR">190.00</ram:TaxTotalAmount>');
      multiItemXml = multiItemXml.replace(/<ram:CalculatedAmount>133.00<\/ram:CalculatedAmount>/g, '<ram:CalculatedAmount>190.00</ram:CalculatedAmount>');
      multiItemXml = multiItemXml.replace(/<ram:BasisAmount>700.00<\/ram:BasisAmount>/g, '<ram:BasisAmount>1000.00</ram:BasisAmount>');
      multiItemXml = multiItemXml.replace(/<ram:GrandTotalAmount>833.00<\/ram:GrandTotalAmount>/g, '<ram:GrandTotalAmount>1190.00</ram:GrandTotalAmount>');
      multiItemXml = multiItemXml.replace(/<ram:DuePayableAmount>833.00<\/ram:DuePayableAmount>/g, '<ram:DuePayableAmount>1190.00</ram:DuePayableAmount>');

      const result = await parseAndValidateEInvoice(multiItemXml);
      expect(result.isValid).toBe(true);
      expect(result.items.length).toBe(10);
      expect(result.totals.netAmount).toBe(1000);
      expect(result.totals.taxAmount).toBe(190);
      expect(result.totals.grossAmount).toBe(1190);
    });

    it('preserves German umlauts (ä, ö, ü, Ä, Ö, Ü, ß) and addresses flawlessly with valid XML encoding', async () => {
      const umlautXml = SAMPLE_CII_INVOICE
        .replace('KMU Service Harz', 'KMU Service Harz &amp; Söhne e.K. - Fachbetrieb für Wärme- &amp; Kältetechnik')
        .replace('Marktstraße 12', 'Straße der Befreiung 42 / Hintergebäude äöüß')
        .replace('Goslar', 'Clausthal-Zellerfeld / Schierke am Brocken')
        .replace('Harzer Dachdecker Meisterbetrieb GmbH', 'Rübezahl &amp; Großmüller Holz- &amp; Dachsanierung e.G.');

      const result = await parseAndValidateEInvoice(umlautXml);
      expect(result.isValid).toBe(true);
      expect(result.seller.name).toContain('Wärme- & Kältetechnik');
      expect(result.seller.address).toContain('äöüß');
      expect(result.seller.address).toContain('Clausthal-Zellerfeld');
      expect(result.buyer.name).toContain('Großmüller');
    });

    it('handles extreme monetary amounts (e.g. 5.000.000 €) without integer overflow', async () => {
      // 5,000,000.00 Netto + 950,000.00 MwSt (19%) = 5,950,000.00 Brutto
      const bigAmountXml = SAMPLE_UBL_INVOICE
        .replace(/<cbc:LineExtensionAmount currencyID="EUR">2000\.00<\/cbc:LineExtensionAmount>/g, '<cbc:LineExtensionAmount currencyID="EUR">5000000.00<\/cbc:LineExtensionAmount>')
        .replace(/<cbc:PriceAmount currencyID="EUR">2000\.00<\/cbc:PriceAmount>/g, '<cbc:PriceAmount currencyID="EUR">5000000.00<\/cbc:PriceAmount>')
        .replace(/<cbc:TaxableAmount currencyID="EUR">2000\.00<\/cbc:TaxableAmount>/g, '<cbc:TaxableAmount currencyID="EUR">5000000.00<\/cbc:TaxableAmount>')
        .replace(/<cbc:TaxExclusiveAmount currencyID="EUR">2000\.00<\/cbc:TaxExclusiveAmount>/g, '<cbc:TaxExclusiveAmount currencyID="EUR">5000000.00<\/cbc:TaxExclusiveAmount>')
        .replace(/<cbc:TaxAmount currencyID="EUR">380\.00<\/cbc:TaxAmount>/g, '<cbc:TaxAmount currencyID="EUR">950000.00<\/cbc:TaxAmount>')
        .replace(/<cbc:TaxInclusiveAmount currencyID="EUR">2380\.00<\/cbc:TaxInclusiveAmount>/g, '<cbc:TaxInclusiveAmount currencyID="EUR">5950000.00<\/cbc:TaxInclusiveAmount>')
        .replace(/<cbc:PayableAmount currencyID="EUR">2380\.00<\/cbc:PayableAmount>/g, '<cbc:PayableAmount currencyID="EUR">5950000.00<\/cbc:PayableAmount>');

      const result = await parseAndValidateEInvoice(bigAmountXml);
      expect(result.isValid).toBe(true);
      expect(result.totals.netAmount).toBe(5000000);
      expect(result.totals.taxAmount).toBe(950000);
      expect(result.totals.grossAmount).toBe(5950000);
    });

    it('executes generateValidationReportPDF without throwing for extreme test results', async () => {
      const result = await parseAndValidateEInvoice(SAMPLE_INVALID_INVOICE);
      expect(() => generateValidationReportPDF(result)).not.toThrow();
    });
  });

  // =========================================================================
  // 6. PDF GENERATOR: ZERO, NEGATIVE, AND EXTREME HOURS / RATES
  // =========================================================================
  describe('6. PDF Generator: Edge Cases (Zero, Negative & Extreme Numbers)', () => {
    it('handles 0 weekly hours and 0 hourly rate robustly (no division by zero)', () => {
      const metrics = calculateAuditMetrics({
        weeklyWastedHours: 0,
        masterHourlyRate: 0,
        setupFee: 2000,
        region: 'NDS'
      });

      expect(metrics.weeklyWastedHours).toBe(0);
      expect(metrics.masterHourlyRate).toBe(0);
      expect(metrics.monthlyShadowCost).toBe(0);
      expect(metrics.yearlyShadowCost).toBe(0);
      expect(metrics.savedHoursPerMonth).toBe(0);
      expect(metrics.savedHoursPerYear).toBe(0);
      expect(metrics.monthlySavings).toBe(0);
      expect(metrics.yearlySavings).toBe(0);
      expect(metrics.amortizationMonths).toBe(0);
      expect(metrics.amortizationDays).toBe(0);
    });

    it('handles negative hours and negative rates by clamping to 0', () => {
      const metrics = calculateAuditMetrics({
        weeklyWastedHours: -15,
        masterHourlyRate: -85,
        setupFee: -500,
        region: 'NDS'
      });

      expect(metrics.weeklyWastedHours).toBe(0);
      expect(metrics.masterHourlyRate).toBe(0);
      expect(metrics.setupFee).toBe(2000); // defaults back to standard setup
      expect(metrics.monthlyShadowCost).toBe(0);
    });

    it('handles maximum extreme hours (168 hours/week - 24/7) and 1000 €/h rate', () => {
      const metrics = calculateAuditMetrics({
        weeklyWastedHours: 168,
        masterHourlyRate: 1000,
        setupFee: 6000,
        region: 'LSA'
      });

      expect(metrics.weeklyWastedHours).toBe(168);
      expect(metrics.monthlyWastedHours).toBe(727.4); // 168 * 4.33
      expect(metrics.yearlyWastedHours).toBe(8736); // 168 * 52
      expect(metrics.monthlyShadowCost).toBe(727440); // 168 * 4.33 * 1000
      expect(metrics.yearlyShadowCost).toBe(8729280); // monthly * 12
      expect(metrics.effectiveNetInvestment).toBe(2500); // 6000 - 3000 - 500
      expect(metrics.amortizationMonths).toBeLessThan(0.01);
      expect(metrics.amortizationDays).toBe(1);
    });

    it('handles fractional inputs (e.g. 7.5 hours/week, 68.50 €/h)', () => {
      const metrics = calculateAuditMetrics({
        weeklyWastedHours: 7.5,
        masterHourlyRate: 68.5,
        setupFee: 2000,
        region: 'TH'
      });

      expect(metrics.weeklyWastedHours).toBe(7.5);
      expect(metrics.masterHourlyRate).toBe(68.5);
      expect(metrics.monthlyShadowCost).toBe(Math.round(7.5 * 4.33 * 68.5));
      expect(metrics.effectiveNetInvestment).toBe(500);
    });

    it('handles non-numeric garbage (strings, NaN, null, undefined) gracefully with standard fallbacks', () => {
      const metrics = calculateAuditMetrics({
        weeklyWastedHours: 'viele Stunden',
        masterHourlyRate: NaN,
        setupFee: 'kostenlos',
        region: null
      });

      expect(metrics.weeklyWastedHours).toBe(8);
      expect(metrics.masterHourlyRate).toBe(65);
      expect(metrics.setupFee).toBe(2000);
      expect(metrics.region).toBe('NDS');
      expect(metrics.effectiveNetInvestment).toBe(500);
    });
  });

  // =========================================================================
  // 7. PDF GENERATOR: COMPANY NAMES, SPECIAL CHARACTERS & LONG STRINGS
  // =========================================================================
  describe('7. PDF Generator: Special Characters, Emojis & Long Strings', () => {
    it('generates PDF with empty company and contact names using sensible defaults', async () => {
      const doc = await generateStressTestPDF({
        companyName: '',
        contactPerson: '',
        industry: '',
        currentBottleneck: ''
      }, { saveToFile: false });

      expect(doc).toBeDefined();
      expect(doc.text).toHaveBeenCalled();
    });

    it('generates PDF with special German characters, slashes, quotes, and punctuation', async () => {
      const auditData = {
        companyName: 'Bau- & Möbeltischlerei "Harzer Eiche" Inh. Jörg Müller-Lüdenscheidt e.K.',
        contactPerson: 'Dipl.-Ing. André Weiß & Dr. René Schöne-Straße',
        industry: 'Tischlerhandwerk / Innenausbau (Gewerke-Kombi #1)',
        currentBottleneck: 'Unleserliche Stundenzettel, WhatsApp-Chaos, Rechnungsverzug & fehlende ZUGFeRD-Validierung (GoBD-Prüfung steht an)',
        weeklyWastedHours: 12,
        masterHourlyRate: 75,
        region: 'NDS',
        selectedPackage: 'meisterbetrieb6000'
      };

      const doc = await generateStressTestPDF(auditData, { saveToFile: false });
      expect(doc).toBeDefined();
      expect(doc.text).toHaveBeenCalled();
    });

    it('sanitizes special characters in filename when saveToFile is true', async () => {
      const auditData = {
        companyName: 'Müller & Söhne / Sanitär * <Heizung>? :|',
        weeklyWastedHours: 8
      };

      const doc = await generateStressTestPDF(auditData, { saveToFile: true });
      expect(doc.save).toHaveBeenCalled();
      const filename = doc.save.mock.calls[0][0];
      expect(filename).not.toContain('&');
      expect(filename).not.toContain('/');
      expect(filename).not.toContain('*');
      expect(filename).not.toContain('?');
      expect(filename).toMatch(/^KMU_StressTest_500EUR_/);
    });

    it('handles extremely long strings (1000+ chars) in bottleneck and company name without crashing', async () => {
      const longText = 'Sehr langer Text '.repeat(100);
      const auditData = {
        companyName: longText.substring(0, 300),
        contactPerson: 'Max Mustermann',
        currentBottleneck: longText,
        weeklyWastedHours: 10,
        masterHourlyRate: 70
      };

      const doc = await generateStressTestPDF(auditData, { saveToFile: false });
      expect(doc).toBeDefined();
      expect(doc.text).toHaveBeenCalled();
    });

    it('handles Unicode and emoji characters gracefully', async () => {
      const auditData = {
        companyName: '🚀 Handwerk 4.0 Harz GmbH ✨',
        contactPerson: 'Meister Markus 🛠️',
        currentBottleneck: 'Papierkrieg ❌ -> Lautlose Cloud ✔️'
      };

      const doc = await generateStressTestPDF(auditData, { saveToFile: false });
      expect(doc).toBeDefined();
    });
  });

  // =========================================================================
  // 8. PDF GENERATOR: SUBSIDY REGIONS & PLAYBOOK COMBINATIONS
  // =========================================================================
  describe('8. PDF Generator: Subsidy Regions & Playbook Combinations', () => {
    const testCases = [
      { region: 'NDS', expectedRate: 0.50, expectedProgram: 'Digitalbonus Niedersachsen' },
      { region: 'LSA', expectedRate: 0.50, expectedProgram: 'Sachsen-Anhalt' },
      { region: 'TH', expectedRate: 0.50, expectedProgram: 'Thüringen' },
      { region: 'BUND', expectedRate: 0.50, expectedProgram: 'go-digital' },
      { region: 'NONE', expectedRate: 0.0, expectedProgram: 'Keine staatliche Förderung' },
      { region: 'nds', expectedRate: 0.50, expectedProgram: 'Digitalbonus Niedersachsen' }, // lowercase
      { region: 'lsa', expectedRate: 0.50, expectedProgram: 'Sachsen-Anhalt' },
      { region: 'th', expectedRate: 0.50, expectedProgram: 'Thüringen' },
      { region: 'bund', expectedRate: 0.50, expectedProgram: 'go-digital' },
      { region: 'none', expectedRate: 0.0, expectedProgram: 'Keine staatliche Förderung' },
    ];

    testCases.forEach(({ region, expectedRate, expectedProgram }) => {
      it(`calculates correct subsidies for region "${region}" (${expectedRate * 100}%)`, () => {
        const metrics = calculateAuditMetrics({ setupFee: 2000, region });
        expect(metrics.subsidyRate).toBe(expectedRate);
        expect(metrics.subsidyAmount).toBe(2000 * expectedRate);
        expect(metrics.subsidyProgramName).toContain(expectedProgram);
      });
    });

    it('handles unknown region by defaulting to NDS (50%)', () => {
      const metrics = calculateAuditMetrics({ setupFee: 2000, region: 'BAYERN_UNKNOWN' });
      expect(metrics.subsidyRate).toBe(0.50);
      expect(metrics.region).toBe('BAYERN_UNKNOWN');
    });

    it('handles 200 € / Month Retainer package correctly (effective net investment = 0 €)', () => {
      const metrics = calculateAuditMetrics({
        weeklyWastedHours: 4,
        masterHourlyRate: 65,
        selectedPackage: 'retainer200',
        region: 'NDS'
      });

      expect(metrics.setupFee).toBe(200);
      expect(metrics.subsidyAmount).toBe(100); // 200 * 0.5
      expect(metrics.auditCredit).toBe(500);
      // 200 - 100 - 500 = -400 -> clamped to 0 €
      expect(metrics.effectiveNetInvestment).toBe(0);
      expect(metrics.amortizationMonths).toBe(0);
      // amortizationDays is 1 day lower-bound when monthlySavings > 0
      expect(metrics.amortizationDays).toBe(1);
    });

    it('handles 6000 € Meisterbetrieb package correctly with 50% subsidy', () => {
      const metrics = calculateAuditMetrics({
        weeklyWastedHours: 15,
        masterHourlyRate: 75,
        selectedPackage: 'meisterbetrieb6000',
        region: 'LSA'
      });

      expect(metrics.setupFee).toBe(6000);
      expect(metrics.subsidyAmount).toBe(3000);
      expect(metrics.auditCredit).toBe(500);
      expect(metrics.effectiveNetInvestment).toBe(2500); // 6000 - 3000 - 500
      expect(metrics.monthlySavings).toBeGreaterThan(3500);
      expect(metrics.amortizationMonths).toBeLessThan(1.0);
    });
  });

});

import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { 
  parseAndValidateEInvoice, 
  validateInvoiceData, 
  parseCII, 
  parseUBL, 
  extractXmlFromPdfBuffer,
  normalizeDate,
  SAMPLE_CII_INVOICE, 
  SAMPLE_UBL_INVOICE, 
  SAMPLE_INVALID_INVOICE,
  exportValidationReportJSON,
  generateValidationReportPDF
} from '../../services/eInvoiceParser';
import { EInvoiceValidator } from '../../components/EInvoiceValidator';

// Mock jsPDF
vi.mock('jspdf', () => {
  return {
    jsPDF: function () {
      return {
        internal: {
          pageSize: {
            getWidth: () => 210,
            getHeight: () => 297
          }
        },
        setFillColor: vi.fn(),
        rect: vi.fn(),
        roundedRect: vi.fn(),
        circle: vi.fn(),
        setDrawColor: vi.fn(),
        setTextColor: vi.fn(),
        setFont: vi.fn(),
        setFontSize: vi.fn(),
        text: vi.fn(),
        splitTextToSize: vi.fn((txt) => [txt]),
        addPage: vi.fn(),
        save: vi.fn()
      };
    }
  };
});

describe('Requirement 4: E-Rechnungs & ZUGFeRD / XRechnung Validation Engine', () => {
  describe('Date Normalization & Parser Helpers', () => {
    it('normalizes format 102 (YYYYMMDD) to ISO YYYY-MM-DD', () => {
      expect(normalizeDate('20260824')).toBe('2026-08-24');
    });

    it('preserves standard ISO date strings', () => {
      expect(normalizeDate('2026-08-24')).toBe('2026-08-24');
    });

    it('converts German formatted dates (DD.MM.YYYY) to ISO', () => {
      expect(normalizeDate('24.08.2026')).toBe('2026-08-24');
    });

    it('returns empty string on empty input', () => {
      expect(normalizeDate('')).toBe('');
      expect(normalizeDate(null)).toBe('');
    });
  });

  describe('UN/CEFACT CII Parser & Validator (ZUGFeRD 2.2 / XRechnung CII)', () => {
    it('parses and validates a valid CII invoice with full EN 16931 compliance', async () => {
      const result = await parseAndValidateEInvoice(SAMPLE_CII_INVOICE);

      expect(result.isValid).toBe(true);
      expect(result.overallStatus).toBe('PASS');
      expect(result.standard).toContain('XRechnung (CII)');
      expect(result.syntax).toBe('CII');
      expect(result.invoiceNumber).toBe('RE-2026-0842');
      expect(result.issueDate).toBe('2026-08-24');
      expect(result.deliveryDate).toBe('2026-08-24');

      // Seller checks (BT-27, BT-31)
      expect(result.seller.name).toBe('KMU Service Harz');
      expect(result.seller.vatId).toBe('DE345678901');
      expect(result.seller.city).toBe('Goslar');

      // Buyer checks (BT-44, BT-10)
      expect(result.buyer.name).toBe('Harzer Dachdecker Meisterbetrieb GmbH');
      expect(result.buyer.buyerReference).toBe('04011000-12345-34');

      // Line Items (BG-25)
      expect(result.items.length).toBe(2);
      expect(result.items[0].name).toBe('Automatisierungs-Audit vor Ort (90 Min)');
      expect(result.items[0].unitPrice).toBe(500);
      expect(result.items[0].lineTotal).toBe(500);

      // Financial Totals (BG-22)
      expect(result.totals.netAmount).toBe(700);
      expect(result.totals.taxAmount).toBe(133);
      expect(result.totals.grossAmount).toBe(833);
      expect(result.totals.duePayableAmount).toBe(833);

      // Summary
      expect(result.summary.failedChecks).toBe(0);
      expect(result.summary.passedChecks).toBeGreaterThan(5);
    });
  });

  describe('OASIS UBL 2.1 Parser & Validator (XRechnung UBL)', () => {
    it('parses and validates a valid UBL invoice with standard EN 16931 tags', async () => {
      const result = await parseAndValidateEInvoice(SAMPLE_UBL_INVOICE);

      expect(result.isValid).toBe(true);
      expect(result.overallStatus).toBe('PASS');
      expect(result.standard).toBe('XRechnung (UBL)');
      expect(result.syntax).toBe('UBL');
      expect(result.invoiceNumber).toBe('XR-2026-9901');
      expect(result.issueDate).toBe('2026-08-24');
      expect(result.deliveryDate).toBe('2026-08-20');

      // Seller & Buyer
      expect(result.seller.name).toBe('KMU Service Harz');
      expect(result.seller.vatId).toBe('DE345678901');
      expect(result.buyer.name).toBe('Stadtverwaltung Clausthal-Zellerfeld');
      expect(result.buyer.buyerReference).toBe('04011000-98765-12');

      // Items & Totals
      expect(result.items.length).toBe(1);
      expect(result.items[0].unitPrice).toBe(2000);
      expect(result.totals.netAmount).toBe(2000);
      expect(result.totals.taxAmount).toBe(380);
      expect(result.totals.grossAmount).toBe(2380);
    });
  });

  describe('Faulty & Invalid Invoice Detection', () => {
    it('flags missing BT-1, missing seller VAT ID, and math calculation discrepancies as FAIL', async () => {
      const result = await parseAndValidateEInvoice(SAMPLE_INVALID_INVOICE);

      expect(result.isValid).toBe(false);
      expect(result.overallStatus).toBe('FAIL');
      expect(result.summary.failedChecks).toBeGreaterThan(0);

      // Check specific error codes
      const failCodes = result.checks.filter(c => c.status === 'FAIL').map(c => c.code);
      expect(failCodes).toContain('BT-1'); // Missing invoice number
      expect(failCodes).toContain('BT-31'); // Missing VAT ID
      expect(failCodes).toContain('BT-72'); // Missing Delivery Date
      expect(failCodes).toContain('BR-CO-15'); // Net 1000 + Tax 190 != Gross 1500
    });

    it('handles malformed XML string gracefully with XML syntax error check', async () => {
      const malformedXml = '<rsm:CrossIndustryInvoice><broken>';
      const result = await parseAndValidateEInvoice(malformedXml);

      expect(result.isValid).toBe(false);
      expect(result.overallStatus).toBe('FAIL');
      expect(result.checks[0].code).toBe('XML-SYNTAX-ERROR');
    });

    it('rejects unknown root XML element with informative message', async () => {
      const unknownXml = '<?xml version="1.0"?><UnknownDocument><ID>123</ID></UnknownDocument>';
      const result = await parseAndValidateEInvoice(unknownXml);

      expect(result.isValid).toBe(false);
      expect(result.overallStatus).toBe('FAIL');
      expect(result.checks[0].code).toBe('UNKNOWN-ROOT-ELEMENT');
    });
  });

  describe('PDF/A-3 Embedded XML Extractor', () => {
    it('extracts embedded uncompressed CII XML from PDF binary stream', async () => {
      const mockPdfStream = `%PDF-1.7\n1 0 obj\n<< /Type /Catalog /AF 2 0 R >>\nendobj\n${SAMPLE_CII_INVOICE}\n%%EOF`;
      const extractedXml = await extractXmlFromPdfBuffer(mockPdfStream);

      expect(extractedXml).toContain('<rsm:CrossIndustryInvoice');
      expect(extractedXml).toContain('RE-2026-0842');
    });

    it('extracts embedded uncompressed UBL XML from PDF stream', async () => {
      const mockPdfStream = `%PDF-1.7\n${SAMPLE_UBL_INVOICE}\n%%EOF`;
      const extractedXml = await extractXmlFromPdfBuffer(mockPdfStream);

      expect(extractedXml).toContain('<Invoice');
      expect(extractedXml).toContain('XR-2026-9901');
    });

    it('throws error when PDF does not contain an embedded invoice XML', async () => {
      const dummyPdf = '%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF';
      await expect(extractXmlFromPdfBuffer(dummyPdf)).rejects.toThrow('Kein gültiger ZUGFeRD / Factur-X XML-Datenstrom');
    });
  });

  describe('Report Export Utilities', () => {
    it('generates a PDF report without throwing errors', async () => {
      const result = await parseAndValidateEInvoice(SAMPLE_CII_INVOICE);
      expect(() => generateValidationReportPDF(result)).not.toThrow();
    });

    it('exports JSON validation report', async () => {
      const result = await parseAndValidateEInvoice(SAMPLE_CII_INVOICE);
      global.URL.createObjectURL = vi.fn(() => 'blob:mock');
      global.URL.revokeObjectURL = vi.fn();
      
      expect(() => exportValidationReportJSON(result)).not.toThrow();
    });
  });
});

describe('EInvoiceValidator UI Component', () => {
  it('renders studio header, dropzone, sample buttons, and metrics cards', async () => {
    render(<EInvoiceValidator />);

    expect(screen.getByText(/E-Rechnungs & ZUGFeRD \/ XRechnung Prüf-Studio/i)).toBeInTheDocument();
    expect(screen.getByText(/Rechnung hier ablegen oder klicken/i)).toBeInTheDocument();
    expect(screen.getByText(/ZUGFeRD 2.2 \/ CII Comfort/i)).toBeInTheDocument();
    expect(screen.getByText(/XRechnung 3.0 \/ UBL Standard/i)).toBeInTheDocument();
    expect(screen.getByText(/Fehlerhafte Rechnung/i)).toBeInTheDocument();

    // Default sample should be loaded
    await waitFor(() => {
      expect(screen.getByText(/EN 16931 Konform/i)).toBeInTheDocument();
      expect(screen.getAllByText(/RE-2026-0842/i).length).toBeGreaterThan(0);
    });
  });

  it('switches between sample invoices when clicked', async () => {
    render(<EInvoiceValidator />);

    await waitFor(() => {
      expect(screen.getByText(/EN 16931 Konform/i)).toBeInTheDocument();
    });

    // Click on UBL sample
    const ublButton = screen.getByText(/XRechnung 3.0 \/ UBL Standard/i);
    fireEvent.click(ublButton);

    await waitFor(() => {
      expect(screen.getAllByText(/XR-2026-9901/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/XRechnung \(UBL\)/i).length).toBeGreaterThan(0);
    });

    // Click on Invalid sample
    const invalidButton = screen.getByText(/Fehlerhafte Rechnung/i);
    fireEvent.click(invalidButton);

    await waitFor(() => {
      expect(screen.getByText(/Nicht Konform/i)).toBeInTheDocument();
    });
  });

  it('filters diagnostic checks by status pills and switches tabs', async () => {
    render(<EInvoiceValidator />);

    await waitFor(() => {
      expect(screen.getByText(/Prüfprotokoll & Ampel/i)).toBeInTheDocument();
    });

    // Filter by Bestanden
    const passFilterBtn = screen.getByText(/🟢 Bestanden/i);
    fireEvent.click(passFilterBtn);

    // Switch to tab "Beleg-Übersicht & Positionen"
    const previewTab = screen.getByText(/Beleg-Übersicht & Positionen/i);
    fireEvent.click(previewTab);

    expect(screen.getByText(/Rechnungspositionen \(BG-25\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Automatisierungs-Audit vor Ort/i)).toBeInTheDocument();

    // Switch to XML tab
    const xmlTab = screen.getByText(/XML-Quelltext Inspektor/i);
    fireEvent.click(xmlTab);

    expect(screen.getByText(/Extrahierter XML-Datenstrom/i)).toBeInTheDocument();
  });
});

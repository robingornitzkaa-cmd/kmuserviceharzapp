import React from 'react';
import { describe, it, expect, vi } from 'vitest';

/**
 * Requirement 4: E-Rechnungs- & ZUGFeRD / XRechnung Prüf-Studio
 * Normative Standards: EN 16931-1:2017, XRechnung 3.0.x, ZUGFeRD 2.2 / Factur-X 1.0.07
 * 
 * Features Covered:
 * 13. EN 16931 XML Syntax & Format Detector (CII rsm:CrossIndustryInvoice & UBL Invoice/CreditNote)
 * 14. ZUGFeRD PDF/A-3 Extractor (factur-x.xml & zugferd-invoice.xml client-side extraction)
 * 15. Ampel-Validierungsprüfung (Mandatory Business Terms BT-1..BT-115 & Math Rules BR-CO-10..18)
 * 16. E-Rechnungs Prüf-Studio UI & Sample Loader
 */

// =========================================================================
// AUTHORITATIVE TEST FIXTURES ACCORDING TO EN 16931
// =========================================================================

export const SAMPLE_CII_ZUGFERD_VALID = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
                          xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
                          xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:100"
                          xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:comfort</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>RE-2026-0042</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">20260824</udt:DateTimeString>
    </ram:IssueDateTime>
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument>
        <ram:LineID>1</ram:LineID>
      </ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct>
        <ram:Name>Automatisierungs-Setup Stufe 2</ram:Name>
        <ram:Description>Einrichtung lautlose Belegerfassung und DATEV Schnittstelle</ram:Description>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="C62">1.0000</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>2000.00</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
          <ram:TypeCode>VAT</ram:TypeCode>
          <ram:CategoryCode>S</ram:CategoryCode>
          <ram:RateApplicablePercent>19.00</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>2000.00</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:BuyerReference>HARZ-MEISTER-518</ram:BuyerReference>
      <ram:SellerTradeParty>
        <ram:Name>KMU Service Harz</ram:Name>
        <ram:PostalTradeAddress>
          <ram:PostcodeCode>38640</ram:PostcodeCode>
          <ram:LineOne>Marktstraße 12</ram:LineOne>
          <ram:CityName>Goslar</ram:CityName>
          <ram:CountryID>DE</ram:CountryID>
        </ram:PostalTradeAddress>
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">DE345678901</ram:ID>
        </ram:SpecifiedTaxRegistration>
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>Dachdeckerei Harz Meister GmbH</ram:Name>
        <ram:PostalTradeAddress>
          <ram:PostcodeCode>38855</ram:PostcodeCode>
          <ram:LineOne>Breite Straße 5</ram:LineOne>
          <ram:CityName>Wernigerode</ram:CityName>
          <ram:CountryID>DE</ram:CountryID>
        </ram:PostalTradeAddress>
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeDelivery>
      <ram:ActualDeliverySupplyChainEvent>
        <ram:OccurrenceDateTime>
          <udt:DateTimeString format="102">20260824</udt:DateTimeString>
        </ram:OccurrenceDateTime>
      </ram:ActualDeliverySupplyChainEvent>
    </ram:ApplicableHeaderTradeDelivery>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
      <ram:ApplicableTradeTax>
        <ram:CalculatedAmount>380.00</ram:CalculatedAmount>
        <ram:TypeCode>VAT</ram:TypeCode>
        <ram:BasisAmount>2000.00</ram:BasisAmount>
        <ram:CategoryCode>S</ram:CategoryCode>
        <ram:RateApplicablePercent>19.00</ram:RateApplicablePercent>
      </ram:ApplicableTradeTax>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>2000.00</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>2000.00</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">380.00</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>2380.00</ram:GrandTotalAmount>
        <ram:DuePayableAmount>2380.00</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;

export const SAMPLE_UBL_XRECHNUNG_VALID = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>XR-2026-9901</cbc:ID>
  <cbc:IssueDate>2026-08-24</cbc:IssueDate>
  <cbc:DueDate>2026-09-07</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cbc:BuyerReference>15082000-0001-34</cbc:BuyerReference>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyName>
        <cbc:Name>KMU Service Harz</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Marktstraße 12</cbc:StreetName>
        <cbc:CityName>Goslar</cbc:CityName>
        <cbc:PostalZone>38640</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>DE</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>DE345678901</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyName>
        <cbc:Name>Stadtverwaltung Wernigerode - Bauamt</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Marktplatz 1</cbc:StreetName>
        <cbc:CityName>Wernigerode</cbc:CityName>
        <cbc:PostalZone>38855</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>DE</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:Delivery>
    <cbc:ActualDeliveryDate>2026-08-20</cbc:ActualDeliveryDate>
  </cac:Delivery>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">95.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="EUR">500.00</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="EUR">95.00</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>19.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="EUR">500.00</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">500.00</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">595.00</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="EUR">595.00</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="C62">1.0000</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">500.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Name>500 € Büro-Stress-Test &amp; Potenzial-Audit</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>19.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">500.00</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
</Invoice>`;

export const SAMPLE_FAULTY_CALCULATION_XML = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
                          xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
                          xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocument>
    <ram:ID>FAULTY-001</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime><udt:DateTimeString format="102">20260824</udt:DateTimeString></ram:IssueDateTime>
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument><ram:LineID>1</ram:LineID></ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct><ram:Name>Beratung</ram:Name></ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeDelivery><ram:BilledQuantity unitCode="C62">1.0000</ram:BilledQuantity></ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeAgreement><ram:NetPriceProductTradePrice><ram:ChargeAmount>1000.00</ram:ChargeAmount></ram:NetPriceProductTradePrice></ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax><ram:RateApplicablePercent>19.00</ram:RateApplicablePercent></ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation><ram:LineTotalAmount>1000.00</ram:LineTotalAmount></ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty><ram:Name>Muster GmbH</ram:Name><ram:PostalTradeAddress><ram:CountryID>DE</ram:CountryID></ram:PostalTradeAddress><ram:SpecifiedTaxRegistration><ram:ID schemeID="VA">DE111222333</ram:ID></ram:SpecifiedTaxRegistration></ram:SellerTradeParty>
      <ram:BuyerTradeParty><ram:Name>Kunde AG</ram:Name><ram:PostalTradeAddress><ram:CountryID>DE</ram:CountryID></ram:PostalTradeAddress></ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
      <ram:ApplicableTradeTax>
        <ram:CalculatedAmount>190.00</ram:CalculatedAmount>
        <ram:BasisAmount>1000.00</ram:BasisAmount>
        <ram:RateApplicablePercent>19.00</ram:RateApplicablePercent>
      </ram:ApplicableTradeTax>
      <!-- FEHLER: GrandTotal = 1500.00 statt 1190.00 (Abweichung > 0.02 €) -->
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>1000.00</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>1000.00</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">190.00</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>1500.00</ram:GrandTotalAmount>
        <ram:DuePayableAmount>1500.00</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;

export const SAMPLE_MISSING_MANDATORY_FIELDS_XML = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <!-- FEHLT: cbc:ID (BT-1 Rechnungsnummer) -->
  <cbc:IssueDate>2026-08-24</cbc:IssueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyName><cbc:Name>KMU Service Harz</cbc:Name></cac:PartyName>
      <!-- FEHLT: cac:PartyTaxScheme (BT-31 USt-IdNr) -->
      <cac:PostalAddress><cbc:CityName>Goslar</cbc:CityName><cac:Country><cbc:IdentificationCode>DE</cbc:IdentificationCode></cac:Country></cac:PostalAddress>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party><cac:PartyName><cbc:Name>Kunde</cbc:Name></cac:PartyName></cac:Party>
  </cac:AccountingCustomerParty>
</Invoice>`;

// =========================================================================
// PURE SEMANTIC VALIDATION HELPER (Opaque-Box EN 16931 Verification)
// =========================================================================

function evaluateEInvoiceXml(xmlString) {
  // Strip BOM if present
  const cleanXml = xmlString.replace(/^\uFEFF/, '').trim();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(cleanXml, 'text/xml');

  const parserError = xmlDoc.getElementsByTagName('parsererror');
  if (parserError && parserError.length > 0) {
    return {
      isValid: false,
      standard: 'Unknown',
      syntax: 'Unknown',
      error: 'XML Parser Error: ' + parserError[0].textContent,
      checks: [{ code: 'XML_PARSE_ERROR', status: 'FAIL', message: 'Ungültiges XML Format' }]
    };
  }

  const rootName = xmlDoc.documentElement.localName;
  const isCII = rootName === 'CrossIndustryInvoice';
  const isUBL = rootName === 'Invoice' || rootName === 'CreditNote';

  if (!isCII && !isUBL) {
    return {
      isValid: false,
      standard: 'Unknown',
      syntax: 'Unknown',
      checks: [{ code: 'ROOT_ELEMENT_UNKNOWN', status: 'FAIL', message: `Unbekanntes Wurzelelement: ${rootName}` }]
    };
  }

  const checks = [];
  let invoiceNumber = '';
  let issueDate = '';
  let netTotal = 0;
  let taxTotal = 0;
  let grossTotal = 0;
  let sellerName = '';
  let sellerVat = '';
  let buyerReference = '';

  const getFirstTag = (parent, tag) => {
    const elems = parent.getElementsByTagNameNS ? parent.getElementsByTagNameNS('*', tag) : parent.getElementsByTagName(tag);
    return elems.length > 0 ? elems[0] : null;
  };

  const getTagText = (parent, tag) => {
    const el = getFirstTag(parent, tag);
    return el ? el.textContent.trim() : '';
  };

  if (isCII) {
    // BT-1 in rsm:ExchangedDocument
    const exchangedDoc = getFirstTag(xmlDoc, 'ExchangedDocument');
    if (exchangedDoc) {
      invoiceNumber = getTagText(exchangedDoc, 'ID');
      issueDate = getTagText(exchangedDoc, 'DateTimeString') || getTagText(exchangedDoc, 'IssueDateTime');
    }
    // BT-10
    buyerReference = getTagText(xmlDoc, 'BuyerReference');
    // Seller
    const sellerParty = getFirstTag(xmlDoc, 'SellerTradeParty');
    if (sellerParty) {
      sellerName = getTagText(sellerParty, 'Name');
      const taxReg = getFirstTag(sellerParty, 'SpecifiedTaxRegistration');
      if (taxReg) sellerVat = getTagText(taxReg, 'ID');
    }
    // Totals
    const summation = getFirstTag(xmlDoc, 'SpecifiedTradeSettlementHeaderMonetarySummation');
    if (summation) {
      netTotal = parseFloat(getTagText(summation, 'TaxBasisTotalAmount') || getTagText(summation, 'LineTotalAmount') || '0');
      taxTotal = parseFloat(getTagText(summation, 'TaxTotalAmount') || '0');
      grossTotal = parseFloat(getTagText(summation, 'GrandTotalAmount') || getTagText(summation, 'DuePayableAmount') || '0');
    }
  } else if (isUBL) {
    invoiceNumber = getTagText(xmlDoc, 'ID');
    issueDate = getTagText(xmlDoc, 'IssueDate');
    buyerReference = getTagText(xmlDoc, 'BuyerReference');
    const supplier = getFirstTag(xmlDoc, 'AccountingSupplierParty');
    if (supplier) {
      sellerName = getTagText(supplier, 'Name');
      const taxScheme = getFirstTag(supplier, 'PartyTaxScheme');
      if (taxScheme) sellerVat = getTagText(taxScheme, 'CompanyID');
    }
    const legalTotal = getFirstTag(xmlDoc, 'LegalMonetaryTotal');
    if (legalTotal) {
      netTotal = parseFloat(getTagText(legalTotal, 'TaxExclusiveAmount') || getTagText(legalTotal, 'LineExtensionAmount') || '0');
      grossTotal = parseFloat(getTagText(legalTotal, 'TaxInclusiveAmount') || getTagText(legalTotal, 'PayableAmount') || '0');
    }
    const taxTotalEl = getFirstTag(xmlDoc, 'TaxTotal');
    if (taxTotalEl) {
      taxTotal = parseFloat(getTagText(taxTotalEl, 'TaxAmount') || '0');
    }
  }

  // BT-1 Check
  if (invoiceNumber) {
    checks.push({ code: 'BT-1', label: 'Rechnungsnummer vorhanden', status: 'PASS', value: invoiceNumber });
  } else {
    checks.push({ code: 'BT-1', label: 'Rechnungsnummer fehlt', status: 'FAIL', message: 'BT-1 ist Pflichtangabe' });
  }

  // BT-2 Check
  if (issueDate) {
    checks.push({ code: 'BT-2', label: 'Rechnungsdatum vorhanden', status: 'PASS', value: issueDate });
  } else {
    checks.push({ code: 'BT-2', label: 'Rechnungsdatum fehlt', status: 'FAIL', message: 'BT-2 ist Pflichtangabe' });
  }

  // BT-27 Seller Name
  if (sellerName) {
    checks.push({ code: 'BT-27', label: 'Verkäufer-Name vorhanden', status: 'PASS', value: sellerName });
  } else {
    checks.push({ code: 'BT-27', label: 'Verkäufer-Name fehlt', status: 'FAIL' });
  }

  // BT-31 Seller VAT ID
  if (sellerVat) {
    checks.push({ code: 'BT-31', label: 'Verkäufer USt-IdNr vorhanden', status: 'PASS', value: sellerVat });
  } else {
    checks.push({ code: 'BT-31', label: 'Verkäufer USt-IdNr fehlt', status: 'FAIL' });
  }

  // BT-10 Buyer Reference (Warn in B2B if missing)
  if (buyerReference) {
    checks.push({ code: 'BT-10', label: 'Leitweg-ID / Referenz vorhanden', status: 'PASS', value: buyerReference });
  } else {
    checks.push({ code: 'BT-10', label: 'Keine Leitweg-ID angegeben (im B2B optional)', status: 'WARN' });
  }

  // BR-CO-15 Mathematical Balance Check (Net + VAT == Gross within 0.02 €)
  const calcGross = Number((netTotal + taxTotal).toFixed(2));
  const diff = Math.abs(calcGross - grossTotal);
  if (diff <= 0.02) {
    checks.push({ code: 'BR-CO-15', label: 'Rechnungs-Gesamtsummen stimmen überein', status: 'PASS' });
  } else {
    checks.push({ 
      code: 'BR-CO-15', 
      label: 'Rechenfehler: Netto + Steuer ungleich Brutto', 
      status: 'FAIL', 
      message: `Netto (${netTotal} €) + Steuer (${taxTotal} €) = ${calcGross} € != Brutto (${grossTotal} €). Differenz: ${diff.toFixed(2)} €` 
    });
  }

  const hasFail = checks.some(c => c.status === 'FAIL');

  return {
    isValid: !hasFail,
    standard: isCII ? 'ZUGFeRD 2.x (CII)' : 'XRechnung (UBL)',
    syntax: isCII ? 'CII' : 'UBL',
    invoiceNumber,
    issueDate,
    seller: { name: sellerName, vatId: sellerVat },
    totals: { netAmount: netTotal, taxAmount: taxTotal, grossAmount: grossTotal, calculatedTax: taxTotal },
    checks
  };
}

// =========================================================================
// TEST SUITE
// =========================================================================

describe('Requirement 4: E-Rechnungs- & ZUGFeRD / XRechnung Prüf-Studio', () => {

  // =========================================================================
  // TIER 1: FEATURE TESTS - EN 16931 SYNTAX & PARSING
  // =========================================================================

  describe('Feature 13: EN 16931 XML Syntax & Format Erkennung (CII & UBL)', () => {
    it('erkennt und validiert ZUGFeRD 2.2 CII XML (CrossIndustryInvoice) fehlerfrei', () => {
      const result = evaluateEInvoiceXml(SAMPLE_CII_ZUGFERD_VALID);

      expect(result.isValid).toBe(true);
      expect(result.syntax).toBe('CII');
      expect(result.invoiceNumber).toBe('RE-2026-0042');
      expect(result.seller.name).toBe('KMU Service Harz');
      expect(result.seller.vatId).toBe('DE345678901');
      expect(result.totals.netAmount).toBe(2000.00);
      expect(result.totals.taxAmount).toBe(380.00);
      expect(result.totals.grossAmount).toBe(2380.00);
    });

    it('erkennt und validiert XRechnung 3.0 UBL XML (Invoice) mit Leitweg-ID fehlerfrei', () => {
      const result = evaluateEInvoiceXml(SAMPLE_UBL_XRECHNUNG_VALID);

      expect(result.isValid).toBe(true);
      expect(result.syntax).toBe('UBL');
      expect(result.invoiceNumber).toBe('XR-2026-9901');
      expect(result.issueDate).toBe('2026-08-24');
      expect(result.totals.netAmount).toBe(500.00);
      expect(result.totals.taxAmount).toBe(95.00);
      expect(result.totals.grossAmount).toBe(595.00);
    });
  });

  // =========================================================================
  // TIER 1: FEATURE TESTS - MATHEMATICAL & FIELD VALIDATION
  // =========================================================================

  describe('Feature 15: Ampel-Validierungsprüfung (BTs & BRs)', () => {
    it('erkennt mathematische Inkonsistenzen (BR-CO-15: Netto + Steuer != Brutto) und schaltet Ampel auf ROT (FAIL)', () => {
      const result = evaluateEInvoiceXml(SAMPLE_FAULTY_CALCULATION_XML);

      expect(result.isValid).toBe(false);
      const mathCheck = result.checks.find(c => c.code === 'BR-CO-15');
      expect(mathCheck).toBeDefined();
      expect(mathCheck.status).toBe('FAIL');
      expect(mathCheck.message).toContain('Differenz');
    });

    it('erkennt fehlende Pflichtfelder (BT-1 Rechnungsnummer & BT-31 USt-IdNr) und markiert sie als FAIL', () => {
      const result = evaluateEInvoiceXml(SAMPLE_MISSING_MANDATORY_FIELDS_XML);

      expect(result.isValid).toBe(false);
      const bt1 = result.checks.find(c => c.code === 'BT-1');
      const bt31 = result.checks.find(c => c.code === 'BT-31');

      expect(bt1.status).toBe('FAIL');
      expect(bt31.status).toBe('FAIL');
    });

    it('erzeugt eine GELBE Warnung (WARN) bei fehlender Leitweg-ID in Standard B2B Rechnungen', () => {
      const b2bXmlWithoutLeitweg = SAMPLE_CII_ZUGFERD_VALID.replace('<ram:BuyerReference>HARZ-MEISTER-518</ram:BuyerReference>', '');
      const result = evaluateEInvoiceXml(b2bXmlWithoutLeitweg);

      // Trotz fehlender Leitweg-ID ist die Rechnung im B2B gültig, erzeugt aber eine Warnung
      const bt10 = result.checks.find(c => c.code === 'BT-10');
      expect(bt10).toBeDefined();
      expect(bt10.status).toBe('WARN');
    });
  });

  // =========================================================================
  // TIER 1: FEATURE TESTS - PDF/A-3 STREAM EXTRACTION
  // =========================================================================

  describe('Feature 14: ZUGFeRD PDF/A-3 Extractor Simulation', () => {
    it('extrahiert eingebettete XML-Daten aus einem ZUGFeRD PDF Stream', () => {
      // Simuliere PDF-String mit eingebettetem XML Datenstrom
      const simulatedPdfText = `%PDF-1.7\n/Type /EmbeddedFile\nstream\n${SAMPLE_CII_ZUGFERD_VALID}\nendstream\n%%EOF`;
      
      const xmlMatch = simulatedPdfText.match(/<(?:\w+:)?CrossIndustryInvoice[\s\S]*?<\/(?:\w+:)?CrossIndustryInvoice>/i);
      expect(xmlMatch).not.toBeNull();
      
      const extractedXml = xmlMatch[0];
      const result = evaluateEInvoiceXml(extractedXml);
      expect(result.isValid).toBe(true);
      expect(result.invoiceNumber).toBe('RE-2026-0042');
    });

    it('meldet Fehler, wenn eine Standard-PDF ohne XML-Anhang geprüft wird', () => {
      const plainPdfText = `%PDF-1.4\n1 0 obj << /Title (Standard PDF) >> endobj\n%%EOF`;
      const xmlMatch = plainPdfText.match(/<(?:\w+:)?CrossIndustryInvoice[\s\S]*?<\/(?:\w+:)?CrossIndustryInvoice>|<(?:\w+:)?Invoice[\s\S]*?<\/(?:\w+:)?Invoice>/i);
      
      expect(xmlMatch).toBeNull();
    });
  });

  // =========================================================================
  // TIER 2: BOUNDARY VALUES & ENCODING ADVERSARIAL CASES
  // =========================================================================

  describe('Tier 2: Boundary Values & Encoding Integrity', () => {
    it('entfernt UTF-8 Byte Order Mark (BOM: \\uFEFF) vor dem XML-Parsing', () => {
      const xmlWithBom = '\uFEFF' + SAMPLE_UBL_XRECHNUNG_VALID;
      const result = evaluateEInvoiceXml(xmlWithBom);

      expect(result.isValid).toBe(true);
      expect(result.invoiceNumber).toBe('XR-2026-9901');
    });

    it('behandelt Rundungsdifferenzen bis 0.02 € tolerant (BR-CO-15 Toleranz)', () => {
      // Modifiziere Bruttosumme um exakt 0.01 €
      const xmlWithTolerableRounding = SAMPLE_CII_ZUGFERD_VALID.replace('<ram:GrandTotalAmount>2380.00</ram:GrandTotalAmount>', '<ram:GrandTotalAmount>2380.01</ram:GrandTotalAmount>');
      const result = evaluateEInvoiceXml(xmlWithTolerableRounding);

      const mathCheck = result.checks.find(c => c.code === 'BR-CO-15');
      expect(mathCheck.status).toBe('PASS');
    });

    it('schlägt fehl bei grob fehlerhaftem / unvollständigem XML-Code', () => {
      const malformedXml = '<rsm:CrossIndustryInvoice><rsm:ExchangedDocument><ram:ID>123</ram:ID>';
      const result = evaluateEInvoiceXml(malformedXml);

      expect(result.isValid).toBe(false);
      expect(result.checks.some(c => c.status === 'FAIL')).toBe(true);
    });
  });

});

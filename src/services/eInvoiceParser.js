/**
 * eInvoiceParser.js - EN 16931 Semantic Validation & Parsing Engine
 * Supports UN/CEFACT CII (CrossIndustryInvoice) & OASIS UBL 2.1 (Invoice/CreditNote)
 * Handles standalone XML files and hybrid PDF/A-3 (ZUGFeRD 2.x / Factur-X) embedded streams.
 */
import { jsPDF } from 'jspdf';

// ----------------------------------------------------------------------
// 1. Built-in Sample Invoices (CII, UBL, Invalid)
// ----------------------------------------------------------------------

export const SAMPLE_CII_INVOICE = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
  xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
  xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:100"
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>RE-2026-0842</ram:ID>
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
        <ram:Name>Automatisierungs-Audit vor Ort (90 Min)</ram:Name>
        <ram:Description>Prozess-Analyse &amp; Schnittstellenprüfung für Handwerksbetriebe im Harz</ram:Description>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>500.00</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="C62">1.00</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
          <ram:TypeCode>VAT</ram:TypeCode>
          <ram:CategoryCode>S</ram:CategoryCode>
          <ram:RateApplicablePercent>19.00</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>500.00</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument>
        <ram:LineID>2</ram:LineID>
      </ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct>
        <ram:Name>Digitaler Hausmeister Retainer (Monat 1)</ram:Name>
        <ram:Description>Wartung Make/Lexoffice/DATEV Schnittstellen inkl. 60 Min Kontingent</ram:Description>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>200.00</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="C62">1.00</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
          <ram:TypeCode>VAT</ram:TypeCode>
          <ram:CategoryCode>S</ram:CategoryCode>
          <ram:RateApplicablePercent>19.00</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>200.00</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:BuyerReference>04011000-12345-34</ram:BuyerReference>
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
        <ram:Name>Harzer Dachdecker Meisterbetrieb GmbH</ram:Name>
        <ram:PostalTradeAddress>
          <ram:PostcodeCode>38855</ram:PostcodeCode>
          <ram:LineOne>Handwerkerstraße 5</ram:LineOne>
          <ram:CityName>Wernigerode</ram:CityName>
          <ram:CountryID>DE</ram:CountryID>
        </ram:PostalTradeAddress>
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">DE987654321</ram:ID>
        </ram:SpecifiedTaxRegistration>
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
        <ram:CalculatedAmount>133.00</ram:CalculatedAmount>
        <ram:TypeCode>VAT</ram:TypeCode>
        <ram:BasisAmount>700.00</ram:BasisAmount>
        <ram:CategoryCode>S</ram:CategoryCode>
        <ram:RateApplicablePercent>19.00</ram:RateApplicablePercent>
      </ram:ApplicableTradeTax>
      <ram:SpecifiedTradePaymentTerms>
        <ram:Description>Zahlbar innerhalb von 14 Tagen ohne Abzug.</ram:Description>
        <ram:DueDateDateTime>
          <udt:DateTimeString format="102">20260907</udt:DateTimeString>
        </ram:DueDateDateTime>
      </ram:SpecifiedTradePaymentTerms>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>700.00</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>700.00</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">133.00</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>833.00</ram:GrandTotalAmount>
        <ram:DuePayableAmount>833.00</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;

export const SAMPLE_UBL_INVOICE = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
  xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
  xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>XR-2026-9901</cbc:ID>
  <cbc:IssueDate>2026-08-24</cbc:IssueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cbc:BuyerReference>04011000-98765-12</cbc:BuyerReference>
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
        <cbc:Name>Stadtverwaltung Clausthal-Zellerfeld</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Rathausplatz 1</cbc:StreetName>
        <cbc:CityName>Clausthal-Zellerfeld</cbc:CityName>
        <cbc:PostalZone>38678</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>DE</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>DE115321000</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:Delivery>
    <cbc:ActualDeliveryDate>2026-08-20</cbc:ActualDeliveryDate>
  </cac:Delivery>
  <cac:PaymentMeans>
    <cbc:PaymentMeansCode>58</cbc:PaymentMeansCode>
    <cac:PayeeFinancialAccount>
      <cbc:ID>DE89370400440532013000</cbc:ID>
    </cac:PayeeFinancialAccount>
  </cac:PaymentMeans>
  <cac:PaymentTerms>
    <cbc:Note>Zahlbar innerhalb von 30 Tagen ohne Abzug.</cbc:Note>
  </cac:PaymentTerms>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">380.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="EUR">2000.00</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="EUR">380.00</cbc:TaxAmount>
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
    <cbc:LineExtensionAmount currencyID="EUR">2000.00</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">2000.00</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">2380.00</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="EUR">2380.00</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="C62">1.00</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">2000.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Name>Standard Setup &amp; DATEV-Schnittstellenintegration</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>19.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">2000.00</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
</Invoice>`;

export const SAMPLE_INVALID_INVOICE = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
  xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:cen.eu:en16931:2017</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <!-- BT-1 Missing: No ram:ID -->
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
        <ram:Name>Defektes Paket ohne Steuernummer</ram:Name>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>1000.00</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="C62">1.00</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
          <ram:TypeCode>VAT</ram:TypeCode>
          <ram:CategoryCode>S</ram:CategoryCode>
          <ram:RateApplicablePercent>19.00</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>1000.00</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>Musterfirma ohne USt-IdNr</ram:Name>
        <ram:PostalTradeAddress>
          <ram:PostcodeCode>38640</ram:PostcodeCode>
          <ram:LineOne>Unvollständige Straße</ram:LineOne>
          <ram:CityName>Goslar</ram:CityName>
          <ram:CountryID>DE</ram:CountryID>
        </ram:PostalTradeAddress>
        <!-- BT-31 Missing: No SpecifiedTaxRegistration -->
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>Kunde XYZ</ram:Name>
        <ram:PostalTradeAddress>
          <ram:CountryID>DE</ram:CountryID>
        </ram:PostalTradeAddress>
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <!-- BT-72 Missing: No Delivery Date or Period -->
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
      <ram:ApplicableTradeTax>
        <ram:CalculatedAmount>190.00</ram:CalculatedAmount>
        <ram:TypeCode>VAT</ram:TypeCode>
        <ram:BasisAmount>1000.00</ram:BasisAmount>
        <ram:CategoryCode>S</ram:CategoryCode>
        <ram:RateApplicablePercent>19.00</ram:RateApplicablePercent>
      </ram:ApplicableTradeTax>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>1000.00</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>1000.00</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">190.00</ram:TaxTotalAmount>
        <!-- BR-CO-15 Error: 1000 + 190 = 1190, but declared is 1500.00 -->
        <ram:GrandTotalAmount>1500.00</ram:GrandTotalAmount>
        <ram:DuePayableAmount>1500.00</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;

export const SAMPLE_INVOICES = {
  cii_comfort: {
    label: 'ZUGFeRD 2.2 / CII (Comfort/XRechnung - Valide)',
    xml: SAMPLE_CII_INVOICE,
    type: 'CII'
  },
  ubl_xrechnung: {
    label: 'XRechnung 3.0 / UBL (Standard - Valide)',
    xml: SAMPLE_UBL_INVOICE,
    type: 'UBL'
  },
  invalid_invoice: {
    label: 'Fehlerhafte Rechnung (Fehlende Pflichtfelder & Rechenfehler)',
    xml: SAMPLE_INVALID_INVOICE,
    type: 'CII'
  }
};

// ----------------------------------------------------------------------
// 2. Namespace-Agnostic DOM Traversal Utilities
// ----------------------------------------------------------------------

export function findDescendantByLocalName(root, localName) {
  if (!root || !root.getElementsByTagName) return null;
  const direct = root.getElementsByTagName(localName);
  if (direct && direct.length > 0) return direct[0];

  const all = root.getElementsByTagName('*');
  for (let i = 0; i < all.length; i++) {
    const el = all[i];
    const nodeLocal = el.localName || el.nodeName.split(':').pop();
    if (nodeLocal.toLowerCase() === localName.toLowerCase()) {
      return el;
    }
  }
  return null;
}

export function findDescendantsByLocalName(root, localName) {
  if (!root || !root.getElementsByTagName) return [];
  const results = [];
  const all = root.getElementsByTagName('*');
  for (let i = 0; i < all.length; i++) {
    const el = all[i];
    const nodeLocal = el.localName || el.nodeName.split(':').pop();
    if (nodeLocal.toLowerCase() === localName.toLowerCase()) {
      results.push(el);
    }
  }
  return results;
}

export function findChildByLocalName(parent, localName) {
  if (!parent || !parent.childNodes) return null;
  for (let i = 0; i < parent.childNodes.length; i++) {
    const node = parent.childNodes[i];
    if (node.nodeType === 1) {
      const nodeLocal = node.localName || node.nodeName.split(':').pop();
      if (nodeLocal.toLowerCase() === localName.toLowerCase()) {
        return node;
      }
    }
  }
  return null;
}

export function getTextByLocalName(root, localName) {
  const el = findDescendantByLocalName(root, localName);
  return el ? (el.textContent || '').trim() : '';
}

export function normalizeDate(rawDate) {
  if (!rawDate) return '';
  const trimmed = rawDate.trim();
  
  if (/^\d{8}$/.test(trimmed)) {
    return `${trimmed.substring(0, 4)}-${trimmed.substring(4, 6)}-${trimmed.substring(6, 8)}`;
  }
  
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return trimmed.substring(0, 10);
  }
  
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(trimmed)) {
    const parts = trimmed.split('.');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  
  return trimmed;
}

// ----------------------------------------------------------------------
// 3. Client-Side PDF/A-3 Embedded XML Extraction
// ----------------------------------------------------------------------

export async function extractXmlFromPdfBuffer(arrayBuffer) {
  let bytes;
  if (arrayBuffer instanceof Uint8Array) {
    bytes = arrayBuffer;
  } else if (arrayBuffer instanceof ArrayBuffer) {
    bytes = new Uint8Array(arrayBuffer);
  } else if (typeof arrayBuffer === 'string') {
    if (arrayBuffer.includes('<') && (arrayBuffer.includes('CrossIndustryInvoice') || arrayBuffer.includes('Invoice'))) {
      return arrayBuffer;
    }
    bytes = new Uint8Array(arrayBuffer.length);
    for (let i = 0; i < arrayBuffer.length; i++) {
      bytes[i] = arrayBuffer.charCodeAt(i) & 0xff;
    }
  } else {
    throw new Error('Ungültiger Puffer für PDF-Extraktion übergeben.');
  }

  let pdfString = '';
  const chunkSize = 65536;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
    pdfString += String.fromCharCode.apply(null, chunk);
  }

  const ciiMatch = pdfString.match(/<(?:\w+:)?CrossIndustryInvoice[\s\S]*?<\/(?:\w+:)?CrossIndustryInvoice>/i);
  if (ciiMatch) {
    const startIdx = pdfString.indexOf(ciiMatch[0]);
    const xmlBytes = bytes.subarray(startIdx, startIdx + ciiMatch[0].length);
    return new TextDecoder('utf-8').decode(xmlBytes);
  }

  const ublMatch = pdfString.match(/<(?:\w+:)?(?:Invoice|CreditNote)[\s\S]*?<\/(?:\w+:)?(?:Invoice|CreditNote)>/i);
  if (ublMatch) {
    const startIdx = pdfString.indexOf(ublMatch[0]);
    const xmlBytes = bytes.subarray(startIdx, startIdx + ublMatch[0].length);
    return new TextDecoder('utf-8').decode(xmlBytes);
  }

  const streamRegex = /<<[^>]*\/Type\s*\/EmbeddedFile[^>]*>>\s*stream[\r\n]+([\s\S]*?)[\r\n]+endstream/gi;
  let match;
  while ((match = streamRegex.exec(pdfString)) !== null) {
    const rawStream = match[1];
    const streamStart = pdfString.indexOf(rawStream, match.index);
    const compressedBytes = bytes.subarray(streamStart, streamStart + rawStream.length);

    if (typeof DecompressionStream !== 'undefined') {
      try {
        const ds = new DecompressionStream('deflate');
        const writer = ds.writable.getWriter();
        writer.write(compressedBytes);
        writer.close();
        const decompressedBuffer = await new Response(ds.readable).arrayBuffer();
        const decompressedText = new TextDecoder('utf-8').decode(decompressedBuffer);
        if (decompressedText.includes('CrossIndustryInvoice') || decompressedText.includes('Invoice') || decompressedText.includes('CreditNote')) {
          return decompressedText;
        }
      } catch {
        // Stream decompression continue
      }
    }
  }

  const xmlHeaderMatch = pdfString.match(/<\?xml[\s\S]*?(?:<\/rsm:CrossIndustryInvoice>|<\/CrossIndustryInvoice>|<\/Invoice>|<\/CreditNote>)/i);
  if (xmlHeaderMatch) {
    const startIdx = pdfString.indexOf(xmlHeaderMatch[0]);
    const xmlBytes = bytes.subarray(startIdx, startIdx + xmlHeaderMatch[0].length);
    return new TextDecoder('utf-8').decode(xmlBytes);
  }

  throw new Error('Kein gültiger ZUGFeRD / Factur-X XML-Datenstrom in dieser PDF-Datei gefunden (Standard-PDF ohne EN 16931 Anhang).');
}

// ----------------------------------------------------------------------
// 4. UN/CEFACT CII Extraction Logic
// ----------------------------------------------------------------------

export function parseCII(doc) {
  const root = doc.documentElement;
  
  const guideline = getTextByLocalName(root, 'GuidelineSpecifiedDocumentContextParameter') ||
                    getTextByLocalName(root, 'ID');
  
  const exchangedDoc = findDescendantByLocalName(root, 'ExchangedDocument') || root;
  const invoiceNumber = getTextByLocalName(exchangedDoc, 'ID');
  const typeCode = getTextByLocalName(exchangedDoc, 'TypeCode') || '380';
  
  let issueDate = '';
  const issueDateTimeEl = findDescendantByLocalName(exchangedDoc, 'IssueDateTime');
  if (issueDateTimeEl) {
    issueDate = normalizeDate(getTextByLocalName(issueDateTimeEl, 'DateTimeString') || issueDateTimeEl.textContent);
  }

  const tradeTransaction = findDescendantByLocalName(root, 'SupplyChainTradeTransaction') || root;
  const agreement = findDescendantByLocalName(tradeTransaction, 'ApplicableHeaderTradeAgreement') || tradeTransaction;
  const delivery = findDescendantByLocalName(tradeTransaction, 'ApplicableHeaderTradeDelivery') || tradeTransaction;
  const settlement = findDescendantByLocalName(tradeTransaction, 'ApplicableHeaderTradeSettlement') || tradeTransaction;

  const buyerReference = getTextByLocalName(agreement, 'BuyerReference');

  let deliveryDate = '';
  const deliveryEvent = findDescendantByLocalName(delivery, 'ActualDeliverySupplyChainEvent');
  if (deliveryEvent) {
    const dtEl = findDescendantByLocalName(deliveryEvent, 'OccurrenceDateTime');
    if (dtEl) {
      deliveryDate = normalizeDate(getTextByLocalName(dtEl, 'DateTimeString') || dtEl.textContent);
    }
  }
  if (!deliveryDate) {
    const period = findDescendantByLocalName(settlement, 'BillingSpecifiedPeriod');
    if (period) {
      const startEl = findDescendantByLocalName(period, 'StartDateTime');
      const endEl = findDescendantByLocalName(period, 'EndDateTime');
      const start = startEl ? normalizeDate(getTextByLocalName(startEl, 'DateTimeString') || startEl.textContent) : '';
      const end = endEl ? normalizeDate(getTextByLocalName(endEl, 'DateTimeString') || endEl.textContent) : '';
      if (start && end) deliveryDate = `${start} bis ${end}`;
      else if (start) deliveryDate = start;
    }
  }

  const sellerParty = findDescendantByLocalName(agreement, 'SellerTradeParty');
  const sellerName = sellerParty ? getTextByLocalName(sellerParty, 'Name') : '';
  const sellerPostal = sellerParty ? findDescendantByLocalName(sellerParty, 'PostalTradeAddress') : null;
  const sellerStreet = sellerPostal ? getTextByLocalName(sellerPostal, 'LineOne') : '';
  const sellerPostcode = sellerPostal ? getTextByLocalName(sellerPostal, 'PostcodeCode') : '';
  const sellerCity = sellerPostal ? getTextByLocalName(sellerPostal, 'CityName') : '';
  const sellerCountry = sellerPostal ? getTextByLocalName(sellerPostal, 'CountryID') : '';
  
  let sellerVatId = '';
  let sellerTaxNum = '';
  if (sellerParty) {
    const taxRegs = findDescendantsByLocalName(sellerParty, 'SpecifiedTaxRegistration');
    taxRegs.forEach(tr => {
      const idEl = findDescendantByLocalName(tr, 'ID');
      if (idEl) {
        const scheme = idEl.getAttribute('schemeID');
        const val = (idEl.textContent || '').trim();
        if (scheme === 'VA' || /^([A-Z]{2})?[0-9A-Z]{8,14}$/i.test(val)) {
          sellerVatId = val;
        } else {
          sellerTaxNum = val;
        }
      }
    });
  }

  const buyerParty = findDescendantByLocalName(agreement, 'BuyerTradeParty');
  const buyerName = buyerParty ? getTextByLocalName(buyerParty, 'Name') : '';
  const buyerPostal = buyerParty ? findDescendantByLocalName(buyerParty, 'PostalTradeAddress') : null;
  const buyerStreet = buyerPostal ? getTextByLocalName(buyerPostal, 'LineOne') : '';
  const buyerPostcode = buyerPostal ? getTextByLocalName(buyerPostal, 'PostcodeCode') : '';
  const buyerCity = buyerPostal ? getTextByLocalName(buyerPostal, 'CityName') : '';
  const buyerCountry = buyerPostal ? getTextByLocalName(buyerPostal, 'CountryID') : '';

  let buyerVatId = '';
  if (buyerParty) {
    const taxRegs = findDescendantsByLocalName(buyerParty, 'SpecifiedTaxRegistration');
    taxRegs.forEach(tr => {
      const idEl = findDescendantByLocalName(tr, 'ID');
      if (idEl) buyerVatId = (idEl.textContent || '').trim();
    });
  }

  const currency = getTextByLocalName(settlement, 'InvoiceCurrencyCode') || 'EUR';

  const lineItemNodes = findDescendantsByLocalName(tradeTransaction, 'IncludedSupplyChainTradeLineItem');
  const items = lineItemNodes.map((itemNode, idx) => {
    const lineDoc = findDescendantByLocalName(itemNode, 'AssociatedDocumentLineDocument');
    const id = lineDoc ? getTextByLocalName(lineDoc, 'LineID') : String(idx + 1);
    
    const product = findDescendantByLocalName(itemNode, 'SpecifiedTradeProduct');
    const name = product ? getTextByLocalName(product, 'Name') : `Position ${idx + 1}`;
    const description = product ? getTextByLocalName(product, 'Description') : '';

    const priceEl = findDescendantByLocalName(itemNode, 'NetPriceProductTradePrice');
    const unitPrice = priceEl ? parseFloat(getTextByLocalName(priceEl, 'ChargeAmount')) || 0 : 0;

    const deliveryEl = findDescendantByLocalName(itemNode, 'SpecifiedLineTradeDelivery');
    let quantity = 1;
    let unitCode = 'C62';
    if (deliveryEl) {
      const qtyEl = findDescendantByLocalName(deliveryEl, 'BilledQuantity');
      if (qtyEl) {
        quantity = parseFloat(qtyEl.textContent || '1') || 1;
        unitCode = qtyEl.getAttribute('unitCode') || 'C62';
      }
    }

    const lineSettlement = findDescendantByLocalName(itemNode, 'SpecifiedLineTradeSettlement');
    let taxRate = 19;
    let taxCategory = 'S';
    let lineTotal = unitPrice * quantity;

    if (lineSettlement) {
      const taxEl = findDescendantByLocalName(lineSettlement, 'ApplicableTradeTax');
      if (taxEl) {
        taxRate = parseFloat(getTextByLocalName(taxEl, 'RateApplicablePercent')) || 19;
        taxCategory = getTextByLocalName(taxEl, 'CategoryCode') || 'S';
      }
      const sumEl = findDescendantByLocalName(lineSettlement, 'SpecifiedTradeSettlementLineMonetarySummation');
      if (sumEl) {
        const explicitTotal = parseFloat(getTextByLocalName(sumEl, 'LineTotalAmount'));
        if (!isNaN(explicitTotal)) lineTotal = explicitTotal;
      }
    }

    return {
      id,
      name,
      description,
      quantity,
      unitCode,
      unitPrice,
      taxRate,
      taxCategory,
      lineTotal: Math.round(lineTotal * 100) / 100
    };
  });

  const taxBreakdownNodes = findDescendantsByLocalName(settlement, 'ApplicableTradeTax');
  const taxBreakdown = [];
  taxBreakdownNodes.forEach(taxNode => {
    const basis = parseFloat(getTextByLocalName(taxNode, 'BasisAmount')) || 0;
    const calculated = parseFloat(getTextByLocalName(taxNode, 'CalculatedAmount')) || 0;
    const rate = parseFloat(getTextByLocalName(taxNode, 'RateApplicablePercent')) || 0;
    const cat = getTextByLocalName(taxNode, 'CategoryCode') || 'S';
    if (basis > 0 || calculated > 0 || rate > 0) {
      taxBreakdown.push({
        taxCategory: cat,
        taxRate: rate,
        basisAmount: basis,
        taxAmount: calculated
      });
    }
  });

  const summationEl = findDescendantByLocalName(settlement, 'SpecifiedTradeSettlementHeaderMonetarySummation');
  const lineTotalNet = summationEl ? parseFloat(getTextByLocalName(summationEl, 'LineTotalAmount')) || 0 : 0;
  const taxBasisTotal = summationEl ? parseFloat(getTextByLocalName(summationEl, 'TaxBasisTotalAmount')) || 0 : lineTotalNet;
  const taxTotal = summationEl ? parseFloat(getTextByLocalName(summationEl, 'TaxTotalAmount')) || 0 : 0;
  const grandTotal = summationEl ? parseFloat(getTextByLocalName(summationEl, 'GrandTotalAmount')) || 0 : 0;
  const duePayableAmount = summationEl ? parseFloat(getTextByLocalName(summationEl, 'DuePayableAmount')) || grandTotal : grandTotal;

  return {
    format: 'CII',
    standard: guideline.toLowerCase().includes('xrechnung') ? 'XRechnung (CII)' : 'ZUGFeRD 2.x',
    syntax: 'CII',
    profile: guideline || 'urn:cen.eu:en16931:2017',
    invoiceNumber,
    issueDate,
    invoiceTypeCode: typeCode,
    currency,
    buyerReference,
    deliveryDate,
    seller: {
      name: sellerName,
      vatId: sellerVatId,
      taxNumber: sellerTaxNum,
      address: [sellerStreet, `${sellerPostcode} ${sellerCity}`.trim(), sellerCountry].filter(Boolean).join(', '),
      street: sellerStreet,
      postalCode: sellerPostcode,
      city: sellerCity,
      countryCode: sellerCountry
    },
    buyer: {
      name: buyerName,
      vatId: buyerVatId,
      buyerReference,
      address: [buyerStreet, `${buyerPostcode} ${buyerCity}`.trim(), buyerCountry].filter(Boolean).join(', '),
      street: buyerStreet,
      postalCode: buyerPostcode,
      city: buyerCity,
      countryCode: buyerCountry
    },
    items,
    taxBreakdown,
    monetaryTotals: {
      lineTotalNet,
      taxBasisTotal,
      taxTotal,
      grandTotal,
      duePayableAmount
    }
  };
}

// ----------------------------------------------------------------------
// 5. OASIS UBL 2.1 Extraction Logic
// ----------------------------------------------------------------------

export function parseUBL(doc) {
  const root = doc.documentElement;

  const customizationId = getTextByLocalName(root, 'CustomizationID');
  const profileId = getTextByLocalName(root, 'ProfileID');
  const invoiceNumber = getTextByLocalName(root, 'ID');
  const issueDate = normalizeDate(getTextByLocalName(root, 'IssueDate'));
  const typeCode = getTextByLocalName(root, 'InvoiceTypeCode') || '380';
  const currency = getTextByLocalName(root, 'DocumentCurrencyCode') || 'EUR';
  const buyerReference = getTextByLocalName(root, 'BuyerReference');

  let deliveryDate = '';
  const delivery = findDescendantByLocalName(root, 'Delivery');
  if (delivery) {
    deliveryDate = normalizeDate(getTextByLocalName(delivery, 'ActualDeliveryDate'));
  }
  if (!deliveryDate) {
    const period = findDescendantByLocalName(root, 'InvoicePeriod');
    if (period) {
      const start = normalizeDate(getTextByLocalName(period, 'StartDate'));
      const end = normalizeDate(getTextByLocalName(period, 'EndDate'));
      if (start && end) deliveryDate = `${start} bis ${end}`;
      else if (start) deliveryDate = start;
    }
  }

  const supplierParty = findDescendantByLocalName(root, 'AccountingSupplierParty');
  let sellerName = '';
  let sellerStreet = '';
  let sellerCity = '';
  let sellerPostal = '';
  let sellerCountry = '';
  let sellerVatId = '';
  let sellerTaxNum = '';

  if (supplierParty) {
    const party = findDescendantByLocalName(supplierParty, 'Party') || supplierParty;
    const nameEl = findDescendantByLocalName(party, 'PartyName') || findDescendantByLocalName(party, 'PartyLegalEntity');
    if (nameEl) sellerName = getTextByLocalName(nameEl, 'Name') || getTextByLocalName(nameEl, 'RegistrationName');

    const address = findDescendantByLocalName(party, 'PostalAddress');
    if (address) {
      sellerStreet = getTextByLocalName(address, 'StreetName');
      sellerCity = getTextByLocalName(address, 'CityName');
      sellerPostal = getTextByLocalName(address, 'PostalZone');
      const countryEl = findDescendantByLocalName(address, 'Country');
      if (countryEl) sellerCountry = getTextByLocalName(countryEl, 'IdentificationCode');
    }

    const partyTaxScheme = findDescendantByLocalName(party, 'PartyTaxScheme');
    if (partyTaxScheme) {
      const companyId = getTextByLocalName(partyTaxScheme, 'CompanyID');
      const schemeId = getTextByLocalName(partyTaxScheme, 'ID');
      if (companyId.startsWith('DE') || schemeId.includes('VAT')) {
        sellerVatId = companyId;
      } else {
        sellerTaxNum = companyId;
      }
    }
  }

  const customerParty = findDescendantByLocalName(root, 'AccountingCustomerParty');
  let buyerName = '';
  let buyerStreet = '';
  let buyerCity = '';
  let buyerPostal = '';
  let buyerCountry = '';
  let buyerVatId = '';

  if (customerParty) {
    const party = findDescendantByLocalName(customerParty, 'Party') || customerParty;
    const nameEl = findDescendantByLocalName(party, 'PartyName') || findDescendantByLocalName(party, 'PartyLegalEntity');
    if (nameEl) buyerName = getTextByLocalName(nameEl, 'Name') || getTextByLocalName(nameEl, 'RegistrationName');

    const address = findDescendantByLocalName(party, 'PostalAddress');
    if (address) {
      buyerStreet = getTextByLocalName(address, 'StreetName');
      buyerCity = getTextByLocalName(address, 'CityName');
      buyerPostal = getTextByLocalName(address, 'PostalZone');
      const countryEl = findDescendantByLocalName(address, 'Country');
      if (countryEl) buyerCountry = getTextByLocalName(countryEl, 'IdentificationCode');
    }

    const partyTaxScheme = findDescendantByLocalName(party, 'PartyTaxScheme');
    if (partyTaxScheme) {
      buyerVatId = getTextByLocalName(partyTaxScheme, 'CompanyID');
    }
  }

  const lineItemNodes = findDescendantsByLocalName(root, 'InvoiceLine');
  const items = lineItemNodes.map((lineNode, idx) => {
    const id = getTextByLocalName(lineNode, 'ID') || String(idx + 1);
    
    let quantity = 1;
    let unitCode = 'C62';
    const qtyEl = findDescendantByLocalName(lineNode, 'InvoicedQuantity') || findDescendantByLocalName(lineNode, 'CreditedQuantity');
    if (qtyEl) {
      quantity = parseFloat(qtyEl.textContent || '1') || 1;
      unitCode = qtyEl.getAttribute('unitCode') || 'C62';
    }

    const lineTotal = parseFloat(getTextByLocalName(lineNode, 'LineExtensionAmount')) || 0;

    const itemEl = findDescendantByLocalName(lineNode, 'Item');
    const name = itemEl ? (getTextByLocalName(itemEl, 'Name') || `Position ${idx + 1}`) : `Position ${idx + 1}`;
    const description = itemEl ? getTextByLocalName(itemEl, 'Description') : '';

    let taxRate = 19;
    let taxCategory = 'S';
    if (itemEl) {
      const taxCat = findDescendantByLocalName(itemEl, 'ClassifiedTaxCategory');
      if (taxCat) {
        taxRate = parseFloat(getTextByLocalName(taxCat, 'Percent')) || 19;
        taxCategory = getTextByLocalName(taxCat, 'ID') || 'S';
      }
    }

    const priceEl = findDescendantByLocalName(lineNode, 'Price');
    const unitPrice = priceEl ? (parseFloat(getTextByLocalName(priceEl, 'PriceAmount')) || (lineTotal / (quantity || 1))) : (lineTotal / (quantity || 1));

    return {
      id,
      name,
      description,
      quantity,
      unitCode,
      unitPrice: Math.round(unitPrice * 100) / 100,
      taxRate,
      taxCategory,
      lineTotal: Math.round(lineTotal * 100) / 100
    };
  });

  const taxTotalEl = findDescendantByLocalName(root, 'TaxTotal');
  const taxSubtotalNodes = taxTotalEl ? findDescendantsByLocalName(taxTotalEl, 'TaxSubtotal') : [];
  const taxBreakdown = taxSubtotalNodes.map(subNode => {
    const basis = parseFloat(getTextByLocalName(subNode, 'TaxableAmount')) || 0;
    const taxAmt = parseFloat(getTextByLocalName(subNode, 'TaxAmount')) || 0;
    const catEl = findDescendantByLocalName(subNode, 'TaxCategory');
    const rate = catEl ? (parseFloat(getTextByLocalName(catEl, 'Percent')) || 0) : 0;
    const cat = catEl ? (getTextByLocalName(catEl, 'ID') || 'S') : 'S';
    return {
      taxCategory: cat,
      taxRate: rate,
      basisAmount: basis,
      taxAmount: taxAmt
    };
  });

  const monetaryTotalEl = findDescendantByLocalName(root, 'LegalMonetaryTotal');
  const lineTotalNet = monetaryTotalEl ? (parseFloat(getTextByLocalName(monetaryTotalEl, 'LineExtensionAmount')) || 0) : 0;
  const taxBasisTotal = monetaryTotalEl ? (parseFloat(getTextByLocalName(monetaryTotalEl, 'TaxExclusiveAmount')) || lineTotalNet) : lineTotalNet;
  const grandTotal = monetaryTotalEl ? (parseFloat(getTextByLocalName(monetaryTotalEl, 'TaxInclusiveAmount')) || 0) : 0;
  const taxTotal = taxTotalEl ? (parseFloat(getTextByLocalName(taxTotalEl, 'TaxAmount')) || Math.max(0, grandTotal - taxBasisTotal)) : Math.max(0, grandTotal - taxBasisTotal);
  const duePayableAmount = monetaryTotalEl ? (parseFloat(getTextByLocalName(monetaryTotalEl, 'PayableAmount')) || grandTotal) : grandTotal;

  return {
    format: 'UBL',
    standard: 'XRechnung (UBL)',
    syntax: 'UBL',
    profile: customizationId || profileId || 'urn:cen.eu:en16931:2017',
    invoiceNumber,
    issueDate,
    invoiceTypeCode: typeCode,
    currency,
    buyerReference,
    deliveryDate,
    seller: {
      name: sellerName,
      vatId: sellerVatId,
      taxNumber: sellerTaxNum,
      address: [sellerStreet, `${sellerPostal} ${sellerCity}`.trim(), sellerCountry].filter(Boolean).join(', '),
      street: sellerStreet,
      postalCode: sellerPostal,
      city: sellerCity,
      countryCode: sellerCountry
    },
    buyer: {
      name: buyerName,
      vatId: buyerVatId,
      buyerReference,
      address: [buyerStreet, `${buyerPostal} ${buyerCity}`.trim(), buyerCountry].filter(Boolean).join(', '),
      street: buyerStreet,
      postalCode: buyerPostal,
      city: buyerCity,
      countryCode: buyerCountry
    },
    items,
    taxBreakdown,
    monetaryTotals: {
      lineTotalNet,
      taxBasisTotal,
      taxTotal,
      grandTotal,
      duePayableAmount
    }
  };
}

// ----------------------------------------------------------------------
// 6. EN 16931 Semantic Business Validation Engine
// ----------------------------------------------------------------------

export function validateInvoiceData(data) {
  const checks = [];

  const addCheck = (code, label, status, message, btId = '', category = 'Allgemein') => {
    checks.push({ code, label, status, message, btId, category });
  };

  // 1. Standard & Format Profile Check
  if (data.standard && data.standard !== 'Unknown') {
    addCheck('CHECK-STANDARD', 'E-Rechnungs Standard', 'PASS', `Erkannt als ${data.standard} (${data.syntax})`, 'BG-0', 'Format');
  } else {
    addCheck('CHECK-STANDARD', 'E-Rechnungs Standard', 'FAIL', 'Unbekanntes oder nicht EN 16931 konformes XML-Format', 'BG-0', 'Format');
  }

  // 2. BT-1: Rechnungsnummer (Mandatory)
  if (data.invoiceNumber && data.invoiceNumber.trim().length > 0) {
    addCheck('BT-1', 'Rechnungsnummer', 'PASS', `Rechnungsnummer vorhanden: ${data.invoiceNumber}`, 'BT-1', 'Kopfdaten');
  } else {
    addCheck('BT-1', 'Rechnungsnummer', 'FAIL', 'Pflichtfeld Rechnungsnummer (BT-1) fehlt oder ist leer', 'BT-1', 'Kopfdaten');
  }

  // 3. BT-2: Rechnungsdatum (Mandatory)
  if (data.issueDate && /^\d{4}-\d{2}-\d{2}$/.test(data.issueDate)) {
    addCheck('BT-2', 'Rechnungsdatum', 'PASS', `Valides Ausstellungsdatum: ${data.issueDate}`, 'BT-2', 'Kopfdaten');
  } else if (data.issueDate) {
    addCheck('BT-2', 'Rechnungsdatum', 'WARN', `Datum angegeben (${data.issueDate}), entspricht jedoch nicht exakt ISO-8601`, 'BT-2', 'Kopfdaten');
  } else {
    addCheck('BT-2', 'Rechnungsdatum', 'FAIL', 'Pflichtfeld Rechnungsdatum (BT-2) fehlt', 'BT-2', 'Kopfdaten');
  }

  // 4. BT-3: Rechnungstyp-Code
  if (data.invoiceTypeCode === '380' || data.invoiceTypeCode === '381' || data.invoiceTypeCode === '384' || data.invoiceTypeCode === '389') {
    const typeLabel = data.invoiceTypeCode === '380' ? 'Handelsrechnung (380)' : data.invoiceTypeCode === '381' ? 'Gutschrift (381)' : `Code ${data.invoiceTypeCode}`;
    addCheck('BT-3', 'Rechnungstyp-Code', 'PASS', `Gültiger UNTDID 1001 Code: ${typeLabel}`, 'BT-3', 'Kopfdaten');
  } else if (data.invoiceTypeCode) {
    addCheck('BT-3', 'Rechnungstyp-Code', 'WARN', `Ungewöhnlicher Rechnungstyp-Code: ${data.invoiceTypeCode}`, 'BT-3', 'Kopfdaten');
  } else {
    addCheck('BT-3', 'Rechnungstyp-Code', 'WARN', 'Rechnungstyp-Code (BT-3) nicht deklariert (Standard 380 angenommen)', 'BT-3', 'Kopfdaten');
  }

  // 5. BT-5: Währung (Mandatory)
  if (data.currency && data.currency.trim().length === 3) {
    addCheck('BT-5', 'Rechnungswährung', 'PASS', `Währung: ${data.currency}`, 'BT-5', 'Kopfdaten');
  } else {
    addCheck('BT-5', 'Rechnungswährung', 'FAIL', 'Währungscode (BT-5) fehlt oder ist ungültig (erwartet: ISO 4217, z.B. EUR)', 'BT-5', 'Kopfdaten');
  }

  // 6. BT-72 / BT-73 / BT-74: Leistungsdatum / Leistungszeitraum (Mandatory nach §14 UStG)
  if (data.deliveryDate && data.deliveryDate.trim().length > 0) {
    addCheck('BT-72', 'Leistungsdatum / Zeitraum', 'PASS', `Leistungsdatum bzw. Zeitraum dokumentiert: ${data.deliveryDate}`, 'BT-72', 'Kopfdaten');
  } else {
    addCheck('BT-72', 'Leistungsdatum / Zeitraum', 'FAIL', 'Pflichtfeld Leistungsdatum oder Leistungszeitraum (BT-72/73/74) fehlt (steuerrechtliche Pflichtangabe nach §14 UStG)', 'BT-72', 'Kopfdaten');
  }

  // 7. BT-10: Buyer Reference / Leitweg-ID
  if (data.buyerReference && data.buyerReference.trim().length > 0) {
    const isLeitweg = /^[0-9]{2,12}-[0-9A-Z]{1,30}-[0-9]{2}$/i.test(data.buyerReference.trim());
    if (isLeitweg) {
      addCheck('BT-10', 'Leitweg-ID / Käuferreferenz', 'PASS', `Gültige deutsche Leitweg-ID für B2G: ${data.buyerReference}`, 'BT-10', 'Käufer / B2G');
    } else {
      addCheck('BT-10', 'Käuferreferenz (BT-10)', 'PASS', `Käuferreferenz vorhanden: ${data.buyerReference}`, 'BT-10', 'Käufer / B2G');
    }
  } else {
    if (data.standard && data.standard.includes('XRechnung')) {
      addCheck('BT-10', 'Leitweg-ID / Käuferreferenz', 'FAIL', 'Pflichtfeld Leitweg-ID (BT-10) für B2G XRechnung fehlt', 'BT-10', 'Käufer / B2G');
    } else {
      addCheck('BT-10', 'Käuferreferenz (BT-10)', 'WARN', 'Keine Käuferreferenz (BT-10) hinterlegt (im B2B empfohlen, im B2G Pflicht)', 'BT-10', 'Käufer / B2G');
    }
  }

  // 8. Seller Checks (BG-4)
  if (data.seller.name && data.seller.name.trim().length > 0) {
    addCheck('BT-27', 'Verkäufer Name (Kreditor)', 'PASS', `Verkäufer: ${data.seller.name}`, 'BT-27', 'Verkäufer (Kreditor)');
  } else {
    addCheck('BT-27', 'Verkäufer Name (Kreditor)', 'FAIL', 'Verkäufername (BT-27) fehlt', 'BT-27', 'Verkäufer (Kreditor)');
  }

  if (data.seller.vatId || data.seller.taxNumber) {
    const idStr = data.seller.vatId ? `USt-IdNr: ${data.seller.vatId}` : `Steuernummer: ${data.seller.taxNumber}`;
    addCheck('BT-31', 'Verkäufer Steuernummer / USt-IdNr', 'PASS', `${idStr} vorhanden`, 'BT-31', 'Verkäufer (Kreditor)');
  } else {
    addCheck('BT-31', 'Verkäufer Steuernummer / USt-IdNr', 'FAIL', 'Weder USt-IdNr (BT-31) noch Steuernummer (BT-32) des Verkäufers angegeben', 'BT-31', 'Verkäufer (Kreditor)');
  }

  if (data.seller.street && data.seller.city && (data.seller.postalCode || data.seller.countryCode)) {
    addCheck('BT-35-40', 'Verkäufer Adresse', 'PASS', `Vollständige Adresse: ${data.seller.address}`, 'BT-35', 'Verkäufer (Kreditor)');
  } else if (data.seller.address) {
    addCheck('BT-35-40', 'Verkäufer Adresse', 'WARN', `Adresse teilweise unvollständig: ${data.seller.address}`, 'BT-35', 'Verkäufer (Kreditor)');
  } else {
    addCheck('BT-35-40', 'Verkäufer Adresse', 'FAIL', 'Verkäufer-Anschrift (BT-35 bis BT-40) fehlt', 'BT-35', 'Verkäufer (Kreditor)');
  }

  // 9. Buyer Checks (BG-7)
  if (data.buyer.name && data.buyer.name.trim().length > 0) {
    addCheck('BT-44', 'Käufer Name (Debitor)', 'PASS', `Käufer: ${data.buyer.name}`, 'BT-44', 'Käufer (Debitor)');
  } else {
    addCheck('BT-44', 'Käufer Name (Debitor)', 'FAIL', 'Käufername (BT-44) fehlt', 'BT-44', 'Käufer (Debitor)');
  }

  if (data.buyer.countryCode || data.buyer.address) {
    addCheck('BT-50-55', 'Käufer Adresse', 'PASS', `Käuferanschrift vorhanden: ${data.buyer.address || data.buyer.countryCode}`, 'BT-50', 'Käufer (Debitor)');
  } else {
    addCheck('BT-50-55', 'Käufer Adresse', 'WARN', 'Käuferanschrift nicht vollständig angegeben', 'BT-50', 'Käufer (Debitor)');
  }

  // 10. Line Items Check (BG-25)
  if (data.items && data.items.length > 0) {
    addCheck('BG-25-COUNT', 'Rechnungspositionen', 'PASS', `${data.items.length} strukturierte Position(en) gefunden`, 'BG-25', 'Positionen');
    
    let invalidLine = null;
    data.items.forEach((item, i) => {
      if (!item.name || item.name.trim().length === 0) {
        invalidLine = `Position #${item.id || i + 1}: Name fehlt (BT-153)`;
      }
      const calcLine = Math.round(item.quantity * item.unitPrice * 100) / 100;
      if (Math.abs(calcLine - item.lineTotal) > 0.05 && item.lineTotal > 0) {
        invalidLine = `Position #${item.id || i + 1}: Mengenberechnung weicht ab (${item.quantity} × ${item.unitPrice} € = ${calcLine.toFixed(2)} € vs ${item.lineTotal.toFixed(2)} €)`;
      }
    });

    if (invalidLine) {
      addCheck('BR-LINE-1', 'Positions-Konsistenz', 'FAIL', invalidLine, 'BR-LINE-1', 'Positionen');
    } else {
      addCheck('BR-LINE-1', 'Positions-Konsistenz', 'PASS', 'Alle Positionen enthalten Pflichtangaben & korrekte Mengenmultiplikation', 'BR-LINE-1', 'Positionen');
    }
  } else {
    addCheck('BG-25-COUNT', 'Rechnungspositionen', 'FAIL', 'Keine Rechnungspositionen (BG-25) in der E-Rechnung gefunden (mind. 1 erforderlich)', 'BG-25', 'Positionen');
  }

  // 11. Mathematical Consistency Engine (BR-CO-10 to BR-CO-18)
  const totals = data.monetaryTotals;
  const itemsSum = data.items.reduce((acc, it) => acc + (it.lineTotal || 0), 0);
  const roundedItemsSum = Math.round(itemsSum * 100) / 100;
  const roundedLineTotalNet = Math.round((totals.lineTotalNet || 0) * 100) / 100;
  const roundedTaxBasis = Math.round((totals.taxBasisTotal || 0) * 100) / 100;
  const roundedTaxTotal = Math.round((totals.taxTotal || 0) * 100) / 100;
  const roundedGrandTotal = Math.round((totals.grandTotal || 0) * 100) / 100;
  const roundedDue = Math.round((totals.duePayableAmount || 0) * 100) / 100;

  const lineDiff = Math.abs(roundedItemsSum - roundedLineTotalNet);
  if (data.items.length > 0 && lineDiff <= 0.02) {
    addCheck('BR-CO-10', 'Positionssumme vs. Gesamt-Netto', 'PASS', `Summe der Positionen (${roundedItemsSum.toFixed(2)} €) stimmt mit Nettobetrag (${roundedLineTotalNet.toFixed(2)} €) überein`, 'BT-106', 'Mathematik & Summen');
  } else if (data.items.length > 0) {
    addCheck('BR-CO-10', 'Positionssumme vs. Gesamt-Netto', 'FAIL', `Rechenabweichung: Summe der Positionen (${roundedItemsSum.toFixed(2)} €) weicht von Gesamt-Netto (${roundedLineTotalNet.toFixed(2)} €) um ${lineDiff.toFixed(2)} € ab (erlaubt: max 0.02 €)`, 'BT-106', 'Mathematik & Summen');
  }

  const expectedGross = Math.round((roundedTaxBasis + roundedTaxTotal) * 100) / 100;
  const grossDiff = Math.abs(expectedGross - roundedGrandTotal);
  if (grossDiff <= 0.02 && roundedGrandTotal > 0) {
    addCheck('BR-CO-15', 'Brutto-Summenabgleich (Netto + MwSt = Brutto)', 'PASS', `Nettobasis (${roundedTaxBasis.toFixed(2)} €) + MwSt (${roundedTaxTotal.toFixed(2)} €) = Bruttosumme (${roundedGrandTotal.toFixed(2)} €)`, 'BT-112', 'Mathematik & Summen');
  } else {
    addCheck('BR-CO-15', 'Brutto-Summenabgleich (Netto + MwSt = Brutto)', 'FAIL', `Mathematischer Fehler: Netto (${roundedTaxBasis.toFixed(2)} €) + MwSt (${roundedTaxTotal.toFixed(2)} €) ergibt ${expectedGross.toFixed(2)} €, deklariert ist aber ${roundedGrandTotal.toFixed(2)} € (Differenz: ${grossDiff.toFixed(2)} €)`, 'BT-112', 'Mathematik & Summen');
  }

  const dueDiff = Math.abs(roundedGrandTotal - roundedDue);
  if (dueDiff <= 0.02 && roundedDue > 0) {
    addCheck('BR-CO-16', 'Fälliger Zahlbetrag', 'PASS', `Zahlbetrag (${roundedDue.toFixed(2)} €) stimmt mit Bruttosumme überein`, 'BT-115', 'Mathematik & Summen');
  } else if (roundedDue > 0) {
    addCheck('BR-CO-16', 'Fälliger Zahlbetrag', 'WARN', `Zahlbetrag (${roundedDue.toFixed(2)} €) weicht von Brutto (${roundedGrandTotal.toFixed(2)} €) ab (evtl. Skonto/Vorauszahlung)`, 'BT-115', 'Mathematik & Summen');
  } else {
    addCheck('BT-115', 'Fälliger Zahlbetrag', 'FAIL', 'Fälliger Zahlbetrag (BT-115) fehlt oder ist 0,00 €', 'BT-115', 'Mathematik & Summen');
  }

  const passedChecks = checks.filter(c => c.status === 'PASS').length;
  const warnChecks = checks.filter(c => c.status === 'WARN').length;
  const failedChecks = checks.filter(c => c.status === 'FAIL').length;
  const totalChecks = checks.length;
  const overallStatus = failedChecks > 0 ? 'FAIL' : (warnChecks > 0 ? 'WARN' : 'PASS');

  return {
    ...data,
    isValid: failedChecks === 0,
    overallStatus,
    totals: {
      netAmount: roundedTaxBasis,
      taxAmount: roundedTaxTotal,
      grossAmount: roundedGrandTotal,
      duePayableAmount: roundedDue,
      lineTotalNet: roundedLineTotalNet,
      calculatedTax: expectedGross - roundedTaxBasis,
      taxDiscrepancy: grossDiff
    },
    summary: {
      totalChecks,
      passedChecks,
      warnChecks,
      failedChecks,
      status: overallStatus
    },
    checks
  };
}

// ----------------------------------------------------------------------
// 7. Main Entry Point: parseAndValidateEInvoice
// ----------------------------------------------------------------------

export async function parseAndValidateEInvoice(input) {
  let xmlString = '';
  let sourceSyntax = 'CII';

  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (trimmed.startsWith('%PDF')) {
      xmlString = await extractXmlFromPdfBuffer(input);
      sourceSyntax = 'Hybrid PDF/A-3';
    } else {
      xmlString = trimmed;
      if (xmlString.charCodeAt(0) === 0xFEFF) {
        xmlString = xmlString.substring(1);
      }
    }
  } else if (input instanceof File || input instanceof Blob) {
    const isPdf = input.type === 'application/pdf' || (input.name && input.name.toLowerCase().endsWith('.pdf'));
    if (isPdf) {
      const buffer = await input.arrayBuffer();
      xmlString = await extractXmlFromPdfBuffer(buffer);
      sourceSyntax = 'Hybrid PDF/A-3';
    } else {
      xmlString = await input.text();
      if (xmlString.charCodeAt(0) === 0xFEFF) {
        xmlString = xmlString.substring(1);
      }
    }
  } else if (input instanceof ArrayBuffer || input instanceof Uint8Array) {
    try {
      xmlString = await extractXmlFromPdfBuffer(input);
      sourceSyntax = 'Hybrid PDF/A-3';
    } catch {
      xmlString = new TextDecoder('utf-8').decode(input);
      if (xmlString.charCodeAt(0) === 0xFEFF) {
        xmlString = xmlString.substring(1);
      }
    }
  }

  if (typeof DOMParser === 'undefined') {
    throw new Error('DOMParser ist in dieser Umgebung nicht verfügbar.');
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'application/xml');

  const parseError = doc.getElementsByTagName('parsererror');
  if (parseError && parseError.length > 0) {
    const errMsg = parseError[0].textContent || 'Syntaxfehler im XML-Dokument';
    return {
      isValid: false,
      standard: 'Unknown',
      syntax: 'Unknown',
      overallStatus: 'FAIL',
      invoiceNumber: 'FEHLER',
      issueDate: '',
      deliveryDate: '',
      seller: { name: '', vatId: '', address: '' },
      buyer: { name: '', vatId: '', buyerReference: '', address: '' },
      items: [],
      taxBreakdown: [],
      totals: { netAmount: 0, taxAmount: 0, grossAmount: 0, duePayableAmount: 0, calculatedTax: 0, taxDiscrepancy: 0 },
      summary: { totalChecks: 1, passedChecks: 0, warnChecks: 0, failedChecks: 1, status: 'FAIL' },
      checks: [
        {
          code: 'XML-SYNTAX-ERROR',
          label: 'XML Syntax Validierung',
          status: 'FAIL',
          message: `Das hochgeladene Dokument enthält gravierende XML-Syntaxfehler: ${errMsg.substring(0, 150)}`,
          btId: 'BT-0',
          category: 'Format'
        }
      ],
      rawXml: xmlString
    };
  }

  const root = doc.documentElement;
  const rootLocalName = (root.localName || root.nodeName.split(':').pop()).toLowerCase();

  let invoiceData;
  if (rootLocalName === 'crossindustryinvoice') {
    invoiceData = parseCII(doc);
    if (sourceSyntax === 'Hybrid PDF/A-3') invoiceData.syntax = 'Hybrid PDF/A-3';
  } else if (rootLocalName === 'invoice' || rootLocalName === 'creditnote') {
    invoiceData = parseUBL(doc);
    if (sourceSyntax === 'Hybrid PDF/A-3') invoiceData.syntax = 'Hybrid PDF/A-3';
  } else {
    return {
      isValid: false,
      standard: 'Unknown',
      syntax: 'Unknown',
      overallStatus: 'FAIL',
      invoiceNumber: 'UNBEKANNT',
      issueDate: '',
      deliveryDate: '',
      seller: { name: '', vatId: '', address: '' },
      buyer: { name: '', vatId: '', buyerReference: '', address: '' },
      items: [],
      taxBreakdown: [],
      totals: { netAmount: 0, taxAmount: 0, grossAmount: 0, duePayableAmount: 0, calculatedTax: 0, taxDiscrepancy: 0 },
      summary: { totalChecks: 1, passedChecks: 0, warnChecks: 0, failedChecks: 1, status: 'FAIL' },
      checks: [
        {
          code: 'UNKNOWN-ROOT-ELEMENT',
          label: 'Wurzelelement Prüfung',
          status: 'FAIL',
          message: `Unbekanntes XML-Wurzelelement <${root.nodeName}>. Erwartet wird <rsm:CrossIndustryInvoice> (CII) oder <Invoice> (UBL).`,
          btId: 'BT-0',
          category: 'Format'
        }
      ],
      rawXml: xmlString
    };
  }

  const validatedResult = validateInvoiceData(invoiceData);
  validatedResult.rawXml = xmlString;
  return validatedResult;
}

// ----------------------------------------------------------------------
// 8. Export Helpers: JSON & PDF Prüfbericht
// ----------------------------------------------------------------------

export function exportValidationReportJSON(result) {
  const jsonReport = JSON.stringify(result, null, 2);
  const blob = new Blob([jsonReport], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `E-Rechnung_Pruefbericht_${result.invoiceNumber || 'Audit'}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function generateValidationReportPDF(result) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 42, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('KMU SERVICE HARZ', 14, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('E-Rechnungs & ZUGFeRD / XRechnung Prüf-Zertifikat (EN 16931)', 14, 23);

  const status = result.overallStatus || (result.isValid ? 'PASS' : 'FAIL');
  const badgeText = status === 'PASS' ? 'KONFORM (GÜLTIG)' : status === 'WARN' ? 'WARNUNG' : 'NICHT KONFORM (FEHLERHAFT)';
  const badgeColor = status === 'PASS' ? [16, 185, 129] : status === 'WARN' ? [245, 158, 11] : [239, 68, 68];

  doc.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
  doc.roundedRect(pageWidth - 68, 12, 54, 12, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(badgeText, pageWidth - 41, 19.5, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Prüfzeitpunkt: ${new Date().toLocaleString('de-DE')} | Standard: ${result.standard || 'EN 16931'} | Syntax: ${result.syntax || 'XML'}`, 14, 35);

  let y = 50;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('Beleg-Stammdaten & Parteien', 18, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);

  doc.text(`Rechnungs-Nr: ${result.invoiceNumber || '–'}`, 18, y + 14);
  doc.text(`Ausstellungsdatum: ${result.issueDate || '–'}`, 18, y + 20);
  doc.text(`Leistungsdatum: ${result.deliveryDate || '–'}`, 18, y + 26);
  doc.text(`Leitweg-ID / Ref: ${result.buyerReference || '–'}`, 18, y + 32);

  doc.text(`Verkäufer: ${result.seller?.name || '–'}`, 105, y + 14);
  doc.text(`USt-IdNr (Kreditor): ${result.seller?.vatId || result.seller?.taxNumber || '–'}`, 105, y + 20);
  doc.text(`Käufer: ${result.buyer?.name || '–'}`, 105, y + 26);
  doc.text(`Summe Brutto: ${result.totals?.grossAmount ? result.totals.grossAmount.toFixed(2) + ' EUR' : '–'}`, 105, y + 32);

  y += 45;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, y, pageWidth - 28, 20, 2, 2, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text(`Netto: ${(result.totals?.netAmount || 0).toFixed(2)} €`, 20, y + 11);
  doc.text(`+ MwSt: ${(result.totals?.taxAmount || 0).toFixed(2)} €`, 70, y + 11);
  doc.text(`= Brutto: ${(result.totals?.grossAmount || 0).toFixed(2)} €`, 120, y + 11);
  doc.text(`Zahlbetrag: ${(result.totals?.duePayableAmount || 0).toFixed(2)} €`, 160, y + 11);

  y += 28;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(`Detailliertes Prüfprotokoll (${result.checks?.length || 0} EN 16931 Regeln)`, 14, y);
  
  y += 6;

  const checks = result.checks || [];
  checks.forEach((chk) => {
    if (y > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }

    const isPass = chk.status === 'PASS';
    const isWarn = chk.status === 'WARN';
    
    doc.setFillColor(isPass ? 16 : isWarn ? 245 : 239, isPass ? 185 : isWarn ? 158 : 68, isPass ? 129 : isWarn ? 11 : 68);
    doc.circle(18, y + 1.5, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(isPass ? 16 : isWarn ? 180 : 220, isPass ? 120 : isWarn ? 100 : 38, isPass ? 80 : 20);
    doc.text(`[${chk.code}] ${chk.label}`, 24, y + 3);

    if (chk.btId) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(`(${chk.btId})`, 100, y + 3);
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    
    const msgLines = doc.splitTextToSize(chk.message, pageWidth - 42);
    doc.text(msgLines, 24, y + 7.5);

    y += 10 + (msgLines.length - 1) * 3.5;
  });

  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Erstellt durch KMU Service Harz Prüf-Studio | GoBD- & EN 16931 Rechnungsvalidierung | www.kmuserviceharz.de', pageWidth / 2, pageHeight - 8, { align: 'center' });

  doc.save(`Pruefprotokoll_E-Rechnung_${result.invoiceNumber || 'Audit'}.pdf`);
}

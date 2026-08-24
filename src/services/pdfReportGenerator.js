import { jsPDF } from 'jspdf';

/**
 * KMU Service Harz - 500 € „Büro-Stress-Test & ROI-Report“ PDF Generator
 * 
 * Generiert einen vollständigen 4-teiligen Prüfbericht nach Businessplan:
 * 1. Prozess-Röntgenbild (Status Quo Visualisierung mit 4 Stationen & Engpässen)
 * 2. Rote Schattenkosten-Berechnung in Euro (Formel: Wöchentliche Stunden * 4.33 * 65 € * 12 Monate)
 * 3. Schlüsselfertige Soll-Roadmap mit Make / Lexoffice / DATEV (4 Phasen & Meilensteine)
 * 4. Fördermittel-Indikation & Amortisation (50% Zuschuss NDS/LSA/BUND + 100% Audit-Gutschrift)
 */

/**
 * Berechnet alle relevanten Metriken für den 500 € Büro-Stress-Test & ROI-Report.
 * 
 * @param {Object} [input={}]
 * @param {number} [input.weeklyWastedHours=8] - Wöchentlich verlorene Stunden
 * @param {number} [input.masterHourlyRate=65] - Meister-/Mitarbeiter-Stundensatz in €
 * @param {number} [input.setupFee] - Investitionssumme für Stufe 2 (Default: 2000 € bzw. nach Paket)
 * @param {number} [input.projectFee] - Alternative Bezeichnung für Setup-Gebühr
 * @param {string} [input.region='NDS'] - Fördermittel-Region ('NDS' | 'LSA' | 'TH' | 'BUND' | 'NONE')
 * @param {string} [input.selectedPackage='standardSetup2000'] - Gewähltes Paket
 * @returns {Object} Berechnete Kennzahlen
 */
export function calculateAuditMetrics(input = {}) {
  const weeklyWastedHours = typeof input.weeklyWastedHours === 'number' && !isNaN(input.weeklyWastedHours) 
    ? Math.max(0, input.weeklyWastedHours) 
    : (input.weeklyWastedHours === 0 ? 0 : 8);

  const masterHourlyRate = typeof input.masterHourlyRate === 'number' && !isNaN(input.masterHourlyRate) 
    ? Math.max(0, input.masterHourlyRate) 
    : (input.masterHourlyRate === 0 ? 0 : 65);

  let defaultSetupFee = 2000;
  if (input.selectedPackage === 'meisterbetrieb6000') defaultSetupFee = 6000;
  else if (input.selectedPackage === 'audit500') defaultSetupFee = 2000;
  else if (input.selectedPackage === 'retainer200') defaultSetupFee = 200;

  const rawFee = input.setupFee ?? input.projectFee ?? defaultSetupFee;
  const setupFee = typeof rawFee === 'number' && !isNaN(rawFee) && rawFee >= 0 
    ? rawFee 
    : defaultSetupFee;

  const region = (input.region || input.subsidyRegion || 'NDS').toUpperCase();

  // 1. Schattenkosten-Formeln
  // Wöchentlicher Zeitverlust * 4.33 = Monatlicher Zeitverlust
  const monthlyWastedHours = Number((weeklyWastedHours * 4.33).toFixed(1));
  const yearlyWastedHours = Math.round(weeklyWastedHours * 52);

  // Monatliche Schattenkosten = Math.round(weekly * 4.33 * rate)
  const monthlyShadowCost = Math.round(weeklyWastedHours * 4.33 * masterHourlyRate);
  // Jährliche Schattenkosten = monthlyShadowCost * 12
  const yearlyShadowCost = monthlyShadowCost * 12;

  // 2. Ersparnis durch 90% Automatisierungsquote
  const automationEfficiency = 0.90;
  const savedHoursPerMonth = Math.round(monthlyWastedHours * automationEfficiency);
  const savedHoursPerYear = Math.round(yearlyWastedHours * automationEfficiency);
  const monthlySavings = Math.round(monthlyShadowCost * automationEfficiency);
  const yearlySavings = Math.round(yearlyShadowCost * automationEfficiency);

  // 3. Fördermittel-Berechnung
  let subsidyRate = 0.50; // Standard: 50% Zuschuss
  let subsidyProgramName = 'Digitalbonus Niedersachsen (NBank 50% Zuschuss)';

  if (region === 'LSA') {
    subsidyRate = 0.50;
    subsidyProgramName = 'Digital Innovation / Creativity Sachsen-Anhalt (IB LSA 50% Zuschuss)';
  } else if (region === 'TH') {
    subsidyRate = 0.50;
    subsidyProgramName = 'Digitalbonus Thüringen (TAB 50% Zuschuss)';
  } else if (region === 'BUND') {
    subsidyRate = 0.50;
    subsidyProgramName = 'go-digital Bundesförderung (BMWE 50% Zuschuss)';
  } else if (region === 'NONE') {
    subsidyRate = 0.0;
    subsidyProgramName = 'Keine staatliche Förderung gewählt (0%)';
  }

  const subsidyAmount = Math.round(setupFee * subsidyRate);
  
  // 100% Anrechnung der 500 € Audit-Gebühr auf Stufe 2
  const auditCredit = 500;
  const effectiveNetInvestment = Math.max(0, setupFee - subsidyAmount - auditCredit);

  // Amortisationszeit in Monaten & Tagen
  let amortizationMonths = 0;
  let amortizationDays = 0;
  if (monthlySavings > 0) {
    amortizationMonths = Number((effectiveNetInvestment / monthlySavings).toFixed(2));
    amortizationDays = Math.max(1, Math.round(amortizationMonths * 30));
  }

  return {
    weeklyWastedHours,
    masterHourlyRate,
    setupFee,
    region,
    subsidyRate,
    subsidyProgramName,
    monthlyWastedHours,
    yearlyWastedHours,
    monthlyShadowCost,
    yearlyShadowCost,
    savedHoursPerMonth,
    savedHoursPerYear,
    monthlySavings,
    yearlySavings,
    subsidyAmount,
    auditCredit,
    effectiveNetInvestment,
    amortizationMonths,
    amortizationDays
  };
}

/**
 * Erstellt das professionelle Vektor-PDF für den 500 € Büro-Stress-Test & ROI-Report.
 * 
 * @param {Object} [auditData={}]
 * @param {string} [auditData.companyName='Handwerksbetrieb']
 * @param {string} [auditData.contactPerson='Geschäftsführung']
 * @param {string} [auditData.industry='Handwerk & Mittelstand']
 * @param {string} [auditData.currentBottleneck='Zettelwirtschaft, Büro-Sonntage & Rechnungsverzug']
 * @param {number} [auditData.weeklyWastedHours=8]
 * @param {number} [auditData.masterHourlyRate=65]
 * @param {number} [auditData.setupFee=2000]
 * @param {string} [auditData.region='NDS']
 * @param {string} [auditData.selectedPackage='standardSetup2000']
 * @param {Array} [auditData.painPoints]
 * @param {Object} [options={ saveToFile: true }]
 * @param {boolean} [options.saveToFile=true]
 * @param {string} [options.filename]
 * @returns {Promise<jsPDF>}
 */
export async function generateStressTestPDF(auditData = {}, options = { saveToFile: true }) {
  const metrics = calculateAuditMetrics(auditData);
  const companyName = auditData.companyName || auditData.company || 'Handwerksbetrieb Harz';
  const contactPerson = auditData.contactPerson || 'Geschäftsleitung / Inhaber';
  const industry = auditData.industry || 'Handwerk & Mittelstand';
  const currentBottleneck = auditData.currentBottleneck || auditData.taskName || 'Zettelwirtschaft, unleserliche Regieberichte & Büro-Sonntage';

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 16;
  const contentWidth = pageWidth - (marginX * 2); // 178 mm

  // Farbschema KMU Service Harz
  const COLOR_PRIMARY = [124, 58, 237];      // #7c3aed Purple
  const COLOR_PRIMARY_DARK = [30, 27, 75];   // #1e1b4b Dark Violet
  const COLOR_ACCENT_RED = [220, 38, 38];    // #dc2626 Warning Red
  const COLOR_RED_BG = [254, 242, 242];      // #fef2f2 Light Red
  const COLOR_RED_BORDER = [252, 165, 165];  // #fca5a5 Red Border
  const COLOR_ACCENT_GREEN = [16, 185, 129]; // #10b981 Emerald
  const COLOR_GREEN_BG = [236, 253, 245];    // #ecfdf5 Light Green
  const COLOR_GREEN_BORDER = [110, 231, 183];// #6ee7b7 Green Border
  const COLOR_GRAY_BG = [248, 250, 252];     // #f8fafc Light Slate
  const COLOR_GRAY_BORDER = [226, 232, 240]; // #e2e8f0 Slate Border
  const COLOR_TEXT_MAIN = [15, 23, 42];      // #0f172a Deep Slate
  const COLOR_TEXT_MUTED = [100, 116, 139];  // #64748b Muted Slate

  const reportId = `AUD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const reportDate = new Date().toLocaleDateString('de-DE');

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================
  const renderHeader = (pageNum, totalPages) => {
    // Header Banner
    doc.setFillColor(...COLOR_PRIMARY_DARK);
    doc.rect(0, 0, pageWidth, 28, 'F');

    // Akzent-Linie
    doc.setFillColor(...COLOR_PRIMARY);
    doc.rect(0, 28, pageWidth, 2, 'F');

    // Logo & Brand Name
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('KMU SERVICE HARZ', marginX, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(226, 232, 240);
    doc.text('B2B Prozess-Befreiung & Digitalisierung für das Harzer Handwerk', marginX, 18);
    doc.text('Inh. Robin Gornitzka • Am Harz 1 • info@kmuserviceharz.de', marginX, 23);

    // Meta Badge rechts oben
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(196, 181, 253);
    doc.text('500 € BÜRO-STRESS-TEST & AUDIT-REPORT', pageWidth - marginX, 11, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);
    doc.text(`Prüfbericht-Nr: ${reportId}  |  Datum: ${reportDate}`, pageWidth - marginX, 17, { align: 'right' });
    doc.text(`Vertrauliches Prüfdokument (Stufe 1)`, pageWidth - marginX, 23, { align: 'right' });
  };

  const renderFooter = (pageNum, totalPages) => {
    const footerY = pageHeight - 12;
    doc.setDrawColor(...COLOR_GRAY_BORDER);
    doc.setLineWidth(0.3);
    doc.line(marginX, footerY - 3, pageWidth - marginX, footerY - 3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLOR_TEXT_MUTED);
    doc.text('KMU Service Harz • www.kmuserviceharz.de • Tel: 03946 / 907 31 10 • 100% Anrechnung der Auditgebühr auf Stufe 2', marginX, footerY + 1);
    doc.text(`Seite ${pageNum} von ${totalPages}`, pageWidth - marginX, footerY + 1, { align: 'right' });
  };

  // ==========================================
  // SEITE 1: STATUS QUO & ROTE SCHATTENKOSTEN
  // ==========================================
  renderHeader(1, 2);

  let curY = 36;

  // Dokument-Titel & Kunden-Stammdaten Box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...COLOR_TEXT_MAIN);
  doc.text('WIRTSCHAFTLICHKEITS-AUDIT & PROZESS-RÖNTGENBILD', marginX, curY);

  curY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR_TEXT_MUTED);
  doc.text('Individuelle Schwachstellen- und Schattenkosten-Analyse für Meister- und Handwerksbetriebe', marginX, curY);

  curY += 5;

  // Kunden Meta Card
  doc.setFillColor(...COLOR_GRAY_BG);
  doc.setDrawColor(...COLOR_GRAY_BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, curY, contentWidth, 20, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setTextColor(...COLOR_TEXT_MUTED);
  doc.setFont('helvetica', 'bold');
  doc.text('Geprüfter Betrieb:', marginX + 4, curY + 6);
  doc.text('Ansprechpartner:', marginX + 4, curY + 11);
  doc.text('Branche / Gewerk:', marginX + 4, curY + 16);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLOR_TEXT_MAIN);
  doc.text(companyName, marginX + 36, curY + 6);
  doc.text(contactPerson, marginX + 36, curY + 11);
  doc.text(industry, marginX + 36, curY + 16);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLOR_TEXT_MUTED);
  doc.text('Diagnose-Schwerpunkt:', marginX + 90, curY + 6);
  doc.text('Audit-Status:', marginX + 90, curY + 11);
  doc.text('Stufe 2 Anrechnung:', marginX + 90, curY + 16);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLOR_TEXT_MAIN);
  const truncatedBottleneck = currentBottleneck.length > 42 ? currentBottleneck.substring(0, 40) + '...' : currentBottleneck;
  doc.text(truncatedBottleneck, marginX + 126, curY + 6);
  doc.setTextColor(16, 185, 129);
  doc.setFont('helvetica', 'bold');
  doc.text('500 € Stresstest abgeschlossen', marginX + 126, curY + 11);
  doc.text('100 % voll anrechenbar (500 €)', marginX + 126, curY + 16);

  curY += 25;

  // ==========================================
  // TEIL 1: PROZESS-RÖNTGENBILD STATUS QUO
  // ==========================================
  doc.setFillColor(...COLOR_PRIMARY_DARK);
  doc.rect(marginX, curY, 3.5, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_TEXT_MAIN);
  doc.text('TEIL 1: PROZESS-RÖNTGENBILD STATUS QUO (IST-ABLAUF)', marginX + 6, curY + 5.5);

  curY += 10;

  // 4 Prozess-Stationen mit Pfeilen / Boxen
  const stationWidth = 41;
  const stationHeight = 32;
  const gap = 4.5;

  const stations = [
    {
      num: '1',
      title: 'Baustelle & Bulli',
      icon: '[1]',
      text1: 'Unleserliche Notizen',
      text2: 'WhatsApp-Audios',
      text3: 'Verlorene Belege'
    },
    {
      num: '2',
      title: 'Büro-Sonntag',
      icon: '[2]',
      text1: 'Manuelles Abtippen',
      text2: 'Excel-Zettelwirtschaft',
      text3: '8+ Std. Admin-Verlust'
    },
    {
      num: '3',
      title: 'Word-Rechnung',
      icon: '[3]',
      text1: 'Alte Vorlage kopieren',
      text2: 'Zahlendreher-Risiko',
      text3: 'Kein E-Rechnungs-XML'
    },
    {
      num: '4',
      title: 'Pendelordner',
      icon: '[4]',
      text1: 'Post/Schuhkarton',
      text2: 'Kanzlei-Rückfragen',
      text3: 'Monate Verzug'
    }
  ];

  stations.forEach((st, idx) => {
    const boxX = marginX + (idx * (stationWidth + gap));

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.roundedRect(boxX, curY, stationWidth, stationHeight, 1.5, 1.5, 'FD');

    // Station Header
    doc.setFillColor(...COLOR_PRIMARY);
    doc.roundedRect(boxX, curY, stationWidth, 6.5, 1.5, 1.5, 'F');
    doc.rect(boxX, curY + 3, stationWidth, 3.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`Station ${st.num}: ${st.title}`, boxX + (stationWidth / 2), curY + 4.5, { align: 'center' });

    // Station Bullet points
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...COLOR_TEXT_MAIN);
    doc.text(`• ${st.text1}`, boxX + 2.5, curY + 12);
    doc.text(`• ${st.text2}`, boxX + 2.5, curY + 18);
    doc.setTextColor(...COLOR_ACCENT_RED);
    doc.setFont('helvetica', 'bold');
    doc.text(`• ${st.text3}`, boxX + 2.5, curY + 24);

    // Pfeil zur nächsten Box
    if (idx < 3) {
      const arrowX = boxX + stationWidth + (gap / 2);
      const arrowY = curY + (stationHeight / 2);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...COLOR_PRIMARY);
      doc.text('>', arrowX, arrowY + 1, { align: 'center' });
    }
  });

  curY += stationHeight + 6;

  // Schwachstellen-Zusammenfassung
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(...COLOR_RED_BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, curY, contentWidth, 14, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLOR_ACCENT_RED);
  doc.text('DIAGNOSTIZIERTE SYSTEMBRÜCHE IM IST-ZUSTAND:', marginX + 3, curY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLOR_TEXT_MAIN);
  doc.text('1. Mindestens 3 Medienbrüche (Papier -> Excel -> Word -> Post) verhindern Skalierung und verursachen Suchzeiten.', marginX + 3, curY + 9.5);
  doc.text('2. Fehlende GoBD- & E-Rechnungs-Compliance (ZUGFeRD / XRechnung Pflicht für Handwerk ab 2025).', marginX + 3, curY + 13);

  curY += 19;

  // ==========================================
  // TEIL 2: ROTE SCHATTENKOSTEN-BERECHNUNG
  // ==========================================
  doc.setFillColor(...COLOR_ACCENT_RED);
  doc.rect(marginX, curY, 3.5, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_ACCENT_RED);
  doc.text('TEIL 2: ROTE SCHATTENKOSTEN-BERECHNUNG IN EURO', marginX + 6, curY + 5.5);

  curY += 9;

  // Rote Schattenkosten Highlight Box
  doc.setFillColor(...COLOR_RED_BG);
  doc.setDrawColor(...COLOR_ACCENT_RED);
  doc.setLineWidth(0.6);
  doc.roundedRect(marginX, curY, contentWidth, 48, 2, 2, 'FD');

  // Alarm Banner
  doc.setFillColor(...COLOR_ACCENT_RED);
  doc.roundedRect(marginX + 2, curY + 2, contentWidth - 4, 10, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    `ACHTUNG: IHR BETRIEB VERBRENNT JÄHRLICH CA. ${metrics.yearlyShadowCost.toLocaleString('de-DE')} € AN SCHATTENKOSTEN`,
    marginX + (contentWidth / 2),
    curY + 8.5,
    { align: 'center' }
  );

  // Detail-Aufschlüsselung Tabelle
  const tableY = curY + 16;
  doc.setFontSize(8.5);
  doc.setTextColor(...COLOR_TEXT_MAIN);

  doc.setFont('helvetica', 'normal');
  doc.text('Wöchentlicher Zeitfresser im Büro:', marginX + 6, tableY);
  doc.text('Kalkulatorischer Meisterstundensatz:', marginX + 6, tableY + 6);
  doc.text('Monatlicher Zeitaufwand (Faktor 4,33):', marginX + 6, tableY + 12);
  doc.text('Monatliche Schattenkosten (Verlust):', marginX + 6, tableY + 18);
  doc.text('Jährliche Schattenkosten (Formel: Std/Woche * 4,33 * Satz * 12):', marginX + 6, tableY + 24);

  doc.setFont('helvetica', 'bold');
  doc.text(`${metrics.weeklyWastedHours} Stunden / Woche`, marginX + 115, tableY);
  doc.text(`${metrics.masterHourlyRate},00 € / Stunde`, marginX + 115, tableY + 6);
  doc.text(`${metrics.monthlyWastedHours} Stunden / Monat`, marginX + 115, tableY + 12);
  doc.setTextColor(...COLOR_ACCENT_RED);
  doc.text(`${metrics.monthlyShadowCost.toLocaleString('de-DE')} € / Monat`, marginX + 115, tableY + 18);
  doc.setFontSize(10.5);
  doc.text(`${metrics.yearlyShadowCost.toLocaleString('de-DE')} € / Jahr`, marginX + 115, tableY + 25);

  curY += 53;

  // Kern-Erkenntnis Callout Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...COLOR_GRAY_BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, curY, contentWidth, 18, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLOR_PRIMARY);
  doc.text('FAZIT DER DIAGNOSE & OPPORTUNITÄTSKOSTEN:', marginX + 4, curY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLOR_TEXT_MAIN);
  doc.text(`• ${metrics.yearlyWastedHours} Stunden unbezahlte Meisterzeit werden jährlich für Ablage, Excel und Rechnungen geopfert.`, marginX + 4, curY + 9.5);
  doc.text(`• Diese Zeit fehlt auf der Baustelle für abrechenbare Kundenaufträge oder für die Familie am Wochenende.`, marginX + 4, curY + 14);

  renderFooter(1, 2);

  // ==========================================
  // SEITE 2: SOLL-ROADMAP & FÖRDER-TURBO
  // ==========================================
  doc.addPage();
  renderHeader(2, 2);

  curY = 36;

  // ==========================================
  // TEIL 3: SCHLÜSSELFERTIGE SOLL-ROADMAP
  // ==========================================
  doc.setFillColor(...COLOR_PRIMARY);
  doc.rect(marginX, curY, 3.5, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_TEXT_MAIN);
  doc.text('TEIL 3: SCHLÜSSELFERTIGE SOLL-ROADMAP (MAKE / LEXOFFICE / DATEV)', marginX + 6, curY + 5.5);

  curY += 10;

  const phases = [
    {
      badge: 'Phase 1 (Tag 1–3)',
      title: 'WhatsApp-Belegeingang & Postfach-Parser',
      desc: 'Mobile Belegerfassung per Foto direkt von der Baustelle. Automatischer Mail-Scan aller Lieferanten-Rechnungen. Keine Zettel mehr im Bulli.'
    },
    {
      badge: 'Phase 2 (Tag 4–7)',
      title: 'Make.com Middleware & KI-OCR Erkennung',
      desc: 'GPT-4o Vision extrahiert Beträge, Lieferant, USt-Sätze & IBAN fehlerfrei in Sekunden. Vollautomatische Validierung ohne Tipparbeit.'
    },
    {
      badge: 'Phase 3 (Tag 8–11)',
      title: 'Lexware Office Vorkontierung & DATEV Datenservice',
      desc: 'Automatische Zuordnung von Buchungskonten, GoBD-konformes Cloud-Archiv und monatlicher 1-Klick DATEV-Export für die Steuerkanzlei.'
    },
    {
      badge: 'Phase 4 (Tag 12–14)',
      title: 'GoBD-Verfahrensdokumentation & Team-Rollout',
      desc: '5-Minuten Handwerker-Leitfaden für Monteure, Übergabe der Verfahrensdokumentation und Start des 24/7 Digitalen Hausmeisters (AaaS).'
    }
  ];

  phases.forEach((ph, idx) => {
    doc.setFillColor(...COLOR_GRAY_BG);
    doc.setDrawColor(...COLOR_GRAY_BORDER);
    doc.setLineWidth(0.3);
    doc.roundedRect(marginX, curY, contentWidth, 14.5, 1.5, 1.5, 'FD');

    // Phasen Badge
    doc.setFillColor(...COLOR_PRIMARY);
    doc.roundedRect(marginX + 2.5, curY + 2.5, 34, 5.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text(ph.badge, marginX + 19.5, curY + 6.2, { align: 'center' });

    // Titel
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLOR_TEXT_MAIN);
    doc.text(ph.title, marginX + 40, curY + 6.2);

    // Beschreibung
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(...COLOR_TEXT_MUTED);
    doc.text(ph.desc, marginX + 4, curY + 11.5);

    curY += 16.5;
  });

  curY += 2;

  // ==========================================
  // TEIL 4: FÖRDERMITTEL-INDIKATION & AMORTISATION
  // ==========================================
  doc.setFillColor(...COLOR_ACCENT_GREEN);
  doc.rect(marginX, curY, 3.5, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_TEXT_MAIN);
  doc.text('TEIL 4: FÖRDERMITTEL-INDIKATION & AMORTISATIONS-TURBO', marginX + 6, curY + 5.5);

  curY += 9;

  // Grüne Kalkulations-Box
  doc.setFillColor(...COLOR_GREEN_BG);
  doc.setDrawColor(...COLOR_ACCENT_GREEN);
  doc.setLineWidth(0.6);
  doc.roundedRect(marginX, curY, contentWidth, 54, 2, 2, 'FD');

  // Header Banner
  doc.setFillColor(...COLOR_ACCENT_GREEN);
  doc.roundedRect(marginX + 2, curY + 2, contentWidth - 4, 8, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    `WIRTSCHAFTLICHKEIT: AMORTISATION IN CA. ${metrics.amortizationMonths} MONATEN (${metrics.amortizationDays} TAGEN)`,
    marginX + (contentWidth / 2),
    curY + 7,
    { align: 'center' }
  );

  const fTableY = curY + 15;
  doc.setFontSize(8);
  doc.setTextColor(...COLOR_TEXT_MAIN);

  doc.setFont('helvetica', 'normal');
  doc.text('1. Setup-Investition Stufe 2 (Schlüsselfertig):', marginX + 6, fTableY);
  doc.text(`2. Staatlicher Förderzuschuss (${metrics.region} ${metrics.subsidyRate * 100}%):`, marginX + 6, fTableY + 5.5);
  doc.text('3. 100% Audit-Gutschrift (500 € Büro-Stress-Test voll angerechnet):', marginX + 6, fTableY + 11);

  doc.setFont('helvetica', 'bold');
  doc.text(`${metrics.setupFee.toLocaleString('de-DE')} €`, marginX + 130, fTableY);
  doc.setTextColor(16, 124, 65);
  doc.text(`- ${metrics.subsidyAmount.toLocaleString('de-DE')} €`, marginX + 130, fTableY + 5.5);
  doc.text(`- ${metrics.auditCredit.toLocaleString('de-DE')} €`, marginX + 130, fTableY + 11);

  // Trennlinie
  doc.setDrawColor(...COLOR_GREEN_BORDER);
  doc.line(marginX + 6, fTableY + 14, marginX + contentWidth - 6, fTableY + 14);

  // Netto-Restinvestition & ROI
  doc.setTextColor(...COLOR_TEXT_MAIN);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Effektive Netto-Restinvestition:', marginX + 6, fTableY + 19);
  doc.setTextColor(6, 95, 70);
  doc.setFontSize(10);
  doc.text(`${metrics.effectiveNetInvestment.toLocaleString('de-DE')} €`, marginX + 130, fTableY + 19);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLOR_TEXT_MAIN);
  doc.text(`Erwartete Ersparnis durch 90% Automatisierung:`, marginX + 6, fTableY + 25);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 124, 65);
  doc.text(`~ ${metrics.monthlySavings.toLocaleString('de-DE')} € / Monat  (~ ${metrics.yearlySavings.toLocaleString('de-DE')} € / Jahr)`, marginX + 75, fTableY + 25);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(6, 95, 70);
  doc.text(`🚀 Amortisationszeit der Investition:`, marginX + 6, fTableY + 31);
  doc.text(`ca. ${metrics.amortizationMonths} Monate (< 2,5 Monate)`, marginX + 130, fTableY + 31);

  curY += 58;

  // Fördermittel & 100% Anrechnungs-Hinweis
  doc.setFillColor(...COLOR_GRAY_BG);
  doc.setDrawColor(...COLOR_GRAY_BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, curY, contentWidth, 17, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLOR_PRIMARY);
  doc.text('FÖRDERPROGRAMME IM HARZ & 100% ANRECHNUNGS-GARANTIE:', marginX + 3, curY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...COLOR_TEXT_MAIN);
  doc.text(`• ${metrics.subsidyProgramName} unterstützt die Digitalisierung mit bis zu 50% nicht rückzahlbarem Zuschuss.`, marginX + 3, curY + 8.5);
  doc.text(`• 100% Audit-Garantie: Die 500 € Prüfgebühr wird bei Beauftragung von Stufe 2 vollständig angerechnet (Netto-Risiko = 0 €).`, marginX + 3, curY + 12.5);

  curY += 21;

  // ==========================================
  // SIGNATUR- & AUFTRAGSERTEILUNGS-BLOCK
  // ==========================================
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...COLOR_GRAY_BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, curY, contentWidth, 23, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLOR_TEXT_MAIN);
  doc.text('FREIGABE & START STUFE 2 (SCHLÜSSELFERTIGE PROZESS-BEFREIUNG):', marginX + 4, curY + 5);

  // Unterschriftenlinien
  const sigY = curY + 17;
  const colWidth = 75;

  doc.setDrawColor(148, 163, 184);
  doc.line(marginX + 6, sigY, marginX + 6 + colWidth, sigY);
  doc.line(marginX + 95, sigY, marginX + 95 + colWidth, sigY);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLOR_TEXT_MUTED);
  doc.text('Ort, Datum & Unterschrift Auftraggeber (Handwerksmeister)', marginX + 6, sigY + 4);
  doc.text('Robin Gornitzka, KMU Service Harz', marginX + 95, sigY + 4);

  renderFooter(2, 2);

  // ==========================================
  // EXPORT / DOWNLOAD
  // ==========================================
  const sanitizedCompany = companyName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const defaultFilename = `KMU_StressTest_500EUR_${sanitizedCompany}_${new Date().toISOString().substring(0, 10)}.pdf`;
  const exportFilename = options.filename || defaultFilename;

  if (options.saveToFile !== false && typeof doc.save === 'function') {
    doc.save(exportFilename);
  }

  return doc;
}

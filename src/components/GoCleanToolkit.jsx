import React, { useState } from 'react';
import {
  Sparkles,
  Calculator,
  FileText,
  CheckCircle2,
  Star,
  Copy,
  Check,
  Building2,
  HardHat,
  Stethoscope,
  Send,
  Printer,
  ChevronRight,
  ShieldCheck,
  Clock,
  Euro,
  Layers,
  PhoneCall,
  ExternalLink
} from 'lucide-react';

export const GoCleanToolkit = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' | 'leads' | 'sop' | 'reviews'
  const [copiedId, setCopiedId] = useState(null);

  // --- TAB 1: KALKULATOR STATE ---
  const [serviceType, setServiceType] = useState('unterhalt'); // 'unterhalt' | 'treppenhaus' | 'glas' | 'bau' | 'winter'
  const [areaSqm, setAreaSqm] = useState(350);
  const [frequency, setFrequency] = useState('2x_week'); // 'once' | '1x_week' | '2x_week' | '3x_week' | 'daily' | 'monthly'
  const [hourlyRate, setHourlyRate] = useState(38);
  const [materialPercent, setMaterialPercent] = useState(8);
  const [travelFee, setTravelFee] = useState(15);
  const [clientName, setClientName] = useState('Muster-Gewerbe GmbH');
  const [clientAddress, setClientAddress] = useState('Marktplatz 1, 38640 Goslar');
  const [cleaningDetails, setCleaningDetails] = useState('Büroflächen, Konferenzräume, 2x WC-Anlagen, Kaffeeküche');

  // Leistungswerte (m² pro Stunde Richtwert)
  const speedStandards = {
    unterhalt: 200, // 200 m² / h
    treppenhaus: 140, // 140 m² / h
    glas: 90, // 90 m² / h
    bau: 55, // 55 m² / h
    winter: 350 // 350 m² / h
  };

  const currentSpeed = speedStandards[serviceType] || 150;
  const hoursPerTurnus = Math.max(0.5, Number((areaSqm / currentSpeed).toFixed(2)));

  // Turnus-Faktor für Monatskalkulation (4.33 Wochen pro Monat)
  const turnusMultipliers = {
    once: 1,
    '1x_week': 4.33,
    '2x_week': 8.66,
    '3x_week': 13.0,
    daily: 21.65,
    monthly: 1
  };

  const monthlyTurnusCount = turnusMultipliers[frequency] || 1;
  const isRecurring = frequency !== 'once';

  const turnusNettoLabor = hoursPerTurnus * hourlyRate;
  const turnusMaterial = turnusNettoLabor * (materialPercent / 100);
  const turnusNettoTotal = turnusNettoLabor + turnusMaterial + travelFee;

  const monthlyNettoTotal = isRecurring ? turnusNettoTotal * monthlyTurnusCount : turnusNettoTotal;
  const monthlyVat = monthlyNettoTotal * 0.19;
  const monthlyBruttoTotal = monthlyNettoTotal + monthlyVat;

  const sqmPriceNetto = areaSqm > 0 ? (turnusNettoTotal / areaSqm).toFixed(2) : '0.00';

  // --- TAB 2: AKQUISE STATE ---
  const [selectedAkquiseType, setSelectedAkquiseType] = useState('hausverwaltung');
  const [akquiseTargetCompany, setAkquiseTargetCompany] = useState('Harz-Immobilien & Hausverwaltung');
  const [akquiseContactPerson, setAkquiseContactPerson] = useState('Frau Schneider');
  const [akquiseCity, setAkquiseCity] = useState('Goslar');

  // --- TAB 3: SOP & ABNAHME STATE ---
  const [sopChecks, setSopChecks] = useState({
    arrivalPhoto: true,
    trashEmptied: true,
    surfacesDusted: true,
    sanitaryDisinfected: true,
    floorsMopped: true,
    departurePhoto: true,
    windowsInspected: false,
    doorsLocked: true
  });
  const [inspectorName, setInspectorName] = useState('Christian Gornitzka');
  const [customerSignName, setCustomerSignName] = useState('Dr. K. Schmidt');
  const [signatureSigned, setSignatureSigned] = useState(false);

  // --- TAB 4: BEWERTUNGS-BOOSTER STATE ---
  const [reviewClientName, setReviewClientName] = useState('Herr Müller');
  const [reviewServiceGiven, setReviewServiceGiven] = useState('Glas- und Fassadenreinigung');
  const [googleReviewLink, setGoogleReviewLink] = useState('https://g.page/r/gocleanharz/review');

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Generierter B2B-Angebotstext
  const generatedOfferText = `ANGEBOT FÜR GEBÄUDEREINIGUNG & OBJEKTPFLEGE
--------------------------------------------------
Auftraggeber: ${clientName}
Objektadresse: ${clientAddress}
Ausführender Betrieb: GoClean Harz – Inh. Christian Gornitzka

Leistungsbeschreibung:
• Art der Leistung: ${
    serviceType === 'unterhalt' ? 'Gewerbliche Unterhaltsreinigung' :
    serviceType === 'treppenhaus' ? 'Treppenhaus- & Gemeinschaftsflächenreinigung' :
    serviceType === 'glas' ? 'Professionelle Glas- & Rahmenreinigung' :
    serviceType === 'bau' ? 'Bau-End- & Feinreinigung (bezugsfertig)' : 'Objektpflege & Winterdienst'
  }
• Reinigungsfläche: ca. ${areaSqm} m²
• Leistungsumfang: ${cleaningDetails}
• Intervall: ${
    frequency === 'once' ? 'Einmalige Ausführung' :
    frequency === '1x_week' ? '1x wöchentlich' :
    frequency === '2x_week' ? '2x wöchentlich' :
    frequency === '3x_week' ? '3x wöchentlich' :
    frequency === 'daily' ? 'Werktäglich (Mo–Fr)' : '1x monatlich'
  }
• Zeitansatz: ca. ${hoursPerTurnus} Stunden pro Turnus

Kalkulation & Vergütung:
• Einzelpreis pro Turnus: ${turnusNettoTotal.toFixed(2)} € netto (inkl. umweltfreundlicher Profi-Reinigungschemie)
${isRecurring ? `• Monatliche Pauschalvergütung: ${monthlyNettoTotal.toFixed(2)} € netto (${monthlyBruttoTotal.toFixed(2)} € inkl. 19% MwSt.)` : `• Gesamtvergütung: ${monthlyNettoTotal.toFixed(2)} € netto (${monthlyBruttoTotal.toFixed(2)} € inkl. 19% MwSt.)`}

Besondere Qualitätsgarantie:
✓ 4-Farben-Hygienesystem (keine Keimverschleppung)
✓ Lückenloser digitaler Leistungsnachweis per Fotoprotokoll
✓ Feste, geschulte Reinigungskräfte mit Haftpflichtschutz

Zahlungsbedingungen: 14 Tage netto nach Rechnungserhalt.
Gültigkeit des Angebots: 30 Tage ab Ausstellungsdatum.

Wir freuen uns auf die Zusammenarbeit!
GoClean Harz | Mobil: 0170-XXXXXXX | info@gocleanharz.de`;

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl text-slate-100 mb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>VIP-Modul für Christian Gornitzka</span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🧼 GoClean Harz – Wachstums- & Produktivitäts-Toolkit
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Blitz-Angebote in 3 Minuten, schusssichere B2B-Akquise & fehlerfreie Baustellen-Dokumentation.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/goclean_wachstumsmappe.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-sm font-medium transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Präsentations-Mappe öffnen</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
          <a
            href="/pitch_goclean.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-sm font-medium transition flex items-center gap-2"
          >
            <span>VIP-Pitch Deck</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-sm transition"
            >
              ✕ Schließen
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800 relative z-10">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition ${
            activeTab === 'calculator'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>1. Blitz-Kalkulator</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition ${
            activeTab === 'leads'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>2. B2B-Akquise Mappen</span>
        </button>

        <button
          onClick={() => setActiveTab('sop')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition ${
            activeTab === 'sop'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>3. Baustellen-SOP & Abnahme</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition ${
            activeTab === 'reviews'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>4. 5★ Bewertungs-Booster</span>
        </button>
      </div>

      {/* --- TAB 1: BLITZ-KALKULATOR --- */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          {/* Eingabe-Panel */}
          <div className="lg:col-span-6 bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Objekt- & Leistungsparameter</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Leistungsart auswählen
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'unterhalt', label: '🏢 Unterhalt/Büro', speed: 200 },
                  { id: 'treppenhaus', label: '🚪 Treppenhaus', speed: 140 },
                  { id: 'glas', label: '🪟 Glasreinigung', speed: 90 },
                  { id: 'bau', label: '🏗️ Bau-Endreinigung', speed: 55 },
                  { id: 'winter', label: '❄️ Winter / Grün', speed: 350 }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setServiceType(s.id);
                      if (s.id === 'bau') setHourlyRate(48);
                      else if (s.id === 'glas') setHourlyRate(44);
                      else if (s.id === 'unterhalt') setHourlyRate(38);
                    }}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-left transition ${
                      serviceType === s.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Fläche in m²
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={areaSqm}
                    onChange={(e) => setAreaSqm(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    placeholder="350"
                  />
                  <span className="absolute right-3 top-2 text-xs text-slate-500">m²</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Reinigungs-Turnus
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="once">Einmaliger Auftrag</option>
                  <option value="1x_week">1x pro Woche</option>
                  <option value="2x_week">2x pro Woche (Standard)</option>
                  <option value="3x_week">3x pro Woche</option>
                  <option value="daily">Werktäglich (Mo–Fr)</option>
                  <option value="monthly">1x im Monat</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Stundensatz (€)
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Material (%)
                </label>
                <input
                  type="number"
                  value={materialPercent}
                  onChange={(e) => setMaterialPercent(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Anfahrt/Rüst (€)
                </label>
                <input
                  type="number"
                  value={travelFee}
                  onChange={(e) => setTravelFee(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Kundenname / Firma"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder="Adresse des Objekts"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                value={cleaningDetails}
                onChange={(e) => setCleaningDetails(e.target.value)}
                placeholder="Besondere Details (z.B. 4 Büros, Sanitär, Flur)"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Live-Kalkulationsergebnis & Angebotstext */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {/* KPI Kacheln */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
                <span className="text-[11px] text-slate-400 font-medium block">Zeit / Einsatz</span>
                <span className="text-lg font-bold text-white mt-0.5 block flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {hoursPerTurnus} h
                </span>
                <span className="text-[10px] text-slate-500">~{Math.round(hoursPerTurnus * 60)} Min.</span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
                <span className="text-[11px] text-slate-400 font-medium block">Preis / Turnus</span>
                <span className="text-lg font-bold text-emerald-400 mt-0.5 block">
                  {turnusNettoTotal.toFixed(2)} €
                </span>
                <span className="text-[10px] text-slate-500">{sqmPriceNetto} € / m²</span>
              </div>

              <div className="bg-slate-950/80 border border-emerald-500/40 rounded-xl p-3 text-center col-span-2 sm:col-span-2 bg-gradient-to-br from-emerald-950/40 to-slate-950">
                <span className="text-[11px] text-emerald-300 font-semibold block">
                  {isRecurring ? 'Monatspauschale Netto' : 'Gesamtbetrag Netto'}
                </span>
                <span className="text-2xl font-extrabold text-white mt-0.5 block">
                  {monthlyNettoTotal.toFixed(2)} €
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  {monthlyBruttoTotal.toFixed(2)} € brutto (inkl. 19% MwSt.)
                </span>
              </div>
            </div>

            {/* Live-Angebotstext Box */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Fertiger B2B-Angebotstext</span>
                </div>
                <button
                  onClick={() => copyToClipboard(generatedOfferText, 'offer')}
                  className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg transition flex items-center gap-1 font-medium"
                >
                  {copiedId === 'offer' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'offer' ? 'Kopiert!' : 'Text kopieren'}</span>
                </button>
              </div>

              <pre className="text-[11px] leading-relaxed text-slate-300 font-mono bg-slate-900/90 p-3 rounded-lg border border-slate-800/80 overflow-y-auto max-h-56 whitespace-pre-wrap">
                {generatedOfferText}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: B2B-AKQUISE MAPPEN --- */}
      {activeTab === 'leads' && (
        <div className="space-y-5 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                id: 'hausverwaltung',
                icon: Building2,
                title: 'Hausverwaltungen & WEGs',
                desc: 'Treppenhäuser & Dauerpflege (5–30 Objekte pro Kunde)'
              },
              {
                id: 'bau',
                icon: HardHat,
                title: 'Bauträger & Sanierer',
                desc: 'Bau-Endreinigung & Feinreinigung (Hohe Margen)'
              },
              {
                id: 'praxis',
                icon: Stethoscope,
                title: 'Praxen & Kanzleien',
                desc: 'Hygienische Unterhaltsreinigung (Feste Monatspauschalen)'
              }
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedAkquiseType(t.id)}
                  className={`p-4 rounded-xl border text-left transition flex items-start gap-3 ${
                    selectedAkquiseType === t.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg ${selectedAkquiseType === t.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{t.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Vorlagen-Anpassung & Vorschau */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Empfänger Firma</label>
                <input
                  type="text"
                  value={akquiseTargetCompany}
                  onChange={(e) => setAkquiseTargetCompany(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Ansprechpartner</label>
                <input
                  type="text"
                  value={akquiseContactPerson}
                  onChange={(e) => setAkquiseContactPerson(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Stadt / Region</label>
                <input
                  type="text"
                  value={akquiseCity}
                  onChange={(e) => setAkquiseCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            {/* Das jeweilige Anschreiben */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  ✉️ Anschreiben-Vorlage zum Sofort-Versand
                </span>
                <button
                  onClick={() => {
                    const text = selectedAkquiseType === 'hausverwaltung'
                      ? `Sehr geehrte/r ${akquiseContactPerson} der ${akquiseTargetCompany},\n\nals Verwalter kennen Sie das Problem: Wenn der Treppenhausservice unzuverlässig ist, stehen Mieter und Eigentümer bei Ihnen Schlange.\n\nWir von GoClean Harz entlasten Hausverwaltungen im Raum ${akquiseCity} mit garantiert festen Turnus-Intervallen, lückenlosen Fotoprotokollen und der flexiblen Kombination aus Treppenhausreinigung, Grünpflege und Winterdienst aus einer Hand.\n\nGerne erstellen wir Ihnen für ein Test-Objekt Ihrer Wahl innerhalb von 24 Stunden ein unverbindliches Festpreis-Angebot.\n\nDürfen wir Ihnen nächste Woche bei einer 10-minütigen Objektbegehung zeigen, wie reibungslos Objektpflege sein kann?\n\nBeste Grüße aus Langelsheim,\nChristian Gornitzka | GoClean Harz`
                      : selectedAkquiseType === 'bau'
                      ? `Sehr geehrte/r ${akquiseContactPerson} (${akquiseTargetCompany}),\n\neine verzögerte Bau-Endreinigung gefährdet die fristgerechte Schlüsselübergabe und erzeugt unnötigen Stress.\n\nGoClean Harz sorgt dafür, dass Ihre Neubauten und Sanierungsobjekte in ${akquiseCity} und Umgebung pünktlich zur Bauabnahme makellos glänzen:\n• Baugrobreinigung während der Bauphase\n• Baufein- & Endreinigung (bezugsfertig für Käufer/Mieter)\n• Flexible Wochenendschichten vor kritischen Abnahmen\n\nSenden Sie uns einfach kurz die m²-Zahl oder Grundrisse – Sie erhalten binnen 24 Stunden ein verbindliches Festpreis-Angebot.\n\nHerzliche Grüße,\nChristian Gornitzka | GoClean Harz`
                      : `Sehr geehrte/r ${akquiseContactPerson} (${akquiseTargetCompany}),\n\nin medizinischen und juristischen Räumen sind absolute Diskretion, Hygiene und verlässliche Sauberkeit die Visitenkarte gegenüber Patienten und Mandanten.\n\nGoClean Harz bietet Ihnen im Raum ${akquiseCity} ein maßgeschneidertes Unterhaltsreinigungskonzept:\n• RKI-konformes 4-Farben-Hygienesystem\n• Feste, geprüfte Reinigungskräfte mit Verschwiegenheitserklärung\n• Lautlose Ausführung außerhalb Ihrer Öffnungszeiten\n\nLassen Sie uns bei einer kurzen 10-Minuten-Besichtigung Ihren exakten Hygieneplan abstimmen.\n\nBeste Grüße,\nChristian Gornitzka | GoClean Harz`;
                    copyToClipboard(text, 'akquise');
                  }}
                  className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-lg transition flex items-center gap-1.5 font-medium"
                >
                  {copiedId === 'akquise' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'akquise' ? 'Kopiert!' : 'Anschreiben kopieren'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                {selectedAkquiseType === 'hausverwaltung' && (
                  <>
                    <strong>Betreff: Zuverlässige Treppenhaus- & Objektpflege für Ihre Liegenschaften in {akquiseCity} – GoClean Harz</strong>
                    {'\n\n'}
                    Sehr geehrte/r {akquiseContactPerson} der {akquiseTargetCompany},{'\n\n'}
                    als Verwalter kennen Sie das Problem: Wenn der Treppenhaus- oder Hausmeisterservice unzuverlässig ist, stehen Mieter und Eigentümer bei Ihnen am Telefon.{'\n\n'}
                    Wir von <strong>GoClean Harz</strong> haben uns darauf spezialisiert, Hausverwaltungen im Raum {akquiseCity} und Umgebung genau diesen Frust abzunehmen:{'\n'}
                    • <strong>Feste Reinigungsintervalle</strong> (garantierte Termintreue){'\n'}
                    • <strong>Lückenlose Fotodokumentation</strong> bei jeder Begehung{'\n'}
                    • <strong>Treppenhausreinigung, Grünpflege und Winterdienst</strong> aus einer Hand{'\n\n'}
                    Gerne erstellen wir Ihnen für ein Test-Objekt Ihrer Wahl innerhalb von 24 Stunden ein unverbindliches Festpreis-Angebot.{'\n\n'}
                    Dürfen wir Ihnen nächste Woche bei einer 10-minütigen Objektbegehung zeigen, wie reibungslos Objektpflege funktionieren kann?{'\n\n'}
                    Mit freundlichen Grüßen,{'\n'}
                    <strong>Christian Gornitzka</strong> – Inhaber GoClean Harz
                  </>
                )}

                {selectedAkquiseType === 'bau' && (
                  <>
                    <strong>Betreff: Terminsichere Bau-Endreinigung für Ihre Bauprojekte in {akquiseCity} – GoClean Harz</strong>
                    {'\n\n'}
                    Sehr geehrte/r {akquiseContactPerson} ({akquiseTargetCompany}),{'\n\n'}
                    eine verzögerte Bau-Endreinigung gefährdet die fristgerechte Schlüsselübergabe und kostet Nerven.{'\n\n'}
                    <strong>GoClean Harz</strong> sorgt dafür, dass Ihre Neubauten und Sanierungsobjekte in {akquiseCity} und im gesamten Harzkreis pünktlich zur Bauabnahme makellos glänzen:{'\n'}
                    • <strong>Baugrobreinigung:</strong> Schnelle Beseitigung von Schutt & Folien während der Bauphase{'\n'}
                    • <strong>Baufein- & Endreinigung:</strong> Rückstandsfreie Zementschleier-, Farb- und Feinstaubentfernung{'\n'}
                    • <strong>Express-Einsatzbereitschaft:</strong> Auch an Wochenenden vor Übergabeterminen{'\n\n'}
                    Senden Sie uns einfach kurz die m²-Angaben Ihres aktuellen Objekts – Sie erhalten innerhalb von 24 Stunden ein Festpreis-Angebot.{'\n\n'}
                    Beste Grüße,{'\n'}
                    <strong>Christian Gornitzka</strong> – GoClean Harz
                  </>
                )}

                {selectedAkquiseType === 'praxis' && (
                  <>
                    <strong>Betreff: Höchste Hygienestandards & Diskretion für Ihre Räumlichkeiten in {akquiseCity} – GoClean Harz</strong>
                    {'\n\n'}
                    Sehr geehrte/r {akquiseContactPerson} ({akquiseTargetCompany}),{'\n\n'}
                    in medizinischen und juristischen Räumen sind absolute Diskretion, Hygiene und verlässliche Sauberkeit die Visitenkarte gegenüber Patienten und Mandanten.{'\n\n'}
                    <strong>GoClean Harz</strong> bietet Ihnen ein maßgeschneidertes Unterhaltsreinigungskonzept:{'\n'}
                    • <strong>RKI-konformes 4-Farben-Hygienesystem:</strong> Strikte Trennung der Reinigungstücher{'\n'}
                    • <strong>Geschultes, festes Personal:</strong> Einwandfreies Führungszeugnis & Verschwiegenheit{'\n'}
                    • <strong>Lautlose Ausführung:</strong> Flexibel vor oder nach Ihren Öffnungszeiten{'\n\n'}
                    Lassen Sie uns bei einer kurzen 10-Minuten-Besichtigung Ihren individuellen Hygieneplan abstimmen.{'\n\n'}
                    Herzliche Grüße,{'\n'}
                    <strong>Christian Gornitzka</strong> – GoClean Harz
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: SOP & ABNAHMEPROTOKOLL --- */}
      {activeTab === 'sop' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          {/* Checkliste */}
          <div className="lg:col-span-6 bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Mobile Reinigungs-Checkliste (SOP)</span>
              </h3>
              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Smartphone-Ready
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                { key: 'arrivalPhoto', label: '1. Vorher-Foto aufgenommen (Beweisschutz)' },
                { key: 'trashEmptied', label: '2. Papierkörbe & Mülleimer geleert + neue Beutel' },
                { key: 'surfacesDusted', label: '3. Schreibtische & Oberflächen nebelfeucht entstaubt' },
                { key: 'sanitaryDisinfected', label: '4. Sanitäranlagen nach 4-Farben-System desinfiziert' },
                { key: 'floorsMopped', label: '5. Hartböden gesaugt und nebelfeucht gewischt' },
                { key: 'windowsInspected', label: '6. Griffspuren an Glastüren & Spiegeln entfernt' },
                { key: 'departurePhoto', label: '7. Nachher-Foto als Leistungsnachweis geschossen' },
                { key: 'doorsLocked', label: '8. Fenster geschlossen, Licht aus, Objekt verschlossen' }
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-3 p-2.5 bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 rounded-lg cursor-pointer transition text-xs text-slate-300"
                >
                  <input
                    type="checkbox"
                    checked={sopChecks[item.key]}
                    onChange={(e) => setSopChecks({ ...sopChecks, [item.key]: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-slate-800 border-slate-700"
                  />
                  <span className={sopChecks[item.key] ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Digitales Abnahmeprotokoll */}
          <div className="lg:col-span-6 bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Digitales Abnahmeprotokoll</span>
                </h3>
                <span className="text-[11px] text-slate-400">Rechtssicher vor Ort</span>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Objektleiter / Ausführender</label>
                    <input
                      type="text"
                      value={inspectorName}
                      onChange={(e) => setInspectorName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Kunden-Vertreter</label>
                    <input
                      type="text"
                      value={customerSignName}
                      onChange={(e) => setCustomerSignName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 space-y-2">
                  <p className="font-semibold text-emerald-300">Abnahme-Erklärung:</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    „Die vereinbarten Reinigungs- und Pflegearbeiten wurden am {new Date().toLocaleDateString('de-DE')} ordnungsgemäß und mangelfrei abgenommen. Die Räumlichkeiten wurden in einwandfreiem Zustand übergeben.“
                  </p>
                </div>

                {/* Digitale Signatur-Fläche */}
                <div className="bg-slate-900/90 border border-dashed border-emerald-500/40 rounded-lg p-4 text-center">
                  <span className="text-[11px] text-slate-400 block mb-2">Unterschrift des Auftraggebers auf Smartphone/Tablet:</span>
                  {signatureSigned ? (
                    <div className="py-3 px-4 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-300 font-serif italic text-lg flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>{customerSignName} (Digital quittiert)</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSignatureSigned(true)}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg transition"
                    >
                      ✍️ Jetzt digital unterzeichnen
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-[11px] text-slate-500">GoBD- und DATEV-konform</span>
              <button
                onClick={() => alert(`Abnahmeprotokoll für ${customerSignName} wurde digital archiviert und als Beleg freigegeben.`)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                💾 Protokoll archivieren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: 5-STERNE-BEWERTUNGSBOOSTER --- */}
      {activeTab === 'reviews' && (
        <div className="space-y-5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Bewertungs-Nachricht konfigurieren</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Kundenname</label>
                <input
                  type="text"
                  value={reviewClientName}
                  onChange={(e) => setReviewClientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="Herr Müller"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Durchgeführte Leistung</label>
                <input
                  type="text"
                  value={reviewServiceGiven}
                  onChange={(e) => setReviewServiceGiven(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="Glas- und Fassadenreinigung"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Google-Bewertungslink</label>
                <input
                  type="text"
                  value={googleReviewLink}
                  onChange={(e) => setGoogleReviewLink(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp Nachricht (1-Klick Versand)</span>
                  </span>
                  <button
                    onClick={() => {
                      const text = `Hallo ${reviewClientName}, hier ist Christian von GoClean Harz! 😊 Wir haben die Arbeiten (${reviewServiceGiven}) heute bei Ihnen abgeschlossen. Ist alles zu Ihrer vollsten Zufriedenheit geworden?\n\nFalls ja: Würden Sie uns einen riesigen Gefallen tun und uns eine kurze 5-Sterne-Bewertung auf Google dalassen? Als regionaler Familienbetrieb hilft uns das enorm: ${googleReviewLink}\n\nVielen Dank für Ihr Vertrauen!`;
                      copyToClipboard(text, 'review_wa');
                    }}
                    className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-lg transition flex items-center gap-1.5 font-medium"
                  >
                    {copiedId === 'review_wa' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'review_wa' ? 'Kopiert!' : 'WhatsApp Text kopieren'}</span>
                  </button>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 text-xs text-slate-200 leading-relaxed font-sans space-y-2">
                  <p>
                    Hallo {reviewClientName}, hier ist Christian von <strong>GoClean Harz</strong>! 😊
                  </p>
                  <p>
                    Wir haben die Arbeiten ({reviewServiceGiven}) heute bei Ihnen abgeschlossen. Ist alles zu Ihrer vollsten Zufriedenheit geworden?
                  </p>
                  <p>
                    Falls ja: Würden Sie uns einen riesigen Gefallen tun und uns eine kurze 5-Sterne-Bewertung auf Google dalassen? Als regionaler Familienbetrieb hilft uns das enorm:
                  </p>
                  <p className="text-emerald-400 font-mono text-[11px] underline">
                    {googleReviewLink}
                  </p>
                  <p>Vielen Dank für Ihr Vertrauen!</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-[11px] text-slate-400 flex items-center gap-2">
                <span className="text-amber-400 font-bold">💡 Psychologie-Tipp:</span>
                <span>
                  Sende diese Nachricht maximal 30 Minuten nach Abschluss. Die Begeisterung über den frischen Glanz ist dann am höchsten!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

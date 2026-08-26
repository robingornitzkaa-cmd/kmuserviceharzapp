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
  ExternalLink,
  Eye,
  Maximize2,
  X,
  Play,
  LayoutGrid,
  Brain,
  Rocket,
  Zap
} from 'lucide-react';

export const PRESENTATIONS = [
  {
    id: 'hub',
    title: 'Präsentations-Center (Hub)',
    subtitle: 'Zentrale Übersichtskarte aller Decks',
    slides: '8 Decks',
    badge: 'Zentrale Übersicht',
    badgeColor: 'cyan',
    icon: '🎛️',
    url: '/goclean_praesentationen_hub.html',
    desc: 'Alle 8 Präsentationen auf einer Übersichtsseite mit Direktstart und Beschreibung.',
    category: 'hub'
  },
  {
    id: 'bruder_emotional',
    title: '1. Bruder-Pitch (Emotional)',
    subtitle: '„Marcel, ich hab dir was gebaut."',
    slides: '4 Folien',
    badge: 'Persönlich / Emotional',
    badgeColor: 'cyan',
    icon: '🤝',
    url: '/pitch_bruder_emotional.html',
    desc: 'Lockerer Du-Tonfall von Bruder zu Bruder: Warum ich dir das schenke, das Ende der Büro-Hölle und unser 100% kostenloser VIP-Deal.',
    category: 'pitch'
  },
  {
    id: 'kompakt_ueberblick',
    title: '2. Power-Überblick (3 Min.)',
    subtitle: '„8h Arbeiten. 3h Büro. 0h Feierabend?"',
    slides: '3 Folien',
    badge: 'Ultra-Kompakt (60s)',
    badgeColor: 'amber',
    icon: '⚡',
    url: '/pitch_kompakt_ueberblick.html',
    desc: 'Ultra-schneller Teaser: Problem auf den Punkt gebracht, 6 Module auf einen Blick und 15-Minuten-Kaffee CTA.',
    category: 'pitch'
  },
  {
    id: 'demo_app_features',
    title: '3. App Feature-Walkthrough',
    subtitle: '„Alles was du brauchst. In einer App."',
    slides: '7 Folien',
    badge: 'Live Feature-Demo',
    badgeColor: 'cyan',
    icon: '📱',
    url: '/demo_app_features.html',
    desc: 'Jedes der 7 Module im Detail: Kalkulator, Dashboard, Foto-Checklisten, WhatsApp-Autopilot, Rechnungen/DATEV & Google-Bewertungen.',
    category: 'demo'
  },
  {
    id: 'ki_zukunft',
    title: '4. KI & Zukunfts-Vision',
    subtitle: '„Dein Betrieb. Powered by KI."',
    slides: '5 Folien',
    badge: 'Zukunft & KI',
    badgeColor: 'violet',
    icon: '🧠',
    url: '/pitch_ki_zukunft.html',
    desc: 'KI-Texter für Instagram/Facebook, smarte Routen- & Auslastungsplanung, 24/7 digitaler Assistent und KI-Marktanalyse im Harzkreis.',
    category: 'vision'
  },
  {
    id: 'wachstum_solo',
    title: '5. Solo-Wachstumsplan',
    subtitle: '„Einer. Aber mit der Power von dreien."',
    slides: '6 Folien',
    badge: 'Solo-Strategie',
    badgeColor: 'emerald',
    icon: '🚀',
    url: '/pitch_wachstum_solo.html',
    desc: 'Speziell für Marcel als Einzelkämpfer: Power von 3 Mitarbeitern durch Automatisierung, B2B-Akquise und konkreter 90-Tage-Fahrplan.',
    category: 'growth'
  },
  {
    id: 'professionell',
    title: '6. Business-Pitch',
    subtitle: '„Digital. Effizient. Profitabel."',
    slides: '5 Folien',
    badge: 'B2B / Sachlich',
    badgeColor: 'emerald',
    icon: '📊',
    url: '/pitch_professionell.html',
    desc: 'Sachlicher Ton mit Marktdaten, ROI-Berechnung (11h Zeitersparnis/Woche = +1.500-4.000€ Mehrumsatz) und 3-Stufen-Implementierungsplan.',
    category: 'pitch'
  },
  {
    id: 'wachstumsmappe',
    title: '7. Wachstums- & Akquise-Mappe',
    subtitle: '„Volle Auftragsbücher. Echter Feierabend."',
    slides: '6 Folien',
    badge: 'Wachstums-Suite',
    badgeColor: 'emerald',
    icon: '🏢',
    url: '/goclean_wachstumsmappe.html',
    desc: 'Die umfassende Mappe mit Kalkulations-Tabelle, B2B-Zielgruppen (Hausverwaltungen, Bauträger, Praxen), SOPs und Bewertungs-Booster.',
    category: 'growth'
  },
  {
    id: 'pitch_goclean',
    title: '8. Original VIP-Pitch',
    subtitle: '„Weniger Zettel. Mehr Feierabend."',
    slides: '4 Folien',
    badge: 'Original VIP-Deck',
    badgeColor: 'cyan',
    icon: '⭐',
    url: '/pitch_goclean.html',
    desc: 'Das klassische 4-Folien VIP-Pitchdeck: Idee, Problem, Deal (Marcel VIP #1) und nächster Schritt.',
    category: 'pitch'
  }
];

export const GoCleanToolkit = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' | 'leads' | 'sop' | 'reviews' | 'presentations'
  const [copiedId, setCopiedId] = useState(null);
  const [previewDeck, setPreviewDeck] = useState(null); // presentation object for in-app modal preview
  const [presentationCategory, setPresentationCategory] = useState('all'); // 'all' | 'pitch' | 'demo' | 'growth' | 'vision'

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
    unterhalt: 200,
    treppenhaus: 140,
    glas: 90,
    bau: 55,
    winter: 350
  };

  const currentSpeed = speedStandards[serviceType] || 150;
  const hoursPerTurnus = Math.max(0.5, Number((areaSqm / currentSpeed).toFixed(2)));

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
  const [inspectorName, setInspectorName] = useState('Marcel Gornitzka');
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
Ausführender Betrieb: GoClean Harz – Inh. Marcel Gornitzka

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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      width: '100%',
      color: '#f8fafc',
      fontFamily: 'var(--font-family, sans-serif)'
    }}>
      {/* 1. Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.4) 0%, rgba(15, 23, 42, 0.85) 100%)',
        border: '1px solid rgba(52, 211, 153, 0.35)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#022c22',
                fontWeight: 800,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                padding: '3px 10px',
                borderRadius: '8px'
              }}>
                VIP-Bruder-Offensive
              </span>
              <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                ● GoClean Harz Exklusiv-Suite
              </span>
            </div>

            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', margin: '4px 0' }}>
              🧼 GoClean Harz – Wachstums- & Produktivitäts-Toolkit
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '4px 0 0 0' }}>
              Blitz-Angebote in 3 Minuten, erprobte B2B-Akquise-Mappen & lückenlose Baustellen-Qualität.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('presentations')}
              style={{
                background: activeTab === 'presentations' ? 'linear-gradient(135deg, #38bdf8, #818cf8)' : 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(129, 140, 248, 0.25))',
                color: activeTab === 'presentations' ? '#090d16' : '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.5)',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 0 15px rgba(56, 189, 248, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={15} />
              <span>🎤 Alle 8 Präsentationen</span>
              <span style={{
                background: activeTab === 'presentations' ? '#090d16' : '#38bdf8',
                color: activeTab === 'presentations' ? '#38bdf8' : '#090d16',
                padding: '1px 6px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 800
              }}>8</span>
            </button>

            <a
              href="/goclean_praesentationen_hub.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(56, 189, 248, 0.12)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                padding: '8px 12px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Öffnet die zentrale Hub-Übersichtsseite in neuem Tab"
            >
              <LayoutGrid size={14} />
              <span>Hub</span>
              <ExternalLink size={12} style={{ opacity: 0.7 }} />
            </a>

            <a
              href="/pitch_bruder_emotional.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(52, 211, 153, 0.12)',
                color: '#34d399',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                padding: '8px 12px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Öffnet den emotionalen 4-Folien Bruder-Pitch für Marcel"
            >
              <span>🤝 Bruder-Pitch</span>
              <ExternalLink size={12} style={{ opacity: 0.7 }} />
            </a>

            <a
              href="/pitch_kompakt_ueberblick.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(251, 191, 36, 0.12)',
                color: '#fbbf24',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                padding: '8px 12px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Öffnet den 60-Sekunden Power-Teaser"
            >
              <span>⚡ 60s Teaser</span>
              <ExternalLink size={12} style={{ opacity: 0.7 }} />
            </a>

            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#94a3b8',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                ✕ Schließen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Tab Navigation Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '8px',
        background: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        padding: '6px'
      }}>
        {[
          { id: 'calculator', icon: Calculator, label: '1. Blitz-Kalkulator' },
          { id: 'leads', icon: Building2, label: '2. B2B-Akquise Mappen' },
          { id: 'sop', icon: ShieldCheck, label: '3. Baustellen-SOP & Abnahme' },
          { id: 'reviews', icon: Star, label: '4. 5★ Bewertungs-Booster' },
          { id: 'presentations', icon: Sparkles, label: '5. 🎤 Präsentationen (8 Decks)', highlight: true }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: isActive 
                  ? tab.highlight 
                    ? 'linear-gradient(135deg, #38bdf8, #818cf8)' 
                    : 'linear-gradient(135deg, #10b981, #059669)' 
                  : 'transparent',
                color: isActive ? '#022c22' : tab.highlight ? '#38bdf8' : '#94a3b8',
                boxShadow: isActive 
                  ? tab.highlight 
                    ? '0 4px 15px rgba(56, 189, 248, 0.4)' 
                    : '0 4px 12px rgba(16, 185, 129, 0.3)' 
                  : 'none'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* --- TAB 1: BLITZ-KALKULATOR --- */}
      {activeTab === 'calculator' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start'
        }}>
          {/* Linke Spalte: Eingaben */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
              <Layers size={16} color="#34d399" />
              <span>Objekt- & Leistungsparameter</span>
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>
                Leistungsart auswählen
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px' }}>
                {[
                  { id: 'unterhalt', label: '🏢 Unterhalt/Büro', rate: 38 },
                  { id: 'treppenhaus', label: '🚪 Treppenhaus', rate: 40 },
                  { id: 'glas', label: '🪟 Glasreinigung', rate: 44 },
                  { id: 'bau', label: '🏗️ Bau-Endreinigung', rate: 48 },
                  { id: 'winter', label: '❄️ Winter / Grün', rate: 50 }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setServiceType(s.id);
                      setHourlyRate(s.rate);
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: 'pointer',
                      border: serviceType === s.id ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.08)',
                      background: serviceType === s.id ? 'rgba(52, 211, 153, 0.18)' : 'rgba(30, 41, 59, 0.5)',
                      color: serviceType === s.id ? '#34d399' : '#cbd5e1'
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>
                  Fläche in m²
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={areaSqm}
                    onChange={(e) => setAreaSqm(Number(e.target.value))}
                    style={{
                      width: '100%',
                      background: '#090d16',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      padding: '8px 30px 8px 10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                    placeholder="350"
                  />
                  <span style={{ position: 'absolute', right: '10px', top: '8px', fontSize: '0.75rem', color: '#64748b' }}>m²</span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>
                  Reinigungs-Turnus
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#090d16',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>
                  Stundensatz (€)
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  style={{
                    width: '100%',
                    background: '#090d16',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>
                  Material (%)
                </label>
                <input
                  type="number"
                  value={materialPercent}
                  onChange={(e) => setMaterialPercent(Number(e.target.value))}
                  style={{
                    width: '100%',
                    background: '#090d16',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>
                  Anfahrt (€)
                </label>
                <input
                  type="number"
                  value={travelFee}
                  onChange={(e) => setTravelFee(Number(e.target.value))}
                  style={{
                    width: '100%',
                    background: '#090d16',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Kundenname / Firma"
                style={{
                  width: '100%',
                  background: '#090d16',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  color: '#ffffff',
                  fontSize: '0.8rem'
                }}
              />
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder="Objektadresse (z.B. Goslar)"
                style={{
                  width: '100%',
                  background: '#090d16',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  color: '#ffffff',
                  fontSize: '0.8rem'
                }}
              />
              <input
                type="text"
                value={cleaningDetails}
                onChange={(e) => setCleaningDetails(e.target.value)}
                placeholder="Leistungsdetails (z.B. Büros, Sanitär, Flure)"
                style={{
                  width: '100%',
                  background: '#090d16',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  color: '#ffffff',
                  fontSize: '0.8rem'
                }}
              />
            </div>
          </div>

          {/* Rechte Spalte: KPI Kacheln & Angebotstext */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* KPI Kacheln */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Zeit pro Einsatz</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'block', margin: '2px 0' }}>
                  {hoursPerTurnus} Std.
                </span>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>~{Math.round(hoursPerTurnus * 60)} Min.</span>
              </div>

              <div style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Einzelpreis Turnus</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', display: 'block', margin: '2px 0' }}>
                  {turnusNettoTotal.toFixed(2)} €
                </span>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{sqmPriceNetto} € / m²</span>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.6) 0%, rgba(15, 23, 42, 0.9) 100%)',
                border: '1px solid rgba(52, 211, 153, 0.4)',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
                gridColumn: 'span 2'
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399', display: 'block' }}>
                  {isRecurring ? 'Monatspauschale Netto' : 'Gesamtbetrag Netto'}
                </span>
                <span style={{ fontSize: '1.65rem', fontWeight: 900, color: '#ffffff', display: 'block', margin: '2px 0' }}>
                  {monthlyNettoTotal.toFixed(2)} €
                </span>
                <span style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>
                  {monthlyBruttoTotal.toFixed(2)} € brutto (inkl. 19% MwSt.)
                </span>
              </div>
            </div>

            {/* Generierter Angebotstext */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                  <FileText size={15} color="#34d399" />
                  <span>Fertiger B2B-Angebotstext</span>
                </div>
                <button
                  onClick={() => copyToClipboard(generatedOfferText, 'offer')}
                  style={{
                    background: 'rgba(52, 211, 153, 0.2)',
                    color: '#34d399',
                    border: '1px solid rgba(52, 211, 153, 0.4)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedId === 'offer' ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === 'offer' ? 'Kopiert!' : 'Text kopieren'}</span>
                </button>
              </div>

              <pre style={{
                margin: 0,
                fontSize: '0.75rem',
                lineHeight: 1.45,
                color: '#e2e8f0',
                fontFamily: 'monospace',
                background: '#090d16',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #1e293b',
                maxHeight: '220px',
                overflowY: 'auto',
                whiteSpace: 'pre-wrap'
              }}>
                {generatedOfferText}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: B2B-AKQUISE MAPPEN --- */}
      {activeTab === 'leads' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
            {[
              {
                id: 'hausverwaltung',
                icon: Building2,
                title: 'Hausverwaltungen & WEGs',
                desc: 'Treppenhäuser & Dauerpflege (5–30 Liegenschaften)'
              },
              {
                id: 'bau',
                icon: HardHat,
                title: 'Bauträger & Sanierer',
                desc: 'Bau-Endreinigung & Grobreinigung (Hohe Margen)'
              },
              {
                id: 'praxis',
                icon: Stethoscope,
                title: 'Praxen & Kanzleien',
                desc: 'Hygienische Unterhaltsreinigung (Monatspauschalen)'
              }
            ].map((t) => {
              const Icon = t.icon;
              const isSel = selectedAkquiseType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedAkquiseType(t.id)}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: isSel ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.08)',
                    background: isSel ? 'rgba(52, 211, 153, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <div style={{
                    padding: '8px',
                    borderRadius: '8px',
                    background: isSel ? '#34d399' : 'rgba(255,255,255,0.06)',
                    color: isSel ? '#022c22' : '#ffffff',
                    flexShrink: 0
                  }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{t.title}</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>{t.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>Empfänger Firma</label>
                <input
                  type="text"
                  value={akquiseTargetCompany}
                  onChange={(e) => setAkquiseTargetCompany(e.target.value)}
                  style={{ width: '100%', background: '#090d16', border: '1px solid #334155', borderRadius: '6px', padding: '6px 10px', color: '#ffffff', fontSize: '0.8rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>Ansprechpartner</label>
                <input
                  type="text"
                  value={akquiseContactPerson}
                  onChange={(e) => setAkquiseContactPerson(e.target.value)}
                  style={{ width: '100%', background: '#090d16', border: '1px solid #334155', borderRadius: '6px', padding: '6px 10px', color: '#ffffff', fontSize: '0.8rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>Stadt / Region</label>
                <input
                  type="text"
                  value={akquiseCity}
                  onChange={(e) => setAkquiseCity(e.target.value)}
                  style={{ width: '100%', background: '#090d16', border: '1px solid #334155', borderRadius: '6px', padding: '6px 10px', color: '#ffffff', fontSize: '0.8rem' }}
                />
              </div>
            </div>

            <div style={{
              background: '#090d16',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#34d399' }}>
                  ✉️ Anschreiben-Vorlage zum Sofort-Versand
                </span>
                <button
                  onClick={() => {
                    const text = selectedAkquiseType === 'hausverwaltung'
                      ? `Sehr geehrte/r ${akquiseContactPerson} der ${akquiseTargetCompany},\n\nals Verwalter kennen Sie das Problem: Wenn der Treppenhausservice unzuverlässig ist, stehen Mieter und Eigentümer bei Ihnen Schlange.\n\nWir von GoClean Harz entlasten Hausverwaltungen im Raum ${akquiseCity} mit garantiert festen Turnus-Intervallen, lückenlosen Fotoprotokollen und der flexiblen Kombination aus Treppenhausreinigung, Grünpflege und Winterdienst aus einer Hand.\n\nGerne erstellen wir Ihnen für ein Test-Objekt Ihrer Wahl innerhalb von 24 Stunden ein unverbindliches Festpreis-Angebot.\n\nDürfen wir Ihnen nächste Woche bei einer 10-minütigen Objektbegehung zeigen, wie reibungslos Objektpflege sein kann?\n\nBeste Grüße aus Langelsheim,\nMarcel Gornitzka | GoClean Harz`
                      : selectedAkquiseType === 'bau'
                      ? `Sehr geehrte/r ${akquiseContactPerson} (${akquiseTargetCompany}),\n\neine verzögerte Bau-Endreinigung gefährdet die fristgerechte Schlüsselübergabe und erzeugt unnötigen Stress.\n\nGoClean Harz sorgt dafür, dass Ihre Neubauten und Sanierungsobjekte in ${akquiseCity} und Umgebung pünktlich zur Bauabnahme makellos glänzen:\n• Baugrobreinigung während der Bauphase\n• Baufein- & Endreinigung (bezugsfertig für Käufer/Mieter)\n• Flexible Wochenendschichten vor kritischen Abnahmen\n\nSenden Sie uns einfach kurz die m²-Zahl oder Grundrisse – Sie erhalten binnen 24 Stunden ein verbindliches Festpreis-Angebot.\n\nHerzliche Grüße,\nMarcel Gornitzka | GoClean Harz`
                      : `Sehr geehrte/r ${akquiseContactPerson} (${akquiseTargetCompany}),\n\nin medizinischen und juristischen Räumen sind absolute Diskretion, Hygiene und verlässliche Sauberkeit die Visitenkarte gegenüber Patienten und Mandanten.\n\nGoClean Harz bietet Ihnen im Raum ${akquiseCity} ein maßgeschneidertes Unterhaltsreinigungskonzept:\n• RKI-konformes 4-Farben-Hygienesystem\n• Feste, geprüfte Reinigungskräfte mit Verschwiegenheitserklärung\n• Lautlose Ausführung außerhalb Ihrer Öffnungszeiten\n\nLassen Sie uns bei einer kurzen 10-Minuten-Besichtigung Ihren exakten Hygieneplan abstimmen.\n\nBeste Grüße,\nMarcel Gornitzka | GoClean Harz`;
                    copyToClipboard(text, 'akquise');
                  }}
                  style={{
                    background: 'rgba(52, 211, 153, 0.2)',
                    color: '#34d399',
                    border: '1px solid rgba(52, 211, 153, 0.4)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedId === 'akquise' ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedId === 'akquise' ? 'Kopiert!' : 'Anschreiben kopieren'}</span>
                </button>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                {selectedAkquiseType === 'hausverwaltung' && (
                  <div>
                    <strong style={{ color: '#34d399' }}>Betreff: Zuverlässige Treppenhaus- & Objektpflege für Ihre Liegenschaften in {akquiseCity} – GoClean Harz</strong>
                    <br /><br />
                    Sehr geehrte/r {akquiseContactPerson} der {akquiseTargetCompany},<br /><br />
                    als Verwalter kennen Sie das Problem: Wenn der Treppenhaus- oder Hausmeisterservice unzuverlässig ist, stehen Mieter und Eigentümer bei Ihnen am Telefon.<br /><br />
                    Wir von <strong>GoClean Harz</strong> haben uns darauf spezialisiert, Hausverwaltungen im Raum {akquiseCity} und Umgebung genau diesen Frust abzunehmen:<br />
                    • <strong>Feste Reinigungsintervalle</strong> (garantierte Termintreue)<br />
                    • <strong>Lückenlose Fotodokumentation</strong> bei jeder Begehung<br />
                    • <strong>Treppenhausreinigung, Grünpflege und Winterdienst</strong> aus einer Hand<br /><br />
                    Gerne erstellen wir Ihnen für ein Test-Objekt Ihrer Wahl innerhalb von 24 Stunden ein unverbindliches Festpreis-Angebot.<br /><br />
                    Dürfen wir Ihnen nächste Woche bei einer 10-minütigen Objektbegehung zeigen, wie reibungslos Objektpflege funktionieren kann?<br /><br />
                    Mit freundlichen Grüßen,<br />
                    <strong>Marcel Gornitzka</strong> – Inhaber GoClean Harz
                  </div>
                )}

                {selectedAkquiseType === 'bau' && (
                  <div>
                    <strong style={{ color: '#34d399' }}>Betreff: Terminsichere Bau-Endreinigung für Ihre Bauprojekte in {akquiseCity} – GoClean Harz</strong>
                    <br /><br />
                    Sehr geehrte/r {akquiseContactPerson} ({akquiseTargetCompany}),<br /><br />
                    eine verzögerte Bau-Endreinigung gefährdet die fristgerechte Schlüsselübergabe und kostet Nerven.<br /><br />
                    <strong>GoClean Harz</strong> sorgt dafür, dass Ihre Neubauten und Sanierungsobjekte in {akquiseCity} und im gesamten Harzkreis pünktlich zur Bauabnahme makellos glänzen:<br />
                    • <strong>Baugrobreinigung:</strong> Schnelle Beseitigung von Schutt & Folien während der Bauphase<br />
                    • <strong>Baufein- & Endreinigung:</strong> Rückstandsfreie Zementschleier-, Farb- und Feinstaubentfernung<br />
                    • <strong>Express-Einsatzbereitschaft:</strong> Auch an Wochenenden vor Übergabeterminen<br /><br />
                    Senden Sie uns einfach kurz die m²-Angaben Ihres aktuellen Objekts – Sie erhalten innerhalb von 24 Stunden ein Festpreis-Angebot.<br /><br />
                    Beste Grüße,<br />
                    <strong>Marcel Gornitzka</strong> – GoClean Harz
                  </div>
                )}

                {selectedAkquiseType === 'praxis' && (
                  <div>
                    <strong style={{ color: '#34d399' }}>Betreff: Höchste Hygienestandards & Diskretion für Ihre Räumlichkeiten in {akquiseCity} – GoClean Harz</strong>
                    <br /><br />
                    Sehr geehrte/r {akquiseContactPerson} ({akquiseTargetCompany}),<br /><br />
                    in medizinischen und juristischen Räumen sind absolute Diskretion, Hygiene und verlässliche Sauberkeit die Visitenkarte gegenüber Patienten und Mandanten.<br /><br />
                    <strong>GoClean Harz</strong> bietet Ihnen ein maßgeschneidertes Unterhaltsreinigungskonzept:<br />
                    • <strong>RKI-konformes 4-Farben-Hygienesystem:</strong> Strikte Trennung der Reinigungstücher<br />
                    • <strong>Geschultes, festes Personal:</strong> Einwandfreies Führungszeugnis & Verschwiegenheit<br />
                    • <strong>Lautlose Ausführung:</strong> Flexibel vor oder nach Ihren Öffnungszeiten<br /><br />
                    Lassen Sie uns bei einer kurzen 10-Minuten-Besichtigung Ihren individuellen Hygieneplan abstimmen.<br /><br />
                    Herzliche Grüße,<br />
                    <strong>Marcel Gornitzka</strong> – GoClean Harz
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: SOP & ABNAHMEPROTOKOLL --- */}
      {activeTab === 'sop' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start'
        }}>
          {/* Linke Spalte: Checkliste */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#34d399" />
                <span>Mobile Reinigungs-Checkliste (SOP)</span>
              </h3>
              <span style={{ fontSize: '0.7rem', color: '#34d399', background: 'rgba(52, 211, 153, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                Smartphone-Ready
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { key: 'arrivalPhoto', label: '1. Vorher-Foto aufgenommen (Beweisschutz vor Altschäden)' },
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: '#090d16',
                    border: '1px solid #1e293b',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={sopChecks[item.key]}
                    onChange={(e) => setSopChecks({ ...sopChecks, [item.key]: e.target.checked })}
                    style={{ accentColor: '#10b981', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span style={{
                    fontSize: '0.8rem',
                    color: sopChecks[item.key] ? '#64748b' : '#e2e8f0',
                    textDecoration: sopChecks[item.key] ? 'line-through' : 'none',
                    fontWeight: sopChecks[item.key] ? 400 : 600
                  }}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rechte Spalte: Abnahmeprotokoll */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="#34d399" />
                <span>Digitales Abnahmeprotokoll</span>
              </h3>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Rechtssicher vor Ort</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Ausführender / Objektleiter</label>
                <input
                  type="text"
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
                  style={{ width: '100%', background: '#090d16', border: '1px solid #334155', borderRadius: '6px', padding: '6px 10px', color: '#ffffff', fontSize: '0.8rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Kunden-Vertreter</label>
                <input
                  type="text"
                  value={customerSignName}
                  onChange={(e) => setCustomerSignName(e.target.value)}
                  style={{ width: '100%', background: '#090d16', border: '1px solid #334155', borderRadius: '6px', padding: '6px 10px', color: '#ffffff', fontSize: '0.8rem' }}
                />
              </div>
            </div>

            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>Abnahme-Erklärung:</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.45 }}>
                „Die vereinbarten Reinigungsarbeiten wurden am {new Date().toLocaleDateString('de-DE')} mangelfrei abgenommen und das Objekt in einwandfreiem Zustand übergeben.“
              </p>
            </div>

            {/* Unterschrift-Box */}
            <div style={{
              background: '#090d16',
              border: '1px dashed rgba(52, 211, 153, 0.4)',
              borderRadius: '10px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
                Unterschrift des Auftraggebers (Smartphone / Tablet):
              </span>
              {signatureSigned ? (
                <div style={{
                  padding: '10px',
                  background: 'rgba(52, 211, 153, 0.15)',
                  border: '1px solid #34d399',
                  borderRadius: '8px',
                  color: '#34d399',
                  fontFamily: 'serif',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle2 size={18} color="#34d399" />
                  <span>{customerSignName} (Digital quittiert)</span>
                </div>
              ) : (
                <button
                  onClick={() => setSignatureSigned(true)}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#022c22',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  ✍️ Jetzt digital unterzeichnen
                </button>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>DATEV & GoBD konform</span>
              <button
                onClick={() => alert(`Abnahmeprotokoll für ${customerSignName} archiviert!`)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                💾 Protokoll archivieren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: 5-STERNE-BEWERTUNGSBOOSTER --- */}
      {activeTab === 'reviews' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start'
        }}>
          {/* Konfiguration */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
              <Star size={16} color="#fbbf24" fill="#fbbf24" />
              <span>Bewertungs-Nachricht konfigurieren</span>
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Kundenname</label>
              <input
                type="text"
                value={reviewClientName}
                onChange={(e) => setReviewClientName(e.target.value)}
                style={{ width: '100%', background: '#090d16', border: '1px solid #334155', borderRadius: '6px', padding: '8px 10px', color: '#ffffff', fontSize: '0.85rem' }}
                placeholder="Herr Müller"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Durchgeführte Leistung</label>
              <input
                type="text"
                value={reviewServiceGiven}
                onChange={(e) => setReviewServiceGiven(e.target.value)}
                style={{ width: '100%', background: '#090d16', border: '1px solid #334155', borderRadius: '6px', padding: '8px 10px', color: '#ffffff', fontSize: '0.85rem' }}
                placeholder="Glas- und Fassadenreinigung"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Google-Bewertungslink</label>
              <input
                type="text"
                value={googleReviewLink}
                onChange={(e) => setGoogleReviewLink(e.target.value)}
                style={{ width: '100%', background: '#090d16', border: '1px solid #334155', borderRadius: '6px', padding: '8px 10px', color: '#34d399', fontSize: '0.75rem', fontFamily: 'monospace' }}
              />
            </div>
          </div>

          {/* WhatsApp Vorschau */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Send size={14} />
                <span>WhatsApp Nachricht (1-Klick Versand)</span>
              </span>
              <button
                onClick={() => {
                  const text = `Hallo ${reviewClientName}, hier ist Marcel von GoClean Harz! 😊 Wir haben die Arbeiten (${reviewServiceGiven}) heute bei Ihnen abgeschlossen. Ist alles zu Ihrer vollsten Zufriedenheit geworden?\n\nFalls ja: Würden Sie uns einen riesigen Gefallen tun und uns eine kurze 5-Sterne-Bewertung auf Google dalassen? Als regionaler Familienbetrieb hilft uns das enorm: ${googleReviewLink}\n\nVielen Dank für Ihr Vertrauen!`;
                  copyToClipboard(text, 'review_wa');
                }}
                style={{
                  background: 'rgba(52, 211, 153, 0.2)',
                  color: '#34d399',
                  border: '1px solid rgba(52, 211, 153, 0.4)',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {copiedId === 'review_wa' ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedId === 'review_wa' ? 'Kopiert!' : 'WhatsApp Text kopieren'}</span>
              </button>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              borderRadius: '12px',
              padding: '14px',
              fontSize: '0.85rem',
              color: '#e2e8f0',
              lineHeight: 1.55
            }}>
              <p style={{ margin: '0 0 8px 0' }}>
                Hallo {reviewClientName}, hier ist Marcel von <strong style={{ color: '#34d399' }}>GoClean Harz</strong>! 😊
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                Wir haben die Arbeiten ({reviewServiceGiven}) heute bei Ihnen abgeschlossen. Ist alles zu Ihrer vollsten Zufriedenheit geworden?
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                Falls ja: Würden Sie uns einen riesigen Gefallen tun und uns eine kurze 5-Sterne-Bewertung auf Google dalassen? Als regionaler Betrieb hilft uns das enorm:
              </p>
              <p style={{ margin: '0 0 8px 0', color: '#34d399', fontFamily: 'monospace', fontSize: '0.8rem', textDecoration: 'underline' }}>
                {googleReviewLink}
              </p>
              <p style={{ margin: 0 }}>Vielen Dank für Ihr Vertrauen!</p>
            </div>

            <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px', fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#fbbf24', fontWeight: 800 }}>💡 Psychologie-Tipp:</span>
              <span>
                Sende diese Nachricht maximal 30 Minuten nach Abschluss. Die Begeisterung über den frischen Glanz ist dann am höchsten!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 5: PRÄSENTATIONEN (8 DECK-VARIANTEN FÜR MARCEL) --- */}
      {activeTab === 'presentations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header & Filter Leiste */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                  color: '#090d16',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  8 Präsentations-Decks
                </span>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>
                  ● Personalisiert für Marcel
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                🎤 GoClean Harz – Präsentations-Galerie
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                Klicke auf eine Präsentation, um sie direkt <strong>in der App anzusehen</strong> oder im <strong>Browser-Tab</strong> zu öffnen.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <a
                href="/goclean_praesentationen_hub.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                  color: '#090d16',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)'
                }}
              >
                <LayoutGrid size={15} />
                <span>🎛️ Hub im Browser öffnen</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Filter Chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'Alle (8 Decks)', count: PRESENTATIONS.length },
              { id: 'pitch', label: '🤝 Pitches & Deals', count: PRESENTATIONS.filter(p => p.category === 'pitch').length },
              { id: 'demo', label: '📱 Feature-Demos', count: PRESENTATIONS.filter(p => p.category === 'demo').length },
              { id: 'growth', label: '🚀 Solo-Wachstum', count: PRESENTATIONS.filter(p => p.category === 'growth').length },
              { id: 'vision', label: '🧠 KI & Zukunft', count: PRESENTATIONS.filter(p => p.category === 'vision').length }
            ].map(f => {
              const isSel = presentationCategory === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setPresentationCategory(f.id)}
                  style={{
                    background: isSel ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: isSel ? '#38bdf8' : '#94a3b8',
                    border: isSel ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{f.label}</span>
                  <span style={{
                    background: isSel ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)',
                    color: isSel ? '#090d16' : '#94a3b8',
                    fontSize: '0.7rem',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontWeight: 700
                  }}>
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Präsentations-Grid mit Einzel-Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}>
            {PRESENTATIONS
              .filter(p => presentationCategory === 'all' || p.category === presentationCategory || (presentationCategory === 'all' && p.id === 'hub'))
              .map((deck) => {
                return (
                  <div
                    key={deck.id}
                    style={{
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.6) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '12px',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <div>
                      {/* Top Badges */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{
                          background: deck.badgeColor === 'emerald' ? 'rgba(52, 211, 153, 0.15)' : deck.badgeColor === 'amber' ? 'rgba(251, 191, 36, 0.15)' : deck.badgeColor === 'violet' ? 'rgba(167, 139, 250, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                          color: deck.badgeColor === 'emerald' ? '#34d399' : deck.badgeColor === 'amber' ? '#fbbf24' : deck.badgeColor === 'violet' ? '#a78bfa' : '#38bdf8',
                          border: `1px solid ${deck.badgeColor === 'emerald' ? 'rgba(52, 211, 153, 0.3)' : deck.badgeColor === 'amber' ? 'rgba(251, 191, 36, 0.3)' : deck.badgeColor === 'violet' ? 'rgba(167, 139, 250, 0.3)' : 'rgba(56, 189, 248, 0.3)'}`,
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '8px'
                        }}>
                          {deck.badge}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '6px' }}>
                          📄 {deck.slides}
                        </span>
                      </div>

                      {/* Header & Icon */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: '6px 0' }}>
                        <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{deck.icon}</span>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                            {deck.title}
                          </h4>
                          <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                            {deck.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Beschreibung */}
                      <p style={{ margin: '8px 0 0 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                        {deck.desc}
                      </p>
                    </div>

                    {/* Action Button Bar */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingTop: '12px',
                      marginTop: '4px'
                    }}>
                      {/* Button 1: In-App Preview */}
                      <button
                        onClick={() => setPreviewDeck(deck)}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(129, 140, 248, 0.2))',
                          color: '#38bdf8',
                          border: '1px solid rgba(56, 189, 248, 0.4)',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease'
                        }}
                        title="Öffnet die Präsentation direkt in der App als Vollbild-Modal"
                      >
                        <Eye size={14} />
                        <span>In-App ansehen</span>
                      </button>

                      {/* Button 2: Neuer Tab */}
                      <a
                        href={deck.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: '#e2e8f0',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                        title="In neuem Browser-Tab öffnen"
                      >
                        <ExternalLink size={14} />
                        <span>Neuer Tab</span>
                      </a>

                      {/* Button 3: Link kopieren */}
                      <button
                        onClick={() => {
                          const fullUrl = `${window.location.origin}${deck.url}`;
                          copyToClipboard(fullUrl, `link_${deck.id}`);
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          color: copiedId === `link_${deck.id}` ? '#34d399' : '#94a3b8',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Link kopieren"
                      >
                        {copiedId === `link_${deck.id}` ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ==================== IN-APP PRÄSENTATIONS-PREVIEW MODAL ==================== */}
      {previewDeck && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5, 8, 15, 0.88)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            width: 'min(96vw, 1300px)',
            height: '92vh',
            background: '#090d16',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '20px',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 20px',
              background: 'rgba(15, 23, 42, 0.95)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>{previewDeck.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                      {previewDeck.title}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#38bdf8', background: 'rgba(56,189,248,0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                      {previewDeck.slides}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Tipp: Nutze Pfeiltasten [◀ / ▶] oder Leertaste zum Blättern • [F] für Vollbild • [P] zum Drucken
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Schnell-Wechsler zu nächster Präsentation */}
                <select
                  value={previewDeck.id}
                  onChange={(e) => {
                    const found = PRESENTATIONS.find(p => p.id === e.target.value);
                    if (found) setPreviewDeck(found);
                  }}
                  style={{
                    background: '#090d16',
                    color: '#e2e8f0',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '0.8rem'
                  }}
                >
                  {PRESENTATIONS.map(p => (
                    <option key={p.id} value={p.id}>{p.icon} {p.title}</option>
                  ))}
                </select>

                <a
                  href={previewDeck.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <Maximize2 size={13} />
                  <span>Vollbild / Neuer Tab</span>
                </a>

                <button
                  onClick={() => setPreviewDeck(null)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <X size={15} />
                  <span>Schließen</span>
                </button>
              </div>
            </div>

            {/* Embedded Iframe */}
            <div style={{ flex: 1, position: 'relative', background: '#090d16' }}>
              <iframe
                src={previewDeck.url}
                title={previewDeck.title}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

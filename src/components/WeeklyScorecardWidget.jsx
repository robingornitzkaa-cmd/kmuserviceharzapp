import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  Mail, 
  PhoneCall, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  DollarSign, 
  Save, 
  RotateCcw, 
  Clock, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';

// ISO Kalenderwochen-Berechnung
const getWeekNumber = (d = new Date()) => {
  const target = new Date(d.valueOf());
  const dayNr = (d.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
};

const DEFAULT_TARGETS = {
  lettersSent: 15,
  callsMade: 20,
  decisionMakersReached: 7,
  walkInsDone: 3,
  multipliersContacted: 1,
  auditsBooked: 1,
  auditsDone: 1,
  setupsClosed: 1,
  hoursMax: 15
};

const getInitialWeekData = (kw, year) => ({
  kw,
  year,
  hoursWorked: 12,
  lettersSent: 0,
  callsMade: 0,
  decisionMakersReached: 0,
  walkInsDone: 0,
  multipliersContacted: 0,
  auditsBooked: 0,
  auditsDone: 0,
  setupsClosed: 0,
  activeRetainers: 0,
  manualCashflow: 0,
  bottleneckNote: ''
});

export const WeeklyScorecardWidget = () => {
  const now = new Date();
  const currentKW = getWeekNumber(now);
  const currentYear = now.getFullYear();

  const [selectedKW, setSelectedKW] = useState(currentKW);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [scorecardData, setScorecardData] = useState(() => {
    try {
      const stored = localStorage.getItem('f_weekly_scorecard_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        const key = `${currentYear}_KW${currentKW}`;
        if (parsed[key]) return parsed[key];
      }
    } catch (e) {
      console.warn('Could not parse weekly scorecard data from localStorage', e);
    }
    return getInitialWeekData(currentKW, currentYear);
  });

  const [savedFeedback, setSavedFeedback] = useState(false);

  // Bei Wechsel von KW oder Jahr Daten laden
  useEffect(() => {
    const key = `${selectedYear}_KW${selectedKW}`;
    try {
      const stored = localStorage.getItem('f_weekly_scorecard_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[key]) {
          setScorecardData(parsed[key]);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to load scorecard for key', key, e);
    }
    setScorecardData(getInitialWeekData(selectedKW, selectedYear));
  }, [selectedKW, selectedYear]);

  // Änderungen an den Werten
  const updateMetric = (field, value) => {
    setScorecardData(prev => ({
      ...prev,
      [field]: typeof value === 'number' ? Math.max(0, value) : value
    }));
  };

  // Speichern in localStorage
  const handleSave = () => {
    const key = `${selectedYear}_KW${selectedKW}`;
    try {
      const stored = localStorage.getItem('f_weekly_scorecard_data');
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[key] = {
        ...scorecardData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('f_weekly_scorecard_data', JSON.stringify(parsed));
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 2500);
    } catch (e) {
      console.error('Failed to save weekly scorecard data', e);
    }
  };

  // Schnelle Wochennavigation
  const prevWeek = () => {
    if (selectedKW > 1) {
      setSelectedKW(selectedKW - 1);
    } else {
      setSelectedYear(selectedYear - 1);
      setSelectedKW(52);
    }
  };

  const nextWeek = () => {
    if (selectedKW < 52) {
      setSelectedKW(selectedKW + 1);
    } else {
      setSelectedYear(selectedYear + 1);
      setSelectedKW(1);
    }
  };

  // Berechnungen
  const inputProgress = Math.round(
    ((Math.min(scorecardData.lettersSent / DEFAULT_TARGETS.lettersSent, 1) +
      Math.min(scorecardData.callsMade / DEFAULT_TARGETS.callsMade, 1) +
      Math.min(scorecardData.decisionMakersReached / DEFAULT_TARGETS.decisionMakersReached, 1) +
      Math.min(scorecardData.walkInsDone / DEFAULT_TARGETS.walkInsDone, 1) +
      Math.min(scorecardData.multipliersContacted / DEFAULT_TARGETS.multipliersContacted, 1)) / 5) * 100
  );

  const calculatedCashflow = (scorecardData.auditsDone * 500) + (scorecardData.setupsClosed * 1500) + Number(scorecardData.manualCashflow || 0);
  const currentMRR = (scorecardData.activeRetainers || 0) * 200;

  // Ampel-Status
  let trafficLight = {
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.3)',
    text: '🔴 Achtung: Unter 50 % Input. Ohne wöchentliche Briefe & Anrufe trocknet deine Pipeline in 2-3 Wochen aus!'
  };

  if (inputProgress >= 80) {
    trafficLight = {
      color: '#22c55e',
      bg: 'rgba(34, 197, 94, 0.15)',
      border: 'rgba(34, 197, 94, 0.3)',
      text: '🟢 Hervorragend! Mit diesem Input-Tempo füllt sich deine Pipeline planmäßig auf.'
    };
  } else if (inputProgress >= 50) {
    trafficLight = {
      color: '#eab308',
      bg: 'rgba(234, 179, 8, 0.15)',
      border: 'rgba(234, 179, 8, 0.3)',
      text: '🟡 Solider Fortschritt (50–79 %). Lege noch 3-5 Anrufe oder Hof-Besuche nach, um auf 100 % Soll zu kommen.'
    };
  }

  return (
    <div 
      className="card scorecard-widget" 
      style={{ 
        gridColumn: 'span 2',
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.85))',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
        borderRadius: '16px',
        padding: '20px'
      }}
    >
      {/* Header mit KW-Steuerung */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <TrendingUp size={22} color="#38bdf8" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Wöchentliche 15-Minuten Scorecard
              <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
                Modul 9 & 14
              </span>
            </h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
              KMU Service Harz • 10–15 Std./Woche Nebenberufs-Fokus
            </p>
          </div>
        </div>

        {/* KW-Wahl */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 0, 0, 0.3)', padding: '4px 8px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button 
            type="button" 
            onClick={prevWeek}
            aria-label="Vorherige Woche"
            style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            <ChevronLeft size={18} />
          </button>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', minWidth: '95px', textAlign: 'center' }}>
            KW {selectedKW} / {selectedYear}
          </span>
          <button 
            type="button" 
            onClick={nextWeek}
            aria-label="Nächste Woche"
            style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            <ChevronRight size={18} />
          </button>
          {(selectedKW !== currentKW || selectedYear !== currentYear) && (
            <button 
              type="button" 
              onClick={() => { setSelectedKW(currentKW); setSelectedYear(currentYear); }}
              style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: 'none', borderRadius: '6px', padding: '3px 6px', cursor: 'pointer', fontWeight: 600 }}
            >
              Heute
            </button>
          )}
        </div>
      </div>

      {/* Zeiteinsatz & Score-Status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '18px' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '12px' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} color="#38bdf8" /> Zeiteinsatz diese Woche
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
            <input 
              type="number" 
              value={scorecardData.hoursWorked} 
              onChange={e => updateMetric('hoursWorked', Number(e.target.value))}
              style={{ width: '60px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#fff', fontSize: '1.25rem', fontWeight: 800, textAlign: 'center', padding: '2px 4px' }}
            />
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>/ max. 15 Std.</span>
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '12px' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Target size={14} color="#22c55e" /> Input-Aktivitätsgrad
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
            <div style={{ flex: 1, height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${inputProgress}%`, 
                  height: '100%', 
                  background: inputProgress >= 80 ? '#22c55e' : inputProgress >= 50 ? '#eab308' : '#ef4444', 
                  transition: 'width 0.3s ease' 
                }} 
              />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: inputProgress >= 80 ? '#4ade80' : inputProgress >= 50 ? '#facc15' : '#f87171' }}>
              {inputProgress}%
            </span>
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '12px' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <DollarSign size={14} color="#4ade80" /> Fester MRR-Stand
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4ade80', marginTop: '2px' }}>
            {currentMRR.toLocaleString('de-DE')} € <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>/ Monat</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
            {scorecardData.activeRetainers || 0} feste Retainer-Kunden (Ziel: 5 = 1.000 €)
          </div>
        </div>
      </div>

      {/* Wochen-Ampel Feedback */}
      <div 
        style={{ 
          background: trafficLight.bg, 
          border: `1px solid ${trafficLight.border}`, 
          borderRadius: '10px', 
          padding: '10px 14px', 
          marginBottom: '18px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          fontSize: '0.85rem', 
          color: '#f8fafc', 
          fontWeight: 600 
        }}
      >
        <ShieldCheck size={18} color={trafficLight.color} style={{ flexShrink: 0 }} />
        <span>{trafficLight.text}</span>
      </div>

      {/* Grid: Teil 1 Input-KPIs & Teil 2 Output-KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '18px' }}>
        
        {/* TEIL 1: INPUT-KPIS */}
        <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={16} /> Teil 1: Input-KPIs (100 % in deiner Hand)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* 1. Briefe */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>1. Physische Handwerker-Briefe</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Wochensoll: {DEFAULT_TARGETS.lettersSent} Briefe</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input 
                  type="number" 
                  value={scorecardData.lettersSent} 
                  onChange={e => updateMetric('lettersSent', Number(e.target.value))}
                  style={{ width: '45px', textAlign: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontWeight: 700, padding: '2px' }}
                />
                <button type="button" onClick={() => updateMetric('lettersSent', scorecardData.lettersSent + 5)} style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: 'none', borderRadius: '4px', padding: '3px 6px', cursor: 'pointer', fontWeight: 700 }}>+5</button>
              </div>
            </div>

            {/* 2. Anrufe */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>2. Kalt- & Nachfass-Anrufe</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Wochensoll: {DEFAULT_TARGETS.callsMade} Anrufe</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input 
                  type="number" 
                  value={scorecardData.callsMade} 
                  onChange={e => updateMetric('callsMade', Number(e.target.value))}
                  style={{ width: '45px', textAlign: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontWeight: 700, padding: '2px' }}
                />
                <button type="button" onClick={() => updateMetric('callsMade', scorecardData.callsMade + 5)} style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: 'none', borderRadius: '4px', padding: '3px 6px', cursor: 'pointer', fontWeight: 700 }}>+5</button>
              </div>
            </div>

            {/* 3. Entscheider */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>3. Erreichte Entscheider (Meister/Büro)</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Wochensoll: {DEFAULT_TARGETS.decisionMakersReached} Gespräche</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input 
                  type="number" 
                  value={scorecardData.decisionMakersReached} 
                  onChange={e => updateMetric('decisionMakersReached', Number(e.target.value))}
                  style={{ width: '45px', textAlign: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontWeight: 700, padding: '2px' }}
                />
                <button type="button" onClick={() => updateMetric('decisionMakersReached', scorecardData.decisionMakersReached + 1)} style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: 'none', borderRadius: '4px', padding: '3px 6px', cursor: 'pointer', fontWeight: 700 }}>+1</button>
              </div>
            </div>

            {/* 4. Hof-Walk-ins */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>4. Hof-Walk-ins (Freitags-Tour)</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Wochensoll: {DEFAULT_TARGETS.walkInsDone} Betriebe</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input 
                  type="number" 
                  value={scorecardData.walkInsDone} 
                  onChange={e => updateMetric('walkInsDone', Number(e.target.value))}
                  style={{ width: '45px', textAlign: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontWeight: 700, padding: '2px' }}
                />
                <button type="button" onClick={() => updateMetric('walkInsDone', scorecardData.walkInsDone + 1)} style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: 'none', borderRadius: '4px', padding: '3px 6px', cursor: 'pointer', fontWeight: 700 }}>+1</button>
              </div>
            </div>

            {/* 5. Multiplikatoren */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>5. Steuerberater / Innung / Bank</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Wochensoll: {DEFAULT_TARGETS.multipliersContacted} Kontakt</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input 
                  type="number" 
                  value={scorecardData.multipliersContacted} 
                  onChange={e => updateMetric('multipliersContacted', Number(e.target.value))}
                  style={{ width: '45px', textAlign: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontWeight: 700, padding: '2px' }}
                />
                <button type="button" onClick={() => updateMetric('multipliersContacted', scorecardData.multipliersContacted + 1)} style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: 'none', borderRadius: '4px', padding: '3px 6px', cursor: 'pointer', fontWeight: 700 }}>+1</button>
              </div>
            </div>
          </div>
        </div>

        {/* TEIL 2: OUTPUT-KPIS */}
        <div style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={16} /> Teil 2: Output-Ergebnisse & Cashflow
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Gebuchte Audits */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>Gebuchte 500-€-Audits</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Doppelte Sicherheits-Garantie</div>
              </div>
              <input 
                type="number" 
                value={scorecardData.auditsBooked} 
                onChange={e => updateMetric('auditsBooked', Number(e.target.value))}
                style={{ width: '45px', textAlign: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontWeight: 700, padding: '2px' }}
              />
            </div>

            {/* Durchgeführte Audits */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>Durchgeführte Audits (500 € Cashflow)</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>1:1 Vor-Ort-Analyse abgeschlossen</div>
              </div>
              <input 
                type="number" 
                value={scorecardData.auditsDone} 
                onChange={e => updateMetric('auditsDone', Number(e.target.value))}
                style={{ width: '45px', textAlign: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#4ade80', fontWeight: 800, padding: '2px' }}
              />
            </div>

            {/* Abgeschlossene Setups */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>Wandlung in 2.000-€-Setup</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>1.500 € Restzahlung vereinnahmt</div>
              </div>
              <input 
                type="number" 
                value={scorecardData.setupsClosed} 
                onChange={e => updateMetric('setupsClosed', Number(e.target.value))}
                style={{ width: '45px', textAlign: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#38bdf8', fontWeight: 800, padding: '2px' }}
              />
            </div>

            {/* Aktive Retainer-Kunden */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f1f5f9' }}>Aktive 200-€-Retainer Kunden</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Digitaler Hausmeister (24/7 Monitoring)</div>
              </div>
              <input 
                type="number" 
                value={scorecardData.activeRetainers} 
                onChange={e => updateMetric('activeRetainers', Number(e.target.value))}
                style={{ width: '45px', textAlign: 'center', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#ffd700', fontWeight: 800, padding: '2px' }}
              />
            </div>

            {/* Berechneter Cashflow */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.25)', padding: '8px 10px', borderRadius: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f1f5f9' }}>Vereinnahmter Cashflow (KW {selectedKW}):</span>
              <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#4ade80' }}>
                {calculatedCashflow.toLocaleString('de-DE')} € netto
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Engpass & Notiz der Woche */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
          📝 Wöchentliche Erkenntnis / Größter Engpass (z. B. „Dachdecker-Bürokraft am besten freitags ab 11 Uhr anrufen“):
        </label>
        <input 
          type="text" 
          value={scorecardData.bottleneckNote} 
          onChange={e => updateMetric('bottleneckNote', e.target.value)}
          placeholder="Welcher Hebel hat diese Woche funktioniert? Was hat blockiert?"
          style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px', padding: '8px 12px', color: '#f8fafc', fontSize: '0.85rem' }}
        />
      </div>

      {/* Footer mit Speichern-Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
          Alle Daten werden automatisch lokal im Browser gespeichert.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {savedFeedback && (
            <span style={{ fontSize: '0.8rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
              <CheckCircle2 size={16} /> Gespeichert!
            </span>
          )}
          <button 
            type="button" 
            onClick={handleSave}
            style={{ 
              background: 'linear-gradient(135deg, #0284c7, #0369a1)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              padding: '8px 16px', 
              fontWeight: 700, 
              fontSize: '0.85rem', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
            }}
          >
            <Save size={16} /> 15-Min.-Scorecard speichern
          </button>
        </div>
      </div>
    </div>
  );
};

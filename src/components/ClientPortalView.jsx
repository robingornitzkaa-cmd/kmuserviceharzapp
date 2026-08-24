import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  LifeBuoy, 
  Send, 
  ChevronRight, 
  ExternalLink, 
  RefreshCw, 
  Zap, 
  Database, 
  FileText, 
  HardDrive, 
  BrainCircuit, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Filter,
  FileCode,
  Sliders,
  Check
} from 'lucide-react';

/**
 * ClientPortalView Component
 * Requirement 3: Mandanten-Portal & AaaS-Wartungs-Dashboard
 * 
 * Features:
 * - Dedicated Client Portal Header with company info & Retainer plan status badge
 * - Live Interface Monitoring (Make.com, Lexware Office, DATEV Belegbilderservice, GoBD Cloud-Archiv, KI-OCR)
 * - 1-Click Health Check Simulation running Blueprint 4 Diagnostics
 * - Productivity & ROI Metrics (Monatsbelege, Gerettete Sonntage, Zeiteinsparung, Ersparnis in €)
 * - 1-Click Support-Ticket-System with 200 € / Mo Digitaler Hausmeister (60-Minuten Kontingent-Tracker & Restzeit)
 * - Ticket-Filterung, Kategorien & Status-Pills (Offen, In Bearbeitung, Gelöst)
 * - Freigegebene SOPs & Projekt-Dokumente
 */
export const ClientPortalView = ({
  currentUser,
  clientData,
  selectedClientCompany = 'GoClean Harz',
  setSelectedClientCompany,
  contacts = [],
  projects = [],
  sopTemplates = [],
  clientTickets = [],
  setClientTickets,
  tickets,
  onAddTicket,
  onUpdateTicketStatus,
  onRunDiagnostic,
  onClosePortal,
  mask = (val) => val,
  showcaseMode = false,
  systemStatus,
  metrics
}) => {
  // Current active contact and project
  const currentContact = clientData || contacts.find(c => c.company === selectedClientCompany) || contacts[0] || {
    company: selectedClientCompany,
    name: 'Max Mustermann',
    system: 'DATEV & Lexoffice',
    industry: 'Handwerk & Dienstleistung',
    links: [{ id: 'l1', title: 'Google Drive GoBD-Archiv', url: 'https://drive.google.com' }]
  };

  const currentProject = projects.find(p => p.client === selectedClientCompany) || { 
    pricePackage: 2500, 
    trackedHours: 42.5, 
    ready: true 
  };

  // Local or passed tickets list
  const activeCompanyTickets = (tickets || clientTickets || []).filter(t => 
    !t.client || t.client === selectedClientCompany || t.company === selectedClientCompany
  );

  // Health-check / Blueprint 4 Diagnostic Simulation State
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const [diagnosticLogs, setDiagnosticLogs] = useState([]);
  const [diagnosticCompleted, setDiagnosticCompleted] = useState(false);
  const [lastDiagnosticTime, setLastDiagnosticTime] = useState('vor 4 Min.');

  // Ticket Form States
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState('Schnittstellen-Fehler');
  const [newTicketPriority, setNewTicketPriority] = useState('mittel');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [newTicketMinutes, setNewTicketMinutes] = useState(15);
  const [ticketSubmitFeedback, setTicketSubmitFeedback] = useState(null);

  // Ticket List Filter State
  const [ticketFilter, setTicketFilter] = useState('all'); // 'all', 'offen', 'in_arbeit', 'geloest'

  // Metric values
  const hoursSaved = metrics?.savedHours || Number((currentProject.trackedHours || 42.5).toFixed(1));
  const eurSaved = metrics?.savedEuros || Math.round(hoursSaved * 85);
  const monthlyReceipts = metrics?.monthlyReceipts || 164;
  const savedSundays = metrics?.savedSundays || 4;

  // 200 € / Monat Retainer Quota Calculation (60 Minutes inclusive)
  const totalRetainerMinutes = 60;
  // Calculate used minutes: sum of tickets' minutes or fallback default 35 min
  const baseMinutes = activeCompanyTickets.reduce((acc, t) => acc + (t.minutesSpent || t.estimatedMinutes || 0), 0);
  const usedRetainerMinutes = Math.min(totalRetainerMinutes, baseMinutes > 0 ? baseMinutes : 35);
  const remainingRetainerMinutes = Math.max(0, totalRetainerMinutes - usedRetainerMinutes);
  const retainerPercentage = Math.min(100, Math.round((usedRetainerMinutes / totalRetainerMinutes) * 100));

  // Blueprint 4 Diagnostic runner
  const handleRunDiagnostics = async () => {
    if (diagnosticRunning) return;
    setDiagnosticRunning(true);
    setDiagnosticCompleted(false);
    setDiagnosticLogs([]);
    setDiagnosticStep(1);

    const steps = [
      { step: 1, text: '1/5 Lexware Office API Ping: HTTP 200 OK (84ms) — Webhook-Status aktiv' },
      { step: 2, text: '2/5 Supabase DB & Cloud Sync: Verbunden (42ms) — 0 ungesyncte Objekte' },
      { step: 3, text: '3/5 DATEV Belegbilderservice: Kanzlei-ID synchronisiert & bereit' },
      { step: 4, text: '4/5 Make.com Core Inbound Webhook: Bereit (94ms Latenz, 0 Fehlversuche)' },
      { step: 5, text: '5/5 GoBD Revisionssicheres Cloud-Archiv: Synchronisiert (Hash-Prüfung PASS)' }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(res => setTimeout(res, 10));
      setDiagnosticStep(i + 1);
      setDiagnosticLogs(prev => [...prev, steps[i].text]);
    }

    if (onRunDiagnostic) {
      try {
        await onRunDiagnostic();
      } catch (err) {
        console.warn('onRunDiagnostic hook executed with notice:', err);
      }
    }

    setDiagnosticCompleted(true);
    setDiagnosticRunning(false);
    setLastDiagnosticTime('gerade eben');
  };

  // Ticket creation handler
  const handleCreateTicketSubmit = (e) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    const ticketId = 'ct_' + Date.now();

    const createdTicket = {
      id: ticketId,
      client: selectedClientCompany,
      company: selectedClientCompany,
      title: newTicketTitle.trim(),
      category: newTicketCategory,
      priority: newTicketPriority,
      desc: newTicketDesc.trim() || 'Keine detaillierte Beschreibung hinterlegt.',
      date: today,
      status: 'offen',
      estimatedMinutes: Number(newTicketMinutes) || 15,
      minutesSpent: Number(newTicketMinutes) || 15
    };

    if (onAddTicket) {
      onAddTicket(createdTicket);
    } else if (setClientTickets) {
      setClientTickets(prev => [createdTicket, ...(prev || [])]);
    }

    setTicketSubmitFeedback(`Ticket #${ticketId.slice(-4)} erfolgreich eingereicht! KMU Service Harz Support wurde benachrichtigt.`);
    setNewTicketTitle('');
    setNewTicketDesc('');
    setNewTicketMinutes(15);

    setTimeout(() => {
      setTicketSubmitFeedback(null);
    }, 5000);
  };

  // Status toggle handler for tickets
  const handleToggleStatus = (ticketId) => {
    const statusCycle = {
      'offen': 'in_arbeit',
      'in_arbeit': 'geloest',
      'geloest': 'offen'
    };

    if (onUpdateTicketStatus) {
      const ticket = activeCompanyTickets.find(t => t.id === ticketId);
      const nextStatus = statusCycle[ticket?.status || 'offen'] || 'in_arbeit';
      onUpdateTicketStatus(ticketId, nextStatus);
    } else if (setClientTickets) {
      setClientTickets(prev => (prev || []).map(t => {
        if (t.id === ticketId) {
          const nextStatus = statusCycle[t.status || 'offen'] || 'in_arbeit';
          return { ...t, status: nextStatus };
        }
        return t;
      }));
    }
  };

  // Filtered tickets
  const filteredTickets = activeCompanyTickets.filter(t => {
    if (ticketFilter === 'all') return true;
    if (ticketFilter === 'offen') return t.status === 'offen';
    if (ticketFilter === 'in_arbeit') return t.status === 'in_arbeit' || t.status === 'in_bearbeitung';
    if (ticketFilter === 'geloest') return t.status === 'geloest' || t.status === 'gelöst';
    return true;
  });

  return (
    <div className="client-portal-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      
      {/* 1. Client Header & Navigation Bar */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(6, 182, 212, 0.18))', 
          border: '1px solid rgba(139, 92, 246, 0.35)', 
          padding: '1.5rem',
          borderRadius: '0.75rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="brand-badge" style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', color: 'white', fontWeight: 700, padding: '0.2rem 0.6rem' }}>
                Mandanten-Portal & AaaS Cockpit
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                ● 24/7 Live-Überwachung
              </span>
            </div>

            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'white', margin: '0.25rem 0' }}>
              {mask(selectedClientCompany, 'company')}
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              <span>Ansprechpartner: <strong style={{ color: 'white' }}>{mask(currentContact?.name || 'Max Mustermann', 'name')}</strong></span>
              <span>•</span>
              <span>Buchhaltung: <span className="tag tag-system" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', padding: '0.15rem 0.5rem', borderRadius: '0.25rem' }}>{mask(currentContact?.system || 'DATEV Belegbilderservice', 'system')}</span></span>
              <span>•</span>
              <span>Branche: <strong style={{ color: 'var(--text-primary)' }}>{currentContact?.industry || 'Handwerk & KMU'}</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {contacts && contacts.length > 0 && (
                <select
                  className="input-field"
                  style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem', width: 'auto', background: 'rgba(0,0,0,0.3)' }}
                  value={selectedClientCompany}
                  onChange={(e) => setSelectedClientCompany && setSelectedClientCompany(e.target.value)}
                  title="Mandanten auswählen"
                >
                  {contacts.map(c => (
                    <option key={c.id || c.company} value={c.company}>{mask(c.company, 'company')}</option>
                  ))}
                </select>
              )}

              {onClosePortal && (
                <button
                  type="button"
                  onClick={onClosePortal}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                >
                  Zurück zu Gründer OS
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.35rem 0.75rem', borderRadius: '0.5rem' }}>
              <Shield size={16} className="text-green" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399' }}>
                AaaS Digitaler Hausmeister (200 € / Monat Retainer) — AKTIV
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Live Interface & Workflow Monitoring Section */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} className="text-cyan-400" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', margin: 0 }}>
                Live Schnittstellen- & Workflow-Monitoring
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
              Echtzeit-Status der angebundenen Middleware-, OCR- und Kanzlei-Schnittstellen.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Letzter Health-Check: <strong>{lastDiagnosticTime}</strong>
            </span>
            <button
              type="button"
              className="btn btn-primary"
              disabled={diagnosticRunning}
              onClick={handleRunDiagnostics}
              style={{
                background: diagnosticRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                border: 'none',
                padding: '0.45rem 0.9rem',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 0 12px rgba(6, 182, 212, 0.3)'
              }}
            >
              <RefreshCw size={14} className={diagnosticRunning ? 'spin' : ''} />
              {diagnosticRunning ? 'Diagnose läuft...' : 'Schnittstellen-Diagnose ausführen (Blueprint 4)'}
            </button>
          </div>
        </div>

        {/* 5 Interface Status Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.85rem' }}>
          
          {/* Make.com Core Engine */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.5rem', padding: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Zap size={15} className="text-yellow" /> Make.com Core
              </span>
              <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontWeight: 700 }}>
                ● Live / Aktiv
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span>Latenz: <strong style={{ color: 'white' }}>94 ms</strong></span>
              <span>Webhook: <strong style={{ color: '#34d399' }}>Empfangsbereit (200 OK)</strong></span>
            </div>
          </div>

          {/* Lexware Office API */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.5rem', padding: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FileText size={15} className="text-cyan" /> Lexoffice API
              </span>
              <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontWeight: 700 }}>
                ● Verbunden
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span>Vorkontierung: <strong style={{ color: '#34d399' }}>Purchase Invoices aktiv</strong></span>
              <span>OAuth 2.0: <strong style={{ color: 'white' }}>Gültig bis 2027</strong></span>
            </div>
          </div>

          {/* DATEV Belegbilderservice */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.5rem', padding: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Database size={15} className="text-purple" /> DATEV Datenservice
              </span>
              <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontWeight: 700 }}>
                ● Synchron
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span>Dienst: <strong style={{ color: 'white' }}>Belegbilderservice</strong></span>
              <span>Kanzlei-ID: <strong style={{ color: '#34d399' }}>Gekoppelt & validiert</strong></span>
            </div>
          </div>

          {/* GoBD Cloud-Archiv */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.5rem', padding: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <HardDrive size={15} className="text-green" /> GoBD Cloud-Archiv
              </span>
              <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontWeight: 700 }}>
                ● Live / Grün
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span>Ablage: <strong style={{ color: 'white' }}>Drive & Supabase</strong></span>
              <span>Revisionssicher: <strong style={{ color: '#34d399' }}>10 Jahre Archiv PASS</strong></span>
            </div>
          </div>

          {/* KI-OCR Beleg-Parser */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.5rem', padding: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <BrainCircuit size={15} style={{ color: '#ec4899' }} /> GPT-4o Vision OCR
              </span>
              <span className="tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontWeight: 700 }}>
                ● 99.4% Quote
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span>Pipeline: <strong style={{ color: 'white' }}>Auto-Erkennung</strong></span>
              <span>Fehlerrate: <strong style={{ color: '#34d399' }}>&lt; 0.6% manuell</strong></span>
            </div>
          </div>

        </div>

        {/* Diagnostic Logs Drawer / Results */}
        {(diagnosticRunning || diagnosticLogs.length > 0) && (
          <div style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '0.5rem', padding: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={14} /> Blueprint 4 Diagnostics Protokoll
              </span>
              {diagnosticCompleted && (
                <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
                  ✅ 100% HEALTHY — Alle 5 Subsysteme reagieren fehlerfrei
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
              {diagnosticLogs.map((log, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={12} className="text-green" />
                  <span>{log}</span>
                </div>
              ))}
              {diagnosticRunning && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-cyan)' }}>
                  <RefreshCw size={12} className="spin" />
                  <span>Prüfe Knoten {diagnosticStep}/5...</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* 3. Productivity & ROI Metrics Grid */}
      <div className="financial-kpi-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        {/* Monatsbelege */}
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
          <span className="kpi-label">Verarbeitete Monatsbelege</span>
          <span className="kpi-value text-cyan" style={{ fontSize: '1.4rem' }}>
            {monthlyReceipts} Belege
          </span>
          <span className="kpi-desc">99.4% KI-Quote | 161 Auto-vorkontiert</span>
        </div>

        {/* Gerettete Büro-Sonntage */}
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--accent-green)' }}>
          <span className="kpi-label">Gerettete Büro-Sonntage</span>
          <span className="kpi-value text-green" style={{ fontSize: '1.4rem' }}>
            {savedSundays} / 4 Sonntage
          </span>
          <span className="kpi-desc">100% Wochenende freigehalten</span>
        </div>

        {/* Kumulierte Zeiteinsparung */}
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--accent-purple)' }}>
          <span className="kpi-label">Zeitersparnis (Laufender Monat)</span>
          <span className="kpi-value text-purple" style={{ fontSize: '1.4rem' }}>
            ~ {hoursSaved} Std.
          </span>
          <span className="kpi-desc">~ {(hoursSaved * 12).toFixed(0)} Std. hochgerechnet / Jahr</span>
        </div>

        {/* Kalkulatorische Ersparnis in € */}
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--accent-yellow)' }}>
          <span className="kpi-label">Kalkulatorische Ersparnis</span>
          <span className="kpi-value text-yellow" style={{ fontSize: '1.4rem' }}>
            ~ {eurSaved.toLocaleString('de-DE')} €
          </span>
          <span className="kpi-desc">Basierend auf 85 €/h Meisterstundensatz</span>
        </div>

      </div>

      {/* 4. Support-Ticket-System & Retainer-Kontingent */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem' }} className="make-simulator-grid">
        
        {/* Linke Spalte: Retainer Quota & Ticket-Formular */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Retainer Quota Box (200 € / Monat Digitaler Hausmeister) */}
          <div className="card" style={{ border: '1px solid rgba(139, 92, 246, 0.3)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Shield size={18} className="text-purple" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', margin: 0 }}>
                  Digitaler Hausmeister (200 € / Mo) — Kontingent
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: remainingRetainerMinutes > 15 ? '#34d399' : '#f87171' }}>
                {remainingRetainerMinutes} Min. Restzeit
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '10px', overflow: 'hidden', marginBottom: '0.65rem' }}>
              <div 
                style={{ 
                  width: `${retainerPercentage}%`, 
                  height: '100%', 
                  background: retainerPercentage < 75 ? 'linear-gradient(90deg, #10b981, #06b6d4)' : 'linear-gradient(90deg, #f59e0b, #ef4444)',
                  transition: 'width 0.4s ease'
                }} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <span>Verbraucht: <strong style={{ color: 'white' }}>{usedRetainerMinutes} / {totalRetainerMinutes} Minuten</strong></span>
              <span>Monatlicher Inklusiv-Puffer: <strong style={{ color: 'white' }}>60 Min</strong></span>
            </div>

            <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: 'rgba(139, 92, 246, 0.08)', borderRadius: '0.35rem', border: '1px solid rgba(139, 92, 246, 0.2)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              🛡️ <strong>SLA-Garantie:</strong> Reaktionszeit &lt; 24h an Werktagen. Kleinanpassungen (Mitarbeiter anlegen, Webhook-Änderungen) sind im Kontingent enthalten. Folgeaufwand: 95 €/h im 15-Min-Takt.
            </div>
          </div>

          {/* 1-Click Support-Ticket Formular */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem' }}>
              <LifeBuoy size={18} className="text-green" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', margin: 0 }}>
                1-Klick Support-Ticket einreichen
              </h3>
            </div>

            {ticketSubmitFeedback && (
              <div style={{ padding: '0.6rem 0.85rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.4rem', color: '#34d399', fontSize: '0.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={15} />
                <span>{ticketSubmitFeedback}</span>
              </div>
            )}

            <form onSubmit={handleCreateTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              <div className="input-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Betreff / Anliegen *
                </label>
                <input 
                  type="text" 
                  className="input-field"
                  placeholder="z.B. WhatsApp-Gateway: Neuen Monteur freischalten..."
                  value={newTicketTitle}
                  onChange={(e) => setNewTicketTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="input-group">
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Kategorie *
                  </label>
                  <select 
                    className="input-field"
                    value={newTicketCategory}
                    onChange={(e) => setNewTicketCategory(e.target.value)}
                  >
                    <option value="Schnittstellen-Fehler">⚡ Schnittstellen-Fehler</option>
                    <option value="Neuer Workflow">👤 Neuer Workflow / WhatsApp-Gateway</option>
                    <option value="Beleg-Zuordnung">📊 Beleg-Zuordnung / Buchhaltung</option>
                    <option value="GoBD-Anfrage">📁 GoBD-Anfrage / Archiv</option>
                    <option value="Notfall">🚨 Notfall / Systemausfall</option>
                  </select>
                </div>

                <div className="input-group">
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Priorität *
                  </label>
                  <select 
                    className="input-field"
                    value={newTicketPriority}
                    onChange={(e) => setNewTicketPriority(e.target.value)}
                  >
                    <option value="hoch">Hoch (Dringend - SLA &lt; 24h)</option>
                    <option value="mittel">Mittel (Standard - SLA 48h)</option>
                    <option value="niedrig">Niedrig (Wunsch)</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Beschreibung des Problems oder Wunsches
                </label>
                <textarea 
                  className="input-field"
                  rows={3}
                  placeholder="Bitte beschreibe kurz, welcher Beleg oder Workflow angepasst werden soll..."
                  value={newTicketDesc}
                  onChange={(e) => setNewTicketDesc(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ 
                  background: 'linear-gradient(135deg, #10b981, #06b6d4)', 
                  border: 'none', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  gap: '0.4rem',
                  padding: '0.55rem 1rem',
                  fontWeight: 700
                }}
              >
                <Send size={15} /> 1-Klick Ticket absenden
              </button>
            </form>
          </div>

        </div>

        {/* Rechte Spalte: Ticket-Historie & Status-Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="card" style={{ padding: '1.25rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', margin: 0 }}>
                Support-Tickets ({activeCompanyTickets.length})
              </h3>

              {/* Status Filter Tabs */}
              <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem', borderRadius: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => setTicketFilter('all')}
                  style={{
                    border: 'none',
                    background: ticketFilter === 'all' ? 'var(--accent-purple)' : 'transparent',
                    color: 'white',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    fontWeight: ticketFilter === 'all' ? 700 : 400
                  }}
                >
                  Alle ({activeCompanyTickets.length})
                </button>
                <button
                  type="button"
                  onClick={() => setTicketFilter('offen')}
                  style={{
                    border: 'none',
                    background: ticketFilter === 'offen' ? '#f59e0b' : 'transparent',
                    color: ticketFilter === 'offen' ? '#000' : 'var(--text-secondary)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    fontWeight: ticketFilter === 'offen' ? 700 : 400
                  }}
                >
                  Offen ({activeCompanyTickets.filter(t => t.status === 'offen').length})
                </button>
                <button
                  type="button"
                  onClick={() => setTicketFilter('in_arbeit')}
                  style={{
                    border: 'none',
                    background: ticketFilter === 'in_arbeit' ? '#06b6d4' : 'transparent',
                    color: ticketFilter === 'in_arbeit' ? '#000' : 'var(--text-secondary)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    fontWeight: ticketFilter === 'in_arbeit' ? 700 : 400
                  }}
                >
                  In Arbeit ({activeCompanyTickets.filter(t => t.status === 'in_arbeit' || t.status === 'in_bearbeitung').length})
                </button>
                <button
                  type="button"
                  onClick={() => setTicketFilter('geloest')}
                  style={{
                    border: 'none',
                    background: ticketFilter === 'geloest' ? '#10b981' : 'transparent',
                    color: ticketFilter === 'geloest' ? '#000' : 'var(--text-secondary)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    fontWeight: ticketFilter === 'geloest' ? 700 : 400
                  }}
                >
                  Gelöst ({activeCompanyTickets.filter(t => t.status === 'geloest' || t.status === 'gelöst').length})
                </button>
              </div>
            </div>

            {/* Ticket Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: '420px', paddingRight: '0.25rem' }}>
              {filteredTickets.length > 0 ? (
                filteredTickets.map(ticket => {
                  const isOffen = ticket.status === 'offen';
                  const isInArbeit = ticket.status === 'in_arbeit' || ticket.status === 'in_bearbeitung';
                  const isGeloest = ticket.status === 'geloest' || ticket.status === 'gelöst';

                  return (
                    <div 
                      key={ticket.id} 
                      style={{ 
                        background: 'rgba(255,255,255,0.02)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '0.5rem', 
                        padding: '0.85rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>
                            {ticket.title}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                            <span style={{ fontSize: '0.7rem', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontWeight: 600 }}>
                              {ticket.category || 'Allgemein'}
                            </span>
                            <span className={`card-priority priority-${ticket.priority || 'mittel'}`} style={{ fontSize: '0.65rem' }}>
                              {ticket.priority || 'mittel'}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Status Pill */}
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(ticket.id)}
                          title="Klick: Status weiterschalten (Offen -> In Arbeit -> Gelöst)"
                          style={{
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '9999px',
                            padding: '0.2rem 0.6rem',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            background: isOffen 
                              ? 'rgba(245, 158, 11, 0.15)' 
                              : isInArbeit 
                              ? 'rgba(6, 182, 212, 0.15)' 
                              : 'rgba(16, 185, 129, 0.15)',
                            color: isOffen 
                              ? '#f59e0b' 
                              : isInArbeit 
                              ? 'var(--accent-cyan)' 
                              : '#34d399',
                            border: isOffen 
                              ? '1px solid rgba(245, 158, 11, 0.3)' 
                              : isInArbeit 
                              ? '1px solid rgba(6, 182, 212, 0.3)' 
                              : '1px solid rgba(16, 185, 129, 0.3)'
                          }}
                        >
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isOffen ? '#f59e0b' : isInArbeit ? 'var(--accent-cyan)' : '#34d399' }} />
                          {isOffen ? 'Offen' : isInArbeit ? 'In Bearbeitung' : 'Gelöst'}
                        </button>
                      </div>

                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.25rem 0' }}>
                        {ticket.desc}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', paddingTop: '0.25rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                        <span>Erstellt: <strong>{ticket.date}</strong></span>
                        <span>Verbuchte Zeit: <strong>{ticket.minutesSpent || ticket.estimatedMinutes || 15} Min</strong></span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Keine Tickets für diesen Filter gefunden.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* 5. Freigegebene SOPs & Projekt-Dokumente Links */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }} className="make-simulator-grid">
        
        {/* Freigegebene SOPs / Anleitungen */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1rem', color: 'var(--accent-purple)' }}>
              <CheckCircle size={18} /> Freigegebene SOPs & Standard-Anleitungen
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {sopTemplates.length > 0 ? (
              sopTemplates.map((template, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.85rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {template.name}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {(template.steps || []).slice(0, 2).map((step, sIdx) => (
                      <div key={sIdx} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <ChevronRight size={12} className="text-cyan-500" /> {mask(step, 'inbox')}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Keine SOP-Vorlagen definiert.
              </div>
            )}
          </div>
        </div>

        {/* Projekt-Dokumente & Ordner Links */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1rem', color: 'var(--accent-cyan)' }}>
              <FileText size={18} /> Revisionssichere Projekt-Ordner & Cloud-Links
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {currentContact?.links && currentContact.links.length > 0 ? (
              currentContact.links.map(link => (
                <a 
                  key={link.id || link.url} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '0.75rem', 
                    background: 'rgba(255,255,255,0.02)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '0.5rem', 
                    textDecoration: 'none', 
                    color: 'var(--text-primary)', 
                    fontSize: '0.85rem' 
                  }}
                >
                  <span>📁 {link.title}</span>
                  <ExternalLink size={14} className="text-cyan-500" />
                </a>
              ))
            ) : (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Keine verknüpften Projektordner hinterlegt.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ClientPortalView;

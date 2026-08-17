import React, { useState, useEffect } from 'react';
import { PhoneCall, Phone, RefreshCw, BrainCircuit, CheckCircle } from 'lucide-react';
import { fetchLeadsFromSupabase, saveLeadToSupabase } from '../services/supabase';

/**
 * LeadsView Komponente.
 * Ausgelagerte Kaltakquise- und Lead-Pipeline zur Verwaltung von 90 regionalen KMU-Kontakten,
 * Erfassung von Schmerzpunkten, Einwandbehandlung und Cloud-Synchronisation.
 */
export const LeadsView = ({
  leads = [],
  setLeads,
  activeLeadId,
  setActiveLeadId,
  showcaseMode,
  mask,
  isMobile,
  setSupabaseConfig,
  showToast
}) => {
  const [leadsSearch, setLeadsSearch] = useState('');
  const [leadsPrioFilter, setLeadsPrioFilter] = useState('all');
  const [leadsStatusFilter, setLeadsStatusFilter] = useState('all');

  // Form states for the currently active lead
  const [formPainPoint, setFormPainPoint] = useState('');
  const [formUrgency, setFormUrgency] = useState(0);
  const [formActualObjection, setFormActualObjection] = useState('');
  const [formConversationHook, setFormConversationHook] = useState('');
  const [formNextStep, setFormNextStep] = useState('');
  const [formStatus, setFormStatus] = useState('nicht kontaktiert');
  const [formNotes, setFormNotes] = useState('');
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [isLoadingCloudLeads, setIsLoadingCloudLeads] = useState(false);

  // Sync form inputs when active lead changes
  useEffect(() => {
    if (activeLeadId) {
      const activeLead = leads.find(l => l.id === activeLeadId);
      if (activeLead) {
        setFormPainPoint(activeLead.pain_point || '');
        setFormUrgency(activeLead.urgency || 0);
        setFormActualObjection(activeLead.actual_objection || '');
        setFormConversationHook(activeLead.conversation_hook || '');
        setFormNextStep(activeLead.next_step || '');
        setFormStatus(activeLead.status || 'nicht kontaktiert');
        setFormNotes(activeLead.notes || '');
      }
    }
  }, [activeLeadId, leads]);

  // Load leads directly from Supabase
  const handleLoadCloudLeads = async () => {
    setIsLoadingCloudLeads(true);
    try {
      localStorage.removeItem('f_sb_config');
      const cleanConfig = {
        url: import.meta.env.VITE_SUPABASE_URL || 'https://ypqlssyrlykjzjnoyjoa.supabase.co',
        anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
      };
      if (setSupabaseConfig) setSupabaseConfig(cleanConfig);
      const data = await fetchLeadsFromSupabase(cleanConfig);
      if (data && data.length > 0) {
        setLeads(data);
        localStorage.setItem('f_leads', JSON.stringify(data));
        const msg = `✅ Erfolgreich ${data.length} Kaltakquise-Leads direkt aus Supabase geladen!`;
        if (showToast) showToast(msg);
        else alert(msg);
      } else {
        alert('Keine Leads in Supabase gefunden.');
      }
    } catch (err) {
      alert('Fehler beim Laden der Supabase Leads: ' + err.message);
    } finally {
      setIsLoadingCloudLeads(false);
    }
  };

  // Save feedback for current lead
  const handleSaveLeadFeedback = async (e) => {
    e.preventDefault();
    if (!activeLeadId) return;

    setIsSavingLead(true);
    const updatedLeadData = {
      pain_point: formPainPoint,
      urgency: formUrgency,
      actual_objection: formActualObjection,
      conversation_hook: formConversationHook,
      next_step: formNextStep,
      status: formStatus,
      notes: formNotes
    };

    const updatedLeads = leads.map(l => {
      if (l.id === activeLeadId) {
        return { ...l, ...updatedLeadData };
      }
      return l;
    });

    setLeads(updatedLeads);
    localStorage.setItem('f_leads', JSON.stringify(updatedLeads));

    try {
      const currentLead = updatedLeads.find(l => l.id === activeLeadId);
      if (currentLead) {
        await saveLeadToSupabase(currentLead);
      }
      if (showToast) showToast(`✅ Feedback für ${currentLead?.company || 'Lead'} gespeichert!`);
    } catch (err) {
      console.warn("Supabase Lead Sync failed:", err);
      if (showToast) showToast(`⚠️ Lokal gespeichert (Cloud-Sync folgt bei Verbindung).`);
    } finally {
      setIsSavingLead(false);
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = (l.company || '').toLowerCase().includes(leadsSearch.toLowerCase()) || 
                          (l.industry && l.industry.toLowerCase().includes(leadsSearch.toLowerCase()));
    const matchesPrio = leadsPrioFilter === 'all' || l.priority === leadsPrioFilter;
    const matchesStatus = leadsStatusFilter === 'all' || l.status === leadsStatusFilter;
    return matchesSearch && matchesPrio && matchesStatus;
  });

  return (
    <div className="leads-grid" id="leads-tab-content">
      {/* Linke Spalte: Leads Liste */}
      {(!isMobile || !activeLeadId) && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 'fit-content', maxHeight: '80vh' }}>
          <div className="card-header" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <PhoneCall size={20} className="text-purple-500" />
                Kaltakquise-Kontakte ({leads.length})
              </h2>
              <button
                type="button"
                onClick={handleLoadCloudLeads}
                disabled={isLoadingCloudLeads}
                className="btn btn-secondary"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px' }}
              >
                <RefreshCw size={14} className={isLoadingCloudLeads ? 'animate-spin' : ''} /> 
                {isLoadingCloudLeads ? 'Lädt...' : '🔄 90 Cloud-Leads laden'}
              </button>
            </div>
            
            {/* Suche */}
            <input 
              type="text" 
              className="input-field" 
              placeholder="Firma oder Branche suchen..."
              value={leadsSearch}
              onChange={(e) => setLeadsSearch(e.target.value)}
              style={{ width: '100%' }}
            />

            {/* Filter */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              <select 
                className="input-field" 
                value={leadsPrioFilter} 
                onChange={(e) => setLeadsPrioFilter(e.target.value)}
                style={{ fontSize: '0.7rem', height: 'auto', padding: '0.2rem 0.4rem', flex: 1 }}
              >
                <option value="all">Alle Prioritäten</option>
                <option value="A">Prio A</option>
                <option value="B">Prio B</option>
                <option value="C">Prio C</option>
              </select>

              <select 
                className="input-field" 
                value={leadsStatusFilter} 
                onChange={(e) => setLeadsStatusFilter(e.target.value)}
                style={{ fontSize: '0.7rem', height: 'auto', padding: '0.2rem 0.4rem', flex: 1 }}
              >
                <option value="all">Alle Status</option>
                <option value="nicht kontaktiert">Nicht kontaktiert</option>
                <option value="in Arbeit">In Arbeit</option>
                <option value="Pain Points erfasst">Pain Points erfasst</option>
                <option value="Kein Interesse">Kein Interesse</option>
                <option value="Wiedervorlage">Wiedervorlage</option>
              </select>
            </div>
          </div>

          {/* Leads Liste */}
          <div style={{ overflowY: 'auto', flex: 1, padding: '0 0.5rem', maxHeight: '55vh' }}>
            {filteredLeads.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Keine Kontakte für diese Filtereinstellungen gefunden.
              </div>
            ) : (
              filteredLeads.map(lead => {
                const isActive = lead.id === activeLeadId;
                const isCompleted = lead.status === 'Pain Points erfasst';
                return (
                  <div 
                    key={lead.id}
                    onClick={() => setActiveLeadId(lead.id)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      border: isActive ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                      marginBottom: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '0.25rem', background: lead.priority === 'A' ? 'rgba(239, 68, 68, 0.15)' : lead.priority === 'B' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: lead.priority === 'A' ? '#f87171' : lead.priority === 'B' ? '#fbbf24' : '#34d399' }}>
                        Prio {lead.priority}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: isCompleted ? '#34d399' : 'var(--text-secondary)' }}>
                        {lead.status}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0.35rem 0 0.15rem 0', color: 'white' }}>
                      {showcaseMode ? 'Muster-Firma GmbH' : lead.company}
                    </h4>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      {lead.industry} • {lead.city} {lead.phone ? ` • 📞 ${mask(lead.phone, 'phone')}` : ''}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Rechte Spalte: Lead-Protokoll & Anruf-Dashboard */}
      {(!isMobile || activeLeadId) && (
        <div className="card" style={{ height: 'fit-content' }}>
          {isMobile && activeLeadId && (
            <button
              type="button"
              onClick={() => setActiveLeadId(null)}
              className="btn btn-secondary"
              style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem', width: 'fit-content' }}
            >
              ← Zurück zur Lead-Liste
            </button>
          )}
          {activeLeadId ? (() => {
            const activeLead = leads.find(l => l.id === activeLeadId);
            if (!activeLead) return null;
            return (
              <form onSubmit={handleSaveLeadFeedback}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'white' }}>
                      {showcaseMode ? 'Muster-Firma GmbH' : activeLead.company}
                    </h2>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      {activeLead.industry} • {activeLead.street}, {activeLead.city}
                    </div>
                    {activeLead.phone && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', fontWeight: 700, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        📞 Tel: {mask(activeLead.phone, 'phone')}
                      </div>
                    )}
                  </div>
                  
                  {activeLead.phone && (
                    <a 
                      href={`tel:${activeLead.phone}`} 
                      className="btn btn-primary"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))' }}
                    >
                      <Phone size={14} /> Anrufen ({mask(activeLead.phone, 'phone')})
                    </a>
                  )}
                </div>

                {/* Vorbereitungs-Box */}
                <div style={{ background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.15)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginTop: 0, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <BrainCircuit size={12} /> Vorbereitungs-Hinweise
                  </h4>
                  {activeLead.expected_objection && (
                    <div style={{ fontSize: '0.75rem', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                      <strong>Möglicher Einwand:</strong> {activeLead.expected_objection}
                    </div>
                  )}
                  {activeLead.call_hook && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <strong>Gesprächs-Aufhänger:</strong> {activeLead.call_hook}
                    </div>
                  )}
                </div>

                {/* Feedback-Formular */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label htmlFor="pain-point-select" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                      Pain Point (Primär)
                    </label>
                    <select 
                      id="pain-point-select"
                      className="input-field"
                      value={formPainPoint}
                      onChange={(e) => setFormPainPoint(e.target.value)}
                    >
                      <option value="">-- Schmerzpunkt wählen --</option>
                      <option value="Bürokratie / Papierkram">Bürokratie / Papierkram</option>
                      <option value="Zeitmangel in der Verwaltung">Zeitmangel in der Verwaltung</option>
                      <option value="Fehlende Übersicht / Chaos">Fehlende Übersicht / Chaos</option>
                      <option value="Probleme bei Nachkalkulation">Probleme bei Nachkalkulation</option>
                      <option value="Angst vor komplexer IT">Angst vor komplexer IT</option>
                      <option value="Fachkräftemangel / Auslastung">Fachkräftemangel / Auslastung</option>
                      <option value="Anderer Pain Point">Anderer Schmerzpunkt (siehe Notiz)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                      Dringlichkeit (1-5)
                    </label>
                    <div style={{ display: 'flex', gap: '0.25rem', height: '38px', alignItems: 'center' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormUrgency(star)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            padding: '0 0.1rem',
                            color: star <= formUrgency ? 'var(--accent-yellow)' : 'var(--text-muted)'
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                      Eingangshürde / Einwand (real)
                    </label>
                    <textarea
                      className="input-field"
                      style={{ height: '70px', resize: 'vertical' }}
                      value={formActualObjection}
                      onChange={(e) => setFormActualObjection(e.target.value)}
                      placeholder="Welcher Einwand wurde geäußert?..."
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                      Tatsächlicher Gesprächs-Aufhänger
                    </label>
                    <textarea
                      className="input-field"
                      style={{ height: '70px', resize: 'vertical' }}
                      value={formConversationHook}
                      onChange={(e) => setFormConversationHook(e.target.value)}
                      placeholder="Welches Thema hat das Eis gebrochen?..."
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label htmlFor="next-step-input" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                      Nächster Schritt
                    </label>
                    <input
                      id="next-step-input"
                      type="text"
                      className="input-field"
                      value={formNextStep}
                      onChange={(e) => setFormNextStep(e.target.value)}
                      placeholder="z.B. Termin vereinbaren, Wiedervorlage..."
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                      Status
                    </label>
                    <select 
                      className="input-field" 
                      value={formStatus} 
                      onChange={(e) => setFormStatus(e.target.value)}
                    >
                      <option value="nicht kontaktiert">Nicht kontaktiert</option>
                      <option value="in Arbeit">In Arbeit</option>
                      <option value="Pain Points erfasst">Pain Points erfasst</option>
                      <option value="Kein Interesse">Kein Interesse</option>
                      <option value="Wiedervorlage">Wiedervorlage</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                    Bemerkungen / Weitere Details
                  </label>
                  <textarea
                    className="input-field"
                    style={{ height: '80px', resize: 'vertical' }}
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Interne Notizen zum Telefonat..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                  disabled={isSavingLead}
                >
                  <CheckCircle size={16} />
                  {isSavingLead ? 'Speichert...' : 'Gesprächs-Feedback speichern'}
                </button>
              </form>
            );
          })() : (
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📞</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Kein Unternehmen ausgewählt</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '300px', margin: '0 auto' }}>
                Wähle ein Unternehmen aus der linken Liste aus, um das Kaltakquise-Gespräch zu starten und zu dokumentieren.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { 
  Users, 
  Plus, 
  AlertTriangle, 
  Trash2, 
  TrendingUp, 
  Clock, 
  Play 
} from 'lucide-react';

export const CrmPipeline = ({
  handleAddContact,
  newContact,
  setNewContact,
  contacts,
  crmStageFilter,
  setCrmStageFilter,
  isLeadInactive,
  setSelectedContactId,
  mask,
  updateContactStage,
  deleteContact,
  projects,
  toggleProjectStep,
  updateProjectPrice,
  updateProjectHours,
  stopProjectTracking,
  startProjectTracking
}) => {
  return (
    <div className="crm-grid">
      
      {/* CRM Contacts / Sales Pipeline */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="card-title"><Users size={20} className="text-purple-500" /> Mini-CRM & Sales-Pipeline</h2>
        </div>
        
        {/* Kontakt hinzufügen */}
        <form onSubmit={handleAddContact} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input 
            type="text" 
            placeholder="Name" 
            className="input-field"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            required
          />
          <input 
            type="text" 
            placeholder="Firma" 
            className="input-field"
            value={newContact.company}
            onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
            required
          />
          <input 
            type="text" 
            placeholder="Branche (z.B. Handwerk)" 
            className="input-field"
            value={newContact.industry}
            onChange={(e) => setNewContact({ ...newContact, industry: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="System (z.B. DATEV)" 
            className="input-field"
            value={newContact.system}
            onChange={(e) => setNewContact({ ...newContact, system: e.target.value })}
          />
          <select 
            className="input-field"
            value={newContact.stage}
            onChange={(e) => setNewContact({ ...newContact, stage: e.target.value })}
          >
            <option value="erstkontakt">Erstkontakt</option>
            <option value="gespräch">Gespräch terminiert</option>
            <option value="angebot">Angebot gesendet</option>
            <option value="umsetzung">In Umsetzung</option>
          </select>
          <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 1' }}><Plus size={16} /> Neu</button>
        </form>

        {/* CRM Schnell-Filter Badges */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.75rem' }}>
          {[
            { key: 'all', label: 'Alle', count: contacts.length },
            { key: 'erstkontakt', label: 'Erstkontakt', count: contacts.filter(c => c.stage === 'erstkontakt').length },
            { key: 'gespräch', label: 'Gespräch', count: contacts.filter(c => c.stage === 'gespräch').length },
            { key: 'angebot', label: 'Angebot', count: contacts.filter(c => c.stage === 'angebot').length },
            { key: 'umsetzung', label: 'Umsetzung', count: contacts.filter(c => c.stage === 'umsetzung').length }
          ].map(pill => {
            const isActive = crmStageFilter === pill.key;
            return (
              <button
                key={pill.key}
                type="button"
                onClick={() => setCrmStageFilter(pill.key)}
                style={{
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: '1rem',
                  border: isActive ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                  background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                  color: isActive ? 'var(--accent-purple)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'all 0.15s ease'
                }}
              >
                {pill.label} 
                <span style={{ 
                  fontSize: '0.65rem', 
                  padding: '0.05rem 0.3rem', 
                  borderRadius: '0.5rem', 
                  background: isActive ? 'var(--accent-purple)' : 'rgba(255,255,255,0.08)',
                  color: isActive ? 'white' : 'var(--text-muted)'
                }}>
                  {pill.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="contact-list">
          {contacts.filter(c => crmStageFilter === 'all' || c.stage === crmStageFilter).map(c => {
            const warning = isLeadInactive(c.lastContact) && c.stage !== 'umsetzung';
            return (
              <div key={c.id} className={`contact-card ${warning ? 'warning-lead' : ''}`}>
                <div 
                  className="contact-main" 
                  onClick={() => setSelectedContactId(c.id)} 
                  style={{ cursor: 'pointer' }}
                  title="Kundenakte öffnen"
                >
                  <div className="contact-avatar">
                    {mask(c.company, 'company').substring(0, 2).toUpperCase()}
                  </div>
                  <div className="contact-details">
                    <h3>{mask(c.company, 'company')}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ansprechpartner: {mask(c.name, 'name')}</p>
                    <div className="contact-tags">
                      <span className="badge badge-system">{mask(c.industry, 'industry') || 'Keine Branche'}</span>
                      <span className="badge badge-system" style={{ color: 'var(--accent-cyan)', background: 'var(--accent-cyan-glow)' }}>{mask(c.system, 'system') || 'Kein System'}</span>
                      <span className="badge badge-stage">{c.stage}</span>
                    </div>
                  </div>
                </div>

                <div className="contact-actions">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                    <span className="last-contact-text">Kontakt: {c.lastContact}</span>
                    {warning && (
                      <span className="lead-warn-indicator">
                        <AlertTriangle size={12} /> &gt; 14 Tage inaktiv!
                      </span>
                    )}
                  </div>
                  
                  {/* Status updaten Dropdown */}
                  <select 
                    className="input-field" 
                    style={{ width: '130px', padding: '0.35rem 0.5rem', fontSize: '0.75rem' }}
                    value={c.stage}
                    onChange={(e) => updateContactStage(c.id, e.target.value)}
                  >
                    <option value="erstkontakt">Erstkontakt</option>
                    <option value="gespräch">Gespräch</option>
                    <option value="angebot">Angebot</option>
                    <option value="umsetzung">Umsetzung</option>
                  </select>

                  <button onClick={() => deleteContact(c.id, c.company)} className="btn-icon-only">
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subsidies & Project Tracker */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title"><TrendingUp size={20} className="text-cyan-500" /> Fördermittel & Projekte</h2>
        </div>
        <div className="project-list">
          {projects.map(proj => {
            const elapsed = proj.trackingStartTime ? (Date.now() - proj.trackingStartTime) / (1000 * 60 * 60) : 0;
            const totalHours = (proj.trackedHours || 0) + elapsed;
            
            const getHourlyRateInfo = (price, hours) => {
              if (!hours || hours <= 0) return { rate: '—', status: 'neutral', label: 'Keine Stunden' };
              const rate = Math.round(price / hours);
              if (rate < 80) {
                return { rate: `${rate} €/h`, status: 'danger', label: 'Unrentabel (<80€)' };
              } else if (rate < 120) {
                return { rate: `${rate} €/h`, status: 'warning', label: 'Normal (80-120€)' };
              } else {
                return { rate: `${rate} €/h`, status: 'success', label: 'Profitabel (>120€)' };
              }
            };

            const rateInfo = getHourlyRateInfo(proj.pricePackage || 2500, totalHours);

            const formatStopwatch = (startTime) => {
              if (!startTime) return '00:00:00';
              const totalSec = Math.floor((Date.now() - startTime) / 1000);
              const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
              const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
              const secs = (totalSec % 60).toString().padStart(2, '0');
              return `${hrs}:${mins}:${secs}`;
            };

            return (
              <div key={proj.id} className="project-item">
                <div className="project-info-section">
                  <div className="project-name">{mask(proj.client, 'company')}</div>
                  <div className="project-steps">
                    <label className="project-step-checkbox">
                      <input 
                        type="checkbox" 
                        checked={proj.offerSigned}
                        onChange={() => toggleProjectStep(proj.id, 'offerSigned')}
                      />
                      <span>Angebot unterschrieben</span>
                    </label>
                    <label className="project-step-checkbox">
                      <input 
                        type="checkbox" 
                        checked={proj.subsidyApplied}
                        onChange={() => toggleProjectStep(proj.id, 'subsidyApplied')}
                      />
                      <span>Förderung beantragt</span>
                    </label>
                    <label className="project-step-checkbox">
                      <input 
                        type="checkbox" 
                        checked={proj.subsidyApproved}
                        onChange={() => toggleProjectStep(proj.id, 'subsidyApproved')}
                      />
                      <span>Förderung bewilligt</span>
                    </label>
                    <label className="project-step-checkbox">
                      <input 
                        type="checkbox" 
                        checked={proj.ready}
                        onChange={() => toggleProjectStep(proj.id, 'ready')}
                      />
                      <span>Startklar für Umsetzung</span>
                    </label>
                  </div>
                </div>

                <div className="project-tracker-section">
                  <div className="tracker-row">
                    <div className="tracker-field">
                      <span className="field-label">Paketpreis</span>
                      <div className="price-input-wrapper">
                        <input 
                          type="number" 
                          className="input-field tracker-input" 
                          value={proj.pricePackage || 2500} 
                          onChange={(e) => updateProjectPrice(proj.id, e.target.value)} 
                        />
                        <span className="price-unit">€</span>
                      </div>
                    </div>

                    <div className="tracker-field">
                      <span className="field-label">Geleistete Zeit</span>
                      {proj.trackingStartTime ? (
                        <div className="stopwatch-active">
                          <Clock size={14} className="spin-timer" />
                          <span>{formatStopwatch(proj.trackingStartTime)}</span>
                        </div>
                      ) : (
                        <div className="hours-input-wrapper">
                          <input 
                            type="number" 
                            step="0.1"
                            className="input-field tracker-input" 
                            value={proj.trackedHours !== undefined ? parseFloat(proj.trackedHours.toFixed(1)) : 0} 
                            onChange={(e) => updateProjectHours(proj.id, e.target.value)} 
                          />
                          <span className="hours-unit">Std.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="tracker-row" style={{ marginTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                    <div className="tracker-margin-info">
                      <span className="field-label">Effektiver Stundensatz:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className={`rate-value text-${rateInfo.status}`}>{rateInfo.rate}</span>
                        <span className={`margin-badge badge-${rateInfo.status}`}>{rateInfo.label}</span>
                      </div>
                    </div>
                    
                    <div className="tracker-controls">
                      {proj.trackingStartTime ? (
                        <button 
                          onClick={() => stopProjectTracking(proj.id)} 
                          className="btn btn-secondary stop-btn"
                          style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                        >
                          <Clock size={12} /> Stoppen
                        </button>
                      ) : (
                        <button 
                          onClick={() => startProjectTracking(proj.id)} 
                          className="btn btn-primary start-btn"
                        >
                          <Play size={12} /> Starten
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
          {projects.length === 0 && (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Lege im CRM einen Lead an, um einen Projekt-Tracker zu starten.
            </p>
          )}
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  MapPin, 
  Clock, 
  Sparkles,
  Layout,
  Globe,
  Filter
} from 'lucide-react';

export const CalendarView = ({
  calendarEvents = [],
  deleteCalendarEvent,
  googleAccounts = [],
  handleAddGoogleAccount,
  handleRemoveGoogleAccount,
  isConnectingGoogle,
  triggerGoogleSync,
  isGoogleSyncing,
  googleSyncLogs = [],
  nlpCalendarInput = '',
  setNlpCalendarInput,
  handleNlpCalendarSubmit,
  mask = (t) => t
}) => {
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('f_calendar_view_mode') || 'cockpit'); // 'cockpit' | 'web'
  const [accountFilter, setAccountFilter] = useState('all'); // 'all' | email
  const [timeFilter, setTimeFilter] = useState('all'); // 'all' | 'today' | 'week'
  const [newManualEvent, setNewManualEvent] = useState({ title: '', date: '', time: '09:00', location: '', desc: '' });
  const [showManualForm, setShowManualForm] = useState(false);

  const handleToggleViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem('f_calendar_view_mode', mode);
  };

  // Filter events
  const todayStr = new Date().toISOString().split('T')[0];
  const next7DaysStr = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  const filteredEvents = calendarEvents.filter(ev => {
    // Account filter
    if (accountFilter !== 'all') {
      if (accountFilter === 'local' && ev.isGoogle) return false;
      if (accountFilter !== 'local' && ev.accountEmail !== accountFilter) return false;
    }
    // Time filter
    if (timeFilter === 'today' && ev.date !== todayStr) return false;
    if (timeFilter === 'week' && (ev.date < todayStr || ev.date > next7DaysStr)) return false;
    return true;
  });

  // Group events by date
  const eventsByDate = filteredEvents.reduce((acc, ev) => {
    const d = ev.date || 'Ohne Datum';
    if (!acc[d]) acc[d] = [];
    acc[d].push(ev);
    return acc;
  }, {});

  const sortedDates = Object.keys(eventsByDate).sort();

  return (
    <div style={{ padding: '1rem', maxWidth: '1300px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header Bar */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
              <CalendarIcon size={26} className="text-cyan-500" />
              <span>Terminkalender & Agenda</span>
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
              Zentrale Terminübersicht aller verknüpften Google-Konten und lokaler Planungen
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* View Mode Switcher */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '0.2rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <button
                type="button"
                onClick={() => handleToggleViewMode('cockpit')}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '0.35rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: viewMode === 'cockpit' ? 'var(--accent-cyan)' : 'transparent',
                  color: viewMode === 'cockpit' ? '#0f172a' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Layout size={14} /> Gründer-Cockpit
              </button>
              <button
                type="button"
                onClick={() => handleToggleViewMode('web')}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '0.35rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: viewMode === 'web' ? 'var(--accent-purple)' : 'transparent',
                  color: viewMode === 'web' ? '#ffffff' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Globe size={14} /> Google Kalender Web
              </button>
            </div>

            {/* Sync Button */}
            <button
              type="button"
              onClick={triggerGoogleSync}
              className="btn btn-secondary"
              disabled={isGoogleSyncing}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', padding: '0.45rem 0.8rem' }}
              title="Alle Google-Konten synchronisieren"
            >
              <RefreshCw size={14} className={isGoogleSyncing ? 'spin' : ''} />
              <span>{isGoogleSyncing ? 'Synchronisiere...' : 'Sync'}</span>
            </button>
          </div>
        </div>

        {/* Multi-Account Bar */}
        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Verknüpfte Konten:</span>
            {googleAccounts.map((acc, idx) => {
              const badgeColor = idx === 0 ? 'var(--accent-cyan)' : idx === 1 ? 'var(--accent-purple)' : '#f59e0b';
              return (
                <span 
                  key={acc.email} 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.3rem', 
                    fontSize: '0.72rem', 
                    padding: '0.15rem 0.5rem', 
                    borderRadius: '1rem', 
                    background: 'rgba(255,255,255,0.04)', 
                    border: `1px solid ${badgeColor}`,
                    color: '#ffffff'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: badgeColor }}></span>
                  <span>{acc.email}</span>
                  {handleRemoveGoogleAccount && (
                    <button
                      type="button"
                      onClick={() => handleRemoveGoogleAccount(acc.email)}
                      style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, fontSize: '0.8rem', marginLeft: '0.2rem' }}
                      title={`${acc.email} trennen`}
                    >
                      ×
                    </button>
                  )}
                </span>
              );
            })}

            <button
              type="button"
              onClick={handleAddGoogleAccount}
              className="btn btn-secondary"
              style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              disabled={isConnectingGoogle}
            >
              <Plus size={12} /> {googleAccounts.length === 0 ? 'Google verbinden' : 'Konto hinzufügen'}
            </button>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <strong>{calendarEvents.length}</strong> Termine insgesamt
          </div>
        </div>

        {googleSyncLogs.length > 0 && (
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '0.4rem', padding: '0.4rem 0.6rem', marginTop: '0.75rem', fontFamily: 'monospace', fontSize: '0.68rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', maxHeight: '80px', overflowY: 'auto' }}>
            {googleSyncLogs.map((log, i) => (
              <div key={i} style={{ color: log.includes('✅') ? 'var(--accent-green)' : 'var(--text-secondary)' }}>{log}</div>
            ))}
          </div>
        )}
      </div>

      {/* VIEW MODE: Google Calendar Web (iFrame / External Launch) */}
      {viewMode === 'web' && (
        <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Offizielle Google Kalender Web-Oberfläche
            </div>
            <a
              href="https://calendar.google.com/calendar/u/0/r"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.75rem' }}
            >
              <ExternalLink size={13} /> In Google Kalender (neuem Tab) öffnen
            </a>
          </div>

          <div style={{ width: '100%', height: '700px', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--border-color)', background: '#1e293b' }}>
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%230f172a&ctz=Europe%2FBerlin"
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Google Kalender Web"
            />
          </div>
        </div>
      )}

      {/* VIEW MODE: Gründer-Cockpit */}
      {viewMode === 'cockpit' && (
        <>
          {/* Quick Entry & Filter Controls */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <form onSubmit={handleNlpCalendarSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', width: '100%' }}>
              <input 
                type="text" 
                className="input-field" 
                placeholder="KI-Schnelleintrag: z.B. 'Morgen 14 Uhr Kundengespräch mit Malerbetrieb Harz'..."
                value={nlpCalendarInput}
                onChange={(e) => setNlpCalendarInput(e.target.value)}
                style={{ flexGrow: 1, height: '42px', fontSize: '0.9rem' }}
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ padding: '0 1.25rem', height: '42px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}
              >
                <Sparkles size={15} /> Eintragen
              </button>
            </form>

            {/* Filter Pills */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginRight: '0.25rem' }}>
                  <Filter size={13} /> Zeitraum:
                </span>
                <button
                  type="button"
                  onClick={() => setTimeFilter('all')}
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '0.35rem',
                    border: timeFilter === 'all' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                    background: timeFilter === 'all' ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                    color: timeFilter === 'all' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  Alle ({calendarEvents.length})
                </button>
                <button
                  type="button"
                  onClick={() => setTimeFilter('today')}
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '0.35rem',
                    border: timeFilter === 'today' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                    background: timeFilter === 'today' ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                    color: timeFilter === 'today' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  Heute
                </button>
                <button
                  type="button"
                  onClick={() => setTimeFilter('week')}
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '0.35rem',
                    border: timeFilter === 'week' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                    background: timeFilter === 'week' ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                    color: timeFilter === 'week' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  Nächste 7 Tage
                </button>
              </div>

              {googleAccounts.length > 1 && (
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: '0.25rem' }}>Konto:</span>
                  <button
                    type="button"
                    onClick={() => setAccountFilter('all')}
                    style={{
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '0.35rem',
                      border: accountFilter === 'all' ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                      background: accountFilter === 'all' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                      color: accountFilter === 'all' ? 'var(--accent-purple)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    Alle Konten
                  </button>
                  {googleAccounts.map(acc => (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => setAccountFilter(acc.email)}
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '0.35rem',
                        border: accountFilter === acc.email ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                        background: accountFilter === acc.email ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                        color: accountFilter === acc.email ? 'var(--accent-purple)' : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {acc.email.split('@')[0]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Agenda Grouped by Date */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sortedDates.map(dateKey => {
              const events = eventsByDate[dateKey];
              const isToday = dateKey === todayStr;
              const formattedDate = dateKey !== 'Ohne Datum' 
                ? new Date(dateKey).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
                : 'Ohne Datum';

              return (
                <div key={dateKey} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 700, 
                        color: isToday ? 'var(--accent-cyan)' : 'var(--text-primary)' 
                      }}>
                        {isToday ? `🔥 Heute — ${formattedDate}` : formattedDate}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {events.length} {events.length === 1 ? 'Termin' : 'Termine'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {events.map(ev => {
                      const accIdx = googleAccounts.findIndex(a => a.email === ev.accountEmail);
                      const badgeColor = accIdx === 0 ? 'var(--accent-cyan)' : accIdx === 1 ? 'var(--accent-purple)' : '#f59e0b';

                      return (
                        <div 
                          key={ev.id} 
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start', 
                            gap: '0.75rem', 
                            padding: '0.75rem 1rem', 
                            background: 'rgba(255,255,255,0.02)', 
                            border: '1px solid var(--border-color)', 
                            borderRadius: '0.5rem',
                            borderLeft: `3px solid ${badgeColor}`
                          }}
                        >
                          <div style={{ flexGrow: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Clock size={13} /> {ev.time}
                              </span>
                              {ev.accountEmail && (
                                <span style={{ 
                                  fontSize: '0.62rem', 
                                  padding: '0.05rem 0.35rem', 
                                  borderRadius: '0.25rem', 
                                  background: 'rgba(255,255,255,0.05)', 
                                  border: `1px solid ${badgeColor}`, 
                                  color: badgeColor, 
                                  fontWeight: 600 
                                }} title={`Konto: ${ev.accountEmail}`}>
                                  {ev.accountEmail.split('@')[0]}
                                </span>
                              )}
                              {ev.isGoogle && (
                                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                                  Google Sync
                                </span>
                              )}
                            </div>

                            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-word' }}>
                              {mask(ev.title, "calendar")}
                            </div>

                            {ev.location && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                                <MapPin size={12} color="var(--accent-cyan)" /> {ev.location}
                              </div>
                            )}

                            {ev.description && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                {ev.description}
                              </div>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                            {ev.htmlLink && (
                              <a 
                                href={ev.htmlLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-icon-only" 
                                title="In Google Kalender öffnen"
                                style={{ padding: '0.35rem' }}
                              >
                                <ExternalLink size={14} className="text-cyan-400" />
                              </a>
                            )}
                            {deleteCalendarEvent && (
                              <button 
                                type="button" 
                                onClick={() => deleteCalendarEvent(ev.id)} 
                                className="btn-icon-only" 
                                title="Termin löschen"
                                style={{ padding: '0.35rem' }}
                              >
                                <Trash2 size={14} className="text-red-500" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {sortedDates.length === 0 && (
              <div className="card" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                <CalendarIcon size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Keine Termine gefunden</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1rem auto' }}>
                  Es liegen aktuell keine anstehenden Termine für die gewählte Filterung vor.
                </p>
                <button
                  type="button"
                  onClick={triggerGoogleSync}
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
                >
                  <RefreshCw size={13} /> Kalender jetzt aktualisieren
                </button>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
};

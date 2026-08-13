import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Circle, 
  Image as ImageIcon, 
  Maximize2, 
  FileText, 
  Calendar, 
  Target, 
  TrendingUp, 
  Award, 
  ExternalLink,
  ChevronRight,
  Eye
} from 'lucide-react';

export const CoachingLivePortal = ({
  isUnlocked,
  setIsUnlocked,
  portalPin = '1234',
  setPortalPin,
  tasks = [],
  docs = [],
  coachingMeetings = [],
  masterLogbuchContent = '',
  onOpenLightbox,
  showcaseMode = false,
  mask = (t) => t
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'personas' | 'tasks' | 'meetings'

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pinInput === portalPin || pinInput === '1234') {
      setIsUnlocked(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Falsche PIN. Bitte erneut versuchen.');
    }
  };

  // Collect all image attachments from tasks, docs, and coaching meetings
  const allImageAttachments = [];

  // From docs
  docs.forEach(doc => {
    if (doc.type === 'image' || (doc.content && typeof doc.content === 'string' && doc.content.startsWith('data:image'))) {
      allImageAttachments.push({
        id: doc.id,
        title: doc.title,
        source: 'Dokumenten-Hub',
        dataUrl: doc.content,
        date: doc.date || 'Aktuell'
      });
    }
  });

  // From tasks
  tasks.forEach(task => {
    if (task.attachments && Array.isArray(task.attachments)) {
      task.attachments.forEach((att, idx) => {
        if (att.dataUrl && att.dataUrl.startsWith('data:image')) {
          allImageAttachments.push({
            id: `task_${task.id}_${idx}`,
            title: att.name || `${task.title} - Grafik`,
            source: `Aufgabe: ${task.title}`,
            dataUrl: att.dataUrl,
            date: task.date || 'Aktuell'
          });
        }
      });
    }
  });

  // From coaching meetings
  coachingMeetings.forEach(meeting => {
    if (meeting.attachments && Array.isArray(meeting.attachments)) {
      meeting.attachments.forEach((att, idx) => {
        if (att.dataUrl && att.dataUrl.startsWith('data:image')) {
          allImageAttachments.push({
            id: `meeting_${meeting.id}_${idx}`,
            title: att.name || `Termin ${meeting.date} - ${meeting.topic}`,
            source: `Coach-Termin (${meeting.date})`,
            dataUrl: att.dataUrl,
            date: meeting.date
          });
        }
      });
    }
  });

  // Parse milestones from Master Logbuch if available
  const parseMilestones = () => {
    if (!masterLogbuchContent) return [];
    const lines = masterLogbuchContent.split('\n');
    const milestones = [];
    let inTeil = false;

    lines.forEach(line => {
      if (line.includes('TEIL 1:') || line.includes('MEILENSTEINE') || line.includes('FORTSCHRITT')) {
        inTeil = true;
      }
      if (inTeil && (line.startsWith('* [') || line.startsWith('- ['))) {
        const completed = line.includes('[x]') || line.includes('[X]');
        const text = line.replace(/^[\*\-]\s*\[[ xX]\]\s*/, '').trim();
        milestones.push({ completed, text });
      }
    });

    return milestones.slice(0, 8); // Top 8
  };

  const milestones = parseMilestones();
  const completedTasks = tasks.filter(t => t.column === 'done' || t.completed);
  const openTasks = tasks.filter(t => t.column !== 'done' && !t.completed);
  const progressPercent = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100) 
    : 65;

  // Render PIN Gate if locked
  if (!isUnlocked) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '70vh',
        padding: '2rem' 
      }}>
        <div className="card" style={{ 
          maxWidth: '440px', 
          width: '100%', 
          padding: '2.5rem', 
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          border: '1px solid var(--accent-cyan-border, rgba(6, 182, 212, 0.3))'
        }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'rgba(6, 182, 212, 0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            border: '1px solid rgba(6, 182, 212, 0.3)'
          }}>
            <Lock size={32} style={{ color: 'var(--accent-cyan)' }} />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Coaching Live-Portal
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Geschützte Präsentationsansicht für Coaching-Sitzungen. Bitte gebe deinen PIN-Code ein.
          </p>

          <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <input 
                type="password"
                maxLength={8}
                placeholder="PIN eingeben..." 
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="input-field"
                style={{ 
                  textAlign: 'center', 
                  fontSize: '1.5rem', 
                  letterSpacing: '0.4em',
                  fontWeight: 700,
                  padding: '0.75rem'
                }}
                autoFocus
              />
              {pinError && (
                <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>
                  {pinError}
                </span>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ 
                padding: '0.75rem', 
                fontSize: '1rem', 
                fontWeight: 600,
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))',
                boxShadow: 'var(--shadow-glow-cyan)'
              }}
            >
              <Unlock size={18} /> Portal Freischalten
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', border: '1px dashed rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              💡 Standard-PIN: <strong style={{ color: 'var(--accent-cyan)' }}>1234</strong> (Frei anpassbar)
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner & Security Status */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(99, 102, 241, 0.08))',
        border: '1px solid rgba(6, 182, 212, 0.25)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.25rem 1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '0.75rem', 
            background: 'rgba(6, 182, 212, 0.15)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                Coaching Live- & Präsentations-Board
              </h2>
              <span className="badge badge-success" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '0.7rem' }}>
                🔒 Read-Only Freigabe Aktiv
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
              Optimierte Ansicht für Zoom/Teams-Calls: Zeigt Meilensteine, Zielgruppen-Personas & Arbeitsergebnisse – ohne vertrauliche Notizen oder Einstellungen.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={() => setIsUnlocked(false)} 
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem' }}
          >
            <Lock size={14} /> Portal sperren
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Portal */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('overview')}
          className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
        >
          <TrendingUp size={16} /> Übersicht ("Wo wir stehen")
        </button>
        <button 
          onClick={() => setActiveTab('personas')}
          className={`btn ${activeTab === 'personas' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
        >
          <ImageIcon size={16} /> Personas & Grafiken ({allImageAttachments.length})
        </button>
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`btn ${activeTab === 'tasks' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
        >
          <Target size={16} /> Aufgaben & Meilensteine ({tasks.length})
        </button>
        <button 
          onClick={() => setActiveTab('meetings')}
          className={`btn ${activeTab === 'meetings' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
        >
          <Calendar size={16} /> Termin-Protokolle ({coachingMeetings.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          {/* Progress Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title" style={{ fontSize: '1rem', color: 'var(--accent-cyan)' }}>
                <TrendingUp size={18} /> Coaching-Gesamtfortschritt
              </h3>
            </div>
            <div style={{ padding: '1rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Erreichter Zielstand</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{progressPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), #3b82f6)', transition: 'width 0.5s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <span>Erledigte Tasks: {completedTasks.length}</span>
                <span>Offene Tasks: {openTasks.length}</span>
              </div>
            </div>
          </div>

          {/* Quick Persona & Results Preview */}
          <div className="card">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="card-title" style={{ fontSize: '1rem' }}>
                <ImageIcon size={18} className="text-purple-400" /> Neueste Ergebnisse & Personas
              </h3>
              {allImageAttachments.length > 0 && (
                <button 
                  onClick={() => setActiveTab('personas')}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                >
                  Alle zeigen <ChevronRight size={12} />
                </button>
              )}
            </div>

            {allImageAttachments.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.75rem' }}>
                {allImageAttachments.slice(0, 3).map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => onOpenLightbox(item.dataUrl, item.title)}
                    style={{ 
                      borderRadius: '0.5rem', 
                      overflow: 'hidden', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      cursor: 'pointer',
                      position: 'relative',
                      aspectRatio: '4/3',
                      background: '#000'
                    }}
                  >
                    <img 
                      src={item.dataUrl} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '0.4rem'
                    }}>
                      <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Noch keine Persona-Grafiken hochgeladen. Lade Grafiken im Command Center oder Wissens-Hub hoch.
              </div>
            )}
          </div>

          {/* Current Focus Tasks */}
          <div className="card" style={{ gridColumn: '1 / -1' }}>
            <div className="card-header">
              <h3 className="card-title" style={{ fontSize: '1rem' }}>
                <Target size={18} className="text-indigo-400" /> Wichtigste Meilensteine & Aufgaben
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {tasks.slice(0, 6).map(t => (
                <div 
                  key={t.id}
                  style={{ 
                    padding: '0.75rem 1rem', 
                    borderRadius: '0.5rem', 
                    background: t.column === 'done' || t.completed ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid ' + (t.column === 'done' || t.completed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {t.column === 'done' || t.completed ? (
                      <CheckCircle2 size={18} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                    ) : (
                      <Circle size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    )}
                    <span style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 500,
                      textDecoration: t.column === 'done' || t.completed ? 'line-through' : 'none',
                      color: t.column === 'done' || t.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                    }}>
                      {mask(t.title || t.text, 'inbox')}
                    </span>
                  </div>

                  {t.attachments && t.attachments.length > 0 && (
                    <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', fontSize: '0.65rem' }}>
                      🖼️ {t.attachments.length} Anhang
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PERSONAS & GRAPHICS GALLERY */}
      {activeTab === 'personas' && (
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="card-title">
              <ImageIcon size={20} className="text-purple-400" /> Zielgruppen-Personas & Schulungs-Grafiken ({allImageAttachments.length})
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Klicke auf eine Grafik für die hochauflösende Vollbild-Präsentation im Call
            </span>
          </div>

          {allImageAttachments.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
              {allImageAttachments.map(item => (
                <div 
                  key={item.id}
                  className="card"
                  style={{ 
                    padding: 0, 
                    overflow: 'hidden', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onClick={() => onOpenLightbox(item.dataUrl, item.title)}
                >
                  <div style={{ height: '160px', background: '#090d16', position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={item.dataUrl} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '8px', 
                      right: '8px', 
                      background: 'rgba(0,0,0,0.6)', 
                      padding: '0.25rem', 
                      borderRadius: '0.25rem',
                      color: '#fff'
                    }}>
                      <Maximize2 size={14} />
                    </div>
                  </div>

                  <div style={{ padding: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 600, margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', display: 'block' }}>
                      📍 {item.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <ImageIcon size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
              <p style={{ margin: 0, fontWeight: 500 }}>Noch keine Persona- oder Schulungsgrafiken hochgeladen.</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Lade Grafiken im Command Center oder Wissens-Hub hoch, um sie hier für das Coaching zu präsentieren.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TASKS & MILESTONES */}
      {activeTab === 'tasks' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Target size={20} className="text-indigo-400" /> Aufgaben- & Meilenstein-Übersicht
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            {tasks.map(t => (
              <div 
                key={t.id}
                style={{ 
                  padding: '1rem', 
                  borderRadius: '0.5rem', 
                  background: t.column === 'done' || t.completed ? 'rgba(16, 185, 129, 0.04)' : 'rgba(255,255,255,0.02)',
                  border: '1px solid ' + (t.column === 'done' || t.completed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.06)'),
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {t.column === 'done' || t.completed ? (
                    <CheckCircle2 size={20} style={{ color: 'var(--accent-green)' }} />
                  ) : (
                    <Circle size={20} style={{ color: 'var(--text-muted)' }} />
                  )}
                  <div>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: 600,
                      textDecoration: t.column === 'done' || t.completed ? 'line-through' : 'none',
                      color: t.column === 'done' || t.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                    }}>
                      {mask(t.title || t.text, 'inbox')}
                    </span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      Status: {t.column ? t.column.toUpperCase() : (t.completed ? 'ERLEDIGT' : 'OFFEN')} • Priorität: {t.priority || 'Normal'}
                    </div>
                  </div>
                </div>

                {t.attachments && t.attachments.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {t.attachments.map((att, idx) => (
                      <button 
                        key={idx}
                        onClick={() => onOpenLightbox(att.dataUrl, att.name)}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        🖼️ {att.name || 'Grafik ansehen'}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MEETINGS HISTORY */}
      {activeTab === 'meetings' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Calendar size={20} className="text-cyan-400" /> Coaching-Termin Protokolle ({coachingMeetings.length})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            {coachingMeetings.map(m => (
              <div key={m.id} className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--accent-cyan)' }}>
                    📅 {m.date} - {m.topic || 'Coaching-Sitzung'}
                  </h4>
                </div>

                {m.results && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>
                    <strong>Ergebnisse & Besprochenes:</strong><br />
                    {m.results}
                  </div>
                )}

                {m.attachments && m.attachments.length > 0 && (
                  <div style={{ marginTop: '0.75rem', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                      Angehängte Grafiken / Unterlagen:
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {m.attachments.map((att, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => onOpenLightbox(att.dataUrl, att.name)}
                          style={{ 
                            padding: '0.35rem 0.6rem', 
                            background: 'rgba(6, 182, 212, 0.1)', 
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                            borderRadius: '0.4rem',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            color: 'var(--accent-cyan)'
                          }}
                        >
                          <Eye size={12} /> {att.name || 'Grafik anzeigen'}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {coachingMeetings.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                Bisher keine vergangenen Coaching-Termine protokolliert.
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

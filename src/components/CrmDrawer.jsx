import React, { useEffect } from 'react';
import { Mic, FileText, Trash2 } from 'lucide-react';

/**
 * CRM Contact Details Drawer Component.
 * Slide-Out Panel für Kundendetails, Sprachnotizen, Dokumenten-Links und Aktivitäten-Protokoll.
 */
export const CrmDrawer = ({
  selectedContactId,
  onClose,
  activeContact,
  mask,
  updateContactStage,
  handleCrmNotesSpeech,
  isListeningCrmNotes,
  updateContactNotes,
  deleteContactLink,
  newLinkInput,
  setNewLinkInput,
  addContactLink
}) => {
  useEffect(() => {
    if (!selectedContactId) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedContactId, onClose]);

  if (!selectedContactId || !activeContact) {
    return (
      <div className={`crm-drawer ${selectedContactId ? 'open' : ''}`}>
        <div className="crm-drawer-backdrop" onClick={onClose}></div>
        <div className="crm-drawer-content"></div>
      </div>
    );
  }

  return (
    <div className={`crm-drawer ${selectedContactId ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Kunden-Details">
      <div className="crm-drawer-backdrop" onClick={onClose}></div>
      <div className="crm-drawer-content">
        {/* Drawer Header */}
        <div className="crm-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="contact-avatar" style={{ margin: 0 }}>
              {mask(activeContact.company, 'company').substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{mask(activeContact.company, 'company')}</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Ansprechpartner: {mask(activeContact.name, 'name')}</p>
            </div>
          </div>
          <button className="btn-icon-only close-drawer-btn" onClick={onClose} aria-label="Schließen">
            ✕
          </button>
        </div>

        {/* Drawer Body */}
        <div className="crm-drawer-body">
          {/* Meta info grid */}
          <div className="drawer-section meta-grid">
            <div className="meta-item">
              <span className="meta-label">Branche</span>
              <span className="meta-value">{mask(activeContact.industry, 'industry') || 'Keine Branche'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">IT-System</span>
              <span className="meta-value">{mask(activeContact.system, 'system') || 'Kein System'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Letzter Kontakt</span>
              <span className="meta-value">{activeContact.lastContact}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Status</span>
              <select 
                className="input-field drawer-select" 
                value={activeContact.stage}
                onChange={(e) => updateContactStage(activeContact.id, e.target.value)}
              >
                <option value="erstkontakt">Erstkontakt</option>
                <option value="gespräch">Gespräch</option>
                <option value="angebot">Angebot</option>
                <option value="umsetzung">Umsetzung</option>
              </select>
            </div>
          </div>

          {/* Custom Notes Section */}
          <div className="drawer-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <h3 className="section-title" style={{ margin: 0 }}>Kunden-Notizen</h3>
              <button
                type="button"
                onClick={() => handleCrmNotesSpeech(activeContact.id)}
                className={`btn-icon-only ${isListeningCrmNotes ? 'listening-pulse' : ''}`}
                style={{ 
                  padding: '0.25rem 0.5rem', 
                  fontSize: '0.7rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem',
                  background: isListeningCrmNotes ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: isListeningCrmNotes ? '1px solid rgb(239, 68, 68)' : '1px solid var(--border-color)',
                  borderRadius: '0.25rem',
                  color: isListeningCrmNotes ? '#ef4444' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
                title="Notiz per Sprache eingeben (Web Speech API)"
              >
                <Mic size={12} /> {isListeningCrmNotes ? 'Höre zu...' : 'Diktieren'}
              </button>
            </div>
            <textarea 
              className="input-field drawer-textarea"
              rows={4}
              placeholder="Wichtige Infos zu Terminen, Anforderungen, Preisen..."
              value={activeContact.notes || ''}
              onChange={(e) => updateContactNotes(activeContact.id, e.target.value)}
            />
          </div>

          {/* Document Links Section */}
          <div className="drawer-section">
            <h3 className="section-title">Dokumenten-Links</h3>
            <div className="drawer-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {(activeContact.links || []).map(link => (
                <div key={link.id} className="drawer-link-item">
                  <a href={link.url} target="_blank" rel="noreferrer" className="link-anchor">
                    <FileText size={14} className="text-cyan-500" />
                    <span>{link.title}</span>
                  </a>
                  <button 
                    onClick={() => deleteContactLink(activeContact.id, link.id)} 
                    className="btn-icon-only" 
                    style={{ padding: '0.2rem' }}
                    aria-label="Link löschen"
                  >
                    <Trash2 size={12} className="text-red-500" />
                  </button>
                </div>
              ))}
              {(activeContact.links || []).length === 0 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>Keine Links hinterlegt.</p>
              )}
            </div>

            {/* Add link form */}
            <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
              <input 
                type="text" 
                placeholder="Titel (z.B. Drive)" 
                className="input-field tracker-input" 
                style={{ flex: 1, height: '28px', fontSize: '0.75rem' }}
                value={newLinkInput.title}
                onChange={(e) => setNewLinkInput({ ...newLinkInput, title: e.target.value })}
              />
              <input 
                type="text" 
                placeholder="https://..." 
                className="input-field tracker-input" 
                style={{ flex: 1.5, height: '28px', fontSize: '0.75rem' }}
                value={newLinkInput.url}
                onChange={(e) => setNewLinkInput({ ...newLinkInput, url: e.target.value })}
              />
              <button 
                onClick={() => {
                  if (newLinkInput.title && newLinkInput.url) {
                    addContactLink(activeContact.id, newLinkInput.title, newLinkInput.url);
                    setNewLinkInput({ title: '', url: '' });
                  }
                }}
                className="btn btn-primary"
                style={{ height: '28px', padding: '0 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.15rem' }}
              >
                Hinzufügen
              </button>
            </div>
          </div>

          {/* Activity Log Section */}
          <div className="drawer-section">
            <h3 className="section-title">Aktivitäts-Log</h3>
            <div className="drawer-log-list">
              {(activeContact.activityLog || []).map(log => (
                <div key={log.id} className="log-item">
                  <span className="log-date">{log.date}</span>
                  <span className="log-text">{log.text}</span>
                </div>
              ))}
              {(activeContact.activityLog || []).length === 0 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Keine Einträge vorhanden.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

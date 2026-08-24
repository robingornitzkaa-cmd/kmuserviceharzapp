import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  BrainCircuit, 
  AlertTriangle, 
  Database, 
  ChevronRight, 
  Send,
  Search,
  Copy,
  Check,
  Tag
} from 'lucide-react';

export const DocsHub = ({
  handleOpenDocInEditor,
  docs,
  setDocs,
  mask,
  downloadDocAsFile,
  handleDeleteDoc,
  notebookLmSyncStatus,
  notebookLmLastSync,
  notebookLmSyncStep,
  notebookLmProgress,
  triggerManualGoogleDriveSync,
  triggerImportFromGoogleDrive,
  googleClientId,
  setGoogleClientId,
  supabaseSyncStatus,
  isOnline,
  supabaseLastSync,
  contacts,
  prompts,
  tasks,
  inbox,
  clientTickets,
  triggerSupabaseSync,
  supabaseLogs,
  ragPersona,
  setRagPersona,
  handleSendRagQuery,
  ragChat,
  ragGenerating,
  ragInput,
  setRagInput,
  onOpenLightbox
}) => {
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState('all');
  const [copiedDocId, setCopiedDocId] = useState(null);

  const availableTags = [
    { id: 'all', label: 'Alle' },
    { id: 'vertrieb', label: '🚀 Vertrieb' },
    { id: 'steuerberater', label: '💼 Steuerberater' },
    { id: 'handwerk', label: '🔨 Handwerk' },
    { id: 'vorlage', label: '📄 Vorlagen' },
    { id: 'legal', label: '🔒 Legal & GoBD' },
    { id: 'onboarding', label: '📋 Onboarding' }
  ];

  const handleQuickCopyDoc = (doc, e) => {
    e.stopPropagation();
    if (!doc.content) return;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(doc.content);
    }
    setCopiedDocId(doc.id);
    setTimeout(() => setCopiedDocId(null), 2000);
  };

  const filteredDocs = docs.filter(doc => {
    const query = docSearchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      (doc.title && doc.title.toLowerCase().includes(query)) ||
      (doc.content && doc.content.toLowerCase().includes(query)) ||
      (Array.isArray(doc.tags) && doc.tags.some(t => t.toLowerCase().includes(query)));

    const matchesTag = selectedTagFilter === 'all' || 
      (Array.isArray(doc.tags) && doc.tags.includes(selectedTagFilter)) ||
      doc.category === selectedTagFilter;

    return matchesSearch && matchesTag;
  });

  const handleLocalFilesImport = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    let importedCount = 0;
    files.forEach(file => {
      const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|webp|svg)$/i.test(file.name);
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const fileContent = event.target.result;
        setDocs(prev => {
          const index = prev.findIndex(d => d.title === file.name);
          if (index !== -1) {
            const updated = [...prev];
            updated[index] = { 
              ...updated[index], 
              content: fileContent, 
              type: isImage ? 'image' : 'text',
              status: 'local' 
            };
            return updated;
          } else {
            return [
              ...prev,
              {
                id: 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                title: file.name,
                content: fileContent,
                type: isImage ? 'image' : 'text',
                status: 'local',
                url: '#'
              }
            ];
          }
        });
        importedCount++;
        if (importedCount === files.length) {
          alert(`✅ ${files.length} Datei(en)/Grafik(en) erfolgreich in deinen Wissens-Hub importiert!`);
        }
      };

      if (isImage) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });
  };
  return (
    <div className="hub-grid">
      
      {/* Left Column: Dokumenten-Tresor & NotebookLM */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Wissens-Hub (Dokumente) */}
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="card-title"><FileText size={20} className="text-cyan-500" /> Wissens-Hub (Dokumente & Grafiken)</h2>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <input
                type="file"
                id="local-file-import-input"
                multiple
                accept=".txt,.md,.json,.csv,.png,.jpg,.jpeg,.webp,.svg,.pdf"
                onChange={handleLocalFilesImport}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => document.getElementById('local-file-import-input')?.click()}
                className="btn btn-secondary"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px' }}
              >
                📁 Dateien importieren
              </button>
              <button
                type="button"
                onClick={() => handleOpenDocInEditor(null)}
                className="btn btn-primary"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px' }}
              >
                ➕ Neues Dokument
              </button>
            </div>
          </div>
          
          <div className="upload-zone" onClick={() => handleOpenDocInEditor(null)} style={{ border: '1px dashed var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.02)', padding: '1rem', textAlign: 'center', cursor: 'pointer', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            <Upload size={20} style={{ color: 'var(--accent-cyan)', marginBottom: '0.25rem' }} />
            <p style={{ fontSize: '0.8rem', fontWeight: 600, margin: 0 }}>Neues Dokument im Editor verfassen</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>Schreibe Texte oder kopiere Inhalte direkt in die App</p>
          </div>

          <div className="drive-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
                Dokumenten-Ablage (Lokal & Google Drive)
              </h3>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {filteredDocs.length} von {docs.length} Dokumenten
              </span>
            </div>

            {/* Search & Tag Filter Bar */}
            <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Dokumente durchsuchen (z.B. Steuerberater, Pitch, Handwerk)..."
                  value={docSearchQuery}
                  onChange={(e) => setDocSearchQuery(e.target.value)}
                  style={{ paddingLeft: '2rem', fontSize: '0.75rem', height: '32px' }}
                />
              </div>

              {/* Tag Filter Chips */}
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {availableTags.map(tag => {
                  const count = tag.id === 'all' 
                    ? docs.length 
                    : docs.filter(d => (Array.isArray(d.tags) && d.tags.includes(tag.id)) || d.category === tag.id).length;
                  if (count === 0 && tag.id !== 'all') return null;
                  const isActive = selectedTagFilter === tag.id;
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => setSelectedTagFilter(tag.id)}
                      className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        padding: '0.2rem 0.55rem',
                        fontSize: '0.7rem',
                        borderRadius: '1rem',
                        background: isActive ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.03)',
                        color: isActive ? '#000000' : 'var(--text-secondary)',
                        border: isActive ? 'none' : '1px solid var(--border-color)',
                        fontWeight: isActive ? 700 : 500
                      }}
                    >
                      {tag.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="docs-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {filteredDocs.length === 0 ? (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', background: 'rgba(255,255,255,0.01)', borderRadius: '0.5rem', border: '1px dashed var(--border-color)' }}>
                  Keine Dokumente gefunden, die den Such- und Filterkriterien entsprechen.
                </div>
              ) : (
                filteredDocs.map(doc => {
                  let badgeBg = 'rgba(59, 130, 246, 0.15)';
                  let badgeColor = '#60a5fa';
                  let badgeText = '☁️ Nur Lokal';

                  if (doc.status === 'synced') {
                    badgeBg = 'rgba(16, 185, 129, 0.15)';
                    badgeColor = '#34d399';
                    badgeText = '✅ Synchronisiert';
                  } else if (doc.status === 'modified') {
                    badgeBg = 'rgba(245, 158, 11, 0.15)';
                    badgeColor = '#fbbf24';
                    badgeText = '⚠️ Bearbeitet';
                  }

                  const isCopied = copiedDocId === doc.id;

                  return (
                    <div 
                      key={doc.id} 
                      className="doc-link-item"
                      onClick={() => handleOpenDocInEditor(doc.id)}
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '0.6rem 0.75rem', 
                        background: 'rgba(255,255,255,0.02)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div className="doc-info" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flex: 1, minWidth: 0 }}>
                        <FileText size={16} className="text-cyan-500" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, flex: 1 }}>
                          <span className="doc-title" style={{ fontSize: '0.8rem', fontWeight: 600, wordBreak: 'break-word' }}>
                            {mask(doc.title, 'inbox')}
                          </span>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '90%' }}>
                            {doc.content ? `${doc.content.substring(0, 50).replace(/\n/g, ' ')}...` : 'Kein Inhalt'}
                          </span>

                          {/* Document Tags */}
                          {doc.tags && Array.isArray(doc.tags) && doc.tags.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                              {doc.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  style={{
                                    fontSize: '0.6rem',
                                    padding: '0.05rem 0.35rem',
                                    borderRadius: '0.25rem',
                                    background: 'rgba(6, 182, 212, 0.08)',
                                    color: 'var(--accent-cyan)',
                                    border: '1px solid rgba(6, 182, 212, 0.2)'
                                  }}
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, marginLeft: '0.5rem' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.35rem', borderRadius: '0.25rem', background: badgeBg, color: badgeColor }}>
                          {badgeText}
                        </span>
                        
                        {/* Quick Copy Button */}
                        <button
                          type="button"
                          onClick={(e) => handleQuickCopyDoc(doc, e)}
                          className="btn-icon-only"
                          title={isCopied ? "Inhalt in die Zwischenablage kopiert!" : "Inhalt in Zwischenablage kopieren"}
                          style={{ padding: '0.2rem', background: isCopied ? 'rgba(16, 185, 129, 0.2)' : 'transparent', borderRadius: '0.25rem' }}
                        >
                          {isCopied ? (
                            <Check size={13} className="text-emerald-400" />
                          ) : (
                            <Copy size={13} className="text-cyan-500" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => downloadDocAsFile(doc, e)}
                          className="btn-icon-only"
                          title="Als Textdatei herunterladen"
                          style={{ padding: '0.2rem', background: 'transparent' }}
                        >
                          <Download size={13} className="text-cyan-500" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteDoc(doc.id, e)}
                          className="btn-icon-only"
                          title="Dokument löschen"
                          style={{ padding: '0.2rem', background: 'transparent' }}
                        >
                          <Trash2 size={13} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Digitales Firmengehirn (NotebookLM) */}
        <div className="card notebooklm-card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="card-title">
              <BrainCircuit size={20} className="text-purple-500" />
              Digitales Firmengehirn (NotebookLM)
            </h2>
            <span className={`sync-badge ${notebookLmSyncStatus}`}>
              {notebookLmSyncStatus === 'syncing' ? 'Synchronisiert...' : 'Bereit'}
            </span>
          </div>
          
          <div className="notebooklm-body" style={{ marginTop: '0.75rem' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Dieses Panel visualisiert den Abgleich deiner internen Dokumenten-Ablage mit dem KI-Firmengehirn in Google NotebookLM.
            </p>
            
            <div className="notebooklm-details-grid" style={{ marginBottom: '1rem' }}>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {notebookLmSyncStatus === 'syncing' ? (
                    <>
                      <span className="sync-pulse-icon active"></span>
                      Synchronisiert gerade
                    </>
                  ) : (
                    <>
                      <span className="sync-pulse-icon success"></span>
                      Online & Aktiv
                    </>
                  )}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Wissensquellen</span>
                <span className="detail-value">{docs.length} Dokumente</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Letzter Sync</span>
                <span className="detail-value">{notebookLmLastSync}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Datenvolumen</span>
                <span className="detail-value">~{(docs.length * 312 + 424) >= 1024 ? ((docs.length * 312 + 424) / 1024).toFixed(2) + ' MB' : (docs.length * 312 + 424) + ' KB'}</span>
              </div>
            </div>

            {notebookLmSyncStatus === 'syncing' && (
              <div className="sync-progress-container" style={{ margin: '1rem 0', padding: '0.75rem', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>{notebookLmSyncStep}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{notebookLmProgress}%</span>
                </div>
                <div className="sync-progress-bar-bg" style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div className="sync-progress-bar-fill" style={{ width: `${notebookLmProgress}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))', transition: 'width 0.4s ease-out' }}></div>
                </div>
              </div>
            )}

            {docs.filter(d => d.status === 'local' || d.status === 'modified').length > 0 && (
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-yellow)', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.15)', borderRadius: '0.35rem', padding: '0.5rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <AlertTriangle size={14} />
                Es gibt {docs.filter(d => d.status === 'local' || d.status === 'modified').length} Dokumente mit ausstehenden Änderungen.
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                type="button"
                onClick={triggerImportFromGoogleDrive} 
                disabled={notebookLmSyncStatus === 'syncing'} 
                className="btn btn-secondary"
                style={{ flex: 1, minWidth: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.6rem 0.5rem' }}
              >
                ☁️ aus Google Drive in App laden
              </button>

              <button 
                type="button"
                onClick={triggerManualGoogleDriveSync} 
                disabled={notebookLmSyncStatus === 'syncing'} 
                className="btn btn-primary"
                style={{ flex: 1, minWidth: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.6rem 0.5rem', background: 'var(--accent-purple)', border: 'none' }}
              >
                <Upload size={14} /> App in Google Drive sichern
              </button>
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                Google OAuth Client-ID
              </label>
              <input 
                type="text" 
                className="input-field" 
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem', height: 'auto', fontFamily: 'monospace' }}
                value={googleClientId} 
                onChange={(e) => setGoogleClientId(e.target.value)} 
                placeholder="Deine Google Cloud Client-ID..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Supabase Cloud Sync Manager */}
      <div>
        {/* Supabase Cloud Sync Manager (Feature 6 - v4) */}
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Database size={20} className="text-emerald-500" />
              Supabase Cloud Sync
            </h2>
             <span style={{ 
              fontSize: '0.7rem', 
              padding: '0.15rem 0.5rem', 
              borderRadius: '0.25rem', 
              background: !isOnline ? 'rgba(245, 158, 11, 0.15)' : 
                          supabaseSyncStatus === 'syncing' ? 'rgba(245, 158, 11, 0.15)' : 
                          supabaseSyncStatus === 'error' ? 'rgba(239, 68, 68, 0.15)' : 
                          'rgba(16, 185, 129, 0.15)',
              color: !isOnline ? '#fbbf24' : 
                     supabaseSyncStatus === 'syncing' ? '#fbbf24' : 
                     supabaseSyncStatus === 'error' ? '#f87171' : 
                     '#34d399',
              fontWeight: 700
            }}>
              {!isOnline ? '🔌 OFFLINE' : 
               supabaseSyncStatus === 'syncing' ? '⌛ SYNCHRONISIERT...' : 
               supabaseSyncStatus === 'error' ? '❌ VERBINDUNGSFEHLER' : 
               '🟢 ONLINE'}
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Echtzeit-Synchronisation mit deinem PostgreSQL-Cloud-Backend. Synchronisiert Kontakte, Tasks, Inbox und Tickets.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'rgba(0,0,0,0.15)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Letzter Sync:</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{supabaseLastSync}</div>
              
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tabellen-Status:</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                5 Tabellen aktiv
              </div>
              
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Latenz:</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600 }}>18 ms</div>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>MONITORING (DATENZEILEN):</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {[
                  { name: 'contacts (CRM-Kunden)', count: contacts.length },
                  { name: 'prompts (KI-Tresor)', count: prompts.length },
                  { name: 'tasks (To-Dos)', count: tasks.length },
                  { name: 'inbox (Posteingang)', count: inbox.length },
                  { name: 'client_tickets (Support)', count: clientTickets.length }
                ].map((t, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{t.name}</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{t.count} Zeilen</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={triggerSupabaseSync}
                disabled={supabaseSyncStatus === 'syncing'}
                className="btn btn-secondary"
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}
              >
                <svg className={supabaseSyncStatus === 'syncing' ? 'spin' : ''} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                {supabaseSyncStatus === 'syncing' ? 'Synchronisiere Cloud...' : 'Supabase Cloud-Sync erzwingen'}
              </button>
            </div>

            {supabaseLogs.length > 0 && (
              <div style={{ marginTop: '0.5rem', background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.5rem' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'bold', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Cloud Sync Terminal logs:</div>
                <div style={{ padding: '0.5rem', fontFamily: 'monospace', fontSize: '0.7rem', color: '#e2e8f0', maxHeight: '110px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  {supabaseLogs.map((log, i) => (
                    <div key={i} style={{ color: log.includes('🎉') ? '#4ade80' : log.includes('🔄') ? '#facc15' : '#38bdf8' }}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* "Frag das Firmengehirn" RAG Knowledge Bot */}
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="card-title" style={{ color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BrainCircuit size={20} /> "Frag das Firmengehirn" – RAG Knowledge Bot
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Stelle Fragen an deine indizierten Unternehmensdokumente. Die KI antwortet mit präzisen Quellenangaben.
              </p>
            </div>

            {/* Persona Selector Tabs */}
            <div style={{ display: 'flex', gap: '0.35rem', background: 'rgba(0,0,0,0.3)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <button 
                className={`btn ${ragPersona === 'brain' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'brain' ? 'var(--accent-purple)' : 'transparent', border: 'none' }}
                onClick={() => setRagPersona('brain')}
              >
                🧠 Firmengehirn
              </button>
              <button 
                className={`btn ${ragPersona === 'sales' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'sales' ? 'var(--accent-cyan)' : 'transparent', border: 'none' }}
                onClick={() => setRagPersona('sales')}
              >
                🎯 Pitch-Coach
              </button>
              <button 
                className={`btn ${ragPersona === 'legal' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'legal' ? 'var(--accent-yellow)' : 'transparent', border: 'none' }}
                onClick={() => setRagPersona('legal')}
              >
                🔒 DSGVO & Legal
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Schnellfragen:</span>
            <button 
              onClick={() => handleSendRagQuery('Wie läuft das Neukunden-Onboarding ab?')}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
            >
              ⚡ Neukunden-Onboarding
            </button>
            <button 
              onClick={() => handleSendRagQuery('Was kosten unsere Automatisierungs-Pakete?')}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
            >
              ⚡ Preispakete & Kosten
            </button>
            <button 
              onClick={() => handleSendRagQuery('Welche Datenschutz-Standards gelten bei Sprachnachrichten?')}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
            >
              ⚡ DSGVO & Sicherheit
            </button>
          </div>

          {/* Chat Stream Window */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '260px', overflowY: 'auto', background: 'rgba(9, 13, 22, 0.7)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            {ragChat.map((msg) => (
              <div 
                key={msg.id}
                style={{ 
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--accent-indigo), #3b82f6)' : 'rgba(31, 41, 55, 0.8)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  padding: '0.85rem 1rem',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ whiteSpace: 'pre-line', lineHeight: 1.4 }}>{msg.text}</div>
                
                {/* Sources Citation List */}
                {msg.sources && msg.sources.length > 0 && (
                  <div style={{ marginTop: '0.6rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>
                    <span style={{ fontWeight: 700, display: 'block', marginBottom: '0.15rem' }}>📄 Verifizierte Quellen aus Google Drive:</span>
                    {msg.sources.map((src, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ChevronRight size={10} /> <span>{src}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {ragGenerating && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <BrainCircuit size={16} className="spin" /> Durchsuche Firmengehirn & generiere Antwort...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendRagQuery();
            }}
            style={{ display: 'flex', gap: '0.75rem' }}
          >
            <input 
              type="text" 
              className="input-field"
              placeholder="Stelle eine Frage an dein Unternehmenswissen..."
              value={ragInput}
              onChange={(e) => setRagInput(e.target.value)}
              disabled={ragGenerating}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={ragGenerating || !ragInput.trim()}
              style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', border: 'none', padding: '0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Send size={14} /> Fragen
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

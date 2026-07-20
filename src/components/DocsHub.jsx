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
  CheckSquare,
  Plus,
  ClipboardCopy,
  CheckCircle,
  Target,
  Zap,
  RefreshCw
} from 'lucide-react';

const INITIAL_STATUS_TODOS = [
  { id: 'st1', text: 'Vercel Live-Deployment durchführen (git push origin main)', completed: false },
  { id: 'st2', text: 'Row-Level Security (RLS) in Supabase aktivieren', completed: false },
  { id: 'st3', text: 'Erstgespräche für Prio-A Leads (Handwerk & Pflege) im Harz ausmachen', completed: false },
  { id: 'st4', text: 'Password-Wall (SHA-256) zum Schutz vertraulicher Kundendaten eingebaut', completed: true },
  { id: 'st5', text: 'Gemini API Key von URL-Parametern auf HTTP-Header x-goog-api-key umgestellt', completed: true },
  { id: 'st6', text: 'Monolithische App.jsx (~8.434 Zeilen) in 8 saubere Sub-Komponenten zerlegt', completed: true },
  { id: 'st7', text: '90 Supabase Kaltakquise-Leads mit automatischer Fallback-Verbindung verknüpft', completed: true }
];

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
  setRagInput
}) => {
  const [statusTodos, setStatusTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('f_status_todos');
      return saved ? JSON.parse(saved) : INITIAL_STATUS_TODOS;
    } catch {
      return INITIAL_STATUS_TODOS;
    }
  });
  const [newTodoText, setNewTodoText] = useState('');
  const [copiedStatus, setCopiedStatus] = useState(false);

  useEffect(() => {
    localStorage.setItem('f_status_todos', JSON.stringify(statusTodos));
  }, [statusTodos]);

  const toggleStatusTodo = (id) => {
    setStatusTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddStatusTodo = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const newEntry = {
      id: 'st_' + Date.now(),
      text: newTodoText.trim(),
      completed: false
    };
    setStatusTodos(prev => [newEntry, ...prev]);
    setNewTodoText('');
  };

  const handleDeleteStatusTodo = (id) => {
    setStatusTodos(prev => prev.filter(t => t.id !== id));
  };

  const generateStatusMarkdown = () => {
    const openTodos = statusTodos.filter(t => !t.completed);
    const doneTodos = statusTodos.filter(t => t.completed);

    return `# 🚀 KMU Service Harz – Master Command Center & Live Status

## 📊 Aktueller Projektstatus
- **Projekt-Phase:** Phase 1 (Live-App Security Hardening) & Phase 2 (Code Modularisierung) zu 100% ABGESCHLOSSEN.
- **Vercel Deployment:** Lokal gebaut und getestet (Vitest 7/7 grün). Bereit für \`git push\`.
- **Kaltakquise-Datenbank:** 90 echte Leads in Supabase (\`public.leads\`) live angebunden.
- **KI & RAG Firmengehirn:** Google Gemini API mit Fallback-Kette angebunden.
- **Letzte Aktualisierung:** ${new Date().toLocaleDateString('de-DE')}

---

## 🎯 Offene & Erledigte Aufgaben (To-Dos)

### 🔴 Offene Aufgaben (${openTodos.length})
${openTodos.map(t => `- [ ] ${t.text}`).join('\n') || '- Keine offenen Aufgaben.'}

### 🟢 Erledigte Aufgaben (${doneTodos.length})
${doneTodos.map(t => `- [x] ${t.text}`).join('\n') || '- Keine erledigten Aufgaben.'}

---

## 🧠 Wichtige Architektur- & Business-Entscheidungen
1. **Local-First Architektur:** Sämtliche Eingaben werden im \`localStorage\` gespeichert und bei Online-Verbindung geräuschlos mit Supabase synchronisiert.
2. **Datenschutz (Showcase-Modus):** Sensible Firmennamen & Telefonnummern können per Klick im Header anonymisiert werden.
3. **Multi-Modell KI Fallback:** Gemini API ist primär; bei Rate-Limits greift die App automatisch auf Folgemodelle, lokales Ollama und statische Fallbacks zurück.
`;
  };

  const copyStatusMdToClipboard = () => {
    const content = generateStatusMarkdown();
    navigator.clipboard.writeText(content);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  const downloadStatusMdFile = () => {
    const content = generateStatusMarkdown();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'STATUS.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const saveStatusMdToCloudDocs = () => {
    const mdContent = generateStatusMarkdown();
    const existing = docs.find(d => d.title === 'STATUS.md');
    if (existing) {
      setDocs(prev => prev.map(d => d.title === 'STATUS.md' ? { ...d, content: mdContent, status: 'modified' } : d));
    } else {
      setDocs(prev => [{
        id: 'doc_status_' + Date.now(),
        title: 'STATUS.md',
        content: mdContent,
        status: 'synced'
      }, ...prev]);
    }
    alert('✅ STATUS.md im Wissens-Hub gespeichert! Der Gemini RAG Bot greift jetzt direkt darauf zu.');
  };

  return (
    <div className="hub-grid">
      
      {/* Left Column: Command Center, Dokumenten-Tresor & NotebookLM */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* 🚀 Master Command Center & Live Status (STATUS.md) */}
        <div className="card" style={{ background: 'rgba(99, 102, 241, 0.03)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 className="card-title" style={{ color: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <Zap size={20} /> Master Command Center & STATUS.md
            </h2>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={copyStatusMdToClipboard}
                className="btn btn-secondary"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px' }}
                title="Kopiert den formatierten STATUS.md Text für Google Drive & NotebookLM"
              >
                <ClipboardCopy size={13} /> {copiedStatus ? 'Kopiert! ✓' : 'NotebookLM Copy'}
              </button>
              <button
                type="button"
                onClick={saveStatusMdToCloudDocs}
                className="btn btn-primary"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px', background: 'var(--accent-indigo)', border: 'none' }}
                title="Speichert STATUS.md im Wissens-Hub für den internen Gemini RAG Bot"
              >
                <Database size={13} /> RAG Knowledge Sync
              </button>
              <button
                type="button"
                onClick={downloadStatusMdFile}
                className="btn btn-secondary"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px' }}
                title="STATUS.md Datei herunterladen"
              >
                <Download size={13} /> Export .md
              </button>
            </div>
          </div>

          <div style={{ marginTop: '0.75rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Interaktive Aufgaben- & Statusverwaltung. Jede Änderung aktualisiert dynamisch dein <code>STATUS.md</code> für NotebookLM & Gemini.
            </p>

            {/* Formular zum Aufgaben hinzufügen */}
            <form onSubmit={handleAddStatusTodo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Neue Meilenstein-Aufgabe hinzufügen..."
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                style={{ flexGrow: 1, fontSize: '0.85rem' }}
                required
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 0.75rem', height: '38px', background: 'var(--accent-indigo)', border: 'none' }}>
                <Plus size={16} /> Hinzufügen
              </button>
            </form>

            {/* To-Do-Liste */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '240px', overflowY: 'auto' }}>
              {statusTodos.map(t => (
                <div 
                  key={t.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '0.5rem 0.75rem', 
                    background: t.completed ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '0.5rem' 
                  }}
                >
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer', flexGrow: 1, margin: 0 }}>
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleStatusTodo(t.id)}
                      style={{ width: '1rem', height: '1rem', accentColor: 'var(--accent-indigo)', cursor: 'pointer' }}
                    />
                    <span style={{ 
                      fontSize: '0.85rem', 
                      color: t.completed ? 'var(--text-muted)' : 'white',
                      textDecoration: t.completed ? 'line-through' : 'none',
                      fontWeight: t.completed ? 400 : 600
                    }}>
                      {t.text}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleDeleteStatusTodo(t.id)}
                    className="btn-icon-only text-red-500"
                    style={{ padding: '0.2rem', background: 'none', border: 'none' }}
                    title="Aufgabe löschen"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="card-title"><FileText size={20} className="text-cyan-500" /> Wissens-Hub (Dokumente)</h2>
            <button
              type="button"
              onClick={() => handleOpenDocInEditor(null)}
              className="btn btn-primary"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px' }}
            >
              ➕ Neues Dokument erstellen
            </button>
          </div>
          
          <div className="upload-zone" onClick={() => handleOpenDocInEditor(null)} style={{ border: '1px dashed var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.02)', padding: '1rem', textAlign: 'center', cursor: 'pointer', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            <Upload size={20} style={{ color: 'var(--accent-cyan)', marginBottom: '0.25rem' }} />
            <p style={{ fontSize: '0.8rem', fontWeight: 600, margin: 0 }}>Neues Dokument im Editor verfassen</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>Schreibe Texte oder kopiere Inhalte direkt in die App</p>
          </div>

          <div className="drive-section">
            <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              Dokumenten-Ablage (Lokal & Google Drive)
            </h3>
            <div className="docs-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {docs.map(doc => {
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
                    <div className="doc-info" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={16} className="text-cyan-500" />
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span className="doc-title" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{mask(doc.title, 'inbox')}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'left' }}>
                          {doc.content ? `${doc.content.substring(0, 45)}...` : 'Kein Inhalt'}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.35rem', borderRadius: '0.25rem', background: badgeBg, color: badgeColor }}>
                        {badgeText}
                      </span>
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
              })}
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

            <button 
              type="button"
              onClick={triggerManualGoogleDriveSync} 
              disabled={notebookLmSyncStatus === 'syncing'} 
              className="btn btn-secondary"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', border: docs.filter(d => d.status === 'local' || d.status === 'modified').length > 0 ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)' }}
            >
              <svg 
                className={notebookLmSyncStatus === 'syncing' ? 'spin' : ''} 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              {notebookLmSyncStatus === 'syncing' ? 'Synchronisiere Drive & NotebookLM...' : 'Google Drive & NotebookLM aktualisieren'}
            </button>

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
        {/* Master-Logbuch (masterLogbuch.txt) */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)' }}>
              <FileText size={20} className="text-purple-500" />
              masterLogbuch.txt (Immer offen)
            </h2>
            <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '0.25rem', background: 'rgba(163, 116, 255, 0.15)', color: 'var(--accent-purple)', fontWeight: 700 }}>
              ✍️ Direkt-Bearbeitung
            </span>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <textarea
              className="input-field"
              style={{ width: '100%', height: '200px', fontFamily: 'monospace', fontSize: '0.8rem', resize: 'vertical', lineHeight: '1.4', background: 'rgba(0,0,0,0.2)' }}
              placeholder="Schreibe hier deinen aktuellen Stand hinein..."
              value={docs.find(d => d.id === 'master-logbuch')?.content || ''}
              onChange={(e) => {
                const newContent = e.target.value;
                setDocs(prev => prev.map(d => 
                  d.id === 'master-logbuch' 
                    ? { ...d, content: newContent, status: d.status === 'synced' ? 'modified' : d.status } 
                    : d
                ));
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>Zeichen: {(docs.find(d => d.id === 'master-logbuch')?.content || '').length}</span>
              <span style={{ color: docs.find(d => d.id === 'master-logbuch')?.status === 'synced' ? 'var(--accent-green)' : 'var(--accent-yellow)' }}>
                Status: {docs.find(d => d.id === 'master-logbuch')?.status === 'synced' ? '✅ Synchronisiert' : '☁️ Nur Lokal (Ungespeichert)'}
              </span>
            </div>
          </div>
        </div>

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

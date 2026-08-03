import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Plus, 
  Trash2, 
  ClipboardCopy, 
  Database, 
  Download, 
  FileText,
  CheckCircle,
  TrendingUp,
  BrainCircuit,
  Info
} from 'lucide-react';

const INITIAL_STATUS_TODOS = [
  { id: 'st_bus1', text: 'MVP ausarbeiten (Dienstleistungs-Leistungsumfang & ROI-Präsentation)', completed: false },
  { id: 'st_bus2', text: 'Fördermittel recherchieren (Digitalbonus Niedersachsen, Existenzgründungshilfen)', completed: false },
  { id: 'st1', text: 'Vercel Live-Deployment durchführen (git push origin main)', completed: false },
  { id: 'st2', text: 'Row-Level Security (RLS) in Supabase aktivieren', completed: false },
  { id: 'st3', text: 'Erstgespräche für Prio-A Leads (Handwerk & Pflege) im Harz ausmachen', completed: false },
  { id: 'st4', text: 'Password-Wall (SHA-256) zum Schutz vertraulicher Kundendaten eingebaut', completed: true },
  { id: 'st5', text: 'Gemini API Key von URL-Parametern auf HTTP-Header x-goog-api-key umgestellt', completed: true },
  { id: 'st6', text: 'Monolithische App.jsx (~8.434 Zeilen) in 8 saubere Sub-Komponenten zerlegt', completed: true },
  { id: 'st7', text: '90 Supabase Kaltakquise-Leads mit automatischer Fallback-Verbindung verknüpft', completed: true }
];

export const CommandCenter = ({
  docs,
  setDocs,
  isOnline,
  ragPersona,
  setRagPersona
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

  const logbuchContent = docs.find(d => d.id === 'master-logbuch')?.content || '';

  return (
    <div className="command-center-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Zap size={28} style={{ color: 'var(--accent-indigo)' }} />
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Gründung & Business Command Center</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            Verwalte Meilensteine, dokumentiere Absprachen mit deinem Coach und halte dein KI-Firmengehirn synchron.
          </p>
        </div>
      </div>

      {/* Info-Banner zu Daten & Sync */}
      <div className="card" style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '0.85rem 1rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <Info size={20} style={{ color: 'var(--accent-indigo)', flexShrink: 0, marginTop: '0.15rem' }} />
        <div style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
          <strong style={{ color: 'white', display: 'block', marginBottom: '0.15rem' }}>💡 Wichtig zur Datensicherheit & Synchronisation:</strong>
          Die App nutzt ein <span style={{ color: 'var(--accent-cyan)' }}>Local-First Konzept</span>. Alle Eingaben werden sofort lokal auf diesem Gerät gesichert.
          Sobald eine Online-Verbindung besteht, werden CRM-Leads, Prompts und Tasks automatisch mit der <span style={{ color: 'var(--accent-green)' }}>Supabase Cloud-Datenbank</span> synchronisiert. 
          Dadurch sind deine Daten geräteübergreifend geschützt und gehen nicht verloren.
        </div>
      </div>

      <div className="hub-grid">
        {/* Left Column: Milestones & STATUS.md */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(99, 102, 241, 0.03)', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 className="card-title" style={{ color: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <CheckCircle size={20} /> Meilensteine & STATUS.md
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
                Hake Meilensteine ab oder füge neue To-Dos hinzu. Jede Änderung aktualisiert dynamisch dein <code>STATUS.md</code> für NotebookLM & Gemini.
              </p>

              {/* Formular zum Meilenstein hinzufügen */}
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '350px', overflowY: 'auto' }}>
                {statusTodos.map(t => {
                  const isBusiness = t.id.startsWith('st_bus');
                  return (
                    <div 
                      key={t.id} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        padding: '0.5rem 0.75rem', 
                        background: t.completed ? 'rgba(255,255,255,0.01)' : 
                                    isBusiness ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.03)', 
                        border: isBusiness && !t.completed ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid var(--border-color)', 
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
                          {isBusiness && <span style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem', marginRight: '0.35rem', textTransform: 'uppercase', fontWeight: 800 }}>[Business]</span>}
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: masterLogbuch.txt directly open for editing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'rgba(163, 116, 255, 0.03)', border: '1px solid rgba(163, 116, 255, 0.15)' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)' }}>
                <FileText size={20} />
                masterLogbuch.txt (Coaching & Strategie)
              </h2>
              <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '0.25rem', background: 'rgba(163, 116, 255, 0.15)', color: 'var(--accent-purple)', fontWeight: 700 }}>
                ✍️ Direkt-Bearbeitung
              </span>
            </div>
            
            <div style={{ marginTop: '0.75rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Trage hier deine Mitschriften aus den Terminen mit dem Gründungscoach, neue Variablen oder Hausaufgaben ein.
              </p>
              
              <textarea
                className="input-field"
                style={{ width: '100%', height: '360px', fontFamily: 'monospace', fontSize: '0.8rem', resize: 'vertical', lineHeight: '1.4', background: 'rgba(0,0,0,0.25)' }}
                placeholder="Schreibe hier deinen aktuellen Stand hinein..."
                value={logbuchContent}
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
                <span>Zeichen: {logbuchContent.length}</span>
                <span style={{ color: docs.find(d => d.id === 'master-logbuch')?.status === 'synced' ? 'var(--accent-green)' : 'var(--accent-yellow)' }}>
                  Status: {docs.find(d => d.id === 'master-logbuch')?.status === 'synced' ? '✅ Synchronisiert' : '☁️ Nur Lokal (Ungespeichert)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

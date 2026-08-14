import React, { useEffect } from 'react';

/**
 * Modal zur Bearbeitung und Erstellung von Textdokumenten (Mini-Word).
 */
export const DocumentEditorModal = ({
  isOpen,
  onClose,
  editingDocId,
  editorTitle,
  setEditorTitle,
  editorContent,
  setEditorContent,
  onSave
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '1.5rem'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-editor-title"
    >
      <div 
        className="card" 
        style={{
          width: '100%',
          maxWidth: '650px',
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.5rem',
          margin: 0
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
          <h3 id="doc-editor-title" style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
            {editingDocId ? 'Dokument bearbeiten (Mini-Word)' : 'Neues Dokument erstellen'}
          </h3>
          <button 
            type="button"
            onClick={onClose} 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1, padding: 0 }}
            aria-label="Schließen"
          >
            ×
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Dateiname (z.B. sop_onboarding.txt)</label>
          <input
            type="text"
            className="input-field"
            placeholder="dokumentenname.txt"
            value={editorTitle}
            onChange={(e) => setEditorTitle(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexGrow: 1 }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Textinhalt (Schreiben oder Kopieren)</label>
          <textarea
            className="input-field"
            rows={12}
            style={{
              fontFamily: 'inherit',
              fontSize: '0.85rem',
              lineHeight: '1.5',
              resize: 'vertical',
              background: 'rgba(0, 0, 0, 0.25)'
            }}
            placeholder="Füge deinen Text hier ein oder schreibe ein neues Dokument..."
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button 
            type="button" 
            onClick={onClose} 
            className="btn btn-secondary"
            style={{ height: '36px' }}
          >
            Abbrechen
          </button>
          <button 
            type="button" 
            onClick={onSave} 
            className="btn btn-primary"
            style={{ height: '36px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            💾 Speichern
          </button>
        </div>
      </div>
    </div>
  );
};

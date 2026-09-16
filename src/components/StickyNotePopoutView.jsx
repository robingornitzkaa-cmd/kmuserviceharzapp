import React, { useState, useEffect, useRef } from 'react';
import { 
  Pin, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Cloud, 
  CloudOff, 
  RefreshCw, 
  Check, 
  ExternalLink, 
  Minimize2, 
  Sparkles 
} from 'lucide-react';

const COLOR_PALETTE = [
  { color: '#fef08a', border: '#eab308', name: 'Sonnengelb', dark: false },
  { color: '#bfdbfe', border: '#3b82f6', name: 'Himmelblau', dark: false },
  { color: '#bbf7d0', border: '#22c55e', name: 'Minzgrün', dark: false },
  { color: '#fbcfe8', border: '#ec4899', name: 'Sanftrosa', dark: false },
  { color: '#fed7aa', border: '#f97316', name: 'Pfirsich', dark: false },
  { color: '#e9d5ff', border: '#a855f7', name: 'Lavendel', dark: false },
  { color: '#1e293b', border: '#475569', name: 'Dark Mode', dark: true }
];

export default function StickyNotePopoutView({
  dashNotes = '',
  dashNotesList = [],
  stickyNoteColor = '#fef08a',
  activeNoteId = 'note_1',
  handleSelectNote,
  handleCreateNote,
  handleUpdateActiveNote,
  handleDeleteNote,
  supabaseSyncStatus = 'connected',
  saveDashboardNow
}) {
  const activeNote = dashNotesList.find(n => n.id === activeNoteId) || dashNotesList[0] || {
    id: 'note_1',
    title: 'Notiz 1',
    content: '',
    color: '#fef08a'
  };

  const isDarkMode = stickyNoteColor === '#1e293b';
  const textColor = isDarkMode ? '#f8fafc' : '#1e293b';
  const subtextColor = isDarkMode ? '#94a3b8' : '#475569';
  const headerBg = isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(activeNote.title || 'Notiz');
  const [lastSavedTime, setLastSavedTime] = useState('');
  const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    setTitleDraft(activeNote.title || 'Notiz');
  }, [activeNote.id, activeNote.title]);

  useEffect(() => {
    if (supabaseSyncStatus === 'connected') {
      setLastSavedTime(new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }));
    }
  }, [supabaseSyncStatus]);

  const activeIndex = dashNotesList.findIndex(n => n.id === activeNote.id);
  const wordsCount = (dashNotes || '').trim() ? (dashNotes || '').trim().split(/\s+/).length : 0;
  const charsCount = (dashNotes || '').length;

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (titleDraft.trim() && handleUpdateActiveNote) {
      handleUpdateActiveNote({ title: titleDraft.trim() });
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0 && handleSelectNote) {
      handleSelectNote(dashNotesList[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex < dashNotesList.length - 1 && handleSelectNote) {
      handleSelectNote(dashNotesList[activeIndex + 1].id);
    }
  };

  // Document Picture-in-Picture Support
  const handleRequestPip = async () => {
    if ('documentPictureInPicture' in window) {
      try {
        const pipWindow = await window.documentPictureInPicture.requestWindow({
          width: 380,
          height: 480
        });
        // Styles kopieren
        [...document.styleSheets].forEach((sheet) => {
          try {
            const css = [...sheet.cssRules].map(r => r.cssText).join('');
            const el = document.createElement('style');
            el.textContent = css;
            pipWindow.document.head.appendChild(el);
          } catch {
            if (sheet.href) {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = sheet.href;
              pipWindow.document.head.appendChild(link);
            }
          }
        });
        pipWindow.document.body.style.margin = '0';
        pipWindow.document.body.style.overflow = 'hidden';
        pipWindow.document.body.appendChild(document.getElementById('sticky-popout-container'));
        setIsAlwaysOnTop(true);
      } catch (err) {
        console.warn('PiP konnte nicht gestartet werden:', err);
      }
    }
  };

  return (
    <div 
      id="sticky-popout-container"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: stickyNoteColor,
        color: textColor,
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        boxSizing: 'border-box',
        overflow: 'hidden',
        userSelect: 'none',
        transition: 'background-color 0.25s ease'
      }}
    >
      {/* 1. Header Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          background: headerBg,
          borderBottom: `1px solid ${borderColor}`,
          gap: '8px'
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '15px' }}>📌</span>
          <span style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '-0.3px' }}>
            Founder OS
          </span>
        </div>

        {/* Farbwahl-Pills */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {COLOR_PALETTE.map(item => (
            <button
              key={item.color}
              type="button"
              title={item.name}
              onClick={() => handleUpdateActiveNote && handleUpdateActiveNote({ color: item.color })}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: item.color,
                border: stickyNoteColor === item.color ? '2px solid #0284c7' : `1px solid ${borderColor}`,
                cursor: 'pointer',
                padding: 0,
                transform: stickyNoteColor === item.color ? 'scale(1.15)' : 'scale(1)',
                transition: 'transform 0.15s ease'
              }}
            />
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {'documentPictureInPicture' in window && (
            <button
              type="button"
              onClick={handleRequestPip}
              title="Über allen Fenstern anheften (Always on Top)"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                color: subtextColor,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Pin size={15} color={isAlwaysOnTop ? '#0284c7' : subtextColor} />
            </button>
          )}

          <button
            type="button"
            onClick={() => saveDashboardNow && saveDashboardNow()}
            title="Jetzt mit Cloud synchronisieren"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              color: subtextColor,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RefreshCw size={14} className={supabaseSyncStatus === 'syncing' ? 'spin' : ''} />
          </button>
        </div>
      </div>

      {/* 2. Titel & Navigation Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 12px',
          background: 'rgba(0, 0, 0, 0.02)',
          borderBottom: `1px solid ${borderColor}`,
          gap: '8px'
        }}
      >
        {/* Titel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {isEditingTitle ? (
            <input
              type="text"
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
              autoFocus
              style={{
                width: '100%',
                fontSize: '13px',
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.3)',
                border: '1px solid #0284c7',
                borderRadius: '4px',
                padding: '2px 6px',
                color: textColor,
                outline: 'none'
              }}
            />
          ) : (
            <div 
              onClick={() => setIsEditingTitle(true)}
              title="Klicken zum Umbenennen"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'text',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {activeNote.title || 'Notiz'}
            </div>
          )}
        </div>

        {/* Navigation & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex <= 0}
            title="Vorherige Notiz"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: activeIndex > 0 ? 'pointer' : 'default',
              opacity: activeIndex > 0 ? 1 : 0.35,
              padding: '2px',
              color: subtextColor
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <span style={{ fontSize: '11px', fontWeight: 600, color: subtextColor, minWidth: '36px', textAlign: 'center' }}>
            {(activeIndex >= 0 ? activeIndex + 1 : 1)} / {dashNotesList.length || 1}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex >= dashNotesList.length - 1}
            title="Nächste Notiz"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: activeIndex < dashNotesList.length - 1 ? 'pointer' : 'default',
              opacity: activeIndex < dashNotesList.length - 1 ? 1 : 0.35,
              padding: '2px',
              color: subtextColor
            }}
          >
            <ChevronRight size={16} />
          </button>

          <button
            type="button"
            onClick={handleCreateNote}
            title="Neue Notiz anlegen"
            style={{
              background: 'rgba(0, 0, 0, 0.08)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              padding: '3px 6px',
              display: 'flex',
              alignItems: 'center',
              color: textColor,
              marginLeft: '4px'
            }}
          >
            <Plus size={14} />
          </button>

          {dashNotesList.length > 1 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Möchtest du diese Notiz wirklich löschen?')) {
                  handleDeleteNote(activeNote.id);
                }
              }}
              title="Diese Notiz löschen"
              style={{
                background: 'transparent',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                padding: '3px',
                display: 'flex',
                alignItems: 'center',
                color: '#ef4444'
              }}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* 3. Textbereich */}
      <textarea
        ref={textareaRef}
        value={dashNotes || ''}
        onChange={(e) => handleUpdateActiveNote && handleUpdateActiveNote({ content: e.target.value })}
        placeholder="Tippe hier deine Gedanken, Aufgaben oder Ideen ein..."
        style={{
          flex: 1,
          width: '100%',
          padding: '14px',
          boxSizing: 'border-box',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontFamily: 'inherit',
          fontSize: '14px',
          lineHeight: '1.6',
          color: textColor,
          userSelect: 'text'
        }}
      />

      {/* 4. Footer Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 12px',
          background: headerBg,
          borderTop: `1px solid ${borderColor}`,
          fontSize: '11px',
          color: subtextColor
        }}
      >
        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span 
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: supabaseSyncStatus === 'syncing' ? '#eab308' : supabaseSyncStatus === 'error' ? '#ef4444' : '#22c55e'
            }}
          />
          <span>
            {supabaseSyncStatus === 'syncing' ? 'Speichert in Cloud...' : 
             supabaseSyncStatus === 'error' ? 'Offline (Lokal gespeichert)' : 
             `Cloud synchron ${lastSavedTime ? `(${lastSavedTime})` : ''}`}
          </span>
        </div>

        {/* Zähler */}
        <div>
          {wordsCount} Wörter · {charsCount} Zeichen
        </div>
      </div>
    </div>
  );
}

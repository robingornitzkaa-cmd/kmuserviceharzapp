import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  X, 
  Copy, 
  Download, 
  Trash2, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle,
  RotateCw,
  Filter,
  Check
} from 'lucide-react';
import { 
  getSystemLogs, 
  clearSystemLogs, 
  exportLogsAsJson 
} from '../services/logger.js';

export const DiagnosticLogModal = ({ isOpen, onClose, onShowToast }) => {
  const [logs, setLogs] = useState([]);
  const [filterLevel, setFilterLevel] = useState('ALL'); // 'ALL', 'ERROR', 'WARN', 'WIDGET', 'GOOGLE'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLogId, setExpandedLogId] = useState(null);
  const [copied, setCopied] = useState(false);

  const refreshLogs = () => {
    setLogs(getSystemLogs());
  };

  useEffect(() => {
    if (isOpen) {
      refreshLogs();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyLogs = async () => {
    const text = logs.map(l => `[${l.timeStr}] [${l.level}] [${l.category}] ${l.message} ${l.details ? `\nDetails: ${l.details}` : ''}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onShowToast) onShowToast('📋 Alle Diagnose-Logs in Zwischenablage kopiert!', 'success');
    } catch {
      if (onShowToast) onShowToast('Konnte Zwischenablage nicht befüllen', 'warning');
    }
  };

  const handleExportJson = () => {
    const jsonStr = exportLogsAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `founder_os_diagnostics_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (onShowToast) onShowToast('📥 Diagnose-Bericht heruntergeladen', 'info');
  };

  const handleClear = () => {
    clearSystemLogs();
    refreshLogs();
    if (onShowToast) onShowToast('Diagnose-Logbuch geleert', 'info');
  };

  // Filterung
  const filteredLogs = logs.filter(l => {
    // Level filter
    if (filterLevel === 'ERROR' && l.level !== 'ERROR') return false;
    if (filterLevel === 'WARN' && l.level !== 'WARN') return false;
    if (filterLevel === 'WIDGET' && l.category !== 'Widget') return false;
    if (filterLevel === 'GOOGLE' && !l.category.toLowerCase().includes('google')) return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchMsg = l.message.toLowerCase().includes(q);
      const matchCat = l.category.toLowerCase().includes(q);
      const matchDet = l.details ? l.details.toLowerCase().includes(q) : false;
      return matchMsg || matchCat || matchDet;
    }
    return true;
  });

  const errorCount = logs.filter(l => l.level === 'ERROR').length;
  const warnCount = logs.filter(l => l.level === 'WARN').length;

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 8, 15, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '850px',
          height: '85vh',
          maxHeight: '750px',
          background: 'linear-gradient(145deg, #0d1527 0%, #080d1a 100%)',
          border: '1px solid rgba(6, 182, 212, 0.35)',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(6, 182, 212, 0.15)',
          color: '#f8fafc',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.45rem', borderRadius: '0.5rem', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
              <Terminal size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>System- & Fehler-Diagnose Hub</span>
                <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem', borderRadius: '1rem', background: errorCount > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)', color: errorCount > 0 ? '#f87171' : '#34d399', fontWeight: 700 }}>
                  {errorCount > 0 ? `🔴 ${errorCount} Fehler` : '🟢 Alle Systeme normal'}
                </span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: '0.1rem 0 0 0' }}>
                Echtzeit-Protokoll aller App-Aktivitäten, Widget-Syncs & API-Aufrufe
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              type="button"
              onClick={refreshLogs}
              style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '0.4rem', color: 'var(--text-secondary)', padding: '0.35rem 0.6rem', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <RotateCw size={13} />
              <span>Neu laden</span>
            </button>
            <button 
              type="button" 
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.35rem' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filters & Actions Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          
          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setFilterLevel('ALL')}
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.72rem',
                borderRadius: '0.4rem',
                border: `1px solid ${filterLevel === 'ALL' ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                background: filterLevel === 'ALL' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                color: filterLevel === 'ALL' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Alle ({logs.length})
            </button>

            <button
              type="button"
              onClick={() => setFilterLevel('ERROR')}
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.72rem',
                borderRadius: '0.4rem',
                border: `1px solid ${filterLevel === 'ERROR' ? '#ef4444' : 'var(--border-color)'}`,
                background: filterLevel === 'ERROR' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                color: filterLevel === 'ERROR' ? '#f87171' : 'var(--text-secondary)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🔴 Fehler ({errorCount})
            </button>

            <button
              type="button"
              onClick={() => setFilterLevel('WARN')}
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.72rem',
                borderRadius: '0.4rem',
                border: `1px solid ${filterLevel === 'WARN' ? '#f59e0b' : 'var(--border-color)'}`,
                background: filterLevel === 'WARN' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                color: filterLevel === 'WARN' ? '#fbbf24' : 'var(--text-secondary)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🟡 Warnungen ({warnCount})
            </button>

            <button
              type="button"
              onClick={() => setFilterLevel('WIDGET')}
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.72rem',
                borderRadius: '0.4rem',
                border: `1px solid ${filterLevel === 'WIDGET' ? '#38bdf8' : 'var(--border-color)'}`,
                background: filterLevel === 'WIDGET' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: filterLevel === 'WIDGET' ? '#38bdf8' : 'var(--text-secondary)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              📱 Widgets
            </button>

            <button
              type="button"
              onClick={() => setFilterLevel('GOOGLE')}
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.72rem',
                borderRadius: '0.4rem',
                border: `1px solid ${filterLevel === 'GOOGLE' ? '#2dd4bf' : 'var(--border-color)'}`,
                background: filterLevel === 'GOOGLE' ? 'rgba(45, 212, 191, 0.2)' : 'transparent',
                color: filterLevel === 'GOOGLE' ? '#2dd4bf' : 'var(--text-secondary)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🌐 Google
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              type="button"
              onClick={handleCopyLogs}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.65rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                background: 'rgba(6, 182, 212, 0.15)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '0.4rem',
                color: 'var(--accent-cyan)',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.65rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.4rem',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <Download size={13} />
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.65rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.4rem',
                color: '#f87171',
                cursor: 'pointer'
              }}
            >
              <Trash2 size={13} />
              <span>Leeren</span>
            </button>
          </div>

        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Protokoll durchsuchen (z. B. 'Widget', 'Sync', 'Error')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.45rem 0.65rem 0.45rem 2rem',
              borderRadius: '0.45rem',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.75rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Logs Output Console Area */}
        <div 
          style={{
            flex: 1,
            background: '#050914',
            border: '1px solid var(--border-color)',
            borderRadius: '0.6rem',
            padding: '0.65rem',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.72rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem'
          }}
        >
          {filteredLogs.map((item) => {
            const isExpanded = expandedLogId === item.id;
            let badgeBg = 'rgba(148, 163, 184, 0.15)';
            let badgeColor = '#94a3b8';
            let icon = <Info size={13} style={{ color: badgeColor }} />;

            if (item.level === 'SUCCESS') {
              badgeBg = 'rgba(16, 185, 129, 0.15)';
              badgeColor = '#34d399';
              icon = <CheckCircle2 size={13} style={{ color: badgeColor }} />;
            } else if (item.level === 'WARN') {
              badgeBg = 'rgba(245, 158, 11, 0.15)';
              badgeColor = '#fbbf24';
              icon = <AlertTriangle size={13} style={{ color: badgeColor }} />;
            } else if (item.level === 'ERROR') {
              badgeBg = 'rgba(239, 68, 68, 0.15)';
              badgeColor = '#f87171';
              icon = <AlertCircle size={13} style={{ color: badgeColor }} />;
            }

            return (
              <div 
                key={item.id}
                onClick={() => setExpandedLogId(isExpanded ? null : item.id)}
                style={{
                  padding: '0.45rem 0.6rem',
                  borderRadius: '0.4rem',
                  background: isExpanded ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
                  border: `1px solid ${isExpanded ? 'rgba(6, 182, 212, 0.3)' : 'rgba(255,255,255,0.04)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', overflow: 'hidden' }}>
                    {icon}
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>{item.timeStr}</span>
                    <span style={{ padding: '0.1rem 0.35rem', borderRadius: '0.25rem', background: badgeBg, color: badgeColor, fontSize: '0.62rem', fontWeight: 700 }}>
                      [{item.category}]
                    </span>
                    <span style={{ color: item.level === 'ERROR' ? '#f87171' : 'var(--text-primary)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.message}
                    </span>
                  </div>
                  {item.details && (
                    <span style={{ fontSize: '0.62rem', color: 'var(--accent-cyan)', flexShrink: 0 }}>
                      {isExpanded ? '▲ Einklappen' : '▼ Details'}
                    </span>
                  )}
                </div>

                {/* Expanded Details / Stacktrace */}
                {isExpanded && item.details && (
                  <pre 
                    style={{
                      margin: '0.35rem 0 0 0',
                      padding: '0.5rem',
                      background: 'rgba(0,0,0,0.5)',
                      borderRadius: '0.35rem',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#cbd5e1',
                      fontSize: '0.65rem',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      maxHeight: '160px',
                      overflowY: 'auto'
                    }}
                  >
                    {item.details}
                  </pre>
                )}
              </div>
            );
          })}

          {filteredLogs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
              Keine Log-Einträge für diesen Filter gefunden.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { Download, X } from 'lucide-react';

/**
 * Lightbox Modal zur vollflächigen, hochauflösenden Präsentation von
 * Grafiken, Diagrammen und Prozess-Charts.
 */
export const LightboxModal = ({ isOpen, url, title, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !url) return null;

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        background: 'rgba(0, 0, 0, 0.88)', 
        zIndex: 99999, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '1.5rem',
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Grafik-Präsentation'}
    >
      <div 
        style={{ 
          position: 'relative', 
          maxWidth: '92vw', 
          maxHeight: '88vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          background: '#0d1117',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          border: '1px solid rgba(6, 182, 212, 0.4)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--accent-cyan)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🖼️ {title || 'Grafik-Präsentation'}
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {url && (
              <a 
                href={url} 
                download={`Coaching_Grafik_${Date.now()}.png`}
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Download size={13} /> Herunterladen
              </a>
            )}
            <button 
              onClick={onClose} 
              className="btn btn-primary"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', background: 'var(--accent-cyan)', border: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              aria-label="Schließen"
            >
              <X size={14} /> Schließen
            </button>
          </div>
        </div>

        <img 
          src={url} 
          alt={title || 'Präsentationsgrafik'} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '75vh', 
            objectFit: 'contain',
            borderRadius: '0.5rem'
          }} 
        />
      </div>
    </div>
  );
};

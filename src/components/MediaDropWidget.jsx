import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Download, 
  Maximize2, 
  Copy, 
  Check, 
  Sparkles,
  Smartphone,
  Laptop
} from 'lucide-react';

/**
 * Komprimiert ein Bild client-seitig (Canvas), damit es mobil unter 0.5s via Supabase synchronisiert.
 */
const compressImage = (file, maxWidth = 1400, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({
          dataUrl,
          width,
          height,
          sizeKb: Math.round((dataUrl.length * 3) / 4 / 1024)
        });
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const MediaDropWidget = ({
  mediaGallery = [],
  setMediaGallery,
  onOpenLightbox,
  saveDashboardNow
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const fileInputRef = useRef(null);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      const newItems = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;

        const compressed = await compressImage(file);
        newItems.push({
          id: 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          name: file.name || `Screenshot_${new Date().toLocaleDateString('de-DE')}`,
          dataUrl: compressed.dataUrl,
          sizeKb: compressed.sizeKb,
          createdAt: new Date().toISOString(),
          device: typeof window !== 'undefined' && window.innerWidth < 900 ? 'Handy' : 'PC'
        });
      }

      if (newItems.length > 0) {
        setMediaGallery(prev => {
          const updated = [...newItems, ...(prev || [])];
          localStorage.setItem('f_media_gallery', JSON.stringify(updated));
          return updated;
        });
        if (saveDashboardNow) {
          setTimeout(() => saveDashboardNow(), 200);
        }
      }
    } catch (err) {
      console.error('Fehler beim Verarbeiten des Screenshots:', err);
      alert('Konnte Screenshot nicht verarbeiten: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handlePaste = (e) => {
    if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
      handleFiles(e.clipboardData.files);
    }
  };

  const handleDelete = (id) => {
    setMediaGallery(prev => {
      const updated = (prev || []).filter(item => item.id !== id);
      localStorage.setItem('f_media_gallery', JSON.stringify(updated));
      return updated;
    });
    if (saveDashboardNow) {
      setTimeout(() => saveDashboardNow(), 200);
    }
  };

  const handleDownload = (item) => {
    const a = document.createElement('a');
    a.href = item.dataUrl;
    a.download = item.name || 'screenshot.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item.dataUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div 
      className="card media-drop-widget"
      onPaste={handlePaste}
      tabIndex={0}
      style={{
        background: 'rgba(15, 23, 42, 0.85)',
        border: dragOver ? '2px dashed var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '0.85rem',
        padding: '1.1rem',
        outline: 'none',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '0.5rem',
            background: 'rgba(6, 182, 212, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <Camera size={16} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              📷 Screenshot & Foto Cloud-Drop
              <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '1rem', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
                Handy ↔ PC Sync
              </span>
            </h4>
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              Lade Handy-Screenshots hoch – sofort auf deinem PC verfügbar!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="btn btn-primary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
        >
          <Upload size={14} /> {isUploading ? 'Lädt...' : '+ Screenshot hochladen'}
        </button>

        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          multiple 
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Drag & Drop Zone / Hinweis */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: '1px dashed rgba(255, 255, 255, 0.15)',
          background: dragOver ? 'rgba(6, 182, 212, 0.1)' : 'rgba(0, 0, 0, 0.25)',
          borderRadius: '0.5rem',
          padding: '0.75rem',
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: '0.85rem'
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
          <ImageIcon size={14} color="var(--accent-cyan)" />
          Hier tippen zum Hochladen, Bild hineinziehen oder mit <strong>Strg+V</strong> einfügen
        </span>
      </div>

      {/* Screenshot Galerie */}
      {(!mediaGallery || mediaGallery.length === 0) ? (
        <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          Noch keine Screenshots abgelegt. Mache einen Screenshot auf deinem Handy und lade ihn hier hoch!
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '0.65rem',
          maxHeight: '320px',
          overflowY: 'auto',
          paddingRight: '0.2rem'
        }}>
          {mediaGallery.map(item => (
            <div 
              key={item.id}
              style={{
                position: 'relative',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Bildvorschau */}
              <div 
                onClick={() => onOpenLightbox && onOpenLightbox(item.dataUrl, item.name)}
                style={{
                  height: '95px',
                  width: '100%',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#090d16'
                }}
                title="Klicken für Vollbildanzeige"
              >
                <img 
                  src={item.dataUrl} 
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  background: 'rgba(0,0,0,0.6)',
                  borderRadius: '0.25rem',
                  padding: '0.15rem 0.3rem',
                  fontSize: '0.6rem',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}>
                  {item.device === 'Handy' ? <Smartphone size={10} /> : <Laptop size={10} />}
                  {item.device || 'Drop'}
                </div>
              </div>

              {/* Infos & Aktionsleiste */}
              <div style={{ padding: '0.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60px' }}>
                  {item.sizeKb ? `${item.sizeKb} kB` : 'Bild'}
                </span>

                <div style={{ display: 'flex', gap: '0.2rem' }}>
                  <button
                    type="button"
                    onClick={() => onOpenLightbox && onOpenLightbox(item.dataUrl, item.name)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', padding: '0.15rem' }}
                    title="Vollbild anzeigen"
                  >
                    <Maximize2 size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload(item)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.15rem' }}
                    title="Herunterladen"
                  >
                    <Download size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.15rem' }}
                    title="Löschen"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

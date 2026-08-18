import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  CheckSquare, 
  FileText, 
  Target, 
  Users, 
  Calendar, 
  Sparkles, 
  Tag, 
  Trash2, 
  Copy, 
  Check, 
  Volume2,
  VolumeX,
  Radio
} from 'lucide-react';

const QUICK_TAGS = ['#Wichtig', '#Kunde', '#Idee', '#Habit', '#Dringend', '#HarzKMU'];

// Web Audio API Hilfsfunktion für futuristische Feedback-Töne (0 externe Pakete)
const playChime = (type = 'start') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'start') {
      // Aufsteigender Doppel-Ton
      osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'stop') {
      // Sanfter abfallender Ton
      osc.frequency.setValueAtTime(784, ctx.currentTime); // G5
      osc.frequency.exponentialRampToValueAtTime(392, ctx.currentTime + 0.15); // G4
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'success') {
      // Helle Dreiklangs-Fanfare
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch {
    // AudioContext ggf. durch Browser-Autoplay-Richtlinie stummgeschaltet
  }
};

export const VoiceQuickCaptureWidget = ({
  onDispatch,
  defaultTarget = 'todo',
  className = ''
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedTarget, setSelectedTarget] = useState(defaultTarget);
  const [isListening, setIsListening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copied, setCopied] = useState(false);
  const [lastDispatchedTarget, setLastDispatchedTarget] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(true);
  
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = typeof window !== 'undefined'
      ? (window.SpeechRecognition || window.webkitSpeechRecognition)
      : null;
    setSpeechSupported(Boolean(SpeechRecognition));
  }, []);

  // Spracherkennung Starten/Stoppen
  const toggleListening = () => {
    const SpeechRecognition = typeof window !== 'undefined'
      ? (window.SpeechRecognition || window.webkitSpeechRecognition)
      : null;

    if (!SpeechRecognition) {
      alert('Spracherkennung wird von diesem Browser leider nicht unterstützt. Du kannst den Text direkt tippen!');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.warn('SpeechRecognition stop error:', e);
        }
      }
      setIsListening(false);
      if (soundEnabled) playChime('stop');
    } else {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'de-DE';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
          setIsListening(true);
          if (soundEnabled) playChime('start');
        };

        recognition.onresult = (event) => {
          let fullTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            fullTranscript += event.results[i][0].transcript + ' ';
          }
          const cleaned = fullTranscript.trim();
          setInputText(prev => {
            // Wenn vorher bereits Text stand, anfügen, sonst neu belegen
            return cleaned;
          });
        };

        recognition.onerror = (event) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
          if (soundEnabled) playChime('stop');
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {
        console.error('Speech recognition start failed:', err);
        setIsListening(false);
      }
    }
  };

  // Tag anhängen
  const handleAddTag = (tag) => {
    if (!inputText.includes(tag)) {
      setInputText(prev => prev ? `${prev} ${tag}` : tag);
    }
  };

  // Absenden an gewähltes Ziel
  const handleSend = (targetOverride = null) => {
    const target = targetOverride || selectedTarget;
    if (!inputText.trim()) return;

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
    }

    if (soundEnabled) playChime('success');

    if (onDispatch) {
      onDispatch({
        text: inputText.trim(),
        target,
        timestamp: new Date().toISOString()
      });
    }

    setLastDispatchedTarget(target);
    setInputText('');

    setTimeout(() => {
      setLastDispatchedTarget(null);
    }, 2500);
  };

  const handleCopy = () => {
    if (!inputText) return;
    navigator.clipboard.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const targetConfig = [
    { id: 'todo', label: 'To-Do', icon: CheckSquare, color: '#38bdf8', desc: 'In Aufgabenliste einreihen' },
    { id: 'note', label: 'Notiz', icon: FileText, color: '#facc15', desc: 'Auf Notizzettel pinnen' },
    { id: 'goal', label: 'Tages-Fokus', icon: Target, color: '#ec4899', desc: 'Als heutiges Hauptziel setzen' },
    { id: 'crm', label: 'CRM / Lead', icon: Users, color: '#8b5cf6', desc: 'Als Lead oder Kontaktnotiz' },
    { id: 'calendar', label: 'Termin', icon: Calendar, color: '#10b981', desc: 'In Tages-Agenda einplanen' }
  ];

  return (
    <div className={`card quick-capture-studio ${className}`} style={{
      background: 'rgba(15, 23, 42, 0.85)',
      border: isListening ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: isListening ? '0 0 25px rgba(239, 68, 68, 0.25)' : 'var(--card-shadow)',
      borderRadius: '0.85rem',
      padding: '1rem',
      transition: 'all 0.3s ease',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Header mit Aufnahme-Status & Sound-Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 auto', minWidth: '220px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '0.5rem',
            background: isListening ? 'rgba(239, 68, 68, 0.2)' : 'rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isListening ? '#ef4444' : 'var(--accent-cyan)',
            flexShrink: 0
          }}>
            <Sparkles size={16} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
              Voice Quick-Capture Studio
              {isListening && (
                <span style={{ 
                  fontSize: '0.65rem', 
                  padding: '0.1rem 0.4rem', 
                  borderRadius: '1rem', 
                  background: '#ef4444', 
                  color: 'white',
                  animation: 'pulse 1.5s infinite' 
                }}>
                  ● LIVE AUFNAHME
                </span>
              )}
            </h4>
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              Spreche oder tippe deine Gedanken – mit 1 Klick sortiert.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn-icon-only"
            style={{ 
              padding: '0.35rem', 
              borderRadius: '0.35rem', 
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              color: soundEnabled ? 'var(--accent-cyan)' : 'var(--text-muted)',
              minWidth: '32px',
              minHeight: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={soundEnabled ? 'Audio-Feedback aktiv' : 'Audio-Feedback stumm'}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
        </div>
      </div>

      {/* Eingabefeld & Wellenform-Animation */}
      <div style={{ position: 'relative', marginBottom: '0.75rem', width: '100%' }}>
        <textarea
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isListening ? '🎙️ Höre aktiv zu... Sprich einfach frei drauflos...' : 'Gedanken, Blitzideen, To-Dos oder Kundennotizen eingeben...'}
          rows={2}
          style={{
            width: '100%',
            padding: '0.75rem 2.8rem 0.75rem 0.75rem',
            background: isListening ? 'rgba(239, 68, 68, 0.06)' : 'rgba(0, 0, 0, 0.35)',
            border: isListening ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-color)',
            borderRadius: '0.5rem',
            color: 'white',
            fontSize: '0.85rem',
            resize: 'vertical',
            minHeight: '68px',
            lineHeight: 1.4,
            outline: 'none',
            boxSizing: 'border-box'
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        {/* Mikrofon-Button rechts im Textfeld */}
        <button
          type="button"
          onClick={toggleListening}
          style={{
            position: 'absolute',
            right: '8px',
            top: '8px',
            width: '36px',
            height: '36px',
            borderRadius: '0.4rem',
            background: isListening ? '#ef4444' : 'rgba(56, 189, 248, 0.15)',
            border: isListening ? '1px solid #ef4444' : '1px solid rgba(56, 189, 248, 0.3)',
            color: isListening ? '#ffffff' : 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: isListening ? '0 0 12px rgba(239, 68, 68, 0.6)' : 'none'
          }}
          title={isListening ? 'Aufnahme stoppen' : 'Sprachaufnahme starten'}
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
      </div>

      {/* Wellenform-Puls bei aktiver Aufnahme */}
      {isListening && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          padding: '0.35rem',
          marginBottom: '0.75rem',
          background: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '0.35rem',
          border: '1px dashed rgba(239, 68, 68, 0.3)'
        }}>
          <Radio size={14} color="#ef4444" style={{ animation: 'spin 3s linear infinite' }} />
          <span style={{ fontSize: '0.7rem', color: '#fca5a5', fontWeight: 600 }}>Mikrofon aktiv – Audio wird verarbeitet...</span>
        </div>
      )}

      {/* Tag-Pills & Schnell-Aktionen */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          <Tag size={12} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          {QUICK_TAGS.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => handleAddTag(t)}
              style={{
                fontSize: '0.65rem',
                padding: '0.2rem 0.45rem',
                borderRadius: '0.3rem',
                background: inputText.includes(t) ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.05)',
                border: inputText.includes(t) ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                color: inputText.includes(t) ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {inputText && (
            <>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-icon-only"
                style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.3rem', border: '1px solid var(--border-color)', minWidth: '30px', minHeight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="In Zwischenablage kopieren"
              >
                {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
              </button>
              <button
                type="button"
                onClick={() => setInputText('')}
                className="btn-icon-only"
                style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.3rem', border: '1px solid var(--border-color)', color: '#ef4444', minWidth: '30px', minHeight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Text löschen"
              >
                <Trash2 size={13} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Multi-Target Routing Buttons */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(88px, 1fr))', 
        gap: '0.4rem', 
        borderTop: '1px solid rgba(255,255,255,0.06)', 
        paddingTop: '0.75rem' 
      }}>
        {targetConfig.map(target => {
          const Icon = target.icon;
          const isSelected = selectedTarget === target.id;
          const isLastDispatched = lastDispatchedTarget === target.id;

          return (
            <button
              key={target.id}
              type="button"
              onClick={() => {
                setSelectedTarget(target.id);
                if (inputText.trim()) {
                  handleSend(target.id);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                padding: '0.45rem 0.35rem',
                minHeight: '36px',
                borderRadius: '0.45rem',
                background: isLastDispatched 
                  ? '#10b981' 
                  : (isSelected ? `rgba(${target.id === 'todo' ? '56, 189, 248' : target.id === 'note' ? '250, 204, 21' : target.id === 'goal' ? '236, 72, 153' : target.id === 'crm' ? '139, 92, 246' : '16, 185, 129'}, 0.15)` : 'rgba(255,255,255,0.03)'),
                border: isLastDispatched
                  ? '1px solid #10b981'
                  : (isSelected ? `1px solid ${target.color}` : '1px solid var(--border-color)'),
                color: isLastDispatched ? '#0f172a' : (isSelected ? target.color : 'var(--text-secondary)'),
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                transform: isLastDispatched ? 'scale(1.02)' : 'none',
                whiteSpace: 'nowrap'
              }}
              title={target.desc}
            >
              {isLastDispatched ? <Check size={14} /> : <Icon size={14} />}
              <span>{isLastDispatched ? 'Gespeichert!' : target.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

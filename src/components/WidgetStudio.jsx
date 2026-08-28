import React, { useState } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Check, 
  RotateCw, 
  Flame, 
  Users, 
  CheckSquare, 
  Calendar, 
  Target, 
  FileText, 
  Layers, 
  Eye, 
  EyeOff, 
  Sliders, 
  Palette,
  ExternalLink,
  Mic
} from 'lucide-react';
import { 
  getWidgetConfig, 
  saveWidgetConfig, 
  updateAndroidWidget, 
  WIDGET_PRESETS 
} from '../services/widget.js';

export const WidgetStudio = ({
  dashNotes = '',
  dashTodos = [],
  leads = [],
  streak = 0,
  dailyGoal = '',
  calendarEvents = [],
  gmailMessages = [],
  onShowToast
}) => {
  const [config, setConfig] = useState(getWidgetConfig());
  const [activePreset, setActivePreset] = useState(config.id || 'allInOne');
  const [isApplying, setIsApplying] = useState(false);

  // Themes Farben
  const THEME_STYLES = {
    glassmorphic: {
      name: 'Glassmorphic Dark',
      bg: `rgba(13, 21, 39, ${config.bgAlpha / 100})`,
      border: 'rgba(6, 182, 212, 0.35)',
      accent: 'var(--accent-cyan, #06b6d4)',
      text: '#f8fafc',
      badgeBg: 'rgba(6, 182, 212, 0.15)',
      badgeText: '#38bdf8'
    },
    amoled: {
      name: 'AMOLED Pure Black',
      bg: `rgba(0, 0, 0, ${config.bgAlpha / 100})`,
      border: 'rgba(255, 255, 255, 0.15)',
      accent: '#ffffff',
      text: '#ffffff',
      badgeBg: 'rgba(255, 255, 255, 0.1)',
      badgeText: '#e2e8f0'
    },
    cyan: {
      name: 'Cyber Cyan',
      bg: `rgba(4, 47, 46, ${config.bgAlpha / 100})`,
      border: 'rgba(20, 184, 166, 0.4)',
      accent: '#2dd4bf',
      text: '#f0fdfa',
      badgeBg: 'rgba(20, 184, 166, 0.2)',
      badgeText: '#5eead4'
    },
    navy: {
      name: 'Deep Navy',
      bg: `rgba(11, 19, 43, ${config.bgAlpha / 100})`,
      border: 'rgba(59, 130, 246, 0.35)',
      accent: '#60a5fa',
      text: '#f8fafc',
      badgeBg: 'rgba(59, 130, 246, 0.15)',
      badgeText: '#93c5fd'
    }
  };

  const currentTheme = THEME_STYLES[config.theme] || THEME_STYLES.glassmorphic;

  const handleApplyPreset = (presetKey) => {
    const preset = WIDGET_PRESETS[presetKey];
    if (!preset) return;
    setActivePreset(presetKey);
    const updated = { ...preset };
    setConfig(updated);
    saveWidgetConfig(updated);
  };

  const handleToggle = (key) => {
    const updated = { ...config, [key]: !config[key], id: 'custom' };
    setActivePreset('custom');
    setConfig(updated);
    saveWidgetConfig(updated);
  };

  const handleChange = (key, value) => {
    const updated = { ...config, [key]: value, id: 'custom' };
    setActivePreset('custom');
    setConfig(updated);
    saveWidgetConfig(updated);
  };

  const handleSaveAndSync = async () => {
    setIsApplying(true);
    saveWidgetConfig(config);

    const success = await updateAndroidWidget({
      dashNotes,
      dashTodos,
      leads,
      streak,
      dailyGoal,
      calendarEvents,
      gmailMessages,
      config
    });

    setIsApplying(false);
    if (success) {
      if (onShowToast) onShowToast('📱 Widget-Design erfolgreich auf Android angewendet!', 'success');
    } else {
      if (onShowToast) onShowToast('Konfiguration lokal gesichert.', 'info');
    }
  };

  const nextMeeting = calendarEvents && calendarEvents.length > 0 ? calendarEvents[0] : null;
  const limitedTodos = Array.isArray(dashTodos) ? dashTodos.slice(0, config.todoLimit || 3) : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* 1. Header & Intro */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Palette size={18} style={{ color: 'var(--accent-cyan)' }} />
            <span>Widget-Studio & Design-Konfigurator</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            Passe deine Android-Widgets nach deinem Geschmack an – mit Live-Vorschau
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveAndSync}
          disabled={isApplying}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.55rem 0.9rem',
            color: '#ffffff',
            fontSize: '0.78rem',
            fontWeight: 800,
            cursor: isApplying ? 'wait' : 'pointer',
            boxShadow: '0 4px 14px rgba(6, 182, 212, 0.3)'
          }}
        >
          <Smartphone size={16} />
          <span>{isApplying ? 'Wird angewendet...' : '📱 Auf Startbildschirm anwenden'}</span>
        </button>
      </div>

      {/* 2. Grid: Live-Preview (Links) & Konfigurator (Rechts) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', alignItems: 'start' }}>
        
        {/* LINKS: Live Smartphone Mockup */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            📱 Live Startbildschirm-Vorschau
          </div>

          {/* Smartphone Frame */}
          <div 
            style={{
              width: '100%',
              maxWidth: '300px',
              minHeight: '460px',
              background: 'radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)',
              border: '6px solid #334155',
              borderRadius: '2rem',
              padding: '1.25rem 0.75rem',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 0 10px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxSizing: 'border-box'
            }}
          >
            {/* Top Speaker / Notch */}
            <div 
              style={{
                width: '60px',
                height: '4px',
                background: '#475569',
                borderRadius: '2px',
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />

            {/* Widget Container Inside Phone */}
            <div
              style={{
                background: currentTheme.bg,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '1rem',
                padding: '0.75rem',
                color: currentTheme.text,
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Widget Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.35rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: currentTheme.accent, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>⚡ FOUNDER OS</span>
                </div>
                {config.showStreak && (
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '1rem', background: currentTheme.badgeBg, color: currentTheme.badgeText }}>
                    🔥 {streak}d Streak
                  </span>
                )}
              </div>

              {/* Tages-Fokus Modul */}
              {config.showDailyGoal && (
                <div style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.03)', padding: '0.35rem 0.5rem', borderRadius: '0.4rem', borderLeft: `3px solid ${currentTheme.accent}` }}>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>🎯 Tages-Fokus</div>
                  <div style={{ fontWeight: 600, color: currentTheme.text, marginTop: '0.1rem' }}>
                    {dailyGoal && dailyGoal.trim() ? dailyGoal : 'Wachstum & Akquise im Harz'}
                  </div>
                </div>
              )}

              {/* Nächster Kalender-Termin */}
              {config.showMeeting && (
                <div style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(6, 182, 212, 0.08)', padding: '0.3rem 0.5rem', borderRadius: '0.4rem', color: currentTheme.accent }}>
                  <Calendar size={13} style={{ flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {nextMeeting ? `${nextMeeting.time} ${nextMeeting.title}` : '14:00 Kanzlei-Audit Harz'}
                  </span>
                </div>
              )}

              {/* Notiz Modul */}
              {config.showNotes && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.5rem', borderRadius: '0.4rem' }}>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.15rem' }}>📌 Schnellnotiz</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', lineHeight: 1.3, maxHeight: '42px', overflow: 'hidden' }}>
                    {dashNotes && dashNotes.trim() ? dashNotes : 'Angebote für 518 Meister nachfassen...'}
                  </div>
                </div>
              )}

              {/* To-Dos Modul */}
              {config.showTodos && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.5rem', borderRadius: '0.4rem' }}>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>☑️ Aufgaben ({limitedTodos.length})</span>
                    <span>Limit: Top {config.todoLimit}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    {limitedTodos.map((todo, idx) => (
                      <div key={idx} style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ color: currentTheme.accent }}>{todo.completed || todo.done ? '☑' : '☐'}</span>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textDecoration: todo.completed || todo.done ? 'line-through' : 'none' }}>
                          {todo.text || todo.title || `Aufgabe #${idx + 1}`}
                        </span>
                      </div>
                    ))}
                    {limitedTodos.length === 0 && (
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Keine offenen Aufgaben</div>
                    )}
                  </div>
                </div>
              )}

              {/* CRM Radar Modul */}
              {config.showCrm && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.35rem', borderRadius: '0.4rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>📞 Wiedervorlagen</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>3 fällig</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.35rem', borderRadius: '0.4rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>🏆 Kunden</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399' }}>{leads ? leads.length : 518}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Home Indicator */}
            <div 
              style={{
                width: '90px',
                height: '4px',
                background: '#475569',
                borderRadius: '2px',
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </div>
        </div>

        {/* RECHTS: 1-Klick Presets & Feintuning */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* 1-Klick Presets */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              ⚡ 1-Klick Schnell-Profile
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
              {Object.keys(WIDGET_PRESETS).map(key => {
                const p = WIDGET_PRESETS[key];
                const isSelected = activePreset === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleApplyPreset(key)}
                    style={{
                      padding: '0.55rem',
                      background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isSelected ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                      borderRadius: '0.5rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.15rem'
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                      {p.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modul Sichtbarkeiten */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              🎛️ Modul-Sichtbarkeit
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              
              {/* Notiz */}
              <div onClick={() => handleToggle('showNotes')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.65rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.4rem', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>📌 Notiz-Kachel</span>
                <input type="checkbox" checked={config.showNotes} onChange={() => {}} style={{ accentColor: 'var(--accent-cyan)' }} />
              </div>

              {/* To-Dos & Limit */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', padding: '0.45rem 0.65rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.4rem' }}>
                <div onClick={() => handleToggle('showTodos')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>☑️ Aufgaben-Kachel</span>
                  <input type="checkbox" checked={config.showTodos} onChange={() => {}} style={{ accentColor: 'var(--accent-cyan)' }} />
                </div>
                {config.showTodos && (
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
                    <button 
                      type="button"
                      onClick={() => handleChange('todoLimit', 3)} 
                      style={{ flex: 1, padding: '0.25rem', fontSize: '0.68rem', borderRadius: '0.3rem', border: '1px solid var(--border-color)', background: config.todoLimit === 3 ? 'var(--accent-cyan)' : 'transparent', color: config.todoLimit === 3 ? '#000' : 'var(--text-secondary)', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Top 3
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleChange('todoLimit', 5)} 
                      style={{ flex: 1, padding: '0.25rem', fontSize: '0.68rem', borderRadius: '0.3rem', border: '1px solid var(--border-color)', background: config.todoLimit === 5 ? 'var(--accent-cyan)' : 'transparent', color: config.todoLimit === 5 ? '#000' : 'var(--text-secondary)', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Top 5
                    </button>
                  </div>
                )}
              </div>

              {/* CRM Pipeline */}
              <div onClick={() => handleToggle('showCrm')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.65rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.4rem', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>📞 CRM & Lead-Radar</span>
                <input type="checkbox" checked={config.showCrm} onChange={() => {}} style={{ accentColor: 'var(--accent-cyan)' }} />
              </div>

              {/* Streak */}
              <div onClick={() => handleToggle('showStreak')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.65rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.4rem', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>🔥 Habit-Streak Badge</span>
                <input type="checkbox" checked={config.showStreak} onChange={() => {}} style={{ accentColor: 'var(--accent-cyan)' }} />
              </div>

              {/* Google Kalender Termin */}
              <div onClick={() => handleToggle('showMeeting')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.65rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.4rem', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>📅 Nächster Google-Termin</span>
                <input type="checkbox" checked={config.showMeeting} onChange={() => {}} style={{ accentColor: 'var(--accent-cyan)' }} />
              </div>

              {/* Tages-Hauptziel */}
              <div onClick={() => handleToggle('showDailyGoal')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.65rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.4rem', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>🎯 Tages-Fokus Ziel</span>
                <input type="checkbox" checked={config.showDailyGoal} onChange={() => {}} style={{ accentColor: 'var(--accent-cyan)' }} />
              </div>
            </div>
          </div>

          {/* Design & Transparenz */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              🎨 Farbschema & Transparenz
            </div>
            
            {/* Theme Radio Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', marginBottom: '0.6rem' }}>
              {Object.keys(THEME_STYLES).map(tKey => {
                const isT = config.theme === tKey;
                return (
                  <button
                    key={tKey}
                    type="button"
                    onClick={() => handleChange('theme', tKey)}
                    style={{
                      padding: '0.4rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      borderRadius: '0.4rem',
                      border: `1px solid ${isT ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                      background: isT ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.02)',
                      color: isT ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {THEME_STYLES[tKey].name}
                  </button>
                );
              })}
            </div>

            {/* Slider Transparenz */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.55rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                <span>Deckkraft / Opazität</span>
                <span style={{ color: 'var(--accent-cyan)' }}>{config.bgAlpha}%</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="100" 
                step="5"
                value={config.bgAlpha} 
                onChange={(e) => handleChange('bgAlpha', Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Klick-Routing */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              🚀 Klick-Aktion beim Antippen
            </div>
            <select
              value={config.tapAction}
              onChange={(e) => handleChange('tapAction', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.4rem',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.78rem'
              }}
            >
              <option value="dashboard">⚡ Dashboard & Tages-Übersicht</option>
              <option value="kanban">☑️ Aufgaben & To-Do Liste</option>
              <option value="crm">📞 CRM & Kunden-Akte</option>
              <option value="voice">🎙️ Voice & Quick-Capture Studio</option>
            </select>
          </div>
        </div>

      </div>

    </div>
  );
};

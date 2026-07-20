import React from 'react';
import { Settings } from 'lucide-react';

export const SettingsView = ({
  isEditingDashboard,
  dashboardWidgets,
  setDashboardWidgets
}) => {
  if (!isEditingDashboard) return null;

  const widgetOptions = [
    { key: 'financial', label: 'Finanz-Cockpit & Pipeline', desc: 'Umsatzprognose & Ø Stundensätze' },
    { key: 'einvoice', label: 'E-Rechnung (ZUGFeRD)', desc: 'B2B Rechnungs- & XML Generator' },
    { key: 'quickcapture', label: 'Quick Capture', desc: 'Schnelle Notiz- & Idee-Erfassung' },
    { key: 'calendar', label: 'Google Kalender', desc: 'Tagestermine & Meetings' },
    { key: 'habits', label: 'Habit Tracker & Streak', desc: 'Gewohnheiten & CSS-Konfetti' },
    { key: 'weekly', label: 'Wochen-Review & Archiv', desc: 'Reflexionen & PDF-Wochenbericht' },
    { key: 'notes', label: 'Offline-Notizen & Aufgaben', desc: '100% lokale Notizen & Checkliste' },
    { key: 'simpleNotes', label: '📌 Einfacher Notizzettel (Haftnotiz)', desc: 'Einfacher Zettel mit Farbwahl' },
    { key: 'simpleTodos', label: '✍️ Einfache Aufgabenliste', desc: 'Schlanke To-Do-Checkliste' },
    { key: 'simpleCalendar', label: '📅 Einfacher Terminkalender', desc: 'Tagesagenda ohne Google-Sync' },
    { key: 'simpleGoal', label: '🎯 Tages-Hauptziel (Fokus)', desc: 'Fokus-Feld für die wichtigste Aufgabe' },
    { key: 'simpleLinks', label: '🔗 Quick-Links (Link-Sammlung)', desc: 'Deine Lesezeichen-Sammlung' }
  ];

  return (
    <div className="card" style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px dashed var(--accent-cyan)', animation: 'fadeIn 0.2s ease-out' }}>
      <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
        <h3 className="card-title" style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Settings size={16} /> Dashboard-Widgets konfigurieren
        </h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Aktiviere oder deaktiviere die Widgets, um dein Dashboard anzupassen.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
        {widgetOptions.map((w) => (
          <label 
            key={w.key} 
            htmlFor={`widget-check-${w.key}`}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.25rem', 
              padding: '0.75rem', 
              background: dashboardWidgets[w.key] ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255, 255, 255, 0.01)', 
              border: dashboardWidgets[w.key] ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid var(--border-color)', 
              borderRadius: '0.5rem', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: dashboardWidgets[w.key] ? 'white' : 'var(--text-secondary)' }}>{w.label}</span>
              <input 
                id={`widget-check-${w.key}`}
                type="checkbox" 
                checked={dashboardWidgets[w.key]} 
                onChange={() => setDashboardWidgets(prev => ({ ...prev, [w.key]: !prev[w.key] }))}
                style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
            </div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{w.desc}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

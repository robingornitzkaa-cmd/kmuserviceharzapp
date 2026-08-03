import React from 'react';
import { Settings, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';

export const DEFAULT_WIDGET_ORDER = [
  'simpleGoal',
  'simpleNotes',
  'simpleTodos',
  'simpleCalendar',
  'simpleLinks',
  'financial',
  'einvoice',
  'quickcapture',
  'calendar',
  'habits',
  'weekly',
  'notes'
];

export const getWidgetOrder = (dashboardWidgets) => {
  if (!dashboardWidgets) return DEFAULT_WIDGET_ORDER;
  const currentOrder = Array.isArray(dashboardWidgets.order) ? dashboardWidgets.order : DEFAULT_WIDGET_ORDER;
  const missingKeys = DEFAULT_WIDGET_ORDER.filter(k => !currentOrder.includes(k));
  return [...currentOrder, ...missingKeys];
};

export const SettingsView = ({
  isEditingDashboard,
  dashboardWidgets,
  setDashboardWidgets
}) => {
  if (!isEditingDashboard) return null;

  const widgetDefinitions = {
    financial: { label: 'Finanz-Cockpit & Pipeline', desc: 'Umsatzprognose & Ø Stundensätze' },
    einvoice: { label: 'E-Rechnung (ZUGFeRD)', desc: 'B2B Rechnungs- & XML Generator' },
    quickcapture: { label: 'Quick Capture', desc: 'Schnelle Notiz- & Idee-Erfassung' },
    calendar: { label: 'Google Kalender', desc: 'Tagestermine & Meetings' },
    habits: { label: 'Habit Tracker & Streak', desc: 'Gewohnheiten & CSS-Konfetti' },
    weekly: { label: 'Wochen-Review & Archiv', desc: 'Reflexionen & PDF-Wochenbericht' },
    notes: { label: 'Offline-Notizen & Aufgaben', desc: '100% lokale Notizen & Checkliste' },
    simpleNotes: { label: '📌 Einfacher Notizzettel (Haftnotiz)', desc: 'Einfacher Zettel mit Farbwahl' },
    simpleTodos: { label: '✍️ Einfache Aufgabenliste', desc: 'Schlanke To-Do-Checkliste' },
    simpleCalendar: { label: '📅 Einfacher Terminkalender', desc: 'Tagesagenda ohne Google-Sync' },
    simpleGoal: { label: '🎯 Tages-Hauptziel (Fokus)', desc: 'Fokus-Feld für die wichtigste Aufgabe' },
    simpleLinks: { label: '🔗 Quick-Links (Link-Sammlung)', desc: 'Deine Lesezeichen-Sammlung' }
  };

  const currentOrder = getWidgetOrder(dashboardWidgets);

  const moveWidget = (key, direction) => {
    const order = [...currentOrder];
    const index = order.indexOf(key);
    if (index === -1) return;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= order.length) return;

    const temp = order[index];
    order[index] = order[targetIndex];
    order[targetIndex] = temp;

    setDashboardWidgets(prev => ({
      ...prev,
      order
    }));
  };

  const handleResetOrder = () => {
    setDashboardWidgets(prev => ({
      ...prev,
      order: DEFAULT_WIDGET_ORDER
    }));
  };

  return (
    <div className="card" style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px dashed var(--accent-cyan)', animation: 'fadeIn 0.2s ease-out' }}>
      <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="card-title" style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.35rem', margin: 0 }}>
            <Settings size={16} /> Dashboard-Widgets konfigurieren & verschieben
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
            Nutze die Häkchen zum Aktivieren/Deaktivieren und die Pfeile ⬆️ ⬇️ zum Anpassen der Reihenfolge.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetOrder}
          className="btn btn-secondary"
          style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          title="Zurück zur Standard-Reihenfolge"
        >
          <RotateCcw size={12} /> Standard-Reihenfolge
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
        {currentOrder.map((key, index) => {
          const w = widgetDefinitions[key] || { label: key, desc: '' };
          const isEnabled = Boolean(dashboardWidgets[key]);

          return (
            <div 
              key={key} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.4rem', 
                padding: '0.75rem', 
                background: isEnabled ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255, 255, 255, 0.01)', 
                border: isEnabled ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid var(--border-color)', 
                borderRadius: '0.5rem', 
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    fontWeight: 700, 
                    padding: '0.1rem 0.35rem', 
                    borderRadius: '0.25rem', 
                    background: isEnabled ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)', 
                    color: isEnabled ? '#0f172a' : 'var(--text-muted)' 
                  }}>
                    #{index + 1}
                  </span>
                  <label htmlFor={`widget-check-${key}`} style={{ fontSize: '0.8rem', fontWeight: 700, color: isEnabled ? 'white' : 'var(--text-secondary)', cursor: 'pointer' }}>{w.label}</label>
                </div>

                <input 
                  id={`widget-check-${key}`}
                  type="checkbox" 
                  checked={isEnabled} 
                  onChange={() => setDashboardWidgets(prev => ({ ...prev, [key]: !prev[key] }))}
                  style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', flexGrow: 1 }}>{w.desc}</span>

                <div style={{ display: 'flex', gap: '0.2rem', marginLeft: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => moveWidget(key, -1)}
                    disabled={index === 0}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '0.25rem',
                      color: index === 0 ? 'rgba(255,255,255,0.2)' : 'white',
                      padding: '0.2rem 0.35rem',
                      cursor: index === 0 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Nach oben verschieben"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveWidget(key, 1)}
                    disabled={index === currentOrder.length - 1}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '0.25rem',
                      color: index === currentOrder.length - 1 ? 'rgba(255,255,255,0.2)' : 'white',
                      padding: '0.2rem 0.35rem',
                      cursor: index === currentOrder.length - 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Nach unten verschieben"
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  X, 
  Smartphone, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  RotateCw, 
  ShieldCheck, 
  Flame, 
  Users, 
  CheckSquare, 
  HelpCircle,
  Volume2,
  VolumeX,
  Calendar,
  Mail,
  Palette
} from 'lucide-react';
import { 
  getNotificationSettings, 
  saveNotificationSettings, 
  checkNotificationPermission, 
  requestNotificationPermission, 
  sendTestNotification,
  scheduleMorningFocus
} from '../services/notificationService.js';
import { updateAndroidWidget } from '../services/widget.js';
import { WidgetStudio } from './WidgetStudio.jsx';

export const NotificationCenterModal = ({ 
  isOpen, 
  onClose,
  dashNotes,
  dashTodos,
  leads = [],
  streak = 0,
  dailyGoal = '',
  calendarEvents = [],
  gmailMessages = [],
  onShowToast
}) => {
  const [activeModalTab, setActiveModalTab] = useState('notifications'); // 'notifications' | 'studio'
  const [settings, setSettings] = useState(getNotificationSettings());
  const [hasPermission, setHasPermission] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncingWidgets, setIsSyncingWidgets] = useState(false);
  const [showWidgetGuide, setShowWidgetGuide] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(getNotificationSettings());
      checkNotificationPermission().then(setHasPermission);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    saveNotificationSettings(updated);
    if (onShowToast) onShowToast('Einstellung gespeichert', 'info');
  };

  const handleTimeChange = (e) => {
    const timeVal = e.target.value;
    const updated = { ...settings, morningFocusTime: timeVal };
    setSettings(updated);
    saveNotificationSettings(updated);
    scheduleMorningFocus(dailyGoal);
  };

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    setHasPermission(granted);
    if (granted) {
      if (onShowToast) onShowToast('Benachrichtigungen erfolgreich aktiviert! 🚀', 'success');
    } else {
      if (onShowToast) onShowToast('Berechtigung wurde abgelehnt oder blockiert.', 'warning');
    }
  };

  const handleSendTest = async () => {
    setIsTesting(true);
    const res = await sendTestNotification();
    setIsTesting(false);
    if (res.success) {
      if (onShowToast) onShowToast('Test-Benachrichtigung gesendet! 🔔', 'success');
    } else {
      if (onShowToast) onShowToast('Konnte Benachrichtigung nicht senden (Prüfe Berechtigungen)', 'warning');
    }
  };

  const handleManualWidgetSync = async () => {
    setIsSyncingWidgets(true);
    const success = await updateAndroidWidget({
      dashNotes,
      dashTodos,
      leads,
      streak,
      dailyGoal,
      calendarEvents,
      gmailMessages
    });
    setIsSyncingWidgets(false);
    if (success) {
      if (onShowToast) onShowToast('📱 Alle 4 Android-Widgets aktualisiert!', 'success');
    } else {
      if (onShowToast) onShowToast('Widget-Daten lokal gespeichert.', 'info');
    }
  };

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
        zIndex: 9999,
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
          maxWidth: activeModalTab === 'studio' ? '820px' : '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'linear-gradient(145deg, #0d1527 0%, #080d1a 100%)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.15)',
          color: '#f8fafc',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          transition: 'max-width 0.2s ease'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.6rem', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
              <Bell size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Push-Benachrichtigungen & Widgets
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>
                Zentrale Schaltzentrale für Smartphone-Alarme, Google-Radar & Startbildschirm
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.35rem'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.3rem', borderRadius: '0.6rem', border: '1px solid var(--border-color)' }}>
          <button
            type="button"
            onClick={() => setActiveModalTab('notifications')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.5rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              borderRadius: '0.45rem',
              border: 'none',
              background: activeModalTab === 'notifications' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
              color: activeModalTab === 'notifications' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Bell size={15} />
            <span>Benachrichtigungen & Alarme</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModalTab('studio')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.5rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              borderRadius: '0.45rem',
              border: 'none',
              background: activeModalTab === 'studio' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
              color: activeModalTab === 'studio' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Palette size={15} />
            <span>🎨 Widget-Studio & Design</span>
          </button>
        </div>

        {/* TAB 1: NOTIFICATIONS CONTENT */}
        {activeModalTab === 'notifications' && (
          <>
            {/* Permission Status Banner */}
            <div 
              style={{ 
                padding: '0.85rem 1rem', 
                borderRadius: '0.75rem', 
                background: hasPermission ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                border: hasPermission ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {hasPermission ? (
                  <ShieldCheck size={22} style={{ color: '#10b981', flexShrink: 0 }} />
                ) : (
                  <AlertCircle size={22} style={{ color: '#f59e0b', flexShrink: 0 }} />
                )}
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: hasPermission ? '#34d399' : '#fbbf24' }}>
                    {hasPermission ? 'Benachrichtigungen sind im System erlaubt' : 'System-Berechtigung ausstehend'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    {hasPermission 
                      ? 'Founder OS kann dir Alarme auf dem Sperrbildschirm und Desktop senden.' 
                      : 'Aktiviere die Berechtigung, damit Alarme für Leads und Aufgaben ankommen.'}
                  </div>
                </div>
              </div>

              {!hasPermission && (
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                    color: '#0f172a',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  Jetzt Erlauben
                </button>
              )}
            </div>

            {/* Master Toggle & Sound */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div 
                onClick={() => handleToggle('enabled')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: settings.enabled ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255,255,255,0.02)',
                  border: settings.enabled ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid var(--border-color)',
                  borderRadius: '0.65rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Bell size={18} style={{ color: settings.enabled ? 'var(--accent-cyan)' : 'var(--text-muted)' }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Hauptschalter</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Alle Benachrichtigungen</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.enabled} 
                  onChange={() => {}} 
                  style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }} 
                />
              </div>

              <div 
                onClick={() => handleToggle('sound')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: settings.sound ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255,255,255,0.02)',
                  border: settings.sound ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid var(--border-color)',
                  borderRadius: '0.65rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {settings.sound ? (
                    <Volume2 size={18} style={{ color: 'var(--accent-cyan)' }} />
                  ) : (
                    <VolumeX size={18} style={{ color: 'var(--text-muted)' }} />
                  )}
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Signalton</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Akustischer Alarm</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.sound} 
                  onChange={() => {}} 
                  style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }} 
                />
              </div>
            </div>

            {/* Trigger Kategorien */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Benachrichtigungs-Trigger (Auslöser)
              </div>

              {/* CRM Follow-ups */}
              <div 
                onClick={() => handleToggle('crmFollowUps')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Users size={18} style={{ color: '#38bdf8' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>📞 CRM-Wiedervorlagen & Lead-Follow-ups</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Erinnerung am Fälligkeitstag für anstehende Kundengespräche</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.crmFollowUps} 
                  onChange={() => {}} 
                  style={{ accentColor: 'var(--accent-cyan)' }} 
                />
              </div>

              {/* To-Do Deadlines */}
              <div 
                onClick={() => handleToggle('todoDeadlines')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckSquare size={18} style={{ color: '#34d399' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>⏰ To-Do Fristen & Aufgaben-Flow</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Erinnerung an wichtige offene Kern-Aufgaben</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.todoDeadlines} 
                  onChange={() => {}} 
                  style={{ accentColor: 'var(--accent-cyan)' }} 
                />
              </div>

              {/* Täglicher Morgen-Fokus mit Uhrzeit-Wähler */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Clock size={18} style={{ color: '#fbbf24' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>☀️ Täglicher Morgen-Fokus</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Start-Erinnerung mit deinem Tages-Hauptziel
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <input 
                    type="time" 
                    value={settings.morningFocusTime || '08:00'}
                    onChange={handleTimeChange}
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '0.35rem',
                      color: 'var(--text-primary)',
                      padding: '0.2rem 0.4rem',
                      fontSize: '0.75rem'
                    }}
                  />
                  <input 
                    type="checkbox" 
                    checked={settings.morningFocus} 
                    onChange={() => handleToggle('morningFocus')} 
                    style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }} 
                  />
                </div>
              </div>

              {/* Habit & Streak */}
              <div 
                onClick={() => handleToggle('streaks')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Flame size={18} style={{ color: '#f97316' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>🔥 Habit Tracker & Streak-Schutz</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Erinnerung zum Schutz deines täglichen Momentum-Streaks</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.streaks} 
                  onChange={() => {}} 
                  style={{ accentColor: 'var(--accent-cyan)' }} 
                />
              </div>

              {/* Google Kalender 15-Minuten-Vorab-Alarme */}
              <div 
                onClick={() => handleToggle('googleCalendarReminders')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Calendar size={18} style={{ color: '#06b6d4' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>📅 Google Kalender Vorab-Alarme</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Erinnert dich automatisch 15–30 Minuten vor jedem anstehenden Termin</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.googleCalendarReminders} 
                  onChange={() => {}} 
                  style={{ accentColor: 'var(--accent-cyan)' }} 
                />
              </div>

              {/* Gmail Posteingangs-Radar */}
              <div 
                onClick={() => handleToggle('gmailRadar')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Mail size={18} style={{ color: '#ef4444' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>✉️ Gmail Posteingangs-Radar</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Benachrichtigung sofort bei neuen ungelesenen E-Mails</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.gmailRadar} 
                  onChange={() => {}} 
                  style={{ accentColor: 'var(--accent-cyan)' }} 
                />
              </div>
            </div>

            {/* Action Buttons & Widget Sync */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleSendTest}
                  disabled={isTesting}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    borderRadius: '0.5rem',
                    padding: '0.55rem 0.85rem',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: isTesting ? 'wait' : 'pointer'
                  }}
                >
                  <Sparkles size={16} />
                  <span>{isTesting ? 'Sende...' : '🧪 Test-Benachrichtigung senden'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleManualWidgetSync}
                  disabled={isSyncingWidgets}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    padding: '0.55rem 0.85rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: isSyncingWidgets ? 'wait' : 'pointer'
                  }}
                >
                  <RotateCw size={16} className={isSyncingWidgets ? 'spin' : ''} />
                  <span>{isSyncingWidgets ? 'Sync...' : '📱 Widgets manuell updaten'}</span>
                </button>
              </div>

              {/* Widget Guide Accordion */}
              <div style={{ marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowWidgetGuide(!showWidgetGuide)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '0.25rem 0'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Smartphone size={14} />
                    <span>Wie füge ich das Widget zum Startbildschirm hinzu?</span>
                  </span>
                  <span>{showWidgetGuide ? '▲' : '▼'}</span>
                </button>

                {showWidgetGuide && (
                  <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.2rem' }}>So platzierst du die Widgets auf Android:</div>
                    <div><strong>Schritt 1:</strong> Gehe auf den Android Startbildschirm.</div>
                    <div><strong>Schritt 2:</strong> Halte den Finger auf einer freien Stelle gedrückt.</div>
                    <div><strong>Schritt 3:</strong> Wähle <em>Widgets</em> und suche nach <em>Founder OS</em>.</div>
                    <div><strong>Schritt 4:</strong> Wähle eines der 4 Widgets (z. B. All-in-One Power Widget oder To-Dos) und ziehe es auf deinen Bildschirm.</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* TAB 2: WIDGET-STUDIO CONTENT */}
        {activeModalTab === 'studio' && (
          <WidgetStudio
            dashNotes={dashNotes}
            dashTodos={dashTodos}
            leads={leads}
            streak={streak}
            dailyGoal={dailyGoal}
            calendarEvents={calendarEvents}
            gmailMessages={gmailMessages}
            onShowToast={onShowToast}
          />
        )}
      </div>
    </div>
  );
};

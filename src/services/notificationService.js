import { Capacitor } from '@capacitor/core';

// Dynamischer Import oder Fallback für Capacitor-Plugins
let LocalNotifications = null;
let PushNotifications = null;

const initCapacitorPlugins = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      const ln = await import('@capacitor/local-notifications');
      LocalNotifications = ln.LocalNotifications;
    } catch (e) {
      console.warn('[NotificationService] LocalNotifications Plugin nicht verfügbar:', e);
    }
    try {
      const pn = await import('@capacitor/push-notifications');
      PushNotifications = pn.PushNotifications;
    } catch (e) {
      console.warn('[NotificationService] PushNotifications Plugin nicht verfügbar:', e);
    }
  }
};

// Initialisierungs-Versuch
initCapacitorPlugins();

const SETTINGS_KEY = 'founder_notification_settings';

export const DEFAULT_NOTIFICATION_SETTINGS = {
  enabled: true,
  crmFollowUps: true,
  todoDeadlines: true,
  morningFocus: true,
  morningFocusTime: '08:00',
  clientPortal: true,
  streaks: true,
  sound: true
};

const getGlobalNotification = () => {
  if (typeof window !== 'undefined' && window.Notification) {
    return window.Notification;
  }
  if (typeof Notification !== 'undefined') {
    return Notification;
  }
  return null;
};

/**
 * Lädt die gespeicherten Benachrichtigungs-Einstellungen
 */
export const getNotificationSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_NOTIFICATION_SETTINGS };
    return { ...DEFAULT_NOTIFICATION_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_NOTIFICATION_SETTINGS };
  }
};

/**
 * Speichert Benachrichtigungs-Einstellungen und aktualisiert Zeitpläne
 */
export const saveNotificationSettings = (newSettings) => {
  try {
    const updated = { ...getNotificationSettings(), ...newSettings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('[NotificationService] Fehler beim Speichern der Einstellungen:', e);
    return DEFAULT_NOTIFICATION_SETTINGS;
  }
};

/**
 * Prüft den aktuellen Berechtigungs-Status
 */
export const checkNotificationPermission = async () => {
  if (Capacitor.isNativePlatform()) {
    if (LocalNotifications) {
      try {
        const status = await LocalNotifications.checkPermissions();
        return status.display === 'granted';
      } catch (e) {
        console.warn('[NotificationService] checkPermissions Fehler:', e);
      }
    }
    return false;
  }

  const Notif = getGlobalNotification();
  if (Notif) {
    return Notif.permission === 'granted';
  }
  return false;
};

/**
 * Fordert Berechtigung für Benachrichtigungen an
 */
export const requestNotificationPermission = async () => {
  if (Capacitor.isNativePlatform()) {
    let localGranted = false;
    let pushGranted = false;

    if (LocalNotifications) {
      try {
        const res = await LocalNotifications.requestPermissions();
        localGranted = res.display === 'granted';
      } catch (e) {
        console.warn('[NotificationService] LocalNotifications Permission Error:', e);
      }
    }

    if (PushNotifications) {
      try {
        const res = await PushNotifications.requestPermissions();
        pushGranted = res.receive === 'granted';
        if (pushGranted) {
          await PushNotifications.register();
        }
      } catch (e) {
        console.warn('[NotificationService] PushNotifications Permission Error:', e);
      }
    }

    return localGranted || pushGranted;
  }

  const Notif = getGlobalNotification();
  if (Notif && typeof Notif.requestPermission === 'function') {
    try {
      const permission = await Notif.requestPermission();
      return permission === 'granted';
    } catch (e) {
      console.error('[NotificationService] Web Notification Permission Error:', e);
      return false;
    }
  }

  return false;
};

/**
 * Sendet eine sofortige System- oder Web-Benachrichtigung
 */
export const sendImmediateNotification = async ({ title, body, icon = '/favicon.svg', tag = 'founder-os', data = {} }) => {
  const settings = getNotificationSettings();
  if (!settings.enabled) return false;

  // 1. Native Capacitor Local Notifications
  if (Capacitor.isNativePlatform() && LocalNotifications) {
    try {
      const hasPerm = await checkNotificationPermission();
      if (!hasPerm) {
        const granted = await requestNotificationPermission();
        if (!granted) return false;
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Math.random() * 1000000) + 1,
            title: title || 'Founder OS',
            body: body || '',
            schedule: { at: new Date(Date.now() + 100) },
            sound: settings.sound ? 'beep.wav' : undefined,
            smallIcon: 'ic_launcher',
            extra: data
          }
        ]
      });
      return true;
    } catch (e) {
      console.warn('[NotificationService] Native LocalNotification failed, fallback to Web:', e);
    }
  }

  // 2. Web Notifications & Service Worker
  const Notif = getGlobalNotification();
  if (Notif && Notif.permission === 'granted') {
    try {
      // Wenn Service Worker aktiv ist, showNotification nutzen (wichtig für Mobile/PWA)
      if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && navigator.serviceWorker?.controller) {
        const reg = await navigator.serviceWorker.ready;
        if (reg && typeof reg.showNotification === 'function') {
          await reg.showNotification(title, {
            body,
            icon,
            badge: icon,
            tag,
            data,
            vibrate: settings.sound ? [100, 50, 100] : undefined
          });
          return true;
        }
      }

      // Direkter Browser Fallback (sowohl Konstruktor new Notif() als auch Funktionsaufruf unterstützen)
      try {
        new Notif(title, {
          body,
          icon,
          tag,
          data
        });
      } catch {
        Notif(title, {
          body,
          icon,
          tag,
          data
        });
      }
      return true;
    } catch (e) {
      console.error('[NotificationService] Web Notification error:', e);
    }
  }

  return false;
};

/**
 * Sendet eine Test-Benachrichtigung
 */
export const sendTestNotification = async () => {
  const hasPerm = await checkNotificationPermission();
  if (!hasPerm) {
    const granted = await requestNotificationPermission();
    if (!granted) {
      return { success: false, reason: 'permission_denied' };
    }
  }

  const success = await sendImmediateNotification({
    title: '🚀 Founder OS • Benachrichtigung aktiv!',
    body: 'Perfekt! Dein System ist bereit für CRM-Wiedervorlagen, Morgen-Fokus und Status-Alerts.',
    tag: 'test-notification',
    data: { action: 'open_dashboard', timestamp: Date.now() }
  });

  return { success: Boolean(success) };
};

/**
 * Plant den täglichen Morgen-Fokus Alarm
 */
export const scheduleMorningFocus = async (focusGoal) => {
  const settings = getNotificationSettings();
  if (!settings.enabled || !settings.morningFocus) return;

  const [hours, minutes] = (settings.morningFocusTime || '08:00').split(':').map(Number);
  const now = new Date();
  const scheduleTime = new Date();
  scheduleTime.setHours(hours, minutes, 0, 0);

  // Wenn die Zeit heute schon vorbei ist, für morgen planen
  if (scheduleTime <= now) {
    scheduleTime.setDate(scheduleTime.getDate() + 1);
  }

  const goalText = focusGoal && focusGoal.trim() ? `🎯 Hauptziel: "${focusGoal}"` : 'Starte stark in den Tag & prüfe deine Prioritäten.';

  if (Capacitor.isNativePlatform() && LocalNotifications) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1001, // Reservierte ID für Morgen-Fokus
            title: '☀️ Guten Morgen Founder!',
            body: goalText,
            schedule: {
              at: scheduleTime,
              repeats: true,
              every: 'day'
            },
            extra: { type: 'morning_focus' }
          }
        ]
      });
    } catch (e) {
      console.warn('[NotificationService] Morgen-Fokus Schedule fehlgeschlagen:', e);
    }
  }
};

/**
 * Synchronisiert Lead-Wiedervorlagen und erinnert an anstehende Kontakte
 */
export const checkAndNotifyFollowUps = (leads = []) => {
  const settings = getNotificationSettings();
  if (!settings.enabled || !settings.crmFollowUps || !Array.isArray(leads)) return;

  const todayStr = new Date().toISOString().split('T')[0];
  const dueLeads = leads.filter(l => {
    if (l.status === 'Won' || l.status === 'Gewonnen' || l.status === 'Lost') return false;
    const followDate = l.followUpDate || l.nextFollowUp || l.date;
    return followDate && String(followDate).startsWith(todayStr);
  });

  if (dueLeads.length > 0) {
    const first = dueLeads[0];
    const moreText = dueLeads.length > 1 ? ` (+${dueLeads.length - 1} weitere)` : '';
    sendImmediateNotification({
      title: `📞 ${dueLeads.length} CRM Wiedervorlage(n) heute fällig!`,
      body: `Kontakt: ${first.company || first.name || 'Lead'}${moreText}. Jetzt anrufen oder Angebot nachfassen.`,
      tag: 'crm-followup-due',
      data: { type: 'crm', leadId: first.id }
    });
  }
};

/**
 * Synchronisiert To-Do-Fristen
 */
export const checkAndNotifyDueTodos = (todos = []) => {
  const settings = getNotificationSettings();
  if (!settings.enabled || !settings.todoDeadlines || !Array.isArray(todos)) return;

  const activeTodos = todos.filter(t => !t.done && (t.text || t.title));
  if (activeTodos.length >= 3) {
    const uncompletedCount = activeTodos.length;
    const firstTask = activeTodos[0].text || activeTodos[0].title;
    
    // Nur benachrichtigen, wenn nicht kürzlich gesendet
    const lastTodoNotify = sessionStorage.getItem('last_todo_notification_ts');
    const now = Date.now();
    if (!lastTodoNotify || now - Number(lastTodoNotify) > 1000 * 60 * 60 * 4) { // alle 4 Std max
      sessionStorage.setItem('last_todo_notification_ts', String(now));
      sendImmediateNotification({
        title: `✍️ ${uncompletedCount} offene Aufgaben auf der Liste`,
        body: `Nächster Schritt: "${firstTask}". Halte den Momentum-Flow aufrecht!`,
        tag: 'todo-reminder',
        data: { type: 'todos' }
      });
    }
  }
};

/**
 * Habit & Streak Erinnerung
 */
export const checkAndNotifyHabitStreak = (habits = [], streak = 0) => {
  const settings = getNotificationSettings();
  if (!settings.enabled || !settings.streaks) return;

  const incomplete = habits.filter(h => !h.completed && !h.done);
  if (incomplete.length > 0) {
    const lastHabitNotify = sessionStorage.getItem('last_habit_notification_ts');
    const now = Date.now();
    if (!lastHabitNotify || now - Number(lastHabitNotify) > 1000 * 60 * 60 * 6) {
      sessionStorage.setItem('last_habit_notification_ts', String(now));
      sendImmediateNotification({
        title: `🔥 Schütze deinen ${streak}-Tage Streak!`,
        body: `Du hast heute noch ${incomplete.length} offene Gewohnheit(en). Beende den Tag als Gewinner.`,
        tag: 'habit-streak-reminder',
        data: { type: 'habits' }
      });
    }
  }
};

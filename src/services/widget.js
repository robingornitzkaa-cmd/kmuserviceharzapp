import { Capacitor, registerPlugin } from '@capacitor/core';
import { logInfo, logSuccess, logWarn, logError } from './logger.js';

// Registriere Capacitor Native Plugin Bridge
const WidgetBridge = registerPlugin('WidgetBridge', {
  web: () => ({
    updateWidgetData: async (options) => {
      // Speichere für PWA / Web-Vorschau im localStorage
      try {
        localStorage.setItem('founder_widget_preview_data', JSON.stringify(options));
      } catch {
        // Ignorieren im Web
      }
      return { success: true };
    }
  })
});

const WIDGET_CONFIG_KEY = 'founder_widget_config';

export const WIDGET_PRESETS = {
  allInOne: {
    id: 'allInOne',
    name: '🌟 All-in-One Master',
    description: 'Vollständiges Cockpit mit allen Business-Modulen',
    showNotes: true,
    showTodos: true,
    todoLimit: 3,
    showCrm: true,
    showStreak: true,
    showMeeting: true,
    showDailyGoal: true,
    theme: 'glassmorphic', // 'glassmorphic', 'amoled', 'cyan', 'navy'
    bgAlpha: 85, // 20 - 100 %
    tapAction: 'dashboard' // 'dashboard', 'kanban', 'crm', 'voice'
  },
  deepWork: {
    id: 'deepWork',
    name: '🎯 Deep Work & Fokus',
    description: 'Fokus auf Tagesziel, Top-5 Aufgaben und Streak-Schutz',
    showNotes: false,
    showTodos: true,
    todoLimit: 5,
    showCrm: false,
    showStreak: true,
    showMeeting: true,
    showDailyGoal: true,
    theme: 'navy',
    bgAlpha: 90,
    tapAction: 'kanban'
  },
  salesHunter: {
    id: 'salesHunter',
    name: '💼 Sales Hunter',
    description: 'CRM Pipeline, Follow-ups und Kundengespräche im Fokus',
    showNotes: true,
    showTodos: false,
    todoLimit: 3,
    showCrm: true,
    showStreak: false,
    showMeeting: true,
    showDailyGoal: false,
    theme: 'cyan',
    bgAlpha: 85,
    tapAction: 'crm'
  },
  minimalist: {
    id: 'minimalist',
    name: '🖤 Minimalist AMOLED',
    description: 'Pure Black, super clean und maximal akkusparend',
    showNotes: true,
    showTodos: false,
    todoLimit: 3,
    showCrm: false,
    showStreak: true,
    showMeeting: false,
    showDailyGoal: true,
    theme: 'amoled',
    bgAlpha: 100,
    tapAction: 'dashboard'
  }
};

export const DEFAULT_WIDGET_CONFIG = {
  ...WIDGET_PRESETS.allInOne
};

/**
 * Lädt die gespeicherte Widget-Konfiguration
 */
export const getWidgetConfig = () => {
  try {
    const raw = localStorage.getItem(WIDGET_CONFIG_KEY);
    if (!raw) return { ...DEFAULT_WIDGET_CONFIG };
    return { ...DEFAULT_WIDGET_CONFIG, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_WIDGET_CONFIG };
  }
};

/**
 * Speichert eine neue Widget-Konfiguration
 */
export const saveWidgetConfig = (config) => {
  try {
    const updated = { ...getWidgetConfig(), ...config };
    localStorage.setItem(WIDGET_CONFIG_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('[WidgetService] Fehler beim Speichern der Widget-Konfiguration:', e);
    return DEFAULT_WIDGET_CONFIG;
  }
};

/**
 * Aktualisiert alle Android Home-Screen-Widgets mit den aktuellen App-Daten und Konfigurationen
 */
export const updateAndroidWidget = async (data = {}) => {
  const {
    dashNotes = '',
    dashTodos = [],
    leads = [],
    streak = 0,
    dailyGoal = '',
    calendarEvents = [],
    gmailMessages = [],
    config = null
  } = typeof data === 'object' && !Array.isArray(data) && data !== null && 'dashNotes' in data
    ? data
    : {
        dashNotes: arguments[0] || '',
        dashTodos: arguments[1] || [],
        leads: arguments[2] || [],
        streak: arguments[3] || 0,
        dailyGoal: arguments[4] || '',
        calendarEvents: [],
        gmailMessages: [],
        config: null
      };

  const activeConfig = config || getWidgetConfig();

  // Berechne CRM Kennzahlen für das CRM-Widget
  const todayStr = new Date().toISOString().split('T')[0];
  const totalLeads = Array.isArray(leads) ? leads.length : 0;
  const wonLeads = Array.isArray(leads) ? leads.filter(l => l.status === 'Won' || l.status === 'Gewonnen').length : 0;
  const followUpsToday = Array.isArray(leads) ? leads.filter(l => {
    const d = l.followUpDate || l.nextFollowUp || l.date;
    return d && String(d).startsWith(todayStr);
  }).length : 0;

  // Nächster Termin
  let nextMeetingStr = '';
  if (Array.isArray(calendarEvents) && calendarEvents.length > 0) {
    const nextEv = calendarEvents[0];
    nextMeetingStr = `${nextEv.time || ''} ${nextEv.title || ''}`.trim();
  }

  // To-Dos gemäß Konfigurations-Limit filtern
  const limitedTodos = Array.isArray(dashTodos) ? dashTodos.slice(0, activeConfig.todoLimit || 3) : [];

  const payload = {
    notes: String(dashNotes || ''),
    todos: JSON.stringify(limitedTodos),
    leadsCount: totalLeads,
    wonCount: wonLeads,
    followUpsToday,
    streak: Number(streak || 0),
    dailyGoal: String(dailyGoal || ''),
    nextMeeting: nextMeetingStr,
    unreadMailsCount: Array.isArray(gmailMessages) ? gmailMessages.length : 0,
    
    // Konfigurations-Parameter
    showNotes: Boolean(activeConfig.showNotes),
    showTodos: Boolean(activeConfig.showTodos),
    showCrm: Boolean(activeConfig.showCrm),
    showStreak: Boolean(activeConfig.showStreak),
    showMeeting: Boolean(activeConfig.showMeeting),
    showDailyGoal: Boolean(activeConfig.showDailyGoal),
    todoLimit: Number(activeConfig.todoLimit || 3),
    theme: String(activeConfig.theme || 'glassmorphic'),
    bgAlpha: Number(activeConfig.bgAlpha || 85),
    tapAction: String(activeConfig.tapAction || 'dashboard'),

    timestamp: Date.now()
  };

  try {
    if (Capacitor.isNativePlatform()) {
      if (WidgetBridge && typeof WidgetBridge.updateWidgetData === 'function') {
        await WidgetBridge.updateWidgetData(payload);
        logSuccess('Widget', 'Daten erfolgreich an native Android-Bridge gesendet', {
          theme: activeConfig.theme,
          todos: limitedTodos.length,
          leads: totalLeads
        });
      } else {
        logWarn('Widget', 'Capacitor läuft nativ, aber WidgetBridge Plugin fehlt');
      }
    } else {
      // Im Web-Modus Fallback ins LocalStorage
      localStorage.setItem('founder_widget_preview_data', JSON.stringify(payload));
      logInfo('Widget', 'Widget-Vorschau im Browser-LocalStorage aktualisiert');
    }
    return true;
  } catch (e) {
    logError('Widget', 'Fehler beim Widget-Update: ' + (e.message || String(e)), e);
    return false;
  }
};

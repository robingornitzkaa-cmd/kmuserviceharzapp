import { Capacitor, registerPlugin } from '@capacitor/core';

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

/**
 * Aktualisiert alle Android Home-Screen-Widgets mit den aktuellen App-Daten
 */
export const updateAndroidWidget = async (data = {}) => {
  const {
    dashNotes = '',
    dashTodos = [],
    leads = [],
    streak = 0,
    dailyGoal = '',
    calendarEvents = [],
    gmailMessages = []
  } = typeof data === 'object' && !Array.isArray(data) && data !== null && 'dashNotes' in data
    ? data
    : {
        dashNotes: arguments[0] || '',
        dashTodos: arguments[1] || [],
        leads: arguments[2] || [],
        streak: arguments[3] || 0,
        dailyGoal: arguments[4] || '',
        calendarEvents: [],
        gmailMessages: []
      };

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

  const payload = {
    notes: String(dashNotes || ''),
    todos: JSON.stringify(Array.isArray(dashTodos) ? dashTodos : []),
    leadsCount: totalLeads,
    wonCount: wonLeads,
    followUpsToday,
    streak: Number(streak || 0),
    dailyGoal: String(dailyGoal || ''),
    nextMeeting: nextMeetingStr,
    unreadMailsCount: Array.isArray(gmailMessages) ? gmailMessages.length : 0,
    timestamp: Date.now()
  };

  try {
    if (Capacitor.isNativePlatform()) {
      if (WidgetBridge && typeof WidgetBridge.updateWidgetData === 'function') {
        await WidgetBridge.updateWidgetData(payload);
      }
    } else {
      // Im Web-Modus Fallback ins LocalStorage
      localStorage.setItem('founder_widget_preview_data', JSON.stringify(payload));
    }
    return true;
  } catch (e) {
    console.warn('[WidgetService] Widget update warning:', e);
    return false;
  }
};

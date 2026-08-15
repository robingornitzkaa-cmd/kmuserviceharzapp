/**
 * Backup- und Data-Hub Service für Life & Founder OS
 * Ermöglicht 1-Klick Voll-Backups, modulare Exporte, Schema-Validierung und sichere Wiederherstellung.
 */

export const BACKUP_VERSION = '2.0';

export const BACKUP_MODULES = [
  { id: 'dashboard', label: 'Dashboard & Notizen', desc: 'Notizblätter, To-Dos, Tagesziele & Widgets' },
  { id: 'gamification', label: 'Life OS & Gamification', desc: 'Level, XP, Coins, Habits, Belohnungen & Disziplin' },
  { id: 'crm', label: 'CRM, Leads & Projekte', desc: 'Kundenkartei, Kaltakquise-Leads & Zeiterfassung' },
  { id: 'knowledge', label: 'KI Prompts & Dokumente', desc: 'Prompt Vault, Master-Logbuch & Wissens-Hub' },
  { id: 'tasks', label: 'Inbox, Tasks & Kalender', desc: 'Kanban-Aufgaben, Termine & Coaching-Meetings' },
  { id: 'roadmap', label: 'Gründungs-Roadmap', desc: 'Phasen, Meilensteine & Fortschritt' },
  { id: 'settings', label: 'Einstellungen & Sicherheit', desc: 'Portal-PIN, API-Schlüssel & Vorlieben' }
];

const LOCAL_STORAGE_KEY_MAP = {
  dashboard: [
    'f_dash_notes',
    'f_dash_notes_list',
    'f_active_note_id',
    'f_sticky_note_color',
    'f_dash_todos',
    'f_simple_todos',
    'f_simple_goal',
    'f_simple_links',
    'f_dashboard_widgets',
    'f_dashboard_mode'
  ],
  gamification: [
    'f_habits',
    'f_habits_last_reset',
    'f_life_level',
    'f_life_xp',
    'f_life_coins',
    'f_shop_items',
    'f_shop_purchases',
    'f_discipline_mode',
    'f_discipline_strikes',
    'f_discipline_penalties'
  ],
  crm: [
    'f_leads',
    'f_contacts',
    'f_projects'
  ],
  knowledge: [
    'f_prompts',
    'f_custom_prompt_blocks',
    'f_docs'
  ],
  tasks: [
    'f_inbox',
    'f_tasks',
    'f_focus',
    'f_calendar_events',
    'f_coaching_meetings',
    'f_sop_templates',
    'f_active_sops'
  ],
  roadmap: [
    'f_roadmap_phases'
  ],
  settings: [
    'f_portal_pin',
    'f_offline_queue'
  ]
};

/**
 * Sammelt alle Daten aus dem Browser-Speicher und optional übergebenem React-State
 */
export function createFullBackupPayload(liveState = {}) {
  const data = {};

  Object.entries(LOCAL_STORAGE_KEY_MAP).forEach(([moduleKey, storageKeys]) => {
    data[moduleKey] = {};
    storageKeys.forEach(key => {
      // Bevorzuge live übergebenen State, sonst localStorage
      if (liveState[key] !== undefined) {
        data[moduleKey][key] = liveState[key];
      } else {
        const raw = localStorage.getItem(key);
        if (raw !== null) {
          try {
            data[moduleKey][key] = JSON.parse(raw);
          } catch {
            data[moduleKey][key] = raw;
          }
        }
      }
    });
  });

  const timestamp = new Date().toISOString();
  
  return {
    appName: 'Life & Founder OS - KMU Service Harz',
    version: BACKUP_VERSION,
    exportedAt: timestamp,
    meta: {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      totalModules: Object.keys(data).length
    },
    data
  };
}

/**
 * Erstellt ein selektives Backup nur für ausgewählte Module
 */
export function createSelectiveBackupPayload(selectedModules = [], liveState = {}) {
  const fullPayload = createFullBackupPayload(liveState);
  if (!selectedModules || selectedModules.length === 0) {
    return fullPayload;
  }

  const filteredData = {};
  selectedModules.forEach(modId => {
    if (fullPayload.data[modId]) {
      filteredData[modId] = fullPayload.data[modId];
    }
  });

  return {
    ...fullPayload,
    meta: {
      ...fullPayload.meta,
      selectedModules,
      totalModules: Object.keys(filteredData).length
    },
    data: filteredData
  };
}

/**
 * Triggert einen Datei-Download im Browser
 */
export function downloadBackupFile(payload, customFilename = null) {
  const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
  const fileName = customFilename || `founder_os_backup_${dateStr}.json`;
  const jsonContent = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Validiert ein Backup-Objekt und ermittelt enthaltene Entitäten
 */
export function validateBackupJson(jsonInput) {
  try {
    const parsed = typeof jsonInput === 'string' ? JSON.parse(jsonInput) : jsonInput;

    if (!parsed || typeof parsed !== 'object') {
      return { isValid: false, error: 'Die Datei enthält kein gültiges JSON-Objekt.' };
    }

    if (!parsed.data && !parsed.f_prompts && !parsed.f_leads) {
      return { isValid: false, error: 'Keine kompatiblen Life & Founder OS Datenstrukturen gefunden.' };
    }

    const counts = {
      leads: 0,
      contacts: 0,
      prompts: 0,
      docs: 0,
      notes: 0,
      tasks: 0,
      habits: 0,
      level: 1,
      xp: 0,
      coins: 0,
      hasRoadmap: false
    };

    // Struktur v2 (strukturiert nach Modulen)
    if (parsed.data) {
      const d = parsed.data;
      if (d.crm) {
        counts.leads = Array.isArray(d.crm.f_leads) ? d.crm.f_leads.length : 0;
        counts.contacts = Array.isArray(d.crm.f_contacts) ? d.crm.f_contacts.length : 0;
      }
      if (d.knowledge) {
        counts.prompts = Array.isArray(d.knowledge.f_prompts) ? d.knowledge.f_prompts.length : 0;
        counts.docs = Array.isArray(d.knowledge.f_docs) ? d.knowledge.f_docs.length : 0;
      }
      if (d.dashboard) {
        counts.notes = Array.isArray(d.dashboard.f_dash_notes_list) ? d.dashboard.f_dash_notes_list.length : (d.dashboard.f_dash_notes ? 1 : 0);
      }
      if (d.tasks) {
        counts.tasks = Array.isArray(d.tasks.f_tasks) ? d.tasks.f_tasks.length : 0;
      }
      if (d.gamification) {
        counts.habits = Array.isArray(d.gamification.f_habits) ? d.gamification.f_habits.length : 0;
        counts.level = d.gamification.f_life_level || 1;
        counts.xp = d.gamification.f_life_xp || 0;
        counts.coins = d.gamification.f_life_coins || 0;
      }
      if (d.roadmap && d.roadmap.f_roadmap_phases) {
        counts.hasRoadmap = true;
      }
    } else {
      // Struktur v1 (flacher Speicher-Dump)
      counts.leads = Array.isArray(parsed.f_leads) ? parsed.f_leads.length : 0;
      counts.contacts = Array.isArray(parsed.f_contacts) ? parsed.f_contacts.length : 0;
      counts.prompts = Array.isArray(parsed.f_prompts) ? parsed.f_prompts.length : 0;
      counts.docs = Array.isArray(parsed.f_docs) ? parsed.f_docs.length : 0;
      counts.tasks = Array.isArray(parsed.f_tasks) ? parsed.f_tasks.length : 0;
      counts.habits = Array.isArray(parsed.f_habits) ? parsed.f_habits.length : 0;
    }

    return {
      isValid: true,
      version: parsed.version || '1.0',
      exportedAt: parsed.exportedAt || 'Unbekannt',
      counts,
      payload: parsed
    };
  } catch (err) {
    return { isValid: false, error: `Syntaxfehler beim Einlesen: ${err.message}` };
  }
}

/**
 * Erstellt einen automatischen Notfall-Snapshot vor dem Wiederherstellen
 */
export function createEmergencySnapshot() {
  try {
    const fullBackup = createFullBackupPayload();
    localStorage.setItem('f_emergency_backup_snapshot', JSON.stringify(fullBackup));
    localStorage.setItem('f_emergency_backup_timestamp', new Date().toISOString());
    return true;
  } catch (e) {
    console.error('Konnte Notfall-Snapshot nicht erstellen:', e);
    return false;
  }
}

/**
 * Stellt den Notfall-Snapshot wieder her
 */
export function restoreEmergencySnapshot() {
  try {
    const raw = localStorage.getItem('f_emergency_backup_snapshot');
    if (!raw) return { success: false, error: 'Kein Notfall-Snapshot vorhanden.' };
    const snapshot = JSON.parse(raw);
    return applyBackupRestore(snapshot);
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * Prüft, ob ein Notfall-Snapshot existiert
 */
export function getEmergencySnapshotInfo() {
  const timestamp = localStorage.getItem('f_emergency_backup_timestamp');
  const hasSnapshot = Boolean(localStorage.getItem('f_emergency_backup_snapshot'));
  return { hasSnapshot, timestamp };
}

/**
 * Schreibt die Daten aus dem Backup sicher in den localStorage
 */
export function applyBackupRestore(backupPayload, selectedModules = null) {
  try {
    // 1. Sicherheits-Snapshot vor der Änderung anlegen
    createEmergencySnapshot();

    const data = backupPayload.data || backupPayload;
    let restoredKeysCount = 0;

    // Struktur v2
    if (backupPayload.data) {
      Object.entries(data).forEach(([modKey, modValues]) => {
        if (!selectedModules || selectedModules.includes(modKey)) {
          if (modValues && typeof modValues === 'object') {
            Object.entries(modValues).forEach(([storageKey, value]) => {
              if (value !== undefined) {
                const serialized = typeof value === 'string' ? value : JSON.stringify(value);
                localStorage.setItem(storageKey, serialized);
                restoredKeysCount++;
              }
            });
          }
        }
      });
    } else {
      // Struktur v1 (Flache Keys)
      Object.entries(data).forEach(([key, value]) => {
        if (key.startsWith('f_')) {
          const serialized = typeof value === 'string' ? value : JSON.stringify(value);
          localStorage.setItem(key, serialized);
          restoredKeysCount++;
        }
      });
    }

    return {
      success: true,
      restoredKeysCount,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    return {
      success: false,
      error: `Fehler beim Schreiben der Wiederherstellung: ${err.message}`
    };
  }
}

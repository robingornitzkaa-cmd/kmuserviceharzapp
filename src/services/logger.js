/**
 * Zentraler In-App Diagnose- und Logging-Service für Founder OS
 * Fängt System-Events, Widget-Updates, Syncs und Fehler ab.
 */

const MAX_LOG_ENTRIES = 300;
const STORAGE_KEY = 'founder_system_logs';

let inMemoryLogs = [];

// Initiales Laden aus dem Speicher
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    inMemoryLogs = JSON.parse(raw);
  }
} catch {
  inMemoryLogs = [];
}

const saveLogsToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryLogs.slice(-MAX_LOG_ENTRIES)));
  } catch {
    // Ignorieren falls LocalStorage voll
  }
};

/**
 * Erstellt einen neuen Log-Eintrag
 */
export const addLog = (level, category, message, details = null) => {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toISOString(),
    timeStr: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    level: level.toUpperCase(), // 'INFO', 'SUCCESS', 'WARN', 'ERROR', 'DEBUG'
    category: category || 'System',
    message: String(message || ''),
    details: details ? (typeof details === 'object' ? JSON.stringify(details, null, 2) : String(details)) : null
  };

  inMemoryLogs.push(entry);
  if (inMemoryLogs.length > MAX_LOG_ENTRIES) {
    inMemoryLogs.shift();
  }

  saveLogsToStorage();

  // Bei Fehlern auch in die Browser-Konsole ausgeben
  if (level === 'ERROR') {
    console.error(`[${entry.category}] ${entry.message}`, details);
  }

  return entry;
};

export const logInfo = (category, message, details) => addLog('INFO', category, message, details);
export const logSuccess = (category, message, details) => addLog('SUCCESS', category, message, details);
export const logWarn = (category, message, details) => addLog('WARN', category, message, details);
export const logError = (category, message, details) => addLog('ERROR', category, message, details);

export const getSystemLogs = () => {
  return [...inMemoryLogs].reverse(); // Neueste zuerst
};

export const clearSystemLogs = () => {
  inMemoryLogs = [];
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    //
  }
  logInfo('System', 'Diagnose-Protokoll wurde zurückgesetzt.');
};

export const exportLogsAsJson = () => {
  return JSON.stringify({
    appName: 'Founder OS',
    exportDate: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    totalEntries: inMemoryLogs.length,
    logs: inMemoryLogs
  }, null, 2);
};

// Globaler Error-Listener für ungefangene Fehler
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    logError('GlobalError', event.message || 'Unbekannter JavaScript-Fehler', {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error ? event.error.stack : null
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    logError('PromiseRejection', event.reason ? (event.reason.message || String(event.reason)) : 'Unbehandelte Promise-Ablehnung', {
      stack: event.reason && event.reason.stack ? event.reason.stack : null
    });
  });
}

/**
 * SyncQueue Service für Offline-First Resilienz.
 * Puffert fehlgeschlagene oder im Offline-Modus durchgeführte Supabase-Schreiboperationen
 * im localStorage und arbeitet diese mit exponentiellem Backoff automatisch ab,
 * sobald die Internetverbindung wiederhergestellt ist.
 */

const QUEUE_STORAGE_KEY = 'f_sync_queue_v1';
let isFlushing = false;
let defaultExecutor = null;

/**
 * Registriert eine globale Ausführungsfunktion für die Warteschlange.
 * @param {Function} executor 
 */
export const registerSyncExecutor = (executor) => {
  defaultExecutor = executor;
};

/**
 * Holt alle aktuell ausstehenden Sync-Operationen aus dem localStorage.
 * @returns {Array<Object>}
 */
export const getSyncQueue = () => {
  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('[SyncQueue] Fehler beim Lesen der Queue:', err);
    return [];
  }
};

/**
 * Schreibt die Sync-Queue sicher in den localStorage.
 * @param {Array<Object>} queue 
 */
const saveSyncQueue = (queue) => {
  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  } catch (err) {
    console.error('[SyncQueue] Fehler beim Speichern der Queue:', err);
  }
};

/**
 * Fügt eine Aktion zur Sync-Queue hinzu oder aktualisiert einen bestehenden Eintrag desselben Typs.
 * @param {Object} item { type: string, payload: any, entityId?: string }
 */
export const enqueueSyncAction = (item) => {
  const queue = getSyncQueue();
  const timestamp = Date.now();

  // Deduplizierung: Wenn für dieselbe Entität (z.B. dashboard_state) bereits ein Eintrag existiert, aktualisieren wir ihn
  const existingIndex = queue.findIndex(q => 
    q.type === item.type && (item.entityId ? q.entityId === item.entityId : true)
  );

  const entry = {
    id: `${item.type}_${item.entityId || 'root'}_${timestamp}`,
    type: item.type,
    payload: item.payload,
    entityId: item.entityId,
    timestamp,
    retries: 0
  };

  if (existingIndex >= 0) {
    queue[existingIndex] = entry;
  } else {
    queue.push(entry);
  }

  saveSyncQueue(queue);
  console.log(`[SyncQueue] Aktion eingereiht: ${item.type}`, entry);

  // Sofortigen Sync-Versuch starten, falls online und Executor registriert
  if (navigator.onLine && defaultExecutor) {
    flushSyncQueue();
  }
};

/**
 * Verarbeitet alle anstehenden Aktionen in der Queue.
 * @param {Function} [actionExecutor] Optionaler Callback zur Aktionsausführung
 */
export const flushSyncQueue = async (actionExecutor) => {
  const executor = actionExecutor || defaultExecutor;
  if (!executor || isFlushing || !navigator.onLine) return;

  const queue = getSyncQueue();
  if (queue.length === 0) return;

  isFlushing = true;
  console.log(`[SyncQueue] Starte Flush für ${queue.length} ausstehende Aktionen...`);

  const remainingQueue = [];

  for (const item of queue) {
    try {
      await executor(item);
      console.log(`[SyncQueue] Erfolgreich synchronisiert: ${item.type}`);
    } catch (err) {
      console.warn(`[SyncQueue] Fehler bei ${item.type}, behalte in Queue (Versuch ${item.retries + 1}):`, err);
      item.retries += 1;
      if (item.retries < 10) {
        remainingQueue.push(item);
      } else {
        console.error(`[SyncQueue] Maximale Versuche für ${item.id} überschritten. Verwerfe Eintrag.`);
      }
    }
  }

  saveSyncQueue(remainingQueue);
  isFlushing = false;
};

// Automatischer Event-Listener bei Reconnect
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('[SyncQueue] Internetverbindung wiederhergestellt. Starte Auto-Flush...');
    if (defaultExecutor) {
      flushSyncQueue();
    }
  });
}

import { enqueueSyncAction, flushSyncQueue } from './syncQueue.js';

const DEFAULT_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || '';
const DEFAULT_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || '';

const getUrl = (config) => {
  if (config && typeof config.url === 'string' && config.url.includes('supabase.co')) {
    return config.url.trim();
  }
  return DEFAULT_URL;
};

const getKey = (config) => {
  const k = config && (config.anonKey || config.key);
  if (k && typeof k === 'string' && k.trim().length > 20) {
    return k.trim();
  }
  return DEFAULT_KEY;
};

const AUTH_STORAGE_KEY = 'f_sb_auth_session';

export const getStoredSession = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredSession = (session) => {
  try {
    if (session) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (e) {
    console.error('Failed to store Supabase session:', e);
  }
};

export const signInWithEmail = async (email, password, config) => {
  const url = getUrl(config);
  const key = getKey(config);
  const res = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.trim(), password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.msg || err.error_description || `Login fehlgeschlagen (${res.status})`);
  }
  const session = await res.json();
  setStoredSession(session);
  return session;
};

export const signUpWithEmail = async (email, password, config) => {
  const url = getUrl(config);
  const key = getKey(config);
  const res = await fetch(`${url}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.trim(), password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.msg || err.error_description || `Registrierung fehlgeschlagen (${res.status})`);
  }
  const data = await res.json();
  if (data.access_token) {
    setStoredSession(data);
  }
  return data;
};

export const refreshSession = async (config) => {
  const session = getStoredSession();
  if (!session || !session.refresh_token) return null;
  const url = getUrl(config);
  const key = getKey(config);

  try {
    const res = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh_token: session.refresh_token })
    });
    if (!res.ok) {
      setStoredSession(null);
      return null;
    }
    const newSession = await res.json();
    setStoredSession(newSession);
    return newSession;
  } catch (e) {
    console.warn('Silent refresh error:', e);
    return null;
  }
};

export const signOut = async (config) => {
  const session = getStoredSession();
  if (session && session.access_token) {
    const url = getUrl(config);
    const key = getKey(config);
    try {
      await fetch(`${url}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${session.access_token}`
        }
      });
    } catch {
      // Ignoriere Netzwerkfehler beim Logout
    }
  }
  setStoredSession(null);
};

export const getAuthToken = async (config) => {
  let session = getStoredSession();
  if (!session) return getKey(config);

  // Wenn der Token bald abläuft (in den nächsten 60 Sek.) -> stiller Refresh im Hintergrund
  const expiresAt = session.expires_at ? session.expires_at * 1000 : 0;
  if (expiresAt && Date.now() > expiresAt - 60000) {
    const refreshed = await refreshSession(config);
    if (refreshed && refreshed.access_token) {
      return refreshed.access_token;
    }
  }

  return session.access_token || getKey(config);
};

export const getAuthHeaders = async (config) => {
  const key = getKey(config);
  const token = await getAuthToken(config);
  return {
    'apikey': key,
    'Authorization': `Bearer ${token}`
  };
};

export const fetchLeadsFromSupabase = async (supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  const headers = await getAuthHeaders(supabaseConfig);
  
  const response = await fetch(`${url}/rest/v1/leads?select=*&order=priority.asc,company.asc`, {
    headers
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`Supabase leads fetch error: ${response.status} ${response.statusText}`);
};

export const saveLeadToSupabase = async (leadToSave, supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  try {
    const headers = await getAuthHeaders(supabaseConfig);
    headers['Content-Type'] = 'application/json';
    headers['Prefer'] = 'resolution=merge-duplicates';

    const response = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify(leadToSave)
    });
    if (response.ok) return true;
    throw new Error(`HTTP ${response.status}`);
  } catch (err) {
    console.warn('[Supabase] Lead speichern fehlgeschlagen. Lege in Offline-Queue:', err);
    enqueueSyncAction({
      type: 'save_lead',
      payload: leadToSave,
      entityId: String(leadToSave.id)
    });
    return false;
  }
};

export const fetchPromptsFromSupabase = async (supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  const headers = await getAuthHeaders(supabaseConfig);
  const response = await fetch(`${url}/rest/v1/prompts?select=*`, {
    headers
  });
  if (response.ok) {
    const data = await response.json();
    return data.map(p => ({
      ...p,
      isPinned: p.is_pinned !== undefined ? p.is_pinned : Boolean(p.isPinned),
      history: Array.isArray(p.history) ? p.history : (typeof p.history === 'string' ? JSON.parse(p.history) : (p.history || []))
    }));
  }
  throw new Error(`Supabase prompts fetch error: ${response.status} ${response.statusText}`);
};

export const savePromptToSupabase = async (promptToAdd, supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  const payload = {
    id: String(promptToAdd.id),
    title: promptToAdd.title || '',
    category: promptToAdd.category || 'General',
    text: promptToAdd.text || '',
    is_pinned: Boolean(promptToAdd.isPinned !== undefined ? promptToAdd.isPinned : promptToAdd.is_pinned),
    history: Array.isArray(promptToAdd.history) ? promptToAdd.history : [],
    updated_at: new Date().toISOString()
  };

  try {
    const headers = await getAuthHeaders(supabaseConfig);
    headers['Content-Type'] = 'application/json';
    headers['Prefer'] = 'resolution=merge-duplicates';

    const response = await fetch(`${url}/rest/v1/prompts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    if (response && response.ok) return true;
    throw new Error(`HTTP ${response?.status}`);
  } catch (err) {
    console.warn('[Supabase] Prompt speichern fehlgeschlagen. Lege in Offline-Queue:', err);
    enqueueSyncAction({
      type: 'save_prompt',
      payload,
      entityId: String(payload.id)
    });
    return false;
  }
};

export const pushUnsyncedPromptsToSupabase = async (promptsToPush, supabaseConfig) => {
  if (!promptsToPush || promptsToPush.length === 0) return { uploadedIds: [], failedCount: 0 };
  const uploadedIds = [];
  let failedCount = 0;
  for (const promptItem of promptsToPush) {
    try {
      const ok = await savePromptToSupabase(promptItem, supabaseConfig);
      if (ok) {
        uploadedIds.push(promptItem.id);
      } else {
        failedCount++;
      }
    } catch (err) {
      console.error(`Fehler beim Push-Sync für Prompt ${promptItem.id}:`, err);
      failedCount++;
    }
  }
  return { uploadedIds, failedCount };
};

export const deletePromptFromSupabase = async (id, supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  const headers = await getAuthHeaders(supabaseConfig);
  const response = await fetch(`${url}/rest/v1/prompts?id=eq.${id}`, {
    method: 'DELETE',
    headers
  });
  return response ? response.ok : false;
};

export const fetchDashboardStateFromSupabase = async (supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  const headers = await getAuthHeaders(supabaseConfig);
  const response = await fetch(`${url}/rest/v1/dashboard_state?id=eq.main&select=*`, {
    headers
  });
  if (response && response.ok) {
    const data = await response.json();
    return data && data.length > 0 ? data[0] : null;
  }
  throw new Error(`Supabase dashboard_state fetch error: ${response ? response.status : 'no response'}`);
};

export const saveDashboardStateToSupabase = async (stateData, supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  const payload = {
    id: 'main',
    dash_notes: stateData.dashNotes ?? '',
    sticky_note_color: stateData.stickyNoteColor ?? '#fef08a',
    dash_notes_list: stateData.dashNotesList ?? [],
    dash_todos: stateData.dashTodos ?? [],
    dashboard_widgets: stateData.dashboardWidgets ?? [],
    dashboard_mode: stateData.dashboardMode ?? 'detailed',
    prompts_list: stateData.promptsList ?? [],
    media_gallery: stateData.mediaGallery ?? [],
    updated_at: stateData.updatedAt || new Date().toISOString()
  };

  try {
    const headers = await getAuthHeaders(supabaseConfig);
    headers['Content-Type'] = 'application/json';
    headers['Prefer'] = 'resolution=merge-duplicates';

    const response = await fetch(`${url}/rest/v1/dashboard_state`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    if (response.ok) return true;
    throw new Error(`HTTP ${response.status}`);
  } catch (err) {
    console.warn("[Supabase] Fehler beim Speichern des Dashboard-Status. Lege in Offline-Queue:", err);
    enqueueSyncAction({
      type: 'save_dashboard_state',
      payload,
      entityId: 'main'
    });
    return false;
  }
};

/**
 * Arbeitet die Offline-Queue mit Supabase ab.
 * @param {Object} supabaseConfig 
 */
export const flushOfflineQueueWithSupabase = async (supabaseConfig) => {
  return flushSyncQueue(async (item) => {
    const url = getUrl(supabaseConfig);
    const headers = await getAuthHeaders(supabaseConfig);
    headers['Content-Type'] = 'application/json';
    headers['Prefer'] = 'resolution=merge-duplicates';

    if (item.type === 'save_dashboard_state') {
      const res = await fetch(`${url}/rest/v1/dashboard_state`, {
        method: 'POST',
        headers,
        body: JSON.stringify(item.payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } else if (item.type === 'save_prompt') {
      const res = await fetch(`${url}/rest/v1/prompts`, {
        method: 'POST',
        headers,
        body: JSON.stringify(item.payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } else if (item.type === 'save_lead') {
      const res = await fetch(`${url}/rest/v1/leads`, {
        method: 'POST',
        headers,
        body: JSON.stringify(item.payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    }
  });
};

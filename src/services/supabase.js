const DEFAULT_URL = 'https://ypqlssyrlykjzjnoyjoa.supabase.co';
const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwcWxzc3lybHlranpqbm95am9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTc5OTYsImV4cCI6MjA5Nzg5Mzk5Nn0.l1gbcQkrgjGJyTsRp3cjCqYIVrme9M48sbqUILhoAes';

const getUrl = (config) => {
  if (config && typeof config.url === 'string' && config.url.includes('supabase.co')) {
    return config.url;
  }
  return DEFAULT_URL;
};

const getKey = (config) => {
  const k = config && (config.anonKey || config.key);
  if (k && typeof k === 'string' && k.length > 20) {
    return k;
  }
  return DEFAULT_KEY;
};

export const fetchLeadsFromSupabase = async (supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  const key = getKey(supabaseConfig);
  
  const response = await fetch(`${url}/rest/v1/leads?select=*&order=priority.asc,company.asc`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`Supabase leads fetch error: ${response.status} ${response.statusText}`);
};

export const saveLeadToSupabase = async (leadToSave, supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  const key = getKey(supabaseConfig);
  const response = await fetch(`${url}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(leadToSave)
  });
  return response.ok;
};

export const fetchPromptsFromSupabase = async (supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  const key = getKey(supabaseConfig);
  const response = await fetch(`${url}/rest/v1/prompts?select=*`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
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
  const key = getKey(supabaseConfig);
  const payload = {
    id: String(promptToAdd.id),
    title: promptToAdd.title || '',
    category: promptToAdd.category || 'General',
    text: promptToAdd.text || '',
    is_pinned: Boolean(promptToAdd.isPinned !== undefined ? promptToAdd.isPinned : promptToAdd.is_pinned),
    history: Array.isArray(promptToAdd.history) ? promptToAdd.history : [],
    updated_at: new Date().toISOString()
  };
  const response = await fetch(`${url}/rest/v1/prompts`, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(payload)
  });
  return response ? response.ok : false;
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
  const key = getKey(supabaseConfig);
  const response = await fetch(`${url}/rest/v1/prompts?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  });
  return response ? response.ok : false;
};

export const fetchDashboardStateFromSupabase = async (supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  const key = getKey(supabaseConfig);
  const response = await fetch(`${url}/rest/v1/dashboard_state?id=eq.main&select=*`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  });
  if (response && response.ok) {
    const data = await response.json();
    return data && data.length > 0 ? data[0] : null;
  }
  throw new Error(`Supabase dashboard_state fetch error: ${response ? response.status : 'no response'}`);
};

export const saveDashboardStateToSupabase = async (stateData, supabaseConfig) => {
  try {
    const url = getUrl(supabaseConfig);
    const key = getKey(supabaseConfig);
    const payload = {
      id: 'main',
      dash_notes: stateData.dashNotes ?? '',
      sticky_note_color: stateData.stickyNoteColor ?? '#fef08a',
      dash_notes_list: stateData.dashNotesList ?? [],
      dash_todos: stateData.dashTodos ?? [],
      dashboard_widgets: stateData.dashboardWidgets ?? [],
      dashboard_mode: stateData.dashboardMode ?? 'detailed',
      prompts_list: stateData.promptsList ?? [],
      updated_at: stateData.updatedAt || new Date().toISOString()
    };
    const response = await fetch(`${url}/rest/v1/dashboard_state`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      keepalive: true,
      body: JSON.stringify(payload)
    });
    return response.ok;
  } catch (err) {
    console.error("Error saving dashboard state to Supabase:", err);
    return false;
  }
};


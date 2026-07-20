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
    return await response.json();
  }
  throw new Error(`Supabase prompts fetch error: ${response.status} ${response.statusText}`);
};

export const savePromptToSupabase = async (promptToAdd, supabaseConfig) => {
  const url = getUrl(supabaseConfig);
  const key = getKey(supabaseConfig);
  const response = await fetch(`${url}/rest/v1/prompts`, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(promptToAdd)
  });
  return response.ok;
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
  return response.ok;
};

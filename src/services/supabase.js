export const fetchLeadsFromSupabase = async (supabaseConfig) => {
  const response = await fetch(`${supabaseConfig.url}/rest/v1/leads?select=*&order=priority.asc,company.asc`, {
    headers: {
      'apikey': supabaseConfig.anonKey,
      'Authorization': `Bearer ${supabaseConfig.anonKey}`
    }
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`Supabase leads fetch error: ${response.statusText}`);
};

export const saveLeadToSupabase = async (leadToSave, supabaseConfig) => {
  const response = await fetch(`${supabaseConfig.url}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'apikey': supabaseConfig.anonKey,
      'Authorization': `Bearer ${supabaseConfig.anonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(leadToSave)
  });
  return response.ok;
};

export const fetchPromptsFromSupabase = async (supabaseConfig) => {
  const response = await fetch(`${supabaseConfig.url}/rest/v1/prompts?select=*`, {
    headers: {
      'apikey': supabaseConfig.anonKey,
      'Authorization': `Bearer ${supabaseConfig.anonKey}`
    }
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`Supabase prompts fetch error: ${response.statusText}`);
};

export const savePromptToSupabase = async (promptToAdd, supabaseConfig) => {
  const response = await fetch(`${supabaseConfig.url}/rest/v1/prompts`, {
    method: 'POST',
    headers: {
      'apikey': supabaseConfig.anonKey,
      'Authorization': `Bearer ${supabaseConfig.anonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(promptToAdd)
  });
  return response.ok;
};

export const deletePromptFromSupabase = async (id, supabaseConfig) => {
  const response = await fetch(`${supabaseConfig.url}/rest/v1/prompts?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'apikey': supabaseConfig.anonKey,
      'Authorization': `Bearer ${supabaseConfig.anonKey}`
    }
  });
  return response.ok;
};

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  getStoredSession, 
  setStoredSession, 
  signInWithEmail, 
  signUpWithEmail, 
  refreshSession, 
  signOut, 
  getAuthToken, 
  getAuthHeaders 
} from '../../services/supabase.js';

describe('Supabase Auth & Silent Refresh Test Suite', () => {
  const mockConfig = {
    url: 'https://testproject.supabase.co',
    anonKey: 'mock-anon-key-12345678901234567890'
  };

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('speichert und liest Auth-Sessions korrekt aus dem localStorage', () => {
    expect(getStoredSession()).toBeNull();

    const sampleSession = {
      access_token: 'mock-access-token-abc',
      refresh_token: 'mock-refresh-token-xyz',
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      user: { id: 'u123', email: 'rob@test.de' }
    };

    setStoredSession(sampleSession);
    const retrieved = getStoredSession();

    expect(retrieved).not.toBeNull();
    expect(retrieved.access_token).toBe('mock-access-token-abc');
    expect(retrieved.refresh_token).toBe('mock-refresh-token-xyz');
    expect(retrieved.user.email).toBe('rob@test.de');
  });

  it('signInWithEmail ruft Auth REST API auf und persistiert die Sitzung', async () => {
    const mockResponse = {
      access_token: 'jwt-token-777',
      refresh_token: 'refresh-token-888',
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      user: { id: 'u777', email: 'rob@test.de' }
    };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const session = await signInWithEmail('rob@test.de', 'secret123', mockConfig);

    expect(session.access_token).toBe('jwt-token-777');
    expect(getStoredSession()?.access_token).toBe('jwt-token-777');
  });

  it('refreshSession erneuert den Token still im Hintergrund', async () => {
    setStoredSession({
      access_token: 'old-access-token',
      refresh_token: 'valid-refresh-token',
      expires_at: Math.floor(Date.now() / 1000) - 10
    });

    const refreshedResponse = {
      access_token: 'new-fresh-access-token',
      refresh_token: 'new-fresh-refresh-token',
      expires_at: Math.floor(Date.now() / 1000) + 3600
    };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => refreshedResponse
    });

    const refreshed = await refreshSession(mockConfig);

    expect(refreshed).not.toBeNull();
    expect(refreshed.access_token).toBe('new-fresh-access-token');
    expect(getStoredSession()?.access_token).toBe('new-fresh-access-token');
  });

  it('signOut bereinigt lokale Sitzung und Tokens', async () => {
    setStoredSession({
      access_token: 'active-token',
      refresh_token: 'active-refresh'
    });

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true
    });

    await signOut(mockConfig);

    expect(getStoredSession()).toBeNull();
  });

  it('getAuthHeaders liefert autorisierten Bearer-Token bei aktiver Sitzung', async () => {
    setStoredSession({
      access_token: 'active-authenticated-token',
      refresh_token: 'active-refresh',
      expires_at: Math.floor(Date.now() / 1000) + 3600
    });

    const headers = await getAuthHeaders(mockConfig);

    expect(headers.apikey).toBe(mockConfig.anonKey);
    expect(headers.Authorization).toBe('Bearer active-authenticated-token');
  });
});

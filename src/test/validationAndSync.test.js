import { describe, it, expect, beforeEach, vi } from 'vitest';
import { isValidUrl, sanitizeUrl, isValidEmail, sanitizePhoneNumber, isValidGeminiApiKey, sanitizeText, clampNumber } from '../utils/validation';
import { getSyncQueue, enqueueSyncAction, flushSyncQueue } from '../services/syncQueue';

describe('Validation Utilities', () => {
  it('should validate URLs correctly', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://localhost:3000')).toBe(true);
    expect(isValidUrl('ftp://invalid.com')).toBe(false);
    expect(isValidUrl('not a url')).toBe(false);
  });

  it('should sanitize URLs automatically with https:// prefix', () => {
    expect(sanitizeUrl('example.com')).toBe('https://example.com');
    expect(sanitizeUrl('http://test.de')).toBe('http://test.de');
    expect(sanitizeUrl('https://secure.org')).toBe('https://secure.org');
  });

  it('should validate emails', () => {
    expect(isValidEmail('kontakt@kmu-service.de')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('@nodomain.com')).toBe(false);
  });

  it('should sanitize phone numbers for tel: links', () => {
    expect(sanitizePhoneNumber('+49 (0) 5321 12345')).toBe('+490532112345');
    expect(sanitizePhoneNumber('0170 / 99 88 77')).toBe('0170998877');
  });

  it('should validate Gemini API Keys', () => {
    expect(isValidGeminiApiKey('AIzaSyAbc123456789012345678901234567890')).toBe(true);
    expect(isValidGeminiApiKey('invalid-key')).toBe(false);
  });

  it('should sanitize strings to prevent basic XSS', () => {
    expect(sanitizeText('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  it('should clamp numbers accurately', () => {
    expect(clampNumber(50, 0, 100)).toBe(50);
    expect(clampNumber(150, 0, 100)).toBe(100);
    expect(clampNumber(-10, 0, 100)).toBe(0);
    expect(clampNumber('invalid', 0, 100, 25)).toBe(25);
  });
});

describe('SyncQueue Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should enqueue and deduplicate sync actions in localStorage', () => {
    enqueueSyncAction({ type: 'save_dashboard_state', payload: { notes: 'Note 1' }, entityId: 'main' });
    let queue = getSyncQueue();
    expect(queue.length).toBe(1);
    expect(queue[0].payload.notes).toBe('Note 1');

    // Deduplication check
    enqueueSyncAction({ type: 'save_dashboard_state', payload: { notes: 'Note 2' }, entityId: 'main' });
    queue = getSyncQueue();
    expect(queue.length).toBe(1);
    expect(queue[0].payload.notes).toBe('Note 2');
  });

  it('should flush queue items via executor callback', async () => {
    enqueueSyncAction({ type: 'save_lead', payload: { id: 'lead_1', company: 'Harz Tech' }, entityId: 'lead_1' });
    
    const executed = [];
    await flushSyncQueue(async (item) => {
      executed.push(item);
    });

    expect(executed.length).toBe(1);
    expect(executed[0].type).toBe('save_lead');
    expect(getSyncQueue().length).toBe(0);
  });
});

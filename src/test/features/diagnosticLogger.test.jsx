import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  logInfo, 
  logSuccess, 
  logWarn, 
  logError, 
  getSystemLogs, 
  clearSystemLogs, 
  exportLogsAsJson 
} from '../../services/logger.js';
import { DiagnosticLogModal } from '../../components/DiagnosticLogModal.jsx';

describe('Diagnostic Logger & Modal Test Suite', () => {
  beforeEach(() => {
    clearSystemLogs();
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Logger Service', () => {
    it('creates and retrieves structured log entries', () => {
      logInfo('Widget', 'Widget sync started');
      logSuccess('Database', 'Supabase connected');
      logWarn('Network', 'Slow response');
      logError('Auth', 'Invalid credentials', { code: 401 });

      const logs = getSystemLogs();
      expect(logs.length).toBeGreaterThanOrEqual(4);
      
      const errorLog = logs.find(l => l.level === 'ERROR');
      expect(errorLog).toBeDefined();
      expect(errorLog.category).toBe('Auth');
      expect(errorLog.message).toBe('Invalid credentials');
      expect(errorLog.details).toContain('401');
    });

    it('exports logs as valid JSON object', () => {
      logInfo('Test', 'JSON Export test');
      const exported = exportLogsAsJson();
      const parsed = JSON.parse(exported);
      expect(parsed.appName).toBe('Founder OS');
      expect(parsed.logs).toBeInstanceOf(Array);
      expect(parsed.logs.length).toBeGreaterThanOrEqual(1);
    });

    it('clears logs cleanly', () => {
      logInfo('Test', 'Log to delete');
      clearSystemLogs();
      const logs = getSystemLogs();
      // After clear, only the reset notification exists
      expect(logs.length).toBe(1);
      expect(logs[0].message).toContain('zurückgesetzt');
    });
  });

  describe('DiagnosticLogModal UI', () => {
    it('renders system status, filter buttons, search and logs', () => {
      logInfo('Widget', 'Widget Test Entry');
      logError('Supabase', 'Supabase Sync Failed');

      render(
        <DiagnosticLogModal
          isOpen={true}
          onClose={() => {}}
        />
      );

      expect(screen.getByText(/System- & Fehler-Diagnose Hub/i)).toBeInTheDocument();
      expect(screen.getByText(/Widget Test Entry/i)).toBeInTheDocument();
      expect(screen.getByText(/Supabase Sync Failed/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Protokoll durchsuchen/i)).toBeInTheDocument();
    });

    it('filters logs when clicking level filters', () => {
      logInfo('Widget', 'Widget Info Msg');
      logError('System', 'Critical Error Msg');

      render(
        <DiagnosticLogModal
          isOpen={true}
          onClose={() => {}}
        />
      );

      const errorFilterBtn = screen.getByRole('button', { name: /Fehler/i });
      fireEvent.click(errorFilterBtn);

      expect(screen.getByText(/Critical Error Msg/i)).toBeInTheDocument();
      expect(screen.queryByText(/Widget Info Msg/i)).not.toBeInTheDocument();
    });

    it('copies logs to clipboard and triggers toast', async () => {
      const onToast = vi.fn();
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined)
        }
      });

      render(
        <DiagnosticLogModal
          isOpen={true}
          onClose={() => {}}
          onShowToast={onToast}
        />
      );

      const copyBtn = screen.getByText(/Kopieren/i).closest('button');
      fireEvent.click(copyBtn);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        expect(onToast).toHaveBeenCalledWith(
          expect.stringContaining('Zwischenablage'),
          'success'
        );
      });
    });
  });
});

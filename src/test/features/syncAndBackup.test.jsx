import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BackupManagerModal } from '../../components/BackupManagerModal';
import { createFullBackupPayload, validateBackupJson, BACKUP_VERSION } from '../../services/backupService';
import { getSyncQueue, enqueueSyncAction, flushSyncQueue } from '../../services/syncQueue';

describe('Sync & Backup Feature - Datensicherheit & Export/Import', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('rendert das Backup-Modal mit Export- und Import-Tabs', () => {
    render(
      <BackupManagerModal
        isOpen={true}
        onClose={vi.fn()}
        liveState={{
          f_tasks: [],
          f_contacts: [],
          f_docs: []
        }}
        onRestoreSuccess={vi.fn()}
      />
    );

    expect(screen.getByText(/Backup Manager/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Exportieren & Sichern/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Wiederherstellen/i })).toBeInTheDocument();
  });

  it('generiert ein valides Full-Backup JSON Schema', () => {
    const liveState = {
      f_tasks: [{ id: 't1', title: 'Task 1' }],
      f_contacts: [{ id: 'c1', name: 'Lead 1' }],
      f_docs: [{ id: 'd1', title: 'Doc 1' }]
    };

    const payload = createFullBackupPayload(liveState);

    expect(payload).toBeDefined();
    expect(payload.version).toBe(BACKUP_VERSION);
    expect(payload.appName).toContain('Life & Founder OS');
    expect(payload.data).toBeDefined();

    const validation = validateBackupJson(payload);
    expect(validation.isValid).toBe(true);
  });

  it('erkennt fehlerhafte oder manipulierte Backup-Dateien bei der Validierung', () => {
    const invalidPayload = { invalidKey: 'xyz' };
    const result = validateBackupJson(invalidPayload);

    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('reiht Offline-Aktionen in die SyncQueue ein und führt sie beim Flush aus', async () => {
    enqueueSyncAction({
      type: 'update_kanban_task',
      payload: { id: 't_offline', title: 'Offline erledigt' },
      entityId: 't_offline'
    });

    const queue = getSyncQueue();
    expect(queue.length).toBe(1);
    expect(queue[0].type).toBe('update_kanban_task');

    const flushedItems = [];
    await flushSyncQueue(async (item) => {
      flushedItems.push(item);
    });

    expect(flushedItems.length).toBe(1);
    expect(getSyncQueue().length).toBe(0);
  });
});

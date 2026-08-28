import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { 
  getNotificationSettings, 
  saveNotificationSettings, 
  checkNotificationPermission, 
  requestNotificationPermission, 
  sendImmediateNotification, 
  sendTestNotification,
  scheduleMorningFocus,
  checkAndNotifyFollowUps,
  checkAndNotifyDueTodos,
  checkAndNotifyHabitStreak,
  DEFAULT_NOTIFICATION_SETTINGS
} from '../../services/notificationService';
import { updateAndroidWidget } from '../../services/widget';
import { NotificationCenterModal } from '../../components/NotificationCenterModal';

describe('Notification & Widget System Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();

    // Mock Notification API im globalen Window
    const notifSpy = vi.fn();
    function MockNotification(title, options) {
      notifSpy(title, options);
      this.title = title;
      this.options = options;
    }
    MockNotification.permission = 'granted';
    MockNotification.requestPermission = vi.fn().mockResolvedValue('granted');
    MockNotification.spy = notifSpy;

    global.Notification = MockNotification;
    if (typeof window !== 'undefined') {
      window.Notification = MockNotification;
    }
  });

  describe('notificationService Settings & Permissions', () => {
    it('returns default notification settings when localStorage is empty', () => {
      const settings = getNotificationSettings();
      expect(settings).toEqual(DEFAULT_NOTIFICATION_SETTINGS);
      expect(settings.enabled).toBe(true);
      expect(settings.crmFollowUps).toBe(true);
      expect(settings.morningFocusTime).toBe('08:00');
    });

    it('saves and merges new notification settings', () => {
      const updated = saveNotificationSettings({
        morningFocusTime: '07:30',
        crmFollowUps: false
      });
      expect(updated.morningFocusTime).toBe('07:30');
      expect(updated.crmFollowUps).toBe(false);
      expect(updated.todoDeadlines).toBe(true); // preserved

      const loaded = getNotificationSettings();
      expect(loaded.morningFocusTime).toBe('07:30');
      expect(loaded.crmFollowUps).toBe(false);
    });

    it('checks and requests notification permissions correctly', async () => {
      const hasPerm = await checkNotificationPermission();
      expect(hasPerm).toBe(true);

      const requestRes = await requestNotificationPermission();
      expect(requestRes).toBe(true);
      expect(global.Notification.requestPermission).toHaveBeenCalled();
    });
  });

  describe('Notification Dispatching & Triggers', () => {
    it('sends immediate notification when enabled', async () => {
      const sent = await sendImmediateNotification({
        title: 'Test Title',
        body: 'Test Body'
      });
      expect(sent).toBe(true);
      expect(global.Notification.spy).toHaveBeenCalledWith('Test Title', expect.objectContaining({
        body: 'Test Body'
      }));
    });

    it('does not send notification when disabled in settings', async () => {
      saveNotificationSettings({ enabled: false });
      const sent = await sendImmediateNotification({
        title: 'Should not fire'
      });
      expect(sent).toBe(false);
    });

    it('sends test notification with success', async () => {
      const res = await sendTestNotification();
      expect(res.success).toBe(true);
      expect(global.Notification.spy).toHaveBeenCalledWith(
        expect.stringContaining('Founder OS'),
        expect.anything()
      );
    });

    it('triggers follow-up notification when CRM lead is due today', () => {
      const todayStr = new Date().toISOString().split('T')[0];
      const testLeads = [
        { id: 1, company: 'Elektro Harz GmbH', followUpDate: todayStr, status: 'in_progress' }
      ];

      checkAndNotifyFollowUps(testLeads);
      expect(global.Notification.spy).toHaveBeenCalledWith(
        expect.stringContaining('CRM Wiedervorlage'),
        expect.objectContaining({
          body: expect.stringContaining('Elektro Harz GmbH')
        })
      );
    });

    it('triggers due todos notification for active tasks', () => {
      const testTodos = [
        { id: 1, text: 'Angebot schreiben', done: false },
        { id: 2, text: 'Kunde anrufen', done: false },
        { id: 3, text: 'Rechnung prüfen', done: false }
      ];

      checkAndNotifyDueTodos(testTodos);
      expect(global.Notification.spy).toHaveBeenCalledWith(
        expect.stringContaining('offene Aufgaben'),
        expect.anything()
      );
    });

    it('triggers habit streak protection when habits are incomplete', () => {
      const testHabits = [
        { id: 1, title: 'Sport', completed: false }
      ];

      checkAndNotifyHabitStreak(testHabits, 7);
      expect(global.Notification.spy).toHaveBeenCalledWith(
        expect.stringContaining('7-Tage Streak'),
        expect.anything()
      );
    });
  });

  describe('updateAndroidWidget Service', () => {
    it('updates widget data and saves to preview storage in web mode', async () => {
      const res = await updateAndroidWidget({
        dashNotes: 'Wichtige Notiz für den Tag',
        dashTodos: [{ text: 'Aufgabe 1', done: false }],
        leads: [{ id: '1', status: 'Won' }, { id: '2', status: 'Open' }],
        streak: 5,
        dailyGoal: '10.000 € Umsatz generieren'
      });

      expect(res).toBe(true);
      const savedRaw = localStorage.getItem('founder_widget_preview_data');
      expect(savedRaw).toBeTruthy();
      const saved = JSON.parse(savedRaw);
      expect(saved.notes).toBe('Wichtige Notiz für den Tag');
      expect(saved.streak).toBe(5);
      expect(saved.wonCount).toBe(1);
      expect(saved.dailyGoal).toBe('10.000 € Umsatz generieren');
    });
  });

  describe('NotificationCenterModal UI Component', () => {
    it('renders notification modal with all categories and controls', () => {
      const onToast = vi.fn();
      render(
        <NotificationCenterModal
          isOpen={true}
          onClose={() => {}}
          dashNotes="Test Notiz"
          dashTodos={[]}
          leads={[]}
          streak={3}
          dailyGoal="Tagesziel"
          onShowToast={onToast}
        />
      );

      expect(screen.getByText(/Push-Benachrichtigungen & Widgets/i)).toBeInTheDocument();
      expect(screen.getByText(/CRM-Wiedervorlagen/i)).toBeInTheDocument();
      expect(screen.getByText(/To-Do Fristen/i)).toBeInTheDocument();
      expect(screen.getByText(/Täglicher Morgen-Fokus/i)).toBeInTheDocument();
      expect(screen.getByText(/Habit Tracker & Streak-Schutz/i)).toBeInTheDocument();
      expect(screen.getByText(/Test-Benachrichtigung senden/i)).toBeInTheDocument();
      expect(screen.getByText(/Widgets manuell updaten/i)).toBeInTheDocument();
    });

    it('triggers test notification on button click', async () => {
      const onToast = vi.fn();
      render(
        <NotificationCenterModal
          isOpen={true}
          onClose={() => {}}
          dashNotes="Test Notiz"
          dashTodos={[]}
          leads={[]}
          streak={3}
          dailyGoal="Tagesziel"
          onShowToast={onToast}
        />
      );

      const testBtn = screen.getByText(/Test-Benachrichtigung senden/i);
      fireEvent.click(testBtn);

      await waitFor(() => {
        expect(onToast).toHaveBeenCalledWith(
          expect.stringContaining('Test-Benachrichtigung gesendet'),
          'success'
        );
      });
    });

    it('toggles widget guide accordion', () => {
      render(
        <NotificationCenterModal
          isOpen={true}
          onClose={() => {}}
          dashNotes="Test Notiz"
          dashTodos={[]}
          leads={[]}
          streak={3}
          dailyGoal="Tagesziel"
        />
      );

      const guideBtn = screen.getByText(/Wie füge ich das Widget zum Startbildschirm hinzu/i);
      fireEvent.click(guideBtn);

      expect(screen.getByText(/So platzierst du die Widgets auf Android:/i)).toBeInTheDocument();
      expect(screen.getByText(/All-in-One Power Widget/i)).toBeInTheDocument();
    });
  });
});

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { 
  fetchGoogleCalendarEvents, 
  fetchUnreadGmailMessages, 
  logoutGoogle 
} from '../../services/googleWorkspace.js';
import { 
  checkAndNotifyCalendarEvents, 
  checkAndNotifyNewEmails, 
  saveNotificationSettings 
} from '../../services/notificationService.js';
import { updateAndroidWidget } from '../../services/widget.js';

describe('Google Workspace Live-Radar & Notification Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();

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

    saveNotificationSettings({
      enabled: true,
      googleCalendarReminders: true,
      gmailRadar: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Google Calendar Live-Radar', () => {
    it('fetches and formats Google Calendar events correctly', async () => {
      const mockApiResponse = {
        items: [
          {
            id: 'cal_1',
            summary: 'Kundengespräch Malerbetrieb Harz',
            description: 'Vor-Ort Termin zur E-Rechnung',
            location: 'Goslar',
            start: { dateTime: '2026-08-28T14:00:00+02:00' },
            end: { dateTime: '2026-08-28T15:00:00+02:00' },
            htmlLink: 'https://calendar.google.com/event?id=cal_1'
          }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse
      });

      const events = await fetchGoogleCalendarEvents('mock_token_123');
      expect(events).toHaveLength(1);
      expect(events[0].title).toBe('Kundengespräch Malerbetrieb Harz');
      expect(events[0].location).toBe('Goslar');
      expect(events[0].isGoogle).toBe(true);
    });

    it('triggers a notification when a Google event is due in the next 15-30 minutes', () => {
      const fifteenMinsFromNow = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      const testEvents = [
        {
          id: 'cal_due_soon',
          title: 'Strategiegespräch Kanzlei',
          start: fifteenMinsFromNow,
          time: '14:00',
          location: 'Bad Harzburg'
        }
      ];

      checkAndNotifyCalendarEvents(testEvents);

      expect(global.Notification.spy).toHaveBeenCalledWith(
        expect.stringContaining('Strategiegespräch Kanzlei'),
        expect.objectContaining({
          body: expect.stringContaining('Bad Harzburg')
        })
      );
    });
  });

  describe('Gmail Live-Radar', () => {
    it('fetches and parses unread Gmail messages', async () => {
      global.fetch = vi.fn()
        // 1st call: list messages
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ messages: [{ id: 'msg_1', threadId: 'th_1' }] })
        })
        // 2nd call: message details
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            id: 'msg_1',
            threadId: 'th_1',
            snippet: 'Wir hätten gerne ein Angebot für Büro-Reinigung...',
            payload: {
              headers: [
                { name: 'Subject', value: 'Anfrage Büroreinigung Goslar' },
                { name: 'From', value: 'info@maler-harz.de' },
                { name: 'Date', value: 'Fri, 28 Aug 2026 13:30:00 +0200' }
              ]
            }
          })
        });

      const messages = await fetchUnreadGmailMessages('mock_token_123');
      expect(messages).toHaveLength(1);
      expect(messages[0].subject).toBe('Anfrage Büroreinigung Goslar');
      expect(messages[0].from).toBe('info@maler-harz.de');
      expect(messages[0].snippet).toContain('Büro-Reinigung');
    });

    it('triggers notification when a new unread email is detected', () => {
      const testEmails = [
        {
          id: 'mail_fresh_99',
          subject: 'Neuer Auftrag bestätigt',
          from: 'kanzlei@harz-steuern.de',
          snippet: 'Der Vertrag ist unterschrieben im Anhang.'
        }
      ];

      checkAndNotifyNewEmails(testEmails);

      expect(global.Notification.spy).toHaveBeenCalledWith(
        expect.stringContaining('kanzlei@harz-steuern.de'),
        expect.objectContaining({
          body: expect.stringContaining('Neuer Auftrag bestätigt')
        })
      );
    });
  });

  describe('Android Widget Update with Google Data', () => {
    it('saves nextMeeting and unreadMailsCount to widget data', async () => {
      const res = await updateAndroidWidget({
        dashNotes: 'Test Note',
        dashTodos: [{ text: 'Task 1', done: false }],
        leads: [],
        streak: 3,
        dailyGoal: 'Umsatz steigern',
        calendarEvents: [{ title: 'Kundenmeeting', time: '14:00' }],
        gmailMessages: [{ id: '1' }, { id: '2' }]
      });

      expect(res).toBe(true);
      const raw = localStorage.getItem('founder_widget_preview_data');
      expect(raw).toBeTruthy();
      const parsed = JSON.parse(raw);
      expect(parsed.nextMeeting).toBe('14:00 Kundenmeeting');
      expect(parsed.unreadMailsCount).toBe(2);
    });
  });

  describe('Google Session Logout', () => {
    it('clears access token and connection flags on logout', () => {
      sessionStorage.setItem('f_google_access_token', 'sample_token');
      localStorage.setItem('f_google_connected', 'true');

      logoutGoogle();

      expect(sessionStorage.getItem('f_google_access_token')).toBeNull();
      expect(localStorage.getItem('f_google_connected')).toBe('false');
    });
  });
});

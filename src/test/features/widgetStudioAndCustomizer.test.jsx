import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  getWidgetConfig, 
  saveWidgetConfig, 
  WIDGET_PRESETS, 
  DEFAULT_WIDGET_CONFIG, 
  updateAndroidWidget 
} from '../../services/widget.js';
import { WidgetStudio } from '../../components/WidgetStudio.jsx';
import { NotificationCenterModal } from '../../components/NotificationCenterModal.jsx';

describe('Widget Studio & Customizer Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  describe('Widget Configuration Service', () => {
    it('returns default widget config when nothing is stored', () => {
      const config = getWidgetConfig();
      expect(config.showNotes).toBe(true);
      expect(config.showTodos).toBe(true);
      expect(config.theme).toBe('glassmorphic');
      expect(config.todoLimit).toBe(3);
    });

    it('saves and merges widget configuration updates', () => {
      saveWidgetConfig({ theme: 'amoled', todoLimit: 5, showCrm: false });
      const updated = getWidgetConfig();
      expect(updated.theme).toBe('amoled');
      expect(updated.todoLimit).toBe(5);
      expect(updated.showCrm).toBe(false);
      expect(updated.showNotes).toBe(true); // preserved
    });

    it('contains all 4 required 1-click presets', () => {
      expect(WIDGET_PRESETS.allInOne).toBeDefined();
      expect(WIDGET_PRESETS.deepWork).toBeDefined();
      expect(WIDGET_PRESETS.salesHunter).toBeDefined();
      expect(WIDGET_PRESETS.minimalist).toBeDefined();
      
      expect(WIDGET_PRESETS.deepWork.todoLimit).toBe(5);
      expect(WIDGET_PRESETS.minimalist.theme).toBe('amoled');
    });

    it('includes full configuration flags in updateAndroidWidget payload', async () => {
      saveWidgetConfig({ theme: 'cyan', bgAlpha: 70, showNotes: false, todoLimit: 5 });
      
      const success = await updateAndroidWidget({
        dashNotes: 'Note',
        dashTodos: [
          { text: 'T1' }, { text: 'T2' }, { text: 'T3' }, { text: 'T4' }, { text: 'T5' }, { text: 'T6' }
        ],
        leads: [{ id: 1 }],
        streak: 10,
        dailyGoal: '10k MRR'
      });

      expect(success).toBe(true);
      const raw = localStorage.getItem('founder_widget_preview_data');
      expect(raw).toBeTruthy();
      const parsed = JSON.parse(raw);
      expect(parsed.theme).toBe('cyan');
      expect(parsed.bgAlpha).toBe(70);
      expect(parsed.showNotes).toBe(false);
      expect(parsed.todoLimit).toBe(5);
      // Ensure todo limit applied (max 5)
      const todos = JSON.parse(parsed.todos);
      expect(todos.length).toBe(5);
    });
  });

  describe('WidgetStudio UI Component', () => {
    it('renders the live smartphone preview, presets, and controls', () => {
      render(
        <WidgetStudio
          dashNotes="Wichtige Notiz für heute"
          dashTodos={[{ text: 'Aufgabe 1', done: false }]}
          leads={[{ id: 1 }]}
          streak={5}
          dailyGoal="Harzer KMUs automatisieren"
        />
      );

      expect(screen.getByText(/Live Startbildschirm-Vorschau/i)).toBeInTheDocument();
      expect(screen.getByText(/🌟 All-in-One Master/i)).toBeInTheDocument();
      expect(screen.getByText(/🎯 Deep Work & Fokus/i)).toBeInTheDocument();
      expect(screen.getByText(/💼 Sales Hunter/i)).toBeInTheDocument();
      expect(screen.getByText(/🖤 Minimalist AMOLED/i)).toBeInTheDocument();
      expect(screen.getByText(/Modul-Sichtbarkeit/i)).toBeInTheDocument();
    });

    it('switches preset when clicking preset card', () => {
      render(
        <WidgetStudio
          dashNotes="Wichtige Notiz"
          dashTodos={[{ text: 'Aufgabe 1' }]}
          streak={5}
        />
      );

      const deepWorkBtn = screen.getByText(/Deep Work & Fokus/i).closest('button');
      fireEvent.click(deepWorkBtn);

      const config = getWidgetConfig();
      expect(config.theme).toBe('navy');
      expect(config.todoLimit).toBe(5);
      expect(config.showNotes).toBe(false);
    });

    it('toggles module visibility and saves updated config', () => {
      render(<WidgetStudio />);

      const notesToggle = screen.getByText(/Notiz-Kachel/i).closest('div');
      fireEvent.click(notesToggle);

      // Note should now be disabled
      const updatedConfig = getWidgetConfig();
      expect(updatedConfig.showNotes).toBe(false);
    });

    it('applies configuration to Android widgets and triggers toast callback', async () => {
      const onToast = vi.fn();
      render(
        <WidgetStudio
          dashNotes="Test Note"
          dashTodos={[]}
          leads={[]}
          onShowToast={onToast}
        />
      );

      const applyBtn = screen.getByText(/Auf Startbildschirm anwenden/i).closest('button');
      fireEvent.click(applyBtn);

      await waitFor(() => {
        expect(onToast).toHaveBeenCalledWith(
          expect.stringContaining('Widget-Design'),
          'success'
        );
      });
    });
  });

  describe('NotificationCenterModal Studio Tab Switcher', () => {
    it('switches between Notifications and Widget-Studio tabs', () => {
      render(
        <NotificationCenterModal
          isOpen={true}
          onClose={() => {}}
          dashNotes="Test"
          dashTodos={[]}
          leads={[]}
          streak={3}
          dailyGoal="Ziel"
        />
      );

      // Initially on Notifications tab
      expect(screen.getByText(/Hauptschalter/i)).toBeInTheDocument();

      // Click Studio Tab
      const studioTabBtn = screen.getByText(/Widget-Studio & Design/i).closest('button');
      fireEvent.click(studioTabBtn);

      // Now Widget Studio is visible
      expect(screen.getByText(/Live Startbildschirm-Vorschau/i)).toBeInTheDocument();
      expect(screen.getByText(/Schnell-Profile/i)).toBeInTheDocument();

      // Click Back to Notifications Tab
      const notifTabBtn = screen.getByText(/Benachrichtigungen & Alarme/i).closest('button');
      fireEvent.click(notifTabBtn);

      expect(screen.getByText(/Hauptschalter/i)).toBeInTheDocument();
    });
  });
});

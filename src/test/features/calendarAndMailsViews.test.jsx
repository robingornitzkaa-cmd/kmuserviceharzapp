import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarView } from '../../components/CalendarView';
import { MailsView } from '../../components/MailsView';
import { Sidebar } from '../../components/Sidebar';

describe('CalendarView Component', () => {
  const mockEvents = [
    { id: 'ev1', title: 'Kundengespräch GoClean', date: '2026-11-10', time: '10:00', location: 'Harz Office', accountEmail: 'robin@kmu.de', isGoogle: true },
    { id: 'ev2', title: 'Strategiemeeting', date: '2026-11-10', time: '14:30', location: 'Online', isGoogle: false }
  ];

  const mockAccounts = [
    { email: 'robin@kmu.de', name: 'Robin Haupt' }
  ];

  it('renders correctly with cockpit mode and events', () => {
    render(
      <CalendarView
        calendarEvents={mockEvents}
        googleAccounts={mockAccounts}
        deleteCalendarEvent={vi.fn()}
      />
    );

    expect(screen.getByText('Terminkalender & Agenda')).toBeDefined();
    expect(screen.getByText('Kundengespräch GoClean')).toBeDefined();
    expect(screen.getByText('Strategiemeeting')).toBeDefined();
    expect(screen.getByText(/Gründer-Cockpit/)).toBeDefined();
    expect(screen.getByText(/Google Kalender Web/)).toBeDefined();
  });

  it('allows toggling between cockpit and web embedded mode', () => {
    render(
      <CalendarView
        calendarEvents={mockEvents}
        googleAccounts={mockAccounts}
        deleteCalendarEvent={vi.fn()}
      />
    );

    const webBtn = screen.getByText(/Google Kalender Web/);
    fireEvent.click(webBtn);

    expect(screen.getByText(/Offizielle Google Kalender Web-Oberfläche/)).toBeDefined();
    expect(screen.getByText(/In Google Kalender \(neuem Tab\) öffnen/)).toBeDefined();
  });
});

describe('MailsView Component', () => {
  const mockMails = [
    { id: 'm1', from: 'chef@firma.de', subject: 'Angebot Photovoltaik', snippet: 'Können Sie uns ein Angebot zusenden?', date: '10:15', accountEmail: 'haupt@gmail.com' },
    { id: 'm2', from: 'newsletter@tech.com', subject: 'Wöchentliches Update', snippet: 'Hier sind die neuesten KI Trends', date: '08:00', accountEmail: 'ai@gmail.com' }
  ];

  const mockAccounts = [
    { email: 'haupt@gmail.com', name: 'Hauptkonto' },
    { email: 'ai@gmail.com', name: 'AI-Pro' }
  ];

  it('renders mails and filter chips', () => {
    render(
      <MailsView
        gmailMessages={mockMails}
        setGmailMessages={vi.fn()}
        googleAccounts={mockAccounts}
        selectedGmailAccount="all"
        setSelectedGmailAccount={vi.fn()}
      />
    );

    expect(screen.getByText('Gmail Posteingangs-Cockpit')).toBeDefined();
    expect(screen.getByText('Angebot Photovoltaik')).toBeDefined();
    expect(screen.getByText('Wöchentliches Update')).toBeDefined();
    expect(screen.getByText('2 ungelesen')).toBeDefined();
  });

  it('filters mails based on search query', () => {
    render(
      <MailsView
        gmailMessages={mockMails}
        setGmailMessages={vi.fn()}
        googleAccounts={mockAccounts}
        selectedGmailAccount="all"
        setSelectedGmailAccount={vi.fn()}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Mails durchsuchen/);
    fireEvent.change(searchInput, { target: { value: 'Photovoltaik' } });

    expect(screen.getByText('Angebot Photovoltaik')).toBeDefined();
    expect(screen.queryByText('Wöchentliches Update')).toBeNull();
  });

  it('triggers onMarkMailAsRead when clicking mark as read', async () => {
    const markMock = vi.fn();
    render(
      <MailsView
        gmailMessages={mockMails}
        setGmailMessages={vi.fn()}
        googleAccounts={mockAccounts}
        onMarkMailAsRead={markMock}
        selectedGmailAccount="all"
        setSelectedGmailAccount={vi.fn()}
      />
    );

    const markButtons = screen.getAllByTitle('Als gelesen markieren');
    expect(markButtons.length).toBeGreaterThan(0);
    fireEvent.click(markButtons[0]);

    expect(markMock).toHaveBeenCalledWith('m1', 'haupt@gmail.com');
  });
});

describe('Sidebar Component Navigation for Calendar and Mails', () => {
  it('renders Calendar and Mails navigation items with badge counts', () => {
    const setActiveTabMock = vi.fn();
    render(
      <Sidebar
        isMobile={false}
        sidebarCollapsed={false}
        setSidebarCollapsed={vi.fn()}
        activeTab="dashboard"
        setActiveTab={setActiveTabMock}
        calendarEvents={[{ id: '1' }, { id: '2' }]}
        gmailMessages={[{ id: 'm1' }, { id: 'm2' }, { id: 'm3' }]}
      />
    );

    expect(screen.getByText('Kalender')).toBeDefined();
    expect(screen.getByText('Mails')).toBeDefined();
    expect(screen.getByText('2')).toBeDefined(); // calendar badge
    expect(screen.getByText('3')).toBeDefined(); // mails badge

    fireEvent.click(screen.getByText('Kalender'));
    expect(setActiveTabMock).toHaveBeenCalledWith('calendar');

    fireEvent.click(screen.getByText('Mails'));
    expect(setActiveTabMock).toHaveBeenCalledWith('mails');
  });
});

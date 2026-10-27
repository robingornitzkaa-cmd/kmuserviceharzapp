import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WeeklyScorecardWidget } from '../../components/WeeklyScorecardWidget';
import { DEFAULT_WIDGET_ORDER, getWidgetOrder } from '../../components/SettingsView';

describe('WeeklyScorecardWidget Component & Scorecard System', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('is included in DEFAULT_WIDGET_ORDER and sorted correctly', () => {
    expect(DEFAULT_WIDGET_ORDER).toContain('scorecard');
    const order = getWidgetOrder({ order: DEFAULT_WIDGET_ORDER });
    expect(order).toContain('scorecard');
  });

  it('renders the scorecard widget with title and input sections', () => {
    render(<WeeklyScorecardWidget />);

    expect(screen.getByText(/Wöchentliche 15-Minuten Scorecard/i)).toBeInTheDocument();
    expect(screen.getByText(/KMU Service Harz/i)).toBeInTheDocument();
    expect(screen.getByText(/Teil 1: Input-KPIs/i)).toBeInTheDocument();
    expect(screen.getByText(/Teil 2: Output-Ergebnisse & Cashflow/i)).toBeInTheDocument();
    expect(screen.getByText(/1. Physische Handwerker-Briefe/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Kalt- & Nachfass-Anrufe/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Erreichte Entscheider/i)).toBeInTheDocument();
    expect(screen.getByText(/4. Hof-Walk-ins/i)).toBeInTheDocument();
    expect(screen.getByText(/5. Steuerberater \/ Innung \/ Bank/i)).toBeInTheDocument();
  });

  it('updates input metrics when clicking step buttons and recalculates progress', () => {
    render(<WeeklyScorecardWidget />);

    // Initial progress is 0%
    expect(screen.getByText('0%')).toBeInTheDocument();

    // Click "+5" on letters
    const plusButtons = screen.getAllByRole('button', { name: '+5' });
    expect(plusButtons.length).toBeGreaterThanOrEqual(2);
    fireEvent.click(plusButtons[0]); // Letters +5

    // Progress should increase from 0% to 7% (5/15 = 33.3%, / 5 = 6.66% -> 7%)
    expect(screen.getByText('7%')).toBeInTheDocument();
  });

  it('calculates cashflow and MRR correctly based on audits and setups', () => {
    render(<WeeklyScorecardWidget />);

    // Initially 0 € netto
    expect(screen.getByText(/0 € netto/i)).toBeInTheDocument();

    // Find audits done input (second number input in output section)
    const inputs = screen.getAllByRole('spinbutton');
    // Let's find inputs and update audits done
    // auditsDone is index 7 roughly: hoursWorked(0), letters(1), calls(2), decisionMakers(3), walkIns(4), multipliers(5), auditsBooked(6), auditsDone(7), setups(8), retainers(9)
    const auditsDoneInput = inputs.find(input => input.style.color === 'rgb(74, 222, 128)' || input.style.color === '#4ade80');
    expect(auditsDoneInput).toBeDefined();

    fireEvent.change(auditsDoneInput, { target: { value: '2' } });

    // 2 * 500 = 1.000 € netto
    expect(screen.getByText(/1\.000 € netto/i)).toBeInTheDocument();
  });

  it('persists data to localStorage when clicking save button', async () => {
    render(<WeeklyScorecardWidget />);

    const saveButton = screen.getByRole('button', { name: /15-Min.-Scorecard speichern/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/Gespeichert!/i)).toBeInTheDocument();
    });

    const stored = localStorage.getItem('f_weekly_scorecard_data');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored);
    const keys = Object.keys(parsed);
    expect(keys.length).toBeGreaterThan(0);
    expect(keys[0]).toMatch(/\d{4}_KW\d+/);
  });

  it('allows navigating to previous and next week', () => {
    render(<WeeklyScorecardWidget />);

    const prevBtn = screen.getByRole('button', { name: /Vorherige Woche/i });
    const nextBtn = screen.getByRole('button', { name: /Nächste Woche/i });

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    fireEvent.click(prevBtn);
    // After moving back, "Heute" button appears
    expect(screen.getByRole('button', { name: /Heute/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Heute/i }));
    // Returned to today
    expect(screen.queryByRole('button', { name: /Heute/i })).not.toBeInTheDocument();
  });
});

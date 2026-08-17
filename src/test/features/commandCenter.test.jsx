import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CommandCenter } from '../../components/CommandCenter';

const CommandCenterTestWrapper = () => {
  const [docs, setDocs] = useState([
    {
      id: 'master-logbuch',
      title: 'masterLogbuch.txt',
      content: '## Master Logbuch Test\n- [ ] Meilenstein 1: Gewerbeanmeldung erledigt\n- [x] Meilenstein 2: Steuerberater kontaktiert'
    }
  ]);

  return (
    <CommandCenter
      docs={docs}
      setDocs={setDocs}
      isOnline={true}
      ragPersona="general"
      setRagPersona={vi.fn()}
      geminiApiKey=""
      onOpenLightbox={vi.fn()}
      coachingMeetings={[]}
      setCoachingMeetings={vi.fn()}
      onClaimRoadmapXp={vi.fn()}
    />
  );
};

describe('Command Center Feature - Gründungs-Roadmap & Master-Logbuch', () => {
  it('rendert das Command Center mit den Accordion-Sektionen', () => {
    render(<CommandCenterTestWrapper />);
    expect(screen.getByText('Gründung & Business Command Center')).toBeInTheDocument();
    expect(screen.getByText(/1. Meilensteine & Hausaufgaben/i)).toBeInTheDocument();
  });

  it('öffnet die Roh-Text Sektion und zeigt das Master-Logbuch an', () => {
    render(<CommandCenterTestWrapper />);

    const rawSectionHeader = screen.getByText(/5. masterLogbuch.txt/i);
    fireEvent.click(rawSectionHeader);

    const textarea = screen.getByPlaceholderText('Schreibe hier deinen aktuellen Stand hinein...');
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toContain('## Master Logbuch Test');
  });

  it('erlaubt das direkte Bearbeiten des Master-Logbuchs', () => {
    render(<CommandCenterTestWrapper />);

    const rawSectionHeader = screen.getByText(/5. masterLogbuch.txt/i);
    fireEvent.click(rawSectionHeader);

    const textarea = screen.getByPlaceholderText('Schreibe hier deinen aktuellen Stand hinein...');
    fireEvent.change(textarea, { target: { value: 'Neuer Eintrag: Test bestanden!' } });

    expect(textarea.value).toBe('Neuer Eintrag: Test bestanden!');
  });
});

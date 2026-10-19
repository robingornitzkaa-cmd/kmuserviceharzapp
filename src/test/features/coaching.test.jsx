import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CoachingLivePortal } from '../../components/CoachingLivePortal';
import { WebsiteView } from '../../components/WebsiteView';
import { RewardShopModal } from '../../components/RewardShopModal';
import { PenaltyModal } from '../../components/PenaltyModal';

const CoachingTestWrapper = ({ initialPin = '1234', defaultUnlocked = false }) => {
  const [isUnlocked, setIsUnlocked] = useState(defaultUnlocked);
  const [portalPin, setPortalPin] = useState(initialPin);

  return (
    <CoachingLivePortal
      isUnlocked={isUnlocked}
      setIsUnlocked={setIsUnlocked}
      portalPin={portalPin}
      setPortalPin={setPortalPin}
      tasks={[]}
      docs={[]}
      coachingMeetings={[]}
      masterLogbuchContent=""
      onOpenLightbox={vi.fn()}
      showcaseMode={false}
      mask={(t) => t}
    />
  );
};

describe('Coaching & Gamification Feature - PIN-Gate & Life-OS', () => {
  it('zeigt die PIN-Abfrage bei gesperrtem Coaching-Portal an', () => {
    render(<CoachingTestWrapper />);
    expect(screen.getByText('Coaching Live-Portal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('PIN eingeben...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Portal Freischalten/i })).toBeInTheDocument();
  });

  it('verhindert den Zugang bei falscher PIN-Eingabe und zeigt Fehlermeldung', () => {
    render(<CoachingTestWrapper initialPin="1234" />);

    const pinInput = screen.getByPlaceholderText('PIN eingeben...');
    const unlockBtn = screen.getByRole('button', { name: /Portal Freischalten/i });

    fireEvent.change(pinInput, { target: { value: '9999' } });
    fireEvent.click(unlockBtn);

    expect(screen.getByText(/Falsche PIN/i)).toBeInTheDocument();
  });

  it('schaltet das Portal bei korrekter PIN-Eingabe erfolgreich frei', () => {
    render(<CoachingTestWrapper initialPin="1234" />);

    const pinInput = screen.getByPlaceholderText('PIN eingeben...');
    const unlockBtn = screen.getByRole('button', { name: /Portal Freischalten/i });

    fireEvent.change(pinInput, { target: { value: '1234' } });
    fireEvent.click(unlockBtn);

    expect(screen.getByText('Coaching Live- & Präsentations-Board')).toBeInTheDocument();
  });

  it('zeigt im freigeschalteten Portal den neuen Reiter Himmel/Hölle & FAB-Strategie (Kauss) an', () => {
    render(<CoachingTestWrapper defaultUnlocked={true} />);

    const strategyTabBtn = screen.getByRole('button', { name: /Himmel\/Hölle & FAB-Strategie/i });
    expect(strategyTabBtn).toBeInTheDocument();

    fireEvent.click(strategyTabBtn);
    expect(screen.getByText(/1\. Das Himmel-Hölle-Prinzip/i)).toBeInTheDocument();
    expect(screen.getByText(/2\. Deine 5 FAB-Statements/i)).toBeInTheDocument();
  });

  it('ermöglicht in WebsiteView das Umschalten zwischen Version 1, Version 2 und Version 3 ohne Datenverlust', () => {
    render(<WebsiteView />);

    const v1Btn = screen.getByRole('button', { name: /V1: Klassisch \(Original\)/i });
    const v2Btn = screen.getByRole('button', { name: /V2: Beleg-Fokus \+ Coaching/i });
    const v3Btn = screen.getByRole('button', { name: /V3: 3-Säulen Komplett \(Empfohlen\)/i });

    expect(v1Btn).toBeInTheDocument();
    expect(v2Btn).toBeInTheDocument();
    expect(v3Btn).toBeInTheDocument();

    // Umschalten auf Version 1 (Original bleibt unverändert erhalten)
    fireEvent.click(v1Btn);
    expect(screen.getByText(/Deine bisherige Website zu 100 % unverändert als Referenz/i)).toBeInTheDocument();

    // Umschalten auf Version 2 (Beleg-Fokus + Himmel/Hölle & FAB)
    fireEvent.click(v2Btn);
    expect(screen.getByText(/5 handfeste Gründe, warum unsere Lösung im Handwerksalltag sofort funktioniert/i)).toBeInTheDocument();

    // Umschalten auf Version 3 (3-Säulen Coaching-Edition)
    fireEvent.click(v3Btn);
    expect(screen.getByText(/Vereinfachte Businessprozesse, die Ihnen den Rücken komplett freihalten/i)).toBeInTheDocument();
  });

  it('rendert das Belohnungs-Shop Modal mit Punkten und Items', () => {
    const rewards = [
      { id: 'rew_1', title: '1h Harz-Wanderung Pause', cost: 50, icon: '🌲' },
      { id: 'rew_2', title: 'Neues Buch kaufen', cost: 100, icon: '📚' }
    ];

    render(
      <RewardShopModal
        isOpen={true}
        onClose={vi.fn()}
        points={120}
        rewards={rewards}
        onBuyReward={vi.fn()}
        onAddReward={vi.fn()}
        onDeleteReward={vi.fn()}
      />
    );

    expect(screen.getByRole('heading', { level: 2, name: /Belohnungs-Shop/i })).toBeInTheDocument();
    expect(screen.getByText('1h Harz-Wanderung Pause')).toBeInTheDocument();
    expect(screen.getByText('Neues Buch kaufen')).toBeInTheDocument();
  });

  it('rendert das Disziplin-Modal für Strafen', () => {
    const penalties = [
      { id: 'pen_1', title: '10 Liegestütze sofort', pointsPenalty: 20 }
    ];

    render(
      <PenaltyModal
        isOpen={true}
        onClose={vi.fn()}
        penalties={penalties}
        onExecutePenalty={vi.fn()}
        onAddPenalty={vi.fn()}
        onDeletePenalty={vi.fn()}
        streak={5}
      />
    );

    expect(screen.getByRole('heading', { level: 2, name: /Disziplin/i })).toBeInTheDocument();
    expect(screen.getByText('10 Liegestütze sofort')).toBeInTheDocument();
  });
});


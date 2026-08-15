import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Circle, 
  Building, 
  Users, 
  Zap, 
  TrendingUp, 
  Calendar, 
  Award, 
  Coins, 
  Plus, 
  Trash2, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { INITIAL_ROADMAP_PHASES } from '../constants/roadmapData';

export const FoundingRoadmapMatrix = ({
  onClaimXp,
  onOpenLogbuch,
  className = ''
}) => {
  const [phases, setPhases] = useState(() => {
    try {
      const saved = localStorage.getItem('f_roadmap_phases');
      return saved ? JSON.parse(saved) : INITIAL_ROADMAP_PHASES;
    } catch {
      return INITIAL_ROADMAP_PHASES;
    }
  });

  const [expandedPhases, setExpandedPhases] = useState({
    phase1: true,
    phase2: true,
    phase3: false,
    phase4: false
  });

  const [newMilestonePhase, setNewMilestonePhase] = useState(null);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDesc, setNewMilestoneDesc] = useState('');
  const [newMilestoneDueDate, setNewMilestoneDueDate] = useState('');
  const [newMilestoneXp, setNewMilestoneXp] = useState(150);

  useEffect(() => {
    localStorage.setItem('f_roadmap_phases', JSON.stringify(phases));
  }, [phases]);

  const togglePhaseExpand = (phaseId) => {
    setExpandedPhases(prev => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  // Status ändern & ggf. XP gutschreiben
  const handleUpdateStatus = (phaseId, milestoneId, newStatus) => {
    setPhases(prev => prev.map(phase => {
      if (phase.id !== phaseId) return phase;

      const updatedMilestones = phase.milestones.map(m => {
        if (m.id !== milestoneId) return m;

        const wasCompleted = m.status === 'completed';
        const isNowCompleted = newStatus === 'completed';

        // Wenn neu abgeschlossen, belohnen!
        if (!wasCompleted && isNowCompleted && onClaimXp) {
          onClaimXp(m.xpReward || 100, m.coinsReward || 30, m.title);
        }

        return { ...m, status: newStatus };
      });

      return { ...phase, milestones: updatedMilestones };
    }));
  };

  // Sub-Kriterium abhaken
  const handleToggleCriterion = (phaseId, milestoneId, criterionIndex) => {
    setPhases(prev => prev.map(phase => {
      if (phase.id !== phaseId) return phase;

      const updatedMilestones = phase.milestones.map(m => {
        if (m.id !== milestoneId) return m;

        const completedCriteria = m.completedCriteria || [];
        const isCompleted = completedCriteria.includes(criterionIndex);
        const updatedCompleted = isCompleted 
          ? completedCriteria.filter(i => i !== criterionIndex)
          : [...completedCriteria, criterionIndex];

        // Wenn alle Kriterien erfüllt sind, automatisch auf 'completed' setzen
        let newStatus = m.status;
        if (m.criteria && updatedCompleted.length === m.criteria.length && m.status !== 'completed') {
          newStatus = 'completed';
          if (onClaimXp) {
            onClaimXp(m.xpReward || 100, m.coinsReward || 30, m.title);
          }
        }

        return { ...m, completedCriteria: updatedCompleted, status: newStatus };
      });

      return { ...phase, milestones: updatedMilestones };
    }));
  };

  // Neuen Meilenstein anlegen
  const handleAddMilestone = (phaseId) => {
    if (!newMilestoneTitle.trim()) return;

    const newM = {
      id: `m_custom_${Date.now()}`,
      title: newMilestoneTitle.trim(),
      description: newMilestoneDesc.trim() || 'Individueller Gründungs-Meilenstein',
      status: 'pending',
      dueDate: newMilestoneDueDate || new Date().toISOString().split('T')[0],
      xpReward: Number(newMilestoneXp) || 100,
      coinsReward: 30,
      criteria: []
    };

    setPhases(prev => prev.map(phase => {
      if (phase.id === phaseId) {
        return { ...phase, milestones: [...phase.milestones, newM] };
      }
      return phase;
    }));

    setNewMilestonePhase(null);
    setNewMilestoneTitle('');
    setNewMilestoneDesc('');
    setNewMilestoneDueDate('');
  };

  // Meilenstein löschen
  const handleDeleteMilestone = (phaseId, milestoneId) => {
    if (!window.confirm('Diesen Meilenstein wirklich entfernen?')) return;
    setPhases(prev => prev.map(phase => {
      if (phase.id === phaseId) {
        return { ...phase, milestones: phase.milestones.filter(m => m.id !== milestoneId) };
      }
      return phase;
    }));
  };

  // Icon Resolver
  const getPhaseIcon = (iconName) => {
    switch (iconName) {
      case 'Building': return <Building size={18} />;
      case 'Users': return <Users size={18} />;
      case 'Zap': return <Zap size={18} />;
      case 'TrendingUp': return <TrendingUp size={18} />;
      default: return <Award size={18} />;
    }
  };

  // Berechne Gesamtfortschritt
  const totalMilestones = phases.reduce((acc, p) => acc + p.milestones.length, 0);
  const completedMilestones = phases.reduce((acc, p) => acc + p.milestones.filter(m => m.status === 'completed').length, 0);
  const overallPercentage = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  return (
    <div className={`card founding-roadmap-matrix ${className}`} style={{
      background: 'rgba(15, 23, 42, 0.85)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '0.85rem',
      padding: '1.25rem',
      color: 'white'
    }}>
      {/* Header mit Gesamt-Fortschritt */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '0.6rem',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <Flame size={22} color="#06b6d4" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              🗺️ Interaktive Gründungs-Roadmap & Meilenstein-Matrix
            </h3>
            <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Die 4 strategischen Phasen von der behördlichen Existenzgründung bis zur regionalen B2B-Marktführerschaft im Harz.
            </p>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '220px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Gründungs-Reifegrad</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{overallPercentage}% ({completedMilestones}/{totalMilestones})</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                width: `${overallPercentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                transition: 'width 0.4s ease'
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Phasen-Timeline Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {phases.map((phase, pIdx) => {
          const phaseTotal = phase.milestones.length;
          const phaseCompleted = phase.milestones.filter(m => m.status === 'completed').length;
          const phasePercent = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;
          const isExpanded = Boolean(expandedPhases[phase.id]);

          return (
            <div
              key={phase.id}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${isExpanded ? phase.color + '40' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: '0.75rem',
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}
            >
              {/* Phasen-Kopfzeile (Klickbar zum Auf-/Zuklappen) */}
              <div
                onClick={() => togglePhaseExpand(phase.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  background: isExpanded ? `linear-gradient(90deg, ${phase.color}15, transparent)` : 'transparent',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '0.45rem',
                    background: `${phase.color}20`,
                    border: `1px solid ${phase.color}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: phase.color
                  }}>
                    {getPhaseIcon(phase.icon)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{phase.title}</span>
                      <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', background: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}>
                        {phase.targetQuarter}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      {phase.subtitle}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: phasePercent === 100 ? '#10b981' : phase.color }}>
                      {phasePercent}%
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: '0.3rem' }}>
                      ({phaseCompleted}/{phaseTotal})
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                </div>
              </div>

              {/* Meilensteine-Liste */}
              {isExpanded && (
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                  <p style={{ margin: '0.25rem 0 0.85rem 0', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {phase.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {phase.milestones.map((m) => {
                      const isCompleted = m.status === 'completed';
                      const isInProgress = m.status === 'in_progress';
                      const isBlocked = m.status === 'blocked';
                      const completedCriteria = m.completedCriteria || [];

                      return (
                        <div
                          key={m.id}
                          style={{
                            background: isCompleted ? 'rgba(16, 185, 129, 0.05)' : 'rgba(0, 0, 0, 0.25)',
                            border: isCompleted 
                              ? '1px solid rgba(16, 185, 129, 0.25)' 
                              : isInProgress 
                              ? '1px solid rgba(245, 158, 11, 0.3)' 
                              : '1px solid var(--border-color)',
                            borderRadius: '0.6rem',
                            padding: '0.85rem',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                <span style={{
                                  fontSize: '0.85rem',
                                  fontWeight: 700,
                                  color: isCompleted ? '#34d399' : 'white',
                                  textDecoration: isCompleted ? 'line-through' : 'none'
                                }}>
                                  {m.title}
                                </span>

                                {/* XP & Coins Badge */}
                                <span style={{
                                  fontSize: '0.65rem',
                                  fontWeight: 700,
                                  padding: '0.1rem 0.4rem',
                                  borderRadius: '1rem',
                                  background: isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(234, 179, 8, 0.15)',
                                  color: isCompleted ? '#34d399' : '#facc15',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.2rem'
                                }}>
                                  <Award size={10} /> +{m.xpReward || 100} XP
                                </span>

                                {m.dueDate && (
                                  <span style={{
                                    fontSize: '0.65rem',
                                    padding: '0.1rem 0.35rem',
                                    borderRadius: '0.25rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.2rem'
                                  }}>
                                    <Calendar size={10} /> {new Date(m.dueDate).toLocaleDateString('de-DE')}
                                  </span>
                                )}
                              </div>

                              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                                {m.description}
                              </p>
                            </div>

                            {/* Status Buttons */}
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(phase.id, m.id, 'pending')}
                                style={{
                                  padding: '0.25rem 0.45rem',
                                  borderRadius: '0.3rem',
                                  background: m.status === 'pending' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.02)',
                                  border: '1px solid var(--border-color)',
                                  color: m.status === 'pending' ? 'white' : 'var(--text-muted)',
                                  fontSize: '0.65rem',
                                  cursor: 'pointer'
                                }}
                                title="Status: Geplant"
                              >
                                ⚪ Geplant
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(phase.id, m.id, 'in_progress')}
                                style={{
                                  padding: '0.25rem 0.45rem',
                                  borderRadius: '0.3rem',
                                  background: isInProgress ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.02)',
                                  border: isInProgress ? '1px solid #f59e0b' : '1px solid var(--border-color)',
                                  color: isInProgress ? '#fbbf24' : 'var(--text-muted)',
                                  fontSize: '0.65rem',
                                  cursor: 'pointer'
                                }}
                                title="Status: In Bearbeitung"
                              >
                                🟡 In Arbeit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(phase.id, m.id, 'blocked')}
                                style={{
                                  padding: '0.25rem 0.45rem',
                                  borderRadius: '0.3rem',
                                  background: isBlocked ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.02)',
                                  border: isBlocked ? '1px solid #ef4444' : '1px solid var(--border-color)',
                                  color: isBlocked ? '#f87171' : 'var(--text-muted)',
                                  fontSize: '0.65rem',
                                  cursor: 'pointer'
                                }}
                                title="Status: Blockiert"
                              >
                                🔴 Blockiert
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(phase.id, m.id, 'completed')}
                                style={{
                                  padding: '0.25rem 0.45rem',
                                  borderRadius: '0.3rem',
                                  background: isCompleted ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.02)',
                                  border: isCompleted ? '1px solid #10b981' : '1px solid var(--border-color)',
                                  color: isCompleted ? '#34d399' : 'var(--text-muted)',
                                  fontSize: '0.65rem',
                                  fontWeight: isCompleted ? 700 : 400,
                                  cursor: 'pointer'
                                }}
                                title="Status: Erledigt (XP gutschreiben)"
                              >
                                🟢 Erledigt
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteMilestone(phase.id, m.id)}
                                style={{
                                  padding: '0.25rem',
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'var(--text-muted)',
                                  cursor: 'pointer'
                                }}
                                title="Meilenstein löschen"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>

                          {/* Kriterien-Checkliste */}
                          {m.criteria && m.criteria.length > 0 && (
                            <div style={{ marginTop: '0.5rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                              <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                                Erfolgskriterien:
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.35rem' }}>
                                {m.criteria.map((crit, cIdx) => {
                                  const isCritDone = completedCriteria.includes(cIdx);
                                  return (
                                    <div
                                      key={cIdx}
                                      onClick={() => handleToggleCriterion(phase.id, m.id, cIdx)}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        fontSize: '0.7rem',
                                        color: isCritDone ? 'var(--text-muted)' : 'var(--text-secondary)',
                                        textDecoration: isCritDone ? 'line-through' : 'none',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isCritDone}
                                        onChange={() => {}}
                                        style={{ accentColor: '#10b981', cursor: 'pointer' }}
                                      />
                                      <span>{crit}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Button: Neuen Meilenstein anlegen */}
                  {newMilestonePhase === phase.id ? (
                    <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(0,0,0,0.35)', border: '1px dashed var(--accent-cyan)', borderRadius: '0.5rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                        + Neuer Meilenstein für {phase.title}
                      </div>
                      <input
                        type="text"
                        value={newMilestoneTitle}
                        onChange={(e) => setNewMilestoneTitle(e.target.value)}
                        placeholder="Titel des Meilensteins..."
                        style={{ width: '100%', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.3rem', color: 'white', fontSize: '0.75rem', marginBottom: '0.4rem' }}
                      />
                      <input
                        type="text"
                        value={newMilestoneDesc}
                        onChange={(e) => setNewMilestoneDesc(e.target.value)}
                        placeholder="Beschreibung & Kriterien..."
                        style={{ width: '100%', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.3rem', color: 'white', fontSize: '0.75rem', marginBottom: '0.4rem' }}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input
                          type="date"
                          value={newMilestoneDueDate}
                          onChange={(e) => setNewMilestoneDueDate(e.target.value)}
                          style={{ flex: 1, padding: '0.35rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.3rem', color: 'white', fontSize: '0.75rem' }}
                        />
                        <input
                          type="number"
                          value={newMilestoneXp}
                          onChange={(e) => setNewMilestoneXp(e.target.value)}
                          placeholder="XP Belohnung (z.B. 150)"
                          style={{ width: '120px', padding: '0.35rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.3rem', color: 'white', fontSize: '0.75rem' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          type="button"
                          onClick={() => handleAddMilestone(phase.id)}
                          className="btn btn-primary"
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                        >
                          Hinzufügen
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewMilestonePhase(null)}
                          className="btn btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                        >
                          Abbrechen
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setNewMilestonePhase(phase.id)}
                      style={{
                        marginTop: '0.6rem',
                        width: '100%',
                        padding: '0.45rem',
                        borderRadius: '0.4rem',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px dashed var(--border-color)',
                        color: 'var(--text-muted)',
                        fontSize: '0.72rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.3rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={14} /> Weiteren Meilenstein hinzufügen
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Dumbbell, CheckCircle2, Flame, X, Lock } from 'lucide-react';

export const PenaltyModal = ({
  isOpen,
  onClose,
  userCoins,
  setUserCoins,
  penaltyMode,
  setPenaltyMode,
  penalties,
  setPenalties
}) => {
  const [completedPenalties, setCompletedPenalties] = useState(() => {
    return JSON.parse(localStorage.getItem('f_completed_penalties')) || [];
  });

  if (!isOpen) return null;

  const handleResolvePenalty = (penalty) => {
    const logItem = {
      ...penalty,
      resolvedAt: new Date().toLocaleString('de-DE')
    };

    const updatedCompleted = [logItem, ...completedPenalties];
    setCompletedPenalties(updatedCompleted);
    localStorage.setItem('f_completed_penalties', JSON.stringify(updatedCompleted));

    // If in debt mode and user has negative coins, clearing a penalty can award bonus relief coins
    if (userCoins < 0) {
      const newBalance = Math.min(0, userCoins + (penalty.costCoins || 50));
      setUserCoins(newBalance);
      localStorage.setItem('f_coins', newBalance.toString());
    }

    alert(`💪 Respekt! Strafe "${penalty.title}" wurde beglichen & abgebaut.`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(10, 15, 25, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'linear-gradient(135deg, rgba(30, 20, 30, 0.95), rgba(20, 15, 25, 0.98))',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '700px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(239, 68, 68, 0.15)',
        color: '#fff',
        padding: '28px'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', padding: '10px', borderRadius: '12px', color: '#fff' }}>
              <ShieldAlert size={26} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                Disziplin- & Bestrafungs-Manager
              </h2>
              <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.88rem' }}>
                Bleibe konsequent – keine Ausreden bei wichtigen Habits!
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#94a3b8', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Status Debt Warning if negative balance */}
        {userCoins < 0 && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '14px',
            padding: '16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <Lock size={28} color="#ef4444" />
            <div>
              <div style={{ fontWeight: 700, color: '#f87171', fontSize: '1rem' }}>
                Belohnungs-Shop Gesperrt (Coins Schulden: {userCoins} Coins)
              </div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '2px' }}>
                Du hast Coins-Schulden durch verpasste Habits. Erfülle Straf-Aufgaben oder baue Habits ab, um den Shop wieder freizuschalten!
              </div>
            </div>
          </div>
        )}

        {/* Penalty Mode Switcher */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.88rem', color: '#f8fafc', fontWeight: 700, marginBottom: '10px' }}>
            Wähle deinen bevorzugten Bestrafungs-Modus:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            <button
              onClick={() => {
                setPenaltyMode('debt');
                localStorage.setItem('f_penalty_mode', 'debt');
              }}
              style={{
                background: penaltyMode === 'debt' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.04)',
                border: penaltyMode === 'debt' ? '1px solid #ef4444' : '1px solid transparent',
                color: penaltyMode === 'debt' ? '#f87171' : '#94a3b8',
                padding: '12px',
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.85rem'
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={14} /> Modus A: Münz-Abzug
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Verpasste Habits ziehen Coins ab.</div>
            </button>

            <button
              onClick={() => {
                setPenaltyMode('challenge');
                localStorage.setItem('f_penalty_mode', 'challenge');
              }}
              style={{
                background: penaltyMode === 'challenge' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.04)',
                border: penaltyMode === 'challenge' ? '1px solid #ef4444' : '1px solid transparent',
                color: penaltyMode === 'challenge' ? '#f87171' : '#94a3b8',
                padding: '12px',
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.85rem'
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Dumbbell size={14} /> Modus B: Straf-Aufgabe
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Körperliche oder Disziplin-Challenges.</div>
            </button>

            <button
              onClick={() => {
                setPenaltyMode('strikes');
                localStorage.setItem('f_penalty_mode', 'strikes');
              }}
              style={{
                background: penaltyMode === 'strikes' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.04)',
                border: penaltyMode === 'strikes' ? '1px solid #ef4444' : '1px solid transparent',
                color: penaltyMode === 'strikes' ? '#f87171' : '#94a3b8',
                padding: '12px',
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.85rem'
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Flame size={14} /> Modus C: 3-Strikes
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>3 Fehler = 48h Shop-Sperre.</div>
            </button>
          </div>
        </div>

        {/* Penalty Challenges List */}
        <h4 style={{ margin: '0 0 14px 0', fontSize: '1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Dumbbell size={18} color="#ef4444" /> Aktive Straf- & Disziplin-Kataloge
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {penalties.map(p => (
            <div 
              key={p.id}
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '12px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: '#fca5a5', fontSize: '0.95rem' }}>{p.title}</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>{p.description}</div>
              </div>
              <button
                onClick={() => handleResolvePenalty(p)}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#f87171',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                <CheckCircle2 size={14} /> Strafe Beglichen
              </button>
            </div>
          ))}
        </div>

        {/* Completed Penalties Log */}
        {completedPenalties.length > 0 && (
          <div>
            <h5 style={{ margin: '0 0 10px 0', fontSize: '0.88rem', color: '#64748b' }}>Historie beglichener Strafen</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '150px', overflowY: 'auto' }}>
              {completedPenalties.map((item, idx) => (
                <div key={idx} style={{ fontSize: '0.8rem', color: '#94a3b8', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>✓ {item.title}</span>
                  <span style={{ color: '#64748b' }}>{item.resolvedAt}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

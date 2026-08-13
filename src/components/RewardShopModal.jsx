import React, { useState } from 'react';
import { Gift, Coins, Trophy, Plus, CheckCircle2, Sparkles, X, ShoppingBag } from 'lucide-react';

export const RewardShopModal = ({ 
  isOpen, 
  onClose, 
  userCoins, 
  setUserCoins, 
  rewards, 
  setRewards 
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('150');
  const [newCategory, setNewCategory] = useState('leisure');
  const [newDesc, setNewDesc] = useState('');
  const [activeTab, setActiveTab] = useState('shop'); // 'shop' | 'redeemed' | 'add'
  const [redeemedHistory, setRedeemedHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('f_redeemed_rewards')) || [];
  });
  const [claimedReward, setClaimedReward] = useState(null);

  if (!isOpen) return null;

  const handleRedeem = (reward) => {
    if (userCoins < reward.price) {
      alert(`Du brauchst noch ${reward.price - userCoins} Coins für diese Belohnung! Bleibe dran! 💪`);
      return;
    }

    const newCoins = userCoins - reward.price;
    setUserCoins(newCoins);
    localStorage.setItem('f_coins', newCoins.toString());

    const newItem = {
      ...reward,
      redeemedAt: new Date().toLocaleString('de-DE')
    };

    const updatedHistory = [newItem, ...redeemedHistory];
    setRedeemedHistory(updatedHistory);
    localStorage.setItem('f_redeemed_rewards', JSON.stringify(updatedHistory));

    setClaimedReward(reward);
  };

  const handleCreateReward = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const rewardObj = {
      id: 'r_' + Date.now(),
      title: newTitle,
      price: parseInt(newPrice) || 100,
      category: newCategory,
      description: newDesc || 'Eigene definierte Belohnung'
    };

    const updated = [rewardObj, ...rewards];
    setRewards(updated);
    localStorage.setItem('f_rewards', JSON.stringify(updated));

    setNewTitle('');
    setNewDesc('');
    setActiveTab('shop');
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
        background: 'linear-gradient(135deg, rgba(20, 26, 42, 0.95), rgba(15, 20, 32, 0.98))',
        border: '1px solid rgba(255, 215, 0, 0.25)',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '750px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(255, 215, 0, 0.15)',
        color: '#fff',
        padding: '28px'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'linear-gradient(135deg, #ffd700, #ff8c00)', padding: '10px', borderRadius: '12px', color: '#10141e' }}>
              <Gift size={26} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                Life OS Belohnungs-Shop
              </h2>
              <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.88rem' }}>
                Belohne dich für deine Disziplin & Erfolge ohne schlechtes Gewissen!
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

        {/* User Balance Banner */}
        <div style={{ 
          background: 'linear-gradient(90deg, rgba(255, 215, 0, 0.12), rgba(255, 140, 0, 0.08))', 
          border: '1px solid rgba(255, 215, 0, 0.3)', 
          borderRadius: '14px', 
          padding: '16px 20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '20px' 
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Dein Guthaben</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffd700', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <Coins size={26} color="#ffd700" />
              {userCoins} <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>Coins</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Verdient durch Habits & Ziele</span>
            <div style={{ fontSize: '0.9rem', color: '#38bdf8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
              <Trophy size={14} /> Fleiß zahlt sich aus!
            </div>
          </div>
        </div>

        {/* Claimed Modal Overlay */}
        {claimedReward && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.1))',
            border: '2px solid #22c55e',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease'
          }}>
            <Sparkles size={40} color="#22c55e" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ margin: 0, color: '#4ade80', fontSize: '1.3rem' }}>🎉 Belohnung Freigeschaltet!</h3>
            <p style={{ margin: '8px 0 16px 0', fontSize: '1rem', fontWeight: 600 }}>{claimedReward.title}</p>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '16px' }}>{claimedReward.description}</p>
            <button 
              onClick={() => setClaimedReward(null)} 
              style={{
                background: '#22c55e',
                color: '#10141e',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Jetzt genießen! 🚀
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
          <button
            onClick={() => setActiveTab('shop')}
            style={{
              background: activeTab === 'shop' ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
              border: activeTab === 'shop' ? '1px solid #ffd700' : '1px solid transparent',
              color: activeTab === 'shop' ? '#ffd700' : '#94a3b8',
              padding: '8px 16px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShoppingBag size={16} /> Shop ({rewards.length})
          </button>
          <button
            onClick={() => setActiveTab('redeemed')}
            style={{
              background: activeTab === 'redeemed' ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
              border: activeTab === 'redeemed' ? '1px solid #ffd700' : '1px solid transparent',
              color: activeTab === 'redeemed' ? '#ffd700' : '#94a3b8',
              padding: '8px 16px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CheckCircle2 size={16} /> Freigeschaltet ({redeemedHistory.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            style={{
              background: activeTab === 'add' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
              border: activeTab === 'add' ? '1px solid #38bdf8' : '1px solid transparent',
              color: activeTab === 'add' ? '#38bdf8' : '#94a3b8',
              padding: '8px 16px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginLeft: 'auto'
            }}
          >
            <Plus size={16} /> Belohnung anlegen
          </button>
        </div>

        {/* Tab 1: Shop List */}
        {activeTab === 'shop' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {rewards.map((r) => {
              const canAfford = userCoins >= r.price;
              return (
                <div 
                  key={r.id}
                  style={{
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: canAfford ? '1px solid rgba(255, 215, 0, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    boxShadow: canAfford ? '0 4px 15px rgba(255, 215, 0, 0.05)' : 'none'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>{r.title}</h4>
                      <div style={{
                        background: canAfford ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255,255,255,0.06)',
                        color: canAfford ? '#ffd700' : '#64748b',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Coins size={12} /> {r.price}
                      </div>
                    </div>
                    <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      {r.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRedeem(r)}
                    disabled={!canAfford}
                    style={{
                      background: canAfford 
                        ? 'linear-gradient(135deg, #ffd700, #f59e0b)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      color: canAfford ? '#0f172a' : '#64748b',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      cursor: canAfford ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      width: '100%',
                      transition: 'transform 0.1s ease'
                    }}
                  >
                    {canAfford ? (
                      <> Einlösen ({r.price} Coins) </>
                    ) : (
                      <> Noch {r.price - userCoins} Coins fehlen </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Redeemed History */}
        {activeTab === 'redeemed' && (
          <div>
            {redeemedHistory.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#64748b', padding: '30px 0' }}>
                Noch keine Belohnungen freigeschaltet. Sammle Coins durch deine Habits!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {redeemedHistory.map((item, idx) => (
                  <div 
                    key={idx} 
                    style={{
                      background: 'rgba(34, 197, 94, 0.08)',
                      border: '1px solid rgba(34, 197, 94, 0.25)',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#4ade80', fontSize: '0.98rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>Freigeschaltet am {item.redeemedAt}</div>
                    </div>
                    <div style={{ color: '#ffd700', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Coins size={14} /> -{item.price} Coins
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Create New Reward */}
        {activeTab === 'add' && (
          <form onSubmit={handleCreateReward} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Titel der Belohnung</label>
              <input
                type="text"
                placeholder="z.B. 1 Std Sauna / Neues Videospiel"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  outline: 'none',
                  fontSize: '0.95rem'
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Preis in Coins</label>
                <input
                  type="number"
                  min="10"
                  step="10"
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Kategorie</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                >
                  <option value="gaming">🎮 Gaming & Zocken</option>
                  <option value="leisure">🍿 Freizeit & Entspannung</option>
                  <option value="food">🍔 Food & Cheat Meal</option>
                  <option value="growth">📚 Lernen & Wachstum</option>
                  <option value="reward">🎁 Sachbelohnung / Gadget</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Beschreibung / Motivation</label>
              <textarea
                placeholder="Warum hast du dir diese Belohnung verdient?"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  outline: 'none',
                  fontSize: '0.95rem',
                  resize: 'none'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #38bdf8, #0284c7)',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Belohnung Speichern
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

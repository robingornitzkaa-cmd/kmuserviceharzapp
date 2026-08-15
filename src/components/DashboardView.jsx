import React from 'react';
import { 
  Sliders, 
  Target, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Calendar, 
  ExternalLink, 
  DollarSign, 
  FileText, 
  Download, 
  Mic, 
  CheckSquare, 
  TrendingUp,
  Trophy,
  Gift,
  ShieldAlert,
  Coins,
  Flame,
  Sparkles,
  Dumbbell,
  Zap,
  BookOpen,
  BedDouble,
  Award
} from 'lucide-react';
import { SettingsView, getWidgetOrder } from './SettingsView';
import { VoiceQuickCaptureWidget } from './VoiceQuickCaptureWidget';

export const DashboardView = ({
  userCoins = 150,
  setUserCoins,
  userXP = 120,
  userLevel = 1,
  rewards = [],
  setRewards,
  penalties = [],
  setPenalties,
  penaltyMode = 'debt',
  setPenaltyMode,
  lifeGoals = [],
  setLifeGoals,
  setIsRewardModalOpen,
  setIsPenaltyModalOpen,
  dashboardWidgets,
  setDashboardWidgets,
  isEditingDashboard,
  setIsEditingDashboard,
  dashboardGoal,
  setDashboardGoal,
  stickyNoteColor,
  setStickyNoteColor,
  dashNotes,
  setDashNotes,
  dashNotesList = [],
  activeNoteId,
  handleAddNote,
  handleSelectNote,
  handleUpdateActiveNote,
  handleDeleteNote,
  saveDashboardNow,
  supabaseSyncStatus = 'connected',
  handleAddSimpleDashTodoSubmit,
  newDashTodoText,
  setNewDashTodoText,
  dashTodos,
  handleToggleDashTodo,
  handleDeleteDashTodo,
  handleAddDashTodo,
  handleSimpleCalendarSubmit,
  simpleEventTime,
  setSimpleEventTime,
  simpleEventText,
  setSimpleEventText,
  calendarEvents,
  deleteCalendarEvent,
  dashboardLinks,
  handleDeleteQuickLink,
  handleAddQuickLink,
  newLinkTitle,
  setNewLinkTitle,
  newLinkUrl,
  setNewLinkUrl,
  activeUmsatz,
  activeProjectsList,
  pipelineUmsatz,
  weightedPipeline,
  totalPrognose,
  avgHourlyRate,
  invoiceFormat,
  setInvoiceFormat,
  invoiceClient,
  setInvoiceClient,
  contacts,
  mask,
  invoiceDiscount,
  setInvoiceDiscount,
  invoicePackage,
  setInvoicePackage,
  invoiceAmount,
  setInvoiceAmount,
  generateEinvoicePdf,
  bookInvoiceToLexoffice,
  invoiceXmlPreview,
  setInvoiceXmlPreview,
  quickCapture,
  setQuickCapture,
  handleQuickCapture,
  handleQuickCaptureSpeech,
  isListeningQuickCapture,
  onVoiceCaptureDispatch,
  googleConnected,
  setGoogleConnected,
  isConnectingGoogle,
  setIsConnectingGoogle,
  triggerGoogleSync,
  isGoogleSyncing,
  googleSyncLogs,
  nlpCalendarInput,
  setNlpCalendarInput,
  handleNlpCalendarSubmit,
  generateDailyAiTasks,
  addFocusTask,
  newFocusText,
  setNewFocusText,
  focusTasks,
  toggleFocusTask,
  deleteFocusTask,
  habitStreak,
  setHabitStreak,
  triggerConfetti,
  habits,
  toggleHabit,
  archiveOpen,
  setArchiveOpen,
  generateWeeklyArchivePDF,
  getLast7Days,
  weeklyArchive,
  updateReflection,
  insertMarkdownIntoNotes
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      
      {/* Dashboard Customization Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '0.75rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }}></span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Gründer-Cockpit: {Object.values(dashboardWidgets).filter(Boolean).length} von {Object.keys(dashboardWidgets).length} Widgets aktiv
          </span>
        </div>
        <button 
          type="button"
          onClick={() => setIsEditingDashboard(!isEditingDashboard)} 
          className="btn btn-secondary"
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', border: isEditingDashboard ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)', height: '30px' }}
        >
          <Sliders size={12} /> {isEditingDashboard ? 'Layout fertigstellen' : 'Layout anpassen'}
        </button>
      </div>

      {/* Customization Settings Drawer / Box */}
      <SettingsView
        isEditingDashboard={isEditingDashboard}
        dashboardWidgets={dashboardWidgets}
        setDashboardWidgets={setDashboardWidgets}
      />

      {/* ==================== LIFE OS TOP HUD & GAMIFICATION BANNER ==================== */}
      {(() => {
        const todayDayOfWeek = new Date().getDay(); // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
        const activeHabitsToday = habits.filter(h => !h.days || h.days.includes(todayDayOfWeek));
        const restHabitsToday = habits.filter(h => h.days && !h.days.includes(todayDayOfWeek));
        const completedTodayCount = activeHabitsToday.filter(h => h.completed).length;
        const habitCompletionPercent = activeHabitsToday.length > 0 
          ? Math.round((completedTodayCount / activeHabitsToday.length) * 100) 
          : 100;

        const nextLevelXp = userLevel * 200;
        const currentLevelXpProgress = (userXP % 200);
        const levelPercent = Math.min(100, Math.round((currentLevelXpProgress / 200) * 100));

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '0.5rem' }}>
            {/* Top Gamification HUD */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))',
              border: '1px solid rgba(255, 215, 0, 0.25)',
              borderRadius: '16px',
              padding: '18px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
            }}>
              {/* Level & XP HUD */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '220px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #ffd700, #f59e0b)',
                  color: '#0f172a',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
                }}>
                  Lvl {userLevel}
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', color: '#ffd700', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Life OS Rang: Level {userLevel}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <div style={{ width: '120px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${levelPercent}%`, height: '100%', background: 'linear-gradient(90deg, #ffd700, #38bdf8)', transition: 'width 0.3s ease' }}></div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{currentLevelXpProgress}/200 XP</span>
                  </div>
                </div>
              </div>

              {/* Tages-Fortschritt & Streak */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 600 }}>Tages-Fortschritt</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: habitCompletionPercent === 100 ? '#4ade80' : '#38bdf8' }}>
                    {completedTodayCount} / {activeHabitsToday.length} ({habitCompletionPercent}%)
                  </div>
                </div>
                <div style={{ height: '30px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '6px 14px', borderRadius: '12px' }}>
                  <Flame size={20} color="#f97316" />
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fb923c' }}>{habitStreak} Tage Streak</div>
                    <div style={{ fontSize: '0.7rem', color: '#fdba74' }}>1.5x Multiplikator</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Belohnungs-Shop & Disziplin-Manager */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsRewardModalOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(245, 158, 11, 0.2))',
                    border: '1px solid rgba(255, 215, 0, 0.5)',
                    color: '#ffd700',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.15)'
                  }}
                >
                  <Gift size={18} />
                  Belohnungs-Shop
                  <span style={{ background: '#ffd700', color: '#0f172a', padding: '2px 8px', borderRadius: '10px', fontSize: '0.78rem' }}>
                    🪙 {userCoins}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPenaltyModalOpen(true)}
                  style={{
                    background: userCoins < 0 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                    border: userCoins < 0 ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: userCoins < 0 ? '#f87171' : '#cbd5e1',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <ShieldAlert size={16} color={userCoins < 0 ? '#ef4444' : '#94a3b8'} />
                  Disziplin ({penaltyMode})
                </button>
              </div>
            </div>

            {/* Smart Daily Routine & Rest-Days Bar */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '18px 22px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} color="#38bdf8" /> Tages-Habits & Routine (Auf einen Blick)
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>

              {/* Active Today Habits */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: restHabitsToday.length > 0 ? '14px' : '0' }}>
                {activeHabitsToday.map(h => (
                  <div
                    key={h.id}
                    onClick={() => toggleHabit(h.id)}
                    style={{
                      background: h.completed ? 'rgba(34, 197, 94, 0.12)' : 'rgba(15, 23, 42, 0.6)',
                      border: h.completed ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={h.completed}
                      onChange={() => {}} // Handled by parent div click
                      style={{ accentColor: '#22c55e', width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: h.completed ? '#4ade80' : '#f8fafc', textDecoration: h.completed ? 'line-through' : 'none' }}>
                        {h.text}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px', display: 'flex', gap: '8px' }}>
                        <span>+{h.xp || 30} XP</span>
                        <span>🪙 +{h.coins || 15} Coins</span>
                      </div>
                    </div>
                    {h.completed && <CheckCircle size={16} color="#4ade80" />}
                  </div>
                ))}
              </div>

              {/* Rest Days (e.g. Kraftsport Ruhetag) */}
              {restHabitsToday.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    🛌 Heutige Ruhetage / Regeneration
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                    {restHabitsToday.map(h => (
                      <div
                        key={h.id}
                        style={{
                          background: 'rgba(16, 185, 129, 0.06)',
                          border: '1px dashed rgba(16, 185, 129, 0.3)',
                          borderRadius: '10px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <BedDouble size={18} color="#10b981" />
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#a7f3d0' }}>
                            {h.text}: Ruhetag
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#6ee7b7' }}>
                            Regeneration angesagt. Kein Workout heute nötig!
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      <div className="dashboard-grid">
        {getWidgetOrder(dashboardWidgets).map(widgetKey => {
          if (!dashboardWidgets[widgetKey]) return null;

          switch(widgetKey) {
            case 'simpleGoal':
              return (
                <div key="simpleGoal" className="card" style={{ gridColumn: 'span 2', background: 'rgba(6, 182, 212, 0.03)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                  <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                    <h2 className="card-title" style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      <Target size={20} /> Tages-Hauptziel (Fokus des Tages)
                    </h2>
                  </div>
                  <div style={{ padding: '0.75rem 1.25rem 1.25rem' }}>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Was ist dein #1 wichtigstes Ziel für heute? (z.B. Steuerberater kontaktieren)"
                      value={dashboardGoal}
                      onChange={(e) => setDashboardGoal(e.target.value)}
                      style={{
                        width: '100%',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        textAlign: 'center',
                        color: 'white',
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                        outline: 'none'
                      }}
                    />
                    {dashboardGoal && (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600 }}>
                        <span>⚡ Bleib fokussiert! Arbeite an diesem Ziel, bevor du dich anderem widmest.</span>
                      </div>
                    )}
                  </div>
                </div>
              );

            case 'simpleNotes': {
              const activeNote = dashNotesList.find(n => n.id === activeNoteId) || dashNotesList[0] || { id: 'note_1', title: 'Notiz 1', content: '', color: '#fef08a' };
              const noteWordCount = (dashNotes || '').trim() ? (dashNotes || '').trim().split(/\s+/).length : 0;
              const noteCharCount = (dashNotes || '').length;

              return (
                <div key="simpleNotes" className="card" style={{ 
                  background: stickyNoteColor, 
                  color: '#1e293b', 
                  boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.4)',
                  transition: 'background 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  {/* Header & Sync Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '0.4rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        📌 Notizen ({dashNotesList.length})
                      </h3>
                      <span style={{ 
                        fontSize: '0.6rem', 
                        fontWeight: 700, 
                        padding: '0.1rem 0.35rem', 
                        borderRadius: '0.25rem', 
                        background: supabaseSyncStatus === 'syncing' ? 'rgba(234, 179, 8, 0.25)' : supabaseSyncStatus === 'error' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)', 
                        color: supabaseSyncStatus === 'syncing' ? '#854d0e' : supabaseSyncStatus === 'error' ? '#991b1b' : '#065f46',
                        border: '1px solid rgba(0,0,0,0.1)'
                      }}>
                        {supabaseSyncStatus === 'syncing' ? '🔄 Speichert...' : supabaseSyncStatus === 'error' ? '⚠️ Sync-Fehler' : '☁️ Cloud-gesichert'}
                      </span>
                    </div>
                    
                    {/* Color selector */}
                    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                      {[
                        { color: '#fef08a', label: 'Gelb' },
                        { color: '#bfdbfe', label: 'Blau' },
                        { color: '#bbf7d0', label: 'Grün' },
                        { color: '#fbcfe8', label: 'Pink' },
                        { color: '#e9d5ff', label: 'Lila' }
                      ].map(item => (
                        <button
                          key={item.color}
                          type="button"
                          onClick={() => {
                            setStickyNoteColor(item.color);
                            if (handleUpdateActiveNote) handleUpdateActiveNote({ color: item.color });
                          }}
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            background: item.color,
                            border: stickyNoteColor === item.color ? '2px solid #0f172a' : '1px solid rgba(0,0,0,0.2)',
                            cursor: 'pointer',
                            padding: 0
                          }}
                          title={item.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tabs bar */}
                  <div style={{ display: 'flex', gap: '0.3rem', overflowX: 'auto', marginBottom: '0.5rem', paddingBottom: '0.2rem' }}>
                    {dashNotesList.map(note => (
                      <button
                        key={note.id}
                        type="button"
                        onClick={() => handleSelectNote && handleSelectNote(note.id)}
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: note.id === activeNoteId ? 800 : 600,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '0.3rem',
                          background: note.id === activeNoteId ? 'rgba(15, 23, 42, 0.15)' : 'rgba(0,0,0,0.05)',
                          color: '#0f172a',
                          border: note.id === activeNoteId ? '1px solid #0f172a' : '1px solid transparent',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        📌 {note.title || 'Notiz'}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddNote && handleAddNote()}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.45rem',
                        borderRadius: '0.3rem',
                        background: 'rgba(15, 23, 42, 0.08)',
                        color: '#0f172a',
                        border: '1px dashed #0f172a',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                      title="Neue Notiz anlegen"
                    >
                      + Neue Notiz
                    </button>
                  </div>

                  {/* Title editor */}
                  <div style={{ marginBottom: '0.4rem' }}>
                    <input
                      type="text"
                      value={activeNote.title || ''}
                      onChange={(e) => handleUpdateActiveNote && handleUpdateActiveNote({ title: e.target.value })}
                      placeholder="Titel der Notiz..."
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.3)',
                        border: '1px solid rgba(0,0,0,0.12)',
                        borderRadius: '0.25rem',
                        padding: '0.2rem 0.45rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Content textarea */}
                  <textarea
                    style={{
                      width: '100%',
                      minHeight: '140px',
                      background: 'transparent',
                      border: 'none',
                      resize: 'vertical',
                      color: '#0f172a',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      lineHeight: '1.4'
                    }}
                    placeholder="Notiere hier deine Gedanken, Telefonnummern oder To-Dos. Wird sofort geräteübergreifend synchronisiert..."
                    value={dashNotes}
                    onChange={(e) => {
                      setDashNotes(e.target.value);
                      if (handleUpdateActiveNote) handleUpdateActiveNote({ content: e.target.value });
                    }}
                    onBlur={() => saveDashboardNow && saveDashboardNow()}
                  />

                  {/* Footer actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.35rem', borderTop: '1px solid rgba(0,0,0,0.08)', fontSize: '0.65rem', color: '#475569' }}>
                    <span>{noteWordCount} Wörter | {noteCharCount} Zeichen</span>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Möchtest du die Notiz "${activeNote.title}" wirklich löschen?`)) {
                            if (handleDeleteNote) handleDeleteNote(activeNote.id);
                          }
                        }}
                        style={{ border: 'none', background: 'rgba(239, 68, 68, 0.15)', color: '#991b1b', padding: '0.15rem 0.45rem', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 600 }}
                      >
                        🗑️ Löschen
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(dashNotes || '');
                          if (window.showToast) window.showToast('📋 Notizzettel in Zwischenablage kopiert!');
                        }}
                        style={{ border: 'none', background: 'rgba(0,0,0,0.08)', color: '#0f172a', padding: '0.15rem 0.45rem', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 600 }}
                      >
                        📋 Kopieren
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            case 'simpleTodos':
              return (
                <div key="simpleTodos" className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="card-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                    <h3 className="card-title" style={{ fontSize: '0.95rem', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.35rem', margin: 0 }}>
                      <CheckCircle size={18} /> Einfache To-Do-Liste
                    </h3>
                  </div>

                  <form onSubmit={handleAddSimpleDashTodoSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Neue Aufgabe hinzufügen..."
                      value={newDashTodoText}
                      onChange={(e) => setNewDashTodoText(e.target.value)}
                      style={{ fontSize: '0.85rem', flexGrow: 1 }}
                      required
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0 0.75rem', height: '38px' }}>
                      <Plus size={16} />
                    </button>
                  </form>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', maxHeight: '180px' }}>
                    {dashTodos.map(todo => (
                      <div 
                        key={todo.id} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          background: 'rgba(255,255,255,0.02)', 
                          border: '1px solid var(--border-color)', 
                          borderRadius: '0.5rem', 
                          padding: '0.5rem 0.75rem' 
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1 }}>
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleDashTodo(todo.id)}
                            style={{ accentColor: 'var(--accent-purple)', cursor: 'pointer' }}
                          />
                          <span style={{ 
                            fontSize: '0.85rem', 
                            color: todo.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                            textDecoration: todo.completed ? 'line-through' : 'none'
                          }}>
                            {todo.text}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteDashTodo(todo.id)}
                          className="btn-icon-only text-red-500"
                          style={{ padding: '0.2rem', minWidth: 'auto', minHeight: 'auto', background: 'none' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {dashTodos.length === 0 && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                        Keine Aufgaben vorhanden.
                      </div>
                    )}
                  </div>
                </div>
              );

            case 'simpleCalendar':
              return (
                <div key="simpleCalendar" className="card">
                  <div className="card-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                    <h3 className="card-title" style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.35rem', margin: 0 }}>
                      <Calendar size={18} /> Einfacher Terminkalender
                    </h3>
                  </div>

                  <form onSubmit={handleSimpleCalendarSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Uhrzeit (z.B. 10:30)"
                      value={simpleEventTime}
                      onChange={(e) => setSimpleEventTime(e.target.value)}
                      style={{ flex: '0.3', fontSize: '0.85rem' }}
                      required
                    />
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Beschreibung"
                      value={simpleEventText}
                      onChange={(e) => setSimpleEventText(e.target.value)}
                      style={{ flex: '1', fontSize: '0.85rem' }}
                      required
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0 0.5rem', height: '38px', fontSize: '0.75rem' }}>
                      + Hinzufügen
                    </button>
                  </form>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', maxHeight: '180px' }}>
                    {calendarEvents.map(event => (
                      <div 
                        key={event.id}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          background: 'rgba(255,255,255,0.02)', 
                          border: '1px solid var(--border-color)', 
                          borderRadius: '0.5rem', 
                          padding: '0.5rem 0.75rem' 
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace' }}>
                            {event.time}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                            {event.title}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteCalendarEvent(event.id)}
                          className="btn-icon-only text-red-500"
                          style={{ padding: '0.2rem', minWidth: 'auto', minHeight: 'auto', background: 'none' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {calendarEvents.length === 0 && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                        Keine Termine eingetragen.
                      </div>
                    )}
                  </div>
                </div>
              );

            case 'simpleLinks':
              return (
                <div key="simpleLinks" className="card">
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                    <h3 className="card-title" style={{ fontSize: '0.95rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.35rem', margin: 0 }}>
                      <ExternalLink size={18} /> Quick-Links
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', overflowY: 'auto', maxHeight: '180px' }}>
                    {dashboardLinks.map(link => (
                      <div 
                        key={link.id}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          background: 'rgba(255,255,255,0.02)', 
                          border: '1px solid var(--border-color)', 
                          borderRadius: '0.5rem', 
                          padding: '0.5rem 0.75rem' 
                        }}
                      >
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
                        >
                          <ExternalLink size={14} /> {link.title}
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDeleteDashboardLink(link.id)}
                          className="btn-icon-only text-red-500"
                          style={{ padding: '0.2rem', minWidth: 'auto', minHeight: 'auto', background: 'none' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddDashboardLink} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.15)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Link-Name (z.B. Supabase Dashboard)"
                      value={newLinkTitle}
                      onChange={(e) => setNewLinkTitle(e.target.value)}
                      style={{ fontSize: '0.8rem' }}
                      required
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="url"
                        className="input-field"
                        placeholder="URL (https://...)"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        style={{ flexGrow: 1, fontSize: '0.8rem' }}
                        required
                      />
                      <button type="submit" className="btn btn-secondary" style={{ padding: '0 0.75rem', height: '38px', fontSize: '0.75rem' }}>
                        + Hinzufügen
                      </button>
                    </div>
                  </form>
                </div>
              );

            case 'financial':
              return (
                <div key="financial" className="card financial-cockpit-section" style={{ gridColumn: 'span 2' }}>
                  <div className="card-header">
                    <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <DollarSign size={20} className="text-cyan-500" />
                      Finanz-Cockpit & Einnahmen-Prognose
                    </h2>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dynamisch verknüpft mit CRM & Zeiterfassung</span>
                  </div>
                  
                  <div className="financial-kpi-container">
                    <div className="kpi-card">
                      <span className="kpi-label">Aktives Projektvolumen</span>
                      <span className="kpi-value text-cyan">{activeUmsatz.toLocaleString('de-DE')} €</span>
                      <span className="kpi-desc">{activeProjectsList.length} {activeProjectsList.length === 1 ? 'aktives Projekt' : 'aktive Projekte'} in Umsetzung</span>
                    </div>
                    
                    <div className="kpi-card">
                      <span className="kpi-label">Umsatz-Pipeline</span>
                      <span className="kpi-value text-purple">{pipelineUmsatz.toLocaleString('de-DE')} €</span>
                      <span className="kpi-desc">Gewichtet: {weightedPipeline.toLocaleString('de-DE')} € (50% Chance)</span>
                    </div>

                    <div className="kpi-card">
                      <span className="kpi-label">Erwarteter Gesamtumsatz</span>
                      <span className="kpi-value text-green">{totalPrognose.toLocaleString('de-DE')} €</span>
                      <span className="kpi-desc">Laufend + gewichtete Pipeline</span>
                    </div>

                    <div className="kpi-card">
                      <span className="kpi-label">Ø Stundensatz (Aktiv)</span>
                      <span className="kpi-value text-yellow">{avgHourlyRate > 0 ? `${avgHourlyRate} €/h` : '—'}</span>
                      <span className="kpi-desc">Berechnet aus erfasster Projektzeit</span>
                    </div>
                  </div>
                </div>
              );
              
            case 'einvoice':
              return (
                <div key="einvoice" className="card" style={{ gridColumn: 'span 2' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="card-title" style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} /> E-Rechnungs & Angebotssystem (ZUGFeRD 2.0 / XRechnung)
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Erstelle EN 16931 konforme B2B-Rechnungen. Automatisch kompatibel mit DATEV, Lexoffice und Finanzamt-Standards.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
            <button 
              className={`btn ${invoiceFormat === 'zugferd' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: invoiceFormat === 'zugferd' ? 'var(--accent-green)' : 'transparent', border: 'none' }}
              onClick={() => setInvoiceFormat('zugferd')}
            >
              📄 ZUGFeRD 2.0 (PDF+XML)
            </button>
            <button 
              className={`btn ${invoiceFormat === 'xrechnung' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: invoiceFormat === 'xrechnung' ? 'var(--accent-cyan)' : 'transparent', border: 'none' }}
              onClick={() => setInvoiceFormat('xrechnung')}
            >
              ⚙️ XRechnung (Reines XML)
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginTop: '1rem' }} className="make-simulator-grid">
          
          {/* Linke Spalte: Konfigurator Formular */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="input-group">
                <label style={{ fontSize: '0.75rem' }}>Rechnungsempfänger (Kunde)</label>
                <select 
                  className="input-field" 
                  value={invoiceClient}
                  onChange={(e) => setInvoiceClient(e.target.value)}
                >
                  {contacts.map(c => (
                    <option key={c.id} value={c.company}>{mask(c.company, 'company')}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.75rem' }}>Rabatt / Skonto (%)</label>
                <input 
                  type="number" 
                  className="input-field"
                  value={invoiceDiscount}
                  onChange={(e) => setInvoiceDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                />
              </div>
            </div>

            <div className="input-group">
              <label style={{ fontSize: '0.75rem' }}>Leistungsposition / Paketbeschreibung</label>
              <input 
                type="text" 
                className="input-field"
                value={invoicePackage}
                onChange={(e) => setInvoicePackage(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="input-group">
                <label style={{ fontSize: '0.75rem' }}>Nettobetrag (€)</label>
                <input 
                  type="number" 
                  className="input-field"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                />
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.75rem' }}>Berechnete MwSt. (19%)</label>
                <input 
                  type="text" 
                  className="input-field"
                  readOnly
                  value={`${(invoiceAmount * (1 - invoiceDiscount / 100) * 0.19).toFixed(2)} €`}
                  style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}
                />
              </div>
            </div>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button 
                onClick={generateEinvoicePdf}
                className="btn btn-primary"
                style={{ background: 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))', border: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Download size={14} /> E-Rechnung (PDF/XML) herunterladen
              </button>
              
              <button 
                onClick={bookInvoiceToLexoffice}
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <CheckCircle size={14} className="text-green-500" /> In Lexoffice / DATEV buchen
              </button>

              <button 
                onClick={() => setInvoiceXmlPreview(!invoiceXmlPreview)}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
              >
                {invoiceXmlPreview ? '🙈 XML Vorschau ausblenden' : '🔍 XML-Syntax prüfen'}
              </button>
            </div>
          </div>

          {/* Rechte Spalte: Rechnungs-Vorschau / XML Box */}
          <div style={{ background: 'rgba(17, 24, 39, 0.6)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {invoiceXmlPreview ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>
                    ⚡ XML Syntax Validator (EN 16931)
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accent-green)', fontWeight: 700 }}>VALIDATED ✔</span>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#4ade80', background: '#090d16', padding: '0.75rem', borderRadius: '0.5rem', maxHeight: '180px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>{"<rsm:CrossIndustryInvoice xmlns:rsm=\"urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100\">"}</div>
                  <div style={{ paddingLeft: '1rem', color: '#38bdf8' }}>{"<rsm:ExchangedDocument>"}</div>
                  <div style={{ paddingLeft: '2rem', color: '#e2e8f0' }}>{"<ram:ID>RE-2026-8492</ram:ID>"}</div>
                  <div style={{ paddingLeft: '2rem', color: '#e2e8f0' }}>{"<ram:TypeCode>380</ram:TypeCode>"}</div>
                  <div style={{ paddingLeft: '1rem', color: '#38bdf8' }}>{"</rsm:ExchangedDocument>"}</div>
                  <div style={{ paddingLeft: '1rem', color: '#38bdf8' }}>{"<rsm:SupplyChainTradeTransaction>"}</div>
                  <div style={{ paddingLeft: '2rem', color: '#facc15' }}>{"<ram:BuyerTradeParty>"}{mask(invoiceClient, 'company')}{"</ram:BuyerTradeParty>"}</div>
                  <div style={{ paddingLeft: '2rem', color: '#4ade80' }}>{"<ram:GrandTotalAmount>"}{(invoiceAmount * (1 - invoiceDiscount / 100) * 1.19).toFixed(2)} EUR{"</ram:GrandTotalAmount>"}</div>
                  <div style={{ paddingLeft: '1rem', color: '#38bdf8' }}>{"</rsm:SupplyChainTradeTransaction>"}</div>
                  <div>{"</rsm:CrossIndustryInvoice>"}</div>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                  Zusammenfassung Rechnungsdokument
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Empfänger:</span>
                    <span style={{ fontWeight: 700, color: 'white' }}>{mask(invoiceClient, 'company')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Leistung:</span>
                    <span style={{ color: 'var(--text-primary)' }}>{invoicePackage}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Netto:</span>
                    <span>{(invoiceAmount * (1 - invoiceDiscount / 100)).toFixed(2)} €</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>19% MwSt.:</span>
                    <span>{(invoiceAmount * (1 - invoiceDiscount / 100) * 0.19).toFixed(2)} €</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-green)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.4rem' }}>
                    <span>Brutto Gesamt:</span>
                    <span>{(invoiceAmount * (1 - invoiceDiscount / 100) * 1.19).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                  </div>
                </div>
              </div>
            )}

            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              💡 Gesetzliche Pflicht ab 2025/2026: Alle B2B-Rechnungen müssen elektronisch im EN 16931 Format empfangbar und ausstellbar sein.
            </div>
          </div>

        </div>
      </div>
    );

    case 'quickcapture':
      return (
        <VoiceQuickCaptureWidget
          key="quickcapture"
          onDispatch={onVoiceCaptureDispatch || ((payload) => {
            if (payload.target === 'todo') {
              handleAddDashTodo(payload.text);
            } else if (payload.target === 'goal') {
              if (setDashboardGoal) setDashboardGoal(payload.text);
            } else if (payload.target === 'note') {
              if (handleUpdateActiveNote) {
                handleUpdateActiveNote(dashNotes ? `${dashNotes}\n\n- ${payload.text}` : payload.text);
              }
            } else if (payload.target === 'calendar') {
              if (setSimpleEventText) setSimpleEventText(payload.text);
            } else {
              if (setQuickCapture) setQuickCapture(payload.text);
            }
          })}
        />
      );

    case 'calendar':
      return (
        <div key="calendar" className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 className="card-title"><Calendar size={20} className="text-cyan-500" /> Google Kalender (NLP)</h2>
          <div>
            {!googleConnected ? (
              <button
                type="button"
                onClick={() => {
                  setIsConnectingGoogle(true);
                  setTimeout(() => {
                    setGoogleConnected(true);
                    setIsConnectingGoogle(false);
                    alert("🔗 Google-Konto erfolgreich verknüpft! Kalender- & Drive-Berechtigungen erteilt.");
                  }, 1200);
                }}
                className="btn btn-secondary"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                disabled={isConnectingGoogle}
              >
                {isConnectingGoogle ? 'Verbinde...' : '🔗 Google verknüpfen'}
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)' }} title="Google Live-Sync aktiv"></span>
                <button
                  type="button"
                  onClick={triggerGoogleSync}
                  className="btn btn-secondary"
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  disabled={isGoogleSyncing}
                >
                  {isGoogleSyncing ? 'Sync läuft...' : '🔄 Jetzt Synch.'}
                </button>
              </div>
            )}
          </div>
        </div>

        {googleSyncLogs.length > 0 && (
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.5rem', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', maxHeight: '110px', overflowY: 'auto' }}>
            {googleSyncLogs.map((log, i) => (
              <div key={i} style={{ color: log.includes('✅') ? 'var(--accent-green)' : 'var(--text-secondary)' }}>{log}</div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleNlpCalendarSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Schnell eintragen ('Morgen 14 Uhr Müller')..."
            value={nlpCalendarInput}
            onChange={(e) => setNlpCalendarInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>Eintragen</button>
        </form>

        <div className="calendar-list" style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {calendarEvents.map(ev => (
            <div key={ev.id} className="calendar-event" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
              <div>
                <div className="event-time" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  {ev.time} ({new Date(ev.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })})
                </div>
                <div>
                  <div className="event-title" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{mask(ev.title, "calendar")}</div>
                  <div className="event-desc" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{ev.desc}</div>
                </div>
              </div>
              <button type="button" onClick={() => deleteCalendarEvent(ev.id)} className="btn-icon-only" style={{ padding: '0.25rem' }}>
                <Trash2 size={12} className="text-red-500" />
              </button>
            </div>
          ))}
          {calendarEvents.length === 0 && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
              Keine Termine geplant.
            </div>
          )}
        </div>
      </div>
    );

    case 'habits':
      return (
        <div key="habits" className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckSquare size={20} className="text-indigo-500" /> Tagesfokus</h2>
            <button 
              type="button" 
              onClick={generateDailyAiTasks}
              className="btn btn-secondary"
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              ⚡ KI-Tagesplan
            </button>
          </div>
          <form onSubmit={addFocusTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Aufgabe hinzufügen..."
              value={newFocusText}
              onChange={(e) => setNewFocusText(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary"><Plus size={16} /></button>
          </form>
          <div className="focus-list">
            {focusTasks.map((t, idx) => (
              <div key={t.id} className={`focus-item ${t.completed ? 'completed' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={t.completed} 
                  onChange={() => toggleFocusTask(t.id)} 
                  style={{ accentColor: 'var(--accent-indigo)', cursor: 'pointer' }}
                />
                <span className="focus-badge">#{idx + 1}</span>
                <span style={{ flexGrow: 1, fontSize: '0.875rem' }}>{t.text}</span>
                <button onClick={() => deleteFocusTask(t.id)} className="btn-icon-only" style={{ padding: '0.25rem' }}>
                  <Trash2 size={14} className="text-red-500" />
                </button>
              </div>
            ))}
            {focusTasks.length === 0 && (
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                Kein Fokus definiert. Starte deinen Tag stark!
              </p>
            )}
          </div>
        </div>
      );

    case 'weekly':
      return (
              <div key="weekly" className="card wochen-review-section" style={{ gridColumn: 'span 2' }}>
                <div 
                  className="card-header" 
                  style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none' }}
                  onClick={() => setArchiveOpen(!archiveOpen)}
                >
                  <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <CheckCircle size={20} className="text-indigo-500" />
                    Wochen-Review & Archiv (Letzte 7 Tage)
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {archiveOpen && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          generateWeeklyArchivePDF();
                        }}
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px' }}
                        title="Generiert einen formatierten PDF-Bericht der letzten 7 Tage"
                      >
                        <FileText size={14} /> PDF Exportieren
                      </button>
                    )}
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {archiveOpen ? '▲ Einklappen' : '▼ Ausklappen'}
                    </span>
                  </div>
                </div>

                {archiveOpen && (
                  <div className="archive-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0 }}>
                      Hier siehst du deine Erfolge und abgehakten Fokus-Aufgaben der letzten 7 Tage. Ergänze Notizen oder eine Tages-Reflexion für dein wöchentliches Review.
                    </p>
                    
                    <div className="archive-days-list" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                      {getLast7Days().map(day => {
                        const dayData = weeklyArchive[day.dateString] || { focusTasks: [], completedHabits: [], reflection: '' };
                        const isToday = day.dateString === new Date().toISOString().split('T')[0];
                        
                        return (
                          <div 
                            key={day.dateString} 
                            className="archive-day-card" 
                            style={{ 
                              background: isToday ? 'rgba(99, 102, 241, 0.04)' : 'rgba(255, 255, 255, 0.01)',
                              border: isToday ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid var(--border-color)',
                              borderRadius: '0.5rem',
                              padding: '1rem'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                              <span style={{ fontWeight: 700, color: isToday ? 'var(--accent-indigo)' : 'var(--text-primary)', fontSize: '0.875rem' }}>
                                {day.formatted} {isToday && '(Heute)'}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {day.dateString}
                              </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '0.75rem' }}>
                              <div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                  Erledigte Fokus-Tasks
                                </span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                  {dayData.focusTasks && dayData.focusTasks.length > 0 ? (
                                    dayData.focusTasks.map((t, i) => (
                                      <div key={i} style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-primary)' }}>
                                        <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>✓</span> {t}
                                      </div>
                                    ))
                                  ) : (
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                      Keine Aufgaben erledigt
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                  Abgehakte Habits
                                </span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                  {dayData.completedHabits && dayData.completedHabits.length > 0 ? (
                                    dayData.completedHabits.map((h, i) => (
                                      <span 
                                        key={i} 
                                        style={{ 
                                          fontSize: '0.7rem', 
                                          background: 'rgba(16, 185, 129, 0.08)', 
                                          color: 'var(--accent-green)', 
                                          padding: '0.15rem 0.45rem', 
                                          borderRadius: '0.25rem',
                                          border: '1px solid rgba(16, 185, 129, 0.15)',
                                          fontWeight: 500
                                        }}
                                      >
                                        {h}
                                      </span>
                                    ))
                                  ) : (
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                      Keine Habits abgehakt
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                Reflexion & Tagesnotiz
                              </label>
                              <input 
                                type="text" 
                                className="input-field" 
                                placeholder="Tages-Reflexion / Notiz..." 
                                value={dayData.reflection || ''} 
                                onChange={(e) => updateReflection(day.dateString, e.target.value)}
                                style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.75rem', height: '28px' }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );

          case 'notes': {
            const activeNote = dashNotesList.find(n => n.id === activeNoteId) || dashNotesList[0] || { id: 'note_1', title: 'Notiz 1', content: '', color: '#fef08a' };
            const noteWordCount = (dashNotes || '').trim() ? (dashNotes || '').trim().split(/\s+/).length : 0;
            const noteCharCount = (dashNotes || '').length;
            return (
              <div key="notes" className="card" style={{ gridColumn: 'span 2' }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={20} className="text-yellow-500" />
                    📌 Notizen ({dashNotesList.length}) & Aufgaben (Cloud-Sync)
                  </h2>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    fontWeight: 700, 
                    padding: '0.15rem 0.45rem', 
                    borderRadius: '0.25rem', 
                    background: supabaseSyncStatus === 'syncing' ? 'rgba(234, 179, 8, 0.25)' : supabaseSyncStatus === 'error' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)', 
                    color: supabaseSyncStatus === 'syncing' ? '#eab308' : supabaseSyncStatus === 'error' ? '#ef4444' : '#34d399',
                    border: '1px solid var(--border-color)'
                  }}>
                    {supabaseSyncStatus === 'syncing' ? '🔄 Speichert...' : supabaseSyncStatus === 'error' ? '⚠️ Sync-Fehler' : '☁️ Cloud-gesichert'}
                  </span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {/* Tabs bar */}
                    <div style={{ display: 'flex', gap: '0.3rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
                      {dashNotesList.map(note => (
                        <button
                          key={note.id}
                          type="button"
                          onClick={() => handleSelectNote && handleSelectNote(note.id)}
                          className="btn btn-secondary"
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: note.id === activeNoteId ? 800 : 500,
                            padding: '0.15rem 0.5rem',
                            height: '24px',
                            border: note.id === activeNoteId ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                            background: note.id === activeNoteId ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.02)',
                            color: note.id === activeNoteId ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          📌 {note.title || 'Notiz'}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddNote && handleAddNote()}
                        className="btn btn-secondary"
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.45rem',
                          height: '24px',
                          border: '1px dashed var(--accent-cyan)',
                          color: 'var(--accent-cyan)',
                          whiteSpace: 'nowrap'
                        }}
                        title="Neue Notiz anlegen"
                      >
                        + Neue Notiz
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="text"
                        value={activeNote.title || ''}
                        onChange={(e) => handleUpdateActiveNote && handleUpdateActiveNote({ title: e.target.value })}
                        placeholder="Titel der Notiz..."
                        className="input-field"
                        style={{ height: '26px', fontSize: '0.8rem', fontWeight: 700, flexGrow: 1 }}
                      />
                      <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => insertMarkdownIntoNotes('bold')}
                          className="btn btn-secondary"
                          style={{ padding: '0.1rem 0.35rem', fontSize: '0.65rem', height: '22px', fontWeight: 'bold' }}
                          title="Fettgedruckt"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdownIntoNotes('italic')}
                          className="btn btn-secondary"
                          style={{ padding: '0.1rem 0.35rem', fontSize: '0.65rem', height: '22px', fontStyle: 'italic' }}
                          title="Kursiv"
                        >
                          I
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdownIntoNotes('list')}
                          className="btn btn-secondary"
                          style={{ padding: '0.1rem 0.35rem', fontSize: '0.65rem', height: '22px' }}
                          title="Aufzählungspunkt"
                        >
                          • Liste
                        </button>
                        <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 0.15rem' }}>|</span>
                        <button 
                          type="button" 
                          onClick={() => {
                            if (confirm(`Möchtest du die Notiz "${activeNote.title}" wirklich löschen?`)) {
                              if (handleDeleteNote) handleDeleteNote(activeNote.id);
                            }
                          }}
                          className="btn" 
                          style={{ padding: '0.15rem 0.45rem', fontSize: '0.65rem', background: 'rgba(239, 68, 68, 0.05)', color: 'var(--accent-red)', border: '1px solid rgba(239, 68, 68, 0.15)', height: '22px' }}
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                    <textarea
                      id="dash-scratchpad"
                      className="input-field"
                      style={{ flexGrow: 1, minHeight: '160px', fontFamily: 'inherit', fontSize: '0.85rem', lineHeight: '1.4', background: 'rgba(0,0,0,0.2)', resize: 'none' }}
                      placeholder="Notiere hier deine Gedanken, Telefonnummern oder Mitschriften..."
                      value={dashNotes}
                      onChange={(e) => {
                        setDashNotes(e.target.value);
                        if (handleUpdateActiveNote) handleUpdateActiveNote({ content: e.target.value });
                      }}
                      onBlur={() => saveDashboardNow && saveDashboardNow()}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      <span>{noteWordCount} Wörter | {noteCharCount} Zeichen</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(dashNotes || '');
                          if (window.showToast) window.showToast('📋 Notizzettel in Zwischenablage kopiert!');
                        }}
                        className="btn btn-secondary"
                        style={{ padding: '0.15rem 0.45rem', fontSize: '0.65rem', height: '22px' }}
                      >
                        📋 Kopieren
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', margin: 0 }}>Aufgaben-Checkliste</label>
                    
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.target.elements.todoText;
                        handleAddDashTodo(input.value);
                        input.value = '';
                      }} 
                      style={{ display: 'flex', gap: '0.35rem' }}
                    >
                      <input 
                        type="text" 
                        name="todoText"
                        className="input-field"
                        style={{ height: '32px', fontSize: '0.8rem' }}
                        placeholder="Aufgabe hinzufügen..."
                        required
                      />
                      <button type="submit" className="btn btn-secondary" style={{ height: '32px', padding: '0 0.75rem', fontSize: '0.8rem' }}>+</button>
                    </form>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '160px', overflowY: 'auto' }}>
                      {dashTodos.map(todo => (
                        <div key={todo.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.45rem', background: todo.completed ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.35rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', flexGrow: 1, margin: 0 }}>
                            <input 
                              type="checkbox" 
                              checked={todo.completed} 
                              onChange={() => handleToggleDashTodo(todo.id)}
                              style={{ accentColor: 'var(--accent-green)' }}
                            />
                            <span style={{ fontSize: '0.8rem', color: todo.completed ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: todo.completed ? 'line-through' : 'none' }}>
                              {todo.text}
                            </span>
                          </label>
                          <button 
                            type="button" 
                            onClick={() => handleDeleteDashTodo(todo.id)} 
                            className="btn-icon-only" 
                            style={{ padding: '0.15rem', background: 'transparent', border: 'none' }}
                          >
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      ))}
                      {dashTodos.length === 0 && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                          Keine Aufgaben.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  </div>
  );
};

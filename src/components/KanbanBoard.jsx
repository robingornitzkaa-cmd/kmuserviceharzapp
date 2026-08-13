import React from 'react';
import { 
  BrainCircuit, 
  Play, 
  Inbox, 
  ChevronRight, 
  Trash2, 
  CheckSquare, 
  Image as ImageIcon,
  Paperclip,
  Plus
} from 'lucide-react';

export const KanbanBoard = ({
  triggerWhatsAppSimulation,
  simMessage,
  setSimMessage,
  isSimulating,
  webhookUrl,
  setWebhookUrl,
  isOnline,
  simStep,
  inbox,
  mask,
  convertInboxToTask,
  deleteInboxItem,
  addNewTask,
  newTaskTitle,
  setNewTaskTitle,
  newTaskPriority,
  setNewTaskPriority,
  handleDragOver,
  handleDrop,
  tasks,
  handleDragStart,
  deleteTask,
  onOpenLightbox,
  onAttachToTask
}) => {
  const handleTaskFileUpload = (taskId, e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (onAttachToTask) {
          onAttachToTask(taskId, {
            name: file.name,
            type: file.type,
            dataUrl: event.target.result
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const renderTaskCard = (t, isDoneColumn = false) => (
    <div 
      key={t.id} 
      className="kanban-card" 
      style={{ opacity: isDoneColumn ? 0.6 : 1 }}
      draggable
      onDragStart={(e) => handleDragStart(e, t.id)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className={`card-priority ${isDoneColumn ? '' : `priority-${t.priority}`}`} style={isDoneColumn ? { background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)' } : {}}>
          {isDoneColumn ? 'erledigt' : t.priority}
        </span>
        <label title="Grafik / Persona anhängen" style={{ cursor: 'pointer', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--accent-cyan)' }}>
          <Paperclip size={12} />
          <input 
            type="file" 
            accept="image/*,.pdf" 
            style={{ display: 'none' }}
            onChange={(e) => handleTaskFileUpload(t.id, e)}
          />
        </label>
      </div>

      <div className="card-title-text" style={{ textDecoration: isDoneColumn ? 'line-through' : 'none', marginTop: '0.25rem' }}>
        {mask(t.title, 'inbox')}
      </div>

      {t.attachments && t.attachments.length > 0 && (
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', margin: '0.4rem 0' }}>
          {t.attachments.map((att, idx) => (
            <div 
              key={idx}
              onClick={() => onOpenLightbox && onOpenLightbox(att.dataUrl, att.name)}
              style={{ 
                fontSize: '0.65rem', 
                background: 'rgba(6, 182, 212, 0.12)', 
                color: 'var(--accent-cyan)', 
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '0.25rem',
                padding: '0.15rem 0.4rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem'
              }}
              title="Klick für Vollbild-Präsentation"
            >
              <ImageIcon size={10} />
              <span style={{ maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{att.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="card-meta">
        <span>{t.date}</span>
        <button onClick={() => deleteTask(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <Trash2 size={12} className="text-red-500" />
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Style override for simulation spinner */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}} />

      {/* The Inbox & WhatsApp Simulator Grid */}
      <div className="inbox-tasks-grid" style={{ marginBottom: '2rem' }}>
        
        {/* WhatsApp Simulator Card */}
        <div className="card" style={{ height: 'fit-content' }}>
          <div className="card-header">
            <h2 className="card-title" style={{ color: 'var(--accent-cyan)' }}>
              <BrainCircuit size={20} /> WhatsApp-Simulator
            </h2>
          </div>
          <form onSubmit={triggerWhatsAppSimulation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Simuliere live, wie eine WhatsApp-Sprachnachricht oder Textnachricht deines Teams im System empfangen und strukturiert wird.
            </p>
            
            <div className="input-group">
              <label>Simulierte Nachricht</label>
              <textarea 
                className="input-field"
                rows={3}
                value={simMessage}
                onChange={(e) => setSimMessage(e.target.value)}
                disabled={isSimulating}
                required
              />
            </div>

            <div className="input-group">
              <label>Make Webhook URL (Optional)</label>
              <input 
                type="url"
                placeholder="https://hook.us2.make.com/..."
                className="input-field"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                disabled={isSimulating}
              />
              <span style={{ fontSize: '0.65rem', color: isOnline ? 'var(--text-muted)' : '#fbbf24', marginTop: '0.25rem', display: 'block' }}>
                {isOnline 
                  ? 'Trage deine Make-Webhook-URL ein, um echte HTTP-POST-Daten live an dein Make-Szenario zu senden!'
                  : '⚠️ Du bist offline. Der Make-Webhook kann momentan nicht aufgerufen werden.'
                }
              </span>
            </div>

            {/* Simulations-Status / Loader */}
            {isSimulating && (
              <div style={{ 
                background: 'rgba(6, 182, 212, 0.05)', 
                border: '1px dashed rgba(6, 182, 212, 0.3)', 
                borderRadius: '0.5rem', 
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <div className="loading-spinner" style={{ 
                  width: '20px', 
                  height: '20px', 
                  border: '2px solid rgba(6, 182, 212, 0.2)', 
                  borderTopColor: 'var(--accent-cyan)', 
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                  {simStep === 'whisper' && 'Whisper: Transkribiere Audio...'}
                  {simStep === 'gpt' && 'GPT-4: Extrahiere Daten & buche...'}
                </span>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSimulating}
              style={{ 
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))',
                boxShadow: 'var(--shadow-glow-cyan)'
              }}
            >
              <Play size={16} /> WhatsApp verarbeiten
            </button>
          </form>
        </div>

        {/* The Inbox List */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title"><Inbox size={20} className="text-purple-500" /> Die Inbox ({inbox.length} unkategorisierte Belege)</h2>
          </div>
          <div className="inbox-list" style={{ gridTemplateColumns: '1fr', maxHeight: '420px', overflowY: 'auto', gap: '0.75rem' }}>
            {inbox.map(item => (
              <div key={item.id} className="inbox-item" style={{ background: 'rgba(255,255,255,0.01)' }}>
                <div className="inbox-content" style={{ fontSize: '0.825rem' }}>{mask(item.text, 'inbox')}</div>
                <div className="inbox-footer" style={{ marginTop: '0.5rem' }}>
                  <span>Erfasst am {item.date}</span>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button 
                      onClick={() => convertInboxToTask(item)} 
                      className="btn btn-secondary" 
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                    >
                      Zu Aufgabe <ChevronRight size={10} />
                    </button>
                    <button 
                      onClick={() => deleteInboxItem(item.id)} 
                      className="btn-icon-only"
                      style={{ padding: '0.25rem' }}
                    >
                      <Trash2 size={12} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {inbox.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Glueckwunsch! Deine Inbox ist leer. Nutze den WhatsApp-Simulator oder Quick Capture.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Kanban Board */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="card-title"><CheckSquare size={20} className="text-indigo-500" /> Kanban-Board</h2>
          
          {/* Schnell-Erstellung Task */}
          <form onSubmit={addNewTask} style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Neue Aufgabe..." 
              className="input-field" 
              style={{ width: '200px' }}
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <select 
              className="input-field" 
              style={{ width: '120px' }}
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
            >
              <option value="high">Hoch</option>
              <option value="medium">Mittel</option>
              <option value="low">Niedrig</option>
            </select>
            <button type="submit" className="btn btn-primary"><Plus size={16} /></button>
          </form>
        </div>

        <div className="kanban-board">
          {/* Column: Idee/Später */}
          <div 
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'idea')}
          >
            <div className="column-header">
              <span className="column-title">Idee / Später</span>
              <span className="column-count">{tasks.filter(t => t.column === 'idea').length}</span>
            </div>
            <div className="kanban-cards">
              {tasks.filter(t => t.column === 'idea').map(t => renderTaskCard(t))}
            </div>
          </div>

          {/* Column: To Do */}
          <div 
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'todo')}
          >
            <div className="column-header">
              <span className="column-title">To Do</span>
              <span className="column-count">{tasks.filter(t => t.column === 'todo').length}</span>
            </div>
            <div className="kanban-cards">
              {tasks.filter(t => t.column === 'todo').map(t => renderTaskCard(t))}
            </div>
          </div>

          {/* Column: In Arbeit */}
          <div 
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'inprogress')}
          >
            <div className="column-header">
              <span className="column-title">In Arbeit</span>
              <span className="column-count">{tasks.filter(t => t.column === 'inprogress').length}</span>
            </div>
            <div className="kanban-cards">
              {tasks.filter(t => t.column === 'inprogress').map(t => renderTaskCard(t))}
            </div>
          </div>

          {/* Column: Erledigt */}
          <div 
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'done')}
          >
            <div className="column-header">
              <span className="column-title">Erledigt</span>
              <span className="column-count">{tasks.filter(t => t.column === 'done').length}</span>
            </div>
            <div className="kanban-cards">
              {tasks.filter(t => t.column === 'done').map(t => renderTaskCard(t, true))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

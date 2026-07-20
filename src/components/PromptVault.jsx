import React from 'react';
import { 
  BrainCircuit, 
  Plus, 
  ClipboardCopy, 
  Trash2, 
  TrendingUp, 
  Send 
} from 'lucide-react';

export const PromptVault = ({
  showGeminiConfig,
  setShowGeminiConfig,
  geminiApiKey,
  setGeminiApiKey,
  newPrompt,
  setNewPrompt,
  handleAddPrompt,
  handleOptimizePrompt,
  ollamaLoading,
  customPromptBlocks,
  handleDeleteCustomPromptBlock,
  showCustomBlockForm,
  setShowCustomBlockForm,
  newBlockName,
  setNewBlockName,
  newBlockCategory,
  setNewBlockCategory,
  newBlockContent,
  setNewBlockContent,
  handleAddCustomPromptBlock,
  promptSearch,
  setPromptSearch,
  promptCategoryFilter,
  setPromptCategoryFilter,
  prompts,
  copyPromptText,
  deletePrompt,
  newPost,
  setNewPost,
  handleAddPost,
  contentPosts,
  deletePost,
  ragPersona,
  setRagPersona,
  ragInput,
  setRagInput,
  ragGenerating,
  ragChat,
  handleSendRagQuery
}) => {
  return (
    <div className="hub-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
      
      {/* Prompt Vault */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', margin: 0 }}>
            <BrainCircuit size={20} className="text-purple-500" /> Prompt Vault (KI-Tresor)
          </h2>
          <button
            type="button"
            onClick={() => setShowGeminiConfig(!showGeminiConfig)}
            className="btn btn-secondary"
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.65rem', height: '22px' }}
          >
            {showGeminiConfig ? 'Schließen' : '⚙ KI-Einstellungen'}
          </button>
        </div>

        {/* Gemini Settings Form */}
        {showGeminiConfig && (
          <div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px dashed var(--accent-purple)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-purple)' }}>Gemini API-Schlüssel & Modell-Optionen</div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="password"
                placeholder="Gemini API Key..."
                className="input-field"
                style={{ height: '30px', fontSize: '0.75rem', flex: 1 }}
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  setGeminiApiKey('');
                  alert('API-Schlüssel gelöscht! Bitte gib deinen eigenen Schlüssel ein.');
                }}
                className="btn btn-secondary"
                style={{ height: '30px', fontSize: '0.7rem', padding: '0 0.5rem' }}
              >
                Reset Key
              </button>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              Dein API-Schlüssel wird lokal im Browser gesichert und nicht im GitHub-Quellcode geteilt.
            </span>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>Fallbacks:</span>
              {['gemini-3.1-flash-lite', 'gemini-3-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-flash', 'Ollama (Lokal)', 'Fallback-Template'].map((m, i) => (
                <span key={i} style={{ fontSize: '0.6rem', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                  {i + 1}. {m}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Prompt hinzufügen */}
        <form onSubmit={handleAddPrompt} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Titel des Prompts..." 
              className="input-field"
              value={newPrompt.title}
              onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
              required
            />
            <select 
              className="input-field" 
              style={{ width: '130px' }}
              value={newPrompt.category}
              onChange={(e) => setNewPrompt({ ...newPrompt, category: e.target.value })}
            >
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Code">Code</option>
              <option value="Strategie">Strategie</option>
            </select>
          </div>

          {/* Prompt-Baukasten */}
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              🧩 Prompt-Baukasten (Bausteine zum Einfügen)
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {/* Rollen */}
              <div>
                <div style={{ fontSize: '0.65rem', color: '#a78bfa', fontWeight: 700, marginBottom: '0.25rem' }}>Prefix (Rolle):</div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Marketing', text: 'Agiere als KMU-Marketing-Experte für den Harz. ' },
                    { label: 'SEO', text: 'Agiere als SEO- & Google-Ranking-Spezialist. ' },
                    { label: 'Copywriter', text: 'Agiere als Copywriting-Profi für Landingpages. ' },
                    { label: 'DSGVO Legal', text: 'Agiere als DSGVO- & Legal-Prüfer für KMUs. ' },
                    { label: 'Pitch Coach', text: 'Agiere als erfahrener Business- & Pitch-Coach. ' },
                    { label: 'Finanzen', text: 'Agiere als DATEV- & Finanzbuchhaltungsexperte. ' }
                  ].map((b, idx) => (
                    <button 
                      key={idx} 
                      type="button" 
                      className="tag" 
                      style={{ cursor: 'pointer', border: 'none', background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', fontSize: '0.65rem', padding: '0.2rem 0.45rem', borderRadius: '0.25rem' }}
                      onClick={() => setNewPrompt(prev => ({ ...prev, text: b.text + prev.text }))}
                    >
                      ➕ {b.label}
                    </button>
                  ))}

                  {/* Eigene Prefixes */}
                  {customPromptBlocks.filter(b => b.category === 'prefix').map(b => (
                    <div key={b.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.15rem', background: 'rgba(139, 92, 246, 0.25)', border: '1px solid rgba(139, 92, 246, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '0.25rem' }}>
                      <button
                        type="button"
                        style={{ border: 'none', background: 'transparent', color: '#a78bfa', fontSize: '0.65rem', padding: 0, cursor: 'pointer' }}
                        onClick={() => setNewPrompt(prev => ({ ...prev, text: b.content + prev.text }))}
                      >
                        ➕ {b.name}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomPromptBlock(b.id)}
                        style={{ border: 'none', background: 'transparent', color: 'var(--accent-red)', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.75rem', lineHeight: 1 }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tonalität */}
              <div>
                <div style={{ fontSize: '0.65rem', color: '#22d3ee', fontWeight: 700, marginBottom: '0.25rem' }}>Tonalität & Stil:</div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Locker & Du', text: '\nSchreibe in lockerem & nahbarem "Du"-Stil.' },
                    { label: 'Professionell', text: '\nFormuliere professionell, sachlich und fachbezogen.' },
                    { label: 'Prägnant', text: '\nSchreibe extrem prägnant, direkt und ohne Floskeln.' },
                    { label: 'Verkaufsstark', text: '\nNutze einen begeisternden, verkaufsstarken Werbeton.' }
                  ].map((b, idx) => (
                    <button 
                      key={idx} 
                      type="button" 
                      className="tag" 
                      style={{ cursor: 'pointer', border: 'none', background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', fontSize: '0.65rem', padding: '0.2rem 0.45rem', borderRadius: '0.25rem' }}
                      onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + b.text }))}
                    >
                      ➕ {b.label}
                    </button>
                  ))}

                  {/* Eigene Tonalitäten */}
                  {customPromptBlocks.filter(b => b.category === 'tone').map(b => (
                    <div key={b.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.15rem', background: 'rgba(6, 182, 212, 0.25)', border: '1px solid rgba(6, 182, 212, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '0.25rem' }}>
                      <button
                        type="button"
                        style={{ border: 'none', background: 'transparent', color: '#22d3ee', fontSize: '0.65rem', padding: 0, cursor: 'pointer' }}
                        onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + '\n' + b.content }))}
                      >
                        ➕ {b.name}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomPromptBlock(b.id)}
                        style={{ border: 'none', background: 'transparent', color: 'var(--accent-red)', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.75rem', lineHeight: 1 }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div>
                <div style={{ fontSize: '0.65rem', color: '#34d399', fontWeight: 700, marginBottom: '0.25rem' }}>Ausgabeformat:</div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Markdown Tabelle', text: '\nGib das Ergebnis als übersichtliche Markdown-Tabelle aus.' },
                    { label: 'Emoji Bulletpoints', text: '\nStrukturiere die Antwort in Bulletpoints mit passenden Emojis.' },
                    { label: 'Schritt-für-Schritt', text: '\nErstelle eine detaillierte Schritt-für-Schritt-Anleitung.' },
                    { label: 'JSON Format', text: '\nAntworte ausschließlich im validen JSON-Format.' }
                  ].map((b, idx) => (
                    <button 
                      key={idx} 
                      type="button" 
                      className="tag" 
                      style={{ cursor: 'pointer', border: 'none', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '0.65rem', padding: '0.2rem 0.45rem', borderRadius: '0.25rem' }}
                      onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + b.text }))}
                    >
                      ➕ {b.label}
                    </button>
                  ))}

                  {/* Eigene Formate */}
                  {customPromptBlocks.filter(b => b.category === 'format').map(b => (
                    <div key={b.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.15rem', background: 'rgba(16, 185, 129, 0.25)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '0.25rem' }}>
                      <button
                        type="button"
                        style={{ border: 'none', background: 'transparent', color: '#34d399', fontSize: '0.65rem', padding: 0, cursor: 'pointer' }}
                        onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + '\n' + b.content }))}
                      >
                        ➕ {b.name}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomPromptBlock(b.id)}
                        style={{ border: 'none', background: 'transparent', color: 'var(--accent-red)', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.75rem', lineHeight: 1 }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suffix / Action */}
              <div>
                <div style={{ fontSize: '0.65rem', color: '#fbbf24', fontWeight: 700, marginBottom: '0.25rem' }}>Suffix (Aufforderung):</div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { label: '3 Rückfragen', text: '\nStelle mir am Ende 3 vertiefende Rückfragen zur Präzisierung.' },
                    { label: 'Risikoanalyse', text: '\nFühre eine Risikoanalyse für die vorgeschlagene Lösung durch.' },
                    { label: '3 Alternativen', text: '\nGib mir 3 alternative Headlines oder Einstiegsformulierungen.' },
                    { label: 'Einfach erklärt', text: '\nErkläre es so einfach, als wäre ich 10 Jahre alt (ELI5).' }
                  ].map((b, idx) => (
                    <button 
                      key={idx} 
                      type="button" 
                      className="tag" 
                      style={{ cursor: 'pointer', border: 'none', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontSize: '0.65rem', padding: '0.2rem 0.45rem', borderRadius: '0.25rem' }}
                      onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + b.text }))}
                    >
                      ➕ {b.label}
                    </button>
                  ))}

                  {/* Eigene Suffixe */}
                  {customPromptBlocks.filter(b => b.category === 'suffix').map(b => (
                    <div key={b.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.15rem', background: 'rgba(251, 191, 36, 0.25)', border: '1px solid rgba(251, 191, 36, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '0.25rem' }}>
                      <button
                        type="button"
                        style={{ border: 'none', background: 'transparent', color: '#fbbf24', fontSize: '0.65rem', padding: 0, cursor: 'pointer' }}
                        onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + '\n' + b.content }))}
                      >
                        ➕ {b.name}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomPromptBlock(b.id)}
                        style={{ border: 'none', background: 'transparent', color: 'var(--accent-red)', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.75rem', lineHeight: 1 }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Eigene Bausteine verwalten Toggle Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowCustomBlockForm(!showCustomBlockForm)}
                className="btn btn-secondary"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.65rem', height: '22px' }}
              >
                {showCustomBlockForm ? 'Schließen' : '➕ Eigene Bausteine verwalten'}
              </button>
            </div>

            {/* Formular zum Erstellen eigener Bausteine */}
            {showCustomBlockForm && (
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--accent-purple)', borderRadius: '0.5rem', padding: '0.75rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-purple)' }}>Neuen Prompt-Baustein erstellen</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="input-field"
                    style={{ height: '30px', fontSize: '0.75rem' }}
                    placeholder="Baustein-Name (z.B. Marketing-Expert)"
                    value={newBlockName}
                    onChange={(e) => setNewBlockName(e.target.value)}
                  />
                  <select
                    className="input-field"
                    style={{ height: '30px', fontSize: '0.75rem', padding: '0.25rem' }}
                    value={newBlockCategory}
                    onChange={(e) => setNewBlockCategory(e.target.value)}
                  >
                    <option value="prefix">Rolle (Prefix)</option>
                    <option value="tone">Tonalität & Stil</option>
                    <option value="format">Ausgabeformat</option>
                    <option value="suffix">Aktion (Suffix)</option>
                  </select>
                </div>
                <textarea
                  className="input-field"
                  rows={2}
                  style={{ fontSize: '0.75rem' }}
                  placeholder="Inhalt des Bausteins (z.B. 'Agiere als erfahrener...')"
                  value={newBlockContent}
                  onChange={(e) => setNewBlockContent(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddCustomPromptBlock}
                  className="btn btn-primary"
                  style={{ height: '28px', padding: '0 0.5rem', fontSize: '0.75rem', width: 'fit-content', alignSelf: 'flex-end' }}
                >
                  Baustein speichern
                </button>
              </div>
            )}
          </div>

          <textarea 
            placeholder="Prompt Text..." 
            className="input-field" 
            rows={4}
            value={newPrompt.text}
            onChange={(e) => setNewPrompt({ ...newPrompt, text: e.target.value })}
            required
          />
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem' }}>
              <Plus size={16} /> Prompt sichern
            </button>
            <button 
              type="button" 
              onClick={handleOptimizePrompt} 
              disabled={ollamaLoading}
              className="btn btn-secondary" 
              style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem' }}
            >
              <svg className={ollamaLoading ? 'spin' : ''} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              {ollamaLoading ? 'Optimiert...' : 'Per lokaler KI verbessern (Ollama)'}
            </button>
          </div>
        </form>

        {/* Prompt-Suche & Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
          <input
            type="text"
            className="input-field"
            style={{ height: '32px', fontSize: '0.8rem' }}
            placeholder="Prompts durchsuchen (Titel oder Inhalt)..."
            value={promptSearch}
            onChange={(e) => setPromptSearch(e.target.value)}
          />
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {[
              { key: 'all', label: 'Alle' },
              { key: 'Sales', label: 'Sales' },
              { key: 'Marketing', label: 'Marketing' },
              { key: 'Code', label: 'Code' },
              { key: 'Strategie', label: 'Strategie' }
            ].map(cat => {
              const isActive = promptCategoryFilter === cat.key;
              const count = cat.key === 'all' ? prompts.length : prompts.filter(p => p.category === cat.key).length;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setPromptCategoryFilter(cat.key)}
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.7rem',
                    borderRadius: '0.25rem',
                    border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                    background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat.label}
                  <span style={{ fontSize: '0.6rem', color: isActive ? 'white' : 'var(--text-muted)' }}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="prompt-vault">
          {prompts.filter(p => {
            const matchesCategory = promptCategoryFilter === 'all' || p.category === promptCategoryFilter;
            const matchesSearch = p.title.toLowerCase().includes(promptSearch.toLowerCase()) || p.text.toLowerCase().includes(promptSearch.toLowerCase());
            return matchesCategory && matchesSearch;
          }).map(p => (
            <div key={p.id} className="prompt-card">
              <div className="prompt-head">
                <span className="prompt-title">{p.title}</span>
                <span className="prompt-cat">{p.category}</span>
              </div>
              <div className="prompt-body">{p.text}</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button 
                  onClick={() => copyPromptText(p.text)} 
                  className="btn btn-secondary" 
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                >
                  <ClipboardCopy size={12} /> Kopieren
                </button>
                <button onClick={() => deletePrompt(p.id)} className="btn-icon-only" style={{ padding: '0.35rem' }}>
                  <Trash2 size={12} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Content Planer & RAG Knowledge Bot */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Content-Planer */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title"><TrendingUp size={20} className="text-indigo-500" /> Social Media Content-Planer</h2>
          </div>
          
          <form onSubmit={handleAddPost} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Post Thema / Idee" 
              className="input-field" 
              style={{ flexGrow: 1, minWidth: '150px' }}
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
            />
            <input 
              type="date" 
              className="input-field" 
              style={{ width: '130px' }}
              value={newPost.date}
              onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
              required
            />
            <select 
              className="input-field" 
              style={{ width: '110px' }}
              value={newPost.status}
              onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
            >
              <option value="idea">Idee</option>
              <option value="draft">Entwurf</option>
              <option value="ready">Bereit</option>
              <option value="done">Gepostet</option>
            </select>
            <button type="submit" className="btn btn-primary"><Plus size={16} /></button>
          </form>

          <div className="content-planer-list">
            {contentPosts.map(post => (
              <div key={post.id} className="content-post">
                <div className="post-info">
                  <span className="post-title">{post.title}</span>
                  <span className="post-date">Geplant am {post.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`post-status status-${post.status}`}>{post.status}</span>
                  <button onClick={() => deletePost(post.id)} className="btn-icon-only" style={{ padding: '0.35rem' }}>
                    <Trash2 size={12} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "Frag das Firmengehirn" RAG Knowledge Bot */}
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="card-title" style={{ color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BrainCircuit size={20} /> "Frag das Firmengehirn" – RAG Knowledge Bot
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Dokumenten-basiertes KI-Wissen abrufen</span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              <button 
                className={`btn ${ragPersona === 'brain' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'brain' ? 'var(--accent-purple)' : 'transparent', border: 'none' }}
                onClick={() => setRagPersona('brain')}
              >
                🧠 &nbsp;Firmengehirn
              </button>
              <button 
                className={`btn ${ragPersona === 'sales' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'sales' ? 'var(--accent-cyan)' : 'transparent', border: 'none' }}
                onClick={() => setRagPersona('sales')}
              >
                🎯 &nbsp;Pitch-Coach
              </button>
              <button 
                className={`btn ${ragPersona === 'legal' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'legal' ? 'var(--accent-yellow)' : 'transparent', border: 'none' }}
                onClick={() => setRagPersona('legal')}
              >
                🔒 &nbsp;DSGVO
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Schnellfragen:</span>
            <button 
              onClick={() => handleSendRagQuery('Wie läuft das Neukunden-Onboarding ab?')}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
            >
              ⚡ Neukunden-Onboarding
            </button>
            <button 
              onClick={() => handleSendRagQuery('Was kosten unsere Automatisierungs-Pakete?')}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
            >
              ⚡ Preispakete & Kosten
            </button>
            <button 
              onClick={() => handleSendRagQuery('Welche Datenschutz-Standards gelten bei Sprachnachrichten?')}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
            >
              ⚡ DSGVO & Sicherheit
            </button>
          </div>

          {/* Chat Stream Window */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '260px', overflowY: 'auto', background: 'rgba(9, 13, 22, 0.7)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            {ragChat.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                <div style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.85rem',
                  lineHeight: '1.45',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))' : 'rgba(255, 255, 255, 0.04)',
                  color: '#f4f4f5',
                  border: msg.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.05)'
                }}>
                  {msg.text}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Quellen:</span>
                    {msg.sources.map((s, idx) => (
                      <span key={idx} style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '0.05rem 0.25rem', borderRadius: '0.25rem' }}>
                        📄 {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {ragGenerating && (
              <div style={{ display: 'flex', gap: '0.35rem', alignSelf: 'flex-start', background: 'rgba(255,255,255,0.04)', padding: '0.65rem 0.85rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="dot-pulse" style={{ background: 'var(--accent-purple)' }}></span>
                <span className="dot-pulse" style={{ background: 'var(--accent-cyan)', animationDelay: '0.2s' }}></span>
                <span className="dot-pulse" style={{ background: 'var(--accent-purple)', animationDelay: '0.4s' }}></span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendRagQuery();
            }} 
            style={{ display: 'flex', gap: '0.5rem' }}
          >
            <input 
              type="text" 
              className="input-field" 
              style={{ flexGrow: 1 }}
              placeholder={`Frage das Firmengehirn (Persona: ${ragPersona === 'brain' ? 'Firmengehirn' : ragPersona === 'sales' ? 'Pitch-Coach' : 'DSGVO & Legal'})...`}
              value={ragInput}
              onChange={(e) => setRagInput(e.target.value)}
              disabled={ragGenerating}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={ragGenerating || !ragInput.trim()}
              style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', border: 'none', padding: '0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Send size={14} /> Fragen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

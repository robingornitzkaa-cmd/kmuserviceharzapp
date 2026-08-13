import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Plus, 
  ClipboardCopy, 
  Trash2, 
  TrendingUp, 
  Send,
  Pin,
  Download,
  Upload,
  RefreshCw,
  Sparkles
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
  customPromptBlocks = [],
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
  prompts = [],
  copyPromptText,
  deletePrompt,
  togglePinPrompt,
  exportPromptsJSON,
  importPromptsJSON,
  handleSyncPromptsFromSupabase,
  diffModalData,
  setDiffModalData,
  variableModalData,
  setVariableModalData,
  showToast,
  newPost,
  setNewPost,
  handleAddPost,
  contentPosts = [],
  deletePost,
  ragPersona,
  setRagPersona,
  ragInput,
  setRagInput,
  ragGenerating,
  ragChat = [],
  handleSendRagQuery,
  kmuPrompts = [],
  handleAdoptKmuPrompt,
  handleRestorePromptVersion
}) => {
  const [selectedOptMode, setSelectedOptMode] = useState('structured');
  const [historyModalData, setHistoryModalData] = useState({ isOpen: false, promptId: null, promptTitle: '', history: [] });

  return (
    <div className="hub-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
      
      {/* Prompt Vault */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', margin: 0 }}>
            <BrainCircuit size={20} className="text-purple-500" /> Prompt Vault (KI-Tresor)
          </h2>

          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => handleSyncPromptsFromSupabase && handleSyncPromptsFromSupabase()}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.65rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              title="Prompts aus Supabase synchronisieren"
            >
              <RefreshCw size={11} /> Sync
            </button>
            <button
              type="button"
              onClick={() => exportPromptsJSON && exportPromptsJSON()}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.65rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              title="Prompts als JSON herunterladen"
            >
              <Download size={11} /> Export
            </button>
            <label
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.65rem', height: '24px', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer', margin: 0 }}
              title="Prompts aus JSON importieren"
            >
              <Upload size={11} /> Import
              <input
                type="file"
                accept=".json"
                onChange={(e) => importPromptsJSON && importPromptsJSON(e)}
                style={{ display: 'none' }}
              />
            </label>
            <button
              type="button"
              onClick={() => setShowGeminiConfig(!showGeminiConfig)}
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.65rem', height: '24px' }}
            >
              {showGeminiConfig ? 'Schließen' : '⚙ KI-Einstellungen'}
            </button>
          </div>
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
                  if (showToast) showToast('API-Schlüssel gelöscht.');
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
                    { label: 'Lead Researcher', text: 'Agiere als B2B Lead Research & Marktanalyst. ' },
                    { label: 'B2B Sales Strategist', text: 'Agiere als B2B-Vertriebsstrategist für Mittelstand. ' },
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

              {/* NEU: Lead- & Research-Bausteine */}
              <div>
                <div style={{ fontSize: '0.65rem', color: '#c084fc', fontWeight: 700, marginBottom: '0.25rem' }}>🔬 Lead- & Research-Bausteine:</div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { label: '🎯 Entscheider & Kontakte', text: '\nAnalysiere die wichtigsten Entscheider-Rollen (z.B. CEO, CTO, Head of Sales) und identifiziere bevorzugte Ansprechkanäle.' },
                    { label: '📊 SWOT-Matrix', text: '\nErstelle eine 4-Felder-SWOT-Matrix (Stärken, Schwächen, Chancen, Risiken) für die Zielbranche.' },
                    { label: '💻 Digitalisierungsgrad', text: '\nBewerte den aktuellen Digitalisierungsgrad (Website, Booking-System, Social Media, Online-Prozesse) der Unternehmen.' },
                    { label: '🔍 SEO & Web-Präsenz', text: '\nAnalysiere die Google-Sichtbarkeit, SEO-Keywords und Online-Bewertungen der potenziellen Leads.' },
                    { label: '💡 Schmerzpunkt-Analyse', text: '\nIdentifiziere die 3 gravierendsten Schmerzpunkte (Pain Points) und operativen Engpässe dieser Zielgruppe.' },
                    { label: '🏢 Bonität & Firmengröße', text: '\nKlassifiziere potenzielle Leads nach Mitarbeiterzahl, geschätztem Umsatz und Bonitätsrisiko.' }
                  ].map((b, idx) => (
                    <button 
                      key={idx} 
                      type="button" 
                      className="tag" 
                      style={{ cursor: 'pointer', border: 'none', background: 'rgba(192, 132, 252, 0.18)', color: '#e9d5ff', fontSize: '0.65rem', padding: '0.2rem 0.45rem', borderRadius: '0.25rem', border: '1px solid rgba(192, 132, 252, 0.3)' }}
                      onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + b.text }))}
                    >
                      ➕ {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tonalität */}
              <div>
                <div style={{ fontSize: '0.65rem', color: '#22d3ee', fontWeight: 700, marginBottom: '0.25rem' }}>Tonalität & Stil:</div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Locker & Du', text: '\nSchreibe in lockerem & nahbarem "Du"-Stil.' },
                    { label: 'Professionell B2B', text: '\nFormuliere professionell, sachlich und B2B-orientiert.' },
                    { label: 'Prägnant', text: '\nSchreibe extrem prägnant, direkt und ohne Floskeln.' },
                    { label: 'Verkaufsstark', text: '\nNutze einen begeisternden, verkaufsstarken Werbeton.' },
                    { label: 'Analytisch & Datenbasiert', text: '\nFokussiere auf datenbasierte Fakten, Zahlen und Marktstudien.' },
                    { label: 'CEO-Prägnant', text: '\nFasse Ergebnisse so zusammen, dass ein CEO sie in 60 Sekunden versteht.' }
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
                    { label: 'SWOT-Grid', text: '\nFormatiere die SWOT-Analyse als 4-Quadranten Markdown-Raster.' },
                    { label: 'Markdown Tabelle', text: '\nGib das Ergebnis als übersichtliche Markdown-Tabelle aus.' },
                    { label: 'Executive Summary', text: '\nErstelle zu Beginn eine 3-Sätze Executive Summary.' },
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
                    { label: '🛡️ Quellenkritik', text: '\nPrüfe die Belastbarkeit aller Quellen und markiere verbleibende Datenlücken.' },
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

              {/* Deep Research Schnellstart Vorlagen */}
              <div style={{ marginTop: '0.25rem', paddingTop: '0.4rem', borderTop: '1px dashed rgba(139, 92, 246, 0.25)' }}>
                <div style={{ fontSize: '0.65rem', color: '#c084fc', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Sparkles size={11} /> Deep Research Vorlagen (Schnellstart):
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { label: '🏢 KMU Marktanalyse Harz', text: 'Führe eine Deep Research Marktanalyse für regionale KMU im Harz durch. Relevante Trends, Konkurrenzdichte und digitale Potenziale.' },
                    { label: '⚔️ Wettbewerber & USP', text: 'Führe eine tiefgehende Konkurrenz- & USP-Analyse im Bereich [Branche] durch. Identifiziere Marktlücken und Alleinstellungsmerkmale.' },
                    { label: '🤖 KI-Technologie Evaluierung', text: 'Tiefenrecherche & Evaluierung modernster KI-Tools & LLMs für den Einsatz in KMU-Arbeitsabläufen (ROI, Datenschutz, Integration).' }
                  ].map((tpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      style={{ cursor: 'pointer', border: '1px solid rgba(192, 132, 252, 0.4)', background: 'rgba(192, 132, 252, 0.12)', color: '#e9d5ff', fontSize: '0.65rem', padding: '0.2rem 0.45rem', borderRadius: '0.25rem' }}
                      onClick={() => setNewPrompt(prev => ({
                        ...prev,
                        title: prev.title || tpl.label.replace(/^[^a-zA-Z0-9\s]+/, '').trim(),
                        text: tpl.text
                      }))}
                    >
                      ⚡ {tpl.label}
                    </button>
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
            placeholder="Prompt Text... (Nutze {{Variable}} für dynamische Ausfüllfelder)" 
            className="input-field" 
            rows={4}
            value={newPrompt.text}
            onChange={(e) => setNewPrompt({ ...newPrompt, text: e.target.value })}
            required
          />

          {/* KI Optimierungs-Modi Auswahlleiste */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>Optimierungs-Ziel:</span>
            {[
              { id: 'structured', label: '🎯 Standard' },
              { id: 'concise', label: '✂️ Kurz & Präzise' },
              { id: 'english', label: '🌍 Englisch' },
              { id: 'privacy', label: '🛡️ Datenschutz' },
              { id: 'deep_research_swot', label: '🔬 Deep Research' }
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedOptMode(m.id)}
                style={{
                  fontSize: '0.65rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '0.25rem',
                  border: selectedOptMode.startsWith(m.id === 'deep_research_swot' ? 'deep_research' : m.id) ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                  background: selectedOptMode.startsWith(m.id === 'deep_research_swot' ? 'deep_research' : m.id) ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                  color: selectedOptMode.startsWith(m.id === 'deep_research_swot' ? 'deep_research' : m.id) ? '#a78bfa' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Deep Research Framework Sub-Leiste */}
          {selectedOptMode.startsWith('deep_research') && (
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center', background: 'rgba(147, 51, 234, 0.1)', padding: '0.4rem 0.6rem', borderRadius: '0.4rem', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              <span style={{ fontSize: '0.65rem', color: '#e9d5ff', fontWeight: 700 }}>🔬 Framework-Auswahl:</span>
              {[
                { id: 'deep_research_swot', label: '📊 Lead & SWOT' },
                { id: 'deep_research_competitor', label: '🎯 Wettbewerber' },
                { id: 'deep_research_market', label: '📈 Markt & Trends' },
                { id: 'deep_research_tools', label: '🛠️ Tool-Vergleich' },
                { id: 'deep_research_persona', label: '👥 Buyer Persona' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedOptMode(f.id)}
                  style={{
                    fontSize: '0.65rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '0.25rem',
                    border: selectedOptMode === f.id ? '1px solid #c084fc' : '1px solid rgba(255,255,255,0.1)',
                    background: selectedOptMode === f.id ? 'rgba(192, 132, 252, 0.3)' : 'rgba(0,0,0,0.2)',
                    color: selectedOptMode === f.id ? '#ffffff' : '#e9d5ff',
                    fontWeight: selectedOptMode === f.id ? 700 : 500,
                    cursor: 'pointer'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: '1 1 130px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem' }}>
              <Plus size={16} /> Prompt sichern
            </button>
            <button 
              type="button" 
              onClick={() => handleOptimizePrompt && handleOptimizePrompt(selectedOptMode)} 
              disabled={ollamaLoading}
              className="btn btn-secondary" 
              style={{ flex: '1 1 140px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem' }}
            >
              <svg className={ollamaLoading ? 'spin' : ''} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              {ollamaLoading ? 'Optimiert...' : 'Per KI verbessern'}
            </button>
            <button 
              type="button" 
              onClick={() => {
                const modeToUse = selectedOptMode.startsWith('deep_research') ? selectedOptMode : 'deep_research_swot';
                setSelectedOptMode(modeToUse);
                if (handleOptimizePrompt) handleOptimizePrompt(modeToUse);
              }} 
              disabled={ollamaLoading}
              className="btn" 
              style={{ 
                flex: '1 1 170px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '0.35rem',
                background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.25), rgba(6, 182, 212, 0.25))',
                border: '1px solid rgba(168, 85, 247, 0.5)',
                color: '#e9d5ff',
                fontWeight: 600
              }}
              title="Erstellt einen hochspezialisierten 5-stufigen Deep Research Prompt für das gewählte Recherche-Framework"
            >
              <Sparkles size={15} style={{ color: '#c084fc' }} />
              🔬 Deep Research Prompt
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
              { key: 'Strategie', label: 'Strategie' },
              { key: 'kmu_templates', label: '🏢 KMU Harz Vorlagen' }
            ].map(cat => {
              const isActive = promptCategoryFilter === cat.key;
              const count = cat.key === 'all' 
                ? prompts.length 
                : cat.key === 'kmu_templates' 
                ? kmuPrompts.length 
                : prompts.filter(p => p.category === cat.key).length;
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
          {promptCategoryFilter === 'kmu_templates' ? (
            kmuPrompts
              .filter(p => p.title.toLowerCase().includes(promptSearch.toLowerCase()) || p.text.toLowerCase().includes(promptSearch.toLowerCase()))
              .map(p => (
                <div key={p.id} className="prompt-card" style={{ border: '1px dashed rgba(192, 132, 252, 0.5)', background: 'rgba(192, 132, 252, 0.03)' }}>
                  <div className="prompt-head">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Sparkles size={13} className="text-purple-400" />
                      <span className="prompt-title" style={{ color: '#e9d5ff' }}>{p.title}</span>
                    </div>
                    <span className="prompt-cat" style={{ background: 'rgba(192, 132, 252, 0.2)', color: '#c084fc' }}>{p.category}</span>
                  </div>
                  <div className="prompt-body">{p.text}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>🏢 KMU Spezial-Vorlage</span>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button
                        type="button"
                        onClick={() => copyPromptText(p.text)}
                        className="btn btn-secondary"
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.7rem' }}
                      >
                        <ClipboardCopy size={11} /> Kopieren
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAdoptKmuPrompt && handleAdoptKmuPrompt(p)}
                        className="btn btn-primary"
                        style={{ padding: '0.3rem 0.65rem', fontSize: '0.7rem', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', border: 'none' }}
                      >
                        ➕ In meinen Tresor übernehmen
                      </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            prompts
              .filter(p => {
                const matchesCategory = promptCategoryFilter === 'all' || p.category === promptCategoryFilter;
                const matchesSearch = p.title.toLowerCase().includes(promptSearch.toLowerCase()) || p.text.toLowerCase().includes(promptSearch.toLowerCase());
                return matchesCategory && matchesSearch;
              })
              .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
              .map(p => (
                <div key={p.id} className="prompt-card" style={p.isPinned ? { border: '1px solid var(--accent-purple)', background: 'rgba(139, 92, 246, 0.03)' } : {}}>
                  <div className="prompt-head">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {p.isPinned && <Pin size={12} className="text-purple-400" style={{ transform: 'rotate(45deg)' }} />}
                      <span className="prompt-title">{p.title}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span className="prompt-cat">{p.category}</span>
                      <span style={{ fontSize: '0.6rem', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', background: p.synced ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)', color: p.synced ? '#34d399' : '#facc15' }} title={p.synced ? 'In Cloud gesichert & synchronisiert' : 'Lokal gespeichert, wird bei Cloud-Sync hochgeladen'}>
                        {p.synced ? '☁️ Cloud' : '📱 Lokal (Sync ausstehend)'}
                      </span>
                    </div>
                  </div>
                  <div className="prompt-body">{p.text}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem' }}>
                    <div>
                      {p.history && p.history.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setHistoryModalData({
                            isOpen: true,
                            promptId: p.id,
                            promptTitle: p.title,
                            history: p.history
                          })}
                          className="btn btn-secondary"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.65rem', color: '#c084fc', border: '1px solid rgba(192, 132, 252, 0.3)', background: 'rgba(192, 132, 252, 0.08)' }}
                          title="Frühere Versionen anzeigen"
                        >
                          📜 {p.history.length} {p.history.length === 1 ? 'Version' : 'Versionen'}
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => togglePinPrompt && togglePinPrompt(p.id)}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem', color: p.isPinned ? '#a78bfa' : 'var(--text-muted)' }}
                        title={p.isPinned ? 'Entpinnen' : 'Anpinnen'}
                      >
                        <Pin size={12} />
                      </button>
                      <button 
                        onClick={() => copyPromptText(p.text)} 
                        className="btn btn-secondary" 
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                      >
                        <ClipboardCopy size={12} /> Kopieren
                      </button>
                      <button onClick={() => deletePrompt(p.id)} className="btn-icon-only" style={{ padding: '0.35rem' }}>
                        <Trash2 size={12} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
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

      {/* Vorher / Nachher KI-Diff Modal */}
      {diffModalData && diffModalData.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000, padding: '1rem' }}>
          <div style={{ background: '#0f172a', border: '1px solid var(--accent-purple)', borderRadius: '0.75rem', padding: '1.25rem', maxWidth: '750px', width: '100%', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: 'var(--accent-purple)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} /> KI-Optimierung: Vorher / Nachher Vergleich
              </h3>
              <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', borderRadius: '0.25rem', border: '1px solid rgba(139,92,246,0.3)' }}>
                {diffModalData.source}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Original Entwurf
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: '1.45' }}>
                  {diffModalData.originalText}
                </div>
              </div>

              <div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid var(--accent-purple)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-purple)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  ✨ KI-Optimierte Fassung
                </div>
                <div style={{ fontSize: '0.8rem', color: '#ffffff', whiteSpace: 'pre-wrap', lineHeight: '1.45' }}>
                  {diffModalData.optimizedText}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDiffModalData({ ...diffModalData, isOpen: false })}
                style={{ fontSize: '0.75rem' }}
              >
                Abbrechen
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setNewPrompt(prev => ({ ...prev, text: diffModalData.optimizedText }));
                  setDiffModalData({ ...diffModalData, isOpen: false });
                  if (showToast) showToast('✨ KI-Optimierter Text in den Entwurf übernommen!');
                }}
                style={{ fontSize: '0.75rem' }}
              >
                Übernehmen & Ersetzen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Variables Modal */}
      {variableModalData && variableModalData.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000, padding: '1rem' }}>
          <div style={{ background: '#0f172a', border: '1px solid var(--accent-cyan)', borderRadius: '0.75rem', padding: '1.25rem', maxWidth: '550px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>
                🧩 Prompt-Variablen ausfüllen
              </h3>
              <button
                type="button"
                onClick={() => setVariableModalData({ ...variableModalData, isOpen: false })}
                style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              Dieser Prompt enthält Platzhalter. Trage die Werte ein, um den fertigen Prompt zu generieren:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {variableModalData.variables.map(v => (
                <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#22d3ee' }}>
                    {`{{${v}}}`}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    style={{ fontSize: '0.8rem', height: '32px' }}
                    placeholder={`Wert für ${v}...`}
                    value={variableModalData.values[v] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setVariableModalData(prev => ({
                        ...prev,
                        values: { ...prev.values, [v]: val }
                      }));
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setVariableModalData({ ...variableModalData, isOpen: false })}
                style={{ fontSize: '0.75rem' }}
              >
                Abbrechen
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  let finalPrompt = variableModalData.promptText;
                  Object.entries(variableModalData.values).forEach(([k, v]) => {
                    finalPrompt = finalPrompt.replaceAll(`{{${k}}}`, v || `{{${k}}}`);
                  });
                  navigator.clipboard.writeText(finalPrompt);
                  setVariableModalData({ ...variableModalData, isOpen: false });
                  if (showToast) showToast('📋 Fertiger Prompt mit Variablen kopiert!');
                }}
                style={{ fontSize: '0.75rem', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', border: 'none' }}
              >
                Fertigen Prompt kopieren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prompt Version History Modal */}
      {historyModalData && historyModalData.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000, padding: '1rem' }}>
          <div style={{ background: '#0f172a', border: '1px solid var(--accent-purple)', borderRadius: '0.75rem', padding: '1.25rem', maxWidth: '650px', width: '100%', maxHeight: '85vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: 'var(--accent-purple)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📜 Prompt Versionshistorie: {historyModalData.promptTitle}
              </h3>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                onClick={() => setHistoryModalData({ ...historyModalData, isOpen: false })}
              >
                Schließen
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {historyModalData.history && historyModalData.history.length > 0 ? (
                historyModalData.history.map((ver, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a78bfa' }}>
                        Version #{ver.version || (historyModalData.history.length - idx)} ({ver.timestamp || 'Vorheriger Stand'})
                      </span>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.65rem', color: 'var(--accent-cyan)', border: '1px solid rgba(6, 182, 212, 0.3)' }}
                        onClick={() => {
                          if (handleRestorePromptVersion) {
                            handleRestorePromptVersion(historyModalData.promptId, ver);
                          }
                          setHistoryModalData({ ...historyModalData, isOpen: false });
                        }}
                      >
                        🔄 Diese Version wiederherstellen
                      </button>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', fontFamily: 'monospace', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '0.25rem' }}>
                      {ver.text}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Keine früheren Versionen für diesen Prompt gespeichert.</div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

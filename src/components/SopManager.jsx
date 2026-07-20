import React from 'react';
import { 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  ChevronRight, 
  Play, 
  Trash2, 
  AlertTriangle, 
  BrainCircuit, 
  Inbox, 
  Clock, 
  ClipboardCopy, 
  Zap, 
  Plus, 
  Sliders, 
  Phone, 
  Volume2 
} from 'lucide-react';

export const SopManager = ({
  calcInputs,
  setCalcInputs,
  savings,
  generatePDFReport,
  sopTemplates,
  startSopFromTemplate,
  activeSops,
  mask,
  deleteActiveSop,
  toggleActiveSopStep,
  PROCESSES,
  selectedUseCase,
  setSelectedUseCase,
  makeSimRunning,
  startMakeSimulation,
  makeActiveNode,
  makeLogs,
  startCanvasTestRun,
  canvasTestRunning,
  addCanvasNode,
  canvasNodes,
  setCanvasNodes,
  selectedCanvasNodeId,
  setSelectedCanvasNodeId,
  canvasTestActiveNode,
  deleteCanvasNode,
  updateCanvasNodeConfig,
  canvasTestLogs,
  voiceScenario,
  setVoiceScenario,
  voiceCallActive,
  startVoiceCallSimulation,
  voiceTranscript,
  voiceExtractedData
}) => {
  return (
    <div className="sales-grid">
      
      {/* Showcase ROI Calculator */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title"><TrendingUp size={20} className="text-cyan-500" /> Showcase ROI-Rechner</h2>
        </div>
        <div className="showcase-calculator">
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Nutze dieses Tool live im Verkaufsgespräch, um KMUs die jährliche Ersparnis durch deine Automatisierung zu demonstrieren.
          </p>
          
          <div className="input-group">
            <label>Name der manuellen Aufgabe</label>
            <input 
              type="text" 
              className="input-field"
              value={calcInputs.taskName}
              onChange={(e) => setCalcInputs({ ...calcInputs, taskName: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label>Stunden pro Woche</label>
              <input 
                type="number" 
                className="input-field"
                value={calcInputs.durationHours}
                onChange={(e) => setCalcInputs({ ...calcInputs, durationHours: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="input-group">
              <label>Stundenlohn (€)</label>
              <input 
                type="number" 
                className="input-field"
                value={calcInputs.hourlyRate}
                onChange={(e) => setCalcInputs({ ...calcInputs, hourlyRate: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label>Projekt-Festpreis (€)</label>
              <input 
                type="number" 
                className="input-field"
                value={calcInputs.setupFee}
                onChange={(e) => setCalcInputs({ ...calcInputs, setupFee: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="input-group">
              <label>Foerdermittel-Region</label>
              <select 
                className="input-field"
                value={calcInputs.subsidyRegion}
                onChange={(e) => setCalcInputs({ ...calcInputs, subsidyRegion: e.target.value })}
              >
                <option value="NDS">Niedersachsen (50%)</option>
                <option value="LSA">Sachsen-Anhalt (50%)</option>
                <option value="BUND">Bund / go-digital (30%)</option>
                <option value="NONE">Keine Foerderung (0%)</option>
              </select>
            </div>
          </div>

          {/* Visuelle Gegenueberstellung / Balkendiagramm */}
          <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              Jaehrlicher Zeitaufwand im Vergleich:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                  <span>Manuell (Bisher)</span>
                  <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>{savings.hours} Std. / Jahr</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to right, var(--accent-red), var(--accent-yellow))' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                  <span>Automatisiert (Neu)</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>~ {(savings.rawYearlyHours * 0.1).toFixed(0)} Std. / Jahr</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '10%', height: '100%', background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-indigo))', boxShadow: 'var(--shadow-glow-cyan)' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="calc-result-box">
            <div className="calc-result-label">Erwartete Ersparnis durch Automatisierung:</div>
            <div className="calc-result-value" style={{ color: 'var(--accent-cyan)' }}>
              ~ {((savings.rawYearlyEur * 0.9)).toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })} / Jahr
            </div>
            <div className="calc-result-sub" style={{ marginBottom: '1rem' }}>
              und ca. <strong>{(savings.rawYearlyHours * 0.9).toFixed(0)} Stunden</strong> freigestellte Arbeitszeit pro Jahr.
            </div>
            
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem', textAlign: 'left', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Projekt-Investition (Festpreis):</span>
                <span>{calcInputs.setupFee.toLocaleString('de-DE')} EUR</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-cyan)' }}>
                <span>Staatlicher Zuschuss (Foerderung):</span>
                <span>- {savings.subsidyAmount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--accent-green)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.25rem' }}>
                <span>Deine Netto-Investition:</span>
                <span>{savings.netInvestment}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                <span>Amortisationszeit:</span>
                <span>ca. {savings.paybackMonths} Monate</span>
              </div>
            </div>
          </div>

          <button 
            onClick={generatePDFReport} 
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))', boxShadow: 'var(--shadow-glow-cyan)' }}
          >
            <FileText size={16} /> ROI-Analyse als PDF exportieren
          </button>
        </div>
      </div>

      {/* SOPs & Checklists */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title"><CheckCircle size={20} className="text-purple-500" /> SOPs & Checklisten</h2>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            SOP-Vorlagen (Zum Starten anklicken)
          </h3>
          <div className="sop-templates-list">
            {sopTemplates.map(template => (
              <div key={template.id} className="sop-card" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                <div className="sop-head">
                  <span className="sop-title">{template.name}</span>
                  <button 
                    onClick={() => startSopFromTemplate(template)} 
                    className="btn btn-primary"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                  >
                    <Play size={12} /> Starten
                  </button>
                </div>
                <div className="sop-steps">
                  {template.steps.slice(0, 2).map((step, idx) => (
                    <div key={idx} className="sop-step">
                      <ChevronRight size={12} /> {step}
                    </div>
                  ))}
                  {template.steps.length > 2 && (
                    <div className="sop-step" style={{ color: 'var(--text-muted)' }}>
                      ...und {template.steps.length - 2} weitere Schritte.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            Aktive Checklisten
          </h3>
          <div className="sop-templates-list">
            {activeSops.map(sop => {
              const completedSteps = sop.steps.filter(s => s.done).length;
              const totalSteps = sop.steps.length;
              return (
                <div key={sop.id} className="sop-card" style={{ borderLeft: '3px solid var(--accent-green)' }}>
                  <div className="sop-head">
                    <div>
                      <span className="sop-title">{sop.name}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Kunde: <strong>{mask(sop.client, 'company')}</strong></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{completedSteps}/{totalSteps}</span>
                      <button onClick={() => deleteActiveSop(sop.id)} className="btn-icon-only">
                        <Trash2 size={12} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="sop-steps" style={{ marginTop: '0.75rem' }}>
                    {sop.steps.map((step, idx) => (
                      <label key={idx} className="project-step-checkbox" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input 
                          type="checkbox" 
                          checked={step.done}
                          onChange={() => toggleActiveSopStep(sop.id, idx)}
                        />
                        <span style={{ textDecoration: step.done ? 'line-through' : 'none', color: step.done ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                          {mask(step.text, 'inbox')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
            {activeSops.length === 0 && (
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                Keine aktiven Checklisten. Starte eine aus einer Vorlage oben!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Zettel-zu-Code Visualisierer (Volle Breite) */}
      <div className="card" style={{ gridColumn: 'span 2', marginTop: '1.5rem' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="card-title" style={{ color: 'var(--accent-purple)' }}><BrainCircuit size={20} /> Zettel-zu-Code Prozess-Visualisierer</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Visualisiere im Gespraech den direkten Unterschied zwischen Zettelwirtschaft und Automatisierung.
            </p>
          </div>
          
          {/* Use Case Waehler Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(17, 24, 39, 0.6)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
            {Object.keys(PROCESSES).map(key => (
              <button 
                key={key} 
                className={`btn ${selectedUseCase === key ? 'btn-primary' : 'btn-secondary'}`}
                style={{ 
                  padding: '0.35rem 0.75rem', 
                  fontSize: '0.75rem', 
                  borderRadius: '0.35rem',
                  background: selectedUseCase === key ? 'var(--accent-purple)' : 'transparent',
                  borderColor: 'transparent',
                  color: selectedUseCase === key ? 'white' : 'var(--text-secondary)'
                }}
                onClick={() => setSelectedUseCase(key)}
              >
                {PROCESSES[key].title}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '1.5rem', textAlign: 'center' }}>
            "{PROCESSES[selectedUseCase].desc}"
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            
            {/* Vorher-Pfad (Zettelwirtschaft) */}
            <div style={{ background: 'rgba(239, 68, 68, 0.02)', border: '1px solid rgba(239, 68, 68, 0.12)', borderRadius: '0.75rem', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--accent-red)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} /> Bisheriger Weg (Papier & Manuell)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                {PROCESSES[selectedUseCase].before.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.75rem', position: 'relative' }}>
                    <div style={{ 
                      minWidth: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      background: 'rgba(239, 68, 68, 0.1)', 
                      border: '1px solid rgba(239, 68, 68, 0.3)', 
                      color: 'var(--accent-red)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '0.75rem', 
                      fontWeight: 700,
                      justifyContent: 'center'
                    }}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{step.step}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nachher-Pfad (Automatisiert) */}
            <div style={{ background: 'rgba(6, 182, 212, 0.02)', border: '1px solid rgba(6, 182, 212, 0.12)', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 0 15px rgba(6, 182, 212, 0.05)' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BrainCircuit size={16} /> Neuer Weg (Vollautomatisiert)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {PROCESSES[selectedUseCase].after.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ 
                      minWidth: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      background: 'rgba(6, 182, 212, 0.1)', 
                      border: '1px solid rgba(6, 182, 212, 0.3)', 
                      color: 'var(--accent-cyan)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '0.75rem', 
                      fontWeight: 700,
                      justifyContent: 'center',
                      boxShadow: '0 0 10px rgba(6, 182, 212, 0.2)'
                    }}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{step.step}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Make.com Szenario-Simulator (Volle Breite) (Feature B1) */}
      <div className="card" style={{ gridColumn: 'span 2', marginTop: '1.5rem' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="card-title" style={{ color: 'var(--accent-cyan)' }}>
              <BrainCircuit size={20} /> Interaktiver Make.com Szenario-Simulator
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Demonstriere live, wie Daten im Hintergrund durch Schnittstellen fließen.
            </p>
          </div>
          
          <button 
            onClick={startMakeSimulation}
            disabled={makeSimRunning}
            className="btn btn-primary"
            style={{ 
              background: 'linear-gradient(135deg, #d946ef, #8b5cf6)', 
              boxShadow: '0 0 15px rgba(217, 70, 239, 0.4)',
              border: 'none',
              padding: '0.5rem 1rem',
              fontSize: '0.825rem',
              fontWeight: 600
            }}
          >
            {makeSimRunning ? 'Simulation läuft...' : 'Szenario ausführen (Testen)'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }} className="make-simulator-grid">
          
          {/* Linke Seite: Der Graph */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Szenario-Ablaufplan (Make-Module)
            </label>
            
            <div className="make-scenario-graph">
              <div className={`make-node ${makeActiveNode === 1 ? 'active' : ''} ${makeActiveNode > 1 ? 'completed' : ''}`}>
                <Inbox size={22} />
                <span className="make-node-label">WhatsApp</span>
              </div>
              
              <div className={`make-connector ${makeActiveNode === 1 ? 'active' : ''} ${makeActiveNode > 1 ? 'completed' : ''}`} />
              
              <div className={`make-node ${makeActiveNode === 2 ? 'active' : ''} ${makeActiveNode > 2 ? 'completed' : ''}`}>
                <Clock size={22} />
                <span className="make-node-label">Whisper (KI)</span>
              </div>
              
              <div className={`make-connector ${makeActiveNode === 2 ? 'active' : ''} ${makeActiveNode > 2 ? 'completed' : ''}`} />
              
              <div className={`make-node ${makeActiveNode === 3 ? 'active' : ''} ${makeActiveNode > 3 ? 'completed' : ''}`}>
                <BrainCircuit size={22} />
                <span className="make-node-label">GPT-4 (KI)</span>
              </div>
              
              <div className={`make-connector ${makeActiveNode === 3 ? 'active' : ''} ${makeActiveNode > 3 ? 'completed' : ''}`} />
              
              <div className={`make-node ${makeActiveNode === 4 ? 'active' : ''} ${makeActiveNode > 4 ? 'completed' : ''}`}>
                <ClipboardCopy size={22} />
                <span className="make-node-label">Lexoffice</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-color)', display: 'inline-block' }}></span>
                Bereit
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', display: 'inline-block', boxShadow: '0 0 5px var(--accent-cyan)' }}></span>
                Aktiv
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }}></span>
                Erfolgreich
              </div>
            </div>
          </div>

          {/* Rechte Seite: Log Terminal */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Ausführungsprotokoll (Live-Log)
            </label>
            
            <div style={{ 
              background: '#090d16', 
              border: '1px solid var(--border-color)', 
              borderRadius: '0.5rem', 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden',
              minHeight: '200px'
            }}>
              {/* Mac window header */}
              <div style={{ 
                background: 'rgba(255,255,255,0.03)', 
                borderBottom: '1px solid rgba(255,255,255,0.05)', 
                padding: '0.5rem 0.75rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.35rem' 
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginLeft: '0.5rem' }}>make-scenario-log.sh</span>
              </div>
              
              {/* Log lines */}
              <div style={{ 
                padding: '0.75rem', 
                fontFamily: 'monospace', 
                fontSize: '0.75rem', 
                color: '#38bdf8', 
                overflowY: 'auto', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.35rem',
                flexGrow: 1
              }}>
                {makeLogs.map((log, index) => {
                  let color = '#38bdf8'; // cyan
                  if (log.includes('✅') || log.includes('🎉')) color = '#4ade80'; // green
                  if (log.includes('🎙️') || log.includes('🧠') || log.includes('⚡')) color = '#c084fc'; // purple
                  if (log.includes('🔍')) color = '#e2e8f0'; // white
                  
                  return (
                    <div key={index} style={{ color, wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                      {log}
                    </div>
                  );
                })}
                {makeLogs.length === 0 && (
                  <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', margin: 'auto' }}>
                    Klicke auf "Szenario ausführen", um die Live-Datenübertragung zu veranschaulichen.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Visueller No-Code Automation Canvas (Feature 1 - v4) */}
      <div className="card" style={{ gridColumn: 'span 2', marginTop: '1.5rem' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="card-title" style={{ color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={20} /> Visueller No-Code Automation Canvas
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Erstelle benutzerdefinierte Automatisierungspfade, konfiguriere KI-Knoten und simuliere die End-to-End Ausführung.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={startCanvasTestRun}
              disabled={canvasTestRunning}
              className="btn btn-primary"
              style={{ 
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))', 
                boxShadow: 'var(--shadow-glow-cyan)',
                border: 'none',
                padding: '0.5rem 1rem',
                fontSize: '0.825rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Play size={14} /> {canvasTestRunning ? 'Testlauf läuft...' : 'Workflow testen'}
            </button>
          </div>
        </div>

        {/* Toolbar & Hinzufügen von Modulen */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', margin: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Knoten hinzufügen:
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => addCanvasNode('email')} className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Plus size={12} /> E-Mail Trigger
            </button>
            <button onClick={() => addCanvasNode('openai')} className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Plus size={12} /> Claude / GPT KI
            </button>
            <button onClick={() => addCanvasNode('datev')} className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Plus size={12} /> DATEV Export
            </button>
            <button onClick={() => addCanvasNode('slack')} className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Plus size={12} /> Slack Alert
            </button>
          </div>
        </div>

        {/* Hauptbereich: Interactive Canvas Grid & Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="canvas-main-grid">
          
          {/* Canvas Zeichenfläche */}
          <div style={{ 
            background: 'rgba(17, 24, 39, 0.6)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '0.75rem', 
            padding: '1.5rem',
            minHeight: '260px',
            display: 'flex',
            alignItems: 'center',
            overflowX: 'auto',
            position: 'relative',
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%', padding: '1rem 0' }}>
              {canvasNodes.map((node, idx) => {
                const isSelected = selectedCanvasNodeId === node.id;
                const isActiveInTest = canvasTestActiveNode === node.id;

                return (
                  <React.Fragment key={node.id}>
                    <div 
                      onClick={() => setSelectedCanvasNodeId(node.id)}
                      style={{ 
                        minWidth: '180px',
                        background: isSelected ? 'rgba(139, 92, 246, 0.08)' : 'rgba(31, 41, 55, 0.8)',
                        border: isActiveInTest 
                          ? '2px solid var(--accent-cyan)' 
                          : isSelected 
                            ? '2px solid var(--accent-purple)' 
                            : '1px solid var(--border-color)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        cursor: 'pointer',
                        boxShadow: isActiveInTest 
                          ? '0 0 20px rgba(6, 182, 212, 0.4)' 
                          : isSelected 
                            ? '0 0 15px rgba(139, 92, 246, 0.3)' 
                            : 'none',
                        transition: 'all 0.3s ease',
                        transform: isSelected || isActiveInTest ? 'scale(1.03)' : 'scale(1)',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ 
                          fontSize: '0.65rem', 
                          padding: '0.15rem 0.4rem', 
                          borderRadius: '0.25rem', 
                          background: node.type === 'trigger' ? 'rgba(59, 130, 246, 0.15)' : node.type === 'ai' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                          color: node.type === 'trigger' ? 'var(--accent-cyan)' : node.type === 'ai' ? 'var(--accent-purple)' : 'var(--accent-green)',
                          fontWeight: 700
                        }}>
                          {node.category}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>#{idx + 1}</span>
                      </div>

                      <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                        {node.title}
                      </h4>

                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.2)', padding: '0.35rem', borderRadius: '0.25rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                        {Object.entries(node.config)[0] ? `${Object.entries(node.config)[0][0]}: ${Object.entries(node.config)[0][1]}` : 'Keine Config'}
                      </div>
                    </div>

                    {/* Verbindungs-Pfeil */}
                    {idx < canvasNodes.length - 1 && (
                      <div style={{ display: 'flex', alignItems: 'center', color: isActiveInTest ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                        <ChevronRight size={24} style={{ animation: isActiveInTest ? 'pulse 1s infinite' : 'none' }} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Rechte Seite: Konfigurations-Panel für den ausgewählten Knoten */}
          <div style={{ background: 'rgba(31, 41, 55, 0.6)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {selectedCanvasNodeId ? (() => {
              const selectedNode = canvasNodes.find(n => n.id === selectedCanvasNodeId);
              if (!selectedNode) return <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Kein Knoten ausgewählt.</div>;

              return (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.35rem', margin: 0 }}>
                      <Sliders size={16} /> Knoten-Einstellungen
                    </h3>
                    <button onClick={() => deleteCanvasNode(selectedNode.id)} className="btn-icon-only" title="Knoten löschen">
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div className="input-group">
                      <label style={{ fontSize: '0.75rem' }}>Knoten-Titel</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem' }}
                        value={selectedNode.title} 
                        onChange={(e) => {
                          setCanvasNodes(canvasNodes.map(n => n.id === selectedNode.id ? { ...n, title: e.target.value } : n));
                        }}
                      />
                    </div>

                    {Object.entries(selectedNode.config).map(([key, val]) => (
                      <div key={key} className="input-group">
                        <label style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>{key}</label>
                        <input 
                          type="text" 
                          className="input-field" 
                          style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem' }}
                          value={val} 
                          onChange={(e) => updateCanvasNodeConfig(selectedNode.id, key, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })() : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', margin: 'auto' }}>
                Klicke auf einen Knoten im Canvas, um seine Parameter zu konfigurieren.
              </div>
            )}

            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              💡 Änderungen werden automatisch im <code>localStorage</code> gesichert.
            </div>
          </div>

        </div>

        {/* Unterer Bereich: Execution Terminal für Custom Canvas Testläufe */}
        {canvasTestLogs.length > 0 && (
          <div style={{ marginTop: '1.25rem', background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0.4rem 0.75rem', fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'monospace', fontWeight: 600 }}>
              ⚡ Custom Canvas Terminal Log
            </div>
            <div style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#e2e8f0', maxHeight: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {canvasTestLogs.map((log, i) => (
                <div key={i} style={{ color: log.includes('🎉') || log.includes('🚀') ? '#4ade80' : '#38bdf8' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* KI-Telefonagent / Voice-AI Simulator (Feature 3 - v4) */}
      <div className="card" style={{ gridColumn: 'span 2', marginTop: '1.5rem' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="card-title" style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={20} /> KI-Telefonagent / Voice-AI Simulator (Retell / Vapi Mock)
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Simuliere automatische KI-Telefonate für Notdienst-Abfragen oder Neukunden-Qualifizierung mit Live-Sprachtranskription.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select 
              className="input-field"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem', width: 'auto' }}
              value={voiceScenario}
              onChange={(e) => setVoiceScenario(e.target.value)}
              disabled={voiceCallActive}
            >
              <option value="notdienst">Szenario 1: Handwerker Notdienst (Rohrbruch)</option>
              <option value="erstkontakt">Szenario 2: Neukunden Erstkontakt (Pflegedienst)</option>
            </select>

            <button 
              onClick={startVoiceCallSimulation}
              disabled={voiceCallActive}
              className="btn btn-primary"
              style={{ 
                background: voiceCallActive ? 'linear-gradient(135deg, #ef4444, #f59e0b)' : 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))', 
                boxShadow: voiceCallActive ? '0 0 15px rgba(239, 68, 68, 0.4)' : '0 0 15px rgba(16, 185, 129, 0.4)',
                border: 'none',
                padding: '0.5rem 1rem',
                fontSize: '0.825rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Phone size={14} /> {voiceCallActive ? 'Anruf läuft...' : 'Anruf starten (Simulieren)'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }} className="make-simulator-grid">
          
          {/* Linke Seite: Telefonat Interface & Audio Wave */}
          <div style={{ background: 'rgba(17, 24, 39, 0.6)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Live Audio-Stream & Spracherkennung
                </span>
                <span style={{ 
                  fontSize: '0.7rem', 
                  padding: '0.15rem 0.5rem', 
                  borderRadius: '0.25rem', 
                  background: voiceCallActive ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: voiceCallActive ? 'var(--accent-red)' : 'var(--accent-green)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Volume2 size={12} /> {voiceCallActive ? '● ANRUF AKTIV' : '○ BEREIT'}
                </span>
              </div>

              {/* Audio Soundwave Animation */}
              <div className={`voice-wave-container ${voiceCallActive ? 'active' : ''}`}>
                <div className="voice-wave-bar"></div>
                <div className="voice-wave-bar"></div>
                <div className="voice-wave-bar"></div>
                <div className="voice-wave-bar"></div>
                <div className="voice-wave-bar"></div>
              </div>

              {/* Transkript Stream */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minHeight: '160px', maxHeight: '220px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                {voiceTranscript.map((item, index) => (
                  <div key={index} style={{ 
                    alignSelf: item.speaker === 'agent' ? 'flex-start' : 'flex-end',
                    background: item.speaker === 'agent' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(6, 182, 212, 0.15)',
                    border: item.speaker === 'agent' ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(6, 182, 212, 0.3)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    maxWidth: '90%',
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)'
                  }}>
                    <div>{item.text}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.15rem' }}>{item.time}</div>
                  </div>
                ))}
                {voiceTranscript.length === 0 && (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', margin: 'auto', fontStyle: 'italic' }}>
                    Klicke auf "Anruf starten", um das KI-Telefonat live zu simulieren.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rechte Seite: Automatische Daten-Extraktion & CRM Ergebnisse */}
          <div style={{ background: 'rgba(31, 41, 55, 0.6)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                📊 KI-Ergebnis & CRM-Übernahme
              </h3>

              {voiceExtractedData ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-green)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                      Erfasster Anrufer
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{voiceExtractedData.anrufer}</span>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                      Extrahiertes Anliegen
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{voiceExtractedData.anliegen}</span>
                  </div>

                  <div style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-purple)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                      Automatische Folge-Aktion
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 500 }}>{voiceExtractedData.aktion}</span>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', margin: 'auto', padding: '2rem 0', fontStyle: 'italic' }}>
                  {voiceCallActive ? '⌛ KI analysiert das laufende Gespräch...' : 'Starte ein Telefonat, um die automatische Extraktion zu sehen.'}
                </div>
              )}
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              💡 Nach dem Telefonat wird das Ergebnis automatisch in deine Inbox & das CRM übertragen.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

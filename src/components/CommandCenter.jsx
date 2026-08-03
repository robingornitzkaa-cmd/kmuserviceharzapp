import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Plus, 
  Trash2, 
  ClipboardCopy, 
  Database, 
  Download, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  BrainCircuit, 
  Info,
  ChevronDown,
  ChevronUp,
  Calendar,
  ShieldCheck,
  DollarSign,
  Building,
  Award,
  CheckSquare,
  Clock,
  X,
  Edit3,
  UserCheck
} from 'lucide-react';

import { askFirmengehirn } from '../services/gemini';

export const CommandCenter = ({
  docs,
  setDocs,
  isOnline,
  ragPersona,
  setRagPersona,
  geminiApiKey
}) => {
  const logbuchDoc = docs.find(d => d.id === 'master-logbuch');
  const logbuchContent = logbuchDoc?.content || '';

  // Local state for UI
  const [statusTodos, setStatusTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [copiedStatus, setCopiedStatus] = useState(false);

  // Accordion Sections State
  const [openSections, setOpenSections] = useState({
    milestones: true,
    pricing: true,
    setup: false,
    history: false,
    rawText: false
  });

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Meeting Capture Modal State
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetingDate, setMeetingDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [meetingTopic, setMeetingTopic] = useState('');
  const [meetingResults, setMeetingResults] = useState('');
  const [meetingTodosText, setMeetingTodosText] = useState('');

  // 1. Parsen der To-Dos aus TEIL 7
  const parseLogbuchTodos = (content) => {
    if (!content) return [];
    const lines = content.split('\n');
    const todos = [];
    let inTeil7 = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('## **TEIL 7: OPERATIVE TO-DO-LISTE')) {
        inTeil7 = true;
        continue;
      }
      if (inTeil7 && line.startsWith('##')) {
        break;
      }
      if (inTeil7) {
        const match = line.match(/^\s*[\*\-]\s*(?:\*\*|)?\[([ xX])\](?:\*\*|)?\s*(.*)$/);
        if (match) {
          const completed = match[1].toLowerCase() === 'x';
          const text = match[2].trim();
          todos.push({
            id: 'logtodo_' + i,
            lineIndex: i,
            text: text,
            completed: completed
          });
        }
      }
    }
    return todos;
  };

  // 2. Parsen der Strategie-Variablen aus TEIL 9
  const parseStrategyVars = (content) => {
    const defaultVars = {
      pricingStatus: '[Fokus für das nächste Meeting: Werden die Sätze von 500 € / 2.000 € / 200 € vom Berater freigegeben oder angepasst?]',
      targetDate: '[Hier das exakte Datum eintragen, sobald das Jobcenter grünes Licht gibt]',
      stammkapital: '[Echtes Stammkapital bei Bar-Einbringung eintragen – z. B. 500 € oder 1.000 €]',
      bankKonto: '[Noch offen – engere Auswahl: Finom oder Qonto (wird nach Notartermin fixiert)]',
      notariat: '[Name der Kanzlei und Ort eintragen, sobald der Termin zur UG-Errichtung steht]',
      einstiegsgeldStatus: '[Beantragt am: Datum] | Status: [In Vorbereitung / In Prüfung]',
      tragfaehigkeitStatus: '[Ausgestellt durch fachkundige Stelle: Name/Institution] | Status: [In Bearbeitung – Businessplan liegt vor]',
      sachmittelStatus: '[Beantragt am: Datum] | Status: [Warten auf Bewilligung]'
    };

    if (!content) return defaultVars;
    const lines = content.split('\n');
    
    for (let line of lines) {
      if (line.includes('**Preisanpassungen nach Coach-Sparring:**')) {
        defaultVars.pricingStatus = line.split('**Preisanpassungen nach Coach-Sparring:**')[1].trim().replace(/^`|`$/g, '');
      } else if (line.includes('**Geplantes Gründungsdatum (Gewerbe-Anmeldung):**')) {
        defaultVars.targetDate = line.split('**Geplantes Gründungsdatum (Gewerbe-Anmeldung):**')[1].trim().replace(/^`|`$/g, '');
      } else if (line.includes('**Definiertes Stammkapital der UG:**')) {
        defaultVars.stammkapital = line.split('**Definiertes Stammkapital der UG:**')[1].trim().replace(/^`|`$/g, '');
      } else if (line.includes('**Gewähltes B2B-Geschäftskonto:**')) {
        defaultVars.bankKonto = line.split('**Gewähltes B2B-Geschäftskonto:**')[1].trim().replace(/^`|`$/g, '');
      } else if (line.includes('**Beauftragtes Notariat:**')) {
        defaultVars.notariat = line.split('**Beauftragtes Notariat:**')[1].trim().replace(/^`|`$/g, '');
      } else if (line.includes('**Status Beantragung Einstiegsgeld:**')) {
        defaultVars.einstiegsgeldStatus = line.split('**Status Beantragung Einstiegsgeld:**')[1].trim().replace(/^`|`$/g, '');
      } else if (line.includes('**Status Tragfähigkeitsbescheinigung:**')) {
        defaultVars.tragfaehigkeitStatus = line.split('**Status Tragfähigkeitsbescheinigung:**')[1].trim().replace(/^`|`$/g, '');
      } else if (line.includes('**Status Jobcenter-Sachmittelzuschuss (Verschlüsseltes Notebook):**')) {
        defaultVars.sachmittelStatus = line.split('**Status Jobcenter-Sachmittelzuschuss (Verschlüsseltes Notebook):**')[1].trim().replace(/^`|`$/g, '');
      }
    }
    return defaultVars;
  };

  // 3. Parsen der bisherigen Meeting-Einträge aus TEIL 8
  const parseLogbuchEntries = (content) => {
    if (!content) return [];
    const lines = content.split('\n');
    const entries = [];
    let inTeil8 = false;
    let currentEntry = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('## **TEIL 8: CHRONOLOGISCHES GRÜNDUNGS-LOGBUCH')) {
        inTeil8 = true;
        continue;
      }
      if (inTeil8 && line.startsWith('## ') && !line.includes('TEIL 8')) {
        break;
      }
      if (inTeil8) {
        if (line.startsWith('### ')) {
          if (currentEntry) entries.push(currentEntry);
          currentEntry = { title: line.replace('### ', '').replace(/\*\*/g, '').trim(), details: [] };
        } else if (currentEntry && line.trim()) {
          currentEntry.details.push(line.trim());
        }
      }
    }
    if (currentEntry) entries.push(currentEntry);
    return entries;
  };

  useEffect(() => {
    const todos = parseLogbuchTodos(logbuchContent);
    setStatusTodos(todos);
  }, [logbuchContent]);

  const strategyVars = parseStrategyVars(logbuchContent);
  const logbuchEntries = parseLogbuchEntries(logbuchContent);

  // Firmengehirn Quick Q&A State
  const [qaQuestion, setQaQuestion] = useState('');
  const [qaAnswer, setQaAnswer] = useState(null);
  const [qaSource, setQaSource] = useState('');
  const [isQaLoading, setIsQaLoading] = useState(false);

  const handleAskFirmengehirn = async (e) => {
    e.preventDefault();
    if (!qaQuestion.trim()) return;

    setIsQaLoading(true);
    setQaAnswer(null);

    const allDocsCombined = docs.map(d => `=== ${d.title} ===\n${d.content}`).join('\n\n');

    try {
      const res = await askFirmengehirn({
        question: qaQuestion.trim(),
        docsContent: allDocsCombined,
        geminiApiKey: geminiApiKey
      });

      setQaAnswer(res.text);
      setQaSource(res.source);
    } catch (err) {
      setQaAnswer("Fehler beim Abrufen der KI-Antwort: " + err.message);
      setQaSource("Fehler");
    } finally {
      setIsQaLoading(false);
    }
  };

  // Helper: Prüft, ob ein Wert noch Platzhalter enthält
  const isPlaceholder = (val) => {
    if (!val) return true;
    return val.includes('[') && val.includes(']');
  };

  // Dynamischer Readiness Score
  const varKeys = [
    strategyVars.pricingStatus,
    strategyVars.targetDate,
    strategyVars.stammkapital,
    strategyVars.bankKonto,
    strategyVars.notariat,
    strategyVars.einstiegsgeldStatus,
    strategyVars.tragfaehigkeitStatus,
    strategyVars.sachmittelStatus
  ];
  const fixedCount = varKeys.filter(v => !isPlaceholder(v)).length;
  const readinessScore = Math.round((fixedCount / varKeys.length) * 100);

  // Schreiber-Hilfsfunktion für Variablen mit automatischem Folge-Task Trigger
  const updateLogbuchVariable = (prefix, newValue) => {
    const lines = logbuchContent.split('\n');
    let updated = false;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(`**${prefix}:**`)) {
        lines[i] = `* **${prefix}:** \`${newValue}\``;
        updated = true;
        break;
      }
    }

    if (updated) {
      // Automatischen Folge-Task erzeugen (Cross-Document Trigger)
      const followUpTaskText = `[Businessplan-Update] Ära ${prefix} (${newValue}) im Businessplan & ROI-Rechner nachziehen.`;
      
      let teil7HeaderIndex = -1;
      let alreadyExists = false;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('## **TEIL 7: OPERATIVE TO-DO-LISTE')) {
          teil7HeaderIndex = i;
        }
        if (lines[i].includes(`[Businessplan-Update] Ära ${prefix}`)) {
          alreadyExists = true;
        }
      }

      if (!alreadyExists && teil7HeaderIndex !== -1) {
        lines.splice(teil7HeaderIndex + 2, 0, `* [ ] ${followUpTaskText}`);
      }

      const newContent = lines.join('\n');
      setDocs(prev => prev.map(d => 
        d.id === 'master-logbuch' 
          ? { ...d, content: newContent, status: d.status === 'synced' ? 'modified' : d.status } 
          : d
      ));
    }
  };

  // To-Do Handler
  const toggleStatusTodo = (id) => {
    const todo = statusTodos.find(t => t.id === id);
    if (!todo) return;

    const newCompleted = !todo.completed;
    const lines = logbuchContent.split('\n');
    const lineIndex = todo.lineIndex;
    
    if (lineIndex >= 0 && lineIndex < lines.length) {
      const line = lines[lineIndex];
      let updatedLine = line;
      if (newCompleted) {
        updatedLine = line.replace(/\[\s*\]/, '[x]').replace(/\[\s*X\s*\]/i, '[x]');
      } else {
        updatedLine = line.replace(/\[\s*[xX]\s*\]/, '[ ]');
      }
      lines[lineIndex] = updatedLine;
      const newContent = lines.join('\n');
      
      setDocs(prev => prev.map(d => 
        d.id === 'master-logbuch' 
          ? { ...d, content: newContent, status: d.status === 'synced' ? 'modified' : d.status } 
          : d
      ));
    }
  };

  const handleAddStatusTodo = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const lines = logbuchContent.split('\n');
    let inTeil7 = false;
    let lastTodoIndex = -1;
    let teil7HeaderIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('## **TEIL 7: OPERATIVE TO-DO-LISTE')) {
        inTeil7 = true;
        teil7HeaderIndex = i;
        continue;
      }
      if (inTeil7 && line.startsWith('##')) {
        break;
      }
      if (inTeil7 && line.match(/^\s*[\*\-]\s*(?:\*\*|)?\[([ xX])\]/)) {
        lastTodoIndex = i;
      }
    }

    const newLine = `* [ ] ${newTodoText.trim()}`;
    if (lastTodoIndex !== -1) {
      lines.splice(lastTodoIndex + 1, 0, newLine);
    } else if (teil7HeaderIndex !== -1) {
      lines.splice(teil7HeaderIndex + 2, 0, newLine);
    } else {
      lines.push('');
      lines.push('## **TEIL 7: OPERATIVE TO-DO-LISTE (Sachen, die zu erledigen sind)**');
      lines.push('');
      lines.push(newLine);
    }

    const newContent = lines.join('\n');
    setDocs(prev => prev.map(d => 
      d.id === 'master-logbuch' 
        ? { ...d, content: newContent, status: d.status === 'synced' ? 'modified' : d.status } 
        : d
    ));
    setNewTodoText('');
  };

  const handleDeleteStatusTodo = (id) => {
    const todo = statusTodos.find(t => t.id === id);
    if (!todo) return;

    const lines = logbuchContent.split('\n');
    const lineIndex = todo.lineIndex;

    if (lineIndex >= 0 && lineIndex < lines.length) {
      lines.splice(lineIndex, 1);
      const newContent = lines.join('\n');
      setDocs(prev => prev.map(d => 
        d.id === 'master-logbuch' 
          ? { ...d, content: newContent, status: d.status === 'synced' ? 'modified' : d.status } 
          : d
      ));
    }
  };

  // Meeting Speichern Handler
  const handleSaveMeeting = (e) => {
    e.preventDefault();
    if (!meetingTopic.trim()) return;

    const formattedDate = meetingDate ? new Date(meetingDate).toLocaleDateString('de-DE') : new Date().toLocaleDateString('de-DE');
    
    // Parse new todos input line by line
    const rawTodos = meetingTodosText
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const todoLinesFormatted = rawTodos.map((t, idx) => `   ${idx + 1}. ${t}`).join('\n');

    const newMeetingBlock = `\n### **📝 Eintrag vom ${formattedDate}: ${meetingTopic.trim()}**\n\n* **Status Quo der Besprechung:** ${meetingResults.trim() || 'Besprechung der Gründungsschritte.'}\n* **Zentraler Diskussionspunkt:** ${meetingTopic.trim()}\n* **Definierte Next Steps / Vereinbarte Hausaufgaben:**\n${todoLinesFormatted || '   1. Nächste Schritte vorbereiten.'}\n`;

    const lines = logbuchContent.split('\n');
    let inTeil8 = false;
    let insertIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('## **TEIL 8: CHRONOLOGISCHES GRÜNDUNGS-LOGBUCH')) {
        inTeil8 = true;
        insertIndex = i + 1;
        break;
      }
    }

    if (insertIndex !== -1) {
      lines.splice(insertIndex, 0, newMeetingBlock);
    } else {
      lines.push(newMeetingBlock);
    }

    // Neue Hausaufgaben auch in TEIL 7 als To-Dos einfügen
    if (rawTodos.length > 0) {
      let teil7HeaderIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('## **TEIL 7: OPERATIVE TO-DO-LISTE')) {
          teil7HeaderIndex = i;
          break;
        }
      }
      if (teil7HeaderIndex !== -1) {
        rawTodos.forEach((t, i) => {
          lines.splice(teil7HeaderIndex + 2 + i, 0, `* [ ] ${t}`);
        });
      }
    }

    const newContent = lines.join('\n');
    setDocs(prev => prev.map(d => 
      d.id === 'master-logbuch' 
        ? { ...d, content: newContent, status: d.status === 'synced' ? 'modified' : d.status } 
        : d
    ));

    // Reset Form & Close Modal
    setMeetingTopic('');
    setMeetingResults('');
    setMeetingTodosText('');
    setIsMeetingModalOpen(false);
    alert('✅ Coach-Termin erfolgreich im Logbuch dokumentiert und To-Dos übernommen!');
  };

  const generateStatusMarkdown = () => {
    const openTodos = statusTodos.filter(t => !t.completed);
    const doneTodos = statusTodos.filter(t => t.completed);

    return `# 🚀 KMU Service Harz – Master Command Center & Live Status

## 📊 Aktueller Projektstatus & Bereit-Score
- **Gründungs-Bereitschaft:** ${readinessScore}% (${fixedCount} von ${varKeys.length} Kern-Parametern fixiert)
- **Projekt-Phase:** Phase 1 (Security Hardening) & Phase 2 (Modularisierung) zu 100% ABGESCHLOSSEN.
- **Vercel Deployment:** Lokal gebaut & getestet (Vitest 8/8 grün). Bereit für \`git push\`.
- **Kaltakquise-Datenbank:** 90 echte Leads in Supabase (\`public.leads\`) live angebunden.
- **Google Drive Live-Sync:** Inklusive OAuth2 Token-Client angebunden.
- **Letzte Aktualisierung:** ${new Date().toLocaleDateString('de-DE')}

---

## 🎯 Offene & Erledigte Aufgaben (To-Dos)

### 🔴 Offene Aufgaben (${openTodos.length})
${openTodos.map(t => `- [ ] ${t.text}`).join('\n') || '- Keine offenen Aufgaben.'}

### 🟢 Erledigte Aufgaben (${doneTodos.length})
${doneTodos.map(t => `- [x] ${t.text}`).join('\n') || '- Keine erledigten Aufgaben.'}

---

## 🏛️ Formelle Strategie-Variablen
- **Preisanpassungen:** ${strategyVars.pricingStatus}
- **Geplantes Gründungsdatum:** ${strategyVars.targetDate}
- **Stammkapital der UG:** ${strategyVars.stammkapital}
- **B2B-Geschäftskonto:** ${strategyVars.bankKonto}
- **Notariat:** ${strategyVars.notariat}
- **Status Einstiegsgeld:** ${strategyVars.einstiegsgeldStatus}
- **Status Tragfähigkeitsbescheinigung:** ${strategyVars.tragfaehigkeitStatus}
- **Status Sachmittelzuschuss:** ${strategyVars.sachmittelStatus}
`;
  };

  const copyStatusMdToClipboard = () => {
    const content = generateStatusMarkdown();
    navigator.clipboard.writeText(content);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  const downloadStatusMdFile = () => {
    const content = generateStatusMarkdown();
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "STATUS.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="command-center-container" style={{ paddingBottom: '3rem' }}>
      
      {/* Header mit Titel & Schnell-Aktionen */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Zap size={32} style={{ color: 'var(--accent-indigo)' }} />
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: 'white' }}>Gründung & Business Command Center</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Strukturierte Gründung, Coach-Mitschriften und automatische Google Drive Live-Synchronisation.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setIsMeetingModalOpen(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, var(--accent-indigo), #4f46e5)', border: 'none', fontWeight: 700, padding: '0.5rem 0.9rem' }}
          >
            <UserCheck size={18} />
            + Coach-Termin eintragen
          </button>
          
          <button 
            onClick={copyStatusMdToClipboard}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
          >
            <ClipboardCopy size={16} />
            {copiedStatus ? 'Kopiert!' : 'NotebookLM Copy'}
          </button>

          <button 
            onClick={downloadStatusMdFile}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
          >
            <Download size={16} />
            Export .md
          </button>
        </div>
      </div>

      {/* Gründungs-Bereitschafts-Score Progress Bar */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(163, 116, 255, 0.05))', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} style={{ color: 'var(--accent-cyan)' }} />
            <strong style={{ color: 'white', fontSize: '0.95rem' }}>Gründungs-Bereitschafts-Score:</strong>
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: readinessScore >= 75 ? 'var(--accent-green)' : readinessScore >= 40 ? 'var(--accent-yellow)' : 'var(--accent-cyan)' }}>
            {readinessScore}% ({fixedCount} / {varKeys.length} Parameter fixiert)
          </span>
        </div>
        
        {/* Progress Bar Track */}
        <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${readinessScore}%`, 
            height: '100%', 
            background: readinessScore >= 75 ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #6366f1, #06b6d4)', 
            transition: 'width 0.4s ease' 
          }} />
        </div>
      </div>

      {/* Schnellfrage an das KI-Firmengehirn */}
      <div className="card" style={{ background: 'rgba(163, 116, 255, 0.04)', border: '1px solid rgba(163, 116, 255, 0.2)', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <BrainCircuit size={22} style={{ color: 'var(--accent-purple)' }} />
          <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'white' }}>Schnellfrage an dein KI-Firmengehirn</h3>
          <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '0.2rem', background: 'rgba(163, 116, 255, 0.15)', color: 'var(--accent-purple)' }}>
            RAG Live-Suche
          </span>
        </div>

        <form onSubmit={handleAskFirmengehirn} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Stelle eine Frage zu deinen Dokumenten (z.B.: Wie sieht es mit den Fördermitteln aus?)"
            value={qaQuestion}
            onChange={(e) => setQaQuestion(e.target.value)}
            style={{ flexGrow: 1 }}
          />
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isQaLoading}
            style={{ background: 'var(--accent-purple)', border: 'none', minWidth: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          >
            {isQaLoading ? 'Sucht...' : 'Fragen'}
          </button>
        </form>

        {qaAnswer && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(163, 116, 255, 0.3)', borderRadius: '0.5rem', fontSize: '0.85rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.7rem', color: 'var(--accent-purple)', fontWeight: 700 }}>
              <span>🧠 Antwort von deinem Firmengehirn:</span>
              <span>Quelle: {qaSource}</span>
            </div>
            {qaAnswer}
          </div>
        )}
      </div>

      {/* Modal: Coach-Termin Mitschrift eintragen */}
      {isMeetingModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '550px', background: '#1e1e2e', border: '1px solid var(--accent-indigo)', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-indigo)', fontSize: '1.1rem' }}>
                <UserCheck size={20} />
                Neues Beratungsergebnis / Coach-Termin
              </h3>
              <button onClick={() => setIsMeetingModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveMeeting} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Datum des Termins</label>
                <input 
                  type="date" 
                  className="input-field" 
                  value={meetingDate} 
                  onChange={(e) => setMeetingDate(e.target.value)} 
                  required 
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Hauptthema / Kernfrage</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="z.B. MVP Preispakete & Rechtsform UG vs. Einzelunternehmen" 
                  value={meetingTopic} 
                  onChange={(e) => setMeetingTopic(e.target.value)} 
                  required 
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Status Quo & Erzielte Ergebnisse</label>
                <textarea 
                  className="input-field" 
                  placeholder="Was hat der Coach empfohlen? Welche Bedenken oder Freigaben gab es?" 
                  value={meetingResults} 
                  onChange={(e) => setMeetingResults(e.target.value)} 
                  rows={3}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Neue Hausaufgaben / To-Dos (Eine pro Zeile)</label>
                <textarea 
                  className="input-field" 
                  placeholder="1. MVP Modulbeschreibung verfassen&#10;2. Antragsformular Digitalbonus herunterladen" 
                  value={meetingTodosText} 
                  onChange={(e) => setMeetingTodosText(e.target.value)} 
                  rows={3}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsMeetingModalOpen(false)} className="btn btn-secondary">Abbrechen</button>
                <button type="submit" className="btn btn-primary" style={{ background: 'var(--accent-indigo)' }}>Im Logbuch Speichern</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Haupt-Layout im Akkordeon-Stil */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* KACHEL 1: 🎯 Meilensteine & Hausaufgaben (Teil 7) */}
        <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}>
          <div 
            onClick={() => toggleSection('milestones')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          >
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.1rem' }}>
              <CheckSquare size={20} style={{ color: 'var(--accent-indigo)' }} />
              1. Meilensteine & Hausaufgaben (Teil 7)
              <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '0.25rem', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-indigo)' }}>
                {statusTodos.filter(t => !t.completed).length} offen / {statusTodos.length} gesamt
              </span>
            </h2>
            {openSections.milestones ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {openSections.milestones && (
            <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
              <form onSubmit={handleAddStatusTodo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Neuen Meilenstein hinzufügen (z.B. [Business] Notar-Termin vereinbaren)..."
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  style={{ flexGrow: 1 }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0 0.85rem', background: 'var(--accent-indigo)', border: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Plus size={16} /> Hinzufügen
                </button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '350px', overflowY: 'auto' }}>
                {statusTodos.map(t => {
                  const isBusiness = t.id.startsWith('st_bus') || t.text.includes('[Prio') || t.text.includes('MVP');
                  return (
                    <div 
                      key={t.id} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        padding: '0.55rem 0.75rem', 
                        background: t.completed ? 'rgba(255,255,255,0.01)' : isBusiness ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.03)', 
                        border: isBusiness && !t.completed ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid var(--border-color)', 
                        borderRadius: '0.5rem' 
                      }}
                    >
                      <label 
                        htmlFor={t.id}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer', flexGrow: 1, margin: 0 }}
                      >
                        <input
                          id={t.id}
                          type="checkbox"
                          checked={t.completed}
                          onChange={() => toggleStatusTodo(t.id)}
                          style={{ width: '1.05rem', height: '1.05rem', accentColor: 'var(--accent-indigo)', cursor: 'pointer' }}
                        />
                        <span style={{ 
                          fontSize: '0.85rem', 
                          color: t.completed ? 'var(--text-muted)' : 'white',
                          textDecoration: t.completed ? 'line-through' : 'none',
                          fontWeight: t.completed ? 400 : 600
                        }}>
                          {isBusiness && <span style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem', marginRight: '0.35rem', textTransform: 'uppercase', fontWeight: 800 }}>[Business]</span>}
                          {t.text}
                        </span>
                      </label>
                      <button 
                        onClick={() => handleDeleteStatusTodo(t.id)} 
                        title="Aufgabe löschen"
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* KACHEL 2: 💡 MVP & Preispakete (500 € / 2.000 € / 200 €) */}
        <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}>
          <div 
            onClick={() => toggleSection('pricing')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          >
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.1rem' }}>
              <DollarSign size={20} style={{ color: 'var(--accent-cyan)' }} />
              2. MVP & Preispakete (Angebotsstruktur)
              <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '0.25rem', background: isPlaceholder(strategyVars.pricingStatus) ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: isPlaceholder(strategyVars.pricingStatus) ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 700 }}>
                {isPlaceholder(strategyVars.pricingStatus) ? '🔴 In Klärung mit Coach' : '🟢 Fixiert'}
              </span>
            </h2>
            {openSections.pricing ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {openSections.pricing && (
            <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                
                <div style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '0.85rem', borderRadius: '0.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>PAKET 1: QUICK-WIN AUDIT</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', margin: '0.2rem 0' }}>500 € <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>(Einmalig)</span></div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>5 Std. Bürozeit-Analyse, Lexoffice/DATEV-Check, konkreter Digitalisierungs-Fahrplan.</p>
                </div>

                <div style={{ background: 'rgba(163, 116, 255, 0.05)', border: '1px solid rgba(163, 116, 255, 0.2)', padding: '0.85rem', borderRadius: '0.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 700 }}>PAKET 2: SETUP-PROJEKT</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', margin: '0.2rem 0' }}>2.000 € <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>(Einmalig)</span></div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Vollständige Ersteinrichtung der Software-Schnittstellen & Make.com Automation.</p>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.85rem', borderRadius: '0.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 700 }}>PAKET 3: MONATS-SUPPORT</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', margin: '0.2rem 0' }}>200 € <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ Monat</span></div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Laufende Betreuung, Workflow-Monitoring & System-Anpassungen.</p>
                </div>

              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                  <strong>Status & Anmerkung zum Pricing-Sparring:</strong>
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={strategyVars.pricingStatus}
                  onChange={(e) => updateLogbuchVariable('Preisanpassungen nach Coach-Sparring', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* KACHEL 3: 🏛️ Formeller Gründungsfahrplan & Behörden (Teil 9) */}
        <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}>
          <div 
            onClick={() => toggleSection('setup')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          >
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.1rem' }}>
              <Building size={20} style={{ color: 'var(--accent-purple)' }} />
              3. Formeller Gründungsfahrplan & Behörden (Teil 9)
              <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '0.25rem', background: 'rgba(163, 116, 255, 0.15)', color: 'var(--accent-purple)' }}>
                Interaktiver Parameter-Editor
              </span>
            </h2>
            {openSections.setup ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {openSections.setup && (
            <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>📅 Geplantes Gründungsdatum</label>
                    <span style={{ fontSize: '0.65rem', color: isPlaceholder(strategyVars.targetDate) ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                      {isPlaceholder(strategyVars.targetDate) ? 'Offen' : 'Fixiert'}
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input-field"
                    value={strategyVars.targetDate}
                    onChange={(e) => updateLogbuchVariable('Geplantes Gründungsdatum (Gewerbe-Anmeldung)', e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>💰 Stammkapital der UG</label>
                    <span style={{ fontSize: '0.65rem', color: isPlaceholder(strategyVars.stammkapital) ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                      {isPlaceholder(strategyVars.stammkapital) ? 'Offen' : 'Fixiert'}
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input-field"
                    value={strategyVars.stammkapital}
                    onChange={(e) => updateLogbuchVariable('Definiertes Stammkapital der UG', e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>🏦 B2B-Geschäftskonto</label>
                    <span style={{ fontSize: '0.65rem', color: isPlaceholder(strategyVars.bankKonto) ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                      {isPlaceholder(strategyVars.bankKonto) ? 'Offen' : 'Fixiert'}
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input-field"
                    value={strategyVars.bankKonto}
                    onChange={(e) => updateLogbuchVariable('Gewähltes B2B-Geschäftskonto', e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>⚖️ Beauftragtes Notariat</label>
                    <span style={{ fontSize: '0.65rem', color: isPlaceholder(strategyVars.notariat) ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                      {isPlaceholder(strategyVars.notariat) ? 'Offen' : 'Fixiert'}
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input-field"
                    value={strategyVars.notariat}
                    onChange={(e) => updateLogbuchVariable('Beauftragtes Notariat', e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>Jobcenter & Förderanträge Status</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.15rem' }}>Status Einstiegsgeld</label>
                    <input
                      type="text"
                      className="input-field"
                      value={strategyVars.einstiegsgeldStatus}
                      onChange={(e) => updateLogbuchVariable('Status Beantragung Einstiegsgeld', e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.15rem' }}>Status Tragfähigkeitsbescheinigung</label>
                    <input
                      type="text"
                      className="input-field"
                      value={strategyVars.tragfaehigkeitStatus}
                      onChange={(e) => updateLogbuchVariable('Status Tragfähigkeitsbescheinigung', e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.15rem' }}>Status Sachmittelzuschuss (Laptop)</label>
                    <input
                      type="text"
                      className="input-field"
                      value={strategyVars.sachmittelStatus}
                      onChange={(e) => updateLogbuchVariable('Status Jobcenter-Sachmittelzuschuss (Verschlüsseltes Notebook)', e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* KACHEL 4: 📜 Chronologisches Logbuch & Historie (Teil 8) */}
        <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}>
          <div 
            onClick={() => toggleSection('history')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          >
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.1rem' }}>
              <Clock size={20} style={{ color: 'var(--accent-green)' }} />
              4. Chronologisches Gründungsprotokoll ({logbuchEntries.length} Termine)
            </h2>
            {openSections.history ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {openSections.history && (
            <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {logbuchEntries.map((entry, index) => (
                <div key={index} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.85rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-green)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                    {entry.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {entry.details.map((d, i) => (
                      <div key={i} style={{ marginBottom: '0.2rem' }}>{d}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* KACHEL 5: 📄 masterLogbuch.txt (Roh-Text & Editor) */}
        <div className="card" style={{ background: 'rgba(163, 116, 255, 0.03)', border: '1px solid rgba(163, 116, 255, 0.15)' }}>
          <div 
            onClick={() => toggleSection('rawText')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          >
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.1rem', color: 'var(--accent-purple)' }}>
              <FileText size={20} />
              5. masterLogbuch.txt (Vollständiger Roh-Text & Editor)
            </h2>
            {openSections.rawText ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {openSections.rawText && (
            <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(163, 116, 255, 0.15)', paddingTop: '1rem' }}>
              <textarea
                className="input-field"
                style={{ width: '100%', height: '360px', fontFamily: 'monospace', fontSize: '0.8rem', resize: 'vertical', lineHeight: '1.4', background: 'rgba(0,0,0,0.25)' }}
                placeholder="Schreibe hier deinen aktuellen Stand hinein..."
                value={logbuchContent}
                onChange={(e) => {
                  const newContent = e.target.value;
                  setDocs(prev => prev.map(d => 
                    d.id === 'master-logbuch' 
                      ? { ...d, content: newContent, status: d.status === 'synced' ? 'modified' : d.status } 
                      : d
                  ));
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>Zeichen: {logbuchContent.length}</span>
                <span style={{ color: logbuchDoc?.status === 'synced' ? 'var(--accent-green)' : 'var(--accent-yellow)' }}>
                  Status: {logbuchDoc?.status === 'synced' ? '✅ Synchronisiert' : '☁️ Nur Lokal (Ungespeichert)'}
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  Users, 
  BrainCircuit, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Calendar, 
  CheckSquare, 
  ClipboardCopy, 
  ChevronRight, 
  Upload, 
  ExternalLink, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle,
  FileText
} from 'lucide-react';

// INITIAL DATA FOR FIRST LAUNCH
const INITIAL_HABITS = [
  { id: 'h1', text: '3 Akquise-Mails gesendet?', completed: false },
  { id: 'h2', text: 'Sport gemacht (30 Min)?', completed: false },
  { id: 'h3', text: 'Tagesfokus-Aufgaben definiert?', completed: false }
];

const INITIAL_FOCUS_TASKS = [
  { id: 'f1', text: 'Konzept Founder OS finalisieren', completed: true },
  { id: 'f2', text: 'Multiplikatoren-Liste (15 Steuerberater) erstellen', completed: false },
  { id: 'f3', text: 'Kennenlern-Workshop GoClean vorbereiten', completed: false }
];

const INITIAL_INBOX = [
  { id: 'i1', text: 'Notiz: Fördermittel-Antrag für Digitalbonus Niedersachsen hat neue Richtlinien ab Juli. Unbedingt prüfen!', date: '2026-06-24' },
  { id: 'i2', text: 'Idee: Einen automatischen WhatsApp-Bot für Handwerker als Einstiegs-Produkt anbieten (z.B. für Terminbuchungen).', date: '2026-06-23' },
  { id: 'i3', text: 'Notiz: Steuerberater Klinke in Wernigerode kontaktieren. Eventuell Kooperation möglich.', date: '2026-06-22' }
];

const INITIAL_TASKS = [
  { id: 't1', title: 'Make-Szenario für Beleg-Upload via Mail bauen', priority: 'high', column: 'todo', date: '2026-06-24' },
  { id: 't2', title: 'Rechnungsvorlage auf E-Rechnungs-XML-Standard (ZUGFeRD) anpassen', priority: 'medium', column: 'inprogress', date: '2026-06-22' },
  { id: 't3', title: 'Erste Case Study für GoClean Harz schreiben', priority: 'high', column: 'idea', date: '2026-06-21' },
  { id: 't4', title: 'Unternehmen als UG im Handelsregister eintragen', priority: 'high', column: 'done', date: '2026-06-15' }
];

const INITIAL_CONTACTS = [
  { id: 'c1', name: 'Hans Müller', company: 'Dachdeckerei Müller', industry: 'Handwerk', system: 'DATEV', stage: 'gespräch', lastContact: '2026-06-08' }, // >14 days ago!
  { id: 'c2', name: 'Sabine Kraft', company: 'Pflegedienst Harz', industry: 'Gesundheit', system: 'Lexoffice', stage: 'angebot', lastContact: '2026-06-20' },
  { id: 'c3', name: 'Christian Gornitzka', company: 'GoClean Harz', industry: 'Dienstleistungen', system: 'DATEV & Excel', stage: 'umsetzung', lastContact: '2026-06-24' }
];

const INITIAL_PROJECTS = [
  { id: 'p1', client: 'Dachdeckerei Müller', offerSigned: true, subsidyApplied: true, subsidyApproved: false, ready: false },
  { id: 'p2', client: 'Pflegedienst Harz', offerSigned: false, subsidyApplied: false, subsidyApproved: false, ready: false },
  { id: 'p3', client: 'GoClean Harz', offerSigned: true, subsidyApplied: true, subsidyApproved: true, ready: true }
];

const INITIAL_PROMPTS = [
  { id: 'pr1', title: 'Kaltakquise E-Mail (Handwerk)', category: 'Sales', text: 'Du bist ein erfahrener Copywriter. Schreibe eine kurze, pragmatische E-Mail an einen Handwerksmeister (Dachdecker/Elektro), der unter Zettelwirtschaft leidet. Keine Marketing-Floskeln, sondern Fokus auf den Kern: Wie er durch Automatisierung pro Woche 5 Stunden Bürozeit spart und das Bürosonntags-Problem löst. Nenne den Digitalbonus als Hebel.' },
  { id: 'pr2', title: 'DATEV Beleg-Extraktor (JSON)', category: 'Code', text: 'Analysiere den folgenden Beleg-Text und extrahiere die Daten in eine saubere JSON-Struktur mit folgenden Feldern: invoice_number, date, net_amount, tax_rate, gross_amount, vendor, iban. Wenn ein Feld nicht eindeutig ist, setze null.' },
  { id: 'pr3', title: 'Social-Media Hook-Generator', category: 'Marketing', text: 'Generiere 5 aufmerksamkeitsstarke Hooks für LinkedIn-Posts, die sich an Solo-Gründer und KMUs richten. Das Thema des Posts lautet: [THEMA]. Der Stil soll direkt, ehrlich und ohne Bullshit sein.' }
];

const INITIAL_CONTENT = [
  { id: 'co1', title: 'Die E-Rechnungspflicht 2025: Was Handwerker jetzt tun müssen', date: '2026-06-28', status: 'draft' },
  { id: 'co2', title: 'Case Study: Wie GoClean Harz 12 Stunden Zettelwirtschaft im Monat eliminierte', date: '2026-07-02', status: 'idea' },
  { id: 'co3', title: 'Warum IT-Systemhäuser deine Prozessprobleme im Büro nicht lösen', date: '2026-06-25', status: 'ready' }
];

const INITIAL_DOCS = [
  { id: 'd1', title: 'Businessplan - KMU Service Harz', url: '#' },
  { id: 'd2', title: 'Preispakete & ROI-Modelle 2026', url: '#' },
  { id: 'd3', title: 'Kooperationsvertrag - Steuerberater', url: '#' }
];

const INITIAL_SOP_TEMPLATES = [
  { id: 's1', name: 'Neukunden-Onboarding (Festpreis-Projekt)', steps: [
    'Vertrag unterschreiben lassen & digital ablegen',
    'DSGVO-Auftragsverarbeitungsvertrag (AVV) abschließen',
    'Projektordner im Google Drive erstellen',
    'Zugänge für die Kundensysteme anfordern (Lexoffice/DATEV)',
    'Kick-off-Termin per Google Meet buchen'
  ]},
  { id: 's2', name: 'Steuerberater-Kooperations-Pitch', steps: [
    'Partner-Präsentation anpassen',
    'Vorteile für die Mandanten (Zeitersparnis) & Kanzlei (saubere DATEV-Daten) hervorheben',
    'Erstgespräch führen',
    'Informationsflyer für Kanzlei-Mandanten zusenden',
    'Kooperationsvereinbarung abschließen'
  ]}
];

function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data States (loaded from localStorage or initial data)
  const [quickCapture, setQuickCapture] = useState('');
  const [inbox, setInbox] = useState(() => JSON.parse(localStorage.getItem('f_inbox')) || INITIAL_INBOX);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('f_tasks')) || INITIAL_TASKS);
  const [focusTasks, setFocusTasks] = useState(() => JSON.parse(localStorage.getItem('f_focus')) || INITIAL_FOCUS_TASKS);
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('f_habits');
    const lastReset = localStorage.getItem('f_habits_last_reset');
    const today = new Date().toDateString();
    
    if (saved && lastReset === today) {
      return JSON.parse(saved);
    }
    // Auto reset if it is a new day
    localStorage.setItem('f_habits_last_reset', today);
    return INITIAL_HABITS;
  });
  
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('f_contacts')) || INITIAL_CONTACTS);
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem('f_projects')) || INITIAL_PROJECTS);
  const [prompts, setPrompts] = useState(() => JSON.parse(localStorage.getItem('f_prompts')) || INITIAL_PROMPTS);
  const [contentPosts, setContentPosts] = useState(() => JSON.parse(localStorage.getItem('f_content')) || INITIAL_CONTENT);
  const [docs, setDocs] = useState(() => JSON.parse(localStorage.getItem('f_docs')) || INITIAL_DOCS);
  const [sopTemplates, setSopTemplates] = useState(() => JSON.parse(localStorage.getItem('f_sop_templates')) || INITIAL_SOP_TEMPLATES);
  const [activeSops, setActiveSops] = useState(() => JSON.parse(localStorage.getItem('f_active_sops')) || []);

  // Form states for adding items
  const [newFocusText, setNewFocusText] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newContact, setNewContact] = useState({ name: '', company: '', industry: '', system: '', stage: 'erstkontakt' });
  const [newPrompt, setNewPrompt] = useState({ title: '', category: 'Sales', text: '' });
  const [newPost, setNewPost] = useState({ title: '', date: '', status: 'idea' });
  
  // Showcase Calculator States
  const [calcInputs, setCalcInputs] = useState({
    taskName: 'Stundenzettel abtippen & Rechnungen schreiben',
    durationHours: 6,
    hourlyRate: 85
  });
  
  // Persistent Storage Sync
  useEffect(() => {
    localStorage.setItem('f_inbox', JSON.stringify(inbox));
  }, [inbox]);
  useEffect(() => {
    localStorage.setItem('f_tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem('f_focus', JSON.stringify(focusTasks));
  }, [focusTasks]);
  useEffect(() => {
    localStorage.setItem('f_habits', JSON.stringify(habits));
  }, [habits]);
  useEffect(() => {
    localStorage.setItem('f_contacts', JSON.stringify(contacts));
  }, [contacts]);
  useEffect(() => {
    localStorage.setItem('f_projects', JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    localStorage.setItem('f_prompts', JSON.stringify(prompts));
  }, [prompts]);
  useEffect(() => {
    localStorage.setItem('f_content', JSON.stringify(contentPosts));
  }, [contentPosts]);
  useEffect(() => {
    localStorage.setItem('f_docs', JSON.stringify(docs));
  }, [docs]);
  useEffect(() => {
    localStorage.setItem('f_sop_templates', JSON.stringify(sopTemplates));
  }, [sopTemplates]);
  useEffect(() => {
    localStorage.setItem('f_active_sops', JSON.stringify(activeSops));
  }, [activeSops]);

  // Quick Capture Handler
  const handleQuickCapture = (e) => {
    e.preventDefault();
    if (!quickCapture.trim()) return;
    
    const newInboxItem = {
      id: 'i_' + Date.now(),
      text: quickCapture,
      date: new Date().toISOString().split('T')[0]
    };
    
    setInbox([newInboxItem, ...inbox]);
    setQuickCapture('');
    alert('Notiz in der Inbox gespeichert!');
  };

  // Inbox & Task Operations
  const deleteInboxItem = (id) => {
    setInbox(inbox.filter(item => item.id !== id));
  };

  const convertInboxToTask = (item) => {
    const newTask = {
      id: 't_' + Date.now(),
      title: item.text.length > 60 ? item.text.substring(0, 60) + '...' : item.text,
      priority: 'medium',
      column: 'todo',
      date: new Date().toISOString().split('T')[0]
    };
    setTasks([newTask, ...tasks]);
    deleteInboxItem(item.id);
    setActiveTab('tasks');
  };

  // Focus Task Toggle
  const toggleFocusTask = (id) => {
    setFocusTasks(focusTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addFocusTask = (e) => {
    e.preventDefault();
    if (!newFocusText.trim()) return;
    if (focusTasks.length >= 3) {
      alert("Fokus auf 3 Aufgaben begrenzt! Lösche oder erledige eine zuerst.");
      return;
    }
    const newTask = {
      id: 'f_' + Date.now(),
      text: newFocusText,
      completed: false
    };
    setFocusTasks([...focusTasks, newTask]);
    setNewFocusText('');
  };

  const deleteFocusTask = (id) => {
    setFocusTasks(focusTasks.filter(t => t.id !== id));
  };

  // Habit Tracker Toggle
  const toggleHabit = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  // Kanban Board Drag and Drop
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    setTasks(tasks.map(t => t.id === taskId ? { ...t, column: targetColumn } : t));
  };

  const addNewTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: 't_' + Date.now(),
      title: newTaskTitle,
      priority: newTaskPriority,
      column: 'todo',
      date: new Date().toISOString().split('T')[0]
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // CRM & Projects Operations
  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContact.name.trim() || !newContact.company.trim()) return;
    const newId = 'c_' + Date.now();
    const contactToAdd = {
      id: newId,
      ...newContact,
      lastContact: new Date().toISOString().split('T')[0]
    };
    setContacts([contactToAdd, ...contacts]);
    
    // Add to project-tracker as well
    const projectToAdd = {
      id: 'p_' + Date.now(),
      client: newContact.company,
      offerSigned: false,
      subsidyApplied: false,
      subsidyApproved: false,
      ready: false
    };
    setProjects([...projects, projectToAdd]);

    setNewContact({ name: '', company: '', industry: '', system: '', stage: 'erstkontakt' });
  };

  const deleteContact = (id, company) => {
    setContacts(contacts.filter(c => c.id !== id));
    setProjects(projects.filter(p => p.client !== company));
  };

  const updateContactStage = (id, stage) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, stage, lastContact: new Date().toISOString().split('T')[0] } : c));
  };

  const toggleProjectStep = (projId, stepKey) => {
    setProjects(projects.map(p => p.id === projId ? { ...p, [stepKey]: !p[stepKey] } : p));
  };

  // Prompt Vault Copier
  const copyPromptText = (text) => {
    navigator.clipboard.writeText(text);
    alert('Prompt wurde in die Zwischenablage kopiert!');
  };

  const handleAddPrompt = (e) => {
    e.preventDefault();
    if (!newPrompt.title.trim() || !newPrompt.text.trim()) return;
    const promptToAdd = {
      id: 'pr_' + Date.now(),
      ...newPrompt
    };
    setPrompts([promptToAdd, ...prompts]);
    setNewPrompt({ title: '', category: 'Sales', text: '' });
  };

  const deletePrompt = (id) => {
    setPrompts(prompts.filter(p => p.id !== id));
  };

  // Content Planer Operations
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.date) return;
    const postToAdd = {
      id: 'co_' + Date.now(),
      ...newPost
    };
    setContentPosts([postToAdd, ...contentPosts]);
    setNewPost({ title: '', date: '', status: 'idea' });
  };

  const deletePost = (id) => {
    setContentPosts(contentPosts.filter(p => p.id !== id));
  };

  // Google Drive Simulation (Upload)
  const handleFileUploadMock = () => {
    const fileTitle = prompt("Dateiname für den Upload in Google Drive:");
    if (!fileTitle) return;
    const newDoc = {
      id: 'd_' + Date.now(),
      title: fileTitle + ' (Google Doc Link)',
      url: 'https://docs.google.com'
    };
    setDocs([newDoc, ...docs]);
    alert(`Die Datei "${fileTitle}" wurde erfolgreich in deinen "Founder OS" Google Drive Ordner geladen.`);
  };

  // SOP Vorlagen kopieren
  const startSopFromTemplate = (template) => {
    const clientName = prompt(`Für welchen Kunden soll die Checkliste "${template.name}" gestartet werden?`);
    if (!clientName) return;
    const newActiveSop = {
      id: 'as_' + Date.now(),
      name: template.name,
      client: clientName,
      steps: template.steps.map(step => ({ text: step, done: false }))
    };
    setActiveSops([newActiveSop, ...activeSops]);
    alert(`Checkliste für ${clientName} gestartet.`);
  };

  const toggleActiveSopStep = (sopId, stepIndex) => {
    setActiveSops(activeSops.map(sop => {
      if (sop.id === sopId) {
        const updatedSteps = [...sop.steps];
        updatedSteps[stepIndex].done = !updatedSteps[stepIndex].done;
        return { ...sop, steps: updatedSteps };
      }
      return sop;
    }));
  };

  const deleteActiveSop = (id) => {
    setActiveSops(activeSops.filter(sop => sop.id !== id));
  };

  // ROI Calculator Calculations
  const calculateSavings = () => {
    const hours = parseFloat(calcInputs.durationHours) || 0;
    const rate = parseFloat(calcInputs.hourlyRate) || 0;
    const weeklySavingsEur = hours * rate;
    const yearlySavingsEur = weeklySavingsEur * 52;
    const yearlySavingsHours = hours * 52;
    
    return {
      euro: yearlySavingsEur.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
      hours: yearlySavingsHours.toLocaleString('de-DE')
    };
  };

  const savings = calculateSavings();

  // Helper function to check if lead has not been contacted for > 14 days
  const isLeadInactive = (lastContactDate) => {
    const last = new Date(lastContactDate);
    const today = new Date();
    const diffTime = Math.abs(today - last);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 14;
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <div className="brand">
          <div className="brand-logo">
            <BrainCircuit size={20} />
          </div>
          <h1>Founder OS</h1>
          <span className="brand-badge">KMU Service Harz</span>
        </div>
        
        {/* DESKTOP NAV TABS */}
        <nav className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={16} /> Dashboard
          </button>
          <button 
            className={`nav-tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <Inbox size={16} /> Inbox & Tasks
          </button>
          <button 
            className={`nav-tab ${activeTab === 'crm' ? 'active' : ''}`}
            onClick={() => setActiveTab('crm')}
          >
            <Users size={16} /> CRM & Projekte
          </button>
          <button 
            className={`nav-tab ${activeTab === 'hub' ? 'active' : ''}`}
            onClick={() => setActiveTab('hub')}
          >
            <BrainCircuit size={16} /> KI & Docs
          </button>
          <button 
            className={`nav-tab ${activeTab === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveTab('sales')}
          >
            <TrendingUp size={16} /> Sales & SOPs
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        
        {/* ==================== TAB 1: DASHBOARD ==================== */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            
            {/* Quick Capture */}
            <div className="card quick-capture-section">
              <div className="card-header">
                <h2 className="card-title"><Plus size={20} className="text-purple-500" /> Neue Idee oder Notiz erfassen</h2>
              </div>
              <form onSubmit={handleQuickCapture} className="quick-capture-box">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Schreibe eine schnelle Notiz (z.B. 'DATEV Schnittstelle prüfen' oder 'Akquise-Mail Entwurf'). Sie landet unstrukturiert in deiner Inbox..."
                  value={quickCapture}
                  onChange={(e) => setQuickCapture(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Erfassen</button>
              </form>
            </div>

            {/* Google Calendar Lese-Ansicht */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title"><Calendar size={20} className="text-cyan-500" /> Google Kalender (Heute)</h2>
              </div>
              <div className="calendar-list">
                <div className="calendar-event">
                  <div className="event-time">09:00 - 10:30</div>
                  <div>
                    <div className="event-title">Audit-Workshop: Dachdeckerei Müller</div>
                    <div className="event-desc">Prozessanalyse & ROI-Kalkulation vor Ort</div>
                  </div>
                </div>
                <div className="calendar-event" style={{ borderLeftColor: 'var(--accent-purple)' }}>
                  <div className="event-time">13:00 - 14:00</div>
                  <div>
                    <div className="event-title">Review-Termin: GoClean Harz</div>
                    <div className="event-desc">Online-Präsentation der ersten Make-Workflows</div>
                  </div>
                </div>
                <div className="calendar-event">
                  <div className="event-time">15:30 - 16:30</div>
                  <div>
                    <div className="event-title">Wirtschaftsförderung WiReGo</div>
                    <div className="event-desc">Abstimmung über Kooperation zu Förderprogrammen</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tagesfokus */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title"><CheckSquare size={20} className="text-indigo-500" /> Tagesfokus (Max. 3 Aufgaben)</h2>
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

            {/* Habit Tracker (Gründer-Fokus) */}
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <div className="card-header">
                <h2 className="card-title"><TrendingUp size={20} className="text-green-500" /> Gründer-Fokus Habit-Tracker</h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Setzt sich täglich um Mitternacht zurück</span>
              </div>
              <div className="habit-list">
                {habits.map(h => (
                  <div key={h.id} className="habit-item">
                    <div className="habit-info">
                      <input 
                        type="checkbox" 
                        checked={h.completed}
                        onChange={() => toggleHabit(h.id)}
                        style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--accent-green)', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: h.completed ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: h.completed ? 'line-through' : 'none' }}>
                        {h.text}
                      </span>
                    </div>
                    {h.completed ? (
                      <span style={{ color: 'var(--accent-green)', fontSize: '0.75rem', fontWeight: 700 }}>Erledigt</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Offen</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 2: INBOX & TASKS ==================== */}
        {activeTab === 'tasks' && (
          <div>
            {/* The Inbox */}
            <div className="card inbox-section">
              <div className="card-header">
                <h2 className="card-title"><Inbox size={20} className="text-purple-500" /> Die Inbox ({inbox.length} unkategorisierte Notizen)</h2>
              </div>
              <div className="inbox-list">
                {inbox.map(item => (
                  <div key={item.id} className="inbox-item">
                    <div className="inbox-content">{item.text}</div>
                    <div className="inbox-footer">
                      <span>Erfasst am {item.date}</span>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => convertInboxToTask(item)} 
                          className="btn btn-secondary" 
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                        >
                          Zu Aufgabe machen <ChevronRight size={12} />
                        </button>
                        <button 
                          onClick={() => deleteInboxItem(item.id)} 
                          className="btn-icon-only"
                        >
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {inbox.length === 0 && (
                  <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Glückwunsch! Deine Inbox ist leer. Nutze Quick Capture auf dem Dashboard, um Gedanken schnell festzuhalten.
                  </div>
                )}
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
                    {tasks.filter(t => t.column === 'idea').map(t => (
                      <div 
                        key={t.id} 
                        className="kanban-card" 
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.id)}
                      >
                        <span className={`card-priority priority-${t.priority}`}>{t.priority}</span>
                        <div className="card-title-text">{t.title}</div>
                        <div className="card-meta">
                          <span>{t.date}</span>
                          <button onClick={() => deleteTask(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
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
                    {tasks.filter(t => t.column === 'todo').map(t => (
                      <div 
                        key={t.id} 
                        className="kanban-card" 
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.id)}
                      >
                        <span className={`card-priority priority-${t.priority}`}>{t.priority}</span>
                        <div className="card-title-text">{t.title}</div>
                        <div className="card-meta">
                          <span>{t.date}</span>
                          <button onClick={() => deleteTask(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
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
                    {tasks.filter(t => t.column === 'inprogress').map(t => (
                      <div 
                        key={t.id} 
                        className="kanban-card" 
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.id)}
                      >
                        <span className={`card-priority priority-${t.priority}`}>{t.priority}</span>
                        <div className="card-title-text">{t.title}</div>
                        <div className="card-meta">
                          <span>{t.date}</span>
                          <button onClick={() => deleteTask(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
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
                    {tasks.filter(t => t.column === 'done').map(t => (
                      <div 
                        key={t.id} 
                        className="kanban-card" 
                        style={{ opacity: 0.6 }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.id)}
                      >
                        <span className="card-priority" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)' }}>erledigt</span>
                        <div className="card-title-text" style={{ textDecoration: 'line-through' }}>{t.title}</div>
                        <div className="card-meta">
                          <span>{t.date}</span>
                          <button onClick={() => deleteTask(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: CRM & PROJECTS ==================== */}
        {activeTab === 'crm' && (
          <div className="crm-grid">
            
            {/* CRM Contacts / Sales Pipeline */}
            <div className="card">
              <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <h2 className="card-title"><Users size={20} className="text-purple-500" /> Mini-CRM & Sales-Pipeline</h2>
              </div>
              
              {/* Kontakt hinzufügen */}
              <form onSubmit={handleAddContact} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="input-field"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Firma" 
                  className="input-field"
                  value={newContact.company}
                  onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Branche (z.B. Handwerk)" 
                  className="input-field"
                  value={newContact.industry}
                  onChange={(e) => setNewContact({ ...newContact, industry: e.target.value })}
                />
                <input 
                  type="text" 
                  placeholder="System (z.B. DATEV)" 
                  className="input-field"
                  value={newContact.system}
                  onChange={(e) => setNewContact({ ...newContact, system: e.target.value })}
                />
                <select 
                  className="input-field"
                  value={newContact.stage}
                  onChange={(e) => setNewContact({ ...newContact, stage: e.target.value })}
                >
                  <option value="erstkontakt">Erstkontakt</option>
                  <option value="gespräch">Gespräch terminiert</option>
                  <option value="angebot">Angebot gesendet</option>
                  <option value="umsetzung">In Umsetzung</option>
                </select>
                <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 1' }}><Plus size={16} /> Neu</button>
              </form>

              <div className="contact-list">
                {contacts.map(c => {
                  const warning = isLeadInactive(c.lastContact) && c.stage !== 'umsetzung';
                  return (
                    <div key={c.id} className={`contact-card ${warning ? 'warning-lead' : ''}`}>
                      <div className="contact-main">
                        <div className="contact-avatar">
                          {c.company.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="contact-details">
                          <h3>{c.company}</h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ansprechpartner: {c.name}</p>
                          <div className="contact-tags">
                            <span className="badge badge-system">{c.industry || 'Keine Branche'}</span>
                            <span className="badge badge-system" style={{ color: 'var(--accent-cyan)', background: 'var(--accent-cyan-glow)' }}>{c.system || 'Kein System'}</span>
                            <span className="badge badge-stage">{c.stage}</span>
                          </div>
                        </div>
                      </div>

                      <div className="contact-actions">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                          <span className="last-contact-text">Kontakt: {c.lastContact}</span>
                          {warning && (
                            <span className="lead-warn-indicator">
                              <AlertTriangle size={12} /> &gt; 14 Tage inaktiv!
                            </span>
                          )}
                        </div>
                        
                        {/* Status updaten Dropdown */}
                        <select 
                          className="input-field" 
                          style={{ width: '130px', padding: '0.35rem 0.5rem', fontSize: '0.75rem' }}
                          value={c.stage}
                          onChange={(e) => updateContactStage(c.id, e.target.value)}
                        >
                          <option value="erstkontakt">Erstkontakt</option>
                          <option value="gespräch">Gespräch</option>
                          <option value="angebot">Angebot</option>
                          <option value="umsetzung">Umsetzung</option>
                        </select>

                        <button onClick={() => deleteContact(c.id, c.company)} className="btn-icon-only">
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subsidies & Project Tracker */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title"><TrendingUp size={20} className="text-cyan-500" /> Fördermittel & Projekte</h2>
              </div>
              <div className="project-list">
                {projects.map(proj => (
                  <div key={proj.id} className="project-item">
                    <div className="project-name">{proj.client}</div>
                    <div className="project-steps">
                      <label className="project-step-checkbox">
                        <input 
                          type="checkbox" 
                          checked={proj.offerSigned}
                          onChange={() => toggleProjectStep(proj.id, 'offerSigned')}
                        />
                        <span>Angebot unterschrieben</span>
                      </label>
                      <label className="project-step-checkbox">
                        <input 
                          type="checkbox" 
                          checked={proj.subsidyApplied}
                          onChange={() => toggleProjectStep(proj.id, 'subsidyApplied')}
                        />
                        <span>Förderung beantragt</span>
                      </label>
                      <label className="project-step-checkbox">
                        <input 
                          type="checkbox" 
                          checked={proj.subsidyApproved}
                          onChange={() => toggleProjectStep(proj.id, 'subsidyApproved')}
                        />
                        <span>Förderung bewilligt</span>
                      </label>
                      <label className="project-step-checkbox">
                        <input 
                          type="checkbox" 
                          checked={proj.ready}
                          onChange={() => toggleProjectStep(proj.id, 'ready')}
                        />
                        <span>Startklar für Umsetzung</span>
                      </label>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    Lege im CRM einen Lead an, um einen Projekt-Tracker zu starten.
                  </p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 4: KI, CONTENT & WISSENS-HUB ==================== */}
        {activeTab === 'hub' && (
          <div className="hub-grid">
            
            {/* Prompt Vault */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title"><BrainCircuit size={20} className="text-purple-500" /> Prompt Vault (KI-Tresor)</h2>
              </div>
              
              {/* Prompt hinzufügen */}
              <form onSubmit={handleAddPrompt} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="Titel" 
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
                <textarea 
                  placeholder="Prompt Text..." 
                  className="input-field" 
                  rows={2}
                  value={newPrompt.text}
                  onChange={(e) => setNewPrompt({ ...newPrompt, text: e.target.value })}
                  required
                />
                <button type="submit" className="btn btn-primary"><Plus size={16} /> Prompt sichern</button>
              </form>

              <div className="prompt-vault">
                {prompts.map(p => (
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

            {/* Content-Planer & Docs Hub */}
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

              {/* Wissens-Hub & Google Docs */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title"><FileText size={20} className="text-cyan-500" /> Wissens-Hub & Google Drive</h2>
                </div>
                
                <div className="upload-zone" onClick={handleFileUploadMock}>
                  <Upload size={24} />
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>PDFs oder Bilder hochladen</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Wird direkt in den festgelegten "Founder OS" Google Drive Ordner geladen</p>
                </div>

                <div className="drive-section">
                  <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                    Google Docs im Founder OS Ordner
                  </h3>
                  <div className="docs-list">
                    {docs.map(doc => (
                      <a key={doc.id} href={doc.url} className="doc-link-item" target="_blank" rel="noreferrer">
                        <div className="doc-info">
                          <FileText size={16} />
                          <span className="doc-title">{doc.title}</span>
                        </div>
                        <ExternalLink size={12} className="text-muted" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 5: SALES-TOOLS & SOPs ==================== */}
        {activeTab === 'sales' && (
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

                <div className="calc-result-box">
                  <div className="calc-result-label">Deine Ersparnis durch Automatisierung:</div>
                  <div className="calc-result-value">{savings.euro} / Jahr</div>
                  <div className="calc-result-sub">und {savings.hours} Stunden freigeschaufelte Zeit pro Jahr.</div>
                </div>
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
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Kunde: <strong>{sop.client}</strong></div>
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
                                {step.text}
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

          </div>
        )}

      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="mobile-nav-bar">
        <button 
          className={`mobile-nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>
        <button 
          className={`mobile-nav-tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <Inbox size={20} />
          <span>Tasks</span>
        </button>
        <button 
          className={`mobile-nav-tab ${activeTab === 'crm' ? 'active' : ''}`}
          onClick={() => setActiveTab('crm')}
        >
          <Users size={20} />
          <span>CRM</span>
        </button>
        <button 
          className={`mobile-nav-tab ${activeTab === 'hub' ? 'active' : ''}`}
          onClick={() => setActiveTab('hub')}
        >
          <BrainCircuit size={20} />
          <span>KI</span>
        </button>
        <button 
          className={`mobile-nav-tab ${activeTab === 'sales' ? 'active' : ''}`}
          onClick={() => setActiveTab('sales')}
        >
          <TrendingUp size={20} />
          <span>Sales</span>
        </button>
      </nav>
    </div>
  );
}

export default App;

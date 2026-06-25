import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
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
  { id: 'p1', client: 'Dachdeckerei Müller', offerSigned: true, subsidyApplied: true, subsidyApproved: false, ready: false, pricePackage: 3500, trackedHours: 14.5, trackingStartTime: null },
  { id: 'p2', client: 'Pflegedienst Harz', offerSigned: false, subsidyApplied: false, subsidyApproved: false, ready: false, pricePackage: 2450, trackedHours: 6.2, trackingStartTime: null },
  { id: 'p3', client: 'GoClean Harz', offerSigned: true, subsidyApplied: true, subsidyApproved: true, ready: true, pricePackage: 4200, trackedHours: 48.0, trackingStartTime: null }
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

const PROCESSES = {
  rechnung: {
    title: "Eingangsrechnungen verarbeiten",
    desc: "Vom Beleg-Chaos zur vollautomatischen DATEV-Bereitstellung.",
    before: [
      { step: "Post oeffnen & scannen", detail: "Manuelles Sortieren der Postbelege oder Herunterladen aus E-Mails." },
      { step: "Daten abtippen", detail: "Rechnungsnummer, Datum und Betraege manuell erfassen." },
      { step: "Ordner ablegen", detail: "Beleg manuell in Ordnerstruktur (lokal oder Cloud) speichern." },
      { step: "DATEV-Uebertragung", detail: "Am Monatsende alle Belege haendisch an den Steuerberater uebermitteln." }
    ],
    after: [
      { step: "E-Mail-Eingang", detail: "Make-Webhook faengt jede E-Mail mit Rechnungs-Anhang automatisch ab." },
      { step: "KI-Extraktion", detail: "GPT-4 extrahiert alle Rechnungsdaten (IBAN, Netto, MwSt) vollautomatisch in Sekunden." },
      { step: "GoBD Cloud-Archiv", detail: "GoBD-konforme, unveraenderbare Speicherung im Google Drive." },
      { step: "DATEV Schnittstelle", detail: "Direkte, lautlose Uebertragung in das DATEV-Portal deines Steuerberaters." }
    ]
  },
  stundenzettel: {
    title: "Stundenzettel & Zeiterfassung",
    desc: "Mitarbeiterzeiten direkt von der Baustelle in die Buchhaltung.",
    before: [
      { step: "Handschriftliche Zettel", detail: "Mitarbeiter fuellen Zettel auf der Baustelle aus." },
      { step: "Sammeln & Suchen", detail: "Zettel verknumpeln im Auto oder gehen verloren." },
      { step: "Excel-Abtippen", detail: "Chef tippt am Sonntagabend alle Zettel haendisch ab." },
      { step: "Lohnbuchhaltung", detail: "Daten haendisch an Steuerberater senden." }
    ],
    after: [
      { step: "WhatsApp-Sprachnachricht", detail: "Mitarbeiter spricht Zeiten ein: 'Mueller, 8 Stunden auf Baustelle X'." },
      { step: "Whisper-Transkription", detail: "Sprachnachricht wird per KI in Text umgewandelt." },
      { step: "GPT-4 Strukturierung", detail: "KI analysiert Name, Projekt, Dauer und schreibt Daten strukturiert." },
      { step: "Lexoffice Eintrag", detail: "Eintrag erfolgt per Klick direkt im Buchhaltungssystem." }
    ]
  },
  anfragen: {
    title: "Kundenanfragen & Termine",
    desc: "24/7-Assistent fuer Neukunden-Qualifizierung und Terminbuchung.",
    before: [
      { step: "Telefon klingelt", detail: "Chef muss Arbeit unterbrechen oder verpasst den Anruf." },
      { step: "Zettelwirtschaft", detail: "Anfragedaten werden auf Notizzettel geschrieben." },
      { step: "Kalender-Chaos", detail: "Kalender abgleichen, um freien Termin zu finden." },
      { step: "Rueckruf-Versuche", detail: "Ewiges Hin und Her, bis der Termin steht." }
    ],
    after: [
      { step: "AI-Chatbot", detail: "Website- oder WhatsApp-Bot nimmt Anfrage rund um die Uhr entgegen." },
      { step: "Qualifizierung", detail: "Bot erfragt Gewerk, Ort und Budget und sortiert Spam aus." },
      { step: "Google Calendar Sync", detail: "Bot zeigt freie Zeiten und bucht direkt im Kalender." },
      { step: "SMS / WhatsApp Bestaetigung", detail: "Kunde und Chef erhalten automatische Bestaetigungen." }
    ]
  }
};

function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Showcase Mode State
  const [showcaseMode, setShowcaseMode] = useState(() => JSON.parse(localStorage.getItem('f_showcase_mode')) || false);
  
  // Use Case selector for Process Visualizer
  const [selectedUseCase, setSelectedUseCase] = useState('rechnung');
  
  // Mask helper function to blur/replace sensitive data when Showcase Mode is active
  const mask = (text, type) => {
    if (!showcaseMode) return text;
    if (!text) return '';

    const companyMap = {
      'Dachdeckerei Müller': 'Muster-Bedachungen GmbH',
      'Pflegedienst Harz': 'Seniorenpflege Musterstadt',
      'GoClean Harz': 'SauberMann Gebäudedienste'
    };
    
    const nameMap = {
      'Hans Müller': 'Thomas Muster',
      'Sabine Kraft': 'Erika Mustermann',
      'Christian Gornitzka': 'Alexander Becker'
    };
    
    const industryMap = {
      'Handwerk': 'Gewerbe (Demo)',
      'Gesundheit': 'Dienstleistung (Demo)',
      'Dienstleistungen': 'Service (Demo)'
    };
    
    const systemMap = {
      'DATEV': 'Demo-ERP v1',
      'Lexoffice': 'Muster-Buchhaltung',
      'DATEV & Excel': 'Demo-ERP & Tabellen'
    };

    if (type === 'company') {
      return companyMap[text] || text.replace(/[a-zA-Z]/g, (char, index) => index % 2 === 0 ? 'X' : 'x');
    }
    if (type === 'name') {
      return nameMap[text] || 'Max Mustermann';
    }
    if (type === 'industry') {
      return industryMap[text] || 'Branche (Demo)';
    }
    if (type === 'system') {
      return systemMap[text] || 'ERP-System (Demo)';
    }
    if (type === 'calendar' || type === 'inbox') {
      let masked = text;
      Object.keys(companyMap).forEach(key => {
        masked = masked.replace(new RegExp(key, 'g'), companyMap[key]);
      });
      Object.keys(nameMap).forEach(key => {
        masked = masked.replace(new RegExp(key, 'g'), nameMap[key]);
      });
      masked = masked.replace(/Wernigerode/g, 'Musterstadt');
      masked = masked.replace(/Niedersachsen/g, 'Muster-Bundesland');
      return masked;
    }
    return text;
  };
  
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
    hourlyRate: 85,
    setupFee: 2450,
    subsidyRegion: 'NDS' // NDS, LSA, BUND, NONE
  });

  // WhatsApp Webhook & Simulation States
  const [webhookUrl, setWebhookUrl] = useState(() => localStorage.getItem('f_whatsapp_webhook_url') || '');
  const [simMessage, setSimMessage] = useState('Christian Gornitzka: 8 Stunden Arbeit bei GoClean erfasst. Material: 2x Dichtungen.');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(''); // "", "whisper", "gpt", "done"

  // NotebookLM Sync States
  const [notebookLmSyncStatus, setNotebookLmSyncStatus] = useState(() => localStorage.getItem('f_notebook_sync_status') || 'synced');
  const [notebookLmLastSync, setNotebookLmLastSync] = useState(() => localStorage.getItem('f_notebook_last_sync') || 'Vor 2 Stunden');
  const [notebookLmSyncStep, setNotebookLmSyncStep] = useState('');
  const [notebookLmProgress, setNotebookLmProgress] = useState(100);

  // Time Tracker State
  const [timeTick, setTimeTick] = useState(0);

  // Habit Streak & Confetti States
  const [habitStreak, setHabitStreak] = useState(() => parseInt(localStorage.getItem('f_habit_streak')) || 0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);
  
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
  useEffect(() => {
    localStorage.setItem('f_showcase_mode', JSON.stringify(showcaseMode));
  }, [showcaseMode]);
  useEffect(() => {
    localStorage.setItem('f_whatsapp_webhook_url', webhookUrl);
  }, [webhookUrl]);
  useEffect(() => {
    localStorage.setItem('f_notebook_sync_status', notebookLmSyncStatus);
  }, [notebookLmSyncStatus]);
  useEffect(() => {
    localStorage.setItem('f_notebook_last_sync', notebookLmLastSync);
  }, [notebookLmLastSync]);
  useEffect(() => {
    localStorage.setItem('f_habit_streak', habitStreak.toString());
  }, [habitStreak]);

  // Live Timer tick for active project time tracking
  useEffect(() => {
    const activeProjects = projects.filter(p => p.trackingStartTime);
    if (activeProjects.length === 0) return;

    const interval = setInterval(() => {
      setTimeTick(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [projects]);

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

  // Handle WhatsApp simulation process (Feature 2a)
  const triggerWhatsAppSimulation = async (e) => {
    e.preventDefault();
    if (!simMessage.trim() || isSimulating) return;

    setIsSimulating(true);
    setSimStep('whisper'); // Step 1: Whisper transcribes

    setTimeout(() => {
      setSimStep('gpt'); // Step 2: GPT analyzes and structures

      setTimeout(async () => {
        const newInboxItem = {
          id: 'i_' + Date.now(),
          text: `[WhatsApp] ${simMessage}`,
          date: new Date().toISOString().split('T')[0]
        };

        setInbox(prevInbox => [newInboxItem, ...prevInbox]);
        
        // Trigger real webhook if URL is provided
        if (webhookUrl.trim()) {
          try {
            await fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                message: simMessage,
                sender: 'WhatsApp Simulator',
                timestamp: new Date().toISOString()
              })
            });
          } catch (err) {
            console.warn("Real webhook call failed:", err);
          }
        }

        setSimStep('done');
        setIsSimulating(false);
        alert('WhatsApp verarbeitet und Beleg in die Inbox gelegt!');
        
        setTimeout(() => {
          setSimStep('');
        }, 2000);

      }, 1500);

    }, 1500);
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

  // Confetti Simulation Trigger
  const triggerConfetti = () => {
    setShowConfetti(true);
    const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];
    const particles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1.5,
      duration: Math.random() * 2 + 2,
      rotation: Math.random() * 360,
      shape: Math.random() > 0.5 ? 'circle' : 'square'
    }));
    setConfettiParticles(particles);
    
    setTimeout(() => {
      setShowConfetti(false);
      setConfettiParticles([]);
    }, 4500);
  };

  // Habit Tracker Toggle
  const toggleHabit = (id) => {
    const updatedHabits = habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h);
    setHabits(updatedHabits);

    const allCompletedNow = updatedHabits.every(h => h.completed);
    const wereAllCompletedBefore = habits.every(h => h.completed);

    if (allCompletedNow && !wereAllCompletedBefore) {
      setHabitStreak(prev => prev + 1);
      triggerConfetti();
    }
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
      ready: false,
      pricePackage: 2500,
      trackedHours: 0,
      trackingStartTime: null
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

  const startProjectTracking = (projId) => {
    setProjects(projects.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          trackingStartTime: Date.now()
        };
      }
      if (p.trackingStartTime) {
        const elapsed = (Date.now() - p.trackingStartTime) / (1000 * 60 * 60);
        return {
          ...p,
          trackedHours: (p.trackedHours || 0) + elapsed,
          trackingStartTime: null
        };
      }
      return p;
    }));
  };

  const stopProjectTracking = (projId) => {
    setProjects(projects.map(p => {
      if (p.id === projId && p.trackingStartTime) {
        const elapsed = (Date.now() - p.trackingStartTime) / (1000 * 60 * 60);
        return {
          ...p,
          trackedHours: (p.trackedHours || 0) + elapsed,
          trackingStartTime: null
        };
      }
      return p;
    }));
  };

  const updateProjectHours = (projId, hours) => {
    setProjects(projects.map(p => p.id === projId ? { ...p, trackedHours: Math.max(0, parseFloat(hours) || 0) } : p));
  };

  const updateProjectPrice = (projId, price) => {
    setProjects(projects.map(p => p.id === projId ? { ...p, pricePackage: Math.max(0, parseInt(price) || 0) } : p));
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

  // NotebookLM Sync Trigger
  const triggerNotebookLmSync = (triggeredByFile = null) => {
    if (notebookLmSyncStatus === 'syncing') return;
    
    setNotebookLmSyncStatus('syncing');
    setNotebookLmProgress(0);
    
    const steps = [
      { progress: 15, text: 'Google Drive Ordner scannen...' },
      { progress: 40, text: triggeredByFile ? `Neue Datei "${triggeredByFile}" analysieren...` : 'Dokumenten-Hashes abgleichen...' },
      { progress: 70, text: 'Text & Vektor-Embeddings extrahieren...' },
      { progress: 90, text: 'NotebookLM Wissensdatenbank aktualisieren...' },
      { progress: 100, text: 'Synchronisation erfolgreich!' }
    ];
    
    let currentStep = 0;
    setNotebookLmSyncStep(steps[0].text);
    setNotebookLmProgress(steps[0].progress);
    
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setNotebookLmSyncStep(steps[currentStep].text);
        setNotebookLmProgress(steps[currentStep].progress);
      } else {
        clearInterval(interval);
        
        const now = new Date();
        const timeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateStr = 'Heute, ' + timeStr;
        
        setNotebookLmLastSync(dateStr);
        setNotebookLmSyncStatus('synced');
        setNotebookLmSyncStep('');
      }
    }, 850);
  };

  // Google Drive Simulation (Upload)
  const handleFileUploadMock = () => {
    const fileTitle = prompt("Dateiname für den Upload in Google Drive:");
    if (!fileTitle) return;
    
    const formattedTitle = /\.[a-zA-Z0-9]+$/.test(fileTitle) ? fileTitle : fileTitle + '.pdf';
    
    const newDoc = {
      id: 'd_' + Date.now(),
      title: formattedTitle,
      url: 'https://docs.google.com'
    };
    
    setDocs([newDoc, ...docs]);
    
    setTimeout(() => {
      triggerNotebookLmSync(formattedTitle);
    }, 600);
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
    const setupFee = parseFloat(calcInputs.setupFee) || 0;
    
    const weeklySavingsEur = hours * rate;
    const yearlySavingsEur = weeklySavingsEur * 52;
    const yearlySavingsHours = hours * 52;
    
    const subsidyRates = { NDS: 0.5, LSA: 0.5, BUND: 0.3, NONE: 0.0 };
    const ratePct = subsidyRates[calcInputs.subsidyRegion] || 0;
    
    const subsidyAmount = setupFee * ratePct;
    const netInvestment = setupFee - subsidyAmount;
    
    const monthlySavingsEur = yearlySavingsEur / 12;
    const paybackMonths = monthlySavingsEur > 0 ? netInvestment / (monthlySavingsEur * 0.9) : 0;
    
    return {
      euro: yearlySavingsEur.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
      hours: yearlySavingsHours.toLocaleString('de-DE'),
      subsidyAmount: subsidyAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
      netInvestment: netInvestment.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
      paybackMonths: paybackMonths.toFixed(1),
      rawYearlyEur: yearlySavingsEur,
      rawYearlyHours: yearlySavingsHours,
      rawNetInvestment: netInvestment,
      rawPaybackMonths: paybackMonths
    };
  };

  const savings = calculateSavings();

  const generatePDFReport = () => {
    const doc = new jsPDF();
    
    // Header Banner
    doc.setFillColor(139, 92, 246);
    doc.rect(0, 0, 210, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("KMU SERVICE HARZ", 20, 23);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Der pragmatische Prozess-Befreier fuer den lokalen Mittelstand", 20, 29);
    
    doc.setFontSize(9);
    doc.text("Erstellt von: Robin Gornitzka", 140, 18);
    doc.text("E-Mail: info@kmuserviceharz.de", 140, 23);
    doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 140, 28);
    
    doc.setTextColor(17, 24, 39);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("WIRTSCHAFTLICHKEITSANALYSE & POTENZIAL-AUDIT", 20, 52);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 85, 99);
    doc.text(`Prozess-Automatisierung fuer: "${mask(calcInputs.taskName, 'inbox')}"`, 20, 59);
    
    doc.setDrawColor(229, 231, 235);
    doc.line(20, 65, 190, 65);
    
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("1. Status Quo (Manueller Aufwand)", 20, 77);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.text(`- Woechentlicher Zeitaufwand: ${calcInputs.durationHours} Stunden`, 25, 85);
    doc.text(`- Kalkulatorischer Stundensatz: ${calcInputs.hourlyRate} EUR / Stunde`, 25, 91);
    
    doc.setFillColor(249, 250, 251);
    doc.rect(20, 98, 170, 32, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.rect(20, 98, 170, 32, 'D');
    
    doc.setTextColor(139, 92, 246);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Kosten pro Jahr (Manuell): ${(calcInputs.durationHours * calcInputs.hourlyRate * 52).toLocaleString('de-DE')} EUR`, 25, 108);
    doc.text(`Arbeitszeit pro Jahr (Manuell): ${savings.hours} Stunden`, 25, 118);
    
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("2. Soll-Zustand (Automatisiert)", 20, 142);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.text("- Erwartete Prozess-Optimierung: ca. 90% Zeiteinsparung", 25, 150);
    doc.text("- Automatisierte Workflows laufen im Hintergrund (24/7)", 25, 156);
    
    doc.setFillColor(240, 253, 250);
    doc.rect(20, 163, 170, 32, 'F');
    doc.setDrawColor(186, 230, 224);
    doc.rect(20, 163, 170, 32, 'D');
    
    doc.setTextColor(13, 148, 136);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Jaehrliche Zeit-Einsparung: ~ ${(calcInputs.durationHours * 52 * 0.9).toFixed(0)} Std.`, 25, 173);
    doc.text(`Jaehrliche Geld-Einsparung: ~ ${(calcInputs.durationHours * calcInputs.hourlyRate * 52 * 0.9).toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}`, 25, 183);
    
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("3. Investition & Foerdermittel-Hebel", 20, 207);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.text(`- Einmaliges Festpreis-Paket (Implementierung): ${calcInputs.setupFee.toLocaleString('de-DE')} EUR`, 25, 215);
    
    const subsidyNames = { NDS: 'Digitalbonus Niedersachsen (50% Zuschuss)', LSA: 'Digital Innovation Sachsen-Anhalt (50% Zuschuss)', BUND: 'go-digital Bundesfoerderung (30% Zuschuss)', NONE: 'Keine staatliche Foerderung gewaehlt' };
    doc.text(`- Foerderprogramm: ${subsidyNames[calcInputs.subsidyRegion]}`, 25, 221);
    doc.text(`- Staatliche Foerderung (nicht rueckzahlbar): - ${savings.subsidyAmount}`, 25, 227);
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(13, 148, 136);
    doc.text(`Effektive Netto-Investition: ${savings.netInvestment}`, 25, 237);
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 24, 39);
    doc.text(`Amortisationszeit (Payback Period): ca. ${savings.paybackMonths} Monate`, 25, 245);
    
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text("KMU Service Harz UG | Der pragmatische Prozess-Befreier", 20, 275);
    doc.text("Hinweis: Diese ROI-Berechnung basiert auf den vom Kunden bereitgestellten Daten und stellt eine unverbindliche Schaetzung dar.", 20, 280);
    doc.text("Antraege fuer Foerdermittel muessen zwingend vor Projektstart eingereicht werden.", 20, 284);
    
    doc.save(`ROI_Analyse_${mask(calcInputs.taskName, 'inbox').replace(/\s+/g, '_')}.pdf`);
  };

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
      {/* Confetti Overlay */}
      {showConfetti && (
        <div className="confetti-container">
          {confettiParticles.map(p => (
            <div 
              key={p.id} 
              className={`confetti-particle ${p.shape}`}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            />
          ))}
        </div>
      )}
      {/* HEADER */}
      <header className="app-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="brand">
            <div className="brand-logo">
              <BrainCircuit size={20} />
            </div>
            <h1>Founder OS</h1>
            <span className="brand-badge">KMU Service Harz</span>
          </div>
          
          <button 
            className={`btn ${showcaseMode ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              padding: '0.35rem 0.75rem', 
              fontSize: '0.75rem', 
              boxShadow: showcaseMode ? '0 0 15px rgba(6, 180, 210, 0.4)' : 'none',
              borderColor: showcaseMode ? 'var(--accent-cyan)' : 'var(--border-color)',
              background: showcaseMode ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))' : 'rgba(255, 255, 255, 0.05)',
              color: 'white'
            }}
            onClick={() => setShowcaseMode(!showcaseMode)}
            title="Schützt deine echten Kundendaten bei Präsentationen durch das automatische Einblenden von fiktiven Demodaten."
          >
            Showcase-Modus: {showcaseMode ? 'AKTIV' : 'AUS'}
          </button>
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
                    <div className="event-title">{mask("Audit-Workshop: Dachdeckerei Müller", "calendar")}</div>
                    <div className="event-desc">Prozessanalyse & ROI-Kalkulation vor Ort</div>
                  </div>
                </div>
                <div className="calendar-event" style={{ borderLeftColor: 'var(--accent-purple)' }}>
                  <div className="event-time">13:00 - 14:00</div>
                  <div>
                    <div className="event-title">{mask("Review-Termin: GoClean Harz", "calendar")}</div>
                    <div className="event-desc">Online-Präsentation der ersten Make-Workflows</div>
                  </div>
                </div>
                <div className="calendar-event">
                  <div className="event-time">15:30 - 16:30</div>
                  <div>
                    <div className="event-title">{mask("Wirtschaftsförderung WiReGo", "calendar")}</div>
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
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={20} className="text-green-500" /> 
                  Gründer-Fokus Habit-Tracker
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div className="streak-display-panel">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setHabitStreak(prev => Math.max(0, prev - 1)); }} 
                      className="streak-btn-adj"
                      title="Streak verringern"
                    >
                      -
                    </button>
                    <span className="streak-badge-fire" title="Deine aktuelle tägliche Habit-Streak!">
                      🔥 {habitStreak} {habitStreak === 1 ? 'Tag' : 'Tage'} Streak
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setHabitStreak(prev => prev + 1); }} 
                      className="streak-btn-adj"
                      title="Streak erhöhen"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={triggerConfetti} 
                    className="btn btn-secondary" 
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    title="Simuliert die Konfetti-Belohnung bei 100% Habit-Abschluss"
                  >
                    🎉 Konfetti zünden
                  </button>
                  
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Täglicher Reset</span>
                </div>
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
            {/* Style override for simulation spinner */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}} />

            {/* The Inbox & WhatsApp Simulator Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '1.5rem', marginBottom: '2rem' }}>
              
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
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                      Trage deine Make-Webhook-URL ein, um echte HTTP-POST-Daten live an dein Make-Szenario zu senden!
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
                    {tasks.filter(t => t.column === 'idea').map(t => (
                      <div 
                        key={t.id} 
                        className="kanban-card" 
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.id)}
                      >
                        <span className={`card-priority priority-${t.priority}`}>{t.priority}</span>
                        <div className="card-title-text">{mask(t.title, 'inbox')}</div>
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
                        <div className="card-title-text">{mask(t.title, 'inbox')}</div>
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
                        <div className="card-title-text">{mask(t.title, 'inbox')}</div>
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
                        <div className="card-title-text" style={{ textDecoration: 'line-through' }}>{mask(t.title, 'inbox')}</div>
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
                          {mask(c.company, 'company').substring(0, 2).toUpperCase()}
                        </div>
                        <div className="contact-details">
                          <h3>{mask(c.company, 'company')}</h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ansprechpartner: {mask(c.name, 'name')}</p>
                          <div className="contact-tags">
                            <span className="badge badge-system">{mask(c.industry, 'industry') || 'Keine Branche'}</span>
                            <span className="badge badge-system" style={{ color: 'var(--accent-cyan)', background: 'var(--accent-cyan-glow)' }}>{mask(c.system, 'system') || 'Kein System'}</span>
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
                {projects.map(proj => {
                  const elapsed = proj.trackingStartTime ? (Date.now() - proj.trackingStartTime) / (1000 * 60 * 60) : 0;
                  const totalHours = (proj.trackedHours || 0) + elapsed;
                  
                  const getHourlyRateInfo = (price, hours) => {
                    if (!hours || hours <= 0) return { rate: '—', status: 'neutral', label: 'Keine Stunden' };
                    const rate = Math.round(price / hours);
                    if (rate < 80) {
                      return { rate: `${rate} €/h`, status: 'danger', label: 'Unrentabel (<80€)' };
                    } else if (rate < 120) {
                      return { rate: `${rate} €/h`, status: 'warning', label: 'Normal (80-120€)' };
                    } else {
                      return { rate: `${rate} €/h`, status: 'success', label: 'Profitabel (>120€)' };
                    }
                  };

                  const rateInfo = getHourlyRateInfo(proj.pricePackage || 2500, totalHours);

                  const formatStopwatch = (startTime) => {
                    if (!startTime) return '00:00:00';
                    const totalSec = Math.floor((Date.now() - startTime) / 1000);
                    const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
                    const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
                    const secs = (totalSec % 60).toString().padStart(2, '0');
                    return `${hrs}:${mins}:${secs}`;
                  };

                  return (
                    <div key={proj.id} className="project-item">
                      <div className="project-info-section">
                        <div className="project-name">{mask(proj.client, 'company')}</div>
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

                      <div className="project-tracker-section">
                        <div className="tracker-row">
                          <div className="tracker-field">
                            <span className="field-label">Paketpreis</span>
                            <div className="price-input-wrapper">
                              <input 
                                type="number" 
                                className="input-field tracker-input" 
                                value={proj.pricePackage || 2500} 
                                onChange={(e) => updateProjectPrice(proj.id, e.target.value)} 
                              />
                              <span className="price-unit">€</span>
                            </div>
                          </div>

                          <div className="tracker-field">
                            <span className="field-label">Geleistete Zeit</span>
                            {proj.trackingStartTime ? (
                              <div className="stopwatch-active">
                                <Clock size={14} className="spin-timer" />
                                <span>{formatStopwatch(proj.trackingStartTime)}</span>
                              </div>
                            ) : (
                              <div className="hours-input-wrapper">
                                <input 
                                  type="number" 
                                  step="0.1"
                                  className="input-field tracker-input" 
                                  value={proj.trackedHours !== undefined ? parseFloat(proj.trackedHours.toFixed(1)) : 0} 
                                  onChange={(e) => updateProjectHours(proj.id, e.target.value)} 
                                />
                                <span className="hours-unit">Std.</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="tracker-row" style={{ marginTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                          <div className="tracker-margin-info">
                            <span className="field-label">Effektiver Stundensatz:</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span className={`rate-value text-${rateInfo.status}`}>{rateInfo.rate}</span>
                              <span className={`margin-badge badge-${rateInfo.status}`}>{rateInfo.label}</span>
                            </div>
                          </div>
                          
                          <div className="tracker-controls">
                            {proj.trackingStartTime ? (
                              <button 
                                onClick={() => stopProjectTracking(proj.id)} 
                                className="btn btn-secondary stop-btn"
                                style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                              >
                                <Clock size={12} /> Stoppen
                              </button>
                            ) : (
                              <button 
                                onClick={() => startProjectTracking(proj.id)} 
                                className="btn btn-primary start-btn"
                              >
                                <Play size={12} /> Starten
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
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
                          <span className="doc-title">{mask(doc.title, 'inbox')}</span>
                        </div>
                        <ExternalLink size={12} className="text-muted" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Digitales Firmengehirn (NotebookLM) */}
              <div className="card notebooklm-card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="card-title">
                    <BrainCircuit size={20} className="text-purple-500" />
                    Digitales Firmengehirn (NotebookLM)
                  </h2>
                  <span className={`sync-badge ${notebookLmSyncStatus}`}>
                    {notebookLmSyncStatus === 'syncing' ? 'Synchronisiert...' : 'Bereit'}
                  </span>
                </div>
                
                <div className="notebooklm-body" style={{ marginTop: '0.75rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    Dieses Panel visualisiert den Abgleich deiner internen Dokumenten-Ablage mit dem KI-Firmengehirn in Google NotebookLM.
                  </p>
                  
                  <div className="notebooklm-details-grid" style={{ marginBottom: '1rem' }}>
                    <div className="detail-item">
                      <span className="detail-label">Status</span>
                      <span className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {notebookLmSyncStatus === 'syncing' ? (
                          <>
                            <span className="sync-pulse-icon active"></span>
                            Synchronisiert gerade
                          </>
                        ) : (
                          <>
                            <span className="sync-pulse-icon success"></span>
                            Online & Aktiv
                          </>
                        )}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Wissensquellen</span>
                      <span className="detail-value">{docs.length} Dokumente</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Letzter Sync</span>
                      <span className="detail-value">{notebookLmLastSync}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Datenvolumen</span>
                      <span className="detail-value">~{(docs.length * 312 + 424) >= 1024 ? ((docs.length * 312 + 424) / 1024).toFixed(2) + ' MB' : (docs.length * 312 + 424) + ' KB'}</span>
                    </div>
                  </div>

                  {notebookLmSyncStatus === 'syncing' && (
                    <div className="sync-progress-container" style={{ margin: '1rem 0', padding: '0.75rem', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                        <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>{notebookLmSyncStep}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{notebookLmProgress}%</span>
                      </div>
                      <div className="sync-progress-bar-bg" style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div className="sync-progress-bar-fill" style={{ width: `${notebookLmProgress}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))', transition: 'width 0.4s ease-out' }}></div>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => triggerNotebookLmSync()} 
                    disabled={notebookLmSyncStatus === 'syncing'} 
                    className="btn btn-secondary"
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <svg 
                      className={notebookLmSyncStatus === 'syncing' ? 'spin' : ''} 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                    </svg>
                    {notebookLmSyncStatus === 'syncing' ? 'Synchronisiere Wissensbasis...' : 'NotebookLM jetzt synchronisieren'}
                  </button>
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

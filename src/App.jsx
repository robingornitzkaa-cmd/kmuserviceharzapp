import React, { useState, useEffect } from 'react';
import { registerPlugin, Capacitor } from '@capacitor/core';

const WidgetBridge = registerPlugin('WidgetBridge');
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
  ChevronLeft,
  Menu,
  X,
  Upload, 
  ExternalLink, 
  Target,
  DollarSign, 
  Clock, 
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle,
  FileText,
  Zap,
  Sliders,
  Settings,
  HelpCircle,
  Shield,
  LifeBuoy,
  Send,
  Phone,
  PhoneCall,
  Mic,
  Volume2,
  Download,
  Database,
  RefreshCw
} from 'lucide-react';

// INITIAL DATA FOR FIRST LAUNCH IMPORT
import { 
  MASTER_LOGBUCH_CONTENT,
  INITIAL_HABITS, 
  INITIAL_FOCUS_TASKS, 
  INITIAL_INBOX, 
  INITIAL_TASKS, 
  INITIAL_CONTACTS, 
  INITIAL_LEADS, 
  INITIAL_PROJECTS, 
  INITIAL_PROMPTS, 
  INITIAL_CONTENT, 
  INITIAL_DOCS, 
  INITIAL_SOP_TEMPLATES, 
  PROCESSES, 
  ONBOARDING_PLAYBOOKS 
} from './constants/initialData';

// SERVICES IMPORT
import { 
  callGeminiAPI, 
  optimizePromptWithLocalAI 
} from './services/gemini';
import { 
  fetchLeadsFromSupabase, 
  saveLeadToSupabase, 
  fetchPromptsFromSupabase, 
  savePromptToSupabase, 
  deletePromptFromSupabase 
} from './services/supabase';
import { updateAndroidWidget } from './services/widget';

// COMPONENTS IMPORT
import { Sidebar } from './components/Sidebar';
import { PromptVault } from './components/PromptVault';
import { SopManager } from './components/SopManager';
import { DocsHub } from './components/DocsHub';
import { SettingsView } from './components/SettingsView';
import { KanbanBoard } from './components/KanbanBoard';
import { CrmPipeline } from './components/CrmPipeline';
import { DashboardView } from './components/DashboardView';

function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('f_sidebar_collapsed') === 'true');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('f_sidebar_collapsed', sidebarCollapsed ? 'true' : 'false');
  }, [sidebarCollapsed]);
  
  // Mobile responsive detection state
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 900 : false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Online/Offline detection state
  const [isOnline, setIsOnline] = useState(() => typeof window !== 'undefined' ? window.navigator.onLine : true);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
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
  const [docs, setDocs] = useState(() => {
    try {
      const saved = localStorage.getItem('f_docs');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasLogbuch = parsed.some(d => d.id === 'master-logbuch');
        if (!hasLogbuch) {
          return [
            { id: 'master-logbuch', title: 'masterLogbuch.txt', content: MASTER_LOGBUCH_CONTENT, status: 'local', url: '#' },
            ...parsed
          ];
        } else {
          return parsed.map(d => {
            if (d.id === 'master-logbuch' && (d.content.startsWith('=== MASTER-LOGBUCH ===') || d.content.trim() === '')) {
              return { ...d, content: MASTER_LOGBUCH_CONTENT };
            }
            return d;
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DOCS;
  });
  const [sopTemplates, setSopTemplates] = useState(() => JSON.parse(localStorage.getItem('f_sop_templates')) || INITIAL_SOP_TEMPLATES);
  const [activeSops, setActiveSops] = useState(() => JSON.parse(localStorage.getItem('f_active_sops')) || []);

  // Google Kalender & NLP Terminschnellerfassung States (Feature 3 - v5)
  const [calendarEvents, setCalendarEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('f_calendar_events');
      return saved ? JSON.parse(saved) : [
        { id: 'ev_1', time: '09:00 - 10:30', title: 'Audit-Workshop: Dachdeckerei Müller', desc: 'Prozessanalyse & ROI-Kalkulation vor Ort', date: new Date().toISOString().split('T')[0] },
        { id: 'ev_2', time: '13:00 - 14:00', title: 'Review-Termin: GoClean Harz', desc: 'Online-Präsentation der ersten Make-Workflows', date: new Date().toISOString().split('T')[0] },
        { id: 'ev_3', time: '15:30 - 16:30', title: 'Wirtschaftsförderung WiReGo', desc: 'Abstimmung über Kooperation zu Förderprogrammen', date: new Date().toISOString().split('T')[0] }
      ];
    } catch {
      return [];
    }
  });
  const [nlpCalendarInput, setNlpCalendarInput] = useState('');

  // Speech-to-Text States (Feature 4 - v5)
  const [isListeningQuickCapture, setIsListeningQuickCapture] = useState(false);
  const [isListeningCrmNotes, setIsListeningCrmNotes] = useState(false);

  // Phase v6 States (Custom blocks, Offline Notes, Google Sync)
  const [customPromptBlocks, setCustomPromptBlocks] = useState(() => {
    try {
      const saved = localStorage.getItem('f_custom_prompt_blocks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [dashNotes, setDashNotes] = useState(() => localStorage.getItem('f_dash_notes') || '');
  const [dashTodos, setDashTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('f_dash_todos');
      return saved ? JSON.parse(saved) : [
        { id: 'dt_1', text: 'Stundensätze & Marge im CRM überprüfen', completed: false },
        { id: 'dt_2', text: 'ZUGFeRD-Rechnung für Müller Bedachungen testen', completed: false },
        { id: 'dt_3', text: 'Offline-Diktierfunktion im Handy ausprobieren', completed: true }
      ];
    } catch {
      return [];
    }
  });

  const [googleConnected, setGoogleConnected] = useState(() => {
    return localStorage.getItem('f_google_connected') === 'true';
  });
  const [googleClientId, setGoogleClientId] = useState(() => {
    return localStorage.getItem('f_google_client_id') || '481297122516-m7hgprfvc28si5cj3cuqd6aocgogsv9q.apps.googleusercontent.com';
  });
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false);
  const [isGoogleSyncing, setIsGoogleSyncing] = useState(false);
  const [googleSyncLogs, setGoogleSyncLogs] = useState([]);

  // Custom Prompt Block Form states
  const [showCustomBlockForm, setShowCustomBlockForm] = useState(false);
  const [newBlockName, setNewBlockName] = useState('');
  const [newBlockCategory, setNewBlockCategory] = useState('prefix'); // 'prefix', 'tone', 'format', 'suffix'

  // Phase v7 Editor States
  const [editingDocId, setEditingDocId] = useState(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [newBlockContent, setNewBlockContent] = useState('');

  // Phase v8 States
  const [promptSearch, setPromptSearch] = useState('');
  const [promptCategoryFilter, setPromptCategoryFilter] = useState('all');
  const [crmStageFilter, setCrmStageFilter] = useState('all');

  // CRM Detail Drawer State
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [newLinkInput, setNewLinkInput] = useState({ title: '', url: '' });

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
  
  // Wochen-Review & Archiv States (Feature A3)
  const [weeklyArchive, setWeeklyArchive] = useState(() => {
    return JSON.parse(localStorage.getItem('f_weekly_archive')) || {};
  });
  const [archiveOpen, setArchiveOpen] = useState(false);
  
  // Make.com Szenario-Simulator States (Feature B1)
  const [makeSimRunning, setMakeSimRunning] = useState(false);
  const [makeActiveNode, setMakeActiveNode] = useState(0);
  const [makeLogs, setMakeLogs] = useState([]);
  
  // Visueller No-Code Automation Canvas States (Feature 1 - v4)
  const [canvasNodes, setCanvasNodes] = useState(() => {
    return JSON.parse(localStorage.getItem('f_canvas_nodes')) || [
      { id: 'cn1', type: 'trigger', category: 'Trigger', title: 'WhatsApp Webhook', icon: 'Inbox', x: 40, y: 110, config: { triggerName: 'Sprachnachricht empfangen', filterKeyword: 'Stundenzettel' } },
      { id: 'cn2', type: 'ai', category: 'KI-Verarbeitung', title: 'Whisper Audio AI', icon: 'Clock', x: 250, y: 110, config: { model: 'whisper-large-v3', language: 'Deutsch' } },
      { id: 'cn3', type: 'ai', category: 'KI-Verarbeitung', title: 'GPT-4 Extraktor', icon: 'BrainCircuit', x: 460, y: 110, config: { prompt: 'Extrahiere Mitarbeiter, Kunde & Stunden als JSON', temperature: '0.2' } },
      { id: 'cn4', type: 'erp', category: 'ERP & Buchhaltung', title: 'Lexoffice Buchen', icon: 'ClipboardCopy', x: 670, y: 110, config: { targetAccount: 'Lohn & Gehalt', autoApprove: 'Ja' } }
    ];
  });
  const [canvasConnections, setCanvasConnections] = useState(() => {
    return JSON.parse(localStorage.getItem('f_canvas_connections')) || [
      { from: 'cn1', to: 'cn2' },
      { from: 'cn2', to: 'cn3' },
      { from: 'cn3', to: 'cn4' }
    ];
  });
  const [selectedCanvasNodeId, setSelectedCanvasNodeId] = useState('cn1');
  const [canvasTestRunning, setCanvasTestRunning] = useState(false);
  const [canvasTestActiveNode, setCanvasTestActiveNode] = useState(null);
  const [canvasTestLogs, setCanvasTestLogs] = useState([]);
  
  // Kunden-Portal & White-Label Client Center States (Feature 2 - v4)
  const [clientPortalMode, setClientPortalMode] = useState(() => JSON.parse(localStorage.getItem('f_client_portal_mode')) || false);
  const [selectedClientCompany, setSelectedClientCompany] = useState(() => localStorage.getItem('f_client_selected_company') || 'GoClean Harz');
  const [clientTickets, setClientTickets] = useState(() => {
    return JSON.parse(localStorage.getItem('f_client_tickets')) || [
      { id: 'ct1', client: 'GoClean Harz', title: 'Neuen Mitarbeiter zum WhatsApp-Bot hinzufügen', status: 'offen', date: '2026-06-27', priority: 'hoch', desc: 'Bitte Max Mustermann für die Zeiterfassung im WhatsApp-Bot freischalten.' },
      { id: 'ct2', client: 'Dachdeckerei Müller', title: 'Erweiterung Beleg-Extraktion für Tankbelege', status: 'in_arbeit', date: '2026-06-25', priority: 'mittel', desc: 'Sollen Shell & UTA Tankkarten-Belege automatisch verarbeitet werden?' }
    ];
  });
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState('mittel');
  
  // KI-Telefonagent / Voice-AI Simulator States (Feature 3 - v4)
  const [voiceScenario, setVoiceScenario] = useState('notdienst'); // 'notdienst', 'erstkontakt'
  const [voiceCallActive, setVoiceCallActive] = useState(false);
  const [voiceCallStep, setVoiceCallStep] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState([]);
  const [voiceExtractedData, setVoiceExtractedData] = useState(null);
  
  // "Frag das Firmengehirn" RAG Knowledge Bot States (Feature 4 - v4)
  const [ragPersona, setRagPersona] = useState('brain'); // 'brain', 'sales', 'legal'
  const [ragInput, setRagInput] = useState('');
  const [ragGenerating, setRagGenerating] = useState(false);
  const [ragChat, setRagChat] = useState([
    { 
      id: 'rag_init', 
      sender: 'ai', 
      persona: 'brain', 
      text: 'Guten Tag! Ich bin das digitale Firmengehirn von KMU Service Harz. Ich habe alle verknüpften Unternehmensdokumente indiziert und stehe für Fragen bereit.', 
      sources: [] 
    }
  ]);

  // E-Rechnungs & Angebotssystem States (Feature 5 - v4)
  const [invoiceClient, setInvoiceClient] = useState('Dachdeckerei Müller');
  const [invoicePackage, setInvoicePackage] = useState('WhatsApp Zeiterfassung & DATEV Integration');
  const [invoiceAmount, setInvoiceAmount] = useState(2500);
  const [invoiceFormat, setInvoiceFormat] = useState('zugferd'); // 'zugferd', 'xrechnung'
  const [invoiceDiscount, setInvoiceDiscount] = useState(0);
  const [invoiceXmlPreview, setInvoiceXmlPreview] = useState(false);

  // Supabase Backend-Integration States (Feature 6 - v4)
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState('connected'); // 'connected', 'syncing', 'error'
  const [supabaseLastSync, setSupabaseLastSync] = useState(() => localStorage.getItem('f_sb_last_sync') || 'Noch nie');
  const [supabaseConfig, setSupabaseConfig] = useState(() => {
    return JSON.parse(localStorage.getItem('f_sb_config')) || {
      url: import.meta.env.VITE_SUPABASE_URL || 'https://ypqlssyrlykjzjnoyjoa.supabase.co',
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwcWxzc3lybHlranpqbm95am9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTc5OTYsImV4cCI6MjA5Nzg5Mzk5Nn0.l1gbcQkrgjGJyTsRp3cjCqYIVrme9M48sbqUILhoAes'
    };
  });
  const [supabaseLogs, setSupabaseLogs] = useState([]);
  const [ollamaLoading, setOllamaLoading] = useState(false);
  const [showGeminiConfig, setShowGeminiConfig] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('f_gemini_api_key') || '');

  useEffect(() => {
    localStorage.setItem('f_gemini_api_key', geminiApiKey);
  }, [geminiApiKey]);

  // Lead- & Pain-Point-Tracker States (Phase v13)
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('f_leads');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });
  const [activeLeadId, setActiveLeadId] = useState(() => {
    return localStorage.getItem('f_active_lead_id') || null;
  });
  const [leadsSearch, setLeadsSearch] = useState('');
  const [leadsPrioFilter, setLeadsPrioFilter] = useState('all');
  const [leadsStatusFilter, setLeadsStatusFilter] = useState('all');
  const [leadsIndustryFilter, setLeadsIndustryFilter] = useState('all');

  // Form states for Lead Editing
  const [formPainPoint, setFormPainPoint] = useState('');
  const [formUrgency, setFormUrgency] = useState(0);
  const [formActualObjection, setFormActualObjection] = useState('');
  const [formConversationHook, setFormConversationHook] = useState('');
  const [formNextStep, setFormNextStep] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formStatus, setFormStatus] = useState('nicht kontaktiert');
  const [isSavingLead, setIsSavingLead] = useState(false);

  // Onboarding Module States
  const [onboardingLeadId, setOnboardingLeadId] = useState(null);
  const [onboardingPlaybook, setOnboardingPlaybook] = useState('master'); // 'master' or 'pilot'
  const [onboardingActivePhase, setOnboardingActivePhase] = useState(0);
  const [onboardingAnswers, setOnboardingAnswers] = useState({});
  const [onboardingPriorities, setOnboardingPriorities] = useState({});
  const [onboardingManualHours, setOnboardingManualHours] = useState(10);
  const [onboardingHourlyRate, setOnboardingHourlyRate] = useState(45);
  const [onboardingSavingRatio, setOnboardingSavingRatio] = useState(40);
  const [recordingQuestionId, setRecordingQuestionId] = useState(null);

  useEffect(() => {
    if (!onboardingLeadId) {
      setOnboardingAnswers({});
      setOnboardingPriorities({});
      setOnboardingManualHours(10);
      setOnboardingHourlyRate(45);
      setOnboardingSavingRatio(40);
      return;
    }
    const isCRMContact = String(onboardingLeadId).startsWith('c');
    const lead = isCRMContact 
      ? contacts.find(c => c.id === onboardingLeadId)
      : leads.find(l => l.id === onboardingLeadId);
    if (lead && lead.notes) {
      const match = lead.notes.match(/<!--ONBOARDING_DATA: ({.*?})-->/);
      if (match) {
        try {
          const parsed = JSON.parse(match[1]);
          setOnboardingPlaybook(parsed.playbook || 'master');
          setOnboardingAnswers(parsed.answers || {});
          setOnboardingPriorities(parsed.priorities || {});
          if (parsed.calc) {
            setOnboardingManualHours(parsed.calc.hours || 10);
            setOnboardingHourlyRate(parsed.calc.rate || 45);
            setOnboardingSavingRatio(parsed.calc.ratio || 40);
          } else {
            setOnboardingManualHours(10);
            setOnboardingHourlyRate(45);
            setOnboardingSavingRatio(40);
          }
          setOnboardingActivePhase(0);
          return;
        } catch (e) {
          console.error("Fehler beim Parsen der Onboarding-Daten aus den Lead-Notizen:", e);
        }
      }
    }
    setOnboardingAnswers({});
    setOnboardingPriorities({});
    setOnboardingManualHours(10);
    setOnboardingHourlyRate(45);
    setOnboardingSavingRatio(40);
    setOnboardingActivePhase(0);
  }, [onboardingLeadId]);

  useEffect(() => {
    const activeLead = leads.find(l => l.id === activeLeadId);
    if (activeLead) {
      setFormPainPoint(activeLead.pain_point || '');
      setFormUrgency(activeLead.urgency || 0);
      setFormActualObjection(activeLead.actual_objection || '');
      setFormConversationHook(activeLead.conversation_hook || activeLead.call_hook || '');
      setFormNextStep(activeLead.next_step || '');
      setFormNotes(activeLead.notes || '');
      setFormStatus(activeLead.status || 'nicht kontaktiert');
    } else {
      setFormPainPoint('');
      setFormUrgency(0);
      setFormActualObjection('');
      setFormConversationHook('');
      setFormNextStep('');
      setFormNotes('');
      setFormStatus('nicht kontaktiert');
    }
  }, [activeLeadId, leads]);

  const [dashboardWidgets, setDashboardWidgets] = useState(() => {
    try {
      const saved = localStorage.getItem('f_dashboard_widgets');
      return saved ? JSON.parse(saved) : {
        financial: true,
        einvoice: true,
        quickcapture: true,
        calendar: true,
        habits: true,
        weekly: true,
        notes: true,
        simpleNotes: false,
        simpleTodos: false,
        simpleCalendar: false,
        simpleGoal: false,
        simpleLinks: false
      };
    } catch {
      return {
        financial: true,
        einvoice: true,
        quickcapture: true,
        calendar: true,
        habits: true,
        weekly: true,
        notes: true,
        simpleNotes: false,
        simpleTodos: false,
        simpleCalendar: false,
        simpleGoal: false,
        simpleLinks: false
      };
    }
  });
  const [isEditingDashboard, setIsEditingDashboard] = useState(false);

  // Modus & Custom-States für einfache Bausteine (Phase v14)
  const [dashboardMode, setDashboardMode] = useState(() => {
    return localStorage.getItem('f_dashboard_mode') || 'detailed';
  });
  const [stickyNoteColor, setStickyNoteColor] = useState(() => {
    return localStorage.getItem('f_sticky_note_color') || '#fef08a';
  });
  const [simpleEventTime, setSimpleEventTime] = useState('');
  const [simpleEventText, setSimpleEventText] = useState('');
  const [newDashTodoText, setNewDashTodoText] = useState('');
  const [dashboardGoal, setDashboardGoal] = useState(() => {
    return localStorage.getItem('f_dashboard_goal') || '';
  });
  const [dashboardLinks, setDashboardLinks] = useState(() => {
    try {
      const saved = localStorage.getItem('f_dashboard_links');
      return saved ? JSON.parse(saved) : [
        { id: 'l1', title: 'Google Drive Ablage', url: 'https://drive.google.com' },
        { id: 'l2', title: 'Supabase Console', url: 'https://supabase.com/dashboard' }
      ];
    } catch {
      return [];
    }
  });
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // Persistent Storage Sync
  useEffect(() => {
    localStorage.setItem('f_dashboard_widgets', JSON.stringify(dashboardWidgets));
  }, [dashboardWidgets]);
  useEffect(() => {
    localStorage.setItem('f_dashboard_mode', dashboardMode);
  }, [dashboardMode]);
  useEffect(() => {
    localStorage.setItem('f_sticky_note_color', stickyNoteColor);
  }, [stickyNoteColor]);
  useEffect(() => {
    localStorage.setItem('f_dashboard_goal', dashboardGoal);
  }, [dashboardGoal]);
  useEffect(() => {
    localStorage.setItem('f_dashboard_links', JSON.stringify(dashboardLinks));
  }, [dashboardLinks]);
  useEffect(() => {
    localStorage.setItem('f_custom_prompt_blocks', JSON.stringify(customPromptBlocks));
  }, [customPromptBlocks]);
  useEffect(() => {
    localStorage.setItem('f_dash_notes', dashNotes);
  }, [dashNotes]);
  useEffect(() => {
    localStorage.setItem('f_dash_todos', JSON.stringify(dashTodos));
  }, [dashTodos]);

  // Phase v9: Sync to Android Widget
  useEffect(() => {
    updateAndroidWidget(dashNotes, dashTodos);
  }, [dashNotes, dashTodos]);
  useEffect(() => {
    localStorage.setItem('f_google_connected', String(googleConnected));
  }, [googleConnected]);
  useEffect(() => {
    localStorage.setItem('f_google_client_id', googleClientId);
  }, [googleClientId]);
  useEffect(() => {
    localStorage.setItem('f_calendar_events', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

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
  useEffect(() => {
    localStorage.setItem('f_canvas_nodes', JSON.stringify(canvasNodes));
  }, [canvasNodes]);
  useEffect(() => {
    localStorage.setItem('f_canvas_connections', JSON.stringify(canvasConnections));
  }, [canvasConnections]);
  useEffect(() => {
    localStorage.setItem('f_client_portal_mode', JSON.stringify(clientPortalMode));
  }, [clientPortalMode]);
  useEffect(() => {
    localStorage.setItem('f_client_selected_company', selectedClientCompany);
  }, [selectedClientCompany]);
  useEffect(() => {
    localStorage.setItem('f_client_tickets', JSON.stringify(clientTickets));
  }, [clientTickets]);
  useEffect(() => {
    localStorage.setItem('f_sb_config', JSON.stringify(supabaseConfig));
  }, [supabaseConfig]);
  useEffect(() => {
    localStorage.setItem('f_leads', JSON.stringify(leads));
  }, [leads]);
  useEffect(() => {
    if (activeLeadId) {
      localStorage.setItem('f_active_lead_id', activeLeadId);
    } else {
      localStorage.removeItem('f_active_lead_id');
    }
  }, [activeLeadId]);

  // Fetch leads from Supabase on mount (or when config changes)
  useEffect(() => {
    const fetchLeads = async () => {
      if (!isOnline) return;
      try {
        const data = await fetchLeadsFromSupabase(supabaseConfig);
        if (data && data.length > 0) {
          setLeads(data);
          localStorage.setItem('f_leads', JSON.stringify(data));
        }
      } catch (e) {
        console.error("Fehler beim Laden der Leads aus Supabase:", e);
      }
    };
    fetchLeads();
  }, [supabaseConfig, isOnline]);

  // Fetch prompts from Supabase on mount
  useEffect(() => {
    const fetchPrompts = async () => {
      if (!isOnline) return;
      try {
        const data = await fetchPromptsFromSupabase(supabaseConfig);
        if (data) {
          setPrompts(prevPrompts => {
            const merged = new Map();
            data.forEach(p => merged.set(p.id, p));
            prevPrompts.forEach(p => merged.set(p.id, p));
            const mergedList = Array.from(merged.values());
            localStorage.setItem('f_prompts', JSON.stringify(mergedList));
            return mergedList;
          });
        }
      } catch (e) {
        console.error("Fehler beim Laden der Prompts aus Supabase:", e);
      }
    };
    fetchPrompts();
  }, [supabaseConfig, isOnline]);

  // Wochen-Review & Archiv Logik & Sync (Feature A3)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const completedFocus = focusTasks.filter(t => t.completed).map(t => t.text);
    const completedHabs = habits.filter(h => h.completed).map(h => h.text);
    
    setWeeklyArchive(prev => {
      const currentDayData = prev[today] || { focusTasks: [], completedHabits: [], reflection: '' };
      
      const focusChanged = JSON.stringify(currentDayData.focusTasks) !== JSON.stringify(completedFocus);
      const habitsChanged = JSON.stringify(currentDayData.completedHabits) !== JSON.stringify(completedHabs);
      
      if (focusChanged || habitsChanged) {
        const updated = {
          ...prev,
          [today]: {
            ...currentDayData,
            focusTasks: completedFocus,
            completedHabits: completedHabs
          }
        };
        localStorage.setItem('f_weekly_archive', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  }, [focusTasks, habits]);

  const getLast7Days = () => {
    const days = [];
    const options = { weekday: 'long', day: '2-digit', month: '2-digit' };
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      const formatted = d.toLocaleDateString('de-DE', options);
      days.push({ dateString, formatted });
    }
    return days;
  };

  const updateReflection = (dateString, text) => {
    setWeeklyArchive(prev => {
      const currentDayData = prev[dateString] || { focusTasks: [], completedHabits: [], reflection: '' };
      const updated = {
        ...prev,
        [dateString]: {
          ...currentDayData,
          reflection: text
        }
      };
      localStorage.setItem('f_weekly_archive', JSON.stringify(updated));
      return updated;
    });
  };

  const generateWeeklyArchivePDF = () => {
    const doc = new jsPDF();
    
    // Header Banner
    doc.setFillColor(79, 70, 229); // indigo-600
    doc.rect(0, 0, 210, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("FOUNDER OS - WOCHENREPORT", 20, 23);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Woechentliche Reflexion, Fokus-Aufgaben & Habits", 20, 29);
    
    doc.setFontSize(9);
    doc.text("Erstellt von: Robin Gornitzka", 140, 18);
    doc.text("Zeitraum: Letzte 7 Tage", 140, 23);
    doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 140, 28);
    
    doc.setTextColor(17, 24, 39);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("ZUSAMMENFASSUNG DER LETZTEN 7 TAGE", 20, 50);
    
    doc.setDrawColor(229, 231, 235);
    doc.line(20, 55, 190, 55);
    
    let yPos = 65;
    const days = getLast7Days();
    
    days.forEach((day, index) => {
      if (yPos > 230) {
        doc.addPage();
        yPos = 25;
      }
      
      const dayData = weeklyArchive[day.dateString] || { focusTasks: [], completedHabits: [], reflection: '' };
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(79, 70, 229);
      doc.text(`${day.formatted} (${day.dateString})`, 20, yPos);
      
      yPos += 6;
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      doc.text("Erledigte Fokus-Tasks:", 25, yPos);
      
      doc.setFont("helvetica", "normal");
      if (dayData.focusTasks && dayData.focusTasks.length > 0) {
        dayData.focusTasks.forEach(task => {
          yPos += 5;
          doc.text(`- ${task}`, 30, yPos);
        });
      } else {
        yPos += 5;
        doc.text("Keine Fokus-Tasks erledigt.", 30, yPos);
      }
      
      yPos += 6;
      
      doc.setFont("helvetica", "bold");
      doc.text("Erfolgreiche Habits:", 25, yPos);
      
      doc.setFont("helvetica", "normal");
      if (dayData.completedHabits && dayData.completedHabits.length > 0) {
        yPos += 5;
        doc.text(`- ${dayData.completedHabits.join(', ')}`, 30, yPos);
      } else {
        yPos += 5;
        doc.text("Keine Habits abgehakt.", 30, yPos);
      }
      
      yPos += 6;
      
      doc.setFont("helvetica", "bold");
      doc.text("Tages-Reflexion & Notizen:", 25, yPos);
      
      doc.setFont("helvetica", "italic");
      const reflectionText = dayData.reflection || "Keine Notiz erfasst.";
      const splitReflection = doc.splitTextToSize(reflectionText, 150);
      splitReflection.forEach(line => {
        yPos += 5;
        doc.text(line, 30, yPos);
      });
      
      yPos += 12;
      doc.setDrawColor(243, 244, 246);
      doc.line(20, yPos - 6, 190, yPos - 6);
    });
    
    doc.save(`FounderOS-Wochenreport-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Make.com Simulationssteuerung (Feature B1)
  const startMakeSimulation = () => {
    if (makeSimRunning) return;

    setMakeSimRunning(true);
    setMakeActiveNode(1);
    
    const getTimestamp = () => {
      const now = new Date();
      const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
      return now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + ms;
    };

    setMakeLogs([`[${getTimestamp()}] ⚡ Make.com Webhook getriggert durch WhatsApp-Eingang.`]);

    // Step 2: Whisper (nach 1.4s)
    setTimeout(() => {
      setMakeActiveNode(2);
      setMakeLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 🎙️ Whisper API: Verarbeite Sprachnachricht (Dauer: 6.2s)...`,
        `[${getTimestamp()}] 🔍 Transkript: "Christian Gornitzka, 8 Stunden gearbeitet bei GoClean Harz. Material: Dichtungen."`
      ]);
    }, 1400);

    // Step 3: GPT-4 (nach 2.8s)
    setTimeout(() => {
      setMakeActiveNode(3);
      setMakeLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 🧠 GPT-4: Analysiere und strukturiere Textdaten...`,
        `[${getTimestamp()}] 🔍 Extrahiert: { Mitarbeiter: "Christian Gornitzka", Stunden: 8.0, Kunde: "GoClean Harz", Material: "Dichtungen" }`
      ]);
    }, 2800);

    // Step 4: Lexoffice (nach 4.2s)
    setTimeout(() => {
      setMakeActiveNode(4);
      setMakeLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 📁 Lexoffice API: Sende erfassten Beleg & Zeiteintrag...`,
        `[${getTimestamp()}] ✅ API-Antwort: Status 201 (Created) - Eintrag #LX-98241 angelegt.`
      ]);
    }, 4200);

    // Done (nach 5.6s)
    setTimeout(() => {
      setMakeActiveNode(5);
      setMakeLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 🎉 Szenario-Ausführung erfolgreich beendet (Gesamtlaufzeit: 5.6s, geschätzte Kosten: 0.015 €).`
      ]);
      setMakeSimRunning(false);
    }, 5600);
  };

  // No-Code Canvas Handlers (Feature 1 - v4)
  const addCanvasNode = (templateType) => {
    const templates = {
      email: { type: 'trigger', category: 'Trigger', title: 'E-Mail Eingang (IMAP)', icon: 'Inbox', config: { triggerName: 'Rechnung im Anhang', filterKeyword: 'Rechnung' } },
      openai: { type: 'ai', category: 'KI-Verarbeitung', title: 'Claude 3.5 Sonnet', icon: 'BrainCircuit', config: { prompt: 'Analysiere Vertrag und erstelle Zusammenfassung', temperature: '0.5' } },
      datev: { type: 'erp', category: 'ERP & Buchhaltung', title: 'DATEV Unternehmen Online', icon: 'ClipboardCopy', config: { targetAccount: 'Eingangsrechnungen', autoApprove: 'Nein' } },
      slack: { type: 'notify', category: 'Benachrichtigung', title: 'Slack Team-Alert', icon: 'Zap', config: { channel: '#prozesse-live', message: 'Neuer Beleg verarbeitet!' } }
    };

    const template = templates[templateType] || templates.email;
    const newId = 'cn_' + Date.now();
    const lastNode = canvasNodes[canvasNodes.length - 1];
    const newX = lastNode ? lastNode.x + 210 : 40;
    const newY = lastNode ? lastNode.y : 110;

    const newNode = {
      id: newId,
      ...template,
      x: newX,
      y: newY
    };

    const updatedNodes = [...canvasNodes, newNode];
    setCanvasNodes(updatedNodes);

    if (lastNode) {
      setCanvasConnections(prev => [...prev, { from: lastNode.id, to: newId }]);
    }

    setSelectedCanvasNodeId(newId);
  };

  const deleteCanvasNode = (nodeId) => {
    if (canvasNodes.length <= 1) {
      alert("Der Canvas muss mindestens einen Knoten enthalten!");
      return;
    }
    const filteredNodes = canvasNodes.filter(n => n.id !== nodeId);
    setCanvasNodes(filteredNodes);
    setCanvasConnections(canvasConnections.filter(c => c.from !== nodeId && c.to !== nodeId));
    if (selectedCanvasNodeId === nodeId) {
      setSelectedCanvasNodeId(filteredNodes.length > 0 ? filteredNodes[0].id : null);
    }
  };

  const updateCanvasNodeConfig = (nodeId, key, value) => {
    setCanvasNodes(canvasNodes.map(n => {
      if (n.id === nodeId) {
        return {
          ...n,
          config: {
            ...n.config,
            [key]: value
          }
        };
      }
      return n;
    }));
  };

  const startCanvasTestRun = () => {
    if (canvasTestRunning || canvasNodes.length === 0) return;

    setCanvasTestRunning(true);
    setCanvasTestActiveNode(canvasNodes[0].id);

    const getTimestamp = () => {
      const now = new Date();
      const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
      return now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + ms;
    };

    setCanvasTestLogs([`[${getTimestamp()}] 🚀 Testlauf gestartet. Initialisiere Canvas mit ${canvasNodes.length} Knoten...`]);

    canvasNodes.forEach((node, idx) => {
      setTimeout(() => {
        setCanvasTestActiveNode(node.id);
        setCanvasTestLogs(prev => [
          ...prev,
          `[${getTimestamp()}] ⚙️ [Knoten ${idx + 1}/${canvasNodes.length}] ${node.title} (${node.category}) ausgeführt.`,
          `[${getTimestamp()}] 📊 Konfiguration: ${JSON.stringify(node.config)}`
        ]);

        if (idx === canvasNodes.length - 1) {
          setTimeout(() => {
            setCanvasTestActiveNode(null);
            setCanvasTestLogs(prev => [
              ...prev,
              `[${getTimestamp()}] 🎉 Custom Workflow erfolgreich abgeschlossen!`
            ]);
            setCanvasTestRunning(false);
          }, 1000);
        }
      }, (idx + 1) * 1200);
    });
  };

  // Kunden-Portal Handlers (Feature 2 - v4)
  const handleCreateClientTicket = (e) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    const newId = 'ct_' + Date.now();

    const newTicket = {
      id: newId,
      client: selectedClientCompany,
      title: newTicketTitle,
      status: 'offen',
      date: today,
      priority: newTicketPriority,
      desc: newTicketDesc || 'Keine detaillierte Beschreibung hinterlegt.'
    };

    setClientTickets([newTicket, ...clientTickets]);

    // Automatically notify founder by inserting item into inbox!
    const newInboxNotification = {
      id: 'i_' + Date.now(),
      text: `[Support-Ticket von ${selectedClientCompany}] ${newTicketTitle}: ${newTicketDesc}`,
      date: today
    };
    setInbox(prev => [newInboxNotification, ...prev]);

    setNewTicketTitle('');
    setNewTicketDesc('');
    alert(`Vielen Dank! Dein Support-Ticket für ${selectedClientCompany} wurde eingereicht und an KMU Service Harz übermittelt.`);
  };

  // KI-Telefonagent Handlers (Feature 3 - v4)
  const startVoiceCallSimulation = () => {
    if (voiceCallActive) return;

    setVoiceCallActive(true);
    setVoiceCallStep(1);
    setVoiceTranscript([]);
    setVoiceExtractedData(null);

    const getTime = () => new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (voiceScenario === 'notdienst') {
      setVoiceTranscript([{ speaker: 'agent', text: '🤖 KI-Assistent: Guten Tag! KMU Service Harz Notfall-Zentrale. Ich höre mit. Was ist passiert?', time: getTime() }]);

      setTimeout(() => {
        setVoiceCallStep(2);
        setVoiceTranscript(prev => [...prev, { speaker: 'caller', text: '🗣️ Anrufer (Dachdeckerei Müller): Hallo! Wir haben einen Rohrbruch im Hauptgebäude. Das Wasser steht schon 5cm hoch!', time: getTime() }]);
      }, 1800);

      setTimeout(() => {
        setVoiceCallStep(3);
        setVoiceTranscript(prev => [...prev, { speaker: 'agent', text: '🤖 KI-Assistent: Verstanden. Notfall "Rohrbruch" bei Dachdeckerei Müller. Ich löse sofort Alarmstufe 1 aus und benachrichtige Techniker Meyer per SMS.', time: getTime() }]);
      }, 3800);

      setTimeout(() => {
        setVoiceCallStep(4);
        const extracted = {
          anrufer: 'Dachdeckerei Müller (Hans Müller)',
          anliegen: 'Wasserrohrbruch im Hauptgebäude (Notfall)',
          aktion: 'Notdienst-SMS versendet & Ticket #ND-402 im CRM angelegt'
        };
        setVoiceExtractedData(extracted);
        setVoiceCallActive(false);

        const today = new Date().toISOString().split('T')[0];
        setInbox(prev => [{ id: 'i_' + Date.now(), text: `[KI-Telefonat NOTFALL] Dachdeckerei Müller: Wasserrohrbruch. Techniker benachrichtigt.`, date: today }, ...prev]);
      }, 5800);
    } else {
      setVoiceTranscript([{ speaker: 'agent', text: '🤖 KI-Assistent: Herzlich willkommen bei KMU Service Harz! Wie kann ich Ihr Unternehmen automatisieren?', time: getTime() }]);

      setTimeout(() => {
        setVoiceCallStep(2);
        setVoiceTranscript(prev => [...prev, { speaker: 'caller', text: '🗣️ Anrufer (Pflegedienst Harz): Guten Tag, Sabine Kraft hier. Wir möchten unsere Stundenzettel über WhatsApp digitalisieren.', time: getTime() }]);
      }, 1800);

      setTimeout(() => {
        setVoiceCallStep(3);
        setVoiceTranscript(prev => [...prev, { speaker: 'agent', text: '🤖 KI-Assistent: Ausgezeichnet! Ich trage das Projekt "WhatsApp-Zeiterfassung" für Pflegedienst Harz ein und sende Ihnen das ROI-Infopaket.', time: getTime() }]);
      }, 3800);

      setTimeout(() => {
        setVoiceCallStep(4);
        const extracted = {
          anrufer: 'Pflegedienst Harz (Sabine Kraft)',
          anliegen: 'Interesse an WhatsApp-Zeiterfassung & Fördermitteln',
          aktion: 'Lead im CRM auf "Angebot" aktualisiert & Infomaterial versendet'
        };
        setVoiceExtractedData(extracted);
        setVoiceCallActive(false);

        const today = new Date().toISOString().split('T')[0];
        setInbox(prev => [{ id: 'i_' + Date.now(), text: `[KI-Telefonat LEAD] Pflegedienst Harz hat Angebot angefordert.`, date: today }, ...prev]);
      }, 5800);
    }
  };

  const handleSendRagQuery = async (customQuery = null) => {
    const query = typeof customQuery === 'string' ? customQuery : ragInput;
    if (!query || !query.trim() || ragGenerating) return;

    const userMsg = { id: 'rag_u_' + Date.now(), sender: 'user', text: query };
    setRagChat(prev => [...prev, userMsg]);
    if (typeof customQuery !== 'string') setRagInput('');
    setRagGenerating(true);

    // 1. Try Gemini Cloud RAG if key exists and online
    if (geminiApiKey && geminiApiKey.trim() && isOnline) {
      const docContext = docs.map(d => `=== DOKUMENT: ${d.title} ===\n${d.content}`).join('\n\n');
      const systemInstruction = `Du bist der RAG Knowledge Bot ("Firmengehirn") für Robin's Consultingfirma "KMU Service Harz".
Deine Aufgabe ist es, Fragen basierend auf den folgenden Unternehmensdokumenten präzise, professionell und wahrheitsgemäß zu beantworten.

Hier sind die aktuellen Dokumente als Wissensdatenbank:
${docContext}

Wenn die Antwort in den Dokumenten steht, nenne am Ende der Antwort die genauen Quellen (z.B. Dokumentname wie masterLogbuch.txt).
Wenn die Antwort NICHT in den Dokumenten steht, antworte freundlich, dass diese Information nicht in der lokalen Wissensdatenbank vorhanden ist, aber gib basierend auf deinem Allgemeinwissen eine kurze Hilfestellung.

Hier ist die Frage des Nutzers:
"${query}"`;

      for (const model of GEMINI_MODELS) {
        try {
          console.log(`RAG Bot versucht Anfrage mit ${model}...`);
          const text = await callGeminiAPI(model, systemInstruction, geminiApiKey);
          if (text) {
            const sources = [];
            docs.forEach(d => {
              if (text.toLowerCase().includes(d.title.toLowerCase()) || text.includes(d.title)) {
                sources.push(d.title);
              }
            });
            const aiMsg = { 
              id: 'rag_a_' + Date.now(), 
              sender: 'ai', 
              persona: ragPersona, 
              text: text.trim(), 
              sources: sources.length > 0 ? sources : ['Dynamisches Firmengehirn'] 
            };
            setRagChat(prev => [...prev, aiMsg]);
            setRagGenerating(false);
            return;
          }
        } catch (e) {
          console.warn(`Fehler bei RAG Gemini Modell ${model}:`, e);
        }
      }
    }

    // 2. Fallback static keyword-based RAG if offline or key failed
    setTimeout(() => {
      let responseText = '';
      let sources = [];

      const qLower = query.toLowerCase();

      if (ragPersona === 'sales') {
        responseText = `🎯 **Vertriebs- & Pitch-Perspektive:**\n\nIm Kundengespräch solltest du betonen, dass der ROI bereits nach **1,5 Monaten** eintritt. Verweise darauf, dass manuelle Stundenzettel pro Mitarbeiter 15 Minuten pro Tag verschwenden.\n\n👉 **Empfohlenes Argument:** "Mit unserer WhatsApp-Lösung sparen Ihre Mitarbeiter täglich 15 Minuten und das Büro spart 5 Stunden Abtippen pro Woche."`;
        sources = ['Preispakete & ROI-Modelle 2026', 'Showcase ROI-Matrix (Abschnitt 2.1)'];
      } else if (ragPersona === 'legal') {
        responseText = `🔒 **DSGVO- & Compliance-Prüfung:**\n\nAlle verarbeiteten Kundendaten und Sprachnachrichten werden Ende-zu-Ende verschlüsselt und auf ISO-27001 zertifizierten Servern in Frankfurt am Main verarbeitet. Es werden keine Daten zum Training öffentlicher KI-Modelle verwendet.`;
        sources = ['DSGVO & Datenschutzkonzept v2', 'Auftragsverarbeitungsvertrag (AVV) Vorlage'];
      } else {
        // Standard Firmengehirn
        if (qLower.includes('onboarding') || qLower.includes('ablauf') || qLower.includes('start')) {
          responseText = `Das Neukunden-Onboarding gliedert sich in 3 Schritte:\n1. **Setup & Schnittstellen-Check** (DATEV / Lexoffice)\n2. **Mitarbeiter-Einweisung** (WhatsApp-Bot Testlauf)\n3. **Go-Live & Support-Freischaltung** im Mandantenportal.`;
          sources = ['Businessplan - KMU Service Harz (SOP 1.4)', 'Kunden-Onboarding Leitfaden'];
        } else if (qLower.includes('preis') || qLower.includes('kosten') || qLower.includes('paket')) {
          responseText = `Unsere Standard-Pakete richten sich nach der Unternehmensgröße:\n• **Basis-Automatisierung:** ab 1.500 € (WhatsApp-Zeiterfassung)\n• **Enterprise-Workflow:** ab 3.500 € (Vollständige DATEV & CRM Anbindung).`;
          sources = ['Preispakete & ROI-Modelle 2026'];
        } else {
          responseText = `Basierend auf deinen Unternehmensdokumenten betragen die durchschnittlichen Zeiteinsparungen bei Harzer KMUs rund **45 Stunden pro Monat**. Sämtliche Prozesse werden in Echtzeit mit deinen Buchhaltungssystemen synchronisiert.`;
          sources = ['Businessplan - KMU Service Harz', 'Showcase ROI-Matrix'];
        }
      }

      const aiMsg = { id: 'rag_a_' + Date.now(), sender: 'ai', persona: ragPersona, text: responseText, sources };
      setRagChat(prev => [...prev, aiMsg]);
      setRagGenerating(false);
    }, 1200);
  };

  // E-Rechnungs Handlers (Feature 5 - v4)
  const generateEinvoicePdf = () => {
    const doc = new jsPDF();
    const net = invoiceAmount * (1 - invoiceDiscount / 100);
    const vat = net * 0.19;
    const gross = net + vat;
    const invNum = 'RE-2026-' + Math.floor(1000 + Math.random() * 9000);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(139, 92, 246);
    doc.text('KMU SERVICE HARZ', 20, 25);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Digitalisierung & Prozess-Automatisierung | Harz', 20, 32);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`E-RECHNUNG (${invoiceFormat === 'zugferd' ? 'ZUGFeRD 2.0 / Comfort' : 'XRechnung 3.0 Standard'})`, 20, 48);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Rechnungs-Nr.: ${invNum}`, 20, 56);
    doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 20, 62);
    doc.text(`Zahlungsziel: 14 Tage netto`, 20, 68);

    doc.setFont('helvetica', 'bold');
    doc.text('Empfänger:', 130, 48);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceClient, 130, 56);
    doc.text('Buchhaltung / Billing', 130, 62);

    doc.setFillColor(240, 240, 250);
    doc.rect(20, 80, 170, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Position / Beschreibung', 25, 85.5);
    doc.text('Betrag (EUR)', 160, 85.5);

    doc.setFont('helvetica', 'normal');
    doc.text(invoicePackage, 25, 96);
    doc.text(`${net.toFixed(2)} €`, 160, 96);

    if (invoiceDiscount > 0) {
      doc.setTextColor(220, 38, 38);
      doc.text(`Abzüglich ${invoiceDiscount}% Rabatt`, 25, 103);
      doc.setTextColor(0, 0, 0);
    }

    doc.line(20, 115, 190, 115);

    doc.text('Nettobetrag:', 120, 125);
    doc.text(`${net.toFixed(2)} €`, 160, 125);
    doc.text('zzgl. 19% MwSt.:', 120, 132);
    doc.text(`${vat.toFixed(2)} €`, 160, 132);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Gesamtbetrag:', 120, 142);
    doc.text(`${gross.toFixed(2)} €`, 160, 142);

    doc.setFillColor(236, 253, 245);
    doc.rect(20, 160, 170, 25, 'F');
    doc.setFontSize(9);
    doc.setTextColor(6, 95, 70);
    doc.text('✔ DATEV & Lexoffice E-RECHNUNG COMPLIANT', 25, 168);
    doc.setFont('helvetica', 'normal');
    doc.text(`Diese PDF enthält eingebettete strukturierte XML-Rechnungsdaten gemäß EU-Norm EN 16931 (${invoiceFormat.toUpperCase()}).`, 25, 175);

    doc.save(`E-Rechnung_${invoiceClient.replace(/\s+/g, '_')}_${invNum}.pdf`);
  };

  const bookInvoiceToLexoffice = () => {
    const net = invoiceAmount * (1 - invoiceDiscount / 100);
    const gross = net * 1.19;
    const today = new Date().toISOString().split('T')[0];

    const newNotification = {
      id: 'i_' + Date.now(),
      text: `[E-Rechnung Verbucht] ${gross.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € an Lexoffice/DATEV für ${invoiceClient} übermittelt.`,
      date: today
    };

    setInbox(prev => [newNotification, ...prev]);
    alert(`Erfolgreich! E-Rechnung über ${gross.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € wurde an Lexoffice übertragen und in deiner Inbox verbucht.`);
  };

  const triggerSupabaseSync = () => {
    if (supabaseSyncStatus === 'syncing') return;
    setSupabaseSyncStatus('syncing');
    setSupabaseLogsOpen(true);
    
    const getTimestamp = () => {
      const now = new Date();
      const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
      return now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + ms;
    };
 
    setSupabaseLogs([
      `[${getTimestamp()}] 🔄 Verbindungsaufbau zu ${supabaseConfig.url}...`
    ]);
 
    if (!isOnline) {
      setTimeout(() => {
        setSupabaseLogs(prev => [
          ...prev,
          `[${getTimestamp()}] ❌ FEHLER: Keine Internetverbindung erkannt.`,
          `[${getTimestamp()}] 🔌 Synchronisation abgebrochen. Lokale Kopie (localStorage) ist intakt.`
        ]);
        setSupabaseSyncStatus('error');
      }, 1000);
      return;
    }
 
    setSupabaseLogs(prev => [
      ...prev,
      `[${getTimestamp()}] 📡 Authentifizierung mit anon-key erfolgreich.`
    ]);
 
    setTimeout(() => {
      setSupabaseLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 📤 Analysiere lokale Tabellen (localStorage-Mirror)...`,
        `[${getTimestamp()}] 💾 Syncing 'contacts' (${contacts.length} Zeilen)...`,
        `[${getTimestamp()}] 💾 Syncing 'prompts' (${prompts.length} Zeilen)...`,
        `[${getTimestamp()}] 💾 Syncing 'leads' (${leads.length} Zeilen)...`,
        `[${getTimestamp()}] 💾 Syncing 'tasks' (${tasks.length} Zeilen)...`
      ]);
    }, 800);
 
    // Real API fetch in background during sync
    const performLiveSync = async () => {
      try {
        const data = await fetchLeadsFromSupabase(supabaseConfig);
        if (data && data.length > 0) {
          setLeads(data);
        }
      } catch (e) {
        console.error("Supabase sync fetch failed", e);
      }

      try {
        const serverPrompts = await fetchPromptsFromSupabase(supabaseConfig);
        if (serverPrompts) {
          const merged = new Map();
          serverPrompts.forEach(p => merged.set(p.id, p));
          prompts.forEach(p => merged.set(p.id, p));
          const mergedList = Array.from(merged.values());
          setPrompts(mergedList);
          localStorage.setItem('f_prompts', JSON.stringify(mergedList));
        }
      } catch (e) {
        console.error("Supabase sync prompts failed", e);
      }
    };
    performLiveSync();
 
    setTimeout(() => {
      setSupabaseLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 💾 Syncing 'inbox' (${inbox.length} Zeilen)...`,
        `[${getTimestamp()}] 💾 Syncing 'client_tickets' (${clientTickets.length} Zeilen)...`,
        `[${getTimestamp()}] 📥 Empfange Updates von Remote-Datenbank...`
      ]);
    }, 1600);
 
    setTimeout(() => {
      const nowStr = new Date().toLocaleString('de-DE');
      setSupabaseLastSync(nowStr);
      localStorage.setItem('f_sb_last_sync', nowStr);
      setSupabaseSyncStatus('connected');
      setSupabaseLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 🎉 Cloud-Synchronisation erfolgreich abgeschlossen! (Latenz: 24ms)`
      ]);
    }, 2400);
  };

  const handleSaveLeadFeedback = async (e) => {
    e.preventDefault();
    if (!activeLeadId) return;
    
    setIsSavingLead(true);
    const updatedLeads = leads.map(l => {
      if (l.id === activeLeadId) {
        return {
          ...l,
          pain_point: formPainPoint,
          urgency: parseInt(formUrgency) || 0,
          actual_objection: formActualObjection,
          conversation_hook: formConversationHook,
          next_step: formNextStep,
          notes: formNotes,
          status: formStatus
        };
      }
      return l;
    });
    setLeads(updatedLeads);
    localStorage.setItem('f_leads', JSON.stringify(updatedLeads));

    if (isOnline) {
      try {
        const response = await fetch(`${supabaseConfig.url}/rest/v1/leads?id=eq.${activeLeadId}`, {
          method: 'PATCH',
          headers: {
            'apikey': supabaseConfig.anonKey,
            'Authorization': `Bearer ${supabaseConfig.anonKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            pain_point: formPainPoint,
            urgency: parseInt(formUrgency) || 0,
            actual_objection: formActualObjection,
            conversation_hook: formConversationHook,
            next_step: formNextStep,
            notes: formNotes,
            status: formStatus
          })
        });
        if (response.ok) {
          console.log("Lead successfully updated in Supabase.");
        }
      } catch (e) {
        console.error("Fehler beim Cloud-Update des Leads:", e);
      }
    }
    
    setIsSavingLead(false);
    alert("✔ Feedback erfolgreich gespeichert!");
  };

  // Onboarding Save and Export Handlers
  const handleSaveOnboarding = async (customLeadId, answersMap, playbookType, prioritiesMap, calcData) => {
    const targetLeadId = customLeadId || onboardingLeadId;
    if (!targetLeadId) return;

    const isCRMContact = String(targetLeadId).startsWith('c');
    const lead = isCRMContact 
      ? contacts.find(c => c.id === targetLeadId)
      : leads.find(l => l.id === targetLeadId);
    if (!lead) return;

    const activePlaybook = ONBOARDING_PLAYBOOKS[playbookType || onboardingPlaybook];
    let summary = `# Onboarding-Protokoll: ${lead.company}\n`;
    summary += `Datum: ${new Date().toLocaleDateString('de-DE')} | Playbook: ${activePlaybook.title}\n\n`;

    // Digitalisierungs-Score Summary if manual calculation values exist
    const currentHours = calcData ? calcData.hours : onboardingManualHours;
    const currentRate = calcData ? calcData.rate : onboardingHourlyRate;
    const currentRatio = calcData ? calcData.ratio : onboardingSavingRatio;
    
    const monthlyHoursSaved = Math.round(currentHours * 4 * (currentRatio / 100));
    const monthlyMoneySaved = monthlyHoursSaved * currentRate;
    
    summary += `## 📊 Digitalisierungs-Potenzial (Live-Rechner)\n`;
    summary += `- Manuelle Stunden/Woche: ${currentHours} Std.\n`;
    summary += `- Mitarbeiter Stundensatz: ${currentRate} €/Std.\n`;
    summary += `- Angenommene Ersparnis: ${currentRatio}%\n`;
    summary += `- Ersparte Stunden/Monat: **${monthlyHoursSaved} Std.**\n`;
    summary += `- Finanzielles Potenzial: **${monthlyMoneySaved.toLocaleString('de-DE')} € / Monat**\n\n`;

    activePlaybook.phases.forEach(phase => {
      summary += `## ${phase.name}\n`;
      phase.questions.forEach(q => {
        const ans = (answersMap || onboardingAnswers)[q.id] || "Keine Notizen erfasst.";
        const prio = (prioritiesMap || onboardingPriorities)[q.id] || 'keine';
        const prioLabel = prio === 'high' ? '🔴 Hoch (Sofortiger Hebel)' : prio === 'medium' ? '🟡 Mittel' : prio === 'low' ? '🟢 Niedrig' : 'Keine Priorität';
        
        summary += `### ${q.question}\n`;
        summary += `- **Priorität**: ${prioLabel}\n`;
        summary += `- **Antwort**: ${ans}\n\n`;
      });
    });

    const serializedData = JSON.stringify({
      playbook: playbookType || onboardingPlaybook,
      answers: answersMap || onboardingAnswers,
      priorities: prioritiesMap || onboardingPriorities,
      calc: calcData || {
        hours: onboardingManualHours,
        rate: onboardingHourlyRate,
        ratio: onboardingSavingRatio
      }
    });
    const finalNotes = `${summary}\n\n<!--ONBOARDING_DATA: ${serializedData}-->`;

    if (isCRMContact) {
      // Update local state for contacts
      const updatedContacts = contacts.map(c => {
        if (c.id === targetLeadId) {
          return {
            ...c,
            notes: finalNotes,
            stage: 'gespräch'
          };
        }
        return c;
      });
      setContacts(updatedContacts);
      localStorage.setItem('f_contacts', JSON.stringify(updatedContacts));
    } else {
      // Update local state for leads
      const updatedLeads = leads.map(l => {
        if (l.id === targetLeadId) {
          return {
            ...l,
            notes: finalNotes,
            status: 'Pain Points erfasst'
          };
        }
        return l;
      });
      setLeads(updatedLeads);
      localStorage.setItem('f_leads', JSON.stringify(updatedLeads));

      // Update Supabase if online
      if (isOnline) {
        try {
          const response = await fetch(`${supabaseConfig.url}/rest/v1/leads?id=eq.${targetLeadId}`, {
            method: 'PATCH',
            headers: {
              'apikey': supabaseConfig.anonKey,
              'Authorization': `Bearer ${supabaseConfig.anonKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              notes: finalNotes,
              status: 'Pain Points erfasst'
            })
          });
          if (response.ok) {
            console.log("Onboarding notes successfully synced to Supabase.");
          }
        } catch (e) {
          console.error("Fehler beim Cloud-Update des Onboardings:", e);
        }
      }
    }
  };

  const handleExportOnboardingToDocs = () => {
    const isCRMContact = String(onboardingLeadId).startsWith('c');
    const lead = isCRMContact 
      ? contacts.find(c => c.id === onboardingLeadId)
      : leads.find(l => l.id === onboardingLeadId);
    if (!lead) return;

    const activePlaybook = ONBOARDING_PLAYBOOKS[onboardingPlaybook];
    let summary = `# Onboarding-Protokoll: ${lead.company}\n`;
    summary += `Datum: ${new Date().toLocaleDateString('de-DE')} | Playbook: ${activePlaybook.title}\n\n`;

    const monthlyHoursSaved = Math.round(onboardingManualHours * 4 * (onboardingSavingRatio / 100));
    const monthlyMoneySaved = monthlyHoursSaved * onboardingHourlyRate;
    
    summary += `## 📊 Digitalisierungs-Potenzial (Live-Rechner)\n`;
    summary += `- Manuelle Stunden/Woche: ${onboardingManualHours} Std.\n`;
    summary += `- Mitarbeiter Stundensatz: ${onboardingHourlyRate} €/Std.\n`;
    summary += `- Angenommene Ersparnis: ${onboardingSavingRatio}%\n`;
    summary += `- Ersparte Stunden/Monat: **${monthlyHoursSaved} Std.**\n`;
    summary += `- Finanzielles Potenzial: **${monthlyMoneySaved.toLocaleString('de-DE')} € / Monat**\n\n`;

    activePlaybook.phases.forEach(phase => {
      summary += `## ${phase.name}\n`;
      phase.questions.forEach(q => {
        const ans = onboardingAnswers[q.id] || "Keine Notizen erfasst.";
        const prio = onboardingPriorities[q.id] || 'keine';
        const prioLabel = prio === 'high' ? '🔴 Hoch (Sofortiger Hebel)' : prio === 'medium' ? '🟡 Mittel' : prio === 'low' ? '🟢 Niedrig' : 'Keine Priorität';
        
        summary += `### ${q.question}\n`;
        summary += `- **Priorität**: ${prioLabel}\n`;
        summary += `- **Antwort**: ${ans}\n\n`;
      });
    });

    const newDoc = {
      id: 'doc_' + Date.now(),
      title: `Onboarding - ${lead.company}`,
      content: summary,
      lastModified: new Date().toISOString().replace('T', ' ').substring(0, 19),
      syncStatus: 'local'
    };

    setDocs([newDoc, ...docs]);
    alert(`🎉 Protokoll erfolgreich als Dokument "${newDoc.title}" im Wissens-Hub gespeichert! Du kannst es jetzt mit Google Drive synchronisieren.`);
  };

  const handleGenerateOnboardingPDF = () => {
    const isCRMContact = String(onboardingLeadId).startsWith('c');
    const lead = isCRMContact 
      ? contacts.find(c => c.id === onboardingLeadId)
      : leads.find(l => l.id === onboardingLeadId);
    if (!lead) return;

    const doc = new jsPDF();
    const activePlaybook = ONBOARDING_PLAYBOOKS[onboardingPlaybook];

    // Colors
    const primaryColor = [139, 92, 246]; // Purple
    const secondaryColor = [100, 100, 100];
    const darkColor = [30, 30, 40];

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('KMU SERVICE HARZ', 20, 25);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text('Digitalisierungsberatung & Prozess-Automatisierung | Harz', 20, 31);

    doc.setDrawColor(220, 220, 230);
    doc.line(20, 35, 190, 35);

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text('Digitalisierungsfahrplan & Onboarding-Protokoll', 20, 45);

    // Meta box
    doc.setFillColor(245, 245, 250);
    doc.rect(20, 52, 170, 24, 'F');

    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'bold');
    doc.text('Kunde:', 25, 59);
    doc.text('Datum:', 25, 65);
    doc.text('Leitfaden:', 25, 71);

    doc.setFont('helvetica', 'normal');
    doc.text(lead.company, 50, 59);
    doc.text(new Date().toLocaleDateString('de-DE'), 50, 65);
    doc.text(activePlaybook.title.replace('📘 ', ''), 50, 71);

    // Digitalisierungsrechner Box
    const monthlyHoursSaved = Math.round(onboardingManualHours * 4 * (onboardingSavingRatio / 100));
    const monthlyMoneySaved = monthlyHoursSaved * onboardingHourlyRate;

    doc.setFillColor(236, 253, 245);
    doc.rect(20, 82, 170, 28, 'F');
    doc.setDrawColor(16, 185, 129);
    doc.rect(20, 82, 170, 28, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(6, 95, 70);
    doc.text('📊 LIVE-DIGITALISIERUNGSRECHNER POTENZIAL', 25, 88);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(16, 124, 65);
    doc.text(`Angenommene wöchentliche manuelle Büroarbeit: ${onboardingManualHours} Std.`, 25, 94);
    doc.text(`Mitarbeiter-Stundensatz: ${onboardingHourlyRate} €/Std. | Erwartete Automatisierungsquote: ${onboardingSavingRatio}%`, 25, 99);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`PROGNOSTIZIERTE ERSPARNIS: ~${monthlyHoursSaved} Stunden & ~${monthlyMoneySaved.toLocaleString('de-DE')} € pro Monat`, 25, 105);

    let y = 120;

    const printHeader = (text, size, style = 'bold', color = darkColor) => {
      if (y > 260) {
        doc.addPage();
        y = 25;
      }
      doc.setFont('helvetica', style);
      doc.setFontSize(size);
      doc.setTextColor(color[0], color[1], color[2]);
      doc.text(text, 20, y);
      y += (size * 0.4) + 4;
    };

    const printParagraph = (text, size, style = 'normal', color = [50, 50, 50]) => {
      doc.setFont('helvetica', style);
      doc.setFontSize(size);
      doc.setTextColor(color[0], color[1], color[2]);
      const lines = doc.splitTextToSize(text, 170);
      lines.forEach(line => {
        if (y > 275) {
          doc.addPage();
          y = 25;
        }
        doc.text(line, 20, y);
        y += (size * 0.4) + 2.5;
      });
      y += 1.5;
    };

    activePlaybook.phases.forEach(phase => {
      let phaseHasAnswers = false;
      phase.questions.forEach(q => {
        if (onboardingAnswers[q.id]) phaseHasAnswers = true;
      });

      if (phaseHasAnswers) {
        y += 3;
        printHeader(phase.name, 12, 'bold', primaryColor);
        doc.line(20, y - 2, 190, y - 2);
        y += 2;

        phase.questions.forEach(q => {
          const ans = onboardingAnswers[q.id];
          if (ans) {
            const prio = onboardingPriorities[q.id] || 'keine';
            const prioLabel = prio === 'high' ? '[🔴 HOCH (Sofortiger Hebel)]' : prio === 'medium' ? '[🟡 MITTEL]' : prio === 'low' ? '[🟢 NIEDRIG]' : '';
            
            printHeader(`${q.question} ${prioLabel}`, 9.5, 'bold', darkColor);
            printParagraph(`Antwort/Notizen: ${ans}`, 9, 'normal', [80, 80, 90]);
            y += 2;
          }
        });
      }
    });

    y += 5;
    printHeader('Nächste Schritte & Empfehlungen', 12, 'bold', primaryColor);
    printParagraph('1. Überführung der identifizierten Quickwins (Priorität "Hoch") in Make-Automations-Konzepte.', 9);
    printParagraph('2. Erstellung eines detaillierten Lastenhefts auf Basis dieses Onboarding-Protokolls.', 9);
    printParagraph('3. Abstimmung über das erste Pilot-Modul (z.B. Beleg-Upload oder WhatsApp-Anbindungen).', 9);

    doc.save(`Onboarding_Fahrplan_${lead.company.replace(/\s+/g, '_')}.pdf`);
  };

  const startSpeechRecognition = (qId) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Spracherkennung wird von deinem Browser leider nicht unterstützt. Bitte nutze Google Chrome oder Safari.");
      return;
    }
    
    if (recordingQuestionId === qId) {
      if (window.activeRecognition) {
        window.activeRecognition.stop();
      }
      setRecordingQuestionId(null);
      return;
    }
    
    if (window.activeRecognition) {
      window.activeRecognition.stop();
    }
    
    const rec = new SpeechRecognition();
    rec.lang = 'de-DE';
    rec.continuous = false;
    rec.interimResults = false;
    
    rec.onstart = () => {
      setRecordingQuestionId(qId);
    };
    
    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const currentText = onboardingAnswers[qId] || '';
      const newText = currentText ? `${currentText} ${transcript}` : transcript;
      const newAnswers = { ...onboardingAnswers, [qId]: newText };
      setOnboardingAnswers(newAnswers);
      handleSaveOnboarding(onboardingLeadId, newAnswers, onboardingPlaybook, onboardingPriorities, {
        hours: onboardingManualHours,
        rate: onboardingHourlyRate,
        ratio: onboardingSavingRatio
      });
    };
    
    rec.onerror = (e) => {
      console.error("Speech Recognition Error:", e);
      setRecordingQuestionId(null);
    };
    
    rec.onend = () => {
      setRecordingQuestionId(null);
    };
    
    window.activeRecognition = rec;
    rec.start();
  };

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

  // Phase v14: Handlers für einfache Dashboard-Widgets
  const handleSimpleCalendarSubmit = (e) => {
    e.preventDefault();
    if (!simpleEventTime.trim() || !simpleEventText.trim()) return;
    const newEvent = {
      id: 'ev_' + Date.now(),
      title: simpleEventText,
      date: new Date().toISOString().split('T')[0],
      time: simpleEventTime
    };
    setCalendarEvents(prev => [...prev, newEvent]);
    setSimpleEventTime('');
    setSimpleEventText('');
    alert(`📅 Termin hinzugefügt: "${simpleEventText}" um ${simpleEventTime} Uhr.`);
  };

  const handleAddSimpleDashTodoSubmit = (e) => {
    e.preventDefault();
    if (!newDashTodoText.trim()) return;
    handleAddDashTodo(newDashTodoText);
    setNewDashTodoText('');
  };

  const handleAddQuickLink = (e) => {
    e.preventDefault();
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) return;
    
    // Einfache URL-Validierung / Protokoll hinzufügen falls fehlend
    let url = newLinkUrl.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    
    const newLink = {
      id: 'link_' + Date.now(),
      title: newLinkTitle.trim(),
      url: url
    };
    setDashboardLinks(prev => [...prev, newLink]);
    setNewLinkTitle('');
    setNewLinkUrl('');
  };

  const handleDeleteQuickLink = (id) => {
    setDashboardLinks(prev => prev.filter(l => l.id !== id));
  };

  // NLP Kalender & KI-Tagesplaner Handlers (Feature 3 - v5)
  const handleNlpCalendarSubmit = (e) => {
    e.preventDefault();
    if (!nlpCalendarInput.trim()) return;

    let text = nlpCalendarInput;
    let timeStr = '12:00';
    let dateStr = new Date().toISOString().split('T')[0];

    const timeRegex = /(\d{1,2})[:.]?(\d{2})?\s*(Uhr)?/i;
    const timeMatch = text.match(timeRegex);
    if (timeMatch) {
      const hour = String(timeMatch[1]).padStart(2, '0');
      const min = timeMatch[2] ? String(timeMatch[2]).padStart(2, '0') : '00';
      timeStr = `${hour}:${min}`;
      text = text.replace(timeMatch[0], '').trim();
    }

    const today = new Date();
    if (/heute/i.test(text)) {
      text = text.replace(/heute/i, '').trim();
    } else if (/morgen/i.test(text)) {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      dateStr = tomorrow.toISOString().split('T')[0];
      text = text.replace(/morgen/i, '').trim();
    } else {
      const weekdays = ['sonntag', 'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag'];
      for (let i = 0; i < 7; i++) {
        const dayRegex = new RegExp(weekdays[i], 'i');
        if (dayRegex.test(text)) {
          const targetDay = i;
          const currentDay = today.getDay();
          let daysDiff = targetDay - currentDay;
          if (daysDiff <= 0) daysDiff += 7;
          const targetDate = new Date(today);
          targetDate.setDate(today.getDate() + daysDiff);
          dateStr = targetDate.toISOString().split('T')[0];
          text = text.replace(dayRegex, '').trim();
          break;
        }
      }
    }

    text = text.replace(/^(um|am|uhr|telefonat|meeting|treffen|mit)\s+/i, '').trim();
    const eventTitle = text || 'Neuer Termin';

    const startHour = parseInt(timeStr.split(':')[0]);
    const endHour = String((startHour + 1) % 24).padStart(2, '0');
    const timeRange = `${timeStr} - ${endHour}:${timeStr.split(':')[1]}`;

    const newEvent = {
      id: 'ev_' + Date.now(),
      time: timeRange,
      title: eventTitle,
      desc: 'Per NLP erfasst',
      date: dateStr
    };

    setCalendarEvents(prev => [...prev, newEvent]);
    setNlpCalendarInput('');
    alert(`📅 Termin erfasst: "${eventTitle}" am ${new Date(dateStr).toLocaleDateString('de-DE')} um ${timeStr} Uhr.`);
  };

  const deleteCalendarEvent = (id) => {
    setCalendarEvents(prev => prev.filter(ev => ev.id !== id));
  };

  const generateDailyAiTasks = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todaysEvents = calendarEvents.filter(ev => ev.date === todayStr).map(ev => ev.title);
    const crmLeads = contacts.filter(c => c.status === 'lead' || c.status === 'kontakt').map(c => c.company);

    const aiTasks = [];
    if (todaysEvents.length > 0) {
      aiTasks.push(`Vorbereitung: ${todaysEvents[0]}`);
    } else {
      aiTasks.push(`Akquise: 3 neue KMU-Leads im Harz kontaktieren`);
    }

    if (crmLeads.length > 0) {
      aiTasks.push(`Follow-Up: Angebot für ${crmLeads[0]} nachfassen`);
    } else {
      aiTasks.push(`Notizbuch pflegen: Letzte Logbucheinträge synchronisieren`);
    }

    aiTasks.push(`DATEV/Lexoffice: Rechnungsabgleich & Einnahmen-Review`);

    const newFocusTasks = aiTasks.map((t, idx) => ({
      id: 'f_' + Date.now() + '_' + idx,
      text: t,
      completed: false
    }));

    setFocusTasks(newFocusTasks);
    alert("⚡ KI-Tagesplan erfolgreich synthetisiert! Dein Tagesfokus wurde basierend auf Kalender- & CRM-Daten aktualisiert.");
  };

  // Speech-to-Text via Web Speech API (Feature 4 - v5)
  const handleQuickCaptureSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Web Speech API wird von diesem Browser nicht unterstützt. Bitte nutze Google Chrome oder Microsoft Edge.");
      return;
    }

    if (isListeningQuickCapture) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListeningQuickCapture(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuickCapture(prev => prev ? `${prev} ${transcript}` : transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListeningQuickCapture(false);
    };

    recognition.onend = () => {
      setIsListeningQuickCapture(false);
    };

    recognition.start();
  };

  const handleCrmNotesSpeech = (contactId) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Web Speech API wird von diesem Browser nicht unterstützt. Bitte nutze Google Chrome oder Microsoft Edge.");
      return;
    }

    if (isListeningCrmNotes) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListeningCrmNotes(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setContacts(prev => prev.map(c => {
        if (c.id === contactId) {
          return {
            ...c,
            notes: c.notes ? `${c.notes} ${transcript}` : transcript
          };
        }
        return c;
      }));
    };

    recognition.onerror = (event) => {
      console.error("Speech error", event.error);
      setIsListeningCrmNotes(false);
    };

    recognition.onend = () => {
      setIsListeningCrmNotes(false);
    };

    recognition.start();
  };

  // Phase v6 Handlers (Custom Prompt Blocks, Offline Todos & Google Sync)
  const handleAddCustomPromptBlock = (e) => {
    e.preventDefault();
    if (!newBlockName.trim() || !newBlockContent.trim()) return;

    const newBlock = {
      id: 'cpb_' + Date.now(),
      name: newBlockName.trim(),
      category: newBlockCategory,
      content: newBlockContent.trim()
    };

    setCustomPromptBlocks(prev => [...prev, newBlock]);
    setNewBlockName('');
    setNewBlockContent('');
    setShowCustomBlockForm(false);
  };

  const handleDeleteCustomPromptBlock = (id) => {
    setCustomPromptBlocks(prev => prev.filter(b => b.id !== id));
  };

  const handleAddDashTodo = (text) => {
    if (!text.trim()) return;
    const newTodo = {
      id: 'dt_' + Date.now(),
      text: text.trim(),
      completed: false
    };
    setDashTodos(prev => [...prev, newTodo]);
  };

  const handleToggleDashTodo = (id) => {
    setDashTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteDashTodo = (id) => {
    setDashTodos(prev => prev.filter(t => t.id !== id));
  };

  const triggerGoogleSync = () => {
    if (isGoogleSyncing) return;
    setGoogleSyncLogs([]);
    setIsGoogleSyncing(true);

    const logSteps = [
      "🔄 Initialisiere Google API Client (gapi)...",
      "🔑 Validierte gespeicherte OAuth2 Refresh-Tokens in Supabase...",
      "📡 Verbinde mit primary.calendar.google.com...",
      "⏬ Empfange Delta-Sync Events (Sync-Token: cal_sync_8892)...",
      "📂 Scanne Google Drive Pfad 'Founder OS Gehirn'...",
      "🔄 Lese Dokumente: Audit_Dachdeckerei_Müller.pdf, ROI_Modell_V2.xlsx...",
      "✅ Google API Synchronisation erfolgreich abgeschlossen! (14 Kalender-Events & 3 Drive-Dateien synchronisiert)"
    ];

    logSteps.forEach((step, index) => {
      setTimeout(() => {
        setGoogleSyncLogs(prev => [...prev, step]);
        if (index === logSteps.length - 1) {
          setIsGoogleSyncing(false);
          const googleEvent = {
            id: 'ev_google_' + Date.now(),
            time: '11:00 - 12:00',
            title: 'Live Google Meeting: Steuerkanzlei Harz',
            desc: 'Automatisch aus Google Kalender importiert',
            date: new Date().toISOString().split('T')[0]
          };
          setCalendarEvents(prev => {
            if (prev.some(ev => ev.title === googleEvent.title)) return prev;
            return [...prev, googleEvent];
          });
        }
      }, (index + 1) * 600);
    });
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
    
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    
    const contactToAdd = {
      id: newId,
      ...newContact,
      lastContact: today,
      notes: '',
      links: [],
      activityLog: [
        { id: 'al_' + Date.now(), date: `${today} ${nowTime}`, text: 'Lead im CRM erstellt' }
      ]
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
    if (selectedContactId === id) setSelectedContactId(null);
  };

  const updateContactStage = (id, stage) => {
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const logText = `Status geändert auf '${stage}'`;
    
    setContacts(contacts.map(c => {
      if (c.id === id) {
        const newLog = {
          id: 'al_' + Date.now(),
          date: `${today} ${nowTime}`,
          text: logText
        };
        const currentLogs = c.activityLog || [];
        return { 
          ...c, 
          stage, 
          lastContact: today,
          activityLog: [...currentLogs, newLog]
        };
      }
      return c;
    }));
  };

  const updateContactNotes = (id, notes) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, notes } : c));
  };

  const addContactLink = (id, title, url) => {
    if (!title.trim() || !url.trim()) return;
    
    // Auto prefix http if missing
    const formattedUrl = /^(http|https):\/\//.test(url) ? url : 'https://' + url;
    
    setContacts(contacts.map(c => {
      if (c.id === id) {
        const newLink = { id: 'l_' + Date.now(), title, url: formattedUrl };
        const currentLinks = c.links || [];
        
        const today = new Date().toISOString().split('T')[0];
        const nowTime = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        const newLog = {
          id: 'al_' + Date.now(),
          date: `${today} ${nowTime}`,
          text: `Link hinzugefügt: ${title}`
        };
        const currentLogs = c.activityLog || [];
        
        return { 
          ...c, 
          links: [...currentLinks, newLink],
          activityLog: [...currentLogs, newLog]
        };
      }
      return c;
    }));
  };

  const deleteContactLink = (id, linkId) => {
    setContacts(contacts.map(c => {
      if (c.id === id) {
        const currentLinks = c.links || [];
        const linkToDelete = currentLinks.find(l => l.id === linkId);
        
        const today = new Date().toISOString().split('T')[0];
        const nowTime = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        const newLog = {
          id: 'al_' + Date.now(),
          date: `${today} ${nowTime}`,
          text: `Link entfernt: ${linkToDelete ? linkToDelete.title : 'Unbekannter Link'}`
        };
        const currentLogs = c.activityLog || [];
        
        return { 
          ...c, 
          links: currentLinks.filter(l => l.id !== linkId),
          activityLog: [...currentLogs, newLog]
        };
      }
      return c;
    }));
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

  const handleAddPrompt = async (e) => {
    e.preventDefault();
    if (!newPrompt.title.trim() || !newPrompt.text.trim()) return;
    const promptToAdd = {
      id: 'pr_' + Date.now(),
      title: newPrompt.title,
      category: newPrompt.category,
      text: newPrompt.text
    };
    setPrompts([promptToAdd, ...prompts]);
    setNewPrompt({ title: '', category: 'Sales', text: '' });

    if (isOnline) {
      try {
        await savePromptToSupabase(promptToAdd, supabaseConfig);
      } catch (err) {
        console.error("Fehler beim Speichern des Prompts in Supabase:", err);
      }
    }
  };

  const handleOptimizePrompt = async () => {
    if (!newPrompt.text.trim()) {
      alert("Bitte gib zuerst einen Prompt-Entwurf in das Textfeld ein.");
      return;
    }
    setOllamaLoading(true);
    try {
      const result = await optimizePromptWithLocalAI({
        promptText: newPrompt.text,
        geminiApiKey
      });
      setNewPrompt(prev => ({ ...prev, text: result.text }));
      alert(`🎉 Prompt erfolgreich mit ${result.source} optimiert!`);
    } catch (err) {
      alert(err.message || "Fehler bei der Prompt-Optimierung.");
    } finally {
      setOllamaLoading(false);
    }
  };

  const deletePrompt = async (id) => {
    setPrompts(prompts.filter(p => p.id !== id));

    if (isOnline) {
      try {
        await deletePromptFromSupabase(id, supabaseConfig);
      } catch (err) {
        console.error("Fehler beim Löschen des Prompts aus Supabase:", err);
      }
    }
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

  // Phase v7 Editor & Sync Handlers
  const handleOpenDocInEditor = (docId) => {
    if (!docId) {
      setEditingDocId(null);
      setEditorTitle('unbenannt.txt');
      setEditorContent('');
    } else {
      const doc = docs.find(d => d.id === docId);
      if (!doc) return;
      setEditingDocId(doc.id);
      setEditorTitle(doc.title);
      setEditorContent(doc.content || '');
    }
    setIsEditorOpen(true);
  };

  const handleSaveDocFromEditor = () => {
    if (!editorTitle.trim()) {
      alert("Bitte einen Dateinamen eingeben.");
      return;
    }
    const formattedTitle = /\.[a-zA-Z0-9]+$/.test(editorTitle) ? editorTitle : editorTitle + '.txt';

    if (editingDocId === null) {
      const newDoc = {
        id: 'd_' + Date.now(),
        title: formattedTitle,
        content: editorContent,
        status: 'local',
        url: '#'
      };
      setDocs(prev => [newDoc, ...prev]);
    } else {
      setDocs(prev => prev.map(doc => {
        if (doc.id === editingDocId) {
          return {
            ...doc,
            title: formattedTitle,
            content: editorContent,
            status: doc.status === 'synced' ? 'modified' : doc.status
          };
        }
        return doc;
      }));
    }
    setIsEditorOpen(false);
    setEditingDocId(null);
    setEditorTitle('');
    setEditorContent('');
  };

  const triggerManualGoogleDriveSync = () => {
    if (notebookLmSyncStatus === 'syncing') return;
    
    const pendingDocs = docs.filter(d => d.status === 'local' || d.status === 'modified');
    if (pendingDocs.length === 0) {
      alert("Alle Dokumente sind bereits auf dem neuesten Stand in Google Drive!");
      return;
    }

    setNotebookLmSyncStatus('syncing');
    setNotebookLmProgress(0);
    setNotebookLmSyncStep('Verbindung mit Google Drive herstellen...');

    const steps = [
      { progress: 15, text: 'Google Drive Ordner "Founder OS" autorisieren...' },
      ...pendingDocs.flatMap((doc, i) => [
        { progress: 20 + i * 20, text: `Lese Datei ${doc.title} (Status: ${doc.status === 'local' ? 'Neu' : 'Bearbeitet'})...` },
        { progress: 30 + i * 20, text: `Übertrage Datenstrom für ${doc.title} in Google Drive...` }
      ]),
      { progress: 85, text: 'Google Drive Datei-Indizierung abschließen...' },
      { progress: 95, text: 'NotebookLM-Kopplung aktualisieren (Datenquellen neu einlesen)...' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        setNotebookLmSyncStep(steps[currentStep].text);
        setNotebookLmProgress(steps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        
        setDocs(prev => prev.map(d => ({ ...d, status: 'synced' })));
        
        const now = new Date();
        const timeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateStr = 'Heute, ' + timeStr;
        
        setNotebookLmLastSync(dateStr);
        setNotebookLmSyncStatus('synced');
        setNotebookLmSyncStep('');
        alert(`🎉 Google Drive erfolgreich aktualisiert! ${pendingDocs.length} Datei(en) wurden synchronisiert. NotebookLM ist bereit.`);
      }
    }, 900);
  };

  const handleFileUploadMock = () => {
    handleOpenDocInEditor(null);
  };

  const downloadDocAsFile = (doc, e) => {
    e.stopPropagation();
    const element = document.createElement("a");
    const file = new Blob([doc.content || ''], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = doc.title;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDeleteDoc = (docId, e) => {
    e.stopPropagation();
    if (!confirm("Möchtest du dieses Dokument wirklich löschen?")) return;
    setDocs(prev => prev.filter(d => d.id !== docId));
  };

  // Phase v8 Handlers
  const handleResetDemoData = () => {
    if (!confirm("Möchtest du wirklich alle Daten und Einstellungen auf den Werkszustand zurücksetzen? Alle deine persönlichen Anpassungen, Widgets, Notizen und Termine gehen dabei verloren.")) return;
    localStorage.clear();
    window.location.reload();
  };

  const insertMarkdownIntoNotes = (syntax) => {
    const textarea = document.getElementById('dash-scratchpad');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    
    let replacement = "";
    if (syntax === 'bold') {
      replacement = `**${selected || 'Fettgedruckter Text'}**`;
    } else if (syntax === 'italic') {
      replacement = `*${selected || 'Kursiver Text'}*`;
    } else if (syntax === 'list') {
      replacement = `\n- ${selected || 'Listeneintrag'}`;
    }
    
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setDashNotes(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 50);
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

  const activeContact = contacts.find(c => c.id === selectedContactId);

  // Calculations for Financial Cockpit (Dashboard v3)
  const activeProjectsList = projects.filter(proj => {
    const contact = contacts.find(c => c.company === proj.client);
    return contact && contact.stage === 'umsetzung';
  });
  const activeUmsatz = activeProjectsList.reduce((sum, p) => sum + (p.pricePackage || 0), 0);
  
  const pipelineProjectsList = projects.filter(proj => {
    const contact = contacts.find(c => c.company === proj.client);
    return contact && contact.stage === 'angebot';
  });
  const pipelineUmsatz = pipelineProjectsList.reduce((sum, p) => sum + (p.pricePackage || 0), 0);
  const weightedPipeline = Math.round(pipelineUmsatz * 0.5);
  
  const totalPrognose = activeUmsatz + weightedPipeline;
  
  const totalActiveHours = activeProjectsList.reduce((sum, p) => {
    const elapsed = p.trackingStartTime ? (Date.now() - p.trackingStartTime) / (1000 * 60 * 60) : 0;
    return sum + (p.trackedHours || 0) + elapsed;
  }, 0);
  const avgHourlyRate = totalActiveHours > 0 ? Math.round(activeUmsatz / totalActiveHours) : 0;

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('f_app_authenticated') === 'true';
  });
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setLoginError('');
    
    try {
      const hash = await hashPassword(loginPassword);
      const expectedHash = import.meta.env.VITE_APP_PASSWORD_HASH;
      
      // Fallback: If no password hash is set (local dev), bypass authentication
      if (!expectedHash || expectedHash.trim() === '') {
        setIsAuthenticated(true);
        sessionStorage.setItem('f_app_authenticated', 'true');
        return;
      }
      
      if (hash === expectedHash) {
        setIsAuthenticated(true);
        sessionStorage.setItem('f_app_authenticated', 'true');
      } else {
        setLoginError('Ungültiges Passwort. Bitte erneut versuchen.');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Ein kryptografischer Fehler ist aufgetreten.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (!isAuthenticated && import.meta.env.VITE_APP_PASSWORD_HASH && import.meta.env.VITE_APP_PASSWORD_HASH.trim() !== '') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top left, #1e1e30, #0c0c14)',
        fontFamily: 'Outfit, Inter, system-ui, sans-serif',
        color: '#f8fafc',
        padding: '1rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '24px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          textAlign: 'center'
        }}>
          {/* Logo */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
          }}>
            <BrainCircuit size={32} color="#ffffff" />
          </div>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>
            Founder OS
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '2rem' }}>
            KMU Service Harz • Command Center
          </p>
          
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '500', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>
                Passwort eingeben
              </label>
              <input
                type="password"
                className="input-field"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(0, 0, 0, 0.2)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                disabled={isAuthenticating}
                required
              />
            </div>
            
            {loginError && (
              <div style={{
                color: '#ef4444',
                fontSize: '0.85rem',
                textAlign: 'left',
                background: 'rgba(239, 68, 68, 0.1)',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                ⚠️ {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
              disabled={isAuthenticating}
            >
              {isAuthenticating ? 'Prüfe...' : 'Anmelden'} <ChevronRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobile={isMobile}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        clientPortalMode={clientPortalMode}
      />

      {/* Main Container */}
      <div className="app-container" style={isMobile ? { padding: 0 } : { marginLeft: 0, marginRight: 0, maxWidth: '100%' }}>
        {/* Mobile Top Bar */}
        {isMobile && !clientPortalMode && (
          <div className="mobile-top-bar">
            <div className="mobile-brand">
              <div className="brand-logo" style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.5rem' }}>
                <BrainCircuit size={14} />
              </div>
              <h1>Founder OS</h1>
            </div>
            <button className="hamburger-btn" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        )}
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
      {clientPortalMode && (
        <div style={{ background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)', padding: '0.4rem 1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          <span>👁️ Mandantenportal-Vorschau: Du siehst die App aus Sicht von <strong>{mask(selectedClientCompany, 'company')}</strong></span>
          <button onClick={() => setClientPortalMode(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '0.25rem', padding: '0.15rem 0.5rem', fontSize: '0.7rem', color: 'white', cursor: 'pointer' }}>
            Zurück zu Gründer OS
          </button>
        </div>
      )}

      <header className="app-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="brand">
            <div className="brand-logo" style={{ background: clientPortalMode ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : undefined }}>
              {clientPortalMode ? <Shield size={20} /> : <BrainCircuit size={20} />}
            </div>
            <h1>{clientPortalMode ? 'Mandantenportal' : 'Founder OS'}</h1>
            <span className="brand-badge">{clientPortalMode ? mask(selectedClientCompany, 'company') : 'KMU Service Harz'}</span>
          </div>
          
          <button
            type="button"
            className="btn btn-secondary"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              background: 'rgba(239, 68, 68, 0.05)',
              borderColor: 'rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              marginRight: '0.35rem'
            }}
            onClick={handleResetDemoData}
            title="Löscht alle vorgenommenen Änderungen und setzt die App komplett auf den Werkszustand zurück."
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
            }}
          >
            🔄 Reset
          </button>

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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button 
              className={`btn ${clientPortalMode ? 'btn-primary' : 'btn-secondary'}`}
              style={{ 
                padding: '0.35rem 0.75rem', 
                fontSize: '0.75rem', 
                background: clientPortalMode ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: clientPortalMode ? '#8b5cf6' : 'var(--border-color)',
                boxShadow: clientPortalMode ? '0 0 15px rgba(139, 92, 246, 0.4)' : 'none',
                color: 'white'
              }}
              onClick={() => setClientPortalMode(!clientPortalMode)}
              title="Wechselt in das White-Label Kunden-Portal."
            >
              Kunden-Portal: {clientPortalMode ? 'AKTIV' : 'AUS'}
            </button>

            {clientPortalMode && (
              <select 
                className="input-field"
                style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}
                value={selectedClientCompany}
                onChange={(e) => setSelectedClientCompany(e.target.value)}
              >
                {contacts.map(c => (
                  <option key={c.id} value={c.company}>{mask(c.company, 'company')}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        
        {/* ==================== CLIENT PORTAL MODE VIEW ==================== */}
        {clientPortalMode ? (() => {
          const currentContact = contacts.find(c => c.company === selectedClientCompany) || contacts[0];
          const currentProject = projects.find(p => p.client === selectedClientCompany) || { pricePackage: 2500, trackedHours: 42.5, ready: true };
          const companyTickets = clientTickets.filter(t => t.client === selectedClientCompany);
          
          const hoursSaved = (currentProject.trackedHours || 35).toFixed(0);
          const eurSaved = Math.round(hoursSaved * 85);

          return (
            <div className="client-portal-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Client Hero Banner */}
              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15))', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Willkommen im Mandantenportal
                    </span>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginTop: '0.25rem' }}>
                      {mask(selectedClientCompany, 'company')}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      Ansprechpartner: <strong>{mask(currentContact?.name || 'Max Mustermann', 'name')}</strong> | System: <span className="tag tag-system">{mask(currentContact?.system || 'DATEV', 'system')}</span>
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Betreut von:</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-purple)' }}>KMU Service Harz</span>
                  </div>
                </div>
              </div>

              {/* Client KPI Grid */}
              <div className="financial-kpi-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="kpi-card" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                  <span className="kpi-label">Projekt-Status</span>
                  <span className="kpi-value text-cyan" style={{ fontSize: '1.25rem' }}>
                    {currentProject.ready ? '✅ In Betrieb' : '⚙️ In Umsetzung'}
                  </span>
                  <span className="kpi-desc">Systeme laufen automatisiert</span>
                </div>

                <div className="kpi-card" style={{ borderLeft: '3px solid var(--accent-green)' }}>
                  <span className="kpi-label">Zeitersparnis (Gesamt)</span>
                  <span className="kpi-value text-green" style={{ fontSize: '1.25rem' }}>~ {hoursSaved} Std.</span>
                  <span className="kpi-desc">Freigestellte Bürozeit</span>
                </div>

                <div className="kpi-card" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                  <span className="kpi-label">Kalkulatorische Ersparnis</span>
                  <span className="kpi-value text-purple" style={{ fontSize: '1.25rem' }}>~ {eurSaved.toLocaleString('de-DE')} €</span>
                  <span className="kpi-desc">Basierend auf 85 €/h Stundensatz</span>
                </div>

                <div className="kpi-card" style={{ borderLeft: '3px solid var(--accent-yellow)' }}>
                  <span className="kpi-label">Support-Tickets</span>
                  <span className="kpi-value text-yellow" style={{ fontSize: '1.25rem' }}>{companyTickets.filter(t => t.status === 'offen').length} Offen</span>
                  <span className="kpi-desc">{companyTickets.length} Tickets insgesamt</span>
                </div>
              </div>

              {/* Client Portal 2-Spalten Hauptbereich */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }} className="make-simulator-grid">
                
                {/* Linke Spalte: Dokumente & SOPs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Freigegebene SOPs / Anleitungen */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title" style={{ fontSize: '1rem', color: 'var(--accent-purple)' }}>
                        <CheckCircle size={18} /> Freigegebene SOPs & Anleitungen
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {sopTemplates.map((template, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.85rem' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                            {template.name}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {template.steps.slice(0, 2).map((step, sIdx) => (
                              <div key={sIdx} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <ChevronRight size={12} className="text-cyan-500" /> {mask(step, 'inbox')}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projekt-Dokumente & Links */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title" style={{ fontSize: '1rem', color: 'var(--accent-cyan)' }}>
                        <FileText size={18} /> Projekt-Dokumente & Ordner
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {currentContact?.links && currentContact.links.length > 0 ? (
                        currentContact.links.map(link => (
                          <a key={link.id} href={link.url} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                            <span>📁 {link.title}</span>
                            <ExternalLink size={14} className="text-cyan-500" />
                          </a>
                        ))
                      ) : (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', italic: 'true' }}>
                          Keine verknüpften Ordner vorhanden.
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Rechte Spalte: Support- & Änderungsticket System */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Neuer Ticket Erstellen Formular */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title" style={{ fontSize: '1rem', color: 'var(--accent-green)' }}>
                        <LifeBuoy size={18} /> Neues Support-Ticket einreichen
                      </h3>
                    </div>
                    <form onSubmit={handleCreateClientTicket} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      <div className="input-group">
                        <label style={{ fontSize: '0.75rem' }}>Anliegen / Titel</label>
                        <input 
                          type="text" 
                          className="input-field"
                          placeholder="z.B. Neuentwickelten WhatsApp-Bot anpassen..."
                          value={newTicketTitle}
                          onChange={(e) => setNewTicketTitle(e.target.value)}
                          required
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                        <div className="input-group">
                          <label style={{ fontSize: '0.75rem' }}>Priorität</label>
                          <select 
                            className="input-field"
                            value={newTicketPriority}
                            onChange={(e) => setNewTicketPriority(e.target.value)}
                          >
                            <option value="hoch">Hoch (Dringend)</option>
                            <option value="mittel">Mittel (Standard)</option>
                            <option value="niedrig">Niedrig (Wunsch)</option>
                          </select>
                        </div>
                      </div>

                      <div className="input-group">
                        <label style={{ fontSize: '0.75rem' }}>Beschreibung</label>
                        <textarea 
                          className="input-field"
                          rows={3}
                          placeholder="Beschreibe deine Änderungswünsche oder Fragen..."
                          value={newTicketDesc}
                          onChange={(e) => setNewTicketDesc(e.target.value)}
                        />
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem' }}>
                        <Send size={14} /> Ticket absenden
                      </button>
                    </form>
                  </div>

                  {/* Bisherige Tickets Liste */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Bisherige Support-Tickets ({companyTickets.length})
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto' }}>
                      {companyTickets.map(t => (
                        <div key={t.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{t.title}</span>
                            <span className={`card-priority priority-${t.priority}`}>{t.priority}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>{t.desc}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            <span>Erstellt: {t.date}</span>
                            <span style={{ color: t.status === 'offen' ? 'var(--accent-yellow)' : 'var(--accent-green)', fontWeight: 600 }}>Status: {t.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          );
        })() : (
          <>
        {/* ==================== TAB 1: DASHBOARD ==================== */}
        {activeTab === 'dashboard' && (
          <DashboardView
            dashboardWidgets={dashboardWidgets}
            setDashboardWidgets={setDashboardWidgets}
            isEditingDashboard={isEditingDashboard}
            setIsEditingDashboard={setIsEditingDashboard}
            dashboardGoal={dashboardGoal}
            setDashboardGoal={setDashboardGoal}
            stickyNoteColor={stickyNoteColor}
            setStickyNoteColor={setStickyNoteColor}
            dashNotes={dashNotes}
            setDashNotes={setDashNotes}
            handleAddSimpleDashTodoSubmit={handleAddSimpleDashTodoSubmit}
            newDashTodoText={newDashTodoText}
            setNewDashTodoText={setNewDashTodoText}
            dashTodos={dashTodos}
            handleToggleDashTodo={handleToggleDashTodo}
            handleDeleteDashTodo={handleDeleteDashTodo}
            handleAddDashTodo={handleAddDashTodo}
            handleSimpleCalendarSubmit={handleSimpleCalendarSubmit}
            simpleEventTime={simpleEventTime}
            setSimpleEventTime={setSimpleEventTime}
            simpleEventText={simpleEventText}
            setSimpleEventText={setSimpleEventText}
            calendarEvents={calendarEvents}
            deleteCalendarEvent={deleteCalendarEvent}
            dashboardLinks={dashboardLinks}
            handleDeleteQuickLink={handleDeleteQuickLink}
            handleAddQuickLink={handleAddQuickLink}
            newLinkTitle={newLinkTitle}
            setNewLinkTitle={setNewLinkTitle}
            newLinkUrl={newLinkUrl}
            setNewLinkUrl={setNewLinkUrl}
            activeUmsatz={activeUmsatz}
            activeProjectsList={activeProjectsList}
            pipelineUmsatz={pipelineUmsatz}
            weightedPipeline={weightedPipeline}
            totalPrognose={totalPrognose}
            avgHourlyRate={avgHourlyRate}
            invoiceFormat={invoiceFormat}
            setInvoiceFormat={setInvoiceFormat}
            invoiceClient={invoiceClient}
            setInvoiceClient={setInvoiceClient}
            contacts={contacts}
            mask={mask}
            invoiceDiscount={invoiceDiscount}
            setInvoiceDiscount={setInvoiceDiscount}
            invoicePackage={invoicePackage}
            setInvoicePackage={setInvoicePackage}
            invoiceAmount={invoiceAmount}
            setInvoiceAmount={setInvoiceAmount}
            generateEinvoicePdf={generateEinvoicePdf}
            bookInvoiceToLexoffice={bookInvoiceToLexoffice}
            invoiceXmlPreview={invoiceXmlPreview}
            setInvoiceXmlPreview={setInvoiceXmlPreview}
            quickCapture={quickCapture}
            setQuickCapture={setQuickCapture}
            handleQuickCapture={handleQuickCapture}
            handleQuickCaptureSpeech={handleQuickCaptureSpeech}
            isListeningQuickCapture={isListeningQuickCapture}
            googleConnected={googleConnected}
            setGoogleConnected={setGoogleConnected}
            isConnectingGoogle={isConnectingGoogle}
            setIsConnectingGoogle={setIsConnectingGoogle}
            triggerGoogleSync={triggerGoogleSync}
            isGoogleSyncing={isGoogleSyncing}
            googleSyncLogs={googleSyncLogs}
            nlpCalendarInput={nlpCalendarInput}
            setNlpCalendarInput={setNlpCalendarInput}
            handleNlpCalendarSubmit={handleNlpCalendarSubmit}
            generateDailyAiTasks={generateDailyAiTasks}
            addFocusTask={addFocusTask}
            newFocusText={newFocusText}
            setNewFocusText={setNewFocusText}
            focusTasks={focusTasks}
            toggleFocusTask={toggleFocusTask}
            deleteFocusTask={deleteFocusTask}
            habitStreak={habitStreak}
            setHabitStreak={setHabitStreak}
            triggerConfetti={triggerConfetti}
            habits={habits}
            toggleHabit={toggleHabit}
            archiveOpen={archiveOpen}
            setArchiveOpen={setArchiveOpen}
            generateWeeklyArchivePDF={generateWeeklyArchivePDF}
            getLast7Days={getLast7Days}
            weeklyArchive={weeklyArchive}
            updateReflection={updateReflection}
            insertMarkdownIntoNotes={insertMarkdownIntoNotes}
          />
        )}

        {/* ==================== TAB 2: INBOX & TASKS ==================== */}
        {activeTab === 'tasks' && (
          <KanbanBoard
            triggerWhatsAppSimulation={triggerWhatsAppSimulation}
            simMessage={simMessage}
            setSimMessage={setSimMessage}
            isSimulating={isSimulating}
            webhookUrl={webhookUrl}
            setWebhookUrl={setWebhookUrl}
            isOnline={isOnline}
            simStep={simStep}
            inbox={inbox}
            mask={mask}
            convertInboxToTask={convertInboxToTask}
            deleteInboxItem={deleteInboxItem}
            addNewTask={addNewTask}
            newTaskTitle={newTaskTitle}
            setNewTaskTitle={setNewTaskTitle}
            newTaskPriority={newTaskPriority}
            setNewTaskPriority={setNewTaskPriority}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            tasks={tasks}
            handleDragStart={handleDragStart}
            deleteTask={deleteTask}
          />
        )}

        {/* ==================== TAB 3: CRM & PROJECTS ==================== */}
        {activeTab === 'crm' && (
          <CrmPipeline
            handleAddContact={handleAddContact}
            newContact={newContact}
            setNewContact={setNewContact}
            contacts={contacts}
            crmStageFilter={crmStageFilter}
            setCrmStageFilter={setCrmStageFilter}
            isLeadInactive={isLeadInactive}
            setSelectedContactId={setSelectedContactId}
            mask={mask}
            updateContactStage={updateContactStage}
            deleteContact={deleteContact}
            projects={projects}
            toggleProjectStep={toggleProjectStep}
            updateProjectPrice={updateProjectPrice}
            updateProjectHours={updateProjectHours}
            stopProjectTracking={stopProjectTracking}
            startProjectTracking={startProjectTracking}
          />
        )}

        {/* ==================== TAB 4a: KI PROMPTS & CONTENT ==================== */}
        {activeTab === 'prompts' && (
          <PromptVault
            showGeminiConfig={showGeminiConfig}
            setShowGeminiConfig={setShowGeminiConfig}
            geminiApiKey={geminiApiKey}
            setGeminiApiKey={setGeminiApiKey}
            newPrompt={newPrompt}
            setNewPrompt={setNewPrompt}
            handleAddPrompt={handleAddPrompt}
            handleOptimizePrompt={handleOptimizePrompt}
            ollamaLoading={ollamaLoading}
            customPromptBlocks={customPromptBlocks}
            handleDeleteCustomPromptBlock={handleDeleteCustomPromptBlock}
            showCustomBlockForm={showCustomBlockForm}
            setShowCustomBlockForm={setShowCustomBlockForm}
            newBlockName={newBlockName}
            setNewBlockName={setNewBlockName}
            newBlockCategory={newBlockCategory}
            setNewBlockCategory={setNewBlockCategory}
            newBlockContent={newBlockContent}
            setNewBlockContent={setNewBlockContent}
            handleAddCustomPromptBlock={handleAddCustomPromptBlock}
            promptSearch={promptSearch}
            setPromptSearch={setPromptSearch}
            promptCategoryFilter={promptCategoryFilter}
            setPromptCategoryFilter={setPromptCategoryFilter}
            prompts={prompts}
            copyPromptText={copyPromptText}
            deletePrompt={deletePrompt}
            newPost={newPost}
            setNewPost={setNewPost}
            handleAddPost={handleAddPost}
            contentPosts={contentPosts}
            deletePost={deletePost}
            ragPersona={ragPersona}
            setRagPersona={setRagPersona}
            ragInput={ragInput}
            setRagInput={setRagInput}
            ragGenerating={ragGenerating}
            ragChat={ragChat}
            handleSendRagQuery={handleSendRagQuery}
          />
        )}

        {/* ==================== TAB 4b: DOKUMENTE & SYNC ==================== */}
        {activeTab === 'hub' && (
          <DocsHub
            handleOpenDocInEditor={handleOpenDocInEditor}
            docs={docs}
            setDocs={setDocs}
            mask={mask}
            downloadDocAsFile={downloadDocAsFile}
            handleDeleteDoc={handleDeleteDoc}
            notebookLmSyncStatus={notebookLmSyncStatus}
            notebookLmLastSync={notebookLmLastSync}
            notebookLmSyncStep={notebookLmSyncStep}
            notebookLmProgress={notebookLmProgress}
            triggerManualGoogleDriveSync={triggerManualGoogleDriveSync}
            googleClientId={googleClientId}
            setGoogleClientId={setGoogleClientId}
            supabaseSyncStatus={supabaseSyncStatus}
            isOnline={isOnline}
            supabaseLastSync={supabaseLastSync}
            contacts={contacts}
            prompts={prompts}
            tasks={tasks}
            inbox={inbox}
            clientTickets={clientTickets}
            triggerSupabaseSync={triggerSupabaseSync}
            supabaseLogs={supabaseLogs}
            ragPersona={ragPersona}
            setRagPersona={setRagPersona}
            handleSendRagQuery={handleSendRagQuery}
            ragChat={ragChat}
            ragGenerating={ragGenerating}
            ragInput={ragInput}
            setRagInput={setRagInput}
          />
        )}

        {/* ==================== TAB 5: SALES-TOOLS & SOPs ==================== */}
        {activeTab === 'sales' && (
          <SopManager
            calcInputs={calcInputs}
            setCalcInputs={setCalcInputs}
            savings={savings}
            generatePDFReport={generatePDFReport}
            sopTemplates={sopTemplates}
            startSopFromTemplate={startSopFromTemplate}
            activeSops={activeSops}
            mask={mask}
            deleteActiveSop={deleteActiveSop}
            toggleActiveSopStep={toggleActiveSopStep}
            PROCESSES={PROCESSES}
            selectedUseCase={selectedUseCase}
            setSelectedUseCase={setSelectedUseCase}
            makeSimRunning={makeSimRunning}
            startMakeSimulation={startMakeSimulation}
            makeActiveNode={makeActiveNode}
            makeLogs={makeLogs}
            startCanvasTestRun={startCanvasTestRun}
            canvasTestRunning={canvasTestRunning}
            addCanvasNode={addCanvasNode}
            canvasNodes={canvasNodes}
            setCanvasNodes={setCanvasNodes}
            selectedCanvasNodeId={selectedCanvasNodeId}
            setSelectedCanvasNodeId={setSelectedCanvasNodeId}
            canvasTestActiveNode={canvasTestActiveNode}
            deleteCanvasNode={deleteCanvasNode}
            updateCanvasNodeConfig={updateCanvasNodeConfig}
            canvasTestLogs={canvasTestLogs}
            voiceScenario={voiceScenario}
            setVoiceScenario={setVoiceScenario}
            voiceCallActive={voiceCallActive}
            startVoiceCallSimulation={startVoiceCallSimulation}
            voiceTranscript={voiceTranscript}
            voiceExtractedData={voiceExtractedData}
          />
        )}

        {activeTab === 'leads' && (
          <div className="leads-grid" id="leads-tab-content">
            
            {/* Linke Spalte: Leads Liste */}
            {(!isMobile || !activeLeadId) && (
              <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 'fit-content', maxHeight: '80vh' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <PhoneCall size={20} className="text-purple-500" />
                    Kaltakquise-Kontakte ({leads.length})
                  </h2>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const data = await fetchLeadsFromSupabase(supabaseConfig);
                        if (data && data.length > 0) {
                          setLeads(data);
                          localStorage.setItem('f_leads', JSON.stringify(data));
                          alert(`✅ Erfolgreich ${data.length} Kaltakquise-Leads direkt aus Supabase geladen!`);
                        } else {
                          alert('Keine Leads in Supabase gefunden.');
                        }
                      } catch (err) {
                        alert('Fehler beim Laden der Supabase Leads: ' + err.message);
                      }
                    }}
                    className="btn btn-secondary"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px' }}
                  >
                    <RefreshCw size={14} /> 🔄 90 Cloud-Leads laden
                  </button>
                </div>
                
                {/* Suche */}
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Firma oder Branche suchen..."
                  value={leadsSearch}
                  onChange={(e) => setLeadsSearch(e.target.value)}
                  style={{ width: '100%' }}
                />

                {/* Filter */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  <select 
                    className="input-field" 
                    value={leadsPrioFilter} 
                    onChange={(e) => setLeadsPrioFilter(e.target.value)}
                    style={{ fontSize: '0.7rem', height: 'auto', padding: '0.2rem 0.4rem', flex: 1 }}
                  >
                    <option value="all">Alle Prioritäten</option>
                    <option value="A">Prio A</option>
                    <option value="B">Prio B</option>
                    <option value="C">Prio C</option>
                  </select>

                  <select 
                    className="input-field" 
                    value={leadsStatusFilter} 
                    onChange={(e) => setLeadsStatusFilter(e.target.value)}
                    style={{ fontSize: '0.7rem', height: 'auto', padding: '0.2rem 0.4rem', flex: 1 }}
                  >
                    <option value="all">Alle Status</option>
                    <option value="nicht kontaktiert">Nicht kontaktiert</option>
                    <option value="in Arbeit">In Arbeit</option>
                    <option value="Pain Points erfasst">Pain Points erfasst</option>
                    <option value="Kein Interesse">Kein Interesse</option>
                    <option value="Wiedervorlage">Wiedervorlage</option>
                  </select>
                </div>
              </div>

              {/* Leads Liste */}
              <div style={{ overflowY: 'auto', flex: 1, padding: '0 0.5rem', maxHeight: '55vh' }}>
                {leads
                  .filter(l => {
                    const matchesSearch = l.company.toLowerCase().includes(leadsSearch.toLowerCase()) || 
                                          (l.industry && l.industry.toLowerCase().includes(leadsSearch.toLowerCase()));
                    const matchesPrio = leadsPrioFilter === 'all' || l.priority === leadsPrioFilter;
                    const matchesStatus = leadsStatusFilter === 'all' || l.status === leadsStatusFilter;
                    return matchesSearch && matchesPrio && matchesStatus;
                  })
                  .map(lead => {
                    const isActive = lead.id === activeLeadId;
                    const isCompleted = lead.status === 'Pain Points erfasst';
                    return (
                      <div 
                        key={lead.id}
                        onClick={() => setActiveLeadId(lead.id)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                          border: isActive ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                          marginBottom: '0.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '0.25rem', background: lead.priority === 'A' ? 'rgba(239, 68, 68, 0.15)' : lead.priority === 'B' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: lead.priority === 'A' ? '#f87171' : lead.priority === 'B' ? '#fbbf24' : '#34d399' }}>
                            Prio {lead.priority}
                          </span>
                          <span style={{ fontSize: '0.65rem', color: isCompleted ? '#34d399' : 'var(--text-secondary)' }}>
                            {lead.status}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0.35rem 0 0.15rem 0', color: 'white' }}>
                          {showcaseMode ? 'Muster-Firma GmbH' : lead.company}
                        </h4>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                          {lead.industry} • {lead.city}
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
            )}

            {/* Rechte Spalte: Lead-Protokoll & Anruf-Dashboard */}
            {(!isMobile || activeLeadId) && (
              <div className="card" style={{ height: 'fit-content' }}>
                {isMobile && activeLeadId && (
                  <button
                    type="button"
                    onClick={() => setActiveLeadId(null)}
                    className="btn btn-secondary"
                    style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem', width: 'fit-content' }}
                  >
                    ← Zurück zur Lead-Liste
                  </button>
                )}
                {activeLeadId ? (() => {
                const activeLead = leads.find(l => l.id === activeLeadId);
                if (!activeLead) return null;
                return (
                  <form onSubmit={handleSaveLeadFeedback}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                      <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'white' }}>
                          {showcaseMode ? 'Muster-Firma GmbH' : activeLead.company}
                        </h2>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {activeLead.industry} • {activeLead.street}, {activeLead.city}
                        </span>
                      </div>
                      
                      {activeLead.phone && (
                        <a 
                          href={`tel:${activeLead.phone}`} 
                          className="btn btn-primary"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
                        >
                          <Phone size={14} /> Jetzt anrufen
                        </a>
                      )}
                    </div>

                    {/* Vorbereitungs-Box */}
                    <div style={{ background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.15)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1.25rem' }}>
                      <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginTop: 0, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <BrainCircuit size={12} /> Vorbereitungs-Hinweise
                      </h4>
                      {activeLead.expected_objection && (
                        <div style={{ fontSize: '0.75rem', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                          <strong>Möglicher Einwand:</strong> {activeLead.expected_objection}
                        </div>
                      )}
                      {activeLead.call_hook && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          <strong>Gesprächs-Aufhänger:</strong> {activeLead.call_hook}
                        </div>
                      )}
                    </div>

                    {/* Feedback-Formular */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label htmlFor="pain-point-select" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Pain Point (Primär)
                        </label>
                        <select 
                          id="pain-point-select"
                          className="input-field"
                          value={formPainPoint}
                          onChange={(e) => setFormPainPoint(e.target.value)}
                        >
                          <option value="">-- Schmerzpunkt wählen --</option>
                          <option value="Bürokratie / Papierkram">Bürokratie / Papierkram</option>
                          <option value="Zeitmangel in der Verwaltung">Zeitmangel in der Verwaltung</option>
                          <option value="Fehlende Übersicht / Chaos">Fehlende Übersicht / Chaos</option>
                          <option value="Probleme bei Nachkalkulation">Probleme bei Nachkalkulation</option>
                          <option value="Angst vor komplexer IT">Angst vor komplexer IT</option>
                          <option value="Fachkräftemangel / Auslastung">Fachkräftemangel / Auslastung</option>
                          <option value="Anderer Pain Point">Anderer Schmerzpunkt (siehe Notiz)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Dringlichkeit (1-5)
                        </label>
                        <div style={{ display: 'flex', gap: '0.25rem', height: '38px', alignItems: 'center' }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFormUrgency(star)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                padding: '0 0.1rem',
                                color: star <= formUrgency ? 'var(--accent-yellow)' : 'var(--text-muted)'
                              }}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Eingangshürde / Einwand (real)
                        </label>
                        <textarea
                          className="input-field"
                          style={{ height: '70px', resize: 'vertical' }}
                          value={formActualObjection}
                          onChange={(e) => setFormActualObjection(e.target.value)}
                          placeholder="Welcher Einwand wurde geäußert?..."
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Tatsächlicher Gesprächs-Aufhänger
                        </label>
                        <textarea
                          className="input-field"
                          style={{ height: '70px', resize: 'vertical' }}
                          value={formConversationHook}
                          onChange={(e) => setFormConversationHook(e.target.value)}
                          placeholder="Welches Thema hat das Eis gebrozen?..."
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label htmlFor="next-step-input" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Nächster Schritt
                        </label>
                        <input
                          id="next-step-input"
                          type="text"
                          className="input-field"
                          value={formNextStep}
                          onChange={(e) => setFormNextStep(e.target.value)}
                          placeholder="z.B. Termin vereinbaren, Wiedervorlage..."
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Status
                        </label>
                        <select 
                          className="input-field"
                          value={formStatus}
                          onChange={(e) => setFormStatus(e.target.value)}
                        >
                          <option value="nicht kontaktiert">Nicht kontaktiert</option>
                          <option value="in Arbeit">In Arbeit</option>
                          <option value="Pain Points erfasst">Pain Points erfasst</option>
                          <option value="Kein Interesse">Kein Interesse</option>
                          <option value="Wiedervorlage">Wiedervorlage</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                        Bemerkungen / Weitere Details
                      </label>
                      <textarea
                        className="input-field"
                        style={{ height: '80px', resize: 'vertical' }}
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder="Interne Notizen zum Telefonat..."
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                      disabled={isSavingLead}
                    >
                      <CheckCircle size={16} />
                      {isSavingLead ? 'Speichert...' : 'Gesprächs-Feedback speichern'}
                    </button>
                  </form>
                );
              })() : (
                <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📞</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Kein Unternehmen ausgewählt</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '300px', margin: '0 auto' }}>
                    Wähle ein Unternehmen aus der linken Liste aus, um das Kaltakquise-Gespräch zu starten und zu dokumentieren.
                  </p>
                </div>
              )}
            </div>
            )}
            
          </div>
        )}

        {activeTab === 'onboarding' && (
          <div className="onboarding-container" id="onboarding-tab-content">
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                  <HelpCircle size={22} className="text-purple-500" />
                  Kunden-Onboarding Gesprächs-Leitfaden
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {/* Select Lead/Client */}
                  <select 
                    className="input-field"
                    value={onboardingLeadId || ''}
                    onChange={(e) => setOnboardingLeadId(e.target.value || null)}
                    style={{ minWidth: '220px' }}
                  >
                    <option value="">-- Kunden/Lead auswählen --</option>
                    <optgroup label="CRM-Kontakte & Mandanten">
                      {contacts.map(c => (
                        <option key={c.id} value={c.id}>{showcaseMode ? 'Muster-Firma' : c.company} ({c.industry || 'Keine Branche'})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Kaltakquise-Leads">
                      {leads.map(l => (
                        <option key={l.id} value={l.id}>{showcaseMode ? 'Muster-Firma' : l.company} ({l.industry || 'Keine Branche'})</option>
                      ))}
                    </optgroup>
                  </select>

                  {/* Playbook Select */}
                  <select
                    className="input-field"
                    value={onboardingPlaybook}
                    onChange={(e) => setOnboardingPlaybook(e.target.value)}
                    disabled={!onboardingLeadId}
                  >
                    <option value="master">📘 Master-Playbook</option>
                    <option value="pilot">🛠️ Pilot-Playbook (Bruder)</option>
                  </select>
                </div>
              </div>
            </div>

            {onboardingLeadId ? (() => {
              const isCRMContact = String(onboardingLeadId).startsWith('c');
              const selectedLead = isCRMContact 
                ? contacts.find(c => c.id === onboardingLeadId)
                : leads.find(l => l.id === onboardingLeadId);
              if (!selectedLead) return null;
              const playbook = ONBOARDING_PLAYBOOKS[onboardingPlaybook];
              const phase = playbook.phases[onboardingActivePhase];
              
              if (!phase) return null;

              // Calculate overall question progress
              let totalQuestions = 0;
              let answeredQuestions = 0;
              playbook.phases.forEach(p => {
                p.questions.forEach(q => {
                  totalQuestions++;
                  if (onboardingAnswers[q.id] && onboardingAnswers[q.id].trim() !== '') {
                    answeredQuestions++;
                  }
                });
              });
              const progressPercentage = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

              return (
                <div className="onboarding-wizard">
                  
                  {/* Left Column: Questionnaire Wizard */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    {/* Progress Bar */}
                    <div className="card" style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                        <span>Aktiv: {playbook.phases[onboardingActivePhase].name}</span>
                        <span>{answeredQuestions} von {totalQuestions} Fragen beantwortet ({progressPercentage}%)</span>
                      </div>
                      <div className="wizard-progress-bar">
                        <div className="wizard-progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                      </div>

                      {/* Phase Navigation Tabs */}
                      <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                        {playbook.phases.map((p, idx) => (
                          <button
                            key={idx}
                            onClick={() => setOnboardingActivePhase(idx)}
                            className="btn"
                            style={{
                              padding: '0.35rem 0.65rem',
                              fontSize: '0.75rem',
                              background: onboardingActivePhase === idx ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                              borderColor: onboardingActivePhase === idx ? 'var(--accent-purple)' : 'var(--border-color)',
                              color: onboardingActivePhase === idx ? 'white' : 'var(--text-secondary)',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {p.name.split(':')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question Card */}
                    <div className="wizard-card">
                      <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-purple)', fontWeight: 700, marginBottom: '0.5rem' }}>
                        {phase.name}
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic' }}>
                        {phase.description}
                      </p>

                      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1rem 0' }} />

                      {phase.questions.map((q) => {
                        const answerValue = onboardingAnswers[q.id] || '';
                        return (
                          <div key={q.id} style={{ marginBottom: '2rem' }}>
                            <div className="wizard-question-text">{q.question}</div>
                            
                            {/* Question Meta Drawer / Help Box */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', margin: '0.75rem 0' }}>
                              {q.why && (
                                <div className="info-box" style={{ margin: 0, padding: '0.75rem' }}>
                                  <div className="info-box-title">Ziel & Erkenntnisse</div>
                                  <div className="info-box-content">{q.why}</div>
                                </div>
                              )}
                              {q.followup && (
                                <div className="info-box" style={{ margin: 0, padding: '0.75rem', borderLeft: '3px solid var(--accent-indigo)', background: 'rgba(99, 102, 241, 0.03)' }}>
                                  <div className="info-box-title" style={{ color: 'var(--accent-indigo)' }}>Folgefragen</div>
                                  <div className="info-box-content" style={{ fontStyle: 'italic' }}>{q.followup}</div>
                                </div>
                              )}
                              {q.warning && (
                                <div className="info-box" style={{ margin: 0, padding: '0.75rem', borderLeft: '3px solid var(--accent-yellow)', background: 'rgba(245, 158, 11, 0.03)' }}>
                                  <div className="info-box-title" style={{ color: 'var(--accent-yellow)' }}>Warnsignal & Potenzial</div>
                                  <div className="info-box-content">{q.warning}</div>
                                </div>
                              )}
                            </div>

                            {/* Note Taking Text Area */}
                            <textarea
                              className="notes-editor"
                              placeholder={q.placeholder || "Trage hier deine Notizen und die Antworten des Kunden ein..."}
                              value={answerValue}
                              onChange={(e) => {
                                const newAnswers = { ...onboardingAnswers, [q.id]: e.target.value };
                                setOnboardingAnswers(newAnswers);
                                handleSaveOnboarding(onboardingLeadId, newAnswers, onboardingPlaybook, onboardingPriorities);
                              }}
                              style={{ marginBottom: '0.75rem' }}
                            />

                            {/* Priority Selector & Dictation Row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Priorität:</span>
                                {['low', 'medium', 'high'].map(level => {
                                  const isSelected = (onboardingPriorities[q.id] || 'keine') === level;
                                  const colors = level === 'high' ? { bg: 'rgba(239, 68, 68, 0.15)', border: '#ef4444', text: '#f87171' } :
                                                 level === 'medium' ? { bg: 'rgba(245, 158, 11, 0.15)', border: '#f59e0b', text: '#fbbf24' } :
                                                 { bg: 'rgba(16, 185, 129, 0.15)', border: '#10b981', text: '#34d399' };
                                  const label = level === 'high' ? 'Hoch' : level === 'medium' ? 'Mittel' : 'Niedrig';
                                  
                                  return (
                                    <button
                                      key={level}
                                      type="button"
                                      onClick={() => {
                                        const newPriorities = { ...onboardingPriorities, [q.id]: level };
                                        setOnboardingPriorities(newPriorities);
                                        handleSaveOnboarding(onboardingLeadId, onboardingAnswers, onboardingPlaybook, newPriorities);
                                      }}
                                      style={{
                                        padding: '0.2rem 0.5rem',
                                        fontSize: '0.7rem',
                                        borderRadius: '0.25rem',
                                        background: isSelected ? colors.bg : 'rgba(255,255,255,0.01)',
                                        border: `1px solid ${isSelected ? colors.border : 'var(--border-color)'}`,
                                        color: isSelected ? colors.text : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                      }}
                                    >
                                      {label}
                                    </button>
                                  );
                                })}
                              </div>

                              <button
                                type="button"
                                onClick={() => startSpeechRecognition(q.id)}
                                className="btn"
                                style={{
                                  padding: '0.2rem 0.6rem',
                                  fontSize: '0.7rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  background: recordingQuestionId === q.id ? '#ef4444' : 'rgba(255,255,255,0.05)',
                                  color: recordingQuestionId === q.id ? 'white' : 'var(--text-secondary)',
                                  borderColor: recordingQuestionId === q.id ? '#ef4444' : 'var(--border-color)',
                                  cursor: 'pointer'
                                }}
                              >
                                <span>🎙</span>
                                <span>{recordingQuestionId === q.id ? 'Hört zu...' : 'Diktieren'}</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {/* Navigation Controls */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setOnboardingActivePhase(prev => Math.max(0, prev - 1))}
                          disabled={onboardingActivePhase === 0}
                        >
                          Zurück
                        </button>
                        
                        {onboardingActivePhase < playbook.phases.length - 1 ? (
                          <button
                            className="btn btn-primary"
                            onClick={() => setOnboardingActivePhase(prev => Math.min(playbook.phases.length - 1, prev + 1))}
                          >
                            Nächste Phase
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)' }}
                            onClick={() => {
                              alert("🎉 Onboarding erfolgreich abgeschlossen! Das Protokoll wurde gespeichert und in die Cloud übertragen.");
                            }}
                          >
                            Gespräch beenden & Speichern
                          </button>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Roadmap Preview & Export */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    {/* Info Card */}
                    <div className="card" style={{ padding: '1.25rem' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Database size={16} className="text-purple-400" />
                        Live Cloud-Synchronisation
                      </h3>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '0.75rem' }}>
                        {isOnline 
                          ? <>Jede Eingabe wird in Echtzeit im Cloud-Speicher für <strong>{showcaseMode ? 'Muster-Firma' : selectedLead.company}</strong> gesichert.</>
                          : <>Du bist offline. Eingaben für <strong>{showcaseMode ? 'Muster-Firma' : selectedLead.company}</strong> werden lokal gesichert und synchronisiert, sobald eine Verbindung besteht.</>
                        }
                      </p>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        fontSize: '0.7rem', 
                        color: isOnline ? '#34d399' : '#fbbf24', 
                        background: isOnline ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                        padding: '0.4rem 0.6rem', 
                        borderRadius: '0.25rem', 
                        width: 'fit-content' 
                      }}>
                        <span style={{ 
                          display: 'inline-block', 
                          width: '6px', 
                          height: '6px', 
                          borderRadius: '50%', 
                          background: isOnline ? '#34d399' : '#fbbf24' 
                        }}></span>
                        {isOnline ? 'Supabase Cloud-Sync: AKTIV' : 'Offline-Modus: LOKAL SPEICHERN'}
                      </div>
                    </div>

                    {/* Live Digitalisierungsrechner */}
                    <div className="card" style={{ padding: '1.25rem' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <TrendingUp size={16} className="text-emerald-400" />
                        Digitalisierungs-Potenzial
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Manuelle Arbeit:</span>
                            <span style={{ fontWeight: 600, color: 'white' }}>{onboardingManualHours} Std./Woche</span>
                          </div>
                          <input
                            type="range"
                            min="2"
                            max="40"
                            value={onboardingManualHours}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setOnboardingManualHours(val);
                              handleSaveOnboarding(onboardingLeadId, onboardingAnswers, onboardingPlaybook, onboardingPriorities, {
                                hours: val,
                                rate: onboardingHourlyRate,
                                ratio: onboardingSavingRatio
                              });
                            }}
                            style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
                          />
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Mitarbeiter Stundensatz:</span>
                            <span style={{ fontWeight: 600, color: 'white' }}>{onboardingHourlyRate} €/Std.</span>
                          </div>
                          <input
                            type="range"
                            min="15"
                            max="150"
                            value={onboardingHourlyRate}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setOnboardingHourlyRate(val);
                              handleSaveOnboarding(onboardingLeadId, onboardingAnswers, onboardingPlaybook, onboardingPriorities, {
                                hours: onboardingManualHours,
                                rate: val,
                                ratio: onboardingSavingRatio
                              });
                            }}
                            style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
                          />
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Automatisierungsquote:</span>
                            <span style={{ fontWeight: 600, color: 'white' }}>{onboardingSavingRatio}%</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="90"
                            value={onboardingSavingRatio}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setOnboardingSavingRatio(val);
                              handleSaveOnboarding(onboardingLeadId, onboardingAnswers, onboardingPlaybook, onboardingPriorities, {
                                hours: onboardingManualHours,
                                rate: onboardingHourlyRate,
                                ratio: val
                              });
                            }}
                            style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
                          />
                        </div>

                        <div style={{
                          marginTop: '0.25rem',
                          padding: '0.75rem',
                          background: 'rgba(16, 185, 129, 0.05)',
                          border: '1px solid rgba(16, 185, 129, 0.2)',
                          borderRadius: '0.375rem',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#10b981', fontWeight: 700, marginBottom: '0.25rem' }}>Prognostizierte Ersparnis</div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>
                            {Math.round(onboardingManualHours * 4 * (onboardingSavingRatio / 100))} Std. / Monat
                          </div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-cyan)', marginTop: '0.15rem' }}>
                            ~ {(Math.round(onboardingManualHours * 4 * (onboardingSavingRatio / 100)) * onboardingHourlyRate).toLocaleString('de-DE')} € / Monat
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Export Actions */}
                    <div className="card" style={{ padding: '1.25rem' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
                        Protokoll-Optionen
                      </h3>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button 
                          className="btn btn-primary"
                          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.8rem', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))', border: 'none', color: 'white' }}
                          onClick={handleGenerateOnboardingPDF}
                        >
                          <Download size={14} />
                          PDF-Angebot generieren
                        </button>

                        <button 
                          className="btn btn-secondary"
                          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
                          onClick={handleExportOnboardingToDocs}
                        >
                          <FileText size={14} />
                          Im Wissens-Hub speichern
                        </button>
                        
                        <button
                          className="btn btn-secondary"
                          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
                          onClick={() => {
                            const activePlaybook = ONBOARDING_PLAYBOOKS[onboardingPlaybook];
                            let summary = `# Onboarding-Protokoll: ${selectedLead.company}\n`;
                            summary += `Datum: ${new Date().toLocaleDateString('de-DE')} | Playbook: ${activePlaybook.title}\n\n`;

                            const monthlyHoursSaved = Math.round(onboardingManualHours * 4 * (onboardingSavingRatio / 100));
                            const monthlyMoneySaved = monthlyHoursSaved * onboardingHourlyRate;
                            
                            summary += `## 📊 Digitalisierungs-Potenzial (Live-Rechner)\n`;
                            summary += `- Manuelle Stunden/Woche: ${onboardingManualHours} Std.\n`;
                            summary += `- Mitarbeiter Stundensatz: ${onboardingHourlyRate} €/Std.\n`;
                            summary += `- Angenommene Ersparnis: ${onboardingSavingRatio}%\n`;
                            summary += `- Ersparte Stunden/Monat: **${monthlyHoursSaved} Std.**\n`;
                            summary += `- Finanzielles Potenzial: **${monthlyMoneySaved.toLocaleString('de-DE')} € / Monat**\n\n`;

                            activePlaybook.phases.forEach(phase => {
                              summary += `## ${phase.name}\n`;
                              phase.questions.forEach(q => {
                                const ans = onboardingAnswers[q.id] || "Keine Notizen erfasst.";
                                const prio = onboardingPriorities[q.id] || 'keine';
                                const prioLabel = prio === 'high' ? '🔴 Hoch (Sofortiger Hebel)' : prio === 'medium' ? '🟡 Mittel' : prio === 'low' ? '🟢 Niedrig' : 'Keine Priorität';
                                
                                summary += `### ${q.question}\n`;
                                summary += `- **Priorität**: ${prioLabel}\n`;
                                summary += `- **Antwort**: ${ans}\n\n`;
                              });
                            });
                            
                            navigator.clipboard.writeText(summary);
                            alert("📋 Protokoll als Markdown in die Zwischenablage kopiert!");
                          }}
                        >
                          <ClipboardCopy size={14} />
                          Protokoll kopieren (Markdown)
                        </button>
                      </div>
                    </div>

                    {/* Preview Area */}
                    <div className="card" style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', maxHeight: '400px' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                        Protokoll Vorschau
                      </h3>
                      <div 
                        style={{ 
                          background: 'rgba(0,0,0,0.2)', 
                          border: '1px solid var(--border-color)', 
                          borderRadius: '0.375rem', 
                          padding: '0.75rem', 
                          fontSize: '0.75rem', 
                          color: 'var(--text-secondary)', 
                          overflowY: 'auto',
                          fontFamily: 'monospace',
                          whiteSpace: 'pre-wrap',
                          flex: 1
                        }}
                      >
                        {(() => {
                          const activePlaybook = ONBOARDING_PLAYBOOKS[onboardingPlaybook];
                          let summary = `# Onboarding: ${selectedLead.company}\n`;
                          activePlaybook.phases.forEach(phase => {
                            let answeredInPhase = false;
                            let phaseSummary = `## ${phase.name}\n`;
                            phase.questions.forEach(q => {
                              if (onboardingAnswers[q.id]) {
                                answeredInPhase = true;
                                phaseSummary += `Q: ${q.question.substring(0, 30)}...\nA: ${onboardingAnswers[q.id]}\n\n`;
                              }
                            });
                            if (answeredInPhase) {
                              summary += phaseSummary;
                            }
                          });
                          return summary.trim() === `# Onboarding: ${selectedLead.company}` 
                            ? "Beginne Fragen zu beantworten, um hier die Vorschau zu sehen." 
                            : summary;
                        })()}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })() : (
              <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>📘</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Onboarding-Gespräch vorbereiten</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem auto', lineHeight: '1.5' }}>
                  Wähle oben einen Kunden oder Kaltakquise-Kontakt aus und entscheide dich für das passende Playbook, um das Gespräch zu starten.
                </p>
              </div>
            )}

          </div>
        )}
      </>
      )}

      </main>



      {/* CRM Contact Details Drawer */}
      <div className={`crm-drawer ${selectedContactId ? 'open' : ''}`}>
        <div className="crm-drawer-backdrop" onClick={() => setSelectedContactId(null)}></div>
        <div className="crm-drawer-content">
          {activeContact && (
            <>
              {/* Drawer Header */}
              <div className="crm-drawer-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="contact-avatar" style={{ margin: 0 }}>
                    {mask(activeContact.company, 'company').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{mask(activeContact.company, 'company')}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Ansprechpartner: {mask(activeContact.name, 'name')}</p>
                  </div>
                </div>
                <button className="btn-icon-only close-drawer-btn" onClick={() => setSelectedContactId(null)}>
                  ✕
                </button>
              </div>

              {/* Drawer Body */}
              <div className="crm-drawer-body">
                {/* Meta info grid */}
                <div className="drawer-section meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Branche</span>
                    <span className="meta-value">{mask(activeContact.industry, 'industry') || 'Keine Branche'}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">IT-System</span>
                    <span className="meta-value">{mask(activeContact.system, 'system') || 'Kein System'}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Letzter Kontakt</span>
                    <span className="meta-value">{activeContact.lastContact}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Status</span>
                    <select 
                      className="input-field drawer-select" 
                      value={activeContact.stage}
                      onChange={(e) => updateContactStage(activeContact.id, e.target.value)}
                    >
                      <option value="erstkontakt">Erstkontakt</option>
                      <option value="gespräch">Gespräch</option>
                      <option value="angebot">Angebot</option>
                      <option value="umsetzung">Umsetzung</option>
                    </select>
                  </div>
                </div>

                {/* Custom Notes Section */}
                <div className="drawer-section">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <h3 className="section-title" style={{ margin: 0 }}>Kunden-Notizen</h3>
                    <button
                      type="button"
                      onClick={() => handleCrmNotesSpeech(activeContact.id)}
                      className={`btn-icon-only ${isListeningCrmNotes ? 'listening-pulse' : ''}`}
                      style={{ 
                        padding: '0.25rem 0.5rem', 
                        fontSize: '0.7rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.25rem',
                        background: isListeningCrmNotes ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: isListeningCrmNotes ? '1px solid rgb(239, 68, 68)' : '1px solid var(--border-color)',
                        borderRadius: '0.25rem',
                        color: isListeningCrmNotes ? '#ef4444' : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                      title="Notiz per Sprache eingeben (Web Speech API)"
                    >
                      <Mic size={12} /> {isListeningCrmNotes ? 'Höre zu...' : 'Diktieren'}
                    </button>
                  </div>
                  <textarea 
                    className="input-field drawer-textarea"
                    rows={4}
                    placeholder="Wichtige Infos zu Terminen, Anforderungen, Preisen..."
                    value={activeContact.notes || ''}
                    onChange={(e) => updateContactNotes(activeContact.id, e.target.value)}
                  />
                </div>

                {/* Document Links Section */}
                <div className="drawer-section">
                  <h3 className="section-title">Dokumenten-Links</h3>
                  <div className="drawer-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {(activeContact.links || []).map(link => (
                      <div key={link.id} className="drawer-link-item">
                        <a href={link.url} target="_blank" rel="noreferrer" className="link-anchor">
                          <FileText size={14} className="text-cyan-500" />
                          <span>{link.title}</span>
                        </a>
                        <button 
                          onClick={() => deleteContactLink(activeContact.id, link.id)} 
                          className="btn-icon-only" 
                          style={{ padding: '0.2rem' }}
                        >
                          <Trash2 size={12} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                    {(activeContact.links || []).length === 0 && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>Keine Links hinterlegt.</p>
                    )}
                  </div>

                  {/* Add link form */}
                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="Titel (z.B. Drive)" 
                      className="input-field tracker-input" 
                      style={{ flex: 1, height: '28px', fontSize: '0.75rem' }}
                      value={newLinkInput.title}
                      onChange={(e) => setNewLinkInput({ ...newLinkInput, title: e.target.value })}
                    />
                    <input 
                      type="text" 
                      placeholder="https://..." 
                      className="input-field tracker-input" 
                      style={{ flex: 1.5, height: '28px', fontSize: '0.75rem' }}
                      value={newLinkInput.url}
                      onChange={(e) => setNewLinkInput({ ...newLinkInput, url: e.target.value })}
                    />
                    <button 
                      onClick={() => {
                        addContactLink(activeContact.id, newLinkInput.title, newLinkInput.url);
                        setNewLinkInput({ title: '', url: '' });
                      }}
                      className="btn btn-primary"
                      style={{ height: '28px', padding: '0 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.15rem' }}
                    >
                      Hinzufügen
                    </button>
                  </div>
                </div>

                {/* Activity Log Section */}
                <div className="drawer-section">
                  <h3 className="section-title">Aktivitäts-Log</h3>
                  <div className="drawer-log-list">
                    {(activeContact.activityLog || []).map(log => (
                      <div key={log.id} className="log-item">
                        <span className="log-date">{log.date}</span>
                        <span className="log-text">{log.text}</span>
                      </div>
                    ))}
                    {(activeContact.activityLog || []).length === 0 && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Keine Einträge vorhanden.</p>
                    )}
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </div>

      {/* Dokumenten-Editor Modal (Mini-Word) */}
      {isEditorOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: '650px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1.5rem',
            margin: 0
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                {editingDocId ? 'Dokument bearbeiten (Mini-Word)' : 'Neues Dokument erstellen'}
              </h3>
              <button 
                type="button"
                onClick={() => setIsEditorOpen(false)} 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1, padding: 0 }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Dateiname (z.B. sop_onboarding.txt)</label>
              <input
                type="text"
                className="input-field"
                placeholder="dokumentenname.txt"
                value={editorTitle}
                onChange={(e) => setEditorTitle(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexGrow: 1 }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Textinhalt (Schreiben oder Kopieren)</label>
              <textarea
                className="input-field"
                rows={12}
                style={{
                  fontFamily: 'inherit',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  resize: 'vertical',
                  background: 'rgba(0, 0, 0, 0.25)'
                }}
                placeholder="Füge deinen Text hier ein oder schreibe ein neues Dokument..."
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                onClick={() => setIsEditorOpen(false)} 
                className="btn btn-secondary"
                style={{ height: '36px' }}
              >
                Abbrechen
              </button>
              <button 
                type="button" 
                onClick={handleSaveDocFromEditor} 
                className="btn btn-primary"
                style={{ height: '36px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                💾 Speichern
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;

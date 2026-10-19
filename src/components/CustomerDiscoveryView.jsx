import React, { useState, useEffect, useRef } from 'react';
import {
  PhoneCall,
  Phone,
  Calendar,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  Compass,
  Clock,
  Play,
  RotateCcw,
  FileText,
  Download,
  ClipboardCopy,
  Sparkles,
  AlertTriangle,
  Users,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  UserPlus,
  ExternalLink,
  RefreshCw,
  HelpCircle,
  CheckSquare
} from 'lucide-react';

/**
 * Initiale Demo-/Starter-Kontakte für die Customer-Discovery & Positionierungs-Validierung
 */
export const INITIAL_DISCOVERY_LEADS = [
  {
    id: 'disc_1',
    company: 'SHK Meisterbetrieb Meier GmbH',
    ownerName: 'Thomas Meier',
    industry: 'SHK',
    city: 'Goslar',
    street: 'Im Schleeke 14',
    phone: '+49 5321 445566',
    priority: 'A',
    status: 'Offen',
    scheduledDate: '',
    scheduledTime: '',
    phase1Reaction: '',
    employeesField: '6',
    employeesOffice: '1',
    officePerson: 'Ehefrau in Teilzeit & Meister abends',
    softwareOffice: 'Lexoffice',
    softwareComm: 'WhatsApp & Papier-Auftragszettel',
    selectedPaths: ['A', 'D'],
    primaryPath: 'A',
    biggestTimeWasterQuote: 'Jeden Sonntagabend sitze ich 3 Stunden am Küchentisch und suche Lieferscheine und Fotos aus WhatsApp zusammen.',
    weekendOffice: 'yes',
    weekendHours: '3-4',
    pathNotes: {
      A: 'Von Baustellen-Ende bis Rechnung vergehen oft 14 Tage. E-Rechnung sorgt noch für Stirnrunzeln.',
      B: '',
      C: '',
      D: 'Fotos liegen auf privaten Handys der Monteure. Bei Reklamation letzte Woche 45 Min gesucht.',
      E: ''
    },
    magicWandAnswer: 'Dass die Baustellenfotos und Materialzettel von allein beim richtigen Auftrag im Büro landen.',
    pitchReaction: 'Sehr interessiert',
    realityCheckNote: 'Klingt extrem praxisnah, solange die Gesellen keine komplizierte Schulung brauchen.',
    biggestObjectionQuote: 'Meine Altgesellen streiken, wenn sie eine komplizierte neue App bedienen müssen.',
    objectionTags: ['Monteure streiken'],
    auditPriceWillingness: '500 € problemlos',
    auditPriceLimitEuro: '600',
    followUpAllowed: 'Ja, nach Gründung melden',
    followUpDate: '',
    referralCompany: 'Elektro Klinke Goslar',
    referralContact: 'Bernd Klinke (05321 998877)',
    generalNotes: 'Sehr offenes Gespräch. Möchte informiert werden, sobald Gewerbe steht.',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'disc_2',
    company: 'Dachdeckerei & Holzbau Harzblick',
    ownerName: 'Andreas Brandt',
    industry: 'Dach/Bau',
    city: 'Wernigerode',
    street: 'Dornbergsweg 22',
    phone: '+49 3943 223344',
    priority: 'A',
    status: 'Termin vereinbart',
    scheduledDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    scheduledTime: '07:15',
    phase1Reaction: 'no_time',
    employeesField: '9',
    employeesOffice: '1',
    officePerson: 'Bürokraft (vormittags)',
    softwareOffice: 'DATEV Unternehmen online',
    softwareComm: 'Telefon & E-Mail',
    selectedPaths: [],
    primaryPath: '',
    biggestTimeWasterQuote: '',
    weekendOffice: '',
    weekendHours: '',
    pathNotes: { A: '', B: '', C: '', D: '', E: '' },
    magicWandAnswer: '',
    pitchReaction: '',
    realityCheckNote: '',
    biggestObjectionQuote: '',
    objectionTags: [],
    auditPriceWillingness: '',
    auditPriceLimitEuro: '',
    followUpAllowed: '',
    followUpDate: '',
    referralCompany: '',
    referralContact: '',
    generalNotes: 'Kurz auf der Baustelle erreicht – Termin für 07:15 Uhr vor Abfahrt vereinbart.',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'disc_3',
    company: 'Elektrotechnik Schütze & Söhne',
    ownerName: 'Karsten Schütze',
    industry: 'Elektro',
    city: 'Bad Harzburg',
    street: 'Herzog-Julius-Str. 8',
    phone: '+49 5322 778899',
    priority: 'B',
    status: 'Offen',
    scheduledDate: '',
    scheduledTime: '',
    phase1Reaction: '',
    employeesField: '',
    employeesOffice: '',
    officePerson: '',
    softwareOffice: '',
    softwareComm: '',
    selectedPaths: [],
    primaryPath: '',
    biggestTimeWasterQuote: '',
    weekendOffice: '',
    weekendHours: '',
    pathNotes: { A: '', B: '', C: '', D: '', E: '' },
    magicWandAnswer: '',
    pitchReaction: '',
    realityCheckNote: '',
    biggestObjectionQuote: '',
    objectionTags: [],
    auditPriceWillingness: '',
    auditPriceLimitEuro: '',
    followUpAllowed: '',
    followUpDate: '',
    referralCompany: '',
    referralContact: '',
    generalNotes: '',
    updatedAt: new Date().toISOString()
  }
];

/**
 * Definition der 5 Diagnose-Pfade aus customer_discovery_validierungs_leitfaden.md
 */
const DISCOVERY_PATHS = [
  {
    id: 'A',
    shortTitle: 'Pfad A: Rechnungen & DATEV',
    title: '🔀 Pfad A: Rechnungen, Buchhaltung & Steuerberater (Der Klassiker)',
    whenToUse: 'Nutzen, wenn der Inhaber über Papierberge, Belege oder den Steuerberater stöhnt.',
    color: '#8b5cf6',
    transition: null,
    questions: [
      {
        label: 'Frage',
        text: '„Vom Moment, in dem die Baustelle fertig ist, bis das Geld auf dem Konto landet: Wie viele Tage vergehen da bei Ihnen im Schnitt, und wer tippt die Rechnungsdaten ab?“'
      },
      {
        label: 'Vertiefung',
        text: '„Gibt es bei Ihnen den klassischen ‚Bürosonntag‘, an dem eigentlich Freizeit wäre, aber Belege und Ordner gewälzt werden müssen?“'
      },
      {
        label: 'Gesetzesdruck',
        text: '„Haben Sie sich schon mit der B2B-E-Rechnungspflicht auseinandergesetzt, oder sorgt das eher für Stirnrunzeln?“'
      }
    ],
    pitchText: '„...wir sorgen dafür, dass Belege und Stundenzettel ohne manuelles Abtippen direkt in Ihre Rechnungssoftware und fehlerfrei zum Steuerberater fließen.“'
  },
  {
    id: 'B',
    shortTitle: 'Pfad B: Kundenfront & Termine',
    title: '🔀 Pfad B: Kundenfront, Telefonüberlastung & Termine',
    whenToUse: 'Nutzen, wenn Rechnungen kein Thema sind, aber das Telefon pausenlos klingelt oder Angebote versanden.',
    color: '#06b6d4',
    transition: '„Klasse, dass Ihre Faktura steht! Wie sieht es an der Kundenfront aus?“',
    questions: [
      {
        label: 'Frage',
        text: '„Kommen Anfragen bei Ihnen noch klassisch per Telefon und Zettel rein? Wie oft kommt es vor, dass Sie auf der Baustelle stehen, das Handy klingelt und man abends erst mühsam zurückrufen muss?“'
      },
      {
        label: 'Vertiefung',
        text: '„Bieten Sie Kunden schon an, Termine (z. B. für Besichtigungen oder Wartungen) direkt online verbindlich einzubuchen, oder geht da viel Arbeitszeit für ‚Wann passt es Ihnen denn?‘ drauf?“'
      },
      {
        label: 'Schmerz-Check',
        text: '„Passiert es im Trubel manchmal, dass eine Anfrage liegen bleibt und der Kunde verärgert zur Konkurrenz abwandert?“'
      }
    ],
    pitchText: '„...wir richten für Ihre Website ein einfaches Buchungs- und Anfrage-System ein, das Aufträge automatisch vorfiltert und Termine direkt in Ihren Kalender legt – ohne Telefon-Pingpong.“'
  },
  {
    id: 'C',
    shortTitle: 'Pfad C: Kundenportal & Status',
    title: '🔀 Pfad C: Kundenportal & Auftrags-Transparenz',
    whenToUse: 'Nutzen bei Betrieben mit hohem Betreuungsbedarf (z. B. Hausverwaltungen, Gewerbekunden, Stammkunden).',
    color: '#10b981',
    transition: '„Wie läuft denn bei Ihnen die Kommunikation während laufender Projekte ab?“',
    questions: [
      {
        label: 'Frage',
        text: '„Wie oft rufen Auftraggeber an und fragen: ‚Wann kommt der Monteur?‘, ‚Wo bleibt das Angebot?‘ oder ‚Können Sie mir den Prüfbericht nochmal schicken?‘“'
      },
      {
        label: 'Vertiefung',
        text: '„Wäre es für Ihren Betrieb eine Entlastung, wenn Stammkunden oder Hausverwaltungen ein einfaches Online-Portal hätten, wo sie den Status ihrer Aufträge, Wartungsprotokolle und Rechnungen selbst einsehen können, ohne Ihr Büro anzurufen?“'
      },
      {
        label: 'Hürden-Check',
        text: '„Haben Sie sowas schon mal angedacht, oder fürchten Sie, dass Ihre Kunden das nicht annehmen würden?“'
      }
    ],
    pitchText: '„...wir bauen schlanke Kunden-Dashboards, in denen Ihre Auftraggeber Termine, Dokumente und Statusberichte mit einem Klick abrufen können – Ihr Telefon steht sofort still.“'
  },
  {
    id: 'D',
    shortTitle: 'Pfad D: Baustellendoku & Fotos',
    title: '🔀 Pfad D: Baustelle, Baudokumentation & Fotobeweise',
    whenToUse: 'Nutzen bei Reklamationen, Nachweispflichten, Winterdienst, Gebäudereinigung oder Bauabnahmen.',
    color: '#f59e0b',
    transition: '„Wie sichern Sie eigentlich Ihre Arbeit auf der Baustelle bzw. beim Kunden ab?“',
    questions: [
      {
        label: 'Frage',
        text: '„Wenn Ihre Mitarbeiter vor Ort fertig sind: Wie landen Vorher-Nachher-Fotos, Lieferscheine oder Abnahmeunterschriften im Büro?“'
      },
      {
        label: 'Vertiefung',
        text: '„Liegen die Fotos auf privaten WhatsApp-Handys der Gesellen verstreut? Wie lange suchen Sie, wenn ein Kunde nach drei Monaten eine Reklamation meldet und Sie den Nachweis brauchen?“'
      },
      {
        label: 'Sicherheits-Check',
        text: '„Hatten Sie schon mal den Fall, dass geleistete Stunden oder Materialien nicht abgerechnet werden konnten, weil der Zettel auf der Baustelle verschollen ist?“'
      }
    ],
    pitchText: '„...wir sorgen dafür, dass Monteure Baustellen-Fotos und Regieberichte mit zwei Klicks per Smartphone erfassen und diese automatisch projektbezogen im Büro archiviert werden.“'
  },
  {
    id: 'E',
    shortTitle: 'Pfad E: Zeiterfassung & Lohn',
    title: '🔀 Pfad E: Zeiterfassung, Monteur-Planung & Compliance',
    whenToUse: 'Nutzen bei Diskussionen über Stundenzettel, Mindestlohn (MiLoG) oder Zollkontrollen.',
    color: '#ec4899',
    transition: '„Wie läuft bei Ihnen aktuell die Erfassung der Monteur-Stunden ab?“',
    questions: [
      {
        label: 'Frage',
        text: '„Schreiben Ihre Gesellen die Stundenzettel noch freitags aus dem Kopf auf Papier, oder läuft das komplett digital per Smartphone?“'
      },
      {
        label: 'Vertiefung',
        text: '„Wie viele Stunden pro Monat verbringt das Büro damit, unleserliche Stundenzettel zu entziffern und für das Lohnbüro abzutippen?“'
      }
    ],
    pitchText: '„...wir richten eine kinderleichte mobile Zeiterfassung per Smartphone ein, die Monteur-Stunden ohne Freitags-Zettelchaos direkt sauber fürs Büro und Lohnbüro bereitstellt.“'
  }
];

const INDUSTRIES = ['SHK', 'Elektro', 'Dach/Bau', 'Reinigung', 'GaLaBau', 'Sonstiges'];
const STATUS_OPTIONS = [
  'Offen',
  'Nicht erreicht / Rückruf',
  'Termin vereinbart',
  'Interview abgeschlossen',
  'Warm-Lead (Wiedervorlage)',
  'Kein Interesse'
];

export const CustomerDiscoveryView = ({
  discoveryLeads = [],
  setDiscoveryLeads,
  leads = [],
  contacts = [],
  setContacts,
  calendarEvents = [],
  setCalendarEvents,
  docs = [],
  setDocs,
  showcaseMode = false,
  mask = (t) => t,
  isMobile = false,
  showToast
}) => {
  const [activeId, setActiveId] = useState(() => discoveryLeads[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  // Aktive Gesprächs-Phase (1 bis 6 + 7 = Protokollbogen)
  const [activePhase, setActivePhase] = useState(1);
  // Ausweichroute in Phase 3 ("Rechnungen in 5 Min kein Problem")
  const [showReframingBox, setShowReframingBox] = useState(false);
  // Mindset-Box oben ein-/ausklappen
  const [showMindsetBanner, setShowMindsetBanner] = useState(false);
  // Validierungs-Radar (Gesamt-Auswertung) ein-/ausklappen
  const [showAnalytics, setShowAnalytics] = useState(true);

  // Upload & Import Modals/Panels
  const [importMode, setImportMode] = useState(null); // null | 'paste' | 'manual'
  const [pasteText, setPasteText] = useState('');
  const [newContactForm, setNewContactForm] = useState({
    company: '',
    ownerName: '',
    industry: 'SHK',
    phone: '',
    city: 'Goslar',
    priority: 'A'
  });
  const fileInputRef = useRef(null);

  // Kalender-Buchungs-Panel State
  const [showScheduler, setShowScheduler] = useState(false);
  const [schedDate, setSchedDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().split('T')[0];
  });
  const [schedTime, setSchedTime] = useState('07:15');
  const [schedDuration, setSchedDuration] = useState(20);
  const [schedNote, setSchedNote] = useState('15–20 Min Gründer-Feedback-Interview (Customer Discovery)');

  // Interview-Stoppuhr (15-20 Min Ziel)
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const activeContact = discoveryLeads.find((c) => c.id === activeId) || null;

  // Hilfsfunktion zum Aktualisieren des aktuellen Kontakts (automatische Speicherung)
  const updateActiveContact = (patch) => {
    if (!activeId) return;
    const updated = discoveryLeads.map((item) => {
      if (item.id === activeId) {
        return {
          ...item,
          ...patch,
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    });
    setDiscoveryLeads(updated);
    localStorage.setItem('f_discovery_leads', JSON.stringify(updated));
  };

  const updatePathNote = (pathId, text) => {
    if (!activeContact) return;
    const currentNotes = activeContact.pathNotes || { A: '', B: '', C: '', D: '', E: '' };
    updateActiveContact({
      pathNotes: {
        ...currentNotes,
        [pathId]: text
      }
    });
  };

  const togglePathSelection = (pathId) => {
    if (!activeContact) return;
    const current = Array.isArray(activeContact.selectedPaths) ? activeContact.selectedPaths : [];
    let next;
    if (current.includes(pathId)) {
      next = current.filter((p) => p !== pathId);
    } else {
      next = [...current, pathId];
    }
    const primary = next.length > 0 ? next[0] : '';
    updateActiveContact({
      selectedPaths: next,
      primaryPath: activeContact.primaryPath && next.includes(activeContact.primaryPath) ? activeContact.primaryPath : primary
    });
  };

  const toggleObjectionTag = (tag) => {
    if (!activeContact) return;
    const current = Array.isArray(activeContact.objectionTags) ? activeContact.objectionTags : [];
    const next = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag];
    updateActiveContact({ objectionTags: next });
  };

  // Nachname für persönliche Anrede extrahieren
  const getLastName = (contact) => {
    if (!contact || !contact.ownerName || !contact.ownerName.trim()) {
      return '[Nachname]';
    }
    const parts = contact.ownerName.trim().split(/\s+/);
    return parts[parts.length - 1];
  };

  // ==================== UPLOAD & IMPORT FUNKTIONEN ====================

  const parseContactLines = (rawText) => {
    const lines = rawText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) return [];

    // Prüfen, ob erste Zeile ein CSV-Header ist
    const firstLower = lines[0].toLowerCase();
    const hasHeader =
      firstLower.includes('firma') ||
      firstLower.includes('company') ||
      firstLower.includes('telefon') ||
      firstLower.includes('phone') ||
      firstLower.includes('name');

    const dataLines = hasHeader ? lines.slice(1) : lines;
    const imported = [];

    dataLines.forEach((line, idx) => {
      const sep = line.includes(';') ? ';' : line.includes('\t') ? '\t' : ',';
      const cols = line.split(sep).map((c) => c.replace(/^["']|["']$/g, '').trim());
      if (!cols[0]) return;

      const company = cols[0] || `Betrieb ${idx + 1}`;
      const ownerName = cols[1] || '';
      const phone = cols[2] || '';
      const city = cols[3] || 'Harz / Goslar';
      const rawInd = cols[4] || 'Sonstiges';
      const matchedInd =
        INDUSTRIES.find((i) => rawInd.toLowerCase().includes(i.toLowerCase())) || 'Sonstiges';

      imported.push({
        id: `disc_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 6)}`,
        company,
        ownerName,
        industry: matchedInd,
        city,
        street: cols[5] || '',
        phone,
        priority: 'A',
        status: 'Offen',
        scheduledDate: '',
        scheduledTime: '',
        phase1Reaction: '',
        employeesField: '',
        employeesOffice: '',
        officePerson: '',
        softwareOffice: '',
        softwareComm: '',
        selectedPaths: [],
        primaryPath: '',
        biggestTimeWasterQuote: '',
        weekendOffice: '',
        weekendHours: '',
        pathNotes: { A: '', B: '', C: '', D: '', E: '' },
        magicWandAnswer: '',
        pitchReaction: '',
        realityCheckNote: '',
        biggestObjectionQuote: '',
        objectionTags: [],
        auditPriceWillingness: '',
        auditPriceLimitEuro: '',
        followUpAllowed: '',
        followUpDate: '',
        referralCompany: '',
        referralContact: '',
        generalNotes: '',
        updatedAt: new Date().toISOString()
      });
    });

    return imported;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = String(ev.target?.result || '');
      try {
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(content);
          const arr = Array.isArray(parsed) ? parsed : parsed.contacts || parsed.leads || [];
          const normalized = arr.map((item, idx) => ({
            id: item.id || `disc_${Date.now()}_${idx}`,
            company: item.company || item.firma || item.name || `Betrieb ${idx + 1}`,
            ownerName: item.ownerName || item.inhaber || item.contactPerson || item.name || '',
            industry: item.industry || item.gewerk || 'Sonstiges',
            city: item.city || item.ort || 'Harz',
            street: item.street || item.strasse || '',
            phone: item.phone || item.telefon || '',
            priority: item.priority || 'A',
            status: item.status || 'Offen',
            scheduledDate: item.scheduledDate || '',
            scheduledTime: item.scheduledTime || '',
            phase1Reaction: item.phase1Reaction || '',
            employeesField: item.employeesField || '',
            employeesOffice: item.employeesOffice || '',
            officePerson: item.officePerson || '',
            softwareOffice: item.softwareOffice || '',
            softwareComm: item.softwareComm || '',
            selectedPaths: item.selectedPaths || [],
            primaryPath: item.primaryPath || '',
            biggestTimeWasterQuote: item.biggestTimeWasterQuote || '',
            weekendOffice: item.weekendOffice || '',
            weekendHours: item.weekendHours || '',
            pathNotes: item.pathNotes || { A: '', B: '', C: '', D: '', E: '' },
            magicWandAnswer: item.magicWandAnswer || '',
            pitchReaction: item.pitchReaction || '',
            realityCheckNote: item.realityCheckNote || '',
            biggestObjectionQuote: item.biggestObjectionQuote || '',
            objectionTags: item.objectionTags || [],
            auditPriceWillingness: item.auditPriceWillingness || '',
            auditPriceLimitEuro: item.auditPriceLimitEuro || '',
            followUpAllowed: item.followUpAllowed || '',
            followUpDate: item.followUpDate || '',
            referralCompany: item.referralCompany || '',
            referralContact: item.referralContact || '',
            generalNotes: item.generalNotes || item.notes || '',
            updatedAt: new Date().toISOString()
          }));
          if (normalized.length > 0) {
            const combined = [...normalized, ...discoveryLeads];
            setDiscoveryLeads(combined);
            setActiveId(normalized[0].id);
            if (showToast) showToast(`✅ ${normalized.length} Kontakte aus JSON importiert!`);
          }
        } else {
          const imported = parseContactLines(content);
          if (imported.length > 0) {
            const combined = [...imported, ...discoveryLeads];
            setDiscoveryLeads(combined);
            setActiveId(imported[0].id);
            if (showToast) showToast(`✅ ${imported.length} Kontakte aus Datei importiert!`);
          } else if (showToast) {
            showToast('⚠️ Keine gültigen Kontaktzeilen in der Datei erkannt.');
          }
        }
      } catch (err) {
        if (showToast) showToast(`❌ Fehler beim Datei-Import: ${err.message}`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePasteImport = () => {
    const imported = parseContactLines(pasteText);
    if (imported.length === 0) {
      if (showToast) showToast('⚠️ Bitte mindestens eine Zeile eingeben (z. B. Firma; Inhaber; Telefon; Ort; Gewerk).');
      return;
    }
    const combined = [...imported, ...discoveryLeads];
    setDiscoveryLeads(combined);
    setActiveId(imported[0].id);
    setPasteText('');
    setImportMode(null);
    if (showToast) showToast(`✅ ${imported.length} Kontakte per Copy-Paste importiert!`);
  };

  const handleAddManualContact = (e) => {
    e.preventDefault();
    if (!newContactForm.company.trim()) return;
    const newEntry = {
      id: `disc_${Date.now()}`,
      company: newContactForm.company.trim(),
      ownerName: newContactForm.ownerName.trim(),
      industry: newContactForm.industry,
      city: newContactForm.city.trim() || 'Goslar / Harz',
      street: '',
      phone: newContactForm.phone.trim(),
      priority: newContactForm.priority || 'A',
      status: 'Offen',
      scheduledDate: '',
      scheduledTime: '',
      phase1Reaction: '',
      employeesField: '',
      employeesOffice: '',
      officePerson: '',
      softwareOffice: '',
      softwareComm: '',
      selectedPaths: [],
      primaryPath: '',
      biggestTimeWasterQuote: '',
      weekendOffice: '',
      weekendHours: '',
      pathNotes: { A: '', B: '', C: '', D: '', E: '' },
      magicWandAnswer: '',
      pitchReaction: '',
      realityCheckNote: '',
      biggestObjectionQuote: '',
      objectionTags: [],
      auditPriceWillingness: '',
      auditPriceLimitEuro: '',
      followUpAllowed: '',
      followUpDate: '',
      referralCompany: '',
      referralContact: '',
      generalNotes: '',
      updatedAt: new Date().toISOString()
    };
    const combined = [newEntry, ...discoveryLeads];
    setDiscoveryLeads(combined);
    setActiveId(newEntry.id);
    setNewContactForm({ company: '', ownerName: '', industry: 'SHK', phone: '', city: 'Goslar', priority: 'A' });
    setImportMode(null);
    if (showToast) showToast(`✅ "${newEntry.company}" zur Discovery-Liste hinzugefügt!`);
  };

  const handleImportFromExistingLeads = () => {
    if (!leads || leads.length === 0) {
      if (showToast) showToast('⚠️ Keine Kontakte im bestehenden Lead-Tracker gefunden.');
      return;
    }
    const existingCompanies = new Set(discoveryLeads.map((d) => (d.company || '').toLowerCase().trim()));
    const newFromLeads = leads
      .filter((l) => l.company && !existingCompanies.has(l.company.toLowerCase().trim()))
      .map((l, idx) => {
        const rawInd = l.industry || '';
        const matchedInd =
          INDUSTRIES.find((i) => rawInd.toLowerCase().includes(i.toLowerCase())) ||
          (rawInd.toLowerCase().includes('reinigung') ? 'Reinigung' : rawInd.toLowerCase().includes('dach') || rawInd.toLowerCase().includes('bau') ? 'Dach/Bau' : 'Sonstiges');

        return {
          id: `disc_from_lead_${l.id || idx}_${Date.now()}`,
          company: l.company,
          ownerName: l.name || l.contact_person || '',
          industry: matchedInd,
          city: l.city || 'Harz',
          street: l.street || '',
          phone: l.phone || '',
          priority: l.priority || 'B',
          status: 'Offen',
          scheduledDate: '',
          scheduledTime: '',
          phase1Reaction: '',
          employeesField: '',
          employeesOffice: '',
          officePerson: '',
          softwareOffice: '',
          softwareComm: '',
          selectedPaths: [],
          primaryPath: '',
          biggestTimeWasterQuote: '',
          weekendOffice: '',
          weekendHours: '',
          pathNotes: { A: '', B: '', C: '', D: '', E: '' },
          magicWandAnswer: '',
          pitchReaction: '',
          realityCheckNote: '',
          biggestObjectionQuote: '',
          objectionTags: [],
          auditPriceWillingness: '',
          auditPriceLimitEuro: '',
          followUpAllowed: '',
          followUpDate: '',
          referralCompany: '',
          referralContact: '',
          generalNotes: l.notes || '',
          updatedAt: new Date().toISOString()
        };
      });

    if (newFromLeads.length === 0) {
      if (showToast) showToast('ℹ️ Alle Kontakte aus dem Lead-Tracker sind bereits in deiner Discovery-Liste.');
      return;
    }

    const combined = [...discoveryLeads, ...newFromLeads];
    setDiscoveryLeads(combined);
    if (!activeId && combined.length > 0) setActiveId(combined[0].id);
    if (showToast) showToast(`✅ ${newFromLeads.length} Kontakte aus dem Lead-Tracker übernommen!`);
  };

  // ==================== KALENDER & TERMIN-FUNKTIONEN ====================

  const applyQuickSchedulePreset = (presetType) => {
    const now = new Date();
    const target = new Date(now);

    if (presetType === 'tomorrow_0715') {
      target.setDate(now.getDate() + 1);
      setSchedDate(target.toISOString().split('T')[0]);
      setSchedTime('07:15');
    } else if (presetType === 'dayafter_0715') {
      target.setDate(now.getDate() + 2);
      setSchedDate(target.toISOString().split('T')[0]);
      setSchedTime('07:15');
    } else if (presetType === 'friday_1300') {
      const dayOfWeek = now.getDay(); // 0 = So, 5 = Fr
      const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
      target.setDate(now.getDate() + daysUntilFriday);
      setSchedDate(target.toISOString().split('T')[0]);
      setSchedTime('13:00');
    } else if (presetType === 'next_tue_0715') {
      const dayOfWeek = now.getDay();
      const daysUntilTue = (2 - dayOfWeek + 7) % 7 || 7;
      target.setDate(now.getDate() + daysUntilTue);
      setSchedDate(target.toISOString().split('T')[0]);
      setSchedTime('07:15');
    }
  };

  const calculateEndTimeString = (startTimeStr, durationMinutes = 20) => {
    const [h, m] = (startTimeStr || '07:15').split(':').map(Number);
    const totalMins = (h || 0) * 60 + (m || 0) + durationMinutes;
    const endH = String(Math.floor(totalMins / 60) % 24).padStart(2, '0');
    const endM = String(totalMins % 60).padStart(2, '0');
    return `${endH}:${endM}`;
  };

  const handleSaveInterviewAppointment = () => {
    if (!activeContact) return;
    if (!schedDate || !schedTime) {
      if (showToast) showToast('⚠️ Bitte Datum und Uhrzeit für das Interview auswählen.');
      return;
    }

    const endTime = calculateEndTimeString(schedTime, Number(schedDuration) || 20);
    const newCalEvent = {
      id: `cal_disc_${activeContact.id}_${Date.now()}`,
      time: `${schedTime} - ${endTime}`,
      title: `🎙️ Discovery-Interview: ${activeContact.company}`,
      desc: `${schedNote} | Ansprechpartner: ${activeContact.ownerName || 'Inhaber'} | Tel: ${activeContact.phone || '-'}`,
      date: schedDate
    };

    if (setCalendarEvents) {
      const updatedCal = [newCalEvent, ...calendarEvents];
      setCalendarEvents(updatedCal);
      localStorage.setItem('f_calendar_events', JSON.stringify(updatedCal));
    }

    updateActiveContact({
      scheduledDate: schedDate,
      scheduledTime: schedTime,
      status: 'Termin vereinbart'
    });

    setShowScheduler(false);
    if (showToast) {
      showToast(`📅 Interview-Termin mit ${activeContact.company} am ${schedDate} um ${schedTime} Uhr im Kalender eingetragen!`);
    }
  };

  const handleOpenGoogleCalendarTemplate = () => {
    if (!activeContact) return;
    const [year, month, day] = (schedDate || new Date().toISOString().split('T')[0]).split('-').map(Number);
    const [hour, minute] = (schedTime || '07:15').split(':').map(Number);
    const startObj = new Date(year, (month || 1) - 1, day || 1, hour || 7, minute || 15);
    const endObj = new Date(startObj.getTime() + (Number(schedDuration) || 20) * 60000);

    const toGCalFormat = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const title = encodeURIComponent(`🎙️ Gründer-Interview: ${activeContact.company} (${activeContact.ownerName || 'Inhaber'})`);
    const details = encodeURIComponent(
      `15–20 Min Customer-Discovery Interview\nBetrieb: ${activeContact.company}\nAnsprechpartner: ${activeContact.ownerName || '-'}\nTelefon: ${activeContact.phone || '-'}\nGewerk: ${activeContact.industry || '-'}\nNotiz: ${schedNote}`
    );
    const location = encodeURIComponent(`${activeContact.phone || activeContact.city || 'Telefonisch'}`);
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${toGCalFormat(startObj)}/${toGCalFormat(endObj)}&details=${details}&location=${location}`;

    window.open(gcalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadIcsFile = () => {
    if (!activeContact) return;
    const [year, month, day] = (schedDate || new Date().toISOString().split('T')[0]).split('-').map(Number);
    const [hour, minute] = (schedTime || '07:15').split(':').map(Number);
    const startObj = new Date(year, (month || 1) - 1, day || 1, hour || 7, minute || 15);
    const endObj = new Date(startObj.getTime() + (Number(schedDuration) || 20) * 60000);
    const toIcsDate = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//KMU Service Harz//Customer Discovery//DE',
      'BEGIN:VEVENT',
      `UID:disc-${activeContact.id}-${Date.now()}@kmuserviceharz.de`,
      `DTSTAMP:${toIcsDate(new Date())}`,
      `DTSTART:${toIcsDate(startObj)}`,
      `DTEND:${toIcsDate(endObj)}`,
      `SUMMARY:Discovery-Interview: ${activeContact.company}`,
      `DESCRIPTION:Ansprechpartner: ${activeContact.ownerName || '-'}\\nTelefon: ${activeContact.phone || '-'}\\nGewerk: ${activeContact.industry || '-'}\\n${schedNote}`,
      `LOCATION:${activeContact.phone || 'Telefonisch'}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Interview_${activeContact.company.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    if (showToast) showToast('📥 .ics Kalenderdatei heruntergeladen!');
  };

  // ==================== EMPFEHLUNG & EXPORT FUNKTIONEN ====================

  const handleAddReferralAsContact = () => {
    if (!activeContact || !activeContact.referralCompany?.trim()) {
      if (showToast) showToast('⚠️ Bitte zuerst den Namen des empfohlenen Kollegenbetriebs eingeben.');
      return;
    }
    const newRef = {
      id: `disc_ref_${Date.now()}`,
      company: activeContact.referralCompany.trim(),
      ownerName: activeContact.referralContact?.trim() || '',
      industry: activeContact.industry || 'Sonstiges',
      city: activeContact.city || 'Harz',
      street: '',
      phone: '',
      priority: 'A',
      status: 'Offen',
      scheduledDate: '',
      scheduledTime: '',
      phase1Reaction: '',
      employeesField: '',
      employeesOffice: '',
      officePerson: '',
      softwareOffice: '',
      softwareComm: '',
      selectedPaths: [],
      primaryPath: '',
      biggestTimeWasterQuote: '',
      weekendOffice: '',
      weekendHours: '',
      pathNotes: { A: '', B: '', C: '', D: '', E: '' },
      magicWandAnswer: '',
      pitchReaction: '',
      realityCheckNote: '',
      biggestObjectionQuote: '',
      objectionTags: [],
      auditPriceWillingness: '',
      auditPriceLimitEuro: '',
      followUpAllowed: '',
      followUpDate: '',
      referralCompany: '',
      referralContact: '',
      generalNotes: `🌟 Wärmste Empfehlung aus Discovery-Interview von: ${activeContact.company} (${activeContact.ownerName || 'Inhaber'})`,
      updatedAt: new Date().toISOString()
    };
    const combined = [newRef, ...discoveryLeads];
    setDiscoveryLeads(combined);
    if (showToast) showToast(`🎉 Empfehlung "${newRef.company}" direkt als Prio-A Kontakt angelegt!`);
  };

  const buildProtocolMarkdown = (c) => {
    if (!c) return '';
    const pathLabels = (c.selectedPaths || [])
      .map((pid) => DISCOVERY_PATHS.find((dp) => dp.id === pid)?.shortTitle || `Pfad ${pid}`)
      .join(', ');

    return `# 📋 Customer-Discovery Protokoll: ${c.company}
**Datum:** ${new Date().toLocaleDateString('de-DE')} | **Status:** ${c.status}

| Feld | Erfasste Information |
| :--- | :--- |
| **Betriebsname & Inhaber:** | ${c.company} (${c.ownerName || 'k.A.'}) |
| **Telefon & Ort:** | ${c.phone || 'k.A.'} • ${c.city || 'Harz'} |
| **Gewerk / Branche:** | ${c.industry || 'k.A.'} |
| **Mitarbeiter:** | Gesellen/Feld: ${c.employeesField || '-'} \\| Büro: ${c.employeesOffice || '-'} (${c.officePerson || '-'}) |
| **Primärer Engpass:** | ${pathLabels || 'Noch nicht gewählt'} |
| **Größter Zeitfresser (Zitat):** | *„${c.biggestTimeWasterQuote || ''}“* |
| **Büro-Wochenende?** | ${c.weekendOffice === 'yes' ? `Ja, regelmäßig (ca. ${c.weekendHours || '?'} Std./Woche)` : c.weekendOffice === 'no' ? 'Nein, unter der Woche erledigt' : 'k.A.'} |
| **Bestehende Software:** | Büro/Buchhaltung: ${c.softwareOffice || '-'} \\| Kommunikation: ${c.softwareComm || '-'} |
| **🪄 Zauberstab-Wunsch:** | *„${c.magicWandAnswer || ''}“* |
| **Reaktion auf Lösungs-Pitch:** | ${c.pitchReaction || 'k.A.'} |
| **Größter Einwand / Befürchtung:** | *„${c.biggestObjectionQuote || ''}“* (${(c.objectionTags || []).join(', ')}) |
| **Zahlungsbereitschaft (Audit):** | ${c.auditPriceWillingness || 'k.A.'} (Schmerzgrenze: ${c.auditPriceLimitEuro ? c.auditPriceLimitEuro + ' €' : 'k.A.'}) |
| **Wiedervorlage erlaubt?** | ${c.followUpAllowed || 'k.A.'} |
| **Empfehlungs-Kontakt:** | ${c.referralCompany || '-'} (${c.referralContact || '-'}) |

## 📝 Detail-Notizen aus den Diagnose-Pfaden
${Object.entries(c.pathNotes || {})
  .filter(([, val]) => val && val.trim())
  .map(([pid, val]) => `- **Pfad ${pid}:** ${val}`)
  .join('\n') || '- Keine Detail-Notizen'}

## 💡 Allgemeine Gesprächsnotizen
${c.generalNotes || 'Keine weiteren Notizen.'}
`;
  };

  const handleSaveProtocolToDocs = () => {
    if (!activeContact) return;
    const md = buildProtocolMarkdown(activeContact);
    const newDoc = {
      id: `doc_disc_${activeContact.id}_${Date.now()}`,
      title: `Discovery-Protokoll - ${activeContact.company}`,
      content: md,
      status: 'local',
      url: '#',
      tags: ['discovery', 'validierung', 'handwerk']
    };
    if (setDocs) {
      setDocs([newDoc, ...docs]);
    }
    if (showToast) showToast(`📄 Protokoll für "${activeContact.company}" im Wissens-Hub gespeichert!`);
  };

  const handlePromoteToMainCrm = () => {
    if (!activeContact || !setContacts) return;
    const md = buildProtocolMarkdown(activeContact);
    const newCrmContact = {
      id: `c_disc_${Date.now()}`,
      name: activeContact.ownerName || 'Geschäftsleitung',
      company: activeContact.company,
      industry: activeContact.industry || 'Handwerk',
      system: activeContact.softwareOffice || 'Unbekannt',
      stage: 'gespräch',
      lastContact: new Date().toISOString().split('T')[0],
      notes: md,
      links: [],
      activityLog: [
        {
          id: `al_${Date.now()}`,
          date: new Date().toLocaleDateString('de-DE'),
          text: `Aus Customer-Discovery übernommen (Pitch-Reaktion: ${activeContact.pitchReaction || 'Offen'})`
        }
      ]
    };
    setContacts([newCrmContact, ...contacts]);
    if (showToast) showToast(`🚀 "${activeContact.company}" in die Haupt-CRM-Pipeline übernommen!`);
  };

  const handleExportAllDiscoveryCsv = () => {
    const headers = [
      'Firma',
      'Inhaber',
      'Gewerk',
      'Ort',
      'Telefon',
      'Status',
      'Termin',
      'Mitarbeiter_Feld',
      'Mitarbeiter_Buero',
      'Engpass_Pfade',
      'Zitat_Zeitfresser',
      'Buero_Wochenende',
      'Software_Buero',
      'Zauberstab_Wunsch',
      'Pitch_Reaktion',
      'Groesster_Einwand',
      'Audit_Zahlungsbereitschaft',
      'Schmerzgrenze_Euro',
      'Wiedervorlage',
      'Empfehlung'
    ];
    const rows = discoveryLeads.map((c) => [
      c.company || '',
      c.ownerName || '',
      c.industry || '',
      c.city || '',
      c.phone || '',
      c.status || '',
      c.scheduledDate ? `${c.scheduledDate} ${c.scheduledTime || ''}` : '',
      c.employeesField || '',
      c.employeesOffice || '',
      (c.selectedPaths || []).join('+'),
      c.biggestTimeWasterQuote || '',
      c.weekendOffice === 'yes' ? `Ja (${c.weekendHours || ''}h)` : c.weekendOffice || '',
      c.softwareOffice || '',
      c.magicWandAnswer || '',
      c.pitchReaction || '',
      c.biggestObjectionQuote || '',
      c.auditPriceWillingness || '',
      c.auditPriceLimitEuro || '',
      c.followUpAllowed || '',
      `${c.referralCompany || ''} ${c.referralContact || ''}`.trim()
    ]);

    const csvString = [
      headers.join(';'),
      ...rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
    ].join('\r\n');

    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Customer_Discovery_Auswertung_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    if (showToast) showToast('📊 Gesamte Discovery-Auswertung als CSV heruntergeladen!');
  };

  // ==================== AUSWERTUNGS-BERECHNUNGEN (RADAR) ====================

  const totalContacts = discoveryLeads.length;
  const scheduledCount = discoveryLeads.filter((c) => c.status === 'Termin vereinbart' || c.scheduledDate).length;
  const completedCount = discoveryLeads.filter(
    (c) =>
      c.status === 'Interview abgeschlossen' ||
      c.status === 'Warm-Lead (Wiedervorlage)' ||
      Boolean(c.biggestTimeWasterQuote?.trim())
  ).length;
  const warmLeadsCount = discoveryLeads.filter(
    (c) => c.followUpAllowed === 'Ja, nach Gründung melden' || c.status === 'Warm-Lead (Wiedervorlage)'
  ).length;

  const pathCounts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  discoveryLeads.forEach((c) => {
    (c.selectedPaths || []).forEach((pid) => {
      if (pathCounts[pid] !== undefined) pathCounts[pid] += 1;
    });
  });
  const maxPathCount = Math.max(1, ...Object.values(pathCounts));

  const filteredContacts = discoveryLeads.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (c.company || '').toLowerCase().includes(q) ||
      (c.ownerName || '').toLowerCase().includes(q) ||
      (c.city || '').toLowerCase().includes(q) ||
      (c.industry || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesInd = industryFilter === 'all' || c.industry === industryFilter;
    return matchesSearch && matchesStatus && matchesInd;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} id="discovery-tab-content">
      {/* ==================== TOP-BAR: VALIDIERUNGS-RADAR & AUSWERTUNG ==================== */}
      <div className="card" style={{ padding: '1rem 1.25rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '0.6rem',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25))',
                border: '1px solid rgba(16, 185, 129, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34d399'
              }}
            >
              <Compass size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'white' }}>
                🎙️ Customer-Discovery & Positionierungs-Validierung (15–20 Min Interviews)
              </h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Kein Verkaufsanruf („Gründer-Bonus“) • 5 Diagnose-Pfade (A–E) • Live-Terminbuchung & CRM-Protokollbogen
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setShowMindsetBanner(!showMindsetBanner)}
              className="btn btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem', border: '1px solid rgba(6, 182, 212, 0.4)', color: 'var(--accent-cyan)' }}
            >
              🧭 Mindset-Regeln {showMindsetBanner ? '▲' : '▼'}
            </button>
            <button
              type="button"
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="btn btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem', border: '1px solid rgba(139, 92, 246, 0.4)', color: '#c4b5fd' }}
            >
              <BarChart3 size={14} style={{ marginRight: '0.3rem', display: 'inline' }} />
              Validierungs-Statistik {showAnalytics ? '▲' : '▼'}
            </button>
            <button
              type="button"
              onClick={handleExportAllDiscoveryCsv}
              className="btn btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem' }}
              title="Alle Interviews als CSV-Tabelle für Excel oder deinen Gründungscoach exportieren"
            >
              <Download size={14} style={{ marginRight: '0.3rem', display: 'inline' }} />
              CSV-Export (Coach)
            </button>
          </div>
        </div>

        {/* Aufklappbarer Mindset-Spickzettel aus dem Leitfaden */}
        {showMindsetBanner && (
          <div
            style={{
              marginTop: '0.9rem',
              padding: '0.85rem 1rem',
              borderRadius: '0.6rem',
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '0.75rem',
              fontSize: '0.78rem'
            }}
          >
            <div>
              <strong style={{ color: '#34d399', display: 'block', marginBottom: '0.2rem' }}>
                🛡️ 1. Der „Gründer-Bonus“
              </strong>
              <span style={{ color: 'var(--text-secondary)' }}>
                Du verkaufst heute nichts. Du bist Gründer aus der Region, der von gestandenen Meistern lernen will, um praxisnahe Lösungen für den Harz zu entwickeln.
              </span>
            </div>
            <div>
              <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '0.2rem' }}>
                🔄 2. Keine Sackgassen zulassen
              </strong>
              <span style={{ color: 'var(--text-secondary)' }}>
                Sagt der Chef <em>„Rechnungen schreiben wir in 5 Minuten“</em>, nutze das Reframing: <em>„Stark, dann gehört Ihr Betrieb zu den wenigen Vorreitern! Wo staut es sich stattdessen am meisten?“</em>
              </span>
            </div>
            <div>
              <strong style={{ color: '#c4b5fd', display: 'block', marginBottom: '0.2rem' }}>
                ✍️ 3. Wortwörtlich mitschreiben
              </strong>
              <span style={{ color: 'var(--text-secondary)' }}>
                Notiere die exakten Begriffe des Inhabers (<em>„Kunden rufen ständig an“</em>, <em>„Monteure vergessen Fotos“</em>, <em>„Zettel im Auto“</em>). Das ist dein späterer Vertriebswortschatz.
              </span>
            </div>
          </div>
        )}

        {/* Aufklappbares Validierungs-Radar (KPIs & Engpass-Verteilung) */}
        {showAnalytics && (
          <div style={{ marginTop: '0.9rem', paddingTop: '0.9rem', borderTop: '1px solid var(--border-color)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gap: '0.75rem',
                marginBottom: '0.9rem'
              }}
            >
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Kontakte in Liste</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white' }}>{totalContacts}</div>
              </div>
              <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
                <div style={{ fontSize: '0.7rem', color: '#67e8f9' }}>📅 Vereinbarte Termine</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#22d3ee' }}>{scheduledCount}</div>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                <div style={{ fontSize: '0.7rem', color: '#6ee7b7' }}>✅ Geführte Interviews</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399' }}>{completedCount}</div>
              </div>
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                <div style={{ fontSize: '0.7rem', color: '#fde68a' }}>🔥 Warme Wiedervorlagen</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fbbf24' }}>{warmLeadsCount}</div>
              </div>
            </div>

            {/* Engpass-Ranking Balken (Pfad A bis E) */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>📊 Validierungs-Radar: Welche Engpässe (Pfad A–E) brennen im Harz am stärksten?</span>
                <span>500-€-Audit Zuspruch: {discoveryLeads.filter((c) => c.auditPriceWillingness === '500 € problemlos').length} Betriebe</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: '0.6rem' }}>
                {DISCOVERY_PATHS.map((p) => {
                  const count = pathCounts[p.id] || 0;
                  const pct = Math.round((count / maxPathCount) * 100);
                  return (
                    <div key={p.id} style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '0.4rem', border: `1px solid ${p.color}33` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>
                        <span>{p.shortTitle}</span>
                        <span style={{ color: p.color }}>{count}x</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${count > 0 ? Math.max(15, pct) : 0}%`, height: '100%', background: p.color, transition: 'width 0.3s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================== HAUPT-GRID: LINKS KONTAKTLISTE / RECHTS INTERVIEW-COCKPIT ==================== */}
      <div className="leads-grid">
        {/* LINKE SPALTE: KONTAKTLISTE & UPLOAD */}
        {(!isMobile || !activeId) && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 'fit-content', maxHeight: '85vh' }}>
            <div className="card-header" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0, fontSize: '0.95rem' }}>
                  <PhoneCall size={18} color="#34d399" />
                  Discovery-Betriebe ({filteredContacts.length}/{discoveryLeads.length})
                </h3>

                {/* Versteckter Datei-Upload Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.json,.txt"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />

                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    title="CSV, TXT oder JSON Kontaktliste hochladen"
                  >
                    <Upload size={12} /> Datei-Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setImportMode(importMode === 'paste' ? null : 'paste')}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                    title="Mehrere Kontakte per Copy & Paste einfügen"
                  >
                    📋 Liste einfügen
                  </button>
                  <button
                    type="button"
                    onClick={() => setImportMode(importMode === 'manual' ? null : 'manual')}
                    className="btn btn-primary"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', background: '#059669' }}
                    title="Einzelnen Betrieb manuell anlegen"
                  >
                    <Plus size={12} /> Neu
                  </button>
                </div>
              </div>

              {/* 1-Klick Import aus den 90 bestehenden Kaltakquise-Leads */}
              <button
                type="button"
                onClick={handleImportFromExistingLeads}
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  fontSize: '0.72rem',
                  padding: '0.35rem 0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  border: '1px dashed rgba(139, 92, 246, 0.45)',
                  color: '#c4b5fd'
                }}
              >
                <RefreshCw size={12} /> Kontakte aus Lead-Tracker ({leads.length}) übernehmen
              </button>

              {/* Copy-Paste Import Box */}
              {importMode === 'paste' && (
                <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '0.65rem', borderRadius: '0.5rem', border: '1px solid var(--accent-cyan)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.3rem' }}>
                    📋 Kontakte zeilenweise einfügen (Format: Firma; Inhaber; Telefon; Ort; Gewerk)
                  </div>
                  <textarea
                    className="input-field"
                    style={{ height: '80px', fontSize: '0.72rem', marginBottom: '0.4rem' }}
                    placeholder={'Elektro Müller GmbH; Hans Müller; 05321 12345; Goslar; Elektro\nSanitär Harz; Peter Schmidt; 03943 98765; Wernigerode; SHK'}
                    value={pasteText}
                    onChange={(e) => setPasteText(e.target.value)}
                  />
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button type="button" onClick={handlePasteImport} className="btn btn-primary" style={{ flex: 1, fontSize: '0.72rem', padding: '0.3rem' }}>
                      Jetzt importieren
                    </button>
                    <button type="button" onClick={() => setImportMode(null)} className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}>
                      Abbrechen
                    </button>
                  </div>
                </div>
              )}

              {/* Manuelles Kurzformular */}
              {importMode === 'manual' && (
                <form onSubmit={handleAddManualContact} style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '0.65rem', borderRadius: '0.5rem', border: '1px solid #10b981', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399' }}>➕ Neuen Betrieb zur Liste hinzufügen</div>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Firmenname *"
                    value={newContactForm.company}
                    onChange={(e) => setNewContactForm({ ...newContactForm, company: e.target.value })}
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                    required
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Inhaber (Vor- & Nachname)"
                      value={newContactForm.ownerName}
                      onChange={(e) => setNewContactForm({ ...newContactForm, ownerName: e.target.value })}
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                    />
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Telefonnummer"
                      value={newContactForm.phone}
                      onChange={(e) => setNewContactForm({ ...newContactForm, phone: e.target.value })}
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                    <select
                      className="input-field"
                      value={newContactForm.industry}
                      onChange={(e) => setNewContactForm({ ...newContactForm, industry: e.target.value })}
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                    >
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Ort (z.B. Goslar)"
                      value={newContactForm.city}
                      onChange={(e) => setNewContactForm({ ...newContactForm, city: e.target.value })}
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, fontSize: '0.72rem', padding: '0.3rem', background: '#059669' }}>
                      Speichern
                    </button>
                    <button type="button" onClick={() => setImportMode(null)} className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}>
                      Abbrechen
                    </button>
                  </div>
                </form>
              )}

              {/* Suche & Filter */}
              <input
                type="text"
                className="input-field"
                placeholder="Firma, Inhaber oder Ort suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', fontSize: '0.8rem' }}
              />

              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <select
                  className="input-field"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ fontSize: '0.7rem', padding: '0.25rem 0.4rem', flex: 1 }}
                >
                  <option value="all">Alle Status</option>
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <select
                  className="input-field"
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  style={{ fontSize: '0.7rem', padding: '0.25rem 0.4rem', flex: 1 }}
                >
                  <option value="all">Alle Gewerke</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scrollbare Kontaktliste */}
            <div style={{ overflowY: 'auto', flex: 1, padding: '0 0.5rem 0.5rem 0.5rem', maxHeight: '60vh' }}>
              {filteredContacts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  Keine Betriebe für diesen Filter gefunden.
                </div>
              ) : (
                filteredContacts.map((c) => {
                  const isSelected = c.id === activeId;
                  const hasAppointment = Boolean(c.scheduledDate);
                  const isDone = c.status === 'Interview abgeschlossen' || c.status === 'Warm-Lead (Wiedervorlage)';

                  return (
                    <div
                      key={c.id}
                      onClick={() => setActiveId(c.id)}
                      style={{
                        padding: '0.7rem',
                        borderRadius: '0.5rem',
                        background: isSelected ? 'rgba(16, 185, 129, 0.14)' : 'rgba(255, 255, 255, 0.02)',
                        border: isSelected ? '1px solid #10b981' : '1px solid var(--border-color)',
                        marginBottom: '0.45rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '0.1rem 0.4rem',
                            borderRadius: '0.25rem',
                            background: 'rgba(139, 92, 246, 0.18)',
                            color: '#c4b5fd'
                          }}
                        >
                          {c.industry || 'Handwerk'}
                        </span>
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            color: isDone ? '#34d399' : hasAppointment ? '#22d3ee' : 'var(--text-secondary)'
                          }}
                        >
                          {c.status}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0.3rem 0 0.1rem 0', color: 'white' }}>
                        {showcaseMode ? mask(c.company, 'company') : c.company}
                      </h4>

                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        👤 {showcaseMode ? mask(c.ownerName, 'name') : c.ownerName || 'Inhaber unbekannt'} • 📍 {c.city || 'Harz'}
                      </div>

                      {c.phone && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', marginTop: '0.15rem' }}>
                          📞 {showcaseMode ? mask(c.phone, 'phone') : c.phone}
                        </div>
                      )}

                      {/* Termin- oder Pfad-Badges */}
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                        {c.scheduledDate && (
                          <span
                            style={{
                              fontSize: '0.63rem',
                              padding: '0.1rem 0.35rem',
                              borderRadius: '0.25rem',
                              background: 'rgba(6, 182, 212, 0.18)',
                              color: '#67e8f9',
                              fontWeight: 600
                            }}
                          >
                            📅 {c.scheduledDate} {c.scheduledTime ? `(${c.scheduledTime} Uhr)` : ''}
                          </span>
                        )}
                        {(c.selectedPaths || []).map((pid) => (
                          <span
                            key={pid}
                            style={{
                              fontSize: '0.63rem',
                              padding: '0.1rem 0.35rem',
                              borderRadius: '0.25rem',
                              background: 'rgba(16, 185, 129, 0.18)',
                              color: '#6ee7b7',
                              fontWeight: 700
                            }}
                          >
                            Pfad {pid}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* RECHTE SPALTE: INTERAKTIVES GESPRÄCHS-COCKPIT (PHASEN 1-6 + PROTOKOLLBOGEN) */}
        {(!isMobile || activeId) && (
          <div className="card" style={{ height: 'fit-content' }}>
            {isMobile && activeId && (
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="btn btn-secondary"
                style={{ marginBottom: '0.75rem', fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              >
                ← Zurück zur Kontaktliste
              </button>
            )}

            {activeContact ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* ==================== KONTAKT-KOPFZEILE & STOPPUHR & KALENDER-BUTTON ==================== */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    paddingBottom: '0.85rem',
                    borderBottom: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ flex: '1 1 280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'white' }}>
                        {showcaseMode ? mask(activeContact.company, 'company') : activeContact.company}
                      </h2>
                      <select
                        className="input-field"
                        value={activeContact.status || 'Offen'}
                        onChange={(e) => updateActiveContact({ status: e.target.value })}
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.5rem',
                          height: 'auto',
                          width: 'auto',
                          fontWeight: 700,
                          color: '#34d399',
                          borderColor: 'rgba(16, 185, 129, 0.4)'
                        }}
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    {/* Schnelle Bearbeitung von Inhabername & Telefon für den Live-Pitch */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.45rem', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        <span>👤 Inhaber:</span>
                        <input
                          type="text"
                          className="input-field"
                          value={activeContact.ownerName || ''}
                          onChange={(e) => updateActiveContact({ ownerName: e.target.value })}
                          placeholder="Vor- & Nachname"
                          style={{ fontSize: '0.75rem', padding: '0.15rem 0.4rem', height: '26px', width: '165px' }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        <span>📞 Tel:</span>
                        <input
                          type="text"
                          className="input-field"
                          value={activeContact.phone || ''}
                          onChange={(e) => updateActiveContact({ phone: e.target.value })}
                          placeholder="Telefonnummer"
                          style={{ fontSize: '0.75rem', padding: '0.15rem 0.4rem', height: '26px', width: '145px' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rechts oben: Anrufen, Termin buchen & 15-20 Min Stoppuhr */}
                  <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* 15-20 Min Interview-Timer */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: timerSeconds > 1200 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-color)',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.78rem'
                      }}
                      title="Interview-Zeitkontrolle (Ziel: 15 bis max. 20 Minuten)"
                    >
                      <Clock size={14} color={timerSeconds > 1200 ? '#f87171' : '#34d399'} />
                      <strong style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{formatTimer(timerSeconds)}</strong>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>/ 20:00</span>
                      <button
                        type="button"
                        onClick={() => setTimerRunning(!timerRunning)}
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0 0.15rem' }}
                        title={timerRunning ? 'Timer pausieren' : 'Timer starten'}
                      >
                        <Play size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => { setTimerRunning(false); setTimerSeconds(0); }}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 0.15rem' }}
                        title="Timer zurücksetzen"
                      >
                        <RotateCcw size={13} />
                      </button>
                    </div>

                    {/* Kalender-Termin Button */}
                    <button
                      type="button"
                      onClick={() => setShowScheduler(!showScheduler)}
                      className="btn btn-secondary"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.78rem',
                        padding: '0.4rem 0.75rem',
                        border: '1px solid rgba(6, 182, 212, 0.5)',
                        background: showScheduler ? 'rgba(6, 182, 212, 0.25)' : 'rgba(6, 182, 212, 0.1)',
                        color: '#22d3ee',
                        fontWeight: 700
                      }}
                    >
                      <Calendar size={14} />
                      {activeContact.scheduledDate
                        ? `Termin: ${activeContact.scheduledDate} (${activeContact.scheduledTime})`
                        : '📅 Interview-Termin eintragen'}
                    </button>

                    {/* Direkt Anrufen Button */}
                    {activeContact.phone && (
                      <a
                        href={`tel:${activeContact.phone}`}
                        className="btn btn-primary"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          textDecoration: 'none',
                          fontSize: '0.78rem',
                          padding: '0.4rem 0.75rem',
                          background: 'linear-gradient(135deg, #059669, #10b981)'
                        }}
                      >
                        <Phone size={14} /> Anrufen
                      </a>
                    )}

                    {/* Kontakt löschen Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const remaining = discoveryLeads.filter((item) => item.id !== activeContact.id);
                        setDiscoveryLeads(remaining);
                        setActiveId(remaining[0]?.id || null);
                        if (showToast) showToast(`🗑️ Kontakt "${activeContact.company}" entfernt.`);
                      }}
                      className="btn btn-secondary"
                      style={{
                        padding: '0.4rem 0.55rem',
                        color: '#f87171',
                        borderColor: 'rgba(239, 68, 68, 0.3)'
                      }}
                      title="Diesen Kontakt aus der Discovery-Liste entfernen"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* ==================== AUFKLAPPBARER KALENDER-TERMIN-PLANER ==================== */}
                {showScheduler && (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(15, 23, 42, 0.95))',
                      border: '1px solid rgba(6, 182, 212, 0.45)',
                      borderRadius: '0.65rem',
                      padding: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                      <h4 style={{ margin: 0, fontSize: '0.88rem', color: '#22d3ee', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Calendar size={16} /> 15–20 Min Interview-Termin in Kalender eintragen
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowScheduler(false)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        ✕ Schließen
                      </button>
                    </div>

                    {/* 1-Klick Schnell-Buttons passend zu Phase 1 ("morgens 07:15 Uhr vor der Baustelle oder freitags ab 13:00 Uhr") */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', alignSelf: 'center', marginRight: '0.2rem' }}>
                        ⚡ Schnellwahl:
                      </span>
                      <button
                        type="button"
                        onClick={() => applyQuickSchedulePreset('tomorrow_0715')}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem', border: '1px solid rgba(6, 182, 212, 0.35)' }}
                      >
                        🌅 Morgen 07:15 Uhr (Vor Baustelle)
                      </button>
                      <button
                        type="button"
                        onClick={() => applyQuickSchedulePreset('dayafter_0715')}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem', border: '1px solid rgba(6, 182, 212, 0.35)' }}
                      >
                        🌅 Übermorgen 07:15 Uhr
                      </button>
                      <button
                        type="button"
                        onClick={() => applyQuickSchedulePreset('friday_1300')}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem', border: '1px solid rgba(6, 182, 212, 0.35)' }}
                      >
                        🕒 Kommenden Freitag 13:00 Uhr
                      </button>
                      <button
                        type="button"
                        onClick={() => applyQuickSchedulePreset('next_tue_0715')}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem', border: '1px solid rgba(6, 182, 212, 0.35)' }}
                      >
                        📅 Nächsten Dienstag 07:15 Uhr
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 100px 2fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Datum</label>
                        <input
                          type="date"
                          className="input-field"
                          value={schedDate}
                          onChange={(e) => setSchedDate(e.target.value)}
                          style={{ fontSize: '0.78rem', padding: '0.35rem 0.5rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Uhrzeit</label>
                        <input
                          type="time"
                          className="input-field"
                          value={schedTime}
                          onChange={(e) => setSchedTime(e.target.value)}
                          style={{ fontSize: '0.78rem', padding: '0.35rem 0.5rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Dauer (Min)</label>
                        <select
                          className="input-field"
                          value={schedDuration}
                          onChange={(e) => setSchedDuration(Number(e.target.value))}
                          style={{ fontSize: '0.78rem', padding: '0.35rem 0.5rem' }}
                        >
                          <option value={15}>15 Min</option>
                          <option value={20}>20 Min</option>
                          <option value={30}>30 Min</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Termin-Notiz</label>
                        <input
                          type="text"
                          className="input-field"
                          value={schedNote}
                          onChange={(e) => setSchedNote(e.target.value)}
                          style={{ fontSize: '0.78rem', padding: '0.35rem 0.5rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={handleSaveInterviewAppointment}
                        className="btn btn-primary"
                        style={{ background: 'linear-gradient(135deg, #0891b2, #06b6d4)', fontSize: '0.78rem', padding: '0.45rem 0.9rem', fontWeight: 700 }}
                      >
                        ✅ Im Founder-OS-Kalender speichern (inkl. 15-Min-Push)
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenGoogleCalendarTemplate}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.78rem', padding: '0.45rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <ExternalLink size={13} /> In Google Kalender öffnen
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadIcsFile}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.78rem', padding: '0.45rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <Download size={13} /> .ics Datei (Outlook / Handy)
                      </button>
                    </div>
                  </div>
                )}

                {/* ==================== PHASEN-STEPPER (PHASE 1 BIS 6 + PROTOKOLLBOGEN) ==================== */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(7, 1fr)',
                    gap: '0.35rem'
                  }}
                >
                  {[
                    { step: 1, title: 'Phase 1', sub: 'Türöffner (01:30)' },
                    { step: 2, title: 'Phase 2', sub: 'Kontext (03:00)' },
                    { step: 3, title: 'Phase 3', sub: 'Weiche A–E (09:30)' },
                    { step: 4, title: 'Phase 4', sub: 'Pitch (13:30)' },
                    { step: 5, title: 'Phase 5', sub: 'Preistest (17:30)' },
                    { step: 6, title: 'Phase 6', sub: 'Abschluss (20:00)' },
                    { step: 7, title: '📋 Protokoll', sub: 'CRM-Bogen' }
                  ].map((item) => {
                    const isCurrent = activePhase === item.step;
                    return (
                      <button
                        key={item.step}
                        type="button"
                        onClick={() => setActivePhase(item.step)}
                        style={{
                          padding: '0.45rem 0.35rem',
                          borderRadius: '0.45rem',
                          border: isCurrent ? '1px solid #10b981' : '1px solid var(--border-color)',
                          background: isCurrent
                            ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.35), rgba(16, 185, 129, 0.2))'
                            : 'rgba(255, 255, 255, 0.02)',
                          color: isCurrent ? '#ffffff' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isCurrent ? '#34d399' : 'white' }}>{item.title}</div>
                        <div style={{ fontSize: '0.63rem', opacity: 0.85 }}>{item.sub}</div>
                      </button>
                    );
                  })}
                </div>

                {/* ==================== PHASE 1: DER TELEFON-TÜRÖFFNER ==================== */}
                {activePhase === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.07)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.65rem', padding: '1rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        ⏱️ [00:00 - 01:30] Phase 1: Der Telefon-Türöffner (Ziel: Gesprächserlaubnis sichern – ohne Abwehrhaltung)
                      </div>
                      <blockquote
                        style={{
                          margin: 0,
                          padding: '0.85rem 1rem',
                          background: 'rgba(0, 0, 0, 0.3)',
                          borderLeft: '4px solid #10b981',
                          borderRadius: '0.4rem',
                          fontSize: '0.92rem',
                          lineHeight: 1.6,
                          color: '#f8fafc'
                        }}
                      >
                        „Guten Tag Herr/Frau <strong style={{ color: '#34d399' }}>{getLastName(activeContact)}</strong>, mein Name ist Robin Gornitzka aus Goslar/Harz.
                        <br /><br />
                        Direkt vorab zur Beruhigung: <strong>Das ist absolut kein Verkaufsanruf – ich habe noch nicht einmal ein Gewerbe angemeldet.</strong>
                        <br /><br />
                        Ich bereite aktuell meine Existenzgründung hier im Landkreis Goslar vor. Mein Gründungscoach hat mir die klare Hausaufgabe gegeben, mit echten Praktikern aus den Betrieben zu sprechen, statt mir am Schreibtisch Theorien auszudenken.
                        <br /><br />
                        Hätten Sie nächste Woche 15 Minuten Zeit für ein kurzes Feedback-Gespräch an einen regionalen Gründer?“
                      </blockquote>
                    </div>

                    {/* Die 3 Ausweichrouten / Reaktionen aus Phase 1 */}
                    <div>
                      <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        🔀 Wie reagiert der Inhaber am Telefon? (Ausweichroute anklicken):
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '0.65rem' }}>
                        {/* Route 1: Direktstart */}
                        <div
                          onClick={() => {
                            updateActiveContact({ phase1Reaction: 'direct_start', status: 'Interview abgeschlossen' });
                            if (!timerRunning) setTimerRunning(true);
                            setActivePhase(2);
                          }}
                          style={{
                            padding: '0.85rem',
                            borderRadius: '0.55rem',
                            border: activeContact.phase1Reaction === 'direct_start' ? '2px solid #10b981' : '1px solid rgba(16, 185, 129, 0.35)',
                            background: 'rgba(16, 185, 129, 0.1)',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34d399', marginBottom: '0.3rem' }}>
                            🚗 „Schießen Sie los, bin gerade im Auto!“
                          </div>
                          <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)' }}>
                            ➔ Startet sofort die Stoppuhr und springt direkt weiter in <strong>Phase 2 (Betriebskontext)</strong>!
                          </div>
                        </div>

                        {/* Route 2: Keine Zeit -> Termin-Gegenfrage */}
                        <div
                          onClick={() => {
                            updateActiveContact({ phase1Reaction: 'no_time' });
                            setShowScheduler(true);
                          }}
                          style={{
                            padding: '0.85rem',
                            borderRadius: '0.55rem',
                            border: activeContact.phase1Reaction === 'no_time' ? '2px solid #f59e0b' : '1px solid rgba(245, 158, 11, 0.35)',
                            background: 'rgba(245, 158, 11, 0.1)',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fbbf24', marginBottom: '0.3rem' }}>
                            ⏳ „Keine Zeit / Gerade schlecht“
                          </div>
                          <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)' }}>
                            ➔ Zeigt sofort den 07:15 / Freitag 13:00 Uhr Konter & öffnet den <strong>Kalender-Terminplaner</strong>.
                          </div>
                        </div>

                        {/* Route 3: Worum geht's denn? */}
                        <div
                          onClick={() => updateActiveContact({ phase1Reaction: 'what_is_it_about' })}
                          style={{
                            padding: '0.85rem',
                            borderRadius: '0.55rem',
                            border: activeContact.phase1Reaction === 'what_is_it_about' ? '2px solid #06b6d4' : '1px solid rgba(6, 182, 212, 0.35)',
                            background: 'rgba(6, 182, 212, 0.1)',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#22d3ee', marginBottom: '0.3rem' }}>
                            ❓ „Worum geht’s denn genau?“
                          </div>
                          <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)' }}>
                            ➔ Blendet die präzise Baustelle-Büro-Antwort ein.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dynamisch eingeblendete Antwort-Boxen für "Keine Zeit" oder "Worum geht's" */}
                    {activeContact.phase1Reaction === 'no_time' && (
                      <div style={{ padding: '0.9rem 1rem', borderRadius: '0.55rem', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid #f59e0b' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', marginBottom: '0.3rem' }}>
                          💬 Deine Antwort bei „Keine Zeit“:
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'white', fontStyle: 'italic' }}>
                          „Verstehe ich vollkommen. Wann passt es für kurze 15 Minuten am besten – <strong>morgens um 07:15 Uhr vor der Baustelle</strong> oder <strong>freitags ab 13:00 Uhr</strong>?“
                        </div>
                      </div>
                    )}

                    {activeContact.phase1Reaction === 'what_is_it_about' && (
                      <div style={{ padding: '0.9rem 1rem', borderRadius: '0.55rem', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid #06b6d4' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#22d3ee', marginBottom: '0.3rem' }}>
                          💬 Deine Antwort bei „Worum geht’s denn?“:
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'white', fontStyle: 'italic', marginBottom: '0.65rem' }}>
                          „Um zeitraubende Reibungsverluste zwischen Baustelle, Kunden und Büro. Ich möchte verstehen, wo bei Betrieben Ihrer Größe am meisten Zeit verbrannt wird, um später nichts am Alltag vorbeizubauen.“
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={() => setShowScheduler(true)}
                            className="btn btn-secondary"
                            style={{ fontSize: '0.75rem', border: '1px solid #22d3ee', color: '#22d3ee' }}
                          >
                            📅 Jetzt Termin für nächste Woche eintragen
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!timerRunning) setTimerRunning(true);
                              setActivePhase(2);
                            }}
                            className="btn btn-primary"
                            style={{ fontSize: '0.75rem', background: '#059669' }}
                          >
                            🚀 Direkt starten (Weiter zu Phase 2)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ==================== PHASE 2: FRAMING & BETRIEBSKONTEXT ==================== */}
                {activePhase === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '0.65rem', padding: '1rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c4b5fd', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        ⏱️ [01:30 - 03:00] Phase 2: Framing & Betriebskontext (Druck abbauen)
                      </div>
                      <div style={{ marginBottom: '0.65rem', fontSize: '0.88rem', color: '#f8fafc', padding: '0.65rem', background: 'rgba(0,0,0,0.25)', borderRadius: '0.4rem', borderLeft: '3px solid #8b5cf6' }}>
                        <strong>1. Vertrauen festigen:</strong><br />
                        „Vielen Dank für Ihre Zeit! Wie versprochen: Ich habe heute weder ein Produkt noch einen Vertrag in der Tasche. Es geht rein um Ihre Praxiserfahrung.“
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#f8fafc', padding: '0.65rem', background: 'rgba(0,0,0,0.25)', borderRadius: '0.4rem', borderLeft: '3px solid #06b6d4' }}>
                        <strong>2. Betriebsrahmen abstecken:</strong><br />
                        „Damit ich Ihren Betrieb kurz einordnen kann: Wie viele Mitarbeiter sind Sie aktuell bei <strong style={{ color: '#22d3ee' }}>{activeContact.company}</strong>, und wer kümmert sich primär um das Büro und die Kundenorganisation?“
                      </div>
                    </div>

                    {/* Schnelleingabe Betriebskontext */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '0.85rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                          Gewerk / Branche
                        </label>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                          {INDUSTRIES.map((ind) => (
                            <button
                              key={ind}
                              type="button"
                              onClick={() => updateActiveContact({ industry: ind })}
                              style={{
                                padding: '0.3rem 0.65rem',
                                borderRadius: '0.4rem',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                border: activeContact.industry === ind ? '1px solid #10b981' : '1px solid var(--border-color)',
                                background: activeContact.industry === ind ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                                color: activeContact.industry === ind ? '#34d399' : 'var(--text-secondary)'
                              }}
                            >
                              {ind}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                            👷 Gesellen / Feld (Anzahl)
                          </label>
                          <input
                            type="text"
                            className="input-field"
                            placeholder="z.B. 6 Monteure"
                            value={activeContact.employeesField || ''}
                            onChange={(e) => updateActiveContact({ employeesField: e.target.value })}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                            🖥️ Büro-Mitarbeiter
                          </label>
                          <input
                            type="text"
                            className="input-field"
                            placeholder="z.B. 1 (Teilzeit)"
                            value={activeContact.employeesOffice || ''}
                            onChange={(e) => updateActiveContact({ employeesOffice: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                          Wer kümmert sich primär ums Büro?
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="z.B. Chef abends selbst, Ehefrau, Teilzeitkraft..."
                          value={activeContact.officePerson || ''}
                          onChange={(e) => updateActiveContact({ officePerson: e.target.value })}
                        />
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                          {['Chef selbst (abends/WE)', 'Ehefrau / Familie', 'Teilzeit-Bürokraft', 'Vollzeit-Büro'].map((chip) => (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => updateActiveContact({ officePerson: chip })}
                              style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: '0.3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                              + {chip}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                            Software (Büro/Buchhaltung)
                          </label>
                          <input
                            type="text"
                            className="input-field"
                            placeholder="z.B. Lexoffice, sevDesk, DATEV, Streit..."
                            value={activeContact.softwareOffice || ''}
                            onChange={(e) => updateActiveContact({ softwareOffice: e.target.value })}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                            Kommunikation (Baustelle)
                          </label>
                          <input
                            type="text"
                            className="input-field"
                            placeholder="z.B. WhatsApp, Papier, Anrufe..."
                            value={activeContact.softwareComm || ''}
                            onChange={(e) => updateActiveContact({ softwareComm: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== PHASE 3: DIE DIAGNOSE-WEICHE (5 PFADE A-E) ==================== */}
                {activePhase === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Breite Radar-Einstiegsfrage */}
                    <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.35)', borderRadius: '0.65rem', padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#22d3ee', textTransform: 'uppercase' }}>
                          ⏱️ [03:00 - 09:30] Phase 3: Die Diagnose-Weiche (Breite Radar-Frage)
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowReframingBox(!showReframingBox)}
                          className="btn btn-secondary"
                          style={{
                            fontSize: '0.72rem',
                            padding: '0.25rem 0.6rem',
                            border: '1px solid #f59e0b',
                            background: showReframingBox ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.1)',
                            color: '#fbbf24',
                            fontWeight: 700
                          }}
                        >
                          🛡️ Ausweichroute: „Rechnungen sind bei uns kein Problem!“
                        </button>
                      </div>

                      <blockquote
                        style={{
                          margin: '0 0 0.75rem 0',
                          padding: '0.75rem 1rem',
                          background: 'rgba(0,0,0,0.3)',
                          borderLeft: '4px solid #06b6d4',
                          borderRadius: '0.4rem',
                          fontSize: '0.92rem',
                          color: 'white'
                        }}
                      >
                        „Wenn Sie auf die letzten Wochen in Ihrem Betrieb schauen: <strong>In welchem Bereich verbrennen Sie oder Ihr Büro aktuell die meiste unproduktive Arbeitszeit?</strong>“
                      </blockquote>

                      {/* Reframing-Ausweichroute */}
                      {showReframingBox && (
                        <div style={{ padding: '0.75rem 0.9rem', borderRadius: '0.5rem', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #f59e0b', marginBottom: '0.75rem' }}>
                          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#fbbf24', marginBottom: '0.2rem' }}>
                            🔄 Dein Reframing-Konter (wenn Buchhaltung/Rechnungen schon rund laufen):
                          </div>
                          <div style={{ fontSize: '0.88rem', color: 'white', fontStyle: 'italic' }}>
                            „Stark, dann gehört Ihr Betrieb da schon zu den wenigen Vorreitern im Harz! <strong>Wo staut es sich stattdessen im Alltag am meisten – eher vorne am Telefon bei Kundenanfragen (Pfad B/C) oder draußen auf der Baustelle bei Fotos und Stundenzetteln (Pfad D/E)?</strong>“
                          </div>
                        </div>
                      )}

                      {/* Wortwörtliches Zitat (Vertriebswortschatz) */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#67e8f9', marginBottom: '0.25rem' }}>
                          ✍️ Größter Zeitfresser (Wortwörtliches Zitat des Inhabers mitschreiben!):
                        </label>
                        <textarea
                          className="input-field"
                          style={{ height: '62px', fontSize: '0.82rem' }}
                          placeholder="z.B. „Kunden rufen ständig wegen Kleinkram an“, „Monteure vergessen Fotos“, „Zettel verschwinden im Bulli“..."
                          value={activeContact.biggestTimeWasterQuote || ''}
                          onChange={(e) => updateActiveContact({ biggestTimeWasterQuote: e.target.value })}
                        />
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                          {[
                            'Kunden rufen ständig an',
                            'Monteure vergessen Fotos',
                            'Zettel liegen im Auto',
                            'Bürosonntag für Rechnungen',
                            'Stundenzettel unleserlich'
                          ].map((qChip) => (
                            <button
                              key={qChip}
                              type="button"
                              onClick={() =>
                                updateActiveContact({
                                  biggestTimeWasterQuote: activeContact.biggestTimeWasterQuote
                                    ? `${activeContact.biggestTimeWasterQuote} | ${qChip}`
                                    : qChip
                                })
                              }
                              style={{ fontSize: '0.67rem', padding: '0.15rem 0.45rem', borderRadius: '0.25rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                              + „{qChip}“
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Auswahl-Buttons für die 5 Diagnose-Pfade A bis E */}
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', marginBottom: '0.45rem' }}>
                        🔀 Wähle den passenden Erkundungs-Pfad (Mehrfachauswahl möglich – klicke zum Aufklappen & Markieren):
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: '0.45rem', marginBottom: '0.75rem' }}>
                        {DISCOVERY_PATHS.map((p) => {
                          const isSelected = (activeContact.selectedPaths || []).includes(p.id);
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => togglePathSelection(p.id)}
                              style={{
                                padding: '0.55rem 0.5rem',
                                borderRadius: '0.5rem',
                                border: isSelected ? `2px solid ${p.color}` : '1px solid var(--border-color)',
                                background: isSelected ? `${p.color}25` : 'rgba(255,255,255,0.02)',
                                color: 'white',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isSelected ? p.color : 'white' }}>
                                  {p.shortTitle}
                                </span>
                                {isSelected && <CheckCircle size={14} color={p.color} />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Aufgeklappte Karten für alle ausgewählten Pfade (oder Hinweis wenn noch keiner gewählt) */}
                      {(activeContact.selectedPaths || []).length === 0 ? (
                        <div style={{ padding: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', border: '1px dashed var(--border-color)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          👆 Klicke oben auf <strong>Pfad A, B, C, D oder E</strong>, sobald der Inhaber seinen Engpass nennt, um die genauen Vertiefungsfragen einzublenden.
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {DISCOVERY_PATHS.filter((p) => (activeContact.selectedPaths || []).includes(p.id)).map((path) => (
                            <div
                              key={path.id}
                              style={{
                                padding: '0.9rem 1rem',
                                borderRadius: '0.6rem',
                                background: 'rgba(15, 23, 42, 0.85)',
                                border: `1px solid ${path.color}`
                              }}
                            >
                              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: path.color, marginBottom: '0.15rem' }}>
                                {path.title}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '0.6rem' }}>
                                {path.whenToUse}
                              </div>

                              {path.transition && (
                                <div style={{ fontSize: '0.82rem', color: '#e2e8f0', marginBottom: '0.5rem', padding: '0.4rem 0.65rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.35rem' }}>
                                  <strong>Übergang:</strong> <em>{path.transition}</em>
                                </div>
                              )}

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '0.65rem' }}>
                                {path.questions.map((q, idx) => (
                                  <div key={idx} style={{ fontSize: '0.84rem', color: '#f8fafc', paddingLeft: '0.6rem', borderLeft: `3px solid ${path.color}` }}>
                                    <strong style={{ color: path.color }}>{q.label}:</strong> {q.text}
                                  </div>
                                ))}
                              </div>

                              {/* Zusatz-Abfrage Büro-Wochenende bei Pfad A */}
                              {path.id === 'A' && (
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.6rem', padding: '0.5rem 0.65rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '0.4rem' }}>
                                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c4b5fd' }}>Büro-Wochenende?</span>
                                  <label style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                                    <input
                                      type="radio"
                                      name="weekendOffice"
                                      checked={activeContact.weekendOffice === 'yes'}
                                      onChange={() => updateActiveContact({ weekendOffice: 'yes' })}
                                    />
                                    Ja, regelmäßig
                                  </label>
                                  {activeContact.weekendOffice === 'yes' && (
                                    <input
                                      type="text"
                                      className="input-field"
                                      placeholder="Std./Woche (z.B. 3)"
                                      value={activeContact.weekendHours || ''}
                                      onChange={(e) => updateActiveContact({ weekendHours: e.target.value })}
                                      style={{ width: '120px', height: '26px', fontSize: '0.75rem', padding: '0.15rem 0.4rem' }}
                                    />
                                  )}
                                  <label style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                                    <input
                                      type="radio"
                                      name="weekendOffice"
                                      checked={activeContact.weekendOffice === 'no'}
                                      onChange={() => updateActiveContact({ weekendOffice: 'no' })}
                                    />
                                    Nein, unter der Woche erledigt
                                  </label>
                                </div>
                              )}

                              <textarea
                                className="input-field"
                                style={{ height: '58px', fontSize: '0.8rem' }}
                                placeholder={`Antworten & Details zu ${path.shortTitle} hier notieren...`}
                                value={(activeContact.pathNotes && activeContact.pathNotes[path.id]) || ''}
                                onChange={(e) => updatePathNote(path.id, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Universelle Zauberstab-Abschlussfrage für Phase 3 */}
                    <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: '0.65rem', padding: '0.9rem 1rem' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fbbf24', marginBottom: '0.35rem' }}>
                        🪄 Die universelle Abschlussfrage für Phase 3:
                      </div>
                      <blockquote style={{ margin: '0 0 0.6rem 0', fontSize: '0.88rem', color: 'white', fontStyle: 'italic' }}>
                        „Wenn Sie einen Zauberstab hätten und eine einzige administrative Nerv-Aufgabe in Ihrem Betrieb ab morgen nie wieder machen müssten: Welche wäre das?“
                      </blockquote>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Zauberstab-Antwort des Inhabers notieren..."
                        value={activeContact.magicWandAnswer || ''}
                        onChange={(e) => updateActiveContact({ magicWandAnswer: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* ==================== PHASE 4: DER ZIELGERICHTETE LÖSUNGS-PITCH ==================== */}
                {activePhase === 4 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '0.65rem', padding: '1rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                        ⏱️ [09:30 - 13:30] Phase 4: Der zielgerichtete Lösungs-Pitch (Passend zum erkannten Schmerz)
                      </div>

                      <blockquote
                        style={{
                          margin: '0 0 0.85rem 0',
                          padding: '0.75rem 1rem',
                          background: 'rgba(0,0,0,0.3)',
                          borderLeft: '4px solid #10b981',
                          borderRadius: '0.4rem',
                          fontSize: '0.9rem',
                          color: 'white'
                        }}
                      >
                        „Herr/Frau <strong style={{ color: '#34d399' }}>{getLastName(activeContact)}</strong>, genau an dieser Bruchstelle setzt meine geplante Gründung an:
                        <br />
                        Ich gründe keinen klassischen IT-Laden, der Ihnen teure Server oder neue Riesen-Software verkauft. Ich verstehe mich als <strong>‚Handwerker für digitale Abläufe‘</strong>...“
                      </blockquote>

                      {/* Pitch-Bausteine (Ausgewählte Pfade aus Phase 3 werden automatisch grün hervorgehoben!) */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.9rem' }}>
                        {DISCOVERY_PATHS.map((p) => {
                          const isMatched = (activeContact.selectedPaths || []).includes(p.id);
                          return (
                            <div
                              key={p.id}
                              style={{
                                padding: '0.65rem 0.85rem',
                                borderRadius: '0.45rem',
                                border: isMatched ? `2px solid ${p.color}` : '1px solid var(--border-color)',
                                background: isMatched ? `${p.color}20` : 'rgba(255,255,255,0.02)',
                                opacity: (activeContact.selectedPaths || []).length > 0 && !isMatched ? 0.55 : 1
                              }}
                            >
                              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: p.color, marginBottom: '0.2rem' }}>
                                {isMatched ? '🎯 EMPFOHLENER PITCH FÜR DIESEN BETRIEB — ' : ''}{p.shortTitle}:
                              </div>
                              <div style={{ fontSize: '0.88rem', color: 'white', fontStyle: 'italic' }}>{p.pitchText}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Brückenschlag zum 60-90 Min Büro-Audit */}
                      <div style={{ padding: '0.8rem 1rem', background: 'rgba(6, 182, 212, 0.14)', border: '1px solid #06b6d4', borderRadius: '0.5rem', marginBottom: '0.85rem' }}>
                        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#22d3ee', marginBottom: '0.25rem' }}>
                          🌉 Der Brückenschlag zum Audit:
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'white', fontStyle: 'italic' }}>
                          „Bevor man da aber irgendetwas umsetzt, plane ich als festen ersten Schritt ein <strong>60- bis 90-minütiges Büro-Audit vor Ort</strong> an. Wir schauen uns die Abläufe an, decken die Zeitfresser auf und berechnen schwarz auf weiß, wie viele Stunden Sie pro Woche sparen können.“
                        </div>
                      </div>

                      {/* NEU: Coaching-Spickzettel: 5 FAB-Statements & Himmel-Hölle-Hebel (Dennis Kauss) */}
                      <div style={{ padding: '0.85rem 1rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '0.55rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c4b5fd', textTransform: 'uppercase', marginBottom: '0.45rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                          <span>💎 Coaching-Spickzettel (Kauss): Die 5 FAB-Nutzen-Ketten (Blau ➔ Lila ➔ Grün)</span>
                          <span style={{ fontSize: '0.68rem', color: '#86efac', fontWeight: 700 }}>Für Pitch & Einwände in Phase 4/5</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '0.45rem', fontSize: '0.76rem' }}>
                          <div style={{ padding: '0.45rem 0.6rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '0.4rem', borderLeft: '3px solid #3b82f6' }}>
                            <strong style={{ color: '#93c5fd' }}>1. System-Brücken (KI):</strong> <span style={{ color: '#d8b4fe' }}>Keine Schulung nötig</span> ➔ <strong style={{ color: '#86efac' }}>Bestehende Systeme bleiben erhalten!</strong>
                          </div>
                          <div style={{ padding: '0.45rem 0.6rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '0.4rem', borderLeft: '3px solid #a855f7' }}>
                            <strong style={{ color: '#93c5fd' }}>2. Standard-System:</strong> <span style={{ color: '#d8b4fe' }}>Schnell umsetzbar</span> ➔ <strong style={{ color: '#86efac' }}>Individuelles Ergebnis für den Betrieb!</strong>
                          </div>
                          <div style={{ padding: '0.45rem 0.6rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '0.4rem', borderLeft: '3px solid #10b981' }}>
                            <strong style={{ color: '#93c5fd' }}>3. Handwerks-Spezialisierung:</strong> <span style={{ color: '#d8b4fe' }}>Kein Fachchinesisch</span> ➔ <strong style={{ color: '#86efac' }}>Vertrauen ab Minute 1!</strong>
                          </div>
                          <div style={{ padding: '0.45rem 0.6rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '0.4rem', borderLeft: '3px solid #f59e0b' }}>
                            <strong style={{ color: '#93c5fd' }}>4. GoBD/DSGVO & 5. DATEV:</strong> <span style={{ color: '#d8b4fe' }}>Ohne StB-Rückfragen</span> ➔ <strong style={{ color: '#86efac' }}>Kostenersparnis & schneller Jahresabschluss!</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reaktion auf den Lösungs-Pitch erfassen */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'white', marginBottom: '0.4rem' }}>
                        🎯 Wie reagiert der Inhaber auf diesen Lösungs-Pitch?
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '0.5rem' }}>
                        {[
                          { val: 'Sehr interessiert', icon: '🔥', color: '#10b981' },
                          { val: 'Verhaltener Zuspruch', icon: '👍', color: '#f59e0b' },
                          { val: 'Kein Bedarf', icon: '🛑', color: '#ef4444' }
                        ].map((opt) => {
                          const active = activeContact.pitchReaction === opt.val;
                          return (
                            <button
                              key={opt.val}
                              type="button"
                              onClick={() => updateActiveContact({ pitchReaction: opt.val })}
                              style={{
                                padding: '0.65rem',
                                borderRadius: '0.5rem',
                                border: active ? `2px solid ${opt.color}` : '1px solid var(--border-color)',
                                background: active ? `${opt.color}22` : 'rgba(255,255,255,0.03)',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.82rem',
                                cursor: 'pointer'
                              }}
                            >
                              {opt.icon} {opt.val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== PHASE 5: KRITISCHES FEEDBACK, EINWÄNDE & PREISTEST ==================== */}
                {activePhase === 5 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: '0.65rem', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase' }}>
                        ⏱️ [13:30 - 17:30] Phase 5: Kritisches Feedback, Einwände & Audit-Preistest
                      </div>

                      {/* 1. Realitäts-Check */}
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fde68a', marginBottom: '0.25rem' }}>
                          1. Realitäts-Check:
                        </div>
                        <div style={{ fontSize: '0.86rem', color: 'white', fontStyle: 'italic', marginBottom: '0.4rem' }}>
                          „Klingt so ein Ansatz nach einer echten Entlastung für Ihren Betrieb, oder sagen Sie: ‚Das brauchen wir nicht, wir machen das lieber auf dem gewohnten Weg‘?“
                        </div>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Antwort zum Realitäts-Check..."
                          value={activeContact.realityCheckNote || ''}
                          onChange={(e) => updateActiveContact({ realityCheckNote: e.target.value })}
                        />
                      </div>

                      {/* 2. Größte Befürchtung aufdecken */}
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fde68a', marginBottom: '0.25rem' }}>
                          2. Größte Befürchtung / Einwand aufdecken:
                        </div>
                        <div style={{ fontSize: '0.86rem', color: 'white', fontStyle: 'italic', marginBottom: '0.4rem' }}>
                          „Was wäre Ihre größte Skepsis gegenüber so einer Zusammenarbeit? Dass die Monteure streiken? Dass die Technik ausfällt? Oder dass es am Ende nur teuer wird und nichts bringt?“
                        </div>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                          {[
                            'Monteure streiken',
                            'Technik fällt aus / zu kompliziert',
                            'Wird nur teuer & bringt nichts',
                            'Keine Zeit für Umstellung',
                            'Datenschutz / Steuerberater'
                          ].map((tag) => {
                            const isTagged = (activeContact.objectionTags || []).includes(tag);
                            return (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => toggleObjectionTag(tag)}
                                style={{
                                  fontSize: '0.72rem',
                                  padding: '0.25rem 0.55rem',
                                  borderRadius: '0.35rem',
                                  border: isTagged ? '1px solid #f59e0b' : '1px solid var(--border-color)',
                                  background: isTagged ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255,255,255,0.04)',
                                  color: isTagged ? '#fde68a' : 'var(--text-secondary)',
                                  cursor: 'pointer'
                                }}
                              >
                                {isTagged ? '✓ ' : '+ '}{tag}
                              </button>
                            );
                          })}
                        </div>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Wörtliches Zitat zur größten Befürchtung..."
                          value={activeContact.biggestObjectionQuote || ''}
                          onChange={(e) => updateActiveContact({ biggestObjectionQuote: e.target.value })}
                        />
                      </div>

                      {/* 3. Preistest für das Audit */}
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fde68a', marginBottom: '0.25rem' }}>
                          3. Preistest für das Diagnose-Audit (300 bis 500 € Festpreis):
                        </div>
                        <div style={{ fontSize: '0.86rem', color: 'white', fontStyle: 'italic', marginBottom: '0.25rem' }}>
                          „Angenommen, jemand analysiert diesen Engpass vor Ort im Detail und liefert Ihnen einen glasklaren Fahrplan inklusive Zeitersparnis: Wäre ein Betrieb wie Ihrer bereit, für so ein Diagnose-Audit <strong>300 bis 500 Euro Festpreis</strong> zu investieren – oder wo liegt im Handwerk die Schmerzgrenze?“
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                          <strong>Nachhaken:</strong> „Ab welchem Betrag würden Sie sofort sagen: ‚Das ist mir ein reines Audit auf keinen Fall wert‘?“
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          {[
                            { label: '500 € problemlos', color: '#10b981' },
                            { label: '200–300 € Schmerzgrenze', color: '#f59e0b' },
                            { label: 'Nur kostenfrei', color: '#ef4444' }
                          ].map((pOpt) => {
                            const active = activeContact.auditPriceWillingness === pOpt.label;
                            return (
                              <button
                                key={pOpt.label}
                                type="button"
                                onClick={() => updateActiveContact({ auditPriceWillingness: pOpt.label })}
                                style={{
                                  padding: '0.55rem',
                                  borderRadius: '0.45rem',
                                  border: active ? `2px solid ${pOpt.color}` : '1px solid var(--border-color)',
                                  background: active ? `${pOpt.color}22` : 'rgba(255,255,255,0.03)',
                                  color: 'white',
                                  fontWeight: 700,
                                  fontSize: '0.78rem',
                                  cursor: 'pointer'
                                }}
                              >
                                {pOpt.label}
                              </button>
                            );
                          })}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Genannte Schmerzgrenze in €:</span>
                          <input
                            type="text"
                            className="input-field"
                            placeholder="z.B. 350 €"
                            value={activeContact.auditPriceLimitEuro || ''}
                            onChange={(e) => updateActiveContact({ auditPriceLimitEuro: e.target.value })}
                            style={{ width: '140px', fontSize: '0.8rem' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== PHASE 6: VERBINDLICHER ABSCHLUSS & MULTIPLIKATOR ==================== */}
                {activePhase === 6 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '0.65rem', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>
                        ⏱️ [17:30 - 20:00] Phase 6: Verbindlicher Abschluss & Brücke zum Go-to-Market
                      </div>

                      {/* 1. Dankbarkeit */}
                      <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.25)', borderRadius: '0.4rem', borderLeft: '3px solid #10b981', fontSize: '0.88rem', color: 'white' }}>
                        <strong>1. Dankbarkeit:</strong><br />
                        „Herr/Frau <strong style={{ color: '#34d399' }}>{getLastName(activeContact)}</strong>, vielen Dank. Das waren genau die praxisnahen Einblicke, die mir unglaublich helfen.“
                      </div>

                      {/* 2. Follow-up vereinbaren (Warm-Lead sichern) */}
                      <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.25)', borderRadius: '0.4rem', borderLeft: '3px solid #06b6d4' }}>
                        <div style={{ fontSize: '0.88rem', color: 'white', marginBottom: '0.5rem' }}>
                          <strong>2. Follow-up vereinbaren (Warm-Lead sichern):</strong><br />
                          „Wenn ich in ein paar Monaten mein Gewerbe angemeldet habe und die ersten Lösungen für die Region startklar sind: <strong>Darf ich mich dann ganz kurz noch einmal bei Ihnen melden</strong>, um Ihnen unverbindlich zu zeigen, was aus Ihrem Feedback geworden ist?“
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={() => updateActiveContact({ followUpAllowed: 'Ja, nach Gründung melden', status: 'Warm-Lead (Wiedervorlage)' })}
                            style={{
                              padding: '0.45rem 0.85rem',
                              borderRadius: '0.45rem',
                              border: activeContact.followUpAllowed === 'Ja, nach Gründung melden' ? '2px solid #10b981' : '1px solid var(--border-color)',
                              background: activeContact.followUpAllowed === 'Ja, nach Gründung melden' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.04)',
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            🔥 Ja, nach Gründung melden (Warm-Lead!)
                          </button>
                          <button
                            type="button"
                            onClick={() => updateActiveContact({ followUpAllowed: 'Nein, kein Interesse', status: 'Interview abgeschlossen' })}
                            style={{
                              padding: '0.45rem 0.85rem',
                              borderRadius: '0.45rem',
                              border: activeContact.followUpAllowed === 'Nein, kein Interesse' ? '2px solid #ef4444' : '1px solid var(--border-color)',
                              background: activeContact.followUpAllowed === 'Nein, kein Interesse' ? 'rgba(239, 68, 68, 0.22)' : 'rgba(255,255,255,0.04)',
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            ❌ Nein, kein Interesse
                          </button>
                        </div>
                      </div>

                      {/* 3. Multiplikator / Empfehlung */}
                      <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(0,0,0,0.25)', borderRadius: '0.4rem', borderLeft: '3px solid #f59e0b' }}>
                        <div style={{ fontSize: '0.88rem', color: 'white', marginBottom: '0.5rem' }}>
                          <strong>3. Multiplikator (Empfehlungs-Frage):</strong><br />
                          „Kennen Sie einen befreundeten Kollegenbetrieb hier in der Region, der mit ähnlichen Büro-Hürden kämpft und dem ich 2–3 dieser Fragen stellen könnte?“
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr auto', gap: '0.5rem', alignItems: 'center' }}>
                          <input
                            type="text"
                            className="input-field"
                            placeholder="Empfohlener Betrieb (Name/Firma)"
                            value={activeContact.referralCompany || ''}
                            onChange={(e) => updateActiveContact({ referralCompany: e.target.value })}
                          />
                          <input
                            type="text"
                            className="input-field"
                            placeholder="Ansprechpartner / Telefon / Ort"
                            value={activeContact.referralContact || ''}
                            onChange={(e) => updateActiveContact({ referralContact: e.target.value })}
                          />
                          <button
                            type="button"
                            onClick={handleAddReferralAsContact}
                            className="btn btn-primary"
                            style={{ fontSize: '0.75rem', padding: '0.45rem 0.75rem', background: '#d97706', whiteSpace: 'nowrap' }}
                          >
                            <UserPlus size={14} style={{ marginRight: '0.25rem', display: 'inline' }} />
                            Als neuen Kontakt anlegen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== PHASE 7: STRUKTURIERTER CRM-PROTOKOLLBOGEN ==================== */}
                {activePhase === 7 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.65rem', padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1rem', color: 'white' }}>
                          📋 Strukturierter Protokollbogen: {activeContact.company}
                        </h3>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(buildProtocolMarkdown(activeContact));
                              if (showToast) showToast('📋 Protokollbogen als Markdown in die Zwischenablage kopiert!');
                            }}
                            className="btn btn-secondary"
                            style={{ fontSize: '0.74rem', padding: '0.35rem 0.65rem' }}
                          >
                            <ClipboardCopy size={13} style={{ marginRight: '0.25rem', display: 'inline' }} /> Markdown kopieren
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveProtocolToDocs}
                            className="btn btn-secondary"
                            style={{ fontSize: '0.74rem', padding: '0.35rem 0.65rem', border: '1px solid #06b6d4', color: '#22d3ee' }}
                          >
                            <FileText size={13} style={{ marginRight: '0.25rem', display: 'inline' }} /> Im Wissens-Hub speichern
                          </button>
                          <button
                            type="button"
                            onClick={handlePromoteToMainCrm}
                            className="btn btn-primary"
                            style={{ fontSize: '0.74rem', padding: '0.35rem 0.65rem', background: '#059669' }}
                          >
                            🚀 In Haupt-CRM übernehmen
                          </button>
                        </div>
                      </div>

                      {/* Übersichtliche Protokoll-Tabelle genau nach Leitfaden */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Betriebsname & Inhaber:</strong>
                          <span style={{ color: 'white' }}>{activeContact.company} — {activeContact.ownerName || 'k.A.'} ({activeContact.phone || 'k.A.'})</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.015)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Gewerk / Branche:</strong>
                          <span style={{ color: '#c4b5fd', fontWeight: 700 }}>{activeContact.industry || 'k.A.'}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Mitarbeiter:</strong>
                          <span style={{ color: 'white' }}>Gesellen/Feld: {activeContact.employeesField || '-'} | Büro: {activeContact.employeesOffice || '-'} ({activeContact.officePerson || '-'})</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.015)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Primärer Engpass (Pfade):</strong>
                          <span style={{ color: '#34d399', fontWeight: 700 }}>
                            {(activeContact.selectedPaths || []).map((pid) => DISCOVERY_PATHS.find((d) => d.id === pid)?.shortTitle || pid).join(' + ') || 'Noch kein Pfad gewählt'}
                          </span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Größter Zeitfresser (Zitat):</strong>
                          <span style={{ color: '#67e8f9', fontStyle: 'italic' }}>„{activeContact.biggestTimeWasterQuote || '-'}“</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.015)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Büro-Wochenende?</strong>
                          <span style={{ color: 'white' }}>
                            {activeContact.weekendOffice === 'yes'
                              ? `Ja, regelmäßig (ca. ${activeContact.weekendHours || '?'} Std./Woche)`
                              : activeContact.weekendOffice === 'no'
                              ? 'Nein, unter der Woche erledigt'
                              : 'k.A.'}
                          </span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Bestehende Software:</strong>
                          <span style={{ color: 'white' }}>Büro/Buchhaltung: {activeContact.softwareOffice || '-'} | Kommunikation: {activeContact.softwareComm || '-'}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.015)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>🪄 Zauberstab-Wunsch:</strong>
                          <span style={{ color: '#fde68a', fontStyle: 'italic' }}>„{activeContact.magicWandAnswer || '-'}“</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Reaktion auf Lösungs-Pitch:</strong>
                          <span style={{ color: 'white', fontWeight: 700 }}>{activeContact.pitchReaction || '-'}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.015)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Größter Einwand / Befürchtung:</strong>
                          <span style={{ color: '#fca5a5', fontStyle: 'italic' }}>
                            „{activeContact.biggestObjectionQuote || '-'}“ {(activeContact.objectionTags || []).length > 0 ? `[${activeContact.objectionTags.join(', ')}]` : ''}
                          </span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Zahlungsbereitschaft (Audit):</strong>
                          <span style={{ color: '#34d399', fontWeight: 700 }}>
                            {activeContact.auditPriceWillingness || '-'} {activeContact.auditPriceLimitEuro ? `(Schmerzgrenze: ${activeContact.auditPriceLimitEuro} €)` : ''}
                          </span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.015)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Wiedervorlage erlaubt?</strong>
                          <span style={{ color: 'white', fontWeight: 700 }}>{activeContact.followUpAllowed || '-'}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.4rem' }}>
                          <strong style={{ color: 'var(--text-secondary)' }}>Empfehlungs-Kontakt:</strong>
                          <span style={{ color: 'white' }}>{activeContact.referralCompany || '-'} {activeContact.referralContact ? `(${activeContact.referralContact})` : ''}</span>
                        </div>
                      </div>

                      <div style={{ marginTop: '0.85rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                          Allgemeine Gesprächsnotizen & Beobachtungen:
                        </label>
                        <textarea
                          className="input-field"
                          style={{ height: '75px', fontSize: '0.8rem' }}
                          placeholder="Weitere Notizen zum Gespräch..."
                          value={activeContact.generalNotes || ''}
                          onChange={(e) => updateActiveContact({ generalNotes: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== UNTERE NAVIGATION (VOR / ZURÜCK / SPEICHERN) ==================== */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-color)',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}
                >
                  <button
                    type="button"
                    disabled={activePhase <= 1}
                    onClick={() => setActivePhase((p) => Math.max(1, p - 1))}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <ChevronLeft size={15} /> Vorherige Phase
                  </button>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    💾 Alle Eingaben werden automatisch lokal gespeichert
                  </div>

                  {activePhase < 7 ? (
                    <button
                      type="button"
                      onClick={() => setActivePhase((p) => Math.min(7, p + 1))}
                      className="btn btn-primary"
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.45rem 1rem',
                        background: 'linear-gradient(135deg, #059669, #10b981)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      Weiter zu {activePhase === 6 ? '📋 Protokollbogen' : `Phase ${activePhase + 1}`} <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (activeContact.status === 'Offen' || activeContact.status === 'Termin vereinbart') {
                          updateActiveContact({ status: 'Interview abgeschlossen' });
                        }
                        if (showToast) showToast(`✅ Interview-Protokoll für "${activeContact.company}" vollständig gesichert!`);
                      }}
                      className="btn btn-primary"
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.45rem 1rem',
                        background: 'linear-gradient(135deg, #059669, #10b981)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <CheckCircle size={15} /> Interview als abgeschlossen markieren
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎙️</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '0.4rem' }}>
                  Kein Betrieb ausgewählt
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '340px', margin: '0 auto' }}>
                  Wähle links einen Betrieb aus oder lade deine neuen Kontakte hoch, um den interaktiven 15–20-Minuten-Validierungsleitfaden zu starten.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CustomerDiscoveryView;

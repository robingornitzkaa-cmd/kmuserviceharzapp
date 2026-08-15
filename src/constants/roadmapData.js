/**
 * Gründungs-Roadmap & Meilenstein-Matrix für KMU Service Harz
 * Strukturierte 4-Phasen-Matrix mit Kriterien, Deadlines, XP-Belohnungen und Logbuch-Verknüpfungen.
 */

export const INITIAL_ROADMAP_PHASES = [
  {
    id: 'phase1',
    title: 'Phase 1: Fundament, Behörden & Finanzen',
    subtitle: 'Rechtssicherheit, Förderungen & Banken-Setup',
    icon: 'Building',
    color: '#06b6d4', // Cyan
    targetQuarter: 'Q1 / Monat 1-2',
    description: 'Schaffung des soliden rechtlichen und finanziellen Fundaments für den Markteintritt im Harz.',
    milestones: [
      {
        id: 'm_1_1',
        title: 'Tragfähigkeitsbescheinigung sichern',
        description: 'Ausstellung durch fachkundige Stelle (z. B. IHK / Gründungsberater) für den Businessplan.',
        status: 'in_progress', // 'pending' | 'in_progress' | 'blocked' | 'completed'
        dueDate: '2026-09-15',
        xpReward: 150,
        coinsReward: 50,
        logbuchSection: 'Status Tragfähigkeitsbescheinigung',
        criteria: ['Businessplan finalisiert', 'Finanzplan plausibilisiert', 'Fachkundige Stellungnahme eingereicht']
      },
      {
        id: 'm_1_2',
        title: 'Beantragung Einstiegsgeld (Jobcenter)',
        description: 'Vollständige Antragsunterlagen zur Existenzgründungsförderung einreichen.',
        status: 'in_progress',
        dueDate: '2026-09-30',
        xpReward: 150,
        coinsReward: 50,
        logbuchSection: 'Status Beantragung Einstiegsgeld',
        criteria: ['Antrag ausgefüllt', 'Stellungnahme beigefügt', 'Persönlicher Beratungstermin absolviert']
      },
      {
        id: 'm_1_3',
        title: 'B2B-Geschäftskonto eröffnen',
        description: 'Eröffnung des Unternehmenskontos (Finom oder Qonto) mit Schnittstelle zur Buchhaltung.',
        status: 'pending',
        dueDate: '2026-10-15',
        xpReward: 100,
        coinsReward: 30,
        logbuchSection: 'Gewähltes B2B-Geschäftskonto',
        criteria: ['Vergleich abgeschlossen', 'Video-Ident durchgeführt', 'Konto aktiv mit IBAN']
      },
      {
        id: 'm_1_4',
        title: 'Gewerbeanmeldung & Rechtsform',
        description: 'Offizielle Anmeldung des Gewerbes beim Gewerbeamt / Notartermin für UG.',
        status: 'pending',
        dueDate: '2026-10-31',
        xpReward: 200,
        coinsReward: 80,
        logbuchSection: 'Geplantes Gründungsdatum (Gewerbe-Anmeldung)',
        criteria: ['Gewerbeschein erhalten', 'Finanzamt-Fragebogen ausgefüllt', 'Steuernummer zugewiesen']
      }
    ]
  },
  {
    id: 'phase2',
    title: 'Phase 2: Pilot-Kunden & Harz-Netzwerk',
    subtitle: 'Akquise, Testkunden & Social Proof',
    icon: 'Users',
    color: '#8b5cf6', // Purple
    targetQuarter: 'Q2 / Monat 2-4',
    description: 'Validierung der Dienstleistungen an echten Harzer KMU und Generierung erster Referenzen.',
    milestones: [
      {
        id: 'm_2_1',
        title: '3 Harzer Pilot-Betriebe akquirieren',
        description: 'Dachdeckerei, Reinigungsservice oder Handwerksbetriebe für Pilot-Workshops gewinnen.',
        status: 'in_progress',
        dueDate: '2026-11-15',
        xpReward: 250,
        coinsReward: 100,
        logbuchSection: 'Pilot-Kunden Akquise',
        criteria: ['10+ Kaltakquise-Gespräche', '3 Vor-Ort-Termine durchgeführt', '3 Pilot-Vereinbarungen unterzeichnet']
      },
      {
        id: 'm_2_2',
        title: 'Onboarding-Playbook & ROI-Kalkulation im Live-Einsatz',
        description: 'Praxis-Validierung des 10-Phasen-Gesprächsleitfadens bei Kunden.',
        status: 'completed',
        dueDate: '2026-10-01',
        xpReward: 150,
        coinsReward: 50,
        logbuchSection: 'Gesprächsleitfaden Praxis-Test',
        criteria: ['Live-Berechnung Stundenersparnis', 'Automatisches PDF-Angebot erstellt', 'Kundenfeedback dokumentiert']
      },
      {
        id: 'm_2_3',
        title: 'Harzer Case Studies & Video-Testimonials',
        description: '2 detaillierte Erfolgsgeschichten (Vorher/Nachher) für Webseite und Pitch-Deck erstellen.',
        status: 'pending',
        dueDate: '2026-12-01',
        xpReward: 200,
        coinsReward: 75,
        logbuchSection: 'Fallstudien & Referenzen',
        criteria: ['Messbare Zeiteinsparung belegt', 'Freigabe vom Pilotkunden erteilt', 'In WebsiteView eingepflegt']
      }
    ]
  },
  {
    id: 'phase3',
    title: 'Phase 3: Digitaler Produkt- & Automations-Stack',
    subtitle: 'Make.com, E-Rechnung & WhatsApp-Gateways',
    icon: 'Zap',
    color: '#10b981', // Emerald Green
    targetQuarter: 'Q3 / Monat 4-6',
    description: 'Standardisierung der technischen Implementierungen für schlüsselfertige Übergaben.',
    milestones: [
      {
        id: 'm_3_1',
        title: 'Make.com & WhatsApp Gateway Produktisierung',
        description: 'Standardisiertes Blueprint-Paket für automatische Kundenanfragen via WhatsApp.',
        status: 'in_progress',
        dueDate: '2026-12-15',
        xpReward: 200,
        coinsReward: 60,
        logbuchSection: 'WhatsApp Automatisierung',
        criteria: ['Webhook-Routing stabil', 'Fehlerbehandlungs-Szenario aktiv', 'DSGVO-Opt-In integriert']
      },
      {
        id: 'm_3_2',
        title: 'E-Rechnung (ZUGFeRD) Integrations-Template',
        description: 'Vollständiger automatisierter Flow von Leistungserfassung bis zum ZUGFeRD-PDF.',
        status: 'completed',
        dueDate: '2026-11-01',
        xpReward: 150,
        coinsReward: 50,
        logbuchSection: 'E-Rechnungs Workflow',
        criteria: ['XML-Validierung fehlerfrei', 'GoBD-konforme Archivierung', '1-Klick Rechnungs-Export']
      },
      {
        id: 'm_3_3',
        title: 'Kunden-Portal (White-Label) Rollout',
        description: 'Mandantenfähiges Portal mit Support-Tickets und ROI-Monitoring für Retainer-Kunden.',
        status: 'completed',
        dueDate: '2026-11-20',
        xpReward: 200,
        coinsReward: 70,
        logbuchSection: 'Kundenportal Rollout',
        criteria: ['Kundenansicht isoliert', 'Passwort-Schutz aktiv', 'Live-Projektstatus einsehbar']
      }
    ]
  },
  {
    id: 'phase4',
    title: 'Phase 4: Skalierung & KMU Service Harz Marktreife',
    subtitle: 'Monats-Retainer, Multiplikatoren & Wachstum',
    icon: 'TrendingUp',
    color: '#f59e0b', // Amber
    targetQuarter: 'Q4 / Ab Monat 6',
    description: 'Etablierung als führender Digitalisierungs- und Automations-Partner im Landkreis Harz.',
    milestones: [
      {
        id: 'm_4_1',
        title: '5 feste Monats-Retainer Kunden (MRR > 2.500 €)',
        description: 'Wiederkehrende Wartungs- und Automations-Verträge zur nachhaltigen Grundsicherung.',
        status: 'pending',
        dueDate: '2027-02-28',
        xpReward: 350,
        coinsReward: 150,
        logbuchSection: 'MRR & Retainer Verträge',
        criteria: ['5 Serviceverträge aktiv', 'Regelmäßige monatliche Reviews', 'Stabiler monatlicher Cashflow']
      },
      {
        id: 'm_4_2',
        title: 'Kooperation mit WiReGo & Wirtschaftsförderung',
        description: 'Offizielle Listung als Digitalisierungsberater für regionale Förderprogramme.',
        status: 'pending',
        dueDate: '2027-03-31',
        xpReward: 300,
        coinsReward: 120,
        logbuchSection: 'Wirtschaftsförderung Kooperation',
        criteria: ['Vorstellungstermin absolviert', 'Förderfähige Leistungspakete definiert', 'Empfehlungs-Partnerschaft']
      },
      {
        id: 'm_4_3',
        title: 'Automatisierte Neukunden-Maschine',
        description: 'Systematisierter Trichter aus Webseiten-Quiz, Google My Business und Content-Plan.',
        status: 'pending',
        dueDate: '2027-04-30',
        xpReward: 400,
        coinsReward: 200,
        logbuchSection: 'Skalierung Funnel',
        criteria: ['WebsiteView live geschaltet', 'Google Business 5-Sterne Bewertungen', 'Automatischer Erstgesprächs-Kalender']
      }
    ]
  }
];

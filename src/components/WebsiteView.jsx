import React, { useState, useRef } from 'react';
import { WEBSITE_CONTENT } from '../constants/websiteContent';
import { 
  Globe, 
  Sun, 
  Moon, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Zap, 
  ChevronRight,
  ChevronDown,
  FileText,
  UserCheck,
  Send,
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
  Check,
  HelpCircle,
  BarChart3,
  XCircle,
  CheckCircle,
  Flame,
  Award
} from 'lucide-react';

export const WebsiteView = () => {
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState('light');
  // Subpage state: 'home' | 'services' | 'roi' | 'about' | 'contact' | 'impressum' | 'privacy'
  const [activePage, setActivePage] = useState('home');
  const mainContainerRef = useRef(null);

  // Smooth page transition helper that resets scroll position
  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTop = 0;
    }
  };

  // ROI Calculator State
  const [roiProcesses, setRoiProcesses] = useState(50);
  const [roiMinutes, setRoiMinutes] = useState(25);
  const [roiHourlyRate, setRoiHourlyRate] = useState(45);

  // New Feature 1: Before/After Toggle State ('before' | 'after')
  const [comparisonMode, setComparisonMode] = useState('after');

  // New Feature 2: Quick Audit Quiz State
  const [auditStep, setAuditStep] = useState(0);
  const [auditAnswers, setAuditAnswers] = useState({});
  const [auditFinished, setAuditFinished] = useState(false);

  // New Feature 3: FAQ Accordion State (stores active index or null)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    topic: WEBSITE_CONTENT.contact.topicOptions[0],
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // ROI Calculations
  const monthlyHoursSpent = Math.round((roiProcesses * roiMinutes * 4) / 60);
  const monthlyHoursSaved = Math.round(monthlyHoursSpent * 0.70); // 70% average automation efficiency
  const yearlyEuroSaved = Math.round(monthlyHoursSaved * 12 * roiHourlyRate);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  // Quick Audit Quiz Questions
  const auditQuestions = [
    {
      id: "inquiries",
      question: "Wie verarbeiten Sie aktuell neue Kundenanfragen?",
      options: [
        { label: "Manuell auf Zetteln / E-Mail abtippen", score: 30 },
        { label: "Teils digital, teils Papier", score: 60 },
        { label: "Automatisch in CRM / Datenbank", score: 95 }
      ]
    },
    {
      id: "website",
      question: "Wie bewerten Sie Ihren aktuellen Webauftritt?",
      options: [
        { label: "Veraltet / kaum Auffindbar im Harz", score: 25 },
        { label: "Solide Visitenkarte, aber keine Anfragen", score: 55 },
        { label: "Modern, schnell & bringt regelmäßig Kunden", score: 90 }
      ]
    },
    {
      id: "invoicing",
      question: "Wie läuft die Erstellung von Angeboten & E-Rechnungen?",
      options: [
        { label: "Manuell in Word/Excel (zeitintensiv)", score: 35 },
        { label: "Bürosoftware ohne Automatisierung", score: 65 },
        { label: "Voll digital mit automatischer Belegkette", score: 95 }
      ]
    }
  ];

  const handleAuditSelect = (questionId, score) => {
    const nextAnswers = { ...auditAnswers, [questionId]: score };
    setAuditAnswers(nextAnswers);
    if (auditStep < auditQuestions.length - 1) {
      setAuditStep(auditStep + 1);
    } else {
      setAuditFinished(true);
    }
  };

  const calculateAuditScore = () => {
    const values = Object.values(auditAnswers);
    if (values.length === 0) return 40;
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    return avg;
  };

  // FAQ Items
  const faqItems = [
    {
      q: "Brauche ich oder mein Team dafür tiefere IT-Kenntnisse?",
      a: "Nein, absolut gar nicht! Wir entwickeln Lösungen so, dass sie für Sie und Ihre Mitarbeiter so einfach zu bedienen sind wie WhatsApp. Wir kümmern uns um die gesamte Technik im Hintergrund."
    },
    {
      q: "Ist das Ganze wirklich 100 % DSGVO-konform?",
      a: "Ja, zu 100 %. Wir verarbeiten alle Daten ausschließlich auf deutschen Servern, nutzen lokal gehostete Schriftarten und verzichten auf ungewollte Tracking-Pixel. Sie erhalten ein rechtssicheres Impressum und Datenschutzerklärung."
    },
    {
      q: "Wie schnell amortisiert sich die Investition für meinen Betrieb?",
      a: "Durchschnittlich sparte ein Handwerks- oder Dienstleistungsbetrieb mit unseren Vorlagen & Abläufen bereits im ersten Monat zwischen 10 und 35 Arbeitsstunden im Büro ein. Die Lösung finanziert sich somit meist schon in wenigen Wochen von selbst."
    },
    {
      q: "Wie läuft die Zusammenarbeit konkret ab?",
      a: "1. Kostenloses 15-Minuten-Erstgespräch ➔ 2. Wir analysieren Ihre Zeitfresser ➔ 3. Wir setzen die Lösung schlüsselfertig für Sie um ➔ 4. Sie sparen ab Tag 1 Arbeitszeit."
    }
  ];

  const isLight = theme === 'light';

  return (
    <div className={`website-wrapper ${isLight ? 'mode-light' : 'mode-dark'}`} ref={mainContainerRef}>
      
      {/* 🌟 PRESENTATION CONTROL BAR FOR COACH MEETING */}
      <div className="coach-bar">
        <div className="coach-bar-title">
          <Sparkles size={16} className="sparkle-anim" />
          <span><strong>Präsentations-Modus (Gründungscoach):</strong> Design-Richtung mit 1 Klick umschalten</span>
        </div>
        <div className="coach-bar-actions">
          <button 
            type="button"
            className={`mode-btn ${isLight ? 'active' : ''}`}
            onClick={() => setTheme('light')}
          >
            <Sun size={15} /> ☀️ Helles Business-Design
          </button>
          <button 
            type="button"
            className={`mode-btn ${!isLight ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <Moon size={15} /> 🌙 Dunkles Tech-Design
          </button>
        </div>
      </div>

      {/* 🌐 PREMIUM HEADER & NAVBAR */}
      <header className="web-header">
        <div className="web-header-container">
          <div className="brand-badge-wrapper" onClick={() => navigateTo('home')}>
            <div className="brand-logo-icon">
              <Globe size={22} />
            </div>
            <div className="brand-titles">
              <span className="brand-name">{WEBSITE_CONTENT.brand.name}</span>
              <span className="brand-tagline">{WEBSITE_CONTENT.brand.claim}</span>
            </div>
          </div>

          <nav className="web-nav">
            {WEBSITE_CONTENT.nav.map(item => (
              <button
                key={item.id}
                type="button"
                className={`web-nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => navigateTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button 
            className="header-cta-btn"
            onClick={() => navigateTo('contact')}
          >
            Erstgespräch anfragen <ArrowRight size={15} />
          </button>
        </div>
      </header>

      {/* 📍 MAIN CONTENT PAGES */}
      <main className="web-main">

        {/* ==================== PAGE: HOME (VOLLSTÄNDIG ÜBERARBEITET!) ==================== */}
        {activePage === 'home' && (
          <div className="page-fade-in">
            
            {/* HERO SECTION */}
            <section className="hero-card">
              <div className="hero-badge-pill">
                <MapPin size={14} /> {WEBSITE_CONTENT.hero.badge}
              </div>
              <h1 className="hero-headline">
                Mehr Zeit fürs Kerngeschäft: <br />
                <span className="text-gradient">Digitale Prozesse & moderne Webauftritte</span>
              </h1>
              <p className="hero-subtext">
                {WEBSITE_CONTENT.hero.subheadline}
              </p>
              <div className="hero-btn-row">
                <button 
                  className="p-btn p-btn-primary p-btn-lg"
                  onClick={() => navigateTo('contact')}
                >
                  Kostenloses Erstgespräch buchen <ArrowRight size={18} />
                </button>
                <button 
                  className="p-btn p-btn-outline p-btn-lg"
                  onClick={() => navigateTo('roi')}
                >
                  <Calculator size={18} /> Einsparpotenzial berechnen
                </button>
              </div>

              <div className="hero-trust-bar">
                {WEBSITE_CONTENT.hero.trustBadges.map((badge, idx) => (
                  <div key={idx} className="trust-pill">
                    {badge}
                  </div>
                ))}
              </div>
            </section>

            {/* PAIN POINTS SECTION */}
            <section className="sec-block">
              <div className="sec-header sec-header-center">
                <span className="sec-badge">SCHMERZPUNKTE LÖSEN</span>
                <h2>Kennen Sie diese Zeitfresser im Betrieb?</h2>
                <p>Warum manuelle Büroarbeit und veraltete Auftritte wertvollen Umsatz kosten.</p>
              </div>
              <div className="grid-responsive-3">
                {WEBSITE_CONTENT.painPoints.items.map((item, idx) => (
                  <div key={idx} className="p-card card-hover-effect">
                    <div className="card-emoji-box">{item.icon}</div>
                    <h3 className="card-h3">{item.problem}</h3>
                    <p className="card-p">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* NEU FEATURE 1: INTERAKTIVER VORHER-NACHHER COMPARISON TOGGLE */}
            <section className="sec-block highlight-surface">
              <div className="sec-header sec-header-center">
                <span className="sec-badge">⚡ VORHER VS. NACHHER</span>
                <h2>Der direkte Vergleich im Betriebsalltag</h2>
                <p>Sehen Sie, wie sich die Arbeitsweise in Handwerk & Gewerbe durch einfache Automatisierung verändert.</p>
                
                <div className="toggle-switch-container">
                  <button 
                    className={`toggle-tab ${comparisonMode === 'before' ? 'active-before' : ''}`}
                    onClick={() => setComparisonMode('before')}
                  >
                    🛑 Vorher (Manuelle Zettelwirtschaft)
                  </button>
                  <button 
                    className={`toggle-tab ${comparisonMode === 'after' ? 'active-after' : ''}`}
                    onClick={() => setComparisonMode('after')}
                  >
                    ⚡ Nachher (Mit KMU Service Harz)
                  </button>
                </div>
              </div>

              <div className="comparison-card-wrapper">
                {comparisonMode === 'before' ? (
                  <div className="comp-card mode-before-card fade-in">
                    <div className="comp-badge badge-red">🛑 Ohne Automatisierung (Traditionell)</div>
                    <ul className="comp-list">
                      <li><XCircle size={18} className="icon-red" /> <strong>Zettelchaos & Doppelarbeiten:</strong> Anfragen werden handschriftlich notiert und später aufwendig abgetippt.</li>
                      <li><XCircle size={18} className="icon-red" /> <strong>Lange Antwortzeiten:</strong> Kunden warten 24–48 Stunden auf Angebote oder Rückmeldungen.</li>
                      <li><XCircle size={18} className="icon-red" /> <strong>Fehlende Erreichbarkeit:</strong> Veraltete Webseite liefert keine neuen Kundenanfragen.</li>
                      <li><XCircle size={18} className="icon-red" /> <strong>Hohe Bürozeiten:</strong> Der Inhaber arbeitet abends noch 2-3 Stunden Angebote aus.</li>
                    </ul>
                  </div>
                ) : (
                  <div className="comp-card mode-after-card fade-in">
                    <div className="comp-badge badge-green">⚡ Mit KMU Service Harz (Modern)</div>
                    <ul className="comp-list">
                      <li><CheckCircle2 size={18} className="icon-green" /> <strong>Automatische Datenerfassung:</strong> Anfragen landen direkt geordnet in Ihrem System & CRM.</li>
                      <li><CheckCircle2 size={18} className="icon-green" /> <strong>Sofortige Rückmeldung:</strong> Kundenseitig wird in Sekunden ein automatisches Bestätigungsschreiben generiert.</li>
                      <li><CheckCircle2 size={18} className="icon-green" /> <strong>Moderne Neukundengewinnung:</strong> Schnelle, DSGVO-konforme Webseite zieht passende Aufträge an.</li>
                      <li><CheckCircle2 size={18} className="icon-green" /> <strong>Freie Abende & Mehr Gewinn:</strong> Über 70 % weniger Routineaufwand bei Angeboten & Belegen.</li>
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* SERVICES TEASER SECTION (VOLLSTÄNDIG ÜBERARBEITET!) */}
            <section className="sec-block">
              <div className="sec-header sec-header-center">
                <span className="sec-badge">UNSER ANGEBOT</span>
                <h2>Unsere 3 digitalen Kernleistungen</h2>
                <p>Pragmatische IT- & Prozesslösungen – speziell entwickelt für Handwerk & Mittelstand im Harz.</p>
              </div>

              <div className="grid-responsive-3">
                {WEBSITE_CONTENT.services.map((svc, i) => (
                  <div key={svc.id} className="p-card service-teaser-card">
                    <div className="teaser-card-top">
                      <div className="teaser-pillar-badge">Säule {i + 1}</div>
                      <div className="teaser-icon-box">{svc.icon}</div>
                    </div>

                    <h3 className="teaser-title">{svc.title}</h3>
                    <p className="teaser-desc">{svc.short}</p>

                    <div className="teaser-benefits-list">
                      {svc.details.map((d, k) => (
                        <div key={k} className="teaser-benefit-row">
                          <div className="teaser-check-dot">
                            <Check size={12} />
                          </div>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>

                    <div className="teaser-card-action">
                      <button 
                        className="p-btn p-btn-outline full-btn"
                        onClick={() => navigateTo('services')}
                      >
                        Alle Details ansehen <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* NEU FEATURE 2: INTERAKTIVER QUICK-AUDIT CHECK (QUIZ) */}
            <section className="sec-block quiz-section-card">
              <div className="sec-header sec-header-center">
                <span className="sec-badge">🎯 1-MINUTEN SCHNELL-CHECK</span>
                <h2>Wie digital ist Ihr Betrieb aktuell?</h2>
                <p>Beantworten Sie 3 kurze Fragen und erhalten Sie sofort eine Einschätzung Ihres Automatisierungs-Potenzials.</p>
              </div>

              <div className="quiz-box-container">
                {!auditFinished ? (
                  <div className="quiz-active-step">
                    <div className="quiz-progress-bar">
                      <div className="quiz-progress-fill" style={{ width: `${((auditStep + 1) / auditQuestions.length) * 100}%` }}></div>
                    </div>
                    <span className="quiz-step-count">Frage {auditStep + 1} von {auditQuestions.length}</span>
                    <h3 className="quiz-q-title">{auditQuestions[auditStep].question}</h3>

                    <div className="quiz-options-stack">
                      {auditQuestions[auditStep].options.map((opt, oIdx) => (
                        <button 
                          key={oIdx}
                          className="quiz-option-btn"
                          onClick={() => handleAuditSelect(auditQuestions[auditStep].id, opt.score)}
                        >
                          <span>{opt.label}</span>
                          <ArrowRight size={16} className="opt-arrow" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="quiz-result-view fade-in">
                    <Award size={40} className="text-emerald" />
                    <h3>Ihr Ergebnis: Digitaler Reifegrad ca. {calculateAuditScore()}%</h3>
                    <p>
                      {calculateAuditScore() < 60 
                        ? "🚀 Hohes Einsparpotenzial! In Ihrem Betrieb lassen sich durch einfache Prozess-Automatisierungen sofort 15–30 Arbeitsstunden pro Monat im Büro einsparen." 
                        : "👍 Gutes Fundament! Mit gezielten KI-Vorlagen und Schnittstellen lassen sich Ihre Abläufe noch weiter optimieren."}
                    </p>
                    <div className="quiz-result-actions">
                      <button 
                        className="p-btn p-btn-primary"
                        onClick={() => navigateTo('contact')}
                      >
                        Ergebnis im Erstgespräch besprechen <ArrowRight size={16} />
                      </button>
                      <button 
                        className="p-btn p-btn-outline"
                        onClick={() => { setAuditStep(0); setAuditAnswers({}); setAuditFinished(false); }}
                      >
                        Test wiederholen
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* NEU FEATURE 3: HARZER PRAXIS-BEISPIELE (CASE STUDIES) */}
            <section className="sec-block">
              <div className="sec-header sec-header-center">
                <span className="sec-badge">📍 PRAXIS-BEISPIELE HARZ</span>
                <h2>Ergebnisse aus der Region</h2>
                <p>So profitieren lokale Handwerks- & Gewerbebetriebe im Harz von maßgeschneiderten Lösungen.</p>
              </div>

              <div className="grid-responsive-3">
                <div className="p-card case-study-card">
                  <span className="case-tag">🪚 Tischlerei & Innenausbau</span>
                  <h4>Anfragen-Erfassung in 2 Minuten statt Zettelwirtschaft</h4>
                  <p className="case-text">Durch ein digitales Formular mit automatischer WhatsApp-Bestätigung spart der Inhaber wöchentlich ca. 12 Stunden Büroarbeit.</p>
                  <div className="case-stat">+12 Std. Zeitersparnis / Woche</div>
                </div>

                <div className="p-card case-study-card">
                  <span className="case-tag">⚡ Elektro- & Haustechnik</span>
                  <h4>Rechtssichere E-Rechnungen & Belegkette</h4>
                  <p className="case-text">Vollständige Umstellung auf digitale Belegkette – keine manuelle Zettelverarbeitung mehr bei Kundenterminen vor Ort.</p>
                  <div className="case-stat">0 % Zettelverluste</div>
                </div>

                <div className="p-card case-study-card">
                  <span className="case-tag">🔧 Sanitär- & Heizungsservice</span>
                  <h4>Schneller Webauftritt & KI-Vorlagen</h4>
                  <p className="case-text">Ladezeit unter 0,8 Sekunden bring neue Kundenzuströme. KI-Vorlagen beantworten wiederkehrende Fragen auf Knopfdruck.</p>
                  <div className="case-stat">&lt; 0.8 Sek. Ladezeit</div>
                </div>
              </div>
            </section>

            {/* NEU FEATURE 4: FAQ AKKORDEON */}
            <section className="sec-block highlight-surface">
              <div className="sec-header sec-header-center">
                <span className="sec-badge">❓ HÄUFIGE FRAGEN</span>
                <h2>Fragen & Antworten für KMU im Harz</h2>
                <p>Alles, was Sie über die Zusammenarbeit wissen müssen.</p>
              </div>

              <div className="faq-accordion-stack">
                {faqItems.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className={`faq-item-card ${isOpen ? 'open' : ''}`}>
                      <button 
                        className="faq-question-btn"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      >
                        <span>{item.q}</span>
                        <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="faq-answer-content fade-in">
                          <p>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ROI TEASER BANNER (MIT KORREKTEM PAGE SWITCH) */}
            <section className="roi-cta-banner">
              <div className="roi-cta-left">
                <div className="pill-bright">💡 LIVE-EXCEL SCHNELL-CHECK</div>
                <h2>Wie viel Arbeitszeit können Sie monatlich sparen?</h2>
                <p>Mit unserem interaktiven ROI-Rechner sehen Sie in 30 Sekunden das konkrete Einsparpotenzial für Ihren Betrieb.</p>
              </div>
              <button 
                type="button"
                className="p-btn p-btn-white p-btn-lg"
                onClick={() => navigateTo('roi')}
              >
                <Calculator size={20} /> Zum Live-ROI-Rechner
              </button>
            </section>

          </div>
        )}

        {/* ==================== PAGE: SERVICES ==================== */}
        {activePage === 'services' && (
          <div className="page-fade-in">
            {/* SERVICES PAGE HERO HEADER */}
            <div className="sec-header sec-header-center">
              <span className="sec-badge">🛠️ MAßGESCHNEIDERTE LÖSUNGEN</span>
              <h1 className="page-main-title">Digitalisierung & Automatisierung für Ihren Betrieb</h1>
              <p className="page-main-lead">
                Kein unübersichtlicher Fachjargon, sondern 3 erprobte Säulen für mehr Effizienz, Zeitersparnis und einen modernen Außenauftritt in der Harz-Region.
              </p>
            </div>

            {/* SERVICES STACK CARDS */}
            <div className="services-container-stack">
              {WEBSITE_CONTENT.services.map((svc, idx) => (
                <div key={svc.id} className="service-premium-card">
                  
                  {/* CARD TOP HEADER BAR */}
                  <div className="spc-header">
                    <div className="spc-pillar-badge">Säule {idx + 1}</div>
                    <div className="spc-title-group">
                      <div className="spc-icon-badge">{svc.icon}</div>
                      <div>
                        <h2 className="spc-title">{svc.title}</h2>
                        <p className="spc-short">{svc.short}</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD TWO-COLUMN CONTENT BODY */}
                  <div className="spc-grid-body">
                    
                    {/* LEFT COLUMN: VORTEILE & FUNKTIONEN */}
                    <div className="spc-col spc-col-benefits">
                      <h4 className="col-h4">
                        <CheckCircle2 size={18} className="col-h4-icon" /> 
                        Ihre konkreten Vorteile:
                      </h4>
                      <div className="benefits-custom-list">
                        {svc.details.map((detail, dIdx) => (
                          <div key={dIdx} className="benefit-card-row">
                            <div className="check-bullet">
                              <Check size={14} />
                            </div>
                            <span className="benefit-row-text">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: WARUM DAS WICHTIG IST & CTA */}
                    <div className="spc-col spc-col-value">
                      <div className="value-box-inner">
                        <h4 className="col-h4">
                          <Zap size={18} className="col-h4-icon-amber" /> 
                          Warum das für Ihren Betrieb entscheidend ist:
                        </h4>
                        <p className="value-p">
                          Kunden und Geschäftspartner erwarten heute schnelle Rückmeldungen, einfache Buchungen und eine saubere Erreichbarkeit. Manuelle Mehrfacharbeiten im Büro fressen wertvolle Inhaber-Arbeitszeit.
                        </p>
                        
                        <div className="value-cta-box">
                          <span className="value-cta-label">Bereit für den nächsten Schritt?</span>
                          <button 
                            className="p-btn p-btn-primary full-btn"
                            onClick={() => navigateTo('contact')}
                          >
                            Angebot für Säule {idx + 1} anfragen <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* BOTTOM HELP BANNER */}
            <div className="services-bottom-help">
              <div className="sbh-text">
                <h3>Sie wissen nicht genau, wo Sie anfangen sollen?</h3>
                <p>Wir analysieren in einem kurzen 15-minütigen Erstgespräch kostenfrei Ihre aktuellen Prozesse und zeigen die schnellsten Hebel.</p>
              </div>
              <button 
                className="p-btn p-btn-outline p-btn-lg"
                onClick={() => navigateTo('contact')}
              >
                Kostenlose Erstberatung buchen
              </button>
            </div>

          </div>
        )}

        {/* ==================== PAGE: ROI CALCULATOR ==================== */}
        {activePage === 'roi' && (
          <div className="page-fade-in">
            <div className="sec-header sec-header-center">
              <span className="sec-badge">📊 SCHNELL-PROGNOSE</span>
              <h1 className="page-main-title">Interaktiver ROI- & Zeitersparnis-Rechner</h1>
              <p className="page-main-lead">
                Berechnen Sie live, wie viel wertvolle Arbeitszeit und Geld Sie durch einfache Automatisierung pro Monat & Jahr einsparen.
              </p>
            </div>

            <div className="roi-calculator-layout">
              {/* SLIDERS CARD */}
              <div className="p-card roi-card-inputs">
                <div className="roi-card-header">
                  <BarChart3 size={20} className="text-emerald" />
                  <h3>1. Aktuelle Betriebsdaten einstellen</h3>
                </div>

                <div className="range-control-group">
                  <div className="range-header">
                    <label>Wiederkehrende Büro-Vorgänge (pro Monat):</label>
                    <span className="range-badge">{roiProcesses} Vorgänge</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="300" 
                    step="5" 
                    value={roiProcesses} 
                    onChange={(e) => setRoiProcesses(Number(e.target.value))}
                  />
                  <span className="range-hint">z. B. Anfragen verarbeiten, Angebote tippen, Stundenzettel erfassen</span>
                </div>

                <div className="range-control-group">
                  <div className="range-header">
                    <label>Zeitaufwand pro Vorgang:</label>
                    <span className="range-badge">{roiMinutes} Minuten</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="90" 
                    step="5" 
                    value={roiMinutes} 
                    onChange={(e) => setRoiMinutes(Number(e.target.value))}
                  />
                  <span className="range-hint">Durchschnittliche Dauer pro manueller Bearbeitung</span>
                </div>

                <div className="range-control-group">
                  <div className="range-header">
                    <label>Kalkulatorischer Stundensatz (Büro / Inhaber):</label>
                    <span className="range-badge">{roiHourlyRate} € / Std.</span>
                  </div>
                  <input 
                    type="range" 
                    min="25" 
                    max="150" 
                    step="5" 
                    value={roiHourlyRate} 
                    onChange={(e) => setRoiHourlyRate(Number(e.target.value))}
                  />
                  <span className="range-hint">Stundenwert der eingeworbenen oder eingesparten Zeit</span>
                </div>
              </div>

              {/* RESULTS CARD */}
              <div className="p-card roi-card-results">
                <div className="roi-card-header">
                  <TrendingUp size={20} className="text-blue" />
                  <h3>2. Ihr Einsparpotenzial</h3>
                </div>

                <div className="roi-result-boxes">
                  <div className="result-stat-box box-gray">
                    <span className="stat-label">Bisheriger Zeitaufwand:</span>
                    <span className="stat-value text-subtle">~{monthlyHoursSpent} Std. / Mon.</span>
                    <span className="stat-note">Gebunden in manueller Verwaltung</span>
                  </div>

                  <div className="result-stat-box box-green">
                    <span className="stat-label">Gewonnene freie Arbeitszeit:</span>
                    <span className="stat-value text-emerald">~{monthlyHoursSaved} Std. / Mon.</span>
                    <span className="stat-note">Freie Kapazität für Kunden & Aufträge</span>
                  </div>

                  <div className="result-stat-box box-blue">
                    <span className="stat-label">Rechnerische Ersparnis pro Jahr:</span>
                    <span className="stat-value text-blue">ca. {yearlyEuroSaved.toLocaleString('de-DE')} €</span>
                    <span className="stat-note">Nachhaltige Effizienzsteigerung</span>
                  </div>
                </div>

                <div className="roi-cta-footer">
                  <button 
                    className="p-btn p-btn-primary full-btn p-btn-lg"
                    onClick={() => navigateTo('contact')}
                  >
                    Ergebnis im Erstgespräch besprechen <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PAGE: ABOUT ==================== */}
        {activePage === 'about' && (
          <div className="page-fade-in">
            <div className="about-hero-card">
              <div className="about-hero-text">
                <span className="sec-badge">REGIONAL & ENGAGIERT</span>
                <h1>{WEBSITE_CONTENT.about.title}</h1>
                <h3 className="about-subtitle">{WEBSITE_CONTENT.about.subtitle}</h3>
                <p className="about-story-p">{WEBSITE_CONTENT.about.story}</p>
              </div>

              <div className="about-avatar-card">
                <div className="avatar-circle">RG</div>
                <h3 className="avatar-name">{WEBSITE_CONTENT.brand.owner}</h3>
                <span className="avatar-role">{WEBSITE_CONTENT.about.ownerTitle}</span>
                <span className="avatar-location"><MapPin size={14} /> {WEBSITE_CONTENT.brand.location}</span>
              </div>
            </div>

            <div className="sec-block">
              <div className="sec-header sec-header-center">
                <h2>Unsere 3 Grundprinzipien</h2>
                <p>Verlässliche Zusammenarbeit auf Augenhöhe für Betriebe im Harz.</p>
              </div>
              <div className="grid-responsive-3">
                {WEBSITE_CONTENT.about.principles.map((pr, i) => (
                  <div key={i} className="p-card">
                    <div className="principle-num">0{i + 1}</div>
                    <h3 className="card-h3">{pr.title}</h3>
                    <p className="card-p">{pr.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== PAGE: CONTACT ==================== */}
        {activePage === 'contact' && (
          <div className="page-fade-in">
            <div className="sec-header sec-header-center">
              <span className="sec-badge">📞 UNVERBINDLICHER KONTAKT</span>
              <h1 className="page-main-title">{WEBSITE_CONTENT.contact.title}</h1>
              <p className="page-main-lead">{WEBSITE_CONTENT.contact.subtitle}</p>
            </div>

            <div className="contact-layout">
              {/* FORM CARD */}
              <div className="p-card contact-form-wrapper">
                <h3>{WEBSITE_CONTENT.contact.formHeading}</h3>

                {contactSubmitted ? (
                  <div className="form-success-box">
                    <CheckCircle2 size={40} className="text-emerald" />
                    <h4>Vielen Dank für Ihre Anfrage!</h4>
                    <p>Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.</p>
                    <button 
                      className="p-btn p-btn-outline"
                      onClick={() => setContactSubmitted(false)}
                    >
                      Weitere Nachricht senden
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="contact-form-elements">
                    <div className="form-field-group">
                      <label>{WEBSITE_CONTENT.contact.fields.name} *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="z. B. Markus Schmidt"
                        value={contactData.name}
                        onChange={(e) => setContactData({...contactData, name: e.target.value})}
                      />
                    </div>

                    <div className="form-field-row">
                      <div className="form-field-group">
                        <label>{WEBSITE_CONTENT.contact.fields.company}</label>
                        <input 
                          type="text" 
                          placeholder="z. B. Tischlerei Schmidt GmbH"
                          value={contactData.company}
                          onChange={(e) => setContactData({...contactData, company: e.target.value})}
                        />
                      </div>
                      <div className="form-field-group">
                        <label>{WEBSITE_CONTENT.contact.fields.email} *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="schmidt@tischlerei.de"
                          value={contactData.email}
                          onChange={(e) => setContactData({...contactData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label>{WEBSITE_CONTENT.contact.fields.topic}</label>
                      <select 
                        value={contactData.topic}
                        onChange={(e) => setContactData({...contactData, topic: e.target.value})}
                      >
                        {WEBSITE_CONTENT.contact.topicOptions.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field-group">
                      <label>{WEBSITE_CONTENT.contact.fields.message}</label>
                      <textarea 
                        rows={4} 
                        placeholder="Beschreiben Sie kurz Ihr Anliegen oder Ihre Wünsche..."
                        value={contactData.message}
                        onChange={(e) => setContactData({...contactData, message: e.target.value})}
                      />
                    </div>

                    <div className="dsgvo-checkbox-row">
                      <input type="checkbox" id="dsgvo-agree" required />
                      <label htmlFor="dsgvo-agree">Ich stimme der vertraulichen Verarbeitung meiner Angaben gemäß Datenschutzerklärung zu.</label>
                    </div>

                    <button type="submit" className="p-btn p-btn-primary full-btn p-btn-lg">
                      <Send size={18} /> Erstgespräch unverbindlich anfragen
                    </button>
                  </form>
                )}
              </div>

              {/* CONTACT DETAILS CARD */}
              <div className="contact-details-stack">
                <div className="p-card">
                  <h3>Direkte Erreichbarkeit</h3>
                  <div className="contact-info-rows">
                    <div className="info-row">
                      <Mail size={18} className="info-icon" />
                      <div>
                        <span className="info-label">E-Mail:</span>
                        <span className="info-val">{WEBSITE_CONTENT.brand.email}</span>
                      </div>
                    </div>

                    <div className="info-row">
                      <Phone size={18} className="info-icon" />
                      <div>
                        <span className="info-label">Telefon / WhatsApp:</span>
                        <span className="info-val">{WEBSITE_CONTENT.brand.phone}</span>
                      </div>
                    </div>

                    <div className="info-row">
                      <MapPin size={18} className="info-icon" />
                      <div>
                        <span className="info-label">Standort:</span>
                        <span className="info-val">{WEBSITE_CONTENT.brand.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-card card-accent-bg">
                  <ShieldCheck size={28} className="text-emerald" />
                  <h4>100% DSGVO & Datenschutz</h4>
                  <p className="card-p-sm">Ihre Kontaktdaten werden vertraulich behandelt, auf deutschen Servern verarbeitet und niemals an Dritte weitergegeben.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PAGE: IMPRESSUM ==================== */}
        {activePage === 'impressum' && (
          <div className="page-fade-in legal-container">
            <span className="sec-badge">RECHTLICHES</span>
            <h1>{WEBSITE_CONTENT.impressum.title}</h1>
            <p className="legal-lead">{WEBSITE_CONTENT.impressum.legalNotice}</p>

            <div className="p-card legal-card-box">
              {WEBSITE_CONTENT.impressum.details.map((item, idx) => (
                <div key={idx} className="legal-detail-row">
                  <span className="legal-label">{item.label}:</span>
                  <span className="legal-value">{item.value}</span>
                </div>
              ))}

              <div className="legal-disclaimer-box">
                <p>{WEBSITE_CONTENT.impressum.disclaimer}</p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PAGE: PRIVACY ==================== */}
        {activePage === 'privacy' && (
          <div className="page-fade-in legal-container">
            <span className="sec-badge">DATENSCHUTZ</span>
            <h1>{WEBSITE_CONTENT.privacy.title}</h1>
            <p className="legal-lead">{WEBSITE_CONTENT.privacy.intro}</p>

            <div className="legal-sections-stack">
              {WEBSITE_CONTENT.privacy.sections.map((sec, idx) => (
                <div key={idx} className="p-card">
                  <h3 className="card-h3">{sec.heading}</h3>
                  <p className="card-p">{sec.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 🏁 SITE FOOTER */}
      <footer className="web-footer">
        <div className="web-footer-container">
          <div className="footer-brand-info">
            <strong className="footer-brand-name">{WEBSITE_CONTENT.brand.name}</strong>
            <p className="footer-brand-claim">{WEBSITE_CONTENT.brand.claim}</p>
            <span className="footer-copyright">© {new Date().getFullYear()} {WEBSITE_CONTENT.brand.owner}. Alle Rechte vorbehalten.</span>
          </div>

          <div className="footer-nav-links">
            {WEBSITE_CONTENT.nav.map(item => (
              <button 
                key={item.id}
                type="button"
                className="footer-nav-btn"
                onClick={() => navigateTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* 🎨 ULTRA-PREMIUM CSS SYSTEM (HELL & DUNKEL) */}
      <style>{`
        /* GLOBAL RESET FOR PREVIEW CONTAINER */
        .website-wrapper {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          min-height: 100vh;
          transition: background-color 0.25s ease, color 0.25s ease;
          border-radius: 14px;
          overflow: hidden;
          line-height: 1.5;
        }

        .website-wrapper * {
          box-sizing: border-box;
        }

        .page-fade-in {
          animation: webFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes webFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ==================== THEME 1: HELLES BUSINESS DESIGN ==================== */
        .mode-light {
          background-color: #f8fafc;
          color: #0f172a;
        }

        .mode-light .web-header {
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .mode-light .web-nav-item {
          color: #475569;
        }
        .mode-light .web-nav-item:hover, 
        .mode-light .web-nav-item.active {
          color: #047857;
          background: #ecfdf5;
        }

        .mode-light .p-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.04);
        }

        .mode-light .highlight-surface {
          background-color: #f1f5f9;
        }

        .mode-light .spc-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
        }

        .mode-light .spc-col-value {
          background-color: #f8fafc;
          border-left: 1px solid #e2e8f0;
        }

        .mode-light .benefit-card-row {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .mode-light .spc-icon-badge {
          background: #059669;
          color: white;
        }

        .mode-light .hero-card {
          background: linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%);
          border: 1px solid #e2e8f0;
        }

        .mode-light .text-gradient {
          background: linear-gradient(135deg, #059669 0%, #0284c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .mode-light .roi-cta-banner {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
        }

        .mode-light .quiz-section-card {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
          border: 1px solid #cbd5e1;
        }

        /* ==================== THEME 2: DUNKLES TECH DESIGN ==================== */
        .mode-dark {
          background-color: #0b0f19;
          color: #f8fafc;
        }

        .mode-dark .web-header {
          background-color: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mode-dark .web-nav-item {
          color: #94a3b8;
        }
        .mode-dark .web-nav-item:hover, 
        .mode-dark .web-nav-item.active {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
        }

        .mode-dark .p-card {
          background-color: rgba(30, 41, 59, 0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .mode-dark .highlight-surface {
          background-color: #0f172a;
        }

        .mode-dark .spc-header {
          background: rgba(15, 23, 42, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mode-dark .spc-col-value {
          background-color: rgba(15, 23, 42, 0.5);
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mode-dark .benefit-card-row {
          background-color: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .mode-dark .spc-icon-badge {
          background: #0ea5e9;
          color: white;
          box-shadow: 0 0 15px rgba(14, 165, 233, 0.4);
        }

        .mode-dark .hero-card {
          background: radial-gradient(circle at top right, rgba(14, 165, 233, 0.15), transparent 70%), #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mode-dark .text-gradient {
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .mode-dark .roi-cta-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mode-dark .quiz-section-card {
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* ==================== COACH BAR ==================== */
        .coach-bar {
          background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 10px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 0.88rem;
        }

        .coach-bar-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .coach-bar-actions {
          display: flex;
          gap: 8px;
        }

        .mode-btn {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.82rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .mode-btn.active {
          background: white;
          color: #4f46e5;
        }

        /* ==================== HEADER & NAVBAR ==================== */
        .web-header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .brand-badge-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .brand-logo-icon {
          background: #059669;
          color: white;
          padding: 10px;
          border-radius: 10px;
          display: flex;
        }

        .mode-dark .brand-logo-icon {
          background: #0ea5e9;
        }

        .brand-name {
          font-size: 1.25rem;
          font-weight: 800;
          display: block;
          line-height: 1.1;
        }

        .brand-tagline {
          font-size: 0.78rem;
          opacity: 0.7;
          display: block;
        }

        .web-nav {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }

        .web-nav-item {
          background: transparent;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .header-cta-btn {
          background: #059669;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.15s ease, background 0.2s ease;
        }

        .mode-dark .header-cta-btn {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
        }

        .header-cta-btn:hover {
          transform: translateY(-2px);
        }

        /* ==================== MAIN CONTAINER ==================== */
        .web-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px;
        }

        .sec-header {
          margin-bottom: 32px;
        }

        .sec-header-center {
          text-align: center;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .sec-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(5, 150, 105, 0.1);
          color: #059669;
          margin-bottom: 12px;
        }

        .mode-dark .sec-badge {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }

        .page-main-title {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 12px 0;
        }

        .page-main-lead {
          font-size: 1.1rem;
          opacity: 0.8;
          margin: 0;
        }

        /* ==================== BUTTON SYSTEM ==================== */
        .p-btn {
          padding: 12px 22px;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }

        .p-btn:hover {
          transform: translateY(-2px);
        }

        .p-btn-lg {
          padding: 16px 28px;
          font-size: 1.05rem;
        }

        .p-btn-primary {
          background: #059669;
          color: white;
          box-shadow: 0 4px 14px rgba(5, 150, 105, 0.3);
        }

        .mode-dark .p-btn-primary {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          box-shadow: 0 4px 18px rgba(14, 165, 233, 0.4);
        }

        .p-btn-outline {
          background: transparent;
          border: 1px solid #cbd5e1;
          color: inherit;
        }

        .mode-dark .p-btn-outline {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .p-btn-white {
          background: white;
          color: #0f172a;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .p-btn-link {
          background: transparent;
          border: none;
          color: #059669;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          padding: 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 16px;
        }

        .mode-dark .p-btn-link {
          color: #38bdf8;
        }

        .full-btn {
          width: 100%;
        }

        /* ==================== HERO SECTION ==================== */
        .hero-card {
          padding: 48px 36px;
          border-radius: 20px;
          margin-bottom: 48px;
        }

        .hero-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 20px;
          background: rgba(5, 150, 105, 0.1);
          color: #059669;
          margin-bottom: 20px;
        }

        .mode-dark .hero-badge-pill {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }

        .hero-headline {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -0.03em;
          margin: 0 0 20px 0;
        }

        .hero-subtext {
          font-size: 1.15rem;
          line-height: 1.6;
          max-width: 820px;
          opacity: 0.85;
          margin-bottom: 28px;
        }

        .hero-btn-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }

        .hero-trust-bar {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          padding-top: 24px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .mode-dark .hero-trust-bar {
          border-top-color: rgba(255, 255, 255, 0.08);
        }

        .trust-pill {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.04);
        }

        .mode-dark .trust-pill {
          background: rgba(255, 255, 255, 0.06);
        }

        /* ==================== GRIDS & CARDS ==================== */
        .grid-responsive-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .p-card {
          padding: 28px;
          border-radius: 16px;
        }

        .card-emoji-box {
          font-size: 2.2rem;
          margin-bottom: 16px;
        }

        .card-h3 {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0 0 10px 0;
        }

        .card-p {
          font-size: 0.95rem;
          line-height: 1.6;
          opacity: 0.8;
          margin: 0;
        }

        .sec-block {
          margin-bottom: 56px;
        }

        .highlight-surface {
          padding: 40px;
          border-radius: 24px;
        }

        /* ==================== HOME SERVICE TEASER CARDS (REDESIGNED!) ==================== */
        .service-teaser-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .teaser-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .teaser-pillar-badge {
          font-size: 0.75rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 10px;
          background: rgba(5, 150, 105, 0.12);
          color: #059669;
        }

        .mode-dark .teaser-pillar-badge {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }

        .teaser-icon-box {
          font-size: 1.6rem;
        }

        .teaser-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0 0 10px 0;
        }

        .teaser-desc {
          font-size: 0.92rem;
          line-height: 1.5;
          opacity: 0.85;
          margin-bottom: 20px;
        }

        .teaser-benefits-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }

        .teaser-benefit-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .teaser-check-dot {
          min-width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #059669;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mode-dark .teaser-check-dot {
          background: #0ea5e9;
        }

        .teaser-card-action {
          margin-top: auto;
        }

        /* ==================== VORHER VS NACHHER COMPARISON ==================== */
        .toggle-switch-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .toggle-tab {
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          border: 1px solid #cbd5e1;
          background: transparent;
          color: inherit;
          transition: all 0.2s ease;
        }

        .mode-dark .toggle-tab {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .toggle-tab.active-before {
          background: #fee2e2;
          color: #991b1b;
          border-color: #fca5a5;
        }

        .mode-dark .toggle-tab.active-before {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          border-color: rgba(239, 68, 68, 0.4);
        }

        .toggle-tab.active-after {
          background: #dcfce7;
          color: #166534;
          border-color: #86efac;
        }

        .mode-dark .toggle-tab.active-after {
          background: rgba(34, 197, 94, 0.2);
          color: #86efac;
          border-color: rgba(34, 197, 94, 0.4);
        }

        .comparison-card-wrapper {
          margin-top: 28px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .comp-card {
          padding: 32px;
          border-radius: 20px;
        }

        .mode-before-card {
          background: #fff5f5;
          border: 1px solid #fecaca;
        }

        .mode-dark .mode-before-card {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .mode-after-card {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
        }

        .mode-dark .mode-after-card {
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .comp-badge {
          font-size: 0.85rem;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 20px;
        }

        .badge-red { background: #fee2e2; color: #991b1b; }
        .mode-dark .badge-red { background: rgba(239, 68, 68, 0.2); color: #fca5a5; }

        .badge-green { background: #dcfce7; color: #166534; }
        .mode-dark .badge-green { background: rgba(34, 197, 94, 0.2); color: #86efac; }

        .comp-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .comp-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.98rem;
          line-height: 1.5;
        }

        .icon-red { color: #dc2626; min-width: 18px; margin-top: 2px; }
        .icon-green { color: #16a34a; min-width: 18px; margin-top: 2px; }

        /* ==================== QUICK AUDIT QUIZ ==================== */
        .quiz-section-card {
          padding: 40px;
          border-radius: 24px;
        }

        .quiz-box-container {
          max-width: 680px;
          margin: 28px auto 0 auto;
        }

        .quiz-progress-bar {
          height: 6px;
          background: rgba(0,0,0,0.08);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .mode-dark .quiz-progress-bar { background: rgba(255,255,255,0.1); }

        .quiz-progress-fill {
          height: 100%;
          background: #059669;
          transition: width 0.3s ease;
        }

        .mode-dark .quiz-progress-fill { background: #38bdf8; }

        .quiz-step-count {
          font-size: 0.8rem;
          font-weight: 700;
          opacity: 0.7;
          display: block;
          margin-bottom: 12px;
        }

        .quiz-q-title {
          font-size: 1.35rem;
          font-weight: 800;
          margin: 0 0 24px 0;
        }

        .quiz-options-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .quiz-option-btn {
          padding: 16px 20px;
          border-radius: 14px;
          border: 1px solid #cbd5e1;
          background: white;
          color: #0f172a;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          transition: all 0.15s ease;
        }

        .mode-dark .quiz-option-btn {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(255, 255, 255, 0.15);
          color: white;
        }

        .quiz-option-btn:hover {
          border-color: #059669;
          transform: translateX(4px);
        }

        .mode-dark .quiz-option-btn:hover {
          border-color: #38bdf8;
        }

        .quiz-result-view {
          text-align: center;
          padding: 24px 0;
        }

        .quiz-result-view h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 16px 0 10px 0;
        }

        .quiz-result-view p {
          font-size: 1.05rem;
          line-height: 1.6;
          max-width: 540px;
          margin: 0 auto 28px auto;
          opacity: 0.85;
        }

        .quiz-result-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ==================== CASE STUDIES ==================== */
        .case-study-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .case-tag {
          font-size: 0.78rem;
          font-weight: 800;
          color: #059669;
          margin-bottom: 12px;
          display: block;
        }

        .mode-dark .case-tag { color: #38bdf8; }

        .case-study-card h4 {
          font-size: 1.15rem;
          font-weight: 800;
          margin: 0 0 10px 0;
        }

        .case-text {
          font-size: 0.9rem;
          line-height: 1.5;
          opacity: 0.8;
          margin-bottom: 20px;
        }

        .case-stat {
          font-size: 0.9rem;
          font-weight: 800;
          padding: 8px 14px;
          border-radius: 8px;
          background: rgba(5, 150, 105, 0.1);
          color: #059669;
          text-align: center;
        }

        .mode-dark .case-stat {
          background: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
        }

        /* ==================== FAQ ACCORDION ==================== */
        .faq-accordion-stack {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .faq-item-card {
          border-radius: 14px;
          background: white;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }

        .mode-dark .faq-item-card {
          background: rgba(30, 41, 59, 0.7);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .faq-question-btn {
          width: 100%;
          padding: 20px 24px;
          background: transparent;
          border: none;
          font-size: 1.05rem;
          font-weight: 700;
          color: inherit;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .faq-chevron {
          transition: transform 0.2s ease;
          min-width: 18px;
        }

        .faq-chevron.rotate {
          transform: rotate(180deg);
        }

        .faq-answer-content {
          padding: 0 24px 20px 24px;
          font-size: 0.95rem;
          line-height: 1.6;
          opacity: 0.85;
        }

        /* ==================== ROI CTA BANNER ==================== */
        .roi-cta-banner {
          padding: 40px;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
          margin-top: 56px;
        }

        .pill-bright {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          margin-bottom: 12px;
        }

        .roi-cta-left h2 {
          font-size: 1.8rem;
          font-weight: 800;
          margin: 0 0 10px 0;
        }

        .roi-cta-left p {
          font-size: 1.05rem;
          opacity: 0.9;
          margin: 0;
          max-width: 600px;
        }

        /* ==================== SERVICES PAGE PREMIUM REDESIGN ==================== */
        .services-container-stack {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-top: 40px;
        }

        .service-premium-card {
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 8px 30px -4px rgba(15, 23, 42, 0.06);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .mode-dark .service-premium-card {
          background: rgba(30, 41, 59, 0.65);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
        }

        .spc-header {
          padding: 24px 32px;
          position: relative;
        }

        .spc-pillar-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 12px;
          background: rgba(5, 150, 105, 0.1);
          color: #059669;
          margin-bottom: 12px;
        }

        .mode-dark .spc-pillar-badge {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }

        .spc-title-group {
          display: flex;
          align-items: flex-start;
          gap: 18px;
        }

        .spc-icon-badge {
          font-size: 1.8rem;
          min-width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spc-title {
          font-size: 1.45rem;
          font-weight: 800;
          margin: 0 0 6px 0;
          line-height: 1.25;
        }

        .spc-short {
          font-size: 1rem;
          opacity: 0.85;
          margin: 0;
          line-height: 1.5;
        }

        .spc-grid-body {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
        }

        @media (max-width: 868px) {
          .spc-grid-body { grid-template-columns: 1fr; }
        }

        .spc-col {
          padding: 32px;
        }

        .col-h4 {
          font-size: 1rem;
          font-weight: 800;
          margin: 0 0 20px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .col-h4-icon {
          color: #059669;
        }

        .mode-dark .col-h4-icon {
          color: #38bdf8;
        }

        .col-h4-icon-amber {
          color: #d97706;
        }

        .benefits-custom-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .benefit-card-row {
          padding: 14px 18px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .check-bullet {
          min-width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #059669;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mode-dark .check-bullet {
          background: #0ea5e9;
        }

        .benefit-row-text {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .value-box-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }

        .value-p {
          font-size: 0.95rem;
          line-height: 1.6;
          opacity: 0.85;
          margin-bottom: 24px;
        }

        .value-cta-box {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .mode-dark .value-cta-box {
          border-top-color: rgba(255, 255, 255, 0.08);
        }

        .value-cta-label {
          font-size: 0.8rem;
          font-weight: 700;
          opacity: 0.7;
          display: block;
          margin-bottom: 10px;
        }

        .services-bottom-help {
          margin-top: 48px;
          padding: 32px 40px;
          border-radius: 20px;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .mode-dark .services-bottom-help {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sbh-text h3 {
          font-size: 1.3rem;
          font-weight: 800;
          margin: 0 0 6px 0;
        }

        .sbh-text p {
          font-size: 0.95rem;
          opacity: 0.9;
          margin: 0;
        }

        /* ==================== ROI CALCULATOR ==================== */
        .roi-calculator-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-top: 36px;
        }

        @media (max-width: 868px) {
          .roi-calculator-layout { grid-template-columns: 1fr; }
        }

        .roi-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .roi-card-header h3 {
          font-size: 1.15rem;
          font-weight: 800;
          margin: 0;
        }

        .range-control-group {
          margin-bottom: 24px;
        }

        .range-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .range-badge {
          color: #059669;
          font-weight: 800;
        }

        .mode-dark .range-badge {
          color: #38bdf8;
        }

        input[type="range"] {
          width: 100%;
          accent-color: #059669;
          cursor: pointer;
        }

        .mode-dark input[type="range"] {
          accent-color: #38bdf8;
        }

        .range-hint {
          font-size: 0.78rem;
          opacity: 0.6;
          display: block;
          margin-top: 4px;
        }

        .roi-result-boxes {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .result-stat-box {
          padding: 18px 22px;
          border-radius: 12px;
        }

        .box-gray { background: rgba(0,0,0,0.03); }
        .mode-dark .box-gray { background: rgba(255,255,255,0.04); }

        .box-green { background: #ecfdf5; border: 1px solid #a7f3d0; }
        .mode-dark .box-green { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); }

        .box-blue { background: #eff6ff; border: 1px solid #bfdbfe; }
        .mode-dark .box-blue { background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.2); }

        .stat-label {
          font-size: 0.85rem;
          font-weight: 700;
          display: block;
          opacity: 0.8;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 900;
          display: block;
          margin: 4px 0;
        }

        .text-emerald { color: #059669; }
        .mode-dark .text-emerald { color: #34d399; }

        .text-blue { color: #2563eb; }
        .mode-dark .text-blue { color: #38bdf8; }

        .stat-note {
          font-size: 0.78rem;
          opacity: 0.75;
        }

        /* ==================== CONTACT FORM ==================== */
        .contact-layout {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 32px;
          margin-top: 36px;
        }

        @media (max-width: 868px) {
          .contact-layout { grid-template-columns: 1fr; }
        }

        .contact-form-elements {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-top: 18px;
        }

        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field-group label {
          font-size: 0.85rem;
          font-weight: 700;
        }

        .form-field-group input, 
        .form-field-group select, 
        .form-field-group textarea {
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 0.95rem;
          font-family: inherit;
        }

        .mode-dark .form-field-group input, 
        .mode-dark .form-field-group select, 
        .mode-dark .form-field-group textarea {
          background: #0f172a;
          border-color: rgba(255, 255, 255, 0.15);
          color: white;
        }

        .form-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .dsgvo-checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.82rem;
        }

        .contact-info-rows {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-top: 18px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .info-icon {
          color: #059669;
        }

        .mode-dark .info-icon {
          color: #38bdf8;
        }

        .info-label {
          font-size: 0.78rem;
          opacity: 0.7;
          display: block;
        }

        .info-val {
          font-size: 0.95rem;
          font-weight: 700;
        }

        /* ==================== FOOTER ==================== */
        .web-footer {
          border-top: 1px solid rgba(0,0,0,0.08);
          padding: 40px 24px;
          margin-top: 64px;
        }

        .mode-dark .web-footer {
          border-top-color: rgba(255,255,255,0.08);
        }

        .web-footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .footer-nav-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .footer-nav-btn {
          background: transparent;
          border: none;
          color: inherit;
          opacity: 0.7;
          cursor: pointer;
          font-size: 0.88rem;
        }

        .footer-nav-btn:hover {
          opacity: 1;
        }
      `}</style>

    </div>
  );
};

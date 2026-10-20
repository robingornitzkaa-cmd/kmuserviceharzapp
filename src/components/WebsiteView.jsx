import React, { useState, useRef } from 'react';
import { WEBSITE_CONTENT, WEBSITE_VERSIONS } from '../constants/websiteContent';
import { 
  Globe, 
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
  Layers,
  Check,
  HelpCircle,
  BarChart3,
  XCircle,
  CheckCircle,
  Flame,
  Award,
  Calendar,
  AlertTriangle,
  FileSpreadsheet,
  Workflow,
  Smartphone,
  Building2,
  Euro,
  RefreshCw,
  FolderSync,
  Compass,
  Download,
  Copy,
  ExternalLink,
  X,
  MessageSquare,
  CloudUpload
} from 'lucide-react';

export const WebsiteView = () => {
  // Theme fest verankert: 'harz' (Hellgrün) im Light-Modus
  const themePreset = 'harz';
  const contrastMode = 'light';

  // Website-Versions-Umschalter: 'v1' (Original) | 'v2' (Beleg-Fokus + Coaching) | 'v3' (3-Säulen Komplett)
  const [activeVersion, setActiveVersion] = useState('v3');
  // Umschalter innerhalb der Himmel-Hölle-Sektion: 'optimized' (Handwerker-Klartext) | 'coaching_raw' (Original Whiteboard)
  const [hhDisplayMode, setHhDisplayMode] = useState('optimized');

  const activeVersionMeta = WEBSITE_VERSIONS.find(v => v.id === activeVersion) || WEBSITE_VERSIONS[0];
  const currentContent = activeVersionMeta.content || WEBSITE_CONTENT;
  
  // Subpage state: 'home' | 'services' | 'workflow' | 'roi' | 'about' | 'contact' | 'impressum' | 'privacy'
  const [activePage, setActivePage] = useState('home');
  const mainContainerRef = useRef(null);

  // Workflow Before/After Toggle ('after' | 'before')
  const [workflowMode, setWorkflowMode] = useState('after');

  // FAQ Accordion State (stores active index or null)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Export Modal State
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportEmail, setExportEmail] = useState(WEBSITE_CONTENT.brand.email);
  const [exportVersionId, setExportVersionId] = useState('v3');
  const [activeExportTab, setActiveExportTab] = useState('quick');
  const [copiedCode, setCopiedCode] = useState(false);

  // ROI Calculator State (Handwerks- und Mittelstands-Fokus)
  const [roiEmployees, setRoiEmployees] = useState(5);
  const [roiReceiptsPerWeek, setRoiReceiptsPerWeek] = useState(35);
  const [roiHourlyRate, setRoiHourlyRate] = useState(55);

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

  // Lead-Magnet (5-Minuten Büro-Stress-Test PDF per E-Mail) State
  const [leadMagnetEmail, setLeadMagnetEmail] = useState('');
  const [leadMagnetCompany, setLeadMagnetCompany] = useState('');
  const [leadMagnetSubmitted, setLeadMagnetSubmitted] = useState(false);

  // Calculation Logic for ROI & Saved Weekends
  const hoursPerReceiptMinutes = 12;
  const monthlyReceipts = roiReceiptsPerWeek * 4;
  const monthlyAdminHoursSpent = Math.round((monthlyReceipts * hoursPerReceiptMinutes) / 60) + (roiEmployees * 3);
  const monthlyHoursSaved = Math.max(8, Math.round(monthlyAdminHoursSpent * 0.75));
  const yearlyEuroSaved = Math.round(monthlyHoursSaved * 12 * roiHourlyRate);
  const savedSundaysPerYear = Math.min(48, Math.round((monthlyHoursSaved * 12) / 5));

  // Smooth page transition helper that resets scroll position
  const navigateTo = (pageId) => {
    if (pageId === 'showcase') pageId = 'workflow';
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTop = 0;
    }
  };

  const handleVersionChange = (verId) => {
    setActiveVersion(verId);
    setExportVersionId(verId);
  };

  // Scroll to section on home page
  const scrollToSection = (sectionId) => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const handleLeadMagnetSubmit = (e) => {
    e.preventDefault();
    if (!leadMagnetEmail.trim()) return;
    setLeadMagnetSubmitted(true);
  };

  const selectPackageForContact = (packageName) => {
    setContactData(prev => ({
      ...prev,
      topic: packageName
    }));
    navigateTo('contact');
  };

  // Standalone HTML Generator Function (supports all 3 versions!)
  const generateStandaloneHtml = (targetEmail, versionKey = activeVersion) => {
    const verObj = WEBSITE_VERSIONS.find(v => v.id === versionKey) || activeVersionMeta;
    const contentToExport = verObj.content || currentContent;
    const emailToUse = targetEmail || contentToExport.brand.email;
    const whatsappNum = (contentToExport.brand.whatsapp || '4915112345678').replace(/[^0-9]/g, '');

    const hhHtmlSection = contentToExport.heavenHell ? `
  <!-- HIMMEL & HÖLLE PRINZIP -->
  <section class="section-padding" id="himmel-hoelle" style="background: var(--bg-subtle);">
    <div class="container">
      <div class="sec-header">
        <span class="sec-badge">${contentToExport.heavenHell.badge}</span>
        <h2 class="sec-title">${contentToExport.heavenHell.title}</h2>
        <p class="sec-subtitle">${contentToExport.heavenHell.subtitle}</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; max-width: 1150px; margin: 0 auto;">
        <div style="background: #fff1f2; border: 2px solid #fecdd3; border-radius: 16px; padding: 1.8rem;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #be123c; text-transform: uppercase; margin-bottom: 1rem;">🔥 ${contentToExport.heavenHell.hellTitle}</div>
          ${contentToExport.heavenHell.pairs.map(p => `
            <div style="background: #ffffff; border: 1px solid #fecdd3; border-radius: 12px; padding: 1rem; margin-bottom: 0.9rem;">
              <div style="font-weight: 800; color: #9f1239; font-size: 0.95rem; margin-bottom: 0.3rem;">✕ ${p.websiteHellTitle}</div>
              <div style="font-size: 0.86rem; color: #475569; line-height: 1.5;">${p.websiteHellChain}</div>
            </div>
          `).join('')}
        </div>
        <div style="background: #ecfdf5; border: 2px solid #a7f3d0; border-radius: 16px; padding: 1.8rem;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #047857; text-transform: uppercase; margin-bottom: 1rem;">✨ ${contentToExport.heavenHell.heavenTitle}</div>
          ${contentToExport.heavenHell.pairs.map(p => `
            <div style="background: #ffffff; border: 1px solid #a7f3d0; border-radius: 12px; padding: 1rem; margin-bottom: 0.9rem;">
              <div style="font-weight: 800; color: #065f46; font-size: 0.95rem; margin-bottom: 0.3rem;">✓ ${p.websiteHeavenTitle}</div>
              <div style="font-size: 0.86rem; color: #0f172a; line-height: 1.5;">${p.websiteHeavenChain}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>` : '';

    const fabHtmlSection = contentToExport.fabStatements ? `
  <!-- FAB-STATEMENTS (MERKMAL + PRODUKTVORTEIL + KUNDENNUTZEN) -->
  <section class="section-padding" id="fab-statements">
    <div class="container">
      <div class="sec-header">
        <span class="sec-badge">${contentToExport.fabStatements.badge}</span>
        <h2 class="sec-title">${contentToExport.fabStatements.title}</h2>
        <p class="sec-subtitle">${contentToExport.fabStatements.subtitle}</p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 1100px; margin: 0 auto;">
        ${contentToExport.fabStatements.items.map(fab => `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 1.3rem; box-shadow: var(--card-shadow);">
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 1rem;">
              <div style="font-size: 0.7rem; font-weight: 800; color: #1d4ed8; text-transform: uppercase; margin-bottom: 0.25rem;">1. Besonderes Produkt-Merkmal</div>
              <div style="font-weight: 800; color: #1e3a8a; font-size: 0.98rem;">${fab.feature}</div>
            </div>
            <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 10px; padding: 1rem;">
              <div style="font-size: 0.7rem; font-weight: 800; color: #6d28d9; text-transform: uppercase; margin-bottom: 0.25rem;">+ 2. Vorteil Produkt</div>
              <div style="font-weight: 700; color: #4c1d95; font-size: 0.92rem;">${fab.advantage}</div>
            </div>
            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 1rem;">
              <div style="font-size: 0.7rem; font-weight: 800; color: #047857; text-transform: uppercase; margin-bottom: 0.25rem;">= 3. Vorteil für Sie als Kunde</div>
              <div style="font-weight: 700; color: #064e3b; font-size: 0.92rem;">${fab.benefit}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>` : '';

    return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${contentToExport.brand.name} – ${contentToExport.brand.positioning}</title>
  <meta name="description" content="${contentToExport.brand.claim}" />
  <!-- 100 % DSGVO-konform: Keine externen Google Fonts! Lokaler System-Font-Stack + Schema.org JSON-LD für Local SEO & KI-Suche (GEO) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "name": "${contentToExport.brand.name}",
        "description": "${contentToExport.brand.claim}",
        "telephone": "${contentToExport.brand.phone}",
        "email": "${emailToUse}",
        "priceRange": "500€ - 2.000€",
        "founder": { "@type": "Person", "name": "${contentToExport.brand.owner}" },
        "address": {
          "@type": "PostalAddress",
          "postalCode": "38685",
          "addressLocality": "Langelsheim",
          "addressRegion": "Niedersachsen",
          "addressCountry": "DE"
        },
        "areaServed": ["Langelsheim", "Goslar", "Bad Harzburg", "Seesen", "Wernigerode", "Halberstadt", "Osterode am Harz"]
      }
    ]
  }
  </script>
  <style>
    :root {
      --primary: #064e3b;
      --primary-hover: #047857;
      --primary-light: #ecfdf5;
      --primary-border: #a7f3d0;
      --accent: #d97706;
      --accent-light: #fef3c7;
      --bg-main: #f9fafb;
      --bg-card: #ffffff;
      --bg-subtle: #f0fdf4;
      --border: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #475569;
      --card-shadow: 0 4px 20px -2px rgba(6, 78, 59, 0.08);
      --badge-bg: #ecfdf5;
      --badge-text: #064e3b;
      --badge-border: #a7f3d0;
      --text-hero-gradient: linear-gradient(135deg, #064e3b 0%, #047857 100%);
    }

    body.preset-tech {
      --primary: #0f172a;
      --primary-hover: #1e293b;
      --primary-light: #f1f5f9;
      --primary-border: #cbd5e1;
      --accent: #10b981;
      --accent-light: #d1fae5;
      --bg-main: #f8fafc;
      --bg-card: #ffffff;
      --bg-subtle: #f1f5f9;
      --border: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #475569;
      --card-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.08);
      --badge-bg: #eff6ff;
      --badge-text: #1d4ed8;
      --badge-border: #bfdbfe;
      --text-hero-gradient: linear-gradient(135deg, #0f172a 0%, #2563eb 100%);
    }

    body.preset-industry {
      --primary: #18181b;
      --primary-hover: #27272a;
      --primary-light: #f4f4f5;
      --primary-border: #d4d4d8;
      --accent: #ea580c;
      --accent-light: #ffedd5;
      --bg-main: #fafafa;
      --bg-card: #ffffff;
      --bg-subtle: #fff7ed;
      --border: #e4e4e7;
      --text-main: #18181b;
      --text-muted: #52525b;
      --card-shadow: 0 4px 20px -2px rgba(24, 24, 27, 0.08);
      --badge-bg: #ffedd5;
      --badge-text: #c2410c;
      --badge-border: #fed7aa;
      --text-hero-gradient: linear-gradient(135deg, #18181b 0%, #ea580c 100%);
    }

    body.mode-dark {
      --bg-main: #071712;
      --bg-card: #0b241d;
      --bg-subtle: #0f3027;
      --border: #1a4a3c;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --card-shadow: 0 6px 24px -2px rgba(0, 0, 0, 0.4);
      --badge-bg: #0f3027;
      --badge-text: #34d399;
      --badge-border: #1a4a3c;
      --text-hero-gradient: linear-gradient(135deg, #34d399 0%, #a7f3d0 100%);
    }

    body.preset-tech.mode-dark {
      --bg-main: #0a0f1d;
      --bg-card: #111827;
      --bg-subtle: #1e293b;
      --border: #334155;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --card-shadow: 0 6px 24px -2px rgba(0, 0, 0, 0.5);
      --badge-bg: #1e293b;
      --badge-text: #60a5fa;
      --badge-border: #3b82f6;
      --text-hero-gradient: linear-gradient(135deg, #60a5fa 0%, #34d399 100%);
    }

    body.preset-industry.mode-dark {
      --bg-main: #09090b;
      --bg-card: #18181b;
      --bg-subtle: #27272a;
      --border: #3f3f46;
      --text-main: #fafafa;
      --text-muted: #a1a1aa;
      --card-shadow: 0 6px 24px -2px rgba(0, 0, 0, 0.5);
      --badge-bg: #27272a;
      --badge-text: #fb923c;
      --badge-border: #ea580c;
      --text-hero-gradient: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg-main);
      color: var(--text-main);
      line-height: 1.55;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    a { color: inherit; text-decoration: none; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

    /* HEADER */
    header {
      background: var(--bg-card);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(12px);
    }
    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.85rem 1.5rem;
      max-width: 1240px;
      margin: 0 auto;
      gap: 1rem;
    }
    .brand { display: flex; align-items: center; gap: 0.75rem; }
    .logo-box {
      width: 38px; height: 38px; border-radius: 10px;
      background: var(--primary); color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 1.2rem;
    }
    .brand-title { font-size: 1.05rem; font-weight: 800; }
    .brand-sub { font-size: 0.72rem; color: var(--text-muted); font-weight: 500; }
    
    nav { display: flex; align-items: center; gap: 0.35rem; }
    .nav-link {
      padding: 0.45rem 0.8rem; font-size: 0.88rem; font-weight: 600;
      color: var(--text-muted); border-radius: 8px; transition: all 0.15s ease;
    }
    .nav-link:hover { color: var(--text-main); background: var(--bg-subtle); }

    .header-actions { display: flex; align-items: center; gap: 0.65rem; }
    .theme-picker {
      display: flex; background: var(--bg-subtle); padding: 3px;
      border-radius: 20px; border: 1px solid var(--border); gap: 2px;
    }
    .theme-btn {
      border: none; background: transparent; padding: 4px 9px;
      font-size: 0.76rem; font-weight: 700; border-radius: 15px;
      cursor: pointer; color: var(--text-muted); transition: all 0.15s ease;
    }
    .theme-btn.active { background: var(--bg-card); color: var(--text-main); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .mode-toggle {
      background: var(--bg-subtle); border: 1px solid var(--border);
      border-radius: 9px; width: 34px; height: 34px; display: flex;
      align-items: center; justify-content: center; cursor: pointer; color: var(--text-main);
    }
    .btn-header-cta {
      background: var(--primary); color: #fff; border: none;
      padding: 0.5rem 1rem; border-radius: 9px; font-weight: 700;
      font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem;
    }

    /* HERO */
    .hero-section {
      padding: 4.5rem 1.5rem 3.5rem; text-align: center;
      background: radial-gradient(circle at 50% 10%, var(--bg-subtle) 0%, transparent 70%);
    }
    .hero-pill {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: var(--badge-bg); color: var(--badge-text);
      border: 1px solid var(--badge-border); padding: 0.35rem 0.9rem;
      border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-bottom: 1.2rem;
    }
    .hero-h1 {
      font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800;
      line-height: 1.15; letter-spacing: -0.03em; max-width: 900px;
      margin: 0 auto 1.2rem;
    }
    .highlight-text {
      background: var(--text-hero-gradient);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .hero-p {
      font-size: 1.15rem; color: var(--text-muted); max-width: 720px;
      margin: 0 auto 2rem; line-height: 1.6;
      white-space: pre-line;
    }
    .hero-btn-group {
      display: flex; align-items: center; justify-content: center;
      gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem;
    }
    .btn-primary-glow {
      background: var(--primary); color: #ffffff; padding: 0.85rem 1.8rem;
      border-radius: 10px; font-weight: 700; font-size: 1rem; border: none;
      cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem;
      box-shadow: 0 4px 14px rgba(6, 78, 59, 0.3); transition: all 0.2s ease;
    }
    .btn-primary-glow:hover { background: var(--primary-hover); transform: translateY(-1px); }
    .btn-secondary-outline {
      background: var(--bg-card); color: var(--text-main); border: 1.5px solid var(--border);
      padding: 0.85rem 1.5rem; border-radius: 10px; font-weight: 700; font-size: 0.95rem;
      cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .trust-badges-row {
      display: flex; align-items: center; justify-content: center;
      gap: 1.2rem; flex-wrap: wrap; font-size: 0.85rem; font-weight: 600; color: var(--text-muted);
    }
    .trust-item { display: flex; align-items: center; gap: 0.35rem; }

    /* SECTIONS */
    .section-padding { padding: 4.5rem 1.5rem; }
    .sec-header { text-align: center; max-width: 700px; margin: 0 auto 3rem; }
    .sec-badge {
      display: inline-block; background: var(--badge-bg); color: var(--badge-text);
      border: 1px solid var(--badge-border); padding: 0.25rem 0.75rem;
      border-radius: 15px; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.04em; margin-bottom: 0.6rem;
    }
    .sec-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.6rem; }
    .sec-subtitle { font-size: 1rem; color: var(--text-muted); }

    /* PAIN POINTS */
    .pain-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem; max-width: 1200px; margin: 0 auto;
    }
    .pain-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 14px; padding: 1.8rem; box-shadow: var(--card-shadow);
    }
    .pain-icon { font-size: 1.8rem; margin-bottom: 1rem; display: inline-block; }
    .pain-h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; }
    .pain-p { font-size: 0.92rem; color: var(--text-muted); line-height: 1.55; }

    /* TOOLS */
    .tools-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.2rem; max-width: 1100px; margin: 0 auto 2rem;
    }
    .tool-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 12px; padding: 1.4rem; box-shadow: var(--card-shadow);
    }
    .tool-role { font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 0.3rem; }
    .tool-name { font-size: 1.1rem; font-weight: 800; margin-bottom: 0.4rem; }
    .tool-desc { font-size: 0.85rem; color: var(--text-muted); }
    .bridge-banner {
      max-width: 900px; margin: 2rem auto 0; background: var(--bg-subtle);
      border: 1px solid var(--border); border-radius: 12px; padding: 1.2rem 1.6rem;
      display: flex; align-items: center; gap: 1rem; font-size: 0.95rem;
    }

    /* PRICING */
    .pricing-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.8rem; max-width: 1150px; margin: 0 auto;
    }
    .pricing-card {
      background: var(--bg-card); border: 1.5px solid var(--border);
      border-radius: 16px; padding: 2.2rem; box-shadow: var(--card-shadow);
      position: relative; display: flex; flex-direction: column;
    }
    .pricing-card.highlighted {
      border-color: var(--primary);
      box-shadow: 0 8px 30px rgba(6, 78, 59, 0.15);
    }
    .pricing-badge-pill {
      position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
      background: var(--primary); color: #fff; padding: 3px 12px;
      border-radius: 20px; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.03em;
    }
    .pricing-level { font-size: 0.8rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
    .pricing-title { font-size: 1.4rem; font-weight: 800; margin: 0.2rem 0; }
    .pricing-tagline { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.2rem; }
    .price-box { margin-bottom: 1.2rem; display: flex; align-items: baseline; gap: 0.4rem; }
    .price-amount { font-size: 2.3rem; font-weight: 800; }
    .price-suff { font-size: 0.85rem; color: var(--text-muted); }
    .funding-tag {
      background: var(--accent-light); color: #92400e; border-radius: 6px;
      padding: 4px 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 1.2rem; display: inline-block;
    }
    .pricing-features { list-style: none; margin: 1.5rem 0; flex-grow: 1; }
    .pricing-features li {
      font-size: 0.88rem; margin-bottom: 0.6rem; display: flex; align-items: flex-start; gap: 0.5rem;
    }
    .pricing-features li::before { content: "✓"; color: #059669; font-weight: 800; }
    .btn-pricing {
      width: 100%; padding: 0.8rem; border-radius: 10px; font-weight: 700;
      border: 1.5px solid var(--primary); background: transparent; color: var(--primary);
      cursor: pointer; transition: all 0.15s ease; text-align: center;
    }
    .pricing-card.highlighted .btn-pricing { background: var(--primary); color: #fff; }

    /* WORKFLOW SECTION */
    .workflow-card {
      max-width: 1000px; margin: 0 auto; background: var(--bg-card);
      border: 1px solid var(--border); border-radius: 18px; padding: 2.5rem; box-shadow: var(--card-shadow);
    }
    .workflow-steps-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem; margin: 2rem 0;
    }
    .step-card {
      background: var(--bg-subtle); border: 1px solid var(--border);
      border-radius: 12px; padding: 1.5rem; position: relative;
    }
    .step-num {
      width: 32px; height: 32px; border-radius: 8px; background: var(--primary);
      color: #fff; display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 0.9rem; margin-bottom: 0.8rem;
    }
    .step-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.3rem; }
    .step-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }

    /* ROI CALCULATOR */
    .roi-card {
      max-width: 950px; margin: 0 auto; background: var(--bg-card);
      border: 1.5px solid var(--border); border-radius: 18px; padding: 2.2rem;
      display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; box-shadow: var(--card-shadow);
    }
    @media(max-width: 768px) { .roi-card { grid-template-columns: 1fr; } }
    .slider-wrap { margin-bottom: 1.5rem; }
    .slider-head { display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 700; margin-bottom: 0.4rem; }
    .slider-val { color: var(--primary); font-weight: 800; }
    .calc-slider { width: 100%; accent-color: var(--primary); }
    .roi-results-box {
      background: var(--bg-subtle); border: 1px solid var(--border);
      border-radius: 14px; padding: 1.8rem; display: flex; flex-direction: column; justify-content: center;
    }
    .sundays-big { font-size: 2.2rem; font-weight: 800; color: var(--accent); margin: 0.5rem 0; }

    /* FAQ */
    .faq-stack { max-width: 800px; margin: 0 auto; }
    .faq-item {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 12px; margin-bottom: 0.8rem; overflow: hidden;
    }
    .faq-head {
      padding: 1.2rem 1.5rem; font-weight: 700; cursor: pointer;
      display: flex; justify-content: space-between; align-items: center;
    }
    .faq-body { padding: 0 1.5rem 1.2rem; font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; display: none; }
    .faq-item.active .faq-body { display: block; }
    .faq-item.active .faq-head { color: var(--primary); }

    /* CONTACT */
    .contact-grid {
      max-width: 1050px; margin: 0 auto; display: grid;
      grid-template-columns: 1.2fr 0.8fr; gap: 2rem;
    }
    @media(max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
    .contact-form-box {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 16px; padding: 2.2rem; box-shadow: var(--card-shadow);
    }
    .form-group { margin-bottom: 1.1rem; }
    .form-group label { display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 0.35rem; }
    .form-input, .form-select, .form-textarea {
      width: 100%; padding: 0.75rem 1rem; border-radius: 9px;
      border: 1px solid var(--border); background: var(--bg-subtle);
      color: var(--text-main); font-family: inherit; font-size: 0.92rem;
    }
    .btn-whatsapp {
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      background: #25D366; color: #ffffff; padding: 0.85rem; border-radius: 10px;
      font-weight: 700; margin-top: 1rem; transition: background 0.15s ease; text-align: center;
    }
    .btn-whatsapp:hover { background: #1ebd5a; }

    /* FOOTER */
    footer {
      background: var(--bg-card); border-top: 1px solid var(--border);
      padding: 3rem 1.5rem 2rem; margin-top: 4rem;
    }
    .footer-inner {
      max-width: 1200px; margin: 0 auto; display: flex;
      justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;
    }
  </style>
</head>
<body class="preset-harz mode-light">

  <!-- HEADER -->
  <header>
    <div class="header-inner">
      <div class="brand">
        <div class="logo-box">⚙</div>
        <div>
          <div class="brand-title">${contentToExport.brand.shortName}</div>
          <div class="brand-sub">${contentToExport.brand.positioning}</div>
        </div>
      </div>

      <nav>
        <a href="#services" class="nav-link">Preise & Pakete</a>
        <a href="#workflow" class="nav-link">So funktioniert's</a>
        <a href="#roi" class="nav-link">Büro-Rechner</a>
        <a href="#contact" class="nav-link">Kontakt</a>
      </nav>

      <div class="header-actions">
        <a href="#contact" class="btn-header-cta">Erstgespräch</a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="hero-section">
    <div class="container">
      <span class="hero-pill">${contentToExport.hero.badge}</span>
      <h1 class="hero-h1">
        ${contentToExport.hero.headline}
      </h1>
      <p class="hero-p">${contentToExport.hero.subheadline}</p>
      <div class="hero-btn-group">
        <a href="#contact" class="btn-primary-glow">${contentToExport.hero.ctaPrimary} →</a>
        <a href="#roi" class="btn-secondary-outline">🧮 ${contentToExport.hero.ctaSecondary}</a>
      </div>
      <div class="trust-badges-row">
        ${contentToExport.hero.trustBadges.map(tb => `<div class="trust-item">${tb}</div>`).join('')}
      </div>
    </div>
  </section>

  <!-- PAIN POINTS -->
  <section class="section-padding">
    <div class="container">
      <div class="sec-header">
        <span class="sec-badge">${contentToExport.painPoints.badge}</span>
        <h2 class="sec-title">${contentToExport.painPoints.title}</h2>
        <p class="sec-subtitle">${contentToExport.painPoints.subtitle}</p>
      </div>
      <div class="pain-grid">
        ${contentToExport.painPoints.items.map((it, idx) => `
        <div class="pain-card">
          <div class="pain-icon">${idx === 0 ? '📅' : idx === 1 ? '⏱️' : idx === 2 ? '📄' : '⚖️'}</div>
          <h3 class="pain-h3">${it.problem}</h3>
          <p class="pain-p">${it.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>
  ${hhHtmlSection}
  ${fabHtmlSection}

  <!-- WORKFLOW -->
  <section class="section-padding" id="workflow" style="background: var(--bg-subtle);">
    <div class="container">
      <div class="sec-header">
        <span class="sec-badge">${contentToExport.workflow.badge}</span>
        <h2 class="sec-title">${contentToExport.workflow.title}</h2>
        <p class="sec-subtitle">${contentToExport.workflow.subtitle}</p>
      </div>
      <div class="workflow-card">
        <div class="workflow-steps-grid">
          ${contentToExport.workflow.workflowSteps.map(ws => `
          <div class="step-card">
            <div class="step-num">${ws.num}</div>
            <h4 class="step-title">${ws.title}</h4>
            <p class="step-desc">${ws.desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section class="section-padding" id="services">
    <div class="container">
      <div class="sec-header">
        <span class="sec-badge">FESTE PAKETPREISE STATT STUNDENSÄTZE</span>
        <h2 class="sec-title">Die dreistufige Preistreppe</h2>
        <p class="sec-subtitle">Garantierte Ergebnisse, transparente Festpreise und keine versteckten IT-Zusatzkosten.</p>
      </div>
      <div class="pricing-grid">
        ${contentToExport.pricingTiers.map(tier => `
        <div class="pricing-card ${tier.highlight ? 'highlighted' : ''}">
          ${tier.badge ? `<div class="pricing-badge-pill">${tier.badge}</div>` : ''}
          <div class="pricing-level">${tier.level}</div>
          <h3 class="pricing-title">${tier.title}</h3>
          <p class="pricing-tagline">${tier.tagline}</p>
          <div class="price-box">
            <span class="price-amount">${tier.price}</span>
            <span class="price-suff">${tier.priceSuffix}</span>
          </div>
          ${tier.fundingNote ? `<div class="funding-tag">${tier.fundingNote}</div>` : ''}
          <ul class="pricing-features">
            ${tier.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <a href="#contact" class="btn-pricing">${tier.ctaText}</a>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ROI CALCULATOR -->
  <section class="section-padding" id="roi" style="background: var(--bg-subtle);">
    <div class="container">
      <div class="sec-header">
        <span class="sec-badge">${contentToExport.roiCalculator.badge}</span>
        <h2 class="sec-title">${contentToExport.roiCalculator.title}</h2>
        <p class="sec-subtitle">Berechnen Sie in 10 Sekunden, wie viele freie Wochenenden Ihr Betrieb zurückgewinnt.</p>
      </div>
      <div class="roi-card">
        <div>
          <div class="slider-wrap">
            <div class="slider-head">
              <span>Mitarbeiter im Betrieb:</span>
              <span class="slider-val" id="val-emp">5 Mitarbeiter</span>
            </div>
            <input type="range" min="1" max="20" value="5" class="calc-slider" id="input-emp" oninput="calcRoi()">
          </div>
          <div class="slider-wrap">
            <div class="slider-head">
              <span>Belege & Zettel pro Woche:</span>
              <span class="slider-val" id="val-rec">35 Stück</span>
            </div>
            <input type="range" min="10" max="150" step="5" value="35" class="calc-slider" id="input-rec" oninput="calcRoi()">
          </div>
          <div class="slider-wrap">
            <div class="slider-head">
              <span>Kalkulierter Stundenwert:</span>
              <span class="slider-val" id="val-wage">55 € / Std.</span>
            </div>
            <input type="range" min="35" max="95" step="5" value="55" class="calc-slider" id="input-wage" oninput="calcRoi()">
          </div>
        </div>
        <div class="roi-results-box">
          <span style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted);">IHRE GESCHÄTZTE ENTLASTUNG:</span>
          <div class="sundays-big" id="res-sundays">ca. 24 freie Wochenenden</div>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">pro Jahr ohne Beleg-Chaos & Büroarbeit am Wochenende.</p>
          <div style="font-size: 0.95rem; font-weight: 700; margin-bottom: 1.2rem;">
            Monatlich eingespart: <span style="color: var(--primary);" id="res-hours">~16 Std.</span> | Wert: <span style="color: var(--accent);" id="res-euros">~10.560 € / Jahr</span>
          </div>
          <a href="#contact" class="btn-primary-glow" style="text-align:center; justify-content:center;">Ergebnis im Erstgespräch besprechen →</a>
        </div>
      </div>

      <!-- VALUE-FIRST E-MAIL-GATE (LEAD MAGNET: 5-MINUTEN BÜRO-STRESS-TEST PDF) -->
      <div id="lead-magnet" style="max-width: 950px; margin: 2rem auto 0; background: var(--bg-card); border: 2px solid var(--primary); border-radius: 18px; padding: 2rem; box-shadow: var(--card-shadow);">
        <span class="sec-badge">${(contentToExport.leadMagnet && contentToExport.leadMagnet.badge) || 'KOSTENLOSER PRAXIS-CHECK (PDF PER E-MAIL)'}</span>
        <h3 style="font-size: 1.45rem; font-weight: 800; margin: 0.4rem 0 0.6rem;">${(contentToExport.leadMagnet && contentToExport.leadMagnet.title) || 'Der 5-Minuten Büro-Stress-Test & E-Rechnungs-Check für Harzer Betriebe'}</h3>
        <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.2rem;">${(contentToExport.leadMagnet && contentToExport.leadMagnet.subtitle) || ''}</p>
        <form action="https://formsubmit.co/${emailToUse}" method="POST" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.85rem; align-items: center;">
          <input type="hidden" name="_subject" value="PDF-Lead-Magnet angefordert: 5-Minuten Büro-Stress-Test" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="lead_source" class="js-lead-source" value="direkt" />
          <input type="hidden" name="calculated_roi" id="lead-roi-summary" value="ca. 24 freie Wochenenden (~16 Std./Mo.)" />
          <input type="email" name="email" required placeholder="Ihre E-Mail-Adresse für den PDF-Versand *" class="form-input" />
          <input type="text" name="company" placeholder="Optional: Betriebsname / Gewerk" class="form-input" />
          <button type="submit" class="btn-primary-glow" style="justify-content: center; width: 100%;">
            📄 PDF-Checkliste per E-Mail anfordern →
          </button>
        </form>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.75rem;">🔒 100 % kostenfrei & DSGVO-konform. Ihre oben berechnete Zeitersparnis wird automatisch in die Auswertung übernommen.</p>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section-padding">
    <div class="container">
      <div class="sec-header">
        <span class="sec-badge">HÄUFIGE FRAGEN</span>
        <h2 class="sec-title">Fragen aus dem Handwerksalltag</h2>
      </div>
      <div class="faq-stack">
        <div class="faq-item active" onclick="toggleFaq(this)">
          <div class="faq-head">
            <span>Müssen wir oder unsere Mitarbeiter dafür neue Software lernen?</span>
            <span>▼</span>
          </div>
          <div class="faq-body">
            Nein! Ihre Mitarbeiter fotografieren Belege einfach mit dem Smartphone oder senden sie per WhatsApp/E-Mail – ganz so, wie sie es privat gewohnt sind. Wir bauen die Technik im Hintergrund.
          </div>
        </div>
        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-head">
            <span>Funktioniert das mit unserem bestehenden Steuerberater (DATEV)?</span>
            <span>▼</span>
          </div>
          <div class="faq-body">
            Ja, absolut. Wir binden die DATEV-Schnittstellen direkt an Lexoffice an. Ihr Steuerberater erhält alle Belege monatlich lückenlos, vorkontiert und revisionssicher nach GoBD.
          </div>
        </div>
        <div class="faq-item" onclick="toggleFaq(this)">
          <div class="faq-head">
            <span>Wie läuft die staatliche Förderung (bis zu 50 % bis 80 %) ab?</span>
            <span>▼</span>
          </div>
          <div class="faq-body">
            Bei größeren Prozess- und Digitalisierungsprojekten ab 6.000 € (z. B. tiefe ERP- und Schnittstellen-Integration für den gesamten Betrieb) greifen Programme wie „Digital Innovation Sachsen-Anhalt“ mit bis zu 50 % Zuschuss oder das bundesweite „INQA-Coaching“ mit bis zu 80 % Zuschuss. Unser 2.000 € Standard-Setup ist hingegen bewusst so kalkuliert, dass es sich ohne behördliche Wartezeiten in unter 8 Wochen von selbst bezahlt macht.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="section-padding" id="contact" style="background: var(--bg-subtle);">
    <div class="container">
      <div class="sec-header">
        <span class="sec-badge">${contentToExport.contact.badge}</span>
        <h2 class="sec-title">${contentToExport.contact.title}</h2>
        <p class="sec-subtitle">${contentToExport.contact.subtitle}</p>
      </div>

      <div class="contact-grid">
        <!-- FORM -->
        <div class="contact-form-box">
          <form action="https://formsubmit.co/${emailToUse}" method="POST">
            <input type="hidden" name="_subject" value="Neue Anfrage via KMU Service Harz Website (${verObj.shortLabel})" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="lead_source" class="js-lead-source" value="direkt" />

            <div class="form-group">
              <label>Ihr Name & Vorname *</label>
              <input type="text" name="name" required placeholder="z. B. Frank Müller" class="form-input" />
            </div>
            <div class="form-group">
              <label>Firmenname & Gewerk / Branche</label>
              <input type="text" name="company" placeholder="z. B. Müller Elektro GmbH" class="form-input" />
            </div>
            <div class="form-group">
              <label>Telefonnummer für Rückruf *</label>
              <input type="tel" name="phone" required placeholder="0171 / 1234567" class="form-input" />
            </div>
            <div class="form-group">
              <label>E-Mail-Adresse *</label>
              <input type="email" name="email" required placeholder="frank@mueller-elektro.de" class="form-input" />
            </div>
            <div class="form-group">
              <label>Gewünschtes Paket / Thema</label>
              <select name="topic" class="form-select">
                <option>Kostenloses 15-Minuten Kennenlerngespräch</option>
                <option>Stufe 1: Büro-Potenzial-Audit (500 €)</option>
                <option>Stufe 2: Standard-Setup (2.000 €)</option>
                <option>Stufe 3: Digitaler Hausmeister (200 €/Mo)</option>
                <option>Fragen zu Fördermitteln (Digital Innovation / INQA)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Ihre Herausforderung</label>
              <textarea name="message" rows="3" placeholder="Zettelwirtschaft, Beleg-Chaos, DATEV..." class="form-textarea"></textarea>
            </div>
            <button type="submit" class="btn-primary-glow" style="width: 100%; justify-content: center;">
              Kostenloses Erstgespräch anfragen →
            </button>
          </form>

          <a href="https://wa.me/${whatsappNum}?text=Hallo%20Robin,%20ich%20interessiere%20mich%20f%C3%BCr%20die%20digitale%20Belegerfassung." target="_blank" class="btn-whatsapp">
            💬 Direkt per WhatsApp schreiben
          </a>
        </div>

        <!-- INFO -->
        <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 2.2rem;">
          <span class="sec-badge">PERSÖNLICH VOR ORT</span>
          <h3 style="font-size: 1.3rem; margin: 0.5rem 0 1rem;">KMU Service Harz</h3>
          <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1.5rem;">
            Ansprechpartner: <strong>${contentToExport.brand.owner}</strong><br>
            Standort: <strong>${contentToExport.brand.location}</strong><br>
            E-Mail: <strong>${contentToExport.brand.email}</strong><br>
            Telefon: <strong>${contentToExport.brand.phone}</strong>
          </p>
          <div style="background: var(--bg-subtle); border: 1px solid var(--border); border-radius: 10px; padding: 1.2rem; font-size: 0.88rem;">
            <strong>🤝 Das Harzer Handschlag-Versprechen:</strong><br>
            Wir sprechen kein IT-Chinesisch, verlangen keine unberechenbaren Stundenhonorare und zwingen Ihnen keine neue Software auf.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-inner">
      <div>
        <strong>${contentToExport.brand.name}</strong>
        <p style="font-size: 0.82rem; color: var(--text-muted);">${contentToExport.brand.claim}</p>
        <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem;">© ${new Date().getFullYear()} ${contentToExport.brand.owner}. ${contentToExport.brand.location}</p>
      </div>
      <div style="display: flex; gap: 1rem; font-size: 0.85rem; color: var(--text-muted);">
        <a href="#services">Preise</a>
        <a href="#workflow">Workflow</a>
        <a href="#roi">Rechner</a>
        <a href="#contact">Kontakt</a>
      </div>
    </div>
  </footer>

  <script>
    (function initCookielessRefTracking() {
      try {
        var params = new URLSearchParams(window.location.search);
        var ref = params.get('ref') || params.get('utm_source') || 'direkt';
        document.querySelectorAll('.js-lead-source').forEach(function(el) { el.value = ref; });
      } catch (e) {}
    })();

    function setTheme(preset) {
      document.body.className = document.body.className.replace(/preset-\\w+/g, '') + ' preset-' + preset;
      document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
    }

    function toggleContrast() {
      if (document.body.classList.contains('mode-dark')) {
        document.body.classList.remove('mode-dark');
        document.body.classList.add('mode-light');
      } else {
        document.body.classList.remove('mode-light');
        document.body.classList.add('mode-dark');
      }
    }

    function toggleFaq(el) {
      el.classList.toggle('active');
    }

    function calcRoi() {
      const emp = parseInt(document.getElementById('input-emp').value);
      const rec = parseInt(document.getElementById('input-rec').value);
      const wage = parseInt(document.getElementById('input-wage').value);

      document.getElementById('val-emp').innerText = emp + ' Mitarbeiter';
      document.getElementById('val-rec').innerText = rec + ' Stück';
      document.getElementById('val-wage').innerText = wage + ' € / Std.';

      const monthlyRec = rec * 4;
      const monthlyAdminHours = Math.round((monthlyRec * 12) / 60) + (emp * 3);
      const savedHours = Math.max(8, Math.round(monthlyAdminHours * 0.75));
      const savedSundays = Math.min(48, Math.round((savedHours * 12) / 5));
      const savedEuros = Math.round(savedHours * 12 * wage);

      document.getElementById('res-sundays').innerText = 'ca. ' + savedSundays + ' freie Wochenenden';
      document.getElementById('res-hours').innerText = '~' + savedHours + ' Std.';
      document.getElementById('res-euros').innerText = '~' + savedEuros.toLocaleString('de-DE') + ' € / Jahr';
      const summaryEl = document.getElementById('lead-roi-summary');
      if (summaryEl) {
        summaryEl.value = 'ca. ' + savedSundays + ' freie Wochenenden (~' + savedHours + ' Std./Mo., ~' + savedEuros.toLocaleString('de-DE') + ' €/Jahr)';
      }
    }
  </script>
</body>
</html>`;
  };

  const downloadStandaloneHtml = (verKey = exportVersionId) => {
    const html = generateStandaloneHtml(exportEmail, verKey);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = verKey === 'v1' ? 'index-v1-original.html' : verKey === 'v2' ? 'index-v2-beleg-coaching.html' : 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyStandaloneHtml = (verKey = exportVersionId) => {
    const html = generateStandaloneHtml(exportEmail, verKey);
    navigator.clipboard.writeText(html);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className={`website-wrapper preset-${themePreset} mode-${contrastMode}`} ref={mainContainerRef}>
      
      {/* 🎛️ 3-VERSIONEN-UMSCHALTLEISTE (V1 ORIGINAL vs. V2 BELEG+COACHING vs. V3 3-SÄULEN KOMPLETT) */}
      <div style={{
        background: '#064e3b',
        color: '#ffffff',
        padding: '0.65rem 1.25rem',
        borderBottom: '2px solid #047857',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        fontSize: '0.82rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{
            background: '#d97706',
            color: '#fff',
            fontWeight: 800,
            padding: '0.2rem 0.55rem',
            borderRadius: '6px',
            fontSize: '0.72rem',
            letterSpacing: '0.03em'
          }}>
            🔄 WEBSITE-VERSIONEN (ALLELREIHEN-VERGLEICH)
          </span>
          <span style={{ color: '#a7f3d0', fontWeight: 600 }}>
            {activeVersionMeta.description}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          {WEBSITE_VERSIONS.map(ver => {
            const isSelected = activeVersion === ver.id;
            return (
              <button
                key={ver.id}
                type="button"
                onClick={() => handleVersionChange(ver.id)}
                style={{
                  background: isSelected ? '#ffffff' : 'rgba(255,255,255,0.12)',
                  color: isSelected ? '#064e3b' : '#ecfdf5',
                  border: isSelected ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '8px',
                  padding: '0.35rem 0.75rem',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {ver.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* 🧭 TOP BRAND HEADER & CONTROL BAR */}
      <header className="web-header">
        <div className="web-header-inner">
          
          {/* Logo & Regional Claim */}
          <div className="web-brand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
            <div className="web-logo-icon">
              <Workflow size={22} />
            </div>
            <div className="web-brand-text">
              <span className="web-brand-title">{currentContent.brand.shortName}</span>
              <span className="web-brand-sub">{currentContent.brand.positioning}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="web-nav">
            {currentContent.nav.map(item => (
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

          {/* Actions & Export */}
          <div className="web-header-actions">
            {/* 🚀 EXPORT & LIVE-SCHALTUNG BUTTON */}
            <button
              type="button"
              className="export-site-btn"
              onClick={() => {
                setExportVersionId(activeVersion);
                setShowExportModal(true);
              }}
              title="Website als eigenständige HTML exportieren & Live schalten"
            >
              <Download size={14} />
              <span>Website Exportieren ({activeVersion.toUpperCase()})</span>
            </button>

            {/* Direct CTA Header Button */}
            <button 
              type="button" 
              className="header-cta-btn"
              onClick={() => navigateTo('contact')}
            >
              <Calendar size={14} />
              <span>Erstgespräch</span>
            </button>
          </div>

        </div>
      </header>

      {/* 🚀 MAIN CONTENT CONTAINER */}
      <main className="web-main">
        
        {/* ========================================================================= */}
        {/* 🏠 STARTSEITE (HIGH-CONVERTING ONE-PAGER ERLEBNIS) */}
        {/* ========================================================================= */}
        {activePage === 'home' && (
          <div className="page-fade-in">
            
            {/* 1. HERO SECTION */}
            <section className="hero-section">
              <div className="hero-content">
                <div className="hero-badge-container">
                  <span className="hero-pill">
                    <Sparkles size={14} className="hero-sparkle" />
                    {currentContent.hero.badge}
                  </span>
                  <span className="hero-location-tag">
                    <MapPin size={13} />
                    {currentContent.brand.location}
                  </span>
                </div>

                {activeVersion === 'v1' ? (
                  <h1 className="hero-headline">
                    Schluss mit dem <span className="highlight-text">Büro-Wochenende.</span><br />
                    Lautlose digitale Workflows für Handwerk & Mittelstand im Harz.
                  </h1>
                ) : (
                  <h1 className="hero-headline">
                    {currentContent.hero.headline}
                  </h1>
                )}

                <p className="hero-subheadline">
                  {currentContent.hero.subheadline}
                </p>

                {/* Primary & Secondary Call to Actions */}
                <div className="hero-cta-group">
                  <button 
                    type="button" 
                    className="btn-primary-glow"
                    onClick={() => navigateTo('contact')}
                  >
                    <span>{currentContent.hero.ctaPrimary}</span>
                    <ArrowRight size={18} />
                  </button>

                  <button 
                    type="button" 
                    className="btn-secondary-outline"
                    onClick={() => scrollToSection(currentContent.heavenHell ? 'himmel-hoelle-section' : 'roi-section')}
                  >
                    <Calculator size={17} />
                    <span>{currentContent.hero.ctaSecondary}</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="hero-trust-row">
                  {currentContent.hero.trustBadges.map((badge, idx) => (
                    <div key={idx} className="hero-trust-item">
                      <CheckCircle2 size={15} className="trust-check-icon" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. PAIN POINTS / SCHMERZPUNKTE DES HANDWERKS */}
            <section className="section-padding pain-section" id="pain-section">
              <div className="section-header text-center">
                <span className="sec-badge alert-badge">{currentContent.painPoints.badge}</span>
                <h2 className="sec-title">{currentContent.painPoints.title}</h2>
                <p className="sec-subtitle">{currentContent.painPoints.subtitle}</p>
              </div>

              <div className="pain-grid">
                {currentContent.painPoints.items.map((item, idx) => (
                  <div key={idx} className="pain-card">
                    <div className="pain-icon-box">
                      {idx === 0 && <Calendar size={24} />}
                      {idx === 1 && <Clock size={24} />}
                      {idx === 2 && <FileSpreadsheet size={24} />}
                      {idx === 3 && <AlertTriangle size={24} />}
                    </div>
                    <h3 className="pain-title">{item.problem}</h3>
                    <p className="pain-desc">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 🔥 2b. HIMMEL-HÖLLE-PRINZIP SEKTION (NUR IN VERSION 2 & VERSION 3) */}
            {currentContent.heavenHell && (
              <section className="section-padding" id="himmel-hoelle-section">
                <div className="section-header text-center">
                  <span className="sec-badge">{currentContent.heavenHell.badge}</span>
                  <h2 className="sec-title">{currentContent.heavenHell.title}</h2>
                  <p className="sec-subtitle">{currentContent.heavenHell.subtitle}</p>

                  {/* Umschalter zwischen Handwerker-Klartext & Original Coaching-Notizen */}
                  <div style={{ display: 'inline-flex', gap: '0.4rem', background: 'var(--bg-subtle)', padding: '0.3rem', borderRadius: '999px', border: '1px solid var(--border)', marginTop: '1.1rem' }}>
                    <button
                      type="button"
                      onClick={() => setHhDisplayMode('optimized')}
                      style={{
                        border: 'none',
                        padding: '0.4rem 0.9rem',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        background: hhDisplayMode === 'optimized' ? 'var(--primary)' : 'transparent',
                        color: hhDisplayMode === 'optimized' ? '#ffffff' : 'var(--text-muted)'
                      }}
                    >
                      🎯 Handwerker-Klartext (Website-Fassung)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHhDisplayMode('coaching_raw')}
                      style={{
                        border: 'none',
                        padding: '0.4rem 0.9rem',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        background: hhDisplayMode === 'coaching_raw' ? '#d97706' : 'transparent',
                        color: hhDisplayMode === 'coaching_raw' ? '#ffffff' : 'var(--text-muted)'
                      }}
                    >
                      📋 Original Coaching-Kausalketten (Whiteboard)
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
                  {/* HÖLLE LINKS */}
                  <div style={{
                    background: '#fff1f2',
                    border: '2px solid #fecdd3',
                    borderRadius: '18px',
                    padding: '1.85rem',
                    boxShadow: '0 6px 24px rgba(190, 18, 60, 0.08)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#be123c', fontWeight: 900, fontSize: '0.92rem', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                      <Flame size={20} />
                      <span>{currentContent.heavenHell.hellTitle}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {currentContent.heavenHell.pairs.map((pair) => (
                        <div key={pair.id} style={{
                          background: '#ffffff',
                          border: '1px solid #fecdd3',
                          borderRadius: '12px',
                          padding: '1.1rem 1.25rem'
                        }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#e11d48', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                            {pair.dimension}
                          </div>
                          <div style={{ fontWeight: 800, color: '#881337', fontSize: '1rem', marginBottom: '0.35rem' }}>
                            ✕ {pair.websiteHellTitle}
                          </div>
                          <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                            {hhDisplayMode === 'coaching_raw' ? pair.coachingHellRaw : pair.websiteHellChain}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* HIMMEL RECHTS */}
                  <div style={{
                    background: '#ecfdf5',
                    border: '2px solid #6ee7b7',
                    borderRadius: '18px',
                    padding: '1.85rem',
                    boxShadow: '0 6px 24px rgba(4, 120, 87, 0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857', fontWeight: 900, fontSize: '0.92rem', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                      <Sparkles size={20} />
                      <span>{currentContent.heavenHell.heavenTitle}</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {currentContent.heavenHell.pairs.map((pair) => (
                        <div key={pair.id} style={{
                          background: '#ffffff',
                          border: '1px solid #a7f3d0',
                          borderRadius: '12px',
                          padding: '1.1rem 1.25rem'
                        }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                            {pair.dimension}
                          </div>
                          <div style={{ fontWeight: 800, color: '#064e3b', fontSize: '1rem', marginBottom: '0.35rem' }}>
                            ✓ {pair.websiteHeavenTitle}
                          </div>
                          <div style={{ fontSize: '0.88rem', color: '#0f172a', lineHeight: 1.55 }}>
                            {hhDisplayMode === 'coaching_raw' ? pair.coachingHeavenRaw : pair.websiteHeavenChain}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 🏆 2c. DIE 3 KERN-SÄULEN (NUR IN VERSION 3) */}
            {currentContent.threePillars && (
              <section className="section-padding" style={{ background: 'var(--bg-subtle)', borderRadius: '18px', marginBottom: '2rem' }}>
                <div className="section-header text-center">
                  <span className="sec-badge">{currentContent.threePillars.badge}</span>
                  <h2 className="sec-title">{currentContent.threePillars.title}</h2>
                  <p className="sec-subtitle">{currentContent.threePillars.subtitle}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.5rem' }}>
                  {currentContent.threePillars.pillars.map((pillar, pIdx) => (
                    <div key={pIdx} style={{
                      background: 'var(--bg-card)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '16px',
                      padding: '1.85rem',
                      boxShadow: 'var(--card-shadow)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <span style={{
                        alignSelf: 'flex-start',
                        background: 'var(--badge-bg)',
                        color: 'var(--badge-text)',
                        border: '1px solid var(--badge-border)',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        marginBottom: '0.85rem'
                      }}>
                        {pillar.num}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                        {pillar.title}
                      </h3>
                      <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.15rem' }}>
                        {pillar.subtitle}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flexGrow: 1 }}>
                        {pillar.points.map((pt, ptIdx) => (
                          <div key={ptIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                            <Check size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '3px' }} />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 💎 2d. DIE 5 FAB-STATEMENTS (BESONDERES MERKMAL + PRODUKTVORTEIL = KUNDENNUTZEN) (IN V2 & V3) */}
            {currentContent.fabStatements && (
              <section className="section-padding" id="fab-statements-section">
                <div className="section-header text-center">
                  <span className="sec-badge">{currentContent.fabStatements.badge}</span>
                  <h2 className="sec-title">{currentContent.fabStatements.title}</h2>
                  <p className="sec-subtitle">{currentContent.fabStatements.subtitle}</p>
                </div>

                {/* Farb-Legende wie im Coaching-Whiteboard */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  marginBottom: '1.75rem',
                  fontSize: '0.85rem',
                  fontWeight: 800
                }}>
                  <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '0.35rem 0.85rem', borderRadius: '8px' }}>
                    1. Besonderes Produkt-Merkmal
                  </span>
                  <span style={{ fontWeight: 900, color: 'var(--text-muted)' }}>+</span>
                  <span style={{ background: '#f5f3ff', color: '#6d28d9', border: '1px solid #ddd6fe', padding: '0.35rem 0.85rem', borderRadius: '8px' }}>
                    2. Vorteil Produkt
                  </span>
                  <span style={{ fontWeight: 900, color: 'var(--text-muted)' }}>=</span>
                  <span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '0.35rem 0.85rem', borderRadius: '8px' }}>
                    3. Konkreter Vorteil für Sie als Kunde
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {currentContent.fabStatements.items.map((fab) => (
                    <div key={fab.id} style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '16px',
                      padding: '1.35rem',
                      boxShadow: 'var(--card-shadow)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '1rem',
                      alignItems: 'stretch'
                    }}>
                      {/* 1. Feature (Blau) */}
                      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase' }}>
                            Besonderes Merkmal
                          </span>
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, background: '#dbeafe', color: '#1e40af', padding: '0.15rem 0.5rem', borderRadius: '999px' }}>
                            {fab.badge}
                          </span>
                        </div>
                        <div style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '1.02rem' }}>
                          {hhDisplayMode === 'coaching_raw' ? fab.coachingFeatureRaw : fab.feature}
                        </div>
                      </div>

                      {/* 2. Advantage (Lila) */}
                      <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '12px', padding: '1.1rem' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6d28d9', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                          + Vorteil Produkt (Was es tut)
                        </div>
                        <div style={{ fontWeight: 700, color: '#4c1d95', fontSize: '0.94rem', lineHeight: 1.45 }}>
                          {fab.advantage}
                        </div>
                      </div>

                      {/* 3. Benefit (Grün) */}
                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '1.1rem' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                          = Vorteil Kunde (Ihr Ergebnis)
                        </div>
                        <div style={{ fontWeight: 700, color: '#064e3b', fontSize: '0.94rem', lineHeight: 1.45 }}>
                          {fab.benefit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 🧩 2e. OPTIONALE AUSBAU-MODULE (NUR IN VERSION 2: BELEG-FOKUS + ZUSATZMODULE) */}
            {currentContent.expansionModules && (
              <section className="section-padding" style={{ background: 'var(--bg-subtle)', borderRadius: '18px', marginBottom: '2rem' }}>
                <div className="section-header text-center">
                  <span className="sec-badge">{currentContent.expansionModules.badge}</span>
                  <h2 className="sec-title">{currentContent.expansionModules.title}</h2>
                  <p className="sec-subtitle">{currentContent.expansionModules.subtitle}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                  {currentContent.expansionModules.modules.map((mod, mIdx) => (
                    <div key={mIdx} style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '14px',
                      padding: '1.65rem',
                      boxShadow: 'var(--card-shadow)'
                    }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>
                        {mod.tag}
                      </span>
                      <h3 style={{ fontSize: '1.18rem', fontWeight: 800, margin: '0.3rem 0 0.75rem', color: 'var(--text-main)' }}>
                        {mod.title}
                      </h3>
                      <div style={{ fontSize: '0.86rem', color: '#be123c', background: '#fff1f2', padding: '0.65rem 0.85rem', borderRadius: '8px', marginBottom: '0.75rem' }}>
                        <strong>Verhindert:</strong> {mod.problem}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#065f46', background: '#ecfdf5', padding: '0.75rem 0.85rem', borderRadius: '8px' }}>
                        <strong>Ihr Gewinn:</strong> {mod.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. TOOL-GRID: "IHRE SYSTEME BLEIBEN" */}
            <section className="section-padding tools-section">
              <div className="section-header text-center">
                <span className="sec-badge">{currentContent.integrations.badge}</span>
                <h2 className="sec-title">{currentContent.integrations.title}</h2>
                <p className="sec-subtitle">{currentContent.integrations.subtitle}</p>
              </div>

              <div className="tools-grid">
                {currentContent.integrations.tools.map((tool, idx) => (
                  <div key={idx} className="tool-card">
                    <div className="tool-header">
                      <div className="tool-indicator-dot"></div>
                      <span className="tool-role">{tool.role}</span>
                    </div>
                    <h4 className="tool-name">{tool.name}</h4>
                    <p className="tool-desc">{tool.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bridge-banner">
                <div className="bridge-icon">
                  <Workflow size={28} />
                </div>
                <div className="bridge-text">
                  <strong>Keine Umschulung Ihrer Mitarbeiter nötig:</strong> Fotos werden wie gewohnt per Smartphone gemacht – der Rest passiert lautlos und automatisch im Hintergrund.
                </div>
              </div>
            </section>

            {/* 4. DREISTUFIGE PREISTREPPE (PRODUCTIZED SERVICES) */}
            <section className="section-padding pricing-section" id="pricing-section">
              <div className="section-header text-center">
                <span className="sec-badge">FESTE PAKETPREISE STATT STUNDENSÄTZE</span>
                <h2 className="sec-title">Die dreistufige Preistreppe</h2>
                <p className="sec-subtitle">
                  Transparente Festpreise, garantierte Ergebnisse und keine versteckten IT-Zusatzkosten.
                </p>
              </div>

              <div className="pricing-grid">
                {currentContent.pricingTiers.map((tier) => (
                  <div 
                    key={tier.id} 
                    className={`pricing-card ${tier.highlight ? 'highlighted' : ''}`}
                  >
                    {tier.badge && (
                      <div className="pricing-card-badge">{tier.badge}</div>
                    )}

                    <div className="pricing-card-top">
                      <span className="pricing-level">{tier.level}</span>
                      <h3 className="pricing-title">{tier.title}</h3>
                      <p className="pricing-tagline">{tier.tagline}</p>
                    </div>

                    <div className="pricing-price-box">
                      <div className="price-main">
                        <span className="price-num">{tier.price}</span>
                        <span className="price-suffix">{tier.priceSuffix}</span>
                      </div>
                      {tier.fundingNote && (
                        <div className="funding-pill">
                          {tier.fundingNote}
                        </div>
                      )}
                    </div>

                    <p className="pricing-desc">{tier.description}</p>

                    <div className="pricing-features-list">
                      <div className="features-headline">Im Paket enthalten:</div>
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="feature-item">
                          <Check size={16} className="feature-check" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className={`pricing-btn ${tier.highlight ? 'btn-highlight' : 'btn-outline'}`}
                      onClick={() => selectPackageForContact(tier.targetTopic)}
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Fördermittel-Banner unter den Preisen */}
              <div className="funding-highlight-box">
                <div className="funding-content">
                  <div className="funding-icon-wrap">
                    <Euro size={32} />
                  </div>
                  <div>
                    <h4 className="funding-h4">{currentContent.funding.title}</h4>
                    <p className="funding-p">{currentContent.funding.desc}</p>
                    <div className="funding-badges-row">
                      {currentContent.funding.programs.map((p, pIdx) => (
                        <span key={pIdx} className="funding-program-badge">
                          🏛️ {p.name}: <strong>{p.quota}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn-secondary-sm"
                  onClick={() => selectPackageForContact("Fragen zu Fördermitteln (Digital Innovation / INQA)")}
                >
                  Förderung prüfen
                </button>
              </div>
            </section>

            {/* 5. 3-SCHRITTE WORKFLOW DER BELEGERFASSUNG */}
            <section className="section-padding workflow-section" id="workflow-section">
              <div className="section-header text-center">
                <span className="sec-badge">{currentContent.workflow.badge}</span>
                <h2 className="sec-title">{currentContent.workflow.title}</h2>
                <p className="sec-subtitle">{currentContent.workflow.subtitle}</p>
              </div>

              <div className="showcase-card">
                
                {/* Header & Zielgruppe */}
                <div className="showcase-top">
                  <div>
                    <span className="client-industry">{currentContent.workflow.targetAudience}</span>
                    <h3 className="client-name">Vom Smartphone-Foto zur DATEV-Kanzlei</h3>
                  </div>

                  {/* Before / After Toggle Buttons */}
                  <div className="toggle-pill-group">
                    <button
                      type="button"
                      className={`toggle-pill ${workflowMode === 'before' ? 'active-before' : ''}`}
                      onClick={() => setWorkflowMode('before')}
                    >
                      Vorher (Chaos)
                    </button>
                    <button
                      type="button"
                      className={`toggle-pill ${workflowMode === 'after' ? 'active-after' : ''}`}
                      onClick={() => setWorkflowMode('after')}
                    >
                      ✨ Nachher (Automatisiert)
                    </button>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="showcase-metrics-grid">
                  {currentContent.workflow.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="metric-box">
                      <div className="metric-val">{m.value}</div>
                      <div className="metric-lbl">{m.label}</div>
                      <div className="metric-sub">{m.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Interactive Before/After Card Content */}
                <div className="showcase-comparison-area">
                  {workflowMode === 'before' ? (
                    <div className="comparison-pane pane-before">
                      <div className="pane-title text-danger">
                        <XCircle size={20} />
                        <span>{currentContent.workflow.beforeAfter.before.title}</span>
                      </div>
                      <ul className="comparison-list">
                        {currentContent.workflow.beforeAfter.before.items.map((it, itIdx) => (
                          <li key={itIdx}>
                            <span className="bullet-cross">✕</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="comparison-pane pane-after">
                      <div className="pane-title text-success">
                        <CheckCircle size={20} />
                        <span>{currentContent.workflow.beforeAfter.after.title}</span>
                      </div>
                      <ul className="comparison-list">
                        {currentContent.workflow.beforeAfter.after.items.map((it, itIdx) => (
                          <li key={itIdx}>
                            <span className="bullet-check">✓</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Quote Box */}
                <div className="showcase-quote">
                  <p>{currentContent.workflow.quote}</p>
                  <cite>— {currentContent.workflow.quoteAuthor}</cite>
                </div>

                {/* 3-Schritte Workflow */}
                <div className="workflow-steps-container">
                  <div className="workflow-title">Der lautlose Beleg-Ablauf im Alltag:</div>
                  <div className="workflow-steps-row">
                    {currentContent.workflow.workflowSteps.map((ws, wsIdx) => (
                      <div key={wsIdx} className="workflow-step-card">
                        <div className="ws-num">{ws.num}</div>
                        <div className="ws-title">{ws.title}</div>
                        <div className="ws-desc">{ws.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* 6. INTERAKTIVER BÜRO-WOCHENENDE-RECHNER */}
            <section className="section-padding roi-section" id="roi-section">
              <div className="section-header text-center">
                <span className="sec-badge">{currentContent.roiCalculator.badge}</span>
                <h2 className="sec-title">{currentContent.roiCalculator.title}</h2>
                <p className="sec-subtitle">{currentContent.roiCalculator.subtitle}</p>
              </div>

              <div className="roi-calculator-card">
                
                {/* Inputs Left */}
                <div className="roi-controls">
                  
                  {/* Slider 1: Mitarbeiter */}
                  <div className="control-group">
                    <div className="control-label-row">
                      <label htmlFor="roi-employees">Mitarbeiter im Betrieb:</label>
                      <span className="control-val">{roiEmployees} Mitarbeiter</span>
                    </div>
                    <input 
                      id="roi-employees"
                      type="range" 
                      min="1" 
                      max="20" 
                      value={roiEmployees}
                      onChange={(e) => setRoiEmployees(parseInt(e.target.value))}
                      className="roi-slider"
                    />
                    <div className="slider-hints">
                      <span>1 (Solo-Meister)</span>
                      <span>10</span>
                      <span>20 Mitarbeiter</span>
                    </div>
                  </div>

                  {/* Slider 2: Belege & Zettel pro Woche */}
                  <div className="control-group">
                    <div className="control-label-row">
                      <label htmlFor="roi-receipts">Belege, Lieferscheine & Zettel pro Woche:</label>
                      <span className="control-val">{roiReceiptsPerWeek} Stück</span>
                    </div>
                    <input 
                      id="roi-receipts"
                      type="range" 
                      min="10" 
                      max="150" 
                      step="5"
                      value={roiReceiptsPerWeek}
                      onChange={(e) => setRoiReceiptsPerWeek(parseInt(e.target.value))}
                      className="roi-slider"
                    />
                    <div className="slider-hints">
                      <span>10 Belege</span>
                      <span>75</span>
                      <span>150 Belege / Wo.</span>
                    </div>
                  </div>

                  {/* Slider 3: Meister- / Bürostundensatz */}
                  <div className="control-group">
                    <div className="control-label-row">
                      <label htmlFor="roi-wage">Kalkulierter Stundenwert (Meister/Büro):</label>
                      <span className="control-val">{roiHourlyRate} € / Std.</span>
                    </div>
                    <input 
                      id="roi-wage"
                      type="range" 
                      min="35" 
                      max="95" 
                      step="5"
                      value={roiHourlyRate}
                      onChange={(e) => setRoiHourlyRate(parseInt(e.target.value))}
                      className="roi-slider"
                    />
                    <div className="slider-hints">
                      <span>35 € / h</span>
                      <span>65 €</span>
                      <span>95 € / h</span>
                    </div>
                  </div>

                </div>

                {/* Results Right */}
                <div className="roi-results-panel">
                  <div className="results-badge">IHRE GESCHÄTZTE ENTLASTUNG</div>

                  {/* Saved Sundays Highlight */}
                  <div className="sundays-highlight-card">
                    <div className="sundays-icon">
                      <Calendar size={28} />
                    </div>
                    <div>
                      <div className="sundays-number">ca. {savedSundaysPerYear} freie Wochenenden</div>
                      <div className="sundays-desc">pro Jahr ohne Büro-Arbeit & Zettelstapel</div>
                    </div>
                  </div>

                  {/* KPI Grid */}
                  <div className="results-kpi-grid">
                    <div className="kpi-mini">
                      <span className="kpi-mini-lbl">Monatliche Zeitersparnis:</span>
                      <span className="kpi-mini-val">~{monthlyHoursSaved} Stunden</span>
                    </div>
                    <div className="kpi-mini">
                      <span className="kpi-mini-lbl">Monetärer Jahreswert:</span>
                      <span className="kpi-mini-val text-accent">~{yearlyEuroSaved.toLocaleString('de-DE')} €</span>
                    </div>
                  </div>

                  <p className="roi-disclaimer">
                    *Basis: Durchschnittliche Reduzierung von 75 % des manuellen Erfassungs- & Vorkontierungsaufwands bei digitaler Belegkette nach Lexoffice & DATEV.
                  </p>

                  <button 
                    type="button" 
                    className="btn-primary-glow w-full"
                    onClick={() => selectPackageForContact(`Potenzial berechnet (${savedSundaysPerYear} Wochenenden, ~${yearlyEuroSaved.toLocaleString('de-DE')} €/Jahr)`)}
                  >
                    <span>Ergebnis im Erstgespräch besprechen</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

              </div>

              {/* 6b. VALUE-FIRST E-MAIL-GATE: PDF LEAD-MAGNET (5-MINUTEN BÜRO-STRESS-TEST) */}
              {currentContent.leadMagnet && (
                <div style={{
                  maxWidth: '980px',
                  margin: '2rem auto 0',
                  background: 'var(--bg-card)',
                  border: '2px solid var(--primary)',
                  borderRadius: '18px',
                  padding: '2rem',
                  boxShadow: 'var(--card-shadow)'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <span className="sec-badge">{currentContent.leadMagnet.badge}</span>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.4rem 0 0.5rem', color: 'var(--text-main)' }}>
                      {currentContent.leadMagnet.title}
                    </h3>
                    <p style={{ fontSize: '0.93rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      {currentContent.leadMagnet.subtitle}
                    </p>
                  </div>

                  {currentContent.leadMagnet.bullets && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.65rem', marginBottom: '1.25rem' }}>
                      {currentContent.leadMagnet.bullets.map((b, bIdx) => (
                        <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                          <Check size={16} className="feature-check" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {leadMagnetSubmitted ? (
                    <div style={{
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      color: '#065f46'
                    }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.35rem' }}>
                        ✓ Perfekt! Ihr 5-Minuten Büro-Stress-Test & E-Rechnungs-Check ist für {leadMagnetEmail} reserviert!
                      </div>
                      <p style={{ fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                        Ihre persönliche Rechner-Auswertung (<strong>ca. {savedSundaysPerYear} freie Wochenenden / ~{monthlyHoursSaved} Std. pro Monat</strong>) wurde automatisch beigefügt.
                      </p>
                      <button
                        type="button"
                        className="btn-outline-sm"
                        onClick={() => setLeadMagnetSubmitted(false)}
                      >
                        Andere E-Mail-Adresse eingeben
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadMagnetSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem', alignItems: 'center' }}>
                      <input
                        type="email"
                        required
                        placeholder={currentContent.leadMagnet.emailPlaceholder}
                        value={leadMagnetEmail}
                        onChange={(e) => setLeadMagnetEmail(e.target.value)}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder={currentContent.leadMagnet.companyPlaceholder}
                        value={leadMagnetCompany}
                        onChange={(e) => setLeadMagnetCompany(e.target.value)}
                        className="form-input"
                      />
                      <button type="submit" className="btn-primary-glow" style={{ justifyContent: 'center' }}>
                        <span>{currentContent.leadMagnet.ctaText}</span>
                        <ArrowRight size={16} />
                      </button>
                    </form>
                  )}

                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.7rem' }}>
                    🔒 {currentContent.leadMagnet.privacyHint}
                  </div>
                </div>
              )}
            </section>

            {/* 7. FAQ AKKORDEON */}
            <section className="section-padding faq-section">
              <div className="section-header text-center">
                <span className="sec-badge">HÄUFIGE FRAGEN</span>
                <h2 className="sec-title">Fragen aus dem Handwerksalltag</h2>
                <p className="sec-subtitle">Alles, was Sie über Ablauf, DATEV-Anbindung und Betreuung wissen müssen.</p>
              </div>

              <div className="faq-list">
                {currentContent.faq.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`}
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  >
                    <div className="faq-question-row">
                      <h4 className="faq-q">{item.q}</h4>
                      <span className="faq-chevron">
                        <ChevronDown size={18} />
                      </span>
                    </div>
                    {openFaqIndex === idx && (
                      <div className="faq-answer-row">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 8. KONTAKT & ERSTGESPRÄCH ANFRAGEN */}
            <section className="section-padding contact-section" id="contact-section">
              <div className="section-header text-center">
                <span className="sec-badge">{currentContent.contact.badge}</span>
                <h2 className="sec-title">{currentContent.contact.title}</h2>
                <p className="sec-subtitle">{currentContent.contact.subtitle}</p>
              </div>

              <div className="contact-card-grid">
                
                {/* Formular Links */}
                <div className="contact-form-box">
                  {contactSubmitted ? (
                    <div className="contact-success-state">
                      <div className="success-icon-wrap">
                        <CheckCircle size={44} />
                      </div>
                      <h3>Vielen Dank für Ihre Anfrage!</h3>
                      <p>Wir haben Ihre Daten erhalten. Robin Gornitzka meldet sich innerhalb von 24 Stunden persönlich bei Ihnen für das 15-minütige Erstgespräch.</p>
                      <button 
                        type="button" 
                        className="btn-outline-sm"
                        onClick={() => setContactSubmitted(false)}
                      >
                        Weitere Nachricht senden
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="contact-form">
                      <div className="form-group">
                        <label htmlFor="form-name">{currentContent.contact.fields.name} *</label>
                        <input 
                          id="form-name"
                          type="text" 
                          required
                          placeholder="z. B. Frank Müller, Elektro Meisterbetrieb"
                          value={contactData.name}
                          onChange={e => setContactData({...contactData, name: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-row-2">
                        <div className="form-group">
                          <label htmlFor="form-company">{currentContent.contact.fields.company}</label>
                          <input 
                            id="form-company"
                            type="text" 
                            placeholder="z. B. Müller SHK GmbH"
                            value={contactData.company}
                            onChange={e => setContactData({...contactData, company: e.target.value})}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="form-phone">{currentContent.contact.fields.phone} *</label>
                          <input 
                            id="form-phone"
                            type="tel" 
                            required
                            placeholder="z. B. 0171 / 1234567"
                            value={contactData.phone}
                            onChange={e => setContactData({...contactData, phone: e.target.value})}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="form-email">{currentContent.contact.fields.email} *</label>
                        <input 
                          id="form-email"
                          type="email" 
                          required
                          placeholder="frank@mueller-shk.de"
                          value={contactData.email}
                          onChange={e => setContactData({...contactData, email: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="form-topic">{currentContent.contact.fields.topic}</label>
                        <select 
                          id="form-topic"
                          value={contactData.topic}
                          onChange={e => setContactData({...contactData, topic: e.target.value})}
                          className="form-select"
                        >
                          {currentContent.contact.topicOptions.map((opt, idx) => (
                            <option key={idx} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="form-msg">{currentContent.contact.fields.message}</label>
                        <textarea 
                          id="form-msg"
                          rows="3"
                          placeholder="Beschreiben Sie kurz Ihre Situation (z. B. Papierbelege, Zettelwirtschaft, DATEV-Vorkontierung)..."
                          value={contactData.message}
                          onChange={e => setContactData({...contactData, message: e.target.value})}
                          className="form-textarea"
                        ></textarea>
                      </div>

                      <button type="submit" className="btn-primary-glow w-full">
                        <Send size={16} />
                        <span>Kostenloses Erstgespräch anfragen</span>
                      </button>

                      {/* WhatsApp Direct Action */}
                      <a 
                        href={`https://wa.me/${(currentContent.brand.whatsapp || '4915112345678').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hallo Robin, ich interessiere mich für die digitale Belegerfassung für meinen Betrieb.')}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-whatsapp-direct"
                      >
                        <MessageSquare size={16} />
                        <span>Direkt per WhatsApp schreiben</span>
                      </a>

                      <div className="form-privacy-hint">
                        🔒 Ihre Angaben werden streng vertraulich nach DSGVO verarbeitet. Keine Werbeanrufe.
                      </div>
                    </form>
                  )}
                </div>

                {/* Kontaktdaten & Regionales Versprechen Rechts */}
                <div className="contact-info-panel">
                  <div className="contact-info-top">
                    <span className="sec-badge">PERSÖNLICH VOR ORT</span>
                    <h3>KMU Service Harz</h3>
                    <p className="contact-role-sub">Ihr Ansprechpartner: <strong>{currentContent.brand.owner}</strong></p>
                  </div>

                  <div className="contact-details-stack">
                    <div className="contact-detail-row">
                      <div className="cd-icon"><MapPin size={18} /></div>
                      <div>
                        <div className="cd-label">Standort & Region:</div>
                        <div className="cd-val">{currentContent.brand.location}</div>
                        <div className="cd-sub">{currentContent.brand.regionDetail}</div>
                      </div>
                    </div>

                    <div className="contact-detail-row">
                      <div className="cd-icon"><Mail size={18} /></div>
                      <div>
                        <div className="cd-label">E-Mail:</div>
                        <div className="cd-val">{currentContent.brand.email}</div>
                      </div>
                    </div>

                    <div className="contact-detail-row">
                      <div className="cd-icon"><Phone size={18} /></div>
                      <div>
                        <div className="cd-label">Telefon / Rückruf:</div>
                        <div className="cd-val">{currentContent.brand.phone}</div>
                      </div>
                    </div>
                  </div>

                  <div className="regional-promise-card">
                    <div className="promise-title">🤝 Das Harzer Handschlag-Versprechen</div>
                    <p>
                      Wir sprechen kein IT-Fachchinesisch, wir verlangen keine unberechenbaren Stundenhonorare und wir zwingen Ihnen keine neue Software auf.
                    </p>
                  </div>
                </div>

              </div>
            </section>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 📦 SUBPAGE: PREISE & ANGEBOTE */}
        {/* ========================================================================= */}
        {activePage === 'services' && (
          <div className="page-fade-in subpage-container">
            <div className="subpage-header text-center">
              <span className="sec-badge">TRANSPARENTE FESTPREISE</span>
              <h1>Unsere 3-stufige Preistreppe</h1>
              <p className="subpage-lead">
                Wählen Sie das Paket, das exakt zu Ihrem aktuellen Betriebsbedarf passt.
              </p>
            </div>

            <div className="pricing-grid">
              {currentContent.pricingTiers.map((tier) => (
                <div 
                  key={tier.id} 
                  className={`pricing-card ${tier.highlight ? 'highlighted' : ''}`}
                >
                  {tier.badge && (
                    <div className="pricing-card-badge">{tier.badge}</div>
                  )}

                  <div className="pricing-card-top">
                    <span className="pricing-level">{tier.level}</span>
                    <h3 className="pricing-title">{tier.title}</h3>
                    <p className="pricing-tagline">{tier.tagline}</p>
                  </div>

                  <div className="pricing-price-box">
                    <div className="price-main">
                      <span className="price-num">{tier.price}</span>
                      <span className="price-suffix">{tier.priceSuffix}</span>
                    </div>
                    {tier.fundingNote && (
                      <div className="funding-pill">
                        {tier.fundingNote}
                      </div>
                    )}
                  </div>

                  <p className="pricing-desc">{tier.description}</p>

                  <div className="pricing-features-list">
                    <div className="features-headline">Im Paket enthalten:</div>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="feature-item">
                        <Check size={16} className="feature-check" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={`pricing-btn ${tier.highlight ? 'btn-highlight' : 'btn-outline'}`}
                    onClick={() => selectPackageForContact(tier.targetTopic)}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Förderprogramme Deep Dive */}
            <div className="funding-highlight-box mt-8">
              <div className="funding-content">
                <div className="funding-icon-wrap"><Euro size={32} /></div>
                <div>
                  <h4 className="funding-h4">{currentContent.funding.title}</h4>
                  <p className="funding-p">{currentContent.funding.desc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 🔄 SUBPAGE: WORKFLOW DER BELEGERFASSUNG */}
        {/* ========================================================================= */}
        {(activePage === 'workflow' || activePage === 'showcase') && (
          <div className="page-fade-in subpage-container">
            <div className="subpage-header text-center">
              <span className="sec-badge">PRAXIS-ABLAUF</span>
              <h1>{currentContent.workflow.title}</h1>
              <p className="subpage-lead">{currentContent.workflow.subtitle}</p>
            </div>

            <div className="showcase-card">
              <div className="showcase-top">
                <div>
                  <span className="client-industry">{currentContent.workflow.targetAudience}</span>
                  <h3 className="client-name">Vom Foto vor Ort direkt in die Kanzlei</h3>
                </div>
                <div className="toggle-pill-group">
                  <button
                    type="button"
                    className={`toggle-pill ${workflowMode === 'before' ? 'active-before' : ''}`}
                    onClick={() => setWorkflowMode('before')}
                  >
                    Vorher (Chaos)
                  </button>
                  <button
                    type="button"
                    className={`toggle-pill ${workflowMode === 'after' ? 'active-after' : ''}`}
                    onClick={() => setWorkflowMode('after')}
                  >
                    ✨ Nachher (Automatisiert)
                  </button>
                </div>
              </div>

              <div className="showcase-metrics-grid">
                {currentContent.workflow.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="metric-box">
                    <div className="metric-val">{m.value}</div>
                    <div className="metric-lbl">{m.label}</div>
                    <div className="metric-sub">{m.sub}</div>
                  </div>
                ))}
              </div>

              <div className="showcase-comparison-area">
                {workflowMode === 'before' ? (
                  <div className="comparison-pane pane-before">
                    <div className="pane-title text-danger">
                      <XCircle size={20} />
                      <span>{currentContent.workflow.beforeAfter.before.title}</span>
                    </div>
                    <ul className="comparison-list">
                      {currentContent.workflow.beforeAfter.before.items.map((it, itIdx) => (
                        <li key={itIdx}>
                          <span className="bullet-cross">✕</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="comparison-pane pane-after">
                    <div className="pane-title text-success">
                      <CheckCircle size={20} />
                      <span>{currentContent.workflow.beforeAfter.after.title}</span>
                    </div>
                    <ul className="comparison-list">
                      {currentContent.workflow.beforeAfter.after.items.map((it, itIdx) => (
                        <li key={itIdx}>
                          <span className="bullet-check">✓</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="showcase-quote">
                <p>{currentContent.workflow.quote}</p>
                <cite>— {currentContent.workflow.quoteAuthor}</cite>
              </div>

              <div className="workflow-steps-container mt-6">
                <div className="workflow-title">Die 3 Schritte im Alltag:</div>
                <div className="workflow-steps-row">
                  {currentContent.workflow.workflowSteps.map((ws, wsIdx) => (
                    <div key={wsIdx} className="workflow-step-card">
                      <div className="ws-num">{ws.num}</div>
                      <div className="ws-title">{ws.title}</div>
                      <div className="ws-desc">{ws.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-6">
                <button 
                  type="button" 
                  className="btn-primary-glow"
                  onClick={() => selectPackageForContact("Belegerfassungs-Workflow – Einrichtung anfragen")}
                >
                  <span>Lösung für Ihren Betrieb anfragen</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 🧮 SUBPAGE: BÜRO-WOCHENENDE-RECHNER */}
        {/* ========================================================================= */}
        {activePage === 'roi' && (
          <div className="page-fade-in subpage-container">
            <div className="subpage-header text-center">
              <span className="sec-badge">INTERAKTIVER RECHNER</span>
              <h1>Büro-Wochenende- & Zeitersparnis-Rechner</h1>
              <p className="subpage-lead">{currentContent.roiCalculator.subtitle}</p>
            </div>

            <div className="roi-calculator-card">
              <div className="roi-controls">
                <div className="control-group">
                  <div className="control-label-row">
                    <label htmlFor="subpage-roi-emp">Mitarbeiter im Betrieb:</label>
                    <span className="control-val">{roiEmployees} Mitarbeiter</span>
                  </div>
                  <input 
                    id="subpage-roi-emp"
                    type="range" 
                    min="1" 
                    max="20" 
                    value={roiEmployees}
                    onChange={(e) => setRoiEmployees(parseInt(e.target.value))}
                    className="roi-slider"
                  />
                </div>

                <div className="control-group">
                  <div className="control-label-row">
                    <label htmlFor="subpage-roi-rec">Belege & Zettel pro Woche:</label>
                    <span className="control-val">{roiReceiptsPerWeek} Stück</span>
                  </div>
                  <input 
                    id="subpage-roi-rec"
                    type="range" 
                    min="10" 
                    max="150" 
                    step="5"
                    value={roiReceiptsPerWeek}
                    onChange={(e) => setRoiReceiptsPerWeek(parseInt(e.target.value))}
                    className="roi-slider"
                  />
                </div>

                <div className="control-group">
                  <div className="control-label-row">
                    <label htmlFor="subpage-roi-wage">Kalkulierter Stundenwert:</label>
                    <span className="control-val">{roiHourlyRate} € / Std.</span>
                  </div>
                  <input 
                    id="subpage-roi-wage"
                    type="range" 
                    min="35" 
                    max="95" 
                    step="5"
                    value={roiHourlyRate}
                    onChange={(e) => setRoiHourlyRate(parseInt(e.target.value))}
                    className="roi-slider"
                  />
                </div>
              </div>

              <div className="roi-results-panel">
                <div className="results-badge">IHRE ENTLASTUNG</div>
                <div className="sundays-highlight-card">
                  <div className="sundays-icon"><Calendar size={28} /></div>
                  <div>
                    <div className="sundays-number">ca. {savedSundaysPerYear} freie Wochenenden</div>
                    <div className="sundays-desc">pro Jahr ohne Büroarbeit</div>
                  </div>
                </div>

                <div className="results-kpi-grid">
                  <div className="kpi-mini">
                    <span className="kpi-mini-lbl">Monatlich eingespart:</span>
                    <span className="kpi-mini-val">~{monthlyHoursSaved} Std.</span>
                  </div>
                  <div className="kpi-mini">
                    <span className="kpi-mini-lbl">Monetärer Jahreswert:</span>
                    <span className="kpi-mini-val text-accent">~{yearlyEuroSaved.toLocaleString('de-DE')} €</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="btn-primary-glow w-full"
                  onClick={() => selectPackageForContact(`Potenzial berechnet (${savedSundaysPerYear} Wochenenden)`)}
                >
                  <span>Ergebnis im Erstgespräch besprechen</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 👤 SUBPAGE: ÜBER UNS */}
        {/* ========================================================================= */}
        {activePage === 'about' && (
          <div className="page-fade-in subpage-container">
            <div className="subpage-header text-center">
              <span className="sec-badge">{currentContent.about.badge}</span>
              <h1>{currentContent.about.title}</h1>
              <p className="subpage-lead">{currentContent.about.subtitle}</p>
            </div>

            <div className="about-grid">
              <div className="about-story-card">
                <h3>Unsere Mission im Harz</h3>
                <p className="about-story-p">{currentContent.about.story}</p>
                <div className="about-owner-box">
                  <div className="owner-avatar">
                    <UserCheck size={28} />
                  </div>
                  <div>
                    <strong>{currentContent.about.ownerName}</strong>
                    <p>{currentContent.about.ownerRole}</p>
                    <span className="owner-loc">📍 {currentContent.about.location}</span>
                  </div>
                </div>
              </div>

              <div className="about-values-stack">
                {currentContent.about.values.map((val, vIdx) => (
                  <div key={vIdx} className="value-card">
                    <h4>{val.title}</h4>
                    <p>{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 📞 SUBPAGE: KONTAKT */}
        {/* ========================================================================= */}
        {activePage === 'contact' && (
          <div className="page-fade-in subpage-container">
            <div className="subpage-header text-center">
              <span className="sec-badge">{currentContent.contact.badge}</span>
              <h1>{currentContent.contact.title}</h1>
              <p className="subpage-lead">{currentContent.contact.subtitle}</p>
            </div>

            <div className="contact-card-grid">
              <div className="contact-form-box">
                {contactSubmitted ? (
                  <div className="contact-success-state">
                    <div className="success-icon-wrap"><CheckCircle size={44} /></div>
                    <h3>Vielen Dank für Ihre Anfrage!</h3>
                    <p>Robin Gornitzka meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.</p>
                    <button type="button" className="btn-outline-sm" onClick={() => setContactSubmitted(false)}>
                      Weitere Nachricht senden
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="sub-name">{currentContent.contact.fields.name} *</label>
                      <input 
                        id="sub-name"
                        type="text" 
                        required
                        value={contactData.name}
                        onChange={e => setContactData({...contactData, name: e.target.value})}
                        className="form-input"
                      />
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="sub-comp">{currentContent.contact.fields.company}</label>
                        <input 
                          id="sub-comp"
                          type="text" 
                          value={contactData.company}
                          onChange={e => setContactData({...contactData, company: e.target.value})}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="sub-phone">{currentContent.contact.fields.phone} *</label>
                        <input 
                          id="sub-phone"
                          type="tel" 
                          required
                          value={contactData.phone}
                          onChange={e => setContactData({...contactData, phone: e.target.value})}
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="sub-email">{currentContent.contact.fields.email} *</label>
                      <input 
                        id="sub-email"
                        type="email" 
                        required
                        value={contactData.email}
                        onChange={e => setContactData({...contactData, email: e.target.value})}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sub-topic">{currentContent.contact.fields.topic}</label>
                      <select 
                        id="sub-topic"
                        value={contactData.topic}
                        onChange={e => setContactData({...contactData, topic: e.target.value})}
                        className="form-select"
                      >
                        {currentContent.contact.topicOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="sub-msg">{currentContent.contact.fields.message}</label>
                      <textarea 
                        id="sub-msg"
                        rows="3"
                        value={contactData.message}
                        onChange={e => setContactData({...contactData, message: e.target.value})}
                        className="form-textarea"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn-primary-glow w-full">
                      <Send size={16} />
                      <span>Kostenloses Erstgespräch anfragen</span>
                    </button>

                    <a 
                      href={`https://wa.me/${(currentContent.brand.whatsapp || '4915112345678').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hallo Robin, ich interessiere mich für die digitale Belegerfassung für meinen Betrieb.')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-whatsapp-direct"
                    >
                      <MessageSquare size={16} />
                      <span>Direkt per WhatsApp schreiben</span>
                    </a>
                  </form>
                )}
              </div>

              <div className="contact-info-panel">
                <div className="contact-info-top">
                  <span className="sec-badge">REGIONALER PARTNER</span>
                  <h3>KMU Service Harz</h3>
                  <p className="contact-role-sub">Inhaber: <strong>{currentContent.brand.owner}</strong></p>
                </div>
                <div className="contact-details-stack">
                  <div className="contact-detail-row">
                    <div className="cd-icon"><MapPin size={18} /></div>
                    <div>
                      <div className="cd-label">Standort:</div>
                      <div className="cd-val">{currentContent.brand.location}</div>
                      <div className="cd-sub">{currentContent.brand.regionDetail}</div>
                    </div>
                  </div>
                  <div className="contact-detail-row">
                    <div className="cd-icon"><Mail size={18} /></div>
                    <div>
                      <div className="cd-label">E-Mail:</div>
                      <div className="cd-val">{currentContent.brand.email}</div>
                    </div>
                  </div>
                  <div className="contact-detail-row">
                    <div className="cd-icon"><Phone size={18} /></div>
                    <div>
                      <div className="cd-label">Telefon:</div>
                      <div className="cd-val">{currentContent.brand.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ⚖️ SUBPAGE: IMPRESSUM */}
        {/* ========================================================================= */}
        {activePage === 'impressum' && (
          <div className="page-fade-in legal-container">
            <span className="sec-badge">RECHTLICHE ANGABEN</span>
            <h1>{currentContent.impressum.title}</h1>
            <p className="legal-lead">{currentContent.impressum.legalNotice}</p>

            <div className="legal-card">
              {currentContent.impressum.details.map((item, idx) => (
                <div key={idx} className="legal-item-row">
                  <strong className="legal-label">{item.label}:</strong>
                  <span className="legal-val">{item.value}</span>
                </div>
              ))}
              <div className="legal-disclaimer-box">
                <p>{currentContent.impressum.disclaimer}</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 🔒 SUBPAGE: DATENSCHUTZ */}
        {/* ========================================================================= */}
        {activePage === 'privacy' && (
          <div className="page-fade-in legal-container">
            <span className="sec-badge">DATENSCHUTZ</span>
            <h1>{currentContent.privacy.title}</h1>
            <p className="legal-lead">{currentContent.privacy.intro}</p>

            <div className="legal-sections-stack">
              {currentContent.privacy.sections.map((sec, idx) => (
                <div key={idx} className="legal-card mb-4">
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
            <div className="footer-logo-row">
              <div className="footer-logo-icon">
                <Workflow size={18} />
              </div>
              <strong className="footer-brand-name">{currentContent.brand.name}</strong>
            </div>
            <p className="footer-brand-claim">{currentContent.brand.claim}</p>
            <span className="footer-copyright">
              © {new Date().getFullYear()} {currentContent.brand.owner}. {currentContent.brand.location}.
            </span>
          </div>

          <div className="footer-nav-links">
            {currentContent.nav.map(item => (
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

      {/* 🚀 EXPORT & LIVE-SCHALTUNG MODAL */}
      {showExportModal && (
        <div className="export-modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="export-modal-card" onClick={e => e.stopPropagation()}>
            
            <div className="export-modal-header">
              <div className="export-header-title">
                <div className="export-icon-badge">
                  <CloudUpload size={22} />
                </div>
                <div>
                  <h3>Website Export & Live-Schaltung (Alle 3 Versionen)</h3>
                  <p>Wähle aus, welche der 3 Website-Versionen du als schlüsselfertige HTML-Datei herunterladen möchtest.</p>
                </div>
              </div>
              <button 
                type="button" 
                className="export-close-btn"
                onClick={() => setShowExportModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Version Selection inside Export Modal */}
            <div className="export-config-box" style={{ paddingBottom: '0.5rem' }}>
              <label htmlFor="export-version-select">
                <Layers size={14} />
                <span>Zu exportierende Website-Version wählen:</span>
              </label>
              <select
                id="export-version-select"
                value={exportVersionId}
                onChange={e => setExportVersionId(e.target.value)}
                className="export-email-field"
                style={{ marginBottom: '0.5rem', fontWeight: 700 }}
              >
                {WEBSITE_VERSIONS.map(v => (
                  <option key={v.id} value={v.id}>{v.label}</option>
                ))}
              </select>
            </div>

            {/* Email Configuration Field */}
            <div className="export-config-box">
              <label htmlFor="export-email-input">
                <Mail size={14} />
                <span>Ziel-E-Mail für das Kontaktformular:</span>
              </label>
              <input 
                id="export-email-input"
                type="email" 
                value={exportEmail} 
                onChange={e => setExportEmail(e.target.value)}
                placeholder="kontakt@kmu-service-harz.de"
                className="export-email-field"
              />
              <span className="export-config-hint">
                💡 Anfragen von der Live-Website werden automatisch via FormSubmit an diese Adresse gesendet.
              </span>
            </div>

            {/* Quick Actions Buttons */}
            <div className="export-actions-row">
              <button 
                type="button" 
                className="export-download-btn"
                onClick={() => downloadStandaloneHtml(exportVersionId)}
              >
                <Download size={18} />
                <span>HTML herunterladen ({exportVersionId.toUpperCase()})</span>
              </button>

              <button 
                type="button" 
                className="export-copy-btn"
                onClick={() => copyStandaloneHtml(exportVersionId)}
              >
                {copiedCode ? <Check size={18} className="text-emerald" /> : <Copy size={18} />}
                <span>{copiedCode ? 'In Zwischenablage kopiert!' : 'HTML-Code kopieren'}</span>
              </button>
            </div>

            {/* Step-by-Step Hosting Guide Tabs */}
            <div className="export-guide-container">
              <div className="export-tabs-nav">
                <button 
                  type="button" 
                  className={`export-tab-btn ${activeExportTab === 'quick' ? 'active' : ''}`}
                  onClick={() => setActiveExportTab('quick')}
                >
                  ⚡ In 60s Live (Netlify / Vercel)
                </button>
                <button 
                  type="button" 
                  className={`export-tab-btn ${activeExportTab === 'ftp' ? 'active' : ''}`}
                  onClick={() => setActiveExportTab('ftp')}
                >
                  🌐 Klassisch per FTP (Strato / IONOS)
                </button>
                <button 
                  type="button" 
                  className={`export-tab-btn ${activeExportTab === 'form' ? 'active' : ''}`}
                  onClick={() => setActiveExportTab('form')}
                >
                  📬 Kontaktformular-Einrichtung
                </button>
              </div>

              <div className="export-tab-content">
                {activeExportTab === 'quick' && (
                  <div className="guide-step-list">
                    <div className="guide-step">
                      <span className="step-badge">1</span>
                      <div>
                        <strong>HTML-Datei herunterladen:</strong> Klicke oben auf den grünen Download-Button.
                      </div>
                    </div>
                    <div className="guide-step">
                      <span className="step-badge">2</span>
                      <div>
                        <strong>Kostenlosen Hoster öffnen:</strong> Gehe im Browser auf <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="link-highlight">app.netlify.com/drop <ExternalLink size={12} /></a> (oder Vercel).
                      </div>
                    </div>
                    <div className="guide-step">
                      <span className="step-badge">3</span>
                      <div>
                        <strong>Drag & Drop:</strong> Ziehe die heruntergeladene HTML-Datei einfach in das Netlify-Fenster.
                      </div>
                    </div>
                    <div className="guide-step">
                      <span className="step-badge">4</span>
                      <div>
                        <strong>Fertig!</strong> Deine Website ist in Sekunden unter einer sicheren HTTPS-Adresse online. Du kannst anschließend mit 1 Klick deine eigene Wunsch-Domain verknüpfen.
                      </div>
                    </div>
                  </div>
                )}

                {activeExportTab === 'ftp' && (
                  <div className="guide-step-list">
                    <div className="guide-step">
                      <span className="step-badge">1</span>
                      <div>
                        <strong>FTP-Programm öffnen:</strong> Öffne FileZilla oder WinSCP und verbinde dich mit deinen Server-Zugangsdaten (z. B. von Strato, All-Inkl oder IONOS).
                      </div>
                    </div>
                    <div className="guide-step">
                      <span className="step-badge">2</span>
                      <div>
                        <strong>Zielordner ansteuern:</strong> Wechsle in das Web-Verzeichnis deiner Domain (oft <code>htdocs</code>, <code>public_html</code> oder <code>www</code>).
                      </div>
                    </div>
                    <div className="guide-step">
                      <span className="step-badge">3</span>
                      <div>
                        <strong>index.html hochladen:</strong> Lade die heruntergeladene Datei als <code>index.html</code> hoch.
                      </div>
                    </div>
                    <div className="guide-step">
                      <span className="step-badge">4</span>
                      <div>
                        <strong>Prüfen:</strong> Rufe deine Domain im Browser auf (z. B. <code>kmu-service-harz.de</code>) – die Seite ist sofort live!
                      </div>
                    </div>
                  </div>
                )}

                {activeExportTab === 'form' && (
                  <div className="guide-step-list">
                    <div className="guide-step">
                      <span className="step-badge">1</span>
                      <div>
                        <strong>Wie funktioniert das ohne Programmieraufwand?</strong><br />
                        Die exportierte Website nutzt das DSGVO-konforme Gateway <code>FormSubmit.co</code>. Du musst keinen eigenen PHP-Mailserver einrichten!
                      </div>
                    </div>
                    <div className="guide-step">
                      <span className="step-badge">2</span>
                      <div>
                        <strong>Einmalige Freischaltung (beim allerersten Test):</strong><br />
                        Wenn du auf deiner Live-Website das Formular zum ersten Mal testweise abschickst, schickt FormSubmit eine Bestätigungs-E-Mail an <code>{exportEmail}</code>. Klicke dort einfach auf <em>„Activate Form“</em>.
                      </div>
                    </div>
                    <div className="guide-step">
                      <span className="step-badge">3</span>
                      <div>
                        <strong>Fertig:</strong> Ab diesem Moment landet jede Kundenanfrage (Name, Firma, Telefon, Paket) sofort und formatiert in deinem Postfach.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="export-modal-footer">
              <span className="footer-hint">
                🔒 Alle 3 Website-Versionen bleiben dauerhaft gespeichert und können jederzeit einzeln exportiert werden.
              </span>
              <button 
                type="button" 
                className="btn-close-modal"
                onClick={() => setShowExportModal(false)}
              >
                Schließen
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🎨 DYNAMISCHES CSS-SYSTEM FÜR ALLE 3 DESIGNWELTEN */}
      <style>{`
        /* ==================== THEME SYSTEM TOKENS ==================== */
        
        /* 1. PRESET: HARZ & HANDWERK (Waldgrün & Bernstein) */
        .preset-harz {
          --primary: #064e3b;
          --primary-hover: #047857;
          --primary-light: #ecfdf5;
          --primary-border: #a7f3d0;
          --accent: #d97706;
          --accent-light: #fef3c7;
          --text-hero-gradient: linear-gradient(135deg, #064e3b 0%, #047857 100%);
        }
        .preset-harz.mode-light {
          --bg-main: #f9fafb;
          --bg-card: #ffffff;
          --bg-subtle: #f0fdf4;
          --border: #e2e8f0;
          --text-main: #0f172a;
          --text-muted: #475569;
          --card-shadow: 0 4px 20px -2px rgba(6, 78, 59, 0.08);
          --badge-bg: #ecfdf5;
          --badge-text: #064e3b;
          --badge-border: #a7f3d0;
        }
        .preset-harz.mode-dark {
          --bg-main: #071712;
          --bg-card: #0b241d;
          --bg-subtle: #0f3027;
          --border: #1a4a3c;
          --text-main: #f1f5f9;
          --text-muted: #94a3b8;
          --card-shadow: 0 6px 24px -2px rgba(0, 0, 0, 0.4);
          --badge-bg: #0f3027;
          --badge-text: #34d399;
          --badge-border: #1a4a3c;
          --text-hero-gradient: linear-gradient(135deg, #34d399 0%, #a7f3d0 100%);
        }

        /* 2. PRESET: TECH-HANDWERK (Schieferblau & Smaragd) */
        .preset-tech {
          --primary: #0f172a;
          --primary-hover: #1e293b;
          --primary-light: #f1f5f9;
          --primary-border: #cbd5e1;
          --accent: #10b981;
          --accent-light: #d1fae5;
          --text-hero-gradient: linear-gradient(135deg, #0f172a 0%, #2563eb 100%);
        }
        .preset-tech.mode-light {
          --bg-main: #f8fafc;
          --bg-card: #ffffff;
          --bg-subtle: #f1f5f9;
          --border: #e2e8f0;
          --text-main: #0f172a;
          --text-muted: #475569;
          --card-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.08);
          --badge-bg: #eff6ff;
          --badge-text: #1d4ed8;
          --badge-border: #bfdbfe;
        }
        .preset-tech.mode-dark {
          --bg-main: #0a0f1d;
          --bg-card: #111827;
          --bg-subtle: #1e293b;
          --border: #334155;
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --card-shadow: 0 6px 24px -2px rgba(0, 0, 0, 0.5);
          --badge-bg: #1e293b;
          --badge-text: #60a5fa;
          --badge-border: #3b82f6;
          --text-hero-gradient: linear-gradient(135deg, #60a5fa 0%, #34d399 100%);
        }

        /* 3. PRESET: INDUSTRIE & KLARHEIT (Anthrazit & Warm-Orange) */
        .preset-industry {
          --primary: #18181b;
          --primary-hover: #27272a;
          --primary-light: #f4f4f5;
          --primary-border: #d4d4d8;
          --accent: #ea580c;
          --accent-light: #ffedd5;
          --text-hero-gradient: linear-gradient(135deg, #18181b 0%, #ea580c 100%);
        }
        .preset-industry.mode-light {
          --bg-main: #fafafa;
          --bg-card: #ffffff;
          --bg-subtle: #fff7ed;
          --border: #e4e4e7;
          --text-main: #18181b;
          --text-muted: #52525b;
          --card-shadow: 0 4px 20px -2px rgba(24, 24, 27, 0.08);
          --badge-bg: #ffedd5;
          --badge-text: #c2410c;
          --badge-border: #fed7aa;
        }
        .preset-industry.mode-dark {
          --bg-main: #09090b;
          --bg-card: #18181b;
          --bg-subtle: #27272a;
          --border: #3f3f46;
          --text-main: #fafafa;
          --text-muted: #a1a1aa;
          --card-shadow: 0 6px 24px -2px rgba(0, 0, 0, 0.5);
          --badge-bg: #27272a;
          --badge-text: #fb923c;
          --badge-border: #ea580c;
          --text-hero-gradient: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
        }

        /* ==================== BASE STYLES ==================== */
        .website-wrapper {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: var(--bg-main);
          color: var(--text-main);
          min-height: 100vh;
          transition: all 0.25s ease;
          line-height: 1.55;
          border-radius: 12px;
          overflow-x: hidden;
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

        /* HEADER */
        .web-header {
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .web-header-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0.85rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .web-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .web-logo-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--primary);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .web-brand-title {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          display: block;
          color: var(--text-main);
        }

        .web-brand-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          display: block;
        }

        .web-nav {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .web-nav-item {
          background: none;
          border: none;
          padding: 0.45rem 0.8rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-muted);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .web-nav-item:hover, .web-nav-item.active {
          color: var(--text-main);
          background-color: var(--bg-subtle);
        }

        .web-header-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        /* 3-THEME PRESET SELECTOR */
        .theme-preset-pills {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: var(--bg-subtle);
          padding: 0.25rem 0.4rem;
          border-radius: 9999px;
          border: 1px solid var(--border);
        }

        .preset-label {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          padding-left: 0.3rem;
        }

        .preset-btn {
          background: transparent;
          border: none;
          font-size: 0.74rem;
          font-weight: 700;
          padding: 0.25rem 0.55rem;
          border-radius: 9999px;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.15s ease;
        }

        .preset-btn.active {
          background: var(--bg-card);
          color: var(--text-main);
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
        }

        .theme-mode-btn {
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          color: var(--text-main);
          width: 36px;
          height: 36px;
          border-radius: 9px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .theme-mode-btn:hover {
          background: var(--border);
        }

        .header-cta-btn {
          background: var(--primary);
          color: #ffffff;
          border: none;
          padding: 0.5rem 0.95rem;
          font-size: 0.85rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.15s ease;
        }

        .header-cta-btn:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
        }

        /* SECTION PADDING & WRAPPERS */
        .section-padding {
          padding: 4.5rem 1.5rem;
          max-width: 1240px;
          margin: 0 auto;
        }

        .subpage-container {
          padding: 3rem 1.5rem 5rem;
          max-width: 1240px;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: 3rem;
        }

        .text-center {
          text-align: center;
        }

        .sec-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          background: var(--badge-bg);
          color: var(--badge-text);
          border: 1px solid var(--badge-border);
          margin-bottom: 0.85rem;
        }

        .sec-title {
          font-size: 2.15rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 0.75rem;
          color: var(--text-main);
        }

        .sec-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
          max-width: 680px;
          margin: 0 auto;
        }

        /* HERO SECTION */
        .hero-section {
          padding: 4.5rem 1.5rem 3.5rem;
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-badge-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--badge-bg);
          color: var(--badge-text);
          border: 1px solid var(--badge-border);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .hero-location-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--text-muted);
          font-size: 0.82rem;
          font-weight: 600;
        }

        .hero-headline {
          font-size: 2.75rem;
          font-weight: 900;
          letter-spacing: -0.035em;
          line-height: 1.18;
          color: var(--text-main);
          margin-bottom: 1.35rem;
        }

        .highlight-text {
          color: var(--accent);
          background: linear-gradient(120deg, var(--accent) 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subheadline {
          font-size: 1.18rem;
          color: var(--text-muted);
          max-width: 780px;
          margin: 0 auto 2.25rem;
          line-height: 1.6;
          white-space: pre-line;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .btn-primary-glow {
          background: var(--primary);
          color: #ffffff;
          border: none;
          padding: 0.85rem 1.65rem;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
          transition: all 0.2s ease;
        }

        .btn-primary-glow:hover {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.22);
        }

        .btn-secondary-outline {
          background: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border);
          padding: 0.85rem 1.5rem;
          font-size: 0.98rem;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          transition: all 0.15s ease;
        }

        .btn-secondary-outline:hover {
          background: var(--bg-subtle);
          border-color: var(--primary);
        }

        .hero-trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          padding-top: 1.5rem;
          border-top: 1px dashed var(--border);
        }

        .hero-trust-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .trust-check-icon {
          color: var(--accent);
        }

        /* PAIN POINTS SECTION */
        .pain-section {
          background: var(--bg-subtle);
          border-radius: 18px;
          margin-top: 1rem;
          margin-bottom: 2rem;
        }

        .pain-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.35rem;
        }

        .pain-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.65rem;
          box-shadow: var(--card-shadow);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .pain-card:hover {
          transform: translateY(-3px);
          border-color: var(--accent);
        }

        .pain-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--bg-subtle);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.15rem;
        }

        .pain-title {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 0.55rem;
          color: var(--text-main);
        }

        .pain-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.55;
        }

        /* TOOLS SECTION */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.2rem;
          margin-bottom: 2rem;
        }

        .tool-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.35rem;
          box-shadow: var(--card-shadow);
        }

        .tool-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .tool-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
        }

        .tool-role {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .tool-name {
          font-size: 1.05rem;
          font-weight: 800;
          margin-bottom: 0.4rem;
          color: var(--text-main);
        }

        .tool-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .bridge-banner {
          background: var(--bg-card);
          border: 1px dashed var(--border);
          border-radius: 12px;
          padding: 1.15rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .bridge-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .bridge-text {
          font-size: 0.92rem;
          color: var(--text-main);
        }

        /* PRICING SECTION & 3 TIERS */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
          gap: 1.65rem;
          align-items: stretch;
          margin-bottom: 2.5rem;
        }

        .pricing-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2.2rem 1.75rem;
          box-shadow: var(--card-shadow);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .pricing-card.highlighted {
          border: 2px solid var(--accent);
          background: var(--bg-card);
          transform: translateY(-4px);
        }

        .pricing-card-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.25rem 0.85rem;
          border-radius: 9999px;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        .pricing-level {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--accent);
          display: block;
          margin-bottom: 0.25rem;
        }

        .pricing-title {
          font-size: 1.45rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
          color: var(--text-main);
        }

        .pricing-tagline {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .pricing-price-box {
          margin-bottom: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border);
        }

        .price-main {
          display: flex;
          align-items: baseline;
          gap: 0.45rem;
          margin-bottom: 0.4rem;
        }

        .price-num {
          font-size: 2.25rem;
          font-weight: 900;
          color: var(--text-main);
          letter-spacing: -0.03em;
        }

        .price-suffix {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .funding-pill {
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--accent);
          background: var(--bg-subtle);
          padding: 0.25rem 0.55rem;
          border-radius: 6px;
          display: inline-block;
        }

        .pricing-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 1.35rem;
        }

        .pricing-features-list {
          flex-grow: 1;
          margin-bottom: 1.85rem;
        }

        .features-headline {
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-main);
          margin-bottom: 0.75rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 0.55rem;
          line-height: 1.4;
        }

        .feature-check {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .pricing-btn {
          width: 100%;
          padding: 0.85rem 1.25rem;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.15s ease;
        }

        .btn-highlight {
          background: var(--accent);
          color: #ffffff;
          border: none;
        }
        .btn-highlight:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        .btn-outline {
          background: transparent;
          color: var(--text-main);
          border: 1px solid var(--border);
        }
        .btn-outline:hover {
          background: var(--bg-subtle);
          border-color: var(--primary);
        }

        /* FUNDING BANNER */
        .funding-highlight-box {
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.85rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .funding-content {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .funding-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: var(--bg-card);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--card-shadow);
          flex-shrink: 0;
        }

        .funding-h4 {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .funding-p {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 0.65rem;
        }

        .funding-badges-row {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .funding-program-badge {
          font-size: 0.78rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          color: var(--text-main);
        }

        .btn-secondary-sm {
          background: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border);
          padding: 0.65rem 1.15rem;
          font-size: 0.88rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
        }
        .btn-secondary-sm:hover {
          background: var(--primary);
          color: #ffffff;
        }

        /* SHOWCASE SECTION */
        .showcase-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 2.5rem 2.25rem;
          box-shadow: var(--card-shadow);
        }

        .showcase-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .client-industry {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .client-name {
          font-size: 1.85rem;
          font-weight: 900;
          color: var(--text-main);
        }

        .toggle-pill-group {
          display: flex;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          padding: 0.3rem;
          border-radius: 9999px;
          gap: 0.35rem;
        }

        .toggle-pill {
          background: none;
          border: none;
          padding: 0.45rem 1rem;
          font-size: 0.85rem;
          font-weight: 700;
          border-radius: 9999px;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.15s ease;
        }

        .toggle-pill.active-before {
          background: #fee2e2;
          color: #b91c1c;
        }

        .toggle-pill.active-after {
          background: var(--primary);
          color: #ffffff;
        }

        .showcase-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .metric-box {
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem;
          text-align: center;
        }

        .metric-val {
          font-size: 2rem;
          font-weight: 900;
          color: var(--accent);
          letter-spacing: -0.03em;
          margin-bottom: 0.15rem;
        }

        .metric-lbl {
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .metric-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .showcase-comparison-area {
          margin-bottom: 2rem;
        }

        .comparison-pane {
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid var(--border);
        }

        .pane-before {
          background: rgba(239, 68, 68, 0.05);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .pane-after {
          background: var(--bg-subtle);
          border-color: var(--border);
        }

        .pane-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.05rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .text-danger { color: #dc2626; }
        .text-success { color: var(--accent); }

        .comparison-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 0.85rem;
        }

        .comparison-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.92rem;
        }

        .bullet-cross { color: #dc2626; font-weight: 800; }
        .bullet-check { color: var(--accent); font-weight: 800; }

        .showcase-quote {
          background: var(--bg-subtle);
          border-left: 4px solid var(--accent);
          padding: 1.25rem 1.5rem;
          border-radius: 0 12px 12px 0;
          margin-bottom: 2rem;
        }

        .showcase-quote p {
          font-size: 1rem;
          font-style: italic;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .showcase-quote cite {
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--text-muted);
          display: block;
        }

        .workflow-title {
          font-size: 0.95rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-main);
        }

        .workflow-steps-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .workflow-step-card {
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1rem;
        }

        .ws-num {
          font-size: 0.78rem;
          font-weight: 900;
          color: var(--accent);
          margin-bottom: 0.25rem;
        }

        .ws-title {
          font-size: 0.92rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .ws-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* ROI CALCULATOR CARD */
        .roi-calculator-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: var(--card-shadow);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          padding: 2.5rem 2.25rem;
        }

        @media (max-width: 860px) {
          .roi-calculator-card {
            grid-template-columns: 1fr;
          }
        }

        .control-group {
          margin-bottom: 1.85rem;
        }

        .control-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 0.65rem;
        }

        .control-val {
          color: var(--accent);
          font-weight: 800;
        }

        .roi-slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: var(--border);
          outline: none;
          accent-color: var(--accent);
          cursor: pointer;
        }

        .slider-hints {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 0.35rem;
        }

        .roi-results-panel {
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.85rem;
          display: flex;
          flex-direction: column;
        }

        .results-badge {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .sundays-highlight-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.15rem 1.35rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.35rem;
        }

        .sundays-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .sundays-number {
          font-size: 1.35rem;
          font-weight: 900;
          color: var(--text-main);
        }

        .sundays-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .results-kpi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.35rem;
        }

        .kpi-mini {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.85rem 1rem;
        }

        .kpi-mini-lbl {
          font-size: 0.74rem;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.2rem;
        }

        .kpi-mini-val {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .text-accent {
          color: var(--accent);
        }

        .roi-disclaimer {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: auto;
          margin-bottom: 1.25rem;
          line-height: 1.4;
        }

        .w-full {
          width: 100%;
        }

        /* FAQ SECTION */
        .faq-list {
          max-width: 840px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .faq-item {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          box-shadow: var(--card-shadow);
          transition: border-color 0.15s ease;
        }

        .faq-item.open {
          border-color: var(--accent);
        }

        .faq-question-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .faq-q {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0;
        }

        .faq-chevron {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }

        .faq-item.open .faq-chevron {
          transform: rotate(180deg);
          color: var(--accent);
        }

        .faq-answer-row {
          margin-top: 0.85rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border);
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* CONTACT SECTION */
        .contact-card-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2rem;
        }

        @media (max-width: 860px) {
          .contact-card-grid {
            grid-template-columns: 1fr;
          }
        }

        .contact-form-box {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 2.25rem;
          box-shadow: var(--card-shadow);
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        @media (max-width: 600px) {
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: var(--text-main);
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem 0.95rem;
          font-size: 0.92rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-subtle);
          color: var(--text-main);
          outline: none;
          font-family: inherit;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--accent);
        }

        .form-privacy-hint {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.85rem;
          text-align: center;
        }

        .contact-info-panel {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 2.25rem;
          box-shadow: var(--card-shadow);
          display: flex;
          flex-direction: column;
        }

        .contact-role-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-top: 0.35rem;
          margin-bottom: 1.5rem;
        }

        .contact-details-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .contact-detail-row {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .cd-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--bg-subtle);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cd-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .cd-val {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .cd-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .regional-promise-card {
          background: var(--bg-subtle);
          border: 1px dashed var(--border);
          border-radius: 12px;
          padding: 1.25rem;
          margin-top: auto;
        }

        .promise-title {
          font-weight: 800;
          font-size: 0.92rem;
          margin-bottom: 0.35rem;
          color: var(--text-main);
        }

        .regional-promise-card p {
          font-size: 0.84rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.45;
        }

        .contact-success-state {
          text-align: center;
          padding: 3rem 1rem;
        }

        .success-icon-wrap {
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .contact-success-state h3 {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .contact-success-state p {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .btn-outline-sm {
          background: transparent;
          border: 1px solid var(--border);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          color: var(--text-main);
          font-weight: 700;
          cursor: pointer;
        }

        /* ABOUT SUBPAGE */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
        .about-story-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2.25rem;
          box-shadow: var(--card-shadow);
        }
        .about-story-p {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin-bottom: 2rem;
        }
        .about-owner-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }
        .owner-avatar {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: var(--bg-subtle);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .owner-loc {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: block;
        }
        .about-values-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .value-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          box-shadow: var(--card-shadow);
        }
        .value-card h4 {
          font-size: 1.05rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
          color: var(--text-main);
        }
        .value-card p {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin: 0;
        }

        /* LEGAL PAGES */
        .legal-container {
          max-width: 820px;
          margin: 3rem auto 5rem;
          padding: 0 1.5rem;
        }
        .legal-lead {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }
        .legal-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 2rem;
          box-shadow: var(--card-shadow);
        }
        .legal-item-row {
          display: flex;
          gap: 1rem;
          padding: 0.65rem 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.95rem;
        }
        .legal-label {
          width: 220px;
          flex-shrink: 0;
          color: var(--text-main);
        }
        .legal-val {
          color: var(--text-muted);
        }
        .legal-disclaimer-box {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* FOOTER */
        .web-footer {
          background: var(--bg-card);
          border-top: 1px solid var(--border);
          padding: 3.5rem 1.5rem 2.5rem;
          margin-top: 4rem;
        }

        .web-footer-container {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-logo-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.5rem;
        }

        .footer-logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--primary);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-brand-name {
          font-size: 1.05rem;
          font-weight: 800;
        }

        .footer-brand-claim {
          font-size: 0.84rem;
          color: var(--text-muted);
          max-width: 480px;
          margin-bottom: 0.85rem;
        }

        .footer-copyright {
          font-size: 0.76rem;
          color: var(--text-muted);
          display: block;
        }

        .footer-nav-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem 1.25rem;
        }

        .footer-nav-btn {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
        }
        .footer-nav-btn:hover {
          color: var(--text-main);
          text-decoration: underline;
        }

        /* EXPORT BUTTON & WHATSAPP BUTTON */
        .export-site-btn {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          color: #ffffff;
          border: none;
          padding: 0.48rem 0.95rem;
          border-radius: 9px;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
          transition: all 0.15s ease;
        }

        .export-site-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);
        }

        .btn-whatsapp-direct {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: #25D366;
          color: #ffffff;
          padding: 0.8rem 1.2rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.92rem;
          text-decoration: none;
          margin-top: 0.8rem;
          transition: background-color 0.15s ease;
        }

        .btn-whatsapp-direct:hover {
          background-color: #1ebd5a;
        }

        /* EXPORT MODAL */
        .export-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
          animation: webFadeIn 0.2s ease;
        }

        .export-modal-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          max-width: 720px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .export-modal-header {
          padding: 1.5rem 1.8rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .export-header-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .export-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .export-header-title h3 {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 0.2rem;
        }

        .export-header-title p {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .export-close-btn {
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: 8px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          cursor: pointer;
        }

        .export-config-box {
          padding: 1.2rem 1.8rem;
          background-color: var(--bg-subtle);
          border-bottom: 1px solid var(--border);
        }

        .export-config-box label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }

        .export-email-field {
          width: 100%;
          padding: 0.65rem 0.9rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background-color: var(--bg-card);
          color: var(--text-main);
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
        }

        .export-config-hint {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .export-actions-row {
          padding: 1.2rem 1.8rem;
          display: flex;
          gap: 1rem;
          border-bottom: 1px solid var(--border);
          flex-wrap: wrap;
        }

        .export-download-btn {
          flex: 1;
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          color: #ffffff;
          border: none;
          padding: 0.85rem 1.2rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
        }

        .export-download-btn:hover {
          transform: translateY(-1px);
        }

        .export-copy-btn {
          background-color: var(--bg-subtle);
          color: var(--text-main);
          border: 1.5px solid var(--border);
          padding: 0.85rem 1.2rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        .export-guide-container {
          padding: 1.2rem 1.8rem;
          max-height: 280px;
          overflow-y: auto;
        }

        .export-tabs-nav {
          display: flex;
          gap: 0.5rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.6rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .export-tab-btn {
          background: none;
          border: none;
          padding: 0.4rem 0.8rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-muted);
          border-radius: 6px;
          cursor: pointer;
        }

        .export-tab-btn.active {
          background-color: var(--bg-subtle);
          color: var(--text-main);
        }

        .guide-step-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .guide-step {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          font-size: 0.88rem;
          line-height: 1.5;
        }

        .step-badge {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background-color: var(--primary);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .link-highlight {
          color: #059669;
          font-weight: 700;
          text-decoration: underline;
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }

        .export-modal-footer {
          padding: 1rem 1.8rem;
          border-top: 1px solid var(--border);
          background-color: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .footer-hint {
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .btn-close-modal {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          padding: 0.45rem 1rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
        }

        /* RESPONSIVE BREAKPOINTS */
        @media (max-width: 900px) {
          .web-nav {
            display: none;
          }
          .hero-headline {
            font-size: 2.15rem;
          }
          .preset-label-text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

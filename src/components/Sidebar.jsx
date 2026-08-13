import React from 'react';
import { 
  BrainCircuit, 
  LayoutDashboard, 
  Inbox, 
  Users, 
  PhoneCall, 
  HelpCircle, 
  FileText, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Menu,
  Zap,
  Globe,
  ShieldCheck
} from 'lucide-react';

export const Sidebar = ({
  isMobile,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
  activeTab,
  setActiveTab,
  clientPortalMode
}) => {
  if (clientPortalMode) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile ? (
        <aside className={`app-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="brand-logo">
                <BrainCircuit size={20} />
              </div>
              <h1 style={{ display: sidebarCollapsed ? 'none' : 'block' }}>Life & Founder OS</h1>
            </div>
          </div>
          <div className="sidebar-nav-list">
            <button 
              className={`sidebar-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
              title="Dashboard"
            >
              <LayoutDashboard size={18} />
              <span className="sidebar-nav-label">Dashboard</span>
            </button>
            <button 
              className={`sidebar-nav-item ${activeTab === 'status' ? 'active' : ''}`}
              onClick={() => setActiveTab('status')}
              title="Command Center"
            >
              <Zap size={18} />
              <span className="sidebar-nav-label">Command Center</span>
            </button>
            <button 
              className={`sidebar-nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
              title="Inbox & Tasks"
            >
              <Inbox size={18} />
              <span className="sidebar-nav-label">Inbox & Tasks</span>
            </button>
            <button 
              className={`sidebar-nav-item ${activeTab === 'crm' ? 'active' : ''}`}
              onClick={() => setActiveTab('crm')}
              title="CRM & Projekte"
            >
              <Users size={18} />
              <span className="sidebar-nav-label">CRM & Projekte</span>
            </button>
            <button 
              className={`sidebar-nav-item ${activeTab === 'leads' ? 'active' : ''}`}
              onClick={() => setActiveTab('leads')}
              title="Lead-Tracker"
            >
              <PhoneCall size={18} />
              <span className="sidebar-nav-label">Lead-Tracker</span>
            </button>
            <button 
              className={`sidebar-nav-item ${activeTab === 'onboarding' ? 'active' : ''}`}
              onClick={() => setActiveTab('onboarding')}
              title="Kunden-Onboarding"
            >
              <HelpCircle size={18} />
              <span className="sidebar-nav-label">Onboarding</span>
            </button>
            <button 
              className={`sidebar-nav-item ${activeTab === 'prompts' ? 'active' : ''}`}
              onClick={() => setActiveTab('prompts')}
              title="KI Prompts"
            >
              <BrainCircuit size={18} />
              <span className="sidebar-nav-label">KI Prompts</span>
            </button>
            <button 
              className={`sidebar-nav-item ${activeTab === 'hub' ? 'active' : ''}`}
              onClick={() => setActiveTab('hub')}
              title="Dokumente & Sync"
            >
              <FileText size={18} />
              <span className="sidebar-nav-label">Dokumente & Sync</span>
            </button>
            <button 
              className={`sidebar-nav-item ${activeTab === 'sales' ? 'active' : ''}`}
              onClick={() => setActiveTab('sales')}
              title="Sales & SOPs"
            >
              <TrendingUp size={18} />
              <span className="sidebar-nav-label">Sales & SOPs</span>
            </button>
            <button 
              className={`sidebar-nav-item ${activeTab === 'website' ? 'active' : ''}`}
              onClick={() => setActiveTab('website')}
              title="🌐 KMU Webseite (Live Preview)"
              style={{ background: activeTab === 'website' ? '#059669' : 'rgba(5, 150, 105, 0.15)', color: '#ffffff' }}
            >
              <Globe size={18} />
              <span className="sidebar-nav-label">🌐 Webseiten-Preview</span>
            </button>
            <button 
              className={`sidebar-nav-item ${activeTab === 'coaching-portal' ? 'active' : ''}`}
              onClick={() => setActiveTab('coaching-portal')}
              title="🎯 Coaching Live-Portal"
              style={{ background: activeTab === 'coaching-portal' ? 'var(--accent-indigo)' : 'rgba(99, 102, 241, 0.12)', color: '#ffffff', marginTop: '0.25rem' }}
            >
              <ShieldCheck size={18} />
              <span className="sidebar-nav-label">🎯 Coaching Live-Portal</span>
            </button>
          </div>
          <div className="sidebar-footer">
            <button 
              className="sidebar-collapse-btn" 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Sidebar ausklappen" : "Sidebar einklappen"}
            >
              {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
        </aside>
      ) : null}

      {/* Mobile Sidebar Drawer */}
      {isMobile ? (
        <>
          {mobileMenuOpen ? (
            <div 
              className="mobile-sidebar-backdrop" 
              onClick={() => setMobileMenuOpen(false)}
            ></div>
          ) : null}
          <aside className={`mobile-sidebar-drawer ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <div className="sidebar-brand">
                <div className="brand-logo">
                  <BrainCircuit size={20} />
                </div>
                <h1>Life & Founder OS</h1>
              </div>
              <button className="hamburger-btn" onClick={() => setMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="sidebar-nav-list">
              <button 
                className={`sidebar-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>
              <button 
                className={`sidebar-nav-item ${activeTab === 'status' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('status'); setMobileMenuOpen(false); }}
              >
                <Zap size={18} />
                <span>Command Center</span>
              </button>
              <button 
                className={`sidebar-nav-item ${activeTab === 'tasks' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('tasks'); setMobileMenuOpen(false); }}
              >
                <Inbox size={18} />
                <span>Inbox & Tasks</span>
              </button>
              <button 
                className={`sidebar-nav-item ${activeTab === 'crm' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('crm'); setMobileMenuOpen(false); }}
              >
                <Users size={18} />
                <span>CRM & Projekte</span>
              </button>
              <button 
                className={`sidebar-nav-item ${activeTab === 'leads' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('leads'); setMobileMenuOpen(false); }}
              >
                <PhoneCall size={18} />
                <span>Lead-Tracker</span>
              </button>
              <button 
                className={`sidebar-nav-item ${activeTab === 'onboarding' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('onboarding'); setMobileMenuOpen(false); }}
              >
                <HelpCircle size={18} />
                <span>Onboarding</span>
              </button>
              <button 
                className={`sidebar-nav-item ${activeTab === 'prompts' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('prompts'); setMobileMenuOpen(false); }}
              >
                <BrainCircuit size={18} />
                <span>KI Prompts</span>
              </button>
              <button 
                className={`sidebar-nav-item ${activeTab === 'hub' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('hub'); setMobileMenuOpen(false); }}
              >
                <FileText size={18} />
                <span>Dokumente & Sync</span>
              </button>
              <button 
                className={`sidebar-nav-item ${activeTab === 'sales' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('sales'); setMobileMenuOpen(false); }}
              >
                <TrendingUp size={18} />
                <span>Sales & SOPs</span>
              </button>
              <button 
                className={`sidebar-nav-item ${activeTab === 'website' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('website'); setMobileMenuOpen(false); }}
                style={{ background: 'rgba(5, 150, 105, 0.25)', color: '#ffffff' }}
              >
                <Globe size={18} />
                <span>🌐 Webseiten-Preview</span>
              </button>
              <button 
                className={`sidebar-nav-item ${activeTab === 'coaching-portal' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('coaching-portal'); setMobileMenuOpen(false); }}
                style={{ background: 'rgba(99, 102, 241, 0.25)', color: '#ffffff' }}
              >
                <ShieldCheck size={18} />
                <span>🎯 Coaching Live-Portal</span>
              </button>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
};

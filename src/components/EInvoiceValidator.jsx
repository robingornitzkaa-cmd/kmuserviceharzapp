import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  AlertOctagon, 
  Download, 
  RefreshCw, 
  FileCode, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Calculator, 
  Building2, 
  User, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  parseAndValidateEInvoice, 
  exportValidationReportJSON, 
  generateValidationReportPDF, 
  SAMPLE_INVOICES,
  SAMPLE_CII_INVOICE 
} from '../services/eInvoiceParser';

export const EInvoiceValidator = ({ onBackToDashboard }) => {
  const [fileInput, setFileInput] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('protocol'); // 'protocol' | 'preview' | 'xml'
  const [checkFilter, setCheckFilter] = useState('ALL'); // 'ALL' | 'FAIL' | 'WARN' | 'PASS'
  const [xmlCopied, setXmlCopied] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    'Format': true,
    'Kopfdaten': true,
    'Verkäufer (Kreditor)': true,
    'Käufer (Debitor)': true,
    'Positionen': true,
    'Mathematik & Summen': true,
    'Käufer / B2G': true,
    'Allgemein': true
  });

  const fileInputRef = useRef(null);

  // Initialize with CII sample on mount for immediate interactive experience
  useEffect(() => {
    handleLoadSample('cii_comfort');
  }, []);

  const handleProcessInput = async (input, name = 'rechnung.xml', size = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const valResult = await parseAndValidateEInvoice(input);
      setResult(valResult);
      setFileName(name);
      setFileSize(size);
    } catch (err) {
      setError(err.message || 'Fehler bei der Analyse der E-Rechnung.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formattedSize = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
      : `${(file.size / 1024).toFixed(1)} KB`;
    handleProcessInput(file, file.name, formattedSize);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const formattedSize = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
        : `${(file.size / 1024).toFixed(1)} KB`;
      handleProcessInput(file, file.name, formattedSize);
    }
  };

  const handleLoadSample = (sampleKey) => {
    const sample = SAMPLE_INVOICES[sampleKey];
    if (sample) {
      handleProcessInput(sample.xml, `${sampleKey}.xml`, 'Musterbeleg');
    }
  };

  const handleCopyXml = () => {
    if (!result?.rawXml) return;
    navigator.clipboard.writeText(result.rawXml).then(() => {
      setXmlCopied(true);
      setTimeout(() => setXmlCopied(false), 2000);
    });
  };

  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const filteredChecks = (result?.checks || []).filter(chk => {
    if (checkFilter === 'ALL') return true;
    return chk.status === checkFilter;
  });

  // Group checks by category
  const checksByCategory = filteredChecks.reduce((acc, chk) => {
    const cat = chk.category || 'Allgemein';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(chk);
    return acc;
  }, {});

  const overallStatus = result?.overallStatus || (result?.isValid ? 'PASS' : 'FAIL');

  return (
    <div className="einvoice-studio-container" style={{ padding: '1.5rem', maxWidth: '1280px', margin: '0 auto', color: 'var(--text-primary, #e2e8f0)' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', padding: '0.5rem', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center' }}>
              <ShieldCheck size={24} />
            </span>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                E-Rechnungs & ZUGFeRD / XRechnung Prüf-Studio
              </h1>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
                Revisionssichere semantische EN 16931 Validierung für CII, UBL 2.1 und ZUGFeRD PDF/A-3
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {onBackToDashboard && (
            <button 
              className="btn btn-secondary" 
              onClick={onBackToDashboard}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
            >
              Zurück zum Dashboard
            </button>
          )}
        </div>
      </div>

      {/* Upload Zone & Quick Sample Invoices */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Dropzone Card */}
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: isDragging ? '2px dashed #10b981' : '2px dashed rgba(255,255,255,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            background: isDragging ? 'rgba(16, 185, 129, 0.08)' : 'rgba(30, 41, 59, 0.7)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '140px'
          }}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".xml,.pdf" 
            style={{ display: 'none' }} 
          />
          <Upload size={32} style={{ color: isDragging ? '#10b981' : '#38bdf8', marginBottom: '0.5rem' }} />
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#ffffff' }}>
            Rechnung hier ablegen oder klicken
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Unterstützt XML (CII / UBL) und ZUGFeRD PDF/A-3 Dateien
          </div>
          {fileName && (
            <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
              Aktive Datei: <strong>{fileName}</strong> {fileSize ? `(${fileSize})` : ''}
            </div>
          )}
        </div>

        {/* Sample Invoices Selector Card */}
        <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.9rem', color: '#f8fafc', marginBottom: '0.4rem' }}>
              <Sparkles size={16} style={{ color: '#facc15' }} />
              <span>Interaktive Test-Musterbelege</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '0 0 0.8rem 0' }}>
              Testen Sie den Validator sofort mit validen und fehlerhaften Referenzbelegen ohne Datei-Upload:
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => handleLoadSample('cii_comfort')}
              style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#34d399' }}
            >
              <span>🟢 ZUGFeRD 2.2 / CII Comfort (Valide)</span>
              <ArrowRight size={14} />
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => handleLoadSample('ubl_xrechnung')}
              style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'rgba(56, 189, 248, 0.12)', borderColor: 'rgba(56, 189, 248, 0.3)', color: '#38bdf8' }}
            >
              <span>🟢 XRechnung 3.0 / UBL Standard (Valide)</span>
              <ArrowRight size={14} />
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => handleLoadSample('invalid_invoice')}
              style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'rgba(239, 68, 68, 0.12)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}
            >
              <span>🔴 Fehlerhafte Rechnung (Pflichtfeld & Rechenfehler)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <RefreshCw size={32} className="spinning" style={{ color: '#38bdf8', marginBottom: '0.5rem' }} />
          <div style={{ fontWeight: 600 }}>E-Rechnung wird semantisch validiert...</div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Prüfe EN 16931 Geschäftsregeln (BT-1 bis BT-115, BR-CO-10..18)</div>
        </div>
      )}

      {/* Error Message */}
      {error && !isLoading && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <AlertOctagon size={24} style={{ color: '#ef4444', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, color: '#f87171' }}>Fehler bei der Rechnungsverarbeitung</div>
            <div style={{ fontSize: '0.85rem', color: '#fca5a5' }}>{error}</div>
          </div>
        </div>
      )}

      {/* Validation Result Studio Display */}
      {result && !isLoading && (
        <div>
          {/* Main Status Hero Banner */}
          <div style={{
            background: overallStatus === 'PASS' 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.15))' 
              : overallStatus === 'WARN' 
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.15))' 
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(185, 28, 28, 0.15))',
            border: overallStatus === 'PASS' 
              ? '1px solid rgba(16, 185, 129, 0.4)' 
              : overallStatus === 'WARN' 
              ? '1px solid rgba(245, 158, 11, 0.4)' 
              : '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                background: overallStatus === 'PASS' ? '#10b981' : overallStatus === 'WARN' ? '#f59e0b' : '#ef4444',
                color: '#fff',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}>
                {overallStatus === 'PASS' ? <CheckCircle size={28} /> : overallStatus === 'WARN' ? <AlertTriangle size={28} /> : <AlertOctagon size={28} />}
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: overallStatus === 'PASS' ? '#34d399' : overallStatus === 'WARN' ? '#fbbf24' : '#f87171', fontWeight: 700 }}>
                  Prüfbericht Status
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                  {overallStatus === 'PASS' ? 'EN 16931 Konform (Gültig)' : overallStatus === 'WARN' ? 'Konform mit Hinweisen (Warnung)' : 'Nicht Konform (Prüffehler entdeckt)'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                  Erkannter Standard: <strong>{result.standard}</strong> ({result.syntax}) | Rechnungs-Nr: <strong>{result.invoiceNumber || 'Fehlt'}</strong>
                </div>
              </div>
            </div>

            {/* Quick Actions / Export Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => generateValidationReportPDF(result)}
                style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#0284c7', borderColor: '#0284c7' }}
              >
                <Download size={15} />
                <span>PDF Prüfbericht</span>
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => exportValidationReportJSON(result)}
                style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Download size={15} />
                <span>JSON Export</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '0.9rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Gesamt-Netto (BT-109)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                {(result.totals?.netAmount || 0).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
              </div>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '0.9rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>MwSt-Betrag (BT-110)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#38bdf8' }}>
                {(result.totals?.taxAmount || 0).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
              </div>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '0.9rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Gesamt-Brutto (BT-112)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#34d399' }}>
                {(result.totals?.grossAmount || 0).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
              </div>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '0.9rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Prüfregeln Bilanz</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '0.2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: '#34d399' }}>🟢 {result.summary?.passedChecks || 0}</span>
                <span style={{ color: '#fbbf24' }}>🟡 {result.summary?.warnChecks || 0}</span>
                <span style={{ color: '#f87171' }}>🔴 {result.summary?.failedChecks || 0}</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs: Protokoll, Beleg-Details, XML-Code */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.2rem', gap: '0.5rem' }}>
            <button 
              onClick={() => setActiveTab('protocol')}
              style={{
                padding: '0.6rem 1.2rem',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'protocol' ? '2px solid #38bdf8' : '2px solid transparent',
                color: activeTab === 'protocol' ? '#38bdf8' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <ShieldCheck size={16} />
              <span>Prüfprotokoll & Ampel ({result.checks?.length || 0})</span>
            </button>

            <button 
              onClick={() => setActiveTab('preview')}
              style={{
                padding: '0.6rem 1.2rem',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'preview' ? '2px solid #38bdf8' : '2px solid transparent',
                color: activeTab === 'preview' ? '#38bdf8' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Eye size={16} />
              <span>Beleg-Übersicht & Positionen</span>
            </button>

            <button 
              onClick={() => setActiveTab('xml')}
              style={{
                padding: '0.6rem 1.2rem',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'xml' ? '2px solid #38bdf8' : '2px solid transparent',
                color: activeTab === 'xml' ? '#38bdf8' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <FileCode size={16} />
              <span>XML-Quelltext Inspektor</span>
            </button>
          </div>

          {/* TAB 1: DIAGNOSTIC PROTOCOL (AMPEL) */}
          {activeTab === 'protocol' && (
            <div>
              {/* Filter Pills */}
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setCheckFilter('ALL')}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', background: checkFilter === 'ALL' ? 'rgba(255,255,255,0.15)' : 'transparent' }}
                >
                  Alle ({result.checks?.length || 0})
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setCheckFilter('FAIL')}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', color: '#f87171', background: checkFilter === 'FAIL' ? 'rgba(239, 68, 68, 0.2)' : 'transparent', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                >
                  🔴 Fehler ({result.summary?.failedChecks || 0})
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setCheckFilter('WARN')}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', color: '#fbbf24', background: checkFilter === 'WARN' ? 'rgba(245, 158, 11, 0.2)' : 'transparent', borderColor: 'rgba(245, 158, 11, 0.3)' }}
                >
                  🟡 Warnungen ({result.summary?.warnChecks || 0})
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setCheckFilter('PASS')}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', color: '#34d399', background: checkFilter === 'PASS' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                >
                  🟢 Bestanden ({result.summary?.passedChecks || 0})
                </button>
              </div>

              {/* Grouped Accordions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {Object.keys(checksByCategory).length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '8px' }}>
                    Keine Prüfungen für diesen Filter vorhanden.
                  </div>
                ) : (
                  Object.entries(checksByCategory).map(([category, items]) => {
                    const isExpanded = expandedCategories[category] !== false;
                    const hasErrors = items.some(i => i.status === 'FAIL');
                    const hasWarns = items.some(i => i.status === 'WARN');

                    return (
                      <div key={category} style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <div 
                          onClick={() => toggleCategory(category)}
                          style={{
                            padding: '0.8rem 1.2rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            background: 'rgba(15, 23, 42, 0.5)',
                            borderBottom: isExpanded ? '1px solid rgba(255,255,255,0.06)' : 'none'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc' }}>
                              {category}
                            </span>
                            <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', color: '#cbd5e1' }}>
                              {items.length} Prüfung(en)
                            </span>
                            {hasErrors && <span style={{ fontSize: '0.7rem', color: '#f87171', background: 'rgba(239, 68, 68, 0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>Fehler</span>}
                            {!hasErrors && hasWarns && <span style={{ fontSize: '0.7rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>Warnung</span>}
                          </div>
                          <div>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </div>

                        {isExpanded && (
                          <div style={{ padding: '0.5rem 1rem' }}>
                            {items.map((chk, idx) => (
                              <div 
                                key={idx} 
                                style={{ 
                                  padding: '0.6rem 0.5rem', 
                                  borderBottom: idx < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '0.8rem'
                                }}
                              >
                                <span style={{ marginTop: '0.15rem', flexShrink: 0 }}>
                                  {chk.status === 'PASS' && <CheckCircle size={16} style={{ color: '#10b981' }} />}
                                  {chk.status === 'WARN' && <AlertTriangle size={16} style={{ color: '#f59e0b' }} />}
                                  {chk.status === 'FAIL' && <AlertOctagon size={16} style={{ color: '#ef4444' }} />}
                                </span>
                                <div style={{ flexGrow: 1 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: chk.status === 'FAIL' ? '#fca5a5' : chk.status === 'WARN' ? '#fde047' : '#ffffff' }}>
                                      <span style={{ color: '#94a3b8', marginRight: '0.4rem' }}>[{chk.code}]</span>
                                      {chk.label}
                                    </div>
                                    {chk.btId && (
                                      <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: '#94a3b8' }}>
                                        {chk.btId}
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem', lineHeight: 1.4 }}>
                                    {chk.message}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 2: BELEG-DETAILS & POSITIONS-TABELLE */}
          {activeTab === 'preview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Header & Parties Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {/* Header Meta */}
                <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '10px', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem', color: '#38bdf8', marginBottom: '0.8rem' }}>
                    <FileText size={16} />
                    <span>Rechnungs-Kopfdaten</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: '0.4rem', fontSize: '0.82rem' }}>
                    <span style={{ color: '#94a3b8' }}>Rechnungs-Nr:</span>
                    <strong style={{ color: '#ffffff' }}>{result.invoiceNumber || '–'}</strong>
                    <span style={{ color: '#94a3b8' }}>Ausstellungsdatum:</span>
                    <span>{result.issueDate || '–'}</span>
                    <span style={{ color: '#94a3b8' }}>Leistungsdatum:</span>
                    <span>{result.deliveryDate || '–'}</span>
                    <span style={{ color: '#94a3b8' }}>Währung:</span>
                    <span>{result.currency || 'EUR'}</span>
                    <span style={{ color: '#94a3b8' }}>Leitweg-ID / Ref:</span>
                    <span>{result.buyerReference || '–'}</span>
                  </div>
                </div>

                {/* Seller (Kreditor) */}
                <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '10px', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem', color: '#34d399', marginBottom: '0.8rem' }}>
                    <Building2 size={16} />
                    <span>Verkäufer (Kreditor / Rechnungssteller)</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>{result.seller?.name || '–'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>{result.seller?.address || '–'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    {result.seller?.vatId ? `USt-IdNr: ${result.seller.vatId}` : ''}
                    {result.seller?.taxNumber ? ` Steuernummer: ${result.seller.taxNumber}` : ''}
                  </div>
                </div>

                {/* Buyer (Debitor) */}
                <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '10px', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem', color: '#facc15', marginBottom: '0.8rem' }}>
                    <User size={16} />
                    <span>Käufer (Debitor / Rechnungsempfänger)</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>{result.buyer?.name || '–'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>{result.buyer?.address || '–'}</div>
                  {result.buyer?.vatId && (
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                      USt-IdNr: {result.buyer.vatId}
                    </div>
                  )}
                </div>
              </div>

              {/* Line Items Table */}
              <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '10px', padding: '1.2rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc', marginBottom: '0.8rem' }}>
                  Rechnungspositionen (BG-25) — {result.items?.length || 0} Position(en)
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                        <th style={{ padding: '0.6rem' }}>Pos #</th>
                        <th style={{ padding: '0.6rem' }}>Bezeichnung & Beschreibung</th>
                        <th style={{ padding: '0.6rem', textAlign: 'right' }}>Menge</th>
                        <th style={{ padding: '0.6rem', textAlign: 'right' }}>Einzelpreis</th>
                        <th style={{ padding: '0.6rem', textAlign: 'right' }}>MwSt</th>
                        <th style={{ padding: '0.6rem', textAlign: 'right' }}>Gesamt (Netto)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(result.items || []).map((it, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '0.6rem', color: '#94a3b8' }}>{it.id || idx + 1}</td>
                          <td style={{ padding: '0.6rem' }}>
                            <div style={{ fontWeight: 600, color: '#ffffff' }}>{it.name}</div>
                            {it.description && <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{it.description}</div>}
                          </td>
                          <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                            {it.quantity} {it.unitCode ? `(${it.unitCode})` : ''}
                          </td>
                          <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                            {it.unitPrice.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                          </td>
                          <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                            {it.taxRate}% ({it.taxCategory || 'S'})
                          </td>
                          <td style={{ padding: '0.6rem', textAlign: 'right', fontWeight: 600, color: '#ffffff' }}>
                            {it.lineTotal.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals Summary */}
                <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                      <span>Summe Netto (BT-106):</span>
                      <span>{(result.totals?.netAmount || 0).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#38bdf8' }}>
                      <span>Umsatzsteuer (BT-110):</span>
                      <span>{(result.totals?.taxAmount || 0).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', color: '#34d399', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.4rem' }}>
                      <span>Gesamtbetrag Brutto:</span>
                      <span>{(result.totals?.grossAmount || 0).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RAW XML INSPECTOR */}
          {activeTab === 'xml' && (
            <div style={{ background: 'rgba(15, 23, 42, 0.95)', borderRadius: '10px', padding: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Extrahierter XML-Datenstrom ({result.rawXml?.length || 0} Zeichen)
                </div>
                <button 
                  className="btn btn-secondary" 
                  onClick={handleCopyXml}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  {xmlCopied ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                  <span>{xmlCopied ? 'Kopiert!' : 'XML kopieren'}</span>
                </button>
              </div>
              <pre style={{
                margin: 0,
                padding: '1rem',
                background: '#020617',
                borderRadius: '6px',
                maxHeight: '450px',
                overflow: 'auto',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                color: '#38bdf8',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all'
              }}>
                {result.rawXml || 'Kein XML verfügbar'}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

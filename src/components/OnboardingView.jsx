import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { 
  HelpCircle, 
  Database, 
  TrendingUp, 
  Download, 
  FileText, 
  ClipboardCopy 
} from 'lucide-react';
import { ONBOARDING_PLAYBOOKS } from '../constants/initialData';

/**
 * OnboardingView Komponente.
 * Ausgelagerter interaktiver Leitfaden für Kunden-Onboarding & Digitalisierungsberatung.
 * Enthält Playbook-Phasen, Sprachaufnahme, Live-Potenzialrechner und PDF-Export.
 */
export const OnboardingView = ({
  contacts = [],
  setContacts,
  leads = [],
  setLeads,
  docs = [],
  setDocs,
  showcaseMode = false,
  isOnline = true,
  supabaseConfig,
  showToast
}) => {
  const [onboardingLeadId, setOnboardingLeadId] = useState(null);
  const [onboardingPlaybook, setOnboardingPlaybook] = useState('standardSetup2000');
  const [onboardingActivePhase, setOnboardingActivePhase] = useState(0);
  const [onboardingAnswers, setOnboardingAnswers] = useState({});
  const [onboardingPriorities, setOnboardingPriorities] = useState({});
  const [recordingQuestionId, setRecordingQuestionId] = useState(null);

  // Digitalisierungs-Rechner States
  const [onboardingManualHours, setOnboardingManualHours] = useState(15);
  const [onboardingHourlyRate, setOnboardingHourlyRate] = useState(45);
  const [onboardingSavingRatio, setOnboardingSavingRatio] = useState(60);

  // Load existing onboarding data when selected lead changes
  useEffect(() => {
    if (!onboardingLeadId) {
      setOnboardingAnswers({});
      setOnboardingPriorities({});
      return;
    }

    const isCRM = String(onboardingLeadId).startsWith('c');
    const selected = isCRM 
      ? contacts.find(c => c.id === onboardingLeadId)
      : leads.find(l => l.id === onboardingLeadId);

    if (selected && selected.notes && selected.notes.includes('<!--ONBOARDING_DATA:')) {
      try {
        const jsonMatch = selected.notes.match(/<!--ONBOARDING_DATA:\s*([\s\S]*?)-->/);
        if (jsonMatch && jsonMatch[1]) {
          const parsed = JSON.parse(jsonMatch[1]);
          if (parsed.playbook) setOnboardingPlaybook(parsed.playbook);
          if (parsed.answers) setOnboardingAnswers(parsed.answers);
          if (parsed.priorities) setOnboardingPriorities(parsed.priorities);
          if (parsed.calc) {
            if (parsed.calc.hours) setOnboardingManualHours(parsed.calc.hours);
            if (parsed.calc.rate) setOnboardingHourlyRate(parsed.calc.rate);
            if (parsed.calc.ratio) setOnboardingSavingRatio(parsed.calc.ratio);
          }
        }
      } catch (e) {
        console.warn("Fehler beim Parsen existierender Onboarding-Daten:", e);
      }
    } else {
      setOnboardingAnswers({});
      setOnboardingPriorities({});
    }
    setOnboardingActivePhase(0);
  }, [onboardingLeadId, contacts, leads]);

  // Save handler for answers, priorities and calculator values
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

      if (isOnline && supabaseConfig && supabaseConfig.url) {
        try {
          await fetch(`${supabaseConfig.url}/rest/v1/leads?id=eq.${targetLeadId}`, {
            method: 'PATCH',
            headers: {
              'apikey': supabaseConfig.anonKey || supabaseConfig.key,
              'Authorization': `Bearer ${supabaseConfig.anonKey || supabaseConfig.key}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              notes: finalNotes,
              status: 'Pain Points erfasst'
            })
          });
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
    const msg = `🎉 Protokoll erfolgreich als Dokument "${newDoc.title}" im Wissens-Hub gespeichert!`;
    if (showToast) showToast(msg);
    else alert(msg);
  };

  const handleGenerateOnboardingPDF = () => {
    const isCRMContact = String(onboardingLeadId).startsWith('c');
    const lead = isCRMContact 
      ? contacts.find(c => c.id === onboardingLeadId)
      : leads.find(l => l.id === onboardingLeadId);
    if (!lead) return;

    const doc = new jsPDF();
    const activePlaybook = ONBOARDING_PLAYBOOKS[onboardingPlaybook];

    const primaryColor = [139, 92, 246];
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

    // Calculator Box
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
    const SpeechRecognition = typeof window !== 'undefined' 
      ? (window.SpeechRecognition || window.webkitSpeechRecognition) 
      : null;

    if (!SpeechRecognition) {
      alert("Spracherkennung wird von deinem Browser leider nicht unterstützt.");
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
    
    try {
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
    } catch (err) {
      console.error("Speech Recognition start failed:", err);
      setRecordingQuestionId(null);
    }
  };

  return (
    <div className="onboarding-container" id="onboarding-tab-content">
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            <HelpCircle size={22} className="text-purple-500" />
            Kunden-Onboarding Gesprächs-Leitfaden
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
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
              style={{ fontWeight: 600 }}
            >
              <option value="standardSetup2000">⭐ Stufe 2: 2.000 € Standard-Setup (Belegerfassung & DATEV)</option>
              <option value="audit500">🔍 Stufe 1: 500 € Büro-Potenzial-Audit (90-Min Analyse)</option>
              <option value="meisterbetrieb6000">🚀 Stufe 2+: ab 6.000 € Digitaler Meisterbetrieb (ERP & Förderung)</option>
              <option value="retainer200">🛡️ Stufe 3: 200 €/Monat Digitaler Hausmeister (AaaS)</option>
              <option value="master">📘 Allgemeines KMU Master-Playbook</option>
              <option value="pilot">🛠️ VIP-Pilot Playbook (GoClean Harz)</option>
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
        if (!playbook) return null;
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
                        const msg = "🎉 Onboarding erfolgreich abgeschlossen! Das Protokoll wurde gespeichert.";
                        if (showToast) showToast(msg);
                        else alert(msg);
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
                      if (showToast) showToast("📋 Protokoll als Markdown in die Zwischenablage kopiert!");
                      else alert("📋 Protokoll als Markdown in die Zwischenablage kopiert!");
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
  );
};

export const GEMINI_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash'
];

export const callGeminiAPI = async (model, promptText, apiKey) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: promptText
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2
      }
    })
  });
  
  if (!response.ok) {
    throw new Error(`Gemini API error (Status ${response.status})`);
  }
  
  const data = await response.json();
  if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
    return data.candidates[0].content.parts[0].text;
  }
  throw new Error("Invalid response format from Gemini API");
};

export const optimizePromptWithLocalAI = async ({ promptText, geminiApiKey, mode = 'structured' }) => {
  if (!promptText.trim()) {
    throw new Error("Bitte gib zuerst einen Prompt-Entwurf in das Textfeld ein.");
  }
  
  let modeInstruction = "Optimiere diesen Prompt für ein LLM (mache ihn präzise, strukturiert und füge klare Anweisungen hinzu). Antworte NUR mit dem verbesserten Prompt-Text, ohne Einleitung oder Erklärung:";
  if (mode === 'concise') {
    modeInstruction = "Optimiere diesen Prompt für ein LLM: Kürze ihn radikal auf das Wesentliche, erstelle eine ultrakompakte und präzise Anweisung ohne unnötigen Floskeln. Antworte NUR mit dem verbesserten Prompt-Text:";
  } else if (mode === 'english') {
    modeInstruction = "Translate and optimize this prompt into high-quality professional English for LLMs (GPT-4/Claude/Gemini). Return ONLY the optimized English prompt text without any intro or explanation:";
  } else if (mode === 'privacy') {
    modeInstruction = "Anonymisiere und optimiere diesen Prompt für ein LLM: Ersetze spezifische Eigennamen oder Firmendaten durch Platzhalter wie {{Firma}}, {{Kunde}}, {{Datum}} und strukturiere die Anweisung. Antworte NUR mit dem überarbeiteten Prompt-Text:";
  } else if (mode.startsWith('deep_research')) {
    if (mode === 'deep_research_competitor') {
      modeInstruction = `Transformiere das Thema in einen hochprofessionellen "Wettbewerber- & Konkurrenzanalyse Deep Research Prompt".
Der Prompt muss enthalten: 1. [ZIEL & KONKURRENZ-SKOP], 2. [ANALYSE DER HAUPTMITBEWERBER] (Preise, Angebote, USPs), 3. [STÄRKEN & SCHWACHSTELLEN DER KONKURRENZ], 4. [MARKT-POSITIONIERUNGS-MATRIX], 5. [EMPFEHLUNGEN FÜR NICHEN-CHANCEN].
Antworte AUSSCHLIESSLICH mit dem fertigen Prompt auf Deutsch:`;
    } else if (mode === 'deep_research_market') {
      modeInstruction = `Transformiere das Thema in einen hochprofessionellen "Marktforschungs- & Trend-Analyse Deep Research Prompt".
Der Prompt muss enthalten: 1. [MARKTGRÖSSE & WACHSTUMSRATEN], 2. [BRANCHE-TRENDS & REGULIERUNGEN], 3. [KUNDENVERHALTEN & NACHFRAGE], 4. [CHANCEN- & RISIKEN-GRID], 5. [HANDLUNGSOPTIONEN FÜR KMU].
Antworte AUSSCHLIESSLICH mit dem fertigen Prompt auf Deutsch:`;
    } else if (mode === 'deep_research_tools') {
      modeInstruction = `Transformiere das Thema in einen hochprofessionellen "Tool- & Software-Vergleich Deep Research Prompt".
Der Prompt muss enthalten: 1. [VERGLEICHS-KRITERIEN & TECH-STACK], 2. [FEATURE-MATRIX & PRO/CONTRA], 3. [PREIS-LEISTUNGS-VERHÄLTNIS & LIZENZEN], 4. [DSGVO- & DATENSCHUTZ-CHECK], 5. [EMPFEHLUNGS-MATRIX FÜR KMU].
Antworte AUSSCHLIESSLICH mit dem fertigen Prompt auf Deutsch:`;
    } else if (mode === 'deep_research_persona') {
      modeInstruction = `Transformiere das Thema in einen hochprofessionellen "Zielgruppen- & Buyer-Persona Deep Research Prompt".
Der Prompt muss enthalten: 1. [PERSONA-PROFIL & DEMOGRAFIE], 2. [HAUPT-SCHMERZPUNKTE & DESIDERATE], 3. [KAUFMOTIVE & TRIGGER-EVENTS], 4. [EINWAND- & EINWANDBEHANDLUNG], 5. [IDEALE ANSPRACHE-STRATEGIE].
Antworte AUSSCHLIESSLICH mit dem fertigen Prompt auf Deutsch:`;
    } else {
      // Default: Lead & SWOT Research
      modeInstruction = `Transformiere das Thema in einen hochprofessionellen "Lead- & SWOT-Recherche Deep Research Prompt".
Der Prompt muss enthalten: 1. [ZIEL & LEAD-QUALIFIZIERUNG] (Zielgruppe, Entscheider-Rollen, Kontaktwege), 2. [SWOT-ANALYSE MATRIX] (Stärken, Schwächen, Chancen, Risiken), 3. [RECHERCHE-METHODIK & BRANCHEN-DATEN], 4. [REPORT-STRUKTUR MIT LEAD-LISTING], 5. [QUELLEN-PRÜFUNG & CONSTRAINTS].
Antworte AUSSCHLIESSLICH mit dem fertigen Prompt auf Deutsch:`;
    }
  }

  const promptToOptimize = `${modeInstruction}\n\n${promptText}`;

  // 1. Try Gemini API chain
  if (geminiApiKey && geminiApiKey.trim()) {
    for (const model of GEMINI_MODELS) {
      try {
        console.log(`Versuche Prompt-Optimierung (${mode}) mit ${model}...`);
        const responseText = await callGeminiAPI(model, promptToOptimize, geminiApiKey);
        if (responseText) {
          return { text: responseText.trim(), source: `Gemini Cloud-KI (${model})` };
        }
      } catch (e) {
        console.warn(`Fehler bei Gemini Modell ${model}:`, e);
      }
    }
  }
  
  // 2. Try Ollama (Local AI)
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: "llama3",
        prompt: promptToOptimize,
        stream: false
      })
    });
    clearTimeout(id);
    
    if (response.ok) {
      const data = await response.json();
      if (data.response) {
        return { text: data.response.trim(), source: "lokaler Ollama-KI (llama3)" };
      }
    }
  } catch (e) {
    console.log("Ollama nicht erreichbar, nutze lokalen Fallback-Optimierer...", e);
  }

  // 3. Static Pattern Fallback
  if (mode.startsWith('deep_research')) {
    if (mode === 'deep_research_competitor') {
      const competitorFallback = `[DEEP RESEARCH PROMPT: WETTBOWERBER- & KONKURRENZANALYSE]

[1. ZIEL & RECHERCHE-SKOP]
Führe eine umfassende Konkurrenzanalyse durch zum Thema:
"${promptText}"

[2. MITBEWERBER-PROFILING & USPs]
- Identifiziere die Top 5 Marktteilnehmer (direkt & indirekt).
- Analysiere Produkte, Dienstleistungen, Preismodelle und Alleinstellungsmerkmale (USPs).
- Untersuche Marketingkanäle, SEO-Keywords und Online-Sichtbarkeit.

[3. STÄRKEN- & SCHWACHSTELLEN-ANALYSIS]
- Erstelle ein Vergleichsraster (Preise, Kundenservice, Qualität, Lieferzeit).
- Identifiziere häufige Beschwerden/Kritikpunkte von Kunden der Wettbewerber.

[4. ERGEBNIS-REPORT STRUKTUR]
1. Executive Summary der Marktlandschaft
2. Wettbewerber-Übersichtstabelle
3. Detaillierte Einzel-Profile
4. Schwachstellen- & Chancen-Matrix für den Markteintritt

[5. CONSTRAINTS]
- Nur belegbare Fakten, Preise und aktuelle Daten nutzen.`;
      return { text: competitorFallback, source: "integriertem Wettbewerber-Research Fallback" };
    }

    if (mode === 'deep_research_market') {
      const marketFallback = `[DEEP RESEARCH PROMPT: MARKTFORSCHUNG & TRENDS]

[1. MARKTGRÖSSE & WACHSTUM]
Führe eine Markt- und Trendstudie durch zum Thema:
"${promptText}"

- Welches Marktvolumen und welche jährlichen Wachstumsraten (CAGR) existieren?
- Welche Treiber und Hürden bestimmen die Branche derzeit?

[2. BRANCHE-TRENDS & REGULIERUNGEN]
- Welche technologischen, rechtlichen (z. B. DSGVO) und gesellschaftlichen Trends wirken?
- Welche neuen Geschäftsmodelle setzen sich durch?

[3. ERGEBNIS-REPORT STRUKTUR]
1. Executive Summary & Marktkennzahlen
2. Treiber & Marktbarrieren
3. Trend-Radarschild für die nächsten 3-5 Jahre
4. Strategische Handlungsempfehlungen für KMUs`;
      return { text: marketFallback, source: "integriertem Marktforschungs-Research Fallback" };
    }

    if (mode === 'deep_research_tools') {
      const toolsFallback = `[DEEP RESEARCH PROMPT: TOOL- & SOFTWAREVERGLEICH]

[1. EVALUATIONS-SKOP]
Führe einen objektiven Software- & Anbietervergleich durch für:
"${promptText}"

[2. VERGLEICHSKRITERIEN]
- Funktionsumfang & Kern-Features
- Preismodelle (Freemium, Abos, Versteckte Kosten)
- Integrationsfähigkeit & API-Schnittstellen (z. B. Zapier, Make, CRM)
- DSGVO- & Datenschutzkonformität (Serverstandort EU?)

[3. ANBIETER-MATRIX REPORT]
1. Executive Summary & Top-Empfehlung
2. Vergleichstabelle aller Anbieter
3. Vor- & Nachteile-Detailbericht je Tool
4. Entscheidungs-Checkliste für KMUs`;
      return { text: toolsFallback, source: "integriertem Tool-Vergleich Research Fallback" };
    }

    if (mode === 'deep_research_persona') {
      const personaFallback = `[DEEP RESEARCH PROMPT: ZIELGRUPPEN- & BUYER-PERSONA]

[1. PERSONA-IDENTIFIKATION]
Führe eine tiefgehende Zielgruppenrecherche durch für:
"${promptText}"

[2. SCHMERZPUNKTE & DESIDERATE]
- Was sind die drängendsten Probleme, Sorgen und Ängste der Zielgruppe?
- Welche emotionalen & rationalen Kaufmotive liegen vor?
- Welche Trigger-Events lösen eine konkrete Kaufentscheidung aus?

[3. EINWANDBEHANDLUNG & ANSPRACHE]
- Welche typischen Einwände (Kosten, Zeit, Misstrauen) entstehen?
- Auf welchen Kanälen (LinkedIn, Google, Empfehlungen) ist die Persona erreichbar?

[4. ERGEBNIS-REPORT STRUKTUR]
1. Persona-Steckbrief (Demografie, Rolle, Ziele)
2. Schmerzpunkt- & Wunschanalyse
3. Einwand- & Argumentationsleitfaden
4. Empfohlener Messaging- & Copywriting-Ansatz`;
      return { text: personaFallback, source: "integriertem Persona-Research Fallback" };
    }

    // Default: Lead & SWOT Research Fallback
    const deepResearchOptimized = `[DEEP RESEARCH PROMPT: LEAD- & SWOT-RECHERCHE]

[1. ZIEL & LEAD-QUALIFIZIERUNG]
Führe eine umfassende Lead- und Markt-Recherche durch für:
"${promptText}"

Lead-Suchparameter:
- Unternehmensgröße, Branche und regionale Abgrenzung.
- Typische Entscheider-Rollen (z. B. Geschäftsführer, Vertriebsleiter, IT-Leiter).
- Bevorzugte Erstkontaktwege (E-Mail, Telefon, Xing/LinkedIn).

[2. SWOT-ANALYSE MATRIX]
Erstelle eine fundierte SWOT-Matrix:
- Stärken (Strengths): Welche Vorteile bietet das Angebot der Zielgruppe?
- Schwächen (Weaknesses): Welche Schwachstellen oder Hürden existieren?
- Chancen (Opportunities): Welche ungehobenen Marktchancen bestehen?
- Risiken (Threats): Welche externen Risiken oder Konkurrenzdruck gibt es?

[3. METHODIK & SUCH-STRATEGIEN]
- Nutze Branchenregister, Unternehmensdatenbanken, Fachberichte & Online-Präsenzen.
- Analysiere den Digitalisierungsgrad und Social-Media-Präsenz der Leads.

[4. ERGEBNIS-STRUKTUR DES REPORTS]
1. Executive Summary (Kernerkenntnisse & Marktpotenzial)
2. SWOT-Matrix mit strategischen Schlussfolgerungen
3. Lead-Qualifizierungsprofil & Kontaktschema
4. Konkreter Schritt-für-Schritt-Ansprechplan für den Vertrieb`;
    return { text: deepResearchOptimized, source: "integriertem Lead & SWOT Research Fallback" };
  }

  const optimized = `[SYSTEM PROMPT]
Du bist eine hochentwickelte KI mit Spezialisierung auf KMU-Prozesse und Effizienzsteigerung.

[AUFGABE]
${promptText}

[ANWEISUNGEN]
1. Analysiere das Problem tiefgehend und strukturiert.
2. Nenne konkrete Praxisbeispiele oder direkt anwendbare Vorlagen.
3. Verwende verständliche und überzeugende Formulierungen.
4. Gib das Ergebnis in einer klaren Markdown-Struktur aus.
5. Weise auf potenzielle Hürden oder Fehlerquellen hin.`;
  
  return { text: optimized, source: "integriertem Smart-Fallback-Optimierer" };
};

export const askFirmengehirn = async ({ question, docsContent, geminiApiKey }) => {
  const systemPrompt = `Du bist das KI-Firmengehirn für "KMU Service Harz". Du hast vollen Zugriff auf das Master-Logbuch und alle Wissensdokumente des Gründers Robin.
Beantworte die folgende Frage präzise, auf den Punkt und ehrlich auf Deutsch basierend auf den Dokumenten. Nenne relevante Details wie Beträge, Fristen oder Rechtsformen, falls vorhanden.

--- WISSENSDOKUMENTE ---
${docsContent}
--- ENDE DOKUMENTE ---

Nutzer-Frage: ${question}`;

  // 1. Try Gemini Cloud API Models
  if (geminiApiKey && geminiApiKey.trim()) {
    for (const model of GEMINI_MODELS) {
      try {
        const responseText = await callGeminiAPI(model, systemPrompt, geminiApiKey);
        if (responseText) {
          return { text: responseText.trim(), source: `Gemini (${model})` };
        }
      } catch (e) {
        console.warn(`Gemini Model ${model} failed:`, e);
      }
    }
  }

  // 2. Try Ollama (Local AI)
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3500);
    
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: "llama3.2",
        prompt: systemPrompt,
        stream: false
      })
    });
    clearTimeout(id);
    
    if (response.ok) {
      const data = await response.json();
      if (data.response) {
        return { text: data.response.trim(), source: "Lokaler Ollama KI (Llama 3.2)" };
      }
    }
  } catch (e) {
    console.log("Ollama Local AI nicht erreichbar", e);
  }

  // 3. Offline Fulltext Search Fallback
  const matchingLines = docsContent
    .split('\n')
    .filter(line => {
      const words = question.toLowerCase().split(' ').filter(w => w.length > 3);
      return words.some(w => line.toLowerCase().includes(w));
    })
    .slice(0, 6);

  const fallbackText = matchingLines.length > 0
    ? `💡 **Wissens-Suchergebnis (Offline-Modus):**\n\n` + matchingLines.map(l => `• ${l.trim()}`).join('\n')
    : `💡 **Wissens-Suche:** Zu "${question}" wurden keine direkten Einträge gefunden. Tipp: Hinterlege einen kostenlosen Gemini API-Key in den KI-Einstellungen für tiefere KI-Antworten.`;

  return { text: fallbackText, source: "Lokale Volltext-Suche" };
};

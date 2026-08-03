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

export const optimizePromptWithLocalAI = async ({ promptText, geminiApiKey }) => {
  if (!promptText.trim()) {
    throw new Error("Bitte gib zuerst einen Prompt-Entwurf in das Textfeld ein.");
  }
  
  // 1. Try Gemini API chain
  if (geminiApiKey && geminiApiKey.trim()) {
    const promptToOptimize = `Optimiere diesen Prompt für ein LLM (mache ihn präzise, strukturiert und füge klare Anweisungen hinzu). Antworte NUR mit dem verbesserten Prompt-Text, ohne Einleitung oder Erklärung:\n\n${promptText}`;
    
    for (const model of GEMINI_MODELS) {
      try {
        console.log(`Versuche Prompt-Optimierung mit ${model}...`);
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
        prompt: `Optimiere diesen Prompt für ein LLM (mache ihn präzise, strukturiert und füge klare Anweisungen hinzu). Antworte NUR mit dem verbesserten Prompt-Text, ohne Einleitung oder Erklärung:\n\n${promptText}`,
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

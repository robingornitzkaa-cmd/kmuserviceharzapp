# KI-Naming-Methoden & Prompt-Workflows: Das Praxishandbuch für B2B-Markenentwicklung

> **Projekt:** KMU Service Harz – B2B-Büroautomatisierung & E-Rechnung für Handwerk & KMU  
> **Verfasser:** Senior Naming-Stratege, Markenlinguist & Transformer-Architekt  
> **Stand:** Oktober 2026 / Version 3.0 Final  
> **Zielgruppe:** Gründer, Marketingverantwortliche und Entwickler, die systematisch, reproduzierbar und ohne Klischees starke B2B-Markennamen mit generativer KI entwickeln wollen.

---

## Inhaltsverzeichnis
1. [Teil 1: Die algorithmische Ursachenanalyse – Warum Standard-Prompts scheitern](#teil-1-die-algorithmische-ursachenanalyse--warum-standard-prompts-scheitern)
   - [1.1 Wahrscheinlichkeitslandschaften & Token-Konditionierung](#11-wahrscheinlichkeitslandschaften--token-konditionierung)
   - [1.2 Das Sampling-Dilemma: Temperature vs. Nucleus (Top-p)](#12-das-sampling-dilemma-temperature-vs-nucleus-top-p)
   - [1.3 RLHF-Modus-Kollaps & der „Safe-Zone“-Attraktor](#13-rlhf-modus-kollaps--der-safe-zone-attraktor)
   - [1.4 Attention-Sink-Biases & Literal-Attractor-Kollisionen](#14-attention-sink-biases--literal-attractor-kollisionen)
   - [1.5 Die 4 Prompt-Hebel zur Überwindung lokaler Optima](#15-die-4-prompt-hebel-zur-überwindung-lokaler-optima)
2. [Teil 2: Enzyklopädie der 10 fortgeschrittenen KI-Naming-Methoden & Prompt-Templates](#teil-2-enzyklopädie-der-10-fortgeschrittenen-ki-naming-methoden--prompt-templates)
   - [Methode 1: Linguistische Morphem-Matrizen](#methode-1-linguistische-morphem-matrizen)
   - [Methode 2: Archetypen-Rollenspiel](#methode-2-archetypen-rollenspiel)
   - [Methode 3: Negativ-Constraint-Prompting](#methode-3-negativ-constraint-prompting)
   - [Methode 4: Few-Shot mit Anti-Mustern](#methode-4-few-shot-mit-anti-mustern)
   - [Methode 5: Lateral-Thinking-Ketten](#methode-5-lateral-thinking-ketten)
   - [Methode 6: Semantische Dekonstruktion](#methode-6-semantische-dekonstruktion)
   - [Methode 7: Rekursive Bewertungs-Prompts](#methode-7-rekursive-bewertungs-prompts)
   - [Methode 8: Phonetische Resonanz-Filterung](#methode-8-phonetische-resonanz-filterung)
   - [Methode 9: Semiotische Quadranten](#methode-9-semiotische-quadranten)
   - [Methode 10: Hyper-spezifische Szenario-Simulation](#methode-10-hyper-spezifische-szenario-simulation)
3. [Teil 3: Vergleichende Bewertungsmatrix der 10 Techniken](#teil-3-vergleichende-bewertungsmatrix-der-10-techniken)
4. [Teil 4: Das 4-Stufen-Master-Workflow-Playbook (End-to-End Orchestrierung)](#teil-4-das-4-stufen-master-workflow-playbook-end-to-end-orchestrierung)

---

# Teil 1: Die algorithmische Ursachenanalyse – Warum Standard-Prompts scheitern

Gibt ein Anwender in ein modernes Large Language Model (z. B. GPT-4, Claude 3.5 Sonnet oder Gemini 1.5 Pro) einen typischen Alltags-Prompt ein:

> *„Gib mir 10 kreative, moderne Markennamen für eine Agentur, die Büros im Handwerk automatisiert.“*

dann ist das Ergebnis fast ausnahmslos enttäuschend, repetitiv und praxisfern:
1. **Kofferwort-Monstrositäten:** *AutoCraft*, *HandwerksFlow*, *BüroBot*, *ProzessFix*.
2. **Sterile IT-Anglizismen:** *CraftSolutions*, *TaskSync*, *SmartHandwerk*, *CloudWorkx*.
3. **Pseudo-lateinische Kunstwort-Hülsen:** *Novafy*, *Servio*, *Optimo*, *Klarify*.
4. **Aufgesetzte Handwerks-Nostalgie:** *DigitalSchmiede*, *BüroWerk*, *ZunftLotse*.

Dieses Phänomen ist **kein Zufall** und kein „Mangel an KI-Kreativität“. Es ist die direkte mathematische und systemische Konsequenz der Transformator-Architektur, des Trainingsziels und der nachgelagerten Alignment-Verfahren.

---

### 1.1 Wahrscheinlichkeitslandschaften & Token-Konditionierung

Moderne LLMs sind autoregressive Next-Token-Prädiktoren. Gegeben eine Sequenz vorangegangener Tokens $x_1, \dots, x_{t-1}$, berechnet das neuronale Netz eine Wahrscheinlichkeitsverteilung über das gesamte Vokabular $V$:

$$P(x_t \mid x_1, \dots, x_{t-1}) = \text{softmax}\left(\frac{z_t}{T}\right) = \frac{\exp(z_t / T)}{\sum_{j \in V} \exp(z_j / T)}$$

Hierbei repräsentiert $z_t$ die unnormierten Logits des Modells und $T$ die Sampling-Temperatur.

```
Token-Wahrscheinlichkeitslandschaft bei intuitivem Standard-Prompt:
  Hohe Wahrscheinlichkeit (Attraktor):
  |   [Werk]     [Schmiede]    [Solutions]    [Flow]      [Tech]
  |   ██████     ████████      █████████      █████       ████████
  |
  |   Niedrige Wahrscheinlichkeit (Unentdeckte Perlen im Tail):
  |   [Kraftschluss]   [Klarbund]   [Masshalt]   [Zeitgriff]
  +------------------------------------------------------------> Vokabular-Tokens
```

- **Unigramm- & Bigramm-Priors im Pretraining:** Im gigantischen Trainingskorpus (Milliarden von Webseiten, GitHub-Repositories, Agentur-Homepages, LinkedIn-Profilen) korrelieren die Tokens `Automatisierung`, `Büro` und `Agentur` extrem stark mit Begriffen wie `Solutions`, `Digital`, `Tech`, `Smart`, `Sync` und `Flow`.
- **Lokale Wahrscheinlichkeits-Senken (Attraktoren):** Sobald das Modell das Wort `Handwerk` verarbeitet, explodieren die Aufmerksamkeitsgewichte für handwerkliche Klischee-Substantive: `Werk`, `Schmiede`, `Zunft`, `Meister`.
- **Das kartesische Produkt des Mittelmaßes:** Fragt man unkonditioniert nach „Handwerk + Automatisierung“, multipliziert das LLM die Wahrscheinlichkeitsmaxima beider Domänen. Es wählt den Pfad des geringsten mathematischen Widerstands: `Handwerk` + `Tech` $\rightarrow$ *HandwerkTech* oder `Prozess` + `Werk` $\rightarrow$ *Prozesswerk*.

---

### 1.2 Das Sampling-Dilemma: Temperature vs. Nucleus (Top-p)

Viele Nutzer versuchen, diesem Automatismus durch bloßes Hochschrauben der Hyperparameter zu entkommen. Dies führt in ein mathematisches Dilemma:

1. **Niedrige Temperatur ($T \le 0.5$):**  
   Das Modell führt einen Quasi-Greedy-Search durch. Die Wahrscheinlichkeitsspitzen werden noch schärfer. Das Modell wählt fast deterministisch die abgedroschensten Klischees (*ProzessSchmiede*, *SmartCraft*).
2. **Hohe Temperatur ($T \ge 1.2$):**  
   Die Wahrscheinlichkeitsverteilung flacht ab. Das Modell zieht Tokens aus den extremen Rändern („Tails“). Das Ergebnis ist jedoch keine linguistische Genialität, sondern **phonotaktisches Rauschen**: Es entstehen unartikulierte Kunstwörter (*Qruvxo*, *Zylfex*) oder semantisch sinnlose Wortkombinationen (*Eichhörnchen-Cloud*), da die semantische Kohärenz zum handwerklichen Kontext abreißt.
3. **Nucleus-Sampling (Top-p, z. B. $p=0.9$):**  
   Top-p schneidet die untersten 10 % der Wahrscheinlichkeitsmasse ab. Befinden sich im verbleibenden 90-%-Kern jedoch 50 Variationen von IT-Anglizismen und Werkstatt-Metaphern, rotiert das Modell lediglich innerhalb dieses standardisierten Pools.

---

### 1.3 RLHF-Modus-Kollaps & der „Safe-Zone“-Attraktor

Nahezu alle modernen Produktionsmodelle wurden mittels **RLHF (Reinforcement Learning from Human Feedback)** und **DPO (Direct Preference Optimization)** ausgerichtet:
- Menschliche Labeler bewerten Antworten tendenziell schlechter, wenn sie ungewöhnlich, formal riskant oder scheinbar unverständlich wirken.
- Die Reward-Modelle belohnen stattdessen formale Glätte, Höflichkeit, Konventionalität und leicht verdauliche Standardmuster.
- **Folge:** Der multimodale Lösungsraum schrumpft auf eine schmale „Safe Zone“ zusammen (*Mode Collapse*). Das Modell „weiß“: Mit Begriffen wie *„ProzessOptima“* oder *„HandwerkFlow“* macht es keinen formalen Fehler; sie klingen nach seriöser Software und verletzen keine Grammatikregeln. Originelle, avantgardistische oder rein nutzenbasierte Bildbegriffe liegen außerhalb dieser RLHF-Sicherheitszone.

---

### 1.4 Attention-Sink-Biases & Literal-Attractor-Kollisionen

Die Multi-Head-Self-Attention-Mechanik von Transformern weist zwei strukturelle Verzerrungen auf:
1. **Initial Token & High-Salience Bias:** Den ersten Tokens eines Prompts sowie extrem aufgeladenen Substantiven (`Handwerk`, `Software`) werden unverhältnismäßig hohe Aufmerksamkeitsgewichte zugewiesen. Die Repräsentation im latenten Raum wird von diesen Konzepten förmlich „eingesaugt“ (*Attention Sink*).
2. **Fehlende holistische Klangplanung (Sub-Token-Kurzsichtigkeit):** Da das Modell autoregressiv Token für Token erzeugt, bewertet es nicht den ganzheitlichen Sprachrhythmus (z. B. trochäische Metrik oder DIN-Buchstabierbarkeit) im Voraus. Ohne strukturierte Zwischenschritte wählt es für Token 2 schlicht dasjenige, das am häufigsten statistisch auf Token 1 folgt.

---

### 1.5 Die 4 Prompt-Hebel zur Überwindung lokaler Optima

Um das LLM reproduzierbar aus diesen statistischen Attraktoren herauszuzwingen, müssen strukturierte Prompt-Hebel implementiert werden:

```
+---------------------------------------------------------------------------------------------------+
| 1. Hard Lexical Constraints (Negative Logit Shifting)                                             |
|    Explizite Verbotslisten schneiden die Moden der Wahrscheinlichkeitsverteilung aktiv ab.         |
|    -> Das Modell MUSS Tokens aus sekundären und tertiären semantischen Feldern wählen.           |
+---------------------------------------------------------------------------------------------------+
                                                  |
+---------------------------------------------------------------------------------------------------+
| 2. Orthogonale Domänenübertragung (Latent Space Shift)                                            |
|    Injektion von Konzepten aus fremden Domänen (Mechanik, Getriebelehre, Geologie, Holzbau).       |
|    -> Verschiebt die Attention-Gewichte weg von "IT/Software" hin zu physischer Stabilität.      |
+---------------------------------------------------------------------------------------------------+
                                                  |
+---------------------------------------------------------------------------------------------------+
| 3. Morphem-basierte Dekonstruktion (Sub-Token Assembly)                                           |
|    Das LLM generiert nicht direkt den Namen, sondern befüllt erst linguistische Matrizen         |
|    (Wurzeln, Fugen, funktionale Suffixe) und kombiniert diese nach Metrik-Regeln.                |
+---------------------------------------------------------------------------------------------------+
                                                  |
+---------------------------------------------------------------------------------------------------+
| 4. Multi-Pass Evaluator-Generator Split (Adversarial Critic Architecture)                         |
|    Trennung von Divergenz (Kreation) und Konvergenz (Auslese) in getrennte Systemrollen.           |
|    -> Ein schonungsloser "Handwerksmeister-Critic" eliminiert Klischees gnadenlos im Refinement. |
+---------------------------------------------------------------------------------------------------+
```

---

# Teil 2: Enzyklopädie der 10 fortgeschrittenen KI-Naming-Methoden & Prompt-Templates

Im Folgenden werden 10 wissenschaftlich und methodisch fundierte Naming-Techniken detailliert dekonstruiert. Jede Methode enthält:
- Den theoretischen & kognitionswissenschaftlichen Wirkmechanismus
- Ein vollständig ausformuliertes, copy-paste-fähiges, produktionsreifes Prompt-Template für den deutschen B2B- & Handwerkskontext (KMU Service Harz)
- Die konkrete Spezifikation der Ein- und Ausgabeformate
- Eine objektive Bewertung (Vorteile, Nachteile, Best-Fit Einsatzbereich)

---

## Methode 1: Linguistische Morphem-Matrizen

### 1.1 Theoretischer Hintergrund & Wirkmechanismus
Die Methode basiert auf der morphologischen Zerlegung von Wörtern in ihre kleinsten bedeutungstragenden Einheiten (Morpheme): freie Lexem-Stämme, gebundene Morpheme, Präfixe und Suffixe (nominalisierend, augmentativ, aktivierend).  
Statt das LLM unkontrolliert ganze Kunstwörter erraten zu lassen, wird das Modell gezwungen, in einer 3-Spalten-Matrix linguistische Bausteine zu isolieren, die strikten phonotaktischen und semantischen Kriterien genügen. Die Fusion erfolgt anschließend nach festen metasprachlichen Regeln (Trochäus-Rhythmus, Konsonanten-Klangfarbe).

### 1.2 Produktionsreifes Prompt-Template

```markdown
### SYSTEM-PROMPT:
Du agierst als habilitierter Computerlinguist, morphologischer Etymologe und B2B-Markenstratege für den deutschen Mittelstand. Deine Spezialdisziplin ist die Entwicklung unverbrauchter, klangvoller Markennamen durch systematische Rekombination morphologischer Stämme (Morphem-Matrizen).

### AUFGABE:
Entwickle über eine 3x3-Morphem-Matrix 10 eigenständige, schablonenfreie Markennamen für eine spezialisierte B2B-Agentur für Büro- und Prozessautomatisierung im Handwerk (Inh. Robin Gornitzka, Harz / überregional).

### STRUKTURELLE VORGABEN & METHODISCHE SCHRITTE:
1. SCHRITT 1: MORPHEM-MATRIX AUFBAUEN
   Erstelle eine tabellarische Matrix mit drei Spalten:
   - Spalte A (Semantische Wurzeln / Stämme): 8 kurze, kraftvolle deutsche oder germanische Wortstämme, die Stabilität, Entlastung, Ruhe, Takt oder Klarheit codieren (z. B. `klar`, `rast`, `takt`, `bund`, `stand`, `halt`, `eben`, `fug`).
   - Spalte B (Kopplungs- & Fusions-Elemente): 5 kurze Vokalverbindungen oder flüssige Konsonanten-Übergänge (`-o-`, `-a-`, `-en-`, `-is-`, `-um-`).
   - Spalte C (Funktionale Suffixe / Endungen): 6 Endungen mit hoher kaufmännischer oder handwerklicher Gravitas (z. B. `-os`, `-or`, `-on`, `-a`, `-ex`, `-um`, `-is`).

2. SCHRITT 2: SYSTEMATISCHE KOMBINATORIK
   Kombiniere Elemente aus A + B + C oder direkt A + C zu maximal zweisilbigen Neologismen oder prägnanten Komposita.

3. SCHRITT 3: PHONOTAKTISCHER FILTER
   Prüfe jedes Wort auf:
   - Trochäische Betonung (Betont - Unbetont: `X x`)
   - Vermeidung harter Konsonantenhäufungen (keine mehr als 2 Konsonanten hintereinander)
   - Deutsche Aussprache-Sicherheit ohne Denglisch-Falle

### NEGATIV-CONSTRAINTS (STRIKT VERBOTEN):
- Keine verbrauchten Schablonen: `Werk`, `Schmiede`, `Lotse`, `Bank` (auch nicht als Morphem)
- Keine IT-Buzzwords: `Tech`, `Soft`, `Data`, `Cloud`, `Sync`, `Flow`, `Bot`, `AI`, `Smart`, `Solutions`
- Keine Altnamen: `Klarstand`, `Freikopf`, `Bürofrieden`, `Praxos`, `Ordonis`, `Valido`, `Hebelpunkt`

### AUSGABEFORMAT:
Präsentiere zuerst die Matrix und danach die 10 besten Namen als Markdown-Tabelle:
| Nr. | Morphem-Formel (A + B + C) | Finaler Markenname | Phonetischer Rhythmus | Psychologische Wirkung beim Handwerksmeister |
|:---|:---|:---|:---|:---|
| 1 | `[Wurzel]` + `[Suffix]` | **[Name]** | Trochäus (X x) | [Präzise 1-Satz-Begründung] |
```

### 1.3 Bewertung & Einsatzprofil
- **Vorteile:** Mathematisch präzise Kontrolle über Lautstruktur; verhindert Denglisch und alberne Kofferwörter; exzellente markenrechtliche Schutzfähigkeit der Neologismen.
- **Nachteile:** Kann bei zu akademischer Stammwahl steril oder kalt wirken; erfordert Feingefühl bei der Bedeutungsaufladung.
- **Best-Fit:** Moderne Neologismen, Kunstwörter, technologiegestützte Kanzlei- und Handwerker-Dienstleister.

---

## Methode 2: Archetypen-Rollenspiel

### 2.1 Theoretischer Hintergrund & Wirkmechanismus
Nach C. G. Jung existieren universelle Urbilder im kollektiven Unbewussten, die von Margaret Mark und Carol S. Pearson für die Markenführung operationalisiert wurden.  
Klassische IT-Dienstleister tappen oft in die Falle des *Magiers* (abstrakte Zaubertechnologie) oder des *Entdeckers* (ständige Neuerfindung), was beim Handwerker Misstrauen schürt. Für den Handwerks-Mittelstand funktioniert primär die Triade aus:
- **Der Jedermann (Everyman):** Partnerschaftlichkeit, Augenhöhe, Verlässlichkeit, Ehrlichkeit.
- **Der Herrscher (Ruler):** Kaufmännische Souveränität, GoBD-Rechtssicherheit, administrative Ordnung.
- **Der Beschützer (Caregiver):** Rettung des Feierabends, Bewahrung vor Betriebsprüfungen und Zettelchaos.

### 2.2 Produktionsreifes Prompt-Template

```markdown
### SYSTEM-PROMPT:
Du bist ein renommierter Markenpsychologe, spezialisiert auf archetypische Tiefenpsychologie (nach C.G. Jung und Pearson/Mark) im industriellen und handwerklichen B2B-Mittelstand.

### KONTEXT:
Ein B2B-Automatisierungsdienstleister im Harz befreit Handwerksbetriebe (SHK, Elektro, Bau) von Zettelwirtschaft, Belegchaos und administrativen Überstunden durch schlüsselfertige, unauffällige No-Code-Schnittstellen (DATEV, Lexoffice, E-Rechnung).

### ARCHETYPEN-FOKUS & PSYCHOLOGISCHE TENSION:
Erzeuge Namen aus dem Spannungsfeld dreier dominanter Archetypen:
1. ARCHETYP A: „DER REGULAR GUY / JEDERMANN“ (Bodenständig, auf Augenhöhe, ohne Krawatte, spricht Klartext)
2. ARCHETYP B: „DER HERRSCHER“ (Souveräne Kontrolle, absolute GoBD-Rechtssicherheit, administrative Meisterschaft)
3. ARCHETYP C: „DER BESCHÜTZER“ (Schenkt Feierabend, bewahrt vor Behördenstress und Burnout)

### ARBEITSSCHRITTE:
1. Erstelle eine mentale Persona für jeden der 3 Archetypen bezogen auf das Büro eines SHK-Betriebs.
2. Identifiziere für jeden Archetyp 5 Leitbegriffe, die KEINE IT-Anglizismen sind.
3. Bilde 10 Markennamen, die durch die Kreuzung von mindestens zwei dieser Archetypen entstehen (z. B. Jedermann + Herrscher = bodenständige Souveränität).

### NEGATIVE EINSCHRÄNKUNGEN:
- Absolutes Verbot von: `Werk`, `Schmiede`, `Lotse`, `Bank`
- Kein akademischer oder elitärer Klang (keine lateinischen Kanzleidreiklänge, keine Modewörter)
- Keine Comic- oder Superhelden-Namen (`Büro-Held`, `Doc`, `Ninja`)

### AUSGABEFORMAT:
| Nr. | Markenname | Archetypen-Synthese | Primäres Signal an den Meister | Eignung für Angebot & Rechnung |
|:---|:---|:---|:---|:---|
| 1 | **[Name]** | Jedermann (60%) + Herrscher (40%) | [Signal] | [Rechnungs-Wirkung] |
```

### 2.3 Bewertung & Einsatzprofil
- **Vorteile:** Hohe emotionale Treffsicherheit; erzeugt Namen, die tiefes Kundenvertrauen auslösen; ideal für inhabergeführte Betriebe.
- **Nachteile:** Gefahr pathetischer Übertreibung, wenn der „Jedermann“-Anteil nicht dominiert.
- **Best-Fit:** Positionierungsgetriebene Marken, werteorientierte Dienstleistungen.

---

## Methode 3: Negativ-Constraint-Prompting

### 3.1 Theoretischer Hintergrund & Wirkmechanismus
Mathematisch entspricht Negativ-Constraint-Prompting dem gezielten Nullsetzen bestimmter Logit-Bereiche im Decoder. Indem alle trivialen Ausweichpfade des Modells per expliziter Syntax blockiert werden, steigt die Entropie gezwungenermaßen. Das Modell kann nicht mehr auf seine trainierten Bigramme (`Digital Solutions`, `Smart Craft`) zugreifen.  
Besonders effektiv ist die Methode, wenn nicht nur einzelne Wörter, sondern *semantische Klassen* (z. B. „alle englischen Verben“) und *syntaktische Muster* (z. B. CamelCase oder Bindestrich-Konstrukte) verboten werden.

### 3.2 Produktionsreifes Prompt-Template

```markdown
### SYSTEM-PROMPT:
Du bist ein extrem strenger Naming-Auditor und linguistischer Stratege. Du akzeptierst ausschließlich Markennamen, die ein rigides, mehrstufiges Negativ-Ausschluss-Gitter zu 100 % fehlerfrei passieren.

### ZIEL:
Generiere 10 hochseriöse, prägnante Markennamen für das Büroautomatisierungs-Einzelunternehmen von Robin Gornitzka im Harz.

### DIE SCHWARZE LISTE (HARTE NEGATIV-CONSTRAINTS):
Falls auch nur EIN einziger Vorschlag gegen eines der folgenden Kriterien verstößt, ist die gesamte Antwort ungültig:

1. WORT-SCHABLONEN-BANN:
   Kein `Werk`, `Schmiede`, `Lotse`, `Bank`, `Bude`, `Kiste`, `Zunft`, `Stube`, `Fabrik` (weder als Einzelwort, noch als Wortteil).
2. IT- & BUZZWORD-BANN:
   Kein `Tech`, `Digital`, `Solutions`, `Cloud`, `Smart`, `AI`, `KI`, `Data`, `Hub`, `Lab`, `Flow`, `Sync`, `Auto`, `Connect`, `Soft`, `App`.
3. SYNTAKTISCHER & FORMALER BANN:
   - Keine Bindestrich-Kombinationen (kein `Büro-X`)
   - Keine Kamel-Schreibweise (CamelCase wie `ProzessFix`)
   - Keine pseudo-englischen Verben oder Kunstendungen auf `-ify`, `-ly`, `-io`, `-ia`
   - Kein Name darf länger als 10 Buchstaben sein
   - Maximal 2 Silben
4. HISTORISCHER BANN:
   Keiner der bereits entwickelten Namen aus vorherigen Runden: `Klarstand`, `Freikopf`, `Bürofrieden`, `Bürologik`, `Kernprozess`, `Praxos`, `Ordonis`, `Valido`, `Hebelpunkt`, `Gleichlauf`, `Prozesswerk`, `Büroschmiede`, `Flusswerk`, `Klarzeit`, `Ruhetakt`, `Freitakt`.

### DENKRAUM (WAS ERLAUBT & GEWÜNSCHT IST):
Substantive aus der deutschen Sprache oder edle, substanzielle Neologismen, die kaufmännische Ruhe, Rhythmus, Passung, Ausgleich, Schnittstelle oder klares Handeln verkörpern.

### AUSGABEFORMAT:
Präsentiere für jeden der 10 Namen den lückenlosen Konformitätsnachweis:
1. **[NAME]**
   - Wortlänge / Silbenzahl: [z. B. 6 Buchstaben / 2 Silben]
   - Semantischer Kern: [Bedeutung]
   - Negativ-Filter-Audit: 100 % frei von Schablonen, Anglizismen und CamelCase [Bestätigt]
   - Rechnungs-Test: „[NAME] – Inh. Robin Gornitzka“ [Prüf-Urteil]
```

### 3.3 Bewertung & Einsatzprofil
- **Vorteile:** Maximale Disziplin und Treue zu Projektvorgaben; 100 %ige Beseitigung unerwünschter Phrasen.
- **Nachteile:** Bei übermäßig vielen Verboten kann das Modell in eine Blockade („Constraint Frustration“) geraten und leere Ausweichmuster generieren.
- **Best-Fit:** Compliance-Filterung, Bereinigung von Rohlisten, Feinschliff vor Markteintritt.

> ⚠️ **Didaktische Lektion: BPE-Tokenisierung vs. Silben- und Zeichenzählung bei LLMs**  
> Große Sprachmodelle (LLMs) verarbeiten Text nicht zeichenweise, sondern über Subword-Tokenisierung (Byte-Pair Encoding, BPE). Ein einzelner Token repräsentiert häufig zwei bis fünf Buchstaben oder Silbenteile (z. B. zerlegt der Tokenizer `Klarbund` in zwei Teil-Token `Klar` und `bund`). Das Modell besitzt keinen nativen Zeichenzähler und kein anatomisches Modell des menschlichen Vokaltrakts. Aus diesem Grund können LLMs weder Buchstabenlängen („Maximal 10 Buchstaben“) noch Silbenzahlen („Maximal 2 Silben“) deterministisch im Prompt einhalten; sie halluzinieren im Begründungstext oft falsche Längenangaben. **Strategische Konsequenz:** Negative Längen- und Silben-Constraints im Prompt dienen der qualitativen Richtungssteuerung. Die harte Einhaltung von Längenbeschränkungen erfordert zwingend eine nachgelagerte, skriptbasierte Validierung (wie in Teil 4 implementiert).

---

## Methode 4: Few-Shot mit Anti-Mustern

### 4.1 Theoretischer Hintergrund & Wirkmechanismus
Standardmäßiges Few-Shot-Prompting zeigt dem LLM nur positive Zielbeispiele. Dadurch lernt das Modell jedoch nicht die *Entscheidungsgrenzen* (Decision Boundaries) des gewünschten latenten Raums.  
Kontrastives Few-Shot-Prompting stellt jeweils ein negatives Anti-Muster direkt einem positiven Meisterbeispiel gegenüber und liefert die explizite Begründung für die Disqualifikation bzw. Prämierung. Das Modell passt seine Aufmerksamkeitsmatrix an diesen Kontrastkanten an und lernt, feine Nuancen zwischen „billig-platt“ und „substanzvoll-prägnant“ zu unterscheiden.

### 4.2 Produktionsreifes Prompt-Template

```markdown
### SYSTEM-PROMPT:
Du bist ein erfahrener CDO (Chief Design Officer) und Naming-Dozent. Du unterrichtest die Methodik der kontrastiven Abgrenzung (Contrastive In-Context Learning).

### AUFGABE:
Entwickle 10 erstklassige Markennamen für KMU Service Harz (Automatisierung von Handwerksbüros, E-Rechnung, DATEV-Pipeline). Nutze dazu die folgende kontrastive Lernmatrix als Leitlinie.

### KONTRASTIVE TRAININGSMATRIX (GOOD VS. BAD PAIRS):

Paar 1 (Das Schablonen-Dilemma):
- ❌ BAD: „Büroschmiede Harz“
  -> Warum schlecht: Abgedroschene Handwerksromantik; Schmiede passt zu glühendem Eisen, wirkt bei Software-Schnittstellen und Rechnungen lächerlich und bemüht.
- ✅ GOOD: „Klarstand“
  -> Warum meisterhaft: Nüchtern, drückt exakt den kaufmännischen Zustand nach getaner Arbeit aus; kein Kitsch, maximale Seriosität.

Paar 2 (Das IT-Denglisch-Dilemma):
- ❌ BAD: „CraftFlow Solutions“
  -> Warum schlecht: Unverständliches Agentur-Englisch; Meister Thomas winkt genervt ab („Wieder so ein Großstadt-Fritze, der mir teure Lizenzen andrehen will“).
- ✅ GOOD: „Gleichlauf“
  -> Warum meisterhaft: Mechanischer Begriff aus dem Maschinenbau. Jeder Handwerker versteht sofort: Baustelle und Büro laufen synchron ohne Ruckeln.

Paar 3 (Das Kofferwort-Dilemma):
- ❌ BAD: „AutoHandwerk“
  -> Warum schlecht: Klingt nach Kfz-Reparaturwerkstatt oder billigem Software-Plugin.
- ✅ GOOD: „Hebelpunkt“
  -> Warum meisterhaft: Physikalische Metapher. Mit kleinem kaufmännischem Hebel riesige administrative Lasten bewegen.

Paar 4 (Das Kunstwort-Dilemma):
- ❌ BAD: „Taskify24“
  -> Warum schlecht: Billiges Start-up-SaaS-Klischee; signalisiert unseriöse Online-Tools ohne Vor-Ort-Ansprechpartner.
- ✅ GOOD: „Valido“
  -> Warum meisterhaft: Lehnt sich an valide/validieren an; vermittelt dem Steuerberater und Meister sofort GoBD-Sicherheit und Gültigkeit.

### GENERIERUNGS-AUFTRAG:
Erzeuge nun 10 NEUE Namen, die exakt die Qualitätskriterien der „GOOD“-Beispiele erfüllen und keinesfalls in die Fallen der „BAD“-Beispiele tappen.

### AUSGABEFORMAT:
| Nr. | Neuer Markenname | Warum dieser Name die „GOOD“-Kriterien erfüllt | Welches konkrete „BAD“-Muster verhindert wurde |
|:---|:---|:---|:---|
| 1 | **[Name]** | [Begründung] | [Verhindertes Fehlmuster] |
```

### 4.3 Bewertung & Einsatzprofil
- **Vorteile:** Exzellente Vermittlung subtiler Stil- und Geschmacksurteile; drastische Reduktion von Fehlinterpretationen.
- **Nachteile:** Erfordert hochwertige, maßgeschneiderte Input-Paare; Modell neigt gelegentlich dazu, positive Beispiele strukturell zu kopieren.
- **Best-Fit:** Qualitätskalibrierung, Schulung des Modells auf anspruchsvolle B2B-Tonalität.

---

## Methode 5: Lateral-Thinking-Ketten

### 5.1 Theoretischer Hintergrund & Wirkmechanismus
Nach Edward de Bono verharrt logisches Denken in vertikalen Mustern (ausgetretenen Pfaden). Um neue Ideen zu finden, bedarf es *lateraler Sprünge* durch bewusste Provokation (*Provocative Operation - PO*) oder zufällige Reizwörter (*Random Stimulus*).  
Im Prompting wird das Modell gezwungen, das Konzept „Büroautomatisierung im Handwerk“ mit völlig disjunkten Domänen (z. B. Getriebebau, Harzer Geologie, alpine Vermessung, Holzverbindungen, Hydrodynamik) zu zwangsverheiraten. Durch diese erzwungene semantische Distanz entstehen Metaphern, die im Wettbewerbsumfeld völlig einzigartig sind.

### 5.2 Produktionsreifes Prompt-Template

```markdown
### SYSTEM-PROMPT:
Du bist ein Meister des lateralen Denkens nach Edward de Bono und Querdenker für disruptive Markenarchitektur.

### METHODE:
Wir nutzen die Technik der „Random Cross-Domain Provocation“ (Zufällige Domänen-Kollision). Wir verknüpfen das Zielthema „Büroautomatisierung & E-Rechnung für Handwerksbetriebe“ nacheinander mit 5 völlig fremden Wissensgebieten:
- Domäne 1: Mechanik & Getriebebau (Zahnräder, Passfedern, Flucht, Spiel, Drehmoment)
- Domäne 2: Harzer Geologie & Bergbau-Tradition ohne Kitsch (Granit, Stollenwasser, Schacht, Erzgang, Quarz)
- Domäne 3: Forst- & Holzkunde (Kernholz, Jahresring, Zapfenverbindung, Fällkeil, Faserverlauf)
- Domäne 4: Hydrodynamik & Leitungsbau (Druckausgleich, Gefälle, Freispiegel, Siphon, laminare Strömung)
- Domäne 5: Alpine Vermessung & Navigation (Peilung, Fixpunkt, Höhenlinie, Lot, Horizont)

### ABLAUF IN 2 SCHRITTEN:
1. SCHRITT 1 (LATERALE BRÜCKE):
   Wähle aus jeder der 5 Domänen 3 prägnante Fachbegriffe oder Phänomene aus. Erkläre in einem Satz die funktionale Analogie zum Büroalltag eines Handwerkers (z. B. „Ein Siphon verhindert Gestank – eine saubere Schnittstelle verhindert Belegchaos“).
2. SCHRITT 2 (NAMENSTRANSFORMATION):
   Destilliere aus jeder Analogie 2 hochgradig marktfähige, seriöse B2B-Markennamen (Gesamt: 10 Namen).

### REGELN:
- Keine kitschige Brauchtumssprache („Glückauf-Automatisierung“ ist verboten!)
- Keine abgedroschenen Schablonen (`Werk`, `Schmiede`, `Lotse`, `Bank`)
- Keine IT-Buzzwords

### AUSGABEFORMAT:
Für jede Domäne:
- **Domäne X:**
  - Analogie: [Funktionale Brücke]
  - Name 1: **[Name]** | Begründung: [Warum dieser Begriff sofort einleuchtet]
  - Name 2: **[Name]** | Begründung: [Warum dieser Begriff sofort einleuchtet]
```

### 5.3 Bewertung & Einsatzprofil
- **Vorteile:** Höchstes Innovations- und Differenzierungspotenzial; bricht verkrustete Denkmuster vollständig auf.
- **Nachteile:** Generiert gelegentlich zu weit hergeholte Metaphern, die beim Kunden Erklärungsbedarf auslösen.
- **Best-Fit:** Frühe Explorationsphase, Findung unverbrauchter Bildwelten und starker Sachbegriffe.

---

## Methode 6: Semantische Dekonstruktion

### 6.1 Theoretischer Hintergrund & Wirkmechanismus
Klassische Prompts verwenden Makro-Konzepte („Automatisierung“, „Effizienz“). Diese sind jedoch zu abstrakt und lösen im Transformer nur die bekannten Standard-Assoziationen aus.  
Bei der semantischen Dekonstruktion wird das Wertversprechen in vier sensorische und operative Mikro-Dimensionen zerlegt:
1. **Physische Manifestation:** Was fasst der Meister an? (Klemmbrett, Durchschlag, Bleistift, Smartphone, Lieferschein).
2. **Körperliches / Emotionales Erleben:** Was fühlt er am Sonntag um 17:00 Uhr? (Nackenschmerzen, dumpfer Druck im Magen, Erleichterung beim Zuklappen des Ordners).
3. **Akustische Dimension:** Wie klingt das Problem, wie klingt die Lösung? (Knistern von Papier, Stille im Büro, sanftes Einrasten, Summen).
4. **Zeitliche Transformation:** Der Moment des Übergangs (Feierabendbier, pünktliche Abfahrt, freier Samstagvormittag).

### 6.2 Produktionsreifes Prompt-Template

```markdown
### SYSTEM-PROMPT:
Du bist ein Meister der linguistischen Phänomenologie und sensorischen Markenentwicklung. Du glaubst daran, dass starke Marken nicht aus abstrakten Konzepten entstehen, sondern aus konkreten Sinneseindrücken und greifbaren Momenten.

### PROJEKT:
Namensfindung für den Büro-Befreier des Handwerks (Inh. Robin Gornitzka, Harz). Keine IT-Agentur, sondern der Partner, der dafür sorgt, dass Belege lautlos fließen und der Bürosonntag stirbt.

### PHASE 1: MIKRO-DEKONSTRUKTION (TIEFENBOHRUNG)
Analysiere die folgenden 4 Mikro-Dimensionen des Handwerker-Alltags:
1. Haptik & Werkstoff: Was bedeutet „sauberer Sitz“, „Passung“, „Gratfreiheit“ übertragen auf Belege und Rechnungen?
2. Akustik des Feierabends: Das Geräusch, wenn die Werkstatttür ins Schloss fällt; das Aufatmen; die absolute Ruhe im Betrieb.
3. Der Moment der Übergabe: Wie fühlt es sich an, wenn der Steuerberater am Monatsende anruft und sagt: „Herr Meister, alles perfekt gebucht, keine Rückfragen“?
4. Das Verschwinden von Reibung: Was gleitet widerstandslos?

### PHASE 2: SYNTHESE ZU 10 NAMEN
Erschaffe aus diesen sensorischen Mikro-Momenten 10 Markennamen, die:
- Völlig ohne IT-Floskeln auskommen
- Ein konkretes, befreiendes Bild im Kopf des Meisters erzeugen
- Auf dem Briefkopf absolut respektabel und kaufmännisch solide wirken

### RESTRIKTIONEN:
Verbot von `Werk`, `Schmiede`, `Lotse`, `Bank` sowie aller IT-Anglizismen.

### AUSGABEFORMAT:
| Nr. | Markenname | Sensorische Quelle (Phase 1) | Bild im Kopf des Handwerkers | Wirkung auf dem Briefbogen |
|:---|:---|:---|:---|:---|
| 1 | **[Name]** | [Sensorik] | [Mentales Bild] | [Briefbogen-Test] |
```

### 6.3 Bewertung & Einsatzprofil
- **Vorteile:** Enorm plastische, berührende Namen mit hoher emotionaler Kundenbindung.
- **Nachteile:** Gefahr, zu stark auf der Problemseite (z. B. Schweiß, Staub) hängenzubleiben, statt die Lösung zu betonen.
- **Best-Fit:** Nutzenorientierte Marken, emotionale Befreiungs- und Entlastungsdienstleistungen.

---

## Methode 7: Rekursive Bewertungs-Prompts

### 7.1 Theoretischer Hintergrund & Wirkmechanismus
Ein einzelner Generierungsdurchlauf liefert selten Meisterwerke, weil das Modell im selben Rechenschritt explorieren und bewerten müsste. Nach dem Prinzip des *Generative Adversarial Collaborations* teilen wir den Naming-Prozess in drei getrennte Agenten-Rollen auf:
- **Pass 1 (Der kühne Generator):** Erzeugt 15–20 unkonventionelle Entwürfe mit maximaler Streuung.
- **Pass 2 (Der gnadenlose Handwerks-Critic):** Schreibt ein unbarmherziges Audit aus der Perspektive eines 56-jährigen Kreishandwerksmeisters („Zu weich“, „Zu englisch“, „Klingt nach Steuerfahndung“).
- **Pass 3 (Der evolutionäre Refiner):** Schärft und poliert die überlebenden Konzepte auf Basis der Rauswurf-Begründungen.

### 7.2 Produktionsreifes Prompt-Template

```markdown
### SYSTEM-PROMPT:
Du führst einen rekursiven 3-Pass Critic-Generator Loop aus. Du simulierst nacheinander drei getrennte Agenten-Rollen in einem einzigen kohärenten Denkprozess.

### DER KONTEXT:
Markenname für Büroautomatisierung im Handwerk & KMU (Harz / bundesweit). Einzelunternehmen Inh. Robin Gornitzka.

---
### PASS 1: AGENT „CREATIVE DIVERGENCE“
Generiere 15 unkonventionelle, mutige Namensvorschläge über 3 Stoßrichtungen:
- Richtung 1: Nüchterne Klarheit & Kaufmännische Ruhe
- Richtung 2: Mechanisch-analoge Flussbegriffe
- Richtung 3: Kurze, edle Neologismen
(Wende vorab den Ausschluss von `Werk`, `Schmiede`, `Lotse`, `Bank` und IT-Anglizismen an).

---
### PASS 2: AGENT „MEISTER HORST (ADVERSARIAL CRITIC)“
Du bist Meister Horst, 56 Jahre, Inhaber eines Heizungs- & Sanitärbetriebs in Langelsheim, Kreishandwerksmeister. Du hast keine Zeit für Marketing-Geschwätz.
Nimm jeden der 15 Namen aus Pass 1 schonungslos auseinander:
- Prüfe: Würdest du dich schämen, deinen Gesellen oder der Sparkasse zu sagen, dass du mit dieser Firma arbeitest?
- Prüfe: Klingt das nach einem 25-jährigen Beraterbubi oder nach einem handfesten Partner?
- Vergib ein gnadenloses Urteil: [ELIMINIERT] oder [POTENZIAL]. Begründe den Rauswurf prägnant.

---
### PASS 3: AGENT „PRECISION POLISHER & SYNTHESIS“
Nimm die überlebenden Kandidaten mit Potenzial sowie die Learnings aus Horsts Rauswürfen. Überarbeite, schärfe oder erschaffe 10 finale Spitzen-Namen, die Meister Horsts Respekt erzwingen UND modern skalierbar sind.

### AUSGABEFORMAT:
Gib ausschließlich die Dokumentation von Pass 2 (stichpunktartig die härtesten Rauswürfe) und die finale Tabelle aus Pass 3 aus:
| Nr. | Finaler Markenname | Horsts Urteil („Warum das taugt“) | Phonetische Klarheit am Telefon | Domain-Ansatz (.de) |
|:---|:---|:---|:---|:---|
| 1 | **[Name]** | [Meister-Bewertung] | [Telefon-Check] | `[name]-harz.de` |
```

### 7.3 Bewertung & Einsatzprofil
- **Vorteile:** Höchste Qualitätsfilterung; schützt zuverlässig vor internen Denkfehlern und Agentur-Betriebsblindheit.
- **Nachteile:** Hoher Kontext- und Tokenverbrauch; Critic kann bei falscher Prompt-Balance zu destruktiv agieren.
- **Best-Fit:** Finale Selektion, Härtetest vor Kundenpräsentationen und Domain-Käufen.

---

## Methode 8: Phonetische Resonanz-Filterung

### 8.1 Theoretischer Hintergrund & Wirkmechanismus
Ein Markenname im Handwerk scheitert nicht am Schreibtisch, sondern auf der Baustelle: Lärmpegel von 80–90 dB(A) durch Schlagbohrmaschinen, schlechter Handyempfang im Keller, Freisprechanlagen im Transporter.  
Linguistisch erfordert dies:
- **Hohe Konsonanten-Plosivität:** Plosive Laute (P, T, K, B, D, G) durchdringen tieffrequentes Dröhnen deutlich besser als Frikative (F, S, Sch) oder Nasale (M, N).
- **Metrischer Trochäus (`/ x`) oder Daktylus (`/ x x`):** Natürlicher Betonungsabfall der deutschen Sprache. Schafft sofortige Verständlichkeit ohne Nachfragen.
- **Kölner Phonetik (DIN 31634):** Eindeutige Ziffernkodierung verhindert orthografische Mehrdeutigkeiten am Telefon (z. B. C/K/Z-Verwechslungen).

### 8.2 Produktionsreifes Prompt-Template

```markdown
### SYSTEM-PROMPT:
Du bist ein leitender Akustik-Phonetiker und Experte für angewandte Sprachmetrik im B2B-Telefonvertrieb.

### PROBLEMSTELLUNG:
Handwerker telefonieren bei 85 dB Baustellenlärm oder im lauten Diesel-Transporter. Ein Markenname muss wie ein Pistolenschuss phonetisch klar durch den Lautsprecher dringen. Keine Nachfragen („Wie schreibt man das?“), kein Verwaschen bei schlechtem Netz.

### AKUSTISCHE & METRISCHE ANFORDERUNGEN:
1. METRISCHER FUSS:
   Ausschließlich Trochäus (Betont - Unbetont, z. B. `LÉIT-stand`, `KLÁR-bund`) oder Daktylus (`/ x x`). Strenges Verbot von Jamben (`x /`), da sie am Satzanfang akustisch verschluckt werden.
2. VOKAL-ARCHITEKTUR:
   Bevorzuge offene, helle oder sonore Stammvokale (A, O, AU, EI), die ein hohes Formant-Spektrum besitzen.
3. KONSONANTISCHE DURCHDRINGUNG:
   Mindestens ein harter Plosivlaut (K, T, P, D, B, G) am Wortanfang oder in der Silbengrenze zur akustischen Verankerung.
4. KÖLNER PHONETIK (DIN 31634):
   Orthografische Eindeutigkeit. Keine Verwechslungsgefahr zwischen C, K und Z. Keine stummen Buchstaben.

### AUFGABE:
Entwickle 10 phonetisch optimierte Markennamen für KMU Service Harz (Büroautomatisierung Handwerk).

### NEGATIV-FILTER:
Keine Schablonen (`Werk`, `Schmiede`, `Lotse`, `Bank`), keine IT-Anglizismen, keine Altnamen.

### AUSGABEFORMAT:
| Nr. | Markenname | Metrisches Schema | Akustische Schlüsselkonsonanten | Kölner Phonetik Code (DIN 31634) | Telefontest: „Guten Tag, Robin von [NAME]“ |
|:---|:---|:---|:---|:---|:---|
| 1 | **[Name]** | Trochäus (/ x) | Plosiv [K] + Dental [T] | [z. B. 4582] | [Verständlichkeits-Urteil] |
```

### 8.3 Bewertung & Einsatzprofil
- **Vorteile:** Perfekte Telefontauglichkeit; eliminiert Buchstabiermarathons; garantiert akustische Durchdringung bei Lärm.
- **Nachteile:** Gefahr, dass Namen rein klanglich optimiert werden, aber semantisch etwas blasser bleiben.
- **Best-Fit:** Vertriebsstarke B2B-Marken mit hohem Telefon- und Baustellenkontakt.

> ⚠️ **Didaktische Lektion: DIN 31634 Lookaheads vs. LLM-Ziffernhalluzinationen**  
> Die Kölner Phonetik nach DIN 31634 basiert auf einer deterministischen, zustandsbehafteten Grammatik mit kontextuellen Vor- und Rückschauen (Lookahead und Lookbehind auf Zeichenebene – z. B. Ziffer `4` für `C` vor `A, H, K, L, O, Q, R, U, X`, aber Ziffer `8` vor `S, Z` oder nach `S, Z`). Da autoregressive Sprachmodelle (LLMs) Tokens sequentiell nach statistischer Wahrscheinlichkeit emittieren und keine interne Turing-vollständige Zustandsmaschine für Phonetikregeln ausführen, neigen LLMs bei der Aufforderung, Kölner-Phonetik-Kodes im Prompt zu berechnen, zu massiven Halluzinationen. Sie erzeugen pseudo-plausible Ziffernfolgen, die von der echten DIN 31634 abweichen. **Strategische Konsequenz:** Der Prompt dient zur Erzeugung phonetisch vorteilhafter Wortstrukturen (Plosive, Trochäus). Die exakte Kölner-Phonetik-Ziffernkodierung sowie die Abstandsmetriken (Jaro-Winkler, Levenshtein) dürfen niemals vom LLM „geschätzt“, sondern müssen ausnahmslos über ein externes, deterministisches Python-Prüfskript (wie in Teil 4 / `run_collision_tests_r3.py`) berechnet werden.

---

## Methode 9: Semiotische Quadranten

### 9.1 Theoretischer Hintergrund & Wirkmechanismus
Das semiotische Quadrat nach Algirdas Julien Greimas modelliert die strukturellen Oppositionen und Widersprüche eines Bedeutungsfeldes.  
In der Büroautomatisierung für Handwerker existieren zwei orthogonale Grundachsen:
- **Achse 1 (Operative Substanz):** $S_1$ (Physisches Handwerk / Realwirtschaft) $\longleftrightarrow$ $\text{Nicht-}S_1$ (Abstrakte IT / Software-Silos)
- **Achse 2 (Kaufmännischer Zustand):** $S_2$ (Ruhe / Feierabend / Ordnung) $\longleftrightarrow$ $\text{Nicht-}S_2$ (Zettelchaos / Wochenendarbeit / Kontrollverlust)

Echte Markeninnovation entsteht in den *komplexen Vermittlungsräumen*: Ein Name, der physische Erdung ($S_1$) mit kaufmännischem Frieden ($S_2$) verbindet, ohne in die Kälte von $\text{Nicht-}S_1$ oder das Chaos von $\text{Nicht-}S_2$ abzugleiten.

### 9.2 Produktionsreifes Prompt-Template

```markdown
### SYSTEM-PROMPT:
Du bist ein semiotischer Markenanalyst und Experte für strukturalistische Bedeutungsarchitektur nach Algirdas J. Greimas.

### AUFGABE:
Konstruiere ein semiotisches Quadrat für das Rebranding von KMU Service Harz und leite daraus 10 perfekt ausbalancierte Markennamen ab.

### STRUKTUR DES GREIMAS-VIERECKS:
- Pol S1: Handwerkliche Realität (Werkzeug, Baustelle, Schweiß, Bodenständigkeit, Anpacken)
- Pol ~S1 (Nicht-S1): Abstrakte Digitalisierung (APIs, Server, Cloud, IT-Beratung, Systemhäuser)
- Pol S2: Kaufmännische Ruhe & Ordnung (Feierabend, DATEV-Konformität, E-Rechnung, Frieden)
- Pol ~S2 (Nicht-S2): Büro-Zwang & Friktion (Zettelwirtschaft, Bürosonntag, Mahnungen, Chaos)

### DIE ZIEL-ZONE (DER SCHUTZRAUM DER MARKE):
Entwickle Namen, die exakt auf der komplexen Achse zwischen **S1 (Handwerkliche Erdung)** und **S2 (Kaufmännische Ruhe)** liegen.
- Sie dürfen NIEMALS in ~S1 abdriften (keine IT-Kälte).
- Sie dürfen NIEMALS in ~S2 verharren (keine Problem-Fokussierung).

### METHODISCHE SCHRITTE:
1. Zeige 4 semantische Begriffsfelder für die 4 Ecken des Quadranten.
2. Identifiziere 10 Synthesen, die die Brücke zwischen S1 und S2 schlagen: Handfeste, bodenständige Nomen, die gleichzeitig kaufmännische Souveränität und Stille ausstrahlen.

### VERBOTE:
Keine Schablonen (`Werk`, `Schmiede`, `Lotse`, `Bank`), keine IT-Buzzwords (`Solutions`, `Tech`, etc.), keine Altnamen.

### AUSGABEFORMAT:
| Nr. | Markenname | Semiotische Positionierung (S1 + S2 Balance) | Abwehr gegen ~S1 (IT-Kälte) | Abwehr gegen ~S2 (Bürochaos) |
|:---|:---|:---|:---|:---|
| 1 | **[Name]** | [z. B. 50% Handfeste Erdung + 50% Kaufmännische Ruhe] | [Warum es nicht nach IT klingt] | [Welches Chaos es auflöst] |
```

### 9.3 Bewertung & Einsatzprofil
- **Vorteile:** Strukturelle Präzision; deckt Markt- und Bedeutungslücken systematisch auf; verhindert Verwässerung.
- **Nachteile:** Anspruchsvolle Methodik; erfordert exakte Begriffsdisziplin im Prompting.
- **Best-Fit:** Komplexe B2B-Märkte mit starker Diskrepanz zwischen analogen Anwendern und digitaler Technik.

---

## Methode 10: Hyper-spezifische Szenario-Simulation

### 10.1 Theoretischer Hintergrund & Wirkmechanismus
Klassische Naming-Workshops scheitern, weil Namen im isolierten Vakuum einer Folie betrachtet werden (*Kontext-Entkopplungs-Fehler*).  
Beim hyper-spezifischen Szenario-Prompting wird das LLM gezwungen, den Namen in 4 brutale Alltagssituationen einzusetzen und den Dialog realistisch zu simulieren:
1. **Szenario 1 (Der Baustellen-Anruf):** Robin ruft bei 80 dB Umgebungslärm an („Guten Tag, Robin von [NAME] hier“).
2. **Szenario 2 (Das Bank- & Kanzleiangebot):** Auf dem Briefkopf firmiert das Einzelunternehmen: `[NAME] – Inh. Robin Gornitzka`.
3. **Szenario 3 (Die Steuerberater-Empfehlung):** Die Kanzleiinhaberin empfiehlt den Partner zur DATEV-Schnittstellenanbindung.
4. **Szenario 4 (Das Gespräch an der Theke):** Zwei Meister tauschen sich beim Innungstreffen über Büro-Entlastung aus.

### 10.2 Produktionsreifes Prompt-Template

```markdown
### SYSTEM-PROMPT:
Du bist ein unbarmherziger B2B-Vertriebsleiter und Stresstest-Simulator für den deutschen Mittelstand.

### VERFAHREN:
Wir testen Namenskandidaten für ein Automatisierungs-Einzelunternehmen (Inh. Robin Gornitzka, Harz) in vier realistischen Stress-Szenarien.

### DIE 4 PRÜF-SZENARIEN:
1. SZENARIO 1 (BAUSTELLEN-TELEFONAT BEI 80 dB):
   Robin meldet sich: „Guten Tag, Robin von [NAME] hier.“
   Reaktion des Meisters: Versteht er es beim ersten Mal, oder fragt er: „Von wo? Wie heißt das?“?
2. SZENARIO 2 (OFFIZIELLES KANZLEI-ANGEBOT & RECHNUNG):
   Auf dem Briefkopf steht: `[NAME] – Inh. Robin Gornitzka`. Angebot über 3.500 € für eine automatisierte E-Rechnungs- & DATEV-Pipeline.
   Wirkt das wie ein etabliertes, hochseriöses Unternehmen oder wie ein unseriöses Studenten-Projekt?
3. SZENARIO 3 (EMPFEHLUNG DURCH DEN STEUERBERATER):
   Ein Steuerberater aus Goslar sagt zu seinem Mandanten: „Rufen Sie mal bei [NAME] an, die binden Ihnen Lexoffice sauber an.“ Klingt die Empfehlung seriös und professionell?
4. SZENARIO 4 (THEKENGESPRÄCH UNTER HANDWERKERN):
   Elektromeister fragt SHK-Meister: „Wer hat bei dir die Zettelwirtschaft beseitigt?“ – Antwort: „Die Jungs von [NAME].“ Klingt das bodenständig und partnerschaftlich?

### AUFGABE:
Entwickle 10 völlig neue, schablonenfreie Markennamen, die ALLE VIER Szenarien mit Bestnoten bestehen. Simuliere für jeden Namen kurz die Bewährungsprobe.

### VERBOTE:
Keine Schablonen (`Werk`, `Schmiede`, `Lotse`, `Bank`), keine IT-Anglizismen, keine Altnamen.

### AUSGABEFORMAT:
Präsentiere die 10 Namen mit ihrem Stresstest-Ergebnis:
| Nr. | Markenname | Szenario 1 (Telefon) | Szenario 2 (Rechnung/Bank) | Szenario 3 (Steuerberater) | Szenario 4 (Theke) |
|:---|:---|:---|:---|:---|:---|
| 1 | **[Name]** | [Test bestanden] | [Test bestanden] | [Test bestanden] | [Test bestanden] |
```

### 10.3 Bewertung & Einsatzprofil
- **Vorteile:** Maximaler Realitätsabgleich; entlarvt praxisfremde Elfenbeinturm-Entwürfe sofort.
- **Nachteile:** Modell neigt zu Schmeichelei (*Sycophancy*), wenn die Negativ-Reaktionen im Prompt nicht explizit gefordert werden.
- **Best-Fit:** Letzter Qualitätscheck vor der finalen Markenentscheidung und Eintragung.

---

# Teil 3: Vergleichende Bewertungsmatrix der 10 Techniken

Die folgende Matrix evaluiert alle 10 Methoden anhand von fünf objektiven Kriterien:
- **Kreativpotenzial (1–10):** Fähigkeit, das LLM aus statistischen Standard-Attraktoren herauszuzwingen.
- **Marken-Präzision (1–10):** Seriosität und Eignung für konservative B2B-Märkte (Handwerker, Steuerberater, Banken).
- **Implementierungs-Aufwand:** Token-Verbrauch, Turn-Anzahl und Komplexität der Orchestrierung.
- **Hauptrisiken & Fallstricke:** Typische Fehlerquellen bei ungenauer Führung des Modells.
- **Best-Fit Einsatzbereich:** Die ideale Phase im Entwicklungsprozess.

| Nr. | Methode / Framework | Kreativ-Potenzial | Marken-Präzision | Aufwand | Hauptrisiken & Typische Fallstricke | Best-Fit Einsatzbereich |
|:---:|:---|:---:|:---:|:---:|:---|:---|
| **1** | **Linguistische Morphem-Matrizen** | 8/10 | 9/10 | Mittel | Gefahr steriler, rein technischer Kunstwörter bei zu akademischen Wurzeln. | Neologismen, Kunstwörter, hohe Schutzfähigkeit. |
| **2** | **Archetypen-Rollenspiel** | 7/10 | 9/10 | Gering | Theatralische Übertreibung, wenn der „Jedermann“-Archetyp nicht dominiert. | Positionierungsstarke Dienstleister, wertebasierte B2B-Marken. |
| **3** | **Negativ-Constraint-Prompting** | 6/10 | **10/10** | Gering | Constraint-Blockade des LLMs bei zu langen, unstrukturierten Verboten. | Compliance-Filter, Bereinigung von IT-Buzzwords & Schablonen. |
| **4** | **Few-Shot mit Anti-Mustern** | 8/10 | 9/10 | Mittel | Modell kopiert Positivbeispiele zu wörtlich, statt das Prinzip zu adaptieren. | Qualitätskalibrierung, Beseitigung von Kofferwort-Monstern. |
| **5** | **Lateral-Thinking-Ketten** | **10/10** | 6/10 | Hoch | Zu skurrile, erklärungsbedürftige Bildmetaphern ohne direkten Bezug. | Frühe Ideen-Exploration, Erschließung neuer Bildwelten. |
| **6** | **Semantische Dekonstruktion** | 9/10 | 8/10 | Mittel | Verharren in sensorischen Problembildern (Schmutz, Lärm) statt Nutzenfokus. | Nutzen- & entlastungsorientierte Namen, Feierabend-Marken. |
| **7** | **Rekursive Refinement-Loops** | 9/10 | **10/10** | Sehr Hoch | Hoher Tokenverbrauch; Critic kann übermäßig destruktiv werden. | Finale Selektion, Härtetest vor Kundenpräsentationen. |
| **8** | **Phonetische Resonanz-Filter** | 6/10 | **10/10** | Mittel | Namen klingen druckvoll, büßen aber eventuell an semantischer Wärme ein. | Baustellen-Tauglichkeit, Telefonvertrieb, Akustik-Prüfung. |
| **9** | **Semiotische Quadranten** | 9/10 | 8/10 | Hoch | Modell verwechselt Negations- und Konträrachsen bei unklarer Struktur. | B2B-Spannungsfelder (Handwerkstradition vs. moderne APIs). |
| **10** | **Szenario-Simulation** | 8/10 | **10/10** | Hoch | Modell neigt zu geschönten Kundendialogen (*Sycophancy-Bias*). | Abschließender Praxis-Check, Rechnungs- & Banktauglichkeit. |

---

# Teil 4: Das 4-Stufen-Master-Workflow-Playbook (End-to-End Orchestrierung)

In der professionellen Markenentwicklung wird keine Methode isoliert angewendet. Erst durch die sequentielle Kaskadierung entsteht ein fehlerresistenter Produktionsprozess:

```
[STUFE 1: DIVERGENZ & EXPLORATION]
  * Methoden: 5 (Lateral Thinking) + 6 (Semantische Dekonstruktion) + 9 (Semiotische Quadranten)
  * Ziel: Erzeugung von 50+ unkonventionellen Roh-Metaphern abseits des IT-Mainstreams.
                                |
                                v
[STUFE 2: MORPHOLOGISCHE & ARCHETYPISCHE SYNTHESE]
  * Methoden: 1 (Morphem-Matrizen) + 2 (Archetypen) + 4 (Kontrastives Few-Shot)
  * Ziel: Verdichtung der Roh-Metaphern zu 20 prägnanten Wortschöpfungen und griffigen Begriffen.
                                |
                                v
[STUFE 3: PHONETISCH-JURISTISCHE FILTERUNG & NEGATIV-AUDIT]
  * Methoden: 3 (Negativ-Constraints) + 8 (Phonetische Filter) + Skript-Validierung (DIN 31634, DNS)
  * Ziel: Ausschluss aller Buzzwords, Schablonen, Kollisionen und belegten Domains.
                                |
                                v
[STUFE 4: ADVERSARIAL STRESSTEST & FINALE SELEKTION]
  * Methoden: 7 (Rekursiver Critic-Loop) + 10 (Szenario-Simulation)
  * Ziel: Feinschliff der Top-10-Siegerauswahl mit 100 %iger Praxistauglichkeit.
```

Mit diesem Workflow wurde die nachfolgende, finale Markennamensauswahl für Runde 3 (`DOCS/Markennamen_Strategie_Runde3_Final.md`) entwickelt, geprüft und verifiziert.

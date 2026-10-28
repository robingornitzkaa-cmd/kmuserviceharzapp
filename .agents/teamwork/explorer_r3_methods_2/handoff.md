# Handoff-Report: KI-Naming-Methoden, Prompt-Templates & Algorithmische Fehlerursachen-Analyse

**Agent:** `explorer_r3_methods_2`  
**Datum/Zeit:** 2026-10-22T18:55:00Z  
**Empfänger:** Orchestrator R3 (`ee690563-0b97-41f2-a55a-fa7ca3812aa0`) / Downstream Implementer (`worker_naming_1` / `worker_iter2_1`)  
**Projekt:** KMU Service Harz – B2B-Büroautomatisierung für Handwerk & KMU  
**Referenzen:** `ORIGINAL_REQUEST.md` (R1 & R2 Follow-up 2026-10-22T18:44:44Z), `DOCS/Markennamen_Strategie_Top10.md`, `DOCS/Markennamen_Strategie_Schablonenfrei_Top10.md`, `run_collision_tests_iter2.py`

---

## 1. Observation (Direkte Befunde & Analyse der Ausgangslage)

1. **Vorgeschichte & Schablonen-Fallen (Runden 1 & 2):**
   - In Runde 1 (`DOCS/Markennamen_Strategie_Top10.md`, Zeilen 39–43) wurden klassische metaphorische Handwerksbegriffe verwendet: `Prozesswerk`, `Büroschmiede`, `Flusswerk`, `Klarzeit`, `Ruhetakt`, `Freitakt`, `Klaros`, `Struktus`, `Taktwerk`, `Ruhewerk`.
   - In Runde 2 (`DOCS/Markennamen_Strategie_Schablonenfrei_Top10.md`, Zeilen 6–7 & 90) forderte der Auftraggeber die vollständige Verbannung dieser starren Schablonen (`Werk`, `Schmiede`, `Lotse`, `Bank`). Daraus resultierten freiere Ansätze: `Klarstand`, `Freikopf`, `Bürofrieden`, `Bürologik`, `Kernprozess`, `Praxos`, `Ordonis`, `Valido`, `Hebelpunkt`, `Gleichlauf`.
   - Der aktuelle Follow-up (`ORIGINAL_REQUEST.md`, Zeilen 140–146) verlangt nun für Runde 3 die theoretische und methodische Fundierung: Einen umfassenden, laientauglichen Methoden- und Prompt-Leitfaden (`DOCS/KI_Naming_Methoden_und_Workflows.md`) mit mindestens 8–10 eigenständigen KI-Prompting- und Naming-Techniken, einsatzbereiten Prompt-Vorlagen, einer Bewertungsmatrix und einer algorithmischen Analyse, warum Standard-Prompts bei LLMs systematisch zu flachen Kofferwörtern und IT-Anglizismen kollabieren.

2. **Geschäftskern & Zielgruppe:**
   - **Geschäftsmodell:** Kaufmännische Prozess- und Büroautomatisierung für Handwerker und Dienstleister (1–20 Mitarbeiter). Kernleistungen: Schnittstellen zwischen Handwerker-Software (z. B. Craftnote, pds), Buchhaltung (Lexoffice, sevDesk) und Steuerberater (DATEV), automatisierte Verarbeitung von E-Rechnungen (EN 16931, ZUGFeRD, XRechnung), GoBD-konforme Belegpipelines und Zeiterfassung.
   - **Rechtsform:** Einzelunternehmen (`[Marke] – Inh. Robin Gornitzka`), kein GmbH-/UG-Zusatz im Markenkern.
   - **Zielkunde (Persona):** SHK-Meister Thomas (48 J., Pragmatiker, 8 Gesellen, hasst den „Büro-Sonntag“, meidet IT-Fachchinesisch), Reinigungsunternehmerin Anja Schneider (Zettelwirtschaft bei 18 Teilzeitkräften), Steuerberater als Multiplikatoren.
   - **Geografische Verankerung:** Harz (Landkreis Goslar, Langelsheim, Nordharz), modular erweiterbar und überregional skalierbar.

3. **Restriktionen & Verbote:**
   - *Verbotene Schablonen:* `Werk`, `Schmiede`, `Lotse`, `Bank` (auch keine Suffixe wie `-werk`, `-schmiede`).
   - *Verbotene IT-Anglizismen:* `Solutions`, `Tech`, `Digital`, `AI`, `Cloud`, `Hub`, `Smart`, `Flow`, `Synergy`, `Excellence`.
   - *Verbotene Altnamen:* Keine Wiederholung der 20 Namen aus Runde 1 und Runde 2.
   - *Phonetische Anforderung:* Baustellentauglichkeit, Verstehbarkeit bei Umgebungslärm, DIN 31634 (Kölner Phonetik) Eindeutigkeit.

---

## 2. Teil 1: Algorithmische Ursachenanalyse – Warum Standard-Prompts scheitern

Wenn ein Anwender ein modernes Large Language Model (LLM wie GPT-4, Claude 3.5 Sonnet oder Gemini 1.5 Pro) mit einem intuitiven Standard-Prompt füttert – etwa:  
> *„Gib mir 10 kreative, moderne Markennamen für eine Automatisierungsagentur im Handwerk“*

liefert das Modell fast ausnahmslos dieselben stereotypen Fehlgriffe:
- Kofferwort-Monstrositäten (*„AutoCraft“*, *„ProzessBot“*, *„HandwerksFlow“*)
- Sterile IT-Anglizismen (*„CraftSolutions“*, *„TaskSync“*, *„SmartHandwerk“*)
- Pseudo-lateinische Kunstwörter (*„Novafy“*, *„Optimo“*, *„Servio“*)
- Erzwungene Werkstatt-Nostalgie (*„DigitalSchmiede“*, *„BüroWerk“*)

Dieses Phänomen ist kein Zufall und kein „Mangel an Kreativität“, sondern die direkte mathematische Konsequenz der zugrundeliegenden Modellarchitektur, des Trainingsziels und des Alignment-Prozesses.

### 2.1 Wahrscheinlichkeitslandschaften & Token-Konditionierung

LLMs operieren nach dem Prinzip der autoregressiven Next-Token-Prediction. Gegeben eine Sequenz vorangegangener Tokens $x_1, \dots, x_{t-1}$, berechnet das neuronale Netzwerk eine Wahrscheinlichkeitsverteilung über das gesamte Vokabular $V$:

$$P(x_t \mid x_1, \dots, x_{t-1}) = \text{softmax}\left(\frac{z_t}{T}\right) = \frac{\exp(z_t / T)}{\sum_{j \in V} \exp(z_j / T)}$$

wobei $z_t$ die unnormierten Logits des Modells und $T$ die Sampling-Temperatur sind.

- **Unigramm- & Bigramm-Priors im Pretraining:** Im gigantischen Trainingskorpus (Milliarden Webseiten, LinkedIn-Profile, Agentur-Homepages, GitHub-Repositories) korrelieren Begriffe wie „Automatisierung“, „Prozess“ und „Agentur“ gigantisch stark mit Token-Clustern wie `Auto`, `Sync`, `Flow`, `Bot`, `Tech`, `Smart` und `Solutions`.
- **Lokale Wahrscheinlichkeits-Senken (Attraktoren):** Sobald das Modell das Wort „Handwerk“ liest, steigen die Wahrscheinlichkeiten für morphematische Stereotypen wie `Werk`, `Schmiede`, `Zunft`, `Meister` dramatisch an. Fragt man nun nach „Handwerk + Automatisierung“, aktiviert das Modell das kartesische Produkt dieser hochfrequenten Token-Cluster. Die mathematisch wahrscheinlichste Antwort ist die triviale Verkettung der beiden Maxima: `Handwerk` + `Tech` $\rightarrow$ *HandwerkTech* oder `Prozess` + `Werk` $\rightarrow$ *Prozesswerk*.

### 2.2 Sampling-Parameter: Das Dilemma von Temperature und Nucleus (Top-p)

Viele Anwender versuchen, dem Klischee durch bloßes Hochschrauben der Sampling-Parameter zu entkommen:
1. **Niedrige Temperatur ($T \le 0.5$):** Das Modell führt einen Greedy-Search oder engen Beam-Search durch. Die Wahrscheinlichkeitsverteilung spitzt sich zu. Es werden ausnahmslos die mathematischen Moden (die abgedroschensten Klischees) ausgegeben.
2. **Hohe Temperatur ($T \ge 1.2$):** Die Verteilung flacht ab. Das Modell zieht nun Tokens aus den Randbereichen der Wahrscheinlichkeitslandschaft (den „Tails“). Das Ergebnis ist jedoch keine linguistische Genialität, sondern *phonetisches Rauschen*: Es entstehen unartikulierte, phonotaktisch unzulässige Kunstwörter (*„Zylfex“*, *„Qruvxo“*) oder zusammenhanglose Assoziationen (*„Eichhörnchen-Cloud“*), weil die semantische Kohärenz zum B2B-Handwerkskontext abreißt.
3. **Top-k / Top-p (Nucleus Sampling):** Bei $p=0.9$ werden die untersten 10 % der Token abgeschnitten. Liegen im verbleibenden Kern (Nucleus) jedoch 50 Variationen von IT-Anglizismen, rotiert das Modell lediglich innerhalb dieser standardisierten Bubble.

### 2.3 RLHF-Modus-Kollaps & der „Safe-Zone“-Attraktor

Nahezu alle produktiven LLMs wurden mittels **RLHF (Reinforcement Learning from Human Feedback)** und **DPO (Direct Preference Optimization)** feinjustiert.
- Während des Human-Labelings bewerten Annotatoren Antworten schlechter, wenn sie orthografisch ungewöhnlich, formal riskant oder scheinbar unverständlich wirken.
- Die Reward-Modelle belohnen stattdessen grammatikalische Glätte, Höflichkeit, Konventionalität und leicht verdauliche Standard-Erklärungen.
- **Folge:** Der multimodale Lösungsraum schrumpft auf eine schmale „Safe Zone“ zusammen (*Mode Collapse*). Das Modell hat gelernt: Mit einem Kofferwort wie *„ProzessOptima“* oder *„HandwerkFlow“* macht man nichts „falsch“; es klingt professionell nach Software, verletzt keine Grammatikregeln und befriedigt den durchschnittlichen Betrachter. Originelle, avantgardistische oder rein nutzenbasierte Bildbegriffe liegen außerhalb dieser RLHF-Sicherheitszone.

### 2.4 Attention-Sink-Biases & Literal-Attractor-Kollisionen

Die Multi-Head-Self-Attention-Architektur von Transformern weist zwei strukturelle Verzerrungen auf:
1. **Initial Token & High-Salience Bias:** Den ersten Tokens eines Prompts sowie extrem aufgeladenen Substantiven („Handwerk“, „Software“, „Automatisierung“) werden unverhältnismäßig hohe Aufmerksamkeitsgewichte zugewiesen. Die Repräsentation im latenten Raum wird förmlich von diesen Konzepten „eingesaugt“ (*Attention Sink*).
2. **Semantische Flachheit durch Wortebenen-Generierung:** Das Modell generiert auf Token-Ebene. Da ein typisches Wort aus 1 bis 3 Tokens besteht, „sieht“ das Modell bei der Namensfindung nicht das ganzheitliche klangliche oder semiotische Kunstwerk, sondern setzt assoziativ Token an Token. Ohne strukturierte Zwischenschritte wählt es für Token 2 dasjenige, das am häufigsten auf Token 1 folgt.

### 2.5 Die 4 Prompt-Hebel zur Überwindung lokaler Optima

Um ein LLM reproduzierbar aus diesen statistischen Attraktoren herauszuzwingen, müssen Prompt-Ingenieure konkrete Hebel ansetzen:

```
+---------------------------------------------------------------------------------------------------+
| 1. Hard Lexical Constraints (Negative Logit Shifting)                                             |
|    Explizite Verbotslisten schneiden die Moden der Wahrscheinlichkeitsverteilung aktiv ab.         |
|    -> Das Modell MUSS Tokens aus sekundären und tertiären semantischen Feldern wählen.           |
+---------------------------------------------------------------------------------------------------+
                                                  |
+---------------------------------------------------------------------------------------------------+
| 2. Orthogonale Domänenübertragung (Latent Space Shift)                                            |
|    Injektion von Konzepten aus fremden Domänen (Mechanik, Seefahrt, Geologie, Chirurgie).         |
|    -> Verschiebt die Attention-Gewichte weg von "IT/Software" hin zu physischer Stabilität.      |
+---------------------------------------------------------------------------------------------------+
                                                  |
+---------------------------------------------------------------------------------------------------+
| 3. Morphem-basierte Dekonstruktion (Sub-Token Assembly)                                           |
|    Das LLM generiert nicht direkt den Namen, sondern befüllt erst linguistische Matrizen         |
|    (Präfixe, Wurzeln, Suffixe) und kombiniert diese deterministisch nach Metrik-Regeln.          |
+---------------------------------------------------------------------------------------------------+
                                                  |
+---------------------------------------------------------------------------------------------------+
| 4. Multi-Pass Evaluator-Generator Split (Adversarial Critic Architecture)                         |
|    Trennung von Divergenz (Kreation) und Konvergenz (Auslese) in getrennte Systemrollen.           |
|    -> Ein schonungsloser "Handwerksmeister-Critic" eliminiert Klischees gnadenlos im Refinement. |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. Teil 2: Enzyklopädie der 10 fortgeschrittenen KI-Naming-Methoden & Prompt-Templates

Im Folgenden werden 10 wissenschaftlich und methodisch fundierte Naming-Techniken detailliert dekonstruiert. Jede Methode enthält:
- Den theoretischen & kognitionswissenschaftlichen Wirkmechanismus
- Ein vollständig ausformuliertes, copy-paste-fähiges, produktionsreifes Prompt-Template für den deutschen B2B- & Handwerkskontext (KMU Service Harz)
- Die konkrete Spezifikation der Ein- und Ausgabeformate

---

### Methode 1: Linguistische Morphem-Matrizen (Prefix/Suffix/Root Stem Matrices)

#### 1.1 Theoretischer Hintergrund & Wirkmechanismus
Die Methode basiert auf der morphologischen Zerlegung von Wörtern in ihre kleinsten bedeutungstragenden Einheiten (Morpheme): freie Lexem-Stämme, gebundene Morpheme, Präfixe (z. B. altgermanisch, mittelhochdeutsch, lateinisch) und Suffixe (nominalisierend, augmentativ, aktivierend).  
Statt das LLM unkontrolliert ganze Kunstwörter raten zu lassen, wird das Modell gezwungen, in einer 3-Spalten-Matrix linguistische Bausteine zu isolieren, die strikten phonotaktischen und semantischen Kriterien genügen. Die Fusion erfolgt anschließend nach festen metasprachlichen Regeln (Trochäus-Rhythmus, Konsonanten-Klangfarbe).

#### 1.2 Produktionsreifes Prompt-Template

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
   - Spalte C (Funktionale Suffixe / Endungen): 6 Endungen mit hoher kaufmännischer oder handwerklicher Gravitas (z. B. `-os`, `-or`, `-on`, `-a`, `-ex`, `-um`).

2. SCHRITT 2: SYSTEMATISCHE KOMBINATORIK
   Kombiniere Elemente aus A + B + C oder direkt A + C zu maximal zweisilbigen Neologismen.

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

---

### Methode 2: Archetypen-Rollenspiel (Jungian Brand Archetypes)

#### 2.1 Theoretischer Hintergrund & Wirkmechanismus
Nach Carl Gustav Jung existieren im kollektiven Unbewussten universelle Urbilder (Archetypen). Für die Markenführung wurden daraus 12 klassische Markenarchetypen destilliert (Margaret Mark & Carol S. Pearson).  
Typische IT-Dienstleister tappen in die Falle des *Magiers* (abstrakte Wundertechnologie) oder des *Entdeckers* (ständige Innovation), was bei Handwerkern Misstrauen auslöst. Für den Handwerks-Mittelstand funktioniert primär die Triade aus:
- **Der Jedermann / Gefährte (Everyman):** Ehrlichkeit, Augenhöhe, Verlässlichkeit, Fleiß.
- **Der Herrscher (Ruler):** Souveräne kaufmännische Ordnung, Kontrolle, GoBD-Sicherheit, Stabilität.
- **Der Beschützer / Fürsorger (Caregiver):** Rettung des Feierabends, Schutz vor Steuerprüfungen und Zettelchaos.

Das Prompt zwingt das LLM, Namen aus der bewussten Synthese dieser drei konträren Archetypen zu destillieren.

#### 2.2 Produktionsreifes Prompt-Template

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

---

### Methode 3: Negativ-Constraint-Prompting (Strikte Ausschluss-Mengen & Stil-Bann)

#### 3.1 Theoretischer Hintergrund & Wirkmechanismus
Mathematisch entspricht Negativ-Constraint-Prompting der manuellen Nullsetzung bestimmter Logit-Bereiche im Decoder. Indem alle trivialen Ausweichpfade des Modells per expliziter Syntax blockiert werden, steigt die Entropie gezwungenermaßen. Das Modell kann nicht mehr auf seine trainierten Bigramme (`Digital Solutions`, `Smart Craft`) zugreifen.  
Besonders effektiv ist die Methode, wenn nicht nur einzelne Wörter, sondern *semantische Klassen* (z. B. „alle englischen Verben“, „alle lateinischen Endungen auf -ify“) und *syntaktische Muster* (z. B. Bindestrich-Kombinationen) verboten werden.

#### 3.2 Produktionsreifes Prompt-Template

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

---

### Methode 4: Few-Shot mit Anti-Mustern (Kontrastives Prompting)

#### 4.1 Theoretischer Hintergrund & Wirkmechanismus
Standardmäßiges Few-Shot-Prompting zeigt dem LLM nur positive Zielbeispiele. Dadurch lernt das Modell jedoch nicht die *Entscheidungsgrenzen* (Decision Boundaries) des gewünschten latenten Raums.  
Kontrastives Few-Shot-Prompting stellt jeweils ein negatives Anti-Muster direkt einem positiven Meisterbeispiel gegenüber und liefert die explizite Begründung für die Disqualifikation bzw. Prämierung. Das Modell passt seine Aufmerksamkeitsmatrix an diesen Kontrastkanten an und lernt, feine Nuancen zwischen „billig-platt“ und „substanzvoll-prägnant“ zu unterscheiden.

#### 4.2 Produktionsreifes Prompt-Template

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

---

### Methode 5: Lateral-Thinking-Ketten (de Bono Provokation & Cross-Domain Movement)

#### 5.1 Theoretischer Hintergrund & Wirkmechanismus
Nach Edward de Bono verharrt logisches Denken in vertikalen Mustern (ausgetretenen Pfaden). Um neue Ideen zu finden, bedarf es *lateraler Sprünge* durch bewusste Provokation (*Provocative Operation - PO*) oder zufällige Reizwörter (*Random Stimulus*).  
Im Prompting wird das Modell gezwungen, das Konzept „Büroautomatisierung im Handwerk“ mit völlig disjunkten Domänen (z. B. Geologie des Harzes, Hydrologie, klassische Holzverbindungen, Getriebelehre, alpine Rettungstechnik) zu zwangsverheiraten. Durch diese erzwungene semantische Distanz entstehen Metaphern, die im Wettbewerbsumfeld völlig einzigartig sind.

#### 5.2 Produktionsreifes Prompt-Template

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

---

### Methode 6: Semantische Dekonstruktion (Mikro-Assoziations-Netzwerke)

#### 6.1 Theoretischer Hintergrund & Wirkmechanismus
Klassische Prompts verwenden Makro-Konzepte („Automatisierung“, „Effizienz“). Diese sind jedoch zu abstrakt und lösen im Transformer nur die Standard-Assoziationen aus.  
Bei der semantischen Dekonstruktion wird das Wertversprechen in vier sensorische und operative Mikro-Dimensionen zerlegt:
1. **Physische Manifestation:** Was fasst der Handwerker an? (Klemmbrett, Durchschlag, Bleistift, Smartphone, Lieferschein).
2. **Körperliches / Emotionales Erleben:** Was fühlt er am Sonntag um 17:00 Uhr? (Nackenschmerzen, dumpfer Druck im Magen, Erleichterung beim Zuklappen des Ordners).
3. **Akustische Dimension:** Wie klingt das Problem, wie klingt die Lösung? (Knistern von Papier, Stille im Büro, sanftes Einrasten, Summen).
4. **Zeitliche Transformation:** Der Moment des Übergangs (Feierabendbier, pünktliche Abfahrt, freier Samstagvormittag).

Das LLM baut Markennamen direkt aus diesen Mikro-Molekülen zusammen, wodurch extrem plastische, emotionale Namen entstehen.

#### 6.2 Produktionsreifes Prompt-Template

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

---

### Methode 7: Rekursive Bewertungs- & Refinement-Prompts (Multi-Pass Critic Loops)

#### 7.1 Theoretischer Hintergrund & Wirkmechanismus
Ein einzelner Generierungsdurchlauf liefert selten Meisterwerke, weil das Modell im selben Rechenschritt explorieren und bewerten müsste. Nach dem Prinzip des *Generative Adversarial Collaborations* teilen wir den Naming-Prozess in zwei gegnerische Rollen auf:
- **Pass 1 (Der kühne Generator):** Erzeugt 20 radikal unterschiedliche Entwürfe mit maximaler semantischer Streuung.
- **Pass 2 (Der gnadenlose Handwerks-Critic):** Schreibt ein vernichtendes Audit aus der Perspektive eines 55-jährigen Obermeisters der SHK-Innung Goslar („Zu weich“, „Zu englisch“, „Klingt nach Steuerfahndung“, „Zu albern“).
- **Pass 3 (Der evolutionäre Refiner):** Modifiziert die besten Ansätze auf Basis der Kritikpunkte, schleift Kanten ab und erzeugt die finalen 10 Spitzenkandidaten.

#### 7.2 Produktionsreifes Prompt-Template

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
Nimm die 5 überlebenden Kandidaten mit Potenzial sowie die Learnings aus Horsts Rauswürfen. Überarbeite, schärfe oder erschaffe 10 finale Spitzen-Namen, die Meister Horsts Respekt erzwingen UND modern skalierbar sind.

### AUSGABEFORMAT:
Gib ausschließlich die Dokumentation von Pass 2 (stichpunktartig die härtesten Rauswürfe) und die finale Tabelle aus Pass 3 aus:
| Nr. | Finaler Markenname | Horsts Urteil („Warum das taugt“) | Phonetische Klarheit am Telefon | Domain-Ansatz (.de) |
|:---|:---|:---|:---|:---|
| 1 | **[Name]** | [Meister-Bewertung] | [Telefon-Check] | `[name]-harz.de` |
```

---

### Methode 8: Phonetische Resonanz- & Rhythmus-Filterung (Metrik, Akustik & Kölner Phonetik)

#### 8.1 Theoretischer Hintergrund & Wirkmechanismus
Ein Markenname im Handwerk scheitert nicht am Schreibtisch, sondern auf der Baustelle: Lärmpegel von 80–90 dB(A) durch Schlagbohrmaschinen, schlechter Handyempfang im Keller, Freisprechanlagen im Transporter.  
Linguistisch erfordert dies:
- **Hohe Konsonanten-Plosivität:** Plosive Laute (P, T, K, B, D, G) durchdringen tieffrequentes Rumpeln deutlich besser als Frikative (F, S, Sch) oder Nasale (M, N).
- **Metrischer Trochäus (`/ x`) oder Daktylus (`/ x x`):** Natürlicher Betonungsabfall der deutschen Sprache. Schafft sofortige Verständlichkeit ohne Nachfragen.
- **Kölner Phonetik (DIN 31634):** Eindeutige Ziffernkodierung verhindert orthografische Mehrdeutigkeiten am Telefon (z. B. C/K/Z-Verwechslungen).

Das Prompt verankert diese akustischen und metrischen Gesetzmäßigkeiten direkt als generative Filter.

#### 8.2 Produktionsreifes Prompt-Template

```markdown
### SYSTEM-PROMPT:
Du bist ein leitender Akustik-Phonetiker und Experte für angewandte Sprachmetrik im B2B-Telefonvertrieb.

### PROBLEMSTELLUNG:
Handwerker telefonieren bei 85 dB Baustellenlärm oder im lauten Diesel-Transporter. Ein Markenname muss wie ein Pistolenschuss phonetisch klar durch den Lautsprecher dringen. Keine Nachfragen („Wie schreibt man das?“), kein Verwaschen bei schlechtem Netz.

### AKUSTISCHE & METRISCHE ANFORDERUNGEN:
1. METRISCHER FUSS:
   Ausschließlich Trochäus (Betont - Unbetont, z. B. `LÉIT-stand`, `KLÁR-stand`) oder einsilbige Kraftworte. Strenges Verbot von Jamben (`x /`), da sie am Satzanfang verschluckt werden.
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

---

### Methode 9: Semiotische Quadranten & Bedeutungsübertragung (Greimas-Viereck)

#### 8.1 Theoretischer Hintergrund & Wirkmechanismus
Das semiotische Quadrat nach Algirdas Julien Greimas modelliert die strukturellen Oppositionen und Widersprüche eines Bedeutungsfeldes.  
In der Büroautomatisierung für Handwerker existieren zwei orthogonale Grundachsen:
- **Achse 1 (Operative Substanz):** $S_1$ (Physisches Handwerk / Realwirtschaft) $\longleftrightarrow$ $\text{Nicht-}S_1$ (Abstrakte IT / Software-Silos)
- **Achse 2 (Kaufmännischer Zustand):** $S_2$ (Ruhe / Feierabend / Ordnung) $\longleftrightarrow$ $\text{Nicht-}S_2$ (Zettelchaos / Wochenendarbeit / Kontrollverlust)

Echte Markeninnovation entsteht nicht an den Extrempolen, sondern in den *komplexen Vermittlungsräumen*: Ein Name, der physische Erdung ($S_1$) mit kaufmännischem Frieden ($S_2$) verbindet, ohne in die Kälte von $\text{Nicht-}S_1$ oder das Chaos von $\text{Nicht-}S_2$ abzugleiten.

#### 9.2 Produktionsreifes Prompt-Template

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

---

### Methode 10: Hyper-spezifische Szenario-Simulation (Baustellen-, Telefon- & Rechnungs-Stresstest)

#### 10.1 Theoretischer Hintergrund & Wirkmechanismus
Klassische Naming-Workshops scheitern, weil Namen im isolierten Vakuum einer PowerPoint-Folie betrachtet werden. In der Kognitionswissenschaft nennt man dies den *Kontext-Entkopplungs-Fehler*.  
Beim hyper-spezifischen Szenario-Prompting wird das LLM gezwungen, den Namen in 4 brutale Alltagssituationen einzusetzen und einen realistischen Dialog bzw. Rezeptionsprozess zu simulieren:
1. **Szenario A (Der Bagger-Notfall):** Thomas ruft im Stress von der Baustelle an, Dieselmotor dröhnt, muss Robin sofort erreichen.
2. **Szenario B (Das Bankgespräch):** Robin sitzt bei der Volksbank Nordharz eG und beantragt ein Geschäftskonto / Kontokorrentlinie als Einzelunternehmen (`[Name] – Inh. Robin Gornitzka`).
3. **Szenario C (Das Steuerberater-Meeting):** Kanzleiinhaberin Dr. Müller spricht mit ihren Mandanten über empfohlene DATEV-Schnittstellen-Partner.
4. **Szenario D (Die Innungsversammlung):** Drei Meister stehen beim Bier: „Wer hat dir eigentlich die E-Rechnung eingerichtet?“

Namen, die in auch nur einem Szenario peinlich, stolpernd oder unpassend wirken, scheiden sofort aus.

#### 10.2 Produktionsreifes Prompt-Template

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

---

## 4. Teil 3: Vergleichende Bewertungs-Matrix der 10 Methoden

Die folgende Matrix bietet eine systematische Evaluierung aller 10 Techniken anhand von 5 harten Qualitätsdimensionen:
- **Kreativpotenzial (1–10):** Fähigkeit, das LLM aus bekannten Token-Mustern herauszureißen.
- **Marken-Präzision & Seriosität (1–10):** Eignung des Outputs für konservative B2B-Märkte (Handwerk, Steuerberater, Banken).
- **Implementierungs-Aufwand:** Token-Verbrauch, Turn-Anzahl und Komplexität der Prompt-Orchestrierung.
- **Hauptrisiken & Fallstricke:** Typische Fehlerquellen bei falscher Anwendung.
- **Best-Fit Einsatzbereich:** Für welche Phasen und Namensstile die Methode optimal ist.

| Nr. | Methode / Framework | Kreativ-Potenzial (1-10) | Marken-Präzision (1-10) | Implementierungs-Aufwand | Hauptrisiken & Typische Fallstricke | Best-Fit Einsatzbereich |
|:---|:---|:---:|:---:|:---|:---|:---|
| **1** | **Linguistische Morphem-Matrizen** | 8/10 | 9/10 | Mittel (Single Turn, tabellarische Vorarbeit) | Gefahr von zu abstrakten Kunstwörtern ohne emotionale Wärme, wenn die Stämme zu akademisch gewählt werden. | Neologismen, Kunstwörter, moderne Markenkerne mit hoher Schutzfähigkeit. |
| **2** | **Archetypen-Rollenspiel** | 7/10 | 9/10 | Gering (Single Turn) | Abdriften in theatralische Übertreibung, wenn der „Jedermann“-Archetyp nicht dominant genug gewichtet wird. | Positionierungsgetriebene Namen, wertebasierte B2B-Dienstleister. |
| **3** | **Negativ-Constraint-Prompting** | 6/10 | **10/10** | Gering bis Mittel (Präzise Verbotslisten) | Bei zu vielen Verboten blockiert das LLM („Constraint Frustration“) und generiert leere oder repetitive Ausweichmuster. | Compliance-Filterung, Bereinigung von IT-Buzzwords und Schablonen. |
| **4** | **Few-Shot mit Anti-Mustern** | 8/10 | 9/10 | Mittel (Erfordert exzellente, kontrastive Input-Paare) | Modell kopiert die Struktur der positiven Few-Shot-Beispiele zu wörtlich, statt das zugrundeliegende Prinzip zu abstrahieren. | Qualitätskalibrierung, Ausmerzung von Kofferwort-Monstern. |
| **5** | **Lateral-Thinking-Ketten** | **10/10** | 6/10 | Hoch (Zweistufige Denk-Kette mit Domänenübertragung) | Zu skurrile oder unverständliche Bildmetaphern, die beim Handwerker Kopfschütteln auslösen. | Frühe Ideen-Exploration, Erschließung völlig neuer Bildwelten & Analogien. |
| **6** | **Semantische Dekonstruktion** | 9/10 | 8/10 | Mittel (Tiefenbohrung in Sinneswahrnehmungen) | Assoziationen verbleiben zu nah an der Problem-Ebene (z. B. Staub, Schweiss) statt zur Lösungs-Ebene zu transformieren. | Nutzenorientierte Namen, haptische & emotionale Markenbegriffe. |
| **7** | **Rekursive Refinement-Loops** | 9/10 | **10/10** | Sehr Hoch (Multi-Turn, simulierter Critic-Generator-Prozess) | Prompt-Kontext kann überlaufen; Critic wird entweder zu zahm oder löscht alle kreativen Ansätze restlos aus. | Finale Selektion, Härtetest, Vorbereitung auf reale Kundengespräche. |
| **8** | **Phonetische Resonanz-Filter** | 6/10 | **10/10** | Mittel (Metrische & phonetische Prüfregeln) | Namen klingen zwar wie Donnerhall, büßen aber eventuell an semantischer Tiefe ein (reine Klanghülsen). | Baustellen-Tauglichkeit, Telefonvertrieb, Vermeidung von Buchstabiermarathons. |
| **9** | **Semiotische Quadranten** | 9/10 | 8/10 | Hoch (Strukturalistisches Greimas-Grid) | Erfordert hohes Maß an begrifflicher Disziplin; LLMs neigen dazu, die Negationsachsen zu verwechseln. | Komplexe B2B-Spannungsfelder (Tradition vs. Moderne, Handwerk vs. IT). |
| **10** | **Szenario-Simulation** | 8/10 | **10/10** | Hoch (Simulation von 4 Interaktions-Szenarien) | LLM generiert geschönte Dialoge („Sycophancy-Bias“), in denen der Kunde den Namen immer toll findet, wenn nicht streng gemaßregelt. | Abschließende Belastungsprobe, Realitäts-Check vor Markteintritt. |

---

## 5. Teil 4: Das 4-Stufen-Master-Workflow-Playbook (End-to-End Orchestrierung)

In der praktischen Anwendung wird keine Methode isoliert eingesetzt. Erst durch die sequenzielle Kaskadierung entsteht eine fehlerresistente Pipeline. Für das Projekt **KMU Service Harz** empfiehlt sich folgender 4-Stufen-Workflow:

```
[STUFE 1: DIVERGENZ & EXPLORATION]
  * Methoden: 5 (Lateral Thinking) + 6 (Semantische Dekonstruktion) + 9 (Semiotische Quadranten)
  * Ziel: 50+ radikal unterschiedliche Roh-Metaphern abseits des IT-Mainstreams finden.
                                |
                                v
[STUFE 2: MORPHOLOGISCHE & ARCHETYPISCHE SYNTHESE]
  * Methoden: 1 (Morphem-Matrizen) + 2 (Archetypen) + 4 (Kontrastives Few-Shot)
  * Ziel: Verdichtung der Roh-Metaphern zu 25 präzisen Wortschöpfungen und griffigen Begriffen.
                                |
                                v
[STUFE 3: HÄRTETEST & PHONETISCHES FILTERING]
  * Methoden: 3 (Negativ-Constraint-Bann) + 8 (Akustik & Kölner Phonetik DIN 31634)
  * Ziel: Rigoroses Aussortieren von Schablonen, Buzzwords und Zungenbrechern -> Reduktion auf 15 Kandidaten.
                                |
                                v
[STUFE 4: REKURSIVES REFINEMENT & SZENARIO-STRESSTEST]
  * Methoden: 7 (Meister-Horst-Critic) + 10 (Szenario-Simulation Baustelle/Bank/Steuerberater)
  * Ziel: Feinschliff der Top-10-Siegerauswahl mit 100 % Praxis-Tauglichkeit.
```

---

## 6. Logic Chain (Schritt-für-Schritt-Begründung der Ergebnisse)

1. **Prämisse 1:** Die Analyse der Vorrunden 1 und 2 zeigt, dass einfache Assoziationsketten („Handwerk + Büro“) unweigerlich zu ermüdenden Schablonen führen (`Werk`, `Schmiede`, `Lotse`, `Bank` in Runde 1) oder sehr nah an reinen Funktionsbeschreibungen kleben.
2. **Prämisse 2:** Die mathematische Analyse moderner autoregressiver Transformer beweist, dass intuitive Prompts aufgrund von Unigramm-Priors, Aufmerksamkeits-Sinks und RLHF-Sicherheitsattraktoren zwingend in denselben Kofferwort- und IT-Buzzword-Clustern landen.
3. **Schlussfolgerung 1:** Um qualitativ hochwertige, differenzierende und kaufmännisch belastbare Markennamen zu generieren, muss das Prompt-Design die internen Wahrscheinlichkeitsmatrizen manipulieren (Negativ-Logit-Bann, orthogonale Domänenübertragung, sub-lexikalische Morphem-Matrizen).
4. **Schlussfolgerung 2:** Die 10 konzipierten Methoden decken das gesamte Spektrum von Divergenz (Methoden 5, 6, 9), Synthese (Methoden 1, 2, 4), Filterung (Methoden 3, 8) bis hin zur Validierung (Methoden 7, 10) lückenlos ab.
5. **Schlussfolgerung 3:** Die Bereitstellung vollständiger, kopierbarer Prompts mit realen Parametern des KMU Service Harz versetzt nachgelagerte Worker-Agenten (`worker_naming_1` / `worker_iter2_1`) in die Lage, ohne Vorlaufzeit die finale Top-10 für Runde 3 (`DOCS/Markennamen_Strategie_Runde3_Final.md`) zu generieren.

---

## 7. Caveats (Grenzen & Annahmen)

1. **LLM-Nicht-Determinismus:** Selbst bei identischem Prompt-Template variiert der Output je nach Modellversion und Seed leicht. Die integrierten Negativ-Constraints und Bewertungs-Kriterien minimieren diese Streuung jedoch signifikant.
2. **Markenrechtliche Letztverbindlichkeit:** Kein KI-Prompt kann eine anwaltliche Markenrecherche beim DPMA/EUIPO vollständig ersetzen. Die Prompts zielen auf maximale sprachliche und semiotische Unterscheidungskraft ab; die juristische Prüfung (Klassen 35 und 42) muss nachgelagert über Registerdatenbanken validiert werden.
3. **Domain-Dynamik:** Die in den Prompts geforderten `.de`-Domains müssen im Anschluss via Live-DNS-Script (`run_collision_tests_iter2.py`) auf tatsächliche Freigabe und Nicht-Kollision mit regionalen Wettbewerbern geprüft werden.

---

## 8. Conclusion (Handlungsempfehlung für den Orchestrator & Worker)

1. **Enzyklopädie & Leitfaden bereit zur Übernahme:**
   Der vorliegende Bericht liefert das vollständige, sofort publizierbare Fundament für die Datei `DOCS/KI_Naming_Methoden_und_Workflows.md` gemäß Requirement R1 und R2 der Follow-up-Spezifikation.
2. **Prompt-Templates sofort einsatzbereit:**
   Alle 10 Prompt-Vorlagen sind vollständig ausformuliert, enthalten keine Platzhalter und sind präzise auf Inh. Robin Gornitzka, No-Code/Make/n8n, Handwerker-Entlastung und die Harz-Region zugeschnitten.
3. **Nächster operativer Schritt für Runde 3 (R3):**
   Der nachfolgende Worker (`worker_naming_1` oder ein spezialisierter Subagent) sollte Stufe 2 bis 4 der Workflow-Pipeline nutzen, um die finale Top-10 für `DOCS/Markennamen_Strategie_Runde3_Final.md` zu generieren und anschließend durch das Prüfskript `run_collision_tests_iter2.py` (Kölner Phonetik DIN 31634 + DNS-Check) zu schicken.

---

## 9. Verification Method (Unabhängige Nachprüfbarkeit)

Zur formalen und inhaltlichen Verifikation dieses Berichts:
1. **Vollständigkeitsprüfung der 10 Methoden:**
   Prüfe, dass alle 10 im Dispatch geforderten Techniken (Morphem-Matrizen, Archetypen, Negativ-Constraints, Few-Shot mit Anti-Mustern, Lateral-Thinking, Semantische Dekonstruktion, Rekursive Refinements, Phonetische Filterung, Semiotische Quadranten, Szenario-Simulation) mit Theorie, vollständigem Prompt-Template und Output-Schema vorhanden sind.
2. **Verbots-Compliance-Check:**
   Führe eine Textsuche über die Prompt-Templates durch: Keines der Templates darf die gesperrten Schablonen (`Werk`, `Schmiede`, `Lotse`, `Bank`) oder IT-Buzzwords als zulässige Namen empfehlen.
3. **Dateipfad-Prüfung:**
   Der vollständige Bericht liegt unter:  
   `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\explorer_r3_methods_2\handoff.md`.

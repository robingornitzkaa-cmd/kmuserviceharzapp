# Original User Request

## Initial Request — 2026-08-24T18:58:50Z

Erstellung einer umfassenden B2B-Vertriebs- und Auslieferungs-Suite für KMU Service Harz: (1) Steuerberater-Multiplikatoren-Kit & Handwerker-Direct-Mail-Kampagne, (2) Automatisierter 500 € „Büro-Stress-Test & ROI-Report“ PDF-Generator mit 4 Pflichtelementen, (3) Interaktives Mandanten-Portal & AaaS-Wartungs-Dashboard mit Ticket-System, und (4) E-Rechnungs- & ZUGFeRD/XRechnung Prüf-Studio.

Working directory: c:/Users/gorni/Desktop/kmuserviceharzapp
Integrity mode: development

## Requirements

### R1. Steuerberater-Multiplikatoren-Kit & Handwerker-Direct-Mail-Kampagne
- **Kanzlei-Pitch & Partner-Präsentation:** Vollständiges Kanzlei-Partnerdeck und Leitfaden für Steuerberater im Harz zur Etablierung als primärer Empfehlungskanal („Befreiung vom Pendelordner aus der Hölle“ und Bereitstellung fertiger DATEV-Sätze).
- **Mandanten-Flyer:** Ausdruckbare Informationsvorlage für Kanzleien zur Weitergabe an überlastete Handwerker-Mandanten.
- **Postalisches Anschreiben (Direct-Mail):** Haptischer, persönlicher 1-Seiter-Brief an die 518 regionalen Handwerksmeister im Harz mit psychologischem Hook („Schluss mit dem Büro-Sonntag“) und QR-Code zum Live-Stresstest.
- **Telefon- & Kaltakquise-Leitfaden:** Einwandbehandlung für Vorzimmer/Sekretariat und den Meister direkt auf der Baustelle.

### R2. Automatisierter 500 € „Büro-Stress-Test & ROI-Report“ PDF-Generator
- **Physisches Deliverable nach Businessplan:** Automatisierte Erstellung des 4-teiligen Prüfberichts (1. Prozess-Röntgenbild Status Quo, 2. Rote Schattenkosten-Berechnung in Euro, 3. Soll-Roadmap mit Make/Lexoffice/DATEV, 4. Fördermittel-Indikation).
- **App-Integration:** Direkte Generierung als druckfertiges, professionell gelayoutetes PDF mit Logo, Diagrammen und Amortisations-Kalkulation aus dem Onboarding- und Sales-Bereich.

### R3. Mandanten-Portal & AaaS-Wartungs-Dashboard
- **Kunden-Dashboard:** Dedizierte Mandantenansicht in der Web-App zur Einsicht aktiver Workflows (Make.com, Lexoffice, DATEV Status: Live/Grün).
- **Metriken:** Anzeige verarbeiteter Monatsbelege, geretteter Büro-Sonntage und kumulierter Zeiteinsparung.
- **1-Klick Support-Ticket-System:** Integrierte Störungsmeldung und Kontingent-Verwaltung für den Digitalen Hausmeister (200 € / Monat Retainer).

### R4. E-Rechnungs- & ZUGFeRD / XRechnung Prüf-Studio
- **Visueller Validator in der App:** Upload- und Prüfmöglichkeit für XML- und PDF-Rechnungsdateien (ZUGFeRD 2.x / XRechnung 3.x nach EN 16931).
- **Feldprüfung & Feedback:** Visuelle Ampel für Pflichtangaben (Leistungsdatum, USt-IdNr, Kreditor/Debitor, strukturierte Positionen, Leitweg-ID).

## Verification Resources

- Test-Suite: 
pm run test:all (61 bestehende Unit- und Integrationstests in Vitest).
- Build-Check: 
pm run build (Vite Client-Bundle & PWA-Precache).

## Acceptance Criteria

### Sales & Direct-Mail Suite
- [ ] Vollständige Vorlagen für Steuerberater-Pitch, Mandanten-Flyer, Handwerker-Mailing und Telefonleitfäden in DOCS/ und im DocsHub verfügbar.

### ROI- & Stresstest PDF Generator
- [ ] 4-teiliger Report lässt sich direkt aus dem Onboarding- oder Sales-Bereich mit Kundendaten und individueller Schattenkosten-Kalkulation als druckreifes PDF herunterladen.

### Mandanten-Portal & AaaS Ticket System
- [ ] Umschaltbare Kundenansicht mit Live-Statusanzeige aller Schnittstellen, Zeitzählern und funktionierendem Ticket-Formular.

### E-Rechnungs-Validator
- [ ] Funktionaler XML/PDF-Parser in der React-App, der Test-Rechnungsdaten auf EN 16931 Konformität prüft und ein klares visuelles Prüfprotokoll ausgibt.

### Qualität & Build
- [ ] Alle Unit- und Integrationstests laufen fehlerfrei durch (
pm run test:all).
- [ ] Der Produktions-Build (
pm run build) kompiliert ohne Fehler.


## Follow-up — 2026-10-12T11:44:20Z

Entwickle als Senior Naming-Stratege, Markenpsychologe und B2B-Positionierungsexperte für den deutschen Mittelstand in einem methodischen 4-stufigen Naming-Prozess eine maximal vielseitige Top-10-Auswahl an tragfähigen Firmennamen (inkl. optionalem „Harz“-Zusatz, Claim, Begründung und live geprüfter `.de`-Domain-Empfehlung) für eine spezialisierte No-Code-/Automatisierungsagentur im Harz (Einzelunternehmen ohne UG-Kürzel, Fokus: Landkreis Goslar / Langelsheim / Nordharz, skalierbar überregional) und speichere das Ergebnis in `DOCS/Markennamen_Strategie_Top10.md`.

Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp
Integrity mode: development

Reference material in workspace:
- `DOCS/Businessplan_KMU_Service_Harz_2026_Final.md`
- `DOCS/Buyer Persona KMU Dienstleister.md`
- `DOCS/Wettbewerbsanalyse KMU Service Harz.md`
- `DOCS/Wettbewerbs- und Marktanalyse  IT-Services, Webdesign und Prozessautomatisierung im Harz (Region Goslar).md`
- `DOCS/B2B Automatisierungs Agentur Preistreppe.md`
- `DOCS/B2B Vertriebsplan KMU Harz.md`

## Requirements

### R1. Schritt 1 (Kontext-Extraktion) & Schritt 2 (Semantische Exploration)
1. **Schritt 1 – Kontext-Extraktion (Kurz-Briefing):** Fasse auf Basis der hinterlegten Dokumente in `DOCS/` in maximal 3 prägnanten Sätzen zusammen:
   - Was ist das exakte Geschäftsmodell? (Fokus: No-Code/Make.com/n8n, DATEV-/Lexoffice-Schnittstellen, E-Rechnung/GoBD, Backoffice-Entlastung zum Festpreis)
   - Wer ist die spitzeste Zielperson? (z. B. SHK-/Elektro-Meister Thomas, Gebäudereinigung/Dienstleister Anja Schneider, 1–20 MA sowie Steuerberater als Multiplikatoren)
   - Was ist das Kernversprechen & die Tonalität? („Der pragmatische Prozess-Befreier“ / „Handwerker für digitale Infrastruktur“, Ende von Zettelwirtschaft und Bürosonntag, 0 % IT-Fachchinesisch)
2. **Schritt 2 – Semantische Exploration (Wortfelder):** Ermittle pro Kategorie mindestens 5–8 relevante Kernbegriffe, Wortstämme oder Metaphern:
   - **Feld A (Nutzen & Entlastung):** Feierabend, Befreiung, Zeitgewinn, Ordnung, Ruhe, Takt u. a.
   - **Feld B (Handwerk & Substanz):** Werk, Schmiede, Werkbank, Lotse, Macher, Griff, Ablauf u. a.
   - **Feld C (Moderne Abstraktion / Neologismen):** Griffig, kurz, modern, seriös, keine elitären Start-up-Floskeln.
   - **Feld D (Modulare Regional-Elemente):** Wie lässt sich ein lokaler Bezug („Harz“) harmonisch andocken, ohne den Hauptnamen dauerhaft geografisch einzuschränken?

### R2. Schritt 3 – Der Härtetest-Filter (Ausschlusskriterien)
Entwickle aus Schritt 2 Namenskombinationen und prüfe sie dokumentiert (kompakt in Stichpunkten, inkl. konkret verworfener Negativbeispiele) durch folgende 4 Filter:
1. **Der Meister-Test:** Wirkt der Name bodenständig, seriös und greifbar, oder klingt er nach abgehobener Großstadt-/Hipster-Agentur?
2. **Der Telefon-Test:** Kann man sich mit „Guten Tag, Robin von [NAME] hier“ melden, ohne dass der Kunde nachfragen oder buchstabieren muss?
3. **Der Seriositäts- & Rechnungs-Test:** Wirkt der Name auf offiziellen Rechnungen, Angeboten, beim Steuerberater und in Verträgen (ohne UG-Kürzel, als Einzelunternehmen „[Marke] – Inh. Robin Gornitzka“) etabliert, vertrauenswürdig und rechtssicher?
4. **Negativ-Filter:** Strenges Verbot von generischen IT-Buzzwords (`Solutions`, `Tech`, `Digital`, `AI`, `Synergy`, `Excellence`, `Cloud`).

### R3. Schritt 4 – Finale, maximal vielseitige Top-10-Ausgabe & Live-Domain-Prüfung
Gib genau 10 finale, stilistisch vielseitige Namen aus, gleichmäßig verteilt über die Kernrichtungen:
- **3x Handwerk/Pragmatismus**
- **3x Nutzen/Ergebnis**
- **2x Kunstwort/Abstraktion**
- **2x Hybride Modelle**

Präsentiere das Ergebnis in folgender Markdown-Tabelle:
`| Kernname (Stand-alone) | Optionale Regional-Variante (mit Harz) | Kategorie | Empfohlener Claim (max. 5 Wörter) | Markenpsychologische Begründung (Warum der Handwerker sofort Vertrauen fasst) | Domain-Empfehlung (.de) |`

Zusatzanforderung für Verifikation & Ablage:
- Prüfe für jede der 10 empfohlenen `.de`-Domains live per DNS-/Netzwerk-Abfrage (z. B. `Resolve-DnsName` / `nslookup` / HTTP-Check), dass die Domain aktuell frei (keine aktiven NS/A-Einträge einer bestehenden Website) ist, und stelle sicher, dass kein Name mit bestehenden Wettbewerbern aus `DOCS/Wettbewerbsanalyse*.md` kollidiert.
- Speichere das gesamte Ausgabedokument (Schritte 1–3 kompakt in Stichpunkten, direkt gefolgt von der vollständigen Tabelle aus Schritt 4) unter `c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS\Markennamen_Strategie_Top10.md` und gib es zusätzlich vollständig als finale Antwort zurück.

## Acceptance Criteria

### Struktur & Formatierung
- [ ] Die Datei `DOCS/Markennamen_Strategie_Top10.md` wurde erstellt, hält die Dokumentation der Schritte 1 bis 3 kompakt in Stichpunkten und schließt direkt mit der vollständigen Tabelle aus Schritt 4 ab.
- [ ] Schritt 1 umfasst maximal 3 prägnante Sätze, die exakt die 3 Leitfragen beantworten.
- [ ] Schritt 2 enthält in jedem der 4 Felder (A, B, C, D) mindestens 5–8 relevante Begriffe/Wortstämme.
- [ ] Schritt 3 dokumentiert kompakt in Stichpunkten die Prüfung durch alle 4 Härtetest-Filter.
- [ ] Schritt 4 enthält exakt 10 Einträge in der 6-spaltigen Markdown-Tabelle mit der exakten Kategorien-Verteilung: 3x Handwerk/Pragmatismus, 3x Nutzen/Ergebnis, 2x Kunstwort/Abstraktion, 2x Hybride Modelle.

### Objektive Qualitäts- & Verfügbarkeitsprüfung
- [ ] Ein automatisierter Check bestätigt, dass keiner der 10 Kernnamen, Regional-Varianten oder Claims eines der verbotenen Wörter (`Solutions`, `Tech`, `Digital`, `AI`, `Synergy`, `Excellence`, `Cloud`) enthält.
- [ ] Ein automatisierter Wortzähler-Check bestätigt, dass jeder der 10 empfohlenen Claims aus maximal 5 Wörtern besteht.
- [ ] Ein programmatischer DNS-Check (`Resolve-DnsName` / `nslookup`) bestätigt für alle 10 empfohlenen `.de`-Domains, dass sie aktuell nicht auf eine aktive fremde Website aufgelöst werden.
- [ ] Keiner der 10 Namen überschneidet sich mit den in den regionalen Wettbewerbsanalysen (`DOCS/Wettbewerbsanalyse*.md`) gelisteten Firmen im Harz.


## Follow-up — 2026-10-12T14:54:57Z

This is a single self-contained fix; keep it small and focused. Entwickle als Senior Naming-Stratege, Markenlinguist und B2B-Positionierungsexperte für den deutschen Mittelstand in einem unvoreingenommenen, vierstufigen Naming-Prozess 10 komplett neue, überregional skalierbare Markennamen (Einzelunternehmen ohne Rechtsform-Kürzel, optional modular mit „Harz“-Zusatz) für eine Dienstleistung zur Büro- und Verwaltungsautomatisierung im Handwerk und KMU-Sektor – komplett frei von starren Begriffs-Schablonen wie „Werk“, „Schmiede“, „Lotse“ oder „Bank“ – und speichere das Ergebnis in `DOCS/Markennamen_Strategie_Schablonenfrei_Top10.md`.

Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp
Integrity mode: development

Reference material in workspace:
- `DOCS/Businessplan_KMU_Service_Harz_2026_Final.md`
- `DOCS/Buyer Persona KMU Dienstleister.md`
- `DOCS/Wettbewerbsanalyse KMU Service Harz.md`
- `DOCS/Wettbewerbs- und Marktanalyse  IT-Services, Webdesign und Prozessautomatisierung im Harz (Region Goslar).md`
- `DOCS/B2B Automatisierungs Agentur Preistreppe.md`
- `DOCS/B2B Vertriebsplan KMU Harz.md`
- `DOCS/Markennamen_Strategie_Top10.md` (nur als Negativ-Abgleich, damit keiner der dortigen 10 Namen wiederholt wird)

## Requirements

### R1. Schritt 1 (Strategische Reflexion) & Schritt 2 (Freies, schablonenfreies Brainstorming)
1. **Schritt 1 – Strategische Reflexion & Wirkungsanalyse:** Beantworte vor dem Brainstorming analytisch und kompakt in prägnanten Stichpunkten:
   - Welche Assoziationen und welches Grundgefühl muss der Name bei einem pragmatischen Betriebsinhaber auslösen, um sofort als handfeste Hilfe statt als Marketing-Gimmick wahrgenommen zu werden?
   - Welche sprachlichen Fallen müssen vermieden werden (z. B. aufgesetzte Handwerks-Nostalgie, elitäre Start-up-Anglizismen, bürokratische Trägheit)?
2. **Schritt 2 – Freies, ungebundenes Brainstorming:** Entwickle ein breites Spektrum an eigenständigen, unverbrauchten Namensansätzen aus der Psychologie und dem Alltag der Zielgruppe (striktes Verbot erzwungener Metaphern wie `Werk`, `Schmiede`, `Lotse`, `Bank` sowie Ausschluss aller Namen aus Runde 1: `Prozesswerk`, `Büroschmiede`, `Flusswerk`, `Klarzeit`, `Ruhetakt`, `Freitakt`, `Klaros`, `Struktus`, `Taktwerk`, `Ruhewerk`) über vier Denk- und Klangrichtungen:
   - **Richtung A (Ergebnis- & Nutzen-Klarheit):** Was verändert sich im Betrieb konkret (Ruhe, freier Kopf, klare Abläufe)?
   - **Richtung B (Funktionale / Sachliche Namen):** Nüchtern, auf den Punkt, beschreibend ohne IT-Floskeln.
   - **Richtung C (Moderne Neologismen / Kunstwörter):** Prägnante, phonetisch sympathische und leicht merkbare Wortneuschöpfungen.
   - **Richtung D (Bildhafte / Assoziative Namen):** Begriffe aus dem Alltag, die Stabilität, Einfachheit oder Fluss vermitteln, ohne kitschig zu wirken.

### R2. Schritt 3 – Der Selektions- & Härtetest
Unterziehe die Entwürfe aus Schritt 2 einer strengen, kompakt dokumentierten Auslese (inkl. verworfener Negativbeispiele) anhand folgender vier Filter:
1. **Der Meister-Test:** Wirkt der Name bodenständig und seriös auf Augenhöhe, oder klingt er belehrend, verspielt oder nach Agentur-Kauderwelsch?
2. **Der Telefon-Test:** Kann man sich am Telefon mit „Guten Tag, Robin von [NAME]“ melden, ohne dass der Gesprächspartner nachfragen, stutzen oder buchstabieren muss?
3. **Der Rechnungs- & Vertrags-Test:** Wirkt die Bezeichnung auf offiziellen Dokumenten, Angeboten und Bankunterlagen (ohne UG-Kürzel) professionell und etabliert?
4. **Der Negativ-Filter:** Strenges Ausschlusskriterium für generische IT-Anglizismen (`Solutions`, `Tech`, `Digital`, `Cloud`, `AI`, `Hub`, `Smart`) sowie für die gesperrten Wort-Schablonen (`Werk`, `Schmiede`, `Lotse`, `Bank`).

### R3. Schritt 4 – Finale Top-10-Entscheidung & Speicherung
- Wähle die 10 stärksten, komplett neuen Namen aus, die den Filterprozess überstanden haben – ausgewogen verteilt über alle vier Richtungen (je 2–3 Namen aus Richtung A, B, C und D).
- Gib das Ergebnis als Markdown-Tabelle mit exakt folgenden Spalten aus:
  `| Kernname (Skalierbar) | Modulare Variante (mit Harz) | Stilrichtung | Claim / Untertitel (max. 5 Wörter) | Psychologische Wirkung beim Kunden | Domain-Ansatz (.de) |`
- *(Hinweis: Keine technische Live-DNS-Prüfung durchführen; der Fokus liegt vollständig auf sprachlicher, psychologischer und strategischer Qualität. Schlage in der letzten Spalte einfach den jeweils sinnvollsten `.de`-Domain-Ansatz vor.)*
- Speichere das vollständige Dokument (Schritte 1–3 kompakt und analytisch, gefolgt von der vollständigen Tabelle aus Schritt 4) in `DOCS/Markennamen_Strategie_Schablonenfrei_Top10.md` (ohne `DOCS/Markennamen_Strategie_Top10.md` zu verändern) und gib den gesamten Inhalt auch direkt als Antwort aus.

## Acceptance Criteria

### Struktur & Verteilung
- [ ] Die Datei `DOCS/Markennamen_Strategie_Schablonenfrei_Top10.md` wurde neu erstellt (während `DOCS/Markennamen_Strategie_Top10.md` unverändert erhalten bleibt).
- [ ] Die Schritte 1 bis 3 sind analytisch und kompakt ausgearbeitet; Schritt 4 schließt mit der vollständigen 6-spaltigen Markdown-Tabelle und exakt 10 Namen ab.
- [ ] Jede der 4 Stilrichtungen (Richtung A, Richtung B, Richtung C, Richtung D) ist mit jeweils 2 bis 3 Namen in der Top-10-Tabelle vertreten.

### Sprachliche Reinheit & Regeln
- [ ] Keiner der 10 Namen enthält die gesperrten Wort-Schablonen (`Werk`, `Schmiede`, `Lotse`, `Bank` – auch nicht als Wortbestandteil wie `-werk` oder `-schmiede`).
- [ ] Keiner der 10 Namen oder Claims enthält verbotene IT-Anglizismen (`Solutions`, `Tech`, `Digital`, `Cloud`, `AI`, `Hub`, `Smart`).
- [ ] Keiner der 10 Namen wiederholt einen Kandidaten aus der ersten Liste (`Prozesswerk`, `Büroschmiede`, `Flusswerk`, `Klarzeit`, `Ruhetakt`, `Freitakt`, `Klaros`, `Struktus`, `Taktwerk`, `Ruhewerk`).
- [ ] Jeder der 10 Claims / Untertitel besteht aus maximal 5 Wörtern.


## Follow-up — 2026-10-22T18:44:44Z

Recherchiere, systematisiere und bewerte fortschrittliche Prompt-Techniken, Workflows und linguistische Frameworks zur KI-gestützten Markennamensfindung und wende die stärksten Methoden an, um eine 360°-geprüfte Top-10-Namensauswahl für eine regionale B2B-Automatisierungsagentur (Handwerk & KMU im Harz / überregional) zu entwickeln.

Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp
Integrity mode: development

Referenzmaterial im Workspace:
- `DOCS/Markennamen_Strategie_Top10.md` (Runde 1)
- `DOCS/Markennamen_Strategie_Schablonenfrei_Top10.md` (Runde 2)
- `DOCS/Businessplan_KMU_Service_Harz_2026_Final.md`
- `DOCS/Wettbewerbsanalyse KMU Service Harz.md`
- `run_collision_tests_iter2.py` (DIN 31634 Kölner Phonetik & DNS-Checks)

## Requirements

### R1. Fundierter KI-Naming-Methoden- & Prompt-Leitfaden
Erstelle in `DOCS/KI_Naming_Methoden_und_Workflows.md` eine umfassende, laientaugliche Enzyklopädie mit mindestens 8 bis 10 eigenständigen KI-Prompting- und Naming-Techniken (z. B. Linguistische Morphem-Matrizen, Archetypen-Rollenspiel, Negativ-Constraint-Prompting, Few-Shot mit Anti-Mustern, Lateral-Thinking-Ketten, Semantische Dekonstruktion, Rekursive Bewertungs-Prompts). Jede Methode muss ein sofort einsatzbereites Prompt-Template enthalten.

### R2. Systematische Stärken-/Schwächen-Bewertung & Fehlerursachen-Analyse
Ergänze den Methoden-Leitfaden um eine vergleichende Bewertungsmatrix aller Techniken (Kreativpotenzial, Risiken, Eignung je nach Branche). Analysiere im Detail, warum intuitive Standard-Prompts („Gib mir 10 kreative Namen“) bei KI typischerweise zu Schablonen, albernen Kofferwörtern oder sterilen IT-Anglizismen führen und mit welchen konkreten Prompt-Hebeln man dieses Verhalten bricht.

### R3. Generierung einer neuen Top-10 für KMU Service Harz
Wende die stärksten erarbeiteten Prompt-Workflows auf das konkrete Geschäft an (B2B-Büroautomatisierung für Handwerker & Dienstleister, Einzelunternehmen Inh. Robin Gornitzka, Fokus Landkreis Goslar / Harz, überregional skalierbar). Entwickle in `DOCS/Markennamen_Strategie_Runde3_Final.md` eine komplett neue, schablonenfreie Top-10-Auswahl an Markennamen, aufgeteilt nach strategischen Stoßrichtungen (z. B. Nutzen-Klarheit, bildhafte Analogie, eigenständiger Neologismus, bodenständige Pragmatik).

### R4. Empirische 360°-Validierungs-Pipeline
Prüfe jeden der 10 Namenskandidaten objektiv anhand von 4 obligatorischen Teststufen:
1. Psychologische Resonanz: Wirkt der Name auf Handwerksmeister (SHK, Elektro, Bau) seriös und partnerschaftlich oder elitär/belehrend?
2. Baustellen- & Telefontauglichkeit: Phonetische Klarheit bei Umgebungslärm und unmissverständliche Buchstabierbarkeit (gestützt durch Kölner Phonetik DIN 31634 via Python-Prüfskript).
3. Domain-Vorprüfung: Verfügbarkeits- und Konfliktprüfung für primäre `.de`-Domains via DNS-Prüfung.
4. Markenrechtliche Erstprüfung: Kollisions- und Ähnlichkeitsprüfung in den Nizza-Klassen 35 (Büroarbeiten/Unternehmensberatung) und 42 (IT-Dienstleistungen) gegenüber bekannten Marken.

## Verification Resources
- Phonetisches und DNS-Prüfskript: `run_collision_tests_iter2.py`
- Markdown-Integritätsprüfung der neu erstellten Dokumente im Verzeichnis `DOCS/`

## Acceptance Criteria

### Methoden-Leitfaden & Prompts
- [ ] Die Datei `DOCS/KI_Naming_Methoden_und_Workflows.md` existiert und dokumentiert mindestens 8 klar unterscheidbare KI-Naming-Techniken inklusive vollständiger, kopierbarer Prompt-Vorlagen.
- [ ] Jede Technik enthält eine objektive Bewertung (Vorteile, Nachteile, Best-for-Szenario).
- [ ] Der Leitfaden erklärt verständlich die algorithmischen Ursachen von typischen KI-Namens-Klischees und zeigt konkrete Gegenmaßnahmen auf.

### Konkrete Namensstrategie Runde 3
- [ ] Die Datei `DOCS/Markennamen_Strategie_Runde3_Final.md` existiert und präsentiert genau 10 neue, ausformulierte Markennamen mit Claim, strategischer Begründung und Passung zum Geschäftsmodell.
- [ ] Keiner der 10 Namen wiederholt die zuvor verworfenen Schablonen (`Werk`, `Schmiede`, `Lotse`, `Bank`) oder Namen aus den Vorrunden 1 und 2.

### 360°-Validierung & Prüfung
- [ ] Jeder der 10 Namen verfügt über einen dokumentierten 4-Stufen-Prüfbericht (Psychologie, Phonetischer Code / DIN 31634, Domain-DNS-Status, DPMA-Klassen-Check).
- [ ] Ein Verifikations-Skript wurde ausgeführt und die Ergebnisse sind in der Dokumentation nachvollziehbar belegt.

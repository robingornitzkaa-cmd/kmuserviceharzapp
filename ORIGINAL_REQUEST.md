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

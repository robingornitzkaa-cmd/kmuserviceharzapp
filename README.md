# Life & Founder OS - Personal Goal, Habit & Business Control Center

Dieses Projekt ist eine maßgeschneiderte, hochgradig ästhetische Web- und Mobilanwendung (**Life & Founder OS**) für Robin. Sie dient als zentrales Betriebssystem zur Steuerung von Tageszielen, persönliche Gewohnheiten (Kraftsport, Make Academy, Lesen, Wasser), Gamifizierung mit Belohnungs-Shop & Disziplin-System sowie CRM, Projekten, Dokumenten, KI-Prompts und Automatisierungsworkflows.

Die Anwendung zeichnet sich durch ein futuristisches "Glassmorphic Dark Theme" aus, ist 100 % offline-fähig (localStorage-geschützt) und optimiert für Desktop- und Smartphone-Bedienung. Zudem ist sie als native Android-App mittels Capacitor verpackbar und bietet ein echtes Android-Homescreen-Widget.

---

## 🚀 Wichtigste Funktionen & Tab-Struktur

### 0. 🧼 GoClean Harz VIP-Wachstums- & Produktivitäts-Suite -- *NEU!*
- **🚀 Dashboard Pilotprojekt & Onboarding-Zentrale (`src/components/DashboardView.jsx`):**
  - Prominenter VIP-Banner direkt auf dem Haupt-Dashboard des Founder OS.
  - 1-Klick Direktzugriff auf den **🤖 Onboarding-Chatbot** (startet Tab 6 im Toolkit).
  - Direktlink zur **⭐ Mobilen Pilot-Web-App** (`public/goclean_pilot_preview.html`).
  - **📋 1-Klick WhatsApp Link-Kopierer** zum sekundenschnellen Versenden an Marcel mit Kopier-Feedback.
  - Schnellzugriff auf Kalkulator, SOPs und 9 Pitch-Decks.
- **🤖 Interaktiver Onboarding-Chatbot (Tab 6 im Toolkit & OnboardingView):**
  - Vollwertiges 6-Fragen Express-Audit aus dem KMU-Playbook mit dynamischer Punkteberechnung (0–100 Digitalisierungs-Score), Handlungs-Empfehlungen und WhatsApp-Zusammenfassung.
  - Nahtlos sowohl im **Dashboard**, im **GoCleanToolkit (Tab 6)** als auch als Schnellstart im **Kunden-Onboarding (`OnboardingView.jsx`)** verankert.
- **🤖 Manus AI Deep-Research Master-Suite (`DOCS/MANUS_GOCLEAN_DEEP_RESEARCH_PROMPTS.md`):** 10 hochkarätige Deep-Research-Prompts im XML-Tag-Format für Manus AI zur maximalen Markterschließung (Marktatlas Harz, 50+ B2B-Liegenschafts-Leads für Reinigung+Garten, kommunale Vergaben, 12-Monats-Kalkulation, Local SEO #1, Recruiting-Funnel, Fewo/Hotel-Tourismus, Social-Media Viral-Plan, Industriehallen & Handwerks-Digital-Audit).
- **⚡ In-App Blitz-Kalkulator (`src/components/GoCleanToolkit.jsx`):** Live-Berechnung von Quadratmetern, Stundenansatz, Materialzuschlag und Netto/Brutto-Monatspauschalen für Büro/Unterhalt, Treppenhaus, Glasreinigung, Bau-Endreinigung und Winterdienst. Inklusive 1-Klick B2B-Angebotstext-Generator.
- **🏢 B2B-Akquise-Maschine:** Vorgefertigte Akquise-Mappen für Hausverwaltungen/WEGs (feste Monatsverträge), Bauträger (lukrative Bau-Endreinigungen) und Arztpraxen/Kanzleien (4-Farben-Hygienesystem).
- **📱 Mobile Qualitäts-SOP & Digitales Abnahmeprotokoll:** Smartphone-Checkliste für Reinigungskräfte (Vorher/Nachher-Foto-Nachweis) und rechtssicheres Kunden-Abnahmeprotokoll mit digitaler Signatur.
- **⭐ 5-Sterne Bewertungs-Booster & Reaktivierung:** 1-Klick WhatsApp-Vorlage für Google-Bewertungen direkt nach Auftragsabschluss sowie saisonale Frühjahrs-/Herbst-Kampagnen.
- **⭐ Interaktive Pilotprojekt-Vorschau-App (`public/goclean_pilot_preview.html`):** Eigenständige mobile Web-App für Marcel (Bruder) mit persönlicher Botschaft („Über die Schulter schauen“), 4 klickbaren Prototypen (WhatsApp-Assistent, Kundenportal mit Vorher/Nachher-Fotos, 1-Klick-Rechnung mit Druckvorschau, Harz-Tagesplaner), Ideen-Schmiede für KMUs und 1-Klick-WhatsApp-Feedback.
- **🖨️ Druckfertige VIP-Präsentationsmappe & Hub:** Standalone HTML-Mappe (`public/goclean_wachstumsmappe.html`), Präsentations-Center (`public/goclean_praesentationen_hub.html`) und Manus Cockpit (`manus_power_cockpit.html`).

### 0b. 💼 B2B-Vertriebs- & Auslieferungs-Suite (KMU Service Harz)
- **🔥 Coaching-Integration (Dennis Kauss): Himmel-Hölle-Prinzip, 5 FAB-Statements & 3 Website-Versionen -- *NEU!***
  - **🌐 3-Versionen Website-Umschalter (`src/components/WebsiteView.jsx`, `src/constants/websiteContent.js`):**
    - **🛡️ Version 1 (Original – 100 % unverändert bewahrt):** Deine bisherige Website bleibt unangetastet erhalten.
    - **⚡ Version 2 (Beleg-Fokus + Himmel/Hölle & 5 FAB-Statements):** Scharfer Beleg-/DATEV-Fokus im Einstieg, ergänzt um den interaktiven **Himmel-Hölle-Vergleich** (mit Umschalter zwischen *🎯 Handwerker-Klartext* und *📋 Original Coaching-Kausalketten*), die **5 FAB-Statements** (*Blau: Besonderes Produkt-Merkmal ➔ Lila: Vorteil Produkt ➔ Grün: Vorteil Kunde*) und optionale Ausbau-Module (Kundenkommunikation & Verwaltung).
    - **🏛️ Version 3 (3-Säulen Coaching-Edition):** Ganzheitliche Ausrichtung auf alle 3 Coaching-Säulen (*Säule 1: Proaktive Kundenkommunikation & Auftragssicherung*, *Säule 2: Revisionssichere Verwaltung & Ordnung*, *Säule 3: Lautlose Beleg- & DATEV-Konvertierung für schnelle Jahresabschlüsse*) inklusive Himmel-Hölle-Matrix und 5 FAB-Karten.
    - **📦 Multi-Versionen HTML-Export:** Beim Exportieren der Standalone-Website kann exakt gewählt werden, ob V1, V2 oder V3 exportiert wird.
  - **🎓 Coaching Live-Portal Erweiterung (`src/components/CoachingLivePortal.jsx`):**
    - Neuer Strategie-Reiter **`🔥 Himmel/Hölle & FAB-Strategie (Kauss)`** mit beiden hochgeladenen Original-Whiteboard-Tafelbildern (`/coaching/himmel_hoelle_coaching_kauss.png` & `/coaching/fab_statements_coaching_kauss.png`), kritischer Positionierungs-Bewertung, den 4 Kausalketten und der 5er FAB-Matrix.
  - **📞 Vertriebs-, Brief- & Interview-Integration:**
    - `DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md`: Teil 5 mit Himmel-Hölle-Telefonfragen und FAB-Einwand-Kontern ergänzt.
    - `DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md`: Die 4 stärksten FAB-Versprechen (*Bestehende Systeme bleiben erhalten*, *Kein Fachchinesisch*, *100 % GoBD/DSGVO*, *Schneller Jahresabschluss*) integriert.
    - `src/components/CustomerDiscoveryView.jsx`: Kompaktes FAB- & Himmel-Hölle-Spickzettel-Modul direkt in Phase 4 des Interview-Cockpits eingebaut.
- **🤝 Steuerberater-Multiplikatoren-Kit & Direct-Mail (R1):**
  - Kanzlei-Pitch-Deck & Leitfaden (`DOCS/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md`) mit DATEV RDS 1.0 vs BDS Gegenüberstellung, GoBD-Verfahrensdokumentation und 0-Euro-Partnermodell.
  - Ausdruckbare Mandanten-Flyer-Vorlage (`DOCS/Mandanten_Flyer_Vorlage_Handwerk.md`) mit 500 € Kanzlei-Gutschein (`KANZLEI-HARZ-500`).
  - Haptisches Direct-Mail-Anschreiben (`DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md`) an die 518 regionalen Handwerksmeister im Harz („Schluss mit dem Büro-Sonntag“ & QR-Code).
  - Telefon- & Kaltakquise-Leitfaden (`DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md`) mit Vorzimmer- und Baustellen-Skripten sowie 5-Punkte Validation-Pivot Einwandbehandlung.
  - Alle Vorlagen sind direkt im **DocsHub** mit Tag-Filterchips und 1-Klick Quick-Copy verfügbar.
- **📊 500 € Büro-Stress-Test & ROI-Report PDF-Generator (R2):**
  - Automatisierte Erstellung des 4-teiligen Prüfberichts (1. Prozess-Röntgenbild Status Quo, 2. Rote Schattenkosten-Berechnung in Euro, 3. Soll-Roadmap Make/Lexoffice/DATEV, 4. Fördermittel-Indikation & Amortisations-Kalkulation).
  - Reines Client-seitiges Vektor-PDF (`src/services/pdfReportGenerator.js` via jsPDF) mit 100% 500€ Audit-Anrechnung auf Stufe 2 und Amortisation in < 2,5 Monaten.
  - 1-Klick-Download direkt im Onboarding-Bereich (`OnboardingView.jsx`) und Showcase-ROI-Rechner (`SopManager.jsx`).
- **🏢 Mandanten-Portal & AaaS-Wartungs-Dashboard (R3):**
  - Dedizierte Mandanten-Ansicht (`ClientPortalView.jsx`) mit Live-Interface-Status (Make.com, Lexoffice, DATEV Belegbilderservice, GoBD Cloud-Archiv, OCR).
  - 1-Klick Diagnose-Simulation nach Make.com Blueprint 4 mit Latenz- & Log-Anzeige.
  - Produktivitäts-Zähler für Monatsbelege, gerettete Sonntage und kumulierte Zeit-/Geldersparnis.
  - 1-Klick Support-Ticket-System mit 60-Minuten-Retainer-Kontingentverwaltung für den „Digitalen Hausmeister (200 € / Monat)“.
- **📑 E-Rechnungs- & ZUGFeRD / XRechnung Prüf-Studio (R4):**
  - Visueller Validator (`EInvoiceValidator.jsx`, `eInvoiceParser.js`) für EN 16931-konforme XML- und PDF-Dateien (ZUGFeRD 2.x / Factur-X & XRechnung 3.x CII/UBL).
  - Client-seitige PDF/A-3-Extraktion, Ampel-Prüfprotokoll für Pflichtangaben (Leistungsdatum, USt-IdNr, Kreditor/Debitor, Leitweg-ID) und mathematische Konsistenzprüfung (BR-CO-10 bis BR-CO-18).
  - Drag & Drop Upload, Beispielrechnungen und PDF/JSON Prüfbericht-Export.

### 0c. 🏷️ Top-10-Markennamen-Strategie & B2B-Positionierung -- *NEU!*
- **🎯 4-Stufige Naming-Architektur (`DOCS/Markennamen_Strategie_Top10.md`):**
  - Speziell für Einzelunternehmen im Handwerks- und B2B-Umfeld im Harz entwickelt („[Marke] – Inh. Robin Gornitzka“).
  - **Schritt 1 (Kontext-Extraktion):** 3 prägnante Kernsätze zu Geschäftsmodell (No-Code, E-Rechnung, Festpreise), spitzester Zielgruppe (SHK-, Elektro-Meister, Gebäudereinigung & Steuerberater) und Tonalität (Augenhöhe, 0% IT-Chinesisch).
  - **Schritt 2 (Semantische Wortfelder):** Systematische Aufbereitung von 30 Begriffen in 4 Feldern (Nutzen/Entlastung, Handwerk/Substanz, Moderne Abstraktion, Modulare Regionalelemente).
  - **Schritt 3 (4-Stufen-Härtetest mit Negativ-Dokumentation):** Meister-Test, Telefon-Test (80 dB Baustellenlärm), Rechnungs-Test und 0-Buzzword-Filter. Explizit dokumentierte Ausschlussbegründungen für *Klarwerk* (Phonetik Klärwerk & Hornbach-Armaturen), *Taktos* (Kollision mit taktos.one SaaS), *Ablaufwerk* (Tiefbau-Ablaufbauwerk), *Bürofreiraum* (§ 8 MarkenG Beschreibungsgefahr), *Taktgewinn* (Wettbewerber Patrick Klug) und *Werkablauf* (Handwerker-Vergleichsportal).
  - **Schritt 4 (Bereinigtes Top-10-Tableau):** Exakt 10 kollisionsfreie Namen mit maximal 5-Wort-Claims und live geprüften `.de`-Domains:
    1. *Handwerk:* **Prozesswerk** (`prozesswerk-harz.de`), **Büroschmiede** (`bueroschmiede-harz.de`), **Flusswerk** (`flusswerk-harz.de`).
    2. *Nutzen:* **Klarzeit** (`klarzeit-harz.de`), **Ruhetakt** (`ruhetakt-harz.de`), **Freitakt** (`freitakt-harz.de`).
    3. *Kunstwort:* **Klaros** (`klaros-harz.de`), **Struktus** (`struktus-harz.de`).
    4. *Hybrid:* **Taktwerk** (`taktwerk-harz.de`), **Ruhewerk** (`ruhewerk-harz.de`).
- **🧪 Automatisierte Validierungs-Suite (`.agents/teamwork/worker_iter2_1/validate_top10.ps1`):**
  - Live-DNS-Prüfung aller 10 empfohlenen `.de`-Domains (10/10 frei auf NXDOMAIN).
  - Buzzword-Check: 0 Treffer für Solutions, Tech, Digital, AI, Synergy, Excellence, Cloud.
  - Wortzähler: Alle 10 Claims <= 5 Wörter.
  - Kollisionsprüfung: 0 Treffer gegen alle 26 regionalen Wettbewerber im Harz.

### 0d. 🏷️ Schablonenfreie Top-10-Markennamen-Strategie für Handwerk & KMU -- *NEU!*
- **🎯 4-Stufiger schablonenfreier Naming-Prozess (`DOCS/Markennamen_Strategie_Schablonenfrei_Top10.md`):**
  - Vollständige Befreiung von starren Metaphern (`Werk`, `Schmiede`, `Lotse`, `Bank`) und strikter Ausschluss aller 10 Namen aus Runde 1.
  - Entwickelt für ein überregional skalierbares Einzelunternehmen mit optionaler regionaler Harz-Verankerung (`[Marke] – Inh. Robin Gornitzka`).
  - **Schritt 1 (Strategische Reflexion & Wirkungsanalyse):** Psychologische Resonanz beim Handwerksmeister (Entlastung, Ruhe, Augenhöhe, Festpreise) und 5 Sprachfallen (Handwerks-Kitsch, IT-Buzzwords, Amtsdeutsch, Kumpelhaftigkeit, Buchstabier-Hürden).
  - **Schritt 2 (Freies Brainstorming in 4 Richtungen):** 25 unvoreingenommene Namensansätze aus dem Alltag der Zielgruppe.
  - **Schritt 3 (Auslese & 4 Härtetest-Filter):** Meister-Test, Telefon-Test (Baustellenlärm), Rechnungs-/Kanzlei-Test und 0-Buzzword-Filter mit konkreten Negativbeispielen.
  - **Schritt 4 (Die schablonenfreie Spitzenklasse):** Ausgewogene Top-10-Matrix mit maximal 5-Wort-Claims und sinnvollen `.de`-Domainansätzen:
    1. *Richtung A (Ergebnis- & Nutzen-Klarheit):* **Klarstand** (`klarstand-harz.de`), **Freikopf** (`freikopf-harz.de`), **Bürofrieden** (`buerofrieden-harz.de`).
    2. *Richtung B (Funktionale / Sachliche Namen):* **Bürologik** (`buerologik-harz.de`), **Kernprozess** (`kernprozess-harz.de`).
    3. *Richtung C (Moderne Neologismen / Kunstwörter):* **Praxos** (`praxos-harz.de`), **Ordonis** (`ordonis-harz.de`), **Valido** (`valido-harz.de`).
    4. *Richtung D (Bildhafte / Assoziative Namen):* **Hebelpunkt** (`hebelpunkt-harz.de`), **Gleichlauf** (`gleichlauf-harz.de`).
- **🧪 Automatisierte Test-Suiten (`verify_schablonenfrei_top10.py` & `verify_competitor_collisions_schablonenfrei.py`):**
  - 100%ige Einhaltung aller Vorgaben: 0 verbotene Schablonen, 0 IT-Anglizismen, 0 Wiederholungen aus Runde 1, alle Claims <= 5 Wörter, 0 phonetische Kollisionen mit 23+ regionalen und Benchmark-Wettbewerbern.

### 0e. 🏷️ Top-10-Markennamen-Strategie Runde 3 & KI-Prompting-Enzyklopädie -- *NEU!*
- **📖 Umfassender Methoden- & Prompt-Leitfaden (`DOCS/KI_Naming_Methoden_und_Workflows.md`):**
  - **10 praxiserprobte KI-Naming-Techniken:** 1. Linguistische Morphem-Matrizen, 2. Archetypen-Rollenspiel, 3. Negativ-Constraint-Prompting, 4. Few-Shot mit Anti-Mustern, 5. Lateral-Thinking-Ketten, 6. Semantische Dekonstruktion, 7. Rekursive Bewertungs-Prompts, 8. Phonetische Resonanz-Filterung, 9. Semiotische Quadranten, 10. Hyper-spezifische Szenario-Simulation.
  - **Sofort einsatzbereite Prompt-Templates:** Alle 10 Methoden enthalten vollständig ausformulierte, kopierbare Prompts im deutschen B2B- & Handwerkskontext (Inh. Robin Gornitzka, Make/n8n, DATEV/Lexoffice, E-Rechnung).
  - **Vergleichende Bewertungsmatrix:** Gegenüberstellung aller 10 Frameworks nach Kreativpotenzial (1–10), Marken-Präzision (1–10), Aufwand, Risiken und Best-Fit-Einsatzbereich.
  - **Mathematische & algorithmische Transformer-Fehleranalyse:** Erklärung, warum Standard-Prompts scheitern (Next-Token-Wahrscheinlichkeitslandschaften, Softmax mit Temperatur $T$, Unigramm/Bigramm-Priors, Sampling-Dilemma $T \le 0.5$ vs. $T \ge 1.2$, RLHF/DPO Safe-Zone Mode Collapse, Attention Sinks) und die 4 konkreten Prompt-Hebel (Hard Lexical Constraints, orthogonale Domänenübertragung, morphem-basierte Dekonstruktion, Multi-Pass Evaluator-Generator Split).
  - **4-Stufen Master-Workflow-Playbook:** End-to-End Orchestrierung von Divergenz über Synthese und Filterung bis zum Adversarial Stresstest.
  - **🎯 Finale 360°-geprüfte Top-10-Namensauswahl (`DOCS/Markennamen_Strategie_Runde3_Final.md`):**
  - 10 komplett neue, überregional skalierbare Namen ohne starre Schablonen (`Werk`, `Schmiede`, `Lotse`, `Bank`) und ohne IT-Anglizismen:
    1. *Richtung A (Nutzen-Klarheit & Entlastung):* **Klarbund** (`klarbund-harz.de` & `klarbund.de` frei!), **Ruhebund** (`ruhebund-harz.de` & `ruhebund.de` frei!), **Zeitgriff** (`zeitgriff-harz.de` & `zeitgriff.de` frei!).
    2. *Richtung B (Bildhafte & Mechanische Analogie):* **Kraftschluss** (`kraftschluss-harz.de` & `kraftschluss.de` frei!), **Masshalt** (`masshalt-harz.de` & `masshalt.de` frei!), **Klaranker** (`klaranker-harz.de` & `klaranker.de` frei!).
    3. *Richtung C (Eigenständiger Neologismus / Kunstwörter):* **Ordalis** (`ordalis-harz.de` & `ordalis.de` frei!), **Logitakt** (`logitakt-harz.de` & `logitakt.de` frei! – ersetzt `Taktiva` nach adversarialer Aufdeckung einer Nizza-35-Kollision mit *Taktiva GzFr GmbH*).
    4. *Richtung D (Bodenständige Pragmatik):* **Bürogriff** (`buerogriff-harz.de` & `buerogriff.de` frei!), **Festtakt** (`festtakt-harz.de` & `festtakt.de` frei!).
  - **Ausführlicher 4-Stufen-Prüfbericht pro Name:**
    1. *Tier 1 (Psychologie):* Resonanz beim Handwerksmeister (SHK/Elektro/Bau), partnerschaftliche Augenhöhe, Feierabend-Entlastung, Vertrauenssignal Einzelunternehmen `[Marke] – Inh. Robin Gornitzka`.
    2. *Tier 2 (Baustellen- & Telefontauglichkeit):* Akustik >75 dB, Trochäus-Metrik, Meldeformel, Buchstabierbarkeit nach DIN 5009 (G = Goslar!), Kölner Phonetik DIN 31634 mit lückenloser Grenzfall-Korrektur (Klarbund `457162`, Ruhebund `7162`, Masshalt `6852`, Festtakt `38242`, Logitakt `54242`).
    3. *Tier 3 (Domain-Vorprüfung):* Live-DNS-Status (`NXDOMAIN` / frei) für regionale und überregionale `.de`-Domains.
    4. *Tier 4 (Markenrecht & Schutzstrategie):* Prüfung Nizza-Klassen 35 & 42, § 8 / § 9 MarkenG, BGH/EuGH-Verwechslungsgefahr gegen 40+ Wettbewerber inklusive rechtlicher Schutzhinweise (Wort-Bildmarken-Empfehlung für *Bürogriff* nach § 8 Abs. 2 Nr. 2 und *Masshalt* nach § 8 Abs. 2 Nr. 1; expliziter Ausschluss von Maschinenbau in Klasse 42 für *Kraftschluss*).
- **🧪 Automatisierter Verifikations-Harness (`run_collision_tests_r3.py` & `empirical_adversarial_suite.py`):**
  - Ausführbares Python-Prüfskript zur Validierung aller 10 Kandidaten gegen 40+ Wettbewerber (22 regionale Harz-Systemhäuser/Agenturen + 18 DACH-Wettbewerber).
  - Berechnung der Kölner Phonetik Codes (DIN 31634), Levenshtein- und Jaro-Winkler-Distanzen (alle Peak-Werte mit max. 0.752 weit unter der Verwechslungsgrenze von 0.85).
  - Bestätigung von 10/10 freien regionalen `.de`-Domains und 0 % Überschneidung mit Vorrunden.
  - Didaktische Lektionen in `DOCS/KI_Naming_Methoden_und_Workflows.md` (Methode 3 & 8) zu den physikalischen Grenzen von BPE-Tokenizern bei Silben-/Buchstabenzählung und DIN-31634-Zustandsregeln.

### 0f. ⚡ HarzBlitz Notdienst & Gebäudetechnik Automatisierungskaskade -- *NEU!*
- **🚨 Schlüsselfertige Front- & Back-Office Pipeline (`harzblitz_automation/`):**
  - **📞 Voice-KI „Anna von HarzBlitz“ (05321-778890):** 24/7 Notrufannahme via Vapi.ai, Deeskalation bei Rohrbruch/Wasserschaden, lebensrettende Stromwarnung, transparente Konditionen (kein Festpreis-Risiko) und RFC-konformer Function Call `dispatch_harzblitz_job` (`vapi/system_prompt_anna.md`, `vapi/tool_dispatch_harzblitz_job.json`).
  - **💬 360dialog WhatsApp Foto-Dispatching:** Automatisiertes deutsches WhatsApp Business Template mit exakt 5 Sekunden Verzögerung zur barrierefreien Anforderung von 1–3 Schadensfotos direkt im Chat (`whatsapp/360dialog_template_de.json`).
  - **🗄️ Supabase PostgreSQL & Storage Frankfurt:** Tabelle `harzblitz_orders` mit UUIDv4-Schlüsseln, Dringlichkeits- und Status-CHECK-Constraints, RLS-Sicherheits-Policies und Storage-Bucket `harzblitz-damage-photos` (`supabase/01_schema_harzblitz_orders.sql`, `supabase/02_storage_harzblitz_damage_photos.sql`).
  - **🔄 n8n E2E Workflow-Kaskade:** Direkt importierbare n8n Workflow-Spezifikation (`n8n/harzblitz_e2e_workflow.json`) zur Kopplung von Inbound-Webhook, 5s Delay, Supabase-Persistierung, Media Handler und Lexoffice-Rechnungserstellung.
  - **💼 Lexoffice API v1 & DATEV Unternehmen online:** Automatischer Kontakt-Abgleich per Telefonnummer, Rechnungsentwurf (`voucherStatus: "draft"`, 211,50 € netto / 251,69 € brutto, 19% MwSt.) mit DATEV-Erlöskonto 8400 zur 1-Klick-Freigabe durch Meister Marc Schneider.
  - **🧪 Autonome Test- & Walkthrough-Suite (`tests/`, `docs/`):**
    - `tests/simulated_dialog_meyer.md`: Vollständiger 3-Minuten Notfall-Testdialog Herr Meyer (Bad Harzburg, „Keller unter Wasser“).
    - `tests/e2e_simulation_test.py`: Eigenständiges Python E2E-Prüfskript (Standard-Bibliothek only, zero 3rd-party pip packages), das alle 5 Hops der Pipeline testet und mit 44/44 bestandenen Assertions und Exit Code 0 abschließt.
    - `docs/WALKTHROUGH.md` & `README.md`: Detaillierte Schritt-für-Schritt Inbetriebnahmeanleitung und Architekturübersicht.

### 1. Dashboard & Life OS Gamification -- *NEU UPGRADED!*
- **🎙️ Voice Quick-Capture Studio:** 1-Tap Sprach- und Diktierstudio mit Web Audio API Synthesizer-Feedback, Live Wave-Puls, Tag-Pills (`#Wichtig`, `#Kunde`, `#Idee`...) und 1-Klick Multi-Routing direkt in *To-Do*, *Notiz*, *Tages-Fokus*, *CRM-Lead* oder *Termin*.
- **📦 1-Klick Data Hub & Backup Manager:** Vollständiges Export- und Import-Center für alle 7 OS-Datenmodule (CRM, Prompts, Notizen, Gamification, Tasks, Roadmap, Settings) mit Drag & Drop, Schema-Inspektor und automatischem Notfall-Snapshot vor jedem Restore.
- **🎮 Life OS Level, XP & Coins System:** Verdiene XP und Life-Coins durch das Abhaken täglicher Habits und Fokus-Ziele. Verfolge deinen Fortschritt mit visueller Level-Bar (Level Up alle 200 XP).
- **🎁 Belohnungs-Shop (Münzen einlösen):** Tausche verdiente Coins gegen selbstdefinierte Belohnungen ein (z. B. 30 Min Zocken, Filmabend, Cheat Meal, Tech-Gadgets) – ohne schlechtes Gewissen!
- **🛡️ Bestrafungs- & Disziplin-Manager:** 3 wählbare Anti-Faulheit-Modi bei verpassten Gewohnheiten (Münz-Abzug / XP-Schulden, Straf-Aufgaben, 3-Strikes System).
- **🛌 Smart Routine & Ruhetags-Erkennung:** Automatische Wochentag-Erkennung (z. B. Kraftsport an Mo/Mi/Fr). An regenerativen Tagen zeigt die App explizit einen **grünen Ruhetag-Hinweis**, um schlechtes Gewissen zu vermeiden.
- **⚡ Make Academy & Lern-Tracker:** Täglicher Schnell-Check für Make Academy Einheiten und Weiterbildung.
- **Personalisierbares Layout & Freie Verschiebung:** Blende Widgets ein/aus und **verschiebe sie frei per Positionsmarkierung (`#1`, `#2`...) und `⬆️` / `⬇️` Buttons im Editor**.
- **📌 Multi-Notizen System & Cloud-Sync (Handy ↔ PC):** Erstelle, benenne und verwalte beliebig viele Notizblätter mit individuellen Farben. Alle Notizen werden automatisch in Supabase Cloud gesichert.

### 1b. Gründungs-Roadmap & Command Center -- *NEU!*
- **🗺️ Interaktive Gründungs-Roadmap & Meilenstein-Matrix:** 4 strategische Gründungsphasen (1: Fundament/Recht/Banken, 2: Pilot-Kunden Harz, 3: Automation Stack, 4: B2B-Skalierung). Mit Ampelstatus (`⚪`, `🟡`, `🔴`, `🟢`), interaktiven Checklisten und XP-Belohnungen für das Life OS bei Meilenstein-Abschluss.

### 1c. 🔔 Push-Benachrichtigungen & Android 4-Widget-Suite -- *NEU!*
- **🔔 Hybrides Benachrichtigungssystem (`src/services/notificationService.js`):** Unterstützt Desktop- & Mobile-Browser Web Notifications, PWA Service Worker Push und native Capacitor Android Alarme (`@capacitor/local-notifications`, `@capacitor/push-notifications`).
- **🎯 4 Smarte Trigger:** Automatische Benachrichtigungen bei fälligen CRM-Wiedervorlagen, offenen To-Do-Fristen, anpassbarem morgendlichem Fokus-Start (z. B. 08:00 Uhr) und Habit-Streak-Schutz am Nachmittag.
- **🎛️ Zentrales Kontrollzentrum (`NotificationCenterModal.jsx`):** Permission-Check, Toggles für alle Trigger, Morgen-Fokus Uhrzeit-Wähler, Sofort-Test-Button (`🧪 Test-Benachrichtigung senden`) und 1-Klick Widget-Synchronisation.
- **📱 Android 4-Widget-Suite:**
  1. *All-in-One Power Widget:* Notizen, Top-3 To-Dos, CRM-Kennzahlen (518 Betriebe, fällige Wiedervorlagen) und Streak-Badge.
  2. *To-Do & Fokus Widget:* Aufgabenliste mit Checkboxen, Zähler und Tagesziel.
  3. *CRM Pipeline Widget:* Lead-Zähler, fällige Wiedervorlagen und Schnellstart in die Lead-Akte.
  4. *Quick-Capture & Voice Widget:* 1-Klick Diktier- & Sprachnotizen-Studio.

### 1d. 🌐 Google Workspace Live-Radar (Google Kalender & Gmail) -- *NEU!*
- **📅 Google Kalender Live-Radar:** Automatische Synchronisation aller anstehenden Termine mit **15-Minuten-Vorab-Push-Alarm** direkt auf den Sperrbildschirm und Desktop.
- **✉️ Gmail Posteingangs-Radar:** Hintergrund-Prüfung auf neue ungelesene Nachrichten mit Sofort-Benachrichtigung (`Absender`, `Betreff`, `Kurzvorschau`) und In-App Posteingangs-Liste.
- **📱 Home-Screen-Widget Synchronisation:** Der nächste anstehende Google-Termin und der Zähler ungelesener Mails werden live auf das Android-Widget übertragen.

### 1e. 🎨 In-App Widget-Studio (Android Home-Screen Live-Konfigurator) -- *NEU!*
- **📱 Fotorealistische Live-Smartphone-Vorschau:** Sieh alle Anpassungen in Echtzeit auf einem virtuellen Smartphone-Startbildschirm.
- **⚡ 4 1-Klick Presets:** *🌟 All-in-One Master*, *🎯 Deep Work & Fokus*, *💼 Sales Hunter*, *🖤 Minimalist AMOLED*.
- **🎛️ Modul-Toggles & Feintuning:** Schalte Notizen, To-Dos (Top 3 vs 5), CRM-Radar, Streak, Termine und Tagesziel individuell ein/aus.
- **🎨 4 Farbschemata & Transparenz-Slider:** Wähle zwischen *Glassmorphic Dark*, *AMOLED Black*, *Cyber Cyan*, *Deep Navy* und passe die Hintergrund-Deckkraft stufenlos von 20% bis 100% an.

### 1f. 📌 Windows Desktop Notizzettel (Natives WPF Sticky Note Widget) -- *NEU!*
- **🪟 Echtes Windows-Desktop-Post-It (`desktop-widget/FounderOS-StickyNote.ps1`):** Schlanker, rahmenloser Notizzettel direkt auf dem Windows-Desktop mit weichem Schatten, abgerundeten Ecken und flüssiger Texteingabe ohne zusätzliche Software-Installationen (Zero-Dependency über .NET).
- **🚀 Dauerhaftes Desktop-Widget & Autostart:** Über den Raketen-Button (`🚀`) im Kopfbereich oder die Skripte `Enable-Autostart.ps1` / `Disable-Autostart.ps1` startet der Zettel automatisch bei jedem Windows-Hochfahren im Hintergrund.
- **📌 Immer im Vordergrund (Pin-to-Top):** Kann mit dem Nadel-Symbol dauerhaft über allen anderen Windows-Fenstern angepinnt werden (`📌`) oder unaufdringlich als Desktop-Hintergrund-Widget ruhen (`📍`).
- **🎨 6 Farbthemen:** Wähle zwischen *Sonnengelb*, *Himmelblau*, *Minzgrün*, *Sanftrosa*, *Pfirsich* und *Dark Mode*.
- **🗂️ Multi-Notizen System:** Schnelles Erstellen (➕), Wechseln (◀ 1/2 ▶) und Verwalten mehrerer Zettel.
- **💾 Autosave & Positionsspeicher:** Speichert Eingaben, Fensterposition und Größe automatisch lokal in `notes-data.json`.
- **🔄 2-Wege Supabase Cloud-Sync:** Das Desktop-Widget synchronisiert automatisch mit der Supabase-Tabelle `dashboard_state`. Alle Notizen sind in Echtzeit zwischen Windows Desktop, Handy (Android Widget) und Web-Dashboard synchron.
- **⭐ In-App Web-Popout („Auf Desktop lösen“):** Über den neuen Button am Notizzettel im Dashboard löst sich der Zettel mit einem Klick in ein eigenes, schlankes Windows-Fenster (`/?mode=sticky`) oder schwebt dank Document Picture-in-Picture dauerhaft über allen Arbeitsfenstern.

### 2. Inbox & Tasks (Posteingang)
- **WhatsApp-Gateway & Webhook-Simulation:** Teste den Empfang strukturierter WhatsApp-Nachrichten samt HTTP-Post-Weiterleitung.
- **Kanban-Board:** Drag-and-Drop Aufgaben-Board für den optimalen Arbeitsfluss.

### 3. CRM & Projekte (Kundenverwaltung)
- **Kunden-Akte (Drawer):** Drawer mit kundenbezogenen Notizen, verlinkten Dokumenten und lückenloser Aktivitätshistorie.
- **Projekt-Tracker & Time-Tracking:** Live-Stoppuhr zur Rentabilitätsberechnung (effektiver Stundensatz) mit Farbindikatoren (Rot/Gelb/Grün).

### 3b. 🎙️ Customer-Discovery & Positionierungs-Validierung (15–20 Min Interviews) -- *NEU!*
- **Eigene Discovery-Kontaktliste & Multi-Upload (`src/components/CustomerDiscoveryView.jsx`):**
  - Datei-Upload für `.csv`, `.json` und `.txt` Dateien, schneller Copy-Paste-Import, manuelle Einzelanlage sowie 1-Klick-Übernahme der bestehenden 90 Kaltakquise-Leads.
- **Geführtes 6-Phasen Telefon- & Interview-Cockpit (inkl. 15–20 Min Stoppuhr):**
  - **Phase 1 (Der Telefon-Türöffner):** Personalisiertes Skript („Gründer-Bonus“) mit 3 klickbaren Ausweichrouten (*„Schießen Sie los im Auto“*, *„Keine Zeit“* mit 07:15/Freitag-13:00-Konter, *„Worum geht’s denn?“*).
  - **Phase 2 (Framing & Betriebskontext):** Schnelleingabe von Gewerk, Mitarbeiterzahl (Feld/Büro), Büro-Zuständigkeit und bestehender Software.
  - **Phase 3 (Die Diagnose-Weiche – Pfade A bis E & Reframing):** Interaktive Weiche für alle 5 Erkundungs-Pfade (*Pfad A: Rechnungen/DATEV*, *Pfad B: Kundenfront/Termine*, *Pfad C: Kundenportal/Status*, *Pfad D: Baustellendoku/Fotos*, *Pfad E: Zeiterfassung/Lohn*), Ausweichroute bei „Rechnungen laufen schon in 5 Min“, wörtliches Zitat-Feld und Zauberstab-Abschlussfrage.
  - **Phase 4 (Zielgerichteter Lösungs-Pitch):** Hebt automatisch den exakt passenden Lösungs-Pitch zum gewählten Engpass-Pfad hervor + Brückenschlag zum 60–90-minütigen Büro-Audit.
  - **Phase 5 (Kritisches Feedback, Einwände & 500-€-Audit-Preistest):** Realitäts-Check, Einwand-Schnell-Tags und Preistest-Erfassung (`500 € problemlos`, `200–300 € Schmerzgrenze`, `Nur kostenfrei` + exakter Euro-Betrag).
  - **Phase 6 (Verbindlicher Abschluss & Multiplikator):** Warm-Lead Wiedervorlage nach Gewerbeanmeldung sichern + 1-Klick-Button, um genannte Empfehlungs-Betriebe direkt als neuen Kontakt anzulegen.
- **📅 Integrierter Kalender-Terminplaner:**
  - Schnellwahl-Buttons (*„Morgen 07:15 Uhr vor Baustelle“*, *„Freitag 13:00 Uhr“*) + freie Datums-/Uhrzeitwahl.
  - Speichert Interview-Termine direkt im **Founder-OS-Kalender** (inkl. 15-Min-Vorab-Push & Android-Widget), öffnet auf Wunsch eine fertige **Google-Kalender-Vorlage** oder lädt eine **`.ics`-Kalenderdatei** herunter.
- **📊 Validierungs-Radar & CRM-Protokollbogen:**
  - Live-Statistik über alle Interviews (Engpass-Ranking Pfad A–E, 500-€-Audit-Zuspruch, vereinbarte Termine & Warm-Leads) sowie 1-Klick Export als Markdown in den Wissens-Hub, Übernahme ins Haupt-CRM und CSV-Gesamtexport für den Gründungscoach.

### 4. Kunden-Onboarding (Gesprächsleitfäden) -- *NEU!*
- **Wizard-Ansicht:** Schritt-für-Schritt Abarbeitung des KMU-Service Harz Master Playbooks (10 Phasen) oder des Pilot-Bruder-Onboardings (5 Phasen).
- **Unterstützende Infos:** Live-Einblendung von Fragestellungs-Hintergründen, Folgefragen und Warnsignalen direkt im Workflow.
- **Echtzeit-Synchronisation:** Nahtlose Speicherung der Notizen über die Supabase-REST-API direkt in den CRM-Lead-Einträgen.
- **Wissens-Hub-Export:** Generierung sauberer Markdown-Gesprächsprotokolle für den Wissens-Hub.

### 5. KI Prompts (Prompt-Zentrale) -- *UPGRADED!*
- **Prompt Vault & Baukasten:** Speichere, verwalte, filtere, pinne (`📌`) und exportiere/importiere Prompts. Mit Platzhalter-Variablen (`{{Variable}}`) und Sync-Badges (`☁️ Cloud` vs `📱 Lokal`).
- **⚡ God of Prompt Library (1.304 vollständige Vorlagen):** 20 Fachgebiete (SOPs & Prozesse, Workflow Design, Projektmanagement, Market Research, Trend Analysis, Literature Review, Competitive Analysis, Deep Research, Brainstorming, Business Plans, Go-to-Market, Positioning, SWOT, OKRs, Pricing, Roadmaps, Competitive Strategy, Documentation, Debugging, Testing) mit Subkategorien-Filter, 1-Klick-Übernahme (`➕ In meinen Tresor übernehmen`) und Batch-Import.
- **🏢 KMU & Harz Spezial-Prompts:** 12+ vordefinierte Vorlagen für Sales, Recruiting, DSGVO, Google Beiträge und Handwerk mit 1-Klick-Übernahme.
- **🔬 Deep Research Frameworks & Baukasten (Phase v27):** 5 spezialisierte Recherche-Frameworks (📊 Lead & SWOT, 🎯 Wettbewerber, 📈 Markt & Trends, 🛠️ Tool-Vergleich, 👥 Buyer Persona) und 25+ Prompt-Bausteine.
- **📱↔️💻 Prompt Vault & Bidirektionaler Cloud-Sync:** Automatische bidirektionale Synchronisation mit Supabase, Prompt-Bibliothek für KMU, Favoriten und Deep Research Master-Prompt Generierung. mit 1-Klick-Wiederherstellen (`🔄 Diese Version wiederherstellen`).
- **🔬 Deep Research Prompt Modus & Quick-Button:** 1-Klick-Aktionsbutton (`🔬 Deep Research Prompt`) sowie Optimierungsziel (`🔬 Deep Research`), um beliebige Themen in 5-stufige Tiefenrecherche-Prompts (für Gemini Deep Research, Perplexity Pro, OpenAI Deep Research, Claude) zu transformieren.
- **Supabase Auto-Cloud-Sync:** Neue Prompts werden beim Erstellen oder Löschen sofort geräteübergreifend (Handy ↔ PC) synchronisiert.
- **Vorher/Nachher KI-Diff & Modi:** Vergleiche Original und KI-Ergebnis nebeneinander in 5 Ziel-Modi (*🎯 Standard*, *✂️ Kurz*, *🌍 Englisch*, *🛡️ Datenschutz*, *🔬 Deep Research*).
- **Content-Planer:** Redaktionsplan für deine Social-Media-Kanäle.
- **RAG Knowledge Bot:** KI-Assistent mit umschaltbaren Personas (🧠 Firmengehirn, 🎯 Pitch-Coach, 🔒 DSGVO & Legal), der dein Google-Drive-Wissen mit präzisen Quellenangaben durchsucht.

### 6. Dokumente & Sync (Dateiverwaltung) -- *NEU!*
- **Wissens-Hub & Dokumenten-Editor (Mini-Word):** Erstelle, bearbeite und lösche Textdokumente direkt in der App. Bietet Dateidownloads als `.txt`.
- **Google Drive & NotebookLM Sync:** Synchronisiere deine lokalen Dokumente mit Google Drive zur Indizierung in Google NotebookLM (inklusive terminalähnlicher Fortschrittsanzeige).
- **Supabase Cloud Sync:** Überwache die Echtzeit-Datenübertragung mit der Cloud (CRM, Tasks, Tickets) inklusive Latenz- und Tabellenzeilen-Anzeige.

### 7. Sales & SOPs (Vertriebstools)
- **Showcase ROI-Rechner:** Berechne Einsparungen live beim Kunden und exportiere diese als professionelles PDF-Angebot.
- **No-Code Automation Canvas:** Visueller Workflow-Builder zur Demonstration automatisierter Prozesse.
- **Zettel-zu-Code Visualisierer:** Interaktiver Vergleich von manuellen Papier-Abläufen vs. modernen IT-Schnittstellen.
- **Kunden-Portal (White-Label):** Umschaltbarer Mandanten-Modus für deine Kunden (Projektstatus, ROI-Ersparnis, Support-Ticket-System).

### 8. KMU Webseiten-Preview, Belegerfassungs-Fokus & Export -- *NEU RELAUNCHED!*
- **Positionierung & Botschaft:** „Der Handwerker für digitale Infrastruktur“ – *„Schluss mit dem Büro-Sonntag. Lautlose Belegerfassung & DATEV/Lexoffice-Schnittstellen für Handwerk & Mittelstand im Harz.“*
- **Dreistufige Preistreppe (Productized Services):**
  - *Stufe 1: Büro-Potenzial-Audit (500 € Festpreis)* – 90 Min Analyse vor Ort/Video, schriftlicher ROI-Fahrplan.
  - *Stufe 2: Das Standard-Setup (2.000 € Festpreis, Bestseller)* – Automatisierter Belegeingang (Drive, Mail, WhatsApp ➔ Lexoffice), DATEV-Übergabe, 100% E-Rechnung (EN 16931 / ZUGFeRD) & GoBD, bis zu 50% Fördermittel-Hebel (Digitalbonus).
  - *Stufe 3: Digitaler Hausmeister (200 € / Monat)* – 24/7 Monitoring, Schnittstellen-Updates, 1h Kontingent.
- **3-Schritte-Workflow der Belegerfassung:** Neutraler, universeller Ablauf für alle Handwerksgewerke (1. Smartphone-Foto vor Ort ➔ 2. Lautlose Erfassung & Lexoffice-Ablage ➔ 3. DATEV-Kanzleiübergabe ohne Rückfragen).
- **Interaktiver Handwerker-ROI-Rechner:** Ermittelt gerettete Büro-Sonntage pro Jahr, monatlich gewonnene Arbeitsstunden und den monetären Jahreswert.
- **🚀 1-Klick Website-Export & Live-Schaltung:** 
  - Integriertes modales Export-Center zum Herunterladen der autarken `index.html` mit konfigurierbarer Ziel-E-Mail.
  - Standalone-Datei liegt unter `public/website-export/index.html` vor.
  - Schritt-für-Schritt Hosting-Guides (Netlify Drag & Drop, FTP Strato/IONOS) und serverloses Kontaktformular via FormSubmit.co sowie direkter WhatsApp-Kontaktlink.
- **🎨 3-Design-Theme-Switcher:** Umschalten in der Header-Leiste zwischen 🌲 *Harz & Handwerk*, ⚡ *Modernes Tech-Handwerk* und 🛠️ *Industrie & Klarheit*, plus Hell/Dunkel-Modus.
- **Hybrid-Seitenstruktur:** High-Converting One-Pager plus dedizierte Subpages für Preise & Angebote, Ablauf, Rechner, Über uns, Impressum und Datenschutz.

### 9. 🎯 Coaching Live-Portal & Grafik-Anhänge (Zoom/Teams-Präsentation) -- *NEU!*
- **🖼️ Datei- & Grafik-Anhänge:** Lade Grafiken (Zielgruppen-Personas, Schulungsgrafiken, Screenshots, PDFs) direkt in Coaching-Terminen (Command Center), an Kanban-Aufgaben oder im Wissens-Hub (DocsHub) hoch.
- **🔍 Vollbild-Präsentationsmodus (Lightbox):** 1-Klick auf eine beliebige Grafik öffnet ein hochauflösendes Vollbild-Präsentationsfenster zum Herunterladen und Vorzeigen im Call.
- **🔒 PIN-geschütztes Coaching Live-Board (`CoachingLivePortal.jsx`):** Eine saubere Präsentationsunterseite (geschützt durch PIN `1234`), die im Zoom-Call geteilt werden kann. Zeigt den Coaching-Fortschritt, meilensteine, Aufgaben und Personas – bei 100%igem Schutz von privaten Notizen, Finanzen oder Kunden-Daten.

---

## 🛠️ Installation & Starten

### Voraussetzungen
- Node.js (v18 oder höher empfohlen)
- NPM

### Starten der lokalen Web-Entwicklungsumgebung
1. Navigiere in das Projektverzeichnis.
2. Installiere die Abhängigkeiten (falls noch nicht geschehen):
   ```bash
   npm install
   ```
3. Starte den Vite-Entwicklungsserver:
   ```bash
   npm run dev
   ```
4. Öffne im Browser: `http://localhost:5173`

---

## 📱 Mobile App (Android-Studio-Build)

Die Anwendung ist für den mobilen Einsatz als native Android-App vorbereitet.

1. **Vite-Build generieren:**
   ```bash
   npm run build
   ```
2. **Capacitor-Synchronisation:**
   ```bash
   npx cap sync android
   ```
3. **Android Studio öffnen:**
   ```bash
   npx cap open android
   ```
4. In Android Studio das Projekt starten oder als APK exportieren. Das native Homescreen-Widget (`MyWidgetProvider`) ist bereits im Android-Manifest registriert.

---

## 🧪 Test-Abteilung & Qualitätssicherung

Das Projekt verfügt über eine vollständige, modulare **Test-Abteilung** mit 8 eigenständigen Feature-Test-Suiten in `src/test/features/`. Dadurch können Tests für einzelne Features in unter 1 Sekunde ausgeführt werden, ohne die gesamte App laden zu müssen.

### ⚡ Schnelle Feature-Tests (Gezielte Ausführung)

| Feature / Bereich | NPM-Befehl | Was wird getestet? |
| :--- | :--- | :--- |
| **Mini-CRM & Pipeline** | `npm run test:crm` | Neuanlage von Leads, Phasenwechsel, Filter & Löschen |
| **Kanban & Aufgaben** | `npm run test:kanban` | Task-Erstellung, Spalten-Zuweisung, Inbox-Konvertierung |
| **Sales, SOPs & ROI** | `npm run test:sales` | ROI-Kalkulator-Formeln, Regionen-Förderung, SOP-Checklisten |
| **KI-Tresor (Prompt Vault)** | `npm run test:prompts` | Prompt-Erstellung, Platzhalter, Kategorien & Suche |
| **Command Center & Roadmap** | `npm run test:command` | Master-Logbuch Bearbeitung, Roadmap-Matrix, Meilensteine |
| **Coaching & Gamification** | `npm run test:coaching` | PIN-Gate Schutz, Belohnungs-Shop & Disziplin-Strafen |
| **Sync & Backup Manager** | `npm run test:sync` | 1-Klick Backup JSON-Schema, Notfall-Snapshots, Sync-Queue |
| **Dashboard & Voice Capture** | `npm run test:dashboard` | Voice-Diktat Routing, Hashtags & Fokus-Timer |

### 🚀 Gesamte Test-Läufe

- **Alle Feature-Tests zusammen (~3.9s):**
  ```bash
  npm run test:features
  ```
- **Interaktiver Entwickler-Watch-Modus (Hot-Reload bei Code-Änderung):**
  ```bash
  npm run test:watch
  ```
- **Gesamter Integrations-Test:**
  ```bash
  npm run test:all
  ```
- **Naming-Strategie & Live-DNS-Validierung (PowerShell):**
  ```powershell
  powershell -ExecutionPolicy Bypass -File .agents/teamwork/worker_naming_1/validate_naming.ps1
  ```



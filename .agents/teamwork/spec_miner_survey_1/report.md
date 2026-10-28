# Kontext-Synthese & Spezifikations-Report: Schritt 1 (Kurz-Briefing) der Naming-Strategie

**Projekt:** KMU Service Harz / Naming Strategy & B2B-Positionierung  
**Autor:** spec_miner_survey_1 (Specification Miner)  
**Datum:** 2026-10-12  
**Ziel-Referenz:** `ORIGINAL_REQUEST.md` (Follow-up 2026-10-12T11:44:20Z) & `DOCS/Markennamen_Strategie_Top10.md`  

---

## 1. Executive Summary & Der autoritative 3-Satz-Draft (Schritt 1)

Direkt gemäß **Requirement R1 (Schritt 1: Kontext-Extraktion / Kurz-Briefing)** und dem zugehörigen **Acceptance Criterion** („Schritt 1 umfasst maximal 3 prägnante Sätze, die exakt die 3 Leitfragen beantworten“) wurde folgende Formulierung abgeleitet:

> **1. Geschäftsmodell:** Als spezialisierte B2B-Automatisierungsagentur verbinden wir bestehende Insellösungen im Handwerks- und Dienstleistungs-Backoffice lautlos über No-Code-Infrastrukturen (Make.com, n8n, Lexoffice, DATEV) und lösen die gesetzliche E-Rechnungs- sowie GoBD-Pflicht schlüsselfertig zum garantierten Festpreis statt auf unkalkulierbare Stundenbasis.  
> **2. Spitzeste Zielgruppe:** Die spitzeste Zielgruppe bilden überlastete Handwerksmeister (wie SHK- oder Elektro-Meister Thomas) und operative Dienstleistungs-Koordinatorinnen (wie Anja Schneider in Gebäudereinigung und Facility Services) mit 1 bis 20 Mitarbeitenden in der Region Harz sowie regionale Steuerberater als zentrale Empfehlungs-Multiplikatoren.  
> **3. Kernversprechen & Tonalität:** Als bodenständiger „Handwerker für digitale Infrastruktur“ und pragmatischer Prozess-Befreier schaffen wir ohne jedes IT-Fachchinesisch den unbezahlten Bürosonntag und die Zettelwirtschaft dauerhaft ab – für spürbare 16 Stunden monatliche Zeitersparnis und vollkommene unternehmerische Rechtssicherheit.

---

## 2. Granulare Dekonstruktion der drei Kern-Dimensionen

### 2.1 Das exakte Geschäftsmodell & Wertschöpfung
* **Organisations- & Rechtsform:** Spezialisierte No-Code- und Automatisierungsagentur, geführt als schlankes Einzelunternehmen (*„[Markenname] – Inh. Robin Gornitzka“*), ohne starre Rechtsformkürzel (kein UG/GmbH-Zwang im Außenauftritt).
* **Technologischer Stack:**
  - Middleware & iPaaS: **Make.com**, **n8n** (self-hosted / DSGVO-konforme Instanzen), Webhooks, REST-APIs.
  - Buchhaltung & Vorsysteme: **Lexware Office (Lexoffice)**, **sevDesk**, Handwerker-Branchensoftware (z. B. HERO, pds, KWP, WinWorker).
  - Kanzlei-Datenservices: **DATEV Rechnungsdatenservice 1.0** (Standard für Buchungsmandanten) und **DATEV Buchungsdatenservice** (für Selbstbucher), **DATEV Unternehmen online (DUO)**.
  - Mobile Erfassung: WhatsApp Business API / Chatbots, E-Mail-Parsing, OCR-Texterkennung.
* **Kernaufgabe & Problemlösung:**
  - Schließen von Medienbrüchen („SaaS-Spaghetti“ und Zettelchaos zwischen Baustelle, Transporter, Büro und Steuerberater).
  - Vollautomatisierte, lautlose Hintergrund-Prozesse (Headless-Integration).
  - 100 % Konformität mit der gesetzlichen B2B-E-Rechnungspflicht (EU-Norm EN 16931, ZUGFeRD 2.x, XRechnung 3.x) und GoBD-revisionssichere Archivierung inklusive Verfahrensdokumentation für ersetzendes Scannen.
* **Kommerzielle Architektur („Productized Services“ & Preistreppe):**
  - **Stufe 1 (Türöffner / Tripwire):** *500,00 € netto* Büro-Potenzial-Audit (90 Min. Vor-Ort-Analyse, 4-teiliger ROI-Report, Vorkasse, 100 % Anrechnung bei Folgebeauftragung).
  - **Stufe 2 (Core Offer / Bestseller):** *2.000,00 € netto* Standard-Setup (Lautlose Belegerfassung in 1–2 Wochen, Amortisation in ~8 Wochen, ~100 % Dienstleistungsmarge).
  - **Stufe 2+ (High-Ticket Upgrade):** *ab 6.000,00 € netto* „Digitaler Meisterbetrieb“ (ERP-Tiefenintegration) mit staatlichem Fördermittelhebel (Digitalbonus Niedersachsen 35 %, Sachsen-Anhalt DIGITAL INNOVATION bis 50 %, BAFA/INQA-Coaching bis 80 %).
  - **Stufe 3 (Backend / MRR Retainer):** *200,00 € netto/Monat* „Digitaler Hausmeister“ (Automation-as-a-Service: 24/7 API-Monitoring, Break-Fix-Garantie, Retry-Logiken, 1 Stunde/Monat für Feinanpassungen, LTV > 4.800 €).

### 2.2 Die spitzesten Ziel-Personas
1. **Persona A: Handwerksmeister Thomas (SHK, Elektro, Bau, Dachdecker, GaLaBau)**
   - *Profil:* 35–58 Jahre, Meister & Inhaber, 1–20 Mitarbeiter.
   - *Arbeitsalltag:* 10+ Stunden operativ auf der Baustelle oder im Kundendienst, chronisch ausgelastet.
   - *Hauptschmerz:* Knitterige Tankquittungen und Lieferscheine auf dem Armaturenbrett des Transporters, unleserliche handschriftliche Stundenzettel, manuelle Übertragung am Sonntagvormittag am Küchentisch („Bürosonntag“), Angst vor unkalkulierbaren IT-Kosten und komplizierten Apps.
   - *Kaufmotiv:* Feierabend, Schutz des Wochenendes für die Familie, sofortiger ROI, einfache Abläufe für Monteure ohne Lernkurve.
2. **Persona B: Operative Koordinatorin Anja Schneider (Gebäudedienstleister, Facility Services, Reinigung)**
   - *Profil:* 35–55 Jahre, kaufmännische Leiterin / Büroleitung / mitarbeitende Partnerin, 5–50 Mitarbeiter (hoher Anteil Teilzeit/Minijobber).
   - *Arbeitsalltag:* Permanentes Krisenmanagement (05:30–07:00 Uhr Krankheitsausfälle), Puffer zwischen Objektleitern, Hausverwaltungen und Inhaber.
   - *Hauptschmerz:* BAG-Zeiterfassungspflicht, Mindestlohngesetz (§ 17 MiLoG, Zollprüfung bis 50.000 € Bußgeld), fehlende Verkehrssicherungsnachweise (Winterdienst), Abrechnungsstau (Liquiditätsverzug).
   - *Kaufmotiv:* Rechtssicherheit („Peace of Mind“), Fehlerreduktion auf null, Entlastung von repetitiven Dateneingaben, schnelle Fakturierung innerhalb 24 Stunden.
3. **Strategischer Multiplikator C: Lokale Steuerberater & Steuerfachangestellte**
   - *Profil:* Kanzleien im Harz (Goslar, Wernigerode, Osterode, Halberstadt), die mit „Digitale Kanzlei“ werben, aber unter dem „Pendelordner aus der Hölle“ ihrer Mandanten ersticken.
   - *Rolle:* Primärer Empfehlungspartner („Huckepack-Strategie“). Die Kanzlei hat keine IT-Ressourcen für Vor-Ort-Setups bei Mandanten. KMU Service Harz agiert als verlängerte technische Werkbank und liefert saubere DATEV-Datensätze direkt in Kanzlei-Rechnungswesen.

### 2.3 Kernversprechen & Tonalität
* **Das Kernversprechen:**
  - „Schluss mit dem Büro-Sonntag.“
  - „Wir verkaufen keine Server. Wir verkaufen den pünktlichen Feierabend.“
  - „Lautlose Automatisierung im Hintergrund: Bestehende Software bleibt, Medienbrüche verschwinden.“
  - Messbare Zeitersparnis: ca. 16 Stunden pro Monat; Amortisation in unter 8 Wochen; 100 % GoBD- und E-Rechnungskonformität.
* **Tonalität & Marken-Psychologie:**
  - **Pragmatischer Prozess-Befreier:** Hemdsärmelig, verlässlich, bodenständig, lösungsorientiert.
  - **Handwerker für digitale Infrastruktur:** Augenhöhe mit dem Meisterbetrieb („Wir krempeln die Ärmel hoch und sanieren die Rohre Ihrer Büroprozesse“).
  - **0 % IT-Fachchinesisch:** Absoluter Verzicht auf abstrakte IT- und Beraterbegriffe (keine APIs, iPaaS, Cloud-Native, LLMs, AI, Transformation). Übersetzung technischer Fakten in betriebswirtschaftliche Realität (Stunden, Euro, Feierabend, Finanzamts-Sicherheit).

---

## 3. Features Discovered (per Spec Miner Guidelines)

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Positioning | Productized Service Architecture | Dreistufige Value Ladder (Audit -> Setup -> Retainer) statt Time & Material | Mandanten-Engpass / Büro-Chaos | Festpreis-Angebote (500 € / 2.000 € / 200 € mtl.) | Verbot offener Stundensätze | Businessplan § 2.2, Preistreppe § 2.2 |
| 2 | Technical Spec | DATEV Datenservice Integration | Schnittstellen-Anbindung von Lexoffice an DATEV Cloud (RDS 1.0 vs. BDS) | XML-Belegdaten, PDF/TIFF-Bilder | DATEV Unternehmen online Buchungsstapel | Fehlermeldung bei Validierungsbrüchen | Vertriebsplan § 2, Preistreppe § 4.1 |
| 3 | Regulatory Spec | B2B-E-Rechnungs- & GoBD-Pipeline | Automatisierte Validierung nach EN 16931 (ZUGFeRD 2.x, XRechnung 3.x) & Revisionssichere Archivierung | E-Mail-Postfach, XML/PDF-Rechnungen | Konforme Datensätze, Verfahrensdokumentation | Ampel-Warnung / Rejection bei non-compliance | ORIGINAL_REQUEST R4, Wettbewerbsanalyse § 3.1 |
| 4 | Diagnostic Spec | Büro-Stress-Test & ROI-Report | 4-teiliges Deliverable (Röntgenbild, Euro-Schattenkosten, Soll-Roadmap, Fördermittel-Indikation) | 90-Min Vor-Ort-Audit Daten | Druckfähiges PDF-Gutachten mit kalkulatorischem ROI | Klare rote Schattenkosten-Darstellung | ORIGINAL_REQUEST R2, Preistreppe § 3.3 |
| 5 | Operational Spec | Digitaler Hausmeister (AaaS Retainer) | 24/7 Monitoring aktiver Make/n8n-Verbindungen mit Break-Fix-SLA und Error-Handling | Webhook-Events, OAuth-Tokens, API-Status | Stabile Workflows, monatlicher Status-Report | Auto-Retry, Alerting vor Kundenbemerken | Businessplan § 2.2, Preistreppe § 6 |
| 6 | Sales Multiplier | Kanzlei-Huckepack-Partnerschaft | Strategische Allianz mit Steuerberatern als primärer Lead-Generator | Schlechtes Mandantenbeleg-Material | Fehlerfreie DATEV-Datensätze für Kanzlei | Kanzlei zahlt 0 €; Abrechnung mit Mandant | Vertriebsplan § 1, Businessplan § 4.1 |
| 7 | Subvention Spec | Fördermittel-Hebel (Subventionen) | Einbindung von Landeszuschüssen (Digitalbonus Nds 35 %, Sachsen-Anhalt 50 %) | Investitionsvolumen >= 3.000 € | Nicht rückzahlbarer Zuschuss (Zuschussantrag) | Striktes Verbot des vorzeitigen Maßnahmenbeginns | Preistreppe § 5, Businessplan § 1.4 |
| 8 | Branding/Naming | Naming Härtetest-Filter | 4-stufiger Filter (Meister-Test, Telefon-Test, Rechnungs-Test, Negativ-Filter) | Namenskandidaten aus Exploration | Validierte Top-10-Auswahl | Ausschluss bei Buzzwords oder phonetischer Schwäche | ORIGINAL_REQUEST R2, R3 |
| 9 | Brand Architecture | Hybrides / Modulares Regional-Modell | Entkopplung von Kernname und optionalem „Harz“-Zusatz für überregionale Skalierbarkeit | Regionale & überregionale Zielmärkte | Kernname + Regional-Variante | Kein starrer Ortsname im Basismarkenkern | ORIGINAL_REQUEST R1, Follow-up R3 |
| 10 | Legal Identity | Einzelunternehmen-Firmierung | Rechtssichere Präsentation ohne Kapitalgesellschafts-Zusatz („Inh. Robin Gornitzka“) | Rechnungen, Verträge, Impressum | Rechtskonformes Einzelunternehmen-Branding | Verbot von irreführenden Rechtsformzusätzen | ORIGINAL_REQUEST R2 (Punkt 3) |

---

## 4. Edge Cases & Grenzszenarien

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Naming Buzzword Filter | Kandidat enthält `Solutions`, `Tech`, `Digital`, `AI`, `Synergy`, `Excellence` oder `Cloud` | **Strikte Disqualifikation:** Verstößt gegen Negativ-Filter in R2/R3; erzeugt beim Handwerksmeister sofortige Abwehrreaktion („Großstadt-Hipster/Systemhaus“). |
| 2 | Telefon-Test Phonetische Barriere | Zungenbrecher, englische Akronyme oder erklärungsbedürftige Schreibweisen (z.B. „X-Flow“, „SynQ“) | **Disqualifikation:** Meister versteht Name am Telefon („Robin von ...“) nicht ohne Nachfragen oder Buchstabieren. |
| 3 | Geografische Einengung | Kernname enthält fest verdrahtetes „Harz“ (z.B. „HarzFlow“, „HarzProzess“) | **Einschränkung:** Verhindert spätere Skalierung nach Braunschweig, Hannover, Magdeburg oder bundesweit. Regionalbezug MUSS modular andockbar sein (z.B. „Kernname – Harz“). |
| 4 | Fördermittel-Timing | Beauftragung des Setup-Projekts vor Eingang der Förderbestätigung | **Subventionsverlust:** Vorzeitiger Maßnahmenbeginn führt zum Erlöschen des Zuschusses. Vertrag muss mit aufschiebender Bedingung geschlossen werden. |
| 5 | Retainer Scope Creep | Mandant verlangt im 200 €-Retainer den Bau eines neuen Webshops oder CRM-Systems | **SLA-Grenze greift:** Retainer deckt nur Monitoring, Fehlerbehebung und 1h Minor Tweaks ab; Neuentwicklungen erfordern separates Setup-Projekt. |
| 6 | Gewerberecht / RDG | Mandant verlangt verbindliche Steuerberatung zur Vorkontierung | **Abgrenzung § 5 RDG:** Nur technische Schnittstellenbereitstellung und Erstellung der Verfahrensdokumentation als erlaubte Nebenleistung; keine Rechts-/Steuerberatung. |

---

## 5. Strategische Positionierungs-Regeln & Naming-Restriktionen

Aus den analysierten Dokumenten (`ORIGINAL_REQUEST.md`, `Businessplan`, `Buyer Persona`, `Preistreppe`, `Vertriebsplan`, `Wettbewerbsanalyse`) ergeben sich folgende **unverhandelbare Leitplanken für die Naming-Entwicklung**:

### 5.1 Die vier Härtetest-Filter (Ausschlusskriterien)
1. **Der Meister-Test (Bodenständigkeit & Resonanz):**
   - Klingt der Name wie ein solides Handwerk oder wie eine abgehobene Berliner/Münchner Agentur?
   - Der Meister auf der Baustelle muss sofort das Gefühl haben: *„Der packt mit an, der versteht meinen Alltag.“*
2. **Der Telefon-Test (Phonetische Klarheit & Spontaneität):**
   - Begrüßung: *„Guten Tag, Robin von [NAME] hier.“*
   - Kriterium: Kein Stutzen, kein „Wie bitte?“, kein Buchstabieren, keine peinliche Pause.
3. **Der Seriositäts- & Rechnungs-Test (B2B- & Kanzlei-Tauglichkeit):**
   - Wirkung auf offiziellen Briefbögen, Angeboten und Rechnungen als Einzelunternehmen: *„[NAME] – Inh. Robin Gornitzka, Langelsheim“*.
   - Muss auch beim Steuerberater und bei Förderbanken (NBank, IB Sachsen-Anhalt) absolut seriös, vertrauenswürdig und behördenfest wirken.
4. **Der Negativ-Filter (Strikte Blacklist):**
   - **Verbotene Wörter (Case-Insensitive):** `Solutions`, `Tech`, `Digital`, `AI`, `Synergy`, `Excellence`, `Cloud`.
   - **Verbotene semantische Muster:** Reine Englisch-Buzzwords, Nerd-Begriffe, akademische Beraterfloskeln.

### 5.2 Kollisionsmatrix: Regionale Wettbewerber im Harz (Ausschluss ähnlicher Namen)
Die Naming-Auswahl darf keinerlei Verwechslungsgefahr mit den folgenden bereits aktiven regionalen Unternehmen aufweisen:
1. **IT-Nunweiler GmbH** (Goslar)
2. **MoCo Service** (Blankenburg)
3. **EITIE GmbH & Co. KG** (Wernigerode)
4. **ThHE.net worker** (Osterode)
5. **GitCom IT-Services** (Goslar)
6. **UniqueFlow IT** / Domenik Häring (Goslar)
7. **Dominik Kasten – IT-Service & Webentwicklung** (Goslar)
8. **storyflare GmbH** (Goslar)
9. **P1 Commerce / Webdesigner Goslar**
10. **Studio WILS** (Goslar)
11. **Sympic Werbeagentur** (Bad Harzburg)
12. **Spier Web Studio** (Goslar)

### 5.3 Vorgaben für Schritt 4 (Zukünftige Top-10-Generierung)
- **Exakte Struktur:** 10 Namen gleichmäßig verteilt über:
  - 3x Handwerk / Pragmatismus
  - 3x Nutzen / Ergebnis
  - 2x Kunstwort / Abstraktion
  - 2x Hybride Modelle
- **Claim-Restriktion:** Jeder empfohlene Claim darf maximal **5 Wörter** umfassen.
- **Domain-Restriktion:** Jede empfohlene `.de`-Domain muss programmatisch live auf Freiheit geprüft werden (keine aktiven DNS-A/NS-Records).

---

## 6. Fazit & Handlungsanweisung für Folgeschritte

Die Spezifikationsanalyse liefert das vollständige, inhaltlich dichte Fundament für das gesamte 4-stufige Naming-Projekt:
1. Der 3-Satz-Draft erfüllt Requirement R1 und das Acceptance Criterion exakt und fehlerfrei.
2. Sämtliche Filter- und Ausschlusskriterien sind präzise formuliert.
3. Die semantischen Felder für Schritt 2 (Nutzen, Handwerk, Moderne Abstraktion, Region) können direkt auf diesem Fundament aufbauen.

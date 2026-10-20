# 📊 ZENTRALE LIVE-DOKUMENTATION: MARKETING-MASTERPLAN & LOGBUCH
**Projekt:** KMU Service Harz (Arbeitstitel / Platzhalter-Variable)  
**Rolle & Architektur:** B2B-Growth-System, Copywriting & No-Code-Vertriebsmaschine für Handwerk & KMU im Harz  
**Letztes Update:** 20.10.2026 (Abschluss Modul 7 + Bereinigung `B2B Vertriebsplan` & `Preistreppe` & Start Modul 8 – Phase A)  
**Aktueller Status:** 🟢 **MODULE 1–7 FERTIG** | 🟡 **MODUL 8 IN ARBEIT (Phase A: Analyse, Blinde Flecken & Entscheidungsfragen)**

---

## 🛡️ 1. EISERNE LEITPLANKEN & SINGLE SOURCE OF TRUTH (SSOT)

Diese Parameter gelten als verbindliches Fundament für alle 9 Marketing-Module:

| Parameter | Verbindlicher Ist-Zustand (Single Source of Truth) |
| :--- | :--- |
| **Marken-Platzhalter** | **`KMU Service Harz`** (wird als saubere Variable im gesamten System genutzt; später in 5 Sekunden per Suchen & Ersetzen austauschbar). |
| **Inhaber & Standort** | **Robin Gornitzka**, Standort **38685 Langelsheim** (Kerngebiet: Landkreis Goslar + Harz-Region: Goslar, Bad Harzburg, Seesen, Clausthal-Zellerfeld, Wernigerode, Halberstadt, Blankenburg, Osterode). |
| **Positionierung** | **„Der Handwerker für digitale Infrastruktur“** / **„Pragmatischer Prozess-Befreier“** – 0 % IT-Fachchinesisch, bestehende Systeme bleiben erhalten, Festpreise statt Stundenzettel. |
| **Zielgruppen-Fokus** | Regionale Handwerksbetriebe (SHK, Elektro, Dach, Bau, Maler, GaLaBau) & lokale Dienstleister (Gebäudereinigung, Hausverwaltung, Pflege) mit **1 bis 20 (max. 50) Mitarbeitenden** ohne eigene IT-Abteilung. |
| **Stufe 1 (Tripwire / Einstieg)** | **Büro-Potenzial-Audit für 500,00 € netto Festpreis** (90 Min. 1:1-Analyse vor Ort/Video + 4-teiliger „Büro-Stress-Test & ROI-Report“ als PDF/Ausdruck). **100 % Anrechnung** bei Beauftragung von Stufe 2. |
| **Stufe 2 (Core Offer / Bestseller)** | **Standard-Setup für 2.000,00 € netto Festpreis** (Schlüsselfertige Belegerfassung WhatsApp/Mail ➔ OCR ➔ Lexoffice ➔ DATEV RDS 1.0 + E-Rechnung EN 16931/ZUGFeRD + GoBD-Verfahrensdoku + 14 Tage Begleitung). Amortisation in ~8 Wochen (~16 Std./Monat Ersparnis). |
| **Stufe 2+ (High-Ticket / Förderpaket)** | **Digitaler Meisterbetrieb ab 6.000,00 € netto** (Umfassende ERP-/Handwerkersoftware-Integration & Multi-Workflows; nutzt staatliche Förderprogramme ab 6.000 € Bagatellgrenze). |
| **Stufe 3 (MRR-Retainer / AaaS)** | **Digitaler Hausmeister für 200,00 € netto / Monat** (24/7-Schnittstellen-Monitoring, Break-Fix bei API-Updates, Token-Refresh, inkl. 1 Std./Monat Anpassungskontingent, harte SLA-Grenzen gegen Scope Creep). |
| **Budget-Restriktion** | **Striktes Bootstrapping:** Max. **350,00 € / Monat** laufende Fixkosten (OpEx), **0,00 € Ads-Budget zum Start** (Reinvestition in Paid Ads erst ab erstem Cashflow). |
| **Proof-Strategie (Ohne Pilotkunden!)** | **STRIKTES VERBOT von „GoClean Harz“ oder erfundenen Kunden-Fallstudien.** Kompensation durch: **(1) Live-Demo-Sandbox („Mustermann Haustechnik Harz“)**, **(2) Visuelle Vorher-Nachher-Prozesskarten**, **(3) Risikofreies 500-€-Audit mit Ergebnis-/Anrechnungsgarantie**. |
| **Sichtbarkeits-Präferenz** | **Faceless / Low-Face Hybrid (95 % Faceless / 5 % Regional-Anker):** Fokus auf Werkbank-POV (Hände am Tisch + Stoppuhr), Live-Screen-Demos (`Mustermann Haustechnik Harz`) und Prozess-Karussells + echte Off-Stimme und 1 statisches Gründer-Foto im Profil/Abbinder. |

---

## 🚨 2. KONFLIKT- & BEREINIGUNGS-REPORT (BESTANDSDATEIEN IM WORKSPACE)

> **WICHTIGER HINWEIS:** Gemäß Leitplanke 1 wurde **keine einzige Bestandsdatei verändert oder gelöscht**. Die folgende Tabelle dokumentiert alle bei der Tiefenanalyse gefundenen Widersprüche und Altlasten zur gemeinsamen Abstimmung.

### Kategorie A: Stillgelegtes Pilotprojekt „GoClean Harz“ & „Bruder Marcel“ (Leitplanke 2)
Obwohl „GoClean Harz“ stillgelegt ist, durchzieht es aktuell noch große Teile der App, der Dokumente und des Master-Logbuchs:
1. **`src/assets/docs/masterLogbuch.js`** (Zeilen 60–67, 168–173): Definiert *„Das Pilotprojekt GoClean Harz (Proof Asset #1)“* noch als aktiven Vertriebshebel und Case Study.
2. **`src/components/DashboardView.jsx`** & **`src/components/OnboardingView.jsx`** (Zeilen 462–515, 570): Prominenter VIP-Pilot-Banner auf dem Haupt-Dashboard und im Onboarding-View (*„GoClean Harz - Pilotprojekt Express-Audit (Marcel)“*).
3. **`src/components/Sidebar.jsx`** (Zeilen 61–75, 243–250, 308–315) & **`src/components/GoCleanToolkit.jsx`**: Eigener grün hervorgehobener Menüpunkt *„🧼 GoClean Harz Suite“* in der Hauptnavigation.
4. **`src/constants/initialData.js`** (Zeilen 38, 50, 91–105, 189, 655–707, 1050): Enthält GoClean Harz in `INITIAL_FOCUS_TASKS`, `INITIAL_TASKS`, `INITIAL_CONTACTS`, `INITIAL_PROJECTS` und `INITIAL_DOCS` *(Hinweis: `INITIAL_CONTENT` & `INITIAL_PROMPTS` wurden in Modul 6 bereits bereinigt!)*.
5. **Standalone-Dateien in `DOCS/` und `public/`**:
   - `DOCS/GOCLEAN_HARZ_WACHSTUMS_STRATEGIE.md`
   - `DOCS/MANUS_GOCLEAN_DEEP_RESEARCH_PROMPTS.md`
   - `DOCS/MANUS_PROMPTS_GOCLEAN_PRAESENTATIONEN.md`
   - `pitch_goclean.html` sowie `public/goclean_pilot_preview.html`, `public/goclean_praesentationen_hub.html`, `public/goclean_wachstumsmappe.html`, `public/pitch_bruder_emotional.html`, `public/pitch_goclean.html` etc.
6. **`src/constants/roadmapData.js`** (Zeilen 64–103): Phase 2 heißt noch *„Pilot-Kunden & Harz-Netzwerk (3 Harzer Pilot-Betriebe akquirieren / Video-Testimonials)“*.

### Kategorie B: Erfundene / Unzulässige Mini-Referenzen in Website & Skripten (Leitplanke 2)
1. **`src/constants/websiteContent.js`** *(bereits in Modul 2 bereinigt)*.
2. **`DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md`** *(in Modul 4 bereinigt)* & **`DOCS/B2B Vertriebsplan KMU Harz.md`** *(in Modul 7 bereinigt)*.

### Kategorie C: Brandgefährlicher Fördermittel-Widerspruch (Abmahnrisiko nach § 5 UWG!)
Während `foerdermittel_leitfaden_kmu_service_harz.md` (Zeile 20 & 56) völlig korrekt warnt, dass der **Digitalbonus Niedersachsen zum 31.12.2025 ausgelaufen ist und rechtlich NICHT mehr beworben werden darf** (und Förderungen in Sachsen-Anhalt erst ab 6.000 € greifen), steht in einer einzigen aktiven Code-Datei noch eine Altlast:
1. **`src/services/pdfReportGenerator.js`** (Zeilen 65, 72): Berechnet im 500-€-PDF-Prüfbericht standardmäßig noch *„Digitalbonus Niedersachsen (NBank 50% Zuschuss)“* bzw. *„Digitalbonus Thüringen (TAB 50% Zuschuss)“* *(wird jetzt in Modul 8 bereinigt!)*.
2. **`DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md`**, **`DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md`**, **`DOCS/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md`**, **`DOCS/B2B Automatisierungs Agentur Preistreppe.md`** & **`DOCS/B2B Vertriebsplan KMU Harz.md`** *(alle in Modul 4, 5 und 7 vollständig bereinigt!)*.

### Kategorie D: Widerspruch beim 500-€-Audit (Kostenpflichtiges Produkt vs. „Gratis-Geschenk“)
1. **`DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md`** & **`DOCS/Mandanten_Flyer_Vorlage_Handwerk.md`** *(in Modul 4 & 5 bereinigt)*.

### Kategorie E: Falsche Gründer-Identität, Standort- & Kontaktdaten-Chaos
1. **Falscher Vorname („Christian Gornitzka“ statt „Robin Gornitzka“):**
   - Alle `DOCS/`-Dateien wurden in Modul 4 & 5 bereinigt.
   - `src/constants/initialData.js` (Zeilen 91, 112, 293, 427, 438, 456, 508 – eingebettete DocsHub-Kopien).

### Kategorie F: Rechtsform-Widerspruch (UG i.G. vs. Einzelunternehmen)
1. **`DOCS/Businessplan_KMU_Service_Harz_2026_Final.md`**, **`src/assets/docs/masterLogbuch.js`** & **`src/constants/websiteContent.js`**: `KMU Service Harz UG (haftungsbeschränkt) i.G.` (ausdrücklich als Haftungs- und Pfändungsschutzwall begründet).
2. **`DOCS/Markennamen_Strategie_Top10.md`** & **`DOCS/Markennamen_Strategie_Schablonenfrei_Top10.md`**: Gehen von einem Einzelunternehmen (*„[Marke] – Inh. Robin Gornitzka“*) aus.

---

## 🌐 3. WEBSITE-TECH-STACK & CONVERSION-STATUS

- **Architektur & Tech-Stack:**
  - Integrierte Vorschau- & Generator-Engine in **React 19 + Vite 8 + Tailwind CSS + Lucide Icons** (`src/components/WebsiteView.jsx`, `src/constants/websiteContent.js`).
  - **In Modul 2 vollständig aufgerüstet:** 100 % lokaler System-Font-Stack (kein externes Google Fonts mehr), Live-Sandbox *„Mustermann Haustechnik Harz“* statt fiktivem Kundenzitat, *Doppelte Sicherheits-Garantie* in Stufe 1, Value-First E-Mail-Gate unter dem Büro-Wochenende-Rechner, Schema.org JSON-LD (`ProfessionalService` + `FAQPage`) und cookieloses `?ref=`-Quellen-Tracking.

---

## 🗺️ 4. FORTSCHRITTS-TRACKER DER 9 MARKETING-MODULE

| Modul | Dateiname im `/marketing_masterplan`-Ordner | Status | Aktuelle Phase |
| :--- | :--- | :--- | :--- |
| **Modul 0** | `00_MARKETING_LOGBUCH_UND_STATUS.md` | 🟢 **AKTIV** | Live-Dokumentation & Single Source of Truth |
| **Modul 1** | `01_Kaufpsychologie_Positionierung_und_Messaging.md` | 🟢 **FERTIG** | **100 % ausgearbeitet & gespeichert (Phase C abgeschlossen)** |
| **Modul 2** | `02_Website_CRO_LeadMagneten_und_Local_SEO.md` | 🟢 **FERTIG** | **100 % ausgearbeitet + Website-Code bereinigt (Phase C abgeschlossen)** |
| **Modul 3** | `03_PreLaunch_Validation_und_Gruender_Bonus_Playbook.md` | 🟢 **FERTIG** | **100 % ausgearbeitet + Discovery-Leitfaden abgeglichen (Phase C abgeschlossen)** |
| **Modul 4** | `04_Outbound_Kaltakquise_und_Lead_Engine.md` | 🟢 **FERTIG** | **100 % ausgearbeitet + 2 DOCS-Vertriebsdateien bereinigt (Phase C abgeschlossen)** |
| **Modul 5** | `05_Multiplikatoren_und_Steuerberater_Infiltration.md` | 🟢 **FERTIG** | **100 % ausgearbeitet + 2 Kanzlei-DOCS bereinigt (Phase C abgeschlossen)** |
| **Modul 6** | `06_Social_Media_und_Faceless_Content_Maschine.md` | 🟢 **FERTIG** | **100 % ausgearbeitet + `initialData.js` Content/Prompts bereinigt (Phase C abgeschlossen)** |
| **Modul 7** | `07_Werbung_Paid_Ads_Offline_Guerilla_und_PR.md` | 🟢 **FERTIG** | **100 % ausgearbeitet + 2 Strategie-DOCS bereinigt (Phase C abgeschlossen)** |
| **Modul 8** | `08_Sales_Assets_Sandbox_und_Rechtliche_Fallstricke.md` | 🟡 **IN ARBEIT** | **Phase A (Analyse, Blinde Flecken & Entscheidungsfragen)** |
| **Modul 9** | `09_90_Tage_Roadmap_KPI_Dashboard_und_Risiko_Management.md` | ⚪ Wartend | Startet nach Freigabe von Modul 8 |

---

## 📝 5. CHRONOLOGISCHES ENTSCHEIDUNGS-LOGBUCH

### [19.10.2026] Initialisierung & Vollständiger Workspace-Scan
- Sämtliche Strategie-, Businessplan-, Persona-, Wettbewerbs-, Fördermittel- und Website-Dateien analysiert.
- 6 kritische Konflikt-Kategorien in den Bestandsdateien identifiziert (GoClean-Altlasten, fiktive Referenzen, ausgelaufener Digitalbonus Niedersachsen, Gratis-Audit-Widerspruch, Namens-/Adress-Inkonsistenz „Christian/Bad Harzburg/Goslar“, Rechtsform UG vs. Einzelunternehmen).

### [19.10.2026] Strategische Entscheidungen zu Workflow & Modul 1 (`01_Kaufpsychologie_Positionierung_und_Messaging.md`)
1. **Workflow & Bereinigungs-Modus:** Wir arbeiten alle 9 Module iterativ Schritt für Schritt im **1:1 Co-Pilot-Modus** durch. Bestandsdateien werden nicht pauschal vorab angefasst, sondern gezielt bereinigt, wenn das jeweilige Modul (z. B. Modul 2 für Website, Modul 4/5 für Skripte & Briefe) an der Reihe ist.
2. **Positionierungs-Speerspitze (Hybrid-Spitze V2):** Nach außen gehen wir mit der spitzen Speerspitze **„Schluss mit dem Büro-Wochenende: Lautlose Belegerfassung, E-Rechnung & DATEV-Übergabe“** rein (höchste Dringlichkeit & Steuerberater-Hebel) und nutzen **„Telefon-Ruhe / Kundenkommunikation“ (Modul A)** sowie **„Baustellen- & Fotodokumentation“ (Modul B)** als sofortige Diagnose-Weiche im Gespräch, falls die Rechnungsstellung beim Betrieb bereits rund läuft.
3. **Proof-of-Competence & Risiko-Umkehr beim 500-€-Audit:** Keine Gratis-Audits! Stattdessen gilt die **„Doppelte Sicherheits-Garantie“**:
   - **(1) 100 % Anrechnung** der 500 € auf das 2.000-€-Standard-Setup bei Beauftragung innerhalb von 30 Tagen.
   - **(2) 10-Stunden-Ergebnis-Garantie:** Finden wir im 90-Minuten-Audit nicht mindestens 10 Stunden/Monat Einsparpotenzial schwarz auf weiß, kostet das Audit **0,00 €**.
4. **Verbindlicher Leitbegriff in der Wording-Bible:** **„Büro-Wochenende“** (statt nur „Büro-Sonntag“) ist der zentrale Schmerz- und Nutzen-Begriff über alle Kanäle hinweg, da Handwerker und ihre Partnerinnen oft sowohl samstags als auch sonntags am Schreibtisch sitzen (ergänzt um „Feierabend-Büro“).
- **Status Modul 1:** Datei `01_Kaufpsychologie_Positionierung_und_Messaging.md` vollständig ausgearbeitet.

### [19.10.2026] Strategische Entscheidungen & Code-Bereinigung in Modul 2 (`02_Website_CRO_LeadMagneten_und_Local_SEO.md`)
1. **Direkte Website-Code-Bereinigung durchgeführt (`websiteContent.js`, `WebsiteView.jsx`, `public/website-export/index.html`):**
   - **DSGVO-Fix:** Externe Google-Fonts-Aufrufe (`fonts.googleapis.com`) im HTML-Generator und im statischen Export entfernt (100 % lokaler System-Font-Stack).
   - **Keine Fake-Referenzen:** Fiktives Kundenzitat ersetzt durch unsere transparente Live-Vorführ-Umgebung **„Mustermann Haustechnik Harz“**.
   - **Doppelte Sicherheits-Garantie:** In Stufe 1 (500-€-Audit) über alle Website-Versionen hinweg fest verankert.
   - **Tippfehler & Standort:** „IHRE GESCHÄTZTE ENTLASSUNG“ in „ENTLASTUNG“ korrigiert; Standort überall auf `38685 Langelsheim (Landkreis Goslar & Harz)` vereinheitlicht.
2. **Value-First 2-Stufen E-Mail-Gate für den Lead-Magneten:**
   - **Stufe 1:** Der *Büro-Wochenende- & Zeitersparnis-Rechner* zeigt das Ergebnis sofort ohne Schranke an (Vertrauensaufbau).
   - **Stufe 2:** Direkt darunter fordert der Besucher gegen Eingabe seiner E-Mail-Adresse den **PDF-Report „Der 5-Minuten Büro-Stress-Test & E-Rechnungs-Check für Harzer Betriebe“** inkl. seiner persönlichen Rechner-Auswertung an.
3. **Local SEO, Schema.org JSON-LD & Cookieless Tracking:**
   - Komplettes Schema.org JSON-LD (`ProfessionalService` + `FAQPage`) für lokale KI-Suche (GEO) integriert.
   - Cookielose `?ref=`-Quellen-Erkennung (`lead_source`) ohne Cookie-Banner in die Formulare eingebaut.
- **Status Modul 2:** Datei `02_Website_CRO_LeadMagneten_und_Local_SEO.md` vollständig erstellt und Code-Änderungen durchgeführt.

### [19.10.2026] Strategische Entscheidungen & Ausarbeitung zu Modul 3 (`03_PreLaunch_Validation_und_Gruender_Bonus_Playbook.md`)
1. **Gründer- & Regional-Bonus voll ausspielen:** Ehrliches Auftreten vor/während der Gewerbeanmeldung (*„Ich baue das hier in Langelsheim auf und hole mir vorab den Rat von 50 Harzer Meistern – 0 % Verkauf“*), um jede Verkaufs-Abwehr sofort auszuschalten.
2. **Alle 3 Outreach-Kanäle ausgearbeitet:**
   - **Kanal 1 (Telefon):** Zweigeteiltes Skript – (1A) Verbündeten-Skript für die mitarbeitende Ehefrau/Bürokraft und (1B) Direkt-Skript für den Meister.
   - **Kanal 2 (Schriftlich):** 1-Seiter „Gründer-Ratgeber-Brief“ mit Post-It-Effekt + WhatsApp-/E-Mail-Vorlage.
   - **Kanal 3 (Vor Ort):** Freitagmittag-Walk-In mit Klemmbrett im Gewerbegebiet (z. B. Goslar-Baßgeige, Langelsheim, Seesen).
3. **Waitlist-to-Audit-Brücke über das „Praxis-Partner-Vorzugsticket“:** Kein Preis-Dumping beim Audit, sondern Vergabe von 10 unverbindlichen Vorzugs-Tickets (inkl. Nachbau des individuellen Engpasses in der Musterfirma *„Mustermann Haustechnik Harz“* + Vorrang auf die Doppelte Sicherheits-Garantie beim offiziellen Start).
4. **Bestandsdatei-Abgleich:** `customer_discovery_validierungs_leitfaden.md` direkt mit dem Bürokraft-Türöffner, „Büro-Wochenende“, Doppelter Sicherheits-Garantie und Vorzugsticket aktualisiert.
- **Status Modul 3:** Datei `03_PreLaunch_Validation_und_Gruender_Bonus_Playbook.md` vollständig erstellt.

### [20.10.2026] Strategische Entscheidungen & Bereinigung in Modul 4 (`04_Outbound_Kaltakquise_und_Lead_Engine.md`)
1. **11-Spalten-Lead-Pipeline mit 4 digitalen Schwachstellen-Signalen (`S1–S4`) und Bundesland-Weiche (`NI` vs. `ST`):** Klare Trennung zwischen Niedersachsen (Fokus: 8-Wochen-Amortisation ohne Behörden-Wartezeit) und Sachsen-Anhalt (Zusatzhebel *Digital Innovation* bis 50 % ab 6.000 €).
2. **2-Blatt Physisches Direkt-Mailing („Der Handwerker-Brief“):**
   - **Blatt 1:** Bodenständiges 1-Seiter-Anschreiben von Robin Gornitzka (38685 Langelsheim) mit Fokus auf das *Büro-Wochenende* und die *Doppelte Sicherheits-Garantie* beim 500-€-Audit.
   - **Blatt 2 (Beiblatt/Rückseite):** Visuelles *„Vorher-Nachher-Prozess-Röntgenbild (8-Sekunden-Belegweg)“* inkl. 30-Sekunden-Kugelschreiber-Schnellcheck für den Küchentisch / die Bürokraft.
3. **3-Stufen-Rhythmus-Kette:** Tag 1 Brief (25 Stück/Woche) ➔ Tag 3/4 Anruf (Verbündeten-Opener Bürokraft + 45-Sek.-Meister-Pitch) ➔ Tag 7 Follow-up-Mail/WhatsApp mit Link zum Büro-Wochenende-Rechner.
4. **Direkte Bereinigung der Bestandsdateien (`DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md` & `DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md`):** „Christian Gornitzka / Marktstraße 12 Goslar“, den ausgelaufenen Digitalbonus Niedersachsen, das Gratis-Verschenken des Audits und die erfundene Osterode-Referenz komplett entfernt und durch unsere echten Daten ersetzt.
- **Status Modul 4:** Datei `04_Outbound_Kaltakquise_und_Lead_Engine.md` vollständig erstellt und Bestandsdateien bereinigt.

### [20.10.2026] Strategische Entscheidungen & Bereinigung in Modul 5 (`05_Multiplikatoren_und_Steuerberater_Infiltration.md`)
1. **Berufsrechtskonformes Win-Win-Modell (§ 57 StBerG) & „Fibu-Leiterin“-Infiltration:** Keine unzulässigen Provisionen an Steuerberater; Fokus auf 3–5 gerettete Fibu-Stunden pro „Schuhkarton-Mandant“ vor dem 10. des Monats und 100 % Buchungshoheit durch **DATEV Rechnungsdatenservice 1.0 (RDS 1.0)** statt BDS.
2. **Kanzlei-Mandanten-Privileg statt Gratis-500-€-Audit:** Empfohlene Kanzlei-Mandanten erhalten (1) einen kostenfreien **20-Minuten DATEV- & E-Rechnungs-Kurzcheck** vorab + (2) beim regulären **500-€-Vor-Ort-Audit** (mit Doppelter Sicherheits-Garantie) die maßgeschneiderte **GoBD-Verfahrensdokumentation „Ersetzendes Scannen“ (regulärer Einzelwert: 250 € netto) kostenlos inklusive** (`KANZLEI-HARZ-GOBD`).
3. **Alle 3 regionalen Multiplikatoren-Kanäle ausgearbeitet:**
   - **Kanal 1:** Steuerberatungskanzleien & Buchhaltungsbüros (Türöffner-Brief „3 Sorgenkinder“, Fibu-Leiterin-Telefonskript, 7-Folien-Deck, DIN-A4 Mandanten-Flyer, 5-Zeilen-BWA-Begleittext).
   - **Kanal 2:** Kreishandwerkerschaften (Südostniedersachsen / Harz-Bode) & Innungen (20-Minuten-Impulsvortrag + Tisch-Rückmeldebogen für 5–8 Sofort-Termine am Innungsabend).
   - **Kanal 3:** Fachgroßhandel-Tresen (SHK/Elektro/Baustoffe) & regionale Firmenkundenberater (Sparkasse / Volksbank).
4. **Direkte Bereinigung der Kanzlei-Bestandsdateien (`DOCS/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md` & `DOCS/Mandanten_Flyer_Vorlage_Handwerk.md`):** Falsche Identität („Christian Gornitzka / Marktstraße 12 Goslar“), ausgelaufenen Digitalbonus Niedersachsen und den kostenlosen 500-€-Gutschein entfernt und auf den Stand von Modul 5 gebracht.
- **Status Modul 5:** Datei `05_Multiplikatoren_und_Steuerberater_Infiltration.md` vollständig erstellt und Kanzlei-Dateien bereinigt.

### [20.10.2026] Strategische Entscheidungen & Bereinigung in Modul 6 (`06_Social_Media_und_Faceless_Content_Maschine.md`)
1. **95 % Faceless / 5 % Regional-Anker (Leitplanke 4):** Keine Selfie-/Sprecher-Videos vor der Kamera! Stattdessen „Werkbank-POV“ (Hände am Tisch + echte Quittung + Smartphone-Stoppuhr), Live-Screen-Demos aus der Sandbox *„Mustermann Haustechnik Harz“* und 4-Folien-Karussells + eigene ruhige Off-Stimme und 1 statisches Gründer-Foto im Profil/Abbinder (*„Robin Gornitzka | KMU Service Harz – 38685 Langelsheim“*).
2. **Die „1-zu-4 Recycling-Maschine“ (Max. 90 Min. Aufwand/Woche):** 1 Kernthema pro Woche wird freitags ausgespielt auf (1) Facebook & lokale Harz-Gruppen (Trojanischer Mehrwert ohne plumpe Werbung), (2) Instagram/Facebook Reels, (3) LinkedIn (Scharfschützen-Kanal für Steuerberater, Fibu-Leiterinnen & Bankberater) und (4) WhatsApp-Status (zur Konvertierung bestehender Telefon-/Akquise-Kontakte).
3. **16 komplett ausformulierte Skripte & Posts für 4 Wochen + DM-Leitfaden:** Alle 4 Wochen-Zyklen (8-Sekunden-Belegweg, E-Rechnungs-Falle, Anti-Systemhaus/Gesellen-Einfachheit, GoBD-Ersetzendes-Scannen) komplett ausgeschrieben.
4. **Code-Bereinigung in `src/constants/initialData.js`:** In `INITIAL_CONTENT` die GoClean-Case-Study durch die *„Mustermann Haustechnik Harz“-Sandbox-Demo* ersetzt und in `INITIAL_PROMPTS` den abgelaufenen Digitalbonus Niedersachsen durch die *8-Wochen-Amortisation & Doppelte Sicherheits-Garantie* ersetzt.
- **Status Modul 6:** Datei `06_Social_Media_und_Faceless_Content_Maschine.md` vollständig erstellt und `initialData.js` bereinigt.

### [20.10.2026] Strategische Entscheidungen & Bereinigung in Modul 7 (`07_Werbung_Paid_Ads_Offline_Guerilla_und_PR.md`)
1. **Stufe 1 (0-€-Offline-Guerilla & PR im Harz):**
   - **Guerilla-Waffe #1:** Die A6-„Bulli-Spickzettel- & Quittungs-Karte“ (Vorderseite: § 33 UStDV Finanzamt-Quittungs-Check fürs Handschuhfach + Büroklammer; Rückseite: 8-Sekunden-Belegweg + QR-Code `?ref=bulli_karte`) für Großhandels-Tresen, Handwerker-Bäckereien und TÜV/DEKRA-Wartezonen.
   - **Guerilla-Waffe #2:** Der „Gewerbegebiet-Hof- & Briefkasten-Spaziergang“ mit handbeschriftetem Nachbarschafts-Umschlag und gelbem Post-It (0 € Porto, 100 % Öffnungsrate).
   - **Guerilla-Waffe #3:** Druckfertige Pressemitteilung + Redaktions-Anschreiben für *Goslarsche Zeitung*, *Harzer Volksstimme* und Kammer-Magazine.
2. **Stufe 2 (Paid Ads ab erstem Cashflow – 150 bis 300 €/Monat):**
   - **5 Faceless Ad-Creatives:** Insbesondere Creative #1 („Gelber Post-It auf Holztisch“), Creative #2 („Split-Screen Sonntagabend“) und Creative #3 („20-Sek.-Stoppuhr-Beweisvideo“).
   - **3-Stufen-Kampagnen-Architektur:** (A) 3 €/Tag Omnipräsenz-Retargeting (90 €/Monat), (B) 5 €/Tag Hyper-Local Cold Ads im 22-km-Radius um Langelsheim/Goslar (`NI`) und Wernigerode/Halberstadt (`ST`), (C) Google High-Intent Search Ads inkl. **45er Negativ-Keyword-Sperrliste** gegen Privatkunden-Klicks.
3. **Direkte Bereinigung von `DOCS/B2B Vertriebsplan KMU Harz.md` & `DOCS/B2B Automatisierungs Agentur Preistreppe.md`:** Ausgelaufenen Digitalbonus Niedersachsen, Gratis-Pilot-Audits und fiktive 3-Mann-Fallstudie durch unsere echte Förder-Weiche (`NI` vs. `ST`), Doppelte Sicherheits-Garantie und *„Mustermann Haustechnik Harz“* ersetzt.
- **Status Modul 7:** Datei `07_Werbung_Paid_Ads_Offline_Guerilla_und_PR.md` vollständig erstellt und Strategie-Dateien bereinigt.

### [20.10.2026] Strategische Entscheidungen & Code-Bereinigung in Modul 8 (`08_Sales_Assets_Sandbox_und_Rechtliche_Fallstricke.md`)
1. **Der Live-Vorführwagen („Mustermann Haustechnik Harz“):**
   - Vollständige technische Nachbau-Anleitung für die lokale Sandbox (Lexware Office Test-Account, Make.com 4-Module-Szenario in der EU-Zone, Vorführ-E-Mail & WhatsApp-Bridge) und E-Rechnungs-Validator im Founder OS.
   - 3-Minuten-Vorführ-Choreografie am Küchentisch/Werkstatttisch (Sekunde 0 bis 180: Echter Baumarkt-Bon auf den Tisch -> 8-Sekunden-Foto -> Auto-Benennung & Baustellen-Zuordnung am Laptop -> Live EN 16931 E-Rechnungs-Validierung).
2. **Druckfertige physische Verkaufsunterlagen:**
   - **Tisch-One-Pager (DIN A4 beidseitig):** Vorher/Nachher-Röntgenbild, Himmel-Hölle-Kontrast im Handwerksalltag, 5 Handwerker-Garantien und 3-Stufen-Festpreis-Treppe.
   - **500-€-Audit-Ergebnisblatt (DIN A4 2-Seiter):** Exaktes Übergabeprotokoll nach dem 90-Minuten-Audit mit gemessenen Zeitfressern, Schattenkosten-Berechnung, 8-Wochen-Amortisations-Beweis (1.500 € Restinvestition ÷ ~900 €/Monat Ersparnis = ~7 Wochen) und Signaturblock für Stufe 2.
3. **Das Altgesellen-Anti-Sabotage-Paket:**
   - Vertragliche „Gesellen-Garantie“ (Null-Schulungs-Versprechen).
   - Wortwörtliches 5-Minuten-Hof-Einweisungs-Skript für den Freitagmorgen um 07:00 Uhr auf dem Betriebshof.
   - Druckvorlage für den laminierten DIN-A5-Bulli-Spickzettel für das Handschuhfach.
4. **Rechtliche Leitplanken, Fördermittel-Trennung & Compliance:**
   - **§ 7 UWG B2B-Kaltakquise-Ampel:** Physischer Brief & Gewerbegebiet-Walk-in 100 % zulässig; Telefon bei mutmaßlicher Einwilligung mit Opt-Out-Sperrliste; kalte E-Mails/WhatsApp strikt verboten.
   - **Schutz vor vorzeitigem Maßnahmenbeginn:** 500-€-Audit als eigenständige Vorab-Ist-Analyse sofort abrechenbar; 2.000-€-Standard-Setup in NI startet ohne Förderbürokratie an Tag 1; für geförderte Großprojekte ab 6.000 € in ST (Digital Innovation) wurde die Vertragsklausel zur aufschiebenden Bedingung (§ 158 Abs. 1 BGB) integriert.
   - **SLA-Grenzen & Haftungsschutz:** 1h/Monat Kontingent im 200-€-Retainer, klarer Ausschluss von Systemhaus-Aufgaben (PC/Drucker), § 6 StBerG-Hinweis (keine Steuerberatung, Buchungshoheit bleibt bei Kanzlei), DSGVO Art. 28 AVV und § 203 StGB Berufsgeheimnis.
5. **„Eat Your Own Dog Food“ Tech-Stack:** Nachweis der eigenen Betriebs- & Marketing-Infrastruktur mit unter 55 €/Monat Fixkosten (weit unter dem Bootstrapping-Deckel von 350 €/Monat).
6. **Code- und Test-Bereinigung (`pdfReportGenerator.js` & `initialData.js`):**
   - Veraltete Förderstrings (*Digitalbonus Niedersachsen/Thüringen/go-digital*) im PDF-Audit-Generator der App durch rechtssichere NI/ST/INQA-Optionen ersetzt.
   - Kontaktdaten im PDF auf `Inh. Robin Gornitzka • 38685 Langelsheim • kontakt@kmu-service-harz.de` aktualisiert und Doppelte Sicherheits-Garantie verankert.
   - Altlasten in `initialData.js` (`INITIAL_DOCS`, `INITIAL_INBOX`, `INITIAL_CONTACTS`, `INITIAL_LEADS`) bereinigt und zugehörige Testsuiten synchronisiert.
- **Status Modul 8:** Datei `08_Sales_Assets_Sandbox_und_Rechtliche_Fallstricke.md` vollständig erstellt und Code/Tests bereinigt. Weiter mit Phase A für **Modul 9**.

# Survey & Technical Specification: Requirement 2 & Requirement 3
**KMU Service Harz — B2B Sales & Delivery Suite**
**Author:** survey_explorer_3 (Teamwork Explorer)
**Date:** 2026-08-24

---

## 1. Executive Summary & Problem Scope

Im Rahmen der Erweiterung von **KMU Service Harz** zu einer vollständigen B2B-Vertriebs- und Auslieferungs-Suite wurden zwei zentrale Kern-Säulen des Businessplans untersucht und technisch spezifiziert:
1. **Requirement 2 (R2):** Der automatisierte **500 € „Büro-Stress-Test & ROI-Report“ PDF-Generator** mit den 4 obligatorischen Prüfbericht-Elementen.
2. **Requirement 3 (R3):** Das interaktive **Mandanten-Portal & AaaS-Wartungs-Dashboard** mit Live-Schnittstellen-Monitoring, Echtzeit-Metriken (gerettete Sonntage, Monatsbelege, Zeiteinsparung) und 1-Klick Support-Ticket-System mit 200 €/Monat Retainer-Kontingentverwaltung.

### Zentrale Erkenntnisse der Bestandsaufnahme:
- **`jspdf` (^4.2.1)** ist bereits im Projekt installiert und lauffähig. Keine externen/ungefragten npm-Pakete erforderlich.
- Erste Basisfunktionen existieren in `OnboardingView.jsx`, `SopManager.jsx` und `App.jsx`, sind jedoch teilweise fragmentiert, statisch oder decken die formalen 4 Pflichtelemente des Businessplans noch nicht mit der geforderten Tiefe und visuellen Exzellenz ab.
- Das Mandantenportal (`clientPortalMode`) ist bisher als Inline-JSX direkt in `App.jsx` eingebettet und bietet ein enormes Potenzial für eine saubere, modularisierte Architektur (`src/components/ClientPortalView.jsx`).

---

## 2. Bestandsanalyse (Codebase Inspection)

### 2.1 Vorhandene Onboarding- & Sales-Workflows
- **`src/constants/initialData.js` (`ONBOARDING_PLAYBOOKS`):**
  - Enthält bereits die 4 Stufen der Value Ladder: `audit500` (Stufe 1: 500 € Büro-Potenzial-Audit), `standardSetup2000` (Stufe 2: 2.000 € Standard-Setup), `meisterbetrieb6000` (Stufe 2+: 6.000 € Digitaler Meisterbetrieb) und `retainer200` (Stufe 3: 200 € / Monat AaaS Retainer).
  - Fragen und Notizen werden strukturiert per JSON-Match (`<!--ONBOARDING_DATA:...-->`) in Lead-/Kunden-Notizen serialisiert und synchronisiert.
- **`src/components/OnboardingView.jsx`:**
  - Bietet Fragebogen-Navigation, Priorisierung (🔴 Hoch, 🟡 Mittel, 🟢 Niedrig), Live-Potenzialrechner und Spracherkennung via Web Speech API.
  - Hat eine grundlegende `handleGenerateOnboardingPDF`-Funktion mit `jspdf`.
- **`src/components/SopManager.jsx` & `App.jsx` (`generatePDFReport`):**
  - Enthält den interaktiven Showcase ROI-Rechner (Aufgabe, Stunden/Woche, Stundenlohn, Festpreis, Fördermittel-Region NDS/LSA/BUND).
  - Rendert ein 1-Seiten-PDF (`ROI_Analyse_*.pdf`), das die 4 Pflichtelemente jedoch nur stark verkürzt anreißt.
- **`src/constants/makeBlueprintsData.js`:**
  - Definiert 4 vollständige Make.com Blueprints, inklusive `bp4` (*AaaS 24/7 Schnittstellen-Monitoring & Break-Fix* mit 15-Minuten Cron Health-Check).

---

## 3. Spezifikation R2: 500 € Büro-Stress-Test & ROI-Report PDF-Generator

### 3.1 Vertriebs- und Verkaufspsychologischer Hintergrund (nach Businessplan)
Das 500 € Audit dient als bezahlter **Front-End Tripwire**:
- **Portokassen-Psychologie:** Unter 500 € bedarf es keiner Bank- oder Gesellschafterfreigaben beim Handwerksmeister.
- **Filterfunktion:** Hält "Gratis-Abgreifer" fern; wer 500 € zahlt, hat echten Leidensdruck.
- **Fördermittel-Umgehung:** Das Audit ist ein eigenständiges, nicht gefördertes Diagnose-Produkt. Dadurch greift das *Verbot des vorzeitigen Maßnahmenbeginns* nicht. Die Ergebnisse fließen als perfektes Pflichtkonzept in den späteren Förderantrag für Stufe 2 ein.
- **100% Anrechnung:** Die 500 € Gebühr wird bei Folgebeauftragung voll auf das Setup (2.000 € / 6.000 €) angerechnet. Finanzielles Kundenrisiko = 0 €.

### 3.2 Die 4 obligatorischen Elemente des Prüfberichts

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       KMU SERVICE HARZ — PRÜFBERICHT                        │
│                   500 € BÜRO-STRESS-TEST & POTENZIAL-AUDIT                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. PROZESS-RÖNTGENBILD (STATUS QUO)                                         │
│    [Baustelle / Bulli] ➔ [Zettel unleserlich] ➔ [Sonntag: Excel-Abtippen]   │
│    ➔ [Word-Rechnung kopieren] ➔ [Drucken/Post] ➔ [Pendelordner/Kanzlei]     │
│    • Identifizierte Engpässe: 3 Medienbrüche, 12h/Woche Admin-Verlust      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. DIE SCHATTENKOSTEN-KALKULATION (IN SIGNALFARBE ROT)                      │
│    • Meisterstundensatz: 65 €/h  |  Wöchentlicher Zeitfresser: 8 Stunden    │
│    • Monatlicher Verlust: 2.080 €  |  Jährlicher Verlust: 24.960 €          │
│    • 🔴 "Ihr Betrieb verbrennt jährlich ~ 25.000 € an unbezahlten Sonntagen"│
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. SCHLÜSSELFERTIGE SOLL-ROADMAP (MAKE / LEXOFFICE / DATEV)                 │
│    • Meilenstein 1 (Tag 1–3): WhatsApp-Belegeingang & Mail-Parser           │
│    • Meilenstein 2 (Tag 4–7): Make.com Middleware & GPT-4o Vision OCR       │
│    • Meilenstein 3 (Tag 8–11): Lexoffice Vorkontierung & DATEV Belegservice │
│    • Meilenstein 4 (Tag 12–14): GoBD-Verfahrensdokumentation & Team-Start   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. FÖRDERMITTEL-INDIKATION & AMORTISATION (DER FÖRDER-TURBO)               │
│    • Setup-Investition (Festpreis):                       2.000,00 €        │
│    • Förderzuschuss (Digitalbonus NDS / LSA 50%):       - 1.000,00 €        │
│    • 100% Audit-Gutschrift (500 € Büro-Stress-Test):     -   500,00 €        │
│    • Effektive Netto-Restinvestition:                       500,00 €        │
│    • 🟢 AMORTISATIONSZEIT: ca. 0,25 Monate (< 8 Tage!)                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Mathematische Formeln:
1. **Verlorene Jahresstunden ($T_{year}$):**
   $$T_{year} = \text{Stunden pro Woche} \times 52$$
2. **Jährliche Schattenkosten ($C_{year}$):**
   $$C_{year} = T_{year} \times \text{Kalkulatorischer Stundensatz (€/h)}$$
3. **Monatliche Schattenkosten ($C_{month}$):**
   $$C_{month} = \frac{C_{year}}{12}$$
4. **Erwartete Zeiteinsparung ($S_{hours}$):**
   $$S_{hours} = T_{year} \times 0.90 \quad (\text{90\% Automatisierungsquote})$$
5. **Erwartete Kosteneinsparung ($S_{eur}$):**
   $$S_{eur} = C_{year} \times 0.90$$
6. **Effektive Netto-Investition ($I_{eff}$):**
   $$I_{eff} = I_{gross} - (\text{Förderquote} \times I_{gross}) - \text{Audit-Gutschrift (500 €)}$$
7. **Amortisationsdauer ($P_{months}$):**
   $$P_{months} = \frac{\max(I_{eff}, 0)}{\frac{S_{eur}}{12}}$$

### 3.3 Fördermittel-Matrix für den Harz
- **Digitalbonus Niedersachsen (NBank):** 35% bis 50% Zuschuss (bis zu 50.000 €).
- **Sachsen-Anhalt DIGITAL INNOVATION (IB LSA):** Bis zu 50% Zuschuss (min. 3.000 €, max. 70.000 €).
- **BAFA Förderung Unternehmensberatung:** 50% (alte BL) bzw. 80% (neue BL) auf Beratungskosten.
- **go-digital (Bund):** 50% Zuschuss für autorisierte IT-Beratung und Umsetzungen.

### 3.4 PDF-Engine & Layout-Architektur
- **Verwendete Bibliothek:** `jspdf` (Client-seitig, 0ms Server-Latency, offline-fähig in PWA/Capacitor).
- **Styling & CI-Vorgaben:**
  - Header: Primärfarbe `#8b5cf6` (KMU Service Harz Lila) mit Subheadline & Kontaktdaten.
  - Sektion 1: Visuelle Boxen mit Pfeilen `[Baustelle] ➔ [Büro] ➔ [Steuerberater]` in hellgrauem Rahmen.
  - Sektion 2: Warnbox mit rotem Akzent `#ef4444` (`rgba(239, 68, 68, 0.08)`), fette rote Hervorhebung der Jahresverluste.
  - Sektion 3: 4-Phasen Timeline mit Check-Icons und klaren Meilensteinen.
  - Sektion 4: Smaragdgrüne Erfolgsbox `#10b981` mit Aufschlüsselung der Netto-Investition und Amortisation in Wochen.
  - Footer: GoBD- & Fördermittel-Hinweise, Gültigkeit, Signaturfelder für Auftragserteilung.

---

## 4. Spezifikation R3: Mandanten-Portal & AaaS-Wartungs-Dashboard

### 4.1 Ziel & Architektur
Das Mandantenportal verwandelt die KMU Service Harz Web-App in ein transparentes Kunden-Cockpit. Der Handwerker sieht auf einen Blick, dass seine Systeme rund um die Uhr stabil laufen, wie viele Stunden und Euro er spart und kann Support anfordern.

### 4.2 Funktionsbereiche des Mandanten-Portals

#### 1. Live Schnittstellen- & Workflow-Monitoring (Ampelsystem & Simulation)
- **Make.com Core Engine:** 🟢 Live / Aktiv (Latenz: 94ms, Letzter Durchlauf: vor 4 Min.)
- **Lexware Office API:** 🟢 Verbunden (Vorkontierungs-Webhook aktiv, OAuth valid)
- **DATEV Datenservices:** 🟢 Verbunden (Belegbilderservice aktiv, Kanzlei-ID synchron)
- **KI-OCR Beleg-Parser:** 🟢 99.4% Erkennungsrate (GPT-4o Vision Pipeline)
- **GoBD Cloud-Archiv:** 🟢 Revisionssicher synchron (Drive/Supabase)
- **1-Klick Schnittstellen-Test:** Button *„Schnittstellen-Diagnose ausführen“*, der Blueprint 4 simuliert und ein Live-Prüfprotokoll rendert.

#### 2. Live-Metriken & Ersparnis-Tracker (KPI Grid)
- **Verarbeitete Monatsbelege:** z. B. `164 Belege` (OCR-Erfolgsquote: `99.4%`, Auto-Vorkontierung: `161/164`).
- **Gerettete Büro-Sonntage:** z. B. `4 / 4 Sonntage` im Monat freigehalten (berechnet aus vermiedenen Wochenend-Stunden).
- **Kumulierte Zeiteinsparung:** z. B. `41,5 Stunden` im laufenden Monat (~ `498 Stunden` hochgerechnet aufs Jahr).
- **Kalkulatorische Ersparnis:** z. B. `3.527,50 € / Monat` (basierend auf individuellem Meisterstundensatz).
- **Papier- & Aktenordner-Ersparnis:** `~1.380 Blatt Papier` / `3 Pendelordner` vermieden.

#### 3. 1-Klick Support-Ticket-System & 200 € Retainer-Kontingent
- **AaaS-Vertrags-Status:** 🛡️ *„Digitaler Hausmeister (200 € / Monat Retainer) — AKTIV“*.
- **Monatliches Support-Kontingent:**
  - 60 Minuten Inklusiv-Zeit pro Monat für Minor Tweaks (z.B. neuen Mitarbeiter für WhatsApp-Gateway freischalten, E-Mail-Empfänger anpassen, Filter anpassen).
  - Visueller Kontingent-Balken: z. B. `35 / 60 Min. verbraucht` (25 Min. Restguthaben).
  - Scope-Schutz & SLA: Klare Kennzeichnung inkludierter vs. abrechnungspflichtiger Leistungen (95 €/h im 15-Min-Takt).
- **Ticket-Formular:**
  - Schnell-Kategorien: `[⚡ Schnittstellen-Störung]`, `[👤 Neuer Mitarbeiter / Handy]`, `[📧 Mail-Adresse geändert]`, `[📊 Beleg-Rückfrage]`, `[✨ Feature-Wunsch]`.
  - Dringlichkeits-Ampel: Hoch (SLA: < 24h Werktags), Mittel (SLA: 48h), Niedrig (Wunsch).
- **Ticket-Historie:** Übersicht vergangener Tickets mit Datum, Status (Offen, In Bearbeitung, Gelöst), Antwortnotiz und verbuchter Kontingent-Zeit.

---

## 5. Implementierungs-Architektur & Modul-Struktur

### 5.1 Vorgeschlagene Datei-Struktur
```
src/
├── components/
│   ├── ClientPortalView.jsx            <-- NEU: Eigenständiges Mandanten-Portal & AaaS Dashboard
│   ├── OnboardingView.jsx              <-- ERWEITERT: Direkter Export des 4-teiligen 500€ Prüfberichts
│   ├── SopManager.jsx                  <-- ERWEITERT: Integrierter 4-teiliger Report-Generator
│   └── ...
├── services/
│   ├── pdfReportGenerator.js           <-- NEU: Zentraler, hochqualitativer jsPDF-Report Service
│   └── ...
└── test/
    └── features/
        ├── clientPortal.test.jsx       <-- NEU: Tests für Mandanten-Portal, Metriken & Tickets
        └── pdfReport.test.jsx          <-- NEU: Tests für 4-teiligen Prüfbericht & Rechner-Formeln
```

### 5.2 Datenmodelle (TypeScript / JSDoc Referenz)

```javascript
/**
 * @typedef {Object} AuditReportData
 * @property {string} company
 * @property {string} contactPerson
 * @property {string} industry
 * @property {number} weeklyHours
 * @property {number} hourlyRate
 * @property {number} setupFee
 * @property {string} subsidyRegion - 'NDS' | 'LSA' | 'TH' | 'BUND' | 'NONE'
 * @property {Array<{ question: string, answer: string, priority: string }>} painPoints
 */

/**
 * @typedef {Object} ClientPortalState
 * @property {string} company
 * @property {string} contactName
 * @property {string} datevId
 * @property {number} monthlyReceiptsCount
 * @property {number} savedSundaysCount
 * @property {number} savedHoursMonth
 * @property {number} retainerTotalMinutes - 60 default
 * @property {number} retainerUsedMinutes
 * @property {Array<SupportTicket>} tickets
 * @property {Array<InterfaceStatus>} interfaces
 */
```

---

## 6. Verifikations- und Teststrategie

1. **Unit-Tests (`vitest`):**
   - Mathematische Korrektheit aller Schattenkosten-, Förderzuschuss-, Netto-Investitions- und Amortisationsberechnungen.
   - Retainer-Kontingent-Berechnung (Verbrauch vs. Restminuten, Statusübergänge).
   - Ticket-Erstellung und Filterung nach Mandant und Status.
2. **Komponenten-Tests (`@testing-library/react`):**
   - Umschalten zwischen Admin-Ansicht und Mandantenportal (`clientPortalMode`).
   - Triggerung des 500 € PDF-Generators sowohl aus dem Onboarding als auch aus dem Sales-Bereich.
   - Simulation des Make.com Schnittstellen-Health-Checks.
3. **Build & PWA Integrity:**
   - Vollständiger Durchlauf von `npm run test:all` (alle Testsuiten grün).
   - Erfolgreicher Produktions-Build via `npm run build`.

---
*Ende des Berichts survey_features.md.*

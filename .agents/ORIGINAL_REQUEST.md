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

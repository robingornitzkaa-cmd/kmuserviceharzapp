# Master Backlog: KMU Service Harz & Life & Founder OS

Strategischer, token-optimierter Entwicklungsplan für Google Antigravity.  
Erstellt am: 26. Oktober 2026 | Rolle: Strategic Backlog Architect

---

## 🎯 Strategischer Leitfaden zur KI-Limit-Optimierung

> **Grundregel für Antigravity-Sessions:**  
> Beginne immer mit **PR-01 (Monolith-Entflechtung)** und **QW-01 (Code-Splitting)**.  
> Sobald `App.jsx` in isolierte Module zerlegt ist, sinkt die Anzahl der Token, die die KI pro Prompt lesen und verarbeiten muss, um bis zu **60 %**. Das spart massiv Nutzungskontingent und verhindert Timeouts oder Kontext-Überläufe bei allen nachfolgenden B2B-Features.

---

## 📊 Master Backlog Tabelle

| Kategorie | Feature-Name | Beschreibung / Business- & Nutzwert | KI-Limit-Schätzung | Priorität |
| :--- | :--- | :--- | :---: | :---: |
| **Architektur & Pruning** | **PR-01: Monolith-Entflechtung `App.jsx`** | Zerlegung der 5.246 Zeilen großen `App.jsx` in dedizierte Domain-Router, Context-Provider und isolierte View-Container. Schützt künftige KI-Limits vor Kontext-Explosionen. | **HIGH** | **P0** |
| **Architektur & Pruning** | **PR-02: Prompt-Giganten auslagern** | Entfernung von `godofprompt_library_export.json` und statischen Mega-Prompts aus dem initialen Frontend-Bundle; bedarfsweises Lazy-Loading oder Supabase-Abruf. | **LOW** | **P1** |
| **Architektur & Pruning** | **PR-03: 2-Zonen-Modus (OS vs. B2B)** | Sauberer Umschalter in der UI zwischen privatem *Gründer-Cockpit* (Habits, Gym, Disziplin) und professioneller *KMU Service Harz B2B-Suite*. | **MEDIUM** | **P1** |
| **Architektur & Pruning** | **PR-04: Lead-Daten Konsolidierung** | Bereinigung doppelter CSV-Daten; Festlegung von Supabase als alleinige Single Source of Truth für alle Akquise- und Discovery-Kontakte. | **LOW** | **P2** |
| **Quick Wins & Performance** | **QW-01: Code-Splitting via `React.lazy()`** | Schwergewichts-Komponenten (`EInvoiceValidator`, `GoCleanToolkit`, `CustomerDiscoveryView`) erst bei Klick asynchron nachladen. App lädt mobil auf der Baustelle unter 1 Sekunde. | **LOW** | **P0** |
| **Quick Wins & Performance** | **QW-02: Zentraler Toast- & Alert-Manager** | Ablösung verstreuter lokaler Erfolgsmeldungen durch ein einheitliches, globales Toast-System am Bildschirmrand. | **LOW** | **P1** |
| **Quick Wins & Performance** | **QW-03: Spotlight-Suche (`Cmd/Strg + K`)** | Schnellsprung-Leiste für sofortigen Wechsel zwischen Tabs, Mandanten, Leads und SOPs während Kundentelefonaten. | **LOW** | **P1** |
| **B2B-Kernfeatures (KMU Harz)** | **CF-01: E-Rechnungs Aktions-Pipeline** | 1-Klick-Weiterleitung validierter ZUGFeRD-/XRechnungs-Dateien an Make/n8n Webhook zur automatischen Übergabe an DATEV oder Lexoffice. | **MEDIUM** | **P0** |
| **B2B-Kernfeatures (KMU Harz)** | **WEB-01: Interaktiver 500-€-Audit Selbsttest** | Interaktiver Schattenkosten-Kalkulator als Lead-Magnet auf der Website: Handwerker schiebt 3 Regler und fordert direkt den Prüfbericht an. | **MEDIUM** | **P0** |
| **B2B-Kernfeatures (KMU Harz)** | **CRM-01: Smarte 1-Klick Outreach-Kadenz** | Automatische Vorbefüllung von WhatsApp- und E-Mail-Vorlagen mit personalisierten Terminslots (z.B. 'Fr 13 Uhr') und automatischem Pipeline-Statuswechsel. | **LOW** | **P0** |
| **B2B-Kernfeatures (KMU Harz)** | **MP-01: Token-basierter Mandantenzugang** | Passwortloser Magic-Link-Zugang (`/?portal=token_xyz`) für Handwerksmeister zu Status-Monitoring, Beleg-Zählern und Support-Tickets. | **LOW** | **P0** |
| **B2B-Kernfeatures (KMU Harz)** | **CF-02: Fördermittel-Antrags-Wizard** | 3-Schritt-Assistent für *Sachsen-Anhalt DIGITAL INNOVATION* & BAFA mit automatischem Entwurf des Förderantragstexts für den Handwerker. | **MEDIUM** | **P2** |
| **GoClean Harz Operativ-Suite** | **GC-01: Objekt- & Tourenplaner** | Einsatz- und Schichtübersicht für Reinigungsobjekte, Zeiten und Personal für Marcels operativen Alltag. | **MEDIUM** | **P1** |
| **GoClean Harz Operativ-Suite** | **GC-02: B2B-Kalkulator & 1-Klick-Rechnung** | Automatische Generierung druckfertiger Rechnungen und Angebote direkt aus den Quadratmeter- und Turnusdaten. | **MEDIUM** | **P1** |
| **GoClean Harz Operativ-Suite** | **GC-03: Mobiles digitales Abnahmeprotokoll** | Smartphone-Checkliste für Reinigungskräfte mit Vorher/Nachher-Fotoupload und digitaler Kundenunterschrift. | **MEDIUM** | **P2** |

---

## 🛠️ Empfohlene Umsetzungs-Reihenfolge (Sprints)

1. **Sprint 1 (Fundament & Limit-Schutz):** `PR-01` + `QW-01` + `PR-02`
   * *Ergebnis:* Die Codebase wird modular, lädt extrem schnell und KI-Prompts verbrauchen nur noch einen Bruchteil deiner Limits.
2. **Sprint 2 (B2B-Akquise & Umsatz-Hebel):** `WEB-01` + `CRM-01` + `MP-01`
   * *Ergebnis:* Lead-Generierung über die Website läuft an, Kaltakquise geht 5x schneller, Mandanten haben ihr Portal.
3. **Sprint 3 (Automatisierungs-Power):** `CF-01` + `GC-01` + `GC-02`
   * *Ergebnis:* Die E-Rechnungs-Pipeline spart echte Arbeitsstunden, GoClean wird zum vollwertigen Showcase.

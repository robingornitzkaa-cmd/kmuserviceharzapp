# Prüfbericht: Untersuchung der Ersatzkandidaten (Iteration 2)
**Erstellt von:** `explorer_iter2_1` (Teamwork Explorer & Investigativer Analyst)  
**Datum:** 12. Oktober 2026  
**Ziel:** Empirische Untersuchung der von Challenger 2 vorgeschlagenen Ersatzkandidaten nach Verwerfung von *Klarwerk*, *Taktos*, *Ablaufwerk* und *Bürofreiraum*.

---

## 1. Management Summary & Kernergebnisse

Die Untersuchung der Ersatzkandidaten mittels **Live-DNS-Resolution** (Python Socket / `Resolve-DnsName`), **HTTP-Deep-Inspection** und **Markt- & Markenrecherchen** liefert drastische und geschäftskritische Erkenntnisse:

1. **Zwei der vorgeschlagenen Ersatzkandidaten kollidieren fatal mit bestehenden Wettbewerbern:**
   - ❌ **`Taktgewinn` ist ein 100%iger Showstopper:** Unter `taktgewinn.de` betreibt Patrick Klug als Einzelunternehmer bereits eine Agentur mit exakt identischem Leistungsangebot: *"Taktgewinn | KI-Beratung & Prozessautomatisierung für Unternehmen: Weniger Routine, mehr Zeit fürs Wesentliche"*. Jede Nutzung von `Taktgewinn` durch Robin Gornitzka würde zu einer sofortigen wettbewerbs- und markenrechtlichen Abmahnung (§§ 5, 15 MarkenG, UWG) führen!
   - ❌ **`Werkablauf` kollidiert direkt im Handwerkssektor:** Unter `werkablauf.de` existiert bereits das aktive Branchenportal *"WerkAblauf"*, das sich als Auswahlhilfe für Handwerkersoftware (mobile Aufträge, E-Rechnung, GoBD, DATEV-Übergabe) an Handwerksbetriebe richtet.
   - ⚠️ **`Klartakt` birgt ein hohes Verwechslungsrisiko:** Unter `klar-takt.de` agiert bereits ein Anbieter mit Fokus auf Webauftritte und ein „Meisterbüro“-KI-Tool für Handwerksbetriebe.

2. **Die sicheren, unbelasteten Sieger unter den Ersatzkandidaten:**
   - 🟢 **`Freitakt` (Kategorie Nutzen/Ergebnis):** 
     - Regional-Domain `freitakt-harz.de` ist **völlig frei (NXDOMAIN)**.
     - Basis-Domain `freitakt.de` ist eine ungenutzte Verkaufs-Parking-Page (kein operativer Geschäftsbetrieb).
     - Keine B2B- oder Handwerker-Kollision im Markt.
     - Meister- & Telefon-Test: Hervorragend ("Pünktlicher Feierabend im geregelten Takt").
   - 🟢 **`Klaros` (Kategorie Kunstwort/Abstraktion):**
     - Regional-Domain `klaros-harz.de` ist **völlig frei (NXDOMAIN)**.
     - Keine kollidierenden Handwerker- oder No-Code-Dienstleister.
     - Phonetisch klar, modern, prägnant.
   - 🟢 **`Operos` (Kategorie Kunstwort/Abstraktion):**
     - Regional-Domain `operos-harz.de` ist **völlig frei (NXDOMAIN)**.
     - Lateinischer Stamm *operosus* (arbeitsam, fleißig), völlig frei von IT-Buzzwords und B2B-Kollisionen.
   - 🟡 **`Flusswerk` (Kategorie Handwerk/Pragmatismus):**
     - Regional-Domain `flusswerk-harz.de` ist **völlig frei (NXDOMAIN)**.
     - Regional im Harz völlig sauber. Überregional existiert `Flusswerk.AI` (makeBytes GmbH, München), was bei einer bundesweiten Expansion berücksichtigt werden muss.

---

## 2. Live-DNS- & HTTP-Prüfmatrix

Alle geprüften Domains wurden programmatisch auf DNS-Einträge und HTTP-Antworten getestet:

| Kandidat | Regional-Domain (`*-harz.de`) | Status Regional | Basis-Domain (`*.de`) | DNS-Befund Basis | HTTP-Status & Webseiten-Inhalt Basis | Marktrisiko / Kollision |
|---|---|---|---|---|---|---|
| **Flusswerk** | `flusswerk-harz.de` | 🟢 **FREI (NXDOMAIN)** | `flusswerk.de` | Vergeben (`80.237.132.43`) | HTTP 403 Forbidden (Host Europe) | 🟡 Mäßig (überregional `Flusswerk.AI` existent) |
| **Werkablauf** | `werkablauf-harz.de` | 🟢 **FREI (NXDOMAIN)** | `werkablauf.de` | Vergeben (`172.67.202.182`) | HTTP 200: "Handwerkersoftware Vergleich \| WerkAblauf" | 🔴 **HOCH (Branchenportal Handwerk/DATEV)** |
| **Freitakt** | `freitakt-harz.de` | 🟢 **FREI (NXDOMAIN)** | `freitakt.de` | Vergeben (`78.47.106.64`) | HTTP 200: Domain-Verkaufsparking (Domainname.de) | 🟢 **SEHR GERING (Kein operativer Wettbewerber)** |
| **Taktgewinn** | `taktgewinn-harz.de` | 🟢 **FREI (NXDOMAIN)** | `taktgewinn.de` | Vergeben (`217.160.0.49`) | HTTP 200: "Taktgewinn \| KI-Beratung & Prozessautomatisierung" | 🔴 **FATAL (Identischer Wettbewerber in DE!)** |
| **Klaros** | `klaros-harz.de` | 🟢 **FREI (NXDOMAIN)** | `klaros.de` | Vergeben (`195.201.69.223`) | HTTP 200: Expired Domain Auction (nicsell.com) | 🟢 **GERING (Keine Handwerker-Kollision)** |
| **Operos** | `operos-harz.de` | 🟢 **FREI (NXDOMAIN)** | `operos.de` | Vergeben (`104.21.57.182`) | HTTP 200: Server-Login (Hestia Control Panel) | 🟢 **SEHR GERING (Keine B2B-Kollision)** |
| **Klartakt** | `klartakt-harz.de` | 🟢 **FREI (NXDOMAIN)** | `klartakt.de` | Vergeben (`116.202.66.62`) | HTTP 404: Ungenutzter Server | 🔴 **HOCH (`klar-takt.de` hat "Meisterbüro" für Handwerker!)** |

*Hinweis:* Sämtliche regionalen Varianten mit Suffix `-harz.de` sind technisch unregistriert (NXDOMAIN) und sofort für KMU Service Harz registrierbar.

---

## 3. Detail-Analyse der Ersatzkandidaten

### 3.1 Kategorie: Handwerk / Pragmatismus

#### Kandidat: `Flusswerk` (Domain-Empfehlung: `flusswerk-harz.de`)
- **Semantische Brücke:** Fließende Abläufe, Workflows im Fluss, kombiniert mit solider handwerklicher Substanz ("Werk").
- **Meister-Test:** Sehr eingängig, wirkt nicht abgehoben, erzeugt Assoziationen von "reibungslos laufender Betrieb".
- **Telefon-Test:** "Guten Tag, Robin von Flusswerk Harz hier" – klar, flüssig und sympathisch.
- **Wettbewerbslage:** 
  - Regional im Harz völlig frei.
  - Überregional: Die Firma makeBytes GmbH nutzt die Marke `Flusswerk.AI` für KI-Prozessautomatisierung. Mit regionalem Zusatz `Flusswerk Harz` besteht kein unmittelbares Titelschutzhindernis, bei bundesweitem Solo-Auftritt sollte dies jedoch beachtet werden.
- **Bewertung:** **Bedingt bis gut geeignet (Empfehlung für Handwerk/Pragmatismus)**.

#### Kandidat: `Werkablauf` (Domain-Empfehlung: `werkablauf-harz.de`)
- **Semantische Brücke:** Arbeitsablauf im Handwerksbetrieb.
- **Befund:** Unter `werkablauf.de` betreibt Yann Lephay ein etabliertes Fachportal für Handwerkersoftware-Vergleiche mit Fokus auf E-Rechnung, GoBD und DATEV-Schnittstellen.
- **Kollisionsrisiko:** Da KMU Service Harz genau dieselben Themen (Handwerk, E-Rechnung, DATEV) bedient, führt der Name im Fachpublikum zu anhaltender Verwirrung und potentiellen wettbewerbsrechtlichen Konflikten.
- **Bewertung:** ❌ **Nicht empfohlen (Verwerfen)**.

---

### 3.2 Kategorie: Nutzen / Ergebnis

#### Kandidat: `Freitakt` (Domain-Empfehlung: `freitakt-harz.de`)
- **Semantische Brücke:** Befreiung vom Bürochaos ("Frei") + geordneter, verlässlicher Arbeitsrhythmus ("Takt").
- **Meister-Test:** Meister Thomas versteht die Botschaft sofort: Freiraum für das Handwerk, Feierabend ohne Zettelwirtschaft, planbare Prozesse.
- **Telefon-Test:** "Guten Tag, Robin von Freitakt Harz" – extrem griffig, sympathisch und unverwechselbar.
- **Wettbewerbslage:** 
  - `freitakt-harz.de` ist NXDOMAIN.
  - `freitakt.de` ist lediglich ein geparkter Domain-Name zum Verkauf, keine aktive Firma.
  - Keine DPMA-Marken oder Handelsregistereinträge im B2B-Automatisierungsbereich.
- **Bewertung:** 🟢 **Top-Empfehlung (Bester Ersatzkandidat für Nutzen/Ergebnis)**.

#### Kandidat: `Taktgewinn` (Domain-Empfehlung: `taktgewinn-harz.de`)
- **Befund:** Vollkollision mit `Taktgewinn` (Patrick Klug, 74235 Erlenbach).
- **Auszug Impressum `taktgewinn.de`:**  
  *„Patrick Klug, Einzelunternehmer unter der Geschäftsbezeichnung Taktgewinn [...] Leistungsangebot: KI-Beratung und Prozessautomatisierung für Unternehmen. Weniger Routine, mehr Zeit fürs Wesentliche.“*
- **Rechtliche Konsequenz:** Wer im selben Geschäftsfeld unter derselben Geschäftsbezeichnung im Bundesgebiet auftritt, verletzt die vorrangigen Kennzeichenrechte des Erstnutzers nach § 5 Abs. 2 MarkenG und § 15 MarkenG.
- **Bewertung:** ❌ **Absolutes Ausschlusskriterium (Sofort verwerfen!)**.

---

### 3.3 Kategorie: Kunstwort / Abstraktion

#### Kandidat: `Klaros` (Domain-Empfehlung: `klaros-harz.de`)
- **Semantische Brücke:** Kunstwort basierend auf dem deutschen Adjektiv "klar" (Transparenz, Ordnung, Struktur) mit markanter, maskuliner Endung "-os".
- **Meister-Test:** Kurz, kraftvoll, seriös. Klingt nach einem etablierten Systempartner, nicht nach Start-up-Slang.
- **Wettbewerbslage:** 
  - `klaros-harz.de` ist frei.
  - Im Markt gibt es das Software-Tool `Klaros-Testmanagement` (QA-Software für IT-Entwickler), das sich jedoch an eine völlig andere Zielgruppe richtet.
- **Bewertung:** 🟢 **Sehr gut geeignet (Ausgezeichneter Ersatz für Taktos)**.

#### Kandidat: `Operos` (Domain-Empfehlung: `operos-harz.de`)
- **Semantische Brücke:** Ableitung von lat. *operosus* (tätig, wirksam, emsig) bzw. *Operations*.
- **Meister-Test:** Wirkt etwas akademischer/technischer als Klaros, aber sehr seriös und vertrauenerweckend auf Rechnungen und Verträgen.
- **Wettbewerbslage:** Völlig unbesetzt im Handwerks- und No-Code-Bereich in Deutschland.
- **Bewertung:** 🟢 **Gut geeignet (Saubere Alternative)**.

---

### 3.4 Kategorie: Hybride Modelle

#### Kandidat: `Klartakt` (Domain-Empfehlung: `klartakt-harz.de`)
- **Semantische Brücke:** Verbindung von Klarheit und Takt.
- **Gefahr:** Unter `klar-takt.de` existiert bereits ein digitaler Dienstleister, der sich mit Webseiten und einem KI-„Meisterbüro“ direkt an Handwerksbetriebe wendet.
- **Bewertung:** 🟡 **Erhöhtes Verwechslungsrisiko im Handwerkssektor**. Wenn ein Hybrides Modell gesucht wird, ist eine unverbrauchte Kombination vorzuziehen.

---

## 4. Empfohlene Substitution für die Top-10-Markenliste

Um die von Challenger 2 beanstandeten 4 Positionen optimal zu ersetzen, empfiehlt sich folgende Zuordnung:

| Bisheriger (beanstandeter) Name | Beanstandungsgrund | Empfohlener Ersatzkandidat | Kategorie | Empfohlene Domain | Begründung |
|---|---|---|---|---|---|
| **Ablaufwerk** | Fachbegriff aus Tiefbau/Wasserbau | **Flusswerk** *(oder Werkablauf)* | Handwerk / Pragmatismus | `flusswerk-harz.de` | Völlig frei von Tiefbau-Assoziationen; transportiert fließende Prozesse. |
| **Bürofreiraum** | Glatt beschreibend gem. § 8 MarkenG | **Freitakt** | Nutzen / Ergebnis | `freitakt-harz.de` | Keine Markenbeschreibungsgefahr; meistertauglich; Null Kollisionen. |
| **Taktos** | 1:1 Kollision mit Field-Worker-SaaS `taktos.one` | **Klaros** *(oder Operos)* | Kunstwort / Abstraktion | `klaros-harz.de` | Völlig frei von SaaS-Kollisionen im Handwerk; maximale phonetische Klarheit. |
| **Klarwerk** | Phonetischer Zwilling von *Klärwerk*; Hornbach Sanitärarmaturen-Marke | **Klartakt** *(oder Ruhetakt aus Tier 1)* | Hybrides Modell / Nutzen | `klartakt-harz.de` / `ruhetakt.de` | Beseitigt das Fäkalien-/Kläranlagen-Stigma bei SHK-Meistern vollständig. |

---

## 5. Fazit für den Orchestrator & Synthesizer

1. **`Freitakt` und `Klaros` sind die stärksten Neuzugänge:** Sie sind markenpsychologisch überzeugend, haben saubere regionale Domains und weisen keinerlei wettbewerbliche Kollisionen auf.
2. **`Taktgewinn` und `Werkablauf` dürfen keinesfalls in die finale Top-10 aufgenommen werden:** Ihre Verwendung würde gravierende rechtliche und geschäftliche Risiken für Robin Gornitzka bedeuten.
3. Die von Challenger 2 identifizierten Tier-1-Favoriten (**`Ruhetakt`**, **`Büroschmiede`**, **`Struktus`**) bleiben unverändert die absoluten Spitzenreiter der Gesamtstrategie.

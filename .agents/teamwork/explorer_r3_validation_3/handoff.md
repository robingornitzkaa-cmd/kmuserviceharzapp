# 360°-Validierungs-Pipeline & Verifikations-Harness (R4) — Handoff Report

**Agent:** `explorer_r3_validation_3`  
**Datum:** 2026-10-22  
**Kontext:** Entwicklung und Spezifikation der 4-stufigen 360°-Validierungs-Pipeline für Round 3 / Round 4 Markennamen (`DOCS/Markennamen_Strategie_Runde3_Final.md`) sowie empirische Analyse und Erweiterung des Test-Harness `run_collision_tests_iter2.py`.

---

## 1. Observation

### 1.1 Ausgangslage & Vorgaben aus `ORIGINAL_REQUEST.md`
- Gemäß `ORIGINAL_REQUEST.md` (Abschnitt ## Follow-up — 2026-10-22T18:44:44Z, R4) muss jeder der 10 Namenskandidaten für die B2B-Automatisierungsagentur (Fokus Harz/Goslar, überregional skalierbar, Einzelunternehmen `[Marke] – Inh. Robin Gornitzka`) eine obligatorische 4-Stufen-Prüfung durchlaufen:
  1. **Tier 1 — Psychologische Resonanz:** Resonanz bei Handwerksmeistern (SHK, Elektro, Bau, Gebäudedienstleister), partnerschaftliche Augenhöhe vs. akademisches Belehren, Vertrauenssignale des Einzelunternehmens.
  2. **Tier 2 — Baustellen- & Telefontauglichkeit:** Phonetische Verständlichkeit bei Umgebungspegeln >75 dB, Melderhythmus am Telefon, fehlerfreie Buchstabierbarkeit nach Buchstabiertafel DIN 5009, Kölner Phonetik DIN 31634.
  3. **Tier 3 — Domain-Vorprüfung (.de):** Multi-Record DNS-Prüfung (A, AAAA, NS, SOA) zur verlässlichen Feststellung von Domainverfügbarkeit und Konfliktfreiheit im DENIC-Raum.
  4. **Tier 4 — Markenrechtliche Erstprüfung:** Kollisions- und Ähnlichkeitsprüfung in den Nizza-Klassen 35 (Büroarbeiten, Unternehmensberatung) und 42 (IT-Dienstleistungen, Softwareentwicklung) nach BGH-/EuGH-Kriterien der Verwechslungsgefahr.

### 1.2 Beobachtungen im Zielgruppen- und Wettbewerbsmaterial
- `DOCS/Buyer Persona KMU Dienstleister.md` (Zeilen 1–177):
  - Primäre Zielgruppe: Meister und operative Koordinatoren in Betrieben mit 1–20 (bis 50) Mitarbeitern (z. B. Sanitär/Heizung/Klima, Elektro, Maler, Dachdecker, Gebäudereiniger, GaLaBau).
  - Kernschmerz: Chronischer „Bürosonntag“ durch Zettelwirtschaft (ca. 32 unproduktive Stunden/Monat für manuelle Belegübertragung), akute Haftungsangst vor Zollprüfungen (§ 17 MiLoG, BAG-Urteil 2022 zur Zeiterfassung, Bußgelder bis 50.000 €) und vor Abrechnungsausfällen durch die gesetzliche B2B-E-Rechnungspflicht (EN 16931).
  - Soziologische Disposition: Hohe Skepsis gegenüber Beratern („Schlips-Träger“), IT-Systemhäusern (teure Hardware, unkalkulierbare Stundensätze von 90–180 €/h) und elitären Anglizismen. Gewünscht ist ein „Handwerker für digitale Infrastruktur“ auf Augenhöhe.
- `DOCS/Wettbewerbsanalyse KMU Service Harz.md` (Zeilen 1–109):
  - Regionaler Wirtschaftsraum Goslar/Langelsheim/Nordharz: Stark ländlich bis kleinstädtisch geprägt. Vertrauen entsteht durch persönliche Integrität, lokale Verwurzelung und kaufmännische Berechenbarkeit (Festpreise statt offener Stundensätze).
  - Steuerberater fungieren als entscheidende Multiplikatoren (DATEV-Datenservices, Schnittstellenqualität).

### 1.3 Analyse des bestehenden Prüfskripts `run_collision_tests_iter2.py`
- Direkt beobachteter Quellcode (Zeilen 1–389):
  - **Kölner Phonetik DIN 31634 (`koelner_phonetik`, Zeilen 19–99):** Vollständige und standardkonforme Implementierung des Postel-Algorithmus (Ersetzung von Umlauten/ß, Berücksichtigung phonetischer Kontexte wie C vor Vokalen oder DT vor CSZ, Verschmelzen von Wiederholungen, Eliminierung nachfolgender Vokale '0').
  - **String-Metriken (Zeilen 102–173):** Levenshtein-Distanz, Normalized Levenshtein (`1 - dist/max_len`), Jaro-Winkler-Distanz (Präfix-Gewichtung 0.1).
  - **Wettbewerber-Benchmark `DOCUMENT_COMPETITORS` (Zeilen 176–220):** Enthält 22 regionale IT-/Web-Dienstleister im Harz (z. B. IT-Nunweiler, MoCo Service, Harz-IT, PDV-Systeme, UniqueFlow IT) sowie 13 überregionale No-Code-/SaaS-Anbieter (z. B. Prozessgesteuert, Wemakefuture, sevDesk, HERO, Craftnote) und 5 bekannte Kollisionstreffer aus Vorrunden (`Taktos`, `Taktgewinn`, `Clarzeit`, `WerkAblauf`, `Taktwerk`).
  - **DNS-Funktion (`check_dns`, Zeilen 245–252):** Nutzt gegenwärtig ausschließlich `socket.gethostbyname(domain)`. Gibt `True, ip` bei aufgelöstem A-Record zurück und `False, "NXDOMAIN"` bei `socket.gaierror`.
  - **Ausführungsergebnis (`python run_collision_tests_iter2.py`):**
    - Überprüfung der 10 Namen aus Runde 1 (z. B. `Prozesswerk`, `Büroschmiede`, `Flusswerk` etc.).
    - Exakter Nachweis, dass die 4 defekten Vorgängernamen (`Klarwerk`, `Taktos`, `Ablaufwerk`, `Bürofreiraum`) eliminiert wurden.
    - Erkennung realer Kollisionen über String-Metriken (z. B. `Klarzeit` vs. `Clarzeit` mit JW=0.917; `Taktwerk` vs. `Taktos` JW=0.833, `Taktwerk` Tanzhaus Hildesheim JW=1.000).

---

## 2. Logic Chain

### 2.1 Tier 1 — Psychologische Resonanz: Kriterien für Handwerksmeister im Harz
Aus den Beobachtungen der Zielgruppe leitet sich eine 5-Punkte-Wirkungsmatrix für die psychologische Eignung ab:

1. **Partnerschaftliche Augenhöhe statt akademischer Überheblichkeit („Macher statt Besserwisser“):**
   - *Fehlmuster:* Namen mit „Doktor“, „Audit“, „Consulting“, „Academy“ oder elitären Begriffen signalisieren dem Meister, er werde belehrt oder sein Betrieb werde für „krank/defizitär“ erklärt.
   - *Resonanzanker:* Namen, die Funktion, Ordnung und handfeste Werkzeuge assoziieren (z. B. `Klarstand`, `Passform`, `Hebelpunkt`, `Gleichlauf`, `Praxos`).
2. **Direkte Feierabend- & Entlastungs-Verheißung („Schluss mit dem Bürosonntag“):**
   - *Fehlmuster:* Abstrakte Produktivitätsfloskeln („Synergy Ops“, „Workflow Agility“) verpuffen völlig.
   - *Resonanzanker:* Die Nennung des konkreten emotionalen Schmerzpunktes (Freikopf, Feierabend, bürokratische Stille). Der Meister kauft keine Softwarelizenzen, sondern das freie Wochenende mit seiner Familie.
3. **Respekt vor dem Handwerk („Der Handwerker für digitale Infrastruktur“):**
   - *Fehlmuster:* Peinliche, aufgesetzte Werkstatt-Romantik (`Werk`, `Schmiede`, `Amboss`, `Hobel`) wirkt rückwärtsgewandt und unpassend für digitale Schnittstellen zwischen Lexoffice und DATEV.
   - *Resonanzanker:* Funktionale Analogien aus Mechanik und Physik (z. B. Hebel, Takt, Gleichlauf, Passung).
4. **Kaufmännische Gravitas & Schutz vor Amtsdeutsch:**
   - *Fehlmuster A (Infantil):* „Büro-Ninja“, „Zettel-Fresser“ oder „Klick-Held“ zerstören die kaufmännische Glaubwürdigkeit bei Banken, Lieferanten und Steuerberatern.
   - *Fehlmuster B (Amtsdeutsch):* „Prozessordnung“ weckt Assoziationen zur Zivilprozessordnung (ZPO) und zu Gerichtsverfahren.
   - *Resonanzanker:* Solide, präzise Nomen mit kaufmännischer Ruhe.
5. **Das Vertrauenssignal des Einzelunternehmens (`[Marke] – Inh. Robin Gornitzka`):**
   - *B2B-Psychologie im Harz:* Im regionalen Handwerk gilt die persönliche Inhaberschaft als höchstes Gütesiegel („Hier haftet der Inhaber persönlich mit seinem Namen und Gesicht“).
   - *Harmonieprüfung:* Der Markenname muss mit dem Zusatz `Inh. Robin Gornitzka` auf Briefbögen, Rechnungsfußzeilen, Kostenvoranschlägen und Kanzleischreiben wie eine etablierte, seriöse Einheit wirken. Schein-Konzerne („Apex Global Operations“) wirken bei einem Einzelunternehmen lachhaft; `Klarstand – Inh. Robin Gornitzka` oder `Praxos – Inh. Robin Gornitzka` strahlt handwerkliche Solidität aus.

### 2.2 Tier 2 — Baustellen- & Telefontauglichkeit (Aakustik, DIN 31634 & DIN 5009)
Die reale Einsatzumgebung bedingt strenge phonetische und orthografische Anforderungen:

1. **Phonetische Durchdringung bei Umgebungslärm (>75 dB):**
   - Auf Baustellen und in Handwerker-Transportern maskiert niederfrequenter Lärm (Dieselmotoren, Aggregate, Bohrhämmer) schwache Reibelaute (/f/, /s/, /th/, /v/).
   - Plosive (Verschlusslaute: /p/, /t/, /k/, /b/, /d/, /g/) und Sonoranten (/m/, /n/, /l/, /r/) besitzen steile akustische Einschwingvorgänge (Transienten), die selbst bei schlechtem Mobilfunkempfang und Baustellenlärm verständlich bleiben.
   - *Metrische Kadenz:* Trochäischer Rhythmus (Betonung auf der ersten Silbe: **TÁKT**-werk, **KLÁR**-stand, **FÉIER**-gang, **PRÁX**-os) entspricht dem natürlichen Sprachrhythmus des Deutschen und garantiert höchste Wiedererkennungsraten.
2. **Melderhythmus am Telefon (Meldeformel):**
   - Die Akquise- und Meldeformeln („Guten Tag, Robin von [NAME] hier“ bzw. „Guten Tag, [NAME], Robin Gornitzka hier“) dürfen keine phonetischen Stolpersteine (Konsonanten-Häufungen, Zungenbrecher) aufweisen.
   - *Gegenbeispiel:* „Robin von Ablaufklar“ erzeugt syntaktische Verwirrung („Wie bitte, Ablauf was?“); „Robin von Praxos“ geht glatt ins Ohr.
3. **Verwechslungsfreie Buchstabierbarkeit nach DIN 5009:2022-06:**
   - Gemäß der reformierten Buchstabiertafel DIN 5009 (Ausgabe Juni 2022) werden Buchstaben durch Städtenamen angesagt. Besonders relevant: Der Buchstabe **G** steht offiziell für **Goslar**!
   - *Vermeidung orthografischer Friktion:* Namen müssen lauttrennend und lautgetreu („Schreib wie du sprichst“) sein. Buchstaben mit Mehrfachlautung (C als /k/ oder /ts/, V als /f/ oder /w/, Ph statt F, X, Y) erfordern ständiges Nachfragen („Mit K oder mit C? Mit V oder mit F?“).
4. **Kölner Phonetik (DIN 31634) als mathematischer Filter:**
   - Kölner Phonetik bildet die deutsche Artikulationsphonetik exakt auf Codes von 0 bis 8 ab.
   - *Kollisionsregel:* Wenn zwei Namen in derselben Branche identische Kölner Codes generieren (wie `Klarwerk` = 457374 und `Klärwerk` = 457374), liegt eine unzulässige phonetische Verwechslungsgefahr vor.
   - *Distanzmetrik:* Für alle Kandidaten muss der Hamming- und Levenshtein-Abstand zu bekannten Marken und Wettbewerbern berechnet werden.

### 2.3 Tier 3 — Domain-Vorprüfung (.de): DNS-Auflösungsmethodik
Die bloße Abfrage eines A-Records (`socket.gethostbyname`) birgt ein systematisches Risiko für „False Negatives“ (eine Domain wird fälschlicherweise als frei gemeldet, obwohl sie registriert ist):

1. **DNS-Architektur bei DENIC eG:**
   - Eine `.de`-Domain ist delegiert, sobald bei den DENIC-Nameservern Nameserver-Records (`NS`) oder Start-of-Authority-Records (`SOA`) hinterlegt sind.
   - Viele Inhaber oder Domain-Broker parken Domains, betreiben reine Mailserver (`MX`) oder haben noch keinen Webserver (`A`/`AAAA`) aufgeschaltet.
   - `socket.gethostbyname` fragt nur den `A`-Record ab. Fehlt dieser, wirft Python `socket.gaierror`, was fälschlich als `NXDOMAIN` (frei) interpretiert werden kann.
2. **Die 3-stufige Multi-Record-Prüfmethodik:**
   - **Stufe 3a (A / AAAA Abfrage):** Prüfung auf aktiven IPv4/IPv6-Webhost.
   - **Stufe 3b (NS / SOA Delegation):** Prüfung über `Resolve-DnsName -Name <domain> -Type NS` (bzw. `nslookup -type=ns`). Wenn Nameserver existieren, ist die Domain vergeben (`DELEGATED / TAKEN`).
   - **Stufe 3c (HTTP-Header & Content-Probe):** Wenn ein A-Record existiert, prüft ein schneller HTTP-GET-Request, ob eine aktive Unternehmenswebsite vorliegt oder lediglich eine Parkseite (z. B. Sedo, Dan.com, Bodis).
3. **Zweistufige Domain-Strategie:**
   - *Primär:* Regionale Projekt-Domain mit Bindestrich (z. B. `klarstand-harz.de`), die zu 100 % frei (`NXDOMAIN`) sein muss.
   - *Sekundär:* Überregionale Stand-alone-Domain (z. B. `klarstand.de`), deren Status transparent ausgewiesen wird (frei vs. geparkt vs. belegt).

### 2.4 Tier 4 — Markenrechtliche Erstprüfung: Nizza-Klassen 35 & 42
Die markenrechtliche Ersteinschätzung stützt sich auf das Markengesetz (MarkenG) und die gefestigte Rechtsprechung des BGH und EuGH:

1. **Relevanz der Nizza-Klassen:**
   - **Klasse 35 (Büroarbeiten & Organisation):** Umfasst vorbereitende Buchführung, Rechnungswesen, Organisationsberatung, Digitalisierung und Systematisierung von Geschäftsdaten.
   - **Klasse 42 (IT & Software):** Umfasst Schnittstellenprogrammierung (APIs), Software-as-a-Service (SaaS), No-Code-Konfiguration (Make/n8n), technische Systemintegration.
2. **Absolute Schutzhindernisse (§ 8 MarkenG):**
   - Freihaltebedürfnis für rein beschreibende Angaben (§ 8 Abs. 2 Nr. 2 MarkenG): Begriffe wie „Büroservice“, „Automatisierungsdienst“, „Rechnungshelfer“ oder „Belegsystem“ werden vom DPMA wegen fehlender Unterscheidungskraft (§ 8 Abs. 2 Nr. 1 MarkenG) abgewiesen.
   - Kandidaten müssen einen hinreichenden „Phantasieüberschuss“ besitzen (z. B. metaphorische Neuschöpfungen oder semantisch überraschende Wortkombinationen).
3. **Relative Schutzhindernisse (§ 9 MarkenG) & BGH/EuGH-Verwechslungsgefahr:**
   - Nach der *Canon-Rechtsprechung* des EuGH (Rs. C-39/97) und der ständigen BGH-Spruchpraxis ist die Verwechslungsgefahr im Rahmen einer **Gesamtwürdigung nach dem Wechselwirkungsgrundsatz (Interdependenz)** zu ermitteln:
     - Ein geringerer Grad der Waren-/Dienstleistungsähnlichkeit kann durch einen höheren Grad der Zeichenähnlichkeit ausgeglichen werden und umgekehrt.
     - Die originäre Kennzeichnungskraft der älteren Marke bestimmt den Schutzradius (stark bei Kunstwörtern, eng bei anlehnend-beschreibenden Begriffen).
   - **Die 3 Dimensionen der Verwechslungsgefahr:**
     - *Phonetisch (Klang):* Silbenzahl, Betonung, Konsonantengerüst (abgesichert via Kölner Phonetik DIN 31634).
     - *Visuell (Schriftbild):* Wortlänge, Buchstabenfolge, charakteristische Anfangsbuchstaben (Präfix-Dominanz im BGH-Recht).
     - *Semantisch (Sinngehalt):* Identischer Begriffsinhalt kann selbst bei Klangunterschieden zur Verwechslung führen, sofern der Begriff eine etablierte Marktbekanntheit besitzt.
4. **DPMA/EUIPO Recherche-Logik:**
   - Prüfung gegen Identität und Ähnlichkeit in den Klassen 35 und 42.
   - Ampelbewertung:
     - 🟢 **Grün:** Keine identischen oder hochgradig ähnlichen Marken in 35/42; Kennzeichnungskraft hoch.
     - 🟡 **Gelb:** Ähnliche Marken in sachfernen Nizza-Klassen oder beschreibende Teilbegriffe (z. B. Wortstamm „Klar“); Abgrenzung möglich.
     - 🔴 **Rot:** Identität oder akute phonetisch-visuelle Kollision in 35 oder 42 (wie seinerzeit `Taktos` bei der SaaS `taktos.one`).

### 2.5 Architektur & Erweiterung von `run_collision_tests_iter2.py`
Das bestehende Skript bietet ein solides Fundament, muss jedoch für Runde 3 gezielt modularisiert und erweitert werden:
1. **Erweiterung der Blacklist:**
   - Runde-1-Buzzwords: `solutions`, `tech`, `digital`, `ai`, `synergy`, `excellence`, `cloud`.
   - Runde-2-Buzzwords & Schablonen: `hub`, `smart`, `werk`, `schmiede`, `lotse`, `bank`.
   - Vorgänger-Namen aus Runde 1 (10 Namen) und Runde 2 (10 Namen): Vollständiger Ausschluss aller 20 Altnamen!
2. **Multi-Record-DNS-Prüfung:**
   - Einbindung einer DNS-Funktion, die neben `socket.gethostbyname` auch IPv6 (`getaddrinfo`) und per Subprocess `Resolve-DnsName` (PowerShell) oder `nslookup` den `NS`-Record prüft, um geparkte Domains sicher zu identifizieren.
3. **Erweiterung des Wettbewerber- und Markendatensatzes:**
   - Ergänzung der 35 Wettbewerber um bundesweite Handwerker- und Kanzlei-Softwaremarken (z. B. DATEV, Lexoffice, STREIT, Hamburger Software, Craftnote, openHandwerk, Mendato, Clockin).
4. **Exakte Arbeitsanweisung & CLI-Befehl für Worker:**
   - Das Skript kann direkt via Windows PowerShell gestartet werden:
     ```powershell
     python run_collision_tests_iter2.py
     ```
   - Für Runde 3 wird der Worker angewiesen, `run_collision_tests_r3.py` anzulegen oder `run_collision_tests_iter2.py` zu aktualisieren und auszuführen.

---

## 3. Caveats

1. **Vorläufiger Charakter der Markenrecherche:**
   - Eine softwaregestützte Ähnlichkeitsprüfung und Register-Vorprüfung ersetzt keine vollumfängliche anwaltliche Markenrecherche (FTO — Freedom to Operate) durch einen Fachanwalt für gewerblichen Rechtsschutz vor Notar-/DPMA-Anmeldung.
2. **Dynamik der Domain-Verfügbarkeit:**
   - Domain-Freiheit ist eine Momentaufnahme zum Abfragezeitpunkt. Zwischen Prüfung und Registrierung können Dritte eine Domain sichern.
3. **Akustische Varianz von Mobilfunkgeräten:**
   - Die Dämpfung von Umgebungsgeräuschen hängt von der Beamforming- und Noise-Cancellation-Hardware moderner Smartphones (z. B. iPhone Voice Isolation) ab. Die phonetischen Kriterien von Tier 2 maximieren die Verständlichkeit unter Worst-Case-Bedingungen.
4. **Kein öffentlicher WHOIS-CLI-Zugriff für DENIC `.de`:**
   - Aus DSGVO-Gründen gibt DENIC keine Inhaberdaten über Standard-Port-43-Whois frei. Die Verfügbarkeitsprüfung muss daher strikt über DNS-Delegation (NS/SOA/A) erfolgen.

---

## 4. Conclusion

1. **Vollständiges 4-Tier-Validierungs-Framework definiert:**
   - **Tier 1 (Psychologie):** 5 Kriterien (Macher-Mentalität, Feierabend-Resonanz, Respekt vor dem Handwerk, kaufmännische Gravitas, Vertrauensanker Einzelunternehmen `Inh. Robin Gornitzka`).
   - **Tier 2 (Akustik & Phonetik):** Plosiv- und Sonoranten-Stärke bei >75 dB, trochäischer Rhythmus, Meldeformel-Tauglichkeit, fehlerfreie Buchstabierbarkeit nach DIN 5009 (G = Goslar!), Kölner Phonetik DIN 31634.
   - **Tier 3 (Domain-DNS):** Robuster 3-Stufen-Check (A, AAAA, NS/SOA-Delegation, HTTP-Probe) zur Vermeidung von False Negatives.
   - **Tier 4 (Markenrecht):** Nizza-Klassen 35/42 Prüfung, Freihaltebedürfnis-Ausschluss (§ 8 MarkenG), BGH/EuGH-Verwechslungsgefahr-Gesamtwürdigung (Klang, Bild, Sinn, Wechselwirkungsgrundsatz).
2. **Prüfskript `run_collision_tests_iter2.py` bewertet & erweitert:**
   - Die Implementierung der Kölner Phonetik nach DIN 31634 und der String-Metriken (Levenshtein, Jaro-Winkler) ist mathematisch präzise und voll funktionsfähig.
   - Für Runde 3 muss das Skript um die Blacklist aller 20 Altnamen, erweiterte Schablonen, Multi-Record-DNS und erweiterte Nizza-Marken ergänzt werden.
3. **Handlungsbereitschaft für Implementierungs-Worker:**
   - Alle Kriterien, mathematischen Grenzwerte und Prüfschritte liegen vollständig spezifiziert vor, sodass der Worker in Milestone 2 die 10 neuen Namen aus Runde 3 lückenlos und objektiv auditieren kann.

---

## 5. Verification Method

Zur unabhängigen Überprüfung der in diesem Bericht dargelegten Erkenntnisse und Algorithmen:

1. **Phonetische Skript-Ausführung:**
   - Ausführung im Projektverzeichnis:
     ```powershell
     python run_collision_tests_iter2.py
     ```
   - *Erwartetes Ergebnis:* Exit Code 0, erfolgreiche Berechnung der Kölner Phonetik Codes, Ausweisung der Levenshtein- und Jaro-Winkler-Distanzen zu Wettbewerbern sowie Bestätigung der Eliminierung der defekten Vorgängernamen.
2. **Verifikation der Multi-Record-DNS-Auflösung via PowerShell:**
   - Test einer registrierten Domain:
     ```powershell
     powershell -Command "try { Resolve-DnsName -Name google.de -Type NS -ErrorAction Stop | Out-Null; 'TAKEN' } catch { 'NXDOMAIN' }"
     ```
     *Erwartete Ausgabe:* `TAKEN`
   - Test einer nicht registrierten Dummy-Domain:
     ```powershell
     powershell -Command "try { Resolve-DnsName -Name bueroschmiede-harz-gibts-nicht-xyz123.de -Type NS -ErrorAction Stop | Out-Null; 'TAKEN' } catch { 'NXDOMAIN' }"
     ```
     *Erwartete Ausgabe:* `NXDOMAIN`
3. **Inspektion von Zielgruppen- und Referenzdateien:**
   - `DOCS/Buyer Persona KMU Dienstleister.md` (Zeilen 13–25, 45–72, 106–112)
   - `DOCS/Wettbewerbsanalyse KMU Service Harz.md` (Zeilen 15–30, 41–50, 80–88)
   - `run_collision_tests_iter2.py` (Zeilen 19–99, 102–173, 245–253)

---
*Bericht erstellt durch explorer_r3_validation_3 im Rahmen von Teamwork Milestone 0 (Survey & Scope Mapping).*

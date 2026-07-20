export const MASTER_LOGBUCH_CONTENT = `# **📑 MASTER-LOGBUCH & COMMAND CENTER: KMU SERVICE HARZ**

## **TEIL 1: DAS CORE-PROFIL (Aktueller fester Stand)**

### **🏢 1. Unternehmens-Steckbrief**

* **Unternehmensname:** KMU Service Harz.  
* **Rechtsform:** Unternehmergesellschaft (haftungsbeschränkt) – UG in Gründung.  
* **Gründer:** Robin.  
* **Standort & Einzugsgebiet:** Wirtschaftsregion Harz (Landkreis Goslar, Langelsheim, Bad Harzburg, Wernigerode, Halberstadt, Blankenburg; länderübergreifend über Niedersachsen und Sachsen-Anhalt).  
* **Arbeitskapazität:** Volle Kapazität des Gründers in Vollzeit (ca. 40 Stunden/Woke).  
* **Finanzierungsmodell:** Striktes Bootstrapping (0 € Fremdkapital, kein Bankkredit). Die operative Finanzierung erfolgt vollständig aus laufenden Umsätzen. Die private Existenzsicherung sowie die Anschaffung der Erstausstattung in der Anlaufphase erfolgt über die Beantragung von staatlichen Gründungsförderungen (Einstiegsgeld / Gründungszuschuss / Sachmittelzuschuss vom Jobcenter).  
* **Betriebliche Fixkosten:** Maximal 350 € pro Monat (bestehend aus essenziellen Software-Lizenzen, Google Workspace Business, eRecht24 Premium für Rechtstexte, IT-Haftpflichtversicherung und externer Buchhaltung).  
* **Gewinnschwelle (Break-Even-Punkt):** Extrem niedrige 350 € Monatsumsatz. Das finanzielle Risiko ist minimiert; das Unternehmen arbeitet profitabel, sobald im Monat ein einziges Einstiegs-Audit verkauft wird.

### **🎯 2. Positionierung & Zielgruppen-Fokus**

* **Kern-Metaphern:** „Handwerker für digitale Infrastruktur“ und „Der pragmatische Prozess-Befreier“.  
* **Zielgruppe:** Regionale Kleinunternehmen und ländlicher Mittelstand mit 1 bis 50 Mitarbeitenden, die keine eigene IT-Abteilung besitzen und unter erdrückender bürokratischer Last leiden.  
* **Fokussegmente:** Lokales Handwerk, Baugewerbe, bau- und anlagentechnische Betriebe sowie lokale Dienstleister (z. B. Gebäudereinigung) und medizinische/therapeutische Praxen.  
* **Der Kundenschmerz (Pain Point):** Betriebe verschwenden im Durchschnitt 7 % ihrer gesamten Arbeitszeit – rund 32 unproduktive Stunden pro Monat – mit administrativer Zettelwirtschaft, manuellen Doppeleingaben und der Aufarbeitung von Belegen. Dies führt zu unbezahlter Wochenendarbeit („Bürosonntagen“).  
* **Akuter Markttreiber:** Hoher gesetzlicher Handlungs- und Prüfungsdruck bei den Betrieben durch die gesetzliche B2B-E-Rechnungspflicht.  
* **Das Kernversprechen (USP):** Wir automatisieren zeitfressende Büro-, Beleg- und Dokumentenworkflows lautlos im Hintergrund, *ohne* dass der Kunde seine gewohnte Software wechseln muss. Wir kommunizieren auf Augenhöhe, verzichten vollständig auf komplizierten IT-Jargon („Buzzwords“) und arbeiten mit transparenten Festpreisen statt offenen Stundensätzen.

### **💰 3. Angebotsarchitektur & Preistreppe (Productized Services)**

* **Stufe 1: Das Einstiegs-Audit (Potenzialanalyse)**  
  * *Inhalt:* Initiale Prozessanalyse vor Ort oder digital, Identifikation von Medienbrüchen und das Aufzeigen von digitalen Quick-Wins (z. B. Optimierung der Belegübergabe).  
  * *Preis:* 500 € Festpreis. (Dient gleichzeitig als strategischer Hebel zur Umgehung von Fördermittel-Wartezeiten, da es aus der Portokasse gezahlt werden kann).  
* **Stufe 2: Das Setup-Projekt (Technische Umsetzung)**  
  * *Inhalt Konzeption:* fehlerfreie Verknüpfung und Live-Einrichtung automatisierter Workflows (z. B. automatisierte Verarbeitung von Angebot zu Auftrag zu Rechnung, DATEV- und Lexoffice-Schnittstellenanbindungen).  
  * *Preis:* Im Schnitt 2.000 € Festpreis (skaliert je nach Komplexität: Starter-Setup 1.500 €–2.500 € / Premium-Setup 3.500 €–5.000 €).  
* **Stufe 3: Managed Automation / Automation-as-a-Service (AaaS)**  
  * *Inhalt:* Laufender sicherer Systembetrieb, Fehlermonitoring (Schnittstellen-Fehler beheben, bevor der Kunde es merkt), Server-Hosting, DSGVO-Sicherheits-Updates und 1 Inklusivstunde Support pro Monat. Sichert planbare, wiederkehrende Umsätze (MRR).  
  * *Preis:* 200 € pro Monat (wiederkehrend).

## **TEIL 2: DAS TECHNISCHE & RECHTLICHE PROFIL (Tech-Stack & Compliance)**

### **🛠️ 1. Definierter Tech-Stack (Der Werkzeugkasten)**

* **Prozess-Orchestrierung:** Fokus auf **No-Code/Low-Code-Automatisierung via Make.com** statt zeitaufwendigem Custom Coding. Dadurch minimieren wir Wartungsaufwand bei API-Änderungen von Drittanbietern drastisch.  
* **Betriebliches Backend (Infrastruktur):** **Google Workspace Business** als zentrale Cloud-Umgebung (E-Mail, Kalender, Drive). Einfache App-Ententwicklungen für interne oder Kundenzwecke erfolgen primär über **Google AppSheet** mit Google Sheets als Datenbank.  
* **Kern-Schnittstellen beim KMU-Kunden:** Primäre B2B-Anbindungen erfolgen an **Lexoffice** (Cloud-Buchhaltung) und das **DATEV-Ökosystem** (insb. DATEV Unternehmen Online / DUO) via die offiziellen DATEV-Datenservices (APIs).  
* **Künstliche Intelligenz:** Pragmatische Prozess-Integrationen über die **OpenAI API** (GPT-Modelle) unter striktem Verzicht auf das Training mit Kundendaten.

### **⚖️ 2. DSGVO-Compliance & IT-Sicherheits-Leitplanken**

* **Die Sandbox-Teststrategie (Eiserne Regel):** Es wird im Entwicklungs- und Testprozess **niemals mit echten Kundendaten** gearbeitet. Für alle Szenarien in Make.com werden isolierte Entwickler-Umgebungen (Sandbox-Zugänge) von Lexoffice, DATEV und Co. verwendet, um Haftungsrisiken auf null zu reduzieren.  
* **Server-Standorte & AVV-Kette:** Für Make.com ist die **EU-Server-Option zwingend** vorgeschrieben. Mit allen Kern-Tools (Google, Make, OpenAI) werden lückenlose Auftragsverarbeitungsverträge (AVV) abgeschlossen, um die gesetzliche Datenschutz-Kette zum B2B-Kunden zu sichern.  
* **Rechtstexte & AGB-Schutzschild:** Absicherung über **eRecht24 Premium**. In den AGB wird eine strikte Haftungsbeschränkung für den Ausfall von Drittanbieter-APIs (z. B. Lexoffice-Störung) oder KI-Fehlentscheidungen (Halluzinationen) verankert.  
* **Hardware-Infrastruktur:** In der Initialphase Nutzung des privaten Laptops ausschließlich über einen **strikt getrennten, separat verschlüsselten Benutzer-Account**. Mit sensiblen Daten wird erst nach Bewilligung und Anschaffung des dedizierten, hardwareverschlüsselten Business-Laptops hantiert.

### **🏦 3. Schufa-unabhängiges Banken-Setup (UG-Schutzwall)**

* **Ausgangslage:** Aufgrund der privaten Verschuldung und der geplanten Privatinsolvenz des Gründers liegt ein negatives Schufa-Profil vor.  
* **Banken-Strategie:** Da die UG eine eigenständige juristische Person ist, blockiert die private Schufa die Gründung nicht zwingend, klassische Filialbanken lehnen die Kontoeröffnung jedoch oft ab.  
* **Fokus-Fintechs:** Die Eröffnung des UG-Geschäftskontos zur Einzahlung des Stammkapitals wird gezielt über schufa-freundliche B2B-Fintech-Plattformen wie **Finom oder Qonto** abgewickelt, die in der Gründungs-Praxis bei dieser Konstellation die geringsten Hürden aufweisen.

## **TEIL 3: DIE SHOWCASE- & PARTNER-PIPELINE (Vertriebs-Hebel)**

### **🧼 1. Das Pilotprojekt „GoClean Harz“ (Proof Asset #1)**

* **Das Pilot-Unternehmen:** Das Gebäubedienstleistungsunternehmen (Unterhaltsreinigung, Gartenpflege, Winterdienst) des Bruders des Gründers („GoClean Harz“ im Raum Langelsheim/Goslar).  
* **Die strategische Rolle („Dogfooding“):** Dient als internes, geschütztes Testfeld, um ohne Risiko für Fremdkunden reale Automatisierungs-Architekturen live zu implementieren, Fehler abzufangen und n8n/Make-Szenarien zu optimieren.  
* **Der geplante Fokus-Workflow:** Vollautomatischer, mobiler Beleg- und Leistungsnachweis-Workflow für Reinigungskräfte und Winterdienst-Mitarbeiter vor Ort. Die Mitarbeiter tragen Daten per Smartphone ein; das System erstellt im Hintergrund fehlerfreie Lexoffice-Rechnungsentwürfe und stößt die GoBD-konforme Archivierung an.  
* **Das Ziel-Asset (Case Study):** Generierung einer harten, unanfechtbaren Vorher-Nachher-Fallstudie (z. B. *„Büroaufwand von 5 Stunden pro Woche auf 10 Minuten reduziert“*). Dieses visuelle Proof Asset wird auf dem Tablet bei der Kaltakquise als unschlagbarer Vertrauensbeweis genutzt.

### **📊 2. Die Multiplikatoren-Strategie (Steuerberater-Hebel)**

* **Das Kanzlei-Problem:** Regional ansässige Steuerberater im Harz leiden massiv unter unvollständigen, unstrukturierten oder verspätet eingereichten Belegen ihrer Handwerker- und KMU-Mandanten. Dies erzeugt in den Kanzleien einen enormen, unproduktiven Nacharbeits-, Prüfungs- und Korrekturaufwand in der Fibu.  
* **Unser Lösungsangebot für Kanzleien:** „KMU Service Harz“ korrigiert das Problem direkt an der Wurzel – im Betrieb des Mandanten. Wir automatisieren die vorbereitende Buchhaltung über Schnittstellen so, dass Daten und Belegbilder vollautomatisch und lückenlos über die DATEV Datenservices (APIs) nach *DATEV Unternehmen Online (DUO)* fließen.  
* **Das ICP der Partner-Kanzleien:** Gezielte Ansprache von Kanzleien in Goslar, Wernigerode und Halberstadt, die offensiv mit *DATEV Unternehmen Online* werben oder als „Digitale Kanzlei“ zertifiziert sind.  
* **Die Win-Win-Logik:** Der Steuerberater wird von administrativem Chaos befreit und empfiehlt uns im Gegenzug als regionalen, verlässlichen Umsetzungspartner aktiv an seine Mandanten weiter.

## **TEIL 4: VERKAUFS-PHILOSOPHIE & EINWAND-LEITFADEN (Sales-Schutzschild)**

### **🤝 1. Unsere Vertriebs-Philosophie**

* **Auf Augenhöhe statt IT-Elite:** Wir verkaufen keine abstrakten Technologie-Konzepte („Künstliche Intelligenz“, „Digitale Transformation“), sondern die Beseitigung von bürokratischem Frust. Wir sprechen die bodenständige Sprache des Harzer Handwerks, arbeiten mit Festpreisen und verzichten vollständig auf manipulative Vertriebstricks.

### **🛡️ 2. Die Top 3 Handwerker-Einwände & psychologischen Konter**

* **Einwand 1: „Ich habe keine Zeit / Land unter im Betrieb.“**  
  * *Hintergrund:* Akuter Fachkräftemangel führt dazu, dass Inhaber selbst auf der Baustelle stehen und Sonntage im Büro verbringen.  
  * *Strategischer Konter:* Wertschätzung zeigen. *„Genau deshalb melde ich mich. Mein Ziel ist nicht, Ihnen ein neues Software-Projekt aufzuhalsen, für das Sie wochenlang geschult werden müssen. Wir klinken uns lautlos in Ihre bestehenden Tools ein, um genau diese 30 Stunden Papierkram im Monat von Ihren Schultern zu holen.“*  
* **Einwand 2: „Wir sind ein kleiner Familienbetrieb, wir brauchen sowas nicht.“**  
  * *Hintergrund:* Angst vor überdimensionierter Konzern-IT und unkalkulierbaren Kosten.  
  * *Strategischer Konter:* Fokus auf Gesetzesdruck. *„Verständlich. Uns geht es nicht um Großkonzern-Systeme. Aber ab 2025/2026 trifft die gesetzliche E-Rechnungspflicht im B2B jeden Betrieb im Harz, egal wie klein. Wir sorgen mit kleinen Festpreis-Quick-Wins dafür, dass Ihr Betrieb formell sicher bleibt, ohne dass Sie Ihren Alltag umstellen müssen.“*  
* **Einwand 3: „Schicken Sie mir erst mal Infomaterial / eine E-Mail.“**  
  * *Hintergrund:* Klassischer höflicher Abwimmel-Einwand, um Zeit zu gewinnen.  
  * *Strategischer Konter:* Umlenkung auf das Audit. *„Das mache ich gern. Da wir aber keine Standard-Software von der Stange verkaufen, steht in den Broschüren nur Allgemeines. Lassen Sie uns stattdessen kurz 10 Minuten unverbindlich auf Ihre aktuellen Workflows schauen – danach wissen Sie präzise, an welchen Stellen Ihr Betrieb konkret Zeit verliert.“*

## **TEIL 5: INTERNES TECH-SETUP & „FOUNDER OS“-APP (Eigene Organisation)**

### **📱 1. Das Konzept deiner Steuerungs-Anwendung**

* **Das Projekt:** Um das eigene Business fehlerfrei zu steuern und Routineaufgaben als Gründer zu minimieren, wird im Modus des „Vibe Coding“ über Google AI Studio / Project IDX eine maßgeschneiderte Steuerungs-App gebaut.  
* **Kernmodule der Anwendung:**  
  * *Zentrales Dashboard:* Tägliche Übersicht der anstehenden Aufgaben, aktuellen Termine und Status-Pipelines.  
  * *Prompt- & Code-Vault:* Eine strukturierte Verwaltung, um funktionierende System-Prompts und n8n/Make-Codebausteine zu speichern, geräteübergreifend abzurufen und kontinuierlich zu verfeinern.  
  * *Brain-Dump & Action-Plan:* Eine geräteübergreifende (PC & Smartphone) Notiz- und To-Do-Funktion zur sofortigen Erfassung von Ideen und deren Überführung in konkrete Tagesprioritäten.  
  * *Local Network CRM:* Abbildung der Kunden-Pipeline (Erstgespräch → Ist-Analyse → Angebot → Fördermittelantrag → Umsetzung) sowie ein Verzeichnis regionaler Multiplikatoren (DATEV-Kanzleien).

### **🤖 2. Lokale KI-Infrastruktur & API-Kosten-Optimierung**

* **Die Hybrid-Lösung:** Einfache Texttransformationen, Logbuch-Vorsortierungen und Prompt-Voroptimierungen werden über ein **lokales KI-Modell** direkt auf der Hardware des Gründers (MSI Thin 12BU Laptop) ausgeführt. Die kostenpflichtige Cloud-API wird nur für hochkomplexe, geschäftskritische Logik-Anfragen zugeschaltet.

## **TEIL 6: DIE MEILENSTEIN-MATRIX (Operativer Status Quo)**

### **✅ 1. Erledigte Meilensteine (Das Fundament steht)**

* **Umfassende Markt- & Zielgruppenanalyse:** Potenzial im ländlichen Mittelstand (speziell Handwerk, Praxen, Gebäudedienstleister) im Harz validiert.  
* **Wettbewerbs- & White-Space-Analyse:** Trennscharfe Abgrenzung zu klassischen IT-Systemhäusern vollzogen; Positionierung als „Der pragmatische Prozess-Befreier“ steht.  
* **Angebots- & Pricing-Design:** Das dreistufige Modell der produktisierten Dienstleistungen (*Productized Services* via Audit, Setup und Managed-Automation-Retainer) ist finalisiert.  
* **Businessplan (Textteil):** Die strategische Ausarbeitung inklusive Executive Summary und Go-to-Market-Plan ist zu 100 % abgeschlossen.  
* **Finanzplanung (Roh-Kalkulation):** Konservatives Wachstumsszenario berechnet und die extrem schlanke Fixkostenstruktur von maximal 350 €/Monat definiert.

### **⚠️ 2. Aktuelle Blockaden & Blinde Flecken (Die ehrliche Realität)**

* **Die „Analysis Paralysis“-Falle:** Gefahr des Verettelns in immer tieferen theoretischen Recherchen und Konzeptschleifen, statt die operative PS auf die Straße zu bringen.  
* **Formelle Compliance (Jobcenter):** Aufgrund der gesetzlichen Bedingungen für das Einstiegsgeld und den Gründungszuschuss darf der formelle, gewerbliche Markteintritt noch nicht vollzogen werden, bis die Freigabe erteilt ist.  
* **Die Cashflow-Falle (Vorzeitiger Maßnahmebeginn):** Bei Kundenprojekten, die über Landes-Digitalboni gefördert werden sollen, drohen wochenlange Wartezeiten bis zur Bewilligung. Es besteht die Gefahr einer Liquiditätsblockade, wenn kein ungefördertes Einstiegsangebot („Quick-Win“) vorgeschaltet wird.  
* **Hardware-Verschlüsselung & DSGVO-Risiko:** Der finale Start mit echten Kundendaten (DATEV/Lexoffice) erfordert ein dediziertes, hardwareverschlüsselten Business-Notebook. Der geplante Sachmittelzuschuss des Jobcents steht hierfür noch aus.

## **TEIL 7: OPERATIVE TO-DO-LISTE (Sachen, die zu erledigen sind)**

* **[ ] [Prio 1] Argumentations-Übersicht für den Coach erstellen (UG vs. Einzelunternehmen):** Knallharte Gegenüberstellung ausarbeiten, warum ein Einzelunternehmen wegen der privaten Verschuldung/Insolvenz-Thematik das Business sofort killen würde und warum die UG der einzig tragfähige Schutzwall ist. *(Hausaufgabe für den Coach!)*  
* **[ ] [Prio 2] Pricing-Sparring vorbereiten:** Da der Coach die Preistreppe (500 € / 2.000 € / 200 €) im Erstgespräch gesehen, aber noch nicht tiefergehend besprochen hat, muss hierzu ein roter Faden für das nächste Meeting gelegt werden.  
* **[ ] [Prio 3] Jobcenter-Sachmittel-Spezifikation:** Exakte Begründung formulieren, warum für die Arbeit mit DATEV- und Lexoffice-Kundendaten ein dedizierter, hardwareverschlüsselter Business-Laptop rechtlich zwingend nötig ist (Sachmittelzuschuss).

## **TEIL 8: CHRONOLOGISCHES GRÜNDUNGS-LOGBUCH**

### **📝 Eintrag vom 11.07.2026: Erstes Beratungsgespräch mit dem Gründungscoach**

* **Status Quo der Besprechung:** Das grundlegende Konzept von „KMU Service Harz“ wurde dem Coach vorgestellt. Er hat die vorgeschlagene Angebots- und Preisstruktur bereits visuell wahrgenommen, eine inhaltliche Diskussion und Detailprüfung der Preise steht jedoch beim nächsten Termin noch aus.  
* **Zentraler Diskussionspunkt (Rechtsform):** Es kam die kritische Frage auf, warum die Gründung als UG und nicht als einfaches Einzelunternehmen geplant ist. Da hier im Termin noch kein detaillierter, rechtssicherer Konsens gefunden wurde, wurde dies als Kernaufgabe definiert.  
* **Definierte Next Steps / Vereinbarte Hausaufgaben:**  
  1. Ausarbeitung einer unanfechtbaren Übersicht zur Rechtsformwahl im Kontext einer privaten Verschuldung/Insolvenz.  
  2. Vorbereitung des tiefergehenden Pricing-Sparrings für den Folgetermin.

## **TEIL 9: DYNAMISCHE STRATEGIE-VARIABLEN (Noch auszufüllen)**

*Hinweis für die KI: Die folgenden Felder spiegeln Variablen wider, die sich im Laufe der operativen Umsetzung konkretisieren und schrittweise im Dokument überschrieben werden.*

### **⏳ 1. Offene Variablen zur Angebots- & Preisstruktur (Teil 1)**

* **Preisanpassungen nach Coach-Sparring:** \`[Fokus für das nächste Meeting: Werden die Sätze von 500 € / 2.000 € / 200 € vom Berater freigegeben oder angepasst?]\`  
* **Geplantes Gründungsdatum (Gewerbe-Anmeldung):** \`[Hier das exakte Datum eintragen, sobald das Jobcenter grünes Licht gibt]\`  
* **Definiertes Stammkapital der UG:** \`[Echtes Stammkapital bei Bar-Einbringung eintragen – z. B. 500 € oder 1.000 €]\`

### **⏳ 2. Offene Variablen zu Behörden & formellem Setup (Teil 2)**

* **Gewähltes B2B-Geschäftskonto:** \`[Noch offen – engere Auswahl: Finom oder Qonto (wird nach Notartermin fixiert)]\`  
* **Beauftragtes Notariat:** \`[Name der Kanzlei und Ort eintragen, sobald der Termin zur UG-Errichtung steht]\`  
* **Gewerbeamt / Handelsregister-Aktenzeichen:** \`[HRB-Nummer nach Eintragung durch das Amtsgericht eintragen]\`  
* **Gewerbliche IT-Betriebshaftpflicht:** \`[Name des Versicherers und monatliche Prämie nach Abschluss hinterlegen]\`

### **⏳ 3. Offene Variablen zum Pilotprojekt „GoClean Harz“ (Teil 3)**

* **Konkrete Software-Infrastruktur des Bruders:** \`[Name der Reinigungs-/Handwerkersoftware eintragen, die dort aktuell für Angebote und Rechnungen genutzt wird]\`  
* **Reale Zeitersparnis im Workflow:** \`[Hier nach Live-Gang messen und eintragen – z. B.: Zeitbedarf für Fibu sank von 4 Std./Woche auf 15 Min./Woche]\`  
* **Kunden-Feedback / Zitat des Bruders:** \`[Hier ein echtes, bodenständiges Lob eintragen, das du auf Webseiten und Flyern zitieren kannst]\`

### **⏳ 4. Offene Variablen zur regionalen Kanzlei- & Vertriebs-Pipeline (Teil 3/4)**

* **Fokus-Kanzleien (DATEV-Multiplikatoren in der Region Harz):**  
  * Kanzlei 1: \`[Name / Standort]\` | Status: \`[Noch nicht kontaktiert / Erstkontakt vorbereiten]\`  
  * Kanzlei 2: \`[Name / Standort]\` | Status: \`[Noch nicht kontaktiert]\`  
  * Kanzlei 3: \`[Name / Standort]\` | Status: \`[Noch nicht kontaktiert]\`  
* **Unerwartete Kundeneinwände aus der Praxis:** \`[Hier im operativen Vertrieb neu auftauchende Bedenken von Handwerkern eintragen, um im Chat maßgeschneiderte, druckfreie Konter-Skripte zu entwickeln]\`

### **⏳ 5. Offene Variablen zum formellen Gründungsfortschritt (Teil 6)**

* **Status Beantragung Einstiegsgeld:** \`[Beantragt am: Datum]\` | Status: \`[In Vorbereitung / In Prüfung]\`  
* **Status Tragfähigkeitsbescheinigung:** \`[Ausgestellt durch fachkundige Stelle: Name/Institution]\` | Status: \`[In Bearbeitung – Businessplan liegt vor]\`  
* **Status Jobcenter-Sachmittelzuschuss (Verschlüsseltes Notebook):** \`[Beantragt am: Datum]\` | Status: \`[Warten auf Bewilligung]\`

#### **TEIL 10: OPEN QUESTIONS & BRAIN-DUMP (Der schnelle Notizzettel)**

*Ergänze hier einfach eine Liste von Fragen, die dir zwischendurch einfallen, damit du sie nicht vergisst.*

* *Frage:* „Wie genau stelle ich die DATEV-Schnittstelle für meinen Bruder sicher?“  
* *Idee:* „Eventuell als Zweit-Modul eine KI-Sprachnotiz-App für Handwerker bauen, die direkt auf die Baustelle passt?“  
* *Notiz:* „Checken, ob X ein passender Partner ist.“

#### **TEIL 11: „SKILL-VAULT“ (Technisches & Prompt-Archiv)**

*Hier speicherst du deine besten Prompts und technischen Anleitungen.*

* **Top-Prompts:** „Wie ich mein Audit verkaufe“, „Einwandbehandlung Handwerker“.  
* **Technische Anleitungen:** Schritt-für-Schritt Anleitung, wie du ein neues Make-Szenario für einen Kunden sauber aufsetzt.`;

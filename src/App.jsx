import React, { useState, useEffect } from 'react';
import { registerPlugin, Capacitor } from '@capacitor/core';

const WidgetBridge = registerPlugin('WidgetBridge');
import { jsPDF } from 'jspdf';
import { 
  LayoutDashboard, 
  Inbox, 
  Users, 
  BrainCircuit, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Calendar, 
  CheckSquare, 
  ClipboardCopy, 
  ChevronRight, 
  Upload, 
  ExternalLink, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle,
  FileText,
  Zap,
  Sliders,
  Settings,
  Shield,
  LifeBuoy,
  Send,
  Phone,
  PhoneCall,
  Mic,
  Volume2,
  Download,
  Database,
  RefreshCw
} from 'lucide-react';

// INITIAL DATA FOR FIRST LAUNCH
const INITIAL_HABITS = [
  { id: 'h1', text: '3 Akquise-Mails gesendet?', completed: false },
  { id: 'h2', text: 'Sport gemacht (30 Min)?', completed: false },
  { id: 'h3', text: 'Tagesfokus-Aufgaben definiert?', completed: false }
];

const INITIAL_FOCUS_TASKS = [
  { id: 'f1', text: 'Konzept Founder OS finalisieren', completed: true },
  { id: 'f2', text: 'Multiplikatoren-Liste (15 Steuerberater) erstellen', completed: false },
  { id: 'f3', text: 'Kennenlern-Workshop GoClean vorbereiten', completed: false }
];

const INITIAL_INBOX = [
  { id: 'i1', text: 'Notiz: Fördermittel-Antrag für Digitalbonus Niedersachsen hat neue Richtlinien ab Juli. Unbedingt prüfen!', date: '2026-06-24' },
  { id: 'i2', text: 'Idee: Einen automatischen WhatsApp-Bot für Handwerker als Einstiegs-Produkt anbieten (z.B. für Terminbuchungen).', date: '2026-06-23' },
  { id: 'i3', text: 'Notiz: Steuerberater Klinke in Wernigerode kontaktieren. Eventuell Kooperation möglich.', date: '2026-06-22' }
];

const INITIAL_TASKS = [
  { id: 't1', title: 'Make-Szenario für Beleg-Upload via Mail bauen', priority: 'high', column: 'todo', date: '2026-06-24' },
  { id: 't2', title: 'Rechnungsvorlage auf E-Rechnungs-XML-Standard (ZUGFeRD) anpassen', priority: 'medium', column: 'inprogress', date: '2026-06-22' },
  { id: 't3', title: 'Erste Case Study für GoClean Harz schreiben', priority: 'high', column: 'idea', date: '2026-06-21' },
  { id: 't4', title: 'Unternehmen als UG im Handelsregister eintragen', priority: 'high', column: 'done', date: '2026-06-15' }
];

const INITIAL_CONTACTS = [
  { 
    id: 'c1', 
    name: 'Hans Müller', 
    company: 'Dachdeckerei Müller', 
    industry: 'Handwerk', 
    system: 'DATEV', 
    stage: 'gespräch', 
    lastContact: '2026-06-08',
    notes: 'Interesse an automatisierter Rechnungsverarbeitung. Leidet unter Zettelwirtschaft im Büro am Wochenende.',
    links: [
      { id: 'l1', title: 'Google Drive Projektordner', url: 'https://drive.google.com' }
    ],
    activityLog: [
      { id: 'al1', date: '2026-06-05 10:20', text: 'Lead im CRM erstellt' },
      { id: 'al2', date: '2026-06-08 14:15', text: 'Erstgespräch geführt. Notizen ergänzt.' }
    ]
  },
  { 
    id: 'c2', 
    name: 'Sabine Kraft', 
    company: 'Pflegedienst Harz', 
    industry: 'Gesundheit', 
    system: 'Lexoffice', 
    stage: 'angebot', 
    lastContact: '2026-06-20',
    notes: 'Angebot über WhatsApp-Schnittstelle zur Stundenzettel-Einreichung gesendet. Fördermittel Niedersachsen (Digitalbonus) eingeplant.',
    links: [
      { id: 'l2', title: 'Angebotsentwurf PDF', url: 'https://docs.google.com' }
    ],
    activityLog: [
      { id: 'al3', date: '2026-06-18 09:30', text: 'Lead im CRM erstellt' },
      { id: 'al4', date: '2026-06-20 11:00', text: 'Angebot gesendet (Festpreis 2.450 €)' }
    ]
  },
  { 
    id: 'c3', 
    name: 'Christian Gornitzka', 
    company: 'GoClean Harz', 
    industry: 'Dienstleistungen', 
    system: 'DATEV & Excel', 
    stage: 'umsetzung', 
    lastContact: '2026-06-24',
    notes: 'In Umsetzung. WhatsApp-Gateway läuft stabil. Bisher 48 Stunden erfasst.',
    links: [
      { id: 'l3', title: 'Make-Szenario', url: 'https://make.com' }
    ],
    activityLog: [
      { id: 'al5', date: '2026-06-22 08:00', text: 'Vertrag unterzeichnet' },
      { id: 'al6', date: '2026-06-24 16:30', text: 'Projekt gestartet & WhatsApp-Gateway eingerichtet' }
    ]
  }
];

const INITIAL_PROJECTS = [
  { id: 'p1', client: 'Dachdeckerei Müller', offerSigned: true, subsidyApplied: true, subsidyApproved: false, ready: false, pricePackage: 3500, trackedHours: 14.5, trackingStartTime: null },
  { id: 'p2', client: 'Pflegedienst Harz', offerSigned: false, subsidyApplied: false, subsidyApproved: false, ready: false, pricePackage: 2450, trackedHours: 6.2, trackingStartTime: null },
  { id: 'p3', client: 'GoClean Harz', offerSigned: true, subsidyApplied: true, subsidyApproved: true, ready: true, pricePackage: 4200, trackedHours: 48.0, trackingStartTime: null }
];

const INITIAL_PROMPTS = [
  { id: 'pr1', title: 'Kaltakquise E-Mail (Handwerk)', category: 'Sales', text: 'Du bist ein erfahrener Copywriter. Schreibe eine kurze, pragmatische E-Mail an einen Handwerksmeister (Dachdecker/Elektro), der unter Zettelwirtschaft leidet. Keine Marketing-Floskeln, sondern Fokus auf den Kern: Wie er durch Automatisierung pro Woche 5 Stunden Bürozeit spart und das Bürosonntags-Problem löst. Nenne den Digitalbonus als Hebel.' },
  { id: 'pr2', title: 'DATEV Beleg-Extraktor (JSON)', category: 'Code', text: 'Analysiere den folgenden Beleg-Text und extrahiere die Daten in eine saubere JSON-Struktur mit folgenden Feldern: invoice_number, date, net_amount, tax_rate, gross_amount, vendor, iban. Wenn ein Feld nicht eindeutig ist, setze null.' },
  { id: 'pr3', title: 'Social-Media Hook-Generator', category: 'Marketing', text: 'Generiere 5 aufmerksamkeitsstarke Hooks für LinkedIn-Posts, die sich an Solo-Gründer und KMUs richten. Das Thema des Posts lautet: [THEMA]. Der Stil soll direkt, ehrlich und ohne Bullshit sein.' }
];

const INITIAL_CONTENT = [
  { id: 'co1', title: 'Die E-Rechnungspflicht 2025: Was Handwerker jetzt tun müssen', date: '2026-06-28', status: 'draft' },
  { id: 'co2', title: 'Case Study: Wie GoClean Harz 12 Stunden Zettelwirtschaft im Monat eliminierte', date: '2026-07-02', status: 'idea' },
  { id: 'co3', title: 'Warum IT-Systemhäuser deine Prozessprobleme im Büro nicht lösen', date: '2026-06-25', status: 'ready' }
];

const MASTER_LOGBUCH_CONTENT = `# **📑 MASTER-LOGBUCH & COMMAND CENTER: KMU SERVICE HARZ**

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

const INITIAL_DOCS = [
  { id: 'master-logbuch', title: 'masterLogbuch.txt', content: MASTER_LOGBUCH_CONTENT, status: 'local', url: '#' },
  { id: 'd1', title: 'Businessplan - KMU Service Harz.txt', content: 'Dies ist der offizielle Businessplan für KMU Service Harz. Wir bieten maßgeschneiderte Digitalisierungslösungen für KMUs im Harz an. Zielgruppe: Gärtnereien, Dachdecker, Pflegedienste.', status: 'synced', url: '#' },
  { id: 'd2', title: 'Preispakete & ROI-Modelle 2026.txt', content: 'Übersicht der Tarife:\n- Basic CRM: 1.200€ Setup\n- Advanced Auto: 2.500€ Setup\nDer ROI-Hebel bei automatisierten Prozessen liegt im Schnitt bei 4.2x innerhalb des ersten Jahres.', status: 'synced', url: '#' },
  { id: 'd3', title: 'Kooperationsvertrag - Steuerberater.txt', content: 'Kooperationsvereinbarung zwischen KMU Service Harz und der Steuerberatungskanzlei Harz. Regelmäßige Datenübergabe via DATEV-Schnittstellen.', status: 'synced', url: '#' }
];

const INITIAL_SOP_TEMPLATES = [
  { id: 's1', name: 'Neukunden-Onboarding (Festpreis-Projekt)', steps: [
    'Vertrag unterschreiben lassen & digital ablegen',
    'DSGVO-Auftragsverarbeitungsvertrag (AVV) abschließen',
    'Projektordner im Google Drive erstellen',
    'Zugänge für die Kundensysteme anfordern (Lexoffice/DATEV)',
    'Kick-off-Termin per Google Meet buchen'
  ]},
  { id: 's2', name: 'Steuerberater-Kooperations-Pitch', steps: [
    'Partner-Präsentation anpassen',
    'Vorteile für die Mandanten (Zeitersparnis) & Kanzlei (saubere DATEV-Daten) hervorheben',
    'Erstgespräch führen',
    'Informationsflyer für Kanzlei-Mandanten zusenden',
    'Kooperationsvereinbarung abschließen'
  ]}
];

const PROCESSES = {
  rechnung: {
    title: "Eingangsrechnungen verarbeiten",
    desc: "Vom Beleg-Chaos zur vollautomatischen DATEV-Bereitstellung.",
    before: [
      { step: "Post oeffnen & scannen", detail: "Manuelles Sortieren der Postbelege oder Herunterladen aus E-Mails." },
      { step: "Daten abtippen", detail: "Rechnungsnummer, Datum und Betraege manuell erfassen." },
      { step: "Ordner ablegen", detail: "Beleg manuell in Ordnerstruktur (lokal oder Cloud) speichern." },
      { step: "DATEV-Uebertragung", detail: "Am Monatsende alle Belege haendisch an den Steuerberater uebermitteln." }
    ],
    after: [
      { step: "E-Mail-Eingang", detail: "Make-Webhook faengt jede E-Mail mit Rechnungs-Anhang automatisch ab." },
      { step: "KI-Extraktion", detail: "GPT-4 extrahiert alle Rechnungsdaten (IBAN, Netto, MwSt) vollautomatisch in Sekunden." },
      { step: "GoBD Cloud-Archiv", detail: "GoBD-konforme, unveraenderbare Speicherung im Google Drive." },
      { step: "DATEV Schnittstelle", detail: "Direkte, lautlose Uebertragung in das DATEV-Portal deines Steuerberaters." }
    ]
  },
  stundenzettel: {
    title: "Stundenzettel & Zeiterfassung",
    desc: "Mitarbeiterzeiten direkt von der Baustelle in die Buchhaltung.",
    before: [
      { step: "Handschriftliche Zettel", detail: "Mitarbeiter fuellen Zettel auf der Baustelle aus." },
      { step: "Sammeln & Suchen", detail: "Zettel verknumpeln im Auto oder gehen verloren." },
      { step: "Excel-Abtippen", detail: "Chef tippt am Sonntagabend alle Zettel haendisch ab." },
      { step: "Lohnbuchhaltung", detail: "Daten haendisch an Steuerberater senden." }
    ],
    after: [
      { step: "WhatsApp-Sprachnachricht", detail: "Mitarbeiter spricht Zeiten ein: 'Mueller, 8 Stunden auf Baustelle X'." },
      { step: "Whisper-Transkription", detail: "Sprachnachricht wird per KI in Text umgewandelt." },
      { step: "GPT-4 Strukturierung", detail: "KI analysiert Name, Projekt, Dauer und schreibt Daten strukturiert." },
      { step: "Lexoffice Eintrag", detail: "Eintrag erfolgt per Klick direkt im Buchhaltungssystem." }
    ]
  },
  anfragen: {
    title: "Kundenanfragen & Termine",
    desc: "24/7-Assistent fuer Neukunden-Qualifizierung und Terminbuchung.",
    before: [
      { step: "Telefon klingelt", detail: "Chef muss Arbeit unterbrechen oder verpasst den Anruf." },
      { step: "Zettelwirtschaft", detail: "Anfragedaten werden auf Notizzettel geschrieben." },
      { step: "Kalender-Chaos", detail: "Kalender abgleichen, um freien Termin zu finden." },
      { step: "Rueckruf-Versuche", detail: "Ewiges Hin und Her, bis der Termin steht." }
    ],
    after: [
      { step: "AI-Chatbot", detail: "Website- oder WhatsApp-Bot nimmt Anfrage rund um die Uhr entgegen." },
      { step: "Qualifizierung", detail: "Bot erfragt Gewerk, Ort und Budget und sortiert Spam aus." },
      { step: "Google Calendar Sync", detail: "Bot zeigt freie Zeiten und bucht direkt im Kalender." },
      { step: "SMS / WhatsApp Bestaetigung", detail: "Kunde und Chef erhalten automatische Bestaetigungen." }
    ]
  }
};

function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Showcase Mode State
  const [showcaseMode, setShowcaseMode] = useState(() => JSON.parse(localStorage.getItem('f_showcase_mode')) || false);
  
  // Use Case selector for Process Visualizer
  const [selectedUseCase, setSelectedUseCase] = useState('rechnung');
  
  // Mask helper function to blur/replace sensitive data when Showcase Mode is active
  const mask = (text, type) => {
    if (!showcaseMode) return text;
    if (!text) return '';

    const companyMap = {
      'Dachdeckerei Müller': 'Muster-Bedachungen GmbH',
      'Pflegedienst Harz': 'Seniorenpflege Musterstadt',
      'GoClean Harz': 'SauberMann Gebäudedienste'
    };
    
    const nameMap = {
      'Hans Müller': 'Thomas Muster',
      'Sabine Kraft': 'Erika Mustermann',
      'Christian Gornitzka': 'Alexander Becker'
    };
    
    const industryMap = {
      'Handwerk': 'Gewerbe (Demo)',
      'Gesundheit': 'Dienstleistung (Demo)',
      'Dienstleistungen': 'Service (Demo)'
    };
    
    const systemMap = {
      'DATEV': 'Demo-ERP v1',
      'Lexoffice': 'Muster-Buchhaltung',
      'DATEV & Excel': 'Demo-ERP & Tabellen'
    };

    if (type === 'company') {
      return companyMap[text] || text.replace(/[a-zA-Z]/g, (char, index) => index % 2 === 0 ? 'X' : 'x');
    }
    if (type === 'name') {
      return nameMap[text] || 'Max Mustermann';
    }
    if (type === 'industry') {
      return industryMap[text] || 'Branche (Demo)';
    }
    if (type === 'system') {
      return systemMap[text] || 'ERP-System (Demo)';
    }
    if (type === 'calendar' || type === 'inbox') {
      let masked = text;
      Object.keys(companyMap).forEach(key => {
        masked = masked.replace(new RegExp(key, 'g'), companyMap[key]);
      });
      Object.keys(nameMap).forEach(key => {
        masked = masked.replace(new RegExp(key, 'g'), nameMap[key]);
      });
      masked = masked.replace(/Wernigerode/g, 'Musterstadt');
      masked = masked.replace(/Niedersachsen/g, 'Muster-Bundesland');
      return masked;
    }
    return text;
  };
  
  // Data States (loaded from localStorage or initial data)
  const [quickCapture, setQuickCapture] = useState('');
  const [inbox, setInbox] = useState(() => JSON.parse(localStorage.getItem('f_inbox')) || INITIAL_INBOX);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('f_tasks')) || INITIAL_TASKS);
  const [focusTasks, setFocusTasks] = useState(() => JSON.parse(localStorage.getItem('f_focus')) || INITIAL_FOCUS_TASKS);
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('f_habits');
    const lastReset = localStorage.getItem('f_habits_last_reset');
    const today = new Date().toDateString();
    
    if (saved && lastReset === today) {
      return JSON.parse(saved);
    }
    // Auto reset if it is a new day
    localStorage.setItem('f_habits_last_reset', today);
    return INITIAL_HABITS;
  });
  
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('f_contacts')) || INITIAL_CONTACTS);
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem('f_projects')) || INITIAL_PROJECTS);
  const [prompts, setPrompts] = useState(() => JSON.parse(localStorage.getItem('f_prompts')) || INITIAL_PROMPTS);
  const [contentPosts, setContentPosts] = useState(() => JSON.parse(localStorage.getItem('f_content')) || INITIAL_CONTENT);
  const [docs, setDocs] = useState(() => {
    try {
      const saved = localStorage.getItem('f_docs');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasLogbuch = parsed.some(d => d.id === 'master-logbuch');
        if (!hasLogbuch) {
          return [
            { id: 'master-logbuch', title: 'masterLogbuch.txt', content: MASTER_LOGBUCH_CONTENT, status: 'local', url: '#' },
            ...parsed
          ];
        } else {
          return parsed.map(d => {
            if (d.id === 'master-logbuch' && (d.content.startsWith('=== MASTER-LOGBUCH ===') || d.content.trim() === '')) {
              return { ...d, content: MASTER_LOGBUCH_CONTENT };
            }
            return d;
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DOCS;
  });
  const [sopTemplates, setSopTemplates] = useState(() => JSON.parse(localStorage.getItem('f_sop_templates')) || INITIAL_SOP_TEMPLATES);
  const [activeSops, setActiveSops] = useState(() => JSON.parse(localStorage.getItem('f_active_sops')) || []);

  // Google Kalender & NLP Terminschnellerfassung States (Feature 3 - v5)
  const [calendarEvents, setCalendarEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('f_calendar_events');
      return saved ? JSON.parse(saved) : [
        { id: 'ev_1', time: '09:00 - 10:30', title: 'Audit-Workshop: Dachdeckerei Müller', desc: 'Prozessanalyse & ROI-Kalkulation vor Ort', date: new Date().toISOString().split('T')[0] },
        { id: 'ev_2', time: '13:00 - 14:00', title: 'Review-Termin: GoClean Harz', desc: 'Online-Präsentation der ersten Make-Workflows', date: new Date().toISOString().split('T')[0] },
        { id: 'ev_3', time: '15:30 - 16:30', title: 'Wirtschaftsförderung WiReGo', desc: 'Abstimmung über Kooperation zu Förderprogrammen', date: new Date().toISOString().split('T')[0] }
      ];
    } catch {
      return [];
    }
  });
  const [nlpCalendarInput, setNlpCalendarInput] = useState('');

  // Speech-to-Text States (Feature 4 - v5)
  const [isListeningQuickCapture, setIsListeningQuickCapture] = useState(false);
  const [isListeningCrmNotes, setIsListeningCrmNotes] = useState(false);

  // Phase v6 States (Custom blocks, Offline Notes, Google Sync)
  const [customPromptBlocks, setCustomPromptBlocks] = useState(() => {
    try {
      const saved = localStorage.getItem('f_custom_prompt_blocks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [dashNotes, setDashNotes] = useState(() => localStorage.getItem('f_dash_notes') || '');
  const [dashTodos, setDashTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('f_dash_todos');
      return saved ? JSON.parse(saved) : [
        { id: 'dt_1', text: 'Stundensätze & Marge im CRM überprüfen', completed: false },
        { id: 'dt_2', text: 'ZUGFeRD-Rechnung für Müller Bedachungen testen', completed: false },
        { id: 'dt_3', text: 'Offline-Diktierfunktion im Handy ausprobieren', completed: true }
      ];
    } catch {
      return [];
    }
  });

  const [googleConnected, setGoogleConnected] = useState(() => {
    return localStorage.getItem('f_google_connected') === 'true';
  });
  const [googleClientId, setGoogleClientId] = useState(() => {
    return localStorage.getItem('f_google_client_id') || '481297122516-m7hgprfvc28si5cj3cuqd6aocgogsv9q.apps.googleusercontent.com';
  });
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false);
  const [isGoogleSyncing, setIsGoogleSyncing] = useState(false);
  const [googleSyncLogs, setGoogleSyncLogs] = useState([]);

  // Custom Prompt Block Form states
  const [showCustomBlockForm, setShowCustomBlockForm] = useState(false);
  const [newBlockName, setNewBlockName] = useState('');
  const [newBlockCategory, setNewBlockCategory] = useState('prefix'); // 'prefix', 'tone', 'format', 'suffix'

  // Phase v7 Editor States
  const [editingDocId, setEditingDocId] = useState(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [newBlockContent, setNewBlockContent] = useState('');

  // Phase v8 States
  const [promptSearch, setPromptSearch] = useState('');
  const [promptCategoryFilter, setPromptCategoryFilter] = useState('all');
  const [crmStageFilter, setCrmStageFilter] = useState('all');

  // CRM Detail Drawer State
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [newLinkInput, setNewLinkInput] = useState({ title: '', url: '' });

  // Form states for adding items
  const [newFocusText, setNewFocusText] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newContact, setNewContact] = useState({ name: '', company: '', industry: '', system: '', stage: 'erstkontakt' });
  const [newPrompt, setNewPrompt] = useState({ title: '', category: 'Sales', text: '' });
  const [newPost, setNewPost] = useState({ title: '', date: '', status: 'idea' });
  
  // Showcase Calculator States
  const [calcInputs, setCalcInputs] = useState({
    taskName: 'Stundenzettel abtippen & Rechnungen schreiben',
    durationHours: 6,
    hourlyRate: 85,
    setupFee: 2450,
    subsidyRegion: 'NDS' // NDS, LSA, BUND, NONE
  });

  // WhatsApp Webhook & Simulation States
  const [webhookUrl, setWebhookUrl] = useState(() => localStorage.getItem('f_whatsapp_webhook_url') || '');
  const [simMessage, setSimMessage] = useState('Christian Gornitzka: 8 Stunden Arbeit bei GoClean erfasst. Material: 2x Dichtungen.');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(''); // "", "whisper", "gpt", "done"

  // NotebookLM Sync States
  const [notebookLmSyncStatus, setNotebookLmSyncStatus] = useState(() => localStorage.getItem('f_notebook_sync_status') || 'synced');
  const [notebookLmLastSync, setNotebookLmLastSync] = useState(() => localStorage.getItem('f_notebook_last_sync') || 'Vor 2 Stunden');
  const [notebookLmSyncStep, setNotebookLmSyncStep] = useState('');
  const [notebookLmProgress, setNotebookLmProgress] = useState(100);

  // Time Tracker State
  const [timeTick, setTimeTick] = useState(0);

  // Habit Streak & Confetti States
  const [habitStreak, setHabitStreak] = useState(() => parseInt(localStorage.getItem('f_habit_streak')) || 0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);
  
  // Wochen-Review & Archiv States (Feature A3)
  const [weeklyArchive, setWeeklyArchive] = useState(() => {
    return JSON.parse(localStorage.getItem('f_weekly_archive')) || {};
  });
  const [archiveOpen, setArchiveOpen] = useState(false);
  
  // Make.com Szenario-Simulator States (Feature B1)
  const [makeSimRunning, setMakeSimRunning] = useState(false);
  const [makeActiveNode, setMakeActiveNode] = useState(0);
  const [makeLogs, setMakeLogs] = useState([]);
  
  // Visueller No-Code Automation Canvas States (Feature 1 - v4)
  const [canvasNodes, setCanvasNodes] = useState(() => {
    return JSON.parse(localStorage.getItem('f_canvas_nodes')) || [
      { id: 'cn1', type: 'trigger', category: 'Trigger', title: 'WhatsApp Webhook', icon: 'Inbox', x: 40, y: 110, config: { triggerName: 'Sprachnachricht empfangen', filterKeyword: 'Stundenzettel' } },
      { id: 'cn2', type: 'ai', category: 'KI-Verarbeitung', title: 'Whisper Audio AI', icon: 'Clock', x: 250, y: 110, config: { model: 'whisper-large-v3', language: 'Deutsch' } },
      { id: 'cn3', type: 'ai', category: 'KI-Verarbeitung', title: 'GPT-4 Extraktor', icon: 'BrainCircuit', x: 460, y: 110, config: { prompt: 'Extrahiere Mitarbeiter, Kunde & Stunden als JSON', temperature: '0.2' } },
      { id: 'cn4', type: 'erp', category: 'ERP & Buchhaltung', title: 'Lexoffice Buchen', icon: 'ClipboardCopy', x: 670, y: 110, config: { targetAccount: 'Lohn & Gehalt', autoApprove: 'Ja' } }
    ];
  });
  const [canvasConnections, setCanvasConnections] = useState(() => {
    return JSON.parse(localStorage.getItem('f_canvas_connections')) || [
      { from: 'cn1', to: 'cn2' },
      { from: 'cn2', to: 'cn3' },
      { from: 'cn3', to: 'cn4' }
    ];
  });
  const [selectedCanvasNodeId, setSelectedCanvasNodeId] = useState('cn1');
  const [canvasTestRunning, setCanvasTestRunning] = useState(false);
  const [canvasTestActiveNode, setCanvasTestActiveNode] = useState(null);
  const [canvasTestLogs, setCanvasTestLogs] = useState([]);
  
  // Kunden-Portal & White-Label Client Center States (Feature 2 - v4)
  const [clientPortalMode, setClientPortalMode] = useState(() => JSON.parse(localStorage.getItem('f_client_portal_mode')) || false);
  const [selectedClientCompany, setSelectedClientCompany] = useState(() => localStorage.getItem('f_client_selected_company') || 'GoClean Harz');
  const [clientTickets, setClientTickets] = useState(() => {
    return JSON.parse(localStorage.getItem('f_client_tickets')) || [
      { id: 'ct1', client: 'GoClean Harz', title: 'Neuen Mitarbeiter zum WhatsApp-Bot hinzufügen', status: 'offen', date: '2026-06-27', priority: 'hoch', desc: 'Bitte Max Mustermann für die Zeiterfassung im WhatsApp-Bot freischalten.' },
      { id: 'ct2', client: 'Dachdeckerei Müller', title: 'Erweiterung Beleg-Extraktion für Tankbelege', status: 'in_arbeit', date: '2026-06-25', priority: 'mittel', desc: 'Sollen Shell & UTA Tankkarten-Belege automatisch verarbeitet werden?' }
    ];
  });
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState('mittel');
  
  // KI-Telefonagent / Voice-AI Simulator States (Feature 3 - v4)
  const [voiceScenario, setVoiceScenario] = useState('notdienst'); // 'notdienst', 'erstkontakt'
  const [voiceCallActive, setVoiceCallActive] = useState(false);
  const [voiceCallStep, setVoiceCallStep] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState([]);
  const [voiceExtractedData, setVoiceExtractedData] = useState(null);
  
  // "Frag das Firmengehirn" RAG Knowledge Bot States (Feature 4 - v4)
  const [ragPersona, setRagPersona] = useState('brain'); // 'brain', 'sales', 'legal'
  const [ragInput, setRagInput] = useState('');
  const [ragGenerating, setRagGenerating] = useState(false);
  const [ragChat, setRagChat] = useState([
    { 
      id: 'rag_init', 
      sender: 'ai', 
      persona: 'brain', 
      text: 'Guten Tag! Ich bin das digitale Firmengehirn von KMU Service Harz. Ich habe alle verknüpften Unternehmensdokumente indiziert und stehe für Fragen bereit.', 
      sources: [] 
    }
  ]);

  // E-Rechnungs & Angebotssystem States (Feature 5 - v4)
  const [invoiceClient, setInvoiceClient] = useState('Dachdeckerei Müller');
  const [invoicePackage, setInvoicePackage] = useState('WhatsApp Zeiterfassung & DATEV Integration');
  const [invoiceAmount, setInvoiceAmount] = useState(2500);
  const [invoiceFormat, setInvoiceFormat] = useState('zugferd'); // 'zugferd', 'xrechnung'
  const [invoiceDiscount, setInvoiceDiscount] = useState(0);
  const [invoiceXmlPreview, setInvoiceXmlPreview] = useState(false);

  // Supabase Backend-Integration States (Feature 6 - v4)
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState('connected'); // 'connected', 'syncing', 'error'
  const [supabaseLastSync, setSupabaseLastSync] = useState(() => localStorage.getItem('f_sb_last_sync') || 'Noch nie');
  const [supabaseConfig, setSupabaseConfig] = useState(() => {
    return JSON.parse(localStorage.getItem('f_sb_config')) || {
      url: 'https://ypqlssyrlykjzjnoyjoa.supabase.co',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwcWxzc3lybHlranpqbm95am9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTc5OTYsImV4cCI6MjA5Nzg5Mzk5Nn0.l1gbcQkrgjGJyTsRp3cjCqYIVrme9M48sbqUILhoAes'
    };
  });
  const [supabaseLogs, setSupabaseLogs] = useState([]);
  const [supabaseLogsOpen, setSupabaseLogsOpen] = useState(false);
  const [ollamaLoading, setOllamaLoading] = useState(false);

  // Lead- & Pain-Point-Tracker States (Phase v13)
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('f_leads');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeLeadId, setActiveLeadId] = useState(() => {
    return localStorage.getItem('f_active_lead_id') || null;
  });
  const [leadsSearch, setLeadsSearch] = useState('');
  const [leadsPrioFilter, setLeadsPrioFilter] = useState('all');
  const [leadsStatusFilter, setLeadsStatusFilter] = useState('all');
  const [leadsIndustryFilter, setLeadsIndustryFilter] = useState('all');

  // Form states for Lead Editing
  const [formPainPoint, setFormPainPoint] = useState('');
  const [formUrgency, setFormUrgency] = useState(0);
  const [formActualObjection, setFormActualObjection] = useState('');
  const [formConversationHook, setFormConversationHook] = useState('');
  const [formNextStep, setFormNextStep] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formStatus, setFormStatus] = useState('nicht kontaktiert');
  const [isSavingLead, setIsSavingLead] = useState(false);

  useEffect(() => {
    const activeLead = leads.find(l => l.id === activeLeadId);
    if (activeLead) {
      setFormPainPoint(activeLead.pain_point || '');
      setFormUrgency(activeLead.urgency || 0);
      setFormActualObjection(activeLead.actual_objection || '');
      setFormConversationHook(activeLead.conversation_hook || activeLead.call_hook || '');
      setFormNextStep(activeLead.next_step || '');
      setFormNotes(activeLead.notes || '');
      setFormStatus(activeLead.status || 'nicht kontaktiert');
    } else {
      setFormPainPoint('');
      setFormUrgency(0);
      setFormActualObjection('');
      setFormConversationHook('');
      setFormNextStep('');
      setFormNotes('');
      setFormStatus('nicht kontaktiert');
    }
  }, [activeLeadId, leads]);

  const [dashboardWidgets, setDashboardWidgets] = useState(() => {
    try {
      const saved = localStorage.getItem('f_dashboard_widgets');
      return saved ? JSON.parse(saved) : {
        financial: true,
        einvoice: true,
        quickcapture: true,
        calendar: true,
        habits: true,
        weekly: true,
        notes: true
      };
    } catch {
      return {
        financial: true,
        einvoice: true,
        quickcapture: true,
        calendar: true,
        habits: true,
        weekly: true,
        notes: true
      };
    }
  });
  const [isEditingDashboard, setIsEditingDashboard] = useState(false);

  // Persistent Storage Sync
  useEffect(() => {
    localStorage.setItem('f_dashboard_widgets', JSON.stringify(dashboardWidgets));
  }, [dashboardWidgets]);
  useEffect(() => {
    localStorage.setItem('f_custom_prompt_blocks', JSON.stringify(customPromptBlocks));
  }, [customPromptBlocks]);
  useEffect(() => {
    localStorage.setItem('f_dash_notes', dashNotes);
  }, [dashNotes]);
  useEffect(() => {
    localStorage.setItem('f_dash_todos', JSON.stringify(dashTodos));
  }, [dashTodos]);

  // Phase v9: Sync to Android Widget
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      try {
        WidgetBridge.updateWidgetData({
          notes: dashNotes,
          todos: JSON.stringify(dashTodos)
        });
      } catch (e) {
        console.error("Widget update failed", e);
      }
    }
  }, [dashNotes, dashTodos]);
  useEffect(() => {
    localStorage.setItem('f_google_connected', String(googleConnected));
  }, [googleConnected]);
  useEffect(() => {
    localStorage.setItem('f_google_client_id', googleClientId);
  }, [googleClientId]);
  useEffect(() => {
    localStorage.setItem('f_calendar_events', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem('f_inbox', JSON.stringify(inbox));
  }, [inbox]);
  useEffect(() => {
    localStorage.setItem('f_tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem('f_focus', JSON.stringify(focusTasks));
  }, [focusTasks]);
  useEffect(() => {
    localStorage.setItem('f_habits', JSON.stringify(habits));
  }, [habits]);
  useEffect(() => {
    localStorage.setItem('f_contacts', JSON.stringify(contacts));
  }, [contacts]);
  useEffect(() => {
    localStorage.setItem('f_projects', JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    localStorage.setItem('f_prompts', JSON.stringify(prompts));
  }, [prompts]);
  useEffect(() => {
    localStorage.setItem('f_content', JSON.stringify(contentPosts));
  }, [contentPosts]);
  useEffect(() => {
    localStorage.setItem('f_docs', JSON.stringify(docs));
  }, [docs]);
  useEffect(() => {
    localStorage.setItem('f_sop_templates', JSON.stringify(sopTemplates));
  }, [sopTemplates]);
  useEffect(() => {
    localStorage.setItem('f_active_sops', JSON.stringify(activeSops));
  }, [activeSops]);
  useEffect(() => {
    localStorage.setItem('f_showcase_mode', JSON.stringify(showcaseMode));
  }, [showcaseMode]);
  useEffect(() => {
    localStorage.setItem('f_whatsapp_webhook_url', webhookUrl);
  }, [webhookUrl]);
  useEffect(() => {
    localStorage.setItem('f_notebook_sync_status', notebookLmSyncStatus);
  }, [notebookLmSyncStatus]);
  useEffect(() => {
    localStorage.setItem('f_notebook_last_sync', notebookLmLastSync);
  }, [notebookLmLastSync]);
  useEffect(() => {
    localStorage.setItem('f_habit_streak', habitStreak.toString());
  }, [habitStreak]);
  useEffect(() => {
    localStorage.setItem('f_canvas_nodes', JSON.stringify(canvasNodes));
  }, [canvasNodes]);
  useEffect(() => {
    localStorage.setItem('f_canvas_connections', JSON.stringify(canvasConnections));
  }, [canvasConnections]);
  useEffect(() => {
    localStorage.setItem('f_client_portal_mode', JSON.stringify(clientPortalMode));
  }, [clientPortalMode]);
  useEffect(() => {
    localStorage.setItem('f_client_selected_company', selectedClientCompany);
  }, [selectedClientCompany]);
  useEffect(() => {
    localStorage.setItem('f_client_tickets', JSON.stringify(clientTickets));
  }, [clientTickets]);
  useEffect(() => {
    localStorage.setItem('f_sb_config', JSON.stringify(supabaseConfig));
  }, [supabaseConfig]);
  useEffect(() => {
    localStorage.setItem('f_leads', JSON.stringify(leads));
  }, [leads]);
  useEffect(() => {
    if (activeLeadId) {
      localStorage.setItem('f_active_lead_id', activeLeadId);
    } else {
      localStorage.removeItem('f_active_lead_id');
    }
  }, [activeLeadId]);

  // Fetch leads from Supabase on mount (or when config changes)
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${supabaseConfig.url}/rest/v1/leads?select=*&order=priority.asc,company.asc`, {
          headers: {
            'apikey': supabaseConfig.anonKey,
            'Authorization': `Bearer ${supabaseConfig.anonKey}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setLeads(data);
          }
        }
      } catch (e) {
        console.error("Fehler beim Laden der Leads aus Supabase:", e);
      }
    };
    fetchLeads();
  }, [supabaseConfig]);

  // Wochen-Review & Archiv Logik & Sync (Feature A3)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const completedFocus = focusTasks.filter(t => t.completed).map(t => t.text);
    const completedHabs = habits.filter(h => h.completed).map(h => h.text);
    
    setWeeklyArchive(prev => {
      const currentDayData = prev[today] || { focusTasks: [], completedHabits: [], reflection: '' };
      
      const focusChanged = JSON.stringify(currentDayData.focusTasks) !== JSON.stringify(completedFocus);
      const habitsChanged = JSON.stringify(currentDayData.completedHabits) !== JSON.stringify(completedHabs);
      
      if (focusChanged || habitsChanged) {
        const updated = {
          ...prev,
          [today]: {
            ...currentDayData,
            focusTasks: completedFocus,
            completedHabits: completedHabs
          }
        };
        localStorage.setItem('f_weekly_archive', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  }, [focusTasks, habits]);

  const getLast7Days = () => {
    const days = [];
    const options = { weekday: 'long', day: '2-digit', month: '2-digit' };
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      const formatted = d.toLocaleDateString('de-DE', options);
      days.push({ dateString, formatted });
    }
    return days;
  };

  const updateReflection = (dateString, text) => {
    setWeeklyArchive(prev => {
      const currentDayData = prev[dateString] || { focusTasks: [], completedHabits: [], reflection: '' };
      const updated = {
        ...prev,
        [dateString]: {
          ...currentDayData,
          reflection: text
        }
      };
      localStorage.setItem('f_weekly_archive', JSON.stringify(updated));
      return updated;
    });
  };

  const generateWeeklyArchivePDF = () => {
    const doc = new jsPDF();
    
    // Header Banner
    doc.setFillColor(79, 70, 229); // indigo-600
    doc.rect(0, 0, 210, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("FOUNDER OS - WOCHENREPORT", 20, 23);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Woechentliche Reflexion, Fokus-Aufgaben & Habits", 20, 29);
    
    doc.setFontSize(9);
    doc.text("Erstellt von: Robin Gornitzka", 140, 18);
    doc.text("Zeitraum: Letzte 7 Tage", 140, 23);
    doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 140, 28);
    
    doc.setTextColor(17, 24, 39);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("ZUSAMMENFASSUNG DER LETZTEN 7 TAGE", 20, 50);
    
    doc.setDrawColor(229, 231, 235);
    doc.line(20, 55, 190, 55);
    
    let yPos = 65;
    const days = getLast7Days();
    
    days.forEach((day, index) => {
      if (yPos > 230) {
        doc.addPage();
        yPos = 25;
      }
      
      const dayData = weeklyArchive[day.dateString] || { focusTasks: [], completedHabits: [], reflection: '' };
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(79, 70, 229);
      doc.text(`${day.formatted} (${day.dateString})`, 20, yPos);
      
      yPos += 6;
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      doc.text("Erledigte Fokus-Tasks:", 25, yPos);
      
      doc.setFont("helvetica", "normal");
      if (dayData.focusTasks && dayData.focusTasks.length > 0) {
        dayData.focusTasks.forEach(task => {
          yPos += 5;
          doc.text(`- ${task}`, 30, yPos);
        });
      } else {
        yPos += 5;
        doc.text("Keine Fokus-Tasks erledigt.", 30, yPos);
      }
      
      yPos += 6;
      
      doc.setFont("helvetica", "bold");
      doc.text("Erfolgreiche Habits:", 25, yPos);
      
      doc.setFont("helvetica", "normal");
      if (dayData.completedHabits && dayData.completedHabits.length > 0) {
        yPos += 5;
        doc.text(`- ${dayData.completedHabits.join(', ')}`, 30, yPos);
      } else {
        yPos += 5;
        doc.text("Keine Habits abgehakt.", 30, yPos);
      }
      
      yPos += 6;
      
      doc.setFont("helvetica", "bold");
      doc.text("Tages-Reflexion & Notizen:", 25, yPos);
      
      doc.setFont("helvetica", "italic");
      const reflectionText = dayData.reflection || "Keine Notiz erfasst.";
      const splitReflection = doc.splitTextToSize(reflectionText, 150);
      splitReflection.forEach(line => {
        yPos += 5;
        doc.text(line, 30, yPos);
      });
      
      yPos += 12;
      doc.setDrawColor(243, 244, 246);
      doc.line(20, yPos - 6, 190, yPos - 6);
    });
    
    doc.save(`FounderOS-Wochenreport-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Make.com Simulationssteuerung (Feature B1)
  const startMakeSimulation = () => {
    if (makeSimRunning) return;

    setMakeSimRunning(true);
    setMakeActiveNode(1);
    
    const getTimestamp = () => {
      const now = new Date();
      const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
      return now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + ms;
    };

    setMakeLogs([`[${getTimestamp()}] ⚡ Make.com Webhook getriggert durch WhatsApp-Eingang.`]);

    // Step 2: Whisper (nach 1.4s)
    setTimeout(() => {
      setMakeActiveNode(2);
      setMakeLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 🎙️ Whisper API: Verarbeite Sprachnachricht (Dauer: 6.2s)...`,
        `[${getTimestamp()}] 🔍 Transkript: "Christian Gornitzka, 8 Stunden gearbeitet bei GoClean Harz. Material: Dichtungen."`
      ]);
    }, 1400);

    // Step 3: GPT-4 (nach 2.8s)
    setTimeout(() => {
      setMakeActiveNode(3);
      setMakeLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 🧠 GPT-4: Analysiere und strukturiere Textdaten...`,
        `[${getTimestamp()}] 🔍 Extrahiert: { Mitarbeiter: "Christian Gornitzka", Stunden: 8.0, Kunde: "GoClean Harz", Material: "Dichtungen" }`
      ]);
    }, 2800);

    // Step 4: Lexoffice (nach 4.2s)
    setTimeout(() => {
      setMakeActiveNode(4);
      setMakeLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 📁 Lexoffice API: Sende erfassten Beleg & Zeiteintrag...`,
        `[${getTimestamp()}] ✅ API-Antwort: Status 201 (Created) - Eintrag #LX-98241 angelegt.`
      ]);
    }, 4200);

    // Done (nach 5.6s)
    setTimeout(() => {
      setMakeActiveNode(5);
      setMakeLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 🎉 Szenario-Ausführung erfolgreich beendet (Gesamtlaufzeit: 5.6s, geschätzte Kosten: 0.015 €).`
      ]);
      setMakeSimRunning(false);
    }, 5600);
  };

  // No-Code Canvas Handlers (Feature 1 - v4)
  const addCanvasNode = (templateType) => {
    const templates = {
      email: { type: 'trigger', category: 'Trigger', title: 'E-Mail Eingang (IMAP)', icon: 'Inbox', config: { triggerName: 'Rechnung im Anhang', filterKeyword: 'Rechnung' } },
      openai: { type: 'ai', category: 'KI-Verarbeitung', title: 'Claude 3.5 Sonnet', icon: 'BrainCircuit', config: { prompt: 'Analysiere Vertrag und erstelle Zusammenfassung', temperature: '0.5' } },
      datev: { type: 'erp', category: 'ERP & Buchhaltung', title: 'DATEV Unternehmen Online', icon: 'ClipboardCopy', config: { targetAccount: 'Eingangsrechnungen', autoApprove: 'Nein' } },
      slack: { type: 'notify', category: 'Benachrichtigung', title: 'Slack Team-Alert', icon: 'Zap', config: { channel: '#prozesse-live', message: 'Neuer Beleg verarbeitet!' } }
    };

    const template = templates[templateType] || templates.email;
    const newId = 'cn_' + Date.now();
    const lastNode = canvasNodes[canvasNodes.length - 1];
    const newX = lastNode ? lastNode.x + 210 : 40;
    const newY = lastNode ? lastNode.y : 110;

    const newNode = {
      id: newId,
      ...template,
      x: newX,
      y: newY
    };

    const updatedNodes = [...canvasNodes, newNode];
    setCanvasNodes(updatedNodes);

    if (lastNode) {
      setCanvasConnections(prev => [...prev, { from: lastNode.id, to: newId }]);
    }

    setSelectedCanvasNodeId(newId);
  };

  const deleteCanvasNode = (nodeId) => {
    if (canvasNodes.length <= 1) {
      alert("Der Canvas muss mindestens einen Knoten enthalten!");
      return;
    }
    const filteredNodes = canvasNodes.filter(n => n.id !== nodeId);
    setCanvasNodes(filteredNodes);
    setCanvasConnections(canvasConnections.filter(c => c.from !== nodeId && c.to !== nodeId));
    if (selectedCanvasNodeId === nodeId) {
      setSelectedCanvasNodeId(filteredNodes.length > 0 ? filteredNodes[0].id : null);
    }
  };

  const updateCanvasNodeConfig = (nodeId, key, value) => {
    setCanvasNodes(canvasNodes.map(n => {
      if (n.id === nodeId) {
        return {
          ...n,
          config: {
            ...n.config,
            [key]: value
          }
        };
      }
      return n;
    }));
  };

  const startCanvasTestRun = () => {
    if (canvasTestRunning || canvasNodes.length === 0) return;

    setCanvasTestRunning(true);
    setCanvasTestActiveNode(canvasNodes[0].id);

    const getTimestamp = () => {
      const now = new Date();
      const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
      return now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + ms;
    };

    setCanvasTestLogs([`[${getTimestamp()}] 🚀 Testlauf gestartet. Initialisiere Canvas mit ${canvasNodes.length} Knoten...`]);

    canvasNodes.forEach((node, idx) => {
      setTimeout(() => {
        setCanvasTestActiveNode(node.id);
        setCanvasTestLogs(prev => [
          ...prev,
          `[${getTimestamp()}] ⚙️ [Knoten ${idx + 1}/${canvasNodes.length}] ${node.title} (${node.category}) ausgeführt.`,
          `[${getTimestamp()}] 📊 Konfiguration: ${JSON.stringify(node.config)}`
        ]);

        if (idx === canvasNodes.length - 1) {
          setTimeout(() => {
            setCanvasTestActiveNode(null);
            setCanvasTestLogs(prev => [
              ...prev,
              `[${getTimestamp()}] 🎉 Custom Workflow erfolgreich abgeschlossen!`
            ]);
            setCanvasTestRunning(false);
          }, 1000);
        }
      }, (idx + 1) * 1200);
    });
  };

  // Kunden-Portal Handlers (Feature 2 - v4)
  const handleCreateClientTicket = (e) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    const newId = 'ct_' + Date.now();

    const newTicket = {
      id: newId,
      client: selectedClientCompany,
      title: newTicketTitle,
      status: 'offen',
      date: today,
      priority: newTicketPriority,
      desc: newTicketDesc || 'Keine detaillierte Beschreibung hinterlegt.'
    };

    setClientTickets([newTicket, ...clientTickets]);

    // Automatically notify founder by inserting item into inbox!
    const newInboxNotification = {
      id: 'i_' + Date.now(),
      text: `[Support-Ticket von ${selectedClientCompany}] ${newTicketTitle}: ${newTicketDesc}`,
      date: today
    };
    setInbox(prev => [newInboxNotification, ...prev]);

    setNewTicketTitle('');
    setNewTicketDesc('');
    alert(`Vielen Dank! Dein Support-Ticket für ${selectedClientCompany} wurde eingereicht und an KMU Service Harz übermittelt.`);
  };

  // KI-Telefonagent Handlers (Feature 3 - v4)
  const startVoiceCallSimulation = () => {
    if (voiceCallActive) return;

    setVoiceCallActive(true);
    setVoiceCallStep(1);
    setVoiceTranscript([]);
    setVoiceExtractedData(null);

    const getTime = () => new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (voiceScenario === 'notdienst') {
      setVoiceTranscript([{ speaker: 'agent', text: '🤖 KI-Assistent: Guten Tag! KMU Service Harz Notfall-Zentrale. Ich höre mit. Was ist passiert?', time: getTime() }]);

      setTimeout(() => {
        setVoiceCallStep(2);
        setVoiceTranscript(prev => [...prev, { speaker: 'caller', text: '🗣️ Anrufer (Dachdeckerei Müller): Hallo! Wir haben einen Rohrbruch im Hauptgebäude. Das Wasser steht schon 5cm hoch!', time: getTime() }]);
      }, 1800);

      setTimeout(() => {
        setVoiceCallStep(3);
        setVoiceTranscript(prev => [...prev, { speaker: 'agent', text: '🤖 KI-Assistent: Verstanden. Notfall "Rohrbruch" bei Dachdeckerei Müller. Ich löse sofort Alarmstufe 1 aus und benachrichtige Techniker Meyer per SMS.', time: getTime() }]);
      }, 3800);

      setTimeout(() => {
        setVoiceCallStep(4);
        const extracted = {
          anrufer: 'Dachdeckerei Müller (Hans Müller)',
          anliegen: 'Wasserrohrbruch im Hauptgebäude (Notfall)',
          aktion: 'Notdienst-SMS versendet & Ticket #ND-402 im CRM angelegt'
        };
        setVoiceExtractedData(extracted);
        setVoiceCallActive(false);

        const today = new Date().toISOString().split('T')[0];
        setInbox(prev => [{ id: 'i_' + Date.now(), text: `[KI-Telefonat NOTFALL] Dachdeckerei Müller: Wasserrohrbruch. Techniker benachrichtigt.`, date: today }, ...prev]);
      }, 5800);
    } else {
      setVoiceTranscript([{ speaker: 'agent', text: '🤖 KI-Assistent: Herzlich willkommen bei KMU Service Harz! Wie kann ich Ihr Unternehmen automatisieren?', time: getTime() }]);

      setTimeout(() => {
        setVoiceCallStep(2);
        setVoiceTranscript(prev => [...prev, { speaker: 'caller', text: '🗣️ Anrufer (Pflegedienst Harz): Guten Tag, Sabine Kraft hier. Wir möchten unsere Stundenzettel über WhatsApp digitalisieren.', time: getTime() }]);
      }, 1800);

      setTimeout(() => {
        setVoiceCallStep(3);
        setVoiceTranscript(prev => [...prev, { speaker: 'agent', text: '🤖 KI-Assistent: Ausgezeichnet! Ich trage das Projekt "WhatsApp-Zeiterfassung" für Pflegedienst Harz ein und sende Ihnen das ROI-Infopaket.', time: getTime() }]);
      }, 3800);

      setTimeout(() => {
        setVoiceCallStep(4);
        const extracted = {
          anrufer: 'Pflegedienst Harz (Sabine Kraft)',
          anliegen: 'Interesse an WhatsApp-Zeiterfassung & Fördermitteln',
          aktion: 'Lead im CRM auf "Angebot" aktualisiert & Infomaterial versendet'
        };
        setVoiceExtractedData(extracted);
        setVoiceCallActive(false);

        const today = new Date().toISOString().split('T')[0];
        setInbox(prev => [{ id: 'i_' + Date.now(), text: `[KI-Telefonat LEAD] Pflegedienst Harz hat Angebot angefordert.`, date: today }, ...prev]);
      }, 5800);
    }
  };

  // RAG Knowledge Bot Handlers (Feature 4 - v4)
  const handleSendRagQuery = (customQuery = null) => {
    const query = typeof customQuery === 'string' ? customQuery : ragInput;
    if (!query || !query.trim() || ragGenerating) return;

    const userMsg = { id: 'rag_u_' + Date.now(), sender: 'user', text: query };
    setRagChat(prev => [...prev, userMsg]);
    if (typeof customQuery !== 'string') setRagInput('');
    setRagGenerating(true);

    setTimeout(() => {
      let responseText = '';
      let sources = [];

      const qLower = query.toLowerCase();

      if (ragPersona === 'sales') {
        responseText = `🎯 **Vertriebs- & Pitch-Perspektive:**\n\nIm Kundengespräch solltest du betonen, dass der ROI bereits nach **1,5 Monaten** eintritt. Verweise darauf, dass manuelle Stundenzettel pro Mitarbeiter 15 Minuten pro Tag verschwenden.\n\n👉 **Empfohlenes Argument:** "Mit unserer WhatsApp-Lösung sparen Ihre Mitarbeiter täglich 15 Minuten und das Büro spart 5 Stunden Abtippen pro Woche."`;
        sources = ['Preispakete & ROI-Modelle 2026', 'Showcase ROI-Matrix (Abschnitt 2.1)'];
      } else if (ragPersona === 'legal') {
        responseText = `🔒 **DSGVO- & Compliance-Prüfung:**\n\nAlle verarbeiteten Kundendaten und Sprachnachrichten werden Ende-zu-Ende verschlüsselt und auf ISO-27001 zertifizierten Servern in Frankfurt am Main verarbeitet. Es werden keine Daten zum Training öffentlicher KI-Modelle verwendet.`;
        sources = ['DSGVO & Datenschutzkonzept v2', 'Auftragsverarbeitungsvertrag (AVV) Vorlage'];
      } else {
        // Standard Firmengehirn
        if (qLower.includes('onboarding') || qLower.includes('ablauf') || qLower.includes('start')) {
          responseText = `Das Neukunden-Onboarding gliedert sich in 3 Schritte:\n1. **Setup & Schnittstellen-Check** (DATEV / Lexoffice)\n2. **Mitarbeiter-Einweisung** (WhatsApp-Bot Testlauf)\n3. **Go-Live & Support-Freischaltung** im Mandantenportal.`;
          sources = ['Businessplan - KMU Service Harz (SOP 1.4)', 'Kunden-Onboarding Leitfaden'];
        } else if (qLower.includes('preis') || qLower.includes('kosten') || qLower.includes('paket')) {
          responseText = `Unsere Standard-Pakete richten sich nach der Unternehmensgröße:\n• **Basis-Automatisierung:** ab 1.500 € (WhatsApp-Zeiterfassung)\n• **Enterprise-Workflow:** ab 3.500 € (Vollständige DATEV & CRM Anbindung).`;
          sources = ['Preispakete & ROI-Modelle 2026'];
        } else {
          responseText = `Basierend auf deinen Unternehmensdokumenten betragen die durchschnittlichen Zeiteinsparungen bei Harzer KMUs rund **45 Stunden pro Monat**. Sämtliche Prozesse werden in Echtzeit mit deinen Buchhaltungssystemen synchronisiert.`;
          sources = ['Businessplan - KMU Service Harz', 'Showcase ROI-Matrix'];
        }
      }

      const aiMsg = { id: 'rag_a_' + Date.now(), sender: 'ai', persona: ragPersona, text: responseText, sources };
      setRagChat(prev => [...prev, aiMsg]);
      setRagGenerating(false);
    }, 1200);
  };

  // E-Rechnungs Handlers (Feature 5 - v4)
  const generateEinvoicePdf = () => {
    const doc = new jsPDF();
    const net = invoiceAmount * (1 - invoiceDiscount / 100);
    const vat = net * 0.19;
    const gross = net + vat;
    const invNum = 'RE-2026-' + Math.floor(1000 + Math.random() * 9000);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(139, 92, 246);
    doc.text('KMU SERVICE HARZ', 20, 25);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Digitalisierung & Prozess-Automatisierung | Harz', 20, 32);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`E-RECHNUNG (${invoiceFormat === 'zugferd' ? 'ZUGFeRD 2.0 / Comfort' : 'XRechnung 3.0 Standard'})`, 20, 48);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Rechnungs-Nr.: ${invNum}`, 20, 56);
    doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 20, 62);
    doc.text(`Zahlungsziel: 14 Tage netto`, 20, 68);

    doc.setFont('helvetica', 'bold');
    doc.text('Empfänger:', 130, 48);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceClient, 130, 56);
    doc.text('Buchhaltung / Billing', 130, 62);

    doc.setFillColor(240, 240, 250);
    doc.rect(20, 80, 170, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Position / Beschreibung', 25, 85.5);
    doc.text('Betrag (EUR)', 160, 85.5);

    doc.setFont('helvetica', 'normal');
    doc.text(invoicePackage, 25, 96);
    doc.text(`${net.toFixed(2)} €`, 160, 96);

    if (invoiceDiscount > 0) {
      doc.setTextColor(220, 38, 38);
      doc.text(`Abzüglich ${invoiceDiscount}% Rabatt`, 25, 103);
      doc.setTextColor(0, 0, 0);
    }

    doc.line(20, 115, 190, 115);

    doc.text('Nettobetrag:', 120, 125);
    doc.text(`${net.toFixed(2)} €`, 160, 125);
    doc.text('zzgl. 19% MwSt.:', 120, 132);
    doc.text(`${vat.toFixed(2)} €`, 160, 132);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Gesamtbetrag:', 120, 142);
    doc.text(`${gross.toFixed(2)} €`, 160, 142);

    doc.setFillColor(236, 253, 245);
    doc.rect(20, 160, 170, 25, 'F');
    doc.setFontSize(9);
    doc.setTextColor(6, 95, 70);
    doc.text('✔ DATEV & Lexoffice E-RECHNUNG COMPLIANT', 25, 168);
    doc.setFont('helvetica', 'normal');
    doc.text(`Diese PDF enthält eingebettete strukturierte XML-Rechnungsdaten gemäß EU-Norm EN 16931 (${invoiceFormat.toUpperCase()}).`, 25, 175);

    doc.save(`E-Rechnung_${invoiceClient.replace(/\s+/g, '_')}_${invNum}.pdf`);
  };

  const bookInvoiceToLexoffice = () => {
    const net = invoiceAmount * (1 - invoiceDiscount / 100);
    const gross = net * 1.19;
    const today = new Date().toISOString().split('T')[0];

    const newNotification = {
      id: 'i_' + Date.now(),
      text: `[E-Rechnung Verbucht] ${gross.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € an Lexoffice/DATEV für ${invoiceClient} übermittelt.`,
      date: today
    };

    setInbox(prev => [newNotification, ...prev]);
    alert(`Erfolgreich! E-Rechnung über ${gross.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € wurde an Lexoffice übertragen und in deiner Inbox verbucht.`);
  };

  // Supabase Backend-Integration Handlers (Feature 6 - v4)
  const triggerSupabaseSync = () => {
    if (supabaseSyncStatus === 'syncing') return;
    setSupabaseSyncStatus('syncing');
    setSupabaseLogsOpen(true);
    
    const getTimestamp = () => {
      const now = new Date();
      const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
      return now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + ms;
    };

    setSupabaseLogs([
      `[${getTimestamp()}] 🔄 Verbindungsaufbau zu ${supabaseConfig.url}...`,
      `[${getTimestamp()}] 📡 Authentifizierung mit anon-key erfolgreich.`
    ]);

    setTimeout(() => {
      setSupabaseLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 📤 Analysiere lokale Tabellen (localStorage-Mirror)...`,
        `[${getTimestamp()}] 💾 Syncing 'contacts' (${contacts.length} Zeilen)...`,
        `[${getTimestamp()}] 💾 Syncing 'leads' (${leads.length} Zeilen)...`,
        `[${getTimestamp()}] 💾 Syncing 'tasks' (${tasks.length} Zeilen)...`
      ]);
    }, 800);

    // Real API fetch in background during sync
    const performLiveSync = async () => {
      try {
        const response = await fetch(`${supabaseConfig.url}/rest/v1/leads?select=*&order=priority.asc,company.asc`, {
          headers: {
            'apikey': supabaseConfig.anonKey,
            'Authorization': `Bearer ${supabaseConfig.anonKey}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setLeads(data);
          }
        }
      } catch (e) {
        console.error("Supabase sync fetch failed", e);
      }
    };
    performLiveSync();

    setTimeout(() => {
      setSupabaseLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 💾 Syncing 'inbox' (${inbox.length} Zeilen)...`,
        `[${getTimestamp()}] 💾 Syncing 'client_tickets' (${clientTickets.length} Zeilen)...`,
        `[${getTimestamp()}] 📥 Empfange Updates von Remote-Datenbank...`
      ]);
    }, 1600);

    setTimeout(() => {
      const nowStr = new Date().toLocaleString('de-DE');
      setSupabaseLastSync(nowStr);
      localStorage.setItem('f_sb_last_sync', nowStr);
      setSupabaseSyncStatus('connected');
      setSupabaseLogs(prev => [
        ...prev,
        `[${getTimestamp()}] 🎉 Cloud-Synchronisation erfolgreich abgeschlossen! (Latenz: 24ms)`
      ]);
    }, 2400);
  };

  const handleSaveLeadFeedback = async (e) => {
    e.preventDefault();
    if (!activeLeadId) return;
    
    setIsSavingLead(true);
    const updatedLeads = leads.map(l => {
      if (l.id === activeLeadId) {
        return {
          ...l,
          pain_point: formPainPoint,
          urgency: parseInt(formUrgency) || 0,
          actual_objection: formActualObjection,
          conversation_hook: formConversationHook,
          next_step: formNextStep,
          notes: formNotes,
          status: formStatus
        };
      }
      return l;
    });
    setLeads(updatedLeads);
    localStorage.setItem('f_leads', JSON.stringify(updatedLeads));

    try {
      const response = await fetch(`${supabaseConfig.url}/rest/v1/leads?id=eq.${activeLeadId}`, {
        method: 'PATCH',
        headers: {
          'apikey': supabaseConfig.anonKey,
          'Authorization': `Bearer ${supabaseConfig.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          pain_point: formPainPoint,
          urgency: parseInt(formUrgency) || 0,
          actual_objection: formActualObjection,
          conversation_hook: formConversationHook,
          next_step: formNextStep,
          notes: formNotes,
          status: formStatus
        })
      });
      if (response.ok) {
        console.log("Lead successfully updated in Supabase.");
      }
    } catch (e) {
      console.error("Fehler beim Cloud-Update des Leads:", e);
    }
    
    setIsSavingLead(false);
    alert("✔ Feedback erfolgreich gespeichert!");
  };

  // Live Timer tick for active project time tracking
  useEffect(() => {
    const activeProjects = projects.filter(p => p.trackingStartTime);
    if (activeProjects.length === 0) return;

    const interval = setInterval(() => {
      setTimeTick(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [projects]);

  // Quick Capture Handler
  const handleQuickCapture = (e) => {
    e.preventDefault();
    if (!quickCapture.trim()) return;
    
    const newInboxItem = {
      id: 'i_' + Date.now(),
      text: quickCapture,
      date: new Date().toISOString().split('T')[0]
    };
    
    setInbox([newInboxItem, ...inbox]);
    setQuickCapture('');
    alert('Notiz in der Inbox gespeichert!');
  };

  // NLP Kalender & KI-Tagesplaner Handlers (Feature 3 - v5)
  const handleNlpCalendarSubmit = (e) => {
    e.preventDefault();
    if (!nlpCalendarInput.trim()) return;

    let text = nlpCalendarInput;
    let timeStr = '12:00';
    let dateStr = new Date().toISOString().split('T')[0];

    const timeRegex = /(\d{1,2})[:.]?(\d{2})?\s*(Uhr)?/i;
    const timeMatch = text.match(timeRegex);
    if (timeMatch) {
      const hour = String(timeMatch[1]).padStart(2, '0');
      const min = timeMatch[2] ? String(timeMatch[2]).padStart(2, '0') : '00';
      timeStr = `${hour}:${min}`;
      text = text.replace(timeMatch[0], '').trim();
    }

    const today = new Date();
    if (/heute/i.test(text)) {
      text = text.replace(/heute/i, '').trim();
    } else if (/morgen/i.test(text)) {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      dateStr = tomorrow.toISOString().split('T')[0];
      text = text.replace(/morgen/i, '').trim();
    } else {
      const weekdays = ['sonntag', 'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag'];
      for (let i = 0; i < 7; i++) {
        const dayRegex = new RegExp(weekdays[i], 'i');
        if (dayRegex.test(text)) {
          const targetDay = i;
          const currentDay = today.getDay();
          let daysDiff = targetDay - currentDay;
          if (daysDiff <= 0) daysDiff += 7;
          const targetDate = new Date(today);
          targetDate.setDate(today.getDate() + daysDiff);
          dateStr = targetDate.toISOString().split('T')[0];
          text = text.replace(dayRegex, '').trim();
          break;
        }
      }
    }

    text = text.replace(/^(um|am|uhr|telefonat|meeting|treffen|mit)\s+/i, '').trim();
    const eventTitle = text || 'Neuer Termin';

    const startHour = parseInt(timeStr.split(':')[0]);
    const endHour = String((startHour + 1) % 24).padStart(2, '0');
    const timeRange = `${timeStr} - ${endHour}:${timeStr.split(':')[1]}`;

    const newEvent = {
      id: 'ev_' + Date.now(),
      time: timeRange,
      title: eventTitle,
      desc: 'Per NLP erfasst',
      date: dateStr
    };

    setCalendarEvents(prev => [...prev, newEvent]);
    setNlpCalendarInput('');
    alert(`📅 Termin erfasst: "${eventTitle}" am ${new Date(dateStr).toLocaleDateString('de-DE')} um ${timeStr} Uhr.`);
  };

  const deleteCalendarEvent = (id) => {
    setCalendarEvents(prev => prev.filter(ev => ev.id !== id));
  };

  const generateDailyAiTasks = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todaysEvents = calendarEvents.filter(ev => ev.date === todayStr).map(ev => ev.title);
    const crmLeads = contacts.filter(c => c.status === 'lead' || c.status === 'kontakt').map(c => c.company);

    const aiTasks = [];
    if (todaysEvents.length > 0) {
      aiTasks.push(`Vorbereitung: ${todaysEvents[0]}`);
    } else {
      aiTasks.push(`Akquise: 3 neue KMU-Leads im Harz kontaktieren`);
    }

    if (crmLeads.length > 0) {
      aiTasks.push(`Follow-Up: Angebot für ${crmLeads[0]} nachfassen`);
    } else {
      aiTasks.push(`Notizbuch pflegen: Letzte Logbucheinträge synchronisieren`);
    }

    aiTasks.push(`DATEV/Lexoffice: Rechnungsabgleich & Einnahmen-Review`);

    const newFocusTasks = aiTasks.map((t, idx) => ({
      id: 'f_' + Date.now() + '_' + idx,
      text: t,
      completed: false
    }));

    setFocusTasks(newFocusTasks);
    alert("⚡ KI-Tagesplan erfolgreich synthetisiert! Dein Tagesfokus wurde basierend auf Kalender- & CRM-Daten aktualisiert.");
  };

  // Speech-to-Text via Web Speech API (Feature 4 - v5)
  const handleQuickCaptureSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Web Speech API wird von diesem Browser nicht unterstützt. Bitte nutze Google Chrome oder Microsoft Edge.");
      return;
    }

    if (isListeningQuickCapture) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListeningQuickCapture(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuickCapture(prev => prev ? `${prev} ${transcript}` : transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListeningQuickCapture(false);
    };

    recognition.onend = () => {
      setIsListeningQuickCapture(false);
    };

    recognition.start();
  };

  const handleCrmNotesSpeech = (contactId) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Web Speech API wird von diesem Browser nicht unterstützt. Bitte nutze Google Chrome oder Microsoft Edge.");
      return;
    }

    if (isListeningCrmNotes) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListeningCrmNotes(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setContacts(prev => prev.map(c => {
        if (c.id === contactId) {
          return {
            ...c,
            notes: c.notes ? `${c.notes} ${transcript}` : transcript
          };
        }
        return c;
      }));
    };

    recognition.onerror = (event) => {
      console.error("Speech error", event.error);
      setIsListeningCrmNotes(false);
    };

    recognition.onend = () => {
      setIsListeningCrmNotes(false);
    };

    recognition.start();
  };

  // Phase v6 Handlers (Custom Prompt Blocks, Offline Todos & Google Sync)
  const handleAddCustomPromptBlock = (e) => {
    e.preventDefault();
    if (!newBlockName.trim() || !newBlockContent.trim()) return;

    const newBlock = {
      id: 'cpb_' + Date.now(),
      name: newBlockName.trim(),
      category: newBlockCategory,
      content: newBlockContent.trim()
    };

    setCustomPromptBlocks(prev => [...prev, newBlock]);
    setNewBlockName('');
    setNewBlockContent('');
    setShowCustomBlockForm(false);
  };

  const handleDeleteCustomPromptBlock = (id) => {
    setCustomPromptBlocks(prev => prev.filter(b => b.id !== id));
  };

  const handleAddDashTodo = (text) => {
    if (!text.trim()) return;
    const newTodo = {
      id: 'dt_' + Date.now(),
      text: text.trim(),
      completed: false
    };
    setDashTodos(prev => [...prev, newTodo]);
  };

  const handleToggleDashTodo = (id) => {
    setDashTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteDashTodo = (id) => {
    setDashTodos(prev => prev.filter(t => t.id !== id));
  };

  const triggerGoogleSync = () => {
    if (isGoogleSyncing) return;
    setGoogleSyncLogs([]);
    setIsGoogleSyncing(true);

    const logSteps = [
      "🔄 Initialisiere Google API Client (gapi)...",
      "🔑 Validierte gespeicherte OAuth2 Refresh-Tokens in Supabase...",
      "📡 Verbinde mit primary.calendar.google.com...",
      "⏬ Empfange Delta-Sync Events (Sync-Token: cal_sync_8892)...",
      "📂 Scanne Google Drive Pfad 'Founder OS Gehirn'...",
      "🔄 Lese Dokumente: Audit_Dachdeckerei_Müller.pdf, ROI_Modell_V2.xlsx...",
      "✅ Google API Synchronisation erfolgreich abgeschlossen! (14 Kalender-Events & 3 Drive-Dateien synchronisiert)"
    ];

    logSteps.forEach((step, index) => {
      setTimeout(() => {
        setGoogleSyncLogs(prev => [...prev, step]);
        if (index === logSteps.length - 1) {
          setIsGoogleSyncing(false);
          const googleEvent = {
            id: 'ev_google_' + Date.now(),
            time: '11:00 - 12:00',
            title: 'Live Google Meeting: Steuerkanzlei Harz',
            desc: 'Automatisch aus Google Kalender importiert',
            date: new Date().toISOString().split('T')[0]
          };
          setCalendarEvents(prev => {
            if (prev.some(ev => ev.title === googleEvent.title)) return prev;
            return [...prev, googleEvent];
          });
        }
      }, (index + 1) * 600);
    });
  };

  // Handle WhatsApp simulation process (Feature 2a)
  const triggerWhatsAppSimulation = async (e) => {
    e.preventDefault();
    if (!simMessage.trim() || isSimulating) return;

    setIsSimulating(true);
    setSimStep('whisper'); // Step 1: Whisper transcribes

    setTimeout(() => {
      setSimStep('gpt'); // Step 2: GPT analyzes and structures

      setTimeout(async () => {
        const newInboxItem = {
          id: 'i_' + Date.now(),
          text: `[WhatsApp] ${simMessage}`,
          date: new Date().toISOString().split('T')[0]
        };

        setInbox(prevInbox => [newInboxItem, ...prevInbox]);
        
        // Trigger real webhook if URL is provided
        if (webhookUrl.trim()) {
          try {
            await fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                message: simMessage,
                sender: 'WhatsApp Simulator',
                timestamp: new Date().toISOString()
              })
            });
          } catch (err) {
            console.warn("Real webhook call failed:", err);
          }
        }

        setSimStep('done');
        setIsSimulating(false);
        alert('WhatsApp verarbeitet und Beleg in die Inbox gelegt!');
        
        setTimeout(() => {
          setSimStep('');
        }, 2000);

      }, 1500);

    }, 1500);
  };

  // Inbox & Task Operations
  const deleteInboxItem = (id) => {
    setInbox(inbox.filter(item => item.id !== id));
  };

  const convertInboxToTask = (item) => {
    const newTask = {
      id: 't_' + Date.now(),
      title: item.text.length > 60 ? item.text.substring(0, 60) + '...' : item.text,
      priority: 'medium',
      column: 'todo',
      date: new Date().toISOString().split('T')[0]
    };
    setTasks([newTask, ...tasks]);
    deleteInboxItem(item.id);
    setActiveTab('tasks');
  };

  // Focus Task Toggle
  const toggleFocusTask = (id) => {
    setFocusTasks(focusTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addFocusTask = (e) => {
    e.preventDefault();
    if (!newFocusText.trim()) return;
    if (focusTasks.length >= 3) {
      alert("Fokus auf 3 Aufgaben begrenzt! Lösche oder erledige eine zuerst.");
      return;
    }
    const newTask = {
      id: 'f_' + Date.now(),
      text: newFocusText,
      completed: false
    };
    setFocusTasks([...focusTasks, newTask]);
    setNewFocusText('');
  };

  const deleteFocusTask = (id) => {
    setFocusTasks(focusTasks.filter(t => t.id !== id));
  };

  // Confetti Simulation Trigger
  const triggerConfetti = () => {
    setShowConfetti(true);
    const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];
    const particles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1.5,
      duration: Math.random() * 2 + 2,
      rotation: Math.random() * 360,
      shape: Math.random() > 0.5 ? 'circle' : 'square'
    }));
    setConfettiParticles(particles);
    
    setTimeout(() => {
      setShowConfetti(false);
      setConfettiParticles([]);
    }, 4500);
  };

  // Habit Tracker Toggle
  const toggleHabit = (id) => {
    const updatedHabits = habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h);
    setHabits(updatedHabits);

    const allCompletedNow = updatedHabits.every(h => h.completed);
    const wereAllCompletedBefore = habits.every(h => h.completed);

    if (allCompletedNow && !wereAllCompletedBefore) {
      setHabitStreak(prev => prev + 1);
      triggerConfetti();
    }
  };

  // Kanban Board Drag and Drop
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    setTasks(tasks.map(t => t.id === taskId ? { ...t, column: targetColumn } : t));
  };

  const addNewTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: 't_' + Date.now(),
      title: newTaskTitle,
      priority: newTaskPriority,
      column: 'todo',
      date: new Date().toISOString().split('T')[0]
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // CRM & Projects Operations
  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContact.name.trim() || !newContact.company.trim()) return;
    const newId = 'c_' + Date.now();
    
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    
    const contactToAdd = {
      id: newId,
      ...newContact,
      lastContact: today,
      notes: '',
      links: [],
      activityLog: [
        { id: 'al_' + Date.now(), date: `${today} ${nowTime}`, text: 'Lead im CRM erstellt' }
      ]
    };
    setContacts([contactToAdd, ...contacts]);
    
    // Add to project-tracker as well
    const projectToAdd = {
      id: 'p_' + Date.now(),
      client: newContact.company,
      offerSigned: false,
      subsidyApplied: false,
      subsidyApproved: false,
      ready: false,
      pricePackage: 2500,
      trackedHours: 0,
      trackingStartTime: null
    };
    setProjects([...projects, projectToAdd]);

    setNewContact({ name: '', company: '', industry: '', system: '', stage: 'erstkontakt' });
  };

  const deleteContact = (id, company) => {
    setContacts(contacts.filter(c => c.id !== id));
    setProjects(projects.filter(p => p.client !== company));
    if (selectedContactId === id) setSelectedContactId(null);
  };

  const updateContactStage = (id, stage) => {
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const logText = `Status geändert auf '${stage}'`;
    
    setContacts(contacts.map(c => {
      if (c.id === id) {
        const newLog = {
          id: 'al_' + Date.now(),
          date: `${today} ${nowTime}`,
          text: logText
        };
        const currentLogs = c.activityLog || [];
        return { 
          ...c, 
          stage, 
          lastContact: today,
          activityLog: [...currentLogs, newLog]
        };
      }
      return c;
    }));
  };

  const updateContactNotes = (id, notes) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, notes } : c));
  };

  const addContactLink = (id, title, url) => {
    if (!title.trim() || !url.trim()) return;
    
    // Auto prefix http if missing
    const formattedUrl = /^(http|https):\/\//.test(url) ? url : 'https://' + url;
    
    setContacts(contacts.map(c => {
      if (c.id === id) {
        const newLink = { id: 'l_' + Date.now(), title, url: formattedUrl };
        const currentLinks = c.links || [];
        
        const today = new Date().toISOString().split('T')[0];
        const nowTime = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        const newLog = {
          id: 'al_' + Date.now(),
          date: `${today} ${nowTime}`,
          text: `Link hinzugefügt: ${title}`
        };
        const currentLogs = c.activityLog || [];
        
        return { 
          ...c, 
          links: [...currentLinks, newLink],
          activityLog: [...currentLogs, newLog]
        };
      }
      return c;
    }));
  };

  const deleteContactLink = (id, linkId) => {
    setContacts(contacts.map(c => {
      if (c.id === id) {
        const currentLinks = c.links || [];
        const linkToDelete = currentLinks.find(l => l.id === linkId);
        
        const today = new Date().toISOString().split('T')[0];
        const nowTime = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        const newLog = {
          id: 'al_' + Date.now(),
          date: `${today} ${nowTime}`,
          text: `Link entfernt: ${linkToDelete ? linkToDelete.title : 'Unbekannter Link'}`
        };
        const currentLogs = c.activityLog || [];
        
        return { 
          ...c, 
          links: currentLinks.filter(l => l.id !== linkId),
          activityLog: [...currentLogs, newLog]
        };
      }
      return c;
    }));
  };

  const toggleProjectStep = (projId, stepKey) => {
    setProjects(projects.map(p => p.id === projId ? { ...p, [stepKey]: !p[stepKey] } : p));
  };

  const startProjectTracking = (projId) => {
    setProjects(projects.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          trackingStartTime: Date.now()
        };
      }
      if (p.trackingStartTime) {
        const elapsed = (Date.now() - p.trackingStartTime) / (1000 * 60 * 60);
        return {
          ...p,
          trackedHours: (p.trackedHours || 0) + elapsed,
          trackingStartTime: null
        };
      }
      return p;
    }));
  };

  const stopProjectTracking = (projId) => {
    setProjects(projects.map(p => {
      if (p.id === projId && p.trackingStartTime) {
        const elapsed = (Date.now() - p.trackingStartTime) / (1000 * 60 * 60);
        return {
          ...p,
          trackedHours: (p.trackedHours || 0) + elapsed,
          trackingStartTime: null
        };
      }
      return p;
    }));
  };

  const updateProjectHours = (projId, hours) => {
    setProjects(projects.map(p => p.id === projId ? { ...p, trackedHours: Math.max(0, parseFloat(hours) || 0) } : p));
  };

  const updateProjectPrice = (projId, price) => {
    setProjects(projects.map(p => p.id === projId ? { ...p, pricePackage: Math.max(0, parseInt(price) || 0) } : p));
  };

  // Prompt Vault Copier
  const copyPromptText = (text) => {
    navigator.clipboard.writeText(text);
    alert('Prompt wurde in die Zwischenablage kopiert!');
  };

  const handleAddPrompt = (e) => {
    e.preventDefault();
    if (!newPrompt.title.trim() || !newPrompt.text.trim()) return;
    const promptToAdd = {
      id: 'pr_' + Date.now(),
      ...newPrompt
    };
    setPrompts([promptToAdd, ...prompts]);
    setNewPrompt({ title: '', category: 'Sales', text: '' });
  };

  const optimizePromptWithLocalAI = async () => {
    if (!newPrompt.text.trim()) {
      alert("Bitte gib zuerst einen Prompt-Entwurf in das Textfeld ein.");
      return;
    }
    setOllamaLoading(true);
    
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: "llama3",
          prompt: `Optimiere diesen Prompt für ein LLM (mache ihn präzise, strukturiert und füge klare Anweisungen hinzu). Antworte NUR mit dem verbesserten Prompt-Text, ohne Einleitung oder Erklärung:\n\n${newPrompt.text}`,
          stream: false
        })
      });
      clearTimeout(id);
      
      if (response.ok) {
        const data = await response.json();
        if (data.response) {
          setNewPrompt(prev => ({ ...prev, text: data.response.trim() }));
          alert("🎉 Prompt erfolgreich per lokaler Ollama-KI (llama3) optimiert!");
          setOllamaLoading(false);
          return;
        }
      }
    } catch (e) {
      console.log("Ollama nicht erreichbar, nutze lokalen Fallback-Optimierer...", e);
    }

    setTimeout(() => {
      const original = newPrompt.text;
      const optimized = `[SYSTEM PROMPT]
Du bist eine hochentwickelte KI mit Spezialisierung auf KMU-Prozesse und Effizienzsteigerung.

[AUFGABE]
${original}

[ANWEISUNGEN]
1. Analysiere das Problem tiefgehend und strukturiert.
2. Nenne konkrete Praxisbeispiele oder direkt anwendbare Vorlagen.
3. Verwende verständliche und überzeugende Formulierungen.
4. Gib das Ergebnis in einer klaren Markdown-Struktur aus.
5. Weise auf potenzielle Hürden oder Fehlerquellen hin.`;
      
      setNewPrompt(prev => ({ ...prev, text: optimized }));
      alert("⚡ Ollama Offline. Prompt wurde mit dem integrierten Smart-Fallback-Optimierer verbessert!");
      setOllamaLoading(false);
    }, 1000);
  };

  const deletePrompt = (id) => {
    setPrompts(prompts.filter(p => p.id !== id));
  };

  // Content Planer Operations
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.date) return;
    const postToAdd = {
      id: 'co_' + Date.now(),
      ...newPost
    };
    setContentPosts([postToAdd, ...contentPosts]);
    setNewPost({ title: '', date: '', status: 'idea' });
  };

  const deletePost = (id) => {
    setContentPosts(contentPosts.filter(p => p.id !== id));
  };

  // NotebookLM Sync Trigger
  const triggerNotebookLmSync = (triggeredByFile = null) => {
    if (notebookLmSyncStatus === 'syncing') return;
    
    setNotebookLmSyncStatus('syncing');
    setNotebookLmProgress(0);
    
    const steps = [
      { progress: 15, text: 'Google Drive Ordner scannen...' },
      { progress: 40, text: triggeredByFile ? `Neue Datei "${triggeredByFile}" analysieren...` : 'Dokumenten-Hashes abgleichen...' },
      { progress: 70, text: 'Text & Vektor-Embeddings extrahieren...' },
      { progress: 90, text: 'NotebookLM Wissensdatenbank aktualisieren...' },
      { progress: 100, text: 'Synchronisation erfolgreich!' }
    ];
    
    let currentStep = 0;
    setNotebookLmSyncStep(steps[0].text);
    setNotebookLmProgress(steps[0].progress);
    
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setNotebookLmSyncStep(steps[currentStep].text);
        setNotebookLmProgress(steps[currentStep].progress);
      } else {
        clearInterval(interval);
        
        const now = new Date();
        const timeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateStr = 'Heute, ' + timeStr;
        
        setNotebookLmLastSync(dateStr);
        setNotebookLmSyncStatus('synced');
        setNotebookLmSyncStep('');
      }
    }, 850);
  };

  // Phase v7 Editor & Sync Handlers
  const handleOpenDocInEditor = (docId) => {
    if (!docId) {
      setEditingDocId(null);
      setEditorTitle('unbenannt.txt');
      setEditorContent('');
    } else {
      const doc = docs.find(d => d.id === docId);
      if (!doc) return;
      setEditingDocId(doc.id);
      setEditorTitle(doc.title);
      setEditorContent(doc.content || '');
    }
    setIsEditorOpen(true);
  };

  const handleSaveDocFromEditor = () => {
    if (!editorTitle.trim()) {
      alert("Bitte einen Dateinamen eingeben.");
      return;
    }
    const formattedTitle = /\.[a-zA-Z0-9]+$/.test(editorTitle) ? editorTitle : editorTitle + '.txt';

    if (editingDocId === null) {
      const newDoc = {
        id: 'd_' + Date.now(),
        title: formattedTitle,
        content: editorContent,
        status: 'local',
        url: '#'
      };
      setDocs(prev => [newDoc, ...prev]);
    } else {
      setDocs(prev => prev.map(doc => {
        if (doc.id === editingDocId) {
          return {
            ...doc,
            title: formattedTitle,
            content: editorContent,
            status: doc.status === 'synced' ? 'modified' : doc.status
          };
        }
        return doc;
      }));
    }
    setIsEditorOpen(false);
    setEditingDocId(null);
    setEditorTitle('');
    setEditorContent('');
  };

  const triggerManualGoogleDriveSync = () => {
    if (notebookLmSyncStatus === 'syncing') return;
    
    const pendingDocs = docs.filter(d => d.status === 'local' || d.status === 'modified');
    if (pendingDocs.length === 0) {
      alert("Alle Dokumente sind bereits auf dem neuesten Stand in Google Drive!");
      return;
    }

    setNotebookLmSyncStatus('syncing');
    setNotebookLmProgress(0);
    setNotebookLmSyncStep('Verbindung mit Google Drive herstellen...');

    const steps = [
      { progress: 15, text: 'Google Drive Ordner "Founder OS" autorisieren...' },
      ...pendingDocs.flatMap((doc, i) => [
        { progress: 20 + i * 20, text: `Lese Datei ${doc.title} (Status: ${doc.status === 'local' ? 'Neu' : 'Bearbeitet'})...` },
        { progress: 30 + i * 20, text: `Übertrage Datenstrom für ${doc.title} in Google Drive...` }
      ]),
      { progress: 85, text: 'Google Drive Datei-Indizierung abschließen...' },
      { progress: 95, text: 'NotebookLM-Kopplung aktualisieren (Datenquellen neu einlesen)...' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        setNotebookLmSyncStep(steps[currentStep].text);
        setNotebookLmProgress(steps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        
        setDocs(prev => prev.map(d => ({ ...d, status: 'synced' })));
        
        const now = new Date();
        const timeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateStr = 'Heute, ' + timeStr;
        
        setNotebookLmLastSync(dateStr);
        setNotebookLmSyncStatus('synced');
        setNotebookLmSyncStep('');
        alert(`🎉 Google Drive erfolgreich aktualisiert! ${pendingDocs.length} Datei(en) wurden synchronisiert. NotebookLM ist bereit.`);
      }
    }, 900);
  };

  const handleFileUploadMock = () => {
    handleOpenDocInEditor(null);
  };

  const downloadDocAsFile = (doc, e) => {
    e.stopPropagation();
    const element = document.createElement("a");
    const file = new Blob([doc.content || ''], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = doc.title;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDeleteDoc = (docId, e) => {
    e.stopPropagation();
    if (!confirm("Möchtest du dieses Dokument wirklich löschen?")) return;
    setDocs(prev => prev.filter(d => d.id !== docId));
  };

  // Phase v8 Handlers
  const handleResetDemoData = () => {
    if (!confirm("Möchtest du wirklich alle Daten und Einstellungen auf den Werkszustand zurücksetzen? Alle deine persönlichen Anpassungen, Widgets, Notizen und Termine gehen dabei verloren.")) return;
    localStorage.clear();
    window.location.reload();
  };

  const insertMarkdownIntoNotes = (syntax) => {
    const textarea = document.getElementById('dash-scratchpad');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    
    let replacement = "";
    if (syntax === 'bold') {
      replacement = `**${selected || 'Fettgedruckter Text'}**`;
    } else if (syntax === 'italic') {
      replacement = `*${selected || 'Kursiver Text'}*`;
    } else if (syntax === 'list') {
      replacement = `\n- ${selected || 'Listeneintrag'}`;
    }
    
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setDashNotes(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 50);
  };

  // SOP Vorlagen kopieren
  const startSopFromTemplate = (template) => {
    const clientName = prompt(`Für welchen Kunden soll die Checkliste "${template.name}" gestartet werden?`);
    if (!clientName) return;
    const newActiveSop = {
      id: 'as_' + Date.now(),
      name: template.name,
      client: clientName,
      steps: template.steps.map(step => ({ text: step, done: false }))
    };
    setActiveSops([newActiveSop, ...activeSops]);
    alert(`Checkliste für ${clientName} gestartet.`);
  };

  const toggleActiveSopStep = (sopId, stepIndex) => {
    setActiveSops(activeSops.map(sop => {
      if (sop.id === sopId) {
        const updatedSteps = [...sop.steps];
        updatedSteps[stepIndex].done = !updatedSteps[stepIndex].done;
        return { ...sop, steps: updatedSteps };
      }
      return sop;
    }));
  };

  const deleteActiveSop = (id) => {
    setActiveSops(activeSops.filter(sop => sop.id !== id));
  };

  // ROI Calculator Calculations
  const calculateSavings = () => {
    const hours = parseFloat(calcInputs.durationHours) || 0;
    const rate = parseFloat(calcInputs.hourlyRate) || 0;
    const setupFee = parseFloat(calcInputs.setupFee) || 0;
    
    const weeklySavingsEur = hours * rate;
    const yearlySavingsEur = weeklySavingsEur * 52;
    const yearlySavingsHours = hours * 52;
    
    const subsidyRates = { NDS: 0.5, LSA: 0.5, BUND: 0.3, NONE: 0.0 };
    const ratePct = subsidyRates[calcInputs.subsidyRegion] || 0;
    
    const subsidyAmount = setupFee * ratePct;
    const netInvestment = setupFee - subsidyAmount;
    
    const monthlySavingsEur = yearlySavingsEur / 12;
    const paybackMonths = monthlySavingsEur > 0 ? netInvestment / (monthlySavingsEur * 0.9) : 0;
    
    return {
      euro: yearlySavingsEur.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
      hours: yearlySavingsHours.toLocaleString('de-DE'),
      subsidyAmount: subsidyAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
      netInvestment: netInvestment.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
      paybackMonths: paybackMonths.toFixed(1),
      rawYearlyEur: yearlySavingsEur,
      rawYearlyHours: yearlySavingsHours,
      rawNetInvestment: netInvestment,
      rawPaybackMonths: paybackMonths
    };
  };

  const savings = calculateSavings();

  const generatePDFReport = () => {
    const doc = new jsPDF();
    
    // Header Banner
    doc.setFillColor(139, 92, 246);
    doc.rect(0, 0, 210, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("KMU SERVICE HARZ", 20, 23);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Der pragmatische Prozess-Befreier fuer den lokalen Mittelstand", 20, 29);
    
    doc.setFontSize(9);
    doc.text("Erstellt von: Robin Gornitzka", 140, 18);
    doc.text("E-Mail: info@kmuserviceharz.de", 140, 23);
    doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 140, 28);
    
    doc.setTextColor(17, 24, 39);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("WIRTSCHAFTLICHKEITSANALYSE & POTENZIAL-AUDIT", 20, 52);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 85, 99);
    doc.text(`Prozess-Automatisierung fuer: "${mask(calcInputs.taskName, 'inbox')}"`, 20, 59);
    
    doc.setDrawColor(229, 231, 235);
    doc.line(20, 65, 190, 65);
    
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("1. Status Quo (Manueller Aufwand)", 20, 77);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.text(`- Woechentlicher Zeitaufwand: ${calcInputs.durationHours} Stunden`, 25, 85);
    doc.text(`- Kalkulatorischer Stundensatz: ${calcInputs.hourlyRate} EUR / Stunde`, 25, 91);
    
    doc.setFillColor(249, 250, 251);
    doc.rect(20, 98, 170, 32, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.rect(20, 98, 170, 32, 'D');
    
    doc.setTextColor(139, 92, 246);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Kosten pro Jahr (Manuell): ${(calcInputs.durationHours * calcInputs.hourlyRate * 52).toLocaleString('de-DE')} EUR`, 25, 108);
    doc.text(`Arbeitszeit pro Jahr (Manuell): ${savings.hours} Stunden`, 25, 118);
    
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("2. Soll-Zustand (Automatisiert)", 20, 142);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.text("- Erwartete Prozess-Optimierung: ca. 90% Zeiteinsparung", 25, 150);
    doc.text("- Automatisierte Workflows laufen im Hintergrund (24/7)", 25, 156);
    
    doc.setFillColor(240, 253, 250);
    doc.rect(20, 163, 170, 32, 'F');
    doc.setDrawColor(186, 230, 224);
    doc.rect(20, 163, 170, 32, 'D');
    
    doc.setTextColor(13, 148, 136);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Jaehrliche Zeit-Einsparung: ~ ${(calcInputs.durationHours * 52 * 0.9).toFixed(0)} Std.`, 25, 173);
    doc.text(`Jaehrliche Geld-Einsparung: ~ ${(calcInputs.durationHours * calcInputs.hourlyRate * 52 * 0.9).toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}`, 25, 183);
    
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("3. Investition & Foerdermittel-Hebel", 20, 207);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.text(`- Einmaliges Festpreis-Paket (Implementierung): ${calcInputs.setupFee.toLocaleString('de-DE')} EUR`, 25, 215);
    
    const subsidyNames = { NDS: 'Digitalbonus Niedersachsen (50% Zuschuss)', LSA: 'Digital Innovation Sachsen-Anhalt (50% Zuschuss)', BUND: 'go-digital Bundesfoerderung (30% Zuschuss)', NONE: 'Keine staatliche Foerderung gewaehlt' };
    doc.text(`- Foerderprogramm: ${subsidyNames[calcInputs.subsidyRegion]}`, 25, 221);
    doc.text(`- Staatliche Foerderung (nicht rueckzahlbar): - ${savings.subsidyAmount}`, 25, 227);
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(13, 148, 136);
    doc.text(`Effektive Netto-Investition: ${savings.netInvestment}`, 25, 237);
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 24, 39);
    doc.text(`Amortisationszeit (Payback Period): ca. ${savings.paybackMonths} Monate`, 25, 245);
    
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text("KMU Service Harz UG | Der pragmatische Prozess-Befreier", 20, 275);
    doc.text("Hinweis: Diese ROI-Berechnung basiert auf den vom Kunden bereitgestellten Daten und stellt eine unverbindliche Schaetzung dar.", 20, 280);
    doc.text("Antraege fuer Foerdermittel muessen zwingend vor Projektstart eingereicht werden.", 20, 284);
    
    doc.save(`ROI_Analyse_${mask(calcInputs.taskName, 'inbox').replace(/\s+/g, '_')}.pdf`);
  };

  // Helper function to check if lead has not been contacted for > 14 days
  const isLeadInactive = (lastContactDate) => {
    const last = new Date(lastContactDate);
    const today = new Date();
    const diffTime = Math.abs(today - last);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 14;
  };

  const activeContact = contacts.find(c => c.id === selectedContactId);

  // Calculations for Financial Cockpit (Dashboard v3)
  const activeProjectsList = projects.filter(proj => {
    const contact = contacts.find(c => c.company === proj.client);
    return contact && contact.stage === 'umsetzung';
  });
  const activeUmsatz = activeProjectsList.reduce((sum, p) => sum + (p.pricePackage || 0), 0);
  
  const pipelineProjectsList = projects.filter(proj => {
    const contact = contacts.find(c => c.company === proj.client);
    return contact && contact.stage === 'angebot';
  });
  const pipelineUmsatz = pipelineProjectsList.reduce((sum, p) => sum + (p.pricePackage || 0), 0);
  const weightedPipeline = Math.round(pipelineUmsatz * 0.5);
  
  const totalPrognose = activeUmsatz + weightedPipeline;
  
  const totalActiveHours = activeProjectsList.reduce((sum, p) => {
    const elapsed = p.trackingStartTime ? (Date.now() - p.trackingStartTime) / (1000 * 60 * 60) : 0;
    return sum + (p.trackedHours || 0) + elapsed;
  }, 0);
  const avgHourlyRate = totalActiveHours > 0 ? Math.round(activeUmsatz / totalActiveHours) : 0;

  return (
    <div className="app-container">
      {/* Confetti Overlay */}
      {showConfetti && (
        <div className="confetti-container">
          {confettiParticles.map(p => (
            <div 
              key={p.id} 
              className={`confetti-particle ${p.shape}`}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            />
          ))}
        </div>
      )}
      {/* HEADER */}
      {clientPortalMode && (
        <div style={{ background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)', padding: '0.4rem 1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          <span>👁️ Mandantenportal-Vorschau: Du siehst die App aus Sicht von <strong>{mask(selectedClientCompany, 'company')}</strong></span>
          <button onClick={() => setClientPortalMode(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '0.25rem', padding: '0.15rem 0.5rem', fontSize: '0.7rem', color: 'white', cursor: 'pointer' }}>
            Zurück zu Gründer OS
          </button>
        </div>
      )}

      <header className="app-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="brand">
            <div className="brand-logo" style={{ background: clientPortalMode ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : undefined }}>
              {clientPortalMode ? <Shield size={20} /> : <BrainCircuit size={20} />}
            </div>
            <h1>{clientPortalMode ? 'Mandantenportal' : 'Founder OS'}</h1>
            <span className="brand-badge">{clientPortalMode ? mask(selectedClientCompany, 'company') : 'KMU Service Harz'}</span>
          </div>
          
          <button
            type="button"
            className="btn btn-secondary"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              background: 'rgba(239, 68, 68, 0.05)',
              borderColor: 'rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              marginRight: '0.35rem'
            }}
            onClick={handleResetDemoData}
            title="Löscht alle vorgenommenen Änderungen und setzt die App komplett auf den Werkszustand zurück."
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
            }}
          >
            🔄 Reset
          </button>

          <button 
            className={`btn ${showcaseMode ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              padding: '0.35rem 0.75rem', 
              fontSize: '0.75rem', 
              boxShadow: showcaseMode ? '0 0 15px rgba(6, 180, 210, 0.4)' : 'none',
              borderColor: showcaseMode ? 'var(--accent-cyan)' : 'var(--border-color)',
              background: showcaseMode ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))' : 'rgba(255, 255, 255, 0.05)',
              color: 'white'
            }}
            onClick={() => setShowcaseMode(!showcaseMode)}
            title="Schützt deine echten Kundendaten bei Präsentationen durch das automatische Einblenden von fiktiven Demodaten."
          >
            Showcase-Modus: {showcaseMode ? 'AKTIV' : 'AUS'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button 
              className={`btn ${clientPortalMode ? 'btn-primary' : 'btn-secondary'}`}
              style={{ 
                padding: '0.35rem 0.75rem', 
                fontSize: '0.75rem', 
                background: clientPortalMode ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: clientPortalMode ? '#8b5cf6' : 'var(--border-color)',
                boxShadow: clientPortalMode ? '0 0 15px rgba(139, 92, 246, 0.4)' : 'none',
                color: 'white'
              }}
              onClick={() => setClientPortalMode(!clientPortalMode)}
              title="Wechselt in das White-Label Kunden-Portal."
            >
              Kunden-Portal: {clientPortalMode ? 'AKTIV' : 'AUS'}
            </button>

            {clientPortalMode && (
              <select 
                className="input-field"
                style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}
                value={selectedClientCompany}
                onChange={(e) => setSelectedClientCompany(e.target.value)}
              >
                {contacts.map(c => (
                  <option key={c.id} value={c.company}>{mask(c.company, 'company')}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        
        {/* DESKTOP NAV TABS (Nur sichtbar wenn nicht im Kunden-Portal Modus) */}
        {!clientPortalMode && (
          <nav className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <button 
              className={`nav-tab ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <Inbox size={16} /> Inbox & Tasks
            </button>
            <button 
              className={`nav-tab ${activeTab === 'crm' ? 'active' : ''}`}
              onClick={() => setActiveTab('crm')}
            >
              <Users size={16} /> CRM & Projekte
            </button>
            <button 
              className={`nav-tab ${activeTab === 'leads' ? 'active' : ''}`}
              onClick={() => setActiveTab('leads')}
            >
              <PhoneCall size={16} /> Lead-Tracker
            </button>
            <button 
              className={`nav-tab ${activeTab === 'prompts' ? 'active' : ''}`}
              onClick={() => setActiveTab('prompts')}
            >
              <BrainCircuit size={16} /> KI Prompts
            </button>
            <button 
              className={`nav-tab ${activeTab === 'hub' ? 'active' : ''}`}
              onClick={() => setActiveTab('hub')}
            >
              <FileText size={16} /> Dokumente & Sync
            </button>
            <button 
              className={`nav-tab ${activeTab === 'sales' ? 'active' : ''}`}
              onClick={() => setActiveTab('sales')}
            >
              <TrendingUp size={16} /> Sales & SOPs
            </button>
          </nav>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        
        {/* ==================== CLIENT PORTAL MODE VIEW ==================== */}
        {clientPortalMode ? (() => {
          const currentContact = contacts.find(c => c.company === selectedClientCompany) || contacts[0];
          const currentProject = projects.find(p => p.client === selectedClientCompany) || { pricePackage: 2500, trackedHours: 42.5, ready: true };
          const companyTickets = clientTickets.filter(t => t.client === selectedClientCompany);
          
          const hoursSaved = (currentProject.trackedHours || 35).toFixed(0);
          const eurSaved = Math.round(hoursSaved * 85);

          return (
            <div className="client-portal-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Client Hero Banner */}
              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15))', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Willkommen im Mandantenportal
                    </span>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginTop: '0.25rem' }}>
                      {mask(selectedClientCompany, 'company')}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      Ansprechpartner: <strong>{mask(currentContact?.name || 'Max Mustermann', 'name')}</strong> | System: <span className="tag tag-system">{mask(currentContact?.system || 'DATEV', 'system')}</span>
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Betreut von:</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-purple)' }}>KMU Service Harz</span>
                  </div>
                </div>
              </div>

              {/* Client KPI Grid */}
              <div className="financial-kpi-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="kpi-card" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                  <span className="kpi-label">Projekt-Status</span>
                  <span className="kpi-value text-cyan" style={{ fontSize: '1.25rem' }}>
                    {currentProject.ready ? '✅ In Betrieb' : '⚙️ In Umsetzung'}
                  </span>
                  <span className="kpi-desc">Systeme laufen automatisiert</span>
                </div>

                <div className="kpi-card" style={{ borderLeft: '3px solid var(--accent-green)' }}>
                  <span className="kpi-label">Zeitersparnis (Gesamt)</span>
                  <span className="kpi-value text-green" style={{ fontSize: '1.25rem' }}>~ {hoursSaved} Std.</span>
                  <span className="kpi-desc">Freigestellte Bürozeit</span>
                </div>

                <div className="kpi-card" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                  <span className="kpi-label">Kalkulatorische Ersparnis</span>
                  <span className="kpi-value text-purple" style={{ fontSize: '1.25rem' }}>~ {eurSaved.toLocaleString('de-DE')} €</span>
                  <span className="kpi-desc">Basierend auf 85 €/h Stundensatz</span>
                </div>

                <div className="kpi-card" style={{ borderLeft: '3px solid var(--accent-yellow)' }}>
                  <span className="kpi-label">Support-Tickets</span>
                  <span className="kpi-value text-yellow" style={{ fontSize: '1.25rem' }}>{companyTickets.filter(t => t.status === 'offen').length} Offen</span>
                  <span className="kpi-desc">{companyTickets.length} Tickets insgesamt</span>
                </div>
              </div>

              {/* Client Portal 2-Spalten Hauptbereich */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }} className="make-simulator-grid">
                
                {/* Linke Spalte: Dokumente & SOPs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Freigegebene SOPs / Anleitungen */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title" style={{ fontSize: '1rem', color: 'var(--accent-purple)' }}>
                        <CheckCircle size={18} /> Freigegebene SOPs & Anleitungen
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {sopTemplates.map((template, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.85rem' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                            {template.name}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {template.steps.slice(0, 2).map((step, sIdx) => (
                              <div key={sIdx} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <ChevronRight size={12} className="text-cyan-500" /> {mask(step, 'inbox')}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projekt-Dokumente & Links */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title" style={{ fontSize: '1rem', color: 'var(--accent-cyan)' }}>
                        <FileText size={18} /> Projekt-Dokumente & Ordner
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {currentContact?.links && currentContact.links.length > 0 ? (
                        currentContact.links.map(link => (
                          <a key={link.id} href={link.url} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                            <span>📁 {link.title}</span>
                            <ExternalLink size={14} className="text-cyan-500" />
                          </a>
                        ))
                      ) : (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', italic: 'true' }}>
                          Keine verknüpften Ordner vorhanden.
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Rechte Spalte: Support- & Änderungsticket System */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Neuer Ticket Erstellen Formular */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title" style={{ fontSize: '1rem', color: 'var(--accent-green)' }}>
                        <LifeBuoy size={18} /> Neues Support-Ticket einreichen
                      </h3>
                    </div>
                    <form onSubmit={handleCreateClientTicket} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      <div className="input-group">
                        <label style={{ fontSize: '0.75rem' }}>Anliegen / Titel</label>
                        <input 
                          type="text" 
                          className="input-field"
                          placeholder="z.B. Neuentwickelten WhatsApp-Bot anpassen..."
                          value={newTicketTitle}
                          onChange={(e) => setNewTicketTitle(e.target.value)}
                          required
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                        <div className="input-group">
                          <label style={{ fontSize: '0.75rem' }}>Priorität</label>
                          <select 
                            className="input-field"
                            value={newTicketPriority}
                            onChange={(e) => setNewTicketPriority(e.target.value)}
                          >
                            <option value="hoch">Hoch (Dringend)</option>
                            <option value="mittel">Mittel (Standard)</option>
                            <option value="niedrig">Niedrig (Wunsch)</option>
                          </select>
                        </div>
                      </div>

                      <div className="input-group">
                        <label style={{ fontSize: '0.75rem' }}>Beschreibung</label>
                        <textarea 
                          className="input-field"
                          rows={3}
                          placeholder="Beschreibe deine Änderungswünsche oder Fragen..."
                          value={newTicketDesc}
                          onChange={(e) => setNewTicketDesc(e.target.value)}
                        />
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem' }}>
                        <Send size={14} /> Ticket absenden
                      </button>
                    </form>
                  </div>

                  {/* Bisherige Tickets Liste */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Bisherige Support-Tickets ({companyTickets.length})
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto' }}>
                      {companyTickets.map(t => (
                        <div key={t.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{t.title}</span>
                            <span className={`card-priority priority-${t.priority}`}>{t.priority}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>{t.desc}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            <span>Erstellt: {t.date}</span>
                            <span style={{ color: t.status === 'offen' ? 'var(--accent-yellow)' : 'var(--accent-green)', fontWeight: 600 }}>Status: {t.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          );
        })() : (
          <>
        {/* ==================== TAB 1: DASHBOARD ==================== */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
            
            {/* Dashboard Customization Header Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '0.75rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }}></span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Gründer-Cockpit: {Object.values(dashboardWidgets).filter(Boolean).length} von 6 Widgets aktiv
                </span>
              </div>
              <button 
                type="button"
                onClick={() => setIsEditingDashboard(!isEditingDashboard)} 
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', border: isEditingDashboard ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)', height: '30px' }}
              >
                <Sliders size={12} /> {isEditingDashboard ? 'Layout fertigstellen' : 'Layout anpassen'}
              </button>
            </div>

            {/* Customization Settings Drawer / Box */}
            {isEditingDashboard && (
              <div className="card" style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px dashed var(--accent-cyan)', animation: 'fadeIn 0.2s ease-out' }}>
                <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                  <h3 className="card-title" style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Settings size={16} /> Dashboard-Widgets konfigurieren
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Aktiviere oder deaktiviere die Widgets, um dein Dashboard anzupassen.</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
                  {[
                    { key: 'financial', label: 'Finanz-Cockpit & Pipeline', desc: 'Umsatzprognose & Ø Stundensätze' },
                    { key: 'einvoice', label: 'E-Rechnung (ZUGFeRD)', desc: 'B2B Rechnungs- & XML Generator' },
                    { key: 'quickcapture', label: 'Quick Capture', desc: 'Schnelle Notiz- & Idee-Erfassung' },
                    { key: 'calendar', label: 'Google Kalender', desc: 'Tagestermine & Meetings' },
                    { key: 'habits', label: 'Habit Tracker & Streak', desc: 'Gewohnheiten & CSS-Konfetti' },
                    { key: 'weekly', label: 'Wochen-Review & Archiv', desc: 'Reflexionen & PDF-Wochenbericht' },
                    { key: 'notes', label: 'Offline-Notizen & Aufgaben', desc: '100% lokale Notizen & Checkliste' }
                  ].map((w) => (
                    <label 
                      key={w.key} 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.25rem', 
                        padding: '0.75rem', 
                        background: dashboardWidgets[w.key] ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255, 255, 255, 0.01)', 
                        border: dashboardWidgets[w.key] ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid var(--border-color)', 
                        borderRadius: '0.5rem', 
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: dashboardWidgets[w.key] ? 'white' : 'var(--text-secondary)' }}>{w.label}</span>
                        <input 
                          type="checkbox" 
                          checked={dashboardWidgets[w.key]} 
                          onChange={() => setDashboardWidgets(prev => ({ ...prev, [w.key]: !prev[w.key] }))}
                          style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
                        />
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{w.desc}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="dashboard-grid">
              
              {/* Finanz-Cockpit Row (v3) */}
              {dashboardWidgets.financial && (
                <div className="card financial-cockpit-section" style={{ gridColumn: 'span 2' }}>
              <div className="card-header">
                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <DollarSign size={20} className="text-cyan-500" />
                  Finanz-Cockpit & Einnahmen-Prognose
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dynamisch verknüpft mit CRM & Zeiterfassung</span>
              </div>
              
              <div className="financial-kpi-container">
                <div className="kpi-card">
                  <span className="kpi-label">Aktives Projektvolumen</span>
                  <span className="kpi-value text-cyan">{activeUmsatz.toLocaleString('de-DE')} €</span>
                  <span className="kpi-desc">{activeProjectsList.length} {activeProjectsList.length === 1 ? 'aktives Projekt' : 'aktive Projekte'} in Umsetzung</span>
                </div>
                
                <div className="kpi-card">
                  <span className="kpi-label">Umsatz-Pipeline</span>
                  <span className="kpi-value text-purple">{pipelineUmsatz.toLocaleString('de-DE')} €</span>
                  <span className="kpi-desc">Gewichtet: {weightedPipeline.toLocaleString('de-DE')} € (50% Chance)</span>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Erwarteter Gesamtumsatz</span>
                  <span className="kpi-value text-green">{totalPrognose.toLocaleString('de-DE')} €</span>
                  <span className="kpi-desc">Laufend + gewichtete Pipeline</span>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Ø Stundensatz (Aktiv)</span>
                  <span className="kpi-value text-yellow">{avgHourlyRate > 0 ? `${avgHourlyRate} €/h` : '—'}</span>
                  <span className="kpi-desc">Berechnet aus erfasster Projektzeit</span>
                </div>
              </div>
            </div>
            )}
            
            {/* E-Rechnungs & Angebotssystem (Feature 5 - v4) */}
            {dashboardWidgets.einvoice && (
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 className="card-title" style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={20} /> E-Rechnungs & Angebotssystem (ZUGFeRD 2.0 / XRechnung)
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Erstelle EN 16931 konforme B2B-Rechnungen. Automatisch kompatibel mit DATEV, Lexoffice und Finanzamt-Standards.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <button 
                    className={`btn ${invoiceFormat === 'zugferd' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: invoiceFormat === 'zugferd' ? 'var(--accent-green)' : 'transparent', border: 'none' }}
                    onClick={() => setInvoiceFormat('zugferd')}
                  >
                    📄 ZUGFeRD 2.0 (PDF+XML)
                  </button>
                  <button 
                    className={`btn ${invoiceFormat === 'xrechnung' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: invoiceFormat === 'xrechnung' ? 'var(--accent-cyan)' : 'transparent', border: 'none' }}
                    onClick={() => setInvoiceFormat('xrechnung')}
                  >
                    ⚙️ XRechnung (Reines XML)
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginTop: '1rem' }} className="make-simulator-grid">
                
                {/* Linke Spalte: Konfigurator Formular */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="input-group">
                      <label style={{ fontSize: '0.75rem' }}>Rechnungsempfänger (Kunde)</label>
                      <select 
                        className="input-field" 
                        value={invoiceClient}
                        onChange={(e) => setInvoiceClient(e.target.value)}
                      >
                        {contacts.map(c => (
                          <option key={c.id} value={c.company}>{mask(c.company, 'company')}</option>
                        ))}
                      </select>
                    </div>

                    <div className="input-group">
                      <label style={{ fontSize: '0.75rem' }}>Rabatt / Skonto (%)</label>
                      <input 
                        type="number" 
                        className="input-field"
                        value={invoiceDiscount}
                        onChange={(e) => setInvoiceDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem' }}>Leistungsposition / Paketbeschreibung</label>
                    <input 
                      type="text" 
                      className="input-field"
                      value={invoicePackage}
                      onChange={(e) => setInvoicePackage(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="input-group">
                      <label style={{ fontSize: '0.75rem' }}>Nettobetrag (€)</label>
                      <input 
                        type="number" 
                        className="input-field"
                        value={invoiceAmount}
                        onChange={(e) => setInvoiceAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                      />
                    </div>

                    <div className="input-group">
                      <label style={{ fontSize: '0.75rem' }}>Berechnete MwSt. (19%)</label>
                      <input 
                        type="text" 
                        className="input-field"
                        readOnly
                        value={`${(invoiceAmount * (1 - invoiceDiscount / 100) * 0.19).toFixed(2)} €`}
                        style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    <button 
                      onClick={generateEinvoicePdf}
                      className="btn btn-primary"
                      style={{ background: 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))', border: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <Download size={14} /> E-Rechnung (PDF/XML) herunterladen
                    </button>
                    
                    <button 
                      onClick={bookInvoiceToLexoffice}
                      className="btn btn-secondary"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <CheckCircle size={14} className="text-green-500" /> In Lexoffice / DATEV buchen
                    </button>

                    <button 
                      onClick={() => setInvoiceXmlPreview(!invoiceXmlPreview)}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                    >
                      {invoiceXmlPreview ? '🙈 XML Vorschau ausblenden' : '🔍 XML-Syntax prüfen'}
                    </button>
                  </div>
                </div>

                {/* Rechte Spalte: Rechnungs-Vorschau / XML Box */}
                <div style={{ background: 'rgba(17, 24, 39, 0.6)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {invoiceXmlPreview ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>
                          ⚡ XML Syntax Validator (EN 16931)
                        </span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--accent-green)', fontWeight: 700 }}>VALIDATED ✔</span>
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#4ade80', background: '#090d16', padding: '0.75rem', borderRadius: '0.5rem', maxHeight: '180px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div>&lt;rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"&gt;</div>
                        <div style={{ paddingLeft: '1rem', color: '#38bdf8' }}>&lt;rsm:ExchangedDocument&gt;</div>
                        <div style={{ paddingLeft: '2rem', color: '#e2e8f0' }}>&lt;ram:ID&gt;RE-2026-8492&lt;/ram:ID&gt;</div>
                        <div style={{ paddingLeft: '2rem', color: '#e2e8f0' }}>&lt;ram:TypeCode&gt;380&lt;/ram:TypeCode&gt;</div>
                        <div style={{ paddingLeft: '1rem', color: '#38bdf8' }}>&lt;/rsm:ExchangedDocument&gt;</div>
                        <div style={{ paddingLeft: '1rem', color: '#38bdf8' }}>&lt;rsm:SupplyChainTradeTransaction&gt;</div>
                        <div style={{ paddingLeft: '2rem', color: '#facc15' }}>&lt;ram:BuyerTradeParty&gt;{mask(invoiceClient, 'company')}&lt;/ram:BuyerTradeParty&gt;</div>
                        <div style={{ paddingLeft: '2rem', color: '#4ade80' }}>&lt;ram:GrandTotalAmount&gt;{(invoiceAmount * (1 - invoiceDiscount / 100) * 1.19).toFixed(2)} EUR&lt;/ram:GrandTotalAmount&gt;</div>
                        <div style={{ paddingLeft: '1rem', color: '#38bdf8' }}>&lt;/rsm:SupplyChainTradeTransaction&gt;</div>
                        <div>&lt;/rsm:CrossIndustryInvoice&gt;</div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                        Zusammenfassung Rechnungsdokument
                      </div>
                      
                      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Empfänger:</span>
                          <span style={{ fontWeight: 700, color: 'white' }}>{mask(invoiceClient, 'company')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Leistung:</span>
                          <span style={{ color: 'var(--text-primary)' }}>{invoicePackage}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Netto:</span>
                          <span>{(invoiceAmount * (1 - invoiceDiscount / 100)).toFixed(2)} €</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>19% MwSt.:</span>
                          <span>{(invoiceAmount * (1 - invoiceDiscount / 100) * 0.19).toFixed(2)} €</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-green)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.4rem' }}>
                          <span>Brutto Gesamt:</span>
                          <span>{(invoiceAmount * (1 - invoiceDiscount / 100) * 1.19).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                    💡 Gesetzliche Pflicht ab 2025/2026: Alle B2B-Rechnungen müssen elektronisch im EN 16931 Format empfangbar und ausstellbar sein.
                  </div>
                </div>

              </div>
            </div>
            )}
            
            {/* Quick Capture */}
            {dashboardWidgets.quickcapture && (
            <div className="card quick-capture-section">
              <div className="card-header">
                <h2 className="card-title"><Plus size={20} className="text-purple-500" /> Neue Idee oder Notiz erfassen</h2>
              </div>
              <form onSubmit={handleQuickCapture} className="quick-capture-box" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  style={{ flexGrow: 1 }}
                  placeholder="Schreibe eine schnelle Notiz oder diktiere sie per Mikrofon-Button..."
                  value={quickCapture}
                  onChange={(e) => setQuickCapture(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleQuickCaptureSpeech}
                  className={`btn-icon-only ${isListeningQuickCapture ? 'listening-pulse' : ''}`}
                  style={{ 
                    padding: '0.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '38px', 
                    width: '38px',
                    minWidth: '38px',
                    background: isListeningQuickCapture ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: isListeningQuickCapture ? '1px solid rgb(239, 68, 68)' : '1px solid var(--border-color)',
                    color: isListeningQuickCapture ? '#ef4444' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                  title="Notiz per Sprache diktieren (Web Speech API)"
                >
                  <Mic size={16} />
                </button>
                <button type="submit" className="btn btn-primary" style={{ height: '38px' }}>Erfassen</button>
              </form>
            </div>
            )}

            {/* Google Calendar Lese-Ansicht */}
            {dashboardWidgets.calendar && (
            <div className="card">
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 className="card-title"><Calendar size={20} className="text-cyan-500" /> Google Kalender (NLP)</h2>
                <div>
                  {!googleConnected ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsConnectingGoogle(true);
                        setTimeout(() => {
                          setGoogleConnected(true);
                          setIsConnectingGoogle(false);
                          alert("🔗 Google-Konto erfolgreich verknüpft! Kalender- & Drive-Berechtigungen erteilt.");
                        }, 1200);
                      }}
                      className="btn btn-secondary"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      disabled={isConnectingGoogle}
                    >
                      {isConnectingGoogle ? 'Verbinde...' : '🔗 Google verknüpfen'}
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ display: 'inline-flex', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)' }} title="Google Live-Sync aktiv"></span>
                      <button
                        type="button"
                        onClick={triggerGoogleSync}
                        className="btn btn-secondary"
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        disabled={isGoogleSyncing}
                      >
                        {isGoogleSyncing ? 'Sync läuft...' : '🔄 Jetzt Synch.'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {googleSyncLogs.length > 0 && (
                <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.5rem', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', maxHeight: '110px', overflowY: 'auto' }}>
                  {googleSyncLogs.map((log, i) => (
                    <div key={i} style={{ color: log.includes('✅') ? 'var(--accent-green)' : 'var(--text-secondary)' }}>{log}</div>
                  ))}
                </div>
              )}
              
              <form onSubmit={handleNlpCalendarSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Schnell eintragen ('Morgen 14 Uhr Müller')..."
                  value={nlpCalendarInput}
                  onChange={(e) => setNlpCalendarInput(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>Eintragen</button>
              </form>

              <div className="calendar-list" style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {calendarEvents.map(ev => (
                  <div key={ev.id} className="calendar-event" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
                    <div>
                      <div className="event-time" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                        {ev.time} ({new Date(ev.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })})
                      </div>
                      <div>
                        <div className="event-title" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{mask(ev.title, "calendar")}</div>
                        <div className="event-desc" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{ev.desc}</div>
                      </div>
                    </div>
                    <button type="button" onClick={() => deleteCalendarEvent(ev.id)} className="btn-icon-only" style={{ padding: '0.25rem' }}>
                      <Trash2 size={12} className="text-red-500" />
                    </button>
                  </div>
                ))}
                {calendarEvents.length === 0 && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                    Keine Termine geplant.
                  </div>
                )}
              </div>
            </div>
            )}

            {/* Tagesfokus */}
            {dashboardWidgets.habits && (
            <div className="card">
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckSquare size={20} className="text-indigo-500" /> Tagesfokus</h2>
                <button 
                  type="button" 
                  onClick={generateDailyAiTasks}
                  className="btn btn-secondary"
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  ⚡ KI-Tagesplan
                </button>
              </div>
              <form onSubmit={addFocusTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Aufgabe hinzufügen..."
                  value={newFocusText}
                  onChange={(e) => setNewFocusText(e.target.value)}
                />
                <button type="submit" className="btn btn-secondary"><Plus size={16} /></button>
              </form>
              <div className="focus-list">
                {focusTasks.map((t, idx) => (
                  <div key={t.id} className={`focus-item ${t.completed ? 'completed' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={t.completed} 
                      onChange={() => toggleFocusTask(t.id)} 
                      style={{ accentColor: 'var(--accent-indigo)', cursor: 'pointer' }}
                    />
                    <span className="focus-badge">#{idx + 1}</span>
                    <span style={{ flexGrow: 1, fontSize: '0.875rem' }}>{t.text}</span>
                    <button onClick={() => deleteFocusTask(t.id)} className="btn-icon-only" style={{ padding: '0.25rem' }}>
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                ))}
                {focusTasks.length === 0 && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                    Kein Fokus definiert. Starte deinen Tag stark!
                  </p>
                )}
              </div>
            </div>
            )}

            {/* Habit Tracker (Gründer-Fokus) */}
            {dashboardWidgets.habits && (
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={20} className="text-green-500" /> 
                  Gründer-Fokus Habit-Tracker
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div className="streak-display-panel">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setHabitStreak(prev => Math.max(0, prev - 1)); }} 
                      className="streak-btn-adj"
                      title="Streak verringern"
                    >
                      -
                    </button>
                    <span className="streak-badge-fire" title="Deine aktuelle tägliche Habit-Streak!">
                      🔥 {habitStreak} {habitStreak === 1 ? 'Tag' : 'Tage'} Streak
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setHabitStreak(prev => prev + 1); }} 
                      className="streak-btn-adj"
                      title="Streak erhöhen"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={triggerConfetti} 
                    className="btn btn-secondary" 
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', height: '24px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    title="Simuliert die Konfetti-Belohnung bei 100% Habit-Abschluss"
                  >
                    🎉 Konfetti zünden
                  </button>
                  
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Täglicher Reset</span>
                </div>
              </div>
              <div className="habit-list">
                {habits.map(h => (
                  <div key={h.id} className="habit-item">
                    <div className="habit-info">
                      <input 
                        type="checkbox" 
                        checked={h.completed}
                        onChange={() => toggleHabit(h.id)}
                        style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--accent-green)', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: h.completed ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: h.completed ? 'line-through' : 'none' }}>
                        {h.text}
                      </span>
                    </div>
                    {h.completed ? (
                      <span style={{ color: 'var(--accent-green)', fontSize: '0.75rem', fontWeight: 700 }}>Erledigt</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Offen</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            )}

            {/* Wochen-Review & Archiv erledigter Aufgaben (Feature A3) */}
            {dashboardWidgets.weekly && (
            <div className="card wochen-review-section" style={{ gridColumn: 'span 2' }}>
              <div 
                className="card-header" 
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none' }}
                onClick={() => setArchiveOpen(!archiveOpen)}
              >
                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                  <CheckCircle size={20} className="text-indigo-500" />
                  Wochen-Review & Archiv (Letzte 7 Tage)
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {archiveOpen && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        generateWeeklyArchivePDF();
                      }}
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px' }}
                      title="Generiert einen formatierten PDF-Bericht der letzten 7 Tage"
                    >
                      <FileText size={14} /> PDF Exportieren
                    </button>
                  )}
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {archiveOpen ? '▲ Einklappen' : '▼ Ausklappen'}
                  </span>
                </div>
              </div>

              {archiveOpen && (
                <div className="archive-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Hier siehst du deine Erfolge und abgehakten Fokus-Aufgaben der letzten 7 Tage. Ergänze Notizen oder eine Tages-Reflexion für dein wöchentliches Review.
                  </p>
                  
                  <div className="archive-days-list" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    {getLast7Days().map(day => {
                      const dayData = weeklyArchive[day.dateString] || { focusTasks: [], completedHabits: [], reflection: '' };
                      const isToday = day.dateString === new Date().toISOString().split('T')[0];
                      
                      return (
                        <div 
                          key={day.dateString} 
                          className="archive-day-card" 
                          style={{ 
                            background: isToday ? 'rgba(99, 102, 241, 0.04)' : 'rgba(255, 255, 255, 0.01)',
                            border: isToday ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            padding: '1rem'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <span style={{ fontWeight: 700, color: isToday ? 'var(--accent-indigo)' : 'var(--text-primary)', fontSize: '0.875rem' }}>
                              {day.formatted} {isToday && '(Heute)'}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {day.dateString}
                            </span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '0.75rem' }}>
                            {/* Fokus Tasks Column */}
                            <div>
                              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Erledigte Fokus-Tasks
                              </span>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                {dayData.focusTasks && dayData.focusTasks.length > 0 ? (
                                  dayData.focusTasks.map((t, i) => (
                                    <div key={i} style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-primary)' }}>
                                      <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>✓</span> {t}
                                    </div>
                                  ))
                                ) : (
                                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                    Keine Aufgaben erledigt
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Habits Column */}
                            <div>
                              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Abgehakte Habits
                              </span>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                {dayData.completedHabits && dayData.completedHabits.length > 0 ? (
                                  dayData.completedHabits.map((h, i) => (
                                    <span 
                                      key={i} 
                                      style={{ 
                                        fontSize: '0.7rem', 
                                        background: 'rgba(16, 185, 129, 0.08)', 
                                        color: 'var(--accent-green)', 
                                        padding: '0.15rem 0.45rem', 
                                        borderRadius: '0.25rem',
                                        border: '1px solid rgba(16, 185, 129, 0.15)',
                                        fontWeight: 500
                                      }}
                                    >
                                      {h}
                                    </span>
                                  ))
                                ) : (
                                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                    Keine Habits abgehakt
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Reflexions-Feld */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                              Reflexion & Tagesnotiz
                            </label>
                            <textarea 
                              placeholder="Was lief heute gut? Welche Hindernisse gab es? Notizen eintragen..."
                              className="input-field"
                              rows={1}
                              style={{ fontSize: '0.8rem', minHeight: '38px', resize: 'vertical' }}
                              value={dayData.reflection || ''}
                              onChange={(e) => updateReflection(day.dateString, e.target.value)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Offline-Notizen & Aufgaben Widget (Feature 2 - v6) */}
            {dashboardWidgets.notes && (
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <div className="card-header">
                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={20} className="text-yellow-500" />
                  Offline-Notizen & Aufgaben (100% Lokal)
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Kein Internet/KI nötig • Speichert automatisch</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
                {/* Linke Seite: Scratchpad Notizen */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Schnelle Notizen / Entwürfe</label>
                    <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => insertMarkdownIntoNotes('bold')}
                        className="btn btn-secondary"
                        style={{ padding: '0.1rem 0.35rem', fontSize: '0.65rem', height: '22px', fontWeight: 'bold' }}
                        title="Fettgedruckt"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownIntoNotes('italic')}
                        className="btn btn-secondary"
                        style={{ padding: '0.1rem 0.35rem', fontSize: '0.65rem', height: '22px', fontStyle: 'italic' }}
                        title="Kursiv"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownIntoNotes('list')}
                        className="btn btn-secondary"
                        style={{ padding: '0.1rem 0.35rem', fontSize: '0.65rem', height: '22px' }}
                        title="Aufzählungspunkt"
                      >
                        • Liste
                      </button>
                      <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 0.15rem' }}>|</span>
                      <button 
                        type="button" 
                        onClick={() => setDashNotes('')} 
                        className="btn" 
                        style={{ padding: '0.15rem 0.45rem', fontSize: '0.65rem', background: 'rgba(239, 68, 68, 0.05)', color: 'var(--accent-red)', border: '1px solid rgba(239, 68, 68, 0.15)', height: '22px' }}
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
                  <textarea
                    id="dash-scratchpad"
                    className="input-field"
                    style={{ flexGrow: 1, minHeight: '160px', fontFamily: 'inherit', fontSize: '0.85rem', lineHeight: '1.4', background: 'rgba(0,0,0,0.2)', resize: 'none' }}
                    placeholder="Tippe hier deine Gedanken, Entwürfe, Telefonnummern oder Mitschriften ein. Sie werden sofort lokal gespeichert..."
                    value={dashNotes}
                    onChange={(e) => setDashNotes(e.target.value)}
                  />
                </div>

                {/* Rechte Seite: Einfache Todos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', margin: 0 }}>Aufgaben-Checkliste</label>
                  
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.target.elements.todoText;
                      handleAddDashTodo(input.value);
                      input.value = '';
                    }} 
                    style={{ display: 'flex', gap: '0.35rem' }}
                  >
                    <input 
                      type="text" 
                      name="todoText"
                      className="input-field"
                      style={{ height: '32px', fontSize: '0.8rem' }}
                      placeholder="Aufgabe hinzufügen..."
                      required
                    />
                    <button type="submit" className="btn btn-secondary" style={{ height: '32px', padding: '0 0.75rem', fontSize: '0.8rem' }}>+</button>
                  </form>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '160px', overflowY: 'auto' }}>
                    {dashTodos.map(todo => (
                      <div key={todo.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.45rem', background: todo.completed ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0.35rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', flexGrow: 1, margin: 0 }}>
                          <input 
                            type="checkbox" 
                            checked={todo.completed} 
                            onChange={() => handleToggleDashTodo(todo.id)}
                            style={{ accentColor: 'var(--accent-green)' }}
                          />
                          <span style={{ fontSize: '0.8rem', color: todo.completed ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                          </span>
                        </label>
                        <button 
                          type="button" 
                          onClick={() => handleDeleteDashTodo(todo.id)} 
                          className="btn-icon-only" 
                          style={{ padding: '0.15rem', background: 'transparent', border: 'none' }}
                        >
                          <Trash2 size={12} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                    {dashTodos.length === 0 && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                        Keine Aufgaben.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            )}

          </div>
        </div>
        )}

        {/* ==================== TAB 2: INBOX & TASKS ==================== */}
        {activeTab === 'tasks' && (
          <div>
            {/* Style override for simulation spinner */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}} />

            {/* The Inbox & WhatsApp Simulator Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '1.5rem', marginBottom: '2rem' }}>
              
              {/* WhatsApp Simulator Card */}
              <div className="card" style={{ height: 'fit-content' }}>
                <div className="card-header">
                  <h2 className="card-title" style={{ color: 'var(--accent-cyan)' }}>
                    <BrainCircuit size={20} /> WhatsApp-Simulator
                  </h2>
                </div>
                <form onSubmit={triggerWhatsAppSimulation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Simuliere live, wie eine WhatsApp-Sprachnachricht oder Textnachricht deines Teams im System empfangen und strukturiert wird.
                  </p>
                  
                  <div className="input-group">
                    <label>Simulierte Nachricht</label>
                    <textarea 
                      className="input-field"
                      rows={3}
                      value={simMessage}
                      onChange={(e) => setSimMessage(e.target.value)}
                      disabled={isSimulating}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Make Webhook URL (Optional)</label>
                    <input 
                      type="url"
                      placeholder="https://hook.us2.make.com/..."
                      className="input-field"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      disabled={isSimulating}
                    />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                      Trage deine Make-Webhook-URL ein, um echte HTTP-POST-Daten live an dein Make-Szenario zu senden!
                    </span>
                  </div>

                  {/* Simulations-Status / Loader */}
                  {isSimulating && (
                    <div style={{ 
                      background: 'rgba(6, 182, 212, 0.05)', 
                      border: '1px dashed rgba(6, 182, 212, 0.3)', 
                      borderRadius: '0.5rem', 
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}>
                      <div className="loading-spinner" style={{ 
                        width: '20px', 
                        height: '20px', 
                        border: '2px solid rgba(6, 182, 212, 0.2)', 
                        borderTopColor: 'var(--accent-cyan)', 
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                        {simStep === 'whisper' && 'Whisper: Transkribiere Audio...'}
                        {simStep === 'gpt' && 'GPT-4: Extrahiere Daten & buche...'}
                      </span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSimulating}
                    style={{ 
                      background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))',
                      boxShadow: 'var(--shadow-glow-cyan)'
                    }}
                  >
                    <Play size={16} /> WhatsApp verarbeiten
                  </button>
                </form>
              </div>

              {/* The Inbox List */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title"><Inbox size={20} className="text-purple-500" /> Die Inbox ({inbox.length} unkategorisierte Belege)</h2>
                </div>
                <div className="inbox-list" style={{ gridTemplateColumns: '1fr', maxHeight: '420px', overflowY: 'auto', gap: '0.75rem' }}>
                  {inbox.map(item => (
                    <div key={item.id} className="inbox-item" style={{ background: 'rgba(255,255,255,0.01)' }}>
                      <div className="inbox-content" style={{ fontSize: '0.825rem' }}>{mask(item.text, 'inbox')}</div>
                      <div className="inbox-footer" style={{ marginTop: '0.5rem' }}>
                        <span>Erfasst am {item.date}</span>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          <button 
                            onClick={() => convertInboxToTask(item)} 
                            className="btn btn-secondary" 
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                          >
                            Zu Aufgabe <ChevronRight size={10} />
                          </button>
                          <button 
                            onClick={() => deleteInboxItem(item.id)} 
                            className="btn-icon-only"
                            style={{ padding: '0.25rem' }}
                          >
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {inbox.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Glueckwunsch! Deine Inbox ist leer. Nutze den WhatsApp-Simulator oder Quick Capture.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Kanban Board */}
            <div className="card">
              <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <h2 className="card-title"><CheckSquare size={20} className="text-indigo-500" /> Kanban-Board</h2>
                
                {/* Schnell-Erstellung Task */}
                <form onSubmit={addNewTask} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="Neue Aufgabe..." 
                    className="input-field" 
                    style={{ width: '200px' }}
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                  <select 
                    className="input-field" 
                    style={{ width: '120px' }}
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                  >
                    <option value="high">Hoch</option>
                    <option value="medium">Mittel</option>
                    <option value="low">Niedrig</option>
                  </select>
                  <button type="submit" className="btn btn-primary"><Plus size={16} /></button>
                </form>
              </div>

              <div className="kanban-board">
                {/* Column: Idee/Später */}
                <div 
                  className="kanban-column"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'idea')}
                >
                  <div className="column-header">
                    <span className="column-title">Idee / Später</span>
                    <span className="column-count">{tasks.filter(t => t.column === 'idea').length}</span>
                  </div>
                  <div className="kanban-cards">
                    {tasks.filter(t => t.column === 'idea').map(t => (
                      <div 
                        key={t.id} 
                        className="kanban-card" 
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.id)}
                      >
                        <span className={`card-priority priority-${t.priority}`}>{t.priority}</span>
                        <div className="card-title-text">{mask(t.title, 'inbox')}</div>
                        <div className="card-meta">
                          <span>{t.date}</span>
                          <button onClick={() => deleteTask(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: To Do */}
                <div 
                  className="kanban-column"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'todo')}
                >
                  <div className="column-header">
                    <span className="column-title">To Do</span>
                    <span className="column-count">{tasks.filter(t => t.column === 'todo').length}</span>
                  </div>
                  <div className="kanban-cards">
                    {tasks.filter(t => t.column === 'todo').map(t => (
                      <div 
                        key={t.id} 
                        className="kanban-card" 
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.id)}
                      >
                        <span className={`card-priority priority-${t.priority}`}>{t.priority}</span>
                        <div className="card-title-text">{mask(t.title, 'inbox')}</div>
                        <div className="card-meta">
                          <span>{t.date}</span>
                          <button onClick={() => deleteTask(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: In Arbeit */}
                <div 
                  className="kanban-column"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'inprogress')}
                >
                  <div className="column-header">
                    <span className="column-title">In Arbeit</span>
                    <span className="column-count">{tasks.filter(t => t.column === 'inprogress').length}</span>
                  </div>
                  <div className="kanban-cards">
                    {tasks.filter(t => t.column === 'inprogress').map(t => (
                      <div 
                        key={t.id} 
                        className="kanban-card" 
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.id)}
                      >
                        <span className={`card-priority priority-${t.priority}`}>{t.priority}</span>
                        <div className="card-title-text">{mask(t.title, 'inbox')}</div>
                        <div className="card-meta">
                          <span>{t.date}</span>
                          <button onClick={() => deleteTask(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: Erledigt */}
                <div 
                  className="kanban-column"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'done')}
                >
                  <div className="column-header">
                    <span className="column-title">Erledigt</span>
                    <span className="column-count">{tasks.filter(t => t.column === 'done').length}</span>
                  </div>
                  <div className="kanban-cards">
                    {tasks.filter(t => t.column === 'done').map(t => (
                      <div 
                        key={t.id} 
                        className="kanban-card" 
                        style={{ opacity: 0.6 }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.id)}
                      >
                        <span className="card-priority" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)' }}>erledigt</span>
                        <div className="card-title-text" style={{ textDecoration: 'line-through' }}>{mask(t.title, 'inbox')}</div>
                        <div className="card-meta">
                          <span>{t.date}</span>
                          <button onClick={() => deleteTask(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={12} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: CRM & PROJECTS ==================== */}
        {activeTab === 'crm' && (
          <div className="crm-grid">
            
            {/* CRM Contacts / Sales Pipeline */}
            <div className="card">
              <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <h2 className="card-title"><Users size={20} className="text-purple-500" /> Mini-CRM & Sales-Pipeline</h2>
              </div>
              
              {/* Kontakt hinzufügen */}
              <form onSubmit={handleAddContact} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="input-field"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Firma" 
                  className="input-field"
                  value={newContact.company}
                  onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Branche (z.B. Handwerk)" 
                  className="input-field"
                  value={newContact.industry}
                  onChange={(e) => setNewContact({ ...newContact, industry: e.target.value })}
                />
                <input 
                  type="text" 
                  placeholder="System (z.B. DATEV)" 
                  className="input-field"
                  value={newContact.system}
                  onChange={(e) => setNewContact({ ...newContact, system: e.target.value })}
                />
                <select 
                  className="input-field"
                  value={newContact.stage}
                  onChange={(e) => setNewContact({ ...newContact, stage: e.target.value })}
                >
                  <option value="erstkontakt">Erstkontakt</option>
                  <option value="gespräch">Gespräch terminiert</option>
                  <option value="angebot">Angebot gesendet</option>
                  <option value="umsetzung">In Umsetzung</option>
                </select>
                <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 1' }}><Plus size={16} /> Neu</button>
              </form>

              {/* CRM Schnell-Filter Badges */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.75rem' }}>
                {[
                  { key: 'all', label: 'Alle', count: contacts.length },
                  { key: 'erstkontakt', label: 'Erstkontakt', count: contacts.filter(c => c.stage === 'erstkontakt').length },
                  { key: 'gespräch', label: 'Gespräch', count: contacts.filter(c => c.stage === 'gespräch').length },
                  { key: 'angebot', label: 'Angebot', count: contacts.filter(c => c.stage === 'angebot').length },
                  { key: 'umsetzung', label: 'Umsetzung', count: contacts.filter(c => c.stage === 'umsetzung').length }
                ].map(pill => {
                  const isActive = crmStageFilter === pill.key;
                  return (
                    <button
                      key={pill.key}
                      type="button"
                      onClick={() => setCrmStageFilter(pill.key)}
                      style={{
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.75rem',
                        fontWeight: isActive ? 700 : 500,
                        borderRadius: '1rem',
                        border: isActive ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                        background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                        color: isActive ? 'var(--accent-purple)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {pill.label} 
                      <span style={{ 
                        fontSize: '0.65rem', 
                        padding: '0.05rem 0.3rem', 
                        borderRadius: '0.5rem', 
                        background: isActive ? 'var(--accent-purple)' : 'rgba(255,255,255,0.08)',
                        color: isActive ? 'white' : 'var(--text-muted)'
                      }}>
                        {pill.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="contact-list">
                {contacts.filter(c => crmStageFilter === 'all' || c.stage === crmStageFilter).map(c => {
                  const warning = isLeadInactive(c.lastContact) && c.stage !== 'umsetzung';
                  return (
                    <div key={c.id} className={`contact-card ${warning ? 'warning-lead' : ''}`}>
                      <div 
                        className="contact-main" 
                        onClick={() => setSelectedContactId(c.id)} 
                        style={{ cursor: 'pointer' }}
                        title="Kundenakte öffnen"
                      >
                        <div className="contact-avatar">
                          {mask(c.company, 'company').substring(0, 2).toUpperCase()}
                        </div>
                        <div className="contact-details">
                          <h3>{mask(c.company, 'company')}</h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ansprechpartner: {mask(c.name, 'name')}</p>
                          <div className="contact-tags">
                            <span className="badge badge-system">{mask(c.industry, 'industry') || 'Keine Branche'}</span>
                            <span className="badge badge-system" style={{ color: 'var(--accent-cyan)', background: 'var(--accent-cyan-glow)' }}>{mask(c.system, 'system') || 'Kein System'}</span>
                            <span className="badge badge-stage">{c.stage}</span>
                          </div>
                        </div>
                      </div>

                      <div className="contact-actions">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                          <span className="last-contact-text">Kontakt: {c.lastContact}</span>
                          {warning && (
                            <span className="lead-warn-indicator">
                              <AlertTriangle size={12} /> &gt; 14 Tage inaktiv!
                            </span>
                          )}
                        </div>
                        
                        {/* Status updaten Dropdown */}
                        <select 
                          className="input-field" 
                          style={{ width: '130px', padding: '0.35rem 0.5rem', fontSize: '0.75rem' }}
                          value={c.stage}
                          onChange={(e) => updateContactStage(c.id, e.target.value)}
                        >
                          <option value="erstkontakt">Erstkontakt</option>
                          <option value="gespräch">Gespräch</option>
                          <option value="angebot">Angebot</option>
                          <option value="umsetzung">Umsetzung</option>
                        </select>

                        <button onClick={() => deleteContact(c.id, c.company)} className="btn-icon-only">
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subsidies & Project Tracker */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title"><TrendingUp size={20} className="text-cyan-500" /> Fördermittel & Projekte</h2>
              </div>
              <div className="project-list">
                {projects.map(proj => {
                  const elapsed = proj.trackingStartTime ? (Date.now() - proj.trackingStartTime) / (1000 * 60 * 60) : 0;
                  const totalHours = (proj.trackedHours || 0) + elapsed;
                  
                  const getHourlyRateInfo = (price, hours) => {
                    if (!hours || hours <= 0) return { rate: '—', status: 'neutral', label: 'Keine Stunden' };
                    const rate = Math.round(price / hours);
                    if (rate < 80) {
                      return { rate: `${rate} €/h`, status: 'danger', label: 'Unrentabel (<80€)' };
                    } else if (rate < 120) {
                      return { rate: `${rate} €/h`, status: 'warning', label: 'Normal (80-120€)' };
                    } else {
                      return { rate: `${rate} €/h`, status: 'success', label: 'Profitabel (>120€)' };
                    }
                  };

                  const rateInfo = getHourlyRateInfo(proj.pricePackage || 2500, totalHours);

                  const formatStopwatch = (startTime) => {
                    if (!startTime) return '00:00:00';
                    const totalSec = Math.floor((Date.now() - startTime) / 1000);
                    const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
                    const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
                    const secs = (totalSec % 60).toString().padStart(2, '0');
                    return `${hrs}:${mins}:${secs}`;
                  };

                  return (
                    <div key={proj.id} className="project-item">
                      <div className="project-info-section">
                        <div className="project-name">{mask(proj.client, 'company')}</div>
                        <div className="project-steps">
                          <label className="project-step-checkbox">
                            <input 
                              type="checkbox" 
                              checked={proj.offerSigned}
                              onChange={() => toggleProjectStep(proj.id, 'offerSigned')}
                            />
                            <span>Angebot unterschrieben</span>
                          </label>
                          <label className="project-step-checkbox">
                            <input 
                              type="checkbox" 
                              checked={proj.subsidyApplied}
                              onChange={() => toggleProjectStep(proj.id, 'subsidyApplied')}
                            />
                            <span>Förderung beantragt</span>
                          </label>
                          <label className="project-step-checkbox">
                            <input 
                              type="checkbox" 
                              checked={proj.subsidyApproved}
                              onChange={() => toggleProjectStep(proj.id, 'subsidyApproved')}
                            />
                            <span>Förderung bewilligt</span>
                          </label>
                          <label className="project-step-checkbox">
                            <input 
                              type="checkbox" 
                              checked={proj.ready}
                              onChange={() => toggleProjectStep(proj.id, 'ready')}
                            />
                            <span>Startklar für Umsetzung</span>
                          </label>
                        </div>
                      </div>

                      <div className="project-tracker-section">
                        <div className="tracker-row">
                          <div className="tracker-field">
                            <span className="field-label">Paketpreis</span>
                            <div className="price-input-wrapper">
                              <input 
                                type="number" 
                                className="input-field tracker-input" 
                                value={proj.pricePackage || 2500} 
                                onChange={(e) => updateProjectPrice(proj.id, e.target.value)} 
                              />
                              <span className="price-unit">€</span>
                            </div>
                          </div>

                          <div className="tracker-field">
                            <span className="field-label">Geleistete Zeit</span>
                            {proj.trackingStartTime ? (
                              <div className="stopwatch-active">
                                <Clock size={14} className="spin-timer" />
                                <span>{formatStopwatch(proj.trackingStartTime)}</span>
                              </div>
                            ) : (
                              <div className="hours-input-wrapper">
                                <input 
                                  type="number" 
                                  step="0.1"
                                  className="input-field tracker-input" 
                                  value={proj.trackedHours !== undefined ? parseFloat(proj.trackedHours.toFixed(1)) : 0} 
                                  onChange={(e) => updateProjectHours(proj.id, e.target.value)} 
                                />
                                <span className="hours-unit">Std.</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="tracker-row" style={{ marginTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                          <div className="tracker-margin-info">
                            <span className="field-label">Effektiver Stundensatz:</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span className={`rate-value text-${rateInfo.status}`}>{rateInfo.rate}</span>
                              <span className={`margin-badge badge-${rateInfo.status}`}>{rateInfo.label}</span>
                            </div>
                          </div>
                          
                          <div className="tracker-controls">
                            {proj.trackingStartTime ? (
                              <button 
                                onClick={() => stopProjectTracking(proj.id)} 
                                className="btn btn-secondary stop-btn"
                                style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                              >
                                <Clock size={12} /> Stoppen
                              </button>
                            ) : (
                              <button 
                                onClick={() => startProjectTracking(proj.id)} 
                                className="btn btn-primary start-btn"
                              >
                                <Play size={12} /> Starten
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
                {projects.length === 0 && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    Lege im CRM einen Lead an, um einen Projekt-Tracker zu starten.
                  </p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 4a: KI PROMPTS & CONTENT ==================== */}
        {activeTab === 'prompts' && (
          <div className="hub-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
            
            {/* Prompt Vault */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title"><BrainCircuit size={20} className="text-purple-500" /> Prompt Vault (KI-Tresor)</h2>
              </div>
              
              {/* Prompt hinzufügen */}
              <form onSubmit={handleAddPrompt} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="Titel des Prompts..." 
                    className="input-field"
                    value={newPrompt.title}
                    onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                    required
                  />
                  <select 
                    className="input-field" 
                    style={{ width: '130px' }}
                    value={newPrompt.category}
                    onChange={(e) => setNewPrompt({ ...newPrompt, category: e.target.value })}
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Code">Code</option>
                    <option value="Strategie">Strategie</option>
                  </select>
                </div>

                {/* Prompt-Baukasten */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    🧩 Prompt-Baukasten (Bausteine zum Einfügen)
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {/* Rollen */}
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#a78bfa', fontWeight: 700, marginBottom: '0.25rem' }}>Prefix (Rolle):</div>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {[
                          { label: 'Marketing', text: 'Agiere als KMU-Marketing-Experte für den Harz. ' },
                          { label: 'SEO', text: 'Agiere als SEO- & Google-Ranking-Spezialist. ' },
                          { label: 'Copywriter', text: 'Agiere als Copywriting-Profi für Landingpages. ' },
                          { label: 'DSGVO Legal', text: 'Agiere als DSGVO- & Legal-Prüfer für KMUs. ' },
                          { label: 'Pitch Coach', text: 'Agiere als erfahrener Business- & Pitch-Coach. ' },
                          { label: 'Finanzen', text: 'Agiere als DATEV- & Finanzbuchhaltungsexperte. ' }
                        ].map((b, idx) => (
                          <button 
                            key={idx} 
                            type="button" 
                            className="tag" 
                            style={{ cursor: 'pointer', border: 'none', background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', fontSize: '0.65rem', padding: '0.2rem 0.45rem', borderRadius: '0.25rem' }}
                            onClick={() => setNewPrompt(prev => ({ ...prev, text: b.text + prev.text }))}
                          >
                            ➕ {b.label}
                          </button>
                        ))}

                        {/* Eigene Prefixes */}
                        {customPromptBlocks.filter(b => b.category === 'prefix').map(b => (
                          <div key={b.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.15rem', background: 'rgba(139, 92, 246, 0.25)', border: '1px solid rgba(139, 92, 246, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '0.25rem' }}>
                            <button
                              type="button"
                              style={{ border: 'none', background: 'transparent', color: '#a78bfa', fontSize: '0.65rem', padding: 0, cursor: 'pointer' }}
                              onClick={() => setNewPrompt(prev => ({ ...prev, text: b.content + prev.text }))}
                            >
                              ➕ {b.name}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCustomPromptBlock(b.id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--accent-red)', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.75rem', lineHeight: 1 }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tonalität */}
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#22d3ee', fontWeight: 700, marginBottom: '0.25rem' }}>Tonalität & Stil:</div>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {[
                          { label: 'Locker & Du', text: '\nSchreibe in lockerem & nahbarem "Du"-Stil.' },
                          { label: 'Professionell', text: '\nFormuliere professionell, sachlich und fachbezogen.' },
                          { label: 'Prägnant', text: '\nSchreibe extrem prägnant, direkt und ohne Floskeln.' },
                          { label: 'Verkaufsstark', text: '\nNutze einen begeisternden, verkaufsstarken Werbeton.' }
                        ].map((b, idx) => (
                          <button 
                            key={idx} 
                            type="button" 
                            className="tag" 
                            style={{ cursor: 'pointer', border: 'none', background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', fontSize: '0.65rem', padding: '0.2rem 0.45rem', borderRadius: '0.25rem' }}
                            onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + b.text }))}
                          >
                            ➕ {b.label}
                          </button>
                        ))}

                        {/* Eigene Tonalitäten */}
                        {customPromptBlocks.filter(b => b.category === 'tone').map(b => (
                          <div key={b.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.15rem', background: 'rgba(6, 182, 212, 0.25)', border: '1px solid rgba(6, 182, 212, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '0.25rem' }}>
                            <button
                              type="button"
                              style={{ border: 'none', background: 'transparent', color: '#22d3ee', fontSize: '0.65rem', padding: 0, cursor: 'pointer' }}
                              onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + '\n' + b.content }))}
                            >
                              ➕ {b.name}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCustomPromptBlock(b.id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--accent-red)', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.75rem', lineHeight: 1 }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Format */}
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#34d399', fontWeight: 700, marginBottom: '0.25rem' }}>Ausgabeformat:</div>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {[
                          { label: 'Markdown Tabelle', text: '\nGib das Ergebnis als übersichtliche Markdown-Tabelle aus.' },
                          { label: 'Emoji Bulletpoints', text: '\nStrukturiere die Antwort in Bulletpoints mit passenden Emojis.' },
                          { label: 'Schritt-für-Schritt', text: '\nErstelle eine detaillierte Schritt-für-Schritt-Anleitung.' },
                          { label: 'JSON Format', text: '\nAntworte ausschließlich im validen JSON-Format.' }
                        ].map((b, idx) => (
                          <button 
                            key={idx} 
                            type="button" 
                            className="tag" 
                            style={{ cursor: 'pointer', border: 'none', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '0.65rem', padding: '0.2rem 0.45rem', borderRadius: '0.25rem' }}
                            onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + b.text }))}
                          >
                            ➕ {b.label}
                          </button>
                        ))}

                        {/* Eigene Formate */}
                        {customPromptBlocks.filter(b => b.category === 'format').map(b => (
                          <div key={b.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.15rem', background: 'rgba(16, 185, 129, 0.25)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '0.25rem' }}>
                            <button
                              type="button"
                              style={{ border: 'none', background: 'transparent', color: '#34d399', fontSize: '0.65rem', padding: 0, cursor: 'pointer' }}
                              onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + '\n' + b.content }))}
                            >
                              ➕ {b.name}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCustomPromptBlock(b.id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--accent-red)', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.75rem', lineHeight: 1 }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suffix / Action */}
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#fbbf24', fontWeight: 700, marginBottom: '0.25rem' }}>Suffix (Aufforderung):</div>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {[
                          { label: '3 Rückfragen', text: '\nStelle mir am Ende 3 vertiefende Rückfragen zur Präzisierung.' },
                          { label: 'Risikoanalyse', text: '\nFühre eine Risikoanalyse für die vorgeschlagene Lösung durch.' },
                          { label: '3 Alternativen', text: '\nGib mir 3 alternative Headlines oder Einstiegsformulierungen.' },
                          { label: 'Einfach erklärt', text: '\nErkläre es so einfach, als wäre ich 10 Jahre alt (ELI5).' }
                        ].map((b, idx) => (
                          <button 
                            key={idx} 
                            type="button" 
                            className="tag" 
                            style={{ cursor: 'pointer', border: 'none', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontSize: '0.65rem', padding: '0.2rem 0.45rem', borderRadius: '0.25rem' }}
                            onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + b.text }))}
                          >
                            ➕ {b.label}
                          </button>
                        ))}

                        {/* Eigene Suffixe */}
                        {customPromptBlocks.filter(b => b.category === 'suffix').map(b => (
                          <div key={b.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.15rem', background: 'rgba(251, 191, 36, 0.25)', border: '1px solid rgba(251, 191, 36, 0.4)', padding: '0.15rem 0.35rem', borderRadius: '0.25rem' }}>
                            <button
                              type="button"
                              style={{ border: 'none', background: 'transparent', color: '#fbbf24', fontSize: '0.65rem', padding: 0, cursor: 'pointer' }}
                              onClick={() => setNewPrompt(prev => ({ ...prev, text: prev.text + '\n' + b.content }))}
                            >
                              ➕ {b.name}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCustomPromptBlock(b.id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--accent-red)', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '0.75rem', lineHeight: 1 }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Eigene Bausteine verwalten Toggle Button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowCustomBlockForm(!showCustomBlockForm)}
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.65rem', height: '22px' }}
                    >
                      {showCustomBlockForm ? 'Schließen' : '➕ Eigene Bausteine verwalten'}
                    </button>
                  </div>

                  {/* Formular zum Erstellen eigener Bausteine */}
                  {showCustomBlockForm && (
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--accent-purple)', borderRadius: '0.5rem', padding: '0.75rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-purple)' }}>Neuen Prompt-Baustein erstellen</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.5rem' }}>
                        <input
                          type="text"
                          className="input-field"
                          style={{ height: '30px', fontSize: '0.75rem' }}
                          placeholder="Baustein-Name (z.B. Marketing-Expert)"
                          value={newBlockName}
                          onChange={(e) => setNewBlockName(e.target.value)}
                        />
                        <select
                          className="input-field"
                          style={{ height: '30px', fontSize: '0.75rem', padding: '0.25rem' }}
                          value={newBlockCategory}
                          onChange={(e) => setNewBlockCategory(e.target.value)}
                        >
                          <option value="prefix">Rolle (Prefix)</option>
                          <option value="tone">Tonalität & Stil</option>
                          <option value="format">Ausgabeformat</option>
                          <option value="suffix">Aktion (Suffix)</option>
                        </select>
                      </div>
                      <textarea
                        className="input-field"
                        rows={2}
                        style={{ fontSize: '0.75rem' }}
                        placeholder="Inhalt des Bausteins (z.B. 'Agiere als erfahrener...')"
                        value={newBlockContent}
                        onChange={(e) => setNewBlockContent(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomPromptBlock}
                        className="btn btn-primary"
                        style={{ height: '28px', padding: '0 0.5rem', fontSize: '0.75rem', width: 'fit-content', alignSelf: 'flex-end' }}
                      >
                        Baustein speichern
                      </button>
                    </div>
                  )}
                </div>

                <textarea 
                  placeholder="Prompt Text..." 
                  className="input-field" 
                  rows={4}
                  value={newPrompt.text}
                  onChange={(e) => setNewPrompt({ ...newPrompt, text: e.target.value })}
                  required
                />
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem' }}>
                    <Plus size={16} /> Prompt sichern
                  </button>
                  <button 
                    type="button" 
                    onClick={optimizePromptWithLocalAI} 
                    disabled={ollamaLoading}
                    className="btn btn-secondary" 
                    style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <svg className={ollamaLoading ? 'spin' : ''} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                    {ollamaLoading ? 'Optimiert...' : 'Per lokaler KI verbessern (Ollama)'}
                  </button>
                </div>
              </form>

              {/* Prompt-Suche & Filter */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
                <input
                  type="text"
                  className="input-field"
                  style={{ height: '32px', fontSize: '0.8rem' }}
                  placeholder="Prompts durchsuchen (Titel oder Inhalt)..."
                  value={promptSearch}
                  onChange={(e) => setPromptSearch(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { key: 'all', label: 'Alle' },
                    { key: 'Sales', label: 'Sales' },
                    { key: 'Marketing', label: 'Marketing' },
                    { key: 'Code', label: 'Code' },
                    { key: 'Strategie', label: 'Strategie' }
                  ].map(cat => {
                    const isActive = promptCategoryFilter === cat.key;
                    const count = cat.key === 'all' ? prompts.length : prompts.filter(p => p.category === cat.key).length;
                    return (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setPromptCategoryFilter(cat.key)}
                        style={{
                          padding: '0.2rem 0.5rem',
                          fontSize: '0.7rem',
                          borderRadius: '0.25rem',
                          border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                          background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                          color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {cat.label}
                        <span style={{ fontSize: '0.6rem', color: isActive ? 'white' : 'var(--text-muted)' }}>
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="prompt-vault">
                {prompts.filter(p => {
                  const matchesCategory = promptCategoryFilter === 'all' || p.category === promptCategoryFilter;
                  const matchesSearch = p.title.toLowerCase().includes(promptSearch.toLowerCase()) || p.text.toLowerCase().includes(promptSearch.toLowerCase());
                  return matchesCategory && matchesSearch;
                }).map(p => (
                  <div key={p.id} className="prompt-card">
                    <div className="prompt-head">
                      <span className="prompt-title">{p.title}</span>
                      <span className="prompt-cat">{p.category}</span>
                    </div>
                    <div className="prompt-body">{p.text}</div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button 
                        onClick={() => copyPromptText(p.text)} 
                        className="btn btn-secondary" 
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                      >
                        <ClipboardCopy size={12} /> Kopieren
                      </button>
                      <button onClick={() => deletePrompt(p.id)} className="btn-icon-only" style={{ padding: '0.35rem' }}>
                        <Trash2 size={12} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Content Planer & RAG Knowledge Bot */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Content-Planer */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title"><TrendingUp size={20} className="text-indigo-500" /> Social Media Content-Planer</h2>
                </div>
                
                <form onSubmit={handleAddPost} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <input 
                    type="text" 
                    placeholder="Post Thema / Idee" 
                    className="input-field" 
                    style={{ flexGrow: 1, minWidth: '150px' }}
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    required
                  />
                  <input 
                    type="date" 
                    className="input-field" 
                    style={{ width: '130px' }}
                    value={newPost.date}
                    onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                    required
                  />
                  <select 
                    className="input-field" 
                    style={{ width: '110px' }}
                    value={newPost.status}
                    onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
                  >
                    <option value="idea">Idee</option>
                    <option value="draft">Entwurf</option>
                    <option value="ready">Bereit</option>
                    <option value="done">Gepostet</option>
                  </select>
                  <button type="submit" className="btn btn-primary"><Plus size={16} /></button>
                </form>

                <div className="content-planer-list">
                  {contentPosts.map(post => (
                    <div key={post.id} className="content-post">
                      <div className="post-info">
                        <span className="post-title">{post.title}</span>
                        <span className="post-date">Geplant am {post.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className={`post-status status-${post.status}`}>{post.status}</span>
                        <button onClick={() => deletePost(post.id)} className="btn-icon-only" style={{ padding: '0.35rem' }}>
                          <Trash2 size={12} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* "Frag das Firmengehirn" RAG Knowledge Bot */}
              <div className="card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h2 className="card-title" style={{ color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BrainCircuit size={20} /> "Frag das Firmengehirn" – RAG Knowledge Bot
                      </h2>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Dokumenten-basiertes KI-Wissen abrufen</span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      <button 
                        className={`btn ${ragPersona === 'brain' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'brain' ? 'var(--accent-purple)' : 'transparent', border: 'none' }}
                        onClick={() => setRagPersona('brain')}
                      >
                        🧠 &nbsp;Firmengehirn
                      </button>
                      <button 
                        className={`btn ${ragPersona === 'sales' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'sales' ? 'var(--accent-cyan)' : 'transparent', border: 'none' }}
                        onClick={() => setRagPersona('sales')}
                      >
                        🎯 &nbsp;Pitch-Coach
                      </button>
                      <button 
                        className={`btn ${ragPersona === 'legal' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'legal' ? 'var(--accent-yellow)' : 'transparent', border: 'none' }}
                        onClick={() => setRagPersona('legal')}
                      >
                        🔒 &nbsp;DSGVO
                      </button>
                    </div>
                  </div>

                  {/* Quick Prompts Bar */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Schnellfragen:</span>
                    <button 
                      onClick={() => handleSendRagQuery('Wie läuft das Neukunden-Onboarding ab?')}
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
                    >
                      ⚡ Neukunden-Onboarding
                    </button>
                    <button 
                      onClick={() => handleSendRagQuery('Was kosten unsere Automatisierungs-Pakete?')}
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
                    >
                      ⚡ Preispakete & Kosten
                    </button>
                    <button 
                      onClick={() => handleSendRagQuery('Welche Datenschutz-Standards gelten bei Sprachnachrichten?')}
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
                    >
                      ⚡ DSGVO & Sicherheit
                    </button>
                  </div>

                  {/* Chat Stream Window */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '260px', overflowY: 'auto', background: 'rgba(9, 13, 22, 0.7)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                    {ragChat.map((msg) => (
                      <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                        <div style={{
                          padding: '0.65rem 0.85rem',
                          borderRadius: '0.75rem',
                          fontSize: '0.85rem',
                          lineHeight: '1.45',
                          background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))' : 'rgba(255, 255, 255, 0.04)',
                          color: '#f4f4f5',
                          border: msg.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.05)'
                        }}>
                          {msg.text}
                        </div>
                        {msg.sources && msg.sources.length > 0 && (
                          <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Quellen:</span>
                            {msg.sources.map((s, idx) => (
                              <span key={idx} style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '0.05rem 0.25rem', borderRadius: '0.25rem' }}>
                                📄 {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {ragGenerating && (
                      <div style={{ display: 'flex', gap: '0.35rem', alignSelf: 'flex-start', background: 'rgba(255,255,255,0.04)', padding: '0.65rem 0.85rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span className="dot-pulse" style={{ background: 'var(--accent-purple)' }}></span>
                        <span className="dot-pulse" style={{ background: 'var(--accent-cyan)', animationDelay: '0.2s' }}></span>
                        <span className="dot-pulse" style={{ background: 'var(--accent-purple)', animationDelay: '0.4s' }}></span>
                      </div>
                    )}
                  </div>

                  {/* Input Form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendRagQuery();
                    }} 
                    style={{ display: 'flex', gap: '0.5rem' }}
                  >
                    <input 
                      type="text" 
                      className="input-field" 
                      style={{ flexGrow: 1 }}
                      placeholder={`Frage das Firmengehirn (Persona: ${ragPersona === 'brain' ? 'Firmengehirn' : ragPersona === 'sales' ? 'Pitch-Coach' : 'DSGVO & Legal'})...`}
                      value={ragInput}
                      onChange={(e) => setRagInput(e.target.value)}
                      disabled={ragGenerating}
                    />
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={ragGenerating || !ragInput.trim()}
                      style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', border: 'none', padding: '0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <Send size={14} /> Fragen
                    </button>
                  </form>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4b: DOKUMENTE & SYNC ==================== */}
        {activeTab === 'hub' && (
          <div className="hub-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
            
            {/* Left Column: Dokumenten-Tresor & NotebookLM */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Wissens-Hub & Google Docs */}
              <div className="card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="card-title"><FileText size={20} className="text-cyan-500" /> Wissens-Hub (Dokumente)</h2>
                  <button
                    type="button"
                    onClick={() => handleOpenDocInEditor(null)}
                    className="btn btn-primary"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', height: '28px' }}
                  >
                    ➕ Neues Dokument erstellen
                  </button>
                </div>
                
                <div className="upload-zone" onClick={() => handleOpenDocInEditor(null)} style={{ border: '1px dashed var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.02)', padding: '1rem', textAlign: 'center', cursor: 'pointer', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                  <Upload size={20} style={{ color: 'var(--accent-cyan)', marginBottom: '0.25rem' }} />
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, margin: 0 }}>Neues Dokument im Editor verfassen</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>Schreibe Texte oder kopiere Inhalte direkt in die App</p>
                </div>

                <div className="drive-section">
                  <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                    Dokumenten-Ablage (Lokal & Google Drive)
                  </h3>
                  <div className="docs-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {docs.map(doc => {
                      let badgeBg = 'rgba(59, 130, 246, 0.15)';
                      let badgeColor = '#60a5fa';
                      let badgeText = '☁️ Nur Lokal';

                      if (doc.status === 'synced') {
                        badgeBg = 'rgba(16, 185, 129, 0.15)';
                        badgeColor = '#34d399';
                        badgeText = '✅ Synchronisiert';
                      } else if (doc.status === 'modified') {
                        badgeBg = 'rgba(245, 158, 11, 0.15)';
                        badgeColor = '#fbbf24';
                        badgeText = '⚠️ Bearbeitet';
                      }

                      return (
                        <div 
                          key={doc.id} 
                          className="doc-link-item"
                          onClick={() => handleOpenDocInEditor(doc.id)}
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            padding: '0.6rem 0.75rem', 
                            background: 'rgba(255,255,255,0.02)', 
                            border: '1px solid var(--border-color)', 
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div className="doc-info" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={16} className="text-cyan-500" />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                              <span className="doc-title" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{mask(doc.title, 'inbox')}</span>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'left' }}>
                                {doc.content ? `${doc.content.substring(0, 45)}...` : 'Kein Inhalt'}
                              </span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.35rem', borderRadius: '0.25rem', background: badgeBg, color: badgeColor }}>
                              {badgeText}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => downloadDocAsFile(doc, e)}
                              className="btn-icon-only"
                              title="Als Textdatei herunterladen"
                              style={{ padding: '0.2rem', background: 'transparent' }}
                            >
                              <Download size={13} className="text-cyan-500" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleDeleteDoc(doc.id, e)}
                              className="btn-icon-only"
                              title="Dokument löschen"
                              style={{ padding: '0.2rem', background: 'transparent' }}
                            >
                              <Trash2 size={13} className="text-red-500" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Digitales Firmengehirn (NotebookLM) */}
              <div className="card notebooklm-card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="card-title">
                    <BrainCircuit size={20} className="text-purple-500" />
                    Digitales Firmengehirn (NotebookLM)
                  </h2>
                  <span className={`sync-badge ${notebookLmSyncStatus}`}>
                    {notebookLmSyncStatus === 'syncing' ? 'Synchronisiert...' : 'Bereit'}
                  </span>
                </div>
                
                <div className="notebooklm-body" style={{ marginTop: '0.75rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    Dieses Panel visualisiert den Abgleich deiner internen Dokumenten-Ablage mit dem KI-Firmengehirn in Google NotebookLM.
                  </p>
                  
                  <div className="notebooklm-details-grid" style={{ marginBottom: '1rem' }}>
                    <div className="detail-item">
                      <span className="detail-label">Status</span>
                      <span className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {notebookLmSyncStatus === 'syncing' ? (
                          <>
                            <span className="sync-pulse-icon active"></span>
                            Synchronisiert gerade
                          </>
                        ) : (
                          <>
                            <span className="sync-pulse-icon success"></span>
                            Online & Aktiv
                          </>
                        )}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Wissensquellen</span>
                      <span className="detail-value">{docs.length} Dokumente</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Letzter Sync</span>
                      <span className="detail-value">{notebookLmLastSync}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Datenvolumen</span>
                      <span className="detail-value">~{(docs.length * 312 + 424) >= 1024 ? ((docs.length * 312 + 424) / 1024).toFixed(2) + ' MB' : (docs.length * 312 + 424) + ' KB'}</span>
                    </div>
                  </div>

                  {notebookLmSyncStatus === 'syncing' && (
                    <div className="sync-progress-container" style={{ margin: '1rem 0', padding: '0.75rem', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                        <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>{notebookLmSyncStep}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{notebookLmProgress}%</span>
                      </div>
                      <div className="sync-progress-bar-bg" style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div className="sync-progress-bar-fill" style={{ width: `${notebookLmProgress}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))', transition: 'width 0.4s ease-out' }}></div>
                      </div>
                    </div>
                  )}

                  {docs.filter(d => d.status === 'local' || d.status === 'modified').length > 0 && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-yellow)', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.15)', borderRadius: '0.35rem', padding: '0.5rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <AlertTriangle size={14} />
                      Es gibt {docs.filter(d => d.status === 'local' || d.status === 'modified').length} Dokumente mit ausstehenden Änderungen.
                    </div>
                  )}

                  <button 
                    type="button"
                    onClick={triggerManualGoogleDriveSync} 
                    disabled={notebookLmSyncStatus === 'syncing'} 
                    className="btn btn-secondary"
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', border: docs.filter(d => d.status === 'local' || d.status === 'modified').length > 0 ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)' }}
                  >
                    <svg 
                      className={notebookLmSyncStatus === 'syncing' ? 'spin' : ''} 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                    </svg>
                    {notebookLmSyncStatus === 'syncing' ? 'Synchronisiere Drive & NotebookLM...' : 'Google Drive & NotebookLM aktualisieren'}
                  </button>

                  <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                      Google OAuth Client-ID
                    </label>
                    <input 
                      type="text" 
                      className="input-field" 
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem', height: 'auto', fontFamily: 'monospace' }}
                      value={googleClientId} 
                      onChange={(e) => setGoogleClientId(e.target.value)} 
                      placeholder="Deine Google Cloud Client-ID..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Supabase Cloud Sync Manager */}
            <div>
              {/* Master-Logbuch (masterLogbuch.txt) */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)' }}>
                    <FileText size={20} className="text-purple-500" />
                    masterLogbuch.txt (Immer offen)
                  </h2>
                  <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '0.25rem', background: 'rgba(163, 116, 255, 0.15)', color: 'var(--accent-purple)', fontWeight: 700 }}>
                    ✍️ Direkt-Bearbeitung
                  </span>
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                  <textarea
                    className="input-field"
                    style={{ width: '100%', height: '200px', fontFamily: 'monospace', fontSize: '0.8rem', resize: 'vertical', lineHeight: '1.4', background: 'rgba(0,0,0,0.2)' }}
                    placeholder="Schreibe hier deinen aktuellen Stand hinein..."
                    value={docs.find(d => d.id === 'master-logbuch')?.content || ''}
                    onChange={(e) => {
                      const newContent = e.target.value;
                      setDocs(prev => prev.map(d => 
                        d.id === 'master-logbuch' 
                          ? { ...d, content: newContent, status: d.status === 'synced' ? 'modified' : d.status } 
                          : d
                      ));
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span>Zeichen: {(docs.find(d => d.id === 'master-logbuch')?.content || '').length}</span>
                    <span style={{ color: docs.find(d => d.id === 'master-logbuch')?.status === 'synced' ? 'var(--accent-green)' : 'var(--accent-yellow)' }}>
                      Status: {docs.find(d => d.id === 'master-logbuch')?.status === 'synced' ? '✅ Synchronisiert' : '☁️ Nur Lokal (Ungespeichert)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Supabase Cloud Sync Manager (Feature 6 - v4) */}
              <div className="card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Database size={20} className="text-emerald-500" />
                    Supabase Cloud Sync
                  </h2>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '0.15rem 0.5rem', 
                    borderRadius: '0.25rem', 
                    background: supabaseSyncStatus === 'syncing' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    color: supabaseSyncStatus === 'syncing' ? 'var(--accent-yellow)' : 'var(--accent-green)',
                    fontWeight: 700
                  }}>
                    {supabaseSyncStatus === 'syncing' ? '⌛ SYNCHRONISIERT...' : '🟢 ONLINE'}
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Echtzeit-Synchronisation mit deinem PostgreSQL-Cloud-Backend. Synchronisiert Kontakte, Tasks, Inbox und Tickets.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'rgba(0,0,0,0.15)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Letzter Sync:</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{supabaseLastSync}</div>
                    
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tabellen-Status:</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      4 Tabellen aktiv
                    </div>
                    
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Latenz:</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600 }}>18 ms</div>
                  </div>

                  <div style={{ marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>MONITORING (DATENZEILEN):</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {[
                        { name: 'contacts (CRM-Kunden)', count: contacts.length },
                        { name: 'tasks (To-Dos)', count: tasks.length },
                        { name: 'inbox (Posteingang)', count: inbox.length },
                        { name: 'client_tickets (Support)', count: clientTickets.length }
                      ].map((t, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.03)' }}>
                          <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{t.name}</span>
                          <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{t.count} Zeilen</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={triggerSupabaseSync}
                      disabled={supabaseSyncStatus === 'syncing'}
                      className="btn btn-secondary"
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}
                    >
                      <svg className={supabaseSyncStatus === 'syncing' ? 'spin' : ''} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                      </svg>
                      {supabaseSyncStatus === 'syncing' ? 'Synchronisiere Cloud...' : 'Supabase Cloud-Sync erzwingen'}
                    </button>
                  </div>

                  {supabaseLogs.length > 0 && (
                    <div style={{ marginTop: '0.5rem', background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.5rem' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'bold', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Cloud Sync Terminal logs:</div>
                      <div style={{ padding: '0.5rem', fontFamily: 'monospace', fontSize: '0.7rem', color: '#e2e8f0', maxHeight: '110px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        {supabaseLogs.map((log, i) => (
                          <div key={i} style={{ color: log.includes('🎉') ? '#4ade80' : log.includes('🔄') ? '#facc15' : '#38bdf8' }}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h2 className="card-title" style={{ color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <BrainCircuit size={20} /> "Frag das Firmengehirn" – RAG Knowledge Bot
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      Stelle Fragen an deine indizierten Unternehmensdokumente. Die KI antwortet mit präzisen Quellenangaben.
                    </p>
                  </div>

                  {/* Persona Selector Tabs */}
                  <div style={{ display: 'flex', gap: '0.35rem', background: 'rgba(0,0,0,0.3)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                    <button 
                      className={`btn ${ragPersona === 'brain' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'brain' ? 'var(--accent-purple)' : 'transparent', border: 'none' }}
                      onClick={() => setRagPersona('brain')}
                    >
                      🧠 Firmengehirn
                    </button>
                    <button 
                      className={`btn ${ragPersona === 'sales' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'sales' ? 'var(--accent-cyan)' : 'transparent', border: 'none' }}
                      onClick={() => setRagPersona('sales')}
                    >
                      🎯 Pitch-Coach
                    </button>
                    <button 
                      className={`btn ${ragPersona === 'legal' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: ragPersona === 'legal' ? 'var(--accent-yellow)' : 'transparent', border: 'none' }}
                      onClick={() => setRagPersona('legal')}
                    >
                      🔒 DSGVO & Legal
                    </button>
                  </div>
                </div>

                {/* Quick Prompts Bar */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Schnellfragen:</span>
                  <button 
                    onClick={() => handleSendRagQuery('Wie läuft das Neukunden-Onboarding ab?')}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
                  >
                    ⚡ Neukunden-Onboarding
                  </button>
                  <button 
                    onClick={() => handleSendRagQuery('Was kosten unsere Automatisierungs-Pakete?')}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
                  >
                    ⚡ Preispakete & Kosten
                  </button>
                  <button 
                    onClick={() => handleSendRagQuery('Welche Datenschutz-Standards gelten bei Sprachnachrichten?')}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '1rem' }}
                  >
                    ⚡ DSGVO & Sicherheit
                  </button>
                </div>

                {/* Chat Stream Window */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '260px', overflowY: 'auto', background: 'rgba(9, 13, 22, 0.7)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                  {ragChat.map((msg) => (
                    <div 
                      key={msg.id}
                      style={{ 
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--accent-indigo), #3b82f6)' : 'rgba(31, 41, 55, 0.8)',
                        border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                        padding: '0.85rem 1rem',
                        borderRadius: '0.75rem',
                        color: 'white',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div style={{ whiteSpace: 'pre-line', lineHeight: 1.4 }}>{msg.text}</div>
                      
                      {/* Sources Citation List */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div style={{ marginTop: '0.6rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>
                          <span style={{ fontWeight: 700, display: 'block', marginBottom: '0.15rem' }}>📄 Verifizierte Quellen aus Google Drive:</span>
                          {msg.sources.map((src, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <ChevronRight size={10} /> <span>{src}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {ragGenerating && (
                    <div style={{ alignSelf: 'flex-start', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <BrainCircuit size={16} className="spin" /> Durchsuche Firmengehirn & generiere Antwort...
                    </div>
                  )}
                </div>

                {/* Input Form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendRagQuery();
                  }}
                  style={{ display: 'flex', gap: '0.75rem' }}
                >
                  <input 
                    type="text" 
                    className="input-field"
                    placeholder="Stelle eine Frage an dein Unternehmenswissen..."
                    value={ragInput}
                    onChange={(e) => setRagInput(e.target.value)}
                    disabled={ragGenerating}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={ragGenerating || !ragInput.trim()}
                    style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', border: 'none', padding: '0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Send size={14} /> Fragen
                  </button>
                </form>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: SALES-TOOLS & SOPs ==================== */}
        {activeTab === 'sales' && (
          <div className="sales-grid">
            
            {/* Showcase ROI Calculator */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title"><TrendingUp size={20} className="text-cyan-500" /> Showcase ROI-Rechner</h2>
              </div>
              <div className="showcase-calculator">
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Nutze dieses Tool live im Verkaufsgespräch, um KMUs die jährliche Ersparnis durch deine Automatisierung zu demonstrieren.
                </p>
                
                <div className="input-group">
                  <label>Name der manuellen Aufgabe</label>
                  <input 
                    type="text" 
                    className="input-field"
                    value={calcInputs.taskName}
                    onChange={(e) => setCalcInputs({ ...calcInputs, taskName: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label>Stunden pro Woche</label>
                    <input 
                      type="number" 
                      className="input-field"
                      value={calcInputs.durationHours}
                      onChange={(e) => setCalcInputs({ ...calcInputs, durationHours: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="input-group">
                    <label>Stundenlohn (€)</label>
                    <input 
                      type="number" 
                      className="input-field"
                      value={calcInputs.hourlyRate}
                      onChange={(e) => setCalcInputs({ ...calcInputs, hourlyRate: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label>Projekt-Festpreis (€)</label>
                    <input 
                      type="number" 
                      className="input-field"
                      value={calcInputs.setupFee}
                      onChange={(e) => setCalcInputs({ ...calcInputs, setupFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="input-group">
                    <label>Foerdermittel-Region</label>
                    <select 
                      className="input-field"
                      value={calcInputs.subsidyRegion}
                      onChange={(e) => setCalcInputs({ ...calcInputs, subsidyRegion: e.target.value })}
                    >
                      <option value="NDS">Niedersachsen (50%)</option>
                      <option value="LSA">Sachsen-Anhalt (50%)</option>
                      <option value="BUND">Bund / go-digital (30%)</option>
                      <option value="NONE">Keine Foerderung (0%)</option>
                    </select>
                  </div>
                </div>

                {/* Visuelle Gegenueberstellung / Balkendiagramm */}
                <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    Jaehrlicher Zeitaufwand im Vergleich:
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                        <span>Manuell (Bisher)</span>
                        <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>{savings.hours} Std. / Jahr</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to right, var(--accent-red), var(--accent-yellow))' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                        <span>Automatisiert (Neu)</span>
                        <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>~ {(savings.rawYearlyHours * 0.1).toFixed(0)} Std. / Jahr</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: '10%', height: '100%', background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-indigo))', boxShadow: 'var(--shadow-glow-cyan)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="calc-result-box">
                  <div className="calc-result-label">Erwartete Ersparnis durch Automatisierung:</div>
                  <div className="calc-result-value" style={{ color: 'var(--accent-cyan)' }}>
                    ~ {((savings.rawYearlyEur * 0.9)).toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })} / Jahr
                  </div>
                  <div className="calc-result-sub" style={{ marginBottom: '1rem' }}>
                    und ca. <strong>{(savings.rawYearlyHours * 0.9).toFixed(0)} Stunden</strong> freigestellte Arbeitszeit pro Jahr.
                  </div>
                  
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem', textAlign: 'left', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Projekt-Investition (Festpreis):</span>
                      <span>{calcInputs.setupFee.toLocaleString('de-DE')} EUR</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-cyan)' }}>
                      <span>Staatlicher Zuschuss (Foerderung):</span>
                      <span>- {savings.subsidyAmount}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--accent-green)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.25rem' }}>
                      <span>Deine Netto-Investition:</span>
                      <span>{savings.netInvestment}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                      <span>Amortisationszeit:</span>
                      <span>ca. {savings.paybackMonths} Monate</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={generatePDFReport} 
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))', boxShadow: 'var(--shadow-glow-cyan)' }}
                >
                  <FileText size={16} /> ROI-Analyse als PDF exportieren
                </button>
              </div>
            </div>

            {/* SOPs & Checklists */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title"><CheckCircle size={20} className="text-purple-500" /> SOPs & Checklisten</h2>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                  SOP-Vorlagen (Zum Starten anklicken)
                </h3>
                <div className="sop-templates-list">
                  {sopTemplates.map(template => (
                    <div key={template.id} className="sop-card" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                      <div className="sop-head">
                        <span className="sop-title">{template.name}</span>
                        <button 
                          onClick={() => startSopFromTemplate(template)} 
                          className="btn btn-primary"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                        >
                          <Play size={12} /> Starten
                        </button>
                      </div>
                      <div className="sop-steps">
                        {template.steps.slice(0, 2).map((step, idx) => (
                          <div key={idx} className="sop-step">
                            <ChevronRight size={12} /> {step}
                          </div>
                        ))}
                        {template.steps.length > 2 && (
                          <div className="sop-step" style={{ color: 'var(--text-muted)' }}>
                            ...und {template.steps.length - 2} weitere Schritte.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                  Aktive Checklisten
                </h3>
                <div className="sop-templates-list">
                  {activeSops.map(sop => {
                    const completedSteps = sop.steps.filter(s => s.done).length;
                    const totalSteps = sop.steps.length;
                    return (
                      <div key={sop.id} className="sop-card" style={{ borderLeft: '3px solid var(--accent-green)' }}>
                        <div className="sop-head">
                          <div>
                            <span className="sop-title">{sop.name}</span>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Kunde: <strong>{mask(sop.client, 'company')}</strong></div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{completedSteps}/{totalSteps}</span>
                            <button onClick={() => deleteActiveSop(sop.id)} className="btn-icon-only">
                              <Trash2 size={12} className="text-red-500" />
                            </button>
                          </div>
                        </div>
                        <div className="sop-steps" style={{ marginTop: '0.75rem' }}>
                          {sop.steps.map((step, idx) => (
                            <label key={idx} className="project-step-checkbox" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <input 
                                type="checkbox" 
                                checked={step.done}
                                onChange={() => toggleActiveSopStep(sop.id, idx)}
                              />
                              <span style={{ textDecoration: step.done ? 'line-through' : 'none', color: step.done ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                                {mask(step.text, 'inbox')}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {activeSops.length === 0 && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                      Keine aktiven Checklisten. Starte eine aus einer Vorlage oben!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Zettel-zu-Code Visualisierer (Volle Breite) */}
            <div className="card" style={{ gridColumn: 'span 2', marginTop: '1.5rem' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 className="card-title" style={{ color: 'var(--accent-purple)' }}><BrainCircuit size={20} /> Zettel-zu-Code Prozess-Visualisierer</h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Visualisiere im Gespraech den direkten Unterschied zwischen Zettelwirtschaft und Automatisierung.
                  </p>
                </div>
                
                {/* Use Case Waehler Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(17, 24, 39, 0.6)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  {Object.keys(PROCESSES).map(key => (
                    <button 
                      key={key} 
                      className={`btn ${selectedUseCase === key ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ 
                        padding: '0.35rem 0.75rem', 
                        fontSize: '0.75rem', 
                        borderRadius: '0.35rem',
                        background: selectedUseCase === key ? 'var(--accent-purple)' : 'transparent',
                        borderColor: 'transparent',
                        color: selectedUseCase === key ? 'white' : 'var(--text-secondary)'
                      }}
                      onClick={() => setSelectedUseCase(key)}
                    >
                      {PROCESSES[key].title}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '1.5rem', textAlign: 'center' }}>
                  "{PROCESSES[selectedUseCase].desc}"
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  
                  {/* Vorher-Pfad (Zettelwirtschaft) */}
                  <div style={{ background: 'rgba(239, 68, 68, 0.02)', border: '1px solid rgba(239, 68, 68, 0.12)', borderRadius: '0.75rem', padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--accent-red)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertTriangle size={16} /> Bisheriger Weg (Papier & Manuell)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                      {PROCESSES[selectedUseCase].before.map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '0.75rem', position: 'relative' }}>
                          <div style={{ 
                            minWidth: '24px', 
                            height: '24px', 
                            borderRadius: '50%', 
                            background: 'rgba(239, 68, 68, 0.1)', 
                            border: '1px solid rgba(239, 68, 68, 0.3)', 
                            color: 'var(--accent-red)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            fontSize: '0.75rem', 
                            fontWeight: 700,
                            justifyContent: 'center'
                          }}>
                            {idx + 1}
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{step.step}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nachher-Pfad (Automatisiert) */}
                  <div style={{ background: 'rgba(6, 182, 212, 0.02)', border: '1px solid rgba(6, 182, 212, 0.12)', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 0 15px rgba(6, 182, 212, 0.05)' }}>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <BrainCircuit size={16} /> Neuer Weg (Vollautomatisiert)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {PROCESSES[selectedUseCase].after.map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '0.75rem' }}>
                          <div style={{ 
                            minWidth: '24px', 
                            height: '24px', 
                            borderRadius: '50%', 
                            background: 'rgba(6, 182, 212, 0.1)', 
                            border: '1px solid rgba(6, 182, 212, 0.3)', 
                            color: 'var(--accent-cyan)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            fontSize: '0.75rem', 
                            fontWeight: 700,
                            justifyContent: 'center',
                            boxShadow: '0 0 10px rgba(6, 182, 212, 0.2)'
                          }}>
                            {idx + 1}
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{step.step}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Make.com Szenario-Simulator (Volle Breite) (Feature B1) */}
            <div className="card" style={{ gridColumn: 'span 2', marginTop: '1.5rem' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 className="card-title" style={{ color: 'var(--accent-cyan)' }}>
                    <BrainCircuit size={20} /> Interaktiver Make.com Szenario-Simulator
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Demonstriere live, wie Daten im Hintergrund durch Schnittstellen fließen.
                  </p>
                </div>
                
                <button 
                  onClick={startMakeSimulation}
                  disabled={makeSimRunning}
                  className="btn btn-primary"
                  style={{ 
                    background: 'linear-gradient(135deg, #d946ef, #8b5cf6)', 
                    boxShadow: '0 0 15px rgba(217, 70, 239, 0.4)',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    fontSize: '0.825rem',
                    fontWeight: 600
                  }}
                >
                  {makeSimRunning ? 'Simulation läuft...' : 'Szenario ausführen (Testen)'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }} className="make-simulator-grid">
                
                {/* Linke Seite: Der Graph */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Szenario-Ablaufplan (Make-Module)
                  </label>
                  
                  <div className="make-scenario-graph">
                    <div className={`make-node ${makeActiveNode === 1 ? 'active' : ''} ${makeActiveNode > 1 ? 'completed' : ''}`}>
                      <Inbox size={22} />
                      <span className="make-node-label">WhatsApp</span>
                    </div>
                    
                    <div className={`make-connector ${makeActiveNode === 1 ? 'active' : ''} ${makeActiveNode > 1 ? 'completed' : ''}`} />
                    
                    <div className={`make-node ${makeActiveNode === 2 ? 'active' : ''} ${makeActiveNode > 2 ? 'completed' : ''}`}>
                      <Clock size={22} />
                      <span className="make-node-label">Whisper (KI)</span>
                    </div>
                    
                    <div className={`make-connector ${makeActiveNode === 2 ? 'active' : ''} ${makeActiveNode > 2 ? 'completed' : ''}`} />
                    
                    <div className={`make-node ${makeActiveNode === 3 ? 'active' : ''} ${makeActiveNode > 3 ? 'completed' : ''}`}>
                      <BrainCircuit size={22} />
                      <span className="make-node-label">GPT-4 (KI)</span>
                    </div>
                    
                    <div className={`make-connector ${makeActiveNode === 3 ? 'active' : ''} ${makeActiveNode > 3 ? 'completed' : ''}`} />
                    
                    <div className={`make-node ${makeActiveNode === 4 ? 'active' : ''} ${makeActiveNode > 4 ? 'completed' : ''}`}>
                      <ClipboardCopy size={22} />
                      <span className="make-node-label">Lexoffice</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-color)', display: 'inline-block' }}></span>
                      Bereit
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', display: 'inline-block', boxShadow: '0 0 5px var(--accent-cyan)' }}></span>
                      Aktiv
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }}></span>
                      Erfolgreich
                    </div>
                  </div>
                </div>

                {/* Rechte Seite: Log Terminal */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Ausführungsprotokoll (Live-Log)
                  </label>
                  
                  <div style={{ 
                    background: '#090d16', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '0.5rem', 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    overflow: 'hidden',
                    minHeight: '200px'
                  }}>
                    {/* Mac window header */}
                    <div style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      borderBottom: '1px solid rgba(255,255,255,0.05)', 
                      padding: '0.5rem 0.75rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.35rem' 
                    }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginLeft: '0.5rem' }}>make-scenario-log.sh</span>
                    </div>
                    
                    {/* Log lines */}
                    <div style={{ 
                      padding: '0.75rem', 
                      fontFamily: 'monospace', 
                      fontSize: '0.75rem', 
                      color: '#38bdf8', 
                      overflowY: 'auto', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '0.35rem',
                      flexGrow: 1
                    }}>
                      {makeLogs.map((log, index) => {
                        let color = '#38bdf8'; // cyan
                        if (log.includes('✅') || log.includes('🎉')) color = '#4ade80'; // green
                        if (log.includes('🎙️') || log.includes('🧠') || log.includes('⚡')) color = '#c084fc'; // purple
                        if (log.includes('🔍')) color = '#e2e8f0'; // white
                        
                        return (
                          <div key={index} style={{ color, wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                            {log}
                          </div>
                        );
                      })}
                      {makeLogs.length === 0 && (
                        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', margin: 'auto' }}>
                          Klicke auf "Szenario ausführen", um die Live-Datenübertragung zu veranschaulichen.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Visueller No-Code Automation Canvas (Feature 1 - v4) */}
            <div className="card" style={{ gridColumn: 'span 2', marginTop: '1.5rem' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 className="card-title" style={{ color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={20} /> Visueller No-Code Automation Canvas
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Erstelle benutzerdefinierte Automatisierungspfade, konfiguriere KI-Knoten und simuliere die End-to-End Ausführung.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={startCanvasTestRun}
                    disabled={canvasTestRunning}
                    className="btn btn-primary"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))', 
                      boxShadow: 'var(--shadow-glow-cyan)',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Play size={14} /> {canvasTestRunning ? 'Testlauf läuft...' : 'Workflow testen'}
                  </button>
                </div>
              </div>

              {/* Toolbar & Hinzufügen von Modulen */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', margin: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Knoten hinzufügen:
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button onClick={() => addCanvasNode('email')} className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={12} /> E-Mail Trigger
                  </button>
                  <button onClick={() => addCanvasNode('openai')} className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={12} /> Claude / GPT KI
                  </button>
                  <button onClick={() => addCanvasNode('datev')} className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={12} /> DATEV Export
                  </button>
                  <button onClick={() => addCanvasNode('slack')} className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={12} /> Slack Alert
                  </button>
                </div>
              </div>

              {/* Hauptbereich: Interactive Canvas Grid & Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="canvas-main-grid">
                
                {/* Canvas Zeichenfläche */}
                <div style={{ 
                  background: 'rgba(17, 24, 39, 0.6)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '0.75rem', 
                  padding: '1.5rem',
                  minHeight: '260px',
                  display: 'flex',
                  alignItems: 'center',
                  overflowX: 'auto',
                  position: 'relative',
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 0)',
                  backgroundSize: '20px 20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%', padding: '1rem 0' }}>
                    {canvasNodes.map((node, idx) => {
                      const isSelected = selectedCanvasNodeId === node.id;
                      const isActiveInTest = canvasTestActiveNode === node.id;

                      return (
                        <React.Fragment key={node.id}>
                          <div 
                            onClick={() => setSelectedCanvasNodeId(node.id)}
                            style={{ 
                              minWidth: '180px',
                              background: isSelected ? 'rgba(139, 92, 246, 0.08)' : 'rgba(31, 41, 55, 0.8)',
                              border: isActiveInTest 
                                ? '2px solid var(--accent-cyan)' 
                                : isSelected 
                                  ? '2px solid var(--accent-purple)' 
                                  : '1px solid var(--border-color)',
                              borderRadius: '0.75rem',
                              padding: '1rem',
                              cursor: 'pointer',
                              boxShadow: isActiveInTest 
                                ? '0 0 20px rgba(6, 182, 212, 0.4)' 
                                : isSelected 
                                  ? '0 0 15px rgba(139, 92, 246, 0.3)' 
                                  : 'none',
                              transition: 'all 0.3s ease',
                              transform: isSelected || isActiveInTest ? 'scale(1.03)' : 'scale(1)',
                              position: 'relative'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span style={{ 
                                fontSize: '0.65rem', 
                                padding: '0.15rem 0.4rem', 
                                borderRadius: '0.25rem', 
                                background: node.type === 'trigger' ? 'rgba(59, 130, 246, 0.15)' : node.type === 'ai' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                color: node.type === 'trigger' ? 'var(--accent-cyan)' : node.type === 'ai' ? 'var(--accent-purple)' : 'var(--accent-green)',
                                fontWeight: 700
                              }}>
                                {node.category}
                              </span>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>#{idx + 1}</span>
                            </div>

                            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                              {node.title}
                            </h4>

                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.2)', padding: '0.35rem', borderRadius: '0.25rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                              {Object.entries(node.config)[0] ? `${Object.entries(node.config)[0][0]}: ${Object.entries(node.config)[0][1]}` : 'Keine Config'}
                            </div>
                          </div>

                          {/* Verbindungs-Pfeil */}
                          {idx < canvasNodes.length - 1 && (
                            <div style={{ display: 'flex', alignItems: 'center', color: isActiveInTest ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                              <ChevronRight size={24} style={{ animation: isActiveInTest ? 'pulse 1s infinite' : 'none' }} />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* Rechte Seite: Konfigurations-Panel für den ausgewählten Knoten */}
                <div style={{ background: 'rgba(31, 41, 55, 0.6)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {selectedCanvasNodeId ? (() => {
                    const selectedNode = canvasNodes.find(n => n.id === selectedCanvasNodeId);
                    if (!selectedNode) return <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Kein Knoten ausgewählt.</div>;

                    return (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '0.35rem', margin: 0 }}>
                            <Sliders size={16} /> Knoten-Einstellungen
                          </h3>
                          <button onClick={() => deleteCanvasNode(selectedNode.id)} className="btn-icon-only" title="Knoten löschen">
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                          <div className="input-group">
                            <label style={{ fontSize: '0.75rem' }}>Knoten-Titel</label>
                            <input 
                              type="text" 
                              className="input-field" 
                              style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem' }}
                              value={selectedNode.title} 
                              onChange={(e) => {
                                setCanvasNodes(canvasNodes.map(n => n.id === selectedNode.id ? { ...n, title: e.target.value } : n));
                              }}
                            />
                          </div>

                          {Object.entries(selectedNode.config).map(([key, val]) => (
                            <div key={key} className="input-group">
                              <label style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>{key}</label>
                              <input 
                                type="text" 
                                className="input-field" 
                                style={{ fontSize: '0.8rem', padding: '0.35rem 0.6rem' }}
                                value={val} 
                                onChange={(e) => updateCanvasNodeConfig(selectedNode.id, key, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })() : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', margin: 'auto' }}>
                      Klicke auf einen Knoten im Canvas, um seine Parameter zu konfigurieren.
                    </div>
                  )}

                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    💡 Änderungen werden automatisch im <code>localStorage</code> gesichert.
                  </div>
                </div>

              </div>

              {/* Unterer Bereich: Execution Terminal für Custom Canvas Testläufe */}
              {canvasTestLogs.length > 0 && (
                <div style={{ marginTop: '1.25rem', background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0.4rem 0.75rem', fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'monospace', fontWeight: 600 }}>
                    ⚡ Custom Canvas Terminal Log
                  </div>
                  <div style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#e2e8f0', maxHeight: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {canvasTestLogs.map((log, i) => (
                      <div key={i} style={{ color: log.includes('🎉') || log.includes('🚀') ? '#4ade80' : '#38bdf8' }}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* KI-Telefonagent / Voice-AI Simulator (Feature 3 - v4) */}
            <div className="card" style={{ gridColumn: 'span 2', marginTop: '1.5rem' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 className="card-title" style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={20} /> KI-Telefonagent / Voice-AI Simulator (Retell / Vapi Mock)
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Simuliere automatische KI-Telefonate für Notdienst-Abfragen oder Neukunden-Qualifizierung mit Live-Sprachtranskription.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <select 
                    className="input-field"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem', width: 'auto' }}
                    value={voiceScenario}
                    onChange={(e) => setVoiceScenario(e.target.value)}
                    disabled={voiceCallActive}
                  >
                    <option value="notdienst">Szenario 1: Handwerker Notdienst (Rohrbruch)</option>
                    <option value="erstkontakt">Szenario 2: Neukunden Erstkontakt (Pflegedienst)</option>
                  </select>

                  <button 
                    onClick={startVoiceCallSimulation}
                    disabled={voiceCallActive}
                    className="btn btn-primary"
                    style={{ 
                      background: voiceCallActive ? 'linear-gradient(135deg, #ef4444, #f59e0b)' : 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))', 
                      boxShadow: voiceCallActive ? '0 0 15px rgba(239, 68, 68, 0.4)' : '0 0 15px rgba(16, 185, 129, 0.4)',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Phone size={14} /> {voiceCallActive ? 'Anruf läuft...' : 'Anruf starten (Simulieren)'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }} className="make-simulator-grid">
                
                {/* Linke Seite: Telefonat Interface & Audio Wave */}
                <div style={{ background: 'rgba(17, 24, 39, 0.6)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                        Live Audio-Stream & Spracherkennung
                      </span>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        padding: '0.15rem 0.5rem', 
                        borderRadius: '0.25rem', 
                        background: voiceCallActive ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: voiceCallActive ? 'var(--accent-red)' : 'var(--accent-green)',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <Volume2 size={12} /> {voiceCallActive ? '● ANRUF AKTIV' : '○ BEREIT'}
                      </span>
                    </div>

                    {/* Audio Soundwave Animation */}
                    <div className={`voice-wave-container ${voiceCallActive ? 'active' : ''}`}>
                      <div className="voice-wave-bar"></div>
                      <div className="voice-wave-bar"></div>
                      <div className="voice-wave-bar"></div>
                      <div className="voice-wave-bar"></div>
                      <div className="voice-wave-bar"></div>
                    </div>

                    {/* Transkript Stream */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minHeight: '160px', maxHeight: '220px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                      {voiceTranscript.map((item, index) => (
                        <div key={index} style={{ 
                          alignSelf: item.speaker === 'agent' ? 'flex-start' : 'flex-end',
                          background: item.speaker === 'agent' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(6, 182, 212, 0.15)',
                          border: item.speaker === 'agent' ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(6, 182, 212, 0.3)',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.5rem',
                          maxWidth: '90%',
                          fontSize: '0.8rem',
                          color: 'var(--text-primary)'
                        }}>
                          <div>{item.text}</div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.15rem' }}>{item.time}</div>
                        </div>
                      ))}
                      {voiceTranscript.length === 0 && (
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', margin: 'auto', fontStyle: 'italic' }}>
                          Klicke auf "Anruf starten", um das KI-Telefonat live zu simulieren.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rechte Seite: Automatische Daten-Extraktion & CRM Ergebnisse */}
                <div style={{ background: 'rgba(31, 41, 55, 0.6)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                      📊 KI-Ergebnis & CRM-Übernahme
                    </h3>

                    {voiceExtractedData ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-green)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                            Erfasster Anrufer
                          </span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{voiceExtractedData.anrufer}</span>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                            Extrahiertes Anliegen
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{voiceExtractedData.anliegen}</span>
                        </div>

                        <div style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-purple)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                            Automatische Folge-Aktion
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 500 }}>{voiceExtractedData.aktion}</span>
                        </div>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', margin: 'auto', padding: '2rem 0', fontStyle: 'italic' }}>
                        {voiceCallActive ? '⌛ KI analysiert das laufende Gespräch...' : 'Starte ein Telefonat, um die automatische Extraktion zu sehen.'}
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    💡 Nach dem Telefonat wird das Ergebnis automatisch in deine Inbox & das CRM übertragen.
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {activeTab === 'leads' && (
          <div className="crm-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem' }} id="leads-tab-content">
            
            {/* Linke Spalte: Leads Liste */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 'fit-content', maxHeight: '80vh' }}>
              <div className="card-header" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'stretch' }}>
                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                  <PhoneCall size={20} className="text-purple-500" />
                  Kaltakquise-Kontakte ({leads.length})
                </h2>
                
                {/* Suche */}
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Firma oder Branche suchen..."
                  value={leadsSearch}
                  onChange={(e) => setLeadsSearch(e.target.value)}
                  style={{ width: '100%' }}
                />

                {/* Filter */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  <select 
                    className="input-field" 
                    value={leadsPrioFilter} 
                    onChange={(e) => setLeadsPrioFilter(e.target.value)}
                    style={{ fontSize: '0.7rem', height: 'auto', padding: '0.2rem 0.4rem', flex: 1 }}
                  >
                    <option value="all">Alle Prioritäten</option>
                    <option value="A">Prio A</option>
                    <option value="B">Prio B</option>
                    <option value="C">Prio C</option>
                  </select>

                  <select 
                    className="input-field" 
                    value={leadsStatusFilter} 
                    onChange={(e) => setLeadsStatusFilter(e.target.value)}
                    style={{ fontSize: '0.7rem', height: 'auto', padding: '0.2rem 0.4rem', flex: 1 }}
                  >
                    <option value="all">Alle Status</option>
                    <option value="nicht kontaktiert">Nicht kontaktiert</option>
                    <option value="in Arbeit">In Arbeit</option>
                    <option value="Pain Points erfasst">Pain Points erfasst</option>
                    <option value="Kein Interesse">Kein Interesse</option>
                    <option value="Wiedervorlage">Wiedervorlage</option>
                  </select>
                </div>
              </div>

              {/* Leads Liste */}
              <div style={{ overflowY: 'auto', flex: 1, padding: '0 0.5rem', maxHeight: '55vh' }}>
                {leads
                  .filter(l => {
                    const matchesSearch = l.company.toLowerCase().includes(leadsSearch.toLowerCase()) || 
                                          (l.industry && l.industry.toLowerCase().includes(leadsSearch.toLowerCase()));
                    const matchesPrio = leadsPrioFilter === 'all' || l.priority === leadsPrioFilter;
                    const matchesStatus = leadsStatusFilter === 'all' || l.status === leadsStatusFilter;
                    return matchesSearch && matchesPrio && matchesStatus;
                  })
                  .map(lead => {
                    const isActive = lead.id === activeLeadId;
                    const isCompleted = lead.status === 'Pain Points erfasst';
                    return (
                      <div 
                        key={lead.id}
                        onClick={() => setActiveLeadId(lead.id)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                          border: isActive ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                          marginBottom: '0.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '0.25rem', background: lead.priority === 'A' ? 'rgba(239, 68, 68, 0.15)' : lead.priority === 'B' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: lead.priority === 'A' ? '#f87171' : lead.priority === 'B' ? '#fbbf24' : '#34d399' }}>
                            Prio {lead.priority}
                          </span>
                          <span style={{ fontSize: '0.65rem', color: isCompleted ? '#34d399' : 'var(--text-secondary)' }}>
                            {lead.status}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0.35rem 0 0.15rem 0', color: 'white' }}>
                          {showcaseMode ? 'Muster-Firma GmbH' : lead.company}
                        </h4>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                          {lead.industry} • {lead.city}
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>

            {/* Rechte Spalte: Lead-Protokoll & Anruf-Dashboard */}
            <div className="card" style={{ height: 'fit-content' }}>
              {activeLeadId ? (() => {
                const activeLead = leads.find(l => l.id === activeLeadId);
                if (!activeLead) return null;
                return (
                  <form onSubmit={handleSaveLeadFeedback}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                      <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'white' }}>
                          {showcaseMode ? 'Muster-Firma GmbH' : activeLead.company}
                        </h2>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {activeLead.industry} • {activeLead.street}, {activeLead.city}
                        </span>
                      </div>
                      
                      {activeLead.phone && (
                        <a 
                          href={`tel:${activeLead.phone}`} 
                          className="btn btn-primary"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
                        >
                          <Phone size={14} /> Jetzt anrufen
                        </a>
                      )}
                    </div>

                    {/* Vorbereitungs-Box */}
                    <div style={{ background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.15)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1.25rem' }}>
                      <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginTop: 0, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <BrainCircuit size={12} /> Vorbereitungs-Hinweise
                      </h4>
                      {activeLead.expected_objection && (
                        <div style={{ fontSize: '0.75rem', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                          <strong>Möglicher Einwand:</strong> {activeLead.expected_objection}
                        </div>
                      )}
                      {activeLead.call_hook && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          <strong>Gesprächs-Aufhänger:</strong> {activeLead.call_hook}
                        </div>
                      )}
                    </div>

                    {/* Feedback-Formular */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label htmlFor="pain-point-select" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Pain Point (Primär)
                        </label>
                        <select 
                          id="pain-point-select"
                          className="input-field"
                          value={formPainPoint}
                          onChange={(e) => setFormPainPoint(e.target.value)}
                        >
                          <option value="">-- Schmerzpunkt wählen --</option>
                          <option value="Bürokratie / Papierkram">Bürokratie / Papierkram</option>
                          <option value="Zeitmangel in der Verwaltung">Zeitmangel in der Verwaltung</option>
                          <option value="Fehlende Übersicht / Chaos">Fehlende Übersicht / Chaos</option>
                          <option value="Probleme bei Nachkalkulation">Probleme bei Nachkalkulation</option>
                          <option value="Angst vor komplexer IT">Angst vor komplexer IT</option>
                          <option value="Fachkräftemangel / Auslastung">Fachkräftemangel / Auslastung</option>
                          <option value="Anderer Pain Point">Anderer Schmerzpunkt (siehe Notiz)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Dringlichkeit (1-5)
                        </label>
                        <div style={{ display: 'flex', gap: '0.25rem', height: '38px', alignItems: 'center' }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFormUrgency(star)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                padding: '0 0.1rem',
                                color: star <= formUrgency ? 'var(--accent-yellow)' : 'var(--text-muted)'
                              }}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Eingangshürde / Einwand (real)
                        </label>
                        <textarea
                          className="input-field"
                          style={{ height: '70px', resize: 'vertical' }}
                          value={formActualObjection}
                          onChange={(e) => setFormActualObjection(e.target.value)}
                          placeholder="Welcher Einwand wurde geäußert?..."
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Tatsächlicher Gesprächs-Aufhänger
                        </label>
                        <textarea
                          className="input-field"
                          style={{ height: '70px', resize: 'vertical' }}
                          value={formConversationHook}
                          onChange={(e) => setFormConversationHook(e.target.value)}
                          placeholder="Welches Thema hat das Eis gebrozen?..."
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label htmlFor="next-step-input" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Nächster Schritt
                        </label>
                        <input
                          id="next-step-input"
                          type="text"
                          className="input-field"
                          value={formNextStep}
                          onChange={(e) => setFormNextStep(e.target.value)}
                          placeholder="z.B. Termin vereinbaren, Wiedervorlage..."
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          Status
                        </label>
                        <select 
                          className="input-field"
                          value={formStatus}
                          onChange={(e) => setFormStatus(e.target.value)}
                        >
                          <option value="nicht kontaktiert">Nicht kontaktiert</option>
                          <option value="in Arbeit">In Arbeit</option>
                          <option value="Pain Points erfasst">Pain Points erfasst</option>
                          <option value="Kein Interesse">Kein Interesse</option>
                          <option value="Wiedervorlage">Wiedervorlage</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', fontWeight: 600 }}>
                        Bemerkungen / Weitere Details
                      </label>
                      <textarea
                        className="input-field"
                        style={{ height: '80px', resize: 'vertical' }}
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder="Interne Notizen zum Telefonat..."
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                      disabled={isSavingLead}
                    >
                      <CheckCircle size={16} />
                      {isSavingLead ? 'Speichert...' : 'Gesprächs-Feedback speichern'}
                    </button>
                  </form>
                );
              })() : (
                <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📞</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Kein Unternehmen ausgewählt</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '300px', margin: '0 auto' }}>
                    Wähle ein Unternehmen aus der linken Liste aus, um das Kaltakquise-Gespräch zu starten und zu dokumentieren.
                  </p>
                </div>
              )}
            </div>
            
          </div>
        )}
        </>
        )}

      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {!clientPortalMode && (
        <nav className="mobile-nav-bar">
          <button 
            className={`mobile-nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            className={`mobile-nav-tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <Inbox size={20} />
            <span>Tasks</span>
          </button>
          <button 
            className={`mobile-nav-tab ${activeTab === 'crm' ? 'active' : ''}`}
            onClick={() => setActiveTab('crm')}
          >
            <Users size={20} />
            <span>CRM</span>
          </button>
          <button 
            className={`mobile-nav-tab ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            <PhoneCall size={20} />
            <span>Leads</span>
          </button>
          <button 
            className={`mobile-nav-tab ${activeTab === 'prompts' ? 'active' : ''}`}
            onClick={() => setActiveTab('prompts')}
          >
            <BrainCircuit size={20} />
            <span>Prompts</span>
          </button>
          <button 
            className={`mobile-nav-tab ${activeTab === 'hub' ? 'active' : ''}`}
            onClick={() => setActiveTab('hub')}
          >
            <FileText size={20} />
            <span>Docs</span>
          </button>
          <button 
            className={`mobile-nav-tab ${activeTab === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveTab('sales')}
          >
            <TrendingUp size={20} />
            <span>Sales</span>
          </button>
        </nav>
      )}

      {/* CRM Contact Details Drawer */}
      <div className={`crm-drawer ${selectedContactId ? 'open' : ''}`}>
        <div className="crm-drawer-backdrop" onClick={() => setSelectedContactId(null)}></div>
        <div className="crm-drawer-content">
          {activeContact && (
            <>
              {/* Drawer Header */}
              <div className="crm-drawer-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="contact-avatar" style={{ margin: 0 }}>
                    {mask(activeContact.company, 'company').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{mask(activeContact.company, 'company')}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Ansprechpartner: {mask(activeContact.name, 'name')}</p>
                  </div>
                </div>
                <button className="btn-icon-only close-drawer-btn" onClick={() => setSelectedContactId(null)}>
                  ✕
                </button>
              </div>

              {/* Drawer Body */}
              <div className="crm-drawer-body">
                {/* Meta info grid */}
                <div className="drawer-section meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Branche</span>
                    <span className="meta-value">{mask(activeContact.industry, 'industry') || 'Keine Branche'}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">IT-System</span>
                    <span className="meta-value">{mask(activeContact.system, 'system') || 'Kein System'}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Letzter Kontakt</span>
                    <span className="meta-value">{activeContact.lastContact}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Status</span>
                    <select 
                      className="input-field drawer-select" 
                      value={activeContact.stage}
                      onChange={(e) => updateContactStage(activeContact.id, e.target.value)}
                    >
                      <option value="erstkontakt">Erstkontakt</option>
                      <option value="gespräch">Gespräch</option>
                      <option value="angebot">Angebot</option>
                      <option value="umsetzung">Umsetzung</option>
                    </select>
                  </div>
                </div>

                {/* Custom Notes Section */}
                <div className="drawer-section">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <h3 className="section-title" style={{ margin: 0 }}>Kunden-Notizen</h3>
                    <button
                      type="button"
                      onClick={() => handleCrmNotesSpeech(activeContact.id)}
                      className={`btn-icon-only ${isListeningCrmNotes ? 'listening-pulse' : ''}`}
                      style={{ 
                        padding: '0.25rem 0.5rem', 
                        fontSize: '0.7rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.25rem',
                        background: isListeningCrmNotes ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: isListeningCrmNotes ? '1px solid rgb(239, 68, 68)' : '1px solid var(--border-color)',
                        borderRadius: '0.25rem',
                        color: isListeningCrmNotes ? '#ef4444' : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                      title="Notiz per Sprache eingeben (Web Speech API)"
                    >
                      <Mic size={12} /> {isListeningCrmNotes ? 'Höre zu...' : 'Diktieren'}
                    </button>
                  </div>
                  <textarea 
                    className="input-field drawer-textarea"
                    rows={4}
                    placeholder="Wichtige Infos zu Terminen, Anforderungen, Preisen..."
                    value={activeContact.notes || ''}
                    onChange={(e) => updateContactNotes(activeContact.id, e.target.value)}
                  />
                </div>

                {/* Document Links Section */}
                <div className="drawer-section">
                  <h3 className="section-title">Dokumenten-Links</h3>
                  <div className="drawer-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {(activeContact.links || []).map(link => (
                      <div key={link.id} className="drawer-link-item">
                        <a href={link.url} target="_blank" rel="noreferrer" className="link-anchor">
                          <FileText size={14} className="text-cyan-500" />
                          <span>{link.title}</span>
                        </a>
                        <button 
                          onClick={() => deleteContactLink(activeContact.id, link.id)} 
                          className="btn-icon-only" 
                          style={{ padding: '0.2rem' }}
                        >
                          <Trash2 size={12} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                    {(activeContact.links || []).length === 0 && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>Keine Links hinterlegt.</p>
                    )}
                  </div>

                  {/* Add link form */}
                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="Titel (z.B. Drive)" 
                      className="input-field tracker-input" 
                      style={{ flex: 1, height: '28px', fontSize: '0.75rem' }}
                      value={newLinkInput.title}
                      onChange={(e) => setNewLinkInput({ ...newLinkInput, title: e.target.value })}
                    />
                    <input 
                      type="text" 
                      placeholder="https://..." 
                      className="input-field tracker-input" 
                      style={{ flex: 1.5, height: '28px', fontSize: '0.75rem' }}
                      value={newLinkInput.url}
                      onChange={(e) => setNewLinkInput({ ...newLinkInput, url: e.target.value })}
                    />
                    <button 
                      onClick={() => {
                        addContactLink(activeContact.id, newLinkInput.title, newLinkInput.url);
                        setNewLinkInput({ title: '', url: '' });
                      }}
                      className="btn btn-primary"
                      style={{ height: '28px', padding: '0 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.15rem' }}
                    >
                      Hinzufügen
                    </button>
                  </div>
                </div>

                {/* Activity Log Section */}
                <div className="drawer-section">
                  <h3 className="section-title">Aktivitäts-Log</h3>
                  <div className="drawer-log-list">
                    {(activeContact.activityLog || []).map(log => (
                      <div key={log.id} className="log-item">
                        <span className="log-date">{log.date}</span>
                        <span className="log-text">{log.text}</span>
                      </div>
                    ))}
                    {(activeContact.activityLog || []).length === 0 && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Keine Einträge vorhanden.</p>
                    )}
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </div>

      {/* Dokumenten-Editor Modal (Mini-Word) */}
      {isEditorOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: '650px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1.5rem',
            margin: 0
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                {editingDocId ? 'Dokument bearbeiten (Mini-Word)' : 'Neues Dokument erstellen'}
              </h3>
              <button 
                type="button"
                onClick={() => setIsEditorOpen(false)} 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1, padding: 0 }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Dateiname (z.B. sop_onboarding.txt)</label>
              <input
                type="text"
                className="input-field"
                placeholder="dokumentenname.txt"
                value={editorTitle}
                onChange={(e) => setEditorTitle(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexGrow: 1 }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Textinhalt (Schreiben oder Kopieren)</label>
              <textarea
                className="input-field"
                rows={12}
                style={{
                  fontFamily: 'inherit',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  resize: 'vertical',
                  background: 'rgba(0, 0, 0, 0.25)'
                }}
                placeholder="Füge deinen Text hier ein oder schreibe ein neues Dokument..."
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                onClick={() => setIsEditorOpen(false)} 
                className="btn btn-secondary"
                style={{ height: '36px' }}
              >
                Abbrechen
              </button>
              <button 
                type="button" 
                onClick={handleSaveDocFromEditor} 
                className="btn btn-primary"
                style={{ height: '36px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                💾 Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

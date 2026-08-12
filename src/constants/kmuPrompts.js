export const KMU_HARZ_PROMPTS = [
  {
    id: 'kmu_1',
    title: 'Angebots-Nachfassung (Handwerk & KMU)',
    category: 'Sales',
    text: `Agiere als erfahrener Vertriebsleiter für KMU im Harz.
Erstelle eine freundliche, aber verbindliche E-Mail-Vorlage zur Nachfassung eines unverbindlichen Angebots bei einem gewerblichen Kunden.

[ANGABEN]
Kundenname: {{Kundenname}}
Gewerk / Leistung: {{Leistung}}
Angebotsdatum: {{Angebotsdatum}}

[VORGABEN]
- Professioneller "Du"- oder "Sie"-Stil (anpassbar)
- Nenne konkrete Mehrwerte und Terminvorschläge für eine Rücksprache
- Keine aufdringlichen Floskeln, sondern Fokus auf Zuverlässigkeit und regionale Nähe.`
  },
  {
    id: 'kmu_2',
    title: 'Einwandbehandlung "Zu teuer / Angebot vergleichen"',
    category: 'Sales',
    text: `Agiere als Verhandlungscoach für Dienstleister und Handwerker.
Der Kunde sagt: "Ihr Angebot ist teurer als das der Konkurrenz."

Erstelle 3 maßgeschneiderte Argumentationsleitfäden & Formulierungshilfen, um den höheren Preis durch regionale Qualität, Garantie, schnelle Reaktionszeit und Ausfallsicherheit im Harz zu rechtfertigen.`
  },
  {
    id: 'kmu_3',
    title: 'Preiserhöhung wertschätzend kommunizieren',
    category: 'Sales',
    text: `Erstelle ein Kundenschreiben für Bestandskunden zur Ankündigung einer Preisanpassung um {{Prozent}}% ab dem {{Datum}}.

[VORGABEN]
- Begründe die Erhöhung mit gestiegenen Material-/Energie- und Tarifkosten sowie stetiger Qualitätssteigerung.
- Drücke Dankbarkeit für die bisherige Treue aus.
- Biete bei Rückfragen ein persönliches Gespräch an.`
  },
  {
    id: 'kmu_4',
    title: 'Mitarbeiter-Stellenausschreibung Harz (Social Media & Portal)',
    category: 'Marketing',
    text: `Agiere als HR- & Recruiting-Spezialist für kleine und mittlere Unternehmen im Harz.
Erstelle eine begeisternde Stellenanzeige für:

Gesuchte Position: {{Position}}
Branche / Gewerbe: {{Branche}}
Standort: {{Standort}}

[STRUKTUR]
1. Packende Headline (Warum es sich lohnt, bei uns zu arbeiten)
2. Das bringen wir mit (Vorteile: faire Bezahlung, regionale Projekte, gutes Klima)
3. Das bringst du mit (Anforderungen)
4. Unkomplizierter 1-Klick Kontakt (WhatsApp / Telefon ohne Anschreiben).`
  },
  {
    id: 'kmu_5',
    title: 'Google Business Profil Beitrag (Lokales Marketing)',
    category: 'Marketing',
    text: `Erstelle einen ansprechenden Google-My-Business-Post für unser regionales Unternehmen.

Thema / Anlass: {{Thema}}
Zielgruppe: Kunden & Partner im Landkreis Harz (Goslar, Wernigerode, Quedlinburg, Halberstadt)

[INHALT]
- Aufhänger mit Bezug zur Region
- Konkreter Call to Action (z.B. Jetzt Termin vereinbaren / Anrufen)
- 3 passende lokale Hashtags (#Harz #KMU #RegionHarz)`
  },
  {
    id: 'kmu_6',
    title: 'DSGVO Verarbeitungsverzeichnis Erstentwurf',
    category: 'Strategie',
    text: `Agiere als DSGVO-Datenschutzprüfer für ein regionales KMU.
Erstelle ein übersichtliches Muster für das Verarbeitungsverzeichnis (Art. 30 DSGVO) für folgende Tätigkeit:

Verarbeitungsprozess: {{Prozessname}} (z.B. Kundenverwaltung & Rechnungswesen)

[ABSCHNITTE]
1. Zweck der Verarbeitung
2. Kategorien betroffener Personen & Daten
3. Empfänger der Daten (z.B. Steuerberater, Supabase, Cloud-Provider)
4. Löschfristen (z.B. 10 Jahre nach GoBD)
5. Technische & organisatorische Maßnahmen (TOMs).`
  },
  {
    id: 'kmu_7',
    title: 'Terminabsage / Verschiebung professionell regeln',
    category: 'Sales',
    text: `Schreibe eine empathische und hochprofessionelle E-Mail an einen wichtigen Kunden, um einen vereinbarten Beratungstermin kurzfristig wegen Notfall/Krankheit zu verschieben.

Nenne sofort 2 konkrete Ersatztermine für die kommende Woche und entschuldige dich aufrichtig für die Unannehmlichkeiten.`
  },
  {
    id: 'kmu_8',
    title: 'Kunden-Onboarding Willkommens-Mail',
    category: 'Sales',
    text: `Agiere als Customer-Success-Manager.
Erstelle eine Willkommens-E-Mail für einen Neukunden nach Vertragsabschluss.

Kundenname: {{Kundenname}}
Projekt / Paket: {{Projektname}}

[INHALT]
- Herzliches Willkommen im KMU Service Harz Kundenkreis
- Nächste Schritte & Fahrplan (Kick-off Termin, Benötigte Unterlagen)
- Kontaktdaten deines festen Ansprechpartners.`
  }
];

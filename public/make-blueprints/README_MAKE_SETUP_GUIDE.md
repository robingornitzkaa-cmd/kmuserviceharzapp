# 🚀 Make.com Setup & Import-Leitfaden – KMU Service Harz

Dieser Leitfaden erklärt Schritt für Schritt, wie du die 4 fertigen JSON-Blueprints in deinen Make.com Account importierst, mit deinen Schnittstellen verbindest und schlüsselfertig beim Kunden aktivierst.

---

## 📥 1. So importierst du ein Szenario in Make.com

1. **In Make.com einloggen** (oder kostenlosen/Pro-Account öffnen).
2. Klicke im Menü links auf **Scenarios** ➔ **Create a new scenario**.
3. Klicke im Szenario-Editor unten in der Steuerungsleiste auf das **Drei-Punkte-Menü (`...`)** (neben dem Speicher-Symbol).
4. Wähle **Import Blueprint**.
5. Wähle eine der 4 heruntergeladenen `.json`-Dateien aus dem Ordner `public/make-blueprints/`:
   - `blueprint_1_belegerfassung_lexoffice_datev.json` (Lautlose Belegerfassung)
   - `blueprint_2_handwerker_lead_qualifier_booking.json` (Anfrage-Funnel & Notdienst)
   - `blueprint_3_baustellen_audio_zeiterfassung_fotos.json` (Sprach-Zeiterfassung & Fotos)
   - `blueprint_4_aaas_system_monitoring_healthcheck.json` (24/7 Schnittstellen-Monitoring)
6. Klicke auf **Save**. Der komplette Workflow mit allen Knoten, Filtern und JSON-Mappern erscheint sofort auf deiner Make-Oberfläche!

---

## 🔑 2. Notwendige Verbindungen (Connections) einrichten

Nach dem Import musst du die einzelnen Module mit deinen echten API-Zugängen verknüpfen:

### A. OpenAI (GPT-4o & Whisper)
- **Modul anklicken:** Klicke auf das OpenAI / Whisper Modul.
- **Connection:** Klicke auf *Add Connection* und trage deinen OpenAI API-Key ein.
- **Modell:** `gpt-4o` (für Vision & OCR) bzw. `whisper-1` (für Audio).

### B. Lexware Office (Lexoffice)
- **Modul anklicken:** Lexoffice Modul auswählen.
- **Connection:** Unter *Lexoffice ➔ Einstellungen ➔ Erweiterungen ➔ Öffentliche API* einen neuen API-Schlüssel generieren und bei Make einfügen.

### C. Google Drive & Google Calendar
- **Modul anklicken:** Klicke auf Google Drive / Google Calendar.
- **Connection:** Mit dem Kunden-Google-Konto oder Kanzlei-Google-Workspace verbinden.

### D. Supabase CRM
- **HTTP Modul:** Trage die `SUPABASE_URL` und den `SUPABASE_ANON_KEY` aus deiner `.env` Datei ein.

---

## ⚡ 3. Die 4 Kern-Workflows im Überblick

| Blueprint | Trigger | Verarbeitung | Ausgabe |
| :--- | :--- | :--- | :--- |
| **1. Belegerfassung (2.000 € Setup)** | Webhook (WhatsApp/Mail) | GPT-4o Vision OCR + JSON-Validierung | Vorkontierung in Lexoffice + GoBD Drive-Ablage + DATEV-Transfer |
| **2. Anfrage-Funnel (Stufe 2+)** | WhatsApp / Web-Formular | GPT-4o Intent- & Notfall-Klassifizierung | Supabase CRM Lead + Google Calendar Slot + WhatsApp Bestätigung |
| **3. Baustellen-Assistent** | WhatsApp Audio / Foto | Router: Whisper Audio -> Lexoffice Zeiterfassung \| GPT Vision -> Drive Foto-Archiv | Quittierung an Monteur per WhatsApp |
| **4. AaaS Monitoring (200 € Retainer)** | 15-Minuten Cron Trigger | Ping an Lexoffice, DATEV & Supabase APIs | Lautloser Betrieb oder Telegram/Slack-Alert an Support bei Fehler |

---

## 🛡️ 4. Wichtige Sicherheitshinweise für den Live-Betrieb (GoBD & DSGVO)

1. **AVV-Vertrag abschließen:** Zwischen KMU Service Harz und dem Kunden muss vor Aktivierung der beiliegende DSGVO-Auftragsverarbeitungsvertrag (AVV) unterzeichnet sein.
2. **Speicherort:** Wähle in Make.com bevorzugt das Datenzentrum **EU (Frankfurt)** für 100 % DSGVO-Konformität.
3. **Fehlerbehandlung:** Alle Blueprints enthalten standardmäßig Error-Handler, damit bei temporären Kanzlei-Wartungsarbeiten keine Daten verloren gehen.

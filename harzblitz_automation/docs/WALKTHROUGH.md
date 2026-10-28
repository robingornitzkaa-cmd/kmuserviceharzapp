# HarzBlitz Notdienst & Gebäudetechnik GmbH — End-to-End Walkthrough Guide

Dieses Dokument führt Administratoren, Meister und Entwickler Schritt für Schritt durch die Inbetriebnahme, Konfiguration, operative Nutzung und Validierung der automatisierten Notdienst-Kaskade für die **HarzBlitz Notdienst & Gebäudetechnik GmbH** (Goslar).

---

## 1. Systemarchitektur & Datenfluss

Die Automatisierungskaskade verbindet Front-Office (Telefonie & Messaging) nahtlos mit dem Back-Office (Einsatzdisposition, Datenbank & GoBD-konforme Buchhaltung):

```
                               ┌────────────────────────────────────────────────────────┐
                               │ 24/7 Notruf-Hotline: 05321-778890 (Großraum Goslar)    │
                               └──────────────────────────┬─────────────────────────────┘
                                                          │
                                                          ▼
                                       ┌──────────────────────────────────────┐
                                       │ Vapi.ai Voice-Assistentin "Anna"     │
                                       │ - Deeskalation & Strom-Warnung       │
                                       │ - Strukturierte Datenerfassung       │
                                       │ - Transparente Preise (kein Festpr.) │
                                       │ - WhatsApp-Ankündigung (5s)          │
                                       └──────────────────┬───────────────────┘
                                                          │
                                     [Function Call: dispatch_harzblitz_job]
                                                          │
                                                          ▼
                                       ┌──────────────────────────────────────┐
                                       │ n8n Inbound-Webhook                  │
                                       │ (POST /webhook/dispatch-harzblitz-job) │
                                       └──────────┬────────────────┬──────────┘
                                                  │                │
                        ┌─────────────────────────┘                └─────────────────────────┐
                        │                                                                    │
                        ▼                                                                    ▼
     ┌─────────────────────────────────────┐                              ┌─────────────────────────────────────┐
     │ Supabase PostgreSQL (Frankfurt)     │                              │ 360dialog WhatsApp Cloud API        │
     │ Tabelle: harzblitz_orders           │                              │ (Exakt 5 Sekunden Timer Delay)      │
     │ - ID: UUIDv4                        │                              │ Template: harzblitz_notdienst_...   │
     │ - Status: 'NEU'                     │                              └──────────────────┬──────────────────┘
     │ - Urgency: 'NOTFALL'                │                                                 │
     │ - RLS geschützt                     │                                                 ▼
     └──────────────────┬──────────────────┘                              ┌─────────────────────────────────────┐
                        │                                                 │ Kunde sendet 1-3 Fotos via WhatsApp │
                        │                                                 └──────────────────┬──────────────────┘
                        │                                                                    │
                        │                                                        [WhatsApp Inbound Webhook]
                        │                                                                    │
                        │                                                                    ▼
                        │              ┌─────────────────────────────────────┐    ┌─────────────────────────────────────┐
                        │              │ Supabase Storage Bucket             │    │ n8n Media Handler Node              │
                        │              │ harzblitz-damage-photos/            │◄───│ Lädt Foto herunter, validiert       │
                        │              │ {order_id}/photo_keller_01.jpg      │    │ Mime-Type (JPEG/PNG) & speichert es │
                        │              └──────────────────┬──────────────────┘    └─────────────────────────────────────┘
                        │                                 │
                        └───────────────────┬─────────────┘
                                            │
                                            ▼
                       ┌─────────────────────────────────────────┐
                       │ Meister Marc Schneider rückt aus        │
                       │ - Sichtet Fotos während Anfahrt (Tablet)│
                       │ - Statuswechsel: 'IN_ARBEIT'            │
                       │ - Pumpt Keller aus & dichtet Rohr ab    │
                       │ - Einsatzabschluss: Status 'ERLEDIGT'   │
                       └────────────────────┬────────────────────┘
                                            │
                                            ▼
                       ┌─────────────────────────────────────────┐
                       │ n8n Lexoffice Automation Node           │
                       │ - Prüft/Erstellt Kontakt in Lexoffice   │
                       │ - Erstellt Rechnungsentwurf (draft)     │
                       │   1,5h à 95 € + 69 € Pauschale = 211,50€│
                       │   + 19% MwSt. (40,19 €) = 251,69 €      │
                       │ - Übergabe an DATEV Konto 8400          │
                       └────────────────────┬────────────────────┘
                                            │
                                            ▼
                       ┌─────────────────────────────────────────┐
                       │ 1-Klick-Freigabe durch Meister Schneider│
                       │ in Lexoffice App / DATEV Unternehmen o. │
                       └─────────────────────────────────────────┘
```

---

## 2. Voraussetzungen, Umgebungsvariablen & Credentials

Für den Live-Betrieb werden folgende Konten und Zugangsdaten benötigt. Für lokale Tests und Staging existiert ein vollständig autarker Simulationsmodus (`e2e_simulation_test.py`), der keine externen API-Schlüssel erfordert.

### Erforderliche Umgebungsvariablen (`.env`):

```bash
# === Vapi.ai Voice-Assistentin ===
VAPI_API_KEY="vapi_live_xxxxxxxxxxxxxxxxxxxxxxxx"
VAPI_ASSISTANT_ID="asst_harzblitz_anna_05321"
VAPI_PHONE_NUMBER="+495321778890"

# === Supabase PostgreSQL & Storage (Region Frankfurt / EU) ===
SUPABASE_URL="https://xxxxxxxxxxxxxxxx.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_STORAGE_BUCKET="harzblitz-damage-photos"

# === 360dialog WhatsApp Business Cloud API ===
D360_API_KEY="d360_live_xxxxxxxxxxxxxxxxxxxxxxxx"
D360_WABA_ID="waba_harzblitz_05321"
D360_PHONE_NUMBER_ID="phone_harzblitz_05321778890"
WHATSAPP_TEMPLATE_NAME="harzblitz_notdienst_foto_anforderung"

# === Lexoffice & DATEV Schnittstelle ===
LEXOFFICE_API_KEY="lex_live_xxxxxxxxxxxxxxxxxxxxxxxx"
DATEV_ERLOESKONTO="8400"

# === n8n Automations-Server ===
N8N_BASE_URL="https://n8n.harzblitz.de"
N8N_WEBHOOK_VAPI_PATH="/webhook/dispatch-harzblitz-job"
N8N_WEBHOOK_WHATSAPP_PATH="/webhook/whatsapp-media-inbound"
```

---

## 3. Schritt-für-Schritt Inbetriebnahme

### Schritt 1: Vapi.ai Voice-Agentin "Anna" konfigurieren

1. **Assistent anlegen:**
   - Öffnen Sie das Vapi-Dashboard (<https://dashboard.vapi.ai>).
   - Erstellen Sie einen neuen Assistenten mit dem Namen **„Anna von HarzBlitz“**.
   - Wählen Sie als Sprache **Deutsch (`de-DE`)** und als Modell `gpt-4o` oder `gemini-1.5-pro` mit niedriger Temperatur (`temperature: 0.2`).
2. **System-Prompt einpflegen:**
   - Kopieren Sie den vollständigen Prompt-Text aus:
     `harzblitz_automation/vapi/system_prompt_anna.md`
   - In das Feld *System Prompt* des Assistenten einfügen.
3. **Function Calling Tool importieren:**
   - Gehen Sie im Assistenten auf *Tools / Functions* > *Add Tool*.
   - Wählen Sie *Create Custom Tool* und laden Sie die JSON-Spezifikation aus:
     `harzblitz_automation/vapi/tool_dispatch_harzblitz_job.json`
   - Hinterlegen Sie als *Server URL* den n8n-Webhook:
     `https://<ihre-n8n-domain>/webhook/dispatch-harzblitz-job`
4. **Telefonnummer verknüpfen:**
   - Verknüpfen Sie die Festnetznummer `05321-778890` via SIP-Trunk oder Twilio/Vapi Phone Numbers mit dem Assistenten.

---

### Schritt 2: Supabase Datenbank & Storage einrichten

1. **PostgreSQL DDL ausführen:**
   - Öffnen Sie Ihr Supabase-Projekt (EU-Frankfurt) > *SQL Editor*.
   - Führen Sie das Skript `harzblitz_automation/supabase/01_schema_harzblitz_orders.sql` aus:
     - Erstellt die Tabelle `harzblitz_orders` mit UUID-Primärschlüssel `gen_random_uuid()`.
     - Aktiviert CHECK-Constraints für `urgency` (`NOTFALL`, `DRINGEND`, `STANDARD`) und `status` (`NEU`, `IN_ARBEIT`, `ERLEDIGT`).
     - Aktiviert Row Level Security (RLS) mit Service-Role-Vollzugriff und geschütztem Leserecht.
2. **Storage Bucket & Policies anlegen:**
   - Führen Sie das Skript `harzblitz_automation/supabase/02_storage_harzblitz_damage_photos.sql` aus:
     - Erstellt den Bucket `harzblitz-damage-photos`.
     - Konfiguriert Speicherlimits (max. 25 MB pro Datei) und erlaubte Mime-Types (`image/jpeg`, `image/png`, `video/mp4`).

---

### Schritt 3: n8n Workflow importieren & aktivieren

1. **Workflow JSON importieren:**
   - Öffnen Sie Ihre n8n-Instanz.
   - Klicken Sie auf *Workflows* > *Import from File* und wählen Sie:
     `harzblitz_automation/n8n/harzblitz_e2e_workflow.json`
2. **Credentials hinterlegen:**
   - Hinterlegen Sie im n8n Credentials Manager:
     - **Supabase API**: URL und `service_role` Key.
     - **360dialog WhatsApp API**: API Key.
     - **Lexoffice API**: Bearer Token.
3. **Ablauflogik prüfen:**
   - Der Webhook `POST /webhook/dispatch-harzblitz-job` nimmt den Call entgegen.
   - Insert-Node schreibt in `harzblitz_orders`.
   - Wait-Node pausiert exakt **5 Sekunden**.
   - 360dialog-Node sendet das Template an den Kunden.
   - Media-Webhook nimmt eingehende Kundenfotos entgegen und hängt sie an `photo_urls` an.
   - Trigger auf Status `ERLEDIGT` generiert den Rechnungsentwurf in Lexoffice.
4. **Workflow aktivieren:** Den Schalter oben rechts auf **Active** stellen.

---

### Schritt 4: 360dialog WhatsApp Business Template registrieren

1. Öffnen Sie die 360dialog Hub-Konsole (<https://hub.360dialog.com>).
2. Erstellen Sie ein neues Template unter *Templates* > *Create Template*:
   - Name: `harzblitz_notdienst_foto_anforderung`
   - Kategorie: `UTILITY`
   - Sprache: `de`
   - Vorlage: `harzblitz_automation/whatsapp/360dialog_template_de.json`
3. Hinterlegen Sie die Inbound-Webhook-URL von n8n (`https://<n8n-domain>/webhook/whatsapp-media`).

---

### Schritt 5: Automatisierten E2E-Simulationstest ausführen

Zur Validierung der gesamten Kaskade ohne Fremdkosten oder Live-API-Calls führen Sie das mitgelieferte Python-Prüfskript aus:

```powershell
python harzblitz_automation/tests/e2e_simulation_test.py
```

**Erwartetes Terminal-Ergebnis:**
```text
===========================================================================
  HARZBLITZ NOTDIENST & GEBÄUDETECHNIK GMBH (GOSLAR)
  AUTONOMOUS END-TO-END AUTOMATION PIPELINE TEST SUITE
  Standard Library Only | Validating Hops: Vapi -> Supabase -> WhatsApp -> n8n -> Lexoffice
===========================================================================

[INFO] === HOP 1: Vapi.ai Voice Agent Function Call Validation ===
[PASS] Tool definition matches dispatch_harzblitz_job -> dispatch_harzblitz_job
[PASS] Loaded and verified tool schema from C:\...\vapi\tool_dispatch_harzblitz_job.json
[PASS] Emergency correctly classified as NOTFALL -> NOTFALL
...
[INFO] === HOP 2: Supabase PostgreSQL Schema & Persistence Integrity ===
[PASS] Valid UUIDv4 generated: ...
[PASS] Status conforms to PostgreSQL CHECK constraint
...
[INFO] === HOP 3: 360dialog WhatsApp Dispatch & Inbound Media Ingestion ===
[PASS] Exact 5-second dispatch delay parameter verified -> 5
[PASS] Template language is German ('de') -> de
...
[INFO] === HOP 4: n8n Order State Transition & Completion Lifecycle ===
[PASS] Invoicing strictly blocked while status is 'NEU'
[PASS] Order status transitioned to 'ERLEDIGT' -> ERLEDIGT
...
[INFO] === HOP 5: Lexoffice API v1 Draft Invoice & DATEV Konto 8400 Validation ===
[PASS] Net calculation 1.5h @ 95.00 EUR = 142.50 EUR -> 142.5
[PASS] Net calculation Notdienstpauschale = 69.00 EUR -> 69.0
[PASS] Total net amount = 211.50 EUR -> 211.5
[PASS] 19% VAT amount = 40.19 EUR (40.185 rounded) -> 40.19
[PASS] Total gross amount = 251.69 EUR -> 251.69
[PASS] Lexoffice voucherStatus is strictly 'draft' -> draft
[PASS] DATEV Konto 8400 explicitly mapped in booking remark

===========================================================================
  [ALL TESTS PASSED] Complete E2E pipeline successfully verified!
  Total Checks Passed : 44
  Total Checks Failed : 0
  Exit Code           : 0
===========================================================================
```

---

### Schritt 6: Rechnungsprüfung & 1-Klick-Freigabe durch Meister Marc Schneider

Nach erfolgreichem Einsatz vor Ort in Bad Harzburg:
1. Meister Marc Schneider öffnet das Einsatz-Cockpit auf dem Werkstatt-Tablet und setzt den Status des Auftrags von `IN_ARBEIT` auf `ERLEDIGT`.
2. n8n stößt sofort die Lexoffice API v1 an:
   - Prüft die Kundennummer anhand der Telefonnummer `+491718844221`.
   - Legt Neukunde Frank Meyer mit Anschrift *Herzog-Wilhelm-Straße 42, 38667 Bad Harzburg* an.
   - Erstellt einen **Rechnungsentwurf (`voucherStatus: "draft"`)**.
3. Meister Schneider öffnet Lexoffice (Web oder Smartphone-App):
   - Unter **Belege > Entwürfe** liegt der vorbereitete Beleg.
   - Positionen: 1,5 Std. Rohrreinigung (142,50 € netto) + Notdienstpauschale Goslar (69,00 € netto).
   - Gesamtsumme: **211,50 € netto / 251,69 € brutto (inkl. 40,19 € MwSt.)**.
   - Buchungsvermerk: `DATEV Erlöskonto 8400 (19% USt)`.
4. Mit 1 Klick auf **„Beleg fertigstellen & per Mail senden“** ist die Rechnung GoBD-konform archiviert und wird im monatlichen DATEV-Export automatisch an den Steuerberater übermittelt.

---

## 4. Troubleshooting & Fehlerbehebung

| Symptom | Mögliche Ursache | Sofortmaßnahme |
|---|---|---|
| **Vapi bricht Function Call ab** | n8n Webhook-URL nicht erreichbar oder Timeout < 5s | In Vapi *Server URL Timeout* auf 10s setzen; Firewall/SSL von n8n prüfen. |
| **WhatsApp-Nachricht kommt nicht an** | Rufnummer nicht im E.164-Format oder Opt-in fehlt | Prüfen, ob Telefonnummer mit `+49` formatiert ist; WhatsApp Business Account Guthaben prüfen. |
| **Kundenfoto taucht nicht im Auftrag auf** | Mime-Type ungültig oder Supabase Service Key fehlt | Inbound Webhook Logs in n8n prüfen; sicherstellen, dass n8n mit `service_role` Key schreibt. |
| **Lexoffice meldet HTTP 400 Bad Request** | Ungültiges Schema oder `voucherStatus` ungleich `draft` | `e2e_simulation_test.py` ausführen; prüfen, ob Adressfelder (`street`, `zip`, `city`) gefüllt sind. |
| **Supabase Insert schlägt fehl mit RLS-Error** | n8n nutzt fälschlicherweise den `anon` Public Key | In den n8n Supabase Credentials den `service_role` Secret Key hinterlegen. |

---

## 5. Datenschutz, Sicherheit & Wartungskonzept

1. **DSGVO-Konformität:**
   - Sämtliche Datenbank- und Storage-Instanzen (Supabase) laufen in der **Region Frankfurt (EU)**.
   - WhatsApp-Kommunikation erfolgt über die offizielle **360dialog Cloud API** mit Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO.
   - Sprachaufzeichnungen in Vapi.ai werden nach Transkription und Dispatching automatisch nach 24 Stunden gelöscht.
2. **GoBD & Revisionssicherheit:**
   - Rechnungen werden niemals vollautomatisch unabgestimmt versendet, sondern immer als Entwurf (`voucherStatus: "draft"`) zur meisterlichen Endabnahme bereitgestellt.
   - Keine Festpreiszusagen durch die Sprach-KI am Telefon.
3. **Backup & Monitoring:**
   - Tägliche automatisierte Backups der PostgreSQL-Datenbank via Supabase Pro Backup.
   - Dead-Letter-Queue in n8n fängt fehlgeschlagene Webhook-Payloads ab und alarmiert per E-Mail an `notdienst-admin@harzblitz.de`.

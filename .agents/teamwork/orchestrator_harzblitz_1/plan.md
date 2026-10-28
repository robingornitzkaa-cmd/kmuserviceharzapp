# Plan: HarzBlitz Notdienst & Gebäudetechnik GmbH — Front- & Back-Office Automatisierung

## Architecture & Code Layout
Zielordner: `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation`
Struktur:
- `vapi/`:
  - `system_prompt_anna.md` (Produktionsfertiger Prompt "Anna von HarzBlitz", Tel 05321-778890, deeskalierend, Notfallkriterien, WhatsApp-Überleitung)
  - `tool_dispatch_harzblitz_job.json` (RFC-konformes JSON-Schema für Vapi Function Calling)
- `whatsapp/`:
  - `360dialog_template_de.json` / `template_definition.md` (Genehmigungsfähiges WhatsApp Business Template, 5s Delay, Fotoaufforderung 1-3 Bilder)
  - `inbound_media_spec.md` (Spezifikation des Inbound Media Handlers)
- `supabase/`:
  - `01_schema_harzblitz_orders.sql` (PostgreSQL DDL: harzblitz_orders, Enums/CHECKs, UUID, RLS Policies für Service Role & Read API)
  - `02_storage_harzblitz_damage_photos.sql` (Bucket-Konfiguration `harzblitz-damage-photos` & Storage RLS)
- `n8n/`:
  - `harzblitz_e2e_workflow.json` (Vollständige, direkt importierbare n8n Workflow JSON mit Webhooks, Supabase Node, 360dialog WhatsApp mit Delay, Media Handler, Lexoffice Integration)
  - `workflow_documentation.md` (Erklärung der Nodes, Error Handling & Secrets)
- `lexoffice_datev/`:
  - `lexoffice_payload_schema.json` (Valide Invoice Draft Payload-Definition v1)
  - `datev_mapping_spec.md` (Zuordnung Konto 8400 Erlöse 19% USt, Kontaktanlage POST /v1/contacts)
- `tests/`:
  - `simulated_dialog_meyer.md` (Detaillierter 3-Minuten Testdialog Herr Meyer / Bad Harzburg "Keller unter Wasser")
  - `e2e_simulation_test.py` (Autonom ausführbares Python-Prüfskript mit Exit Code 0, das die gesamte Pipeline simuliert und alle Schemata & Payloads verifiziert)
- `docs/`:
  - `WALKTHROUGH.md` (Schritt-für-Schritt Anleitung zur Inbetriebnahme und zum manuellen Testen)
  - `README.md` (Projektübersicht im harzblitz_automation Ordner)

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Vapi Voice Agent Prompt | "Anna von HarzBlitz" Prompt für 05321-778890 mit Notfall-Klassifikation | M1 | R1 |
| 2 | Vapi Tool JSON Schema | RFC-konformes `dispatch_harzblitz_job` Schema | M1 | R1 |
| 3 | WhatsApp Template & Dispatch | 360dialog Template mit 5s Verzögerung | M1 | R2 |
| 4 | WhatsApp Media Handling Spec | Inbound Media Handler & Storage Zuordnung | M1 | R2 |
| 5 | Supabase DDL & RLS | PostgreSQL Schema `harzblitz_orders`, UUID, CHECKs, RLS | M2 | R3 |
| 6 | Supabase Storage Bucket | `harzblitz-damage-photos` Bucket DDL & Policies | M2 | R3 |
| 7 | n8n E2E Workflow JSON | Importierbarer n8n Workflow mit allen Nodes | M2 | R4 |
| 8 | Lexoffice / DATEV Integration | API v1 Draft Invoice, Kontakt-Prüfung, Konto 8400 | M2 | R4 |
| 9 | 3-Minuten Testdialog | Herr Meyer (Bad Harzburg) Testdialog | M3 | R5 |
| 10 | E2E Python Simulation Skript | Autonomes Prüfskript mit Exit Code 0 | M3 | R5 |
| 11 | Walkthrough & Doku | WALKTHROUGH.md, Projekt-README, CHANGELOG-Update | M3 | R5 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|--------------|--------|
| M1 | Voice & Messaging (Vapi & WhatsApp) | R1 & R2: Vapi System Prompt, Function Calling Schema, 360dialog WhatsApp Template & Media Spec | None | DONE |
| M2 | Data Layer & Workflow (Supabase & n8n/Lexoffice) | R3 & R4: Supabase DDL/RLS, Storage, n8n Workflow JSON, Lexoffice v1 Payload & DATEV Mapping | M1 contracts | DONE |
| M3 | Testing & Walkthrough (E2E Script & Docs) | R5: Testdialog, Python E2E Simulation Skript (Exit 0), Walkthrough Doku, Root Doku Pflege | M1, M2 | DONE |
| M4 | Verification, Challenger & Audit | Reviewer APPROVE, Challenger Stress Tests, Forensic Auditor CLEAN | M3 | DONE |
| M5 | Final Handoff | Synthese, handoff.md und Abschlussmeldung an Parent | M4 | DONE |

## Interface Contracts
### Vapi Function Calling ↔ n8n Inbound Webhook
- Function Name: `dispatch_harzblitz_job`
- Arguments: `customer_name` (string), `customer_phone` (string), `address` (string), `issue_description` (string), `urgency` (enum: NOTFALL, DRINGEND, STANDARD)
- Returns: `{ "status": "dispatched", "order_id": "<uuid>", "whatsapp_dispatched": true }`

### n8n ↔ Supabase
- Table: `harzblitz_orders`
- Insert: `customer_name`, `customer_phone`, `address`, `issue_description`, `urgency`, `status='NEU'`
- Storage Bucket: `harzblitz-damage-photos`

### n8n ↔ 360dialog WhatsApp Cloud API
- Outbound: Send Template message to `customer_phone` after 5 seconds delay
- Inbound: Webhook receives media (image/video), uploads to Supabase Storage, updates `photo_urls` array in `harzblitz_orders`

### n8n ↔ Lexoffice API v1
- Trigger: Status update to `ERLEDIGT`
- Step 1: `GET /v1/contacts?phoneNumber=...` or `POST /v1/contacts` if not found
- Step 2: `POST /v1/invoices` with `voucherStatus: "draft"`, net/gross calculation with 19% MwSt., revenue account 8400 (DATEV)

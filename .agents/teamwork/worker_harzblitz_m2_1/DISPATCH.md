# Task Assignment: Worker Harzblitz M2 (Data Layer & Workflow)

You are `worker_harzblitz_m2_1`.
Working directory: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_m2_1`
Original request path: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md` (read section "Follow-up — 2026-10-28T08:51:55Z")
Orchestrator plan: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\orchestrator_harzblitz_1\plan.md`
Reference specifications:
- `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\spec_miner_harzblitz_1\handoff.md` (R3 Supabase DDL, RLS, Storage)
- `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\explorer_harzblitz_workflow_2b\handoff.md` (R4 n8n Workflow JSON, Lexoffice v1, DATEV Konto 8400)

### Write Ownership & Boundaries
You exclusively own and will create/write files in:
- `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\supabase\`
  - `01_schema_harzblitz_orders.sql` (PostgreSQL DDL: harzblitz_orders, UUIDv4, CHECK constraints für urgency und status, Indizes, updated_at Trigger, RLS Policies für service_role und authenticated)
  - `02_storage_harzblitz_damage_photos.sql` (Storage Bucket `harzblitz-damage-photos`, 25MB Limit, MIME Type Array, Storage RLS Policies)
- `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\n8n\`
  - `harzblitz_e2e_workflow.json` (Vollständige, direkt importierbare n8n Workflow JSON mit 22 Nodes und 3 Verarbeitungszweigen)
  - `workflow_documentation.md` (Ausführliche Dokumentation aller Nodes, Webhooks, Parameter und Fehlerbehandlung)
- `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\lexoffice_datev\`
  - `lexoffice_payload_schema.json` (Vollständiges JSON-Schema für Lexoffice API v1 Contact und Invoice Draft Payloads)
  - `datev_mapping_spec.md` (Detaillierte DATEV SKR03 Dokumentation: Automatikkonto 8400 Erlöse 19% USt, USt-Konto 1776, Debitorenbuchung, 1-Klick-Freigabe durch Meister Marc Schneider)

### MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

### Verification
Run syntax checks: validate SQL DDL and validate the n8n JSON file with Python (`json.loads`). Ensure exit code is 0.

Write your report in `handoff.md` in your working directory and notify the orchestrator via send_message.


## 2026-10-28T09:06:41Z
[Message] timestamp=2026-10-28T09:06:41Z sender=92cab53a-b35a-4af7-a2f1-a90f14e82b2f priority=MESSAGE_PRIORITY_HIGH content=You are worker_harzblitz_m2_1.
Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_m2_1
Read your assignment in c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_m2_1\DISPATCH.md and c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md.
Implement all files in harzblitz_automation/supabase/, harzblitz_automation/n8n/, and harzblitz_automation/lexoffice_datev/ according to specifications in spec_miner_harzblitz_1/handoff.md and explorer_harzblitz_workflow_2b/handoff.md. Validate SQL and n8n JSON syntax. Write your report in handoff.md and send_message to orchestrator.

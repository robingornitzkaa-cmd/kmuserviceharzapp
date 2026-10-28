# Task Assignment: Worker Harzblitz M1 (Voice & WhatsApp)

You are `worker_harzblitz_m1_1`.
Working directory: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_m1_1`
Original request path: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md` (read section "Follow-up — 2026-10-28T08:51:55Z")
Orchestrator plan: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\orchestrator_harzblitz_1\plan.md`
Reference specification: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\spec_miner_harzblitz_1\handoff.md`

### Write Ownership & Boundaries
You exclusively own and will create/write files in:
- `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\vapi\`
  - `system_prompt_anna.md` (Produktionsfertiger System-Prompt für Goslarer Festnetznummer 05321-778890, deeskalierend, Notfall-Triage, WhatsApp-Übergang, keine Festpreisversprechen)
  - `tool_dispatch_harzblitz_job.json` (RFC-konformes JSON-Schema für Vapi Function Calling mit allen 5 Pflichtfeldern, regex Validierung für Telefonnummern, Enums für Urgency)
- `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\whatsapp\`
  - `360dialog_template_de.json` (Genehmigungsfähiges WhatsApp Business Template in Kategorie UTILITY, Sprache de, 5s Delay, barrierefreie Fotoaufforderung)
  - `inbound_media_spec.md` (Detaillierte Spezifikation für 360dialog Inbound Media Webhook, URL-Retrieval, Download und Zuordnung)

### MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

### Verification
Run syntax and schema validation commands (e.g. Python JSON validation on `tool_dispatch_harzblitz_job.json` and `360dialog_template_de.json`). Ensure exit code is 0.

Write your report in `handoff.md` in your working directory and notify the orchestrator via send_message.

## 2026-10-28T09:06:41Z
You are worker_harzblitz_m1_1.
Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_m1_1
Read your assignment in c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_m1_1\DISPATCH.md and c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md.
Implement all files in harzblitz_automation/vapi/ and harzblitz_automation/whatsapp/ according to the specifications in spec_miner_harzblitz_1/handoff.md. Validate JSON schemas. Write your report in handoff.md and send_message to orchestrator.

# BRIEFING — 2026-10-28T09:03:00Z

## Mission
Investigate and specify the complete n8n workflow JSON architecture, Supabase integration, 360dialog WhatsApp nodes (with 5-second delay and inbound media handling), and Lexoffice v1 API invoice draft schema with DATEV Erlöskonto 8400 mapping for HarzBlitz Notdienst & Gebäudetechnik GmbH.

## 🔒 My Identity
- Archetype: explorer
- Roles: investigation, synthesis
- Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\explorer_harzblitz_workflow_2b
- Original parent: 92cab53a-b35a-4af7-a2f1-a90f14e82b2f
- Milestone: M2 (Data Layer & Workflow)

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Ensure n8n workflow JSON structure is 100% valid importable format
- Exact Lexoffice v1 API specification compliance (draft invoice, contacts API, net/gross calculation, 19% tax)
- Exact DATEV SKR03 / SKR04 Erlöskonto 8400 mapping
- No git push / git push --force
- Maintain .agents/teamwork conventions (metadata only)

## Current Parent
- Conversation ID: 92cab53a-b35a-4af7-a2f1-a90f14e82b2f
- Updated: 2026-10-28T08:56:34Z

## Investigation State
- **Explored paths**:
  - `DISPATCH.md`, `ORIGINAL_REQUEST.md`, `orchestrator_harzblitz_1/plan.md`
  - `spec_miner_harzblitz_1/handoff.md` (R1, R2, R3 specifications analyzed)
  - Lexoffice REST API v1 documentation (Contacts & Invoices schemas, `draft` mode without `finalize=true`, `address.contactId`, `taxConditions.taxType: "net"`)
  - 360dialog WhatsApp Cloud API documentation (`POST /messages`, Template parameters, `GET /v1/media/{id}`)
  - DATEV SKR03 Automatikkonto 8400 ("Erlöse 19% USt") mapping rules
  - n8n Workflow JSON specification (node types, parameters, webhook response nodes, wait nodes, code nodes, connections graph)
- **Key findings**:
  - `GET /v1/contacts` in Lexoffice supports filtering by `name` and `email`, but NOT by `phoneNumber` parameter. Phone matching must be performed on contact details retrieved by name or list.
  - Invoices sent via `POST /v1/invoices` without `?finalize=true` are automatically created as drafts (`voucherStatus: "draft"`).
  - Passing `taxConditions: { taxType: "net" }` and `taxRatePercentage: 19` causes Lexoffice to automatically calculate net/tax/gross and assign DATEV SKR03 Automatikkonto 8400 upon finalization.
  - Mathematical calculation: 1.5 hrs @ 95 € = 142.50 € net; Pauschale = 69.00 € net; Total net = 211.50 €; 19% tax = 40.19 €; Gross = 251.69 €.
  - The n8n workflow JSON can contain 3 distinct webhook branches (Voice Dispatch, Media Inbound, Order Erledigt) within a single importable file, verified via graph validation script with 22 nodes and 18 connection groups.
- **Unexplored areas**: None. All requirements of R4 are completely resolved.

## Key Decisions Made
- Architecture decision: Provide a unified, 3-branch n8n workflow JSON (`harzblitz_e2e_workflow.json`) that can be imported directly into n8n with 1 click.
- Design decision: Use HTTP Request nodes with environment variable expressions (`$env.SUPABASE_URL`, `$env.SUPABASE_SERVICE_ROLE_KEY`, `$env.D360_API_KEY`, `$env.LEXOFFICE_API_KEY`) for maximum portability across any n8n instance without proprietary plugin dependencies.
- Immediate response design: Insert `Respond to Webhook` before the 5s delay so Vapi receives instant confirmation (<800ms) and voice agent does not experience dead-air.

## Artifact Index
- `DISPATCH.md` — Task assignment
- `BRIEFING.md` — Situational awareness
- `progress.md` — Liveness heartbeat
- `scratch/test_workflow_spec.py` — Python test script verifying graph integrity, JSON serialization, and Lexoffice math
- `handoff.md` — Complete investigation and specification report for R4

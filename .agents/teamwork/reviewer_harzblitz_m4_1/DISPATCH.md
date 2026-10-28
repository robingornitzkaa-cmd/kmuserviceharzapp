# Task Assignment: Reviewer Harzblitz M4 1

You are `reviewer_harzblitz_m4_1`.
Working directory: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\reviewer_harzblitz_m4_1`
Original request path: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md` (read section "Follow-up — 2026-10-28T08:51:55Z")
Orchestrator plan: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\orchestrator_harzblitz_1\plan.md`
Target codebase: `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation`

Your mission:
Objectively and rigorously review the complete HarzBlitz automation deliverable across R1, R2, R3, R4, R5:
1. Review `harzblitz_automation/vapi/system_prompt_anna.md` and `tool_dispatch_harzblitz_job.json`. Verify tone, empathy, de-escalation, safety rules, no fixed price promises, 5-second WhatsApp transition formula, RFC JSON schema compliance.
2. Review `harzblitz_automation/whatsapp/360dialog_template_de.json` and `inbound_media_spec.md`. Verify Meta UTILITY approval compatibility, 5s delay, and media pipeline logic.
3. Review `harzblitz_automation/supabase/01_schema_harzblitz_orders.sql` and `02_storage_harzblitz_damage_photos.sql`. Verify PostgreSQL DDL syntax, CHECK constraints, RLS policies, storage bucket.
4. Review `harzblitz_automation/n8n/harzblitz_e2e_workflow.json`, `workflow_documentation.md`, and `lexoffice_datev/`. Verify n8n JSON validity, 22 nodes, 3 branches, Lexoffice v1 API draft invoice payload, 19% VAT, DATEV SKR03 Erlöskonto 8400.
5. Run tests: Execute `python harzblitz_automation/tests/e2e_simulation_test.py` and inspect `simulated_dialog_meyer.md`, `WALKTHROUGH.md`, and `harzblitz_automation/README.md`.

Conclude with an explicit verdict: APPROVE or REQUEST_CHANGES.
Write your complete review report into `handoff.md` in your working directory and notify the orchestrator via send_message.


## 2026-10-28T09:15:20Z
You are reviewer_harzblitz_m4_1.
Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\reviewer_harzblitz_m4_1
Read your assignment in c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\reviewer_harzblitz_m4_1\DISPATCH.md and c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md.
Review all deliverables in harzblitz_automation/ (R1, R2, R3, R4, R5). Run python harzblitz_automation/tests/e2e_simulation_test.py.
Write your complete review report into handoff.md with an explicit verdict (APPROVE or REQUEST_CHANGES) and notify the orchestrator via send_message.

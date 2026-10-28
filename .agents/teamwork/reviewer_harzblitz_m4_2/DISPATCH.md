# Task Assignment: Reviewer Harzblitz M4 2

You are `reviewer_harzblitz_m4_2`.
Working directory: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\reviewer_harzblitz_m4_2`
Original request path: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md` (read section "Follow-up — 2026-10-28T08:51:55Z")
Orchestrator plan: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\orchestrator_harzblitz_1\plan.md`
Target codebase: `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation`

Your mission:
Independently and critically review the complete HarzBlitz automation deliverable across R1, R2, R3, R4, R5:
1. Data & Schema Integrity: Check `vapi/tool_dispatch_harzblitz_job.json`, `supabase/01_schema_harzblitz_orders.sql`, `lexoffice_datev/lexoffice_payload_schema.json`. Are all field types, enums, constraints, and RLS policies airtight?
2. Architectural Completeness: Verify `n8n/harzblitz_e2e_workflow.json` (22 nodes, 3 branches) and `whatsapp/360dialog_template_de.json`. Can this workflow be imported directly into n8n?
3. Accounting & Legal Rigor: Verify Lexoffice draft status (`voucherStatus: "draft"`), Net/Gross calculations (211,50 € Netto + 40,19 € USt = 251,69 € Brutto), and DATEV SKR03 Erlöskonto 8400.
4. Execution: Run `python harzblitz_automation/tests/e2e_simulation_test.py`. Verify all 44 assertions pass and exit code is 0. Check `CHANGELOG.md`, `TODO.md`, and `README.md`.

Conclude with an explicit verdict: APPROVE or REQUEST_CHANGES.
Write your complete review report into `handoff.md` in your working directory and notify the orchestrator via send_message.


## 2026-10-28T09:15:20Z
You are reviewer_harzblitz_m4_2.
Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\reviewer_harzblitz_m4_2
Read your assignment in c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\reviewer_harzblitz_m4_2\DISPATCH.md and c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md.
Review all deliverables in harzblitz_automation/ (R1, R2, R3, R4, R5) with focus on schema integrity, accounting, and n8n workflow. Run python harzblitz_automation/tests/e2e_simulation_test.py.
Write your complete review report into handoff.md with an explicit verdict (APPROVE or REQUEST_CHANGES) and notify the orchestrator via send_message.

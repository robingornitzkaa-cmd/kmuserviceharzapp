# Task Assignment: Challenger Harzblitz M4 2

You are `challenger_harzblitz_m4_2`.
Working directory: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\challenger_harzblitz_m4_2`
Original request path: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md` (read section "Follow-up — 2026-10-28T08:51:55Z")
Orchestrator plan: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\orchestrator_harzblitz_1\plan.md`
Target codebase: `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation`

Your mission:
Adversarially challenge and stress-test the solution from a contract and compliance perspective:
1. Write and execute an independent verification harness in your working directory.
2. Verify:
   - Vapi JSON schema validity using Python standard library against edge-case payloads.
   - n8n Workflow JSON structural validity: all 22 nodes, connections, node IDs, syntax of embedded JavaScript in Code nodes.
   - SQL DDL parsing and constraint coverage: ensure `harzblitz_orders` table and `harzblitz-damage-photos` storage bucket policies properly reject unauthenticated/anon queries.
   - Lexoffice Invoice Draft payload: verify that `voucherStatus: "draft"` is strictly enforced, and tax calculations comply with German Steuerrecht (19% MwSt., DATEV Konto 8400).
   - Verify `python harzblitz_automation/tests/e2e_simulation_test.py` passes with Exit Code 0.

Conclude with an explicit verdict: APPROVE or REQUEST_CHANGES.
Write your report in `handoff.md` in your working directory and notify the orchestrator via send_message.


## 2026-10-28T09:15:25Z
From: 92cab53a-b35a-4af7-a2f1-a90f14e82b2f
Content: You are challenger_harzblitz_m4_2.
Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\challenger_harzblitz_m4_2
Read your assignment in c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\challenger_harzblitz_m4_2\DISPATCH.md and c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md.
Adversarially challenge the schema contracts, n8n workflow graph integrity, SQL security, and Lexoffice draft accounting rules. Run tests and write your report into handoff.md with an explicit verdict (APPROVE or REQUEST_CHANGES) and notify the orchestrator via send_message.

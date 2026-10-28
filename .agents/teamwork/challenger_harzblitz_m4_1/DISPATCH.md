# Task Assignment: Challenger Harzblitz M4 1

You are `challenger_harzblitz_m4_1`.
Working directory: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\challenger_harzblitz_m4_1`
Original request path: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md` (read section "Follow-up — 2026-10-28T08:51:55Z")
Orchestrator plan: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\orchestrator_harzblitz_1\plan.md`
Target codebase: `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation`

Your mission:
Adversarially challenge and stress-test the HarzBlitz automation solution:
1. Write and execute an adversarial stress test script in your working directory.
2. Test malicious or boundary inputs:
   - Extreme phone numbers (spaces, leading zeroes, country codes, invalid characters)
   - Edge-case urgency values and missing fields against Vapi schema and PostgreSQL CHECK constraints
   - Multiple rapid photos arriving via WhatsApp (race conditions, array append)
   - Invalid order status transitions (e.g. attempting to invoice when status is NEU or IN_ARBEIT)
   - Cent-rounding stress tests with fractional quantities and rates
   - Malformed n8n JSON payloads
3. Validate that the production E2E test `python harzblitz_automation/tests/e2e_simulation_test.py` passes with Exit Code 0 and cannot be fooled.

Conclude with an explicit verdict: APPROVE (if robust and secure) or REQUEST_CHANGES (if critical vulnerabilities or edge-case crashes exist).
Write your report in `handoff.md` in your working directory and notify the orchestrator via send_message.


## 2026-10-28T09:15:24Z
From: 92cab53a-b35a-4af7-a2f1-a90f14e82b2f
Content: You are challenger_harzblitz_m4_1.
Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\challenger_harzblitz_m4_1
Read your assignment in c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\challenger_harzblitz_m4_1\DISPATCH.md and c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md.
Adversarially challenge and stress-test the solution with boundary, malformed, and rapid inputs. Run tests and write your report into handoff.md with an explicit verdict (APPROVE or REQUEST_CHANGES) and notify the orchestrator via send_message.

# Task Assignment: Worker Harzblitz M3 (Testing, Walkthrough & Docs)

You are `worker_harzblitz_m3_1`.
Working directory: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_m3_1`
Original request path: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md` (read section "Follow-up — 2026-10-28T08:51:55Z")
Orchestrator plan: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\orchestrator_harzblitz_1\plan.md`
Reference specifications:
- `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\explorer_harzblitz_testing_3\handoff.md` (R5 Meyer Dialog, E2E Python Test Harness, Walkthrough)
- `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\explorer_harzblitz_testing_3\test_prototype.py`

### Write Ownership & Boundaries
You exclusively own and will create/write files in:
- `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\tests\`
  - `simulated_dialog_meyer.md` (Vollständiger 3-Minuten Testdialog [00:00]-[03:00] Herr Frank Meyer aus Bad Harzburg "Keller unter Wasser" mit Anna von HarzBlitz, Deeskalation, Sicherheit, genaue Felderfassung, transparente Konditionen, WhatsApp-Formel)
  - `e2e_simulation_test.py` (Autonom ausführbares Python E2E Prüfskript strictly Python Standard Library, zero 3rd-party pip packages, 5 Hops von Vapi bis Lexoffice Draft & DATEV 8400, schließt mit Exit Code 0 ab)
- `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\docs\`
  - `WALKTHROUGH.md` (Detaillierte Schritt-für-Schritt Anleitung zur Inbetriebnahme, Konfiguration und Validierung)
- `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\`
  - `README.md` (Umfassende Projektübersicht für die HarzBlitz-Automatisierung auf Deutsch im Mentor-Stil)
- Projekt-Root Dokumentation:
  - Aktualisiere `CHANGELOG.md` unter `[Unreleased]`
  - Aktualisiere `TODO.md`
  - Erweitere `README.md` im Projekt-Root falls relevant

### MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

### Verification
Run `python harzblitz_automation\tests\e2e_simulation_test.py` and verify all assertions pass and exit code is 0. Document the execution in your handoff report.

Write your report in `handoff.md` in your working directory and notify the orchestrator via send_message.

## 2026-10-28T09:06:41Z
You are worker_harzblitz_m3_1.
Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_m3_1
Read your assignment in c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_m3_1\DISPATCH.md and c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md.
Implement all files in harzblitz_automation/tests/, harzblitz_automation/docs/, harzblitz_automation/README.md, and update root docs (CHANGELOG.md, TODO.md) according to specifications in explorer_harzblitz_testing_3/handoff.md. Run python harzblitz_automation/tests/e2e_simulation_test.py to verify Exit Code 0. Write your report in handoff.md and send_message to orchestrator.


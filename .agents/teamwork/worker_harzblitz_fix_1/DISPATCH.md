# Task Assignment: Remediation Worker HarzBlitz Fix 1

You are `worker_harzblitz_fix_1`.
Working directory: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_fix_1`
Original request path: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md` (read section "Follow-up — 2026-10-28T08:51:55Z")
Reviewer 1 findings: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\reviewer_harzblitz_m4_1\handoff.md`
Challenger 2 findings: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\challenger_harzblitz_m4_2\handoff.md`
Gate status: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\orchestrator_harzblitz_1\GATE_STATUS.md`

### Mission
Remediate all 7 identified defects across `harzblitz_automation/`:
1. `harzblitz_automation/n8n/harzblitz_e2e_workflow.json`:
   - Fix Node 6 template call: change name from `"harzblitz_notdienst_foto_upload"` to `"harzblitz_notdienst_foto_anforderung"`. Change parameter 2 to pass address (`{{ $json.address || $('Normalize Vapi Payload').item.json.address }}`) instead of issue_description.
   - Fix Node 2 (`Normalize Vapi Payload`): add `if (typeof params === 'string') { try { params = JSON.parse(params); } catch (e) {} }` to support stringified Vapi/OpenAI function call arguments.
   - Fix Node 3 (`Supabase Insert Order`): ensure JSON body is safe from unescaped quotes or newlines in issue_description.
   - Fix Branch 2 (`Prepare Photo URLs Update`): add null-check for `$('Find Active Order in Supabase').item.json[0]` so unassigned photos don't throw an unhandled TypeError.
   - Fix Node 20 (`Build Lexoffice Invoice Draft Payload`): ensure `voucherStatus: "draft"` is explicitly set, and include `DATEV Erlöskonto 8400 (19% USt)` in `remark`.
   - Harmonize webhook paths: use `dispatch-harzblitz-job` and `whatsapp-media-inbound` (and update WALKTHROUGH.md to match).
2. `harzblitz_automation/vapi/tool_dispatch_harzblitz_job.json`:
   - Update phone regex to `^\\+?[0-9\\s\\-()\\/]{7,25}$` (supporting slash `/` in numbers like `05321/778890`).
   - Add `minLength: 1` to string fields.
3. `harzblitz_automation/supabase/02_storage_harzblitz_damage_photos.sql`:
   - Set `public: false` to enforce private storage and restrict SELECT to `service_role` and `authenticated` staff to protect customer privacy and GDPR/DSGVO compliance.
4. `harzblitz_automation/lexoffice_datev/lexoffice_payload_schema.json`:
   - Include `voucherStatus` with enum `["draft"]` in the schema definition.
5. `harzblitz_automation/docs/WALKTHROUGH.md`:
   - Synchronize all webhook paths with the n8n workflow (`/webhook/dispatch-harzblitz-job` and `/webhook/whatsapp-media-inbound`).
   - Standardize file size limit to 25 MB across all documentation.
6. `harzblitz_automation/tests/e2e_simulation_test.py`:
   - Remove any self-certifying facade. Read and parse real files: `harzblitz_e2e_workflow.json`, `tool_dispatch_harzblitz_job.json`, `360dialog_template_de.json`, `lexoffice_payload_schema.json`.
   - Validate that the actual Lexoffice draft invoice payload produced by Node 20 passes `validate_schema()` against `lexoffice_payload_schema.json`.
   - Execute negative validation tests.
   - Run `python harzblitz_automation/tests/e2e_simulation_test.py` to confirm all checks pass with Exit Code 0.

### MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Write your complete report in `handoff.md` in your working directory and notify the orchestrator via send_message.


## 2026-10-28T09:27:31Z
You are worker_harzblitz_fix_1.
Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_fix_1
Read your assignment in c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_harzblitz_fix_1\DISPATCH.md and c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md.
Review the findings in reviewer_harzblitz_m4_1/handoff.md and challenger_harzblitz_m4_2/handoff.md.
Remediate all 7 issues across harzblitz_automation/ (n8n workflow, vapi schema, storage DDL, lexoffice schema, walkthrough, e2e_simulation_test.py).
Run python harzblitz_automation/tests/e2e_simulation_test.py to verify Exit Code 0 against real artifacts.
Write your complete report in handoff.md and notify the orchestrator via send_message.

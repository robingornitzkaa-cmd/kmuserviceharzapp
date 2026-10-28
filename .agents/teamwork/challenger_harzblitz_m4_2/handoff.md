# Handoff Report: Empirical Challenge Audit (M4)

**Agent:** `challenger_harzblitz_m4_2`  
**Working Directory:** `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\challenger_harzblitz_m4_2`  
**Target:** `harzblitz_automation`  
**Verdict:** **REQUEST_CHANGES**  

---

## 1. Observation

Direct observations from source code inspection and empirical test execution (`python .agents/teamwork/challenger_harzblitz_m4_2/challenger_harness.py`):

### Obs 1: Vapi Phone Regex Coverage & Missing minLength Constraints
- File: `harzblitz_automation/vapi/tool_dispatch_harzblitz_job.json`
- Line 15: `"pattern": "^\\+?[0-9\\s\\-()]{7,25}$"`
  - Testing against standard German DIN 5008 slash notation (`05321/778890` and `05322/12345`):
    `re.match(pattern, '05321/778890') -> None (False)`
    The character `/` is not included in the character class `[0-9\s\-()]`.
  - Contrast with `tests/e2e_simulation_test.py` line 135 where the test fallback had to define:
    `"pattern": r"^\+?[0-9\s\-\(\)\/]{7,25}$"`
- Lines 9-25: String properties `customer_name`, `address`, `issue_description` declare `"type": "string"`, but omit `"minLength": 1`. Passing `""` (empty string) passes validation.

### Obs 2: WhatsApp Template Name & Parameter Semantic Mismatch in n8n
- File: `harzblitz_automation/whatsapp/360dialog_template_de.json`
  - Line 2: `"name": "harzblitz_notdienst_foto_anforderung"`
  - Line 13: `"text": "Guten Tag {{1}},\n\nIhr Notdienst-Einsatz wurde von unserer Zentrale aufgenommen (Einsatzort: {{2}}).\n..."`
- File: `harzblitz_automation/n8n/harzblitz_e2e_workflow.json` (Node: `360dialog WhatsApp Dispatch`, ID: `10000000-0000-4000-8000-000000000006`)
  - Lines configuring `jsonBody`:
    ```json
    "template": {
      "name": "harzblitz_notdienst_foto_upload",
      "language": { "code": "de" },
      "components": [
        {
          "type": "body",
          "parameters": [
            { "type": "text", "text": "{{ $json[0].customer_name }}" },
            { "type": "text", "text": "{{ $json[0].issue_description.substring(0, 60) }}" }
          ]
        }
      ]
    }
    ```
  - Result: Template name requested is `"harzblitz_notdienst_foto_upload"` (differs from registered `"harzblitz_notdienst_foto_anforderung"`).
  - Result: Parameter `{{2}}` is populated with `issue_description` instead of `address`.

### Obs 3: Supabase Storage RLS Policy Exposes Damage Photos to Anonymous Public
- File: `harzblitz_automation/supabase/02_storage_harzblitz_damage_photos.sql`
  - Line 16: `INSERT INTO storage.buckets (..., public, ...) VALUES ('harzblitz-damage-photos', 'harzblitz-damage-photos', true, ...)`
  - Lines 60-65:
    ```sql
    DROP POLICY IF EXISTS "harzblitz_storage_public_select" ON storage.objects;
    CREATE POLICY "harzblitz_storage_public_select"
        ON storage.objects
        FOR SELECT
        TO public
        USING (bucket_id = 'harzblitz-damage-photos');
    ```
  - In PostgreSQL / Supabase RLS, `TO public` includes `anon` (unauthenticated). Any unauthenticated user with the Supabase anon key can query `storage.objects` and list all damage photos.
  - In contrast, `01_schema_harzblitz_orders.sql` explicitly restricts table access:
    Lines 89-91: `"Policy 3: Anon Role hat standardmäßig KEINEN Zugriff"`.

### Obs 4: Lexoffice Draft VoucherStatus Contract Omission
- File: `harzblitz_automation/lexoffice_datev/lexoffice_payload_schema.json`
  - Lines 14-24: `InvoiceDraftPayload` required array contains:
    `["voucherDate", "address", "lineItems", "totalPrice", "taxConditions", "shippingConditions"]`.
    `voucherStatus` is neither present in `required` nor defined in `properties`.
- File: `harzblitz_automation/n8n/harzblitz_e2e_workflow.json` (Node: `Build Lexoffice Invoice Draft Payload`)
  - `invoicePayload` does NOT define `voucherStatus: "draft"`.
- File: `harzblitz_automation/tests/e2e_simulation_test.py`
  - Line 425 & 479: Hardcodes `"voucherStatus": "draft"` into an internal Python dictionary and asserts against it, bypassing both the n8n node code and `lexoffice_payload_schema.json`.

### Obs 5: Unescaped String Interpolation in n8n HTTP Request Nodes
- File: `harzblitz_automation/n8n/harzblitz_e2e_workflow.json` (Node: `Supabase Insert Order`, ID: `10000000-0000-4000-8000-000000000003`)
  - `jsonBody`:
    `"={\n  \"customer_name\": \"{{ $json.customer_name }}\",\n  \"customer_phone\": \"{{ $json.customer_phone }}\",\n  \"address\": \"{{ $json.address }}\",\n  \"issue_description\": \"{{ $json.issue_description }}\",\n  \"urgency\": \"{{ $json.urgency }}\",\n  \"status\": \"NEU\"\n}"`
  - When customer input contains `"` (quotes) or `\n` (newlines), evaluating this template produces invalid JSON. `JSON.parse` fails with `SyntaxError`, and Supabase returns HTTP 400.

### Obs 6: Verified Passing Systems
- Node count in `harzblitz_e2e_workflow.json`: Exactly 22 nodes, 22 unique IDs, 22 unique names, 0 broken graph connections.
- JavaScript Syntax in all 5 `n8n-nodes-base.code` nodes: Passed `vm.Script` validation without syntax errors.
- German Steuerrecht (19% MwSt.) and DATEV SKR03:
  - 1.5h @ 95.00 € = 142.50 €
  - Pauschale = 69.00 €
  - Total Net = 211.50 €
  - 19% MwSt = 40.185 € -> rounded to 40.19 € (DIN 1333)
  - Gross = 251.69 €
  - DATEV SKR03 Automatikkonto 8400 (Erlöse 19% USt) correctly designated.
- `python harzblitz_automation/tests/e2e_simulation_test.py` executed with Exit Code 0 (44 assertions passed).

---

## 2. Logic Chain

1. **Vapi Rejection Risk (Obs 1):** Callers calling from Goslar landlines often report or have caller IDs in the format `05321/778890`. Because the regex in `tool_dispatch_harzblitz_job.json` omits `/`, Vapi function calling rejects the tool invocation, aborting the emergency intake.
2. **WhatsApp Production Failure (Obs 2):** Meta / 360dialog Cloud API requires an exact match for approved template names. Because n8n sends `harzblitz_notdienst_foto_upload` while the registered template is `harzblitz_notdienst_foto_anforderung`, every outgoing WhatsApp dispatch will fail with HTTP 400 (`100 - Invalid parameter: Template name does not exist`). Additionally, mapping `issue_description` to `{{2}}` produces corrupt user-facing text ("Einsatzort: Rohrbruch im Keller").
3. **Data Protection / DSGVO Breach (Obs 3):** Under GDPR (DSGVO), photos of residential property and damage are personal data. `02_storage_harzblitz_damage_photos.sql` creates a bucket with `public: true` and a policy granting `FOR SELECT TO public`. Any unauthenticated actor can list and view all customer photos via the public storage API, contradicting the zero-anon principle enforced in `01_schema_harzblitz_orders.sql`.
4. **Contract Inconsistency (Obs 4):** Both `ORIGINAL_REQUEST.md` (R4) and `DISPATCH.md` mandate that `voucherStatus: "draft"` must be strictly enforced. However, `lexoffice_payload_schema.json` does not include `voucherStatus` in properties or required fields, and the n8n invoice builder node does not output it. `e2e_simulation_test.py` gave a false sense of security by testing its own internal mock dictionary rather than the workflow or schema.
5. **Runtime Crash on Special Characters (Obs 5):** n8n HTTP Request node `Supabase Insert Order` constructs JSON via string interpolation rather than proper serialization. Inputs with quotes or newlines cause JSON parse errors in transit to Supabase.

---

## 3. Caveats

- **No Caveats.** All findings are reproduced deterministically via automated test execution on the target codebase without external dependencies or network assumptions.

---

## 4. Conclusion

**Verdict: REQUEST_CHANGES**

The solution demonstrates strong foundational architecture (valid 22-node n8n workflow graph, correct tax math, and flawless JavaScript syntax), but contains **5 critical integration and contract defects** that must be remediated:
1. **Fix Vapi Phone Pattern & Constraints:** Add `\/` to `customer_phone` regex pattern (`^\\+?[0-9\\s\\-()/]{7,25}$`) and add `"minLength": 1` to `customer_name`, `address`, and `issue_description` in `vapi/tool_dispatch_harzblitz_job.json`.
2. **Align WhatsApp Template Name & Parameters:** In `harzblitz_e2e_workflow.json` node `360dialog WhatsApp Dispatch`, change template name to `"harzblitz_notdienst_foto_anforderung"` and parameter 2 to `"{{ $json[0].address }}"`.
3. **Close Supabase Storage Anonymous Leak:** In `supabase/02_storage_harzblitz_damage_photos.sql`, set bucket to `public: false` (or remove `harzblitz_storage_public_select` policy for `TO public`) so unauthenticated/anon queries cannot enumerate private damage photos.
4. **Enforce `voucherStatus: "draft"` in Schema and n8n:** Add `voucherStatus: { "type": "string", "enum": ["draft"] }` to `InvoiceDraftPayload` properties and required list in `lexoffice_payload_schema.json`, and add `voucherStatus: "draft"` to `invoicePayload` in n8n node `Build Lexoffice Invoice Draft Payload`.
5. **Sanitize Supabase Insert in n8n:** Use proper JSON serialization in `Supabase Insert Order` to prevent quotation mark and newline injection syntax errors.

---

## 5. Verification Method

To independently verify all findings and confirm the verdict:

1. **Run Challenger Stress Harness:**
   ```powershell
   python .agents/teamwork/challenger_harzblitz_m4_2/challenger_harness.py
   ```
   *Expected result:* Exit Code 1, reporting 19 checks run (10 passed, 9 failed).

2. **Verify Base E2E Script:**
   ```powershell
   python harzblitz_automation/tests/e2e_simulation_test.py
   ```
   *Result:* Exits with code 0 (44 internal unit checks pass).

3. **Invalidation Conditions:**
   This verdict is invalidated when:
   - `tool_dispatch_harzblitz_job.json` validates German slash phone numbers and enforces `minLength >= 1`.
   - `harzblitz_e2e_workflow.json` node `360dialog WhatsApp Dispatch` references `harzblitz_notdienst_foto_anforderung` and `address`.
   - `02_storage_harzblitz_damage_photos.sql` drops `TO public` SELECT policy and secures the bucket against anon access.
   - `lexoffice_payload_schema.json` and n8n `Build Lexoffice Invoice Draft Payload` strictly enforce `voucherStatus: "draft"`.
   - `challenger_harness.py` exits with code 0.

# Handoff Report: HarzBlitz M1 (Voice & WhatsApp)

**Agent:** `worker_harzblitz_m1_1`  
**Milestone:** M1 (Voice & WhatsApp Automation)  
**Parent / Recipient:** `92cab53a-b35a-4af7-a2f1-a90f14e82b2f` (Orchestrator)  
**Target Directory:** `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation`  

---

## 1. Observation

Direct observations from source requirements and newly implemented artifacts:
- **`DISPATCH.md` (lines 10–16):**
  - Specified exact ownership of 4 target files:
    - `harzblitz_automation/vapi/system_prompt_anna.md`
    - `harzblitz_automation/vapi/tool_dispatch_harzblitz_job.json`
    - `harzblitz_automation/whatsapp/360dialog_template_de.json`
    - `harzblitz_automation/whatsapp/inbound_media_spec.md`
- **`spec_miner_harzblitz_1/handoff.md` (lines 85–351):**
  - Section 5.1 & 5.2 provided contracts for Vapi agent Anna (05321-778890), the 5 required parameters (`customer_name`, `customer_phone`, `address`, `issue_description`, `urgency`), phone regex `^\+?[0-9\s\-()]{7,25}$`, urgency enum (`NOTFALL`, `DRINGEND`, `STANDARD`), WhatsApp template in category `UTILITY`, 5-second transition delay, and the inbound media webhook specification.
- **Implemented Files:**
  1. `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\vapi\system_prompt_anna.md` (6,306 bytes): Full conversational system prompt for phone hotline `05321-778890`, Meister Marc Schneider, triage phases, immediate life/property safety protocols (water, electricity, gas), legal pricing protection (no fixed prices), and the 5-second WhatsApp transition.
  2. `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\vapi\tool_dispatch_harzblitz_job.json` (1,570 bytes): RFC-compliant OpenAI/Vapi tool schema for `dispatch_harzblitz_job` with strictly typed properties, phone regex, urgency enums, and `additionalProperties: false`.
  3. `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\whatsapp\360dialog_template_de.json` (1,079 bytes): WhatsApp Business Template conforming to Meta guidelines in category `UTILITY`, language `de`, including text header, body with `{{1}}` and `{{2}}` variables, sample parameters, footer with phone number, and a direct-dial button (`+495321778890`).
  4. `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation\whatsapp\inbound_media_spec.md` (8,817 bytes): Complete architecture specification for 360dialog media webhook, phone normalization, Supabase order matching, 360dialog media URL retrieval, binary download, Supabase Storage (`harzblitz-damage-photos`), database update (`array_append(photo_urls, ...)`), customer confirmation, and error handling.
- **Programmatic Verification Output:**
  - Command: `python -c "..."` (validating JSON parse, schema types, regex matching, template components, key string presence).
  - Verbatim Output:
    ```
    PASS: tool_dispatch_harzblitz_job.json is valid and conforms to specs.
    PASS: 360dialog_template_de.json is valid and conforms to Meta specs.
    PASS: system_prompt_anna.md contains all required elements.
    PASS: inbound_media_spec.md contains all required architectural elements.
    ALL VERIFICATIONS SUCCESSFUL (Exit Code 0)
    ```

---

## 2. Logic Chain

1. **Voice AI Conversational Engine (`system_prompt_anna.md`):**
   - Callers dialing `05321-778890` are under high acute stress. Immediate reassurance and immediate safety first-aid instructions (shutting off the main water valve, switching off fuses, evacuating for gas odors) prevent catastrophic property damage or bodily injury before address extraction begins.
   - Price objection handling is structured to protect HarzBlitz under German trade law (BGB Werkvertragsrecht) by forbidding fixed phone quotes while reassuring the customer regarding on-site master assessment.
   - The standardized 5-second transition formula informs the customer precisely when and where to expect the WhatsApp message.

2. **Vapi Function Calling (`tool_dispatch_harzblitz_job.json`):**
   - Vapi.ai and OpenAI tool calling runtimes require valid OpenAPI 3.0 / JSON Schema Draft-7.
   - Setting `additionalProperties: false` and requiring exactly `["customer_name", "customer_phone", "address", "issue_description", "urgency"]` prevents LLM hallucinations.
   - The regex `^\+?[0-9\s\-()]{7,25}$` accommodates various spoken German phone formats (local prefixes, spaces, brackets) while filtering invalid strings.

3. **WhatsApp Template Architecture (`360dialog_template_de.json`):**
   - Outside of an active 24h messaging window, Meta strictly requires registered and pre-approved templates.
   - Setting the category to `UTILITY` ensures rapid automated approval and prioritizes notification delivery over marketing channels.
   - Clear placeholders `{{1}}` (name) and `{{2}}` (address) contextualize the request, while the direct-call button ensures accessibility if the caller needs immediate re-contact.

4. **Inbound Media Pipeline (`inbound_media_spec.md`):**
   - Customers send damage photos as WhatsApp images or videos.
   - The 360dialog webhook delivers a `media_id`, not a direct CDN URL. The specification defines the 2-step retrieval (`GET /v1/{media_id}` -> Binary GET), storage upload to Supabase bucket `harzblitz-damage-photos`, and atomic database update using `array_append()` to guarantee no race conditions when multiple photos arrive in quick succession.

---

## 3. Caveats

- **360dialog Live Template Registration:** The template JSON is syntactically valid and compliant with Meta guidelines; actual deployment requires submitting the payload to the Meta Business Manager or 360dialog Hub with an active WhatsApp Business Account (WABA).
- **Phone Number Normalization:** Spoken numbers extracted by Vapi may contain local formatting (e.g. `05321 778890` or `0170 1234567`). The downstream n8n workflow must normalize these strings to E.164 (`491701234567`) before dispatching to the 360dialog outbound API.
- **No other caveats:** All requirements from R1 and R2 are fully met without assumptions or missing components.

---

## 4. Conclusion

Milestone M1 (Voice & Messaging) is complete:
- `harzblitz_automation/vapi/system_prompt_anna.md`, `harzblitz_automation/vapi/tool_dispatch_harzblitz_job.json`, `harzblitz_automation/whatsapp/360dialog_template_de.json`, and `harzblitz_automation/whatsapp/inbound_media_spec.md` have been authored to production standard.
- Syntax, schema compliance, regex patterns, and required components have been verified programmatically with Exit Code 0.
- The interface contracts are fully established for downstream workers (Supabase DDL, n8n workflow, Lexoffice integration, and E2E testing).

---

## 5. Verification Method

To independently verify the implementation, run the following commands in the workspace root:

```bash
python -c "
import json, re

# 1. Validate Vapi Tool Schema
with open('harzblitz_automation/vapi/tool_dispatch_harzblitz_job.json', 'r', encoding='utf-8') as f:
    t = json.load(f)
assert t['function']['name'] == 'dispatch_harzblitz_job'
assert len(t['function']['parameters']['required']) == 5
assert t['function']['parameters']['properties']['urgency']['enum'] == ['NOTFALL', 'DRINGEND', 'STANDARD']
assert re.match(t['function']['parameters']['properties']['customer_phone']['pattern'], '+491701234567')

# 2. Validate WhatsApp Template
with open('harzblitz_automation/whatsapp/360dialog_template_de.json', 'r', encoding='utf-8') as f:
    w = json.load(f)
assert w['name'] == 'harzblitz_notdienst_foto_anforderung'
assert w['category'] == 'UTILITY'
assert w['language'] == 'de'

print('INDEPENDENT VERIFICATION PASSED')
"
```

Expected output:
```
INDEPENDENT VERIFICATION PASSED
```
Invalidation conditions: Syntax error on `json.load()`, missing required parameters, or failed assertions.

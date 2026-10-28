#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adversarial Verification & Stress Test Harness v2
Agent: challenger_harzblitz_v2_1
Target: harzblitz_automation
"""

import os
import sys
import json
import re
import subprocess
import uuid
from datetime import datetime, timezone

# Ensure UTF-8 output on Windows
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "harzblitz_automation"))

print("=" * 80)
print("  EMPIRICAL CHALLENGER STRESS HARNESS v2 (challenger_harzblitz_v2_1)")
print("  Target Directory:", BASE_DIR)
print("=" * 80 + "\n")

results = {
    "total": 0,
    "passed": 0,
    "failed": 0,
    "findings": []
}

def report(status, test_name, detail=""):
    results["total"] += 1
    if status == "PASS":
        results["passed"] += 1
        print(f"[PASS] {test_name}: {detail}")
    else:
        results["failed"] += 1
        results["findings"].append({"test": test_name, "detail": detail})
        print(f"[FAIL] {test_name}: {detail}")

def run_node_eval(js_code):
    """Executes small JavaScript snippet in node.js and returns parsed JSON or string output."""
    res = subprocess.run(["node", "-e", js_code], capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0:
        raise RuntimeError(f"Node execution failed (code {res.returncode}): {res.stderr}")
    return res.stdout.strip()


# =========================================================================
# BATTERY 1: Vapi Tool Schema & German Phone Regex Boundary Stress Test
# =========================================================================
print("--- [BATTERY 1] Vapi Tool Schema & German Phone Regex Boundary Stress Test ---")
vapi_path = os.path.join(BASE_DIR, "vapi", "tool_dispatch_harzblitz_job.json")
if not os.path.isfile(vapi_path):
    report("FAIL", "Vapi Tool Schema File Exists", f"Not found at {vapi_path}")
else:
    with open(vapi_path, "r", encoding="utf-8") as f:
        vapi_data = json.load(f)
    
    props = vapi_data["function"]["parameters"]["properties"]
    phone_pattern = props["customer_phone"]["pattern"]

    # Extended Phone Matrix (Valid numbers)
    valid_phones = [
        ("05321/778890", "Goslar standard slash"),
        ("05322/12345", "Bad Harzburg slash"),
        ("05321 / 778890", "Spaced slash notation"),
        ("05321/ 778890", "Slash with trailing space"),
        ("05321 /778890", "Slash with leading space"),
        ("+49 (05321) 77-88-90", "International area code in parens"),
        ("+49 5321 / 77 88 90", "International spaced slash"),
        ("05321-778890", "Hyphenated standard"),
        ("0170 1234567", "Mobile spaced"),
        ("0170/1234567", "Mobile with slash"),
        ("+49(0)5321/778890", "German DIN notation with (0)"),
        ("00495321778890", "Standard 00 prefix"),
        ("05321/7", "Minimum valid 7 characters"),
        ("+49 (05321) / 77-88-90-12", "Maximum valid 25 characters")
    ]

    invalid_phones = [
        ("05321/", "Too short (6 chars)"),
        ("49 12345678901234567890123", "Too long without plus (26 chars)"),
        ("+49 12345678901234567890123", "Too long with plus (27 chars total, 26 in group)"),
        ("05321/CALLME", "Letters not permitted"),
        ("05321#778890", "Invalid character #"),
        ("05321*778890", "Invalid character *"),
        ("05321'; DROP TABLE harzblitz_orders; --", "SQL injection string"),
        ("", "Empty string")
    ]

    valid_fails = [f"{num} ({lbl})" for num, lbl in valid_phones if not re.match(phone_pattern, num)]
    invalid_fails = [f"{num} ({lbl})" for num, lbl in invalid_phones if re.match(phone_pattern, num)]

    if valid_fails:
        report("FAIL", "Valid German Phone Number Acceptance", f"Rejected valid: {valid_fails}")
    else:
        report("PASS", "Valid German Phone Number Acceptance", f"All {len(valid_phones)} valid German variants accepted")

    if invalid_fails:
        report("FAIL", "Invalid Phone Number Rejection", f"Incorrectly accepted invalid: {invalid_fails}")
    else:
        report("PASS", "Invalid Phone Number Rejection", f"All {len(invalid_phones)} invalid/hostile inputs rejected")

    # minLength Boundary Check
    min_length_ok = all(props[k].get("minLength", 0) >= 1 for k in ["customer_name", "customer_phone", "address", "issue_description"])
    report("PASS" if min_length_ok else "FAIL", "String minLength Constraints", "Enforces minLength >= 1 on all string fields")


# =========================================================================
# BATTERY 2: n8n Node 2 Payload Normalization in Node.js Sandbox
# =========================================================================
print("\n--- [BATTERY 2] n8n Node 2 (Normalize Vapi Payload) Sandbox Stress Test ---")
wf_path = os.path.join(BASE_DIR, "n8n", "harzblitz_e2e_workflow.json")
with open(wf_path, "r", encoding="utf-8") as f:
    wf_data = json.load(f)

node2 = [n for n in wf_data["nodes"] if n["name"] == "Normalize Vapi Payload"][0]
node2_code = node2["parameters"]["jsCode"]

def eval_node2(input_item):
    js = f"""
    const $input = {{ first: () => ({{ json: {json.dumps(input_item)} }}) }};
    function run() {{
        {node2_code}
    }}
    console.log(JSON.stringify(run()));
    """
    out = run_node_eval(js)
    return json.loads(out)[0]["json"]

# Test Case 2.1: Function arguments as JSON string with German slash phone
input_serialized = {
    "body": {
        "message": {
            "toolCalls": [
                {
                    "function": {
                        "name": "dispatch_harzblitz_job",
                        "arguments": json.dumps({
                            "customer_name": "Frank Meyer",
                            "customer_phone": "05321/778890",
                            "address": "Herzog-Wilhelm-Straße 42, 38667 Bad Harzburg",
                            "issue_description": "Keller unter Wasser",
                            "urgency": "NOTFALL"
                        })
                    }
                }
            ]
        }
    }
}
res2_1 = eval_node2(input_serialized)
report("PASS" if res2_1["customer_phone"] == "+495321778890" else "FAIL",
       "Node 2 Stringified Argument Parsing & Phone Normalization",
       f"05321/778890 -> {res2_1['customer_phone']}")

# Test Case 2.2: Bad Harzburg slash number 05322/12345
input_bad_harzburg = {
    "body": {
        "customer_phone": "05322/12345",
        "customer_name": "Erika Mustermann",
        "urgency": "dringend"
    }
}
res2_2 = eval_node2(input_bad_harzburg)
report("PASS" if res2_2["customer_phone"] == "+49532212345" and res2_2["urgency"] == "DRINGEND" else "FAIL",
       "Node 2 Direct Body Normalization (05322/12345 & lowercase urgency)",
       f"Phone: {res2_2['customer_phone']}, Urgency: {res2_2['urgency']}")

# Test Case 2.3: Spaced slash international number +49 5321 / 77 88 90
input_international = {
    "body": {
        "customer_phone": "+49 5321 / 77 88 90",
        "urgency": "UNKNOWN_VALUE"
    }
}
res2_3 = eval_node2(input_international)
report("PASS" if res2_3["customer_phone"] == "+495321778890" and res2_3["urgency"] == "NOTFALL" else "FAIL",
       "Node 2 International Phone Normalization & Fallback Urgency",
       f"Phone: {res2_3['customer_phone']}, Fallback Urgency: {res2_3['urgency']}")


# =========================================================================
# BATTERY 3: Unassigned WhatsApp Media & Null Safety in Node.js Sandbox
# =========================================================================
print("\n--- [BATTERY 3] Unassigned WhatsApp Media & Null Safety Sandbox Test ---")
node13 = [n for n in wf_data["nodes"] if n["name"] == "Prepare Photo URLs Update"][0]
node13_code = node13["parameters"]["jsCode"]

def eval_node13(active_order_data, media_meta):
    js = f"""
    const $ = (name) => {{
        if (name === 'Find Active Order in Supabase') {{
            return {{ item: {{ json: {json.dumps(active_order_data)} }} }};
        }}
        if (name === 'Parse Inbound Media') {{
            return {{ item: {{ json: {json.dumps(media_meta)} }} }};
        }}
        return {{ item: {{ json: {{}} }} }};
    }};
    const $env = {{ SUPABASE_URL: "https://frankfurt-supabase.harzblitz.de" }};
    function run() {{
        {node13_code}
    }}
    console.log(JSON.stringify(run()));
    """
    out = run_node_eval(js)
    return json.loads(out)[0]["json"]

# Test Case 3.1: Sender has NO active order (empty list [] from Supabase)
res3_1 = eval_node13([], {"media_id": "media_unassigned_001"})
null_safe_empty_list = (res3_1.get("orderId") is None and
                        res3_1.get("unassigned") is True and
                        res3_1.get("updated_photo_urls") == [])
report("PASS" if null_safe_empty_list else "FAIL",
       "Node 13 Null Safety: Empty Order List ([])",
       f"Handled gracefully -> orderId: {res3_1.get('orderId')}, unassigned: {res3_1.get('unassigned')}")

# Test Case 3.2: Sender has NO active order (null from Supabase)
res3_2 = eval_node13(None, {"media_id": "media_unassigned_002"})
null_safe_null = (res3_2.get("orderId") is None and
                  res3_2.get("unassigned") is True and
                  res3_2.get("updated_photo_urls") == [])
report("PASS" if null_safe_null else "FAIL",
       "Node 13 Null Safety: Null Order (null)",
       f"Handled gracefully -> orderId: {res3_2.get('orderId')}, unassigned: {res3_2.get('unassigned')}")

# Test Case 3.3: Sender has NO active order (empty object {} without id)
res3_3 = eval_node13({}, {"media_id": "media_unassigned_003"})
null_safe_empty_obj = (res3_3.get("orderId") is None and
                       res3_3.get("unassigned") is True and
                       res3_3.get("updated_photo_urls") == [])
report("PASS" if null_safe_empty_obj else "FAIL",
       "Node 13 Null Safety: Empty Object ({})",
       f"Handled gracefully -> orderId: {res3_3.get('orderId')}, unassigned: {res3_3.get('unassigned')}")

# Test Case 3.4: Active order exists, appends photo without duplicate
existing_url = "https://frankfurt-supabase.harzblitz.de/storage/v1/object/harzblitz-damage-photos/order-uuid-99/media_001.jpg"
active_order = {
    "id": "order-uuid-99",
    "photo_urls": [existing_url]
}
res3_4 = eval_node13([active_order], {"media_id": "media_002"})
active_order_ok = (res3_4.get("orderId") == "order-uuid-99" and
                   len(res3_4.get("updated_photo_urls", [])) == 2 and
                   "media_002.jpg" in res3_4.get("new_photo_url", ""))
report("PASS" if active_order_ok else "FAIL",
       "Node 13 Active Order Photo Linking",
       f"Added new photo URL -> Total URLs: {len(res3_4.get('updated_photo_urls', []))}")


# =========================================================================
# BATTERY 4: Supabase PostgreSQL & Storage Security Architecture
# =========================================================================
print("\n--- [BATTERY 4] Supabase PostgreSQL & Storage Security Architecture ---")
storage_sql_path = os.path.join(BASE_DIR, "supabase", "02_storage_harzblitz_damage_photos.sql")
with open(storage_sql_path, "r", encoding="utf-8") as f:
    storage_sql = f.read()

# Check Bucket Privacy
bucket_private = bool(re.search(r"INSERT INTO storage\.buckets[\s\S]+?'harzblitz-damage-photos'[\s\S]+?false[\s\S]+?26214400", storage_sql))
report("PASS" if bucket_private else "FAIL",
       "Storage Bucket Privacy & File Size Limit",
       "harzblitz-damage-photos configured as public=false and limit=26214400 bytes (25 MB)")

# Verify no SELECT policy to public exists in SQL
has_public_select = bool(re.search(r"CREATE POLICY[^\;]+ON storage\.objects[^\;]+FOR SELECT[^\;]+TO (public|anon)", storage_sql, re.IGNORECASE))
drop_public_select = "DROP POLICY IF EXISTS \"harzblitz_storage_public_select\"" in storage_sql
report("PASS" if (not has_public_select and drop_public_select) else "FAIL",
       "Storage Anon/Public Access Revocation (GDPR)",
       "No public/anon SELECT policy created; harzblitz_storage_public_select explicitly dropped")

# Verify allowed MIME types
mime_types_ok = all(m in storage_sql for m in ["image/jpeg", "image/png", "image/webp", "image/heic", "video/mp4", "video/quicktime"])
report("PASS" if mime_types_ok else "FAIL",
       "Storage MIME Whitelist Enforcement",
       "JPEG, PNG, WEBP, HEIC, MP4, QuickTime permitted")


# =========================================================================
# BATTERY 5: Lexoffice Invoice Draft Payload & German Tax Law (DATEV SKR03)
# =========================================================================
print("\n--- [BATTERY 5] Lexoffice Invoice Draft Payload & DATEV SKR03 Compliance ---")
lex_schema_path = os.path.join(BASE_DIR, "lexoffice_datev", "lexoffice_payload_schema.json")
with open(lex_schema_path, "r", encoding="utf-8") as f:
    lex_schema = json.load(f)

draft_def = lex_schema["definitions"]["InvoiceDraftPayload"]

# Check voucherStatus in schema
vs_prop = draft_def["properties"].get("voucherStatus", {})
vs_required = "voucherStatus" in draft_def.get("required", [])
vs_enum = vs_prop.get("enum") == ["draft"]

report("PASS" if (vs_prop and vs_required and vs_enum) else "FAIL",
       "Lexoffice Schema voucherStatus: 'draft' Contract",
       f"Defined: {bool(vs_prop)}, Required: {vs_required}, Strict Enum ['draft']: {vs_enum}")

# Execute Node 20 in Node.js
node20 = [n for n in wf_data["nodes"] if n["name"] == "Build Lexoffice Invoice Draft Payload"][0]
node20_code = node20["parameters"]["jsCode"]

contact_id = "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"
order_id = "11223344-5566-4778-8899-aabbccddeeff"
eval_data = {
    "contactId": contact_id,
    "orderData": {
        "id": order_id,
        "customer_name": "Frank Meyer",
        "customer_phone": "+495321778890",
        "address": "Herzog-Wilhelm-Straße 42, 38667 Bad Harzburg",
        "issue_description": "Keller unter Wasser durch akuten Rohrbruch"
    }
}

runner_js = f"""
const $input = {{ first: () => ({{ json: {{ id: "{contact_id}" }} }}) }};
const evalData = {json.dumps(eval_data)};
const $ = (name) => ({{
    first: () => ({{ json: evalData }}),
    item: {{ json: evalData }}
}});
const $env = {{ SUPABASE_URL: "https://frankfurt-supabase.harzblitz.de" }};
function run() {{
    {node20_code}
}}
console.log(JSON.stringify(run()[0].json.invoicePayload));
"""

node20_payload_str = run_node_eval(runner_js)
node20_payload = json.loads(node20_payload_str)

# Assertions on Node 20 Output
report("PASS" if node20_payload.get("voucherStatus") == "draft" else "FAIL",
       "Node 20 voucherStatus Value",
       f"voucherStatus is '{node20_payload.get('voucherStatus')}'")

report("PASS" if node20_payload["address"]["contactId"] == contact_id else "FAIL",
       "Node 20 contactId Mapping",
       f"contactId: {node20_payload['address']['contactId']}")

total_net = node20_payload["totalPrice"]["totalNetAmount"]
total_gross = node20_payload["totalPrice"]["totalGrossAmount"]
total_tax = node20_payload["totalPrice"]["totalTaxAmount"]

math_check = (total_net == 211.50 and total_tax == 40.19 and total_gross == 251.69)
report("PASS" if math_check else "FAIL",
       "Node 20 Tax & Gross Calculation (19% MwSt.)",
       f"Net: {total_net}€, Tax: {total_tax}€, Gross: {total_gross}€")

remark = node20_payload.get("remark", "")
has_datev_account = "DATEV Erlöskonto 8400 (19% USt)" in remark
has_order_ref = order_id in remark
report("PASS" if (has_datev_account and has_order_ref) else "FAIL",
       "Node 20 DATEV Konto 8400 & Order ID in Remark",
       f"DATEV 8400 present: {has_datev_account}, Order ID present: {has_order_ref}")


# =========================================================================
# BATTERY 6: n8n Node 3 JSON Injection & Escaping Stress Test
# =========================================================================
print("\n--- [BATTERY 6] n8n Node 3 JSON Escaping & Special Character Resilience ---")
node3 = [n for n in wf_data["nodes"] if n["name"] == "Supabase Insert Order"][0]
node3_body = node3["parameters"]["jsonBody"]

# Test hostile customer inputs with quotes, newlines, and backslashes
hostile_inputs = [
    {
        "customer_name": 'Frank "Der Retter" Meyer',
        "customer_phone": "05321/778890",
        "address": "Zeile 1\nZeile 2\r\n38667 Bad Harzburg",
        "issue_description": 'Rohrbruch: "Wasser schießt aus Wand" & Schimmelgefahr\\nKeller!',
        "urgency": "NOTFALL"
    },
    {
        "customer_name": "Test O'Connor",
        "customer_phone": "+49 (05321) 77-88-90",
        "address": 'C:\\Users\\Test\\Address',
        "issue_description": 'Injection attempt: ", "role": "admin", "fake": "',
        "urgency": "NOTFALL"
    }
]

# Strip n8n expression wrapper '={{' and '}}'
expr = re.sub(r"^=\{\{\s*", "", node3_body.strip())
expr = re.sub(r"\s*\}\}$", "", expr)

injection_fails = []
for idx, inp in enumerate(hostile_inputs, 1):
    js_eval = f"""
    const $json = {json.dumps(inp)};
    const bodyStr = {expr};
    console.log(bodyStr);
    """
    try:
        raw_json_output = run_node_eval(js_eval)
        parsed = json.loads(raw_json_output)
        # Verify values match exactly
        if parsed["customer_name"] != inp["customer_name"] or parsed["issue_description"] != inp["issue_description"]:
            injection_fails.append(f"Case {idx}: Content corruption")
    except Exception as e:
        injection_fails.append(f"Case {idx}: JSON parse failure ({e})")

if injection_fails:
    report("FAIL", "Node 3 JSON Serialization Resilience", f"Failures: {injection_fails}")
else:
    report("PASS", "Node 3 JSON Serialization Resilience", "Hostile quotes, newlines, and backslashes safely serialized without corruption")


# =========================================================================
# BATTERY 7: Documentation Synchronicity & Contract Alignment
# =========================================================================
print("\n--- [BATTERY 7] Documentation Synchronicity & Route Alignment ---")
walkthrough_path = os.path.join(BASE_DIR, "docs", "WALKTHROUGH.md")
with open(walkthrough_path, "r", encoding="utf-8") as f:
    walkthrough_content = f.read()

# Check webhook paths in WALKTHROUGH.md
has_dispatch_route = "dispatch-harzblitz-job" in walkthrough_content
has_media_route = "whatsapp-media-inbound" in walkthrough_content
has_25mb_limit = "25 MB" in walkthrough_content

report("PASS" if (has_dispatch_route and has_media_route and has_25mb_limit) else "FAIL",
       "WALKTHROUGH.md Webhook Paths & 25 MB Limit",
       f"dispatch-harzblitz-job: {has_dispatch_route}, whatsapp-media-inbound: {has_media_route}, 25 MB: {has_25mb_limit}")

# WhatsApp Template name check
template_path = os.path.join(BASE_DIR, "whatsapp", "360dialog_template_de.json")
with open(template_path, "r", encoding="utf-8") as f:
    tpl_meta = json.load(f)

node6 = [n for n in wf_data["nodes"] if n["name"] == "360dialog WhatsApp Dispatch"][0]
node6_body = node6["parameters"]["jsonBody"]
match_tpl = re.search(r'"name":\s*"([^"]+)"', node6_body)
node6_tpl_name = match_tpl.group(1) if match_tpl else None

report("PASS" if node6_tpl_name == tpl_meta["name"] else "FAIL",
       "WhatsApp Template Name Alignment",
       f"Meta template '{tpl_meta['name']}' == n8n node template '{node6_tpl_name}'")


# =========================================================================
# FINAL SUMMARY
# =========================================================================
print("\n" + "=" * 80)
print("  CHALLENGER STRESS HARNESS v2 EXECUTION SUMMARY")
print(f"  Total Checks Run : {results['total']}")
print(f"  Passed           : {results['passed']}")
print(f"  Failed (Defects) : {results['failed']}")
print("=" * 80)

if results["failed"] > 0:
    print(f"\n[VERDICT] REQUEST_CHANGES (Found {results['failed']} defects / vulnerabilities)")
    for idx, f in enumerate(results["findings"], 1):
        print(f"  {idx}. [{f['test']}] {f['detail']}")
    sys.exit(1)
else:
    print("\n[VERDICT] APPROVE (All empirical challenges and stress tests passed)")
    sys.exit(0)

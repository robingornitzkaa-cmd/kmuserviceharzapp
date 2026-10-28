#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Auditor Harzblitz v2 1 - Independent Forensic Adversarial Verification Suite
"""

import sys
import os
import json
import re
import subprocess

BASE_DIR = os.path.abspath(r"c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation")

def run_checks():
    failures = []
    passes = []

    def check(name, condition, details=""):
        if condition:
            passes.append(name)
            print(f"[AUDIT PASS] {name}")
        else:
            failures.append((name, details))
            print(f"[AUDIT FAIL] {name}: {details}")

    print("=" * 70)
    print("INDEPENDENT FORENSIC AUDIT CHECKS")
    print("=" * 70)

    # 1. Inspect Vapi Schema
    vapi_path = os.path.join(BASE_DIR, "vapi", "tool_dispatch_harzblitz_job.json")
    with open(vapi_path, "r", encoding="utf-8") as f:
        vapi = json.load(f)
    
    check("Vapi Tool Type", vapi.get("type") == "function")
    fn = vapi.get("function", {})
    check("Vapi Function Name", fn.get("name") == "dispatch_harzblitz_job")
    params = fn.get("parameters", {})
    required = params.get("required", [])
    expected_req = ["customer_name", "customer_phone", "address", "issue_description", "urgency"]
    check("Vapi Required Fields", set(expected_req) == set(required), f"Required: {required}")
    
    # Check phone regex against valid and invalid formats
    phone_pattern = params["properties"]["customer_phone"]["pattern"]
    valid_phones = ["+495321778890", "05321-778890", "05321/778890", "05322/12345", "(05321) 778890", "0170 1234567"]
    invalid_phones = ["abc", "123", "+49/phone", "05321--778890-very-long-exceeding-25-chars-total"]
    
    for vp in valid_phones:
        check(f"Phone Regex Valid: {vp}", bool(re.search(phone_pattern, vp)))
    for ip in invalid_phones:
        # fullmatch or start/end bound check
        check(f"Phone Regex Invalid: {ip}", not bool(re.fullmatch(phone_pattern, ip)), f"Matched unexpectedly: {ip}")

    # Check minLength on all text fields
    for field in ["customer_name", "customer_phone", "address", "issue_description"]:
        ml = params["properties"][field].get("minLength", 0)
        check(f"MinLength on {field}", ml >= 1, f"minLength is {ml}")

    # 2. Inspect Supabase Schema & Storage
    orders_sql_path = os.path.join(BASE_DIR, "supabase", "01_schema_harzblitz_orders.sql")
    with open(orders_sql_path, "r", encoding="utf-8") as f:
        sql1 = f.read()
    
    check("SQL Orders RLS Enabled", "ALTER TABLE public.harzblitz_orders ENABLE ROW LEVEL SECURITY;" in sql1)
    check("SQL Orders Urgency Check", "CHECK (urgency IN ('NOTFALL', 'DRINGEND', 'STANDARD'))" in sql1)
    check("SQL Orders Status Check", "CHECK (status IN ('NEU', 'IN_ARBEIT', 'ERLEDIGT'))" in sql1)
    check("SQL Orders No Anon Grant", not bool(re.search(r"TO (anon|public)", sql1, re.IGNORECASE)))

    storage_sql_path = os.path.join(BASE_DIR, "supabase", "02_storage_harzblitz_damage_photos.sql")
    with open(storage_sql_path, "r", encoding="utf-8") as f:
        sql2 = f.read()

    check("Storage Bucket Private", "false, -- Privater Bucket" in sql2 or "false," in sql2)
    check("Storage Drop Public Select", "DROP POLICY IF EXISTS \"harzblitz_storage_public_select\"" in sql2)
    check("Storage Size Limit 25MB", "26214400" in sql2)

    # 3. Inspect WhatsApp Template and n8n alignment
    tpl_path = os.path.join(BASE_DIR, "whatsapp", "360dialog_template_de.json")
    with open(tpl_path, "r", encoding="utf-8") as f:
        tpl = json.load(f)

    wf_path = os.path.join(BASE_DIR, "n8n", "harzblitz_e2e_workflow.json")
    with open(wf_path, "r", encoding="utf-8") as f:
        wf = json.load(f)

    n6 = [n for n in wf["nodes"] if n["name"] == "360dialog WhatsApp Dispatch"][0]
    n6_body = n6["parameters"]["jsonBody"]
    check("Template Name Alignment", tpl["name"] in n6_body, f"Expected {tpl['name']} in Node 6")
    check("Template Param 2 is Address", "address" in n6_body and "issue_description" not in n6_body)

    # 4. Inspect Lexoffice Schema & Node 20 Code
    lex_schema_path = os.path.join(BASE_DIR, "lexoffice_datev", "lexoffice_payload_schema.json")
    with open(lex_schema_path, "r", encoding="utf-8") as f:
        lex_schema = json.load(f)
    
    draft_def = lex_schema["definitions"]["InvoiceDraftPayload"]
    check("Lexoffice Schema voucherStatus required", "voucherStatus" in draft_def["required"])
    check("Lexoffice Schema voucherStatus draft enum", draft_def["properties"]["voucherStatus"]["enum"] == ["draft"])

    n20 = [n for n in wf["nodes"] if n["name"] == "Build Lexoffice Invoice Draft Payload"][0]
    n20_code = n20["parameters"]["jsCode"]
    check("Node 20 voucherStatus draft", 'voucherStatus: "draft"' in n20_code)
    check("Node 20 DATEV 8400 Remark", "DATEV Erlöskonto 8400 (19% USt)" in n20_code)
    check("Node 20 Net 211.50", "211.50" in n20_code)
    check("Node 20 Tax 40.19", "40.19" in n20_code)
    check("Node 20 Gross 251.69", "251.69" in n20_code)

    # 5. Execute Node 20 via Node.js and validate against schema
    test_node_js = f"""
    const $input = {{ first: () => ({{ json: {{ id: "test-contact-123" }} }}) }};
    const evalData = {{ contactId: "test-contact-123", orderData: {{ id: "test-order-999", address: "Harzweg 1, Goslar", issue_description: "Rohrbruch" }} }};
    const $ = () => ({{ first: () => ({{ json: evalData }}), item: {{ json: evalData }} }});
    const $env = {{ SUPABASE_URL: "https://test.supabase.co" }};
    function run() {{ {n20_code} }}
    console.log(JSON.stringify(run()[0].json.invoicePayload));
    """
    res = subprocess.run(["node", "-e", test_node_js], capture_output=True, text=True, encoding="utf-8")
    check("Node 20 Node.js execution exit 0", res.returncode == 0, res.stderr)
    payload = json.loads(res.stdout.strip())
    check("Executed Payload voucherStatus", payload.get("voucherStatus") == "draft")
    check("Executed Payload lineItems count", len(payload.get("lineItems", [])) == 2)
    check("Executed Payload totalNetAmount", payload["totalPrice"]["totalNetAmount"] == 211.50)
    check("Executed Payload totalTaxAmount", payload["totalPrice"]["totalTaxAmount"] == 40.19)
    check("Executed Payload totalGrossAmount", payload["totalPrice"]["totalGrossAmount"] == 251.69)

    # 6. Check System Constraints: No Battlefield TimeGuard deletion/tampering
    tg_paths = [
        r"C:\Program Files\BattlefieldTimeGuard",
        r"C:\ProgramData\BattlefieldTimeGuard",
        r"C:\Users\gorni\Desktop\bf"
    ]
    for p in tg_paths:
        check(f"Battlefield TimeGuard Intact: {p}", os.path.exists(p))

    # Summary
    print("=" * 70)
    print(f"AUDIT SUMMARY: {len(passes)} Passed, {len(failures)} Failed")
    print("=" * 70)
    return len(failures) == 0

if __name__ == "__main__":
    success = run_checks()
    sys.exit(0 if success else 1)

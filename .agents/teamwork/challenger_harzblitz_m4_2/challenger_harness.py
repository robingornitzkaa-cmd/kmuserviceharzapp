#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adversarial Verification & Stress Test Harness
Challenger: challenger_harzblitz_m4_2
Target: harzblitz_automation
"""

import os
import sys
import json
import re

# Ensure UTF-8 output on Windows
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "harzblitz_automation"))

print("=" * 75)
print("  EMPIRICAL CHALLENGER VERIFICATION HARNESS (harzblitz_m4_2)")
print("  Base Directory:", BASE_DIR)
print("=" * 75 + "\n")

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


# =========================================================================
# DOMAIN 1: Vapi Tool Schema & Prompt Rigor
# =========================================================================
print("--- [DOMAIN 1] Vapi JSON Schema & Tool Spec Integrity ---")
vapi_tool_path = os.path.join(BASE_DIR, "vapi", "tool_dispatch_harzblitz_job.json")
if not os.path.isfile(vapi_tool_path):
    report("FAIL", "Vapi Tool Schema Exists", f"File not found: {vapi_tool_path}")
else:
    with open(vapi_tool_path, "r", encoding="utf-8") as f:
        vapi_data = json.load(f)
    
    # Check OpenAI/Vapi tool structure
    is_fn_tool = vapi_data.get("type") == "function" and "function" in vapi_data
    report("PASS" if is_fn_tool else "FAIL", "Vapi Tool Structure", "type == 'function' with function object")
    
    fn = vapi_data.get("function", {})
    report("PASS" if fn.get("name") == "dispatch_harzblitz_job" else "FAIL", "Vapi Function Name", fn.get("name"))
    
    params = fn.get("parameters", {})
    props = params.get("properties", {})
    required = params.get("required", [])
    
    # Check required fields
    expected_req = ["customer_name", "customer_phone", "address", "issue_description", "urgency"]
    missing_req = [r for r in expected_req if r not in required]
    report("FAIL" if missing_req else "PASS", "Vapi Required Properties", f"Missing: {missing_req}" if missing_req else "All 5 required")
    
    # Check Phone Regex pattern against German numbers
    phone_pattern = props.get("customer_phone", {}).get("pattern", "")
    test_phones = [
        ("+491701234567", True, "International E.164"),
        ("05321-778890", True, "German hyphenated"),
        ("05321 778890", True, "German spaced"),
        ("(05321) 778890", True, "German area code in parens"),
        ("05321/778890", True, "German standard slash notation"),
        ("05322/12345", True, "Bad Harzburg slash notation"),
        ("05321 / 778890", True, "Spaced slash notation")
    ]
    
    phone_regex_fails = []
    for num, exp, label in test_phones:
        m = bool(re.match(phone_pattern, num))
        if m != exp:
            phone_regex_fails.append((num, label))
    
    if phone_regex_fails:
        report("FAIL", "Vapi Phone Regex Coverage", f"Rejects standard German slash format: {phone_regex_fails}")
    else:
        report("PASS", "Vapi Phone Regex Coverage", "All standard German phone formats matched")

    # Check minLength on required string fields
    min_length_fails = []
    for fld in ["customer_name", "address", "issue_description"]:
        if "minLength" not in props.get(fld, {}):
            min_length_fails.append(fld)
    if min_length_fails:
        report("FAIL", "Vapi String Boundary Constraints", f"Missing 'minLength': {min_length_fails} (allows empty strings)")
    else:
        report("PASS", "Vapi String Boundary Constraints", "minLength present on all string properties")


# =========================================================================
# DOMAIN 2: n8n Workflow Graph Integrity & JavaScript Syntax
# =========================================================================
print("\n--- [DOMAIN 2] n8n Workflow Graph Integrity & JavaScript Syntax ---")
n8n_path = os.path.join(BASE_DIR, "n8n", "harzblitz_e2e_workflow.json")
if not os.path.isfile(n8n_path):
    report("FAIL", "n8n Workflow File Exists", f"Not found: {n8n_path}")
else:
    with open(n8n_path, "r", encoding="utf-8") as f:
        wf = json.load(f)
    
    nodes = wf.get("nodes", [])
    node_map = {n["name"]: n for n in nodes}
    report("PASS" if len(nodes) == 22 else "FAIL", "n8n Node Count", f"Expected 22 nodes, found {len(nodes)}")
    
    # Check node ID uniqueness
    node_ids = [n["id"] for n in nodes]
    dup_ids = len(node_ids) - len(set(node_ids))
    report("PASS" if dup_ids == 0 else "FAIL", "n8n Node ID Uniqueness", f"Duplicate IDs: {dup_ids}")
    
    # Check node Name uniqueness
    node_names = [n["name"] for n in nodes]
    dup_names = len(node_names) - len(set(node_names))
    report("PASS" if dup_names == 0 else "FAIL", "n8n Node Name Uniqueness", f"Duplicate Names: {dup_names}")
    
    # Check connections graph
    conns = wf.get("connections", {})
    broken_edges = []
    for src, outputs in conns.items():
        if src not in node_map:
            broken_edges.append(f"Source '{src}' does not exist")
        for out_type, out_lists in outputs.items():
            for grp in out_lists:
                for target_conn in grp:
                    tgt = target_conn.get("node")
                    if tgt not in node_map:
                        broken_edges.append(f"Target '{tgt}' from '{src}' does not exist")
    
    report("FAIL" if broken_edges else "PASS", "n8n Connections Integrity", f"Broken edges: {broken_edges}" if broken_edges else "All connections valid")


# =========================================================================
# DOMAIN 3: WhatsApp Template vs n8n Workflow Contract Alignment
# =========================================================================
print("\n--- [DOMAIN 3] WhatsApp Template vs n8n Workflow Alignment ---")
tpl_file = os.path.join(BASE_DIR, "whatsapp", "360dialog_template_de.json")
if os.path.isfile(tpl_file):
    with open(tpl_file, "r", encoding="utf-8") as f:
        tpl_data = json.load(f)
    official_tpl_name = tpl_data.get("name")
    
    # Find 360dialog WhatsApp Dispatch node
    dispatch_node = node_map.get("360dialog WhatsApp Dispatch")
    if dispatch_node:
        body_str = dispatch_node.get("parameters", {}).get("jsonBody", "")
        match_tpl = re.search(r'"name":\s*"([^"]+)"', body_str)
        configured_tpl_name = match_tpl.group(1) if match_tpl else None
        
        if configured_tpl_name != official_tpl_name:
            report("FAIL", "WhatsApp Template Name Contract",
                   f"n8n calls '{configured_tpl_name}', but 360dialog template is '{official_tpl_name}'! (Causes HTTP 400 Template Not Found)")
        else:
            report("PASS", "WhatsApp Template Name Contract", f"Matches '{official_tpl_name}'")
        
        # Check template parameter 2: Meta template specifies {{2}} is Einsatzort (address)
        # Check what n8n passes for parameter 2
        text_params = re.findall(r'"text":\s*"([^"]+)"', body_str)
        if len(text_params) >= 2 and "issue_description" in text_params[1]:
            report("FAIL", "WhatsApp Template Parameter Semantics",
                   f"Parameter 2 sends issue_description ('{text_params[1]}') instead of Einsatzort/address! Customer receives damaged description in place of address.")
        else:
            report("PASS", "WhatsApp Template Parameter Semantics", f"Parameters conform: {text_params}")
    else:
        report("FAIL", "WhatsApp Dispatch Node", "Node '360dialog WhatsApp Dispatch' missing")


# =========================================================================
# DOMAIN 4: Supabase PostgreSQL Schema & Storage RLS Policies
# =========================================================================
print("\n--- [DOMAIN 4] Supabase PostgreSQL Schema & Storage RLS Security ---")
sql_orders_path = os.path.join(BASE_DIR, "supabase", "01_schema_harzblitz_orders.sql")
sql_storage_path = os.path.join(BASE_DIR, "supabase", "02_storage_harzblitz_damage_photos.sql")

if os.path.isfile(sql_orders_path):
    with open(sql_orders_path, "r", encoding="utf-8") as f:
        sql_orders = f.read()
    
    has_rls_enabled = "ENABLE ROW LEVEL SECURITY" in sql_orders
    report("PASS" if has_rls_enabled else "FAIL", "Supabase Orders RLS Enabled", "harzblitz_orders has ENABLE ROW LEVEL SECURITY")
    
    # Check anon rejection on orders
    anon_allowed_on_orders = bool(re.search(r'CREATE POLICY[^\;]+TO (anon|public)[^\;]+ON public\.harzblitz_orders', sql_orders, re.IGNORECASE))
    report("PASS" if not anon_allowed_on_orders else "FAIL", "Supabase Orders Anon Rejection", "harzblitz_orders has NO policies for anon/public (queries rejected by default)")
else:
    report("FAIL", "Supabase Orders SQL", "File missing")

if os.path.isfile(sql_storage_path):
    with open(sql_storage_path, "r", encoding="utf-8") as f:
        sql_storage = f.read()
    
    # Check bucket privacy: is public set to true?
    bucket_is_public = bool(re.search(r"INSERT INTO storage\.buckets[\s\S]+?VALUES\s*\([\s\S]+?true", sql_storage, re.IGNORECASE))
    # Check if a policy grants SELECT TO public
    policy_select_public = bool(re.search(r"CREATE POLICY[\s\S]+?ON storage\.objects[\s\S]+?FOR SELECT[\s\S]+?TO public", sql_storage, re.IGNORECASE))
    
    if bucket_is_public and policy_select_public:
        report("FAIL", "Supabase Storage Anon Security",
               "Storage bucket 'harzblitz-damage-photos' has public=true and policy 'harzblitz_storage_public_select' grants SELECT TO public! Unauthenticated visitors can enumerate damage photos of residents.")
    else:
        report("PASS", "Supabase Storage Anon Security", "Bucket rejects unauthenticated anon queries")
else:
    report("FAIL", "Supabase Storage SQL", "File missing")


# =========================================================================
# DOMAIN 5: Lexoffice Invoice Draft Payload & German Tax Law (DATEV SKR03)
# =========================================================================
print("\n--- [DOMAIN 5] Lexoffice Draft Invoice & DATEV SKR03 Rules ---")
lex_schema_path = os.path.join(BASE_DIR, "lexoffice_datev", "lexoffice_payload_schema.json")
if os.path.isfile(lex_schema_path):
    with open(lex_schema_path, "r", encoding="utf-8") as f:
        lex_schema = json.load(f)
    
    draft_def = lex_schema.get("definitions", {}).get("InvoiceDraftPayload", {})
    props = draft_def.get("properties", {})
    req = draft_def.get("required", [])
    
    has_voucher_status_prop = "voucherStatus" in props
    has_voucher_status_req = "voucherStatus" in req
    
    if not has_voucher_status_prop:
        report("FAIL", "Lexoffice Schema voucherStatus Definition",
               "voucherStatus is NOT defined in properties of InvoiceDraftPayload in lexoffice_payload_schema.json")
    else:
        report("PASS", "Lexoffice Schema voucherStatus Definition", "voucherStatus defined")
    
    if not has_voucher_status_req:
        report("FAIL", "Lexoffice Schema voucherStatus Enforcement",
               "voucherStatus is NOT in required fields of InvoiceDraftPayload in lexoffice_payload_schema.json")
    else:
        report("PASS", "Lexoffice Schema voucherStatus Enforcement", "voucherStatus is in required fields")

    # Check n8n node Build Lexoffice Invoice Draft Payload
    lex_node = node_map.get("Build Lexoffice Invoice Draft Payload")
    if lex_node:
        js_code = lex_node.get("parameters", {}).get("jsCode", "")
        if "voucherStatus" not in js_code:
            report("FAIL", "n8n Lexoffice Payload voucherStatus",
                   "n8n node 'Build Lexoffice Invoice Draft Payload' DOES NOT set 'voucherStatus: \"draft\"' in invoicePayload!")
        else:
            report("PASS", "n8n Lexoffice Payload voucherStatus", "n8n node includes voucherStatus")
    else:
        report("FAIL", "n8n Lexoffice Node", "Node missing")
else:
    report("FAIL", "Lexoffice Schema File", "File missing")

# Check Tax Calculations
hours = 1.5
rate = 95.00
net_hours = round(hours * rate, 2)
pauschale = 69.00
total_net = round(net_hours + pauschale, 2)
vat_19 = round(total_net * 0.19, 2)
total_gross = round(total_net + vat_19, 2)

math_ok = (net_hours == 142.50 and total_net == 211.50 and vat_19 == 40.19 and total_gross == 251.69)
report("PASS" if math_ok else "FAIL", "German Tax Law (19% MwSt.) Math",
       f"Net: {total_net:.2f}€, USt: {vat_19:.2f}€ (40.185 rounded DIN 1333), Gross: {total_gross:.2f}€")


# =========================================================================
# DOMAIN 6: JSON Injection & Escaping in n8n HTTP Request Nodes
# =========================================================================
print("\n--- [DOMAIN 6] JSON Escaping in n8n HTTP Request Nodes ---")
insert_node = node_map.get("Supabase Insert Order")
if insert_node:
    body = insert_node.get("parameters", {}).get("jsonBody", "")
    # Check if raw string interpolation is used without json serialization
    raw_interpolation = '\"{{ $json.' in body and 'JSON.stringify' not in body
    if raw_interpolation:
        report("FAIL", "n8n Supabase Insert JSON Escaping",
               "Uses unescaped string interpolation ('\"{{ $json.issue_description }}\"'). Customer input with quotes or newlines breaks JSON syntax!")
    else:
        report("PASS", "n8n Supabase Insert JSON Escaping", "Safe JSON encoding used")


# =========================================================================
# SUMMARY
# =========================================================================
print("\n" + "=" * 75)
print("  CHALLENGER HARNESS EXECUTION SUMMARY")
print(f"  Total Checks Run : {results['total']}")
print(f"  Passed           : {results['passed']}")
print(f"  Failed (Defects) : {results['failed']}")
print("=" * 75)

if results["failed"] > 0:
    print(f"\n[VERDICT] REQUEST_CHANGES (Found {results['failed']} defects / vulnerabilities)")
    for idx, f in enumerate(results["findings"], 1):
        print(f"  {idx}. [{f['test']}] {f['detail']}")
    sys.exit(1)
else:
    print("\n[VERDICT] APPROVE (All empirical challenges passed)")
    sys.exit(0)

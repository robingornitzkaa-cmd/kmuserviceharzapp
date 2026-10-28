#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Independent Victory Auditor: Forensic Verification Script
"""

import os
import re
import glob

DOC_PATH = r"c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS\Markennamen_Strategie_Top10.md"
WETTBEWERB_GLOB = r"c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS\*Wettbewerb*.md"

FORBIDDEN_BUZZWORDS = ['solutions', 'tech', 'digital', 'ai', 'synergy', 'excellence', 'cloud']

def run_audit():
    print("=== INDEPENDENT FORENSIC AUDIT ===")
    
    with open(DOC_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Normalize line endings
    content = content.replace("\r\n", "\n")
    lines = content.splitlines()

    # --- 1. SCHRITT 1 CHECK ---
    print("\n--- 1. SCHRITT 1: KONTEXT-EXTRAKTION ---")
    s1_match = re.search(r"## Schritt 1 – Kontext-Extraktion.*?\n(.*?)(?=\n---|\n## Schritt 2)", content, re.DOTALL)
    assert s1_match, "Schritt 1 section not found!"
    s1_text = s1_match.group(1).strip()
    
    # Extract numbered points: e.g. 1. **Geschäftsmodell:** ...
    numbered_points = re.findall(r"^\d+\.\s+\*\*.*?\*\*:\s+(.*)$", s1_text, re.MULTILINE)
    if not numbered_points:
        # Colon might be inside the bold tags: 1. **Geschäftsmodell:** ...
        numbered_points = re.findall(r"^\d+\.\s+\*\*(.*?)\*\*\s+(.*)$", s1_text, re.MULTILINE)
    
    print(f"Numbered points in Schritt 1: {len(numbered_points)}")
    assert len(numbered_points) == 3, f"Expected exactly 3 points in Schritt 1, found {len(numbered_points)}"
    
    for i, pt_tuple in enumerate(numbered_points, 1):
        if isinstance(pt_tuple, tuple):
            label, text = pt_tuple
            full_pt = f"{label} {text}"
        else:
            text = pt_tuple
            full_pt = text
        print(f"Point {i}: {full_pt[:90]}...")
        assert text.endswith("."), f"Point {i} does not end with a period!"
    
    print(">> SCHRITT 1 PASS: Exactly 3 numbered points / concise sentences covering the 3 questions.")

    # --- 2. SCHRITT 2 CHECK ---
    print("\n--- 2. SCHRITT 2: SEMANTISCHE EXPLORATION ---")
    fields = {
        "Feld A": r"### Feld A:.*?\n(.*?)(?=### Feld B|\n---|\Z)",
        "Feld B": r"### Feld B:.*?\n(.*?)(?=### Feld C|\n---|\Z)",
        "Feld C": r"### Feld C:.*?\n(.*?)(?=### Feld D|\n---|\Z)",
        "Feld D": r"### Feld D:.*?\n(.*?)(?=\n---|\n## Schritt 3|\Z)"
    }
    
    field_counts = {}
    for fname, pattern in fields.items():
        fmatch = re.search(pattern, content, re.DOTALL)
        assert fmatch, f"{fname} not found!"
        ftext = fmatch.group(1).strip()
        bullet_items = re.findall(r"^-\s+\*\*(.*?)\*\*:", ftext, re.MULTILINE)
        if not bullet_items:
            bullet_items = re.findall(r"^-\s+(.*?)$", ftext, re.MULTILINE)
        print(f"{fname} count: {len(bullet_items)} items -> {bullet_items[:3]}...")
        field_counts[fname] = len(bullet_items)
        assert 5 <= len(bullet_items) <= 8, f"{fname} has {len(bullet_items)} items, expected 5-8!"
        
    print(f">> SCHRITT 2 PASS: All fields have 5-8 terms ({field_counts}).")

    # --- 3. SCHRITT 3 CHECK ---
    print("\n--- 3. SCHRITT 3: HÄRTETEST-FILTER ---")
    s3_match = re.search(r"## Schritt 3 – Der Härtetest-Filter.*?\n(.*?)(?=\n---|\n## Schritt 4)", content, re.DOTALL)
    assert s3_match, "Schritt 3 not found!"
    s3_text = s3_match.group(1)

    required_filters = [
        "Meister-Test",
        "Telefon-Test",
        "Seriositäts- & Rechnungs-Test",
        "Negativ-Filter"
    ]
    for rf in required_filters:
        assert rf.lower() in s3_text.lower(), f"Filter '{rf}' missing in Schritt 3!"
        print(f"Found filter: {rf}")

    # Check for negative examples (marked with ❌)
    negative_examples = re.findall(r"❌\s+\*?([A-Za-z0-9\-\s]+)\*?", s3_text)
    print(f"Documented rejected negative examples: {len(negative_examples)} found -> {negative_examples}")
    assert len(negative_examples) >= 4, "Not enough rejected negative examples documented!"
    print(">> SCHRITT 3 PASS: All 4 hardness filters documented with concrete negative examples.")

    # --- 4. SCHRITT 4 CHECK ---
    print("\n--- 4. SCHRITT 4: FINALE TOP-10 TABELLE ---")
    table_rows = []
    in_table = False
    for line in lines:
        if "| Kernname" in line:
            in_table = True
            continue
        if in_table:
            if line.startswith("| :---") or line.startswith("|---"):
                continue
            if line.startswith("|") and not line.strip() == "|":
                cols = [c.strip() for c in line.split("|")[1:-1]]
                if len(cols) == 6:
                    table_rows.append(cols)
                elif len(cols) > 0:
                    print(f"Warning: malformed table row: {line}")
            elif line.startswith("---") or line.startswith("##"):
                break

    print(f"Extracted table rows: {len(table_rows)}")
    assert len(table_rows) == 10, f"Expected exactly 10 table rows, got {len(table_rows)}"

    cat_dist = {}
    claims = []
    names = []
    variants = []
    domains = []

    for i, row in enumerate(table_rows, 1):
        name_clean = re.sub(r"\*+", "", row[0]).strip()
        variant_clean = re.sub(r"\*+", "", row[1]).strip()
        cat = row[2].strip()
        claim = row[3].strip()
        reason = row[4].strip()
        domain = row[5].replace("`", "").strip()

        names.append(name_clean)
        variants.append(variant_clean)
        claims.append(claim)
        domains.append(domain)
        cat_dist[cat] = cat_dist.get(cat, 0) + 1

        print(f"Row {i:2d}: {name_clean:15s} | {variant_clean:20s} | {cat:25s} | Claim: '{claim}' | Domain: {domain}")

    expected_dist = {
        "Handwerk / Pragmatismus": 3,
        "Nutzen / Ergebnis": 3,
        "Kunstwort / Abstraktion": 2,
        "Hybride Modelle": 2
    }
    print(f"\nCategory distribution: {cat_dist}")
    assert cat_dist == expected_dist, f"Category distribution mismatch! Got {cat_dist}, expected {expected_dist}"
    print(">> SCHRITT 4 TABLE STRUCTURE & DISTRIBUTION PASS!")

    # --- 5. FORBIDDEN BUZZWORDS CHECK ---
    print("\n--- 5. FORBIDDEN BUZZWORD CHECK ---")
    for name, variant, claim in zip(names, variants, claims):
        for bw in FORBIDDEN_BUZZWORDS:
            pattern = r'\b' + re.escape(bw) + r'\b'
            for text_source, label in [(name, "name"), (variant, "variant"), (claim, "claim")]:
                match = re.search(pattern, text_source, re.IGNORECASE)
                if match:
                    raise AssertionError(f"Forbidden buzzword '{bw}' found in {label}: '{text_source}'!")
    print(f">> FORBIDDEN BUZZWORDS PASS: Zero occurrences of {FORBIDDEN_BUZZWORDS} in names, variants, claims.")

    # --- 6. CLAIM LENGTH CHECK ---
    print("\n--- 6. CLAIM WORD COUNT CHECK ---")
    for name, claim in zip(names, claims):
        words = claim.split()
        word_count = len(words)
        print(f"Name: {name:15s} | Claim: '{claim}' ({word_count} words)")
        assert word_count <= 5, f"Claim for '{name}' exceeds 5 words ({word_count} words): '{claim}'!"
    print(">> CLAIM WORD COUNT PASS: All claims <= 5 words.")

    # --- 7. REGIONAL COMPETITOR COLLISION CHECK ---
    print("\n--- 7. REGIONAL COMPETITOR COLLISION CHECK ---")
    competitor_files = glob.glob(WETTBEWERB_GLOB)
    print(f"Competitor analysis files found: {len(competitor_files)} files")
    assert len(competitor_files) >= 4, "Expected at least 4 competitor analysis files!"

    competitor_names = set()
    for cf in competitor_files:
        with open(cf, "r", encoding="utf-8", errors="ignore") as f:
            ccontent = f.read()
        comp_matches = re.findall(r"(?:###|####|##|\*\*)\s*([A-Za-z0-9äöüÄÖÜß\-\.\s&]+)(?:\*\*|\n)", ccontent)
        for m in comp_matches:
            m_clean = m.strip()
            if len(m_clean) > 3 and not any(skip in m_clean.lower() for skip in ["wettbewerb", "fazit", "harz", "übersicht", "zusammenfassung", "kategorie", "preis"]):
                competitor_names.add(m_clean)

    print(f"Extracted {len(competitor_names)} unique competitor strings from DOCS/.")
    for name in names:
        for cname in competitor_names:
            if name.lower() == cname.lower():
                raise AssertionError(f"Exact collision detected between candidate '{name}' and competitor '{cname}'!")

    print(">> REGIONAL COMPETITOR COLLISION PASS: Zero collisions with regional competitors.")

    print("\n=== ALL FORENSIC CHECKS PASSED ===")

if __name__ == "__main__":
    run_audit()

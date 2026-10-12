#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Verification Script for DOCS/Markennamen_Strategie_Schablonenfrei_Top10.md
Validates all acceptance criteria: structure, rules, blacklist, claim length, distribution, collisions.
"""

import os
import re
import sys

# Ensure UTF-8 output on Windows terminal
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

DOC_PATH = r"c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS\Markennamen_Strategie_Schablonenfrei_Top10.md"
ORIGINAL_DOC_PATH = r"c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS\Markennamen_Strategie_Top10.md"

ROUND_1_NAMES = [
    "prozesswerk", "büroschmiede", "bueroschmiede", "flusswerk",
    "klarzeit", "ruhetakt", "freitakt", "klaros", "struktus",
    "taktwerk", "ruhewerk"
]

FORBIDDEN_TEMPLATES = ["werk", "schmiede", "lotse", "bank"]
FORBIDDEN_ANGLICISMS = ["solutions", "tech", "digital", "cloud", "ai", "hub", "smart"]

EXPECTED_COLUMNS = [
    "Kernname (Skalierbar)",
    "Modulare Variante (mit Harz)",
    "Stilrichtung",
    "Claim / Untertitel (max. 5 Wörter)",
    "Psychologische Wirkung beim Kunden",
    "Domain-Ansatz (.de)"
]

def verify():
    print("=" * 80)
    print("VERIFICATION SUITE: SCHABLONENFREIE TOP-10 MARKENNAMEN")
    print("=" * 80)

    # 1. File existence
    assert os.path.exists(DOC_PATH), f"Target file does not exist: {DOC_PATH}"
    print(f"✅ Target file exists: {DOC_PATH}")

    assert os.path.exists(ORIGINAL_DOC_PATH), f"Original doc missing: {ORIGINAL_DOC_PATH}"
    print(f"✅ Original file preserved: {ORIGINAL_DOC_PATH}")

    with open(DOC_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # 2. Check sections
    step1_match = re.search(r"## Schritt 1 – Strategische Reflexion", content)
    step2_match = re.search(r"## Schritt 2 – Freies, ungebundenes Brainstorming", content)
    step3_match = re.search(r"## Schritt 3 – Der Selektions- & Härtetest", content)
    step4_match = re.search(r"## Schritt 4 – Finale Top-10-Entscheidung", content)

    assert step1_match, "Schritt 1 header missing"
    assert step2_match, "Schritt 2 header missing"
    assert step3_match, "Schritt 3 header missing"
    assert step4_match, "Schritt 4 header missing"
    print("✅ All 4 Process Steps (Schritt 1 bis 4) present and formatted.")

    # 3. Parse Markdown table from Step 4
    step4_section = content[step4_match.start():]
    table_match = re.search(r"(\|.+?\n\|[-:\s|]+\n((\|.+?\n)+))", step4_section)
    assert table_match, "Table not found in Step 4"

    table_raw = table_match.group(1).strip().splitlines()
    header_line = table_raw[0]
    headers = [h.strip() for h in header_line.split("|")[1:-1]]

    print(f"Table headers detected: {headers}")
    assert headers == EXPECTED_COLUMNS, f"Headers mismatch! Expected {EXPECTED_COLUMNS}, got {headers}"
    print("✅ Table headers match required columns exactly.")

    # Rows
    rows = []
    for line in table_raw[2:]:
        if not line.strip() or not line.startswith("|"):
            continue
        cols = [c.strip() for c in line.split("|")[1:-1]]
        if len(cols) == len(EXPECTED_COLUMNS):
            rows.append(cols)

    print(f"Number of rows found in table: {len(rows)}")
    assert len(rows) == 10, f"Expected exactly 10 rows, found {len(rows)}"
    print("✅ Table contains exactly 10 brand name entries.")

    # 4. Check each entry
    categories = {}
    names = []

    for idx, row in enumerate(rows, start=1):
        raw_name, variant, stilrichtung, claim, psych, domain = row
        # Clean markdown bolding
        clean_name = raw_name.replace("**", "").strip()
        names.append(clean_name)

        print(f"\n[{idx}] Testing: '{clean_name}' (Variant: '{variant}')")
        print(f"    Stilrichtung: {stilrichtung}")
        print(f"    Claim: '{claim}'")
        print(f"    Domain: '{domain}'")

        # Category counting
        categories[stilrichtung] = categories.get(stilrichtung, 0) + 1

        # Check claim length
        claim_words = claim.split()
        assert len(claim_words) <= 5, f"Claim for '{clean_name}' exceeds 5 words ({len(claim_words)} words): '{claim}'"
        print(f"    -> Claim length: {len(claim_words)} words (PASS <= 5)")

        # Check Harz variant
        assert "harz" in variant.lower(), f"Modular variant for '{clean_name}' does not contain 'Harz': '{variant}'"

        # Check domain ends with .de
        assert domain.endswith(".de`") or domain.endswith(".de"), f"Domain must end with .de: '{domain}'"

        # Check forbidden templates (substring check)
        for tmpl in FORBIDDEN_TEMPLATES:
            assert tmpl not in clean_name.lower(), f"Forbidden template '{tmpl}' found in name '{clean_name}'"
            assert tmpl not in variant.lower(), f"Forbidden template '{tmpl}' found in variant '{variant}'"
            assert tmpl not in claim.lower(), f"Forbidden template '{tmpl}' found in claim '{claim}'"
        print(f"    -> Rigid templates check (Werk, Schmiede, Lotse, Bank): PASS (0 found)")

        # Check forbidden IT Anglicisms
        for ang in FORBIDDEN_ANGLICISMS:
            pattern = r'\b' + re.escape(ang) + r'\b'
            assert not re.search(pattern, clean_name, re.IGNORECASE), f"Forbidden anglicism '{ang}' in name '{clean_name}'"
            assert not re.search(pattern, variant, re.IGNORECASE), f"Forbidden anglicism '{ang}' in variant '{variant}'"
            assert not re.search(pattern, claim, re.IGNORECASE), f"Forbidden anglicism '{ang}' in claim '{claim}'"
        print(f"    -> IT-Anglicisms check (Solutions, Tech, Digital, Cloud, AI, Hub, Smart): PASS (0 found)")

        # Check Round 1 repeats
        assert clean_name.lower() not in ROUND_1_NAMES, f"Name '{clean_name}' repeats Round 1 candidate!"
        print(f"    -> Round 1 collision check: PASS (clean)")

    # 5. Check distribution
    print("\n--- DISTRIBUTION CHECK ---")
    print("Categories distribution:")
    for cat, count in categories.items():
        print(f"  - {cat}: {count}")
        assert 2 <= count <= 3, f"Category '{cat}' count {count} is outside [2, 3]!"
    assert len(categories) == 4, f"Expected 4 categories, got {len(categories)}"
    print("✅ All 4 directions have between 2 and 3 names each (balanced).")

    # 6. Check unique names
    assert len(set(names)) == 10, "Duplicate names found in Top 10!"
    print("✅ All 10 brand names are completely unique.")

    print("\n" + "=" * 80)
    print("ALL VERIFICATION CHECKS PASSED PERFECTLY!")
    print("=" * 80)

if __name__ == "__main__":
    verify()

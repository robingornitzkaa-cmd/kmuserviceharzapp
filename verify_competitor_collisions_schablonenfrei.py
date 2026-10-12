#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adversarial Phonetic & Competitor Collision Test for the 10 Schablonenfrei Names
"""

import re
import sys
from run_collision_tests_iter2 import (
    koelner_phonetik, levenshtein_distance, normalized_levenshtein,
    jaro_winkler, DOCUMENT_COMPETITORS
)

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

NAMES = [
    ("Klarstand", "Richtung A (Ergebnis- & Nutzen-Klarheit)"),
    ("Freikopf", "Richtung A (Ergebnis- & Nutzen-Klarheit)"),
    ("Bürofrieden", "Richtung A (Ergebnis- & Nutzen-Klarheit)"),
    ("Bürologik", "Richtung B (Funktionale / Sachliche Namen)"),
    ("Kernprozess", "Richtung B (Funktionale / Sachliche Namen)"),
    ("Praxos", "Richtung C (Moderne Neologismen / Kunstwörter)"),
    ("Ordonis", "Richtung C (Moderne Neologismen / Kunstwörter)"),
    ("Valido", "Richtung C (Moderne Neologismen / Kunstwörter)"),
    ("Hebelpunkt", "Richtung D (Bildhafte / Assoziative Namen)"),
    ("Gleichlauf", "Richtung D (Bildhafte / Assoziative Namen)")
]

def check_collisions():
    print("=" * 80)
    print("COMPETITOR & PHONETIC COLLISION ANALYSIS: SCHABLONENFREI TOP 10")
    print("=" * 80)

    all_clean = True
    for name, cat in NAMES:
        cologne = koelner_phonetik(name)
        print(f"\nEvaluating: '{name}' | Stilrichtung: {cat}")
        print(f"  -> Cologne Phonetics (DIN 31634): {cologne}")

        matches = []
        for comp in DOCUMENT_COMPETITORS:
            cname = comp["name"]
            cname_clean = re.sub(r'\b(gmbh|ug|ag|gbr|co|kg|e\.k\.|inc|llc|solutions|it|services|service|gmbh & co\. kg)\b', '', cname, flags=re.IGNORECASE).strip()
            tokens = re.findall(r'[A-Za-zÄÖÜäöüß]+', cname_clean)
            for tok in tokens + [cname_clean]:
                if len(tok) < 3:
                    continue
                jw = jaro_winkler(name, tok)
                nl = normalized_levenshtein(name, tok)
                ld = levenshtein_distance(name, tok)
                if jw >= 0.82 or nl >= 0.70 or ld <= 2:
                    matches.append((comp["name"], comp["type"], tok, jw, nl, ld))

        if matches:
            print(f"  -> Potential Competitor Proximity Detected:")
            for cname, ctype, tok, jw, nl, ld in matches:
                print(f"     * {cname} [{ctype}] (Token: '{tok}') -> JW: {jw:.3f}, NormLev: {nl:.3f}, Dist: {ld}")
                all_clean = False
        else:
            print(f"  -> Regional & Benchmark Proximity: ✅ CLEAN (No collisions)")

    if all_clean:
        print("\n" + "=" * 80)
        print("RESULT: ALL 10 CANDIDATES ARE 100% CLEAN OF COMPETITOR COLLISIONS!")
        print("=" * 80)
    else:
        print("\n" + "=" * 80)
        print("RESULT: REVIEW WARNINGS ABOVE.")
        print("=" * 80)

if __name__ == "__main__":
    check_collisions()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import socket

buzzwords = {'solutions', 'tech', 'digital', 'ai', 'synergy', 'excellence', 'cloud'}

roster = [
    {'name': 'Prozesswerk', 'variant': 'Prozesswerk Harz', 'cat': 'Handwerk / Pragmatismus', 'claim': 'Abläufe im Griff. Feste Preise.', 'dom': 'prozesswerk-harz.de', 'base_dom': 'prozesswerk.de'},
    {'name': 'Büroschmiede', 'variant': 'Büroschmiede Harz', 'cat': 'Handwerk / Pragmatismus', 'claim': 'Schluss mit dem Büro-Sonntag.', 'dom': 'bueroschmiede-harz.de', 'base_dom': 'bueroschmiede.de'},
    {'name': 'Flusswerk', 'variant': 'Flusswerk Harz', 'cat': 'Handwerk / Pragmatismus', 'claim': 'Abläufe, die einfach fließen.', 'dom': 'flusswerk-harz.de', 'base_dom': 'flusswerk.de'},
    {'name': 'Klarzeit', 'variant': 'Klarzeit Harz', 'cat': 'Nutzen / Ergebnis', 'claim': 'Ihr Büro im Reinen.', 'dom': 'klarzeit-harz.de', 'base_dom': 'klarzeit.de'},
    {'name': 'Ruhetakt', 'variant': 'Ruhetakt Harz', 'cat': 'Nutzen / Ergebnis', 'claim': 'Pünktlicher Feierabend. Geordnete Belege.', 'dom': 'ruhetakt-harz.de', 'base_dom': 'ruhetakt.de'},
    {'name': 'Freitakt', 'variant': 'Freitakt Harz', 'cat': 'Nutzen / Ergebnis', 'claim': 'Mehr Feierabend. Weniger Papierkram.', 'dom': 'freitakt-harz.de', 'base_dom': 'freitakt.de'},
    {'name': 'Klaros', 'variant': 'Klaros Harz', 'cat': 'Kunstwort / Abstraktion', 'claim': 'Präzise Abläufe. Feste Preise.', 'dom': 'klaros-harz.de', 'base_dom': 'klaros.de'},
    {'name': 'Struktus', 'variant': 'Struktus Harz', 'cat': 'Kunstwort / Abstraktion', 'claim': 'Klare Struktur für Betriebe.', 'dom': 'struktus-harz.de', 'base_dom': 'struktus.de'},
    {'name': 'Taktwerk', 'variant': 'Taktwerk Harz', 'cat': 'Hybride Modelle', 'claim': 'Ihr Betrieb im Takt.', 'dom': 'taktwerk-harz.de', 'base_dom': 'taktwerk.de'},
    {'name': 'Klartakt', 'variant': 'Klartakt Harz', 'cat': 'Hybride Modelle', 'claim': 'Saubere Belege. Pünktlicher Feierabend.', 'dom': 'klartakt-harz.de', 'base_dom': 'klartakt.de'}
]

cats = {}
all_passed = True

print(f"Total Candidates: {len(roster)}")
print("=" * 80)
for idx, item in enumerate(roster, 1):
    c = item['cat']
    cats[c] = cats.get(c, 0) + 1
    
    words = item['claim'].split()
    wcount = len(words)
    
    text_to_check = f"{item['name']} {item['variant']} {item['claim']}".lower()
    found_buzz = [b for b in buzzwords if b in text_to_check]
    
    # Check DNS for regional domain
    try:
        ip = socket.gethostbyname(item['dom'])
        dns_status = f"TAKEN ({ip})"
        dns_ok = False
    except socket.gaierror:
        dns_status = "FREE (NXDOMAIN)"
        dns_ok = True
        
    passed = (wcount <= 5) and (len(found_buzz) == 0) and dns_ok
    if not passed:
        all_passed = False
        
    print(f"[{idx:02d}] {item['name']:14} | Cat: {item['cat']:24} | Words: {wcount} | Buzzwords: {found_buzz} | DNS: {dns_status} | OK: {passed}")

print("=" * 80)
print("Category Distribution:")
for k, v in cats.items():
    print(f"  - {k}: {v}")

expected_cats = {
    'Handwerk / Pragmatismus': 3,
    'Nutzen / Ergebnis': 3,
    'Kunstwort / Abstraktion': 2,
    'Hybride Modelle': 2
}
cat_match = (cats == expected_cats)
print(f"Category Distribution exact match (3/3/2/2): {cat_match}")
print(f"Overall Validation Result: {'PASSED (100%)' if (all_passed and cat_match) else 'FAILED'}")

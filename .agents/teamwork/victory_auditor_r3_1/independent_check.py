import re

names_r1 = ['Prozesswerk', 'Büroschmiede', 'Flusswerk', 'Klarzeit', 'Ruhetakt', 'Freitakt', 'Klaros', 'Struktus', 'Taktwerk', 'Ruhewerk']
names_r2 = ['Klarstand', 'Freikopf', 'Bürofrieden', 'Bürologik', 'Kernprozess', 'Praxos', 'Ordonis', 'Valido', 'Hebelpunkt', 'Gleichlauf']
r3_names = ['Klarbund', 'Ruhebund', 'Zeitgriff', 'Kraftschluss', 'Masshalt', 'Klaranker', 'Ordalis', 'Logitakt', 'Bürogriff', 'Festtakt']
r3_claims = [
    'Klare Belege. Pünktlicher Feierabend.',
    'Geordnete Belege. Echter Feierabend.',
    'Bürozeit im festen Griff.',
    'Abläufe nahtlos ineinander greifend.',
    'Präzise Prozesse. Sichere Finanzen.',
    'Fester Halt im Büroalltag.',
    'Klare Ordnung für Meisterbetriebe.',
    'Logische Abläufe. Fester Takt.',
    'Ihr Büro fest im Griff.',
    'Fester Takt für Ihr Büro.'
]

forbidden_templates = ['werk', 'schmiede', 'lotse', 'bank']
forbidden_buzzwords = ['solutions', 'tech', 'digital', 'cloud', 'ai', 'synergy', 'excellence', 'hub', 'smart']

# Check 1: 10 names
assert len(r3_names) == 10, 'Must have 10 names'
print('Check 0 (Count): Exactly 10 names')

# Check 2: overlap with R1 / R2
for n in r3_names:
    assert n.lower() not in [x.lower() for x in names_r1 + names_r2], f'Overlap detected: {n}'
print('Check 1 (Overlap): 0% overlap with R1 & R2')

# Check 3: forbidden templates in names and claims
for n, c in zip(r3_names, r3_claims):
    text = f'{n} {c}'.lower()
    for t in forbidden_templates:
        assert t not in text, f'Forbidden template {t} found in {text}'
print('Check 2 (Templates): Zero forbidden templates in names/claims')

# Check 4: forbidden buzzwords in names and claims
for n, c in zip(r3_names, r3_claims):
    text = f'{n} {c}'.lower()
    for b in forbidden_buzzwords:
        assert not re.search(r'\b' + re.escape(b) + r'\b', text), f'Forbidden buzzword {b} found in {text}'
print('Check 3 (Buzzwords): Zero forbidden buzzwords in names/claims')

# Check 5: Claim word counts
for n, c in zip(r3_names, r3_claims):
    words = c.strip().split()
    assert len(words) <= 5, f'Claim for {n} has {len(words)} words: {c}'
    print(f'  {n}: "{c}" -> {len(words)} words (<= 5)')
print('Check 4 (Word counts): All claims <= 5 words')
print('\nALL INDEPENDENT FORENSIC CHECKS PASSED!')

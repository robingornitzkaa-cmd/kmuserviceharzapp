# Scope: Round 3 Brand Naming & 360° Validation Suite

## Architecture
- **Knowledge & Methodology Hub**: `DOCS/KI_Naming_Methoden_und_Workflows.md` (10 AI naming techniques with ready-to-use prompt templates, comparative evaluation matrix, transformer root-cause analysis, and BPE tokenizer boundary infoboxes).
- **Brand Strategy & 360° Validation**: `DOCS/Markennamen_Strategie_Runde3_Final.md` (10 template-free, overregionally scalable brand names for KMU Service Harz Inh. Robin Gornitzka, across 4 strategic directions, with 4-tier validation, including Candidate 8 Logitakt and filing safeguards).
- **Empirical Validation Harness**: `run_collision_tests_r3.py` & `empirical_adversarial_suite.py` (DIN 31634 Kölner Phonetik with canonical test vectors, Levenshtein, Jaro-Winkler, multi-record DNS checks, and collision detection against 40+ competitors).
- **User Rules & Living Documentation**: `README.md`, `CHANGELOG.md` (`[Unreleased]`), `TODO.md`.

## Feature Inventory
| # | Feature | Description | Milestone | Source | Status |
|---|---------|-------------|-----------|--------|--------|
| 1 | R1: KI-Naming-Methoden-Enzyklopädie | 10 eigenständige Techniken mit sofort einsetzbaren, laientauglichen Prompt-Templates in `DOCS/KI_Naming_Methoden_und_Workflows.md` | M1 | ORIGINAL_REQUEST §R1 | DONE |
| 2 | R2: Bewertungsmatrix & Fehlerursachen-Analyse | Vergleichende Matrix aller 10 Techniken + mathematische/algorithmische Transformer-Analyse (Next-Token, Attention Sinks, RLHF, Prompt-Hebel, BPE-Infoboxen) | M1 | ORIGINAL_REQUEST §R2 | DONE |
| 3 | R3: Neue Top-10-Namensstrategie | 10 komplett neue Namen über 4 Stoßrichtungen (Klarbund, Ruhebund, Zeitgriff, Kraftschluss, Masshalt, Klaranker, Ordalis, Logitakt, Bürogriff, Festtakt), modularer Harz-Zusatz, Claims <= 5 Wörter, Inh. Robin Gornitzka in `DOCS/Markennamen_Strategie_Runde3_Final.md` | M2 | ORIGINAL_REQUEST §R3 | DONE |
| 4 | R4.1: Tier 1 Psychologische Resonanz | Meister-Test (SHK, Elektro, Bau), partnerschaftliche Augenhöhe, Feierabend-Entlastung, Einzelunternehmen-Vertrauenssignale | M2 | ORIGINAL_REQUEST §R4 | DONE |
| 5 | R4.2: Tier 2 Baustellen- & Telefontauglichkeit | Akustik >75 dB, Trochäus-Metrik, Meldeformel, DIN 5009 Buchstabierbarkeit, korrigierte Kölner Phonetik DIN 31634 | M2 | ORIGINAL_REQUEST §R4 | DONE |
| 6 | R4.3: Tier 3 Domain-Vorprüfung (.de) | Multi-Record DNS-Prüfung (A/AAAA, NS, SOA) für primäre `.de`-Domains auf freie Registrierbarkeit (10/10 regional & 10/10 Basis-Domains frei) | M2 | ORIGINAL_REQUEST §R4 | DONE |
| 7 | R4.4: Tier 4 Markenrechtliche Erstprüfung | Kollisions- und Ähnlichkeitsprüfung Nizza-Klassen 35 und 42, BGH/EuGH Verwechslungsgefahr gegen 40+ Wettbewerber, inklusive § 8 MarkenG Schutzhinweise | M2 | ORIGINAL_REQUEST §R4 | DONE |
| 8 | R4.5: Empirischer Test-Harness | Ausführung und Verifikation via `run_collision_tests_r3.py` (DIN 31634, DNS, Distanzmetriken) mit dokumentierten Belegen (Exit-Code 0) | M2 | ORIGINAL_REQUEST §Verification | DONE |
| 9 | Negative Constraints & Blacklists | Strikter Ausschluss der 20 R1/R2-Namen, der 4 Schablonen (`Werk`, `Schmiede`, `Lotse`, `Bank`) und der 9 IT-Buzzwords (100% eingehalten) | M1/M2 | Survey / ORIGINAL_REQUEST | DONE |
| 10 | R5: Doku- & Mentoring-Sync | Aktualisierung von `README.md`, `CHANGELOG.md` (`[Unreleased]`), `TODO.md` gemäß Geduldiger Mentor Regeln (kein git push, lokaler Commit ea67f31) | M3 | User Rules | DONE |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | KI-Naming-Methoden & Prompt-Leitfaden | Erstellung von `DOCS/KI_Naming_Methoden_und_Workflows.md` (Features 1, 2, 9) | none | DONE |
| M2 | Top-10 Namensstrategie & 360°-Validierungs-Suite | Erstellung von `DOCS/Markennamen_Strategie_Runde3_Final.md` und `run_collision_tests_r3.py` (Features 3, 4, 5, 6, 7, 8, 9) | M1 | DONE |
| M3 | Doku-Sync & Mentor-Abschluss | Aktualisierung von `README.md`, `CHANGELOG.md`, `TODO.md` (Feature 10) | M1, M2 | DONE |

## Interface Contracts & Constraints
- **Claim Word Count**: Exactly <= 5 words per claim (Verified: 4–5 words).
- **Negative Word Blacklist**: 0 occurrences of `solutions`, `tech`, `digital`, `cloud`, `ai`, `synergy`, `excellence`, `hub`, `smart`.
- **Template Metaphor Blacklist**: 0 occurrences of `werk`, `schmiede`, `lotse`, `bank`.
- **Prior Round Exclusion**: 0 repetition of any of the 20 names from R1 or R2.
- **Legal Form & Signature**: Einzelunternehmen; official signature: `[Marke] – Inh. Robin Gornitzka`.

# BRIEFING — 2026-10-22T18:51:30Z

## Mission
Extract and catalog all authoritative requirements, constraints, negative lists, business parameters, and deliverable specifications for Round 3 brand naming and methodology generation.

## 🔒 My Identity
- Archetype: Specification Miner
- Roles: Specification Miner, Teamwork specialist
- Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\spec_miner_r3_survey_1
- Original parent: ee690563-0b97-41f2-a55a-fa7ca3812aa0
- Milestone: Round 3 Specification Mining & Constraints Extraction

## 🔒 Key Constraints
- Read-only on project implementation; do not implement or make unrequested code changes.
- Never write source code or tests into `.agents/teamwork/`.
- Never execute git push or git push --force.
- Extract comprehensive, authoritative data from ORIGINAL_REQUEST.md, Round 1 & Round 2 docs, Businessplan, and Wettbewerbsanalyse.
- Do NOT skip any feature or constraint, no matter how obscure.
- Prioritize authoritative sources over LLM prior knowledge.

## Current Parent
- Conversation ID: ee690563-0b97-41f2-a55a-fa7ca3812aa0
- Updated: 2026-10-22T18:51:30Z

## Task Summary
- **What to build**: Comprehensive specification survey (`handoff.md`) covering:
  1. Forbidden names from Round 1 and Round 2 (20 names total + rejected candidates)
  2. Forbidden metaphors (Werk, Schmiede, Lotse, Bank) and IT buzzwords (Solutions, Tech, Digital, Cloud, AI, Synergy, Excellence, Hub, Smart)
  3. Core business model parameters (Inh. Robin Gornitzka, Einzelunternehmen, Langelsheim/Harz, No-Code/DATEV/Lexoffice/E-Rechnung, Festpreise)
  4. Full inventory of required deliverables (R1, R2, R3, R4)
  5. Quality & format requirements for target documents `DOCS/KI_Naming_Methoden_und_Workflows.md` and `DOCS/Markennamen_Strategie_Runde3_Final.md`.
- **Success criteria**: Completed handoff report with exact tables (Features Discovered, Edge Cases), verbatim citations, logic chain, caveats, and verification method.
- **Interface contracts**: `ORIGINAL_REQUEST.md`
- **Code layout**: Output in `.agents/teamwork/spec_miner_r3_survey_1/handoff.md`

## Key Decisions Made
- Fully cross-referenced all 3 iterations in `ORIGINAL_REQUEST.md`, `DOCS/Markennamen_Strategie_Top10.md`, `DOCS/Markennamen_Strategie_Schablonenfrei_Top10.md`, `DOCS/Businessplan_KMU_Service_Harz_2026_Final.md`, `DOCS/Wettbewerbsanalyse KMU Service Harz.md`, and `run_collision_tests_iter2.py`.
- Cataloged full negative lists (20 finalists, 4 template metaphors, 9 IT buzzwords, childish/arrogant jargon).
- Mapped 4 deliverables (R1, R2, R3, R4) to their exact target files and quality standards.

## Artifact Index
- `DISPATCH.md` — Incoming dispatch prompt and instructions
- `progress.md` — Liveness heartbeat and step tracker
- `handoff.md` — Final deliverable report with 5 components, Features Discovered, and Edge Cases tables

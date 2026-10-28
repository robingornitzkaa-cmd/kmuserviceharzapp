# BRIEFING — 2026-10-28T09:02:30Z

## Mission
Analyze, discover, and specify in granular detail the technical specifications for R1 (Vapi Voice AI prompt & RFC schema), R2 (WhatsApp 360dialog template & media webhook spec), and R3 (Supabase PostgreSQL schema, RLS policies, Storage bucket) for HarzBlitz Notdienst & Gebäudetechnik GmbH.

## 🔒 My Identity
- Archetype: specification_miner
- Roles: domain_expert, spec_miner
- Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\spec_miner_harzblitz_1
- Original parent: 92cab53a-b35a-4af7-a2f1-a90f14e82b2f
- Milestone: M1 / M2 Specification Discovery (R1, R2, R3)

## 🔒 Key Constraints
- Do NOT implement production code in target directories (read-only / spec discovery role).
- Write all findings into `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\spec_miner_harzblitz_1\handoff.md`.
- Group findings into standard Features Discovered & Edge Cases tables.
- Cover all specifications for R1 (Vapi), R2 (WhatsApp 360dialog), R3 (Supabase DDL/RLS/Storage).
- Strict adhere to user rules: no changes to Battlefield TimeGuard, no unrequested packages, patient mentor mindset.

## Current Parent
- Conversation ID: 92cab53a-b35a-4af7-a2f1-a90f14e82b2f
- Updated: 2026-10-28T09:02:30Z

## Task Summary
- **What to build**: Full technical specification for Vapi Voice Agent "Anna von HarzBlitz", WhatsApp 360dialog integration, and Supabase Database/Storage schema.
- **Success criteria**: Exhaustive interface contracts, RFC-compliant JSON schema, official WhatsApp template definition, and complete PostgreSQL DDL with RLS.
- **Interface contracts**: `.agents/teamwork/orchestrator_harzblitz_1/plan.md`
- **Code layout**: Target `harzblitz_automation/` layout specified in plan.md

## Key Decisions Made
- Fully specified R1: Voice prompt for Anna (05321-778890), de-escalation protocol, safety first-aid instructions, non-binding price safeguard, and RFC JSON schema for `dispatch_harzblitz_job`.
- Fully specified R2: WhatsApp Business template (`harzblitz_notdienst_foto_anforderung`, category `UTILITY`), 5s post-call delay, inbound media webhook payload & retrieval pipeline.
- Fully specified R3: PostgreSQL DDL for `harzblitz_orders` with CHECK constraints, updated_at trigger, B-Tree indices, RLS policies for `service_role` and `authenticated`, plus Supabase Storage Bucket `harzblitz-damage-photos` with 25MB limit.

## Artifact Index
- `DISPATCH.md` — Orchestrator instructions and task boundaries
- `progress.md` — Execution status and heartbeat (Completed)
- `handoff.md` — Final comprehensive specification mining report (Complete)

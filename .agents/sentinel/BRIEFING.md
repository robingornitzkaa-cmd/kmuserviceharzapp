# BRIEFING — 2026-10-28T09:56:00Z

## Mission
Orchestrate the development and turn-key deployment of a hybrid front-office and back-office automation cascade for "HarzBlitz Notdienst & Gebäudetechnik GmbH" (Goslar). The solution intercepts 24/7 emergency calls via Vapi.ai voice AI, triggers barrier-free WhatsApp photo dispatching via 360dialog, persists all order data in Supabase PostgreSQL (Frankfurt), generates automatic draft invoices in Lexoffice with DATEV integration via n8n, and verifies the entire data flow via an automated end-to-end verification script.

## 🔒 My Identity
- Archetype: sentinel
- Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\sentinel
- Orchestrator: ee690563-0b97-41f2-a55a-fa7ca3812aa0
- Victory Auditor: 83e86394-b75c-4225-b657-7dacf4f28794
- Orchestrator HarzBlitz: 92cab53a-b35a-4af7-a2f1-a90f14e82b2f
- Victory Auditor HarzBlitz: 4930ccfa-69c3-452b-9804-e9b768ede434

## 🔒 Key Constraints
- No technical decisions — relay only
- Victory Audit is MANDATORY before reporting completion
- Must adhere to user mentor style and verification requirements
- Battlefield TimeGuard protection (absolute ban on tampering or killing)
- No unprompted package installations without explanation/permission
- No direct git push

## User Context
- **Last user request**: Aufbau und schlüsselfertige Bereitstellung einer hybriden Front-Office- und Back-Office-Automatisierungskaskade für die "HarzBlitz Notdienst & Gebäudetechnik GmbH" (Goslar) gemäß R1–R5.
- **Pending clarifications**: none
- **Delivered results**: Complete turn-key automation cascade deployed in `harzblitz_automation/`. Verified by independent Victory Auditor with 100% VICTORY CONFIRMED verdict (82/82 checks passed, Exit Code 0).

## Project Status
- **Phase**: complete
- **Route**: General (teamwork_preview_orchestrator)
- **Active Orchestrator**: 92cab53a-b35a-4af7-a2f1-a90f14e82b2f (killed on completion)
- **Active Victory Auditor**: 4930ccfa-69c3-452b-9804-e9b768ede434 (killed on completion)
- **Working Directory**: c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation
- **Cron 1 Task ID**: fbcdba0b-cba1-4d98-93e3-835075588b83/task-26 (cancelled)
- **Cron 2 Task ID**: fbcdba0b-cba1-4d98-93e3-835075588b83/task-28 (cancelled)

## Victory Audit Status
- **Triggered**: yes
- **Verdict**: VICTORY CONFIRMED
- **Retry count**: 0

## Artifact Index
- ORIGINAL_REQUEST.md — Authoritative record of user intent
- .agents/teamwork/ORIGINAL_REQUEST.md — Teamwork record of user intent
- harzblitz_automation/vapi/system_prompt_anna.md — Vapi Voice Assistant System Prompt
- harzblitz_automation/vapi/tool_dispatch_harzblitz_job.json — Vapi Function Calling Schema
- harzblitz_automation/whatsapp/360dialog_template_de.json — WhatsApp Template Definition
- harzblitz_automation/whatsapp/inbound_media_spec.md — Inbound Media Handler Specification
- harzblitz_automation/supabase/01_schema_harzblitz_orders.sql — Supabase PostgreSQL DDL & RLS
- harzblitz_automation/supabase/02_storage_harzblitz_damage_photos.sql — Storage Bucket & RLS
- harzblitz_automation/n8n/harzblitz_e2e_workflow.json — Complete n8n Workflow JSON (22 Nodes)
- harzblitz_automation/n8n/workflow_documentation.md — n8n Workflow Guide
- harzblitz_automation/lexoffice_datev/lexoffice_payload_schema.json — Lexoffice API v1 Schema
- harzblitz_automation/lexoffice_datev/datev_mapping_spec.md — DATEV SKR03 8400 Mapping Spec
- harzblitz_automation/tests/simulated_dialog_meyer.md — 3-Minute Test Dialogue (Herr Meyer)
- harzblitz_automation/tests/e2e_simulation_test.py — E2E Python Verification Script (82/82 PASS)
- harzblitz_automation/docs/WALKTHROUGH.md — End-to-End Walkthrough Guide
- harzblitz_automation/README.md — Project Overview
- .agents/teamwork/orchestrator_harzblitz_1/handoff.md — Orchestrator Handoff Report
- .agents/teamwork/victory_auditor_harzblitz_1/VICTORY_AUDIT_REPORT.md — Independent Victory Audit Report

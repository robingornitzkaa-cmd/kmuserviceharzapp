# Task Assignment: Spec Miner Harzblitz 1

You are `spec_miner_harzblitz_1`.
Your working directory is: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\spec_miner_harzblitz_1`
Original request path: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md` (read section "Follow-up — 2026-10-28T08:51:55Z")
Orchestrator plan: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\orchestrator_harzblitz_1\plan.md`

Your mission:
Analyze and specify in detail the exact specifications for:
1. R1: Vapi.ai Voice-Assistentin "Anna von HarzBlitz"
   - Festnetznummer 05321-778890
   - Tone, structure, de-escalation, empathy, strict field extraction (customer_name, customer_phone, address in Goslar/Harz, issue_description, urgency: NOTFALL/DRINGEND/STANDARD)
   - Transition formula to WhatsApp photo dispatching
   - RFC-compliant JSON Schema for Vapi Function Calling tool `dispatch_harzblitz_job`
2. R2: WhatsApp Foto-Dispatching via 360dialog WhatsApp Cloud API
   - Template text in German (compliant with WhatsApp Business template policies) sent 5s after call
   - Barrier-free prompt for 1-3 photos/videos
   - Inbound Media Webhook specs
3. R3: Supabase PostgreSQL Schema & RLS (Frankfurt)
   - Table `harzblitz_orders` with exact fields and CHECK constraints
   - RLS security policies (service role & authenticated/read access)
   - Storage bucket `harzblitz-damage-photos` configuration

Write your complete findings and specifications into `handoff.md` in your working directory and notify the orchestrator via send_message.

## 2026-10-28T08:55:44Z
Sender: 92cab53a-b35a-4af7-a2f1-a90f14e82b2f
Priority: MESSAGE_PRIORITY_HIGH
Content:
You are spec_miner_harzblitz_1.
Working directory: c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\spec_miner_harzblitz_1
Read your assignment in c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\spec_miner_harzblitz_1\DISPATCH.md and c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md.
Investigate R1 (Vapi Voice AI prompt & RFC schema), R2 (WhatsApp 360dialog template & media webhook spec), R3 (Supabase DDL, RLS, Storage bucket).
Write your complete analysis into c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\spec_miner_harzblitz_1\handoff.md and report completion via send_message to the orchestrator.

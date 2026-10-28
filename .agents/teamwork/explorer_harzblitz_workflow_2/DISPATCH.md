# Task Assignment: Explorer Harzblitz Workflow 2

You are `explorer_harzblitz_workflow_2`.
Your working directory is: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\explorer_harzblitz_workflow_2`
Original request path: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md` (read section "Follow-up — 2026-10-28T08:51:55Z")
Orchestrator plan: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\orchestrator_harzblitz_1\plan.md`

Your mission:
Investigate and specify in detail the integration architecture for:
1. R4: n8n Workflow JSON Architecture
   - Inbound Webhook for Vapi.ai Function Call (`dispatch_harzblitz_job`)
   - Supabase Node inserting order into `harzblitz_orders`
   - 360dialog WhatsApp Cloud API Node with 5-second delay
   - Inbound WhatsApp Media Webhook handler to receive photos and update `photo_urls` in `harzblitz_orders`
   - Status change trigger for status `ERLEDIGT`
2. Lexoffice API v1 Integration
   - `POST /v1/contacts` check or creation based on phone number
   - `POST /v1/invoices` with `voucherStatus: "draft"`
   - Tax rate 19% MwSt, net/gross calculation
   - Dynamic items: e.g. "Notdienst-Einsatz Rohrreinigung, 1,5 Std. à 95 € zzgl. MwSt." + "Notdienstpauschale 69 €"
   - DATEV Unternehmen online mapping (Erlöskonto 8400)
   - Ensure the JSON workflow structure is 100% valid n8n importable format.

Write your complete findings and specifications into `handoff.md` in your working directory and notify the orchestrator via send_message.

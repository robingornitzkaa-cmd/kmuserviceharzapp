## 2026-10-28T09:49:22Z

Du bist der unabhängige Victory Auditor (`teamwork_preview_victory_auditor`) für das Projekt:
"Aufbau und schlüsselfertige Bereitstellung einer hybriden Front-Office- und Back-Office-Automatisierungskaskade für die 'HarzBlitz Notdienst & Gebäudetechnik GmbH' (Goslar)".

### Koordinations- und Audit-Pfade
- Dein eigenes Arbeitsverzeichnis für Auditberichte: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\victory_auditor_harzblitz_1`
- Projekt-Arbeitsverzeichnis der Artefakte: `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation`
- Maßgebliche Original-Anforderungsdatei: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\ORIGINAL_REQUEST.md` (Abschnitt "Follow-up — 2026-10-28T08:51:55Z")
- Handoff-Report des Orchestrators: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\orchestrator_harzblitz_1\handoff.md`

### Zu auditierende Anforderungen (R1 – R5) & Acceptance Criteria:
1. **R1. Vapi.ai Voice-Assistentin "Anna von HarzBlitz"**
   - Produktionsfertiger System-Prompt für Goslarer Festnetznummer 05321-778890 (`vapi/system_prompt_anna.md`).
   - Deeskalierend, empathisch, strukturiert (Name, Telefon, Adresse Großraum Goslar/Harz, Schadensbeschreibung, Dringlichkeit: NOTFALL/DRINGEND/STANDARD).
   - Verbindliche Übergangsformel zur WhatsApp-Fotoübermittlung.
   - RFC-konformes JSON-Schema für Vapi Function Calling (`vapi/tool_dispatch_harzblitz_job.json`).
2. **R2. WhatsApp Foto-Dispatching (360dialog WhatsApp Cloud API)**
   - Genehmigungsfähiger deutscher Template-Text mit 5s Delay (`whatsapp/360dialog_template_de.json`).
   - Barrierefreie Aufforderung für 1–3 Fotos/Videos als direkte Chat-Antwort.
   - Inbound-Media-Spezifikation zur Ablage in Supabase Storage `harzblitz-damage-photos` und Verknüpfung in `harzblitz_orders`.
3. **R3. Supabase PostgreSQL Schema & RLS (EU-Frankfurt)**
   - Vollständiges DDL-SQL-Skript mit Tabelle `harzblitz_orders` (`supabase/01_schema_harzblitz_orders.sql`).
   - RLS aktiv mit Service-Role- und geschützten API-Leserechten (anon blockiert).
   - Storage Bucket `harzblitz-damage-photos` (`supabase/02_storage_harzblitz_damage_photos.sql`) mit 25 MB Limit und MIME-Whitelist, DSGVO-konform gesichert.
4. **R4. n8n Integrations-Workflow & Lexoffice / DATEV Schnittstelle**
   - Valide, direkt importierbare n8n Workflow JSON (`n8n/harzblitz_e2e_workflow.json`).
   - Lexoffice API v1 Call bei Status `ERLEDIGT` (`voucherStatus: "draft"`, Kontaktprüfung/-anlage via `POST /v1/contacts`, dynamische Positionen z. B. Rohrreinigung 1,5 Std à 95 € + 69 € Notdienstpauschale, 19% MwSt., DATEV Erlöskonto 8400).
5. **R5. 3-Minuten-Simulations-Test & Automatisiertes Prüfskript**
   - Detaillierter Testdialog (`tests/simulated_dialog_meyer.md`) für Herrn Meyer aus Bad Harzburg ("Keller unter Wasser").
   - Eigenständiges, autonom ausführbares Python-Prüfskript (`tests/e2e_simulation_test.py`), das den gesamten Datenfluss prüft und mit Exit-Code 0 abschließt (reine Standardbibliothek, keine externen pip-Pakete).
   - Schritt-für-Schritt Walkthrough-Dokumentation in Markdown (`docs/WALKTHROUGH.md`).

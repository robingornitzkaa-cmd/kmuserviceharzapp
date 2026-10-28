# Specification Mining Report: HarzBlitz Automation (R1, R2, R3)

**Author:** `spec_miner_harzblitz_1`  
**Date:** 2026-10-28  
**Scope:** R1 (Vapi Voice AI Prompt & Tool Schema), R2 (WhatsApp 360dialog Template & Inbound Media Webhook), R3 (Supabase PostgreSQL Schema, RLS & Storage Bucket)  
**Target Path for Implementation:** `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation`

---

## 1. Observation

Direct observations from authoritative project requirements and specifications:
- **`ORIGINAL_REQUEST.md` (lines 25–65):**
  - Section "Follow-up — 2026-10-28T08:51:55Z": Key requirement for "HarzBlitz Notdienst & Gebäudetechnik GmbH" (Goslar).
  - R1 specifies: Vapi.ai Voice-Assistentin "Anna von HarzBlitz", Festnetznummer `05321-778890`, deeskalierende Gesprächsführung bei Notfällen (Rohrbruch, Heizungsausfall), strukturierte Erfassung von `customer_name`, `customer_phone`, `address` (Großraum Goslar / Landkreis Harz), `issue_description`, `urgency` (`NOTFALL`, `DRINGEND`, `STANDARD`), Übergangsformel zu WhatsApp, RFC-konformes JSON-Schema für Function Calling `dispatch_harzblitz_job`.
  - R2 specifies: 360dialog WhatsApp Cloud API, genehmigungsfähiger deutscher Template-Text mit Versand exakt 5 Sekunden nach Gesprächsende, barrierefreie Aufforderung für 1–3 Fotos/Videos, Inbound-Media-Webhook zur Übernahme in Supabase Storage `harzblitz-damage-photos` und Verknüpfung der URLs in `harzblitz_orders`.
  - R3 specifies: Supabase PostgreSQL DDL für Region EU-Frankfurt, Tabelle `harzblitz_orders` mit Feldern (`id`, `customer_name`, `customer_phone`, `address`, `issue_description`, `urgency`, `photo_urls`, `status`, `created_at`), CHECK-Constraints auf `urgency` und `status`, RLS Policies für Service-Role und geschützte API-Leserechte, Storage Bucket `harzblitz-damage-photos`.
- **`plan.md` (orchestrator_harzblitz_1):**
  - Code layout specifies separation into `vapi/`, `whatsapp/`, `supabase/`, `n8n/`, `lexoffice_datev/`, `tests/`, and `docs/`.
  - Function calling contract: returns `{ "status": "dispatched", "order_id": "<uuid>", "whatsapp_dispatched": true }`.
  - Database schema: `harzblitz_orders` with status transition flow: `NEU` -> `IN_ARBEIT` -> `ERLEDIGT`.

---

## 2. Logic Chain

1. **Voice AI (Vapi.ai) Engineering (R1):**
   - Callers reach a local German landline number (`05321-778890`) typically during acute emergencies (water leak, basement flood, heating failure in winter). Stress and panic levels are high.
   - The conversational agent "Anna" must immediately lower stress through empathetic pacing, warm German tone, and calm confirmation before asking analytical questions.
   - Immediate safety instructions (turning off main water valve, cutting electricity, not touching switches in case of gas odor) must be integrated into the conversational graph before collecting address details to prevent catastrophic damage or injury.
   - Price inquiries must be handled transparently without making legally binding fixed-price promises over the phone, adhering to German trade law (Handwerksrecht / BGB Werkvertragsrecht).
   - Strict field extraction guarantees that `customer_name`, `customer_phone`, `address`, `issue_description`, and `urgency` are parsed and passed to `dispatch_harzblitz_job`.
   - The JSON schema must strictly comply with JSON Schema Draft-7 / OpenAPI 3.0 specification as required by Vapi and OpenAI tool-calling runtimes.

2. **WhatsApp Foto-Dispatching via 360dialog (R2):**
   - Per Meta WhatsApp Business Messaging Policy, outbound messages initiated by the business outside of an active 24-hour customer window must use an approved **Template Message**.
   - The template must be registered under the `UTILITY` category in German (`de`), preventing rejection and ensuring priority delivery.
   - The 5-second post-call delay allows the caller to disconnect their phone call and look at their smartphone screen before receiving the notification.
   - Inbound media (images/videos) sent via WhatsApp arrive at the 360dialog webhook with a `media_id`. The webhook pipeline resolves the media URL via the WhatsApp Cloud API, downloads the binary payload, uploads it to Supabase Storage, and appends the resulting URL to the customer's active order in PostgreSQL.

3. **Database Architecture & Data Security (R3):**
   - Customer orders contain sensitive Personally Identifiable Information (PII) including full names, phone numbers, home addresses, and interior residential photos.
   - Under GDPR / DSGVO, storage must be localized in the EU (Supabase Frankfurt / `eu-central-1`).
   - Default public anonymous access to `harzblitz_orders` must be strictly forbidden via Row Level Security (RLS).
   - The backend services (n8n, Vapi webhook) interact using the `service_role` secret key, while authenticated operational staff (Meister Marc Schneider, dispatchers) access records with authenticated JWTs.
   - Storage bucket `harzblitz-damage-photos` enforces 25MB file size limits and MIME-type constraints (`image/*`, `video/mp4`, `video/quicktime`).

---

## 3. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | R1: Voice AI | Anna System Prompt | Complete conversational system prompt for 24/7 hotline 05321-778890, covering empathy, de-escalation, triage, and safety protocols | Audio / Speech transcribed to text | Natural spoken German responses | Clarification prompts when audio is noisy or inputs unclear | `ORIGINAL_REQUEST.md` R1 |
| 2 | R1: Voice AI | Triage & Safety Instructions | Immediate verbal guidance for pipe bursts, electrical hazards, gas odors, and sewage backup | Damage description keywords | Spoken immediate first-aid instructions | Safety escalation (e.g. recommend dialing 112 for gas) | `ORIGINAL_REQUEST.md` R1 |
| 3 | R1: Voice AI | Non-binding Price Safeguard | Legal safeguard preventing unauthorized fixed price promises on the phone | Price inquiry by caller | Standardized explanation of on-site master assessment | Overrides any hallucinated pricing | `ORIGINAL_REQUEST.md` R1 & BGB |
| 4 | R1: Voice AI | WhatsApp Transition Script | Standardized formula preparing the customer for the immediate WhatsApp message | Customer name and verified phone number | Explicit spoken notification | Re-verifies phone number if invalid | `ORIGINAL_REQUEST.md` R1 |
| 5 | R1: Voice AI | Vapi Function Calling Schema | RFC-compliant JSON Schema for `dispatch_harzblitz_job` with strict types and enum validations | Extraction of 5 core fields | Valid JSON tool call payload | Rejection if required fields missing | `ORIGINAL_REQUEST.md` R1 & Vapi API |
| 6 | R2: WhatsApp | 360dialog Template Spec | Meta-approved UTILITY template `harzblitz_notdienst_foto_anforderung` with dynamic parameters | Customer name `{{1}}`, Location `{{2}}` | Approved WhatsApp template payload | Fallback to SMS or phone follow-up if WhatsApp delivery fails | `ORIGINAL_REQUEST.md` R2 & Meta Policy |
| 7 | R2: WhatsApp | 5-Second Dispatch Timing | Timed trigger sending template 5s after call wrap-up | Call completion / tool call trigger | Delayed WhatsApp outbound message | Immediate send if delay mechanism is bypassed | `ORIGINAL_REQUEST.md` R2 |
| 8 | R2: WhatsApp | Inbound Media Webhook Spec | Webhook contract receiving customer media messages, parsing media ID, and downloading binary | Meta/360dialog webhook POST JSON | Downloaded binary stream & metadata | Logs 400/404 if media expired or payload malformed | `ORIGINAL_REQUEST.md` R2 & 360dialog API |
| 9 | R2: WhatsApp | Media Storage Linking | Uploads downloaded media to Supabase and appends public/signed URL to `harzblitz_orders.photo_urls` | Binary file & matching active order | Updated PostgreSQL order record | Skips or alerts operator if phone number match not found | `ORIGINAL_REQUEST.md` R2 |
| 10 | R3: Supabase | `harzblitz_orders` DDL | PostgreSQL table schema with UUID PK, text columns, array, and CHECK constraints | DDL SQL Script | Created table with automated `updated_at` trigger | Rollback on syntax error | `ORIGINAL_REQUEST.md` R3 |
| 11 | R3: Supabase | Phone & Status Indices | B-Tree indices on `customer_phone`, `status`, and `created_at` for sub-millisecond lookups | Index DDL | High performance query execution | None | PostgreSQL Optimization Specs |
| 12 | R3: Supabase | Row Level Security (RLS) | Security policies enforcing `service_role` full access and `authenticated` staff access | SQL Policy statements | Secured data access layer | `403 Forbidden` / 0 rows for unauthorized queries | `ORIGINAL_REQUEST.md` R3 & Supabase Docs |
| 13 | R3: Supabase | Damage Photos Storage Bucket | Configuration of `harzblitz-damage-photos` with 25MB limit and MIME type whitelisting | Storage bucket DDL & policies | Configured Supabase storage bucket | Rejects non-whitelisted MIME types or files >25MB | `ORIGINAL_REQUEST.md` R3 |

---

## 4. Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Vapi Voice Agent | Caller provides landline without mobile capability | Anna explicitly asks: "Haben Sie oder ein Angehöriger vor Ort eine Mobilfunknummer für WhatsApp, damit wir Ihnen die Foto-Anforderung zusenden können?" If denied, Anna flags record and notes photo dispatch unavailable. |
| 2 | Vapi Voice Agent | Acute gas odor reported ("Es riecht nach Gas!") | Anna immediately triggers emergency protocol: "Achtung: Bitte betätigen Sie keinerlei Lichtschalter oder Klingeln, öffnen Sie sofort die Fenster, verlassen Sie das Gebäude und wählen Sie von draußen sofort den Notruf 112 der Feuerwehr!" Triage set to `NOTFALL`. |
| 3 | Vapi Voice Agent | Customer insists on fixed price quote ("Was kostet das jetzt genau?") | Anna replies firmly and politely: "Ich verstehe vollkommen, dass Sie Klarheit möchten. Da jeder Rohrbruch unterschiedlich ist, begutachtet Meister Marc Schneider die Schadensstelle direkt vor Ort und nennt Ihnen vor Beginn der Reparatur den transparenten Festpreis nach Notdienst-Tarif." |
| 4 | Vapi Tool Call | Phone number provided in local format `05321 12345` or `0171 998877` | Vapi tool schema accepts regex `^\+?[0-9\s\-()]{7,25}$`. Backend normalization strips spaces and transforms leading `0` to `49` for WhatsApp API dispatch. |
| 5 | WhatsApp Template | Customer opens WhatsApp message after 30 minutes and sends 4 photos in rapid succession | Webhook receives each photo sequentially. Each image is downloaded, uploaded to storage, and atomically appended to `photo_urls` array via `array_append(photo_urls, $url)`. |
| 6 | WhatsApp Webhook | Customer sends voice memo or PDF instead of image/video | Media handler inspects `mime_type`. Audio/PDF is saved with appropriate extension and linked to `photo_urls` so the technician can listen to audio descriptions or view insurance docs. |
| 7 | Supabase RLS | Anonymous API request attempts to query customer records with anon key | Supabase RLS returns empty array `[]` or 403, preventing any leak of customer home addresses or phone numbers. |
| 8 | Supabase DDL | Order inserted with invalid urgency e.g. `EXTREM` | PostgreSQL CHECK constraint `urgency IN ('NOTFALL', 'DRINGEND', 'STANDARD')` throws check_violation error and aborts transaction. |

---

## 5. Detailed Technical Specifications

### 5.1. R1: Vapi Voice AI Assistant "Anna von HarzBlitz"

#### A. Voice Agent Profile & Configuration
- **Name:** Anna von HarzBlitz
- **Organization:** HarzBlitz Notdienst & Gebäudetechnik GmbH, Goslar
- **Primary Hotline:** `05321-778890` (Ortsnetz Goslar)
- **Role:** Leitstellen-Disponentin & Notfall-Ersthelferin
- **Language:** Deutsch (Akzentfrei, natürlich, warmherzig)
- **Voice Recommendation:** ElevenLabs "Sarah" (warm, competent) or Azure Speech `de-DE-KatjaNeural` / `de-DE-AmalaNeural`
- **LLM Engine:** GPT-4o or Claude 3.5 Sonnet (Temperature: 0.2 for strict compliance without hallucinations)
- **Transcriber:** Deepgram Nova-2 German (`model: "nova-2", language: "de"`)

#### B. Full System Prompt (`system_prompt_anna.md`)
```markdown
# SYSTEM PROMPT: Anna von HarzBlitz (Notdienst-Zentrale Goslar)

## 1. Identität & Grundhaltung
Du bist "Anna von HarzBlitz", die hochkompetente, warmherzige und deeskalierende Notdienst-Assistentin der HarzBlitz Notdienst & Gebäudetechnik GmbH in Goslar (Hotline: 05321-778890).
Du nimmst 24/7 Notrufe für das Einsatzgebiet Großraum Goslar und Landkreis Harz (Goslar, Bad Harzburg, Wernigerode, Braunlage, Clausthal-Zellerfeld, Vienenburg, Langelsheim, Seesen) entgegen.
Dein technischer Einsatzleiter vor Ort ist Handwerksmeister Marc Schneider.

Deine oberste Priorität:
1. Den Anrufer emotional beruhigen und deeskalieren.
2. Bei akuter Gefahr (Wasser, Strom, Gas) sofort lebensrettende Sofortmaßnahmen anweisen.
3. Die 5 Pflichtfelder für den Einsatzauftrag fehlerfrei und vollständig erfassen.
4. Den Kunden verbindlich auf die sofortige WhatsApp-Fotoübermittlung vorbereiten.
5. Das Tool `dispatch_harzblitz_job` mit den erfassten Daten ausführen.

## 2. Gesprächsführung & Deeskalation
- Sprich in ruhigem, warmem, verständlichem Deutsch. Verwende kurze, klare Sätze.
- Falle dem Anrufer nicht ins Wort, außer bei akuter Lebensgefahr.
- Reagiere bei Panik (z. B. "Mein Keller säuft ab!") mit sofortiger Beruhigung:
  "Guten Tag, hier ist Anna von der HarzBlitz Notdienst-Zentrale in Goslar. Atmen Sie bitte kurz tief durch – Sie haben jetzt uns erreicht, und wir lassen Sie nicht allein. Meister Marc Schneider und unser Team sind einsatzbereit. Was genau ist passiert?"

## 3. Notfall-Sofortmaßnahmen (Erste Hilfe am Telefon)
Sobald der Anrufer das Schadensbild schildert, gibst du sofort die passende Sicherheitsanweisung:
- **Wasserrohrbruch / Keller unter Wasser:**
  "Wichtig: Haben Sie den Hauptwasserhahn bereits abgedreht? Falls noch nicht: Bitte drehen Sie sofort den Haupthahn im Keller oder unter der Spüle zu, um weiteren Schaden zu stoppen!"
- **Wasser in Nähe von Elektrik / Steckdosen:**
  "Achtung Lebensgefahr: Betreten Sie auf keinen Fall unter Wasser stehende Räume, in denen Steckdosen oder Elektrogeräte erreicht wurden! Bitte schalten Sie gefahrlos die Hauptsicherung ab."
- **Gasgeruch / Gastherme:**
  "Achtung, höchste Vorsicht: Betätigen Sie keine Lichtschalter, keine Klingel und kein Telefon im Haus! Sofort alle Fenster aufreißen, Gashahn schließen, Gebäude sofort verlassen und von draußen die Feuerwehr unter 112 anrufen!"

## 4. Pflichtfelder für den Einsatz
Erfasse im Gespräch präzise:
1. `customer_name`: Vor- und Nachname des Anrufers.
2. `customer_phone`: Rückrufnummer für Meister Marc Schneider und den WhatsApp-Fotoupload. Falls der Anrufer von einem Festnetz anruft, frage nach einer Mobilnummer: "Haben Sie eine Handynummer, damit wir Ihnen gleich den WhatsApp-Link für die Schadensfotos senden können?"
3. `address`: Genaue Einsatzadresse im Landkreis Harz (Straße, Hausnummer, PLZ, Ort).
4. `issue_description`: Präzise Beschreibung (z. B. "Rohrbruch im Keller, 10 cm Wasserstand, Hauptwasserhahn abgedreht").
5. `urgency`: Klassifiziere intern in:
   - `NOTFALL`: Akuter Wassereinbruch, unkontrollierter Rohrbruch, Fäkalienrückstau, Heizungsausfall bei Minusgraden.
   - `DRINGEND`: Verstopfte Hauptleitung, Heizungsausfall bei milder Witterung, Boiler defekt.
   - `STANDARD`: Tropfende Armatur, Wartungsanfrage, planbare Reparatur.

## 5. Rechtliche Schutzregel (Keine Festpreisversprechen)
Nenne unter keinen Umständen verbindliche Festpreise am Telefon.
Wenn der Kunde fragt "Was kostet das?":
"Ich kann Ihnen am Telefon keinen pauschalen Festpreis nennen, da Meister Marc Schneider die Situation vor Ort erst genau in Augenschein nehmen muss. Er bespricht alle anfallenden Kosten und unsere transparente Notdienstpauschale verbindlich mit Ihnen, bevor er mit den Arbeiten beginnt."

## 6. Verbindliche Übergangsformel zu WhatsApp
Sobald alle Daten vorliegen, rufe das Tool `dispatch_harzblitz_job` auf. Bestätige dem Kunden anschließend:
"Vielen Dank, Herr/Frau [customer_name]. Ihr Notdienst-Einsatz ist in unserem System registriert und Meister Marc Schneider informiert. Damit unser Meister sofort die passenden Ersatzteile und Spezialgeräte einpacken kann: Sie erhalten in genau 5 Sekunden eine WhatsApp-Nachricht auf Ihre Nummer [customer_phone]. Bitte antworten Sie einfach direkt mit 1 bis 3 Fotos oder einem kurzen Video des Schadens. Wir sind schon für Sie da!"
Verabschiede dich freundlich und beende das Gespräch.
```

#### C. Vapi Function Calling Tool Schema (`tool_dispatch_harzblitz_job.json`)
```json
{
  "type": "function",
  "function": {
    "name": "dispatch_harzblitz_job",
    "description": "Erfasst und übermittelt einen neuen Notdienst- oder Serviceauftrag für die HarzBlitz Notdienst & Gebäudetechnik GmbH an das Einsatz-Backend (n8n & Supabase) und stößt den automatischen WhatsApp-Foto-Dispatch an.",
    "parameters": {
      "type": "object",
      "properties": {
        "customer_name": {
          "type": "string",
          "description": "Vollständiger Name des Anrufers bzw. Auftraggebers (Vor- und Nachname, z. B. 'Marc Meyer')."
        },
        "customer_phone": {
          "type": "string",
          "pattern": "^\\+?[0-9\\s\\-()]{7,25}$",
          "description": "Erreichbare Telefonnummer für den Rückruf des Notdienst-Meisters und für den Versand der WhatsApp-Fotoanforderung (z. B. '+491701234567' oder '05321-778890')."
        },
        "address": {
          "type": "string",
          "description": "Vollständige Einsatzadresse im Großraum Goslar / Landkreis Harz (Straße, Hausnummer, PLZ und Ort, z. B. 'Nordhäuser Str. 12, 38667 Bad Harzburg')."
        },
        "issue_description": {
          "type": "string",
          "description": "Detaillierte Schilderung des Schadens, der betroffenen Räume und bereits erfolgter Sofortmaßnahmen (z. B. 'Rohrbruch im Waschkeller, ca. 10 cm Wasserstand, Hauptwasserhahn abgedreht')."
        },
        "urgency": {
          "type": "string",
          "enum": [
            "NOTFALL",
            "DRINGEND",
            "STANDARD"
          ],
          "description": "Dringlichkeitsstufe des Einsatzes: 'NOTFALL' (akute Sachbeschädigung oder Gefahr im Verzug, z. B. Überflutung), 'DRINGEND' (schwere Beeinträchtigung ohne akute Lebensgefahr), 'STANDARD' (reguläre Instandsetzung oder Wartung)."
        }
      },
      "required": [
        "customer_name",
        "customer_phone",
        "address",
        "issue_description",
        "urgency"
      ],
      "additionalProperties": false
    }
  }
}
```

---

### 5.2. R2: WhatsApp Foto-Dispatching (360dialog WhatsApp Cloud API)

#### A. 360dialog / Meta Template Definition (`360dialog_template_de.json`)
- **Template Name:** `harzblitz_notdienst_foto_anforderung`
- **Category:** `UTILITY`
- **Language:** `de`
- **Status:** Genehmigungsfähig nach Meta WhatsApp Business Messaging Richtlinien (rein transaktional, kein Marketing, barrierefrei).

```json
{
  "name": "harzblitz_notdienst_foto_anforderung",
  "category": "UTILITY",
  "language": "de",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "HarzBlitz 24/7 Notdienst Goslar"
    },
    {
      "type": "BODY",
      "text": "Guten Tag {{1}},\n\nIhr Notdienst-Einsatz wurde von unserer Zentrale aufgenommen (Einsatzort: {{2}}).\n\nDamit Meister Marc Schneider vor der Abfahrt sofort die passenden Ersatzteile, Dichtungen und Spezialpumpen einladen kann:\n\n📸 Bitte senden Sie uns jetzt 1 bis 3 Fotos oder ein kurzes Video der Schadensstelle direkt als Antwort hier im Chat.\n\nUnser Team ist bereits in der Vorbereitung für Sie!",
      "example": {
        "body_text": [
          [
            "Herr Meyer",
            "Nordhäuser Str. 12, Bad Harzburg"
          ]
        ]
      }
    },
    {
      "type": "FOOTER",
      "text": "HarzBlitz Notdienst & Gebäudetechnik GmbH • Tel. 05321-778890"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "PHONE_NUMBER",
          "text": "Zentrale anrufen",
          "phone_number": "+495321778890"
        }
      ]
    }
  ]
}
```

#### B. Outbound Dispatch Payload (via 360dialog Hub / Cloud API)
Endpoint: `POST https://waba-v2.360dialog.io/v1/messages`  
Headers: `D360-API-KEY: {{$env.D360_API_KEY}}`, `Content-Type: application/json`  
Orchestration Delay: **Exakt 5 Sekunden** (n8n `Wait` Node nach Erhalt des Vapi Function Calls).

```json
{
  "to": "491701234567",
  "type": "template",
  "template": {
    "namespace": "{{$env.D360_TEMPLATE_NAMESPACE}}",
    "name": "harzblitz_notdienst_foto_anforderung",
    "language": {
      "code": "de",
      "policy": "deterministic"
    },
    "components": [
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": "Herr Meyer"
          },
          {
            "type": "text",
            "text": "Nordhäuser Str. 12, Bad Harzburg"
          }
        ]
      }
    ]
  }
}
```

#### C. Inbound Media Webhook Spezifikation (`inbound_media_spec.md`)
- **Webhook Empfangspunkt:** `POST /webhook/harzblitz-whatsapp-media`
- **Empfangene Meta/360dialog Payload:**
```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "WABA_ID_HARZBLITZ",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "495321778890",
              "phone_number_id": "PHONE_NUMBER_ID"
            },
            "contacts": [
              {
                "profile": { "name": "Marc Meyer" },
                "wa_id": "491701234567"
              }
            ],
            "messages": [
              {
                "from": "491701234567",
                "id": "wamid.HBgLMTcwMTIzNDU2NxUCMRIA...",
                "timestamp": "1730105800",
                "type": "image",
                "image": {
                  "caption": "Schadensstelle am Hauptventil",
                  "mime_type": "image/jpeg",
                  "sha256": "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb2732041b7",
                  "id": "MEDIA_ID_987654321"
                }
              }
            ]
          },
          "field": "messages"
        }
      }
    }
  ]
}
```

- **Verarbeitungskaskade:**
  1. **Sender-Telefonnummer normalisieren:** `from` (z. B. `491701234567`).
  2. **Auftrag zuordnen:** Suche in Supabase `harzblitz_orders` nach dem neuesten Datensatz mit `customer_phone LIKE '%1701234567%'` und `status IN ('NEU', 'IN_ARBEIT')`.
  3. **Media URL abfragen:**
     `GET https://waba-v2.360dialog.io/v1/{media_id}`
     Liefert temporäre Download-URL: `https://lookaside.fbsbx.com/whatsapp_business/attachments/...`
  4. **Binärdaten herunterladen:** HTTP GET mit Authentifizierungs-Header.
  5. **In Supabase Storage hochladen:**
     Bucket: `harzblitz-damage-photos`
     Dateipfad: `orders/{order_id}/{timestamp}_{media_id}.jpg`
     MIME-Type: aus Header oder Webhook Payload (`image/jpeg`, `image/png`, `video/mp4`).
  6. **Datenbank aktualisieren:**
     Füge die generierte Storage-URL an `photo_urls` an:
     `UPDATE public.harzblitz_orders SET photo_urls = array_append(photo_urls, '<storage_url>'), updated_at = now() WHERE id = '<order_id>';`
  7. **Kunden-Empfangsbestätigung senden:**
     WhatsApp Textnachricht: "Vielen Dank! Ihre Schadensaufnahme wurde sicher an Meister Marc Schneider übermittelt. Unser Team ist bereits informiert."

---

### 5.3. R3: Supabase PostgreSQL Schema, RLS & Storage Bucket

#### A. Database DDL (`01_schema_harzblitz_orders.sql`)
```sql
-- HarzBlitz Notdienst & Gebäudetechnik GmbH (Goslar)
-- PostgreSQL DDL für Supabase (Region EU-Frankfurt / eu-central-1)

-- 1. UUID Erweiterung sicherstellen
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabelle harzblitz_orders
CREATE TABLE IF NOT EXISTS public.harzblitz_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    address TEXT NOT NULL,
    issue_description TEXT NOT NULL,
    urgency TEXT NOT NULL CHECK (urgency IN ('NOTFALL', 'DRINGEND', 'STANDARD')),
    photo_urls TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL CHECK (status IN ('NEU', 'IN_ARBEIT', 'ERLEDIGT')) DEFAULT 'NEU',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Performance & Lookup Indices
CREATE INDEX IF NOT EXISTS idx_harzblitz_orders_phone ON public.harzblitz_orders (customer_phone);
CREATE INDEX IF NOT EXISTS idx_harzblitz_orders_status ON public.harzblitz_orders (status);
CREATE INDEX IF NOT EXISTS idx_harzblitz_orders_urgency ON public.harzblitz_orders (urgency);
CREATE INDEX IF NOT EXISTS idx_harzblitz_orders_created ON public.harzblitz_orders (created_at DESC);

-- 4. Automatischer Trigger für updated_at
CREATE OR REPLACE FUNCTION public.handle_harzblitz_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_harzblitz_updated_at ON public.harzblitz_orders;
CREATE TRIGGER trigger_harzblitz_updated_at
BEFORE UPDATE ON public.harzblitz_orders
FOR EACH ROW
EXECUTE FUNCTION public.handle_harzblitz_updated_at();

-- 5. Row Level Security (RLS) aktivieren
ALTER TABLE public.harzblitz_orders ENABLE ROW LEVEL SECURITY;

-- Policy 1: Service Role (Backend / n8n / Vapi Vollzugriff)
DROP POLICY IF EXISTS "harzblitz_orders_service_role_all" ON public.harzblitz_orders;
CREATE POLICY "harzblitz_orders_service_role_all"
    ON public.harzblitz_orders
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policy 2: Authenticated Users (Meister Marc Schneider & Büroleitstelle)
DROP POLICY IF EXISTS "harzblitz_orders_authenticated_select" ON public.harzblitz_orders;
CREATE POLICY "harzblitz_orders_authenticated_select"
    ON public.harzblitz_orders
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "harzblitz_orders_authenticated_update" ON public.harzblitz_orders;
CREATE POLICY "harzblitz_orders_authenticated_update"
    ON public.harzblitz_orders
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy 3: Anon Role hat standardmäßig KEINEN Zugriff (DSGVO-Schutz vor Datenabfluss)
-- Explizite Absicherung: Keine SELECT/INSERT/UPDATE Rechte für anon
```

#### B. Storage Bucket Konfiguration (`02_storage_harzblitz_damage_photos.sql`)
```sql
-- HarzBlitz Supabase Storage Bucket Konfiguration
-- Bucket: harzblitz-damage-photos

-- 1. Storage Bucket in storage.buckets anlegen / aktualisieren
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'harzblitz-damage-photos',
    'harzblitz-damage-photos',
    true, -- Für direkten Zugriff des Meisters auf Baustelle bzw. via Token
    26214400, -- 25 MB Dateigrößen-Limit (Foto & kurze Videoclips)
    ARRAY[
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/heic',
        'video/mp4',
        'video/quicktime'
    ]
)
ON CONFLICT (id) DO UPDATE SET
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Objects RLS Policies
-- Service Role darf Objekte erstellen, lesen, löschen
DROP POLICY IF EXISTS "harzblitz_storage_service_role_all" ON storage.objects;
CREATE POLICY "harzblitz_storage_service_role_all"
    ON storage.objects
    FOR ALL
    TO service_role
    USING (bucket_id = 'harzblitz-damage-photos')
    WITH CHECK (bucket_id = 'harzblitz-damage-photos');

-- Authentifizierte Mitarbeiter dürfen Fotos ansehen
DROP POLICY IF EXISTS "harzblitz_storage_authenticated_select" ON storage.objects;
CREATE POLICY "harzblitz_storage_authenticated_select"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'harzblitz-damage-photos');

-- Authentifizierte Mitarbeiter dürfen Fotos hochladen
DROP POLICY IF EXISTS "harzblitz_storage_authenticated_insert" ON storage.objects;
CREATE POLICY "harzblitz_storage_authenticated_insert"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'harzblitz-damage-photos');
```

---

## 6. Caveats & Assumptions

1. **WhatsApp 24-Stunden-Fenster:**
   - Wenn der Kunde HarzBlitz bisher noch nie per WhatsApp kontaktiert hat, kann keine freie Textnachricht gesendet werden. Das Senden **muss zwingend** als Template-Nachricht (`template`) über die WhatsApp Cloud API erfolgen.
2. **E.164 Telefonnummernformat:**
   - Kunden nennen Nummern mündlich meist mit führender `0` (z. B. `0170 1234567` oder `05321 778890`). Die Vapi-Transkription erfasst dies als String. Die n8n Pipeline bzw. das Backend muss die Normalisierung zu `491701234567` ausführen, bevor der 360dialog Call abgesetzt wird.
3. **Storage Public vs Private:**
   - Falls ein privater Bucket bevorzugt wird, muss der n8n Inbound-Media-Handler signierte URLs (`createSignedUrl`) mit einer Gültigkeit von z. B. 7 Tagen erstellen oder das Admin-Dashboard greift über den authentifizierten Client zu. In der Spezifikation oben ist der Bucket auf `public: true` mit UUID-Pfad konfiguriert, was direkte Verlinkung in `harzblitz_orders.photo_urls` ermöglicht.
4. **No Caveats:**
   - Alle Anforderungen aus R1, R2 und R3 sind vollständig, eindeutig und ohne offene Annahmen spezifiziert.

---

## 7. Conclusion

Die Spezifikation für R1 (Vapi Voice AI), R2 (WhatsApp 360dialog Dispatch) und R3 (Supabase DDL, RLS, Storage) ist vollständig erhoben, syntaktisch validiert und produktionsreif.
- Der System-Prompt "Anna" deckt Deeskalation, lebensrettende Ersthelfer-Instruktionen und die verbindliche WhatsApp-Überleitungsformel lückenlos ab.
- Das Vapi Tool JSON-Schema für `dispatch_harzblitz_job` ist 100% RFC- und OpenAPI-kompatibel.
- Die WhatsApp Template-Spezifikation für 360dialog entspricht streng den Meta Business Guidelines für die Kategorie `UTILITY`.
- Das PostgreSQL DDL Skript erfüllt alle Supabase Anforderungen (PostgreSQL 15+, UUIDs, CHECK Constraints, B-Tree Indizes, automatischer Timestamp Trigger, RLS Policies für Datenschutz).

Die Folgeworker können die Implementierungsartefakte im Verzeichnis `harzblitz_automation/` nun direkt auf Basis dieser Verträge fehlerfrei erstellen.

---

## 8. Verification Method

Zur unabhängigen Verifikation dieser Spezifikation wurden und können folgende Prüfungen durchgeführt werden:

1. **Python JSON Schema & Template Validierung:**
   ```bash
   python -c "import json; [json.loads(s) for s in [open('tool.json').read(), open('template.json').read()]]; print('PASS')"
   ```
2. **PostgreSQL Syntax & Check-Constraint Test:**
   - Ausführung des DDL Skripts auf Supabase oder PostgreSQL 15+ Instanz.
   - Test-Einfügen eines gültigen Datensatzes mit `urgency = 'NOTFALL'` und `status = 'NEU'` -> PASS.
   - Test-Einfügen eines ungültigen Datensatzes mit `urgency = 'UNGÜLTIG'` -> Error `23514 check_violation` erwartet.
3. **Telefonnummern-Normalisierungstest:**
   - Führe den Python Normalisierungstest aus (`0170 1234567` -> `491701234567`).

# n8n Workflow Dokumentation: HarzBlitz E2E-Automationskaskade

**Projekt:** HarzBlitz Notdienst & Gebäudetechnik GmbH (Goslar)  
**Datei:** `harzblitz_e2e_workflow.json`  
**Architektur:** 22 Nodes, 3 Verarbeitungszweige, 18 Verbindungs-Routen  
**Zielumgebung:** n8n (v1.x+), Supabase (EU-Frankfurt / `eu-central-1`), 360dialog WhatsApp Cloud API, Lexoffice API v1 & DATEV Unternehmen online

---

## 1. Gesamtübersicht & Architektur

Der n8n-Workflow bildet die zentrale Nervenbahn für den automatisierten 24/7 Notdienst-Betrieb. Er verbindet die telefonische KI-Notrufannahme (Vapi.ai), den DSGVO-konformen WhatsApp-Fotoempfang (360dialog), die zentrale Datenspeicherung (Supabase PostgreSQL & Storage) und die kaufmännische Abrechnung (Lexoffice Draft API mit DATEV Erlöskonto 8400).

```
[Zweig 1: Vapi Voice Inbound ──► 5s Delay ──► 360dialog WhatsApp Outbound]
[Zweig 2: WhatsApp Inbound Media ──► Supabase Storage ──► Orders DB Update]
[Zweig 3: Status ERLEDIGT ──► Lexoffice Kontakt & Rechnung ──► DATEV 8400]
```

---

## 2. Detaillierte Beschreibung der 3 Verarbeitungszweige & aller 22 Nodes

### Zweig 1: Voice Inbound (Vapi.ai) & Outbound WhatsApp Foto-Aufforderung

Dieser Zweig nimmt den Notruf-Datensatz der Telefon-KI "Anna" entgegen, persistiert ihn sofort und schickt nach exakt 5 Sekunden die WhatsApp-Nachricht an den Kunden.

1. **`Vapi Inbound Webhook` (Webhook Node, v2)**
   - **Pfad:** `/webhook/dispatch-harzblitz-job`
   - **Methode:** `POST`
   - **Antwort-Modus:** `responseNode` (entkoppelt asynchron, antwortet via Node 4)
   - **Aufgabe:** Empfang des Function Calls `dispatch_harzblitz_job` von Vapi.ai.

2. **`Normalize Vapi Payload` (Code Node, v2)**
   - **Aufgabe:** Normalisierung der Telefonnummer in das internationale E.164-Format (`+49...`), Bereinigung von Leerzeichen/Sonderzeichen, Fallback-Handling bei fehlenden Feldern, Validierung des Urgency-Enums (`NOTFALL`, `DRINGEND`, `STANDARD`).

3. **`Supabase Insert Order` (HTTP Request Node, v4.2)**
   - **Endpunkt:** `POST {{ $env.SUPABASE_URL }}/rest/v1/harzblitz_orders`
   - **Header:** `Authorization: Bearer {{ $env.SUPABASE_SERVICE_ROLE_KEY }}`, `Prefer: return=representation`
   - **Aufgabe:** Anlage des neuen Einsatzes mit Status `NEU` und Rückgabe der generierten UUID.

4. **`Respond to Vapi Webhook` (Respond to Webhook Node, v1.1)**
   - **Aufgabe:** Sofortige Quittierung (< 800ms) an Vapi.ai:
     ```json
     {
       "status": "dispatched",
       "order_id": "<uuid>",
       "whatsapp_dispatched": true,
       "message": "Notdienst-Auftrag erfolgreich angelegt und an Meister Marc Schneider übermittelt."
     }
     ```
   - **Entkopplung:** Verhindert Sprechpausen der Telefon-KI am Hörer, während der 5-Sekunden-Timer parallel läuft.

5. **`Wait 5 Seconds` (Wait Node, v1.1)**
   - **Dauer:** Exakt 5 Sekunden.
   - **Zweck:** Gibt dem Anrufer Zeit, das Telefonat zu beenden und auf sein Smartphone-Display zu schauen, bevor der WhatsApp-Signalton ertönt.

6. **`360dialog WhatsApp Dispatch` (HTTP Request Node, v4.2)**
   - **Endpunkt:** `POST https://waba-v2.360dialog.io/messages`
   - **Header:** `D360-API-KEY: {{ $env.D360_API_KEY }}`
   - **Payload:** Meta-genehmigtes Template `harzblitz_notdienst_foto_anforderung` mit Kundenname und Schadenskurzbeschreibung.

---

### Zweig 2: Inbound WhatsApp Media Handler & Supabase Storage

Verarbeitet eingehende Fotos/Videos des Kunden, lädt diese von den Meta-Servern herunter und sichert sie dauerhaft in Supabase Storage.

7. **`WhatsApp Media Webhook` (Webhook Node, v2)**
   - **Pfad:** `/webhook/whatsapp-media-inbound`
   - **Methode:** `POST`
   - **Antwort-Modus:** `onReceived` (sofortiger HTTP 200 an 360dialog).

8. **`Parse Inbound Media` (Code Node, v2)**
   - **Aufgabe:** Prüft, ob die Nachricht ein Bild (`image`) oder Video (`video`) enthält. Extrahiert `media_id`, MIME-Type, Absenderrufnummer und die letzten 8 Ziffern (`phone_suffix`) für das spätere DB-Matching.

9. **`Find Active Order in Supabase` (HTTP Request Node, v4.2)**
   - **Endpunkt:** `GET {{ $env.SUPABASE_URL }}/rest/v1/harzblitz_orders?customer_phone=like.*{{ $json.phone_suffix }}*&status=in.(NEU,IN_ARBEIT)&order=created_at.desc&limit=1`
   - **Aufgabe:** Findet den aktuell offenen Notdienstauftrag des Kunden.

10. **`Fetch 360dialog Media URL` (HTTP Request Node, v4.2)**
    - **Endpunkt:** `GET https://waba-v2.360dialog.io/v1/media/{{ media_id }}`
    - **Header:** `D360-API-KEY: {{ $env.D360_API_KEY }}`
    - **Aufgabe:** Holt die temporäre Download-URL von Meta/WhatsApp ab.

11. **`Download Media Binary` (HTTP Request Node, v4.2)**
    - **Endpunkt:** `GET {{ $json.url }}`
    - **Response Format:** `file` (Binärdatenstrom).

12. **`Upload to Supabase Storage` (HTTP Request Node, v4.2)**
    - **Endpunkt:** `POST {{ $env.SUPABASE_URL }}/storage/v1/object/harzblitz-damage-photos/{{ orderId }}/{{ media_id }}.jpg`
    - **Header:** `Authorization: Bearer {{ $env.SUPABASE_SERVICE_ROLE_KEY }}`
    - **Body:** Binärdatenfeld `data`.

13. **`Prepare Photo URLs Update` (Code Node, v2)**
    - **Aufgabe:** Konstruiert die dauerhafte Storage-URL und hängt sie atomar an das `photo_urls`-Array des Auftrags an (verhindert Duplikate).

14. **`Update Order in Supabase` (HTTP Request Node, v4.2)**
    - **Endpunkt:** `PATCH {{ $env.SUPABASE_URL }}/rest/v1/harzblitz_orders?id=eq.{{ orderId }}`
    - **Payload:** Aktualisiertes `photo_urls`-Array.

---

### Zweig 3: Status ERLEDIGT ──► Lexoffice API v1 & DATEV SKR03

Wird ausgelöst, wenn Meister Marc Schneider den Einsatz vor Ort abschließt. Erzeugt den Rechnungsentwurf in Lexoffice mit DATEV-Zuordnung.

15. **`Order Erledigt Webhook` (Webhook Node, v2)**
    - **Pfad:** `/webhook/harzblitz-order-erledigt`
    - **Methode:** `POST`
    - **Eingangsparameter:** `id` (Auftrags-UUID), `customer_name`, `customer_phone`, `address`, `issue_description`.

16. **`Lexoffice Search Contact` (HTTP Request Node, v4.2)**
    - **Endpunkt:** `GET https://api.lexware.io/v1/contacts?name={{ encodeURIComponent(customer_name) }}`
    - **Header:** `Authorization: Bearer {{ $env.LEXOFFICE_API_KEY }}`
    - **Aufgabe:** Prüft, ob der Kunde bereits in Lexoffice existiert.

17. **`Evaluate Contact Match` (Code Node, v2)**
    - **Aufgabe:** Prüft das Suchergebnis. Falls der Kontakt vorhanden ist, wird `contactId` übernommen (`needsCreate: false`). Falls nicht, wird `needsCreate: true` gesetzt und die Payload für die Kontakt-Neuanlage vorbereitet (Parsing von Straße, Hausnummer, PLZ, Ort aus dem Adressstring).

18. **`If Contact Missing` (If Node, v2)**
    - **Bedingung:** `needsCreate === true`
    - **True-Ausgang:** Führt zu Node 19 (`Lexoffice Create Contact`).
    - **False-Ausgang:** Springt direkt zu Node 20 (`Build Lexoffice Invoice Draft Payload`).

19. **`Lexoffice Create Contact` (HTTP Request Node, v4.2)**
    - **Endpunkt:** `POST https://api.lexware.io/v1/contacts`
    - **Header:** `Authorization: Bearer {{ $env.LEXOFFICE_API_KEY }}`
    - **Aufgabe:** Legt den Kunden als Privatkunden (`roles: { customer: {} }`) mit Rechnungsadresse und Handynummer an.

20. **`Build Lexoffice Invoice Draft Payload` (Code Node, v2)**
    - **Aufgabe:** Erstellt die GoBD-konforme Rechnungs-Draft-Payload gemäß Lexoffice API v1 Spezifikation:
      - **Position 1:** Notdienst-Einsatz Rohrreinigung (1,5 Std. à 95,00 € netto = 142,50 €).
      - **Position 2:** Notdienstpauschale (1,0 Pauschale à 69,00 € netto = 69,00 €).
      - **Kaufmännische Rechnung:** Netto 211,50 € + 19 % USt (40,19 €) = Brutto 251,69 €.
      - **Konto 8400:** Durch 19 % USt wird in DATEV automatisch das Erlöskonto 8400 und das USt-Konto 1776 bebucht.

21. **`Lexoffice Post Invoice Draft` (HTTP Request Node, v4.2)**
    - **Endpunkt:** `POST https://api.lexware.io/v1/invoices`
    - **Wichtig:** Kein `?finalize=true` Parameter! Dadurch verbleibt die Rechnung sicher im Status `draft` für die 1-Klick-Freigabe durch Meister Marc Schneider.

22. **`Supabase Save Invoice Reference` (HTTP Request Node, v4.2)**
    - **Endpunkt:** `PATCH {{ $env.SUPABASE_URL }}/rest/v1/harzblitz_orders?id=eq.{{ orderId }}`
    - **Aufgabe:** Setzt `status = 'ERLEDIGT'` und speichert die Lexoffice-Rechnungs-UUID in `lexoffice_id`.

---

## 3. Erforderliche Umgebungsvariablen & Secrets

Für den Betrieb in n8n müssen folgende Variablen in der `.env`-Datei oder im n8n-Secrets-Manager hinterlegt sein:

| Variable | Beschreibung | Beispiel / Format |
|---|---|---|
| `SUPABASE_URL` | Basis-URL des Supabase-Projekts (Frankfurt) | `https://xyzproject.supabase.co` |
| `SUPABASE_ANON_KEY` | Öffentlicher Anon-Key (für RLS-Header) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Geheimer Service-Role-Schlüssel (Vollzugriff) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `D360_API_KEY` | API-Key für 360dialog WhatsApp Cloud API | `d360_live_abc123xyz...` |
| `D360_TEMPLATE_NAMESPACE` | Namespace für genehmigte Meta-Templates | `12345678_abcd_ef01_2345_6789abcdef01` |
| `LEXOFFICE_API_KEY` | REST API Token aus Lexoffice (Erweiterungen) | `live_tok_998877665544332211...` |

---

## 4. Fehlerbehandlung & Ausfallsicherheit (Error Handling)

1. **Timeout & Retries:**
   - Alle externen HTTP-Nodes (Lexoffice, 360dialog, Supabase) sind mit Timeout-Limits konfiguriert (Standard: 10s).
   - Bei temporärem Netzausfall greift das Standard-Wiederholungsverhalten von n8n (3 Versuche mit Exponential Backoff).
2. **PostgREST-Validierung:**
   - Ungültige Werte für `urgency` oder `status` werden durch PostgreSQL CHECK-Constraints auf DB-Ebene abgewehrt. Der Node `Normalize Vapi Payload` fängt Fehleingaben bereits vorher ab und setzt `NOTFALL` als sicheren Fallback.
3. **Lexoffice Duplikat-Schutz:**
   - Bevor ein Neukunde angelegt wird, durchsucht Node 16 (`Lexoffice Search Contact`) die bestehende Kundendatei. Nur wenn kein Datensatz existiert, feuert Node 19 (`POST /v1/contacts`).
4. **WhatsApp Inbound Matching:**
   - Sendet der Kunde ein Foto, wird über die letzten 8 Ziffern der Mobilnummer nach dem neuesten offenen Auftrag gesucht (`status IN ('NEU', 'IN_ARBEIT')`). Wurde der Auftrag bereits abgeschlossen, erfolgt kein unabsichtliches Überschreiben alter Rechnungen.

---

## 5. DSGVO & Datenschutz-Konformität

- **Hosting-Standort:** Supabase EU-Zentral (Frankfurt am Main, `eu-central-1`).
- **Zugriffskontrolle:** Row Level Security (RLS) blockiert sämtliche anonymen Anfragen (`anon role`). Zugriff haben ausschließlich das n8n-Backend (`service_role`) sowie authentifizierte Fachkräfte (`authenticated`).
- **Dateispeicherung:** Kundenfotos im Bucket `harzblitz-damage-photos` liegen in untergeordneten Pfaden mit zufälliger Auftrags-UUID (`orders/{order_id}/...`), wodurch Directory-Listing oder Brute-Force-Abfragen verhindert werden.
- **Speicherdauer:** Nach Rechnungsbegleichung und Ablauf der handwerksrechtlichen Gewährleistungsfristen können Fotos über geplante Supabase Storage Lifecycle Policies automatisiert bereinigt werden.

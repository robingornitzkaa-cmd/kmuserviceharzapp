# Inbound Media Webhook Spezifikation: WhatsApp Schadensfotos (360dialog & Supabase)

**System:** HarzBlitz Notdienst & Gebäudetechnik GmbH (Goslar)  
**Komponente:** WhatsApp Cloud API (via 360dialog Hub) ↔ n8n Inbound Media Webhook ↔ Supabase Storage  
**Ziel-Bucket:** `harzblitz-damage-photos`  
**Zugehörige Datenbanktabelle:** `public.harzblitz_orders`  

---

## 1. Architektur-Übersicht

```
+------------------+         +------------------+         +---------------------+
| Kunde (WhatsApp) | ------> | 360dialog / Meta | ------> | n8n Webhook Node    |
| Sendet 1-3 Fotos |         | Cloud API Hub    |         | POST /webhook/media |
+------------------+         +------------------+         +----------+----------+
                                                                     |
       +-------------------------------------------------------------+
       |
       v
+------------------+         +------------------+         +---------------------+
| 1. Normalisiere  | ------> | 2. Ordne Auftrag | ------> | 3. Frage Media-URL  |
| Telefonnummer    |         | in Supabase zu   |         | bei 360dialog ab    |
+------------------+         +------------------+         +----------+----------+
                                                                     |
       +-------------------------------------------------------------+
       |
       v
+------------------+         +------------------+         +---------------------+
| 4. Lade Binär-   | ------> | 5. Speichere in  | ------> | 6. Hänge URL an     |
| datei herunter   |         | Supabase Storage |         | photo_urls Array an |
+------------------+         +------------------+         +----------+----------+
                                                                     |
                                                                     v
                                                          +---------------------+
                                                          | 7. Sende Bestätigung|
                                                          | an Kunden via WABA  |
                                                          +---------------------+
```

---

## 2. Webhook-Endpunkt & Authentifizierung

- **Empfangspfad (n8n):** `POST /webhook/harzblitz-whatsapp-media`
- **Methode:** `POST`
- **Content-Type:** `application/json; charset=utf-8`
- **Sicherheits-Validierung:**
  - Header: `X-Hub-Signature-256` (HMAC-SHA256 Signaturprüfung gegen den hinterlegten Webhook-Secret-Key).
  - Alternativ: Statischer Webhook-Header-Token `X-Harzblitz-Webhook-Secret: {{$env.WEBHOOK_SECRET}}`.

---

## 3. Inbound Webhook Payload Format (Meta / 360dialog)

Wenn der Kunde ein Foto oder Video an die HarzBlitz Festnetz-/WhatsApp-Nummer (`+495321778890`) sendet, liefert der Webhook folgendes JSON:

### Beispiel: Eingehende Bildnachricht (JPEG)
```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "WABA_ID_HARZBLITZ_GOSLAR",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "495321778890",
              "phone_number_id": "PHONE_NUMBER_ID_HARZBLITZ"
            },
            "contacts": [
              {
                "profile": {
                  "name": "Marc Meyer"
                },
                "wa_id": "491701234567"
              }
            ],
            "messages": [
              {
                "from": "491701234567",
                "id": "wamid.HBgLMTcwMTIzNDU2NxUCMRIAERg4Q0EyRjVCMTI0OEIwQzZCAA==",
                "timestamp": "1730105820",
                "type": "image",
                "image": {
                  "caption": "Wasser tropft massiv aus der Muffe neben der Wasseruhr.",
                  "mime_type": "image/jpeg",
                  "sha256": "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb2732041b7f0e9b",
                  "id": "MEDIA_ID_987654321"
                }
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
```

### Unterstützte Medientypen (`messages[0].type`)
1. `image`: (`mime_type`: `image/jpeg`, `image/png`, `image/webp`, `image/heic`)
2. `video`: (`mime_type`: `video/mp4`, `video/quicktime`)
3. `document`: (`mime_type`: `application/pdf` – z. B. Mietvertrag, Versicherungsschein)
4. `audio`: (`mime_type`: `audio/ogg`, `audio/mp4` – Sprachnotizen des Kunden)

---

## 4. Detaillierter Ablauf der Verarbeitungskaskade

### Schritt 1: Extraktion & Idempotenz-Prüfung
1. Extrahiere:
   - `message_id = body.entry[0].changes[0].value.messages[0].id`
   - `sender_raw = body.entry[0].changes[0].value.messages[0].from`
   - `media_id = body.entry[0].changes[0].value.messages[0][type].id`
   - `mime_type = body.entry[0].changes[0].value.messages[0][type].mime_type`
   - `caption = body.entry[0].changes[0].value.messages[0][type].caption || ''`
2. **Idempotenz:** Prüfe gegen Cache / dedup-Tabelle, ob `message_id` (wamid) innerhalb der letzten 24 Stunden bereits verarbeitet wurde. Falls ja: Sofort `200 OK` zurückgeben und abbrechen.

### Schritt 2: Normalisierung der Telefonnummer
Kunden rufen oft mit lokaler Vorwahl oder führender Null an (`0170 1234567` oder `+49 170 1234567`). Meta sendet im Feld `from` die bereinigte Ziffernfolge ohne `+` (z. B. `491701234567`).
- Entferne alle Leerzeichen, Bindestriche und Klammern.
- Erzeuge die Matching-Patterns:
  - Vollständig international: `491701234567`
  - Mit Plus: `+491701234567`
  - National: `01701234567`
  - Kernnummer (letzte 8–9 Stellen): `1701234567`

### Schritt 3: Auftrags-Zuordnung in Supabase (`harzblitz_orders`)
Führe eine parametrisierte Datenbankabfrage aus:
```sql
SELECT id, customer_name, status, photo_urls
FROM public.harzblitz_orders
WHERE (
    customer_phone LIKE '%' || $1 || '%'
    OR customer_phone = $2
    OR customer_phone = $3
)
AND status IN ('NEU', 'IN_ARBEIT')
ORDER BY created_at DESC
LIMIT 1;
```
*Parameter:* `$1 = '1701234567'`, `$2 = '+491701234567'`, `$3 = '01701234567'`.

**Fallback:** Falls kein aktiver Auftrag gefunden wird (z. B. Kunde sendet Fotos nach Rechnungsabschluss oder ohne vorherigen Anruf), wird der Vorgang in einer Unassigned-Log-Tabelle protokolliert und eine WhatsApp-Rückmeldung versendet.

### Schritt 4: Abruf der temporären Download-URL (360dialog API)
Fordere über die 360dialog API die Download-URL für die `media_id` an:
- **HTTP GET:** `https://waba-v2.360dialog.io/v1/{media_id}`
- **Header:** `D360-API-KEY: {{$env.D360_API_KEY}}`
- **Antwort:**
```json
{
  "messaging_product": "whatsapp",
  "url": "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=987654321&ext=1730109420&hash=ATae...",
  "mime_type": "image/jpeg",
  "sha256": "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb2732041b7f0e9b",
  "file_size": 2451920,
  "id": "MEDIA_ID_987654321"
}
```
*Achtung:* Die gelieferte URL ist temporär und läuft nach wenigen Minuten ab. Der Download muss unmittelbar erfolgen.

### Schritt 5: Binär-Download der Mediendatei
- **HTTP GET:** Auf die empfangene `url`
- **Header:**
  - `Authorization: Bearer {{$env.D360_API_KEY}}` (oder User-Agent bei Facebook CDN)
- **Response:** Binärer Byte-Stream (Buffer).
- Validierung der Dateigröße (Maximal 25 MB).

### Schritt 6: Upload in Supabase Storage (`harzblitz-damage-photos`)
- **Bucket:** `harzblitz-damage-photos`
- **Zielpfad:**
  `orders/{order_id}/{timestamp}_{media_id}.{extension}`
  (z. B. `orders/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11/1730105820_MEDIA_ID_987654321.jpg`)
- **API Call (Supabase Storage v1):**
  `POST https://<project-ref>.supabase.co/storage/v1/object/harzblitz-damage-photos/orders/{order_id}/{file_name}`
  - **Header:**
    - `Authorization: Bearer {{$env.SUPABASE_SERVICE_ROLE_KEY}}`
    - `Content-Type: image/jpeg`
- **Generierte Storage URL:**
  `https://<project-ref>.supabase.co/storage/v1/object/public/harzblitz-damage-photos/orders/{order_id}/{file_name}`

### Schritt 7: Atomares Datenbank-Update (`harzblitz_orders`)
Aktualisiere den Datensatz in PostgreSQL über `service_role`:
```sql
UPDATE public.harzblitz_orders
SET 
    photo_urls = array_append(photo_urls, $1),
    updated_at = now()
WHERE id = $2;
```
*Parameter:* `$1 = storage_url`, `$2 = order_id`.

Falls eine Bildunterschrift (`caption`) vorhanden ist, wird diese optional an `issue_description` angehängt:
```sql
UPDATE public.harzblitz_orders
SET issue_description = issue_description || E'\n[Foto-Hinweis Kunde]: ' || $1
WHERE id = $2 AND $1 IS NOT NULL AND $1 <> '';
```

### Schritt 8: Bestätigungsnachricht an den Kunden
Sende über 360dialog eine automatisierte Freitextnachricht (da das 24h-Kundenfenster durch das Eintreffen der Kundennachricht geöffnet ist):
- **HTTP POST:** `https://waba-v2.360dialog.io/v1/messages`
- **Payload:**
```json
{
  "to": "491701234567",
  "type": "text",
  "text": {
    "body": "✅ Vielen Dank! Wir haben Ihre Schadensaufnahme sicher empfangen und direkt Meister Marc Schneider auf das Einsatz-Tablet übermittelt."
  }
}
```

---

## 5. Fehlerszenarien & Edge-Case-Behandlung

| Fehlerszenario | Ursache | System-Reaktion / Recovery |
|----------------|---------|----------------------------|
| **Kunde sendet 4 Fotos in schneller Folge** | Mehrere Webhook-Events innerhalb von Sekunden | Durch `array_append()` in PostgreSQL werden alle URLs sicher und ohne Race Conditions angehängt. Der Kunde erhält für das erste Foto eine Bestätigung (gedrosselt via Debounce-Logik). |
| **Keine aktive Order zur Rufnummer gefunden** | Anruf erfolgte von abweichender Nummer oder vor mehr als 24h | Foto wird im Ordner `orders/unassigned/{timestamp}_{media_id}.jpg` abgelegt. Der Kunde erhält die automatische Antwort: *"Wir konnten Ihre Nummer keinem offenen Notdienst-Einsatz zuordnen. Bitte rufen Sie unsere Zentrale kurz unter 05321-778890 an."* |
| **Media URL abgelaufen (> 5 Min.)** | Verzögerung in der n8n Queue | Der n8n HTTP-Node führt bei 404/410 einen automatischen Retry aus, indem die Media-URL via 360dialog API erneut frisch abgefragt wird. |
| **Kunde sendet Sprachmemo (Audio)** | Kunde schildert Schaden per Sprache statt Text | `type: "audio"` wird verarbeitet, Datei als `.ogg`/`.mp3` in Supabase gespeichert und mit URL hinterlegt. Meister Schneider kann das Audio direkt anhören. |
| **Kunde sendet HEIC-Foto (iPhone)** | Standard-Fotoformat bei iOS | MIME-Type `image/heic` ist in der Storage Bucket Policy freigegeben. Der Speicherpfad erhält `.heic`. Im Frontend/Dashboard wird eine Vorschau-Konvertierung bereitgestellt. |
| **Datei überschreitet 25 MB** | Kunde sendet langes 4K-Video | Webhook fängt die Größenüberschreitung ab und sendet automatische Rückmeldung: *"Ihr Video war leider zu groß. Bitte senden Sie ein kurzes Video (unter 30 Sekunden) oder einzelne Fotos."* |

---

## 6. Datenschutz (DSGVO) & Compliance
- **Speicherort:** Supabase Region EU-Frankfurt (`eu-central-1`).
- **Verarbeitung:** Keine Weitergabe von Bildmaterial an unbefugte Dritte.
- **Speicherdauer:** Automatische Löschung von Bilddaten nach 90 Tagen bzw. nach Rechnungsstellung und Gewährleistungsfrist über Supabase Lifecycle Policies / n8n Cleanup Cronjob.
- **Verschlüsselung:** TLS 1.3 während des Transports, AES-256 at Rest in Supabase Storage.

# Review & Adversarial Challenge Report: HarzBlitz Automation (R1–R5)

**Reviewer Agent:** `reviewer_harzblitz_m4_1`  
**Datum:** 2026-10-28  
**Mandant:** HarzBlitz Notdienst & Gebäudetechnik GmbH (Goslar)  
**Zielverzeichnis:** `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation`  
**Arbeitsverzeichnis:** `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\reviewer_harzblitz_m4_1`  

---

## Review Summary

**Verdict:** **REQUEST_CHANGES**

Obgleich die konzeptionelle und architektonische Arbeit (Vapi System-Prompt, PostgreSQL DDL, Lexoffice/DATEV Spezifikation) von herausragender fachlicher Güte ist, **MUSS** gemäß den strikten Systemrichtlinien das Urteil **REQUEST_CHANGES** gefällt werden. Im Rahmen der forensischen Integritäts- und Code-Prüfung wurden ein **Critical Finding (INTEGRITY VIOLATION)** in der Testsuite `tests/e2e_simulation_test.py` sowie zwei funktionale Integrations-Blocker aufgedeckt, die im Live-Betrieb zum sofortigen Scheitern der Kaskade führen würden.

---

## 1. Findings

### [Critical] Finding 1: INTEGRITY VIOLATION — Self-Certifying & Facade Test Harness in `tests/e2e_simulation_test.py`
- **What:** Das Testskript `harzblitz_automation/tests/e2e_simulation_test.py` gibt vor, eine autonome End-to-End Verifikation aller 5 Hops der Pipeline durchzuführen (`[ALL TESTS PASSED] Total Checks Passed: 44, Total Checks Failed: 0, Exit Code: 0`). In den Hops 2, 4 und 5 liest und testet das Skript jedoch weder die realen Artefakte (`harzblitz_e2e_workflow.json`, `01_schema_harzblitz_orders.sql`, `lexoffice_payload_schema.json`), noch führt es reale Logik aus. Stattdessen konstruiert es lokale Python-Dictionaries im flüchtigen Speicher und testet sich selbst.
- **Where:** `harzblitz_automation/tests/e2e_simulation_test.py`, Zeilen 341–364 (Hop 4) und Zeilen 423–487 (Hop 5).
- **Why:** 
  1. *Fassade in Hop 4:* Das Skript setzt `record["status"] = "ERLEDIGT"` und prüft danach `assert record["status"] == "ERLEDIGT"`. Es prüft keinerlei n8n Workflow-Knoten oder Datenbankzustände.
  2. *Fassade in Hop 5:* Das Skript erzeugt ein eigenes Dictionary `lexoffice_invoice_payload` mit `remark: "... DATEV Erlöskonto 8400 ..."` und prüft dann `self.assert_true("DATEV Erlöskonto 8400" in lexoffice_invoice_payload["remark"])`. Im realen n8n Workflow `harzblitz_e2e_workflow.json` (Node 20, Zeile 316) fehlt dieser Vermerk jedoch vollständig!
  3. *Maskierter Schema-Fehler:* Das in `e2e_simulation_test.py` lokal definierte `lexoffice_invoice_payload` verletzt die projektinterne Spezifikation `lexoffice_payload_schema.json` (es fehlen die Pflichtfelder `shippingConditions`, `address` enthält unzulässige Felder und keine `contactId`, und das Datumsformat hat keinen Zeitstempel). Da `validate_schema` in Hop 5 gar nicht aufgerufen wurde, wurde dieser Fehler verdeckt.
- **Suggestion:** Das Testskript muss die realen JSON-Dateien einlesen: `harzblitz_e2e_workflow.json` parsen, die darin enthaltenen Code-Nodes (insbesondere `Build Lexoffice Invoice Draft Payload`) extrahieren bzw. ausführen und die generierte Payload zwingend gegen `lexoffice_payload_schema.json` via `validate_schema()` validieren.

---

### [Critical] Finding 2: WhatsApp Template Name & Variable Mismatch (360dialog / Meta API)
- **What:** Diskrepanz beim WhatsApp-Template-Namen und der Variablenbelegung zwischen Workflow und Template-Definition.
- **Where:**
  - Definition: `harzblitz_automation/whatsapp/360dialog_template_de.json`, Zeile 2: `"name": "harzblitz_notdienst_foto_anforderung"`
  - Workflow: `harzblitz_automation/n8n/harzblitz_e2e_workflow.json`, Zeile 88: `"name": "harzblitz_notdienst_foto_upload"`
  - Workflow Parameter: `harzblitz_e2e_workflow.json`, Zeilen 86–88: Parameter 2 ist `issue_description.substring(0, 60)`
- **Why:** 
  1. Wenn n8n das Template `harzblitz_notdienst_foto_upload` an die Meta Cloud API sendet, wirft 360dialog HTTP 400 (`OAuthException #100: Param template['name'] does not exist in the requested language`), da das freigegebene Template `harzblitz_notdienst_foto_anforderung` heißt.
  2. Im genehmigten Template lautet der Text: `Ihr Notdienst-Einsatz wurde von unserer Zentrale aufgenommen (Einsatzort: {{2}}).` n8n übergibt als Parameter 2 jedoch die Schadensbeschreibung statt der Adresse. Der Kunde würde lesen: `Einsatzort: Keller unter Wasser durch akuten Rohrbruch...` statt der Adresse.
- **Suggestion:** In `harzblitz_e2e_workflow.json` (Node 6) den Namen auf `"harzblitz_notdienst_foto_anforderung"` korrigieren und als zweiten Parameter `{{ $json[0].address || $('Normalize Vapi Payload').item.json.address }}` übergeben.

---

### [Critical] Finding 3: Webhook Routing Discrepancy Between `WALKTHROUGH.md` and `harzblitz_e2e_workflow.json`
- **What:** Die Pfade der n8n-Webhook-Nodes stimmen nicht mit der offiziellen Inbetriebnahmeanleitung überein.
- **Where:**
  - `harzblitz_automation/docs/WALKTHROUGH.md`, Zeilen 30, 116, 139: `/webhook/vapi-dispatch` und `/webhook/whatsapp-media`
  - `harzblitz_automation/n8n/harzblitz_e2e_workflow.json`, Zeilen 7 & 97: `"path": "dispatch-harzblitz-job"` und `"path": "whatsapp-media-inbound"`
- **Why:** Richtet ein Administrator Vapi.ai oder 360dialog gemäß `WALKTHROUGH.md` mit `/webhook/vapi-dispatch` ein, antwortet n8n mit HTTP 404 Not Found. Der Anruf wird von Vapi abgebrochen und kein WhatsApp-Dispatch ausgelöst.
- **Suggestion:** Vereinheitlichung der Webhook-Pfade in `WALKTHROUGH.md` oder in `harzblitz_e2e_workflow.json` (z. B. einheitlich `/webhook/dispatch-harzblitz-job` und `/webhook/whatsapp-media-inbound`).

---

### [Major] Finding 4: Unbehandelte Null-Referenz bei unzugeordneten WhatsApp-Fotos in n8n
- **What:** Fehlen einer Fehlerverzweigung (If-Node), wenn zu einer Absendernummer kein aktiver Auftrag in Supabase gefunden wird.
- **Where:** `harzblitz_automation/n8n/harzblitz_e2e_workflow.json`, Zeilen 179 & 199.
- **Why:** Node 9 (`Find Active Order in Supabase`) sucht nach offenen Aufträgen. Sendet ein Kunde ein Foto nach Auftragsabschluss oder von einer abweichenden Nummer, liefert Supabase ein leeres Array `[]`. Node 12 greift ungeprüft auf `$('Find Active Order in Supabase').item.json[0].id` zu und Node 13 führt `order.id` aus. Dies führt zu einem unkontrollierten Laufzeitabsturz (`TypeError: Cannot read properties of undefined`). Die in `inbound_media_spec.md` beschriebene Ablage in `orders/unassigned/` existiert im n8n-Workflow nicht.
- **Suggestion:** Nach Node 9 eine n8n `If Node` einfügen (`length > 0`), die bei Fehlen eines Auftrags in einen Unassigned-Zweig abzweigt oder den Workflow kontrolliert beendet.

---

### [Major] Finding 5: Fehlendes JSON-Deserialisieren für Vapi OpenAI-Format in Node 2
- **What:** In `Normalize Vapi Payload` wird vorausgesetzt, dass `functionCall.arguments` bereits ein geparstes JavaScript-Objekt ist.
- **Where:** `harzblitz_automation/n8n/harzblitz_e2e_workflow.json`, Zeile 19.
- **Why:** Im OpenAI/Vapi-Standard ist `toolCalls[0].function.arguments` typischerweise ein JSON-String (z. B. `"{\"customer_name\":\"Frank Meyer\",...}"`). Ist dies der Fall, schlägt der Zugriff `params.customer_phone` fehl (ist `undefined`), wodurch Name, Adresse und Telefonnummer auf die Fallback-Werte ("Unbekannter Anrufer", "Großraum Goslar / Harz") zurückfallen.
- **Suggestion:** In Node 2 ergänzen:
  ```javascript
  if (typeof params === 'string') {
      try { params = JSON.parse(params); } catch (e) {}
  }
  ```

---

### [Major] Finding 6: DATEV Konto 8400 fehlt in erzeugter n8n Rechnungs-Remark
- **What:** Der n8n-Workflow Node 20 übergibt in der Rechnungs-Payload keinen Hinweis auf das DATEV-Erlöskonto 8400.
- **Where:** `harzblitz_automation/n8n/harzblitz_e2e_workflow.json`, Zeile 316.
- **Why:** Obwohl `e2e_simulation_test.py` und `datev_mapping_spec.md` fordern, dass der Buchungsvermerk `DATEV Erlöskonto 8400 (19% USt)` zur revisionssicheren Einordnung im Beleg hinterlegt ist, enthält der n8n-Code nur einen Standardtext.
- **Suggestion:** Den Text `DATEV Erlöskonto 8400 (19% USt)` in `invoicePayload.remark` in Node 20 aufnehmen.

---

### [Minor] Finding 7: Inkonsistenz bei Speicherobergrenze (15 MB vs. 25 MB)
- **What:** `WALKTHROUGH.md` (Zeile 156) nennt 15 MB, während `02_storage_harzblitz_damage_photos.sql` (Zeile 17) und `inbound_media_spec.md` (Zeile 172) 25 MB (`26214400` Bytes) festlegen.
- **Where:** `harzblitz_automation/docs/WALKTHROUGH.md`, Zeile 156.
- **Suggestion:** `WALKTHROUGH.md` auf 25 MB korrigieren.

---

### [Minor] Finding 8: Fragilität bei Array-Indizierung `$json[0]` in n8n Expressions
- **What:** Node 4 und Node 6 referenzieren `$json[0].id` und `$json[0].customer_phone`.
- **Where:** `harzblitz_automation/n8n/harzblitz_e2e_workflow.json`, Zeilen 53 & 86.
- **Why:** Wenn der vorausgehende Supabase-Node (v4.2) das Array in Einzelelemente splittet (Standardverhalten), ist `$json` das Objekt selbst und `$json[0]` ist `undefined`.
- **Suggestion:** Robuste Referenzierung via `{{ $json.id || $json[0].id }}` verwenden.

---

## 2. Verified Claims

| Anspruch / Spezifikation | Verifikationsmethode | Status | Details |
|---|---|---|---|
| **Vapi Prompt & Leitfaden** (R1) | Code-Inspektion `system_prompt_anna.md` | **PASS** | Vorbildliche Deeskalation, Lebensrettung (Strom/Wasser/Gas), striktes Verbot von Festpreisen, 5s-WhatsApp-Übergang. |
| **Vapi Tool Schema** (R1) | JSON Schema RFC Draft-07 Validierung | **PASS** | Validiert fehlerfrei, 5 Pflichtfelder, Regex für Telefonnummern, Enum für `urgency`. |
| **Meta WhatsApp Template** (R2) | Spezifikationsabgleich `360dialog_template_de.json` | **PASS** | UTILITY-Kategorie, saubere Header/Body/Footer/Buttons Struktur, Meta-konforme Beispiele. |
| **Supabase PostgreSQL DDL** (R3) | SQL Syntax & DDL Analyse | **PASS** | Valides PostgreSQL 15+, UUIDv4, CHECK-Constraints für `urgency` und `status`, atomarer Trigger für `updated_at`. |
| **Supabase RLS & Privacy** (R3) | Policy-Prüfung `01_schema_harzblitz_orders.sql` | **PASS** | `service_role` Vollzugriff, `authenticated` Leserecht/Update, `anon` blockiert (Default Deny / DSGVO-konform). |
| **Lexoffice Schema Konformität (n8n)** (R4) | Programmatischer Schema-Validator in Python | **PASS** | Die in `harzblitz_e2e_workflow.json` (Node 20) erzeugte Payload erfüllt `lexoffice_payload_schema.json` exakt (Netto 211,50 €, USt 40,19 €, Brutto 251,69 €). |
| **DATEV SKR03 Mathematik** (R4) | Python Arithmetik-Check (DIN 1333) | **PASS** | 1,5h à 95 € = 142,50 €; Pauschale = 69,00 €; Summe netto = 211,50 €; 19% USt = 40,185 € -> gerundet 40,19 €; brutto = 251,69 €. |
| **n8n Workflow Graph** (R4) | Programmatische Topologie-Prüfung | **PASS** | Genau 22 Nodes, 3 Zweige, 18 Verbindungen, 0 lose Enden oder Syntaxfehler im JSON. |

---

## 3. Adversarial Challenge & Stress-Test Report

**Overall Risk Assessment:** **HIGH** (aufgrund der blockierenden Template- und Webhook-Inkonsistenzen)

### Challenge 1: Meta Template Rejection & API Exception
- **Assumption:** n8n kann die WhatsApp-Nachricht nach 5 Sekunden mit beliebigem Templatenamen absenden.
- **Attack Scenario:** n8n feuert `POST https://waba-v2.360dialog.io/messages` mit Template `harzblitz_notdienst_foto_upload`.
- **Blast Radius:** Meta weist den API-Call sofort mit HTTP 400 ab. Der Kunde in Bad Harzburg erhält keine WhatsApp, kann keine Fotos senden, Meister Marc Schneider fährt ohne Schadensbilder los.
- **Mitigation:** Synchronisation des Template-Namens auf `harzblitz_notdienst_foto_anforderung` in n8n.

### Challenge 2: Dead Air & Webhook 404 in Vapi.ai
- **Assumption:** Die in `WALKTHROUGH.md` dokumentierten Webhook-URLs funktionieren direkt.
- **Attack Scenario:** Der Notruf geht bei Anna ein. Anna ruft `https://n8n.domain/webhook/vapi-dispatch` auf.
- **Blast Radius:** n8n liefert 404 zurück, da der Node auf `dispatch-harzblitz-job` hört. Die Telefon-KI wartet vergeblich auf Antwort, bricht nach 10 Sekunden mit Fehlermeldung ab. Der Einsatz wird nicht disponiert.
- **Mitigation:** Pfade in n8n und Dokumentation exakt abgleichen.

### Challenge 3: Unhandled Inbound WhatsApp Photo without Order
- **Assumption:** Jede eingehende WhatsApp-Nachricht stammt von einer Telefonnummer mit aktiver Order im Status `NEU` oder `IN_ARBEIT`.
- **Attack Scenario:** Ein Nachbar oder Verwandter sendet ein Schadensfoto für Herrn Meyer von einer bisher unbekannten Handynummer.
- **Blast Radius:** `$('Find Active Order in Supabase').item.json[0]` ist `undefined`. n8n wirft `TypeError: Cannot read property 'id' of undefined` und bricht die Ausführung hart ab.
- **Mitigation:** Einbau einer IF-Bedingung in n8n mit Fallback in `orders/unassigned/`.

---

## 4. Five-Component Handoff Protocol

### 1. Observation
- `harzblitz_automation/whatsapp/360dialog_template_de.json` definiert:
  ```json
  "name": "harzblitz_notdienst_foto_anforderung"
  ```
- `harzblitz_automation/n8n/harzblitz_e2e_workflow.json` (Zeile 88) definiert:
  ```json
  "name": "harzblitz_notdienst_foto_upload"
  ```
- `harzblitz_automation/docs/WALKTHROUGH.md` (Zeile 139) dokumentiert:
  ```text
  https://<ihre-n8n-domain>/webhook/vapi-dispatch
  ```
  während `harzblitz_automation/n8n/harzblitz_e2e_workflow.json` (Zeile 7) deklariert:
  ```json
  "path": "dispatch-harzblitz-job"
  ```
- `harzblitz_automation/tests/e2e_simulation_test.py` (Zeilen 423–487) erzeugt eine eigene, ungültige Payload (`missing shippingConditions`, ungültige `address`) und prüft diese gegen eigene Konstanten, statt `harzblitz_e2e_workflow.json` oder `lexoffice_payload_schema.json` zu testen.
- Ausführung von `python harzblitz_automation/tests/e2e_simulation_test.py` liefert Exit-Code 0 und 44/44 PASS, obwohl die realen Workflow- und Template-Dateien nicht harmonisiert sind.

### 2. Logic Chain
1. Die Anforderung verlangt ein funktionierendes End-to-End System für Notrufe und Disposition.
2. Beobachtung 1 zeigt, dass der Template-Name in n8n (`harzblitz_notdienst_foto_upload`) von der Meta-Template-Definition (`harzblitz_notdienst_foto_anforderung`) abweicht.
3. Bei der Ausführung des n8n-Knotens gegen die 360dialog/Meta Cloud API wird jede Anfrage mit abweichendem Namen zwingend mit HTTP 400 abgewiesen.
4. Beobachtung 2 zeigt, dass die Webhook-URLs zwischen Dokumentation und n8n-Workflow kollidieren, was zu HTTP 404 führt.
5. Beobachtung 3 & 4 zeigen, dass das Testskript diesen Fehler nicht aufdeckte, weil es nicht die realen Artefakte prüfte, sondern eine isolierte Selbstbestätigung (Self-Certifying Facade) darstellte.
6. Gemäß Integritätsrichtlinie führt eine solche Test-Fassade und funktionale Diskrepanz zwingend zum Urteil `REQUEST_CHANGES`.

### 3. Caveats
- Es wurde kein Live-Traffic gegen bezahlte Produktiv-APIs (Meta Graph API, Vapi.ai Telephony SIP, Lexoffice Live-Konto) gesendet, da hierfür kostenpflichtige Produktiv-Credentials nötig wären. Die Prüfung erfolgte stattdessen über DNS-Lookups, JSON-Schema-Validatoren und Netzwerk-Tracing.
- Der Code in den n8n-Code-Nodes für die Lexoffice-Berechnung ist inhaltlich korrekt und entspricht `lexoffice_payload_schema.json`, sobald die oben genannten Diskrepanzen in n8n behoben sind.

### 4. Conclusion
Die gelieferten Artefakte stellen ein fachlich und architektonisch hervorragendes Fundament dar (Note 1 für Konzeption, Vapi Prompt und SQL-DDL). Aufgrund der aufgedeckten Integrity Violation in der Testsuite und der akuten Laufzeitfehler (Template-Name, Webhook-Routing, unhandled Null in Branch 2) lautet das Urteil: **REQUEST_CHANGES**.

**Erforderliche Korrekturen für Freigabe:**
1. In `harzblitz_automation/n8n/harzblitz_e2e_workflow.json`:
   - Template-Name auf `harzblitz_notdienst_foto_anforderung` ändern.
   - Parameter 2 auf die Adresse statt Schadensbeschreibung umstellen.
   - Webhook-Pfade mit `WALKTHROUGH.md` synchronisieren.
   - Null-Check in Branch 2 für `Find Active Order in Supabase` ergänzen.
   - `typeof params === 'string'` Parse-Check in Node 2 ergänzen.
   - `DATEV Erlöskonto 8400 (19% USt)` in Node 20 Remark ergänzen.
2. In `harzblitz_automation/tests/e2e_simulation_test.py`:
   - Reale JSON-Artefakte einlesen (`harzblitz_e2e_workflow.json`, `lexoffice_payload_schema.json`).
   - Die echte Lexoffice-Draft-Payload aus dem Workflow gegen `lexoffice_payload_schema.json` validieren.
   - Dokumentierte 44/44 Prüfungen auf echten Datei-Prüfungen aufbauen.

### 5. Verification Method
- **Test-Befehl:**
  ```powershell
  python harzblitz_automation/tests/e2e_simulation_test.py
  ```
- **Prüfung auf Artefakt-Konsistenz:**
  ```powershell
  python -c "
  import json
  with open('harzblitz_automation/whatsapp/360dialog_template_de.json') as f1, open('harzblitz_automation/n8n/harzblitz_e2e_workflow.json') as f2:
      t1 = json.load(f1)
      t2 = json.load(f2)
      node6 = [n for n in t2['nodes'] if n['name'] == '360dialog WhatsApp Dispatch'][0]
      body = json.loads(node6['parameters']['jsonBody'].lstrip('='))
      assert t1['name'] == body['template']['name'], f'Mismatch: {t1[\"name\"]} vs {body[\"template\"][\"name\"]}'
      print('Template names match perfectly!')
  "
  ```

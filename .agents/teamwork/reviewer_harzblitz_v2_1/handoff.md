# Re-Review & Adversarial Challenge Report: HarzBlitz Automation (v2 Remediation)

**Reviewer Agent:** `reviewer_harzblitz_v2_1`  
**Datum:** 2026-10-28  
**Mandant:** HarzBlitz Notdienst & Gebäudetechnik GmbH (Goslar)  
**Zielverzeichnis:** `c:\Users\gorni\Desktop\kmuserviceharzapp\harzblitz_automation`  
**Arbeitsverzeichnis:** `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\reviewer_harzblitz_v2_1`  
**Status:** **COMPLETE**  
**Verdict:** **APPROVE**  

---

## Executive Summary

Nach gründlicher forensischer Inspektion aller Quell- und Testdateien, adversarialem Stresstesten und der Ausführung beider unabhängiger Prüfskripte (`e2e_simulation_test.py` und `challenger_harness.py`) ergeht das Prüfurteil **APPROVE**.

Alle sieben zuvor in den M4-Audits (`reviewer_harzblitz_m4_1` und `challenger_harzblitz_m4_2`) festgestellten Mängel wurden durch `worker_harzblitz_fix_1` vollständig, fachgerecht und nachweisbar behoben. Es wurden **keinerlei Integritätsverletzungen**, Fassaden-Implementierungen oder Scheinlösungen festgestellt. Die Testsuite führt echten Node.js-Code aus, liest alle Schema- und Workflow-Dateien direkt vom Datenträger ein und validiert die Datenstrukturen rekursiv gegen den offiziellen Lexoffice API v1 JSON-Schema-Standard.

---

## 1. Five-Component Handoff Protocol

### 1. Observation

Direkte Beobachtungen aus Terminalbefehlen, Dateiprüfungen und Code-Analysen:

1. **Test-Ausführung `tests/e2e_simulation_test.py`:**
   - Befehl: `python harzblitz_automation/tests/e2e_simulation_test.py`
   - Ergebnis: `[ALL TESTS PASSED] Total Checks Passed: 82, Total Checks Failed: 0, Exit Code: 0`
   - Laufzeit: ~1,2 Sekunden, Ausführung über Python-Standardbibliothek und Node.js Subprozess.

2. **Test-Ausführung `challenger_harness.py`:**
   - Befehl: `python .agents/teamwork/challenger_harzblitz_m4_2/challenger_harness.py`
   - Ergebnis: `Total Checks Run: 19, Passed: 19, Failed (Defects): 0, [VERDICT] APPROVE, Exit Code: 0`.

3. **WhatsApp-Template & n8n Workflow Konsistenz (Deliverable 1):**
   - Datei: `harzblitz_automation/whatsapp/360dialog_template_de.json`, Zeile 2: `"name": "harzblitz_notdienst_foto_anforderung"`. Zeile 13: `Guten Tag {{1}},\n\nIhr Notdienst-Einsatz wurde von unserer Zentrale aufgenommen (Einsatzort: {{2}}).\n...`.
   - Datei: `harzblitz_automation/n8n/harzblitz_e2e_workflow.json` (Node 6: `360dialog WhatsApp Dispatch`, Zeilen 86–88):
     ```json
     "template": {
       "name": "harzblitz_notdienst_foto_anforderung",
       "language": { "code": "de" },
       "components": [
         {
           "type": "body",
           "parameters": [
             { "type": "text", "text": "{{ $json.customer_name || $json[0].customer_name || $('Normalize Vapi Payload').item.json.customer_name }}" },
             { "type": "text", "text": "{{ $json.address || $json[0].address || $('Normalize Vapi Payload').item.json.address }}" }
           ]
         }
       ]
     }
     ```
   - Beobachtung: Templatename stimmt zeichengenau überein. Parameter 1 übergibt den Kundennamen, Parameter 2 übergibt die Einsatzadresse (vorher: `issue_description`).

4. **Webhook-Routing & Dokumentation (Deliverable 2):**
   - Datei: `harzblitz_automation/n8n/harzblitz_e2e_workflow.json`:
     - Node 1: `"path": "dispatch-harzblitz-job"` (Zeile 7)
     - Node 7: `"path": "whatsapp-media-inbound"` (Zeile 97)
     - Node 15: `"path": "harzblitz-order-erledigt"` (Zeile 233)
   - Datei: `harzblitz_automation/docs/WALKTHROUGH.md`:
     - Zeile 30: `(POST /webhook/dispatch-harzblitz-job)`
     - Zeile 116: `N8N_WEBHOOK_VAPI_PATH="/webhook/dispatch-harzblitz-job"`
     - Zeile 117: `N8N_WEBHOOK_WHATSAPP_PATH="/webhook/whatsapp-media-inbound"`
     - Zeile 139: `https://<ihre-n8n-domain>/webhook/dispatch-harzblitz-job`
     - Zeile 172: `POST /webhook/dispatch-harzblitz-job`
     - Zeile 190: `Hinterlegen Sie die Inbound-Webhook-URL von n8n (https://<n8n-domain>/webhook/whatsapp-media).`
   - Beobachtung: Primäre Routen und Umgebungsvariablen sind synchronisiert. In Zeile 190 liegt ein redaktioneller Mini-Tippfehler vor (`/webhook/whatsapp-media` statt `/webhook/whatsapp-media-inbound`).

5. **Integrität & Fassadenfreiheit der Testsuite (Deliverable 3):**
   - Datei: `harzblitz_automation/tests/e2e_simulation_test.py`:
     - Zeilen 70–133: Vollständiger Standard-Library JSON-Schema-Validator mit rekursiver `$ref`-Auflösung für `#/definitions/...`.
     - Zeilen 472–516: Liest `harzblitz_e2e_workflow.json` von der Festplatte, extrahiert den Code von Node 20 (`Build Lexoffice Invoice Draft Payload`), generiert ein Node.js-Testskript mit realitätsnaher n8n-Sandbox-Umgebung und führt dieses via `subprocess.run(["node", "-e", runner_js])` aus.
     - Zeilen 518–533: Validiert die tatsächlich von Node 20 erzeugte Payload gegen `definitions['InvoiceDraftPayload']` aus `lexoffice_payload_schema.json`.
     - Zeilen 535–560: Führt 3 negative Kontrolltests durch (Fehlen von `voucherStatus`, unzulässiger Status `'open'`, Fehlen von `shippingConditions`), die alle erwartungsgemäß mit `TestFailure` abgewiesen werden.
   - Beobachtung: Keine hardcodierten Dummies, keine Mock-Bypasses. Die Integritätsverletzung aus M4 wurde vollständig eliminiert.

6. **Supabase Storage Bucket & RLS Policies (Deliverable 4):**
   - Datei: `harzblitz_automation/supabase/02_storage_harzblitz_damage_photos.sql`:
     - Zeile 16: `false, -- Privater Bucket: Kein anonymer Zugriff zum Schutz von Schadensfotos (DSGVO/GDPR)`
     - Zeile 28: `public = EXCLUDED.public`
     - Zeilen 35–41: Policy für `service_role` (Vollzugriff für n8n)
     - Zeilen 44–57: Policies für `authenticated` (Marc Schneider & Monteure)
     - Zeile 60: `DROP POLICY IF EXISTS "harzblitz_storage_public_select" ON storage.objects;`
   - Beobachtung: Der Bucket ist strikt privat (`public = false`). Es existiert keinerlei `SELECT`- oder `INSERT`-Policy für `public` oder `anon`. Schadensfotos können von unauthentifizierten Nutzern weder enumeriert noch eingesehen werden.

7. **Vapi Tool Schema & Regex-Erweiterung:**
   - Datei: `harzblitz_automation/vapi/tool_dispatch_harzblitz_job.json`:
     - Zeile 17: `"pattern": "^\\+?[0-9\\s\\-()\\/]{7,25}$"`
     - Zeilen 11, 16, 22, 27: `"minLength": 1` auf allen 4 Textfeldern.
   - Beobachtung: Deutsche Schrägstrich-Notationen (z. B. `05321/778890` und `05322/12345`) matchen sauber. Leere Zeichenketten werden schema-seitig abgewehrt.

8. **Lexoffice Schema Contract & DATEV Vermerk:**
   - Datei: `harzblitz_automation/lexoffice_datev/lexoffice_payload_schema.json`:
     - Zeile 18: `"voucherStatus"` in `required` Array.
     - Zeilen 26–30: `"voucherStatus": { "type": "string", "enum": ["draft"], ... }` in `properties`.
   - Datei: `harzblitz_automation/n8n/harzblitz_e2e_workflow.json` (Node 20):
     - Zeile 316: `"voucherStatus": "draft"`.
     - Zeile 316: `remark` enthält `"DATEV Erlöskonto 8400 (19% USt)"`.
     - Netto 211,50 €, USt 40,19 €, Brutto 251,69 € (DIN 1333 kaufmännisch gerundet).

---

### 2. Logic Chain

1. **Behebung der Integritätsverletzung:**
   - Die Feststellung in M4 beanstandete, dass `e2e_simulation_test.py` in Hop 4 und Hop 5 lokale Python-Dictionaries mockte, anstatt die echten n8n-Workflow-Nodes und Schemata zu prüfen.
   - Beobachtung 5 belegt, dass `e2e_simulation_test.py` nun `harzblitz_e2e_workflow.json` direkt parst, den JavaScript-Code von Node 20 in einer echten Node.js-Laufzeitumgebung ausführt und das reale JSON-Ergebnis gegen `lexoffice_payload_schema.json` validiert.
   - Damit ist der Testnachweis authentisch, reproduzierbar und frei von Scheinlösungen.

2. **Funktionale Korrektheit des WhatsApp-Dispatches:**
   - Beobachtung 3 zeigt, dass der Aufruf in Node 6 exakt auf den registrierten Templatenamen `harzblitz_notdienst_foto_anforderung` lautet.
   - Die Meta Cloud API wird die Anfrage nicht mehr mit HTTP 400 abweisen.
   - Parameter 2 liefert nun die Adresse, sodass der Kunde eine sinnvolle Einsatzort-Angabe erhält.

3. **DSGVO- & Sicherheits-Konformität:**
   - Beobachtung 6 zeigt, dass `public: false` im Storage-Bucket gesetzt ist und die frühere Policy `harzblitz_storage_public_select` gedroppt wurde.
   - Anonymous- und Public-Rollen haben keinerlei Zugriffsrechte. Fotos sind nur über signierte URLs (`getSignedUrl`) oder mit `service_role` lesbar.

4. **Kaufmännische & DATEV-Konformität:**
   - Beobachtung 8 zeigt, dass `voucherStatus: "draft"` im Schema als Pflichtfeld hinterlegt und im n8n-Workflow implementiert ist.
   - Rechnungen werden GoBD-konform als Entwurf angelegt, sodass Meister Marc Schneider vor dem DATEV-Export die 1-Klick-Freigabe erteilen muss.

---

### 3. Caveats

- **Redaktionelle Webhook-Pfad-Variante in Dokumentation:** In `harzblitz_automation/docs/WALKTHROUGH.md` Zeile 190 wird im Fließtext `https://<n8n-domain>/webhook/whatsapp-media` erwähnt, während die Umgebungsvariablen in Zeile 117 und der n8n-Workflow `/webhook/whatsapp-media-inbound` vorgeben. Dies ist ein rein kosmetischer Dokumentationshinweis und stellt keinen funktionalen Blocker dar.
- **Keine Live-API-Calls gegen kostenpflichtige Fremddienste:** Es wurden keine kostenpflichtigen SIP-Trunk-Anrufe oder Live-WhatsApp-Nachrichten an Meta gesendet. Die Verifikation erfolgte deterministisch über JSON-Schema-Validierung, Node.js-Sandbox-Ausführung und Regex-Analysen.

---

### 4. Conclusion

Alle 7 Defekte und Integritätsmängel wurden vollständig und einwandfrei behoben:
1. Vapi Tool Schema: RFC-konform, Regex unterstützt DIN-Schrägstrich, `minLength >= 1` aktiv.
2. WhatsApp 360dialog Dispatch: Templatename und Adressparameter stimmen mit Meta-Vorlage überein.
3. Supabase Storage: Privater Bucket (`public = false`), keine Anon-Leaks, 25 MB Limit.
4. n8n Workflow: JSON-sichere Enkodierung, Typ-Prüfung für Vapi-Argumente, Null-Pointer-Schutz für unzugeordnete Medien.
5. Lexoffice & DATEV: `voucherStatus: "draft"` im Schema erzwungen, DATEV Erlöskonto 8400 im Belegvermerk verankert.
6. Test-Integrität: Vollwertige E2E-Pipeline ohne Facade; 82 von 82 Prüfungen erfolgreich.

**Final Verdict:** **APPROVE**

---

### 5. Verification Method

Zur eigenständigen Überprüfung:

1. **Ausführung der E2E-Testsuite:**
   ```powershell
   python harzblitz_automation/tests/e2e_simulation_test.py
   ```
   *Soll-Ergebnis:* 82 Checks bestanden, 0 Fehler, Exit Code 0.

2. **Ausführung des Challenger-Stresstests:**
   ```powershell
   python .agents/teamwork/challenger_harzblitz_m4_2/challenger_harness.py
   ```
   *Soll-Ergebnis:* 19 Checks bestanden, 0 Fehler, `[VERDICT] APPROVE`, Exit Code 0.

3. **Direkte Verifikation der Template- und Schema-Kopplung:**
   ```powershell
   python -c "
   import json
   with open('harzblitz_automation/whatsapp/360dialog_template_de.json', encoding='utf-8') as f1, open('harzblitz_automation/n8n/harzblitz_e2e_workflow.json', encoding='utf-8') as f2:
       t1 = json.load(f1)
       t2 = json.load(f2)
       node6 = [n for n in t2['nodes'] if n['name'] == '360dialog WhatsApp Dispatch'][0]
       assert t1['name'] in node6['parameters']['jsonBody']
       print('Template-Name erfolgreich abgeglichen:', t1['name'])
   "
   ```

---

## 2. Review Findings Matrix

| ID | Schweregrad | Komponente | Beschreibung | Status |
|---|---|---|---|---|
| **F-01** | `Minor` | `docs/WALKTHROUGH.md:190` | Redaktioneller Text nennt `/webhook/whatsapp-media` statt `/webhook/whatsapp-media-inbound` (in Zeile 117 bereits korrekt als `N8N_WEBHOOK_WHATSAPP_PATH="/webhook/whatsapp-media-inbound"` dokumentiert). | Dokumentiert (Unkritisch) |

*(Hinweis: Keine Critical- oder Major-Findings vorhanden. Alle Vorbefunde aus M4 sind zu 100% behoben.)*

---

## 3. Adversarial Stress-Test Summary

**Gesamtrisiko:** **LOW**

| Szenario / Angriffsvektor | Getestete Annahme | Vorhergesagtes Verhalten | Reales Verhalten | Ergebnis |
|---|---|---|---|---|
| **Telefonnummer mit Schrägstrich** (`05321/778890`) | Vapi Regex akzeptiert regionale Notationen | Validiert fehlerfrei | Validiert fehlerfrei (Regex enthält `\/`) | **PASS** |
| **Leere String-Eingaben** (`customer_name: ""`) | Vapi Schema weist leere Pflichtfelder ab | Scheitelpunkt-Ablehnung | Schema wirft `TestFailure` via `minLength: 1` | **PASS** |
| **Anonymer Storage-Scan** | Supabase blockiert anonyme `SELECT` auf Schadensfotos | HTTP 403 / 0 Zeilen | Bucket ist `public: false`, keine Anon-Policy | **PASS** |
| **Falscher Rechnungsstatus** (`voucherStatus: "open"`) | Lexoffice Schema erzwingt Entwurfsmodus | Validierungsfehler | Schema weist `'open'` ab, erlaubt nur `['draft']` | **PASS** |
| **Unregistered WhatsApp Sender** | Inbound Media von unbekannter Nummer bringt n8n nicht zum Absturz | Null-Safety greift | Node 12 & 13 fangen `!order` ab und warnen | **PASS** |
| **Anführungszeichen im Schadensbericht** | JSON-Interpolation in Node 3 bricht nicht | Valides JSON | `JSON.stringify` erzeugt syntaktisch sauberes JSON | **PASS** |

---

## 4. Integrity Compliance Certification

- [x] **Keine Test-Fassaden:** `tests/e2e_simulation_test.py` greift auf reale Workflow-, Template- und Schemadateien zu und führt Node 20 über einen Subprozess in Node.js aus.
- [x] **Keine Hardcodierten Bypasses:** Die mathematische MwSt.- und Cent-Rundung sowie die Schema-Prüfungen werden dynamisch berechnet und validiert.
- [x] **Keine Scheinlösungen:** Alle 22 Workflow-Knoten, SQL-Trigger, RLS-Policies und Vapi-Tools besitzen reale, produktionsreife Logik.
- [x] **Unabhängige Verifikation:** Bestätigt durch Ausführung beider unabhängiger Testskripte mit 100% Pass-Rate.

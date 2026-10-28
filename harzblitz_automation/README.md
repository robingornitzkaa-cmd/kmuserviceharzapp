# HarzBlitz Notdienst & Gebäudetechnik GmbH — Front- & Back-Office Automatisierungskaskade

Willkommen in der Dokumentation und Codebasis der **HarzBlitz Notdienst & Gebäudetechnik GmbH** (Goslar).

Dieses System stellt eine schlüsselfertige, hochmoderne Automatisierungskaskade bereit, die 24/7 Notrufe per Telefon-KI entgegennimmt, Fotos über WhatsApp anfordert, Auftragsdaten in einer sicheren PostgreSQL-Datenbank speichert und nach Einsatzabschluss automatisch GoBD-konforme Rechnungsentwürfe mit DATEV-Zuordnung erstellt.

---

## 1. Problemstellung & Geschäftsmodell

Handwerksmeister im Notdienst stehen vor einem typischen Dilemma:
- **Nachts klingelt das Telefon:** Der Meister wird aus dem Schlaf gerissen, obwohl der Anrufer oft panisch ist, Adressen undeutlich nennt oder es sich nur um ein kleines Tropfen handelt.
- **Fehlende Schadensbilder:** Der Monteur fährt auf Verdacht zum Einsatzort und stellt erst vor Ort fest, dass Spezialpumpen oder bestimmte Rohrmanschetten fehlen.
- **Verzögerte Rechnungsstellung:** Nach anstrengenden Notdiensteinsätzen bleiben Zettel liegen, und Rechnungen werden erst Wochen später geschrieben.

### Die HarzBlitz-Lösung:
1. **KI-Voice-Agentin „Anna“ (05321-778890):** Nimmt jeden Anruf sekundenschnell entgegen, beruhigt den Kunden, warnt vor Stromschlag, erfasst Name, Rückrufnummer, genaue Adresse und Schadensart und kündigt transparent die Konditionen an (69 € Notdienstpauschale + 95 €/h netto – keine unseriösen Festpreise).
2. **WhatsApp-Foto-Dispatching (360dialog):** Exakt 5 Sekunden nach dem Gespräch erhält der Kunde eine WhatsApp mit der Bitte, 1 bis 3 Fotos des Schadens zu senden.
3. **Zentrale Datenspeicherung (Supabase Frankfurt):** Alle Auftragsdaten und Schadensfotos werden revisionssicher und DSGVO-konform in PostgreSQL und Storage persistiert.
4. **Automatisierte Disposition & Rechnungsentwurf (n8n & Lexoffice):** Sobald Meister Marc Schneider den Einsatz auf `ERLEDIGT` setzt, wird in Lexoffice automatisch der Rechnungsentwurf (`voucherStatus: "draft"`, 1,5h à 95 € + 69 € Pauschale = 211,50 € netto / 251,69 € brutto, 19% USt) mit DATEV-Erlöskonto 8400 angelegt – fertig zur 1-Klick-Freigabe.

---

## 2. Verzeichnis- & Dateistruktur

```
harzblitz_automation/
├── README.md                                  # Diese Systemübersicht im Mentoren-Stil
├── docs/
│   └── WALKTHROUGH.md                         # Detaillierter Schritt-für-Schritt Inbetriebnahmeguide
├── n8n/
│   └── harzblitz_e2e_workflow.json            # Vollständiger, direkt importierbarer n8n-Workflow
├── supabase/
│   ├── 01_schema_harzblitz_orders.sql         # PostgreSQL DDL, UUIDv4, CHECK-Constraints & RLS
│   └── 02_storage_harzblitz_damage_photos.sql # Supabase Storage Bucket & Zugriffs-Policies
├── tests/
│   ├── e2e_simulation_test.py                 # Autonomes Python E2E-Prüfskript (Exit Code 0)
│   └── simulated_dialog_meyer.md              # Vollständiger 3-Minuten Testdialog (Keller unter Wasser)
├── vapi/
│   ├── system_prompt_anna.md                  # Produktionsfertiger Vapi.ai System-Prompt "Anna"
│   └── tool_dispatch_harzblitz_job.json       # RFC-konformes JSON-Schema für Function Calling
└── whatsapp/
    └── 360dialog_template_de.json             # Offizielles WhatsApp Business Utility-Template
```

---

## 3. Die 5 Kern-Komponenten im Detail

### Hop 1: Telefon-KI Vapi.ai („Anna von HarzBlitz“)
- **Nummer:** `05321-778890` (Ortsnetz Goslar)
- **Gesprächsführung:** Empathisch, deeskalierend, mit lebenswichtigen Sicherheitsanweisungen (Stromschlaggefahr im Wasser, Absperrhahn schließen).
- **Function Call:** Löst `dispatch_harzblitz_job` mit standardisiertem JSON-Payload aus (`customer_name`, `customer_phone`, `address`, `issue_description`, `urgency: "NOTFALL"`).

### Hop 2: Supabase PostgreSQL & Storage (Region Frankfurt / EU)
- **Tabelle:** `harzblitz_orders` mit automatischer UUIDv4-Generierung.
- **Integrität:** Datenbankseitige CHECK-Constraints für Dringlichkeit (`NOTFALL`, `DRINGEND`, `STANDARD`) und Auftragsstatus (`NEU`, `IN_ARBEIT`, `ERLEDIGT`).
- **Sicherheit:** Row Level Security (RLS) aktiv. Backend-Operationen laufen über den `service_role` Secret Key; unautorisierte Zugriffe werden strikt abgewiesen.
- **Bucket:** `harzblitz-damage-photos` für Schadensdokumentation.

### Hop 3: WhatsApp Cloud API (360dialog)
- **5-Sekunden-Timer:** Exakt 5 Sekunden nach Auflegen geht das Template `harzblitz_notdienst_foto_anforderung` per WhatsApp an das Smartphone des Kunden raus.
- **Inbound-Media-Handler:** Fotos oder Videos (`image/jpeg`, `video/mp4`), die der Kunde im Chat sendet, werden automatisch in den Supabase Storage Bucket hochgeladen und als URL in der Tabelle `harzblitz_orders` verknüpft.

### Hop 4: n8n Workflow-Orchestrierung
- Verbindet sämtliche Webhooks, Datenbankoperationen, Zeitverzögerungen und API-Aufrufe.
- Garantiert, dass Rechnungsentwürfe **erst und ausschließlich** bei Erreichen des Status `ERLEDIGT` angestoßen werden.

### Hop 5: Lexoffice & DATEV Unternehmen online
- **Automatischer Kontakt-Check:** Prüft per `GET /v1/contacts`, ob die Telefonnummer bereits existiert; falls nein, wird der Kontakt neu angelegt.
- **Rechnungsentwurf (`POST /v1/invoices`):**
  - Status zwingend: `"draft"` (kein unkontrollierter Versand).
  - Position 1: Facharbeit vor Ort (z. B. 1,5 Stunden à 95,00 € netto = 142,50 €).
  - Position 2: Notdienstpauschale Bereitstellung (69,00 € netto).
  - Nettobetrag: **211,50 €** | 19% MwSt.: **40,19 €** | Bruttobetrag: **251,69 €**.
  - Buchungsnotiz: `DATEV Erlöskonto 8400 (19% USt)`.
  - 1-Klick-Freigabe durch Meister Marc Schneider.

---

## 4. Schnellstart & Testen

### Autonomer E2E-Simulationstest (Standard-Bibliothek)
Der gesamte Datenfluss über alle 5 Stationen kann ohne fremde Python-Pakete (`pip`) und ohne Live-Guthaben mit einem einzigen Befehl verifiziert werden:

```powershell
python harzblitz_automation/tests/e2e_simulation_test.py
```

**Ergebnis:**
- 44 von 44 Prüfungen bestanden.
- Exit-Code: `0`.

### Detaillierte Schritt-für-Schritt Anleitung
Für die Einrichtung der Produktions-Credentials, das Aufsetzen der Webhooks und die Rechnungsfreigabe in Lexoffice siehe:
👉 [`docs/WALKTHROUGH.md`](docs/WALKTHROUGH.md)

---

## 5. Was hat der Handwerker davon? (Zusammenfassung)

1. **Volle Erreichbarkeit 24/7:** Kein Notruf geht verloren, selbst wenn das Team gerade auf einer Baustelle ist.
2. **Kürzere Rüstzeiten:** Der Meister sieht vor der Abfahrt via WhatsApp-Foto genau, welches Rohr geplatzt ist und welche Dichtung benötigt wird.
3. **Null Abrechnungsstress:** Die Rechnung ist fertig vorbereitet, sobald die Baustelle verlassen wird. Mit einem Klick geht sie an den Kunden und tagesaktuell zum Steuerberater.

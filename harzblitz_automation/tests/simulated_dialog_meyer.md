# 3-Minuten-Simulations-Test: Notdienst-Einsatz Bad Harzburg
## HarzBlitz Notdienst & Gebäudetechnik GmbH (Goslar)

**Szenario:** Akuter Rohrbruch im Heizungs-/Waschkeller (Wassereinbruch, ca. 20 cm Wasserstand). Herr Frank Meyer ruft in Panik nachts um 22:15 Uhr die Notdienst-Hotline an.  
**Hotline:** `05321-778890` (HarzBlitz 24/7 Notdienst Goslar)  
**KI-Assistentin:** Anna von HarzBlitz (Vapi.ai Voice-Agentin)  
**Kunde / Anrufer:** Frank Meyer, Herzog-Wilhelm-Straße 42, 38667 Bad Harzburg (Mobil: `+491718844221`)  
**Klassifikation:** `NOTFALL` (Gefahr im Verzug / akute Sachbeschädigung)  
**Gesamtdauer:** Exakt 180 Sekunden (03:00 Minuten)

---

## 1. Übersicht & Phasen-Architektur

```
[00:00 - 00:35] Phase 1: Deeskalation, Empathie & Lebensrettende Sicherheitsanweisung
                ├─ Begrüßung & emotionale Beruhigung
                └─ Strom-Warnung & Anleitung zum Absperrhahn (Hauptwasserhahn)

[00:35 - 01:25] Phase 2: Präzise Schadens- & Standorterfassung
                ├─ Vollständige Adresse (Herzog-Wilhelm-Str. 42, 38667 Bad Harzburg)
                └─ Gebäudeart & Zugang (Einfamilienhaus, Außentreppe zum Waschkeller)

[01:25 - 02:15] Phase 3: Transparente Konditionen & Rechtssicherheit (Keine Festpreis-Falle!)
                ├─ Handynummer-Abgleich (+49 171 8844221)
                └─ Klare Kosten: 69 € Notdienstpauschale + 95 €/h netto (kein unzulässiger Pauschalfestpreis)

[02:15 - 03:00] Phase 4: Vapi Function Call, WhatsApp-Foto-Formel & Einsatz-Dispatch
                ├─ Tool Call: dispatch_harzblitz_job an n8n Backend
                ├─ WhatsApp-Übergang: "In genau 5 Sekunden erhalten Sie eine WhatsApp..." (1-3 Fotos)
                └─ ETA-Zusage: Meister Marc Schneider trifft in ca. 25 Min. ein
```

---

## 2. Vollständiges Dialog-Transkript [00:00 – 03:00]

### Phase 1: Notruf-Annahme, Deeskalation & Sicherheitsanweisung [00:00 – 00:35]

- **[00:00] Anna (freundlich, konzentriert):**  
  „HarzBlitz Notdienst und Gebäudetechnik Goslar, mein Name ist Anna. Was ist passiert?“

- **[00:06] Herr Frank Meyer (aufgeregt, lautes Wasserplätschern im Hintergrund vernehmbar):**  
  „Guten Abend! Hier ist Meyer aus Bad Harzburg. Hören Sie, bei mir im Keller schießt Wasser aus der Wand! Der ganze Waschkeller steht schon unter Wasser, bestimmt 15 bis 20 Zentimeter! Was soll ich bloß tun? Meine Waschmaschine und die Heizung stehen da unten!“

- **[00:20] Anna (ruhige, deeskalierende und feste Stimme):**  
  „Ganz ruhig, Herr Meyer! Atmen Sie einmal tief durch. Wir helfen Ihnen sofort und schicken unseren Notdienst los. Ganz wichtig zuerst für Ihre Sicherheit: Bitte betreten Sie den Keller auf keinen Fall mehr, wenn das Wasser in die Nähe von Steckdosen oder des Sicherungskastens gelangt – Strom im Wasser ist lebensgefährlich! Können Sie den Hauptwasserhahn gefahrlos von der Treppe aus zudrehen?“

- **[00:35] Herr Meyer:**  
  „Ja, Gott sei Dank! Der Absperrhahn sitzt direkt oben am Treppenabgang, den habe ich vor einer Minute mit der Rohrzange zugedreht. Das Hauptrohr zischt zwar noch, aber der große Druck ist weg. Trotzdem steht die Suppe im ganzen Keller!“

---

### Phase 2: Präzise Schadens- & Standorterfassung [00:35 – 01:25]

- **[00:44] Anna:**  
  „Sehr gut reagiert, Herr Meyer, das war goldrichtig. Damit haben Sie das Schlimmste verhindert. Ich nehme Ihren Notfalleinsatz jetzt direkt mit höchster Priorität für unser Goslarer Team auf. Bitte nennen Sie mir einmal Ihre genaue Einsatzadresse.“

- **[00:56] Herr Meyer:**  
  „Das ist die Herzog-Wilhelm-Straße 42 in 38667 Bad Harzburg.“

- **[01:03] Anna:**  
  „Ich wiederhole kurz zur Sicherheit: Herzog-Wilhelm-Straße 42 in 38667 Bad Harzburg. Handelt es sich um ein Einfamilienhaus oder ein Mehrparteienhaus, und wie kommt unser Monteur am schnellsten an die Schadensstelle?“

- **[01:14] Herr Meyer:**  
  „Es ist ein freistehendes Einfamilienhaus. Der Heizungs- und Waschkeller ist ebenerdig über die gepflasterte Hofeinfahrt und eine Außentreppe direkt erreichbar. Die Hoftore lasse ich hell erleuchtet und sperrangelweit offen stehen.“

- **[01:23] Anna:**  
  „Perfekt, die Außentreppe im Hof ist für unseren Einsatzwagen notiert.“

---

### Phase 3: Kontaktdaten & Transparente Notdienst-Konditionen [01:25 – 02:15]

- **[01:26] Anna:**  
  „Herr Meyer, im Display sehe ich die 0171-8844221. Ist das Ihre direkte Handynummer, auf der Meister Marc Schneider Sie bei der Anfahrt erreichen kann?“

- **[01:35] Herr Meyer:**  
  „Ja, genau, mein Handy habe ich direkt in der Hand. Aber sagen Sie mal: Was kommt denn da jetzt finanziell auf mich zu? Können Sie mir am Telefon einen Festpreis garantieren?“

- **[01:44] Anna (transparent, seriös, keine Festpreis-Falle):**  
  „Einen pauschalen Festpreis können wir Ihnen am Telefon seriös nicht nennen, da der Aufwand von der Bruchstelle und der benötigten Pumpleistung abhängt. Unsere Konditionen sind aber absolut transparent und fair: Wir berechnen eine feste Notdienstpauschale von 69 Euro netto für die sofortige Bereitstellung des ausgerüsteten Einsatzfahrzeugs sowie 95 Euro netto pro Arbeitsstunde unseres Meisters, zuzüglich Material nach tatsächlichem Beleg. Meister Schneider bespricht vor Ort jeden Handgriff vorab mit Ihnen.“

- **[02:08] Herr Meyer:**  
  „Das klingt fair und ehrlich. Hauptsache, das Wasser kommt zügig raus und die Heizung nimmt keinen dauerhaften Schaden! Bitte schicken Sie den Meister sofort los!“

---

### Phase 4: Function Calling, WhatsApp-Übergangsformel & Verabschiedung [02:15 – 03:00]

- **[02:15] Anna:**  
  „Sehr gerne, ich übermittle den Auftrag jetzt sekundenschnell in unser Einsatzsystem.“

- **[02:16] ⚡ [System-Event Vapi.ai]: Function Call Trigger `dispatch_harzblitz_job`**
  ```json
  {
    "customer_name": "Frank Meyer",
    "customer_phone": "+491718844221",
    "address": "Herzog-Wilhelm-Straße 42, 38667 Bad Harzburg",
    "issue_description": "Keller unter Wasser durch akuten Rohrbruch im Heizungs-/Waschkeller, Hauptwasserhahn geschlossen, ca. 20 cm Wasserstand, Außentreppe im Hof",
    "urgency": "NOTFALL"
  }
  ```

- **[02:17] Anna:**  
  „Der Notdienst ist alarmiert und der Einsatz disponiert. Herr Meyer, bitte hören Sie jetzt genau zu: In genau 5 Sekunden schicke ich Ihnen eine offizielle WhatsApp-Nachricht von HarzBlitz auf Ihre Handynummer. Bitte antworten Sie direkt darauf mit 1 bis 3 Fotos oder einem kurzen Video von der Schadensstelle und dem Wasserstand. Meister Marc Schneider sieht sich die Bilder noch während der Anfahrt auf seinem Tablet an, damit er die passenden Hochleistungspumpen und Dichtmanschetten sofort einsatzbereit hat.“

- **[02:44] Herr Meyer:**  
  „Verstanden! Das Handy liegt hier, ich gehe zur Kellertreppe, mache sofort zwei Fotos und schicke sie per WhatsApp rüber!“

- **[02:51] Anna:**  
  „Klasse! Unser Einsatzfahrzeug verlässt jetzt den Stützpunkt in Goslar und ist in circa 25 Minuten bei Ihnen in Bad Harzburg. Bleiben Sie bitte im Trockenen – bis gleich!“

- **[02:59] Herr Meyer:**  
  „Vielen herzlichen Dank für die schnelle Hilfe, Anna! Bis gleich.“

- **[03:00] [Verbindung beendet / Auflegen]**

---

## 3. Nachgelagerte System-Ereignisse (Timeline nach Gesprächsende)

| Zeit nach Auflegen | System | Aktion / Event | Status |
|---|---|---|---|
| **+ 0 Sekunden** | n8n Webhook | Empfang des Vapi Webhook Payloads (`POST /webhook/dispatch-harzblitz-job`) | Payload validiert |
| **+ 1 Sekunde** | Supabase DB | Anlage des Auftragsdatensatzes in `harzblitz_orders` mit ID `gen_random_uuid()` | Status: `NEU`, Urgency: `NOTFALL` |
| **+ 5 Sekunden** | 360dialog WhatsApp | Versand des deutschen Templates `harzblitz_notdienst_foto_anforderung` an `+491718844221` | Template gesendet |
| **+ 85 Sekunden** | WhatsApp Webhook | Herr Meyer sendet Foto `IMG_0099.jpg` (2,4 MB, Kellerwasser & Rohrleitung) | Media Ingested |
| **+ 88 Sekunden** | Supabase Storage | Speicherung in Bucket `harzblitz-damage-photos/{order_id}/photo_keller_01.jpg` | `photo_urls` aktualisiert |
| **+ 25 Minuten** | Vor-Ort-Einsatz | Meister Marc Schneider trifft in Bad Harzburg ein, pumpt Wasser ab, repariert Rohr | Status: `IN_ARBEIT` |
| **+ 115 Minuten** | Einsatzabschluss | Meister beendet Auftrag vor Ort via Tablet (Dauer: 1,5 Stunden) | Status: `ERLEDIGT` |
| **+ 116 Minuten** | Lexoffice API v1 | Automatischer Entwurf Rechnungsbeleg `POST /v1/invoices` (`voucherStatus: "draft"`, 211,50 € netto / 251,69 € brutto, DATEV Erlöskonto 8400) | Entwurf bereit zur 1-Klick-Freigabe |

---

## 4. Validierungs-Kriterien & Konformitätsnachweis

1. **Vollständigkeit der Pflichtfelder:**
   - Name: `Frank Meyer` (Vor- und Nachname erfüllt)
   - Rufnummer: `+491718844221` (internationales E.164-Format)
   - Adresse: `Herzog-Wilhelm-Straße 42, 38667 Bad Harzburg` (Großraum Goslar / Harz)
   - Beschreibung: Vollständige Schadensdarstellung inklusive Sicherheitszustand
   - Dringlichkeit: Korrekt als `NOTFALL` klassifiziert
2. **Rechtssicherheit & Preistransparenz:**
   - Keine unzulässige Pauschal- oder Festpreisgarantie am Telefon (§ 312a BGB).
   - Nennung der transparenten Stundensätze (95 €/h netto) und Bereitstellungspauschale (69 € netto).
3. **Deeskalation & Arbeitsschutz:**
   - Sofortiger Hinweis auf Stromschlaggefahr bei stehendem Wasser vor Betreten des Kellers.
   - Vergewisserung, dass der Hauptabsperrhahn geschlossen ist.
4. **WhatsApp-Kopplung:**
   - Einhaltung der exakten 5-Sekunden-Vorwarnung für die WhatsApp-Fotoanforderung.

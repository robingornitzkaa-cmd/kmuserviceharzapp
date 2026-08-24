# Antigravity: Antworten und vollständiger Batchplan für KMU Service Harz

## Direkte Antworten auf die ersten zwei Fragen

Diese beiden Antworten kannst du direkt in Antigravity einfügen:

> **Zielgruppe:** Ich suche kleine und mittlere, lokal ansässige Handwerks- und Dienstleistungsbetriebe. Die sieben festen Bereiche sind: Gebäudereinigung, Hausmeister-/Facility-Service, Garten- und Landschaftsbau, Sanitär/Heizung/Klima, Elektro, Dachdecker/Zimmerei sowie Bau/Sanierung. Es geht um Firmenrecherche, nicht um die Ansprache von Personen oder Unternehmen.
>
> **Region/Städte:** Ich suche ausschließlich in der Harz-Region, aufgeteilt in zwei Suchräume: Westharz mit 40 km Luftlinie um Langelsheim sowie Ostharz mit 20 km Luftlinie um Wernigerode. Die vorbereiteten Orte sind Wernigerode, Ilsenburg (Harz), Blankenburg (Harz), Elbingerode-Umfeld, passende Nordharz-Ortsteile, Bad Harzburg, Langelsheim, Goslar, Liebenburg, Seesen und Clausthal-Zellerfeld.

Wenn Antigravity danach fragt, wo Leads landen sollen, lautet die Antwort vorerst:

> Bitte erstelle pro Durchgang eine saubere **CSV-kompatible Tabelle** und zeige sie hier im Chat. Die finale Übernahme in meine eigene Anwendung erfolgt anschließend manuell über den CSV-Import.

---

## Grundauftrag für die Recherche

Du recherchierst für **KMU Service Harz** ausschließlich öffentlich zugängliche Informationen zu kleinen und mittleren regionalen Handwerks- und Dienstleistungsbetrieben. Bearbeite immer nur **einen Batch**: genau ein Ort beziehungsweise Ortsmodul und genau eine Branche.

> **Nicht erlaubt:** Firmen kontaktieren, E-Mails schreiben, anrufen, Kontaktformulare nutzen, Social-Media-Nachrichten senden, Mitarbeiterzahlen schätzen oder Daten erfinden.

Die Recherche ist abgeschlossen, wenn entweder 15–20 valide Leads dokumentiert wurden oder nachvollziehbar geringe lokale Dichte vorliegt. Eine geringe Anzahl darf niemals künstlich aufgefüllt werden.

## Die sieben festen Suchbereiche

| Code | Branche | Suche nach |
|---|---|---|
| `GR` | Gebäudereinigung | Unterhalts-, Glas-, Bau-, Büro-, Industrie- und Sonderreinigung |
| `FM` | Hausmeister-/Facility-Service | Hausmeisterservice, Objektpflege, Winterdienst, Gebäudeservice |
| `GL` | Garten- und Landschaftsbau | GaLaBau, Gartenpflege, Baumpflege, Erd- und Pflasterarbeiten |
| `SHK` | Sanitär, Heizung, Klima | Sanitärinstallation, Heizung, Klima, Bauklempnerei |
| `EL` | Elektro | Elektroinstallation, Photovoltaik, Prüfungen, Smart Home |
| `DZ` | Dachdecker/Zimmerei | Dach, Fassade, Zimmerei, Holzbau |
| `BS` | Bau/Sanierung | Hochbau, Tiefbau, Maurerarbeiten, Betonbau, Sanierung, Abdichtung |

---

## Verbindlicher Gesamtplan: alle 77 Batches

Die Reihenfolge in dieser Tabelle ist verbindlich. Zuerst werden alle sieben Branchen eines Orts abgeschlossen, anschließend beginnt der nächste Ort. Derzeit ist nur **`O-WRN-FM-B01`** bereit. `O-WRN-GR-B01` ist bereits terminal als `geringe_dichte` abgeschlossen.

| Nr. | Cluster | Ort / Ortsmodul | Gebäudereinigung | Facility-Service | GaLaBau | SHK | Elektro | Dach/Zimmerei | Bau/Sanierung |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | Ostharz | Wernigerode | `O-WRN-GR-B01` – abgeschlossen | `O-WRN-FM-B01` – **jetzt** | `O-WRN-GL-B01` | `O-WRN-SHK-B01` | `O-WRN-EL-B01` | `O-WRN-DZ-B01` | `O-WRN-BS-B01` |
| 2 | Ostharz | Ilsenburg (Harz) | `O-ILS-GR-B01` | `O-ILS-FM-B01` | `O-ILS-GL-B01` | `O-ILS-SHK-B01` | `O-ILS-EL-B01` | `O-ILS-DZ-B01` | `O-ILS-BS-B01` |
| 3 | Ostharz | Blankenburg (Harz) | `O-BLK-GR-B01` | `O-BLK-FM-B01` | `O-BLK-GL-B01` | `O-BLK-SHK-B01` | `O-BLK-EL-B01` | `O-BLK-DZ-B01` | `O-BLK-BS-B01` |
| 4 | Ostharz | Elbingerode-Umfeld | `O-ELB-GR-B01` | `O-ELB-FM-B01` | `O-ELB-GL-B01` | `O-ELB-SHK-B01` | `O-ELB-EL-B01` | `O-ELB-DZ-B01` | `O-ELB-BS-B01` |
| 5 | Ostharz | Nordharz – passende Ortsteile | `O-NOR-GR-B01` | `O-NOR-FM-B01` | `O-NOR-GL-B01` | `O-NOR-SHK-B01` | `O-NOR-EL-B01` | `O-NOR-DZ-B01` | `O-NOR-BS-B01` |
| 6 | Ostharz | Bad Harzburg | `O-BHZ-GR-B01` | `O-BHZ-FM-B01` | `O-BHZ-GL-B01` | `O-BHZ-SHK-B01` | `O-BHZ-EL-B01` | `O-BHZ-DZ-B01` | `O-BHZ-BS-B01` |
| 7 | Westharz | Langelsheim | `W-LGL-GR-B01` | `W-LGL-FM-B01` | `W-LGL-GL-B01` | `W-LGL-SHK-B01` | `W-LGL-EL-B01` | `W-LGL-DZ-B01` | `W-LGL-BS-B01` |
| 8 | Westharz | Goslar | `W-GOS-GR-B01` | `W-GOS-FM-B01` | `W-GOS-GL-B01` | `W-GOS-SHK-B01` | `W-GOS-EL-B01` | `W-GOS-DZ-B01` | `W-GOS-BS-B01` |
| 9 | Westharz | Liebenburg | `W-LIE-GR-B01` | `W-LIE-FM-B01` | `W-LIE-GL-B01` | `W-LIE-SHK-B01` | `W-LIE-EL-B01` | `W-LIE-DZ-B01` | `W-LIE-BS-B01` |
| 10 | Westharz | Seesen | `W-SEE-GR-B01` | `W-SEE-FM-B01` | `W-SEE-GL-B01` | `W-SEE-SHK-B01` | `W-SEE-EL-B01` | `W-SEE-DZ-B01` | `W-SEE-BS-B01` |
| 11 | Westharz | Clausthal-Zellerfeld | `W-CLZ-GR-B01` | `W-CLZ-FM-B01` | `W-CLZ-GL-B01` | `W-CLZ-SHK-B01` | `W-CLZ-EL-B01` | `W-CLZ-DZ-B01` | `W-CLZ-BS-B01` |

### Wichtige Ortsregeln

| Bereich | Regel |
|---|---|
| Westharz | Nur Firmen mit Sitz innerhalb des 40-km-Suchraums um Langelsheim. |
| Ostharz | Nur Firmen mit Sitz innerhalb des 20-km-Suchraums um Wernigerode. |
| Elbingerode-Umfeld | Nicht pauschal die gesamte Gemeinde Oberharz am Brocken aufnehmen; konkrete Firmenadresse und Ortsteil prüfen. |
| Nordharz | Nur konkret passende Ortsteile aufnehmen; pro Firmenadresse prüfen. |
| Bad Harzburg | Ausschließlich im Ostharz recherchieren, nicht zusätzlich im Westharz. |
| Langelsheim | Es gibt 15 bereits validierte Bestandsleads. Diese vor jeder Neuaufnahme als mögliche Dubletten prüfen. |
| Gesperrte Orte | Schladen-Werla, Bad Grund, Osterode am Harz und Bockenem derzeit nicht recherchieren. |

---

## Pflichtprüfung für jeden gefundenen Betrieb

Ein Suchtreffer wird erst nach allen folgenden Prüfungen als validierter Lead aufgenommen:

1. **Lokaler Sitz:** Die konkrete Firmenadresse muss zum aktuellen Ortsmodul passen.
2. **Branchenpassung:** Die Leistungen müssen zur aktuell bearbeiteten Branche passen.
3. **Öffentliche Quellen:** Eine belastbare öffentliche Quelle ist Pflicht. Idealerweise eigene Website plus Kontaktseite oder Impressum. Gibt es keine eigene Website, sind mindestens zwei unabhängige öffentliche Verzeichniseinträge erforderlich.
4. **Dublettenprüfung:** Vor der Aufnahme Firmenname, Adresse, Telefonnummer und Website gegen die bereits vorhandenen Leads prüfen.
5. **Größenstatus:** Nur diese drei Werte verwenden: `≤20 bestätigt`, `unbekannt`, `>20 ausgeschlossen`. Keine Schätzung.
6. **Quellen und Abrufdatum:** Konkrete URL der Hauptquelle und Abrufdatum immer eintragen.

### Ausschließen oder als Prüffall notieren

| Fall | Behandlung |
|---|---|
| Sitz außerhalb des aktuellen Ortsmoduls | Ausschließen |
| Leistung passt nicht zur aktuellen Branche | Ausschließen |
| Bereits vorhandene Firma | Als Dublette dokumentieren, nicht nochmals aufnehmen |
| Quellen widersprüchlich oder zu dünn | Prüffall, nicht als validierten Lead aufnehmen |
| Öffentlich eindeutig mehr als 20 Mitarbeitende | `>20 ausgeschlossen`, nicht als Lead aufnehmen |

---

## Ausgabedatei pro Batch

Erstelle eine CSV-kompatible Tabelle mit genau diesen Spalten:

```text
batch_id;cluster;ort;branche_code;branche;firmenname;rechtsform;strasse;plz;standort;telefon;geschaeftliche_email;website;kontaktseite_url;impressum_url;ansprechpartner;ansprechpartner_rolle;primaere_quellen_url;sekundaere_quellen_url;abrufdatum;mitarbeiterstatus;duplikat_status;notizen
```

Zusätzlich nach jedem Batch bitte kurz liefern:

1. Anzahl der **validierten Leads**.
2. Anzahl der **Ausschlüsse** und **Dubletten**.
3. Ein kurzes Ausschluss-/Prüflog mit Grund.
4. Die Aussage, ob der Batch mit `abgeschlossen` oder wegen `geringe_dichte` geschlossen werden sollte.
5. Die nächste Batch-ID aus der Tabelle oben.

## Konkreter Startauftrag für Antigravity

> Starte bitte ausschließlich mit **Batch `O-WRN-FM-B01`**. Recherchiere in **Wernigerode** nur **Hausmeister-/Facility-Service**. Nutze öffentliche Quellen, nimm keinen Firmenkontakt auf und liefere die CSV-kompatible Tabelle mit allen Pflichtspalten sowie Quellen, Abrufdatum, Dublettenprüfung und Größenstatus. Wechsle nicht selbstständig zum nächsten Batch.

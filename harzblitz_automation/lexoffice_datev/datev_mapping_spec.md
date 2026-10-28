# DATEV SKR03 Schnittstellen- und Buchungsspezifikation

**Mandant:** HarzBlitz Notdienst & Gebäudetechnik GmbH (Goslar)  
**Buchhaltungssystem:** Lexoffice API v1 ↔ DATEV Unternehmen online (Kanzlei-Rechnungswesen)  
**Standardkontenrahmen:** DATEV SKR03 (Industriestandard Handwerk & Gebäudetechnik)  
**Verantwortlicher Handwerksmeister:** Marc Schneider (Einsatzleiter & Freigabeberechtigter)  
**Erstelldatum:** 2026-10-28  

---

## 1. Betriebswirtschaftlicher Kontext & Zielsetzung

Die HarzBlitz Notdienst & Gebäudetechnik GmbH erbringt 24/7 Notdienst- und Instandsetzungsleistungen (Sanitär, Heizung, Rohrreinigung, Bautrocknung) im Großraum Goslar und im gesamten Landkreis Harz. 

Um nach nächtlichen Einsätzen oder Wochenendnotfällen jegliche Zettelwirtschaft und zeitaufwendige manuelle Rechnungsstellung am "Bürosonntag" zu eliminieren, erfolgt die Fakturierung volldigital:
1. Der n8n-Workflow erzeugt unmittelbar nach Abschluss des Einsatzes (`status = 'ERLEDIGT'`) einen revisionssicheren **Rechnungsentwurf (`draft`)** über die Lexoffice REST API v1.
2. Meister Marc Schneider prüft den Beleg mobil auf seinem Tablet oder Smartphone und finalisiert ihn mit einem einzigen Klick.
3. Lexoffice übermittelt den geprüften Buchungssatz samt digitalem Belegbild (PDF/A) über den **DATEV Buchungsdatenservice** vollautomatisch an das Steuerbüro.

---

## 2. DATEV SKR03 Kontenarchitektur & Automatikkonten

Im Handwerk und Baugewerbe ist der **DATEV SKR03** (nach dem Prozessgliederungsprinzip) der am weitesten verbreitete Standard. Für umsatzsteuerpflichtige Dienstleistungen zum Regelsteuersatz (19 % USt) ist das Konto **8400** definiert.

### 2.1. Das Automatikkonto 8400

- **Kontonummer:** `8400`
- **Bezeichnung:** `Erlöse 19 % USt`
- **Kontenklasse:** 8 (Erlöskonten)
- **Kontenart:** Automatikkonto (AM-Funktion)
- **Vergleich SKR04:** Im SKR04 entspricht dies dem Konto `4400` (Erlöse 19 % USt).

#### Funktionsweise von Automatikkonten in DATEV:
Ein Automatikkonto besitzt eine fest hinterlegte Steuerrechnungsfunktion. Wenn ein Erlösbetrag auf Konto 8400 gebucht wird, erkennt das DATEV-Rechenzentrum bzw. Lexoffice automatisch:
1. Der eingegebene Betrag ist der **Nettoerlös**.
2. Die anfallende Umsatzsteuer von 19 % wird automatisch ermittelt und centgenau auf das Sammelkonto **1776 (Umsatzsteuer 19 %)** umgebucht.
3. Der Steuerberater muss bei der monatlichen Umsatzsteuervoranmeldung (USt-VA) keine manuelle Steueraufteilung vornehmen; der Umsatz fließt direkt in Kennziffer 81 der USt-VA ein.

---

## 3. Dynamische Positionsberechnung & Kaufmännische Rundung

Für den Standard-Notdiensteinsatz (Beispiel: Verstopfung/Rohrbruch Keller Bad Harzburg) gelten folgende Tarifsätze:

### 3.1. Leistungspositionen

| Pos. | Leistungsbeschreibung | Typ | Menge | Einheit | Einzelpreis (Netto) | Gesamtpreis (Netto) | USt-Satz | Steuerbetrag |
|---|---|---|---|---|---|---|---|---|
| **1** | Notdienst-Einsatz Rohrreinigung (Fachhandwerker-Arbeitszeit vor Ort) | `custom` | 1,50 | Stunden | 95,00 € | 142,50 € | 19 % | 27,075 € |
| **2** | Notdienstpauschale (Bereitstellung Notdienstfahrzeug, Spezialpumpen & 24/7 Rufbereitschaft) | `custom` | 1,00 | Pauschale | 69,00 € | 69,00 € | 19 % | 13,110 € |

### 3.2. Exakte Cent-Berechnung

$$\text{Nettobetrag Position 1:} \quad 1{,}5 \times 95{,}00\,\text{€} = 142{,}50\,\text{€}$$
$$\text{Nettobetrag Position 2:} \quad 1{,}0 \times 69{,}00\,\text{€} = 69{,}00\,\text{€}$$
$$\text{Gesamter Nettoerlös:} \quad 142{,}50\,\text{€} + 69{,}00\,\text{€} = \mathbf{211{,}50\,\text{€}}$$

$$\text{Umsatzsteuer 19\,\%:} \quad 211{,}50\,\text{€} \times 0{,}19 = 40{,}185\,\text{€}$$
Gemäß § 14 Abs. 4 UStG und kaufmännischer Rundung (DIN 1333):
$$\text{Gerundete USt:} \quad \mathbf{40{,}19\,\text{€}}$$

$$\text{Gesamter Bruttorechnungsbetrag:} \quad 211{,}50\,\text{€} + 40{,}19\,\text{€} = \mathbf{251{,}69\,\text{€}}$$

---

## 4. Der vollständige DATEV-Buchungssatz

Nach der Finalisierung der Rechnung erzeugt die Schnittstelle folgenden doppelten Buchungssatz für das DATEV-Rechnungswesen:

### 4.1. Buchungszeilen

| Buchungssymbol | Konto (Soll) | Konto (Haben) | Betrag | Steuerschlüssel | Belegfeld 1 | Belegdatum | Buchungstext |
|---|---|---|---|---|---|---|---|
| **Forderungsbuchung** | Debitor `10001` (Hans Meyer) | | 251,69 € | | `RE-2026-1042` | `28.10.2026` | Notdienst Rohrreinigung Bad Harzburg |
| **Erlösbuchung** | | `8400` (Erlöse 19 % USt) | 211,50 € | Automatisch | `RE-2026-1042` | `28.10.2026` | Notdienst Rohrreinigung Bad Harzburg |
| **Steuerautomatik** | | `1776` (USt 19 %) | 40,19 € | Automatisch | `RE-2026-1042` | `28.10.2026` | Steueranteil 19 % |

### 4.2. Bank-Zahlungseingang (bei Ausgleich innerhalb 14 Tagen)

| Buchungssymbol | Konto (Soll) | Konto (Haben) | Betrag | Belegfeld 1 | Buchungstext |
|---|---|---|---|---|---|
| **Zahlungseingang** | `1200` (Geschäftskonto Bank) | `10001` (Debitor Hans Meyer) | 251,69 € | `RE-2026-1042` | Ausgleich RE-2026-1042 Meyer |

---

## 5. 1-Klick-Freigabe-Workflow für Meister Marc Schneider

Um Abrechnungsfehler durch unvorhergesehene Mehraufwände (z. B. zusätzliches Fräswerkzeug, Dichtungsmaterial) auszuschließen, generiert das System **Rechnungsentwürfe** statt sofort finaler Belege.

```
[n8n Automation] ──► POST /v1/invoices (voucherStatus: "draft")
                             │
                             ▼
              [Lexoffice Entwurfs-Eingang]
              Status: "Entwurf" (gelbes Badge)
                             │
                             ▼
       [Meister-Prüfung mobil via Smartphone / Tablet]
       • Arbeitszeit (1,5h) & Pauschale korrekt?
       • Fotos der Schadensstelle eingesehen?
                             │
                             ▼
              [1-Klick auf "Rechnung fertigstellen"]
                             │
       ┌─────────────────────┴─────────────────────┐
       ▼                                           ▼
[GoBD-Festschreibung]                   [DATEV Datenservice]
- Vergabe Rechnungsnummer               - Buchungssatz an Kanzlei
- Generierung PDF/A                     - Belegbildübertragung
- E-Mail/WhatsApp-Versand an Kunden     - Archivierung in Unternehmen online
```

### Vorteile der Entwurfsmethode:
- **Fehlertoleranz:** Sollte der Monteur vor Ort feststellen, dass 2,0 Stunden statt 1,5 Stunden gearbeitet wurden, kann Meister Schneider die Stundenzahl mit einem Fingertipp anpassen, bevor die GoBD-Rechnungsnummer vergeben wird.
- **Keine Stornobuchungen:** Stornorechnungen (Gutschriften) bei Tippfehlern entfallen vollständig.
- **Rechtssicherheit:** Die Rechnung wird erst in dem Moment rechtsverbindlich, in dem der Meister die Ausführung persönlich bestätigt.

---

## 6. Technische Integration: Lexoffice REST API v1

### 6.1. Schritt 1: Kontaktprüfung / Neuanlage
- **Endpoint:** `GET https://api.lexware.io/v1/contacts?name={Name}`
- Falls kein Kontakt gefunden wird:
  - **Endpoint:** `POST https://api.lexware.io/v1/contacts`
  - **Payload:**
    ```json
    {
      "version": 0,
      "roles": { "customer": {} },
      "person": {
        "salutation": "Herr",
        "firstName": "Hans",
        "lastName": "Meyer"
      },
      "phoneNumbers": {
        "mobile": ["+491701234567"]
      },
      "addresses": {
        "billing": [
          {
            "street": "Am Kurgarten 12",
            "zip": "38667",
            "city": "Bad Harzburg",
            "countryCode": "DE"
          }
        ]
      }
    }
    ```

### 6.2. Schritt 2: Rechnungsentwurf anlegen
- **Endpoint:** `POST https://api.lexware.io/v1/invoices`
- **Wichtig:** Kein URL-Parameter `?finalize=true`!
- **Payload:**
  ```json
  {
    "voucherDate": "2026-10-28T00:00:00.000+01:00",
    "address": {
      "contactId": "e9625367-3c07-443b-83c5-76eeb526bc41"
    },
    "title": "Rechnung (Notdienst-Einsatz)",
    "introduction": "Sehr geehrte Damen und Herren,\nfür den Notdienst-Einsatz durch HarzBlitz Notdienst & Gebäudetechnik GmbH am Objekt Am Kurgarten 12, 38667 Bad Harzburg stellen wir Ihnen folgende Positionen in Rechnung:",
    "remark": "Zahlbar rein netto innerhalb von 14 Tagen. Bitte geben Sie bei der Überweisung die Rechnungsnummer an.\nVielen Dank für Ihr Vertrauen! Bei Rückfragen erreichen Sie unseren Meisterbetrieb unter 05321-778890.",
    "lineItems": [
      {
        "type": "custom",
        "name": "Notdienst-Einsatz Rohrreinigung",
        "description": "Notdienst-Einsatz vor Ort (Keller unter Wasser, Hauptleitung leck), Fachhandwerker-Arbeitszeit 1,5 Std. à 95,00 € zzgl. MwSt.",
        "quantity": 1.5,
        "unitName": "Stunden",
        "unitPrice": {
          "currency": "EUR",
          "netAmount": 95.00,
          "taxRatePercentage": 19
        }
      },
      {
        "type": "custom",
        "name": "Notdienstpauschale",
        "description": "Bereitstellung Einsatzfahrzeug, Notdienst-Ausrüstung und 24/7 Notdienst-Einsatzpauschale",
        "quantity": 1,
        "unitName": "Pauschale",
        "unitPrice": {
          "currency": "EUR",
          "netAmount": 69.00,
          "taxRatePercentage": 19
        }
      }
    ],
    "totalPrice": {
      "currency": "EUR"
    },
    "taxConditions": {
      "taxType": "net"
    },
    "shippingConditions": {
      "shippingDate": "2026-10-28T00:00:00.000+01:00",
      "shippingType": "service"
    }
  }
  ```

---

## 7. GoBD & Steuerrechtliche Compliance

1. **Unveränderbarkeit (§ 146 Abs. 4 AO):**
   Sobald Meister Schneider den Entwurf in Lexoffice fertigstellt, ist der Beleg festgeschrieben und kann nicht mehr gelöscht oder überschrieben werden. Jede nachträgliche Stornierung erfordert eine offizielle Rechnungskorrektur.
2. **Lückenlose Rechnungsnummern (§ 14 Abs. 4 Nr. 4 UStG):**
   Lexoffice vergibt beim Fertigstellen automatisch eine fortlaufende, einmalige Belegnummer (z. B. `RE-2026-1042`).
3. **E-Rechnungspflicht (ab 2025/2026):**
   Lexoffice unterstützt nativ die Erstellung und den Empfang von strukturierten E-Rechnungen (ZUGFeRD 2.2 / XRechnung im XML-Format). Für Geschäftskunden (B2B) kann das Format mit einem Klick ausgewählt werden.
4. **Aufbewahrungsfrist (§ 147 AO):**
   Alle Rechnungsdaten und digitalen Belegbilder werden 10 Jahre revisionssicher in den deutschen Rechenzentren von Lexoffice und DATEV in Nürnberg archiviert.

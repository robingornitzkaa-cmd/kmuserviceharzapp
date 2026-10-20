# MODUL 4: Outbound-Kaltakquise & Skalierbare Lead-Engine (Für den regulären Vertriebsbetrieb)

**System-Status:** 100 % ausformuliert & direkt in den Bestandsdateien bereinigt | **Stand:** 20.10.2026  
**Arbeitstitel (Variable):** `KMU Service Harz` | **Inhaber:** Robin Gornitzka | **Standort:** 38685 Langelsheim  
**Bereinigte Bestandsdateien:** [`DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md`](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md), [`DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md`](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md)

---

## 1. Die 11-Spalten-Lead-Pipeline & 90-Sekunden-Vorab-Qualifizierung

### 1.1 Warum wir im Harz NIEMALS „blind“ abtelefonieren
Im Umkreis von 40 km um **38685 Langelsheim** gibt es über 500 relevante Handwerks- und KMU-Betriebe (3 bis 25 Mitarbeiter). Wer diese Liste blind von oben nach unten abtelefoniert, klingt wie ein beliebiges Callcenter.

Wer sich dagegen **vor dem Briefversand exakt 90 Sekunden lang** die Website und das Google-Maps-Profil des Betriebs anschaut und **einen konkreten sichtbaren Schwachpunkt (Trigger)** notiert, verdreifacht seine Terminquote sofort – weil der Meister spürt: *„Der Robin aus Langelsheim hat sich wirklich meinen Betrieb angeschaut!“*

### 1.2 Die 4 von außen sichtbaren digitalen Schwachstellen (Dein 90-Sekunden-Check)
Bevor ein Betrieb in die Wochen-Tranche (z. B. 25 Briefe jeden Montag) kommt, prüfen wir ihn auf diese 4 sichtbaren Signale:

| Signal-Code | Sichtbare Schwachstelle im Web / bei Google | Was das für den Büro-Alltag im Betrieb bedeutet (Innere Realität) | Dein maßgeschneiderter Einstiegssatz (im Brief & am Telefon) |
| :--- | :--- | :--- | :--- |
| **Signal S1 (`MAILTO`)** | **Nur `mailto:`-Link oder gar kein Anfrageformular** auf der Website (oder ein kaputtes Standard-Kontaktformular ohne Abfrage von Gewerk/Fotos). | Jede Kundenanfrage landet unstrukturiert per Telefon oder als Ein-Satz-Mail im Postfach. Der Meister muss abends jedem Kunden hinterhertelefonieren. | *„Mir ist auf Ihrer Seite aufgefallen, dass Kunden Ihnen noch keine strukturierten Fotos/Eckdaten vorab schicken können – das kostet Sie am Telefon sicher jede Woche Stunden.“* |
| **Signal S2 (`TERMIN-PINGPONG`)** | **Fehlende Online-Termin- oder Rückrufbuchung** + Hinweis *„Rufen Sie uns an (Mo–Fr 08–12 Uhr)“*. | Das Büro ist nur vormittags besetzt (oft durch die Ehefrau in Teilzeit). Nachmittags klingelt das Handy des Meisters auf dem Gerüst im Dauerfeuer. | *„Ihr Büro ist vormittags besetzt – ich wette, ab 12:30 Uhr klingelt dafür Ihr Handy auf der Baustelle ununterbrochen.“* |
| **Signal S3 (`MOBIL-ALT`)** | **Veralteter Webauftritt (kein SSL, nicht mobiloptimiert, Stand 2014–2019)** bei gleichzeitig modernen Transportern / guter Auftragslage. | Klassischer Traditionsbetrieb: Handwerklich top, volle Auftragsbücher, aber im Büro wird noch mit Papierordnern, Excel und Zetteln im Transporter gearbeitet. | *„Man sieht sofort: Sie sind handwerklich voll ausgelastet und stecken keine Zeit in IT-Schnickschnack – genau für solche Macher-Betriebe bauen wir unsere unsichtbare Beleg-Brücke.“* |
| **Signal S4 (`GOOGLE-BEWERTUNG`)** | **4,1 bis 4,7 Sterne bei Google Maps**, aber vereinzelte 1- bis 3-Sterne-Kommentare mit: *„Meldet sich trotz dreimaligem Anruf nicht zurück“* oder *„Warte seit 4 Wochen aufs Angebot“*. | **Goldgrube!** Der Betrieb hat mehr Anfragen als er im Büro abarbeiten kann. Er verliert bares Geld und seinen guten Ruf durch Büro-Überlastung. | *„Man sieht an Ihren Bewertungen: Ihre Arbeit auf der Baustelle ist erstklassig, nur im Büro-Rückstau geht im Trubel mal ein Rückruf unter.“* |

---

### 1.3 Das verbindliche 11-Spalten-Schema für deine Lead-Datenbank (`leads_master_harz.csv` / CRM)
Jeder Datensatz in unserer Pipeline wird nach exakt diesen **11 Spalten** geführt:

| Spalte | Feldname | Beschreibung / Ausprägung | Beispiel-Eintrag |
| :---: | :--- | :--- | :--- |
| **1** | `Lead_ID` | Eindeutiges Kürzel (`HARZ-001` bis `HARZ-518`) | `HARZ-042` |
| **2** | `Firmenname_und_Rechtsform` | Exakter Name für Briefkopf | `Müller Heizung & Sanitär GmbH` |
| **3** | `Entscheider_und_Bueroseele` | Vor-/Nachname Meister + Name der Bürokraft/Ehefrau (falls im Impressum/Team sichtbar!) | `Meister Frank Müller / Büro: Sabine Müller` |
| **4** | `Gewerk_und_Groesse` | Gewerk + geschätzte Mitarbeiterzahl (1–20 MA) | `SHK (ca. 8 Monteure, 1 Büro)` |
| **5** | `PLZ_Ort_und_Gewerbegebiet` | Ort + ggf. Gewerbegebiet für Vor-Ort-Routen | `38640 Goslar (Gewerbegebiet Baßgeige)` |
| **6** | `Bundesland_Foerderweiche` | **`NI` (Niedersachsen)** = *8-Wochen-ROI / INQA* vs. **`ST` (Sachsen-Anhalt)** = *+ 50 % Digital Innovation ab 6.000 €* | `NI (Kein Digitalbonus! Fokus: 8-Wochen-Amortisation)` |
| **7** | `Telefon_und_E_Mail` | Zentrale + ggf. Mobilnummer + E-Mail | `05321 / 123456 | info@mueller-shk-harz.de` |
| **8** | `Schwachstellen_Signal` | `S1 (Mailto)`, `S2 (Termin)`, `S3 (Papier/Alt)`, `S4 (Rückruf-Stau)` | `S3 + S4 (Kein Formular, 1 Rezension „Angebot dauerte“)` |
| **9** | `Personalisierungs_Satz` | 1 fertiger Satz für Post-It / Gesprächseinstieg | *„Starker SHK-Auftritt in der Baßgeige – wir schaffen Ihnen das Büro-Wochenende vom Hals.“* |
| **10** | `Kadenz_Status` | `0_Offen` ➔ `1_Brief_Versendet` ➔ `2_Angerufen` ➔ `3_FollowUp_Mail` ➔ `4_Audit_Gebucht` | `1_Brief_Versendet (Montag, 20.10.)` |
| **11** | `Naechste_Aktion_Datum` | Exakter Termin für den nächsten Schritt der 3-Stufen-Kette | `Donnerstag, 23.10., 07:15 Uhr (Anruf Stufe 2)` |

---

## 2. Das physische 2-Blatt Direkt-Mailing („Der Handwerker-Brief“)

### 2.1 Warum Briefpost im Harzer Handwerk jede Kalt-E-Mail um Längen schlägt
1. **Rechtssicherheit (§ 7 UWG):** Kalte Werbe-E-Mails ohne vorherige Einwilligung sind in Deutschland wettbewerbsrechtlich riskant. **Physische Briefpost an Gewerbetreibende ist zu 100 % legal und abmahnsicher!**
2. **Öffnungsrate:** Während im `info@`-Postfach täglich 40 Spam-Mails gelöscht werden, liegen im physischen Briefkasten eines Handwerksbetriebs heute oft nur noch 2–3 Briefe am Tag.
3. **Der „Umschlag- & Haptik-Trick“:**
   * Verwende **C4- oder DIN-Lang-Umschläge OHNE Fenster** aus kräftigem weißen Papier.
   * Schreibe die Empfängeradresse (oder zumindest den Namen *„Persönlich: Herrn Meister Frank Müller“*) sauber von Hand oder nutze eine echte **Briefmarke (Sondermarke aus der Postfiliale)** statt eines gedruckten Frankierstempels.
   * Hefte **Blatt 1 (Anschreiben)** und **Blatt 2 (Vorher-Nachher-Prozess-Röntgenbild)** NICHT mit einer Tackerklammer zusammen, sondern lege sie lose ineinander – so nimmt die Bürokraft oder der Meister das Schaubild sofort einzeln in die Hand!

---

### 2.2 📄 BLATT 1 (Vorderseite): Das 1-Seiter Handwerker-Anschreiben (100 % druckfertig)

```
KMU Service Harz | Robin Gornitzka | 38685 Langelsheim (Landkreis Goslar)

[Firmenname des Handwerksbetriebs]
z. Hd. Herrn / Frau [Nachname] persönlich
[Straße & Hausnummer]
[PLZ & Ort im Harz]
```

<div align="right">
<strong>38685 Langelsheim, den [Aktuelles Datum]</strong>
</div>

### **Betreff: Schluss mit dem Büro-Wochenende bei [Firmenname] – Vom Baustellen-Foto bis zum Steuerberater in 8 Sekunden (ohne neue Software für Ihre Gesellen)**

Moin Herr [Nachname],

Ihre Mitarbeiter leisten draußen auf den Baustellen jeden Tag ehrliche, handfeste Arbeit. Aber wenn am Freitagnachmittag die Transporter auf den Hof rollen und eigentlich Feierabend sein sollte, beginnt für Sie und Ihr Büro oft die unbezahlte zweite Schicht:

Zerknitterte Tankquittungen, Baumarkt-Bons und Lieferscheine aus den Fahrzeugen zusammensuchen, E-Rechnungen (ZUGFeRD) und PDFs aus verschiedenen E-Mail-Postfächern fischen, Daten von Hand in Lexoffice oder das Rechnungsprogramm abtippen – und am 10. des Monats die Suchliste vom Steuerberater abarbeiten.

**Damit machen wir hier im Harz jetzt Schluss.**

Mit **KMU Service Harz** aus Langelsheim habe ich mich auf genau eine Aufgabe spezialisiert: Wir bauen für Handwerksbetriebe (1 bis 20 Mitarbeiter) **lautlose digitale Brücken im Hintergrund**, die Ihnen das Büro-Wochenende und den Telefonstress auf der Baustelle vom Hals schaffen.

#### **Warum unser System im echten Baustellen-Alltag sofort funktioniert:**

1. **Ihre bestehenden Programme bleiben – 0 % Schulungsaufwand:**  
   Wir schwatzen Ihnen keine teure neue Software auf. Ihre Gesellen fotografieren Belege, Lieferscheine und Baustellen-Fotos einfach wie gewohnt mit dem Smartphone. Den Rest erledigt unsere Hintergrund-Brücke vollautomatisch.
2. **Saubere DATEV-Übergabe & 100 % E-Rechnungs-/GoBD-Sicherheit:**  
   Jeder Beleg und jede eingehende XML-/ZUGFeRD-Rechnung wird in 8 Sekunden automatisch ausgelesen, richtig benannt, vorkontiert und revisionssicher für Ihre Steuerkanzlei bereitgestellt. Ergebnis: **Null Rückfragen vom Steuerberater und schnelle Jahresabschlüsse.**
3. **Ruhe am Baustellen-Telefon (Auf Wunsch):**  
   Durch automatische Status-Nachrichten an Ihre Kunden (*Anfrage erhalten, Termin bestätigt, Material da*) fangen wir nervige Rückfragen ab, bevor Ihr Handy auf dem Gerüst klingelt.
4. **Garantierte Festpreise statt offener IT-Stundenzettel:**  
   Unser schlüsselfertiges Standard-Setup liegt bei einem festen Paketpreis (2.000 € netto) und bezahlt sich durch rund 16 eingesparte Büro-Stunden pro Monat in **unter 8 Wochen von selbst**. *(Für Betriebe im Landkreis Harz / Sachsen-Anhalt prüfen wir bei größeren Ausbaustufen zudem bis zu 50 % Zuschuss über „Digital Innovation“).*

---

#### **Unser Handschlag-Angebot zum Kennenlernen: Das 90-Minuten Büro-Potenzial-Audit**
Auf dem **beiliegenden Vorher-Nachher-Röntgenbild (Blatt 2)** sehen Sie auf einen Blick, wie unser 8-Sekunden-Ablauf in unserer Langelsheimer Vorführ-Umgebung (*„Mustermann Haustechnik Harz“*) funktioniert.

Wenn Sie wissen wollen, wie viele Wochenenden und Arbeitsstunden Ihr Betrieb konkret einsparen kann, kommen wir für unser **90-minütiges Büro-Potenzial-Audit (500 € Festpreis)** zu Ihnen in den Betrieb – abgesichert durch unsere **Doppelte Harzer Sicherheits-Garantie**:
* **Garantie 1 (Null-Risiko):** Wenn wir Ihnen im Audit nicht schwarz auf weiß nachweisen, wie Ihr Betrieb **mindestens 10 Stunden Büroarbeit pro Monat** einspart, **zahlen Sie für das Audit exakt 0,00 €.**
* **Garantie 2 (Volle Anrechnung):** Wenn wir den Fahrplan danach gemeinsam umsetzen, werden Ihnen die 500 € zu **100 % auf das Setup angerechnet**.

**So einfach starten wir (ohne jede Verpflichtung):**  
Ich rufe Sie am **[Wochentag, z. B. Donnerstag]** ganz kurz telefonisch an, um zu hören, ob wir uns für ein **kostenloses 15-Minuten-Erstgespräch** zusammensetzen wollen. Alternativ können Sie Ihre Ersparnis jetzt sofort in 10 Sekunden online berechnen:

👉 **Web & Büro-Wochenende-Rechner:** `www.kmu-service-harz.de/?ref=brief-harz`  
📱 **Direkt-Telefon & WhatsApp:** `+49 (0) 151 / 123 456 78` | **E-Mail:** `kontakt@kmu-service-harz.de`

Mit bodenständigen Grüßen aus Langelsheim

*(Handschriftliche Unterschrift mit blauem Kugelschreiber)*  
**Robin Gornitzka**  
Inhaber & Gründer — **KMU Service Harz** (38685 Langelsheim)

---

### 2.3 📄 BLATT 2 (Rückseite / Beiblatt): Das visuelle „Vorher-Nachher-Prozess-Röntgenbild“

*(Dieses Blatt legt der Meister seiner Frau oder Bürokraft auf den Schreibtisch. Es zeigt ohne ein einziges IT-Fremdwort den konkreten Unterschied im Alltag!)*

---

# DAS PROZESS-RÖNTGENBILD FÜR HANDWERKSBETRIEBE IM HARZ
### Vorher: 15 Minuten Zettel-Chaos pro Beleg ➔ Nachher: 8 Sekunden automatisch im Hintergrund
*(Live vorführbar an unserer Langelsheimer Musterfirma „Mustermann Haustechnik Harz“)*

```
+---------------------------------------------------------------------------------------------------+
| ❌ VORHER: DIE KLASSISCHE BÜRO-WOCHENEND-FALLE (OHNE SYSTEM-BRÜCKE)                               |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  [1. BAUSTELLE / EINKAUF]        [2. TRANSPORTER & POSTFACH]       [3. SONNTAGABEND IM BÜRO]      |
|  Geselle tankt, holt Material    Quittung bleicht auf dem          Chef oder Ehefrau sucht        |
|  oder schickt Foto lose in       Armaturenbrett aus; PDF-Rechnung  Belege zusammen, tippt Zahlen  |
|  die WhatsApp-Gruppe.            geht zwischen 50 Mails unter.     von Hand ab & sucht am 10.     |
|                                                                    für den Steuerberater nach.    |
|                                                                                                   |
|  ⏱️ ZEITVERLUST: ~16 bis 32 Stunden pro Monat (= ca. 24 verlorene Wochenenden pro Jahr!)          |
+---------------------------------------------------------------------------------------------------+
                                                 │
                                                 ▼
+---------------------------------------------------------------------------------------------------+
| ✅ NACHHER: DER 8-SEKUNDEN-DURCHLAUF MIT KMU SERVICE HARZ (0 KLICKS IM BÜRO)                      |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  [SCHRITT 1: 3 SEKUNDEN]         [SCHRITT 2: 5 SEKUNDEN LAUTLOS]   [SCHRITT 3: MONATSENDE]        |
|  Mitarbeiter fotografiert Bon    Unsere Hintergrund-Brücke liest   Alle Belege liegen lückenlos,  |
|  wie gewohnt mit dem Handy       Lieferant, Datum, Betrag, MwSt.   GoBD-sicher & vorkontiert für  |
|  oder E-Rechnung (ZUGFeRD)       & Projekt automatisch aus und     Ihre Steuerkanzlei (DATEV)     |
|  geht per E-Mail ein.            legt alles fertig in Lexoffice.   bereit. Null Rückfragen!       |
|                                                                                                   |
|  🎉 IHR GEWINN: Freie Wochenenden, 0 % Umschulung für Gesellen & Amortisation in ~8 Wochen!       |
+---------------------------------------------------------------------------------------------------+
```

#### ✍️ Der 30-Sekunden-Kugelschreiber-Check für Ihr Büro:
*(Kreuzen Sie kurz an – wenn mindestens 1 Punkt zutrifft, spart unser System Ihnen sofort über 10 Stunden im Monat:)*
* [ ] **Punkt 1:** Wir suchen am Monatsende noch regelmäßig nach fehlenden Tankquittungen, Baumarkt-Bons oder Lieferscheinen aus den Fahrzeugen.
* [ ] **Punkt 2:** Obwohl wir ein Rechnungsprogramm (z. B. Lexoffice, SevDesk, Handwerkersoftware) nutzen, tippen wir noch Daten von Hand ab oder laden Dateien einzeln hoch und runter.
* [ ] **Punkt 3:** Auf der Baustelle klingelt ständig das Telefon wegen Standard-Rückfragen, oder Baustellen-Fotos liegen ungeordnet auf den Handys der Mitarbeiter.

```
+---------------------------------------------------------------------------------------------------+
|  📱 JETZT IN 10 SEKUNDEN IHRE PERSÖNLICHE ZEITERSPARNIS BERECHNEN (+ GRATIS PDF-STRESS-TEST):     |
|                                                                                                   |
|  [ QR-CODE ZU: https://kmu-service-harz.de/?ref=brief-harz#roi ]                                  |
|                                                                                                   |
|  Oder kurz per WhatsApp / Telefon melden bei: Robin Gornitzka (38685 Langelsheim)                 |
|  📞 +49 (0) 151 / 123 456 78  |  ✉️ kontakt@kmu-service-harz.de                                   |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. Die 3-Stufen-Rhythmus-Kette & Wort-für-Wort Cold-Calling-Skripte

### 3.1 Der Wochen-Takt (25 Briefe pro Woche = 100 % kontrollierbare Pipeline)
Verschicke niemals 500 Briefe auf einmal! Wenn du 500 Briefe gleichzeitig einwirfst, schaffst du es nicht, alle nach 3 Tagen anzurufen, und nach 14 Tagen hat der Meister deinen Brief längst vergessen.
* **Unser eiserner Wochen-Rhythmus:**
  * **Montag:** 25 qualifizierte Briefe (inkl. Blatt 2 Röntgenbild + handgeschriebenem Post-It) in die Post geben.
  * **Donnerstag (07:10–08:30 Uhr & 16:00–17:30 Uhr) / Freitag (11:30–14:00 Uhr):** Telefonisches Nachfassen exakt dieser 25 Betriebe (**Stufe 2**).
  * **Dienstag der Folgewoche (Tag 7):** Kurze E-Mail oder WhatsApp mit dem Direktlink zum *Büro-Wochenende-Rechner* an alle, die telefonisch im Baustellen-Stress waren (**Stufe 3**). Danach: Kein penetrantes Nerven, sondern Wiedervorlage in 60 Tagen.

---

### 3.2 Stufe 2: Das mehrstufige Telefon-Skript (48–72 Stunden nach Briefversand)

#### 🅰️ Teil 1: Der Vorzimmer- & Bürokraft-Schlüssel (Die „Gute Seele“ zur Verbündeten machen)
*(Erinnerung aus Modul 1: Die Ehefrau oder Bürokraft im Handwerksbetrieb hat den Brief geöffnet! Sie hat das Prozess-Röntgenbild bereits gesehen.)*

* **Dein Einstieg:**
  > „Schönen guten Tag! Hier ist Robin Gornitzka aus Langelsheim von `KMU Service Harz`. Ich hatte Ihnen und Herrn [Nachname] am Dienstag einen kurzen Brief mit einem **Vorher-Nachher-Schaubild gegen das Büro-Wochenende** geschickt – mit dem kleinen gelben Post-It drauf. Ist der bei Ihnen auf dem Schreibtisch gelandet?“

* **Pfad 1: „Ja, hab ich gesehen / liegt hier beim Chef.“**
  > „Super! Sagen Sie ganz ehrlich unter uns: Wenn am Monatsende die Belege aus den Transportern fehlen oder die Rückfragen vom Steuerberater kommen – bleibt diese Sucherei eher an Herrn [Nachname] hängen oder sind **Sie** diejenige, die das im Büro ausbaden muss?“
  * *(Sie lacht fast immer und sagt: „Das bleibt natürlich an mir hängen!“)*
  > „Genau das habe ich mir gedacht! Unser System sorgt dafür, dass die Jungs draußen nur noch ein Foto machen und Sie im Büro keine einzige Quittung oder E-Rechnung mehr abtippen müssen. Wollen wir uns das zusammen mit Herrn [Nachname] kurz für 15 Minuten anschauen? Wann haben Sie beide kurz Luft – eher donnerstags gegen 16:30 Uhr oder freitags ab 13:00 Uhr?“

* **Pfad 2: „Worum geht es denn? Wir haben kein Interesse an Werbung.“**
  > „Völlig verständlich, ich rufe auch nicht an, um Ihnen eine neue Software zu verkaufen! Wir helfen Handwerksbetrieben hier im Landkreis Goslar dabei, dass Tankquittungen, Lieferscheine und E-Rechnungen (ZUGFeRD) ohne Abtippen direkt in Ihrem bestehenden Programm und beim Steuerberater landen.  
  > Kurze Frage ans Büro: Nutzen Sie für die Rechnungen schon Lexoffice oder SevDesk, oder arbeiten Sie mit einer eigenen Handwerkersoftware?“
  * *(Sobald sie antwortet, bist du im Fachgespräch!)*

---

#### 🅱️ Teil 2: Das Direkt-Skript für den Meister (45-Sekunden-Praxis-Pitch)

* **Dein Einstieg (Bezug auf den Brief + den beobachteten Trigger `S1–S4`):**
  > „Moin Herr [Nachname], hier ist Robin Gornitzka direkt aus Langelsheim (`KMU Service Harz`). Ich hatte Ihnen Anfang der Woche kurz das **Vorher-Nachher-Röntgenbild gegen das Büro-Wochenende** per Post geschickt – haben Sie gerade 45 Sekunden Luft oder stehen Sie mitten auf dem Gerüst?“

* **Wenn er sagt: „Ich hab kurz Zeit, worum geht’s?“ (Wähle den passenden Hook nach Bundesland & Signal):**

  * **Hook A (Standard-Speerspitze: Büro-Wochenende & 8-Sekunden-Belegweg):**
    > „Herr [Nachname], auf den Punkt gebracht: Mir ist aufgefallen, dass Sie bei [Firmenname] handwerklich voll ausgelastet sind [optional: *Signal S1/S4 einbauen*]. Ich rufe an, damit Sie und Ihre Frau/Bürokraft am Wochenende nicht mehr am Schreibtisch sitzen müssen, um Quittungen aus den Transportern zu sortieren, E-Rechnungen abzutippen oder dem Steuerberater hinterherzulaufen.  
    > Wir haben hier in Langelsheim unsere Musterfirma *‚Mustermann Haustechnik Harz‘* aufgebaut, in der ein fotografierter Beleg in **8 Sekunden** fix und fertig vorkontiert in Lexoffice und DATEV landet – ohne dass Ihre Gesellen eine neue App lernen müssen.  
    > Ich würde Ihnen diesen 8-Sekunden-Durchlauf gerne einmal für 15 Minuten live zeigen – entweder kurz bei Ihnen auf einen Kaffee oder am Bildschirm. Passt Ihnen diese Woche Donnerstag um 16:30 Uhr oder Freitag um 13:00 Uhr besser?“

  * **Hook B (Wenn der Meister sagt: „Belege und Buchhaltung laufen bei uns schon top!“ ➔ Sofort-Pivot auf Ausbau-Modul A/B):**
    > „Stark, Herr [Nachname] – dann gehören Sie zu den obersten 10 % hier im Harz! Wenn die Buchhaltung schon rund läuft: Wie sieht es bei Ihnen mit dem **Dauer-Klingeln auf der Baustelle** wegen Kunden-Rückfragen und mit den **Baustellen-Fotos in WhatsApp** aus?  
    > Wir bauen für Betriebe, bei denen DATEV schon steht, eine automatische Kunden-Status-Brücke und Foto-Akten-Ablage, die Ihnen jede Woche 3 bis 4 Stunden Telefonate vom Hals hält. Wollen wir uns das kurz für 15 Minuten anschauen?“

  * **Hook C (Spezial-Hook NUR für Sachsen-Anhalt – Wernigerode, Halberstadt, Blankenburg, Quedlinburg):**
    > „Herr [Nachname], wir sitzen direkt hinter der Kreisgrenze in Langelsheim und richten für Handwerksbetriebe im Landkreis Harz automatische Beleg-, E-Rechnungs- und Kunden-Abläufe ein. Der spannende Punkt für Sie in Sachsen-Anhalt: Während in Niedersachsen die Förderung ausgelaufen ist, übernimmt das Land Sachsen-Anhalt über *‚Digital Innovation‘* bei größeren Digitalisierungsprojekten aktuell noch **bis zu 50 % der Kosten als Zuschuss** – und unser kompaktes 2.000-€-Standard-Setup rechnet sich sogar komplett ohne Behörden-Wartezeit in 8 Wochen. Wollen wir in 15 Minuten kurz prüfen, welcher Weg für Ihren Betrieb mehr Geld spart?“

---

### 3.3 Die 30-Sekunden-Einwand-Konter am Telefon (Kurzfassung für den Hörer in der Hand)
*(Ausführliche Psychologie siehe Modul 1 – hier die ultra-knappen Telefon-Sätze für die 5 häufigsten Abblock-Reflexe:)*

1. **„Schicken Sie mir erstmal was per Mail!“**  
   $\rightarrow$ *„Mache ich sofort, Herr [Nachname]! Damit ich Ihnen keinen unpassenden Kram schicke, nur eine 5-Sekunden-Frage: Was nervt Sie aktuell mehr – das Zusammensuchen der Belege für den Steuerberater oder das ständige Telefonklingeln auf der Baustelle? [...] Perfekt, dann schicke ich Ihnen genau dazu heute Nachmittag unseren 10-Sekunden-Rechner und den 5-Minuten-Stresstest an die `[E-Mail]`!“*
2. **„Wir haben absolut keine Zeit!“**  
   $\rightarrow$ *„Genau deshalb rufe ich an, Herr [Nachname] – wer unter der Woche keine 10 Minuten Luft hat, sitzt meistens am Sonntag im Büro. Geben Sie mir nächste Woche Freitag um 13:00 Uhr nur 15 Minuten: Wenn ich Ihnen im späteren Audit nicht schwarz auf weiß mindestens **10 Stunden Zeitersparnis pro Monat** nachweise, zahlen Sie bei mir 0 Euro. Fairer Harzer Handschlag?“*
3. **„Meine Gesellen machen da eh nicht mit!“**  
   $\rightarrow$ *„Müssen sie auch nicht! Wenn ein Geselle ein Foto bei WhatsApp verschicken kann, kann er unser System bedienen. Für Ihre Jungs ändert sich auf dem Handy gar nichts – die Arbeit passiert unsichtbar im Hintergrund.“*
4. **„Was kostet der Spaß?“**  
   $\rightarrow$ *„Kein einziger offener IT-Stundenzettel: Das 15-Minuten-Kennenlernen kostet 0 €. Unser 90-Minuten-Potenzial-Audit vor Ort kostet 500 € Festpreis – mit Doppel-Garantie: Finden wir nicht mindestens 10 Stunden Ersparnis im Monat, kostet es 0 €, und beim Standard-Setup (2.000 € Festpreis) werden die 500 € komplett angerechnet.“*
5. **„Das macht schon unser Steuerberater / unser IT-Haus!“**  
   $\rightarrow$ *„Perfekt, wir ersetzen weder Ihren Steuerberater noch Ihr IT-Haus! Ihr IT-Haus kümmert sich um Server und PCs, Ihr Steuerberater bucht am Monatsende – und wir bauen genau das fehlende Verbindungsstück dazwischen, damit Sie Ihrem Steuerberater keine Belege mehr von Hand zusammensuchen müssen.“*

---

### 3.4 Stufe 3: Die Nachfass-E-Mail / WhatsApp an Tag 7 (Der sanfte Abschluss der Kette)
Wenn du nach dem Brief (Tag 1) und dem Anruf (Tag 3/4) vereinbart hast, kurz Unterlagen zu schicken – oder den Meister telefonisch nur kurz auf dem Gerüst erwischt hast –, geht an **Tag 7** diese Nachricht raus:

* **Betreff:** Kurze Rückmeldung zu meinem Brief aus Langelsheim (+ 10-Sekunden Büro-Rechner für [Firmenname])
* **Text:**
  > Moin Herr [Nachname],
  >
  > wir hatten uns ja am [Donnerstag] kurz am Telefon gesprochen (bzw. ich hatte Ihnen Anfang letzter Woche mein Vorher-Nachher-Schaubild per Post aus Langelsheim geschickt).
  >
  > Damit Sie in Ruhe nach Feierabend prüfen können, ob sich unsere lautlose Beleg- und DATEV-Brücke für **[Firmenname]** rechnet, finden Sie hier unseren interaktiven **10-Sekunden Büro-Wochenende-Rechner** sowie den kostenlosen **5-Minuten Büro-Stress-Test (PDF)**:
  >
  > 👉 **`https://kmu-service-harz.de/?ref=brief-followup#roi`**
  >
  > Bei einem Betrieb Ihrer Größe (ca. [X] Mitarbeiter) liegen dort erfahrungsgemäß rund **16 bis 24 Stunden Zeitersparnis pro Monat** (also über 20 freie Wochenenden im Jahr), die heute noch für Quittungen, E-Rechnungen und Rückfragen draufgehen.
  >
  > Wenn Sie möchten, zeige ich Ihnen den **8-Sekunden-Belegweg** nächste Woche kurz für 15 Minuten live an unserer Musterfirma *„Mustermann Haustechnik Harz“* – komplett unverbindlich und ohne IT-Fachchinesisch.
  >
  > Antworten Sie einfach kurz mit **„TERMIN“** auf diese Mail oder schreiben Sie mir bei WhatsApp unter `+49 (0) 151 / 123 456 78`. Ansonsten lasse ich Sie jetzt in Ruhe weiterarbeiten!
  >
  > Bodenständige Grüße aus Langelsheim  
  > **Robin Gornitzka**  
  > KMU Service Harz | 38685 Langelsheim

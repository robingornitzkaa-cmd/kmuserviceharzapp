# AGB-Textbausteine für IT-Dienstleister und No-Code-Automatisierungsagenturen

**Stand der Recherche:** 19. August 2026  
**Einsatzbereich:** B2B-Verträge mit Kunden, die Unternehmer im Sinne von § 14 BGB sind  
**Status:** Arbeitsentwurf — vor der Verwendung rechtlich prüfen lassen

> **Rechtlicher Hinweis:** Ich bin keine Rechtsanwältin bzw. kein Rechtsanwalt. Dieses Dokument ist eine Arbeitsgrundlage und keine Rechtsberatung. Insbesondere sollten Leistungsbeschreibung, SLA, Vergütungsmodell, Datenschutzvereinbarungen und die hier vorgeschlagenen Klauseln vor dem Einsatz von einer im IT-Vertragsrecht qualifizierten Kanzlei auf das konkrete Geschäftsmodell geprüft werden.

## 1. Kurzfazit der Recherche

Bei deutschen B2B-AGB für IT-, SaaS- und Managed-Service-Leistungen wiederholen sich im Jahr 2026 vier Strukturprinzipien: Erstens wird **der geschuldete Leistungsumfang** nicht abstrakt, sondern über Angebot, Leistungsbeschreibung und gegebenenfalls SLA präzise bestimmt. Zweitens werden integrierte Plattformen, KI-Modelle und APIs als **Drittanbieterdienste** transparent benannt. Drittens wird die Verfügbarkeit des eigenen Dienstes von der Verfügbarkeit externer Dienste getrennt. Viertens wird jede über die Erhaltung der vereinbarten Funktion hinausgehende Leistung über ein dokumentiertes **Change-Request-Verfahren** beauftragt.[1] [2] [3]

Die aktuelle EVB-IT-Systematik des Bundes bestätigt diese Trennung im öffentlichen IT-Einkauf: Für Dienstleistung, Pflege, Instandhaltung, Cloud, Erstellung und Systemleistung gibt es jeweils eigene AGB und teils eigene Muster für Änderungsverfahren.[4] Das ist kein unmittelbar für private Verträge geltendes Gesetz, aber ein belastbarer Referenzpunkt dafür, dass Wartung, Änderungsverfahren und Leistungsnachweis nicht in einer pauschalen Klausel vermischt werden sollten.

| Regelungsfeld | Üblicher B2B-Ansatz | Praktische Konsequenz für eine Automatisierungsagentur |
|---|---|---|
| Vertragsgegenstand | Leistungspflichten ergeben sich aus Angebot/Leistungsbeschreibung, nicht aus allgemeinem Marketing. | Jede Automation erhält eine Anlage mit Systemen, Triggern, Aktionen, Datenfeldern, Ausnahmen und Abnahmekriterien. |
| Drittanbieter | APIs, Cloud, KI-Modelle, Kommunikations- und Zahlungsdienste werden ausdrücklich aufgeführt. | Lexware Office, OpenAI, Make, Zapier, Microsoft 365, Google Workspace usw. anlagenbezogen benennen. |
| Verfügbarkeit | Keine ununterbrochene Verfügbarkeit ohne ausdrücklich vereinbarte SLA; Drittanbieterereignisse werden sauber vom eigenen Verantwortungsbereich abgegrenzt. | Nicht pauschal „99,9 %“ versprechen, wenn diese Quote auch von fremden APIs abhängt. |
| Wartung | Erhalt der vereinbarten Funktion im definierten Zielsystem; Support, Fehleranalyse und Routine-Updates nur im beschriebenen Umfang. | Umfang, Servicezeiten, Reaktionszeit und gegebenenfalls monatliches Stundenbudget angeben. |
| Change Request | Neue oder wesentlich geänderte Anforderungen werden vor Umsetzung auf Aufwand, Termin, Risiken und Drittanbieterfolgen geprüft und erst nach Freigabe umgesetzt. | Keine Umsetzung neuer Workflows „auf Zuruf“; mindestens Textform und ein Freigabepunkt vorsehen. |
| Haftung | Unbeschränkt für Vorsatz, grobe Fahrlässigkeit und Personenschäden; bei Kardinalpflichten auch für leichte Fahrlässigkeit, aber regelmäßig begrenzt auf den vorhersehbaren, vertragstypischen Schaden. | Den Drittanbieterbaustein immer mit einer rechtlich abgestimmten allgemeinen Haftungsklausel kombinieren. |

## 2. Rechtliche Leitplanken für den Klauselbau

Auch im B2B-Geschäft bleiben AGB an § 307 BGB zu messen. Unwirksam sind insbesondere unklare Regelungen oder Klauseln, die wesentliche Rechte bzw. Pflichten so beschneiden, dass der Vertragszweck gefährdet wird.[5] Zwar gelten die Klauselverbote des § 309 BGB im reinen B2B-Verkehr nicht unmittelbar; über § 310 Absatz 1 BGB bleibt aber die Inhaltskontrolle nach § 307 BGB erhalten.[6] Eine einfache Überschrift wie „Drittanbieter“ oder der Satz, der Anbieter sei „nicht Erfüllungsgehilfe“, löst dieses Problem daher nicht.

> **Kernregel:** Wird eine fremde API tatsächlich eingesetzt, um eine von der Agentur selbst versprochene Leistung zu erfüllen, kann deren Verschulden nach § 278 BGB grundsätzlich zugerechnet werden.[7] Die Vertragsklausel muss daher vor allem den **eigenen Leistungserfolg** realistisch definieren und darf nicht versuchen, eine gesetzliche Zurechnung durch bloße Etikettierung auszuschalten.

Die Haftung für Vorsatz kann nicht im Voraus ausgeschlossen werden.[8] Bei Verbraucherverträgen gelten daneben die strengeren Verbote des § 309 Nummer 7 BGB, insbesondere zu Personenschäden und grobem Verschulden.[9] Die nachfolgenden Muster sind deshalb ausdrücklich **nicht** ohne verbraucherrechtliche Überarbeitung für B2C-Kunden geeignet.

| Nicht empfehlenswert | Warum problematisch | Besserer Ansatz |
|---|---|---|
| „Wir haften niemals für Drittanbieter, insbesondere auch nicht für deren Ausfälle.“ | Zu pauschal; kann eigene Auswahl-, Einrichtungs-, Überwachungs- oder Kardinalpflichten unzulässig aushebeln. | Drittanbieterverfügbarkeit ist nur dann nicht geschuldet, wenn sie nicht als eigene Leistung/SLA versprochen ist; eigene Pflichtverletzung bleibt ausdrücklich ausgenommen. |
| „Drittanbieter sind keine Erfüllungsgehilfen.“ | Die rechtliche Einordnung hängt von der konkreten geschuldeten Leistung ab; sie ist nicht frei deklarierbar. | Vertragsbeziehung, Accountinhaberschaft und Leistungsversprechen klar beschreiben; § 278 BGB nicht deklaratorisch wegdefinieren. |
| „Alle künftigen Anpassungen sind Wartung.“ | Unbegrenztes Leistungsversprechen; unklar, welche Mehrarbeit in der Pauschale steckt. | Wartung mit Gegenstand, Zielumgebung, Leistungskatalog und ggf. Stundenkontingent begrenzen. |
| „Änderungen werden nach Aufwand berechnet.“ | Ohne Prozess, Entscheidungspunkt und Folgenbeschreibung streitanfällig. | Change Request mit Prüfung, Angebot, Freigabe, Priorität, Aufwand, Termin, Abnahme und Drittanbieterkosten. |
| „99,9 % Verfügbarkeit“ ohne Messpunkt und Ausschlüsse | Unklar, ob der Wert für die Agentur, die Automation, das Zielsystem oder die gesamte End-to-End-Kette gilt. | Messobjekt, Messzeitraum, Wartungsfenster, Ausschlüsse und Service-Credits/Abhilfen ausdrücklich festlegen. |

## 3. Textbaustein: Drittanbieterdienste und API-Ausfälle

### 3.1 Empfohlene Einordnung in der Leistungsbeschreibung

Dieser Baustein gehört am besten in die projektbezogene Leistungsbeschreibung. Er legt fest, was die Agentur tatsächlich schuldet, bevor die Haftungsfrage entsteht.

> **§ [X] Eingesetzte Drittanbieterdienste und Leistungsgrenze**
>
> (1) Die in Anlage [Nummer] beschriebene Automation kann zur technischen Ausführung Dienste, Schnittstellen und Infrastruktur externer Anbieter verwenden („Drittanbieterdienste“). Drittanbieterdienste sind insbesondere [Lexware Office Public API], [OpenAI API], [Make], [Microsoft 365], [Google Workspace] sowie die in Anlage [Nummer] einzeln bezeichneten Dienste.
>
> (2) Der Auftragnehmer schuldet die Konzeption, Konfiguration, Dokumentation und — soweit vereinbart — Betreuung der Automation nach Maßgabe dieses Vertrags und der Leistungsbeschreibung. Ein bestimmter wirtschaftlicher Erfolg, eine bestimmte Verarbeitungsmenge oder die dauerhafte Verfügbarkeit, Fehlerfreiheit, Funktionalität, Sicherheit oder Weiterentwicklung von Drittanbieterdiensten wird nicht geschuldet, soweit dies nicht ausdrücklich in einer gesonderten SLA als eigene Leistung des Auftragnehmers vereinbart ist.
>
> (3) Soweit der Kunde den Vertrag mit dem Drittanbieter selbst schließt oder fortführt, obliegen ihm insbesondere die Bereitstellung und Pflege gültiger Zugänge, API-Schlüssel, Berechtigungen, Lizenzen, Zahlungsdaten und sonstiger Voraussetzungen des Drittanbieterdienstes. Der Kunde stellt dem Auftragnehmer die erforderlichen Zugänge rechtzeitig und mit dem erforderlichen Berechtigungsumfang bereit.
>
> (4) Der Auftragnehmer weist den Kunden auf ihm bekannte technische Einschränkungen, dokumentierte Schnittstellengrenzen und für die vereinbarte Automation wesentliche Abhängigkeiten hin. Die jeweils geltenden Nutzungs-, Datenschutz- und Preisbedingungen des Drittanbieters bleiben im Verhältnis zwischen Kunde und Drittanbieter maßgeblich, soweit der Kunde deren Vertragspartner ist.

Die Lexware Office Public API ist nach Angaben des Anbieters eine REST-Schnittstelle, deren Funktionsumfang laufend erweitert wird; dies illustriert, warum API-Versionen und Funktionsänderungen in der Leistungsbeschreibung als externe Abhängigkeit sichtbar gemacht werden sollten.[10] Auch die seit 1. Januar 2026 geltenden Business-Bedingungen von OpenAI sehen regelmäßige Dienstupdates sowie eine mögliche Begrenzung oder Aussetzung in bestimmten Fällen vor.[11]

### 3.2 Haftungs- und Störungsbaustein für externe API-Ausfälle

Dieser Baustein ist bewusst **kein Total-Ausschluss**. Er nimmt fremde Betriebsstörungen aus dem geschuldeten Verfügbarkeitsversprechen heraus, lässt aber die Verantwortung der Agentur für eigene Fehler bestehen.

> **§ [X] Störungen und Änderungen von Drittanbieterdiensten**
>
> (1) Ein Ausfall, eine Verzögerung, eine Fehlfunktion, eine Rate-Limitierung, eine Änderung oder Einstellung eines Drittanbieterdienstes, eine Änderung seiner Schnittstelle oder Dokumentation, eine Sperrung bzw. Einschränkung eines Kundenkontos oder eine vom Drittanbieter veranlasste Daten- oder Zugriffsverweigerung (jeweils „Drittanbieterereignis“) begründet keine Pflichtverletzung des Auftragnehmers, **soweit** das Drittanbieterereignis nicht auf einer vom Auftragnehmer zu vertretenden Pflichtverletzung bei Auswahl, Konfiguration, Integration, Dokumentation oder einer ausdrücklich übernommenen Überwachungsleistung beruht und der Drittanbieterdienst nicht selbst als vom Auftragnehmer geschuldete Verfügbarkeitsleistung vereinbart ist.
>
> (2) Der Auftragnehmer wird ein ihm gemeldetes Drittanbieterereignis im Rahmen der vereinbarten Supportzeiten untersuchen, soweit dies mit den ihm zugänglichen Informationen möglich ist. Er wird angemessene Maßnahmen zur Eingrenzung der Ursache, zur Wiederherstellung der von ihm betriebenen Konfiguration und — soweit technisch und wirtschaftlich vertretbar — zur Nutzung eines zumutbaren Workarounds ergreifen. Ein Anspruch auf eine Behebung innerhalb einer bestimmten Frist oder auf einen bestimmten Workaround besteht nur, wenn dies in einer SLA ausdrücklich vereinbart ist.
>
> (3) Soweit ein Drittanbieterereignis eine Anpassung der Automation erforderlich macht, die über die in § [Wartung] vereinbarten Wartungsleistungen hinausgeht, erstellt der Auftragnehmer auf Anforderung des Kunden ein Angebot im Change-Request-Verfahren gemäß § [CR]. Bis zur Beauftragung ist der Auftragnehmer berechtigt, die betroffene Funktion vorübergehend auszusetzen, soweit dies zur Vermeidung fehlerhafter Datenverarbeitungen, unberechtigter Zugriffe, Mehrkosten oder sonstiger Schäden erforderlich ist.
>
> (4) Kosten und Entgelte von Drittanbietern, einschließlich nutzungsabhängiger API-, Lizenz-, Transaktions-, Speicher- oder Kommunikationskosten, sind nicht in der Vergütung des Auftragnehmers enthalten, sofern nicht ausdrücklich etwas anderes vereinbart wurde. Preis- oder Leistungsänderungen eines Drittanbieters berechtigen nicht zu einer unentgeltlichen Erweiterung der Leistungen des Auftragnehmers.
>
> (5) Die gesetzlichen Ansprüche des Kunden wegen vorsätzlicher oder grob fahrlässiger Pflichtverletzung sowie wegen Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit bleiben unberührt. Im Übrigen gilt die in § [Haftung] vereinbarte Haftungsregelung.

**Warum die Formulierung tragfähiger ist:** Sie kombiniert die im Markt häufig anzutreffende Transparenz über externe KI-, Cloud- und API-Dienste mit einer klaren Ausnahme für eigenes Verschulden. Ein veröffentlichtes AGB-Beispiel aus dem KI-/Automatisierungsumfeld unterscheidet ebenfalls zwischen Drittanbieterverfügbarkeit, eigener SLA und eigener Haftung; es sollte aber nicht ungeprüft übernommen werden, weil die rechtliche Zuordnung im Einzelfall vom Leistungsversprechen abhängt.[1] OpenAI selbst schließt in seinen Business-Bedingungen eine Verantwortung für Verzögerungen, Unterbrechungen und andere Probleme aus Drittanbieter- oder Nicht-OpenAI-Diensten im Rahmen seines eigenen Leistungsversprechens aus.[11]

### 3.3 Ergänzungsbaustein: API-Änderung und Alternativlösung

Dieser Baustein verhindert, dass eine Stilllegung einer API oder ein Breaking Change automatisch als kostenlose Neuentwicklung behandelt wird.

> **§ [X] Wesentliche Änderungen von Schnittstellen**
>
> (1) Ändert oder beendet ein Drittanbieter eine für die Automation wesentliche Schnittstelle in einer Weise, dass die vereinbarte Funktion ohne technische Anpassung nicht oder nicht mehr vertragsgemäß erbracht werden kann, informiert der Auftragnehmer den Kunden unverzüglich nach Kenntniserlangung, soweit ihm die Änderung bekannt wird und die Information für die betroffene Automation erheblich ist.
>
> (2) Der Auftragnehmer prüft im Rahmen der vereinbarten Wartung, ob eine Wiederherstellung durch eine geringfügige Konfigurations- oder Kompatibilitätsanpassung innerhalb des vereinbarten Wartungsumfangs möglich ist. Erfordert die Anpassung insbesondere eine neue oder geänderte Datenstruktur, einen neuen Prozessablauf, eine neue Schnittstelle, eine Datenmigration, eine wesentliche Neuimplementierung, zusätzliche Tests oder eine Änderung der vereinbarten Abnahmekriterien, handelt es sich um einen kostenpflichtigen Change Request.
>
> (3) Der Auftragnehmer schuldet keinen Ersatzdienst und keine Migration auf einen alternativen Drittanbieter, sofern dies nicht ausdrücklich vereinbart wurde. Er wird dem Kunden auf Wunsch eine technisch vertretbare Alternative mit den voraussichtlichen Auswirkungen auf Leistungsumfang, Kosten, Datenverarbeitung, Sicherheit und Terminplan anbieten.

## 4. Textbaustein: Klare Abgrenzung von Wartung und kostenpflichtigen Change Requests

### 4.1 Definitionen

Die Abgrenzung funktioniert nur, wenn die vereinbarte **Soll-Funktion** in einer Anlage ausreichend präzise beschrieben ist. Eine „Störung“ ist dann die reproduzierbare Abweichung von dieser Soll-Funktion in der vereinbarten Zielumgebung — nicht jede neue Anforderung oder jeder Wunsch nach Komfortverbesserung.

> **§ [Y] Wartung; Störung; Change Request**
>
> (1) **Wartung** umfasst ausschließlich die im Vertrag und in Anlage [Nummer] bezeichneten Maßnahmen zur Erhaltung der vereinbarten, bei Vertragsschluss dokumentierten Soll-Funktion der Automation in der dort genannten Zielumgebung. Die Zielumgebung besteht aus den in Anlage [Nummer] konkret benannten Versionen, Mandanten, Zugängen, Schnittstellen und Konfigurationen.
>
> (2) Eine **Störung** liegt vor, wenn die Automation bei vertragsgemäßer Nutzung in der vereinbarten Zielumgebung reproduzierbar von der dokumentierten Soll-Funktion abweicht und die Ursache im Verantwortungsbereich des Auftragnehmers oder in einer von ihm innerhalb des Wartungsumfangs betreuten Konfiguration liegt. Keine Störung liegt insbesondere bei einer bloßen Erweiterung oder Änderung der Soll-Funktion, bei fehlerhaften oder unvollständigen Kundendaten, fehlenden Berechtigungen, Änderungen der Zielumgebung oder bei einem Drittanbieterereignis gemäß § [Drittanbieterereignisse], soweit der Auftragnehmer dieses nicht zu vertreten hat.
>
> (3) **Change Request** ist jede vom Kunden gewünschte Änderung oder Ergänzung des vereinbarten Leistungsumfangs sowie jede Maßnahme, die nach Absatz 4 nicht zur Wartung gehört. Ein Change Request kann insbesondere neue Funktionen, Änderungen von Prozesslogik, System- oder Schnittstellenwechsel, Datenmigrationen, wesentliche Änderungen des Datenmodells, neue Nutzergruppen, neue Freigabe- oder Berechtigungslogiken, umfangreiche Tests, Schulungen, Dokumentationsanpassungen oder eine wesentliche Erweiterung von Volumen, Komplexität oder Sicherheitsanforderungen umfassen.
>
> (4) Zur Wartung gehören nur, soweit in Anlage [Nummer] nichts Abweichendes vereinbart ist:
>
> a) Analyse und Beseitigung einer Störung gemäß Absatz 2;
>
> b) Aktualisierung bestehender Konfigurationen wegen geringfügiger, rückwärtskompatibler Änderungen eines betreuten Drittanbieterdienstes, sofern weder Prozesslogik, Datenmodell, Schnittstellenarchitektur noch vereinbarte Abnahmekriterien wesentlich geändert werden;
>
> c) Einspielen notwendiger Sicherheits- oder Kompatibilitätsanpassungen innerhalb der vereinbarten Zielumgebung; sowie
>
> d) Pflege der bestehenden technischen Dokumentation, soweit sie durch eine Maßnahme nach Buchstaben a) bis c) geändert wird.
>
> (5) Nicht von der Wartung umfasst und nur nach einem Change Request zu vergüten sind insbesondere:
>
> a) Konzeption, Einrichtung oder Anbindung neuer Systeme, Mandanten, Plattformen, APIs, Webhooks oder Datenquellen;
>
> b) Erweiterung oder Änderung von Workflows, Geschäftsregeln, Triggern, Aktionen, Ausnahmebehandlungen, Datenfeldern, Berechtigungen, Freigaben oder Benachrichtigungen;
>
> c) Migrationen, Neuimplementierungen, größere Refactorings, Major-Version-Upgrades, Datenbereinigungen, Datenanreicherungen, Rückverarbeitungen und historische Datenimporte;
>
> d) Anpassungen aufgrund geänderter Geschäftsprozesse, Organisationsstrukturen, gesetzlicher Anforderungen, Drittanbieterpreise, Lizenzmodelle, Nutzungsbedingungen oder nicht rückwärtskompatibler Schnittstellenänderungen;
>
> e) Schulung, fachliche Beratung, Prozessoptimierung, Qualitätssicherung außerhalb der vereinbarten Testfälle sowie Leistungen außerhalb der vereinbarten Servicezeiten oder des Stundenkontingents.

Dieses Muster folgt der in veröffentlichten Managed-Application-Service-AGB sichtbaren Praxis, Regelbetrieb, Update-Prozess und ausdrücklich ausgenommene Neuentwicklungen bzw. größere Upgrades voneinander zu trennen.[2] Entscheidend ist nicht die Überschrift der Kundenanfrage, sondern ihre technische und fachliche Wirkung im Verhältnis zur dokumentierten Soll-Funktion.

### 4.2 Entscheidungsmatrix für die tägliche Praxis

| Anfrage / Ereignis | Einordnung | Begründung | Vergütung / Prozess |
|---|---|---|---|
| Ein bestehender Workflow überträgt ein dokumentiertes Feld wegen eines Konfigurationsfehlers nicht mehr. | Wartung / Störung | Abweichung von der vereinbarten Soll-Funktion. | Innerhalb des Wartungsumfangs. |
| OpenAI oder Lexware Office ist vorübergehend nicht erreichbar. | Drittanbieterereignis | Kein Fehler der eigenen Konfiguration allein; Analyse und Kommunikation nach Supportumfang. | Kein Behebungsversprechen für die Fremdplattform; Workaround nur wie vereinbart. |
| Eine rückwärtskompatible API-Änderung erfordert die Anpassung eines Endpunkts oder Parameters, ohne Prozesslogik/Datenmodell zu ändern. | Wartung, wenn ausdrücklich eingeschlossen | Technische Kompatibilitätsanpassung innerhalb der Zielumgebung. | Innerhalb Kontingent; darüber hinaus nach Aufwand oder CR. |
| Ein Anbieter entfernt einen Endpunkt und erfordert OAuth-Neukonzept, neue Felder und umfangreiche Tests. | Change Request | Wesentliche technische Neuimplementierung und geänderte Abnahmekriterien. | Angebot und schriftliche Freigabe vor Umsetzung. |
| Der Kunde möchte einen zusätzlichen Freigabeschritt, eine Teams-Nachricht oder eine E-Mail-Route. | Change Request | Neue Prozesslogik bzw. Funktion. | CR. |
| Ein neuer Mandant, eine zweite Gesellschaft oder ein neues System soll angebunden werden. | Change Request | Erweiterung von Systemlandschaft, Berechtigungen und Datenflüssen. | CR. |
| Der Kunde hat den API-Schlüssel widerrufen oder die Lizenz nicht verlängert. | Mitwirkungs-/Drittanbieterproblem | Zugangsvoraussetzung liegt beim Kunden bzw. Drittanbieter. | Reaktivierung/Prüfung nach vereinbartem Support oder Aufwand. |
| Der Kunde verlangt Analyse am Wochenende außerhalb der Servicezeit. | Zusatzleistung | Außerhalb der geschuldeten Servicezeit. | Notfall-/Out-of-Hours-Preis oder CR. |

## 5. Textbaustein: Change-Request-Verfahren

> **§ [Z] Verfahren für Change Requests**
>
> (1) Der Kunde übermittelt Change Requests in Textform an [E-Mail-Adresse/Ticketsystem] und beschreibt mindestens Ziel, betroffene Systeme und Prozesse, gewünschtes Ergebnis, Priorität, gegebenenfalls gewünschte Frist sowie bekannte technische oder fachliche Rahmenbedingungen.
>
> (2) Der Auftragnehmer prüft den Change Request innerhalb von [fünf] Arbeitstagen auf technische Machbarkeit und erstellt, soweit eine Umsetzung grundsätzlich möglich ist, ein Angebot. Das Angebot enthält mindestens die Leistungsbeschreibung, Annahmen und Mitwirkungspflichten, Abhängigkeiten von Drittanbietern, Auswirkungen auf Datenschutz und Informationssicherheit, voraussichtlichen Aufwand bzw. Festpreis, Drittanbieterkosten, Termin- und Prioritätsauswirkungen, Test- und Abnahmekriterien sowie gegebenenfalls einen Rückfallplan.
>
> (3) Die Prüfung eines Change Requests ist [bis zu X Minuten je Anfrage unentgeltlich / nach Aufwand gemäß Preisliste] vergütungspflichtig. Übersteigt die Prüfung voraussichtlich [X Stunden], informiert der Auftragnehmer den Kunden vor Beginn der weitergehenden Prüfung über den voraussichtlichen Aufwand; die weitergehende Prüfung erfolgt erst nach Freigabe in Textform.
>
> (4) Die Umsetzung beginnt erst, wenn der Kunde das Angebot in Textform freigegeben hat. Der Auftragnehmer ist nicht verpflichtet, mündliche, telefonische oder informelle Weisungen umzusetzen. Ein Change Request verändert Leistungsumfang, Vergütung und Termine nur entsprechend der freigegebenen Angebotsfassung.
>
> (5) Erfordert ein Change Request eine unverzügliche Sicherungsmaßnahme zur Vermeidung eines unmittelbar drohenden erheblichen Schadens, kann der Kunde den Auftragnehmer in Textform mit einer Sofortmaßnahme bis zu einem Kostenrahmen von [Betrag] EUR netto beauftragen. Darüber hinausgehende Maßnahmen bedürfen einer gesonderten Freigabe.
>
> (6) Nach Umsetzung gelten die im freigegebenen Angebot definierten Test- und Abnahmekriterien. Eine Änderung der Abnahmekriterien ist selbst ein Change Request.

Öffentlich zugängliche IT-AGB-Muster arbeiten ebenfalls mit einem Angebot nach Prüfung und einer Durchführung erst nach schriftlicher Beauftragung.[2] Die offiziellen EVB-IT-Unterlagen stellen für mehrere Leistungstypen eigene Änderungsverfahrensmuster bereit.[4]

## 6. Empfohlene Verbindung mit der allgemeinen Haftungsklausel

Die Drittanbieter-Klausel ersetzt keine allgemeine Haftungsregelung. Für ein B2B-Modell ist die nachfolgende Struktur üblich; die konkrete Haftungsobergrenze sollte an Umsatz, Schadensrisiko, Versicherungsdeckung, Kritikalität der Automation und die Rolle der Agentur bei Datenverarbeitung bzw. Zahlungen angepasst werden.

> **§ [Haftung] — Strukturbaustein für B2B**
>
> (1) Der Auftragnehmer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit, für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie nach dem Produkthaftungsgesetz.
>
> (2) Bei leicht fahrlässiger Verletzung einer wesentlichen Vertragspflicht ist die Haftung des Auftragnehmers auf den bei Vertragsschluss vorhersehbaren, vertragstypischen Schaden begrenzt. Wesentliche Vertragspflichten sind Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf.
>
> (3) Im Übrigen ist die Haftung bei leichter Fahrlässigkeit ausgeschlossen.
>
> (4) [Optional nach individueller Prüfung:] Soweit die Haftung nach Absatz 2 nicht unbeschränkt ist, ist sie je Schadensfall und Vertragsjahr auf [Betrag / Summe der in den letzten zwölf Monaten gezahlten Nettovergütung] begrenzt. Die Begrenzung gilt nicht für die Fälle des Absatzes 1.
>
> (5) Die vorstehenden Haftungsregelungen gelten auch zugunsten der gesetzlichen Vertreter, Mitarbeiter und Erfüllungsgehilfen des Auftragnehmers.

Ein veröffentlichtes AGB-Beispiel aus dem KI-/SaaS-Umfeld verwendet dieselbe Grundstruktur: unbeschränkte Haftung für Vorsatz, grobe Fahrlässigkeit und Personenschäden, bei Kardinalpflichten Begrenzung auf den vorhersehbaren vertragstypischen Schaden und im Übrigen Ausschluss einfacher Fahrlässigkeit.[1] Das ist eine Marktbeobachtung, keine Zusage der Wirksamkeit jeder einzelnen Formulierung.

## 7. Umsetzungsempfehlung: Welche Anlagen Sie wirklich brauchen

Die beste AGB-Klausel verhindert keinen Streit, wenn nicht feststeht, was genau gebaut und gewartet wird. Für jede kundenindividuelle Automation sollten folgende Anlagen Bestandteil des Vertrags sein.

| Anlage | Mindestinhalt | Zweck |
|---|---|---|
| Leistungsbeschreibung | Soll-Prozess, Trigger, Aktionen, Datenfelder, Systeme, Datenflüsse, Annahmen, Abnahmekriterien | Definiert die Soll-Funktion und macht „Störung“ objektiv prüfbar. |
| Drittanbieterregister | Anbieter, Produkt/API, Accountinhaber, Vertragspartei, Lizenzmodell, Hauptkontakt, kritische Abhängigkeit, Statusseite | Belegt Zuständigkeiten und erleichtert Incident-Kommunikation. |
| SLA / Supportbeschreibung | Servicezeit, Reaktionszeit, Prioritäten, Messobjekt, Wartungsfenster, Ausschlüsse, Kommunikationsweg | Verhindert, dass „Wartung“ fälschlich als 24/7-Betriebspflicht verstanden wird. |
| Wartungskatalog | Enthaltene Tätigkeiten, Kontingent, Zielumgebung, ausgeschlossene Tätigkeiten, Stundensatz über Kontingent | Macht die Abgrenzung zur Weiterentwicklung wirtschaftlich belastbar. |
| Change-Request-Formular | Ziel, Ursache, Auswirkungen, Angebot, Freigabe, Tests, Abnahme, Rollback | Schafft einen nachvollziehbaren Nachtrag. |
| Datenschutz-/Sicherheitsanlage | Rollen, Auftragsverarbeitung, Unterauftragsverarbeiter, Zugangskonzept, Geheimnisse/API-Schlüssel, Lösch- und Notfallkonzept | Trennt vertragliche Leistungsfragen von Datenschutz- und Sicherheitsanforderungen. |

## 8. Konkrete Anpassungspunkte vor Übernahme

Vor der Aufnahme in eigene AGB müssen die eckigen Klammern ausgefüllt und drei wirtschaftliche Entscheidungen getroffen werden. Erstens sollte klar sein, ob der Kunde oder die Agentur Vertragspartner der externen Plattform ist. Zweitens muss entschieden werden, ob die Agentur lediglich konfiguriert und betreut oder selbst eine durchgängige Verfügbarkeit zusagt. Drittens ist festzulegen, welche wiederkehrenden Anpassungen das Wartungsbudget tragen soll und ab welchem Umfang ein Change Request ausgelöst wird.

| Entscheidung | Empfehlungsrichtung für eine No-Code-Automatisierungsagentur | Folge für die Klausel |
|---|---|---|
| Accountinhaber für Lexware Office/OpenAI/Make | Regelmäßig der Kunde, wenn möglich. | Kundenseitige Mitwirkung und direkte Akzeptanz der Drittanbieterbedingungen klar regelbar. |
| Wartungspauschale | Enger Katalog plus Monatskontingent, z. B. [X] Stunden; Überhang nach Aufwand. | Verhindert unbegrenzte kostenlose Anpassungspflichten. |
| API-Breaking-Change | Geringfügige rückwärtskompatible Anpassung im Kontingent; alles darüber CR. | Faire, objektivierbare Abgrenzung. |
| Kritische Geschäftsprozesse | Zusätzliche SLA, Monitoring, Fehlerwarteschlange, manuelles Fallback und Eskalationsverfahren ausdrücklich bepreisen. | Ohne diese Anlage kein implizites End-to-End-Verfügbarkeitsversprechen. |
| KI-Ausgaben | Menschliche Prüfpflicht und fachliche Verantwortlichkeit des Kunden vorsehen. | Mindert Fehlgebrauchs- und Ergebnisrisiken; ersetzt aber keine eigene Sorgfalt bei der Integration. |

## Quellen

[1]: https://siteware.io/agb/ "Siteware GmbH, Allgemeine Geschäftsbedingungen, Stand 8. Mai 2026"
[2]: https://acs-gruppe.de/agb/ "ACS Gruppe, Allgemeine Geschäftsbedingungen, Stand August 2026"
[3]: https://openai.com/policies/services-agreement/ "OpenAI Services Agreement, aktualisiert 1. Dezember 2025, wirksam ab 1. Januar 2026"
[4]: https://www.digitale-verwaltung.de/Webs/DV/DE/aktuelles-service/it-einkauf/evb-it-und-bvb/aktuelle_evb-it-node.html "Bund: Aktuelle EVB-IT, abgerufen am 19. August 2026"
[5]: https://www.gesetze-im-internet.de/bgb/__307.html "§ 307 BGB – Inhaltskontrolle"
[6]: https://www.gesetze-im-internet.de/bgb/__310.html "§ 310 BGB – Anwendungsbereich"
[7]: https://www.gesetze-im-internet.de/bgb/__278.html "§ 278 BGB – Verantwortlichkeit des Schuldners für Dritte"
[8]: https://www.gesetze-im-internet.de/bgb/__276.html "§ 276 BGB – Verantwortlichkeit des Schuldners"
[9]: https://www.gesetze-im-internet.de/bgb/__309.html "§ 309 BGB – Klauselverbote ohne Wertungsmöglichkeit"
[10]: https://www.lexware.de/partner/public-api/ "Lexware Office Public API: Eigene Software anbinden"
[11]: https://openai.com/policies/services-agreement/ "OpenAI Services Agreement: Änderungen, Aussetzung, Gewährleistung und Drittanbieter"

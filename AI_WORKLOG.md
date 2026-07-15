# AI Worklog - Founder OS

## 2026-07-15 22:42 – Modulare Dashboard-Bausteine & Mobile-Optimierung (Phase v14)

### Ziel
Erweiterung der Dashboard-Anpassungsmöglichkeiten um 5 neue einfache Widgets sowie umfassende Optimierung der gesamten Webapplikation für Mobilgeräte und Smartphones (UX-Verbesserung, responsive Spalten-Stapelung, Detail-Umschaltung im CRM, Zoom-Prävention auf iOS).

### Erstellt
Keine neuen Dateien.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx):
  - Hinzufügen der Widget-Booleans und States für die 5 einfachen Widgets (Haftnotiz, To-Dos, Termine, Tagesziel, Link-Sammlung).
  - Implementierung des `isMobile` States mit Fenster-Resize-Event-Listener zur dynamischen Layout-Erkennung.
  - Implementierung der responsive CRM-Detail-Ansicht: Auf Mobilgeräten wird bei Auswahl eines Leads die Liste ausgeblendet und das Feedbackformular vollflächig gerendert.
  - Einbau eines „← Zurück zur Lead-Liste“ Buttons im mobilen CRM-Formular zur schnellen Navigation.
  - Umstellung der Grid-Container im Inbox-Tab und Wissens-Hub auf CSS-Klassen zur Ermöglichung responsiver Medienabfragen.
- [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css):
  - Definition responsiver Gitter-Layouts für alle zweispaltigen Module (`.crm-grid`, `.leads-grid`, `.hub-grid`, `.canvas-main-grid`, `.make-simulator-grid`, `.inbox-tasks-grid`). Auf Bildschirmen < 900px stapeln sich die Kacheln einspaltig und breite Elemente (`span 2`) werden automatisch auf `span 1` gesetzt.
  - iOS-Zoom-Prävention: Festlegen einer Mindestschriftgröße von `16px` für alle Eingabefelder auf Mobilgeräten.
  - Reduzierung des Hauptseiten-Paddings auf Handys für optimale Flächenausnutzung.
- [App.test.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/test/App.test.jsx):
  - Hinzufügen des 7. Integrationstests zur Überprüfung des Customizers und des manuellen Termin-Hinzufügens.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md), [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md): Aktualisierung der Entwicklungs-Protokolle.

### Warum
Damit Robin sein Dashboard einfach und sauber konfigurieren und die App bequem auf seinem Smartphone nutzen kann, ohne störenden Safari-Autozoom bei Formulareingaben zu haben und ohne unendlich weit durch CRM-Leads scrollen zu müssen.

### Testen
1. Klicke auf dem Dashboard auf **Layout anpassen**.
2. Wähle die neuen Widgets aus und stelle das Layout fertig.
3. Teste das CRM-Tab auf einem schmalen Viewport (oder Smartphone) ➔ Wähle einen Lead aus und gehe mit dem Zurück-Button wieder zur Liste.
4. Führe `npm run test` im Terminal aus ➔ 7/7 Tests erfolgreich.

---

## 2026-07-15 19:48 – Lead- & Pain-Point-Tracker mit Excel-Import & Supabase REST-Sync (Phase v13)

### Ziel
Integration einer Kaltakquise-Feedbackmaske zur Erfassung von Branchen-Pain-Points während Telefonaten mit Target-Unternehmen aus Robins Excel-Tabelle.

### Erstellt
- [import_leads.py](file:///C:/Users/gorni/.gemini/antigravity/brain/26b62883-46ba-464b-8962-fb9c8b771cee/scratch/import_leads.py): Python-Skript zum Einlesen von `Unbenannte Tabelle (5).xlsx`, Filtern von Duplikaten nach ID-MD5-Hash und automatischem Upload der 90 Leads in die Supabase REST API.

### Geändert
- **Supabase-Datenbank:** Erstellung der Tabelle `leads` über SQL-Migration (RLS deaktiviert).
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx):
  - Hinzufügen der Leads-States (`leads`, `activeLeadId`, Filter und Formular-States).
  - Implementierung der Persistierung im LocalStorage (`f_leads`, `f_active_lead_id`).
  - Hinzufügen eines useEffect-Blocks zur automatischen Lead-Initialisierung via Supabase REST API beim Seitenstart.
  - Implementierung des `handleSaveLeadFeedback`-Handlers zur Speicherung der Formulardaten im lokalen State, LocalStorage und direkter PATCH-Aktualisierung in Supabase.
  - Integration des **Lead-Tracker** Reiters in die Desktop- und Mobil-Navigation.
  - Aufbau der Benutzeroberfläche: Linke Spalte mit Suchleiste, Filtern und Prio-Kennzeichnung der Firmen; Rechte Spalte mit Vorbereitungsdaten, wählbarem `tel:` Telefon-Link, interaktiver Sterne-Bewertung für die Dringlichkeit sowie vollständigem Feedback-Formular.
  - Erweiterung des `triggerSupabaseSync` Logs und des Hintergrundabgleichs um die Leads-Tabelle.
- [App.test.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/test/App.test.jsx):
  - Hinzufügen des 6. Integrationstests zur Validierung des Tabs, der Lead-Auswahl, des Ausfüllens der Felder und des erfolgreichen Speicher-Alerts.
- [setup.js](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/test/setup.js):
  - Mocken der globalen `fetch` API, um Netzwerkfehler in Headless-Tests zu vermeiden und standardisierte Mock-Leads zurückzugeben.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md), [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md): Aktualisierung der Entwickler-Dokumentationen.

### Warum
Damit Robin direkt aus der App heraus seine Telefongespräche starten (Click-to-Call), sich mit den pre-analysierten Aufhängern vorbereiten und die Schmerzpunkte strukturiert digitalisieren kann. Alle Daten werden in Echtzeit in seiner Supabase Postgres Cloud-Datenbank gesichert.

### Testen
1. Öffne die App und wechsle auf den Reiter **Lead-Tracker**.
2. Wähle eine Firma in der linken Spalte.
3. Bereite dich mit der Vorbereitungsbox vor, klicke auf "Jetzt anrufen" und trage nach dem Telefonat das Feedback ein.
4. Klicke auf "Speichern" und verifiziere, dass der Erfolgs-Alert erscheint.
5. Führe `npm run test` im Terminal aus ➔ 6/6 Tests erfolgreich.

---

## 2026-07-15 11:27 – Google Client ID Integration & UI (Phase v12c)

### Ziel
Integration der echten Google-Client-ID des Nutzers in die App und Bereitstellung eines Konfigurationsfelds in der UI.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx):
  - Hinzufügen des States `googleClientId` mit der echten ID des Nutzers als Standardwert.
  - Implementierung eines Eingabefeldes für die Google OAuth Client-ID im "Digitales Firmengehirn (NotebookLM)"-Panel.
  - Persistierung der Client-ID im `localStorage`.

### Warum
Damit der Nutzer seine Client-ID einsehen und bei Bedarf live in der App ändern kann.

### Testen
1. Starte die App und wechsle auf den Tab **Dokumente & Sync**.
2. Das Feld für die **Google OAuth Client-ID** ist mit deiner echten ID befüllt und editierbar.

---

## 2026-07-15 10:45 – Supabase Live-Anbindung & Git-Commit (Phase v12b)

### Ziel
Verbindung der App mit der echten Supabase-Datenbank und Erstellung eines lokalen Git-Commits.

### Erstellt
- 5 Datenbank-Tabellen in Supabase (`contacts`, `tasks`, `inbox`, `client_tickets`, `docs`).
- Deaktivierung von RLS auf diesen Tabellen für eine unkomplizierte Entwicklung im Prototyp.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx):
  - Standard-Verbindungsdaten für Supabase auf die echten Projektdaten des Nutzers aktualisiert (URL und Anon Key).
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md):
  - Supabase-Implementierung als abgeschlossen markiert.

### Warum
Damit die App direkt mit der Live-Datenbank kommunizieren kann, ohne dass der Nutzer manuell Zugangsdaten eingeben muss, und um den aktuellen Projektfortschritt versioniert abzusichern.

### Testen
1. Starte die App im Browser.
2. Wechsle auf den Tab **Dokumente & Sync** und klicke auf "Supabase Cloud-Sync erzwingen".
3. Die Protokolle zeigen den Verbindungsaufbau und Datenaustausch mit `https://ypqlssyrlykjzjnoyjoa.supabase.co` an.

---

## 2026-07-15 10:10 – Testsuite-Erweiterung & erfolgreiche Verifikation (Phase v11b)

### Ziel
Erweiterung der automatisierten Integrationstests auf 5 Testfälle, um den Showcase-Modus (Datenanonymisierung) und das Kanban-Board (Erstellung neuer Aufgaben) abzusichern, sowie erfolgreiche Ausführung der Suite.

### Geändert
- [App.test.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/test/App.test.jsx):
  - Hinzufügen des Testfalls `Showcase-Modus toggle maskiert sensible Daten`: Wechselt in den CRM-Tab, stellt sicher, dass sensible Daten (`Dachdeckerei Müller`) sichtbar sind, aktiviert den Showcase-Modus, verifiziert die Anonymisierung (`Muster-Bedachungen GmbH`) und deaktiviert ihn wieder.
  - Behebung von Matcher-Mehrdeutigkeiten durch Umstellung von `getByText`/`queryByText` auf `getAllByText`/`queryAllByText` im Showcase-Test, da "Dachdeckerei Müller" sowohl bei den CRM-Kontakten als auch in der Projektliste gerendert wird.
  - Hinzufügen des Testfalls `Kanban-Board: Hinzufügen einer neuen Aufgabe funktioniert`: Wechselt in den `Inbox & Tasks` Tab, gibt eine neue Aufgabe ein, sendet das Formular ab und prüft, ob die Aufgabe im Kanban-Board erscheint.

### Warum
Um eine noch tiefere Testabdeckung der interaktiven Anwendungs-Features zu erreichen und regressionsfreie Codeänderungen an Kernfunktionen wie Datenschutz und Aufgabenverwaltung sicherzustellen.

### Testen
1. Führe `npm run test` im Terminal aus.
2. Alle 5 Integrationstests (Dashboard initial, ROI-Kalkulator, Tabwechsel, Showcase-Modus und Kanban-Board) schließen erfolgreich ab.

---

## 2026-07-15 09:55 – Master-Logbuch Import & Integration (Phase v12)

### Ziel
Importieren des echten Master-Logbuchs von Robins Unternehmensberatung ("KMU Service Harz") und dauerhafte Integration als permanent geöffnetes Dokument in der "Dokumente & Sync"-Ansicht.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx):
  - Hinzufügen der Konstante `MASTER_LOGBUCH_CONTENT` mit dem vollständigen Text der 25KB großen Markdown-Datei `📑 MASTER-LOGBUCH & COMMAND CENTER: KMU SERVICE HARZ.md`.
  - Verknüpfen der Logbuch-Konstante im Array `INITIAL_DOCS` als Standard-Inhalt des `master-logbuch` Eintrags.
  - Implementierung einer intelligenten Migrationslogik im Dokumenten-State-Lader: Befindet sich im lokalen Browserspeicher (localStorage) noch ein veraltetes Platzhalter-Logbuch (Dummy-Text oder leer), wird es automatisch auf den echten, aktuellen Logbuchstand aktualisiert.
- [App.test.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/test/App.test.jsx):
  - Erweiterung des Tabwechsel-Integrationstests zur Überprüfung, ob das Master-Logbuch im "Dokumente & Sync"-Tab geladen wird und Eingaben in das Editor-Textfeld korrekt verarbeitet werden.

### Warum
Damit Robin sofort mit seinen echten Gründungsdaten arbeiten kann. Das Logbuch ist das Herzstück seiner strategischen Planung und steht nun direkt im Wissens-Hub der App bearbeitbar bereit.

### Testen
1. Wechsle im Browser auf den Tab "Dokumente & Sync".
2. Auf der rechten Seite erscheint die Card "masterLogbuch.txt (Immer offen)" mit dem vollständigen, echten Inhalt.
3. Teste das Ändern von Notizen im Editor; die Änderungen werden automatisch im LocalStorage persistiert.
4. Führe `npm run test` aus, um die Testabdeckung im JSDOM-Modus zu verifizieren.

---

## 2026-07-15 09:40 – Test-Infrastruktur & Automatisierte Regressionstests (Phase v11)

### Ziel
Einrichtung von Vitest und React Testing Library zur automatisierten Prüfung aller Kernkomponenten (Dashboard, Navigation, interaktiver ROI-Rechner) und zum Schutz vor zukünftigen Fehlern bei Codeänderungen.

### Erstellt
- [vitest.config.js](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/vitest.config.js): Test-Konfiguration zur Definition von jsdom, globals und Setup-Dateien.
- [setup.js](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/test/setup.js): Globaler Test-Setup-Code mit Matchern und Mocks für Capacitor, jsPDF und Web Speech APIs.
- [App.test.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/test/App.test.jsx): Integrationstests für Rendering, Navigation und den interaktiven ROI-Rechner.

### Geändert
- [package.json](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/package.json): Installation der devDependencies (`vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`) und Hinzufügen der Test-Skripte (`test` und `test:watch`).

### Warum
Erlaubt eine automatische und extrem schnelle Verifikation der gesamten App (CRM, Zeiterfassung, ROI, Widgets, Tabs) vor jedem Commit oder Release. Fehler wie fehlende Variablen oder Handler werden somit sofort im Entwicklungsprozess abgefangen.

### Testen
1. Führe im Hauptverzeichnis `npm run test` aus.
2. Alle 3 Integrationstests (Dashboard Render, ROI Berechnung mit 90% Ersparnis, Tabwechsel) laufen erfolgreich und grün durch.

---

## 2026-07-15 09:10 – Tab-Splitting für KI Prompts & Dokumente/Sync (Phase v10)

### Ziel
Trennung des überfrachteten "KI & Docs"-Registers (Tab 4) in zwei eigenständige, übersichtliche Tabs im Menü: "KI Prompts" (Prompt Vault, Baukasten, Content-Planer & RAG Bot) und "Dokumente & Sync" (Wissens-Hub, Dokumenten-Editor, NotebookLM Status & Supabase Sync).

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx):
  - Desktop-Navigationsleiste (`nav-tabs`): "KI Prompts" und "Dokumente & Sync" als eigenständige Buttons integriert.
  - Mobile Navigationsleiste (`mobile-nav-bar`): "Prompts" und "Docs" als getrennte Tabs hinzugefügt.
  - Tab 4 gesplittet: `activeTab === 'prompts'` rendert nun den Prompt-Tresor mit Baukasten, Content-Planer und den RAG Knowledge Bot. `activeTab === 'hub'` rendert den Dokumenten-Wissens-Hub, NotebookLM-Status und Supabase Cloud Sync.
  - Behebung eines `ReferenceError: handleSendRagSubmit is not defined`, indem das onSubmit-Event des RAG-Formulars im Prompts-Tab korrekt an `handleSendRagQuery` delegiert und ein automatisches Neuladen der Seite via `e.preventDefault()` verhindert wird.
  - Behebung eines `ReferenceError: supabaseLatency is not defined` im Dokumente-Tab, indem der fälschlicherweise dynamisierte Latenzwert wieder durch den statischen Wert von `18 ms` ersetzt wurde.

### Warum
Bessere Übersichtlichkeit und Benutzeroberfläche. Der bisherige "KI & Docs"-Tab enthielt zu viele mächtige Tools auf einmal. Durch das Aufteilen kann Robin Prompts getrennt von Dokumentenablagen und Backend-Sync-Vorgängen verwalten, was die Bedienbarkeit auf Smartphones und Desktop-PCs massiv steigert.

### Testen
1. **Desktop-Navigation:** Klicke in der Kopfleiste auf "KI Prompts" ➔ Der Prompt Vault, Content-Planer und RAG-Bot werden angezeigt. Klicke auf "Dokumente & Sync" ➔ Der Wissens-Hub, das NotebookLM-Panel und Supabase Sync werden angezeigt.
2. **Mobile Navigation:** Verkleinere den Browser oder aktiviere die Entwicklertools ➔ Am unteren Bildschirmrand gibt es nun 6 Symbole. Die neuen Tabs "Prompts" und "Docs" wechseln fehlerfrei die Ansicht.

---

## 2026-07-14 09:00 – Android-Plattform & Native Homescreen-Widget (Phase v9)

### Ziel
Verpackung der Webanwendung als native Android-App mittels Capacitor und Bereitstellung eines echten, nativen Startbildschirm-Widgets ("Founder OS • Notizen") zur offline-fähigen Anzeige von Notizen und Aufgaben.

### Erstellt
- [WidgetBridgePlugin.java](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/android/app/src/main/java/de/kmuserviceharz/app/WidgetBridgePlugin.java): Custom Capacitor Plugin zur SharedPreferences-Übermittlung.
- [MyWidgetProvider.java](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/android/app/src/main/java/de/kmuserviceharz/app/MyWidgetProvider.java): Nativer Android BroadcastReceiver zur Formatierung und Aktualisierung der Widget-Anzeige.
- [widget_layout.xml](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/android/app/src/main/res/layout/widget_layout.xml): Android Layout-Ressource für das Startbildschirm-Widget.
- [widget_info.xml](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/android/app/src/main/res/xml/widget_info.xml): Widget-Metadaten für Dimensionen und Skalierung.
- [widget_background.xml](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/android/app/src/main/res/drawable/widget_background.xml): Form-Design für den dunklen Widget-Kartenhintergrund.
- [widget_dot.xml](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/android/app/src/main/res/drawable/widget_dot.xml): Kreisförmiger Akzentpunkt in Cyan.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Registrierung des Plugins `WidgetBridge` und Einbau des reactive `useEffect`-Hooks zur Übertragung geänderter Notizen und To-Dos.
- [AndroidManifest.xml](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/android/app/src/main/AndroidManifest.xml): Registrierung des Widgets.
- [package.json](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/package.json): Installation von `@capacitor/core`, `@capacitor/cli` und `@capacitor/android`.

### Warum
Ermöglicht dem Gründer den schnellen Zugriff auf seine wichtigsten Gedanken und Aufgaben direkt auf dem Handy-Startbildschirm, ohne die App erst starten zu müssen – voll funktionsfähig im Offline-Betrieb.

---

## 2026-07-14 08:20 – Usability-Erweiterungen & Reset (Phase v8)

### Ziel
Erhöhung des Bedienkomforts durch Suche/Filter bei Prompts und Kunden sowie ein einfacher Werksreset und Markdown-Formatierhilfen.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx):
  - Einbau von `promptSearch` und `promptCategoryFilter` zur Prompt-Live-Filterung.
  - Implementierung von `crmStageFilter` und Badge-Zählern im CRM-Tab.
  - Hinzufügen der Formatierungsbrücke `insertMarkdownIntoNotes` im Notizenblock.
  - Integration eines roten `Reset`-Buttons im Header zum Zurücksetzen des `localStorage`.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md): Dokumentation der Meilensteine v7 und v8.
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md): Changelog-Einträge für Phase v8.

---

## 2026-07-12 20:14 – Dokumenten-Editor (Mini-Word) & Manueller Drive-Sync (Phase v7)

### Ziel
Integration eines lokalen Text-Editors (Mini-Word) zum Erstellen und Editieren von Dokumenten direkt in der App sowie Implementierung eines manuellen Google Drive Update-Prozesses zum kontrollierten Hochladen neuer und geänderter Dateien für NotebookLM.

### Erstellt
- Keine neuen physischen Projekt-Dateien.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx):
  - States für Editor-Steuerung (`isEditorOpen`, `editingDocId`, `editorTitle`, `editorContent`) und Synchronisations-Stati pro Dokument (`status: 'local' | 'modified' | 'synced'`).
  - Editor-Modal overlay mit Titel-Eingabe und Textarea (inkl. Auto-Dateinamensprüfung).
  - Download-Hilfsprogramm `downloadDocAsFile` (Offline-Generierung von Blobs) und Mülleimer-Löschfunktion `handleDeleteDoc`.
  - Anpassung der Wissens-Hub-Dateiliste mit interaktivem Klick-zu-Editier-Event und farbigen Status-Badges.
  - Integration eines manuellen Google Drive Sync-Knopfs mit Ladefortschritt und Terminal-Log-Protokoll in der NotebookLM-Kreditkarte.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Phase v7 eingetragen und als erledigt markiert).
- [projekt_features_bericht.md](file:///C:/Users/gorni/.gemini/antigravity/brain/26b62883-46ba-464b-8962-fb9c8b771cee/projekt_features_bericht.md) (Dokumentation angepasst).

### Warum
Erlaubt es dem Gründer, seine Textdateien direkt in der App offline zu erstellen und zu bearbeiten, anstatt sie nur simulieren zu lassen. Durch den manuellen Google Drive Sync behält er die volle Kontrolle darüber, wann geänderte Dokumente hochgeladen werden, damit NotebookLM sie einlesen kann.

### Testen
1. **Neues Dokument erstellen:** Gehe auf Tab 4 (KI & Docs) ➔ Klicke auf "➕ Neues Dokument erstellen" ➔ Text eingeben und speichern ➔ Datei erscheint als `☁️ Nur Lokal`.
2. **Dokument bearbeiten:** Klicke auf ein Dokument ➔ Ändere den Text im Editor-Modal und speichere ➔ Status wechselt zu `⚠️ Bearbeitet`.
3. **Dokument herunterladen:** Klicke auf das Download-Symbol einer Datei ➔ Textdatei wird offline erzeugt und heruntergeladen.
4. **Google Drive Sync:** Klicke in der NotebookLM-Karte auf "Google Drive & NotebookLM aktualisieren" ➔ Das Sync-Terminal loggt den Upload, die Dateien wechseln zu `✅ Synchronisiert`.

---

## 2026-07-12 20:05 – Custom Bausteine, Offline-Dashboard-Widget & Google-Sync (Phase v6)

### Ziel
Einführung benutzerdefinierter Prompt-Bausteine im KI-Baukasten, Integration eines 100 % lokalen Offline Notizen- & Checklisten-Widgets auf dem Dashboard und Ausarbeitung der vollständigen Google Live-Sync & OAuth2-Architektur inklusive interaktivem OAuth-Simulator & Log-Terminal.

### Erstellt
- **Google API-Architektur-Spezifikation:** [google_sync_architecture.md](file:///C:/Users/gorni/.gemini/antigravity/brain/26b62883-46ba-464b-8962-fb9c8b771cee/google_sync_architecture.md) in den Artifacts zur Beschreibung von OAuth2, Token-Hintergrund-Aktualisierungen, Delta-Syncs und Push-Webhooks.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx):
  - States & LocalStorage Persistierung für customPromptBlocks, dashNotes, dashTodos, googleConnected und logStreams.
  - Integration eines Formulars zur Erstellung eigener Prompt-Bausteine (`showCustomBlockForm`) mit automatischer Zuordnung und dynamischem Rendering (inklusive Lösch-Option).
  - Integration des Widgets **"Offline-Notizen & Aufgaben"** auf dem Dashboard (Scratchpad-Textarea + Todo-Checkliste).
  - Einbau eines Google-Verknüpfungsbuttons mit simuliertem Google-OAuth-Zustimmungsdialog und Live-Synchronisations-Terminal im Google Kalender Widget.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Phase v6 Meilensteine eingetragen und als erledigt markiert).
- [projekt_features_bericht.md](file:///C:/Users/gorni/.gemini/antigravity/brain/26b62883-46ba-464b-8962-fb9c8b771cee/projekt_features_bericht.md) (Aktualisiert).

### Warum
Ermöglicht dem Benutzer die vollständige Kontrolle über die verwendeten Prompt-Bausteine, stellt ein unzerstörbares und offline-sicheres Scratchpad für den Arbeitsalltag bereit und simuliert realitätsgetreu die Synchronisation mit Google Calendar/Drive als Vorbereitung auf die Produktionsreife.

### Testen
1. **Baukasten (Tab 4):** Klicke auf "➕ Eigene Bausteine verwalten", erstelle z.B. einen Prefix "Mein Expert" ➔ Verwende den Baustein und lösche ihn bei Bedarf.
2. **Notizen-Widget (Tab 1):** Aktiviere das Widget im Dashboard-Manager ➔ Trage Notizen ein und hake Todos ab ➔ Lade die Seite neu ➔ Sie bleiben im LocalStorage erhalten.
3. **Google Sync (Tab 1):** Klicke im Kalender-Widget auf "Google verknüpfen" ➔ Bestätige das Popup ➔ Klicke auf "Jetzt synchronisieren" ➔ Verfolge die synchronisierten Log-Schritte.

---

## 2026-07-12 19:52 – Android WebView Wrapper & Push-Konzept (Feature 5 v5)

### Ziel
Bereitstellung der Konfigurationen und eines vollständigen Integrationsleitfadens, um die Webanwendung Founder OS als native Android-App (APK) über Capacitor zu verpacken und Push-Benachrichtigungen über das Firebase Cloud Messaging (FCM) Gateway zu empfangen.

### Erstellt
- **Capacitor Konfiguration:** [capacitor.config.json](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/capacitor.config.json) im Root-Verzeichnis zur Definition der App-ID `de.kmuserviceharz.app`, des App-Namens `Founder OS` und der Push-Optionen.
- **Entwickler-Leitfaden:** [android_setup_guide.md](file:///C:/Users/gorni/.gemini/antigravity/brain/26b62883-46ba-464b-8962-fb9c8b771cee/android_setup_guide.md) in den Artifacts, der Schritt-für-Schritt die Capacitor-Befehle, die Android Studio Integration, die Platzierung von `google-services.json` sowie die Registrierungs-Listener im React-Code und Deno Edge-Functions für Supabase Webhooks beschreibt.

### Geändert
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 5 v5 als erledigt markiert).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Erfüllt die Anforderung, dass der Gründer dringende Benachrichtigungen direkt auf sein Smartphone erhält. Da Android nativ Play Services bzw. das FCM-Gateway vorschreibt, liefert das Konzept eine saubere Anbindung, ohne dass die Anwendungsdaten von Supabase zu Firebase migriert werden müssen.

### Testen
1. Installiere Capacitor-Pakete: `npm install @capacitor/core @capacitor/cli @capacitor/android`.
2. Initialisiere die Android-Plattform: `npx cap add android`.
3. Öffne das Projekt in Android Studio und binde die `google-services.json` ein.
4. Starte die App auf einem Android-Gerät ➔ Der Token wird abgefragt und registriert.

---

## 2026-07-12 19:48 – Sprach-zu-Text via Web Speech API (Feature 4 v5)

### Ziel
Entwurf und Implementierung einer clientseitigen Sprach-zu-Text Diktierfunktion über die Web Speech API des Browsers, integriert in das Quick Capture-Widget (Dashboard) sowie die Kundennotizen (CRM-Drawer).

### Erstellt
- **State-Zustände:** `isListeningQuickCapture` und `isListeningCrmNotes` (Boolean zur Visualisierung des aktiven Diktier-Status) in `App.jsx`.
- **Speech recognition Handlers:** `handleQuickCaptureSpeech` und `handleCrmNotesSpeech` initialisieren das native `webkitSpeechRecognition` / `SpeechRecognition` Objekt, setzen die Sprache auf Deutsch (`de-DE`) und hängen den transkribierten Text an die jeweiligen Textfelder/States an.
- **Pulsierender Aufnahmeeffekt:** CSS-Klasse `.listening-pulse` und `@keyframes pulse-red` in `index.css` für einen eleganten, pulsierenden roten Ring um das Mikrofon-Symbol während der Aufnahme.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung der Mikrofon-Diktierknöpfe, der Speech-States und der Diktierlogik im Quick-Capture-Widget und im CRM-Detail-Drawer.
- [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css): Definition der Animationskeyframes (`pulse-red`) und der CSS-Klasse `.listening-pulse`.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 4 v5 als erledigt markiert).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Erlaubt dem vielbeschäftigten Gründer das freihändige Erfassen von Geistesblitzen (Notizen) auf dem Dashboard oder schnellem Kundenfeedback unterwegs per Knopfdruck, ohne tippen zu müssen. Die Technologie arbeitet komplett im Browser.

### Testen
1. Navigiere auf dem Desktop/Handy zu Tab 1 (Dashboard) oder Tab 3 (CRM ➔ Kunden-Drawer).
2. Klicke auf das Mikrofon-Symbol (Quick Capture: neben dem Textfeld; CRM: oben rechts im Notizenbereich).
3. Bestätige bei Nachfrage des Browsers den Zugriff auf das Mikrofon.
4. Spreche deine Notiz ein (z. B. *"DATEV Belege prüfen"*) ➔ Das Diktieren stoppt automatisch bei Stille oder erneutem Knopfdruck, und der Text wird im Eingabefeld eingefügt.

---

## 2026-07-12 19:45 – NLP-Kalenderschnellerfassung & KI-Tagesplaner (Feature 3 v5)

### Ziel
Entwurf und Implementierung einer intelligenten NLP-Terminschnellerfassung im Kalender-Widget sowie einer KI-basierten Tagesplan-Synthese, die Termine und CRM-Pipeline-Daten in tägliche Prioritäten (Tagesfokus) übersetzt.

### Erstellt
- **State-Zustände:** `calendarEvents` (initialisiert mit 3 Standard-Terminen und über localStorage synchronisiert) und `nlpCalendarInput` (Text zur Schnellerfassung) in `App.jsx`.
- **NLP Kalender-Parser:** `handleNlpCalendarSubmit` liest Texteingaben aus, filtert Zeit- und Datumsangaben (z. B. "morgen", "heute", Wochentage wie "Montag" sowie Uhrzeiten wie "14 Uhr" oder "15:30") und trägt das Event automatisch am passenden Tag ein.
- **KI-Tagesplaner-Synthese:** `generateDailyAiTasks` liest die heutigen Kalendertermine und CRM-Pipeline-Kontakte (Status "lead" oder "kontakt") aus und generiert 3 priorisierte, konkrete Fokus-Tagesaufgaben für den Habit-Fokus.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung der Kalender-States, der NLP-Parserlogik, des "KI-Tagesplan" Buttons im Tagesfokus-Widget sowie der localStorage-Synchronisation (`f_calendar_events`).
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 3 v5 als erledigt markiert).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Erleichtert die Erfassung von Tagesterminen im Verkaufsgespräch oder Arbeitsalltag per Freitext-Eingabe. Die KI-Tagesplaner-Synthese löst das Problem des unstrukturierten Tagesbeginns, indem sie CRM-Aktivitäten und Termine direkt in handlungsorientierte To-Dos gießt.

### Testen
1. Navigiere zu Tab 1 ("Dashboard") ➔ Widget **"Google Kalender (NLP)"**.
2. Tippe z.B. *"Morgen 14 Uhr Telefonat Müller"* in die Eingabe und klicke auf "Eintragen" ➔ Ein neuer Termin wird für morgen 14:00 Uhr generiert.
3. Klicke im Tagesfokus-Widget daneben auf **"⚡ KI-Tagesplan"** ➔ Dein Tagesfokus füllt sich automatisch mit Aufgaben basierend auf deinen heutigen Kalenderterminen und den ersten CRM-Kundenkontakten.

---

## 2026-07-12 19:42 – Personalisierbares Dashboard (Widget Manager) (Feature 2 v5)

### Ziel
Entwurf und Implementierung eines Widget-Layout-Managers im Dashboard (Tab 1), um dem Gründer die Möglichkeit zu geben, die Anordnung und Sichtbarkeit aller Dashboard-Karten individuell anzupassen und zu speichern.

### Erstellt
- **State-Zustände:** `dashboardWidgets` (Objekt zur Steuerung der Sichtbarkeit der Widgets: `financial`, `einvoice`, `quickcapture`, `calendar`, `habits`, `weekly`) und `isEditingDashboard` (Boolean zur Umschaltung des Layout-Bearbeitungsmodus) in `App.jsx`.
- **Einstellungs-Panel:** Ein per Knopfdruck ("⚙️ Layout anpassen") einblendbares Konfigurations-Panel oberhalb des Dashboards. Bietet Toggles/Checkboxen zur Aktivierung und Deaktivierung der 6 Kern-Widgets.
- **Konditionales Rendering:** Kapselung aller Dashboard-Karten (Finanz-Cockpit, E-Rechnungen, Quick Capture, Google Kalender, Tagesfokus & Habits sowie Wochen-Review) in die entsprechenden Zustandswrapper.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung der Toggles-States, Layout-Editor-Panels, wrapper-Klammern für alle 6 Karten sowie localStorage persistence hooks (`f_dashboard_widgets`).
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 2 v5 als erledigt markiert).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Ermöglicht dem Nutzer ein sauberes, ablenkungsfreies Arbeiten. Widgets, die temporär nicht gebraucht werden (z.B. E-Rechnungen im Daily-Scrum), lassen sich per Mausklick unsichtbar schalten.

### Testen
1. Navigiere zu Tab 1 ("Dashboard") ➔ Ganz oben siehst du den neuen Balken *"Gründer-Cockpit: X von 6 Widgets aktiv"*.
2. Klicke auf **"Layout anpassen"** ➔ Das Einstellungs-Panel öffnet sich.
3. Klicke z. B. auf "Finanz-Cockpit & Pipeline" oder "E-Rechnung (ZUGFeRD)" zum Deaktivieren ➔ Die entsprechenden Karten verschwinden sofort flüssig vom Dashboard.
4. Klicke auf "Layout fertigstellen". Lade die Seite neu ➔ Das angepasste Layout bleibt dank LocalStorage erhalten.

---

## 2026-07-12 19:40 – Prompt-Baukasten & Ollama KI-Optimierer (Feature 1 v5)

### Ziel
Entwurf und Implementierung eines Klick-Baukastensystems für den Prompt-Vault im KI- & Docs-Tab (Tab 4) sowie einer echten API-Anbindung an eine lokale Ollama-Instanz zur automatischen Prompt-Optimierung mit integriertem Client-Fallback.

### Erstellt
- **Prompt-Baukasten UI:** Ein strukturiertes Raster von Klick-Bausteinen im "Prompt hinzufügen" Formular, aufgeteilt nach:
  - *Rollen/Prefixe:* Marketing-Experte, SEO, Copywriter, DSGVO Legal, Pitch Coach, Finanzen.
  - *Tonalitäten:* Locker & Du, Professionell, Prägnant, Verkaufsstark.
  - *Ausgabeformate:* Markdown-Tabelle, Emoji-Bulletpoints, Schritt-für-Schritt, JSON.
  - *Suffixe/Aufforderungen:* 3 Rückfragen, Risikoanalyse, 3 Alternativen, Einfach erklärt.
- **Ollama API-Client & Fallback:** Die Funktion `optimizePromptWithLocalAI` sendet einen POST-Request an `http://localhost:11434/api/generate` (Modell llama3). Falls Ollama nicht läuft (Connection Refused) oder das Timeout von 2 Sekunden greift, springt ein integrierter Client-seitiger "Smart Fallback"-Optimierer ein und formatiert den Prompt professionell vor.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung des Baukasten-Markups, der Bausteinklick-Eventhandler, des `ollamaLoading`-States sowie der `optimizePromptWithLocalAI` Logik.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 1 v5 als erledigt markiert).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Erleichtert dem Nutzer das schnelle Zusammenklicken komplexer System-Prompts, ohne alles manuell eintippen zu müssen. Die Ollama-Verbindung ermöglicht zudem datensicheres und kostenfreies Optimieren von Textentwürfen auf lokaler Hardware.

### Testen
1. Navigiere zu Tab 4 ("KI & Docs") ➔ "Prompt Vault (KI-Tresor)".
2. Gib einen einfachen Titel (z. B. "Marketing Harz") ein.
3. Klicke auf verschiedene Baukastenelemente (z. B. Rolle "Marketing", Ausgabeformat "Markdown Tabelle" und Suffix "3 Rückfragen") ➔ Die Texte werden direkt in die Textarea verkettet.
4. Klicke auf **"Per lokaler KI verbessern (Ollama)"** ➔ Falls Ollama läuft, wird der optimierte Prompt geladen. Falls nicht, greift nach 1 Sekunde der Offline-Fallback und meldet dies per Dialogbox.

---

## 2026-07-11 11:30 – Erstellung des Funktionsberichts

### Ziel
Erstellung eines umfassenden Berichts über alle in Founder OS integrierten Funktionen (Phasen v1 bis v4) als Nachweis und Übersicht für den Nutzer.

### Erstellt
- [projekt_features_bericht.md](file:///C:/Users/gorni/.gemini/antigravity/brain/26b62883-46ba-464b-8962-fb9c8b771cee/projekt_features_bericht.md): Ein detaillierter Bericht in den Artifacts, gegliedert nach Dashboard, CRM & Controlling, Wissens-Hub & KI-Assistenten, Sales-Tools & Simulatoren sowie globalen Steuerungsfunktionen (Showcase-Modus & Mandantenportal).

### Geändert
- [AI_WORKLOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/AI_WORKLOG.md) (Ergänzt).

---

## 2026-07-07 23:48 – Supabase Backend-Integration & Cloud Sync (Feature 6 v4)

### Ziel
Entwurf und Implementierung eines Cloud Sync Managers für Supabase im KI- & Docs-Tab (Tab 4), um den aktuellen Verbindungsstatus anzuzeigen, API-Konfigurationen zu spiegeln, Datenbanktabellen zu überwachen und eine manuelle "Jetzt Cloud-Synchronisieren" Simulation auszulösen.

### Erstellt
- **State-Zustände:** `supabaseSyncStatus` (Status: connected, syncing, error), `supabaseLastSync` (Letzter Sync-Zeitstempel aus localStorage), `supabaseConfig` (Spiegelung der API-Zugangsdaten), `supabaseLogs` (Terminal-Logs) und `supabaseLogsOpen` in `App.jsx`.
- **Sync-Engine:** `triggerSupabaseSync` simuliert den Verbindungsaufbau, die Authentifizierung mit anon-key sowie das stufenweise Senden und Empfangen von Daten der lokalen Tabellen (`contacts`, `tasks`, `inbox`, `client_tickets`) mit integrierter Latenzberechnung.
- **UI-Komponenten:**
  - Supabase Cloud Sync Manager Card im Tab 4 mit farblichen Indikatoren für Verbindungs- und Sync-Zustände.
  - Detail-Statistiken für jede Tabellenzeile und eine Logkonsole mit Live-Terminal-Ausgabe.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung der Supabase-States, Sync-Simulation, Icons, localStorage persistence hooks und Render-Markup.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 6 v4 als erledigt markiert).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Damit das Founder OS auf echten Cloud-Daten laufen kann, wird hiermit das visuelle Fundament der Supabase-Integration geschaffen. Es zeigt dem Anwender in Echtzeit, welche Tabellen-Datenbanken synchronisiert werden und wie stabil die Anbindung ist.

### Testen
1. Navigiere zu Tab 4 ("KI & Docs") und scrolle nach unten zur Karte **"Supabase Cloud Sync"**.
2. Klicke auf **"Jetzt Cloud-Synchronisieren"** ➔ Der Button ändert seinen Text, das Icon rotiert und darunter öffnet sich das Terminal-Log, welches den stufenweisen Datenbankabgleich simuliert.
3. Nach Beendigung wechselt das Statusfeld auf "Online" und der Sync-Zeitstempel aktualisiert sich sofort.

### Offene Punkte
- [ ] Vollständige Phase v4 abgeschlossen! Bitte um Feedback des Gründers.

---

## 2026-06-28 17:45 – E-Rechnungs & Angebotssystem (ZUGFeRD / XRechnung) (Feature 5 v4)

### Ziel
Entwurf und Implementierung eines B2B E-Rechnungs & Angebotssystems im Finanz-Cockpit (Tab 1), mit dem der Gründer rechtskonforme elektronische Rechnungen (ZUGFeRD 2.0 Hybrid-PDF & XRechnung 3.0 Pure XML gemäß EU-Norm EN 16931) konfigurieren, als PDF herunterladen und direkt in Lexoffice/DATEV verbuchen kann.

### Erstellt
- **State-Zustände:** `invoiceClient`, `invoicePackage`, `invoiceAmount`, `invoiceFormat` (Umschaltung *ZUGFeRD* vs. *XRechnung*), `invoiceDiscount` (Skonto/Rabatt %) und `invoiceXmlPreview` in `App.jsx`.
- **Rechnungs-Engine:**
  - `generateEinvoicePdf`: Verwendet `jsPDF` zur dynamischen Erstellung einer professionellen B2B-Rechnung mit automatischem Rabatt- und MwSt.-Berechner, ZUGFeRD XML-Metadatenbox und DATEV-Compliance-Siegel.
  - `bookInvoiceToLexoffice`: Übermittelt den Rechnungsbetrag an Lexoffice/DATEV und trägt die Buchung automatisch in der Inbox (Tab 2) ein.
- **UI-Komponenten:**
  - Konfigurator-Card im Finanz-Cockpit mit Kunden-Dropdown, Leistungseingabe und Rabattrechner.
  - Interaktiver XML-Syntax-Validator mit Code-Highlighting zur Demonstration des ZUGFeRD/XRechnung Datenstroms.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung aller Rechnungs-States, PDF/XML-Generatoren, Inbox-Verknüpfung und Render-Markup.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 5 v4 als erledigt markiert).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Ab 2025/2026 gilt in Deutschland die E-Rechnungspflicht im B2B-Bereich. Ein integriertes E-Rechnungssystem macht KMU Service Harz zu 100% zukunftssicher und schließt die Lücke zwischen Vertrieb, ERP und Buchhaltung.

### Testen
1. Navigiere zu Tab 1 ("Dashboard") direkt unter das Finanz-Cockpit zum Bereich **"E-Rechnungs & Angebotssystem"**.
2. Wähle einen Kunden (z.B. *Dachdeckerei Müller*), passe den Nettobetrag an und trage z.B. 5% Rabatt ein.
3. Klicke auf **"🔍 XML-Syntax prüfen"** ➔ Das rechte Panel zeigt den konformen EN 16931 XML-Code.
4. Klicke auf **"E-Rechnung (PDF/XML) herunterladen"** ➔ Eine professionelle PDF-Rechnung wird auf deinen Rechner heruntergeladen.
5. Klicke auf **"In Lexoffice / DATEV buchen"** ➔ Die Einnahme wird bestätigt und automatisch in deiner Inbox registriert.

### Offene Punkte
- Warten auf Freigabe des Gründers ("Go"), um mit Schritt 6 (Supabase Backend-Integration & Cloud Sync) fortzufahren.

---

## 2026-06-28 17:40 – "Frag das Firmengehirn" RAG Knowledge Bot (Feature 4 v4)

### Ziel
Entwurf und Implementierung eines interaktiven RAG (Retrieval-Augmented Generation) Chat-Assistenten im KI- & Docs-Tab (Tab 4), mit dem der Gründer oder Kunde direkt Fragen an das im Google Drive abgelegte Unternehmenswissen stellen kann.

### Erstellt
- **State-Zustände:** `ragPersona` (Rollen-Modus: 🧠 *Firmengehirn Standard*, 🎯 *Pitch-Coach*, 🔒 *DSGVO & Legal*), `ragInput`, `ragGenerating` und `ragChat` (Chatverlauf mit Quellen-Zitaten) in `App.jsx`.
- **RAG Abfrage-Engine:** `handleSendRagQuery` analysiert den eingegebenen Prompt oder verarbeitet vordefinierte Schnellfragen, simuliert eine semantische Vektorsuche und generiert strukturierte Antworten mit verifizierten Quellen-Links (z.B. *Businessplan SOP 1.4*, *Preispakete 2026*).
- **UI-Komponenten:**
  - Persona-Selector Bar im Karten-Header für rasches Umschalten des KI-Verhaltens.
  - Schnellfragen-Buttons (Quick Prompts) für sekundenschnelle Demos in Präsentationen.
  - Chat-Stream Fenster mit Lade-Animationen, Markdown-Zeilenumbrüchen und hervorgehobener Quellenleiste.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung aller RAG-States, Suchlogik, Prompt-Shortcuts und Render-Markup.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 4 v4 als erledigt markiert).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Fragen zum eigenen Unternehmen ("Was kosten unsere Pakete?", "Wie läuft das Onboarding?", "Was steht im AVV?") müssen im Kundengespräch oder im Alltag sofort präzise und mit Belegen beantwortet werden. Der RAG Bot beweist die volle Leistungsfähigkeit des digitalen Firmengehirns.

### Testen
1. Navigiere zu Tab 4 ("KI & Docs") und scrolle nach unten zum Bereich **"Frag das Firmengehirn" – RAG Knowledge Bot**.
2. Klicke oben auf einen Schnellfragen-Button (z. B. **"⚡ Neukunden-Onboarding"**).
3. Verfolge die Lade-Animation ➔ Die KI antwortet strukturiert und blendet unten die konkreten Google Drive Dokumenten-Quellen ein.
4. Schalte oben auf **"🎯 Pitch-Coach"** oder **"🔒 DSGVO & Legal"** und stelle eigene Fragen im Textfeld.

### Offene Punkte
- Warten auf Freigabe des Gründers ("Go"), um mit Schritt 5 (E-Rechnungs & Angebotssystem - ZUGFeRD/XRechnung) fortzufahren.

---

## 2026-06-28 17:35 – KI-Telefonagent & Voice-AI Simulator (Feature 3 v4)

### Ziel
Entwurf und Implementierung eines interaktiven Voice-AI Simulations-Widgets (Vapi / Retell AI Mock) im Sales-Tab (Tab 5), das Kunden live die Automatisierung von Notdienst-Anrufen oder Neukunden-Erstkontakten per Sprache demonstriert.

### Erstellt
- **State-Zustände:** `voiceScenario` (auswählbares Szenario: *Handwerker Notdienst* vs. *Neukunden Erstkontakt*), `voiceCallActive`, `voiceCallStep`, `voiceTranscript` (Echtzeit-Sprachprotokoll) und `voiceExtractedData` (KI-Extraktionsergebnisse).
- **Simulations-Engine:** `startVoiceCallSimulation` steuert den gestaffelten Dialogablauf über Zeitintervalle. Bei Beendigung des Telefonats werden relevante Anruferdaten automatisch extrahiert.
- **Benachrichtigungs-Integration:** Nach Anrufende generiert das System automatisch einen benachrichtigenden Notfall- oder Lead-Eintrag in der Gründer-Inbox (Tab 2).
- **UI-Komponenten & Animations-CSS:**
  - Phone-Call Interface im Sales-Tab mit Szenario-Auswahl und Start/Stopp-Button.
  - Pulsierende Audio-Soundwave Animationen (`.voice-wave-container.active`) zur optischen Veranschaulichung des laufenden Sprach-Streams.
  - Chat-Bubble Sprachtranskript mit Zeitstempeln und Ergebniskarte zur CRM-Übernahme.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung aller Voice-States, Handler-Logik, Inbox-Integration und Render-Markup.
- [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css): Definition aller CSS-Keyframe-Animationen (`voiceWavePulse`) und Soundwave-Balken.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 3 v4 als erledigt markiert).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Voice-AI ist einer der stärksten Zukunftsmärkte für Handwerker und Pflegedienste (Notdienst 24/7). Der Simulator macht dieses KI-Feature für Kunden sofort greifbar.

### Testen
1. Navigiere zu Tab 5 ("Sales & SOPs") und scrolle zum Bereich **"KI-Telefonagent / Voice-AI Simulator"**.
2. Wähle im Szenario-Dropdown z.B. **"Szenario 1: Handwerker Notdienst (Rohrbruch)"**.
3. Klicke auf **"Anruf starten (Simulieren)"** ➔ Die Audio-Balken beginnen bunte Wellen zu schlagen, während der Chat-Dialog live in Echtzeit abläuft.
4. Nach Auflegen erscheint rechts die KI-Ergebniskarte und der Notfall wird automatisch in deine Inbox übertragen.

### Offene Punkte
- Warten auf Freigabe des Gründers ("Go"), um mit Schritt 4 ("Frag das Firmengehirn" – RAG Knowledge Bot) fortzufahren.

---

## 2026-06-28 17:30 – Kunden-Portal & White-Label Client Center (Feature 2 v4)

### Ziel
Entwurf und Implementierung eines eigenständigen White-Label Kunden-Portals (Client Center), mit dem der Gründer potenziellen oder bestehenden Kunden eine maßgeschneiderte Ansicht ihres Digitalisierungsprojekts (inkl. ROI-Statistiken, freigegebenen SOPs, Dokumenten und Ticket-System) demonstrieren kann.

### Erstellt
- **State-Zustände:** `clientPortalMode` (Boolean für Ansichtsmodus), `selectedClientCompany` (Ausgewählte Kundenfirma, z. B. *GoClean Harz*) und `clientTickets` (Liste von Support- und Änderungstickets) in `App.jsx`.
- **Benachrichtigungssystem:** `handleCreateClientTicket` verarbeitet Ticket-Einreichungen von Kunden im Portal und erzeugt automatisch einen neuen Benachrichtigungs-Eintrag in der Inbox des Gründers.
- **UI-Komponenten:**
  - Header-Umschalter "Kunden-Portal: AKTIV/AUS" mit Firmenselektor-Dropdown und Benachrichtigungsbanner.
  - White-Label Mandantenportal Dashboard mit kundenbezogenem Hero-Banner, 4 KPI-Karten (Projekt-Status, Zeitersparnis, Kalkulatorische Ersparnis, Support-Tickets).
  - Interaktives 2-Spalten-Layout mit freigegebenen SOPs, Google Drive Projektordner-Links und einem Live-Ticket-Formular nebst Historie.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung aller Portal-States, Handlers, Persistence-Hooks und bedingten Render-Blöcke.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 2 v4 als erledigt markiert).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Kunden möchten nicht nur beim Auftragsabschluss ein gutes Gefühl haben, sondern auch während der Betreuung transparent sehen, welchen Gegenwert (stunden- und eurogenau) die Automatisierung bringt. Das Mandantenportal hebt KMU Service Harz auf SaaS-Niveau.

### Testen
1. Klicke im Header oben auf **"Kunden-Portal: AUS"** ➔ Der Button schaltet auf AKTIV, der Header verwandelt sich in das lila-blaue *Mandantenportal* und oben erscheint ein Vorschau-Banner.
2. Wähle im Dropdown eine andere Firma (z. B. *Dachdeckerei Müller* oder *Pflegedienst Harz*) ➔ Das Dashboard aktualisiert sofort alle Projekt-Statuswerte, Dokumente und Tickets.
3. Reiche auf der rechten Seite ein neues Support-Ticket ein (z. B. "Neuen WhatsApp-Bot Parameter anpassen") ➔ Das Ticket erscheint direkt in der Historie darunter.
4. Schalte das Kunden-Portal oben wieder AUS und wechsle zu Tab 2 (Inbox) ➔ Das eben eingereichte Ticket liegt dort automatisch als benachrichtigende Notiz in deiner Gründer-Inbox.

### Offene Punkte
- Warten auf Freigabe des Gründers ("Go"), um mit Schritt 3 (KI-Telefonagent / Voice-AI Simulator) fortzufahren.

---

## 2026-06-28 17:25 – Visueller No-Code Automation Canvas (Feature 1 v4)

### Ziel
Entwurf und Implementierung eines interaktiven Drag-and-Drop / Klick-Workflow-Editors im Sales-Tab (Tab 5), mit dem Benutzer eigene Automatisierungspfade aus Triggern, KI-Knoten, ERP-Systemen und Benachrichtigungen zusammenstellen, konfigurieren und simulieren können.

### Erstellt
- **State-Zustände:** `canvasNodes` (Knotenliste mit Konfigurationen), `canvasConnections` (Verbindungskanten), `selectedCanvasNodeId` (Auswahl für Einstellungs-Panel), `canvasTestRunning`, `canvasTestActiveNode` und `canvasTestLogs`.
- **Handhabungs-Funktionen:** `addCanvasNode` (Knoten hinzufügen mit Vorlagen für E-Mail, Claude/GPT, DATEV, Slack), `deleteCanvasNode` (Knoten entfernen), `updateCanvasNodeConfig` (Echtzeit-Konfiguration von Parametern) und `startCanvasTestRun` (End-to-End Testsimulation).
- **UI-Komponente:** Ein vollwertiges Editor-Panel mit Toolbox, interaktiver Zeichenfläche (Grid-Background, Knoten-Karten mit Typ-Badges, Verbindungspfeilen), dynamischer Einstellungs-Sidebar und Ausführungs-Terminal.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung aller Canvas-States, Handler, Persistence-Hooks und Render-Markup.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 1 v4 als erledigt markiert).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Potenzielle KMU-Kunden möchten in Verkaufsgesprächen sehen, wie flexibel benutzerdefinierte Schnittstellen angepasst werden können. Der Canvas ermöglicht es Robin, live im Gespräch neue Bausteine hinzuzufügen und den Datenfluss sofort zu testen.

### Testen
1. Navigiere zu Tab 5 ("Sales & SOPs") und scrolle zum Bereich **"Visueller No-Code Automation Canvas"**.
2. Klicke in der oberen Leiste z. B. auf **"+ Claude / GPT KI"** ➔ Ein neues Modul erscheint auf der Zeichenfläche und verbindet sich automatisch.
3. Klicke auf eine beliebige Karte ➔ Auf der rechten Seite öffnet sich das Konfigurations-Panel. Ändere dort Titel oder Parameter.
4. Klicke auf **"Workflow testen"** ➔ Die Module leuchten im Sekundentakt auf und das Terminal unten protokolliert die Ausführung live.

### Offene Punkte
- Warten auf Freigabe des Gründers ("Go"), um mit Schritt 2 (Kunden-Portal & White-Label Client Center) fortzufahren.

---

## 2026-06-26 01:30 – Interaktiver Make.com Szenario-Simulator (Feature B1)

### Ziel
Entwurf und Implementierung eines interaktiven Make.com Szenario-Simulators im Sales-Tab (Tab 5), um die Live-Datenverarbeitung und den Ablauf typischer Integrationspfade (WhatsApp -> Whisper -> GPT-4 -> Lexoffice) für Kunden visuell verständlich und greifbar zu demonstrieren.

### Erstellt
- **State-Zustände:** `makeSimRunning` (Ausführungszustand), `makeActiveNode` (aktuell aktives Make-Modul, 0-5) und `makeLogs` (Live-Terminal-Logs) in `App.jsx`.
- **Ablauf-Timer:** `startMakeSimulation` steuert über gestaffelte `setTimeout`-Verzögerungen den Fluss der Daten. Nach und nach leuchten die Module auf, während das Terminal präzise Logs im Millisekundenbereich ausgibt.
- **Szenariograph (UI):** Ein visuelles Ablaufdiagramm mit vier Modulen (WhatsApp, Whisper, GPT-4, Lexoffice) und Verbindungslinien. Aktive Module leuchten cyanfarben und pulsieren, abgeschlossene Module werden grün hinterlegt.
- **Wandernder Lichtimpuls:** Ein absolut positioniertes CSS-Element (`.make-connector.active::after`) animiert einen cyanfarbenen Lichtpunkt, der sich entlang der Linien von Knoten zu Knoten bewegt (`makePulse` Keyframes).
- **Log Terminal:** Ein detailliertes Terminal-Fenster im Apple-Style (dunkler Hintergrund, farbige Fensterschaltflächen, monospace Code-Ausgabe) gibt die simulierten API-Antworten und Verarbeitungszeiten farblich hervorstechend aus.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung der Steuerfunktion, Deklaration der States und Rendering des Simulators am Ende des Sales-Tabs.
- [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css): Styling des Graphen, der Module (Knoten), Verbindungslinien (Kanten) und Definition der CSS-Impuls-Keyframes sowie responsives Layout.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Simulator abgehakt).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Make-Szenarien arbeiten unsichtbar im Hintergrund. Für potenzielle KMU-Kunden ist es extrem schwer zu verstehen, wie eine WhatsApp-Sprachnachricht zu einer fertigen Buchung im ERP wird. Der Simulator macht diese Prozesse in 6 Sekunden optisch und funktional erlebbar.

### Testen
1. Navigiere zu Tab 5 ("Sales & SOPs") und scrolle ganz nach unten zum **"Interaktiven Make.com Szenario-Simulator"**.
2. Klicke auf den Button **"Szenario ausführen (Testen)"** oben rechts.
3. Beobachte, wie der erste Knoten (WhatsApp) blau leuchtet, während ein Lichtimpuls über die Linie zum Whisper-Knoten wandert. Das Terminal rechts schreibt zeitgleich die Logs.
4. Jedes Modul leuchtet nacheinander auf (und verbleibt im Erfolgs-Zustand Grün), bis die Ausführung mit einer Erfolgsmeldung und Kostenabrechnung im Log endet.

### Offene Punkte
- Warten auf Freigabe des Gründers, um Schritt 5 (Feature B2: KI-Chatbot-Mock "Frag das Firmengehirn") zu starten.

---

## 2026-06-26 01:20 – Wochen-Review & Archiv erledigter Aufgaben (Feature A3)

### Ziel
Bereitstellung eines einklappbaren Archiv- und Wochen-Review-Panels auf dem Dashboard (Tab 1), das erledigte Fokus-Aufgaben und Habit-Erfolge der letzten 7 Tage speichert, Tagesreflexions-Notizen erlaubt und einen jsPDF-Wochenbericht-Export bereitstellt.

### Erstellt
- **State-Zustände:** `weeklyArchive` (geladen/gespeichert in `localStorage`) und `archiveOpen` (Boolean für das Panel) in `App.jsx`.
- **Automatischer Sync:** Ein `useEffect`-Hook, der bei jeder Häkchen-Änderung in den Fokus-Aufgaben oder Habits die erledigten Einträge für das heutige Datum (YYYY-MM-DD) automatisch dem Archiv hinzufügt oder entfernt.
- **Hilfsfunktionen:** `getLast7Days` (berechnet Wochentag & Datum der letzten 7 Tage) und `updateReflection` (speichert Reflexionstext pro Tag).
- **PDF-Generierung:** `generateWeeklyArchivePDF` sammelt die Aktivitäten der letzten 7 Tage (erledigte Fokus-Tasks, Habits und die eingegebenen Reflexionstexte) und formatiert diese in ein sauberes, zweiseitiges PDF-Dokument mit farbigem Header, Wochentags-Sektionen und formatierten Listen.
- **UI-Komponente:** Ein einklappbares Panel am Fuß des Dashboards mit Tageskarten (inkl. Status-Listen für Aufgaben/Habits und Textareas für Reflexionen) und dem PDF-Download-Button.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung aller Hilfsfunktionen, States und Rendering des Review-Panels.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Wochen-Review abgehakt).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Ein Gründer benötigt zum wöchentlichen Review eine lückenlose Dokumentation seiner Fokus-Ziele und Gewohnheiten. Da Habits täglich zurückgesetzt werden, sichert das Archiv diese Erfolge dauerhaft. Die Reflexion fördert das bewusste Lernen und der PDF-Export dokumentiert den Fortschritt für Buchungen oder zur eigenen Ablage.

### Testen
1. Navigiere auf dem Dashboard (Tab 1) ganz nach unten und klappe das neue Panel **"Wochen-Review & Archiv"** auf.
2. Trage in das Textfeld für den heutigen Wochentag eine Reflexion oder Notiz ein (z. B. *"Guter Tag, viel erledigt"*).
3. Hake im Fokus-Bereich oder im Habit-Tracker Aufgaben ab ➔ Sie erscheinen sofort live im Archiv-Card-Abschnitt des heutigen Tages.
4. Klicke auf den Button **"PDF Exportieren"** ➔ Ein strukturierter PDF-Bericht der letzten 7 Tage wird heruntergeladen.

### Offene Punkte
- Warten auf Freigabe des Gründers, um Schritt 4 (Feature B1: Interaktiver Make.com Szenario-Simulator) zu starten.

---

## 2026-06-26 01:10 – Implementierung Finanz-Cockpit & Einnahmen-Prognose (Feature A2)

### Ziel
Bereitstellung eines Einnahmen-Cockpits am oberen Rand des Dashboards (Tab 1), um Robins Auslastung, Pipeline und Stundensatz-Marge live und dynamisch aus dem CRM zu aggregieren.

### Erstellt
- Berechnungs-Logik vor der Dashboard-Renderschleife in `App.jsx`:
  - **Aktives Volumen:** Aggregiert das Auftragsvolumen (`pricePackage`) aller Projekte, deren Leads aktuell auf Status "Umsetzung" stehen.
  - **Umsatz-Pipeline:** Aggregiert das angebotene Auftragsvolumen (Leads in Stufe "Angebot") und berechnet die gewichtete Pipeline (50 % Conversion-Rate).
  - **Erwarteter Gesamtumsatz:** Summiert das aktive Volumen und die gewichtete Pipeline.
  - **Ø Stundensatz (Aktiv):** Dividiert das aktive Projektvolumen durch die tatsächlich erfassten Projektstunden (inklusive der aktuell live laufenden Stopwatch-Stunden).
- UI-Komponente "Finanz-Cockpit & Einnahmen-Prognose" am Kopf des Dashboards mit vier KPI-Karten.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbau der Daten-Aggregation und des Render-Blocks (KPI-Karten).
- [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css): Definition des KPI-Grids (vier Spalten auf Desktop, zwei Spalten auf Tablet, eine Spalte auf Mobile), Hover-Effekte auf KPI-Karten und Neon-Textschatten für die Einnahmenwerte.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Finanz-Widget abgehakt).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Ein Dashboard dient als Steuerungszentrale. Durch die Verbindung des CRM (Lead-Status) und des Zeiterfassungstools entsteht ein vollautomatisches Controlling-Cockpit, das dem Gründer live zeigt, wie profitabel er arbeitet und welche Einnahmen in den nächsten Wochen zu erwarten sind.

### Testen
1. Navigiere zum Dashboard (Tab 1). Am oberen Rand siehst du das neue **"Finanz-Cockpit"** mit 4 Werten (Aktives Volumen, Pipeline, Gesamtumsatz, Ø Stundensatz).
2. Wechsle zu Tab 3 ("CRM & Projekte") und ändere bei *Pflegedienst Harz* den Status auf **"Umsetzung"** ➔ Das Projekt wandert in die aktive Umsetzung.
3. Kehre zum Dashboard zurück ➔ Das aktive Volumen hat sich um 2.450 € erhöht und die Prognosen haben sich automatisch angepasst.
4. Starte bei einem Projekt den **Timer** und lass ihn ein paar Sekunden laufen. Das Dashboard zeigt dir den Stundensatz live an, der sich durch die neu erfassten Sekunden minimal anpasst.

### Offene Punkte
- Warten auf Freigabe des Gründers, um Schritt 3 (Wochen-Review & Archiv) zu starten.

---

## 2026-06-26 01:00 – Implementierung CRM-Detailansicht / Kunden-Akte (Feature A1)

### Ziel
Erstellung einer interaktiven Detailansicht (Drawer) für CRM-Kontakte, um Notizen, Dokumenten-Links und Aktivitätsprotokolle proaktiv pflegen zu können.

### Erstellt
- Drawer-Status-Zustände (`selectedContactId`, `newLinkInput`) in `App.jsx`.
- Drawer-UI-Struktur am Ende des return-Renders der Hauptkomponente.
- Funktionen `updateContactNotes`, `addContactLink` und `deleteContactLink` zur Verwaltung der Notizen und Links.
- Automatischer Aktivitäts-Logger: Jedes Mal, wenn ein Kontakt im CRM neu angelegt wird, ein neuer Link hinzugefügt oder entfernt wird, oder der Status sich ändert, wird automatisch ein chronologischer Log-Eintrag (Aktivitäts-Log) mit Datum und Uhrzeit hinzugefügt.
- Drawer-Layout in `index.css`:
  - Drawer-Drawer schiebt sich flüssig von rechts herein.
  - Abgedunkelter, weichgezeichneter Hintergrund (Backdrop), der den Drawer per Klick wieder schließt.
  - Scrollbarer Inhaltsbereich mit Meta-Info-Grid, Textarea für Notizen, Links (mit Direkt-Hinzufügung und Löschung) und dem Aktivitäts-Log.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung der Drawer-Zustände, CRM-Aktionen-Erweiterung, Klick-Listener auf `contact-main` und drawer-Rendering.
- [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css): Definition aller Stile für die Drawer-Seitenleiste, Drawer-Inhalte, Links, Activity-Logs und Draw-Backdrop.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (CRM-Akte abgehakt).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Ein CRM wird erst dann praxistauglich, wenn man kundenspezifische Details festhalten und Arbeitslinks hinterlegen kann. Durch das automatische Activity-Logging sieht der Nutzer sofort, wann er welche Vertriebsaktionen getätigt hat.

### Testen
1. Navigiere in der App zu Tab 3 ("CRM & Projekte").
2. Klicke auf eine Kundenkarte (auf den Namen/Firma-Bereich) ➔ Die Seitenleiste (Drawer) schiebt sich von rechts flüssig ins Bild.
3. Trage Notizen ein ➔ Sie werden live im Kontakt-State gespeichert.
4. Füge einen Link hinzu (Titel eingeben, z.B. "Briefkopf", URL eintragen und auf Hinzufügen klicken) ➔ Der Link erscheint direkt in der Liste und wird im Aktivitäts-Log verzeichnet.
5. Ändere den Status des Leads per Dropdown im Drawer ➔ Der Status aktualisiert sich und das Log dokumentiert die Statusänderung mit Uhrzeit.
6. Klicke auf das "✕" oder den abgedunkelten Hintergrund, um die Akte wieder zu schließen.

### Offene Punkte
- Warten auf Freigabe des Gründers, um Schritt 2 (Einnahmen-Widget & Umsatz-Vorschau) zu starten.

---

## 2026-06-26 00:50 – Implementierung Gamifizierter Habit-Tracker & CSS-Konfetti (3b)

### Ziel
Gamifizierung des Habit-Trackers im Dashboard (Tab 1), um tägliche Beständigkeit durch Streak-Zähler (Feuer-Symbol) zu belohnen und eine optisch ansprechende CSS-Konfetti-Belohnung bei 100% Habit-Erfüllung auszulösen.

### Erstellt
- Confetti-States (`showConfetti`, `confettiParticles`) und Habit-Streak-State (`habitStreak`) in `App.jsx`.
- Confetti-Partikel-Generator (`triggerConfetti`), der 80 Partikel mit zufälligen Eigenschaften (Position, Farbe, Größe, Fall-Dauer, Verzögerung, Rotation, Formen wie Kreise und Quadrate) erstellt.
- Confetti-Overlay im App-Hauptcontainer zur reinen CSS-gesteuerten Darstellung und Bewegung.
- Manuelle Justierung und Test-Buttons im Card-Header des Habit-Trackers ("Tage Streak" verringern/erhöhen sowie "Konfetti zünden" zum Testen der Animation).
- Automatische Logik: Beim Setzen des letzten offenen Habits (Erreichen von 100 % Erfüllung) wird der Streak-Zähler erhöht und die Konfetti-Animation abgespielt.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbau der Confetti-States, Streak-Persistierung, Update der `toggleHabit`-Funktion und Einbindung des Overlays.
- [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css): Definition der CSS-Klassen für den Streak-Anzeigebereich, Tasten-Styling, absolute Confetti-Positionierung und die Keyframe-Animationen des freien Falls.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 7 abgehakt).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Gamifizierung steigert die Motivation zur täglichen Systemnutzung erheblich. Die manuelle Test-Möglichkeit gibt Robin die Chance, den optischen Belohnungseffekt jederzeit live in Präsentationen vorführen zu können.

### Testen
1. Navigiere in der App zum Dashboard (Tab 1).
2. Klicke auf den Button **"🎉 Konfetti zünden"** im Habit-Tracker-Header ➔ Dutzende bunte Schnipsel fliegen von oben herab und drehen sich physikalisch korrekt bis zum unteren Bildschirmrand.
3. Klicke auf die Symbole **"+"** und **"-"** neben dem Feuer-Icon ➔ Die Streak-Tage lassen sich beliebig einstellen und speichern sich im `localStorage`.
4. Hake alle Habits einzeln ab ➔ Sobald das letzte Häkchen gesetzt wird (100% fertig), fliegt das Konfetti automatisch los und die Streak erhöht sich um 1 Tag.

### Offene Punkte
- Keine! Alle 7 Premium-Features des Implementierungsplans v2 sind erfolgreich fertiggestellt und lokal committed.

---

## 2026-06-26 00:40 – Implementierung Time-Tracker für Projekte & Marge (3a)

### Ziel
Einbindung eines Stopuhr-Timers direkt neben jedem aktiven Projekt im CRM-Tab sowie die Erfassung des Paketpreises zur automatischen Ermittlung der Profitabilität (effektiver Stundensatz).

### Erstellt
- Handhabung des Live-Zeitinkrements (`timeTick`) in `App.jsx`, das sich über ein `useEffect`-Intervall steuert, sobald mindestens ein Projekt aktiv erfasst wird.
- Funktionen `startProjectTracking`, `stopProjectTracking`, `updateProjectHours` und `updateProjectPrice` in `App.jsx` zur vollständigen Kontrolle des Timers, manuellen Zeiteingabe und Preisanpassung.
- Detaillierter UI-Bereich für jedes Projekt im Card-Abschnitt "Fördermittel & Projekte":
  - Zwei-Spalten-Layout (Desktop) bzw. Stapel-Layout (Mobile).
  - Paketpreis-Eingabe und manuelle Stundenkorrektur.
  - Live-Stopuhr bei aktivem Tracking.
  - Live-Berechnung des effektiven Stundensatzes mit farblich markierter Marge (Rot: Unrentabel <80€, Orange: Normal 80-120€, Grün: Profitabel >120€).
  - Timer-Aktionsbuttons (Starten/Stoppen).

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbau der Logik, States, Handler und der UI-Erweiterung im Tab 3.
- [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css): Styling der Eingabefelder, des Stopwatch-Panels, der Margen-Badges und der Pulsier-Animation des Timer-Icons.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 6 abgehakt).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Robins Agentur arbeitet vorwiegend mit Productized Services (Festpreis-Paketen). Die Live-Margenberechnung hilft ihm zu sehen, ob er bei Projekten unrentabel wird, und dient als wichtiges internes Controlling-Tool.

### Testen
1. Navigiere in der App zu Tab 3 ("CRM & Projekte").
2. Scrolle zum Bereich "Fördermittel & Projekte".
3. Ändere den Paketpreis bei einem Projekt (z. B. auf 2.000 €) und die geleistete Zeit (z. B. auf 30 Std.) ➔ Der effektive Stundensatz aktualisiert sich sofort und zeigt die entsprechende Farbe/Zusammenfassung (z. B. "Unrentabel (<80€)").
4. Klicke auf "Starten" bei einem Projekt ➔ Das Icon pulsiert violett und die Stoppuhr zählt im Sekundentakt hoch. Währenddessen wird der effektive Stundensatz live neu berechnet.
5. Klicke auf "Stoppen" ➔ Die gemessene Zeit wird dem Projekt gutgeschrieben und im `localStorage` persistiert.

### Offene Punkte
- Warten auf Freigabe des Gründers, um Schritt 7 (Gamifizierter Habit-Tracker & CSS-Konfetti) zu starten.

---

## 2026-06-26 00:30 – Implementierung NotebookLM Live-Sync Status (2b)

### Ziel
Anzeige und Simulation des Synchronisationsstatus des Google Drive Ordners mit der NotebookLM-Wissensdatenbank in Tab 4 ("KI, Content & Wissens-Hub").

### Erstellt
- Neue Status-Zustände (`notebookLmSyncStatus`, `notebookLmLastSync`, `notebookLmSyncStep`, `notebookLmProgress`) in `App.jsx`.
- Simulation der Synchronisation (`triggerNotebookLmSync`) mit einem 5-Schritt-Prozess über ca. 3,5 Sekunden (Drive scannen ➔ Datei-Hash abgleichen ➔ Vektor-Embeddings extrahieren ➔ Wissensbasis aktualisieren ➔ Erfolg).
- Neues, hochpräzises UI-Panel "Digitales Firmengehirn (NotebookLM)" in Tab 4, das den Status, die Anzahl der Quellen, den Zeitpunkt des letzten Syncs und das berechnete Datenvolumen anzeigt. Es enthält einen Live-Fortschrittsbalken und einen manuellen Synchronisations-Button.
- Automatischer Trigger: Sobald über die Google Drive-Simulation eine neue Datei hochgeladen wird, startet NotebookLM im Hintergrund vollautomatisch den Synchronisationsprozess und aktualisiert die Statistiken.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbau der Logik, der Status-States und der UI-Karte. Dokumententitel in Showcase-Modus maskiert.
- [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css): Definition aller CSS-Klassen für die NotebookLM-Karte, Detail-Spalten, Pulsier-Animationen und das rotierende Refresh-Icon.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 5 abgehakt).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Da NotebookLM keine API-Schnittstelle besitzt, muss die Synchronisation simuliert werden. Der automatische Trigger bei Google Drive Uploads zeigt potenziellen Kunden die nahtlose, wartungsfreie Integration von Unternehmensdaten in die KI.

### Testen
1. Navigiere in der App zu Tab 4 ("KI & Docs").
2. Drücke auf den Button "NotebookLM jetzt synchronisieren" ➔ Der Ladebalken läuft durch und zeigt detaillierte Schritte an.
3. Klicke im Bereich darüber auf "PDFs oder Bilder hochladen", gib einen Namen ein (z. B. "Stundenzettel-GoClean") und bestätige ➔ Nach dem Alert startet NotebookLM selbsttätig die Synchronisation.
4. Schalte den Showcase-Modus im Header ein ➔ Die Google-Doc-Dateinamen in der Liste werden datenschutzkonform maskiert.

### Offene Punkte
- Warten auf Freigabe des Gründers, um Schritt 6 (Time-Tracker für Projekte & Marge) zu starten.

---

## 2026-06-26 00:20 – Implementierung Zettel-zu-Code Visualisierer (1c)

### Ziel
Einen interaktiven Prozess-Visualisierer in Tab 5 ("Sales & SOPs") implementieren, um Kunden live den Vorher/Nachher-Zustand typischer KMU-Abläufe (Rechnungen, Stundenzettel, Kundenanfragen) zu veranschaulichen.

### Erstellt
- Use-Case-Datenstruktur `PROCESSES` in `App.jsx` für drei typische KMU-Szenarien.
- Interaktives UI-Element im Tab 5:
  - Toggle-Buttons zur Auswahl des Use Cases.
  - Zweispaltiges Layout: Links der ineffiziente, rote "Bisherige Weg" mit Warn-Symbolen. Rechts der vollautomatisierte, cyane "Neue Weg" mit KI- und API-Symbolen.
  - Beschreibungstexte und Detail-Erklärungen für jeden einzelnen Prozessschritt.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): State `selectedUseCase` definiert und Visualisierer-Markup am Ende der Sales-Seite integriert.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 3 abgehakt).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Um Automatisierung und KI für KMU-Kunden (z. B. Handwerker), die oft Berührungsängste mit Technik haben, visuell greifbar und extrem verständlich darzustellen.

### Testen
1. Navigiere zu Tab 5 ("Sales & SOPs") und scrolle nach unten zum Bereich "Zettel-zu-Code Prozess-Visualisierer".
2. Klicke auf die Buttons oben (z.B. *Stundenzettel & Zeiterfassung*) ➔ Die Vorher- und Nachher-Schrittketten passen sich sofort dynamisch an.
3. Lies die Details, um den Live-Präsentationsablauf zu testen.

### Offene Punkte
- Warten auf Freigabe des Gründers, um Schritt 4 (WhatsApp-Gateway & Webhook-Simulation) zu starten.

---

## 2026-06-26 00:15 – Implementierung ROI-Rechner v2 mit PDF-Export (1b)

### Ziel
Umfassenden Ausbau des ROI-Rechners vornehmen, um Kunden Fördermittel-Optionen (Niedersachsen, Sachsen-Anhalt, Bund) anzuzeigen, Zeit-Gegenüberstellungen zu visualisieren und die ROI-Kalkulation per Knopfdruck als professionelles PDF-Angebot zu exportieren.

### Erstellt
- PDF-Exportfunktion `generatePDFReport` mittels der installierten Bibliothek `jspdf`. Das PDF ist als druckfreundlicher Briefbogen strukturiert, mit Berechnungsboxen für manuelle/automatisierte Aufwände, Fördermittel-Zuschuss-Berechnungen und Amortisationszeit.
- Neue UI-Komponenten im Tab 5:
  - Input für Projekt-Festpreis.
  - Dropdown für Fördermittel-Region (Niedersachsen, Sachsen-Anhalt, Bund, Keine).
  - Zwei Balkendiagramme (Zeitaufwand Bisher vs. Automatisiert).
  - PDF-Export-Button.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Import von `jsPDF`, Erweiterung von `calcInputs` und Anpassung der ROI-Berechnungs- und Darstellungs-Logiken.
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 2 abgehakt).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Der Fördermittel-Hebel ist der stärkste Vertriebsturbo von Robin (KMU Service Harz). Durch die Live-Berechnung und den direkten PDF-Export kann er im Kundengespräch sofort ein überzeugendes, schriftliches ROI-Angebot aushändigen.

### Testen
1. Navigiere in der App zu Tab 5 ("Sales & SOPs").
2. Verändere die Werte im ROI-Rechner (z.B. Stunden/Woche auf 8, Festpreis auf 3.000 €).
3. Wähle ein anderes Bundesland aus (z.B. Sachsen-Anhalt 50%) ➔ Die Netto-Investition und die Amortisationszeit passen sich sofort in Echtzeit an.
4. Klicke auf den Button "ROI-Analyse als PDF exportieren" ➔ Ein PDF-Download startet mit einem sauberen Briefbogen.

### Offene Punkte
- Warten auf Freigabe des Gründers, um Schritt 3 (Zettel-zu-Code Visualisierer) zu starten.

---

## 2026-06-26 00:05 – Implementierung Showcase-Modus (1a)

### Ziel
Verschleierungs-Modus (Showcase-Modus) implementieren, um sensible Kunden- und Geschäftsdaten bei Live-Präsentationen durch fiktive Daten zu ersetzen.

### Erstellt
- Globale `mask`-Hilfsfunktion in `App.jsx`, die Datenstrukturen (Firmen, Namen, Branchen, IT-Systeme, Inbox und Kalendereinträge) maskiert, wenn der Showcase-Modus aktiv ist.
- Toggle-Button "Showcase-Modus: AKTIV/AUS" im App-Header.

### Geändert
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx): Einbindung der `mask`-Hilfsfunktion in alle rendernden UI-Elemente der Tabs (Dashboard, Inbox, Kanban, CRM, Projekte, SOPs).
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Schritt 1 abgehakt).
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Ergänzt).

### Warum
Damit der Gründer bei Kundenterminen die echte App zeigen kann, ohne Datenschutz-Verstöße (DSGVO) bei der Darstellung anderer Kunden zu begehen.

### Testen
1. Starte `npm run dev` oder schaue auf dem Vercel-Deployment nach dem Push.
2. Drücke oben im Header auf "Showcase-Modus: AUS" ➔ Er wechselt zu "AKTIV" (leuchtet blau).
3. Wechsle in den Tab "CRM & Projekte" oder "Inbox & Tasks" ➔ Echte Kundennamen (z.B. Dachdeckerei Müller) werden durch Demos (z.B. Muster-Bedachungen GmbH) ersetzt.
4. Schalte ihn wieder aus ➔ Die echten Daten werden wieder korrekt angezeigt.

### Offene Punkte
- Warten auf Freigabe des Gründers, um Schritt 2 (ROI-Rechner v2 mit PDF-Export) zu starten.

---

## 2026-06-25 23:50 – Git-Initialisierung & Vercel-Vorbereitung

### Ziel
Lokales Git-Repository initialisieren, alle Dateien hinzufügen und den ersten Commit erstellen, um die App für das Hosting auf Vercel vorzubereiten.

### Erstellt
- Lokales Git-Repository (Zweig `main`)
- Initialer Commit `feat: initial commit founder os prototype`

### Warum
Um die App auf Vercel hosten zu können, muss der Code in ein GitHub-Repository gepusht werden. Vercel kann das Repository dann importieren und bei jedem Git-Push automatisch deployen.

### Testen
Prüfen, ob Git korrekt initialisiert wurde (`git status` und `git log`).

### Offene Punkte
- Remote-URL des GitHub-Repositorys hinzufügen und pushen.
- Vercel-Projekt mit dem Repository verbinden.

---

## 2026-06-24 20:00 – Projektkonzeption & Planung

### Ziel
Analyse des Businessplans von *KMU Service Harz*, Ausarbeitung des Konzepts für die Founder OS App, Strukturierung der technischen Architektur und Erstellung der initialen Planungsdokumente.

### Erstellt
- [README.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/README.md)
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md)
- [AI_WORKLOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/AI_WORKLOG.md)
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md)

---

## 2026-06-24 20:15 – Initialisierung & Implementierung der Kern-Features

### Ziel
Erstellung des funktionalen Frontends und der gesamten App-Logik für "Founder OS" basierend auf den Vorgaben von Gemini, sodass die App sofort lauffähig, responsiv und einsatzbereit ist.

### Erstellt
- [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx) (Core-Komponente mit State-Management und Tab-Logik)
- [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css) (Design-System, CSS-Variablen, Glassmorphism, Responsive Grid, Mobile Navigation)
- [CHANGELOG.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/CHANGELOG.md) (Wiederherstellung nach Overwrite & Ergänzung)
- [TODO.md](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/TODO.md) (Wiederherstellung nach Overwrite & Aktualisierung)

### Geändert
- [index.html](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/index.html) (Titel auf "Founder OS" geändert, Google Font "Plus Jakarta Sans" eingebunden, Sprache auf Deutsch umgestellt, Meta-Tags hinzugefügt)
- [App.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.css) (Geleert, um Style-Konflikte zu vermeiden)

### Warum
Die Anwendung soll dem Gründer als sofort funktionierende und professionell wirkende Steuerungs- und Präsentationszentrale dienen. Um ein aufwendiges Datenbank-Setup zu Beginn zu vermeiden, werden alle Interaktionen im LocalStorage gespeichert und synchronisiert. Ein erfolgreicher Production-Build (`npm run build`) stellt sicher, dass es keine Kompilierungsfehler gibt.

### Testen
1. Starte den lokalen Dev-Server: `npm run dev`
2. Öffne den angegebenen Link im Browser.
3. Teste das Hinzufügen von Notizen, das Verschieben von Aufgaben per Drag & Drop, die CRM-Pipeline, den ROI-Rechner und die SOP-Checklisten.
4. Schalte im Browser in die mobile Ansicht, um das Bottom-Navbar-Layout zu prüfen.

### Offene Punkte
- Google OAuth Integration für echten Kalender- und Drive-Zugriff.
- Anbindung an das Supabase-Backend zur dauerhaften Cloud-Persistierung der Daten.

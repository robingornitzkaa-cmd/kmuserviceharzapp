# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## [Unreleased]

### Added
- **Feature 2b (NotebookLM Live-Sync Status):** Integration eines Synchronisations-Status-Panels in Tab 4 (KI & Docs). Visualisiert den Online-Zustand des digitalen Firmengehirns (NotebookLM), die Anzahl der Quell-Dokumente, das hochgeladene Datenvolumen und den Zeitpunkt des letzten Syncs. Bietet eine manuelle Synchronisation mit Live-Ladebalken und Status-Schritten sowie einen automatischen Sync-Trigger, sobald Dokumente über die Google Drive-Simulation hochgeladen werden.
- **Feature 2a (WhatsApp-Gateway & Webhook-Simulation):** Ein neues Simulations-Panel in Tab 2 (Inbox & Tasks). Robin kann dort eine Nachricht eingeben, die nach 3 Sekunden Verarbeitungszeit (Whisper Transkription ➔ GPT-4 Strukturierung) live in der Inbox auftaucht. Optional lässt sich eine echte Make-Webhook-URL eintragen, an die die App die Nachricht als echten HTTP-POST sendet.
- **Feature 1c (Zettel-zu-Code Visualisierer):** Ein neuer interaktiver Bereich in Tab 5. Klick-Karten ermöglichen es, typische KMU-Use-Cases (Eingangsrechnungen, Stundenzettel, Kundenanfragen) auszuwählen. Gegenüberstellung des alten, manuellen Weges (rot schattiert mit Warn-Icons) und des neuen, automatisierten Weges (cyan schattiert mit KI-/Schnittstellen-Icons) zur pragmatischen Veranschaulichung der Digitalisierung im Kundengespräch.
- **Feature 1b (ROI-Rechner v2 mit PDF-Export):** Umfassender Ausbau des Showcase-Rechners. Erfassung von Festpreisen und Bundesland-Fördermitteln (Digitalbonus 50 % o.ä.). Visuelle Balkendiagramme stellen den Zeitaufwand (Bisher vs. Automatisiert) gegenüber. Ein neuer PDF-Export-Button generiert mittels `jspdf` ein professionelles, druckfreundliches Angebot (ROI-Kalkulation) als PDF-Download.
- **Feature 1a (Showcase-Modus):** Ein globaler Toggle-Button in der Kopfzeile blendet bei Bedarf alle echten Kunden- und Firmendaten aus und ersetzt sie durch fiktive, aber realistische Demodaten. Das ermöglicht Robin die App datenschutzkonform live beim Kunden zu präsentieren.
- Git-Repository initialisiert und den initialen Commit `feat: initial commit founder os prototype` erstellt.
- Vite + React Projekt-Setup im aktuellen Verzeichnis initialisiert.
- Installation von `lucide-react` für Icons.
- Modernes, responsives Design-System in [index.css](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/index.css) mit Glassmorphism-Effekten, dunklem Anthrazit-Thema, Plus Jakarta Sans Schriftart und nahtlosem Mobile-Layout.
- Vollständige Implementierung von [App.jsx](file:///c:/Users/gorni/Desktop/kmuserviceharzapp/src/App.jsx) mit allen Kern-Features des Gemini-Prompts:
  - **Dashboard:** Quick Capture, Google Kalender Mock, Habit-Tracker mit Auto-Reset bei Tageswechsel, Tagesfokus (max. 3 Aufgaben).
  - **Inbox & Tasks:** Notizen-Verwaltung, Umwandlung in Aufgaben, HTML5 Drag-and-Drop Kanban-Board.
  - **CRM & Projekte:** Kundenliste mit DATEV/System-Tags, Sales-Pipeline, Inaktivitäts-Warnung (>14 Tage), Fördermittel-Tracker.
  - **KI & Docs:** Prompt-Tresor mit Ein-Klick-Kopierfunktion, Content-Planer für Social Media, Google Drive Upload Simulation & Docs Deep-Links.
  - **Sales & SOPs:** Interaktiver ROI-Rechner (Echtzeit-Berechnung von Stunden und Euro pro Jahr), SOP-Vorlagen (Neukunden-Onboarding, Steuerberater-Pitch) und Generierung aktiver Kunden-Checklisten.
- Lokale Persistierung aller Daten im `localStorage` für sofortige, setup-freie Nutzung.

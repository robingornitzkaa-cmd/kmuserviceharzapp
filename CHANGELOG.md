# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## [Unreleased]

### Added
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

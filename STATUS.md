# 🚀 KMU Service Harz – Master Command Center & Live Status

## 📊 Aktueller Projektstatus
- **Projekt-Phase:** Phase 1 (Security Hardening), Phase 2 (Code Modularisierung) & Phase 3 (Onboarding & Make.com Automation Suite 2026) zu 100% ABGESCHLOSSEN.
- **Vercel Deployment:** Lokal gebaut und getestet (Vitest 61/61 Tests grün). Bereit für `git push`.
- **Kaltakquise-Datenbank:** 518 validierte B2B-Leads im Harz & 50km-Umfeld in Supabase (`public.leads`) live angebunden.
- **Onboarding & Make.com Suite:** 4 validierte JSON-Blueprints, 4 Stufen-Playbooks & 6 rechtssichere Vertragsvorlagen (AVV, GoBD, SLA) integriert.
- **KI & RAG Firmengehirn:** Google Gemini API mit Fallback-Kette angebunden (`gemini-3.1-flash-lite`, `gemini-3-flash`, etc.).
- **Letzte Aktualisierung:** 24.08.2026

---

## 🎯 Offene & Erledigte Aufgaben (To-Dos)

### 🔴 Wichtig / Aktuell
- [ ] Vercel Live-Deployment durchführen (`git push origin main`)
- [ ] Row-Level Security (RLS) in Supabase aktivieren (`ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;`)
- [ ] Erstgespräche für Prio-A Leads (Handwerk & Pflege) im Harz ausmachen

### 🟢 Erledigt
- [x] Make.com Workflow-Tresor & 4 JSON-Blueprints implementiert
- [x] 4-Stufen Onboarding-Playbooks (Audit, Standard-Setup, Meisterbetrieb, Retainer) integriert
- [x] Rechtssichere Vertragsvorlagen, DSGVO-AVV und GoBD-Verfahrensdokumentation erstellt
- [x] Finaler Businessplan 2026 & Fördermittel-Leitfaden abgeschlossen
- [x] Password-Wall (SHA-256) zum Schutz vertraulicher Kundendaten eingebaut
- [x] Gemini API Key von URL-Parametern auf HTTP-Header `x-goog-api-key` umgestellt
- [x] Supabase Secrets in `.env` ausgelagert
- [x] Android Backup deaktiviert (`allowBackup="false"`) und R8 Minifizierung aktiviert
- [x] Monolithische `App.jsx` in saubere Sub-Komponenten & Services zerlegt
- [x] 518 Harz-Leads mit automatischer Fallback-Verbindung verknüpft

---

## 🧠 Wichtige Architektur- & Business-Entscheidungen
1. **Local-First Architektur:** Sämtliche Eingaben (Notizen, Leads, Prompts, Habits) werden sofort im `localStorage` gespeichert und bei Online-Verbindung geräuschlos mit Supabase synchronisiert.
2. **Datenschutz (Showcase-Modus):** Sensible Firmennamen & Telefonnummern können per Klick im Header für Kundendemos anonymisiert werden.
3. **Multi-Modell KI Fallback:** Gemini API ist primär; bei Ratenbegrenzung greift die App automatisch auf nachfolgende Modelle, lokales Ollama und statischen Smart-Fallback zurück.

---

## 📄 Firmen-Wissen & Dokumentation
- **Master-Logbuch:** Dokumentiert Geschäftsstrategie, Leistungsangebote (Automation, WhatsApp-Bots, E-Rechnung) und Zielgruppen.
- **SOP Playbooks:** Onboarding-Leitfäden für Kaltakquise und Bestandskunden (inkl. GoClean Harz).

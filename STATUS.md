# 🚀 KMU Service Harz – Master Command Center & Live Status

## 📊 Aktueller Projektstatus
- **Projekt-Phase:** Phase 1 (Live-App Security Hardening) & Phase 2 (Code Modularisierung) zu 100% ABGESCHLOSSEN.
- **Vercel Deployment:** Lokal gebaut und getestet (Vitest 7/7 grün). Bereit für `git push`.
- **Kaltakquise-Datenbank:** 90 echte Leads in Supabase (`public.leads`) live angebunden.
- **KI & RAG Firmengehirn:** Google Gemini API mit Fallback-Kette angebunden (`gemini-3.1-flash-lite`, `gemini-3-flash`, etc.).
- **Letzte Aktualisierung:** 20.07.2026

---

## 🎯 Offene & Erledigte Aufgaben (To-Dos)

### 🔴 Wichtig / Aktuell
- [ ] Vercel Live-Deployment durchführen (`git push origin main`)
- [ ] Row-Level Security (RLS) in Supabase aktivieren (`ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;`)
- [ ] Erstgespräche für Prio-A Leads (Handwerk & Pflege) im Harz ausmachen

### 🟢 Erledigt
- [x] Password-Wall (SHA-256) zum Schutz vertraulicher Kundendaten eingebaut
- [x] Gemini API Key von URL-Parametern auf HTTP-Header `x-goog-api-key` umgestellt
- [x] Supabase Secrets in `.env` ausgelagert
- [x] Android Backup deaktiviert (`allowBackup="false"`) und R8 Minifizierung aktiviert
- [x] Monolithische `App.jsx` (~8.434 Zeilen) in 8 saubere Sub-Komponenten & Services zerlegt
- [x] 90 Supabase Kaltakquise-Leads mit automatischer Fallback-Verbindung verknüpft

---

## 🧠 Wichtige Architektur- & Business-Entscheidungen
1. **Local-First Architektur:** Sämtliche Eingaben (Notizen, Leads, Prompts, Habits) werden sofort im `localStorage` gespeichert und bei Online-Verbindung geräuschlos mit Supabase synchronisiert.
2. **Datenschutz (Showcase-Modus):** Sensible Firmennamen & Telefonnummern können per Klick im Header für Kundendemos anonymisiert werden.
3. **Multi-Modell KI Fallback:** Gemini API ist primär; bei Ratenbegrenzung greift die App automatisch auf nachfolgende Modelle, lokales Ollama und statischen Smart-Fallback zurück.

---

## 📄 Firmen-Wissen & Dokumentation
- **Master-Logbuch:** Dokumentiert Geschäftsstrategie, Leistungsangebote (Automation, WhatsApp-Bots, E-Rechnung) und Zielgruppen.
- **SOP Playbooks:** Onboarding-Leitfäden für Kaltakquise und Bestandskunden (inkl. GoClean Harz).

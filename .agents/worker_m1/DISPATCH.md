## 2026-08-24T19:07:42Z
MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Mission:
Implement Requirement 1: Steuerberater-Multiplikatoren-Kit & Handwerker-Direct-Mail-Kampagne:
1. Create standalone markdown documents in `DOCS/`:
   - `DOCS/Steuerberater_Kanzlei_Pitch_Deck_und_Leitfaden.md` (DATEV RDS 1.0 vs BDS, Pendelordner-Befreiung, Kanzlei-Partnermodell, GoBD-Verfahrensdokumentation)
   - `DOCS/Mandanten_Flyer_Vorlage_Handwerk.md` (Ausdruckbare Vorlage für Kanzleien zur Weitergabe an Handwerker mit 500 € Audit-Gutschein)
   - `DOCS/Direct_Mail_1_Seiter_518_Harzer_Handwerksmeister.md` (Haptischer Brief an 518 Meister, Hook 'Schluss mit dem Büro-Sonntag', QR-Code Platzhalter, 50% Förderung)
   - `DOCS/Telefon_und_Kaltakquise_Leitfaden_Handwerk.md` (Einwandbehandlung Vorzimmer & Meister auf Baustelle, 5-Punkte Validation-Pivot)
2. Update `src/constants/initialData.js` to register all 4 new templates under `INITIAL_DOCS` with appropriate tags (`vertrieb`, `steuerberater`, `handwerk`, `vorlage`) and full content so they are directly readable, searchable, and editable in DocsHub.
3. Update `src/components/DocsHub.jsx` if necessary to support filtering and quick-copying of sales assets.
4. Verify by running tests.

Write handoff.md in your working directory and send a message when complete.

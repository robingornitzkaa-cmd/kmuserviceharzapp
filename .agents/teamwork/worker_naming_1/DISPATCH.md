## 2026-10-12T11:52:26Z
Sender: 42c64cab-7d5c-43a1-87ef-ce3daf5fbe2f (Orchestrator)
Role: worker_naming_1 (Lead Naming Strategist & B2B Worker)

Tasks:
1. Erstelle die Datei `c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS\Markennamen_Strategie_Top10.md`:
   - Schritt 1 (Kontext-Extraktion): Exakt 3 prägnante Sätze (Geschäftsmodell, spitzeste Zielperson, Kernversprechen & Tonalität).
   - Schritt 2 (Semantische Exploration): Pro Feld (A, B, C, D) mindestens 5–8 Begriffe/Wortstämme in strukturierter Form.
   - Schritt 3 (Härtetest-Filter): Kompakt in Stichpunkten, inklusive konkret verworfener Negativbeispiele, über die 4 Filter (Meister-Test, Telefon-Test, Seriositäts- & Rechnungs-Test, Negativ-Filter bzgl. Buzzwords).
   - Schritt 4 (Top 10 Tabelle): Exakt 10 Namen gleichmäßig verteilt (3x Handwerk/Pragmatismus, 3x Nutzen/Ergebnis, 2x Kunstwort/Abstraktion, 2x Hybride Modelle).
     Tabelle: `| Kernname (Stand-alone) | Optionale Regional-Variante (mit Harz) | Kategorie | Empfohlener Claim (max. 5 Wörter) | Markenpsychologische Begründung (Warum der Handwerker sofort Vertrauen fasst) | Domain-Empfehlung (.de) |`
   - Striktes Verbot von Buzzwords (`Solutions`, `Tech`, `Digital`, `AI`, `Synergy`, `Excellence`, `Cloud`).
   - Jeder Claim max. 5 Wörter.
2. Führe per PowerShell eine echte Live-DNS-Prüfung (`Resolve-DnsName` oder `nslookup`) für alle 10 empfohlenen `.de`-Domains durch und dokumentiere die Befehle und Rohausgaben im Handoff-Report. Stelle sicher, dass keine Domain eine aktive fremde Website/A-Records auflöst.
3. Schreibe und führe ein automatisiertes Validierungs-Skript in PowerShell aus, das Folgendes prüft und verifiziert:
   - Buzzword-Filter: 0 Treffer für die 7 verbotenen Wörter in Namen, Regionalvarianten und Claims.
   - Claim-Wortzähler: alle 10 Claims <= 5 Wörter.
   - DNS-Verfügbarkeit aller 10 Domains.
   - Kollisionsprüfung gegen alle Wettbewerber aus `DOCS/Wettbewerbsanalyse*.md`.
4. Pflege `README.md`, `CHANGELOG.md` (unter `[Unreleased]`) und `TODO.md` gemäß den Benutzerregeln (deutsch, laientauglich, verständlich).
5. Führe `git add` und `git commit` mit sauberer Commit-Message aus (z. B. `feat(branding): erstelle Top-10-Markennamen-Strategie und Domain-Validierung`).
   STRIKTES VERBOT: Führe NIEMALS `git push` aus! Gib den Befehl für den Nutzer im Codeblock an.
6. Schreibe deinen Handoff-Report nach: `c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\worker_naming_1\handoff.md`.
7. Melde dich nach Fertigstellung per `send_message` beim Orchestrator mit Zusammenfassung und Pfaden.

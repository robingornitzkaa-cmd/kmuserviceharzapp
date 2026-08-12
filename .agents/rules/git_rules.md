# Git Commit & Push Regeln

Nach jeder abgeschlossenen Aufgabe oder wesentlichen Änderung an Dateien führt der Agent automatisch die folgenden Schritte aus:

1. **Staging & Commit**:
   ```bash
   git add .
   git commit -m "<type>: <aussagekräftige Beschreibung auf Deutsch oder Englisch>"
   ```

2. **KEIN Git Push**:
   Der Agent führt **niemals** automatisch `git push` aus. Der `git push` Befehl bleibt **immer** dem Nutzer überlassen, der ihn manuell im Terminal ausführt.

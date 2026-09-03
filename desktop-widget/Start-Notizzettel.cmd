@echo off
:: ==============================================================================
:: Founder OS - Desktop Notizzettel Starter
:: Startet den Notizzettel im Hintergrund ohne störendes Konsolenfenster
:: ==============================================================================
cd /d "%~dp0"
start "" powershell.exe -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -File "%~dp0FounderOS-StickyNote.ps1"
exit

# ==============================================================================
# Deaktiviert den automatischen Start des Notizzettels beim Windows-Hochfahren
# ==============================================================================
$StartupFolder = [Environment]::GetFolderPath("Startup")
$ShortcutPath = Join-Path $StartupFolder "Founder OS Notizzettel.lnk"

if (Test-Path $ShortcutPath) {
    Remove-Item $ShortcutPath -Force
    Write-Host "Autostart erfolgreich deaktiviert!" -ForegroundColor Yellow
} else {
    Write-Host "Autostart war nicht aktiv." -ForegroundColor Gray
}

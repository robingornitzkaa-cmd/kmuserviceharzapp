# ==============================================================================
# Aktiviert den automatischen Start des Notizzettels beim Windows-Hochfahren
# ==============================================================================
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$TargetCmd = Join-Path $ScriptDir "Start-Notizzettel.cmd"
$StartupFolder = [Environment]::GetFolderPath("Startup")
$ShortcutPath = Join-Path $StartupFolder "Founder OS Notizzettel.lnk"

$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $TargetCmd
$Shortcut.WorkingDirectory = $ScriptDir
$Shortcut.Description = "Founder OS Notizzettel für den Windows Desktop"
$Shortcut.IconLocation = "%SystemRoot%\System32\shell32.dll,70"
$Shortcut.Save()

Write-Host "Autostart erfolgreich aktiviert!" -ForegroundColor Green
Write-Host "Verknuepfung liegt in: $ShortcutPath" -ForegroundColor Cyan

# ==============================================================================
# Erstellt eine Verknüpfung für den Notizzettel auf dem Windows-Desktop
# ==============================================================================
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$TargetCmd = Join-Path $ScriptDir "Start-Notizzettel.cmd"
$DesktopFolder = [Environment]::GetFolderPath("Desktop")
$ShortcutPath = Join-Path $DesktopFolder "Founder OS Notizzettel.lnk"

$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $TargetCmd
$Shortcut.WorkingDirectory = $ScriptDir
$Shortcut.Description = "Founder OS Notizzettel für den Windows Desktop"
# Schickes Standard-Icon aus shell32.dll (Gelber Zettel / Notizblock: Index 70 oder 130)
$Shortcut.IconLocation = "%SystemRoot%\System32\shell32.dll,70"
$Shortcut.Save()

Write-Host "Verknuepfung erfolgreich auf dem Desktop erstellt: $ShortcutPath" -ForegroundColor Green

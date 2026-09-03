# ==============================================================================
# Founder OS - Windows Desktop Notizzettel (Sticky Note Widget)
# ==============================================================================
# Ein leichtgewichtiger, nativer Windows-Desktop-Notizzettel.
# - Speichert automatisch lokal in 'notes-data.json'
# - Unterstuetzt mehrere Notizen, Farben, Pin-to-Top (Immer im Vordergrund)
# - Enthaelt eine vorbereitete Schnittstelle fuer die spaetere Supabase-Cloud-Sync
# ==============================================================================

param(
    [switch]$DebugMode
)

Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase
Add-Type -AssemblyName System.Windows.Forms

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$DataFile = Join-Path $ScriptDir "notes-data.json"
$EnvFile  = Join-Path (Split-Path -Parent $ScriptDir) ".env"

# Unicode Symbole sicher definieren
$SymPinActive   = [char]::ConvertFromUtf32(0x1F4CC) # Pushpin
$SymPinInactive = [char]::ConvertFromUtf32(0x1F4CD) # Round pushpin
$SymTrash       = [char]::ConvertFromUtf32(0x1F5D1) # Wastebasket

# ------------------------------------------------------------------------------
# 1. Standard-Datenstruktur (Kompatibel mit Founder OS 'dash_notes_list')
# ------------------------------------------------------------------------------
$DefaultState = @{
    version      = "1.0"
    activeNoteId = "note_1"
    isPinned     = $true
    window       = @{
        left   = 120
        top    = 120
        width  = 360
        height = 430
    }
    notes = @(
        @{
            id        = "note_1"
            title     = "Notiz 1: Wichtige Gedanken"
            content   = "Willkommen zu deinem Founder OS Desktop-Notizzettel!`n`n- Tippe hier deine Gedanken ein`n- Wechsel oben die Farbe`n- Klicke auf '+' fuer weitere Zettel`n- Pinne den Zettel mit der Nadel fest"
            color     = "#fef08a"
            updatedAt = (Get-Date).ToString("o")
        },
        @{
            id        = "note_2"
            title     = "Notiz 2: Tages-Fokus"
            content   = "Top 3 Prioritaeten heute:`n1. `n2. `n3. "
            color     = "#bfdbfe"
            updatedAt = (Get-Date).ToString("o")
        }
    )
}

# ------------------------------------------------------------------------------
# 2. Lokale Lade- und Speicherfunktionen (JSON)
# ------------------------------------------------------------------------------
function Load-LocalNotes {
    if (Test-Path $DataFile) {
        try {
            $json = Get-Content -Path $DataFile -Raw -Encoding UTF8 | ConvertFrom-Json
            $state = @{
                version      = $json.version
                activeNoteId = $json.activeNoteId
                isPinned     = if ($null -ne $json.isPinned) { [bool]$json.isPinned } else { $true }
                window       = @{
                    left   = if ($json.window.left) { [double]$json.window.left } else { 120 }
                    top    = if ($json.window.top) { [double]$json.window.top } else { 120 }
                    width  = if ($json.window.width) { [double]$json.window.width } else { 360 }
                    height = if ($json.window.height) { [double]$json.window.height } else { 430 }
                }
                notes        = [System.Collections.ArrayList]@()
            }

            foreach ($n in $json.notes) {
                [void]$state.notes.Add(@{
                    id        = [string]$n.id
                    title     = [string]$n.title
                    content   = [string]$n.content
                    color     = if ($n.color) { [string]$n.color } else { "#fef08a" }
                    updatedAt = [string]$n.updatedAt
                })
            }

            if ($state.notes.Count -eq 0) {
                [void]$state.notes.Add($DefaultState.notes[0])
                $state.activeNoteId = "note_1"
            }
            return $state
        } catch {
            Write-Warning "Fehler beim Laden von notes-data.json. Verwende Standard-Werte."
        }
    }
    
    $state = @{
        version      = $DefaultState.version
        activeNoteId = $DefaultState.activeNoteId
        isPinned     = $DefaultState.isPinned
        window       = $DefaultState.window
        notes        = [System.Collections.ArrayList]@($DefaultState.notes)
    }
    Save-LocalNotes $state
    return $state
}

function Save-LocalNotes ($stateToSave) {
    try {
        $json = $stateToSave | ConvertTo-Json -Depth 6
        [System.IO.File]::WriteAllText($DataFile, $json, [System.Text.Encoding]::UTF8)
        return $true
    } catch {
        Write-Warning "Fehler beim Speichern: $_"
        return $false
    }
}

# ------------------------------------------------------------------------------
# 3. Vorbereitete Cloud-Sync-Schnittstelle (Phase 2 - Supabase Hook)
# ------------------------------------------------------------------------------
function Sync-NotesWithCloud {
    param(
        [hashtable]$AppState,
        [switch]$Force
    )
    return @{
        Success = $true
        Status  = "LocalReady"
        Message = "Lokal gespeichert"
    }
}

# ------------------------------------------------------------------------------
# 4. Farb-Definitionen (Post-it Palette)
# ------------------------------------------------------------------------------
$ColorMap = @{
    "#fef08a" = @{ Name = "Sonnengelb";   Bg = "#FEF08A"; Border = "#EAB308"; Text = "#1E293B" }
    "#bfdbfe" = @{ Name = "Himmelblau";   Bg = "#BFDBFE"; Border = "#3B82F6"; Text = "#1E293B" }
    "#bbf7d0" = @{ Name = "Minzgruen";    Bg = "#BBF7D0"; Border = "#22C55E"; Text = "#1E293B" }
    "#fbcfe8" = @{ Name = "Sanftrosa";    Bg = "#FBCFE8"; Border = "#EC4899"; Text = "#1E293B" }
    "#fed7aa" = @{ Name = "Pfirsich";     Bg = "#FED7AA"; Border = "#F97316"; Text = "#1E293B" }
    "#e9d5ff" = @{ Name = "Lavendel";     Bg = "#E9D5FF"; Border = "#A855F7"; Text = "#1E293B" }
    "#1e293b" = @{ Name = "Dark Mode";    Bg = "#1E293B"; Border = "#475569"; Text = "#F8FAFC" }
}

# ------------------------------------------------------------------------------
# 5. XAML Benutzeroberflaeche (WPF)
# ------------------------------------------------------------------------------
[xml]$xaml = @"
<Window
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    Title="Founder OS Notizzettel"
    Width="360" Height="430"
    MinWidth="280" MinHeight="300"
    WindowStyle="None"
    AllowsTransparency="True"
    Background="Transparent"
    ResizeMode="CanResizeWithGrip"
    ShowInTaskbar="True">

    <Window.Resources>
        <Style x:Key="HeaderBtn" TargetType="Button">
            <Setter Property="Background" Value="Transparent"/>
            <Setter Property="BorderThickness" Value="0"/>
            <Setter Property="Foreground" Value="#475569"/>
            <Setter Property="Cursor" Value="Hand"/>
            <Setter Property="FontWeight" Value="Bold"/>
            <Setter Property="FontSize" Value="13"/>
            <Setter Property="Width" Value="26"/>
            <Setter Property="Height" Value="26"/>
            <Setter Property="Template">
                <Setter.Value>
                    <ControlTemplate TargetType="Button">
                        <Border x:Name="bd" Background="{TemplateBinding Background}" CornerRadius="6">
                            <ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center"/>
                        </Border>
                        <ControlTemplate.Triggers>
                            <Trigger Property="IsMouseOver" Value="True">
                                <Setter TargetName="bd" Property="Background" Value="#25000000"/>
                            </Trigger>
                        </ControlTemplate.Triggers>
                    </ControlTemplate>
                </Setter.Value>
            </Setter>
        </Style>

        <Style x:Key="ColorCircle" TargetType="Button">
            <Setter Property="Width" Value="16"/>
            <Setter Property="Height" Value="16"/>
            <Setter Property="Margin" Value="2,0"/>
            <Setter Property="Cursor" Value="Hand"/>
            <Setter Property="Template">
                <Setter.Value>
                    <ControlTemplate TargetType="Button">
                        <Border Background="{TemplateBinding Background}" CornerRadius="8" BorderThickness="1" BorderBrush="#33000000"/>
                    </ControlTemplate>
                </Setter.Value>
            </Setter>
        </Style>
    </Window.Resources>

    <!-- Haupt-Rahmen mit Schatten -->
    <Grid Margin="10">
        <Border x:Name="MainBorder" Background="#FEF08A" CornerRadius="14" BorderThickness="1" BorderBrush="#D4D4D8">
            <Border.Effect>
                <DropShadowEffect BlurRadius="18" ShadowDepth="4" Direction="270" Color="#000000" Opacity="0.25"/>
            </Border.Effect>

            <Grid>
                <Grid.RowDefinitions>
                    <!-- Zeile 0: Header & Drag-Bereich -->
                    <RowDefinition Height="42"/>
                    <!-- Zeile 1: Notiz-Titel & Switcher -->
                    <RowDefinition Height="34"/>
                    <!-- Zeile 2: Textbereich -->
                    <RowDefinition Height="*"/>
                    <!-- Zeile 3: Footer mit Status & Counter -->
                    <RowDefinition Height="30"/>
                </Grid.RowDefinitions>

                <!-- 0. Header (DragMove bei Klick) -->
                <Border Grid.Row="0" x:Name="HeaderBar" Background="#15000000" CornerRadius="14,14,0,0" Cursor="SizeAll">
                    <Grid Margin="10,0,8,0">
                        <Grid.ColumnDefinitions>
                            <ColumnDefinition Width="Auto"/>
                            <ColumnDefinition Width="*"/>
                            <ColumnDefinition Width="Auto"/>
                        </Grid.ColumnDefinitions>

                        <!-- Brand Label -->
                        <StackPanel Grid.Column="0" Orientation="Horizontal" VerticalAlignment="Center">
                            <TextBlock Text="&#x1F4CC;" FontSize="14" Margin="0,0,6,0"/>
                            <TextBlock Text="Founder OS" FontWeight="Bold" FontSize="13" Foreground="#1E293B" VerticalAlignment="Center"/>
                        </StackPanel>

                        <!-- Farb-Auswahlpunkte -->
                        <StackPanel Grid.Column="1" Orientation="Horizontal" HorizontalAlignment="Center" VerticalAlignment="Center">
                            <Button x:Name="BtnColorYellow" Style="{StaticResource ColorCircle}" Background="#FEF08A" ToolTip="Sonnengelb"/>
                            <Button x:Name="BtnColorBlue"   Style="{StaticResource ColorCircle}" Background="#BFDBFE" ToolTip="Himmelblau"/>
                            <Button x:Name="BtnColorGreen"  Style="{StaticResource ColorCircle}" Background="#BBF7D0" ToolTip="Minzgruen"/>
                            <Button x:Name="BtnColorPink"   Style="{StaticResource ColorCircle}" Background="#FBCFE8" ToolTip="Sanftrosa"/>
                            <Button x:Name="BtnColorOrange" Style="{StaticResource ColorCircle}" Background="#FED7AA" ToolTip="Pfirsich"/>
                            <Button x:Name="BtnColorDark"   Style="{StaticResource ColorCircle}" Background="#1E293B" ToolTip="Dark Mode"/>
                        </StackPanel>

                        <!-- Fenster-Steuerung -->
                        <StackPanel Grid.Column="2" Orientation="Horizontal" VerticalAlignment="Center">
                            <Button x:Name="BtnPin" Style="{StaticResource HeaderBtn}" Content="&#x1F4CC;" ToolTip="Immer im Vordergrund (Pin)"/>
                            <Button x:Name="BtnMinimize" Style="{StaticResource HeaderBtn}" Content="&#x2014;" ToolTip="Minimieren"/>
                            <Button x:Name="BtnClose" Style="{StaticResource HeaderBtn}" Content="&#x2715;" ToolTip="Schliessen"/>
                        </StackPanel>
                    </Grid>
                </Border>

                <!-- 1. Notiz-Titel & Wechsel-Leiste -->
                <Border Grid.Row="1" Background="#0A000000" Padding="10,4,8,4">
                    <Grid>
                        <Grid.ColumnDefinitions>
                            <ColumnDefinition Width="*"/>
                            <ColumnDefinition Width="Auto"/>
                        </Grid.ColumnDefinitions>

                        <!-- Titel (Editierbar) -->
                        <TextBox x:Name="TxtTitle" Grid.Column="0" Text="Notiz 1" FontWeight="SemiBold" FontSize="13" 
                                 Background="Transparent" BorderThickness="0" Foreground="#1E293B" VerticalAlignment="Center"/>

                        <!-- Notiz-Navigation & Aktionen -->
                        <StackPanel Grid.Column="1" Orientation="Horizontal" VerticalAlignment="Center">
                            <Button x:Name="BtnPrevNote" Style="{StaticResource HeaderBtn}" Content="&#x25C0;" Width="22" Height="22" FontSize="10" ToolTip="Vorherige Notiz"/>
                            <TextBlock x:Name="TxtNoteCounter" Text="1 / 2" FontSize="11" Foreground="#475569" VerticalAlignment="Center" Margin="4,0"/>
                            <Button x:Name="BtnNextNote" Style="{StaticResource HeaderBtn}" Content="&#x25B6;" Width="22" Height="22" FontSize="10" ToolTip="Naechste Notiz"/>
                            <Button x:Name="BtnAddNote" Style="{StaticResource HeaderBtn}" Content="+" Width="22" Height="22" FontSize="14" Margin="6,0,2,0" ToolTip="Neue Notiz hinzufuegen"/>
                            <Button x:Name="BtnDeleteNote" Style="{StaticResource HeaderBtn}" Content="&#x1F5D1;" Width="22" Height="22" FontSize="11" ToolTip="Diese Notiz loeschen"/>
                        </StackPanel>
                    </Grid>
                </Border>

                <!-- 2. Haupt-Notizfeld -->
                <TextBox x:Name="TxtContent" Grid.Row="2"
                         AcceptsReturn="True"
                         AcceptsTab="True"
                         TextWrapping="Wrap"
                         VerticalScrollBarVisibility="Auto"
                         Background="Transparent"
                         BorderThickness="0"
                         Padding="14,10,14,10"
                         FontSize="14"
                         FontFamily="Segoe UI, Plus Jakarta Sans, Arial"
                         Foreground="#1E293B"/>

                <!-- 3. Footer Bar -->
                <Border Grid.Row="3" Background="#10000000" CornerRadius="0,0,14,14" Padding="10,0">
                    <Grid VerticalAlignment="Center">
                        <Grid.ColumnDefinitions>
                            <ColumnDefinition Width="*"/>
                            <ColumnDefinition Width="Auto"/>
                        </Grid.ColumnDefinitions>

                        <!-- Statusanzeige -->
                        <StackPanel Grid.Column="0" Orientation="Horizontal" VerticalAlignment="Center">
                            <Ellipse x:Name="StatusDot" Width="7" Height="7" Fill="#22C55E" Margin="0,0,5,0"/>
                            <TextBlock x:Name="TxtStatus" Text="Lokal gespeichert" FontSize="11" Foreground="#475569"/>
                        </StackPanel>

                        <!-- Wort- & Zeichenzaehler -->
                        <TextBlock Grid.Column="1" x:Name="TxtCharCount" Text="0 Woerter · 0 Zeichen" FontSize="11" Foreground="#64748B"/>
                    </Grid>
                </Border>
            </Grid>
        </Border>
    </Grid>
</Window>
"@

# ------------------------------------------------------------------------------
# 6. Initialisierung und Event-Handling
# ------------------------------------------------------------------------------
$reader = New-Object System.Xml.XmlNodeReader $xaml
$window = [System.Windows.Markup.XamlReader]::Load($reader)

# Elemente abrufen
$mainBorder    = $window.FindName("MainBorder")
$headerBar     = $window.FindName("HeaderBar")
$txtTitle      = $window.FindName("TxtTitle")
$txtContent    = $window.FindName("TxtContent")
$txtCounter    = $window.FindName("TxtNoteCounter")
$txtStatus     = $window.FindName("TxtStatus")
$statusDot     = $window.FindName("StatusDot")
$txtCharCount  = $window.FindName("TxtCharCount")
$btnPin        = $window.FindName("BtnPin")
$btnMin        = $window.FindName("BtnMinimize")
$btnClose      = $window.FindName("BtnClose")
$btnPrev       = $window.FindName("BtnPrevNote")
$btnNext       = $window.FindName("BtnNextNote")
$btnAdd        = $window.FindName("BtnAddNote")
$btnDelete     = $window.FindName("BtnDeleteNote")

# Farb-Buttons
$btnYellow = $window.FindName("BtnColorYellow")
$btnBlue   = $window.FindName("BtnColorBlue")
$btnGreen  = $window.FindName("BtnColorGreen")
$btnPink   = $window.FindName("BtnColorPink")
$btnOrange = $window.FindName("BtnColorOrange")
$btnDark   = $window.FindName("BtnColorDark")

# Globaler Status
$script:AppState = Load-LocalNotes
$script:IsUpdatingUi = $false
$script:AutoSaveTimer = New-Object System.Windows.Threading.DispatcherTimer
$script:AutoSaveTimer.Interval = [TimeSpan]::FromMilliseconds(750)

# Funktion: Aktive Notiz ermitteln
function Get-ActiveNote {
    $note = $script:AppState.notes | Where-Object { $_.id -eq $script:AppState.activeNoteId } | Select-Object -First 1
    if (-not $note -and $script:AppState.notes.Count -gt 0) {
        $note = $script:AppState.notes[0]
        $script:AppState.activeNoteId = $note.id
    }
    return $note
}

# Funktion: Farbe anwenden
function Set-StickyColor ($hex) {
    if (-not $ColorMap.ContainsKey($hex.ToLower())) {
        $hex = "#fef08a"
    }
    $cfg = $ColorMap[$hex.ToLower()]
    $mainBorder.Background = [System.Windows.Media.BrushConverter]::new().ConvertFromString($cfg.Bg)
    $mainBorder.BorderBrush = [System.Windows.Media.BrushConverter]::new().ConvertFromString($cfg.Border)
    $txtContent.Foreground = [System.Windows.Media.BrushConverter]::new().ConvertFromString($cfg.Text)
    $txtTitle.Foreground = [System.Windows.Media.BrushConverter]::new().ConvertFromString($cfg.Text)
    
    $note = Get-ActiveNote
    if ($note) {
        $note.color = $hex.ToLower()
        $note.updatedAt = (Get-Date).ToString("o")
        Trigger-AutoSave
    }
}

# Funktion: UI mit aktiver Notiz befuellen
function Render-ActiveNote {
    $script:IsUpdatingUi = $true
    $note = Get-ActiveNote
    if ($note) {
        $txtTitle.Text = $note.title
        $txtContent.Text = $note.content
        Set-StickyColor $note.color

        $idx = $script:AppState.notes.IndexOf($note) + 1
        $txtCounter.Text = "$idx / $($script:AppState.notes.Count)"
    }
    Update-CharCount
    $script:IsUpdatingUi = $false
}

# Funktion: Zaehler aktualisieren
function Update-CharCount {
    $text = $txtContent.Text
    $chars = $text.Length
    $words = if ([string]::IsNullOrWhiteSpace($text)) { 0 } else { ($text.Trim() -split "\s+").Count }
    $txtCharCount.Text = "$words Woerter · $chars Zeichen"
}

# Autosave-Trigger (Debounce)
function Trigger-AutoSave {
    if ($script:IsUpdatingUi) { return }
    $statusDot.Fill = [System.Windows.Media.BrushConverter]::new().ConvertFromString("#EAB308") # Gelb
    $txtStatus.Text = "Speichert..."
    $script:AutoSaveTimer.Stop()
    $script:AutoSaveTimer.Start()
}

$script:AutoSaveTimer.Add_Tick({
    $script:AutoSaveTimer.Stop()
    $note = Get-ActiveNote
    if ($note) {
        $note.title = $txtTitle.Text
        $note.content = $txtContent.Text
        $note.updatedAt = (Get-Date).ToString("o")
    }
    
    # Fensterposition mitmerken
    $script:AppState.window.left = $window.Left
    $script:AppState.window.top = $window.Top
    $script:AppState.window.width = $window.Width
    $script:AppState.window.height = $window.Height
    $script:AppState.isPinned = $window.Topmost

    $ok = Save-LocalNotes $script:AppState
    if ($ok) {
        $statusDot.Fill = [System.Windows.Media.BrushConverter]::new().ConvertFromString("#22C55E") # Gruen
        $txtStatus.Text = "Lokal gespeichert " + (Get-Date).ToString("HH:mm:ss")
    } else {
        $statusDot.Fill = [System.Windows.Media.BrushConverter]::new().ConvertFromString("#EF4444") # Rot
        $txtStatus.Text = "Fehler beim Speichern"
    }
})

# ------------------------------------------------------------------------------
# 7. Event-Registrierungen
# ------------------------------------------------------------------------------

# Verschieben des Fensters (Drag & Drop am Header)
$headerBar.Add_MouseLeftButtonDown({
    $window.DragMove()
})

# Pin / Always on Top umschalten
$btnPin.Add_Click({
    $window.Topmost = -not $window.Topmost
    $script:AppState.isPinned = $window.Topmost
    if ($window.Topmost) {
        $btnPin.Content = $SymPinActive
        $btnPin.ToolTip = "Immer im Vordergrund (Aktiviert)"
    } else {
        $btnPin.Content = $SymPinInactive
        $btnPin.ToolTip = "Normales Fenster (Deaktiviert)"
    }
    Trigger-AutoSave
})

# Minimieren & Schliessen
$btnMin.Add_Click({
    $window.WindowState = [System.Windows.WindowState]::Minimized
})

$btnClose.Add_Click({
    # Sofortiger letzter Save beim Schliessen
    $note = Get-ActiveNote
    if ($note) {
        $note.title = $txtTitle.Text
        $note.content = $txtContent.Text
        $note.updatedAt = (Get-Date).ToString("o")
    }
    $script:AppState.window.left = $window.Left
    $script:AppState.window.top = $window.Top
    $script:AppState.window.width = $window.Width
    $script:AppState.window.height = $window.Height
    $script:AppState.isPinned = $window.Topmost
    Save-LocalNotes $script:AppState
    $window.Close()
})

# Texteingaben
$txtContent.Add_TextChanged({
    Update-CharCount
    Trigger-AutoSave
})

$txtTitle.Add_TextChanged({
    Trigger-AutoSave
})

# Navigation zwischen Notizen
$btnPrev.Add_Click({
    $current = Get-ActiveNote
    $idx = $script:AppState.notes.IndexOf($current)
    if ($idx -gt 0) {
        $script:AppState.activeNoteId = $script:AppState.notes[$idx - 1].id
        Render-ActiveNote
        Trigger-AutoSave
    }
})

$btnNext.Add_Click({
    $current = Get-ActiveNote
    $idx = $script:AppState.notes.IndexOf($current)
    if ($idx -lt ($script:AppState.notes.Count - 1)) {
        $script:AppState.activeNoteId = $script:AppState.notes[$idx + 1].id
        Render-ActiveNote
        Trigger-AutoSave
    }
})

# Neue Notiz hinzufuegen
$btnAdd.Add_Click({
    $newNum = $script:AppState.notes.Count + 1
    $newId = "note_" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    $newNote = @{
        id        = $newId
        title     = "Notiz $newNum"
        content   = ""
        color     = "#fef08a"
        updatedAt = (Get-Date).ToString("o")
    }
    [void]$script:AppState.notes.Add($newNote)
    $script:AppState.activeNoteId = $newId
    Render-ActiveNote
    Trigger-AutoSave
})

# Notiz loeschen
$btnDelete.Add_Click({
    if ($script:AppState.notes.Count -le 1) {
        [System.Windows.MessageBox]::Show(
            "Die letzte verbleibende Notiz kann nicht geloescht werden.", 
            "Founder OS Notiz", 
            [System.Windows.MessageBoxButton]::OK, 
            [System.Windows.MessageBoxImage]::Information
        )
        return
    }

    $res = [System.Windows.MessageBox]::Show(
        "Moechtest du diese Notiz wirklich loeschen?", 
        "Notiz loeschen", 
        [System.Windows.MessageBoxButton]::YesNo, 
        [System.Windows.MessageBoxImage]::Question
    )
    if ($res -eq [System.Windows.MessageBoxResult]::Yes) {
        $current = Get-ActiveNote
        $script:AppState.notes.Remove($current)
        $script:AppState.activeNoteId = $script:AppState.notes[0].id
        Render-ActiveNote
        Trigger-AutoSave
    }
})

# Farbwahl-Buttons
$btnYellow.Add_Click({ Set-StickyColor "#fef08a" })
$btnBlue.Add_Click({   Set-StickyColor "#bfdbfe" })
$btnGreen.Add_Click({  Set-StickyColor "#bbf7d0" })
$btnPink.Add_Click({   Set-StickyColor "#fbcfe8" })
$btnOrange.Add_Click({ Set-StickyColor "#fed7aa" })
$btnDark.Add_Click({   Set-StickyColor "#1e293b" })

# ------------------------------------------------------------------------------
# 8. Start & Fenster-Wiederherstellung
# ------------------------------------------------------------------------------
if ($script:AppState.window) {
    $window.Left   = $script:AppState.window.left
    $window.Top    = $script:AppState.window.top
    $window.Width  = $script:AppState.window.width
    $window.Height = $script:AppState.window.height
}

$window.Topmost = [bool]$script:AppState.isPinned
if ($window.Topmost) {
    $btnPin.Content = $SymPinActive
    $btnPin.ToolTip = "Immer im Vordergrund (Aktiviert)"
} else {
    $btnPin.Content = $SymPinInactive
    $btnPin.ToolTip = "Normales Fenster (Deaktiviert)"
}

Render-ActiveNote

# Fenster anzeigen
[void]$window.ShowDialog()

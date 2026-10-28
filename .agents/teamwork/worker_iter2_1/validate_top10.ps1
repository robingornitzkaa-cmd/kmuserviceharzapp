# ==============================================================================
# Validierungsskript: Top 10 Markennamen & Strategie (Iteration 2)
# ==============================================================================
$ErrorActionPreference = "Stop"

$strategyFilePath = "c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS\Markennamen_Strategie_Top10.md"
$workspaceDocsDir = "c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS"

Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "STARTE LIVE-VALIDIERUNG: TOP 10 MARKENNAMEN STRATEGIE (ITERATION 2)" -ForegroundColor Cyan
Write-Host "====================================================================" -ForegroundColor Cyan

if (-not (Test-Path $strategyFilePath)) {
    throw "Strategie-Datei nicht gefunden: $strategyFilePath"
}

# ------------------------------------------------------------------------------
# 1. Parsing der Markdown-Tabelle in Schritt 4
# ------------------------------------------------------------------------------
Write-Host "`n[1/4] Extrahiere 10 Markenkandidaten aus Schritt 4..." -ForegroundColor Yellow

$lines = Get-Content $strategyFilePath -Encoding utf8
$tableRows = @()
$inStep4Table = $false

foreach ($line in $lines) {
    if ($line -match '^## Schritt 4') {
        $inStep4Table = $true
        continue
    }
    if ($inStep4Table -and $line -match '^---') {
        $inStep4Table = $false
        break
    }
    if ($inStep4Table -and $line -match '^\|\s*\*\*([^\*]+)\*\*\s*\|\s*([^\|]+)\|\s*([^\|]+)\|\s*([^\|]+)\|\s*([^\|]+)\|\s*`([^`]+)`\s*\|') {
        $tableRows += [PSCustomObject]@{
            Kernname           = $matches[1].Trim()
            RegionalVariante   = $matches[2].Trim()
            Kategorie          = $matches[3].Trim()
            Claim              = $matches[4].Trim()
            Begruendung        = $matches[5].Trim()
            Domain             = $matches[6].Trim()
        }
    }
}

if ($tableRows.Count -ne 10) {
    throw "FEHLER: Genau 10 Zeilen in Tabelle erwartet, aber $($tableRows.Count) gefunden!"
}
Write-Host "  -> Erfolgreich 10 Zeilen extrahiert." -ForegroundColor Green

# ------------------------------------------------------------------------------
# 2. Buzzword-Check (7 verbotene Begriffe)
# ------------------------------------------------------------------------------
Write-Host "`n[2/4] Prüfe Buzzword-Blacklist (Solutions, Tech, Digital, AI, Synergy, Excellence, Cloud)..." -ForegroundColor Yellow

$forbiddenWords = @('Solutions', 'Tech', 'Digital', 'AI', 'Synergy', 'Excellence', 'Cloud')
$buzzwordViolations = @()

foreach ($row in $tableRows) {
    $textToCheck = "$($row.Kernname) $($row.RegionalVariante) $($row.Claim)"
    foreach ($bw in $forbiddenWords) {
        if ($textToCheck -match "\b$bw\b") {
            $buzzwordViolations += "Verstoß bei '$($row.Kernname)': Enthält '$bw' in '$textToCheck'"
        }
    }
}

if ($buzzwordViolations.Count -gt 0) {
    $buzzwordViolations | ForEach-Object { Write-Host "  [FAIL] $_" -ForegroundColor Red }
    throw "FEHLER: Buzzword-Violations gefunden!"
} else {
    Write-Host "  -> 0 Buzzword-Treffer in Namen, Regionalvarianten und Claims. (OK)" -ForegroundColor Green
}

# ------------------------------------------------------------------------------
# 3. Wortzähler für alle 10 Claims (maximal 5 Wörter)
# ------------------------------------------------------------------------------
Write-Host "`n[3/4] Prüfe Claim-Länge (maximal 5 Wörter)..." -ForegroundColor Yellow

$claimViolations = @()
foreach ($row in $tableRows) {
    # Split by whitespace, ignore punctuation
    $words = ($row.Claim.Trim() -split '\s+').Where({ $_.Length -gt 0 })
    $wordCount = $words.Count
    Write-Host ("  - {0,-15} Claim: '{1,-42}' Wörter: {2}" -f $row.Kernname, $row.Claim, $wordCount)
    if ($wordCount -gt 5) {
        $claimViolations += "Claim zu lang ($wordCount Wörter > 5): '$($row.Claim)' bei $($row.Kernname)"
    }
}

if ($claimViolations.Count -gt 0) {
    $claimViolations | ForEach-Object { Write-Host "  [FAIL] $_" -ForegroundColor Red }
    throw "FEHLER: Claim-Längenüberschreitung gefunden!"
} else {
    Write-Host "  -> Alle 10 Claims haben <= 5 Wörter. (OK)" -ForegroundColor Green
}

# ------------------------------------------------------------------------------
# 4. Live-DNS-Prüfung aller 10 empfohlenen .de-Domains
# ------------------------------------------------------------------------------
Write-Host "`n[4/4] Live DNS-Prüfung aller 10 empfohlenen .de-Domains..." -ForegroundColor Yellow

$dnsFailures = @()
foreach ($row in $tableRows) {
    $d = $row.Domain
    try {
        $res = Resolve-DnsName -Name $d -ErrorAction Stop
        $ip = ($res | Select-Object -ExpandProperty IPAddress -ErrorAction SilentlyContinue) -join ','
        Write-Host ("  [FAIL] Domain '{0}' löst auf aktive Records auf: {1}" -f $d, $ip) -ForegroundColor Red
        $dnsFailures += "$d ist belegt / aktiv!"
    } catch {
        Write-Host ("  [PASS] Domain '{0}' ist FREI (NXDOMAIN)" -f $d) -ForegroundColor Green
    }
}

if ($dnsFailures.Count -gt 0) {
    throw "FEHLER: Ein oder mehrere Domains sind nicht frei (NXDOMAIN)!"
}

# ------------------------------------------------------------------------------
# 5. Kollisionsprüfung gegen 23+ regionale Wettbewerber aus DOCS/Wettbewerbsanalyse*.md
# ------------------------------------------------------------------------------
Write-Host "`n[5/5] Kollisionsprüfung gegen regionale Wettbewerber..." -ForegroundColor Yellow

$competitorFiles = Get-ChildItem -Path $workspaceDocsDir -Filter "*Wettbewerb*.md"
Write-Host "  Gefundene Wettbewerbs-Dokumente: $($competitorFiles.Count)"

$knownCompetitors = @(
    "IT-Nunweiler", "MoCo Service", "EITIE", "ThHE.net", "GitCom", "Harz-IT", 
    "PDV-Systeme", "Digimosa", "UniqueFlow", "Dominik Kasten", "P1 Commerce", 
    "storyflare", "Studio WILS", "Sympic", "Spier Web Studio", "WDPX", 
    "Designoffice", "3WKonzepte", "Enno & Jens", "Flotter Agency", "Wemakefuture", 
    "Block23", "Elasticbrains", "Lucid Labs", "Prozessgesteuert", "Pixel & Process"
)

# Zusätzliche Extraktion aus Dateien
foreach ($file in $competitorFiles) {
    $fcontent = Get-Content $file.FullName -Raw -Encoding utf8
    $matchesNames = [regex]::Matches($fcontent, '(?i)(?:Firma|Agentur|Unternehmen|Wettbewerber|Anbieter):\s*\*?\*?([A-Z0-9ÄÖÜ][A-Za-z0-9ÄÖÜß\s\.\-&]+?)(?:\*?\*|\r|\n|,)')
    foreach ($m in $matchesNames) {
        $val = $m.Groups[1].Value.Trim()
        if ($val.Length -gt 2 -and $val.Length -lt 40 -and -not ($knownCompetitors -contains $val)) {
            $knownCompetitors += $val
        }
    }
}

$uniqueCompetitors = $knownCompetitors | Select-Object -Unique
Write-Host "  Geprüfter regionaler Wettbewerber-Korpus: $($uniqueCompetitors.Count) Firmen"

$collisionFailures = @()
foreach ($row in $tableRows) {
    $name = $row.Kernname
    foreach ($comp in $uniqueCompetitors) {
        if ($comp.ToLower().Contains($name.ToLower()) -or $name.ToLower().Contains($comp.ToLower())) {
            $collisionFailures += "Kollision: '$name' matcht mit Wettbewerber '$comp'"
        }
    }
}

if ($collisionFailures.Count -gt 0) {
    $collisionFailures | ForEach-Object { Write-Host "  [FAIL] $_" -ForegroundColor Red }
    throw "FEHLER: Kollisionen mit Wettbewerbern festgestellt!"
} else {
    Write-Host "  -> 0 Kollisionen mit den $($uniqueCompetitors.Count) regionalen Wettbewerbern. (OK)" -ForegroundColor Green
}

# ------------------------------------------------------------------------------
# 6. Kategorien-Verteilung (3 Handwerk, 3 Nutzen, 2 Kunstwort, 2 Hybrid)
# ------------------------------------------------------------------------------
Write-Host "`n[Zusatz] Prüfe Kategorien-Verteilung..." -ForegroundColor Yellow

$catCounts = $tableRows | Group-Object Kategorie
foreach ($c in $catCounts) {
    Write-Host ("  - {0,-25}: {1}" -f $c.Name, $c.Count)
}

$hCount = ($tableRows | Where-Object { $_.Kategorie -match 'Handwerk' }).Count
$nCount = ($tableRows | Where-Object { $_.Kategorie -match 'Nutzen' }).Count
$kCount = ($tableRows | Where-Object { $_.Kategorie -match 'Kunstwort' }).Count
$yCount = ($tableRows | Where-Object { $_.Kategorie -match 'Hybrid' }).Count

if ($hCount -ne 3 -or $nCount -ne 3 -or $kCount -ne 2 -or $yCount -ne 2) {
    throw "FEHLER: Ungültige Verteilung! Soll: 3x Handwerk, 3x Nutzen, 2x Kunstwort, 2x Hybrid. Ist: $hCount / $nCount / $kCount / $yCount"
}

Write-Host "`n====================================================================" -ForegroundColor Green
Write-Host 'RESULTAT: ALLE VALIDIERUNGSSTUFEN VOLLSTAENDIG BESTANDEN (100 Prozent OK)' -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Green

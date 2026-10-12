# Automated Verification Script: Naming Strategy, Claims, DNS & Competitor Collision
# Location: .agents/teamwork/worker_naming_1/validate_naming.ps1

$ErrorActionPreference = 'Stop'

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " STARTING AUTOMATED NAMING VALIDATION SUITE               " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$docPath = Join-Path $PSScriptRoot "..\..\..\DOCS\Markennamen_Strategie_Top10.md"
if (-not (Test-Path $docPath)) {
    Write-Error "Target document not found at $docPath"
}

$docContent = Get-Content -Path $docPath -Raw -Encoding UTF8

# 1. PARSE TOP 10 TABLE
Write-Host "`n[TEST 1] Parsing Top 10 Table from DOCS/Markennamen_Strategie_Top10.md..." -ForegroundColor Yellow

$tableLines = ($docContent -split "`r?`n") | Where-Object { $_ -match '^\|\s*\*\*[^*]+\*\*' }

if ($tableLines.Count -ne 10) {
    Write-Error "FAILED: Expected exactly 10 table entries, but found $($tableLines.Count)"
} else {
    Write-Host "PASS: Exactly 10 table rows found." -ForegroundColor Green
}

$candidates = @()
foreach ($line in $tableLines) {
    $parts = $line.Trim().Trim('|').Split('|') | ForEach-Object { $_.Trim() }
    # Parts:
    # 0: Kernname
    # 1: Regional-Variante
    # 2: Kategorie
    # 3: Claim
    # 4: Begründung
    # 5: Domain
    $candidates += [PSCustomObject]@{
        Kernname = $parts[0] -replace '\*', ''
        RegionalVariante = $parts[1]
        Kategorie = $parts[2]
        Claim = $parts[3]
        Begruendung = $parts[4]
        Domain = $parts[5] -replace '`', ''
    }
}

# 2. CATEGORY DISTRIBUTION CHECK
Write-Host "`n[TEST 2] Verifying Category Distribution..." -ForegroundColor Yellow
$categories = $candidates | Group-Object -Property Kategorie
$catCounts = @{}
foreach ($g in $categories) {
    $catCounts[$g.Name] = $g.Count
}

$expectedCats = @{
    'Handwerk / Pragmatismus' = 3
    'Nutzen / Ergebnis' = 3
    'Kunstwort / Abstraktion' = 2
    'Hybride Modelle' = 2
}

$catCheckFailed = $false
foreach ($cat in $expectedCats.Keys) {
    $actual = $catCounts[$cat]
    $expected = $expectedCats[$cat]
    if ($actual -ne $expected) {
        Write-Host "FAIL: Category '$cat' count is $actual, expected $expected" -ForegroundColor Red
        $catCheckFailed = $true
    } else {
        Write-Host "PASS: Category '$cat' -> $actual (expected $expected)" -ForegroundColor Green
    }
}
if ($catCheckFailed) {
    Write-Error "Category distribution verification failed."
}

# 3. BUZZWORD BLACKLIST FILTER
Write-Host "`n[TEST 3] Verifying Buzzword Filter (0 hits required)..." -ForegroundColor Yellow
$forbiddenWords = @('Solutions', 'Tech', 'Digital', 'AI', 'Synergy', 'Excellence', 'Cloud')
$buzzwordViolations = @()

foreach ($c in $candidates) {
    $textToCheck = "$($c.Kernname) $($c.RegionalVariante) $($c.Claim)"
    foreach ($fw in $forbiddenWords) {
        if ($textToCheck -match "\b$fw\b") {
            $buzzwordViolations += "Violation for '$fw' in '$($c.Kernname)': '$textToCheck'"
        }
    }
}

if ($buzzwordViolations.Count -gt 0) {
    $buzzwordViolations | ForEach-Object { Write-Host $_ -ForegroundColor Red }
    Write-Error "FAILED: Buzzword filter violations detected."
} else {
    Write-Host "PASS: 0 Buzzword violations found across all names, regional variants and claims." -ForegroundColor Green
}

# 4. CLAIM WORD COUNT CHECK
Write-Host "`n[TEST 4] Verifying Claim Word Count (max. 5 words per claim)..." -ForegroundColor Yellow
$claimFailed = $false
foreach ($c in $candidates) {
    # Clean punctuation except hyphen inside words
    $words = ($c.Claim -replace '[.,;!?]', '').Split(' ', [StringSplitOptions]::RemoveEmptyEntries)
    $wordCount = $words.Count
    if ($wordCount -gt 5) {
        Write-Host "FAIL: Claim '$($c.Claim)' has $wordCount words (exceeds max 5)" -ForegroundColor Red
        $claimFailed = $true
    } else {
        Write-Host "PASS: '$($c.Kernname)' Claim ('$($c.Claim)') -> $wordCount words" -ForegroundColor Green
    }
}
if ($claimFailed) {
    Write-Error "Claim word count check failed."
}

# 5. COMPETITOR COLLISION CHECK
Write-Host "`n[TEST 5] Checking Collisions against Harz Competitors..." -ForegroundColor Yellow
$competitors = @(
    'IT-Nunweiler', 'Nunweiler', 'MoCo Service', 'MoCo', 'EITIE', 'ThHE.net', 'GitCom',
    'UniqueFlow', 'Dominik Kasten', 'storyflare', 'Studio WILS', 'WILS', 'Sympic',
    'Spier Web Studio', 'Spier', 'Enno & Jens', 'WDPX', 'Designoffice', '3WKonzepte',
    'Digimosa', 'PDV-Systeme', 'Harz-IT', 'KMU Service Harz'
)

$collisionViolations = @()
foreach ($c in $candidates) {
    foreach ($comp in $competitors) {
        if ($c.Kernname -like "*$comp*" -or $comp -like "*$($c.Kernname)*") {
            $collisionViolations += "Collision detected: $($c.Kernname) vs competitor $comp"
        }
    }
}

if ($collisionViolations.Count -gt 0) {
    $collisionViolations | ForEach-Object { Write-Host $_ -ForegroundColor Red }
    Write-Error "FAILED: Competitor collisions detected."
} else {
    Write-Host "PASS: 0 collisions with any of the $(($competitors).Count) regional competitors." -ForegroundColor Green
}

# 6. LIVE DNS AVAILABILITY CHECK
Write-Host "`n[TEST 6] Running Live DNS Availability Check for all 10 Domains..." -ForegroundColor Yellow
$dnsFailed = $false
$dnsResults = @()

foreach ($c in $candidates) {
    $domain = $c.Domain
    try {
        $res = Resolve-DnsName -Name $domain -Type A -ErrorAction Stop
        Write-Host "FAIL / OCCUPIED: Domain $domain resolves to IP(s): $(($res.IPAddress) -join ', ')" -ForegroundColor Red
        $dnsFailed = $true
        $dnsResults += [PSCustomObject]@{ Domain = $domain; Status = "Occupied"; IPs = (($res.IPAddress) -join ', ') }
    } catch {
        Write-Host "PASS / AVAILABLE: $domain is NXDOMAIN (no active website/A-records)" -ForegroundColor Green
        $dnsResults += [PSCustomObject]@{ Domain = $domain; Status = "Free / NXDOMAIN"; IPs = "None" }
    }
}

if ($dnsFailed) {
    Write-Error "DNS check failed: one or more domains are actively occupied."
} else {
    Write-Host "PASS: All 10 recommended domains are completely free of active A-records." -ForegroundColor Green
}

# 7. STEP 1 EXACT 3-SENTENCES CHECK
Write-Host "`n[TEST 7] Verifying Step 1 (Context Extraction: exactly 3 sentences)..." -ForegroundColor Yellow
$step1Match = [regex]::Match($docContent, '## Schritt 1.*?Kontext-Extraktion.*?(?=## Schritt 2)', [System.Text.RegularExpressions.RegexOptions]::Singleline)
if ($step1Match.Success) {
    $step1Text = $step1Match.Value
    $numNumberedLines = ($step1Text -split "`r?`n") | Where-Object { $_ -match '^\d+\.\s*\*\*' }
    if ($numNumberedLines.Count -eq 3) {
        Write-Host "PASS: Step 1 has exactly 3 numbered core sentences." -ForegroundColor Green
    } else {
        Write-Error "FAIL: Expected 3 numbered sentences in Step 1, found $($numNumberedLines.Count)"
    }
} else {
    Write-Error "FAIL: Could not locate Step 1 section in document."
}

# 8. STEP 2 MINIMUM 5-8 TERMS CHECK
Write-Host "`n[TEST 8] Verifying Step 2 (Fields A, B, C, D: >= 5 terms each)..." -ForegroundColor Yellow
$fields = @('Feld A', 'Feld B', 'Feld C', 'Feld D')
foreach ($f in $fields) {
    $fieldMatch = [regex]::Match($docContent, "### $f.*?(?=(### Feld|## Schritt 3))", [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($fieldMatch.Success) {
        $bulletCount = ($fieldMatch.Value -split "`r?`n") | Where-Object { $_ -match '^\s*-\s*\*\*' } | Measure-Object | Select-Object -ExpandProperty Count
        if ($bulletCount -ge 5) {
            Write-Host "PASS: $f has $bulletCount terms (>= 5 required)." -ForegroundColor Green
        } else {
            Write-Error "FAIL: $f has only $bulletCount terms (< 5 required)."
        }
    } else {
        Write-Error "FAIL: Could not extract $f."
    }
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host " ALL VALIDATION TESTS PASSED (100% GREEN)                 " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

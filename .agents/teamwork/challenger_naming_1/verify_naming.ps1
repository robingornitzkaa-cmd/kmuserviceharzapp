# verify_naming.ps1 - Empirical Adversarial Verification Harness
param(
    [string]$DocPath = "c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS\Markennamen_Strategie_Top10.md",
    [string]$ReqPath = "c:\Users\gorni\Desktop\kmuserviceharzapp\ORIGINAL_REQUEST.md",
    [string]$DocsDir = "c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS"
)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "================================================================"
Write-Host "EMPIRICAL ADVERSARIAL VERIFICATION HARNESS"
Write-Host "Timestamp: $(Get-Date -Format 'o')"
Write-Host "Target Document: $DocPath"
Write-Host "Original Request: $ReqPath"
Write-Host "================================================================"

if (-not (Test-Path $DocPath)) {
    Write-Error "Target document not found at $DocPath"
    exit 1
}

$docLines = [System.IO.File]::ReadAllLines($DocPath, [System.Text.Encoding]::UTF8)
$reqLines = [System.IO.File]::ReadAllLines($ReqPath, [System.Text.Encoding]::UTF8)

# -------------------------------------------------------------------------
# TEST 1: TABLE INTEGRITY & STRUCTURE
# -------------------------------------------------------------------------
Write-Host "`n>>> [TEST 1] TABLE INTEGRITY & STRUCTURE <<<"

# Find table in doc
$tableLines = @()
$inTable = $false
foreach ($line in $docLines) {
    if ($line -match '^\|\s*Kernname.*Domain-Empfehlung') {
        $inTable = $true
        $tableLines += $line
        continue
    }
    if ($inTable) {
        if ($line -match '^\|\s*[-:]+') {
            $tableLines += $line
            continue
        }
        if ($line -match '^\|') {
            $tableLines += $line
        } else {
            if ($line.Trim() -ne '') {
                $inTable = $false
            }
        }
    }
}

Write-Host "Total extracted table lines (header + separator + rows): $($tableLines.Count)"

# Header check against ORIGINAL_REQUEST.md
Write-Host "ReqLines count: $($reqLines.Count)"
$rawReqHeader = $null
foreach ($l in $reqLines) {
    if ($l -like '*Kernname*Stand-alone*') {
        $rawReqHeader = $l
        break
    }
}
Write-Host "Raw Req Header found: '$rawReqHeader'"
$expectedHeaderLine = if ($rawReqHeader) { ($rawReqHeader -replace '[`\r\n]+', '').Trim() } else { "" }
$actualHeaderLine = $tableLines[0].Trim()

Write-Host "Expected Header : $expectedHeaderLine"
Write-Host "Actual Header   : $actualHeaderLine"

$headerExactMatch = ($expectedHeaderLine -eq $actualHeaderLine)
Write-Host "Exact Header Match: $headerExactMatch"

# Parse individual columns
$actualCols = ($actualHeaderLine -split '\|' | ForEach-Object { $_.Trim() }) | Where-Object { $_ -ne '' }
Write-Host "Detected $($actualCols.Count) columns in table header."

$expectedColRegexes = @(
    '^Kernname\s+\(Stand-alone\)$',
    '^Optionale\s+Regional-Variante\s+\(mit\s+Harz\)$',
    '^Kategorie$',
    '^Empfohlener\s+Claim\s+\(max\.\s+5\s+W.*rter\)$',
    '^Markenpsychologische\s+Begr.*ndung\s+\(Warum\s+der\s+Handwerker\s+sofort\s+Vertrauen\s+fasst\)$',
    '^Domain-Empfehlung\s+\(\.de\)$'
)

$colCheckPassed = $true
for ($i = 0; $i -lt 6; $i++) {
    $colName = $actualCols[$i]
    $regex = $expectedColRegexes[$i]
    if ($colName -match $regex) {
        Write-Host "  Col $($i+1): '$colName' [MATCH]"
    } else {
        Write-Host "  Col $($i+1): '$colName' [MISMATCH vs $regex]"
        $colCheckPassed = $false
    }
}

# Parse data rows
$dataRows = @()
for ($i = 2; $i -lt $tableLines.Count; $i++) {
    $rowLine = $tableLines[$i]
    if ($rowLine -match '^\|\s*$') { continue }
    $rawCols = ($rowLine -split '\|' | ForEach-Object { $_.Trim() })
    # Filter out empty outer cells from leading/trailing pipes
    if ($rawCols.Count -ge 8) {
        $rawCols = $rawCols[1..6]
    } elseif ($rawCols.Count -eq 7) {
        $rawCols = $rawCols[1..6]
    }
    
    if ($rawCols.Count -eq 6) {
        $dataRows += [PSCustomObject]@{
            RowIndex = $i - 1
            Kernname = ($rawCols[0] -replace '\*','').Trim()
            RegionalVariante = ($rawCols[1] -replace '\*','').Trim()
            Kategorie = ($rawCols[2] -replace '\*','').Trim()
            Claim = ($rawCols[3] -replace '\*','').Trim()
            Begruendung = ($rawCols[4] -replace '\*','').Trim()
            Domain = ($rawCols[5] -replace '[`\*]','').Trim()
        }
    }
}

Write-Host "Parsed data rows: $($dataRows.Count) (Expected: 10)"
$rowCountPassed = ($dataRows.Count -eq 10)

# Check category distribution: 3 Handwerk, 3 Nutzen, 2 Kunstwort, 2 Hybrid
$catHandwerk = ($dataRows | Where-Object { $_.Kategorie -match 'Handwerk' }).Count
$catNutzen   = ($dataRows | Where-Object { $_.Kategorie -match 'Nutzen' }).Count
$catKunst    = ($dataRows | Where-Object { $_.Kategorie -match 'Kunstwort' }).Count
$catHybrid   = ($dataRows | Where-Object { $_.Kategorie -match 'Hybrid' }).Count

Write-Host "Category distribution:"
Write-Host "  Handwerk / Pragmatismus: $catHandwerk (Expected: 3)"
Write-Host "  Nutzen / Ergebnis      : $catNutzen (Expected: 3)"
Write-Host "  Kunstwort / Abstraktion: $catKunst (Expected: 2)"
Write-Host "  Hybride Modelle        : $catHybrid (Expected: 2)"

$catDistPassed = ($catHandwerk -eq 3 -and $catNutzen -eq 3 -and $catKunst -eq 2 -and $catHybrid -eq 2)
$test1Passed = $headerExactMatch -and $colCheckPassed -and $rowCountPassed -and $catDistPassed
Write-Host ">>> TEST 1 RESULT: $(if ($test1Passed) { 'PASS' } else { 'FAIL' }) <<<"

# -------------------------------------------------------------------------
# TEST 2: BUZZWORD SEARCH (ZERO TOLERANCE)
# -------------------------------------------------------------------------
Write-Host "`n>>> [TEST 2] BUZZWORD SEARCH (ZERO TOLERANCE) <<<"
$forbidden = @('Solutions', 'Tech', 'Digital', 'AI', 'Synergy', 'Excellence', 'Cloud')
$buzzwordHits = @()

foreach ($r in $dataRows) {
    $fields = @{
        "Kernname" = $r.Kernname
        "RegionalVariante" = $r.RegionalVariante
        "Claim" = $r.Claim
    }
    foreach ($entry in $fields.GetEnumerator()) {
        $fieldName = $entry.Key
        $text = $entry.Value
        foreach ($f in $forbidden) {
            # Word boundary regex check
            if ($text -match "(?i)\b$f\b") {
                $buzzwordHits += [PSCustomObject]@{
                    Row = $r.RowIndex
                    Name = $r.Kernname
                    Field = $fieldName
                    ForbiddenWord = $f
                    MatchedText = $text
                    Type = "ExactWord"
                }
            }
            # Substring check for non-short words
            if ($f -notin @('AI', 'Tech') -and $text -match "(?i)$f") {
                $buzzwordHits += [PSCustomObject]@{
                    Row = $r.RowIndex
                    Name = $r.Kernname
                    Field = $fieldName
                    ForbiddenWord = $f
                    MatchedText = $text
                    Type = "Substring"
                }
            }
        }
    }
}

if ($buzzwordHits.Count -eq 0) {
    Write-Host "SUCCESS: Zero occurrences of forbidden buzzwords ('Solutions', 'Tech', 'Digital', 'AI', 'Synergy', 'Excellence', 'Cloud') found."
    $test2Passed = $true
} else {
    Write-Host "FAILURE: Found $($buzzwordHits.Count) forbidden buzzword matches:"
    $buzzwordHits | Format-Table -AutoSize
    $test2Passed = $false
}
Write-Host ">>> TEST 2 RESULT: $(if ($test2Passed) { 'PASS' } else { 'FAIL' }) <<<"

# -------------------------------------------------------------------------
# TEST 3: CLAIM WORD COUNT (MAX 5 WORDS)
# -------------------------------------------------------------------------
Write-Host "`n>>> [TEST 3] CLAIM WORD COUNT (MAX 5 WORDS) <<<"
$claimReports = @()
$test3Passed = $true

foreach ($r in $dataRows) {
    $claim = $r.Claim
    # Method A: Whitespace split
    $wordsWhitespace = ($claim.Trim() -split '\s+') | Where-Object { $_ -ne '' }
    $countWhitespace = $wordsWhitespace.Count

    # Method B: Regex word match
    $regexWords = [regex]::Matches($claim, '[\p{L}\p{N}\-]+') | ForEach-Object { $_.Value }
    $countRegex = $regexWords.Count

    $passed = ($countWhitespace -le 5) -and ($countRegex -le 5)
    if (-not $passed) {
        $test3Passed = $false
    }

    $claimReports += [PSCustomObject]@{
        Row = $r.RowIndex
        Name = $r.Kernname
        Claim = $claim
        WordsWhitespace = $countWhitespace
        WordsRegex = $countRegex
        Status = if ($passed) { "PASS (<= 5)" } else { "FAIL (> 5)" }
    }
}

$claimReports | Format-Table -AutoSize
Write-Host ">>> TEST 3 RESULT: $(if ($test3Passed) { 'PASS' } else { 'FAIL' }) <<<"

# -------------------------------------------------------------------------
# TEST 4: LIVE DNS & NETWORK AVAILABILITY CHECKS
# -------------------------------------------------------------------------
Write-Host "`n>>> [TEST 4] LIVE DNS & NETWORK AUDIT FOR RECOMMENDED .DE DOMAINS <<<"
$dnsReports = @()
$test4Passed = $true

foreach ($r in $dataRows) {
    $domain = $r.Domain
    Write-Host -NoNewline "Auditing $domain ... "

    # 1. Local Resolver A / AAAA / CNAME
    $localA = @()
    $localAAAA = @()
    $localCNAME = @()
    $localNS = @()
    try { $localA = (Resolve-DnsName -Name $domain -Type A -ErrorAction SilentlyContinue | Where-Object { $_.IP4Address } | Select-Object -ExpandProperty IP4Address) } catch {}
    try { $localAAAA = (Resolve-DnsName -Name $domain -Type AAAA -ErrorAction SilentlyContinue | Where-Object { $_.IP6Address } | Select-Object -ExpandProperty IP6Address) } catch {}
    try { $localCNAME = (Resolve-DnsName -Name $domain -Type CNAME -ErrorAction SilentlyContinue | Select-Object -ExpandProperty NameHost) } catch {}
    try { $localNS = (Resolve-DnsName -Name $domain -Type NS -ErrorAction SilentlyContinue | Select-Object -ExpandProperty NameHost) } catch {}

    # 2. Public Resolver (8.8.8.8)
    $googleA = @()
    try { $googleA = (Resolve-DnsName -Name $domain -Type A -Server 8.8.8.8 -ErrorAction SilentlyContinue | Where-Object { $_.IP4Address } | Select-Object -ExpandProperty IP4Address) } catch {}

    # 3. Public Resolver (1.1.1.1)
    $cfA = @()
    try { $cfA = (Resolve-DnsName -Name $domain -Type A -Server 1.1.1.1 -ErrorAction SilentlyContinue | Where-Object { $_.IP4Address } | Select-Object -ExpandProperty IP4Address) } catch {}

    # 4. nslookup
    $nslookupOut = (nslookup $domain 2>&1) | Out-String
    $nslookupHasAddress = ($nslookupOut -match 'Address:\s+[0-9\.]+' -and $nslookupOut -notmatch 'Address:\s+(192\.168\.|10\.|172\.|127\.)')

    # 5. HTTP / HTTPS probe (ensure no active web server responds)
    $httpReachable = $false
    try {
        $res = Invoke-WebRequest -Uri "http://$domain" -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
        if ($res.StatusCode -ge 200 -and $res.StatusCode -lt 400) {
            $httpReachable = $true
        }
    } catch {}

    $allIPs = @($localA + $googleA + $cfA) | Select-Object -Unique
    $hasActiveHost = ($allIPs.Count -gt 0) -or ($localAAAA.Count -gt 0) -or ($localCNAME.Count -gt 0) -or $httpReachable

    if ($hasActiveHost) {
        $test4Passed = $false
        Write-Host "ACTIVE HOST DETECTED: IPs=($($allIPs -join ',')), HTTP=$httpReachable" -ForegroundColor Red
    } else {
        Write-Host "AVAILABLE / UNRESOLVED / NO ACTIVE HOST" -ForegroundColor Green
    }

    $dnsReports += [PSCustomObject]@{
        Row = $r.RowIndex
        Domain = $domain
        LocalA = ($localA -join ", ")
        GoogleA = ($googleA -join ", ")
        CloudflareA = ($cfA -join ", ")
        AAAA = ($localAAAA -join ", ")
        CNAME = ($localCNAME -join ", ")
        NS = ($localNS -join ", ")
        HTTP = $httpReachable
        ActiveWebsite = $hasActiveHost
        Verdict = if ($hasActiveHost) { "TAKEN / ACTIVE HOST" } else { "FREE / NO ACTIVE HOST" }
    }
}

$dnsReports | Format-Table Row, Domain, LocalA, GoogleA, CloudflareA, ActiveWebsite, Verdict -AutoSize
Write-Host ">>> TEST 4 RESULT: $(if ($test4Passed) { 'PASS' } else { 'FAIL' }) <<<"

# -------------------------------------------------------------------------
# TEST 5: COMPETITOR COLLISION CHECK
# -------------------------------------------------------------------------
Write-Host "`n>>> [TEST 5] REGIONAL COMPETITOR COLLISION CHECK <<<"
$compFiles = Get-ChildItem -Path $DocsDir -Filter "*Wettbewerb*.md"
Write-Host "Checking against $($compFiles.Count) competitor analysis files..."
$compCollisions = @()

foreach ($cf in $compFiles) {
    $cfContent = [System.IO.File]::ReadAllText($cf.FullName, [System.Text.Encoding]::UTF8)
    foreach ($r in $dataRows) {
        $name = $r.Kernname
        if ($cfContent -match "(?i)\b$name\b") {
            $compCollisions += [PSCustomObject]@{
                Name = $name
                File = $cf.Name
                Match = "Found in text"
            }
        }
    }
}

if ($compCollisions.Count -eq 0) {
    Write-Host "SUCCESS: Zero collisions found with regional competitor documents."
    $test5Passed = $true
} else {
    Write-Host "WARNING: Competitor collisions detected:"
    $compCollisions | Format-Table -AutoSize
    $test5Passed = $false
}
Write-Host ">>> TEST 5 RESULT: $(if ($test5Passed) { 'PASS' } else { 'FAIL' }) <<<"

# -------------------------------------------------------------------------
# FINAL OVERALL VERDICT
# -------------------------------------------------------------------------
Write-Host "`n================================================================"
Write-Host "OVERALL ADVERSARIAL AUDIT SUMMARY"
Write-Host "================================================================"
Write-Host "1. Table Integrity & Headers  : $(if ($test1Passed) { 'PASS' } else { 'FAIL' })"
Write-Host "2. Zero Buzzwords             : $(if ($test2Passed) { 'PASS' } else { 'FAIL' })"
Write-Host "3. Claim Word Count (<= 5)    : $(if ($test3Passed) { 'PASS' } else { 'FAIL' })"
Write-Host "4. Recommended .de Domains Free: $(if ($test4Passed) { 'PASS' } else { 'FAIL' })"
Write-Host "5. No Competitor Collisions   : $(if ($test5Passed) { 'PASS' } else { 'FAIL' })"

$overallVerdict = if ($test1Passed -and $test2Passed -and $test3Passed -and $test4Passed -and $test5Passed) {
    "APPROVE"
} else {
    "REQUEST_CHANGES"
}

Write-Host "`nFINAL VERDICT: $overallVerdict"
Write-Host "================================================================"

# Export results to JSON for handoff integration
$summaryObject = [PSCustomObject]@{
    Timestamp = (Get-Date -Format 'o')
    OverallVerdict = $overallVerdict
    Test1_TableIntegrity = $test1Passed
    Test2_ZeroBuzzwords = $test2Passed
    Test3_ClaimWordCount = $test3Passed
    Test4_DnsAvailability = $test4Passed
    Test5_CompetitorCollision = $test5Passed
    TableRows = $dataRows
    ClaimReports = $claimReports
    DnsReports = $dnsReports
}

$jsonPath = "c:\Users\gorni\Desktop\kmuserviceharzapp\.agents\teamwork\challenger_naming_1\verification_results.json"
$summaryObject | ConvertTo-Json -Depth 5 | Set-Content -Path $jsonPath -Encoding UTF8
Write-Host "Detailed test results written to $jsonPath"

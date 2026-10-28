# Adversarial Empirical Validation Script for DOCS/Markennamen_Strategie_Top10.md
# Challenger Iteration 2

$ErrorActionPreference = "Continue"

$targetDoc = "c:\Users\gorni\Desktop\kmuserviceharzapp\DOCS\Markennamen_Strategie_Top10.md"
if (-not (Test-Path $targetDoc)) {
    Write-Error "Target file $targetDoc does not exist!"
    exit 1
}

$content = Get-Content -Path $targetDoc -Raw -Encoding UTF8

Write-Host "============================================================"
Write-Host "EMPIRICAL ADVERSARIAL VALIDATION SUITE - CHALLENGER ITERATION 2"
Write-Host "Target: $targetDoc"
Write-Host "Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss UTC')"
Write-Host "============================================================`n"

$failures = @()

# -------------------------------------------------------------
# TEST 1: Table Structure (Exactly 10 rows and 6 columns)
# -------------------------------------------------------------
Write-Host "[TEST 1] Table Structure Verification..."

$lines = $content -split "`r?`n"
$tableLines = @()
$inTable = $false

foreach ($line in $lines) {
    if ($line -match "^\|\s*Kernname.*Domain-Empfehlung") {
        $inTable = $true
        $tableLines += $line
        continue
    }
    if ($inTable) {
        if ($line -match "^\|\s*[-:]+\s*\|") {
            $tableLines += $line
            continue
        }
        if ($line -match "^\|\s*(.+)\s*\|") {
            $tableLines += $line
        } else {
            if ($tableLines.Count -gt 2) {
                break
            }
        }
    }
}

if ($tableLines.Count -lt 3) {
    $failures += "Table not found or insufficient lines (found $($tableLines.Count) lines)"
    Write-Host "[-] FAIL: Table not found." -ForegroundColor Red
} else {
    $header = $tableLines[0]
    $divider = $tableLines[1]
    $dataRows = $tableLines[2..($tableLines.Count - 1)]

    Write-Host "  Found header: $header"
    Write-Host "  Found data rows count: $($dataRows.Count)"

    if ($dataRows.Count -ne 10) {
        $failures += "Table row count is $($dataRows.Count), expected exactly 10 rows."
        Write-Host "[-] FAIL: Row count is $($dataRows.Count) (expected 10)" -ForegroundColor Red
    } else {
        Write-Host "[+] PASS: Exactly 10 data rows found." -ForegroundColor Green
    }

    # Verify columns in each row
    $parsedRows = @()
    $rowIndex = 0
    foreach ($row in $dataRows) {
        $rowIndex++
        # Split by unescaped pipe
        $cols = $row.Trim().Trim('|').Split('|') | ForEach-Object { $_.Trim() }
        if ($cols.Count -ne 6) {
            $failures += "Row $rowIndex has $($cols.Count) columns (expected 6). Row: $row"
            Write-Host "[-] FAIL: Row $rowIndex column count is $($cols.Count) (expected 6)" -ForegroundColor Red
        } else {
            $parsedRows += [PSCustomObject]@{
                Index = $rowIndex
                Kernname = ($cols[0] -replace '\*\*','').Trim()
                RegionalVariante = $cols[1].Trim()
                Kategorie = $cols[2].Trim()
                Claim = $cols[3].Trim()
                Begruendung = $cols[4].Trim()
                Domain = ($cols[5] -replace '`','').Trim()
            }
        }
    }

    if ($failures.Count -eq 0) {
        Write-Host "[+] PASS: All 10 rows have exactly 6 columns." -ForegroundColor Green
    }
}

# -------------------------------------------------------------
# TEST 2: Category Distribution
# -------------------------------------------------------------
Write-Host "`n[TEST 2] Category Distribution Verification..."
if ($parsedRows.Count -eq 10) {
    $categories = $parsedRows | Group-Object -Property Kategorie
    foreach ($grp in $categories) {
        Write-Host "  Category: '$($grp.Name)' => Count: $($grp.Count)"
    }

    $handwerkCount = ($parsedRows | Where-Object { $_.Kategorie -match "Handwerk" }).Count
    $nutzenCount = ($parsedRows | Where-Object { $_.Kategorie -match "Nutzen" }).Count
    $kunstwortCount = ($parsedRows | Where-Object { $_.Kategorie -match "Kunstwort" }).Count
    $hybridCount = ($parsedRows | Where-Object { $_.Kategorie -match "Hybrid" }).Count

    if ($handwerkCount -ne 3 -or $nutzenCount -ne 3 -or $kunstwortCount -ne 2 -or $hybridCount -ne 2) {
        $failures += "Category distribution mismatch: Handwerk=$handwerkCount (exp 3), Nutzen=$nutzenCount (exp 3), Kunstwort=$kunstwortCount (exp 2), Hybrid=$hybridCount (exp 2)"
        Write-Host "[-] FAIL: Category distribution incorrect!" -ForegroundColor Red
    } else {
        Write-Host "[+] PASS: Category distribution is exactly 3x Handwerk, 3x Nutzen, 2x Kunstwort, 2x Hybrid." -ForegroundColor Green
    }
}

# -------------------------------------------------------------
# TEST 3: Claim Word Count (<= 5 words)
# -------------------------------------------------------------
Write-Host "`n[TEST 3] Claim Word Count Check (max 5 words)..."
foreach ($row in $parsedRows) {
    $cleanClaim = $row.Claim -replace '[\.,;:!\?"]', ''
    $words = ($row.Claim -split '\s+') | Where-Object { $_.Trim().Length -gt 0 }
    $wordCount = $words.Count

    Write-Host "  Row $($row.Index) [$($row.Kernname)]: Claim='$($row.Claim)' => WordCount=$wordCount"
    if ($wordCount -gt 5) {
        $failures += "Claim in Row $($row.Index) exceeds 5 words ($wordCount words): '$($row.Claim)'"
        Write-Host "    [-] FAIL: $wordCount words > 5" -ForegroundColor Red
    } else {
        Write-Host "    [+] PASS: $wordCount words <= 5" -ForegroundColor Green
    }
}

# -------------------------------------------------------------
# TEST 4: Forbidden Buzzword Search
# -------------------------------------------------------------
Write-Host "`n[TEST 4] Forbidden Buzzword Search..."
$buzzwords = @("Solutions", "Tech", "Digital", "AI", "Synergy", "Excellence", "Cloud")

foreach ($row in $parsedRows) {
    $textToScan = "$($row.Kernname) $($row.RegionalVariante) $($row.Claim)"
    foreach ($bw in $buzzwords) {
        if ($textToScan -match "(?i)\b$bw\b") {
            $failures += "Forbidden buzzword '$bw' found in Row $($row.Index) ($textToScan)"
            Write-Host "  [-] FAIL: Buzzword '$bw' detected in Row $($row.Index): $textToScan" -ForegroundColor Red
        }
    }
}

if ($failures.Where({ $_ -match "buzzword" }).Count -eq 0) {
    Write-Host "[+] PASS: 0 occurrences of forbidden buzzwords found in names, regional variants, and claims." -ForegroundColor Green
}

# -------------------------------------------------------------
# TEST 5: Live DNS Resolution Check for all 10 Domains
# -------------------------------------------------------------
Write-Host "`n[TEST 5] Live DNS Resolution Check (A, AAAA, CNAME records)..."
$dnsResults = @()

foreach ($row in $parsedRows) {
    $domain = $row.Domain
    Write-Host "  Checking domain: $domain ..."

    $hasActiveRecords = $false
    $recordDetails = @()

    # Query using Resolve-DnsName
    try {
        $aRecords = Resolve-DnsName -Name $domain -Type A -ErrorAction SilentlyContinue
        if ($aRecords) {
            foreach ($rec in $aRecords) {
                if ($rec.IPAddress) {
                    $hasActiveRecords = $true
                    $recordDetails += "A: $($rec.IPAddress)"
                }
            }
        }
    } catch {}

    try {
        $aaaaRecords = Resolve-DnsName -Name $domain -Type AAAA -ErrorAction SilentlyContinue
        if ($aaaaRecords) {
            foreach ($rec in $aaaaRecords) {
                if ($rec.IPAddress) {
                    $hasActiveRecords = $true
                    $recordDetails += "AAAA: $($rec.IPAddress)"
                }
            }
        }
    } catch {}

    try {
        $cnameRecords = Resolve-DnsName -Name $domain -Type CNAME -ErrorAction SilentlyContinue
        if ($cnameRecords) {
            foreach ($rec in $cnameRecords) {
                if ($rec.NameHost) {
                    $hasActiveRecords = $true
                    $recordDetails += "CNAME: $($rec.NameHost)"
                }
            }
        }
    } catch {}

    # Query with nslookup as secondary cross-check
    $nslookupOut = & nslookup $domain 2>&1 | Out-String
    $nslookupActive = $false
    if ($nslookupOut -match "Address:\s+([0-9\.]+)" -and $nslookupOut -notmatch "can't find") {
        # Check if the returned address is just the local DNS server or an actual answer
        $matches = [regex]::Matches($nslookupOut, "Address:\s+([0-9\.]+)")
        if ($matches.Count -gt 1) {
            # Secondary address is the resolved target
            $nslookupActive = $true
            $recordDetails += "nslookup: $($matches[1].Groups[1].Value)"
        }
    }

    # Query with external public DNS (8.8.8.8 and 1.1.1.1) to eliminate local cache artifacts
    $extFound = $false
    try {
        $extA = Resolve-DnsName -Name $domain -Server "8.8.8.8" -Type A -ErrorAction SilentlyContinue
        if ($extA -and $extA.IPAddress) {
            $extFound = $true
            $recordDetails += "8.8.8.8 A: $($extA.IPAddress)"
        }
    } catch {}

    try {
        $extCloudflare = Resolve-DnsName -Name $domain -Server "1.1.1.1" -Type A -ErrorAction SilentlyContinue
        if ($extCloudflare -and $extCloudflare.IPAddress) {
            $extFound = $true
            $recordDetails += "1.1.1.1 A: $($extCloudflare.IPAddress)"
        }
    } catch {}

    if ($hasActiveRecords -or $nslookupActive -or $extFound) {
        $failures += "Domain $domain has active records: $($recordDetails -join ', ')"
        Write-Host "    [-] FAIL: Active records found for $domain ($($recordDetails -join ', '))" -ForegroundColor Red
        $dnsResults += [PSCustomObject]@{
            Domain = $domain
            Status = "ACTIVE"
            Details = ($recordDetails -join ', ')
        }
    } else {
        Write-Host "    [+] PASS: $domain has no active A/AAAA/CNAME records (FREE / UNRESOLVED on local, 8.8.8.8, and 1.1.1.1)." -ForegroundColor Green
        $dnsResults += [PSCustomObject]@{
            Domain = $domain
            Status = "FREE"
            Details = "NXDOMAIN / No A/AAAA/CNAME records (Checked Local + 8.8.8.8 + 1.1.1.1)"
        }
    }
}

# Also test extra mentioned domains if any
$extraDomains = @("ruhetakt.de", "struktus.de")
Write-Host "`n  Secondary check for bonus basis domains mentioned in markdown:"
foreach ($exDom in $extraDomains) {
    $hasActive = $false
    $res = Resolve-DnsName -Name $exDom -Type A -ErrorAction SilentlyContinue
    if ($res -and $res.IPAddress) {
        $hasActive = $true
        Write-Host "    Bonus Domain $exDom : Active A-Record ($($res.IPAddress))" -ForegroundColor Yellow
    } else {
        Write-Host "    Bonus Domain $exDom : No A-Record (FREE)" -ForegroundColor Green
    }
}

# -------------------------------------------------------------
# SUMMARY & VERDICT
# -------------------------------------------------------------
Write-Host "`n============================================================"
Write-Host "FINAL EMPIRICAL VERDICT"
Write-Host "============================================================"

if ($failures.Count -eq 0) {
    Write-Host "VERDICT: APPROVE" -ForegroundColor Green
    Write-Host "All empirical tests PASSED without error." -ForegroundColor Green
    exit 0
} else {
    Write-Host "VERDICT: REQUEST_CHANGES" -ForegroundColor Red
    Write-Host "Failures encountered ($($failures.Count)):" -ForegroundColor Red
    foreach ($f in $failures) {
        Write-Host " - $f" -ForegroundColor Red
    }
    exit 1
}

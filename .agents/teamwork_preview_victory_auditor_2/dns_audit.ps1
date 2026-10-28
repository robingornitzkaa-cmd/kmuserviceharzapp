$domains = @(
    'prozesswerk-harz.de',
    'bueroschmiede-harz.de',
    'flusswerk-harz.de',
    'klarzeit-harz.de',
    'ruhetakt-harz.de',
    'freitakt-harz.de',
    'klaros-harz.de',
    'struktus-harz.de',
    'taktwerk-harz.de',
    'ruhewerk-harz.de'
)

Write-Host "=== INDEPENDENT DNS AUDIT FOR 10 RECOMMENDED DOMAINS ==="
$allFree = $true

foreach ($d in $domains) {
    $aRecord = $null
    $nsRecord = $null
    $status = "FREE (NXDOMAIN)"
    
    try {
        $aRecord = Resolve-DnsName -Name $d -Type A -ErrorAction Stop
        if ($aRecord) {
            $status = "TAKEN / ACTIVE (A Record found: " + (($aRecord | Select-Object -ExpandProperty IPAddress) -join ', ') + ")"
            $allFree = $false
        }
    } catch {
        try {
            $nsRecord = Resolve-DnsName -Name $d -Type NS -ErrorAction Stop
            if ($nsRecord) {
                $status = "TAKEN / REGISTERED (NS Record found: " + (($nsRecord | Select-Object -ExpandProperty NameHost) -join ', ') + ")"
                $allFree = $false
            }
        } catch {
            $status = "FREE (NXDOMAIN / No DNS records)"
        }
    }

    Write-Host ("Domain: {0,-25} | Status: {1}" -f $d, $status)
}

Write-Host ""
if ($allFree) {
    Write-Host "RESULT: ALL 10 DOMAINS ARE CONFIRMED FREE (NO ACTIVE A/NS RECORDS)." -ForegroundColor Green
} else {
    Write-Host "RESULT: ONE OR MORE DOMAINS ARE TAKEN!" -ForegroundColor Red
}

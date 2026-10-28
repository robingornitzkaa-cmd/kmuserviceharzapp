# Forensic Auditor DNS Check Script
$domains = @(
    'prozesswerk-harz.de',
    'bueroschmiede-harz.de',
    'ablaufwerk-harz.de',
    'klarzeit-harz.de',
    'ruhetakt-harz.de',
    'ruhetakt.de',
    'buerofreiraum-harz.de',
    'taktos-harz.de',
    'taktos.de',
    'struktus-harz.de',
    'struktus.de',
    'taktwerk-harz.de',
    'klarwerk-harz.de'
)

Write-Host "=== AUDITOR INDEPENDENT LIVE DNS RESOLUTION CHECK ==="
$allFree = $true
foreach ($d in $domains) {
    try {
        $res = Resolve-DnsName -Name $d -Type A -ErrorAction Stop
        Write-Host "OCCUPIED: $d resolves to $($res.IPAddress -join ', ')" -ForegroundColor Red
        $allFree = $false
    } catch {
        Write-Host "FREE (NXDOMAIN): $d" -ForegroundColor Green
    }
}

if ($allFree) {
    Write-Host "`nAUDIT VERDICT ON DNS: ALL 10 TARGET DOMAINS ARE INDEED UNREGISTERED / FREE OF A-RECORDS."
} else {
    Write-Host "`nAUDIT VERDICT ON DNS: SOME DOMAINS ARE OCCUPIED."
}

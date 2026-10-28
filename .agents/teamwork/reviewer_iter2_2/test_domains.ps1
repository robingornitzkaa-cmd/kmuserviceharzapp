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

Write-Host "=== TEST 1: REGIONAL HARZ DOMAINS ==="
foreach ($domain in $domains) {
    try {
        $result = Resolve-DnsName -Name $domain -ErrorAction Stop
        $ip = ($result | Where-Object { $_.IPAddress } | Select-Object -ExpandProperty IPAddress) -join ', '
        Write-Host "[ACTIVE / TAKEN] $domain -> $ip" -ForegroundColor Red
    } catch {
        Write-Host "[FREE / NXDOMAIN] $domain" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "=== TEST 2: BASE DOMAINS (.de) ==="
$baseDomains = @(
    'prozesswerk.de',
    'bueroschmiede.de',
    'flusswerk.de',
    'klarzeit.de',
    'ruhetakt.de',
    'freitakt.de',
    'klaros.de',
    'struktus.de',
    'taktwerk.de',
    'ruhewerk.de'
)

foreach ($bdomain in $baseDomains) {
    try {
        $result = Resolve-DnsName -Name $bdomain -ErrorAction Stop
        $ip = ($result | Where-Object { $_.IPAddress } | Select-Object -ExpandProperty IPAddress) -join ', '
        Write-Host "[ACTIVE / TAKEN] $bdomain -> $ip" -ForegroundColor Yellow
    } catch {
        Write-Host "[FREE / NXDOMAIN] $bdomain" -ForegroundColor Cyan
    }
}

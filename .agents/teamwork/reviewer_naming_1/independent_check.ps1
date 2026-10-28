$regionalDomains = @(
    'prozesswerk-harz.de',
    'bueroschmiede-harz.de',
    'ablaufwerk-harz.de',
    'klarzeit-harz.de',
    'ruhetakt-harz.de',
    'buerofreiraum-harz.de',
    'taktos-harz.de',
    'struktus-harz.de',
    'taktwerk-harz.de',
    'klarwerk-harz.de'
)

$standaloneDomains = @(
    'prozesswerk.de',
    'bueroschmiede.de',
    'ablaufwerk.de',
    'klarzeit.de',
    'ruhetakt.de',
    'buerofreiraum.de',
    'taktos.de',
    'struktus.de',
    'taktwerk.de',
    'klarwerk.de'
)

Write-Host "=== 1. RECOMMENDED REGIONAL DOMAINS (.de) ==="
foreach ($d in $regionalDomains) {
    try {
        $res = Resolve-DnsName -Name $d -Type A -ErrorAction Stop
        Write-Host "OCCUPIED: $d -> $($res.IPAddress)" -ForegroundColor Red
    } catch {
        Write-Host "AVAILABLE / NXDOMAIN: $d" -ForegroundColor Green
    }
}

Write-Host "`n=== 2. STANDALONE NATIONWIDE DOMAINS (.de) (ADVERSARIAL STRESS TEST) ==="
foreach ($d in $standaloneDomains) {
    try {
        $res = Resolve-DnsName -Name $d -Type A -ErrorAction Stop
        Write-Host "OCCUPIED: $d -> $($res.IPAddress)" -ForegroundColor Red
    } catch {
        Write-Host "AVAILABLE / NXDOMAIN: $d" -ForegroundColor Green
    }
}

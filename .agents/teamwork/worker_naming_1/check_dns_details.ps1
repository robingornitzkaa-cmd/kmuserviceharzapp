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

Write-Host "=== NSLOOKUP & DETAILED DNS CHECK ==="
foreach ($domain in $domains) {
    Write-Host "Testing $domain ..."
    $nslookup = nslookup -type=any $domain 2>&1 | Out-String
    Write-Host $nslookup
}

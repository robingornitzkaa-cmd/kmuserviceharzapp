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

Write-Host "=== DNS QUERY TEST ==="
foreach ($domain in $domains) {
    try {
        $result = Resolve-DnsName -Name $domain -Type A -ErrorAction Stop
        Write-Host "OCCUPIED / RESOLVED: $domain" -ForegroundColor Yellow
        $result | Format-Table -Property Name, Type, IPAddress -AutoSize | Out-String | Write-Host
    } catch {
        Write-Host "AVAILABLE / NXDOMAIN: $domain (No DNS A-record)" -ForegroundColor Green
    }
}

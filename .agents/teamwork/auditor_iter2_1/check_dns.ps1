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

foreach ($dom in $domains) {
    try {
        $res = Resolve-DnsName -Name $dom -ErrorAction Stop
        Write-Output "$dom : RESOLVED -> $($res.IPAddress -join ',')"
    } catch {
        Write-Output "$dom : NXDOMAIN / FREE -> $($_.Exception.Message)"
    }
}

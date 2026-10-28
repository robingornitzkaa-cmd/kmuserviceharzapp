$domains = @(
    'struktus.de',
    'struktus-harz.de',
    'tactos.de',
    'tactos-harz.de',
    'prozesswerk-nord.de',
    'bueroschmiede-nord.de',
    'taktwerk-nord.de'
)

$results = foreach ($domain in $domains) {
    try {
        $res = Resolve-DnsName -Name $domain -ErrorAction Stop
        [PSCustomObject]@{
            Domain = $domain
            Resolved = $true
            IP = ($res | Where-Object { $_.IPAddress } | Select-Object -ExpandProperty IPAddress -First 1)
        }
    } catch {
        [PSCustomObject]@{
            Domain = $domain
            Resolved = $false
            IP = "FREE/NO_DNS"
        }
    }
}

$results | Format-Table -AutoSize

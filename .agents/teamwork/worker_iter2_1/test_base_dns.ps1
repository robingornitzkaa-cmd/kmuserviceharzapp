$base_domains = @(
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

$results = foreach ($domain in $base_domains) {
  try {
    $res = Resolve-DnsName -Name $domain -ErrorAction Stop
    [PSCustomObject]@{
      Domain = $domain
      Status = "RESOLVES"
      Details = ($res | Select-Object -ExpandProperty IPAddress -ErrorAction SilentlyContinue) -join ','
    }
  } catch {
    [PSCustomObject]@{
      Domain = $domain
      Status = "FREE (NXDOMAIN)"
      Details = "OK"
    }
  }
}

$results | Format-Table -AutoSize

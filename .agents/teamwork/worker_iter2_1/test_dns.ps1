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

$results = foreach ($domain in $domains) {
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

$domains = @('flusswerk.de', 'freitakt.de', 'klaros.de', 'ruhewerk.de', 'klarzeit.de', 'prozesswerk.de', 'bueroschmiede.de', 'taktwerk.de')

foreach ($d in $domains) {
    Write-Host "=============================="
    Write-Host "Inspecting: http://$d"
    try {
        $resp = Invoke-WebRequest -Uri "http://$d" -TimeoutSec 5 -UserAgent "Mozilla/5.0" -ErrorAction Stop
        Write-Host "Status: $($resp.StatusCode)"
        $title = ""
        if ($resp.Content -match '<title>(.*?)</title>') {
            $title = $matches[1]
        }
        Write-Host "Title: $title"
        $raw = $resp.Content -replace '<[^>]+>', ' ' -replace '\s+', ' '
        $snippet = $raw.Substring(0, [Math]::Min(300, $raw.Length))
        Write-Host "Snippet: $snippet"
    } catch {
        Write-Host "Error or Redirect: $_"
    }
    
    try {
        $respHttps = Invoke-WebRequest -Uri "https://$d" -TimeoutSec 5 -UserAgent "Mozilla/5.0" -ErrorAction Stop
        Write-Host "HTTPS Status: $($respHttps.StatusCode)"
        $titleHttps = ""
        if ($respHttps.Content -match '<title>(.*?)</title>') {
            $titleHttps = $matches[1]
        }
        Write-Host "HTTPS Title: $titleHttps"
        $rawHttps = $respHttps.Content -replace '<[^>]+>', ' ' -replace '\s+', ' '
        $snippetHttps = $rawHttps.Substring(0, [Math]::Min(300, $rawHttps.Length))
        Write-Host "HTTPS Snippet: $snippetHttps"
    } catch {
        Write-Host "HTTPS Error or Redirect: $_"
    }
}

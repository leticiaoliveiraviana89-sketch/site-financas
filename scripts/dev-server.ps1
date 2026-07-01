param(
  [int]$Port = 4173
)

$Root = (Resolve-Path ".").Path
$Listener = New-Object System.Net.HttpListener
$Prefix = "http://localhost:$Port/"
$Listener.Prefixes.Add($Prefix)

$ContentTypes = @{
  ".css" = "text/css; charset=utf-8"
  ".html" = "text/html; charset=utf-8"
  ".js" = "text/javascript; charset=utf-8"
  ".jpg" = "image/jpeg"
  ".md" = "text/markdown; charset=utf-8"
  ".png" = "image/png"
}

function Resolve-SitePath {
  param([string]$UrlPath)

  $DecodedPath = [System.Uri]::UnescapeDataString($UrlPath.TrimStart("/"))
  if ([string]::IsNullOrWhiteSpace($DecodedPath)) {
    $DecodedPath = "index.html"
  }

  $Candidate = [System.IO.Path]::GetFullPath((Join-Path $Root $DecodedPath))
  if (-not $Candidate.StartsWith($Root)) {
    return $null
  }

  if ((Test-Path $Candidate -PathType Container)) {
    return Join-Path $Candidate "index.html"
  }

  return $Candidate
}

$Listener.Start()
Write-Host "Finance rodando em $Prefix"

try {
  while ($Listener.IsListening) {
    $Context = $Listener.GetContext()
    $Response = $Context.Response
    $FilePath = Resolve-SitePath $Context.Request.Url.AbsolutePath

    if (-not $FilePath -or -not (Test-Path $FilePath -PathType Leaf)) {
      $Body = [System.Text.Encoding]::UTF8.GetBytes("Arquivo nao encontrado.")
      $Response.StatusCode = 404
      $Response.ContentType = "text/plain; charset=utf-8"
      $Response.OutputStream.Write($Body, 0, $Body.Length)
      $Response.Close()
      continue
    }

    $Extension = [System.IO.Path]::GetExtension($FilePath)
    $Response.ContentType = $ContentTypes[$Extension]
    if (-not $Response.ContentType) {
      $Response.ContentType = "application/octet-stream"
    }

    $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
    $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
    $Response.Close()
  }
}
finally {
  $Listener.Stop()
}

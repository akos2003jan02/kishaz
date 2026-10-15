$path = "src/App.tsx"

if (!(Test-Path $path)) {
    Write-Host "HIBA: Nem találom a src/App.tsx fájlt."
    exit
}

$backup = "$path.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Copy-Item $path $backup

$content = Get-Content -Raw $path

# Szóközök eltávolítása a JSX nyitó tagek neve elől
$content = [regex]::Replace(
    $content,
    '<\s+([A-Za-z][A-Za-z0-9]*)',
    '<$1'
)

# Szóközök eltávolítása a JSX záró tagek neve elől
$content = [regex]::Replace(
    $content,
    '</\s+([A-Za-z][A-Za-z0-9]*)',
    '</$1'
)

# Hibás aria attribútumok javítása
$content = [regex]::Replace(
    $content,
    'aria\s*-\s*(label|expanded|hidden)',
    'aria-$1'
)

Set-Content -Path $path -Value $content -Encoding UTF8

Write-Host ""
Write-Host "A javitas lefutott."
Write-Host "Biztonsagi masolat: $backup"
Write-Host ""
Write-Host "Build ellenorzese:"
npm.cmd run build
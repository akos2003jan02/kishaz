
$path = "src/App.tsx"
$fullPath = (Resolve-Path $path).Path

Copy-Item $fullPath "$fullPath.before-repair" -Force

$utf8 = [System.Text.Encoding]::UTF8
$cp1250 = [System.Text.Encoding]::GetEncoding(1250)
$content = [System.IO.File]::ReadAllText($fullPath, $utf8)

$pattern = '[^\s<>""'']*[\u0102\u00E2\u00C2\u0139][^\s<>""'']*'

$content = [regex]::Replace($content, $pattern, {
    param($match)

    try {
        $bytes = $cp1250.GetBytes($match.Value)
        $candidate = $utf8.GetString($bytes)

        $oldScore = ([regex]::Matches($match.Value, '[\u0102\u00E2\u00C2\u0139]')).Count
        $newScore = ([regex]::Matches($candidate, '[\u0102\u00E2\u00C2\u0139]')).Count

        if ($newScore -lt $oldScore) {
            return $candidate
        }

        return $match.Value
    }
    catch {
        return $match.Value
    }
})

[System.IO.File]::WriteAllText(
    $fullPath,
    $content,
    [System.Text.UTF8Encoding]::new($true)
)

Write-Host "Repair finished. Backup: App.tsx.before-repair"

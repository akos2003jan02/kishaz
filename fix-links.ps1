
$path = "src/App.tsx"
$fullPath = (Resolve-Path $path).Path

Copy-Item $fullPath "$fullPath.before-links-fix" -Force

$content = [System.IO.File]::ReadAllText(
    $fullPath,
    [System.Text.Encoding]::UTF8
)

$content = $content -replace '<\s+span\b', '<span'
$content = $content -replace '<\s+div\b', '<div'
$content = $content -replace '<\s+a\b', '<a'
$content = $content -replace 'aria\s+-\s+label', 'aria-label'
$content = $content -replace 'aria\s+-\s+hidden', 'aria-hidden'
$content = $content -replace 'className\s+=', 'className='
$content = $content -replace 'href\s+=', 'href='
$content = $content -replace 'target\s+=', 'target='
$content = $content -replace 'rel\s+=', 'rel='

[System.IO.File]::WriteAllText(
    $fullPath,
    $content,
    [System.Text.UTF8Encoding]::new($true)
)

Write-Host "A JSX attribútumok javítása lefutott."
Write-Host "Biztonsági másolat: App.tsx.before-links-fix"

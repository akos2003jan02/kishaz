
$ErrorActionPreference = "Stop"

$appPath = ".\src\App.tsx"
$cssPath = ".\src\index.css"
$backup = ".\backup-gallery-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

New-Item -ItemType Directory -Path $backup | Out-Null
Copy-Item $appPath "$backup\App.tsx"
Copy-Item $cssPath "$backup\index.css"

try {
    $app = Get-Content $appPath -Raw
    $css = Get-Content $cssPath -Raw

    if ($app -match "galleryImages|kishaz-gallery") {
        throw "Galeriakod mar van a fajlban. Nem modositottam semmit."
    }

    $imageDir = ".\src\assets\gallery"
    New-Item -ItemType Directory -Force $imageDir | Out-Null

    foreach ($name in @("rapper.webp", "gitaros.webp", "dj.webp")) {
        $source = ".\public\images\$name"
        if (!(Test-Path $source)) {
            throw "Hianyzik: $source"
        }
        Copy-Item $source "$imageDir\$name" -Force
    }

    $galleryCode = @'
const galleryImages = Object.values(
    import.meta.glob("./assets/gallery/*.{jpg,jpeg,png,webp}", {
        eager: true,
        query: "?url",
        import: "default",
    })
) as string[];
'@

    $membersPattern = '(?s)(const\s+members\s*=\s*\[.*?\]\s*;)'
    if ($app -notmatch $membersPattern) {
        throw "Nem talalom a members tombot."
    }
    $app = [regex]::Replace($app, $membersPattern, ('$1' + "`r`n" + $galleryCode), 1)

    $hook = 'const [menuOpen, setMenuOpen] = useState(false);'
    if (!$app.Contains($hook)) {
        throw "Nem talalom a menuOpen useState sort."
    }

    $stateCode = @'
const [galleryIndex, setGalleryIndex] = useState(0);
    const [galleryOrder] = useState<string[]>(() => {
        const images = [...galleryImages];
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }
        return images;
    });

    useEffect(() => {
        if (galleryOrder.length < 2) return;
        const timer = window.setInterval(() => {
            setGalleryIndex((i) => (i + 1) % galleryOrder.length);
        }, 4500);
        return () => window.clearInterval(timer);
    }, [galleryOrder.length]);
'@

    $app = $app.Replace($hook, $hook + "`r`n    " + $stateCode)

    $sectionPattern = '(?s)<section className=\s*"photo-section"[^>]*>.*?</section>'
    $galleryMarkup = @'
<section className="photo-section kishaz-gallery-section" aria-label="Kisház képgaléria">
    <div className="kishaz-gallery">
        <div className="kishaz-gallery-frame">
            <img
                key={galleryOrder[galleryIndex]}
                className="kishaz-gallery-image"
                src={galleryOrder[galleryIndex]}
                alt={`Kisház hangulatkép ${galleryIndex + 1}`}
            />
            <div className="kishaz-gallery-overlay">
                <span>{String(galleryIndex + 1).padStart(2, "0")} / {String(galleryOrder.length).padStart(2, "0")}</span>
                <div className="kishaz-gallery-controls">
                    <button type="button" aria-label="Előző kép" onClick={() => setGalleryIndex((i) => (i - 1 + galleryOrder.length) % galleryOrder.length)}>←</button>
                    <button type="button" aria-label="Következő kép" onClick={() => setGalleryIndex((i) => (i + 1) % galleryOrder.length)}>→</button>
                </div>
            </div>
        </div>
        <div className="kishaz-gallery-dots">
            {galleryOrder.map((image, index) => (
                <button
                    type="button"
                    key={image}
                    className={index === galleryIndex ? "kishaz-gallery-dot active" : "kishaz-gallery-dot"}
                    aria-label={`Ugrás a(z) ${index + 1}. képre`}
                    onClick={() => setGalleryIndex(index)}
                />
            ))}
        </div>
    </div>
</section>
'@

    $updatedApp = [regex]::Replace($app, $sectionPattern, $galleryMarkup, 1)
    if ($updatedApp -eq $app) {
        throw "Nem talalom a photo-section reszt."
    }

    $galleryCss = @'

/* Kishaz forgó képgaléria */
.kishaz-gallery-section { display: block; }
.kishaz-gallery { width: 100%; }
.kishaz-gallery-frame {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    max-height: 680px;
    overflow: hidden;
    background: #272923;
}
.kishaz-gallery-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: kishaz-gallery-fade 0.5s ease;
}
@keyframes kishaz-gallery-fade {
    from { opacity: 0.5; }
    to { opacity: 1; }
}
.kishaz-gallery-overlay {
    position: absolute;
    inset: auto 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px;
    color: white;
    background: linear-gradient(transparent, rgba(0,0,0,.7));
}
.kishaz-gallery-controls { display: flex; gap: 8px; }
.kishaz-gallery-controls button {
    width: 42px;
    height: 42px;
    border: 1px solid white;
    border-radius: 50%;
    background: rgba(0,0,0,.25);
    color: white;
    font-size: 22px;
    cursor: pointer;
}
.kishaz-gallery-controls button:hover {
    background: #d6ff3f;
    color: #151515;
}
.kishaz-gallery-dots {
    display: flex;
    justify-content: center;
    gap: 9px;
    padding-top: 16px;
}
.kishaz-gallery-dot {
    width: 8px;
    height: 8px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: #777;
    cursor: pointer;
}
.kishaz-gallery-dot.active {
    width: 26px;
    background: #d6ff3f;
}
@media (max-width: 600px) {
    .kishaz-gallery-frame { aspect-ratio: 4 / 5; }
    .kishaz-gallery-overlay { padding: 12px; }
}
@media (prefers-reduced-motion: reduce) {
    .kishaz-gallery-image { animation: none; }
}
'@

    if ($css -notmatch '\.kishaz-gallery-frame') {
        $css += "`r`n" + $galleryCss
    }

    Set-Content $appPath $updatedApp -Encoding utf8
    Set-Content $cssPath $css -Encoding utf8

    Write-Host "A galeria kodja bekerult. Build ellenorzese indul..." -ForegroundColor Cyan
    npm.cmd run build

    if ($LASTEXITCODE -ne 0) {
        throw "A build sikertelen."
    }

    Write-Host "Sikeres build. A tagkartyak megmaradtak." -ForegroundColor Green
    Write-Host "Kepek helye: src\assets\gallery"
    Write-Host "Biztonsagi mentes: $backup"
}
catch {
    Copy-Item "$backup\App.tsx" $appPath -Force
    Copy-Item "$backup\index.css" $cssPath -Force
    Write-Host "HIBA: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "A ket kodfajl vissza lett allitva. Mentes: $backup"
}

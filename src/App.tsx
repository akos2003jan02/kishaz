
import { useEffect, useState } from "react";
import "./index.css";

const members = [
    {
        number: "01",
        name: "FRONTEMBER",
        role: "Ének / Rap",
        image:
            "/images/rapper.webp",
    },
    {
        number: "02",
        name: "GITÁROS",
        role: "Gitár",
        image:
            "/images/gitaros.webp",
    },
    {
        number: "03",
        name: "DJ",
        role: "DJ / Elektronika",
        image:
            "/images/dj.webp",
    },
];
const galleryImages = Object.values(
    import.meta.glob("./assets/gallery/*.webp", {
        eager: true,
        query: "?url",
        import: "default",
    })
) as string[];

const tracks = [
    { number: "01", url: "https://open.spotify.com/track/0wOOSPu3IuBwmzwwHwNZDc" },
    { number: "02", url: "https://open.spotify.com/track/2Su1ZAdeR5uAqnABYB0Y4N" },
    { number: "03", url: "https://open.spotify.com/track/0WKVmAHqu3bIiR7ShwGiIp" },
];

type Concert = {
    date: string;
    venue: string;
    city: string;
    ticketUrl?: string;
};

const concerts: Concert[] = [];


const platforms = [
    {
        name: "Spotify",
        symbol: "S",
        url: "https://open.spotify.com/artist/36LjMzhzHRQQC7kEkhOTOP",
    },
    {
        name: "YouTube",
        symbol: "▶",
        url: "https://www.youtube.com/channel/UCNsKIy8WiC4davz2TEo9JPw",
    },
];

const socials = [
    {
        name: "Instagram",
        symbol: "IG",
        url: "https://www.instagram.com/kishaz_collective/",
    },
    {
        name: "TikTok",
        symbol: "TK",
        url: "https://www.tiktok.com/@bullet.no1",
    },
];

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
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
    const [trackMetadata, setTrackMetadata] = useState<Record<string, { title: string; artist: string; image: string }>>({});

    useEffect(() => {
        let cancelled = false;

        const loadTracks = async () => {
            const results = await Promise.all(
                tracks.map(async (track) => {
                    try {
                        const response = await fetch(
                            `https://open.spotify.com/oembed?url=${encodeURIComponent(track.url)}`
                        );
                        if (!response.ok) return null;

                        const data = await response.json() as {
                            title?: string;
                            author_name?: string;
                            thumbnail_url?: string;
                        };

                        if (!data.title) return null;

                        return {
                            number: track.number,
                      













      title: data.title,
                            artist: data.author_name ?? "Spotify",
                            image: data.thumbnail_url ?? ""
                        };
                    } catch {
                        return null;
                    }
                })
            );

            const metadata: Record<string, { title: string; artist: string; image: string }> = {};
            for (const item of results) {
                if (item) {
                    metadata[item.number] 












= {
                        title: item.title,
                        artist: item.artist,
                        image: item.image
                    };
                }
            }

            if (!cancelled) setTrackMetadata(metadata);
        };

 










       void loadTracks();
        return () => { cancelled = true; };
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
        <header className= "site-header" >
        <a className="logo" href= "#home" onClick = { closeMenu } >
            KISHÁZ<span>.</span>
            </a>

            <button
    className= "menu-toggle"
    type = "button"
    aria-label={ menuOpen ? "Menü bezárása" : "Menü megnyitása" }
    aria-expanded={ menuOpen }
    onClick = {() => setMenuOpen(!menuOpen)
}
        >
{ menuOpen? "BEZÁRÁS −": "MENÜ +" }
    </button>

    <nav
className= {`navigation ${menuOpen ? "navigation-open" : ""}`}
aria-label="Fő navigáció"
    >
    <a href="#about" onClick = { closeMenu } > RÓLUNK </a>
        <a href= "#members" onClick = { closeMenu } > TAGOK </a>
            <a href= "#music" onClick = { closeMenu } > ZENÉK </a>
                <a href= "#concerts" onClick = { closeMenu } > KONCERTEK </a>
                    <a href= "#contact" onClick = { closeMenu } > KAPCSOLAT </a>
                        </nav>
                        </header>

                        <main >
                        <section className="hero" id = "home" >
                            <div className="hero-content" >
                                <p className="eyebrow" > NEM FÉRÜNK BE A KERETEKBE </p>
                                    <h1>
              EZ ITT A <br />
    <span>KISHÁZ.</span>
    </h1>
    <p className= "hero-description" >
    Gitár, rap és elektronikus káosz.Egy zenekar, ami nem kér
engedélyt.
            </p>
    <a className= "button button-primary" href= "#music" >
        HALLGASS BELE<span>↘</span>
            </a>
            </div>

            <div className= "hero-sticker" aria-hidden="true" >
                NEM <br />
                ALKUSZUNK<span>✳</span>
                    </div>

                    <div className= "hero-index" > BP. / HU — 2026 </div>
                        </section>

                        <div className= "ticker" aria-label="Kisház" >
                            <div className="ticker-track" >
                            {
                                Array.from({ length: 4 }, (_, index) => (
                                    <span key= { index } >
                                    KISHÁZ ✳ NEM A HÁTTÉRZENE ✳ HANGOSAN ÉLÜNK ✳
                                    </span>
                                ))
                            }
                                </div>
                                </div>

                                <section className= "section about-section" id = "about" >
                                    <div className="section-label" >
                                        <span>01 / RÓLUNK </span>
                                        <span > NEM SABLON </span>
                                            </div>

                                            <div className= "about-grid" >
                                                <h2 className="about-heading" >
                                                    NEM EGY <br />
                                                        <span>DOBOZBA </span>
                                                        <br />
                                                        VALÓK<span>.</span>
                                                        </h2>

                                                        <div className= "about-copy" >
                                                            <p className="about-lead" >
                                                                Három külön világ.Egy közös hang.
              </p>
                                                                    <p>
                A Kisházban a gitár találkozik a rap energiájával és az
                elektronikus zenék lüktetésével.Nem akarunk beleilleni
semmibe.Saját hangzást, saját szabályokat és valódi
                koncertélményt építünk.
              </p>
    <a className= "text-link" href= "#members" >
        ISMERJ MEG MINKET<span>↗</span>
            </a>
            </div>
            </div>
            </section>

            <section className="photo-section kishaz-gallery-section" aria-label="KishĂˇz kĂ©pgalĂ©ria">
    <div className="kishaz-gallery">
        <div className="kishaz-gallery-frame">
            <img
                key={galleryOrder[galleryIndex]}
                className="kishaz-gallery-image"
                src={galleryOrder[galleryIndex]}
                alt={`KishĂˇz hangulatkĂ©p ${galleryIndex + 1}`}
            />
            <div className="kishaz-gallery-overlay">
                <span>{String(galleryIndex + 1).padStart(2, "0")} / {String(galleryOrder.length).padStart(2, "0")}</span>
                <div className="kishaz-gallery-controls">
                    <button type="button" aria-label="ElĹ‘zĹ‘ kĂ©p" onClick={() => setGalleryIndex((i) => (i - 1 + galleryOrder.length) % galleryOrder.length)}>â†</button>
                    <button type="button" aria-label="KĂ¶vetkezĹ‘ kĂ©p" onClick={() => setGalleryIndex((i) => (i + 1) % galleryOrder.length)}>â†’</button>
                </div>
            </div>
        </div>
        <div className="kishaz-gallery-dots">
            {galleryOrder.map((image, index) => (
                <button
                    type="button"
                    key={image}
                    className={index === galleryIndex ? "kishaz-gallery-dot active" : "kishaz-gallery-dot"}
                    aria-label={`UgrĂˇs a(z) ${index + 1}. kĂ©pre`}
                    onClick={() => setGalleryIndex(index)}
                />
            ))}
        </div>
    </div>
</section>

    <section className= "section members-section" id = "members" >
        <div className="section-label" >
            <span>02 / A CSAPAT </span>
                <span > HÁRMAN EGYÜTT </span>
                    </div>

                    <div className= "section-heading-row" >
                        <h2>
                        EZEK <br />
                        <span>MI VAGYUNK.</span>
                            </h2>
                            <p > Három arc.Három szerep.Egy közös ügy.</p>
                                </div>

                                <div className= "members-grid" >
                                {
                                    members.map((member) => (
                                        <article className= "member-card" key = { member.number } >
                                        <div className="member-image" >
                                    <img
                    src={ member.image }
                    alt = { member.name }
                    loading = "lazy"
                                        />
                                        <span className="member-number" > { member.number } </span>
                                    <span className= "member-arrow" aria-hidden="true" >↗</span>
                                    </div>
                                    <div className= "member-info" >
                                    <h3>{ member.name } </h3>
                                    <p > { member.role } </p>
                                    </div>
                                    </article>
                                    ))
                                }
                                    </div>
                                    </section>

                                    <section className= "section music-section" id = "music" >
                                        <div className="section-label" >
                                            <span>03 / HANGANYAG </span>
                                            <span > HALLGASD MEG </span>
                                                </div>

                                                <div className= "section-heading-row" >
                                                    <h2>
                                                    NE CSAK <br />
                                                        <span>OLVASD.</span>
                                                        </h2>
                                                        <p > A zene mondja el a többit.</p>
                                                            </div>

                                                            <div className= "tracks-list" >
                                                            {tracks.map((track) => (
    <a className="track-row" key={track.number} href={track.url} target="_blank" rel="noopener noreferrer">
        <span className="track-number">{track.number}</span>
        {trackMetadata[track.number]?.image && (
            <img className="track-cover" src={trackMetadata[track.number].image} alt="Dal borítóképe" loading="lazy" />
        )}
        <div className="track-info">
            <h3>{trackMetadata[track.number]?.title ?? "DAL CÍMÉNEK BETÖLTÉSE…"}</h3>
            <span>{trackMetadata[track.number]?.artist ?? "SPOTIFY · EREDETI DAL"}</span>
        </div>
        <span className="track-arrow" aria-hidden="true">↗</span>
    </a>
))}
                                                                </div>

                                                                <p className= "platform-heading" > MEGTALÁLSZ ITT IS </p>


<div className="platform-links">
    {platforms.map((platform) => (
        <a className="platform-link" key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer">
            <span className="platform-symbol">{platform.symbol}</span>
            <span>{platform.name}</span>
            <span className="platform-arrow" aria-hidden="true">↗</span>
        </a>
    ))}
</div>
    <div className="youtube-embed"><iframe title="Kisház – YouTube-videó" src="https://www.youtube-nocookie.com/embed/wvrTYr65XPY" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></div>
    <div className="music-embed">
        <iframe title="Kisház a Spotifyon" src="https://open.spotify.com/embed/artist/36LjMzhzHRQQC7kEkhOTOP?utm_source=generator" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
    </section>

    <section className= "section concerts-section" id = "concerts" >
        <div className="section-label" >
            <span>04 / ÉLŐBEN </span>
            <span > KONCERTEK </span>
            </div>

            <div className= "concerts-content" >
                <span className="concerts-symbol" aria-hidden="true" >✳</span>
                    <h2>
{concerts.length > 0 ? "TALÁLKOZUNK" : "HAMAROSAN"} <br />
    <span>{concerts.length > 0 ? "A SZÍNPADON." : "TALÁLKOZUNK."}</span>
    </h2>
    <p>
              {concerts.length > 0 ? "Következő fellépéseink. Találkozzunk élőben!" : "Jelenleg nincs meghirdetett koncertünk. Kövess minket a közösségi oldalainkon, hogy elsőként értesülj a következő fellépésünkről!"}
            </p>
        {concerts.length > 0 && (
            <div className="concert-list">
                {concerts.map((concert, index) => (
                    <article className="concert-card" key={`${concert.date}-${concert.venue}-${index}`}>
                        <div className="concert-date">{concert.date}</div>
                        <div className="concert-details">
                            <h3>{concert.venue}</h3>
                            <p>{concert.city}</p>
                        </div>
                        {concert.ticketUrl && (
                            <a className="concert-ticket" href={concert.ticketUrl} target="_blank" rel="noopener noreferrer">
                                JEGYEK ↗
                            </a>
                        )}
                    </article>
                ))}
            </div>
        )}
    <a className= "button button-primary" href= "#contact" >
        KAPCSOLAT<span>↘</span>
            </a>
            </div>
            </section>

            <section className= "section contact-section" id = "contact" >
                <div className="section-label" >
                    <span>05 / KAPCSOLAT </span>
                    <span > ÍRJ NEKÜNK </span>
                        </div>

                        <div className= "contact-grid" >
                            <div className="contact-content" >
                                <h2>
                                BESZÉLJÜNK <br />
                                <span>RÓLA.</span>
                                </h2>
                                <p > Koncert, együttműködés vagy bármi más ? Írj nekünk.</p>
                                    <a className= "contact-email" href= "mailto:kishaz.collective@gmail.com" >
                                        KISHAZ.COLLECTIVE@GMAIL.COM<span>↗</span>
                                            </a>
                                            </div>

                                            <div className= "social-block" >
                                                <h3>KÖVESS MINKET </h3>

<div className="social-links">
    {socials.map((social) => (
        <a className="social-link" key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
            <span className="social-symbol">{social.symbol}</span>
            <span>{social.name}</span>
            <span className="social-arrow" aria-hidden="true">↗</span>
        </a>
    ))}
</div>

    </div>
    </div>
    </section>
    </main>

    <footer className= "site-footer" >
        <a className="footer-brand" href= "#home" >
            KISHÁZ<span>.</span>
            </a>
            <div className= "footer-platforms" aria-label="Zenei platformok" >
            {
                platforms.map((platform) => (
                    <span key= { platform.name } > { platform.name } </span>
                ))
            }
                </div>
                <span className= "footer-copy" >
          © { new Date().getFullYear() } KISHÁZ.MINDEN JOG FENNTARTVA.
        </span>
    <a className= "back-to-top" href= "#home" aria-label="Vissza a tetejére" >
          ↑
</a>
    </footer>
    </>
  );
}

export default App;















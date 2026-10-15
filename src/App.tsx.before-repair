
import { useState } from "react";
import "./index.css";

const members = [
    {
        number: "01",
        name: "FRONTEMBER",
        role: "Ă‰nek / Rap",
        image:
            "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",
    },
    {
        number: "02",
        name: "GITĂROS",
        role: "GitĂˇr",
        image:
            "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=85",
    },
    {
        number: "03",
        name: "DJ",
        role: "DJ / Elektronika",
        image:
            "https://images.unsplash.com/photo-1571266028243-d220c9c3b7f8?auto=format&fit=crop&w=900&q=85",
    },
];

const tracks = [
    { number: "01", title: "KISHĂZ", note: "SAJĂT ZENE" },
    { number: "02", title: "NINCS CSEND", note: "SAJĂT ZENE" },
    { number: "03", title: "SAJĂT SZABĂLYOK", note: "SAJĂT ZENE" },
];

const platforms = [
    { name: "Spotify", symbol: "S" },
    { name: "Apple Music", symbol: "â™Ş" },
    { name: "YouTube", symbol: "â–¶" },
];

const socials = [
    { name: "Instagram", symbol: "IG" },
    { name: "TikTok", symbol: "TK" },
];

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
        <header className= "site-header" >
        <a className="logo" href = "#home" onClick = { closeMenu } >
            KISHĂZ<span>.</span>
            </a>

            <button
    className = "menu-toggle"
    type = "button"
    aria-label={ menuOpen ? "MenĂĽ bezĂˇrĂˇsa" : "MenĂĽ megnyitĂˇsa" }
    aria-expanded={ menuOpen }
    onClick = {() => setMenuOpen(!menuOpen)
}
        >
{ menuOpen? "BEZĂRĂS â’": "MENĂś +" }
    </button>

    <nav
className = {`navigation ${menuOpen ? "navigation-open" : ""}`}
aria-label="FĹ‘ navigĂˇciĂł"
    >
    <a href="#about" onClick = { closeMenu } > RĂ“LUNK </a>
        <a href = "#members" onClick = { closeMenu } > TAGOK </a>
            <a href = "#music" onClick = { closeMenu } > ZENĂ‰K </a>
                <a href = "#concerts" onClick = { closeMenu } > KONCERTEK </a>
                    <a href = "#contact" onClick = { closeMenu } > KAPCSOLAT </a>
                        </nav>
                        </header>

                        <main >
                        <section className="hero" id = "home" >
                            <div className="hero-content" >
                                <p className="eyebrow" > NEM FĂ‰RĂśNK BE A KERETEKBE </p>
                                    <h1>
              EZ ITT A <br />
    <span>KISHĂZ.</span>
    </h1>
    <p className = "hero-description" >
        GitĂˇr, rap Ă©s elektronikus kĂˇosz.Egy zenekar, ami nem kĂ©r
engedĂ©lyt.
            </p>
    <a className = "button button-primary" href = "#music" >
        HALLGASS BELE<span>â†</span>
            </a>
            </div>

            <div className = "hero-sticker" aria-hidden="true" >
                NEM <br />
                ALKUSZUNK<span>âśł</span>
                    </div>

                    <div className = "hero-index" > BP. / HU â€” 2026 </div>
                        </section>

                        <div className = "ticker" aria-label="KishĂˇz" >
                            <div className="ticker-track" >
                            {
                                Array.from({ length: 4 }, (_, index) => (
                                    <span key= { index } >
                                    KISHĂZ âśł NEM A HĂTTĂ‰RZENE âśł HANGOSAN Ă‰LĂśNK âśł
                                    </span>
                                ))
                            }
                                </div>
                                </div>

                                <section className = "section about-section" id = "about" >
                                    <div className="section-label" >
                                        <span>01 / RĂ“LUNK </span>
                                        <span > NEM SABLON </span>
                                            </div>

                                            <div className = "about-grid" >
                                                <h2 className="about-heading" >
                                                    NEM EGY <br />
                                                        <span>DOBOZBA </span>
                                                        <br />
                                                        VALĂ“K<span>.</span>
                                                        </h2>

                                                        <div className = "about-copy" >
                                                            <p className="about-lead" >
                                                                HĂˇrom kĂĽlĂ¶n vilĂˇg.Egy kĂ¶zĂ¶s hang.
              </p>
                                                                    <p>
                A KishĂˇzban a gitĂˇr talĂˇlkozik a rap energiĂˇjĂˇval Ă©s az
                elektronikus zenĂ©k lĂĽktetĂ©sĂ©vel.Nem akarunk beleilleni
semmibe.SajĂˇt hangzĂˇst, sajĂˇt szabĂˇlyokat Ă©s valĂłdi
                koncertĂ©lmĂ©nyt Ă©pĂ­tĂĽnk.
              </p>
    <a className = "text-link" href = "#members" >
        ISMERJ MEG MINKET<span>â†—</span>
            </a>
            </div>
            </div>
            </section>

            <section className = "photo-section" aria-label="KishĂˇz hangulatkĂ©pek" >
                <div className="photo-frame" >
                    <img
              src={ members[0].image }
alt = "Koncert kĂ¶zben a szĂ­npadon"
loading = "lazy"
    />
    <span className="photo-caption" > NEM CSAK HALLGATOD.Ă‰RZED.</span>
        </div>
        <div className = "photo-frame photo-frame-small" >
            <img
              src={ members[1].image }
alt = "GitĂˇros koncertfelvĂ©telen"
loading = "lazy"
    />
    </div>
    </section>

    <section className = "section members-section" id = "members" >
        <div className="section-label" >
            <span>02 / A CSAPAT </span>
                <span > HĂRMAN EGYĂśTT </span>
                    </div>

                    <div className = "section-heading-row" >
                        <h2>
                        EZEK <br />
                        <span>MI VAGYUNK.</span>
                            </h2>
                            <p > HĂˇrom arc.HĂˇrom szerep.Egy kĂ¶zĂ¶s ĂĽgy.</p>
                                </div>

                                <div className = "members-grid" >
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
                                    <span className = "member-arrow" aria-hidden="true" >â†—</span>
                                    </div>
                                    <div className = "member-info" >
                                    <h3>{ member.name } </h3>
                                    <p > { member.role } </p>
                                    </div>
                                    </article>
                                    ))
                                }
                                    </div>
                                    </section>

                                    <section className = "section music-section" id = "music" >
                                        <div className="section-label" >
                                            <span>03 / HANGANYAG </span>
                                            <span > HALLGASD MEG </span>
                                                </div>

                                                <div className = "section-heading-row" >
                                                    <h2>
                                                    NE CSAK <br />
                                                        <span>OLVASD.</span>
                                                        </h2>
                                                        <p > A zene mondja el a tĂ¶bbit.</p>
                                                            </div>

                                                            <div className = "tracks-list" >
                                                            {
                                                                tracks.map((track) => (
                                                                    <div className= "track-row" key = { track.number } >
                                                                    <span className="track-number" > { track.number } </span>
                                                                <div className = "track-info" >
                                                                <h3>{ track.title } </h3>
                                                                <span > { track.note } </span>
                                                                </div>
                                                                <span className = "track-arrow" aria-hidden="true" >â†—</span>
                                                                </div>
                                                                ))
                                                            }
                                                                </div>

                                                                <p className = "platform-heading" > MEGTALĂLSZ ITT IS </p>

                                                                    <div className = "platform-links" >
                                                                    {
                                                                        platforms.map((platform) => (
                                                                            <div
                className= "platform-link platform-link-placeholder"
                key = { platform.name }
                aria-label={`${platform.name} â€“ link kĂ©sĹ‘bb`}
                                                                        >
                                                                        <span className="platform-symbol" > { platform.symbol } </span>
                                                                            <span > { platform.name } </span>
                                                                            <span className = "platform-coming-soon" > HAMAROSAN </span>
                                                                                </div>
            ))}
</div>
    </section>

    <section className = "section concerts-section" id = "concerts" >
        <div className="section-label" >
            <span>04 / Ă‰LĹBEN </span>
            <span > KONCERTEK </span>
            </div>

            <div className = "concerts-content" >
                <span className="concerts-symbol" aria-hidden="true" >âśł</span>
                    <h2>
HAMAROSAN <br />
    <span>TALĂLKOZUNK.</span>
    </h2>
    <p>
              A kĂ¶vetkezĹ‘ koncertdĂˇtumok hamarosan Ă©rkeznek.
              KĂ¶vess minket, hogy ne maradj le semmirĹ‘l.
            </p>
    <a className = "button button-primary" href = "#contact" >
        KAPCSOLAT<span>â†</span>
            </a>
            </div>
            </section>

            <section className = "section contact-section" id = "contact" >
                <div className="section-label" >
                    <span>05 / KAPCSOLAT </span>
                    <span > ĂŤRJ NEKĂśNK </span>
                        </div>

                        <div className = "contact-grid" >
                            <div className="contact-content" >
                                <h2>
                                BESZĂ‰LJĂśNK <br />
                                <span>RĂ“LA.</span>
                                </h2>
                                <p > Koncert, egyĂĽttmĹ±kĂ¶dĂ©s vagy bĂˇrmi mĂˇs ? ĂŤrj nekĂĽnk.</p>
                                    <a className = "contact-email" href = "mailto:hello@kishaz.hu" >
                                        HELLO@KISHAZ.HU<span>â†—</span>
                                            </a>
                                            </div>

                                            <div className = "social-block" >
                                                <h3>KĂ–VESS MINKET </h3>
                                                    <div className = "social-links" >
                                                    {
                                                        socials.map((social) => (
                                                            <div
                    className= "social-link social-link-placeholder"
                    key = { social.name }
                    aria-label={`${social.name} â€“ link kĂ©sĹ‘bb`}
                                                        >
                                                        <span className="social-symbol" > { social.symbol } </span>
                                                            <span > { social.name } </span>
                                                            <span className = "social-coming-soon" > HAMAROSAN </span>
                                                                </div>
                ))}
</div>
    </div>
    </div>
    </section>
    </main>

    <footer className = "site-footer" >
        <a className="footer-brand" href = "#home" >
            KISHĂZ<span>.</span>
            </a>
            <div className = "footer-platforms" aria-label="Zenei platformok" >
            {
                platforms.map((platform) => (
                    <span key= { platform.name } > { platform.name } </span>
                ))
            }
                </div>
                <span className = "footer-copy" >
          Â© { new Date().getFullYear() } KISHĂZ.MINDEN JOG FENNTARTVA.
        </span>
    <a className = "back-to-top" href = "#home" aria-label="Vissza a tetejĂ©re" >
          â†‘
</a>
    </footer>
    </>
  );
}

export default App;



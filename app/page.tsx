import { getPortfolio } from '@/lib/content'
import { HeaderMenu } from '@/components/site/header-menu'
import { HeroStage } from '@/components/site/hero-stage'
import { HighlightCard } from '@/components/site/highlight-card'
import { Effects } from '@/components/site/effects'
import { ContactForm } from '@/components/site/contact-form'
import { Socials } from '@/components/site/socials'

// Re-check Supabase for new content at most every 5 minutes
// (saving in /admin refreshes the page immediately).
export const revalidate = 300

const pad = (n: number) => String(n).padStart(2, '0')

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  )
}

export default async function Home() {
  const { profile: p, highlights, tools, services, caseStudies, projects, webProjects = [], skills, testimonials } = await getPortfolio()

  return (
    <>
      <div className="cursor-glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Effects />
      <HeaderMenu name={p.fullName} email={p.email} socials={p.socials} />

      <main id="top">
        {/* ============ HERO ============ */}
        <section className="hero">
          <div className="spotlight" aria-hidden="true" />

          <h1 className="hero-name">
            <span className="sr-only">{p.fullName} — {p.role}</span>
            <span className="line" aria-hidden="true"><span>{p.firstName}</span></span>
            <span className="line outline" aria-hidden="true"><span>{p.lastName}</span></span>
          </h1>

          <ul className="disciplines">
            {p.disciplines.map((d, i) => (
              <li key={d} style={{ animationDelay: `${0.3 + i * 0.12}s` }}>{d}</li>
            ))}
          </ul>

          <HeroStage name={p.fullName} photo={p.photo} meters={p.meters} />

          <div className="hero-word" aria-hidden="true">{p.heroWord}</div>

          <HighlightCard items={highlights} />

          <div className="scroll-hint"><span />Scroll</div>
        </section>

        {/* ============ MARQUEE ============ */}
        <div className="marquee" aria-label="Tools">
          <div className="marquee-track">
            {[...tools, ...tools].map((t, i) => (
              <span key={i} aria-hidden={i >= tools.length}>{t}</span>
            ))}
          </div>
        </div>

        {/* ============ WORKFLOW WALL ============ */}
        <section className="wall" aria-label="Automation workflows">
          <div className="wall-img" style={{ backgroundImage: "url('/workflow-banner.png')" }} />
          <div className="wall-copy">
            <span className="wall-kicker">// live systems</span>
            <p className="wall-title">
              Every node is a task<br /><span className="muted">you never do again.</span>
            </p>
          </div>
        </section>

        {/* ============ ABOUT ============ */}
        <section className="section about" id="about">
          <div className="pill reveal"><span className="pill-dot" />About Me</div>
          <div className="about-grid">
            <h2 className="display reveal">
              I build systems<br />that <span className="muted">work while</span><br />you sleep.
            </h2>
            <div className="about-copy reveal">
              <p className="lead">{p.intro}</p>
              <p>{p.about}</p>
              <div className="about-actions">
                <a href="#work" className="btn btn-light">See Work <span className="arrow">↗</span></a>
                {p.resume && (
                  <a href={p.resume} className="btn btn-ghost" download>Download CV <span className="arrow">↓</span></a>
                )}
              </div>
              <div className="stats">
                <div><strong data-count={services.length}>0</strong><span>Services</span></div>
                <div><strong data-count={projects.length + caseStudies.length}>0</strong><span>Workflows shipped</span></div>
                <div><strong data-count={webProjects.length}>0</strong><span>Live websites</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section className="section" id="services">
          <div className="section-head">
            <div className="pill reveal"><span className="pill-dot" />What I Do</div>
            <h2 className="display reveal">Services</h2>
          </div>
          <ol className="services">
            {services.map((s, i) => (
              <li className="service reveal" key={s.title}>
                <span className="service-num">/{pad(i + 1)}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <span className="service-arrow" aria-hidden="true">↗</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ============ SELECTED WORK ============ */}
        <section className="section" id="work">
          <div className="section-head">
            <div className="pill reveal"><span className="pill-dot" />Selected Work</div>
            <h2 className="display reveal">Case<br /><span className="muted">Studies</span></h2>
          </div>
          <div className="cases">
            {caseStudies.map((c, i) => (
              <article className="case reveal" key={c.title} style={{ top: 90 + i * 24 }}>
                <div className="case-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={c.title} loading="lazy" />
                  <span className="case-index">[{pad(i + 1)}]</span>
                </div>
                <div className="case-body">
                  <div className="case-meta"><span>{c.type}</span><span>Case Study</span></div>
                  <h3 className="case-title">{c.title}</h3>
                  <div className="case-steps">
                    <div><b>Challenge</b><p>{c.challenge}</p></div>
                    <div><b>Approach</b><p>{c.approach}</p></div>
                    <div><b>Result</b><p>{c.result}</p></div>
                  </div>
                  <Tags items={c.tags} />
                  {c.link && (
                    <a className="btn btn-ghost" href={c.link} target="_blank" rel="noopener noreferrer">
                      View Project <span className="arrow">↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="section-head sub">
            <h3 className="display-sm reveal">More workflows</h3>
          </div>
          <div className="projects">
            {projects.map((pr, i) => {
              const inner = (
                <>
                  <div className="project-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pr.image} alt={pr.title} loading="lazy" />
                  </div>
                  <div className="project-body">
                    <span className="idx">[{pad(i + 1)}]</span>
                    <h4>{pr.title}</h4>
                    <p>{pr.desc}</p>
                    <Tags items={pr.tags} />
                  </div>
                </>
              )
              return pr.link ? (
                <a className="project reveal" key={pr.title} href={pr.link} target="_blank" rel="noopener noreferrer">{inner}</a>
              ) : (
                <div className="project reveal" key={pr.title}>{inner}</div>
              )
            })}
          </div>
        </section>

        {/* ============ LIVE PROJECTS ============ */}
        {webProjects.length > 0 && (
          <section className="section" id="live">
            <div className="section-head">
              <div className="pill reveal"><span className="pill-dot" />Live Projects</div>
              <h2 className="display reveal">Shipped<br /><span className="muted">&amp; Live</span></h2>
            </div>
            <div className="sites">
              {webProjects.map((w, i) => {
                let host = w.url
                try { host = new URL(w.url).host } catch {}
                return (
                  <a className={`site reveal${w.featured ? ' featured' : ''}`} key={w.url || w.title} href={w.url} target="_blank" rel="noopener noreferrer">
                    <div className="site-bar">
                      <span className="site-dots"><i /><i /><i /></span>
                      <span className="site-url">{host}</span>
                    </div>
                    <div className="site-shot">
                      {w.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={w.image} alt={`${w.title} screenshot`} loading="lazy" />
                      )}
                    </div>
                    <div className="site-body">
                      <div className="site-meta">
                        <span className="site-cat">{w.category}</span>
                        <span className="idx">[{pad(i + 1)}]</span>
                      </div>
                      <h3>{w.title}</h3>
                      <p>{w.desc}</p>
                      <div className="site-foot">
                        <Tags items={w.tags} />
                        <span className="site-visit">Visit site ↗</span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </section>
        )}

        {/* ============ WHY / SKILLS ============ */}
        <section className="section" id="skills">
          <div className="why reveal">
            <span>Designed to automate.</span>
            <span className="muted">Built to scale.</span>
            <span>Made to deliver.</span>
          </div>
          <div className="skills">
            {skills.map((s, i) => (
              <div className="skill reveal" key={s.group}>
                <span className="skill-num">/{pad(i + 1)}</span>
                <h3>{s.group}</h3>
                <ul>{s.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section className="section" id="testimonials">
          <div className="section-head">
            <div className="pill reveal"><span className="pill-dot" />Hear from the Clients</div>
            <h2 className="display reveal">Kind<br /><span className="muted">Words</span></h2>
          </div>
          <div className="testimonials">
            {testimonials.map((t) => (
              <figure className="testimonial reveal" key={t.quote}>
                <div className="stars" aria-label="5 stars">★★★★★</div>
                <blockquote>{t.quote}</blockquote>
                <figcaption className="who">
                  <span className="avatar">
                    {t.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                  <div><strong>{t.name}</strong><span>{t.company}</span></div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section className="section contact" id="contact">
          <div className="spotlight small" aria-hidden="true" />
          <div className="pill reveal"><span className="pill-dot" />Contact Me</div>
          <h2 className="contact-title reveal">Let&apos;s<br /><span className="outline">Automate</span></h2>
          <div className="contact-grid">
            <div className="contact-info reveal">
              <a className="contact-link" href={`mailto:${p.email}`}>{p.email}</a>
              <a className="contact-link" href={`tel:${p.phone.replace(/\s/g, '')}`}>{p.phone}</a>
              <p className="muted">{p.location}</p>
              <Socials socials={p.socials} />
            </div>
            <ContactForm email={p.email} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {p.fullName}</span>
        <span className="muted">{p.role}</span>
        <Socials socials={p.socials} />
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  )
}

/* Renders everything from data.js — no need to edit this file to update content. */
(function () {
  const D = window.PORTFOLIO;
  const P = D.profile;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = n => String(n).padStart(2, "0");

  /* ---------- simple bindings ---------- */
  $$("[data-bind]").forEach(el => { if (P[el.dataset.bind] != null) el.textContent = P[el.dataset.bind]; });
  $$("[data-bind-src]").forEach(el => (el.src = P[el.dataset.bindSrc]));
  $$("[data-bind-href]").forEach(el => {
    const t = el.dataset.bindHref;
    el.href = t === "mailto" ? `mailto:${P.email}` : `tel:${P.phone.replace(/\s/g, "")}`;
  });
  $("#year").textContent = new Date().getFullYear();
  if (P.resume) { const r = $("[data-resume]"); r.hidden = false; r.href = P.resume; r.setAttribute("download", ""); }

  const socialHTML = Object.entries(P.socials || {})
    .filter(([, url]) => url)
    .map(([name, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(name)} ↗</a>`)
    .join("");
  $$("[data-socials]").forEach(el => (el.innerHTML = socialHTML));

  /* ---------- hero ---------- */
  $("[data-disciplines]").innerHTML = P.disciplines
    .map((d, i) => `<li style="animation-delay:${0.3 + i * 0.12}s">${esc(d)}</li>`).join("");

  $("[data-meters]").innerHTML = P.meters.map(m => `
    <div class="meter">
      <div class="meter-top"><span>${esc(m.label)}</span><span>${m.value}</span></div>
      <div class="meter-bar"><i data-w="${m.value}"></i></div>
    </div>`).join("");
  requestAnimationFrame(() => requestAnimationFrame(() =>
    $$(".meter-bar i").forEach(i => (i.style.width = i.dataset.w + "%"))));

  // highlight carousel
  const H = D.highlights;
  const txt = $("[data-highlight]"), cap = $(".award-caption"), dots = $("[data-dots]");
  dots.innerHTML = H.map((_, i) => `<button aria-label="Slide ${i + 1}"></button>`).join("");
  let cur = 0, timer;
  const fill = () => {
    $(".award-kicker", txt).textContent = H[cur].kicker;
    $(".award-title", txt).textContent = H[cur].title;
    cap.textContent = H[cur].caption;
    txt.classList.remove("swap");
  };
  function show(i, instant) {
    cur = (i + H.length) % H.length;
    if (instant) fill();
    else { txt.classList.add("swap"); setTimeout(fill, 300); }
    $$("button", dots).forEach((b, j) => b.classList.toggle("active", j === cur));
    clearInterval(timer);
    timer = setInterval(() => show(cur + 1), 4000);
  }
  $$("button", dots).forEach((b, i) => b.addEventListener("click", () => show(i)));
  show(0, true);

  /* ---------- marquee ---------- */
  const tools = D.tools.map(t => `<span>${esc(t)}</span>`).join("");
  $("[data-tools]").innerHTML = tools + tools;

  /* ---------- services ---------- */
  $("[data-services]").innerHTML = D.services.map((s, i) => `
    <li class="service reveal">
      <span class="service-num">/${pad(i + 1)}</span>
      <h3 class="service-title">${esc(s.title)}</h3>
      <p class="service-desc">${esc(s.desc)}</p>
      <span class="service-arrow">↗</span>
    </li>`).join("");

  /* ---------- case studies ---------- */
  $("[data-cases]").innerHTML = D.caseStudies.map((c, i) => `
    <article class="case reveal" style="top:${90 + i * 24}px">
      <div class="case-media">
        <img src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy" />
        <span class="case-index">[${pad(i + 1)}]</span>
      </div>
      <div class="case-body">
        <div class="case-meta"><span>${esc(c.type)}</span><span>Case Study</span></div>
        <h3 class="case-title">${esc(c.title)}</h3>
        <div class="case-steps">
          <div><b>Challenge</b><p>${esc(c.challenge)}</p></div>
          <div><b>Approach</b><p>${esc(c.approach)}</p></div>
          <div><b>Result</b><p>${esc(c.result)}</p></div>
        </div>
        <div class="tags">${c.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
        ${c.link ? `<a class="btn btn-ghost" href="${esc(c.link)}" target="_blank" rel="noopener">View Project <span class="arrow">↗</span></a>` : ""}
      </div>
    </article>`).join("");

  /* ---------- projects ---------- */
  $("[data-projects]").innerHTML = D.projects.map((p, i) => {
    const tag = p.link ? "a" : "div";
    const href = p.link ? ` href="${esc(p.link)}" target="_blank" rel="noopener"` : "";
    return `
    <${tag} class="project reveal"${href}>
      <div class="project-media"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" /></div>
      <div class="project-body">
        <span class="idx">[${pad(i + 1)}]</span>
        <h4>${esc(p.title)}</h4>
        <p>${esc(p.desc)}</p>
        <div class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
      </div>
    </${tag}>`;
  }).join("");

  /* ---------- skills ---------- */
  $("[data-skills]").innerHTML = D.skills.map((s, i) => `
    <div class="skill reveal">
      <span class="skill-num">/${pad(i + 1)}</span>
      <h3>${esc(s.group)}</h3>
      <ul>${s.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    </div>`).join("");

  /* ---------- testimonials ---------- */
  $("[data-testimonials]").innerHTML = D.testimonials.map(t => {
    const initials = t.name.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
    return `
    <figure class="testimonial reveal">
      <div class="stars">★★★★★</div>
      <blockquote>${esc(t.quote)}</blockquote>
      <figcaption class="who">
        <span class="avatar">${esc(initials)}</span>
        <div><strong>${esc(t.name)}</strong><span>${esc(t.company)}</span></div>
      </figcaption>
    </figure>`;
  }).join("");

  /* ---------- stats counters ---------- */
  const counts = { services: D.services.length, projects: D.projects.length + D.caseStudies.length, tools: D.tools.length };

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 0.08}s`; io.observe(el); });

  const statIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      $$("[data-count]", e.target).forEach(el => {
        const end = counts[el.dataset.count], t0 = performance.now();
        const step = t => {
          const k = Math.min((t - t0) / 1400, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
      statIO.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  statIO.observe($(".stats"));

  /* ---------- menu ---------- */
  const burger = $("#burger");
  const toggle = open => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    $("#menu").setAttribute("aria-hidden", !open);
  };
  burger.addEventListener("click", () => toggle(!document.body.classList.contains("menu-open")));
  $$("#menu a").forEach(a => a.addEventListener("click", () => toggle(false)));
  document.addEventListener("keydown", e => e.key === "Escape" && toggle(false));

  /* ---------- header + cursor + phone tilt ---------- */
  const header = $(".header");
  const wall = $(".wall"), wallImg = $(".wall-img");
  addEventListener("scroll", () => {
    header.classList.toggle("scrolled", scrollY > 40);
    const r = wall.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) {
      const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -1..1
      wallImg.style.setProperty("--wall-shift", `${k * 40}px`);
    }
  }, { passive: true });

  const glow = $(".cursor-glow"), phone = $("#phone");
  const fine = matchMedia("(pointer: fine)").matches;
  if (fine) {
    addEventListener("mousemove", e => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
      if (scrollY < innerHeight) {
        const x = (e.clientX / innerWidth - 0.5) * 2, y = (e.clientY / innerHeight - 0.5) * 2;
        phone.style.transform = `translateX(-50%) rotateZ(${10 - x * 4}deg) rotateY(${-14 + x * 12}deg) rotateX(${6 - y * 8}deg)`;
      }
    }, { passive: true });
  } else glow.remove();

  /* ---------- contact form (opens email app) ---------- */
  $("#contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = f.get("subject") || `New project inquiry from ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    location.href = `mailto:${P.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();

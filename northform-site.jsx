import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight,
  Loader2, CheckCircle2, ArrowDown
} from "lucide-react";

/* ----------------------------------------------------------------
   DATA
---------------------------------------------------------------- */
const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "studio", label: "Studio" },
  { id: "process", label: "Process" },
  { id: "journal", label: "Journal" },
  { id: "contact", label: "Contact" },
];

const WORK_PROJECTS = [
  { name: "Birchwood Pavilion", cat: "Residential", year: "2025", tone: "linear-gradient(135deg,#3F6C51,#2B4B39)" },
  { name: "Alder & Stone Offices", cat: "Workplace", year: "2024", tone: "linear-gradient(135deg,#8A7A5C,#5C513B)" },
  { name: "Cove Line Gallery", cat: "Cultural", year: "2024", tone: "linear-gradient(135deg,#4C6B7A,#31485A)" },
  { name: "Harrow Market Hall", cat: "Civic", year: "2023", tone: "linear-gradient(135deg,#6B5B95,#463C63)" },
  { name: "Thistle Row Housing", cat: "Residential", year: "2023", tone: "linear-gradient(135deg,#3F6C51,#79996A)" },
  { name: "Fen Bridge Studio", cat: "Workplace", year: "2022", tone: "linear-gradient(135deg,#8A7A5C,#B7A87F)" },
];

const PROCESS_STEPS = [
  { n: "01", title: "Listen", body: "We start on site — reading the light, the neighbours, and the brief behind the brief." },
  { n: "02", title: "Frame", body: "Concepts are tested against budget, code, and daylight before a single line is finalised." },
  { n: "03", title: "Build", body: "Weekly site walks and shop-drawing reviews keep intent intact through construction." },
  { n: "04", title: "Hand over", body: "We deliver a maintenance guide, not just a key — buildings we design get lived in well." },
];

const CASE_STUDIES_ALL = [
  { title: "Passive cooling without mechanical air", tag: "Research", read: "6 min" },
  { title: "Reworking a 1970s civic hall for daylight", tag: "Retrofit", read: "9 min" },
  { title: "What a housing site teaches about privacy", tag: "Residential", read: "5 min" },
  { title: "Timber over concrete: a carbon comparison", tag: "Materials", read: "7 min" },
  { title: "Designing entries people actually use", tag: "Workplace", read: "4 min" },
  { title: "Courtyards as climate control", tag: "Research", read: "8 min" },
  { title: "The cost of skipping a site survey", tag: "Process", read: "5 min" },
  { title: "Acoustics in open-plan schools", tag: "Civic", read: "6 min" },
  { title: "Why we mock up every stair rail", tag: "Process", read: "3 min" },
];

const PROJECT_TYPES = ["Residential", "Workplace", "Cultural / Civic", "Not sure yet"];

/* ----------------------------------------------------------------
   HOOK: reveal-on-scroll
---------------------------------------------------------------- */
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, inView] = useReveal();
  return (
    <div
      ref={ref}
      className={`nf-reveal ${inView ? "nf-reveal-in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------
   NAV
---------------------------------------------------------------- */
function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`nf-nav ${scrolled ? "nf-nav-scrolled" : ""}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button className="nf-logo" onClick={() => handleNav("top")}>
            NORTHFORM
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button key={l.id} className="nf-navlink" onClick={() => handleNav(l.id)}>
                {l.label}
              </button>
            ))}
          </nav>

          <button className="nf-cta hidden md:inline-flex" onClick={() => handleNav("contact")}>
            Start a project <ArrowUpRight size={15} />
          </button>

          <button
            className="nf-menu-btn md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`nf-mobile-menu md:hidden ${open ? "nf-mobile-open" : ""}`}>
        <div className="flex flex-col px-5 pb-6 pt-1">
          {NAV_LINKS.map((l) => (
            <button key={l.id} className="nf-mobile-link" onClick={() => handleNav(l.id)}>
              {l.label}
            </button>
          ))}
          <button className="nf-cta justify-center mt-3" onClick={() => handleNav("contact")}>
            Start a project <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------
   HERO
---------------------------------------------------------------- */
function Hero() {
  return (
    <section id="top" className="nf-hero">
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-32 pb-20 md:pt-44 md:pb-28">
        <Reveal>
          <div className="nf-eyebrow mb-5">Architecture &amp; Interiors — Est. 2011</div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="nf-h1 max-w-3xl">
            Buildings shaped by how light actually falls, not how it looks in a render.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="nf-lead max-w-xl mt-6">
            Northform is a fourteen-person studio working across residential, workplace and
            civic projects. We design in section first, and we still visit every site by foot.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="flex flex-wrap items-center gap-4 mt-9">
            <button className="nf-cta" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
              View selected work <ArrowRight size={16} />
            </button>
            <button className="nf-cta-ghost" onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}>
              Our process
            </button>
          </div>
        </Reveal>
      </div>
      <div className="nf-hero-scroll">
        <ArrowDown size={16} />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   WORK SLIDER
---------------------------------------------------------------- */
function WorkSlider() {
  const trackRef = useRef(null);

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".nf-work-card");
    const cardWidth = card ? card.offsetWidth + 20 : 320;
    track.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <section id="work" className="nf-section">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <div className="nf-eyebrow mb-3">Selected work</div>
              <h2 className="nf-h2">Six projects, four typologies.</h2>
            </div>
            <div className="hidden sm:flex gap-2">
              <button className="nf-arrow-btn" onClick={() => scrollByCard(-1)} aria-label="Previous project">
                <ChevronLeft size={18} />
              </button>
              <button className="nf-arrow-btn" onClick={() => scrollByCard(1)} aria-label="Next project">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="nf-slider-track" ref={trackRef}>
        <div className="flex gap-5 px-5 md:px-8 max-w-6xl mx-auto md:pl-[calc((100vw-72rem)/2+2rem)]">
          {WORK_PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 60} className="nf-work-card-wrap">
              <article className="nf-work-card">
                <div className="nf-work-thumb" style={{ background: p.tone }}>
                  <span className="nf-work-year">{p.year}</span>
                </div>
                <div className="pt-4">
                  <div className="nf-work-cat">{p.cat}</div>
                  <div className="nf-work-name">{p.name}</div>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="shrink-0 w-1 md:w-8" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   PROCESS
---------------------------------------------------------------- */
function Process() {
  return (
    <section id="process" className="nf-section nf-section-tint">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="nf-eyebrow mb-3">How we work</div>
          <h2 className="nf-h2 mb-12 md:mb-16">Four stages, same team throughout.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="nf-process-step">
                <div className="nf-process-n">{s.n}</div>
                <div className="nf-process-title">{s.title}</div>
                <p className="nf-process-body">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   JOURNAL — dynamic content loading
---------------------------------------------------------------- */
function Journal() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + 3, CASE_STUDIES_ALL.length));
      setLoading(false);
    }, 850);
  };

  const items = CASE_STUDIES_ALL.slice(0, visibleCount);
  const exhausted = visibleCount >= CASE_STUDIES_ALL.length;

  return (
    <section id="journal" className="nf-section">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="nf-eyebrow mb-3">From the journal</div>
          <h2 className="nf-h2 mb-10 md:mb-12">Notes from the studio floor.</h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 70}>
              <article className="nf-journal-card">
                <div className="nf-journal-tag">{c.tag}</div>
                <h3 className="nf-journal-title">{c.title}</h3>
                <div className="nf-journal-meta">{c.read} read</div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          {!exhausted ? (
            <button className="nf-cta-ghost" onClick={loadMore} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Loading
                </>
              ) : (
                <>Load more notes</>
              )}
            </button>
          ) : (
            <div className="nf-eyebrow opacity-60">— That's everything for now —</div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   CONTACT — client-side validation
---------------------------------------------------------------- */
function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Enter your name.";
  if (!fields.email.trim()) {
    errors.email = "Enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.type) errors.type = "Choose a project type.";
  if (!fields.message.trim()) {
    errors.message = "Tell us a little about the project.";
  } else if (fields.message.trim().length < 20) {
    errors.message = "A few more details would help — 20 characters minimum.";
  }
  return errors;
}

function Contact() {
  const [fields, setFields] = useState({ name: "", email: "", type: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (key) => (e) => {
    const value = e.target.value;
    setFields((f) => ({ ...f, [key]: value }));
    if (touched[key]) {
      setErrors((prev) => ({ ...validate({ ...fields, [key]: value }) }));
    }
  };

  const onBlur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(fields));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, type: true, message: true });
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="nf-section nf-section-tint">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="nf-success">
              <CheckCircle2 size={30} />
              <h2 className="nf-h2 mt-4">Message sent.</h2>
              <p className="nf-lead mt-2 max-w-md">
                Thanks, {fields.name.split(" ")[0]} — we read every enquiry personally and
                reply within two working days.
              </p>
              <button
                className="nf-cta-ghost mt-6"
                onClick={() => {
                  setSubmitted(false);
                  setFields({ name: "", email: "", type: "", message: "" });
                  setTouched({});
                  setErrors({});
                }}
              >
                Send another message
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="nf-section nf-section-tint">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <Reveal>
            <div className="nf-eyebrow mb-3">Start a project</div>
            <h2 className="nf-h2 mb-5">Tell us what you're building.</h2>
            <p className="nf-lead max-w-sm">
              We take on eight to ten new projects a year. Share a few details and we'll
              follow up to arrange a call.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
              <div className="nf-field">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  value={fields.name}
                  onChange={onChange("name")}
                  onBlur={onBlur("name")}
                  className={errors.name && touched.name ? "nf-invalid" : ""}
                  placeholder="Jordan Ellis"
                />
                {errors.name && touched.name && <span className="nf-field-error">{errors.name}</span>}
              </div>

              <div className="nf-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={fields.email}
                  onChange={onChange("email")}
                  onBlur={onBlur("email")}
                  className={errors.email && touched.email ? "nf-invalid" : ""}
                  placeholder="jordan@studio.com"
                />
                {errors.email && touched.email && <span className="nf-field-error">{errors.email}</span>}
              </div>

              <div className="nf-field">
                <label htmlFor="type">Project type</label>
                <select
                  id="type"
                  value={fields.type}
                  onChange={onChange("type")}
                  onBlur={onBlur("type")}
                  className={errors.type && touched.type ? "nf-invalid" : ""}
                >
                  <option value="">Select one</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.type && touched.type && <span className="nf-field-error">{errors.type}</span>}
              </div>

              <div className="nf-field">
                <label htmlFor="message">Project details</label>
                <textarea
                  id="message"
                  rows={4}
                  value={fields.message}
                  onChange={onChange("message")}
                  onBlur={onBlur("message")}
                  className={errors.message && touched.message ? "nf-invalid" : ""}
                  placeholder="Site, scope, rough timeline — whatever you have."
                />
                {errors.message && touched.message && <span className="nf-field-error">{errors.message}</span>}
              </div>

              <button type="submit" className="nf-cta justify-center mt-2">
                Send message <ArrowRight size={16} />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   FOOTER
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="nf-footer">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-1">
            <div className="nf-logo mb-3">NORTHFORM</div>
            <p className="nf-footer-note">Architecture &amp; interiors, since 2011.</p>
          </div>
          <div>
            <div className="nf-footer-head">Studio</div>
            <div className="nf-footer-link">Work</div>
            <div className="nf-footer-link">Process</div>
            <div className="nf-footer-link">Journal</div>
          </div>
          <div>
            <div className="nf-footer-head">Studio HQ</div>
            <div className="nf-footer-link">14 Barrow Lane</div>
            <div className="nf-footer-link">Leeds, UK</div>
          </div>
          <div>
            <div className="nf-footer-head">Connect</div>
            <div className="nf-footer-link">hello@northform.studio</div>
            <div className="nf-footer-link">Instagram</div>
          </div>
        </div>
        <div className="nf-footer-bottom">© {new Date().getFullYear()} Northform Studio. All rights reserved.</div>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------
   ROOT
---------------------------------------------------------------- */
export default function NorthformSite() {
  return (
    <div className="nf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .nf-root{
          --ink:#14181C;
          --ink-soft:#4A5058;
          --paper:#F6F5F1;
          --paper-alt:#EFEDE5;
          --accent:#3F6C51;
          --accent-dark:#2B4B39;
          --accent-soft:rgba(63,108,81,0.10);
          --sand:#D9D2C2;
          --line:rgba(20,24,28,0.12);
          --alert:#B6432D;
          background:var(--paper);
          color:var(--ink);
          font-family:'Inter', sans-serif;
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .nf-root *{ box-sizing:border-box; }

        @media (prefers-reduced-motion: reduce){
          .nf-root *{ animation-duration:.001ms !important; transition-duration:.001ms !important; }
        }

        /* ---- type ---- */
        .nf-eyebrow{ font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:2.5px; text-transform:uppercase; color:var(--accent); }
        .nf-h1{ font-family:'Bricolage Grotesque', sans-serif; font-weight:600; font-size:clamp(2.1rem, 5vw, 3.6rem); line-height:1.08; letter-spacing:-0.5px; color:var(--ink); }
        .nf-h2{ font-family:'Bricolage Grotesque', sans-serif; font-weight:600; font-size:clamp(1.5rem, 3vw, 2.1rem); line-height:1.18; letter-spacing:-0.3px; color:var(--ink); }
        .nf-lead{ font-size:16px; line-height:1.65; color:var(--ink-soft); }

        /* ---- nav ---- */
        .nf-nav{ position:sticky; top:0; z-index:50; background:rgba(246,245,241,0.7); backdrop-filter:blur(10px); border-bottom:1px solid transparent; transition:all .3s ease; }
        .nf-nav-scrolled{ background:rgba(246,245,241,0.92); border-bottom-color:var(--line); }
        .nf-logo{ background:none; border:none; cursor:pointer; font-family:'Bricolage Grotesque', sans-serif; font-weight:700; font-size:16px; letter-spacing:0.5px; color:var(--ink); padding:0; }
        .nf-navlink{ background:none; border:none; cursor:pointer; font-size:13.5px; font-weight:500; color:var(--ink-soft); padding:4px 0; position:relative; transition:color .2s ease; }
        .nf-navlink::after{ content:''; position:absolute; left:0; right:0; bottom:0; height:1.5px; background:var(--accent); transform:scaleX(0); transform-origin:left; transition:transform .25s ease; }
        .nf-navlink:hover{ color:var(--ink); }
        .nf-navlink:hover::after{ transform:scaleX(1); }

        .nf-cta{ display:inline-flex; align-items:center; gap:7px; background:var(--ink); color:var(--paper); font-size:13.5px; font-weight:600; padding:11px 20px; border-radius:100px; border:none; cursor:pointer; transition:background .2s ease, transform .15s ease; }
        .nf-cta:hover{ background:var(--accent-dark); }
        .nf-cta:active{ transform:scale(0.97); }
        .nf-cta:disabled{ opacity:.55; cursor:not-allowed; }

        .nf-cta-ghost{ display:inline-flex; align-items:center; gap:7px; background:transparent; color:var(--ink); font-size:13.5px; font-weight:600; padding:11px 20px; border-radius:100px; border:1px solid var(--line); cursor:pointer; transition:border-color .2s ease, background .2s ease; }
        .nf-cta-ghost:hover{ border-color:var(--accent); background:var(--accent-soft); }
        .nf-cta-ghost:disabled{ opacity:.6; cursor:not-allowed; }

        .nf-menu-btn{ background:none; border:none; cursor:pointer; color:var(--ink); padding:4px; }

        .nf-mobile-menu{ max-height:0; overflow:hidden; transition:max-height .35s ease; background:var(--paper); border-bottom:1px solid transparent; }
        .nf-mobile-open{ max-height:340px; border-bottom-color:var(--line); }
        .nf-mobile-link{ background:none; border:none; text-align:left; cursor:pointer; font-size:16px; font-weight:500; color:var(--ink); padding:12px 2px; border-bottom:1px solid var(--line); }

        /* ---- hero ---- */
        .nf-hero{ position:relative; }
        .nf-hero-scroll{ display:flex; justify-content:center; padding-bottom:28px; color:var(--ink-soft); animation:nf-bob 2.2s ease-in-out infinite; }
        @keyframes nf-bob{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(6px); } }

        /* ---- sections ---- */
        .nf-section{ padding:72px 0; }
        .nf-section-tint{ background:var(--paper-alt); }

        /* ---- reveal ---- */
        .nf-reveal{ opacity:0; transform:translateY(22px); transition:opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .nf-reveal-in{ opacity:1; transform:translateY(0); }

        /* ---- work slider ---- */
        .nf-slider-track{ overflow-x:auto; scroll-snap-type:x proximity; padding-bottom:6px; -webkit-overflow-scrolling:touch; }
        .nf-slider-track::-webkit-scrollbar{ height:0; }
        .nf-work-card-wrap{ scroll-snap-align:start; flex-shrink:0; width:78vw; max-width:320px; }
        .nf-work-card{ display:block; }
        .nf-work-thumb{ aspect-ratio:4/3; border-radius:14px; position:relative; overflow:hidden; }
        .nf-work-year{ position:absolute; bottom:12px; left:14px; font-family:'JetBrains Mono', monospace; font-size:11px; color:rgba(255,255,255,0.85); letter-spacing:1px; }
        .nf-work-cat{ font-family:'JetBrains Mono', monospace; font-size:10.5px; letter-spacing:1.5px; text-transform:uppercase; color:var(--accent); margin-bottom:4px; }
        .nf-work-name{ font-family:'Bricolage Grotesque', sans-serif; font-weight:600; font-size:17px; color:var(--ink); }
        .nf-arrow-btn{ width:38px; height:38px; border-radius:50%; border:1px solid var(--line); background:var(--paper); color:var(--ink); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:border-color .2s ease, background .2s ease; }
        .nf-arrow-btn:hover{ border-color:var(--accent); background:var(--accent-soft); }

        /* ---- process ---- */
        .nf-process-step{ border-top:1px solid var(--line); padding-top:18px; }
        .nf-process-n{ font-family:'JetBrains Mono', monospace; font-size:12px; color:var(--accent); letter-spacing:1px; margin-bottom:14px; }
        .nf-process-title{ font-family:'Bricolage Grotesque', sans-serif; font-weight:600; font-size:19px; margin-bottom:8px; }
        .nf-process-body{ font-size:14px; line-height:1.6; color:var(--ink-soft); }

        /* ---- journal ---- */
        .nf-journal-card{ background:var(--paper); border:1px solid var(--line); border-radius:14px; padding:20px; height:100%; transition:border-color .2s ease, transform .2s ease; }
        .nf-journal-card:hover{ border-color:var(--accent); transform:translateY(-3px); }
        .nf-journal-tag{ font-family:'JetBrains Mono', monospace; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:var(--accent); margin-bottom:10px; }
        .nf-journal-title{ font-family:'Bricolage Grotesque', sans-serif; font-weight:600; font-size:16px; line-height:1.35; margin-bottom:14px; }
        .nf-journal-meta{ font-size:12px; color:var(--ink-soft); }

        /* ---- contact ---- */
        .nf-field{ display:flex; flex-direction:column; gap:6px; }
        .nf-field label{ font-size:12.5px; font-weight:600; color:var(--ink); }
        .nf-field input, .nf-field select, .nf-field textarea{
          font-family:'Inter', sans-serif; font-size:14px; color:var(--ink);
          background:var(--paper); border:1px solid var(--line); border-radius:10px; padding:11px 13px;
          outline:none; transition:border-color .2s ease, box-shadow .2s ease; resize:vertical;
        }
        .nf-field input:focus, .nf-field select:focus, .nf-field textarea:focus{ border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-soft); }
        .nf-invalid{ border-color:var(--alert) !important; box-shadow:0 0 0 3px rgba(182,67,45,0.12) !important; }
        .nf-field-error{ font-size:12px; color:var(--alert); }
        .nf-success{ display:flex; flex-direction:column; align-items:flex-start; color:var(--accent-dark); padding:20px 0 40px; }

        /* ---- footer ---- */
        .nf-footer{ background:var(--ink); color:var(--paper); }
        .nf-footer-note{ font-size:13px; color:rgba(246,245,241,0.6); }
        .nf-footer-head{ font-family:'JetBrains Mono', monospace; font-size:10.5px; letter-spacing:1.5px; text-transform:uppercase; color:rgba(246,245,241,0.5); margin-bottom:12px; }
        .nf-footer-link{ font-size:13.5px; color:rgba(246,245,241,0.85); margin-bottom:8px; }
        .nf-footer-bottom{ border-top:1px solid rgba(246,245,241,0.12); margin-top:36px; padding-top:20px; font-size:12px; color:rgba(246,245,241,0.45); }
      `}</style>

      <NavBar />
      <Hero />
      <WorkSlider />
      <Process />
      <Journal />
      <Contact />
      <Footer />
    </div>
  );
}

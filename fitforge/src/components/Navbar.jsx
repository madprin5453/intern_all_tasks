import React, { useEffect, useState } from "react";
import { Menu, X, Flame } from "lucide-react";

const LINKS = [
  { id: "workouts", label: "Workouts" },
  { id: "dashboard", label: "Dashboard" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Stories" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-carbon/90 backdrop-blur-md border-b border-carbon-border" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <button onClick={() => go("top")} className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-ember flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
            <Flame size={16} className="text-carbon" fill="#14120F" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-bone">FitForge</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-sm text-bone-muted hover:text-bone transition-colors relative nav-underline"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <button onClick={() => go("contact")} className="btn-primary text-sm px-5 py-2.5">
            Get started
          </button>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-bone"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile overlay panel */}
      <div
        className={`md:hidden fixed inset-0 top-16 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
        <nav
          id="mobile-menu"
          className={`relative bg-carbon-light border-b border-carbon-border px-6 py-6 flex flex-col gap-1 transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-left py-3 text-base text-bone border-b border-carbon-border last:border-0"
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => go("contact")} className="btn-primary text-sm mt-5 w-full justify-center">
            Get started
          </button>
        </nav>
      </div>
    </header>
  );
}

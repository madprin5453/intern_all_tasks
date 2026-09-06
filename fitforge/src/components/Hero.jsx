import React, { useEffect, useState } from "react";
import { ArrowRight, PlayCircle } from "lucide-react";

const STATS = [
  { target: 48000, suffix: "+", label: "Workouts logged" },
  { target: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
  { target: 120, suffix: "+", label: "Programs available" },
];

function useCountUp(target, active, decimals = 0, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    let frame;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);
  return value.toFixed(decimals);
}

function Stat({ stat, active }) {
  const display = useCountUp(stat.target, active, stat.decimals || 0);
  return (
    <div>
      <p className="font-display text-3xl md:text-4xl font-bold text-bone">
        {Number(display).toLocaleString()}
        <span className="text-ember">{stat.suffix}</span>
      </p>
      <p className="text-sm text-bone-muted mt-1">{stat.label}</p>
    </div>
  );
}

export default function Hero() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLive(true), 80);
    return () => clearTimeout(t);
  }, []);

  const stagger = (i) => ({
    transitionDelay: `${i * 110}ms`,
    opacity: live ? 1 : 0,
    transform: live ? "translateY(0)" : "translateY(20px)",
    transition: "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
  });

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="top"
      className="relative pt-32 pb-20 md:pt-48 md:pb-28 px-6 md:px-10 overflow-hidden"
    >
      {/* subtle background grid, purely decorative */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#F5F1EA 1px, transparent 1px), linear-gradient(90deg, #F5F1EA 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(circle at 30% 20%, black, transparent 70%)",
        }}
      />
      <div
        className="absolute -top-32 right-[-10%] w-[540px] h-[540px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,90,54,0.16), transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <p style={stagger(0)} className="text-sm text-ember font-medium mb-5 tracking-wide">
          Training built around your data, not a generic plan
        </p>
        <h1
          className="font-display font-bold text-bone leading-[1.05]"
          style={{ ...stagger(1), fontSize: "clamp(2.6rem, 6vw, 4.6rem)" }}
        >
          Every rep, tracked.
          <br />
          Every plateau, explained.
        </h1>
        <p style={stagger(2)} className="mt-6 max-w-xl text-base md:text-lg text-bone-muted">
          FitForge pairs a coached workout library with a dashboard that
          actually explains your progress, so you always know what to do
          next and why it's working.
        </p>

        <div style={stagger(3)} className="mt-9 flex flex-wrap items-center gap-4">
          <button onClick={() => go("workouts")} className="btn-primary">
            Browse workouts <ArrowRight size={16} />
          </button>
          <button onClick={() => go("dashboard")} className="btn-ghost">
            <PlayCircle size={18} /> See the dashboard
          </button>
        </div>

        <div style={stagger(4)} className="mt-16 grid grid-cols-3 gap-6 max-w-lg border-t border-carbon-border pt-8">
          {STATS.map((s) => (
            <Stat key={s.label} stat={s} active={live} />
          ))}
        </div>
      </div>
    </section>
  );
}

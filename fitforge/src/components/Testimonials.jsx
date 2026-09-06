import React, { useEffect, useRef, useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "../data/testimonials";

const INTERVAL = 5500;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const clamp = (i) => (i + TESTIMONIALS.length) % TESTIMONIALS.length;
  const next = () => setIndex((i) => clamp(i + 1));
  const prev = () => setIndex((i) => clamp(i - 1));

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIndex((i) => clamp(i + 1)), INTERVAL);
    return () => clearInterval(timer.current);
  }, [paused]);

  const active = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="py-20 md:py-28 px-6 md:px-10 bg-carbon-light/40">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-bone mb-12">
          Members training with FitForge
        </h2>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative bg-carbon-light border border-carbon-border rounded-2xl p-8 md:p-12"
        >
          <div key={active.id} className="animate-fade-in">
            <div className="flex justify-center gap-1 mb-5" aria-label={`${active.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < active.rating ? "text-brass" : "text-carbon-lighter"}
                  fill={i < active.rating ? "#C9A227" : "transparent"}
                />
              ))}
            </div>
            <p className="text-lg md:text-xl text-bone leading-relaxed font-display">
              "{active.quote}"
            </p>
            <p className="mt-6 text-sm text-bone-muted">
              <span className="text-bone font-medium">{active.name}</span> · {active.role}
            </p>
          </div>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-5 icon-btn"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-5 icon-btn"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1} from ${t.name}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === index ? "24px" : "8px", background: i === index ? "#FF5A36" : "#332F28" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

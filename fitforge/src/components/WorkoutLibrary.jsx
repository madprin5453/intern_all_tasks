import React, { useMemo, useState } from "react";
import { Clock, Gauge, ChevronRight } from "lucide-react";
import { WORKOUTS, CATEGORIES } from "../data/workouts";
import WorkoutModal from "./WorkoutModal";

const DIFFICULTY_COLOR = {
  Beginner: "text-success",
  Intermediate: "text-brass",
  Advanced: "text-ember",
};

export default function WorkoutLibrary() {
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(6);
  const [active, setActive] = useState(null);

  const filtered = useMemo(
    () => WORKOUTS.filter((w) => category === "All" || w.category === category),
    [category]
  );
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const changeCategory = (c) => {
    setCategory(c);
    setVisible(6);
  };

  return (
    <section id="workouts" className="py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-bone">Workout library</h2>
            <p className="text-bone-muted mt-2 max-w-md">
              Filter by goal, check the details, and add a session to your
              plan in a couple of taps.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => changeCategory(c)}
              className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                category === c
                  ? "bg-ember border-ember text-carbon font-medium"
                  : "border-carbon-border text-bone-muted hover:text-bone hover:border-bone-dim"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((w) => (
            <button
              key={w.id}
              onClick={() => setActive(w)}
              className="workout-card text-left bg-carbon-light border border-carbon-border rounded-2xl p-6 hover:border-ember/50 transition-colors group"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-carbon-lighter text-bone-muted">
                  {w.category}
                </span>
                <ChevronRight size={16} className="text-bone-dim group-hover:text-ember group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-bone mt-4">{w.name}</h3>
              <p className="text-sm text-bone-muted mt-2 line-clamp-2">{w.description}</p>
              <div className="flex items-center gap-4 mt-5 pt-5 border-t border-carbon-border">
                <span className="flex items-center gap-1.5 text-xs text-bone-muted">
                  <Clock size={13} /> {w.duration} min
                </span>
                <span className={`flex items-center gap-1.5 text-xs ${DIFFICULTY_COLOR[w.difficulty]}`}>
                  <Gauge size={13} /> {w.difficulty}
                </span>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-16 text-bone-muted">No workouts in this category yet.</p>
        )}

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button onClick={() => setVisible((v) => v + 6)} className="btn-ghost">
              Show more workouts
            </button>
          </div>
        )}
      </div>

      {active && <WorkoutModal workout={active} onClose={() => setActive(null)} />}
    </section>
  );
}

import React, { useEffect, useRef } from "react";
import { X, Clock, Gauge, Dumbbell } from "lucide-react";

export default function WorkoutModal({ workout, onClose }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Simple focus trap within the modal panel.
  const onKeyDown = (e) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
      onMouseDown={onBackdropClick}
      role="presentation"
    >
      <div
        ref={panelRef}
        onKeyDown={onKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="workout-modal-title"
        className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto scroll-thin bg-carbon-light border border-carbon-border rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 animate-scale-in"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close workout details"
          className="absolute top-5 right-5 text-bone-muted hover:text-bone transition-colors"
        >
          <X size={20} />
        </button>

        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-ember/15 text-ember-light">
          {workout.category}
        </span>
        <h3 id="workout-modal-title" className="font-display text-2xl font-bold text-bone mt-4">
          {workout.name}
        </h3>
        <p className="text-bone-muted mt-3 leading-relaxed">{workout.description}</p>

        <div className="grid grid-cols-3 gap-4 mt-6 py-5 border-y border-carbon-border">
          <div className="flex flex-col items-start gap-1.5">
            <Clock size={16} className="text-ember" />
            <span className="text-sm text-bone">{workout.duration} min</span>
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <Gauge size={16} className="text-ember" />
            <span className="text-sm text-bone">{workout.difficulty}</span>
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <Dumbbell size={16} className="text-ember" />
            <span className="text-sm text-bone">{workout.equipment}</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-bone mb-2">Muscles worked</p>
          <div className="flex flex-wrap gap-2">
            {workout.muscles.map((m) => (
              <span key={m} className="text-xs px-2.5 py-1 rounded-full bg-carbon-lighter text-bone-muted">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-bone mb-3">Session breakdown</p>
          <ol className="space-y-2.5">
            {workout.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-bone-muted">
                <span className="shrink-0 w-5 h-5 rounded-full bg-carbon-lighter text-bone flex items-center justify-center text-xs font-medium">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <button onClick={onClose} className="btn-primary w-full justify-center mt-8">
          Add to my plan
        </button>
      </div>
    </div>
  );
}

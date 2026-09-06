import React, { useState } from "react";
import { Check } from "lucide-react";
import { PLANS } from "../data/pricing";
import { useToast } from "../context/ToastContext";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const { notify } = useToast();

  const choose = (plan) => {
    notify(`${plan.name} plan selected. We'll take you to checkout next.`, "info");
  };

  return (
    <section id="pricing" className="py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-bone">Plans that scale with you</h2>
          <p className="text-bone-muted mt-3">
            Start free, upgrade when the library and dashboard earn a spot in
            your routine.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm ${!annual ? "text-bone" : "text-bone-muted"}`}>Monthly</span>
          <button
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            onClick={() => setAnnual((a) => !a)}
            className="w-12 h-7 rounded-full bg-carbon-lighter border border-carbon-border relative transition-colors"
          >
            <span
              className="absolute top-0.5 left-0.5 rounded-full bg-ember transition-transform"
              style={{ width: "1.35rem", height: "1.35rem", transform: annual ? "translateX(20px)" : "translateX(0)" }}
            />
          </button>
          <span className={`text-sm ${annual ? "text-bone" : "text-bone-muted"}`}>
            Annual <span className="text-success">· save 20%</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => {
            const price = annual ? plan.annual : plan.monthly;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl p-7 border transition-transform hover:-translate-y-1 ${
                  plan.recommended
                    ? "bg-carbon-light border-brass shadow-glow-brass"
                    : "bg-carbon-light border-carbon-border"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-7 text-xs font-medium px-3 py-1 rounded-full bg-brass text-carbon">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-bone">{plan.name}</h3>
                <p className="text-sm text-bone-muted mt-1">{plan.tagline}</p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="font-display text-4xl font-bold text-bone">${price}</span>
                  <span className="text-bone-muted text-sm mb-1">/month</span>
                </div>

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-bone-muted">
                      <Check size={16} className={plan.recommended ? "text-brass shrink-0 mt-0.5" : "text-ember shrink-0 mt-0.5"} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => choose(plan)}
                  className={plan.recommended ? "btn-primary w-full justify-center mt-8" : "btn-ghost w-full justify-center mt-8"}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

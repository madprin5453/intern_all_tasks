import React from "react";
import { Flame, Camera, MessageCircle, Play } from "lucide-react";

const COLUMNS = [
  {
    title: "Train",
    links: ["Workout library", "Dashboard", "Programs", "Coaching"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press"],
  },
  {
    title: "Support",
    links: ["Help centre", "Contact", "Membership"],
  },
];

export default function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer className="border-t border-carbon-border px-6 md:px-10 pt-14 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-10 pb-12">
          <div className="md:col-span-2">
            <button onClick={() => go("top")} className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-ember flex items-center justify-center">
                <Flame size={16} className="text-carbon" fill="#14120F" />
              </span>
              <span className="font-display font-bold text-lg text-bone">FitForge</span>
            </button>
            <p className="text-sm text-bone-muted max-w-xs">
              A coached workout library and progress dashboard for people who
              want to know why their training is working.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Camera, MessageCircle, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Social link"
                  className="w-9 h-9 rounded-full border border-carbon-border flex items-center justify-center text-bone-muted hover:text-bone hover:border-bone-dim transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium text-bone mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-bone-muted hover:text-bone transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-carbon-border">
          <p className="text-xs text-bone-dim">© {new Date().getFullYear()} FitForge, Inc. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-bone-dim">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-bone-muted transition-colors">
              Privacy
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-bone-muted transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

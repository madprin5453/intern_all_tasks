# FitForge

A coached workout library and performance dashboard, built as a modern,
production-shaped marketing + product site. Dark premium UI, fully responsive,
and interactive throughout — filtering, modals, charts, sliders, toasts, and
two validated forms.

## Features

- **Modern dark UI** — a graphite/ember/brass palette with Sora display type
  and Inter body text, not the default AI-generated look.
- **Fully responsive** — from 360px phones to wide desktop, with a dedicated
  mobile navigation overlay.
- **Responsive hamburger navigation** — scroll-aware background, slide-in
  mobile panel, closes on `Escape` or backdrop click, locks body scroll while open.
- **Smooth, purposeful animation** — a single staggered hero entrance with
  animated stat counters, plus restrained hover/focus transitions elsewhere.
  Respects `prefers-reduced-motion`.
- **Dynamic workout library** — 12 workouts across 5 categories, filterable,
  paginated with "show more."
- **Interactive workout detail modal** — equipment, difficulty, muscles worked,
  and a step-by-step breakdown. Focus-trapped, closes on `Escape`, restores
  focus to the trigger.
- **Performance dashboard** — two `recharts` visualisations (weekly training
  minutes, sessions by type) plus four stat cards.
- **Interactive pricing** — monthly/annual toggle with a highlighted
  recommended plan.
- **Auto-advancing testimonial slider** — pauses on hover, manual arrows and
  dot navigation.
- **Contact form** — name, email, goal, and message, with full client-side
  validation (inline errors, blur + submit validation) and toast feedback.
- **Newsletter signup** — separate validated email capture with its own toast.
- **Toast notification system** — a small context/hook (`useToast`) used by
  both forms and the pricing section, with success/error/info styles and an
  ARIA live region.
- **Accessibility considerations** — visible focus rings everywhere, modal
  focus trap, `aria-*` attributes on interactive controls, reduced-motion
  support, semantic form labelling.
- **Vite + React** — fast dev server, small production build.

## Project structure

```
fitforge/
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css              # Tailwind layers, fonts, focus rings, reduced motion
    ├── context/
    │   └── ToastContext.jsx   # Toast provider + useToast hook
    ├── data/
    │   ├── workouts.js
    │   ├── testimonials.js
    │   └── pricing.js
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── WorkoutLibrary.jsx
        ├── WorkoutModal.jsx
        ├── Dashboard.jsx
        ├── Pricing.jsx
        ├── Testimonials.jsx
        ├── Contact.jsx
        ├── Newsletter.jsx
        └── Footer.jsx
```

## Getting started

Requires Node.js 18 or later.

```bash
# install dependencies
npm install

# start the dev server (usually http://localhost:5173)
npm run dev

# lint the source
npm run lint

# build for production (outputs to dist/)
npm run build

# preview the production build locally
npm run preview
```

## Notes on the data

Workouts, testimonials, pricing, and the dashboard numbers are static sample
data in `src/data/` and inline in `Dashboard.jsx`. The contact form and
newsletter signup simulate a network request with `setTimeout` and show a
toast; there is no backend wired up. To connect a real API:

1. Replace the `setTimeout` blocks in `Contact.jsx` and `Newsletter.jsx` with
   a real `fetch`/`axios` call.
2. Swap the arrays in `src/data/` for data fetched from your API or CMS.
3. Feed `Dashboard.jsx` with a real per-user analytics endpoint instead of the
   `WEEKLY_LOAD` / `SESSIONS_BY_TYPE` constants.

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [lucide-react](https://lucide.dev/) for icons
- [Recharts](https://recharts.org/) for the dashboard charts

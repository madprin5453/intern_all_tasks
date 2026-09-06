import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { notify } = useToast();

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      notify("That email address doesn't look right.", "error");
      return;
    }
    setError("");
    setSending(true);
    setTimeout(() => {
      setSending(false);
      notify("You're on the list — one email a week, no spam.", "success");
      setEmail("");
    }, 700);
  };

  return (
    <section className="px-6 md:px-10 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto bg-carbon-light border border-carbon-border rounded-3xl px-6 py-12 md:px-16 md:py-16 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-bone">Weekly programming notes</h2>
        <p className="text-bone-muted mt-3 max-w-md mx-auto">
          One short email a week: what changed in the library, and one thing
          worth trying in your next session.
        </p>
        <form onSubmit={submit} noValidate className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-1 text-left">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="you@email.com"
              className={`w-full px-4 py-3 text-sm rounded-full bg-carbon border outline-none transition-colors text-bone placeholder:text-bone-dim ${
                error ? "border-danger" : "border-carbon-border focus:border-ember"
              }`}
              aria-invalid={!!error}
              aria-describedby={error ? "newsletter-error" : undefined}
            />
            {error && (
              <p id="newsletter-error" className="text-sm text-danger mt-1.5">
                {error}
              </p>
            )}
          </div>
          <button type="submit" disabled={sending} className="btn-primary justify-center disabled:opacity-60">
            {sending ? "Joining…" : (<>Subscribe <ArrowRight size={16} /></>)}
          </button>
        </form>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { Send, ChevronDown } from "lucide-react";
import { useToast } from "../context/ToastContext";

function validate(fields) {
  const errors = {};
  if (!fields.name.trim() || fields.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Enter a valid email address.";
  if (!fields.goal) errors.goal = "Choose your main goal.";
  if (!fields.message.trim() || fields.message.trim().length < 10) {
    errors.message = "Say a little more — at least 10 characters.";
  }
  return errors;
}

function Field({ label, error, children, id }) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm text-bone mb-2">
        {label}
      </label>
      {children}
      <div className="min-h-[1.25rem] mt-1.5">{error && <p className="text-sm text-danger">{error}</p>}</div>
    </div>
  );
}

export default function Contact() {
  const [fields, setFields] = useState({ name: "", email: "", goal: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const { notify } = useToast();

  const inputClass = (hasError) =>
    `w-full px-4 py-3 text-sm rounded-xl bg-carbon border outline-none transition-colors text-bone placeholder:text-bone-dim ${
      hasError ? "border-danger" : "border-carbon-border focus:border-ember"
    }`;

  const update = (key) => (e) => {
    const value = e.target.value;
    setFields((f) => ({ ...f, [key]: value }));
    if (touched[key]) setErrors(validate({ ...fields, [key]: value }));
  };

  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(fields));
  };

  const submit = (e) => {
    e.preventDefault();
    const newErrors = validate(fields);
    setErrors(newErrors);
    setTouched({ name: true, email: true, goal: true, message: true });

    if (Object.keys(newErrors).length > 0) {
      notify("Please fix the highlighted fields before sending.", "error");
      return;
    }

    setSending(true);
    // Simulated submission — no backend is wired up in this template.
    setTimeout(() => {
      setSending(false);
      notify(`Thanks, ${fields.name.split(" ")[0]}. A coach will reply within one working day.`, "success");
      setFields({ name: "", email: "", goal: "", message: "" });
      setTouched({});
      setErrors({});
    }, 900);
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 md:gap-16">
        <div className="md:col-span-2">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-bone mb-5">Talk to a coach</h2>
          <p className="text-bone-muted mb-8 max-w-sm">
            Tell us what you're training for. A coach reviews every message
            and replies with a plan to try, not a sales pitch.
          </p>
          <div className="space-y-3 text-sm text-bone-muted">
            <p>coaching@fitforge.app</p>
            <p>+1 (415) 555-0148</p>
            <p>Mon–Fri, 7am–7pm PT</p>
          </div>
        </div>

        <div className="md:col-span-3">
          <form onSubmit={submit} noValidate className="bg-carbon-light border border-carbon-border rounded-2xl p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-x-4">
              <Field id="name" label="Your name" error={touched.name && errors.name}>
                <input
                  id="name"
                  type="text"
                  value={fields.name}
                  onChange={update("name")}
                  onBlur={blur("name")}
                  className={inputClass(touched.name && errors.name)}
                  placeholder="Jordan Lee"
                />
              </Field>

              <Field id="email" label="Email" error={touched.email && errors.email}>
                <input
                  id="email"
                  type="email"
                  value={fields.email}
                  onChange={update("email")}
                  onBlur={blur("email")}
                  className={inputClass(touched.email && errors.email)}
                  placeholder="jordan@email.com"
                />
              </Field>
            </div>

            <Field id="goal" label="Main goal" error={touched.goal && errors.goal}>
              <div className="relative">
                <select
                  id="goal"
                  value={fields.goal}
                  onChange={update("goal")}
                  onBlur={blur("goal")}
                  className={`${inputClass(touched.goal && errors.goal)} appearance-none pr-10`}
                >
                  <option value="">Choose one</option>
                  <option value="Build strength">Build strength</option>
                  <option value="Lose fat">Lose fat</option>
                  <option value="Improve endurance">Improve endurance</option>
                  <option value="General fitness">General fitness</option>
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-bone-muted" />
              </div>
            </Field>

            <Field id="message" label="What's your current routine like?" error={touched.message && errors.message}>
              <textarea
                id="message"
                rows={4}
                value={fields.message}
                onChange={update("message")}
                onBlur={blur("message")}
                className={`${inputClass(touched.message && errors.message)} resize-none`}
                placeholder="Training history, schedule, any injuries — whatever's relevant."
              />
            </Field>

            <button type="submit" disabled={sending} className="btn-primary mt-2 disabled:opacity-60">
              {sending ? "Sending…" : (<>Send message <Send size={16} /></>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

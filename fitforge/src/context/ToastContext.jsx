import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const notify = useCallback(
    (message, type = "success", duration = 4500) => {
      const id = ++idCounter;
      setToasts((current) => [...current, { id, message, type }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ notify, dismiss }}>
      {children}
      <div
        className="fixed top-20 right-4 sm:right-6 z-[100] flex flex-col gap-3 w-[calc(100%-2rem)] sm:w-96"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onClose={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ toast, onClose }) {
  const icon =
    toast.type === "success" ? (
      <CheckCircle2 size={20} className="text-success shrink-0" />
    ) : toast.type === "error" ? (
      <AlertCircle size={20} className="text-danger shrink-0" />
    ) : (
      <Info size={20} className="text-brass shrink-0" />
    );

  const borderColor =
    toast.type === "success" ? "border-success/40" : toast.type === "error" ? "border-danger/40" : "border-brass/40";

  return (
    <div
      role="status"
      className={`animate-slide-in-right flex items-start gap-3 rounded-xl border ${borderColor} bg-carbon-light/95 backdrop-blur px-4 py-3.5 shadow-lg`}
    >
      {icon}
      <p className="text-sm text-bone leading-snug flex-1">{toast.message}</p>
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        className="text-bone-muted hover:text-bone transition-colors shrink-0"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

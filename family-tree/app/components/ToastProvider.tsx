"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ToastType = "success" | "error" | "info" | "warning";

export interface ToastOptions {
  id?: string;
  title: string;
  description?: string;
  type?: ToastType;
  durationMs?: number;
}

interface ToastInternal extends Required<Omit<ToastOptions, "durationMs">> {
  durationMs: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  // Test-safe fallback: provide no-op context when not wrapped (e.g., unit tests)
  if (!ctx) {
    return {
      showToast: () => "noop",
      dismissToast: () => {},
    };
  }
  return ctx;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [toasts, setToasts] = useState<ToastInternal[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  useEffect(() => setMounted(true), []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timerId = timers.current.get(id);
    if (timerId) {
      window.clearTimeout(timerId);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    const id = options.id ?? Math.random().toString(36).slice(2);
    const toast: ToastInternal = {
      id,
      title: options.title,
      description: options.description ?? "",
      type: options.type ?? "info",
      durationMs: options.durationMs ?? 3500,
    };
    setToasts((prev) => [toast, ...prev]);

    if (toast.durationMs > 0) {
      const t = window.setTimeout(() => dismissToast(id), toast.durationMs);
      timers.current.set(id, t);
    }
    return id;
  }, [dismissToast]);

  const value = useMemo<ToastContextValue>(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted && createPortal(
        <div
          aria-live="polite"
          className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2"
        >
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onClose={() => dismissToast(t.id)} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

const toneByType: Record<ToastType, { bg: string; border: string; text: string; icon: React.ReactNode; ariaRole: "status" | "alert" }> = {
  success: {
    bg: "bg-[color-mix(in_oklch,_var(--color-success),_white_88%)]",
    border: "border-(--color-success)",
    text: "text-(--color-neutral-900)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-(--color-success)" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
    ),
    ariaRole: "status",
  },
  error: {
    bg: "bg-[color-mix(in_oklch,_var(--color-error),_white_88%)]",
    border: "border-(--color-error)",
    text: "text-(--color-neutral-900)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-(--color-error)" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 012 0 1 1 0 01-2 0zm1-8a1 1 0 00-1 1v5a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
    ),
    ariaRole: "alert",
  },
  info: {
    bg: "bg-[color-mix(in_oklch,_var(--color-info),_white_88%)]",
    border: "border-(--color-info)",
    text: "text-(--color-neutral-900)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-(--color-info)" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10A8 8 0 11-2 10a8 8 0 0120 0zM9 9a1 1 0 112 0v4a1 1 0 11-2 0V9zm1-4a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd"/></svg>
    ),
    ariaRole: "status",
  },
  warning: {
    bg: "bg-[color-mix(in_oklch,_var(--color-warning),_white_88%)]",
    border: "border-(--color-warning)",
    text: "text-(--color-neutral-900)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-(--color-warning)" viewBox="0 0 20 20" fill="currentColor"><path d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.59c.75 1.334-.213 3.01-1.742 3.01H3.48c-1.53 0-2.492-1.676-1.743-3.01l6.52-11.59zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-7a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1z"/></svg>
    ),
    ariaRole: "status",
  },
};

const ToastItem: React.FC<{ toast: ToastInternal; onClose: () => void }> = ({ toast, onClose }) => {
  const tone = toneByType[toast.type];
  return (
    <div
      role={tone.ariaRole}
      aria-atomic="true"
      className={`group pointer-events-auto min-w-[260px] max-w-[360px] border ${tone.border} ${tone.bg} ${tone.text} rounded-[var(--radius-md)] shadow-[var(--elevation-2)] px-3 py-2 flex items-start gap-2 animate-[toast-in_200ms_ease-out]`}
    >
      <div className="mt-0.5">{tone.icon}</div>
      <div className="flex-1">
        <p className="font-medium text-(--text-sm)">{toast.title}</p>
        {toast.description && <p className="text-(--text-xs) opacity-80 mt-0.5">{toast.description}</p>}
      </div>
      <button
        aria-label="Dismiss notification"
        className="ml-2 text-(--color-neutral-700) hover:text-(--color-neutral-900)"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};

export default ToastProvider;



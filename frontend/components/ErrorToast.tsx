"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, WifiOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ApiErrorShape } from "@/types";

interface ErrorToastProps {
  error: ApiErrorShape | null;
  onDismiss: () => void;
}

/** Floating toast — mount once near the root of a page. */
export default function ErrorToast({ error, onDismiss }: ErrorToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong flex items-start gap-3 rounded-2xl border border-error/30 p-4 shadow-2xl"
          >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-error/15">
              {error.isNetworkError ? (
                <WifiOff className="h-4 w-4 text-error" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-error" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-100">
                {error.isNetworkError ? "Connection lost" : "Something went wrong"}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">
                {error.message}
              </p>
            </div>
            <button
              onClick={onDismiss}
              className="mt-0.5 shrink-0 text-zinc-500 transition-colors hover:text-zinc-200"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Full network-error card shown inline in place of dashboard content. */
export function NetworkErrorCard({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass mx-auto flex max-w-lg flex-col items-center gap-4 rounded-3xl border border-error/20 p-10 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-error/10">
        <WifiOff className="h-7 w-7 text-error" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-zinc-100">
          Can&apos;t reach the InsurAI API
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{message}</p>
      </div>
      <Button variant="destructive" onClick={onRetry}>
        Try again
      </Button>
    </motion.div>
  );
}

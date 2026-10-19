import { ReactNode, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

type DialogProps = {
  title: string;
  message: string | ReactNode;

  confirmText?: string;
  cancelText?: string;

  onConfirm: () => void;
  onCancel: () => void;
};

export default function Dialog({
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: DialogProps) {
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    console.log("Dialog mounted");
  }, []);
  console.log("I'm dialog. I'm called now")
  return (
    <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.16 }}>
      <motion.div className="w-[420px] max-w-[calc(100vw-32px)] rounded-2xl border border-border bg-surface p-5 text-text shadow-[0_16px_48px_rgba(0,0,0,0.3)]" initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 30 }}>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>

        {typeof message === "string" ? (
          <p className="m-0 leading-relaxed text-muted">{message}</p>
        ) : (
          message
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button className="h-[34px] cursor-pointer rounded-lg border border-border bg-surface-hover px-3.5 text-text transition-colors hover:bg-bg" onClick={onCancel}>{cancelText}</button>

          <button className="h-[34px] cursor-pointer rounded-lg border border-accent bg-accent px-3.5 text-white transition-[filter] hover:brightness-110" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

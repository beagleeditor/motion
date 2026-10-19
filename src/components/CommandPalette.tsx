import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export type PaletteCommand = {
  id: string;
  label: string;
  category: string;
  shortcut?: string;
  run: () => void | Promise<void>;
};

type Props = {
  theme: "dark" | "light";
  commands: PaletteCommand[];
  query: string;
  onClose: () => void;
};

export default function CommandPalette({ theme, commands, query, onClose }: Props) {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^>\s*/, "");
    return commands.filter((command) =>
      `${command.label} ${command.category} ${command.shortcut ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => { setSelected(0); }, [query]);

  const execute = (index: number) => {
    const command = results[index];
    if (!command) return;
    onClose();
    void command.run();
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      else if (event.key === "ArrowDown") { event.preventDefault(); setSelected((i) => Math.min(i + 1, results.length - 1)); }
      else if (event.key === "ArrowUp") { event.preventDefault(); setSelected((i) => Math.max(0, i - 1)); }
      else if (event.key === "Enter") { event.preventDefault(); execute(selected); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [results, selected, onClose]);

  return (
    <motion.div className={`command-palette-backdrop theme-${theme} fixed inset-0 z-[10000] box-border h-screen w-screen bg-black/10 backdrop-blur-lg pointer-events-none`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
      <motion.section className="command-palette absolute left-[max(12px,calc(50%-210px))] top-[38px] flex max-h-[calc(100vh-66px)] w-[min(420px,calc(100vw-24px))] flex-col overflow-hidden border border-border bg-surface text-text shadow-[0_18px_60px_rgba(0,0,0,0.32)] pointer-events-auto" role="dialog" aria-modal="true" aria-label="Command palette" initial={reduceMotion ? false : { opacity: 0, y: -18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }} transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 30, mass: 0.75 }}>
        <div className="command-palette-list overflow-auto p-1.5" role="listbox">
          {results.length ? results.map((command, index) => (
            <button type="button" role="option" aria-selected={index === selected} key={command.id} className={`command-palette-item flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 border-0 border-l-2 border-l-transparent bg-transparent px-3 py-[7px] text-left text-text hover:bg-surface-hover ${index === selected ? "selected border-l-accent bg-surface-hover" : ""}`} onMouseEnter={() => setSelected(index)} onClick={() => execute(index)}>
              <span className="command-palette-item-copy flex flex-col gap-[3px]"><span className="text-[13px]">{command.label}</span><small className="text-[11px] text-muted">{command.category}</small></span>
              {command.shortcut && <kbd className="whitespace-nowrap border border-border px-1.5 py-[3px] text-[10px] text-muted">{command.shortcut}</kbd>}
            </button>
          )) : <div className="command-palette-empty px-3 py-7 text-center text-[13px] text-muted">No matching commands</div>}
        </div>
        <footer className="command-palette-footer flex gap-[18px] border-t border-border px-[13px] py-2.5 text-[11px] text-muted"><span className="inline-flex items-center gap-1"><kbd className="px-1 py-px">↑</kbd> <kbd className="px-1 py-px">↓</kbd> Navigate</span><span className="inline-flex items-center gap-1"><kbd className="px-1 py-px">↵</kbd> Run</span><span className="inline-flex items-center gap-1"><kbd className="px-1 py-px">Esc</kbd> Close</span></footer>
      </motion.section>
    </motion.div>
  );
}

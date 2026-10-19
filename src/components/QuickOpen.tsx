import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { searchAPI } from "../lib/search";
import { FileIcon } from "./CustomIcon";

type Props = {
  theme: "dark" | "light";
  mode?: "files" | "themes";
  root: string | null;
  themes?: { id: string; name: string; base: string; colors: Record<string, string> }[];
  activeThemeId?: string;
  onSelectTheme?: (id: string) => void;
  query?: string;
  onOpen: (path: string) => void;
  onClose: () => void;
};

export default function QuickOpen({
  theme,
  mode = "files",
  root,
  themes = [],
  activeThemeId = "auto",
  onSelectTheme,
  query: externalQuery,
  onOpen,
  onClose,
}: Props) {
  const reduceMotion = useReducedMotion();
  const query = externalQuery ?? "";
  const [selected, setSelected] = useState(0);
  const [files, setFiles] = useState<{ path: string; name: string }[]>([]);

  useEffect(() => {
    let cancelled = false;
    setFiles([]);
    if (!root || mode !== "files") return;

    searchAPI.listFiles(root).then((entries) => {
      if (!cancelled) setFiles(entries);
    }).catch((error) => {
      console.error("Quick Open could not list workspace files:", error);
      if (!cancelled) setFiles([]);
    });

    return () => { cancelled = true; };
  }, [root, mode]);

  // 🔍 filter files (live search)
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return files;

    return files.filter((f) => {
      const relativePath = root && f.path.startsWith(`${root.replace(/\/$/, "")}/`)
        ? f.path.slice(root.replace(/\/$/, "").length + 1)
        : f.path;
      return f.name.toLowerCase().includes(q) || relativePath.toLowerCase().includes(q);
    });
  }, [query, files, root]);
  const themeResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return themes.filter((item) => !q || item.name.toLowerCase().includes(q));
  }, [query, themes]);
  const itemCount = mode === "themes" ? themeResults.length : results.length;

  // 🔄 reset selection when results change
  useEffect(() => {
    setSelected(0);
  }, [query, files, mode, itemCount]);

  // ⌨️ keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (itemCount === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((prev) => Math.min(prev + 1, itemCount - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "Enter") {
        if (mode === "themes") {
          const selectedTheme = themeResults[selected];
          if (!selectedTheme) return;
          onSelectTheme?.(selectedTheme.id);
          onClose();
        } else {
          const file = results[selected];
          if (!file) return;
          onOpen(file.path);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [itemCount, mode, results, themeResults, selected, onOpen, onSelectTheme, onClose]);

  return (
    <motion.div className={`fixed inset-x-0 top-[42px] z-[9999] bg-black/10 backdrop-blur-[7px] ${theme === "light" ? "saturate-[0.88]" : ""}`} onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.16 }}>
      <motion.div className="quickopen absolute left-0 right-0 top-0 mx-auto flex w-[700px] max-w-[calc(100vw-40px)] flex-col overflow-hidden rounded-xl border border-border shadow-[0_24px_64px_rgba(0,0,0,0.35)]" onClick={(e) => e.stopPropagation()} initial={reduceMotion ? false : { opacity: 0, y: -14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -7, scale: 0.99 }} transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 340, damping: 29 }}>
        {/* RESULTS */}
        <div className={`quickopen-results flex max-h-[400px] flex-col gap-0.5 overflow-y-auto bg-surface text-text ${mode === "themes" ? "quickopen-theme-results" : ""}`}>
          {mode === "themes" ? (themeResults.length === 0 ? (
            <div className="quickopen-empty p-3 text-[13px] text-muted">No themes found. Install a theme extension to add more.</div>
          ) : themeResults.map((item, index) => (
            <button type="button" key={item.id} className={`quickopen-item flex min-h-[66px] w-full cursor-pointer items-center gap-3 rounded-lg border-0 bg-transparent px-2.5 py-2 text-left text-text hover:bg-surface-hover ${index === selected ? "selected bg-surface-hover" : ""} ${activeThemeId === item.id ? "active-theme" : ""} quickopen-theme-item`} aria-pressed={activeThemeId === item.id} onMouseEnter={() => setSelected(index)} onClick={() => { onSelectTheme?.(item.id); onClose(); }}>
              <span className={`theme-preview theme-preview-${item.base === "vs" ? "light" : "dark"}`} style={{ background: item.colors["editor.background"] ?? (item.base === "vs" ? "#fff" : "#171717"), color: item.colors["editor.foreground"] ?? (item.base === "vs" ? "#222" : "#eee"), borderColor: item.colors["sideBar.border"] ?? item.colors["panel.border"] ?? "transparent" }}>
                <span style={{ background: item.colors["sideBar.background"] ?? "#777" }} />
                <span style={{ background: item.colors["editor.selectionBackground"] ?? item.colors["focusBorder"] ?? "#888" }} />
                <span style={{ background: item.colors["button.background"] ?? item.colors["editorCursor.foreground"] ?? "#aaa" }} />
                <i style={{ background: item.colors["editor.foreground"] ?? "currentColor" }} />
              </span>
              <span className="quickopen-theme-copy"><span className="quickopen-label">{item.name}</span><small>{item.id === "auto" ? "Follow interface appearance" : item.base === "vs" ? "Light theme extension" : "Dark theme extension"}</small></span>
              {activeThemeId === item.id && <span className="quickopen-theme-check">✓</span>}
            </button>
          ))) : results.length === 0 ? (
            <div className="quickopen-empty p-3 text-[13px] text-muted">No files found</div>
          ) : (
            results.map((file, index) => (
              <button
                type="button"
                key={file.path}
                className={`quickopen-item flex w-full cursor-pointer items-center gap-2.5 border-0 bg-transparent px-3 py-2 text-left text-text hover:bg-surface-hover ${index === selected ? "selected bg-surface-hover" : ""}`}
                onMouseEnter={() => setSelected(index)}
                onClick={() => {
                  onOpen(file.path);
                  onClose();
                }}
              >
                <span className="quickopen-icon"><FileIcon name={file.name} isDir={false} /></span>
                <span className="quickopen-label">{file.name}</span>
                <span className="quickopen-path">{(() => {
                  const normalizedRoot = root?.replace(/\/$/, "");
                  const relativePath = normalizedRoot && file.path.startsWith(`${normalizedRoot}/`)
                    ? file.path.slice(normalizedRoot.length + 1)
                    : file.path;
                  return relativePath === file.name ? "" : relativePath.slice(0, Math.max(0, relativePath.length - file.name.length - 1));
                })()}</span>
              </button>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

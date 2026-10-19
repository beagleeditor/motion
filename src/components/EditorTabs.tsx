import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FileIcon } from "./CustomIcon";

export type Tab = {
  id: string;
  name: string;
  path: string | null;
  content: string;
  language: string;
  dirty: boolean;
};

type Props = {
  tabs: Tab[];
  activeTabId: string | null;
  onSelect: (id: string) => void;
  onNewTab: () => void;
  onClose: (tab: Tab) => void;
};

export default function EditorTabs({
  tabs,
  activeTabId,
  onSelect,
  onNewTab,
  onClose,
}: Props) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const activeTab = tabsRef.current?.querySelector<HTMLElement>(".tab.active");
    activeTab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeTabId, tabs.length]);

  return (
    <div className="tabs flex h-12 w-full min-w-0 flex-[0_0_48px] items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-border px-3 [overscroll-behavior-x:contain]" ref={tabsRef} aria-label="Open files" role="tablist">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab relative flex h-[34px] shrink-0 cursor-pointer items-center gap-2.5 rounded-[10px] px-3 text-sm transition-colors hover:bg-surface-hover ${tab.id === activeTabId ? "active bg-surface-hover" : ""}`}
          role="tab"
          aria-selected={tab.id === activeTabId}
          tabIndex={tab.id === activeTabId ? 0 : -1}
          title={tab.path ?? tab.name}
          onClick={() => onSelect(tab.id)}
          onKeyDown={(event) => {
            const index = tabs.findIndex((item) => item.id === tab.id);
            const next = event.key === "ArrowRight" ? index + 1 : event.key === "ArrowLeft" ? index - 1 : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : -1;
            if (next >= 0) {
              event.preventDefault();
              const target = tabs[Math.max(0, Math.min(tabs.length - 1, next))];
              onSelect(target.id);
              requestAnimationFrame(() => tabsRef.current?.querySelectorAll<HTMLElement>("[role='tab']")[Math.max(0, Math.min(tabs.length - 1, next))]?.focus());
            }
          }}
        >
          {tab.id === activeTabId && <motion.span className="tab-active-indicator" layoutId="tab-active-indicator" transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 650, damping: 45 }} />}
          {/* FILE ICON */}
          <FileIcon name={tab.name} isDir={false} />
          {/* FILE NAME */}
          <span className="tab-label max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
            {tab.name}
            {tab.dirty ? " •" : ""}
          </span>

          {/* CLOSE BUTTON */}
          <button
            className="tab-close flex size-[18px] cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-sm leading-none text-muted transition-colors hover:bg-red-500/15 hover:text-[#ff5a5a]"
            aria-label={`Close ${tab.name}`}
            title={`Close ${tab.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onClose(tab); // 👈 send full tab
            }}
          >
            ×
          </button>
        </div>
      ))}

      {/* NEW TAB */}
      <button className="new-tab-btn flex size-7 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-muted transition-colors hover:bg-surface-hover hover:text-text" onClick={onNewTab} aria-label="New file" title="New file">
        +
      </button>
    </div>
  );
}

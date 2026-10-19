import { UiIcon } from "./CustomIcon";
import { motion, useReducedMotion } from "motion/react";


type SidebarView = "files" | "search" | "git" | "run" | "extensions" | "settings";

type Props = {
  active: SidebarView;
  onSelect: (view: SidebarView) => void;
};

export default function ActivityBar({ active, onSelect }: Props) {
  const reduceMotion = useReducedMotion();
  const indicatorTransition = reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 700, damping: 42 };
  return (
    <div className="activity-bar flex w-[60px] shrink-0 flex-col items-center gap-2 rounded-2xl border border-border bg-surface py-2.5">
      <button
        className={`activity-btn relative flex size-10 cursor-pointer items-center justify-center rounded-xl border-0 bg-transparent text-muted transition-colors hover:bg-surface-hover hover:text-text ${active === "files" ? "active" : ""}`}
        onClick={() => onSelect("files")}
        title="Explorer"
        aria-label="Explorer"
        aria-pressed={active === "files"}
      >
        {active === "files" && <motion.span className="activity-active-indicator" layoutId="activity-active-indicator" transition={indicatorTransition} />}
        <UiIcon name="files" size={18} />
      </button>

      <button
        className={`activity-btn relative flex size-10 cursor-pointer items-center justify-center rounded-xl border-0 bg-transparent text-muted transition-colors hover:bg-surface-hover hover:text-text ${active === "run" ? "active" : ""}`}
        onClick={() => onSelect("run")}
        title="Run and Debug"
        aria-label="Run and Debug"
        aria-pressed={active === "run"}
      >
        {active === "run" && <motion.span className="activity-active-indicator" layoutId="activity-active-indicator" transition={indicatorTransition} />}
        <UiIcon name="bug" size={18} />
      </button>

      <button
        className={`activity-btn relative flex size-10 cursor-pointer items-center justify-center rounded-xl border-0 bg-transparent text-muted transition-colors hover:bg-surface-hover hover:text-text ${active === "search" ? "active" : ""}`}
        onClick={() => onSelect("search")}
        title="Search"
        aria-label="Search"
        aria-pressed={active === "search"}
      >
        {active === "search" && <motion.span className="activity-active-indicator" layoutId="activity-active-indicator" transition={indicatorTransition} />}
        <UiIcon name="search" size={18} />
      </button>

      <button
        className={`activity-btn relative flex size-10 cursor-pointer items-center justify-center rounded-xl border-0 bg-transparent text-muted transition-colors hover:bg-surface-hover hover:text-text ${active === "git" ? "active" : ""}`}
        onClick={() => onSelect("git")}
        title="Source Control"
        aria-label="Source Control"
        aria-pressed={active === "git"}
      >
        {active === "git" && <motion.span className="activity-active-indicator" layoutId="activity-active-indicator" transition={indicatorTransition} />}
        <UiIcon name="git-branch" size={18} />
      </button>

      <button
        className={`activity-btn relative flex size-10 cursor-pointer items-center justify-center rounded-xl border-0 bg-transparent text-muted transition-colors hover:bg-surface-hover hover:text-text ${active === "extensions" ? "active" : ""}`}
        onClick={() => onSelect("extensions")}
        title="Extensions"
        aria-label="Extensions"
        aria-pressed={active === "extensions"}
      >
        {active === "extensions" && <motion.span className="activity-active-indicator" layoutId="activity-active-indicator" transition={indicatorTransition} />}
        <UiIcon name="puzzle" size={18} />
      </button>

      <div className="flex-1" />

      <button
        className={`activity-btn relative flex size-10 cursor-pointer items-center justify-center rounded-xl border-0 bg-transparent text-muted transition-colors hover:bg-surface-hover hover:text-text ${active === "settings" ? "active" : ""}`}
        onClick={() => onSelect("settings")}
        title="Settings"
        aria-label="Settings"
        aria-pressed={active === "settings"}
      >
        {active === "settings" && <motion.span className="activity-active-indicator" layoutId="activity-active-indicator" transition={indicatorTransition} />}
        <UiIcon name="settings" size={18} />
      </button>
    </div>
  );
}

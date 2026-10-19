import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UiIcon } from "./CustomIcon";
import type { Settings } from "../lib/settings";

type Props = {
  settings: Settings;
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  onComplete: () => void;
};

const steps = [
  { eyebrow: "01 / YOUR SPACE", title: "Make room for focus.", detail: "A calm interface, tuned to how you like to think." },
  { eyebrow: "02 / YOUR CANVAS", title: "Set up your code view.", detail: "Choose the feel of the editor before you start building." },
  { eyebrow: "03 / READY", title: "Your workspace, composed.", detail: "These choices are always available later in Settings." },
];

export default function SetupWizard({ settings, update, onComplete }: Props) {
  const [step, setStep] = useState(-1);
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const };

  const finish = () => {
    try { localStorage.setItem("beagle-setup-complete", "true"); } catch { /* config store remains authoritative */ }
    onComplete();
  };

  return (
    <div className={`setup-screen setup-theme-${settings.theme}`} role="dialog" aria-modal="true" aria-labelledby="setup-title">
      <div className="setup-grain" aria-hidden="true" />
      {step === -1 ? <motion.main className="setup-welcome" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.5 }}>
        <motion.div className="setup-welcome-mark-wrap" initial={reduceMotion ? false : { opacity: 0, scale: 0.78, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}>
          <motion.div className="setup-welcome-orbit orbit-a" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
          <motion.div className="setup-welcome-orbit orbit-b" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} />
          <motion.span className="setup-welcome-mark">B</motion.span>
          <span className="setup-welcome-spark spark-a" /><span className="setup-welcome-spark spark-b" />
        </motion.div>
        <motion.p className="setup-eyebrow" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: reduceMotion ? 0 : 0.2 }}>A NEW SPACE TO THINK</motion.p>
        <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: reduceMotion ? 0 : 0.26 }}>Make it yours.</motion.h1>
        <motion.p className="setup-welcome-description" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: reduceMotion ? 0 : 0.34 }}>A considered workspace. A little more flow.<br />Let's tune BeagleEditor Motion to the way you work.</motion.p>
        <motion.button className="setup-next setup-welcome-cta" onClick={() => setStep(0)} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} whileHover={reduceMotion ? undefined : { y: -2, scale: 1.015 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} transition={transition}>Compose your workspace <UiIcon name="arrow-right" size={16} /></motion.button>
        <motion.span className="setup-welcome-footnote" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.55 }}>THREE QUICK STEPS <i /> NO WRONG ANSWERS</motion.span>
      </motion.main> : <div className="setup-layout">
        <aside className="setup-rail" aria-label="Setup progress">
          <div className="setup-rail-line"><motion.span animate={{ height: `${(step / (steps.length - 1)) * 100}%` }} transition={transition} /></div>
          {steps.map((item, index) => (
            <button key={item.eyebrow} className={`setup-rail-step ${step === index ? "active" : ""} ${step > index ? "complete" : ""}`} onClick={() => setStep(index)} aria-current={step === index ? "step" : undefined}>
              <span className="setup-rail-number">{step > index ? <UiIcon name="check" size={13} /> : `0${index + 1}`}</span>
              <span>{["Appearance", "Editor", "Finish"][index]}</span>
            </button>
          ))}
          <div className="setup-rail-foot"><span className="setup-live-dot" /> LOCAL · PRIVATE · YOURS</div>
        </aside>

        <main className="setup-main">
          <AnimatePresence mode="wait" initial={false}>
            <motion.section key={step} className="setup-step-content" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={transition}>
              <p className="setup-eyebrow">{steps[step].eyebrow}</p>
              <h1 id="setup-title">{steps[step].title}</h1>
              <p className="setup-description">{steps[step].detail}</p>

              {step === 0 && <div className="setup-choice-grid" role="group" aria-label="Interface appearance">
                {([
                  { value: "dark", title: "Dark", subtitle: "Quiet graphite", icon: "moon" },
                  { value: "light", title: "Light", subtitle: "Soft paper", icon: "sun" },
                  { value: "midnight-teal", title: "Midnight Teal", subtitle: "Deep teal", icon: "monitor" },
                  { value: "yalda-night", title: "Yalda's Night", subtitle: "Pomegranate & plum", icon: "moon" },
                ] as const).map((choice) => <button key={choice.value} className={`setup-theme-choice theme-choice-${choice.value} ${settings.theme === choice.value ? "selected" : ""}`} onClick={() => update("theme", choice.value)} aria-pressed={settings.theme === choice.value}>
                  <span className="setup-theme-preview"><span /><span /><span /><i /></span>
                  <span className="setup-choice-title">{choice.title}</span><span className="setup-choice-subtitle">{choice.subtitle}</span>
                  <span className="setup-choice-check"><UiIcon name="check" size={13} /></span>
                </button>)}
              </div>}

              {step === 1 && <div className="setup-editor-options">
                <div className="setup-option-block"><div className="setup-option-heading"><span>EDITOR TYPE</span><span>01</span></div><div className="setup-font-preview" style={{ fontFamily: settings.fontFamily }}><span className="setup-code-line"><i>const</i> workspace = <b>"yours"</b>;</span><span className="setup-code-line setup-code-muted">// A little room to think.</span><span className="setup-code-line"><i>await</i> buildSomething();</span></div>
                  <label className="setup-field-label" htmlFor="setup-font-size">Editor font size <strong>{settings.fontSize}px</strong></label><input id="setup-font-size" className="setup-range" type="range" min="11" max="20" value={settings.fontSize} onChange={(event) => update("fontSize", Number(event.target.value))} />
                  <div className="setup-range-labels"><span>Compact</span><span>Comfortable</span><span>Roomy</span></div>
                </div>
                <div className="setup-toggle-row"><span className="setup-toggle-icon"><UiIcon name="wrap-text" size={18} /></span><span><strong>Wrap long lines</strong><small>Keep code readable without horizontal scrolling.</small></span><button className={`setup-switch ${settings.wordWrap ? "on" : ""}`} role="switch" aria-checked={settings.wordWrap} onClick={() => update("wordWrap", !settings.wordWrap)}><i /></button></div>
                <div className="setup-toggle-row"><span className="setup-toggle-icon"><UiIcon name="git-branch" size={18} /></span><span><strong>Show indentation guides</strong><small>See the structure of nested code at a glance.</small></span><button className={`setup-switch ${settings.indentationGuides ? "on" : ""}`} role="switch" aria-checked={settings.indentationGuides} onClick={() => update("indentationGuides", !settings.indentationGuides)}><i /></button></div>
              </div>}

              {step === 2 && <div className="setup-finish-card"><div className="setup-finish-orbit orbit-one" /><div className="setup-finish-orbit orbit-two" /><div className="setup-finish-icon"><UiIcon name="check" size={25} /></div><div><strong>Configured around you.</strong><p>{({ dark: "Dark", light: "Light", "midnight-teal": "Midnight Teal", "yalda-night": "Yalda's Night", system: window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : "Light" } as Record<string, string>)[settings.theme]} theme · {settings.fontSize}px editor · {settings.wordWrap ? "line wrapping on" : "line wrapping off"}</p></div><div className="setup-finish-status"><span /> ALL SET</div></div>}
            </motion.section>
          </AnimatePresence>

          <footer className="setup-footer"><span className="setup-footer-note">{step === 2 ? "YOU CAN CHANGE EVERYTHING LATER" : "NO CHOICE IS PERMANENT"}</span><div className="setup-footer-actions">{step > 0 && <button className="setup-back" onClick={() => setStep((current) => current - 1)}><UiIcon name="arrow-left" size={15} /> Back</button>}{step < 2 ? <motion.button className="setup-next" onClick={() => setStep((current) => current + 1)} whileHover={reduceMotion ? undefined : { y: -2, scale: 1.025 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }} transition={transition}>{step === 0 ? "Tune the editor" : "Review setup"}<UiIcon name="arrow-right" size={15} /></motion.button> : <motion.button className="setup-next" onClick={finish} whileHover={reduceMotion ? undefined : { y: -2, scale: 1.025 }} whileTap={reduceMotion ? undefined : { scale: 0.97 }} transition={transition}>Enter workspace <UiIcon name="arrow-up-right" size={15} /></motion.button>}</div></footer>
        </main>
      </div>}
      <div className="setup-bottom-line"><span>BEAGLEEDITOR MOTION</span><span>CRAFTED FOR THE FLOW STATE <i>✳</i></span></div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { defaultSettings, type Settings } from "./settings";
import { getSettingsState, setSettings } from "./settingsStore";

export function useSettings() {
  const [settings, setSettingsState] = useState<Settings>(defaultSettings);
  const [loaded, setLoaded] = useState(false);
  const [configured, setConfigured] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getSettingsState()
      .then(({ settings: saved, configured: hasConfig }) => {
        if (!cancelled) {
          setSettingsState(saved);
          setConfigured(hasConfig);
        }
      })
      .catch((error) => console.error("Could not load settings:", error))
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!loaded || !configured) return;
    void setSettings(settings).catch((error) => console.error("Could not save settings:", error));
  }, [settings, loaded, configured]);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettingsState((prev) => ({ ...prev, [key]: value }));
  };

  const markConfigured = () => setConfigured(true);

  return { settings, update, loaded, configured, markConfigured };
}

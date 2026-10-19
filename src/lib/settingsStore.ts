import { Store } from "@tauri-apps/plugin-store";
import type { Settings } from "./settings";
import { defaultSettings } from "./settings";

const storePromise = Store.load("settings.json");
let writeQueue: Promise<void> = Promise.resolve();

export async function getSettingsState(): Promise<{ settings: Settings; configured: boolean }> {
  const store = await storePromise;
  const saved = (await store.get("settings")) as Partial<Settings> | null;

  return { settings: { ...defaultSettings, ...saved }, configured: saved !== null && saved !== undefined };
}

export async function getSettings(): Promise<Settings> {
  return (await getSettingsState()).settings;
}

export function setSettings(next: Settings): Promise<void> {
  writeQueue = writeQueue.catch(() => undefined).then(async () => {
    const store = await storePromise;
    await store.set("settings", next);
    await store.save();
  });
  return writeQueue;
}

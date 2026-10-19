import { useEffect, useState, type CSSProperties } from "react";
import type { useSettings } from "./useSettings";
import type { InstalledExtension } from "./extensions";
import { colorThemeStyle } from "./editorUtils";
import "./monacoThemes";

type Settings = ReturnType<typeof useSettings>["settings"];

function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useAppearance(
  settings: Settings,
  extensions: InstalledExtension[],
  enabledExtensions: Record<string, boolean>,
) {
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">(getSystemTheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemTheme(media.matches ? "dark" : "light");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const selectedBuiltInTheme = settings.theme === "system" ? systemTheme : settings.theme;
  const baseTheme: "dark" | "light" = selectedBuiltInTheme === "light" ? "light" : "dark";
  const availableColorThemes = extensions.filter((extension) =>
    extension.manifest.type === "theme" && extension.themeData && enabledExtensions[extension.manifest.id] !== false,
  );
  const selectedExtensionTheme = availableColorThemes.find((extension) => extension.manifest.id === settings.colorTheme);
  const theme: "dark" | "light" = selectedExtensionTheme
    ? selectedExtensionTheme.themeData?.base === "vs" ? "light" : "dark"
    : baseTheme;
  const editorTheme = selectedExtensionTheme
    ? `extension-${selectedExtensionTheme.manifest.id}`
    : selectedBuiltInTheme === "midnight-teal" ? "beagle-midnight-teal"
      : selectedBuiltInTheme === "yalda-night" ? "beagle-yalda-night"
        : theme === "dark" ? "beagle-dark" : "beagle-light";
  const builtInPalettes = {
    dark: { bg: "#111210", surface: "#191a17", hover: "#242520", border: "#30312b", text: "#e9e9e2", muted: "#a0a095", accent: "#3b82f6" },
    light: { bg: "#f2f2ed", surface: "#fafaf7", hover: "#e9e9e1", border: "#d8d8ce", text: "#20211d", muted: "#68695f", accent: "#3b82f6" },
    "midnight-teal": { bg: "#071a1c", surface: "#0d2528", hover: "#143438", border: "#205056", text: "#e0f5f2", muted: "#8bb8b5", accent: "#42d6c5" },
    "yalda-night": { bg: "#21111b", surface: "#301724", hover: "#43202f", border: "#603047", text: "#fff0e2", muted: "#d0a6a7", accent: "#e85d75" },
  } as const;
  const palette = builtInPalettes[selectedBuiltInTheme as keyof typeof builtInPalettes] ?? builtInPalettes.dark;
  const paletteStyle = {
    colorScheme: baseTheme,
    "--bg": palette.bg, "--surface": palette.surface, "--surface-hover": palette.hover,
    "--border": palette.border, "--text": palette.text, "--muted": palette.muted, "--accent": palette.accent,
  } as CSSProperties;
  const themeStyle = selectedExtensionTheme ? colorThemeStyle(selectedExtensionTheme.themeData) : paletteStyle;

  return { theme, editorTheme, themeStyle, availableColorThemes, selectedExtensionTheme };
}

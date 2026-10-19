import * as monaco from "monaco-editor";

monaco.editor.defineTheme("beagle-dark", {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#171717",
    "editor.foreground": "#eeeeee",
    "editorLineNumber.foreground": "#4b5563",
    "editorLineNumber.activeForeground": "#eeeeee",
    "editorCursor.foreground": "#60a5fa",
    "editor.selectionBackground": "#264f78",
    "editor.inactiveSelectionBackground": "#3a3d41",
    "editor.lineHighlightBackground": "#202020",
    "editor.lineHighlightBorder": "#383838",
    "editorLineNumber.background": "#171717",
    "editorIndentGuide.background": "#383838",
    "editorIndentGuide.activeBackground": "#666666",
    "editorWhitespace.foreground": "#555555",
    "editorBracketMatch.background": "#33415555",
    "editorBracketMatch.border": "#60a5fa",
    "editorGutter.background": "#171717",
    "editorOverviewRuler.border": "#00000000",
    "editor.findMatchBackground": "#2563eb66",
    "editor.findMatchHighlightBackground": "#2563eb33",

    "editorHoverWidget.background": "#202020",
    "editorHoverWidget.border": "#383838",

    "editorSuggestWidget.background": "#202020",
    "editorSuggestWidget.border": "#383838",
    "editorSuggestWidget.selectedBackground": "#2b2b2b",

    "editorWidget.background": "#202020",
  },
});

monaco.editor.defineTheme("beagle-light", {
  base: "vs",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#f4f4f4",
    "editor.foreground": "#222222",
    "editorLineNumber.foreground": "#888888",
    "editorLineNumber.activeForeground": "#222222",
    "editorCursor.foreground": "#0969da",
    "editor.selectionBackground": "#b6d6ff",
    "editor.inactiveSelectionBackground": "#dbeafe",
    "editor.lineHighlightBackground": "#eaeaea",
    "editor.lineHighlightBorder": "#d6d6d6",
    "editorLineNumber.background": "#f4f4f4",
    "editorGutter.background": "#f4f4f4",
    "editorIndentGuide.background": "#d6d6d6",
    "editorIndentGuide.activeBackground": "#a8a8a8",
    "editorWhitespace.foreground": "#c0c0c0",
    "editorOverviewRuler.border": "#00000000",
    "editorHoverWidget.background": "#ffffff",
    "editorHoverWidget.border": "#d6d6d6",
    "editorSuggestWidget.background": "#ffffff",
    "editorSuggestWidget.border": "#d6d6d6",
    "editorSuggestWidget.selectedBackground": "#eaeaea",
    "editorWidget.background": "#ffffff",
  },
});

monaco.editor.defineTheme("beagle-midnight-teal", {
  base: "vs-dark", inherit: true, rules: [
    { token: "keyword", foreground: "63D9C8" }, { token: "string", foreground: "B6E3A5" },
    { token: "comment", foreground: "6D9A98", fontStyle: "italic" }, { token: "number", foreground: "E8C88A" },
    { token: "type", foreground: "83CDE0" },
  ], colors: {
    "editor.background": "#071A1C", "editor.foreground": "#E0F5F2", "editorLineNumber.foreground": "#527B7D",
    "editorLineNumber.activeForeground": "#D1F5EF", "editorCursor.foreground": "#42D6C5", "editor.selectionBackground": "#1A5555",
    "editor.inactiveSelectionBackground": "#174044", "editor.lineHighlightBackground": "#0D2528", "editor.lineHighlightBorder": "#205056",
    "editorLineNumber.background": "#071A1C", "editorIndentGuide.background": "#205056", "editorIndentGuide.activeBackground": "#42A99F",
    "editorWhitespace.foreground": "#285457", "editorGutter.background": "#071A1C", "editorOverviewRuler.border": "#00000000",
    "editorHoverWidget.background": "#0D2528", "editorHoverWidget.border": "#205056", "editorSuggestWidget.background": "#0D2528",
    "editorSuggestWidget.border": "#205056", "editorSuggestWidget.selectedBackground": "#143438", "editorWidget.background": "#0D2528",
  },
});

monaco.editor.defineTheme("beagle-yalda-night", {
  base: "vs-dark", inherit: true, rules: [
    { token: "keyword", foreground: "F18AA0" }, { token: "string", foreground: "E9C17D" },
    { token: "comment", foreground: "B17D91", fontStyle: "italic" }, { token: "number", foreground: "E9A86C" },
    { token: "type", foreground: "D7A7E8" },
  ], colors: {
    "editor.background": "#21111B", "editor.foreground": "#FFF0E2", "editorLineNumber.foreground": "#8C596B",
    "editorLineNumber.activeForeground": "#FFE4D8", "editorCursor.foreground": "#E85D75", "editor.selectionBackground": "#633044",
    "editor.inactiveSelectionBackground": "#4B2638", "editor.lineHighlightBackground": "#301724", "editor.lineHighlightBorder": "#603047",
    "editorLineNumber.background": "#21111B", "editorIndentGuide.background": "#603047", "editorIndentGuide.activeBackground": "#B64B68",
    "editorWhitespace.foreground": "#603047", "editorGutter.background": "#21111B", "editorOverviewRuler.border": "#00000000",
    "editorHoverWidget.background": "#301724", "editorHoverWidget.border": "#603047", "editorSuggestWidget.background": "#301724",
    "editorSuggestWidget.border": "#603047", "editorSuggestWidget.selectedBackground": "#43202F", "editorWidget.background": "#301724",
  },
});

export type CustomThemes =
    | "light"
    | "dark"
    | "system"
    | "purple"
    | "purpleDark"
    | "yellow"
    | "yellowDark"

// Mapping for <ThemeProvider> value
export const themeValues: Record<CustomThemes, string> = {
    light: "light",
    dark: "dark",
    system: "system",
    purple: "theme-purple",
    purpleDark: "theme-purple-dark",
    yellow: "theme-yellow",
    yellowDark: "theme-yellow-dark",
}

// Mapping for display in the UI
export const themeDisplayNames: Record<CustomThemes, string> = {
    light: "Light",
    dark: "Dark",
    system: "System",
    purple: "Purple",
    purpleDark: "Purple Dark",
    yellow: "Yellow",
    yellowDark: "Yellow Dark",
}
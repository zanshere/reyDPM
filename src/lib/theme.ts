export type Theme = "light" | "dark";

export function getTheme(): Theme {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle(
    "dark",
    theme === "dark"
  );

  localStorage.setItem("theme", theme);

  window.dispatchEvent(
    new CustomEvent("theme-change", {
      detail: theme,
    })
  );
}

export function toggleTheme() {
  setTheme(
    getTheme() === "dark"
      ? "light"
      : "dark"
  );
}
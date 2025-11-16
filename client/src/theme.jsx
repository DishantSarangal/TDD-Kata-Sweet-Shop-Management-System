export function initTheme() {
    const saved = localStorage.getItem("theme");
  
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      return "dark";
    }
  
    document.documentElement.classList.remove("dark");
    return "light";
  }
  
  export function enableDarkMode() {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
  
  export function enableLightMode() {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
  
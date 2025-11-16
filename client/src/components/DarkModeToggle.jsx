import React, { useEffect, useState } from "react";
import { enableDarkMode, enableLightMode, initTheme } from "../theme";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const current = initTheme(); 
    setDark(current === "dark");  // sync state with actual theme
  }, []);

  function toggle() {
    if (dark) {
      enableLightMode();
      setDark(false);
    } else {
      enableDarkMode();
      setDark(true);
    }
  }

  return (
    <button className="dark-toggle" onClick={toggle}>
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

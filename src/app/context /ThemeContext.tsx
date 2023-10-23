"use client";

import { createContext, useEffect, useState } from "react";
if (typeof window !== "undefined") {
  // Perform localStorage action
  const item = localStorage.getItem("key");
}

const defaultState = {
  mode: "dark",
  toggleMode: () => {},
};
interface IContent {
  mode: string;
  toggleMode: () => void;
}

export const ThemeContext = createContext<IContent>(defaultState);
interface Props {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: Props) {
  const initMode = typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark";
  const [mode, setMode] = useState(initMode);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", initMode);
  }, []);
  const toggleMode = () => {
    setMode(prev => {
      const targetTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", targetTheme);
      document.documentElement.setAttribute("data-theme", targetTheme);
      return targetTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ toggleMode, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

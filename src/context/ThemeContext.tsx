"use client";

import { createContext, useEffect, useState } from "react";
if (typeof window !== "undefined") {
  // Perform localStorage action
  const item = localStorage.getItem("key");
}

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "dark";
  } else {
    return "dark";
  }
};

const defaultState = {
  theme: getFromLocalStorage(),
  toggleTheme: () => {},
};
interface IContent {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IContent>(defaultState);
interface Props {
  children: React.ReactNode;
}

export function ThemeContextProvider({ children }: Props) {
  const initMode = typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark";
  const [theme, setTheme] = useState(initMode);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", initMode);
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <div className={`theme ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

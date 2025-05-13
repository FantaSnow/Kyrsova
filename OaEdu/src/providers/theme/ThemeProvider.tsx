import React, { createContext, useContext, useState } from "react";
import { lightThemeTokens } from "./design-tokens/light-theme-token";
import { darkThemeTokens } from "./design-tokens/dark-theme-tokens";

interface ThemeContextType {
  theme: typeof lightThemeTokens;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? darkThemeTokens : lightThemeTokens;
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme =
        prevTheme === lightThemeTokens ? darkThemeTokens : lightThemeTokens;
      localStorage.setItem("theme", newTheme === darkThemeTokens ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

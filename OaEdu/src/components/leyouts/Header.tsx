import React from "react";
import { useTheme } from "../../providers/theme/ThemeProvider";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.text,
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontFamily: theme.typography.fontFamily,
          fontSize: "1.5rem",
          margin: 0,
        }}
      >
        Вхід до системи
      </h1>
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: theme.colors.secondary.main,
          color: theme.colors.text,
          border: "none",
          borderRadius: theme.components.mui.button.root.borderRadius,
          padding: "8px 16px",
          cursor: "pointer",
          fontFamily: theme.typography.fontFamily,
        }}
      >
        Змінити тему
      </button>
    </header>
  );
};

export default Header;

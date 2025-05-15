import React from "react";
import { useTheme } from "../providers/theme/ThemeProvider";
import { Button } from "@mui/material";

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme, mode } = useTheme();

  return (
    <Button onClick={toggleTheme} variant="contained">
      Switch to {mode === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ThemeSwitcher;
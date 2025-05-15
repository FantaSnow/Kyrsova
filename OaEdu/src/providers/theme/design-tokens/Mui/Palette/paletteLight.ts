import type { ThemeOptions } from "@mui/material";

export const paletteLight: ThemeOptions["palette"] = {
  mode: "light",
  primary: {
    main: "#00695f",
    light: "#439889",
    dark: "#003d33",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#f9a825",
    light: "#ffd95a",
    dark: "#c17900",
    contrastText: "#212121",
  },
  error: {
    main: "#d32f2f",
    light: "#ff6659",
    dark: "#9a0007",
    contrastText: "#fff",
  },
  background: {
    default: "#f4f6fb",
    paper: "#ffffff",
  },
  text: {
    primary: "#212121",
    secondary: "#424242",
  },
};
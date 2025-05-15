import type { ThemeOptions } from "@mui/material";

export const paletteDark: ThemeOptions["palette"] = {
  mode: "dark",
  primary: {
    main: "#80cbc4",
    light: "#b2fef7",
    dark: "#4f9a94",
    contrastText: "#212121",
  },
  secondary: {
    main: "#ffd95a",
    light: "#ffff8b",
    dark: "#c17900",
    contrastText: "#212121",
  },
  error: {
    main: "#ef5350",
    light: "#ff867c",
    dark: "#b61827",
    contrastText: "#fff",
  },
  background: {
    default: "#181c1f",
    paper: "#23272b",
  },
  text: {
    primary: "#f5f5f5",
    secondary: "#bdbdbd",
  },
};

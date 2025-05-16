import type { ThemeOptions } from "@mui/material";

export const paletteDark: ThemeOptions["palette"] = {
  mode: "dark",
  primary: {
    main: "#8E5C36",
    primary5: "#2D211A",
    primary10: "#543726",
    primary20: "#6B432A",
    primary30: "#8E5C36",
    primary40: "#B67D4B",
    primary50: "#C99C5A",
    primary60: "#D7B87A",
    primary70: "#E9DCB7",
    primary80: "#F1E8D0",
    primary90: "#F6F1E3",
    primary100: "#F9F7F3",
  },
  secondary: {
    main: "#424242",
    secondary5: "#000000",
    secondary10: "#1C1C1C",
    secondary20: "#393939",
    secondary30: "#555555",
    secondary40: "#717171",
    secondary50: "#8E8E8E",
    secondary60: "#AAAAAA",
    secondary70: "#C6C6C6",
    secondary80: "#E3E3E3",
    secondary90: "#F8F8F8",
    secondary100: "#FFFFFF",
  },
  error: {
    main: "#F44336",
    success: "#00FF41",
    onError: "#FFFFFF",
  },
  background: {
    default: "#181c1f",
    paper: "#23272b",
  },
  text: {
    primary: "#EFEAD2",
    secondary: "#342116",
  },
};

import type { ThemeOptions } from "@mui/material";

export const paletteLight: ThemeOptions["palette"] = {
  mode: "light",
  primary: {
    main: "#8E5C36",
    primary5: "#F9F7F3",
    primary10: "#F6F1E3",
    primary20: "#F1E8D0",
    primary30: "#E9DCB7",
    primary40: "#D7B87A",
    primary50: "#C99C5A",
    primary60: "#B67D4B",
    primary70: "#8E5C36",
    primary80: "#6B432A",
    primary90: "#543726",
    primary100: "#2D211A",
  },
  secondary: {
    main: "#424242",
    secondary5: "##FFFFFF",
    secondary10: "#F8F8F8",
    secondary20: "#E3E3E3",
    secondary30: "#C6C6C6",
    secondary40: "#AAAAAA",
    secondary50: "#8E8E8E",
    secondary60: "#717171",
    secondary70: "#555555",
    secondary80: "#393939",
    secondary90: "#1C1C1C",
    secondary100: "#000000",
  },
  error: {
    main: "#F44336",
    success: "#00FF41",
    onError: "#FFFFFF",
  },
  background: {
    default: "#fff",
    paper: "#fff",
  },
  text: {
    primary: "#EFEAD2",
    secondary: "#342116",
  },
};

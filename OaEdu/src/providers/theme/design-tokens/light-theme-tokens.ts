import type { ThemeOptions } from "@mui/material";
import { buttonOverrides } from "./Mui/Button/buttonOverrides";
import { typography } from "./Mui/Typography/typography";
import { paletteLight } from "./Mui/Palette/paletteLight";

export const lightThemeToken: ThemeOptions = {
  palette: paletteLight,
  typography,
  components: {
    ...buttonOverrides,
  },
};

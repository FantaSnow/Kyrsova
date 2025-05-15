import type { ThemeOptions } from "@mui/material";
import { buttonLightOverrides } from "./Mui/Button/buttonLight";
import { typography } from "./Mui/Typography/typography";
import { paletteLight } from "./Mui/Palette/paletteLight";

export const lightThemeToken: ThemeOptions = {
  palette: paletteLight,
  typography,
  components: {
    ...buttonLightOverrides,
  },
};

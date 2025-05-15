import type { ThemeOptions } from "@mui/material";
import { buttonDarkOverrides } from "./Mui/Button/buttonDark";
import { typography } from "./Mui/Typography/typography";
import { paletteDark } from "./Mui/Palette/paletteDark";

export const darkThemeToken: ThemeOptions = {
  palette: paletteDark,
  typography,
  components: {
    ...buttonDarkOverrides,
  },
};

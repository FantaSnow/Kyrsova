import type { ThemeOptions } from "@mui/material";
import { buttonOverrides } from "./Mui/Button/buttonOverrides";
import { typography } from "./Mui/Typography/typography";
import { paletteDark } from "./Mui/Palette/paletteDark";

export const darkThemeToken: ThemeOptions = {
  palette: paletteDark,
  typography,
  components: {
    ...buttonOverrides,
  },
};

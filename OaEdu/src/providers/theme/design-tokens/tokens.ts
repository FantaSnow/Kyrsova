import { dataGridStyles } from "./DataGrid";
import { loadingButtonStyles } from "./LoadingButton";
import { palette } from "./Pallete";

import { lightButtonStyles } from "./Mui/Button/Light";
import { darkButtonStyles } from "./Mui/Button/Dark";
import { lightTextFieldStyles } from "./Mui/TextField/Light";
import { darkTextFieldStyles } from "./Mui/TextField/Dark";
import { lightAppBarStyles } from "./Mui/AppBar/Light";
import { darkAppBarStyles } from "./Mui/AppBar/Dark";
import { lightAutocompleteStyles } from "./Mui/Autocomplete/Light";
import { darkAutocompleteStyles } from "./Mui/Autocomplete/Dark";
import { lightDividerStyles } from "./Mui/Divider/Light";
import { darkDividerStyles } from "./Mui/Divider/Dark";
import { lightFormHelperTextStyles } from "./Mui/FormHelperText/Light";
import { darkFormHelperTextStyles } from "./Mui/FormHelperText/Dark";
import { lightInputLabelStyles } from "./Mui/InputLabel/Light";
import { darkInputLabelStyles } from "./Mui/InputLabel/Dark";
import { lightListItemButtonStyles } from "./Mui/ListItemButton/Light";
import { darkListItemButtonStyles } from "./Mui/ListItemButton/Dark";
import { lightListItemIconStyles } from "./Mui/ListItemIcon/Light";
import { darkListItemIconStyles } from "./Mui/ListItemIcon/Dark";
import { lightPaperStyles } from "./Mui/Paper/Light";
import { darkPaperStyles } from "./Mui/Paper/Dark";
import { lightSelectStyles } from "./Mui/Select/Light";
import { darkSelectStyles } from "./Mui/Select/Dark";
import { lightToolbarStyles } from "./Mui/Toolbar/Light";
import { darkToolbarStyles } from "./Mui/Toolbar/Dark";

export const tokens = {
  colors: palette,
  components: {
    mui: {
      button: {
        light: lightButtonStyles,
        dark: darkButtonStyles,
      },
      textField: {
        light: lightTextFieldStyles,
        dark: darkTextFieldStyles,
      },
      appBar: {
        light: lightAppBarStyles,
        dark: darkAppBarStyles,
      },
      autocomplete: {
        light: lightAutocompleteStyles,
        dark: darkAutocompleteStyles,
      },
      divider: {
        light: lightDividerStyles,
        dark: darkDividerStyles,
      },
      formHelperText: {
        light: lightFormHelperTextStyles,
        dark: darkFormHelperTextStyles,
      },
      inputLabel: {
        light: lightInputLabelStyles,
        dark: darkInputLabelStyles,
      },
      listItemButton: {
        light: lightListItemButtonStyles,
        dark: darkListItemButtonStyles,
      },
      listItemIcon: {
        light: lightListItemIconStyles,
        dark: darkListItemIconStyles,
      },
      paper: {
        light: lightPaperStyles,
        dark: darkPaperStyles,
      },
      select: {
        light: lightSelectStyles,
        dark: darkSelectStyles,
      },
      toolbar: {
        light: lightToolbarStyles,
        dark: darkToolbarStyles,
      },
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "16px",
  },
};

import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { useTheme } from "./ThemeProvider";

const MuiThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();

  const muiTheme = createTheme({
    palette: {
      primary: {
        main: theme.colors.primary.main,
      },
      secondary: {
        main: theme.colors.secondary.main,
      },
      background: {
        default: theme.colors.background,
      },
      text: {
        primary: theme.colors.text,
      },
    },
    typography: {
      fontFamily: theme.typography.fontFamily,
      fontSize: parseInt(theme.typography.fontSize),
    },
    components: {
      MuiButton: {
        styleOverrides: theme.components.mui.button,
      },
      MuiTextField: {
        styleOverrides: theme.components.mui.textField,
      },
      MuiAppBar: {
        styleOverrides: theme.components.mui.appBar,
      },
      MuiAutocomplete: {
        styleOverrides: theme.components.mui.autocomplete,
      },
      MuiDivider: {
        styleOverrides: theme.components.mui.divider,
      },
      MuiFormHelperText: {
        styleOverrides: theme.components.mui.formHelperText,
      },
      MuiInputLabel: {
        styleOverrides: theme.components.mui.inputLabel,
      },
      MuiListItemButton: {
        styleOverrides: theme.components.mui.listItemButton,
      },
      MuiListItemIcon: {
        styleOverrides: theme.components.mui.listItemIcon,
      },
      MuiPaper: {
        styleOverrides: theme.components.mui.paper,
      },
      MuiSelect: {
        styleOverrides: theme.components.mui.select,
      },
      MuiToolbar: {
        styleOverrides: theme.components.mui.toolbar,
      },
    },
  });

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
};

export default MuiThemeProviderWrapper;

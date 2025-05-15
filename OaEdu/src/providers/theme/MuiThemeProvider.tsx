import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { useTheme } from "./ThemeProvider";
import { lightButtonStyles } from "../theme/design-tokens/Mui/Button/Light";
import { typography } from "../theme/design-tokens/Typography/typography";
import { palette } from "../theme/design-tokens/Pallete";

const MuiThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();
  const muiTheme = createTheme({
    palette: {
      primary: {
        main: palette.primary.primary100,
        light: palette.primary.primary60,
        dark: palette.primary.primary90,
        contrastText: palette.primary.primary5,
      },
      secondary: {
        main: palette.secondary.secondary100,
        light: palette.secondary.secondary60,
        dark: palette.secondary.secondary90,
        contrastText: palette.secondary.secondary5,
      },
      error: {
        main: palette.error.error,
        contrastText: palette.error.onerror,
      },
      background: {
        default: theme.colors.background,
        paper: palette.primary.primary10,
      },
      text: {
        primary: palette.secondary.secondary100,
        secondary: palette.secondary.secondary70,
      },
    },
    typography: {
      fontFamily: theme.typography.fontFamily,
      fontSize: parseInt(theme.typography.fontSize),
      h1: {
        fontSize: typography.h1.fontSize,
        lineHeight: typography.h1.lineHeight,
        fontWeight: typography.h1.fontWeight,
      },
      h2: {
        fontSize: typography.h2.fontSize,
        lineHeight: typography.h2.lineHeight,
        fontWeight: typography.h2.fontWeight,
      },
      h3: {
        fontSize: typography.h3.fontSize,
        lineHeight: typography.h3.lineHeight,
        fontWeight: typography.h3.fontWeight,
      },
      h4: {
        fontSize: typography.h4.fontSize,
        lineHeight: typography.h4.lineHeight,
        fontWeight: typography.h4.fontWeight,
      },
      body1: {
        fontSize: typography.bodyL.fontSize,
        lineHeight: typography.bodyL.lineHeight,
        fontWeight: typography.bodyL.fontWeight,
      },
      body2: {
        fontSize: typography.bodyM.fontSize,
        lineHeight: typography.bodyM.lineHeight,
        fontWeight: typography.bodyM.fontWeight,
      },
      button: {
        fontSize: typography.buttonM.fontSize,
        lineHeight: typography.buttonM.lineHeight,
        fontWeight: typography.buttonM.fontWeight,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: lightButtonStyles.medium.borderRadius,
            width: lightButtonStyles.medium.width,
            height: lightButtonStyles.medium.height,
            "&.MuiButton-primary": {
              backgroundColor:
                lightButtonStyles.medium.primary.enabled.backgroundColor,
              color: lightButtonStyles.medium.primary.enabled.color,
              fontSize: lightButtonStyles.medium.primary.enabled.fontSize,
              lineHeight: lightButtonStyles.medium.primary.enabled.lineHeight,
              fontWeight: lightButtonStyles.medium.primary.enabled.fontWeight,
              "&:hover": {
                backgroundColor:
                  lightButtonStyles.medium.primary.hover.backgroundColor,
                color: lightButtonStyles.medium.primary.hover.color,
              },
              "&:active": {
                backgroundColor:
                  lightButtonStyles.medium.primary.active.backgroundColor,
                color: lightButtonStyles.medium.primary.active.color,
              },
              "&.Mui-disabled": {
                backgroundColor:
                  lightButtonStyles.medium.primary.disabled.backgroundColor,
                color: lightButtonStyles.medium.primary.disabled.color,
              },
            },
            "&.MuiButton-secondary": {
              backgroundColor:
                lightButtonStyles.medium.secondary.enabled.backgroundColor,
              border: lightButtonStyles.medium.secondary.enabled.border,
              color: lightButtonStyles.medium.secondary.enabled.color,
              fontSize: lightButtonStyles.medium.secondary.enabled.fontSize,
              lineHeight: lightButtonStyles.medium.secondary.enabled.lineHeight,
              fontWeight: lightButtonStyles.medium.secondary.enabled.fontWeight,
              "&:hover": {
                border: lightButtonStyles.medium.secondary.hover.border,
                color: lightButtonStyles.medium.secondary.hover.color,
              },
              "&:active": {
                border: lightButtonStyles.medium.secondary.active.border,
                color: lightButtonStyles.medium.secondary.active.color,
              },
              "&.Mui-disabled": {
                border: lightButtonStyles.medium.secondary.disabled.border,
                color: lightButtonStyles.medium.secondary.disabled.color,
              },
            },
          },
        },
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

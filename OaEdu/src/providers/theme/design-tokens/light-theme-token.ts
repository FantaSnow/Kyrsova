import { tokens } from "./tokens";

export const lightThemeTokens = {
  ...tokens,
  colors: {
    ...tokens.colors,
    background: "#ffffff",
    text: "#000000",
  },
  components: {
    ...tokens.components,
    mui: {
      button: tokens.components.mui.button.light,
      textField: tokens.components.mui.textField.light,
      appBar: tokens.components.mui.appBar.light,
      autocomplete: tokens.components.mui.autocomplete.light,
      divider: tokens.components.mui.divider.light,
      formHelperText: tokens.components.mui.formHelperText.light,
      inputLabel: tokens.components.mui.inputLabel.light,
      listItemButton: tokens.components.mui.listItemButton.light,
      listItemIcon: tokens.components.mui.listItemIcon.light,
      paper: tokens.components.mui.paper.light,
      select: tokens.components.mui.select.light,
      toolbar: tokens.components.mui.toolbar.light,
    },
  },
};

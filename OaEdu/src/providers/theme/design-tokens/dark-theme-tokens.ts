import { tokens } from "./tokens";

export const darkThemeTokens = {
  ...tokens,
  colors: {
    ...tokens.colors,
    background: "#121212",
    text: "#ffffff",
  },
  components: {
    ...tokens.components,
    mui: {
      button: tokens.components.mui.button.light,
      textField: tokens.components.mui.textField.dark,
      appBar: tokens.components.mui.appBar.dark,
      autocomplete: tokens.components.mui.autocomplete.dark,
      divider: tokens.components.mui.divider.dark,
      formHelperText: tokens.components.mui.formHelperText.dark,
      inputLabel: tokens.components.mui.inputLabel.dark,
      listItemButton: tokens.components.mui.listItemButton.dark,
      listItemIcon: tokens.components.mui.listItemIcon.dark,
      paper: tokens.components.mui.paper.dark,
      select: tokens.components.mui.select.dark,
      toolbar: tokens.components.mui.toolbar.dark,
    },
  },
};

import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useTheme } from "../../providers/theme/ThemeProvider";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.colors.secondary.secondary10,
        color: theme.colors.text,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: theme.spacing(2),
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontSize: "1.5rem",
          }}
        >
          Вхід до системи
        </Typography>
        <Button
          onClick={toggleTheme}
          variant="contained"
          sx={{
            backgroundColor: theme.colors.secondary.secondary10,
            color: theme.colors.text,
            borderRadius: theme.components.mui.button.big.borderRadius,
            padding: "8px 16px",
            "&:hover": {
              backgroundColor: theme.colors.secondary.secondary20,
            },
          }}
        >
          Змінити тему
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

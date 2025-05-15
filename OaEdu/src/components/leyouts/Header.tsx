import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useTheme } from "../../providers/theme/ThemeProvider";

const Header: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
          Вхід до системи
        </Typography>
        <Button
          onClick={toggleTheme}
          color="inherit"
          sx={{
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          {mode === "light" ? "Темна тема" : "Світла тема"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

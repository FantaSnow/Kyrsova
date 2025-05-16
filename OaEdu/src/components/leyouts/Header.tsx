import React from "react";
import Logo from "../../assets/icons/Logo.svg?react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { useTheme } from "../../providers/theme/ThemeProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { NavLink } from "react-router-dom";

const user = {
  name: "Строзюк Роман Володимирович",
  email: "roman.stroziuk@oa.edu.ua",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const Header: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <AppBar position="fixed">
      <Toolbar disableGutters>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { md: 10, lg: 15, xl: 30 },
          }}
        >
          {/* LOGO */}
          <Logo />

          {/* NAV-BUTTONS */}
          <Box
            sx={{
              display: "flex",
              gap: 8,
              ml: 6,
              "& .active": {
                borderBottom: "2px solid",
                borderColor: "text.main",
              },
              "& a": {
                color: "text.main",
                textDecoration: "none",
                transition: "color 0.2s, border-color 0.2s",
                "&:hover": {
                  color: "text.main",
                  borderBottom: "2px solid",
                  borderColor: "text.main",
                },
                "&:active": {
                  color: "text.secondary",
                  borderColor: "text.secondary",
                },
              },
            }}
          >
            <MuiLink component={NavLink} to="/HomePage" underline="none" end>
              <Typography variant="h3" component="span">
                Головна
              </Typography>
            </MuiLink>
            <MuiLink component={NavLink} to="/schedule" underline="none">
              <Typography variant="h3" component="span">
                Розклад
              </Typography>
            </MuiLink>
            <MuiLink component={NavLink} to="/news" underline="none">
              <Typography variant="h3" component="span">
                Новини
              </Typography>
            </MuiLink>
            <MuiLink component={NavLink} to="/volunteering" underline="none">
              <Typography variant="h3" component="span">
                Волонтерство
              </Typography>
            </MuiLink>
          </Box>

          {/* Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="bodyS">{user.name}</Typography>
              <Typography variant="bodyS">{user.email}</Typography>
            </Box>
            <IconButton onClick={toggleTheme}>
              {mode === "light" ? (
                <DarkModeIcon sx={{ color: "text.primary", fontSize: 28 }} />
              ) : (
                <LightModeIcon sx={{ color: "text.primary", fontSize: 28 }} />
              )}
            </IconButton>
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{ width: 64, height: 64 }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

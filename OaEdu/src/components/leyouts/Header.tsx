import React, { useState } from "react";
import Logo from "../../assets/icons/Logo.svg?react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "../../providers/theme/ThemeProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";

const user = {
  name: "Строзюк Роман Володимирович",
  email: "roman.stroziuk@oa.edu.ua",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const Header: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="relative">
      <Toolbar disableGutters style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-evenly",
            boxSizing: "border-box",
          }}
        >
          {/* LOGO */}
          <Box
            sx={{
              color: "text.primary",
              display: "flex",
              justifyContent: "center",

              alignItems: "center",
              gap: 2,
              width: "30%",
            }}
          >
            <Logo />
            <IconButton onClick={toggleTheme}>
              {mode === "light" ? (
                <DarkModeIcon sx={{ color: "text.primary", fontSize: 28 }} />
              ) : (
                <LightModeIcon sx={{ color: "text.primary", fontSize: 28 }} />
              )}
            </IconButton>
          </Box>

          {/* NAV-BUTTONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "50%",
              gap: { xs: 2, lg: 4, xl: 8 },
              "& .active": {
                borderBottom: "3px solid",
                borderColor: "text.primary",
              },
              "& a": {
                color: "text.primary",
                textDecoration: "none",
                transition: "color 0.2s, border-color 0.2s",
                "&:hover": {
                  color: "text.primary",
                  borderBottom: "3px solid",
                  borderColor: "text.primary",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "30%",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                textAlign: "right",
                display: { xs: "none", lg: "flex" },
                flexDirection: "column",
              }}
            >
              <Typography variant="bodyS">{user.name}</Typography>
              <Typography variant="bodyS">{user.email}</Typography>
            </Box>
            <IconButton onClick={handleMenuOpen}>
              <KeyboardArrowDownIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  bgcolor: "primary.primary20",
                  mt: 3,
                  minWidth: 120,
                  boxShadow: "0px 2px 2px 2px #00000040",
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>Профіль</MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  logout();
                }}
              >
                Вихід
              </MenuItem>
            </Menu>
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

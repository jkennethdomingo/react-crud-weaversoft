import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";

import { useAuth } from "@/hooks/useAuth";
import { useThemeContext } from "@/context/ThemeContext";

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Placeholder for Logo or Title */}
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
            My App
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Theme Toggle Button with Tooltip */}
            <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton onClick={toggleDarkMode} color="inherit">
                {darkMode ? <WbSunnyIcon /> : <NightlightRoundIcon />}
              </IconButton>
            </Tooltip>

            <Box>
              {isAuthenticated ? (
                <>
                  <IconButton
                    size="large"
                    aria-label="account"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={() => logout()}>Log out</MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button component={Link} to="/login" variant="outlined" color="inherit">
                    Login
                  </Button>
                  <Button component={Link} to="/register" variant="contained" color="secondary">
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ flexGrow: 1, overflow: "auto", padding: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
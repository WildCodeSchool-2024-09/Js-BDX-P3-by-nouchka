import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import "./style.css";

export default function BackOfficeHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/login-backoffice");
    }
  }, [navigate]);

  const handleLogout = (): void => {
    localStorage.removeItem("isAdmin");
    navigate("/login-backoffice");
  };

  const isMobile = useMediaQuery("(max-width:738px)");

  return (
    <Box className="backoffice-container">
      {isMobile && (
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Backoffice by.Nouchka</Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        className="sidebar"
      >
        <Box className="sidebar-header">
          <Typography variant="h6" onClick={() => navigate("/backoffice")}>
            Backoffice by.Nouchka
          </Typography>
        </Box>
        <List className="sidebar-list">
          <ListItemButton
            className="sidebar-item"
            onClick={() => navigate("/backoffice/pages")}
          >
            <ListItemText primary="Pages" />
          </ListItemButton>
          <ListItemButton
            className="sidebar-item"
            onClick={() => navigate("/backoffice/products")}
          >
            <ListItemText primary="Produits" />
          </ListItemButton>
          <ListItemButton
            className="sidebar-item"
            onClick={() => navigate("/backoffice/clients")}
          >
            <ListItemText primary="Clients" />
          </ListItemButton>
          <ListItemButton
            className="sidebar-item"
            onClick={() => navigate("/backoffice/orders")}
          >
            <ListItemText primary="Commandes" />
          </ListItemButton>
          <ListItemButton
            className="sidebar-item"
            onClick={() => navigate("/backoffice/stats")}
          >
            <ListItemText primary="Statistiques" />
          </ListItemButton>
        </List>
        <Box className="sidebar-footer">
          <Button
            variant="contained"
            className="button-deconnexion"
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </Box>
      </Drawer>

      <Outlet />
      {location.pathname === "/backoffice" && (
        <Box className="welcome-message">
          <Typography variant="h4">Bienvenue sur le Backoffice</Typography>
        </Box>
      )}
    </Box>
  );
}

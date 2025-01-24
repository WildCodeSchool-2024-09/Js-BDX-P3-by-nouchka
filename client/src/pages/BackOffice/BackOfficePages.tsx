import { Box, Tab, Tabs } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./style.css";

export default function BackOfficePages() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabRoutes = [
    "/backoffice/pages/home",
    "/backoffice/pages/upcycling",
    "/backoffice/pages/about",
  ];

  const currentTab = tabRoutes.indexOf(location.pathname);

  return (
    <Box component="main" className="main-content">
      <Tabs
        value={currentTab !== -1 ? currentTab : 0}
        onChange={(_, newValue) => navigate(tabRoutes[newValue])}
        className="tabs"
      >
        <Tab label="Page d'accueil" />
        <Tab label="Page upcycling" />
        <Tab label="Page à propos" />
      </Tabs>

      {/* Affichage du contenu selon la route */}
      <Outlet />
    </Box>
  );
}

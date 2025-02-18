import { Box, Tab, Tabs } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./style.css";

export default function BackOfficeProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabRoutes = [
    "/backoffice/products/management",
    "/backoffice/products/list",
  ];

  const currentTab = tabRoutes.indexOf(location.pathname);

  useEffect(() => {
    if (currentTab === -1) {
      navigate("/backoffice/products/management", { replace: true });
    }
  }, [currentTab, navigate]);

  return (
    <Box component="main" className="main-content">
      <Tabs
        value={currentTab !== -1 ? currentTab : 0}
        onChange={(_, newValue) => navigate(tabRoutes[newValue])}
        className="tabs"
      >
        <Tab label="Ajouter" />
        <Tab label="Liste des bijoux" />
      </Tabs>
      <Outlet />
    </Box>
  );
}

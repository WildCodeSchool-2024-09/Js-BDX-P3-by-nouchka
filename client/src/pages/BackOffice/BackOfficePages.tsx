import { Box, Tab, Tabs } from "@mui/material"; // Assure-toi que c'est bien comme ça
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // Importation correcte des hooks
import "./style.css"; // Ton fichier CSS

export default function BackOfficePages() {
  const navigate = useNavigate(); // Utilisation de useNavigate
  const location = useLocation(); // Utilisation de useLocation
  const tabRoutes = [
    "/backoffice/pages/home",
    "/backoffice/pages/upcycling",
    "/backoffice/pages/about",
  ];

  // Détermine l'index actuel en fonction de l'URL
  const currentTab = tabRoutes.indexOf(location.pathname);

  return (
    <Box component="main" className="main-content">
      {/* Onglets pour changer de page */}
      <Tabs
        value={currentTab !== -1 ? currentTab : 0} // Par défaut, affiche le premier onglet
        onChange={(_, newValue) => navigate(tabRoutes[newValue])} // Redirection basée sur l'index
        className="tabs"
      >
        <Tab label="Page d'accueil" />
        <Tab label="Page upcycling" />
        <Tab label="Page à propos" />
      </Tabs>
      {/* Contenu dynamique selon l'onglet */}
      <Outlet />{" "}
      {/* Ce composant rendra le contenu spécifique à chaque route */}
    </Box>
  );
}

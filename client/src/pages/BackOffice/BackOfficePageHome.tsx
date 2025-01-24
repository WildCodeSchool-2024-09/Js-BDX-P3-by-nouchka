import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { Pages } from "../../types/Pages";
import "./style.css";

export default function BackOfficePageHome() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [urlIllustration, setUrlIllustration] = useState<string>("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pages/home`)
      .then((response) => response.json())
      .then((data: Pages) => {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setUrlIllustration(data.url_illustration || "");
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, []);

  const handleSave = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pages/home`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        url_illustration: urlIllustration,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Modifications enregistrées !");
        } else {
          alert("Erreur lors de la sauvegarde.");
        }
      })
      .catch((error) => console.error("Erreur lors de la sauvegarde :", error));
  };

  return (
    <Box className="edit-section">
      <TextField
        label="Titre H1"
        variant="outlined"
        fullWidth
        className="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Chapeau"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        className="chapeau-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Champ pour insérer l'URL de l'image */}
      <TextField
        label="URL de l'illustration"
        variant="outlined"
        fullWidth
        className="url-input"
        value={urlIllustration}
        onChange={(e) => setUrlIllustration(e.target.value)}
      />

      {/* Affichage de l'image (si une URL est renseignée) */}
      {urlIllustration && (
        <Box className="image-preview">
          <img src={urlIllustration} alt="" className="image-preview-img" />
        </Box>
      )}

      {/* Champs URL des images */}
      <TextField
        label="URL de l'image produit n°1"
        variant="outlined"
        fullWidth
        className="url-input"
      />
      <TextField
        label="URL de l'image produit n°2"
        variant="outlined"
        fullWidth
        className="url-input"
      />
      <TextField
        label="URL de l'image produit n°3"
        variant="outlined"
        fullWidth
        className="url-input"
      />

      {/* Bouton enregistrer */}
      <Button variant="contained" className="save-button" onClick={handleSave}>
        Enregistrer les modifications
      </Button>
    </Box>
  );
}

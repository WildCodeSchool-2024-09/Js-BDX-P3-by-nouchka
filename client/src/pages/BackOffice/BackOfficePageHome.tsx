import { Box, Button, TextField } from "@mui/material";
import "./style.css";

export default function BackOfficePageHome() {
  return (
    <Box className="edit-section">
      <TextField
        label="Titre H1"
        variant="outlined"
        fullWidth
        className="title-input"
      />
      <TextField
        label="Chapeau"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        className="chapeau-input"
      />

      {/* Upload d'image */}
      <Box className="image-upload">
        <Box className="image-preview" />
        <Box className="image-buttons">
          <Button variant="outlined" className="delete-button">
            Supprimer
          </Button>
          <Button variant="contained" className="upload-button">
            Charger
          </Button>
        </Box>
      </Box>

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
      <Button variant="contained" className="save-button">
        Enregistrer les modifications
      </Button>
    </Box>
  );
}

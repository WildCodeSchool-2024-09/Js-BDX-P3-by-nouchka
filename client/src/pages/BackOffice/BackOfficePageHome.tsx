import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Pages } from "../../types/Pages";
import "./style.css";

export default function BackOfficePageHome() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [urlIllustration, setUrlIllustration] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

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

    setOpenDialog(false);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", "home");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      if (response.ok) {
        setUrlIllustration(data.fileUrl);
        setFile(null);
      } else {
        alert(`Erreur lors de l'upload : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  const handleDeleteImage = async () => {
    if (!urlIllustration) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages/delete-image`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filePath: urlIllustration, name: "home" }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Image supprimée !");
        setUrlIllustration("");
        setFile(null);
        (document.getElementById("fileInput") as HTMLInputElement).value = "";
      } else {
        alert(`Erreur : ${data.error || "Problème inconnu"}`);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur est survenue, veuillez réessayer.");
    }
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

      <TextField
        label="URL de l'illustration"
        variant="outlined"
        fullWidth
        className="url-input"
        value={urlIllustration}
        onChange={(e) => setUrlIllustration(e.target.value)}
      />

      <Box className="upload-box">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button variant="contained" onClick={handleFileUpload} disabled={!file}>
          Upload Image
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteImage}>
          Supprimer
        </Button>
      </Box>

      {urlIllustration && (
        <Box className="image-preview">
          <img
            src={`${import.meta.env.VITE_API_URL}${urlIllustration}`}
            alt=""
            className="image-preview-img"
          />
        </Box>
      )}

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

      <Button
        variant="contained"
        className="save-button"
        onClick={() => setOpenDialog(true)}
      >
        Enregistrer les modifications
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmer l'enregistrement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir enregistrer ces modifications ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

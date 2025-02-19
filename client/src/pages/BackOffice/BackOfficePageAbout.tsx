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
import "./style.css";

interface PageData {
  title: string;
  description: string;
  url_illustration: string;
}

export default function BackOfficePageAbout() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [urlIllustration, setUrlIllustration] = useState<string>("");
  const [fileForAbout, setFileForAbout] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vous devez être connecté");
        setIsLoading(false);
        return;
      }

      try {
        const pageResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/pages/about`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!pageResponse.ok) throw new Error("Erreur d'authentification");
        const pageData: PageData = await pageResponse.json();

        setTitle(pageData.title || "");
        setDescription(pageData.description || "");
        setUrlIllustration(pageData.url_illustration || "");
      } catch (error) {
        console.error("Erreur lors du fetch:", error);
        setError("Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFileUpload = async (fileForAbout: File | null) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté");
      return;
    }

    if (!fileForAbout) {
      alert("Aucun fichier sélectionné !");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("image", fileForAbout);
    formData.append("name", "about");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok) {
        setUrlIllustration(data.fileUrl);
        setFileForAbout(null);
      } else {
        alert(`Erreur lors de l'upload : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      alert("Une erreur est survenue lors de l'upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté");
      return;
    }

    if (!urlIllustration) {
      alert("Aucune image à supprimer !");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages/delete-image`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ filePath: urlIllustration, name: "about" }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Image supprimée !");
        setUrlIllustration("");
        setFileForAbout(null);
        (document.getElementById("fileInput") as HTMLInputElement).value = "";
      } else {
        alert(`Erreur : ${data.error || "Problème inconnu"}`);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté");
      return;
    }

    try {
      const responseAbout = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages/about`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description,
            url_illustration: urlIllustration,
          }),
        },
      );

      if (!responseAbout.ok) {
        const errorDetails = await responseAbout.json();
        throw new Error(
          `Erreur lors de la sauvegarde des données About : ${errorDetails.message}`,
        );
      }

      alert("Données enregistrées avec succès !");
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la sauvegarde des données");
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>Chargement des données...</Box>
    );
  }

  if (error) {
    return <Box sx={{ p: 3, color: "error.main" }}>{error}</Box>;
  }

  return (
    <Box className="page-container">
      <TextField
        label="Titre H1"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Présentation de l'entreprise"
        fullWidth
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="URL Illustration"
        variant="outlined"
        fullWidth
        className="url-illustration-input"
        value={urlIllustration}
        onChange={(e) => setUrlIllustration(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box className="image-container" sx={{ mb: 4 }}>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
        />

        <Button
          variant="contained"
          onClick={() => handleFileUpload(fileForAbout)}
          disabled={!fileForAbout}
          sx={{ mt: 1 }}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>

        {urlIllustration && (
          <>
            <Button
              variant="outlined"
              color="error"
              onClick={async () => {
                await handleRemoveImage();
              }}
              sx={{ mt: 1 }}
            >
              Supprimer l'image
            </Button>

            <Box className="image-preview">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${urlIllustration
                  .split("/")
                  .pop()}`}
                alt=""
                className="image-preview-img"
                onError={(e) => {
                  console.error("Erreur de chargement:", e);
                }}
              />
            </Box>
          </>
        )}
      </Box>

      <Button
        variant="contained"
        className="save-button"
        onClick={() => setOpenDialog(true)}
      >
        Enregistrer les modifications
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir enregistrer ces modifications ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSave} color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

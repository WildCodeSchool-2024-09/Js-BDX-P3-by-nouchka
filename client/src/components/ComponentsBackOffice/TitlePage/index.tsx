import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface HomePageTitleEditorProps {
  onUpdateSuccess?: () => void;
}

export default function HomePageTitleEditor({
  onUpdateSuccess,
}: HomePageTitleEditorProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [urlIllustration, setUrlIllustration] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    type: "error" | "success" | "";
    message: string;
  }>({ type: "", message: "" });

  useEffect(() => {
    fetchHomePageData();
  }, []);

  const fetchHomePageData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages/home`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const data = await response.json();
      setTitle(data.title || "");
      setDescription(data.description || "");
      setUrlIllustration(data.url_illustration || "");
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erreur lors du chargement des données",
      });
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            url_illustration: urlIllustration,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde");
      }

      setStatus({
        type: "success",
        message: "Page d'accueil mise à jour avec succès !",
      });
      setOpenDialog(false);

      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erreur lors de la mise à jour de la page",
      });
    }
    setIsLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {status.message && (
        <Alert
          severity={status.type === "error" ? "error" : "success"}
          sx={{ mb: 2 }}
          onClose={() => setStatus({ type: "", message: "" })}
        >
          {status.message}
        </Alert>
      )}

      <TextField
        label="Titre de la page d'accueil"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TextField
        label="URL de l'illustration"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={urlIllustration}
        onChange={(e) => setUrlIllustration(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={() => setOpenDialog(true)}
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? (
          <CircularProgress size={24} />
        ) : (
          "Enregistrer les modifications"
        )}
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmer les modifications</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir modifier la page d'accueil ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Confirmer"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./style.css";
import EventCard from "./EventCard";

export type Event = {
  id: number;
  name: string;
  location: string;
  date: string;
  description: string;
  url: string;
};

export default function BackOfficePageAbout() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [urlIllustration, setUrlIllustration] = useState<string>("");
  const [rows, setRows] = useState<Event[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/pages/about`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.json();
      })
      .then((data) => {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setUrlIllustration(data.url_illustration || "");
      })
      .catch((error) =>
        console.error("Erreur lors du fetch de la page:", error),
      );

    fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.json();
      })
      .then((data) => setRows(data))
      .catch((error) =>
        console.error("Erreur lors du fetch des événements:", error),
      );
  }, []);

  const handleRowChange = (id: number, field: keyof Event, value: string) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row,
      );
      return updatedRows;
    });
  };

  const handleAddRow = async () => {
    const newRow = {
      name: "",
      location: "",
      date: "",
      description: "",
      url: "",
    };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      });

      if (response.ok) {
        const addedEvent = await response.json();
        // Ajoutez l'ID dans l'état après l'ajout de l'événement
        setRows([
          ...rows,
          {
            ...newRow,
            id: addedEvent.id, // L'ID généré par la base de données
          },
        ]);
      } else {
        console.error("Failed to add event");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDeleteRow = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression.");
      }

      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleUpdateRow = async (event: Event) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté");
      return;
    }

    const cleanedEvent: Partial<Event> = {};

    if (event.name !== undefined) cleanedEvent.name = event.name || "";
    if (event.location !== undefined)
      cleanedEvent.location = event.location || "";
    if (event.description !== undefined)
      cleanedEvent.description = event.description || "";
    if (event.url !== undefined) cleanedEvent.url = event.url || "";

    if (event.date) {
      try {
        cleanedEvent.date = new Date(event.date).toISOString().split("T")[0];
      } catch {
        cleanedEvent.date = "";
      }
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${event.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanedEvent),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour");
      }

      alert("Événement mis à jour !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert(error);
    }
  };

  const handleFileUpload = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté");
      return;
    }
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
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
        setFile(null);
      } else {
        alert(`Erreur lors de l'upload : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  const handleDeleteImage = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté");
      return;
    }
    if (!urlIllustration) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages/delete-image`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filePath: urlIllustration, name: "about" }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        alert("Image supprimée !");
        setUrlIllustration("");
        setFile(null);
      } else {
        alert(`Erreur : ${data.error || "Problème inconnu"}`);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages/about`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            url_illustration: urlIllustration,
            rows,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde des données.");
      }

      alert("Modifications enregistrées avec succès !");
      setOpenDialog(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  const handleEventImageUpload = async (id: number, file: File | null) => {
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${id}/image`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();
      if (response.ok) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, url: data.imageUrl } : row,
          ),
        );
      } else {
        alert(`Erreur lors de l'upload : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  return (
    <Box className="page-container">
      <TextField
        label="Titre H1"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Présentation de l'entreprise"
        fullWidth
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TextField
        label="URL Illustration"
        variant="outlined"
        fullWidth
        className="url-illustration-input"
        value={urlIllustration}
        onChange={(e) => setUrlIllustration(e.target.value)}
      />

      <Box className="image-container">
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

      <Stack direction="column" spacing={2}>
        {rows.map((row) => (
          <EventCard
            key={row.id}
            row={row}
            onDelete={handleDeleteRow}
            onSave={handleUpdateRow}
            onChange={handleRowChange}
            onFileUpload={handleEventImageUpload}
          />
        ))}
      </Stack>

      <Button variant="outlined" onClick={handleAddRow}>
        Ajouter un événement
      </Button>

      <Button
        variant="contained"
        color="primary"
        fullWidth
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

import { Delete, Save, Upload } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./style.css";

export default function BackOfficePageAbout() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [urlIllustration, setUrlIllustration] = useState<string>("");
  const [rows, setRows] = useState<Event[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  type Event = {
    id: number;
    location: string;
    date: string;
    description: string;
    url: string;
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pages/about`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setUrlIllustration(data.url_illustration || "");
      })
      .catch((error) =>
        console.error("Erreur lors du fetch de la page:", error),
      );

    fetch(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) =>
        console.error("Erreur lors du fetch des événements:", error),
      );
  }, []);

  const handleRowChange = (id: number, field: keyof Event, value: string) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      { id: Date.now(), location: "", date: "", description: "", url: "" },
    ]);
  };

  const handleDeleteRow = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression.");
      }

      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleUpdateRow = async (event: Event) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${event.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour.");
      }

      alert("Événement mis à jour !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", "about");

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
          body: JSON.stringify({ filePath: urlIllustration, name: "about" }),
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

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages/about`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
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

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lieu</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <TextField
                    value={row.location}
                    onChange={(e) =>
                      handleRowChange(row.id, "location", e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={row.date ? row.date.split("T")[0] : ""}
                    onChange={(e) =>
                      handleRowChange(row.id, "date", e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.description}
                    onChange={(e) =>
                      handleRowChange(row.id, "description", e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" startIcon={<Upload />}>
                    Charger
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdateRow(row)}
                  >
                    <Save />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Pages } from "../../types/Pages";
import "./style.css";
import type { Jewelry } from "../../types/jewelry";

interface HomeJewelryResponse {
  selected_jewelry: {
    id: number;
    name: string;
    URL: string;
  }[];
}

export default function BackOfficePageHome() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [urlIllustration, setUrlIllustration] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [jewelry, setJewelry] = useState<Jewelry[]>([]);
  const [selectedJewelry, setSelectedJewelry] = useState<(number | null)[]>([
    null,
    null,
    null,
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentification");
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/pages/home`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.json();
      })
      .then((data: Pages) => {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setUrlIllustration(data.url_illustration || "");
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));

    fetch(`${import.meta.env.VITE_API_URL}/api/pages/home/jewelry`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.json();
      })
      .then((data: HomeJewelryResponse) => {
        const selectedJewelIds = data.selected_jewelry?.map((j) => j.id) || [];
        const filledArray = [...selectedJewelIds, null, null, null].slice(0, 3);
        setSelectedJewelry(filledArray);
      })
      .catch((error) =>
        console.error("Erreur lors du fetch des bijoux sélectionnés :", error),
      );

    fetch(`${import.meta.env.VITE_API_URL}/api/jewelry`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setJewelry(data);
        }
      })
      .catch((error) =>
        console.error("Erreur lors du fetch de tous les bijoux :", error),
      );
  }, []);
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté");
      return;
    }

    try {
      const jewelryResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pages/home/jewelry`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            selectedJewelry,
            title,
            description,
            url_illustration: urlIllustration,
          }),
        },
      );
      if (!jewelryResponse.ok) {
        throw new Error(
          "Erreur lors de la sauvegarde des bijoux sélectionnés.",
        );
      }

      alert("Modifications enregistrées avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }

    setOpenDialog(false);
  };

  const handleSelectJewelry = (value: string, position: number) => {
    const newSelectedJewelry = [...selectedJewelry];
    newSelectedJewelry[position] = value === "" ? null : Number(value);
    setSelectedJewelry(newSelectedJewelry);
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
    formData.append("name", "home");

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
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
        label="URL Illustration"
        variant="outlined"
        fullWidth
        className="url-illustration-input"
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
            src={`${import.meta.env.VITE_API_URL}/uploads/${urlIllustration.split("/").pop()}`}
            alt=""
            className="image-preview-img"
            onError={(e) => {
              console.error("Erreur de chargement:", e);
            }}
          />
        </Box>
      )}

      {[0, 1, 2].map((position) => (
        <FormControl key={position} fullWidth className="jewelry-select">
          <InputLabel>Bijou n°{position + 1}</InputLabel>
          <Select
            value={selectedJewelry[position]?.toString() || ""}
            onChange={(e) => handleSelectJewelry(e.target.value, position)}
          >
            <MenuItem value="">Sélectionner un bijou</MenuItem>
            {jewelry.map((jewel) => (
              <MenuItem
                key={jewel.id}
                value={jewel.id.toString()}
                disabled={
                  selectedJewelry.includes(jewel.id) &&
                  selectedJewelry[position] !== jewel.id
                }
              >
                {jewel.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}

      {selectedJewelry
        .filter((id): id is number => id !== null)
        .map((id) => {
          const jewel = jewelry.find((j) => j.id === id);
          if (!jewel) return null;
          return (
            <Box key={jewel.id} className="selected-jewelry">
              <img
                src={`${import.meta.env.VITE_API_URL}/${jewel.URL}`}
                alt={jewel.name}
                className="selected-jewelry-img"
              />
              <p>{jewel.name}</p>
            </Box>
          );
        })}

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

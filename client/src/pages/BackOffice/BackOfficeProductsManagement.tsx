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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function BackOfficeProductsManagement() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setDescription("");
    setType("");
    setPrice("");
    setStock("");
    setFile(null);
    setPreview("");
    setError("");
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Vous devez être connecté");
      }

      if (!name || !type || !description || !price || !stock) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      if (!file) {
        throw new Error("Veuillez sélectionner une image");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock.toString());
      formData.append("image", file);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jewelry`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      resetForm();
      setOpenDialog(false);
      alert("Bijou ajouté avec succès !");
    } catch (err) {
      setError("Une erreur est survenue lors de l'ajout du bijou!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: 2,
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Nom du bijou"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />

      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        required
      />

      <FormControl fullWidth required>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="Boucles d'oreilles">Boucles d'oreilles</MenuItem>
          <MenuItem value="Bagues">Bagues</MenuItem>
          <MenuItem value="Colliers">Colliers</MenuItem>
          <MenuItem value="Bracelets">Bracelets</MenuItem>
          <MenuItem value="Upcycling">Upcycling</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Prix (€)"
        variant="outlined"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        required
      />

      <TextField
        label="Stock"
        variant="outlined"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        fullWidth
        required
      />

      <Box sx={{ mb: 2 }}>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: "1rem" }}
        />

        {preview && (
          <Box sx={{ mt: 2, position: "relative" }}>
            <img
              src={preview}
              alt="Aperçu"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            />
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        onClick={() => setOpenDialog(true)}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Enregistrer le bijou"
        )}
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmer l'ajout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez-vous vraiment ajouter ce bijou à votre catalogue ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

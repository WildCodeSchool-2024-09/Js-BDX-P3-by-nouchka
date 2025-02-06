import { Box, Button, TextField } from "@mui/material";

export default function BackOfficePageAbout() {
  return (
    <Box className="edit-section">
      <TextField
        label="Titre H1"
        variant="outlined"
        fullWidth
        className="title-input"
      />
      <TextField
        label="Présentation de l'entreprise"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        className="chapeau-input"
      />

      <Button variant="contained" className="save-button">
        Enregistrer les modifications
      </Button>
    </Box>
  );
}

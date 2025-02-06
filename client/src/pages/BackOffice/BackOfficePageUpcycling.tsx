import { Box, Button, TextField } from "@mui/material";

export default function BackOfficePageUpcycling() {
  return (
    <Box className="edit-section">
      <TextField
        label="Titre H1"
        variant="outlined"
        fullWidth
        className="title-input"
      />
      <TextField
        label="Description Upcycling"
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

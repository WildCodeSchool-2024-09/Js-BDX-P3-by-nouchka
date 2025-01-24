import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginBackoffice = (): JSX.Element => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Mot de passe temporaire (à remplacer par une API ou un stockage sécurisé)
  const ADMIN_PASSWORD = "admin123";

  // Gestion de la soumission du formulaire
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true"); // Stocke l'authentification
      navigate("/backoffice"); // Redirige vers le backoffice
    } else {
      setError("Mot de passe incorrect !");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 300, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Connexion Backoffice
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Mot de passe"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Se connecter
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginBackoffice;

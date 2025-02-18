import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Jewelry } from "../../types/jewelry";
export default function BackOfficeProductsList() {
  const [jewelryList, setJewelryList] = useState<Jewelry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Vous devez être connecté pour accéder à cette page.");
      return;
    }

    const fetchJewelry = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jewelry`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setJewelryList(data);
        } else {
          throw new Error("Impossible de récupérer les bijoux.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJewelry();
  }, [token]);

  const deleteJewelry = async (id: string | number) => {
    if (!token) {
      alert("Vous devez être connecté pour effectuer cette action.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jewelry/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        setJewelryList((prevList) => prevList.filter((item) => item.id !== id));
        alert("Bijou supprimé avec succès.");
      } else {
        throw new Error("Impossible de supprimer le bijou.");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression du bijou :", err);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Gestion des Bijoux
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jewelryList.map((jewelry) => (
              <TableRow key={jewelry.id}>
                <TableCell>{jewelry.name}</TableCell>
                <TableCell>{jewelry.type}</TableCell>
                <TableCell>{jewelry.stock}</TableCell>
                <TableCell>{jewelry.price}€</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteJewelry(jewelry.id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

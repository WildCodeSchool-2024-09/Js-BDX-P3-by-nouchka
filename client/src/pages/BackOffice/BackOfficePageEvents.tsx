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

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  description: string;
  URL: string;
}

export default function BackOfficePageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<{
    [key: number]: File | null;
  }>({});

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
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!response.ok)
          throw new Error("Erreur lors de la récupération des événements");
        const data = await response.json();
        setEvents(data.length ? data : []);
      } catch (err) {
        console.error("Erreur de récupération des événements :", err);
        setError("Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFileUpload = async (eventId: number) => {
    const file = selectedFiles[eventId];
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/upload`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      const data = await response.json();
      if (response.ok) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, URL: data.fileUrl } : event,
          ),
        );
        setSelectedFiles((prev) => ({ ...prev, [eventId]: null }));
      } else {
        alert(`Erreur lors de l'upload : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  const handleRemoveImage = async (eventId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Vous devez être connecté");

    const event = events.find((e) => e.id === eventId);
    if (!event?.URL) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/delete-image`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ filePath: event.URL }),
        },
      );

      if (response.ok) {
        alert("Image supprimée !");
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.id === eventId ? { ...e, URL: "" } : e)),
        );
      } else {
        alert("Erreur lors de la suppression de l'image");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image :", error);
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
      const updatedEvents = await Promise.all(
        events.map(async (event) => {
          const eventData = {
            name: event.name,
            date: event.date,
            location: event.location,
            description: event.description,
            URL: event.URL,
          };

          if (event.id > 0) {
            await fetch(
              `${import.meta.env.VITE_API_URL}/api/events/${event.id}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
              },
            );
            return event;
          }
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/events`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(eventData),
            },
          );

          if (!response.ok)
            throw new Error("Erreur lors de la création de l'événement");

          const newEvent = await response.json();
          return { ...event, id: newEvent.id };
        }),
      );

      setEvents(updatedEvents);
      alert("Modifications enregistrées avec succès !");
      setOpenDialog(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      setError("Erreur lors de la sauvegarde des événements");
    }
  };

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: Date.now(),
      name: "",
      location: "",
      date: "",
      description: "",
      URL: "",
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  if (isLoading)
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>Chargement des données...</Box>
    );
  if (error) return <Box sx={{ p: 3, color: "error.main" }}>{error}</Box>;

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
  };

  return (
    <Box className="page-container">
      <Button variant="contained" onClick={handleAddEvent} sx={{ mb: 3 }}>
        Ajouter un événement
      </Button>

      {events.map((event) => (
        <Box key={event.id} sx={{ mb: 4 }}>
          <TextField
            label="Nom"
            value={event.name}
            onChange={(e) =>
              setEvents((prevEvents) =>
                prevEvents.map((ev) =>
                  ev.id === event.id ? { ...ev, name: e.target.value } : ev,
                ),
              )
            }
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Lieu"
            value={event.location}
            onChange={(e) =>
              setEvents((prevEvents) =>
                prevEvents.map((ev) =>
                  ev.id === event.id ? { ...ev, location: e.target.value } : ev,
                ),
              )
            }
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Date"
            type="date"
            value={formatDate(event.date)}
            onChange={(e) =>
              setEvents((prevEvents) =>
                prevEvents.map((ev) =>
                  ev.id === event.id ? { ...ev, date: e.target.value } : ev,
                ),
              )
            }
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            value={event.description}
            onChange={(e) =>
              setEvents((prevEvents) =>
                prevEvents.map((ev) =>
                  ev.id === event.id
                    ? { ...ev, description: e.target.value }
                    : ev,
                ),
              )
            }
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          <TextField
            label="URL de l'image"
            value={event.URL}
            onChange={(e) =>
              setEvents((prevEvents) =>
                prevEvents.map((ev) =>
                  ev.id === event.id ? { ...ev, URL: e.target.value } : ev,
                ),
              )
            }
            fullWidth
            sx={{ mb: 2 }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setSelectedFiles((prev) => ({
                ...prev,
                [event.id]: e.target.files?.[0] || null,
              }))
            }
          />
          <Button
            variant="contained"
            onClick={() => handleFileUpload(event.id)}
            disabled={!selectedFiles[event.id]}
            sx={{ mt: 1 }}
          >
            Upload Image
          </Button>
          {event.URL && (
            <Button onClick={() => handleRemoveImage(event.id)}>
              Supprimer l'image
            </Button>
          )}
        </Box>
      ))}

      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Enregistrer
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir enregistrer ces modifications ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={handleSave}>Sauvegarder</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

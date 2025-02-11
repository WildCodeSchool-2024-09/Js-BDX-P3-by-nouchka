import { Delete, Save } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
} from "@mui/material";
import type { Event } from "./BackOfficePageAbout";

type EventCardProps = {
  row: Event;
  onDelete: (id: number) => void;
  onSave: (event: Event) => void;
  onChange: (id: number, field: keyof Event, value: string) => void;
  onFileUpload: (id: number, file: File | null) => void;
};

const EventCard = ({
  row,
  onDelete,
  onSave,
  onChange,
  onFileUpload,
}: EventCardProps) => (
  <Box key={row.id} sx={{ width: "100%", mb: 2 }}>
    <Card>
      <CardMedia
        component="img"
        width="8"
        image={
          row.url
            ? `${import.meta.env.VITE_API_URL}${row.url}`
            : "/default-image.jpg"
        }
        alt="Event Image"
      />
      <CardContent>
        <TextField
          label="Nom de l'événement"
          value={row.name}
          onChange={(e) => onChange(row.id, "name", e.target.value)}
          fullWidth
        />
        <TextField
          label="Lieu"
          value={row.location}
          onChange={(e) => onChange(row.id, "location", e.target.value)}
          fullWidth
        />
        <TextField
          label="Date"
          type="date"
          value={row.date ? row.date.split("T")[0] : ""}
          onChange={(e) => onChange(row.id, "date", e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={row.description}
          onChange={(e) => onChange(row.id, "description", e.target.value)}
          fullWidth
        />
        <TextField
          label="URL de la photo"
          value={
            row.url
              ? `${import.meta.env.VITE_API_URL}${row.url}`
              : "/default-image.jpg"
          }
          onChange={(e) => onChange(row.id, "url", e.target.value)}
          fullWidth
        />
        <Box>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileUpload(row.id, e.target.files?.[0] || null)}
          />
        </Box>
      </CardContent>
      <CardActions>
        <IconButton color="primary" onClick={() => onSave(row)}>
          <Save />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(row.id)}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  </Box>
);

export default EventCard;

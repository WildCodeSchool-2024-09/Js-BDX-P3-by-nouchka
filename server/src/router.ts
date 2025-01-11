import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
router.get("/api/events", (req, res) => {
  const events = [
    {
      id: 1,
      name: "Vide-dressing",
      location: "Bordeaux",
      date: "2025-02-15T20:00:00Z",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      url: "../src/assets/images/IMG_4417.png",
    },
    {
      id: 2,
      name: "Marché de printemps",
      location: "Cenon",
      date: "2025-03-22T20:00:00Z",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      url: "../src/assets/images/IMG_4417.png",
    },
  ];
  res.json(events);
});
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;

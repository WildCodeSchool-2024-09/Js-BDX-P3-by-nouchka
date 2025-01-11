import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import adminActions from "./modules/item/Event-photo/adminActions";
import eventActions from "./modules/item/Event-photo/eventActions";
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/admins", adminActions.browse);
router.get("/api/admins/:id", adminActions.read);
router.post("/api/admins", adminActions.add);

router.get("/api/events", eventActions.browse);
router.get("/api/events/:id", eventActions.read);
router.post("/api/events", eventActions.add);
router.put("/api/events/:id", eventActions.edit);
router.delete("/api/events/:id", eventActions.destroy);

/* ************************************************************************* */

export default router;

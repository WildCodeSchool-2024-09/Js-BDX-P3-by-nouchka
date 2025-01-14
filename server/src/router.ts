import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes

import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/admins", adminActions.browse);
router.get("/api/admins/:id", adminActions.read);
router.post("/api/admins", adminActions.add);

/* ************************************************************************* */

import adminActions from "./modules/admin/adminActions";

router.get("/api/admins", adminActions.browse);
router.get("/api/admins/:id", adminActions.read);
router.post("/api/admins", adminActions.add);
router.put("/api/admins/:id", adminActions.edit);
router.delete("/api/admins/:id", adminActions.destroy);

import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browse);
router.get("/api/events/:id", eventActions.read);
router.post("/api/events", eventActions.add);
router.put("/api/events/:id", eventActions.edit);
router.delete("/api/events/:id", eventActions.destroy);

export default router;

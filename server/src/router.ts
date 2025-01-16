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

import jewelryActions from "./modules/jewelry/jewelryActions";

router.get("/api/jewelry", jewelryActions.browse);
router.get("/api/jewelry/:id", jewelryActions.read);
router.post("/api/jewelry", jewelryActions.add);
router.put("/api/jewelry/:id", jewelryActions.edit);
router.delete("/api/jewelry/:id", jewelryActions.destroy);

/* ************************************************************************* */

import adminActions from "./modules/admin/adminActions";

router.get("/api/admins", adminActions.browse);
router.get("/api/admins/:id", adminActions.read);
router.post("/api/admins", adminActions.add);
router.put("/api/admins/:id", adminActions.edit);
router.delete("/api/admins/:id", adminActions.destroy);

import pagesActions from "./modules/pages/pagesActions";

router.get("/api/pages", pagesActions.browse);
router.get("/api/pages/:name", pagesActions.read);
router.put("/api/pages/:name", pagesActions.edit);

export default router;

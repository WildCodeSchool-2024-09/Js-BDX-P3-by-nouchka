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

export default router;

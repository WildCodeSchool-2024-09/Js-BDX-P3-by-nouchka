import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes

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

import orderActions from "./modules/order/orderActions";
router.get("/api/orders", orderActions.browse);
router.get("/api/orders/:id", orderActions.read);
router.post("/api/orders", orderActions.add);
router.put("/api/orders/:id", orderActions.edit);
router.delete("/api/orders/:id", orderActions.destroy);

export default router;

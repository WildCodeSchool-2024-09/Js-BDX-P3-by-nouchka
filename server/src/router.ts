import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

/* ************************************************************************* */

// Define item-related routes

import clientsActions from "./modules/clients/clientsActions";

router.post("/api/clients", authMiddleware.hashPassword, clientsActions.add);

import jewelryActions from "./modules/jewelry/jewelryActions";

router.get("/api/jewelry", jewelryActions.browse);
router.get("/api/jewelry/:id", jewelryActions.read);

/* ************************************************************************* */

import adminActions from "./modules/admin/adminActions";

import pagesActions from "./modules/pages/pagesActions";

router.get("/api/pages", pagesActions.browse);
router.get("/api/pages/:name", pagesActions.read);

import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browse);
router.get("/api/events/:id", eventActions.read);

import authMiddleware from "../src/Middleware/authMiddleware";

router.put("/api/pages/:name", pagesActions.edit);

router.post("/api/events", eventActions.add);
router.put("/api/events/:id", eventActions.edit);
router.delete("/api/events/:id", eventActions.destroy);

router.post("/api/jewelry", jewelryActions.add);
router.put("/api/jewelry/:id", jewelryActions.edit);
router.delete("/api/jewelry/:id", jewelryActions.destroy);

router.get("/api/admins", adminActions.browse);
router.get("/api/admins/:id", adminActions.read);
router.post("/api/admins", authMiddleware.hashPassword, adminActions.add);
router.put("/api/admins/:id", adminActions.edit);
router.delete("/api/admins/:id", adminActions.destroy);

router.get("/api/clients", clientsActions.browse);
router.get("/api/clients/:id", clientsActions.read);
router.put("/api/clients/:id", clientsActions.edit);

router.delete("/api/clients/:id", clientsActions.destroy);
router.post("/api/auth/login", authMiddleware.login);

router.use(authMiddleware.verifyToken);

export default router;

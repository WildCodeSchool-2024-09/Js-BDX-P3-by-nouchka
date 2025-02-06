import express from "express";
import authMiddleware from "../src/Middleware/authMiddleware";
import upload from "./Middleware/upload";
import adminActions from "./modules/admin/adminActions";
import clientsActions from "./modules/clients/clientsActions";
import eventActions from "./modules/event/eventActions";
import jewelryActions from "./modules/jewelry/jewelryActions";
import orderActions from "./modules/order/orderActions";
import pagesActions from "./modules/pages/pagesActions";
import paymentActions from "./Middleware/StripePaymentSession";
import orderVerify from "./Middleware/orderCheckoutSession";

const router = express.Router();

/* ************************************************************************* */
// Routes publiques (pas d'authentification requise)

router.get("/api/jewelry", jewelryActions.browse);
router.get("/api/jewelry/:id", jewelryActions.read);
router.get("/api/pages", pagesActions.browse);
router.get("/api/pages/:name", pagesActions.read);
router.get("/api/pages/:name/jewelry", pagesActions.readWithJewelry);
router.get("/api/events", eventActions.browse);
router.get("/api/events/:id", eventActions.read);
router.post("/api/auth/login", authMiddleware.login); // Pas d'auth pour login
router.post(
  "api/orders",
  orderVerify.verifyJewelryQuantity,
  orderActions.add,
  orderVerify.verifyOrderInsertion,
);

router.post(
  "/api/payment/create-checkout-session",
  paymentActions.createCheckoutSession,
);
router.get(
  "/api/payment/verify-payment/:sessionId",
  paymentActions.verifyPayment,
);

/* ************************************************************************* */
// Middleware de protection par token
router.use(authMiddleware.verifyToken); // Protection de toutes les routes suivantes

/* ************************************************************************* */
// Routes protégées (nécessitant un token)
router.put("/api/pages/:name", pagesActions.edit);
router.post(
  "/api/pages/upload",
  upload.single("image"),
  pagesActions.uploadImage,
);
router.delete("/api/pages/delete-image", pagesActions.deleteImage);
router.put("/api/pages/:name/jewelry", pagesActions.updateWithJewelry);

router.post("/api/events", eventActions.add);
router.put("/api/events/:id", eventActions.edit);
router.delete("/api/events/:id", eventActions.destroy);

router.get("/api/admins", adminActions.browse);
router.post("/api/jewelry", jewelryActions.add);
router.put("/api/jewelry/:id", jewelryActions.edit);
router.delete("/api/jewelry/:id", jewelryActions.destroy);

router.post("/api/admins", authMiddleware.hashPassword, adminActions.add);
router.put("/api/admins/:id", adminActions.edit);
router.delete("/api/admins/:id", adminActions.destroy);

router.get("/api/orders", orderActions.browse);
router.get("/api/orders/:id", orderActions.read);
router.put("/api/orders/:id", orderActions.edit);
router.delete("/api/orders/:id", orderActions.destroy);

router.get("/api/orders", orderActions.browse);
router.get("/api/orders/:id", orderActions.read);
router.put("/api/orders/:id", orderActions.edit);
router.delete("/api/orders/:id", orderActions.destroy);

router.post("/api/clients", authMiddleware.hashPassword, clientsActions.add);
router.get("/api/clients", clientsActions.browse);
router.get("/api/clients/:id", clientsActions.read);
router.put("/api/clients/:id", clientsActions.edit);
router.delete("/api/clients/:id", clientsActions.destroy);

export default router;

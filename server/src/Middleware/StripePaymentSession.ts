import type { Request, Response } from "express";
import stripeLib from "stripe";

const stripe = new stripeLib(`${process.env.STRIPE_SECRET_KEY}`);

type CartItem = {
  id: number;
  name: string;
  URL: string;
  price: number;
  quantity: number;
};

const paymentActions = {
  createCheckoutSession: async (req: Request, res: Response) => {
    try {
      const cart = req.body.cart;

      if (!cart || cart.length === 0) {
        res.status(400).json({ error: "Le panier est vide" });
        return;
      }

      for (const item of cart) {
        if (!item.price || !item.quantity || item.quantity <= 0) {
          res.status(400).json({ error: `Invalid item in cart: ${item.name}` });
          return;
        }
      }

      const lineItems = cart.map((item: CartItem) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [item.URL],
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
      }));

      if (!process.env.CLIENT_URL) {
        res.status(500).json({ error: "CLIENT_URL is not defined in .env" });
        return;
      }

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancelPayment`,
      });
      res.json({ id: session.id, paymentUrl: session.url });
    } catch (error) {
      console.error("Erreur Stripe :", error);
      res.status(500).json({
        error: "Error while creating the payment session",
      });
    }
  },

  verifyPayment: async (req: Request, res: Response) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        req.params.sessionId,
      );

      if (!session) {
        res.status(404).json({ error: "Session not found" });
        return;
      }

      res.json({ status: session.payment_status });
    } catch (error) {
      console.error("Erreur on payment check:", error);
      res.status(500).json({ error: "Erreur on payment check" });
    }
  },
};

export default paymentActions;

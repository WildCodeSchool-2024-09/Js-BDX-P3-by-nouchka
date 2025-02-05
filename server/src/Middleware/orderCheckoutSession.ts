import type { NextFunction, Request, Response } from "express";
import databaseClient from "../../database/client";

type JewelryOrder = {
  id: number;
  quantity: number;
};

const orderVerify = {
  verifyJewelryQuantity: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.body.jewelries || !Array.isArray(req.body.jewelries)) {
      return res.status(400).json("Jewelry items are missing or invalid.");
    }

    const jewelryOrders: JewelryOrder[] = req.body.jewelries;

    try {
      for (const order of jewelryOrders) {
        const [jewelry] = await databaseClient.execute(
          `SELECT stock FROM jewelry
           WHERE id = ?`,
          [order.id],
        );

        if (!jewelry || !jewelry[0]) {
          return res.status(400).json(`Jewelry with id ${order.id} not found.`);
        }

        if (jewelry[0].stock < order.quantity) {
          return res
            .status(400)
            .json(
              `Insufficient stock for jewelry id ${order.id}. Available: ${jewelry[0].stock}, Requested: ${order.quantity}`,
            );
        }
      }

      return next();
    } catch (err) {
      console.error("Error while verifying quantities:", err);
      return res.status(500).json("Error while verifying order quantities.");
    }
  },

  verifyOrderInsertion: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const orderId = req.body.orderId;

      const [orders] = await databaseClient.execute(
        `SELECT * FROM orders 
        WHERE id = ?`,
        [orderId],
      );

      if (!orders || !orders[0]) {
        return res.status(400).json("Order not found.");
      }

      const order = orders[0];

      const [billingAddress] = await databaseClient.execute(
        `SELECT * FROM billing_address
         WHERE id = ?`,
        [order.billing_address_id],
      );

      const [shippingAddress] = await databaseClient.execute(
        `SELECT * FROM shipping_address 
        WHERE id = ?`,
        [order.shipping_address_id],
      );

      if (!billingAddress[0] || !shippingAddress[0]) {
        return res
          .status(400)
          .json("Order addresses are missing or incomplete.");
      }

      const [jewelryOrders] = await databaseClient.execute(
        `SELECT * FROM jewelry_orders
         WHERE orders_id = ?`,
        [orderId],
      );

      if (!jewelryOrders || jewelryOrders.length === 0) {
        return res.status(400).json("No jewelry items found in the order.");
      }

      return next();
    } catch (err) {
      console.error("Error verifying order:", err);
      return res.status(500).json("Error while verifying order insertion.");
    }
  },
};

export default orderVerify;

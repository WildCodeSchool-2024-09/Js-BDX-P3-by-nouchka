import type { RequestHandler } from "express";

// Import access to data
import orderRepository from "./rderRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const orders = await orderRepository.readAll();

    // Respond with the items in JSON format
    res.json(orders);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const orderId = Number(req.params.id);
    const order = await orderRepository.read(orderId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (order == null) {
      res.sendStatus(404);
    } else {
      res.json(order);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newOrder = {
      billing_address: req.body.billing_address,
      shipping_address: req.body.shipping_address,
      jewelries: req.body.jewelry,
      clients_id: req.body.clients_id,
    };

    // Create the item
    const insertId = await orderRepository.create(newOrder);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const updateOrder = {
      id: +req.params.id,
      status: req.body.status,
    };

    const updatedId = await orderRepository.update(updateOrder);

    if (updatedId) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const orderId = +req.params.id;

    const destroyedId = await orderRepository.delete(orderId);

    if (destroyedId) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };

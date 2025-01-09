import type { RequestHandler } from "express";

// Import access to data
import JewelryRepository from "./jewelryRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const jewelrys = await JewelryRepository.readAll();

    // Respond with the items in JSON format
    res.json(jewelrys);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const jewelryId = Number(req.params.id);
    const jewelry = await JewelryRepository.read(jewelryId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (jewelry == null) {
      res.sendStatus(404);
    } else {
      res.json(jewelry);
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
    const newJewerly = {
      type: req.body.type,
      stock: req.body.stock,
      description: req.body.description,
      name: req.body.name,
      price: req.body.price,
      url: req.body.url,
    };

    // Create the item
    const insertId = await JewelryRepository.create(newJewerly);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const updateJewelry = {
      id: +req.params.id,
      type: req.body.type,
      stock: req.body.stock,
      description: req.body.description,
      name: req.body.name,
      price: req.body.price,
      url: req.body.URL,
    };

    const updatedId = await JewelryRepository.update(updateJewelry);

    if (updatedId) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const jewelryId = +req.params.id;

    const destroyedId = await JewelryRepository.delete(jewelryId);

    if (destroyedId) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };

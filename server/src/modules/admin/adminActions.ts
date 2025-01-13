import type { RequestHandler } from "express";

// Import access to data
import adminRepository from "./adminRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const admins = await adminRepository.readAll();

    // Respond with the items in JSON format
    res.json(admins);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const adminId = Number(req.params.id);
    const admin = await adminRepository.read(adminId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (admin == null) {
      res.sendStatus(404);
    } else {
      res.json(admin);
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
    const newAdmin = {
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      mail: req.body.mail,
      password: req.body.password,
    };

    // Create the item
    const insertId = await adminRepository.create(newAdmin);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const updateAdmin = {
      id: +req.params.id,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      mail: req.body.mail,
      password: req.body.password,
    };

    const updatedId = await adminRepository.update(updateAdmin);

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
    const adminId = +req.params.id;

    const destroyedId = await adminRepository.delete(adminId);

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

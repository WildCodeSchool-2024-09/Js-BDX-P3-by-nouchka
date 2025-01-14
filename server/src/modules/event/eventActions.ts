import type { RequestHandler } from "express";

// Import access to data
import EventRepository from "./eventRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const events = await EventRepository.readAll();

    // Respond with the items in JSON format
    res.json(events);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const eventId = Number(req.params.id);
    const event = await EventRepository.read(eventId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (event == null) {
      res.sendStatus(404);
    } else {
      res.json(event);
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
    const newEvent = {
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
      url: req.body.url,
    };

    // Create the item
    const insertId = await EventRepository.create(newEvent);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const updateEvent = {
      id: +req.params.id,
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
      url: req.body.url,
    };

    const updatedId = await EventRepository.update(updateEvent);

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
    const eventId = +req.params.id;

    const destroyedId = await EventRepository.delete(eventId);

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

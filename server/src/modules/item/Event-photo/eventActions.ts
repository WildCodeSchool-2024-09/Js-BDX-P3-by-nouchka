import type { RequestHandler } from "express";
import eventRepository from "./eventRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (_req, res, next) => {
  try {
    const events = await eventRepository.readAll();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    const event = await eventRepository.read(eventId);

    if (event == null) {
      res.sendStatus(404);
    } else {
      res.json(event);
    }
  } catch (err) {
    next(err);
  }
};
const readPhoto: RequestHandler = async (req, res, next) => {
  try {
    const photoId = Number(req.params.id);
    const photo = await eventRepository.readPhoto(photoId);

    if (photo == null) {
      res.sendStatus(404);
    } else {
      res.json(photo);
    }
  } catch (err) {
    next(err);
  }
};
// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newEvent = {
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
      photoUrl: req.body.photoUrl,
    };

    const insertId = await eventRepository.create(newEvent);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    const updateEvent = {
      id: +req.params.id,
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
      photoUrl: req.body.photoUrl,
    };

    const updatedId = await eventRepository.update(updateEvent);

    if (updatedId.success) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Delete operation
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const eventId = +req.params.id;
    const photoId = Number(req.body.photoId);
    const destroyedId = await eventRepository.delete(eventId);

    if (destroyedId.affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };

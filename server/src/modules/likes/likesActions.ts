import type { RequestHandler } from "express";

import likesRepository from "./likesRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const likes = await likesRepository.readAll();
    res.json(likes);
  } catch (err) {
    next(err);
  }
};
const read: RequestHandler = async (req, res, next) => {
  try {
    const likesId = Number(req.params.id);
    const likes = await likesRepository.read(likesId);

    if (!likes) {
      res.sendStatus(404);
    } else {
      res.json(likes);
    }
  } catch (err) {
    next(err);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const { clients_id, jewelry_id, status = true } = req.body.likes;
    const newLike = { clients_id, jewelry_id, status };
    const insertedLike = await likesRepository.create(newLike);
    res.status(201).json(insertedLike);
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const likeId = Number(req.params.id);
    const result = await likesRepository.delete(likeId);

    if (result === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, add, read, destroy };

import type { RequestHandler } from "express";

import clientsRepository from "./clientsRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const clients = await clientsRepository.readAll();
    res.json(clients);
  } catch (err) {
    next(err);
  }
};
const read: RequestHandler = async (req, res, next) => {
  try {
    const clientId = Number(req.params.id);
    const client = await clientsRepository.read(clientId);

    if (!client) {
      res.sendStatus(404);
    } else {
      res.json(client);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newClient = {
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      mail: req.body.mail,
      password: req.body.password,
    };
    const insertId = await clientsRepository.create(newClient);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const clientId = Number(req.params.id);
    const updatedClient = {
      id: clientId,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      mail: req.body.mail,
      password: req.body.password,
    };

    const result = await clientsRepository.update(updatedClient);

    if (!result) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const clientId = Number(req.params.id);
    const result = await clientsRepository.delete(clientId);

    if (!result) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};
const like: RequestHandler = async (req, res, next) => {
  try {
    const clientId = Number(req.params.clientId);
    const jewelryId = Number(req.params.jewelryId);
    console.info("id client", clientId);
    console.info("id jewelry", jewelryId);
    const { id: likeId } = await clientsRepository.getLikedJewelry(
      clientId,
      jewelryId,
    );

    let result: number | boolean;

    if (likeId) {
      result = await clientsRepository.unlikeJewelry(likeId);
    } else {
      result = await clientsRepository.likeJewelry(clientId, jewelryId);
    }

    if (result) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};
export default {
  browse,
  read,
  edit,
  add,
  destroy,
  like,
};

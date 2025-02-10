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
    const jewelry = await clientsRepository.getLikedJewelry(
      clientId,
      jewelryId,
    );

    let result: number | boolean;
    let liked: boolean;
    if (jewelry) {
      result = await clientsRepository.unlikeJewelry(jewelry.id);
      liked = false;
    } else {
      result = await clientsRepository.likeJewelry(clientId, jewelryId);
      liked = true;
    }

    if (result) {
      res.sendStatus(200).json({
        liked,
        message: liked ? 'Bijou liké' : 'Like retiré'
      });
    } else {
      res.sendStatus(404).json({ message: 'Erreur lors de la gestion du like'});
    }
  } catch (err) {
    console.error ('Errur lors du like:', err)
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

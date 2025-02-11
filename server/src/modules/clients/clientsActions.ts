import type { Request, Response,RequestHandler } from "express";

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

    if (jewelry) {
      result = await clientsRepository.unlikeJewelry(jewelry.id);
    } else {
      result = await clientsRepository.likeJewelry(clientId, jewelryId);
    }

    if (result) {
      res.json({ liked: !jewelry });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};
const getLikeStatus: RequestHandler = async (req, res, next) => {
  try {
    const clientId = Number(req.params.clientId);
    const jewelryId = Number(req.params.jewelryId);
    const like = await clientsRepository.getLikedJewelry(clientId, jewelryId);
 
    res.json({ isLiked: !!like });
  } catch (err) {
    next(err);
  }
 };
 const getClientLikes: RequestHandler = async (req, res, next) => {
  try {
    const clientId = Number(req.params.clientId);
    const likes = await clientsRepository.getClientLikes(clientId);
    res.json(likes);
  } catch (err) {
    next(err);
  }
};
const unlike = async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId, 10);
    const jewelryId = parseInt(req.params.jewelryId, 10);

    // Vérifiez que les IDs sont valides
    if (isNaN(clientId) || isNaN(jewelryId)) {
        return res.status(400).json({ message: "Invalid client or jewelry ID" });
    }

    const like = await clientsRepository.getLikedJewelry(clientId, jewelryId);
    
    if (!like) {
        return res.status(404).json({ message: "Like not found" });
    }

    await clientsRepository.unlikeJewelry(like.id);
    return res.status(200).json({ message: "Like successfully removed" });

} catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
}
}
export default {
  browse,
  read,
  edit,
  add,
  destroy,
  like,
  getLikeStatus,
  getClientLikes,
  unlike
};

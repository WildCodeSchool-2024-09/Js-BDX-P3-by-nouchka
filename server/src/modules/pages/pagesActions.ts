import type { RequestHandler } from "express";
import pagesRepository from "./pagesRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const pages = await pagesRepository.readAll();
    res.json(pages);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const pageName = req.params.name;
    const page = await pagesRepository.read(pageName);

    if (page == null) {
      res.sendStatus(404);
    } else {
      res.json(page);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const pageName = req.params.name;
    const updatePages = {
      name: pageName,
      description: req.body.description,
      url_illustration: req.body.url_illustration,
    };

    const result = await pagesRepository.update(updatePages);

    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit };

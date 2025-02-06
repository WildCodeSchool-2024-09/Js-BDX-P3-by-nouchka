import fs from "node:fs";
import path from "node:path";
import type { NextFunction, RequestHandler, Response } from "express";
import type { MulterRequest } from "../../Middleware/upload";
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

const readWithJewelry: RequestHandler = async (req, res, next) => {
  try {
    const pageName = req.params.name;
    const pageWithJewelry = await pagesRepository.readWithJewelry(pageName);

    if (!pageWithJewelry) {
      res.sendStatus(404);
    } else {
      res.json(pageWithJewelry);
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
      title: req.body.title,
      description: req.body.description,
      url_illustration: req.body.url_illustration,
    };

    const selectedJewelry = req.body.selectedJewelry || [];

    const result = await pagesRepository.update(updatePages);

    if (!result) {
      res.status(404).send("Page non trouvée.");
      return;
    }

    const jewelryUpdateResult = await pagesRepository.updateWithJewelry(
      updatePages,
      selectedJewelry,
    );

    if (jewelryUpdateResult) {
      res.status(204).send();
    } else {
      res.status(500).send("Erreur lors de la mise à jour des bijoux.");
    }
  } catch (err) {
    next(err);
  }
};

const updateWithJewelry: RequestHandler = async (req, res, next) => {
  try {
    const pageName = req.params.name;

    const updatePage = {
      name: pageName,
      title: req.body.title,
      description: req.body.description,
      url_illustration: req.body.url_illustration,
    };

    const selectedJewelry = req.body.selectedJewelry || [];

    const result = await pagesRepository.updateWithJewelry(
      updatePage,
      selectedJewelry,
    );

    if (result) {
      res.status(204).send();
    } else {
      res.status(500).send("Erreur lors de la mise à jour des bijoux.");
    }
  } catch (err) {
    console.error("Erreur dans updateWithJewelry :", err);
    next(err);
  }
};

const uploadImage = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const multerReq = req as MulterRequest;

    if (multerReq.fileValidationError) {
      res.status(400).json({ error: multerReq.fileValidationError });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "Aucun fichier reçu." });
      return;
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const pageName = req.body.name || "home";

    const page = await pagesRepository.read(pageName);
    if (!page) {
      res.status(404).json({ error: "Page non trouvée." });
      return;
    }

    const updated = await pagesRepository.update({
      ...page,
      url_illustration: fileUrl,
    });

    if (!updated) {
      res.status(500).json({ error: "Erreur lors de la mise à jour en base." });
      return;
    }

    res.json({ fileUrl });
  } catch (error) {
    next(error);
  }
};

const deleteImage = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { filePath, name } = req.body;

  if (!filePath) {
    res.status(400).json({ error: "Chemin du fichier requis." });
    return;
  }

  try {
    const absolutePath = path.join(__dirname, "../../..", filePath);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    } else {
      console.warn(`Fichier non trouvé: ${absolutePath}`);
    }

    const page = await pagesRepository.read(name);
    if (!page) {
      res.status(404).json({ error: "Page non trouvée." });
      return;
    }

    const updated = await pagesRepository.update({
      ...page,
      url_illustration: "",
    });

    if (!updated) {
      res.status(500).json({ error: "Erreur lors de la mise à jour en base." });
      return;
    }

    res.json({ message: "Image supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image :", error);
    next(error);
  }
};

export default {
  browse,
  read,
  edit,
  uploadImage,
  deleteImage,
  readWithJewelry,
  updateWithJewelry,
};

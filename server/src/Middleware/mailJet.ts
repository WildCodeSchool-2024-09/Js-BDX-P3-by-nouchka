import type { RequestHandler } from "express";

const mailjet = require("node-mailjet").connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE,
);

const sendEmail: RequestHandler = async (req, res, next) => {
  try {
    const { to, subject, text } = req.body;
    if (!to || !subject || !text) {
      res.status(400).json({ error: "Tous les champs sont requis" });
    }
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: { Email: "nina.rch16@gmail.com", Name: "ByNouchka" },
          To: [{ Email: to }],
          Subject: subject,
          TextPart: text,
        },
      ],
    });
    const result = await request;
    // console.log("Email envoyé :", result.body);
    next();
  } catch (error) {
    console.error("Erreur Mailjet :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
  }
};

export default { sendEmail };

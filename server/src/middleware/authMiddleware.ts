import type { RequestHandler } from "express";

import argon2 from "argon2";
import usersRepository from "../modules/auth/usersRepository";

const login: RequestHandler = async (req, res, next) => {
  console.info(req.body.password);
  try {
    const user = await usersRepository.readByEmailWithPassword(req.body.mail);

    if (user === null) {
      res.sendStatus(422);
      return;
    }
    const verified = await argon2.verify(user.password, req.body.password);
    if (verified) {
      const { password, ...userWithoutHashedPassword } = user;

      res.json(userWithoutHashedPassword);
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const hashingOptions = {
      type: argon2.argon2id,
      memoryCost: 19 * 2 ** 10,
      timeCost: 2,
      parallelism: 1,
    };
    const { password } = req.body;

    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
};

export default { login, hashPassword };

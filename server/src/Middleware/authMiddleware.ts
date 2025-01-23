import argon2 from "argon2";
import type { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import usersRepository from "../modules/Auth/usersRepository";
import adminRepository from "../modules/admin/adminRepository";

import type { JwtPayload } from "jsonwebtoken";
import clientsRepository from "../modules/clients/clientsRepository";

interface MyPayload extends JwtPayload {
  sub: string;
  isAdmin: boolean;
}

interface AuthenticatedRequest extends Request {
  auth?: MyPayload;
}

const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await usersRepository.readByEmailWithPassword(req.body.mail);

    if (user === null) {
      res.sendStatus(422);
      return;
    }
    const verified = await argon2.verify(user.password, req.body.password);
    console.info(verified);
    if (verified) {
      const { password, ...userWithoutHashedPassword } = user;
      const admin = await adminRepository.checkIsAdmin(user.id);
      const client = await clientsRepository.checkIsClient(user.id);
      const myPayload: MyPayload = {
        sub: user.id.toString(),
        isAdmin: !!admin,
      };

      const token = await jwt.sign(
        myPayload,
        process.env.APP_SECRET as string,
        { expiresIn: "1h" },
      );

      res.json({
        token,
        user: userWithoutHashedPassword,
      });
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

const verifyToken: RequestHandler = (req: AuthenticatedRequest, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;

    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

export default { login, hashPassword, verifyToken };

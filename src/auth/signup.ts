import { genSalt, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import { teapot } from "../logic/teapot";
import { sign } from "jsonwebtoken";
import { db } from "../database/db-middleware";

export const signup = async (req: Request, res: Response) => {
  try {
    teapot(req, res);

    const { username, password, role } = req.body;

    const table = db("users");

    if (await table.where({ username }).first()) {
      return res.status(409).json({ error: "Пользователь уже существует" });
    } else {
      await table.insert({
        id: v4(),
        role,
        username,
        access_key: v4(),
        refresh_key: v4(),
        password: await hash(password, await genSalt(10)),
      });

      return res
        .status(201)
        .json({ message: "Пользователь успешно зарегистрирован" });
    }
  } catch (error) {
    console.error(error);
    
    return res
      .status(500)
      .json({ error: `Исключение при регистрации: ${error}` });
  }
};

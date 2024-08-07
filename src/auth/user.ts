import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { db } from "../database/db-middleware";
import { teapot } from "../logic/teapot";

export const user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    teapot(req, res);

    const auth = req.headers?.authorization;

    if (auth) {
      const user = await db("users").where({ access_token: auth }).first();

      if (!user) {
        return res.status(401).json({
          success: false,
          message:
            "Исключение при получении данных пользователя:  Неверные учетные данные",
        });
      } else {
        const { id, username, role } = user;

        return res.status(208).json({
          success: true,
          message: { id, username, role },
        });
      }
    }
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({
        success: false,
        message: `Исключение при получении данных пользователя: ${error}`,
      });
  }
};

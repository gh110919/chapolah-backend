import { Request, Response } from "express";
import { teapot } from "../logic/teapot";
import { db } from "../database/db-middleware";

export const signout = async (req: Request, res: Response) => {
  try {
    teapot(req, res);
    const table = db("users");
    const auth = req.headers?.authorization;

    if (auth) {
      await table.where({ access_token: auth }).update({
        access_token: null,
        refresh_token: null,
      });

      return res.status(200).json({
        success: true,
        message: "Выход осуществлен успешно!",
      });
    }
  } catch (error) {
    console.error(error);

    return res
      .status(200)
      .json({ success: false, message: `Исключение при выходе ${error}` });
  }
};

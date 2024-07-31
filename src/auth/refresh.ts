import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { db } from "../database/db-middleware";

export const refresh = async (req: Request, res: Response) => {
  try {
    const table = db("users");

    const { refreshToken } = req.body;

    const candidate = await table
      .where({ refresh_token: refreshToken })
      .first();

    if (!!candidate) {
      const { id, role, username, access_key } = candidate;

      const accessToken = sign({ id, role, username }, access_key, {
        expiresIn: "1h",
      });

      await table.where({ refresh_token: refreshToken }).update({
        access_token: accessToken,
      });

      return res
        .status(200)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        })
        .json({
          success: true,
          message: "Токен обновлен",
        });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: true,
      message: `Исключение при обновлении токена ${error}`,
    });
  }
};

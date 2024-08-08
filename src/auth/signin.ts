import { compare } from "bcrypt";
import { Request, Response } from "express";
import { db } from "../database/db-middleware";
import { teapot } from "../logic/teapot";
import { sign } from "jsonwebtoken";

export const signin = async (req: Request, res: Response) => {
  try {
    teapot(req, res);

    const table = db("users");
    const { username, password } = req.body;
 
    if (!username) {
      throw new Error("Username is required");
    }
    
    const user = await db("users").where({ username }).first();
    
    if (!user) {
      throw new Error("User not found");
    }
    
    const {
      id,
      username: userUsername,
      password: userPassword,
      role,
      access_key,
      refresh_key,
    } = user;

    // const {
    //   id,
    //   username: userUsername,
    //   password: userPassword,
    //   role,
    //   access_key,
    //   refresh_key,
    // } = await db("users").where({ username }).first();

    const passwordCheck = await compare(password, userPassword);

    if (!userUsername || !passwordCheck) {
      return res.status(401).json({
        success: false,
        message: "Исключение при входе: Неверные учетные данные",
      });
    } else {
      const payload = { id, username: userUsername, role };
      const accessToken = sign(payload, access_key, { expiresIn: "1h" });
      const refreshToken = sign(payload, refresh_key, { expiresIn: "7d" });

      await table.where({ username }).update({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      return res
        .status(200)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          message: "Токены сгенерированы",
        });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: `Исключение при входе ${error}`,
    });
  }
};

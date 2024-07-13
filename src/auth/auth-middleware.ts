import { compare, hash } from "bcrypt";
import { Router } from "express";
import { sign } from "jsonwebtoken";
import { db } from "../database/db-middleware";

export const authMiddleware = ((router) => {
  router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await hash(password, 10);

    try {
      await db("users").insert({ username, password: hashedPassword });
      res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
    } catch (error) {
      res.status(500).json({ error: "Ошибка при регистрации" });
    }
  });

  router.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await db("users").where("username", username).first();

      if (!user || !(await compare(password, user.password))) {
        return res.status(401).json({ error: "Неверные учетные данные" });
      }

      const token = sign({ userId: user.id }, "mysecretkey", {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Ошибка при входе" });
    }
  });

  return router;
})(Router());
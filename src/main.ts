import cors from "cors";
import express, { json } from "express";
import { authMiddleware } from "./auth/auth-middleware";
import { crudMiddleware } from "./logic/crud-middleware";
import { websocketMiddleware } from "./logic/websocket-middleware";

((server) => {
  server.listen(80, () => {
    try {
      server
        .use(json())
        .use(cors())
        .set("trust proxy", "linklocal")
        .use("/api/auth", authMiddleware)
        .use("/api/crud", crudMiddleware)
        .use("/api/ws", () => websocketMiddleware);
      console.log(true);
    } catch (error) {
      console.error(`Исключение экспресс-сервера: ${error}`);
    }
  });
})(express());

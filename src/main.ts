import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json } from "express";
import http from "http";
import { authMiddleware } from "./auth/auth-middleware";
import { crudMiddleware } from "./logic/crud-middleware";
import { websocketMiddleware } from "./logic/websocket-middleware";

((server) => {
  server.listen(3000, () => {
    try {
      server
        .use(json())
        .use(cors({ origin: "http://localhost", credentials: true }))
        .use(cookieParser())
        .set("trust proxy", "linklocal")
        .use("/api/auth", authMiddleware)
        .use("/api/crud", crudMiddleware);

      console.log(true);
    } catch (error) {
      console.error(`Исключение экспресс-сервера: ${error}`);
    }
  });

  const wsServer = http.createServer(server);

  wsServer.listen(8080, () => {
    websocketMiddleware(wsServer);
  });
})(express());

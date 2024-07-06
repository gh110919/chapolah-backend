import cors from "cors";
import express, { json } from "express";
import { crudMiddleware } from "./logic/crud-middleware";
import { endpoints } from "./logic/endpoints";

((server) => {
  server.listen(80, () => {
    try {
      server
        .use(json())
        .set("trust proxy", "linklocal")
        .use(cors())
        .use("/api/crud", crudMiddleware(endpoints));
      console.error(true);
    } catch (error) {
      console.error(`Исключение: ${error}`);
    }
  });
})(express());

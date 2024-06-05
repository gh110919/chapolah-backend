import cors from "cors";
import express, { json } from "express";
import { crudMiddleware } from "./logic/crud-middleware";
import { endpoints } from "./logic/endpoints";

((server) => {
  try {
    server
      .use(json())
      .set("trust proxy", "linklocal")
      .use(cors())
      .use("/api/crud", crudMiddleware(endpoints))
      .listen(80);
  } catch (error) {
    console.error(`Исключение: ${error}`);
  }
})(express());

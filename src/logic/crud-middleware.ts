import { Router } from "express";
import { controller } from "./controller";
import { model } from "./model";
import { router } from "./router";
import { service } from "./service";
import { Endpoint } from "./endpoints";

export const crudMiddleware = (endpoints: Endpoint[]): Router[] => {
  return endpoints.map(({ endpoint, table }) => {
    return router(endpoint, controller(service(model(table))));
  });
};

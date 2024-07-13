import { Router } from "express";
import { controller } from "./controller";
import { Endpoint, endpoints } from "./endpoints";
import { model } from "./model";
import { router } from "./router";
import { service } from "./service";

export const crudMiddleware = ((endpoints: Endpoint[]): Router[] => {
  return endpoints.map(({ endpoint, table }) => {
    return router(endpoint, controller(service(model(table))));
  });
})(endpoints);

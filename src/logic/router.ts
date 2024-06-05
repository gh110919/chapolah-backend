import { Request, Response, Router } from "express";

export type TController = {
  create: (request: Request, response: Response) => Promise<void>;
  read: (request: Request, response: Response) => Promise<void>;
  update: (request: Request, response: Response) => Promise<void>;
  delete: (request: Request, response: Response) => Promise<void>;
};

const routes = (router: Router, endpoint: string, controller: TController) => {
  return router
    .post(endpoint, controller.create)
    .get(`${endpoint}/:id?`, controller.read)
    .patch(`${endpoint}/:id?`, controller.update)
    .delete(`${endpoint}/:id?`, controller.delete);
};

export const router = (endpoint: string, controller: TController) => {
  return routes(Router(), endpoint, controller);
};

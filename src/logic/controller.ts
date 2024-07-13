import { Request, Response } from "express";
import { TService } from "./service";

export type TypeArrayNull<T> = T | T[] | null;

const control = async <T>(response: Response, data: Promise<T>) => {
  try {
    response.status(200).json({ success: true, message: await data });
  } catch (error) {
    response.status(500).json({ success: false, message: error });
  }
};

const set =
  <T>(service: TService<T>) =>
  async (request: Request, response: Response) => {
    control<T>(response, service.create({ payload: request.body }));
  };

const get =
  <T>(service: TService<T>) =>
  async (request: Request, response: Response) => {
    request.params.id
      ? control<TypeArrayNull<T>>(
          response,
          service.read({ id: Number(request.params.id) })
        )
      : request.query
      ? control<TypeArrayNull<T>>(
          response,
          service.read({ query: request.query })
        )
      : request.body
      ? control<TypeArrayNull<T>>(
          response,
          service.read({ body: request.body })
        )
      : control<TypeArrayNull<T>>(response, service.read({}));
  };

const put =
  <T>(service: TService<T>) =>
  async (request: Request, response: Response) => {
    control<T | null>(
      response,
      service.update({
        id: Number(request.params.id || request.body.id),
        payload: request.body,
      })
    );
  };

const cut =
  <T>(service: TService<T>) =>
  async (request: Request, response: Response) => {
    control<T | null>(
      response,
      service.delete({ id: Number(request.params.id || request.body.id) })
    );
  };

export const controller = <T>(service: TService<T>) => ({
  create: set<T>(service),
  read: get<T>(service),
  update: put<T>(service),
  delete: cut<T>(service),
});

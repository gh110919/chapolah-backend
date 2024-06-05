import { Request, Response } from "express";

export type TService<T> = {
  create: (data: T) => Promise<T>;
  read: (id?: number, query?: any, body?: any) => Promise<T | T[] | null>;
  update: (id: number, data: T) => Promise<T | null>;
  delete: (id: number) => Promise<T | null>;
};

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
    control<T>(response, service.create(request.body));
  };

const get =
  <T>(service: TService<T>) =>
  async (request: Request, response: Response) => {
    request.params.id
      ? control<T | T[] | null>(
          response,
          service.read(Number(request.params.id), undefined, undefined)
        )
      : request.query
      ? control<T | T[] | null>(
          response,
          service.read(undefined, request.query, undefined)
        )
      : request.body
      ? control<T | T[] | null>(
          response,
          service.read(undefined, undefined, request.body)
        )
      : control<T | T[] | null>(response, service.read());
  };

const put =
  <T>(service: TService<T>) =>
  async (request: Request, response: Response) => {
    control<T | null>(
      response,
      service.update(Number(request.params.id || request.body.id), request.body)
    );
  };

const cut =
  <T>(service: TService<T>) =>
  async (request: Request, response: Response) => {
    control<T | null>(
      response,
      service.delete(Number(request.params.id || request.body.id))
    );
  };

export const controller = <T>(service: TService<T>) => ({
  create: set<T>(service),
  read: get<T>(service),
  update: put<T>(service),
  delete: cut<T>(service),
});

import { db } from "../database/db-middleware";
import { TypeArrayNull } from "./controller";

export type TCreate<T> = { payload: T };
export type TRead = { id?: number; query?: any; body?: any };
export type TUpdate<T> = { id: number; payload: T };
export type TDelete = { id: number };

export type TModel<T> = {
  create: ({ payload }: TCreate<T>) => Promise<T>;
  read: ({ id, query, body }: TRead) => Promise<TypeArrayNull<T>>;
  update: ({ id, payload }: TUpdate<T>) => Promise<T | null>;
  delete: ({ id }: TDelete) => Promise<T | null>;
};

const set =
  <T>(table: string) =>
  async ({ payload }: TCreate<T>): Promise<T> => {
    const [id] = await db(table).insert(payload);
    return { id, ...payload };
  };

const get =
  <T>(table: string) =>
  async ({ id, query, body }: TRead): Promise<TypeArrayNull<T>> => {
    return id
      ? db(table).where({ id }).first()
      : query
      ? db(table).where(query).first()
      : body
      ? db(table).where(body).first()
      : db(table).select();
  };

const put =
  <T>(table: string) =>
  async ({ id, payload }: TUpdate<T>): Promise<T | null> => {
    await db(table).where({ id }).update(payload);
    return db(table).where({ id }).first();
  };

const cut =
  <T>(table: string) =>
  async ({ id }: TDelete): Promise<T | null> => {
    const item = await db(table).where({ id }).first();
    await db(table).where({ id }).delete();
    return item;
  };

export const model = <T>(table: string): TModel<T> => ({
  create: set<T>(table),
  read: get<T>(table),
  update: put<T>(table),
  delete: cut<T>(table),
});

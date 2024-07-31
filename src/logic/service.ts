import {
  TCreate,
  TDelete,
  TModel,
  TRead,
  TUpdate,
  TypeArrayNull,
} from "./model";

export type TService<T> = {
  create: ({ payload }: TCreate<any>) => Promise<T>;
  read: ({ id, query, body }: TRead) => Promise<TypeArrayNull<T>>;
  update: ({ id, payload }: TUpdate<any>) => Promise<T | null>;
  delete: ({ id }: TDelete) => Promise<T | null>;
};

const set =
  <T>(model: TModel<T>) =>
  async ({ payload }: TCreate<T>) =>
    model.create({ payload });

const get =
  <T>(model: TModel<T>) =>
  async ({ id, query, body }: TRead) => {
    return id
      ? model.read({ id })
      : query
      ? model.read({ query })
      : body
      ? model.read({ body })
      : model.read({});
  };

const put =
  <T>(model: TModel<T>) =>
  async ({ id, payload }: TUpdate<T>) => {
    return model.update({ id, payload });
  };

const cut =
  <T>(model: TModel<T>) =>
  async ({ id }: TDelete) => {
    if (!id) {
      throw new Error("не указан id");
    }
    return model.delete({ id });
  };

export const service = <T>(model: TModel<T>) => ({
  create: set<T>(model),
  read: get<T>(model),
  update: put<T>(model),
  delete: cut<T>(model),
});

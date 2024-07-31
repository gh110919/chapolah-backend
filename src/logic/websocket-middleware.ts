import { WebSocket } from "ws";
import { model, TypeArrayNull } from "./model";
import { service, TService } from "./service";
import http from "http";

export const websocketMiddleware = (server: http.Server) => {
  const ws = new WebSocket.Server({ server });

  type TActions = "create" | "read" | "update" | "delete";
  type TMessage = { action: TActions; table?: string; payload?: any };
  type TPayload = { success: boolean; message: any };

  const serializing = (payload: TPayload) => {
    return JSON.stringify(payload);
  };

  const structuring = (message: string): TMessage => {
    return JSON.parse(message);
  };

  const wsController = <T>(
    { action, payload }: TMessage,
    service: TService<T>
  ) => {
    return new Promise<TypeArrayNull<T>>((resolve, reject) => {
      action === "create"
        ? resolve(service.create({ payload }))
        : action === "read"
        ? resolve(service.read({ body: payload }))
        : action === "update"
        ? resolve(service.update({ id: payload.id, payload }))
        : action === "delete"
        ? resolve(service.delete({ id: payload.id }))
        : reject(null);
    });
  };

  try {
    ws.on("connection", (connection) => {
      const sending = (payload: TPayload) =>
        connection.send(serializing(payload));

      connection.on("message", (message: string) => {
        const data = structuring(message);

        wsController(data, service(model(data.table!)))
          .then((r) =>
            sending({
              success: true,
              message: r,
            })
          )
          .catch((e) => {
            sending({
              success: false,
              message: `Исключение вебсокет-контроллера: ${e}`,
            });
            console.error(`Исключение вебсокет-контроллера: ${e}`);
          });
      });

      connection.on("error", (error: Error) => {
        sending({ success: false, message: error });
      });

      connection.on("close", (code, reason) => {
        sending({ success: false, message: { code, reason } });
      });
    });
  } catch (error) {
    console.error(`Исключение вебсокет-сервера: ${error}`);
  }
};

import { WebSocket } from "ws";
import { model } from "./model";
import { service, TService } from "./service";

export const websocketMiddleware = (() => {
  const ws = new WebSocket.Server({ port: 81 });

  type TActions = "create" | "read" | "update" | "delete";
  type TMessage = { action: TActions; table?: string; payload: any };
  type TPayload = { success: boolean; message: any };

  const serializing = (payload: TPayload) => {
    return JSON.stringify(payload);
  };

  const structuring = (message: string): TMessage => {
    return JSON.parse(message);
  };

  const wsController = async <T>(
    { action, payload }: TMessage,
    service: TService<T>
  ) => {
    return action === "create"
      ? await service.create({ payload })
      : action === "read"
      ? await service.read({ body: payload })
      : action === "update"
      ? await service.update({ id: payload.id, payload })
      : action === "delete"
      ? await service.delete({ id: payload.id })
      : null;
  };

  try {
    ws.on("connection", (connection) => {
      const sending = (payload: any) => connection.send(serializing(payload));

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
})();

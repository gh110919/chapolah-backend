import { db } from "./db-middleware";

(async () => {
  try {
    await db.schema.dropTable("matches_preporations");
    await db.schema.dropTable("players");
    await db.schema.dropTable("match_events");

    console.log("Таблицы успешно удалены!");
  } catch (error) {
    console.error("Ошибка при удалении таблиц:", error);
  }
})();

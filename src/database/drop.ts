import { db } from "./db-middleware";

(async () => {
  try {
    await db.schema.dropTableIfExists("matches_preporations");
    await db.schema.dropTableIfExists("players");
    await db.schema.dropTableIfExists("match_events");

    console.log("Таблицы успешно удалены!");
  } catch (error) {
    console.error("Ошибка при удалении таблиц:", error);
  }
})();

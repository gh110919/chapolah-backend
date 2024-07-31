import { db } from "./db-middleware";
import { time } from "./migrate";

(async () => {
  try {
    // await db.schema.dropTableIfExists("matches_preporations");
    // await db.schema.dropTableIfExists("players");
    // await db.schema.dropTableIfExists("match_events");
    // await db.schema.dropTableIfExists("teams");
    // await db.schema.dropTableIfExists("table_events");
    await db.schema.dropTableIfExists("users");
    // await db.schema.dropTableIfExists("matches");
    console.log(`Таблицы успешно удалены! Время обновления: ${time}`);
  } catch (error) {
    console.error("Исключение при удалении таблиц:", error);
  }
})();

import { Knex } from "knex";
import { db } from "./db-middleware";

(async () => {
  try {
    await db.schema.createTable(
      "matches_preporations",
      (table: Knex.CreateTableBuilder) => {
        table.increments("id").primary();
        table.integer("sport_type");
        table.integer("division");
        table.string("location");
        table.dateTime("date");
      }
    );

    await db.schema.createTable("players", (table: Knex.CreateTableBuilder) => {
      table.increments("id").primary();
      table.string("fio");
      table.string("username");
      table.dateTime("date");
      table.string("team");
    });

    await db.schema.createTable(
      "match_events",
      (table: Knex.CreateTableBuilder) => {
        table.increments("id").primary();
        table.integer("event_id");
        table.integer("event_date");
        table.integer("event_type");
        table.integer("team_id");
        table.integer("player_id");
      }
    );

    console.log("Таблицы успешно созданы!");
  } catch (error) {
    console.error("Ошибка при создании таблиц:", error);
  }
})();

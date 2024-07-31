import { Knex } from "knex";
import { db } from "./db-middleware";

const date = new Date();

const format = {
  hours: date.getHours().toString().padStart(2, "0"),
  minutes: date.getMinutes().toString().padStart(2, "0"),
  seconds: date.getSeconds().toString().padStart(2, "0"),
};

export const time = `${format.hours}:${format.minutes}:${format.seconds}`;

(async () => {
  try {
    /* подготовка к мероприятиям */
    await db.schema.createTableIfNotExists(
      "matches_preporations",
      (table: Knex.CreateTableBuilder) => {
        table.string("id");
        table.integer("sport_type");
        table.integer("division");
        table.string("location");
        table.dateTime("date");
      }
    );
    /* игроки */
    await db.schema.createTableIfNotExists(
      "players",
      (table: Knex.CreateTableBuilder) => {
        table.string("id");
        table.string("avatar");
        table.string("fio");
        table.string("nickname");
        table.string("team");
      }
    );
    /* мероприятия */
    await db.schema.createTableIfNotExists(
      "match_events",
      (table: Knex.CreateTableBuilder) => {
        table.string("id");
        table.integer("event_id");
        table.integer("event_date");
        table.integer("event_type");
        table.integer("team_id");
        table.integer("player_id");
      }
    );
    /* команды */
    await db.schema.createTableIfNotExists(
      "teams",
      (table: Knex.CreateTableBuilder) => {
        table.string("id");
        table.string("firstTeam");
        table.string("secondTeam");
      }
    );
    /* табличные события */
    await db.schema.createTableIfNotExists(
      "table_events",
      (table: Knex.CreateTableBuilder) => {
        table.string("id");
        table.string("time");
        table.string("period_time");
        table.string("event");
        table.string("team");
        table.string("gamer");
      }
    );
    /* пользователи */
    await db.schema.createTableIfNotExists(
      "users",
      (table: Knex.CreateTableBuilder) => {
        table.string("id");
        table.string("username");
        table.string("password");
        table.string("role");
        table.string("access_token");
        table.string("refresh_token");
        table.string("access_key");
        table.string("refresh_key");
      }
    );
    /* матчи */
    await db.schema.createTableIfNotExists(
      "matches",
      (table: Knex.CreateTableBuilder) => {
        table.string("id");
        table.string("sport");
        table.string("division");
        table.string("scout");
        table.string("sity");
        table.string("venue");
        table.string("date");
      }
    );
    /* удаления */
    await db.schema.createTableIfNotExists(
      "removing",
      (table: Knex.CreateTableBuilder) => {
        table.string("id");
        table.string("team");
        table.string("time");
      }
    );

    console.log(`Таблицы успешно созданы! Время обновления: ${time}`);
  } catch (error) {
    console.error("Исключение при создании таблиц:", error);
  }
})();

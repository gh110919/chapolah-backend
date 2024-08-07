export type Endpoint = {
  endpoint: string;
  table: string;
};

export const endpoints: Endpoint[] = [
  {
    endpoint: "/matches_preporations",
    table: "matches_preporations",
  },
  {
    endpoint: "/players",
    table: "players",
  },
  {
    endpoint: "/match_events",
    table: "match_events",
  },
  {
    endpoint: "/teams",
    table: "teams",
  },
  {
    endpoint: "/users",
    table: "users",
  },
  {
    endpoint: "/table_events",
    table: "table_events",
  },
  {
    endpoint: "/matches",
    table: "matches",
  },
];

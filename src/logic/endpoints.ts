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
];



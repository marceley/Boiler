// app/lib/graphql.server.ts
import { GraphQLClient } from "graphql-request";

export const gqlClient = new GraphQLClient(process.env.GRAPHQL_API_URL!, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${process.env.GRAPHQL_API_TOKEN}`,
  },
});

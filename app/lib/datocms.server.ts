import { GraphQLClient } from "graphql-request";

export const datocmsClient = new GraphQLClient("https://graphql.datocms.com/", {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.DATOCMS_READONLY_TOKEN}`,
  },
});

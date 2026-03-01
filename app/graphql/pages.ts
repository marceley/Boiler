// pages.server.ts
import { gql } from "graphql-request";
import { gqlClient } from "~/lib/graphql.server";

export async function getAboutPage() {
  return gqlClient.request(gql`
    query {
      pages(where: { id: 41 }) {
        nodes {
          title
          content
          databaseId
        }
      }
    }
  `);
}

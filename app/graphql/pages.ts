// pages.server.ts
import { gql } from "graphql-request";
import { gqlClient, getContentStatus } from "~/lib/graphql.server";

const PAGE_QUERY_PUBLISH = gql`
  query GetAboutPagePublish {
    pages(where: { id: 41, status: PUBLISH }) {
      nodes {
        title
        content
        databaseId
      }
    }
  }
`;

const PAGE_QUERY_STATI = gql`
  query GetAboutPageStati {
    pages(where: { id: 41, stati: [DRAFT, PUBLISH] }) {
      nodes {
        title
        content
        databaseId
      }
    }
  }
`;

export async function getAboutPage() {
  const contentStatus = getContentStatus();
  const query =
    "status" in contentStatus ? PAGE_QUERY_PUBLISH : PAGE_QUERY_STATI;
  return gqlClient.request(query);
}

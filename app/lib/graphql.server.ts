// app/lib/graphql.server.ts
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.VERCEL_ENV === "production";

/** PUBLISH in production; stati [DRAFT, PUBLISH] in preview and dev. */
export function getContentStatus():
  | { status: "PUBLISH" }
  | { stati: ["DRAFT", "PUBLISH"] } {
  return isProduction ? { status: "PUBLISH" } : { stati: ["DRAFT", "PUBLISH"] };
}

/** Basic auth for WordPress Application Passwords (required to view drafts). */
function getAuthHeaders(): Record<string, string> {
  if (isProduction) return {};
  const username = process.env.GRAPHQL_API_USERNAME;
  const token = process.env.GRAPHQL_API_TOKEN;
  if (!username || !token) return {};
  const encoded = Buffer.from(
    `${username}:${token.replace(/\s/g, "")}`,
    "utf-8",
  ).toString("base64");
  return { Authorization: `Basic ${encoded}` };
}

export const gqlClient = new GraphQLClient(process.env.GRAPHQL_API_URL!, {
  headers: {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  },
});

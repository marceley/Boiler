import { gql } from "graphql-request";
import { datocmsClient } from "~/lib/datocms.server";

/**
 * Fetches the About page from DatoCMS.
 * Uses the singular page query with slug filter.
 */
type PageResult = {
  page?: {
    title?: string | null;
    slug?: string | null;
    content?: string | null;
  } | null;
};

const ABOUT_PAGE_QUERY = gql`
  query AboutPage {
    page(filter: { slug: { eq: "about" } }) {
      title
      slug
      content
    }
  }
`;

export type AboutPage = {
  title: string;
  slug: string;
  content: string;
};

export async function getAboutPage(): Promise<AboutPage> {
  try {
    const result = await datocmsClient.request<PageResult>(ABOUT_PAGE_QUERY);
    const page = result.page;
    if (!page) {
      return { title: "About", slug: "about", content: "" };
    }
    return {
      title: page.title ?? "About",
      slug: page.slug ?? "about",
      content: page.content ?? "",
    };
  } catch {
    return { title: "About", slug: "about", content: "" };
  }
}

import { gql } from "graphql-request";
import { gqlClient } from "~/lib/graphql.server";

/* ----------------------------- */
/* Raw WPGraphQL response types  */
/* ----------------------------- */

type WpNodeConnection<T> = { nodes: T[] };

type WpArtistNode = {
  fieldsArtist?: {
    firstName?: string | null;
    lastName?: string | null;
  } | null;
};

type WpImageNode = {
  file?: string | null;
  filePath?: string | null;
  fileSize?: number | null;
};

type WpWorkNode = {
  title?: string | null;
  fieldsWork?: {
    description?: string | null;
    sizeinfo?: string | null;
    year?: number | null;
    photographer?: string | null;
    image?: {
      node?: WpImageNode | null;
    } | null;
  } | null;
};

type WpViewNode = {
  title?: string | null;
  fieldsView?: {
    copyright?: string | null;
    photographer?: string | null;
    image?: {
      node?: WpImageNode | null;
    } | null;
  } | null;
};

type WpExhibitionNode = {
  databaseId: number;
  slug?: string | null;
  title?: string | null;
  fieldsExhibition?: {
    isCurrentExhibition?: boolean | null;
    description?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    artists?: WpNodeConnection<WpArtistNode> | null;
    works?: WpNodeConnection<WpWorkNode> | null;
    views?: WpNodeConnection<WpViewNode> | null;
  } | null;
};

type WpAllExhibitionQueryResult = {
  allExhibition: WpNodeConnection<WpExhibitionNode>;
};

/* ----------------------------- */
/* Domain types (UI-friendly)    */
/* ----------------------------- */

export type Artist = {
  firstName: string;
  lastName: string;
  fullName: string;
};

export type WorkImage = {
  file: string | null;
  filePath: string | null;
  url: string | null;
  fileSize: number | null;
};

export type ViewImage = {
  file: string | null;
  filePath: string | null;
  url: string | null;
  fileSize: number | null;
};

export type Work = {
  title: string;
  description: string | null;
  sizeInfo: string | null;
  year: number | null;
  photographer: string | null;
  image: WorkImage | null;
};

export type View = {
  title: string;
  copyright: string | null;
  photographer: string | null;
  image: ViewImage | null;
};

export type Exhibition = {
  id: number; // databaseId
  slug: string;
  title: string;
  description: string | null;
  isCurrentExhibition: boolean;
  startDate: string | null;
  endDate: string | null;
  artists: Artist[];
  works: Work[];
  views: View[];
};

/* ----------------------------- */
/* Normalizers                   */
/* ----------------------------- */

const str = (v: unknown, fallback = "") =>
  typeof v === "string" ? v : fallback;
const nstr = (v: unknown) => (typeof v === "string" ? v : null);
const nnum = (v: unknown) =>
  typeof v === "number" && Number.isFinite(v) ? v : null;
const bool = (v: unknown, fallback = false) =>
  typeof v === "boolean" ? v : fallback;

function normalizeArtist(node: WpArtistNode): Artist {
  const firstName = str(node.fieldsArtist?.firstName);
  const lastName = str(node.fieldsArtist?.lastName);
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

  return { firstName, lastName, fullName };
}

function normalizeView(node: WpViewNode): View {
  const fw = node.fieldsView;
  const img = fw?.image?.node;

  return {
    title: str(node.title),
    copyright: nstr(fw?.copyright),
    photographer: nstr(fw?.photographer),
    image: img
      ? {
          file: nstr(img.file),
          filePath: nstr(img.filePath),
          url:
            img.filePath && process.env.IMAGE_CDN_URL
              ? `${process.env.IMAGE_CDN_URL.replace(/\/$/, "")}/${img.filePath.replace(/^\//, "")}`
              : null,
          fileSize: nnum(img.fileSize),
        }
      : null,
  };
}

function normalizeWork(node: WpWorkNode): Work {
  const fw = node.fieldsWork;
  const img = fw?.image?.node;

  // Prefer ACF title, fallback to WP title, else empty string
  return {
    title: str(node.title),
    description: nstr(fw?.description),
    sizeInfo: nstr(fw?.sizeinfo),
    year: nnum(fw?.year),
    photographer: nstr(fw?.photographer),
    image: img
      ? {
          file: nstr(img.file),
          filePath: nstr(img.filePath),
          url:
            img.filePath && process.env.IMAGE_CDN_URL
              ? `${process.env.IMAGE_CDN_URL.replace(/\/$/, "")}/${img.filePath.replace(/^\//, "")}`
              : null,
          fileSize: nnum(img.fileSize),
        }
      : null,
  };
}

function normalizeExhibition(node: WpExhibitionNode): Exhibition {
  const fx = node.fieldsExhibition;

  const artists = (fx?.artists?.nodes ?? []).map(normalizeArtist);
  const works = (fx?.works?.nodes ?? []).map(normalizeWork);
  const views = (fx?.views?.nodes ?? []).map(normalizeView);

  const slug = str(node.slug) || `exhibition-${node.databaseId}`;

  return {
    id: node.databaseId,
    slug,
    title: str(node.title),
    description: nstr(fx?.description),
    isCurrentExhibition: bool(fx?.isCurrentExhibition, false),
    startDate: nstr(fx?.startDate),
    endDate: nstr(fx?.endDate),
    artists,
    works,
    views,
  };
}

/* ----------------------------- */
/* Query + fetch                 */
/* ----------------------------- */

const EXHIBITIONS_QUERY = gql`
  query Exhibitions {
    allExhibition(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        databaseId
        slug
        title
        fieldsExhibition {
          isCurrentExhibition
          description
          startDate
          endDate
          artists {
            nodes {
              ... on Artist {
                fieldsArtist {
                  firstName
                  lastName
                }
              }
            }
          }
          works {
            nodes {
              ... on Work {
                title
                fieldsWork {
                  description
                  sizeinfo
                  year
                  photographer
                  image {
                    node {
                      file
                      filePath
                      fileSize
                    }
                  }
                }
              }
            }
          }
          views {
            nodes {
              ... on View {
                title
                fieldsView {
                  copyright
                  photographer
                  image {
                    node {
                      file
                      filePath
                      fileSize
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchAllExhibitionsRaw(): Promise<WpAllExhibitionQueryResult> {
  return gqlClient.request<WpAllExhibitionQueryResult>(EXHIBITIONS_QUERY);
}

/* ----------------------------- */
/* Public API                    */
/* ----------------------------- */

export async function getAllExhibitions(): Promise<Exhibition[]> {
  const raw = await fetchAllExhibitionsRaw();
  return (raw.allExhibition?.nodes ?? []).map(normalizeExhibition);
}

export async function getCurrentExhibition(): Promise<Exhibition | null> {
  const exhibitions = await getAllExhibitions();
  return exhibitions.find((e) => e.isCurrentExhibition) ?? null;
}

export async function getExhibitionBySlug(
  slug: string,
): Promise<Exhibition | null> {
  const exhibitions = await getAllExhibitions();
  return (
    exhibitions.find((e) => e.slug.toLowerCase() === slug.toLowerCase()) ?? null
  );
}

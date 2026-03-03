import { gql } from "graphql-request";
import { datocmsClient } from "~/lib/datocms.server";

/* ----------------------------- */
/* Raw DatoCMS response types    */
/* ----------------------------- */

type DatocmsImageNode = {
  alt?: string | null;
  copyright?: string | null;
  url?: string | null;
};

type DatocmsArtistNode = {
  firstName?: string | null;
  lastName?: string | null;
};

type DatocmsWorkNode = {
  title?: string | null;
  description?: string | null;
  image?: DatocmsImageNode | null;
};

type DatocmsViewNode = {
  title?: string | null;
  image?: DatocmsImageNode | null;
};

type DatocmsExhibitionNode = {
  slug?: string | null;
  title?: string | null;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  artists?: DatocmsArtistNode[];
  works?: DatocmsWorkNode[];
  views?: DatocmsViewNode[];
};

type DatocmsAllExhibitionsResult = {
  allExhibitions: DatocmsExhibitionNode[];
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
  url: string | null;
  fileSize: number | null;
};

export type ViewImage = {
  file: string | null;
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
  id: string;
  slug: string;
  title: string;
  description: string | null;
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

function normalizeArtist(node: DatocmsArtistNode): Artist {
  const firstName = str(node.firstName);
  const lastName = str(node.lastName);
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  return { firstName, lastName, fullName };
}

function normalizeWork(node: DatocmsWorkNode): Work {
  const copyright = node.image?.copyright ?? null;
  return {
    title: str(node.title),
    description: nstr(node.description),
    sizeInfo: null,
    year: null,
    photographer: nstr(copyright),
    image: node.image
      ? {
          file: null,
          url: nstr(node.image.url),
          fileSize: null,
        }
      : null,
  };
}

function normalizeView(node: DatocmsViewNode): View {
  const copyright = node.image?.copyright ?? null;
  return {
    title: str(node.title),
    copyright: nstr(copyright),
    photographer: nstr(copyright),
    image: node.image
      ? {
          file: null,
          url: nstr(node.image.url),
          fileSize: null,
        }
      : null,
  };
}

function normalizeExhibition(node: DatocmsExhibitionNode): Exhibition {
  const slug = str(node.slug);
  if (!slug) {
    throw new Error(`Exhibition "${node.title ?? "unknown"}" is missing slug`);
  }
  return {
    id: slug,
    slug,
    title: str(node.title),
    description: nstr(node.description),
    startDate: nstr(node.startDate),
    endDate: nstr(node.endDate),
    artists: (node.artists ?? []).map(normalizeArtist),
    works: (node.works ?? []).map(normalizeWork),
    views: (node.views ?? []).map(normalizeView),
  };
}

/* ----------------------------- */
/* Query + fetch                 */
/* ----------------------------- */

const EXHIBITIONS_QUERY = gql`
  query AllExhibitions {
    allExhibitions {
      slug
      title
      description
      startDate
      endDate
      artists {
        firstName
        lastName
      }
      works {
        title
        description
        image {
          alt
          copyright
          url
        }
      }
      views {
        title
        image {
          alt
          copyright
          url
        }
      }
    }
  }
`;

async function fetchAllExhibitions(): Promise<Exhibition[]> {
  const result = await datocmsClient.request<DatocmsAllExhibitionsResult>(
    EXHIBITIONS_QUERY,
  );
  const nodes = result.allExhibitions ?? [];
  return nodes.map(normalizeExhibition);
}

/* ----------------------------- */
/* Public API                    */
/* ----------------------------- */

export async function getAllExhibitions(): Promise<Exhibition[]> {
  return fetchAllExhibitions();
}

/** True if today falls within the exhibition's start/end date range. */
function isExhibitionCurrent(e: Exhibition): boolean {
  const today = toDateOnly(new Date());
  const start = e.startDate ? toDateOnly(new Date(e.startDate)) : null;
  const end = e.endDate ? toDateOnly(new Date(e.endDate)) : null;
  if (start && end) return start <= today && today <= end;
  if (start) return today >= start;
  if (end) return today <= end;
  return false;
}

/** True if the exhibition has ended (endDate is in the past). */
function isExhibitionPast(e: Exhibition): boolean {
  if (!e.endDate) return false;
  const today = toDateOnly(new Date());
  const end = toDateOnly(new Date(e.endDate));
  return today > end;
}

function toDateOnly(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function getCurrentExhibition(): Promise<Exhibition | null> {
  const exhibitions = await getAllExhibitions();
  return exhibitions.find(isExhibitionCurrent) ?? null;
}

export async function getExhibitionBySlug(
  slug: string,
): Promise<Exhibition | null> {
  const exhibitions = await getAllExhibitions();
  return (
    exhibitions.find((e) => e.slug.toLowerCase() === slug.toLowerCase()) ?? null
  );
}

/** Exhibitions that have ended (endDate in the past), most recent first. */
export async function getArchivedExhibitions(): Promise<Exhibition[]> {
  const exhibitions = await getAllExhibitions();
  return exhibitions.filter(isExhibitionPast).sort((a, b) => {
    const endA = a.endDate ?? "";
    const endB = b.endDate ?? "";
    return endB.localeCompare(endA);
  });
}

import type { Route } from "./+types/exhibitions.archive";
import { galleryData } from "~/data/gallery";
import { Navigation } from "~/components/Navigation";
import { useLoaderData, Link } from "react-router";
import { getAllExhibitions } from "~/models/exhibitions.server";
import { formatDateRangeShort } from "~/lib/date";

const baseUrl = `${galleryData.url}/exhibitions/archive`;

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Archive - ${galleryData.siteName}` },
    {
      name: "description",
      content: `Past exhibitions and archive at ${galleryData.name}. ${galleryData.description}`,
    },
    { name: "keywords", content: galleryData.keywords },

    // Open Graph
    { property: "og:site_name", content: galleryData.siteName },
    { property: "og:title", content: `Archive - ${galleryData.siteName}` },
    {
      property: "og:description",
      content: `Past exhibitions and archive at ${galleryData.name}. ${galleryData.description}`,
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: baseUrl },
    { property: "og:image", content: galleryData.ogImage },
    { property: "og:image:alt", content: galleryData.ogImageAlt },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "en_DK" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Archive - ${galleryData.siteName}` },
    {
      name: "twitter:description",
      content: `Past exhibitions and archive at ${galleryData.name}. ${galleryData.description}`,
    },
    { name: "twitter:image", content: galleryData.ogImage },
    { name: "twitter:image:alt", content: galleryData.ogImageAlt },

    // Canonical
    { tagName: "link", rel: "canonical", href: baseUrl },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const exhibitions = await getAllExhibitions();
  return { exhibitions };
}

export default function Archive() {
  const { exhibitions } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <Navigation />

      <main role="main" className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {exhibitions.map((exhibition) => {
            const imageUrl =
              exhibition.views[0]?.image?.url ??
              exhibition.works[0]?.image?.url;

            return (
              <Link
                key={exhibition.id}
                to={`/exhibitions/${exhibition.slug}`}
                className="flex flex-col text-sm text-black hover:opacity-80 transition-opacity"
              >
                <div className="w-full aspect-4/3 bg-[#ebebeb] overflow-hidden flex items-center justify-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={exhibition.title}
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </div>
                <div className="mt-4 space-y-1">
                  <p className="font-medium">
                    {exhibition.artists.map((a) => a.fullName).join(" & ")}
                  </p>
                  <p className="italic">{exhibition.title}</p>
                  {formatDateRangeShort(
                    exhibition.startDate,
                    exhibition.endDate,
                  ) && (
                    <p className="text-black/70">
                      {formatDateRangeShort(
                        exhibition.startDate,
                        exhibition.endDate,
                      )}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

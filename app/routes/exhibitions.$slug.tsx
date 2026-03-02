import type { Route } from "./+types/exhibitions.$slug";
import { galleryData } from "~/data/gallery";
import { Navigation } from "~/components/Navigation";
import { useLoaderData } from "react-router";
import { getExhibitionBySlug } from "~/models/exhibitions.server";
import { ViewsCarousel } from "~/components/ViewsCarousel";
import { ImageBox } from "~/components/ImageBox";
import { ExhibitionHeader } from "~/components/ExhibitionHeader";
import { ExhibitionDescription } from "~/components/ExhibitionDescription";
import { WorksGrid } from "~/components/WorksGrid";
import { WorksOverlay } from "~/components/WorksOverlay";
import { useState } from "react";

export function meta({ data }: Route.MetaArgs) {
  if (!data?.exhibition) {
    return [{ title: `Exhibition - ${galleryData.siteName}` }];
  }
  const { exhibition } = data;
  const baseUrl = `${galleryData.url}/exhibitions/${exhibition.slug}`;
  return [
    { title: `${exhibition.title} - ${galleryData.siteName}` },
    {
      name: "description",
      content:
        exhibition.description ?? `${exhibition.title} at ${galleryData.name}`,
    },
    { name: "keywords", content: galleryData.keywords },

    // Open Graph
    { property: "og:site_name", content: galleryData.siteName },
    { property: "og:title", content: exhibition.title },
    {
      property: "og:description",
      content:
        exhibition.description ?? `${exhibition.title} at ${galleryData.name}`,
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
    { name: "twitter:title", content: exhibition.title },
    {
      name: "twitter:description",
      content:
        exhibition.description ?? `${exhibition.title} at ${galleryData.name}`,
    },
    { name: "twitter:image", content: galleryData.ogImage },
    { name: "twitter:image:alt", content: galleryData.ogImageAlt },

    // Canonical
    { tagName: "link", rel: "canonical", href: baseUrl },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const exhibition = await getExhibitionBySlug(params.slug);
  console.log(exhibition?.views[0]?.image);
  if (!exhibition) {
    throw new Response("Not Found", { status: 404 });
  }
  return { exhibition };
}

export default function ExhibitionDetail() {
  const { exhibition } = useLoaderData<typeof loader>();
  const [worksOverlayIndex, setWorksOverlayIndex] = useState<number | null>(
    null,
  );

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <Navigation />

      <main role="main" className="mt-12">
        {exhibition.views.length > 1 ? (
          <ViewsCarousel views={exhibition.views} />
        ) : exhibition.views.length === 1 ? (
          <div className="w-full lg:max-w-[75%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <ImageBox
              src={exhibition.views[0].image?.url}
              alt={exhibition.views[0].title}
            />
          </div>
        ) : null}
        <ExhibitionHeader
          artists={exhibition.artists}
          title={exhibition.title}
          startDate={exhibition.startDate}
          endDate={exhibition.endDate}
          dateFormat="long"
        />
        <ExhibitionDescription html={exhibition.description ?? ""} />
        <WorksGrid
          works={exhibition.works}
          onWorkClick={setWorksOverlayIndex}
        />
        {worksOverlayIndex !== null && (
          <WorksOverlay
            works={exhibition.works}
            selectedIndex={worksOverlayIndex}
            onClose={() => setWorksOverlayIndex(null)}
          />
        )}
      </main>
    </div>
  );
}

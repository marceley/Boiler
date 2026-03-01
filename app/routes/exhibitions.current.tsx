import type { Route } from "./+types/exhibitions.current";
import { galleryData } from "~/data/gallery";
import { Navigation } from "~/components/Navigation";
import { useLoaderData } from "react-router";
import { getCurrentExhibition } from "~/models/exhibitions.server";
import { formatDateRangeEn } from "~/lib/date";
import { WorksOverlay } from "~/components/WorksOverlay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

const baseUrl = `${galleryData.url}/exhibitions/current`;

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Current - ${galleryData.siteName}` },
    {
      name: "description",
      content: `Current exhibitions at ${galleryData.name}. ${galleryData.description}`,
    },
    { name: "keywords", content: galleryData.keywords },

    // Open Graph
    { property: "og:site_name", content: galleryData.siteName },
    { property: "og:title", content: `Current - ${galleryData.siteName}` },
    {
      property: "og:description",
      content: `Current exhibitions at ${galleryData.name}. ${galleryData.description}`,
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
    { name: "twitter:title", content: `Current - ${galleryData.siteName}` },
    {
      name: "twitter:description",
      content: `Current exhibitions at ${galleryData.name}. ${galleryData.description}`,
    },
    { name: "twitter:image", content: galleryData.ogImage },
    { name: "twitter:image:alt", content: galleryData.ogImageAlt },

    // Canonical
    { tagName: "link", rel: "canonical", href: baseUrl },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const exhibition = await getCurrentExhibition();
  return { exhibition };
}

export default function Current() {
  const { exhibition } = useLoaderData<typeof loader>();
  const [worksOverlayIndex, setWorksOverlayIndex] = useState<number | null>(
    null,
  );
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    emblaApi?.on("init", () => {
      console.log("Embla initialized");
    });
  }, [emblaApi]);

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <Navigation />

      <main role="main" className="mt-12">
        {exhibition && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-12">
              <div id="views" className="embla">
                <div className="embla__viewport" ref={emblaRef}>
                  <div className="embla__container">
                    {exhibition.views.map((view, index) => (
                      <div className="embla__slide" key={view.title + index}>
                        <div className="w-full aspect-4/3 bg-[#ebebeb] overflow-hidden flex items-center justify-center">
                          {view.image?.url ? (
                            <img
                              src={view.image.url}
                              alt={view.title}
                              className="w-full h-full object-contain"
                            />
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="embla__prev" onClick={goToPrev}>
                  Scroll to prev
                </button>
                <button className="embla__next" onClick={goToNext}>
                  Scroll to next
                </button>
              </div>
            </div>
            <div
              id="artists"
              className="text-sm text-black leading-relaxed mb-8"
            >
              <h3>
                {exhibition.artists.map((a) => a.fullName).join(" &amp; ")}
              </h3>
              <div>{exhibition.title}</div>
              <div>
                {formatDateRangeEn(exhibition.startDate, exhibition.endDate)}
              </div>
            </div>
            <article
              className="mb-16 space-y-4 text-sm text-black leading-relaxed lg:columns-2 lg:gap-x-12"
              dangerouslySetInnerHTML={{ __html: exhibition.description ?? "" }}
            ></article>
            <div
              id="works"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
            >
              {exhibition.works.map((work, index) => (
                <button
                  key={work.title}
                  type="button"
                  onClick={() => setWorksOverlayIndex(index)}
                  className="flex flex-col text-left cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="w-full aspect-4/3 bg-[#ebebeb] overflow-hidden flex items-center justify-center">
                    {work.image?.url ? (
                      <img
                        src={work.image.url}
                        alt={work.title}
                        className="w-full h-full object-contain"
                      />
                    ) : null}
                  </div>
                  <div className="mt-2 text-xs text-black">
                    <h3 className="italic">{work.title}</h3>
                    {work.description && (
                      <div className="leading-relaxed">{work.description}</div>
                    )}
                    {work.year && <div>{work.year}</div>}
                    {work.sizeInfo && <div>{work.sizeInfo}</div>}
                  </div>
                </button>
              ))}
            </div>
            {worksOverlayIndex !== null && (
              <WorksOverlay
                works={exhibition.works}
                selectedIndex={worksOverlayIndex}
                onClose={() => setWorksOverlayIndex(null)}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

import type { Route } from "./+types/home";
import { galleryData, structuredData } from "~/data/gallery";
import { Navigation } from "~/components/Navigation";
import { EmailForm } from "~/components/EmailForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: galleryData.title },
    {
      name: "description",
      content: galleryData.shortDescription,
    },
    {
      name: "keywords",
      content: galleryData.keywords,
    },

    // Open Graph
    { property: "og:site_name", content: galleryData.siteName },
    {
      property: "og:title",
      content: galleryData.title,
    },
    {
      property: "og:description",
      content: galleryData.shortDescription,
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: galleryData.url },
    { property: "og:image", content: galleryData.ogImage },
    {
      property: "og:image:alt",
      content: galleryData.ogImageAlt,
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "en_DK" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: galleryData.title,
    },
    {
      name: "twitter:description",
      content: galleryData.shortDescription,
    },
    { name: "twitter:image", content: galleryData.ogImage },
    {
      name: "twitter:image:alt",
      content: galleryData.ogImageAlt,
    },

    // Canonical
    { tagName: "link", rel: "canonical", href: galleryData.url },
  ];
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen p-4 md:p-8 lg:p-12 flex flex-col">
        <Navigation className="mb-12" />
        <main
          role="main"
          className="flex-1 flex flex-col justify-center md:mx-auto w-full md:w-auto"
        >
          <div className="flex flex-col justify-center">
            <img
              src="/fingers.gif"
              alt="Boiler19"
              className="w-full h-auto block"
            />
            <div className="text-xs mt-2">&copy; 2026 Boiler</div>
          </div>
        </main>
      </div>
    </>
  );
}

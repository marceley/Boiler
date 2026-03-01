import type { Route } from "./+types/archive";
import { galleryData } from "~/data/gallery";
import { Navigation } from "~/components/Navigation";

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
    { property: "og:url", content: `${galleryData.url}/archive` },
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
    { tagName: "link", rel: "canonical", href: `${galleryData.url}/archive` },
  ];
}

export default function Archive() {
  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <Navigation />

      <main role="main" className="max-w-2xl mt-12">
        <article className="space-y-4 text-sm text-black">
          <h2 className="text-xl font-serif italic">Archive</h2>
          <p className="leading-relaxed">Past exhibitions coming soon.</p>
        </article>
      </main>
    </div>
  );
}

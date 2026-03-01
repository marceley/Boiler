import type { Route } from "./+types/current";
import { galleryData } from "~/data/gallery";
import { Navigation } from "~/components/Navigation";

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
    { property: "og:url", content: `${galleryData.url}/current` },
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
    { tagName: "link", rel: "canonical", href: `${galleryData.url}/current` },
  ];
}

export default function Current() {
  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <Navigation />

      <main role="main" className="max-w-2xl mt-12">
        <article className="space-y-4 text-sm text-black">
          <h2 className="text-xl font-serif italic">Current</h2>
          <p className="leading-relaxed">Current exhibitions coming soon.</p>
        </article>
      </main>
    </div>
  );
}

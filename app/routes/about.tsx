import type { Route } from "./+types/about";
import { galleryData, structuredDataAbout } from "~/data/gallery";
import { Navigation } from "~/components/Navigation";
import { EmailForm } from "~/components/EmailForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `About - ${galleryData.siteName}` },
    {
      name: "description",
      content: `Learn about ${galleryData.name}, ${galleryData.description}`,
    },
    { name: "keywords", content: galleryData.keywords },

    // Open Graph
    { property: "og:site_name", content: galleryData.siteName },
    { property: "og:title", content: `About - ${galleryData.siteName}` },
    {
      property: "og:description",
      content: `Learn about ${galleryData.name}, ${galleryData.description}`,
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${galleryData.url}/about` },
    { property: "og:image", content: galleryData.ogImage },
    { property: "og:image:alt", content: galleryData.ogImageAlt },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "en_DK" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `About - ${galleryData.siteName}` },
    {
      name: "twitter:description",
      content: `Learn about ${galleryData.name}, ${galleryData.description}`,
    },
    { name: "twitter:image", content: galleryData.ogImage },
    { name: "twitter:image:alt", content: galleryData.ogImageAlt },

    // Canonical
    { tagName: "link", rel: "canonical", href: `${galleryData.url}/about` },
  ];
}

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataAbout),
        }}
      />
      <div className="min-h-screen p-4 md:p-8 lg:p-12">
        <Navigation />

        <main role="main" className="max-w-2xl mt-12">
          <article className="space-y-4 text-sm text-black">
            <p className="leading-relaxed">
              Boiler is an underground gallery in Copenhagen by architect
              Kristian Eley and art historian Johanne Schrøder.
            </p>{" "}
            <p className="leading-relaxed">
              The program is focused on project-based artist collaborations and
              is shaped by curiosity, a sensibility to matter, and the meeting
              of generations. The first exhibitions will feature established
              Danish artists.
            </p>
          </article>
        </main>
      </div>
    </>
  );
}

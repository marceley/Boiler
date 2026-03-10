import type { Route } from "./+types/about";
import { galleryData, structuredDataAbout } from "~/data/gallery";
import { Navigation } from "~/components/Navigation";
import { useLoaderData } from "react-router";
import { getAboutPage } from "~/models/datocms-pages.server";
import { MarkdownContent } from "~/components/MarkdownContent";

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

export function headers() {
  return {
    "Cache-Control":
      "public, s-maxage=31536000, stale-while-revalidate",
    "Vercel-Cache-Tag": "datocms-content",
  };
}

export async function loader({ request }: Route.LoaderArgs) {
  const page = await getAboutPage();
  return { page };
}

export default function About() {
  const { page } = useLoaderData<typeof loader>();
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
          <article className="space-y-4 text-sm text-black leading-relaxed">
            <MarkdownContent content={page?.content ?? ""} />
          </article>
        </main>
      </div>
    </>
  );
}

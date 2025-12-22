import type { Route } from "./+types/contact";
import { galleryData, structuredDataContact } from "~/data/gallery";
import { Navigation } from "~/components/Navigation";
import { EmailForm } from "~/components/EmailForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Contact - ${galleryData.siteName} | Get in Touch` },
    {
      name: "description",
      content: `Contact ${galleryData.name} for inquiries about artworks and exhibitions. Located at ${galleryData.address.streetAddress}, ${galleryData.address.addressLocality}, ${galleryData.address.addressCountry}.`,
    },
    { name: "keywords", content: galleryData.keywords },

    // Open Graph
    { property: "og:site_name", content: galleryData.siteName },
    { property: "og:title", content: `Contact - ${galleryData.siteName}` },
    {
      property: "og:description",
      content: `Contact ${galleryData.name} for inquiries about artworks and exhibitions. Located in ${galleryData.address.addressLocality}, ${galleryData.address.addressCountry}.`,
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${galleryData.url}/contact` },
    { property: "og:image", content: galleryData.ogImage },
    { property: "og:image:alt", content: galleryData.ogImageAlt },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "en_DK" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Contact - ${galleryData.siteName}` },
    {
      name: "twitter:description",
      content: `Get in touch with ${galleryData.name} in ${galleryData.address.addressLocality} for art inquiries.`,
    },
    { name: "twitter:image", content: galleryData.ogImage },
    { name: "twitter:image:alt", content: galleryData.ogImageAlt },

    // Canonical
    { tagName: "link", rel: "canonical", href: `${galleryData.url}/contact` },
  ];
}

export default function Contact() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataContact),
        }}
      />
      <div className="min-h-screen p-4 md:p-8 lg:p-12">
        <Navigation />

        <main role="main" className="max-w-2xl mt-12">
          <address className="text-sm not-italic leading-relaxed">
            <div className="mb-[6em]">
              <p>{galleryData.companyName}</p>
              <p>{galleryData.address.streetAddress}</p>
              <p>
                DK-{galleryData.address.postalCode}{" "}
                {galleryData.address.addressLocality}
              </p>
              <p>Denmark</p>
            </div>

            <div className="leading-relaxed">
              {galleryData.contactPoints.map((point) => (
                <div key={point.email} className="mb-[2em]">
                  <p className="font-bold">{point.name}</p>
                  <p>
                    <a
                      href={`tel:${point.telephone.replace(/\s/g, "")}`}
                      aria-label={`Call ${point.name} at ${point.telephone}`}
                    >
                      {point.telephone}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`mailto:${point.email}`}
                      className="underline hover:opacity-60"
                      aria-label={`Email ${point.name} at ${point.email}`}
                    >
                      {point.email}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </address>

          <div className="mt-[12em]">
            <p className="text-sm text-black mb-4">Subscribe for news</p>
            <EmailForm className="max-w-sm" />
          </div>
        </main>
      </div>
    </>
  );
}

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
          <address className="space-y-6 text-sm text-black not-italic">
            <p>
              For inquires about artworks, exhibitions etc., do not hesitate to
              contact us at
            </p>

            <div className="space-y-4">
              {galleryData.contactPoints.map((point) => (
                <div key={point.email}>
                  <p>
                    <a
                      href={`mailto:${point.email}`}
                      className="underline hover:opacity-60"
                      aria-label={`Email ${point.name} at ${point.email}`}
                    >
                      {point.email}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`tel:${point.telephone.replace(/\s/g, "")}`}
                      aria-label={`Call ${point.name} at ${point.telephone}`}
                    >
                      {point.telephone}
                    </a>
                  </p>
                  <p>
                    {point.name}, {point.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 text-xs leading-relaxed">
              <p>{galleryData.companyName}</p>
              <p>{galleryData.address.streetAddress}</p>
              <p>
                DK-{galleryData.address.postalCode}{" "}
                {galleryData.address.addressLocality}
              </p>
              <p>Denmark</p>
            </div>
          </address>

          <div className="mt-12 pt-8 border-t border-black">
            <p className="text-sm text-black mb-4">
              Subscribe to get notified about upcoming exhibitions.
            </p>
            <EmailForm />
          </div>
        </main>
      </div>
    </>
  );
}

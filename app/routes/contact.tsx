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

export async function loader({ request }: Route.LoaderArgs) {
  return {};
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

        <main role="main" className="mt-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
            <address className="text-sm not-italic leading-relaxed max-w-2xl flex-shrink-0">
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
                    <p>{point.name}</p>
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

            <div className="mt-8 lg:mt-0 lg:ml-auto">
              <img
                src="/kort.png"
                alt="Map showing gallery location"
                className="w-full max-w-md object-contain"
              />
              <p className="mt-2 text-xs text-black max-w-md">
                From the street, enter the gate of Store Strandstræde 19. Boiler
                is located in the far left corner of the courtyard, basement.
              </p>
            </div>
          </div>

          <div className="mt-[12em]">
            <p className="text-sm text-black mb-4">Subscribe for news</p>
            <EmailForm className="max-w-sm" />
          </div>
        </main>
      </div>
    </>
  );
}

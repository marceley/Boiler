import type { Route } from "./+types/contact";
import { Link, NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact - Boiler Gallery | Get in Touch" },
    { name: "description", content: "Contact Boiler Gallery for inquiries about artworks and exhibitions. Located at Store Strandstræde 19, Copenhagen, Denmark." },
    { name: "keywords", content: "contact Boiler Gallery, art gallery Copenhagen address, gallery inquiries, Store Strandstræde Copenhagen" },
    
    // Open Graph
    { property: "og:title", content: "Contact - Boiler Gallery" },
    { property: "og:description", content: "Contact Boiler Gallery for inquiries about artworks and exhibitions. Located in Copenhagen, Denmark." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://boilergallery.com/contact" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Contact - Boiler Gallery" },
    { name: "twitter:description", content: "Get in touch with Boiler Gallery in Copenhagen for art inquiries." },
    
    // Canonical
    { tagName: "link", rel: "canonical", href: "https://boilergallery.com/contact" },
  ];
}

export default function Contact() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "ArtGallery",
      "name": "Boiler Gallery",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Store Strandstræde 19",
        "addressLocality": "Copenhagen",
        "postalCode": "1255",
        "addressCountry": "DK"
      },
      "telephone": "+45 41 27 11 88",
      "email": "kristian@boilergallery.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+45 41 27 11 88",
          "email": "kristian@boilergallery.com",
          "contactType": "Director"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+45 60 24 09 66",
          "email": "johanne@boilergallery.com",
          "contactType": "Director"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <header role="banner">
        <h1 className="text-xl text-black dark:text-white font-serif italic mb-4">
          <Link to="/" aria-label="Boiler Gallery Home">Boiler.</Link>
        </h1>
        <nav role="navigation" aria-label="Main navigation" className="flex gap-4 text-sm mb-12">
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `text-black dark:text-white hover:underline ${isActive ? 'underline italic' : ''}`
            }
          >
            About,
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-black dark:text-white hover:underline ${isActive ? 'underline italic' : ''}`
            }
          >
            Contact,
          </NavLink>
        </nav>
      </header>

      <main role="main" className="max-w-2xl">
        <address className="space-y-6 text-sm text-black dark:text-white not-italic">
          <p>
            For inquires about artworks, exhibitions etc., do not hesitate to contact us at
          </p>
          
          <div className="space-y-4">
            <div>
              <p>
                <a 
                  href="mailto:kristian@boilergallery.com" 
                  className="underline hover:opacity-60"
                  aria-label="Email Kristian at kristian@boilergallery.com"
                >
                  kristian@boilergallery.com
                </a>
              </p>
              <p>
                <a href="tel:+4541271188" aria-label="Call Kristian at +45 41 27 11 88">
                  +45 41 27 11 88
                </a>
              </p>
              <p>Kristian Eley, Founder and Director</p>
            </div>

            <div>
              <p>
                <a 
                  href="mailto:johanne@boilergallery.com" 
                  className="underline hover:opacity-60"
                  aria-label="Email Johanne at johanne@boilergallery.com"
                >
                  johanne@boilergallery.com
                </a>
              </p>
              <p>
                <a href="tel:+4560240966" aria-label="Call Johanne at +45 60 24 09 66">
                  +45 60 24 09 66
                </a>
              </p>
              <p>Johanne Schrøder, Director</p>
            </div>
          </div>

          <div className="pt-4">
            <p>Boiler Gallery ApS</p>
            <p>CVR: 123456789</p>
            <p>Store Strandstræde 19</p>
            <p>DK-1255 Copenhagen</p>
            <p>Denmark</p>
          </div>
        </address>
      </main>
    </div>
    </>
  );
}


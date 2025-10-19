import type { Route } from "./+types/home";
import { Link, NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Boiler Gallery - Contemporary Art Gallery in Copenhagen" },
    { name: "description", content: "Boiler Gallery is a contemporary art gallery in Copenhagen showcasing cutting-edge artworks and exhibitions." },
    { name: "keywords", content: "art gallery, contemporary art, Copenhagen, Denmark, exhibitions, artworks" },
    
    // Open Graph
    { property: "og:title", content: "Boiler Gallery - Contemporary Art Gallery in Copenhagen" },
    { property: "og:description", content: "Boiler Gallery is a contemporary art gallery in Copenhagen showcasing cutting-edge artworks and exhibitions." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://boilergallery.com" },
    { property: "og:locale", content: "en_DK" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Boiler Gallery - Contemporary Art Gallery in Copenhagen" },
    { name: "twitter:description", content: "Boiler Gallery is a contemporary art gallery in Copenhagen showcasing cutting-edge artworks and exhibitions." },
    
    // Canonical
    { tagName: "link", rel: "canonical", href: "https://boilergallery.com" },
  ];
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    "name": "Boiler Gallery",
    "description": "Contemporary art gallery in Copenhagen showcasing cutting-edge artworks and exhibitions",
    "url": "https://boilergallery.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Store Strandstræde 19",
      "addressLocality": "Copenhagen",
      "postalCode": "1255",
      "addressCountry": "DK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.6805",
      "longitude": "12.5849"
    },
    "telephone": "+45 41 27 11 88",
    "email": "kristian@boilergallery.com"
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
          <nav role="navigation" aria-label="Main navigation" className="flex gap-4 text-sm">
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
      </div>
    </>
  );
}

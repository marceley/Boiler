import type { Route } from "./+types/about";
import { Link, NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Boiler Gallery | Contemporary Art in Copenhagen" },
    { name: "description", content: "Learn about Boiler Gallery, a contemporary art space in Copenhagen dedicated to showcasing innovative artworks and exhibitions." },
    { name: "keywords", content: "about Boiler Gallery, art gallery Copenhagen, contemporary art space, Denmark art" },
    
    // Open Graph
    { property: "og:title", content: "About - Boiler Gallery" },
    { property: "og:description", content: "Learn about Boiler Gallery, a contemporary art space in Copenhagen dedicated to showcasing innovative artworks and exhibitions." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://boilergallery.com/about" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "About - Boiler Gallery" },
    { name: "twitter:description", content: "Learn about Boiler Gallery, a contemporary art space in Copenhagen." },
    
    // Canonical
    { tagName: "link", rel: "canonical", href: "https://boilergallery.com/about" },
  ];
}

export default function About() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "ArtGallery",
      "name": "Boiler Gallery",
      "description": "Boiler Gallery is a contemporary art gallery located in the heart of Copenhagen, Denmark. We showcase cutting-edge artworks and exhibitions from both established and emerging artists.",
      "url": "https://boilergallery.com"
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
        <nav role="navigation" aria-label="Main navigation" className="flex items-center gap-4 text-sm mb-12 md:justify-between">
          <div className="flex gap-4">
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-black dark:text-white hover:underline hover:italic ${isActive ? 'underline italic' : ''}`
              }
            >
              About,
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-black dark:text-white hover:underline hover:italic ${isActive ? 'underline italic' : ''}`
              }
            >
              Contact,
            </NavLink>
          </div>
          <a 
            href="https://www.instagram.com/boilergallery/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:opacity-60 transition-opacity"
            aria-label="Follow us on Instagram"
          >
            <img 
              src="/instagram.svg" 
              alt="Instagram" 
              className="w-4 h-4"
            />
          </a>
        </nav>
      </header>

      <main role="main" className="max-w-2xl">
        <article className="space-y-4 text-sm text-black dark:text-white">
          <p>
            Boiler Gallery is a contemporary art gallery located in the heart of Copenhagen, 
            Denmark. We showcase cutting-edge artworks and exhibitions from both established 
            and emerging artists.
          </p>
          <p>
            Our mission is to create a dynamic space where art enthusiasts can discover and 
            engage with innovative contemporary art. We believe in fostering meaningful 
            connections between artists and audiences.
          </p>
          <p>
            Founded by Kristian Eley and directed by Johanne Schrøder, Boiler Gallery is 
            committed to presenting thought-provoking exhibitions that challenge and inspire.
          </p>
        </article>
      </main>
    </div>
    </>
  );
}


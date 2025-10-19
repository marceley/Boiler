import type { Route } from "./+types/home";
import { Link, NavLink, Form, useActionData } from "react-router";
import { Resend } from "resend";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Boiler Gallery - Contemporary Art Gallery in Copenhagen" },
    { name: "description", content: "Boiler Gallery is a contemporary art gallery in Copenhagen showcasing cutting-edge artworks and exhibitions." },
    { name: "keywords", content: "art gallery, contemporary art, Copenhagen, Denmark, exhibitions, artworks" },
    
    // Open Graph
    { property: "og:site_name", content: "Boiler Gallery" },
    { property: "og:title", content: "Boiler Gallery - Contemporary Art Gallery in Copenhagen" },
    { property: "og:description", content: "Boiler Gallery is a contemporary art gallery in Copenhagen showcasing cutting-edge artworks and exhibitions." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://boilergallery.com" },
    { property: "og:image", content: "https://boilergallery.com/og-image.png" },
    { property: "og:image:alt", content: "Boiler Gallery - Contemporary Art Gallery in Copenhagen" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "en_DK" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Boiler Gallery - Contemporary Art Gallery in Copenhagen" },
    { name: "twitter:description", content: "Boiler Gallery is a contemporary art gallery in Copenhagen showcasing cutting-edge artworks and exhibitions." },
    { name: "twitter:image", content: "https://boilergallery.com/og-image.png" },
    { name: "twitter:image:alt", content: "Boiler Gallery - Contemporary Art Gallery in Copenhagen" },
    
    // Canonical
    { tagName: "link", rel: "canonical", href: "https://boilergallery.com" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const honeypot = formData.get("website");
  
  // Honeypot spam prevention - if filled, it's likely a bot
  if (honeypot) {
    return { success: false, error: "Spam detected" };
  }
  
  if (!email || typeof email !== "string") {
    return { success: false, error: "Invalid email address" };
  }
  
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Add email to audience
    await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });
    
    return { success: true, message: "Thank you for subscribing!" };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}

export default function Home() {
  const actionData = useActionData<typeof action>();
  
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
          <nav role="navigation" aria-label="Main navigation" className="flex items-center gap-4 text-sm md:justify-between">
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
        <main role="main" className="mt-12 max-w-2xl">
          <p className="text-sm text-black dark:text-white mb-6">
            We are currently working on our first exhibition. Stay tuned for updates.
          </p>
          
          <p className="text-sm text-black dark:text-white mb-4">
            Subscribe to get notified about upcoming exhibitions.
          </p>
          
          <Form method="post" className="space-y-2 max-w-md">
            <div className="flex gap-2">
              {/* Honeypot field - hidden from users, bots will fill it */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute opacity-0 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                disabled={actionData?.success}
                className="flex-1 px-2 py-1 text-sm bg-transparent border-b border-black dark:border-white text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none disabled:opacity-50"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={actionData?.success}
                className="px-3 py-1 text-sm text-black dark:text-white hover:italic transition-all underline disabled:opacity-50 disabled:hover:not-italic"
              >
                Subscribe
              </button>
            </div>
            {actionData?.success && (
              <p className="text-xs text-black dark:text-white italic">
                {actionData.message}
              </p>
            )}
            {actionData?.error && (
              <p className="text-xs text-black dark:text-white">
                {actionData.error}
              </p>
            )}
          </Form>
        </main>
      </div>
    </>
  );
}

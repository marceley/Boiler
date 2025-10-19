import type { Route } from "./+types/contact";
import { Link, NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact - Boiler" },
    { name: "description", content: "Get in touch with us" },
  ];
}

export default function Contact() {
  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <header>
        <h1 className="text-xl text-black dark:text-white font-serif italic mb-4">
          <Link to="/">Boiler.</Link>
        </h1>
        <nav className="flex gap-4 text-sm mb-12">
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

      <main className="max-w-2xl">
        <div className="space-y-6 text-sm text-black dark:text-white">
          <p>
            For inquires about artworks, exhibitions etc., do not hesitate to contact us at
          </p>
          
          <div className="space-y-4">
            <div>
              <p>
                <a 
                  href="mailto:kristian@boilergallery.com" 
                  className="underline hover:opacity-60"
                >
                  kristian@boilergallery.com
                </a>
              </p>
              <p>+45 41 27 11 88</p>
              <p>Kristian Eley, Founder and Director</p>
            </div>

            <div>
              <p>
                <a 
                  href="mailto:johanne@boilergallery.com" 
                  className="underline hover:opacity-60"
                >
                  johanne@boilergallery.com
                </a>
              </p>
              <p>+45 60 24 09 66</p>
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
        </div>
      </main>
    </div>
  );
}


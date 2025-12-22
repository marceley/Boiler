import { Link, NavLink } from "react-router";
import { galleryData } from "~/data/gallery";

export function Navigation() {
  return (
    <header role="banner">
      <h1 className="text-xl text-black font-serif italic mb-6">
        <Link to="/" aria-label="Boiler Home">
          <img
            src="/logo.png"
            alt="Boiler Logo"
            className="w-25 h-auto"
            width={100}
            height="auto"
          />
        </Link>
      </h1>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="flex items-center gap-4 text-sm md:justify-between"
      >
        <div className="flex gap-4">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-black hover:underline hover:italic ${isActive ? "underline italic" : ""}`
            }
          >
            about,
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-black hover:underline hover:italic ${isActive ? "underline italic" : ""}`
            }
          >
            contact,
          </NavLink>
        </div>
        <a
          href={galleryData.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:opacity-60 transition-opacity"
          aria-label="Follow us on Instagram"
        >
          <img src="/instagram.svg" alt="Instagram logo" className="w-4 h-4" />
        </a>
      </nav>
    </header>
  );
}

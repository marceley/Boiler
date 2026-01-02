import { Link, NavLink } from "react-router";
import { galleryData } from "~/data/gallery";

export function Navigation({ className }: { className?: string }) {
  return (
    <header role="banner" className={className}>
      <h1 className="text-xl text-black font-serif italic mb-6">
        <Link to="/" aria-label="Boiler Home">
          <img src="/logo.png" alt="Boiler Logo" width="100" height="34" />
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
          className="text-black hover:underline hover:italic"
          aria-label="Follow us on Instagram"
        >
          instagram
        </a>
      </nav>
    </header>
  );
}

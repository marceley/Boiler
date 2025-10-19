import type { Route } from "./+types/about";
import { Link, NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Boiler" },
    { name: "description", content: "About Boiler" },
  ];
}

export default function About() {
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
        <div className="space-y-4 text-sm text-black dark:text-white">
          <p>
            Boiler is a modern React Router boilerplate designed to get your projects 
            up and running quickly. Built with the latest web technologies and best 
            practices, it provides a solid foundation for your next application.
          </p>
          <p>
            This boilerplate includes React Router v7, TypeScript, Tailwind CSS, and 
            is pre-configured for deployment on Vercel. It features server-side rendering, 
            hot module replacement, and a clean, minimalist design that adapts to light 
            and dark modes.
          </p>
          <p>
            Whether you're building a personal project, a startup MVP, or a complex 
            application, Boiler gives you the tools and structure you need to succeed.
          </p>
        </div>
      </main>
    </div>
  );
}


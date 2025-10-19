import type { Route } from "./+types/home";
import { Link, NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Boiler" },
    { name: "description", content: "React Router Boilerplate" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <header>
        <h1 className="text-xl text-black dark:text-white font-serif italic mb-4">
          <Link to="/">Boiler.</Link>
        </h1>
        <nav className="flex gap-4 text-sm">
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
  );
}

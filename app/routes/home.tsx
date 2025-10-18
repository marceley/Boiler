import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Boiler" },
    { name: "description", content: "React Router Boilerplate" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <h1 className="text-md text-black dark:text-white">Boiler.</h1>
    </div>
  );
}

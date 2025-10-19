import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Boiler" },
    { name: "description", content: "Boiler gallery." },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl text-black dark:text-white font-sans">Boiler.</h1>
    </div>
  );
}

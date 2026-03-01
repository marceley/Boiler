import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("exhibitions/current", "routes/exhibitions.current.tsx"),
  route("exhibitions/archive", "routes/exhibitions.archive.tsx"),
  route("exhibitions/:slug", "routes/exhibitions.$slug.tsx"),
  route("contact", "routes/contact.tsx"),
  route("api/subscribe", "routes/api.subscribe.ts"),
] satisfies RouteConfig;

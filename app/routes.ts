import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("current", "routes/current.tsx"),
  route("archive", "routes/archive.tsx"),
  route("contact", "routes/contact.tsx"),
  route("api/subscribe", "routes/api.subscribe.ts"),
] satisfies RouteConfig;

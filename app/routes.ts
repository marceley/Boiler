import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route(".well-known/appspecific/com.chrome.devtools.json", "routes/.well-known.appspecific.com.chrome.devtools.tsx"),
] satisfies RouteConfig;

import type { Route } from "./+types/admin.revalidate";
import { invalidateByTag } from "@vercel/functions";
import { useActionData } from "react-router";

export function meta() {
  return [
    { title: "Revalidate cache" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export function headers() {
  return {
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
  };
}

export async function loader() {
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return { success: false, error: "Method not allowed" };
  }

  const formData = await request.formData();
  const secret = formData.get("secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected) {
    return { success: false, error: "Revalidation is not configured" };
  }

  if (typeof secret !== "string" || secret !== expected) {
    return { success: false, error: "Invalid secret" };
  }

  try {
    await invalidateByTag("datocms-content");
    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] Manual cache revalidation: datocms-content invalidated`,
    );
    return { success: true };
  } catch (error) {
    console.error("Revalidation error:", error);
    return { success: false, error: "Revalidation failed" };
  }
}

export default function AdminRevalidate() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <main role="main" className="mt-12 max-w-md">
        <h1 className="text-xl font-semibold mb-2">Revalidate cache</h1>
        <p className="text-sm text-black/70 mb-6">
          Invalidate the DatoCMS content cache. Use this when content has
          changed and the webhook did not run.
        </p>

        <form method="post" className="space-y-4">
          <div>
            <label htmlFor="secret" className="block text-sm mb-1">
              Secret
            </label>
            <input
              id="secret"
              name="secret"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 border border-black/20 bg-white text-black text-sm focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter REVALIDATE_SECRET"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-black text-white text-sm hover:opacity-80 focus:outline-none focus:ring-1 focus:ring-black"
          >
            Invalidate cache
          </button>
        </form>

        {actionData?.success && (
          <p className="mt-4 text-sm text-green-700" role="status">
            Cache invalidated successfully.
          </p>
        )}
        {actionData?.success === false && actionData?.error && (
          <p className="mt-4 text-sm text-red-700" role="alert">
            {actionData.error}
          </p>
        )}
      </main>
    </div>
  );
}

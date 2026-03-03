import type { Route } from "./+types/api.revalidate";
import { invalidateByTag } from "@vercel/functions";

export async function loader({ request }: Route.LoaderArgs) {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const secret =
    request.headers.get("x-datocms-webhook-secret") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return Response.json({ error: "Invalid secret" }, { status: 401 });
  }

  let webhookPayload: { message?: string; entity_id?: string } = {};
  try {
    const body = await request.json();
    if (body && typeof body === "object") {
      webhookPayload = {
        message: typeof body.message === "string" ? body.message : undefined,
        entity_id: typeof body.entity_id === "string" ? body.entity_id : undefined,
      };
    }
  } catch {
    // Body may be empty or not JSON; continue without payload
  }

  try {
    await invalidateByTag("datocms-content");
    const timestamp = new Date().toISOString();
    const parts = [
      `[${timestamp}] Cache invalidated: datocms-content`,
      webhookPayload.message && `event: ${webhookPayload.message}`,
      webhookPayload.entity_id && `entity_id: ${webhookPayload.entity_id}`,
    ].filter(Boolean);
    console.log(parts.join(" | "));
    return Response.json({ revalidated: true });
  } catch (error) {
    console.error("Revalidation error:", error);
    return Response.json(
      { error: "Revalidation failed" },
      { status: 500 },
    );
  }
}

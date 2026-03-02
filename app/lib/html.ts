const ALLOWED_TAGS = new Set(["p", "strong", "em", "br"]);
const TAG_REGEX = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;

/**
 * Sanitize HTML to only allow <p>, <b>, <strong>, <em>.
 * Removes all other tags and strips attributes from allowed tags.
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html || typeof html !== "string") return "";
  return html.replace(TAG_REGEX, (match, tagName) => {
    const lower = tagName.toLowerCase();
    if (ALLOWED_TAGS.has(lower)) {
      return match.startsWith("</") ? `</${lower}>` : `<${lower}>`;
    }
    return "";
  });
}

const optsDayMonth = { day: "numeric" as const, month: "long" as const };
const optsDayMonthYear = {
  day: "numeric" as const,
  month: "long" as const,
  year: "numeric" as const,
};

function parseDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr || typeof dateStr !== "string") return null;
  const date = new Date(dateStr);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Format a date range in English (e.g. "12 March - 18 April 2026").
 * Year is shown only at the end when both dates are in the same year.
 */
export function formatDateRangeEn(
  startStr: string | null | undefined,
  endStr: string | null | undefined
): string | null {
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  if (!start && !end) return null;
  if (!start) return end!.toLocaleDateString("en-GB", optsDayMonthYear);
  if (!end) return start.toLocaleDateString("en-GB", optsDayMonthYear);

  const sameYear = start.getFullYear() === end.getFullYear();
  const startPart = start.toLocaleDateString("en-GB", optsDayMonth);
  const endPart = sameYear
    ? `${end.toLocaleDateString("en-GB", optsDayMonth)} ${end.getFullYear()}`
    : end.toLocaleDateString("en-GB", optsDayMonthYear);

  return `${startPart} - ${endPart}`;
}

const optsShortMonth = { day: "numeric" as const, month: "short" as const };

/**
 * Format a date range in short form (e.g. "Feb 4 - Mar 10").
 */
export function formatDateRangeShort(
  startStr: string | null | undefined,
  endStr: string | null | undefined
): string | null {
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  if (!start && !end) return null;
  if (!start) return end!.toLocaleDateString("en-GB", optsShortMonth);
  if (!end) return start.toLocaleDateString("en-GB", optsShortMonth);

  const startPart = start.toLocaleDateString("en-GB", optsShortMonth);
  const endPart = end.toLocaleDateString("en-GB", optsShortMonth);
  return `${startPart} - ${endPart}`;
}

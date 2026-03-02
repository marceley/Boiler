import { formatDateRangeEn, formatDateRangeShort } from "~/lib/date";
import type { Artist } from "~/models/exhibitions.server";

type ExhibitionHeaderProps = {
  artists: Artist[];
  title: string;
  startDate: string | null;
  endDate: string | null;
  dateFormat: "long" | "short";
  className?: string;
  variant?: "default" | "compact";
};

export function ExhibitionHeader({
  artists,
  title,
  startDate,
  endDate,
  dateFormat,
  className = "",
  variant = "default",
}: ExhibitionHeaderProps) {
  const formattedDates =
    dateFormat === "long"
      ? formatDateRangeEn(startDate, endDate)
      : formatDateRangeShort(startDate, endDate);

  if (variant === "compact") {
    return (
      <div className={`mt-4 space-y-1 ${className}`.trim()}>
        <p>{artists.map((a) => a.fullName).join(" & ")}</p>
        <p>{title}</p>
        {formattedDates && <p>{formattedDates}</p>}
      </div>
    );
  }

  return (
    <div
      id="artists"
      className={`text-sm text-black leading-relaxed mb-8 ${className}`.trim()}
    >
      <h3>{artists.map((a) => a.fullName).join(" & ")}</h3>
      <div>{title}</div>
      {formattedDates && <div>{formattedDates}</div>}
    </div>
  );
}

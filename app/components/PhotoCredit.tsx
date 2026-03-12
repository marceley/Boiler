import { twMerge } from "tailwind-merge";

type PhotoCreditProps = {
  copyright?: string | null;
  photographer?: string | null;
  className?: string;
};

export function PhotoCredit({
  copyright,
  photographer,
  className = "",
}: PhotoCreditProps) {
  if (!copyright && !photographer) return null;

  return (
    <div
      className={twMerge(
        "flex flex-col gap-1 md:flex-row md:justify-end",
        className,
      )}
    >
      {copyright && <span>{copyright}</span>}
      {copyright && photographer && " "}
      {photographer && <span>Photo: {photographer}</span>}
    </div>
  );
}

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
    <div className={className}>
      {copyright && <span>{copyright}</span>}
      {copyright && photographer && " "}
      {photographer && <span>Photo: {photographer}</span>}
    </div>
  );
}

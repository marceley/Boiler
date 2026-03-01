type ExhibitionDescriptionProps = {
  html: string;
};

export function ExhibitionDescription({ html }: ExhibitionDescriptionProps) {
  return (
    <article
      className="mb-16 space-y-4 text-sm text-black leading-relaxed lg:columns-2 lg:gap-x-12"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

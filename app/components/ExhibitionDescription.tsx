import { MarkdownContent } from "~/components/MarkdownContent";

type ExhibitionDescriptionProps = {
  markdown: string;
};

export function ExhibitionDescription({ markdown }: ExhibitionDescriptionProps) {
  if (!markdown?.trim()) return null;
  return (
    <article className="mb-16 text-sm text-black leading-relaxed lg:columns-2 lg:gap-x-12">
      <MarkdownContent content={markdown} />
    </article>
  );
}

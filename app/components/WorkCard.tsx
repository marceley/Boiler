import { ImageBox } from "~/components/ImageBox";
import { MarkdownContent } from "~/components/MarkdownContent";
import type { Work } from "~/models/exhibitions.server";

type WorkCardProps = {
  work: Work;
  onClick?: () => void;
};

export function WorkCard({ work, onClick }: WorkCardProps) {
  const content = (
    <>
      <ImageBox src={work.image?.url} alt={work.title} />
      <div className="mt-2 text-xs text-black">
        <h3 className="italic">{work.title}</h3>
        {work.year && <div>{work.year}</div>}
        {work.description && (
          <div className="[&_p]:mb-1 [&_p:last-child]:mb-0">
            <MarkdownContent content={work.description} />
          </div>
        )}
        {work.sizeInfo && <div>{work.sizeInfo}</div>}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex flex-col text-left cursor-pointer hover:opacity-80 transition-opacity"
      >
        {content}
      </button>
    );
  }

  return <div className="flex flex-col text-left">{content}</div>;
}

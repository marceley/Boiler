import { Link } from "react-router";
import { ImageBox } from "~/components/ImageBox";
import { ExhibitionHeader } from "~/components/ExhibitionHeader";
import type { Exhibition } from "~/models/exhibitions.server";

type ExhibitionCardProps = {
  exhibition: Exhibition;
};

export function ExhibitionCard({ exhibition }: ExhibitionCardProps) {
  // TODO: do we need a separate image for an exhibition?
  const imageUrl =
    exhibition.views[0]?.image?.url ?? exhibition.works[0]?.image?.url;

  return (
    <Link
      to={`/exhibitions/${exhibition.slug}`}
      className="flex flex-col text-sm text-black hover:opacity-80 transition-opacity"
    >
      <ImageBox src={imageUrl} alt={exhibition.title} />
      <ExhibitionHeader
        artists={exhibition.artists}
        title={exhibition.title}
        startDate={exhibition.startDate}
        endDate={exhibition.endDate}
        dateFormat="short"
        variant="compact"
      />
    </Link>
  );
}

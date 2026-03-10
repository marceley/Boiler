import { WorkCard } from "~/components/WorkCard";
import type { Work } from "~/models/exhibitions.server";

type WorksGridProps = {
  works: Work[];
  onWorkClick?: (index: number) => void;
};

export function WorksGrid({ works, onWorkClick }: WorksGridProps) {
  return (
    <div
      id="works"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full"
    >
      {works.map((work, index) => (
        <WorkCard
          key={work.title}
          work={work}
          onClick={onWorkClick ? () => onWorkClick(index) : undefined}
        />
      ))}
    </div>
  );
}

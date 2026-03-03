import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { ImageBox } from "~/components/ImageBox";
import { MarkdownContent } from "~/components/MarkdownContent";
import type { Work } from "~/models/exhibitions.server";

type WorksOverlayProps = {
  works: Work[];
  selectedIndex: number;
  onClose: () => void;
};

export function WorksOverlay({
  works,
  selectedIndex,
  onClose,
}: WorksOverlayProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: selectedIndex,
    loop: true,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();

  return (
    <div
      className="fixed inset-0 z-50 bg-[#f5f5f5] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Works gallery"
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-10 text-black text-5xl font-light hover:opacity-70 transition-opacity leading-none"
        aria-label="Close"
      >
        ×
      </button>

      <div className="block lg:flex lg:flex-1 lg:flex-row lg:items-center lg:justify-start p-8 pt-24 gap-4">
        <div className="embla w-full max-w-4xl lg:flex-1 lg:min-w-0">
          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {works.map((work) => (
                <div
                  key={work.title}
                  className="embla__slide flex-[0_0_100%] min-w-0 flex flex-col items-start"
                >
                  <div className="inline-flex flex-col">
                    <div className="flex items-start justify-start min-h-[60vh]">
                      {work.image?.url ? (
                        <ImageBox src={work.image.url} alt={work.title} />
                      ) : null}
                    </div>
                    <div className="mt-2 w-full flex justify-between items-start gap-4 text-xs text-black min-w-0">
                      <div className="min-w-0">
                        <h3 className="italic">{work.title}</h3>
                        {work.description && (
                          <div className="leading-relaxed [&_p]:mb-1 [&_p:last-child]:mb-0">
                            <MarkdownContent content={work.description} />
                          </div>
                        )}
                        {work.year && <div>{work.year}</div>}
                        {work.sizeInfo && <div>{work.sizeInfo}</div>}
                      </div>
                      {work.photographer && (
                        <div className="shrink-0">
                          Photo: {work.photographer}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row lg:flex-col-reverse justify-center gap-12 lg:gap-2 lg:shrink-0 lg:-mt-20">
          <button
            onClick={goToPrev}
            className="text-black hover:opacity-50 transition-opacity cursor-pointer"
            aria-label="Previous image"
          >
            <BsArrowLeft className="text-2xl" />
          </button>
          <button
            onClick={goToNext}
            className="text-black hover:opacity-50 transition-opacity cursor-pointer"
            aria-label="Next image"
          >
            <BsArrowRight className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

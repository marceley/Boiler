import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { ImageBox } from "~/components/ImageBox";
import type { View } from "~/models/exhibitions.server";

type ViewsCarouselProps = {
  views: View[];
};

export function ViewsCarousel({ views }: ViewsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({}, [Fade()]);

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();

  return (
    <div className="w-full lg:max-w-[60%] mb-12">
      <div id="views" className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {views.map((view, index) => (
              <div className="embla__slide" key={view.title + index}>
                <ImageBox src={view.image?.url} alt={view.title} />
                <div className="mt-2 text-xs text-black text-right">
                  {view.copyright && <span>{view.copyright}</span>}{" "}
                  {view.photographer && <span>Photo: {view.photographer}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <button
            className="embla__prev mr-8"
            onClick={goToPrev}
            aria-label="Previous"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="embla__next"
            onClick={goToNext}
            aria-label="Next"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

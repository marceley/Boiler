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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-12">
      <div id="views" className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {views.map((view, index) => (
              <div className="embla__slide" key={view.title + index}>
                <ImageBox src={view.image?.url} alt={view.title} />
              </div>
            ))}
          </div>
        </div>
        <button className="embla__prev" onClick={goToPrev}>
          Scroll to prev
        </button>
        <button className="embla__next" onClick={goToNext}>
          Scroll to next
        </button>
      </div>
    </div>
  );
}

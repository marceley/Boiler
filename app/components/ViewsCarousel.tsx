import useEmblaCarousel from "embla-carousel-react";
import { ImageBox } from "~/components/ImageBox";
import { PhotoCredit } from "~/components/PhotoCredit";
import type { View } from "~/models/exhibitions.server";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

type ViewsCarouselProps = {
  views: View[];
};

export function ViewsCarousel({ views }: ViewsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();

  const arrows = (
    <div className="flex flex-row justify-center lg:justify-center gap-12 lg:gap-2 shrink-0 lg:flex-col-reverse">
      <button
        className="cursor-pointer hover:opacity-50 transition-opacity"
        onClick={goToPrev}
        aria-label="Previous"
        type="button"
      >
        <BsArrowLeft className="text-gray-800 text-2xl" />
      </button>
      <button
        className="cursor-pointer hover:opacity-50 transition-opacity"
        onClick={goToNext}
        aria-label="Next"
        type="button"
      >
        <BsArrowRight className="text-gray-800 text-2xl" />
      </button>
    </div>
  );

  return (
    <div className="w-full lg:max-w-[60%] mb-12 flex flex-col lg:flex-row gap-4 lg:items-center">
      <div id="views" className="embla flex-1 min-w-0">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {views.map((view, index) => (
              <div className="embla__slide" key={view.title + index}>
                {view.image?.url ? (
                  <ImageBox src={view.image.url} alt={view.title} />
                ) : null}
                <div className="mt-2 text-xs text-black text-right">
                  <PhotoCredit
                    copyright={view.copyright}
                    photographer={view.photographer}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>{arrows}</div>
    </div>
  );
}

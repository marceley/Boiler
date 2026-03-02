type ImageBoxProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

export function ImageBox({ src, alt, className = "" }: ImageBoxProps) {
  return (
    <div
      className={
        "w-full aspect-3/2 bg-white overflow-hidden flex items-center justify-center" +
        (className ? ` ${className}` : "")
      }
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-contain" />
      ) : null}
    </div>
  );
}

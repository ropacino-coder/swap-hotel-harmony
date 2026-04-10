import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Image } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";

interface PhotoGalleryProps {
  images: string[];
  videos?: string[];
  name: string;
}

type MediaItem = { type: "image" | "video"; src: string };

export const PhotoGallery = ({ images, videos = [], name }: PhotoGalleryProps) => {
  const media: MediaItem[] = [
    ...videos.map((v) => ({ type: "video" as const, src: v })),
    ...images.map((img) => ({ type: "image" as const, src: img })),
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const next = useCallback(() => setActiveIndex((i) => (i + 1) % media.length), [media.length]);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + media.length) % media.length), [media.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, next, prev]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const itemWidth = el.firstElementChild?.clientWidth || 1;
      const gap = 8;
      setMobileIndex(Math.round(scrollLeft / (itemWidth + gap)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const displayImages = images.slice(0, 5);
  const videoOffset = videos.length;

  return (
    <>
      {/* ─── Mobile: swipe carousel ─── */}
      <div className="sm:hidden">
        <div className="relative rounded-2xl overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayImages.map((img, i) => (
              <div
                key={i}
                className="relative shrink-0 w-full snap-center aspect-[4/3]"
                onClick={() => openLightbox(videoOffset + i)}
              >
                <img
                  src={img}
                  alt={`${name} - ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                {i === 0 && videos.length > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); openLightbox(0); }}
                    className="absolute bottom-12 left-3 flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-lg"
                  >
                    <Play className="h-3 w-3 fill-foreground" /> Video
                  </button>
                )}

                {i === displayImages.length - 1 && media.length > 5 && (
                  <div className="absolute inset-0 bg-foreground/30 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="text-card text-sm font-semibold flex items-center gap-1.5">
                      <Image className="h-4 w-4" /> +{media.length - 5} más
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="absolute top-3 right-3 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white">
            {mobileIndex + 1} / {displayImages.length}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2.5 px-0.5">
          <div className="flex gap-1.5">
            {displayImages.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === mobileIndex ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <button onClick={() => openLightbox(0)} className="text-xs font-medium text-primary hover:underline">
            Ver todas ({media.length})
          </button>
        </div>
      </div>

      {/* ─── Desktop: Airbnb-style grid ─── */}
      <div className="hidden sm:grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[420px] cursor-pointer">
        <div className="col-span-2 row-span-2 relative group" onClick={() => openLightbox(videoOffset)}>
          <img src={displayImages[0]} alt={`${name} - 1`} className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-90" />
          {videos.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); openLightbox(0); }}
              className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-card/95 backdrop-blur-sm px-3 py-2 text-xs font-semibold text-foreground shadow-md hover:bg-card transition-colors"
            >
              <Play className="h-3.5 w-3.5" /> Ver video
            </button>
          )}
        </div>
        {displayImages.slice(1, 5).map((img, i) => (
          <div key={i} className="relative group" onClick={() => openLightbox(videoOffset + i + 1)}>
            <img src={img} alt={`${name} - ${i + 2}`} className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-90" />
            {i === 3 && media.length > 5 && (
              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                <span className="text-card text-sm font-semibold flex items-center gap-1.5">
                  <Image className="h-4 w-4" /> +{media.length - 5} más
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="hidden sm:flex justify-center">
        <button
          onClick={() => openLightbox(0)}
          className="mt-3 text-sm font-medium text-primary hover:underline"
        >
          Mostrar todas las fotos {videos.length > 0 && "y videos"}
        </button>
      </div>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>

            <button
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {media[activeIndex]?.type === "video" ? (
              <video
                key={activeIndex}
                src={media[activeIndex].src}
                controls
                autoPlay
                className="max-h-[80vh] max-w-[92vw] sm:max-w-[90vw] rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                src={media[activeIndex]?.src}
                alt={`${name} - ${activeIndex + 1}`}
                className="max-h-[80vh] max-w-[92vw] sm:max-w-[90vw] rounded-xl object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            )}

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <span className="text-white/70 text-xs sm:text-sm">
                {activeIndex + 1} / {media.length}
              </span>
              <div className="hidden sm:flex gap-1.5 max-w-[400px] overflow-x-auto">
                {media.slice(0, 10).map((m, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                    className={`h-10 w-14 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                      i === activeIndex ? "border-primary opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    {m.type === "video" ? (
                      <div className="h-full w-full bg-white/20 flex items-center justify-center">
                        <Play className="h-3 w-3 text-white" />
                      </div>
                    ) : (
                      <img src={m.src} alt="" className="h-full w-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex sm:hidden gap-1 max-w-[90vw] overflow-x-auto py-1">
                {media.slice(0, 8).map((m, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                    className={`h-8 w-11 rounded shrink-0 overflow-hidden border-2 transition-all ${
                      i === activeIndex ? "border-primary opacity-100" : "border-transparent opacity-40"
                    }`}
                  >
                    {m.type === "video" ? (
                      <div className="h-full w-full bg-white/20 flex items-center justify-center">
                        <Play className="h-2.5 w-2.5 text-white" />
                      </div>
                    ) : (
                      <img src={m.src} alt="" className="h-full w-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

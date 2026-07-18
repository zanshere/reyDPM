import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type Lenis from 'lenis';
import { LazyImage } from '@/components/lazy/LazyLoad';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  lenis?: Lenis | null;
}

const SWIPE_THRESHOLD = 60;

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName, lenis }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [loadedSrcs, setLoadedSrcs] = useState<Set<string>>(new Set());
  const markSrcLoaded = useCallback((src: string) => {
    setLoadedSrcs((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + images.length) % images.length
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
      if (!isOpen) return;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      lenis?.stop();

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
      };
      window.addEventListener('keydown', onKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', onKeyDown);
        lenis?.start();
      };
    }, [isOpen, close, showPrev, showNext, lenis]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x <= -SWIPE_THRESHOLD) showNext();
      else if (info.offset.x >= SWIPE_THRESHOLD) showPrev();
    },
    [showNext, showPrev]
  );

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {images.map((src, idx) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => setActiveIndex(idx)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative aspect-square overflow-hidden rounded-2xl border-0 bg-gray-100 p-0 dark:bg-[#1a1a1a]"
            aria-label={`Lihat foto ${idx + 1} ${productName}`}
          >
            <LazyImage
              src={src}
              alt={`${productName} — foto ${idx + 1}`}
              wrapperClassName="h-full w-full"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.button>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-label={`Galeri foto ${productName}`}
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
            <motion.div
              className="relative flex w-full max-w-4xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <button
                type="button"
                onClick={close}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white/90 text-gray-800 shadow-md transition-colors hover:bg-white sm:-top-3 sm:-right-14"
                aria-label="Tutup galeri"
              >
                <X className="size-5" />
              </button>

              <div className="relative mx-auto flex w-full max-w-[min(85vw,70vh)] items-center justify-center">
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Foto sebelumnya"
                    className="absolute left-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 sm:-left-14 sm:h-11 sm:w-11"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    className="relative aspect-square w-full"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!loadedSrcs.has(images[activeIndex ?? 0]) && (
                      <Skeleton className="absolute inset-0 h-full w-full rounded-2xl" />
                    )}
                    <motion.img
                      src={images[activeIndex ?? 0]}
                      alt={`${productName} — foto ${(activeIndex ?? 0) + 1}`}
                      drag={images.length > 1 ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.7}
                      onDragEnd={handleDragEnd}
                      onLoad={() => markSrcLoaded(images[activeIndex ?? 0])}
                      className={`h-full w-full touch-pan-y select-none rounded-2xl object-cover transition-opacity duration-300 ${
                        loadedSrcs.has(images[activeIndex ?? 0]) ? 'opacity-100' : 'opacity-0'
                      }`}
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Foto berikutnya"
                    className="absolute right-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60 sm:-right-14 sm:h-11 sm:w-11"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-4 flex items-center gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Ke foto ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
};

export default ProductGallery;
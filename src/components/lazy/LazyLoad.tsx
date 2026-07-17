import React, { useState, useCallback, useRef, useEffect, Suspense, type ReactNode } from 'react';
import { motion, type MotionProps } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { buildSrcSet, optimizedSrc } from '@/lib/vercel-image';

export interface LazyImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  wrapperClassName?: string;
  skeletonClassName?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  widths?: readonly number[];
  sizes?: string;
}

const DEFAULT_WIDTHS = [400, 800] as const;

export const LazyImage: React.FC<LazyImageProps> = ({
  wrapperClassName,
  skeletonClassName,
  className,
  onLoad,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  alt,
  src,
  widths = DEFAULT_WIDTHS,
  sizes,
  ...imgProps
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const resolvedSrc = typeof src === 'string' ? optimizedSrc(src, widths[widths.length - 1]) : src;
  const srcSet = typeof src === 'string' ? buildSrcSet(src, widths) : undefined;

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      onLoad?.(e);
    },
    [onLoad]
  );

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      {!loaded && <Skeleton className={cn('absolute inset-0 h-full w-full rounded-none', skeletonClassName)} />}
      <img
        ref={imgRef}
        {...imgProps}
        {...(fetchPriority ? { fetchPriority } : {})}
        src={resolvedSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
        onError={handleLoad} // supaya skeleton tidak nyangkut kalau src-nya gagal dimuat
        className={cn('transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0', className)}
      />
    </div>
  );
};

export interface LazyBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

/** Bungkus komponen hasil React.lazy() supaya JS-nya baru diunduh saat dibutuhkan. */
export const LazyBoundary: React.FC<LazyBoundaryProps> = ({ children, fallback }) => (
  <Suspense fallback={fallback}>{children}</Suspense>
);

export interface LazyRevealProps extends Omit<MotionProps, 'initial' | 'whileInView' | 'viewport' | 'transition'> {
  children: ReactNode;
  className?: string;
  /** Jarak geser awal (px) sebelum elemen masuk viewport. Default 30. */
  y?: number;
  duration?: number;
  delay?: number;
  /** Margin viewport untuk trigger reveal lebih awal/lambat. Default '-40px'. */
  margin?: string;
  /** Ulangi animasi tiap kali elemen masuk viewport. Default false (sekali saja). */
  repeat?: boolean;
}

export const LazyReveal: React.FC<LazyRevealProps> = ({
  children,
  className,
  y = 30,
  duration = 0.7,
  delay = 0,
  margin = '-40px',
  repeat = false,
  ...motionProps
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: !repeat, margin }}
    transition={{ duration, delay }}
    className={className}
    {...motionProps}
  >
    {children}
  </motion.div>
);

/** Fallback grid untuk galeri foto (dipakai LazyBoundary saat ProductGallery belum termuat). */
export const GallerySkeleton: React.FC = () => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton key={i} className="aspect-square rounded-2xl" />
    ))}
  </div>
);

/** Fallback grid untuk kartu produk (dipakai saat data produk belum siap). */
export const ProductCardSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-[#1a1a1a] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
      >
        <Skeleton className="h-52 w-full rounded-none" />
        <div className="space-y-2 p-5">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);
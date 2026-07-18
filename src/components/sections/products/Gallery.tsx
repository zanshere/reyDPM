import React, { lazy } from 'react';
import { LazyBoundary, GallerySkeleton } from '@/components/lazy/LazyLoad';
import { useLenis } from '@/providers/LenisProvider';
import type { Product } from '@/data/products';

const ProductGallery = lazy(() => import('@/components/sections/ProductGallery'));

export interface ProductGalleryProps {
  product: Product;
  gallery: string[];
}

const Gallery: React.FC<ProductGalleryProps> = ({ product, gallery }) => {
  // Aman panggil hook di sini karena Gallery.tsx BUKAN komponen lazy —
  // dia ada di pohon sinkron ProductDetail, jadi context-nya konsisten.
  const { lenis } = useLenis();

  return (
    <section
      id="gallery"
      data-reveal
      className="section-padding bg-cream transition-colors dark:bg-[#0d0d0d]"
    >
      <div className="container-custom">
        <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
          Galeri Foto
        </h2>
        <LazyBoundary fallback={<GallerySkeleton />}>
          <ProductGallery images={gallery} productName={product.name} lenis={lenis} />
        </LazyBoundary>
      </div>
    </section>
  );
};

export default Gallery;
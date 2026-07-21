import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LenisProvider, useLenis } from '@/providers/LenisProvider';
import { useTheme } from '@/hooks/useTheme';
import { useAnalytics } from "@/hooks/useAnalytics";
import { buildProductWhatsAppMessage, buildWhatsAppLink } from '@/data/dealer';
import type { Product } from '@/data/products';

import ProductHero from './products/Hero';
import ProductDescription from './products/Description';
import ProductSpesification from './products/Spesification';
import ProductFeatures from './products/Features';
import Gallery from './products/Gallery';
import ProductInterest from './products/Interest';

interface ProductDetailProps {
  product: Product;
}

const ProductDetailContent: React.FC<ProductDetailProps> = ({ product }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { lenis } = useLenis();
  const rootRef = useRef<HTMLDivElement>(null);
  const analytics = useAnalytics();

  useEffect(() => {
    if (typeof window === 'undefined' || !rootRef.current) return;

    const sections = gsap.utils.toArray<HTMLElement>('[data-reveal]', rootRef.current);
    const animations = sections.map((el) =>
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      )
    );

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      animations.forEach((anim) => anim.scrollTrigger?.kill());
      window.removeEventListener('load', refresh);
    };
  }, [product.slug]);

  useEffect(() => {
    analytics.trackProductView({
      productName: product.name,
      productSlug: product.slug,
      productPrice: product.price,
    });
  }, [product.slug]);

  const gallery = [product.thumbnail, ...product.images];
  const accent = isDark ? '#facc15' : '#4f46e5';
  // CTA langsung ke WhatsApp, pesan otomatis menyebut nama produk ini.
  const waHref = buildWhatsAppLink(buildProductWhatsAppMessage(product.name));

  return (
    <div ref={rootRef}>
      <ProductHero product={product} accent={accent} isDark={isDark} waHref={waHref} lenis={lenis} />
      <ProductDescription product={product} />
      <ProductSpesification product={product} />
      <ProductFeatures product={product} />
      <Gallery product={product} gallery={gallery} />
      <ProductInterest product={product} accent={accent} waHref={waHref} />
    </div>
  );
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => (
  <ThemeProvider>
    <LenisProvider>
      <ProductDetailContent product={product} />
    </LenisProvider>
  </ThemeProvider>
);

export default ProductDetail;
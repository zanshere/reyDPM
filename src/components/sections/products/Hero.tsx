import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import type Lenis from 'lenis';
import ShinyText from '@/components/reactbits/ShinyText';
import SplitText from '@/components/reactbits/SplitText';
import StarBorder from '@/components/reactbits/StarBorder';
import { Button } from '@/components/ui/button';
import { LazyImage } from '@/components/lazy/LazyLoad';
import type { Product } from '@/data/products';

export interface ProductHeroProps {
  product: Product;
  accent: string;
  isDark: boolean;
  waHref: string;
  lenis: Lenis | null;
}

const ProductHero: React.FC<ProductHeroProps> = ({ product, accent, isDark, waHref, lenis }) => (
  <section className="section-padding pt-28 sm:pt-32">
    <div className="container-custom">
      <a
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-yellow-400"
      >
        ← Kembali ke Beranda
      </a>

      <div className="grid grid-cols-1 items-center gap-10 lg:gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* aspect-ratio tetap supaya tinggi konsisten di semua produk & tidak ada layout shift */}
          <LazyImage
            src={product.thumbnail}
            alt={product.name}
            loading="eager"
            fetchPriority="high"
            widths={[480, 640, 800, 1024, 1280]}
            sizes="(min-width: 1024px) 50vw, 100vw"
            wrapperClassName="aspect-[4/3] w-full rounded-3xl shadow-2xl"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="space-y-5">
          <ShinyText
            text={`✦ ${product.tagline}`}
            speed={3}
            shineColor={accent}
            color={isDark ? '#888' : '#999'}
            spread={90}
          />
          <SplitText
            text={product.name}
            tag="h1"
            className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
            delay={40}
            duration={1.2}
          />
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-primary dark:text-yellow-400 sm:text-3xl">
            {product.price}
          </p>

          {/* flex-col di mobile -> tombol full-width & rapi bertumpuk, sm:flex-row balik jadi sejajar */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
            <StarBorder color={accent} speed="3s" thickness={3}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-1 font-medium text-white no-underline"
              >
                <MessageCircle className="size-4" />
                Chat via WhatsApp
              </a>
            </StarBorder>
            <Button
              variant="outline"
              className="w-full border-gray-300 px-6 py-6 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
              onClick={() => lenis?.scrollTo('#gallery', { offset: -96, duration: 1.2 })}
            >
              Lihat Galeri
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProductHero;
import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import ShinyText from '@/components/reactbits/ShinyText';
import SplitText from '@/components/reactbits/SplitText';
import StarBorder from '@/components/reactbits/StarBorder';
import { LazyImage } from '@/components/lazy/LazyLoad';
import { useTheme } from '@/hooks/useTheme';
import { productsData, type Product } from '@/data/products';

const ProductsContent: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadedIds, setLoadedIds] = useState<Set<number>>(new Set());

  const markLoaded = useCallback((id: number) => {
    setLoadedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  // Kunci scroll body + tutup dengan ESC selama modal quick-preview terbuka
  useEffect(() => {
    if (!modalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [modalOpen, closeModal]);

  const accent = isDark ? '#facc15' : '#4f46e5';

  return (
    <section id="products" className="section-padding bg-cream dark:bg-[#0d0d0d] transition-colors">
      <div className="container-custom">
        <div className="mb-12 flex flex-col items-center space-y-3 text-center">
          <ShinyText text="✦ Koleksi Kami" speed={3} shineColor={accent} color={isDark ? '#666' : '#aaa'} spread={80} />
          <SplitText
            text="Pilih Vespa Kamu"
            tag="h2"
            className="text-4xl font-bold tracking-tight sm:text-5xl"
            delay={60}
            duration={1.3}
          />
          <p className="mx-auto max-w-md text-gray-500 dark:text-gray-400">
            Empat model ikonik, masing-masing dengan karakternya sendiri. Temukan yang paling cocok
            dengan gayamu.
          </p>
        </div>

        {/* grid produk */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productsData.map((product) => {
            const isLoaded = loadedIds.has(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: product.id * 0.08 }}
                className="product-card overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-[#1a1a1a] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                onClick={() => openModal(product)}
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <LazyImage
                    src={product.thumbnail}
                    alt={product.name}
                    loading="lazy"
                    widths={[400, 640, 800]}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    onLoad={() => markLoaded(product.id)}
                    wrapperClassName="h-full w-full"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {isLoaded && (
                    <div className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                      Matic
                    </div>
                  )}
                </div>

                <div className="space-y-2 p-5">
                  {/* Selalu tampilkan teks, tidak bergantung pada isLoaded */}
                  <h3 className="text-lg font-bold leading-tight dark:text-white">{product.name}</h3>
                  <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-semibold text-primary dark:text-yellow-400">
                      {product.price}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">Tap untuk lihat</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* modal / quick preview */}
        <div
          className={`modal-overlay ${modalOpen ? 'open' : ''}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-hidden={!modalOpen}
          aria-label={selectedProduct ? `Pratinjau ${selectedProduct.name}` : undefined}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedProduct && (
              <>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Tutup pratinjau"
                  className="absolute top-4 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-white/80 text-2xl text-gray-500 hover:text-gray-700 dark:bg-black/40 dark:hover:text-gray-300"
                >
                  ✕
                </button>
                <div className="mb-4 h-64 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-black/40">
                  <LazyImage
                    src={selectedProduct.thumbnail}
                    alt={selectedProduct.name}
                    loading="eager"
                    widths={[480, 640, 800]}
                    sizes="(min-width: 640px) 32rem, 90vw"
                    wrapperClassName="h-full w-full"
                    className="h-full w-full object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold dark:text-white">{selectedProduct.name}</h2>
                <p className="mt-1 text-gray-500 dark:text-gray-400">{selectedProduct.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {selectedProduct.fullDescription || selectedProduct.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProduct.specs.slice(0, 3).map((spec) => (
                    <span key={spec} className="rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800">
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-primary dark:text-yellow-400">
                    {selectedProduct.price}
                  </span>
                  <StarBorder color={accent} speed="3s" thickness={3}>
                    <a
                      href={`/products/${selectedProduct.slug}`}
                      className="block px-3 py-1 font-medium text-white no-underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeModal();
                      }}
                    >
                      Lihat Detail
                    </a>
                  </StarBorder>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/** Self-wrapped ThemeProvider — menggantikan ProductsIsland.tsx yang dihapus. */
const Products: React.FC = () => (
  <ThemeProvider>
    <ProductsContent />
  </ThemeProvider>
);

export default Products;
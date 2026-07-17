import React from 'react';
import type { Product } from '@/data/products';

export interface ProductSpesificationProps {
  product: Product;
}

const ProductSpesification: React.FC<ProductSpesificationProps> = ({ product }) => (
  <section data-reveal className="section-padding bg-cream transition-colors dark:bg-[#0d0d0d]">
    <div className="container-custom">
      <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
        Spesifikasi
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {product.specs.map((spec) => {
          // Format data: "Label: Nilai" -> dipecah jadi 2 baris di kartu.
          const [label, value] = spec.split(':').map((part) => part.trim());
          return (
            <div
              key={spec}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-[#1a1a1a]"
            >
              <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
                {label}
              </p>
              <p className="mt-1 font-semibold dark:text-white">{value ?? label}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ProductSpesification;
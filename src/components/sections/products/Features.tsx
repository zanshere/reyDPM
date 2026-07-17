import React from 'react';
import type { Product } from '@/data/products';

export interface ProductFeaturesProps {
  product: Product;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ product }) => (
  <section data-reveal className="section-padding">
    <div className="container-custom">
      <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
        Keunggulan
      </h2>
      <div className="flex flex-wrap gap-3">
        {product.features.map((feature) => (
          <span
            key={feature}
            className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary dark:border-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-400"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default ProductFeatures;
import React from 'react';
import type { Product } from '@/data/products';

export interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => (
  <section data-reveal className="section-padding pt-0">
    <div className="container-custom max-w-3xl">
      <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
        Tentang {product.name}
      </h2>
      <p className="leading-relaxed text-justify text-gray-600 dark:text-gray-300">{product.fullDescription}</p>
    </div>
  </section>
);

export default ProductDescription;
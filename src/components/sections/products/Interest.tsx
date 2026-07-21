import React from "react";
import { MessageCircle } from "lucide-react";
import StarBorder from "@/components/reactbits/StarBorder";
import type { Product } from "@/data/products";
import { useAnalytics } from "@/hooks/useAnalytics";
import { AnalyticsSource } from "@/lib/analytics.constant";

export interface ProductInterestProps {
  product: Product;
  accent: string;
  waHref: string;
}

/** CTA penutup halaman detail produk — ajakan chat WhatsApp. */
const ProductInterest: React.FC<ProductInterestProps> = ({
  product,
  accent,
  waHref,
}) => {
  const analytics = useAnalytics();

  return (
    <section data-reveal className="section-padding text-center">
      <div className="container-custom max-w-xl">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
          Tertarik dengan {product.name}?
        </h2>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Hubungi dealer kami untuk test ride atau konsultasi pembelian.
        </p>
        <div className="mt-6 flex justify-center">
          <StarBorder color={accent} speed="3s" thickness={3}>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-1 font-medium text-white no-underline"
              onClick={() => {
                analytics.trackWhatsApp(AnalyticsSource.PRODUCT_INTEREST, {
                  productName: product.name,
                  productSlug: product.slug,
                  productPrice: product.price,
                });
              }}
            >
              <MessageCircle className="size-4" />
              Chat via WhatsApp
            </a>
          </StarBorder>
        </div>
      </div>
    </section>
  );
};

export default ProductInterest;
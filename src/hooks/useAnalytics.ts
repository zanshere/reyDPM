import { useCallback } from "react";
import { trackEvent } from "@/lib/analytics";
import { AnalyticsEvent, GalleryAction } from "@/lib/analytics.constant";

interface ProductAnalytics {
  productName: string;
  productSlug: string;
  productPrice?: number;
}

const CURRENCY = "IDR";

function toEcommerceItem(product: ProductAnalytics) {
  return {
    item_id: product.productSlug,
    item_name: product.productName,
    item_brand: "Vespa",
    price: product.productPrice,
  };
}

export function useAnalytics() {
  const trackProductModal = useCallback((product: ProductAnalytics) => {
    trackEvent(AnalyticsEvent.SELECT_ITEM, {
      currency: CURRENCY,
      value: product.productPrice,
      items: [toEcommerceItem(product)],
    });
  }, []);

  const trackProductView = useCallback((product: ProductAnalytics) => {
    trackEvent(AnalyticsEvent.VIEW_ITEM, {
      currency: CURRENCY,
      value: product.productPrice,
      items: [toEcommerceItem(product)],
    });
  }, []);

  const trackWhatsApp = useCallback(
    (source: string, product?: ProductAnalytics) => {
      trackEvent(AnalyticsEvent.WHATSAPP_CLICK, {
        source,
        product_name: product?.productName,
        product_slug: product?.productSlug,
        product_price: product?.productPrice,
      });
    },
    []
  );

  const trackGallery = useCallback(
    (
      action: (typeof GalleryAction)[keyof typeof GalleryAction],
      productName: string,
      imageIndex: number
    ) => {
      trackEvent(AnalyticsEvent.GALLERY_INTERACTION, {
        action,
        product_name: productName,
        image_index: imageIndex,
      });
    },
    []
  );

  const trackThemeChange = useCallback((theme: "light" | "dark") => {
    trackEvent(AnalyticsEvent.THEME_CHANGE, { theme });
  }, []);

  const trackFaqOpen = useCallback((question: string) => {
    trackEvent(AnalyticsEvent.FAQ_OPEN, { question });
  }, []);

  /** Pageview manual — panggil ini dari hook Swup (hook: "page:view") saat transisi antar halaman. */
  const trackVirtualPageView = useCallback(
    (pagePath: string, pageTitle: string) => {
      trackEvent(AnalyticsEvent.VIRTUAL_PAGE_VIEW, {
        page_path: pagePath,
        page_title: pageTitle,
        page_location:
          typeof window !== "undefined" ? window.location.href : undefined,
      });
    },
    []
  );

  return {
    trackProductModal,
    trackProductView,
    trackWhatsApp,
    trackGallery,
    trackThemeChange,
    trackFaqOpen,
    trackVirtualPageView,
  };
}
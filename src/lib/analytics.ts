declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | "product_modal_open"
  | "product_detail_view"
  | "whatsapp_click"
  | "faq_open"
  | "theme_change"
  | "contact_click"
  | "scroll_90";

export interface AnalyticsEventParams {
  [key: string]: unknown;
}

export function trackEvent(
  event: string,
  params: AnalyticsEventParams = {}
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event,
    ...params,
  });

  if (import.meta.env.PROD) {
    console.log("[Analytics]", event, params);
  }
}
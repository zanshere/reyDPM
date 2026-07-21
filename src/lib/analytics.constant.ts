export const AnalyticsEvent = {
  SELECT_ITEM: "select_item",
  VIEW_ITEM: "view_item",
  WHATSAPP_CLICK: "whatsapp_click",
  GALLERY_INTERACTION: "gallery_interaction",
  THEME_CHANGE: "theme_change",
  FAQ_OPEN: "faq_open",
  SOCIAL_CLICK: "social_click",
  VIRTUAL_PAGE_VIEW: "virtual_pageview",
} as const;

export const AnalyticsSource = {
  PRODUCTS_SECTION: "products_section",
  PRODUCT_HERO: "product_hero",
  PRODUCT_INTEREST: "product_interest",
  CONTACT_SECTION: "contact_section",
  HOMEPAGE: "homepage",
  NAVBAR: "navbar",
  FOOTER: "footer",
} as const;

export const GalleryAction = {
  OPEN: "open",
  NEXT: "next",
  PREVIOUS: "previous",
  JUMP: "jump",
} as const;
// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sentry from '@sentry/astro';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import robotsTxt from 'astro-robots-txt';
import swup from '@swup/astro';

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL || 'https://vespadpmcibubur.vercel.app',
  integrations: [
    react(),
    swup({
      globalInstance: true,
      containers: ['#swup'],
      smoothScrolling: false,
      cache: true,
      preload: { hover: true, visible: false },
      accessibility: true,
      reloadScripts: true,
    }),
    sentry({
      project: import.meta.env.SENTRY_PROJECT,
      org: import.meta.env.SENTRY_ORG,
      authToken: import.meta.env.SENTRY_AUTH_TOKEN,
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Halaman error tidak perlu diindeks Google.
      filter: (page) => !page.includes('/404'),
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});

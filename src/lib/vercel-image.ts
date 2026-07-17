/**
 * Optimasi gambar lewat Vercel Image Optimization API (`/_vercel/image`).
 *
 * Kenapa ini, bukan `astro:assets`: semua gambar produk berasal dari
 * `data/products.ts` dan dirender di dalam komponen React (Products.tsx,
 * ProductDetail.tsx, ProductGallery.tsx, Home.tsx) — bukan dari file
 * `.astro`. `astro:assets`/`<Image>` cuma bekerja untuk gambar yang
 * diimport & diproses Astro saat build, jadi tidak menyentuh gambar-gambar
 * ini sama sekali. `/_vercel/image` sebaliknya adalah endpoint HTTP di
 * platform Vercel sendiri (bukan fitur Astro) — bisa dipanggil dari mana
 * saja, termasuk `<img src>` biasa di React, selama widths & domain-nya
 * didaftarkan di `vercel.json` (lihat properti `images`).
 *
 * PENTING: array `VERCEL_IMAGE_SIZES` di sini HARUS SAMA PERSIS dengan
 * `images.sizes` di vercel.json — Vercel akan menolak request dengan `w`
 * yang tidak ada di whitelist itu.
 */

export const VERCEL_IMAGE_SIZES = [320, 400, 480, 640, 800, 1024, 1280, 1600, 1920] as const;
export const DEFAULT_QUALITY = 75;

const isLocalPath = (src: string) => src.startsWith('/') && !src.startsWith('//');

/**
 * Endpoint `/_vercel/image` hanya tersedia saat dideploy di Vercel (atau
 * lewat `vercel dev`) — TIDAK ada di server dev biasa Astro (`astro dev`).
 * Di luar production build, kembalikan src asli apa adanya supaya
 * pengalaman dev tetap normal (gambar tetap tampil, cuma tidak dioptimasi).
 */
// `import.meta.env` may not be typed in some TS configs; cast to any to avoid
// "Property 'env' does not exist on type 'ImportMeta'" errors.
const shouldOptimize = (src: string) => (import.meta as any).env?.PROD && isLocalPath(src);

/** Bangun satu URL `/_vercel/image?url=...&w=...&q=...` untuk satu lebar. */
export function optimizedSrc(src: string, width: number, quality: number = DEFAULT_QUALITY): string {
  if (!shouldOptimize(src)) return src;
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/**
 * Bangun atribut `srcset` dari beberapa lebar sekaligus, supaya browser
 * bisa memilih varian paling pas dengan ukuran layar/DPR pengguna alih-alih
 * selalu mengunduh versi terbesar.
 */
export function buildSrcSet(
  src: string,
  widths: readonly number[] = VERCEL_IMAGE_SIZES,
  quality: number = DEFAULT_QUALITY
): string | undefined {
  if (!shouldOptimize(src)) return undefined;
  return widths.map((w) => `${optimizedSrc(src, w, quality)} ${w}w`).join(', ');
}
/**
 * Konfigurasi kontak dealer. Nilai yang mudah berubah (nomor WA, nama
 * dealer) ditaruh di file `.env` supaya bisa di-update tanpa menyentuh kode
 * — lihat `.env.example` untuk daftar variabel yang dibutuhkan.
 *
 * PENTING: variabel di sini dipakai di komponen React yang jalan di
 * browser, jadi WAJIB diawali `PUBLIC_` agar ikut ter-bundle oleh Vite/Astro.
 * https://docs.astro.build/en/guides/environment-variables/
 */

function requireEnv(key: string, value: string | undefined): string {
  if (!value) {
    // Gagal cepat di dev/build supaya tidak ke-deploy dengan config kosong.
    throw new Error(`[dealer.ts] Env var "${key}" belum diset. Cek file .env kamu.`);
  }
  return value;
}

export const DEALER_NAME = requireEnv(
  'PUBLIC_DEALER_NAME',
  import.meta.env.PUBLIC_DEALER_NAME
);

/** Format internasional, tanpa '+' atau spasi. */
export const WHATSAPP_NUMBER = requireEnv(
  'PUBLIC_WHATSAPP_NUMBER',
  import.meta.env.PUBLIC_WHATSAPP_NUMBER
);

export const DEFAULT_WHATSAPP_MESSAGE =
  import.meta.env.PUBLIC_WHATSAPP_DEFAULT_MESSAGE ??
  'Halo, saya tertarik untuk mengetahui informasi lebih lanjut tentang Vespa Matic di Vespa DPM Cibubur.';

export const INSTAGRAM_URL = import.meta.env.PUBLIC_INSTAGRAM_URL ?? '';
export const TIKTOK_URL = import.meta.env.PUBLIC_TIKTOK_URL ?? '';

/** Pesan WA yang otomatis menyebut nama produk — dipakai CTA halaman detail produk. */
export function buildProductWhatsAppMessage(productName: string): string {
  return `Halo, saya tertarik dengan ${productName} di ${DEALER_NAME}. Bisa minta info lebih lanjut?`;
}

/** Bangun URL wa.me siap pakai dari pesan yang diberikan (default: pesan umum). */
export function buildWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
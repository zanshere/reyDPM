export interface Product {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  price: number;
  formattedPrice: string;
  /** Format "Label: Nilai" — dipecah otomatis di halaman detail */
  specs: string[];
  /** Poin-poin keunggulan produk, ditampilkan sebagai badge di halaman detail */
  features: string[];
  /** Foto tambahan (di luar thumbnail) untuk galeri halaman detail */
  images: string[];
  /** Foto utama — dipakai di card grid & sebagai foto pertama galeri */
  thumbnail: string;
}

export const productsData: Product[] = [
  {
    id: 1,
    slug: 'vespa-sprint-180cc-reguler-2026',
    name: 'Vespa Sprint 180cc Reguler 2026',
    tagline: 'Dinamis Klasik. Sporty. Iconic.',
    description: 'Vespa Sprint 180 2026 hadir sebagai ikon sporti yang memadukan semangat berani dengan teknologi modern. Skuter elegan yang memikat perhatian lewat garis-garis dinamis dan sentuhan akhir premium.',
    fullDescription: 'Vespa Sprint 180 2026 adalah perwujudan semangat muda yang berani dan ekspresif. Mengusung mesin i‑get 180 cc generasi terbaru yang merupakan evolusi dari mesin 150 cc sebelumnya, skuter ini menawarkan lompatan tenaga signifikan hingga 24% menjadi 11 kW di 8.250 rpm serta peningkatan torsi 8%. Dengan sekitar 14% komponen utama mesin yang dikembangkan sepenuhnya baru, termasuk sistem transmisi CVT terbaru yang menghadirkan respons throttle lebih halus dan presisi, Sprint 180 2026 siap menemani setiap perjalanan urban dengan performa yang lincah dan bertenaga.',
    price: 58500000,
    formattedPrice: "Rp 58.500.000",
    specs: ['Mesin: 174.1 cc', 'Daya Maksimum: 11 kW @ 8.250 rpm', 'Torsi Maksimum: 13.7 Nm @ 6.500 rpm', 'Transmisi: CVT', 'Sistem Pembakaran: Injeksi Elektronik', 'Sistem Pendingin: Sirkulasi Udara Tekan', 'Kapasitas Tangki: 7.5 (± 0.6) L', 'ABS: Depan'],
    features: ['Keyless System', 'ABS (Anti-lock Braking System)', 'Dual Channel ABS (varian Tech)'],
    images: [
      '/products/sprint-180cc-reguler-2026/2.jpg',
      '/products/sprint-180cc-reguler-2026/3.jpg',
    ],
    thumbnail: '/products/sprint-180cc-reguler-2026/1.jpg',
  },
  {
    id: 2,
    slug: 'vespa-primavera-2026',
    name: 'Vespa Primavera 2026',
    tagline: 'Gairah Baru. Canggih Ikonik. Bertenaga Klasik.',
    description: 'Vespa Primavera 2026 memadukan desain klasik dengan teknologi modern. Skuter elegan yang memikat perhatian lewat garis-garis ikonik dan sentuhan akhir premium.',
    fullDescription: 'Vespa Primavera 2026 hadir sebagai ikon gaya hidup urban yang memadukan keanggunan desain Italia dengan performa masa kini. Mengusung mesin i‑get 180 cc generasi terbaru yang merupakan evolusi dari mesin 150 cc sebelumnya, skuter ini menawarkan lompatan tenaga signifikan hingga 24% menjadi 11 kW di 8.250 rpm serta peningkatan torsi 8%. Dengan sekitar 14% komponen utama mesin yang dikembangkan sepenuhnya baru, termasuk sistem transmisi CVT terbaru yang menghadirkan respons throttle lebih halus dan presisi, Primavera 2026 siap menemani setiap perjalanan urban dengan performa yang lincah dan bertenaga.',
    price: 55000000,
    formattedPrice: "Rp 55.000.000",
    specs: ['Mesin: 174.1 cc', 'Daya Maksimum: 11 kW @ 8.250 rpm', 'Torsi Maksimum: 13.7 Nm @ 6.500 rpm', 'Transmisi: CVT', 'Sistem Pembakaran: Injeksi Elektronik', 'Sistem Pendingin: Sirkulasi Udara Tekan', 'Kapasitas Tangki: 7.5 (± 0.6) L', 'ABS: Depan'],
    features: ['Mesin i‑get 180 cc', 'Keyless System', 'ABS (Anti-lock Braking System)'],
    images: [
      '/products/primavera-2026/2.jpg',
      '/products/primavera-2026/3.jpg',
      '/products/primavera-2026/4.jpg',
      '/products/primavera-2026/5.jpg',
      '/products/primavera-2026/6.jpg',
      '/products/primavera-2026/7.jpg',
    ],
    thumbnail: '/products/primavera-2026/1.jpg',
  },
  {
    id: 3,
    slug: 'vespa-lx-150-2026',
    name: 'Vespa LX 150 2026',
    tagline: 'Klasik Urban. Gaya Terjangkau. Ikon Sejati.',
    description: 'Vespa LX 150 2026 memadukan desain klasik dengan teknologi modern. Skuter elegan yang memikat perhatian lewat garis-garis ikonik dan sentuhan akhir premium.',
    fullDescription: 'Ditenagai mesin i‑get 154,8 cc yang responsif dan halus, Vespa LX 150 2026 hadir sebagai teman urban andal untuk melintasi padatnya lalu lintas dengan tetap mengusung gaya khas Italia. Bodi baja monokok yang kokoh, lampu bundar LED yang ikonik, serta pilihan warna baru seperti Lilac Euforico dan Green Amabile membuat skuter ini bukan sekadar kendaraan, melainkan pernyataan gaya yang tak lekang waktu.',
    price: 46500000,
    formattedPrice: "Rp 46.500.000",
    specs: ['Mesin: 154.8 cc', 'Daya Maksimum: 9.2 kW @ 7.750 rpm', 'Torsi Maksimum: 12.4 Nm @ 6.750 rpm', 'Transmisi: CVT', 'Sistem Pembakaran: Injeksi Elektronik', 'Sistem Pendingin: Sirkulasi Udara Tekan', 'Kapasitas Tangki: 7.5 (± 0.5) L'],
    features: ['Lampu LED penuh', 'Port USB charging', 'Immobilizer', 'Bodi baja monokok'],
    images: [
      '/products/lx-150-2026/2.jpg',
      '/products/lx-150-2026/3.jpg',
      '/products/lx-150-2026/4.jpg',
      '/products/lx-150-2026/5.jpg',
      '/products/lx-150-2026/6.jpg',
    ],
    thumbnail: '/products/lx-150-2026/1.jpg',
  },
  {
    id: 4,
    slug: 'vespa-sprint-s-180cc',
    name: 'Vespa Sprint S 180cc',
    tagline: 'Dinamis Masa Kini.',
    description: 'Vespa Sprint S 180 2026 memadukan desain sporti dengan teknologi mutakhir. Skuter ekspresif yang memikat perhatian lewat garis-garis tegas dan sentuhan akhir yang berani.',
    fullDescription: 'Vespa Sprint S 180 2026 adalah perwujudan semangat muda yang berani dan ekspresif, menghadirkan tampilan sporti dengan side grid anyar yang mempertegas karakter dinamisnya. Mengusung mesin i‑get 180 cc generasi terbaru yang merupakan evolusi dari mesin 150 cc sebelumnya, skuter ini menawarkan lompatan tenaga signifikan hingga 24% menjadi 11 kW pada 8.250 rpm serta peningkatan torsi sebesar 8%. Dengan sekitar 14% komponen utama mesin yang dikembangkan sepenuhnya baru, termasuk sistem transmisi CVT terbaru yang menghadirkan respons throttle lebih halus dan presisi, Sprin',
    price: 51000000,
    formattedPrice: "Rp 51.000.000",
    specs: ['Mesin: 174.1 cc', 'Daya Maksimum: 11 kW @ 8.250 rpm', 'Torsi Maksimum: 13.7 Nm @ 6.500 rpm', 'Transmisi: CVT', 'Sistem Pembakaran: Injeksi Elektronik', 'Sistem Pendingin: Sirkulasi Udara Tekan', 'Kapasitas Tangki: 7.5 (± 0.6) L ', 'ABS: Depan'],
    features: ['Keyless System', 'ABS (Anti-lock Braking System)', 'MIA Connectivity', 'Sporty Design'],
    images: [
      '/products/sprint-s-180cc/1.jpg',
      '/products/sprint-s-180cc/2.jpg',
      '/products/sprint-s-180cc/3.jpg',
      '/products/sprint-s-180cc/4.jpg',
      '/products/sprint-s-180cc/6.jpg',
      '/products/sprint-s-180cc/7.jpg',
    ],
    thumbnail: '/products/sprint-s-180cc/5.jpg',
  },
  {
    id: 5,
    slug: 'vespa-sprint-tech',
    name: 'Vespa Sprint Tech',
    tagline: 'Sporty Canggih.',
    description: 'Vespa Sprint Tech 2026 memadukan desain sporti dengan teknologi mutakhir. Skuter digital yang memikat perhatian lewat layar canggih dan performa mesin 180 cc terbaru.',
    fullDescription: 'Vespa Sprint Tech 2026 adalah puncak dari inovasi teknologi dalam keluarga Sprint, menghadirkan pengalaman berkendara yang lebih modern dan terhubung. Mengusung mesin i‑get 180 cc generasi terbaru yang merupakan evolusi dari mesin 150 cc sebelumnya, skuter ini menawarkan lompatan tenaga signifikan hingga 24% menjadi 11 kW pada 8.250 rpm serta peningkatan torsi sebesar 8%. Dengan sekitar 14% komponen utama mesin yang dikembangkan sepenuhnya baru, termasuk sistem transmisi CVT terbaru yang menghadirkan respons throttle lebih halus dan presisi, Sprint Tech 2026 siap menemani setiap perjalanan urban dengan performa yang lincah dan bertenaga.',
    price: 60500000,
    formattedPrice: "Rp 61.000.000",
    specs: ['Mesin: 174.1 cc', 'Daya Maksimum: 11 kW @ 8.250 rpm', 'Torsi Maksimum: 13.7 Nm @ 6.500 rpm', 'Transmisi: CVT', 'Sistem Pembakaran: Injeksi Elektronik', 'Sistem Pendingin: Sirkulasi Udara Tekan', 'Kapasitas Tangki: 7.5 (± 0.6) L', 'ABS: Depan Belakang'],
    features: ['Mesin i‑get 180 cc', 'MIA Connectivity', 'Keyless System', 'Dual Channel ABS', 'Desain sporty eksklusif'],
    images: [
      '/products/sprint-tech/1.jpeg',
      '/products/sprint-tech/2.jpeg',
    ],
    thumbnail: '/products/sprint-tech/3.jpeg',
  },
];
import React from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import ShinyText from '@/components/reactbits/ShinyText';
import SplitText from '@/components/reactbits/SplitText';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { LazyReveal } from '@/components/lazy/LazyLoad';
import { useTheme } from '@/hooks/useTheme';

export const faqs = [
  {
    q: 'Berapa harga vespa terbaru?',
    a: 'Harga vespa terbaru sangat bervariasi, tergantung dari jenis vespa yang dipilih, untuk harga mulai dari 46-97 juta.',
  },
  {
    q: 'Apakah tersedia program cicilan?',
    a: 'Ya, tersedia pembelian secara kredit/cicilan melalui perusahaan leasing. DP mulai dari 7jt dari harga motor, tergantung tipe Vespa, tenor, dan hasil persetujuan leasing. Hubungi kami untuk simulasi DP dan angsuran sesuai kebutuhan Anda.',
  },
  {
    q: 'Apa saja warna yang tersedia untuk setiap tipe Vespa?',
    a: 'Setiap tipe Vespa memiliki pilihan warna yang berbeda dan dapat berubah mengikuti tahun produksi. Kami dapat menginformasikan warna yang ready stock sesuai tipe yang Anda minati, seperti LX, Primavera, Sprint, atau GTS.',
  },
  {
    q: 'Berapa lama proses pengiriman setelah pembelian?',
    a: 'Jika unit tersedia, pengiriman biasanya dilakukan dalam 1–2 hari kerja, tergantung lokasi pengiriman dan proses administrasi. Apabila unit inden, estimasi akan diinformasikan saat pemesanan.',
  },
  {
    q: 'Apa saja syarat pengajuan kredit Vespa?',
    a: 'Persyaratan umum meliputi Fotokopi KTP pemohon & pasangan (jika sudah menikah), Kartu Keluarga, Bersedia dilakukan survei oleh pihak leasing.',
  },
];

const FAQContent: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="faq" className="section-padding bg-cream transition-colors dark:bg-[#0d0d0d]">
      <div className="container-custom mx-auto max-w-3xl">
        <LazyReveal className="mb-10 flex flex-col items-center space-y-3 text-center">
          <ShinyText
            text="✦ FAQ"
            speed={3}
            shineColor={isDark ? '#facc15' : '#4f46e5'}
            color={isDark ? '#666' : '#aaa'}
            spread={80}
          />
          <SplitText
            text="Pertanyaan yang Sering Diajukan"
            tag="h2"
            className="text-4xl font-bold tracking-tight sm:text-5xl"
            delay={50}
            duration={1.2}
          />
        </LazyReveal>

        <Accordion className="space-y-2">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.q}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#1a1a1a]"
            >
              <AccordionTrigger className="w-full px-6 py-4 text-left font-medium transition-colors hover:bg-gray-50 dark:text-white dark:hover:bg-[#252525]">
                <span className="flex-1">{faq.q}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

/** Self-wrapped ThemeProvider — menggantikan FAQIsland.tsx yang dihapus. */
const FAQ: React.FC = () => (
  <ThemeProvider>
    <FAQContent />
  </ThemeProvider>
);

export default FAQ;
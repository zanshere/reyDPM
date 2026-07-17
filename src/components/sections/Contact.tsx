import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import ShinyText from '@/components/reactbits/ShinyText';
import SplitText from '@/components/reactbits/SplitText';
import StarBorder from '@/components/reactbits/StarBorder';
import { LazyReveal } from '@/components/lazy/LazyLoad';
import { useTheme } from '@/hooks/useTheme';
import { DEALER_NAME, buildWhatsAppLink } from '@/data/dealer';

const ContactContent: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const accent = isDark ? '#facc15' : '#4f46e5';

  const whatsappHref = buildWhatsAppLink();

  return (
    <section id="contact" className="section-padding bg-white transition-colors dark:bg-[#0d0d0d]">
      <div className="container-custom">
        <LazyReveal className="mx-auto flex max-w-xl flex-col items-center space-y-6 text-center">
          <ShinyText
            text="✦ Hubungi Kami"
            speed={3}
            shineColor={accent}
            color={isDark ? '#666' : '#aaa'}
            spread={80}
          />
          <SplitText
            text="Ngobrol Langsung via WhatsApp"
            tag="h2"
            className="text-4xl font-bold tracking-tight sm:text-5xl"
            delay={50}
            duration={1.2}
          />
          <p className="text-gray-500 dark:text-gray-400">
            Punya pertanyaan seputar Vespa Matic, test ride, atau simulasi cicilan? Tim kami siap
            membantu lewat WhatsApp.
          </p>

          <p className="text-lg font-semibold dark:text-white">{DEALER_NAME}</p>

          <div className="flex justify-center pt-2">
            <StarBorder color={accent} speed="3s" thickness={3}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-1 font-medium text-white no-underline"
              >
                <MessageCircle className="size-4" />
                Chat via WhatsApp
              </a>
            </StarBorder>
          </div>
        </LazyReveal>
      </div>
    </section>
  );
};

/** Self-wrapped ThemeProvider — menggantikan ContactIsland.tsx yang dihapus. */
const Contact: React.FC = () => (
  <ThemeProvider>
    <ContactContent />
  </ThemeProvider>
);

export default Contact;
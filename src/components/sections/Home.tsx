import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LenisProvider, useLenis } from '@/providers/LenisProvider';
import ShinyText from '@/components/reactbits/ShinyText';
import SplitText from '@/components/reactbits/SplitText';
import StarBorder from '@/components/reactbits/StarBorder';
import { Button } from '@/components/ui/button';
import { LazyImage } from '@/components/lazy/LazyLoad';
import { useTheme } from '@/hooks/useTheme';

const HERO_IMAGE_URL = '/hero-image.jpeg';

const HomeContent: React.FC = () => {
  const { theme } = useTheme();
  const { lenis } = useLenis();
  const isDark = theme === 'dark';
  const accent = isDark ? '#facc15' : '#4f46e5';

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:py-28"
      style={{
        background: isDark
          ? 'radial-gradient(ellipse at 30% 40%, #1a1a2e 0%, #0d0d0d 70%)'
          : 'radial-gradient(ellipse at 30% 40%, #f5f0eb 0%, #fafaf8 70%)',
      }}
    >
      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* kiri: teks */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              <ShinyText
                text="✦ Vespa DPM Cibubur"
                speed={3}
                shineColor={accent}
                color={isDark ? '#888' : '#999'}
                spread={90}
              />
            </div>

            <SplitText
              text="Ride the Icon"
              tag="h1"
              className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
              delay={70}
              duration={1.4}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
            />

            <p className="max-w-lg text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
              Rasakan keanggunan yang abadi dari Vespa Matic. Skuter premium untuk mereka yang menghargai gaya, performa, dan
              kenikmatan berkendara.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <StarBorder as="button" color={accent} speed="3s" thickness={3}>
                <a href="#products" className="block px-4 py-1 font-medium text-white no-underline">
                  Jelajahi Sekarang
                </a>
              </StarBorder>
              <Button
                variant="outline"
                className="border-gray-300 px-6 py-7 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                onClick={() => lenis?.scrollTo('#contact', { offset: -96, duration: 1.2 })}
              >
                Hubungi Kami
              </Button>
            </div>
          </motion.div>

          {/* kanan: hero image */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl"
            >
              <LazyImage
                src={HERO_IMAGE_URL}
                alt="Vespa Matic"
                loading="eager"
                fetchPriority="high"
                widths={[480, 640, 800, 1024, 1280, 1600]}
                sizes="(min-width: 1280px) 42rem, (min-width: 1024px) 36rem, 90vw"
                wrapperClassName="w-full rounded-3xl"
                skeletonClassName="rounded-3xl"
                className="h-auto w-full rounded-3xl shadow-2xl"
                style={{
                  boxShadow: isDark
                    ? '0 20px 60px rgba(0,0,0,0.8)'
                    : '0 20px 60px rgba(0,0,0,0.12)',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => (
  <ThemeProvider>
    <LenisProvider>
      <HomeContent />
    </LenisProvider>
  </ThemeProvider>
);

export default Home;
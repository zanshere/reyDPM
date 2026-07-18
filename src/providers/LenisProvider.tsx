import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LenisContextType {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

interface LenisProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    smoothWheel?: boolean;
    wheelMultiplier?: number;
    touchMultiplier?: number;
    infinite?: boolean;
    orientation?: 'vertical' | 'horizontal';
    gestureOrientation?: 'vertical' | 'horizontal' | 'both';
  };
}

/** Nama event yang di-dispatch Layout.astro setelah Swup selesai menukar konten halaman. */
const PAGE_TRANSITION_EVENT = 'vespa-page-transition';

export const LenisProvider: React.FC<LenisProviderProps> = ({
  children,
  options = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  },
}) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Inisialisasi Lenis
    const lenis = new Lenis({
      duration: options.duration || 1.2,
      easing: options.easing || ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      smoothWheel: options.smoothWheel ?? true,
      wheelMultiplier: options.wheelMultiplier || 1,
      touchMultiplier: options.touchMultiplier || 1,
      infinite: options.infinite || false,
      orientation: options.orientation || 'vertical',
      gestureOrientation: options.gestureOrientation || 'vertical',
    });

    lenisRef.current = lenis;

    setLenisInstance(lenis);

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const refreshScrollTrigger = () => ScrollTrigger.refresh();
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    const timeoutId = setTimeout(refreshScrollTrigger, 100);
    const handleLenisLock = () => lenis.stop();
    const handleLenisUnlock = () => lenis.start();
    window.addEventListener('vespa-lenis-lock', handleLenisLock);
    window.addEventListener('vespa-lenis-unlock', handleLenisUnlock);

    const NAVBAR_OFFSET = -96; // kompensasi tinggi navbar fixed

    const scrollToHash = (hash: string, immediate = false) => {
      if (!hash) return;
      const el = document.querySelector(hash);
      if (!el) return;
      lenis.scrollTo(el as HTMLElement, { offset: NAVBAR_OFFSET, duration: 1.2, immediate });
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      // Hanya cegat anchor internal ke section di halaman INI juga.
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
        return;
      }

      e.preventDefault();
      scrollToHash(url.hash);
      window.history.pushState(null, '', url.hash);
    };

    document.addEventListener('click', handleAnchorClick);

    // Scroll otomatis ke section saat halaman baru pertama render dengan hash
    // di URL.
    if (window.location.hash) {
      requestAnimationFrame(() => {
        setTimeout(() => scrollToHash(window.location.hash, true), 50);
      });
    }

    const handlePageTransition = () => {
      lenis.resize();
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };
    window.addEventListener(PAGE_TRANSITION_EVENT, handlePageTransition);

    // Loop animasi
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener(PAGE_TRANSITION_EVENT, handlePageTransition);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener('vespa-lenis-lock', handleLenisLock);
      window.removeEventListener('vespa-lenis-unlock', handleLenisUnlock);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  );
};

export default LenisProvider;
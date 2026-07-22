import React from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import StaggeredMenu from '@/components/reactbits/StaggeredMenu';
import { useTheme } from '@/hooks/useTheme';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsSource } from '@/lib/analytics.constant';
import { INSTAGRAM_URL, TIKTOK_URL } from '@/data/dealer';
import { Sun, Moon } from 'lucide-react';

const navItems = [
  { label: 'Beranda', link: '/#home' },
  { label: 'Produk', link: '/#products' },
  { label: 'Kontak', link: '/#contact' },
  { label: 'FAQ', link: '/#faq' },
];

const Logo: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <span className="text-lg font-bold" style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
    Vespa<span style={{ color: isDark ? '#facc15' : '#4f46e5' }}>DPM</span>
  </span>
);

const NavbarContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const analytics = useAnalytics();
  const isDark = theme === 'dark';

  // Hanya tampilkan link sosial yang memang diisi di .env.
  const socialItems = [
    INSTAGRAM_URL && { label: 'Instagram', link: INSTAGRAM_URL },
    TIKTOK_URL && { label: 'TikTok', link: TIKTOK_URL },
  ].filter((item): item is { label: string; link: string } => Boolean(item));

  const handleThemeToggle = () => {
    analytics.trackThemeChange(isDark ? 'light' : 'dark');
    toggleTheme();
  };

  const ThemeToggle: React.FC<{ className?: string }> = ({ className = 'theme-btn' }) => (
    <button type="button" onClick={handleThemeToggle} className={className} aria-label="Ubah tema">
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );

  return (
    <>
      {/* Mobile / tablet (< 1024px) */}
      <div className="lg:hidden">
        <StaggeredMenu
          position="right"
          items={navItems.map((item) => ({ label: item.label, ariaLabel: item.label, link: item.link }))}
          socialItems={socialItems}
          onSocialItemClick={(platform) => analytics.trackSocialClick(platform, AnalyticsSource.NAVBAR)}
          accentColor={isDark ? '#facc15' : '#4f46e5'}
          menuButtonColor={isDark ? '#fff' : '#1a1a1a'}
          openMenuButtonColor={isDark ? '#fff' : '#1a1a1a'}
          logoUrl="/favicon.svg"
          logoText={<Logo isDark={isDark} />}
          displaySocials={socialItems.length > 0}
          displayItemNumbering={true}
          isFixed={true}
          closeOnClickAway={true}
          headerActions={<ThemeToggle className="theme-btn bg-white/80 backdrop-blur-md dark:bg-black/40" />}
        />
      </div>

      {/* Desktop (>= 1024px) */}
      <header className="fixed top-0 left-0 z-50 hidden w-full border-b border-white/10 bg-white/20 backdrop-blur-xl transition-colors lg:block dark:border-white/5 dark:bg-[#0d0d0d]/30">
        <div className="container-custom flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight dark:text-white">
            <img src="/favicon.svg" alt="" width={28} height={28} className="h-7 w-auto" draggable={false} />
            <Logo isDark={isDark} />
          </a>
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.link}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-yellow-400"
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </header>
    </>
  );
};

const Navbar: React.FC = () => (
  <ThemeProvider>
    <NavbarContent />
  </ThemeProvider>
);

export default Navbar;
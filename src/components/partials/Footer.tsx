import React from 'react';
import { Heart } from 'lucide-react';
import { DEALER_NAME } from '@/data/dealer';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white py-8 transition-colors dark:border-gray-800 dark:bg-[#0d0d0d]">
      <div className="container-custom flex flex-col items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400 sm:flex-row">
        <span>© {currentYear} {DEALER_NAME}. Semua hak dilindungi.</span>
        <span className="inline-flex items-center gap-1">
          Dibuat dengan <Heart className="inline-block w-5 h-5 text-red-700" /> untuk para pecinta Vespa.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
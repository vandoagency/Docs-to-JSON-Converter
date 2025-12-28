import React from 'react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} <span className="font-bold text-gray-800">Vando Agency</span>. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              doctojson.vandoagency.com - Geliştirici Dostu Araçlar
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <button onClick={onOpenPrivacy} className="hover:text-blue-600 transition-colors" title="Gizlilik Politikamızı İnceleyin">
              Gizlilik Politikası
            </button>
            <span className="text-gray-300">|</span>
            <button onClick={onOpenTerms} className="hover:text-blue-600 transition-colors" title="Kullanım Şartlarını Okuyun">
              Kullanım Şartları
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Geliştirici:</span>
            <a 
              href="https://vandoagency.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Vando Dijital Ajans Resmi Web Sitesi"
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
            >
              Vando Dijital Ajans <i className="fas fa-external-link-alt text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
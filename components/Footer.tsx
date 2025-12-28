import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              &copy; 2026 <span className="font-bold text-gray-800">Vando Agency</span>. {t('footerRights')}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              <a href="mailto:hello@vandoagency.com" className="hover:text-blue-600 transition-colors">hello@vandoagency.com</a>
              <span className="mx-2">-</span>
              {t('footerDesc')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <button onClick={onOpenPrivacy} className="hover:text-blue-600 transition-colors">
              {t('privacyPolicy')}
            </button>
            <span className="text-gray-300">|</span>
            <button onClick={onOpenTerms} className="hover:text-blue-600 transition-colors">
              {t('termsOfUse')}
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{t('developer')}</span>
            <a 
              href="https://vandoagency.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
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
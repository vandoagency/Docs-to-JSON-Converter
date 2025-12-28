import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface CookieConsentProps {
  onOpenPolicy: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPolicy }) => {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vando_cookie_consent');
    if (!consent) {
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('vando_cookie_consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur shadow-2xl border border-gray-200 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0 mt-1">
            <i className="fas fa-cookie-bite"></i>
          </div>
          <div className="text-sm text-gray-600">
            <h4 className="font-bold text-gray-900 mb-1">{t('cookieTitle')}</h4>
            <p>
              {t('cookieText')}
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={onOpenPolicy}
            className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
          >
            {t('cookieDetails')}
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-600/20 transition-all"
          >
            {t('cookieAccept')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
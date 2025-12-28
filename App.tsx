import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FileUploader from './components/FileUploader';
import GoogleDocsFetcher from './components/GoogleDocsFetcher';
import JsonViewer from './components/JsonViewer';
import LegalModals from './components/LegalModals';
import CookieConsent from './components/CookieConsent';
import ConfirmationModal from './components/ConfirmationModal';
import { ConvertedData, DocSource } from './types';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<DocSource>(DocSource.LOCAL);
  const [files, setFiles] = useState<ConvertedData[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Modal States
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'cookies' | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleFilesAdded = (newFiles: ConvertedData[]) => {
    setError(null);
    setFiles(prev => [...prev, ...newFiles]);
    
    // Smooth scroll to result
    setTimeout(() => {
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  // Trigger modal instead of window.confirm
  const handleClearAllRequest = () => {
    if (files.length > 0) {
      setShowClearConfirm(true);
    }
  };

  // Execute clear
  const executeClearAll = () => {
    setFiles([]);
    setShowClearConfirm(false);
  };

  const handleError = (msg: string) => {
    setError(msg);
    // Auto clear error after 5 seconds
    setTimeout(() => setError(null), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Intro Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
            {t('heroTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('heroDesc')}
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm animate-bounce-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-circle text-red-500"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Tabs */}
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex w-full">
              <button
                onClick={() => setActiveTab(DocSource.LOCAL)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                  ${activeTab === DocSource.LOCAL 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <i className="fas fa-laptop-file"></i> {t('tabLocal')}
              </button>
              <button
                onClick={() => setActiveTab(DocSource.GOOGLE)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                  ${activeTab === DocSource.GOOGLE 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <i className="fab fa-google"></i> {t('tabGoogle')}
              </button>
            </div>

            {/* Input Area */}
            <div className="animate-fade-in">
              {activeTab === DocSource.LOCAL ? (
                <FileUploader 
                  onFilesAdded={handleFilesAdded} 
                  onError={handleError} 
                />
              ) : (
                <GoogleDocsFetcher 
                  onFilesAdded={handleFilesAdded} 
                  onError={handleError} 
                />
              )}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <div className="text-blue-500 mb-2"><i className="fas fa-file-excel text-2xl"></i></div>
                <h4 className="font-bold text-gray-800 text-sm">{t('cardSpreadsheets')}</h4>
                <p className="text-xs text-gray-500 mt-1">{t('cardSpreadsheetsDesc')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <div className="text-blue-500 mb-2"><i className="fas fa-file-word text-2xl"></i></div>
                <h4 className="font-bold text-gray-800 text-sm">{t('cardDocuments')}</h4>
                <p className="text-xs text-gray-500 mt-1">{t('cardDocumentsDesc')}</p>
              </div>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-2 min-h-[500px]" id="result-section">
            {files.length > 0 ? (
              <JsonViewer 
                files={files} 
                onRemove={handleRemoveFile}
                onClearAll={handleClearAllRequest}
              />
            ) : (
              <div className="h-full bg-white border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 p-12 min-h-[400px]">
                <i className="fas fa-code text-6xl mb-4 opacity-20"></i>
                <p className="font-medium text-lg">{t('resultsPlaceholderTitle')}</p>
                <p className="text-sm opacity-60">{t('resultsPlaceholderDesc')}</p>
                <p className="text-xs text-blue-500 mt-2 bg-blue-50 px-2 py-1 rounded">
                  <i className="fas fa-info-circle"></i> {t('resultsMultiUpload')}
                </p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer 
        onOpenPrivacy={() => setActiveModal('privacy')}
        onOpenTerms={() => setActiveModal('terms')}
      />
      
      <CookieConsent onOpenPolicy={() => setActiveModal('cookies')} />
      
      <LegalModals 
        activeModal={activeModal} 
        onClose={() => setActiveModal(null)} 
      />

      <ConfirmationModal 
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={executeClearAll}
        title={t('confirmTitle')}
        message={t('confirmMessage')}
      />
    </div>
  );
};

export default App;
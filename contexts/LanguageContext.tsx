
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';

interface Translations {
  [key: string]: {
    tr: string;
    en: string;
  };
}

const translations: Translations = {
  // Header & General
  siteTitle: { tr: "Docs to JSON Converter", en: "Docs to JSON Converter" },
  ourWebsite: { tr: "Web Sitemiz", en: "Our Website" },
  contactBtn: { tr: "İletişim", en: "Contact Us" },
  
  // App Main
  heroTitle: { tr: "Dokümanlarınızı Anında JSON'a Çevirin", en: "Convert Documents to JSON Instantly" },
  heroDesc: { 
    tr: "Vando Agency güvencesiyle; Excel, Word, CSV, TXT, PDF ve Google Docs dosyalarınızı geliştiriciler için işlenebilir JSON formatına dönüştürün.", 
    en: "Powered by Vando Agency; convert Excel, Word, CSV, TXT, PDF, and Google Docs files into developer-friendly JSON format." 
  },
  tabLocal: { tr: "Yerel Dosya", en: "Local File" },
  tabGoogle: { tr: "Google Docs", en: "Google Docs" },
  cardSpreadsheets: { tr: "Spreadsheets", en: "Spreadsheets" },
  cardSpreadsheetsDesc: { tr: "XLS, XLSX, CSV desteği ile tablo verilerini array'e çevirin.", en: "Convert table data to arrays with XLS, XLSX, CSV support." },
  cardDocuments: { tr: "Documents", en: "Documents" },
  cardDocumentsDesc: { tr: "Doc, Docx ve Google Docs içeriklerini text veya yapısal JSON olarak alın.", en: "Get Doc, Docx, and Google Docs content as text or structured JSON." },
  resultsPlaceholderTitle: { tr: "Sonuçlar burada görünecek", en: "Results will appear here" },
  resultsPlaceholderDesc: { tr: "Bir dosya yükleyin veya Google Docs URL'si girin.", en: "Upload a file or enter a Google Docs URL." },
  resultsMultiUpload: { tr: "Artık çoklu dosya yükleyebilirsiniz", en: "Multi-file upload is now available" },

  // File Uploader
  dropZoneDefault: { tr: "Dosyaları sürükleyin veya", en: "Drag files here or" },
  dropZoneClick: { tr: "seçmek için tıklayın", en: "click to select" },
  dropZoneLimit: { tr: "Maksimum 15 dosya (XLSX, PDF, CSV, DOCX, TXT, JSON)", en: "Max 15 files (XLSX, PDF, CSV, DOCX, TXT, JSON)" },
  processing: { tr: "Dosyalar analiz ediliyor...", en: "Analyzing files..." },
  processingDesc: { tr: "Bu işlem dosya boyutuna göre biraz zaman alabilir.", en: "This may take a while depending on file size." },
  errorLimit: { tr: "Toplu yükleme sınırı aşıldı. Tek seferde en fazla 15 dosya yükleyebilirsiniz.", en: "Bulk upload limit exceeded. You can upload max 15 files at once." },
  errorGeneral: { tr: "Dosya işleme sırasında genel bir hata oluştu.", en: "An error occurred during file processing." },

  // Google Docs Fetcher
  googleImportTitle: { tr: "Google Docs Import", en: "Google Docs Import" },
  apiSettings: { tr: "API Ayarları", en: "API Settings" },
  labelClientId: { tr: "Client ID", en: "Client ID" },
  labelApiKey: { tr: "API Key", en: "API Key" },
  btnCancel: { tr: "İptal", en: "Cancel" },
  btnSave: { tr: "Kaydet", en: "Save" },
  warningCredentials: { 
    tr: "Bu bilgileri Google Cloud Console'dan almalısınız. Sadece tarayıcınızın yerel hafızasında (LocalStorage) saklanır.", 
    en: "You must get these credentials from Google Cloud Console. They are stored only in your browser's local storage." 
  },
  placeholderUrl: { tr: "https://docs.google.com/document/d/...", en: "https://docs.google.com/document/d/..." },
  btnProcessing: { tr: "İşleniyor", en: "Processing" },
  btnConvert: { tr: "JSON'a Çevir", en: "Convert to JSON" },
  loadingLibs: { tr: "Google API kütüphaneleri yükleniyor...", en: "Loading Google API libraries..." },
  footerNote: { tr: "Google Docs API v1 kullanılarak dökümanın body yapısı JSON formatında çekilir.", en: "Document body structure is fetched in JSON format using Google Docs API v1." },
  errorMissingApi: { tr: "API Anahtarı eksik. Lütfen ayarlardan ekleyin.", en: "API Key missing. Please add it from settings." },
  errorInvalidUrl: { tr: "Geçerli bir Google Doküman URL'si veya ID'si giriniz.", en: "Please enter a valid Google Doc URL or ID." },
  errorAuthFail: { tr: "Yetkilendirme başarısız oldu.", en: "Authorization failed." },
  errorCredsMissing: { tr: "Lütfen önce Google Cloud Credentials bilgilerinizi giriniz.", en: "Please enter your Google Cloud Credentials first." },

  // Json Viewer
  filesUploaded: { tr: "Dosya Yüklendi", en: "Files Uploaded" },
  downloadAllZip: { tr: "Tümünü İndir (ZIP)", en: "Download All (ZIP)" },
  copy: { tr: "Kopyala", en: "Copy" },
  download: { tr: "İndir", en: "Download" },
  noFile: { tr: "Görüntülenecek dosya yok", en: "No file to display" },
  copySuccess: { tr: "Aktif dosya JSON verisi panoya kopyalandı!", en: "Active file JSON data copied to clipboard!" },
  zipError: { tr: "ZIP dosyası oluşturulurken hata oluştu.", en: "Error creating ZIP file." },

  // Footer
  footerRights: { tr: "Tüm hakları saklıdır.", en: "All rights reserved." },
  footerDesc: { tr: "Geliştirici Dostu Araçlar", en: "Developer Friendly Tools" },
  privacyPolicy: { tr: "Gizlilik Politikası", en: "Privacy Policy" },
  termsOfUse: { tr: "Kullanım Şartları", en: "Terms of Use" },
  developer: { tr: "Geliştirici:", en: "Developer:" },

  // Contact Form
  contactTitle: { tr: "Bize Ulaşın", en: "Contact Us" },
  lblFullName: { tr: "Ad Soyad", en: "Full Name" },
  lblEmail: { tr: "E-posta", en: "Email" },
  lblPhone: { tr: "Telefon (İsteğe bağlı)", en: "Phone (Optional)" },
  lblSubject: { tr: "Konu", en: "Subject" },
  lblMessage: { tr: "Mesaj", en: "Message" },
  btnSend: { tr: "Gönder", en: "Send Message" },
  btnSending: { tr: "Gönderiliyor...", en: "Sending..." },
  msgSentSuccess: { tr: "Mesajınız başarıyla gönderildi!", en: "Your message has been sent successfully!" },
  msgSentError: { tr: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.", en: "Failed to send message. Please try again later." },
  errRequired: { tr: "Bu alan zorunludur.", en: "This field is required." },

  // Legal Modals & Cookie
  cookieText: { tr: "Size daha iyi bir deneyim sunmak ve trafiği analiz etmek için çerezleri kullanıyoruz. Siteyi kullanmaya devam ederek Çerez Politikamızı kabul etmiş olursunuz.", en: "We use cookies to ensure you get the best experience and to analyze traffic. By continuing to use our site, you accept our Cookie Policy." },
  cookieTitle: { tr: "Çerez Kullanımı", en: "Cookie Usage" },
  cookieDetails: { tr: "Detaylar", en: "Details" },
  cookieAccept: { tr: "Kabul Et", en: "Accept" },
  modalUnderstand: { tr: "Anladım", en: "I Understand" },
  
  // Confirmation Modal
  confirmTitle: { tr: "Tümünü Temizle", en: "Clear All" },
  confirmMessage: { tr: "Listedeki tüm dosyalar kaldırılacak. Bu işlem geri alınamaz. Onaylıyor musunuz?", en: "All files in the list will be removed. This cannot be undone. Do you confirm?" },
  confirmYes: { tr: "Evet, Temizle", en: "Yes, Clear" },

  // Services Errors
  errExcel: { tr: "Excel/CSV dosyası okunamadı.", en: "Excel/CSV file could not be read." },
  errTxt: { tr: "Metin dosyası okunamadı.", en: "Text file could not be read." },
  errDocx: { tr: "Word dosyası okunamadı.", en: "Word file could not be read." },
  errJson: { tr: "Geçersiz JSON dosyası.", en: "Invalid JSON file." },
  errPdf: { tr: "PDF dosyası okunamadı.", en: "PDF file could not be read." },
  errPdfLib: { tr: "PDF kütüphanesi yüklenemedi.", en: "PDF library could not be loaded." },
  errFormat: { tr: "Desteklenmeyen dosya formatı.", en: "Unsupported file format." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');

  useEffect(() => {
    const savedLang = localStorage.getItem('vando_app_lang') as Language;
    if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('vando_app_lang', lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

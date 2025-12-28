import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a 
              href="https://vandoagency.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Vando Dijital Ajans Ana Sayfası"
              className="flex-shrink-0 flex items-center gap-3 group"
            >
              <img 
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
                src="https://vandoagency.com/wp-content/uploads/2023/01/vando-agency-logo.png" 
                alt="Vando Agency Logo" 
              />
              <div className="hidden md:block">
                <span className="block text-lg font-bold text-gray-900 leading-tight">VANDO</span>
                <span className="block text-xs font-medium text-blue-600 tracking-wider">AGENCY</span>
              </div>
            </a>
            <div className="hidden md:block ml-10 pl-10 border-l border-gray-200">
              <h1 className="text-xl font-semibold text-gray-800">
                Docs to JSON Converter
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://vandoagency.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Vando Agency Web Sitesini Ziyaret Edin"
              className="text-gray-500 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              Web Sitemiz
            </a>
            <a 
              href="https://github.com/vandoagency" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Vando Agency GitHub Profili"
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
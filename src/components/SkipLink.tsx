
import React, { useState, useRef } from 'react';
import { useLanguage } from '../Context/LanguageContext';

const translations = {
  en: {
    skipToContent: "Skip to content",
    skipToFooter: "Skip to footer"
  },
  es: {
    skipToContent: "Saltar al contenido",
    skipToFooter: "Ir al pie de página"
  }
};

const SkipLink = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const focusElement = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Desplazar suavemente al elemento
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // MODIFICACIÓN: Enfocar el campo de nombre cuando es el footer
      let focusTarget = element;
      if (id === 'footer') {
        const nameField = document.getElementById('footer-name');
        if (nameField) focusTarget = nameField;
      }

      // Hacerlo enfocable temporalmente
      focusTarget.tabIndex = -1;
      focusTarget.focus();

      // Eliminar tabindex después de 1 segundo
      setTimeout(() => {
        focusTarget.removeAttribute('tabindex');
      }, 1000);
    }
    setIsVisible(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setIsVisible(false);
    }
  };

  return (
    <div className="relative z-[1000] mt-[10px]">
      <div
        ref={containerRef}
        className={`absolute left-4 top-3 flex gap-3 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onFocus={() => setIsVisible(true)}
        onBlur={handleBlur}
      >
        <a
          href="#hero-title"
          onClick={focusElement('hero-title')}
          className="flex items-center gap-2 rounded-lg border-2 border-green-600 bg-black px-4 py-3 text-white shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-green-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          {t.skipToContent}
        </a>

        <a
          href="#footer"
          onClick={focusElement('footer')}
          className="flex items-center gap-2 rounded-lg border-2 border-green-600 bg-black px-4 py-3 text-white shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-green-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          {t.skipToFooter}
        </a>
      </div>
    </div>
  );
};

export default SkipLink;
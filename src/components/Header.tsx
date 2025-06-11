import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe2 } from 'lucide-react';
import { useLanguage } from '../Context/LanguageContext';
import logo from '../img/logo-green.png';

interface Translations {
  contact: string;
  menu: string;
  closeMenu: string;
  home: string;
  logoAlt: string;
  languages: {
    en: string;
    es: string;
  };
  languageSelector: string;
  languageChangeInstruction: string;
}

const translations: Record<'en' | 'es', Translations> = {
  en: {
    contact: 'Contact us',
    menu: 'Menu',
    closeMenu: 'Close menu',
    home: 'A11ySolutions Logo',
    logoAlt: 'A11ySolutions Logo',
    languages: { en: 'ENGLISH', es: 'SPANISH' },
    languageSelector: 'Language selector. Current language: English',
    languageChangeInstruction: 'Use arrow keys to navigate options and press Enter to select',
  },
  es: {
    contact: 'Contáctanos',
    menu: 'Menú',
    closeMenu: 'Cerrar menú',
    home: 'Logo de A11ysolutions',
    logoAlt: 'Logo de A11ysolutions',
    languages: { en: 'INGLÉS', es: 'ESPAÑOL' },
    languageSelector: 'Selector de idioma. Idioma actual: Español',
    languageChangeInstruction: 'Use las flechas para navegar y presione Enter para seleccionar',
  },
};

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const [liveMessage, setLiveMessage] = useState("");
  const liveRef = useRef<HTMLSpanElement>(null);

  const announce = (message: string) => {
    setLiveMessage("");
    setTimeout(() => setLiveMessage(message), 100);
  };

  const handleHover = () => announce(`${t.languageSelector}. ${t.languages[language]}`);
  const handleLeave = () => announce("");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as "en" | "es";
    setLanguage(newLang);
    announce(`${translations[newLang].languageSelector}. ${translations[newLang].languages[newLang]}`);
  };

  return (
    <div
      className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-gray-100 focus-within:bg-gray-100 cursor-pointer"
      role="group"
      aria-labelledby="languageSelectorLabel"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <Globe2 className="w-4 h-4 text-gray-600" aria-hidden="true" />

      <label id="languageSelectorLabel" htmlFor="lang-select" className="sr-only">
        {t.languageSelector}
      </label>
      <select
        id="lang-select"
        value={language}
        onChange={handleLanguageChange}
        onFocus={handleHover}
        onBlur={handleLeave}
        className="bg-transparent text-xs font-medium w-full py-1 focus:outline-none focus:ring-2 focus:ring-[#0d9e71] focus:ring-offset-2 rounded cursor-pointer"
        aria-describedby="languageInstruction"
      >
        <option value="en">{t.languages.en}</option>
        <option value="es">{t.languages.es}</option>
      </select>

      <div id="languageInstruction" className="sr-only">
        {t.languageChangeInstruction}
      </div>

      <span
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveMessage}
      </span>
    </div>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.inert = !isOpen;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
      const focusable = sidebarRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], select, input, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.[0]?.focus();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && isOpen && sidebarRef.current) {
        const focusable = sidebarRef.current.querySelectorAll<HTMLElement>(
          'button, [href], select, input, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        }
      }
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={onClose} aria-hidden="true" />}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label={t.menu}
      >
        <div className="flex justify-between items-center p-3 border-b">
          <img src={logo} alt={t.logoAlt} className="h-7 filter-none" style={{ filter: 'brightness(0) saturate(100%)' }} />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0d9e71] focus:ring-offset-2"
            aria-label={t.closeMenu}
          >
            <X />
          </button>
        </div>
        <nav className="flex flex-col p-3 space-y-2">
          <a
            href="#contact"
            onClick={onClose}
            className="mt-4 w-full bg-black text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0d9e71] focus:ring-offset-2 text-center"
          >
            {t.contact}
          </a>

          <LanguageSelector />
        </nav>
      </div>
    </>
  );
};


export const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(open => !open);
  const onMenuKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      toggleSidebar();
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Elemento div enfocable en lugar de enlace */}
          <div
            tabIndex={0}
            className="focus:outline-none focus:ring-2 focus:ring-[#0d9e71] focus:ring-offset-2 rounded"
            
          >
            <img
              src={logo}
              alt={t.logoAlt}
              className="h-7"
              style={{ filter: 'brightness(0) saturate(100%)' }}
            />
          </div>

          <div className="flex items-center space-x-3">
            {!isMobile && (
              <a
                href="#contact"
                className="bg-black text-white px-4 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-[#0d9e71] focus:ring-offset-2"
              >
                {t.contact}
              </a>
            )}
            {!isMobile && <LanguageSelector />}

            {isMobile && (
              <button
                onClick={toggleSidebar}
                onKeyDown={onMenuKey}
                className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0d9e71] focus:ring-offset-2"
                aria-label={t.menu}
                aria-expanded={isSidebarOpen}
              >
                {isSidebarOpen ? null : <Menu />}
              </button>
            )}
          </div>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen && isMobile} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};
import { Outlet } from 'react-router-dom';
import {Header} from './Header';
import Footer from './Footer';
import SkipLink from './SkipLink';
import { useLanguage } from '../Context/LanguageContext';
import { useEffect } from 'react';

const Layout = () => {

const { language } = useLanguage();

  // Actualiza el título del documento
  useEffect(() => {
    document.title = language === 'en' 
      ? 'Web Accessibility Pack – Adapt your website to the European Accessibility Act before June 2025' 
      : 'Paquete de Accesibilidad Web – Adapta tu sitio web a la Ley Europea de Accesibilidad antes de junio de 2025';
  }, [language]);


  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Esto renderizará las páginas hijas */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
import React from 'react';
import { useLanguage } from '../../Context/LanguageContext';
import applause from '../../img/3-removebg-preview.png';
import pros from '../../img/1-removebg-preview.png';
import crownpeak from '../../img/4-removebg-preview.png';
import barcelo from '../../img/2-removebg-preview.png';
import front10 from '../../img/front10.png';

const translations = {
  en: {
    header: "They Trust Us"
  },
  es: {
    header: "Confían en nosotros"
  }
};

export const TrustSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Filtro para convertir imágenes a blanco puro
  const whiteFilter = {
    filter: 'brightness(0) invert(1)'
  };

  return (
    <section className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          {t.header}
        </h1>

        <div className="flex justify-center items-center flex-wrap gap-6">
          <img
            src={applause}
            alt="Company Logo applause"
            className="h-8 w-auto"
            style={whiteFilter}
          />
          <img
            src={pros}
            alt="Company Logo pros"
            className="h-8 w-auto"
            style={whiteFilter}
          />
          <img
            src={crownpeak}
            alt="Company Logo crownpeak"
            className="h-8 w-auto"
            style={whiteFilter}
          />
          <img
            src={barcelo}
            alt="Company Logo barcelo"
            className="h-8 w-auto"
            style={whiteFilter}
          />
          <img
            src={front10}
            alt="Company Logo front10"
            className="h-8 w-auto"
            style={whiteFilter}
          />
        </div>
      </div>
    </section>
  );
};
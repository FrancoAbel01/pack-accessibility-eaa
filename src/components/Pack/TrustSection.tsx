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

  // CSS filter para tintar cada logo de verde (#0d9e71) usando drop-shadow
  const greenFilter = {
    filter: 'drop-shadow(0 0 0 #0d9e71)'
  };

  return (
    <section className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Título dinámico */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          {t.header}
        </h1>

        {/* Fila de 5 logos reducidos y con filtro verde */}
        <div className="flex justify-center items-center space-x-6">
          <img
            src={applause}
            alt="Company Logo 1"
            className="h-8 w-auto filter"
            style={greenFilter}
          />
          <img
            src={pros}
            alt="Company Logo 2"
            className="h-8 w-auto filter"
            style={greenFilter}
          />
          <img
            src={crownpeak}
            alt="Company Logo 3"
            className="h-8 w-auto filter"
            style={greenFilter}
          />
          <img
            src={barcelo}
            alt="Company Logo 4"
            className="h-8 w-auto filter"
            style={greenFilter}
          />
          <img
            src={front10}
            alt="Company Logo 5"
            className="h-8 w-auto filter"
            style={greenFilter}
          />
        </div>
      </div>
    </section>
  );
};

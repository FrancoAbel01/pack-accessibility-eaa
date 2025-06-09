import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../Context/LanguageContext';

const translations = {
  en: {
    titlePart1: "Who is ",
    titlePart2: "it for",
    subtitle: "The pack is specially designed for small, medium and large companies in various sectors:",
    sectors: [
      "Retail",
      "Banking",
      "Travel",
      "Insurance",
      "Pharmaceutical",
      "Public Contracts"
    ]
  },
  es: {
    titlePart1: "¿A quién va ",
    titlePart2: "dirigido",
    subtitle: "El pack está especialmente dirigido a empresas pequeñas, medianas y grandes de diversos sectores:",
    sectors: [
      "Retail",
      "Banca",
      "Viajes",
      "Seguros",
      "Farmacéuticas",
      "Contratos Públicos"
    ]
  }
};

const sectorIcons = [
  <svg key="retail" className="w-8 h-8 text-[#0d9e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>,
  <svg key="banking" className="w-8 h-8 text-[#0d9e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="travel" className="w-8 h-8 text-[#0d9e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="insurance" className="w-8 h-8 text-[#0d9e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="pharma" className="w-8 h-8 text-[#0d9e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>,
  <svg key="contracts" className="w-8 h-8 text-[#0d9e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
];

export const TargetAudience = () => {
  const { language } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  useEffect(() => {
    if (isFocused && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isFocused]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-16 px-4 sm:px-6 lg:px-8"
      id="audience"
      tabIndex={-1}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-labelledby="audience-title"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1
          id="audience-title"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
        >
          {t.titlePart1}
          <span className="text-[#0d9e71]">{t.titlePart2}</span>?
        </h1>
        <h2 className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          {t.subtitle}
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {t.sectors.map((sector, index) => (
            <div key={index} className="flex flex-col items-center w-28">
              <div className="bg-[#0d9e71]/10 p-3 rounded-2xl mb-2">
                {sectorIcons[index]}
              </div>
              <span className="text-sm text-white text-center">{sector}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../Context/LanguageContext';

const translations = {
  en: {
    title: "Legal Compliance and Reputation",
    cards: [
      {
        title: "Avoid penalties",
        description: "Comply with regulations and avoid costly fines for non-compliance."
      },
      {
        title: "Improve your corporate image",
        description: "Show your commitment to inclusion and digital accessibility."
      },
      {
        title: "Recognized standards",
        description: "Based on WCAG 2.1 and EN 301 549, the reference standards in accessibility."
      }
    ]
  },
  es: {
    title: "Cumplimiento legal y reputación",
    cards: [
      {
        title: "Evita sanciones",
        description: "Cumple con la normativa y evita costosas multas por incumplimiento."
      },
      {
        title: "Mejora tu imagen corporativa",
        description: "Muestra tu compromiso con la inclusión y la accesibilidad digital."
      },
      {
        title: "Estándares reconocidos",
        description: "Basado en WCAG 2.1 y EN 301 549, los estándares de referencia en accesibilidad."
      }
    ]
  }
};

// Iconos para cada tarjeta
const cardIcons = [
  <svg key="penalties" className="w-12 h-12 text-[#0d9e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>,
  <svg key="image" className="w-12 h-12 text-[#0d9e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>,
  <svg key="standards" className="w-12 h-12 text-[#0d9e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
];

export const LegalReputationSection = () => {
  const { language } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  useEffect(() => {
    if (isFocused && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isFocused]);

  // Renderiza el título con la parte "and Reputation" o "y reputación" en verde para ambos idiomas
  const renderTitle = () => {
    if (language === 'en') {
      // En inglés: "Legal Compliance" + " and Reputation"
      return (
        <>
          Legal Compliance
          <span className="text-[#0d9e71]"> and Reputation</span>
        </>
      );
    } else {
      // En español: "Cumplimiento legal" + " y reputación"
      return (
        <>
          Cumplimiento legal
          <span className="text-[#0d9e71]"> y reputación</span>
        </>
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 px-4 sm:px-6 lg:px-8 transition-all duration-300 outline-none"
      id="legal-reputation"
      tabIndex={-1}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-labelledby="legal-title"
    >
      <div className="max-w-6xl mx-auto">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h1
            id="legal-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-8"
          >
            {renderTitle()}
          </h1>
          <div className="w-32 h-1 bg-[#0d9e71] mx-auto"></div>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {t.cards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 transition-all duration-300 hover:border-green-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  {cardIcons[index]}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-black transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-900">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

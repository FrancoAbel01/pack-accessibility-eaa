import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../Context/LanguageContext';

const translations = {
  en: {
    title: "Is your website ready for June 28?",
    subtitle: "Comply with the European digital accessibility regulation in just 4 weeks",
    cardTitle: "European Directive 2019/882 comes into force on June 28, 2025",
    cardPoints: [
      "Avoid penalties",
      "Improve your image",
      "Improve SEO",
      "Demonstrate commitment"
    ],
    offer: 'Include "for only 3000 E"',
    button: "I want more information"
  },
  es: {
    title: "¿Tu web está preparada para el 28 de junio?",
    subtitle: "Cumple con la normativa europea de accesibilidad digital en solo 4 semanas",
    cardTitle: "La Directiva Europea 2019/882 entra en vigor el 28 de junio de 2025",
    cardPoints: [
      "Evita sanciones",
      "Mejora tu imagen",
      "Mejora el SEO",
      "Demuestra compromiso"
    ],
    offer: 'Incluir "por solo 3000 E"',
    button: "Quiero mas informacion"
  }
};

export const Hero = () => {
  const { language } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isFocused && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isFocused]);

  return (
    <section
      ref={sectionRef}
       className={`relative bg-gradient-to-br from-[#0d9e71] to-black py-12 px-4 sm:px-6 lg:px-8 mt-4 transition-all duration-300 outline-none ${
        isFocused ? 'ring-4 ring-white ring-offset-4 ring-offset-[#0d9e71]' : ''
      }`}
      id="home"
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-labelledby="hero-title"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-12 flex flex-col items-center">
          {/* Títulos principales */}
          <div className="space-y-6">
            <h1 
              id="hero-title"
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight"
            >
              {t.title}
            </h1>
            <h5 className="text-xl text-gray-100 max-w-2xl mx-auto">
              {t.subtitle}
            </h5>
          </div>

          {/* Card con puntos destacados - sin animación ni hover */}
          <div className=" rounded-xl p-6 w-full max-w-2xl border border-white/20">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
              {t.cardTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.cardPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="bg-[#0d9e71]/30 p-4 rounded-lg flex items-center justify-center gap-3"
                >
                  <svg 
                    className="w-5 h-5 text-white flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg font-medium text-white">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Oferta y botón */}
          <div className="space-y-8">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {t.offer}
            </h3>
            <button
              onClick={scrollToContact}
              className="bg-white text-black hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 focus:ring-4 focus:ring-white focus:ring-opacity-50"
              aria-label={t.button}
            >
              {t.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
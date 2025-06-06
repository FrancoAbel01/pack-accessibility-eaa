import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../Context/LanguageContext';

const translations = {
  en: {
    title: "Why hire the ",
    packText: "Web Accessibility Pack",
    benefits: [
      "Comply with the European Accessibility Directive (EU) 2019/882 and RD 1112/2018.",
      "Avoid fines and protect your company.",
      "Improve the user experience for all people.",
      "Strengthen your image as a responsible and inclusive company.",
      "Access specialized technical support.",
      "Publish an official declaration of commitment to accessibility."
    ]
  },
  es: {
    title: "¿Por qué contratar el ",
    packText: "Pack Accesibilidad Web",
    benefits: [
      "Cumple con la Directiva Europea de Accesibilidad (UE) 2019/882 y el RD 1112/2018.",
      "Evita multas y protege a tu empresa.",
      "Mejora la experiencia de usuario para todas las personas.",
      "Refuerza tu imagen como empresa responsable e inclusiva.",
      "Accede a soporte técnico especializado.",
      "Publica una declaración oficial de compromiso con la accesibilidad."
    ]
  }
};

export const BenefitsSection = () => {
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
      className="relative bg-black py-16 px-4 sm:px-6 lg:px-8 transition-all duration-300 outline-none"
      id="benefits"
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-labelledby="benefits-title"
    >
      <div className="max-w-5xl mx-auto">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h1 
            id="benefits-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {t.title}
            <span className="text-[#0d9e71]">{t.packText}</span>?
          </h1>
          <div className="w-24 h-1 bg-[#0d9e71] mx-auto mt-6"></div>
        </div>

        {/* Grid de beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.benefits.map((benefit, index) => (
            <div 
              key={index} 
              className=" rounded-xl p-6 border border-[#0d9e71] transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#0d9e71]/10 p-3 rounded-lg">
                  <svg 
                    className="w-6 h-6 text-[#0d9e71]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-4 text-gray-200">{benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

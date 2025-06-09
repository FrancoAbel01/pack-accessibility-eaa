import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../Context/LanguageContext';

const translations = {
  en: {
    title: "What does the ",
    packText: "Web Accessibility Pack",
    include: " include?",
    intro: "The accessibility pack is a quick solution to show that digital inclusion matters to you and that you are driving the accessibility of your website step by step.",
    cards: [
      {
        title: "Essential Audit",
        items: [
          "Evaluation of 4 or 5 critical modules of the website.",
          "Manual and automatic review according to WCAG 2.2 level AA and EN 301 549.",
          "Report with risks, priorities, and recommendations.",
          "Deliverable suitable for technical teams, management committees, and compliance teams."
        ]
      },
      {
        title: "Widget",
        items: [
          "Tool that improves the browsing experience for people with different needs (dyslexia, low vision, ADHD, color blindness, etc.) without interfering with the site's design.",
          "The widget includes features such as:",
          "• Contrast adjustments, font size, and spacing",
          "• Easy reading and reading focus",
          "• Quick keyboard shortcuts",
          "• Compatible with screen readers"
        ]
      },
      {
        title: "Accessibility Statement",
        items: [
          "This declaration certifies compliance with the legal requirements for digital accessibility that will be mandatory from 28 June 2025, and reflects your organisation's commitment to inclusion, equal opportunities and universal access to your digital products and services."
        ]
      }
    ],
    banner: "3 or 4 weeks of work and 3,000€ cost (VAT not included)"
  },
  es: {
    title: "¿Qué incluye el ",
    packText: "Pack Accesibilidad Web",
    include: "?",
    intro: "El pack de accesibilidad es una solución rápida para demostrar que la inclusividad digital te importa y que estás impulsando la accesibilidad de tu web paso a paso.",
    cards: [
      {
        title: "Auditoría esencial",
        items: [
          "Evaluación sobre 4 o 5 módulos críticos del sitio web.",
          "Revisión manual y automática según WCAG 2.2 nivel AA y EN 301 549.",
          "Informe con riesgos, prioridades y recomendaciones.",
          "Entregable apto para equipos técnicos, comités de dirección y equipos de compliance."
        ]
      },
      {
        title: "Widget",
        items: [
          "Herramienta que mejora la experiencia de navegación de personas con distintas necesidades (dislexia, baja visión, TDAH, daltonismo, etc.) sin interferir con el diseño del sitio.",
          "El widget incluye funcionalidades como:",
          "• Ajustes de contraste, tamaño de letra y espaciado",
          "• Lectura fácil y foco de lectura",
          "• Accesos rápidos por teclado",
          "• Compatible con lectores de pantalla"
        ]
      },
      {
        title: "Declaración de Accesibilidad",
        items: [
          "Esta declaración acredita el cumplimiento de los requisitos legales en materia de accesibilidad digital que serán obligatorios a partir del 28 de junio de 2025, y refleja el compromiso de su organización con la inclusión, la igualdad de oportunidades y el acceso universal a sus productos y servicios digitales."
        ]
      }
    ],
    banner: "3 o 4 semanas de trabajo y 3.000€ de coste (IVA no incluido)"
  }
};

export const PackageInclusions = () => {
  const { language } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const t = translations[language] || translations.en;

  useEffect(() => {
    if (isFocused && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isFocused]);

  const icons = [
    <svg key="audit" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>,
    <svg key="widget" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>,
    <svg key="declaration" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ];

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-labelledby="inclusions-title"
      className="relative bg-white py-16 px-4 sm:px-6 lg:px-8 transition-all duration-300 outline-none"
      id="inclusions"
      tabIndex={-1}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1
            id="inclusions-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4"
          >
            {t.title}
            <span className="text-[#0d9e71]">{t.packText}</span>
            {t.include}
          </h1>
          <div className="w-24 h-1 bg-[#0d9e71] mx-auto mt-6 mb-8"></div>
          <p className="text-lg text-gray-900 max-w-3xl mx-auto mt-6">
            {t.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {t.cards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 border border-[#0d9e71] transition-all duration-300 hover:border-green-300 flex flex-col"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="bg-[#0d9e71]/10 text-[#0d9e71] p-4 rounded-full mb-6">
                  {icons[index]}
                </div>
                <h2 className="text-xl font-bold text-black mb-4">{card.title}</h2>
              </div>
              <div className="text-left flex-grow">
                {card.items.map((item, i) => (
                  <p key={i} className={`text-black mb-3 ${item.startsWith('•') ? 'pl-4' : ''}`}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-black bg-[#0d9e71]/10 border border-[#0d9e71] inline-block px-6 py-3 rounded-lg">
            {t.banner}
          </p>
        </div>
      </div>
    </section>
  );
};

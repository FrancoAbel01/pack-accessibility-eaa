import React from 'react';
import { useLanguage } from '../../Context/LanguageContext';

// SVG icon for duration (clock)
const ClockIcon = () => (
  <svg
    className="w-8 h-8 text-[#0d9e71] mb-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l2 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// SVG icon for checkmark (accepted)
const CheckIcon = () => (
  <svg
    className="w-6 h-6 text-[#0d9e71] flex-shrink-0 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const translations = {
  en: {
    columns: {
      priceTitle: "Price",
      priceAmount: "€3,000",
      priceNote: "(VAT not included)",
      durationText: "Project duration: 3-4 weeks",
      supportIncluded: "Support included"
    },
    services: [
      "Technical audit of 5 key elements",
      "Custom accessibility widget",
      "Regulatory accessibility declaration",
      "Technical support for 4 weeks"
    ],
    extraText: "Possibility of additional technical remediation under budget."
  },
  es: {
    columns: {
      priceTitle: "Precio",
      priceAmount: "3.000 €",
      priceNote: "(IVA no incluido)",
      durationText: "Duración del proyecto: 3-4 semanas",
      supportIncluded: "Soporte incluido"
    },
    services: [
      "Auditoría técnica de 5 elementos clave",
      "Widget de accesibilidad personalizado",
      "Declaración de accesibilidad normativa",
      "Soporte técnico durante 4 semanas"
    ],
    extraText: "Posibilidad de remediación técnica adicional bajo presupuesto."
  }
};

export const PriceTermsSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Renderiza el encabezado con la palabra "Terms"/"condiciones" en verde
  const renderHeader = () => {
    if (language === "en") {
      return (
        <>
          Price and <span className="text-[#0d9e71]">Terms</span>
        </>
      );
    } else {
      return (
        <>
          Precio y <span className="text-[#0d9e71]">condiciones</span>
        </>
      );
    }
  };

  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Encabezado */}
          <h1 className="text-3xl sm:text-4xl font-bold text-black text-center mb-8">
            {renderHeader()}
          <div className="w-24 h-1 bg-[#0d9e71] mx-auto mt-6"></div>
          </h1>
          {/* Tres columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
            {/* Columna 1: Precio */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-black">
                {t.columns.priceTitle}
              </h2>
              <p className="text-2xl font-bold text-black">
                {t.columns.priceAmount}
              </p>
              <p className="text-sm text-black">{t.columns.priceNote}</p>
            </div>

            {/* Columna 2: Duración con icono */}
            <div className="flex flex-col items-center">
              <ClockIcon />
              <p className="text-black">{t.columns.durationText}</p>
            </div>

            {/* Columna 3: Soporte incluido */}
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold text-black">
                {t.columns.supportIncluded}
              </h2>
            </div>
          </div>

          {/* Cuatro servicios con icono de aceptado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {t.services.map((service, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center"
              >
                <CheckIcon />
                <p className="text-black">{service}</p>
              </div>
            ))}
          </div>

          {/* Mini-sección con fondo verde claro y texto centrado */}
          <div className="bg-green-100 rounded-lg p-4 text-center">
            <p className="text-black">{t.extraText}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

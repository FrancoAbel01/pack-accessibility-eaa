import { useLanguage } from '../../Context/LanguageContext';

const translations = {
  en: {
    title: "Is your website ready to comply with the European Accessibility Act (EAA)?",
    subtitle: "Kick-start your adaptation to WCAG 2.2 AA",
    description: "We audit your critical modules and write the Accessibility Statement in a maximum of 4 weeks., for just 3000 €, so you can meet the 28 June 2025 deadline with zero risk.",
    cardTitle: "Our compliance package includes:",
    cardPoints: [
      "Comprehensive audit of critical modules",
      "Accessibility Statement drafting",
      "WCAG 2.2 AA compliance roadmap",
      "Priority support to meet the deadline"
    ],
   
    button: "I want more information"
  },
  es: {
    title: "¿Está tu web preparada para cumplir la Ley de Accesibilidad Europea (EAA)?",
    subtitle: "Arranca tu adaptación a las WCAG 2.2 (nivel AA)",
    description: "Auditamos tus módulos críticos y redactamos la Declaración de Accesibilidad en un maximo de 4 semanas, por solo 3000 €, para que llegues a la fecha límite del 28 de junio de 2025 sin riesgos.",
    cardTitle: "Nuestro paquete de cumplimiento incluye:",
    cardPoints: [
      "Auditoría completa de módulos críticos",
      "Redacción de la Declaración de Accesibilidad",
      "Hoja de ruta para cumplimiento WCAG 2.2 AA",
      "Soporte prioritario para cumplir el plazo"
    ],
    
    button: "Quiero más información"
  }
};

export const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative bg-gradient-to-br from-[#0d9e71] to-black py-12 px-4 sm:px-6 lg:px-8 mt-4"
      id="home"
      aria-labelledby="hero-title"
      tabIndex={-1}
    >
      <div
        className="max-w-4xl mx-auto text-center"
        tabIndex={-1}
      >
        <div className="space-y-12 flex flex-col items-center">
          
          <div
            className="space-y-6"
            tabIndex={-1}
          >
            <h1
              id="hero-title"
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight"
              tabIndex={-1}
            >
              {t.title}
            </h1>
            <h2
              className="text-2xl md:text-3xl text-gray-100 max-w-2xl mx-auto"
              tabIndex={-1}
            >
              <span id="accesibilidad-web-wcag-22">
                {t.subtitle.includes('WCAG') ? (
                  <>
                    {t.subtitle.split('WCAG')[0]}
                    <abbr 
                      lang="en" 
                      title="Web Content Accessibility Guidelines"
                      style={{ textDecoration: "none" }}  
                    >
                      WCAG
                    </abbr>
                    {t.subtitle.split('WCAG')[1]}
                  </>
                ) : t.subtitle}
              </span>
            </h2>
            <p
              className="text-xl text-white max-w-3xl mx-auto"
              tabIndex={-1}
            >
              <strong>{t.description}</strong>
            </p>
          </div>

          {/* Card con puntos destacados */}
          <div
            className="rounded-xl p-6 w-full max-w-2xl border border-white/20"
            tabIndex={-1}
          >
            <p
              className="text-xl md:text-2xl font-semibold text-white mb-6"
              tabIndex={-1}
            >
              {t.cardTitle}
            </p>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              tabIndex={-1}
            >
              {t.cardPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-[#0d9e71]/30 p-4 rounded-lg flex items-center justify-center gap-3"
                  tabIndex={-1}
                >
                  <svg
                    className="w-5 h-5 text-white flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span
                    className="text-lg font-medium text-white"
                    tabIndex={-1}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Oferta y botón */}
          <div
            className="space-y-8"
            tabIndex={-1}
          >
            <button
              onClick={scrollToContact}
              className="bg-white text-black hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 focus:ring-4 focus:ring-white focus:ring-opacity-50 focus:outline-none"
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
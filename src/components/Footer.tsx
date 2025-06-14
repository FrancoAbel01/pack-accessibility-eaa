import React, { useState, useRef } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../Context/LanguageContext';
import IAAPLogo from '../img/iaap.png';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const translations = {
    en: {
      newsletter: {
        title: "Want to subscribe to stay ahead with the latest in accessibility?",
        description: "Join our newsletter for exclusive updates, industry insights, and accessibility best practices.",
        formLabels: { name: "Name (required)", email: "Email address (required)" },
        namePlaceholder: "Your name",
        emailPlaceholder: "Email address",
        button: "Subscribe Now",
        success: "Thank you for subscribing! We've opened your email client to confirm.",
        error: "Error submitting form. Please try again."
      },
      about: "Making digital accessibility simple and achievable for all organizations.",
      contact: "Contact",
      copyright: `© ${new Date().getFullYear()} a11ySolutions. All Rights Reserved`,
      validation: {
        nameRequired: "Please enter a name",
        emailRequired: "Please enter an email address",
        emailInvalid: "Please enter a valid email address"
      }
    },
    es: {
      newsletter: {
        title: "¿Quieres suscribirte para estar al día con lo último en accesibilidad?",
        description: "Únete a nuestro boletín para recibir actualizaciones exclusivas, información de la industria y mejores prácticas de accesibilidad.",
        formLabels: { name: "Nombre (requerido)", email: "Correo electrónico (requerido)" },
        namePlaceholder: "Tu nombre",
        emailPlaceholder: "Correo electrónico",
        button: "Suscríbete",
        success: "¡Gracias por suscribirte! Hemos abierto tu cliente de correo para confirmar.",
        error: "Error al enviar el formulario. Por favor intenta nuevamente."
      },
      about: "Haciendo la accesibilidad digital simple y alcanzable para todas las organizaciones.",
      contact: "Contacto",
      copyright: `© ${new Date().getFullYear()} a11ySolutions. Todos los derechos reservados`,
      validation: {
        nameRequired: "Por favor, ingrese un nombre",
        emailRequired: "Por favor, ingrese una dirección de correo electrónico",
        emailInvalid: "Por favor ingresa un correo electrónico válido"
      }
    }
  };

  const validateField = (field: 'name' | 'email', value: string) => {
    const v = translations[language].validation;
    if (field === 'name' && !value.trim()) return v.nameRequired;
    if (field === 'email') {
      if (!value.trim()) return v.emailRequired;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return v.emailInvalid;
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as 'name' | 'email']) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasTriedSubmit(true);

    // Validamos campos y capturamos errores
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    setErrors({ name: nameError, email: emailError });

    // Si hay errores, enfocamos primero el que exista y salimos
    if (nameError) {
      nameInputRef.current?.focus();
      return;
    }
    if (emailError) {
      emailInputRef.current?.focus();
      return;
    }

    // Si todo OK, procedemos con el envío
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const { name, email } = formData;
      const subject = language === 'en'
        ? 'New Newsletter Subscription Request'
        : 'Solicitud de Suscripción al Boletín';
      const bodyLines = [
        language === 'en'
          ? 'Newsletter Subscription Form Submission'
          : 'Envío de Formulario de Suscripción',
        '',
        language === 'en'
          ? 'Form Purpose: Subscribe user to accessibility newsletter'
          : 'Objetivo del Formulario: Suscribir usuario al boletín de accesibilidad',
        '',
        `${language === 'en' ? 'Name' : 'Nombre'}: ${name}`,
        `Email: ${email}`,
        '',
        language === 'en'
          ? 'Action Required: Please add this email to your newsletter distribution list.'
          : 'Acción Requerida: Por favor añade este correo a tu lista de distribución.',
        '',
        language === 'en'
          ? 'This submission was sent from the website footer newsletter form.'
          : 'Este envío fue realizado desde el formulario del footer del sitio web.'
      ];
      const formattedBody = bodyLines.join('%0D%0A');
      window.location.href = `mailto:a11ycontact@a11ysolutions.com?subject=${encodeURIComponent(subject)}&body=${formattedBody}`;
      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({ name: '', email: '' });
        setIsSubmitting(false);
        setHasTriedSubmit(false);
      }, 2000);
    } catch {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="footer" className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="border border-[#0d9e71] rounded-xl p-8 mb-16 relative">
          {submitStatus === 'success' && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-md text-sm animate-fade-in">
              {translations[language].newsletter.success}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-md text-sm animate-fade-in">
              {translations[language].newsletter.error}
            </div>
          )}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left lg:w-2/5">
              <h3 className="text-2xl font-bold mb-4 text-white">
                {translations[language].newsletter.title}
              </h3>
              <p className="text-white/80 text-lg">
                {translations[language].newsletter.description}
              </p>
            </div>

            <form noValidate onSubmit={handleSubmit} className="w-full lg:w-3/5 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {/* Name */}
                <div className="flex-1">
                  <label htmlFor="footer-name" className="block text-sm font-medium text-white mb-2">
                    {translations[language].newsletter.formLabels.name}
                  </label>
                  <input
                    ref={nameInputRef}
                    id="footer-name"
                    name="name"
                    type="text"
                    placeholder={translations[language].newsletter.namePlaceholder}
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg placeholder-white text-white
                      focus:outline focus:outline-2 focus:outline-[#0CB07C] focus:outline-offset-2
                      ${hasTriedSubmit && errors.name ? 'border-red-500' : 'border-gray-700'}`}
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={hasTriedSubmit && !!errors.name}
                    aria-describedby={hasTriedSubmit && errors.name ? "name-error" : undefined}
                  />
                  {hasTriedSubmit && errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="flex-1">
                  <label htmlFor="footer-email" className="block text-sm font-medium text-white mb-2">
                    {translations[language].newsletter.formLabels.email}
                  </label>
                  <input
                    ref={emailInputRef}
                    id="footer-email"
                    name="email"
                    type="email"
                    placeholder={translations[language].newsletter.emailPlaceholder}
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg placeholder-white text-white
                      focus:outline focus:outline-2 focus:outline-[#0CB07C] focus:outline-offset-2
                      ${hasTriedSubmit && errors.email ? 'border-red-500' : 'border-gray-700'}`}
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={hasTriedSubmit && !!errors.email}
                    aria-describedby={hasTriedSubmit && errors.email ? "email-error" : undefined}
                  />
                  {hasTriedSubmit && errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#036445] hover:bg-[#023827] px-8 py-4 rounded-lg font-medium transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-white w-full sm:w-auto
                  focus:outline focus:outline-2 focus:outline-[#0d9e71] focus:outline-offset-2"
                >
                  {isSubmitting
                    ? (language === 'en' ? 'Sending...' : 'Enviando...')
                    : translations[language].newsletter.button}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sección About / Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <img src={IAAPLogo} alt="IAAP Logo" className="w-40 h-40 mr-4 object-contain" />
              <p className="text-gray-300">{translations[language].about}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">{translations[language].contact}</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-300">
                <Mail className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>a11ycontact@a11ysolutions.com</span>
              </li>
              <li className="flex items-start text-gray-300">
                <Linkedin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.linkedin.com/company/a11ysolutions/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0d9e71] transition-colors focus:outline focus:outline-2 focus:outline-[#0d9e71] focus:outline-offset-2 rounded"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer final */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center text-gray-300">
            {translations[language].copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

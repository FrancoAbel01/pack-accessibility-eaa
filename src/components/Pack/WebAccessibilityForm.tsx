import React, { useState, useRef } from 'react';
import { useLanguage } from '../../Context/LanguageContext';

const translations = {
  en: {
    title: (
      <>Ready to Comply with <span className="text-white">Accessibility Standards</span>?</>
    ),
    description:
      "Complete the form and we’ll contact you with all the information about our Web Accessibility Pack.",
    labels: {
      name: "Name (required)",
      email: "Email (required)",
      company: "Company (optional)",
      phone: "Phone (optional)",
      submit: "Request Information",
      robot: "I'm not a robot (required)"
    },
    placeholders: {
      name: "Enter your name",
      email: "Enter your company email",
      company: "Company name",
      phone: "+01 XXX XXX XXX",
    },
    errors: {
      name: "Please enter a name",
      email: "Please enter an email address",
      phone: "Please enter a valid phone number.",
      robot: "Please confirm you're not a robot."
    },
    success:
      "Thank you! Your email client will open with the information pre-filled.",
  },
  es: {
    title: (
      <>¿Listo para cumplir con la <span className="text-white">normativa</span>?</>
    ),
    description:
      "Completa el formulario y nos pondremos en contacto contigo para ofrecerte toda la información sobre nuestro Pack Accesibilidad Web.",
    labels: {
      name: "Nombre (requerido)",
      email: "Correo electrónico (requerido)",
      company: "Empresa (opcional)",
      phone: "Teléfono (opcional)",
      submit: "Solicitar información",
      robot: "No soy un robot (requerido)"
    },
    placeholders: {
      name: "Ingresa tu nombre",
      email: "Ingresa tu correo de empresa",
      company: "Nombre de tu empresa",
      phone: "+01 XXX XXX XXX",
    },
    errors: {
      name: "Por favor, ingrese un nombre",
      email: "Por favor, ingrese una dirección de correo electrónico",
      phone: "Por favor, introduce un número de teléfono válido.",
      robot: "Por favor, confirma que no eres un robot."
    },
    success:
      "¡Gracias! Tu cliente de correo se abrirá con la información prellenada.",
  },
};

type LangKeys = keyof typeof translations;
type ErrorKeys = keyof typeof translations[LangKeys]['errors'];

const WebAccessibilityForm: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language as LangKeys];

  // Refs para inputs
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const robotRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<Record<ErrorKeys | 'robot', string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHuman, setIsHuman] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name as keyof typeof copy];
        return copy;
      });
    }
  };

  const validate = () => {
    const errs: Partial<Record<ErrorKeys | 'robot', string>> = {};

    if (!formData.name.trim()) {
      errs.name = t.errors.name;
    }

    const emailVal = formData.email.trim();
    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      errs.email = t.errors.email;
    }

    if (formData.phone && !/^[\d\s()+-]+$/.test(formData.phone)) {
      errs.phone = t.errors.phone;
    }

    if (!isHuman) {
      errs.robot = t.errors.robot;
    }

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    // Enfocar el primer campo con error y salir
    if (newErrors.name) {
      nameRef.current?.focus();
      return;
    }
    if (newErrors.email) {
      emailRef.current?.focus();
      return;
    }
    if (newErrors.phone) {
      phoneRef.current?.focus();
      return;
    }
    if (newErrors.robot) {
      robotRef.current?.focus();
      return;
    }

    // Si no hay errores, enviar formulario
    const subject =
      language === "en"
        ? "Web Accessibility Pack Request"
        : "Solicitud Pack Accesibilidad Web";
    const bodyLines = [
      `${t.labels.name} ${formData.name}`,
      `${t.labels.email} ${formData.email}`,
      `${t.labels.company} ${formData.company}`,
      `${t.labels.phone} ${formData.phone}`,
    ];
    const body = encodeURIComponent(bodyLines.join("%0D%0A"));

    window.location.href = `mailto:a11ycontact@a11ysolutions.com?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    setIsSubmitted(true);
    setFormData({ name: "", email: "", company: "", phone: "" });
    setIsHuman(false);
    setTimeout(() => setIsSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="bg-gradient-to-br from-[#0d9e71] to-black py-16 px-4 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-6">{t.title}</h2>
          <p className="text-xl opacity-90 max-w-lg mx-auto lg:mx-0">
            {t.description}
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-black/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
          {isSubmitted && (
            <div
              className="p-4 mb-6 bg-green-900/30 text-green-200 rounded-lg border border-green-400/50"
              role="alert"
              aria-live="assertive"
            >
              {t.success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="name" className="font-semibold mb-1 block">
                {t.labels.name}
              </label>
              <input
                ref={nameRef}
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-black/30 text-white border ${
                  errors.name ? "border-2 border-red-600" : "border-gray-600"
                } focus:outline focus:outline-4 focus:outline-[#ffffff] focus:outline-offset-2 placeholder-gray-400`}
                placeholder={t.placeholders.name}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                required
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-red-500 mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="font-semibold mb-1 block">
                {t.labels.email}
              </label>
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-black/30 text-white border ${
                  errors.email ? "border-2 border-red-600" : "border-gray-600"
                } focus:outline focus:outline-4 focus:outline-[#ffffff] focus:outline-offset-2 placeholder-gray-400`}
                placeholder={t.placeholders.email}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                required
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-500 mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Company (opcional) */}
            <div>
              <label htmlFor="company" className="font-semibold mb-1 block">
                {t.labels.company}
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                className="p-3 rounded-md bg-black/30 text-white border border-gray-600 focus:outline focus:outline-4 focus:outline-[#ffffff] focus:outline-offset-2 placeholder-gray-400"
                placeholder={t.placeholders.company}
              />
            </div>

            {/* Phone (opcional) */}
            <div>
              <label htmlFor="phone" className="font-semibold mb-1 block">
                {t.labels.phone}
              </label>
              <input
                ref={phoneRef}
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`p-3 rounded-md bg-black/30 text-white border ${
                  errors.phone ? "border-2 border-red-600" : "border-gray-600"
                } focus:outline focus:outline-4 focus:outline-[#ffffff] focus:outline-offset-2 placeholder-gray-400`}
                placeholder={t.placeholders.phone}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-red-500 mt-1" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Robot checkbox */}
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                ref={robotRef}
                id="robot-check"
                type="checkbox"
                checked={isHuman}
                onChange={e => {
                  setIsHuman(e.target.checked);
                  if (errors.robot) {
                    setErrors(prev => {
                      const copy = { ...prev };
                      delete copy.robot;
                      return copy;
                    });
                  }
                }}
                className="w-5 h-5 accent-[#0d9e71] bg-black/30 border border-gray-600 rounded focus:outline focus:outline-4 focus:outline-[#ffffff] focus:outline-offset-2"
                aria-invalid={errors.robot ? "true" : "false"}
                aria-describedby={errors.robot ? "robot-error" : undefined}
              />
              <label htmlFor="robot-check" className="font-medium">
                {t.labels.robot}
              </label>
            </div>
            {errors.robot && (
              <p id="robot-error" className="text-sm text-red-500 mt-1 md:col-span-2" role="alert">
                {errors.robot}
              </p>
            )}

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-br from-[#0d9e71] to-black text-white font-bold py-3 px-6 rounded-md transition duration-300 transform hover:scale-[1.02] focus:outline focus:outline-4 focus:outline-[#ffffff] focus:outline-offset-2"
              >
                {t.labels.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WebAccessibilityForm;

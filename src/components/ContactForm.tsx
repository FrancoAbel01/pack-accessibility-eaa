import React, { useState } from 'react';
import { useLanguage } from '../Context/LanguageContext';

const translations = {
  en: {
    title: "Let's Make Your Products Accessible to Everyone",
    description: "Interested in making your digital products truly inclusive? Book a quick demo or meeting with our accessibility experts to explore how we can help you meet compliance, improve usability, and support every user. Learn how we partner with companies like yours to create accessible, high-impact experiences.",
    formLabels: {
      name: "Name (required)",
      phone: "Phone number (required)",
      company: "Company name (required)",
      email: "Email (required)",
      message: "Message"
    },
    placeholders: {
      name: "Enter your name",
      phone: "Enter your phone number",
      company: "Enter your company name",
      email: "Enter your email",
      message: "Enter your message"
    },
    formErrors: {
      nameRequired: "Please enter a name",
      phoneRequired: "Please enter your phone number",
      phoneInvalid: "Please enter a valid phone number.",
      companyRequired: "Please enter the name of your company",
      emailRequired: "Please enter an email address",
      emailInvalid: "Please enter a valid email address."
    },
    submitButton: "Submit now",
    successMessage: "Thank you for your message! Your email client has opened with the prefilled information."
  },
  es: {
    title: "Hagamos que tus productos sean accesibles para todos",
    description: "¿Interesado en hacer que tus productos digitales sean verdaderamente inclusivos? Agenda una demostración rápida o reunión con nuestros expertos en accesibilidad para explorar cómo podemos ayudarte a cumplir con los requisitos, mejorar la usabilidad y apoyar a cada usuario. Descubre cómo colaboramos con empresas como la tuya para crear experiencias accesibles y de alto impacto.",
    formLabels: {
      name: "Nombre (requerido)",
      phone: "Teléfono (requerido)",
      company: "Empresa (requerido)",
      email: "Correo electrónico (requerido)",
      message: "Mensaje"
    },
    placeholders: {
      name: "Ingresa tu nombre",
      phone: "Ingresa tu número de teléfono",
      company: "Ingresa el nombre de tu empresa",
      email: "Ingresa tu correo electrónico",
      message: "Ingresa tu mensaje"
    },
    formErrors: {
      nameRequired: "Por favor, ingrese un nombre",
      phoneRequired: "Por favor, ingrese su número de teléfono",
      phoneInvalid: "Por favor ingresa un teléfono válido.",
      companyRequired: "Por favor, ingrese el nombre de su empresa",
      emailRequired: "Por favor, ingrese una dirección de correo electrónico",
      emailInvalid: "Por favor ingresa un correo válido."
    },
    submitButton: "Enviar ahora",
    successMessage: "¡Gracias por tu mensaje! Se ha abierto tu cliente de correo con los datos prellenados."
  }
};

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const current = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const { name, phone, company, email } = formData;
    const { formErrors } = current;

    if (!name.trim()) errs.name = formErrors.nameRequired;
    if (!phone.trim()) {
      errs.phone = formErrors.phoneRequired;
    } else if (!/^\+?[0-9]{7,}$/.test(phone.trim())) {
      errs.phone = formErrors.phoneInvalid;
    }
    if (!company.trim()) errs.company = formErrors.companyRequired;
    if (!email.trim()) {
      errs.email = formErrors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = formErrors.emailInvalid;
    }

    return errs;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { name, phone, company, email, message } = formData;
    const subject = language === 'en'
      ? `New contact: ${name} from ${company}`
      : `Nuevo contacto: ${name} de ${company}`;
    const bodyLines = language === 'en'
      ? [
          'Contact information:', '', `Full name: ${name}`, `Phone: ${phone}`,
          `Company: ${company}`, `Email: ${email}`, '', 'Message:', message,
          '', 'This message was sent from your website contact form.'
        ]
      : [
          'Información del contacto:', '', `Nombre completo: ${name}`, `Teléfono: ${phone}`,
          `Empresa: ${company}`, `Correo electrónico: ${email}`, '',
          'Mensaje:', message, '',
          'Este mensaje fue enviado desde el formulario de contacto de tu sitio web.'
        ];
    const formattedBody = bodyLines.join('%0D%0A');
    window.location.href = `mailto:a11ycontact@a11ysolutions.com?subject=${encodeURIComponent(subject)}&body=${formattedBody}`;

    setIsSubmitted(true);
    setFormData({ name: '', phone: '', company: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const inputBaseClasses = "w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-white";

  return (
    <section className="py-16 relative bg-gradient-to-br from-[#0d9e71] to-black text-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6 text-white">{current.title}</h2>
            <p className="text-white text-lg mb-8 leading-relaxed">{current.description}</p>
          </div>
          <div className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-100">
                {current.successMessage}
              </div>
            )}
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {["name","phone"].map(field => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-white mb-2">
                      {current.formLabels[field as keyof typeof current.formLabels]}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      required
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      className={`${inputBaseClasses} border ${errors[field] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-white/20 focus:ring-[#0d9e71] focus:border-transparent'}`}
                      placeholder={current.placeholders[field as keyof typeof current.placeholders]}
                    />
                    {errors[field] && (
                      <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>
                    )}
                  </div>
                ))}
              </div>
              {["company","email","message"].map(field => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-white mb-2">
                    {current.formLabels[field as keyof typeof current.formLabels]}
                  </label>
                  {field !== "message" ? (
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      required={field !== "message"}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      className={`${inputBaseClasses} border ${errors[field] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-white/20 focus:ring-[#0d9e71] focus:border-transparent'}`}
                      placeholder={current.placeholders[field as keyof typeof current.placeholders]}
                    />
                  ) : (
                    <textarea
                      id={field}
                      name={field}
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputBaseClasses} border ${errors[field] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-white/20 focus:ring-[#0d9e71] focus:border-transparent'}`}
                      placeholder={current.placeholders.message}
                    />
                  )}
                  {errors[field] && (
                    <p className="mt-1 text-red-500 text-sm">{errors[field]}</p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-gradient-to-br from-[#0d9e71] to-black text-white font-medium py-4 rounded-lg hover:opacity-90 transition-opacity"
              >
                {current.submitButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

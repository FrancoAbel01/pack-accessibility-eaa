// import React, { useState, useRef, useEffect } from 'react';
// import { useLanguage } from '../../Context/LanguageContext';

// const translations = {
//   en: {
//     title: (
//       <>
//         Ready to Comply with <span className="text-white">Accessibility Standards</span>?
//       </>
//     ),
//     description:
//       "Complete the form and we’ll contact you with all the information about our Web Accessibility Pack.",
//     labels: {
//       name: "Name *",
//       email: "Email *",
//       website: "Website URL *",
//       phone: "Phone (optional)",
//       submit: "Request Information",
//     },
//     placeholders: {
//       name: "Enter your name",
//       email: "Enter your email",
//       website: "e.g., https://www.example.com",
//       phone: "+01 XXX XXX XXX",
//     },
//     errors: {
//       name: "Name is required.",
//       email: "Valid email is required.",
//       website: "Valid website URL is required (e.g., https://example.com)",
//     },
//     success:
//       "Thank you! Your email client will open with the information pre-filled.",
//   },
//   es: {
//     title: (
//       <>
//         ¿Listo para cumplir con la <span className="text-white">normativa</span>?
//       </>
//     ),
//     description:
//       "Completa el formulario y nos pondremos en contacto contigo para ofrecerte toda la información sobre nuestro Pack Accesibilidad Web.",
//     labels: {
//       name: "Nombre *",
//       email: "Correo electrónico *",
//       website: "URL Web *",
//       phone: "Teléfono (opcional)",
//       submit: "Solicitar información",
//     },
//     placeholders: {
//       name: "Ingresa tu nombre",
//       email: "Ingresa tu correo electrónico",
//       website: "ej., https://www.ejemplo.com",
//       phone: "+01 XXX XXX XXX",
//     },
//     errors: {
//       name: "El nombre es obligatorio.",
//       email: "Se requiere un correo válido.",
//       website: "Se requiere una URL válida (ej., https://ejemplo.com)",
//     },
//     success:
//       "¡Gracias! Tu cliente de correo se abrirá con la información prellenada.",
//   },
// };

// type LangKeys = keyof typeof translations;
// type ErrorKeys = keyof typeof translations[LangKeys]["errors"];

// const WebAccessibilityForm: React.FC = () => {
//   const { language } = useLanguage();
//   const t = translations[language as LangKeys];

//   const requiredFields: ErrorKeys[] = ["name", "email", "website"];

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     website: "",
//     phone: "",
//   });

//   const [errors, setErrors] = useState<
//     Partial<Record<ErrorKeys | "phone" | "robot", string>>
//   >({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isHuman, setIsHuman] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (errors[name as keyof typeof errors]) {
//       setErrors((prev) => {
//         const copy = { ...prev };
//         delete copy[name as keyof typeof copy];
//         return copy;
//       });
//     }
//   };

//   const validate = () => {
//     const errs: Partial<Record<ErrorKeys | "phone" | "robot", string>> = {};

//     if (!formData.name.trim()) {
//       errs.name = t.errors.name;
//     }

//     const emailVal = formData.email.trim();
//     if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
//       errs.email = t.errors.email;
//     }

//     const websiteVal = formData.website.trim();
//     if (!websiteVal) {
//       errs.website = t.errors.website;
//     } else {
//       const urlPattern = /^(https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z0-9-]+(?:\.[a-z]{2,}){1,2}(?:\/[\w\-~!$&'()*+,;=:@%\.]*)*$/i;
//       if (!urlPattern.test(websiteVal)) {
//         errs.website = t.errors.website;
//       }
//     }

//     if (formData.phone && !/^[\d\s()+-]+$/.test(formData.phone)) {
//       errs.phone =
//         language === "en"
//           ? "Please enter a valid phone number."
//           : "Por favor, introduce un número de teléfono válido.";
//     }

//     if (!isHuman) {
//       errs.robot =
//         language === "en"
//           ? "Please confirm you're not a robot."
//           : "Por favor, confirma que no eres un robot.";
//     }

//     return errs;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newErrors = validate();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     const subject =
//       language === "en"
//         ? "Web Accessibility Pack Request"
//         : "Solicitud Pack Accesibilidad Web";

//     const bodyLines = [
//       `${t.labels.name} ${formData.name}`,
//       `${t.labels.email} ${formData.email}`,
//       `${t.labels.website} ${formData.website}`,
//       `${t.labels.phone} ${formData.phone}`,
//     ];
//     const body = encodeURIComponent(bodyLines.join("%0D%0A"));

//     window.location.href = `mailto:a11ycontact@a11ysolutions.com?subject=${encodeURIComponent(
//       subject
//     )}&body=${body}`;

//     setIsSubmitted(true);
//     setFormData({
//       name: "",
//       email: "",
//       website: "",
//       phone: "",
//     });
//     setIsHuman(false);
//     setTimeout(() => setIsSubmitted(false), 6000);
//   };

//   return (
//     <section
//       id="contact"
//       className="bg-gradient-to-br from-[#0d9e71] to-black py-16 px-4 text-white"
//     >
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         <div className="text-center lg:text-left">
//           <h2 className="text-4xl font-bold mb-6">{t.title}</h2>
//           <p className="text-xl opacity-90 max-w-lg mx-auto lg:mx-0">
//             {t.description}
//           </p>
//         </div>

//         <div className="bg-black/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
//           {isSubmitted && (
//             <div className="p-4 mb-6 bg-green-900/30 text-green-200 rounded-lg border border-green-400/50">
//               {t.success}
//             </div>
//           )}

//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-2 gap-6"
//             noValidate
//           >
//             {(["name", "email"] as (keyof typeof formData)[]).map(
//               (field) => (
//                 <div key={field} className="flex flex-col">
//                   <label htmlFor={field} className="font-semibold mb-1">
//                     {t.labels[field as ErrorKeys]}
//                   </label>
//                   <input
//                     id={field}
//                     name={field}
//                     type={field === "email" ? "email" : "text"}
//                     value={(formData as any)[field]}
//                     onChange={handleChange}
//                     className={`p-3 rounded-md bg-black/30 text-white border ${
//                       errors[field as keyof typeof errors]
//                         ? "border-2 border-red-600"
//                         : "border-gray-600"
//                     } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400`}
//                     placeholder={
//                       t.placeholders[field as keyof typeof t.placeholders]
//                     }
//                     aria-invalid={
//                       errors[field as keyof typeof errors] ? "true" : "false"
//                     }
//                     aria-describedby={
//                       errors[field as keyof typeof errors]
//                         ? `${field}-error`
//                         : undefined
//                     }
//                     required
//                   />
//                   {errors[field as keyof typeof errors] && (
//                     <p
//                       id={`${field}-error`}
//                       className="text-sm text-red-500 mt-1"
//                       role="alert"
//                     >
//                       {errors[field as keyof typeof errors]}
//                     </p>
//                   )}
//                 </div>
//               )
//             )}

//             <div className="flex flex-col">
//               <label htmlFor="website" className="font-semibold mb-1">
//                 {t.labels.website}
//               </label>
//               <input
//                 id="website"
//                 name="website"
//                 type="text"
//                 value={formData.website}
//                 onChange={handleChange}
//                 className={`p-3 rounded-md bg-black/30 text-white border ${
//                   errors.website ? "border-2 border-red-600" : "border-gray-600"
//                 } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400`}
//                 placeholder={t.placeholders.website}
//                 required
//                 aria-invalid={errors.website ? "true" : "false"}
//                 aria-describedby={
//                   errors.website ? "website-error" : undefined
//                 }
//               />
//               {errors.website && (
//                 <p
//                   id="website-error"
//                   className="text-sm text-red-500 mt-1"
//                   role="alert"
//                 >
//                   {errors.website}
//                 </p>
//               )}
//             </div>

//             <div className="flex flex-col">
//               <label htmlFor="phone" className="font-semibold mb-1">
//                 {t.labels.phone}
//               </label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className={`p-3 rounded-md bg-black/30 text-white border ${
//                   errors.phone ? "border-2 border-red-600" : "border-gray-600"
//                 } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400`}
//                 placeholder={t.placeholders.phone}
//                 aria-invalid={errors.phone ? "true" : "false"}
//                 aria-describedby={errors.phone ? "phone-error" : undefined}
//               />
//               {errors.phone && (
//                 <p
//                   id="phone-error"
//                   className="text-sm text-red-500 mt-1"
//                   role="alert"
//                 >
//                   {errors.phone}
//                 </p>
//               )}
//             </div>

//             <div className="md:col-span-2 flex items-center gap-2">
//               <input
//                 id="robot-check"
//                 type="checkbox"
//                 checked={isHuman}
//                 onChange={(e) => setIsHuman(e.target.checked)}
//                 className="w-5 h-5 accent-[#0d9e71] bg-black/30 border border-gray-600 rounded"
//               />
//               <label htmlFor="robot-check" className="font-medium">
//                 {language === "en" ? "I'm not a robot" : "No soy un robot"}
//               </label>
//             </div>
//             {errors.robot && (
//               <div className="md:col-span-2">
//                 <p className="text-sm text-red-500 mt-1" role="alert">
//                   {errors.robot}
//                 </p>
//               </div>
//             )}

//             <div className="md:col-span-2">
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-br from-[#0d9e71] to-black text-white font-bold py-3 px-6 rounded-md transition duration-300 transform hover:scale-[1.02]"
//               >
//                 {t.labels.submit}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WebAccessibilityForm;

















import React, { useState } from 'react';
import { useLanguage } from '../../Context/LanguageContext';

const translations = {
    en: {
        title: (
            <>Ready to Comply with <span className="text-white">Accessibility Standards</span>?</>
        ),
        description:
            "Complete the form and we’ll contact you with all the information about our Web Accessibility Pack.",
        labels: {
            name: "Name *",
            email: "Email *",
            company: "Company (optional)",
            phone: "Phone (optional)",
            submit: "Request Information",
        },
        placeholders: {
            name: "Enter your name",
            email: "Enter your company email",
            company: "Company name",
            phone: "+01 XXX XXX XXX",
        },
        errors: {
            name: "Name is required.",
            email: "Valid company email is required.",
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
            name: "Nombre *",
            email: "Correo electrónico *",
            company: "Empresa (opcional)",
            phone: "Teléfono (opcional)",
            submit: "Solicitar información",
        },
        placeholders: {
            name: "Ingresa tu nombre",
            email: "Ingresa tu correo de empresa",
            company: "Nombre de tu empresa",
            phone: "+01 XXX XXX XXX",
        },
        errors: {
            name: "El nombre es obligatorio.",
            email: "Se requiere un correo de empresa válido.",
        },
        success:
            "¡Gracias! Tu cliente de correo se abrirá con la información prellenada.",
    },
};

type LangKeys = keyof typeof translations;
type ErrorKeys = keyof typeof translations[LangKeys]["errors"];

const WebAccessibilityForm: React.FC = () => {
    const { language } = useLanguage();
    const t = translations[language as LangKeys];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
    });

    const [errors, setErrors] = useState<
        Partial<Record<ErrorKeys | "phone" | "robot", string>>
    >({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isHuman, setIsHuman] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[name as keyof typeof copy];
                return copy;
            });
        }
    };

    const validate = () => {
        const errs: Partial<Record<ErrorKeys | "phone" | "robot", string>> = {};

        if (!formData.name.trim()) {
            errs.name = t.errors.name;
        }

        const emailVal = formData.email.trim();
        if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            errs.email = t.errors.email;
        }

        if (formData.phone && !/^[\d\s()+-]+$/.test(formData.phone)) {
            errs.phone =
                language === "en"
                    ? "Please enter a valid phone number."
                    : "Por favor, introduce un número de teléfono válido.";
        }

        if (!isHuman) {
            errs.robot =
                language === "en"
                    ? "Please confirm you're not a robot."
                    : "Por favor, confirma que no eres un robot.";
        }

        return errs;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

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
        setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
        });
        setIsHuman(false);
        setTimeout(() => setIsSubmitted(false), 6000);
    };

    return (
        <section id='contact' className="bg-gradient-to-br from-[#0d9e71] to-black py-16 px-4 text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left column - Text */}
                <div className="text-center lg:text-left">
                    <h2 className="text-4xl font-bold mb-6">
                        {t.title}
                    </h2>
                    <p className="text-xl opacity-90 max-w-lg mx-auto lg:mx-0">
                        {t.description}
                    </p>
                </div>

                {/* Right column - Form in card */}
                <div className="bg-black/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                    {isSubmitted && (
                        <div className="p-4 mb-6 bg-green-900/30 text-green-200 rounded-lg border border-green-400/50">
                            {t.success}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        noValidate
                    >
                        {/* Name field */}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="font-semibold mb-1">
                                {t.labels.name}
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className={`p-3 rounded-md bg-black/30 text-white border ${
                                    errors.name
                                        ? "border-2 border-red-600"
                                        : "border-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400`}
                                placeholder={t.placeholders.name}
                                aria-invalid={errors.name ? "true" : "false"}
                                aria-describedby={errors.name ? "name-error" : undefined}
                                required
                            />
                            {errors.name && (
                                <p
                                    id="name-error"
                                    className="text-sm text-red-500 mt-1"
                                    role="alert"
                                >
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email field */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-semibold mb-1">
                                {t.labels.email}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`p-3 rounded-md bg-black/30 text-white border ${
                                    errors.email
                                        ? "border-2 border-red-600"
                                        : "border-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400`}
                                placeholder={t.placeholders.email}
                                required
                                aria-invalid={errors.email ? "true" : "false"}
                                aria-describedby={errors.email ? "email-error" : undefined}
                            />
                            {errors.email && (
                                <p
                                    id="email-error"
                                    className="text-sm text-red-500 mt-1"
                                    role="alert"
                                >
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Company field (optional) */}
                        <div className="flex flex-col">
                            <label htmlFor="company" className="font-semibold mb-1">
                                {t.labels.company}
                            </label>
                            <input
                                id="company"
                                name="company"
                                type="text"
                                value={formData.company}
                                onChange={handleChange}
                                className="p-3 rounded-md bg-black/30 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400"
                                placeholder={t.placeholders.company}
                                aria-invalid="false"
                            />
                        </div>

                        {/* Phone field (optional) */}
                        <div className="flex flex-col">
                            <label htmlFor="phone" className="font-semibold mb-1">
                                {t.labels.phone}
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`p-3 rounded-md bg-black/30 text-white border ${
                                    errors.phone ? "border-2 border-red-600" : "border-gray-600"
                                } focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400`}
                                placeholder={t.placeholders.phone}
                                aria-invalid={errors.phone ? "true" : "false"}
                                aria-describedby={errors.phone ? "phone-error" : undefined}
                            />
                            {errors.phone && (
                                <p
                                    id="phone-error"
                                    className="text-sm text-red-500 mt-1"
                                    role="alert"
                                >
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Robot checkbox */}
                        <div className="md:col-span-2 flex items-center gap-2">
                            <input
                                id="robot-check"
                                type="checkbox"
                                checked={isHuman}
                                onChange={(e) => setIsHuman(e.target.checked)}
                                className="w-5 h-5 accent-[#0d9e71] bg-black/30 border border-gray-600 rounded"
                            />
                            <label htmlFor="robot-check" className="font-medium">
                                {language === "en" ? "I'm not a robot" : "No soy un robot"}
                            </label>
                        </div>
                        {errors.robot && (
                            <div className="md:col-span-2">
                                <p
                                    className="text-sm text-red-500 mt-1"
                                    role="alert"
                                >
                                    {errors.robot}
                                </p>
                            </div>
                        )}

                        {/* Submit button */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-br from-[#0d9e71] to-black text-white font-bold py-3 px-6 rounded-md transition duration-300 transform hover:scale-[1.02]"
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
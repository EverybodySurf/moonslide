// Translation dictionary
export const translations = {
  fr: {
    // Home
    tagline: 'Planches de surf artisanales de Guadeloupe',
    contactBtn: 'Contact',
    
    // Menu
    home: 'ACCUEIL',
    contact: 'CONTACT',
    
    // Contact
    contactTitle: 'Contact',
    namePlaceholder: 'Nom',
    emailPlaceholder: 'Email',
    phonePlaceholder: 'Téléphone',
    boardPlaceholder: ' Quelle planche vous intéresse ?',
    submitBtn: 'Envoyer',
    whatsappLabel: 'WhatsApp',
    successMessage: 'Merci ! Nous vous répondrons rapidement.',
    
    // Form email
    emailSubject: 'Nouvelle demande de contact - Moonslide',
  },
  en: {
    // Home
    tagline: 'Handcrafted surfboards from Guadeloupe',
    contactBtn: 'Contact',
    
    // Menu
    home: 'HOME',
    contact: 'CONTACT',
    
    // Contact
    contactTitle: 'Contact',
    namePlaceholder: 'Name',
    emailPlaceholder: 'Email',
    phonePlaceholder: 'Phone',
    boardPlaceholder: 'What board are you interested in?',
    submitBtn: 'Send',
    whatsappLabel: 'WhatsApp',
    successMessage: 'Thank you! We\'ll get back to you soon.',
    
    // Form email
    emailSubject: 'New contact request - Moonslide',
  }
};

export function t(key, lang) {
  return translations[lang][key] || key;
}
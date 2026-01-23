import { SEOConfig } from '../utils/seo-manager';

export const defaultSEOConfig: SEOConfig = {
    title: 'Психолог в Чехии и ЕС | Психологическая помощь на русском языке',
    description: 'Психолог в Чехии и Евросоюзе, консультации на русском языке. Профессиональная психологическая помощь для гармоничной жизни. Специализация в гипнотерапии, арт-терапии и ольфактотерапии. Онлайн-консультации.',
    keywords: 'психолог на русском, психолог в Чехии, русскоязычный психолог, психологическая помощь в Евросоюзе, онлайн психолог, психотерапия, гипнотерапия, арт-терапия, семейный психолог, Прага',
    canonical: 'https://www.psymindvia.com/',
    ogTitle: 'Психолог в Чехии и ЕС | Психологическая помощь на русском языке',
    ogDescription: 'Профессиональные психологические услуги на русском языке в Чехии и Евросоюзе. Индивидуальные и семейные консультации, гипнотерапия, арт-терапия.',
    ogType: 'website',
    ogUrl: 'https://www.psymindvia.com/',
    ogImage: 'https://www.psymindvia.com/images/banner.jpg',
    twitterCard: 'summary_large_image',
    lang: 'ru',
    schemaOrg: {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Психологические услуги в Чехии и ЕС',
        url: 'https://www.psymindvia.com/',
        logo: 'https://www.psymindvia.com/favicon.jpg',
        description: 'Профессиональные психологические услуги на русском языке в Чехии и странах Евросоюза',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'Чехия',
        },
        priceRange: '$$',
        openingHours: 'Mo-Fr 09:00-18:00',
        telephone: '+420XXXXXXXXX',
        serviceArea: {
            '@type': 'GeoCircle',
            name: 'Чехия и Евросоюз',
        },
        offers: {
            '@type': 'Offer',
            description: 'Психологические консультации на русском языке',
        },
        knowsLanguage: ['ru', 'cs', 'en'],
    },
};

export const seoConfigBySection = {
    home: defaultSEOConfig,
    about: {
        ...defaultSEOConfig,
        title: 'О психологе | Психологическая помощь в Чехии',
        description: 'Профессиональный психолог с многолетним опытом работы в Чехии и Евросоюзе. Индивидуальный подход к каждому клиенту.',
        canonical: 'https://www.psymindvia.com/#about',
    },
    services: {
        ...defaultSEOConfig,
        title: 'Услуги психолога | Консультации в Чехии',
        description: 'Психологические консультации, гипнотерапия, арт-терапия, семейная терапия. Помощь в решении личных и семейных проблем.',
        canonical: 'https://www.psymindvia.com/#services',
    },
    courses: {
        ...defaultSEOConfig,
        title: 'Курсы и обучение | Психологические тренинги',
        description: 'Профессиональные психологические курсы и тренинги. Повышение квалификации и личностный рост.',
        canonical: 'https://www.psymindvia.com/#courses',
    },
    testimonials: {
        ...defaultSEOConfig,
        title: 'Отзывы клиентов | Психолог в Чехии',
        description: 'Реальные отзывы клиентов о работе психолога. Результаты консультаций и терапии.',
        canonical: 'https://www.psymindvia.com/#testimonials',
    },
    contact: {
        ...defaultSEOConfig,
        title: 'Контакты | Записаться на консультацию к психологу',
        description: 'Запись на консультацию к психологу в Чехии. Онлайн и офлайн форматы. Свяжитесь для получения помощи.',
        canonical: 'https://www.psymindvia.com/#contact',
    },
};

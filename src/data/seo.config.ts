import { SEOConfig } from '../utils/seo-manager';

export const defaultSEOConfig: SEOConfig = {
    title: 'Психолог Теона Хаметова | Клинический психолог в Чехии и онлайн',
    description: 'Психолог Теона Хаметова — клинический психолог, регрессолог и расстановщик. Индивидуальные и семейные консультации на русском языке в Чехии и онлайн по всему миру. Помощь при тревоге, панических атаках, выгорании и кризисах в отношениях.',
    keywords: 'психолог, клинический психолог, психолог Теона Хаметова, психолог в Чехии, онлайн психолог, психолог на русском, регрессолог, системные расстановки, семейный психолог, терапия тревоги, панические атаки, выгорание',
    canonical: 'https://www.psymindvia.com/',
    ogTitle: 'Психолог Теона Хаметова | Клинический психолог в Чехии и онлайн',
    ogDescription: 'Клинический психолог Теона Хаметова. Консультации на русском языке в Чехии и онлайн: индивидуальная и семейная терапия, регрессия, системные расстановки, работа с тревогой и выгоранием.',
    ogType: 'website',
    ogUrl: 'https://www.psymindvia.com/',
    ogImage: 'https://www.psymindvia.com/images/banner.jpg',
    twitterCard: 'summary_large_image',
    lang: 'ru',
    schemaOrg: {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Психолог Теона Хаметова | Клинический психолог',
        url: 'https://www.psymindvia.com/',
        logo: 'https://www.psymindvia.com/favicon.jpg',
        description: 'Клинический психолог Теона Хаметова. Психологические консультации на русском языке в Чехии и онлайн: помощь при тревоге, панических атаках, выгорании и кризисах в отношениях.',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'Чехия',
        },
        priceRange: '$$',
        openingHours: 'Mo-Fr 09:00-18:00',
        telephone: '+994505252509',
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

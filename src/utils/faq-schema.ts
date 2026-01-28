import SEOManager from './seo-manager';

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const generateFAQSchema = (faqs: FAQItem[]): void => {
  if (!faqs || faqs.length === 0) return;

  const mainEntity = faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntity,
  };

  SEOManager.getInstance().setSchemaOrg(schema);
};

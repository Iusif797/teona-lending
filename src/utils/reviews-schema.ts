import SEOManager from './seo-manager';
import { TestimonialItem } from '../types';

export const generateReviewsSchema = (testimonials: TestimonialItem[]): void => {
  if (!testimonials || testimonials.length === 0) return;

  const reviews = testimonials.map((testimonial) => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.name || 'Анонимный клиент',
    },
    reviewBody: testimonial.content,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating || 5,
      bestRating: 5,
      worstRating: 1,
    },
  }));

  const averageRating = testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length;
  const reviewCount = testimonials.length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Психологические консультации Теоны Хаметовой',
    provider: {
      '@type': 'Person',
      name: 'Теона Хаметова',
      jobTitle: 'Клинический психолог, регрессолог, расстановщик',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews,
  };

  SEOManager.getInstance().setSchemaOrg(schema);
};

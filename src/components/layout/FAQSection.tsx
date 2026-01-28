import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import media from '../../styles/media';
import theme from '../../styles/theme';
import { FaChevronDown } from 'react-icons/fa';
import { generateFAQSchema } from '../../utils/faq-schema';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: 'Как проходит первая консультация?',
    answer: 'Первая консультация — это знакомство и диагностика. Мы обсуждаем ваш запрос, определяем цели работы и выбираем подходящие методы. Длительность — 60-90 минут.',
  },
  {
    id: 2,
    question: 'Сколько длится курс терапии?',
    answer: 'Длительность курса зависит от вашего запроса и индивидуальных особенностей. Обычно это от 5-10 сессий для решения конкретных задач до долгосрочной работы для глубоких изменений.',
  },
  {
    id: 3,
    question: 'Можно ли работать онлайн?',
    answer: 'Да, я провожу консультации как очно, так и онлайн через видеосвязь. Онлайн-формат так же эффективен и удобен для клиентов из разных городов.',
  },
  {
    id: 4,
    question: 'Какие методы психотерапии вы используете?',
    answer: 'Я работаю интегративно, используя методы КПТ, квантовой психологии, МАК-терапии, регрессивной терапии, системных расстановок, НЛП и другие подходы, адаптируя их под ваши потребности.',
  },
  {
    id: 5,
    question: 'Как записаться на консультацию?',
    answer: 'Вы можете записаться через форму на сайте, написать в WhatsApp или Instagram, либо позвонить по телефону. Я отвечу в течение 24 часов и предложу удобное время для встречи.',
  },
  {
    id: 6,
    question: 'Работаете ли вы с подростками?',
    answer: 'Да, я провожу консультации для подростков и их семей. Работаю с вопросами идентичности, кризисами переходного возраста, внутренними конфликтами и семейными отношениями.',
  },
];

const FAQSectionContainer = styled.section`
  padding: 7rem 0;
  background-color: var(--color-bg-alt);

  ${media.md} {
    padding: 6rem 0;
  }

  ${media.sm} {
    padding: 5rem 0;
  }
`;

const FAQList = styled.div`
  max-width: 900px;
  margin: 4rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${media.sm} {
    margin-top: 3rem;
    gap: 0.75rem;
  }
`;

const FAQItem = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.default};
  box-shadow: ${theme.shadows.medium};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.hover};
  }
`;

const FAQQuestion = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-text);
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }

  svg {
    font-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    color: var(--color-primary);
    flex-shrink: 0;
    margin-left: 1rem;
  }

  ${media.sm} {
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
  }
`;

const FAQAnswer = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: ${({ isOpen }) => (isOpen ? '0 2rem 1.5rem 2rem' : '0 2rem')};

  ${media.sm} {
    padding: ${({ isOpen }) => (isOpen ? '0 1.5rem 1.25rem 1.5rem' : '0 1.5rem')};
  }

  p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-text-light);
    margin: 0;
  }
`;

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    generateFAQSchema(FAQ_DATA);
  }, []);

  return (
    <FAQSectionContainer id="faq">
      <Container>
        <AnimatedElement animation="fadeIn">
          <SectionTitle
            title="Часто задаваемые вопросы"
            subtitle="Ответы на самые популярные вопросы о моей работе"
            centered
          />
        </AnimatedElement>

        <FAQList>
          {FAQ_DATA.map((faq, index) => (
            <AnimatedElement key={faq.id} animation="fadeInUp" delay={index * 0.1}>
              <FAQItem>
                <FAQQuestion
                  isOpen={openItems.has(faq.id)}
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={openItems.has(faq.id)}
                >
                  <span>{faq.question}</span>
                  <FaChevronDown />
                </FAQQuestion>
                <FAQAnswer isOpen={openItems.has(faq.id)}>
                  <p>{faq.answer}</p>
                </FAQAnswer>
              </FAQItem>
            </AnimatedElement>
          ))}
        </FAQList>
      </Container>
    </FAQSectionContainer>
  );
};

export default FAQSection;

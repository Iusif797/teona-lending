import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import media from '../../styles/media';
import { FaHandshake, FaComments, FaHeart, FaCheckCircle } from 'react-icons/fa';

const ProcessSectionContainer = styled.section`
  padding: 6rem 0;
  background-color: var(--color-bg);

  ${media.md} {
    padding: 5rem 0;
  }

  ${media.sm} {
    padding: 4rem 0;
  }
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 4rem;

  ${media.lg} {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  ${media.md} {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    max-width: 500px;
    margin: 4rem auto 0;
  }
`;

const ProcessStep = styled.div`
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StepIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(201, 160, 122, 0.3);
  transition: transform 0.3s ease;

  svg {
    font-size: 2rem;
    color: white;
  }

  ${ProcessStep}:hover & {
    transform: scale(1.1) rotate(5deg);
  }

  ${media.sm} {
    width: 70px;
    height: 70px;
    margin-bottom: 1.25rem;

    svg {
      font-size: 1.75rem;
    }
  }
`;

const StepNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
  font-family: var(--font-heading);

  ${media.sm} {
    font-size: 1.2rem;
  }
`;

const StepDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-light);
`;

const PROCESS_STEPS = [
  {
    id: 1,
    number: '01',
    icon: FaHandshake,
    title: 'Знакомство',
    description: 'Первичная консультация, где мы знакомимся, обсуждаем ваши запросы и определяем цели работы.',
  },
  {
    id: 2,
    number: '02',
    icon: FaComments,
    title: 'Работа',
    description: 'Индивидуальные сессии с использованием различных методов психотерапии, адаптированных под ваши потребности.',
  },
  {
    id: 3,
    number: '03',
    icon: FaHeart,
    title: 'Поддержка',
    description: 'Постоянная поддержка и сопровождение на всех этапах работы, помощь в интеграции изменений в жизнь.',
  },
  {
    id: 4,
    number: '04',
    icon: FaCheckCircle,
    title: 'Результат',
    description: 'Достижение поставленных целей, улучшение качества жизни и обретение внутренней гармонии.',
  },
];

const ProcessSection: React.FC = () => {
  return (
    <ProcessSectionContainer id="process">
      <Container>
        <AnimatedElement animation="fadeIn">
          <SectionTitle
            title="Как я работаю"
            subtitle="Четыре простых шага на пути к изменениям"
            centered
          />
        </AnimatedElement>

        <ProcessSteps>
          {PROCESS_STEPS.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <AnimatedElement key={step.id} animation="fadeInUp" delay={index * 0.1}>
                <ProcessStep>
                  <StepIcon>
                    <IconComponent />
                  </StepIcon>
                  <StepNumber>{step.number}</StepNumber>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </ProcessStep>
              </AnimatedElement>
            );
          })}
        </ProcessSteps>
      </Container>
    </ProcessSectionContainer>
  );
};

export default ProcessSection;

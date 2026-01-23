import React from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import AnimatedElement from '../ui/AnimatedElement';
import media from '../../styles/media';
import { FaCheckCircle, FaStar, FaUsers, FaHeart, FaBookOpen, FaGraduationCap, FaRegClock } from 'react-icons/fa';

const SpecialCourseSection = styled.section`
  padding: 6rem 0;
  background: var(--color-background);
  position: relative;
  overflow: hidden;
  
  ${media.md} {
    padding: 5rem 0;
  }
  
  ${media.sm} {
    padding: 4rem 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #a66a42 0%, #d9b293 100%);
  }
`;

const CourseHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  z-index: 2;
  
  ${media.md} {
    margin-bottom: 3rem;
  }
`;

const CourseTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  color: #2c2420;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  
  ${media.xl} {
    font-size: 3rem;
  }
  
  ${media.md} {
    font-size: 2.5rem;
  }
  
  ${media.sm} {
    font-size: 2rem;
  }
`;

const CourseSubtitle = styled.p`
  font-size: 1.4rem;
  color: #6a5a50;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  font-weight: 500;
  
  ${media.md} {
    font-size: 1.2rem;
  }
  
  ${media.sm} {
    font-size: 1.1rem;
  }
`;

const CourseBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #a66a42;
  color: white;
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(166, 106, 66, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${media.sm} {
    padding: 0.6rem 1.4rem;
    font-size: 0.9rem;
  }
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  margin-bottom: 3rem;
  
  ${media.md} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const SectionBlock = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(166, 106, 66, 0.1); // subtle brown border
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  }
  
  ${media.sm} {
    padding: 2rem;
    border-radius: 20px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c2420;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  svg {
    color: #a66a42;
    font-size: 1.5rem;
    padding: 0.5rem;
    background: rgba(166, 106, 66, 0.1);
    border-radius: 12px;
    width: 2.5rem;
    height: 2.5rem;
  }
  
  ${media.sm} {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #5a4a42;
  
  svg {
    color: #a66a42;
    margin-top: 0.2rem;
    flex-shrink: 0;
    font-size: 1.2rem;
  }
`;

const FullWidthSection = styled.div`
  margin: 4rem 0;
  
  ${media.md} {
    margin: 3rem 0;
  }
`;

const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  ${media.lg} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media.sm} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ModuleCard = styled.div`
  background: #fcfbf9;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #efe6df;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #a66a42 0%, #d9b293 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: white;
    box-shadow: 0 10px 30px rgba(166, 106, 66, 0.1);
    transform: translateY(-5px);
    border-color: #d9b293;
    
    &::after {
      opacity: 1;
    }
  }
`;

const ModuleTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c2420;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  svg {
    color: #a66a42;
    font-size: 1.2rem;
  }
`;

const ModuleContent = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #6a5a50;
  margin: 0;
`;

const FormatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2 columns for format items
  gap: 1.5rem;
  
  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

const FormatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: #f9f4f1;
  border-radius: 16px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    border-color: #e6d3c9;
    box-shadow: 0 4px 15px rgba(166, 106, 66, 0.08);
  }
  
  svg {
    color: #a66a42;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
`;

const PriceCard = styled.div`
  background: linear-gradient(135deg, #a66a42 0%, #8c5530 100%);
  color: white;
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(166, 106, 66, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%);
    animation: shimmer 8s linear infinite;
  }
  
  @keyframes shimmer {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  ${media.sm} {
    padding: 2rem;
  }
`;

const PriceLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0.9;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PriceValue = styled.div`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-shadow: 0 4px 10px rgba(0,0,0,0.1);
  
  ${media.sm} {
    font-size: 3rem;
  }
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background: white;
  color: #a66a42;
  padding: 1.2rem 3rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    background: #fdfbf9;
  }
  
  ${media.sm} {
    width: 100%;
  }
`;

const SpecialCourseOffer: React.FC = () => {
  return (
    <SpecialCourseSection>
      <Container>
        <AnimatedElement animation="fadeIn">
          <CourseHeader>
            <CourseBadge>
              <FaStar /> Идет набор
            </CourseBadge>
            <CourseTitle>Курс по системным расстановкам<br />по Берту Хеллингеру</CourseTitle>
            <CourseSubtitle>
              Это больше, чем обучение технике. Это глубокая работа с системой человека, его родом, судьбой и бессознательными сценариями.
            </CourseSubtitle>
          </CourseHeader>
        </AnimatedElement>

        {/* Intro Grid: Why & Who */}
        <GridSection>
          <AnimatedElement animation="fadeInLeft" delay={0.1}>
            <SectionBlock>
              <SectionTitle>
                <FaHeart /> Для чего этот курс
              </SectionTitle>
              <FeatureList>
                <FeatureItem>
                  <FaCheckCircle />
                  Чтобы глубоко понимать причины жизненных трудностей клиентов
                </FeatureItem>
                <FeatureItem>
                  <FaCheckCircle />
                  Чтобы работать не с симптомом, а с корнем проблемы
                </FeatureItem>
                <FeatureItem>
                  <FaCheckCircle />
                  Чтобы научиться читать поле системы и видеть скрытые динамики
                </FeatureItem>
                <FeatureItem>
                  <FaCheckCircle />
                  Чтобы расширить профессиональный инструментарий
                </FeatureItem>
              </FeatureList>
            </SectionBlock>
          </AnimatedElement>

          <AnimatedElement animation="fadeInRight" delay={0.2}>
            <SectionBlock>
              <SectionTitle>
                <FaUsers /> Для кого этот курс
              </SectionTitle>
              <FeatureList>
                <FeatureItem>
                  <FaCheckCircle />
                  Для психологов и психотерапевтов
                </FeatureItem>
                <FeatureItem>
                  <FaCheckCircle />
                  Для коучей, консультантов, специалистов помогающих профессий
                </FeatureItem>
                <FeatureItem>
                  <FaCheckCircle />
                  Для тех, кто хочет глубже понимать себя и других
                </FeatureItem>
                <FeatureItem>
                  <FaCheckCircle />
                  Для тех, кто готов работать экологично, системно и профессионально
                </FeatureItem>
              </FeatureList>
            </SectionBlock>
          </AnimatedElement>
        </GridSection>

        {/* Full Width Modules */}
        <FullWidthSection>
          <AnimatedElement animation="fadeInUp" delay={0.3}>
            <SectionBlock style={{ background: '#f5f0eb', border: 'none' }}> 
            {/* Slightly different background for variety */}
              <SectionTitle style={{ marginBottom: '3rem', justifyContent: 'center' }}>
                <FaBookOpen /> Что мы проходим на курсе
              </SectionTitle>
              <ModuleGrid>
                <ModuleCard>
                  <ModuleTitle>
                    <FaGraduationCap /> Классические расстановки
                  </ModuleTitle>
                  <ModuleContent>
                    Законы системы, порядки любви, динамики рода, заместительское восприятие
                  </ModuleContent>
                </ModuleCard>
                <ModuleCard>
                  <ModuleTitle>
                    <FaGraduationCap /> Родология и программы
                  </ModuleTitle>
                  <ModuleContent>
                    Родовые сценарии, переплетения, лояльности, повторяющиеся судьбы
                  </ModuleContent>
                </ModuleCard>
                <ModuleCard>
                  <ModuleTitle>
                    <FaGraduationCap /> Пренатальный период
                  </ModuleTitle>
                  <ModuleContent>
                    Влияние внутриутробного опыта, беременности и родов на судьбу человека
                  </ModuleContent>
                </ModuleCard>
                <ModuleCard>
                  <ModuleTitle>
                    <FaGraduationCap /> Работа с МАК-картами
                  </ModuleTitle>
                  <ModuleContent>
                    Работа с образами, бессознательными процессами и клиентскими запросами
                  </ModuleContent>
                </ModuleCard>
                <ModuleCard>
                  <ModuleTitle>
                    <FaGraduationCap /> Расстановки по фигуркам
                  </ModuleTitle>
                  <ModuleContent>
                    Структурная и наглядная работа с системой на столе
                  </ModuleContent>
                </ModuleCard>
                <ModuleCard>
                  <ModuleTitle>
                    <FaGraduationCap /> Расстановки по якорям
                  </ModuleTitle>
                  <ModuleContent>
                    Телесно-пространственная работа, закрепление новых состояний
                  </ModuleContent>
                </ModuleCard>
              </ModuleGrid>
            </SectionBlock>
          </AnimatedElement>
        </FullWidthSection>

        {/* Footer Grid: Format & Price */}
        <GridSection>
          <AnimatedElement animation="fadeInLeft" delay={0.4}>
            <SectionBlock>
              <SectionTitle>
                <FaRegClock /> Формат обучения
              </SectionTitle>
              <FormatGrid>
                <FormatItem>
                  <FaCheckCircle />
                  Практика на каждом уроке
                </FormatItem>
                <FormatItem>
                  <FaCheckCircle />
                  Реальные запросы и кейсы
                </FormatItem>
                <FormatItem>
                  <FaCheckCircle />
                  Работа в роли расстановщика
                </FormatItem>
                <FormatItem>
                  <FaCheckCircle />
                  Поддержка и разбор процессов
                </FormatItem>
              </FormatGrid>
              <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#6a5a50', fontSize: '1.05rem' }}>
                "Это курс, где учатся чувствовать систему, а не просто повторять алгоритмы."
              </p>
              <p style={{ marginTop: '1rem', color: '#6a5a50', lineHeight: 1.6 }}>
                Системные расстановки помогают увидеть скрытое и мягко привести систему к балансу.
              </p>
            </SectionBlock>
          </AnimatedElement>

          <AnimatedElement animation="fadeInRight" delay={0.5}>
            <PriceCard>
              <PriceLabel>Стоимость курса</PriceLabel>
              <PriceValue>600 $</PriceValue>
              <CTAButton href="#contact-form">
                Оставить заявку
              </CTAButton>
            </PriceCard>
          </AnimatedElement>
        </GridSection>

      </Container>
    </SpecialCourseSection>
  );
};

export default SpecialCourseOffer;

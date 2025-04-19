import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import { media } from '../../styles/media';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { COURSES } from '../../data/constants';
import type { CourseModule as CourseModuleType } from '../../types';

const TeachersWrapper = styled.section`
  padding: 7rem 0;
  background-color: var(--color-bg-alt);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 20% 30%, rgba(131, 99, 170, 0.1) 0%, transparent 60%);
    z-index: 0;
  }

  ${media.md} {
    padding: 6rem 0;
  }

  ${media.sm} {
    padding: 5rem 0;
  }
`;

const TeacherCard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  ${media.lg} {
    flex-direction: column;
  }
`;

const TeacherImageContainer = styled.div`
  flex: 0 0 300px;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    flex: 0 0 350px;
    height: 350px;
  }

  ${media.sm} {
    height: 300px;
  }
`;

const TeacherImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/images/teacher.jpg');
  background-size: cover;
  background-position: center top;
  transition: transform 0.5s ease;

  ${TeacherCard}:hover & {
    transform: scale(1.05);
  }

  ${media.sm} {
    background-position: top 30% center;
  }
`;

const TeacherInfo = styled.div`
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;

  ${media.md} {
    padding: 2rem;
  }

  ${media.sm} {
    padding: 1.5rem;
  }
`;

const TeacherName = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text);

  ${media.md} {
    font-size: 2rem;
  }

  ${media.sm} {
    font-size: 1.7rem;
  }
`;

const TeacherTitle = styled.p`
  font-size: 1.2rem;
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: 1.5rem;

  ${media.sm} {
    font-size: 1.1rem;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.8rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-text-light)'};
  border-bottom: 2px solid ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }

  ${media.sm} {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
  }
`;

const TabContent = styled.div`
  line-height: 1.6;
  color: var(--color-text-light);
  font-size: 1rem;

  p {
    margin-bottom: 1rem;
  }

  ${media.sm} {
    font-size: 0.9rem;
  }
`;

const QualificationsList = styled.ul`
  padding-left: 1.5rem;
  margin-top: 1rem;
`;

const QualificationItem = styled.li`
  margin-bottom: 0.8rem;
  position: relative;
  padding-left: 0.5rem;
  
  &::before {
    content: '';
    position: absolute;
    left: -1rem;
    top: 0.6rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--color-primary);
  }

  ${media.sm} {
    font-size: 0.9rem;
  }
`;

const CoursesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.2rem;

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

const CourseItem = styled.div`
  background-color: var(--color-bg-light);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 3px solid var(--color-primary);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }

  ${media.sm} {
    padding: 1.2rem;
  }
`;

const CourseTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.7rem;
  color: var(--color-text);
  font-weight: 600;

  ${media.sm} {
    font-size: 1.1rem;
  }
`;

const CourseDescription = styled.p`
  font-size: 0.95rem;
  color: var(--color-text-light);

  ${media.sm} {
    font-size: 0.9rem;
  }
`;

// Компоненты для раскрывающейся части курсов
const ExpandedCourseDetails = styled.div<{ isExpanded: boolean }>`
  max-height: ${({ isExpanded }) => (isExpanded ? '5000px' : '0')};
  overflow: hidden;
  transition: max-height 0.7s ease, opacity 0.3s ease;
  opacity: ${({ isExpanded }) => (isExpanded ? '1' : '0')};
  margin-top: ${({ isExpanded }) => (isExpanded ? '1.5rem' : '0')};
`;

const ModulesList = styled.div`
  margin-bottom: 2rem;
`;

const ModuleItem = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: var(--color-bg-light);
  border-radius: 8px;
  transition: all 0.4s ease;
  border-left: 3px solid var(--color-primary);
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ModuleTitle = styled.h5`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--color-text);
  display: flex;
  align-items: center;
  font-weight: 600;
  
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: var(--color-primary);
    border-radius: 50%;
    margin-right: 12px;
  }
`;

const ModuleContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-light);
  padding-left: 20px;
  
  p {
    margin-bottom: 0.8rem;
  }
`;

const DetailsSectionTitle = styled.h4`
  font-size: 1.3rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.8rem;
  font-weight: 600;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--color-primary);
  }
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  
  svg {
    margin-left: 0.5rem;
    font-size: 0.8rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    opacity: 0.8;
  }
`;

// Хук для отображения содержимого модуля с правильным форматированием
const useModuleFormatter = () => {
  const formatModuleContent = (content: string) => {
    if (content.includes('•')) {
      const lines = content.split('\n');
      return (
        <div>
          {lines.map((line, i) => {
            if (line.trim().startsWith('•')) {
              return <p key={i}>{line}</p>;
            }
            else if (line.trim().startsWith('-')) {
              return <p key={i} style={{ paddingLeft: '1.5rem' }}>{line}</p>;
            }
            else if (line.trim()) {
              return <p key={i}>{line}</p>;
            }
            return <br key={i} />;
          })}
        </div>
      );
    }
    return content;
  };

  return { formatModuleContent };
};

// Компонент для отображения модуля курса
const TeacherCourseModule: React.FC<{ 
  module: CourseModuleType; 
  index: number; 
  isVisible: boolean 
}> = ({ 
  module, 
  index, 
  isVisible 
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const { formatModuleContent } = useModuleFormatter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isVisible) {
        setIsRendered(true);
      }
    }, index * 100);
    
    return () => clearTimeout(timer);
  }, [isVisible, index]);

  return (
    <ModuleItem className={isRendered ? 'visible' : ''}>
      <ModuleTitle>{module.title}</ModuleTitle>
      <ModuleContent>{formatModuleContent(module.content)}</ModuleContent>
    </ModuleItem>
  );
};

// Компонент для отображения курса с возможностью раскрытия деталей
const ExpandableCourse: React.FC<{ 
  title: string; 
  description: string;
  courseId: number;
  isExpanded: boolean;
  toggleExpanded: (id: number) => void;
}> = ({ 
  title, 
  description, 
  courseId, 
  isExpanded, 
  toggleExpanded 
}) => {
  const course = COURSES.find(c => c.id === courseId);
  const [isContentVisible, setIsContentVisible] = useState(false);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isExpanded) {
      setIsContentVisible(true);
    } else {
      timer = setTimeout(() => {
        setIsContentVisible(false);
      }, 500);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isExpanded]);

  if (!course) {
    return (
      <CourseItem onClick={() => toggleExpanded(courseId)}>
        <CourseTitle>{title}</CourseTitle>
        <CourseDescription>{description}</CourseDescription>
        <ToggleButton>
          Подробнее о курсе {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </ToggleButton>
      </CourseItem>
    );
  }

  return (
    <div>
      <CourseItem onClick={() => toggleExpanded(courseId)}>
        <CourseTitle>{title}</CourseTitle>
        <CourseDescription>{description}</CourseDescription>
        <ToggleButton>
          {isExpanded ? 'Свернуть' : 'Подробнее о курсе'} {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </ToggleButton>
      </CourseItem>
      
      <ExpandedCourseDetails isExpanded={isExpanded}>
        {isContentVisible && (
          <>
            <DetailsSectionTitle>Программа курса</DetailsSectionTitle>
            <ModulesList>
              {course.modules?.map((module, index) => (
                <TeacherCourseModule
                  key={module.id}
                  module={module}
                  index={index}
                  isVisible={isExpanded}
                />
              ))}
            </ModulesList>
            
            {course.benefits && course.benefits.length > 0 && (
              <>
                <DetailsSectionTitle>Чему вы научитесь</DetailsSectionTitle>
                <QualificationsList>
                  {course.benefits.map((benefit, index) => (
                    <QualificationItem key={index}>{benefit}</QualificationItem>
                  ))}
                </QualificationsList>
              </>
            )}
          </>
        )}
      </ExpandedCourseDetails>
    </div>
  );
};

const TeachersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('biography');
  const [expandedCourseId, setExpandedCourseId] = useState<number | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleCourseExpanded = (id: number) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  return (
    <TeachersWrapper id="teachers">
      <Container>
        <AnimatedElement animation="fadeIn">
          <SectionTitle 
            title="Наши преподаватели" 
            subtitle="Познакомьтесь с нашими опытными специалистами, которые помогут вам в личностном росте"
            centered
          />
        </AnimatedElement>
        
        <AnimatedElement animation="fadeInUp" delay={0.3}>
          <TeacherCard>
            <TeacherImageContainer>
              <TeacherImage />
            </TeacherImageContainer>
            
            <TeacherInfo>
              <TeacherName>Гафарова Шамама</TeacherName>
              <TeacherTitle>Специалист по регрессивному гипнозу, НЛП-практик</TeacherTitle>
              
              <TabsContainer>
                <Tab 
                  active={activeTab === 'biography'} 
                  onClick={() => handleTabChange('biography')}
                >
                  Биография
                </Tab>
                <Tab 
                  active={activeTab === 'education'} 
                  onClick={() => handleTabChange('education')}
                >
                  Образование
                </Tab>
                <Tab 
                  active={activeTab === 'courses'} 
                  onClick={() => handleTabChange('courses')}
                >
                  Курсы
                </Tab>
              </TabsContainer>
              
              {activeTab === 'biography' && (
                <TabContent>
                  <p>
                    Гафарова Шамама — опытный специалист в области регрессивного гипноза и НЛП с более чем 10-летним стажем практики. 
                    Её уникальный подход сочетает в себе древние практики и современные техники, что позволяет достигать глубоких трансформаций 
                    в сознании клиентов. Шамама специализируется на работе с подсознанием, помогая людям раскрыть их внутренний потенциал и 
                    освободиться от ограничивающих убеждений.
                  </p>
                  <p>
                    На протяжении своей карьеры она помогла сотням людей преодолеть личностные кризисы, фобии, и другие психологические 
                    барьеры, мешающие полноценной и счастливой жизни. Её авторская методика регрессивной терапии признана эффективной 
                    при работе с травматическим опытом и подсознательными блоками.
                  </p>
                </TabContent>
              )}
              
              {activeTab === 'education' && (
                <TabContent>
                  <p>Профессиональное образование и квалификации:</p>
                  <QualificationsList>
                    <QualificationItem>Сертифицированный НЛП-практик и НЛП-мастер</QualificationItem>
                    <QualificationItem>Диплом по регрессивному гипнозу Международной Академии Регрессивной Терапии</QualificationItem>
                    <QualificationItem>Специалист по трансперсональной психологии</QualificationItem>
                    <QualificationItem>Мастер медитативных практик и техник расширения сознания</QualificationItem>
                    <QualificationItem>Сертификат по квантовому гипнозу</QualificationItem>
                    <QualificationItem>Диплом психолога-консультанта</QualificationItem>
                  </QualificationsList>
                </TabContent>
              )}
              
              {activeTab === 'courses' && (
                <TabContent>
                  <p>Авторские курсы и программы:</p>
                  <CoursesList>
                    <ExpandableCourse
                      title="НЛП Практик"
                      description="Интенсивный курс обучения нейро-лингвистическому программированию для личностного роста и развития коммуникативных навыков."
                      courseId={2}
                      isExpanded={expandedCourseId === 2}
                      toggleExpanded={toggleCourseExpanded}
                    />
                    <ExpandableCourse
                      title="Регрессия: Погружение в Память Души"
                      description="Глубокая работа с подсознанием для исцеления от прошлых травм и обретения глубинного понимания собственной сущности."
                      courseId={3}
                      isExpanded={expandedCourseId === 3}
                      toggleExpanded={toggleCourseExpanded}
                    />
                    <ExpandableCourse
                      title="Мастер-класс по самогипнозу"
                      description="Обучение техникам самогипноза для повседневного использования, снятия стресса и программирования подсознания."
                      courseId={1}
                      isExpanded={expandedCourseId === 1}
                      toggleExpanded={toggleCourseExpanded}
                    />
                  </CoursesList>
                </TabContent>
              )}
            </TeacherInfo>
          </TeacherCard>
        </AnimatedElement>
      </Container>
    </TeachersWrapper>
  );
};

export default TeachersSection; 
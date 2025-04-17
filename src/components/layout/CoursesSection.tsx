import React, { useState, useContext, createContext } from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import AnimatedElement from '../ui/AnimatedElement';
import { COURSES } from '../../data/constants';
import { CourseModule } from '../../types';
import media from '../../styles/media';
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaGem, FaBrain, FaStar, FaArrowUp, FaRegClock, FaCalendarAlt, FaGraduationCap, FaLaptop, FaCheck } from 'react-icons/fa';

// Создадим глобальный контекст для отслеживания состояния мобильного меню
export const MobileMenuContext = createContext<boolean>(false);

const CoursesSectionContainer = styled.section`
  padding: 8rem 0;
  background-color: #faf7f4;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #a66a42 0%, #d9b293 50%, #a66a42 100%);
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(217, 178, 147, 0.15) 0%, rgba(217, 178, 147, 0) 70%);
    top: -100px;
    right: -100px;
    z-index: 0;
  }
  
  ${media.md} {
    padding: 6rem 0;
  }
  
  ${media.sm} {
    padding: 5rem 0;
  }
`;

const CoursesPattern = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60%;
  background-image: radial-gradient(rgba(217, 178, 147, 0.1) 2px, transparent 2px);
  background-size: 30px 30px;
  z-index: 0;
  opacity: 0.5;
`;

const CoursesIntro = styled.div`
  text-align: center;
  max-width: 820px;
  margin: 0 auto 5rem;
  position: relative;
  z-index: 1;
`;

const CoursesTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 800;
  color: var(--color-primary-dark);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #a66a42, #d9b293);
  }
  
  ${media.md} {
    font-size: 2.8rem;
  }
  
  ${media.sm} {
    font-size: 2.4rem;
  }
`;

const CoursesSubtitle = styled.p`
  font-size: 1.3rem;
  color: var(--color-secondary);
  line-height: 1.7;
  font-weight: 300;
  margin-top: 2rem;
  
  ${media.md} {
    font-size: 1.15rem;
  }
  
  ${media.sm} {
    font-size: 1.1rem;
  }
`;

const CoursesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  justify-content: center;
  position: relative;
  z-index: 1;
  
  ${media.sm} {
    gap: 3rem;
  }
`;

const CourseCard = styled.div<{ highlighted?: boolean }>`
  width: 100%;
  max-width: 1000px;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  transform: translateY(0);
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
  }
  
  ${({ highlighted }) => highlighted && `
    border: 3px solid #d9b293;
    
    &:before {
      content: 'Популярный выбор';
      position: absolute;
      top: 1.5rem;
      right: 0;
      background: linear-gradient(90deg, #d9b293, #a66a42);
      color: white;
      padding: 0.6rem 1.5rem;
      font-weight: 600;
      font-size: 0.9rem;
      z-index: 5;
      border-radius: 6px 0 0 6px;
      box-shadow: -3px 4px 10px rgba(0, 0, 0, 0.15);
      
      ${media.sm} {
        top: 0;
        right: 0;
        border-radius: 0 0 0 6px;
        padding: 0.5rem 1.2rem;
        font-size: 0.8rem;
      }
      
      ${media.xs} {
        padding: 0.4rem 1rem;
        font-size: 0.75rem;
      }
    }
  `}
  
  ${media.md} {
    flex-direction: column;
  }
`;

const CourseHeader = styled.div`
  position: relative;
  padding: 3.5rem 3rem;
  background: linear-gradient(120deg, #d9b293, #a66a42);
  color: white;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0.3));
  }
  
  ${media.sm} {
    padding: 2.5rem 2rem;
  }
`;

const CourseTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  ${media.sm} {
    font-size: 2rem;
  }
`;

const CourseSubtitle = styled.p`
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  max-width: 80%;
  line-height: 1.6;
  
  ${media.sm} {
    max-width: 100%;
    font-size: 1.05rem;
  }
`;

const CourseHeaderIcon = styled.div`
  position: absolute;
  top: 3rem;
  right: 3rem;
  width: 90px;
  height: 90px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px dashed rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: rotateAnimation 20s linear infinite;
  }
  
  @keyframes rotateAnimation {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  svg {
    font-size: 2.8rem;
    color: white;
  }
  
  ${media.md} {
    top: 2.5rem;
    right: 2.5rem;
    width: 70px;
    height: 70px;
    
    svg {
      font-size: 2.2rem;
    }
  }
  
  ${media.sm} {
    display: none;
  }
`;

const CourseContent = styled.div`
  padding: 3.5rem 3rem;
  
  ${media.sm} {
    padding: 2.5rem 2rem;
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 3rem;
  
  ${media.md} {
    flex-direction: column;
    gap: 2.5rem;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  width: 380px;
  
  ${media.md} {
    width: 100%;
  }
`;

const CourseDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.9;
  color: var(--color-text);
  margin-bottom: 2.5rem;
  font-weight: 300;
  
  ${media.sm} {
    font-size: 1.1rem;
  }
`;

const CourseInfoCard = styled.div`
  background: linear-gradient(145deg, #f8f5f2, #fff);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #d9b293, #a66a42);
  }
  
  ${media.sm} {
    padding: 2rem;
  }
`;

const CourseInfoTitle = styled.h4`
  font-size: 1.4rem;
  color: var(--color-primary-dark);
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  font-weight: 600;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #d9b293, #a66a42);
  }
`;

const CourseInfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem;
`;

const CourseInfoItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
  
  svg {
    color: #d9b293;
    margin-right: 1.2rem;
    font-size: 1.4rem;
    flex-shrink: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: 1.05rem;
  color: var(--color-secondary);
  flex: 1;
`;

const InfoValue = styled.span`
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--color-primary-dark);
  text-align: right;
`;

const CourseButton = styled.a`
  display: block;
  width: 100%;
  padding: 1.3rem;
  background: linear-gradient(90deg, #d9b293, #a66a42);
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: 1.15rem;
  border-radius: 12px;
  transition: all 0.4s ease;
  box-shadow: 0 10px 20px rgba(169, 106, 66, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #a66a42, #7a4e30);
    z-index: -1;
    transition: opacity 0.5s ease;
    opacity: 0;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(169, 106, 66, 0.25);
    
    &:before {
      opacity: 1;
    }
  }
`;

const DetailsToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2.5rem auto 0;
  background: none;
  border: none;
  color: #a66a42;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  padding: 0.7rem 1.5rem;
  border-bottom: 1px dashed rgba(166, 106, 66, 0.3);
  
  svg {
    margin-left: 0.7rem;
    font-size: 0.9rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #d9b293;
    
    svg {
      transform: translateY(3px);
    }
  }
`;

const ExpandedDetails = styled.div<{ isExpanded: boolean }>`
  max-height: ${({ isExpanded }) => (isExpanded ? '2500px' : '0')};
  overflow: hidden;
  transition: max-height 0.8s ease, opacity 0.5s ease, margin-top 0.3s ease;
  opacity: ${({ isExpanded }) => (isExpanded ? '1' : '0')};
  margin-top: ${({ isExpanded }) => (isExpanded ? '2.5rem' : '0')};
`;

const ModulesList = styled.div`
  margin-bottom: 3.5rem;
`;

const ModuleItem = styled.div`
  margin-bottom: 1.8rem;
  padding: 1.8rem;
  background: #f8f5f2;
  border-radius: 14px;
  transition: all 0.4s ease;
  border-left: 5px solid #d9b293;
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
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.07);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ModuleTitle = styled.h5`
  font-size: 1.25rem;
  margin-bottom: 1.2rem;
  color: var(--color-primary-dark);
  display: flex;
  align-items: center;
  font-weight: 600;
  
  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #d9b293;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const ModuleContent = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text);
  padding-left: 25px;
`;

const ModuleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ModuleCheckbox = styled.div<{ completed: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ completed }) => completed ? '#58b368' : '#d9b293'};
  background: ${({ completed }) => completed ? '#58b368' : 'transparent'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 15px;
  flex-shrink: 0;
  
  svg {
    color: white;
    font-size: 0.9rem;
  }
`;

const ProgressContainer = styled.div`
  margin: 0 0 2rem 0;
  width: 100%;
  background: #f0e9e4;
  height: 8px;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background: linear-gradient(90deg, #d9b293, #a66a42);
  border-radius: 10px;
  transition: width 0.5s ease;
`;

const ProgressStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text);
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  color: #a66a42;
  cursor: pointer;
  margin-left: auto;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  
  &:hover {
    color: #d9b293;
    text-decoration: underline;
  }
  
  svg {
    margin-right: 5px;
    font-size: 0.8rem;
  }
`;

const DetailsSectionTitle = styled.h4`
  font-size: 1.5rem;
  color: var(--color-primary-dark);
  margin: 3rem 0 1.8rem;
  position: relative;
  padding-bottom: 1rem;
  font-weight: 600;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: #d9b293;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.8rem;
  
  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  background: #f8f5f2;
  border-radius: 14px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
  
  svg {
    color: #58b368;
    margin-right: 1.2rem;
    margin-top: 0.2rem;
    flex-shrink: 0;
    font-size: 1.2rem;
  }
`;

const BenefitText = styled.span`
  font-size: 1.05rem;
  color: var(--color-text);
  line-height: 1.7;
`;

const BackToTopButton = styled.a<{ isMenuOpen: boolean }>`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 55px;
  height: 55px;
  background: linear-gradient(135deg, #d9b293, #a66a42);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  z-index: 100;
  opacity: ${({ isMenuOpen }) => (isMenuOpen ? '0' : '1')};
  visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'hidden' : 'visible')};
  pointer-events: ${({ isMenuOpen }) => (isMenuOpen ? 'none' : 'all')};
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    border: 2px dashed rgba(217, 178, 147, 0.5);
    opacity: 0;
    transition: all 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
    
    &:before {
      opacity: 1;
      animation: rotateBackToTop 15s linear infinite;
    }
  }
  
  @keyframes rotateBackToTop {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  svg {
    font-size: 1.3rem;
  }
`;

interface CourseDetailsProps {
  id: number;
  isExpanded: boolean;
  toggleExpanded: (id: number) => void;
}

// Хук для сохранения прогресса модулей в localStorage
const useModuleProgress = (courseId: number) => {
  const storageKey = `course_${courseId}_progress`;
  
  const [completedModules, setCompletedModules] = React.useState<number[]>([]);
  
  // Загружаем данные только один раз при монтировании компонента
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedModules(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Ошибка при загрузке прогресса:', error);
    }
  }, [storageKey]);
  
  // Сохраняем данные при обновлении
  React.useEffect(() => {
    try {
      if (completedModules.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(completedModules));
      }
    } catch (error) {
      console.error('Ошибка при сохранении прогресса:', error);
    }
  }, [completedModules, storageKey]);
  
  const toggleModule = (moduleId: number) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };
  
  const resetProgress = () => {
    try {
      localStorage.removeItem(storageKey);
      setCompletedModules([]);
    } catch (error) {
      console.error('Ошибка при сбросе прогресса:', error);
    }
  };
  
  return { completedModules, toggleModule, resetProgress };
};

// Типы для анимированных компонентов
interface AnimatedModuleProps {
  module: CourseModule;
  index: number;
  isVisible: boolean;
  completedModules: number[];
  toggleModule: (id: number) => void;
}

interface AnimatedBenefitProps {
  benefit: string;
  index: number;
  isVisible: boolean;
}

// Компонент анимированного модуля с задержкой
const AnimatedModule: React.FC<AnimatedModuleProps> = ({ module, index, isVisible, completedModules, toggleModule }) => {
  const [isRendered, setIsRendered] = React.useState(false);
  
  React.useEffect(() => {
    // Добавляем задержку для поочередного появления
    const timer = setTimeout(() => {
      if (isVisible) {
        setIsRendered(true);
      }
    }, index * 100);
    
    return () => clearTimeout(timer);
  }, [isVisible, index]);
  
  return (
    <ModuleItem className={isRendered ? 'visible' : ''}>
      <ModuleHeader>
        <ModuleTitle>{module.title}</ModuleTitle>
        <ModuleCheckbox 
          completed={completedModules.includes(module.id)}
          onClick={(e) => {
            e.stopPropagation();
            toggleModule(module.id);
          }}
        >
          {completedModules.includes(module.id) && <FaCheck />}
        </ModuleCheckbox>
      </ModuleHeader>
      <ModuleContent>{module.content}</ModuleContent>
    </ModuleItem>
  );
};

// Компонент анимированного преимущества с задержкой
const AnimatedBenefit: React.FC<AnimatedBenefitProps> = ({ benefit, index, isVisible }) => {
  const [isRendered, setIsRendered] = React.useState(false);
  
  React.useEffect(() => {
    // Добавляем задержку для поочередного появления
    const timer = setTimeout(() => {
      if (isVisible) {
        setIsRendered(true);
      }
    }, index * 100);
    
    return () => clearTimeout(timer);
  }, [isVisible, index]);
  
  return (
    <BenefitItem className={isRendered ? 'visible' : ''}>
      <FaCheckCircle size={20} />
      <BenefitText>{benefit}</BenefitText>
    </BenefitItem>
  );
};

const CourseExpanded: React.FC<CourseDetailsProps> = ({ id, isExpanded, toggleExpanded }) => {
  const course = COURSES.find(c => c.id === id);
  const { completedModules, toggleModule, resetProgress } = useModuleProgress(id);
  const [isContentVisible, setIsContentVisible] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  // Управление видимостью контента с задержкой для анимации
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    try {
      if (isExpanded) {
        setIsContentVisible(true);
      } else {
        timer = setTimeout(() => {
          setIsContentVisible(false);
        }, 500); // Задержка, соответствующая времени анимации скрытия
      }
    } catch (err) {
      console.error('Ошибка при управлении анимацией:', err);
      // В случае ошибки просто показываем контент без анимации
      setIsContentVisible(isExpanded);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isExpanded]);
  
  if (!course) {
    console.error(`Курс с ID ${id} не найден`);
    return null;
  }
  
  // Безопасный расчет прогресса
  const progress = React.useMemo(() => {
    try {
      return course.modules && course.modules.length > 0 
        ? Math.round((completedModules.length / course.modules.length) * 100) 
        : 0;
    } catch (err) {
      console.error('Ошибка при расчете прогресса:', err);
      return 0;
    }
  }, [course.modules, completedModules]);
  
  // Безопасный обработчик сброса прогресса
  const handleResetProgress = (e: React.MouseEvent) => {
    try {
      e.stopPropagation();
      resetProgress();
    } catch (err) {
      console.error('Ошибка при сбросе прогресса:', err);
      setError('Не удалось сбросить прогресс. Пожалуйста, попробуйте позже.');
    }
  };
  
  return (
    <>
      <DetailsToggle onClick={() => toggleExpanded(id)}>
        {isExpanded ? 'Скрыть детали курса' : 'Показать программу курса'}
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </DetailsToggle>
      
      {error && (
        <div style={{ color: 'red', marginTop: '10px', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}
      
      <ExpandedDetails isExpanded={isExpanded}>
        {isContentVisible && (
          <>
            <DetailsSectionTitle>Программа курса</DetailsSectionTitle>
            
            <ProgressContainer>
              <ProgressStats>
                <span>Прогресс обучения</span>
                <span>{completedModules.length} из {course.modules?.length || 0} ({progress}%)</span>
              </ProgressStats>
              <ProgressBar progress={progress} />
              {completedModules.length > 0 && (
                <ResetButton onClick={handleResetProgress}>
                  <FaArrowUp style={{ transform: 'rotate(45deg)' }} />
                  Сбросить прогресс
                </ResetButton>
              )}
            </ProgressContainer>
            
            <ModulesList>
              {course.modules?.map((module, index) => (
                <AnimatedModule
                  key={module.id}
                  module={module}
                  index={index}
                  isVisible={isExpanded}
                  completedModules={completedModules}
                  toggleModule={toggleModule}
                />
              ))}
            </ModulesList>
            
            <DetailsSectionTitle>Чему вы научитесь</DetailsSectionTitle>
            <BenefitsGrid>
              {course.benefits?.map((benefit, index) => (
                <AnimatedBenefit
                  key={index}
                  benefit={benefit}
                  index={index}
                  isVisible={isExpanded}
                />
              ))}
            </BenefitsGrid>
          </>
        )}
      </ExpandedDetails>
    </>
  );
};

// Функция получения иконки для информации о курсе
const getInfoIcon = (iconName: string) => {
  switch (iconName) {
    case 'clock':
      return <FaRegClock />;
    case 'calendar':
      return <FaCalendarAlt />;
    case 'graduation':
      return <FaGraduationCap />;
    case 'laptop':
      return <FaLaptop />;
    default:
      return null;
  }
};

// Функция форматирования данных для отображения в карточке
const formatCourseData = (course: any) => {
  return [
    { icon: "clock", label: "Длительность", value: course.duration },
    { icon: "graduation", label: "Тип", value: course.type },
    { icon: "laptop", label: "Формат", value: course.format },
    { icon: "calendar", label: "Старт", value: course.nextStart }
  ];
};

const CoursesSection: React.FC = () => {
  const [expandedCourseId, setExpandedCourseId] = useState<number | null>(null);
  // Получим состояние мобильного меню из контекста
  const isMobileMenuOpen = useContext(MobileMenuContext);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Обработчик с предотвращением множественных кликов
  const toggleExpanded = (id: number) => {
    // Если идет загрузка, игнорируем клик
    if (isLoading) return;
    
    // Устанавливаем индикатор загрузки
    setIsLoading(true);
    
    // Эмулируем задержку загрузки данных
    setTimeout(() => {
      setExpandedCourseId(expandedCourseId === id ? null : id);
      setIsLoading(false);
    }, 100);
  };
  
  const getCourseIcon = (id: number) => {
    switch (id) {
      case 1:
        return <FaGem />;
      case 2:
        return <FaBrain />;
      default:
        return <FaStar />;
    }
  };
  
  return (
    <CoursesSectionContainer id="courses">
      <CoursesPattern />
      <Container>
        <AnimatedElement animation="fadeIn">
          <CoursesIntro>
            <CoursesTitle>Образовательные курсы</CoursesTitle>
            <CoursesSubtitle>
              Профессиональные программы обучения от дипломированного психолога с многолетним опытом
            </CoursesSubtitle>
          </CoursesIntro>
        </AnimatedElement>
        
        <CoursesWrapper>
          {COURSES.map((course, index) => (
            <AnimatedElement 
              key={course.id} 
              animation="fadeInUp" 
              delay={0.2 + index * 0.2}
            >
              <CourseCard highlighted={course.highlighted}>
                <CourseHeader>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseSubtitle>{course.subtitle}</CourseSubtitle>
                  <CourseHeaderIcon>
                    {getCourseIcon(course.id)}
                  </CourseHeaderIcon>
                </CourseHeader>
                
                <CourseContent>
                  <FlexRow>
                    <LeftColumn>
                      <CourseDescription>{course.description}</CourseDescription>
                      
                      <CourseExpanded 
                        id={course.id} 
                        isExpanded={expandedCourseId === course.id} 
                        toggleExpanded={toggleExpanded} 
                      />
                    </LeftColumn>
                    
                    <RightColumn>
                      <CourseInfoCard>
                        <CourseInfoTitle>Информация о курсе</CourseInfoTitle>
                        <CourseInfoList>
                          {formatCourseData(course).map((item, idx) => (
                            <CourseInfoItem key={idx}>
                              {getInfoIcon(item.icon)}
                              <InfoLabel>{item.label}:</InfoLabel>
                              <InfoValue>{item.value}</InfoValue>
                            </CourseInfoItem>
                          ))}
                        </CourseInfoList>
                        
                        <CourseButton href="#contact">
                          Записаться на курс • {course.price}
                        </CourseButton>
                      </CourseInfoCard>
                    </RightColumn>
                  </FlexRow>
                </CourseContent>
              </CourseCard>
            </AnimatedElement>
          ))}
        </CoursesWrapper>
      </Container>
      
      <BackToTopButton href="#courses" isMenuOpen={isMobileMenuOpen}>
        <FaArrowUp />
      </BackToTopButton>
    </CoursesSectionContainer>
  );
};

export default CoursesSection; 
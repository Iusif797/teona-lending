import React, { useState, useContext, createContext } from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import AnimatedElement from '../ui/AnimatedElement';
import { COURSES } from '../../data/constants';
import { CourseItem } from '../../types';
import media from '../../styles/media';
import { FaCheckCircle, FaGem, FaBrain, FaStar, FaArrowUp, FaRegClock, FaCalendarAlt, FaGraduationCap, FaLaptop, FaTimes, FaBookOpen } from 'react-icons/fa';

export const MobileMenuContext = createContext<boolean>(false);

const CoursesSectionContainer = styled.section`
  padding: 6rem 0;
  background-color: #fdfcfb;
  position: relative;
  overflow: hidden;
  
  ${media.md} {
    padding: 5rem 0;
  }
  
  ${media.sm} {
    padding: 4rem 0;
  }
`;


const CoursesIntro = styled.div`
  text-align: center;
  max-width: 820px;
  margin: 0 auto 5rem;
  position: relative;
  z-index: 1;
`;

const CoursesTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: #2c2420;
  margin-bottom: 1.2rem;
  letter-spacing: -0.02em;
  
  ${media.md} {
    font-size: 2.4rem;
  }
  
  ${media.sm} {
    font-size: 2rem;
  }
`;

const CoursesSubtitle = styled.p`
  font-size: 1.15rem;
  color: #6a5a50;
  line-height: 1.6;
  font-weight: 400;
  margin-top: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  ${media.sm} {
    font-size: 1rem;
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
  max-width: 980px;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0ebe6;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
  }

  ${({ highlighted }) => highlighted && `
    border: 1px solid #d9b293;
    box-shadow: 0 4px 25px rgba(217, 178, 147, 0.15);
  `}
  
  ${media.md} {
    flex-direction: column;
  }
`;

const CourseHeader = styled.div`
  padding: 3rem;
  background: white;
  border-bottom: 1px solid #f0ebe6;
  position: relative;
  
  ${media.sm} {
    padding: 2rem;
  }
`;

const CourseTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #2c2420;
  line-height: 1.3;
  letter-spacing: -0.01em;
  
  ${media.sm} {
    font-size: 1.75rem;
  }
`;

const CourseSubtitle = styled.p`
  font-size: 1.1rem;
  color: #8c7b70;
  margin-bottom: 0;
  max-width: 90%;
  line-height: 1.5;
  
  ${media.sm} {
    max-width: 100%;
    font-size: 1rem;
  }
`;

const CourseHeaderIcon = styled.div`
  position: absolute;
  top: 3rem;
  right: 3rem;
  color: #d9b293;
  opacity: 0.8;
  
  svg {
    font-size: 2.5rem;
  }
  
  ${media.md} {
    top: 2rem;
    right: 2rem;
    
    svg {
      font-size: 2rem;
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
  overflow: visible;
  
  ${media.md} {
    flex-direction: column;
    gap: 2.5rem;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  overflow: visible;
`;

const RightColumn = styled.div`
  width: 380px;
  
  ${media.md} {
    width: 100%;
  }
`;

const CourseDescription = styled.p`
  font-size: 1.15rem;
  line-height: 1.8;
  color: #4a403a;
  margin-bottom: 2.5rem;
  font-weight: 400;
  
  ${media.sm} {
    font-size: 1.05rem;
  }
`;

const CourseInfoCard = styled.div`
  background: #faf9f8;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #f0ebe6;
  
  ${media.sm} {
    padding: 1.5rem;
  }
`;

const CourseInfoTitle = styled.h4`
  font-size: 1.25rem;
  color: #2c2420;
  margin-bottom: 1.5rem;
  text-align: left;
  font-weight: 600;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6dfd9;
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
  padding: 1.2rem;
  background: #a66a42;
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #8c5a38;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(166, 106, 66, 0.2);
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  background: white;
  border: 1px solid #f0ebe6;
  border-radius: 12px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease;
  height: 100%;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
    transform: translateY(-3px);
  }
  
  svg {
    color: #58b368;
    margin-right: 1rem;
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

// Modal components with stunning animations
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.4s ease, visibility 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  ${media.sm} {
    padding: 1rem;
  }
`;

const ModalContainer = styled.div<{ isOpen: boolean }>`
  background: white;
  border-radius: 20px;
  max-width: 1100px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
  transform: ${({ isOpen }) => (isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(30px)')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
`;

const ModalHeader = styled.div`
  padding: 2rem 2.5rem;
  border-bottom: 1px solid #f0ebe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #fdfcfb 0%, #f8f5f2 100%);
  
  ${media.sm} {
    padding: 1.5rem;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: #2c2420;
  margin: 0;
  
  ${media.sm} {
    font-size: 1.3rem;
  }
`;

const ModalSubtitle = styled.p`
  font-size: 1rem;
  color: #8c7b70;
  margin: 0.3rem 0 0;
  
  ${media.sm} {
    font-size: 0.9rem;
  }
`;

const ModalCloseButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #e6dfd9;
  background: white;
  color: #6a5a50;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  &:hover {
    background: #a66a42;
    color: white;
    border-color: #a66a42;
    transform: rotate(90deg);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const ModalBody = styled.div`
  padding: 2.5rem;
  overflow-y: auto;
  flex: 1;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f8f5f2;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d9b293;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a66a42;
  }
  
  ${media.sm} {
    padding: 1.5rem;
  }
`;

const ModalSectionTitle = styled.h4`
  font-size: 1.3rem;
  color: #2c2420;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 24px;
    background: #a66a42;
    margin-right: 12px;
    border-radius: 2px;
  }
`;

const ModalModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  ${media.md} {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const ModalModuleCard = styled.div<{ delay: number }>`
  background: #fdfcfb;
  border: 1px solid #f0ebe6;
  border-radius: 16px;
  padding: 1.8rem;
  transition: all 0.3s ease;
  animation: modalModuleSlideIn 0.6s ease forwards;
  animation-delay: ${({ delay }) => delay}ms;
  opacity: 0;
  transform: translateY(20px);
  
  @keyframes modalModuleSlideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    transform: translateY(-3px);
  }
`;

const ModalModuleTitle = styled.h5`
  font-size: 1.15rem;
  color: #2c2420;
  margin-bottom: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #d9b293;
    border-radius: 50%;
    margin-right: 12px;
    flex-shrink: 0;
  }
`;

const ModalModuleContent = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: #4a403a;
  padding-left: 22px;
`;

const ProgramButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 1.2rem;
  background: white;
  border: 1px solid #a66a42;
  color: #a66a42;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: #a66a42;
    color: white;
    box-shadow: 0 5px 15px rgba(166, 106, 66, 0.2);
    transform: translateY(-2px);
  }
  
  svg {
    font-size: 1rem;
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const BackToTopButton = styled.button<{ isMenuOpen: boolean }>`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  background: white;
  color: #a66a42;
  border: 1px solid #f0ebe6;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  z-index: 100;
  opacity: ${({ isMenuOpen }) => (isMenuOpen ? '0' : '1')};
  visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'hidden' : 'visible')};
  pointer-events: ${({ isMenuOpen }) => (isMenuOpen ? 'none' : 'all')};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    background: #a66a42;
    color: white;
    border-color: #a66a42;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const LessonGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const StyledLessonTitle = styled.h6`
  font-size: 1.1rem;
  font-weight: 700;
  color: #a66a42;
  margin-bottom: 0.5rem;
  display: block;
`;

const LessonList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  list-style-type: none;
`;

const LessonItem = styled.li`
  position: relative;
  margin-bottom: 0.4rem;
  font-size: 1rem;
  
  &:before {
    content: '-';
    position: absolute;
    left: -1.2rem;
    color: #d9b293;
    font-weight: bold;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// Helper function to parse module content
const parseModuleContent = (content: string) => {
  const lines = content.split('\n');
  const groups: React.ReactElement[] = [];
  let currentTitle = '';
  let currentItems: string[] = [];
  let groupIndex = 0;

  const flushGroup = () => {
    if (currentTitle || currentItems.length > 0) {
      groups.push(
        <LessonGroup key={groupIndex++}>
          {currentTitle && <StyledLessonTitle>{currentTitle}</StyledLessonTitle>}
          {currentItems.length > 0 && (
            <LessonList>
              {currentItems.map((item, i) => (
                <LessonItem key={i}>{item}</LessonItem>
              ))}
            </LessonList>
          )}
        </LessonGroup>
      );
      currentTitle = '';
      currentItems = [];
    }
  };

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('•')) {
      flushGroup();
      currentTitle = trimmed.substring(1).trim();
    } else if (trimmed.startsWith('-')) {
      currentItems.push(trimmed.substring(1).trim());
    } else {
      // Handle lines that don't start with bullet points but might be part of previous context or standalone
      if (currentTitle && currentItems.length === 0) {
         // Maybe a continuation of title or a subtitle? Treat as title for now if no items yet
         currentTitle += ' ' + trimmed;
      } else if (currentItems.length > 0) {
         // Continuation of last item
         currentItems[currentItems.length - 1] += ' ' + trimmed;
      } else {
         // Standalone text, treat as title if we have nothing
         currentTitle = trimmed;
      }
    }
  });
  
  flushGroup();
  
  return groups;
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

// Спецпредложение: Идет набор
const SpecialOfferCard = styled.div`
  background: linear-gradient(135deg, #fdfcfb 0%, #f8f5f2 100%);
  border: 2px solid #d9b293;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(217, 178, 147, 0.15);
  
  ${media.md} {
    padding: 2rem;
    margin-bottom: 2.5rem;
  }
  
  ${media.sm} {
    padding: 1.5rem;
    margin-bottom: 2rem;
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

const SpecialOfferHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const SpecialOfferTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c2420;
  line-height: 1.3;
  margin: 0;
  
  ${media.md} {
    font-size: 1.6rem;
  }
  
  ${media.sm} {
    font-size: 1.4rem;
  }
`;

const SpecialOfferContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  ${media.md} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

const SpecialOfferDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a403a;
  margin: 0;
  flex: 1;
  
  ${media.sm} {
    font-size: 1rem;
  }
`;

const SpecialOfferButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: #a66a42;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: #8c5a38;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(166, 106, 66, 0.2);
  }
  
  ${media.sm} {
    width: 100%;
    font-size: 1rem;
  }
`;

const formatCourseData = (course: CourseItem) => {
  const nextStartValue = course.nextStart.replace('2024', '2025');

  return [
    { icon: "clock", label: "Длительность", value: course.duration },
    { icon: "graduation", label: "Тип", value: course.type },
    { icon: "laptop", label: "Формат", value: course.format },
    { icon: "calendar", label: "Старт", value: nextStartValue }
  ];
};

const CoursesSection: React.FC = () => {
  const [modalCourseId, setModalCourseId] = useState<number | null>(null);
  // Получим состояние мобильного меню из контекста
  const isMobileMenuOpen = useContext(MobileMenuContext);
  
  // Get the course for the modal
  const modalCourse = modalCourseId ? COURSES.find(c => c.id === modalCourseId) : null;
  
  // Handle opening modal
  const openModal = (id: number) => {
    setModalCourseId(id);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };
  
  // Handle closing modal
  const closeModal = () => {
    setModalCourseId(null);
    document.body.style.overflow = ''; // Restore scrolling
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
      <Container>
      {/* Pattern removed */}
        <AnimatedElement animation="fadeIn">
          <CoursesIntro>
            <CoursesTitle>Образовательные курсы</CoursesTitle>
            <CoursesSubtitle>
              Профессиональные программы обучения от дипломированного психолога с многолетним опытом
            </CoursesSubtitle>
          </CoursesIntro>
        </AnimatedElement>

        {/* Спецпредложение: Идет набор */}
        <AnimatedElement animation="fadeInUp" delay={0.1}>
          <SpecialOfferCard>
            <SpecialOfferHeader>
              <SpecialOfferTitle>Идет набор на курс по системным расстановкам (метод Б. Хеллингера)</SpecialOfferTitle>
            </SpecialOfferHeader>
            <SpecialOfferContent>
              <SpecialOfferDescription>
                Для тех, кто хочет глубже понимать причины жизненных трудностей клиентов и уверенно вести процессы: от запроса — к системной диагностике и мягким решениям.
              </SpecialOfferDescription>
              <SpecialOfferButton href="#contact-form">
                Оставить заявку
              </SpecialOfferButton>
            </SpecialOfferContent>
          </SpecialOfferCard>
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

                        <CourseButton href="#contact-form">
                          Записаться на курс • {course.price}
                        </CourseButton>
                        <ProgramButton onClick={() => openModal(course.id)}>
                          <FaBookOpen /> Программа курса
                        </ProgramButton>
                      </CourseInfoCard>
                    </RightColumn>
                  </FlexRow>
                </CourseContent>
              </CourseCard>
            </AnimatedElement>
          ))}
        </CoursesWrapper>
      </Container>

      {/* Program Modal */}
      <ModalOverlay isOpen={!!modalCourseId} onClick={closeModal}>
        <ModalContainer isOpen={!!modalCourseId} onClick={(e) => e.stopPropagation()}>
          {modalCourse && (
            <>
              <ModalHeader>
                <div>
                  <ModalTitle>Программа курса</ModalTitle>
                  <ModalSubtitle>{modalCourse.title}</ModalSubtitle>
                </div>
                <ModalCloseButton onClick={closeModal}>
                  <FaTimes />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <ModalSectionTitle>Модули курса</ModalSectionTitle>
                <ModalModulesGrid>
                  {modalCourse.modules?.map((module, index) => (
                    <ModalModuleCard key={module.id} delay={index * 100}>
                      <ModalModuleTitle>{module.title}</ModalModuleTitle>
                      <ModalModuleContent>
                        {parseModuleContent(module.content)}
                      </ModalModuleContent>
                    </ModalModuleCard>
                  ))}
                </ModalModulesGrid>
                
                {modalCourse.benefits && modalCourse.benefits.length > 0 && (
                  <>
                    <ModalSectionTitle style={{ marginTop: '2.5rem' }}>Чему вы научитесь</ModalSectionTitle>
                    <BenefitsGrid>
                      {modalCourse.benefits.map((benefit, index) => (
                        <BenefitItem key={index} className="visible">
                          <FaCheckCircle size={20} />
                          <BenefitText>{benefit}</BenefitText>
                        </BenefitItem>
                      ))}
                    </BenefitsGrid>
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContainer>
      </ModalOverlay>

      <BackToTopButton 
        isMenuOpen={isMobileMenuOpen}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Прокрутить наверх"
      >
        <FaArrowUp />
      </BackToTopButton>
    </CoursesSectionContainer>
  );
};

export default CoursesSection; 
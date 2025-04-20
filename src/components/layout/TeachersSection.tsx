import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import media from '../../styles/media';
import { FaGraduationCap, FaBook, FaUserAlt, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { COURSES } from '../../data/constants';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TeachersWrapper = styled.section`
  padding: 7rem 0 10rem;
  background: linear-gradient(180deg, var(--color-bg-alt) 0%, rgba(246, 242, 239, 0.8) 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(217,178,147,0.05)' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  ${media.md} {
    padding: 6rem 0 8rem;
  }

  ${media.sm} {
    padding: 5rem 0 6rem;
  }
`;

const TeacherGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  position: relative;
  z-index: 1;
`;

// Заголовок секции
const StyledSectionTitle = styled(SectionTitle)`
  margin-bottom: 4rem;
  
  h2 {
    position: relative;
    display: inline-block;
    color: var(--color-primary-dark);
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(217, 178, 147, 0.15);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
      border-radius: 10px;
    }
  }
  
  p {
    color: var(--color-text-light);
    font-size: 1.15rem;
    margin-top: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  ${media.md} {
    margin-bottom: 3rem;
  }
`;

// Фигурная декоративная форма для фона
const DecorativeShape = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 40% 60% 70% 30% / 40% 50% 50% 60%;
  background: linear-gradient(135deg, rgba(217, 178, 147, 0.05) 0%, rgba(217, 178, 147, 0.1) 100%);
  bottom: -300px;
  right: -250px;
  z-index: 0;
  animation: morph 15s linear infinite alternate;
  
  @keyframes morph {
    0% {
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    }
    100% {
      border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%;
    }
  }
  
  ${media.lg} {
    width: 400px;
    height: 400px;
    right: -150px;
    bottom: -200px;
  }
  
  ${media.sm} {
    display: none;
  }
`;

// Основная карточка преподавателя
const TeacherCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(217, 178, 147, 0.1),
    0 10px 30px -10px rgba(217, 178, 147, 0.2);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: perspective(1000px) rotateX(0deg);
  
  &:hover {
    transform: perspective(1000px) rotateX(2deg) translateY(-5px);
    box-shadow: 
      0 30px 60px -15px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(217, 178, 147, 0.15),
      0 15px 35px -10px rgba(217, 178, 147, 0.3);
  }
`;

// Хедер карточки с фото преподавателя
const CardHeader = styled.div`
  position: relative;
  height: 450px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 85%;
    background: linear-gradient(to top, 
      rgba(0, 0, 0, 0.9) 0%, 
      rgba(0, 0, 0, 0.8) 20%,
      rgba(0, 0, 0, 0.6) 40%, 
      rgba(0, 0, 0, 0.3) 70%,
      transparent 100%);
    z-index: 1;
  }
  
  ${media.md} {
    height: 400px;
  }
  
  ${media.sm} {
    height: 350px;
  }
`;

const CardHeaderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/teacher.jpg');
  background-size: cover;
  background-position: center 20%;
  transition: transform 0.8s ease;
  filter: saturate(1.05);
  
  ${TeacherCard}:hover & {
    transform: scale(1.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(0, 0, 0, 0.2) 0%, 
      rgba(0, 0, 0, 0) 40%);
  }
`;

const TeacherInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2.5rem;
  z-index: 2;
  color: white;
`;

const TeacherName = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 0, 0, 0.4);
  letter-spacing: -0.5px;
  line-height: 1.2;
  color: white;
  
  background: linear-gradient(to right, rgba(0, 0, 0, 0.5), transparent);
  padding: 0.5rem;
  border-radius: 8px;
  display: inline-block;
  
  ${media.md} {
    font-size: 2.6rem;
  }
  
  ${media.sm} {
    font-size: 2.2rem;
  }
`;

const TeacherTitle = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  opacity: 0.95;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  max-width: 90%;
  
  ${media.md} {
    font-size: 1.2rem;
  }
  
  ${media.sm} {
    font-size: 1.1rem;
  }
`;

// Тело карточки с табами и контентом
const CardBody = styled.div`
  padding: 0;
  flex: 1;
`;

// Контейнер для табов навигации
const TabContainer = styled.div`
  display: flex;
  padding: 0;
  background: white;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  z-index: 2;
  
  ${media.sm} {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TabItem = styled.button<{ active: boolean }>`
  flex: 1;
  background: ${props => props.active ? 'var(--color-bg-alt)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-primary-dark)' : 'var(--color-text-light)'};
  padding: 1.5rem 1rem;
  font-size: 1.1rem;
  font-weight: ${props => props.active ? '600' : '500'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
    transform: scaleX(${props => props.active ? 1 : 0});
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--color-primary);
    background: ${props => props.active ? 'var(--color-bg-alt)' : 'rgba(246, 242, 239, 0.5)'};
    
    &::before {
      transform: scaleX(1);
      background: var(--color-primary-light);
    }
  }
  
  ${media.sm} {
    padding: 1.2rem 0.8rem;
    font-size: 1rem;
    min-width: 120px;
  }
`;

const TabIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;

// Контент табов
const TabContent = styled.div`
  padding: 2.5rem;
  line-height: 1.8;
  color: var(--color-text);
  max-height: 520px;
  overflow-y: auto;
  
  /* Стилизация скроллбара */
  scrollbar-width: thin;
  scrollbar-color: rgba(217, 178, 147, 0.5) rgba(0, 0, 0, 0.05);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(217, 178, 147, 0.5);
    border-radius: 10px;
  }
  
  p {
    margin-bottom: 1.2rem;
    font-size: 1.05rem;
  }
  
  ${media.md} {
    padding: 2rem;
    max-height: 450px;
  }
  
  ${media.sm} {
    padding: 1.5rem;
    font-size: 0.95rem;
    
    p {
      font-size: 1rem;
    }
  }
`;

// Стили для разделов внутри контента
const ContentSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeading = styled.h4`
  font-size: 1.3rem;
  color: var(--color-primary-dark);
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  position: relative;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: var(--color-primary);
    border-radius: 2px;
  }
  
  ${media.sm} {
    font-size: 1.2rem;
  }
`;

// Списки в контенте
const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 1.2rem;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-primary);
    transform: translateY(-50%);
  }
  
  strong {
    display: block;
    margin-bottom: 0.3rem;
    color: var(--color-text);
  }
  
  ul {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  li {
    padding-left: 1rem;
    margin-bottom: 0.5rem;
    position: relative;
    
    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--color-primary-light);
    }
  }
  
  ${media.sm} {
    font-size: 0.95rem;
  }
`;

// Сетка курсов
const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  
  & > * {
    height: 100%;
  }
`;

// Стили для карточек курсов и кнопок
const CourseToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--color-bg-alt);
  border: 1px solid rgba(217, 178, 147, 0.3);
  color: var(--color-primary);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1.2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background: var(--color-primary-light);
    color: white;
  }
  
  svg {
    transition: transform 0.3s ease;
    font-size: 0.8rem;
  }
`;

// Карточка курса
const CourseCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    
    ${CourseToggle} {
      background: var(--color-primary);
      color: white;
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(217, 178, 147, 0.3);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 4px;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-primary-light));
    opacity: 0.8;
  }
`;

const CourseContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const CourseTitle = styled.h5`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.8rem;
  
  ${media.sm} {
    font-size: 1.1rem;
  }
`;

const CourseDescription = styled.p`
  font-size: 0.95rem;
  color: var(--color-text-light);
  line-height: 1.6;
  flex-grow: 1;
`;

const CourseInfo = styled.div`
  margin-bottom: 1rem;
`;

const ModulesList = styled.div`
  margin-bottom: 1.5rem;
`;

const ModuleTitle = styled.h6`
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-primary);
  }
  
  ${media.sm} {
    font-size: 1rem;
  }
`;

const ModuleContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-light);
  margin-left: 1rem;
  margin-bottom: 1.2rem;
  padding-left: 0.8rem;
  border-left: 1px solid rgba(217, 178, 147, 0.3);
`;

// Вспомогательные функции

// Форматирование контента модуля
const formatModuleContent = (content: string) => {
  if (!content) return '';
  
  // Разделяем текст на параграфы по переносу строки
  const paragraphs = content.split('\n');
  
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  );
};

// Курсовой поп-ап (модальное окно)
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* Стилизация скроллбара */
  scrollbar-width: thin;
  scrollbar-color: rgba(217, 178, 147, 0.5) rgba(0, 0, 0, 0.05);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(217, 178, 147, 0.5);
    border-radius: 10px;
  }
`;

const ModalHeader = styled.div`
  background: var(--color-bg-alt);
  padding: 2rem;
  border-bottom: 1px solid rgba(217, 178, 147, 0.2);
  position: sticky;
  top: 0;
  z-index: 2;
  
  ${media.sm} {
    padding: 1.5rem;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
  
  ${media.sm} {
    padding: 1.5rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--color-primary);
  }
`;

const ModalTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  margin-bottom: 0.5rem;
  padding-right: 2rem;
  
  ${media.sm} {
    font-size: 1.6rem;
  }
`;

const ModalSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--color-text-light);
  line-height: 1.5;
  
  ${media.sm} {
    font-size: 1rem;
  }
`;

const ModalDivider = styled.div`
  height: 2px;
  background: linear-gradient(to right, var(--color-primary-light), transparent);
  margin: 1.5rem 0;
`;

// Компонент для модального окна с деталями курса
const CourseModal = ({ course, isOpen, onClose }: { 
  course: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Обработчик клика вне модального окна
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  // Обработчик нажатия Escape
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = ''; // Возвращаем прокрутку при закрытии
    };
  }, [isOpen, onClose]);
  
  if (!course) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClickOutside}
        >
          <ModalContent
            ref={modalRef}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
            }}
          >
            <ModalHeader>
              <ModalTitle>{course.title}</ModalTitle>
              <ModalSubtitle>{course.description}</ModalSubtitle>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>
            
            <ModalBody>
              {course.modules?.length > 0 && (
                <>
                  <SectionHeading>Программа курса</SectionHeading>
                  <ModulesList>
                    {course.modules.map((module: any) => (
                      <div key={module.id}>
                        <ModuleTitle>{module.title}</ModuleTitle>
                        <ModuleContent>
                          {formatModuleContent(module.content)}
                        </ModuleContent>
                      </div>
                    ))}
                  </ModulesList>
                  <ModalDivider />
                </>
              )}
              
              {course.benefits && course.benefits.length > 0 && (
                <>
                  <SectionHeading>Чему вы научитесь</SectionHeading>
                  <StyledList>
                    {course.benefits.map((benefit: string, index: number) => (
                      <ListItem key={index}>{benefit}</ListItem>
                    ))}
                  </StyledList>
                </>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

// Основной компонент раздела
const TeachersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('biography');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleOpenCourseModal = (courseId: number) => {
    const course = COURSES.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  // Массив с данными о преподаваемых курсах для отображения в табе "Курсы"
  const teacherCourses = [
    {
      id: 1,
      title: "Арт‑терапия",
      description: "Практические занятия с использованием изобразительных техник для проработки эмоциональных блоков."
    },
    {
      id: 2,
      title: "МАК‑терапия",
      description: "Глубинные методики через мета‑ассоциативные карты для выявления бессознательных установок."
    },
    {
      id: 3,
      title: "Кризисная психология",
      description: "Теория и практика экстренной психологической помощи: работа с острыми стрессами, травмой и кризисами."
    },
    {
      id: 4,
      title: "Навыки консультирования",
      description: "Базовые и продвинутые техники эффективного психологического интервью и активного слушания."
    },
    {
      id: 5,
      title: "Аддикции в психологии",
      description: "Теория и практика работы с различными видами зависимостей, превентивные и восстановительные стратегии."
    },
    {
      id: 6,
      title: "Созависимые отношения",
      description: "Диагностика и коррекция паттернов, позволяющих партнёрам стать опорой друг для друга, не теряя себя."
    },
    {
      id: 7,
      title: "Основы игропрактики",
      description: "Введение в игровые форматы для развития гибкости, креативности и ресурсности."
    }
  ];

  return (
    <TeachersWrapper id="teachers">
      <Container>
        <AnimatedElement animation="fadeIn">
          <StyledSectionTitle 
            title="Наши преподаватели" 
            subtitle="Познакомьтесь с нашими опытными специалистами"
            centered={true}
          />
        </AnimatedElement>
        
        <TeacherGrid>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
          >
            <TeacherCard>
              <CardHeader>
                <CardHeaderImage />
                <TeacherInfo>
                  <TeacherName>Гафарова Шамама</TeacherName>
                  <TeacherTitle>Социальный и кризисный психолог, игропрактик</TeacherTitle>
                </TeacherInfo>
              </CardHeader>
              
              <CardBody>
                <TabContainer>
                  <TabItem 
                    active={activeTab === 'biography'} 
                    onClick={() => handleTabChange('biography')}
                  >
                    <TabIcon><FaUserAlt /></TabIcon> Биография
                  </TabItem>
                  <TabItem 
                    active={activeTab === 'education'} 
                    onClick={() => handleTabChange('education')}
                  >
                    <TabIcon><FaGraduationCap /></TabIcon> Образование
                  </TabItem>
                  <TabItem 
                    active={activeTab === 'courses'} 
                    onClick={() => handleTabChange('courses')}
                  >
                    <TabIcon><FaBook /></TabIcon> Курсы
                  </TabItem>
                </TabContainer>
                
                {activeTab === 'biography' && (
                  <TabContent>
                    <p>
                      Шамама Гафарова — социальный и кризисный психолог с многолетним опытом, специализирующийся на работе с зависимостями, семейными кризисами и личностными трансформациями. Её уникальное сочетание клинического опыта и творческого подхода позволяет находить эффективные решения в самых сложных ситуациях.
                    </p>
                    <p>
                      В реабилитационном центре «Qurtuluş Reabilitasiya Mərkəzi» Шамама оказывает экстренную психологическую помощь семьям зависимых, помогая им выстраивать ресурсные стратегии и восстанавливать гармонию в отношениях. Одновременно она активно внедряет игровые методики: «Кубок Оскара», «Риторический покер», «Хочу–Могу–Буду», «Порномания» и др., охватывающие все сферы личной и семейной жизни.
                    </p>
                    
                    <ContentSection>
                      <SectionHeading>Профессиональный опыт</SectionHeading>
                      <StyledList>
                        <ListItem>
                          <strong>Кризисный психолог, реабилитационный центр «Qurtuluş Reabilitasiya Mərkəzi»:</strong>
                          <ul>
                            <li>Индивидуальные и семейные сессии с родственниками зависимых;</li>
                            <li>Групповая терапия и супервизии для специалистов центра;</li>
                            <li>Разработка и ведение программ реструктуризации семейных систем.</li>
                          </ul>
                        </ListItem>
                        <ListItem>
                          <strong>Социальный психолог:</strong>
                          <ul>
                            <li>Проведение исследований и оценка социальных факторов, влияющих на процессы реабилитации;</li>
                            <li>Консультирование НКО и общественных инициатив по выстраиванию поддерживающих сообществ.</li>
                          </ul>
                        </ListItem>
                      </StyledList>
                    </ContentSection>
                    
                    <ContentSection>
                      <SectionHeading>Игровые методики</SectionHeading>
                      <StyledList>
                        <ListItem>Кубок Оскара — ролевая игра на признание личных достижений и поддержку межличностного взаимодействия.</ListItem>
                        <ListItem>Риторический покер — упражнение для тренировки навыков аргументации и убеждения.</ListItem>
                        <ListItem>Хочу–Могу–Буду — формирование чёткого плана действий и повышение мотивации.</ListItem>
                        <ListItem>Порномания — безопасное пространство для обсуждения интимных тем и работы с телесными установками.</ListItem>
                        <ListItem>И многие другие динамичные практики, адаптируемые под запросы группы или семьи.</ListItem>
                      </StyledList>
                    </ContentSection>
                  </TabContent>
                )}
                
                {activeTab === 'education' && (
                  <TabContent>
                    <ContentSection>
                      <SectionHeading>Образование и квалификации</SectionHeading>
                      <StyledList>
                        <ListItem>Дипломированный психолог, специальность «Социальная психология».</ListItem>
                        <ListItem>Сертификация по кризисной психологии и работе с химической зависимостью.</ListItem>
                        <ListItem>Квалификация преподавателя по арт‑терапии и МАК‑терапии.</ListItem>
                        <ListItem>Профессиональная подготовка по аддиктологии, созависимым отношениям и консультированию.</ListItem>
                      </StyledList>
                    </ContentSection>
                  </TabContent>
                )}
                
                {activeTab === 'courses' && (
                  <TabContent>
                    <ContentSection>
                      <SectionHeading>Преподаваемые курсы</SectionHeading>
                      <CoursesGrid>
                        {teacherCourses.map(course => (
                          <CourseCard 
                            key={course.id}
                            onClick={() => handleOpenCourseModal(course.id)}
                          >
                            <CourseContent>
                              <CourseInfo>
                                <CourseTitle>{course.title}</CourseTitle>
                                <CourseDescription>{course.description}</CourseDescription>
                              </CourseInfo>
                              <CourseToggle>
                                Подробнее о курсе <FaInfoCircle />
                              </CourseToggle>
                            </CourseContent>
                          </CourseCard>
                        ))}
                      </CoursesGrid>
                    </ContentSection>
                  </TabContent>
                )}
              </CardBody>
            </TeacherCard>
          </motion.div>
        </TeacherGrid>
        
        <DecorativeShape />
      </Container>
      
      {/* Модальное окно с деталями курса */}
      <CourseModal 
        course={selectedCourse} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </TeachersWrapper>
  );
};

export default TeachersSection; 
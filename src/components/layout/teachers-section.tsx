import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import media from '../../styles/media';
import { FaGraduationCap, FaBook, FaUserAlt, FaTimes, FaInfoCircle, FaIdCard, FaArrowDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TeachersWrapper = styled.section`
  padding: 8rem 0;
  background-color: var(--color-background);
  position: relative;
  overflow: hidden;

  ${media.md} {
    padding: 7rem 0;
  }

  ${media.sm} {
    padding: 6rem 0;
  }
  
  ${media.xs} {
    padding: 5rem 0;
  }
`;

const TeacherGrid = styled.div`
  position: relative;
  z-index: 2;
  margin-top: 1rem;
  
  ${media.sm} {
    margin-top: 0.5rem;
  }
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(217, 178, 147, 0.15), rgba(217, 178, 147, 0.05));
    top: 10%;
    left: -150px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(217, 178, 147, 0.1), rgba(217, 178, 147, 0.03));
    bottom: 15%;
    right: -120px;
  }
  
  ${media.sm} {
    &::before {
      width: 200px;
      height: 200px;
      top: 5%;
      left: -100px;
    }
    
    &::after {
      width: 180px;
      height: 180px;
      bottom: 10%;
      right: -90px;
    }
  }
`;

// Основная карточка преподавателя - минималистичный вариант для десктопа
const TeacherCard = styled(motion.div)`
  width: 100%;
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  ${media.sm} {
    border-radius: 16px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  }
`;

const CardBody = styled.div`
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  ${media.md} {
    padding: 1.75rem;
  }
  
  ${media.sm} {
    padding: 1.5rem;
  }
  
  ${media.xs} {
    padding: 1.25rem;
  }
`;

// Хедер карточки с фото только для мобильной версии
const CardHeader = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
  display: none; // Скрываем на десктопе
  
  ${media.sm} {
    display: block; // Показываем только на мобильных
    height: 260px;
  }
  
  ${media.xs} {
    height: 240px;
  }
`;

// Компоненты для мобильных фотографий
const CardHeaderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  filter: brightness(0.95);
  transition: transform 0.5s ease;
`;

// Специальные компоненты для разных преподавателей
const ShamamaCardHeaderImg = styled(CardHeaderImg)`
  object-position: center 25%;
`;

const DinarCardHeaderImg = styled(CardHeaderImg)`
  object-position: center 20%;
`;

const JuliaCardHeaderImg = styled(CardHeaderImg)`
  object-position: center 30%;
`;

const InaraCardHeaderImg = styled(CardHeaderImg)`
  object-position: center 25%;
`;

// Информация внизу фото (только для мобильных)
const TeacherInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 100%);
  color: white;
  
  ${media.sm} {
    padding: 1.25rem;
    text-align: center;
  }
`;

// Заголовок для десктопной версии (без фото)
const DesktopTeacherName = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: 0.5rem;
  text-align: center;
  
  ${media.md} {
    font-size: 2rem;
  }
  
  ${media.sm} {
    display: none; // Скрываем на мобильных
  }
`;

// Должность для десктопной версии
const DesktopTeacherTitle = styled.p`
  font-size: 1.1rem;
  color: var(--color-text-light);
  margin-bottom: 1.8rem;
  text-align: center;
  
  ${media.md} {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  ${media.sm} {
    display: none; // Скрываем на мобильных
  }
`;

// Мобильная версия для имени и должности
const TeacherName = styled.h3`
    font-size: 2rem;
  font-weight: 600;
  color: white;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: none; // Скрываем на десктопе
  
  ${media.sm} {
    display: block; // Показываем на мобильных
    font-size: 1.6rem;
    text-align: center;
  }
  
  ${media.xs} {
    font-size: 1.5rem;
  }
`;

const TeacherTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
  display: none; // Скрываем на десктопе
  
  ${media.sm} {
    display: block; // Показываем на мобильных
    font-size: 0.95rem;
    text-align: center;
  }
  
  ${media.xs} {
    font-size: 0.9rem;
  }
`;

// Тело карточки с табами и контентом
const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  
  ${media.sm} {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-bottom: 1.25rem;
    padding-bottom: 2px;
    justify-content: center; /* Изменено с flex-start на center */
    gap: 0.8rem;
    
    &::-webkit-scrollbar {
      height: 2px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 10px;
    }
  }
`;

const TabItem = styled.button<{ active: boolean }>`
  padding: 0.8rem 1.2rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: ${props => (props.active ? '600' : '400')};
  color: ${props => (props.active ? 'var(--color-primary)' : '#666')};
  border-bottom: 2px solid ${props => (props.active ? 'var(--color-primary)' : 'transparent')};
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  
  &:hover {
    color: var(--color-primary);
  }
  
  ${media.md} {
    padding: 0.7rem 1rem;
    font-size: 0.95rem;
  }
  
  ${media.sm} {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
    flex: none;
    min-width: auto;
  }
  
  ${media.xs} {
    padding: 0.5rem 0.7rem;
    font-size: 0.85rem;
    min-width: auto;
  }
`;

const TabIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
  
  ${media.sm} {
    margin-bottom: 0;
    font-size: 1rem;
  }
`;

// Контент табов
const TabContent = styled.div`
  padding: 1.5rem 1rem;
  line-height: 1.7;
  color: var(--color-text);
  max-height: 480px;
  overflow-y: auto;
  text-align: center;
  
  /* Стилизация скроллбара */
  scrollbar-width: thin;
  scrollbar-color: rgba(217, 178, 147, 0.4) rgba(0, 0, 0, 0.04);
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.04);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(217, 178, 147, 0.4);
    border-radius: 10px;
  }
  
  p {
    margin-bottom: 1.2rem;
    font-size: 1rem;
    text-align: center;
  }
  
  ${media.md} {
    padding: 1.25rem 0.8rem;
    max-height: 450px;
  }
  
  ${media.sm} {
    padding: 1rem 0.6rem;
    max-height: 420px;
  }
  
  ${media.xs} {
    padding: 1rem 0.4rem;
    max-height: 400px;
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
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  width: 100%;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
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
  margin: 0 auto;
  text-align: center;
  max-width: 90%;
`;

const ListItem = styled.li`
  margin-bottom: 1.2rem;
  padding-left: 0;
  position: relative;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: -0.8rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-primary);
    transform: translateX(-50%);
    display: block;
    margin: 0 auto 0.5rem;
  }
  
  strong {
    display: block;
    margin-bottom: 0.3rem;
    color: var(--color-text);
  }
  
  ul {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding-left: 0;
    text-align: center;
  }
  
  li {
    padding-left: 0;
    margin-bottom: 0.5rem;
    position: relative;
    
    &::before {
      content: '•';
      display: inline-block;
      margin-right: 0.3rem;
      color: var(--color-primary-light);
      position: static;
    }
  }
  
  ${media.sm} {
    font-size: 0.95rem;
  }
`;

// Сетка курсов
const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-content: center;
  margin: 0 auto;
  max-width: 1050px;
  
  ${media.lg} {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  ${media.md} {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }
  
  ${media.sm} {
    grid-template-columns: minmax(260px, 1fr);
    gap: 1.5rem;
  }
  
  ${media.xs} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
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
  margin-top: 0.8rem;
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

// Добавляем анимацию для стрелки вниз
const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(5px);
  }
  60% {
    transform: translateY(3px);
  }
`;

// Кнопка для записи на курс
const EnrollButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--color-primary);
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 0.8rem;
  border: none;
  box-shadow: 0 4px 10px rgba(217, 178, 147, 0.3);
  
  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(217, 178, 147, 0.4);
  }
  
  svg {
    font-size: 1rem;
    animation: ${bounceAnimation} 2s infinite;
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
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 6px;
    width: 100%;
    background: linear-gradient(to right, var(--color-primary-light), var(--color-primary));
    opacity: 0.8;
  }
  
  &:nth-child(2)::after {
    background: linear-gradient(to right, #A9CCE3, #5DADE2);
  }
  
  &:nth-child(3)::after {
    background: linear-gradient(to right, #D7BDE2, #9B59B6);
  }
`;

const CourseContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  text-align: center;
`;

const CourseInfo = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.2rem; /* Добавляем отступ сверху, чтобы цена не перекрывала текст */
`;

const CourseTitle = styled.h5`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.8rem;
  text-align: center;
  
  ${media.sm} {
    font-size: 1.1rem;
  }
`;

const CourseDescription = styled.p`
  font-size: 0.95rem;
  color: var(--color-text-light);
  line-height: 1.6;
  flex-grow: 1;
  text-align: center;
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
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  
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
  margin-left: 0;
  margin-bottom: 1.2rem;
  padding-left: 0;
  text-align: center;
  border-left: none;
`;

// Стили для модального окна и карточек
const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CoursePrice = styled.div`
  background: var(--color-primary-light);
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 4px 10px rgba(217, 178, 147, 0.3);
`;

const CourseDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
  background: rgba(246, 242, 239, 0.5);
  padding: 1.5rem;
  border-radius: 12px;
  
  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  color: var(--color-text-light);
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 1rem;
  color: var(--color-text);
  font-weight: 600;
`;

const CourseAudience = styled.div`
  background: rgba(217, 178, 147, 0.1);
  padding: 1.2rem;
  border-radius: 12px;
  border-left: 4px solid var(--color-primary);
  margin-bottom: 1.5rem;
  
  h5 {
    font-size: 1.1rem;
    color: var(--color-primary-dark);
    margin-bottom: 0.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
    color: var(--color-text);
  }
`;

const CourseBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--color-primary);
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  z-index: 5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
              <CourseHeader>
                <div>
                  <ModalTitle>{course.title}</ModalTitle>
                  <ModalSubtitle>{course.description}</ModalSubtitle>
                </div>
                {course.price && <CoursePrice>{course.price}</CoursePrice>}
              </CourseHeader>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>
            
            <ModalBody>
              {course.fullDescription && (
                <p>{course.fullDescription}</p>
              )}
              
              {(course.duration || course.type || course.format || course.nextStart || course.certificate) && (
                <CourseDetails>
                  {course.duration && (
                    <DetailItem>
                      <DetailLabel>Срок обучения:</DetailLabel>
                      <DetailValue>{course.duration}</DetailValue>
                    </DetailItem>
                  )}
                  {course.type && (
                    <DetailItem>
                      <DetailLabel>Тип обучения:</DetailLabel>
                      <DetailValue>{course.type}</DetailValue>
                    </DetailItem>
                  )}
                  {course.format && (
                    <DetailItem>
                      <DetailLabel>Форма обучения:</DetailLabel>
                      <DetailValue>{course.format}</DetailValue>
                    </DetailItem>
                  )}
                  {course.nextStart && (
                    <DetailItem>
                      <DetailLabel>Ближайший старт:</DetailLabel>
                      <DetailValue>{course.nextStart}</DetailValue>
                    </DetailItem>
                  )}
                  {course.certificate && (
                    <DetailItem>
                      <DetailLabel>Документ по окончанию:</DetailLabel>
                      <DetailValue>{course.certificate}</DetailValue>
                    </DetailItem>
                  )}
                </CourseDetails>
              )}
              
              {course.audience && (
                <CourseAudience>
                  <h5><FaInfoCircle /> Для кого подойдет курс:</h5>
                  <p>{course.audience}</p>
                </CourseAudience>
              )}
              
              {course.process && (
                <>
                  <SectionHeading>Как проходит обучение</SectionHeading>
                  <p>{course.process}</p>
                </>
              )}
              
              {course.program && Array.isArray(course.program) && (
                <>
                  <SectionHeading>Что входит в программу обучения</SectionHeading>
                  <StyledList>
                    {course.program.map((item: string, index: number) => (
                      <ListItem key={index}>{item}</ListItem>
                    ))}
                  </StyledList>
                  <ModalDivider />
                </>
              )}
              
              {course.program && typeof course.program === 'string' && (
                <>
                  <SectionHeading>Программа обучения</SectionHeading>
                  <p>{course.program}</p>
                  <ModalDivider />
                </>
              )}
              
              {course.modules?.length > 0 && (
                <>
                  <SectionHeading>Модули курса</SectionHeading>
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
                  <ModalDivider />
                </>
              )}
              
              {course.results && course.results.length > 0 && (
                <>
                  <SectionHeading>По итогу курса</SectionHeading>
                  <StyledList>
                    {course.results.map((result: string, index: number) => (
                      <ListItem key={index}>{result}</ListItem>
                    ))}
                  </StyledList>
                  <ModalDivider />
                </>
              )}
              
              {course.teacher && (
                <>
                  <SectionHeading>Преподаватель курса</SectionHeading>
                  <p style={{ lineHeight: '1.7', color: 'var(--color-text)' }}>{course.teacher}</p>
                </>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

// Добавляем стили для аватаров
const TeachersAvatarsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
  
  ${media.sm} {
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    padding: 0 10px;
  }
  
  ${media.xs} {
    flex-wrap: wrap;
    gap: 1.2rem;
    padding: 0 15px;
  }
  
  ${media.xxs} {
    gap: 1rem;
    padding: 0 10px;
  }
`;

const AvatarWrapper = styled.div<{ isActive: boolean }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: ${({ isActive }) => 
    isActive 
      ? '0 0 0 3px var(--color-primary), 0 12px 25px rgba(0, 0, 0, 0.18)' 
      : '0 5px 15px rgba(0, 0, 0, 0.08)'};
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: ${({ isActive }) => isActive ? 'scale(1.12)' : 'scale(1)'};
  
  &:hover {
    transform: ${({ isActive }) => isActive ? 'scale(1.12)' : 'scale(1.05)'};
    box-shadow: ${({ isActive }) => 
      isActive 
        ? '0 0 0 3px var(--color-primary), 0 12px 25px rgba(0, 0, 0, 0.18)' 
        : '0 8px 20px rgba(0, 0, 0, 0.12)'};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
    opacity: ${({ isActive }) => isActive ? '1' : '0.7'};
    transition: opacity 0.3s ease;
  }
  
  ${media.md} {
    width: 130px;
    height: 130px;
  }
  
  ${media.sm} {
    width: 110px;
    height: 110px;
  }
  
  ${media.xs} {
    width: 90px;
    height: 90px;
  }
  
  ${media.xxs} {
    width: 80px;
    height: 80px;
  }
`;

const AvatarImage = styled.img<{ isSecondTeacher?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${props => props.isSecondTeacher ? 'center 30%' : 'center center'};
  transition: transform 0.5s ease;
  
  ${AvatarWrapper}:hover & {
    transform: scale(1.08);
  }
  
  ${AvatarWrapper}[isActive="true"] & {
    filter: brightness(1.05);
  }
`;

const AvatarName = styled.p`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  z-index: 2;
  padding: 0 0.5rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  
  ${media.sm} {
    font-size: 0.9rem;
    bottom: 8px;
  }
  
  ${media.xxs} {
    font-size: 0.8rem;
    bottom: 6px;
  }
`;

// Основной компонент раздела
const TeachersSection: React.FC = () => {
  // Массив с данными о преподаваемых курсах для отображения в табе "Курсы"
  const teacherCourses = [
    {
      id: 1,
      title: "Арт-терапия",
      description: "Профессиональное обучение методам арт-терапии для работы с различными запросами клиентов.",
      duration: "3 месяца",
      type: "семинар",
      format: "дистанционное и очное",
      nextStart: "21 сентября 2024",
      price: "400$",
      certificate: "выдача 2х сертификатов. Сертификат нашего центра и международный сертификат ОППЛ",
      fullDescription: "Арт-терапия – это одно из направлений практической психологии, которое использует различные виды творчества для психологической помощи самым разным клиентам в решении всего спектра их личностных проблем.",
      audience: "Для психологов, учителей, родителей, коррекционных психологов, специалистов работающих с детьми.",
      benefits: [
        "Повышение самооценки и уверенности в своих силах",
        "Снижение уровня стресса",
        "Преодоление депрессивных состояний и тревожных расстройств",
        "Преодоление возрастных кризисов",
        "Решение семейных конфликтов",
        "Повышение навыков коммуникации",
        "Самопознание (лучше понять свои жизненные цели, желания)",
        "Проработка психологических травм",
        "Преодоление фобий"
      ],
      process: "Теория и практика, проработка кейсов, супервизия. Каждую технику прорабатываем на участниках, тем самым погружаем и даем почувствовать действенность на себе. Теоретические лекции по каждой теме. Домашние задания.",
      program: [
        "Изотерапия", 
        "Сказка терапия", 
        "Песочная терапия", 
        "Мандалатерапия", 
        "Фототерапия", 
        "Метафорические ассоциативные карты", 
        "Арт в коучинге", 
        "Кинотерапия"
      ],
      results: [
        "Навыки основных функций Арт-терапии: Диагностический - найти корень проблемы, Терапевтический - излечить",
        "Распознавать виды метафор в психологическом консультировании",
        "Цель арт терапии и работа с ней",
        "Направления арт терапии помогут в других направлениях психологии",
        "Повышение самооценки",
        "Единомышленники",
        "Найдете и осознаете свои внутренние ресурсы",
        "Формирование творческого видения мира",
        "Откроете в себе инициативного деятеля"
      ],
      teacher: "Гафарова Шамама - Дипломированный специалист, Кризисный психолог, Социальный психолог, Психолог по химическим аддикциям, Эксперт по Мак и Арт терапии, Сертифицированный игропрактик"
    },
    {
      id: 2,
      title: "Методики консультирования",
      description: "Комплексное обучение базовым и продвинутым техникам психологического консультирования.",
      duration: "2 месяца",
      type: "семинар",
      format: "дистанционное и очное",
      price: "400$",
      fullDescription: "Профессиональная программа, направленная на развитие ключевых навыков психологического консультирования с использованием современных подходов и методик.",
      benefits: [
        "Познакомятся с особенностями протекания психической жизни человека в норме и при наличии психопатологии",
        "Освоят теоретические и методические основы индивидуального психологического консультирования и групповой психотерапии в концепции разных психотерапевтических школ",
        "Профессиональной этики консультанта",
        "Получат навыки проведения индивидуальных психотерапевтических сессий (выявление запроса клиента, заключение контракта, поддержание психотерапевтического альянса, работа с сопротивлением и пр.)",
        "Определят свой собственный стиль психотерапевтической работы",
        "Созданию кейсов",
        "Пройдут личную психотерапию и супервизию",
        "Получат опыт практической деятельности в качестве супервизора"
      ],
      process: "Теория и практика, проработка кейсов, супервизия. Каждую технику прорабатываем на участниках, тем самым погружаем и даем почувствовать действенность на себе. Теоретические лекции по каждой теме. Методические пособия. Домашние задания.",
      program: "8 уроков по 2 часа каждый урок, один раз в неделю. Практические задания для закрепления материала на каждом уроке.",
      modules: [
        { id: 1, title: "Урок 1", content: "Введение в профессию. Этические принципы в психологическом консультировании." },
        { id: 2, title: "Урок 2", content: "Сеттинг. Рапорт. Терапевтический контракт." },
        { id: 3, title: "Урок 3", content: "Определение и цели психологического консультирования. Структура процесса консультирования. Основы консультирования." },
        { id: 4, title: "Урок 4", content: "Современные подходы и методы консультирования. Пресуппозиция консультирования." },
        { id: 5, title: "Урок 5", content: "Перенос и контрперенос в консультировании. Профилактика выгорания и основы самопомощи." },
        { id: 6, title: "Урок 6", content: "Работа с психосоматикой в консультировании. Работа с сопротивлением." },
        { id: 7, title: "Урок 7", content: "Работа с различными терапевтическими запросами. Постановка запроса." },
        { id: 8, title: "Урок 8", content: "Супервизия в практике. Разбор кейсов." }
      ],
      results: [
        "Проведение психологического консультирования",
        "Диагностика психологических проблем и расстройств",
        "Разработка и реализация индивидуальных программ психологической помощи",
        "Гибкость в применении различных подходов и методик"
      ],
      teacher: "Гафарова Шамама - Дипломированный специалист, Кризисный психолог, Социальный психолог, Психолог по химическим аддикциям, Эксперт по Мак и Арт терапии, Сертифицированный игропрактик"
    },
    {
      id: 3,
      title: "МАК (Метафорические ассоциативные карты)",
      description: "Углубленное изучение методик работы с метафорическими ассоциативными картами в психологической практике.",
      price: "300$",
      format: "дистанционное и очное",
      modules: [
        { id: 1, title: "Тема 1", content: "Метафорические карты – определение, история возникновения." },
        { id: 2, title: "Тема 2", content: "Возможности и ограничения использования метафорических карт. Преимущество использования МАК в психологической практике." },
        { id: 3, title: "Тема 3", content: "Обзор колод." },
        { id: 4, title: "Тема 4", content: "Формирование конструктивного запроса клиента при помощи метафорических ассоциативных карт." },
        { id: 5, title: "Тема 5", content: "Универсальные техники работы с МАК. Модификация техники под любой запрос клиента. Техники исследования Я-концепции на основе МАК." },
        { id: 6, title: "Тема 6", content: "Работа с МАК в онлайн-формате." },
        { id: 7, title: "Тема 7", content: "Особенности применения МАК в групповой работе." },
        { id: 8, title: "Тема 8", content: "Супервизия." }
      ],
      teacher: "Гафарова Шамама - Дипломированный специалист, Кризисный психолог, Социальный психолог, Психолог по химическим аддикциям, Эксперт по Мак и Арт терапии, Сертифицированный игропрактик"
    },
    {
      id: 4,
      title: "Кризисная психология",
      description: "Профессиональное обучение методам кризисной психологии для эффективной работы с людьми в кризисных ситуациях.",
      duration: "3 месяца",
      type: "семинар",
      format: "дистанционное и очное",
      price: "500$",
      fullDescription: "Кризисная психология – направление профессиональной психологической помощи, направленное на поддержку людей, находящихся в катастрофической или кризисной ситуации.",
      benefits: [
        "Профессиональный рост. Вы будете уверенно ощущать себя в кризисных ситуациях и научитесь работать с самыми сложными запросами клиентов. Эта цель будет достигнута благодаря постоянной практике во время обучения. Вы получите все необходимые инструменты для эффективной работы с психическими травмами и кризисами.",
        "Практическое погружение в кризисное консультирование. Это будет выполнено в три этапа – самостоятельная работа, консультирование в паре с другими учениками, работа с реальными клиентами (начиная с 6-го модуля). На каждом этапе слушатели получат сопровождение преподавателя.",
        "Личностное развитие. Хороший психолог должен не только обладать знаниями и практическими навыками, но и иметь развитую эмпатию, чувство такта, коммуникабельность, обучаемость и другие личностные качества.",
        "Общую структуру проработки психологических травм. Способы повышения собственной устойчивости при работе с кризисами и болью клиентов.",
        "Особенности построения терапевтического альянса. Особенности психологической помощи в разных травматических и кризисных ситуациях.",
        "Нюансы применения различных техник. Важно понимать, какой инструмент будет наиболее уместен в той или иной ситуации. Для преодоления возрастных кризисов и при работе с ПТСР применяется разный инструментарий."
      ],
      process: "План обучения: 12 уроков - 30 академических часов. В неделю 1 урок - 2,5 часа.",
      modules: [
        { id: 1, title: "Урок 1", content: "«Введение в профессию кризисного психолога». Этапы работы. Основные понятия, особенность профессиональной этики психолога, специфика помогающих профессий." },
        { id: 2, title: "Урок 2", content: "Принципы и задачи кризисного консультирования. Базовые техники ресурсирования. Возможности самоподдержки." },
        { id: 3, title: "Урок 3", content: "Стабилизация эмоционального состояния. «Сложные» ситуации в консультировании и их решения." },
        { id: 4, title: "Урок 4", content: "Практика самопомощи после сложной консультации." },
        { id: 5, title: "Урок 5", content: "Возможности сказкотерапии в кризисном консультировании. Возможности самоподдержки." },
        { id: 6, title: "Урок 6", content: "Стабилизация эмоционального состояния клиента. Инструменты для работы с чувством вины, обидой, гневом." },
        { id: 7, title: "Урок 7", content: "Травматические ситуации и их типы. Факторы суицидального риска." },
        { id: 8, title: "Урок 8", content: "Практика травматических ситуаций." },
        { id: 9, title: "Урок 9", content: "Специфика работы с насилием. Домашнее (семейное) насилие." },
        { id: 10, title: "Урок 10", content: "Арт-терапевтические техники в групповой работе с кризисными состояниями. Мак-терапевтические техники в групповой работе с кризисными состояниями." },
        { id: 11, title: "Урок 11", content: "Разбор кейсов." },
        { id: 12, title: "Урок 12", content: "Супервизия: анализ консультативных случаев в рамках практики." }
      ],
      results: [
        "Навыки работы с людьми в кризисных ситуациях",
        "Умение определять факторы суицидального риска",
        "Способы работы с травматическими ситуациями",
        "Техники стабилизации эмоционального состояния клиента",
        "Методы работы с насилием",
        "Практические навыки применения арт-терапии и МАК-терапии в кризисном консультировании"
      ],
      teacher: "Гафарова Шамама - Дипломированный специалист, Кризисный психолог, Социальный психолог, Психолог по химическим аддикциям, Эксперт по Мак и Арт терапии, Сертифицированный игропрактик"
    }
  ];

  // Добавим курсы Динары как массив объектов для единообразия
  const dinarCourses = [
    {
      id: 1,
      title: "Личностные расстройства и профайлинг",
      description: "Углубленный курс по психодиагностике личностных расстройств и профайлингу. Научитесь распознавать типы личности и строить эффективную коммуникацию.",
      price: "650$",
      duration: "3 месяца",
      type: "курс",
      format: "онлайн",
      nextStart: "5 ноября 2024",
      modules: [
        { 
          id: 1, 
          title: "Модуль 1: Личностные расстройства", 
          content: ""
        },
        {
          id: 2,
          title: "Урок 1. Нарциссическое расстройство личности",
          content: `• Психодинамические корни нарциссизма
• Признаки и проявления (грандиозность, уязвимость, обесценивание других)
• Защитные механизмы нарцисса
• Диагностические критерии (DSM-5, МКБ-11)
• Как нарцисс ведёт себя в отношениях
• Дифференциальная диагностика
• Подходы к работе: что помогает, а что нет
• Цель психолога в работе с НРЛ и нарциссическими травмами
• Кейсы и практическое обсуждение`
        },
        {
          id: 3,
          title: "Урок 2. Шизоидное расстройство личности",
          content: `• Кто такой шизоид? Внутренний мир и особенности развития
• Как формируется шизоид
• Признаки: отчуждённость, уход в фантазии, избегание контактов
• Основные страхи и желания
• Диагностические инструменты
• Что пугает и что важно учитывать в работе
• Работа с границами, безопасностью и телесностью
• Ошибки в интерпретации шизоида
• Различия шизоида и дефицитарного нарцисса
• Разбор кейсов`
        },
        {
          id: 4,
          title: "Урок 3. Паранояльная структура личности",
          content: `• Развитие паранояльной личности
• Мышление в терминах угроз и контроля
• Особенности восприятия и интерпретации реальности
• Подозрительность, проекции, агрессия
• Как не попасть в ловушку "доказательства" и "оправданий"
• Подходы в диагностике
• Как выстраивать терапевтические отношения
• Разбор конфликтных кейсов
• Практика: как говорить и слушать параноика`
        },
        {
          id: 5,
          title: "Урок 4. Истероидная структура личности",
          content: `• Эмоциональность, драматизация, демонстративность
• История развития по периодам жизни
• Потребность во внимании и признании
• Что стоит за "театральностью"
• Как формируется структура
• Диагностические критерии
• Работа с самооценкой, телом и потребностью быть замеченным
• Эмпатия и границы — ключевые моменты в терапии
• Живые примеры и разбор поведения`
        },
        {
          id: 6,
          title: "Урок 5. Эмотивный тип личности",
          content: `• Характерные черты: сочувствие, чувствительность, привязанность
• В чём ресурс, в чём уязвимость
• Как эмоции управляют поведением
• Типичные реакции на стресс
• Способы диагностики и нюансы общения
• Поддержка, принятие и экологичная работа
• Ошибки в интерпретации "слабости"
• Практика: как создать безопасное пространство
• Разбор различий и схожести с паранаяльными и истероидными личностями`
        },
        {
          id: 7,
          title: "Урок 6. Обсессивно-компульсивный тип личности",
          content: `• Мышление в категориях контроля, порядка и морали
• Перфекционизм, ригидность, сомнения
• Внутренний критик и сверх-я
• Различие между ОКР и обсессивной структурой
• Диагностика и опросники
• Терапевтические подходы: мягкость, терпение, структурирование
• Как работать с телом и чувственностью
• Примеры и типичные запросы
• Практическая работа над кейсом`
        },
        { 
          id: 8, 
          title: "Модуль 2: Профайлинг и распознавание поведенческих паттернов", 
          content: "" 
        },
        {
          id: 9,
          title: "Урок 7. Введение в профайлинг",
          content: `• Что такое профайлинг: история и сферы применения
• Отличие профайлинга от манипуляции и психодиагностики
• Структура профайлерского анализа: вербальные, невербальные и поведенческие признаки
• Основы наблюдения: что важно видеть и слышать
• Этические границы и контекст применения
• Кейсы: где профайлинг полезен, а где опасен
• Практика: составление первичного профиля`
        },
        {
          id: 10,
          title: "Урок 8. Невербальные признаки и язык тела",
          content: `• Базовая невербалика: поза, мимика, жесты
• Стрессовые маркеры в теле
• Конгруэнтность и неконгруэнтность
• Обман в теле: микронавыки детекции
• Культурные различия в жестах
• Практика наблюдения: видеоанализ`
        },
        {
          id: 11,
          title: "Урок 9. Психотипы и профайлинг личности",
          content: `• Психотипы в профайлинге (MBTI, соционика, темпераменты, Big Five)
• Как "собирать" тип: речь, походка, скорость мышления
• Поведенческие маркеры экстравертов и интровертов
• Агрессия, тревожность, мотивация — как они видны
• Практика: составление типажа по фото и видео`
        },
        {
          id: 12,
          title: "Урок 10. Работа в конфликте: как понять, кто перед тобой",
          content: `• Агрессор, манипулятор, жертва — как отличить
• Треугольник Карпмана в действиях
• Распознавание лжи, уклонения, обвинений
• Тактика "холодного чтения" без давления
• Практика: анализ конфликтного диалога`
        },
        {
          id: 13,
          title: "Урок 11. Профайлинг в практике психолога",
          content: `• Интеграция: как профайлинг помогает в терапии и коучинге
• Быстрое выстраивание доверия через чтение клиента
• Что говорить, что не говорить — язык наблюдателя
• Практика наблюдения за клиентом в сессии
• Этические аспекты и самонаблюдение
• Эннеаграмма (разбор 9 типов личности по эннеаграмме)
• Мини-супервизия: кейсы студентов`
        }
      ]
    },
    {
      id: 2,
      title: "Коучинг как искусство сопровождения и трансформации",
      description: "Освойте ключевые навыки коуча, научитесь проводить эффективные сессии, раскрывать потенциал клиента и сопровождать его в достижении целей.",
      price: "400$",
      duration: "2 месяца",
      type: "курс",
      format: "онлайн",
      nextStart: "15 ноября 2024",
      modules: [
        {
          id: 1,
          title: "Урок 1: Основы коучинга: философия, цели и отличие от терапии",
          content: `• Что такое коучинг: миссия, задачи и возможности
• Коучинг vs. психология, менторинг, наставничество
• Роли и границы коуча
• Виды коучинга (личностный, бизнес, лайф, карьерный и т.д.)
• Этический кодекс коуча и основы конфиденциальности
• Практика: личное позиционирование как коуча`
        },
        {
          id: 2,
          title: "Урок 2: Структура коуч-сессии: от запроса к результату",
          content: `• Как начинается сессия: контракт, рамки, установка контакта
• Пирамида логических уровней в коучинге (по Дилтсу)
• Структура сессии по модели GROW
• Работа с целями: как помочь клиенту формулировать экологичную цель
• Ошибки новичков: советование, увод в терапию, давление
• Практика: мини-сессии по модели GROW в парах`
        },
        {
          id: 3,
          title: "Урок 3: Искусство коучинговых вопросов",
          content: `• Сила вопроса в коучинге
• Виды вопросов: открытые, уточняющие, фокусирующие, метафорические
• Как задавать вопросы, не вмешиваясь
• Распознавание "паразитных" вопросов и советов под маской вопросов
• Практика: отработка сильных коучинговых вопросов`
        },
        {
          id: 4,
          title: "Урок 4: Активное слушание и глубокое присутствие",
          content: `• Слушание на трёх уровнях
• Как быть "здесь и сейчас" с клиентом
• Подстройка и раппорт: голос, дыхание, ритм
• Как не "перехватывать" эмоции клиента, оставаясь в опоре
• Практика: работа в парах на слушание и зеркаливание`
        },
        {
          id: 5,
          title: "Урок 5: Работа с ограничивающими убеждениями",
          content: `• Как выявить глубинные установки, мешающие клиенту
• Техники работы с убеждениями: переформулировка, масштабирование, логические уровни
• Как помочь клиенту осознать и трансформировать внутренние барьеры
• Работа с сопротивлением и сомнением
• Практика: выявление ограничивающего убеждения и работа с ним`
        },
        {
          id: 6,
          title: "Урок 6: Энергия и состояние коуча",
          content: `• Энергетика коуча — как ты влияешь на клиента
• Работа с собственным состоянием: центрирование, ресурсность, защита
• Саморегуляция до, во время и после сессии
• Практика: техники настройки перед сессией`
        },
        {
          id: 7,
          title: "Урок 7: Работа с целями, результатами и мотивацией",
          content: `• Как работать с долгосрочными и краткосрочными целями
• SMART и экологичность целей
• Инструменты визуализации результата
• Поддержка клиента между сессиями: план действий и фокус внимания
• Как коуч помогает сохранить мотивацию
• Практика: работа с целью клиента`
        },
        {
          id: 8,
          title: "Урок 8: Завершение, супервизия и первые шаги в практике",
          content: `• Как завершать сессию и курс
• Рефлексия клиента и коуча
• Ошибки новичков в практике
• Как начать свою практику: платные и бесплатные сессии, первые клиенты
• Супервизия: зачем и как
• Практика: демонстрация сессии и обратная связь от группы`
        }
      ]
    },
    {
      id: 3,
      title: "Семейная психология: динамика, конфликты, близость",
      description: "Пройдите путь от теории к практике семейной психологии: поймите динамику отношений, научитесь диагностировать и решать семейные конфликты.",
      price: "500$",
      duration: "2,5 месяца",
      type: "курс",
      format: "дистанционное",
      nextStart: "1 октября 2024",
      modules: [
        {
          id: 1,
          title: "Урок 1: Основы семейной психологии",
          content: `• Что такое семья: функции, этапы развития
• Системный взгляд на семью
• Семейные роли и иерархия
• Влияние родительской семьи на партнёрские отношения
• Задачи семейного консультанта`
        },
        {
          id: 2,
          title: "Урок 2: Этапы развития семьи и семейные кризисы",
          content: `• Жизненные циклы семьи (по Олсону, Бауэну)
• Нормативные и ненормативные кризисы
• Как справляться с кризисами переходных периодов (рождение детей, переезд, измена, развод)
• Работа с ожиданиями и разочарованием`
        },
        {
          id: 3,
          title: "Урок 3: Привязанность и её влияние на партнёрские отношения",
          content: `• Теория привязанности (Болби, Айнсворт)
• Стили привязанности: надёжный, избегающий, тревожный, дезорганизованный
• Как привязанность влияет на выбор партнёра и конфликты
• Работа с различиями стилей в паре`
        },
        {
          id: 4,
          title: "Урок 4: Созависимость и сепарация",
          content: `• Что такое созависимость и её признаки
• Психологическая сепарация от родителей и партнёра
• Границы в семье
• Как распознать и проработать созависимый паттерн`
        },
        {
          id: 5,
          title: "Урок 5: Коммуникация в паре: слушать и слышать",
          content: `• Основы здорового общения
• Я-сообщения и активное слушание
• Что разрушает контакт: критика, презрение, обесценивание
• Техники восстановления диалога в конфликтной паре`
        },
        {
          id: 6,
          title: "Урок 6: Конфликты и работа с агрессией в отношениях",
          content: `• Почему возникают конфликты
• Склонность к избеганию или эскалации
• Уровни агрессии: пассивная, скрытая, активная
• Модели выхода из конфликтов
• Практика: техника "Безопасный диалог"`
        },
        {
          id: 7,
          title: "Урок 7: Секс, близость и эмоциональная дистанция",
          content: `• Психология сексуальности в паре
• Причины потери интимности
• Эмоциональная близость как основа сексуальной связи
• Травмы, запреты, стыд — работа с темами сексуальности`
        },
        {
          id: 8,
          title: "Урок 8: Измена: причины, реакции, восстановление",
          content: `• Что стоит за изменой: потребности и дефициты
• Этапы переживания измены
• Возможна ли работа на восстановление доверия
• Роль терапевта в работе с парами после измены`
        },
        {
          id: 9,
          title: "Урок 9: Родительство и партнёрство: как не потерять друг друга",
          content: `• Изменение отношений после рождения ребёнка
• Конфликты по поводу воспитания, обязанностей
• Как сохранить романтику и поддержку
• Семья как команда`
        },
        {
          id: 10,
          title: "Урок 10: Практика семейного консультирования",
          content: `• Формат сессии: индивидуально, парно, семейно
• Контракт, конфиденциальность и границы
• Как не становиться "судьёй" в паре
• Работа с сопротивлением и "пришли, чтобы обвинить"
• Разбор кейсов: реальные ситуации из практики`
        }
      ]
    }
  ];

  // Состояние для вкладок каждого преподавателя
  const [activeTabShamama, setActiveTabShamama] = useState('biography');
  const [activeTabDinar, setActiveTabDinar] = useState('biography');
  
  // Состояние для активного преподавателя
  const [activeTeacher, setActiveTeacher] = useState<'shamama' | 'dinar' | 'julia' | 'inara'>('shamama');
  
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Удаляем controls и оптимизируем useInView
  const [ref] = useInView({
    triggerOnce: true, // Изменяем обратно на true для оптимизации
    threshold: 0.01  // Уменьшаем порог для более быстрого срабатывания
  });
  
  // Обработчики вкладок для каждого преподавателя
  const handleTabChangeShamama = (tab: string) => {
    setActiveTabShamama(tab);
  };
  
  const handleTabChangeDinar = (tab: string) => {
    setActiveTabDinar(tab);
  };
  
  // Обработчик переключения преподавателя
  const handleTeacherChange = (teacher: 'shamama' | 'dinar' | 'julia' | 'inara') => {
    // Предварительно устанавливаем вкладку, а затем меняем преподавателя
    // для более быстрого рендеринга
    if (teacher === 'shamama') {
      setActiveTabShamama('biography');
    } else if (teacher === 'dinar') {
      setActiveTabDinar('biography');
    } else if (teacher === 'julia') {
      setActiveTabJulia('biography');
    } else if (teacher === 'inara') {
      setActiveTabInara('biography');
    }
    
    // Используем requestAnimationFrame для оптимизации перерисовки
    requestAnimationFrame(() => {
      setActiveTeacher(teacher);
    });
  };
  
  const handleOpenCourseModal = (courseId: number) => {
    const course = teacherCourses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsModalOpen(true);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Анимации для карточек преподавателей
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Функция для открытия модального окна с курсом Динары
  const handleOpenDinarCourseModal = (courseId: number) => {
    const course = dinarCourses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsModalOpen(true);
    }
  };

  // Добавляем функцию для скролла к форме контактов
  const scrollToContactForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Предотвращаем всплытие события, чтобы не открывалась модалка курса
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Добавляем курсы Юлии как массив объектов для единообразия
  const juliaCourses = [
    {
      id: 1,
      title: "Интегративная гипнотерапия: Ольфакторная работа с элементами эриксоновского гипноза",
      description: "Научитесь использовать силу ароматов в сочетании с техниками эриксоновского гипноза для работы с широким спектром клиентских запросов.",
      price: "400$",
      duration: "2 месяца",
      type: "курс",
      format: "онлайн",
      nextStart: "10 декабря 2024",
      modules: [
        {
          id: 1,
          title: "Занятие 1. Введение. Основы гипноза и ольфактотерапии",
          content: `• Введение в гипноз (что есть трансовое состояние: ключевые принципы работы)
• Ольфактотерапия: основы и базовые принципы влияния ароматов на подсознание и эмоции
• Связь запаха и механизмов памяти. Способы сочетания эффектов ольфактотерапии и гипноза (основы)  
• Практика: групповая ольфакторная гипнопрактика для расслабления`
        },
        {
          id: 2,
          title: "Занятие 2. Интеграция запахов в гипнотическую работу",
          content: `• Выбор эфирного масла для сеанса под запрос. Техника безопасности
• Введение аромата в гипнотический скрипт
• Практика: написание мини-сценария сессии с запахом. Работа в парах`
        },
        {
          id: 3,
          title: "Модуль 3. Базовые техники гипноанализа",
          content: `• Что такое гипноанализ (основные принципы)
• Как работать с воспоминаниями без травматизации
• Ароматическая регрессия: доступ к памяти через запах
• Практика: проведение гипнопогружения через запах в ресурсное воспоминание`
        },
        {
          id: 4,
          title: "Занятие 4. Сценарии работы с тревожностью и стрессом",
          content: `• Запах как инструмент заземления и снятия тревоги
• Краткий протокол работы с эмоциональной реакцией
• Особенности применения ароматов при повышенной тревожности
• Практика: проведение релаксационной ароматерапевтической гипносессии в парах`
        },
        {
          id: 5,
          title: "Занятие 5. Работа с самооценкой и внутренним ресурсом",
          content: `• Самооценка и самоценность
• Ольфакторное якорение
• Краткий протокол работы с самооценкой через гипноз и ароматы эирных масел
• Практика: создание индивидуального ресурсного аромата + работа с ним в трансе`
        },
        {
          id: 6,
          title: "Занятие 6. Итоговая практика под супервизией и сертификация",
          content: `• Проведение короткой гипноольфакторной сессии по пройденным протоколам
• Индивидуальная обратная связь от преподавателя
• Разбор сессии и рекомендации по развитию навыков`
        }
      ]
    }
  ];

  // Добавляем состояние для вкладок третьего преподавателя
  const [activeTabJulia, setActiveTabJulia] = useState('biography');

  // Обработчик вкладок для третьего преподавателя
  const handleTabChangeJulia = (tab: string) => {
    setActiveTabJulia(tab);
  };

  // Функция для открытия модального окна с курсом Юлии
  const handleOpenJuliaCourseModal = (courseId: number) => {
    const course = juliaCourses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsModalOpen(true);
    }
  };

  // Добавляем курсы Инары
  const inaraCourses = [
    {
      id: 1,
      title: "Возростная Психология и Психология Развития",
      description: "Курс освещает особенности развития психики начиная с периода беременности до старости. Для каждого этапа развития рассматриваются ключевые изменения, даются рекомендации родителям, учителям, детям и взрослым.",
      price: "400$",
      duration: "3 месяца",
      type: "курс",
      format: "онлайн",
      nextStart: "15 января 2025",
      fullDescription: "Курс посвящен изучению особенностей психического развития человека на разных возрастных этапах. Вы изучите основные теории возрастной психологии, получите практические навыки работы с клиентами разных возрастов, научитесь понимать причины поведения людей на каждом этапе развития.",
      benefits: [
        "Глубокое понимание возрастной психологии и периодизации развития",
        "Знание особенностей психических процессов на разных возрастных этапах",
        "Практические навыки возрастно-психологического консультирования",
        "Понимание нормы и отклонений развития для каждого возраста",
        "Умение составлять рекомендации для родителей, учителей и других специалистов"
      ],
      process: "Курс состоит из теоретических лекций, практических заданий, разбора кейсов и групповых дискуссий. Каждый модуль включает домашние задания для закрепления материала.",
      modules: [
        {
          id: 1,
          title: "Модуль 1: Введение в Возрастную Психологию и Основные Понятия",
          content: `• Методологические основы дисциплины (Предмет, методы, соотношения с другими Дисциплинами)
• Типы Возрастов - Психологический возраст, Хронологический Возраст, Социальный Возраст, Биологический Возраст`
        },
        {
          id: 2,
          title: "Модуль 2: Рост и Развитие",
          content: `• Понятие РОСТ и Развитие
• Детерминаты Психологического развития
• Разбор темы – Раннее развитие польза и опасность (Л.С.Выготский – типы развития, ЗБР, рекомендации родителям)`
        },
        {
          id: 3,
          title: "Модуль 3: Психоаналитические Теории Детского Развития",
          content: `• Классический психоанализ З.Фрейда (взаимодействие сознательного и бессознательного, структура личности)
• Психосексуальные стадии развития
• Защитные механизмы`
        },
        {
          id: 4,
          title: "Модуль 4: Теории Э.Эриксона и Джона Боулби",
          content: `• Эпигенетическая теория Э.Эриксона (Стадии Жизненного пути)
• Теория Привязанности и Типы привязанности Джона Боулби
• Практические занятия по теориям`
        },
        {
          id: 5,
          title: "Модуль 5: Психоаналитические Теории Детского Развития",
          content: `• Проблема развития мышления ребенка
• Эгоцентрическое Мышление и Речь
• Стадии развития Интеллекта (периодизация) (Ж.Пиаже)
• Роль общения в развитии ребенка`
        },
        {
          id: 6,
          title: "Модуль 6: Структура Психологического Возраста",
          content: `• Социальная ситуация развития
• Структура психологического возраста
• Психологические новообразования возрастов
• Динамика развития возраста`
        },
        {
          id: 7,
          title: "Модуль 7: Периодизация Психического Развития",
          content: `• Периодизация Психического Развития
• Младенческий Возраст
• Ранний Возраст
• Дошкольный Возраст
• Младший Школьный Возраст
• Подростковый Возраст
• Зрелость`
        },
        {
          id: 8,
          title: "Модуль 8: Возрастные Кризисы",
          content: `• Кризис 3-х лет
• Кризис 7-ми лет
• Подростковый Кризис
• Кризис Середины (среднего возраста)`
        },
        {
          id: 9,
          title: "Специфика Возрастно-психологического консультирования",
          content: `• Консультирование по проблемам раннего и дошкольного возраста
• Консультирование по проблемам младшего школьного возраста
• Консультирование по проблемам подросткового и юношеского возрастов
• Взаимодействие психолога с родителями, опекунами, воспитателями, учителями
• Особенности психологического консультирования взрослых возрастов
• Специфика психологического консультирования людей пожилого возраста`
        }
      ],
      results: [
        "Понимание причин и мотивов поведения людей разных возрастов",
        "Умение корректировать свое поведение в зависимости от задач каждого возрастного этапа",
        "Способность разрабатывать рекомендации для родителей, учителей и других специалистов",
        "Навыки возрастно-психологического консультирования",
        "Умение диагностировать возрастные кризисы и помогать их преодолевать"
      ],
      teacher: "Инара Абдуллаева - Возрастной психолог, специалист по развитию, автор обучающих программ по возрастной психологии"
    },
    {
      id: 2,
      title: "Телесно-ориентированная терапия: искусство слышать тело",
      description: "Курс для психологов, коучей и специалистов, стремящихся расширить профессиональный инструментарий. Вы научитесь выявлять телесные маркеры эмоций, использовать телесные техники для снижения стресса и стабилизации клиента.",
      price: "400$",
      duration: "2,5 месяца",
      type: "курс",
      format: "онлайн",
      nextStart: "1 февраля 2025",
      fullDescription: "Курс посвящен изучению методов телесно-ориентированной терапии, адаптированных для онлайн-формата. Программа разработана для психологов, коучей и специалистов помогающих профессий, стремящихся расширить свой профессиональный инструментарий.",
      benefits: [
        "Освоение базовых техник телесно-ориентированной терапии",
        "Навыки выявления телесных маркеров эмоций",
        "Умение адаптировать телесные практики под онлайн-формат",
        "Понимание связи между телом и психическими процессами",
        "Практические инструменты для работы с разными запросами клиентов"
      ],
      process: "Обучение включает теоретические блоки, практические занятия, разбор кейсов и супервизии. Курс построен с акцентом на практику и глубокое освоение телесно-ориентированных техник.",
      modules: [
        {
          id: 1,
          title: "Модуль 1: Базовая теория тела и психики",
          content: `• Психосоматика: мифы и реальность
• Как тело запоминает опыт: теория телесной памяти
• Эмоции в теле: где живёт страх, радость, тревога?
• Базовые принципы телесной терапии: безопасность, экологичность, постепенность
• Практика: простая диагностика телесного состояния через сканирование тела`
        },
        {
          id: 2,
          title: "Модуль 2: Психологические травмы в теле",
          content: `• Как тело говорит о травме
• Симптомы телесной защиты и блокировки
• Работа с мышечными зажимами и хроническим напряжением
• Энергия и телесный ресурс: где искать опору в себе
• Практика: "Тело как карта" — создание телесного профиля в домашних условиях`
        },
        {
          id: 3,
          title: "Модуль 3: Базовые техники телесно-ориентированной терапии",
          content: `• Дыхательные практики: освобождение и заземление
• Микродвижения и микропаузы: техника работы в онлайн-формате
• Навыки работы с границами тела: личные границы и их восстановление
• Работа через прикосновение на расстоянии: визуализация, образы, самоприкосновение
• Практика: "Контакт с телом" — серия коротких упражнений в реальном времени на онлайн-сессии`
        },
        {
          id: 4,
          title: "Модуль 4: Телесная осознанность в консультировании",
          content: `• Как "читать" тело клиента через экран
• Настройка и калибровка: как не ошибиться в онлайн-работе
• Ошибки и ловушки в телесной терапии: чего избегать?
• Этика телесных практик в дистанционном формате
• Практика: разбор реальных кейсов + разыгрывание мини-сессий между студентами`
        },
        {
          id: 5,
          title: "Модуль 5: Применение телесных практик в работе с подростками и взрослыми",
          content: `• Специфика подросткового тела и психики
• Как помочь взрослому выйти из застревания через тело
• Работа с тревожностью, страхами, паникой через телесные методы
• Как вести мягкое сопровождение изменений
• Практика: разработка собственного мини-протокола телесной работы`
        },
        {
          id: 6,
          title: "Модуль 6: Работа с границами через тело",
          content: `• Как тело реагирует на нарушение личных границ
• Упражнения на восстановление и укрепление психологических границ
• Практики для онлайн-работы с клиентами, склонными к слиянию или изоляции
• Практика: "Физическая карта личных границ" — телесная техника для осознания и укрепления собственных "рамок"`
        },
        {
          id: 7,
          title: "Модуль 7: Тело и травматический опыт",
          content: `• Как травма "запоминается" в теле
• Принципы работы с травмой через бережные телесные практики
• Что можно и чего нельзя делать онлайн при травматическом опыте клиента
• Практика: "Дыхание безопасности" — метод для снятия телесного напряжения после тяжёлых переживаний`
        },
        {
          id: 8,
          title: "Модуль 8: Тело как ресурс: техники восстановления",
          content: `• Как использовать тело для накопления внутреннего ресурса
• Быстрая самопомощь через движения и микропрактики
• Практика: "Телесная аптечка"`
        }
      ],
      results: [
        "Уверенное владение базовыми техниками телесной терапии",
        "Умение применять телесно-ориентированные методы в работе с подростками и взрослыми",
        "Способность адаптировать телесные практики под онлайн-формат",
        "Навыки использования тела как ресурса для восстановления",
        "Практические инструменты для работы с границами и травматическим опытом через тело"
      ],
      teacher: "Инара Абдуллаева - Психолог, специалист по телесно-ориентированной терапии, автор методик интеграции телесных практик в онлайн-консультирование"
    }
  ];

  // Добавляем состояние для вкладок четвертого преподавателя
  const [activeTabInara, setActiveTabInara] = useState('biography');

  // Обработчик вкладок для четвертого преподавателя
  const handleTabChangeInara = (tab: string) => {
    setActiveTabInara(tab);
  };

  // Функция для открытия модального окна с курсом Инары
  const handleOpenInaraCourseModal = (courseId: number) => {
    const course = inaraCourses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsModalOpen(true);
    }
  };

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
        
        {/* Аватары преподавателей */}
        <TeachersAvatarsContainer>
          <AnimatedElement animation={isMobile ? "fadeIn" : "fadeInUp"} delay={0.2}>
            <AvatarWrapper 
              isActive={activeTeacher === 'shamama'} 
              onClick={() => handleTeacherChange('shamama')}
            >
              <AvatarImage src="/images/teacher.jpg" alt="Гафарова Шамама" isSecondTeacher={false} />
              <AvatarName>Шамама</AvatarName>
            </AvatarWrapper>
          </AnimatedElement>
          
          <AnimatedElement animation={isMobile ? "fadeIn" : "fadeInUp"} delay={0.4}>
            <AvatarWrapper 
              isActive={activeTeacher === 'dinar'} 
              onClick={() => handleTeacherChange('dinar')}
            >
              <AvatarImage src="/images/teacher2.jpg" alt="Саидова Динара" isSecondTeacher={true} />
              <AvatarName>Динара</AvatarName>
            </AvatarWrapper>
          </AnimatedElement>
          
          <AnimatedElement animation={isMobile ? "fadeIn" : "fadeInUp"} delay={0.6}>
            <AvatarWrapper 
              isActive={activeTeacher === 'julia'} 
              onClick={() => handleTeacherChange('julia')}
            >
              <AvatarImage src="/images/teacher3.jpg" alt="Юлия Гайдаева" isSecondTeacher={true} />
              <AvatarName>Юлия</AvatarName>
            </AvatarWrapper>
          </AnimatedElement>
          
          <AnimatedElement animation={isMobile ? "fadeIn" : "fadeInUp"} delay={0.8}>
            <AvatarWrapper 
              isActive={activeTeacher === 'inara'} 
              onClick={() => handleTeacherChange('inara')}
            >
              <AvatarImage src="/images/teacher4.jpg" alt="Инара Абдуллаева" isSecondTeacher={true} />
              <AvatarName>Инара</AvatarName>
            </AvatarWrapper>
          </AnimatedElement>
        </TeachersAvatarsContainer>
        
        <TeacherGrid>
          {/* Информация о Шамаме */}
          {activeTeacher === 'shamama' && (
            <motion.div
              ref={ref}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              layoutId="teacherCard"
              style={{ width: '100%' }}
            >
              <TeacherCard>
                <CardHeader>
                  <ShamamaCardHeaderImg src="/images/teacher.jpg" alt="Гафарова Шамама" />
                  <TeacherInfo>
                    <TeacherName>Гафарова Шамама</TeacherName>
                    <TeacherTitle>Социальный и кризисный психолог, игропрактик</TeacherTitle>
                  </TeacherInfo>
                </CardHeader>
                
                <CardBody>
                  <DesktopTeacherName>Гафарова Шамама</DesktopTeacherName>
                  <DesktopTeacherTitle>Социальный и кризисный психолог, игропрактик</DesktopTeacherTitle>
                  
                  <TabContainer>
                    <TabItem 
                      active={activeTabShamama === 'biography'} 
                      onClick={() => handleTabChangeShamama('biography')}
                    >
                      <TabIcon><FaUserAlt /></TabIcon>
                      {!isMobile && 'Биография'}
                    </TabItem>
                    <TabItem 
                      active={activeTabShamama === 'about'} 
                      onClick={() => handleTabChangeShamama('about')}
                    >
                      <TabIcon><FaIdCard /></TabIcon>
                      {!isMobile && 'Обо мне'}
                    </TabItem>
                    <TabItem 
                      active={activeTabShamama === 'education'} 
                      onClick={() => handleTabChangeShamama('education')}
                    >
                      <TabIcon><FaGraduationCap /></TabIcon>
                      {!isMobile && 'Образование'}
                    </TabItem>
                    <TabItem 
                      active={activeTabShamama === 'courses'} 
                      onClick={() => handleTabChangeShamama('courses')}
                    >
                      <TabIcon><FaBook /></TabIcon>
                      {!isMobile && 'Курсы'}
                    </TabItem>
                  </TabContainer>
                  
                  {activeTabShamama === 'biography' && (
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
                  
                  {activeTabShamama === 'about' && (
                    <TabContent>
                      <ContentSection>
                        <SectionHeading>Обо мне</SectionHeading>
                        
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-primary-dark)', marginBottom: '0.2rem' }}>
                            Гафарова Шамама Адиль г
                          </p>
                          <p style={{ color: 'var(--color-text)' }}>
                            Интегративный психолог<br />
                            Действительный член ОППЛ<br />
                            Языки: Русский, азербайджанский
                          </p>
                        </div>
                        
                        <p>
                          Работаю в интегративном подходе. Для каждого клиента- индивидуальный подход.
                          Мой подход позволяет увидеть достаточно быстро суть запроса и подобрать такие методики, которые помогают найти внутренние опоры для решение задач и выхода из различных ситуаций.
                          В результате нашей совместной работы вы сможете разобраться, в чём внутренняя причина ваших затруднений, и что мешает вам жить так, как вы хотите.
                        </p>
                        
                        <ContentSection>
                          <SectionHeading>Подходы в работе</SectionHeading>
                          <StyledList>
                            <ListItem>
                              <strong>Арт терапия:</strong>
                              <p>Во время сеанса арт-терапии на эмоциональное состояние пациента воздействует искусство. Сеансы проводит арт-терапевт, который помогает пациенту выбросить негативные эмоции, расслабиться, раскрыть творческий потенциал, найти решение текущей проблемы.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>Мак терапия:</strong>
                              <p>Особый инструмент арт-терапии, работа с которым основывается на принципах и постулатах проективных методик. Преимущество МАК в сравнении с другими методами арт-терапии, заключается в том, что в них отсутствуют закрепленные значения. Каждый человек в процессе работы сам определяет их смысл.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>Кризисная психология:</strong>
                              <p>Тот момент, когда привычные методы справляться с трудностями перестают работать. Такое может случиться в любой области нашей жизни: будь то личные отношения, карьера или эмоции. Причины для кризиса бывают разные: потеря работы, расставание, болезнь, утрата близких людей и многое другое.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>Рилив терапия:</strong>
                              <p>Основной метод данной терапии сводится к вопрошающему диалогу, направленному на поиск травмы.</p>
                            </ListItem>
                          </StyledList>
                        </ContentSection>
                        
                        <ContentSection>
                          <SectionHeading>Преподаватель курсов</SectionHeading>
                          <StyledList>
                            <ListItem>Мак терапия</ListItem>
                            <ListItem>Арт терапия</ListItem>
                            <ListItem>Кризисная психология</ListItem>
                            <ListItem>Методики консультирования</ListItem>
                            <ListItem>Зависимый в семье, не приговор</ListItem>
                          </StyledList>
                        </ContentSection>
                        
                        <ContentSection>
                          <SectionHeading>Игропрактика</SectionHeading>
                          <p>
                            Также являюсь игропрактиком. Участвовала на фестивале "Расширение Азербайджан" ведущим игры "Риторический покер".
                            Преподаватель теоретической части курса "Игропрактик" в МШИ представительство Азербайджана.
                            Провожу трансформационные игры затрагивающие все важные аспекты жизни человека.
                            Такие как: карьера, отношения, личностный рост, предназначение и т.д.
                          </p>
                        </ContentSection>
                        
                        <ContentSection>
                          <SectionHeading>Авторские курсы</SectionHeading>
                          <StyledList>
                            <ListItem>Зависимый в семье, не приговор (как подружиться с созависимостью)</ListItem>
                            <ListItem>Арт-Мак терапия в работе с зависимыми</ListItem>
                          </StyledList>
                        </ContentSection>
                        
                        <ContentSection>
                          <SectionHeading>Профессиональный опыт</SectionHeading>
                          <StyledList>
                            <ListItem>Более 3х лет работаю в реабилитационном центре для зависимых, психологом для семей зависимых.</ListItem>
                            <ListItem>Более 200 положительных отзывов.</ListItem>
                            <ListItem>Провела более 20 семинаров на темы:
                              <ul>
                                <li>Я концепция</li>
                                <li>Созависимость и жизнь с зависимым</li>
                                <li>Цветок женственности и т.д.</li>
                              </ul>
                            </ListItem>
                            <ListItem>Организовала 3 ретрита с выездом за город.</ListItem>
                          </StyledList>
                        </ContentSection>
                      </ContentSection>
                    </TabContent>
                  )}
                  
                  {activeTabShamama === 'education' && (
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
                  
                  {activeTabShamama === 'courses' && (
                    <TabContent>
                      <ContentSection>
                        <SectionHeading>Преподаваемые курсы</SectionHeading>
                        <CoursesGrid>
                          {teacherCourses.map(course => (
                            <CourseCard 
                              key={course.id}
                              onClick={() => handleOpenCourseModal(course.id)}
                            >
                              {course.price && <CourseBadge>{course.price}</CourseBadge>}
                              <CourseContent>
                                <CourseInfo>
                                  <CourseTitle>{course.title}</CourseTitle>
                                  <CourseDescription>{course.description}</CourseDescription>
                                  {course.duration && (
                                    <div style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                      <strong>Продолжительность:</strong> {course.duration}
                                    </div>
                                  )}
                                </CourseInfo>
                                <div>
                                <CourseToggle>
                                  Подробнее о курсе <FaInfoCircle />
                                </CourseToggle>
                                  <EnrollButton onClick={(e) => scrollToContactForm(e)}>
                                    Записаться на курс <FaArrowDown />
                                  </EnrollButton>
                                </div>
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
          )}
          
          {/* Информация о Динаре */}
          {activeTeacher === 'dinar' && (
            <motion.div
              ref={ref}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              layoutId="teacherCard"
              style={{ width: '100%' }}
            >
              <TeacherCard>
                <CardHeader>
                  <DinarCardHeaderImg src="/images/teacher2.jpg" alt="Саидова Динара" />
                  <TeacherInfo>
                    <TeacherName>Саидова Динара</TeacherName>
                    <TeacherTitle>Психолог-консультант, коуч, тренер</TeacherTitle>
                  </TeacherInfo>
                </CardHeader>
                
                <CardBody>
                  <DesktopTeacherName>Саидова Динара</DesktopTeacherName>
                  <DesktopTeacherTitle>Психолог-консультант, коуч, тренер</DesktopTeacherTitle>
                  
                  <TabContainer>
                    <TabItem 
                      active={activeTabDinar === 'biography'} 
                      onClick={() => handleTabChangeDinar('biography')}
                    >
                      <TabIcon><FaUserAlt /></TabIcon>
                      {!isMobile && 'Биография'}
                    </TabItem>
                    <TabItem 
                      active={activeTabDinar === 'about'} 
                      onClick={() => handleTabChangeDinar('about')}
                    >
                      <TabIcon><FaIdCard /></TabIcon>
                      {!isMobile && 'Обо мне'}
                    </TabItem>
                    <TabItem 
                      active={activeTabDinar === 'education'} 
                      onClick={() => handleTabChangeDinar('education')}
                    >
                      <TabIcon><FaGraduationCap /></TabIcon>
                      {!isMobile && 'Образование'}
                    </TabItem>
                    <TabItem 
                      active={activeTabDinar === 'courses'} 
                      onClick={() => handleTabChangeDinar('courses')}
                    >
                      <TabIcon><FaBook /></TabIcon>
                      {!isMobile && 'Курсы'}
                    </TabItem>
                  </TabContainer>
                  
                  {activeTabDinar === 'biography' && (
                    <TabContent>
                      <p>
                        Меня зовут Динара, я практикующий психолог и консультант. Работаю в индивидуальном и групповом формате, онлайн и офлайн. Помогаю тем, кто находится в поиске опоры, хочет лучше понять себя, выйти из внутреннего тупика, повысить самооценку и справиться с эмоциональными трудностями.
                      </p>
                      
                      <ContentSection>
                        <SectionHeading>Мой подход</SectionHeading>
                        <p>В своей работе я использую интегративный подход:</p>
                        <StyledList>
                          <ListItem>Психодиагностика личности</ListItem>
                          <ListItem>Кризисная психология</ListItem>
                          <ListItem>Релифтерапия</ListItem>
                          <ListItem>Расстановки</ListItem>
                          <ListItem>Техники ресурсирования</ListItem>
                          <ListItem>Работа с прокрастинацией и незавершёнными делами</ListItem>
                          <ListItem>Сопровождение в темах самооценки, женской энергии, отношений и личностного роста</ListItem>
                        </StyledList>
                        <p>Также провожу глубокие консультации с помощью МАК-карт — это мощный инструмент для доступа к бессознательному и нахождения внутренних ресурсов.</p>
                      </ContentSection>
                      
                      <ContentSection>
                        <SectionHeading>Чем я могу быть полезна</SectionHeading>
                        <StyledList>
                          <ListItem>Индивидуальные консультации</ListItem>
                          <ListItem>МАК-терапия</ListItem>
                          <ListItem>Расстановки</ListItem>
                          <ListItem>Поддержка в кризисных состояниях</ListItem>
                          <ListItem>Работа с самооценкой и внутренним критиком</ListItem>
                          <ListItem>Помощь при ощущении внутреннего застоя и прокрастинации</ListItem>
                        </StyledList>
                      </ContentSection>
                    </TabContent>
                  )}
                  
                  {activeTabDinar === 'about' && (
                    <TabContent>
                      <ContentSection>
                        <SectionHeading>Обо мне</SectionHeading>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-primary-dark)', marginBottom: '0.2rem' }}>
                            Саидова Динара
                          </p>
                          <p style={{ color: 'var(--color-text)' }}>
                            Практикующий психолог и консультант<br />
                            Специалист по личностной трансформации<br />
                          </p>
                        </div>
                        
                        <p>
                          Моя миссия – помогать людям обрести внутреннюю опору и лучше понять себя. 
                          Я верю в то, что каждый человек имеет все необходимые ресурсы для счастливой 
                          и гармоничной жизни, и моя задача – помочь вам раскрыть этот потенциал.
                        </p>
                        
                        <ContentSection>
                          <SectionHeading>Профессиональный опыт</SectionHeading>
                          <p>
                            Имею многолетний опыт работы с различными клиентскими запросами, от решения личностных кризисов 
                            до трансформации жизненных сценариев. Особое внимание я уделяю работе с самооценкой, 
                            внутренним критиком и развитием личностного потенциала.
                          </p>
                          <p>
                            Мой интегративный подход включает различные психологические методики, что позволяет 
                            подобрать наиболее эффективные инструменты именно для вашего случая.
                          </p>
                        </ContentSection>
                        
                        <ContentSection>
                          <SectionHeading>Направления работы</SectionHeading>
                          <StyledList>
                            <ListItem>
                              <strong>Индивидуальное консультирование:</strong>
                              <p>Глубинная работа с личностными запросами, помощь в преодолении кризисов и поиске внутренних ресурсов.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>МАК-терапия:</strong>
                              <p>Использование метафорических ассоциативных карт для доступа к бессознательному и решения глубинных вопросов.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>Расстановки:</strong>
                              <p>Работа с семейными системами и личностными ограничениями через системные расстановки.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>Работа с самооценкой:</strong>
                              <p>Преодоление внутреннего критика, формирование здорового отношения к себе и развитие уверенности.</p>
                            </ListItem>
                          </StyledList>
                        </ContentSection>
                      </ContentSection>
                    </TabContent>
                  )}
                  
                  {activeTabDinar === 'education' && (
                    <TabContent>
                      <ContentSection>
                        <SectionHeading>Образование и подготовка</SectionHeading>
                        <StyledList>
                          <ListItem>28 модулей в Академии НАТПО:
                            <ul>
                              <li>Семейная психология</li>
                              <li>Возрастная психология</li>
                              <li>Детская психология</li>
                              <li>Психология личности</li>
                              <li>Клиническая психология и др.</li>
                            </ul>
                          </ListItem>
                          <ListItem>Курсы по психодиагностике</ListItem>
                          <ListItem>Специализация по кризисной психологии</ListItem>
                          <ListItem>Обучение релифтерапии</ListItem>
                          <ListItem>Обучение системным расстановкам</ListItem>
                          <ListItem>Постоянное профессиональное развитие и освоение новых техник и подходов</ListItem>
                        </StyledList>
                        
                        <p style={{ marginTop: '2rem' }}>
                          Я непрерывно совершенствую свои профессиональные навыки, регулярно участвую в супервизиях и обучаюсь 
                          современным методикам психологической помощи. Это позволяет мне предоставлять клиентам 
                          наиболее эффективные и актуальные инструменты для решения их запросов.
                        </p>
                      </ContentSection>
                    </TabContent>
                  )}
                  
                  {activeTabDinar === 'courses' && (
                    <TabContent>
                      <ContentSection>
                        <SectionHeading>Преподаваемые курсы</SectionHeading>
                        <CoursesGrid>
                          {dinarCourses.map(course => (
                            <CourseCard 
                              key={course.id}
                              onClick={() => handleOpenDinarCourseModal(course.id)}
                            >
                              {course.price && <CourseBadge>{course.price}</CourseBadge>}
                              <CourseContent>
                                <CourseInfo>
                                  <CourseTitle>{course.title}</CourseTitle>
                                  <CourseDescription>{course.description}</CourseDescription>
                                  {course.duration && (
                                    <div style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                      <strong>Продолжительность:</strong> {course.duration}
                                    </div>
                                  )}
                                </CourseInfo>
                                <div>
                                <CourseToggle>
                                  Подробнее о курсе <FaInfoCircle />
                                </CourseToggle>
                                  <EnrollButton onClick={(e) => scrollToContactForm(e)}>
                                    Записаться на курс <FaArrowDown />
                                  </EnrollButton>
                                </div>
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
          )}
          
          {/* Добавляем информацию о Юлии */}
          {activeTeacher === 'julia' && (
            <motion.div
              ref={ref}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              layoutId="teacherCard"
              style={{ width: '100%' }}
            >
              <TeacherCard>
                <CardHeader>
                  <JuliaCardHeaderImg src="/images/teacher3.jpg" alt="Юлия Гайдаева" />
                  <TeacherInfo>
                    <TeacherName>Юлия Гайдаева (Кочаш)</TeacherName>
                    <TeacherTitle>Психолог-консультант, гипнолог, арт-терапевт</TeacherTitle>
                  </TeacherInfo>
                </CardHeader>
                
                <CardBody>
                  <DesktopTeacherName>Юлия Гайдаева (Кочаш)</DesktopTeacherName>
                  <DesktopTeacherTitle>Психолог-консультант, гипнолог, арт-терапевт</DesktopTeacherTitle>
                  
                  <TabContainer>
                    <TabItem 
                      active={activeTabJulia === 'biography'} 
                      onClick={() => handleTabChangeJulia('biography')}
                    >
                      <TabIcon><FaUserAlt /></TabIcon>
                      {!isMobile && 'Биография'}
                    </TabItem>
                    <TabItem 
                      active={activeTabJulia === 'about'} 
                      onClick={() => handleTabChangeJulia('about')}
                    >
                      <TabIcon><FaIdCard /></TabIcon>
                      {!isMobile && 'Обо мне'}
                    </TabItem>
                    <TabItem 
                      active={activeTabJulia === 'education'} 
                      onClick={() => handleTabChangeJulia('education')}
                    >
                      <TabIcon><FaGraduationCap /></TabIcon>
                      {!isMobile && 'Образование'}
                    </TabItem>
                    <TabItem 
                      active={activeTabJulia === 'courses'} 
                      onClick={() => handleTabChangeJulia('courses')}
                    >
                      <TabIcon><FaBook /></TabIcon>
                      {!isMobile && 'Курсы'}
                    </TabItem>
                  </TabContainer>
                  
                  {activeTabJulia === 'biography' && (
                    <TabContent>
                      <p>
                        Я, Юлия Гайдаева (Кочаш), психолог-консультант, гипнолог, арт-терапевт, также работаю в методе ольфактотерапии (психологическая работа через эфирные масла).
                      </p>
                      
                      <p>
                        Я являюсь действительным членом ОППЛ (Профессиональная психотерапевтическая лига), постоянно прохожу супервизии и личную терапию, повышаю квалификацию.
                      </p>
                      
                      <p>
                        В работе использую интегративный подход (КПТ, EFT, гипнотерапия, арт-терапия и другое).
                      </p>
                      
                      <ContentSection>
                        <SectionHeading>Чаще всего ко мне приходят с вопросами</SectionHeading>
                        <StyledList>
                          <ListItem>Семейные проблемы и кризисы</ListItem>
                          <ListItem>Проблемы в отношениях (семейных, партнерских, социальных и т.д.)</ListItem>
                          <ListItem>Немедицинские проблемы сексуального характера и другие трудности в сексуальной сфере</ListItem>
                          <ListItem>Возрастные кризисы, поиск смыслов</ListItem>
                          <ListItem>Вопросы поиска себя, своей идентичности, самореализация</ListItem>
                          <ListItem>Самооценка и самоценность</ListItem>
                          <ListItem>Помогаю вырастить «внутреннего взрослого» и для подростков; вопросы взросления</ListItem>
                          <ListItem>Переезд, эмиграция</ListItem>
                          <ListItem>Прокрастинация, панические атаки</ListItem>
                          <ListItem>Стресс, фобии</ListItem>
                          <ListItem>Трудности в эмоциональной регуляции: гнев, обида, стыд, вина, страх, тревога и т.д.</ListItem>
                          <ListItem>Созависимые отношения, трудности сепарации</ListItem>
                        </StyledList>
                        <p>И многое другое.</p>
                        <p>Я работаю с подростками от 10 лет в рамках семейной терапии и со взрослыми.</p>
                      </ContentSection>
                    </TabContent>
                  )}
                  
                  {activeTabJulia === 'about' && (
                    <TabContent>
                      <ContentSection>
                        <SectionHeading>Обо мне</SectionHeading>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-primary-dark)', marginBottom: '0.2rem' }}>
                            Юлия Гайдаева (Кочаш)
                          </p>
                          <p style={{ color: 'var(--color-text)' }}>
                            Психолог-консультант, гипнолог, арт-терапевт<br />
                            Специалист по ольфактотерапии<br />
                          </p>
                        </div>
                        
                        <p>
                          Также в рамках отдельных сессий можем составить генограмму вашей семьи, чтобы проследить сценарии семьи и рода.
                        </p>
                        <p>
                          Провожу онлайн кинотренинги и трансформационные игры.
                        </p>
                        
                        <ContentSection>
                          <SectionHeading>Направления работы</SectionHeading>
                          <StyledList>
                            <ListItem>
                              <strong>Индивидуальное консультирование:</strong>
                              <p>Глубинная работа с личностными запросами, помощь в преодолении кризисов и поиске внутренних ресурсов.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>Гипнотерапия:</strong>
                              <p>Использование методов эриксоновского гипноза для работы с подсознанием и глубинными проблемами.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>Арт-терапия:</strong>
                              <p>Творческий подход к решению психологических проблем через различные формы искусства.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>Ольфактотерапия:</strong>
                              <p>Уникальная методика работы с психикой человека через восприятие ароматов эфирных масел.</p>
                            </ListItem>
                          </StyledList>
                        </ContentSection>
                      </ContentSection>
                    </TabContent>
                  )}
                  
                  {activeTabJulia === 'education' && (
                    <TabContent>
                      <ContentSection>
                        <SectionHeading>Образование и подготовка</SectionHeading>
                        <p>
                          Я являюсь действительным членом ОППЛ (Профессиональная психотерапевтическая лига), постоянно прохожу супервизии и личную терапию, повышаю квалификацию.
                        </p>
                        
                        <ContentSection>
                          <SectionHeading>Мои краткосрочные психологические тренинги</SectionHeading>
                          <StyledList>
                            <ListItem>«Я и моя самооценка»</ListItem>
                            <ListItem>Стеклянный потолок моих финансов. Преодоление</ListItem>
                            <ListItem>Самогипноз через метафоры</ListItem>
                            <ListItem>Сказкотерапия для мам</ListItem>
                          </StyledList>
                        </ContentSection>
                      </ContentSection>
                    </TabContent>
                  )}
                  
                  {activeTabJulia === 'courses' && (
                    <TabContent>
                      <ContentSection>
                        <SectionHeading>Преподаваемые курсы</SectionHeading>
                        <CoursesGrid>
                          {juliaCourses.map(course => (
                            <CourseCard 
                              key={course.id}
                              onClick={() => handleOpenJuliaCourseModal(course.id)}
                            >
                              {course.price && <CourseBadge>{course.price}</CourseBadge>}
                              <CourseContent>
                                <CourseInfo>
                                  <CourseTitle>{course.title}</CourseTitle>
                                  <CourseDescription>{course.description}</CourseDescription>
                                  {course.duration && (
                                    <div style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                      <strong>Продолжительность:</strong> {course.duration}
                                    </div>
                                  )}
                                </CourseInfo>
                                <div>
                                  <CourseToggle>
                                    Подробнее о курсе <FaInfoCircle />
                                  </CourseToggle>
                                  <EnrollButton onClick={(e) => scrollToContactForm(e)}>
                                    Записаться на курс <FaArrowDown />
                                  </EnrollButton>
                                </div>
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
          )}
          
          {/* Добавляем информацию о Инаре */}
          {activeTeacher === 'inara' && (
            <motion.div
              ref={ref}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              layoutId="teacherCard"
              style={{ width: '100%' }}
            >
              <TeacherCard>
                <CardHeader>
                  <InaraCardHeaderImg src="/images/teacher4.jpg" alt="Инара Абдуллаева" />
                  <TeacherInfo>
                    <TeacherName>Инара Абдуллаева</TeacherName>
                    <TeacherTitle>Подростковый и семейный психотерапевт</TeacherTitle>
                  </TeacherInfo>
                </CardHeader>
                
                <CardBody>
                  <DesktopTeacherName>Инара Абдуллаева</DesktopTeacherName>
                  <DesktopTeacherTitle>Подростковый и семейный психотерапевт</DesktopTeacherTitle>
                  
                  <TabContainer>
                    <TabItem 
                      active={activeTabInara === 'biography'} 
                      onClick={() => handleTabChangeInara('biography')}
                    >
                      <TabIcon><FaUserAlt /></TabIcon>
                      {!isMobile && 'Биография'}
                    </TabItem>
                    <TabItem 
                      active={activeTabInara === 'about'} 
                      onClick={() => handleTabChangeInara('about')}
                    >
                      <TabIcon><FaIdCard /></TabIcon>
                      {!isMobile && 'Обо мне'}
                    </TabItem>
                    <TabItem 
                      active={activeTabInara === 'education'} 
                      onClick={() => handleTabChangeInara('education')}
                    >
                      <TabIcon><FaGraduationCap /></TabIcon>
                      {!isMobile && 'Образование'}
                    </TabItem>
                    <TabItem 
                      active={activeTabInara === 'courses'} 
                      onClick={() => handleTabChangeInara('courses')}
                    >
                      <TabIcon><FaBook /></TabIcon>
                      {!isMobile && 'Курсы'}
                    </TabItem>
                  </TabContainer>
                  
                  {activeTabInara === 'biography' && (
                    <TabContent>
                      <p>
                        Меня зовут, Инара Абдуллаева
                        Я — подростковый и семейный психотерапевт, член АРТ-сообщества России и Общероссийской Профессиональной Психотерапевтической Лиги (ОППЛ).
                      </p>
                      
                      <p>
                        Уже много лет я сопровождаю подростков, детей старшего школьного возраста и их родителей, помогая им находить общий язык, восстанавливать доверие и строить тёплые, искренние отношения.
                      </p>
                      
                      <ContentSection>
                        <SectionHeading>В работе я сочетаю</SectionHeading>
                        <StyledList>
                          <ListItem>творческие техники и элементы арт-терапии</ListItem>
                          <ListItem>трансформационные психологические игры</ListItem>
                          <ListItem>телесно-ориентированные практики</ListItem>
                        </StyledList>
                      </ContentSection>
                      
                      <p>
                        Я верю, что каждый подросток — это отдельная Вселенная, требующая бережного и внимательного подхода.<br />
                        На курсе я делюсь тем, что отработала в практике: как через творчество, тело и игру выстраивать эффективную работу с подростками и семьями, даже в условиях онлайн-формата.
                      </p>
                      
                      <p>
                        Моя миссия — научить студентов видеть глубже, работать тоньше и помогать там, где особенно важно быть рядом.
                      </p>
                    </TabContent>
                  )}
                  
                  {activeTabInara === 'about' && (
                    <TabContent>
                      <ContentSection>
                        <SectionHeading>Обо мне</SectionHeading>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-primary-dark)', marginBottom: '0.2rem' }}>
                            Инара Абдуллаева
                          </p>
                          <p style={{ color: 'var(--color-text)' }}>
                            Подростковый и семейный психотерапевт<br />
                            Член АРТ-сообщества России и ОППЛ<br />
                            Языки: Русский, азербайджанский
                          </p>
                        </div>
                        
                        <p>
                          Работаю в интегративном подходе. Для каждого клиента- индивидуальный подход.
                          Мой подход позволяет увидеть достаточно быстро суть запроса и подобрать такие методики, которые помогают найти внутренние опоры для решение задач и выхода из различных ситуаций.
                          В результате нашей совместной работы вы сможете разобраться, в чём внутренняя причина ваших затруднений, и что мешает вам жить так, как вы хотите.
                        </p>
                        
                        <ContentSection>
                          <SectionHeading>Подходы в работе</SectionHeading>
                          <StyledList>
                            <ListItem>
                              <strong>Арт терапия:</strong>
                              <p>Во время сеанса арт-терапии на эмоциональное состояние пациента воздействует искусство. Сеансы проводит арт-терапевт, который помогает пациенту выбросить негативные эмоции, расслабиться, раскрыть творческий потенциал, найти решение текущей проблемы.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>Мак терапия:</strong>
                              <p>Особый инструмент арт-терапии, работа с которым основывается на принципах и постулатах проективных методик. Преимущество МАК в сравнении с другими методами арт-терапии, заключается в том, что в них отсутствуют закрепленные значения. Каждый человек в процессе работы сам определяет их смысл.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>Кризисная психология:</strong>
                              <p>Тот момент, когда привычные методы справляться с трудностями перестают работать. Такое может случиться в любой области нашей жизни: будь то личные отношения, карьера или эмоции. Причины для кризиса бывают разные: потеря работы, расставание, болезнь, утрата близких людей и многое другое.</p>
                            </ListItem>
                            
                            <ListItem>
                              <strong>Рилив терапия:</strong>
                              <p>Основной метод данной терапии сводится к вопрошающему диалогу, направленному на поиск травмы.</p>
                            </ListItem>
                          </StyledList>
                        </ContentSection>
                        
                        <ContentSection>
                          <SectionHeading>Преподаватель курсов</SectionHeading>
                          <StyledList>
                            <ListItem>Мак терапия</ListItem>
                            <ListItem>Арт терапия</ListItem>
                            <ListItem>Кризисная психология</ListItem>
                            <ListItem>Методики консультирования</ListItem>
                            <ListItem>Зависимый в семье, не приговор</ListItem>
                          </StyledList>
                        </ContentSection>
                        
                        <ContentSection>
                          <SectionHeading>Игропрактика</SectionHeading>
                          <p>
                            Также являюсь игропрактиком. Участвовала на фестивале "Расширение Азербайджан" ведущим игры "Риторический покер".
                            Преподаватель теоретической части курса "Игропрактик" в МШИ представительство Азербайджана.
                            Провожу трансформационные игры затрагивающие все важные аспекты жизни человека.
                            Такие как: карьера, отношения, личностный рост, предназначение и т.д.
                          </p>
                        </ContentSection>
                        
                        <ContentSection>
                          <SectionHeading>Авторские курсы</SectionHeading>
                          <StyledList>
                            <ListItem>Зависимый в семье, не приговор (как подружиться с созависимостью)</ListItem>
                            <ListItem>Арт-Мак терапия в работе с зависимыми</ListItem>
                          </StyledList>
                        </ContentSection>
                        
                        <ContentSection>
                          <SectionHeading>Профессиональный опыт</SectionHeading>
                          <StyledList>
                            <ListItem>Более 3х лет работаю в реабилитационном центре для зависимых, психологом для семей зависимых.</ListItem>
                            <ListItem>Более 200 положительных отзывов.</ListItem>
                            <ListItem>Провела более 20 семинаров на темы:
                              <ul>
                                <li>Я концепция</li>
                                <li>Созависимость и жизнь с зависимым</li>
                                <li>Цветок женственности и т.д.</li>
                              </ul>
                            </ListItem>
                            <ListItem>Организовала 3 ретрита с выездом за город.</ListItem>
                          </StyledList>
                        </ContentSection>
                      </ContentSection>
                    </TabContent>
                  )}
                  
                  {activeTabInara === 'education' && (
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
                  
                  {activeTabInara === 'courses' && (
                    <TabContent>
                      <ContentSection>
                        <SectionHeading>Преподаваемые курсы</SectionHeading>
                        <CoursesGrid>
                          {inaraCourses.map(course => (
                            <CourseCard 
                              key={course.id}
                              onClick={() => handleOpenInaraCourseModal(course.id)}
                            >
                              {course.price && <CourseBadge>{course.price}</CourseBadge>}
                              <CourseContent>
                                <CourseInfo>
                                  <CourseTitle>{course.title}</CourseTitle>
                                  <CourseDescription>{course.description}</CourseDescription>
                                  {course.duration && (
                                    <div style={{ marginTop: '0.8rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                      <strong>Продолжительность:</strong> {course.duration}
                                    </div>
                                  )}
                                </CourseInfo>
                                <div>
                                  <CourseToggle>
                                    Подробнее о курсе <FaInfoCircle />
                                  </CourseToggle>
                                  <EnrollButton onClick={(e) => scrollToContactForm(e)}>
                                    Записаться на курс <FaArrowDown />
                                  </EnrollButton>
                                </div>
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
          )}
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
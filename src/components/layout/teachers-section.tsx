import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import media from '../../styles/media';
import { FaGraduationCap, FaBook, FaUserAlt, FaTimes, FaInfoCircle, FaIdCard } from 'react-icons/fa';
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
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(217,178,147,0.05)' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
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
  width: 100%;
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  ${media.sm} {
    border-radius: 18px;
  }
  
  ${media.xs} {
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
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

// Хедер карточки с фото преподавателя
const CardHeader = styled.div`
  position: relative;
  height: 450px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  
  ${media.md} {
    height: 420px;
  }
  
  ${media.sm} {
    height: 400px;
    border-radius: 16px 16px 0 0;
  }
  
  ${media.xs} {
    height: 380px;
  }
`;

// Альтернативное изображение для Динар, вместо фонового изображения
const CardHeaderImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 10%;
  filter: brightness(0.9);
`;

// Сохраняем текущий CardHeaderImage для Шамамы
const CardHeaderImage = styled.div<{ bgImage?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${props => props.bgImage ? `url('${props.bgImage}')` : "url('/images/teacher.jpg')"};
  background-size: cover;
  background-position: center 25%;
  filter: brightness(0.9);
  
  ${media.sm} {
    background-position: center 20%;
  }
  
  ${media.xs} {
    background-position: 45% 20%;
  }
`;

// Восстанавливаю градиентный фон для имени и должности
const TeacherInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%);
  color: white;
  
  ${media.sm} {
    padding: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const TeacherName = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  ${media.md} {
    font-size: 2.25rem;
  }
  
  ${media.sm} {
    font-size: 2rem;
    text-align: center;
    padding: 0 0.5rem;
  }
  
  ${media.xs} {
    font-size: 1.75rem;
  }
`;

const TeacherTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  
  ${media.md} {
    font-size: 1.15rem;
  }
  
  ${media.sm} {
    font-size: 1.1rem;
    text-align: center;
    padding: 0 0.5rem;
  }
  
  ${media.xs} {
    font-size: 1rem;
  }
`;

// Тело карточки с табами и контентом
const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  ${media.sm} {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-bottom: 1.5rem;
    padding-bottom: 2px;
    justify-content: center;
    gap: 0.5rem;
    
    &::-webkit-scrollbar {
      height: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }
  }
`;

const TabItem = styled.button<{ active: boolean }>`
  padding: 1rem 1.5rem;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  font-weight: ${props => (props.active ? '600' : '400')};
  color: ${props => (props.active ? 'var(--color-primary)' : '#555')};
  border-bottom: 3px solid ${props => (props.active ? 'var(--color-primary)' : 'transparent')};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--color-primary);
  }
  
  ${media.md} {
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
  }
  
  ${media.sm} {
    padding: 0.7rem 1rem;
    font-size: 0.95rem;
    flex: none;
    min-width: 60px;
  }
  
  ${media.xs} {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
    min-width: 50px;
  }
`;

const TabIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
  
  ${media.sm} {
    margin-bottom: 0;
    font-size: 1.1rem;
  }
`;

// Контент табов
const TabContent = styled.div`
  padding: 2.5rem;
  line-height: 1.8;
  color: var(--color-text);
  max-height: 520px;
  overflow-y: auto;
  text-align: center;
  
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
    text-align: center;
  }
  
  ${media.md} {
    padding: 2rem;
    max-height: 550px;
  }
  
  ${media.sm} {
    padding: 1.5rem;
    font-size: 0.95rem;
    max-height: 450px;
    
    p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
  
  ${media.xs} {
    padding: 1.2rem;
    max-height: 400px;
    
    p {
      font-size: 0.95rem;
      margin-bottom: 0.8rem;
      line-height: 1.6;
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
  gap: 2.5rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
  
  ${media.sm} {
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
`;

const AvatarWrapper = styled.div<{ isActive: boolean }>`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: ${({ isActive }) => 
    isActive 
      ? '0 0 0 4px var(--color-primary), 0 10px 20px rgba(0, 0, 0, 0.15)' 
      : '0 5px 15px rgba(0, 0, 0, 0.1)'};
  transition: all 0.4s ease;
  transform: ${({ isActive }) => isActive ? 'scale(1.05)' : 'scale(1)'};
  
  &:hover {
    transform: ${({ isActive }) => isActive ? 'scale(1.05)' : 'scale(1.02)'};
    box-shadow: ${({ isActive }) => 
      isActive 
        ? '0 0 0 4px var(--color-primary), 0 15px 25px rgba(0, 0, 0, 0.2)' 
        : '0 8px 20px rgba(0, 0, 0, 0.15)'};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
    opacity: ${({ isActive }) => isActive ? '1' : '0.7'};
    transition: opacity 0.3s ease;
  }
  
  ${media.md} {
    width: 140px;
    height: 140px;
  }
  
  ${media.sm} {
    width: 120px;
    height: 120px;
  }
  
  ${media.xs} {
    width: 100px;
    height: 100px;
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
  
  ${media.xs} {
    font-size: 0.9rem;
    bottom: 8px;
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
      modules: [
        { id: 1, title: "Модуль 1: Личностные расстройства", content: "Нарциссическое расстройство личности, Шизоидное расстройство личности, Паранояльная структура личности, Истероидная структура личности, Эмотивный тип личности, Обсессивно-компульсивный тип личности" },
        { id: 2, title: "Модуль 2: Профайлинг и распознавание поведенческих паттернов", content: "Введение в профайлинг, Невербальные признаки и язык тела, Психотипы и профайлинг личности, Работа в конфликте, Профайлинг в практике психолога" }
      ]
    },
    {
      id: 2,
      title: "Коучинг как искусство сопровождения и трансформации",
      description: "Освойте ключевые навыки коуча, научитесь проводить эффективные сессии, раскрывать потенциал клиента и сопровождать его в достижении целей.",
      price: "400$",
      benefits: [
        "Основы коучинга: философия, цели и отличие от терапии",
        "Структура коуч-сессии: от запроса к результату",
        "Искусство коучинговых вопросов",
        "Активное слушание и глубокое присутствие",
        "Работа с ограничивающими убеждениями",
        "Энергия и состояние коуча",
        "Работа с целями, результатами и мотивацией",
        "Практика и супервизия"
      ]
    },
    {
      id: 3,
      title: "Семейная психология: динамика, конфликты, близость",
      description: "Пройдите путь от теории к практике семейной психологии: поймите динамику отношений, научитесь диагностировать и решать семейные конфликты.",
      price: "500$",
      benefits: [
        "Основы семейной психологии",
        "Этапы развития семьи и семейные кризисы",
        "Привязанность и её влияние на отношения",
        "Созависимость и сепарация",
        "Коммуникация в паре: слушать и слышать",
        "Конфликты и работа с агрессией",
        "Секс, близость и эмоциональная дистанция",
        "Измена: причины, реакции, восстановление",
        "Родительство и партнёрство",
        "Практика семейного консультирования"
      ]
    }
  ];

  // Состояние для вкладок каждого преподавателя
  const [activeTabShamama, setActiveTabShamama] = useState('biography');
  const [activeTabDinar, setActiveTabDinar] = useState('biography');
  
  // Состояние для активного преподавателя
  const [activeTeacher, setActiveTeacher] = useState<'shamama' | 'dinar'>('shamama');
  
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // Изменим на false, чтобы анимация запускалась каждый раз
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  // Обработчики вкладок для каждого преподавателя
  const handleTabChangeShamama = (tab: string) => {
    setActiveTabShamama(tab);
  };
  
  const handleTabChangeDinar = (tab: string) => {
    setActiveTabDinar(tab);
  };
  
  // Обработчик переключения преподавателя
  const handleTeacherChange = (teacher: 'shamama' | 'dinar') => {
    // Сначала проверяем, не выбран ли уже этот преподаватель
    if (activeTeacher === teacher) return;
    
    // Анимируем исчезновение, затем меняем преподавателя и анимируем появление
    controls.start({
      opacity: 0,
      y: 20,
      transition: { duration: 0.2, ease: 'easeOut' }
    }).then(() => {
      setActiveTeacher(teacher);
      
      // Небольшая задержка перед анимацией появления, чтобы DOM успел обновиться
      setTimeout(() => {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: 'easeOut' }
        });
      }, 50);
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
          <AnimatedElement animation="fadeInUp" delay={0.2}>
            <AvatarWrapper 
              isActive={activeTeacher === 'shamama'} 
              onClick={() => handleTeacherChange('shamama')}
            >
              <AvatarImage src="/images/teacher.jpg" alt="Гафарова Шамама" isSecondTeacher={false} />
              <AvatarName>Шамама</AvatarName>
            </AvatarWrapper>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInUp" delay={0.4}>
            <AvatarWrapper 
              isActive={activeTeacher === 'dinar'} 
              onClick={() => handleTeacherChange('dinar')}
            >
              <AvatarImage src="/images/teacher2.jpg" alt="Саидова Динара" isSecondTeacher={true} />
              <AvatarName>Динара</AvatarName>
            </AvatarWrapper>
          </AnimatedElement>
        </TeachersAvatarsContainer>
        
        <TeacherGrid>
          {/* Информация о Шамаме */}
          {activeTeacher === 'shamama' && (
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              style={{ width: '100%' }}
            >
              <TeacherCard>
                <CardHeader>
                  <CardHeaderImage bgImage="/images/teacher.jpg" />
                  <TeacherInfo>
                    <TeacherName>Гафарова Шамама</TeacherName>
                    <TeacherTitle>Социальный и кризисный психолог, игропрактик</TeacherTitle>
                  </TeacherInfo>
                </CardHeader>
                
                <CardBody>
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
          )}
          
          {/* Информация о Динаре */}
          {activeTeacher === 'dinar' && (
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              style={{ width: '100%' }}
            >
              <TeacherCard>
                <CardHeader>
                  <CardHeaderImg src="/images/teacher2.jpg" alt="Саидова Динара" />
                  <TeacherInfo>
                    <TeacherName>Саидова Динара</TeacherName>
                    <TeacherTitle>Практикующий психолог и консультант</TeacherTitle>
                  </TeacherInfo>
                </CardHeader>
                
                <CardBody>
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
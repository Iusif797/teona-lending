import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import media from '../../styles/media';
import { FaGraduationCap, FaBook, FaUserAlt, FaTimes, FaInfoCircle } from 'react-icons/fa';
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
  height: 780px;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 75%;
    background: linear-gradient(to top, 
      rgba(0, 0, 0, 0.95) 0%, 
      rgba(0, 0, 0, 0.85) 10%,
      rgba(0, 0, 0, 0.7) 20%,
      rgba(0, 0, 0, 0.5) 35%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.1) 75%,
      transparent 100%);
    z-index: 1;
  }
  
  ${media.lg} {
    height: 700px;
  }
  
  ${media.md} {
    height: 650px;
  }
  
  ${media.sm} {
    height: 600px;
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
  background-position: center 12%;
  transition: transform 1.2s ease;
  filter: saturate(1.05) contrast(1.05);
  transform-origin: center center;
  
  ${TeacherCard}:hover & {
    transform: scale(1.08);
    filter: saturate(1.1) contrast(1.08);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(0, 0, 0, 0.1) 0%, 
      rgba(0, 0, 0, 0) 40%);
    transition: opacity 0.5s ease;
  }
`;

const TeacherInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 3rem;
  z-index: 2;
  color: white;
  transform: translateY(0);
  transition: transform 0.5s ease;
  
  ${TeacherCard}:hover & {
    transform: translateY(-8px);
  }
  
  ${media.sm} {
    padding: 2rem;
  }
`;

const TeacherName = styled.h3`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.5px;
  line-height: 1.2;
  color: white;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent);
  padding: 0.7rem 1.5rem;
  border-radius: 12px;
  display: inline-block;
  transform: translateX(0);
  transition: transform 0.5s ease;
  
  ${TeacherCard}:hover & {
    transform: translateX(5px);
  }
  
  ${media.md} {
    font-size: 3rem;
    padding: 0.6rem 1.2rem;
  }
  
  ${media.sm} {
    font-size: 2.4rem;
    padding: 0.5rem 1rem;
  }
`;

const TeacherTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  opacity: 0.95;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  max-width: 90%;
  padding-left: 1.5rem;
  
  ${media.md} {
    font-size: 1.4rem;
    padding-left: 1.2rem;
  }
  
  ${media.sm} {
    font-size: 1.2rem;
    padding-left: 1rem;
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
    gap: 2rem;
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
      modules: [
        { id: 1, title: "Модуль 1: вводная часть", content: "Знакомство с основами арт-терапии, историей развития направления и базовыми теоретическими концепциями. Обзор различных подходов и методов." },
        { id: 2, title: "Модуль 2: мандала-терапия", content: "Изучение техник работы с мандалами, их диагностический и терапевтический потенциал. Практика создания и интерпретации мандал." },
        { id: 3, title: "Модуль 3: сказка терапия", content: "Методики работы со сказками, сочинение терапевтических историй, анализ и трансформация сказочных сюжетов для решения психологических проблем." },
        { id: 4, title: "Модуль 4: фототерапия", content: "Использование фотографии в психологической практике, техники фототерапии и фотопроекции, работа с семейным фотоальбомом." },
        { id: 5, title: "Модуль 5: изотерапия", content: "Работа с различными изобразительными материалами, техники рисования и их применение для диагностики и терапии эмоциональных проблем." },
        { id: 6, title: "Модуль 6: кинотерапия", content: "Терапевтический потенциал кино, подбор фильмов для работы с различными запросами, методики обсуждения и анализа кинопроизведений." },
        { id: 7, title: "Модуль 7: метафорические ассоциативные карты", content: "Теория и практика работы с МАК, виды карт, базовые и продвинутые техники использования в индивидуальной и групповой работе." },
        { id: 8, title: "Модуль 8: маска терапия", content: "Создание и использование масок в психотерапевтической работе, символизм масок, работа с ролями и идентичностью." },
        { id: 9, title: "Модуль 9: музыкотерапия", content: "Влияние музыки на психофизиологическое состояние человека, активные и рецептивные техники музыкотерапии." },
        { id: 10, title: "Модуль 10: проработка кейсов", content: "Разбор практических случаев, обсуждение стратегий работы, отработка навыков применения арт-терапевтических методик." },
        { id: 11, title: "Модуль 11: супервизия", content: "Групповая и индивидуальная супервизия, обсуждение сложных случаев, профессиональная поддержка участников." },
        { id: 12, title: "Модуль 12: экзамен для проверки усвоения курса", content: "Итоговая проверка усвоения материала, защита проектов, обратная связь от преподавателя." }
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
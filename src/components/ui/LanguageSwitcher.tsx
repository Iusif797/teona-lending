import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTranslation } from 'react-i18next';

// Стилизованные компоненты
const SwitcherContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 20px;
`;

const CurrentLanguage = styled.button`
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: var(--font-primary);
  
  &:hover {
    background: rgba(217, 178, 147, 0.1);
    box-shadow: 0 4px 8px rgba(217, 178, 147, 0.2);
    transform: translateY(-2px);
  }
`;

const LanguageFlag = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const LanguagesDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  padding: 8px 0;
  z-index: 100;
  min-width: 150px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  margin-top: 8px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-10px);
  animation: ${({ isOpen }) => (isOpen ? 'dropdownFadeIn 0.3s forwards' : 'none')};
  
  @keyframes dropdownFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    right: 15px;
    width: 12px;
    height: 12px;
    background: #fff;
    border-left: 1px solid var(--color-border);
    border-top: 1px solid var(--color-border);
    transform: rotate(45deg);
  }
`;

const LanguageOption = styled.button<{ isActive: boolean }>`
  background: ${({ isActive }) =>
    isActive ? 'rgba(217, 178, 147, 0.1)' : 'transparent'};
  border: none;
  color: var(--color-text);
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
  font-family: var(--font-primary);
  
  &:hover {
    background: rgba(217, 178, 147, 0.1);
  }
  
  ${({ isActive }) => isActive && `
    font-weight: 500;
    color: var(--color-primary);
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: var(--color-primary);
    }
  `}
`;

// Компоненты флагов
const RussianFlag = () => (
  <svg width="20" height="20" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
    <g fillRule="evenodd" strokeWidth="1pt">
      <path fill="#fff" d="M0 0h640v480H0z"/>
      <path fill="#0039a6" d="M0 160h640v320H0z"/>
      <path fill="#d52b1e" d="M0 320h640v160H0z"/>
    </g>
  </svg>
);

const UKFlag = () => (
  <svg width="20" height="20" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
    <path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
  </svg>
);

// Главный компонент
const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Обработчик для закрытия выпадающего списка при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Варианты языков
  const languages = [
    { code: 'ru', label: 'Русский', flag: <RussianFlag /> },
    { code: 'en', label: 'English', flag: <UKFlag /> },
  ];

  // Текущий выбранный язык
  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <SwitcherContainer ref={dropdownRef}>
      <CurrentLanguage
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('header.language')}
      >
        <LanguageFlag>{currentLanguage.flag}</LanguageFlag>
      </CurrentLanguage>
      
      <LanguagesDropdown isOpen={isOpen}>
        {languages.map((lang) => (
          <LanguageOption
            key={lang.code}
            isActive={lang.code === language}
            onClick={() => {
              changeLanguage(lang.code);
              setIsOpen(false);
            }}
          >
            <LanguageFlag style={{ marginRight: '10px' }}>{lang.flag}</LanguageFlag>
            {lang.label}
          </LanguageOption>
        ))}
      </LanguagesDropdown>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher; 
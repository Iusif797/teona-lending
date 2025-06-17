import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import i18n from './i18n';

// Создаем интерфейс для контекста языка
interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

// Создаем контекст с начальными значениями
export const LanguageContext = createContext<LanguageContextType>({
  language: 'ru',
  changeLanguage: () => {},
});

// Интерфейс для пропсов провайдера
interface LanguageProviderProps {
  children: ReactNode;
}

// Провайдер контекста языка
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Получаем текущий язык из localStorage или используем русский по умолчанию
  const [language, setLanguage] = useState<string>(
    localStorage.getItem('i18nextLng') || 'ru'
  );

  // Эффект для инициализации языка при монтировании компонента
  useEffect(() => {
    // Устанавливаем язык в i18next
    i18n.changeLanguage(language);
  }, [language]);

  // Функция для изменения языка
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    // Добавляем класс к body для возможности стилизации в зависимости от языка
    document.body.className = `lang-${lang}`;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Это хук для использования контекста языка в компонентах
export const useLanguage = () => {
  return useContext(LanguageContext);
}; 
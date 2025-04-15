import { useEffect } from 'react';

const ScrollToHeader: React.FC = () => {
  useEffect(() => {
    // Скролл наверх при загрузке/обновлении страницы
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Предотвращаем прокрутку страницы при загрузке до завершения нашего скролла
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };
    
    document.body.style.overflow = 'hidden';
    window.addEventListener('scroll', preventScroll, { passive: false });
    
    // Разрешаем прокрутку через 800мс (время анимации скролла)
    const timer = setTimeout(() => {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', preventScroll);
    }, 800);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', preventScroll);
      clearTimeout(timer);
    };
  }, []);

  return null;
};

export default ScrollToHeader; 
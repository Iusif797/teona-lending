import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import media from '../../styles/media';

interface ScrollToTopProps {
  showBelow?: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;

const ScrollButton = styled.button<{ show: boolean }>`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #d9b293; /* Цвет как на скриншоте */
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, transform 0.3s ease;
  z-index: 99;
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.3s ease forwards;
  
  &:hover {
    background-color: #c89c7d; /* Темнее при наведении */
    transform: translateY(-5px);
  }
  
  svg {
    height: 20px;
    width: 20px;
  }
  
  ${media.sm} {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    
    svg {
      height: 16px;
      width: 16px;
    }
  }
`;

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 5L12 19M12 5L18 11M12 5L6 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ScrollToTop: React.FC<ScrollToTopProps> = ({ showBelow = 300 }) => {
  const [show, setShow] = useState(false);
  const [renderButton, setRenderButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) {
        setShow(true);
        setRenderButton(true);
      }
    } else {
      if (show) {
        setShow(false);
      }
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [show, showBelow]);

  // Remove button from DOM after animation completes
  useEffect(() => {
    if (!show) {
      const timer = setTimeout(() => {
        setRenderButton(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return renderButton ? (
    <ScrollButton
      onClick={handleClick}
      show={show}
      aria-label="Прокрутить наверх"
      title="Прокрутить наверх"
    >
      <ArrowIcon />
    </ScrollButton>
  ) : null;
};

export default ScrollToTop; 
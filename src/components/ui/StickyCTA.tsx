import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPhone, FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import media from '../../styles/media';
import { trackCTA } from '../../utils/analytics';

const StickyCTAWrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(20px)')};

  ${media.md} {
    bottom: 1.5rem;
    right: 1.5rem;
  }

  ${media.sm} {
    bottom: 1rem;
    right: 1rem;
  }
`;

const BaseButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f0ebe6;

  svg {
    font-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const WhatsAppButton = styled(BaseButton)`
  background: #25D366;
  color: white;

  &:hover {
    background: #20BA5A;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
  }
`;

const CTAButton = styled(BaseButton)`
  background: #a66a42;
  color: white;

  &:hover {
    background: #8c5a38;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(166, 106, 66, 0.3);
  }
`;

const ScrollTopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  color: #a66a42;
  border: 1px solid #f0ebe6;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #a66a42;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(166, 106, 66, 0.3);
    border-color: #a66a42;
  }

  svg {
    font-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StickyCTAWrapper isVisible={isVisible}>
      <WhatsAppButton
        href="https://wa.me/994505252509"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        onClick={() => trackCTA('whatsapp_sticky', 'sticky_button')}
      >
        <FaWhatsapp />
      </WhatsAppButton>
      <CTAButton 
        href="#contact"
        onClick={() => trackCTA('sticky_cta', 'sticky_button')}
        aria-label="Записаться на консультацию"
      >
        <FaPhone />
      </CTAButton>
      <ScrollTopButton
        onClick={scrollToTop}
        aria-label="Прокрутить наверх"
      >
        <FaArrowUp />
      </ScrollTopButton>
    </StickyCTAWrapper>
  );
};

export default StickyCTA;

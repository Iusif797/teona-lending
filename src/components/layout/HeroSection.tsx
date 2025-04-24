import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AnimatedElement from '../ui/AnimatedElement';
import media from '../../styles/media';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const slides = [
    { url: '/images/banner.JPG', position: 'top center' },
    { url: '/images/banner2.JPG', position: 'top 10%' },
    { url: '/images/banner3.JPG', position: 'center center' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Свайп влево (следующий слайд)
      handleNext();
    }
    
    if (touchStart - touchEnd < -100) {
      // Свайп вправо (предыдущий слайд)
      handlePrev();
    }
  };

  return (
    <SectionWrapper id="home">
      <SliderContainer
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <SlideWrapper>
          {slides.map((slide, index) => (
            <Slide key={index} active={currentSlide === index}>
              <SlideImage 
                src={slide.url} 
                alt={`Теона Хаметова - Слайд ${index + 1}`} 
                position={slide.position}
              />
            </Slide>
          ))}
        </SlideWrapper>
        <Overlay />

        <Content>
          <ContentInner>
            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <BrandTitle>MindVia</BrandTitle>
            </AnimatedElement>
            <AnimatedElement animation="fadeInUp" delay={0.4}>
              <SchoolTitle>School of Psychology</SchoolTitle>
            </AnimatedElement>
            <AnimatedElement animation="fadeInUp" delay={0.5}>
              <ByLine>by Teona</ByLine>
            </AnimatedElement>
            <AnimatedElement animation="fadeInUp" delay={0.6}>
              <Paragraph>
                Я — Теона, дипломированный психолог, интегральный специалист, а также практикующий расстановщик и регрессолог. Моя работа строится на глубоком понимании психики, энергий и системных процессов, влияющих на человека
              </Paragraph>
            </AnimatedElement>
            <AnimatedElement animation="fadeInUp" delay={0.8}>
              <ButtonGroup>
                <ContactButton href="#contact">
                  Записаться на консультацию
                </ContactButton>
                <ServiceButton href="#services">
                  Услуги
                </ServiceButton>
              </ButtonGroup>
            </AnimatedElement>
          </ContentInner>
        </Content>

        <NavButtons>
          <NavButton onClick={handlePrev} aria-label="Предыдущий слайд">
            <FaChevronLeft />
          </NavButton>
          <NavButton onClick={handleNext} aria-label="Следующий слайд">
            <FaChevronRight />
          </NavButton>
        </NavButtons>
        
        <SlideIndicators>
          {slides.map((_, index) => (
            <SlideIndicator 
              key={index} 
              active={currentSlide === index} 
              onClick={() => setCurrentSlide(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </SlideIndicators>
      </SliderContainer>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  position: relative;
  overflow: hidden;
  padding: 0;
  height: 100vh;
  min-height: 650px;
  max-height: 950px;
  width: 100%;
  margin: 0;
  
  ${media.md} {
    height: 100vh;
    min-height: 600px;
  }
  
  ${media.sm} {
    height: 100vh;
    min-height: 500px;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Slide = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 1.5s ease;
  z-index: 1;
  overflow: hidden;
  
  &[active="true"] img {
    animation: zoomIn 8s ease forwards;
  }
  
  @keyframes zoomIn {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }
`;

const SlideImage = styled.img<{ position: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ position }) => position};
  transition: transform 8s ease;
  transform: scale(${({ position }) => position.includes('top') ? 1 : 1.05});
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    object-position: ${({ position }) => 
      position === 'top 10%' ? 'center 15%' : 
      position === 'center center' ? 'left center' : 
      position.includes('top') ? position : 'center center'};
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3));
  z-index: 2;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const ContentInner = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 5;
  
  ${media.sm} {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  ${media.xs} {
    padding: 0 0.75rem;
  }
`;

const BrandTitle = styled.h2`
  font-size: 5rem;
  color: white;
  margin: 0 0 0.5rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  position: relative;
  display: inline-block;
  background: linear-gradient(135deg, #ffffff 0%, #e0d2c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(217, 178, 147, 0.8), transparent);
  }
  
  ${media.md} {
    font-size: 4.2rem;
  }
  
  ${media.sm} {
    font-size: 3.5rem;
  }
  
  ${media.xs} {
    font-size: 3rem;
  }
  
  ${media.xxs} {
    font-size: 2.5rem;
  }
`;

const SchoolTitle = styled.h1`
  font-size: 3rem;
  color: white;
  margin: 0.5rem 0;
  font-weight: 400;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  letter-spacing: 3px;
  text-transform: uppercase;
  
  ${media.md} {
    font-size: 2.6rem;
  }
  
  ${media.sm} {
    font-size: 2.2rem;
  }
  
  ${media.xs} {
    font-size: 1.8rem;
    letter-spacing: 2px;
  }
  
  ${media.xxs} {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }
`;

const ByLine = styled.h3`
  font-size: 2.2rem;
  color: #d9b293;
  margin: 0.5rem 0 2rem;
  font-weight: 500;
  font-style: italic;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  ${media.md} {
    font-size: 2rem;
    margin: 0.5rem 0 1.8rem;
  }
  
  ${media.sm} {
    font-size: 1.8rem;
    margin: 0.4rem 0 1.6rem;
  }
  
  ${media.xs} {
    font-size: 1.5rem;
    margin: 0.3rem 0 1.4rem;
  }
  
  ${media.xxs} {
    font-size: 1.3rem;
    margin: 0.2rem 0 1.2rem;
  }
`;

const Paragraph = styled.p`
  max-width: 800px;
  margin: 1.5rem 0 2.5rem;
  color: #fff;
  font-size: 1.125rem;
  line-height: 1.8;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  ${media.md} {
    font-size: 1.05rem;
    margin: 1.25rem 0 2rem;
    max-width: 600px;
  }
  
  ${media.sm} {
    font-size: 1rem;
    line-height: 1.6;
    margin: 1rem 0 1.75rem;
    max-width: 100%;
    padding: 0 4rem;
  }
  
  ${media.xs} {
    font-size: 0.95rem;
    margin: 0.75rem 0 1.5rem;
    line-height: 1.5;
    padding: 0 3.5rem;
  }
  
  ${media.xxs} {
    font-size: 0.9rem;
    margin: 0.5rem 0 1.25rem;
    padding: 0 3rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  
  ${media.md} {
    gap: 1rem;
  }
  
  ${media.sm} {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }
  
  ${media.xxs} {
    max-width: 240px;
  }
`;

const ContactButton = styled.a`
  display: inline-block;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.85rem 1.8rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  text-decoration: none;
  
  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    color: white;
  }
  
  ${media.md} {
    padding: 0.8rem 1.6rem;
    font-size: 0.95rem;
  }
  
  ${media.sm} {
    padding: 0.75rem 1.5rem;
    width: 100%;
  }
  
  ${media.xxs} {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ServiceButton = styled.a`
  display: inline-block;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 50px;
  padding: 0.85rem 1.8rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
    color: white;
  }
  
  ${media.md} {
    padding: 0.8rem 1.6rem;
    font-size: 0.95rem;
  }
  
  ${media.sm} {
    padding: 0.75rem 1.5rem;
    width: 100%;
  }
  
  ${media.xxs} {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const NavButtons = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  padding: 0 2rem;
  transform: translateY(-50%);
  pointer-events: none;
  
  ${media.md} {
    padding: 0 1.5rem;
  }
  
  ${media.sm} {
    padding: 0 1rem;
    width: calc(100% + 2rem);
    left: -1rem;
  }
  
  @media (max-width: 480px) {
    width: calc(100% + 3rem);
    left: -1.5rem;
  }
`;

const NavButton = styled.button`
  width: 4.5rem;
  height: 4.5rem;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  opacity: 0.8;
  
  &:hover {
    background: var(--color-primary);
    transform: scale(1.1);
    border-color: var(--color-primary);
    opacity: 1;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 2rem;
    height: 2rem;
    color: white;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
  }
  
  ${media.md} {
    width: 4rem;
    height: 4rem;
    
    svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
  
  ${media.sm} {
    width: 3.5rem;
    height: 3.5rem;
    
    svg {
      width: 1.7rem;
      height: 1.7rem;
    }
  }
  
  @media (max-width: 480px) {
    width: 3rem;
    height: 3rem;
    
    svg {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
`;

const SlideIndicators = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  z-index: 10;
  
  ${media.md} {
    bottom: 2.5rem;
    gap: 0.7rem;
  }
  
  ${media.sm} {
    bottom: 2rem;
    gap: 0.6rem;
  }
  
  @media (max-width: 480px) {
    bottom: 1.5rem;
    gap: 0.5rem;
  }
`;

const SlideIndicator = styled.button<{ active: boolean }>`
  width: ${({ active }) => (active ? '3rem' : '2rem')};
  height: 0.4rem;
  background: ${({ active }) => active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: ${({ active }) => active ? 'white' : 'rgba(255, 255, 255, 0.6)'};
  }
  
  ${media.sm} {
    width: ${({ active }) => (active ? '2.5rem' : '1.7rem')};
    height: 0.35rem;
  }
  
  @media (max-width: 480px) {
    width: ${({ active }) => (active ? '2rem' : '1.5rem')};
    height: 0.3rem;
  }
`;

export default HeroSection;
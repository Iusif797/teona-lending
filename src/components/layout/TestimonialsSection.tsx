import { useState } from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import { TESTIMONIALS } from '../../data/constants';
import media from '../../styles/media';

const TestimonialsSectionContainer = styled.section`
  padding: 7rem 0;
  background-color: white;

  ${media.md} {
    padding: 6rem 0;
  }

  ${media.sm} {
    padding: 5rem 0;
  }
`;

const TestimonialsWrapper = styled.div`
  margin-top: 4rem;
  position: relative;
  max-width: 800px;
  margin: 4rem auto 0;
  padding: 0 2rem;
  
  ${media.lg} {
    max-width: 700px;
  }
  
  ${media.md} {
    max-width: 500px;
    padding: 0 1.5rem;
  }
  
  ${media.sm} {
    padding: 0 1rem;
  }
`;

const TestimonialsSlider = styled.div`
  overflow: hidden;
  position: relative;
  margin: 0 auto;
`;

const TestimonialsTrack = styled.div<{ position: number; transition: boolean }>`
  display: flex;
  transform: translateX(${({ position }) => -position * 100}%);
  transition: ${({ transition }) => (transition ? 'transform 0.5s ease' : 'none')};
`;

const TestimonialSlide = styled.div`
  flex: 0 0 100%;
  padding: 0 1.5rem;

  ${media.md} {
    padding: 0 1rem;
  }
`;

const TestimonialCard = styled.div`
  background-color: var(--color-bg);
  padding: 3rem 2.5rem;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: """;
    position: absolute;
    top: 2rem;
    left: 2rem;
    font-size: 6rem;
    font-family: Georgia, serif;
    line-height: 0;
    color: rgba(0, 0, 0, 0.05);
  }

  ${media.sm} {
    padding: 2.5rem 1.5rem;
    
    &::before {
      top: 2rem;
      left: 1.5rem;
      font-size: 5rem;
    }
  }
`;

const TestimonialContent = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: var(--color-secondary);
  font-style: italic;
  position: relative;
  text-align: center;

  ${media.sm} {
    font-size: 1.1rem;
  }
`;

const TestimonialAuthor = styled.div`
  margin-top: 2rem;
`;

const TestimonialName = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 400;
`;

const TestimonialPosition = styled.p`
  font-size: 1rem;
  color: var(--color-secondary);
`;

const TestimonialRating = styled.div`
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Star = styled.span`
  color: #ffc107;
  font-size: 1.2rem;
`;

const SliderButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;
`;

const SliderButton = styled.button<{ active?: boolean }>`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? 'var(--color-primary)' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : 'var(--color-secondary)')};
  border: 1px solid ${({ active }) => (active ? 'var(--color-primary)' : 'var(--color-secondary)')};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  &:hover {
    background-color: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  ${media.sm} {
    width: 40px;
    height: 40px;
  }
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 2rem;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? 'var(--color-primary)' : 'var(--color-secondary)')};
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = TESTIMONIALS.length;

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i}>
          {i < rating ? '★' : '☆'}
        </Star>
      );
    }
    return stars;
  };

  return (
    <TestimonialsSectionContainer id="testimonials">
      <Container>
        <AnimatedElement animation="fadeIn">
          <SectionTitle
            title="Отзывы"
            subtitle="Что говорят мои клиенты о нашей совместной работе"
            centered
          />
        </AnimatedElement>

        <AnimatedElement animation="fadeInUp" delay={0.3}>
          <TestimonialsWrapper>
            <TestimonialsSlider>
              <TestimonialsTrack position={currentIndex} transition={true}>
                {TESTIMONIALS.map((testimonial) => (
                  <TestimonialSlide key={testimonial.id}>
                    <TestimonialCard>
                      <TestimonialContent>{testimonial.content}</TestimonialContent>
                      <TestimonialRating>
                        {renderStars(testimonial.rating)}
                      </TestimonialRating>
                      <TestimonialAuthor>
                        <TestimonialName>{testimonial.name}</TestimonialName>
                        {testimonial.position && (
                          <TestimonialPosition>{testimonial.position}</TestimonialPosition>
                        )}
                      </TestimonialAuthor>
                    </TestimonialCard>
                  </TestimonialSlide>
                ))}
              </TestimonialsTrack>
            </TestimonialsSlider>

            <SliderButtons>
              <SliderButton
                onClick={goToPrev}
                disabled={currentIndex === 0}
                aria-label="Предыдущий отзыв"
              >
                &#8592;
              </SliderButton>
              <SliderButton
                onClick={goToNext}
                disabled={currentIndex === totalSlides - 1}
                aria-label="Следующий отзыв"
              >
                &#8594;
              </SliderButton>
            </SliderButtons>

            <SliderDots>
              {TESTIMONIALS.map((_, index) => (
                <Dot
                  key={index}
                  active={currentIndex === index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Перейти к отзыву ${index + 1}`}
                />
              ))}
            </SliderDots>
          </TestimonialsWrapper>
        </AnimatedElement>
      </Container>
    </TestimonialsSectionContainer>
  );
};

export default TestimonialsSection; 
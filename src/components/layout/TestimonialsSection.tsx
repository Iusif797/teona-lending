import { useState, useRef } from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import { TESTIMONIALS } from '../../data/constants';
import media from '../../styles/media';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

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

// Стили для видео-отзыва
const VideoReviewSection = styled.div`
  margin-top: 5rem;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const VideoContainer = styled.div<{ isVideoPlaying: boolean }>`
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.02);
  transform: perspective(1000px) rotateX(1deg);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    transform: perspective(1000px) rotateX(0);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
    pointer-events: none;
    opacity: ${props => (props.isVideoPlaying ? 0 : 1)};
    transition: opacity 0.5s ease;
  }
`;

const VideoThumbnail = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/video-thumbnail.jpg');
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.isPlaying ? 0 : 1)};
  transition: opacity 0.5s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const VideoElement = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

const PlayButton = styled.button<{ isPlaying: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${props => (props.isPlaying ? 0.5 : 1)});
  width: 80px;
  height: 80px;
  background: var(--color-primary);
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  opacity: ${props => (props.isPlaying ? 0.7 : 1)};
  transition: all 0.3s ease;
  box-shadow: 0 0 0 10px rgba(217, 178, 147, 0.3);
  
  &:hover {
    transform: translate(-50%, -50%) scale(${props => (props.isPlaying ? 0.55 : 1.05)});
    background: var(--color-primary-dark);
    box-shadow: 0 0 0 12px rgba(217, 178, 147, 0.2);
    opacity: 1;
  }
  
  svg {
    font-size: 2rem;
    margin-left: ${props => (props.isPlaying ? 0 : '5px')};
  }
  
  ${media.sm} {
    width: 60px;
    height: 60px;
    
    svg {
      font-size: 1.5rem;
    }
  }
`;

const VideoControls = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${props => (props.isPlaying ? 1 : 0)};
  transform: translateY(${props => (props.isPlaying ? 0 : '20px')});
  transition: all 0.3s ease;
  z-index: 3;
  
  ${media.sm} {
    bottom: 15px;
    left: 15px;
    right: 15px;
  }
`;

const VideoTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  ${media.sm} {
    font-size: 1.1rem;
  }
`;

const VolumeButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  ${media.sm} {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
`;

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const totalSlides = TESTIMONIALS.length;

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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

        {/* Видео-отзыв */}
        <AnimatedElement animation="fadeInUp" delay={0.5}>
          <VideoReviewSection>
            <SectionTitle
              title="Видео-отзыв"
              subtitle="Посмотрите, что говорят клиенты о результатах нашей работы"
              centered
            />
            
            <VideoContainer isVideoPlaying={isVideoPlaying}>
              <VideoThumbnail isPlaying={isVideoPlaying} />
              <VideoElement 
                ref={videoRef} 
                src="/assets/video-review.MP4" 
                poster="/images/video-thumbnail.jpg"
                preload="metadata"
                muted={isMuted}
                onEnded={() => setIsVideoPlaying(false)}
              />
              
              <PlayButton 
                isPlaying={isVideoPlaying} 
                onClick={toggleVideoPlay}
                aria-label={isVideoPlaying ? "Пауза" : "Воспроизвести видео"}
              >
                {isVideoPlaying ? <FaPause /> : <FaPlay />}
              </PlayButton>
              
              <VideoControls isPlaying={isVideoPlaying}>
                <VideoTitle>Татьяна о работе со школой MindVia</VideoTitle>
                <VolumeButton onClick={toggleMute} aria-label={isMuted ? "Включить звук" : "Выключить звук"}>
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </VolumeButton>
              </VideoControls>
            </VideoContainer>
          </VideoReviewSection>
        </AnimatedElement>
      </Container>
    </TestimonialsSectionContainer>
  );
};

export default TestimonialsSection; 
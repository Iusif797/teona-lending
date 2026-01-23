import React from 'react';
import styled from 'styled-components';
import { FaLightbulb, FaHeartbeat, FaSeedling, FaCompass } from 'react-icons/fa';
import AnimatedElement from '../ui/AnimatedElement';
import media from '../../styles/media';

const IntroSection: React.FC = () => {
  return (
    <SectionWrapper>
      <Container>
        <AnimatedElement animation="fadeIn" delay={0.1}>
          <Title>Найди свой путь с <Highlight>MINDVIA</Highlight></Title>
        </AnimatedElement>
        
        <TextBlocks>
          <AnimatedElement animation="fadeInUp" delay={0.2}>
            <TextBlock>
              <IconWrapper>
                <FaCompass />
              </IconWrapper>
              <TextContent>
                <Text>
                  Школа MINDVIA — это не просто обучение. Это путь к себе. Хочешь лучше понимать себя, 
                  других и выстраивать гармоничную жизнь?
                </Text>
              </TextContent>
            </TextBlock>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInUp" delay={0.3}>
            <TextBlock>
              <IconWrapper>
                <FaLightbulb />
              </IconWrapper>
              <TextContent>
                <Text>
                  Мы создали MINDVIA, чтобы сделать психологию доступной, живой и глубокой.
                </Text>
              </TextContent>
            </TextBlock>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInUp" delay={0.4}>
            <TextBlock>
              <IconWrapper>
                <FaHeartbeat />
              </IconWrapper>
              <TextContent>
                <Text>
                  MINDVIA — не просто школа. Это путь к себе.
                </Text>
              </TextContent>
            </TextBlock>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInUp" delay={0.5}>
            <TextBlock>
              <IconWrapper>
                <FaSeedling />
              </IconWrapper>
              <TextContent>
                <Text>
                  С нами ты получишь знания, которые трансформируют мышление и помогают 
                  чувствовать опору внутри.
                </Text>
              </TextContent>
            </TextBlock>
          </AnimatedElement>
        </TextBlocks>
      </Container>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  padding: 3rem 0 5rem;
  background: linear-gradient(170deg, var(--color-background) 0%, var(--color-background-light) 100%);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 10% 20%, rgba(217, 178, 147, 0.05) 0%, transparent 80%);
    z-index: 0;
  }
  
  ${media.md} {
    padding: 2.5rem 0 4rem;
  }
  
  ${media.sm} {
    padding: 2rem 0 3rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  
  ${media.sm} {
    padding: 0 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 2.8rem;
  color: var(--color-text-dark);
  margin-bottom: 2.5rem;
  text-align: center;
  font-weight: 600;
  
  ${media.md} {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
  
  ${media.sm} {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }
`;

const Highlight = styled.span`
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  }
`;

const TextBlocks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  max-width: 1100px;
  margin: 0 auto;
  
  ${media.md} {
    gap: 2rem;
  }
  
  ${media.sm} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 550px;
  }
`;

const TextBlock = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s ease;
  height: 100%;
  min-height: 180px;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: var(--color-primary);
    transition: height 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border-color: var(--color-primary-light);
    
    &:before {
      height: 100%;
    }
  }
  
  ${media.md} {
    padding: 2rem;
    min-height: 160px;
    border-radius: 14px;
  }
  
  ${media.sm} {
    padding: 1.8rem;
    min-height: 130px;
    align-items: flex-start;
    border-radius: 12px;
  }
`;

const IconWrapper = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.8rem;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(217, 178, 147, 0.3);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  
  svg {
    width: 30px;
    height: 30px;
    color: white;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1));
  }
  
  ${TextBlock}:hover & {
    transform: scale(1.1);
    box-shadow: 0 10px 25px rgba(217, 178, 147, 0.4);
  }
  
  ${media.md} {
    width: 52px;
    height: 52px;
    margin-right: 1.5rem;
    
    svg {
      width: 26px;
      height: 26px;
    }
  }
  
  ${media.sm} {
    width: 48px;
    height: 48px;
    margin-right: 1.3rem;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  position: relative;
  z-index: 2;
`;

const Text = styled.p`
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--color-text);
  margin: 0;
  font-weight: 400;
  
  ${media.md} {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  ${media.sm} {
    font-size: 1.05rem;
    line-height: 1.5;
  }
`;

export default IntroSection; 
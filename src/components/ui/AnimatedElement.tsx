import { ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';

type AnimationType = 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn' | 'none';

interface AnimatedElementProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const AnimatedWrapper = styled.div<{
  isVisible: boolean;
  animation: AnimationType;
  delay: number;
  duration: number;
}>`
  opacity: 0;
  
  ${({ isVisible, animation, delay, duration }) =>
    isVisible &&
    animation !== 'none' &&
    css`
      animation: ${getAnimation(animation)} ${duration}s ease forwards;
      animation-delay: ${delay}s;
    `}
  
  ${({ isVisible, animation }) =>
    isVisible && animation === 'none' && 
    css`
      opacity: 1;
    `}
`;

function getAnimation(type: AnimationType) {
  switch (type) {
    case 'fadeIn':
      return fadeIn;
    case 'fadeInUp':
      return fadeInUp;
    case 'fadeInDown':
      return fadeInDown;
    case 'fadeInLeft':
      return fadeInLeft;
    case 'fadeInRight':
      return fadeInRight;
    case 'zoomIn':
      return zoomIn;
    default:
      return fadeIn;
  }
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className,
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <AnimatedWrapper
      ref={ref}
      isVisible={inView}
      animation={animation}
      delay={delay}
      duration={duration}
      className={className}
    >
      {children}
    </AnimatedWrapper>
  );
};

export default AnimatedElement; 
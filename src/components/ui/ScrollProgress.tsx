import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: transparent;
  z-index: 1000;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  background-color: var(--color-primary);
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.2s ease;
`;

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  const calculateScrollProgress = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const windowHeight = scrollHeight - clientHeight;
    const scrolled = scrollTop / windowHeight;
    
    setProgress(scrolled * 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollProgress);
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return (
    <ProgressContainer>
      <ProgressBar progress={progress} />
    </ProgressContainer>
  );
};

export default ScrollProgress; 
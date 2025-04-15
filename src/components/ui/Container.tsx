import { ReactNode } from 'react';
import styled from 'styled-components';
import media from '../../styles/media';

interface ContainerProps {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const StyledContainer = styled.div<{
  fullWidth?: boolean;
}>`
  width: 100%;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '1100px')};
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;

  ${media.xl} {
    max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '1000px')};
    padding: 0 2rem;
  }

  ${media.lg} {
    max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '800px')};
    padding: 0 1.5rem;
  }

  ${media.md} {
    max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '600px')};
    padding: 0 1.5rem;
  }

  ${media.sm} {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const Container: React.FC<ContainerProps> = ({
  children,
  fullWidth = false,
  className,
}) => {
  return (
    <StyledContainer fullWidth={fullWidth} className={className}>
      {children}
    </StyledContainer>
  );
};

export default Container; 
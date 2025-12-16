import { ReactNode } from 'react';
import styled from 'styled-components';
import media from '../../styles/media';

interface ContainerProps {
  children: ReactNode;
  fluid?: boolean;
  className?: string;
}

interface StyledContainerProps {
  fluid?: boolean;
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: ${({ fluid }) => (fluid ? '100%' : '90%')};
  max-width: ${({ fluid }) => (fluid ? '100%' : 'var(--container-width)')};
  margin: 0 auto;
  padding: 0 15px;
  
  ${media.xl} {
    max-width: ${({ fluid }) => (fluid ? '100%' : '1140px')};
  }
  
  ${media.lg} {
    max-width: ${({ fluid }) => (fluid ? '100%' : '960px')};
    width: ${({ fluid }) => (fluid ? '100%' : '95%')};
  }
  
  ${media.md} {
    max-width: ${({ fluid }) => (fluid ? '100%' : '720px')};
  }
  
  ${media.sm} {
    max-width: ${({ fluid }) => (fluid ? '100%' : '540px')};
    width: ${({ fluid }) => (fluid ? '100%' : '95%')};
    padding: 0 10px;
  }
  
  ${media.xs} {
    width: ${({ fluid }) => (fluid ? '100%' : '100%')};
    padding: 0 8px;
  }
  
  ${media.xxs} {
    padding: 0 5px;
  }
`;

const Container: React.FC<ContainerProps> = ({
  children,
  fluid = false,
  className,
}) => {
  return (
    <StyledContainer fluid={fluid} className={className}>
      {children}
    </StyledContainer>
  );
};

export default Container; 
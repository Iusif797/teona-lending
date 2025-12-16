import styled from 'styled-components';
import media from '../../styles/media';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

interface StyledTitleProps {
  centered?: boolean;
  light?: boolean;
}

interface MainTitleProps extends StyledTitleProps {
  hasSubtitle?: boolean;
}

const TitleWrapper = styled.div<StyledTitleProps>`
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
  margin-bottom: 2rem;
  
  ${media.sm} {
    margin-bottom: 1.5rem;
  }
`;

const MainTitle = styled.h2<MainTitleProps>`
  position: relative;
  font-size: 2.5rem;
  font-weight: 600;
  color: ${({ light }) => (light ? 'white' : 'var(--color-text)')};
  margin-bottom: ${({ hasSubtitle }) => (hasSubtitle ? '0.75rem' : '0')};
  
  ${media.xl} {
    font-size: 2.25rem;
  }
  
  ${media.md} {
    font-size: 2rem;
  }
  
  ${media.sm} {
    font-size: 1.8rem;
  }
  
  ${media.xs} {
    font-size: 1.6rem;
  }
  
  ${media.xxs} {
    font-size: 1.4rem;
  }
`;

const Subtitle = styled.p<StyledTitleProps>`
  font-size: 1.1rem;
  color: ${({ light }) => (light ? 'rgba(255, 255, 255, 0.85)' : 'var(--color-secondary)')};
  margin-top: 0.5rem;
  max-width: ${({ centered }) => (centered ? '600px' : '100%')};
  margin-left: ${({ centered }) => (centered ? 'auto' : '0')};
  margin-right: ${({ centered }) => (centered ? 'auto' : '0')};
  
  ${media.md} {
    font-size: 1rem;
  }
  
  ${media.sm} {
    font-size: 0.95rem;
  }
  
  ${media.xs} {
    font-size: 0.9rem;
    max-width: ${({ centered }) => (centered ? '100%' : '100%')};
  }
`;

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = false,
  light = false,
  className,
}) => {
  return (
    <TitleWrapper centered={centered} className={className}>
      <MainTitle centered={centered} light={light} hasSubtitle={!!subtitle}>
        {title}
      </MainTitle>
      {subtitle && <Subtitle centered={centered} light={light}>{subtitle}</Subtitle>}
    </TitleWrapper>
  );
};

export default SectionTitle; 
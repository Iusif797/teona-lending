import styled from 'styled-components';
import media from '../../styles/media';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

const TitleWrapper = styled.div<{ centered?: boolean; light?: boolean }>`
  margin-bottom: 3rem;
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
  
  ${media.md} {
    margin-bottom: 2.5rem;
  }
`;

interface TitleProps {
  light?: boolean;
  hasSubtitle?: boolean;
}

const Title = styled.h2<TitleProps>`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: ${({ hasSubtitle }) => (hasSubtitle ? '1rem' : '0')};
  color: ${({ light }) => (light ? 'white' : 'var(--color-primary)')};
  letter-spacing: 1px;
  
  ${media.md} {
    font-size: 2.25rem;
  }
  
  ${media.sm} {
    font-size: 2rem;
  }
`;

interface SubtitleProps {
  light?: boolean;
  isCentered?: boolean;
}

const Subtitle = styled.p<SubtitleProps>`
  font-size: 1.1rem;
  color: ${({ light }) => (light ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-secondary)')};
  max-width: 700px;
  margin: ${({ isCentered }) => (isCentered ? '0 auto' : '0')};
  font-weight: 300;
  
  ${media.sm} {
    font-size: 1rem;
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
    <TitleWrapper centered={centered} light={light} className={className}>
      <Title light={light} hasSubtitle={!!subtitle}>{title}</Title>
      {subtitle && <Subtitle light={light} isCentered={centered}>{subtitle}</Subtitle>}
    </TitleWrapper>
  );
};

export default SectionTitle; 
import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import { PRINCIPLES } from '../../data/constants';
import media from '../../styles/media';

const AboutSectionContainer = styled.section`
  padding: 7rem 0;
  background-color: white;
  position: relative;

  ${media.md} {
    padding: 6rem 0;
  }

  ${media.sm} {
    padding: 5rem 0;
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`;

const MissionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 5rem;
  padding: 0 2rem;

  ${media.lg} {
    gap: 3rem;
  }

  ${media.md} {
    grid-template-columns: 1fr;
    gap: 3rem;
    margin-bottom: 4rem;
  }

  ${media.sm} {
    padding: 0 1rem;
    margin-bottom: 3rem;
  }
`;

const MissionTextContainer = styled.div`
  ${media.md} {
    order: 2;
    text-align: center;
  }
`;

const MissionTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 300;
  letter-spacing: 1.5px;

  ${media.md} {
    font-size: 1.8rem;
    text-align: center;
  }

  ${media.sm} {
    font-size: 1.6rem;
  }
`;

const MissionText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--color-secondary);
  font-weight: 300;
  max-width: 800px;

  ${media.md} {
    font-size: 1.1rem;
    text-align: center;
    margin: 0 auto;
  }

  ${media.sm} {
    font-size: 1rem;
  }
`;

const MissionImageContainer = styled.div`
  position: relative;
  
  ${media.md} {
    order: 1;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const MissionImage = styled.div`
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: 15px;
    bottom: 15px;
    border: 1px solid var(--color-secondary);
    z-index: -1;
    opacity: 0.3;
    transition: all 0.3s ease;
  }
  
  &:hover::before {
    opacity: 0.6;
    transform: translate(5px, 5px);
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: all 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.02);
  }
`;

const PrinciplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;

  ${media.lg} {
    gap: 2rem;
  }

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  ${media.sm} {
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 450px;
  }
`;

const PrincipleItem = styled.div`
  position: relative;
  padding: 2.5rem 1.5rem;
  background-color: var(--color-bg);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: attr(data-number);
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 4rem;
    font-family: var(--font-title);
    color: rgba(0, 0, 0, 0.06);
    z-index: 0;
  }
`;

const PrincipleTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  font-weight: 400;

  ${media.md} {
    font-size: 1.2rem;
  }
`;

const PrincipleText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-secondary);
  position: relative;
  z-index: 1;
`;

const AboutSection: React.FC = () => {
  return (
    <AboutSectionContainer id="about">
      <Container>
        <AnimatedElement animation="fadeIn">
          <SectionTitle
            title="Мой подход"
            subtitle="Я считаю, что каждый человек уникален и заслуживает индивидуального подхода к решению своих проблем."
            centered
          />
        </AnimatedElement>

        <AboutContent>
          <AnimatedElement animation="fadeInUp" delay={0.2}>
            <MissionContainer>
              <MissionTextContainer>
                <MissionTitle>МОЯ МИССИЯ — ЭТО ПОМОГАТЬ ДРУГИМ</MissionTitle>
                <MissionText>
                  Я НЕ ПОНАСЛЫШКЕ ЗНАЮ, ЧТО ТАКОЕ РАЗРУШАТЬ СЕБЯ И СТАЛКИВАТЬСЯ С ТРУДНЫМИ ЖИЗНЕННЫМИ СИТУАЦИЯМИ. 
                  НО Я УМЕЮ РАЗЛИЧАТЬ И ПРОЖИВАТЬ СВОИ ЭМОЦИИ, НАХОДИТЬ ВЫХОД ИЗ СЛОЖНЫХ СИТУАЦИЙ, ИДТИ ДАЛЬШЕ И НАСЛАЖДАТЬСЯ ЖИЗНЬЮ.
                  Я ЧЕРЕЗ МНОГОЕ ПРОШЛА, И НЕСМОТРЯ НА ЭТО, Я СОХРАНИЛА В СЕБЕ ЛЮБОВЬ К ЛЮДЯМ.
                </MissionText>
              </MissionTextContainer>
              
              <MissionImageContainer>
                <MissionImage>
                  <img src="/images/banner2.jpg" alt="Теона Хаметова - психолог" />
                </MissionImage>
              </MissionImageContainer>
            </MissionContainer>
          </AnimatedElement>

          <PrinciplesGrid>
            {PRINCIPLES.map((principle, index) => (
              <AnimatedElement key={principle.id} animation="fadeInUp" delay={0.2 + index * 0.1}>
                <PrincipleItem data-number={`0${principle.id}`}>
                  <PrincipleTitle>{principle.title}</PrincipleTitle>
                  <PrincipleText>{principle.description}</PrincipleText>
                </PrincipleItem>
              </AnimatedElement>
            ))}
          </PrinciplesGrid>
        </AboutContent>
      </Container>
    </AboutSectionContainer>
  );
};

export default AboutSection; 
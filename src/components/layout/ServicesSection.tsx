import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import AnimatedElement from '../ui/AnimatedElement';
import { SERVICES } from '../../data/constants';
import media from '../../styles/media';

const ServicesSectionContainer = styled.section`
  padding: 7rem 0;
  background-color: var(--color-bg);

  ${media.md} {
    padding: 6rem 0;
  }

  ${media.sm} {
    padding: 5rem 0;
  }
`;

const ServicesWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  
  ${media.xl} {
    max-width: 1000px;
  }
  
  ${media.lg} {
    max-width: 800px;
    padding: 0 1.5rem;
  }
  
  ${media.md} {
    max-width: 600px;
  }
  
  ${media.sm} {
    padding: 0 1rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 4rem auto;
  max-width: 1000px;

  ${media.xl} {
    grid-template-columns: repeat(3, 1fr);
    max-width: 900px;
  }

  ${media.lg} {
    grid-template-columns: repeat(2, 1fr);
    max-width: 700px;
    gap: 1.5rem;
  }

  ${media.md} {
    max-width: 500px;
  }

  ${media.sm} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 400px;
    margin: 3rem auto;
  }
`;

const ServiceCard = styled.div`
  background-color: white;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceNumber = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 3.5rem;
  font-family: var(--font-title);
  font-weight: 300;
  color: rgba(0, 0, 0, 0.05);
  line-height: 1;
`;

const ServiceTitle = styled.h4`
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  font-weight: 400;

  ${media.sm} {
    font-size: 1.3rem;
  }
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-secondary);
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 3rem;

  ${media.sm} {
    display: flex;
    justify-content: center;
  }
`;

const Divider = styled.hr`
  width: 60px;
  height: 3px;
  background-color: var(--color-primary-light);
  border: none;
  margin: 0 auto 3rem;
`;

const ServiceInfo = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
  
  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--color-secondary);
    margin-bottom: 2rem;
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-weight: 300;
  }
  
  ${media.sm} {
    margin-bottom: 2rem;
    
    p {
      font-size: 1rem;
    }
    
    h3 {
      font-size: 1.6rem;
    }
  }
`;

const ServicesSection: React.FC = () => {
  return (
    <ServicesSectionContainer id="services">
      <Container>
        <AnimatedElement animation="fadeIn">
          <SectionTitle
            title="Услуги"
            subtitle="Я предлагаю широкий спектр психологических услуг, адаптированных под индивидуальные потребности каждого клиента"
            centered
          />
        </AnimatedElement>
        
        <ServicesWrapper>
          <AnimatedElement animation="fadeIn" delay={0.2}>
            <ServiceInfo>
              <h3>Индивидуальный подход к каждому</h3>
              <p>
                Все мы уникальны, и я считаю важным адаптировать методы работы под конкретные потребности каждого клиента.
                Независимо от того, с чем вы столкнулись, мы вместе найдем путь к позитивным изменениям.
              </p>
              <Divider />
            </ServiceInfo>
          </AnimatedElement>

          <ServicesGrid>
            {SERVICES.map((service, index) => (
              <AnimatedElement key={service.id} animation="fadeInUp" delay={0.2 + index * 0.1}>
                <ServiceCard>
                  <ServiceNumber>0{service.id}</ServiceNumber>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <Button href="#contact" variant="outline" size="small">
                    Записаться
                  </Button>
                </ServiceCard>
              </AnimatedElement>
            ))}
          </ServicesGrid>

          <AnimatedElement animation="fadeInUp" delay={0.5}>
            <ButtonWrapper>
              <Button href="#contact" variant="primary" size="large">
                Записаться на консультацию
              </Button>
            </ButtonWrapper>
          </AnimatedElement>
        </ServicesWrapper>
      </Container>
    </ServicesSectionContainer>
  );
};

export default ServicesSection; 
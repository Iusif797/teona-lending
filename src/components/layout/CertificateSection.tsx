import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import media from '../../styles/media';

const CertificateSectionContainer = styled.section`
  padding: 7rem 0;
  background-color: var(--color-bg);

  ${media.md} {
    padding: 6rem 0;
  }

  ${media.sm} {
    padding: 5rem 0;
  }
`;

const CertificateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  text-align: center;
`;

const CertificateText = styled.p`
  max-width: 900px;
  margin: 0 auto 3rem;
  color: var(--color-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: center;

  ${media.sm} {
    font-size: 1rem;
  }
`;

const CertificatesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
`;

const CertificateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const CertificateImage = styled.div`
  position: relative;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.02);
  }
  
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
`;

const CertificateCaption = styled.div`
  margin-top: 2rem;
  
  h4 {
    font-size: 1.3rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--color-secondary);
    font-size: 1rem;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const CertificateSection: React.FC = () => {
  return (
    <CertificateSectionContainer id="certificate">
      <Container>
        <AnimatedElement animation="fadeIn">
          <SectionTitle
            title="Образование и квалификация"
            subtitle="Профессиональная подготовка и сертификация"
            centered
          />
        </AnimatedElement>
        
        <CertificateContent>
          <AnimatedElement animation="fadeIn" delay={0.2}>
            <CertificateText>
              Я имею профессиональное образование в области психологии и постоянно совершенствую свои навыки, 
              проходя дополнительные курсы и тренинги. Моя квалификация подтверждена сертификатами 
              и дипломами признанных образовательных учреждений.
            </CertificateText>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInUp" delay={0.4}>
            <CertificatesGrid>
              <CertificateWrapper>
                <CertificateImage>
                  <img src="/images/certificate.jpg" alt="Сертификат Теоны Хаметовой" />
                </CertificateImage>
                <CertificateCaption>
                  <h4>Диплом профессионального психолога</h4>
                  <p>Специализация: психологическое консультирование и терапия</p>
                </CertificateCaption>
              </CertificateWrapper>
              
              <CertificateWrapper>
                <CertificateImage>
                  <img src="/images/certificate2.png" alt="Сертификат о дополнительном образовании" />
                </CertificateImage>
                <CertificateCaption>
                  <h4>Сертификат о повышении квалификации</h4>
                  <p>Дополнительная специализация в области психотерапии</p>
                </CertificateCaption>
              </CertificateWrapper>
            </CertificatesGrid>
          </AnimatedElement>
        </CertificateContent>
      </Container>
    </CertificateSectionContainer>
  );
};

export default CertificateSection; 
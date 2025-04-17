import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import media from '../../styles/media';
import { FaTimes } from 'react-icons/fa';

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
  cursor: pointer;
  
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

const EnhancedCertificateImage = styled(CertificateImage)`
  &.diploma {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    transform: translateZ(0);
    background-color: #fff;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(217, 178, 147, 0.1) 100%);
      pointer-events: none;
    }
    
    img {
      filter: contrast(1.1) brightness(1.05) saturate(1.07);
      border-radius: 10px;
      transform: scale(1);
      transition: transform 0.4s ease;
      box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
    }
    
    &:hover img {
      transform: scale(1.03);
    }
    
    &::before {
      content: '';
      position: absolute;
      top: -15px;
      left: -15px;
      right: 15px;
      bottom: 15px;
      border: 2px solid #d9b293;
      border-radius: 20px;
      z-index: -1;
      opacity: 0.5;
      transition: all 0.3s ease;
    }
    
    &:hover::before {
      opacity: 0.8;
      transform: translate(5px, 5px);
    }
  }
`;

const DiplomaFrame = styled.div`
  position: relative;
  padding: 20px;
  background: linear-gradient(135deg, #f8f5f2 0%, #fff 100%);
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 10px 25px rgba(166, 106, 66, 0.1);
  transform: perspective(1000px) rotateX(2deg);
  transform-origin: center bottom;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: perspective(1000px) rotateX(0deg);
    box-shadow: 0 15px 35px rgba(166, 106, 66, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #d9b293;
    border-radius: 16px;
    opacity: 0.2;
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -5px;
    height: 10px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.05), transparent);
    border-radius: 50%;
    z-index: -1;
    filter: blur(5px);
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

const LightboxContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  
  img {
    max-width: 100%;
    max-height: 90vh;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: rotate(90deg);
  }
`;

const ZoomHint = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(217, 178, 147, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  
  ${CertificateImage}:hover &, 
  ${EnhancedCertificateImage}.diploma:hover & {
    opacity: 1;
    transform: translateY(0);
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  
  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

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
                <DiplomaFrame>
                  <EnhancedCertificateImage 
                    className="diploma" 
                    onClick={() => openLightbox('/images/diplom.jpg')}
                  >
                    <img src="/images/diplom.jpg" alt="Диплом о профессиональной переподготовке" />
                    <ZoomHint>Нажмите для увеличения</ZoomHint>
                  </EnhancedCertificateImage>
                </DiplomaFrame>
                <CertificateCaption>
                  <h4>Диплом о профессиональной переподготовке</h4>
                  <p>Квалификация в области психологического консультирования и психотерапии</p>
                </CertificateCaption>
              </CertificateWrapper>
              
              <CertificateWrapper>
                <CertificateImage onClick={() => openLightbox('/images/certificate2.png')}>
                  <img src="/images/certificate2.png" alt="Сертификат Теоны Хаметовой" />
                  <ZoomHint>Нажмите для увеличения</ZoomHint>
                </CertificateImage>
                <CertificateCaption>
                  <h4>Сертификат квалифицированного специалиста</h4>
                  <p>Обучение современным техникам психологической помощи</p>
                </CertificateCaption>
              </CertificateWrapper>
              
              <CertificateWrapper>
                <CertificateImage onClick={() => openLightbox('/images/certificate3.png')}>
                  <img src="/images/certificate3.png" alt="Сертификат о дополнительном образовании" />
                  <ZoomHint>Нажмите для увеличения</ZoomHint>
                </CertificateImage>
                <CertificateCaption>
                  <h4>Сертификат о профессиональной подготовке</h4>
                  <p>Специализация в области интегральной психологии</p>
                </CertificateCaption>
              </CertificateWrapper>
              
              <CertificateWrapper>
                <CertificateImage onClick={() => openLightbox('/images/certificate.jpg')}>
                  <img src="/images/certificate.jpg" alt="Диплом профессионального психолога" />
                  <ZoomHint>Нажмите для увеличения</ZoomHint>
                </CertificateImage>
                <CertificateCaption>
                  <h4>Диплом профессионального психолога</h4>
                  <p>Специализация: психологическое консультирование и терапия</p>
                </CertificateCaption>
              </CertificateWrapper>
            </CertificatesGrid>
          </AnimatedElement>
        </CertificateContent>
      </Container>
      
      {/* Лайтбокс для увеличенного просмотра */}
      <LightboxOverlay className={lightboxOpen ? 'active' : ''} onClick={closeLightbox}>
        <LightboxContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={closeLightbox}>
            <FaTimes />
          </CloseButton>
          {lightboxImage && <img src={lightboxImage} alt="Увеличенный сертификат" />}
        </LightboxContent>
      </LightboxOverlay>
    </CertificateSectionContainer>
  );
};

export default CertificateSection; 
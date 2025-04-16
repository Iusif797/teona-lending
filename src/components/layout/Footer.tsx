import styled from 'styled-components';
import Container from '../ui/Container';
import { SITE_TITLE, NAV_LINKS } from '../../data/constants';
import media from '../../styles/media';

const FooterContainer = styled.footer`
  padding: 60px 0;
  background-color: #f2f2f2;
  
  ${media.sm} {
    padding: 40px 0;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  ${media.md} {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FooterLeft = styled.div``;

const FooterRight = styled.div`
  display: flex;
  justify-content: flex-end;
  
  ${media.md} {
    justify-content: flex-start;
  }
`;

const FooterLogo = styled.div`
  margin-bottom: 1.5rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 400;
  }
`;

const FooterText = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-secondary);
  margin-bottom: 2rem;
  max-width: 450px;
`;

const FooterNav = styled.nav``;

const FooterNavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterNavItem = styled.li`
  a {
    font-size: 1rem;
    color: var(--color-secondary);
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--color-primary);
    }
  }
`;

const CopyrightSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  
  p {
    font-size: 0.9rem;
    color: var(--color-secondary);
  }
`;

const DeveloperText = styled.p`
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-top: 1rem;
  font-style: italic;
  position: relative;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  
  &::before, &::after {
    content: '';
    position: absolute;
    height: 1px;
    width: 2rem;
    background: linear-gradient(to right, transparent, var(--color-primary-light), transparent);
    top: 50%;
    opacity: 0.7;
    transition: width 0.3s ease;
  }
  
  &::before {
    left: -0.5rem;
    transform: translateX(-100%);
  }
  
  &::after {
    right: -0.5rem;
    transform: translateX(100%);
  }
  
  &:hover::before, &:hover::after {
    width: 3rem;
    opacity: 1;
  }
  
  a {
    color: var(--color-primary);
    transition: all 0.3s ease;
    font-weight: 500;
    letter-spacing: 0.5px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background-color: var(--color-primary-dark);
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: var(--color-primary-dark);
      text-decoration: none;
      
      &::after {
        width: 100%;
      }
    }
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterLeft>
            <FooterLogo>
              <h3>{SITE_TITLE}</h3>
            </FooterLogo>
            <FooterText>
              Психолог, помогающий людям обрести гармонию с собой и миром через 
              профессиональную поддержку и глубокое понимание.
            </FooterText>
          </FooterLeft>
          
          <FooterRight>
            <FooterNav>
              <FooterNavList>
                {NAV_LINKS.map((link) => (
                  <FooterNavItem key={link.id}>
                    <a href={link.url}>{link.title}</a>
                  </FooterNavItem>
                ))}
              </FooterNavList>
            </FooterNav>
          </FooterRight>
        </FooterContent>
        
        <CopyrightSection>
          <p>&copy; {currentYear} {SITE_TITLE}. Все права защищены.</p>
          <DeveloperText>
            Developed by{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">
              Iusif Mamedov
            </a>
          </DeveloperText>
        </CopyrightSection>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 
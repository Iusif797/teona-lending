import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { NAV_LINKS, SITE_TITLE, SITE_SUBTITLE } from '../../data/constants';
import Container from '../ui/Container';
import media from '../../styles/media';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

interface HeaderProps {
  onMenuToggle?: Dispatch<SetStateAction<boolean>>;
}

const HeaderWrapper = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: ${({ isScrolled }) => (isScrolled ? '10px 0' : '15px 0')};
  background-color: ${({ isScrolled }) => (isScrolled ? 'white' : 'transparent')};
  box-shadow: ${({ isScrolled }) => (isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none')};
  transition: all 0.3s ease;
  
  @media (max-width: 600px) {
    padding: ${({ isScrolled }) => (isScrolled ? '9px 0' : '14px 0')};
  }
  
  @media (max-width: 400px) {
    padding: ${({ isScrolled }) => (isScrolled ? '8px 0' : '12px 0')};
  }
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: padding 0.3s ease;
  
  @media (max-width: 767px) {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  @media (max-width: 450px) {
    padding-left: 12px;
    padding-right: 12px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: -5px;
    right: -5px;
    bottom: -5px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(166, 106, 66, 0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  @media (max-width: 600px) {
    gap: 12px;
  }
  
  ${media.sm} {
    gap: 10px;
  }
  
  @media (max-width: 360px) {
    gap: 8px;
  }
`;

const LogoImage = styled.div<{ isScrolled: boolean }>`
  width: ${({ isScrolled }) => (isScrolled ? '45px' : '55px')};
  height: ${({ isScrolled }) => (isScrolled ? '45px' : '55px')};
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(166, 106, 66, 0.15);
  border: 2px solid #f8f5f2;
  position: relative;
  transform: translateZ(0);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 1px solid rgba(217, 178, 147, 0.3);
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: contrast(1.05);
  }
  
  &:hover {
    box-shadow: 0 5px 15px rgba(166, 106, 66, 0.25);
    transform: translateY(-2px) translateZ(0);
  }
  
  &:hover img {
    transform: scale(1.08);
  }
  
  @media (max-width: 600px) {
    width: ${({ isScrolled }) => (isScrolled ? '42px' : '50px')};
    height: ${({ isScrolled }) => (isScrolled ? '42px' : '50px')};
  }
  
  ${media.md} {
    width: ${({ isScrolled }) => (isScrolled ? '40px' : '45px')};
    height: ${({ isScrolled }) => (isScrolled ? '40px' : '45px')};
  }
  
  ${media.sm} {
    width: ${({ isScrolled }) => (isScrolled ? '35px' : '40px')};
    height: ${({ isScrolled }) => (isScrolled ? '35px' : '40px')};
  }
  
  @media (max-width: 360px) {
    width: ${({ isScrolled }) => (isScrolled ? '32px' : '35px')};
    height: ${({ isScrolled }) => (isScrolled ? '32px' : '35px')};
  }
`;

const Logo = styled.div<{ isScrolled: boolean }>`
  display: flex;
  flex-direction: column;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: ${({ isScrolled }) => isScrolled ? 'translateX(0)' : 'translateX(0)'};
  
  h1 {
    font-size: ${({ isScrolled }) => (isScrolled ? '1.7rem' : '1.8rem')};
    line-height: 1;
    margin: 0;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--color-primary);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  span {
    font-size: ${({ isScrolled }) => (isScrolled ? '0.95rem' : '1rem')};
    color: var(--color-primary-dark);
    font-weight: 500;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    margin-top: 5px;
    letter-spacing: 0.5px;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  
  @media (max-width: 600px) {
    h1 {
      font-size: ${({ isScrolled }) => (isScrolled ? '1.5rem' : '1.6rem')};
    }
    
    span {
      font-size: ${({ isScrolled }) => (isScrolled ? '0.9rem' : '0.95rem')};
    }
  }
  
  ${media.md} {
    h1 {
      font-size: ${({ isScrolled }) => (isScrolled ? '1.4rem' : '1.5rem')};
    }
    
    span {
      font-size: ${({ isScrolled }) => (isScrolled ? '0.85rem' : '0.9rem')};
    }
  }
  
  ${media.sm} {
    h1 {
      font-size: ${({ isScrolled }) => (isScrolled ? '1.2rem' : '1.3rem')};
    }
    
    span {
      font-size: ${({ isScrolled }) => (isScrolled ? '0.75rem' : '0.8rem')};
    }
  }
  
  @media (max-width: 450px) {
    h1 {
      font-size: ${({ isScrolled }) => (isScrolled ? '1.15rem' : '1.25rem')};
    }
    
    span {
      font-size: ${({ isScrolled }) => (isScrolled ? '0.72rem' : '0.78rem')};
    }
  }
  
  @media (max-width: 400px) {
    h1 {
      font-size: ${({ isScrolled }) => (isScrolled ? '1.1rem' : '1.2rem')};
    }
    
    span {
      font-size: ${({ isScrolled }) => (isScrolled ? '0.7rem' : '0.75rem')};
    }
  }
  
  @media (max-width: 360px) {
    h1 {
      font-size: ${({ isScrolled }) => (isScrolled ? '1rem' : '1.1rem')};
    }
    
    span {
      font-size: ${({ isScrolled }) => (isScrolled ? '0.65rem' : '0.7rem')};
      letter-spacing: 0.3px;
    }
  }
`;

const Nav = styled.nav`
  ${media.lg} {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.8rem;

  ${media.custom('1500px')} {
    gap: 1.4rem;
  }

  ${media.xl} {
    gap: 1.1rem;
  }
`;

const NavItem = styled.li`
  a {
    position: relative;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
    
    ${media.custom('1500px')} {
      font-size: 0.88rem;
    }
    
    ${media.xl} {
      font-size: 0.85rem;
    }
    
    &:hover {
      color: var(--color-secondary);
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 1px;
      background-color: var(--color-secondary);
      transition: width 0.3s ease;
    }
    
    &:hover::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  width: 30px;
  height: 22px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 110;
  
  &:hover {
    transform: scale(1.05);
  }
  
  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: var(--color-primary);
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    &:nth-child(1) {
      top: 0;
    }
    
    &:nth-child(2) {
      top: 9px;
    }
    
    &:nth-child(3) {
      top: 18px;
    }
  }
  
  &.open span {
    &:nth-child(1) {
      top: 9px;
      transform: rotate(135deg);
    }
    
    &:nth-child(2) {
      opacity: 0;
      left: -60px;
    }
    
    &:nth-child(3) {
      top: 9px;
      transform: rotate(-135deg);
    }
  }
  
  ${media.lg} {
    display: block;
  }
  
  @media (max-width: 450px) {
    width: 28px;
    height: 20px;
    
    span:nth-child(2) {
      top: 8px;
    }
    
    span:nth-child(3) {
      top: 16px;
    }
    
    &.open span:nth-child(1),
    &.open span:nth-child(3) {
      top: 8px;
    }
  }
  
  @media (max-width: 360px) {
    width: 26px;
    height: 18px;
    
    span:nth-child(2) {
      top: 8px;
    }
    
    span:nth-child(3) {
      top: 16px;
    }
    
    &.open span:nth-child(1),
    &.open span:nth-child(3) {
      top: 8px;
    }
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 80%;
  max-width: 400px;
  height: 100vh;
  background: linear-gradient(180deg, var(--color-primary-light) 0%, #ffffff 60%);
  z-index: 100;
  padding: 80px 2rem 2rem;
  transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: ${({ isOpen }) => (isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.1)' : 'none')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  
  @media (max-width: 450px) {
    width: 85%;
    padding: 75px 1.5rem 1.5rem;
  }
  
  ul {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    list-style: none;
    align-items: center;
    width: 100%;
    
    li {
      width: 100%;
      
      a {
        display: inline-block;
        width: 100%;
        font-size: 1.2rem;
        letter-spacing: 0.5px;
        transition: color 0.3s ease;
        
        &:hover {
          color: var(--color-secondary);
        }
      }
    }
    
    @media (max-width: 450px) {
      gap: 1.3rem;
      
      li a {
        font-size: 1.1rem;
      }
    }
  }
`;

const MobileSocialIcons = styled.div`
  margin-top: auto;
  padding-top: 2rem;
  padding-bottom: 6rem;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    color: var(--color-primary);
    transition: color 0.3s ease, transform 0.3s ease;
    background: rgba(255, 255, 255, 0.15);
    padding: 0.8rem;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &:hover {
      color: var(--color-primary-dark);
      transform: translateY(-2px) scale(1.1);
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: var(--color-primary);
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: var(--color-primary-dark);
      transform: translateY(-2px) scale(1.1);
    }
  }

  ${media.lg} {
    display: none;
  }
`;

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (onMenuToggle) {
      onMenuToggle(newState);
    }
    
    // Блокировать прокрутку при открытом меню
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Плавный скролл вверх при нажатии на логотип
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Закрыть мобильное меню, если оно открыто
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      if (onMenuToggle) {
        onMenuToggle(false);
      }
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 360);
      setIsMediumScreen(window.innerWidth <= 450);
    };

    // Вызываем функцию при монтировании
    handleResize();
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <HeaderWrapper isScrolled={isScrolled}>
      <HeaderContainer>
        <LogoWrapper>
          <a href="#top" onClick={handleLogoClick} style={{ textDecoration: 'none', display: 'contents' }}>
            <LogoImage isScrolled={isScrolled}>
              <img src="/images/logo.jpg" alt="Теона Хаметова - Логотип" />
            </LogoImage>
            <Logo isScrolled={isScrolled}>
              <h1>{SITE_TITLE}</h1>
              {((!isSmallScreen && !isMediumScreen) || !isScrolled) && <span>{SITE_SUBTITLE}</span>}
            </Logo>
          </a>
        </LogoWrapper>

        <Nav>
          <NavList>
            {NAV_LINKS.map((link) => (
              <NavItem key={link.id}>
                <a href={link.url}>{link.title}</a>
              </NavItem>
            ))}
          </NavList>
        </Nav>

        <SocialIcons>
          <a href="https://www.instagram.com/teona_psychologist/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://wa.me/994505252509" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
        </SocialIcons>

        <MobileMenuButton 
          className={isMobileMenuOpen ? 'open' : ''} 
          onClick={toggleMobileMenu}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>

        <MobileMenu isOpen={isMobileMenuOpen}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a 
                  href={link.url} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onMenuToggle) {
                      onMenuToggle(false);
                    }
                    document.body.style.overflow = 'auto';
                  }}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
          <MobileSocialIcons>
            <a href="https://www.instagram.com/teona_psychologist/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/994505252509" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </MobileSocialIcons>
        </MobileMenu>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header; 
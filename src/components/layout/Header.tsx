import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { NAV_LINKS, SITE_TITLE, SITE_SUBTITLE } from '../../data/constants';
import Container from '../ui/Container';
import media from '../../styles/media';

interface HeaderProps {
  onMenuToggle?: Dispatch<SetStateAction<boolean>>;
}

const HeaderWrapper = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: ${({ isScrolled }) => (isScrolled ? '15px 0' : '25px 0')};
  background-color: ${({ isScrolled }) => (isScrolled ? 'white' : 'transparent')};
  box-shadow: ${({ isScrolled }) => (isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none')};
  transition: all 0.3s ease;
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  
  h1 {
    font-size: 1.8rem;
    line-height: 1;
    margin: 0;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--color-primary);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  span {
    font-size: 1rem;
    color: var(--color-primary-dark);
    font-weight: 500;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    margin-top: 5px;
    letter-spacing: 0.5px;
  }
  
  ${media.md} {
    h1 {
      font-size: 1.5rem;
    }
    
    span {
      font-size: 0.9rem;
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
  gap: 2rem;
`;

const NavItem = styled.li`
  a {
    position: relative;
    font-size: 0.95rem;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
    
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
  cursor: pointer;
  width: 30px;
  height: 20px;
  position: relative;
  z-index: 101;
  
  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: var(--color-primary);
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    
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
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 80%;
  max-width: 400px;
  height: 100vh;
  background-color: white;
  z-index: 100;
  padding: 80px 2rem 2rem;
  transition: right 0.3s ease;
  box-shadow: ${({ isOpen }) => (isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.1)' : 'none')};
  
  ul {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    list-style: none;
    
    li {
      a {
        font-size: 1.2rem;
        letter-spacing: 0.5px;
      }
    }
  }
`;

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (onMenuToggle) {
      onMenuToggle(newState);
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderWrapper isScrolled={isScrolled}>
      <HeaderContainer>
        <Logo>
          <h1>{SITE_TITLE}</h1>
          <span>{SITE_SUBTITLE}</span>
        </Logo>

        <Nav>
          <NavList>
            {NAV_LINKS.map((link) => (
              <NavItem key={link.id}>
                <a href={link.url}>{link.title}</a>
              </NavItem>
            ))}
          </NavList>
        </Nav>

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
                  }}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </MobileMenu>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header; 
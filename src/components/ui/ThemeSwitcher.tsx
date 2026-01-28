import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const SwitcherButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    transform: scale(1.05);
  }

  svg {
    width: 1rem;
    height: 1rem;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const IconWrapper = styled.span<{ isVisible: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0)')};
  transition: all 0.3s ease;
`;

const ThemeSwitcher: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <SwitcherButton
      onClick={toggleTheme}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить темную тему'}
      title={isDark ? 'Светлая тема' : 'Темная тема'}
    >
      <IconWrapper isVisible={!isDark}>
        <FaMoon />
      </IconWrapper>
      <IconWrapper isVisible={isDark}>
        <FaSun />
      </IconWrapper>
    </SwitcherButton>
  );
};

export default ThemeSwitcher;

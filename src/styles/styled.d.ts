import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight: string;
      primaryDark: string;
      secondary: string;
      text: string;
      textLight: string;
      bg: string;
      bgAlt: string;
      border: string;
      accent: string;
      accentLight: string;
      success: string;
      background?: string; // Добавляем для совместимости с компонентом LanguageSwitcher
    };
    fonts: {
      primary: string;
      heading: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
    };
    borderRadius: {
      small: string;
      default: string;
      large: string;
      full: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
} 
const theme = {
  colors: {
    primary: 'var(--color-primary)',
    primaryLight: 'var(--color-primary-light)',
    primaryDark: 'var(--color-primary-dark)',
    secondary: 'var(--color-secondary)',
    text: 'var(--color-text)',
    textLight: 'var(--color-text-light)',
    bg: 'var(--color-bg)',
    bgAlt: 'var(--color-bg-alt)',
    border: 'var(--color-border)',
    accent: 'var(--color-accent)',
    accentLight: 'var(--color-accent-light)',
    success: 'var(--color-success)'
  },
  fonts: {
    primary: 'var(--font-primary)',
    heading: 'var(--font-heading)',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.03)',
    medium: 'var(--shadow)',
    large: '0 16px 48px rgba(0, 0, 0, 0.08)',
    hover: 'var(--shadow-hover)',
  },
  transitions: {
    default: 'var(--transition)',
    fast: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  borderRadius: {
    small: 'var(--radius-sm)',
    default: 'var(--radius)',
    large: '20px',
    full: '9999px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2.5rem',
    xl: '4rem',
    xxl: '6rem',
  }
};

export default theme; 
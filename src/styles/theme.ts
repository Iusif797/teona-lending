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
    small: '0 2px 5px rgba(0, 0, 0, 0.05)',
    medium: 'var(--shadow)',
    large: '0 10px 25px rgba(0, 0, 0, 0.15)',
  },
  transitions: {
    default: 'var(--transition)',
    fast: 'all 0.2s ease',
    slow: 'all 0.5s ease',
  },
  borderRadius: {
    small: '4px',
    default: 'var(--radius)',
    large: '16px',
    full: '9999px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '5rem',
  }
};

export default theme; 
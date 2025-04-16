const breakpoints = {
  xxs: '360px',
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

export const media = {
  xxs: `@media (max-width: ${breakpoints.xxs})`,
  xs: `@media (max-width: ${breakpoints.xs})`,
  sm: `@media (max-width: ${breakpoints.sm})`,
  md: `@media (max-width: ${breakpoints.md})`,
  lg: `@media (max-width: ${breakpoints.lg})`,
  xl: `@media (max-width: ${breakpoints.xl})`,
  custom: (size: string) => `@media (max-width: ${size})`,
  minWidth: (size: string) => `@media (min-width: ${size})`,
};

export default media; 
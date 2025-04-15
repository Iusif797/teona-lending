import { createGlobalStyle } from 'styled-components';
import media from './media';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

  :root {
    --font-primary: 'Montserrat', sans-serif;
    --font-heading: 'Playfair Display', serif;
    --color-primary: #d2956b;
    --color-primary-light: #e3b090;
    --color-primary-dark: #a66a42;
    --color-secondary: #4a4a4a;
    --color-text: #2a2a2a;
    --color-text-light: #767676;
    --color-bg: #fff;
    --color-bg-alt: #f9f9f9;
    --color-border: #e0e0e0;
    --color-accent: #5d8aa8;
    --color-accent-light: #7ba7c3;
    --color-success: #58b368;
    --transition: all 0.3s ease;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
    --radius: 8px;
    --container-width: 1400px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    
    ${media.md} {
      font-size: 15px;
    }
    
    ${media.sm} {
      font-size: 14px;
    }
  }

  body {
    font-family: var(--font-primary);
    color: var(--color-text);
    background-color: var(--color-bg);
    overflow-x: hidden;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    width: 100vw;
    max-width: 100vw;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    line-height: 1.3;
    margin-bottom: 1rem;
    font-weight: 600;
    color: var(--color-text);
    letter-spacing: 0.5px;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      color: var(--color-primary-dark);
    }
  }

  ul {
    list-style-type: none;
  }

  button, input, textarea {
    font-family: var(--font-primary);
    font-size: 1rem;
    border: none;
    outline: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    background: none;
    transition: var(--transition);
    padding: 0;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
  }

  img, svg {
    max-width: 100%;
    display: block;
  }

  .d-none {
    display: none !important;
  }

  .d-flex {
    display: flex !important;
  }

  .text-center {
    text-align: center !important;
  }

  .text-left {
    text-align: left !important;
  }

  .text-right {
    text-align: right !important;
  }

  .hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .visible {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-primary-light);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
  }

  ::selection {
    background-color: var(--color-primary-light);
    color: white;
  }

  #root {
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
  }

  section {
    padding: 5rem 0;

    ${media.md} {
      padding: 4rem 0;
    }

    ${media.sm} {
      padding: 3rem 0;
    }
  }

  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export default GlobalStyles; 
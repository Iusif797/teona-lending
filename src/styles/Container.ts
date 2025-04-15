import styled from 'styled-components';
import media from './media';

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  ${media.xl} {
    padding: 0 2.5rem;
  }

  ${media.lg} {
    max-width: 1100px;
    padding: 0 2rem;
  }

  ${media.md} {
    max-width: 900px;
    padding: 0 1.5rem;
  }

  ${media.sm} {
    max-width: 100%;
    padding: 0 1.5rem;
  }
`;

export default Container; 
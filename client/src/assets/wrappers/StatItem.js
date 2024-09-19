import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--light-small-component-background);
  box-shadow: var(--light-small-component-shadow);
  border-radius: 1.6rem;
  display: flex;
  justify-content: start;
  column-gap: 1.6rem;
  padding: 2.4rem;

  .stat-header {
    display: flex;
    flex-direction: column;
    row-gap: 0.4rem;
    justify-content: center;
    align-items: start;
  }

  .count {
    color: var(--light-theme-700);
    font-size: 3.2rem;
    font-weight: 600;
    line-height: 1;
  }

  .title {
    color: var(--light-theme-600);
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
  }

  .stat-icon {
    color: var(--white);
    padding: 0.6rem;
    height: 5.2rem;
    width: 5.2rem;
    background: ${(props) => props.bg};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /***** BELOW 944PX (Smaller Tablets) *****/

  @media (max-width: 59em) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;

    .stat-header {
      align-items: center;
      line-height: 1.6;
    }
  }
`;

export default Wrapper;

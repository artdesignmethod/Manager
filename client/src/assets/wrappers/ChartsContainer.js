import styled from "styled-components";

const Wrapper = styled.section`
  background: var(--light-large-component-background);
  box-shadow: var(--light-large-component-shadow);
  border-radius: 1.6rem;
  margin-top: 3.2rem;
  padding: 3.2rem 2.4rem;
  text-align: center;

  .charts-heading {
    color: var(--light-theme-700);
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 2.4rem;
  }

  .charts-button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    text-transform: capitalize;
    color: var(--light-theme-700);
    font-size: 1.8rem;
    letter-spacing: 0.1rem;
  }
`;

export default Wrapper;

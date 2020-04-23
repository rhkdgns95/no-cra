import * as StyleThings from 'styled-components';

const { createGlobalStyle } = StyleThings;

const HomeStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

  html, body {
    font-family: 'Roboto', sans-serif;
  }
  div {
    color: green;
  }
`;

export default HomeStyles;

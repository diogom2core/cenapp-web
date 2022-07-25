import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import 'react-day-picker/lib/style.css';

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: #F6F5F8;
  }

  body, input, button {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

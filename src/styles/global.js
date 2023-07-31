import { createGlobalStyle } from 'styled-components';
import 'antd/dist/reset.css';
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';

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
    height: 100%;
  }


  body, input, button {
    font-family: 'Roboto', sans-serif;
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

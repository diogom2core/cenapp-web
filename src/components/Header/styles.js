import styled from 'styled-components';

export const Container = styled.div`
  height: 55px;
  width: 100%;
  position: absolute;
  top: 0;
  background: #fff;
  padding: 0 15px;

  > div {
    max-width: 1400px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    h1 {
      color: #111111;
      font-size: 18px;
      margin: 0;
    }
  }
`;

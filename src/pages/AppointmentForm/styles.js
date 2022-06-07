import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  background: #232129;

  @media (max-width: 414px) {
    justify-content: center;
  }
`;

export const Content = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  align-self: center;
  background: #fff;
  border-radius: 7px;
  box-shadow: 1px 1px 8px rgba(1, 1, 0, 0.7);
  padding: 50px;
  margin: 0 15px;

  form {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;

    h3 {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 60px;
      color: #000;
    }

    button {
      width: 300px;
      height: 45px;
      border-radius: 5px;
      font-size: 15px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 40px auto 0 auto;
      background: none;
      border: none;
      color: #fff;
      background: #40d4c3;
      text-decoration: none;
    }
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Column = styled.div`
  width: 31.33%;
  padding: 0 1%;
  margin-bottom: 30px;

  .ant-select-selector {
    background: #ececec !important;
    color: #959595 !important;
    display: flex;
    align-items: center;
    height: 37px;
  }

  label {
    display: block;
    text-align: left;
    margin-bottom: 10px;
    color: #959595;
  }

  input {
    border: none;
    width: 100%;
    height: 37px;
    display: flex;
    align-items: center;
    background: #ececec;
    border-radius: 4px;
    padding: 12px;
    font-size: 14px;
  }
`;

export const AppoitmentFinish = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
  }

  h3 {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  p {
    max-width: 400px;
  }
`;

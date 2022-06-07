import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  margin-top: 35px;
  max-width: 900px;
  width: 100%;
  margin-left: 70px;
  margin-right: 70px;
  padding-bottom: 120px;

  h2 {
    color: #111;
    font-weight: 400;
  }
`;

export const BoxEdit = styled.div`
  max-width: 820px;
  margin: 40px auto 0 auto;
  border-radius: 8px;
  padding: 30px;
  background: #fff;

  .ant-select-selector {
    background: #ececec !important;
  }

  form {
    .line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      > div {
        width: 31.33%;
        padding: 0 1%;

        &.col12 {
          width: 100%;
        }

        > div {
          > strong {
            font-weight: 500;
            color: #fff;
            margin-left: 20px;
          }
        }
      }

      label {
        color: #111;
        font-size: 14px;
        margin-bottom: 8px;
        display: block;
      }

      input {
        border: none;
        width: 100%;
        height: 33px;
        display: flex;
        align-items: center;
        background: #ececec;
        border-radius: 4px;
        padding: 12px;
        font-size: 14px;
      }

      textarea {
        width: 100%;
        height: 120px;
        padding: 10px;
        background: #ececec;
      }
    }
  }

  .button-box {
    text-align: center;
    margin-top: 40px;

    button {
      margin-left: 25px;
      border: none;
      padding: 10px 45px;
      border-radius: 5px;
      position: relative;
      text-transform: none;
      transition: all 0.15s ease;
      letter-spacing: 0.025em;
      font-size: 0.875rem;
      color: #fff;
      background-color: #40d4c3;
      transition: all 0.15s ease;
      &:hover {
        background-color: #40d4c3;
      }
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

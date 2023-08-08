import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  margin-top: 35px;
  max-width: 1600px;
  width: 100%;
  margin-left: 70px;
  margin-right: 70px;
  padding-bottom: 120px;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: fadeIn 0.5s ease-in-out;
`;

export const BoxVisualization = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 40px auto 0 auto;
  border-radius: 8px;
  padding: 30px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;

  > div {
    width: 50%;
  }

  .ant-select-selector {
    background: #ececec !important;
  }

  .button {
    margin: 40px auto 0 auto;
  }

  h3 {
    color: #3f3f3f;
    font-size: 18px;
    text-align: left;
    text-transform: uppercase;
    margin-bottom: 20px;
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
        font-weight: 500;
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
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      color: #fff;
      background-color: #40d4c3;
    }
  }

  ul {
    margin-top: 40px;
    li {
      font-size: 13px;
      line-height: 26px;
    }
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

export const ModalConfirm = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  transition: 0.5s;

  .content {
    width: 800px;
    background: #fff;
    border-radius: 7px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 20px;
    display: ${(props) => (props.open ? 'block' : 'none')};
    transition: 0.5s;

    &-header {
      text-align: right;
      svg {
        cursor: pointer;
      }

      button {
        border: none;
        background: none;
      }
    }

    > p {
      font-size: 20px;
      text-align: center;
      padding: 40px 0;
    }

    &-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50px;

      span {
        color: #6a6a6a;
        font-size: 14px;
        cursor: pointer;
        margin-right: 20px;
      }

      button {
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        position: relative;
        text-transform: none;
        transition: all 0.15s ease;
        letter-spacing: 0.025em;
        font-size: 0.875rem;
        color: #fff;
        background-color: #40d4c3;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;

  h2 {
    color: #111;
    font-weight: 500;
    font-size: 24px;
    margin: 0;
  }
`;

export const DateInputBox = styled.div`
  margin-right: 15px;
  margin-top: 15px;

  label {
    margin-right: 10px;
    font-size: 14px;
  }

  input {
    min-width: 260px;
    height: 38px;
    background-color: #ffffff;
    border: 1px solid rgb(217, 217, 217);
    padding: 4px 15px;
    border-radius: 6px;
  }
`;

export const InfoExtra = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const Fild = styled.div`
  margin-bottom: 30px;
  margin-right: 40px;
  min-width: 200px;
  max-width: 200px;

  margin-top: 20px;

  @media (max-width: 500px) {
    margin-right: 0;
    width: 100%;
  }

  .ant-select-selector {
    background: #ececec !important;
    color: #959595 !important;
    display: flex;
    align-items: center;
    height: 37px;
  }

  .ant-radio-group {
    display: flex;
  }

  .ant-checkbox-group {
    display: flex;
    label {
      display: flex;
    }
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

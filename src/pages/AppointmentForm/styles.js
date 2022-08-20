import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f2f2f2;

  @media (max-width: 414px) {
    justify-content: center;
  }
`;

export const Content = styled.div`
  max-width: 840px;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 100%;
  align-self: center;
  background: #fff;
  border-radius: 7px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @media (max-width: 500px) {
    padding: 50px 30px;
  }

  > h3 {
    background: #40d4c3;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 60px;
    color: #fff;
    text-transform: uppercase;
    padding: 7px;
  }

  form {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px 30px 30px;

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

export const Fild = styled.div`
  margin-bottom: 30px;
  margin-right: 40px;
  min-width: 200px;

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

export const AppoitmentFinish = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

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

export const UnvailableMessage = styled.div`
  display: flex;
  justify-content: center;

  p {
    margin-left: 10px;
    color: red;
    max-width: 300px;
  }
`;

export const FormBox = styled.div`
  margin-bottom: 40px;

  h3 {
    color: #3f3f3f;
    font-size: 18px;
    text-align: left;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .form_box_main {
    display: flex;
    margin-bottom: 20px;
    div {
      width: 40%;
    }

    .text_helper {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 26px;
      box-shadow: rgba(64, 212, 195, 0.3) 0px 1px 2px 0px,
        rgba(64, 212, 195, 0.3) 0px 2px 6px 2px;
    }

    @media (max-width: 500px) {
      flex-direction: column;
    }
  }

  .conditional_inputs {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const Footer = styled.div`
  p {
    text-align: center;
  }
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
    width: 100%;
    max-width: 650px;
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
        background: none;
        border: none;
      }
    }

    div {
      p {
        font-size: 14px;
      }

      strong {
        text-align: center;
        display: block;
        margin-bottom: 30px;
      }

      span {
        display: block;
        text-align: center;
        color: red;
      }

      @media (max-width: 500px) {
        p {
          font-size: 12px;
        }
      }
    }

    &-footer {
      margin-top: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: #6a6a6a;
        font-size: 14px;
        cursor: pointer;
      }

      button {
        margin-left: 30px;
        border: none;
        padding: 10px 25px;
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

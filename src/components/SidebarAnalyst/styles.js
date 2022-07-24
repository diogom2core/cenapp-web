/* eslint-disable indent */
import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #fff;
  min-height: 100vh;
  width: 270px;
  padding: 35px 15px;
`;

export const ModuleItens = styled.div`
  margin-bottom: 30px;
  > span {
    color: #111;
    font-weight: 600;
  }

  ul {
    margin-top: 10px !important;
  }
`;

ModuleItens.Item = styled.li`
  a {
    height: 40px;
    padding: 0 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    color: #111;
    transition: all ease-in 0.2s;

    &:hover {
      background: #40d4c3;
      color: #fff;
    }
  }

  span {
    margin-left: 10px;
    font-size: 14px;
  }

  ${({ active }) =>
    active &&
    css`
      a {
        background: #40d4c3;
      }
    `}
`;

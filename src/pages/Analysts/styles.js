import styled from 'styled-components';
import { Pagination as PaginationAnt } from 'antd';

export const Container = styled.div`
  height: 100%;
  margin-top: 35px;
  max-width: 900px;
  width: 100%;
  margin-left: 70px;
  margin-right: 70px;
  padding-bottom: 120px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;

  h2 {
    color: #111;
    font-weight: 600;
    margin: 0;
    font-size: 22px;
  }

  a {
    margin-left: 20px;
  }
`;

export const Filters = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 30px 20px;
  margin-top: 30px;
  margin-bottom: 60px;
  border-radius: 6px;
`;

export const FilterItem = styled.div`
  padding: 20px 10px 0px 10px;

  &.w100 {
    width: 100%;
  }
`;

export const Form = styled.div`
  display: flex;
  margin-top: 10px;
  input {
    flex: 1;
    background: none;
    border: none;
    border-bottom: 1px solid #c7c7c7;
    padding: 10px;
    font-size: 14px;
    color: #111;

    &::placeholder {
      color: #111;
    }
  }

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

  span {
    padding: 10px 30px;
    cursor: pointer;
    color: #349cf7;
  }
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 25px;
  border: none;
  border-collapse: separate;
  color: #111;
  border-spacing: 0 1em;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: fadeIn 0.5s ease-in-out;

  thead {
    tr {
      td {
        padding: 0 15px;
        font-weight: 600;
        &:last-child {
          text-align: center;
        }
      }
    }
  }

  tbody {
    tr {
      &.error {
        color: #000;
        text-align: center;
        display: table-row;
        height: 140px;

        td {
          background: none;
          font-size: 16px;
        }
      }

      td {
        font-size: 14px;
        height: 40px;
        padding: 0 15px;
        background: #fff;

        a {
          margin: 10px;
        }

        &:first-child {
          border-bottom-left-radius: 20px;
          border-top-left-radius: 20px;
        }

        &:last-child {
          text-align: center;
          border-bottom-right-radius: 20px;
          border-top-right-radius: 20px;
        }
      }
    }
  }
`;

export const Pagination = styled(PaginationAnt)`
  display: flex;
  justify-content: center;
  margin-top: 40px !important;
`;

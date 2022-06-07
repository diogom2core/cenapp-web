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

  h2 {
    color: #111;
    font-weight: 400;
  }
`;

export const Form = styled.div`
  margin-top: 70px;
  display: flex;

  input {
    flex: 1;
    background: none;
    border: none;
    border-bottom: 1px solid #484848;
    padding: 10px;
    font-size: 16px;
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
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 25px;
  border: none;
  border-collapse: separate;
  color: #111;
  border-spacing: 0 1em;

  thead {
    tr {
      td {
        padding: 0 15px;

        &:last-child {
          text-align: center;
        }
      }
    }
  }

  tbody {
    tr {
      &.error {
        color: #fff;
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
export const Filters = styled.div`
  margin: 40px 0;
  span {
    color: #fff;
  }
`;

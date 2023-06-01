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
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;

    h2 {
      color: #111;
      font-weight: 600;
      margin: 0;
      font-size: 22px;
    }

    span {
      font-size: 13px;
    }
  }
`;

export const Filters = styled.div`
  background: #fff;
  display: flex;
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

export const FilterDate = styled.div`
  width: 250px;
  position: relative;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  button {
    width: 250px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    text-align: center;

    svg {
      position: absolute;
      left: 10px;
    }
  }
`;

export const SelectDate = styled.div`
  position: relative;
  display: ${(props) => `${props.showDatePicker ? 'block' : 'none'} `};
  z-index: 999;

  h3 {
    font-size: 23px;
    color: #28262e;
    margin-bottom: 24px;
  }

  /* Daypicker */
  .DayPicker {
    width: 350px !important;
    border-radius: 10px;
    position: absolute;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    background: #fff;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px 16px 0 16px;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;

    &[aria-disabled='true'] {
      pointer-events: none;
    }
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--selected {
    background: #40d4c3 !important;
    border-radius: 10px;
    color: #fff !important;
  }
`;

export const Pagination = styled(PaginationAnt)`
  display: flex;
  justify-content: center;
  margin-top: 40px !important;
`;

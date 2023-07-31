import { Pagination as PaginationAnt } from 'antd';
import styled from 'styled-components/macro';

export const Pagination = styled(PaginationAnt)`
  display: flex;
  justify-content: center;
  margin-top: 40px !important;
  margin-bottom: 40px !important;
`;

export const TableActions = styled.div`
  @media (max-width: 1500px) {
    display: flex;
    flex-direction: column;

    button {
      margin: 15px 0 15px 0 !important;
    }
  }
`;

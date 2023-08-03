/* eslint-disable react/no-unstable-nested-components */
import { Button, Table, Tag, Tooltip } from 'antd';
import React from 'react';
import { MdVisibility } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import { Pagination, TableActions } from './styles';
import { getAppointmentStatusColor } from '../../utils/getAppointmentStatusColor';
import getStatusName from '../../../../helpers/getStatusName';

export function AppointmentsTable({
  appointments,
  paginationPage,
  setPaginationPage,
  appointmentsTotal,
  isSearching,
}) {
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: '1',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: '2',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: '3',
      render: (_, { status }) => (
        <>
          {status.map((tag) => (
            <Tag color={getAppointmentStatusColor(tag)} key="nice">
              {getStatusName(tag)}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Tipo',
      dataIndex: 'preference_service_type',
      key: '5',
    },
    {
      title: 'Analista',
      dataIndex: 'analyst',
      key: '6',
    },
    {
      title: 'Conhece membro da CENAPP',
      dataIndex: 'have_bond_spbsb',
      key: '7',
    },
    {
      title: 'Horário',
      dataIndex: 'time_preferences',
      key: '8',
    },
    {
      title: 'Modalidade',
      dataIndex: 'preference_service_modality',
      key: '9',
    },
    {
      title: 'Criação',
      dataIndex: 'createdFormatted',
      key: '4',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (appointment) => (
        <TableActions>
          <Tooltip title="Visualizar solicitação">
            <NavLink to={`/solicitacoes/ver/${appointment.id}`}>
              <Button
                icon={<MdVisibility size={20} color="#fff" />}
                href="https://www.google.com"
                style={{ background: '#1677ff' }}
                type="button"
              />
            </NavLink>
          </Tooltip>
        </TableActions>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={appointments} pagination={false} />

      {!isSearching && (
        <Pagination
          onChange={setPaginationPage}
          current={paginationPage}
          total={appointmentsTotal}
          showSizeChanger={false}
          defaultPageSize={10}
        />
      )}
    </>
  );
}

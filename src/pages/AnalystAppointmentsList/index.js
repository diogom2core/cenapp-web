/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import { Select } from 'antd';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdVisibility } from 'react-icons/md';

import api from '../../services/api';
import { Container, Table, Form, Title, Filters, FilterItem } from './styles';

const { Option } = Select;

function AnalystAppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [filterStatus, setFilterStatus] = useState('');

  async function loadAppointments() {
    setIsLoading(true);
    const response = await api.get('/analysts/appointments/search');

    setAppointments(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  async function searchAppointment() {
    console.log({
      filterStatus,
    });
    setIsLoading(true);
    const response = await api.get(`/analysts/appointments/search/?search=${searchWord}`);
    setAppointments(response.data);
    setIsLoading(false);
  }

  function changeWordSearch(word) {
    setSearchWord(word);
    if (word === '') {
      loadAppointments();
    }
  }

  function clearSearch() {
    setSearchWord('');
    loadAppointments();
  }

  return (
    <Container>
      <Title>
        <h2>Minhas Solicitações</h2>
        <span>Últimos 30 dias</span>
      </Title>

      <Filters>
        <FilterItem>
          <Select
            id="status"
            defaultValue="Selecione o status"
            style={{ width: 190 }}
            onChange={(statusValue) => setFilterStatus(statusValue)}
          >
            <Option key="null">Todos</Option>
            <Option key="pedding">Pedente</Option>
            <Option key="finish">Finalizado</Option>
          </Select>
        </FilterItem>

        <FilterItem className="w100">
          <Form>
            <input
              type="text"
              value={searchWord}
              placeholder="e-mail do paciente"
              onChange={event => changeWordSearch(event.target.value)}
              onKeyDown={event => event.key === 'Enter' && searchAppointment()}
            />

            <button type="button" onClick={searchAppointment}>
              Buscar
            </button>

            <span onClick={clearSearch}>
              Limpar
            </span>
          </Form>
        </FilterItem>

      </Filters>

      {!isLoading && (
      <Table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Email</td>
            <td>Status</td>
            <td>Última Atualização</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {appointments.length ? (
            appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.name}</td>
                <td>{appointment.email}</td>
                <td>{appointment.status}</td>
                <td>{format(parseISO(appointment.created_at), 'dd/MM/yyyy')}</td>
                <td>
                  <Link to={`/analista/solicitacao/${appointment.id}`}>
                    <MdVisibility
                      size={22}
                      color="#000"
                    />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr className="error">
              <td colSpan="4">Solicitação não encontrada</td>
            </tr>
          )}
        </tbody>
      </Table>
      )}

    </Container>
  );
}

export default AnalystAppointmentsList;

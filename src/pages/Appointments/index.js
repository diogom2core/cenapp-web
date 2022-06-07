/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import { Container, Table, Form, Pagination, Title } from './styles';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function loadAppointments() {
    setIsLoading(true);
    const response = await api.get('/appointments');

    setAppointments(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    api.get(`/appointments/?page=${page}`).then(response => {
      setAppointments(response.data);
      setIsLoading(false);
    });
  }, [page]);

  async function searchUser() {
    setIsLoading(true);
    const response = await api.get(`/appointments/?search=${searchWord}`);
    setAppointments(response.data);
    setIsLoading(false);
  }

  function changeWordSearch(word) {
    setSearchWord(word);
    if (word === '') {
      loadAppointments();
    }
  }

  return (
    <Container>
      <Title>
        <h2>Solicitações</h2>
      </Title>

      {!isLoading && (
      <>
        <Form>
          <input
            type="text"
            value={searchWord}
            placeholder="buscar usuário"
            onChange={event => changeWordSearch(event.target.value)}
            onKeyDown={event => event.key === 'Enter' && searchUser()}
          />

          <button type="button" onClick={searchUser}>
            Buscar
          </button>
        </Form>

        <Table>
          <thead>
            <tr>
              <td>Nome</td>
              <td>Email</td>
              <td>Status</td>
              <td>Última Atualização</td>
            </tr>
          </thead>
          <tbody>
            {appointments.length ? (
              appointments.map(analyst => (
                <tr key={analyst.id}>
                  <td>{analyst.name}</td>
                  <td>{analyst.email}</td>
                  <td>{analyst.status}</td>
                  <td>{analyst.created_at}</td>
                </tr>
              ))
            ) : (
              <tr className="error">
                <td colSpan="4">Usuário não encontrado</td>
              </tr>
            )}
          </tbody>
        </Table>

        {!!appointments.length && !searchWord && (
        <Pagination
          onChange={setPage}
          current={page}
          total={appointments.total}
          showSizeChanger={false}
          defaultPageSize={10}
        />
        )}

      </>
      )}

    </Container>
  );
}

export default Appointments;

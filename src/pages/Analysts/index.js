/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { Container, Table, Form, Pagination, Title } from './styles';

function AnalystList() {
  const [analysts, setAnalysts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function loadAnalysts() {
    setIsLoading(true);
    const response = await api.get('/admin/analyst');

    setAnalysts(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadAnalysts();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    api.get(`/admin/analyst/?page=${page}`).then(response => {
      setAnalysts(response.data);
      setIsLoading(false);
    });
  }, [page]);

  async function searchAnalyst() {
    setIsLoading(true);
    const response = await api.get(`/admin/analyst?search=${searchWord}`);
    setAnalysts(response.data);
    setIsLoading(false);
  }

  function changeWordSearch(word) {
    setSearchWord(word);
    if (word === '') {
      loadAnalysts();
    }
  }

  return (
    <Container>
      <Title>
        <h2>Analistas</h2>
        <Link to="/analistas/cadastro">Cadastrar</Link>
      </Title>

      {!isLoading && (
      <>
        <Form>
          <input
            type="text"
            value={searchWord}
            placeholder="buscar usuário"
            onChange={event => changeWordSearch(event.target.value)}
            onKeyDown={event => event.key === 'Enter' && searchAnalyst()}
          />

          <button type="button" onClick={searchAnalyst}>
            Buscar
          </button>
        </Form>

        <Table>
          <thead>
            <tr>
              <td>Nome</td>
              <td>Email</td>
              <td>Última Atualização</td>
            </tr>
          </thead>
          <tbody>
            {analysts.length ? (
              analysts.map(analyst => (
                <tr key={analyst.id}>
                  <td>{analyst.name}</td>
                  <td>{analyst.email}</td>
                  <td>{format(parseISO(analyst.created_at), 'dd/MM/yyyy')}</td>
                </tr>
              ))
            ) : (
              <tr className="error">
                <td colSpan="4">Usuário não encontrado</td>
              </tr>
            )}
          </tbody>
        </Table>

        {!!analysts.length && !searchWord && (
        <Pagination
          onChange={setPage}
          current={page}
          total={analysts.total}
          showSizeChanger={false}
          defaultPageSize={10}
        />
        )}

      </>
      )}

    </Container>
  );
}

export default AnalystList;

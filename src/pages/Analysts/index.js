/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import { format, parseISO } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Select } from 'antd';

import api from '../../services/api';
import { Container, Table, Form, Pagination, Title, Filters, FilterItem } from './styles';
import Loading from '../../components/Loading';
import REGIONS from '../../helpers/regions';

const { Option } = Select;
function AnalystList() {
  const [analysts, setAnalysts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [shift, setShift] = useState('');
  const [district, setDistrict] = useState('');
  const [modality, setModality] = useState('');
  const [sex, setSex] = useState('');

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

  const searchAnalyst = useCallback(async () => {
    setIsLoading(true);
    const districtFormmated = district !== 'null' ? district.toLowerCase() : district;
    const response = await api.get(`/admin/analyst?search=${searchWord}&shift=${shift}&district=${districtFormmated}&service_modality=${modality}&sex=${sex}`);
    setIsLoading(true);
    setAnalysts(response.data);
    setIsLoading(false);
  }, [shift, district, modality, searchWord, sex]);

  function changeWordSearch(word) {
    setSearchWord(word);
    if (word === '') {
      loadAnalysts();
    }
  }

  function clearSearch() {
    loadAnalysts();
    setSearchWord('');
  }

  return (
    <Container>
      <Title>
        <h2>Analistas</h2>
        <Link to="/analistas/cadastro">Cadastrar</Link>
      </Title>

      <Filters>
        <FilterItem>
          <Select
            id="shift"
            defaultValue="Selecione o periodo"
            style={{ width: 190 }}
            onChange={(shiftValue) => setShift(shiftValue)}
          >
            <Option key="null">Todos</Option>
            <Option key="manha">Manhã</Option>
            <Option key="tarde">Tarde</Option>
            <Option key="noite">Noite</Option>
          </Select>
        </FilterItem>

        <FilterItem>
          <Select
            id="district"
            defaultValue="Selecione o bairro"
            style={{ width: 190 }}
            onChange={(valueDistrict) => setDistrict(valueDistrict)}
          >
            <Option key="null">Todos</Option>
            {
              REGIONS.map(region => (
                <Option key={region}>{region}</Option>
              ))
            }
          </Select>
        </FilterItem>

        <FilterItem>
          <Select
            id="modality"
            defaultValue="Modalidade de atendimento"
            style={{ width: 190 }}
            onChange={(valueModality) => setModality(valueModality)}
          >
            <Option key="null">Todos</Option>
            <Option key="online">Online</Option>
            <Option key="presencial">Presencial</Option>
            <Option key="hibrido">Hibrido</Option>
          </Select>
        </FilterItem>

        <FilterItem>
          <Select
            id="sex"
            defaultValue="Sexo do analista"
            style={{ width: 190 }}
            onChange={(sexValue) => setSex(sexValue)}
          >
            <Option key="null">Todos</Option>
            <Option key="m">Masculino</Option>
            <Option key="f">Feminino</Option>
          </Select>
        </FilterItem>

        <FilterItem className="w100">
          <Form>
            <input
              type="text"
              value={searchWord}
              placeholder="nome ou e-mail"
              onChange={event => changeWordSearch(event.target.value)}
              onKeyDown={event => event.key === 'Enter' && searchAnalyst()}
            />

            <button type="button" onClick={searchAnalyst}>
              Buscar
            </button>

            <span onClick={clearSearch}>
              Limpar
            </span>
          </Form>
        </FilterItem>

      </Filters>

      {!isLoading && (
      <>

        <Table>
          <thead>
            <tr>
              <td>Nome</td>
              <td>Email</td>
              <td>Barrio</td>
              <td>Modalidade</td>
              <td>Sexo</td>
              <td>Turno</td>
              <td>Última Atualização</td>
            </tr>
          </thead>
          <tbody>
            {analysts.length ? (
              analysts.map(analyst => (
                <tr key={analyst.id}>
                  <td>{analyst.name}</td>
                  <td>{analyst.email}</td>
                  <td>{analyst.district}</td>
                  <td>{analyst.service_modality}</td>
                  <td>{analyst.sex}</td>
                  <td>{analyst.shift}</td>
                  <td>{format(parseISO(analyst.created_at), 'dd/MM/yyyy')}</td>
                </tr>
              ))
            ) : (
              <tr className="error">
                <td colSpan="7">Analista não encontrado</td>
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

      {
        isLoading && (
          <Loading />
        )
      }

    </Container>
  );
}

export default AnalystList;

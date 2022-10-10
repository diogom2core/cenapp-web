/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import { format, parseISO } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Select } from 'antd';
import {
  MdClose,
  MdModeEditOutline,
} from 'react-icons/md';
import {
  IoTrashBinSharp,
} from 'react-icons/io5';

import { toast } from 'react-toastify';
import api from '../../services/api';
import { Container, Table, Form, Pagination, Title, Filters, FilterItem, ModalConfirm } from './styles';
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

  const [isModalRemoveAnalystOpen, setIsModalRemoveAnalystOpen] = useState(false);
  const [analystIDToRemove, setAnalystIDToRemove] = useState('');

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

  const removeAnalyst = useCallback(async () => {
    try {
      await api.delete(`/admin/analyst/${analystIDToRemove}`);

      setIsModalRemoveAnalystOpen(false);
      loadAnalysts();
      toast.success('Analista removido com sucesso!');
    } catch (error) {
      toast.error('Error ao remover analista');
    } finally {
      setIsModalRemoveAnalystOpen(false);
    }
  }, [analystIDToRemove]);

  function openModalRemoveAnalyst(analyst_id) {
    setIsModalRemoveAnalystOpen(true);
    setAnalystIDToRemove(analyst_id);
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
              <td>Última Atualização</td>
              <td>Ações</td>
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
                  <td>{format(parseISO(analyst.created_at), 'dd/MM/yyyy')}</td>
                  <td>
                    <div>
                      <Link to={`/admin/analistas/editar/${analyst.id}`}>
                        <MdModeEditOutline
                          size={22}
                          color="#111111"
                        />
                      </Link>

                      <button type="button" onClick={() => openModalRemoveAnalyst(analyst.id)}>
                        <IoTrashBinSharp
                          size={22}
                          color="#111111"
                        />
                      </button>
                    </div>

                  </td>
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

      <ModalConfirm open={isModalRemoveAnalystOpen}>
        <div className="content">
          <div className="content-header">
            <button type="button">
              <MdClose
                size={20}
                color="#3a3a3a"
                onClick={() => setIsModalRemoveAnalystOpen(false)}
              />
            </button>
          </div>

          <p>
            Tem certeza que deseja excluir analista ?
          </p>

          <footer className="content-footer">
            <span onClick={() => setIsModalRemoveAnalystOpen(false)}>Cancelar</span>
            <button type="button" onClick={removeAnalyst}>
              Confirmar
            </button>
          </footer>
        </div>
      </ModalConfirm>

    </Container>
  );
}

export default AnalystList;

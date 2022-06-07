/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Row, Select } from 'antd';

import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Container, BoxEdit, Column } from './styles';
import api from '../../services/api';

const { Option } = Select;
function AnalystCreate() {
  const [initialValues] = useState({
    name: '',
    email: '',
  });

  const [shift, setShift] = useState('');
  const [district, setDistrict] = useState('');
  const [modality, setModality] = useState('');
  const [sex, setSex] = useState('');

  const history = useHistory();

  async function createAnalyst(values) {
    try {
      const { name, email } = values;

      await api.post('/admin/analyst', {
        name,
        email,
        shift,
        district,
        sex,
        service_modality: modality,
      });

      toast.success('Analista cadastrado com sucesso!');
      history.goBack();
    } catch (err) {
      const { message } = JSON.parse(err.request.responseText);
      toast.error(`Error ao cadastrar:  ${message}`);
    }
  }

  return (
    <Container>
      <h2>Criação de Analista</h2>
      <BoxEdit>
        <Formik initialValues={initialValues} onSubmit={createAnalyst}>
          {() => (
            <Form>
              <Row>
                <Column>
                  <label htmlFor="name">Nome</label>
                  <Field id="name" name="name" placeholder="Nome" />
                </Column>

                <Column>
                  <label htmlFor="email">E-mail</label>
                  <Field id="email" name="email" placeholder="E-mail" />
                </Column>

                <Column>
                  <label htmlFor="period">Turno</label>

                  <Select
                    id="shift"
                    defaultValue="Selecione o periodo"
                    style={{ width: 205 }}
                    onChange={(shiftValue) => setShift(shiftValue)}
                  >
                    <Option key="manha">Manhã</Option>
                    <Option key="tarde">Tarde</Option>
                    <Option key="noite">Noite</Option>
                  </Select>
                </Column>
              </Row>

              <Row>
                <Column>
                  <label htmlFor="district">Bairro</label>

                  <Select
                    id="district"
                    defaultValue="Selecione o bairro"
                    style={{ width: 205 }}
                    onChange={(valueDistrict) => setDistrict(valueDistrict)}
                  >
                    <Option key="barro_01">Bairro 01</Option>
                    <Option key="barro_02">Bairro 02</Option>
                    <Option key="barro_03">Bairro 03</Option>
                  </Select>
                </Column>

                <Column>
                  <label htmlFor="modality">Modalidade de Atendimento</label>
                  <Select
                    id="modality"
                    defaultValue="Modalidade de atendimento"
                    style={{ width: 205 }}
                    onChange={(valueModality) => setModality(valueModality)}
                  >
                    <Option key="online">Online</Option>
                    <Option key="presencial">Presencial</Option>
                    <Option key="hibrido">Hibrido</Option>
                  </Select>
                </Column>

                <Column>
                  <label htmlFor="sex">Sexo do Analísta</label>
                  <Select
                    id="sex"
                    defaultValue="Sexo do analista"
                    style={{ width: 205 }}
                    onChange={(sexValue) => setSex(sexValue)}
                  >
                    <Option key="m">Masculino</Option>
                    <Option key="f">Feminino</Option>
                  </Select>
                </Column>
              </Row>

              <div className="button-box">
                <button width={340} type="submit" loading={false}>
                  Cadastrar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </BoxEdit>
    </Container>
  );
}

export default AnalystCreate;

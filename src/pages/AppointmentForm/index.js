import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

import { Select } from 'antd';
import { Column, Container, Content, Row } from './styles';

const { Option } = Select;

function AppointmentForm() {
  const [initialValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [period, setPeriod] = useState('');
  const [district, setDistrict] = useState('');
  const [modality, setModality] = useState('');
  const [serviceType, serviceTypeSet] = useState('');
  const [sex, setSex] = useState('');

  function handleSubmit(values) {
    console.log(values);
  }

  console.log(period, district, modality, serviceType, sex);
  function handlePeriodChange(periodName) {
    setPeriod(periodName);
  }

  function handleDistrickChange(districtName) {
    setDistrict(districtName);
  }

  function handleModalityChange(modalityName) {
    setModality(modalityName);
  }

  function handleServiceTypeChange(serviceName) {
    serviceTypeSet(serviceName);
  }

  function handleSexChange(sexName) {
    setSex(sexName);
  }

  return (
    <Container>
      <Content>
        <Formik initialValues={initialValues} onSubmit={() => handleSubmit}>
          {() => (
            <Form>
              <h3>Agendamento</h3>

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
                    id="period"
                    defaultValue="Selecione o periodo"
                    style={{ width: 205 }}
                    onChange={() => handlePeriodChange}
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
                    onChange={() => handleDistrickChange}
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
                    onChange={() => handleModalityChange}
                  >
                    <Option key="online">Online</Option>
                    <Option key="presencial">Presencial</Option>
                    <Option key="hibrido">Hibrido</Option>
                  </Select>
                </Column>

                <Column>
                  <label htmlFor="type_of_service">Tipo de Atendimento</label>
                  <Select
                    id="type_of_service"
                    defaultValue="Modalidade de atendimento"
                    style={{ width: 205 }}
                    onChange={() => handleServiceTypeChange}
                  >
                    <Option key="adultos">Adultos</Option>
                    <Option key="idosos">Idosos</Option>
                    <Option key="criancas">Crianças</Option>
                    <Option key="adolecente">Adolecente</Option>
                    <Option key="casal">Casal</Option>
                    <Option key="familia">Família</Option>
                    <Option key="interverncoes">Intervernções Precoce</Option>
                  </Select>
                </Column>
              </Row>

              <Row>
                <Column>
                  <label htmlFor="sex">Sexo do Analísta</label>
                  <Select
                    id="sex"
                    defaultValue="Sexo do analista"
                    style={{ width: 205 }}
                    onChange={() => handleSexChange}
                  >
                    <Option key="m">Masculino</Option>
                    <Option key="f">Feminino</Option>
                  </Select>
                </Column>
              </Row>

              <button width={340} type="submit" loading={false}>
                Cadastrar
              </button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
}

export default AppointmentForm;

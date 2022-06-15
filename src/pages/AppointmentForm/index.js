/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';

import { Select } from 'antd';
import { toast } from 'react-toastify';
import { AppoitmentFinish, Column, Container, Content, Row, UnvailableMessage } from './styles';
import api from '../../services/api';
import appointmentFinish from '../../assets/appointment_finish.png';
import Button from '../../components/Button';

const { Option } = Select;

function AppointmentForm() {
  const [initialValues] = useState({
    name: '',
    email: '',
  });
  const [shift, setShift] = useState('');
  const [district, setDistrict] = useState('');
  const [modality, setModality] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [sex, setSex] = useState('');
  const [isAppoitmentFinish, setIsAppoitmentFinish] = useState(false);
  const [analystAvailable, setAnalystAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    try {
      setLoading(true);
      const { name, email } = values;

      const response = await api.post('/appointments', {
        name,
        email,
        shift,
        district,
        analyst_sex: sex,
        service_modality: modality,
        service_type: serviceType,
      });

      setLoading(false);

      const { have_analyst_available } = response.data;

      if (have_analyst_available === false) {
        setAnalystAvailable(false);
        return;
      }

      toast.success('Agendamento feito com sucesso!');
      setIsAppoitmentFinish(true);
    } catch (err) {
      const { message } = JSON.parse(err.request.responseText);
      toast.error(`Error ao cadastrar:  ${message}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  console.log(modality);
  return (
    <Container>
      <Content>
        {
          !isAppoitmentFinish && (
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                        id="shift"
                        defaultValue="Selecione o periodo"
                        style={{ width: 205 }}
                        onChange={(valueShift) => setShift(valueShift)}
                      >
                        <Option key="manha">Manhã</Option>
                        <Option key="tarde">Tarde</Option>
                        <Option key="noite">Noite</Option>
                      </Select>
                    </Column>
                  </Row>

                  <Row>
                    <Column>
                      <label htmlFor="modality">Modalidade de Atendimento</label>
                      <Select
                        id="modality"
                        defaultValue="Modalidade de atendimento"
                        style={{ width: 205 }}
                        onChange={(modalityValue) => setModality(modalityValue)}
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
                        onChange={(serviceTypeValue) =>
                          setServiceType(serviceTypeValue)}
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

                    {
                      modality && modality !== 'online' && (
                        <Column>
                          <label htmlFor="district">Bairro</label>

                          <Select
                            id="district"
                            defaultValue="Selecione o bairro"
                            style={{ width: 205 }}
                            onChange={(districtValue) => setDistrict(districtValue)}
                          >
                            <Option key="barro_01">Bairro 01</Option>
                            <Option key="barro_02">Bairro 02</Option>
                            <Option key="barro_03">Bairro 03</Option>
                          </Select>
                        </Column>
                      )
                    }

                  </Row>

                  <Row>
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

                  {
                    !analystAvailable && (
                      <UnvailableMessage>
                        <MdErrorOutline size={22} color="red" />
                        <p>
                          Nenhum analista disponivel no momento, revise os critéios ou
                          tente outro dia.
                        </p>

                      </UnvailableMessage>
                    )
                  }

                  <Button width={340} type="submit" loading={loading}>
                    cadastrar
                  </Button>
                </Form>
              )}
            </Formik>
          )
        }

        {
          isAppoitmentFinish && (
            <AppoitmentFinish>
              <img src={appointmentFinish} alt="" />

              <h3>Agendamento cadastrado</h3>
              <p>
                Seu agendamento foi cadastrado, você receberá uma e-mail com
                dados de confirmação
              </p>
              <p>
                Agora é aguardar, quando tiver algum analista disponivel,
                vamos avisar por e-mail
              </p>
            </AppoitmentFinish>
          )
        }

      </Content>
    </Container>
  );
}

export default AppointmentForm;

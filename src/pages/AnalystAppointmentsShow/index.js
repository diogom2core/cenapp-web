import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Row, Select } from 'antd';

import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, BoxVisualization, Column } from './styles';
import api from '../../services/api';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

const { Option } = Select;
function AnalystAppointmentsRead() {
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    shift: '',
    analyst_sex: '',
    service_modality: '',
    district: '',
    service_type: '',
    analyst_name: '',
    analyst_email: '',
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const { appointment_id } = useParams();
  const [buttonLoading, setButtonLoading] = useState(false);
  const history = useHistory();
  function getShift(night_service, afternoon_service, morning_service) {
    const shiftResult = [];

    if (morning_service) {
      shiftResult.push(' Manhã ');
    }

    if (afternoon_service) {
      shiftResult.push(' Tarde ');
    }

    if (night_service) {
      shiftResult.push(' Noite ');
    }

    return shiftResult.toString();
  }

  const loadAppointment = async () => {
    try {
      const response = await api.get(`/appointments/read/${appointment_id}`);
      console.log(response.data);
      setStatus(response.data.status);
      setInitialValues({
        ...response.data,
        shift: getShift(
          response.data.night_service,
          response.data.afternoon_service,
          response.data.morning_service,
        ),
        analyst_name: response.data.analyst && response.data.analyst.name,
        analyst_email: response.data.analyst && response.data.analyst.email,
      });
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao carregar solicitação');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointment();
  }, []);

  const changeAppointmentStatus = async () => {
    try {
      setButtonLoading(true);
      await api.put(`/analysts/appointments/${appointment_id}`, {
        status,
      });
      setButtonLoading(false);
      toast.success('Solicitaçao atualizda com sucesso!');
      history.goBack();
    } catch (error) {
      toast.error('Erro ao atualizar status da solicitação');
      setButtonLoading(false);
    }
  };

  return (
    <Container>
      <h2>Visualização de Solicitação</h2>

      {!loading && (
        <>
          <BoxVisualization>
            <Formik initialValues={initialValues}>
              {() => (
                <Form>
                  <h3>Informação do Paciente</h3>
                  <Row>
                    <Column>
                      <label htmlFor="name">Nome</label>
                      <Field
                        id="name"
                        name="name"
                        placeholder="Nome"
                        disabled
                      />
                    </Column>

                    <Column>
                      <label htmlFor="email">E-mail</label>
                      <Field
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        disabled
                      />
                    </Column>
                  </Row>

                  <h3>Preferências do Atendimento</h3>
                  <Row>
                    <Column>
                      <label htmlFor="shift">Periodo</label>
                      <Field id="shift" name="shift" disabled />
                    </Column>

                    <Column>
                      <label htmlFor="analyst_sex">Sexo do Analísta</label>
                      <Field id="analyst_sex" name="analyst_sex" disabled />
                    </Column>

                    <Column>
                      <label htmlFor="service_modality">
                        Modalidade de Atendimento
                      </label>
                      <Field
                        id="service_modality"
                        name="service_modality"
                        disabled
                      />
                    </Column>

                    <Column>
                      <label htmlFor="district">Região</label>
                      <Field id="district" name="district" disabled />
                    </Column>

                    <Column>
                      <label htmlFor="service_type">Tipos de atendimento</label>
                      <Field id="service_type" name="service_type" disabled />
                    </Column>
                  </Row>

                  <Row />
                </Form>
              )}
            </Formik>
          </BoxVisualization>

          <BoxVisualization>
            <h3>Status da Solicitação</h3>
            <Row>
              <Select
                id="statsu"
                defaultValue={status}
                style={{ width: 205 }}
                onChange={(statusValue) => setStatus(statusValue)}
              >
                <Option key="pedding">Pendente</Option>
                <Option key="scheduled">Agendado</Option>
                <Option key="canceled">Cancelado</Option>
                <Option key="interviewed">Fez entrrevista</Option>
                <Option key="not_interview">Não Fez entrrevista</Option>
                <Option key="service_started">Iniciou atendimento</Option>
                <Option key="not_service_started">
                  Não Iniciou atendimento
                </Option>
              </Select>
            </Row>

            <Row>
              <ul>
                <li>Pendente: Solicitação foi criada</li>
                <li>Agendado: Foi encontrado um analista para solicitação</li>
                <li>Cancelado: Paciente não procurou analista</li>
                <li>Fez entrevista: Paciente fez a entrevista</li>
                <li>Não Fez entrevista: Paciente não fez a entrevista</li>
                <li>Iniciou atendimento: Paciente iniciou o atendimento</li>
                <li>
                  Não Iniciou atendimento: Paciente não iniciou o atendimento
                </li>
              </ul>
            </Row>

            <Button
              className="button"
              width={250}
              type="button"
              color="#40d4c3"
              onClick={changeAppointmentStatus}
              loading={buttonLoading}
            >
              Alterar Status
            </Button>
          </BoxVisualization>
        </>
      )}

      {loading && <Loading />}
    </Container>
  );
}

export default AnalystAppointmentsRead;

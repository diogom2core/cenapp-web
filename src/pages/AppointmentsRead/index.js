/* eslint-disable react/jsx-no-bind */
/* eslint-disable function-paren-newline */
import React, { useCallback, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Row } from 'antd';
import { MdClose } from 'react-icons/md';
import Select from 'react-select';

import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  BoxVisualization,
  Column,
  ButtonContainer,
  ModalConfirm,
} from './styles';
import api from '../../services/api';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

function AppointmentsRead() {
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
  const { appointment_id } = useParams();
  const [analyst, setAnalyst] = useState(null);
  const [isModalManualAppointmentOpen, setIsModalManualAppointmentOpen] =
    useState(false);
  const [analysts, setAnalysts] = useState();
  const [isLoadAnalysts, setIsLoadAnalysts] = useState(false);
  const [analystSelected, setAnalystSelected] = useState('');

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
      setAnalyst(response.data.analyst);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao carregar solicitação');
      setLoading(false);
    }
  };

  const loadAnalysts = async () => {
    setIsLoadAnalysts(true);
    const analystsResponse = await api.get('/admin/analyst/');
    setIsLoadAnalysts(true);
    setAnalysts(
      analystsResponse.data.map((analystFilter) => ({
        value: analystFilter.id,
        label: analystFilter.name,
      })),
    );
    setIsLoadAnalysts(false);
  };

  useEffect(() => {
    loadAppointment();
    loadAnalysts();
  }, []);

  const handleChange = (newValue) => {
    setAnalystSelected(newValue);
  };

  const manualAppoitment = useCallback(async () => {
    try {
      await api.post('/admin/analyst/manual-appoitment', {
        appointment_id,
        analyst_id: analystSelected.value,
      });
      toast.success('Agendado com sucesso');
      history.goBack();
    } catch (error) {
      toast.error('Erro ao agendar manualmente');
    }
  }, [analystSelected]);

  return (
    <Container>
      <h2>Visualização de Solicitação</h2>

      {!loading && (
        <BoxVisualization>
          <Formik initialValues={initialValues}>
            {() => (
              <Form>
                <h3>Informação do Paciente</h3>
                <Row>
                  <Column>
                    <label htmlFor="name">Nome</label>
                    <Field id="name" name="name" placeholder="Nome" disabled />
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

                {analyst && (
                  <>
                    <h3>Informação do Analista</h3>

                    <Row>
                      <Column>
                        <label htmlFor="analyst_name">Nome</label>
                        <Field id="analyst_name" name="analyst_name" disabled />
                      </Column>
                      <Column>
                        <label htmlFor="analyst_email">E-mail</label>
                        <Field
                          id="analyst_email"
                          name="analyst_email"
                          disabled
                        />
                      </Column>
                    </Row>
                  </>
                )}
                <Row />
              </Form>
            )}
          </Formik>

          <ButtonContainer>
            <Button
              color="#40d4c3"
              width={320}
              onClick={() => setIsModalManualAppointmentOpen(true)}
            >
              Agendamento manual
            </Button>
          </ButtonContainer>
        </BoxVisualization>
      )}

      {loading && <Loading />}

      <ModalConfirm open={isModalManualAppointmentOpen}>
        <div className="content">
          <div className="content-header">
            <button type="button">
              <MdClose
                size={20}
                color="#3a3a3a"
                onClick={() => setIsModalManualAppointmentOpen(false)}
              />
            </button>
          </div>

          <p>Selecione uma analista para fazer o agendamento manual</p>

          {!isLoadAnalysts && (
            <Select options={analysts} onChange={handleChange} />
          )}

          <footer className="content-footer">
            <span onClick={() => setIsModalManualAppointmentOpen(false)}>
              Cancelar
            </span>
            <button type="button" onClick={manualAppoitment}>
              Confirmar
            </button>
          </footer>
        </div>
      </ModalConfirm>
    </Container>
  );
}

export default AppointmentsRead;

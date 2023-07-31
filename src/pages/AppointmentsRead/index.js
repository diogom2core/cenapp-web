/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable function-paren-newline */
import React, { useCallback, useEffect, useState } from 'react';
import { Row, Select as ANTDSelect, Button } from 'antd';
import { MdClose } from 'react-icons/md';
import Select from 'react-select';

import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactDatePicker, { registerLocale } from 'react-datepicker';

import { pt } from 'date-fns/locale';
import { parseISO } from 'date-fns';
import {
  Container,
  BoxVisualization,
  ButtonContainer,
  ModalConfirm,
  Title,
  DateInputBox,
  InfoExtra,
  Fild,
} from './styles';
import api from '../../services/api';
import Loading from '../../components/Loading';
import { AppointmentInfo } from './components/AppointmentInfo';

const { Option } = ANTDSelect;

function AppointmentsRead() {
  registerLocale('pt', pt);

  const [appointment, setAppointment] = useState();
  const [loading, setLoading] = useState(true);
  const { appointment_id } = useParams();
  const [isModalManualAppointmentOpen, setIsModalManualAppointmentOpen] =
    useState(false);
  const [analysts, setAnalysts] = useState();
  const [isLoadAnalysts, setIsLoadAnalysts] = useState(false);
  const [analystSelected, setAnalystSelected] = useState('');

  const [status, setStatus] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const history = useHistory();

  const [startDate, setStartDate] = useState(new Date());
  const [frequency, setFrequency] = useState('');

  const loadAppointment = async () => {
    try {
      const response = await api.get(`/appointments/read/${appointment_id}`);
      setStatus(response.data.status);
      setStartDate(parseISO(response.data.service_start_date));
      setFrequency(response.data.service_frequency);
      setAppointment(response.data);

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

  const changeAppointmentStatus = async () => {
    try {
      setButtonLoading(true);
      await api.put(`/analysts/appointments/${appointment_id}`, {
        status,
        service_start_date: startDate,
        service_frequency: frequency,
      });
      setButtonLoading(false);
      toast.success('Solicitaçao atualizda com sucesso!');
      history.goBack();
    } catch (error) {
      toast.error('Erro ao atualizar status da solicitação');
      setButtonLoading(false);
    }
  };
  console.log({ appointment });

  return (
    <Container>
      <Title>
        <h2>Visualização de Solicitação</h2>

        <ButtonContainer>
          <Button
            type="primary"
            style={{ background: '#40d4c3' }}
            width={320}
            onClick={() => setIsModalManualAppointmentOpen(true)}
          >
            Agendamento manual
          </Button>
        </ButtonContainer>
      </Title>

      {!loading && appointment && (
        <>
          <AppointmentInfo appointment={appointment} />

          <BoxVisualization>
            <h3>Status da Solicitação</h3>
            <Row>
              <ANTDSelect
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
              </ANTDSelect>
            </Row>

            {status === 'interviewed' && (
              <InfoExtra>
                <DateInputBox>
                  <label htmlFor="startDate">Data Inicial</label>
                  <ReactDatePicker
                    id="startDate"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    locale="pt"
                    dateFormat="dd/MM/yyyy"
                  />
                </DateInputBox>

                <Fild>
                  <label htmlFor="periocidade">Periocidade</label>
                  <input
                    type="text"
                    value={frequency}
                    placeholder="Periocidade"
                    onChange={(event) => setFrequency(event.target.value)}
                  />
                </Fild>
              </InfoExtra>
            )}

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
              type="primary"
              className="button"
              width={250}
              style={{ background: '#40d4c3' }}
              onClick={changeAppointmentStatus}
              loading={buttonLoading}
            >
              Alterar Status
            </Button>
          </BoxVisualization>
        </>
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

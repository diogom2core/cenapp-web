/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable function-paren-newline */
import React, { useEffect, useState } from 'react';
import { Row, Select as ANTDSelect, Button } from 'antd';

import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactDatePicker, { registerLocale } from 'react-datepicker';

import { pt } from 'date-fns/locale';
import { parseISO } from 'date-fns';
import {
  Container,
  BoxVisualization,
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
  useState(false);

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

  useEffect(() => {
    loadAppointment();
  }, []);

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
    </Container>
  );
}

export default AppointmentsRead;

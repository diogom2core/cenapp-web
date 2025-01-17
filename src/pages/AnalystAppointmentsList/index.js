/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import { Select } from 'antd';
import { format, parseISO, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDateRange, MdVisibility } from 'react-icons/md';
import DayPicker from 'react-day-picker';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';
import { Container, Table, Form, Title, Filters, FilterItem, SelectDate, FilterDate } from './styles';
import Loading from '../../components/Loading';
import getStatusName from '../../helpers/getStatusName';
import statusTitle from '../../helpers/statusTitle';

const { Option } = Select;

function AnalystAppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [filterStatus, setFilterStatus] = useState('');

  const [startDateSelected, setStartDateSelected] = useState(subDays(new Date(), 30));
  const [endDateSelected, setEndDateSelected] = useState(new Date());
  const [showDatePickerStartDate, setShowDatePickerStartDate] = useState(false);
  const [showDatePickerEndDate, setShowDatePickerendDate] = useState(false);

  async function loadAppointments() {
    setIsLoading(true);
    const response = await api.get('/analysts/appointments/search');

    setAppointments(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  async function searchAppointment() {
    setIsLoading(true);
    const response = await api.get(`/analysts/appointments/search/?search=${searchWord}&start_date=${startDateSelected}&end_date=${endDateSelected}&status=${filterStatus}`);
    setAppointments(response.data);
    setIsLoading(false);
  }

  function changeWordSearch(word) {
    setSearchWord(word);
    if (word === '') {
      loadAppointments();
    }
  }

  function clearSearch() {
    setSearchWord('');
    loadAppointments();
  }

  return (
    <Container>
      <Title>
        <h2>Minhas Solicitações</h2>
        <span>{format(startDateSelected, 'dd/MM/yyyy', {
          locale: pt,
        })} - {format(endDateSelected, 'dd/MM/yyyy', {
          locale: pt,
        })}
        </span>
      </Title>

      <Filters>
        <FilterItem>
          <Select
            id="status"
            defaultValue="Selecione o status"
            style={{ width: 190 }}
            onChange={(statusValue) => setFilterStatus(statusValue)}
          >
            <Option key="null">Todos</Option>
            {
              statusTitle.map(statusName => (
                <Option key={statusName}>{getStatusName(statusName)}</Option>
              ))
            }
          </Select>
        </FilterItem>

        <FilterItem>
          <FilterDate>
            <button type="button" onClick={() => setShowDatePickerStartDate(!showDatePickerStartDate)}>
              <MdDateRange size={22} color="#000" />
              <span>{format(startDateSelected, 'dd/MM/yyyy', {
                locale: pt,
              })}
              </span>
            </button>
            <SelectDate showDatePicker={showDatePickerStartDate}>
              <DayPicker
                selectedDays={startDateSelected}
                weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                onDayClick={setStartDateSelected}
                locale={pt}
              />
            </SelectDate>
          </FilterDate>
        </FilterItem>

        <FilterItem>
          <FilterDate>
            <button type="button" onClick={() => setShowDatePickerendDate(!showDatePickerEndDate)}>
              <MdDateRange size={22} color="#000" />
              <span>{format(endDateSelected, 'dd/MM/yyyy', {
                locale: pt,
              })}
              </span>
            </button>
            <SelectDate showDatePicker={showDatePickerEndDate}>
              <DayPicker
                selectedDays={endDateSelected}
                weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                onDayClick={setEndDateSelected}
                locale={pt}
              />
            </SelectDate>
          </FilterDate>
        </FilterItem>

        <FilterItem className="w100">
          <Form>
            <input
              type="text"
              value={searchWord}
              placeholder="e-mail do paciente"
              onChange={event => changeWordSearch(event.target.value)}
              onKeyDown={event => event.key === 'Enter' && searchAppointment()}
            />

            <button type="button" onClick={searchAppointment}>
              Buscar
            </button>

            <span onClick={clearSearch}>
              Limpar
            </span>
          </Form>
        </FilterItem>

      </Filters>

      {!isLoading && (
      <Table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Email</td>
            <td>Status</td>
            <td>Última Atualização</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {appointments.length ? (
            appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.patient_name}</td>
                <td>{appointment.patient_email}</td>
                <td>{getStatusName(appointment.status)}</td>
                <td>{format(parseISO(appointment.created_at), 'dd/MM/yyyy')}</td>
                <td>
                  <Link to={`/analista/solicitacao/${appointment.id}`}>
                    <MdVisibility
                      size={22}
                      color="#000"
                    />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr className="error">
              <td colSpan="4">Solicitação não encontrada</td>
            </tr>
          )}
        </tbody>
      </Table>
      )}

      {
          isLoading && (
            <Loading />
          )
        }

    </Container>
  );
}

export default AnalystAppointmentsList;

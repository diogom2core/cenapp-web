/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import { Button, Select } from 'antd';
import { format, parseISO, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDateRange, MdVisibility } from 'react-icons/md';
import DayPicker from 'react-day-picker';
import { pt } from 'date-fns/locale';
import { CloudDownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { toast } from 'react-toastify';
import getStatusName from '../../helpers/getStatusName';
import { getPreferenceTime } from './utils/getPreferenceTime';
import { getSexName } from './utils/getSexName';

import api from '../../services/api';
import { Container, Table, Form, Pagination, Title, Filters, FilterItem, FilterDate, SelectDate } from './styles';
import Loading from '../../components/Loading';
import statusTitle from '../../helpers/statusTitle';

const { Option } = Select;

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentsTotal, setAppointmentsTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingExport, setLoadingExport] = useState(false);

  const [filterStatus, setFilterStatus] = useState('');

  const [startDateSelected, setStartDateSelected] = useState(subDays(new Date(), 30));
  const [endDateSelected, setEndDateSelected] = useState(new Date());
  const [showDatePickerStartDate, setShowDatePickerStartDate] = useState(false);
  const [showDatePickerEndDate, setShowDatePickerendDate] = useState(false);

  async function loadAppointments() {
    setIsLoading(true);
    const response = await api.get(`/appointments/search/?page=${page}&start_date=${startDateSelected}&end_date=${endDateSelected}&status=${filterStatus}`);

    setAppointments(response.data.appointments);
    setAppointmentsTotal(response.data.total);
    setIsLoading(false);
  }

  async function loadSearchAppointments() {
    setIsLoading(true);
    const response = await api.get(`/appointments/search/?page=${page}&search=${searchWord}&start_date=${startDateSelected}&end_date=${endDateSelected}&status=${filterStatus}`);

    setAppointments(response.data.appointments);
    setAppointmentsTotal(response.data.total);

    setIsLoading(false);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  useEffect(() => {
    if (page) {
      loadSearchAppointments();
    }
  }, [page]);

  async function searchAppointment() {
    setIsLoading(true);
    const response = await api.get(`/appointments/search/?search=${searchWord}&start_date=${startDateSelected}&end_date=${endDateSelected}&status=${filterStatus}`);

    setAppointments(response.data.appointments);
    setAppointmentsTotal(response.data.total);
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

  async function generateExcelFile() {
    try {
      setLoadingExport(true);
      const response = await api.get(`/appointments/export/?search=${searchWord}&start_date=${startDateSelected}&end_date=${endDateSelected}&status=${filterStatus}`);
      const appointmentsToBeExport = response.data;

      const appointmentsToBeExportFormmated = appointmentsToBeExport.map(appointmentItem => ({
        link: `https://agendamento-clinica-web.vercel.app/solicitacoes/ver/${appointmentItem.id}`,
        status: getStatusName(appointmentItem.status),
        tipo_servico: appointmentItem.preference_service_type,
        paciente: appointmentItem.patient_name,
        email: appointmentItem.patient_email,
        sexo: getSexName(appointmentItem.patient_sex),
        telefone: appointmentItem.patient_phone_number,
        paciente_2: appointmentItem.patient_two_name,
        email_paciente_2: appointmentItem.patient_two_email,
        sexo_paciente_2: getSexName(appointmentItem.patient_two_sex),
        telefone_paciente_2: appointmentItem.patient_two_phone_number,
        horario_atendimento: getPreferenceTime({
          preference_afternoon_service: appointmentItem.preference_afternoon_service,
          preference_morning_service: appointmentItem.preference_morning_service,
          preference_night_service: appointmentItem.preference_night_service,
        }),
        modalidade: appointmentItem.preference_service_modality,
        cidade: appointmentItem.preference_district,
        data_criacao: appointmentItem.created_at,
      }));

      const workbook = XLSX.utils.book_new();

      const worksheet = XLSX.utils.json_to_sheet(appointmentsToBeExportFormmated);

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Agendamentos');

      const excelFileData = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

      const blob = new Blob([excelFileData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      saveAs(blob, 'agendamentos.xlsx');
      setLoadingExport(false);
    } catch (error) {
      setLoadingExport(false);
      toast.error('Erro ao exportar dados');
    }
  }

  return (
    <Container>
      <Title>
        <div>
          <h2>Solicitações</h2>
          <span>{format(startDateSelected, 'dd/MM/yyyy', {
            locale: pt,
          })} - {format(endDateSelected, 'dd/MM/yyyy', {
            locale: pt,
          })}
          </span>
        </div>

        <Button
          loading={loadingExport}
          onClick={generateExcelFile}
          icon={<CloudDownloadOutlined />}
        >Exportar
        </Button>
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
              />
            </SelectDate>
          </FilterDate>
        </FilterItem>

        <FilterItem className="w100">
          <Form>
            <input
              type="text"
              value={searchWord}
              placeholder="nome ou e-mail do analista ou solicitante"
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

      {!isLoading && !!appointments.length && (
      <>

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
                    <Link to={`solicitacoes/ver/${appointment.id}`}>
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

        {
          isLoading && (
            <Loading />
          )
        }

        {!!appointments.length && !searchWord && (
        <Pagination
          onChange={setPage}
          current={page}
          total={appointmentsTotal}
          showSizeChanger={false}
          defaultPageSize={10}
        />
        )}

      </>
      )}

    </Container>
  );
}

export default Appointments;

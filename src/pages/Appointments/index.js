/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-bind */
import { Button, Checkbox, Empty, Select } from 'antd';
import { format, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { MdDateRange } from 'react-icons/md';
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
import {
  Container,
  Form,
  Title,
  Filters,
  FilterItem,
  FilterDate,
  SelectDate,
} from './styles';
import Loading from '../../components/Loading';
import statusTitle from '../../helpers/statusTitle';
import servicesType from '../../helpers/servicesType';
import { AppointmentsTable } from './components/AppointmentsTable';
import getServiceTypeName from '../../helpers/getServiceTypeName';
import { formatAppointments } from './utils/formatAppointments';

const { Option } = Select;

const CheckboxGroup = Checkbox.Group;

const filterCheckboxOptions = [
  {
    label: 'Conhece membro da CENAPP',
    value: 'have_bond_spbsb',
  },
  {
    label: 'Manhã',
    value: 'preference_morning_service',
  },
  {
    label: 'Tarde',
    value: 'preference_afternoon_service',
  },
  {
    label: 'Noite',
    value: 'preference_night_service',
  },
];

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentsTotal, setAppointmentsTotal] = useState(0);

  const [paginationPage, setPaginationPage] = useState(1);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingExport, setLoadingExport] = useState(false);

  const [filterStatus, setFilterStatus] = useState('');
  const [filterServiceType, setFilterServiceType] = useState('');
  const [filterServiceModality, setFilterServiceModality] = useState('');

  const [startDateSelected, setStartDateSelected] = useState(
    subDays(new Date(), 30),
  );
  const [endDateSelected, setEndDateSelected] = useState(new Date());
  const [showDatePickerStartDate, setShowDatePickerStartDate] = useState(false);
  const [showDatePickerEndDate, setShowDatePickerendDate] = useState(false);

  const [checkedFilters, setCheckedFilters] = useState([]);

  async function loadAppointments() {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/appointments/?page=${paginationPage}`,
      );

      const appointmentsFormatted = formatAppointments(response.data.appointments);
      setAppointments(appointmentsFormatted);

      setAppointmentsTotal(response.data.total);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao carregar agendamentos');
    }
  }

  const hangleCheckboxFilter = (list) => {
    setCheckedFilters(list);
  };

  useEffect(() => {
    loadAppointments();
  }, [paginationPage]);

  async function searchAppointment() {
    setIsLoading(true);

    const preference_morning_service = checkedFilters.some(checkListItem => checkListItem === 'preference_morning_service');
    const preference_afternoon_service = checkedFilters.some(checkListItem => checkListItem === 'preference_afternoon_service');
    const preference_night_service = checkedFilters.some(checkListItem => checkListItem === 'preference_night_service');
    const have_bond_spbsb = checkedFilters.some(checkListItem => checkListItem === 'have_bond_spbsb');

    const response = await api.get(
      `/appointments/search/?search=${searchWord}&start_date=${startDateSelected}&end_date=${endDateSelected}&status=${filterStatus}&preference_service_type=${filterServiceType}&preference_service_modality=${filterServiceModality}&preference_morning_service=${preference_morning_service}&preference_afternoon_service=${preference_afternoon_service}&preference_night_service=${preference_night_service}&have_bond_spbsb=${have_bond_spbsb}`
      ,
    );

    const appointmentsFormatted = formatAppointments(response.data);

    setAppointments(appointmentsFormatted);
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
      const preference_morning_service = checkedFilters.some(checkListItem => checkListItem === 'preference_morning_service');
      const preference_afternoon_service = checkedFilters.some(checkListItem => checkListItem === 'preference_afternoon_service');
      const preference_night_service = checkedFilters.some(checkListItem => checkListItem === 'preference_night_service');
      const have_bond_spbsb = checkedFilters.some(checkListItem => checkListItem === 'have_bond_spbsb');

      const response = await api.get(
        `/appointments/search/?search=${searchWord}&start_date=${startDateSelected}&end_date=${endDateSelected}&status=${filterStatus}&preference_service_type=${filterServiceType}&preference_service_modality=${filterServiceModality}&preference_morning_service=${preference_morning_service}&preference_afternoon_service=${preference_afternoon_service}&preference_night_service=${preference_night_service}&have_bond_spbsb=${have_bond_spbsb}`
        ,
      );

      const appointmentsToBeExport = response.data;

      const appointmentsToBeExportFormmated = appointmentsToBeExport.map(
        (appointmentItem) => ({
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
            preference_afternoon_service:
              appointmentItem.preference_afternoon_service,
            preference_morning_service:
              appointmentItem.preference_morning_service,
            preference_night_service: appointmentItem.preference_night_service,
          }),
          modalidade: appointmentItem.preference_service_modality,
          cidade: appointmentItem.preference_district,
          data_criacao: appointmentItem.created_at,
          analista: appointmentItem.analyst
            ? appointmentItem.analyst.name
            : 'Sem analista',
          conhece_membro_spbsb: appointmentItem.have_bond_spbsb ? 'Sim' : 'Não',
        }),
      );

      const workbook = XLSX.utils.book_new();

      const worksheet = XLSX.utils.json_to_sheet(
        appointmentsToBeExportFormmated,
      );

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Agendamentos');

      const excelFileData = XLSX.write(workbook, {
        type: 'array',
        bookType: 'xlsx',
      });

      const blob = new Blob([excelFileData], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

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
          <span>
            {format(startDateSelected, 'dd/MM/yyyy', {
              locale: pt,
            })}
            -
            {format(endDateSelected, 'dd/MM/yyyy', {
              locale: pt,
            })}
          </span>
        </div>

        <Button
          loading={loadingExport}
          onClick={generateExcelFile}
          icon={<CloudDownloadOutlined />}
        >
          Exportar
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
            {statusTitle.map((statusName) => (
              <Option key={statusName}>{getStatusName(statusName)}</Option>
            ))}
          </Select>
        </FilterItem>

        <FilterItem>
          <Select
            id="preference_service_type"
            defaultValue="Tipo de Atendimento"
            style={{ width: 190 }}
            onChange={(serviceType) => setFilterServiceType(serviceType)}
          >
            <Option key="null">Todos</Option>
            {servicesType.map((serviceTypeName) => (
              <Option key={serviceTypeName}>{getServiceTypeName(serviceTypeName)}</Option>
            ))}
          </Select>
        </FilterItem>

        <FilterItem>
          <Select
            id="preference_service_modality"
            defaultValue="Modalidade"
            style={{ width: 190 }}
            onChange={(serviceModalityProp) => setFilterServiceModality(serviceModalityProp)}
          >
            <Option key="null">Todos</Option>
            <Option key="presencial">Presencial</Option>
            <Option key="online">Online</Option>
          </Select>
        </FilterItem>

        <FilterItem>
          <FilterDate>
            <button
              type="button"
              onClick={() =>
                setShowDatePickerStartDate(!showDatePickerStartDate)}
            >
              <MdDateRange size={22} color="#000" />
              <span>
                {format(startDateSelected, 'dd/MM/yyyy', {
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
            <button
              type="button"
              onClick={() => setShowDatePickerendDate(!showDatePickerEndDate)}
            >
              <MdDateRange size={22} color="#000" />
              <span>
                {format(endDateSelected, 'dd/MM/yyyy', {
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

        <FilterItem>
          <CheckboxGroup
            style={{ marginTop: 15 }}
            options={filterCheckboxOptions}
            value={checkedFilters}
            onChange={hangleCheckboxFilter}
          />
        </FilterItem>

        <FilterItem className="w100">
          <Form>
            <input
              type="text"
              value={searchWord}
              placeholder="nome ou e-mail do analista ou solicitante"
              onChange={(event) => changeWordSearch(event.target.value)}
              onKeyDown={(event) =>
                event.key === 'Enter' && searchAppointment()}
            />

            <button type="button" onClick={searchAppointment}>
              Buscar
            </button>

            <span onClick={clearSearch}>Limpar</span>
          </Form>
        </FilterItem>
      </Filters>

      {!isLoading && !!appointments.length && (
        <div>
          <AppointmentsTable
            appointments={appointments}
            appointmentsTotal={appointmentsTotal}
            paginationPage={paginationPage}
            setPaginationPage={setPaginationPage}
            isSearching={!!searchWord}
          />
        </div>
      )}

      {isLoading && <Loading />}

      {!isLoading && !appointments.length && (
        <Empty description="Nenhuma solicitação encontrada" />
      )}
    </Container>
  );
}

export default Appointments;

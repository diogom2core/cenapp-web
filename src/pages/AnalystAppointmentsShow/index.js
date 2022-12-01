/* eslint-disable array-callback-return */
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
    patient_name: '',
    patient_email: '',
    shift: '',
    preference_analyst_sex: '',
    preference_service_modality: '',
    preference_district: '',
    preference_service_type: '',
    analyst_name: '',
    analyst_email: '',
    family_members: [],
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const { appointment_id } = useParams();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [familyMembersState, setFamilyMembersState] = useState([]);

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
      setStatus(response.data.status);

      const familyMembers = response.data.family_members;

      const familyFormatted = {};

      familyMembers.map((family, index) => {
        familyFormatted[`member_name_${index}`] = family.name;
        familyFormatted[`member_email_${index}`] = family.email;
        familyFormatted[`member_birthday_${index}`] = family.birthday;
        familyFormatted[`member_kinship_${index}`] = family.kinship;
      });

      setFamilyMembersState(response.data.family_members);

      setInitialValues({
        ...response.data,
        shift: getShift(
          response.data.preference_night_service,
          response.data.preference_afternoon_service,
          response.data.preference_morning_service,
        ),
        analyst_name: response.data.analyst && response.data.analyst.name,
        analyst_email: response.data.analyst && response.data.analyst.email,
        ...familyFormatted,
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
                  {!!familyMembersState.length &&
                    familyMembersState.map((f, index) => (
                      <Row>
                        <Column>
                          <label htmlFor={`member_name_${index}`}>Nome</label>
                          <Field
                            id={`member_name_${index}`}
                            name={`member_name_${index}`}
                            placeholder="Nome"
                            disabled
                          />
                        </Column>

                        <Column>
                          <label htmlFor={`member_email_${index}`}>
                            E-mail
                          </label>
                          <Field
                            id={`member_email_${index}`}
                            name={`member_email_${index}`}
                            placeholder="E-mail"
                            disabled
                          />
                        </Column>
                        <Column>
                          <label htmlFor={`member_birthday_${index}`}>
                            Data de nascimento
                          </label>
                          <Field
                            id={`member_birthday_${index}`}
                            name={`member_birthday_${index}`}
                            placeholder="Data de nascimento"
                            disabled
                          />
                        </Column>
                        <Column>
                          <label htmlFor={`member_kinship_${index}`}>
                            Grau de parentesco
                          </label>
                          <Field
                            id={`member_kinship_${index}`}
                            name={`member_kinship_${index}`}
                            placeholder="Parente"
                            disabled
                          />
                        </Column>
                      </Row>
                    ))}

                  {!familyMembersState.length && (
                    <Row>
                      <Column>
                        <label htmlFor="patient_name">Nome</label>
                        <Field
                          id="patient_name"
                          name="patient_name"
                          placeholder="Nome"
                          disabled
                        />
                      </Column>

                      <Column>
                        <label htmlFor="patient_email">E-mail</label>
                        <Field
                          id="patient_email"
                          name="patient_email"
                          placeholder="E-mail"
                          disabled
                        />
                      </Column>
                    </Row>
                  )}

                  <h3>Preferências do Atendimento</h3>
                  <Row>
                    <Column>
                      <label htmlFor="shift">Periodo</label>
                      <Field id="shift" name="shift" disabled />
                    </Column>

                    <Column>
                      <label htmlFor="preference_analyst_sex">
                        Sexo do Analísta
                      </label>
                      <Field
                        id="preference_analyst_sex"
                        name="preference_analyst_sex"
                        disabled
                      />
                    </Column>

                    <Column>
                      <label htmlFor="preference_service_modality">
                        Modalidade de Atendimento
                      </label>
                      <Field
                        id="preference_service_modality"
                        name="preference_service_modality"
                        disabled
                      />
                    </Column>

                    <Column>
                      <label htmlFor="preference_district">Região</label>
                      <Field
                        id="preference_district"
                        name="preference_district"
                        disabled
                      />
                    </Column>

                    <Column>
                      <label htmlFor="preference_service_type">
                        Tipos de atendimento
                      </label>
                      <Field
                        id="preference_service_type"
                        name="preference_service_type"
                        disabled
                      />
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

import React, { useMemo } from 'react';
import { Descriptions } from 'antd';
import { Container } from './styles';
import { getShift } from '../../../../utils/getShift';

export function AppointmentInfo({ appointment }) {
  const {
    preference_service_type,
    family_members,
    responsible_appointment_name,
    responsible_appointment_email,
    responsible_appointment_phone_number,
    responsible_patient_name,
    responsible_patient_kinship,
    responsible_appointment_two_name,
    responsible_appointment_two_email,
    responsible_appointment_two_phone_number,
  } = appointment;

  const isPreferenceServiceTypeCouple = useMemo(
    () => preference_service_type === 'casais',
    [appointment],
  );

  const isPreferenceServiceTypeDefault = useMemo(
    () =>
      preference_service_type === 'adultos' ||
      preference_service_type === 'idosos' ||
      preference_service_type === 'interverncoes' ||
      preference_service_type === 'criancas' ||
      preference_service_type === 'adolecentes',
    [appointment],
  );

  const isPreferenceServiceTypeFamily = useMemo(
    () => preference_service_type === 'familias',
    [appointment],
  );

  const hasResponsible = useMemo(
    () =>
      preference_service_type === 'criancas' ||
      preference_service_type === 'adolecentes',
    [appointment],
  );

  const hasInterventions = useMemo(
    () => preference_service_type === 'interverncoes',
    [appointment],
  );

  console.log({ appointment });

  return (
    <Container>
      {/* Tipo de atendimento */}
      <Descriptions
        style={{ marginBottom: 50 }}
        title="Tipo de Atendimento"
        bordered
      >
        <Descriptions.Item label="Tipo de Atendimento" span={2}>
          {appointment.preference_service_type}
        </Descriptions.Item>
      </Descriptions>

      {/* Responsável pela solicitação */}
      {hasResponsible && (
        <Descriptions
          style={{ marginBottom: 50 }}
          title="Responsável pela solicitação"
          bordered
        >
          <Descriptions.Item label="Nome" span={2}>
            {responsible_appointment_name}
          </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={2}>
            {responsible_appointment_email}
          </Descriptions.Item>
          <Descriptions.Item label="Telefone" span={2}>
            {responsible_appointment_phone_number}
          </Descriptions.Item>
        </Descriptions>
      )}

      {/* Responsável pelo paciente */}
      {hasResponsible && (
        <Descriptions
          style={{ marginBottom: 50 }}
          title="Responsável pela paciente"
          bordered
        >
          <Descriptions.Item label="Nome" span={2}>
            {responsible_patient_name}
          </Descriptions.Item>
          <Descriptions.Item label="Vínculo com o paciente" span={2}>
            {responsible_patient_kinship}
          </Descriptions.Item>
        </Descriptions>
      )}

      {/* Informações do paciente */}
      {isPreferenceServiceTypeDefault && (
        <Descriptions
          style={{ marginBottom: 50 }}
          title="Informações do Paciente"
          bordered
        >
          <Descriptions.Item label="Nome" span={2}>
            {appointment.patient_name}
          </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={2}>
            {appointment.patient_email && appointment.patient_email}
          </Descriptions.Item>
          <Descriptions.Item label="Data de nascimento" span={2}>
            {appointment.patient_birthday}
          </Descriptions.Item>
          <Descriptions.Item label="Sexo" span={2}>
            {appointment.patient_sex}
          </Descriptions.Item>
          <Descriptions.Item label="Telefone" span={2}>
            {appointment.patient_phone_number &&
              appointment.patient_phone_number}
          </Descriptions.Item>
        </Descriptions>
      )}

      {/* Dados da mãe */}
      {hasInterventions && (
        <Descriptions
          style={{ marginBottom: 50 }}
          title="Dados da mãe"
          bordered
        >
          <Descriptions.Item label="Nome" span={2}>
            {responsible_appointment_name}
          </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={2}>
            {responsible_appointment_email}
          </Descriptions.Item>
          <Descriptions.Item label="Telefone" span={2}>
            {responsible_appointment_phone_number}
          </Descriptions.Item>
        </Descriptions>
      )}

      {/* Dados do pai */}
      {hasInterventions && (
        <Descriptions
          style={{ marginBottom: 50 }}
          title="Dados da mãe"
          bordered
        >
          <Descriptions.Item label="Nome" span={2}>
            {responsible_appointment_two_name}
          </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={2}>
            {responsible_appointment_two_email}
          </Descriptions.Item>
          <Descriptions.Item label="Telefone" span={2}>
            {responsible_appointment_two_phone_number}
          </Descriptions.Item>
        </Descriptions>
      )}

      {isPreferenceServiceTypeCouple && (
        <>
          <Descriptions
            style={{ marginBottom: 50 }}
            title="Informações do Paciente 1"
            bordered
          >
            <Descriptions.Item label="Nome" span={2}>
              {appointment.patient_name}
            </Descriptions.Item>
            <Descriptions.Item label="E-mail" span={2}>
              {appointment.patient_email}
            </Descriptions.Item>
            <Descriptions.Item label="Data de nascimento" span={2}>
              {appointment.patient_birthday}
            </Descriptions.Item>
            <Descriptions.Item label="Sexo" span={2}>
              {appointment.patient_sex}
            </Descriptions.Item>
            <Descriptions.Item label="Telefone" span={2}>
              {appointment.patient_phone_number}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            style={{ marginBottom: 50 }}
            title="Informações do Paciente 2"
            bordered
          >
            <Descriptions.Item label="Nome" span={2}>
              {appointment.patient_two_name}
            </Descriptions.Item>
            <Descriptions.Item label="E-mail" span={2}>
              {appointment.patient_two_email}
            </Descriptions.Item>
            <Descriptions.Item label="Data de nascimento" span={2}>
              {appointment.patient_two_birthday}
            </Descriptions.Item>
            <Descriptions.Item label="Sexo" span={2}>
              {appointment.patient_two_sex}
            </Descriptions.Item>
            <Descriptions.Item label="Telefone" span={2}>
              {appointment.patient_two_phone_number}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}

      {isPreferenceServiceTypeFamily &&
        family_members.map((familyItem) => (
          <Descriptions
            style={{ marginBottom: 50 }}
            title={`Informações do Paciente ${familyItem.kinship}`}
            bordered
          >
            <Descriptions.Item label="Nome" span={2}>
              {familyItem.name}
            </Descriptions.Item>
            <Descriptions.Item label="E-mail" span={2}>
              {familyItem.email}
            </Descriptions.Item>
            <Descriptions.Item label="Data de nascimento" span={2}>
              {familyItem.birthday}
            </Descriptions.Item>
          </Descriptions>
        ))}

      <Descriptions
        style={{ marginBottom: 50 }}
        title="Preferências do Atendimento"
        bordered
      >
        <Descriptions.Item label="Conhece algum membro do SPBSB" span={2}>
          {appointment.have_bond_spbsb ? 'Sim' : 'Não'}
        </Descriptions.Item>
        <Descriptions.Item label="É a primeira inscrição ?" span={2}>
          {appointment.is_first_subscription}
        </Descriptions.Item>
        <Descriptions.Item label="Perído do dia" span={2}>
          {getShift({
            night_service: appointment.preference_night_service,
            afternoon_service: appointment.preference_afternoon_service,
            morning_service: appointment.preference_morning_service,
          })}
        </Descriptions.Item>
        <Descriptions.Item label="Sexo do analista" span={2}>
          {appointment.preference_analyst_sex}
        </Descriptions.Item>
        <Descriptions.Item label="Modalidade de atendimento" span={2}>
          {appointment.preference_service_modality}
        </Descriptions.Item>
        <Descriptions.Item label="Bairro" span={2}>
          {appointment.preference_district}
        </Descriptions.Item>
      </Descriptions>

      {appointment.analyst && (
        <Descriptions
          style={{ marginBottom: 50 }}
          title="Informações do Analista"
          bordered
        >
          <Descriptions.Item label="Nome" span={2}>
            {appointment.analyst.name}
          </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={2}>
            {appointment.analyst.email}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Container>
  );
}

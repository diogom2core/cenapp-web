/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';

import { Select, Radio, Checkbox, Divider } from 'antd';
import { toast } from 'react-toastify';

import MaskedInput from 'react-text-mask';
import { AppoitmentFinish, Fild, Container, Content, FormBox, Footer, ModalConfirm, GroupBox } from './styles';
import api from '../../services/api';
import appointmentFinish from '../../assets/appointment_finish.png';
import Button from '../../components/Button';
import { birthdayMask, phoneNumberMask } from '../../helpers/masks';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Manhã', 'Tarde', 'Noite'];

function AppointmentForm() {
  const [initialValues] = useState({
    patient_name: '',
    patient_email: '',
    bond_spbsb_name: '',
  });
  const [preferenceDistrict, setPreferenceDistrict] = useState('');
  const [preferenceAnalystSex, setPreferenceAnalystSex] = useState('');
  const [preferenceServiceModality, setPreferenceServiceModality] = useState('');
  const [preferenceServiceType, setPreferenceServiceType] = useState('');

  const [patientSex, setPatientSex] = useState('');
  const [patientTwoSex, setPatientTwoSex] = useState('');
  const [patientMadeRequest, setPatientMadeRequest] = useState('');
  const [whoSeeksCare, setWhoSeeksCare] = useState('');
  const [howManyFamilyMembers, setHowManyFamilyMembers] = useState(0);

  const [hasAssociationSPBSB, setHasAssociationSPBSB] = useState(false);
  const [fisrtSubscription, setFisrtSubscription] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [formValues, setFormValues] = useState();
  const [districtsToSelect, setDistrictsToSelect] = useState([]);
  const [isModalWarningOpen, setIsModalWarningOpen] = useState(false);

  const [isAppoitmentFinish, setIsAppoitmentFinish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalAnalystAvailable, setIsOpenModalAnalystAvailable] = useState(false);

  async function handleSubmit(values) {
    setIsOpen(true);
    setFormValues(values);
  }

  const familyMembersArray = useMemo(() => Array.from(
    { length: Number(howManyFamilyMembers) },
    (_, i) => i + 1,
  ), [howManyFamilyMembers]);

  const sendAppointment = async (type) => {
    try {
      setLoading(true);

      const familyMembersData = [];

      familyMembersArray.map((member) => {
        const getMember = {
          name: formValues[`family_patient_name_${member}`],
          email: formValues[`family_patient_email_${member}`],
          birthday: formValues[`family_patient_birthday_${member}`],
          kinship: formValues[`family_patient_kinship_${member}`],
        };

        return familyMembersData.push(getMember);
      });

      const {
        patient_name,
        patient_email,
        patient_birthday,
        patient_phone_number,
        patient_two_name,
        patient_two_email,
        patient_two_birthday,
        patient_two_phone_number,
        responsible_appointment_name,
        responsible_appointment_email,
        responsible_appointment_phone_number,
        responsible_appointment_kinship,
        responsible_appointment_two_name,
        responsible_appointment_two_email,
        responsible_appointment_two_phone_number,
        responsible_patient_name,
        responsible_patient_kinship,
        bond_spbsb_name,
        bond_spbsb_type } = formValues;

      if (type === 'verify') {
        const verifyResponse = await api.post('/appointments/verify-analyst-available', {
          preference_district: preferenceDistrict,
          preference_analyst_sex: preferenceAnalystSex,
          preference_service_modality: preferenceServiceModality,
          preference_service_type: preferenceServiceType,
          preference_night_service: checkedList.includes('Noite'),
          preference_afternoon_service: checkedList.includes('Tarde'),
          preference_morning_service: checkedList.includes('Manhã'),
        });

        if (!verifyResponse.data.have_analyst_available) {
          setIsOpen(false);
          setIsOpenModalAnalystAvailable(true);
          return;
        }
      }

      await api.post('/appointments', {
        preference_district: preferenceDistrict,
        preference_analyst_sex: preferenceAnalystSex,
        preference_service_modality: preferenceServiceModality,
        preference_service_type: preferenceServiceType,
        preference_night_service: checkedList.includes('Noite'),
        preference_afternoon_service: checkedList.includes('Tarde'),
        preference_morning_service: checkedList.includes('Manhã'),
        patient_made_request: preferenceServiceType === 'interverncoes' ? (whoSeeksCare === 'outro' ? 'outro' : patientMadeRequest) : patientMadeRequest,
        patient_name,
        patient_email,
        patient_birthday,
        patient_sex: patientSex,
        patient_phone_number,
        patient_two_name,
        patient_two_email,
        patient_two_birthday,
        patient_two_phone_number,
        patient_two_sex: patientTwoSex,
        responsible_appointment_name,
        responsible_appointment_email,
        responsible_appointment_phone_number,
        responsible_appointment_kinship: preferenceServiceType === 'interverncoes' ? (whoSeeksCare === 'outro' ? responsible_appointment_kinship : 'mãe') : null,
        responsible_appointment_two_name,
        responsible_appointment_two_email,
        responsible_appointment_two_phone_number,
        responsible_appointment_two_kinship: preferenceServiceType === 'interverncoes' ? 'pai' : null,
        responsible_patient_name,
        responsible_patient_kinship,
        have_bond_spbsb: hasAssociationSPBSB,
        bond_spbsb_name,
        bond_spbsb_type,
        family_members: familyMembersData,
      });

      setLoading(false);

      toast.success('Encaminhamento feito com sucesso!');
      setIsAppoitmentFinish(true);
      setIsOpen(false);
      setIsOpenModalAnalystAvailable(false);
    } catch (err) {
      const { message } = JSON.parse(err.request.responseText);
      toast.error(`Error ao cadastrar:  ${message}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  function getServiceTypeMessage(serviceTypeValue) {
    switch (serviceTypeValue) {
      case 'adolecentes':
        return `LEIA COM ATENÇÃO:
        Atendimento para pessoas acima de 12 até 18 anos.
        O atendimento psicanalítico é realizado preferencialmente 3 vezes por semana.`;
      case 'adultos':
        return `LEIA COM ATENÇÃO:
        Atendimento para pessoas acima de 18 anos.
        O atendimento psicanalítico é realizado preferencialmente 3 vezes por semana.`;
      case 'casais':
        return `LEIA COM ATENÇÃO:
        Atendimento para pessoas acima de 18 anos.
        O atendimento psicanalítico é realizado 1 vez por semana.`;
      case 'criancas':
        return `LEIA COM ATENÇÃO:
        Atendimento para pessoas acima de 3 até 12 anos.
        O atendimento psicanalítico é realizado preferencialmente 3 vezes por semana.`;
      case 'familias':
        return `LEIA COM ATENÇÃO:
        O atendimento psicanalítico é realizado 1 vez por semana.`;
      case 'idosos':
        return `LEIA COM ATENÇÃO:
        Atendimento para pessoas acima 60 anos
        O atendimento psicanalítico é realizado preferencialmente 3 vezes por semana.`;
      case 'interverncoes':
        return `LEIA COM ATENÇÃO:
        Intervenção precoce é um tipo de atendimento em que a mãe e/ou pai ou responsável/responsáveis juntamente com o bebê (até 3 anos) são atendidos em consultório. O atendimento visa trabalhar demandas dos vínculos pais/bebê, prevenindo patologias futuras.
          O atendimento psicanalítico é realizado 1 vez por semana.`;
      default:
        return 'Selecione o tipo de serviço';
    }
  }

  async function getDistricts() {
    const response = await api.get('/analysts/analyst-districts');
    setDistrictsToSelect(response.data);
  }

  useEffect(() => {
    getDistricts();
    setTimeout(() => {
      setIsModalWarningOpen(true);
    }, 2000);
  }, []);

  return (
    <Container>
      <Content>

        {
          !isAppoitmentFinish && (
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>

              {({
                touched,
                errors,
                handleChange,
                handleBlur,
              }) => (
                <>

                  <h3>Formulário de Encaminhamento</h3>

                  <Form>

                    <FormBox>
                      <h3>Atendimento</h3>

                      <div className="form_box_main">
                        <div>
                          <Fild>
                            <label htmlFor="type_of_service">Tipo de Atendimento</label>
                            <Select
                              id="type_of_service"
                              defaultValue="Modalidade de atendimento"
                              style={{ width: 205 }}
                              onChange={(serviceTypeValue) =>
                                setPreferenceServiceType(serviceTypeValue)}
                            >
                              <Option key="adultos">Adulto</Option>
                              <Option key="idosos">Adulto maduro</Option>
                              <Option key="criancas">Criança</Option>
                              <Option key="adolecentes">Adolescente</Option>
                              <Option key="casais">Casal</Option>
                              <Option key="familias">Família</Option>
                              <Option key="interverncoes">Intervenção precoce</Option>
                            </Select>
                          </Fild>
                        </div>

                        <div className="text_helper">
                          {getServiceTypeMessage(preferenceServiceType)}
                        </div>
                      </div>
                    </FormBox>

                    {/* Criança e Adolecente */}
                    {
                      (preferenceServiceType === 'criancas' || preferenceServiceType === 'adolecentes') && (
                      <FormBox>
                        <>
                          <h4>Responsável pela Solicitação</h4>

                          <div className="conditional_inputs">
                            <Fild>
                              <label htmlFor="responsible_appointment_name">Nome do responsável</label>
                              <Field id="responsible_appointment_name" name="responsible_appointment_name" placeholder="Nome do responsável" />
                            </Fild>

                            <Fild>
                              <label htmlFor="responsible_appointment_email">E-mail do responsável</label>
                              <Field id="responsible_appointment_email" name="responsible_appointment_email" placeholder="E-mail" />
                            </Fild>

                            <Fild>
                              <label htmlFor="responsible_appointment_phone_number">Telefone celular</label>
                              <Field
                                name="responsible_appointment_phone_number"
                                render={({ field }) => (
                                  <MaskedInput
                                    {...field}
                                    id="responsible_appointment_phone_number"
                                    name="responsible_appointment_phone_number"
                                    mask={phoneNumberMask}
                                    placeholder="Telefone"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                                errors.responsible_appointment_phone_number &&
                                                touched.responsible_appointment_phone_number
                                                  ? 'text-input error'
                                                  : 'text-input'
                                              }
                                  />
                                )}
                              />
                            </Fild>
                          </div>

                          <h4>Responsável pela Paciente</h4>

                          <div className="conditional_inputs">
                            <Fild>
                              <label htmlFor="responsible_patient_name">Nome do responsável</label>
                              <Field id="responsible_patient_name" name="responsible_patient_name" placeholder="Nome do responsável" />
                            </Fild>

                            <Fild>
                              <label htmlFor="responsible_patient_kinship">Vínculo com o paciente</label>
                              <Field id="responsible_patient_kinship" name="responsible_patient_kinship" placeholder="Vínculo com o paciente" />
                            </Fild>
                          </div>
                        </>
                      </FormBox>
                      )
                    }

                    <FormBox>
                      <h3>Informações do paciente</h3>

                      {/* Casal */}
                      {
                        preferenceServiceType === 'casais' && (
                          <>
                            <Fild>
                              <label htmlFor="period">Quem preenche o formulário?</label>

                              <Radio.Group
                                onChange={(event) => setPatientMadeRequest(event.target.value)}
                                value={patientMadeRequest}
                              >
                                <Radio value="paciente 01">Paciente 01</Radio>
                                <Radio value="paciente 02">Paciente 02</Radio>
                                <Radio value="ambos">Ambos</Radio>
                              </Radio.Group>
                            </Fild>

                            <GroupBox>
                              <h4>Paciente 01</h4>

                              <div className="conditional_inputs">
                                <Fild>
                                  <label htmlFor="patient_name">Nome</label>
                                  <Field id="patient_name" name="patient_name" placeholder="Nome" />
                                </Fild>

                                <Fild>
                                  <label htmlFor="patient_email">E-mail</label>
                                  <Field id="patient_email" name="patient_email" placeholder="E-mail" />
                                </Fild>

                                <Fild>
                                  <label htmlFor="patient_birthday">Data de nascimento</label>
                                  <Field
                                    name="patient_birthday"
                                    render={({ field }) => (
                                      <MaskedInput
                                        {...field}
                                        mask={birthdayMask}
                                        id="patient_birthday"
                                        placeholder="Data de nascimento"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                        errors.patient_birthday && touched.patient_birthday
                          ? 'text-input error'
                          : 'text-input'
                      }
                                      />
                                    )}
                                  />

                                </Fild>

                                <Fild>
                                  <label htmlFor="patient_sex">Sexo</label>
                                  <Select
                                    id="patient_sex"
                                    defaultValue="Sexo"
                                    style={{ width: 205 }}
                                    onChange={(sexValue) => setPatientSex(sexValue)}
                                  >
                                    <Option key="m">Masculino</Option>
                                    <Option key="f">Feminino</Option>
                                  </Select>
                                </Fild>

                                <Fild>
                                  <label htmlFor="patient_phone_number">Telefone celular</label>
                                  <Field
                                    name="patient_phone_number"
                                    render={({ field }) => (
                                      <MaskedInput
                                        {...field}
                                        id="patient_phone_number"
                                        name="patient_phone_number"
                                        mask={phoneNumberMask}
                                        placeholder="Telefone celular"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                                  errors.patient_phone_number &&
                                                  touched.patient_phone_number
                                                    ? 'text-input error'
                                                    : 'text-input'
                                                }
                                      />
                                    )}
                                  />
                                </Fild>
                              </div>

                              <h4>Paciente 02</h4>

                              <div className="conditional_inputs">
                                <Fild>
                                  <label htmlFor="patient_two_name">Nome</label>
                                  <Field id="patient_two_name" name="patient_two_name" placeholder="Nome" />
                                </Fild>

                                <Fild>
                                  <label htmlFor="patient_two_email">E-mail</label>
                                  <Field id="patient_two_email" name="patient_two_email" placeholder="E-mail" />
                                </Fild>

                                <Fild>
                                  <label htmlFor="patient_two_birthday">Data de nascimento</label>
                                  <Field
                                    name="patient_two_birthday"
                                    render={({ field }) => (
                                      <MaskedInput
                                        {...field}
                                        mask={birthdayMask}
                                        id="patient_two_birthday"
                                        placeholder="Data de nascimento"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
errors.patient_two_birthday && touched.patient_two_birthday
  ? 'text-input error'
  : 'text-input'
}
                                      />
                                    )}
                                  />

                                </Fild>

                                <Fild>
                                  <label htmlFor="patient_two_sex">Sexo</label>
                                  <Select
                                    id="patient_two_sex"
                                    defaultValue="Sexo"
                                    style={{ width: 205 }}
                                    onChange={(sexValue) => setPatientTwoSex(sexValue)}
                                  >
                                    <Option key="m">Masculino</Option>
                                    <Option key="f">Feminino</Option>
                                  </Select>
                                </Fild>

                                <Fild>
                                  <label htmlFor="patient_two_phone_number">Telefone celular</label>
                                  <Field
                                    name="patient_two_phone_number"
                                    render={({ field }) => (
                                      <MaskedInput
                                        {...field}
                                        id="patient_two_phone_number"
                                        name="patient_two_phone_number"
                                        mask={phoneNumberMask}
                                        placeholder="Telefone celular"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                      errors.patient_two_phone_number && touched.patient_two_phone_number
                        ? 'text-input error'
                        : 'text-input'
                    }
                                      />
                                    )}
                                  />
                                </Fild>
                              </div>
                            </GroupBox>
                          </>
                        )
                      }

                      {
                        preferenceServiceType === 'interverncoes' && (

                        <>
                          <Fild>
                            <label htmlFor="who_seeks_care">Quem procura atendimento ?</label>
                            <Select
                              id="who_seeks_care"
                              defaultValue="Quem procura atendimento ?"
                              style={{ width: 250 }}
                              onChange={(whoSeeks) => setWhoSeeksCare(whoSeeks)}
                            >
                              <Option key="mae_pai">Mãe e Pai com bebê</Option>
                              <Option key="mae">Mãe com bebê</Option>
                              <Option key="pai">Pai com bebê</Option>
                              <Option key="outro">Outro</Option>
                            </Select>
                          </Fild>

                          {
                            whoSeeksCare === 'mae_pai' && (
                              <Fild>
                                <label htmlFor="period">Quem preenche o formulário?</label>

                                <Radio.Group
                                  onChange={(event) => setPatientMadeRequest(event.target.value)}
                                  value={patientMadeRequest}
                                >
                                  <Radio value="mae">Mãe</Radio>
                                  <Radio value="pai">Pai</Radio>
                                  <Radio value="ambos">Ambos</Radio>
                                </Radio.Group>
                              </Fild>
                            )
                          }

                          <GroupBox>
                            {
                              (whoSeeksCare === 'mae_pai' || whoSeeksCare === 'mae' || whoSeeksCare === 'outro') && (
                                <>
                                  <h4>
                                    Dados
                                    {whoSeeksCare === 'outro' ? ' do Responsável' : ' da Mãe'}
                                  </h4>

                                  <div className="conditional_inputs">
                                    <Fild>
                                      <label htmlFor="responsible_appointment_name">Nome</label>
                                      <Field id="responsible_appointment_name" name="responsible_appointment_name" placeholder="Nome" />
                                    </Fild>

                                    <Fild>
                                      <label htmlFor="responsible_appointment_email">E-mail</label>
                                      <Field id="responsible_appointment_email" name="responsible_appointment_email" placeholder="E-mail" />
                                    </Fild>

                                    <Fild>
                                      <label htmlFor="responsible_appointment_phone_number">Telefone celular</label>
                                      <Field
                                        name="responsible_appointment_phone_number"
                                        render={({ field }) => (
                                          <MaskedInput
                                            {...field}
                                            id="responsible_appointment_phone_number"
                                            name="responsible_appointment_phone_number"
                                            mask={phoneNumberMask}
                                            placeholder="Telefone celular"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                          />
                                        )}
                                      />
                                    </Fild>

                                    {
                                      whoSeeksCare === 'outro' && (
                                        <Fild>
                                          <label htmlFor="responsible_appointment_kinship">Grau de parentesco</label>
                                          <Field id="responsible_appointment_kinship" name="responsible_appointment_kinship" placeholder="Grau de parentesco" />
                                        </Fild>
                                      )
                                    }
                                  </div>
                                </>
                              )
                            }

                            {
                              (whoSeeksCare === 'mae_pai' || whoSeeksCare === 'pai') && (
                                <>
                                  <h4>Dados do Pai</h4>

                                  <div className="conditional_inputs">
                                    <Fild>
                                      <label htmlFor="responsible_appointment_two_name">Nome</label>
                                      <Field id="responsible_appointment_two_name" name="responsible_appointment_two_name" placeholder="Nome" />
                                    </Fild>

                                    <Fild>
                                      <label htmlFor="responsible_appointment_two_email">E-mail</label>
                                      <Field id="responsible_appointment_two_email" name="responsible_appointment_two_email" placeholder="E-mail" />
                                    </Fild>

                                    <Fild>
                                      <label htmlFor="responsible_appointment_two_phone_number">Telefone celular</label>
                                      <Field
                                        name="responsible_appointment_two_phone_number"
                                        render={({ field }) => (
                                          <MaskedInput
                                            {...field}
                                            id="responsible_appointment_two_phone_number"
                                            name="responsible_appointment_two_phone_number"
                                            mask={phoneNumberMask}
                                            placeholder="Telefone celular"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                          />
                                        )}
                                      />
                                    </Fild>
                                  </div>
                                </>

                              )
                            }

                            <h4>Dados do Bebê</h4>

                            <div className="conditional_inputs">
                              <Fild>
                                <label htmlFor="patient_name">Nome</label>
                                <Field id="patient_name" name="patient_name" placeholder="Nome" />
                              </Fild>

                              <Fild>
                                <label htmlFor="patient_birthday">Data de nascimento</label>
                                <Field
                                  name="patient_birthday"
                                  render={({ field }) => (
                                    <MaskedInput
                                      {...field}
                                      mask={birthdayMask}
                                      id="patient_birthday"
                                      placeholder="Data de nascimento"
                                      type="text"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                  )}
                                />
                              </Fild>

                              <Fild>
                                <label htmlFor="patient_sex">Sexo</label>
                                <Select
                                  id="patient_sex"
                                  defaultValue="Sexo"
                                  style={{ width: 205 }}
                                  onChange={(sexValue) => setPatientSex(sexValue)}
                                >
                                  <Option key="m">Masculino</Option>
                                  <Option key="f">Feminino</Option>
                                </Select>
                              </Fild>
                            </div>

                          </GroupBox>
                        </>
                        )
                      }

                      {/* Familia */}
                      {
                        preferenceServiceType === 'familias' && (
                          <>
                            <Fild>
                              <label htmlFor="who_seeks_care">Quantos integrantes compõem a família ?</label>
                              <Select
                                id="who_seeks_care"
                                defaultValue="Número de integrantes ?"
                                style={{ width: 250 }}
                                onChange={(familyMambers) => setHowManyFamilyMembers(familyMambers)}
                              >
                                <Option key="2">2</Option>
                                <Option key="3">3</Option>
                                <Option key="4">4</Option>
                                <Option key="5">5</Option>
                                <Option key="6">6</Option>
                                <Option key="7">7</Option>
                                <Option key="8">8</Option>
                                <Option key="9">9</Option>
                                <Option key="10">10</Option>
                              </Select>
                            </Fild>

                            <GroupBox>
                              {
                                !!familyMembersArray.length && (
                                  familyMembersArray.map((numberFamily) => (
                                    <>
                                      <h4>
                                        { `Membro ${numberFamily}`}
                                      </h4>

                                      <div className="conditional_inputs">
                                        <Fild>
                                          <label htmlFor={`family_patient_name_${numberFamily}`}>Nome</label>
                                          <Field id={`family_patient_name_${numberFamily}`} name={`family_patient_name_${numberFamily}`} placeholder="Nome" />
                                        </Fild>

                                        <Fild>
                                          <label htmlFor={`family_patient_email_${numberFamily}`}>E-mail</label>
                                          <Field id={`family_patient_email_${numberFamily}`} name={`family_patient_email_${numberFamily}`} placeholder="E-mail" />
                                        </Fild>

                                        <Fild>
                                          <label htmlFor={`family_patient_birthday_${numberFamily}`}>Data de nascimento</label>
                                          <Field
                                            name={`family_patient_birthday_${numberFamily}`}
                                            render={({ field }) => (
                                              <MaskedInput
                                                {...field}
                                                mask={birthdayMask}
                                                id={`family_patient_birthday_${numberFamily}`}
                                                placeholder="Data de nascimento"
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              />
                                            )}
                                          />
                                        </Fild>

                                        <Fild>
                                          <label htmlFor={`family_patient_kinship_${numberFamily}`}>Grau de parentesco</label>
                                          <Field id={`family_patient_kinship_${numberFamily}`} name={`family_patient_kinship_${numberFamily}`} placeholder="Grau de parentesco" />
                                        </Fild>
                                      </div>
                                    </>
                                  ))
                                )
                              }
                            </GroupBox>
                          </>
                        )
                      }

                      {/* Outros */}
                      {
                        (preferenceServiceType !== 'casais' && preferenceServiceType !== 'interverncoes' && preferenceServiceType !== 'familias') && (
                          <GroupBox>
                            <div className="conditional_inputs">
                              <Fild>
                                <label htmlFor="patient_name">Nome</label>
                                <Field id="patient_name" name="patient_name" placeholder="Nome" />
                              </Fild>

                              {
                                (preferenceServiceType !== 'criancas' && preferenceServiceType !== 'adolecentes') && (
                                  <Fild>
                                    <label htmlFor="patient_email">E-mail</label>
                                    <Field id="patient_email" name="patient_email" placeholder="E-mail" />
                                  </Fild>
                                )
                              }

                              <Fild>
                                <label htmlFor="patient_birthday">Data de nascimento</label>
                                <Field
                                  name="patient_birthday"
                                  render={({ field }) => (
                                    <MaskedInput
                                      {...field}
                                      mask={birthdayMask}
                                      id="patient_birthday"
                                      placeholder="Data de nascimento"
                                      type="text"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={
                        errors.patient_birthday && touched.patient_birthday
                          ? 'text-input error'
                          : 'text-input'
                      }
                                    />
                                  )}
                                />

                              </Fild>

                              <Fild>
                                <label htmlFor="patient_sex">Sexo</label>
                                <Select
                                  id="patient_sex"
                                  defaultValue="Sexo"
                                  style={{ width: 205 }}
                                  onChange={(sexValue) => setPatientSex(sexValue)}
                                >
                                  <Option key="m">Masculino</Option>
                                  <Option key="f">Feminino</Option>
                                </Select>
                              </Fild>

                              {
                                (preferenceServiceType !== 'criancas' && preferenceServiceType !== 'adolecentes') && (
                                  <Fild>
                                    <label htmlFor="patient_phone_number">Telefone celular</label>
                                    <Field
                                      name="patient_phone_number"
                                      render={({ field }) => (
                                        <MaskedInput
                                          {...field}
                                          id="patient_phone_number"
                                          name="patient_phone_number"
                                          mask={phoneNumberMask}
                                          placeholder="Telefone celular"
                                          type="text"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          className={
                                                    errors.patient_phone_number &&
                                                    touched.patient_phone_number
                                                      ? 'text-input error'
                                                      : 'text-input'
                                                  }
                                        />
                                      )}
                                    />
                                  </Fild>
                                )
                              }
                            </div>
                          </GroupBox>
                        )
                      }

                    </FormBox>

                    <FormBox>
                      <h3>Preferências do atendimento</h3>

                      <div className="conditional_inputs">
                        <Fild>
                          <label htmlFor="period">Você conhece algum membro da Sociedade de Psicanálise de Brasília?</label>

                          <Radio.Group
                            onChange={(event) => setHasAssociationSPBSB(event.target.value)}
                            value={hasAssociationSPBSB}
                          >
                            <Radio value={false}>Não</Radio>
                            <Radio value>Sim</Radio>
                          </Radio.Group>
                        </Fild>

                        {
                        hasAssociationSPBSB && (
                          <>
                            <Fild>
                              <label htmlFor="bond_spbsb_name">Qual o nome e vínculo possui com o membro?</label>
                              <Field id="bond_spbsb_name" name="bond_spbsb_name" placeholder="nome do membro" />
                            </Fild>

                            <Fild>
                              <label htmlFor="bond_spbsb_type">Qual o vínculo?</label>
                              <Field id="bond_spbsb_type" name="bond_spbsb_type" placeholder="Vínculo" />
                            </Fild>

                          </>

                        )
                      }

                        <Fild>
                          <label htmlFor="period">Primeira inscrição no cenapp?</label>

                          <Radio.Group
                            onChange={(event) => setFisrtSubscription(event.target.value)}
                            value={fisrtSubscription}
                          >
                            <Radio value={false}>Não</Radio>
                            <Radio value>Sim</Radio>
                          </Radio.Group>
                        </Fild>

                        <Fild>
                          <label htmlFor="period">Qual o melhor horário para atendimento? (pode marcar mais de uma)*</label>

                          <CheckboxGroup
                            options={plainOptions}
                            value={checkedList}
                            onChange={(list) => setCheckedList(list)}
                          />
                        </Fild>

                        <Fild>
                          <label htmlFor="sex">Sexo do Analísta</label>
                          <Select
                            id="sex"
                            defaultValue="Sexo do analista"
                            style={{ width: 205 }}
                            onChange={(sexValue) => setPreferenceAnalystSex(sexValue)}
                          >
                            <Option key="m">Masculino</Option>
                            <Option key="f">Feminino</Option>
                          </Select>
                        </Fild>

                        <Fild>
                          <label htmlFor="modality">Modalidade de Atendimento</label>
                          <Select
                            id="modality"
                            defaultValue="Modalidade de atendimento"
                            style={{ width: 205 }}
                            onChange={(modalityValue) =>
                              setPreferenceServiceModality(modalityValue)}
                          >
                            <Option key="presencial">Presencial</Option>
                            <Option key="online">Online</Option>
                          </Select>
                        </Fild>

                        {
                      preferenceServiceModality && preferenceServiceModality !== 'online' && (
                        <Fild>
                          <label htmlFor="district">Bairro</label>

                          <Select
                            id="district"
                            defaultValue="Selecione o bairro"
                            style={{ width: 205 }}
                            onChange={(districtValue) => setPreferenceDistrict(districtValue)}
                          >
                            {
                              !!districtsToSelect.length && (
                                districtsToSelect.map(region => (
                                  <Option key={region}>{region}</Option>
                                ))
                              )
                            }
                          </Select>
                        </Fild>
                      )
                    }
                      </div>
                    </FormBox>

                    <Button width={340} type="submit" loading={loading}>
                      Continuar
                    </Button>
                  </Form>
                </>
              )}
            </Formik>
          )
        }

        {
          // Confirmação de agendamento
          !appointmentFinish && (
            <>
              <Divider />

              <Footer>
                <p>
                  Dúvidas e informações: (xx) x.xxxx-xxxx (preferencialmente whatsapp)
                  ou e-mail@xxx.com.br
                </p>
              </Footer>
            </>
          )
        }

        {
          // Agendamento enviados
          isAppoitmentFinish && (
            <AppoitmentFinish>
              <img src={appointmentFinish} alt="" />

              <h3>Encaminhamento Registrado</h3>
              <p>
                Seu encaminhamento foi realizado, você receberá uma e-mail com
                dados de confirmação
              </p>
              <p>
                Agora é aguardar, quando tiver algum analista disponivel,
                vamos avisar por e-mail
              </p>
            </AppoitmentFinish>
          )
        }

        <ModalConfirm open={isOpen}>
          <div className="content">
            <div className="content-header">
              <button type="button">
                <MdClose
                  size={20}
                  color="#3a3a3a"
                  onClick={() => setIsOpen(false)}
                />
              </button>
            </div>

            <div>
              <strong>IMPORTANTE</strong>
              <p>
                - O atendimento pelo Cenapp não é gratuito e é sujeito à existência de vagas.
                O valor da sessão deverá ser acordado entre o psicanalista e paciente.
              </p>
              <p>
                - O sistema fará escolha do psicanalista de acordo com as opções que você marcou
                na ficha de inscrição; mas não necessariamente haverá psicanalistas com horários
                disponíveis dentro dos critérios escolhidos;
              </p>
              <p>
                - Após a inscrição, o sistema lhe enviará um e-mail com o nome e telefone do
                psicanalista disponível. Fique atento a sua caixa de spam;
              </p>
              <p>
                - Ao receber o nome e contato do psicanalista, você terá o prazo máximo de 15
                dias corridos para entrar em contato;
              </p>
              <p>
                - Caso não haja analista com vagas disponíveis de acordo com os critérios
                escolhidos, o sistema ficará em modo de busca pelo prazo de 30 dias corridos;
                se durante esse período de busca você não receber nenhum e-mail, e ainda
                queira atendimento, por favor, entre em contato com a secretaria da Sociedade
                de Psicanálise de Brasília, nos telefones (61) 99595-1073 / 99927-9900
                (preferencialmente whatsapp) ou secretaria@spbsb.org.br / spbsb@spbsb.org.br.
              </p>

              <span>
                ...
              </span>
            </div>

            <footer className="content-footer">
              <span onClick={() => setIsOpen(false)}>Cancelar</span>
              <button type="button" onClick={() => sendAppointment('verify')}>
                Confirmar
              </button>
            </footer>
          </div>
        </ModalConfirm>

        <ModalConfirm open={isOpenModalAnalystAvailable}>
          <div className="content">
            <div className="content-header">
              <button type="button">
                <MdClose
                  size={20}
                  color="#3a3a3a"
                  onClick={() => setIsOpenModalAnalystAvailable(false)}
                />
              </button>
            </div>

            <div>
              <strong>Atenção</strong>
              <p>
                Não foi encontrado nenhum analista com os requisitos desejados.
              </p>
              <p>Você pode:</p>
              <p>
                1. Rever critérios do encaminhamento
              </p>
              <p>
                2. Aguardar a disponibilidade de um analista (período de 1 mês)
              </p>
            </div>

            <footer className="content-footer">
              <span onClick={() => setIsOpenModalAnalystAvailable(false)}>Rever critérios</span>
              <button type="button" onClick={sendAppointment}>
                Confirmar
              </button>
            </footer>
          </div>
        </ModalConfirm>
      </Content>

      <ModalConfirm open={isModalWarningOpen}>
        <div className="content">
          <div className="content-header">
            <button type="button">
              <MdClose
                size={20}
                color="#3a3a3a"
                onClick={() => setIsModalWarningOpen(false)}
              />
            </button>
          </div>

          <div>
            <strong>IMPORTANTE</strong>
            <p>
              O atendimento pelo Cenapp não é gratuito e é sujeito à existência de vagas.
              O valor da sessão deverá ser acordado entre o psicanalista e paciente.
            </p>
          </div>

          <div>
            <strong>Aviso de Privacidade</strong>
            <p>
              Os dados coletados pelo CENAPP neste formulário serão utilizados para confirmar a
              identidade do solicitante, encaminhamento e confirmação de consultas e registro de
              solicitações de atendimento. Sem esses dados mínimos não é possível realizar o
              atendimento do paciente.
            </p>
            <p>
              Os dados pessoais não serão utilizados pelo CENAPP para nenhuma outra finalidade
              que não as acima indicadas e serão compartilhados apenas com o analista responsável
              pelo atendimento.
            </p>
            <p>
              A base legal para esse processo psicanalítico é “execução de contrato” e os dados
              serão
              armazenados pelo CENAPP durante todo o período de tratamento do paciente e, após esse
              período pelo prazo de 05 anos para exercício regular de direitos em processo judicial,
              administrativo ou arbitral
            </p>
          </div>

          <footer className="content-footer c">
            <span onClick={() => setIsModalWarningOpen(false)}>Cancelar</span>
            <button type="button" onClick={() => setIsModalWarningOpen(false)}>
              Li e concordo
            </button>
          </footer>
        </div>
      </ModalConfirm>
    </Container>
  );
}

export default AppointmentForm;

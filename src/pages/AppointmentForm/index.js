/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
import { Field, Form, Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

import { Select, Radio, Checkbox, Divider } from 'antd';
import { toast } from 'react-toastify';

import MaskedInput from 'react-text-mask';
import { AppoitmentFinish, Fild, Container, Content, FormBox, Footer, ModalConfirm } from './styles';
import api from '../../services/api';
import appointmentFinish from '../../assets/appointment_finish.png';
import Button from '../../components/Button';
import { birthdayMask, phoneNumberMask, residentialNumberMask } from '../../helpers/masks';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Manhã', 'Tarde', 'Noite'];

function AppointmentForm() {
  const [initialValues] = useState({
    name: '',
    email: '',
    bond_spbsb_name: '',
  });
  const [district, setDistrict] = useState('');
  const [modality, setModality] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [sex, setSex] = useState('');
  const [sexAnalyst, setSexAnalyst] = useState('');
  const [isAppoitmentFinish, setIsAppoitmentFinish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasAssociationSPBSB, setHasAssociationSPBSB] = useState(false);
  const [fisrtSubscription, setFisrtSubscription] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalAnalystAvailable, setIsOpenModalAnalystAvailable] = useState(false);
  const [formValues, setFormValues] = useState();
  const [districtsToSelect, setDistrictsToSelect] = useState([]);
  const [isModalWarningOpen, setIsModalWarningOpen] = useState(false);

  async function handleSubmit(values) {
    setIsOpen(true);
    setFormValues(values);
  }

  const sendAppointment = useCallback(async (type) => {
    try {
      setLoading(true);

      const { name, email, birthday, bond_patient, cell_phone,
        responsible_appointment, responsible_patient,
        patient_one_name, patient_two_name,
        patient_one_birthday, patient_two_birthday,
        patient_one_phone, patient_two_phone,
        kinship, phone, bond_spbsb_name } = formValues;

      if (type === 'verify') {
        const appointmentResponse = await api.post('/appointments/verify-analyst-available', {
          name,
          email,
          district,
          analyst_sex: sexAnalyst,
          service_modality: modality,
          service_type: serviceType,
          sex,
          birthday,
          bond_patient,
          cell_phone,
          responsible_appointment,
          responsible_patient,
          night_service: checkedList.includes('Noite'),
          afternoon_service: checkedList.includes('Tarde'),
          morning_service: checkedList.includes('Manhã'),
          patient_one_name,
          patient_two_name,
          patient_one_birthday,
          patient_two_birthday,
          patient_one_phone,
          patient_two_phone,
          kinship,
          phone,
          bond_spbsb_name,
        });

        if (!appointmentResponse.data.have_analyst_available) {
          setIsOpen(false);
          setIsOpenModalAnalystAvailable(true);
          return;
        }
      }

      await api.post('/appointments', {
        name,
        email,
        district,
        analyst_sex: sexAnalyst,
        service_modality: modality,
        service_type: serviceType,
        sex,
        birthday,
        bond_patient,
        cell_phone,
        responsible_appointment,
        responsible_patient,
        night_service: checkedList.includes('Noite'),
        afternoon_service: checkedList.includes('Tarde'),
        morning_service: checkedList.includes('Manhã'),
        patient_one_name,
        patient_two_name,
        patient_one_birthday,
        patient_two_birthday,
        patient_one_phone,
        patient_two_phone,
        kinship,
        phone,
        bond_spbsb_name,
      });

      setLoading(false);

      toast.success('Agendamento feito com sucesso!');
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
  }, [formValues]);

  function getServiceTypeMessage(serviceTypeValue) {
    switch (serviceTypeValue) {
      case 'adolecente':
        return `LEIA COM ATENÇÃO:
        Atendimento para pessoas acima de 12 até 18 anos.
        O atendimento psicanalítico é realizado preferencialmente 3 vezes por semana.`;
      case 'adultos':
        return `LEIA COM ATENÇÃO:
        Atendimento para pessoas acima de 18 anos.
        O atendimento psicanalítico é realizado preferencialmente 3 vezes por semana.`;
      case 'casal':
        return `LEIA COM ATENÇÃO:
        Atendimento para pessoas acima de 18 anos.
        O atendimento psicanalítico é realizado 1 vez por semana.`;
      case 'criancas':
        return `LEIA COM ATENÇÃO:
        Atendimento para pessoas acima de 3 até 12 anos.
        O atendimento psicanalítico é realizado preferencialmente 3 vezes por semana.`;
      case 'familia':
        return `LEIA COM ATENÇÃO:
        O atendimento psicanalítico é realizado 1 vez por semana.`;
      case 'idosos':
        return `LEIA COM ATENÇÃO:
        Atendimento para pessoas acima 60 anos
        O atendimento psicanalítico é realizado preferencialmente 3 vezes por semana.`;
      case 'interverncoes':
        return `LEIA COM ATENÇÃO:
          Intervenção precoce é um tipo de atendimento em que a mãe e/ou pai ou responsável (is) juntamente com o bebê (até 3 anos)  são atendidos em consultório e que visa trabalhar demandas dos vínculos pais/bebê, prevenindo patologias futuras.
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

                  <h3>Formulário de Agendamento</h3>

                  <Form>

                    <FormBox>
                      <h3> Atendimento</h3>

                      <div className="form_box_main">
                        <div>
                          <Fild>
                            <label htmlFor="type_of_service">Tipo de Atendimento</label>
                            <Select
                              id="type_of_service"
                              defaultValue="Modalidade de atendimento"
                              style={{ width: 205 }}
                              onChange={(serviceTypeValue) =>
                                setServiceType(serviceTypeValue)}
                            >
                              <Option key="adultos">Adultos</Option>
                              <Option key="idosos">Idosos</Option>
                              <Option key="criancas">Crianças</Option>
                              <Option key="adolecentes">Adolecente</Option>
                              <Option key="casais">Casal</Option>
                              <Option key="familias">Família</Option>
                              <Option key="interverncoes">Intervernções Precoce</Option>
                            </Select>
                          </Fild>
                        </div>

                        <div className="text_helper">
                          {getServiceTypeMessage(serviceType)}
                        </div>
                      </div>

                      <div className="conditional_inputs">
                        {
                        (serviceType === 'adolecentes' || serviceType === 'criancas' || serviceType === 'interverncoes') && (
                          <>
                            <Fild>
                              <label htmlFor="name">Responsável pela solicitação</label>
                              <Field id="name" name="responsible_appointment" placeholder="Responsável pela solicitação" />
                            </Fild>

                            <Fild>
                              <label htmlFor="name">Responsável pelo paciente</label>
                              <Field id="name" name="responsible_patient" placeholder="Responsável pelo paciente" />
                            </Fild>

                            <Fild>
                              <label htmlFor="name">Vínculo com paciente</label>
                              <Field id="name" name="bond_patient" placeholder="Vínculo com paciente" />
                            </Fild>
                          </>
                        )
                       }

                        {
                        serviceType === 'casais' && (
                          <>
                            <Fild>
                              <label htmlFor="name">Nome do paciente 01</label>
                              <Field id="name" name="patient_one_name" placeholder="Nome do paciente 01" />
                            </Fild>

                            <Fild>
                              <label htmlFor="name">Nome do paciente 02</label>
                              <Field id="name" name="patient_two_name" placeholder="Nome do paciente 02" />
                            </Fild>

                            <Fild>
                              <label htmlFor="patient_one_birthday">Nascimento do paciente 01</label>
                              <Field
                                name="patient_one_birthday"
                                render={({ field }) => (
                                  <MaskedInput
                                    {...field}
                                    mask={birthdayMask}
                                    id="patient_one_birthday"
                                    placeholder="Nascimento do paciente 01"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                    errors.birthdayMask && touched.birthdayMask
                                      ? 'text-input error'
                                      : 'text-input'
                                    }
                                  />
                                )}
                              />
                            </Fild>

                            <Fild>
                              <label htmlFor="patient_two_birthday">Nascimento do paciente 02</label>
                              <Field
                                id="patient_two_birthday"
                                name="patient_two_birthday"
                                render={({ field }) => (
                                  <MaskedInput
                                    {...field}
                                    mask={birthdayMask}
                                    id="patient_two_birthday"
                                    placeholder="Nascimento do paciente 02"
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
                              <label htmlFor="patient_one_phone">Telefone do paciente 01</label>
                              <Field
                                id="patient_one_phone"
                                name="patient_one_phone"
                                render={({ field }) => (
                                  <MaskedInput
                                    {...field}
                                    mask={phoneNumberMask}
                                    id="patient_one_phone"
                                    placeholder="Telefone do paciente 01"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                    errors.patient_one_phone && touched.patient_one_phone
                                      ? 'text-input error'
                                      : 'text-input'
                                    }
                                  />
                                )}
                              />
                            </Fild>

                            <Fild>
                              <label htmlFor="patient_two_phone">Telefone do paciente 02</label>
                              <Field
                                name="patient_two_phone"
                                render={({ field }) => (
                                  <MaskedInput
                                    {...field}
                                    mask={phoneNumberMask}
                                    id="patient_two_phone"
                                    placeholder="Telefone do paciente 02"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                    errors.patient_two_phone && touched.patient_two_birthday
                                      ? 'text-input error'
                                      : 'text-input'
                                    }
                                  />
                                )}
                              />
                            </Fild>
                          </>
                        )
                       }
                      </div>

                    </FormBox>

                    <FormBox>
                      <h3>Informações do paciente</h3>

                      <div className="conditional_inputs">
                        <Fild>
                          <label htmlFor="name">Nome</label>
                          <Field id="name" name="name" placeholder="Nome" />
                        </Fild>

                        <Fild>
                          <label htmlFor="email">E-mail</label>
                          <Field id="email" name="email" placeholder="E-mail" />
                        </Fild>

                        <Fild>
                          <label htmlFor="birthday">Data de nascimento</label>
                          <Field
                            name="birthday"
                            render={({ field }) => (
                              <MaskedInput
                                {...field}
                                mask={birthdayMask}
                                id="birthday"
                                placeholder="Data de nascimento"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                      errors.birthday && touched.birthday
                        ? 'text-input error'
                        : 'text-input'
                    }
                              />
                            )}
                          />

                        </Fild>

                        <Fild>
                          <label htmlFor="sex">Sexo</label>
                          <Select
                            id="sex"
                            defaultValue="Sexo"
                            style={{ width: 205 }}
                            onChange={(sexValue) => setSex(sexValue)}
                          >
                            <Option key="m">Masculino</Option>
                            <Option key="f">Feminino</Option>
                          </Select>
                        </Fild>

                        <Fild>
                          <label htmlFor="cell_phone">Telefone celular</label>
                          <Field
                            name="cell_phone"
                            render={({ field }) => (
                              <MaskedInput
                                {...field}
                                id="cell_phone"
                                name="cell_phone"
                                mask={phoneNumberMask}
                                placeholder="Telefone celular"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                                errors.cell_phone && touched.cell_phone
                                                  ? 'text-input error'
                                                  : 'text-input'
                                              }
                              />
                            )}
                          />
                        </Fild>

                        <Fild>
                          <label htmlFor="phone">Telefone fixo</label>
                          <Field
                            name="phone"
                            render={({ field }) => (
                              <MaskedInput
                                {...field}
                                id="email"
                                mask={residentialNumberMask}
                                placeholder="Telefone fixo"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                errors.phone && touched.phone
                                  ? 'text-input error'
                                  : 'text-input'
                                }
                              />
                            )}
                          />
                        </Fild>
                      </div>
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

                        {
                        hasAssociationSPBSB && (
                          <Fild>
                            <label htmlFor="bond_spbsb_name">Qual o nome e vínculo possui com o membro?</label>
                            <Field id="bond_spbsb_name" name="bond_spbsb_name" placeholder="nome do membro" />
                          </Fild>
                        )
                      }

                        <Fild>
                          <label htmlFor="sex">Sexo do Analísta</label>
                          <Select
                            id="sex"
                            defaultValue="Sexo do analista"
                            style={{ width: 205 }}
                            onChange={(sexValue) => setSexAnalyst(sexValue)}
                          >
                            <Option key="m">Homem</Option>
                            <Option key="f">Mulher</Option>
                            <Option key="i">Indiferente</Option>
                          </Select>
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
                          <label htmlFor="modality">Modalidade de Atendimento</label>
                          <Select
                            id="modality"
                            defaultValue="Modalidade de atendimento"
                            style={{ width: 205 }}
                            onChange={(modalityValue) => setModality(modalityValue)}
                          >
                            <Option key="presencial">Presencial</Option>
                            <Option key="online">Online</Option>
                            <Option key="indiferente">Indiferente</Option>
                          </Select>
                        </Fild>

                        {
                      modality && modality !== 'online' && (
                        <Fild>
                          <label htmlFor="district">Bairro</label>

                          <Select
                            id="district"
                            defaultValue="Selecione o bairro"
                            style={{ width: 205 }}
                            onChange={(districtValue) => setDistrict(districtValue)}
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

              <h3>Agendamento cadastrado</h3>
              <p>
                Seu agendamento foi cadastrado, você receberá uma e-mail com
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
                O valor da sessão deverá ser acordado entre o psicanalista e paciente;
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
                1. Rever critérios do agendamento
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
              O valor da sessão deverá ser acordado entre o psicanalista e paciente;
            </p>
          </div>

          <div>
            <strong>Aviso de Privacidade</strong>
            <p>
              Os dados coletados pelo CENAPP neste formulário serão utilizados para confirmar a
              identidade do solicitante, agendamento e confirmação de consultas e registro de
              solicitações de atendimento. Sem esses dados mínimos não é possível realizar o
              atendimento do paciente.
            </p>
            <p>
              Os dados pessoais não serão utilizados pelo CENAPP para nenhuma outra finalidade
              que não as acima indicadas e serão compartilhados apenas com o analista responsável
              pelo atendimento.
            </p>
            <p>
              A base legal para essa atividade de tratamento é “execução de contrato” e os dados
              serão
              armazenados pelo CENAPP durante todo o período de tratamento do paciente e, após esse
              período pelo prazo de 05 anos para exercício regular de direitos em processo judicial,
              administrativo ou arbitral
            </p>
          </div>

          <footer className="content-footer">
            <span onClick={() => setIsModalWarningOpen(false)}>Cancelar</span>
            <button type="button" onClick={() => setIsModalWarningOpen(false)}>
              Confirmar
            </button>
          </footer>
        </div>
      </ModalConfirm>
    </Container>
  );
}

export default AppointmentForm;

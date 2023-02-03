/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Row, Select, Checkbox, Switch } from 'antd';

import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Container, BoxEdit, Column } from './styles';
import api from '../../services/api';
import Button from '../../components/Button';
import REGIONS from '../../helpers/regions';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  'adultos',
  'idosos',
  'crianças',
  'adolescentes',
  'casal',
  'família',
  'intervenções precoce',
];

const shiftOptions = ['manhã', 'tarde', 'noite'];

function AnalystCreate() {
  const [initialValues] = useState({
    name: '',
    email: '',
  });

  const [district, setDistrict] = useState('');
  const [modality, setModality] = useState('');
  const [sex, setSex] = useState('');
  const [priorityLevel, setpriorityLevel] = useState('');
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [createLoading, setCreateLoading] = useState(false);
  const [isAnalystAvailable, setIsAnalystAvailable] = useState(true);

  const [shiftList, setShiftList] = useState([]);
  const history = useHistory();

  async function createAnalyst(values) {
    setCreateLoading(true);
    try {
      const { name, email } = values;
      await api.post('/admin/analyst', {
        name,
        email,
        district,
        service_modality: modality,
        sex,
        priority_levels: Number(priorityLevel),
        service_type_adult: serviceTypeList.some((type) => type === 'adultos'),
        service_type_elderly: serviceTypeList.some((type) => type === 'idosos'),
        service_type_children: serviceTypeList.some(
          (type) => type === 'crianças',
        ),
        service_type_adolescent: serviceTypeList.some(
          (type) => type === 'adolescentes',
        ),
        service_type_couple: serviceTypeList.some((type) => type === 'casal'),
        service_type_family: serviceTypeList.some((type) => type === 'família'),
        service_type_early_interventions: serviceTypeList.some(
          (type) => type === 'intervenções precoce',
        ),
        moning_service: shiftList.some((type) => type === 'manhã'),
        afternoon_service: shiftList.some((type) => type === 'tarde'),
        night_service: shiftList.some((type) => type === 'noite'),
        is_available: isAnalystAvailable,
      });

      toast.success('Analista cadastrado com sucesso!');
      setCreateLoading(false);
      history.goBack();
    } catch (err) {
      const { message } = JSON.parse(err.request.responseText);
      toast.error(`Error ao cadastrar:  ${message}`);
      setCreateLoading(false);
    } finally {
      setCreateLoading(false);
    }
  }

  return (
    <Container>
      <h2>Criação de Analista</h2>
      <BoxEdit>
        <Formik initialValues={initialValues} onSubmit={createAnalyst}>
          {() => (
            <Form>
              <Row>
                <Column>
                  <label htmlFor="name">Nome</label>
                  <Field id="name" name="name" placeholder="Nome" />
                </Column>

                <Column>
                  <label htmlFor="email">E-mail</label>
                  <Field id="email" name="email" placeholder="E-mail" />
                </Column>

                <Column>
                  <label htmlFor="sex">Sexo do Analísta</label>
                  <Select
                    id="sex"
                    defaultValue="Sexo do analista"
                    style={{ width: 205 }}
                    onChange={(sexValue) => setSex(sexValue)}
                  >
                    <Option key="m">Masculino</Option>
                    <Option key="f">Feminino</Option>
                  </Select>
                </Column>
              </Row>

              <Row>
                <Column>
                  <label htmlFor="modality">Modalidade de Atendimento</label>
                  <Select
                    id="modality"
                    defaultValue="Modalidade de atendimento"
                    style={{ width: 205 }}
                    onChange={(valueModality) => setModality(valueModality)}
                  >
                    <Option key="online">Online</Option>
                    <Option key="presencial">Presencial</Option>
                    <Option key="hibrido">Hibrido</Option>
                  </Select>
                </Column>

                {(modality === 'hibrido' || modality === 'presencial') && (
                  <Column>
                    <label htmlFor="district">Bairro</label>

                    <Select
                      id="district"
                      defaultValue="Selecione o bairro"
                      style={{ width: 205 }}
                      onChange={(valueDistrict) => setDistrict(valueDistrict)}
                    >
                      {REGIONS.map((region) => (
                        <Option key={region}>{region}</Option>
                      ))}
                    </Select>
                  </Column>
                )}

                <Column>
                  <label htmlFor="service_type">Período de atendimento</label>

                  <CheckboxGroup
                    options={shiftOptions}
                    value={shiftList}
                    onChange={(list) => setShiftList(list)}
                  />
                </Column>
              </Row>

              <Row>
                <Column>
                  <label htmlFor="service_type">Tipos de atendimento</label>

                  <CheckboxGroup
                    options={plainOptions}
                    value={serviceTypeList}
                    onChange={(list) => setServiceTypeList(list)}
                  />
                </Column>
              </Row>

              <Row>
                <Column>
                  <label htmlFor="sex">Nivel de Prioridade</label>
                  <Select
                    id="priority"
                    defaultValue="Nível de prioridade"
                    style={{ width: 300 }}
                    onChange={(priorityValue) =>
                      setpriorityLevel(priorityValue)
                    }
                  >
                    <Option key="1">
                      nível 1: membros do Instituto em aula
                    </Option>
                    <Option key="2">
                      nível 2: membros do Instituto egressos
                    </Option>
                    <Option key="3">nível 3: membros da SPBsb</Option>
                  </Select>
                </Column>
              </Row>

              <Row>
                <Column>
                  <label htmlFor="available">
                    Disponível para receber solicitações ?
                  </label>
                  <Switch
                    defaultChecked
                    checked={isAnalystAvailable}
                    onChange={() => setIsAnalystAvailable(!isAnalystAvailable)}
                  />
                </Column>
              </Row>

              <div className="button-box">
                <Button width={250} type="submit" loading={createLoading}>
                  Cadastrar Analista
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </BoxEdit>
    </Container>
  );
}

export default AnalystCreate;

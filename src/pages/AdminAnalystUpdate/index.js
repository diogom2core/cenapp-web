/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { Row, Select, Checkbox } from 'antd';

import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
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
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    shift: '',
    district: '',
    service_modality: '',
    priority_levels: '',
  });

  const [district, setDistrict] = useState('');
  const [modality, setModality] = useState('');
  const [sex, setSex] = useState('');
  const [priorityLevel, setpriorityLevel] = useState('');
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [createLoading, setCreateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shiftList, setShiftList] = useState([]);

  const history = useHistory();

  const { analyst_id } = useParams();

  async function updateAnalyst(values) {
    setCreateLoading(true);
    try {
      const { name, email } = values;
      const body = {
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
      };

      await api.put(`/admin/analyst/${analyst_id}`, body);

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

  async function getAnalyst() {
    setIsLoading(true);
    try {
      const response = await api.get(`/admin/analyst/${analyst_id}`);

      setInitialValues(response.data);
      const services = [];
      const shiftServices = [];

      if (response.data.service_type_adult) {
        services.push('adultos');
      }

      if (response.data.service_type_elderly) {
        services.push('idosos');
      }

      if (response.data.service_type_children) {
        services.push('crianças');
      }

      if (response.data.service_type_adolescent) {
        services.push('adolescentes');
      }

      if (response.data.service_type_couple) {
        services.push('casal');
      }

      if (response.data.service_type_early_interventions) {
        services.push('intervenções precoce');
      }

      if (response.data.service_type_family) {
        services.push('família');
      }

      if (response.data.moning_service) {
        shiftServices.push('manhã');
      }

      if (response.data.afternoon_service) {
        shiftServices.push('tarde');
      }
      if (response.data.night_service) {
        shiftServices.push('noite');
      }

      setServiceTypeList(services);
      setSex(response.data.sex);
      setDistrict(response.data.district);
      setModality(response.data.service_modality);
      setpriorityLevel(response.data.priority_levels);
      setShiftList(shiftServices);
      setIsLoading(false);
    } catch (err) {
      const { message } = JSON.parse(err.request.responseText);
      toast.error(`Error ao ler analista:  ${message}`);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAnalyst();
  }, []);

  return (
    <Container>
      <h2>Atualização do Analista</h2>

      {!isLoading && (
        <BoxEdit>
          <Formik initialValues={initialValues} onSubmit={updateAnalyst}>
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
                      defaultValue={initialValues.sex}
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
                      defaultValue={initialValues.service_modality}
                      style={{ width: 205 }}
                      onChange={(valueModality) => setModality(valueModality)}
                    >
                      <Option key="online">Online</Option>
                      <Option key="presencial">Presencial</Option>
                      <Option key="hibrido">Hibrido</Option>
                    </Select>
                  </Column>

                  {(initialValues.service_modality === 'hibrido' ||
                    initialValues.service_modality === 'presencial' ||
                    modality === 'hibrido' ||
                    modality === 'presencial') && (
                    <Column>
                      <label htmlFor="district">Bairro</label>

                      <Select
                        id="district"
                        defaultValue={initialValues.district}
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
                      defaultValue={initialValues.priority_levels}
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

                <div className="button-box">
                  <Button width={250} type="submit" loading={createLoading}>
                    Atualizar Analista
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </BoxEdit>
      )}
    </Container>
  );
}

export default AnalystCreate;

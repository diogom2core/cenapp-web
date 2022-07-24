import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Row, Checkbox } from 'antd';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, BoxVisualization, Column } from './styles';
import api from '../../services/api';
import Loading from '../../components/Loading';

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

function AnalystAppointmentsRead() {
  const [initialValues, setInitialValues] = useState({
    name: 'Adson Souza',
    email: '',
    shift: '',
    sex: '',
    modality: '',
    district: '',
    priority: '',
    service_type: [],
  });
  const [loading, setLoading] = useState(true);
  const { appointment_id } = useParams();

  const loadAppointment = async () => {
    try {
      const response = await api.get(`/appointments/read/${appointment_id}`);
      setInitialValues(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao carregar solicitação');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointment();
  }, []);

  return (
    <Container>
      <h2>Visualização de Solicitação</h2>

      {!loading && (
        <BoxVisualization>
          <Formik initialValues={initialValues}>
            {() => (
              <Form>
                <h3>Informação do Paciente</h3>
                <Row>
                  <Column>
                    <label htmlFor="name">Nome</label>
                    <Field id="name" name="name" placeholder="Nome" disabled />
                  </Column>

                  <Column>
                    <label htmlFor="email">E-mail</label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="E-mail"
                      disabled
                    />
                  </Column>
                </Row>

                <h3>Preferências do Atendimento</h3>
                <Row>
                  <Column>
                    <label htmlFor="shift">Periodo</label>
                    <Field id="shift" name="shift" disabled />
                  </Column>

                  <Column>
                    <label htmlFor="sex">Sexo do Analísta</label>
                    <Field id="sex" name="sex" disabled />
                  </Column>

                  <Column>
                    <label htmlFor="modality">Modalidade de Atendimento</label>
                    <Field id="modality" name="modality" disabled />
                  </Column>

                  <Column>
                    <label htmlFor="district">Região</label>
                    <Field id="district" name="district" disabled />
                  </Column>

                  <Column>
                    <label htmlFor="priority">Nivel de Prioridade</label>
                    <Field id="priority" name="priority" disabled />
                  </Column>
                </Row>

                <Row>
                  <Column>
                    <label htmlFor="service_type">Tipos de atendimento</label>

                    <CheckboxGroup
                      options={plainOptions}
                      defaultValue={['']}
                      disabled
                    />
                  </Column>
                </Row>

                <Row />
              </Form>
            )}
          </Formik>
        </BoxVisualization>
      )}

      {loading && <Loading />}
    </Container>
  );
}

export default AnalystAppointmentsRead;

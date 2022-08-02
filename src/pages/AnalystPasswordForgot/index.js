/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { MdEmail, MdLock, MdOutlineVpnKey } from 'react-icons/md';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, Background, InputField } from './styles';
import Button from '../../components/Button';
import api from '../../services/api';

function AnalystLogin() {
  const [initialValues] = useState({
    email: '',
  });

  const [initialValuesCode] = useState({
    code: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [isSendCode, setIsSendCode] = useState(false);
  const [emailToSend, setEmailToSend] = useState('');

  async function handleSubmit(values) {
    try {
      setLoading(true);
      const { email } = values;
      setEmailToSend(email);
      await api.post('/analysts/passwords/forgot', {
        email,
      });

      setIsSendCode(true);
    } catch (err) {
      setLoading(false);
      const error = err.response.data.message;
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitCode(values) {
    try {
      setLoading(true);
      const { code, password } = values;

      await api.post('/analysts/passwords/reset', {
        code,
        password,
        email: emailToSend,
      });

      setIsSendCode(false);
      history.push('/analista/login');
      toast.success('Senha recuperada com sucesso!');
    } catch (err) {
      setLoading(false);
      const error = err.response.data.message;
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Content>
        {!isSendCode && (
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <h3>Recuperação de senha</h3>

                <InputField>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    icon={MdEmail}
                    name="email"
                    placeholder="exemple@gmail.com"
                  />
                </InputField>

                <Button
                  width={340}
                  type="submit"
                  color="#40d4c3"
                  loading={loading}
                >
                  Entrar
                </Button>
                <Link to="/analista/login">Voltar</Link>
              </Form>
            )}
          </Formik>
        )}

        {isSendCode && (
          <Formik initialValues={initialValuesCode} onSubmit={handleSubmitCode}>
            {() => (
              <Form>
                <h3>Recuperação de senha</h3>

                <InputField>
                  <label htmlFor="email">Código</label>
                  <Field
                    id="code"
                    icon={MdOutlineVpnKey}
                    name="code"
                    placeholder="código"
                  />
                </InputField>

                <InputField>
                  <label htmlFor="password">Senha</label>
                  <Field
                    id="password"
                    icon={MdLock}
                    name="password"
                    type="password"
                    placeholder="******"
                  />
                </InputField>

                <Button
                  width={340}
                  type="submit"
                  color="#40d4c3"
                  loading={loading}
                >
                  Entrar
                </Button>
                <Link to="/analista/login">Voltar</Link>
              </Form>
            )}
          </Formik>
        )}
      </Content>
      <Background />
    </Container>
  );
}

export default AnalystLogin;

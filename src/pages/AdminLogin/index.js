/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { Container, Content, Background, InputField } from './styles';
import { useAuth } from '../../hooks/AuthContext';
import Button from '../../components/Button';

function AdminLogin() {
  const [initialValues] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  async function handleSubmit(values) {
    try {
      setLoading(true);
      const { email, password } = values;
      await signIn({ email, password });
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <h3>Login Administrador</h3>

              <InputField>
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  icon={MdEmail}
                  name="email"
                  placeholder="exemple@gmail.com"
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
              <Link to="/passwords/forgot">Esqueci minha senha</Link>
            </Form>
          )}
        </Formik>
      </Content>
      <Background />
    </Container>
  );
}

export default AdminLogin;

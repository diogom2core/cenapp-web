/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Field, Formik } from 'formik';
import { Select, Switch } from 'antd';

import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Container, BoxEdit } from './styles';
import api from '../../services/api';

const { Option } = Select;
function UserCreate() {
  const [initialValues] = useState({
    name: '',
    email: '',
    nickname: '',
    phone_number: '',
    observation: '',
    category: '',
    birthday: '',
    gender: '',
    password: '',
  });
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isCompany, setIsCompany] = useState(false);
  const history = useHistory();
  async function loadCategories() {
    const response = await api.get('/categories');
    setCategories(response.data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function createUser(values) {
    try {
      const {
        name,
        email,
        nickname,
        phone_number,
        observation,
        birthday,
        gender,
        password,
      } = values;
      await api.post('/dashboard/users', {
        name,
        email,
        nickname,
        phone_number,
        is_company: isCompany,
        category,
        observation,
        birthday,
        gender,
        password,
      });

      toast.success('Usuário cadastrado com sucesso!');
      history.goBack();
    } catch (err) {
      const { message } = JSON.parse(err.request.responseText);
      toast.error(`Error ao cadastrar:  ${message}`);
    }
  }
  function handleCategoryChange(categoryName) {
    setCategory(categoryName);
  }

  return (
    <Container>
      <h2>Criação de Usuário</h2>
      <BoxEdit>
        <Formik initialValues={initialValues} onSubmit={createUser}>
          {({ handleSubmit, handleChange, handleBlur, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="line">
                <div>
                  <label>Nome</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Nome"
                  />
                </div>

                <div>
                  <label>E-mail</label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="E-mail"
                  />
                </div>

                <div>
                  <label>Nickname</label>
                  <input
                    type="text"
                    name="nickname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nickname}
                    placeholder="Nickname"
                  />
                </div>
              </div>

              <div className="line">
                <div>
                  <label>Telefone</label>
                  <Field
                    type="text"
                    name="phone_number"
                    placeholder="Telefone"
                  />
                </div>

                <div>
                  <label>Categoria</label>
                  <Select
                    defaultValue={initialValues.category || 'Sem categoria'}
                    style={{ width: 222 }}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((categoryName) => (
                      <Option key={categoryName.name}>
                        {categoryName.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label> Empresa </label>
                  <Switch
                    defaultChecked={isCompany}
                    checked={isCompany}
                    onChange={() => setIsCompany(!isCompany)}
                  />
                </div>
              </div>

              <div className="line">
                <div>
                  <label>Data de Nascimento</label>
                  <Field type="text" name="birthday" placeholder="00/00/0000" />
                </div>

                <div>
                  <label>Gênero</label>
                  <Field type="text" name="gender" placeholder="M, F ou O" />
                </div>

                <div>
                  <label>Senha</label>
                  <Field type="text" name="password" placeholder="*******" />
                </div>
              </div>

              <div className="line">
                <div className="col12">
                  <label>Observação</label>
                  <Field name="observation">
                    {({ field }) => (
                      <div>
                        <textarea {...field} value={field.value || ''} />
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              <div className="button-box">
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          )}
        </Formik>
      </BoxEdit>
    </Container>
  );
}

export default UserCreate;

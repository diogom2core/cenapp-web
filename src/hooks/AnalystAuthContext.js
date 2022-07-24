/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

const AnalystAuthContext = createContext();

function AuthProvider({ children }) {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@agendamento_analyst:token');
    const user = localStorage.getItem('@agendamento_analyst:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  /**
   * SignIn
   */
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/analysts/sessions', { email, password });
    const { user, token } = response.data;

    localStorage.setItem('@agendamento_analyst:token', token);
    localStorage.setItem('@agendamento_analyst:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  /**
   * SignOut
   */
  const signOut = useCallback(() => {
    localStorage.removeItem('@agendamento_analyst:token');
    localStorage.removeItem('@agendamento_analyst:user');

    setData({});
  }, []);
  return (
    <AnalystAuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AnalystAuthContext.Provider>
  );
}

function useAuth() {
  const contenxt = useContext(AnalystAuthContext);
  if (!contenxt) {
    throw new Error('useAuth must be used with an AuthProvider');
  }
  return contenxt;
}

export { AuthProvider, useAuth };

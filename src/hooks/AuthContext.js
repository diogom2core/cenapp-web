/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Agendamento:token');
    const user = localStorage.getItem('@Agendamento:user');

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
    const response = await api.post('/admin/sessions', { email, password });
    const { user, token } = response.data;

    localStorage.setItem('@Agendamento:token', token);
    localStorage.setItem('@Agendamento:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  /**
   * SignOut
   */
  const signOut = useCallback(() => {
    localStorage.removeItem('@Agendamento:token');
    localStorage.removeItem('@Agendamento:user');

    setData({});
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const contenxt = useContext(AuthContext);
  if (!contenxt) {
    throw new Error('useAuth must be used with an AuthProvider');
  }
  return contenxt;
}

export { AuthProvider, useAuth };

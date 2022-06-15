import axios from 'axios';

const api = axios.create({
  baseURL: 'https://agendamento.m2core.com.br',
  // baseURL: 'http://localhost:3333',
});

export default api;

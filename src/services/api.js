import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://api.leitordeqr.com.br',
  baseURL: 'http://localhost:3333',
});

export default api;

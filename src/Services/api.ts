import axios from 'axios';

const backendURL =
  process.env.NODE_ENV === 'production'
    ? 'https://enrollments-api.colegiosantiago.com.br'
    : 'http://localhost:3333/';

const api = axios.create({
  baseURL: backendURL,
});

export default api;

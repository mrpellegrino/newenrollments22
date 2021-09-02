import axios from 'axios';

const backendURL =
  process.env.NODE_ENV === 'production'
    ? 'https://beta-api.ondaniel.com.br/'
    : 'http://localhost:3333/';

const api = axios.create({
  baseURL: backendURL,
});

export default api;

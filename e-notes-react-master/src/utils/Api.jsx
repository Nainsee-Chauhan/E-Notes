import axios from 'axios';
// import { getToken } from './Auth';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/', // Update baseURL as per your backend
});


export default api;
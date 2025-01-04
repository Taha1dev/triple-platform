import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.tripleplatform.app/app/v1/',
  timeout: 1000,
  
});



export default apiClient;

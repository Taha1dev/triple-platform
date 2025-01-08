import axios from 'axios';
import { toast } from 'sonner';

const axiosClient = axios.create({
  baseURL: 'https://api.tripleplatform.app/app/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.data.status == 400 || response.data.status == 401 || response.data.status == 404 || response.data.status == 403) {
      toast.error(response.data.message)
    } else {
      toast.success(response.data.message)
    }
    return response.data;
  },
  (error) => {
    if (error?.response?.data?.status === 403) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      console.log(error);
    }
    if (error.response) {
      if (error.response.status === 401) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
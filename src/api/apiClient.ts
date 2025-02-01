import axios from 'axios';
import { toast } from 'sonner';

const axiosClient = axios.create({
  baseURL: 'https://44.201.100.137/app/v1/',
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

    // Check if the response data is in a non-standard format and standardize it
    const standardizedResponse = {
      status: response.data.status || response.status,
      message: response.data.message || response.statusText,
      data: response.data.data || response.data,
    };

    // Handle specific status codes
    if ([400, 401, 403, 404].includes(standardizedResponse.status)) {
      toast.error(standardizedResponse.message || 'An error occurred');
    } else {
      toast.success(standardizedResponse.message || 'Request successful');
    }

    // Return the standardized response data
    return standardizedResponse.data;
  },
  (error) => {
    if (!error.response) {
      toast.error('Network error or server is unreachable');
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    if (status === 403) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.error(data.message || 'Unauthorized access');
    } else if (status === 401) {
      toast.error(data.message || 'Authentication failed');
    } else if (status === 404) {
      toast.error(data.message || 'Resource not found');
    } else if (status === 400) {
      toast.error(data.message || 'Bad request');
    } else {
      toast.error(data.message || 'An unexpected error occurred');
    }

    console.error('API Error:', error);

    return Promise.reject(error);
  }
);

export default axiosClient;
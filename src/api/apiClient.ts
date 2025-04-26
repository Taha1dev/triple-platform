import axios from 'axios'
import { toast } from 'sonner'
export const BASE_URL = 'https://tripleplatform.app/app/v1/'
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const DEFAULT_TIMEOUT = 20000;

axiosClient.interceptors.request.use(
  (config) => {
    config.timeout = config.timeout || DEFAULT_TIMEOUT;

    try {
      const userState = localStorage.getItem('userState');

      if (userState) {
        const parsedUserState = JSON.parse(userState);

        const loginToken = parsedUserState.loginToken;
        console.log(loginToken);
        console.log(parsedUserState);
        if (loginToken) {
          config.headers.Authorization = `Bearer ${loginToken}`;
        }
      }
    } catch (error) {
      console.error('Error parsing user state from localStorage:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    const standardizedResponse = {
      status: response.data.status || response.status,
      message: response.data.message || response.statusText,
      data: response.data.data || response.data,
    };

    // Show toast notifications
    if ([400, 401, 403, 404].includes(standardizedResponse.status)) {
      toast.error(standardizedResponse.message || 'An error occurred');
    } else if (response.config.method !== 'get') {
      toast.success(standardizedResponse.message || 'Request successful');
    }

    return standardizedResponse.data;
  },
  async (error) => {

    // Handle network errors (no response)
    if (!error.response) {

      toast.error('Network error or server is unreachable');
      return Promise.reject(error);
    }

    // Handle HTTP errors
    const { status, data } = error.response;

    if (status === 401) {
      toast.error(data.message || 'Authentication failed');
      // Optionally redirect to login
    } else if (status === 403) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.error(data.message || 'Unauthorized access');
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
export default axiosClient

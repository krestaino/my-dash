import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json'
});

const clearLocalStorage = () => {
  window.localStorage.removeItem('API_KEY');
  window.location.reload();
};

export default async endpoint => {
  try {
    const response = await api.get(endpoint, {
      params: { API_KEY: window.localStorage.getItem('API_KEY') }
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      clearLocalStorage();
    }
    throw error;
  }
};

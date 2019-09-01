import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json'
});

export default async endpoint => {
  try {
    const { data } = await api.get(endpoint, {
      params: { API_KEY: window.localStorage.getItem('API_KEY') }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

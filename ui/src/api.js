import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
  params: { API_KEY: window.localStorage.getItem("API_KEY") }
});

export default endpoint => {
  return api
    .get(endpoint, {
      params: { API_KEY: window.localStorage.getItem("API_KEY") }
    })
    .then(response => response.data)
    .catch(error => {
      if (error.response.status === 401) {
        window.localStorage.removeItem("API_KEY");
        window.location.reload();
      } else {
        return false;
      }
    });
};

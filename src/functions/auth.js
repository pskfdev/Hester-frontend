import axios from "axios";

export const login = async (value) => {
  return await axios.post(`${import.meta.env.VITE_APP_API}/login`, value);
};

export const register = async (value) => {
  return await axios.post(`${import.meta.env.VITE_APP_API}/register`, value);
};

export const currentUser = async (token) => {
  return axios.post(
    `${import.meta.env.VITE_APP_API}/current-user`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const currentAdmin = (token) => {
  return axios.post(
    `${import.meta.env.VITE_APP_API}/current-admin`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

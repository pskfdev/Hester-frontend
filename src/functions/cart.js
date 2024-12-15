import axios from "axios";

export const createCart = async (token, value) => {
  return await axios.post(`${import.meta.env.VITE_APP_API}/cart`, value, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const listCart = async (token) => {
  return await axios.get(`${import.meta.env.VITE_APP_API}/cart`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const readCart = async (token, cartId) => {
  return await axios.get(`${import.meta.env.VITE_APP_API}/cart/${cartId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const editCart = async (token, value) => {
  return await axios.put(`${import.meta.env.VITE_APP_API}/cart`, value, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCart = async (token, cartId) => {
  return await axios.delete(
    `${import.meta.env.VITE_APP_API}/cart/${cartId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

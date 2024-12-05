import axios from "axios";

export const createProduct = async (value) => {
  return await axios.post(`${import.meta.env.VITE_APP_API}/product`, value);
};

export const listProduct = async () => {
  return await axios.get(`${import.meta.env.VITE_APP_API}/product`);
};

export const readProduct = async (id) => {
  return await axios.get(`${import.meta.env.VITE_APP_API}/product/${id}`);
};

export const updateProduct = async (id, value) => {
  return await axios.put(`${import.meta.env.VITE_APP_API}/product/${id}`, value);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${import.meta.env.VITE_APP_API}/product/${id}`);
};

import axios from "axios";

export const createCategory = async (value) => {
  return await axios.post(`${import.meta.env.VITE_APP_API}/category`, value);
};

export const listCategory = async () => {
  return await axios.get(`${import.meta.env.VITE_APP_API}/category`);
};

export const readCategory = async (id) => {
  return await axios.get(`${import.meta.env.VITE_APP_API}/category/${id}`);
};

export const updateCategory = async (id, value) => {
  return await axios.put(`${import.meta.env.VITE_APP_API}/category/${id}`, value);
};

export const deleteCategory = async (id) => {
  return await axios.delete(`${import.meta.env.VITE_APP_API}/category/${id}`);
};
